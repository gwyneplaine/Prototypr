var app = app || {};
app.svgns = "http://www.w3.org/2000/svg";

app.cooler = {
	colors: [],
	init: function(colorCap){
		var counter = 0;
		var n = 500000;

		for( var i = 16000000; i >= colorCap; i -= n){
			// console.log(n);
			if(counter == 10){
				counter = 0;
				n -= 1000;
			}
	  		var hex = Number(i).toString(16);
	 		hex = "000000".substr(0, 6 - hex.length) + hex;
	 		hex = "#"+hex;
			// 	console.log(i);
			// 	console.log(hex);
			// var num = 0xFFFFFFFF + num + 1;
			// var hex = i.toString(16);
			this.colors.push(hex);
			counter++;
		}
		// console.log(this.colors);
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
	pos:[],
	sides:3,
	polygonCount:0,
	color: "#faa",
	strokeWidth: 2,
	stroke: "#000",
	selectedPolygon: {},
	strokeOpacity: 0.4,
	polygons: {},
	tmpPolygons: {},
	// ********************************************* //
	// THIS FUNCTION INITIALIZES THE SNAP SVG OBJECT //
	// ********************************************* //
	initialize:function(width,height){
		app.paper = Snap('#pt-canvas');
		// app.paper = Snap(100,200);
		this.resizeCanv(width,height);
		// console.log(app.paper.node);
		// app.paper.node.id = "pt-canvas";
		$('body').addClass('rmScroll');
	},

	// ***************************************************************************************** //
	// THIS FUNCTION RESIZES THE SVG ELEMENT TO THE HEIGHT AND WIDTH SPECIFIED IN THE PARAMETERS //
	// ***************************************************************************************** //
	resizeCanv: function(width, height){
		$('#pt-canvas').attr('width',width).attr('height',height);
	},

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

	// ******************************************************************************************************************** //
	// THIS FUNCTION CREATES HELPER GUIDES TO KEEP A VISUAL HISTORY OF ALL COORDINATES TO BE PASSED INTO THE POLYGON OBJECT //
	// ******************************************************************************************************************** //
	helper: function(x,y,r){
		var radius = 3;
		// console.log(r);
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

	selectColor: function(){
		var $colors= $(".color");
		var $drawingInterface = $('.drawingInterface');
		// console.log($colors);
		$('body').on('click','.color', function(e){
			$('.color').removeClass('selected');
			$(this).addClass('selected');
			if($('#currentColor').hasClass('active')){
				app.prototypr.color = $(this).attr('data-id');
				$('#currentColor').css('background-color', app.prototypr.color);

			}else if($('#currentStroke').hasClass('active')){
				app.prototypr.stroke = $(this).attr('data-id');
				$('#currentStroke').css('border-color', app.prototypr.stroke);
			}
			if(app.prototypr.selectedPolygon){
				app.prototypr.selectedPolygon.attr({
					fill: app.prototypr.color,
					stroke: app.prototypr.stroke
				});
			}
				$($drawingInterface).toggleClass('expanded');
		});
	},
	ptInterface: function(x,y){
		if(this.currentTool == "selector"){
			this.selectPolygon();
		}
		else if(this.currentTool == "pen"){
			this.plotPoints(x, y);
		}
	},
	//SELECT TOOL//
	selectTool: function(tool){
		$('#opacity').addClass('hidden');
		$('.shard').off('click', this.polygonEdit);
		this.currentTool = tool;
		$('.shard.selected').attr('class','shard');
		$(".guide").remove();
		this.pos = [];

		// console.log("the length of this object is " + this.polygons.length)

		if(this.currentTool == "selector" && Object.keys(this.polygons).length >= 1) {
			_.each(this.polygons,function(polygon){
				polygon.drag();
			});
		} else {
			_.each(this.polygons,function(polygon){
				polygon.undrag();
			});
		}
	},
	polygonEdit: function(){
		$('.shard').attr('class','shard');
		$(this).attr('class','shard selected');
		app.$id=$(this).attr('id');
		app.prototypr.selectedPolygon = app.prototypr.polygons[app.$id];
		// console.log($(this));
		var view = this;

		// console.log($currentOpacity);
		$('#currentColor').css('background-color',app.prototypr.polygons[app.$id].attr().fill);
		$('#currentStroke').css('border-color', app.prototypr.polygons[app.$id].attr().stroke);
		app.prototypr.changeOpacity(this);
	},

	changeOpacity: function(el){
		var $currentOpacity = parseFloat($(el).css('fill-opacity'))*10;
		$('#opacity .slider').val($currentOpacity);
		$('#opacity .slider').on('change', function(e){
			var opacityVal = parseInt($(this).val())/ 10;
			app.prototypr.polygons[app.$id].attr({
				fillOpacity: opacityVal
			});
			// console.log(app.prototypr.polygons[$id]);
		});
	},
	selectPolygon: function(){
		$('#opacity').removeClass('hidden');
		$('.shard').on('click', this.polygonEdit);
	},

	// ********************************************************************************************************* //
	// THIS FUNCTION RESIZES PLOTS THE POINTS AND STORES THEM INTO AN ARRAY TO BE PASSED INTO THE POLYGON OBJECT //
	// ********************************************************************************************************* //
	plotPoints: function(x,y){
		var view = this;

		$('#beginning').on('click', function(e){
			// console.log("beginning clicked");
			e.stopImmediatePropagation();
			view.polygonCreator(view.pos);
			// console.log(p);
				view.clickCounter = 0;
				view.pos = [];
				$('.guide').remove();
		});
		this.pos.push(x);
		this.pos.push(y);

		// console.log(this.pos);
		this.helper(x,y);
		this.clickCounter++;
	},
	polygonCreator: function(posArray){

		// console.log(this);
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

		// this.polygons.push(p);
		this.polygons[p.node.id] = p;
		this.polygonCount++;
		// this.polygonCount++;
	},
	moveUp: function(element){
		app.$id = $(element).attr('id');
		app.$nextId = $(element).next().attr('id');
		if(app.$nextId){
			app.svgEl = app.prototypr.polygons[app.$id];
			app.svgNx = app.prototypr.polygons[app.$nextId];
			app.svgEl.insertAfter(app.svgNx);
		} else {
			return '';
		}


	},
	moveDown: function(element){
		app.$id = $(element).attr('id');
		app.$prevId = $(element).prev().attr('id');
		if(app.$prevId){
			app.svgEl = app.prototypr.polygons[app.$id];
			app.svgPrev = app.prototypr.polygons[app.$prevId];
			app.svgEl.insertBefore(app.svgPrev);
		}else{
			return '';
		}
	},
	// save: function(){
	// 	$("svg").attr({version: '1.1', xmlns: "http://www.w3.org/2000/svg"});
	// 	var svg = $('#pt-canvas');
	// 	var encoded = window.btoa(unescape(encodeURIComponent(svg)));
	// 	console.log(encoded);
	// 	$("body").append($("<img src='data:image/svg+xml;base64,\n"+encoded+"' alt='file.svg'/>"));
	//
	//
	// }
}
