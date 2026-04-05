const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId:{
    type:String,
    unique:true,
    default: () => "USR" + Math.floor(Math.random()*10000000)
  },
  username:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phoneNumber:String,
  roles:{
    type:String,
    default:"customer"
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("User", userSchema);