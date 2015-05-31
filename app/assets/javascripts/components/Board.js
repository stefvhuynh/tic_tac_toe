import React from 'react';
import Marty from 'marty';
import MarkMapping from 'constants/MarkMapping';
import GameConstants from 'constants/GameConstants';
import GameActions from 'actions/GameActions';
import GameStore from 'stores/GameStore';
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
      GameActions.drawGame();
      return true;
    } else if (this.game.winner === MarkMapping.get('user')) {
      GameActions.winGame(this.props.user.get('wins') + 1);
      return true;
    } else if (this.game.winner === MarkMapping.get('computer')) {
      GameActions.loseGame();
      return true;
    }
  }
}

export default Marty.createContainer(Board, {
  listenTo: [GameStore, UserStore],
  fetch: {
    gameState() {
      return GameStore.getGameState();
    },

    user() {
      return UserStore.getUser();
    }
  }
});
