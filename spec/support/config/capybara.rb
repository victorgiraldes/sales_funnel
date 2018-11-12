require "capybara/rspec"
require "capybara-screenshot/rspec"

Capybara.register_driver :headless_chrome do |app|
  options = ::Selenium::WebDriver::Chrome::Options.new(
    args: %w[headless disable-gpu no-sandbox]
  )

  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.configure do |config|
  config.server_port = 3001
  config.app_host = "http://localhost:3001"
  config.javascript_driver = :headless_chrome
  config.server = :puma, { Silent: true }
end

Capybara::Screenshot.register_driver(:headless_chrome) do |driver, path|
  driver.browser.save_screenshot(path)
end

Capybara::Screenshot::RSpec.add_link_to_screenshot_for_failed_examples = false
Capybara::Screenshot.prune_strategy = :keep_last_run
