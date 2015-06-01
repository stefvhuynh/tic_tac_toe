import React from 'react';
import Marty from 'marty';
import UserStore from 'stores/UserStore';

class UserStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="UserStats stats-table">
        <h3>Your Stats</h3>
        <table>
          <tr>
            <td className="table-label">Wins</td>
            <td className="table-data">{ this.props.user.get('wins') }</td>
          </tr>
          <tr>
            <td className="table-label">Losses</td>
            <td className="table-data">{ this.props.user.get('losses') }</td>
          </tr>
          <tr>
            <td className="table-label">Draws</td>
            <td className="table-data">{ this.props.user.get('draws') }</td>
          </tr>
        </table>
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
