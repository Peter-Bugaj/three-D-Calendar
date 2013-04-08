/**Class constructor**/
// https://github.com/blog/1360-introducing-contributions
// https://github.com/blog/1387-viewing-past-contributions
var CalendarRenderer = function () {

	/**The current zoom settings**/
	this.zoom_setting = 2;
	
	this.mvMatrix = mat4.create();
	this.pMatrix = mat4.create();
	
	this.twoD_threeD_shift = 0;
	this.twoD_threeD_shift = false;
	
	this.divs_rendered = 0;
	this.divs_hidden = 1;
	
	this.year_ids = [
		"year-1988", "year-1989", "year-1990", "year-1991", "year-1992",
		"year-1993", "year-1994", "year-1995", "year-1996", "year-1997",
		"year-1998", "year-1999", "year-2000", "year-2001", "year-2002",
		"year-2003", "year-2004", "year-2005", "year-2006", "year-2007",
		"year-2008", "year-2009", "year-2010", "year-2011", "year-2012",
		"year-2013", "year-2014", "year-2015", "year-2016", "year-2017",
		"year-2018", "year-2019", "year-2020", "year-2021", "year-2022"];
	this.current_year_idx = 24;
	this.total_years = 35;
}

/**Initialize Web-GL**/
CalendarRenderer.prototype.initGL = function(canvas) {
	/**Initialize Web-GL variable**/
    try {
		this.gl = canvas.getContext("experimental-webgl");
        this.gl.viewportWidth = 1000;
        this.gl.viewportHeight = 480;
    } catch (e) {
    }
    if (!this.gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}


/**Get the computed shader**/
CalendarRenderer.prototype.getShader = function(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = this.gl.createShader(this.gl.VERTEX_SHADER);
    } else {
        return null;
    }

    this.gl.shaderSource(shader, str);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        alert(this.gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

/**Initialize the shaders**/
CalendarRenderer.prototype.initShaders = function () {
    var fragmentShader = this.getShader(this.gl, "shader-fs");
    var vertexShader = this.getShader(this.gl, "shader-vs");

    this.shaderProgram = this.gl.createProgram();
    this.gl.attachShader(this.shaderProgram, vertexShader);
    this.gl.attachShader(this.shaderProgram, fragmentShader);
    this.gl.linkProgram(this.shaderProgram);

    if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    this.gl.useProgram(this.shaderProgram);

    this.shaderProgram.vertexPositionAttribute =
    this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
    this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);

    this.shaderProgram.vertexNormalAttribute =
    this.gl.getAttribLocation(this.shaderProgram, "aVertexNormal");

    this.shaderProgram.vertexColorAttribute =
    this.gl.getAttribLocation(this.shaderProgram, "aVertexColor");
    this.gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);

    this.shaderProgram.pMatrixUniform =
    this.gl.getUniformLocation(this.shaderProgram, "uPMatrix");
    this.shaderProgram.mvMatrixUniform =
    this.gl.getUniformLocation(this.shaderProgram, "uMVMatrix");

    this.shaderProgram.nMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, "uNMatrix");
    this.shaderProgram.samplerUniform = this.gl.getUniformLocation(this.shaderProgram, "uSampler");
    this.shaderProgram.useLightingUniform = this.gl.getUniformLocation(this.shaderProgram, "uUseLighting");
    this.shaderProgram.ambientColorUniform = this.gl.getUniformLocation(this.shaderProgram, "uAmbientColor");
    this.shaderProgram.lightingDirectionUniform = this.gl.getUniformLocation(this.shaderProgram, "uLightingDirection");
    this.shaderProgram.directionalColorUniform = this.gl.getUniformLocation(this.shaderProgram, "uDirectionalColor");
}


/**Set the uniform matrices**/
CalendarRenderer.prototype.setMatrixUniforms = function() {
    this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);
    this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform, false, this.mvMatrix);
}

/**Set the appropriate view before rendering**/
CalendarRenderer.prototype.setView = function() {

    this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight);

    mat4.perspective(45, this.gl.viewportWidth / this.gl.viewportHeight,0.1, -2000.0, this.pMatrix);
    mat4.identity(this.mvMatrix);


    mat4.translate(this.mvMatrix, [0, main_height, zoom]);
    mat4.rotate(this.mvMatrix, 25*Math.PI/180.0, [1,0,0]);
}

/**Reset the view to default**/
CalendarRenderer.prototype.resetView = function() {
    if(this.zoom_setting == 1) {
        zoom = -550;
        main_height = -400;
    } else {
        zoom = -320;
        main_height = -390;
    }

    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.enable(this.gl.DEPTH_TEST);
}


CalendarRenderer.prototype.threeD2twoD = function(a) {
	var incr = 0.1;
	this.twoD_threeD_shift_on = true;
	if(this.twoD_threeD_shift < 1-(incr/2)) {
	    this.twoD_threeD_shift += incr;
		
	    var that = this;
	    setTimeout(function(){
	    		that.threeD2twoD(a-1)
	    	}, a);
    	this.calendarRedraw(0);	

		if (this.twoD_threeD_shift >= 0.9) {
			this.createDivCalendarBoxes(30);
		}			
	}
}
CalendarRenderer.prototype.twoD2threeD = function() {
	var incr = 0.1;
	this.hideDivCalendarBoxes();
	if(this.twoD_threeD_shift > (incr/2)) {
		this.twoD_threeD_shift -= incr;
		var that = this;
		setTimeout(function(){
				that.twoD2threeD()
			}, 20);
		this.calendarRedraw(0);
		
		if ((this.twoD_threeD_shift - 0.05) < (incr*3/2)) {
			this.twoD_threeD_shift_on = false;
		}
	}
}


/**Start the Web-GL rendering of the calendar app**/
CalendarRenderer.prototype.webGLStart = function() {
    
	var canvas = document.getElementById("web-GL-calendar-main-calendar");

	canvas.onmousedown = CalendarMousePlayer.handleMouseDown;
	document.onmouseup = CalendarMousePlayer.handleMouseUp;
	
	CalendarMousePlayer.calendar = this;
	document.onmousemove = CalendarMousePlayer.handleMouseMove;

    this.initGL(canvas);
    this.initShaders()

    this.createYearLabels();
    if(this.zoom_setting == 2) {
        this.displayYearLabels('none');
    }

    this.calendarRedraw(0);
}

/**Draw the cloud cirlces**/
CalendarRenderer.prototype.drawCloud = function(zoom_setting) {

    /**Initialize the array buffers and corresponding data**/
    var rendered_data = new CalendarDataRender ();
    rendered_data.next_vertices = [];
    rendered_data.next_colours = [];
    rendered_data.vcounter = 0;
    rendered_data.ccounter = 0;
    rendered_data.zoom_setting = this.zoom_setting;
	rendered_data.twoD_threeD_shift = this.twoD_threeD_shift;
	rendered_data.twoD_threeD_shift_on = this.twoD_threeD_shift_on;
	rendered_data.mouseMoveOffset = CalendarMousePlayer.mouseMoveOffset;
	rendered_data.happy_values = [];
	rendered_data.total_day_counter = 0;

    var position_settings = [];
    var colour_settings = [];
    if(this.zoom_setting == 2) {
        rendered_data.quality = 2;
        position_settings = [
            [[5,3],[5,6]],
            [[5,6],[5,7]],
			[[5,9],[5,12]],
            [[6,0],[6,1]],
            [[6,1],[6,2]],
            [[6,2],[6,4]],
            [[6,4],[6,5]],
            [[6,5],[6,12]]
        ];
        colour_settings = [
            [[0.1, 0.1, 0.2], [0.15, 0.15, 0.2]],
            [[0.15, 0.15, 0.2], [0.18, 0.15, 0.4]],
            [[0.18, 0.15, 0.4], [0.15, 0.15, 0.8]],
            [[0.15, 0.15, 0.8], [0.15, 0.25, 1]],
            [[0.15, 0.25, 1], [0.15, 0.25, 1]],
            [[0.15, 0.25, 1], [0.2, 0.15, 0.8]],
            [[0.2, 0.15, 0.8], [0.185, 0.1, 0.6]]
        ];
    } else if (this.zoom_setting == 1) {
        rendered_data.quality = 2;
        position_settings = [
            [[4,0],[4,12]],
            [[5,0],[5,12]],
            [[6,0],[6,12]],
            [[7,0],[7,12]]
        ];
        colour_settings = [
            [[0.15, 0.25, 1], [0.15, 0.25, 1]],
            [[0.15, 0.25, 1], [0.15, 0.25, 1]],
            [[0.15, 0.25, 1], [0.15, 0.25, 1]],
            [[0.15, 0.25, 1], [0.15, 0.25, 1]]
        ];
    }
	
	/**Enable required the attributes**/
	this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
	this.gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
	
	/**Compute the data to be rendered**/
    for (var i = 0; i < position_settings.length; i++) {
        next_position_setting = position_settings[i];
        rendered_data.start = next_position_setting[0];
        rendered_data.end = next_position_setting[1];
        rendered_data.computeCloudData();
    }

    /**Get the colour values and bind them to the shader colour attribute **/
    var nextColorBuffer = this.gl.createBuffer();
    nextColorBuffer.itemSize = 4;
    nextColorBuffer.numItems = rendered_data.next_colours.length/4;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextColorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(rendered_data.next_colours), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextColorBuffer);
    this.gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute,nextColorBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

    /**Get the vertex values and bind them to the shader vertex attribute**/
    var nextVBuffer = this.gl.createBuffer();
    nextVBuffer.itemSize = 3;
    nextVBuffer.numItems = rendered_data.next_vertices.length/3;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextVBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(rendered_data.next_vertices), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextVBuffer);
    this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute,nextVBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

    /**Draw the vertex and colour values**/
    this.setMatrixUniforms();
    this.gl.drawArrays(this.gl.TRIANGLES, 0, rendered_data.next_vertices.length/3);
	
	/**Disable required the attributes**/
	this.gl.disableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
	this.gl.disableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
	
	
	/**Draw the associated happiness clouds**/
	//this.drawHappinessClouds(rendered_data.happy_values);
}

/**Draw the brightness regions**/
CalendarRenderer.prototype.drawBrightnessInfo = function(zoom_setting) {

	/**Enable the required attributes**/
	this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
	this.gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
		
	/**Initialize the array buffers and corresponding data**/
	this.brightness_info = new CalendarDataRender ();
	this.brightness_info.next_vertices = [];
	this.brightness_info.next_colours = [];
	this.brightness_info.vcounter = 0;
	this.brightness_info.ccounter = 0;
	this.brightness_info.zoom_setting = this.zoom_setting;
	this.brightness_info.mouseMoveOffset = CalendarMousePlayer.mouseMoveOffset;
	this.brightness_info.quality = 2;
	var position_settings = [
		[[5,3],[5,12]],
		[[6,0],[6,12]]
	];
	/**Compute the data to be rendered**/
	for (var i = 0; i < position_settings.length; i++) {
		var next_position_settings = position_settings[i];
		this.brightness_info.start = next_position_settings[0];
		this.brightness_info.end = next_position_settings[1];
		this.brightness_info.computeInnerBrightnessData();
	}
	
    /**Get the colour values and bind them to the shader colour attribute**/
    var nextColorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextColorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.brightness_info.next_colours), this.gl.STATIC_DRAW);
    nextColorBuffer.itemSize = 4;
    nextColorBuffer.numItems = this.brightness_info.next_vertices.length/3;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextColorBuffer);
    this.gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute,nextColorBuffer.itemSize, this.gl.FLOAT, false, 0, 0);


    /**Get the vertex values and bind them to the shader vertex attribute**/
    var nextVBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextVBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.brightness_info.next_vertices), this.gl.STATIC_DRAW);
    nextVBuffer.itemSize = 3;
    nextVBuffer.numItems = this.brightness_info.next_vertices.length/3;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextVBuffer);
    this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute,nextVBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

    /**Draw the vertex and colour values**/
    this.setMatrixUniforms();
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.brightness_info.next_vertices.length/3);
	
	/**Disable the required attributes**/
	this.gl.disableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
	this.gl.disableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
}

/**Draw the calendar blocks**/
CalendarRenderer.prototype.drawCalendar = function(zoom_setting) {

    /**Initialize the array buffers and corresponding data**/
    var rendered_data = new CalendarDataRender ();
    rendered_data.next_vertices = [];
    rendered_data.next_colours = [];
    rendered_data.vcounter = 0;
    rendered_data.ccounter = 0;
    rendered_data.zoom_setting = this.zoom_setting;
	rendered_data.twoD_threeD_shift = this.twoD_threeD_shift;
	rendered_data.twoD_threeD_shift_on = this.twoD_threeD_shift_on;
	rendered_data.mouseMoveOffset = CalendarMousePlayer.mouseMoveOffset;
	rendered_data.happy_values = [];
	rendered_data.total_day_counter = 0;

    var position_settings = [];
    var colour_settings = [];
    if(this.zoom_setting == 2) {
        rendered_data.quality = 2;
        position_settings = [
            [[5,3],[5,6]],
            [[5,6],[5,12]],
            [[6,0],[6,1]],
            [[6,1],[6,2]],
            [[6,2],[6,4]],
            [[6,4],[6,5]],
            [[6,5],[6,12]]
        ];
        colour_settings = [
            [[0.1, 0.1, 0.2], [0.15, 0.15, 0.2]],
            [[0.15, 0.15, 0.2], [0.18, 0.15, 0.4]],
            [[0.18, 0.15, 0.4], [0.15, 0.15, 0.8]],
            [[0.15, 0.15, 0.8], [0.15, 0.25, 1]],
            [[0.15, 0.25, 1], [0.15, 0.25, 1]],
            [[0.15, 0.25, 1], [0.2, 0.15, 0.8]],
            [[0.2, 0.15, 0.8], [0.185, 0.1, 0.6]]
        ];
    } else if (this.zoom_setting == 1) {
        rendered_data.quality = 2;
        position_settings = [
            [[4,0],[4,12]],
            [[5,0],[5,12]],
            [[6,0],[6,12]],
            [[7,0],[7,12]]
        ];
        colour_settings = [
            [[0.15, 0.25, 1], [0.15, 0.25, 1]],
            [[0.15, 0.25, 1], [0.15, 0.25, 1]],
            [[0.15, 0.25, 1], [0.15, 0.25, 1]],
            [[0.15, 0.25, 1], [0.15, 0.25, 1]]
        ];
    }
	
	/**Enable required the attributes**/
	this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
	this.gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
	
	/**Compute the data to be rendered**/
    for (var i = 0; i < position_settings.length; i++) {
        next_position_setting = position_settings[i];
        rendered_data.start = next_position_setting[0];
        rendered_data.end = next_position_setting[1];

        next_colour_setting = colour_settings[i];
        colour_one = next_colour_setting[0];
        colour_two = next_colour_setting[1];

        rendered_data.computeCalendarData(colour_one, colour_two);
    }

    /**Get the colour values and bind them to the shader colour attribute **/
    var nextColorBuffer = this.gl.createBuffer();
    nextColorBuffer.itemSize = 4;
    nextColorBuffer.numItems = rendered_data.next_colours.length/4;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextColorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(rendered_data.next_colours), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextColorBuffer);
    this.gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute,nextColorBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

    /**Get the vertex values and bind them to the shader vertex attribute**/
    var nextVBuffer = this.gl.createBuffer();
    nextVBuffer.itemSize = 3;
    nextVBuffer.numItems = rendered_data.next_vertices.length/3;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextVBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(rendered_data.next_vertices), this.gl.STATIC_DRAW);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextVBuffer);
    this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute,nextVBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

    /**Draw the vertex and colour values**/
    this.setMatrixUniforms();
    this.gl.drawArrays(this.gl.TRIANGLES, 0, rendered_data.next_vertices.length/3);
	
	/**Disable required the attributes**/
	this.gl.disableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
	this.gl.disableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
	
	
	/**Draw the associated happiness clouds**/
	//this.drawHappinessClouds(rendered_data.happy_values);
}

/**Draw the blocks for the inner structure**/
CalendarRenderer.prototype.drawInnerStructure = function(zoom_setting) {

	/**Enable the required attributes**/
	this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
	this.gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
		
	if (!this.inner_rendered_data_small || !this.inner_rendered_data_large) {

    	/**Initialize the array buffers and corresponding data**/
		this.inner_rendered_data_small = new CalendarDataRender ();
		this.inner_rendered_data_small.next_vertices = [];
		this.inner_rendered_data_small.next_colours = [];
		this.inner_rendered_data_small.vcounter = 0;
		this.inner_rendered_data_small.ccounter = 0;
		this.inner_rendered_data_small.zoom_setting = this.zoom_setting;
		this.inner_rendered_data_small.mouseMoveOffset = CalendarMousePlayer.mouseMoveOffset;
		this.inner_rendered_data_small.quality = 2;
		var position_settings = [
			[[5,3],[5,12]],
			[[6,0],[6,12]]
		];
		/**Compute the data to be rendered**/
		for (var i = 0; i < position_settings.length; i++) {
			var next_position_settings = position_settings[i];
			this.inner_rendered_data_small.start = next_position_settings[0];
			this.inner_rendered_data_small.end = next_position_settings[1];
			this.inner_rendered_data_small.computeInnerStructureData();
		}
		

		/**Initialize the array buffers and corresponding data**/
		this.inner_rendered_data_large = new CalendarDataRender ();
		this.inner_rendered_data_large.next_vertices = [];
		this.inner_rendered_data_large.next_colours = [];
		this.inner_rendered_data_large.vcounter = 0;
		this.inner_rendered_data_large.ccounter = 0;
		this.inner_rendered_data_large.zoom_setting = this.zoom_setting;
		this.inner_rendered_data_large.mouseMoveOffset = CalendarMousePlayer.mouseMoveOffset;
		this.inner_rendered_data_large.quality = 3;
		position_settings = [
			[[3,5],[3,12]],
			[[4,0],[4,12]],
			[[5,0],[5,12]],
			[[6,0],[6,12]],
			[[7,0],[7,12]],
			[[8,0],[8,3]],
		];
		/**Compute the data to be rendered**/
		for (var i = 0; i < position_settings.length; i++) {
			var next_position_settings = position_settings[i];
			this.inner_rendered_data_large.start = next_position_settings[0];
			this.inner_rendered_data_large.end = next_position_settings[1];
			this.inner_rendered_data_large.computeInnerStructureData();
		}
	}
	if (this.zoom_setting == 2) {
		this.inner_rendered_data = this.inner_rendered_data_small;
	} else if (this.zoom_setting == 1) {
		this.inner_rendered_data = this.inner_rendered_data_large;
	}
	
    /**Get the colour values and bind them to the shader colour attribute**/
    var nextColorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextColorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.inner_rendered_data.next_colours), this.gl.STATIC_DRAW);
    nextColorBuffer.itemSize = 4;
    nextColorBuffer.numItems = this.inner_rendered_data.next_vertices.length/3;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextColorBuffer);
    this.gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute,nextColorBuffer.itemSize, this.gl.FLOAT, false, 0, 0);


    /**Get the vertex values and bind them to the shader vertex attribute**/
    var nextVBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextVBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.inner_rendered_data.next_vertices), this.gl.STATIC_DRAW);
    nextVBuffer.itemSize = 3;
    nextVBuffer.numItems = this.inner_rendered_data.next_vertices.length/3;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextVBuffer);
    this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute,nextVBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

    /**Draw the vertex and colour values**/
    this.setMatrixUniforms();
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.inner_rendered_data.next_vertices.length/3);
	
	/**Disable the required attributes**/
	this.gl.disableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
	this.gl.disableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
}

/**Draw the blocks for the outer structure**/
CalendarRenderer.prototype.drawOuterStructure = function(zoom_setting) {

	/**Enable required the attributes**/
	this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
	this.gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
	/**gl.enableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);**/
	if (!this.outer_rendered_data || 1==1) {
	
		/**Initialize the array buffers and corresponding data**/
		this.outer_rendered_data = new CalendarDataRender ();
		this.outer_rendered_data.next_vertices = [];
		this.outer_rendered_data.next_colours = [];
		//this.outer_rendered_data.next_normals = [];
		this.outer_rendered_data.vcounter = 0;
		this.outer_rendered_data.ccounter = 0;
		//this.outer_rendered_data.ncounter = 0;
		this.outer_rendered_data.zoom_setting = this.zoom_setting;
		this.outer_rendered_data.mouseMoveOffset = CalendarMousePlayer.mouseMoveOffset;

		var quality_settings = [];
		var position_settings = [];
		if (this.zoom_setting == 2) {
			quality_settings = [2,2,2,2];
			position_settings = [
				[[5,3],[5,12]],
				[[6,0],[6,1]],
				[[6,1],[6,5]],
				[[6,5],[6,11]]
			];
		}

		/**Compute the data to be rendered**/
		for (var i = 0; i < position_settings.length; i++) {
			var next_position_settings = position_settings[i];
			this.outer_rendered_data.start = next_position_settings[0];
			this.outer_rendered_data.end = next_position_settings[1];
			this.outer_rendered_data.quality = quality_settings[i];
			this.outer_rendered_data.computeOuterStructureData();
		}
	}
	
    /**Get the colour values and bind them to the shader colour attribute **/
    var nextColorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextColorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.outer_rendered_data.next_colours), this.gl.STATIC_DRAW);
    nextColorBuffer.itemSize = 4;
    nextColorBuffer.numItems = this.outer_rendered_data.next_vertices.length/3;
    this.gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute,nextColorBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

    /**Get the vertex values and bind them to the shader vertex attribute **/
    var nextVBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextVBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.outer_rendered_data.next_vertices), this.gl.STATIC_DRAW);
    nextVBuffer.itemSize = 3;
    nextVBuffer.numItems = this.outer_rendered_data.next_vertices.length/3;
    this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute,nextVBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

    /**Create the normal values**/
    /**var nextNormBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nextNormBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.outer_rendered_data.next_normals), gl.STATIC_DRAW);
    nextNormBuffer.itemSize = 3;
    nextNormBuffer.numItems = this.outer_rendered_data.next_vertices.length/3;
    gl.bindBuffer(gl.ARRAY_BUFFER, nextNormBuffer);
    gl.vertexAttribPointer(this.shaderProgram.vertexNormalAttribute,nextNormBuffer.itemSize, gl.FLOAT, false, 0, 0);**/

    /**Draw the vertex, normal and colour values**/
    this.setMatrixUniforms();
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.outer_rendered_data.next_vertices.length/3);
	
	/**Disable the required attributes**/
	this.gl.disableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
	this.gl.disableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
    //gl.disableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);
}

/**Draw the outer structure**/
CalendarRenderer.prototype.drawSceneTexture = function() {

	/**Enable required the attributes**/
	this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
	this.gl.enableVertexAttribArray(this.shaderProgram.vertexColorAttribute);

	var offset = ( -0.015*CalendarMousePlayer.mouseMoveOffset*15*30 ) % 30;
	var num_divisions = 3;
	var round_offset = Math.abs(Math.round(offset/num_divisions));
	
	if (!this.texture_rendered_data) {
		this.texture_rendered_data = [];
		for (var i = 0; i <=30/num_divisions; i++) {
			/**Initialize the array buffers and corresponding data**/   
			this.texture_rendered_data[i] = new CalendarDataRender ();
			this.texture_rendered_data[i].next_vertices = [];
			this.texture_rendered_data[i].next_colours = [];
			this.texture_rendered_data[i].vcounter = 0;
			this.texture_rendered_data[i].ccounter = 0;
			this.texture_rendered_data[i].zoom_setting = this.zoom_setting;
			this.texture_rendered_data[i].mouseMoveOffset = i*num_divisions;

			this.texture_rendered_data[i].computeTextureStructureData();
		}
	}
	
    /**Get the colour values and bind them to the shader colour attribute **/
    var nextColorBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextColorBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.texture_rendered_data[round_offset].next_colours), this.gl.STATIC_DRAW);
    nextColorBuffer.itemSize = 4;
    nextColorBuffer.numItems = this.texture_rendered_data[round_offset].next_colours.length/4;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextColorBuffer);
    this.gl.vertexAttribPointer(this.shaderProgram.vertexColorAttribute,nextColorBuffer.itemSize, this.gl.FLOAT, false, 0, 0);
	
    /**Bind the vertexes**/
    var nextVBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextVBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.texture_rendered_data[round_offset].next_vertices), this.gl.STATIC_DRAW);
    nextVBuffer.itemSize = 3;
    nextVBuffer.numItems = this.texture_rendered_data[round_offset].next_vertices.length/3;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, nextVBuffer);
    this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute,nextVBuffer.itemSize, this.gl.FLOAT, false, 0, 0);

	/**Draw the vertex and colour values**/
    this.setMatrixUniforms();
    this.gl.drawArrays(this.gl.TRIANGLES, 0, this.texture_rendered_data[round_offset].next_vertices.length/3);
	
	/**Disable required the attributes**/
	this.gl.disableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
	this.gl.disableVertexAttribArray(this.shaderProgram.vertexColorAttribute);
}

/**Redraw the calendar app given input control of value**/
CalendarRenderer.prototype.calendarRedraw = function(value) {

    //When spinning, bounding vertexes stay the same, offset gets update for variable passed to math function.
    // This cause the calendar to move down out of view. TO counter act, update vertical offset in opposite
    // corresponding direction.

    /**Update the zoom level if needed**/
    if(this.zoom_setting + value < 1) {
        return;
    } else if(this.zoom_setting + value > 2) {
        return;
    } else {
        this.zoom_setting += value;
    }

    /**Update the view given the new zoom level**/
    this.resetView();

    /**Draw the appropriate structures**/
    if(this.zoom_setting == 2) {

        this.setView();
        this.drawCalendar(this.zoom_setting);

        this.setView();
        this.drawInnerStructure(this.zoom_setting);
		
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE);
        this.gl.enable(this.gl.BLEND);
        this.gl.uniform1f(this.shaderProgram.alphaUniform, 1);
        this.setView();
        this.drawOuterStructure(this.zoom_setting);
        this.gl.disable(this.gl.BLEND);

		this.setView();
		//this.gl.disable(this.gl.DEPTH_TEST);
		//this.gl.enable(this.gl.DEPTH_TEST);
    } else {
        this.setView();
        this.drawCalendar(this.zoom_setting);
        this.setView();
        this.drawInnerStructure(this.zoom_setting);
        this.setView();
        this.drawSceneTexture();
    }

    /**Update the labels given the zoom level**/
    if(this.zoom_setting == 1) {
        this.displayYearLabels('inline');
    } else {
        this.displayYearLabels('none');
    }
}


/**Update the display of the year labels**/
CalendarRenderer.prototype.displayYearLabels = function(display) {
    for(var i = 0; i < 5; i++) {
        var next_year_idx = this.current_year_idx + 2 - i;
        var year_id = this.year_ids[next_year_idx];

        var element = document.getElementById(year_id);
        element.style.display = display
    }
}

CalendarRenderer.prototype.createYearLabels = function() {
    var year_label_height;
    if (this.zoom_setting == 1) {
        year_label_height = (this.gl.viewportHeight/5)/2;
    }

    var x_position = (this.gl.viewportWidth/2) - (this.gl.viewportWidth/3);
    var fontSize = this.gl.viewportHeight/13;

    var y_positions = [
        this.gl.viewportHeight/14.55,
        this.gl.viewportHeight/3.1788,
        this.gl.viewportHeight/1.875,
        this.gl.viewportHeight/1.4117647,
        this.gl.viewportHeight/1.18811881188];

    var year_colours = [
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 0.87)',
        'rgba(0, 255, 0, 1)',
        'rgba(255, 255, 255, 0.45)',
        'rgba(255, 255, 255, 0.26)'];

    for(var i = 0; i < 5; i++) {
        var next_year_idx = this.current_year_idx + 2 - i;
        var year_id = this.year_ids[next_year_idx];
        var year_label = year_id.replace("-", " ").replace("y", "Y");

        this.creatediv(
            this.year_ids[next_year_idx],
            year_label_height*5,
            year_label_height,
            year_label,
            y_positions[i],
            x_position,
            fontSize,
            year_colours[i]
            );
    }
}

CalendarRenderer.prototype.creatediv = function(id, width, height, label, y_position, x_position, fontSize, color) {
    var div = document.createElement('div');
    div.setAttribute('id', id);

    div.style.width = width;
    div.style.height = height;

    div.style.position = "absolute";
    div.style.top = "0px";
    div.style.left = "0px";
    div.style.marginTop = y_position+"px";
    div.style.marginLeft = x_position+"px";
    div.style.display = 'inline';

    var p = document.createElement('p');
    p.innerHTML = label;
    p.style.fontSize = fontSize;
    p.style.color = color;
    div.setAttribute('class', 'web-GL-calendar-year-label');

    var main = document.getElementById("web-GL-calendar-main-calendar-container");
    main.appendChild(div);
    div.appendChild(p);
}

var CloudInterval = function (startDate) {
	this.start_num = startDate;
	this.happiness_points = [];
	this.removed_points = [];
	
	this.sum_vals = 0;
	this.number_vals = 0;

	this.number_removed = 0;
	this.density = 0;
}
CloudInterval.prototype.addPoint = function (hap_val) {
	this.happiness_points[this.number_vals++] = hap_val;

	this.sum_vals += hap_val;
	this.density = this.sum_vals/(this.number_vals-this.number_removed);	
}
CloudInterval.prototype.removePoint = function () {
	this.removed_points[this.number_removed] = this.happiness_points[this.number_removed];
	this.sum_vals -= this.happiness_points[this.number_removed++];

	this.density = this.sum_vals/(this.number_vals-this.number_removed);
	
	return this.happiness_points[this.number_removed-1];
}
CloudInterval.prototype.undoDelete = function (del_val) {
	this.sum_vals += del_val;
	this.number_removed--;
	
	this.density = this.sum_vals/(this.number_vals-this.number_removed);
	
	this.happiness_points[this.number_removed] = del_val;
	this.removed_points[this.number_removed] = 0;
}

/**Run through the happiness levels for all the days and generate the clouds**/
CalendarRenderer.prototype.drawHappinessClouds = function (happy_values) {
	
	/**The set of increments to go through**/
	var threshold_increments = [
		0.025,  0.0725, 
	    0.07,   0.0675, 0.065,  0.0625, 
		0.06,   0.0575, 0.055,  0.0525, 0,
		0.05,   0.0475, 0.045,  0.0425, 0,
		0.04,   0.0375, 0.035,  0.0325, 0,
		0.03,   0.0275, 0.025,  0.0225
	];
	
	/**The set of cloud intervals**/
	var cloud_intervals = [];
	var cloud_counter = 0;

	/**Loop through all the values stored**/
	for (var i = 0; i < happy_values.length; i++) {
	
		/**Create the next cloud**/
		var cloud_x = new CloudInterval(i);
		cloud_intervals[cloud_counter++] = cloud_x;
		
		/**Reset the threshold**/
		var threshold_counter = 0;
		var threshold_value = 0 + threshold_increments[threshold_counter];
		
		/**Get the size of this next cloud**/
		for (; i < happy_values.length; i++) {
			cloud_x.addPoint(happy_values[i]);
			if (cloud_x.density < threshold_value) {/**
				//TODO: add this later
				//var del_val = cloud_x.removePoint();
				//if (cloud_x.density < threshold_value) {
				//	cloud_x.undoDelete(del_val);
				break;
				//}**/
			}
			if(threshold_counter < threshold_increments.length-1) {
				threshold_counter++;
				threshold_value += threshold_increments[threshold_counter];
			}
		}
	}
	
	// Compute the circle coordinates for each interval
	for (var h = 0; h < cloud_intervals.length; h++) {
	
		// Number of red circles to render
		var num_red_circles = Math.floor(Math.random()*2.9999) + 1;
		var num_red_rendered = 0;
		
		// Number of green circles to render
		var num_grn_circles = Math.floor(Math.random()*2.9999) + 1;
		var num_grn_rendered = 0;
		
		// Number of pink circles to render
		var num_pnk_circles = Math.floor(Math.random()*2.9999) + 1;
		var num_pnk_rendered = 0;

		// Current colour to compute circle with
		var current_drawing_colour = Math.floor(Math.random()*2.9999) + 1;
		
		// Loop through and compute all the circles
		while ( (num_red_rendered+num_grn_rendered+num_pnk_rendered) < (num_red_circles+num_grn_circles+num_pnk_circles) ) {
			break;
			// Case where a red circle is to be computed
			if (current_drawing_colour == 1) {
			
			}
			// Case where a green circle is to be computed
			if (current_drawing_colour == 2) {
			
			}
			// Case where a pink circle is to be computed
			if (current_drawing_colour == 3) {
			
			}			
		}		
	}
}

CalendarRenderer.prototype.createDivCalendarBoxes = function (total_days) {
	if(this.divs_rendered==1 && this.divs_hidden==1) {
		this.divs_hidden=0;
		for (var i = 0; i < 31; i++) {
			var elem = document.getElementById("cal_"+i);
			if (elem) {
				elem.style.display="block";
			}
		}
	} else if (this.divs_rendered==0) {
		this.divs_rendered=1;
		this.divs_hidden=0;
		for (var i = 0; i < total_days; i++) {
			this.createCalendarBoxDiv(
				"cal_"+i,
				73, 47,
				"&nbsp;&nbsp;"+(i+1),
				189+(parseInt(i/7)*51), 287+((i%7)*83),
				16,
				"rgba(155, 195, 255, 0.95)");
		}
	}
}
CalendarRenderer.prototype.hideDivCalendarBoxes = function () {
	if (this.divs_hidden==0 && this.divs_rendered==1) {
		this.divs_hidden=1;
		for (var i = 0; i < 31; i++) {
			var elem = document.getElementById("cal_"+i);
			if (elem) {
				elem.style.display="none";
			}
		}
	}
}
CalendarRenderer.prototype.createCalendarBoxDiv = function(id, width, height, label, y_position, x_position, fontSize, color) {
    var div = document.createElement('div');
    div.setAttribute('id', id);

    div.style.width = width;
    div.style.height = height;

    div.style.position = "absolute";
    div.style.top = y_position+"px";
    div.style.left = x_position+"px";
    div.style.marginTop = (-height-2)+"px";
    div.style.marginLeft = -width+"px";
    div.style.display = 'block';
	div.style.backgroundColor = color;
	
	div .style .borderBottomLeftRadius = 5 + 'px';
	div .style .borderBottomRightRadius = 5 + 'px';
	div .style .borderTopRightRadius = 5 + 'px';
	div .style .borderTopLeftRadius = 5 + 'px';
	
	div .style .borderColor = "rgba(87, 137, 107, 1)";
	div .style .borderStyle = "solid";
	div .style .borderWidth = 3;
	
	
    var p = document.createElement('p');
    p.innerHTML = label;
    p.style.fontSize = fontSize;
    div.setAttribute('class', 'web-GL-calendar-year-label');

    var main = document.getElementById("web-GL-calendar-main-calendar-container");
    main.appendChild(div);
    div.appendChild(p);
}