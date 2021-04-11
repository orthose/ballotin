<?php
	session_id($_REQUEST['sess_id']);
	session_start();
	echo json_encode($_REQUEST['token'] === $_SESSION['token']);
?>