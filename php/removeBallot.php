<?php

// Pas de vérification du numéro de scrutin
require("libBallot.php");

// Suppression du fichier de numéro de scrutin $_REQUEST["numBallot"]
unlink(path.$_REQUEST["numBallot"].format);

?>