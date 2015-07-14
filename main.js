var app = app || {};
app.svgns = "http://www.w3.org/2000/svg";
app.prototyper = {
	clickCounter:0,
	pos:[],
	sides:3,
	polygonCount:0,
	initialize:function(width,height){
		app.paper = Snap('#canvas');
		// app.paper = Snap(100,200);
		$('#canvas').attr('width',width).attr('height',height);
		console.log(app.paper.node);
		app.paper.node.id = "canvas";
	},
	plotPoints: function(x,y){
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
}
$(document).ready(function(){
	var winW = $(window).innerWidth();
	var winH = $(window).innerHeight();
	// $('#drawableCanv').width(winW).height(winH);
	// var paper = Snap('#drawableCanv');
	app.prototyper.initialize(winW,winH);
	$('svg').on('click',function(e){
		app.prototyper.plotPoints(e.clientX, e.clientY);
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