function dialog_pop_up_open(value) {
    var calendar_box = document.getElementById('dialog-pop-up-main-entry');
	if (value == 1) {
		calendar_box.style.display = 'block';
	} else {
		calendar_box.style.display = 'none';
	}
}