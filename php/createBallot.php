<?php

$path = "../secret/ballot";
$format = ".json";
// Scrutin numéroté aléatoirement
do {
  $number = rand();
	$file = $path.$number.$format;
} while (file_exists($file));

file_put_contents($file, json_encode($_REQUEST, JSON_PRETTY_PRINT));

//TODO: Stocker dans un json tous les identifiants de scrutin

// On renvoie le numéro de scrutin
echo "<p>Le numéro de votre scrutin est : <b>".$number."</b></p>";

?>
