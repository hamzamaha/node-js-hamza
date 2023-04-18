const  mongoose  = require('mongoose')
const Category =require('../models/category')

exports.index= async(req, res, next)=>{     
   try {
    const categories =await Category.find().populate('products')
    res.json({ categories,success:true })
   } catch (error) {
    res.status(500).json({ success:false })
   }
        
}


exports.show=async(req, res, next)=>{    
    let {id}=req.params 

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success:false,
            message:`this id=${id} is not valid `
        })
    }
    try {
        const category =await Category.findById(id)
        if (!category) {
            return res.status(404).json({
                success:false,
                 message: `No category found with id=${id}`  
            })
        }
        res.json({ category,success:true })
       } catch (error) {
        res.status(500).json({ success:false })
       }
         
    }


exports.store=(req,res)=>{
   

    const mycategory= new Category({
       ...req.body
    })

    mycategory.save().then((insertedcategory)=>{
        res.status(201).json({
            category:insertedcategory,
            success:true
        })
    }).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    })



}


exports.update=async(req, res, next)=>{    
    let {id}=req.params 

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success:false,
            message:`this id=${id} is not valid `
        })
    }
    try {
        // this is for PUT methode
        const category =await Category.findOneAndReplace({'_id':id},req.body);
        if (!category) {
            return res.status(404).json({
                success:false,
                 message: `No category found with id=${id}`  
            })
        }
        res.json({ category,success:true })
       } catch (error) {
        res.status(500).json({ success:false })
       }
         
    }



    exports.patch=async(req, res, next)=>{    
        let {id}=req.params 
    
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success:false,
                message:`this id=${id} is not valid `
            })
        }
        try {
            // this is for patch methode
            const category =await Category.findOneAndUpdate({'_id':id},req.body);
            if (!category) {
                return res.status(404).json({
                    success:false,
                     message: `No category found with id=${id}`  
                })
            }
            res.json({ category,success:true })
           } catch (error) {
            res.status(500).json({ success:false })
           }
                
        }