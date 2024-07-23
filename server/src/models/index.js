const Sequelize = require("sequelize");

const Player = require("./player");

const init = (sequelize) => {
  Player.init(sequelize);

  Player.associate(sequelize.models);

  sequelize.sync();
};

module.exports = { init };
