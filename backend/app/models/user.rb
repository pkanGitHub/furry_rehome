class User < ApplicationRecord

    has_many :pets, dependent: :destroy
    accepts_nested_attributes_for :pets

    def self.pets_of_email(email)
        pets = []
        User.where(email: email).each do |user|
            pets += user.pets
        end
        pets
    end
end
