class UserSerializer
    include FastJsonapi::ObjectSerialier
    attributes :name, :email, :pets
    has_many :pets
end