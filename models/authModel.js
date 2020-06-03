const mongoose=require('mongoose');


const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 6,
        max: 60

    },
    email:{
        type: String,
        unique: true,
        required: true,
        max: 255
    },
    password:{
        type: String,
        required: true,
        max: 1024
    },
    Date:{
        type: Date,
        default: Date.now
    }
})


module.exports=mongoose.model("User",userSchema);