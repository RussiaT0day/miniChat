var express = require('express');
var router = express.Router();
const Message = require('../db/messageModel');
const User = require('../db/userModel');

/* GET home page. */
router.route('/')
  .get(async (req, res, next) => {
    let userMessage = (await Message.find()).reverse();
    console.log(userMessage);
    
    userMessage = userMessage.slice(0, 5)
    res.render('index', { userMessage });
  })
  .post(async (req, res) => {
    const { text, img } = req.body
    try {
      if (text) {
        if (img) {

        } else {
          //путь к базовому фото
          const basesPhoto = '/img/nophoto.jpg'
          const data = new Date();

          let user = await User.findOne({ name: res.locals.user });
          await Message.create({
            nameCreated: user.name,
            idCreated: user.id,
            text: text,
            data: `${data.getMonth()} ${data.getDate()} ${data.getFullYear()}`,
            img: basesPhoto,
          });
          return res.status(200).redirect('/');
        }
      } else {
        return res.status(300).render('profile', { message: "Заполните обязательные поля" });
      }
    } catch (error) {
      return res.status(500).render('error', { error });
    }
  })
  .put(async (req, res) => {
    console.log(req.body.id);
    try {
      let user = await User.findOne({ name: res.locals.user });
      let mess = await Message.findOne({_id: req.body.id});

      if ( mess.likes.indexOf(user.id) === -1 ) {
        await Message.findOneAndUpdate({_id: req.body.id},{ $push : { likes: user.id} });
      }else{
        await Message.findOneAndUpdate({_id: req.body.id},{ $pull : { likes: user.id} });
      }
      mess = await Message.findOne({_id: req.body.id});
      return res.json({countLike: mess.likes.length})
    } catch (error) {
      return res.status(500).render('error', { error });
    }
  })

module.exports = router;
