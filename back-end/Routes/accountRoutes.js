const express = require("express");
const Account = require("../Models/Account");

const router = express.Router();

router.post("/create", async (req,res)=>{

    const {userId,accountType} = req.body

    const accountNumber = "AC" + Math.floor(100000 + Math.random()*900000)

    const acc = new Account({
        userId,
        accountType,
        accountNumber
    })

    await acc.save()

    res.json(acc)
})

router.get("/", async (req,res)=>{

    const accounts = await Account.find().populate("userId")

    res.json(accounts)

})

module.exports = router