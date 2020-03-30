<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

$emailAdress = $_POST["email"];
$subject = $_POST["subject"];
$message = $_POST["message"];

require './vendor/autoload.php';
require './credentials.php';

$mail = new PHPMailer;

$mail->isSMTP();

$mail->SMTPDebug = SMTP::DEBUG_SERVER;

$mail->Host = 'smtp.gmail.com';

$mail->Port = 587;

$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

$mail->SMTPAuth = true;

$mail->Username = $email;

$mail->Password = $password;

$mail->setFrom('no-reply@dorfingerjonas.at', 'Jonas Dorfinger');

$mail->addReplyTo('office@dorfingerjonas.at', 'Jonas Dorfinger');

$mail->addAddress($emailAdress);

$mail->Subject = $subject;

$mail->msgHTML($message);

$mail->AltBody = 'Informations from https://dorfingerjonas.at/.';

if (!$mail->send()) {
    echo json_encode(false);
} else {
    echo json_encode(true);
}