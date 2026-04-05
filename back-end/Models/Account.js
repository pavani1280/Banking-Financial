const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  accountId:{
    type:String,
    unique:true,
    default: () => "ACC" + Math.floor(Math.random()*10000000)
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  accountType:String,
  balance:{
    type:Number,
    default:0
  },
  accountNumber:{
    type:String,
    unique:true
  },
  status:{
    type:String,
    default:"active"
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("Account", accountSchema);