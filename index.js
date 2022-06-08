const express = require("express");
const app = express();

const fs = require("fs");

const db = require("./db");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world from Express js!!");
});

app.get("/api/students", (req, res) => {
  db.getDBstudents().then((students) => {
    res.send(students);
  });
});

app.post("/api/students", (req, res) => {
  const student = req.body;
  db.getDBstudents().then((students) => {
    students.push(student);
    db.insertDBstudents(students).then((data) => {
      res.send(student);
    });
  });
});

app.get('/api/students/:id',(req,res)=>{
  const id=parseInt(req.params.id);
  db.getDBstudents().then((students)=>{
    const student=students.find(s=>s.id===id);
    if(!student) res.status(404).send("No student found this id");
    else res.send(student);
  })  
  
})

app.put('/api/students/:id',(req, res)=>{
  const id=parseInt(req.params.id);
  const updatedData=req.body;

  db.getDBstudents().then((students)=>{
    const student=students.find(s=>s.id===id);
    if(!student) res.status(404).send("No student found this id");
    else{
      const i=students.findIndex(s=>s.id===id);
      students[i]=updatedData;

      db.insertDBstudents(students).then((msg)=>{
        res.send(updatedData);
      })
    }
  })



})

const port = 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
