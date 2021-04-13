<?php

require("libBallot.php");

// Deux modes de recherche possible
// $_REQUEST["mode"] = true -> recherche de scrutins pour lesquels voter
// $_REQUEST["mode"] = false -> recherche de scrutins à manager

$res = array();
// Parcours de tous les numéros de scrutin et filtrage
foreach (searchAllBallot() as $num) {
	$data = json_decode(file_get_contents(path.$num.format), true);
	// Scrutins pour lesquels voter
	if (json_decode($_REQUEST["mode"]) 
		&& ($data["voters"] === "all" || $data["voters"] === null
			|| in_array($_REQUEST["organiser"], array_keys($data["voters"]))
		)
	) {
		array_push($res, array($data["organiser"], $num));
	}
	// Scrutins à manager
	else if ($data["organiser"] === $_REQUEST["organiser"]) {
		array_push($res, array($data["organiser"], $num));
	}
}
echo json_encode($res);

?>