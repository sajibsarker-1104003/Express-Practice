const express = require("express");
const app = express();

const fs = require("fs");

const studentRouter=require('./routers/studentRouter');
const userRouter=require('./routers/userRouter');
const authRouter=require('./routers/authRouter');

const morgan=require('morgan');
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/my-students-2')
.then(()=>console.log("Mongodb Connected Succesfully"))
.catch(err=>console.error("Mongodb Connected Failed"));


app.use(express.json());//Built In Middleware
//app.use(express.urlencoded({extended:true}));//Built In Middleware
//app.use(express.static('public'));//Built In Middleware
app.use(morgan('dev'));//Third party middleware


app.use((req,res,next)=>{
  console.log("I am Middleware 1");
  next();
});

app.use((req,res,next)=>{
  console.log("I am Middleware 2");
  next();
});
app.use('/api/students',studentRouter);
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.use('/',(req,res,next)=>{  
  next();
});

app.use('/',(req,res)=>{
  console.log("I am another response!!!");
  res.send("Hello from express js 2!!!!");
});



const port = 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
