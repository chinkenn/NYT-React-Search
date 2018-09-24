const router = require("express").Router();
const leaderboardController = require("../../controllers/leaderboardController");

// Matches with "/api/books"
router.route("/leaderboard")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/leaderboard/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;
