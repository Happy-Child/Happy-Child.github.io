<?php

$email_to = 'lazuka_99@mail.ru';

$subject="Заявка с сайта на расчет стоимости кухни";
$msg = '';


if ( $_POST['type'] == "questions" ) {
	// $picture = '';

	// if (!empty($_POST['q-8'][1]['tmp_name'])) {
	//   $path = $_POST['q-8'][1]['name']; 
	//   if (copy($_POST['q-8'][1]['tmp_name'], $path)) $picture = $path; 
	// }

	// $msg .= $picture '<br>';

	$msg .= '<b>Вопросы:</b>' . '<br>';
	$msg .= '<b>Планировка кухни:</b> ' . $_POST['q-1'] . '<br>';


	if ( $_POST['q-2'] == "Не знаю размеров" ) {
		$msg .= '<b>Размеры кухни:</b> ' . $_POST['q-2'] . '<br>';
	} else if ( !!$_POST['q-2'][0] ) {
		$msg .= '<b>Размеры кухни:</b> ' . '<br>';
		if ( $_POST['q-2'][0] ) {$msg .= '<b>X:</b> ' . $_POST['q-2'][0] . '<br>';}
		if ( $_POST['q-2'][1] ) {$msg .= '<b>Y:</b> ' . $_POST['q-2'][1] . '<br>';}
		if ( $_POST['q-2'][2] ) {$msg .= '<b>Z:</b> ' . $_POST['q-2'][2] . '<br>';}
	} else {
		$msg .= '<b>Размеры кухни:</b> Не знаю размеров' . '<br>';
	}

	$msg .= '<b>Материал фасадов:</b> ' . $_POST['q-3'] . '<br>'; 
	$msg .= '<b>Столешница:</b> ' . $_POST['q-4']. '<br>'; 
	$msg .= '<b>Тип фурнитуры:</b> ' . $_POST['q-5'] . '<br>'; 
	$msg .= '<b>Бюджет:</b> ' . $_POST['q-6'] . '<br>'; 
	$msg .= '<b>Подарок:</b> ' . $_POST['q-7'] . '<br>'; 
	if ( !!$_POST['q-8'][0] ) { $msg .= '<b>Выслать на:</b> ' . $_POST['q-8'][0] . '<br>'; }

	$msg .= '<b>Номер:</b> ' . $_POST['phone'] . '<br>'; 
} else if ( $_POST['type'] == "mail" ) {
	$msg .= '<b>Обратная связь:</b>' . '<br>';
	$msg .= '<b>Имя:</b> ' . $_POST['name'] . '<br>';
	$msg .= '<b>Номер:</b> ' . $_POST['phone'] . '<br>';
}

$headers  = 'Content-type: text/html; charset=utf-8' . "\r\n";
$header .= "MIME-Version: 1.0\r\n";
$headers .= 'From: Comfy <no-reply@domain.by>'. "\r\n";

mail($email_to, $subject, $msg, $headers);

?>
