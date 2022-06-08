const express=require('express');
const router=express.Router();

const db=require('../db');
const fs = require("fs");


const studentList=(req, res) => {
  db.getDBstudents().then((students) => {
    res.send(students);
  });
}

const newStudent=(req, res) => {
  const student = req.body;
  db.getDBstudents().then((students) => {
    students.push(student);
    db.insertDBstudents(students).then((data) => {
      res.send(student);
    });
  });
}

const studentDetail= (req, res) => {
  const id = parseInt(req.params.id);
  db.getDBstudents().then((students) => {
    const student = students.find((s) => s.id === id);
    if (!student) res.status(404).send("No student found this id");
    else res.send(student);
  });
}

const studentUpdate=(req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  db.getDBstudents().then((students) => {
    const student = students.find((s) => s.id === id);
    if (!student) res.status(404).send("No student found this id");
    else {
      const i = students.findIndex((s) => s.id === id);
      students[i] = updatedData;

      db.insertDBstudents(students).then((msg) => {
        res.send(updatedData);
      });
    }
  });
}

const studentDelete=(req,res)=>{
  const id=parseInt(req.params.id);
  db.getDBstudents().then((students) => {
    const student = students.find((s) => s.id === id);
    if (!student) res.status(404).send("No student found this id");
   const updatedStudents=students.filter(s=> s.id!==id );
   db.insertDBstudents(updatedStudents).then(msg=>{
     res.send(student);
   })
  });
  }


  router.route("/")
  .get(studentList)
  .post(newStudent);

  router.route('/:id')
  .get(studentDetail)
  .put(studentUpdate)
  .delete(studentDelete);


  module.exports = router;
