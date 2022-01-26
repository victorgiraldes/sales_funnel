source "https://rubygems.org"

gem "rails", "5.2.1"

gem "pg", "~> 1.0"
gem "puma", "~> 3.12"

gem "react-rails", "~> 2.4"
gem "webpacker", "~> 3.5"
gem 'mimemagic', github: 'mimemagicrb/mimemagic', ref: '01f92d86d15d85cfd0f20dabd025dcbd36a8a60f'

group :development do
  gem "listen", ">= 3.0.5", "< 3.2"
end

group :development, :test do
  gem "rspec-rails", "~> 3.8.1"
  gem "rubocop", "~> 0.60.0"
end

group :test do
  gem "shoulda-matchers", "4.0.0.rc1"
  gem "capybara", "~> 3.10.1"
  gem "factory_bot_rails", "~> 4.11"
  gem "selenium-webdriver", "~> 3.14"
  gem "chromedriver-helper", "~> 2.1"
  gem "database_cleaner", "~> 1.7"
  gem "capybara-screenshot", "~> 1.0"
  gem "simplecov", "~> 0.10"
end
