<div id="tabs-calendar-main-entry-tabs" class="tabs-calendar-container">
	
	<!-- Interactive tabs-->
	<div id="tabs-calendar-main-entry-tab-top" onclick="openTabTop()">
		<?php include 'apps/diary/diary_date.php'; ?>
		<script>diary_date_init();</script>
	</div>
	<div id="tabs-calendar-main-entry-tab-one" onclick="openTab('one')">
	</div>
	<div id="tabs-calendar-main-entry-tab-two" onclick="openTab('two')">
	</div>
	<div id="tabs-calendar-main-entry-tab-three" onclick="openTab('three')">
	</div>

	<!-- Tab content containers -->
	<div id="tabs-calendar-main-entry-tab-top-box">
		<?php include 'apps/diary/diary.php'; ?>
		<script>diary_init();</script>
	</div>
	<div id="tabs-calendar-main-entry-tab-one-box" class="tabs-calendar-container">
		<?php include 'apps/mood/mood.php'; ?>
	</div>
	<div id="tabs-calendar-main-entry-tab-two-box" class="tabs-calendar-container">
	</div>
	<div id="tabs-calendar-main-entry-tab-three-box"class="tabs-calendar-container">
	</div>
</div>