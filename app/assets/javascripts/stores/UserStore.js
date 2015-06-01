import Marty from 'marty';
import Immutable from 'immutable';
import UserConstants from 'constants/UserConstants';
import GameConstants from 'constants/GameConstants';

class UserStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.userId;
    this.username;
    this.wins;
    this.losses;
    this.draws;

    this.handlers = {
      _loadUser: UserConstants.LOAD_USER,
      _updateWins: GameConstants.WIN_GAME,
      _updateLosses: GameConstants.LOSE_GAME,
      _updateDraws: GameConstants.DRAW_GAME
    };
  }

  getUser() {
    return Immutable.Map({
      userId: this.userId,
      username: this.username,
      wins: this.wins,
      losses: this.losses,
      draws: this.draws
    });
  }

  hasLoadedUser() {
    return this.userId ? true : false;
  }

  _loadUser(user) {
    this.userId = user.id;
    this.username = user.username;
    this.wins = user.wins;
    this.losses = user.losses;
    this.draws = user.draws;
    this.hasChanged();
  }

  _updateWins(wins) {
    this.wins = wins;
    this.hasChanged();
  }

  _updateLosses(losses) {
    this.losses = losses;
    this.hasChanged();
  }

  _updateDraws(draws) {
    this.draws = draws;
    this.hasChanged();
  }
}

export default Marty.register(UserStore);
