const router = require("express").Router();
let IndustryGroup = require("../models/IndustryGroup");
let Career = require("../models/Career");

router.route("/").get((req, res) => {
  IndustryGroup.find()
    .then((industrygroup) => res.json(industrygroup))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Career.findById(req.params.id)
    .then((career) => res.json(career))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router; //need to write this
