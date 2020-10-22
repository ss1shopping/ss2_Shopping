const mongoose =require("mongoose");
const Schema=mongoose.Schema
const HistorySchema= new Schema({
  itemId:[],
  userId:{
      type:mongoose.Schema.ObjectId,
       ref:"users"
  },
  totalCost:{
      type:Number,
      required:true,
  },
  phone:{
      type:Number,
      required:true,
  },
  address:{
      type:String,
      required:true,
  }
  
}, 
{
    collection: "history"
}, { timestamps: true },

)
const cart=mongoose.model("history",HistorySchema)
module.exports=cart