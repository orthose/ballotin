<?php

// Pas de vérification du numéro de scrutin
require("libSearchBallot.php");

// Renvoie le json du fichier correspondant
echo json_encode(json_decode(file_get_contents(path."ballot".$_REQUEST["numBallot"].".json"), true));

?>