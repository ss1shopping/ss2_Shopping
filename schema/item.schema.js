
const mongoose =require("mongoose");
const Schema=mongoose.Schema
const ShoppingSchema= new Schema({
    name:{
   type:String,
    },
  
    description:{
          type:String,
    },
    price:{
        type:Number,
        default:0,

    },
    quantity:{
        type:Number,
        default:0,
    },
    sold:{
        type:Number,
        default:0
    },
    view:{
        type:Number,
        default:0,
    },
    image:[
     
    ],
    day:{
        type:Date,
        default: Date.now
    },

},
{
    timestamps:true,
},
{
collection:"item"    
},
)

const item=mongoose.model("item",ShoppingSchema)
module.exports=item