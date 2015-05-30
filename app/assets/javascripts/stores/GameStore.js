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

    this.handlers = {
      userMove: GameConstants.USER_MOVE
    };
  }

  getBoard() {
    return this.board;
  }

  userMove(rowIndex, cellIndex) {
    const newRow = this.board.get(rowIndex).set(cellIndex, 'X');
    this.board = this.board.set(rowIndex, newRow);
    this.hasChanged();
  }
}

export default Marty.register(GameStore);
