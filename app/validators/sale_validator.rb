class SaleValidator < ActiveModel::Validator
  def validate(record)
    if record.stage_changed? && !record.ahead_of_stage?(record.stage_was)
      record.errors.add(:stage, :regressed)
    end
  end
end
