import MarkMapping from 'constants/MarkMapping';
import ComputerAi from 'models/ComputerAi';

class Game {
  constructor(board, difficulty) {
    this.board = board;
    this.computerAi = new ComputerAi(difficulty);
    this.gameOver = false;
    this.isDraw = false;
    this.winner;
  }

  getCell(rowIndex, cellIndex) {
    return this.board.get(rowIndex).get(cellIndex);
  }

  makeUserMove(rowIndex, cellIndex) {
    return this.makeMove(rowIndex, cellIndex, MarkMapping.get('user'));
  }

  makeComputerMove() {
    const move = this.computerAi.chooseMove(this.board);
    return this.makeMove(
      move.get('rowIndex'),
      move.get('cellIndex'),
      MarkMapping.get('computer')
    );
  }

  makeMove(rowIndex, cellIndex, mark) {
    if (!this._isValidMove(rowIndex, cellIndex)) {
      return false;
    }

    const newRow = this.board.get(rowIndex).set(cellIndex, mark);
    this.board = this.board.set(rowIndex, newRow);
    this._checkForGameOver();
    return true;
  }

  _isValidMove(rowIndex, cellIndex) {
    return this.getCell(rowIndex, cellIndex) === MarkMapping.get('empty');
  }

  _checkForGameOver() {
    return this._checkForWinner() || this._checkForDraw();
  }

  _checkForWinner() {
    return(
      this._checkForRowWin() || this._checkForColumnWin() ||
        this._checkForDiagonalWin()
    );
  }

  _checkForDraw() {
    if (this._isBoardFilled() && !this.winner) {
      this.isDraw = true;
      this.gameOver = true;
    }

    return this.isDraw;
  }

  _isBoardFilled() {
    let filled = true;

    this.board.forEach(row => {
      row.forEach(cell => {
        if (cell === MarkMapping.get('empty')) {
          filled = false;
        }
      });
    });

    return filled;
  }

  _checkForRowWin() {
    for (let i = 0; i < 3; i++) {
      if (this.getCell(i, 0) === MarkMapping.get('empty')) {
        continue;
      }

      const firstTwoEqual = this.getCell(i, 0) === this.getCell(i, 1);
      const lastTwoEqual = this.getCell(i, 1) === this.getCell(i, 2);

      if (firstTwoEqual && lastTwoEqual) {
        this.winner = this.getCell(i, 0);
        this.gameOver = true;
      }
    }

    return this.gameOver;
  }

  _checkForColumnWin() {
    for (let i = 0; i < 3; i++) {
      if (this.getCell(0, i) === MarkMapping.get('empty')) {
        continue;
      }

      const firstTwoEqual = this.getCell(0, i) === this.getCell(1, i);
      const lastTwoEqual = this.getCell(1, i) === this.getCell(2, i);

      if (firstTwoEqual && lastTwoEqual) {
        this.winner = this.getCell(0, i);
        this.gameOver = true;
      }
    }

    return this.gameOver;
  }

  _checkForDiagonalWin() {
    return this._checkForLeftDiagonalWin() || this._checkForRightDiagonalWin();
  }

  _checkForLeftDiagonalWin() {
    if (this.getCell(0, 0) === MarkMapping.get('empty')) {
      return false;
    }

    const firstTwoEqual = this.getCell(0, 0) === this.getCell(1, 1);
    const lastTwoEqual = this.getCell(1, 1) === this.getCell(2, 2);

    if (firstTwoEqual && lastTwoEqual) {
      this.winner = this.getCell(0, 0);
      this.gameOver = true;
    }

    return this.gameOver;
  }

  _checkForRightDiagonalWin() {
    if (this.getCell(0, 2) === MarkMapping.get('empty')) {
      return false;
    }

    const firstTwoEqual = this.getCell(0, 2) === this.getCell(1, 1);
    const lastTwoEqual = this.getCell(1, 1) === this.getCell(2, 0);

    if (firstTwoEqual && lastTwoEqual) {
      this.winner = this.getCell(0, 2);
      this.gameOver = true;
    }

    return this.gameOver;
  }
}

export default Game;
