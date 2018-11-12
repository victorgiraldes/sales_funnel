require "rails_helper"

RSpec.feature "Update sale stage", :js do
  given!(:sale) { create(:sale, stage: :follow_up, product: "Sale to update") }

  background do
    visit "/"
  end

  scenario "allows only to progress sales" do
    contact_column    = page.find("#column-contact")
    follow_up_column  = page.find("#column-follow_up")
    closed_column     = page.find("#column-closed")
    lost_column       = page.find("#column-lost")

    card = page.find("#card-#{sale.id}")

    expect(follow_up_column).to have_content "Sale to update"

    card.drag_to(contact_column)
    expect(page).to have_content "Um negócio não pode retroceder no funil."
    expect(contact_column).not_to have_content "Sale to update"

    card.drag_to(closed_column)
    expect(closed_column).to have_content "Sale to update"
    expect(follow_up_column).not_to have_content "Sale to update"

    card.drag_to(follow_up_column)
    expect(page).to have_content "Um negócio não pode retroceder no funil."
    expect(follow_up_column).not_to have_content "Sale to update"

    card.drag_to(lost_column)
    expect(lost_column).to have_content "Sale to update"
    expect(closed_column).not_to have_content "Sale to update"
  end
end
