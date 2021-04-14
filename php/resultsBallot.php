<?php

// Pas de vérification du numéro de scrutin
require("libBallot.php");

// fichier correspondant à $_REQUEST["numBallot"]
$file = path.$_REQUEST["numBallot"].format;
$data = json_decode(file_get_contents($file), true);

// Format de l'objet renvoyé à AJAX
$res = array("entries" => 0, "total" => 0, "results" => array());

// Valeur absolue du nombre de votes reçus
$res["entries"] = count($data["results"]);

// Cas de la liste Anonyme où tout le monde peut voter
if ($data["voters"] === "all") {
	// On récupère le nombre d'utilisateurs du système
	$res["total"] = shell_exec("wc -l ../secret/passwd.txt | cut -f1 -d' '");
}
// Cas général
else {
	// Nombre de votants au total
	$res["total"] = $data["total"];
}

// Remplissage éventuel des résultats
// si le scrutin est clôturé
if ($data["closed"]) {
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