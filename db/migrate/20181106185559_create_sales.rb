class CreateSales < ActiveRecord::Migration[5.2]
  def change
    create_table :sales do |t|
      t.string :product, null: false
      t.string :customer, null: false
      t.integer :amount, null: false
      t.string :stage, null: false, index: true

      t.timestamps null: false
    end
  end
end
