const mongoose = require("mongoose");
const Schema = mongoose.Schema
const CartSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "items"
    },
    number: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    modelId: {
        type: Schema.Types.ObjectId,
        required: false   //change required true later
    }
}, { timestamps: true })
const cart = mongoose.model("carts", CartSchema)
module.exports = cart