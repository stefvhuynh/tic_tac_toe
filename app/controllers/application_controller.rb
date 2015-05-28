class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def logged_in?
    session_token ? Session.exists?(session_token) : false
  end

  def current_session
    if session_token
      @current_session ||= Session.find_by_session_token(session_token)
    else
      nil
    end
  end

  def session_token
    request.headers['X-Session-Token']
  end

  private

  def require_logged_in
    render nothing: true, status: :unauthorized unless logged_in?
  end
end
