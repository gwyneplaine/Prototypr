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
		_.each(array,function(hexcolor){
			$(".colorPicker").append("<div data-id='"+ hexcolor +"' class='color'></div>");
		})
		// for(var i=0; i<array.length;i++){
		// 	$(".colorPicker").append("<div data-id='"+ array[i] +"' class='color'></div>");
		// }
	}
}
app.prototypr = {
	clickCounter:0,
	currentTool:"pen",
	// offsetX: -5,
	// offsetY: 5,
	pos:[],
	sides:3,
	polygonCount:0,
	color: "#faa",
	strokeWidth: 2,
	stroke: "#000",
	strokeOpacity: 0.4,
	polygons: [],

	// *********************************************************************************************** //
	// THIS METHOD ADDS AN IMAGE BASED ON SPECIFIED URL PATH TO THE BACKGROUND OF THE DIV IN QUESTION; //
	// *********************************************************************************************** //
	addImage: function(imgPath){
		$('.wrapper').css('background-image',"url("+imgPath+")");
	},

	// ************************************************************************************************************ //
	// THIS FUNCTION CHECKS IF THERE IS CURRENTLY A BACKGROUND IMAGE, IF SO THEN REMOVE IT, IF NOT, LEAVE IT ALONE. //
	// ************************************************************************************************************ //
	removeImage:function(){
		 
		if($('.wrapper').css('background-image') == "none"){
			return "";
		}else{
			$('.wrapper').css('background-image', "");
		}
	},

	// ********************************************* //
	// THIS FUNCTION INITIALIZES THE SNAP SVG OBJECT //
	// ********************************************* //
	initialize:function(width,height){
		app.paper = Snap('#pt-canvas');
		// app.paper = Snap(100,200);
		this.resizeCanv(width,height);
		console.log(app.paper.node);
		// app.paper.node.id = "pt-canvas";
		$('body').addClass('rmScroll');
	},

	// ******************************************************************************************************************** //
	// THIS FUNCTION CREATES HELPER GUIDES TO KEEP A VISUAL HISTORY OF ALL COORDINATES TO BE PASSED INTO THE POLYGON OBJECT //
	// ******************************************************************************************************************** //
	helper: function(x,y,r){
		var radius = 3;
		console.log(r);
		if(r !== undefined){
			radius = r;
		}; 

		var pointerguide = app.paper.circle(x, y, radius);
		// var pointerguide = app.paper.circle(x + this.offsetX, y + this.offsetY, radius);
		pointerguide.attr({
			fill: this.color
		});
		pointerguide.addClass("guide");
		$guide = $('.guide');
		if($($guide).length === 1){
			$($guide).attr('id','beginning');
		}
	},

	// ***************************************************************************************** //
	// THIS FUNCTION RESIZES THE SVG ELEMENT TO THE HEIGHT AND WIDTH SPECIFIED IN THE PARAMETERS //
	// ***************************************************************************************** //
	resizeCanv: function(width, height){
		$('#pt-canvas').attr('width',width).attr('height',height);
	},

	ptInterface: function(x,y){
		if(this.currentTool == "selector"){
			this.selectPolygon();
		}
		else if(this.currentTool == "pen"){
			this.plotPoints(x, y);
		}
	},
	//SELECT A POLYGON TO MOVE AROUND AND DRAG//
	selectTool: function(tool){
		this.currentTool = tool;
		$(".guide").remove();
		this.pos = [];
	},
	selectPolygon: function(){
		$('.shard').on('click', function(){
			$('.shard').removeClass('selected');
			$(this).addClass('selected');
			console.log($(this));
		})
		if(this.polygons.length >= 1){
			_.each(this.polygons,function(polygon){
				polygon.drag();
			});
		}
	},
	changeOpacity:function(){

	},
	// ********************************************************************************************************* //
	// THIS FUNCTION RESIZES PLOTS THE POINTS AND STORES THEM INTO AN ARRAY TO BE PASSED INTO THE POLYGON OBJECT //
	// ********************************************************************************************************* //
	plotPoints: function(x,y){
		if(this.polygons.length >= 1){
			_.each(this.polygons,function(polygon){
				polygon.undrag();
			});
		}
		// var offsetX = -8;
		// var offsetY = -8;
		//push co-ordinates to the pos array everytime this function is called;
		// this.pos.push(x);
		// this.pos.push(y);
		// console.log(this.offsetX);
		var view = this;
		$('#beginning').on('click', function(e){
			console.log("beginning clicked");
			e.stopImmediatePropagation();
			view.polygonCreator(view.pos);	
			console.log(p);
				view.clickCounter = 0;
				view.pos = [];
				$('.guide').remove();
		});
		this.pos.push(x);
		this.pos.push(y);
		// this.pos.push(x + this.offsetX);
		// this.pos.push(y + this.offsetY);
		console.log(this.pos);
		this.helper(x,y);
		this.clickCounter++;
		
		// if(this.clickCounter == this.sides){

		// 	//increment the polygonCount everytime a new polygon is created
		// 	this.polygonCreator(this.pos);			
		// 	// p = app.paper.polygon(this.pos);
		// 	// console.log(p);
		// 	// p.addClass("shard");
		// 	// p.node.id = 'shard'+this.polygonCount;
		// 	this.clickCounter = 0;
		// 	this.pos = [];
		// 	$('.guide').remove();
		// }
	}, 

	plotPointsAlt:function(x,y){
		// if(x)
	},

	polygonCreator: function(posArray){

		console.log(this);
		p = app.paper.polygon(posArray);

		p.addClass("shard");
		p.node.id = 'shard'+this.polygonCount;
		p.attr({
			fill: this.color,
			fillOpacity: 0.4,
			strokeWidth: this.strokeWidth,
			stroke: this.stroke,
			strokeOpacity: this.strokeOpacity
		});
		
		//Push polygons to an array
		
		this.polygons.push(p);
		this.polygonCount++;
		// this.polygonCount++;
	}
}
