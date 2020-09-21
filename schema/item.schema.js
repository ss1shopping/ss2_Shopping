
const mongoose =require("mongoose");
const Schema=mongoose.Schema
const ShoppingSchema= new Schema({
  
    description:{
          type:String,
    },
    price:{
        type:Number,

    },
    quantity:{
        type:Number,
    },
    sold:{
        type:Number
    },
    view:{
        type:Number
    },
    image:[
     
    ],

},
{
collection:"item"    
},
{
    timestamps:true
})

const item=mongoose.model("item",ShoppingSchema)
module.exports=item