let btn_add_user = false;

// Скрипт кнопочки ВОЙТИ
$(".search-btn").click(function(e) {
    e.preventDefault();
    let email = $('input[name="email"]').val();
    let password  = $('input[name="password"]').val();
    $.ajax({
          url: "/log.php",
          type: "post",
          dataType: 'json',
          data: {
            email: email,
            password: password
          },
          success (data) {
            if (data.status) {
              $('.message-failed').css("display",  "none");
              location.reload();
            }
            else {
              $('.message-failed').css("display",  "block");
              $('.message-failed').text(data.message);
            }
          }
      });
})


// Скрипт кнопки "ДОБАВИТЬ НОВОГО ПОЛЬЗОВАТЕЛЯ"

$('.add-input-user').on('click', function(e){
  e.preventDefault();
  $('.tabble').append('<tr class="td_body"> <td class="rec_id"><input style="background:#FFD79E" readonly class="td_record rec_id" type="text" name="id" value=" "></td> <td class="rec_fio"><input class="td_record rec_fio" type="text" name="fio" value=" "></td> <td class="rec_email"><input class="td_record rec_email" type="text" name="email" value=" "></td> <td class="rec_address"><input class="td_record rec_address" type="text" name="address" value=" "> </td><td class="btnsBut"><div class="btn-add-user btn-add-clear"><img src="234.jpg" class="btn-add-userr"></div></td><td class="btnsBut"><div class="btn-clear-user btn-add-clear"><img src="17124.png"></div></td></tr>');

});


//Скрипт галочки при добавлении пользователя

$('body').on('click', '.btn-add-user', function (e) {
  e.preventDefault();

  let record = $(this).closest('.td_body');
  let id_record = $(this).closest(".td_body").children().find("input[name='id']").val();
  let fio_record = $(this).closest(".td_body").children().find("input[name='fio']").val();
  let email_record = $(this).closest(".td_body").children().find("input[name='email']").val();
  let address_record = $(this).closest(".td_body").children().find("input[name='address']").val();
  // let btns_record = $(this).closest(".td_body").children().find('.btn-add-clear');


if (fio_record === " " || email_record === " " || address_record === " ") {
  $('.message').text('Не все поля заполнены');
} else {
  $('.message').empty();



  let id_td = $(this).closest(".td_body").children("td[class='rec_id']");
  let id_fio = $(this).closest(".td_body").children("td[class='rec_fio']");
  let id_email = $(this).closest(".td_body").children("td[class='rec_email']");
  let id_address = $(this).closest(".td_body").children("td[class='rec_address']");
  let bbb = $(this).closest(".td_body").children("td[class='btnsBut']");
   // console.log(dd);
  $.ajax({
        url: "/createUser.php",
        type: "post",
        dataType: "json",
        data: {
          id_record: id_record,
          fio_record: fio_record,
          email_record: email_record,
          address_record: address_record
        },
        success (data) {
          if (data.insert_status == true) {
            $(id_td).replaceWith("<td class='td_record rec_id'>"+ data.user_id +"</td>");
            $(id_fio).replaceWith("<td class='td_record rec_fio'>"+ fio_record +"</td>");
            $(id_email).replaceWith("<td class='td_record rec_email'>"+ email_record +"</td>");
            $(id_address).replaceWith("<td class='td_record rec_address'>"+ address_record +"</td>");
            $(record).append('<td class="td_checkbox"><input style="width:20px; height:20px" type="checkbox" class="checkbox"></td>');
            $(record).append('<td class="td-btn-edit"><img src="1159633.png" class="btn-edit"></td>');
            $(bbb).remove();
          }
        }
    });
  }
});


//Скрипт крестика

$('body').on('click', '.btn-clear-user', function (e) {
  e.preventDefault();
  let record = $(this).closest('.td_body');
  $(record).remove();
});


//Скрипт кнопки УДАЛИТЬ ОТМЕЧЕННЫЕ

$('body').on('click', '.delete_records', function (e) {
  e.preventDefault();
  let checked = [];
  $('.checkbox:checked').each(function(e) {
	   checked.push($(this).parents(".td_body").children('.rec_id').text());
  });
 $.ajax({
       url: "/deleteUser.php",
       type: "post",
       dataType: "json",
       data: {
         users_id: checked,
       },
       success (data) {
         if (data.status == true) {
           console.log("TRUE QUERY");
           $('.checkbox:checked').each(function(e) {
             $(this).parents(".td_body").remove();
           });
         }
       }
   });
});


//Скрипт иконки редактировать

$('body').on("click", ".btn-edit", function (e) {
  e.preventDefault();

  let record = $(this).closest('.td_body');
  let id_record = $(this).closest(".td_body").children('.rec_id').text();
  let fio_record = $(this).closest(".td_body").children(".rec_fio").text();
  let email_record = $(this).closest(".td_body").children(".rec_email").text();
  let address_record = $(this).closest(".td_body").children(".rec_address").text();

  let id_td = $(this).closest(".td_body").children('.rec_id');
  let id_fio = $(this).closest(".td_body").children(".rec_fio");
  let id_email = $(this).closest(".td_body").children(".rec_email");
  let id_address = $(this).closest(".td_body").children(".rec_address");

  $(id_td).replaceWith('<td class="rec_id"><input style="background:#FFD79E" readonly class="td_record rec_id" type="text" name="id" value="'+ id_record +'"></td>');
  $(id_fio).replaceWith('<td class="rec_fio"><input class="td_record rec_fio" type="text" name="fio" value="'+ fio_record +'"></td>');
  $(id_email).replaceWith('<td class="rec_email"><input class="td_record rec_email" type="text" name="email" value="'+ email_record +'"></td>');
  $(id_address).replaceWith('<td class="rec_address"><input class="td_record rec_address" type="text" name="address" value="'+ address_record +'"> </td>');
  $(record).children('.td_checkbox').remove();
  $(record).children('.td-btn-edit').remove();
  $(record).append('<td class="td-btn-edit-app"><img src="234.jpg" class="btn-imp-app"></td>');
})


//Скрипт галочки при редактировании

$('body').on("click", ".td-btn-edit-app", function (e) {

  let record = $(this).closest('.td_body');
  let id_record = $(this).closest(".td_body").children().find("input[name='id']").val();
  let fio_record = $(this).closest(".td_body").children().find("input[name='fio']").val();
  let email_record = $(this).closest(".td_body").children().find("input[name='email']").val();
  let address_record = $(this).closest(".td_body").children().find("input[name='address']").val();

  let id_td = $(this).closest(".td_body").children('.rec_id');
  let id_fio = $(this).closest(".td_body").children(".rec_fio");
  let id_email = $(this).closest(".td_body").children(".rec_email");
  let id_address = $(this).closest(".td_body").children(".rec_address");
  let td_btn_edit_app = $(this).closest(".td_body").children(".td-btn-edit-app");

  $.ajax({
        url: "/appUsers.php",
        type: "post",
        dataType: "json",
        data: {
          id_record: id_record,
          fio_record: fio_record,
          email_record: email_record,
          address_record: address_record
        },
        success (data) {
          if (data.status == true) {
            $(id_td).replaceWith("<td class='td_record rec_id'>"+ data.id_record +"</td>");
            $(id_fio).replaceWith("<td class='td_record rec_fio'>"+ data.fio_record +"</td>");
            $(id_email).replaceWith("<td class='td_record rec_email'>"+ data.email_record +"</td>");
            $(id_address).replaceWith("<td class='td_record rec_address'>"+ data.address_record +"</td>");
            $(record).append('<td class="td_checkbox"><input style="width:20px; height:20px" type="checkbox" class="checkbox"></td>');
            $(record).append('<td class="td-btn-edit"><img src="1159633.png" class="btn-edit"></td>');
            $(td_btn_edit_app).remove();
          }
        }
    });

})






    // $(this).empty();
    // $(this).append();
// });
