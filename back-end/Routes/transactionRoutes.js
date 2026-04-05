const express = require("express");
const Transaction = require("../Models/Transaction");
const Account = require("../Models/Account");

const router = express.Router();

router.post("/deposit",async(req,res)=>{
    const {accountId,amount} = req.body;

    const acc = await Account.findById(accountId);
    acc.balance += amount;
    await acc.save();

    const t = new Transaction({
        accountId,
        transactionType:"deposit",
        amount
    });

    await t.save();

    res.json({message:"Deposited",balance:acc.balance});
});

router.post("/withdraw",async(req,res)=>{
    const {accountId,amount} = req.body;

    const acc = await Account.findById(accountId);

    if(acc.balance < amount)
        return res.json("Insufficient Balance");

    acc.balance -= amount;
    await acc.save();

    const t = new Transaction({
        accountId,
        transactionType:"withdraw",
        amount
    });

    await t.save();

    res.json({message:"Withdrawn",balance:acc.balance});
});
router.post("/transfer", async (req, res) => {
    const { fromAccountId, toAccountId, amount } = req.body;

    const fromAcc = await Account.findById(fromAccountId);
    const toAcc = await Account.findById(toAccountId);

    if (!fromAcc || !toAcc)
        return res.json({ message: "Account not found" });

    if (fromAcc.balance < amount)
        return res.json({ message: "Insufficient balance" });

    fromAcc.balance -= amount;
    toAcc.balance += amount;

    await fromAcc.save();
    await toAcc.save();

    const t1 = new Transaction({
        accountId: fromAccountId,
        transactionType: "transfer-out",
        amount
    });

    const t2 = new Transaction({
        accountId: toAccountId,
        transactionType: "transfer-in",
        amount
    });

    await t1.save();
    await t2.save();

    res.json({ message: "Transfer successful" });
});
router.get("/", async (req, res) => {

    const transactions = await Transaction.find().sort({createdAt:-1})

    const result = await Promise.all(
        transactions.map(async t => {
            const acc = await Account.findById(t.accountId)

            return {
                _id: t._id,
                type: t.transactionType,
                amount: t.amount,
                date: t.createdAt,
                accountNumber: acc ? acc.accountNumber : "N/A"
            }
        })
    )

    res.json(result)
})
module.exports = router;