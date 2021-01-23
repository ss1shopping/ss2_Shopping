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
    /**
     * @URL /item/get
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getItems: async (req, res, next) => {

        res.status(200).json(res.advancedResults)
    },
    /**
     * @URL /item/get-one/:id
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    getone: async (req, res, next) => {
        const { id } = req.params
        console.log(id);
        const item = await Items.findById(id).populate("models").populate("category").populate("tier_variations")
        res.json(item)
    },

    /**
    * @URL /item/create
    * @method post
    * @param {name,priceMin,priceMax,discount,sold,category}
    */
    addItem: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { priceMin, priceMax } = req.body
        if (priceMin > priceMax) {
            return res.json({ msg: "price min not > maxPrice" })
        }
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let {
            id, priceMin, priceMax
        } = req.body
        if (priceMax < priceMin) {
            return res.json({ msg: "priceMax must greater than pmin price" })
        }

        const itemsupdate = await Items.findByIdAndUpdate(id,
            {
                $set: req.body,
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
        res.json({
            itemsupdate
        })
    },
    deleteItem: async (req, res, next) => {

        const { id } = req.params
        try {
            const items = await Items.findById(id)
            if (!items) {
                return res.json({
                    msg: "item not found"
                })
            }

            await items.remove();
            res.json({
                msg: "remove successful"
            })

        } catch (error) {
            res.json({ msg: "some problem" })
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