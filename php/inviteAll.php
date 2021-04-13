<?php
use PHPMailer\PHPMailer\PHPMailer;
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$voters = $_REQUEST['voters'];
$code = $_REQUEST['code'];

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

foreach ($voters as $voterEmail) {
    $mail->addAddress($voterEmail);
}

$mail->Subject = 'Votre vote compte !';
$mail->Body = "<p>Vous avez été invité à voter à un scrutin, son code est</p> <strong>$code</strong>";
$mail->IsHTML(true);

if($mail->send()) {
    	echo json_encode(true);
} else {
	echo json_encode(false);
}    	
?>
