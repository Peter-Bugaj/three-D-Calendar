/**
  * web_GL_calendar init
**/
var calendar_renderer;
function web_GL_calendar_init() {
	calendar_renderer = new CalendarRenderer();
	window.onload = calendar_renderer.webGLStart();
}