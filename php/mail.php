<?php
session_id($_REQUEST['sess_id']);
session_start();

use PHPMailer\PHPMailer\PHPMailer;
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$_SESSION['token'] = uniqid();

$destination = $_REQUEST['mail'];

$mail = new PHPMailer();
$mail->isSMTP();
$mail->Host = "smtp.gmail.com";
$mail->Port = 587;
$mail->SMTPAuth = true;
$mail->CharSet = 'UTF-8';
// Authentification
$mail->Username = 'ballotin.l3info@gmail.com';
$mail->Password = 'Ballotin';

$mail->setFrom('ballotin.l3info@gmail.com');

$mail->addAddress($destination);

$mail->Subject = 'Réinitialisation de votre mot de passe Ballotin';
$mail->Body = "<p>Voici votre Token de réinitialisation de mot de passe:</p> <strong>$_SESSION[token]</strong>";
$mail->IsHTML(true);

if($mail->send()) {
    	echo json_encode(true);
} else {
	echo json_encode(false);
}    	
?>
