<?php

// Récupère tous les utilisateurs puis vérifie
// que l'utlisateur en argument existe déjà
function checkUser($user) {
	$cmd = "cut -f1 -d: ../secret/passwd.txt";
	$all_users = shell_exec($cmd);
	$all_users = preg_split("/\n/", $all_users);
	return in_array($user, $all_users);
}

?>