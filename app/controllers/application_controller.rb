class ApplicationController < ActionController::Base
  # TODO: Figure csrf token.
  #protect_from_forgery with: :null_session
  helper_method :current_session

  def logged_in?
    session_token ? Session.exists?(session_token) : false
  end

  def log_in(user)
    @current_session = Session.create(user.id)
  end

  def current_session
    @current_session ||= Session.find_by_session_token(session_token)
  end

  def session_token
    request.headers['X-Session-Token']
  end

  private

  def require_logged_in
    render nothing: true, status: :unauthorized unless logged_in?
  end
end
