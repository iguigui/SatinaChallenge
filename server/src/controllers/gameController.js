const Game = require("../models/game");
const Player = require("../models/player");

const { updatePlayerStats, findWinnerId } = require("../helpers/helpers");

const getAllGames = async (req, res) => {
  try {
    const games = await Game.findAll({
      order: [["id", "DESC"]],
    });
    const players = await Player.findAll();

    const playerMap = players.reduce((map, player) => {
      map[player.id] = player.name;
      return map;
    }, {});

    const gamesWithPlayerNames = games.map((game) => ({
      id: game.id,
      player1Id: game.player1Id,
      player2Id: game.player2Id,
      player1Score: game.player1Score,
      player2Score: game.player2Score,
      player1Name: playerMap[game.player1Id],
      player2Name: playerMap[game.player2Id],
      winnerId: game.winnerId,
      winnerName: game.winnerId ? playerMap[game.winnerId] : null,
      date: game.date,
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
    }));

    res.json(gamesWithPlayerNames);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

module.exports = { getAllGames };
const getGame = async (req, res) => {
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

    res.json({
      ...game.toJSON(),
      player1Name: player1.name,
      player2Name: player2.name,
    });
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

const createManualEntry = async (req, res) => {
  const { player1Id, player2Id, player1Score, player2Score } = req.body;

  try {
    const player1 = await Player.findByPk(player1Id);
    const player2 = await Player.findByPk(player2Id);

    if (!player1 || !player2) {
      return res.status(404).json("One or both players not found");
    }

    if (player1Score > 10 || player2Score > 10) {
      return res.status(400).json("Scores cannot be higher than 10");
    }

    if (player1Score === 10 && player2Score === 10) {
      return res.status(400).json("There can only be one winner");
    }

    let game = {
      player1Id,
      player2Id,
      player1Score,
      player2Score,
    };

    let winnerId = findWinnerId(game);

    // Add the winnerId to the game object
    game.winnerId = winnerId;

    const newGame = await Game.create(game);

    if (player1Score === 10 || player2Score === 10) {
      await savePlayerStats(newGame);
    }

    res.json({ id: newGame.id });
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
    if (game.winnerId) {
      return res.status(400).json("Game already ended");
    }

    let winnerId = findWinnerId(game);

    await savePlayerStats(game);

    game.winnerId = winnerId;
    await game.save();

    console.log("Game ended and players updated!");
    res.status(200).json({ message: "Game ended successfully" });
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
};

const savePlayerStats = async (game) => {
  const player1 = await Player.findByPk(game.player1Id);
  const player2 = await Player.findByPk(game.player2Id);

  if (!player1 || !player2) {
    throw new Error("One or both players not found");
  }

  if (game.player1Score === 10) {
    player1.wins += 1;
    player2.losses += 1;
  } else if (game.player2Score === 10) {
    player2.wins += 1;
    player1.losses += 1;
  } else {
    throw new Error("No player scored 10 goals");
  }

  updatePlayerStats(player1, game.player1Score, game.player2Score);
  updatePlayerStats(player2, game.player2Score, game.player1Score);

  await player1.save();
  await player2.save();
};

module.exports = {
  getAllGames,
  getGame,
  createGame,
  createManualEntry,
  addGoal,
  endGame,
};
