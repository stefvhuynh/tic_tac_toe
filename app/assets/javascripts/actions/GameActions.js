import Marty from 'marty';
import GameConstants from 'constants/GameConstants';

class GameActions extends Marty.ActionCreators {
  userMove(rowIndex, cellIndex) {
    this.dispatch(GameConstants.USER_MOVE, rowIndex, cellIndex);
  }

  computerMove(rowIndex, cellIndex) {
    this.dispatch(GameConstants.COMPUTER_MOVE, rowIndex, cellIndex);
  }
}

export default Marty.register(GameActions);
