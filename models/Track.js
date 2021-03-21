const mongoose = require("mongoose");
const { Schema } = mongoose;

const TrackSchema = new Schema({
  name: String,
  //industry: { type: mongoose.Schema.Types.ObjectId, ref: "Industry" },
  //career: [{ type: mongoose.Schema.Types.ObjectId, ref: "Career" }],
  career: [Object],
  nodes: [Object],
  edges: [Object],
});
const Track = mongoose.model("Track", TrackSchema, "track");

module.exports = Track;
