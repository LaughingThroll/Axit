<?php

$userName = $_GET['name'];
$userMail = $_GET['mail'];
$userSubject = $_GET['subject'];
$userMessage = $_GET['message'];

echo 'Ваше имя'.$userName;
echo 'Ваш e-mail'.$userMail;
echo 'Ваша тема'.$userSubject;
echo 'Ваше сообщение'.$userMessage;