import React from 'react';
import Marty from 'marty';
import Router from 'react-router';
import MarkMapping from 'constants/MarkMapping';
import GameSummaryActions from 'actions/GameSummaryActions';
import GameStore from 'stores/GameStore';
import GameSummaryStore from 'stores/GameSummaryStore';
import Board from 'components/Board';

const { Link } = Router;

class GamePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    GameSummaryActions.updateGameSummary({
      activeGames: this.props.gameSummary.get('activeGames') + 1
    });
  }

  componentWillUnmount() {
    GameSummaryActions.updateGameSummary({
      activeGames: this.props.gameSummary.get('activeGames')
    });
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
        <Board/>
        { errorMessage }
        { winnerMessage }
      </div>
    );
  }
}

export default Marty.createContainer(GamePage, {
  listenTo: [GameSummaryStore, GameStore],
  fetch: {
    gameState() {
      return GameStore.getGameState();
    },

    gameSummary() {
      return GameSummaryStore.getGameSummary();
    }
  }
});
