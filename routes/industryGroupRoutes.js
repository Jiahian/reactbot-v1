const router = require("express").Router();
const mongoose = require("mongoose");
let Industry = require("../models/Industry");
let Track = require("../models/Track");
//first endpoint that get incoming http get request.

//GET all industry and track
router.route("/").get((req, res) => {
  Industry.find()
    .then((industrygroup) => res.json(industrygroup))
    .catch((err) => res.status(400).json("Error: " + err));
});

//POST to create new Industry
router.route("/add").post((req, res) => {
  const name = req.body.name;
  
  const newIndustry = new Industry({ name });

  newIndustry
    .save()
    .then((industry) => {
      //res.json("Industry added!");
      res.json(industry);
      //console.log(industry);
    })
    .catch((err) => res.status(400).json("Error @industry: " + err));
});

//POST to create new Track using Industry ID
router.route("/add/:id").post((req, res) => {
  //const industryID = req.body.id;
  const name = req.body.name;
  //console.log(req.params.id);
  const industryID = req.params.id;
  console.log(industryID);
  const newTrack = new Track({ name });
  newTrack
    .save()
    .then(async (docTrack) => {
      //res.json("Track added: " + docTrack + "in industry id: " + industryID);
      //console.log(docTrack);
      await Industry.findByIdAndUpdate(
        industryID,
        {
          $push: {
            tracks: {
              _id: docTrack._id,
              name: docTrack.name,
            },
          },
        },
        { new: true, useFindAndModify: false }
      )
        .then(() => {
          res.json(
            "Track added: " + docTrack + "in industry id: " + industryID
          );
        })
        .catch((err) =>
          res.status(400).json("Error @track in Industry: " + err)
        );
    })
    .catch((err) => res.status(400).json("Error @track: " + err));
  //console.log(newTrack);
});
//Delete All [not part of report]. Career, Track, then Industry
// router.route("/").delete((req, res) => {
//   Industry.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: `${data.deletedCount} Items were deleted successfully!`,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while removing all items",
//       });
//     });
// });

//Delete Industry or Track
router.route("/").delete((req, res) => {
  const industryID = req.body.selectedIndustryID;
  //need to convert _id from string to an ObjectID type
  const trackID = req.body.selectedTrackID
    ? mongoose.mongo.ObjectID(req.body.selectedTrackID)
    : null;

  console.log(req.body);
  if (trackID && industryID) {
    //console.log(track._id);
    console.log(trackID);
    //Remove track by id in Industry
    Industry.findByIdAndUpdate(
      industryID,
      {
        $pull: {
          tracks: {
            _id: trackID,
          },
        },
      },
      { new: true, multi: true }
    )
      .then(async (data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Track with id=${trackID} in this Industry=${industryID}. Maybe Industry was not found!`,
          });
        } else {
          console.log(data);
          // res.send({ message: "Track was deleted successfully!" });
          //Remove track by id in Track db
          await Track.findByIdAndRemove(trackID)
            .then((data) => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot delete Track with id=${trackID}. Maybe Track was not found!`,
                });
              } else {
                //console.log(data);
                res.send({ message: "Track was deleted successfully!" });
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: "Could not delete Track with id=" + trackID,
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not find Track with id=" + trackID,
        });
      });
  } else if (!trackID && industryID) {
    Industry.findByIdAndRemove(industryID)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Industry with id=${industryID}. Maybe Industry was not found!`,
          });
        } else {
          res.send({ message: "Industry was deleted successfully!" });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Industry with id=" + industryID,
        });
      });
  }
});

//PUT to update new Industry --- not done yet
router.route("/").put((req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const industryID = req.body.selectedIndustryID;
  const trackID = req.body.selectedTrackID;
  const updatedIndustry = req.body.industry;
  const updatedTrack = req.body.track;

  if (trackID && industryID) {
    Track.findByIdAndUpdate(trackID, updatedTrack, {
      useFindAndModify: true,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${trackID}. Maybe Tutorial was not found!`,
          });
        } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + trackID,
        });
      });

    //now need to think how to update the tracks in Industry.
  } else if (!trackID && industryID) {
    Industry.findByIdAndUpdate(industryID, updatedIndustry, {
      useFindAndModify: true,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${industryID}. Maybe Tutorial was not found!`,
          });
        } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + industryID,
        });
      });
  }
});

module.exports = router; //need to write this
