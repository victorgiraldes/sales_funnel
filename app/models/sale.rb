class Sale < ApplicationRecord
  enum stage: [:contact, :proposal, :follow_up, :closing, :closed, :lost]

  validates :product, :customer, :amount, :stage, presence: true
  validates_with SaleValidator

  def self.stage_position(stage)
    stages[stage] || -1
  end

  def ahead_of_stage?(other_stage)
    Sale.stage_position(stage) > Sale.stage_position(other_stage)
  end
end
