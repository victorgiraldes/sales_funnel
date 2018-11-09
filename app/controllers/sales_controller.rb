class SalesController < ApplicationController
  helper_method :sale

  def create
    sale = Sale.create_with_progression(sale_params)

    if sale.persisted?
      render json: sale_as_json
    else
      head :unprocessable_entity
    end
  end

  def update
    if sale.progress_to(stage)
      render json: sale_as_json
    else
      head :unprocessable_entity
    end
  end

  private

  def sale
    @sale ||= Sale.find(params[:id])
  end

  def sale_as_json
    sale.as_json(only: [:id, :product, :customer, :amount, :stage])
  end

  def sale_params
    params.require(:sale).permit(:product, :customer, :amount)
  end

  def stage
    params.require(:sale).require(:stage)
  end
end
