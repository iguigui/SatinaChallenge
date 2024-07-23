"use strict";

const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
require("dotenv").config({ path: __dirname + "/../.env" });

const playerRouter = require("./routes/player");

// Constants
const PORT = process.env.PORT || 3001;
const HOST = "0.0.0.0";

// App
const app = express();

app.use(cors());
app.use(express.json());

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
});

sequelize
  .authenticate()
  .then(() =>
    console.log("PostgreSQL database connection established successfully")
  )
  .catch((err) => console.error("Unable to connect to the database:", err));

// Sync models
require("./models").init(sequelize);

// Routes
app.use("/players", playerRouter);

// API
app.get("/api", (req, res) => {
  res.set("Content-Type", "application/json");
  let data = {
    message: "Hello world",
  };
  res.send(JSON.stringify(data, null, 2));
});

app.listen(PORT, HOST);
console.log(
  `Running on http://${HOST}:${PORT}  and using db ${process.env.DB_NAME}`
);
