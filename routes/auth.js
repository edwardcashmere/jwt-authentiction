const router=require('express').Router();
const User=require('../models/authModel');
const { registervalidation,loginvalidation } =require('../validation')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const verifyToken=require('../verifyToken');



router.get('/',verifyToken,(req,res)=>{
  res.send("home")  
});

router.post('/',async(req,res)=>{
    try{
        const {error}=registervalidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let {name,email}=req.body;

        const emailExists= await User.findOne({email:email});
        if (emailExists) return res.status(400).send("Email already is taken choose another");
        
        
    
        let salt= await bcrypt.genSalt(10);
        let password= await bcrypt.hash(req.body.password,salt);
        
        let user=  await new User({name,email,password});
        let savedUser=await user.save()
        res.send(savedUser);

    }catch(err){
        res.status(400).send(err.message)
    }
});

router.post('/login',async(req,res)=>{
    try{
    const {error}=loginvalidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {email,password}=req.body

    const user=await User.findOne({email:email});
    if (!user) return res.status(400).send("email is invalid or does not exist");

    const validUser=await bcrypt.compare(password,user.password);
    if (!validUser) return res.status(400).send("email or password is wrong")

   const token = jwt.sign({user:user},process.env.SECRET_KEY,{expiresIn:'60s'})
    res.header('auth',token).send(token)
}catch(error){
    res.send(error.message)
}
});

module.exports=router