require "rails_helper"

RSpec.describe Sale do
  it { is_expected.to validate_presence_of(:product) }
  it { is_expected.to validate_presence_of(:customer) }
  it { is_expected.to validate_presence_of(:amount) }
  it { is_expected.to validate_presence_of(:stage) }

  it do
    is_expected.to define_enum_for(:stage).backed_by_column_of_type(:string)
  end
end
