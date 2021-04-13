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

// Sanitize options
foreach($res['options'] as $key => $data){
     $res['options'][$key] = htmlspecialchars($res['options'][$key]);
}

$res["results"] = array();
// Cas de la liste Anonyme
if ($res["voters"] === "all") {
	$res["registered"] = array();
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
