Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :pets, only: [:index, :create]
  
  get '/pet-user/:id', to: 'pets#pet_user', as: 'pet_user'

end
