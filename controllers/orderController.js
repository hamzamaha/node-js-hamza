const  mongoose  = require('mongoose')
const Order =require('../models/order')
const OrderItem =require('../models/order-items')
const Product = require('../models/product')

exports.index= async(req, res, next)=>{     
   try {
    const myorders =await Order.find().populate('user','name email').populate({
        path:'orderItems',populate:{
            path:'product',select: 'title description' ,populate:{
                path:'category',
                select:'label'
            }
        }
    })
    res.json({ success:true ,orders:myorders})
   } catch (error) {
    res.status(500).json({ success:false })
   }
        
}




exports.store= async (req,res)=>{
   
    let{shippingAddress,invoiceAddress,city,country,phone,items}=req.body
    let total=0;
    const user="643d4f88abd77db8e30b4559"


   const orderItemsId= await Promise.all(
    items.map(async item=>{
        const {price} = await Product.findById(item.product,'price')
        total+=(item.quantity*price)
        const myOrderItem = await OrderItem.create({...item,originalPrice:price})
        return myOrderItem._id
    })
   )


    const myOrder = new Order({shippingAddress,invoiceAddress,city,country,phone,orderItems:orderItemsId,user,total}) 
   
    myOrder.save().then((insertedorder)=>{
        res.status(201).json({
            order:insertedorder,
            success:true
        })
    }).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    })

}


exports.patch = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid ID: ${id}`,
      });
    }
  
    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: `Order not found with ID: ${id}`,
        });
      }
  
      // Update order fields based on request body
      Object.assign(order, req.body);
      await order.save();
  
      res.json({
        success: true,
        message: `Order updated successfully`,
        order,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: `Internal server error: ${error.message}`,
      });
    }
  };
  






