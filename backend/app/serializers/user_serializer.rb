class UserSerializer
    include FastJsonapi::ObjectSerialier
    attribute :name, :email, :pet
    has_many :pets
end