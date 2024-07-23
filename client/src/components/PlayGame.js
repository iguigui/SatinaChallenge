import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function PlayGame() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);
  const [endGameSuccess, setEndGameSuccess] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/games/${id}`);
        setGame(response.data);
        if (
          response &&
          response.data &&
          (response.data.player1Score === 10 ||
            response.data.player2Score === 10)
        ) {
          setGameEnded(true);
        }
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
        setModalShow(true);
      }
    } catch (error) {
      console.error("Error ending game:", error);
    }
  };

  if (loading || !game) {
    return <div>Loading...</div>;
  }

  const PlayerSection = ({ playerName, playerScore, playerId, disabled }) => (
    <div className="w-full md:w-1/2 mb-4">
      <h1 className="text-lg text-semibold mb-2">{playerName}</h1>
      <h2 className="text-3xl mb-2">Goals: {playerScore}</h2>
      <button
        onClick={() => addGoal(playerId)}
        className="secondary-button"
        disabled={disabled}
      >
        Score a Goal
      </button>
    </div>
  );

  return (
    <div className="max-w-3xl px-4 py-6 mt-32 m-auto px-12">
      <h2 className="text-2xl font-bold mb-4">
        {game.player1Name} vs {game.player2Name}
      </h2>
      <div className="flex flex-row">
        <PlayerSection
          playerName={game.player1Name}
          playerScore={game.player1Score}
          playerId={game.player1Id}
          disabled={game.player1Score >= 10 || game.player2Score >= 10}
        />
        <PlayerSection
          playerName={game.player2Name}
          playerScore={game.player2Score}
          playerId={game.player2Id}
          disabled={game.player1Score >= 10 || game.player2Score >= 10}
        />
      </div>
      {gameEnded && !endGameSuccess && (
        <div className="m-auto justify-center">
          <button onClick={endGame} className="primary-button ">
            END GAME
          </button>
        </div>
      )}
      {endGameSuccess && modalShow && (
        <div>
          <div
            id="popup-modal"
            className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          >
            <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={() => setModalShow(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <h2 className="text-3xl font-bold mt-4 mb-2">Final Scores</h2>
                <div className="flex flex-row justify-center items-center my-12">
                  <div className="w-1/2">
                    <h3 className="text-xl">{game.player1Name}</h3>
                    <h1 className="text-5xl">{game.player1Score}</h1>
                  </div>
                  <div className="w-1/2">
                    <h3 className="text-xl">{game.player2Name}</h3>
                    <h1 className="text-5xl">{game.player2Score}</h1>
                  </div>
                </div>

                <div className="mt-4">
                  <Link to="/players">
                    <button className="secondary-button">Players Stats</button>
                  </Link>
                  <Link to="/game/new">
                    <button className="primary-button ml-12">New Game</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayGame;
