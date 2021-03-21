const mongoose = require("mongoose");
const { Schema } = mongoose;

const IndustrySchema = new Schema({
  name: { type: String, required: true },
  tracks: [Object],
});

const Industry = mongoose.model("Industry", IndustrySchema, "industry");

module.exports = Industry;
