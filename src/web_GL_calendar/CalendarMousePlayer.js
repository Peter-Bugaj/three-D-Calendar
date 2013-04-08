CalendarMousePlayer = new Object();

CalendarMousePlayer.handleMouseDown = function (event) {
	CalendarMousePlayer.mouseDown = true;
	CalendarMousePlayer.lastMouseX = event.clientX;
}

CalendarMousePlayer.handleMouseUp = function (event) {
	CalendarMousePlayer.mouseDown = false;
}	

CalendarMousePlayer.handleMouseMove = function (event) {
	if (!CalendarMousePlayer.mouseDown) {
		return;
	}
	var newX = event.clientX;
	var deltaX = newX - CalendarMousePlayer.lastMouseX
	CalendarMousePlayer.mouseMoveOffset += deltaX;
	CalendarMousePlayer.lastMouseX = newX;
	
	CalendarMousePlayer.calendar.calendarRedraw(0);
}

CalendarMousePlayer.mouseDown = false;
CalendarMousePlayer.lastMouseX = null;
CalendarMousePlayer.mouseMoveOffset = 0;