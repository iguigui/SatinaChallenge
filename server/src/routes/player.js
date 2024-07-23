const router = require("express").Router();
const {
  getAllPlayers,
  createPlayer,
} = require("../controllers/playerController");

router.route("/").get(getAllPlayers);
router.route("/add").post(createPlayer);

module.exports = router;
