const mongoose = require("mongoose")
const Schema = mongoose.Schema
const paymentSchema = new Schema({
    userid: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    shoppingid: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "shoppingItem"
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true
    },
}, {
    collection: "shoppingitem"
}, { timestamps: true },

)