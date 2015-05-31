import Marty from 'marty';
import Immutable from 'immutable';
import GameConstants from 'constants/GameConstants';
import MarkMapping from 'constants/MarkMapping';

class GameStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.board = Immutable.List();
    for (let i = 0; i < 3; i++) {
      let emptyList = Immutable.List.of(
        MarkMapping.get('empty'),
        MarkMapping.get('empty'),
        MarkMapping.get('empty')
      );

      this.board = this.board.push(emptyList);
    }

    this.gameOver = false;
    this.winner;
    this.error;

    this.handlers = {
      _updateBoard: GameConstants.UPDATE_BOARD,
      _winGame: GameConstants.WIN_GAME,
      _loseGame: GameConstants.LOSE_GAME,
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

  _winGame() {
    this._updateWinner(MarkMapping.get('user'));
  }

  _loseGame() {
    this._updateWinner(MarkMapping.get('computer'));
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
