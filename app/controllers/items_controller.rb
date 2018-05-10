class ItemsController < ApplicationController
  def index
  end

  def create
    @item = Item.new(item_params)

    if @item.save(item_params)
      render :show, status: :created, location: @item
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end


  private

  def item_params
    # Add :picture as a permitted parameter
    params.require(:item).permit(:picture) 
  end
end
