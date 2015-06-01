import Marty from 'marty';
import GameSummaryConstants from 'constants/GameSummaryConstants';
import ApiUtils from 'utils/ApiUtils';

class GameSummaryActions extends Marty.ActionCreators {
  getGameSummary(gameSummary) {
    this.dispatch(GameSummaryConstants.GET_GAME_SUMMARY_DONE, gameSummary);
  }

  attemptGetGameSummary() {
    ApiUtils.getGameSummary(
      gameSummary => this.getGameSummary(gameSummary),
      errors => this.failGetGameSummary(errors)
    );

    this.dispatch(GameSummaryConstants.GET_GAME_SUMMARY_STARTING);
  }

  failGetGameSummary(errors) {
    this.dispatch(GameSummaryConstants.GET_GAME_SUMMARY_FAILED, errors);
  }
}

export default Marty.register(GameSummaryActions);
