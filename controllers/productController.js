const  mongoose  = require('mongoose')
const Product =require('./../models/product')
const fs = require('fs');
const path = require('path');

const { productPagination } = require("./../middleware/productPagination");


exports.paginate = async (req, res, next) => {
    try {
      await productPagination(req, res, next);
      const { products, success } = res;
      const { currentPage, totalPages, totalItems } = res.pagination;
      const hasNextPage = currentPage < totalPages;
      const hasPreviousPage = currentPage > 1;
      const pagination = {
        currentPage,
        totalPages,
        totalItems
      };
      if (hasNextPage) {
        pagination.nextPage = currentPage + 1;
      }
      if (hasPreviousPage) {
        pagination.previousPage = currentPage - 1;
      }
  
      res.json({
        products,
        pagination,
        success,
      });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  };
  
  

  exports.index = async (req, res, next) => {
    try {
      const products = await Product.find().populate('category','-_id label color icon')
      res.status(200).json({ products, success: true })
    } catch (error) {
      res.status(500).json({ success: false })
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
        // .populate('category')
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
    let {title,content,price,description,brand,rating,isFeatured,countStock,category}=req.body
    const domain=process.env.DOMAIN_NAME
    const port=process.env.PORT
    let thumbnail= req.file ? `${domain}:${port}/images/${req.file.filename}` : '';


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

exports.uploadImages= async (req,res)=>{
    let id= req.params.id

    const domain=process.env.DOMAIN_NAME

    const images =req.files.map(file=>`${domain}:${port}/images/${file.filename}`)

    try {
        
        const updatedProduct= await Product.findByIdAndUpdate(id,{images:images},{new:true})
        if (!updatedProduct) {
            return res.status(404).json({
                success:false,
                message:"Product not Found"
            })
        }

        res.json({
            success:true,
            product:updatedProduct
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            error
        })
    }
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


exports.del = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: `Invalid product ID: ${id}`
        });
    }

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: `Product with ID ${id} not found.`
            });
        }

        // Remove the product image from the images folder
        const imagePath = path.join(__dirname, '..', 'public', 'images', product.thumbnail);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        res.json({
            success: true,
            message: `Product with ID ${id} has been deleted.`,
            product
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Server error while trying to delete product.',
            error: err.message
        });
    }
};


// exports.del = async (req, res, next) => {
//     const { id } = req.params;

//     if (!mongoose.isValidObjectId(id)) {
//         return res.status(400).json({
//             success: false,
//             message: `Invalid product ID: ${id}`
//         });
//     }

//     try {
//         const product = await Product.findByIdAndDelete(id);

//         if (!product) {
//             return res.status(404).json({
//                 success: false,
//                 message: `Product with ID ${id} not found.`
//             });
//         }

//         res.json({
//             success: true,
//             message: `Product with ID ${id} has been deleted.`,
//             product
//         });

//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: 'Server error while trying to delete product.',
//             error: err.message
//         });
//     }
// };


