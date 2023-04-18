const Joi = require('joi');

exports.ValidateProduct = (req,res,next)=>{
    const schema=  Joi.object({
        
        title: Joi.string().trim().min(5).max(15).required(),
        description: Joi.string().trim().max(200).required(),
        countStock: Joi.number().default(0),
        isFeatured: Joi.boolean(),
        brand: Joi.string().trim(),
        content: Joi.string().trim(),
        price: Joi.number().required(),
        category:Joi.string()
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