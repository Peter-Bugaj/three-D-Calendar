<html id='index-html'>
<head>
	<!-- Site title -->
    <title>My Diary</title>
    <meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">

	<!-- Load libraries -->
    <script type="text/javascript" src="../lib/glMatrix-0.9.5.min.js"></script>
	<script type="text/javascript" src="../lib/jquery-1.8.2.min.js"></script>

	<!-- Load javascript -->
	<script type="text/javascript" src="../src/disableSelect.js"></script>
	<script type="text/javascript" src="../src/vector_tools/vector.js"></script>
	
	<script type="text/javascript" src="../src/web_GL_calendar/web_GL_calendar.js"></script>
	<script type="text/javascript" src="../src/web_GL_calendar/web_GL_calendar_account.js"></script>

	<script type="text/javascript" src="../src/web_GL_calendar/CalendarRenderer.js"></script>
	<script type="text/javascript" src="../src/web_GL_calendar/CalendarDataRender.js"></script>
	<script type="text/javascript" src="../src/web_GL_calendar/CalendarMousePlayer.js"></script>
	<script type="text/javascript" src="../src/web_GL_calendar/HelicalSpringTorus.js"></script>

	<script type="text/javascript" src="../src/layout/tabs/main-tab-entry.js"></script>
	<script type="text/javascript" src="../src/layout/dialog_pop_up/dialog_pop_up_controls.js"></script>

	<script type="text/javascript" src="../src/apps/mood/mood_happy_meter.js"></script>
	<script type="text/javascript" src="../src/apps/mood/mood_smiley_face.js"></script>

	<script type="text/javascript" src="../src/apps/diary/diary_date.js"></script>
	<script type="text/javascript" src="../src/apps/diary/diary.js"></script>

	<!-- Load css -->
	<link rel="stylesheet" type="text/css" href="../css/index.css">

	<link rel="stylesheet" type="text/css" href="../css/web_GL_calendar/web_GL_calendar_wrapper.css">
	<link rel="stylesheet" type="text/css" href="../css/web_GL_calendar/web_GL_calendar_account.css">
	<link rel="stylesheet" type="text/css" href="../css/web_GL_calendar/web_GL_calendar.css">
	<link rel="stylesheet" type="text/css" href="../css/web_GL_calendar/web_GL_calendar_controls.css">
	<link rel="stylesheet" type="text/css" href="../css/web_GL_calendar/web_GL_calendar_years.css">

	<link rel="stylesheet" type="text/css" href="../css/layout/tabs/tabs_calendar.css">
	<link rel="stylesheet" type="text/css" href="../css/layout/dialog_pop_up/dialog_pop_up.css">
	
	<link rel="stylesheet" type="text/css" href="../css/apps/mood/mood.css">
</head>
<body id="index-body" onload="drawSmile('smiley-face-smile', 130, 170, 45, 175, 75);">
	<div id="index-top-table">
		<div id="index-header">
			<?php include 'header.php'; ?>
		</div>
		<div id="index-content">
			<div id="index-content-left"></div>
			<div id="index-content-center">
				<?php include 'content.php'; ?>
			</div>
			<div id="index-content-right"></div>
		</div>
		<div id="index-footer">
			<?php include 'footer.php'; ?>
		</div>
	</div>
</body>
<script>runDeselection();</script>
</html>