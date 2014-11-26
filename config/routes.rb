Rails.application.routes.draw do

  namespace :api do
    resources :users, only: [:create] do
      resources :jogs, only: [:index, :create, :update, :destroy]
    end
    post 'api_tokens', to: 'api_tokens#create'
    delete 'api_tokens', to: 'api_tokens#destroy'
  end

  root 'welcome#angular'

end
