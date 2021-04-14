<?php

require("libBallot.php");

// Scrutin numéroté aléatoirement
$number = 0; $file = "";
do {
	$number = rand();
  $file = path.$number.format;
} while(file_exists($file));

$res = $_REQUEST;

// Nettoyage des options pour éviter injection de script
foreach ($res['options'] as $i => $option){
     $res['options'][$i] = htmlspecialchars($option);
}
// On ajoute le champ des résultats au srutin
$res["results"] = array();
// On ajoute le champ indiquant si le scrutin est fermé
$res["closed"] = false;
// Cas de la liste Anonyme
if ($res["voters"] === "all") {
	// Tableau des personnes ayant déjà voté
	$res["registered"] = array();
}
// Cas général
else {
	// On compte le nombre de votants en comptant
	// le nombre de procurations
	$res["total"] = 0;
	foreach ($res["voters"] as $voter => $power) {
		$res["total"] += $power;
	}
}

// Création (clé privée, clé publique)
// pour le cryptage des scrutins
$privkey = openssl_pkey_new(
	array(
    "private_key_bits" => 2048,
    "private_key_type" => OPENSSL_KEYTYPE_RSA,
	)
);

$pubkey = openssl_pkey_get_details($privkey)['key'];
openssl_pkey_export($privkey, $privkey);
$res["pubkey"] = $pubkey;

// Création du fichier
file_put_contents($file, json_encode($res, JSON_PRETTY_PRINT));
// On renvoie le numéro de scrutin
echo json_encode(array("numBallot" => $number, "privkey" => $privkey));

?>
