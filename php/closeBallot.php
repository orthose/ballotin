<?php

// Pas de vérification du numéro de scrutin
require("libBallot.php");

// fichier correspondant à $_REQUEST["numBallot"]
$file = path.$_REQUEST["numBallot"].format;
$res = json_decode(file_get_contents($file), true);

// Cas de la liste Anonyme
if ($res["voters"] == "all") {
	$res["voters"] = null;
}
// Cas général
else if (is_array($res["voters"])) {
	// Mise à zéro de toutes les procurations
	// Plus personne ne peut voter
	foreach ($res["voters"] as $key => $value) {
		$res["voters"][$key] = 0;
	}
}

// Enregistrement du fichier
file_put_contents($file, json_encode($res, JSON_PRETTY_PRINT));

?>