const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const app=require('./index');
const mongoose=require('mongoose');



//console.log(app.get('env'));//set by express
//console.log(process);//set by node

mongoose.connect('mongodb://localhost:27017/my-students-2')
.then(()=>console.log("Mongodb Connected Succesfully"))
.catch(err=>console.error("Mongodb Connected Failed"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
