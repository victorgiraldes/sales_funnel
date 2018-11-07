class SalesController < ApplicationController
  helper_method :sale

  def create
    new_sale = Sale.new(sale_params)

    if new_sale.save
      redirect_to funnel_path
    else
      flash.now[:alert] = "Venda não foi salva"
      render :new
    end
  end

  def update
    if sale.update(stage_params)
      redirect_to funnel_path
    else
      flash.now[:alert] = "Venda não foi atualizada"
      render :edit
    end
  end

  private

  def sale
    @sale ||= Sale.find(params[:id])
  end

  def sale_params
    params.require(:sale).permit(:product, :customer, :amount)
  end

  def stage_params
    params.require(:sale).permit(:stage)
  end
end
