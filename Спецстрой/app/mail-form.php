<?php

$name = $_GET['name'];
$phone = $_GET['phone'];

$subject = "Новая заявка с сайта 'Радуга'";
$text = "Имя: $name\n Телефон: $phone\n";

$to = "lazuka_99@mail.ru";

$header .= "Content-type: text/html; charset=utf-8\r\n";
$header .= "MIME-Version: 1.0\r\n";
$sending = mail($to, $subject, $text, $headers);

if ($sending) echo "ОК, письмо отправлено.";


?>
