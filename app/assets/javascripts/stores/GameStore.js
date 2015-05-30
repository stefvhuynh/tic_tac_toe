import Marty from 'marty';
import Immutable from 'immutable';
import GameConstants from 'constants/GameConstants';

class GameStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.board = Immutable.List.of(
      Immutable.List.of('E', 'E', 'E'),
      Immutable.List.of('E', 'E', 'E'),
      Immutable.List.of('E', 'E', 'E')
    );

    this.userTurn = true;

    this.handlers = {
      _userMove: GameConstants.USER_MOVE,
      _computerMove: GameConstants.COMPUTER_MOVE
    };
  }

  getGameState() {
    return Immutable.Map({ board: this.board, userTurn: this.userTurn });
  }

  _userMove(rowIndex, cellIndex) {
    this._setBoardCell(rowIndex, cellIndex, 'X');
    this.userTurn = false;
    this.hasChanged();
  }

  _computerMove(rowIndex, cellIndex) {
    this._setBoardCell(rowIndex, cellIndex, 'O');
    this.userTurn = true;
    this.hasChanged();
  }

  _setBoardCell(rowIndex, cellIndex, mark) {
    const newRow = this.board.get(rowIndex).set(cellIndex, mark);
    this.board = this.board.set(rowIndex, newRow);
  }
}

export default Marty.register(GameStore);
