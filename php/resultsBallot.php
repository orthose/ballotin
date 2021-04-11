<?php

// Pas de vérification du numéro de scrutin
require("libBallot.php");

// fichier correspondant à $_REQUEST["numBallot"]
$file = path.$_REQUEST["numBallot"].format;
$data = json_decode(file_get_contents($file), true);

// Format de l'objet renvoyé à AJAX
$res = array("entries" => 0, "voters" => 0, "results" => array());

// Valeur absolue du nombre de votes reçus
$res["entries"] = count($data["results"]);

// Cas de la liste Anonyme où tout le monde peut voter
if ($data["voters"] === "all" || $data["voters"] === null) {
	// On récupère le nombre d'utilisateurs du système
	//$nusers = shell_exec("wc -l ../secret/passwd.txt | cut -f1 -d' '");
	//$res["rate"] = ((float)$res["entries"] / (float)$nusers) * 100.;
	$res["voters"] = shell_exec("wc -l ../secret/passwd.txt | cut -f1 -d' '");
}
// Cas général
else {
	// Nombre de votants
	//$nvoters = count($data["voters"]);
	//$res["rate"] = ((float)$res["entries"] / (float)$nvoters) * 100.;
	$res["voters"] = count($data["voters"]);
}

// Vérification que le scurtin est clôturé
$closed = false;
// Cas de la liste Anonyme
if ($data["voters"] === null) {
	$closed = true;
}
// Cas général
else if (is_array($data["voters"])) {
	$closed = true;
	foreach ($data["voters"] as $key => $value) {
		$closed = $closed && ($data["voters"][$key] === 0);
	}
}

// Remplissage éventuel des résultats
if ($closed) {
	// On prépare les résultats
	foreach ($data["options"] as $option) {
		$res["results"][$option] = 0;
	}
	// On effectue le dépouillement
	foreach ($data["results"] as $option) {
		$res["results"][$option] += 1;
	}
}

echo json_encode($res);

?>