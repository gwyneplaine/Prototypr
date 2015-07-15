var app = app || {};
app.svgns = "http://www.w3.org/2000/svg";
app.prototypr = {
	clickCounter:0,
	pos:[],
	addImage: function(){

	},
	removeImage: function(){

	},
	sides:3,
	polygonCount:0,
	initialize:function(){
		app.paper = Snap('#pt-canvas');

		console.log(app.paper.node);
		// THIS IS A WAY OF CREATING THE SNAP OBJECT AND GIVING IT AN ID. 

		// app.paper = Snap(100,200);
		// app.paper.node.id = "canvas";
	},
	resize: function(width, height){
		// THIS FUNCTION IS FOR RESIZING THE SVG/SNAP OBJECT
		$('#pt-canvas').attr('width',width).attr('height',height);
	},
	plotPoints: function(x,y){
		// THIS FUNCTION IS FOR KEEPING TRACK OF PLOTTED POINTS
		var offsetX = -8;
		var offsetY = -8;
		//push co-ordinates to the pos array everytime this function is called;
		this.pos.push(x+offsetY);
		this.pos.push(y+offsetX);
		this.clickCounter++;
		
		if(this.clickCounter === this.sides){
			//increment the polygonCount everytime a new polygon is created
			this.polygonCount++;
			p = app.paper.polygon(this.pos);
			p.attr('class',"shard"+this.polygonCount);
			this.clickCounter = 0;
			this.pos = [];
		}
	}, 
	initAttr: function(fill, stroke, strokeOpacity, strokeWidth){
		strokeOpacity = typeof strokeOpacity !== 'undefined' ? strokeOpacity : 1;
		strokeWidth = typeof strokeOpacity !== 'undefined' ? strokeWidth : 1;
	}
}
$(document).ready(function(){
	var winW = $(window).innerWidth();
	var winH = $(window).innerHeight();
	// $('#drawableCanv').width(winW).height(winH);
	// var paper = Snap('#drawableCanv');
	app.prototypr.initialize();
	app.prototypr.resize(winW,winH)
	$(window).on('resize',function(e){
		app.prototypr.resize(winW,winH);
	});

	$('svg').on('click',function(e){
		app.prototypr.plotPoints(e.clientX, e.clientY);
	});
});


	// debugger;
	// var svgns = "http://www.w3.org/2000/svg";
	// var drawTriangle = function(){
	// 	shape = document.createElementNS(svgns, "polygon");
	// 	shape.setAttributeNS(svgns,"points","5,5 45,45 5,45");
	// 	shape.setAttributeNS(svgns,"fill","black");
	// 	shape.setAttributeNS(svgns,"stroke","green");
		
	// 	// $(s).append(shape);
	// }
	// drawTriangle();