<?php
include 'bd.php';

//Обновление данных пользователя

$id_record = $_POST['id_record'];
$fio_record = $_POST['fio_record'];
$email_record = $_POST['email_record'];
$address_record = $_POST['address_record'];

$query = mysqli_query($bd, "UPDATE `users` SET `fio` = '$fio_record', `email` = '$email_record', `address` = '$address_record' WHERE `users`.`id` = '$id_record'");
if ($query) {
  $response = [
    "status" => true,
    "id_record" => $id_record,
    "fio_record" => $fio_record,
    "email_record" => $email_record,
    "address_record" => $address_record,
  ];
  echo json_encode($response);
} else{
  $response =[
    "status" => false,
  ];
  echo json_encode($response);
}









 ?>
