import ComputerAi from 'models/ComputerAi';

class Game {
  constructor(board, difficulty) {
    this.board = board;
    this.difficulty = difficulty;
    this.computerAi = new ComputerAi(difficulty);
    this.winner;
  }

  getBoard() {
    return this.board;
  }

  getWinner() {
    if (this.hasWon()) {
      return this.winner;
    }

    return null;
  }

  getCell(rowIndex, cellIndex) {
    return this.board.get(rowIndex).get(cellIndex);
  }

  makeUserMove(rowIndex, cellIndex) {
    return this.makeMove(rowIndex, cellIndex, 'X');
  }

  makeComputerMove() {
    const move = this.computerAi.chooseMove(this.board);
    return this.makeMove(move.get('rowIndex'), move.get('cellIndex'), 'O');
  }

  makeMove(rowIndex, cellIndex, mark) {
    if (!this._isValidMove(rowIndex, cellIndex)) {
      return false;
    }

    const newRow = this.board.get(rowIndex).set(cellIndex, mark);
    this.board = this.board.set(rowIndex, newRow);
    return true;
  }

  isDraw() {
    return this.isBoardFilled() && !this.hasWon();
  }

  hasWon() {
    return(
      this._checkRowWin() || this._checkColumnWin() || this._checkDiagonalWin()
    );
  }

  isBoardFilled() {
    let filled = true;

    this.board.forEach(row => {
      row.forEach(cell => {
        if (cell === 'E') {
          filled = false;
        }
      });
    });

    return filled;
  }

  _isValidMove(rowIndex, cellIndex) {
    return this.getCell(rowIndex, cellIndex) === 'E';
  }

  _checkRowWin() {
    for (let i = 0; i < 3; i++) {
      const firstTwoEqual = this.getCell(i, 0) === this.getCell(i, 1);
      const lastTwoEqual = this.getCell(i, 1) === this.getCell(i, 2);

      if (firstTwoEqual && lastTwoEqual) {
        this.winner = this.getCell(i, 0);
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
        this.winner = this.getCell(0, i);
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

    if (firstTwoEqual && lastTwoEqual) {
      this.winner = this.getCell(0, 0);
      return true;
    }

    return false;
  }

  _checkRightDiagonalWin() {
    const firstTwoEqual = this.getCell(0, 2) === this.getCell(1, 1);
    const lastTwoEqual = this.getCell(1, 1) === this.getCell(2, 0);

    if (firstTwoEqual && lastTwoEqual) {
      this.winner = this.getCell(0, 2);
      return true;
    }

    return false;
  }
}

export default Game;
