import React from 'react';
import Marty from 'marty';
import MarkMapping from 'constants/MarkMapping';
import GameConstants from 'constants/GameConstants';
import GameActions from 'actions/GameActions';
import GameSummaryActions from 'actions/GameSummaryActions';
import GameStore from 'stores/GameStore';
import GameSummaryStore from 'stores/GameSummaryStore';
import UserStore from 'stores/UserStore';
import Game from 'models/Game';

class Board extends React.Component {
  constructor(props) {
    super(props);
    const board = this.props.gameState.get('board');
    this.game = new Game(board, GameConstants.EASY);
  }

  render() {
    const grid = this._generateGrid();

    return(
      <div className="Board">
        { grid }
      </div>
    );
  }

  _generateGrid() {
    const board = this.props.gameState.get('board');

    const rows = board.map((row, rowIndex) => {
      const cells = row.map((cell, cellIndex) => {
        const clickHandler =
          this.game.gameOver ? null : this._onCellClick(rowIndex, cellIndex);

        return <td key={ cellIndex } onClick={ clickHandler }>{ cell }</td>;
      });

      return <tr key={ rowIndex }>{ cells }</tr>;
    });

    return <table className="grid">{ rows }</table>;
  }

  _onCellClick(rowIndex, cellIndex) {
    const boundFn = event => {
      event.preventDefault();

      if (this.game.makeUserMove(rowIndex, cellIndex)) {
        if (!this._checkGameEnded()) {
          this.game.makeComputerMove();
          this._checkGameEnded();
        }

        GameActions.updateBoard(this.game.board);
      } else {
        GameActions.invalidateMove();
      }
    };

    return boundFn;
  }

  _checkGameEnded() {
    if (!this.game.gameOver) {
      return false;
    }

    if (this.game.isDraw) {
      GameActions.drawGame(this.props.user.get('draws') + 1);
      GameSummaryActions.updateGameSummary({
        draws: this.props.gameSummary.get('draws') + 1
      });
      return true;

    } else if (this.game.winner === MarkMapping.get('user')) {
      GameActions.winGame(this.props.user.get('wins') + 1);
      GameSummaryActions.updateGameSummary({
        losses: this.props.gameSummary.get('losses') + 1
      });
      return true;

    } else if (this.game.winner === MarkMapping.get('computer')) {
      GameActions.loseGame(this.props.user.get('losses') + 1);
      GameSummaryActions.updateGameSummary({
        wins: this.props.gameSummary.get('wins') + 1
      });
      return true;
    }
  }
}

export default Marty.createContainer(Board, {
  listenTo: [GameSummaryStore, GameStore, UserStore],
  fetch: {
    gameSummary() {
      return GameStore.getGameSummary();
    },

    gameState() {
      return GameStore.getGameState();
    },

    user() {
      return UserStore.getUser();
    }
  }
});
