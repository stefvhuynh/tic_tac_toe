import React from 'react';
import Marty from 'marty';
import Router from 'react-router';
import MarkMapping from 'constants/MarkMapping';
import GameStore from 'stores/GameStore';
import Board from 'components/Board';

const { Link } = Router;

class GamePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const errorMessage = <h2>{ this.props.gameState.get('error') }</h2>;
    let winnerMessage;

    if (this.props.gameState.get('gameOver')) {
      const winner = this.props.gameState.get('winner');

      if (winner === MarkMapping.get('user')) {
        winnerMessage = <h1>You are the winner!</h1>;
      } else if (winner === MarkMapping.get('computer')) {
        winnerMessage = <h1>You lost...</h1>
      } else {
        winnerMessage = <h1>Game is a draw.</h1>;
      }
    }

    return(
      <div className="GamePage">
        <Link to="front-page">Back</Link>
        { errorMessage }
        { winnerMessage }
        <Board/>
      </div>
    );
  }
}

export default Marty.createContainer(GamePage, {
  listenTo: GameStore,
  fetch: {
    gameState() {
      return GameStore.getGameState();
    }
  }
});
