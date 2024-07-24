import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import CreatePlayer from "./CreatePlayer";

function CreateGame() {
  const [players, setPlayers] = useState([]);
  const [player1Id, setPlayer1Id] = useState("");
  const [player2Id, setPlayer2Id] = useState("");
  const [player1Score, setPlayer1Score] = useState("");
  const [player2Score, setPlayer2Score] = useState("");
  const [newPlayerFetch, setNewPlayerFetch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("Submit");

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/players");
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, [newPlayerFetch]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (player1Id === player2Id) {
      setErrorMessage("Player 1 and Player 2 cannot be the same.");
      setPlayer1Id("");
      setPlayer2Id("");
      return;
    }

    const score1 = player1Score !== "" ? parseInt(player1Score, 10) : null;
    const score2 = player2Score !== "" ? parseInt(player2Score, 10) : null;

    if (score1 > 10 || score2 > 10) {
      setErrorMessage("Scores cannot be higher than 10.");
      return;
    }
    if (score1 === 10 && score2 === 10) {
      setErrorMessage("There can only be one winner");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/games/add_entry",
        {
          player1Id,
          player2Id,
          player1Score: score1,
          player2Score: score2,
        }
      );
      console.log("Game entry created:", response.data);
      setSubmitStatus("Saved");
      setPlayer1Id("");
      setPlayer2Id("");
      setPlayer1Score("");
      setPlayer2Score("");
    } catch (error) {
      console.error("Error creating game entry:", error);
    }
  };

  const handleInputChange = () => {
    setSubmitStatus("Submit");
    setErrorMessage("");
  };

  return (
    <div className="max-w-screen-xl m-auto mt-32 px-12">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold mb-4">New Game Entry</h2>
        <Link to="/games" className="secondary-button">
          All Games
        </Link>
      </div>
      {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mt-16"
        onChange={handleInputChange}
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <div className="mb-4">
              <label
                htmlFor="player1"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Player 1
              </label>
              <select
                id="player1"
                value={player1Id}
                onChange={(e) => setPlayer1Id(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="" disabled>
                  Select Player 1
                </option>
                {players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="player1Score"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Score
              </label>
              <input
                id="player1Score"
                type="number"
                value={player1Score}
                onChange={(e) => setPlayer1Score(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                max="10"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <div className="mb-4">
              <label
                htmlFor="player2"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Player 2
              </label>
              <select
                id="player2"
                value={player2Id}
                onChange={(e) => setPlayer2Id(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option value="" disabled>
                  Select Player 2
                </option>
                {players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="player2Score"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
              >
                Score
              </label>
              <input
                id="player2Score"
                type="number"
                value={player2Score}
                onChange={(e) => setPlayer2Score(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                max="10"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={submitStatus === "Saved" ? true : false}
          className={`${
            submitStatus === "Saved" ? "success-button" : "secondary-button"
          }`}
        >
          {submitStatus}
        </button>
      </form>
      <div className="mt-16">
        <CreatePlayer
          setNewPlayerFetch={setNewPlayerFetch}
          removePadding={true}
        />
      </div>
    </div>
  );
}

export default CreateGame;
