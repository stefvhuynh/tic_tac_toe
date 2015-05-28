import Marty from 'marty';
import UserConstants from 'constants/UserConstants';

class UserStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.userId;
    this.username;
    this.wins;
    this.losses;
    this.draws;

    this.handlers = {
      loadUser: UserConstants.LOG_IN
    };
  }

  loadUser(user) {
    this.userId = user.id;
    this.username = user.username;
    this.wins = user.wins;
    this.losses = user.losses;
    this.draws = user.draws;
    this.hasChanged();
  }
}

export default Marty.register(UserStore);
