class SalesController < ApplicationController
  helper_method :sale

  def create
    sale = Sale.create_with_progression(sale_params)

    if sale.persisted?
      redirect_to funnel_path
    else
      flash.now[:alert] = "Venda não foi salva"
      render :new
    end
  end

  def update
    if sale.progress_to(stage)
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

  def stage
    params.require(:sale).require(:stage)
  end
end
