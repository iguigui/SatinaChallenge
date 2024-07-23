const Sequelize = require("sequelize");

const Player = require("./player");
const Game = require("./game");

const init = (sequelize) => {
  Player.init(sequelize);
  Game.init(sequelize);

  Player.associate(sequelize.models);
  Game.associate(sequelize.models);

  sequelize.sync();
};

module.exports = { init };
