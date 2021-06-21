var express = require('express');
var router = express.Router();
const User = require('../db/userModel');
const bcrypt = require('bcrypt');

/* GET home page. */
router.route('/')
  .get((req, res, next) => {
    res.render('registration');
  })
  .post(async (req, res) => {
    let {email, name, password,passwordDuble} = req.body
    try {
      console.log(email, name, password, passwordDuble);
      if (password !== passwordDuble) {
        return res.status(300).render('registration', { message: `Пароли не совпадают!` });
      }
      password =  await bcrypt.hash(password, +process.env.SALTROUNDS)
      if (name && password && email) {
        let user = await User.findOne({ name });
        if (user) {
          return res.status(300).render('registration', { message: `Такой пользователь уже зарегестрирован!` });
        } else {
          User.create({ name, password, email });
          return res.status(200).render('registration', { message: `Вы зарегистрированы!` });
        }
      }
      return res.status(300).render('error', { message: "Заполните обязательные поля" });
    } catch (error) {
      return res.status(500).render('error', { error });
    }
  })

module.exports = router;
