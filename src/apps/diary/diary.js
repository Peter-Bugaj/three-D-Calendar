/** 
  * Location: /php/apps/diary/diary.php
  * Description: css describing the diary script
**/
var diary_script = "diary-script";


/**
  * Initialize the css for diary
**/
function diary_run_css() {

	/**
	  * .diary-script css
	**/
	var arr_diary_script = document.getElementsByClassName(diary_script);
	
	for (var i = 0; i < arr_diary_script.length; i++) {
		arr_diary_script[i] .style .fontSize = 27 + 'px';
	}
}
	
/**
  * diary init
**/
function diary_init() {
	diary_run_css();
}