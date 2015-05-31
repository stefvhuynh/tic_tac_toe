import React from 'react';
import Marty from 'marty';
import UserStore from 'stores/UserStore';

class UserStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="UserStats">
        <h3>Wins: { this.props.user.get('wins') }</h3>
        <h3>Losses: { this.props.user.get('losses') }</h3>
        <h3>Draws: { this.props.user.get('draws') }</h3>
      </div>
    );
  }
}

export default Marty.createContainer(UserStats, {
  listenTo: UserStore,
  fetch: {
    user() {
      return UserStore.getUser();
    }
  }
});
