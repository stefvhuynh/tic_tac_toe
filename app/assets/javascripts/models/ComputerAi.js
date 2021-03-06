import Immutable from 'immutable';
import MarkMapping from 'constants/MarkMapping';
import GameConstants from 'constants/GameConstants';

class ComputerAi {
  constructor(difficulty) {
    this.difficulty = difficulty;
  }

  chooseMove(board) {
    if (this.difficulty === GameConstants.EASY) {
      return this._chooseRandomly(board);
    }
  }

  _chooseRandomly(board) {
    while (true) {
      let randomRow = Math.floor(Math.random() * 3);
      let randomCell = Math.floor(Math.random() * 3);

      if (board.get(randomRow).get(randomCell) === MarkMapping.get('empty')) {
        return Immutable.Map({ rowIndex: randomRow, cellIndex: randomCell });
      }
    }
  }
}

export default ComputerAi;
