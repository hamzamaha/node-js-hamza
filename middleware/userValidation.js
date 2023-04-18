
const Joi = require('joi');

exports.ValidateRegisterUser = (req,res,next)=>{
    const schema=  Joi.object({
        name:Joi.string().min(4).max(70).trim().required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(8).required(),
        address:Joi.string().trim(),
        city:Joi.string().trim(),
        country:Joi.string().trim(),
        phone:Joi.string().trim(),
    })

    const {value , error} =schema.validate(req.body)

    if (error) {
        const{path,message}=error.details[0];

        return res.json({
            value,
            error:{
                path,
                message
            }
        })
    }

    next();
}






exports.ValidateLoginUser = (req,res,next)=>{
    const schema=  Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(8).required(),
    })

    const {value , error} =schema.validate(req.body)

    if (error) {
        const{path,message}=error.details[0];

        return res.json({
            value,
            error:{
                path,
                message
            }
        })
    }

    next();
}
