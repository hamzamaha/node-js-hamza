const  mongoose  = require('mongoose')
const Product =require('./../models/product')

exports.index= async(req, res, next)=>{     
   try {
    const products =await Product.find().populate('category','-_id label color icon')
    res.json({ products,success:true })
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
        const product =await Product.findById(id)
        if (!product) {
            return res.status(404).json({
                success:false,
                 message: `No product found with id=${id}`  
            })
        }
        res.json({ product,success:true })
       } catch (error) {
        res.status(500).json({ success:false })
       }
          
    }


exports.store=(req,res)=>{
    let {title,content,price,description,brand,rating,isFeatured,thumbnail,countStock,images,category}=req.body

    const myProduct= new Product({
        // title:title,
        // content:content,
        // price:price
        title,
        content,
        price,
        description,
        brand,
        rating,
        isFeatured,
        thumbnail,
        countStock,
        images,
        category
        // ...req.body
    })

    myProduct.save().then((insertedProduct)=>{
        res.status(201).json({
            product:insertedProduct,
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
        const product =await Product.findOneAndReplace({'_id':id},req.body);
        if (!product) {
            return res.status(404).json({
                success:false,
                 message: `No product found with id=${id}`  
            })
        }
        res.json({ product,success:true })
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
            const product =await Product.findOneAndUpdate({'_id':id},req.body);
            if (!product) {
                return res.status(404).json({
                    success:false,
                     message: `No product found with id=${id}`  
                })
            }
            res.json({ product,success:true })
           } catch (error) {
            res.status(500).json({ success:false })
           }
               
        }

exports.search= async (req,res)=>{
    let {search,fields}=req.query

    if(search){
        try {
            let result = await Product.find({$or:
                [
                    {title:{$regex:search,'$options':'i'}},
                    {description:{$regex:search,'$options':'i'}},
                    {content:{$regex:search,'$options':'i'}}
                ]
        })
        .select(fields)
        .sort({'created_at':-1}) // -1 is for DESC   //and 1 is for ASC
            if (!result.length) {
                return res.status(404).json({
                   success:false,
                   message:`this ${search} not found ! ` 
                })
            }
            res.json({
                products:result,
                success:true
            })
        } catch (error) {
            res.status(500).json({
                message:'server is down',
                success:false
            })
        }

       
    }
}


exports.searchBySegment= async (req,res)=>{
    let {segment}=req.params
    let {search}=req.query

    if(search){
        try {
            let result = await Product.find({[segment]:{$regex:search,'$options':'i'}})
            if (!result.length) {
                return res.status(404).json({
                   success:false,
                   message:`this ${search} not found ! ` 
                })
            }
            res.json({
                products:result,
                success:true
            })
        } catch (error) {
            res.status(500).json({
                message:'server is down',
                success:false
            })
        }

       
    }
}
