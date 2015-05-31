class Game
  include Singleton

  GAME_KEY = 'game'

  def initialize
    self.ensure_game_exists!
  end

  def update(params)
    params.each do |key, value|
      $redis.hset(GAME_KEY, key, value) if $redis.hget(GAME_KEY, key)
    end
  end

  def wins
    $redis.hget(GAME_KEY, 'wins')
  end

  def losses
    $redis.hget(GAME_KEY, 'losses')
  end

  def draws
    $redis.hget(GAME_KEY, 'draws')
  end

  def games_played
    $redis.hget(GAME_KEY, 'games_played')
  end

  private

  def ensure_game_exists!
    unless $redis.exists(GAME_KEY)
      $redis.hset(GAME_KEY, 'wins', 0)
      $redis.hset(GAME_KEY, 'losses', 0)
      $redis.hset(GAME_KEY, 'draws', 0)
      $redis.hset(GAME_KEY, 'games_played', 0)
    end
  end
end
