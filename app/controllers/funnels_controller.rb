class FunnelsController < ApplicationController
  helper_method :sales

  private

  def sales
    @sales ||= Sale.order(created_at: :desc)
  end
end
