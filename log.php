<?php
include 'bd.php';
session_start();

// Запись сессии пользователя

$email = $_POST['email'];
$password = $_POST['password'];

$query = mysqli_query($bd, "SELECT * FROM users WHERE email = '$email' AND password = '$password'");
$user = mysqli_fetch_assoc($query);
if (empty($user)) {
  $response = [
    "status" => false,
    "message" => "Неверный email или password"
  ];
  echo json_encode($response);
} else {
  $response = [
    "status" => true
  ];
  $_SESSION['id'] = $user['id']; // Запоминаем id сессии
  echo json_encode($response);
}

?>
