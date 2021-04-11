<?php

$path = "../secret/ballot";
$format = ".json";
// Scrutin numéroté aléatoirement
$number = rand();
$file = $path.$number.$format;
while (file_exists($file)) {
        $number = rand();
        $file = $path.$number.$format;
}

// On ajoute le champ des résultats au srutin
$res = $_REQUEST;
$res["results"] = array();

// Création du fichier
file_put_contents($file, json_encode($res, JSON_PRETTY_PRINT));
// On renvoie le numéro de scrutin
echo json_encode($number);

?>
