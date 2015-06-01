class GameSummary
  include Singleton

  GAME_KEY = 'game_summary'

  def self.custom_instance
    self.ensure_game_summary_exists!
    self.instance
  end

  def self.ensure_game_summary_exists!
    unless $redis.exists(GAME_KEY)
      $redis.hset(GAME_KEY, 'wins', 0)
      $redis.hset(GAME_KEY, 'losses', 0)
      $redis.hset(GAME_KEY, 'draws', 0)
      $redis.hset(GAME_KEY, 'games_played', 0)
      $redis.hset(GAME_KEY, 'active_games', 0)
    end
  end

  def update(params)
    params.each do |key, value|
      old_value = $redis.hget(GAME_KEY, key)

      if old_value
        if value == 'increment'
          $redis.hset(GAME_KEY, key, old_value.to_i + 1)
        elsif value == 'decrement'
          $redis.hset(GAME_KEY, key, old_value.to_i - 1)
        end
      end
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

  def active_games
    $redis.hget(GAME_KEY, 'active_games')
  end
end
