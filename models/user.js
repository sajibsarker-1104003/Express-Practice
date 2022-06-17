const jwt=require('jsonwebtoken');
const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024,
  },
  role:{
    type: String,
    enum:['user','admin'],
    default:'user'
  }
});

userSchema.methods.genrateJWT=function(){
  const token=jwt.sign({
    _id:this._id,email:this.email,role:this.role
  },process.env.mySecretKey);
  return token;
}

const User=model('User',userSchema);

module.exports.User = User;
