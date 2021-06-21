var express = require('express');
var router = express.Router();
const User = require('../db/userModel');
const bcrypt = require('bcrypt');

/* GET home page. */
router.route('/')
  .get((req, res, next) => {
    res.render('login');
  })
  .post(async (req, res) => {
    const { name, password } = req.body
    try {
      if (name && password) {
        let user = await User.findOne({ name: name });
        console.log(user);
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user.name;
          return res.status(200).redirect('/');
        }
        return res.status(404).render('error', { message: `Такой пользователь не найден` });
      }
      return res.status(300).render('error', { message: "Заполните обязательные поля" });
    } catch (error) {
      return res.status(500).render('error', { error });
    }
  })

  router.route('/exit')
    .get((req, res) => {
      req.session.destroy();
      res.redirect('/login')
    })

module.exports = router;
