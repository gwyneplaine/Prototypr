class ImageController < ApplicationController
	def index

	end

	def create
		# if params[:file].present?
		# 	preloaded = Cloudinary::PreloadedFile.new(params[:file].path)         
		# 	raise "Invalid upload signature" if !preloaded.valid?
		# 	render :json => preloaded
		# else
		# 	render :json => "NOPE"
		# end
		# raise 
		imgFile = params[:file]
		if imgFile
			cloudObj = Cloudinary::Uploader.upload( imgFile.path )
			@image = cloudObj['url']
		end
		# binding.pry
		render json: cloudObj['url'], status: 200
		# respond_to do |format|
		# 	format.html {}
		# 	format.json {render json: cloudObj}
		# end
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
