import Marty from 'marty';
import GameConstants from 'constants/GameConstants';

class GameActions extends Marty.ActionCreators {
  updateBoard(board) {
    this.dispatch(GameConstants.UPDATE_BOARD, board);
  }

  winGame() {
    this.dispatch(GameConstants.WIN_GAME);
  }

  loseGame() {
    this.dispatch(GameConstants.LOSE_GAME);
  }

  drawGame() {
    this.dispatch(GameConstants.DRAW_GAME);
  }

  invalidateMove() {
    this.dispatch(GameConstants.INVALIDATE_MOVE);
  }
}

export default Marty.register(GameActions);
