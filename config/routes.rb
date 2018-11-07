Rails.application.routes.draw do
  root to: "funnels#show"

  resource :funnel, only: :show
  resources :sales, only: [:new, :create, :edit, :update]
end
