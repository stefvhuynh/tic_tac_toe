import Marty from 'marty';
import Immutable from 'immutable';
import UserConstants from 'constants/UserConstants';
import GameConstants from 'constants/GameConstants';

class UserStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.userId = null;
    this.username = null;
    this.wins = null;
    this.losses = null;
    this.draws = null;
    this.loggedIn = false;

    this.handlers = {
      _loadUser: UserConstants.LOAD_USER,
      _updateWins: GameConstants.WIN_GAME,
      _updateLosses: GameConstants.LOSE_GAME,
      _updateDraws: GameConstants.DRAW_GAME,
      _logOut: UserConstants.LOG_OUT
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

  isLoggedIn() {
    return this.loggedIn;
  }

  _loadUser(user) {
    this.userId = user.id;
    this.username = user.username;
    this.wins = user.wins;
    this.losses = user.losses;
    this.draws = user.draws;
    this.loggedIn = true;
    this.hasChanged();
  }

  _logOut() {
    this.loggedIn = false;
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
