var app = app || {};

// ALL EXTERNAL EVENT LISTENERS FOR THIS APPLICATION GO HERE
app.eventListener = function(){
	//THIS SHOULD BE AN EVENT LISTENER IN BACKBONE, FOR THE INTERFACE VIEW
	$('body').on('click','.tool',function(){
		// console.log($(this).attr('id'));
		var $toolId = $(this).attr('id');

		if($toolId == "pen"){
			$(app.$drawingInterface).addClass('expanded');
		} else if($toolId == "selector"){
			$(app.$drawingInterface).removeClass('expanded');
		} else if($toolId == 'clear'){
			$('polygon').remove();
			app.prototypr.polygons = {};
		} else if($toolId == 'addImg'){
			$('.formWrapper').removeClass('hidden');
		} else if($toolId == 'save'){
			// app.prototypr.save();
		}

		if( $toolId !== "moveUp" && $toolId !== "moveDown" ){
			app.prototypr.selectTool($toolId);
			$('.tool').removeClass('selected');
			$(this).addClass('selected');
			app.prototypr.selectedPolygon = {};
		}

	});

	$('body').on('click','.backDrop',function(){
		$('.formWrapper').addClass('hidden');
	});

	$('body').on('click','#moveUp', function(){
		app.prototypr.moveUp('.shard.selected');
	});

	$('body').on('click','#moveDown', function(){
		app.prototypr.moveDown('.shard.selected');
	});

	$('body').on('change','.upload-field', function(e){
		$(this).closest('.upload-button').addClass('active');
		$('.upload-submit').addClass('prompt-user');
	});

}

$(document).ready(function(){

	$('#currentColor').css('background', app.prototypr.color);
	$('#currentStroke').css('border-color', app.prototypr.stroke);
	$('form').bind('ajax:success ajax:error', function(evt, data, status, xhr){
		app.prototypr.addImage(data.responseText);
		$('.formWrapper').addClass('hidden');
	});

	app.winW = $(window).innerWidth();
	app.winH = $(window).innerHeight();
	var testPath = "http://www.fillmurray.com/1200/800";
	app.prototypr.addImage(testPath);
	app.prototypr.initialize(app.winW,app.winH);

	$(window).on('resize', function(e){
		app.winW = $(window).innerWidth();
		app.winH = $(window).innerHeight();
		app.prototypr.resizeCanv(app.winW,app.winH);
	});

	$(window).on('scroll',function(e){
		var currentPos = $(window).scrollTop();
		var navH = $("nav").height();
		if(currentPos >= navH){
			$('.drawingInterface').addClass('appendTop');
		}else{
			$('.drawingInterface').removeClass('appendTop');
		}
	});

	$('svg').on('click',function(e){
		e.stopImmediatePropagation();
		app.prototypr.ptInterface(e.offsetX, e.offsetY);
	});

	app.cooler.init(0);

	var $colors = $('.color');
	$colors.each(function(i, color){
		var colorVal = $(this).attr('data-id');
		$(this).css('background-color', colorVal);
	});

	app.prototypr.selectColor();

	$('#removeImg').on('click', function(){
		app.prototypr.removeImage();
	});

	app.$drawingInterface = $('.drawingInterface');

	$('body').on('click','#currentColor',function(e){
		$('.colorPalette').removeClass('active');
		$('.drawingInterface').toggleClass('expanded');
		$(this).addClass('active');
	});

	$('body').on('click','#currentStroke',function(){
		$('.drawingInterface').toggleClass('expanded');
		$('.colorPalette').removeClass('active');
		$(this).addClass('active');
	});

	app.eventListener();

	// $('#file_form').on('submit', function(e){
	// 	e.preventDefault();
	// 	var $path = $('#file_field').val();
	// 	$.ajax({
	// 		method: "POST",
	// 		url: "/images/create",
	// 		data: {file: $path }
	// 	})
	// });
});
