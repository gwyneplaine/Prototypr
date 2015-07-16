class ImageController < ApplicationController
	def index

	end

	def create
		binding.pry
		# raise 
		imfFile = params[:file]
		if imgFile
			cloudObj = Cloudinary::Uploader.upload[imgFile.path]
			@image = cloudObk['url']
		end
		respond_to do |format|
			format.html {}
			format.json {render json: @image}
		end
	end

	def new 
	end

	def show
	end

	def update
	end

	def edit 
	end

	# private
	# def image_params 
	# 	require(:image).params()
	# end
end
