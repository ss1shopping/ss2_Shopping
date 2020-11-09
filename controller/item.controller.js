const User = require("../schema/user.schema")
const Total = require("../schema/total.schema")
const Items = require("../schema/item.schema");
const {
    addItemtolist,
    updateItemtoList,
    removeItemtoList,
    clientredis
} = require("../middleware/redis")
const JWT = require("jsonwebtoken");
const config = require("../config/index");
const update1=async(id,item,quantity1)=>{
    let TotalSoldofItem = item.sold + parseInt(quantity1);
    let quantity = item.quantity - parseInt(quantity1);

    const itemsupdate = await Items.findByIdAndUpdate(id, {
        sold: TotalSoldofItem,
        quantity: quantity
    }, {
        new: true,
        runValidators: true
    })
    return itemsupdate
}
const updateSoldAndQuantityItemAsync=async(id,quantity)=>{
    const item = await Items.findById(id)
    
    if (!id) {
        // res.status(400).json({
        //     msg: "item not found"
        // })
        return ({msg:"item not found"});
        
    }
    if (item.quantity <= 0) {
        
        // res.status(400).json({msg:"not found"})
        return ({msg:"soud out"});
        
    }
    const update=await update1(id,item,quantity)
    return update
    
}

module.exports = {
    getItem: async (req, res, next) => {
        console.log(req.params);
        let page = req.params.page ? parseInt(req.params.page) : 1
        let limit = req.params.limit ? parseInt(req.params.limit) : 3

        let order = req.body.order ? req.body.order : "desc";
        let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const results = await Items.find()
            .sort([
                [sortBy, order]
            ])
            // .populate({path:"image"})
            .limit(limit) // loading 3 trang xong call redis
            .skip(startIndex)
            .exec()

        // results.img=await itemImage.find({shoppingid:results._id})
        
        res.status(200).json(results)
    },
    getAllitem: async (req, res, next) => {
        console.log(req.params);
        let {
            day,
            month,
            year
        } = req.params
        var currdatetime = new Date();
       
        day = day ? day : "02";
        month = month ? month : "01"
        year = year ? year : "2020"
        let gt = `${year}-${month}-${day-1}`
        let lt = `${year}-${month}-${day+1}`
        let TotalView = 0;
        let TotalPrice = 0;
        let TotalSold = 0;
        try {
            //gt:new Date(date) // tru 1 ngay vi greater than
            //lt new Date(date) //cong 1 ngay vi less than
            const results = await Items.find({
                    createdAt: {
                        $gt: new Date(gt),
                        $lt: new Date(lt)
                    }
                })
                .exec()

            res.json(results)

        } catch (error) {
           
            res.status(400).json({
                msg: "error please again"
            })
        }

    },
    addItem: async (req, res, next) => {
        const {
            name,
            quantity,
            price,
            description,
            image
        } = req.body
       
    // let imagearray=[]
    //     console.log(req.files);
    // if(req.files){
    //     req.files.map((index)=>{
    //         imagearray.push(index.path)
    //     })
    // }
    //     console.log(imagearray);
        if (!price) {
            res.status(400).json({
                msg: "price not found"
            })
        }
        //ckeck xong heets 
        const newitem = new Items({
            name,
            description,
            price,
            quantity,
            image
        })
        await newitem.save()
        res.json({item:newitem,msg:"Add succesful !!!"})
    },
    updateSoldAndQuantityItem: async (arrId) => {
        let itemsupdate=[]
      
var  count = {};
arrId.forEach(function(i) { count[i] = (count[i]||0) + 1;});
arrId=[...new Set(arrId)]
        // const item=await Items.updateMany({_id:arrId.map((id)=>id)},{})
       await  arrId.forEach(async(id)=>{
         let quantity=count[id]
     
      const update=  await updateSoldAndQuantityItemAsync(id,quantity)
      
    itemsupdate.push(update)
      })
       
       return itemsupdate
       
        
        


    },
    
    updateSoldAndTotalIncomeTotal:async (quantity,cost)=>{
        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        let year = new Date().getFullYear()
        let gt = `${year}-${month}-${day}`
        let lt = `${year}-${month}-${day+1}`

        const TotalUpdate = await Total.find({
            createdAt: {
                $gt: new Date(gt),
                $lt: new Date(lt)
            }
        })
        if (TotalUpdate.length == 0) {
            const newTotal = new Total({
                sold:quantity,
                totalInCome:cost
    
            })
            result = await newTotal.save()

            // res.json({
            //     itemsupdate,
            //     result
            // })
            return ({result});
        }else{

            let TotalSold = TotalUpdate[0].sold
            let TotalCost=TotalUpdate[0].totalInCome
            TotalSold += parseInt(quantity);
            TotalCost+=parseInt(cost)
            const updateTotalItem = await Total.findOneAndUpdate({
                createdAt: {
                    $gt: new Date(gt),
                    $lt: new Date(lt)
                }
            }, {
                sold: TotalSold,
                totalInCome:TotalCost
            }, {
                new: true,
                runValidators: true
            })
           
            // res.json({
            //     itemsupdate,
            //     updateTotalItem
            // })
            return updateTotalItem;
        }
    },
    updateView: async (req, res, next) => {
        const {
            id,
            
        } = req.body

        let month = new Date().getMonth() + 1;
        let day = new Date().getDate();
        let year = new Date().getFullYear()

        console.log(day, month, year);
        const item = await Items.findById(id)
        if (!id) {
            res.status(400).json({
                msg: "item not found"
            })
        }
       
        let TotalViewOfItem = item.view + parseInt(1);

        const itemsupdate = await Items.findByIdAndUpdate(id, {
           view:TotalViewOfItem
        }, {
            new: true,
            runValidators: true
        })


        let gt = `${year}-${month}-${day}`
        let lt = `${year}-${month}-${day+1}`
        const results = null;
        const newTotal = new Total({
            view:1

        })

        const TotalUpdate = await Total.find({
            createdAt: {
                $gt: new Date(gt),
                $lt: new Date(lt)
            }
        })
        if (TotalUpdate.length == 0) {
            result = await newTotal.save()

            res.json({
                itemsupdate,
                result
            })
        }else{
            let TotalView = TotalUpdate[0].view
            TotalView += parseInt(1);
            const updateTotalItem = await Total.findOneAndUpdate({
                createdAt: {
                    $gt: new Date(gt),
                    $lt: new Date(lt)
                }
            }, {
                view: TotalView
            }, {
                new: true,
                runValidators: true
            })
    
    
            res.json({
                itemsupdate,
                updateTotalItem
            })

        }

    },

    updateItem: async (req, res, next) => {
        let {
            id,name,description,quantity,price
        } = req.body
         quantity=parseInt(quantity);
         price=parseInt(price)
        const item = await Items.findById(id)
        if (!item) {
            res.json({
                msg: "item not  found"
            })
            return;
        }
        //    const contentUpdate =JSON.stringify(req.body);
        const itemsupdate = await Items.findByIdAndUpdate(id, {name,description,quantity,price}, {
            new: true,
            runValidators: true
        })
        res.json({
            itemsupdate
        })
    },
    deleteItem: async (req, res, next) => {

        try {
            const items = (await Items.findById(req.body.iditem))
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
    uploadImage: async (req, res, next) => {
        const path = req.file.path
        try {
            if (!path) {
                return res.status(400).json({
                    msg: "image null"
                })
            }
            const image = {
                "path": path
            }


            // const newImage = new itemImage({
            //     img: path,
            //     shoppingid: req.body.shoppingid
            // })
            // const result = await newImage.save()
            // const itemsupdate = await Items.findByIdAndUpdate(req.body.shoppingid, {
            //     $push: {
            //         image: result._id
            //     }
            // }, {
            //     new: true,
            //     runValidators: true,
            //     useFindAndModify: false
            // })
            // console.log(itemsupdate);
            // if (!itemsupdate) {
            //     return res.json({
            //         msg: "item not found"
            //     })
            // }
            res.json({path:req.file.path})
        } catch (error) {
            console.log(error);
            res.status(400).json({
                msg: "no found"
            })
        }


    },
    deleteImage: async (req, res, next) => {
        const {
            id
        } = req.body
        if (!id) {
            return res.json({
                msg: "pls choice image to delete"
            })
        }
        const Image = await itemImage.findById(id)
        if (!Image) {
            res.json({
                smg: "image not found"
            })
        }
        await Image.remove()
        res.json({
            msg: "succesfully"
        })
    }
}