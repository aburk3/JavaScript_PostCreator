Rails.application.routes.draw do
  resources :users

  resources :posts do
    get "/posts/:id/comments/new", to: 'comments#new'
    resources :comments do
      get "/delete", to: "comments#destroy"
    end
  end

  root "sessions#new"
  get "/signin", to: "sessions#new"
  post "/signin", to: "sessions#create"
  get "/signout", to: "sessions#destroy"
end
