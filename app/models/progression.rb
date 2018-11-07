class Progression < ApplicationRecord
  belongs_to :sale

  validates :stage, uniqueness: { scope: :sale }
end
