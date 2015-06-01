import Marty from 'marty';

const GameConstants = Marty.createConstants([
  'UPDATE_BOARD',
  'WIN_GAME',
  'LOSE_GAME',
  'DRAW_GAME',
  'INVALIDATE_MOVE',
  'RESET_GAME_STATE',
  'EASY',
  'MEDIUM',
  'HARD'
]);

export default GameConstants;
