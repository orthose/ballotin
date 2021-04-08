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

file_put_contents($file, json_encode($_REQUEST, JSON_PRETTY_PRINT));
// On renvoie le numéro de scrutin
echo "<p>Le numéro de votre scrutin est : <b>".$number."</b></p>";

?>
