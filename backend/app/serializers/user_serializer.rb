class UserSerializer
    include FastJsonapi::ObjectSerialzier
    attributes :name, :email, :pets
    has_many :pets
end