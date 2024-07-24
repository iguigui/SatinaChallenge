"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import foosball from "../images/foosball.png";

const links = [
  { href: "/players/new", label: "New Player" },
  { href: "/players", label: "Top Players" },
  { href: "/game/new_entry", label: "Manual Entry" },
];
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 h-20">
        <Link to="/" className="flex items-center">
          <img src={foosball} alt="Foosball Logo" style={{ width: "200px" }} />
        </Link>
        <div className="flex items-center">
          <button
            onClick={toggleMobileMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } fixed top-0 left-0 w-full h-full bg-white text-gray-600 transition-transform transform md:relative md:translate-x-0 md:flex md:items-center md:justify-between md:w-auto md:bg-transparent`}
          id="navbar-sticky"
        >
          <div className="flex flex-col items-center justify-between h-full p-4 md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="self-end text-gray-500 hover:text-gray-300"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="flex flex-col items-center space-y-4 mt-8 w-full">
              {links.map(({ href, label }) => (
                <li key={href} className="w-full">
                  <Link
                    to={href}
                    className="block py-2 px-3 text-gray-600 hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 w-full text-center"
                  >
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/game/new">
              <button type="button" className="primary-button">
                New Game
              </button>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4 md:ml-auto">
            <ul className="flex space-x-8">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="block py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                  >
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/game/new">
              <button type="button" className="primary-button">
                New Game
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
