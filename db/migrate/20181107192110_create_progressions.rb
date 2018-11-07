class CreateProgressions < ActiveRecord::Migration[5.2]
  def change
    create_table :progressions do |t|
      t.references :sale, index: true, foreign_key: true
      t.string :stage, null: false

      t.timestamps null: false
    end
  end
end
