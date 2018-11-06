require "rails_helper"

RSpec.feature "Create sale" do
  background do
    visit "/"

    click_link "Criar nova venda"
  end

  scenario "when values are valid" do
    fill_in "Produto", with: "Product"
    fill_in "Cliente", with: "Customer"
    fill_in "Valor", with: "1000"
    click_button "Salvar"

    expect(page).to have_content "Product Customer 1000 contact"
  end

  scenario "when values are invalid" do
    fill_in "Valor", with: "abc"
    click_button "Salvar"

    expect(page).to have_content "Venda não foi salva"
  end
end
