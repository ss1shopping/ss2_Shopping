
const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ModelsSchema = new Schema({
  itemId: {
    type: Schema.Types.ObjectId,
    ref: "items"
  },
  name: {
    type: String
  },
  status: {
    type: Number,
    default: 0
  },
  normal_stock: {
    type: Number
  },
  promotion_id: {
    type: String
  },
  promotion_stock: {
    type: Number
  },
  price: {
    type: Number,
  },
  price_before_discount: {
    type: Number
  },
  sold: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
  },
  price_stocks: [{
    price: {
      type: Number
    },
    stockout_time: {
      type: Date
    },
    purchase_limit: {
      type: Number
    },
    shopId: {
      type: Number
    },
    promotion_id: {
      type: String,
    },
    promotion_type: {
      type: Number
    },
    start_time: {
      type: Date
    },
    end_time: {
      type: Date
    }
  }]



},
  { timestamps: true },

)


const Models = mongoose.model("models", ModelsSchema)
module.exports = Models;