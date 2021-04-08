<?php

require("checkUser.php");

$login = trim($_REQUEST["login"]);
$passwd = trim($_REQUEST["passwd"]);

// Taille minimale du password = 8
$pattern_passwd = "/[\w\s]{8}[\w\s]*/";
if (!preg_match($pattern_passwd, $passwd)) {
	echo json_encode(-1);
}

// Vérification du format de l'email
else if (!filter_var($login, FILTER_VALIDATE_EMAIL)) {
	echo json_encode(-2);
}

// Vérification que l'utilisateur n'existe pas déjà
else if (!checkUser($login)) {
	echo json_encode(-3);
}

else {
	// Simples quoted 'passwd' pour protéger injection bash
	$cmd = "htpasswd -b ../secret/passwd.txt $login '$passwd'";
	system($cmd, $res);
	// Code d'erreur = 0 si succès de mise à jour
	// Code d'erreur in [1-7] si problème rencontré
	echo json_encode($res);
}

?>