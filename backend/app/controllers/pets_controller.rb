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
            render json: @user.pets.last, status: :created
            # render json: {user.pet.last}
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    # work like show but with route /pet-user
    # 2 ways to test if your controller works
    # 1) put the route into the browser
    # 2) try it out with Postman
    def pet_user
        @pet = Pet.find(params[:id]) # .where returns an array, .find returns a single instance/object
        render json: @pet.user
    end

    private

    def user_params
        params.require(:user).permit(:name, :email, pets_attributes:[:id, :pet_name, :pet_age, :health_concern, :image_link, :category])
    end
end
