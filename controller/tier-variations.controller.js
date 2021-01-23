const Items = require("../schema/item.schema")
const TierVariation = require("../schema/tier_variations.schema")
module.exports = {
  /**
   * @url /tier-variation/add
   * @param {itemId,tier_variations{name,option,image}} req 
   * @param {*} res 
   * @param {*} next 
   */
  add: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, itemId, tier_variations } = req.body
    let tier_variation;
    let updateItem;
    if (!id) {
      tier_variation = new TierVariation({
        itemId: itemId,
        images: [tier_variations.image],
        option: [tier_variations.option],
        name: tier_variations.name
      })
      await tier_variation.save()

      updateItem = await Items.findByIdAndUpdate(itemId, {
        $push: {
          tier_variations: tier_variation._id

        }
      }, {
        useFindAndModify: false,
        new: true,
        runValidators: true,
      })
      if (!updateItem) {
        return res.json({ msg: " item not found" })
      }
    } else {
      tier_variation = await TierVariation.findByIdAndUpdate(id, {
        $push: {
          images: tier_variations.image,
          option: tier_variations.option
        }
      },
        {
          useFindAndModify: false,
          new: true,
          runValidators: true,
        })
    }
    res.json({ newTier: tier_variation, item: updateItem })
  },

  /**
   * @url /tier-variation/upload/image
   * @param {itemId,tier_variations{name,option,image}} req 
   * @param {*} res 
   * @param {*} next 
   */
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

  },
  update: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.body
    const updateTier = await TierVariation.findByIdAndUpdate(id, {
      set: req.body
    })
    if (!updateTier) {
      return res.status(400).json("Tier-variation not found")
    }
    res.json(updateTier)
  },
  delete: async (req, res, next) => {
    const { id } = req.params
    try {
      const exitTier = await TierVariation.findById(id)
      if (!exitTier) {
        return res.status(400).json({ msg: "tier variation not found" })
      }
      const item = await Items.findByIdAndUpdate(exitTier.itemId, {
        $pull: {
          tier_variations: exitTier._id
        }
      },
        {
          useFindAndModify: false,
          new: true,
          runValidators: true,
        })
      await exitTier.remove()
      res.json({ msg: "successful", item })

    } catch (error) {
      res.status(400).json({ msg: "error" })
    }
  }
}