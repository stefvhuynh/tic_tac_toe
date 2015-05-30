import React from 'react';
import Marty from 'marty';
import Router from 'react-router';
import Board from 'components/Board';

const { Link } = Router;

class GamePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="GamePage">
        <Link to="front-page">Back</Link>
        <Board/>
      </div>
    );
  }
}

export default GamePage;
