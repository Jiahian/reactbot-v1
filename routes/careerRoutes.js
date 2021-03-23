const router = require("express").Router();
const mongoose = require("mongoose");
let Track = require("../models/Track");
let Career = require("../models/Career");

//GET  career by careerID
router.route("/:id").get((req, res) => {
  const careerID = req.params.id;
  Career.findById(careerID)
    .then((docCareer) => {
      res.json(docCareer);
      //console.log(docTrack.career);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//GET all career by track ID
router.route("/all/:id").get((req, res) => {
  const trackID = req.params.id;
  Track.findById(trackID)
    .then(async (docTrack) => {
      //res.json(docTrack);
      //console.log(docTrack.career);
      const records = await Career.find({ _id: { $in: docTrack.career } });
      res.json(records);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//POST to create new Career
router.route("/").post((req, res) => {
  const label = req.body.label;
  const desc = req.body.desc;
  const cwf = req.body.cwf;
  const tSkill = req.body.tSkill;
  const gSkill = req.body.gSkill;
  const trackID = req.body.trackID;

  const newCareer = new Career({ label, desc, cwf, tSkill, gSkill });

  newCareer
    .save()
    .then(async (docCareer) => {
      //res.json("Career added!");
      //res.json(docCareer);
      //console.log(careerDoc);
      await Track.findByIdAndUpdate(
        trackID,
        {
          $push: {
            career: {
              _id: docCareer._id,
            },
          },
        },
        { new: true, useFindAndModify: false }
      )
        .then(() => {
          res.json("Career added: " + docCareer + "in track id: " + trackID);
        })
        .catch((err) => res.status(400).json("Error @career in Track: " + err));
    })
    .catch((err) => res.status(400).json("Error Career: " + err));
});

//Update career in Career db
router.route("/:id").put((req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const careerID = req.params.id;
  Career.findByIdAndUpdate(careerID, req.body, { useFindAndModify: false })
    .then((docCareer) => {
      if (!docCareer) {
        res.status(404).send({
          message: `Cannot update Career with id=${careerID}. Maybe Career was not found!`,
        });
      } else res.send({ message: "Career was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Career with id=" + careerID,
      });
    });
});

//Delete Career in Career and in Track
router.route("/:id").delete((req, res) => {
  const trackID = req.body.trackID;
  //need to convert _id from string to an ObjectID type
  const careerID = mongoose.mongo.ObjectID(req.body.careerID);

  console.log(trackID);
  console.log(careerID);

  //Remove career by id in Track
  Track.findByIdAndUpdate(
    trackID,
    {
      $pull: {
        career: {
          _id: careerID,
        },
      },
    },
    { new: true, multi: true }
  )
    .then(async (data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Career with id=${careerID} in this =${trackID}. Maybe Track was not found!`,
        });
      } else {
        console.log(data);
        // res.send({ message: "Track was deleted successfully!" });

        //Remove career by id in career db
        await Career.findByIdAndRemove(careerID)
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: `Cannot delete Career with id=${careerID}. Maybe Career was not found!`,
              });
            } else {
              //console.log(data);
              res.send({ message: "Career was deleted successfully!" });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Career with id=" + careerID,
            });
          });
        res.send({ message: "Career was deleted successfully from Track!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not find Track with id=" + trackID,
      });
    });
});

module.exports = router;
