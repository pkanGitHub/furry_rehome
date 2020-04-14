class Pet < ApplicationRecord
    belongs_to :user

    def self.recent_pets
        two_months_ago = (Date.today - 60).beginning_of_day
        today = (Date.today + 1).end_of_day
        Pet.where(created_at: two_months_ago..today)
    end
end
