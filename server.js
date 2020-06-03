require('dotenv').config()
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const port =process.env.PORT || 3000;
const morgan =require("morgan");
const db=require('./db/db');
const auth=require('./routes/auth');


app.use(morgan("dev"));
app.use(express.json());
app.use('/api/user',auth);


app.get('/',(req,res)=>{
    res.send("index")
});

app.listen(port,()=>{
    console.log(`server started on port ${port}`)
});