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

const endGame = async (req, res) => {
  const { id } = req.params;

  try {
    const game = await Game.findByPk(id);
    if (!game) {
      return res.status(404).json("Game not found");
    }

    const player1 = await Player.findByPk(game.player1Id);
    const player2 = await Player.findByPk(game.player2Id);

    if (!player1 || !player2) {
      return res.status(404).json("One or both players not found");
    }

    let player1Won = false;
    let player2Won = false;

    if (game.player1Score === 10) {
      player1.wins += 1;
      player2.losses += 1;
      player1Won = true;
    } else if (game.player2Score === 10) {
      player2.wins += 1;
      player1.losses += 1;
      player2Won = true;
    } else {
      return res.status(400).json("No player scored 10 goals");
    }

    updatePlayerStats(
      player1,
      game.player1Score,
      game.player2Score,
      player1Won
    );
    updatePlayerStats(
      player2,
      game.player2Score,
      game.player1Score,
      player2Won
    );

    await player1.save();
    await player2.save();
    console.log("Game ended and players updated!");
    res.status(200).json({ player1, player2 });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

const updatePlayerStats = (player, goalsFor, goalsAgainst, won) => {
  player.gamesPlayed += 1;
  player.goalsFor += goalsFor;
  player.goalsAgainst += goalsAgainst;
  player.goalsDifference += goalsFor - goalsAgainst;

  // Calculate win/loss ratio
  if (player.losses === 0) {
    player.winLossRatio = player.wins;
  } else {
    player.winLossRatio = player.wins / player.losses;
  }
};

module.exports = { getAllGames, getGame, createGame, addGoal, endGame };
