import Marty from 'marty';

const GameConstants = Marty.createConstants([
  'UPDATE_BOARD',
  'UPDATE_WINNER',
  'DRAW_GAME',
  'INVALIDATE_MOVE',
  'EASY',
  'MEDIUM',
  'HARD'
]);

export default GameConstants;
