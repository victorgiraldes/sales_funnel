class SaleValidator < ActiveModel::Validator
  def validate(record)
    if record.stage_changed? && !record.stage_evolved?
      record.errors.add(:stage, :backwards)
    end
  end
end
