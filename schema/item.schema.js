
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
        required: true
    },
    category: [{
        type: Object,
        //required:true
    }],
    sold: {
        type: Number,
        required: false,
    },
    models: [{ type: Schema.Types.ObjectId, ref: "models" }],
    tier_variations: [{
        option: [{
            type: String
        }],
        images: [{ type: String }],
        name: {
            type: String
        }
    }]


},
    { timestamps: true },

)

ItemSchema.set('versionKey', 'version');
ItemSchema.plugin(updateIfCurrentPlugin);

const Items = mongoose.model("items", ItemSchema)
module.exports = Items