const express = require("express");
const app = express();

const fs = require("fs");

const studentRouter=require('./routers/studentRouter');
const userRouter=require('./routers/userRouter');
const authRouter=require('./routers/authRouter');

const morgan=require('morgan');





app.use(express.json());//Built In Middleware
//app.use(express.urlencoded({extended:true}));//Built In Middleware
//app.use(express.static('public'));//Built In Middleware

if(process.env.NODE_ENV==='development'){
  console.log('Development Server');
app.use(morgan('dev'));//Third party middleware
}


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



module.exports = app;