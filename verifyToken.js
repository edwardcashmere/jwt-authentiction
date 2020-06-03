const jwt =require('jsonwebtoken');

module.exports =(req,res,next)=>{
    const token=req.header('auth');
    if(!token) return res.status(401).send('access forbidden');


    try{
        const verified= jwt.verify(token,process.env.SECRET_KEY);
        req.user=verified;
        next();
    }catch(error){
        res.status(400).send('invalid token');
    }
}