 const express=require('express');
 const app=express();

 const fs=require('fs');

 app.get('/', (req,res)=>{
   res.send('hello world from Express js!!');

 })

 app.get('/api/students',(req,res)=>{
   fs.readFile('./db.json','utf-8',(error,data)=>{
     console.log(data);

     const student=JSON.parse(data).students;
     res.send(student);

   })

 })

 const port=3000;

 app.listen(port, ()=>{
   console.log(`Listening on port 3000`);
 })