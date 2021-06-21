var express = require('express');
var router = express.Router();
const Message = require('../db/messageModel');
const User = require('../db/userModel');

/* GET home page. */
router.route('/')
  .post(async (req, res) => {
    try {
      console.log(req.body);
      await Message.findByIdAndUpdate({_id:req.body.id},{ text: req.body.text})
      return res.status(200).json();
    } catch (error) {
      return res.status(500).render('error', { error });
    }
  })

module.exports = router;
