const fs=require('fs');

const getDBstudents=()=>{
  return new Promise((resolve, reject)=>{
    fs.readFile('./db.json','utf-8',(err,data)=>{
      const students=JSON.parse(data);
      resolve(students);
    })
  })
}


const insertDBstudents=(students)=>{
  return new Promise((resolve, reject)=>{
    fs.writeFile("./db.json", JSON.stringify(students), (err) => {
      resolve("Succesfully Added");
    });
  })
}

module.exports.getDBstudents=getDBstudents;
module.exports.insertDBstudents=insertDBstudents;