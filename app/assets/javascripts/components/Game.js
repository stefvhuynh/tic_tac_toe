import React from 'react';
import Marty from 'marty';
import Router from 'react-router';

const { Link } = Router;

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="Game">
        <Link to="front-page">Back</Link>
        Game
      </div>
    );
  }
}

export default Game;
