const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubCategorySchema = new Schema({
  title: { type: String, required: true },
  course: [mongoose.mongo.ObjectID], //array of courseID
});

const SubCategory = mongoose.model(
  "SubCategory",
  SubCategorySchema,
  "subcategory"
);

module.exports = SubCategory;
