import React from 'react';
import Marty from 'marty';
import Router from 'react-router';
import CookieUtils from 'utils/CookieUtils';
import UserActions from 'actions/UserActions';
import LogIn from 'components/LogIn';
import SignUp from 'components/SignUp';
import UserStats from 'components/UserStats';

const { RouteHandler, Link } = Router;

class FrontPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let userSection;

    if (CookieUtils.isLoggedIn()) {
      userSection = (
        <div>
          <button onClick={ this._onLogOutClick() }>Log Out</button>
          <UserStats/>
        </div>
      );
    } else {
      userSection = (
        <div>
          <LogIn/>
          <SignUp/>
        </div>
      );
    }

    return(
      <div className="FrontPage">
        <Link to="game-page">Play Game</Link>
        { userSection }
      </div>
    );
  }

  _onLogOutClick() {
    const boundFn = event => {
      event.preventDefault();
      UserActions.logOut();
    };

    return boundFn;
  }
}

export default FrontPage;
