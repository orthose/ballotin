<?php

// Permet de reporter un bogue
$file = "../secret/bug-report.txt";
$data = json_decode(file_get_contents($file), true);
array_push($data, $_REQUEST["bugtxt"]);
file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));

?>