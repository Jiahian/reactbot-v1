const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
  label: { type: String, required: true },
  //img: Image,
  desc: String,
  objective: String,
  outline: String,
  duration: String,
  fee: String,
  trainer: String,
  date: String,
  time: String,
  venue: String,
  regBy: String,
  link: String,
  relatedList: [Object],
});

const Course = mongoose.model(
  "Course",
  CourseSchema,
  "course" //database name
);

module.exports = Course;
