class SalesController < ApplicationController
  helper_method :sale

  def create
    new_sale = Sale.build(create_params)

    if new_sale.save
      redirect_to funnel_path
    else
      flash.now[:alert] = "Venda não foi salva"
      render :new
    end
  end

  def update
    if sale.update(update_params)
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

  def create_params
    params.require(:sale).permit(:product, :customer, :amount)
  end

  def update_params
    params.require(:sale).permit(:stage)
  end
end
