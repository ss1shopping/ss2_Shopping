"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ShoppingSchema = new Schema({
  description: {
    type: String
  },
  price: {
    type: String
  },
  quantity: {
    type: Number
  },
  city: {
    type: String
  },
  userid: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true
  },
  image: []
}, {
  collection: "shoppingitem"
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
ShoppingSchema.virtual('itemImage', {
  ref: 'itemImage',
  localField: '_id',
  foreignField: 'shoppingid',
  justOne: false,
  count: true
});
var Shopping = mongoose.model("shoppingitem", ShoppingSchema);
module.exports = Shopping;