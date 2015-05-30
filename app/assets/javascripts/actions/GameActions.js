import Marty from 'marty';
import GameConstants from 'constants/GameConstants';

class GameActions extends Marty.ActionCreators {
  updateBoard(board) {
    this.dispatch(GameConstants.UPDATE_BOARD, board);
  }

  invalidateMove() {
    this.dispatch(GameConstants.INVALIDATE_MOVE);
  }
}

export default Marty.register(GameActions);
