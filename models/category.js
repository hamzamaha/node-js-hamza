const {Schema,model}=require('mongoose');

const SchemaCategory = new Schema({
    label:String,
    icon:String,
    color:String,
    products:[{type:Schema.Types.ObjectId,ref:'Product'}]
},
// { 
//  timestamps: true 
//  }
 )

 module.exports=model('Category',SchemaCategory)