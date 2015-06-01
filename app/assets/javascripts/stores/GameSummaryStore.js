import Marty from 'marty';
import Immutable from 'immutable';
import GameSummaryConstants from 'constants/GameSummaryConstants';

class GameSummaryStore extends Marty.Store {
  constructor(options) {
    super(options)

    this.wins;
    this.losses;
    this.draws;
    this.gamesPlayed;

    this.handlers = {
      _loadGameSummary: GameSummaryConstants.GET_GAME_SUMMARY_DONE
    };
  }

  getGameSummary() {
    return Immutable.Map({
      wins: this.wins,
      losses: this.losses,
      draws: this.draws,
      gamesPlayed: this.gamesPlayed
    });
  }

  hasLoadedSummary() {
    return this.wins ? true : false;
  }

  _loadGameSummary(gameSummary) {
    this.wins = gameSummary.wins;
    this.losses = gameSummary.losses;
    this.draws = gameSummary.draws;
    this.gamesPlayed = gameSummary.gamesPlayed;
    this.hasChanged();
  }
}

export default Marty.register(GameSummaryStore);
