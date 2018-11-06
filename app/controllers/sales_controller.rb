class SalesController < ApplicationController
  def create
    sale = Sale.build(sale_params)

    if sale.save
      redirect_to funnel_path
    else
      flash.now[:alert] = "Venda não foi salva"
      render :new
    end
  end

  private

  def sale_params
    params.require(:sale).permit(:product, :customer, :amount)
  end
end
