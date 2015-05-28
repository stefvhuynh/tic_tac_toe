import Marty from 'marty';
import UserConstants from 'constants/UserConstants';
import ApiUtils from 'utils/ApiUtils';

class UserActions extends Marty.ActionCreators {
  logIn(user) {
    this.dispatch(UserConstants.LOG_IN, user);
  }

  attemptSignUp(username, password) {
    ApiUtils.createUser(
      username,
      password,
      user => {
        console.log(user);
        this.logIn(user);
      },
      error => {
        console.log(error);
      }
    );

    this.dispatch(UserConstants.SIGN_UP_STARTING);
  }
}

export default Marty.register(UserActions);
