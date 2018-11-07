require "rails_helper"

RSpec.feature "Update sale stage" do
  given!(:sale) { create(:sale, stage: :follow_up) }

  background do
    visit "/"

    expect(page).to have_content "Product Customer 0 follow_up"
    click_link "Mudar de estágio"
  end

  scenario "allows only to progress sales" do
    select "contact", from: "sale_stage"
    click_button "Salvar"
    expect(page).to have_content "Venda não foi atualizada"

    select "closing", from: "sale_stage"
    click_button "Salvar"
    expect(page).to have_content "Product Customer 0 closing"
  end
end
