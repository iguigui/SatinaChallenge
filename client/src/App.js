import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Home from "./components/Home";
import CreateGame from "./components/CreateGame";
import PlayGame from "./components/PlayGame";
import CreatePlayer from "./components/CreatePlayer";
import TopPlayers from "./components/TopPlayers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/game/:id" element={<PlayGame />} />
          <Route path="/game/new" element={<CreateGame />} />
          <Route path="/players/new" element={<CreatePlayer />} />
          <Route path="/players" element={<TopPlayers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
