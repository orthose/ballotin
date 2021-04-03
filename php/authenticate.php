<?php

$login = trim($_REQUEST["login"]);
$passwd = trim($_REQUEST["passwd"]);

// Vérification du format de l'email
if (filter_var($login, FILTER_VALIDATE_EMAIL)) {
	// Simples quoted 'passwd' pour protéger injection bash
	$cmd = "htpasswd -vb ../secret/passwd.txt $login '$passwd'";
	system($cmd, $res);
	// Code d'erreur = 0 si bon mot de passe
	// Code d'erreur = 3 si mauvais mot de passe
	echo json_encode($res === 0);
}
else {
	echo json_encode(false);
}

?>