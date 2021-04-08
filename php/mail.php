<?php
use PHPMailer\PHPMailer\PHPMailer;
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$destination = $_REQUEST['mail'];

$mail = new PHPMailer();
$mail->isSMTP();
$mail->Host = "smtp.gmail.com";
$mail->Port = 587;
$mail->SMTPAuth = true;
// Authentification
$mail->Username = 'ballotin.l3info@gmail.com';
$mail->Password = 'Ballotin';

$mail->setFrom('ballotin.l3info@gmail.com');

$mail->addAddress($destination);

$mail->Subject = 'Here is the subject';
$mail->Body = 'This is the body.';

try {
    $mail->send();
    echo json_encode(true);
} catch (Exception $e) {
    echo json_encode(false);
}
?>
