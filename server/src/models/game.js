const { Model, DataTypes } = require("sequelize");

class Game extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        player1Id: { type: DataTypes.INTEGER, allowNull: false },
        player2Id: { type: DataTypes.INTEGER, allowNull: false },
        player1Score: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        player2Score: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      },
      { sequelize, modelName: "Game" }
    );
  }

  static associate(models) {
    // Define associations here if needed
  }
}

module.exports = Game;
