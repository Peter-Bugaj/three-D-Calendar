<table id="web-GL-calendar-wrapper">
	<tr>
		<td>
			<!-- Render php for displaying the calendar-->
			<?php  include 'web_GL_calendar/web_GL_calendar.php'; ?>
			<script>web_GL_calendar_init();</script>

			<div id="test-activator" onclick="dialog_pop_up_open(1)" style="
			position: relative;
			display: block;
			bottom: 251px;
			left: 430px;
			border-radius: 4px;
			width: 40px;
			margin-right: -40px;
			height: 37px;
			margin-bottom: -37px;
			background: rgba(248, 246, 201, 0.4);
			"
			></div>

			<!-- Render php for displaying the calendar entry pop-up-->
			<?php  include 'layout/dialog_pop_up/dialog_pop_up.php'; ?>
		</td>
	<tr>
</table>