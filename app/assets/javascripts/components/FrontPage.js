import React from 'react';
import Marty from 'marty';
import Router from 'react-router';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import LogIn from 'components/LogIn';
import SignUp from 'components/SignUp';
import UserStats from 'components/UserStats';
import GameSummary from 'components/GameSummary';

const { RouteHandler, Link } = Router;

class FrontPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let userSection;

    if (this.props.loggedIn) {
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
        <GameSummary/>
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

export default Marty.createContainer(FrontPage, {
  listenTo: UserStore,
  fetch: {
    loggedIn() {
      return UserStore.isLoggedIn();
    }
  }
});
