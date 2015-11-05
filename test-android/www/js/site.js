app.initialize();

$(".step").click(function(){

	switch($(this).data('go')){
		case 'bienvenida':
			$('#back-button').data('go','salir');
			$('.seccion').fadeOut(500);
			$('#back-button').hide();
			setTimeout(function(){
				$('#bienvenida').fadeIn(300);
				$('.logo').removeClass('blur');
			}, 500);
		break;


		case 'empezar':
			$('.seccion').fadeOut(500);
			$('#back-button').data('go','bienvenida');//Ir al anterior
			setTimeout(function(){
				$('#back-button').fadeIn();
				$('.logo').addClass('blur');
				$('#empezar').fadeIn(300);
				$('#empezar .row').addClass('blur');
				$('#empezar .btn-conteiner').addClass('blur');
				$('#empezar .full-alert').show();
			}, 500);
			setTimeout(function(){
				$('#empezar .full-alert').fadeOut();
				$('.logo').removeClass('blur');
				$('#empezar .row').removeClass('blur');
				$('#empezar .btn-conteiner').removeClass('blur');
			}, 3000);
		break;

		case 'amb':
			$('.seccion').fadeOut(500);
			$('#amb .full-alert').fadeIn();
			$('#amb-options').hide();
			$('#back-button').data('go','empezar');//Ir al anterior
			$('#amb-options .play').data('go','recorrido');
			setTimeout(function(){
				$('#amb').fadeIn(300);
				$('.logo').addClass('blur');
				$('#amb .row').addClass('blur');
			}, 500);
			setTimeout(function(){
				$('#amb .full-alert').fadeOut();
				$('.logo').removeClass('blur');
				$('#amb .row').removeClass('blur');
			}, 3000);
		break;

		case 'close-option':
			$('#back-button').data('go','empezar');//Ir al anterior
			$('.logo').removeClass('blur');
			$('#amb .row').removeClass('blur');
			$('#amb-options').fadeOut();
		break;

		case 'bosque':
		case 'playa':
		case 'oceano':
		case 'universo':
			$('#back-button').data('go','close-option');//Ir al anterior
			$('#amb-options').fadeIn(300);
			$('.logo').addClass('blur');
			$('#amb .row').addClass('blur');
			$('#amb-options .row').removeClass('blur');
		break;

		case 'recorrido':
			var luz = $('#amb-options .opt-luz').data('option');
			var sonido = $('#amb-options .opt-sonido').data('option');
			var aroma = $('#amb-options .opt-aroma').data('option');

			if(luz == 0 && sonido == 0 && aroma == 0)
			{
				alert('Debe seleccionar una característica al menos');
				return false;
			}

			$('.seccion').fadeOut(500);
			initializeTimer();
			$('#pause').parent('a').data('go','');
			$("#timer").data('inicio',0)
			$('#pause').show().html('Deslice el dedo para comenzar el recorrido').removeClass('circle pause step').addClass('btn-primary');
			$('#back-button').data('go','parar');//Ir al anterior
			setTimeout(function(){
				$('#recorrido').fadeIn(300);
				$('.logo').removeClass('blur');
				$('#recorrido .row').removeClass('blur');
			}, 500);
		break;
		
		case 'pause':
			timer(1);
			$('#back-button').data('go','retomar');//Ir al anterior
			$('#amb-options .play').data('go','retomar');
			$('#amb-options').fadeIn(300);
			$('.logo').addClass('blur');
			$('#recorrido .row').addClass('blur');
			$('#recorrido .pause').hide();
			$('.drag').css("-webkit-animation-play-state", "paused");
			$('.drag').css("animation-play-state", "paused");
		break;

		case 'retomar':
			var luz = $('#amb-options .opt-luz').data('option');
			var sonido = $('#amb-options .opt-sonido').data('option');
			var aroma = $('#amb-options .opt-aroma').data('option');

			if(luz == 0 && sonido == 0 && aroma == 0)
			{
				alert('Debe seleccionar una característica al menos');
				return false;
			}

			$('.drag').css("-webkit-animation-play-state", "running");
			$('.drag').css("animation-play-state", "running");

			timer(0);
			$('#back-button').data('go','parar');//Ir al anterior
			$('#amb-options').fadeOut(300);
			$('.logo').removeClass('blur');
			$('#recorrido .row').removeClass('blur');
			$('#recorrido .pause').fadeIn(200);
		break;

		case 'parar':
			if(confirm("¿Realmente quiere salir de esta sesión?"))
			{
				timer(1);
				$('#back-button').data('go','finalizar').click();//Ir al anterior
			}
			else
			{
				return false;
			}
		break;

		case 'finalizar':
			$('.drag').css("-webkit-animation-play-state", "paused");
			$('.drag').css("animation-play-state", "paused");
			$(".estrella").children('span').removeClass('glyphicon-star').addClass('glyphicon-star-empty').removeAttr("style");
			$("#finalizar .okay").parent().children('h4').show();
			$("#finalizar .okay").hide();
			$('#back-button').hide();
			$('#finalizar').fadeIn(300);
			$('.logo').addClass('blur');
			$('#recorrido .row').addClass('blur');
			$('#recorrido .pause').hide();
			clearInterval(animationsInterval);
		break;
	}
});

//$(".drag").click(function(){
function iniciar(){
	if ($("#timer").data('inicio') == 0)
	{
		timer(0);

		$('#recorrido .btn-primary').fadeOut(200);

		$('#pause').parent('a').data('go','pause');

		setTimeout(function(){
			$('#recorrido .btn-primary').empty().addClass('circle pause').removeClass('btn-primary').fadeIn(200);
		}, 200);
		
		//Limpio el intervalo si es que ya existe
		clearInterval(animationsInterval);

		//Inicio las animaciones de la linea
		cicloAnimaciones();

		var animationsInterval = setInterval(function(){
			//Cuando termina el ciclo de animaciones la vuelvo a iniciar
			cicloAnimaciones();
		}, 61000);
	}
}
//});

function timer(action){
	if(action == 0 && $("#timer").data('inicio') != 1)
	{
		if( $("#timer").data('inicio') == 0)
		{
			var hs  = $("#horas").val();
			var min = $("#min").val();
			var	aSeg = ((hs * 60) + parseInt(min)) * 60;
		}	
		else if ( $("#timer").data('inicio') == 2)
		{
			var aSeg = $("#timer").data('segundos');
		}

		$("#timer").data('inicio',1);

		var timerValueMin = Math.floor(aSeg/60);
		var timerValueSec = aSeg-Math.floor(aSeg/60)*60;

		if(timerValueSec.toString().length == 1 || timerValueSec == 0) timerValueSec = "0" + timerValueSec;

		var timerValue = timerValueMin + ":" + timerValueSec;

		$("#timer").html(timerValue);

		inicio = setInterval(function(){
			if(aSeg == 0)
			{
				clearInterval(inicio);
				$('#back-button').data('go','finalizar').click();//Terminar la sesion
			}
			else
			{
				aSeg = aSeg - 1;

				var timerValueMin = Math.floor(aSeg/60);
				var timerValueSec = aSeg-Math.floor(aSeg/60)*60;

				if(timerValueSec.toString().length == 1 || timerValueSec == 0) timerValueSec = "0" + timerValueSec;

				var newTimerValue = timerValueMin + ":" + timerValueSec;

				$("#timer").html(newTimerValue);

				$("#timer").data('segundos',aSeg);
			}
		}, 1000);
	}
	else
	{
		$("#timer").data('inicio',2);
		clearInterval(inicio);
	}
}

function initializeTimer(){
	var hs  = $("#horas").val();
	var min = $("#min").val();
	var	aSeg = ((hs * 60) + parseInt(min)) * 60;
	var timerValueMin = Math.floor(aSeg/60);
	var timerValueSec = aSeg-Math.floor(aSeg/60)*60;

	if(timerValueSec.toString().length == 1 || timerValueSec == 0) timerValueSec = "0" + timerValueSec;

	var timerValue = timerValueMin + ":" + timerValueSec;

	$("#timer").html(timerValue);
}

$(".estrella").click(function(){
	var punto = $(this).data('punto');

	for(i=1;i<=punto;i++){
		$("#est-"+i).children('span').removeClass('glyphicon-star-empty').addClass('glyphicon-star').stop().css({"color":'#FFF'},200);
	}

	$("#finalizar .okay").parent().children('h4').hide();
	$("#finalizar .okay").fadeIn(300);

	setTimeout(function(){
		$('#back-button').data('go','bienvenida').click();
	}, 1000);
});

$(".amb a").click(function(){
	var contenedor  = $(this).children("img");
	var anchoImagen = $(contenedor).width();
	var altoImagen  = $(contenedor).height();
	var anchoNuevo  = parseInt(anchoImagen) + 20;
	var altoNuevo   = parseInt(altoImagen) + 20;

	$(contenedor).css({'position':"absolute",'z-index':"100"});
	$(contenedor).stop().animate({'width':anchoNuevo,'height':altoNuevo,'left':"-10%",top:'-10%'}, 300).animate({'width':anchoImagen,'height':altoImagen,'left':"0",top:'0'}, 300);

	setTimeout(function(){
		$(contenedor).removeAttr("style");
	}, 700);

});

$(".option").click(function() {
	var enlace = $(this).parent();
	var option = $(enlace).data('option');

	if(option == 1)
		$(enlace).data('option','0');
	else
		$(enlace).data('option','1');

	if($('.opt-sonido').data('option') == 0)
		$('#amb-options .form-sonidos').animate({opacity:0});
	else
		$('#amb-options .form-sonidos').animate({opacity:1});

	$(this).children('img.top').toggleClass("transparent");
});

$(".hs .btn-max").click(function(){
	val = $(this).parent().children(".form-control").val();
	if(val < 6)
	{
		val = parseInt(val) + 1;
		$(this).parent().children(".form-control").val(val);

		$(this).parent().children(".btn-min").attr('disabled',false)
	}
	else
	{
		$(this).attr('disabled',true);
	}
});


$(".hs .btn-min").click(function(){
	val = $(this).parent().children(".form-control").val();
	if(val > 1)
	{
		val = parseInt(val) - 1;
		$(this).parent().children(".form-control").val(val);

		$(this).parent().children(".btn-max").attr('disabled',false)
	}
	else
	{
		$(this).attr('disabled',true);
	}
});

$('.hs input').focusout(function(){
	var val = $(this).val();

	if(val > 6)
		$(this).val(6);
	else if(val < 1)
		$(this).val(1);
	else if($.isNumeric(val) == false)
		$(this).val(1);
	else if(val == null || val == '')
		$(this).val(1);


	if(val < 6)
		$(this).parent().children(".btn-max").attr('disabled',false);
	if(val > 1)
		$(this).parent().children(".btn-min").attr('disabled',false);
});

$(".min .btn-max").click(function(){
	val = $(this).parent().children(".form-control").val();
	if(val == 0)
	{
		val = parseInt(val) + 30;
		$(this).parent().children(".form-control").val(val);

		$(this).parent().children(".btn-min").attr('disabled',false)
	}
	else if(val < 30 && val > 0)
	{
		$(this).parent().children(".form-control").val(30);

		$(this).parent().children(".btn-min").attr('disabled',false)
	}
	else
	{
		$(this).attr('disabled',true);
	}
});

$(".min .btn-min").click(function(){
	val = $(this).parent().children(".form-control").val();
	if(val == 30)
	{
		val = parseInt(val) - 30;
		$(this).parent().children(".form-control").val(val);

		$(this).parent().children(".btn-max").attr('disabled',false)
	}
	else if(val < 30 && val > 0)
	{
		$(this).parent().children(".form-control").val(0);

		$(this).parent().children(".btn-max").attr('disabled',false)
	}
	else
	{
		$(this).attr('disabled',true);
	}
});

$('.min input').focusout(function(){
	var val = $(this).val();
	if(val > 30)
		$(this).val(30);
	else if(val < 30 && val > 0)
		$(this).val(30);
	else if(val < 0)
		$(this).val(0);
	else if($.isNumeric(val) == false)
		$(this).val(0);
	else if(val == null || val == '')
		$(this).val(0);


	if(val < 30)
		$(this).parent().children(".btn-max").attr('disabled',false);
	if(val > 0)
		$(this).parent().children(".btn-min").attr('disabled',false);
});

$(window).load(function(){

	//Tamaño original 449x685
	
	if($(window).width() > 1000)
	{
		var altoLogo = 150;
	}
	else if($(window).width() <= 610)
	{
		var altoLogo = 200;
	}
	else
	{
		var altoLogo = 270;
	}

	setTimeout(function(){
		$('.logo').addClass( "logo-cargado" );
		$('.logo').stop().animate({"height":altoLogo},300);
		$('.logo div').stop().animate({"height":altoLogo},300);
		$('.logo').removeClass( "logo-inicial" );
		
	}, 1000);
	setTimeout(function(){
		$('.oculto').fadeIn('slow');
	}, 1300);
});

fullAlert();
//btnTop();

$(window).resize(function(){
	fullAlert();
	ajustarLogo();
});

function ajustarLogo(){
	if($(window).width() > 1000)
		var anchoLogo = 150;
	else
		var anchoLogo = 270;

	$('.logo').stop().animate({"height":anchoLogo},300);
	$('.logo div').stop().animate({"height":anchoLogo},300);
}

function fullAlert(){
	$('.full-alert').css({
		height: $(window).height()
	});
}

function btnTop(){
	var newTop = $(window).height();
		newTop = parseInt(newTop) - ( (parseInt(newTop) * 15) / 100 );

		console.log(newTop);
	$('.btn-conteiner').css({top:newTop});
}

$(function($){
	$('.drag').drag(function( ev, dd ){

		iniciar();

		$('.drag').css("-webkit-animation-play-state", "running");
		$('.drag').css("animation-play-state", "running");
		
		var topContainer = Math.round($('.drag-conteiner').offset().top);
		var maxTop = $('.drag-conteiner').height() - $('.drag').height(); 
		var minTop = 0;

		dd.offsetY = dd.offsetY - topContainer;

		if(dd.offsetY > maxTop)
			totalTop = maxTop;
		else if(dd.offsetY < minTop)
			totalTop = minTop;
		else
			totalTop = dd.offsetY;

		$( this ).css({
			top: totalTop,
			width: dd.offsetX,
		});
	});
});

function cicloAnimaciones() {
	if ($("#timer").data('inicio') == 1)
	{
		setTimeout(function(){
			$('.drag-conteiner .animaciones').fadeIn();
			$('.drag-conteiner .animaciones img').css({'margin-left':'0'});
			$('.drag-conteiner .animaciones img').attr("src","img/pez1.gif");
			$('.drag-conteiner .animaciones img').animate({'margin-left':'120%'}, 10000);
		}, 3000);

		setTimeout(function(){
			$('.drag-conteiner .animaciones').fadeOut();
		}, 13000);

		setTimeout(function(){
			$('.drag-conteiner .animaciones').fadeIn();
			$('.drag-conteiner .animaciones img').css({'margin-left':'40%'});
			$('.drag-conteiner .animaciones img').attr("src","img/octopus.gif");
			$('.drag-conteiner .animaciones img').animate({'margin-left':'-20%'}, 10000);
		}, 14000);

		setTimeout(function(){
			$('.drag-conteiner .animaciones').fadeOut();
		}, 24000);

		setTimeout(function(){
			$('.drag-conteiner .animaciones').fadeIn();
			$('.drag-conteiner .animaciones img').css({'margin-left':'100%'});
			$('.drag-conteiner .animaciones img').attr("src","img/delfin.gif");
			$('.drag-conteiner .animaciones img').animate({'margin-left':'-20%'}, 20000);
		}, 25000);

		setTimeout(function(){
			$('.drag-conteiner .animaciones').fadeOut();
		}, 45000);


		setTimeout(function(){
			$('.drag-conteiner .animaciones').fadeIn();
			$('.drag-conteiner .animaciones img').css({'margin-left':'-10%'});
			$('.drag-conteiner .animaciones img').attr("src","img/submarino.gif");
			$('.drag-conteiner .animaciones img').animate({'margin-left':'120%'}, 15000);
		}, 46000);

		setTimeout(function(){
			$('.drag-conteiner .animaciones').fadeOut();
		}, 61000);
	}
}


document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown() {

	var action = $('#back-button').data('go');

	if(action == 'salir'){
		navigator.app.exitApp();
	}
	else
	{
		$('#back-button').click();
	}
}