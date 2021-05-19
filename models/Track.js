const mongoose = require("mongoose");
const { Schema } = mongoose;

const TrackSchema = new Schema({
  name: String,
  career: [Object],
  nodes: [Object],
  edges: [Object],
});
const Track = mongoose.model("Track", TrackSchema, "track");

module.exports = Track;
