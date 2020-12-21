const mongoose =require("mongoose");

const Schema=mongoose.Schema
// const uniqueValidator = require('mongoose-unique-validator')
const BookSchema= new Schema({
  title:{
    type:String,
    required:[true,"ddas"],
    
  },
  pages:{
    type:Number,
    required:true,
    
  }
}, 
{
    collection: "category"
}, { timestamps: true },

)
const AuthorSchema=new Schema({
  name:{
    type:String,
    required:true,
  },
  age:{
    type:Number,
    select:false
  },
  attribute:{
      type:Object,
      size:{
        type:Number || String,
        optional:true,
        select:false
      },
      power:{
        type:String || Number,
        optional:true,
        select:false,
      }
  },
  book:{
    type:BookSchema,
    required:true,
    select:false
  }
})
// AuthorSchema.plugin(uniqueValidator, { message: '{PATH} already exists.' })
const authorSchema=mongoose.model("AuthorSchema",AuthorSchema)
module.exports=authorSchema
