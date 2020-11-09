const History=require("../schema/history.schema")
const  auth  = require("../middleware/verifyToken");
module.exports={
    getAllHistory:async (req,res,next)=>{
        let page = req.params.page ? parseInt(req.params.page) : 1
        let limit = req.params.limit ? parseInt(req.params.limit) : 3
        const startIndex = (page - 1) * limit
        const history=await History.find().sort().limit(limit).skip(startIndex).populate("userId")
        res.json({history})
    },
    getInforHistoryofUser:async(req,res,next)=>{
        
        const decode=await auth(req.headers.authorization)
        // let id=req.params.id;
        console.log(decode.sub);
        const history=await History.find({userId:decode.sub})
        res.json({history})
    }
}