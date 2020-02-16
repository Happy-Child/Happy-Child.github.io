<?php

require 'PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;  
$mail->IsSMTP();
$mail->SMTPDebug = 1;
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'ssl';
$mail->Host = "smtp.gmail.com";
$mail->Port = 587; // or 465  
$mail->IsHTML(true);
$mail->Username = "sendingsivenkov@gmail.com";
$mail->Password = "1Jfdks8Hns";
$mail->setFrom('sendingsivenkov@gmail.com', 'Заявка с сайта Кроватки-Домики');
$mail->addAddress('mozerqake1999@gmail.com', 'Заявка с сайта Кроватки-Домики');
$mail->addReplyTo('mozerqake1999@gmail.com', 'Заявка с сайта Кроватки-Домики');
$mail->isHTML(true); 
$mail->Subject = 'Заявка с сайта Кроватки-Домики';

$name = $_POST["name"];

$mail->Body = 'Имя: ' . $name . "\n";
$mail->Body = 'All: ' . $_POST . "\n";

$sendMail = $mail->send();

if(!$sendMail) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}

?>

