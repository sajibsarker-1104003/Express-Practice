const {Schema,model}=require('mongoose');

const studentSchema=Schema({
  name:{type:String,required:[true,"Fill up Name first"]},
  age:{type:Number,min:14,max:22,required:[true,"Fill up Age"]},
  hobbies:{
    type:Array,
    of:String,
    validate:{
      validator:(value)=>value.length>0,
      message:"There must be at least 1 hobby"
    }
  }

})

const Student=model('Student',studentSchema);

exports.Student=Student;