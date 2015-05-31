import React from 'react';
import Marty from 'marty';
import Router from 'react-router';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import CookieUtils from 'utils/CookieUtils';

const { RouteHandler } = Router;

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (CookieUtils.isLoggedIn() && !this.props.hasLoadedUser) {
      UserActions.attemptGetSession();
    }
  }

  render() {
    return(
      <div className="TicTacToe">
        <h1>TicTacToe</h1>
        <RouteHandler/>
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
