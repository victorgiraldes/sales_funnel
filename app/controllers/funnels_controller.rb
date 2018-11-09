class FunnelsController < ApplicationController
  helper_method :sales, :stages

  private

  def sales
    @sales ||= Sale.order(created_at: :desc)
  end

  def stages
    I18n.translate(:stages, scope: [:activerecord, :attributes, :sale])
  end
end
