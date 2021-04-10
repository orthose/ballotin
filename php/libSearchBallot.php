<?php

const path = "../secret/";

// Renvoie tous les numéros de scrutin
function searchAllBallot() {
	$files = scandir(path);
	$pattern = "/ballot([0-9]+)\.json/";
	$res = array();
	// Parcours de tous les fichiers de la forme ballot48648.json
	foreach($files as $f) {
		$matches = array();
		if (preg_match($pattern, $f, $matches)) {
			array_push($res, $matches[1]);
		}
	}
	return $res;
}

?>