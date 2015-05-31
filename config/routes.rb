Rails.application.routes.draw do
  root to: 'pages#main'

  namespace :api, defaults: { format: :json } do
    resource :user, only: [:create, :update]
    resource :session, only: [:show, :create, :destroy]
    resource :game, only: [:show, :update]
  end
end
