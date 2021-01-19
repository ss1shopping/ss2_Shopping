const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ShopSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  official_shop: {
    type: Boolean,
    default: false,
  },
  totalInCome: {
    type: Number,
    default: 0
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
  },
  backroundImage: {
    type: String,
  },
  ratingGood: {
    type: Number,
    default: 0
  },
  ratingBad: {
    type: Number,
    default: 0,
  },
  ratingStar: {
    type: Number,
    default: 0
  },

},
  { timestamps: true },
)
// ShopSchema.set('versionKey', 'version');
// ShopSchema.plugin(updateIfCurrentPlugin);
const Shops = mongoose.model("shops", ShopSchema)
module.exports = Shops