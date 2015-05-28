class Api::UsersController < ApplicationController
  before_action :require_logged_in, except: :create

  def create
    @user = User.new(user_params)

    if @user.save
      render :show
    else
      render json: { errors: @user.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(current_session.user_id)

    if @user.update(user_params)
      render :show, status: :ok
    else
      render json: { errors: @user.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :wins, :losses, :draws)
  end
end
