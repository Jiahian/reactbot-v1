const router = require("express").Router();
const mongoose = require("mongoose");
let Track = require("../models/Track");

//GET all tracks info from track db
router.route("/").get((req, res) => {
  Track.find()
    .then((docTrack) => res.json(docTrack))
    .catch((err) => res.status(400).json("Error: " + err));
});

//POST to create new career pathways by Track ID
router.route("/:id").post((req, res) => {
  const trackID = req.params.id;
  const nodesData = req.body.nodes;
  const edgesData = req.body.edges;
  Track.findByIdAndUpdate(
    trackID,
    {
      $push: {
        nodes: nodesData,
        edges: edgesData,
      },
    },
    { new: true, useFindAndModify: false }
  )
    .then((docNodeEdge) => {
      res.json("Nodes added: " + docNodeEdge + "in track id: " + trackID);
    })
    .catch((err) => res.status(400).json("Error @career in Track: " + err));
});

//PUT to update career pathways in Track with TrackID
router.route("/:id").put((req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const trackID = req.params.id;
  Track.findByIdAndUpdate(trackID, req.body, { useFindAndModify: false })
    .then((docNodeEdge) => {
      if (!docNodeEdge) {
        res.status(404).send({
          message: `Cannot update Career Pathways in Track with id=${trackID}. Maybe Track was not found!`,
        });
      } else
        res.send({
          message: `Career pathway was updated successfully in Track with id=${trackID}.`,
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Career Pathway in Track with id=" + trackID,
      });
    });
});

module.exports = router;
