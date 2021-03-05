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
  console.log(parseJwt(token))
})

let token = localStorage.getItem("token");

function parseJwt(token) {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

//Get all list Efiling

$(document).on("click", ".next", function () {
  let url = $(this).find('[data-dt-href]').attr('data-dt-href')
  getAll(url)
  return false;
});

$(document).on("click", ".last", function () {
  let url = $(this).find('[data-dt-href]').attr('data-dt-href')
  getAll(url)
  return false;
});

$(document).on("click", ".first", function (e) {
  let url = $(this).find('[data-dt-href]').attr('data-dt-href')
  getAll(url)
  return false;
});

$(document).on("click", ".previous", function (e) {
  let url = $(this).find('[data-dt-href]').attr('data-dt-href')
  getAll(url)
  return false;
});

$(document).on("click", ".pager_info", function (e) {
  return false;
});

function getAll(url) {
  let url_api = ''
  if (url == null || url == undefined) {
    url_api = "http://103.31.232.146/API_WEBTOOL3_2/api/master/centro/index?page=1"
  } else {
    url_api = url
  }
  $('#efilingTable1').DataTable({
    "destroy": true,
    "scrollX": true,
    "autoWidth": false,
    "aaSorting": [],
    "searching": false,
    "searchable": false,
    "bSort": false,
    "bInfo": false,
    "processing": true,
    "serverSide": false,
    "lengthChange": false,
    "ajax": {
      url: url_api,
      type: "GET",
      dataType: "json",
      headers: {
        "Authorization": `Bearer ${token}`
      },

    },
    "initComplete": function (settings, json) {
      if (json.status == "success") {
        // userAccess()
        list_data(json.data.data)
        buildPagination(json.data);
      } else {
        toastr["info"](json.message)
      }
    },
    "order": [],


  });
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
    no_rekening: search
  }
  if (data.kode_kantor == 'all' && data.baki_debet == 'all' && data.status_verifikasi == 'all' && data.no_rekening == '') {
    getAll()
  } else {
    $.ajax({
      type: "POST",
      url: "http://103.31.232.146/API_WEBTOOL3_2/api/master/centro/viewHeader",
      dataType: "json",
      data: data,
      headers: {
        "Authorization": `Bearer ${token}`
      },
      beforeSend: function () {
        $('#loading').show();
      },
      success: function (respon) {
        // userAccess()
        $('#efilingTable1').DataTable().clear();
        $('#efilingTable1').DataTable().destroy();
        $('#loading').hide();
          list_data(respon.data)
          $('#efilingTable1').DataTable({
            "destroy": true,
            "scrollX": true,
            "autoWidth": false,
            "aaSorting": [],
            "searching": false,
            "searchable": false
          });
        console.log(respon)
      },
      error: function (jqXHR, exception) {
        toastr["error"]("Data Tidak di Temukan")
        $('#loading').hide();

      }
    })
  }

}

// inner data efiling
function list_data(respon) {
  $('#loading').hide();
  let data = respon
  let row = ''
  for (let i = 0; i < data.length; i++) {
    let baki_debet = ((data[i]['baki_debet'] == null) ? 0 : (splitPrice(data[i]['baki_debet'])));
    let plafon = ((data[i]['plafon'] == null) ? 0 : (splitPrice(data[i]['plafon'])));

    function splitPrice(x) {
      let split_price = x.split('.00')
      let list_price = split_price[0]
      let price = parseInt(list_price).toLocaleString();
      return price;
    }

    let stcolor = '';
    if (data[i]['status_verifikasi'] == "NOT COMPLETED") {
      stcolor = 'color:#B6AC47'
    } else if (data[i]['status_verifikasi'] == "DONE") {
      stcolor = 'color:#00AE39'
    } else if (data[i]['status_verifikasi'] == "WAITING") {
      stcolor = 'color:#D60404'
    } else if (data[i]['status_verifikasi'] == "REVISI") {
      stcolor = 'color:#FF6412'
    } else {
      stcolor = ''
    }

    let stcolor_upload = '';
    if (data[i]['nama_user'] == "WAITING") {
      stcolor_upload = 'color:#D60404'
    } else {
      stcolor_upload = ''
    }

    row += `<tr>
                <td style= "text-align : center; "class="no_rekening">${data[i]['no_rekening']}</td>
                <td class="nama_debitur">${(data[i]['nama_debitur']== null)? '': data[i]['nama_debitur']}</td>
                <td class="area_kerja">${(data[i]['nama_kantor']== null)?'':data[i]['nama_kantor']}</td>
                <td class="tgl_realisasi">${(data[i]['tgl_realisasi']== null)?'':data[i]['tgl_realisasi']}</td>
                <td class="plafon">${plafon}</td>
                <td class="tenor">${((data[i]['tenor']== null)? 0: respon.data[i]['tenor'])}</td>
                <td>${baki_debet}</td>
                <td style="font-weight: bold;">${((data[i]['status_dokument']== null)?'' :data[i]['status_dokument'])}</td>
                <td style="${stcolor_upload}; font-weight: bold;" >${data[i]['nama_user']}</td>
                <td style="font-weight: bold;">${((data[i]['nama_user_verif']== null)?'' :data[i]['nama_user_verif'])}</td>
                <td>${((data[i]['timeline']== null)?'' :data[i]['timeline'])}</td>
                <td>${((data[i]['timeline_update']== null)?'' : data[i]['timeline_update'])}</td>
                <td>${((data[i]['timeline_verifikasi']== null)?'' :data[i]['timeline_verifikasi'])}</td>
                <td style="${stcolor}; font-weight: bold;">${((data[i]['status_verifikasi']== null)?'':data[i]['status_verifikasi'])}</td>
                <td>
                  <div style ="display : flex; ">
                    <div class="btn-action">
                    <button type="button" class="btn btn-info btn-sm edit" title="Edit" kode_kantor ="${data[i]['kode_kantor']}" data-toggle="tooltip" data-placement="top" ><i class="fas fa-pencil-alt"></i></button>
                    </div>
                    <div class="btn-action">
                    <button type="button" class="btn btn-warning btn-sm detail" title="View" kode_kantor ="${data[i]['kode_kantor']}" data-toggle="tooltip" data-placement="top"><i style="color: #fff;" class="fas fa-eye"></i></button>
                    </div>
                    <div class="btn-action">
                    <button type="button" class="btn btn-warning btn-sm verifikasi" title="Verifikasi"  style="background-color: #6610f2; border-color: #6f42c1;" kode_kantor ="${data[i]['kode_kantor']}" data-toggle="tooltip" data-placement="top"><i style="color: #fff;" class="fas fa-user-check"></i></button>
                    </div>  
                  </div >
                </td>
            </tr>`
  }

  // $('#efilingTable1').find('tbody').html(row);
  document.getElementById('list_dt').innerHTML = row
  action_Data();
}

function userAccess() {
  let data ={
    user_id : parseJwt(token).id,
    divisi_id : parseJwt(token).divisi_id,
    jabatan : parseJwt(token).jabatan
  } 
  $.ajax({
    url: base_url + "E_FilingController/UserAccess_Efiling/",
    type: "POST",
    data :data,
    dataType: "json",
    success: function (respon) {
      let menu = JSON.parse(respon.menu);
      let data = {
        edit : menu.find(element => element == 1),
        view : menu.find(element => element == 2),
        upload_aset_ra : menu.find(element => element == 3),
        verifikasi : menu.find(element => element == 4),
        update_status : menu.find(element => element == 5),

      }
      
     
      if(menu.find(element => element == 1) == undefined){
        return $('.edit').css('display','none');
      }
    }
  })
}