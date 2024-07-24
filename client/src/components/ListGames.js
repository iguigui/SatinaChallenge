import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:3001/games");
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="max-w-screen-xl m-auto my-32 px-12">
      <h2 className="text-2xl font-bold mb-4">All Games</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4 border-b">Player 1</th>
              <th className="py-2 px-4 border-b">Score</th>
              <th className="py-2 px-4 border-b">Player 2</th>
              <th className="py-2 px-4 border-b">Score</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Winner</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Details</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td className="py-2 px-4 border-b">{game.player1Name}</td>
                <td className="py-2 px-4 border-b">{game.player1Score}</td>
                <td className="py-2 px-4 border-b">{game.player2Name}</td>
                <td className="py-2 px-4 border-b">{game.player2Score}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(game.date).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {game.winnerName ? game.winnerName : "--"}
                </td>
                <td className="py-2 px-4 border-b">
                  {game.winnerId ? "GAME END" : "Playing..."}
                </td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/game/${game.id}`}>
                    <button className="secondary-button">Open</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListGames;
