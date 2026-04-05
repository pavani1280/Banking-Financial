const Transaction = require("../Models/Transaction")
const Account = require("../Models/Account")

exports.deposit = async(req,res)=>{

    const {accountId,amount} = req.body

    const acc = await Account.findById(accountId)

    acc.balance += amount

    await acc.save()

    const t = new Transaction({
        accountId,
        transactionType:"deposit",
        amount
    })

    await t.save()

    res.json({message:"Deposit successful",balance:acc.balance})
}

exports.withdraw = async(req,res)=>{

    const {accountId,amount} = req.body

    const acc = await Account.findById(accountId)

    if(acc.balance < amount)
        return res.json({message:"Insufficient balance"})

    acc.balance -= amount

    await acc.save()

    const t = new Transaction({
        accountId,
        transactionType:"withdraw",
        amount
    })

    await t.save()

    res.json({message:"Withdraw successful"})
}