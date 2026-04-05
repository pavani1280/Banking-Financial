const express = require("express")
const router = express.Router()

const loanController = require("../Controllers/loanController")

// create loan
router.post("/create", loanController.createLoan)

// get loans
router.get("/", loanController.getLoans)

module.exports = router