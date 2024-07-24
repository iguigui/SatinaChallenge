import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import CreatePlayer from "./CreatePlayer";

function CreateGame() {
  const [players, setPlayers] = useState([]);
  const [player1Id, setPlayer1Id] = useState("");
  const [player2Id, setPlayer2Id] = useState("");
  const [newPlayerFetch, setNewPlayerFetch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

    try {
      const response = await axios.post("http://localhost:3001/games/add", {
        player1Id,
        player2Id,
      });
      console.log("Game created:", response.data);
      navigate(`/game/${response.data.id}`);
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  return (
    <div className="max-w-screen-xl m-auto mt-32 px-12">
      <h2 className="text-2xl font-bold mb-4">Create Game</h2>
      {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="max-w-xl mt-16">
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
        <button type="submit" className="secondary-button">
          Submit
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
