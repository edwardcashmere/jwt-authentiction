const Joi=require('@hapi/joi');
  


const registervalidation=(data)=>{

    const schema=Joi.object({
        name:Joi.string().min(5).required(),
        email:Joi.string().email().min(8).required(),
        password:Joi.string().min(8).required(),
    });
    return schema.validate(data)
    
};
const loginvalidation=(data)=>{

    const schema=Joi.object({
        email:Joi.string().email().min(8).required(),
        password:Joi.string().min(8).required(),
    });
    return schema.validate(data)
    
};



module.exports.registervalidation=registervalidation;
module.exports.loginvalidation=loginvalidation;