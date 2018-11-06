require "rails_helper"

RSpec.describe Sale do
  describe "validations" do
    it { is_expected.to validate_presence_of(:product) }
    it { is_expected.to validate_presence_of(:customer) }
    it { is_expected.to validate_presence_of(:amount) }
    it { is_expected.to validate_presence_of(:stage) }
  end

  it do
    is_expected.to define_enum_for(:stage).backed_by_column_of_type(:string)
  end

  describe ".build" do
    it "builds a new sale with given args and the default stage" do
      sale = Sale.build(product: "Product", customer: "Customer", amount: 1)

      expect(sale.product).to eq("Product")
      expect(sale.customer).to eq("Customer")
      expect(sale.amount).to eq(1)
      expect(sale.stage).to eq("contact")
    end
  end
end
