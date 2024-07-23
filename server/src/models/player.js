const { Model, DataTypes } = require("sequelize");

class Player extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        gamesPlayed: { type: DataTypes.INTEGER, defaultValue: 0 },
        wins: { type: DataTypes.INTEGER, defaultValue: 0 },
        losses: { type: DataTypes.INTEGER, defaultValue: 0 },
        goalsFor: { type: DataTypes.INTEGER, defaultValue: 0 },
        goalsAgainst: { type: DataTypes.INTEGER, defaultValue: 0 },
        goalsDifference: { type: DataTypes.INTEGER, defaultValue: 0 },
        winLossRatio: { type: DataTypes.FLOAT, defaultValue: 0 },
      },
      { sequelize, modelName: "Player" }
    );
  }

  static associate(models) {
    // Define associations here if needed
  }
}

module.exports = Player;
