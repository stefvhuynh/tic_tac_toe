class Session
  SESSION_KEY = 'sessions'

  def self.find_by_session_token(session_token)
    user_id = $redis.hget(SESSION_KEY, session_token)
    user_id ? self.new(user_id, session_token) : nil
  end

  def self.exists?(session_token)
    $redis.hget(SESSION_KEY, session_token) ? true : false
  end

  def self.create(user_id, session_token = nil)
    session = self.new(user_id, session_token)
    session.save
    session
  end

  attr_reader :user_id, :session_token

  def initialize(user_id, session_token = nil)
    @user_id = user_id
    self.generate_session_token! unless session_token
  end

  def generate_session_token!
    @session_token = SecureRandom.urlsafe_base64
  end

  def save
    $redis.hset(SESSION_KEY, @session_token, @user_id)
  end

  def delete
    $redis.hdel(SESSION_KEY, @session_token) == 1 ? true : false
  end
end
