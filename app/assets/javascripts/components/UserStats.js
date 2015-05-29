import React from 'react';
import Marty from 'marty';
import UserStore from 'stores/UserStore';

class UserStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.user;
  }

  render() {
    return(
      <div className="UserStats">
        <h3>Wins: { this.state.wins }</h3>
        <h3>Losses: { this.state.losses }</h3>
        <h3>Draws: { this.state.draws }</h3>
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
