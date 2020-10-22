const mongoose =require("mongoose");
const Schema=mongoose.Schema
const TotalSchema= new Schema({
      
      view:{
          type:Number,
          default:0
      },
      sold:{
          type:Number,
          default:0,
      },
      totalInCome:{
          type:Number,
          default:0
      },
      day:{
        type:Date,
        default: Date.now
    },
      
},
{
    timestamps:true,
},
{
collection:"Total"    
},
)
const Total=mongoose.model("Total",TotalSchema)
module.exports=Total