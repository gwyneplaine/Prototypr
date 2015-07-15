var app = app || {};
app.AppRouter = new Backbone.Router.extend({
	routes: {'index':'initializeApp'},
	initializeApp: function(){
		app.svgInit = new app.CanvasView();
		app.svgInit.render();
	}
})