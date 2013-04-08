/** 
  * Location: /php/apps/diary/diary_date.php
  * Description: common css for the top date displayed in the diary
**/
var diary_date_m_d_y = "diary-date-m-d-y";

/** 
  * Location: /php/apps/diary/diary_date.php
  * Description: starting letter of the month display in the diary
**/
var diary_date_month_starting = "diary-date-month-starting";

/** 
  * Location: /php/apps/diary/diary_date.php
  * Description: ending letters of the month display in the diary
**/
var diary_date_month_ending = "diary-date-month-ending";

/** 
  * Location: /php/apps/diary/diary_date.php
  * Description: css for the numerical date
**/
var diary_date_day = "diary-date-day";


/**
  * Initialize the css for diary_date
**/
function diary_date_run_css() {

	/**
	  * .diary-date-m-d-y css
	**/
	var arr_diary_date_m_d_y = document.getElementsByClassName(diary_date_m_d_y);
	
	for (var i = 0; i < arr_diary_date_m_d_y.length; i++) {
		arr_diary_date_m_d_y[i] .style .position = 'absolute';
		arr_diary_date_m_d_y[i] .style .display = 'inline';
	}
	
	
	/**
	  * .date-month-starting css
	**/
	var arr_diary_date_month_starting = document.getElementsByClassName(diary_date_month_starting);

	for (var i = 0; i < arr_diary_date_month_starting.length; i++) {
		arr_diary_date_month_starting[i] .style .marginTop = -53 + 'px';
		arr_diary_date_month_starting[i] .style .marginLeft = 43 + 'px';
		arr_diary_date_month_starting[i] .style .fontSize = 40 + 'px';
		arr_diary_date_month_starting[i] .style .fontFamily = 'sans-serif';
		arr_diary_date_month_starting[i] .style .color = '#ADAD62';
	}


	/**
	  * .diary-date-month-ending css
	**/
	var arr_diary_date_month_ending = document.getElementsByClassName(diary_date_month_ending);	

	for (var i = 0; i < arr_diary_date_month_ending.length; i++) {
		arr_diary_date_month_ending[i] .style .marginTop = -72 + 'px';
		arr_diary_date_month_ending[i] .style .marginLeft = 74 + 'px';
		arr_diary_date_month_ending[i] .style .fontSize = 25 + 'px';
		arr_diary_date_month_ending[i] .style .fontFamily = 'sans-serif';
		arr_diary_date_month_ending[i] .style .color = '#ADAD62';
	}
	
	
	/**
	  * .diary-date-day css
	**/
	var arr_diary_date_day = document.getElementsByClassName(diary_date_day);	
	
	for (var i = 0; i < arr_diary_date_day.length; i++) {
		arr_diary_date_day[i] .style .marginTop = -58 + 'px';
		arr_diary_date_day[i] .style .marginLeft = 176 + 'px';
		arr_diary_date_day[i] .style .fontSize = 29 + 'px';
		arr_diary_date_day[i] .style .fontFamily = 'sans-serif';
		arr_diary_date_day[i] .style .fontWeight = 'bolder';
		arr_diary_date_day[i] .style .color = '#D6A348';
	}
}
	
/**
  * diary_date init
**/
function diary_date_init() {
	diary_date_run_css();
}