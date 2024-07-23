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
