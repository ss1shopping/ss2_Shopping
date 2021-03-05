
const mongoose = require("mongoose");
const Schema = mongoose.Schema
const { updateIfCurrentPlugin } = require('mongoose-update-if-current');
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    priceMin: {
        type: Number,
        required: true
    },
    priceMax: {
        type: Number
    },
    discount: {
        type: Number
    },
    desc: {
        type: String,

    },
    attributes: [{
        name: {
            type: String
        },
        value: {
            type: String
        }
    }],
    category: [{
        type: Schema.Types.ObjectId,
        ref: "Categories"
    }],
    sold: {
        type: Number,
        required: false,
    },
    models: [{ type: Schema.Types.ObjectId, ref: "models" }],
    tier_variations: [{
        type: Schema.Types.ObjectId,
        ref: "tier_variations"
    }],
    shopId: {
        type: Schema.Types.ObjectId,
        ref: "shops"
    },
    numberRating: {
        type: Number,
        default: 0
    }


},
    { timestamps: true },

)
ItemSchema.index({ name: 'text', desc: 'text' })
ItemSchema.set('versionKey', 'version');
ItemSchema.plugin(updateIfCurrentPlugin);

const Items = mongoose.model("items", ItemSchema)
module.exports = Items