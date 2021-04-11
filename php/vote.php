<?php

// Pas de vérification du numéro de scrutin
require("libBallot.php");
$file = path.$_REQUEST["numBallot"].format;

$voter = $_REQUEST["voter"];
$option = $_REQUEST["option"];

// Renvoie le json du fichier correspondant à $_REQUEST["numBallot"]
$res = json_decode(file_get_contents($file), true);
// On met à jour le nombre de procurations
// Cas de la liste Anonyme (tout le monde peut voter 1 fois)
if ($res["voters"] === "all" && !in_array($voter, $res["registered"])) {
	// L'électeur dépense son unique vote
	array_push($res["registered"], $voter);

	// Enregistrement du choix de vote
	array_push($res["results"], $option);

	// Enregistrement dans le fichier
	file_put_contents($file, json_encode($res, JSON_PRETTY_PRINT));

	echo json_encode(array(true, 0));
}
// Cas général
else if ($res["voters"] !== "all" && $res["voters"] !== null && $res["voters"][$voter] > 0) {
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