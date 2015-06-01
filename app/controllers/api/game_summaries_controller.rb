class Api::GameSummariesController < ApplicationController
  def show
    @game_summary = GameSummary.instance
    render :show
  end

  def update
    @game_summary = GameSummary.instance
    @game_summary.update(game_summary_params)
    render :show
  end

  private

  def game_summary_params
    params.require(:game_summary).permit(:total_games, :wins, :losses, :draws)
  end
end
