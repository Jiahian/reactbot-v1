const router = require("express").Router();
const mongoose = require("mongoose");
let Course = require("../models/Course");
let SubCategory = require("../models/Subcategory");

//GET all course
router.route("/").get((req, res) => {
  Course.find()
    .then((docCourse) => {
      res.json(docCourse);
      //console.log(docTrack.career);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//GET course by courseID
router.route("/:id").get((req, res) => {
  const courseID = req.params.id;
  Course.findById(courseID)
    .then((docCourse) => {
      res.json(docCourse);
      //console.log(docTrack.career);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//GET all career by subcatID
router.route("/all/:id").get((req, res) => {
  const subCatID = req.params.id;
  SubCategory.findById(subCatID)
    .then(async (docSubCat) => {
      //res.json(docTrack);
      //console.log(docTrack.career);
      const records = await Course.find({ _id: { $in: docSubCat.course } });
      res.json(records);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//POST to create new course
router.route("/").post((req, res) => {
  const subCatID = req.body.subCatID;
  const label = req.body.label;
  const img = req.body.img;
  const desc = req.body.desc;
  const objective = req.body.objective;
  const outline = req.body.outline;
  const duration = req.body.duration;
  const fee = req.body.fee;
  const trainer = req.body.trainer;

  const date = req.body.date;
  const time = req.body.time;
  const venue = req.body.venue;
  const regBy = req.body.regBy;
  const link = req.body.link;
  const relatedList = req.body.relatedList;

  const newCourse = new Course({
    label,
    //img,
    desc,
    objective,
    outline,
    duration,
    fee,
    trainer,
    date,
    time,
    venue,
    regBy,
    link,
    relatedList,
  });

  newCourse
    .save()
    .then(async (docCourse) => {
      //res.json("Career added!");
      //res.json(docCareer);
      //console.log(careerDoc);
      await SubCategory.findByIdAndUpdate(
        subCatID,
        {
          $push: {
            course: {
              _id: docCourse._id,
            },
          },
        },
        { new: true, useFindAndModify: false }
      )
        .then(() => {
          res.json("Course added: " + docCourse + "in subcat id: " + subCatID);
        })
        .catch((err) =>
          res.status(400).json("Error @Course in subcat: " + err)
        );
    })
    .catch((err) => res.status(400).json("Error Course: " + err));
});

//Update course in course db
router.route("/:id").put((req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  console.log(req.body);
  const courseID = req.params.id;
  Course.findByIdAndUpdate(courseID, req.body, { useFindAndModify: false })
    .then((docCourse) => {
      if (!docCourse) {
        res.status(404).send({
          message: `Cannot update Course with id=${courseID}. Maybe Course was not found!`,
        });
      } else res.send({ message: "Course was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Course with id=" + courseID,
      });
    });
});

//Delete Course in Course and in SubCategory
router.route("/:id").delete((req, res) => {
  const subCatID = req.body.subCatID;
  //need to convert _id from string to an ObjectID type
  const courseID = mongoose.mongo.ObjectID(req.body.courseID);

  console.log(subCatID);
  console.log(courseID);

  //Remove course by id in SubCategory
  SubCategory.findByIdAndUpdate(
    subCatID,
    {
      $pull: {
        course: {
          _id: courseID,
        },
      },
    },
    { new: true, multi: true }
  )
    .then(async (data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Course with id=${courseID} in this =${subCatID}. Maybe SubCategory was not found!`,
        });
      } else {
        console.log(data);
        //Remove course by id in course db
        await Course.findByIdAndRemove(courseID)
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: `Cannot delete Course with id=${courseID}. Maybe Course was not found!`,
              });
            } else {
              //console.log(data);
              res.send({ message: "Course was deleted successfully!" });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Course with id=" + courseID,
            });
          });
        res.send({
          message: "Course was deleted successfully from SubCategory!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not find SubCategory with id=" + subCatID,
      });
    });
});

module.exports = router;
