module ValidationHelper
  def validation_message_for(input_name)
    page.find("input[name=#{input_name}]").native.attribute("validationMessage")
  end
end
