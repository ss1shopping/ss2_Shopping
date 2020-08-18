const Items = require("../schema/shoppingItem.schema")
const User = require("../schema//user.schema")
const itemImage = require("../schema/itemImage.schema");
const Shopping = require("../schema/shoppingItem.schema");
module.exports = {
    getItem: async (req, res, next) => {
        const item = await Items.find().populate({path:"userid"})
        res.status(200).json(item)
    },
    addItem: async (req, res, next) => {
        const {
            description,
            price,
            city,
            quantity,
            userid
        } = req.body
        const user = await User.findById(userid)
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
            userid,

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
     try {
          if(!path){
            return res.status(400).json({msg:"image null"})
        }
        const item=await Items.findById(req.body.shoppingid)
        if(!item){
            return res.json({msg:"item not found"})
        }
        const newImage=new itemImage({
            img:path,
            shoppingid:req.body.shoppingid
        })
        const result=await newImage.save()
        res.json(result) 
     } catch (error) {
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