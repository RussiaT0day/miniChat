const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  nameCreated:String,
  idCreated:String,
  text:String,
  data: String,
  img: String,
  likes: Array
})

const Message = mongoose.model('Message', messageSchema)


module.exports = Message;
