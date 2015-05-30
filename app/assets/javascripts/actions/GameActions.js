import Marty from 'marty';
import GameConstants from 'constants/GameConstants';

class GameActions extends Marty.ActionCreators {
  updateBoard(board) {
    this.dispatch(GameConstants.UPDATE_BOARD, board);
  }
}

export default Marty.register(GameActions);
