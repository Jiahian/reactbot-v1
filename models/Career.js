const mongoose = require("mongoose");
const { Schema } = mongoose;

const CareerSchema = new Schema({
  label: { type: String, required: true },
  desc: String,
  cwf: String,
  tSkill: String,
  gSkill: String,
});

const Career = mongoose.model(
  "Career",
  CareerSchema,
  "career" //database name
);

module.exports = Career;
