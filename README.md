# SatinaChallenge

To run the project create a .env in the server directory with the following values:

```
DB_HOST=db
DB_NAME=foosball
DB_USER=admin
DB_PASSWORD=admin
PORT=3001
```

Run the docker composer at the root of the project:

```
docker compose up -d
```

To access the client, open `http://localhost:3000` in your browser.

# API Documentation

## Game Routes

### Get All Games

- Description: Retrieves all games.
- Method: `GET`
- Endpoint: `/games`
- Body: None
- Response:

```
  [
    {
      "id": 1,
      "player1Id": 1,
      "player2Id": 2,
      "player1Score": 3,
      "player2Score": 5,
      "date": "Date"
    }
  ]
```

### Get Game by ID

- Description: Retrieves a single game by its ID.
- Method: `GET`
- Endpoint: `/games/:id`
- Body: None
- Response:
  ```
  {
  "id": 1,
  "player1Id": 1,
  "player2Id": 2,
  "player1Score": 3,
  "player2Score": 5,
  "player1Name": "John",
  "player2Name": "Jane"
  }
  ```

### Create Game

- Description: Creates a new game.
- Method: `POST`
- Endpoint: `/games/add`
- Body:

```

{
"player1Id": 1,
"player2Id": 2
}

```

- Response:

```
{
"id": 1
}
```

### Add Goal

- Description: Adds a goal to a player’s score in a game.
- Method: `POST`
- Endpoint: `/games/:id/add_goal`
- Body:

```
{
"playerId": 1
}
```

- Response:

```
{
"id": 1,
"player1Id": 1,
"player2Id": 2,
"player1Score": 4,
"player2Score": 5,
}
```

### End Game

- Description: Ends a game and updates player statistics.
- Method: `POST`
- Endpoint: `/games/:id/end_game`
- Body: None
- Response:

```
{
    "player1": {
    "id": 1,
    "name": "John",
    "gamesPlayed": 10,
    "wins": 5,
    "losses": 5,
    "goalsFor": 30,
    "goalsAgainst": 25,
    "goalsDifference": 5,
    "winLossRatio": 1.0
    },
    "player2": {
    "id": 2,
    "name": "Jane",
    "gamesPlayed": 10,
    "wins": 5,
    "losses": 5,
    "goalsFor": 25,
    "goalsAgainst": 30,
    "goalsDifference": -5,
    "winLossRatio": 1.0
    }
}
```

## Player Routes

### Get All Players

- Description: Retrieves all players.
- Method: `GET`
- Endpoint: `/players`
- Body: None
- Response:

```
[
  {
    "id": 1,
    "name": "John",
    "gamesPlayed": 10,
    "wins": 5,
    "losses": 5,
    "goalsFor": 30,
    "goalsAgainst": 25,
    "goalsDifference": 5,
    "winLossRatio": 1.0
  },
  {
    "id": 2,
    "name": "Jane",
    "gamesPlayed": 10,
    "wins": 5,
    "losses": 5,
    "goalsFor": 25,
    "goalsAgainst": 30,
    "goalsDifference": -5,
    "winLossRatio": 1.0
  }
]
```

### Create Player

- Description: Creates a new player.
- Method: `POST`
- Endpoint: `/players/add`
- Body:

```
{
  "name": "John"
}
```

- Response:

```
{
  "id": 1,
  "name": "John",
  "gamesPlayed": 0,
  "wins": 0,
  "losses": 0,
  "goalsFor": 0,
  "goalsAgainst": 0,
  "goalsDifference": 0,
  "winLossRatio": 0.0
}
```
