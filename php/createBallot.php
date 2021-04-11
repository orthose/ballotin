<?php

require("libBallot.php");

// Scrutin numéroté aléatoirement
$number = 0; $file = "";
do {
	$number = rand();
  $file = path.$number.format;
} while(file_exists($file));

// On ajoute le champ des résultats au srutin
$res = $_REQUEST;
$res["results"] = array();
// Cas de la liste Anonyme
if ($res["voters"] === "all") {
	$res["registered"] = array();
}

// Création du fichier
file_put_contents($file, json_encode($res, JSON_PRETTY_PRINT));
// On renvoie le numéro de scrutin
echo json_encode($number);

?>
