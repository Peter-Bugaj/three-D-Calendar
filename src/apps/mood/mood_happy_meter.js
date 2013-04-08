/** 
  * Location: /php/apps/mood/mood_happy_meter.php
  * Description: The happy meter container
**/
var mood_happy_meter_main = "mood-happy-meter-main";

/** 
  * Location: /php/apps/mood/mood_happy_meter.php
  * Description: The happy meter measure bar
**/
var mood_happy_meter = "mood-happy-meter";

/** 
  * Location: /php/apps/mood/mood_happy_meter.php
  * Description: The happy meter fill bar
**/
var mood_happy_meter_fill = "mood-happy-meter-fill";

/** 
  * Location: /php/apps/mood/mood_happy_meter.php
  * Description: The happy meter scroller
**/
var mood_happy_meter_scroll = "mood-happy-meter-scroll";

var mood_main_width = 320;

/**
  * Initialize the css for mood_happy_meter
**/
function mood_happy_meter_run_css() {

	/**
	  * #mood-happy-meter-main css
	**/
	var e_mood_happy_meter_main = document.getElementById(mood_happy_meter_main);
	
	e_mood_happy_meter_main .style .display = 'inline';


	/**
	  * #mood-happy-meter css
	**/
	var e_mood_happy_meter = document.getElementById(mood_happy_meter);
		
	e_mood_happy_meter .style .background = "rgba(200, 218, 224, 0)";
	e_mood_happy_meter .style .display = "inline";
	e_mood_happy_meter .style .position = "absolute";
	e_mood_happy_meter .style .width = 40 + 'px';
	e_mood_happy_meter .style .height = 173 + 'px';
	e_mood_happy_meter .style .top = 90 + 'px';
	e_mood_happy_meter .style .right = 137 + 'px';
	e_mood_happy_meter .style .borderRadius = 10 + 'px';
	e_mood_happy_meter .style .zIndex = 50;
	
	/**
	  * #mood-happy-meter-fill css
	**/
	var e_mood_happy_meter_fill = document.getElementById(mood_happy_meter_fill);
	
	e_mood_happy_meter_fill .style .background = "rgba(51, 255, 0, 0)";
	e_mood_happy_meter_fill .style .display = "inline";
	e_mood_happy_meter_fill .style .position = "absolute";
	e_mood_happy_meter_fill .style .width = 40 + 'px';
	e_mood_happy_meter_fill .style .height = 98 + 'px';
	e_mood_happy_meter_fill .style .top = 165 + 'px';
	e_mood_happy_meter_fill .style .right = 137 + 'px';
	e_mood_happy_meter_fill .style .borderRadius = 10 + 'px';
	e_mood_happy_meter_fill .style .zIndex = 50;
	
	
	/**
	  * #mood-happy-meter-scroll css
	**/
	var e_mood_happy_meter_scroll = document.getElementById(mood_happy_meter_scroll);

	e_mood_happy_meter_scroll .style .background = "rgba(65, 75, 129, 0)";
	e_mood_happy_meter_scroll .style .position = "absolute";
	e_mood_happy_meter_scroll .style .zIndex = 50;
	e_mood_happy_meter_scroll .style .width = 70 + 'px';
	e_mood_happy_meter_scroll .style .height = 32 + 'px';
	e_mood_happy_meter_scroll .style .top = 150 + 'px';
	e_mood_happy_meter_scroll .style .right = 121 + 'px';
	e_mood_happy_meter_scroll .style .borderRadius = 21 + 'px';
}	


/**
  * mood_happy_meter init
**/
function mood_happy_meter_init() {
	mood_happy_meter_run_css();
}

function hookEvent(element, eventName, callback) {
  if(typeof(element) == "string")
    element = document.getElementById(element);
  if(element == null)
    return;
  if(element.addEventListener)
    element.addEventListener(eventName, callback, false);
  else if(element.attachEvent)
    element.attachEvent("on" + eventName, callback);
}

function unhookEvent(element, eventName, callback) {
  if(typeof(element) == "string")
    element = document.getElementById(element);
  if(element == null)
    return;
  if(element.removeEventListener)
    element.removeEventListener(eventName, callback, false);
  else if(element.detachEvent)
    element.detachEvent("on" + eventName, callback);
}

function cancelEvent(e) {
  e = e ? e : window.event;
  if(e.stopPropagation)
    e.stopPropagation();
  if(e.preventDefault)
    e.preventDefault();
  e.cancelBubble = true;
  e.cancel = true;
  e.returnValue = false;
  return false;
}

function Position(x, y) {
  this.X = x;
  this.Y = y;
  
  this.Add = function(val)
  {
    var newPos = new Position(this.X, this.Y);
    if(val != null)
    {
      if(!isNaN(val.X))
        newPos.X += val.X;
      if(!isNaN(val.Y))
        newPos.Y += val.Y
    }
    return newPos;
  }
  
  this.Subtract = function(val)
  {
    var newPos = new Position(this.X, this.Y);
    if(val != null)
    {
      if(!isNaN(val.X))
        newPos.X -= val.X;
      if(!isNaN(val.Y))
        newPos.Y -= val.Y
    }
    return newPos;
  }
  
  this.Min = function(val)
  {
    var newPos = new Position(this.X, this.Y)
    if(val == null)
      return newPos;
    
    if(!isNaN(val.X) && this.X > val.X)
      newPos.X = val.X;
    if(!isNaN(val.Y) && this.Y > val.Y)
      newPos.Y = val.Y;
    
    return newPos;  
  }
  
  this.Max = function(val)
  {
    var newPos = new Position(this.X, this.Y)
    if(val == null)
      return newPos;
    
    if(!isNaN(val.X) && this.X < val.X)
      newPos.X = val.X;
    if(!isNaN(val.Y) && this.Y < val.Y)
      newPos.Y = val.Y;
    
    return newPos;  
  }  
  
  this.Bound = function(lower, upper)
  {
    var newPos = this.Max(lower);
    return newPos.Min(upper);
  }
  
  this.Check = function()
  {
    var newPos = new Position(this.X, this.Y);
    if(isNaN(newPos.X))
      newPos.X = 0;
    if(isNaN(newPos.Y))
      newPos.Y = 0;
    return newPos;
  }
  
  this.Apply = function(element)
  {
    if(typeof(element) == "string")
      element = document.getElementById(element);
    if(element == null)
      return;
    if(!isNaN(this.X))
      element.style.left = this.X + 'px';
    if(!isNaN(this.Y))
      element.style.top = this.Y + 'px';  
  }
  
  this.ApplyFill = function(element, bottom, scrollHeight)
  {
    if(typeof(element) == "string")
      element = document.getElementById(element);
    if(element == null)
      return;
    if(!isNaN(this.Y)) {
      element.style.height = Math.abs(this.Y-bottom) + 'px';
      element.style.top = Math.abs(this.Y+(scrollHeight/2)) + 'px';
	}
  }
    
  this.ApplySmileChange = function(top, bottom, scrollHeight)
  {
    if(!isNaN(this.Y)) {
	  var percent = Math.abs(this.Y-bottom) / Math.abs(top-bottom) * 100;
	  mood_smiley_face_draw(
		(mood_smiley_face_height/1.69230),
		(mood_smiley_face_height/1.29411),
		(mood_smiley_face_width/4.88888),
		(mood_smiley_face_width/1.25714),
		percent
	  );
	}
  }
}

function absoluteCursorPostion(eventObj) {
  eventObj = eventObj ? eventObj : window.event;
  
  if(isNaN(window.scrollX))
    return new Position(eventObj.clientX + document.documentElement.scrollLeft
                        + document.body.scrollLeft, 
                        eventObj.clientY + document.documentElement.scrollTop
                        + document.body.scrollTop);
  else
    return new Position(eventObj.clientX + window.scrollX, 
                        eventObj.clientY + window.scrollY);
}

function dragObject(element, attachElement, lowerBound, upperBound,
                    startCallback, moveCallback, endCallback, attachLater,
					startx, starty,
					top, bottom,
					scrollWidth, scrollHeight) {
  if(typeof(element) == "string")
    element = document.getElementById(element);

  if(element == null)
    return;
  
  if(lowerBound != null && upperBound != null)
  {
    var temp = lowerBound.Min(upperBound);
    upperBound = lowerBound.Max(upperBound);
    lowerBound = temp;
  }

  var cursorStartPos = null;
  var elementStartPos = null;
  var dragging = false;
  var listening = false;
  var disposed = false;
  
  var element_pos_x = parseInt(element.style.left);
  var element_pos_y = parseInt(element.style.top);
  var meter_fill = document.getElementById(mood_happy_meter_fill);
  
  function dragStart(eventObj)
  { 
    if(dragging || !listening || disposed) 
      return;

    dragging = true;
    
    if(startCallback != null)
      startCallback(eventObj, element);
    
    cursorStartPos = absoluteCursorPostion(eventObj);
	if ( isNaN(element_pos_x) || isNaN(element_pos_y) ) {
		elementStartPos = new Position(startx,starty);   
	} else {
		elementStartPos = new Position(element_pos_x,element_pos_y);		
	}
    elementStartPos = elementStartPos.Check();
    
    hookEvent(document, "mousemove", dragGo);
    hookEvent(document, "mouseup", dragStopHook);
    
    return cancelEvent(eventObj);
  }
  
  function dragGo(eventObj)
  {
    if(!dragging || disposed)
      return;
    
    var newPos = absoluteCursorPostion(eventObj);
    newPos = newPos.Add(elementStartPos).Subtract(cursorStartPos);
    newPos = newPos.Bound(lowerBound, upperBound)
    newPos.Apply(element);
	newPos.ApplyFill(meter_fill, bottom, scrollHeight);
	newPos.ApplySmileChange(top, bottom, scrollHeight);
    if(moveCallback != null)
      moveCallback(newPos, element);
      
    return cancelEvent(eventObj); 
  }
  
  function dragStopHook(eventObj)
  {
    dragStop();
    return cancelEvent(eventObj);
  }
  
  function dragStop()
  {
    if(!dragging || disposed)
      return;

    unhookEvent(document, "mousemove", dragGo);
    unhookEvent(document, "mouseup", dragStopHook);
    cursorStartPos = null;
    elementStartPos = null;
    if(endCallback != null)
      endCallback(element);
    dragging = false;
  }
  
  this.Dispose = function()
  {
    if(disposed)
      return;

    this.StopListening(true);
    element = null;
    attachElement = null
    lowerBound = null;
    upperBound = null;
    startCallback = null;
    moveCallback = null
    endCallback = null;
    disposed = true;
  }
  
  this.StartListening = function()
  {
    if(listening || disposed)
      return;

    listening = true;
    hookEvent(attachElement, "mousedown", dragStart);
  }
  
  this.StopListening = function(stopCurrentDragging)
  {
    if(!listening || disposed) 
      return;

    unhookEvent(attachElement, "mousedown", dragStart);
    listening = false;
    
    if(stopCurrentDragging && dragging)
      dragStop();
  }
  
  this.IsDragging = function(){ return dragging; }
  this.IsListening = function() { return listening; }
  this.IsDisposed = function() { return disposed; }
  
  if(typeof(attachElement) == "string")
    attachElement = document.getElementById(attachElement);
  if(attachElement == null)
    attachElement = element;
    
  if(!attachLater)
    this.StartListening();
}

/**
  * x: x position of the scroll bar
  * y: y position of the scroll bar
  
  * top: the top of the scroll box, bounding the bar
  * bottom: the bottom of the scroll box, bounding the bar
  
  * scrollWidth: width of the scroll bar
  * scrollHeight: height of the scroll bar
**/
function happy_scroll_on(x,y,top,bottom, scrollWidth, scrollHeight) {
	var exampA = new dragObject(
		mood_happy_meter_scroll, null,
		new Position(x-(scrollWidth/2),top),
		new Position(x-(scrollWidth/2),bottom), null, null, null, false,
		x,y,top,bottom, scrollWidth, scrollHeight);
	exampA.StartListening();
}

function bringUpHappyLevelScrollContainer(event) {

	var mood_element = document.getElementById('mood-main');
	var position = getAbsolutePosition(mood_element);

	var offsetX = event.clientX - position.x;
	if ( offsetX < 0 ) return;
	
	var x_diff = Math.abs( ( mood_main_width / 2.0 ) - offsetX );
	var factor = 1 - ( x_diff / ( mood_main_width / 2.0 ) );
	
	
	var happy_meter = document.getElementById(mood_happy_meter);
	happy_meter.style.background = 'rgba(200, 218, 224, ' + ( 0.7 * factor ) +')';

	var happy_meter_fill = document.getElementById(mood_happy_meter_fill);
	happy_meter_fill.style.background = 'rgba(51, 255, 0, ' + ( 0.7 * factor ) +')';

	var happy_meter_scroll = document.getElementById(mood_happy_meter_scroll);
	happy_meter_scroll.style.background = 'rgba(65, 75, 129, ' + ( 0.85 * factor ) +')';		
}

/**Hide the happy level scroll container**/
function hideHappyLevelScrollContainer() {
	var happy_meter = document.getElementById(mood_happy_meter);
	happy_meter.style.background = 'rgba(200, 218, 224, 0)';

	var happy_meter = document.getElementById(mood_happy_meter_fill);
	happy_meter.style.background = 'rgba(51, 255, 0, 0)';

	var happy_meter = document.getElementById(mood_happy_meter_scroll);
	happy_meter.style.background = 'rgba(65, 75, 129, 0)';	
}

/**Return the absolute position of an element **/
function getAbsolutePosition(element) {
     var r = { x: element.offsetLeft, y: element.offsetTop };
     if (element.offsetParent) {
       var tmp = getAbsolutePosition(element.offsetParent);
       r.x += tmp.x;
       r.y += tmp.y;
     }
     return r;
}