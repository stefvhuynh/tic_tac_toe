import Marty from 'marty';
import UserConstants from 'constants/UserConstants';
import ApiUtils from 'utils/ApiUtils';
import CookieUtils from 'utils/CookieUtils';

class UserActions extends Marty.ActionCreators {
  logIn(user) {
    this.dispatch(UserConstants.LOG_IN, user);
  }

  attemptSignUp(username, password) {
    ApiUtils.createUser(
      username,
      password,
      user => {
        if (user.sessionToken) {
          CookieUtils.setSessionCookie(user.sessionToken);
          this.logIn(user);
        } else {
          this.failSignUp({ errors: ['Missing session token'] });
        }
      },
      errors => this.failSignUp(errors)
    );

    this.dispatch(UserConstants.SIGN_UP_STARTING);
  }

  attemptLogIn(username, password) {
    ApiUtils.createSession(
      username,
      password,
      user => {
        if (user.sessionToken) {
          CookieUtils.setSessionCookie(user.sessionToken);
          this.logIn(user)
        } else {
          this.failLogIn({ errors: ['Missing session token'] });
        }
      },
      errors => this.failLogIn(errors)
    );

    this.dispatch(UserConstants.LOG_IN_STARTING);
  }

  failSignUp(errors) {
    this.dispatch(UserConstants.SIGN_UP_FAILED, errors);
  }

  failLogIn(errors) {
    this.dispatch(UserConstants.LOG_IN_FAILED, errors);
  }
}

export default Marty.register(UserActions);
