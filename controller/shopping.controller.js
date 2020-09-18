const Items = require("../schema/shoppingItem.schema")
const User = require("../schema/user.schema")
const itemImage = require("../schema/itemImage.schema");
const Shopping = require("../schema/shoppingItem.schema");
const {addItemtolist,
    updateItemtoList,
    removeItemtoList,clientredis}=require("../middleware/redis")
const JWT=require("jsonwebtoken");
const config = require("../config/index");
module.exports = {
    getItem: async (req, res, next) => {
          let page=parseInt(req.query.page)
           let limit=parseInt(req.query.limit)
    let order=req.body.order ?  req.body.order:"desc";
        let sortBy=req.body.sortBy ? req.body.sortBy:"_id";
       const  startIndex=(page-1)*limit
       const endIndex=page*limit
        // const token=req.headers.authorization.split(" ")[1]
        // const decode=JWT.verify(token,config.secretkey)
    //    const exists=await clientredis.exists(res.users.sub)
    //         if(exists){
    //             clientredis.get(res.users.sub,function(err,data){
    //                 if(err){
    //                     res.status(400).json({msg:err})
    //                 }
    //                 if (data !== null || undefined) {
    //                  res.status(200).json({
    //                      "item":data
    //             })
    //               } 
    //             })
    //         }
        //    let results={}
        //    if(endIndex< Items.countDocuments().exec()){
        //        results.next={
        //            page:page+1,
        //            limit:limit
        //        } 

        //    }
        //    if(startIndex>0){
        //        results.previous={
        //           page:page-1,
        //           limit:limit
        //       } 

        //    }
        
          const results = await Items.find({userid:req.users.sub})
         .sort([[sortBy,order]])
        // .populate({path:"image"})
        .limit(limit)  // loading 3 trang xong call redis
        .skip(startIndex)
        .exec()
        
        // results.img=await itemImage.find({shoppingid:results._id})
         console.log(results);
        res.status(200).json(results)
    },
    addItem: async (req, res, next) => {
        const {
            description,
            price,
            city,
            quantity,
           
            image,
        } = req.body
        console.log(req.users);
        const user = await User.findById(req.users.sub)
        if (!user) {
            res.status(400).json({
                msg: "user not found"
            })
        }

        const newItem = new Items({
            description,
            price,
            city,
            quantity,
            userid:req.users.sub,
            image

        })
        const result = await newItem.save()
        res.status(200).json(newItem)
    },
    updateItem: async (req, res, next) => {
        const {
            iditem,
            userid
        } = req.body
        const item = await Items.findOne({
            userid
        })
        if (!item) {
            return res.json({
                msg: "user not match with any items"
            })
        }
        //    const contentUpdate =JSON.stringify(req.body);
        const itemsupdate = await Items.findByIdAndUpdate(iditem, req.body, {
            new: true,
            runValidators: true
        })
        res.json({
            itemsupdate
        })
    },
    deleteItem: async (req, res, next) => {

        try {
            const items = (await Items.findById(req.body.iditem)).populate("itemImage")
            if (!items) {
                return res.json({
                    msg: "item not found"
                })
            }
            if (items.userid.toString() == req.body.user.userid.toString()) {
                await items.remove();
            }
            res.json({
                msg: "remove successful"
            })
        } catch (error) {

            return res.status(400).json({
                msg: "not found"
            })
        }
    },
    uploadImage:async(req,res,next)=>{
        const path=req.file.path
        console.log(path);
     try {
          if(!path){
            return res.status(400).json({msg:"image null"})
        }
        const image={
            "path":path
        }
       
       
        const newImage=new itemImage({
            img:path,
            shoppingid:req.body.shoppingid
        })
        const result=await newImage.save()
         const itemsupdate = await Items.findByIdAndUpdate(req.body.shoppingid, {$push:{image:result._id}}, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
         console.log(itemsupdate);
        if(!itemsupdate){
            return res.json({msg:"item not found"})
        }
        res.json(result) 
     } catch (error) {
         console.log(error);
         res.status(400).json({msg:"no found"})
     }
      

    },
    deleteImage:async(req,res,next)=>{
        const {id}=req.body
        if(!id){
            return res.json({msg:"pls choice image to delete"})
        }
        const Image= await itemImage.findById(id)
        if(!Image){
            res.json({smg:"image not found"})
        }
        await Image.remove()
      res.json({msg:"succesfully"})
    }
}