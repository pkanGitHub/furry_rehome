# http://localhost:3000/pets?category=dogs
# http://localhost:3000/pets/#dogs
# query string, starts with a "?" then it will be key/value pairs "key=value", all of the parameters are divided by "&"

class PetsController < ApplicationController
   
    def index
        # localhost:3000/pets?category=dog
        # localhost:3000/pets?email=ron@gmail.com
        if params[:email]
            @pets = User.pets_of_email(params[:email])
        elsif params[:category]
            @pets = Pet.where(category: params[:category])
        else
            @pets = Pet.recent_pets
        end
        render json: @pets
    end

    def create
        @user = User.new(user_params)
        if @user.save
            render json: @user, status: :created
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.require(:user).permit(:name, :email, pets_attributes:[:id, :pet_name, :pet_age, :health_concern, :image_link, :category])
    end
end
