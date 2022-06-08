const express = require("express");
const app = express();

const fs = require("fs");

const db = require("./db");

app.use(express.json());

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

app.get("/api/students",studentList);



app.post("/api/students",newStudent);



app.get("/api/students/:id",studentDetail);



app.put("/api/students/:id",studentUpdate);



app.delete('/api/students/:id',studentDelete);

const port = 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
