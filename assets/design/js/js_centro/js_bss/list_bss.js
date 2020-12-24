let base_url = $('#base_url').val();
 $(document).ready(function () {

  $('.select2').select2()
  var table = $('#employeeTable1').DataTable({
    "scrollX": true,
    "autoWidth": false,
    "aaSorting": [],
    "searching": false,
    "searchable": false 
  });

  $('#employeeTable1 tbody').on('click', 'td.details-click', function () {
    var tr = $(this).closest("tr");
    var row =   table.row( tr );
    if ( row.child.isShown() ) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass( 'shown' );
    }
    else {
        // Open this row
        detail_log(row.child, $(this).parents("tr").find('td.kartu_number').text()) ;
        tr.addClass( 'shown' );
    }
  });

  $("#loading-1").hide();
  
  toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

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
          let status_color  = '';
          let form_update = '';
          if(obj[i]['status']=='NEW'){
            status_color = `color:#fde048`;
          }else if(obj[i]['status']=='IN TRANSIT'){
            status_color = `color:#63f908`;
          }else if(obj[i]['status']=='OPEN'){
            status_color = `color:#08bef7`;
            form_update = `class="kolektorClick" style ="cursor:pointer;"`
          }else if(obj[i]['status']=='ASSIGN'){
            status_color = `color:#2bf963`;
            form_update = `class="update_assignClick" style ="cursor:pointer;"`
          }else if(obj[i]['status']=='RETURN'){
            status_color = `color:#FF6412`;
          }else if(obj[i]['status']=='USED'){
            status_color = `color:#00AE39`;
          }else if(obj[i]['status']=='LOST'){
            status_color = `color:#fb7364`;
          }else if(obj[i]['status']=='BROKEN'){
            status_color = `color:#f91c03`;
          }else if(obj[i]['status']=='EXCHANGE PIC'){
            status_color = `color:#fab504`;
          }
          row += ` <tr  ${form_update} user_id_request = "${obj[i]['user_id']}">
                            <td class='details-control'></td>
                            <td class="kartu_number">${obj[i]['kartu_number']}</td>
                            <td><span style="${status_color};font-weight: bold;">${obj[i]['status']}</span></td>
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
        var table =$('#employeeTable1').DataTable({
          "destroy": true,
          "scrollX": true,
          "autoWidth": false,
          "aaSorting": [],
          "searching": false,
          "searchable": false 
        });
        $('#employeeTable1 tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest("tr");
            var row =   table.row( tr );
            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass( 'shown' );
            }
            else {
                // Open this row
                detail_log(row.child, $(this).parents("tr").find('td.kartu_number').text()) ;
                tr.addClass( 'shown' );
            }
        } );
      } else {
        toastr["info"](respon.message)
        $('#employeeTable1').DataTable().clear();
        $('#employeeTable1').DataTable().destroy();
        // window.location = base_url + 'bss';
        $('#employeeTable1 tbody').html("");
        var table =$('#employeeTable1').DataTable({
          "destroy": true,
          "scrollX": true,
          "autoWidth": false,
          "aaSorting": [],
          "searching": false,
          "searchable": false 
        });
        $('#loading').hide();
      }
    }
  })
}
function detail_log( callback, d ) {
          let data = {
            kartu_number : d
          }
          $.ajax({
            type: "POST",
            url: base_url + "BSSController/getLogBSS",
            dataType: "json",
            data: data,
            beforeSend: function () {
              $('#loading').show();
            },
            success: function (respon) {
              if(respon.success == true){
                $('#loading').hide();
                  let row = '';
                  for(let i = 0; i < respon.data.length; i++){
                    row += `<tr  class="table-light">
                            <td>${respon.data[i]['inisial']+respon.data[i]['kartu_number']}</td>
                            <td>${respon.data[i]['tgl_buat']}</td>
                            <td>${respon.data[i]['status']}</td>
                            <td>${((respon.data[i]['nama']== null)?'' :respon.data[i]['nama'])}</td>
                            <td>${respon.data[i]['keterangan']}</td>
                            </tr>
                            `;
                  }
                  callback($(`
                  <table class="table table-sm " style="width:80% text-align:center">
                  <div style="color: darkblue; font-weight: 600;"><i class="fas fa-history"></i> Log BSS </div>
                  <thead class="table table-striped table-bordered table-dark">
                  <tr>
                  <th>Nomer</th>
                  <th>Tanggal</th>
                  <th>Status</th>
                  <th>User</th>
                  <th>Keterangan</th>
                  </tr>
                  </thead>
                  <tbody  class="tbody-light  table-hover  table-bordered">${row}<tbody>
                </table>`)).show();
              }else{
                toastr["error"](respon.message)
                $('#loading').hide();
              }
              
            }
          })
        
}


$('#btn_send_migrasi').click(function () {
  $('#form_send_migrasi').modal('show');
  $('#loading-6').hide();
})


// Send BSS dari GA
$('#send_bss_ga_to_area').click(function(){
  let kartu_number_awal = $("#kartu_number_awal").val();
  let kartu_number_akhir = $("#kartu_number_akhir").val();
  let area_kerja = $("#area_kerja").val();
  let selisih = (kartu_number_akhir - kartu_number_awal) + 1;
  if (selisih <= 0 || selisih > 50) {
    let message = "Maaf No Kartu BSS Akhir Harus lebih besar dari No Awal Atau Maximal 50 lembar";
    toastr["error"](message);
  } else {
    send_bss_db(kartu_number_awal, kartu_number_akhir, area_kerja)
  }
})

// SEND BSS GA TO AREA QUERY
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
      $('#loading-1').show();
    },
    success: function (respon) {
      toastr["success"](respon.message)
      setTimeout(function () {
        $('#form_send_bss').modal('hide');
      }, 1000);
      window.location = base_url + 'bss';
      $('#loading-1').hide();
    }
  });
}

// get Kartu BSS  input text autocomplate 
function getKartuBSS() {
  $.ajax({
    url: base_url + "BSSController/getKartuBSS",
    type: "GET",
    dataType: "json",
    success: function (x) {
      let dataAutoComplete = x.map(x => {
        return {
          id: x.kartu_number,
          text: x.kartu_number
        }
      })

      // AutocompleteCuston input Form Migrasi
      $("#noawal").on("keyup", function () {
        if ($(this).val()) {
          $('#noawal').autocompleteCustom({
            data: dataAutoComplete, //theData is your JSON
            limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function (val) {
              document.getElementById('noawal').setAttribute('data-id', val)
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
          });
        }
        if (!$(this).val()) {
          $('#noawal').removeAttr('data-id');
        }
      })

      $("#noakhir").on("keyup", function () {
        if ($(this).val()) {
          $('#noakhir').autocompleteCustom({
            data: dataAutoComplete, //theData is your JSON
            limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function (val) {
              document.getElementById('noakhir').setAttribute('data-id', val)
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
          });
        }
        if (!$(this).val()) {
          $('#noakhir').removeAttr('data-id');
        }
      })

      // AutocompleteCuston input Form Send To PIC
      $("#no_kartu_awal").on("keyup", function () {
        if ($(this).val()) {
          $('#no_kartu_awal').autocompleteCustom({
            data: dataAutoComplete, //theData is your JSON
            limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function (val) {
              document.getElementById('no_kartu_awal').setAttribute('data-id', val)
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
          });
        }
        if (!$(this).val()) {
          $('#no_kartu_awal').removeAttr('data-id');
        }
      })

      $("#no_kartu_akhir").on("keyup", function () {
        if ($(this).val()) {
          $('#no_kartu_akhir').autocompleteCustom({
            data: dataAutoComplete, //theData is your JSON
            limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function (val) {
              document.getElementById('no_kartu_akhir').setAttribute('data-id', val)
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
          });
        }
        if (!$(this).val()) {
          $('#no_kartu_akhir').removeAttr('data-id');
        }
      })

    }
  })
}