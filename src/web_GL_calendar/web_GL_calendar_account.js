/**
  * web_GL_calendar_account init
**/
function web_GL_calendar_account_init(){
	$('#web-GL-calendar-account-menu').toggle(function() {
		$(this).stop().animate({
			width: 500 + "px",
			height: 350 + "px",
			borderBottomLeftRadius: 65 + "px",
			borderBottomRightRadius: 25 + "px",
			borderTopRightRadius: 25 + "px",
			borderTopLeftRadius: 25 + "px",
		}, 120);
	}, function() {
		$(this).stop().animate({
			width: 40 + "px",
			height: 40 + "px",
			borderBottomLeftRadius: 35 + "px",
			borderBottomRightRadius: 5 + "px",
			borderTopRightRadius: 5 + "px",
			borderTopLeftRadius: 5 + "px",
		}, 300);
	});
}