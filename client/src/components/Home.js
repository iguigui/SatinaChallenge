import React from "react";
import foosball from "../images/bg-home.jpg";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="h-screen bg-cover bg-center flex justify-center items-center "
      style={{ backgroundImage: `url(${foosball})` }}
    >
      <div className="w-full sm:w-1/2 p-6 text-center text-white ">
        <h1 className="text-7xl font-bold mb-4">Foosball Score Board</h1>
        <h2 className="text-3xl mb-2">
          Track your foosball scores and become the best player
        </h2>
        <Link to="/game/new">
          <button className="mt-8 primary-button">New Game</button>
        </Link>
      </div>
      <div className="w-full sm:w-1/2 "></div>
    </div>
  );
}

export default Home;
