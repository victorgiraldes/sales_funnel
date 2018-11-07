FactoryBot.define do
  factory :sale do
    product { "Product" }
    customer { "Customer" }
    amount { 0 }
    stage { :contact }
  end
end
