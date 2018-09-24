const router = require("express").Router();
const categoryController = require("../../controllers/categoryController");

// Matches with "/api/books"
router.route("/category")
  .get(categoryController.findAll)
 // .post(categoryController.create);

 router.route("/insertcategory")
 	.post(categoryController.create);

// Matches with "/api/books/:id"
router
  .route("/category/:id")
  .get(categoryController.findById)
  .put(categoryController.update)
  .delete(categoryController.remove);

module.exports = router;
