let base_url = $('#base_url').val();
let api_url = $('#api_url').val();
$(document).ready(function () {
  $('.select2').select2()
  getAll()
  bsCustomFileInput.init();

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

  let token = localStorage.getItem("token");
  console.log(parseJwt (token))

})
// Encryp Token
function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

//Get all list Efiling
function getAll() {
  $.ajax({
    url: base_url + "E_FilingController/getEfiling",
    type: "GET",
    dataType: "json",
    beforeSend: function () {
      $('#loading').show();
    },
    success: function (respon) {
      list_data(respon)
    }
  })
}
// Filter Efiling
$('#kode_kantor').change(function () {
  let kode_area = $(this).val();
  let filter_release = $('#filter_release').val();
  let status = $('#status').val();
  let search = $('#search').val();
  filter_efiling(kode_area, filter_release, status, search);
});

$('#filter_release').change(function () {
  let kode_area = $('#kode_kantor').val();
  let filter_release = $(this).val();
  let status = $('#status').val();
  let search = $('#search').val();
  filter_efiling(kode_area, filter_release, status, search);
});

$('#status').change(function () {
  let kode_area = $('#kode_kantor').val();
  let filter_release = $('#filter_release').val();
  let status = $(this).val();
  let search = $('#search').val();
  filter_efiling(kode_area, filter_release, status, search);
});

$('#search').keypress(function (event) {
  let keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13') {
    let kode_area = $('#kode_kantor').val();
    let filter_release = $('#filter_release').val();
    let status = $('#status').val();
    let search = $("#search").val();
    filter_efiling(kode_area, filter_release, status, search);
  }
});

function filter_efiling(kode_area, filter_release, status, search) {
  let data = {
    kode_kantor: kode_area,
    baki_debet: filter_release,
    status_verifikasi: status,
    search: search
  }
  $.ajax({
    type: "POST",
    url: base_url + "E_FilingController/getSearch",
    dataType: "json",
    data: data,
    beforeSend: function () {
      $('#loading').show();
    },
    success: function (respon) {
      list_data(respon)
    }
  })
}

function list_data(respon) {
  if (respon.success == true) {
    $('#efilingTable1').DataTable().clear();
    $('#efilingTable1').DataTable().destroy();
    $('#loading').hide();
    for (let i = 0; i < respon.data.length; i++) {
      let baki_debet = ((respon.data[i]['baki_debet'] == null) ? 0 : (splitPrice(respon.data[i]['baki_debet'])));
      let plafon = ((respon.data[i]['plafon'] == null) ? 0 : (splitPrice(respon.data[i]['plafon'])));

      function splitPrice(x) {
        let split_price = x.split('.00')
        let list_price = split_price[0]
        let price = parseInt(list_price).toLocaleString();
        return price;
      }

      let stcolor = '';
      if (respon.data[i]['status_verifikasi'] == "NOT COMPLETED") {
        stcolor = 'color:#B6AC47'
      } else if (respon.data[i]['status_verifikasi'] == "DONE") {
        stcolor = 'color:#00AE39'
      } else if (respon.data[i]['status_verifikasi'] == "WAITING") {
        stcolor = 'color:#D60404'
      } else if (respon.data[i]['status_verifikasi'] == "REVISI") {
        stcolor = 'color:#FF6412'
      } else {
        stcolor = ''
      }

      let stcolor_upload = '';
      if (respon.data[i]['nama_user'] == "WAITING") {
        stcolor_upload = 'color:#D60404'
      } else {
        stcolor_upload = ''
      }

      let row = `<tr>
                <td style="width: 120px;" class="no_rekening">${respon.data[i]['no_rekening']}</td>
                <td class="nama_debitur">${respon.data[i]['nama_debitur']}</td>
                <td class="area_kerja">${respon.data[i]['nama_kantor']}</td>
                <td class="tgl_realisasi">${respon.data[i]['tgl_realisasi']}</td>
                <td class="plafon">${plafon}</td>
                <td class="tenor">${((respon.data[i]['tenor']== null)? 0: respon.data[i]['tenor'])}</td>
                <td>${baki_debet}</td>
                <td>${((respon.data[i]['status_dokument']== null)?'' :respon.data[i]['status_dokument'])}</td>
                <td style="${stcolor_upload}; font-weight:bold;" style="width: 120px;">${respon.data[i]['nama_user']}</td>
                <td style="font-weight:bold;">${((respon.data[i]['nama_user_verif']== null)?'' :respon.data[i]['nama_user_verif'])}</td>
                <td>${((respon.data[i]['timeline']== null)?'' :respon.data[i]['timeline'])}</td>
                <td>${((respon.data[i]['timeline_update']== null)?'' : respon.data[i]['timeline_update'])}</td>
                <td>${((respon.data[i]['timeline_verifikasi']== null)?'' :respon.data[i]['timeline_verifikasi'])}</td>
                <td style="${stcolor}; font-weight:bold;">${((respon.data[i]['status_verifikasi']== null)?'': respon.data[i]['status_verifikasi'])}</td>
                <td style="width: 120px;">
                    <button type="button" class="btn btn-info btn-sm edit" title="Edit" kode_kantor ="${respon.data[i]['kode_kantor']}" data-toggle="tooltip" data-placement="top" ><i class="fas fa-pencil-alt"></i></button>
                    <button type="button" class="btn btn-warning btn-sm detail" title="View" kode_kantor ="${respon.data[i]['kode_kantor']}" data-toggle="tooltip" data-placement="top"><i style="color: #fff;" class="fas fa-eye"></i></button>
                    <button type="button" class="btn btn-warning btn-sm verifikasi" title="Verifikasi"  style="background-color: #6610f2; border-color: #6f42c1;" kode_kantor ="${respon.data[i]['kode_kantor']}" data-toggle="tooltip" data-placement="top"><i style="color: #fff;" class="fas fa-user-check"></i></button>
                </td>
            </tr>`
      $('#efilingTable1').find('tbody').append(row);
    }
  } else {
    toastr["info"](respon.message)
    $('#efilingTable1').DataTable().clear();
    $('#efilingTable1').DataTable().destroy();
    $('#efilingTable1 tbody').html("");
    $('#loading').hide();
  }

  action_Data();
  $('#efilingTable1').DataTable({
    "destroy": true,
    "scrollX": true,
    "autoWidth": false,
    "aaSorting": [],
    "searching": false,
    "searchable": false
  });

}
