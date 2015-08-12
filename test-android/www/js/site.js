app.initialize();

$(".step").click(function(){
	var ir = $(this).data('go');
	
	switch(ir){
		case 'empezar':
			$('#bienvenida').fadeOut('slow');
			setTimeout(function(){
				$('#empezar').fadeIn('slow');
				$('.logo').addClass('blur');
			}, 300);
			setTimeout(function(){
				$('#empezar .full-alert').fadeOut();
				$('.logo').removeClass('blur');
				$('#empezar .row').removeClass('blur');
			}, 3000);
		break;

		case 'amb':
			$('#empezar').fadeOut('slow');
			setTimeout(function(){
				$('#amb').fadeIn('slow');
				$('.logo').addClass('blur');
			}, 300);
			setTimeout(function(){
				$('#amb .full-alert').fadeOut();
				$('.logo').removeClass('blur');
				$('#amb .row').removeClass('blur');
			}, 3000);
		break;
	}
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