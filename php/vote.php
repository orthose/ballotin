<?php

// Pas de vérification du numéro de scrutin
require("libBallot.php");
$file = path.$_REQUEST["numBallot"].format;

$voter = $_REQUEST["voter"];
$option = $_REQUEST["option"];

// Renvoie le json du fichier cordatapondant à $_REQUEST["numBallot"]
$data = json_decode(file_get_contents($file), true);

// On ne peut voter que si le scrutin est encore ouvert
if (!$data["closed"]) {
	// On met à jour le nombre de procurations
	// Cas de la liste Anonyme (tout le monde peut voter 1 fois)
	if ($data["voters"] === "all" && !in_array($voter, $data["registered"])) {
		// L'électeur dépense son unique vote
		array_push($data["registered"], $voter);

		// Enregistrement du choix de vote
		array_push($data["results"], $option);
		// Mélange des résultats
		shuffle($data["results"]);

		// Enregistrement dans le fichier
		file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));

		echo json_encode(array(true, 0));
	}
	// Cas général
	else if (is_array($data["voters"]) && $data["voters"][$voter] > 0) {
		// L'électeur dépense un vote
		$data["voters"][$voter] -= 1;

		// Enregistrement du choix de vote
		array_push($data["results"], $option);
		// Mélange des résultats
		shuffle($data["results"]);

		// Enregistrement dans le fichier
		file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));

		echo json_encode(array(true, $data["voters"][$voter]));
	}
	// L'électeur ne peut plus voter
	else {
		echo json_encode(array(false, 0));
	}
}
// L'électeur ne peut plus voter
else {
	echo json_encode(array(false, 0));
}

?>