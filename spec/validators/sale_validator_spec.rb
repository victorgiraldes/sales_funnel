require "rails_helper"

RSpec.describe SaleValidator do
  describe "#validate" do
    subject(:validator) { described_class.new }

    context "when stage did not change" do
      it "validates" do
        sale = create(:sale, stage: :contact)
        sale.stage = :contact
        validator.validate(sale)
        expect(sale).to be_valid
      end
    end

    context "when stage progressed" do
      it "validates" do
        sale = create(:sale, stage: :contact)
        sale.stage = :proposal
        validator.validate(sale)
        expect(sale).to be_valid
      end
    end

    context "when stage regressed" do
      it "invalidates" do
        sale = create(:sale, stage: :follow_up)
        sale.stage = :contact
        validator.validate(sale)
        expect(sale).to be_invalid
        expect(sale.errors).to include(:stage)
      end
    end
  end
end
