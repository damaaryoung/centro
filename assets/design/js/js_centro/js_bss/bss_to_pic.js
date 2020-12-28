$('#btn_send_pic').click(function () {
  $('#form_send_BSStoPic').modal('show');
  get_user_received_bss()
  getKartuBSS()
  $("#loading-2").hide();
})

function closeFormBSStoPic() {
  $('#form_send_BSStoPic').modal('hide');
  $("#user_pic").empty();
}

// Get Received BSS
function get_user_received_bss() {
  $.ajax({
    url: base_url + "BSSController/get_user_received_bss",
    type: "GET",
    dataType: "json",
    success: function (respon) {
      let row = '';
      for (let i = 0; i < respon.length; i++) {
        row += `<option value="${respon[i]['user_id_received']}">${respon[i]['nama']}</option>`
      }
      $('#user_pic').append(row);
    }
  })
}

// Send BSS to PIC
$('#send_bss_to_pic').click(function () {
  let data = {
    kartu_number_awal: $("#no_kartu_awal").val(),
    kartu_number_akhir: $("#no_kartu_akhir").val(),
    user_id_received: $("#user_pic").val()
  }
  console.log(data)

  $.ajax({
    type: "POST",
    url: base_url + "BSSController/send_bss_to_pic",
    // headers: {
    //   "Authorization": token
    // },
    dataType: "json",
    data: data,
    beforeSend: function () {
      $('#loading-2').show();
    },
    success: function (respon) {
      toastr["success"](respon.message)
      setTimeout(function () {
        $('#form_send_BSStoPic').modal('hide');
      }, 1000);
      window.location = base_url + 'bss';
      $('#loading-2').hide();
    }
  });
})

//form Kolektor ketika status kartu Open
$('#employeeTable1').on('click','.kolektorClick', function () {
  $('#form_assign_kolektor').modal('show');
  $('#user_request').val(this.getAttribute('user_id_request'))
  $('#kartu_nomer_bss').val($(this).find('td.kartu_number').text())
  $("#loading-3").hide();
  getKolektor() 
})

function getKolektor() {
  $.ajax({
    url: base_url + "BSSController/getKolektor",
    type: "GET",
    dataType: "json",
    success: function (respon) {
      let row = '';
      for (let i = 0; i < respon.length; i++) {
        row += `<option value="${respon[i]['kolektor_id']}">${respon[i]['nama']}</option>`
      }
      $('#kolektor_id').append(row);
    }
  });
}

// ASSIGN form Kolektor 
$('#assign_kolektor').click(function(){
  let data = {
    user_id_request : $("#user_request").val(),
    kartu_number : $("#kartu_nomer_bss").val(),
    kolektor_id : $('#kolektor_id').val()
  }
  if ( confirm("Konfirmasi. Yakin Anda ingin Update data ini ??") == true) {
    $.ajax({
      url: base_url + "BSSController/update_assign_kolektor",
      type: "POST",
      dataType: "json",
      data: data,
      beforeSend: function () {
        $('#loading-3').show();
      },
      success: function (respon) {
        if(respon.success == true){
          toastr["success"](respon.message)
          window.location = base_url + 'bss';
          $('#loading-3').hide();
        }else{
            toastr["error"](respon.message)
            $('#loading-3').hide();
        }
      }
    })
  }else{
    return false;
  }
})

$('#employeeTable1').on('click','.update_assignClick', function () {
  $('#form_assign_update').modal('show');
  $('#kartu_number').val($(this).find('td.kartu_number').text())
  $('#loading-4').hide();
})

//Update form ASSIGN 
$('#update_form_assign').click(function(){
  let data ={
    kartu_number: $("#kartu_number").val(),
    status_assign : $("#status_assign").val(),
    keterangan: $("#keterangan_update").val()
  }
  $.ajax({
    url: base_url + "BSSController/update_from_assign",
    type: "POST",
    dataType: "json",
    data: data,
    beforeSend: function () {
      $('#loading-4').show();
    },
    success: function (respon) {
      if(respon.success == true){
        toastr["success"](respon.message)
        window.location = base_url + 'bss';
        $('#loading-4').hide();
      }else{
          toastr["error"](respon.message)
          $('#loading-4').hide();
      }
    }
  })
})