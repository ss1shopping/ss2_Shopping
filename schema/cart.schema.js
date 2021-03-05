const mongoose = require("mongoose");
const Schema = mongoose.Schema
const CartSchema = new Schema({
    itemId: {
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
        required: false,
        ref: "models"   //change required true later
    },
    shopId: {
        type: Schema.Types.ObjectId,
        ref: "shops"
    }
}, { timestamps: true })
const cart = mongoose.model("carts", CartSchema)
module.exports = cart