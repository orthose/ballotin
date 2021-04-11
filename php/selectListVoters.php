<?php

$file = "../secret/listVoters/".$_REQUEST["listVoters"].".json";

if (file_exists($file)) {
	$data = json_decode(file_get_contents($file), true);
	// Collage du nom de domaine
	if ($data["domain"] !== null) {
		foreach ($data["mails"] as $i => $v) {
			$data["mails"][$i] = $v.$data["domain"];
		} 
	}
	echo json_encode($data["mails"]);
}
else {
	echo json_encode(array());
}

?>