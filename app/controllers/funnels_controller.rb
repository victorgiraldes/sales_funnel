class FunnelsController < ApplicationController
  helper_method :sales

  private

  def sales
    @sales ||= Sale.all
  end
end
