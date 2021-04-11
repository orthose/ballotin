<?php

// Pas de vérification du numéro de scrutin
require("libBallot.php");

// Renvoie le json du fichier correspondant à $_REQUEST["numBallot"]
$file = path.$_REQUEST["numBallot"].format;
$res = json_decode(file_get_contents($file), true);

// Écrasement du champ results
$res["results"] = $_REQUEST["results"];

// Enregistrement du fichier
file_put_contents($file, json_encode($res, JSON_PRETTY_PRINT));

?>