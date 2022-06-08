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

const port = 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
