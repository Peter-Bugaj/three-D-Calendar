var HelicalSpringTorus = new Object();
HelicalSpringTorus.compute = function (a, b, l, s, y) {
	return [
		Math.cos(a) * (l + (s*Math.cos(b))),
		(s*Math.sin(b)) + y ,
		Math.sin(a) * (l + (s*Math.cos(b)))
	];
}