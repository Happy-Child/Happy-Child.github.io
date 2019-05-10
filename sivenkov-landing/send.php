<?php

//Upload files --------------------- START
require_once 'PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';

$mail->IsSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPAuth = true;
$mail->Username = "mozerqake1999@gmail.com";
$mail->Password = "EMassa99";
$mail->setFrom('mozerqake1999@gmail.com', 'Заявка с сайта Sivenkov.by');
// $mail->addAddress('sivenkovvlad@gmail.com', 'Заявка с сайта Sivenkov.by');
$mail->addAddress('lazuka_99@mail.ru', 'Заявка с сайта Sivenkov.by');
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

?>