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
end
