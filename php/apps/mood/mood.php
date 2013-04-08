<div id="mood-main" onmousemove="bringUpHappyLevelScrollContainer(event);" onmouseout="hideHappyLevelScrollContainer()">
	<div id="mood-happy-meter-main">
		<?php include 'apps/mood/mood_happy_meter.php'; ?>
		<script>mood_happy_meter_init();</script>
	</div>
    <?php include 'apps/mood/mood_smiley_face.php'; ?>
	<script>mood_smiley_face_init();</script>
</div>