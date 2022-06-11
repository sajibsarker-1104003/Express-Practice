const express = require("express");
const { User } = require("../models/user");
const router = express.Router();
const bcrypt=require("bcrypt");


const authRouter=async(req,res)=>{
let user=await User.findOne({email:req.body.email});
if(!user)return res.status(400).send('Invalid email and password');

const validUser=await bcrypt.compare(req.body.password,user.password);
if(!validUser)return res.status(400).send('Invalid email and password');

const token=user.genrateJWT();

res.send({token:token});
}

router.route('/')
.post(authRouter);

module.exports=router;