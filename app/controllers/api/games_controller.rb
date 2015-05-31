class Api::GamesController < ApplicationController
  def show
    @game = Game.instance
    render :show
  end

  def update
    @game = Game.instance
    @game.update(game_params)
    render :show
  end

  private

  def game_params
    params.require(:game).permit(:total_games, :wins, :losses, :draws)
  end
end
