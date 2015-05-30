import React from 'react';
import Marty from 'marty';
import GameActions from 'actions/GameActions';
import GameStore from 'stores/GameStore';

class Board extends React.Component {
  constructor(props) {
    super(props);
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
    const rows = this.props.board.map((row, rowIndex) => {
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
      GameActions.userMove(rowIndex, cellIndex);
    };

    return boundFn;
  }
}

export default Marty.createContainer(Board, {
  listenTo: GameStore,
  fetch: {
    board() {
      return GameStore.getBoard();
    }
  }
});
