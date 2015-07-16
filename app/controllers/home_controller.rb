class HomeController < ApplicationController
  def index
  	@user = current_user
  	@image = Image.new
  end
end
