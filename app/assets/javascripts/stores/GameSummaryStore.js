import Marty from 'marty';
import Immutable from 'immutable';
import GameSummaryConstants from 'constants/GameSummaryConstants';
import GameConstants from 'constants/GameConstants';

class GameSummaryStore extends Marty.Store {
  constructor(options) {
    super(options)

    this.wins;
    this.losses;
    this.draws;
    this.gamesPlayed;

    this.handlers = {
      _loadGameSummary: GameSummaryConstants.GET_GAME_SUMMARY_DONE,
      _incrementWins: GameConstants.LOSE_GAME,
      _incrementLosses: GameConstants.WIN_GAME,
      _incrementDraws: GameConstants.DRAW_GAME
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
    Object.keys(gameSummary).forEach(key => {
      this[key] = parseInt(gameSummary[key])
    });
    this.hasChanged();
  }

  _incrementWins() {
    this.wins += 1;
    this._incrementGamesPlayed();
  }

  _incrementLosses() {
    this.losses += 1;
    this._incrementGamesPlayed();
  }

  _incrementDraws() {
    this.draws += 1;
    this._incrementGamesPlayed();
  }

  _incrementGamesPlayed() {
    this.gamesPlayed += 1;
    this.hasChanged();
  }
}

export default Marty.register(GameSummaryStore);
