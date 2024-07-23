const router = require("express").Router();
const {
  getAllGames,
  getGame,
  createGame,
  addGoal,
} = require("../controllers/gameController");

router.route("/").get(getAllGames);
router.route("/:id").get(getGame);
router.route("/add").post(createGame);
router.route("/:id/add_goal").post(addGoal);

module.exports = router;
