# http://localhost:3000/pets?category=dogs
# http://localhost:3000/pets/#dogs
# query string, starts with a "?" then it will be key/value pairs "key=value", all of the parameters are divided by "&"

class PetsController < ApplicationController
   
    def index
        # localhost:3000/pets?category=dog
        if params[:category]
            @pets = Pet.where(category: params[:category])
        else
            @pets = Pet.recent_pets
        end
    end

    def new
        @pet = Pet.new
        @user = User.new
    end

    def create

    end

    private

    def pet_params

    end
end
