class ChangeSaleStageToInteger < ActiveRecord::Migration[5.2]
  def change
    remove_column :sales, :stage, :integer
    add_column :sales, :stage, :integer, default: 0, null: false, index: true
  end
end
