import Marty from 'marty';
import Immutable from 'immutable';
import GameConstants from 'constants/GameConstants';
import MarkMapping from 'constants/MarkMapping';

class GameStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.board = this._generateEmptyBoard();
    this.gameOver = false;
    this.winner = null;
    this.error = null;

    this.handlers = {
      _updateBoard: GameConstants.UPDATE_BOARD,
      _winGame: GameConstants.WIN_GAME,
      _loseGame: GameConstants.LOSE_GAME,
      _drawGame: GameConstants.DRAW_GAME,
      _invalidateMove: GameConstants.INVALIDATE_MOVE,
      _resetGameState: GameConstants.RESET_GAME_STATE
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

  _resetGameState() {
    this.board = this._generateEmptyBoard();
    this.gameOver = false;
    this.winner = null;
    this.error = null;
  }

  _generateEmptyBoard() {
    let board = Immutable.List();

    for (let i = 0; i < 3; i++) {
      let emptyList = Immutable.List.of(
        MarkMapping.get('empty'),
        MarkMapping.get('empty'),
        MarkMapping.get('empty')
      );

      board = board.push(emptyList);
    }
    return board;
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
