// console.log($('#branch-id-cp').html());
var branch_id_cp = $('#branch-id-cp').html();
var branch_name_cp = $('#branch-name-cp').html();
var reason = null;
if (branch_id_cp !== '0000') {
  $('#ho-cp').hide();
  $('#cabang-cp').show();
  $('#inp-branch-id-cp').val(branch_id_cp);
  $('#inp-branch-name-cp').val(branch_name_cp);
}

var table_data_cp = $('#table-data-cp').DataTable({
  "columnDefs": [
      { "targets": 1, "visible": false, "searchable": false}
    ]
});

$("#inp-no-kontrak-cp").attr('maxlength','12');

//----------------------------------------ONCLICK----------------------------------------
$('#btn-search-cp').click(function(){
  // console.log($('#branch-id-cp').html());
  var no_aplikasi = $('#inp-no-aplikasi-cp').val();
  var no_contract = $('#inp-no-kontrak-cp').val();
  if ( no_aplikasi == '' && no_contract == '') {
    alert_error('Silahkan masukkan <b>NO KONTRAK</b> untuk pencarian !');
    $('#inp-contract-cp').addClass('has-error');
  } else {
    $('#inp-contract-cp').removeClass('has-error');
    get_contract_cpp();
  }
})

$('#check-all-data-cp').click(function(){
  if($('#check-all-data-cp').is(':checked')){
    $('.check-data-cp').prop('checked', true);
  }else{
    $('.check-data-cp').prop('checked', false);
  }
})

$('#btn-reset-cp').click(function(){
  reset_cpp();
})

$('#btn-confirm-cp').click(function(){
  if ($('.check-data-cp').is(':checked') == false) {
    alert_error('Silahkan pilih <b>KONTRAK</b> yang ingin di Cancel terlebih dahulu !!!');
  }else{
    confirm_cpp();
  }
})

$('#slc-branch-cp').change(function(){
  console.log($('#slc-branch-cp').val());
  branch_id_cp = $('#slc-branch-cp').val();
});

function reset_cpp(){
  $('#inp-no-aplikasi-cp').val('');
  $('#inp-no-kontrak-cp').val('');
  table_data_cp.clear().draw();
  table_data_cp.search('').draw();
}

var aa = ['#inp-no-aplikasi-cp, #inp-no-kontrak-cp'];
$('#inp-no-aplikasi-cp, #inp-no-kontrak-cp').on('keydown', function(e) {
  -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
});

$('#table-data-cp').on('click', '.check-data-cp', function() {
  if ($(this).is(':checked') == false) {
    $('#check-all-data-cp').prop('checked', false);
  }
});


//----------------------------------------FUNCTION----------------------------------------
function get_contract_cpp(){
  var appl_no_cp = $('#inp-no-aplikasi-cp').val();
  var cont_no_cp = $('#inp-no-kontrak-cp').val();
  var reason = '';
  if (check_session() === 'true') {
    $.ajax({
      'url' : 'Controller_ppd_cancellation/get_contract_cpp',
      'type' : 'POST',
      'data' : {
        'branch' : branch_id_cp,
        'appl_no' : hilang_spasi(appl_no_cp),
        'cont_no' : hilang_spasi(cont_no_cp)
      },
      success:function(response){
        if (response) {
          try{
            response = $.parseJSON(response);
            console.log(response);
            if (response['data'] == null) {
              alert_error('Data tidak ditemukan !');
              table_data_cp.clear().draw();
              reason = null;
            }else{
              var i = 1;

              $.each(response['reason'], function(index){
                reason += '<option value = "'+this["reasonId"]+'">'+this["reasonId"]+' - '+this["reasonDesc"]+' </option>';
              });

              table_data_cp.clear().draw();
              $.each(response['data'], function(index){
                table_data_cp.row.add([
                  "<input type='checkbox' class='check-data-cp' id='check-cont"+i+"'>",
                  this['supplierCode'],
                  'AKTIF',
                  this['contractNo'],
                  this['ppdNo'],
                  this['customerName'],
                  this['spouseName'],
                  this['customerAddress'],
                  '<select id="reason'+i+'"> <option value = "">-- SILAHKAN PILIH --</option> '+reason+'</select>'
                ]).draw(false);
              });
              i++;
            }
          }catch(e){
            $('#loading-ajax').hide();
            console.log(e);
            alert_error(e);
          }
        }
            
      },
      error:function(response){
        console.log(response);
      alert_error('Jaringan terputus, Silahkan coba lagi !');
      }
    })
  } else {
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }
}

function confirm_cpp(){
  var cont_no_cp = '';
  var data = table_data_cp.rows().data();
  var reason_cp = '';
  var supplier_code_cp = '';
  var flag_validasi_cp = 0;
  console.log(data);

  var i = 1;
  $.each(data, function(index){
    if($('#check-cont'+i).is(':checked')){
      if (($('#reason'+i).val() == '') || ($('#reason'+i).val() == null)) {
        alert_error("Silahkan pilih <b>ALASAN</b> untuk Cancel Kontrak yang dipilih !!!");
        $('#reason'+i).css('border', '1px solid red');
        flag_validasi_cp = 1;
      }else{
        $('#reason'+i).css('border', '1px solid rgba(0, 0, 0, .22)');
        supplier_code_cp = this[1];
        cont_no_cp = this[3];
        reason_cp = $('#reason'+i).val();
      }
    }
    i += 1;
  });

  console.log(supplier_code_cp);
  console.log(cont_no_cp);
  console.log(reason_cp);
  
  if (check_session() === 'true') {
    if (flag_validasi_cp == 0) {
      $.ajax({
      'url' : 'Controller_ppd_cancellation/confirm_cancel_cpp',
      'type' : 'POST',
      'data' : {
        'branch_id' : branch_id_cp,
        'supplier_code' : supplier_code_cp,
        'cont_no' : cont_no_cp,
        'reason' : reason_cp
      },
      success:function(response){
        console.log(response)
        if (response) {
          try{
            response = $.parseJSON(response);
            if (response['status']) {
              alert_info(response['message']);
              table_data_cp.clear().draw();
            }else{
              alert_error(response['message']);
            }
          }catch(e){
            $('#loading-ajax').hide();
            console.log(e);
            alert_error(e);
          }
        }
      },
      error:function(response){
        console.log(response);
        alert_error('Jaringan terputus, Silahkan coba lagi !');
      }
      })
    }
  } else {
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }
}