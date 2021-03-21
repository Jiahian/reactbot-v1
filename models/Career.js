const mongoose = require("mongoose");
const { Schema } = mongoose;

const CareerSchema = new Schema({
  label: { type: String, required: true },
  desc: String,
  cwf: String,
  tSkill: String,
  gSkill: String,
  relatedCourse: { type: mongoose.Schema.Types.ObjectId, ref: "Related" },
  //track: { type: mongoose.Schema.Types.ObjectId, ref: "Track" },
});

const Career = mongoose.model(
  "Career",
  CareerSchema,
  "career" //database name
);

module.exports = Career;
