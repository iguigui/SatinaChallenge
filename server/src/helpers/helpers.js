const updatePlayerStats = (player, goalsFor, goalsAgainst) => {
  player.gamesPlayed += 1;
  player.goalsFor += goalsFor;
  player.goalsAgainst += goalsAgainst;
  player.goalsDifference += goalsFor - goalsAgainst;

  // Calculate win/loss ratio
  if (player.losses === 0) {
    player.winLossRatio = player.wins;
  } else {
    player.winLossRatio = player.wins / player.losses;
  }
};

const findWinnerId = (game) => {
  let winnerId = null;

  if (game.player1Score === 10) {
    winnerId = game.player1Id;
  } else if (game.player2Score === 10) {
    winnerId = game.player2Id;
  }

  return winnerId;
};

module.exports = {
  updatePlayerStats,
  findWinnerId,
};
