import React from "react";
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>
        <nav className="max-w-5xl m-auto">
          <ul className="flex flex-row space-x-12">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/game/new">New Game</Link>
            </li>
            <li>
              <Link to="/players/new">New Player</Link>
            </li>
            <li>
              <Link to="/players">Top Players</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="pt-16 max-w-5xl m-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
