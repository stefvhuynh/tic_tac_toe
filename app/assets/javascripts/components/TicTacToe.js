import React from 'react';
import Router from 'react-router';

const { RouteHandler } = Router;

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="TicTacToe">
        <h1>TicTacToe</h1>
        <RouteHandler/>
      </div>
    );
  }
}

export default TicTacToe;
