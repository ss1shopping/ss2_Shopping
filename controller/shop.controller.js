const Shops = require("../schema/shop.schema")
const User = require("../schema/user.schema")
module.exports = {
  create: async (req, res, nexrt) => {
    const userId = req.user._id
    const { name, description } = req.body
    const exitNameShop = await Shops.findOne({ userId })
    if (exitNameShop) {
      res.status(400).json("shop already exist")
    }
    const newShop = new Shops({
      name, description, userId
    })
    await newShop.save()
    const updateUser = await User.findByIdAndUpdate(userId, {
      shopId: newShop._id,
    }, {
      useFindAndModify: false,
      new: true,
      runValidators: true
    }
    )
    res.json({ shop: newShop, user: updateUser })
  },
  delete: async (req, res, next) => {
    const { id } = req.params;
    const existShop = await Shops.findByIdAndRemove(id)
    if (!existShop) {
      res.json(400).json({ msg: "shop not found" })
    }
    await existShop.remove()
    const updateUser = await User.findByIdAndUpdate(id, {
      shopId: null,
    })
    if (!updateUser) {
      res.status(400).json({ msg: "user not found" })
    }
    res.json({ data: existShop, msg: "successful" })
  },
  getall: async (req, res, next) => {
    res.json(res.advancedResults)
  },
  getone: async (req, res, next) => {
    console.log(req.user);
    const id = req.user._id
    const existShop = await Shops.findOne({ userId: id })
    if (!existShop) {
      return res.status(400).json({ msg: "shop not found" })
    }
    res.json(existShop)
  },
  update: async (req, res, next) => {
    const { id } = req.body
    const existShop = await Shops.findByIdAndUpdate(id, {
      $set: req.body
    },
      {
        useFindAndModify: false,
        new: true,
        runValidators: true
      }
    )
    if (!existShop) {
      res.status(400).json({ msg: "shop not found" })
    }
    res.json(existShop)
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
      res.json({ path: req.file.path })
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: "no found"
      })
    }
  }
}