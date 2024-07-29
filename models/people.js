
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const logInSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:Number,
        required:true
    },
    lname:{
        type:String,
    },
    email:{
        type:String,
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection