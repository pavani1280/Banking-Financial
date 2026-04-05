const Loan = require("../Models/Loan")

exports.createLoan = async(req,res)=>{
    try {
        const loan = new Loan(req.body)
        await loan.save()
        res.json(loan)
    } catch(err) {
        console.error("Error creating loan:", err)
        res.status(500).json({ message: "Internal Server Error", error: err.message })
    }
}

exports.getLoans = async(req,res)=>{

    const loans = await Loan.find().populate("userId")

    res.json(loans)
}