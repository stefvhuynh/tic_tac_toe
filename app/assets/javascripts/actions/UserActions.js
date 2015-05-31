import Marty from 'marty';
import UserConstants from 'constants/UserConstants';
import ApiUtils from 'utils/ApiUtils';
import CookieUtils from 'utils/CookieUtils';

class UserActions extends Marty.ActionCreators {
  loadUser(user) {
    this.dispatch(UserConstants.LOAD_USER, user);
  }

  attemptSignUp(username, password) {
    ApiUtils.createUser(
      username,
      password,
      user => {
        if (user.sessionToken) {
          CookieUtils.setSessionCookie(user.sessionToken);
          this.loadUser(user);
        } else {
          this.failSignUp({ errors: ['Missing session token'] });
        }
      },
      errors => this.failSignUp(errors)
    );

    this.dispatch(UserConstants.SIGN_UP_STARTING);
  }

  failSignUp(errors) {
    this.dispatch(UserConstants.SIGN_UP_FAILED, errors);
  }

  attemptLogIn(username, password) {
    ApiUtils.createSession(
      username,
      password,
      user => {
        if (user.sessionToken) {
          CookieUtils.setSessionCookie(user.sessionToken);
          this.loadUser(user)
        } else {
          this.failLogIn({ errors: ['Missing session token'] });
        }
      },
      errors => this.failLogIn(errors)
    );

    this.dispatch(UserConstants.LOG_IN_STARTING);
  }

  failLogIn(errors) {
    this.dispatch(UserConstants.LOG_IN_FAILED, errors);
  }

  attemptGetSession() {
    ApiUtils.getSession(
      CookieUtils.getSessionCookie(),
      user => this.loadUser(user),
      errors => this.failGetSession(errors)
    );

    this.dispatch(UserConstants.GET_SESSION_STARTING);
  }

  failGetSession(errors) {
    this.dispatch(UserConstants.GET_SESSION_FAILED, errors);
  }

  logOut() {
    ApiUtils.deleteSession(CookieUtils.getSessionCookie());
    CookieUtils.deleteSessionCookie();
    this.dispatch(UserConstants.LOG_OUT);
  }
}

export default Marty.register(UserActions);
