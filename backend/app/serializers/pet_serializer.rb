class PetSerializer
    include FastJsonapi::ObjectSerialier
    attributes :pet_name, :pet_age, :health_concern, :image_link
    belongs_to :user

end