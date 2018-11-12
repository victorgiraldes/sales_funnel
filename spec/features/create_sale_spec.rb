require "rails_helper"

RSpec.feature "Create sale", :js do
  background do
    visit "/"
  end

  scenario "creates new sale when values are valid" do
    click_button "Adicionar negócio"

    # All inputs blank
    click_button "Criar"
    expect(validation_message_for("title")).to eq "Please fill out this field."

    # Only title filled in
    fill_in "title", with: "Sale Title"
    click_button "Criar"

    expect(validation_message_for("title")).to eq ""
    expect(validation_message_for("customer"))
      .to eq "Please fill out this field."

    # Title and customer filled in
    fill_in "customer", with: "Customer Name"
    click_button "Criar"

    expect(validation_message_for("title")).to eq ""
    expect(validation_message_for("customer")).to eq ""
    expect(validation_message_for("amount")).to eq "Please fill out this field."

    # All filled in, but invalid amount
    fill_in "amount", with: "1000,,...29"
    click_button "Criar"

    expect(validation_message_for("title")).to eq ""
    expect(validation_message_for("customer")).to eq ""
    expect(validation_message_for("amount")).to eq "Please enter a number."

    # Finally, valid amount
    # Cents separator is locale-specific
    fill_in "amount", with: "1000.50"
    click_button "Criar"

    within "#column-contact" do
      expect(page).to have_content "Sale Title"
      expect(page).to have_content "Customer Name"
      expect(page).to have_content "R$ 1.000,50"
    end
  end
end
