const { validationResult } = require("express-validator");
const Items = require("../schema/item.schema")
const Models = require("../schema/models.schema")



module.exports = {
  /**
   * @url /model/add
   * @param {} req 
   * @param {*} res 
   * @param {*} next 
   */
  add: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { itemId, price_stocks } = req.body

    const model = new Models({
      ...req.body
    })
    await model.save()

    const updateItem = await Items.findByIdAndUpdate(itemId, {
      $push: {
        models: model._id

      }
    }, {
      useFindAndModify: false,
      new: true,
      runValidators: true,
    })
    if (!updateItem) {
      return res.json({ msg: " item not found" })
    }

    res.json({ model: model, item: updateItem });
  },
  update: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, price_stocks } = req.body
    if (price_stocks) {
      delete req.body.price_stocks;
      const model = await Models.findByIdAndUpdate(id, {
        $set: req.body,
        $push: {
          price_stocks: price_stocks
        }
      },
        {
          useFindAndModify: false,
          new: true,
          runValidators: true,
        })
      if (!model) {
        return res.json({ msg: "Models not found" })
      }
      return res.json(model)
    } else {
      const model = await Models.findByIdAndUpdate(id, {
        $set: req.body
      },
        {
          useFindAndModify: false,
          new: true,
          runValidators: true,
        }
      )
      if (!model) {
        return res.status(400).json({ msg: "model not found" })
      }
      res.json(model)

    }
  },
  delete: async (req, res, next) => {

    try {
      const { id } = req.params
      const model = await Models.findById(id)
      if (!model) {
        return res.status(400).json({ msg: "not found" })
      }
      await model.remove()
      const item = await Items.findByIdAndUpdate(model.itemId, {
        $pull: {
          models: model._id
        }
      },
        {
          useFindAndModify: false,
          new: true,
          runValidators: true,
        })
      res.json({ msg: "successful", item })

    } catch (error) {
      res.status(400).json({ msg: "error" })
    }
  }
}