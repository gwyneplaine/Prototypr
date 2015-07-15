var app = app || {};
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
	});

	$('svg').on('click',function(e){
		console.log("this was clicked");
		// console.log(e);
		e.stopImmediatePropagation();
		// console.log(e.clientX);
		// console.log(e.clientY);
		console.log(e.offsetX + ", " + e.offsetY);
		app.prototypr.plotPoints(e.offsetX, e.offsetY);

		// $('#beginning').on('click', function(e){
		// 	e.stopImmediatePropagation();
		// 	console.log("help");
		// });
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
	});
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