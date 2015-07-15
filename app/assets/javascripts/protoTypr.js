var app = app || {};
app.svgns = "http://www.w3.org/2000/svg";
app.cooler = {
	colors: [],
	init: function(colorCap){
		var counter = 0;
		var n = 500000;

		for( var i = 16000000; i >= colorCap; i -= n){
			console.log(n);
			if(counter == 10){
				counter = 0;
				n -= 1000;
			}
	  		var hex = Number(i).toString(16);
	 		hex = "000000".substr(0, 6 - hex.length) + hex; 
	 		hex = "#"+hex;
	 		console.log(i);
	 		console.log(hex);
			// var num = 0xFFFFFFFF + num + 1;
			// var hex = i.toString(16);
			this.colors.push(hex);
			counter++;
		}
		console.log(this.colors);
		this.genPalette(this.colors);
	},
	genPalette: function(array){
		for(var i=0; i<array.length;i++){
			$(".colorPicker").append("<div data-id='"+ array[i] +"' class='color'></div>");
		}
	}
}
app.prototypr = {
	clickCounter:0,
	offsetX: -5,
	offsetY: 5,
	pos:[],
	sides:3,
	polygonCount:0,
	color: "#faa",
	strokeWidth: 2,
	stroke: "#000",
	strokeOpacity: 0.4,

	addImage: function(imgPath){
		// ADD IMAGE BASED ON SPECIFIED URL PATH TO THE BACKGROUND OF THE DIV IN QUESTION;
		$('.wrapper').css('background-image',"url("+imgPath+")");

	},
	removeImage:function(){
		// CHECK IF THERE IS CURRENTLY A BACKGROUND IMAGE, IF SO THEN REMOVE IT, IF NOT, LEAVE IT ALONE. 
		if($('.wrapper').css('background-image') == "none"){
			return "";
		}else{
			$('.wrapper').css('background-image', "");
		}
	},

	initialize:function(width,height){
		app.paper = Snap('#pt-canvas');
		// app.paper = Snap(100,200);
		this.resizeCanv(width,height);
		console.log(app.paper.node);
		// app.paper.node.id = "pt-canvas";
		$('body').addClass('rmScroll');
	},

	helper: function(x,y,r){
		var radius = 10;
		console.log(r);
		if(r !== undefined){
			radius = r;
		}; 


		var pointerguide = app.paper.circle(x + this.offsetX, y + this.offsetY, radius);
		pointerguide.attr({
			fill: this.color
		});
		pointerguide.addClass("guide");
	},

	resizeCanv: function(width, height){
		$('#pt-canvas').attr('width',width).attr('height',height);
	},

	plotPoints: function(x,y){
		// var offsetX = -8;
		// var offsetY = -8;
		//push co-ordinates to the pos array everytime this function is called;
		// this.pos.push(x);
		// this.pos.push(y);
		console.log(this.offsetX);
		this.pos.push(x + this.offsetX);
		console.log(this.pos);
		this.pos.push(y + this.offsetY);
		this.helper(x,y);
		this.clickCounter++;
		
		if(this.clickCounter === this.sides){
			//increment the polygonCount everytime a new polygon is created
			this.polygonCreator(this.pos);			
			// p = app.paper.polygon(this.pos);
			// console.log(p);
			// p.addClass("shard");
			// p.node.id = 'shard'+this.polygonCount;
			this.clickCounter = 0;
			this.pos = [];
			$('.guide').remove();
		}
	}, 

	polygonCreator: function(posArray){
		p = app.paper.polygon(posArray);
		p.addClass("shard");
		p.node.id = 'shard'+this.polygonCount;
		p.attr({
			fill: this.color,
			strokeWidth: this.strokeWidth,
			stroke: this.stroke,
			strokeOpacity: this.strokeOpacity
		});
		this.polygonCount++;
	}
}
$(document).ready(function(){
	var winW = $(window).innerWidth();
	var winH = $(window).innerHeight();
	var testPath = "http://www.fillmurray.com/1200/800";
	app.prototypr.addImage(testPath);
	// $('#drawableCanv').width(winW).height(winH);
	// var paper = Snap('#drawableCanv');
	app.prototypr.initialize(winW,winH);
	$(window).on('resize', function(e){
		var winW = $(window).innerWidth();
		var winH = $(window).innerHeight();
		app.prototypr.resizeCanv(winW,winH);
	});
	$(window).on('scroll',function(e){
		var currentPos = $(window).scrollTop();
		var navH = $("nav").height();
		if(currentPos >= navH){
			$('.drawingInterface').addClass('appendTop');
		}else{
			$('.drawingInterface').removeClass('appendTop');
		}
	})
	$('svg').on('click',function(e){
		console.log("this was clicked");
		// console.log(e);
		e.stopImmediatePropagation();
		// console.log(e.clientX);
		// console.log(e.clientY);
		app.prototypr.plotPoints(e.clientX, e.clientY);
	});
	app.cooler.init(0);
	var $colors = $('.color');
	$colors.each(function(i, color){
		var colorVal = $(this).attr('data-id');
		$(this).css('background-color', colorVal);
	});
	$('.expander').on('click',function(e){
		$(this).toggleClass('active');
		$(this).siblings('.colorPicker').toggleClass('expanded');
	})
	$colors.on('click', function(e){
		app.prototypr.color = $(this).attr('data-id');
		$colors.removeClass('selected');
		$(this).addClass('selected');
		$('.expander').css('background-color', app.prototypr.color);
	});

	$('#removeImg').on('click', function(){
		app.prototypr.removeImage();
	});
});