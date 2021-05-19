const router = require("express").Router();
const mongoose = require("mongoose");
let Category = require("../models/Category");
let SubCategory = require("../models/Subcategory");

//Get all category and subcat
router.route("/").get((req, res) => {
  Category.find()
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error: " + err));
});

//POST to create new Category
router.route("/add").post((req, res) => {
  const title = req.body.title;

  const newCategory = new Category({ title });

  newCategory
    .save()
    .then((category) => {
      //res.json("Category added!");
      res.json(category);
      //console.log(category);
    })
    .catch((err) => res.status(400).json("Error @category: " + err));
});

//POST to creat new Subcat using Cat ID
router.route("/add/:id").post((req, res) => {
  const title = req.body.title;
  //console.log(req.params.id);
  const categoryID = req.params.id;
  console.log(categoryID);

  const newSubCat = new SubCategory({ title });

  newSubCat
    .save()
    .then(async (docSubCat) => {
      await Category.findByIdAndUpdate(
        categoryID,
        {
          $push: {
            subcategory: {
              _id: docSubCat._id,
              title: docSubCat.title,
            },
          },
        },
        { new: true, useFindAndModify: false }
      )
        .then(() => {
          res.json(
            "SubCategory added: " + docSubCat + "in Category id: " + categoryID
          );
        })
        .catch((err) =>
          res.status(400).json("Error @SubCategory in Category: " + err)
        );
    })
    .catch((err) => res.status(400).json("Error @SubCategory: " + err));
  //console.log(newTrack);
});

//Delete Category by ID
router.route("/:id").delete((req, res) => {
  const categoryID = req.params.id;

  Category.findByIdAndRemove(categoryID)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Category with id=${categoryID}. Maybe Category was not found!`,
        });
      } else {
        res.send({ message: "Category was deleted successfully!" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Category with id=" + categoryID,
      });
    });
});

//Delete Subcat by SubcatID
router.route("/subcat/:id").delete((req, res) => {
  const subcategoryID = mongoose.mongo.ObjectID(req.params.id);
  const categoryID = req.body.categoryID;

  Category.findByIdAndUpdate(
    categoryID,
    {
      $pull: {
        subcategory: {
          _id: subcategoryID,
        },
      },
    },
    { new: true, multi: true }
  )
    .then(async (data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Subcat with id=${subcategoryID} in this Category=${categoryID}. Maybe Category was not found!`,
        });
      } else {
        console.log(data);
        // res.send({ message: "Track was deleted successfully!" });
        //Remove Subcat by id in Subcat db
        await SubCategory.findByIdAndRemove(subcategoryID)
          .then((data) => {
            if (!data) {
              res.status(404).send({
                message: `Cannot delete Subcat with id=${subcategoryID}}. Maybe Subcat was not found!`,
              });
            } else {
              //console.log(data);
              res.send({ message: "Subcat was deleted successfully!" });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Subcat with id=" + subcategoryID,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not find Subcatrack with id=" + subcategoryID,
      });
    });
});
module.exports = router;
