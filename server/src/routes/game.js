const router = require("express").Router();
const {
  getAllGames,
  getGame,
  createGame,
  addGoal,
  endGame,
} = require("../controllers/gameController");

router.route("/").get(getAllGames);
router.route("/:id").get(getGame);
router.route("/add").post(createGame);
router.route("/:id/add_goal").post(addGoal);
router.route("/:id/end_game").post(endGame);

module.exports = router;
