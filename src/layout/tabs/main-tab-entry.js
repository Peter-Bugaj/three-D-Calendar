function openTab(value) {

	var colours = new Object();
	colours.one = 'rgba(126, 173, 199, 0.95)';
	colours.two = 'rgba(95, 255, 249, 0.95)';
	colours.three = 'rgba(242, 187, 255, 0.95)';

	var borders = new Object();
	borders.one = '#2790B9';
	borders.two = '#0CE6E6';
	borders.three = '#E6A4CB';

	var tab1 = $('#tabs-calendar-main-entry-tab-one');
	var tab2 = $('#tabs-calendar-main-entry-tab-two');
	var tab3 = $('#tabs-calendar-main-entry-tab-three');

	var box1 = $('#tabs-calendar-main-entry-tab-one-box');
	var box2 = $('#tabs-calendar-main-entry-tab-two-box');
	var box3 = $('#tabs-calendar-main-entry-tab-three-box');
	$(box1).hide();
	$(box2).hide();
	$(box3).hide();
		
	var z1 = parseInt($(tab1).css('z-index'));
	var z2 = parseInt($(tab2).css('z-index'));
	var z3 = parseInt($(tab3).css('z-index'));
	if(z1 == 3) {
		$(tab1).css('z-index', 2);
		
		$(tab1).css('z-index', 1);
		$(tab3).css('z-index', 1);
	} else if(z2 == 3) {
		$(tab2).css('z-index', 2);
		
		$(tab1).css('z-index', 1);
		$(tab3).css('z-index', 1);
	} else if(z3 == 3) {
		$(tab3).css('z-index', 2);
		
		$(tab1).css('z-index', 1);
		$(tab2).css('z-index', 1);		
	}

	document.getElementById('tabs-calendar-main-entry-tab-'+value).style.zIndex = 3;
	document.getElementById('tabs-calendar-main-entry-tab-'+value+'-box').style.display = 'block';
	
	var calendar = $('#tabs-calendar-main-entry-tabs');
	calendar.css('background', colours[value]);
	calendar.css('border-bottom-color', borders[value]);
}

function openTabTop () {
	var diary_box = document.getElementById('tabs-calendar-main-entry-tab-top-box');
	if (diary_box.style.display == 'block') {
		diary_box.style.display = 'none';
	} else {
		diary_box.style.display = 'block';
	}
}