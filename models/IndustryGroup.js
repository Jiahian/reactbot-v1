const mongoose = require("mongoose");
const { Schema } = mongoose;

//industry group - initial

const IndustryGroupSchema = new Schema({
  name: { type: String, required: true },
  group: { type: [Object] },
});

const IndustryGroup = mongoose.model(
  "IndustryGroup",
  IndustryGroupSchema,
  "industrygroups" //database name
);

module.exports = IndustryGroup;
