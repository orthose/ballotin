<?php

require("libBallot.php");

// Vérifie que le numéro de scrutin existe
echo json_encode(in_array($_REQUEST["numBallot"], searchAllBallot()));

?>