const History=require("../schema/history.schema")
const  auth  = require("../middleware/verifyToken");
const itemController = require("./item.controller");
module.exports={
    getAllHistory:async (req,res,next)=>{
        let page = req.params.page ? parseInt(req.params.page) : 1
        let limit = req.params.limit ? parseInt(req.params.limit) : 3
        let status=req.params.status ? req.params.status :"pending"
        const startIndex = (page - 1) * limit
        const history=await History.find({status}).sort({"_id":-1}).limit(limit).skip(startIndex).populate("userId")
        res.json({history})
    },
    getInforHistoryofUser:async(req,res,next)=>{
        let page = req.params.page ? parseInt(req.params.page) : 1
        let limit = req.params.limit ? parseInt(req.params.limit) : 3
        const startIndex = (page - 1) * limit
        const decode=await auth(req.headers.authorization)
        // let id=req.params.id;
        console.log(decode.sub);
        const history=await History.find({userId:decode.sub}).sort([['updatedAt', 'ascending']]).limit(limit).skip(startIndex)
        res.json({history})
    },
    deleteOrder:async(req,res,next)=>{
        const {id}=req.body;
        console.log(req.body);
        const order=await History.findById(id)
        if(!order){
            return res.json({msg:"order not found"})
        }
        await order.remove()
        return res.json({msg:"successful"})
        
    },
    exportOrder:async(req,res,next)=>{
        const id=req.params.id
        const history=await History.findById(id)
        if(!history){
            return res.json({msg:"not found"})
        }
        const historyUpdate=await History.findByIdAndUpdate(id,{status:'shipping'},{
            new: true,
            runValidators: true,
            useFindAndModify: false
        
         })
         res.json({msg:"success",history:historyUpdate})
    },
    finishBilling:async(req,res,next)=>{
        const id=req.params.id
        const history=await History.findById(id)
        if(!history){
            return res.json({msg:"not found"})
        }
        const historyUpdate=await History.findByIdAndUpdate(id,{status:'finish'},{
      
            new: true,
            runValidators: true,
            useFindAndModify: false
        
         })
         res.json({msg:"success",history:historyUpdate})
    },
    cancelledBilling:async(req,res,next)=>{
        const id=req.params.id
        const history=await History.findById(id)
        if(!history){
            return res.json({msg:"not found"})
        }
        const updateItem=await itemController.decreaseSoldAndQuantityItem(history.itemId)
        await history.remove()
        return ({msg:"successful"})

    }

    
    
}