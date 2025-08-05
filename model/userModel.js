const { name } = require('ejs');
const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate:{
            validator:function(v){
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v)
            },
            message:"Please enter a valid email"
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6
    }
})

const userModel = mongoose.model('User',userSchema)
module.exports = userModel;