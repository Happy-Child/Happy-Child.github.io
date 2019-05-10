<?php

//Upload files --------------------- START
require_once 'PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;
$mail->IsSMTP();
$mail->SMTPDebug = 1;
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'ssl';
$mail->Host = "smtp.gmail.com";
$mail->Port = 465; // or 587
$mail->IsHTML(true);
$mail->Username = "sendingsivenkov@gmail.com";
$mail->Password = "1Jfdks8Hns";
$mail->setFrom('mozerqake1999@gmail.com', 'Заявка с сайта sivenkov.by');
$mail->addAddress('mozerqake1999@gmail.com', 'Заявка с сайта sivenkov.by');
$mail->addReplyTo('mozerqake1999@gmail.com', 'Заявка с сайта sivenkov.by');
$mail->isHTML(true);
$mail->Subject = 'Заявка с сайта Sivenkov.by';


$name = $_POST["name"];
$company = $_POST["company"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$message = $_POST["text"];


$mail->Body = 'Имя: ' . $name . "\n";
$mail->Body .= 'Название компании: ' . $company . "\n";
$mail->Body .= 'Email: ' . $email . "\n";
$mail->Body .= 'Телефон: ' . $phone . "\n";
$mail->Body .= 'Сообщение: ' . $message . "\n";


$sendMail = $mail->send();
if (!$sendMail) echo 'Mailer Error: ' . $mail->ErrorInfo;
else echo 'Mailer SENDSENDSEND';

?>