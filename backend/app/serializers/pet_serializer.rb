class PetSerializer
    include FastJsonapi::ObjectSerializer
    attributes :pet_name, :pet_age, :health_concern, :image_link
    belongs_to :user

end