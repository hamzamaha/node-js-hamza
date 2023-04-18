const Joi = require('joi');

exports.ValidateCategory = (req,res,next)=>{
    const schema=  Joi.object({
        
        label: Joi.string().trim().required(),
        color: Joi.string().trim().required(),
        icon:Joi.string().required(),
        products:Joi.string(),
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