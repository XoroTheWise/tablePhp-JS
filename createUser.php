<?php
include 'bd.php';

//Добавление пользователя

// $id_record = $_POST['id_record'];
$fio_record = $_POST['fio_record'];
$email_record = $_POST['email_record'];
$address_record = $_POST['address_record'];

$query = mysqli_query($bd, "INSERT INTO users (`fio`, `email`, `address`, `password`) VALUES ('$fio_record', '$email_record', '$address_record', '1');");

if ($query) {
  $ss = mysqli_query($bd, "SELECT * FROM users WHERE fio = '$fio_record' AND email = '$email_record' and address = '$address_record'");
  $user = mysqli_fetch_assoc($ss);
  $response = [
    "insert_status" => true,
    "user_id" => $user['id'],
  ];
    echo json_encode($response);
} else {
  $response = [
    "insert_status" => false
  ];
}
?>
