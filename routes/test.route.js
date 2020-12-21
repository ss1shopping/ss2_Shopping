let express = require('express');
let router = express.Router();
let Category=require("../schema/categories")
const {check ,validationResult}=require("express-validator")
router.route("/")
.post(
    // check("name")
    // .notEmpty()
    // .withMessage("name is not empty")
    // .isLength(2)
    // .withMessage("length >2"),
    // check("age")
    // .notEmpty()
    //,
    async (req,res,next)=>{
    const {name,age,book,attribute}=req.body
    // const errors=validationResult(req)
    // if(!errors.isEmpty()){
    //     return res.status(400).json({errors:errors.array()});
    // }
const category = new Category({name,age,book,attribute});
 const result=await category.save()
  
   return res.json({result})
})
router.route("/")
.get(async(req,res)=>{
    const {name}=req.body;
    console.log(name);
   const result=await Category.find({name}).select("book").select("attribute")
   return res.json({result})
})
module.exports=router