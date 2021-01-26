const Orders = require("../schema/order.schema")
const Cart = require("../schema/cart.schema")
const itemController = require("./item.controller");
const Models = require("../schema/models.schema");
const Items = require("../schema/item.schema");
const { validationResult } = require('express-validator');

function groupShopId(arra1) {
    let objectContaintNUmber = {}

    arra1.map((item) => {

        if (!objectContaintNUmber[item.shopId]) {
            let newarray = []
            newarray.push(item)

            objectContaintNUmber[item.shopId] = newarray
            //console.log(objectContaintNUmber[item.shopId]);
        } else {
            let ok = objectContaintNUmber[item.shopId]
            ok.push(item)
            objectContaintNUmber[item.shopId] = ok

        }
    })

    return objectContaintNUmber;
    /**
     * {id:[{},{}]}
     */
}
function groupItemId(arra1) {
    let objectContaintNUmber = {}

    arra1.map((item) => {

        if (!objectContaintNUmber[item.itemId]) {
            objectContaintNUmber[item.itemId] = item.number

        } else {
            objectContaintNUmber[item.itemId] += item.number

        }
    })

    return objectContaintNUmber;
    /**
     * {id:[{},{}]}
     */
}
module.exports = {
    /**
     * 
     * @param {cart:["cart1",cart[2],cart[3]],address,phone ,userId,item} req 
     * @param {*} res 
     * @param {*} next 
     */
    checkout: async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { carts, address, phone } = req.body
        const exitcarts = await Cart.find({
            "_id": {
                $in: carts
            }
        })

        if (carts.length === 0) {
            res.status(400).json({ msg: " not found any item in cart" })
        }

        const newarray = []
        const newExistcarts = [
            ...exitcarts
        ]
        const arraycontaintNumber = groupShopId(newExistcarts)
        //console.log(arraycontaintNumber);
        /**
         * {id:[{},{}]}
         */
        for (const idCart in arraycontaintNumber) {
            let totalCost = 0;
            arraycontaintNumber[idCart].map(cart => {
                totalCost += cart.totalPrice
            })
            const newOrder = {
                address,
                phone,
                totalCost,
                userId: req.user.id,
                detail: arraycontaintNumber[idCart],
                shopId: req.user.shopId
            }
            newarray.push(newOrder)
        }
        const newOrders = await Orders.insertMany(newarray)
        if (!newOrders) {
            res.status(400).json(newOrders)
        }

        const deletecart = await Cart.deleteMany({
            "_id": {
                $in: carts
            }
        })

        res.json({ order: newOrders, cart: deletecart })
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
    ChangeStatusOrder: async (req, res, next) => {
        const { id, status } = req.body

        const historyUpdate = await Orders.findByIdAndUpdate(id, { status }, {
            new: true,
            runValidators: true,
            useFindAndModify: false

        })
        if (!historyUpdate) {
            return res.json({ msg: "not found" })
        }
        if (status == "shipping") {
            Promise.all(historyUpdate.detail.map(async (cart) => {
                await Models.findByIdAndUpdate(cart.modelId, {
                    $inc: { sold: cart.number },
                }, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false
                })
            }))
                .then(cart => console.log("models update"))
                .catch(error => console.log(error))

            const arrayGroup = groupItemId(historyUpdate.detail)
            console.log(arrayGroup);
            try {
                for (const id in arrayGroup) {
                    await Items.findByIdAndUpdate(id, {
                        $inc: { sold: arrayGroup[id] }
                    }, {
                        new: true,
                        runValidators: true,
                        useFindAndModify: false
                    }
                    )
                }
            } catch (error) {
                console.log(error);
                return res.json({ msg: "error" })
            }

        }

        res.json({ msg: "success", history: historyUpdate })
    },
    cannceledOrder: async (req, res, next) => {
        const { id } = req.body

        const orderUpdate = await Orders.findByIdAndUpdate(id, { isCancelled: true }, {
            new: true,
            runValidators: true,
            useFindAndModify: false

        })
        if (!orderUpdate) {
            return res.json({ msg: "not found" })
        }
        Promise.all(orderUpdate.detail.map(async (cart) => {
            await Models.findByIdAndUpdate(cart.modelId, {
                $inc: { sold: cart.number * -1 },
            }, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            })
        }))
            .then(cart => console.log("models update"))
            .catch(error => console.log(error))

        const arrayGroup = groupItemId(orderUpdate.detail)
        try {
            for (const id in arrayGroup) {
                await Items.findByIdAndUpdate(id, {
                    $inc: { sold: (arrayGroup[id]) * -1 }
                }, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false
                }
                )
            }
        } catch (error) {
            console.log(error);
            return res.json({ msg: "error" })
        }
        res.json(orderUpdate)
    }



}