const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  loanId:{
    type:String,
    unique:true,
    default: () => "LOAN" + Math.floor(Math.random()*10000000)
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  loanAmount:Number,
  interestRate:Number,
  term:String,
  purpose:String,
  status:{
    type:String,
    default:"pending"
  },
  balance:Number,
  createdAt:{
    type:Date,
    default:Date.now
  },
  updatedAt:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("Loan", loanSchema);