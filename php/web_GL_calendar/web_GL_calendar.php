<!-- Initialize raw GL -->
<script id="shader-fs" type="x-shader/x-fragment">
    precision mediump float;
	varying vec4 vColor;
	void main(void) {
		gl_FragColor = vColor;
    }
</script>
<script id="shader-vs" type="x-shader/x-vertex">
    attribute vec3 aVertexPosition;
    attribute vec3 aVertexNormal;
	attribute vec4 aVertexColor;
	
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    uniform mat3 uNMatrix;

    uniform vec3 uAmbientColor;

    uniform vec3 uLightingDirection;
    uniform vec3 uDirectionalColor;

    uniform bool uUseLighting;

    varying vec3 vLightWeighting;
	varying vec4 vColor;
	
    void main(void) {
        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
		vColor = aVertexColor;
        
		if (!uUseLighting) {
            vLightWeighting = vec3(1.0, 1.0, 1.0);
        } else {
            vec3 transformedNormal = uNMatrix * aVertexNormal;
            float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);
            vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
        }
    }
</script>

<div id="web-GL-calendar-main-calendar-container">
	<canvas id="web-GL-calendar-main-calendar" onclick="dialog_pop_up_open(0)" width="1000px" height="480px"></canvas>
	<button onclick="calendar_renderer.calendarRedraw(1)" class="web-GL-calendar-zoom-control web-GL-calendar-zoom-in">+</button>
	<button onclick="calendar_renderer.calendarRedraw(-1)" class="web-GL-calendar-zoom-control web-GL-calendar-zoom-out">-</button>


	<button style="display: block;
	position: relative;
	top: -453px;
	left: 362px;
	width: 286px;
	margin-right: -286px;
	height: 60px;
	margin-bottom: -60px;
	background: rgba(0, 128, 0, 0.54);
	font-size: 40px;
	font-weight: bold;
	color: #B4EB6C;
	border: solid;
	border-color: rgba(122, 224, 187, 0.89);
	border-radius: 10px;">SEPTEMBER</button>

	
	<?php include 'web_GL_calendar_views_control.php'; ?>
	<?php include 'web_GL_calendar_account.php'; ?>
	<script>web_GL_calendar_account_init();</script>
</div>