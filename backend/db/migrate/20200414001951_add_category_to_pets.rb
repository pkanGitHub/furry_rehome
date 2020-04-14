class AddCategoryToPets < ActiveRecord::Migration[6.0]
  def change
    add_column :pets, :category, :string
  end
end
