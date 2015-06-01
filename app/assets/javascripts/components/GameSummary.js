import React from 'react';
import Marty from 'marty';
import GameSummaryActions from 'actions/GameSummaryActions';
import GameSummaryStore from 'stores/GameSummaryStore';

class GameSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    GameSummaryActions.attemptGetGameSummary();
  }

  render() {
    return(
      <div className="GameSummary stats-table">
        <h3>The Computer's Stats</h3>
        <table>
          <tr>
            <td className="table-label">Wins</td>
            <td className="table-data">
              { this.props.gameSummary.get('wins') }
            </td>
          </tr>
          <tr>
            <td className="table-label">Losses</td>
            <td className="table-data">
              { this.props.gameSummary.get('losses') }
            </td>
          </tr>
          <tr>
            <td className="table-label">Draws</td>
            <td className="table-data">
              { this.props.gameSummary.get('draws') }
            </td>
          </tr>
          <tr>
            <td className="table-label">Games Played</td>
            <td className="table-data">
              { this.props.gameSummary.get('gamesPlayed') }
            </td>
          </tr>
          <tr>
            <td className="table-label">Active Games</td>
            <td className="table-data">
              { this.props.gameSummary.get('activeGames') }
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default Marty.createContainer(GameSummary, {
  listenTo: GameSummaryStore,
  fetch: {
    gameSummary() {
      return GameSummaryStore.getGameSummary();
    },

    hasLoadedGameSummary() {
      return GameSummaryStore.hasLoadedGameSummary();
    }
  }
});
