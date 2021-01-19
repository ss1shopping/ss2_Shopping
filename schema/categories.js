const mongoose = require("mongoose");

const Schema = mongoose.Schema
// const uniqueValidator = require('mongoose-unique-validator')
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    //default icon
  },
  isRoot: {
    type: Boolean,
    default: false,
  },
  desc: {
    type: String,
  },
  path: {
    type: String
  },
  children: [{
    type: Schema.Types.ObjectId
  }]


}, { timestamps: true }

)
// AuthorSchema.plugin(uniqueValidator, { message: '{PATH} already exists.' })
const Categories = mongoose.model("Categories", CategorySchema)
module.exports = Categories
