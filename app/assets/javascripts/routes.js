import React from 'react';
import Router from 'react-router';
import TicTacToe from 'components/TicTacToe';
import FrontPage from 'components/FrontPage';
import GamePage from 'components/GamePage';

const { DefaultRoute, Route } = Router;

const routes = (
  <Route name="root" path="/" handler={ TicTacToe }>
    <DefaultRoute name="front-page" handler={ FrontPage }/>
    <Route name="game-page" path="/game" handler={ GamePage }/>
  </Route>
);

export default routes;
