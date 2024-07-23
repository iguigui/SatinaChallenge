import React, { useEffect, useState } from "react";

function TopPlayers() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:3001/players");
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="max-w-screen-xl m-auto my-32 px-12">
      <h2 className="text-2xl font-bold mb-4">Top Players</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Games Played</th>
              <th className="py-2 px-4 border-b">Wins</th>
              <th className="py-2 px-4 border-b">Losses</th>
              <th className="py-2 px-4 border-b">Goals For</th>
              <th className="py-2 px-4 border-b">Goals Against</th>
              <th className="py-2 px-4 border-b">Goals Difference</th>
              <th className="py-2 px-4 border-b">Win/Loss Ratio</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td className="py-2 px-4 border-b">{player.name}</td>
                <td className="py-2 px-4 border-b">{player.gamesPlayed}</td>
                <td className="py-2 px-4 border-b">{player.wins}</td>
                <td className="py-2 px-4 border-b">{player.losses}</td>
                <td className="py-2 px-4 border-b">{player.goalsFor}</td>
                <td className="py-2 px-4 border-b">{player.goalsAgainst}</td>
                <td className="py-2 px-4 border-b">{player.goalsDifference}</td>
                <td className="py-2 px-4 border-b">
                  {player.winLossRatio.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopPlayers;
