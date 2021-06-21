const mongoose = require('mongoose');


function dbConnect(){
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    poolSize: 10, 
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };
  mongoose.connect(process.env.MONGOURL, options, (err)=>{
    if(err) return console.log(err);
    return console.log('db connect')
})
  
}

module.exports = dbConnect;
