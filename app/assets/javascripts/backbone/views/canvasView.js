var app = app || {};
app.CanvasView = Backbone.View.extend({
	el: '#main',
	events: {'click #pt-canvas': 'mapClicks'},
	initialize: function(){
		app.prototypr.initialize(winW,winH);
		$(window).on('resize',this.resizeSVG);
	},
	resizeSVG: function(){
		var winW = $(window).innerWidth();
		var winH = $(window).innerHeight();
		app.prototypr.resizeCanv(winW,winH);
	},
	mapClicks: function(e){
		console.log("this was clicked");
		// console.log(e);
		e.stopImmediatePropagation();
		// console.log(e.clientX);
		// console.log(e.clientY);
		console.log(e.offsetX + ", " + e.offsetY);
		app.prototypr.plotPoints(e.offsetX, e.offsetY);
	},
	render: function(){
		var svgCanvTemplate = $('#CanvasViewTemplate').html();
		this.$el.append(svgCanvTemplate);
	}

});