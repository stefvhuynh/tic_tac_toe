class Game {
  constructor(board) {
    this.board = board;
  }

  getCell(rowIndex, cellIndex) {
    return this.board.get(rowIndex).get(cellIndex);
  }

  makeMove(rowIndex, cellIndex, mark) {
    if (!_isValidMove) {
      return false;
    }

    const newRow = this.board.get(rowIndex).set(cellIndex, mark);
    this.board = this.board.set(rowIndex, newRow);
    return true;
  }

  checkWin() {
    return(
      this._checkRowWin() || this._checkColumnWin() || this._checkDiagonalWin();
    );
  }

  _isValidMove(rowIndex, cellIndex) {
    return this.board.get(rowIndex).get(cellIndex) !== 'E';
  }

  _checkRowWin() {
    for (let i = 0; i < 3; i++) {
      const firstTwoEqual = this.getCell(i, 0) === this.getCell(i, 1);
      const lastTwoEqual = this.getCell(i, 1) === this.getCell(i, 2);

      if (firstTwoEqual && lastTwoEqual) {
        return true;
      }
    }

    return false;
  }

  _checkColumnWin() {
    for (let i = 0; i < 3; i++) {
      const firstTwoEqual = this.getCell(0, i) === this.getCell(1, i);
      const lastTwoEqual = this.getCell(1, i) === this.getCell(2, i);

      if (firstTwoEqual && lastTwoEqual) {
        return true;
      }
    }

    return false;
  }

  _checkDiagonalWin() {
    return this._checkLeftDiagonalWin() || this._checkRightDiagonalWin();
  }

  _checkLeftDiagonalWin() {
    const firstTwoEqual = this.getCell(0, 0) === this.getCell(1, 1);
    const lastTwoEqual = this.getCell(1, 1) === this.getCell(2, 2);
    return firstTwoEqual && lastTwoEqual;
  }

  _checkRightDiagonalWin() {
    const firstTwoEqual = this.getCell(0, 2) === this.getCell(1, 1);
    const lastTwoEqual = this.getCell(1, 1) === this.getCell(2, 0);
    return firstTwoEqual && lastTwoEqual;
  }
}
