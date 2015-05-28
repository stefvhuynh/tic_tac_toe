class Api::SessionsController < ApplicationController
  before_action :require_logged_in, except: :create

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      @session = Session.create(@user.id)
      render :show
    else
      render json: { errors: ['Invalid username/password combination'] },
        status: :unprocessable_entity
    end
  end

  def destroy
    current_session.delete
    render nothing: true, status: :ok
  end
end
