var Vector = new Object();

/**Subtract two vectors **/
Vector.sub = function sub(v1, v2) {
	var v3 = new Array();
	for(var i = 0; i < v1.length; i++) {
		v3[i] = v1[i]-v2[i];
	}
	return v3;
}

/**Add two vectors **/
Vector.add = function add(v1, v2) {
	var v3 = new Array();
	for(var i = 0; i < v1.length; i++) {
		v3[i] = v1[i]+v2[i];
	}
	return v3;
}

/**Dot two vectors **/
Vector.dot = function (v1, v2) {
	var v3 = 0;
	for(var i = 0; i < v1.length; i++) {
		v3 += v1[i]*v2[i];
	}
	return v3;
}

/**Find magnitude of vector **/
Vector.mag = function (v1, dim) {
	var v3 = 0;
	for(var i = 0; i < v1.length; i++) {
		v3 += v1[i]*v1[i];
	}
	return Math.pow( v3, 1/(dim+0.0) );
}

/**Find norm of vector **/
Vector.norm = function (v1, dim) {
	var mag = Vector.mag(v1,dim);
	var v3 = [];
	for(var i = 0; i < v1.length; i++) {
		v3[i] = v1[i]/(mag+0.0);
	}
	return v3;
}

/**Scale the vector **/
Vector.scale = function (s,v1) {
	var v3 = new Array();
	for(var i = 0; i < v1.length; i++) {
		v3[i] = v1[i]*s;
	}
	return v3;
}

/**Find cross product of two vectors **/
Vector.cross = function (v1, v2) {
	return new Array(
		v1[1]*v2[2] - v1[2]*v2[1],
		v1[2]*v2[0] - v1[0]*v2[2],
		v1[0]*v2[1] - v1[1]*v2[0]
	);
}