<?php

// Pas de vérification du numéro de scrutin
require("libSearchBallot.php");

// Renvoie le json du fichier correspondant à $_REQUEST["numBallot"]
$res = json_decode(file_get_contents(path."ballot".$_REQUEST["numBallot"].".json"), true);
// On supprime les champs sensibles auxquels
// on a accès que via des fichiers PHP spécifiques
unset($res["voters"]);
if (isset($res["results"])) {
	unset($res["results"]);
}
echo json_encode($res);

?>