class User < ApplicationRecord
    # before_create: :check_if_user_exists

    has_many :pets
    accepts_nested_attributes_for :pets

    def self.pets_of_email(email)
        pets = []
        User.where(email: email).each do |user|
            pets += user.pets
        end
        pets
    end
end
