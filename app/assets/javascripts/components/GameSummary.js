import React from 'react';
import Marty from 'marty';
import GameSummaryActions from 'actions/GameSummaryActions';
import GameSummaryStore from 'stores/GameSummaryStore';

class GameSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.hasLoadedGameSummary) {
      GameSummaryActions.attemptGetGameSummary();
    }
  }

  render() {
    return(
      <div className="GameSummary">
        <h3>{ `Wins: ${this.props.gameSummary.get('wins')}` }</h3>
        <h3>{ `Losses: ${this.props.gameSummary.get('losses')}` }</h3>
        <h3>{ `Draws: ${this.props.gameSummary.get('draws')}` }</h3>
        <h3>
          { `Games Played: ${this.props.gameSummary.get('gamesPlayed')}` }
        </h3>
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
      return GameSummaryStore.hasLoadedSummary();
    }
  }
});
