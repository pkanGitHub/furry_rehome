class PetsController < ApplicationController
    def index
        @pets = Pet.all
    end

    def new
        @pet = Pet.new
    end

    def create

    end

    private

    def pet_params

    end
end
