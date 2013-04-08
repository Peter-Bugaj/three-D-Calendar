function disableSelection(target) {
	if (typeof target.onselectstart!="undefined") //IE route
		target.onselectstart=function(){return false}
	else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
		target.style.MozUserSelect="none"
	else //All other route (ie: Opera)
		target.onmousedown=function(){return false}
	target.style.cursor = "default"
}
function runDeselection() {
	var elements = document.getElementsByTagName('div');
	for (var i = 0; i < elements.length; i++) {
		disableSelection(elements[i]);
	}
	elements = document.getElementsByTagName('button');
	for (var i = 0; i < elements.length; i++) {
		disableSelection(elements[i]);
	}
	elements = document.getElementsByTagName('canvas');
	for (var i = 0; i < elements.length; i++) {
		disableSelection(elements[i]);
	}
	elements = document.getElementsByTagName('table');
	for (var i = 0; i < elements.length; i++) {
		disableSelection(elements[i]);
	}
	elements = document.getElementsByTagName('tr');
	for (var i = 0; i < elements.length; i++) {
		disableSelection(elements[i]);
	}
	elements = document.getElementsByTagName('td');
	for (var i = 0; i < elements.length; i++) {
		disableSelection(elements[i]);
	}

	elements = document.getElementsByTagName('html');
	for (var i = 0; i < elements.length; i++) {
		disableSelection(elements[i]);
	}
	elements = document.getElementsByTagName('body');
	for (var i = 0; i < elements.length; i++) {
		disableSelection(elements[i]);
	}
}