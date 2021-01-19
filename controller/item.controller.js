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
const auth = require("../middleware/verifyToken")
const update1 = async (id, item, quantity1) => {
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
const decrease = async (id, item, quantity1) => {
    let TotalSoldofItem = item.sold - parseInt(quantity1);
    let quantity = item.quantity + parseInt(quantity1);

    const itemsupdate = await Items.findByIdAndUpdate(id, {
        sold: TotalSoldofItem,
        quantity: quantity
    }, {
        new: true,
        runValidators: true
    })
    return itemsupdate
}

const updateSoldAndQuantityItemAsync = async (id, quantity) => {
    const item = await Items.findById(id)

    if (!id) {
        // res.status(400).json({
        //     msg: "item not found"
        // })
        return ({ msg: "item not found" });

    }
    if (item.quantity <= 0) {

        // res.status(400).json({msg:"not found"})
        return ({ msg: "soud out" });

    }
    const update = await update1(id, item, quantity)
    return update

}
const decreaseSoldAndQuantityItemAsync = async (id, quantity) => {
    const item = await Items.findById(id)

    if (!id) {
        // res.status(400).json({
        //     msg: "item not found"
        // })
        return ({ msg: "item not found" });

    }
    if (item.quantity <= 0) {

        // res.status(400).json({msg:"not found"})
        return ({ msg: "soud out" });

    }
    const update = await decrease(id, item, quantity)
    return update

}

module.exports = {
    getItem: async (req, res, next) => {
        let page = req.params.page ? parseInt(req.params.page) : 1
        let limit = req.params.limit ? parseInt(req.params.limit) : 3

        let order = req.params.order ? req.params.order : "desc";
        let sortBy = req.params.sortBy ? req.params.sortBy : "_id";
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
        let gt = `${year}-${month}-${day - 1}`
        let lt = `${year}-${month}-${day + 1}`
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
        const { priceMin, priceMax } = req.body

        const newitem = new Items({
            ...req.body
        })
        await newitem.save()
        res.json({ item: newitem, msg: "Add succesful !!!" })
    },

    decreaseSoldAndQuantityItem: async (arrId) => {
        let itemsupdate = []

        var count = {};
        arrId.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
        arrId = [...new Set(arrId)]
        // const item=await Items.updateMany({_id:arrId.map((id)=>id)},{})
        await arrId.forEach(async (id) => {
            let quantity = count[id]

            const update = await decreaseSoldAndQuantityItemAsync(id, quantity)

            itemsupdate.push(update)
        })

        return itemsupdate

    },


    updateItem: async (req, res, next) => {
        let {
            id, priceMin, priceMax, tier_variations
        } = req.body
        if (priceMax < priceMin) {
            return res.json({ msg: "priceMax must greater than pmin price" })
        }
        const exitItem = await Items.findById(id)
        const existtier_variations = exitItem.tier_variations.find(function (element) {

            if (element.name === tier_variations.name) {
                return element;
            }
        });
        existtier_variations.option.push(tier_variations.option)
        existtier_variations.option.push(tier_variations.image)
        delete req.body.tier_variations;
        if (existtier_variations) {
            const itemsupdate = await Items.findByIdAndUpdate(id,
                {
                    $set: req.body,
                    //    tier_variat
                }
                , {
                    useFindAndModify: false,
                    new: true,
                    runValidators: true
                })
            if (!itemsupdate) {
                return res.json({
                    msg: "item not  found"
                })
            }


        }
        res.json({
            itemsupdate
        })
    },
    deleteItem: async (req, res, next) => {
        console.log(req.body);

        const decode = await auth(req.headers.authorization)
        const user = await User.findById(decode.sub)
        console.log(user);
        const items = await Items.findById(req.body.iditem)
        console.log(items);
        if (!items) {
            return res.json({
                msg: "item not found"
            })
        }

        await items.remove();
        res.json({
            msg: "remove successful"
        })





    },
    uploadImage: async (req, res, next) => {
        const path = req.file.path
        try {
            if (!path) {
                return res.status(400).json({
                    msg: "image null"
                })
            }
            console.log(path);
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
            res.json({ path: req.file.path })
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