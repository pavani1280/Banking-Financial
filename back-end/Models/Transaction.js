const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transactionId:{
    type:String,
    unique:true,
    default: () => "TXN" + Math.floor(Math.random()*10000000)
  },
  accountId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account"
  },
  transactionType:String,
  amount:Number,
  description:String,
  destinationAccountId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Account"
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);