/** 
  * Location: /php/apps/mood/mood_smiley_face.php
  * Description: The displayed smiley face
**/
var mood_smiley_face = 'mood-smiley-face';

/** 
  * Location: /php/apps/mood/mood_smiley_face.php
  * Description: The displayed smile on the smiley face
**/
var mood_smiley_face_smile = 'mood-smiley-face-smile';

/**
  * Location: /php/apps/mood/mood_smiley_face.php
  * Description: The first eye of the smiley face
**/
var mood_smiley_face_eye_one = 'mood-smiley-face-eye-one';

/**
  * Location: /php/apps/mood/mood_smiley_face.php
  * Description: The second eye of the smiley face
**/
var mood_smiley_face_eye_two = 'mood-smiley-face-eye-two';




var mood_smiley_face_starting_percent = 75;
var mood_smiley_face_width = 220;
var mood_smiley_face_height = 220;

var mood_smiley_face_eye_color = '#000';


/**
  * Initialize the css for mood_smiley_face
**/
function mood_smiley_face_run_css() {

	/**
	  * #mood-smiley-face css
	**/
	var e_mood_smiley_face = document.getElementById(mood_smiley_face);
	
	e_mood_smiley_face .style .zIndex = 40;
	e_mood_smiley_face .style .background = 'rgba(238, 196, 29, 1)';
	e_mood_smiley_face .style .display = 'inline';
	e_mood_smiley_face .style .position = 'absolute';
	e_mood_smiley_face .style .width = mood_smiley_face_width + 'px'
	e_mood_smiley_face .style .height = mood_smiley_face_height + 'px'
	e_mood_smiley_face .style .top = 70+'px'
	e_mood_smiley_face .style .right = 50+'px'
	e_mood_smiley_face .style .borderRadius = (mood_smiley_face_width/2) + 'px';
	
	
	/**
	  * #mood-smiley-face-eye-one css
	**/
	var e_mood_smiley_face_eye_one = document.getElementById(mood_smiley_face_eye_one);

	e_mood_smiley_face_eye_one .style .zIndex = 45;
	e_mood_smiley_face_eye_one .style .background = mood_smiley_face_eye_color;
	e_mood_smiley_face_eye_one .style .display = 'inline';
	e_mood_smiley_face_eye_one .style .position = 'absolute';
	e_mood_smiley_face_eye_one .style .width = 50 + 'px';
	e_mood_smiley_face_eye_one .style .height = 50 + 'px';
	e_mood_smiley_face_eye_one .style .top = 50 + 'px';
	e_mood_smiley_face_eye_one .style .right = 130 + 'px';
	e_mood_smiley_face_eye_one .style .borderRadius = 25 + 'px';
	

	/**
	  * #mood-smiley-face-eye-two css
	**/
	var e_mood_smiley_face_eye_two = document.getElementById(mood_smiley_face_eye_two);

	e_mood_smiley_face_eye_two .style .zIndex = 45;
	e_mood_smiley_face_eye_two .style .background = mood_smiley_face_eye_color;
	e_mood_smiley_face_eye_two .style .display = 'inline';
	e_mood_smiley_face_eye_two .style .position = 'absolute';
	e_mood_smiley_face_eye_two .style .width = 50 + 'px';
	e_mood_smiley_face_eye_two .style .height = 50 + 'px';
	e_mood_smiley_face_eye_two .style .top = 50 + 'px';
	e_mood_smiley_face_eye_two .style .right = 40 + 'px';
	e_mood_smiley_face_eye_two .style .borderRadius = 25 + 'px';
}


/**
  * mood_smiley_face init
**/
function mood_smiley_face_init() {
	mood_smiley_face_run_css();
	window.onload = mood_smiley_face_draw(
		(mood_smiley_face_height/1.69230),
		(mood_smiley_face_height/1.29411),
		(mood_smiley_face_width/4.88888),
		(mood_smiley_face_width/1.25714),
		mood_smiley_face_starting_percent);
}


function mood_smiley_face_draw(top, bottom, left, right, percent) {

	var element = document.getElementById(mood_smiley_face_smile);
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
	var parent = document.getElementById(mood_smiley_face);
	var red = ( 39 + ( 209 * ( percent/100.0 ) ) );
	var blue = ( 248 - ( 209 * ( percent/100.0 ) ) );
	parent.style.background =
		'rgba( '  + Math.round(red) +
		', 206, ' + Math.round(blue) +
		', 1)';
	
    var height = Math.abs(top-bottom);
	var width = Math.abs(left-right);
	var dimension = Math.min(width, height);
	var count = 0;
	
	var smile_height = ((width/2)/(width/12)) * ((width/2)/(width/12));
	var norm_const = height/smile_height;
	
	if (percent > 50) {
		norm_const = norm_const * ( (percent-50) / ( -50 ) );
	} else {
		norm_const = norm_const * ( (50-percent) / 50 );
	}
	var startTop = top-( height*(percent/ (-100) ) );
	
	
	for (var i = left; i < right-(5-1); i+=5) {
		count+=5;

		var div = document.createElement('div');
	    div.style.width = (dimension/2) + 'px';
		div.style.height = (dimension/2) + 'px';
		div.style.borderRadius = (dimension/4) + 'px';
		div.style.background = '#000';
		div.style.position = 'absolute';
		div.style.zIndex = 41;
		
		div.style.left = (left+count-(dimension/4)) + 'px';
		
		var x_var = (count-(width/2))/(width/12);
		div.style.top = ( startTop + ( x_var * x_var * norm_const) ) + 'px';
		element.appendChild(div);
	}
}