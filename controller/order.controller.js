const Orders = require("../schema/order.schema")
const Cart = require("../schema/cart.schema")
const itemController = require("./item.controller");
const Models = require("../schema/models.schema");
const Items = require("../schema/item.schema");
module.exports = {
    /**
     * 
     * @param {cart:["cart1",cart[2],cart[3]],address,phone ,userId,item} req 
     * @param {*} res 
     * @param {*} next 
     */
    checkout: async (req, res, next) => {
        const { carts } = req.body
        const exitcarts = await Cart.find({
            "_id": {
                $in: carts
            }
        })

        if (carts.length() === 0) {
            res.status(400).json({ msg: " not found any item in cart" })
        }
        const totalCost = 0;
        const items = {}
        exitcarts.map(cart => {
            totalPrice = totalCost + cart.totalPrice
            items[cart._id] = items[cart._id] + cart.number
        })
        const newOrder = new Orders({
            item: exitcarts,
            address: address,
            phone: phone,
            userId: req.user._id,
            totalCost: totalCost
        })
        await newOrder.save()
        Promise.all(exitcarts.map((cart) => {
            await Models.findOneAndUpdate({ modelId: cart.modelId }, {
                sold: cart.number,
            })
            await
        }))
            .then(cart => console.log("success"))
        try {

            for (const id in item) {
                await Items.findByIdAndUpdate(id, {
                    sold: item[id]
                }, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false
                }
                )
            }
        } catch (error) {
            res.json({ msg: "error" })
        }

        const deletecart = await Cart.remove({
            "_id": {
                $in: carts
            }
        })

        res.json(newOrder)
    },
    /**
     * @url 
     * @param {status,limit,page,sort} req 
     * @param {} res 
     * @param {*} next 
     */
    getAllOrders: async (req, res, next) => {
        // let page = req.params.page ? parseInt(req.params.page) : 1
        // let limit = req.params.limit ? parseInt(req.params.limit) : 3
        // let status = req.params.status ? req.params.status : "pending"
        // const startIndex = (page - 1) * limit
        //const history = await Orders.find({ status }).sort({ "_id": -1 }).limit(limit).skip(startIndex).populate("userId")

        res.json(res.advancedResults)
    },
    /**
     * 
     * @param {userId,limit,page,sort} req 
     * @param {*} res 
     * @param {*} next 
     */
    getInforOrdersOfUser: async (req, res, next) => {
        // let page = req.params.page ? parseInt(req.params.page) : 1
        // let limit = req.params.limit ? parseInt(req.params.limit) : 3
        // const startIndex = (page - 1) * limit
        // const decode = await auth(req.headers.authorization)
        // // let id=req.params.id;
        // console.log(decode.sub);
        // const history = await Orders.find({ userId: decode.sub }).sort([['updatedAt', 'ascending']]).limit(limit).skip(startIndex)
        res.json(res.advancedResults)
    },
    deleteOrder: async (req, res, next) => {
        const { id } = req.body;
        console.log(req.body);
        const order = await Orders.findById(id)
        if (!order) {
            return res.json({ msg: "order not found" })
        }
        await order.remove()
        return res.json({ msg: "successful" })

    },
    exportOrder: async (req, res, next) => {
        const id = req.params.id
        const historyUpdate = await Orders.findByIdAndUpdate(id, { status: 'shipping' }, {
            new: true,
            runValidators: true,
            useFindAndModify: false

        })
        if (!historyUpdate) {
            return res.json({ msg: "not found" })
        }
        res.json({ msg: "success", history: historyUpdate })
    },
    finishBilling: async (req, res, next) => {
        const id = req.params.id
        const historyUpdate = await Orders.findByIdAndUpdate(id, { status: 'finish' }, {

            new: true,
            runValidators: true,
            useFindAndModify: false

        })
        if (!historyUpdate) {
            return res.json({ msg: "not found" })
        }
        res.json({ msg: "success", history: historyUpdate })
    },
    cancelledBilling: async (req, res, next) => {
        const id = req.params.id

        const updateItem = await itemController.decreaseSoldAndQuantityItem(history.itemId)
        await history.remove()
        if (!updateItem) {
            return res.json({ msg: "not found" })
        }
        return ({ msg: "successful" })

    }



}