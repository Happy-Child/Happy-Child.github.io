<?php

$name = $_POST['name'];
$phone = $_POST['phone'];

$to = "lazuka_99@mail.ru";

$header .= "Content-type: text/html; charset=utf-8\r\n";
$header .= "MIME-Version: 1.0\r\n";
$sending = mail($to, $subject, $text, $headers);

if($sending) echo "ОК, письмо отправлено.";
else echo "Error";

?>
