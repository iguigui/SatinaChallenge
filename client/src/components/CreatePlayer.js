import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePlayer() {
  const [name, setName] = useState("");
  const [addedPlayer, setAddedPlayer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/players/add", {
        name,
      });
      console.log("Player created:", response.data);
      setAddedPlayer(response.data.name);
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  return (
    <div className="max-w-screen-xl m-auto mt-32 px-12">
      <h2 className="text-2xl font-bold mb-4">New Player</h2>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2 mt-8">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="secondary-button">
          Submit
        </button>
      </form>
      {addedPlayer && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-teal-500">
            Player {addedPlayer} created!
          </p>
        </div>
      )}
    </div>
  );
}

export default CreatePlayer;
