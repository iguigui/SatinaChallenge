const Game = require("../models/game");
const Player = require("../models/player");

const getAllGames = async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

const getGame = async (req, res) => {
  const { id } = req.params;

  try {
    const game = await Game.findByPk(id);
    if (!game) {
      return res.status(404).json("Game not found");
    }
    res.json(game);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

const createGame = async (req, res) => {
  const { player1Id, player2Id } = req.body;

  try {
    const player1 = await Player.findByPk(player1Id);
    const player2 = await Player.findByPk(player2Id);

    if (!player1 || !player2) {
      return res.status(404).json("One or both players not found");
    }

    const newGame = await Game.create({
      player1Id,
      player2Id,
      player1Score: 0,
      player2Score: 0,
    });

    res.json({ id: newGame.id });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

const addGoal = async (req, res) => {
  const { id } = req.params;
  const { playerId } = req.body;

  try {
    const game = await Game.findByPk(id);
    if (!game) {
      return res.status(404).json("Game not found");
    }

    if (game.player1Id === playerId) {
      game.player1Score += 1;
    } else if (game.player2Id === playerId) {
      game.player2Score += 1;
    } else {
      return res.status(400).json("Player not found in this game");
    }

    await game.save();
    console.log("Game updated:", game);
    res.json(game);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

//TODO endGame
// calculate winner and update player stats

module.exports = { getAllGames, getGame, createGame, addGoal };
