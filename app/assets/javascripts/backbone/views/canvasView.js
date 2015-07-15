var app = app || {};
app.CanvasView = Backbone.View.extend({
	el: ,
	events: {},
	initialize: function(){
		$(window).on('resize',this.resizeSVG);
	},
	resizeSVG: function(){
		
	}

});