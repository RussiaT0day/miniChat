var express = require('express');
var router = express.Router();
const Message = require('../db/messageModel');
const User = require('../db/userModel');

router.route('/:id')
  .get(async (req, res, next) => {
    let id = req.params.id
    res.render('edit',{id});
  })




/* GET home page. */
router.route('/')
  .get(async (req, res, next) => {
    let user = await User.findOne({ name: res.locals.user });
    let userMessage = await (await Message.find({ idCreated: user.id })).reverse();

    res.render('profile', { userMessage });
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
          return res.status(200).redirect('/profile');
        }
      } else {

          let userMessage = await Message.findOne({ nameCreated: res.locals.user });

        return res.status(300).render('profile', { message: "Заполните обязательные поля",userMessage });
      }
    } catch (error) {
      return res.status(500).render('error', { error });
    }
  })
  .delete(async (req, res) => {
    console.log('This work! WHEREEE');
    console.log(req.body);

    const { id } = req.body


    await Message.findOneAndDelete({ _id: id });

    res.status(200).json();
  })
module.exports = router;
