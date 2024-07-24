const express = require("express");
const router = express.Router();
const {
  getAllGames,
  getGame,
  createGame,
  createManualEntry,
  addGoal,
  endGame,
} = require("../controllers/gameController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - player1Id
 *         - player2Id
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the game
 *         player1Id:
 *           type: integer
 *           description: The id of the first player
 *         player2Id:
 *           type: integer
 *           description: The id of the second player
 *         player1Score:
 *           type: integer
 *           description: The score of the first player
 *         player2Score:
 *           type: integer
 *           description: The score of the second player
 *         winnerId:
 *           type: integer
 *           description: The id of the winning player
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the game was created
 *       example:
 *         id: 1
 *         player1Id: 1
 *         player2Id: 2
 *         player1Score: 10
 *         player2Score: 8
 *         winnerId: 1
 *         date: 2023-07-24T13:32:32.850Z
 */

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Returns the list of all the games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: The list of the games
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */
router.get("/", getAllGames);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get the game by id
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The game id
 *     responses:
 *       200:
 *         description: The game description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       404:
 *         description: The game was not found
 */
router.get("/:id", getGame);

/**
 * @swagger
 * /games/add:
 *   post:
 *     summary: Creates a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       200:
 *         description: The game was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Some error happened
 */
router.post("/add", createGame);

/**
 * @swagger
 * /games/add_entry:
 *   post:
 *     summary: Creates a new game with manual score entry
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       200:
 *         description: The game was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Some error happened
 */
router.post("/add_entry", createManualEntry);

/**
 * @swagger
 * /games/{id}/add_goal:
 *   patch:
 *     summary: Adds a goal to a game
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The game id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playerId:
 *                 type: integer
 *                 description: The id of the player scoring the goal
 *     responses:
 *       200:
 *         description: The goal was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Some error happened
 *       404:
 *         description: The game was not found
 */
router.patch("/:id/add_goal", addGoal);

/**
 * @swagger
 * /games/{id}/end_game:
 *   patch:
 *     summary: Ends a game
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The game id
 *     responses:
 *       200:
 *         description: The game was successfully ended
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Game'
 *       400:
 *         description: Some error happened
 *       404:
 *         description: The game was not found
 */
router.patch("/:id/end_game", endGame);

module.exports = router;
