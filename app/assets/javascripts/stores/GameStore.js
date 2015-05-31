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
    this.winner;
    this.error;

    this.handlers = {
      _updateBoard: GameConstants.UPDATE_BOARD,
      _updateWinner: GameConstants.UPDATE_WINNER,
      _drawGame: GameConstants.DRAW_GAME,
      _invalidateMove: GameConstants.INVALIDATE_MOVE
    };
  }

  getGameState() {
    return Immutable.Map({
      board: this.board,
      gameOver: this.gameOver,
      winner: this.winner,
      error: this.error
    });
  }

  _updateBoard(board) {
    this._clearError();
    this.board = board;
    this.hasChanged();
  }

  _updateWinner(winner) {
    this.winner = winner;
    this.gameOver = true;
    this.hasChanged();
  }

  _drawGame() {
    this.gameOver = true;
    this.hasChanged();
  }

  _invalidateMove() {
    this.error = 'Invalid move';
    this.hasChanged();
  }

  _clearError() {
    this.error = null;
  }
}

export default Marty.register(GameStore);
