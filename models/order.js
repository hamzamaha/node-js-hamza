const{Schema,model}=require('mongoose');

const schemaOrder=new Schema({
    shippingAddress:{
        type:String,
        require:true
    },
    ivoiceAddress:String,
    city:String,
    country:String,
    phone:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['shipped','recived','canceled','pending']
    },
    total:Number,
    user:{
        type:Schema.Types.ObjectId, ref:'User',
        required:true
    },
    orderItems:[{
        type:Schema.Types.ObjectId,ref:'OrderItem',
    }],
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    },
    
})

module.exports=model('Order',schemaOrder)