import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PlayGame() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);
  const [endGameSuccess, setEndGameSuccess] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/games/${id}`);
        setGame(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };

    fetchGame();
  }, [id]);

  const addGoal = async (playerId) => {
    try {
      await axios.post(`http://localhost:3001/games/${id}/add_goal`, {
        playerId,
      });
      const response = await axios.get(`http://localhost:3001/games/${id}`);
      setGame(response.data);
      if (
        response.data.player1Score === 10 ||
        response.data.player2Score === 10
      ) {
        setGameEnded(true);
      }
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const endGame = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/games/${id}/end_game`
      );
      if (response.status === 200) {
        setEndGameSuccess(true);
      }
    } catch (error) {
      console.error("Error ending game:", error);
    }
  };

  if (loading || !game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Game Details</h2>
      <div className="mb-4">
        <h1 className="text-xl mb-2">Player 1: {game.player1Name}</h1>
        <h2 className="text-lg mb-2">Goals: {game.player1Score}</h2>
        <button
          onClick={() => addGoal(game.player1Id)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={gameEnded}
        >
          Add Goal
        </button>
      </div>
      <div className="mb-4">
        <h1 className="text-xl mb-2">Player 2: {game.player2Name}</h1>
        <h2 className="text-lg mb-2">Goals: {game.player2Score}</h2>
        <button
          onClick={() => addGoal(game.player2Id)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          disabled={gameEnded}
        >
          Add Goal
        </button>
      </div>
      {gameEnded && !endGameSuccess && (
        <button
          onClick={endGame}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          END GAME
        </button>
      )}
      {endGameSuccess && (
        <div>
          <h2 className="text-xl font-bold mt-4 mb-2">Final Scores</h2>
          <p>
            Player 1 ({game.player1Name}): {game.player1Score} goals
          </p>
          <p>
            Player 2 ({game.player2Name}): {game.player2Score} goals
          </p>
          <button
            className="text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled
          >
            SAVED
          </button>
        </div>
      )}
    </div>
  );
}

export default PlayGame;
