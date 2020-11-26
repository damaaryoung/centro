let base_url = $('#base_url').val();
$(document).ready(function () {
  $('#employeeTable1').DataTable({
    "scrollX": true,
    "autoWidth": false,
    "aaSorting": [],
    "searching": false,
  });
});

$('#status').change(function () {
  let status = $(this).val();
  let kode_area = $('#kode_kantor').val();
  let searching = $("#search").val();
  serchBSS(status, kode_area, searching);
});

$('#kode_kantor').change(function () {
  let status = $('#status').val();
  let kode_area = $(this).val();
  let searching = $("#search").val();
  serchBSS(status, kode_area, searching);
});

$('#search').keypress(function (event) {
  let keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    let status = $('#status').val();
    let kode_area = $('#kode_kantor').val();
    let searching = $("#search").val();
    serchBSS(status, kode_area, searching);
  }
});

function serchBSS(status, kode_area, searching) {
  let data = {
    status: status,
    area: kode_area,
    search: searching,
  };
  //   let token = localStorage.getItem("token");
  $.ajax({
    type: "POST",
    url: base_url + "BSSController/getSearch",
    // headers: {
    //   "Authorization": token
    // },
    dataType: "json",
    data: data,
    beforeSend: function () {
      $('#loading').show();
    },
    success: function (respon) {
      if (respon.success == true) {
        $('#employeeTable1').DataTable().clear();
        $('#employeeTable1').DataTable().destroy();
        let obj = respon.data;
        let row = "";
        for (let i = 0; i < respon.data.length; i++) {
          // let status = '';
          // if(obj[i]['status']='USED'){
          //   status = `<span style="color:#00AE39;font-weight: bold;">${obj[i]['status']}</span>`;
          // }else if(obj[i]['status']='USED'){
          //   status = '<span style="color:#00AE39;font-weight: bold;">'.$row['status'].'</span>';
          // }
          row += ` <tr>
                            <td>${i+1}</td>
                            <td>${obj[i]['kartu_number']}</td>
                            <td>${obj[i]['status']}</td>
                            <td>${obj[i]['nama_kantor']}</td>
                            <td>${((obj[i]['nama_kolektor']== null)?'' :obj[i]['nama_kolektor'])}</td>
                            <td>${((obj[i]['no_rekening']== null)?'':obj[i]['no_rekening'])}</td>
                            <td>${((obj[i]['nominal']== null)?'':obj[i]['nominal'])}</td>
                            <td>${((obj[i]['tgl_bss']== null)?'':obj[i]['tgl_bss'])}</td>
                            <td>${obj[i]['nama_pic']}</td>
                            <td>${obj[i]['timeline_tgl_buat']}</td>
                            <td>${((obj[i]['timeline_tgl_update'] == null)?'' :obj[i]['timeline_tgl_update'])}</td>
                        </tr>`
        }
        $('#employeeTable1 tbody').html(row);
        $('#loading').hide();
        $(document).ready(function () {
          $('#employeeTable1').DataTable({
            "destroy": true,
            "scrollX": true,
            "autoWidth": false,
            "aaSorting": []
          });
        });
      } else {
        alert(respon.message);
        window.location = base_url + 'bss';
        $('#loading').hide();
      }
    }
  })
}



$('#btn_send_migrasi').click(function () {
  $('#form_send_migrasi').modal('show');
})


// Send BSS dari GA
function send_bss() {
  let kartu_number_awal = $("#kartu_number_awal").val();
  let kartu_number_akhir = $("#kartu_number_akhir").val();
  let area_kerja = $("#area_kerja").val();
  let selisih = (kartu_number_akhir - kartu_number_awal) + 1;
  if (selisih <= 0 || selisih > 50) {
    alert("Maaf No Kartu BSS Akhir Harus lebih besar dari No Awal Atau Maximal 50 lembar");
    window.location = base_url + 'bss';
  } else {
    send_bss_db(kartu_number_awal, kartu_number_akhir, area_kerja)
  }
}

function send_bss_db(kartu_number_awal, kartu_number_akhir, area_kerja) {
  let data = {
    kartu_number_awal: kartu_number_awal,
    kartu_number_akhir: kartu_number_akhir,
    area_kerja: area_kerja
  }

  $.ajax({
    type: "POST",
    url: base_url + "BSSController/sendBSS",
    // headers: {
    //   "Authorization": token
    // },
    dataType: "json",
    data: data,
    beforeSend: function () {
      $('#loading').show();
    },
    success: function (respon) {
      setTimeout(function () {
        $('#form_send_bss').modal('hide');
      }, 1000);
      window.location = base_url + 'bss';
      $('#loading').hide();
    }
  });
}
