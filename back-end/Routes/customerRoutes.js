const express = require("express");
const Customer = require("../Models/Customer");

const router = express.Router();

router.post("/add",async(req,res)=>{
    const customer = new Customer(req.body);
    await customer.save();
    res.json(customer);
});

router.get("/",async(req,res)=>{
    const customers = await Customer.find();
    res.json(customers);
});

router.put("/:id",async(req,res)=>{
    const updated = await Customer.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.json(updated);
});

module.exports = router;