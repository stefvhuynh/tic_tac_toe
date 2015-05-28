class User < ActiveRecord::Base
  def self.find_by_credentials(username, password)
    user = self.find_by(username: username)
    (user && user.is_password?(password)) ? user : nil
  end

  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password
  before_create :set_base_stats

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  private

  def set_base_stats
    self.wins = 0 unless self.wins
    self.losses = 0 unless self.losses
    self.draws = 0 unless self.draws
  end
end
