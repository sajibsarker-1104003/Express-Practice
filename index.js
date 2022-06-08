const express = require("express");
const app = express();

const fs = require("fs");



app.use(express.json());

const studentRouter=require('./routers/studentRouter');


app.use('/api/students',studentRouter);





const port = 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
