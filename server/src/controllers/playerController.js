const Player = require("../models/player");

const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.findAll({
      order: [
        ["winLossRatio", "DESC"],
        ["goalsDifference", "DESC"],
      ],
    });
    res.json(players);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

const createPlayer = async (req, res) => {
  const { name } = req.body;

  try {
    const newPlayer = await Player.create({ name });
    res.json(newPlayer);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

module.exports = { getAllPlayers, createPlayer };
