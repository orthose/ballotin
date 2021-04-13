<?php

// Pas de vérification du numéro de scrutin
require("libBallot.php");

// fichier correspondant à $_REQUEST["numBallot"]
$file = path.$_REQUEST["numBallot"].format;
$res = json_decode(file_get_contents($file), true);

// Cas général (pas le cas de la liste Anonyme)
if ($res["voters"] !== "all") {
	// Mise à zéro de toutes les procurations
	// Plus personne ne peut voter
	foreach ($res["voters"] as $key => $value) {
		$res["voters"][$key] = 0;
	}
}

// Le scrutin a-t-il déjà été fermé ?
$yetClosed = false;
if ($res["closed"]) {
	$yetClosed = true;
}
// On ferme le scrutin
else {
	$res["closed"] = true;
}

// Enregistrement du fichier
file_put_contents($file, json_encode($res, JSON_PRETTY_PRINT));

// On renvoie les résultats pour le décryptage
echo json_encode(array($yetClosed, $res["results"]));

?>