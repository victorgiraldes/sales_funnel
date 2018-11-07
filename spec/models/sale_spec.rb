require "rails_helper"

RSpec.describe Sale do
  describe "validations" do
    it { is_expected.to validate_presence_of(:product) }
    it { is_expected.to validate_presence_of(:customer) }
    it { is_expected.to validate_presence_of(:amount) }
    it { is_expected.to validate_presence_of(:stage) }
  end

  it { is_expected.to define_enum_for(:stage) }

  describe "#ahead_of_stage?" do
    context "when current stage is nil" do
      it do
        sale = Sale.new(stage: nil)
        expect(sale.ahead_of_stage?(:invalid)).to be false
      end
    end

    context "when current stage is not nil and other stage is invalid" do
      it do
        sale = Sale.new(stage: :lost)
        expect(sale.ahead_of_stage?(:invalid)).to be true
      end
    end

    context "when other stage comes before current stage" do
      it do
        sale = Sale.new(stage: :proposal)
        expect(sale.ahead_of_stage?(:contact)).to be true
      end
    end

    context "when other stage is the same as current stage" do
      it do
        sale = Sale.new(stage: :follow_up)
        expect(sale.ahead_of_stage?(:follow_up)).to be false
      end
    end

    context "when other stage comes after current stage" do
      it do
        sale = Sale.new(stage: :closed)
        expect(sale.ahead_of_stage?(:lost)).to be false
      end
    end
  end
end
