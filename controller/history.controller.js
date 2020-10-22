const History=require("../schema/history.schema")

module.exports={
    getAllHistory:async (req,res,next)=>{
        let page = req.params.page ? parseInt(req.params.page) : 1
        let limit = req.params.limit ? parseInt(req.params.limit) : 3
        const startIndex = (page - 1) * limit
        const history=await History.find().sort().limit(limit).skip(startIndex).populate("userId")
        res.json({history})
    }
}