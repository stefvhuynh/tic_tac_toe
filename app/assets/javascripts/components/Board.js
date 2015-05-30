import React from 'react';
import Marty from 'marty';
import GameConstants from 'constants/GameConstants';
import GameActions from 'actions/GameActions';
import GameStore from 'stores/GameStore';
import ComputerAi from 'models/ComputerAi';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.computerAi = new ComputerAi(GameConstants.EASY);
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

      if (this.props.gameState.get('userTurn')) {
        GameActions.userMove(rowIndex, cellIndex);
        this._computerMove();
      }
    };

    return boundFn;
  }

  _computerMove() {
    const board = this.props.gameState.get('board');
    const move = this.computerAi.chooseMove(board);
    GameActions.computerMove(move.get('rowIndex'), move.get('cellIndex'));
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
