const fs = require("fs");
const Cart = require("../schema/cart.schema");
// const Users = require("../schema/user.schema")
// const History = require("../schema/order.schema");
// const itemController = require("./item.controller");
// const Items = require("../schema/item.schema");
// const Total = require("../schema/total.schema");
module.exports = {
  addToCart: async (req, res, next) => {
    //modelId will modified later
    const { number, itemId, modelId } = req.body

    if (number < 0) {
      return res.status(400).json('quantity must be integer');
    }
    //userId the replace with decode from token
    const userId = req.user._id  //req.currentUser._id
    const productExist = await Product.findOne({ _id: itemId, "models._id": modelId }) //will find more model in here
    if (!productExist) {
      return res.status(400).json('product not exist');
    }
    const model = productExist.models.find(function (element) {

      if (element._id == modelId) {
        return element;
      }
    });
    //check whether the product is in the cart or not
    const existProductIncart = await Cart.findOne({ itemId, userId })
    if (existProductIncart) {
      let newnumber = existProductIncart.number + number
      let totalPrice = (existProductIncart.totalPrice / existProductIncart.number) * newnumber
      if (totalPrice < 0) {
        return res.status(400).json('totalPrice must be positive');
      }
      const increNumber = await Cart.findByIdAndUpdate(existProductIncart._id, { number: newnumber, totalPrice },
        {
          useFindAndModify: false,
          new: true,
          runValidators: true,
        })
      return res.json(increNumber)

    } else {
      let totalPrice = (model.price * number)
      if (totalPrice < 0) {
        return res.status(400).json('totalPrice must be positive');
      }
      const newCart = new Cart({
        userId, number, itemId, totalPrice, modelId
      })
      await newCart.save()
      return res.json(newCart)

    }
  },
  removeToCart: async (req, res, next) => {
    const userId = req.user._id
    const carts = JSON.parse(req.params.carts)

    const deleteCart = await Cart.deleteMany({ userId, _id: { $in: carts } })
    console.log(deleteCart);

    res.json({ msg: "successful", infor: deleteCart })
  },
  emptyCart: async (req, res, next) => {
    //will decoded to get userId
    const userId = req.user._id //req.currentUser

    const existCart = await Cart.find({ userId })
    if (!existCart) {
      throw new BadRequestError("Not Found")
    }
    const deleteCart = await Cart.deleteMany({ userId })

    res.json({ msg: "successful", infor: deleteCart })
  },
  getCart: async (req, res, next) => {
    const userId = req.user._id //rreq.currentUser._id
    const cart = await Cart.find({ userId })
    res.json(cart)
  },
  updateCart: async (req, res, next) => {
    //user will modify later
    const userId = req.user._id
    const { id, number } = req.body
    if (number < 0) {
      throw new BadRequestError("number must be greater than 0")
    }
    const existCart = await Cart.findById(id).populate("itemId")

    if (!existCart) {
      throw new BadRequestError("cart not found")
    }
    const models = existCart.itemId.models
    const model = models.find(function (element) {
      if (element.id == existCart.modelId) {
        return element;
      }
    });
    let totalPrice = number * model.price
    const updateCart = await Cart.findByIdAndUpdate(id, { number, totalPrice },
      {
        useFindAndModify: false,
        new: true,
        runValidators: true,
      })
    res.json(updateCart)
  }

}