import React from 'react';
import Marty from 'marty';
import CookieUtils from 'utils/CookieUtils';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import LogIn from 'components/LogIn';
import SignUp from 'components/SignUp';
import UserStats from 'components/UserStats';

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let userSection;

    if (CookieUtils.isLoggedIn()) {
      if (!this.props.hasLoadedUser) {
        UserActions.attemptGetSession();
      }
      userSection = <UserStats/>;
    } else {
      userSection = (
        <div>
          <LogIn/>
          <SignUp/>
        </div>
      );
    }

    return(
      <div className="TicTacToe">
        <h1>TicTacToe</h1>
        { userSection }
      </div>
    );
  }
}

export default Marty.createContainer(TicTacToe, {
  listenTo: UserStore,
  fetch: {
    hasLoadedUser() {
      return UserStore.hasLoadedUser();
    }
  }
});
