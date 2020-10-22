const mongoose =require("mongoose");
const Schema=mongoose.Schema
const CartSchema= new Schema({
  itemId:[],
  
  totalCost:{
      type:Number,
      required:true,
  },
 
  status:{
      type:Boolean,
      default:false,
  }
}, 
{
    collection: "cart"
}, { timestamps: true },

)
const cart=mongoose.model("cart",CartSchema)
module.exports=cart