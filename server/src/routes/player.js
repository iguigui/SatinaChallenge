const express = require("express");
const router = express.Router();
const {
  getAllPlayers,
  createPlayer,
} = require("../controllers/playerController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the player
 *         name:
 *           type: string
 *           description: The name of the player
 *         gamesPlayed:
 *           type: integer
 *           description: The number of games the player has played
 *         wins:
 *           type: integer
 *           description: The number of wins the player has
 *         losses:
 *           type: integer
 *           description: The number of losses the player has
 *         goalsFor:
 *           type: integer
 *           description: The number of goals the player has scored
 *         goalsAgainst:
 *           type: integer
 *           description: The number of goals scored against the player
 *         goalsDifference:
 *           type: integer
 *           description: The difference between goals scored and goals against
 *         winLossRatio:
 *           type: float
 *           description: The win/loss ratio of the player
 *       example:
 *         id: 1
 *         name: John Doe
 *         gamesPlayed: 10
 *         wins: 6
 *         losses: 4
 *         goalsFor: 30
 *         goalsAgainst: 20
 *         goalsDifference: 10
 *         winLossRatio: 1.5
 */

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Returns the list of all the players
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: The list of the players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 */
router.get("/", getAllPlayers);
/**
 * @swagger
 * /players/add:
 *   post:
 *     summary: Creates a new player
 *     tags: [Players]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: The player was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Player'
 *       400:
 *         description: Some error happened
 */
router.post("/add", createPlayer);

module.exports = router;
