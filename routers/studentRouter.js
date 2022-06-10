const express=require('express');
const {Student}=require('../models/students');
const router=express.Router();


const fs = require("fs");


const studentList=async(req, res) => {

  const students=await Student.find()
  .sort({name:1});
  res.send(students);
 
 
 
}

const newStudent=async(req, res) => {
 
  const student =new Student(req.body)
  try{
    const result= await student.save();
    res.send(result);
  }
  catch(err){
    const errMsg=[];
    for(field in err.errors){
      errMsg.push(err.errors[field].message);
    }
    return res.status(400).send(errMsg); 
  }
  
}

const studentDetail= async(req, res) => {
  const id = req.params.id;
  try{
    const student=await Student.findById(id);
    if(!student) return res.status(400).send("ID not found");
    res.send(student);

  }catch(err){
    return res.status(400).send("ID not found");
  }
  
}

const studentUpdate=(req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  
}

const studentDelete=(req,res)=>{
  const id=parseInt(req.params.id);
  
  }


  router.route("/")
  .get(studentList)
  .post(newStudent);

  router.route('/:id')
  .get(studentDetail)
  .put(studentUpdate)
  .delete(studentDelete);


  module.exports = router;
