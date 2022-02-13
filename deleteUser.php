<?php
include 'bd.php';

//удаление пользователя

$users_id = $_POST['users_id'];
$checkDelete = 0;

for ($i=0; $i < count($users_id); $i++) {
  $query = mysqli_query($bd, "DELETE FROM users WHERE id = '$users_id[$i]'");
  // $user = mysqli_fetch_assoc($query);
  $checkDelete++;
}
if ($checkDelete == count($users_id)) {
  $response = [
    "status" => true
  ];
  echo json_encode($response);
}



 ?>
