import React from 'react';
import Router from 'react-router';
import TicTacToe from 'components/TicTacToe';

const { DefaultRoute, Route } = Router;

const routes = (
  <Route name="root" path="/" handler={ TicTacToe }>
  </Route>
);

export default routes;
