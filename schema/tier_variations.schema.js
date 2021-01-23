const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ModelsSchema = new Schema({
  option: [{
    type: String
  }],
  images: [{ type: String }],
  name: {
    type: String
  },
  itemId: {
    type: Schema.Types.ObjectId,
    ref: "items"
  }
},
  { timestamps: true },

)


const tier_variations = mongoose.model("tier_variations", ModelsSchema)
module.exports = tier_variations