class CreatePets < ActiveRecord::Migration[6.0]
  def change
    create_table :pets do |t|
      t.string :pet_name
      t.integer :pet_age
      t.string :health_concern
      t.string :image_link

      t.timestamps
    end
  end
end
