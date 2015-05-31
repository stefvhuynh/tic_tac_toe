import React from 'react';
import Marty from 'marty';
import Router from 'react-router';
import GameStore from 'stores/GameStore';
import Board from 'components/Board';

const { Link } = Router;

class GamePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let winnerMessage;

    if (this.props.gameState.get('gameOver')) {
      const winner = this.props.gameState.get('winner');

      if (winner) {
        winnerMessage = <h1>{ `The winner is ${winner}!` }</h1>;
      } else {
        winnerMessage = <h1>'This is a draw!'</h1>;
      }
    }

    return(
      <div className="GamePage">
        <Link to="front-page">Back</Link>
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
