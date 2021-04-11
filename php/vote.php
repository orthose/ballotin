<?php

// Pas de vérification du numéro de scrutin
require("libSearchBallot.php");
$file = path."ballot".$_REQUEST["numBallot"].".json";

$voter = $_REQUEST["voter"];
$option = $_REQUEST["option"];

// Renvoie le json du fichier correspondant à $_REQUEST["numBallot"]
$res = json_decode(file_get_contents($file), true);
// On met à jour le nombre de procurations
if ($res["voters"][$voter] > 0) {
	// L'électeur dépense un vote
	$res["voters"][$voter] -= 1;

	// Enregistrement du choix de vote
	array_push($res["results"], $option);

	// Enregistrement dans le fichier
	file_put_contents($file, json_encode($res, JSON_PRETTY_PRINT));

	echo json_encode(array(true, $res["voters"][$voter]));
}
// L'électeur ne peut plus voter
else {
	echo json_encode(array(false, 0));
}

?>