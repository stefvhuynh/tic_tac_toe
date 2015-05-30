import React from 'react';
import Marty from 'marty';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const example = [[1, 0, 1], [0, 1, 0], [1, 0, 1]];
    const grid = this._generateGrid(example);

    return(
      <div className="Board">
        { grid }
      </div>
    );
  }

  _generateGrid(model) {
    const rows = model.map((row, rowIndex) => {
      const cells = row.map((cell, cellIndex) => {
        return <td key={ cellIndex }>{ cell }</td>;
      });

      return <tr key={ rowIndex }>{ cells }</tr>;
    });

    return <table className="grid">{ rows }</table>;
  }
}

export default Board;
