import React from 'react';
import Marty from 'marty';
import MarkMapping from 'constants/MarkMapping';
import GameConstants from 'constants/GameConstants';
import GameActions from 'actions/GameActions';
import GameStore from 'stores/GameStore';
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
        return(
          <td onClick={ this._onCellClick(rowIndex, cellIndex) }
            key={ cellIndex }>
            { cell }
          </td>
        );
      });

      return <tr key={ rowIndex }>{ cells }</tr>;
    });

    return <table className="grid">{ rows }</table>;
  }

  _onCellClick(rowIndex, cellIndex) {
    const boundFn = event => {
      event.preventDefault();

      if (!this.props.gameState.get('gameOver')) {
        if (this.game.makeUserMove(rowIndex, cellIndex)) {
          if (!this._checkGameEnded()) {
            this.game.makeComputerMove();
            this._checkGameEnded();
          }

          GameActions.updateBoard(this.game.getBoard());
        } else {
          GameActions.invalidateMove();
        }
      }
    };

    return boundFn;
  }

  _checkGameEnded() {
    const winner = this.game.getWinner();

    if (winner === MarkMapping.get('user')) {
      GameActions.winGame();
      return true;
    } else if (winner === MarkMapping.get('computer')) {
      GameActions.loseGame();
      return true;
    } else if (this.game.isDraw()) {
      GameActions.drawGame();
      return true;
    }

    return false;
  }
}

export default Marty.createContainer(Board, {
  listenTo: GameStore,
  fetch: {
    gameState() {
      return GameStore.getGameState();
    }
  }
});
