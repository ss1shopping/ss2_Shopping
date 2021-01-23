const mongoose = require("mongoose");
const Schema = mongoose.Schema
const HistorySchema = new Schema({
    item: [],
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    totalCost: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "shipping", "finish"],
        default: "pending"
    }

},
    {
        collection: "orders"
    }, { timestamps: true },

)
const order = mongoose.model("orders", HistorySchema)
module.exports = order