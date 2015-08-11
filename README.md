Tic Tac Toe
===========

This was a coding challenge I did for a job interview. It is a tic tac toe game
where users play against the computer. Users can log in to keep track of their
record. The computer's overall wins and losses are also recorded.

Please note that I normally try to TDD my applications. For the interest of
time, I did not do that here. For an example, check out my recent project,
[RtTrainer](http://github.com/stefvhuynh/rt_trainer) and go to the spec folder
(note, that this project is still in progress).

Installation
------------

Dependencies:
- Rails
- Node and NPM
- Postgresql
- Redis

Steps:
1. Make sure postgresql is running
2. Start your redis server with `redis-server`
3. Run `bundle install` to install the gems
4. Run `rake db:create` and `rake db:migrate`
5. Run `npm install` to install npm packages
6. Run `npm run build` to build the frontend
7. Run `rails server` and navigate to `localhost:3000`

Backend Architecture
--------------------

The technologies on the backend include postgresql, redis, and rails. There is a
single table in the postgresql database.

```
User
---------------
username
password_digest
wins
losses
draws
created_at
updated_at
```

There are two other models: `session` and `game_summary`. These two model data
that will be stored in redis. `session` houses the `session_token`s used for
authentication and `game_summary` stores data for the game at large (how many
times the computer has won, lost, etc.).

### Endpoints

`user` is a singular resource here. Thus, we don't need an `id` to update the
user in the database. We use the `session_token` to identify the user. All
endpoints that require authentication need an `X-Session-Token` header.

#### `POST /api/user`

```
Parameters:
{
  user: {
    username: ... ,
    password: ...
  }
}

Response:
{
  id: ... ,
  username: ... ,
  wins: ... ,
  losses: ... ,
  draws: ... ,
  session_token: ...
}
```

#### `PUT /api/user`

```
Parameters:
{
  user: {
    username: ... ,
    password: ... ,
    wins: ... ,
    losses: ... ,
    draws: ...
  }
}

Headers:
{ X-Session-Token: ... }

Response:
{
  id: ... ,
  username: ... ,
  wins: ... ,
  losses: ... ,
  draws: ... ,
  session_token: ...
}
```

`session` is also a singular resource. It is stored in redis.

#### `POST /api/session`

```
Parameters:
{
  credentials: {
    username: ... ,
    password: ...
  }
}

Response:
{
  id: ... ,
  username: ... ,
  wins: ... ,
  losses: ... ,
  draws: ... ,
  session_token: ...
}
```

#### `GET /api/session`

```
Headers:
{ X-Session-Token: ... }

Response:
{
  id: ... ,
  username: ... ,
  wins: ... ,
  losses: ... ,
  draws: ... ,
  session_token: ...
}
```

`game_summary` is a singular resource represented by a singleton. The data for
`game_summary` are stored in redis. Authentication is not required because users
can play without signing in.

#### `GET /api/game_summary`

```
Response:
{
  wins: ... ,
  losses: ... ,
  draws: ... ,
  games_played: ... ,
  active_games: ...
}
```

#### `PUT /api/game_summary`

```
Parameters:
{
  game_summary: {
    wins: 'increment' || 'decrement',
    losses: 'increment' || 'decrement',
    draws: 'increment' || 'decrement',
    games_played: 'increment' || 'decrement',
    active_games: 'increment' || 'decrement'
  }
}

Response:
{
  wins: ... ,
  losses: ... ,
  draws: ... ,
  games_played: ... ,
  active_games: ...
}
```

Frontend Architecture
---------------------

The frontend uses react, react-router, and marty. When a user navigates to the
root of the application (`localhost:3000` on local), an empty div and javascript
is delivered to the browser. From there, it is an entirely single-page app that
follows the flux architecture.

Users can log in or sign up for an account. Users can also play the game without
signing up. By logging in or signing up, their progress will be tracked.

### Authentication

When a user logs in, a request is sent for a `session_token`. This token is then
stored in the browser's cookies. Subsequent page refreshes use this token to
retrieve the data necessary to view the pages. This token is also used to update
the database by putting the token into the `X-Session-Token` header.

### Stores

The `UserStore` holds all the pertinent information for the user that is logged
in. The `GameSummaryStore` holds the information needed to display the
computer's stats (e.g. wins, losses, etc.). The `GameStore` holds the state of
the game in progress. Additionally, there exist abstract `Game` and `ComputerAi`
models. These models hold the logic necessary for playing the game. For now,
the `ComputerAi` model only has an easy setting wherein the computer makes
random moves. Given more time, I would have written more advanced algorithms.

### Components

Various components listen to the stores. The gameplay occurs in the `Board`
component. The `Board` component creates an instance of the `Game` model. All
user interaction with the board is filtered through the `Game` model first.
Actions are then fired off based on the state of the model.

### Actions
Various actions are used to send messages from components to stores. These
actions include updating the board, updating user data, etc. Additionally,
actions are where communication with the server and with the browser's cookies
occur.
