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

    this.gameOver = false;

    this.handlers = {
      _updateBoard: GameConstants.UPDATE_BOARD,
      _updateState: GameConstants.UPDATE_STATE
    };
  }

  getGameState() {
    return Immutable.Map({ board: this.board, gameOver: this.gameOver });
  }

  _updateBoard(board) {
    this.board = board;
    this.hasChanged();
  }

  _updateState(gameOver) {
    this.gameOver = gameOver;
    this.hasChanged();
  }
}

export default Marty.register(GameStore);
