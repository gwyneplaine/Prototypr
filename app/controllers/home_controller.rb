class HomeController < ApplicationController
  def index
  	@image = Image.new
  end
end
