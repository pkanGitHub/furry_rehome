class UserSerializer
    include FastJsonapi::ObjectSerialier
    attributes :name, :email, :pet
    has_many :pets
end