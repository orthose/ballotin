<?php

// Récupère tous les utilisateurs puis vérifie
// que l'utlisateur en argument existe déjà
function checkUser($user) {
	$cmd = "cut -f1 -d: ../secret/passwd.txt";
	$all_users = shell_exec($cmd);
	$all_users = preg_split("/\n/", $all_users);
	return in_array($user, $all_users);
}

$login = trim($_REQUEST["login"]);
$passwd = trim($_REQUEST["passwd"]);
$override = json_decode($_REQUEST["override"]);

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
else if (!$override && checkUser($login)) {
	echo json_encode(-3);
}

else {
	// Simples quoted 'passwd' pour protéger injection bash
	$cmd = "htpasswd -b ../secret/passwd.txt $login '$passwd'";
	$test = system($cmd, $res);
	// Code d'erreur = 0 si succès de mise à jour
	// Code d'erreur in [1-7] si problème rencontré
	echo json_encode($res);
}

?>