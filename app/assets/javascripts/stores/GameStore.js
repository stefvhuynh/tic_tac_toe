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

    this.handlers = {
      _updateBoard: GameConstants.UPDATE_BOARD,
      _updateState: GameConstants.UPDATE_STATE
    };
  }

  getGameState() {
    return Immutable.Map({
      board: this.board,
      gameOver: this.gameOver,
      winner: this.winner
    });
  }

  _updateBoard(board) {
    this.board = board;
    this.hasChanged();
  }

  _updateState(gameOver) {
    this.gameOver = gameOver;
    this.hasChanged();
  }

  _updateWinner(winner) {
    this.winner = winner;
    this.hasChanged();
  }
}

export default Marty.register(GameStore);
