import React from 'react';
import Router from 'react-router';
import TicTacToe from 'components/TicTacToe';
import FrontPage from 'components/FrontPage';
import Game from 'components/Game';

const { DefaultRoute, Route } = Router;

const routes = (
  <Route name="root" path="/" handler={ TicTacToe }>
    <DefaultRoute name="front-page" handler={ FrontPage }/>
    <Route name="game" handler={ Game }/>
  </Route>
);

export default routes;
