import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";
import CreateGameEntry from "./components/CreateGameEntry";
import PlayGame from "./components/PlayGame";
import ListGames from "./components/ListGames";
import CreatePlayer from "./components/CreatePlayer";
import ListPlayers from "./components/ListPlayers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/game/:id" element={<PlayGame />} />
          <Route path="/game/new_entry" element={<CreateGameEntry />} />
          <Route path="/game/new" element={<CreateGame />} />
          <Route path="/games" element={<ListGames />} />
          <Route path="/players/new" element={<CreatePlayer />} />
          <Route path="/players" element={<ListPlayers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
