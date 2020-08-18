const mongoose =require("mongoose");
const Schema=mongoose.Schema
const ItemImageSchema= new Schema({
    img:{
        type:String
    
    },
    shoppingid:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"shoppingitem"
      
    }
    
},
{
collection:"itemImage"    
})
const itemImage=mongoose.model("itemImage",ItemImageSchema)
module.exports=itemImage