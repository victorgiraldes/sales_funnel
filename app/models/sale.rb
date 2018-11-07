class Sale < ApplicationRecord
  enum stage: {
    :contact   => "contact",
    :proposal  => "proposal",
    :follow_up => "follow_up",
    :closing   => "closing",
    :closed    => "closed",
    :lost      => "lost"
  }

  validates :product, :customer, :amount, :stage, presence: true
  validate do |sale|
    if stage_changed? && !stage_evolved?
      sale.errors.add(:stage, "can't go back in stage")
    end
  end

  def self.build(args)
    new({ stage: :contact }.merge(args))
  end

  def stage_evolved?
    return true if stage_was.nil?

    stages = self.class.stages.keys
    stages.index(stage) > stages.index(stage_was)
  end
end
