const fs =require("fs");
const  auth  = require("../middleware/verifyToken");
const Cart = require("../schema/cart.schema");
const Users=require("../schema/user.schema")
const History=require("../schema/history.schema");
const itemController = require("./item.controller");
const Items =require("../schema/item.schema");
const Total = require("../schema/total.schema");
module.exports={
  addToCart:async(req,res,next)=>{
    let {id}=req.body
    if(!id ){
      res.status(400).json({msg:'have some error, please add again'})
      return;
    }
    let item=null;
    try {
       item=await Items.findById(id)
      if(!item){
        res.status(400).json({msg:"item not found"})
        return;
      }
      
    } catch (error) {
      
      res.status(400).json({msg:"error"})
      return;
    }
    const product=[id]
    
    const newcart=new Cart({
      itemId:product,
      totalCost:item.price
     
    })
    const decode=await auth(req.headers.authorization)
     const user=await Users.findById(decode.sub)
    if(!user.cart){
      const result= await newcart.save()
      console.log(result);
      const updateUser=await Users.findByIdAndUpdate(decode.sub,{cart:result._id},{
        
          new: true,
          runValidators: true,
          useFindAndModify: false
      
      })
      res.json({result,updateUser})
      return;
    }
    const oldCart=await Cart.findById(user.cart)
    if(!oldCart){
      res.status(400).json({msg:"not found cart"})
      return;
    }
    let TotalCost=oldCart.totalCost;
    TotalCost+=parseInt(item.price)
    const updateCart=await Cart.findByIdAndUpdate(user.cart,{
      $push: {
          itemId: id
      },
      totalCost:TotalCost
  },{
    new: true,
    runValidators: true,
    useFindAndModify: false
}
  )
  res.json({updateCart,msg:"add successful item to cart"})
    
  },
  removeToCart:async(req,res,next)=>{
         const {id}=req.body
        let price=null
        let TotalCost=null
      if(!id ){
          res.status(400).json({msg:'have some error, pease add again'})
          return;
        }
        try {
          item=await Items.findById(id)
          console.log(item);
         if(!item){
           res.status(400).json({msg:"item not found"})
           return;
         }
       price=item.price
         const decode=await auth(req.headers.authorization)
         console.log(decode);
     const user=await Users.findById(decode.sub)
    const oldcart=await Cart.findById(user.cart)
    totalCost=oldcart.totalCost
    totalCost=totalCost-price
    console.log(totalCost);
     const updateCart=await Cart.findByIdAndUpdate(user.cart,{
      $pull: {
          itemId: id
      },
      totalCost
  },{
    new: true,
    runValidators: true,
    useFindAndModify: false
})
console.log("update:",updateCart);
  res.json({updateCart})
       } catch (error) {
         console.log(error);
         res.status(400).json({msg:"error"})
         return;
       }
       
  },
  checkout:async(req,res,next)=>{
    let {phone,address,id}=req.body
    if(!phone || !address|| !id){
      res.status(400).json({msg:"some error happen, please check again"})
      return;
    }
    let historyCheckedOut=null;
    try {
       historyCheckedOut=await Cart.findById(id)
      if(historyCheckedOut.status==true){
        res.status(400).json({msg:"cart already checked out"})
        return;
      }
      
    } catch (error) {
      res.status(400).json({msg:"error"})
    }
    const decode=await auth(req.headers.authorization)
    const checkOutCart=await Cart.findById(id)
    if(!checkOutCart){
      res.status(400).json({msg:"not found cart"})
      return;
    }
    const newCheckout=new History({
      totalCost:checkOutCart.totalCost,
      itemId:checkOutCart.itemId,
      userId:decode.sub,
      phone,
      address
    })
    const result=await newCheckout.save()
    const itemupdate= await  itemController.updateSoldAndQuantityItem(checkOutCart.itemId)
     const cart=await Cart.findByIdAndUpdate(id,{status:true},{
      
        new: true,
        runValidators: true,
        useFindAndModify: false
    
     })
     await itemController.updateSoldAndTotalIncomeTotal(checkOutCart.itemId.length,checkOutCart.totalCost)
   
     
     console.log("itemupdate",itemupdate);
   
    // const updateTotal=await Total.findByIdAndUpdate()
     const user=await Users.findByIdAndUpdate(decode.sub,{cart:null},{

      new: true,
      runValidators: true,
      useFindAndModify: false
     })
     res.json({result,cart,user,itemupdate})
  },
  
}