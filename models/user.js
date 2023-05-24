const{Schema,model}=require('mongoose');

const schemaUser=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        min:8,
        required:true
    },
    address:String,
    city:String,
    country:String,
    phone:String,
    isAdmin:{
        type:Boolean,
        default:false
    },
    order: {
        type:Schema.Types.ObjectId,ref:'Order',
    }
})

module.exports=model('User',schemaUser);