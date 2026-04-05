const Account = require("../Models/Account")

exports.createAccount = async(req,res)=>{

    const accountNumber = "AC" + Math.floor(100000 + Math.random()*900000)

    const account = new Account({
        ...req.body,
        accountNumber
    })

    await account.save()

    res.json(account)
}

exports.getAccounts = async(req,res)=>{

    const accounts = await Account.find().populate("userId")

    res.json(accounts)
}