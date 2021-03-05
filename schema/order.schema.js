const mongoose = require("mongoose");
const Schema = mongoose.Schema
const HistorySchema = new Schema({
    detail: [{
        itemId: {
            type: Schema.Types.ObjectId,
            ref: "items",
        },
        modelId: {
            type: Schema.Types.ObjectId,
            ref: "models"
        }
    }],
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
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
    shopId: {
        type: Schema.Types.ObjectId,
        ref: "shops"
    }

},
    {
        collection: "orders"
    }, { timestamps: true },

)
HistorySchema.index({ detail: 'text', totalCost: 'text', phone: 'text', address: "text" })
const order = mongoose.model("orders", HistorySchema)
module.exports = order