const express = require("express");
const app = express();

const fs = require("fs");
const studentRouter=require('./routers/studentRouter');




app.use(express.json());
app.use((req,res,next)=>{
  console.log("I am Middleware 1");
  next();
})

app.use((req,res,next)=>{
  console.log("I am Middleware 2");
  next();
})
app.use('/api/students',studentRouter);

app.use('/',(req,res,next)=>{  
  next();
})

app.use('/',(req,res)=>{
  console.log("I am another response!!!");
  res.send("Hello from express js 2!!!!");
})





const port = 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
