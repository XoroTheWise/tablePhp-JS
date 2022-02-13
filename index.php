<?php
include 'bd.php';
session_start();
$user_id = $_SESSION['id'];
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/main.css">
    <title>testInterLabs</title>
  </head>
  <body>
    <div class="div-body">

    <?php
    $query = mysqli_query($bd, "SELECT * FROM users WHERE id = '$user_id'");
    $user = mysqli_fetch_assoc($query);

// Если сессии нет - вывод формы авторизации

  if (empty($user)) { ?>
    <form class="formLog">
      <input type="text" name="email" placeholder="электронная почта">
      <input type="text" name="password" placeholder="пароль">
      <input type="submit" class="search-btn" value="Войти">
    </form>
    <br>
    <p>email: kek@yandex.ru </p>
    <p>password: 1</p>
    <p>( Юзер чекается в бд )</p>
    <p class="message-failed"></p>
    <hr>
    <p>AJAX / JQuery</p>

<!-- Если сессия есть - вывод таблицы и данных -->

  <?php } else {   ?>
    <div class="div-left">
       <p class="message" style="color:red;"></p>
    <table class="tabble">
       <tr class="td_title">
          <td class="td_record">Id</td>
          <td class="td_record">FIO</td>
          <td class="td_record">Email</td>
          <td class="td_record">Address</td>
       </tr>
      <?php

          if (isset($_GET['page'])) {       //Вывод постранично
            $page = $_GET['page'];
          } else {
            $page=1;
          }
          $count = 5;
          $page_count = ($page-1 ) * $count;
          $query = mysqli_query($bd, "SELECT * FROM users WHERE id > 0 LIMIT $page_count,$count");

          for ($i = $page*$count; $i < ($page+1)*$count; $i++) {
             $users = mysqli_fetch_assoc($query);
             if (isset($users)) {
       ?>

       <!-- Вывод таблицы -->

       <tr class="td_body">
          <td class="td_record rec_id"><? echo $users['id']; ?></td>
          <td class="td_record rec_fio"><? echo $users['fio']; ?></td>
          <td class="td_record rec_email"><? echo $users['email']; ?></td>
          <td class="td_record rec_address"><? echo $users['address']; ?></td>
          <td class="td_checkbox"><input style="width:20px; height:20px" type="checkbox" class="checkbox"></td>
          <td class="td-btn-edit"><img src="1159633.png" class="btn-edit"></td>
       </tr>
     <?php }}  ?>


    </table>

    <!-- Пагинация -->

    <div class="top-table">
      <?php
      $queryy = mysqli_query($bd, "SELECT * FROM users");
      $num = mysqli_num_rows($queryy);
      $pageCount = ceil($num / $count);

      if ($page != 1) {
        $prev = $page - 1;
      }

      ?>
      <!-- <a href="?page=<?php if ($prev<=0){$prev=1;} echo $prev ?>" class="pug-num"><</a> -->


      <?php
      for ($i=1; $i <= $pageCount; $i++) {
        if ($page == $i) {
          ?> <a href="?page=<?php echo $i; ?>" class="pug-num active"><?php echo $i; ?></a>  <?php
        } else {
        ?>
        <a href="?page=<?php echo $i; ?>" class="pug-num"><?php echo $i; ?></a>
      <?php } }


      if ($page != $pageCount) {
        $next = $page+1;
      }
      ?>
      <!-- <a href="?page=<?php if ($next<=$pageCount){$next=$pageCount;} echo $next ?>" class="pug-num">></a> -->


      <input type="submit" value="Удалить отмеченные" class="delete_records">

    </div>



     </div>

    <div class="div-right">
      <form action="sessionDestroy.php" method="post">
        <input type="submit" value="Выйти" class="btn-right">
      </form>
      <input type="submit" value="Добавить нового пользователя" class="add-input-user btn-right">


      <p>Id: <span><?php echo $user['id']; ?></span></p>
      <p>FIO: <span><?php echo $user['fio']; ?></span></p>
      <p>Email: <span><?php echo $user['email']; ?></span></p>
      <p>Address: <span><?php echo $user['address']; ?></span></p>
      <p>password: <span><?php echo $user['password']; ?></span></p>
    </div>
  <?php } ?>
  </div>

    <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="main.js"></script>
  </body>
</html>
