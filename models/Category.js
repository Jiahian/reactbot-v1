const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema({
  title: { type: String, required: true },
  subcategory: [Object],
});

const Category = mongoose.model("Category", CategorySchema, "category");

module.exports = Category;
