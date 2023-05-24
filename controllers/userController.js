const User =require('./../models/user');
const Order =require('./../models/order');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

exports.index= async(req, res, next)=>{
 try {
    const result =await User.find()
    res.json({
        success:true,
        users:result
    })
 } catch (error) {
    res.status(500).json({
        success:false,
        error
    })
 }   
}


exports.register= async(req,res)=>{
    let { name,email,password,address,city,country,phone}= req.body

    const user = new User({
        name,
        email,
        password:bcrypt.hashSync(password,10),
        address,
        city,
        country,
        phone
    })  

    try {
        const result=await user.save()
        res.status(201).json({
            success:true,
            user:result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error
        })
    }
}

exports.login= async(req,res)=>{
    const { email , password} = req.body
    
    const user= await User.findOne({email:email},'name email password isAdmin')

    if (!user) {
        return res.status(404).json({
            success:false,
            message:"email or password is Wrong !"
        })
    }

    if (user&&bcrypt.compareSync(password,user.password)) {
        const secret=process.env.SECRET_KEY

        const token=jwt.sign({
            userId:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        },secret,{expiresIn:"1h"})

        return res.status(200).json({
            success:true,
            message:"User is Authenticated",
            user:{
                name:user.name,
                email:user.email
            },
            token
        })
    }

    res.status(400).json({
        success:false,
        message:"email or password is Wrong !"
    })


}


exports.userOrder = async (req, res) => {
    try {
        const {id} = req.params;
        const orders = await Order.find({ user: id }).populate({
            path:'orderItems',
            populate: {
                path:'product', 
                select: 'title description', 
                populate: {
                    path:'category',
                    select:'label'
                }
            }
        }).select('-user')




        // let totalMoney = 0;
        // orders.forEach(order => {
        //     totalMoney += order.total;
        // });

        let totalMoney = orders.reduce((cumul,order)=>cumul+order.total,0)



        res.json({
            success: true,
            orders,
            totalMoney
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error,
        });
    }
}



exports.del = async (req, res, next) => {
    let { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            success: false,
            message: `The user with id = ${id} is invalid`
        });
    }

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `No user found with id = ${id}`
            });
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error });
    }
};





  
// exports.verifyToken = async (req, res) => {
//     const token = req.headers.authorization;
  
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Access Denied: No token provided',
//       });
//     }
  
//     try {
//       const decoded = jwt.verify(token, process.env.SECRET_KEY);
//       res.status(200).json({
//         success: true,
//         message: 'Token is valid',
//         user: decoded,
//       });
//     } catch (err) {
//       res.status(401).json({
//         success: false,
//         message: 'Invalid Token',
//       });
//     }
//   };