
const mongoose=require('mongoose');



const db=mongoose.connect(process.env.URI,{useNewUrlParser: true,
useUnifiedTopology: true,useCreateIndex:true})
.then(()=>console.log("conected to db"));


module.exports=db;