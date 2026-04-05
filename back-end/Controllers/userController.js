const User = require("../Models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.registerUser = async(req,res)=>{
    try{

        const hashedPassword = await bcrypt.hash(req.body.password,10)

        const user = new User({
            ...req.body,
            password:hashedPassword
        })

        await user.save()

        res.json({message:"User Registered",user})

    }catch(err){
        res.status(500).json(err)
    }
}

exports.loginUser = async(req,res)=>{

    const user = await User.findOne({username:req.body.username})

    if(!user)
        return res.json({message:"User not found"})

    const valid = await bcrypt.compare(req.body.password,user.password)

    if(!valid)
        return res.json({message:"Invalid password"})

    const token = jwt.sign({id:user._id},"secretKey")

    res.json({message:"Login successful",token})

}