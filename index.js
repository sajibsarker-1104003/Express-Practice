 const express=require('express');
 const app=express();

 app.get('/', (req,res)=>{
   res.send('hello world from Express js!!');

 })

 const port=3003;

 app.listen(port, ()=>{
   console.log(`Listening on port 3003`);
 })