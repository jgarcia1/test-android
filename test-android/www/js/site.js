app.initialize();

$(".step").click(function(){
	var ir = $(this).data('go');
	
	switch(ir){
		case 'bienvenida':
			$('.seccion').fadeOut(500);
			$('#back-button').hide;
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
				$('#empezar .full-alert').show();
			}, 500);
			setTimeout(function(){
				$('#empezar .full-alert').fadeOut();
				$('.logo').removeClass('blur');
				$('#empezar .row').removeClass('blur');
			}, 3000);
		break;

		case 'amb':
			$('.seccion').fadeOut(500);
			$('#amb .full-alert').fadeIn();
			$('#amb-options').hide();
			$('#back-button').data('go','empezar');//Ir al anterior
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

		case 'bosque':
		case 'playa':
		case 'oceano':
		case 'universo':
			$('#back-button').data('go','amb');//Ir al anterior
			$('#amb-options').fadeIn(300);
			$('.logo').addClass('blur');
			$('#amb .row').addClass('blur');
			$('#amb-options .row').removeClass('blur');
		break;

		case 'recorrido':
			var luz = $('#opt-luz').data('option');
			var sonido = $('#opt-sonido').data('option');
			var aroma = $('#opt-aroma').data('option');

			if(luz == 0 && sonido == 0 && aroma == 0)
			{
				alert('Debe seleccionar una característica al menos');
				return false;
			}

			$('.seccion').fadeOut(500);
			$('#amb .full-alert').fadeIn();
			$('#amb-options').hide();
			$('#back-button').data('go','empezar');//Ir al anterior
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
	}
});

$(".amb a").click(function(){
	var contenedor = $(this).children("img");
	var anchoImagen = $(contenedor).width();
	var anchoNuevo = parseInt(anchoImagen) + 20;

	$(contenedor).css({'position':"absolute",'z-index':"100"});
	$(contenedor).stop().animate({'width':anchoNuevo,'left':"-10%",top:'-10%'}, 300).animate({'width':anchoImagen,'left':"0",top:'0'}, 300);

	setTimeout(function(){
		$(contenedor).removeAttr("style");
	}, 600);

});

$(".option").click(function() {
	var enlace = $(this).parent();
	var option = $(enlace).data('option');

	if(option == 1)
		$(enlace).data('option','0');
	else
		$(enlace).data('option','1');

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
	setTimeout(function(){
		$('.logo').addClass( "logo-cargado" );
		$('.logo').animate({"height":200},300);
		$('.logo div').animate({"height":200},300);
		$('.logo').removeClass( "logo-inicial" );
		
	}, 1000);
	setTimeout(function(){
		$('.oculto').fadeIn('slow');
	}, 1300);
});

document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown() {
	navigator.app.exitApp();
}