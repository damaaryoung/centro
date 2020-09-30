
$('#btn-log-out').click(function(){
  localStorage.clear();
});

getReasonAsset();
$('.inp-ac').prop('disabled',true);
$('#inp_nopol2_ac').prop('disabled',true);
$('#inp_alasan_nopol_ac').prop('disabled', true);
$('#surat_permohonan_ac').prop('disabled', true);
$('#batalkan_koreksi_ac, #konfirmasi_ac').prop('disabled', true);

//=======================================================PEMANGGILAN CABANG DROPDOWN===========================================================================//

if ($('#id-form-asset-correction').length) {
  var branch_code = $('#hdn-branch-code-ac').val();
  var branch_name = $('#hdn-branch-name-ac').val();

  console.log(branch_code);

  if (branch_code !== '0000') {
    $('#inp-cabang-ac').prop('disabled', true);
    $('#inp-cabang-ac').html('<option  value = "'+branch_code+'">'+branch_code+' - '+branch_name+'</option');
    get_empl_adh();
    get_employee_kcb();

    

  }
  else{
    get_data_branch('#inp-cabang-ac');

  }
}


$('#inp-cabang-ac').change(function(){
  if ($("#asset-correction").hasClass('active')) {
    get_empl_adh();
    get_employee_kcb();



  }
});



//==============================================================VALIDASI===========================================================================//

$("#inp-start-date-ac").prop('disabled', true);
$("#btn-search-ac").prop('disabled', true);
$("#all-ac").prop('disabled', true);
$("#ppd-ac").prop('disabled', true);







//=============================================================DEKLARASI TABEL DAN DISABLE=================================================================//
var table_view_correction = $('#table_view_correction').DataTable({
 "columnDefs": [
 {
  "targets": [ 7,8,9 ],
  "visible": false,
  "responsive" : true
}
]

});

var tbl_no_permohonan_ac = $('#tbl_no_permohonan_ac').DataTable();
var tbl_model_ac = $('#tbl_model_ac').DataTable();
//============================================================CHECK ALL DATA PADA TABEL====================================================================//
$('#chk_all_tabel_ac').click(function(){

  var pages_ac = table_view_correction.page();
  var limits_ac = table_view_correction.page.len();
  var table_leng_ac = table_view_correction.rows().data().length ;
  var search_correction  = table_view_correction.search();
  table_view_correction.search("");
  table_view_correction.page.len(table_leng_ac);
  table_view_correction.draw();

  var list_data = table_view_correction.data();
  var arr_data = [];
  var tabel_ac = table_view_correction.data();
  console.log(tabel_ac);
  for (var i = 0; i < tabel_ac.length; i++) {
    if ($('#chk_all_tabel_ac').is(":checked")) {
      arr_data.push({
        no_permohonan : list_data[i][2],
        contract_id : list_data[i][7]

      });
      $('.check-ac').prop("checked", true);
    }
    else{
      $('.check-ac').prop("checked", false);
    }
  }                                           


  table_view_correction.search(search_correction);
  table_view_correction.page.len(limits_ac);
  table_view_correction.draw();
  table_view_correction.page( pages_ac ).draw('page');

}); 



var flag = 0;
var arrayDataCetak =[];
var map = {};
var map2 = {};
var map3 = {};
var contract_id;
var role = '';
var role2 = '';

//=========================================================PEMILIHAN TANGGAL PPD========================================================================//
$('#div-tgl-akhir-ac').datetimepicker({
  format: 'DD-MMM-YYYY',
  allowInputToggle: true
});

$('#div-tgl-awal-ac').datetimepicker({
  format: 'DD-MMM-YYYY',
  allowInputToggle: true
}).on("dp.change", function(e){
  var date = e.date;
  var dDate = date._d;
  var new_date = new Date(dDate);
  new_date.setDate(new_date.getDate() + 7);

  if (new_date > new Date(today)) {
    new_date = new Date(today);
    $('#div-tgl-awal-ac').data("DateTimePicker").maxDate(new_date);
    $('#div-tgl-akhir-ac').data("DateTimePicker").maxDate(new_date);

  }
  $('#div-tgl-akhir-ac').data("DateTimePicker").date(new_date);
});





//=====================================================================PAYMENT METHOD=======================================================================//
$('#inp-carabayar-ac').one('click',function() {
 if ($('#div-payment-methode-ac').length) {
  var pay_methode_code = $('#hdn-pay-meethode-ac').val();
  var pay_methode_desc = $('#hdn-desc-meethode-ac').val();


  if (pay_methode_code !== '') {
    console.log('masuk');
    $('#inp-carabayar-ac').prop('disabled', true);
    $('<option/>').val(pay_methode_code).html(pay_methode_code+' - '+pay_methode_desc).appendTo('#inp-carabayar-ac');
  }
  else{
    get_data_pay_methode('#inp-carabayar-ac');

  }
}
});

//===============================================================FUNGSI OBJEK MODEL=====================================================================//
function get_obj_desc(slc_id){
 var data = '';
 $.ajax({
  url : base_url+"Controller_asset_correction/getObjDescAc",
  cache: false,
  type: 'post',
  data: {
    "model_objmst": data
  },
  dataType: 'json',
  success : function(response){
    var data = JSON.parse(response);
    console.log(response);
    if(JSON.stringify(response).includes('Timeout')){
      alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
    } else if(response){
      try{
        console.log(response);
        $('<option/>').val('').html('- PILIH TYPE -').appendTo(slc_id).addClass('form-control');
        $('<option/>').val('').html('-----------------').appendTo(slc_id).addClass('form-control');

        for (var i = 0; i < data['data'].length; i++) {
          $(slc_id).append('<option value="'+ data['data'][i].obj_CODE +'">'+data['data'][i].obj_DESC+'</option>');

        }

      } catch(e) {
        $('#loading-ajax').hide();
        console.log(e);
        alert_info("Terjadi Kesalahan !");
      }
    }

  }
});
}



function get_employee_kcb(){
 var branch_code = $('#inp-cabang-ac').val();
 var arrayData  = [];
 arrayData.push ({   
  branch_code : branch_code
});
 var data = '';
 $.ajax({
   url : base_url+"Controller_asset_correction/getEmplKCB",
   cache: false,
   type: 'post',
   data : {arrayData},
   dataType: 'json',
   success : function(response){
    var data = JSON.parse(response);
    console.log(response);
    if(JSON.stringify(response).includes('Timeout')){
      alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
    } else if(response){
      try{
        $('#inp-disetujui2-ac').empty();
        console.log('masuk');
        $('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('#inp-disetujui2-ac').addClass('form-control');
        $('<option/>').val('').html('-----------------').appendTo('#inp-disetujui2-ac').addClass('form-control');

        for (var i = 0; i < data['data'].length; i++) {
          $('#inp-disetujui2-ac').append('<option value="'+ data['data'][i].emplName +'">'+data['data'][i].emplName + ' - '  + data['data'][i].emplJobCode+  '</option>');
        }

      } catch(e) {
        $('#loading-ajax').hide();
        alert_error(e);
      }
    }else{
     alert_error("Cek Jaringan");
   }

 }
});
}


function getReasonAsset(){
 var data = '';
 $.ajax({
   url : base_url+"Controller_asset_correction/getReasonAsset",
   cache: false,
   type: 'get',
   //data : {arrayData},
   dataType: 'json',
   success : function(response){
    //debugger;
    var data = JSON.parse(response);
    console.log(response);
    if(JSON.stringify(response).includes('Timeout')){
      alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
    } else if(response){
      try{
        $('.inp-edit-alasan-ac').empty();
        console.log('masuk');
        $('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('.inp-edit-alasan-ac').addClass('form-control');
        $('<option/>').val('').html('-----------------').appendTo('.inp-edit-alasan-ac').addClass('form-control');

        for (var i = 0; i < data['data'].length; i++) {
          $('.inp-edit-alasan-ac').append('<option value="'+ data['data'][i].reason_code +'">'+data['data'][i].reason_desc+ '</option>');
        }

      } catch(e) {
        $('#loading-ajax').hide();
        alert_error(e);
      }
    }else{
     alert_error("Cek Jaringan");
   }

 }
});
}

function get_empl_adh(){

  var branch_code = $('#inp-cabang-ac').val();

  var arrayData  = [];

  arrayData.push ({   
    branch_code : branch_code
  });

  var data = '';
  $.ajax({
    url : base_url+"Controller_asset_correction/getEmployeeADH",
    cache: false,
    type: 'post',
    data : {arrayData},
    dataType: 'json',
    success : function(response){
       // debugger;
       if (response) {

        try{
          $('#inp-disetujui1-ac').empty();
          var result = JSON.parse(response);
          console.log('masuk');
          $('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('#inp-disetujui1-ac').addClass('form-control');
          $('<option/>').val('').html('-----------------').appendTo('#inp-disetujui1-ac').addClass('form-control');

          for (var i = 0; i < result['data'].length; i++) {
            $('#inp-disetujui1-ac').append('<option value="'+ result['data'][i].emplName +'">'+result['data'][i].emplName+ ' - '  + result['data'][i].emplJobCode+  '</option>');

          }
        }
        catch(e){
          $('#loading-ajax').hide();
          alert_error(e);
        }
      }else{
        alert_error("Cek Jaringan");
      }
    }

  });

}




//============================================================BUTTON SEARCH KETIKA KLIK===================================================================//
$('#btn-search-ac').click(function(){
  var contract_no = $('#inp-no-kontrak-ac').val();
  var branch_id = $('#inp-cabang-ac').val();
  var start_date = $('#inp-start-date-ac').val();
  var end_date = $('#inp-end-date-ac').val();
  var no_permohonan = $('#inp-no-permohonan-ac').val();
  var chk = $('input[name=radioAC]:checked').val();

  var v_flag;
  $('.inp-ac').val('');
  $('.inp-ac2').val('');
  $('.inp-edit-alasan-ac').val('');
  $('#inp_nopol2_ac').val('');
  //debugger;
  if (check_session() === 'true') {
    if (chk === '1'){
      if (contract_no === "" && no_permohonan === ""){
        alert_info('Kolom Nomor Kontrak Belum Diisi');
        return false;
      }
      if (contract_no === "" && no_permohonan === "XXXXXXXXXXXXXX"){
        alert_info('Kolom Nomor Kontrak Belum Diisi');
        return false;
      }
    }

    if (chk === '2'){
      if (start_date === "" && no_permohonan === ""){
        alert_info('Kolom Tanggal PPD belum Diisi');
        return false;
      }
      if (start_date === "" && no_permohonan === "XXXXXXXXXXXXXX"){
        alert_info('Kolom Tanggal PPD belum Diisi');
        return false;
      }
    }


    if(branch_id === ""){
      alert_info('Cabang Tidak Boleh Kosong');
      $('#div-list-branch-ac').addClass('has-error');
    }
    else if(no_permohonan === ""){
      alert_info('Nomor Permohonan Tidak Boleh Kosong. Click New');
      $('#div-no-permohonan-ac').addClass('has-error');
    } else {

      if(contract_no != ''){
        v_flag='1';
      }else if (start_date != '' && end_date != ''){
        v_flag='2';
      }else{
        v_flag='0';
      }

      var arrayData  = [];
      //debugger;
      arrayData.push ({   
        contract_no : contract_no,
        branch_id : branch_id,
        start_date : start_date,
        end_date : end_date,
        no_permohonan : no_permohonan,
        flag : v_flag
      });
      //debugger;
      $('#div-no-permohonan-ac').removeClass('has-error');
      $('#div-list-branch-ac').removeClass('has-error');

      getData_asset_correction(arrayData);

    }


  }
  else if (check_session() === 'false') {
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }
});    


//======================================================================FUNGSI BUTTON SEARCH==============================================================//
function getData_asset_correction(arrayData){
  var contract_no = $('#inp-no-kontrak-ac').val();
  var start_date = $('#inp-start-date-ac').val();
  var end_date = $('#inp-end-date-ac').val();
  var supplier_name = "";

  var noperm = arrayData[0].no_permohonan;
  var ischecked = "";
  if(noperm != 'XXXXXXXXXXXXXX'){
    ischecked = "disabled checked";
  }

  $.ajax({

    url:  base_url+"Controller_asset_correction/searchByNoKontrak",
    cache: false,
    type: 'post',
    data : {arrayData},
    dataType: 'json',
    success: function(response){
      //debugger;
      if (response) {
        try{
          if(response['errorConsole']){
            alert_error(response['errorConsole']);
          }else{
           table_view_correction.clear().draw();
           var result = $.parseJSON(response);

           if(result['Status'] === '500'){

            alert_info(result['Error']);    

          }else{
          //debugger;
          $.each(result['Data'],function(index){
            if(this['supplier_name'] === "null"){
              supplier_name = "";
            }else{
              supplier_name = this['supplier_name'];
            }

            if(this['ppd_date'] === null ){
              var ppd_date = "";
            }else{
             var ppd_date = new Date(this['ppd_date']).format('dd-mm-yyyy');
           }

           table_view_correction.row.add([
            '<input class="check-ac" id="chk-all-tabel-ac'+index+'" type="checkbox" '+ischecked+'>',
            this['contract_no'],
            this['memo_no'],
            this['customer_name'],
            this['branch_id']+' - '+result['branch_name'],
            supplier_name,
            ppd_date,
            this['contract_id'],
            this['object_model'],
            this['object_type']
            ]).draw(false);
         });
          $('.inp-ac').val('');
          $('.inp-ac2').val('');
          $('.inp-edit-ac').val('');
          //get_roleAc();
        }
      }
    }

    catch(e){
      $('#loading-ajax').hide();
      alert_error(e);
    }
  }else{
    alert_error("Cek Jaringan");
  }
},
error: function(response) {
  console.log(response);
  if (response['responseText'] === "" && response['statusText'] === 'OK') {
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }
}

});
}


//===================================================KETIKA CHECK SALAH SATU DATA PADA DATA TABEL==============================================================//
$('#table_view_correction').on( 'click', '.check-ac', function () {
  data_dtl_selected_ac = table_view_correction.row($(this).closest('tr')).data();
  var no_permohonans = data_dtl_selected_ac[2];
  var no_kontrak = data_dtl_selected_ac[1];
      //debugger;

      if(no_permohonans != null){
        alert_info('Nomor Kontrak Sudah Memiliki No Permohonan: '+no_permohonans+'. Mohon Dilakukan Confirm Terlebih Dahulu');
        
      }
      if(no_permohonans != null){
        $('.inp-edit-ac, .inp-edit-alasan-ac').prop('disabled', true);

      }else{
       $('.inp-edit-ac, inp-edit-alasan-ac').prop('disabled', false);

       $('#inp_no_bpkb2_ac').prop('disabled', false);

        if($('#inp_no_bpkb_ac').val() === ""){
         $('#inp_no_bpkb2_ac').prop('disabled', true);
       }else{
        $('#inp_no_bpkb2_ac').prop('disabled', false);
      }
       
       get_roleAc();


     }
     if(no_kontrak === ""){
      alert_info('Data Yang Dipilih Tidak Valid');
    }
  });

//===================================================FUNGSI SELECTED DATA TABEL============================================================================//
$('#table_view_correction tbody').on('click', 'tr', function() {
  if ($(this).hasClass('selected')) {
    //debugger;
  } else {
    table_view_correction.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    arr_tbl = table_view_correction.row(this).data();
    data_dtl_selected_ac = table_view_correction.row($(this).closest('tr')).data();
    var contract_no = data_dtl_selected_ac[1];
    var listData = [];
    //var contract_no = $('#inp-no-kontrak-ac').val();
    var branch_id = $('#inp-cabang-ac').val();
    var no_rangka = $('#inp_no_rangka_ac').val();
    var no_rangka_new = $('#inp_no_rangka2_ac').val();
    var no_mesin = $('#inp_no_mesin_ac').val();
    var no_mesin_new = $('#inp_no_mesin2_ac').val();
    var nama_bpkb = $('#inp_nama_bpkb_ac').val();
    var nama_bpkb_new = $('#inp_nama_bpkb2_ac').val();
    var alamat_bpkb = $('#inp_alamat_bpkb_ac').val();
    var alamat_bpkb_new = $('#inp_alamat_bpkb2_ac').val();
    var no_bpkb = $('#inp_no_bpkb_ac').val();
    var no_bpkb_new = $('#inp_no_bpkb2_ac').val();
    var reg_bpkb = $('#inp_no_reg_bpkb_ac').val();
    var reg_bpkb_new = $('#inp_no_reg2_bpkb_ac').val();
    var warna = $('#inp_warna_ac').val();
    var warna_new = $('#inp_warna2_ac').val();
    var model = $('#inp_model4_ac').val();
    var model_new = $('#inp_model2_ac').val();
    var model_cetak = $('#inp_model_ac').val();
    var model_new_cetak = $('#inp_model3_ac').val();
    var nopol = $('#inp_nopol_ac').val();
    var nopol_new = $('#inp_nopol2_ac').val();
    var tgl_bpkb = $('#inp_tgl_bpkb_ac').val();
    var tgl_bpkb_new = $('#inp_tgl_bpkb2_ac').val();
    var thn_produksi = $('#inp_tahun_ac').val();
    var thn_produksi_new = $('#inp_tahun2_ac').val();
    var thn_kendaraan = $('#inp_tahun_rakit_ac').val();
    var thn_kendaraan_new = $('#inp_tahun_rakit2_ac').val();
    var no_refferal = $('#inp_no_refferal_ac').val();
    var no_refferal_new = $('#inp_no_refferal2_ac').val();
    var cara_bayar = $('#inp_payment_method_ac').val();
    var cara_bayar_new = $('#inp-carabayar-ac').val();
    var biaya_tarik = $('#inp_biaya_tarik_ac').val();
    var biaya_tarik_new = $('#inp_biaya_tarik2_ac').val();
    var cc = $('#inp_cc_kendaraan_ac').val();
    var cc_new = $('#inp_cc_kendaraan2_ac').val();
    // tambahan
    var r_rangka = $('#inp_alasan_rangka_ac').val();
    var r_mesin = $('#inp_alasan_mesin_ac').val();
    var r_rangkadesc = $('#inp_alasan_rangka_ac').find(":selected").text();
    var r_mesindesc = $('#inp_alasan_mesin_ac').find(":selected").text();
    var r_namabpkb = $('#inp_alasan_namabpkb_ac').val();
    var r_alamatbpkb = $('#inp_alasan_alamatbpkb_ac').val();
    var r_nobpkb = $('#inp_alasan_nobpkb_ac').val();
    var r_noregbpkb = $('#inp_alasan_noregbpkb_ac').val();
    var r_warna = $('#inp_alasan_warna_ac').val();
    var r_model = $('#inp_alasan_model_ac').val();
    var r_nopol = $('#inp_alasan_nopol_ac').val();
    var r_tglbpkb = $('#inp_alasan_tglbpkb_ac').val();
    var r_thnpembuatan = $('#inp_alasan_thnproduksi_ac').val();
    var r_thnkendaraan = $('#inp_alasan_thnrakit_ac').val();
    var r_cc = $('#inp_alasan_cc_ac').val();

    var r_rangkadesc = $('#inp_alasan_rangka_ac').find(":selected").text();
    var r_mesindesc = $('#inp_alasan_mesin_ac').find(":selected").text();
    var r_namabpkbdesc = $('#inp_alasan_namabpkb_ac').find(":selected").text();
    var r_alamatbpkbdesc = $('#inp_alasan_alamatbpkb_ac').find(":selected").text();
    var r_nobpkbdesc = $('#inp_alasan_nobpkb_ac').find(":selected").text();
    var r_noregbpkbdesc = $('#inp_alasan_noregbpkb_ac').find(":selected").text();
    var r_warnadesc = $('#inp_alasan_warna_ac').find(":selected").text();
    var r_modeldesc = $('#inp_alasan_model_ac').find(":selected").text();
    var r_nopoldesc = $('#inp_alasan_nopol_ac').find(":selected").text();
    //var r_tglbpkb = $('#inp_alasan_tglbpkb_ac').val();
    var r_thnpembuatandesc = $('#inp_alasan_thnproduksi_ac').find(":selected").text();
    var r_thnkendaraandesc = $('#inp_alasan_thnrakit_ac').find(":selected").text();
    var r_ccdesc = $('#inp_alasan_cc_ac').find(":selected").text();


    //debugger;
    listData.push ({   
      "contract_no" : contract_no,
      "branch_id" : branch_id,
      "no_rangka" : no_rangka,
      "no_rangka_new" : no_rangka_new,
      "no_mesin" : no_mesin,
      "no_mesin_new" : no_mesin_new,
      "nama_bpkb" : nama_bpkb,
      "nama_bpkb_new" : nama_bpkb_new,
      "alamat_bpkb" : alamat_bpkb,
      "alamat_bpkb_new" : alamat_bpkb_new,
      "no_bpkb" : no_bpkb,
      "no_bpkb_new" : no_bpkb_new,
      "reg_bpkb" : reg_bpkb,
      "reg_bpkb_new" : reg_bpkb_new,
      "warna" : warna,
      "warna_new" : warna_new,
      "model" : model,
      "model_new" : model_new,
      "nopol" :nopol,
      "nopol_new" : nopol_new,
      "tgl_bpkb" : tgl_bpkb,
      "tgl_bpkb_new" : tgl_bpkb_new, 
      "thn_produksi" : thn_produksi,
      "thn_produksi_new" : thn_produksi_new,
      "thn_kendaraan" : thn_kendaraan,
      "thn_kendaraan_new" : thn_kendaraan_new,
      "no_refferal" : no_refferal, 
      "no_refferal_new" : no_refferal_new,
      "cara_bayar" : cara_bayar,
      "cara_bayar_new" : cara_bayar_new,
      "biaya_tarik" :biaya_tarik,
      "biaya_tarik_new" :biaya_tarik_new,
      "cc" :cc,
      "cc_new" :cc_new,
          // tambahan 
          "r_rangka" : r_rangka,
          "r_mesin" : r_mesin,
          "r_namabpkb" :r_namabpkb,
          "r_alamatbpkb" : r_alamatbpkb,
          "r_nobpkb" : r_nobpkb,
          "r_noregbpkb" : r_noregbpkb, 
          "r_warna" : r_warna,
          "r_model" : r_model,
          "r_nopol" : r_nopol,
          "r_tglbpkb" :r_tglbpkb,
          "r_thnpembuatan" :r_thnpembuatan,
          "r_thnkendaraan" :r_thnkendaraan,
          "r_cc" :r_cc,
          // deskripsi
          "model_cetak" : model_cetak,
          "r_rangkadesc" : r_rangkadesc,
          "r_mesindesc" : r_mesindesc,
          "r_alamatbpkbdesc" : r_alamatbpkbdesc,
          "r_nobpkbdesc" : r_nobpkbdesc,
          "r_warnadesc" : r_warnadesc,
          "r_modeldesc" : r_modeldesc,
          "r_nopoldesc" : r_nopoldesc,
          "r_thnpembuatandesc" : r_thnpembuatandesc,
          "r_ccdesc" : r_ccdesc,
          "r_thnkendaraandesc" : r_thnkendaraandesc, 
          "model_new_cetak" : model_new_cetak,
          "status_update":0
        });
    map[contract_id] = listData;
  
  //tambahan

  //debugger;
  contract_id = arr_tbl[7];
  var branch_id = $('#inp-cabang-ac').val();
  data_dtl_selected_ac = table_view_correction.row($(this).closest('tr')).data();
  var no_permohonans = $('#inp-no-permohonan-ac').val();
  var contract_nos = $('#inp-no-kontrak-ac').val();
  var contract_no = data_dtl_selected_ac[1];
  var no_permohonans2 = data_dtl_selected_ac[2];
  var start_date = $('#inp-start-date-ac').val();
  var end_date = $('#inp-end-date-ac').val();
  var v_flag;
  var arrayData = [];

  if (no_permohonans2 != null) {
    $('.inp-edit-ac, .inp-edit-alasan-ac,.inp-ac2,.inp-nopolku').prop('disabled', true);
    $('surat_permohonan_ac').prop('disabled', true);
  }else{
    $('.inp-edit-ac, .inp-ac2, .inp-edit-alasan-ac').prop('disabled', false);
  }
  $('#inp_nopol2_ac').prop('disabled',true);

  if(no_permohonans2 != null && contract_nos != ''){
    v_flag=2;
  }else if(no_permohonans2 != null && start_date != '' && end_date != ''){
    v_flag=2;
  }
  else if(contract_nos != ''){
    v_flag=1;
  }
  else if(start_date != '' && end_date != ''){
    v_flag=1;
  }
  else{
    v_flag=0;
  }
  arrayData.push({
    contract_id : contract_id,
    flag : v_flag,
    contract_no : contract_no

  });
  //debugger;
  if( map2[contract_id] === null || map2[contract_id] === undefined){
  var model_new_desc = "";
  //debugger;
    $.ajax({
      url: base_url+"Controller_asset_correction/getDataDetail",
      cache: false,
      type: 'post',
      data : {arrayData},
      dataType: 'json',
      success: function(response){
        //debugger;
        if (response) {
          try{

            var result = JSON.parse(response);
               if((result['Data'][0].model_new_desc)=== "null"){
              model_new_desc = "";
            }else{
              model_new_desc = result['Data'][0].model_new_desc;
            }
            if(result['Status'] === '500'){

              alert_info(result['Error']); 
            }else{
              if ( v_flag === 1){
                map2[contract_id] = result['Data'];
                map3[contract_id] = result['hasilCcs'];

                if(result['Data'] ==''){
                  alert_info('Data Detail Kosong');
                }else{
                  $('#inp_no_rangka_ac').val(result['Data'][0]['chassis_no']);
                  $('#inp_no_mesin_ac').val(result['Data'][0]['engine_no']);
                  $('#inp_nama_bpkb_ac').val(result['Data'][0]['register_name']);
                  $('#inp_alamat_bpkb_ac').val(result['Data'][0]['register_address']);
                  $('#inp_nopol_ac').val(result['Data'][0]['plate_no']);

                  try{
                    $('#inp_no_bpkb_ac').val(result['hasilCcs'][0]['nomor_bpkb']);
                     //$('#inp_nama_bpkb_ac').val(result['hasilCcs'][0]['nama_pada_bpkb']);
                  } catch(e){

                  }


                  $('#inp_warna_ac').val(result['Data'][0]['object_color']);
                  $('#inp_model_ac').val(result['Data'][0]['object_model_desc']);
                  $('#inp_model4_ac').val(result['Data'][0]['object_model']);
                  $('#inp_type_ac').val(result['Data'][0]['obj_type_code']);
                  $('#inp_brand_ac').val(result['Data'][0]['obj_brand_code']);
                  $('#inp_tahun_ac').val(result['Data'][0]['production_year']);
                  $('#inp_tahun_rakit_ac').val(result['Data'][0]['manufacture_year']);
                  $('#inp_cc_kendaraan_ac').val(result['Data'][0]['engine_capacity']);

                  if($('#inp_no_rangka_ac').val() === ""){
                   $('#inp_no_rangka2_ac').prop('disabled', true);
                 }else{
                  $('#inp_no_rangka2_ac').prop('disabled', false);
                }

                if($('#inp_no_mesin_ac').val() === ""){
                 $('#inp_no_mesin2_ac').prop('disabled', true);
               }else{
                $('#inp_no_mesin2_ac').prop('disabled', false);
              }

              if($('#inp_no_mesin_ac').val() === ""){
               $('#inp_no_mesin2_ac').prop('disabled', true);
             }else{
              $('#inp_no_mesin2_ac').prop('disabled', false);
            }

            if($('#inp_nama_bpkb_ac').val() === ""){
             $('#inp_nama_bpkb2_ac').prop('disabled', true);
           }else{
            $('#inp_nama_bpkb2_ac').prop('disabled', false);
          }

          if($('#inp_alamat_bpkb_ac').val() === ""){
           $('#inp_alamat_bpkb2_ac').prop('disabled', true);
         }else{
          $('#inp_alamat_bpkb2_ac').prop('disabled', false);
        }

        if($('#inp_no_bpkb_ac').val() === ""){
         $('#inp_no_bpkb2_ac').prop('disabled', true);
         $('#inp_alasan_nobpkb_ac').prop('disabled', true);
       }else{
        $('#inp_no_bpkb2_ac').prop('disabled', false);
        $('#inp_alasan_nobpkb_ac').prop('disabled', false);
      }

      if($('#inp_warna_ac').val() === ""){
       $('#inp_warna2_ac').prop('disabled', true);
     }else{
      $('#inp_warna2_ac').prop('disabled', false);
    }

    if($('#inp_model_ac').val() === ""){
     $('#inp_model3_ac').prop('disabled', true);
   }else{
    $('#inp_model3_ac').prop('disabled', false);
  }

  if($('#inp_tahun_rakit_ac').val() === ""){
   $('#inp_tahun_rakit2_ac').prop('disabled', true);
 }else{
  $('#inp_tahun_rakit2_ac').prop('disabled', false);
}

if($('#inp_tahun_ac').val() === ""){
 $('#inp_tahun2_ac').prop('disabled', true);
}else{
  $('#inp_tahun2_ac').prop('disabled', false);
}

if($('#inp_cc_kendaraan_ac').val() === ""){
 $('#inp_cc_kendaraan2_ac').prop('disabled', true);
}else{
  $('#inp_cc_kendaraan2_ac').prop('disabled', false);
}

if($('#inp_nopol_ac').val() === ""){
 $('#inp_nopol2_ac').prop('disabled', true);
 $('#inp_alasan_nopol_ac').prop('disabled', true);
}else{
  $('#inp_nopol2_ac').prop('disabled', false);
 $('#inp_alasan_nopol_ac').prop('disabled', false);
}



get_roleAc();

}
if( map[contract_id] != null){
  var data = map[contract_id];
  $('#inp_no_mesin2_ac').val(data[0].no_mesin_new);
  $('#inp_no_rangka2_ac').val(data[0].no_rangka_new);
  $('#inp_nama_bpkb2_ac').val(data[0].nama_bpkb_new);
  $('#inp_alamat_bpkb2_ac').val(data[0].alamat_bpkb_new);
  $('#inp_no_bpkb2_ac').val(data[0].no_bpkb_new);
  $('#inp_no_reg2_bpkb_ac').val(data[0].reg_bpkb_new);
  $('#inp_warna2_ac').val(data[0].warna_new);
  $('#inp_model2_ac').val(data[0].model_new);
  $('#inp_model3_ac').val(data[0].model_new_desc);
  $('#inp_nopol2_ac').val(data[0].nopol_new);
  $('#inp_tgl_bpkb2_ac').val(data[0].tgl_bpkb_new);
  $('#inp_tahun2_ac').val(data[0].thn_produksi_new);
  $('#inp_tahun_rakit2_ac').val(data[0].thn_kendaraan_new);
  $('#inp_cc_kendaraan2_ac').val(data[0].cc_new); 


} else {

  $('#inp_no_mesin2_ac').val("");
  $('#inp_no_rangka2_ac').val("");
  $('#inp_nama_bpkb2_ac').val("");
  $('#inp_alamat_bpkb2_ac').val("");
  $('#inp_no_bpkb2_ac').val("");
  $('#inp_no_reg2_bpkb_ac').val("");
  $('#inp_warna2_ac').val("");
  $('#inp_model3_ac').val("");
  $('#inp_model2_ac').val("");
  $('#inp_nopol2_ac').val("");
  $('#inp_tgl_bpkb2_ac').val("");
  $('#inp_tahun2_ac').val("");
  $('#inp_tahun_rakit2_ac').val("");
  $('#inp_cc_kendaraan2_ac').val("");
  $('#inp_alasan_rangka_ac').val("");
  $('#inp_alasan_mesin_ac').val("");
  $('#inp_alasan_namabpkb_ac').val("");
  $('#inp_alasan_alamatbpkb_ac').val("");
  $('#inp_alasan_nobpkb_ac').val("");
  $('#inp_alasan_noregbpkb_ac').val("");
  $('#inp_alasan_warna_ac').val("");
  $('#inp_alasan_model_ac').val("");
  $('#inp_alasan_nopol_ac').val("");
  $('#inp_alasan_tglbpkb_ac').val("");
  $('#inp_alasan_thnproduksi_ac').val("");
  $('#inp_alasan_thnrakit_ac').val("");
  $('#inp_alasan_cc_ac').val("");
  $('#inp_alasan_nobastk_ac').val("");

}

}else if(v_flag === 2){

  //debugger;
  map2[contract_id] = result['Data'];
  map3[contract_id] = result['hasilCcs'];
  $('#inp_no_rangka_ac').val(result['Data'][0]['chassis_no']);
  $('#inp_no_rangka2_ac').val(result['Data'][0]['rangka_new']);
  $('#inp_no_mesin_ac').val(result['Data'][0]['engine_no']);
  $('#inp_no_mesin2_ac').val(result['Data'][0]['engine_new']);
  $('#inp_nama_bpkb_ac').val(result['Data'][0]['register_name']);
  $('#inp_nama_bpkb2_ac').val(result['Data'][0]['namabpkb_new']);
  $('#inp_alamat_bpkb_ac').val(result['Data'][0]['register_address']);
  $('#inp_alamat_bpkb2_ac').val(result['Data'][0]['alamatbpkb_new']);
  $('#inp_nopol_ac').val(result['Data'][0]['plate_no']);

  try{
      $('#inp_no_bpkb_ac').val(result['hasilCcs'][0]['nomor_bpkb']);
      //$('#inp_nama_bpkb_ac').val(result['hasilCcs'][0]['nama_pada_bpkb']);
  }catch(e){


  }
  $('#inp_no_bpkb2_ac').val(result['Data'][0]['nobpkb_new']);
  $('#inp_no_reg2_bpkb_ac').val(result['Data'][0]['noregbpkb_new']);
  $('#inp_warna2_ac').val(result['Data'][0]['warna_new']);
  $('#inp_model_ac').val(result['Data'][0]['object_model_desc']);
  $('#inp_model2_ac').val(result['Data'][0]['model_new']);
  $('#inp_model3_ac').val(model_new_desc);
  $('#inp_nopol2_ac').val(result['Data'][0]['nopol_new']);
  $('#inp_model_ac').val(result['Data'][0]['object_model_desc']);
  $('#inp_model4_ac').val(result['Data'][0]['object_model']);
  $('#inp_warna_ac').val(result['Data'][0]['object_color']);
  $('#inp_tgl_bpkb2_ac').val(result['Data'][0]['tglbastk_new']);
  $('#inp_tahun_ac').val(result['Data'][0]['production_year']);
  $('#inp_tahun2_ac').val(result['Data'][0]['thnproduksi_new']);
  $('#inp_tahun_rakit_ac').val(result['Data'][0]['manufacture_year']);
  $('#inp_tahun_rakit2_ac').val(result['Data'][0]['thnkendaraan_new']);
  $('#inp_cc_kendaraan_ac').val(result['Data'][0]['engine_capacity']);
  $('#inp_cc_kendaraan2_ac').val(result['Data'][0]['cc_new']);
  $('#inp_alasan_rangka_ac').val(result['Data'][0]['r_rangka']);
  $('#inp_alasan_mesin_ac').val(result['Data'][0]['r_mesin']);
  $('#inp_alasan_namabpkb_ac').val(result['Data'][0]['r_namabpkb']);
  $('#inp_alasan_alamatbpkb_ac').val(result['Data'][0]['r_alamatbpkb']);
  $('#inp_alasan_nobpkb_ac').val(result['Data'][0]['r_nobpkb']);
  $('#inp_alasan_noregbpkb_ac').val(result['Data'][0]['r_noregbpkb']);
  $('#inp_alasan_warna_ac').val(result['Data'][0]['r_warna']);
  $('#inp_alasan_model_ac').val(result['Data'][0]['r_model']);
  $('#inp_alasan_nopol_ac').val(result['Data'][0]['r_nopol']);
  $('#inp_alasan_tglbpkb_ac').val(result['Data'][0]['r_tglbpkb']);
  $('#inp_alasan_thnproduksi_ac').val(result['Data'][0]['r_thnpembuatan']);
  $('#inp_alasan_thnrakit_ac').val(result['Data'][0]['r_thnkendaraan']);
  $('#inp_alasan_cc_ac').val(result['Data'][0]['r_cc']);
  $('#inp_alasan_nobastk_ac').val(result['Data'][0]['r_bastkno']);


  // if( map[contract_id] != null){
  //   var data = map[contract_id];
  //   $('#inp_no_mesin2_ac').val(data[0].engine_new);
  //   $('#inp_no_rangka2_ac').val(data[0].rangka_new);
  //   $('#inp_nama_bpkb2_ac').val(data[0].namabpkb_new);
  //   $('#inp_alamat_bpkb2_ac').val(data[0].alamatbpkb_new);
  //   $('#inp_no_bpkb2_ac').val(data[0].nobpkb_new);
  //   $('#inp_no_reg2_bpkb_ac').val(data[0].noregbpkb_new);
  //   $('#inp_warna2_ac').val(data[0].warna_new);
  //   $('#inp_model2_ac').val(data[0].model_new);
  //   $('#inp_model3_ac').val(data[0].model_new_desc);
  //   $('#inp_nopol2_ac').val(data[0].nopol_new);
  //   $('#inp_tgl_bpkb2_ac').val(data[0].tglbastk_new);
  //   $('#inp_tahun2_ac').val(data[0].thnproduksi_new);
  //   $('#inp_tahun_rakit2_ac').val(data[0].thnkendaraan_new);
  //   $('#inp_cc_kendaraan2_ac').val(data[0].cc_new);


  // }

}else{
  //debugger;
  map2[contract_id] = result['Data'];
  map3[contract_id] = result['hasilCcs'];
  $('#inp_no_rangka_ac').val(result['Data'][0]['chassis_no']);
  $('#inp_no_rangka2_ac').val(result['Data'][0]['rangka_new']);
  $('#inp_no_mesin_ac').val(result['Data'][0]['engine_no']);
  $('#inp_no_mesin2_ac').val(result['Data'][0]['engine_new']);
  $('#inp_nama_bpkb_ac').val(result['Data'][0]['register_name']);
  $('#inp_nama_bpkb2_ac').val(result['Data'][0]['namabpkb_new']);
  $('#inp_alamat_bpkb_ac').val(result['Data'][0]['register_address']);
  $('#inp_alamat_bpkb2_ac').val(result['Data'][0]['alamatbpkb_new']);
  $('#inp_nopol_ac').val(result['Data'][0]['plate_no']);

  try{
    $('#inp_no_bpkb_ac').val(result['hasilCcs'][0]['nomor_bpkb']);
    $('#inp_nama_bpkb_ac').val(result['hasilCcs'][0]['nama_pada_bpkb']);
  }catch(e){


  }
  $('#inp_no_bpkb2_ac').val(result['Data'][0]['nobpkb_new']);
  $('#inp_no_reg2_bpkb_ac').val(result['Data'][0]['noregbpkb_new']);
  $('#inp_warna2_ac').val(result['Data'][0]['warna_new']);
  $('#inp_model_ac').val(result['Data'][0]['object_model_desc']);
  $('#inp_model2_ac').val(result['Data'][0]['model_new']);
  $('#inp_model3_ac').val(model_new_desc);
  $('#inp_nopol2_ac').val(result['Data'][0]['nopol_new']);
  $('#inp_model_ac').val(result['Data'][0]['object_model_desc']);
  $('#inp_model4_ac').val(result['Data'][0]['object_model']);
  $('#inp_warna_ac').val(result['Data'][0]['object_color']);
  $('#inp_tgl_bpkb2_ac').val(result['Data'][0]['tglbastk_new']);
  $('#inp_tahun_ac').val(result['Data'][0]['production_year']);
  $('#inp_tahun2_ac').val(result['Data'][0]['thnproduksi_new']);
  $('#inp_tahun_rakit_ac').val(result['Data'][0]['manufacture_year']);
  $('#inp_tahun_rakit2_ac').val(result['Data'][0]['thnkendaraan_new']);
  $('#inp_cc_kendaraan_ac').val(result['Data'][0]['engine_capacity']);
  $('#inp_cc_kendaraan2_ac').val(result['Data'][0]['cc_new']);
  $('#inp_alasan_rangka_ac').val(result['Data'][0]['r_rangka']);
  $('#inp_alasan_mesin_ac').val(result['Data'][0]['r_mesin']);
  $('#inp_alasan_namabpkb_ac').val(result['Data'][0]['r_namabpkb']);
  $('#inp_alasan_alamatbpkb_ac').val(result['Data'][0]['r_alamatbpkb']);
  $('#inp_alasan_nobpkb_ac').val(result['Data'][0]['r_nobpkb']);
  $('#inp_alasan_noregbpkb_ac').val(result['Data'][0]['r_noregbpkb']);
  $('#inp_alasan_warna_ac').val(result['Data'][0]['r_warna']);
  $('#inp_alasan_model_ac').val(result['Data'][0]['r_model']);
  $('#inp_alasan_nopol_ac').val(result['Data'][0]['r_nopol']);
  $('#inp_alasan_tglbpkb_ac').val(result['Data'][0]['r_tglbpkb']);
  $('#inp_alasan_thnproduksi_ac').val(result['Data'][0]['r_thnpembuatan']);
  $('#inp_alasan_thnrakit_ac').val(result['Data'][0]['r_thnkendaraan']);
  $('#inp_alasan_cc_ac').val(result['Data'][0]['r_cc']);
  $('#inp_alasan_nobastk_ac').val(result['Data'][0]['r_bastkno']);


 /* if( map[contract_id] != null){
    var data = map[contract_id];
    $('#inp_no_mesin2_ac').val(data[0].engine_new);
    $('#inp_no_rangka2_ac').val(data[0].rangka_new);
    $('#inp_nama_bpkb2_ac').val(data[0].namabpkb_new);
    $('#inp_alamat_bpkb2_ac').val(data[0].alamatbpkb_new);
    $('#inp_no_bpkb2_ac').val(data[0].nobpkb_new);
    $('#inp_no_reg2_bpkb_ac').val(data[0].noregbpkb_new);
    $('#inp_warna2_ac').val(data[0].warna_new);
    $('#inp_model2_ac').val(data[0].model_new);
    $('#inp_model3_ac').val(data[0].model_new_desc);
    $('#inp_nopol2_ac').val(data[0].nopol_new);
    $('#inp_tgl_bpkb2_ac').val(data[0].tglbastk_new);
    $('#inp_tahun2_ac').val(data[0].thnproduksi_new);
    $('#inp_tahun_rakit2_ac').val(data[0].thnkendaraan_new);
    $('#inp_cc_kendaraan2_ac').val(data[0].cc_new);


  }*/
}
}



get_roleAc();
}catch(e){
  $('#loading-ajax').hide();
  alert_error(e);
}

}else{
  alert_error("Cek Jaringan");
}

},error:function(response){
  console.log(response);
  if (response['responseText'] === "" && response['statusText'] === 'OK') {
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }
}

});

}else{
 if ( v_flag === 1){
   var result = map2[contract_id];
   var result2 = map3[contract_id];
   $('#inp_no_rangka_ac').val(result[0]['chassis_no']);
   $('#inp_no_mesin_ac').val(result[0]['engine_no']);
   $('#inp_nama_bpkb_ac').val(result[0]['register_name']);
   $('#inp_alamat_bpkb_ac').val(result[0]['register_address']);
   $('#inp_nopol_ac').val(result[0]['plate_no']);

   try{
      $('#inp_no_bpkb_ac').val(result2[0]['nomor_bpkb']);
      //$('#inp_nama_bpkb_ac').val(result['hasilCcs'][0]['nama_pada_bpkb']);
   }
   catch(e){

   }

   $('#inp_warna_ac').val(result[0]['object_color']);
   $('#inp_model4_ac').val(result[0]['object_model']);
   $('#inp_model_ac').val(result[0]['object_model_desc']);

   $('#inp_tahun_ac').val(result[0]['production_year']);
   $('#inp_tahun_rakit_ac').val(result[0]['manufacture_year']);
   $('#inp_no_refferal_ac').val(result[0]['collateral_no']);
   $('#inp_payment_method_ac').val(result[0]['payment_method']);
   $('#inp_biaya_tarik_ac').val(result[0]['adp']);
   $('#inp_cc_kendaraan_ac').val(result[0]['engine_capacity']);


   if($('#inp_no_rangka_ac').val() === ""){
     $('#inp_no_rangka2_ac').prop('disabled', true);
   }else{
    $('#inp_no_rangka2_ac').prop('disabled', false);
  }

  if($('#inp_no_mesin_ac').val() === ""){
   $('#inp_no_mesin2_ac').prop('disabled', true);
 }else{
  $('#inp_no_mesin2_ac').prop('disabled', false);
}

if($('#inp_nama_bpkb_ac').val() === ""){
 $('#inp_nama_bpkb2_ac').prop('disabled', true);
}else{
  $('#inp_nama_bpkb2_ac').prop('disabled', false);
}

if($('#inp_alamat_bpkb_ac').val() === ""){
 $('#inp_alamat_bpkb2_ac').prop('disabled', true);
}else{
  $('#inp_alamat_bpkb2_ac').prop('disabled', false);
}

          if($('#inp_no_bpkb_ac').val() === ""){
         $('#inp_no_bpkb2_ac').prop('disabled', true);
         $('#inp_alasan_nobpkb_ac').prop('disabled', true);
       }else{
        $('#inp_no_bpkb2_ac').prop('disabled', false);
        $('#inp_alasan_nobpkb_ac').prop('disabled', false);
      }

if($('#inp_warna_ac').val() === ""){
 $('#inp_warna2_ac').prop('disabled', true);
}else{
  $('#inp_warna2_ac').prop('disabled', false);
}

if($('#inp_tahun_rakit_ac').val() === ""){
 $('#inp_tahun_rakit2_ac').prop('disabled', true);
}else{
  $('#inp_tahun_rakit2_ac').prop('disabled', false);
}

if($('#inp_tahun_ac').val() === ""){
 $('#inp_tahun2_ac').prop('disabled', true);
}else{
  $('#inp_tahun2_ac').prop('disabled', false);
}

if($('#inp_cc_kendaraan_ac').val() === ""){
 $('#inp_cc_kendaraan2_ac').prop('disabled', true);
}else{
  $('#inp_cc_kendaraan2_ac').prop('disabled', false);
}

if( map[contract_id] != null){
  var data = map[contract_id];
  $('#inp_no_mesin2_ac').val(data[0].no_mesin_new);
  $('#inp_no_rangka2_ac').val(data[0].no_rangka_new);
  $('#inp_nama_bpkb2_ac').val(data[0].nama_bpkb_new);
  $('#inp_alamat_bpkb2_ac').val(data[0].alamat_bpkb_new);
  $('#inp_no_bpkb2_ac').val(data[0].no_bpkb_new);
  $('#inp_no_reg2_bpkb_ac').val(data[0].reg_bpkb_new);
  $('#inp_warna2_ac').val(data[0].warna_new);
  $('#inp_model2_ac').val(data[0].model_new);
  $('#inp_model3_ac').val(data[0].model_new_desc);
  $('#inp_nopol2_ac').val(data[0].nopol_new);
  $('#inp_tgl_bpkb2_ac').val(data[0].tgl_bpkb_new);
  $('#inp_tahun2_ac').val(data[0].thn_produksi_new);
  $('#inp_tahun_rakit2_ac').val(data[0].thn_kendaraan_new);
  $('#inp_no_refferal2_ac').val(data[0].no_refferal_new);
  $('#inp-carabayar-ac').val(data[0].cara_bayar_new);
  $('#inp_biaya_tarik2_ac').val(data[0].biaya_tarik_new);
  $('#inp_cc_kendaraan2_ac').val(data[0].cc_new);
                 //tambahan
                 $('#inp_alasan_rangka_ac').val(data[0].r_rangka);
                 $('#inp_alasan_mesin_ac').val(data[0].r_mesin);
                 $('#inp_alasan_namabpkb_ac').val(data[0].r_namabpkb);
                 $('#inp_alasan_alamatbpkb_ac').val(data[0].r_alamatbpkb);
                 $('#inp_alasan_nobpkb_ac').val(data[0].r_nobpkb);
                 $('#inp_alasan_noregbpkb_ac').val(data[0].r_noregbpkb);
                 $('#inp_alasan_warna_ac').val(data[0].r_warna);
                 $('#inp_alasan_model_ac').val(data[0].r_model);
                 $('#inp_alasan_nopol_ac').val(data[0].r_nopol);
                 $('#inp_alasan_tglbpkb_ac').val(data[0].r_tglbpkb);
                 $('#inp_alasan_thnproduksi_ac').val(data[0].r_thnpembuatan);
                 $('#inp_alasan_thnrakit_ac').val(data[0].r_thnkendaraan);
                 $('#inp_alasan_cc_ac').val(data[0].r_cc);
                 $('#inp_alasan_nobastk_ac').val(data[0].r_bastkno);

                 
               }else {
                $('#inp_no_mesin2_ac').val("");
                $('#inp_no_rangka2_ac').val("");
                $('#inp_nama_bpkb2_ac').val("");
                $('#inp_alamat_bpkb2_ac').val("");
                $('#inp_no_bpkb2_ac').val("");
                $('#inp_no_reg2_bpkb_ac').val("");
                $('#inp_warna2_ac').val("");
                $('#inp_model3_ac').val("");
                $('#inp_nopol2_ac').val("");
                $('#inp_tgl_bpkb2_ac').val("");
                $('#inp_tahun2_ac').val("");
                $('#inp_tahun_rakit2_ac').val("");
                $('#inp_no_refferal2_ac').val("");
                $('#inp-carabayar-ac').val("");
                $('#inp_biaya_tarik2_ac').val("");
                $('#inp_cc_kendaraan2_ac').val("");
  //tambahan
  $('#inp_alasan_mesin_ac').val("");
  $('#inp_alasan_namabpkb_ac').val("");
  $('#inp_alasan_alamatbpkb_ac').val("");
  $('#inp_alasan_nobpkb_ac').val("");
  $('#inp_alasan_noregbpkb_ac').val("");
  $('#inp_alasan_warna_ac').val("");
  $('#inp_alasan_model_ac').val("");
  $('#inp_alasan_nopol_ac').val("");
  $('#inp_alasan_tglbpkb_ac').val("");
  $('#inp_alasan_thnproduksi_ac').val("");
  $('#inp_alasan_thnrakit_ac').val("");
  $('#inp_alasan_cc_ac').val("");
  $('#inp_alasan_nobastk_ac').val("");

}
}else if(v_flag === 2){
  var result = map2[contract_id];
  var result2 = map3[contract_id];

  if(result[0].model_new_desc == "null"){
   model_new_desc = "";
    }else{
      model_new_desc = result[0].model_new_desc;
  }


  $('#inp_no_rangka_ac').val(result[0]['chassis_no']);
  $('#inp_no_mesin_ac').val(result[0]['engine_no']);
  $('#inp_nama_bpkb_ac').val(result[0]['register_name']);
  $('#inp_alamat_bpkb_ac').val(result[0]['register_address']);
  $('#inp_nopol_ac').val(result[0]['plate_no']);

  try{
     $('#inp_no_bpkb_ac').val(result2[0]['nomor_bpkb']);
    //$('#inp_nama_bpkb_ac').val(result['hasilCcs'][0]['nama_pada_bpkb']);
  }catch(e){

  }

  $('#inp_warna_ac').val(result[0]['object_color']);
  $('#inp_model4_ac').val(result[0]['object_model']);
  $('#inp_model_ac').val(result[0]['object_model_desc']);

  $('#inp_tahun_ac').val(result[0]['production_year']);
  $('#inp_tahun_rakit_ac').val(result[0]['manufacture_year']);
  $('#inp_cc_kendaraan_ac').val(result[0]['engine_capacity']);
  $('#inp_no_rangka2_ac').val(result[0]['rangka_new']);
  $('#inp_no_mesin2_ac').val(result[0]['engine_new']);
  $('#inp_nama_bpkb2_ac').val(result[0]['namabpkb_new']);
  $('#inp_alamat_bpkb2_ac').val(result[0]['alamatbpkb_new']);
  $('#inp_no_bpkb2_ac').val(result[0]['nobpkb_new']);
  $('#inp_no_reg2_bpkb_ac').val(result[0]['noregbpkb_new']);
  $('#inp_warna2_ac').val(result[0]['warna_new']);
  $('#inp_model2_ac').val(result[0]['model_new']);
  $('#inp_model3_ac').val(model_new_desc);
  $('#inp_nopol2_ac').val(result[0]['nopol_new']);
  $('#inp_tgl_bpkb2_ac').val(result[0]['tglbastk_new']);
  $('#inp_tahun2_ac').val(result[0]['thnproduksi_new']);
  $('#inp_tahun_rakit2_ac').val(result[0]['thnkendaraan_new']);
  $('#inp_cc_kendaraan2_ac').val(result[0]['cc_new']);
                                      //tambahan
                                      $('#inp_alasan_rangka_ac').val(result[0]['r_rangka']);
                                      $('#inp_alasan_mesin_ac').val(result[0]['r_mesin']);
                                      $('#inp_alasan_namabpkb_ac').val(result[0]['r_namabpkb']);
                                      $('#inp_alasan_alamatbpkb_ac').val(result[0]['r_alamatbpkb']);
                                      $('#inp_alasan_nobpkb_ac').val(result[0]['r_nobpkb']);
                                      $('#inp_alasan_noregbpkb_ac').val(result[0]['r_noregbpkb']);
                                      $('#inp_alasan_warna_ac').val(result[0]['r_warna']);
                                      $('#inp_alasan_model_ac').val(result[0]['r_model']);
                                      $('#inp_alasan_nopol_ac').val(result[0]['r_nopol']);
                                      $('#inp_alasan_tglbpkb_ac').val(result[0]['r_tglbpkb']);
                                      $('#inp_alasan_thnproduksi_ac').val(result[0]['r_thnpembuatan']);
                                      $('#inp_alasan_thnrakit_ac').val(result[0]['r_thnkendaraan']);
                                      $('#inp_alasan_cc_ac').val(result[0]['r_cc']);

                                    }else{
                                      var result = map2[contract_id];
                                      var result2 = map3[contract_id];

                                      if(result[0].model_new_desc == "null"){
                                          model_new_desc = "";
                                      }else{
                                        model_new_desc = result[0].model_new_desc;
                                      }

                                      $('#inp_no_rangka_ac').val(result[0]['chassis_no']);
                                      $('#inp_no_mesin_ac').val(result[0]['engine_no']);
                                      $('#inp_nama_bpkb_ac').val(result[0]['register_name']);
                                      $('#inp_alamat_bpkb_ac').val(result[0]['register_address']);
                                      $('#inp_nopol_ac').val(result[0]['plate_no']);

                                      try{
                                        $('#inp_no_bpkb_ac').val(result2[0]['nomor_bpkb']);
                                       /* $('#inp_no_reg_bpkb_ac').val(result2[0]['no_faktur']);
                                        $('#inp_tgl_bpkb_ac').val(result2[0]['appl_ppd_date']);*/
                                      }catch(e){

                                      }

                                      $('#inp_warna_ac').val(result[0]['object_color']);
                                      $('#inp_model4_ac').val(result[0]['object_model']);
                                      $('#inp_model_ac').val(result[0]['object_model_desc']);

                                      $('#inp_tahun_ac').val(result[0]['production_year']);
                                      $('#inp_tahun_rakit_ac').val(result[0]['manufacture_year']);
                                      $('#inp_cc_kendaraan_ac').val(result[0]['engine_capacity']);
                                      $('#inp_no_rangka2_ac').val(result[0]['rangka_new']);
                                      $('#inp_no_mesin2_ac').val(result[0]['engine_new']);
                                      $('#inp_nama_bpkb2_ac').val(result[0]['namabpkb_new']);
                                      $('#inp_alamat_bpkb2_ac').val(result[0]['alamatbpkb_new']);
                                      $('#inp_no_bpkb2_ac').val(result[0]['nobpkb_new']);
                                      $('#inp_no_reg2_bpkb_ac').val(result[0]['noregbpkb_new']);
                                      $('#inp_warna2_ac').val(result[0]['warna_new']);
                                      $('#inp_model2_ac').val(result[0]['model_new']);
                                      $('#inp_model3_ac').val(model_new_desc);
                                      $('#inp_nopol2_ac').val(result[0]['nopol_new']);
                                      $('#inp_tgl_bpkb2_ac').val(result[0]['tglbastk_new']);
                                      $('#inp_tahun2_ac').val(result[0]['thnproduksi_new']);
                                      $('#inp_tahun_rakit2_ac').val(result[0]['thnkendaraan_new']);
                                      $('#inp_cc_kendaraan2_ac').val(result[0]['cc_new']);
                                      //tambahan
                                      $('#inp_alasan_rangka_ac').val(result[0]['r_rangka']);
                                      $('#inp_alasan_mesin_ac').val(result[0]['r_mesin']);
                                      $('#inp_alasan_namabpkb_ac').val(result[0]['r_namabpkb']);
                                      $('#inp_alasan_alamatbpkb_ac').val(result[0]['r_alamatbpkb']);
                                      $('#inp_alasan_nobpkb_ac').val(result[0]['r_nobpkb']);
                                      $('#inp_alasan_noregbpkb_ac').val(result[0]['r_noregbpkb']);
                                      $('#inp_alasan_warna_ac').val(result[0]['r_warna']);
                                      $('#inp_alasan_model_ac').val(result[0]['r_model']);
                                      $('#inp_alasan_nopol_ac').val(result[0]['r_nopol']);
                                      $('#inp_alasan_tglbpkb_ac').val(result[0]['r_tglbpkb']);
                                      $('#inp_alasan_thnproduksi_ac').val(result[0]['r_thnpembuatan']);
                                      $('#inp_alasan_thnrakit_ac').val(result[0]['r_thnkendaraan']);
                                      $('#inp_alasan_cc_ac').val(result[0]['r_cc']);

                                    }


                                    get_roleAc();
                                  }


  }
});

flag_update = 0;
map_validasi = {};
$('#table_view_correction tbody').on('click', 'tr', function() {
                                });

//=======================================================================BUTTON SURAT PERMOHONAN==========================================================//
$('#surat_permohonan_ac').click(function(){
  var disetujui_oleh_ac = $('#inp-disetujui1-ac').val();
  var disetujui_oleh_ac2 = $('#inp-disetujui2-ac').val();
  

  if(disetujui_oleh_ac === "" || disetujui_oleh_ac2 ===""){
    alert_info('Kolom Disetujui Oleh Tidak Boleh Kosong');
    $('#div-list-disetujui1-ac').addClass('has-error');
    $('#div-list-disetujui2-ac').addClass('has-error');
  }else{
    var pages_ac = table_view_correction.page();
    var limits_ac = table_view_correction.page.len();
    var table_leng_ac = table_view_correction.rows().data().length ;
    var search_correction  = table_view_correction.search();
    table_view_correction.search("");
    table_view_correction.page.len(table_leng_ac);
    table_view_correction.draw();

 // debugger;
 var arrayData  = [];
 var tess2 = table_view_correction.rows('.selected').data();
 if (check_session() === 'true') {
   if ($('input:checkbox:checked', '#table_view_correction').not("#chk_all_tabel_ac").length < 1 ){
    alert_info('Tidak Ada Data Yang Dipilih');
   table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
  return false;

  } else {
   contract_id = tess2[0][7];
   nama_debitur = tess2[0][3];
   nomor_permohonan = tess2[0][2];
   if(nomor_permohonan != null){
    alert_warning('Kontrak Sudah Memiliki Nomor Permohonan. Silahkan Konfirmasi Terlebih Dahulu');
   table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
  return false;
  }
  var listData = [];
  var contract_no = $('#inp-no-kontrak-ac').val();
  var branch_id = $('#inp-cabang-ac').val();
  var no_rangka = $('#inp_no_rangka_ac').val();
  var no_rangka_new = $('#inp_no_rangka2_ac').val();
  var no_mesin = $('#inp_no_mesin_ac').val();
  var no_mesin_new = $('#inp_no_mesin2_ac').val();
  var nama_bpkb = $('#inp_nama_bpkb_ac').val();
  var nama_bpkb_new = $('#inp_nama_bpkb2_ac').val();
  var alamat_bpkb = $('#inp_alamat_bpkb_ac').val();
  var alamat_bpkb_new = $('#inp_alamat_bpkb2_ac').val();
  var no_bpkb = $('#inp_no_bpkb_ac').val();
  var no_bpkb_new = $('#inp_no_bpkb2_ac').val();
  var reg_bpkb = $('#inp_no_reg_bpkb_ac').val();
  var reg_bpkb_new = $('#inp_no_reg2_bpkb_ac').val();
  var warna = $('#inp_warna_ac').val();
  var warna_new = $('#inp_warna2_ac').val();
  var model = $('#inp_model4_ac').val();
  var model_cetak = $('#inp_model_ac').val();
  var model_new = $('#inp_model2_ac').val();
  var model_new_cetak = $('#inp_model3_ac').val();
  var nopol = $('#inp_nopol_ac').val();
  var nopol_new = $('#inp_nopol2_ac').val();
  var tgl_bpkb = $('#inp_tgl_bpkb_ac').val();
  var tgl_bpkb_new = $('#inp_tgl_bpkb2_ac').val();
  var thn_produksi = $('#inp_tahun_ac').val();
  var thn_produksi_new = $('#inp_tahun2_ac').val();
  var thn_kendaraan = $('#inp_tahun_rakit_ac').val();
  var thn_kendaraan_new = $('#inp_tahun_rakit2_ac').val();
  var cc = $('#inp_cc_kendaraan_ac').val();
  var cc_new = $('#inp_cc_kendaraan2_ac').val();
   //tambahan
   var r_rangka = $('#inp_alasan_rangka_ac :selected').val();
   var r_mesin = $('#inp_alasan_mesin_ac :selected').val();
   var r_rangkadesc = $('#inp_alasan_rangka_ac').find(":selected").text();
   var r_mesindesc = $('#inp_alasan_mesin_ac').find(":selected").text();
   var r_namabpkb = $('#inp_alasan_namabpkb_ac :selected').val();
   var r_namabpkbdesc = $('#inp_alasan_namabpkb_ac').find(":selected").text();
   var r_alamatbpkb = $('#inp_alasan_alamatbpkb_ac :selected').val();
   var r_alamatbpkbdesc = $('#inp_alasan_alamatbpkb_ac').find(":selected").text();
   var r_nobpkb = $('#inp_alasan_nobpkb_ac :selected').val();
   var r_nobpkbdesc = $('#inp_alasan_nobpkb_ac').find(":selected").text();
   var r_noregbpkb = $('#inp_alasan_noregbpkb_ac :selected').val();
   var r_noregbpkbdesc = $('#inp_alasan_noregbpkb_ac').find(":selected").text();
   var r_warna = $('#inp_alasan_warna_ac :selected').val();
   var r_warnadesc = $('#inp_alasan_warna_ac').find(":selected").text();
   var r_warna = $('#inp_alasan_warna_ac :selected').val();
   var r_model = $('#inp_alasan_model_ac :selected').val();
   var r_modeldesc = $('#inp_alasan_model_ac').find(":selected").text();
   var r_nopol = $('#inp_alasan_nopol_ac :selected').val();
   var r_nopoldesc = $('#inp_alasan_nopol_ac').find(":selected").text();
    //var r_tglbpkb = $('#inp_alasan_tglbpkb_ac').val();
    var r_thnpembuatan = $('#inp_alasan_thnproduksi_ac :selected').val();
    var r_thnpembuatandesc = $('#inp_alasan_thnproduksi_ac').find(":selected").text();
    var r_thnkendaraan = $('#inp_alasan_thnrakit_ac :selected').val();
    var r_thnkendaraandesc = $('#inp_alasan_thnrakit_ac').find(":selected").text();
    var r_cc = $('#inp_alasan_cc_ac :selected').val();
    var r_ccdesc = $('#inp_alasan_cc_ac').find(":selected").text();


 //debugger;
 listData.push ({   
  "status_update":0,
  "contract_no" : contract_no,
  "branch_id" : branch_id,
  "no_rangka" : no_rangka,
  "no_rangka_new" : no_rangka_new,
  "no_mesin" : no_mesin,
  "no_mesin_new" : no_mesin_new,
  "nama_bpkb" : nama_bpkb,
  "nama_bpkb_new" : nama_bpkb_new,
  "alamat_bpkb" : alamat_bpkb,
  "alamat_bpkb_new" : alamat_bpkb_new,
  "no_bpkb" : no_bpkb,
  "no_bpkb_new" : no_bpkb_new,

  "warna" : warna,
  "warna_new" : warna_new,
  "model" : model,
  "model_new" : model_new,
  "nopol" :nopol,
  "nopol_new" : nopol_new,

  "thn_produksi" : thn_produksi,
  "thn_produksi_new" : thn_produksi_new,
  "thn_kendaraan" : thn_kendaraan,
  "thn_kendaraan_new" : thn_kendaraan_new,
  "cc" :cc,
  "cc_new" :cc_new,
          //tambahan
          "r_rangka" : r_rangka,
          "r_mesin" : r_mesin,
          "r_namabpkb" :r_namabpkb,
          "r_alamatbpkb" : r_alamatbpkb,
          "r_nobpkb" : r_nobpkb,

          "r_warna" : r_warna,
          "r_model" : r_model,
          "r_nopol" : r_nopol,

          "r_thnpembuatan" :r_thnpembuatan,
          "r_thnkendaraan" :r_thnkendaraan,
          "r_cc" :r_cc,
          // deskripsi

          "r_rangkadesc" : r_rangkadesc,
          "r_mesindesc" : r_mesindesc,
          "r_alamatbpkbdesc" : r_alamatbpkbdesc,
          "r_nobpkbdesc" : r_nobpkbdesc,
          "r_warnadesc" : r_warnadesc,
          "r_modeldesc" : r_modeldesc,
          "r_nopoldesc" : r_nopoldesc,
          "r_thnpembuatandesc" : r_thnpembuatandesc,
          "r_ccdesc" : r_ccdesc,
          "r_thnkendaraandesc" : r_thnkendaraandesc, 
          "nama_debitur" : nama_debitur,
          "model_cetak" : model_cetak,
          "model_new_cetak" : model_new_cetak
        });


 map[contract_id] = listData;


 for (var i = 0; i < table_view_correction.rows().data().length; i++) {
   if ($('#chk-all-tabel-ac'+i).is(":checked")) {

     var temp = table_view_correction.rows(i).data();
     var data = map[temp[0][7]];

     var contract_no = temp[0][1];
     var nama_debitur = temp[0][3];
     var no_permohonan_s = temp[0][2];
     var branch_id = data[0].branch_id;
     var no_rangka = data[0].no_rangka;
     var no_rangka_new = data[0].no_rangka_new;
     var no_mesin = data[0].no_mesin;
     var no_mesin_new = data[0].no_mesin_new;
     var nama_bpkb = data[0].nama_bpkb;
     var nama_bpkb_new = data[0].nama_bpkb_new;
     var alamat_bpkb = data[0].alamat_bpkb;
     var alamat_bpkb_new = data[0].alamat_bpkb_new;
     var no_bpkb = data[0].no_bpkb;
     var no_bpkb_new = data[0].no_bpkb_new;

     var warna = data[0].warna;
     var warna_new = data[0].warna_new;
     var model = data[0].model;
     var model_new = data[0].model_new;
     var nopol = data[0].nopol;
     var nopol_new = data[0].nopol_new;

     var thn_produksi = data[0].thn_produksi;
     var thn_produksi_new = data[0].thn_produksi_new;
     var thn_kendaraan = data[0].thn_kendaraan;
     var thn_kendaraan_new = data[0].thn_kendaraan_new;
     var cc = data[0].cc;
     var cc_new = data[0].cc_new;
     //tambahan
     var r_rangka = data[0].r_rangka;
     var r_mesin = data[0].r_mesin;
     var r_namabpkb = data[0].r_namabpkb;
     var r_alamatbpkb = data[0].r_alamatbpkb;
     var r_nobpkb = data[0].r_nobpkb;

     var r_warna = data[0].r_warna;
     var r_model = data[0].r_model;
     var r_nopol = data[0].r_nopol;

     var r_thnpembuatan = data[0].r_thnpembuatan;
     var r_thnkendaraan = data[0].r_thnkendaraan;
     var r_cc = data[0].r_cc;

     var r_rangkadesc = data[0].r_rangkadesc;
     var r_mesindesc = data[0].r_mesindesc;

     var r_rangkadesc = data[0].r_rangkadesc;
     var r_mesindesc = data[0].r_mesindesc;
     var r_alamatbpkbdesc = data[0].r_alamatbpkbdesc;
     var r_nobpkbdesc = data[0].r_nobpkbdesc;
     var r_warnadesc = data[0].r_warnadesc;
     var r_modeldesc = data[0].r_modeldesc;
     var r_nopoldesc = data[0].r_nopoldesc;
     var r_thnpembuatandesc = data[0].r_thnpembuatandesc;
     var r_ccdesc = data[0].r_ccdesc;
     var r_thnkendaraandesc = data[0].r_thnkendaraandesc;
     var model_cetak = data[0].model_cetak;
     var model_new_cetak = data[0].model_new_cetak;

     if(no_permohonan_s != null){
        alert_warning('Kontrak Sudah Memiliki Nomor Permohonan. Silahkan Konfirmasi Terlebih Dahulu');
  table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
  return false;
     }

      if(no_rangka_new != "" && r_rangka ==="" ){
  alert_warning('Alasan Harus Diisi');
  table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
  return false;
}
else if(no_mesin_new != "" && r_mesin ===""){
  alert_warning('Alasan Harus Diisi');
  table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
  return false;
}
else if(nama_bpkb_new != "" && r_namabpkb ===""){
  alert_warning('Alasan Harus Diisi');
  table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
  return false;
}
else if(alamat_bpkb_new != "" && r_alamatbpkb === ""){
  alert_warning('Alasan Harus Diisi');
  table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
  return false;
}
else if(no_bpkb_new != "" && r_nobpkb ===""){
  alert_warning('Alasan Harus Diisi');
  table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
  return false;
}
else if(warna_new != "" && r_warna === ""){
  alert_warning('Alasan Harus Diisi');
  table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
  return false;
}
else if(nopol_new != "" && r_nopol ===""){
  alert_warning('Alasan Harus Diisi');
  table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
  return false;
}
else if(thn_produksi_new != "" && r_thnpembuatan ===""){
  alert_warning('Alasan Harus Diisi');
  table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
  return false;
}
else if(thn_kendaraan_new != "" && r_thnkendaraan ===""){
  alert_warning('Alasan Harus Diisi');
  table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
  return false;
}
else if(cc_new != "" && r_cc ===""){
  alert_warning('Alasan Harus Diisi');
  table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
  return false;
}else if(model_new_cetak != "" && r_model ===""){
  alert_warning('Alasan Harus Diisi');
  table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
  return false;
}

if(no_rangka_new === "" && no_mesin_new === "" && nama_bpkb_new === "" && alamat_bpkb_new === "" && no_bpkb_new === ""  && warna_new === "" && nopol_new === ""  && thn_produksi_new === "" && thn_kendaraan_new === ""  && cc_new === "" && model_new === ""){
    alert_warning('Data Tidak Mengalami Perubahan. Mohon di cek Kembali');
  }

    // debugger;


    arrayData.push ({   
      contract_id : temp[0][7],
      contract_no : contract_no,
      branch_id : branch_id,
      no_rangka : no_rangka,
      no_rangka_new : no_rangka_new,
      no_mesin : no_mesin,
      no_mesin_new : no_mesin_new,
      nama_bpkb : nama_bpkb,
      nama_bpkb_new : nama_bpkb_new,
      alamat_bpkb :alamat_bpkb,
      alamat_bpkb_new : alamat_bpkb_new,
      no_bpkb :no_bpkb,
      no_bpkb_new :no_bpkb_new,

      warna :warna,
      warna_new :warna_new,
      model :model,
      model_new :model_new,
      nopol :nopol,
      nopol_new :nopol_new,

      thn_produksi :thn_produksi,
      thn_produksi_new :thn_produksi_new,
      thn_kendaraan:thn_kendaraan,
      thn_kendaraan_new :thn_kendaraan_new,
      cc :cc,
      cc_new :cc_new,
      //tambahan
      r_rangka : r_rangka,
      
      r_mesin : r_mesin,

      r_namabpkb : r_namabpkb,
      r_namabpkbdesc : r_namabpkbdesc,
      r_alamatbpkb : r_alamatbpkb,
      r_nobpkb : r_nobpkb,
      r_warna : r_warna,
      r_model : r_model,
      r_nopol : r_nopol,
      r_thnpembuatan : r_thnpembuatan,
      r_thnkendaraan : r_thnkendaraan,
      r_cc : r_cc,
      nama_debitur : nama_debitur,
      r_rangkadesc : r_rangkadesc,
      r_mesindesc : r_mesindesc,
      r_alamatbpkbdesc : r_alamatbpkbdesc,
      r_nobpkbdesc : r_nobpkbdesc,
      r_warnadesc : r_warnadesc,
      r_modeldesc : r_modeldesc,
      r_nopoldesc : r_nopoldesc,
      r_thnpembuatandesc : r_thnpembuatandesc,
      r_ccdesc : r_ccdesc,
      r_thnkendaraandesc : r_thnkendaraandesc,
      model_cetak : model_cetak,
      model_new_cetak :model_new_cetak

    });

     //debugger;
   }
 }


 

  if(no_rangka_new === "" && no_mesin_new === "" && nama_bpkb_new === "" && alamat_bpkb_new === "" && no_bpkb_new === ""  && warna_new === "" && nopol_new === ""  && thn_produksi_new === "" && thn_kendaraan_new === ""  && cc_new === "" && model_new === ""){
    alert_warning('Data Tidak Mengalami Perubahan. Mohon di cek Kembali');
  }else{
    alert_confirm("Apakah anda yakin membuat surat permohonan?", function(){
     $('#div-list-disetujui1-ac').removeClass('has-error');
     $('#div-list-disetujui2-ac').removeClass('has-error');
     insertData_correction(arrayData,disetujui_oleh_ac,disetujui_oleh_ac2);

   });
  }

}
table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
}

else if (check_session() === 'false') {
  alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
    localStorage.clear();
    window.location.href = base_url + "Controller_login/login_view";
  });
}

}
});



//===========================================================FUNGSI BUTTON SURAT PERMOHONAN==============================================================//
function insertData_correction(arrayData,disetujui_oleh_ac,disetujui_oleh_ac2){



  $.ajax({
    url: base_url + "Controller_asset_correction/insertAssetCorrection",
    cache: false,
    type: 'post',
    data : {arrayData,disetujui_oleh_ac,disetujui_oleh_ac2},
    dataType: 'json',
    success: function(response){
      //debugger;
      if(response){
        try{

          console.log(response);
          var data =JSON.stringify(response);
          var v = $.parseJSON(response);
          //debugger;

          if(v['status2'] == '200'){

            alert_info(v['pesan']);
            $('#inp-no-permohonan-ac').val(v['p_permohonan']);
            var dataDisetujui = $('#inp-disetujui1-ac').val().toUpperCase();
            var dataDisetujui2 = $('#inp-disetujui2-ac').val().toUpperCase();
            var tess2 = table_view_correction.rows('.selected').data()
            var arraynama = [];
            for (var i=0 ; i<tess2.length;i++){
              arraynama.push(tess2[i][3]);
            }
            var dataJson = JSON.stringify(v); 
            var dataHasil = JSON.stringify(arrayData);
            //debugger;
               //untuk cetak pdf
               $('#penampung').val(dataJson);
               $('#penampung2').val(dataDisetujui);
               $('#penampung3').val(dataDisetujui2);
               $('#dataCetak').val(dataHasil);
               $('#idForm').submit();
               $('#surat_permohonan_ac').prop('disabled',true);
               //debugger;

               $('.inp-ac').val("");
               $('.inp-ac2').val("");
               $('.inp-edit-ac').val("");
               $('.inp-edit-alasan-ac').val("");
               $('#inp_nopol2_ac').val("");
               table_view_correction.clear().draw();
                //debugger;
              map2 = {};


             }else if(v['status2'] == '500'){
              alert_warning(v['pesan2']);
            }else{
              if(v['pesan'].includes('DALAM PROSES PERMOHONAN')){
                alert_warning(v['pesan']);
              } else{
                if(v['status'] == '500'){
                 alert_error(v['pesan']); 
               }
             }
           }
         }catch(e){
          $('#loading-ajax').hide();
          alert_error(e);
        }
      }else{
        alert_error("Cek Jaringan");
      }

    },
    error:function(response){
      console.log(response);
      if (response['responseText'] === "" && response['statusText'] === 'OK') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
          localStorage.clear();
          window.location.href = base_url + "Controller_login/login_view";
        });
      }
    }
  });
}


//===============================================================BUTTON CETAK LIST====================================================================//
/*$('#cetak-list').click(function(){
  //debugger;
  var arrayData  = [];
  var tess2 = table_view_correction.rows('.selected').data()
  contract_id = tess2[0][7];
  var listData = [];

  if (check_session() === 'true') {
    var contract_no = $('#inp-no-kontrak-ac').val();
    var branch_id = $('#inp-cabang-ac').val();
    var no_rangka = $('#inp_no_rangka_ac').val();
    var no_rangka_new = $('#inp_no_rangka2_ac').val();
    var no_mesin = $('#inp_no_mesin_ac').val();
    var no_mesin_new = $('#inp_no_mesin2_ac').val();
    var nama_bpkb = $('#inp_nama_bpkb_ac').val();
    var nama_bpkb_new = $('#inp_nama_bpkb2_ac').val();
    var alamat_bpkb = $('#inp_alamat_bpkb_ac').val();
    var alamat_bpkb_new = $('#inp_alamat_bpkb2_ac').val();
    var no_bpkb = $('#inp_no_bpkb_ac').val();
    var no_bpkb_new = $('#inp_no_bpkb2_ac').val();
    var reg_bpkb = $('#inp_no_reg_bpkb_ac').val();
    var reg_bpkb_new = $('#inp_no_reg2_bpkb_ac').val();
    var warna = $('#inp_warna_ac').val();
    var warna_new = $('#inp_warna2_ac').val();
    var model = $('#inp_model_ac').val();
    var model_new = $('#inp_model3_ac').val();
    var nopol = $('#inp_nopol_ac').val();
    var nopol_new = $('#inp_nopol2_ac').val();
    var tgl_bpkb = $('#inp_tgl_bpkb_ac').val();
    var tgl_bpkb_new = $('#inp_tgl_bpkb2_ac').val();
    var thn_produksi = $('#inp_tahun_ac').val();
    var thn_produksi_new = $('#inp_tahun2_ac').val();
    var thn_kendaraan = $('#inp_tahun_rakit_ac').val();
    var thn_kendaraan_new = $('#inp_tahun_rakit2_ac').val();
    var tgl_bastk = $('#inp_tgl_bastk_ac').val();
    var tgl_bastk_new = $('#inp_tgl_bastk2_ac').val();
    var no_refferal = $('#inp_no_refferal_ac').val();
    var no_refferal_new = $('#inp_no_refferal2_ac').val();
    var cara_bayar = $('#inp_payment_method_ac').val();
    var cara_bayar_new = $('#inp-carabayar-ac').val();
    var biaya_tarik = $('#inp_biaya_tarik_ac').val();
    var biaya_tarik_new = $('#inp_biaya_tarik2_ac').val();
    var cc = $('#inp_cc_kendaraan_ac').val();
    var cc_new = $('#inp_cc_kendaraan2_ac').val();


        //debugger;
        listData.push ({   
          "contract_no" : contract_no,
          "branch_id" : branch_id,
          "no_rangka" : no_rangka,
          "no_rangka_new" : no_rangka_new,
          "no_mesin" : no_mesin,
          "no_mesin_new" : no_mesin_new,
          "nama_bpkb" : nama_bpkb,
          "nama_bpkb_new" : nama_bpkb_new,
          "alamat_bpkb" : alamat_bpkb,
          "alamat_bpkb_new" : alamat_bpkb_new,
          "no_bpkb" : no_bpkb,
          "no_bpkb_new" : no_bpkb_new,
          "reg_bpkb" : reg_bpkb,
          "reg_bpkb_new" : reg_bpkb_new,
          "warna" : warna,
          "warna_new" : warna_new,
          "model" : model,
          "model_new" : model_new,
          "nopol" :nopol,
          "nopol_new" : nopol_new,
          "tgl_bpkb" : tgl_bpkb,
          "tgl_bpkb_new" : tgl_bpkb_new, 
          "thn_produksi" : thn_produksi,
          "thn_produksi_new" : thn_produksi_new,
          "thn_kendaraan" : thn_kendaraan,
          "thn_kendaraan_new" : thn_kendaraan_new,
          "tgl_bastk" : tgl_bastk,
          "tgl_bastk_new" : tgl_bastk_new,
          "no_refferal" : no_refferal, 
          "no_refferal_new" : no_refferal_new,
          "cara_bayar" : cara_bayar,
          "cara_bayar_new" : cara_bayar_new,
          "biaya_tarik" :biaya_tarik,
          "biaya_tarik_new" :biaya_tarik_new,
          "cc" :cc,
          "cc_new" :cc_new


        });


        map[contract_id] = listData;


        for (var i = 0; i < table_view_correction.rows().data().length; i++) {
          if ($('#chk-all-tabel-ac'+i).is(":checked")) {
           var temp = table_view_correction.rows(i).data();
           var data = map[temp[0][7]]; 
           var contract_no = temp[0][1];
           var branch_id = data[0].branch_id;
           var no_rangka = data[0].no_rangka;
           var no_rangka_new = data[0].no_rangka_new;
           var no_mesin = data[0].no_mesin;
           var no_mesin_new = data[0].no_mesin_new;
           var nama_bpkb = data[0].nama_bpkb;
           var nama_bpkb_new = data[0].nama_bpkb_new;
           var alamat_bpkb = data[0].alamat_bpkb;
           var alamat_bpkb_new = data[0].alamat_bpkb_new;
           var no_bpkb = data[0].no_bpkb;
           var no_bpkb_new = data[0].no_bpkb_new;
           var reg_bpkb = data[0].reg_bpkb;
           var reg_bpkb_new = data[0].reg_bpkb_new;
           var warna = data[0].warna;
           var warna_new = data[0].warna_new;
           var model = data[0].model;
           var model_new = data[0].model_new;
           var nopol = data[0].nopol;
           var nopol_new = data[0].nopol_new;
           var tgl_bpkb = data[0].tgl_bpkb;
           var tgl_bpkb_new = data[0].tgl_bpkb_new;
           var thn_produksi = data[0].thn_produksi;
           var thn_produksi_new = data[0].thn_produksi_new;
           var thn_kendaraan = data[0].thn_kendaraan;
           var thn_kendaraan_new = data[0].thn_kendaraan_new;
           var tgl_bastk = data[0].tgl_bastk;
           var tgl_bastk_new = data[0].tgl_bastk_new;
           var no_refferal = data[0].no_refferal;
           var no_refferal_new = data[0].no_refferal_new;
           var cara_bayar = data[0].cara_bayar;
           var cara_bayar_new = data[0].cara_bayar_new;
           var biaya_tarik = data[0].biaya_tarik;
           var biaya_tarik_new = data[0].biaya_tarik_new;
           var cc = data[0].cc;
           var cc_new = data[0].cc_new;


           arrayData.push({
            contract_no : contract_no,
            branch_id : branch_id,
            no_rangka : no_rangka,
            no_rangka_new : no_rangka_new,
            no_mesin : no_mesin,
            no_mesin_new : no_mesin_new,
            nama_bpkb : nama_bpkb,
            nama_bpkb_new : nama_bpkb_new,
            alamat_bpkb :alamat_bpkb,
            alamat_bpkb_new : alamat_bpkb_new,
            no_bpkb :no_bpkb,
            no_bpkb_new :no_bpkb_new,
            reg_bpkb : reg_bpkb,
            reg_bpkb_new :reg_bpkb_new,
            warna :warna,
            warna_new :warna_new,
            model :model,
            model_new :model_new,
            nopol :nopol,
            nopol_new :nopol_new,
            tgl_bpkb :tgl_bpkb,
            tgl_bpkb_new :tgl_bpkb_new,
            thn_produksi :thn_produksi,
            thn_produksi_new :thn_produksi_new,
            thn_kendaraan:thn_kendaraan,
            thn_kendaraan_new :thn_kendaraan_new,
            tgl_bastk :tgl_bastk,
            tgl_bastk_new :tgl_bastk_new,
            no_refferal :no_refferal,
            no_refferal_new :no_refferal_new,
            cara_bayar :cara_bayar,
            cara_bayar_new :cara_bayar_new,
            biaya_tarik :biaya_tarik,
            biaya_tarik_new :biaya_tarik_new,
            cc :cc,
            cc_new :cc_new,
          });
           //debugger;
         }

       }

       if(flag==1){
        flag=0;
        cetak_list_ac(arrayDataCetak);
      } else {
        cetak_list_ac(arrayData);
      }
    }
    else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
      });
    }

  });*/


//==================================================================FUNGSI BUTTON CETAK LIST======================================================================//
/*function cetak_list_ac(arrayData){
  //debugger;
  $.ajax({
    url: "Controller_asset_correction/exportPdfAc",
    cache: false,
    type: 'post',
    data : {arrayData},
    dataType: 'json',
    success: function(response){
      //debugger;

      if(response){
        try{
          console.log(response);
          var data =JSON.stringify(response);
          var v = $.parseJSON(response);
     //debugger;

     if(data.includes('berhasil')){
      alert_info('data telah di cetak');
      var dataJson = JSON.stringify(v); 
      $('#penampung-cetak-ac').val(dataJson);
      $('#idForm2').submit();
        //debugger;

      }else{
       alert_info('kesalahan');
       //debugger;
     }
   }catch(e){
    $('#loading-ajax').hide();
    alert_error(e);
  }
}else{
  alert_error("Cek Jaringan");
}
}, 
error:function(response){
  console.log(response);
  if (response['responseText'] === "" && response['statusText'] === 'OK') {
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }
}
});
}*/



//=====================================================================================


$('#btn-create-nopermohonan-ac').click(function(){
  var branch_code = $('#inp-cabang-ac').val();
  if(branch_code === ""){
    alert_info('Isi Cabang Terlebih Dahulu');
    $('#div-list-branch-ac').addClass('has-error');
  }else{
    $('#btn-create-nopermohonan-ac').prop('disabled', false);
    $('#inp-no-permohonan-ac').val('XXXXXXXXXXXXXX');
    $('#inp-no-permohonan-ac').prop('disabled',true);
    $('#btn-search-no-permohonan-ac').prop('disabled',true);
    $('#all-ac').removeAttr('disabled');
    $('#ppd-ac').removeAttr('disabled');
    $('#btn-search-ac').removeAttr('disabled');
    $('.inp-ac').val("");
    $('.inp-ac2').val("");
    $('.inp-edit-ac').val("");
    $('#inp-no-kontrak-ac').val("");
    $('.inp-edit-alasan-ac').val("");
    table_view_correction.clear().draw();
  }
});


$('#ppd-ac').click(function(){
  $('#inp-start-date-ac').removeAttr('disabled');
  $('#inp-no-kontrak-ac').prop('disabled',true);
  $('#inp-no-kontrak-ac').val("");

});

$('#all-ac').click(function(){
  $('#inp-start-date-ac').prop('disabled',true);
  $('#inp-start-date-ac').val("");
  $('#inp-end-date-ac').val("");
  $('#inp-no-kontrak-ac').prop('disabled',false);
});


//====================================================================BUTTON BATALKAN================================================================//
$('#batalkan_koreksi_ac').click(function(){
  //debugger;
  var arrayData  = [];
  var tess2 = table_view_correction.rows('.selected').data()
  console.log(contract_id);
  var listData = [];
  var contract_no = $('#inp-no-kontrak-ac').val();
  var no_permohonan = $('#inp-no-permohonan-ac').val();
  var branch_id = $('#inp-cabang-ac').val();
  var reject_validasi = $('#inp-no-permohonan-ac').val()

  var pages_ac = table_view_correction.page();
  var limits_ac = table_view_correction.page.len();
  var table_leng_ac = table_view_correction.rows().data().length ;
  table_view_correction.page.len(table_leng_ac);
  table_view_correction.draw();

  if (check_session() === 'true') {
   if ($('input:checkbox:checked', '#table_view_correction').not("#chk_all_tabel_ac").length < 1){
    alert_info('Tidak Ada Data Yang Dipilih');
    table_view_correction.page.len(limits_ac);
     table_view_correction.draw();
     table_view_correction.page( pages_ac ).draw('page');
  }else{
  //debugger;
  if(tess2.length > 0){
    contract_id = tess2[0][7];
    no_permohonans = tess2[0][2];
    listData.push ({   
      "contract_no" : contract_no,
      "branch_id" : branch_id

    });
    map[contract_id] = listData;
  }
  for (var i = 0; i < table_view_correction.rows().data().length; i++) {
    if ($('#chk-all-tabel-ac'+i).is(":checked")) {
     var temp = table_view_correction.rows(i).data();
     var data = map[temp[0][7]]; 
     //debugger;   
     var contract_no = temp[0][1];
     //var branch_id = data[0].branch_id;

     arrayData.push({
      contract_no : contract_no,
      branch_id : branch_id,
      no_permohonan : no_permohonan

    });
     //debugger;
     table_view_correction.page.len(limits_ac);
     table_view_correction.draw();
     table_view_correction.page( pages_ac ).draw('page');
   }

 }
 if(reject_validasi === 'XXXXXXXXXXXXXX'){
  alert_info('tidak dapat melakukan reject. nomor permohonan tidak valid');
}else{
 alert_confirm("Apakah anda yakin akan melakukan reject terhadap nomor permohonan "+no_permohonan+ " ?", function(){

   batalkan_asset_kor(arrayData);
 });
}}
}
else if (check_session() === 'false') {
  alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
    localStorage.clear();
    window.location.href = base_url + "Controller_login/login_view";
  });
}

});


//===================================================================FUNGSI BUTTON BATALKAN===============================================================//
function batalkan_asset_kor(arrayData){
  $.ajax({
    url: base_url + "Controller_asset_correction/batalkan_koreksi_ac",
    cache: false,
    type: 'post',
    data : {arrayData},
    dataType: 'json',
    success: function(response){

      if(response){
        try{
          //var tess2 = table_view_correction.rows('.selected').data()
          console.log(response);
          var data =JSON.stringify(response);
          var v = $.parseJSON(response);
          console.log(v);
         // no_permohonans = tess2[0][2];
         var no_permohonan = $('#inp-no-permohonan-ac').val();

         if(v['pesan'] == '200'){
          alert_info("Nomor permohonan "+no_permohonan+" berhasil di reject");
          $('.inp-ac').val("");
          $('.inp-ac').prop('disabled', true);
          $('.inp-edit-ac').prop('disabled', true);
          $("#inp_model3_ac").prop('disabled', true);
          $("#inp-carabayar-ac").prop('disabled', true);
          $('#inp-no-kontrak-ac').val("");
          $('#inp-no-permohonan-ac').val("");
          $('#inp_no_rangka2_ac').val("");
          $('#inp_no_mesin2_ac').val("");
          $('#inp_no_bpkb2_ac').val("");
          $('#inp_alasan_rangka_ac').val("");
          $('#inp_alasan_mesin_ac').val("");
          $('#inp_nama_bpkb2_ac').val("");
          $('#inp_alasan_namabpkb_ac').val("");
          $('#inp_alamat_bpkb2_ac').val("");
          $('#inp_alasan_alamatbpkb_ac').val("");
          $('#inp_no_bpkb2_ac').val("");
          $('#inp_alasan_nobpkb_ac').val("");
          $('#inp_no_reg2_bpkb_ac').val("");
          $('#inp_alasan_noregbpkb_ac').val("");
          $('#inp_warna2_ac').val("");
          $('#inp_alasan_warna_ac').val("");
          $('#inp_model3_ac').val("");
          $('#inp_model4_ac').val("");
          $('#inp_model2_ac').val("");
          $('#inp_alasan_model_ac').val("");
          $('#inp_nopol2_ac').val("");
          $('#inp_alasan_nopol_ac').val("");
          $('#inp_tgl_bpkb2_ac').val("");
          $('#inp_alasan_tglbpkb_ac').val("");
          $('#inp_tahun2_ac').val("");
          $('#inp_alasan_thnproduksi_ac').val("");
          $('#inp_tahun_rakit2_ac').val("");
          $('#inp_alasan_thnrakit_ac').val("");
          $('#inp_alasan_nobastk_ac').val("");
          $('#inp_cc_kendaraan2_ac').val("");
          $('#inp_alasan_cc_ac').val("");
          table_view_correction.clear().draw();


        }else{
          alert_info(v['error']);

        }
      }catch(e){
        $('#loading-ajax').hide();
        alert_error(e);
      }
    }else{
      alert_error("Cek Jaringan");
    }
  }, 
  error:function(response){
    console.log(response);
    if (response['responseText'] === "" && response['statusText'] === 'OK') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
      });
    }
  }
});
}


//=======================================================PENGAMBILAN USER UNTUK VALIDASI==================================================================//

if (!localStorage.getItem('role_user_ac')) {
  $.ajax({
    url : base_url+"Controller_home/get_detail_user",
    cache : false,
    success : function(response){
      console.log(response);
      localStorage.setItem('role_user_ac', response);
      role = $.parseJSON(localStorage.getItem('role_user_ac'));
      console.log(role);
      get_roleAc();

    },
    error: function(response){
      console.log(response);
    }
  });
}else{
  role = $.parseJSON(localStorage.getItem('role_user_ac'));
  get_roleAc();

  console.log(role);
}

//var flagrole_ac = true;

function get_roleAc(){
 if( table_view_correction.data().length > 0){
  var tess2 = table_view_correction.rows('.selected').data()
  no_permohonan = tess2[0][2];
  console.log(no_permohonan);
}
var plag = false;
$.each(role, function(i){
 console.log(role[i]['role_code']);

 if (role[i]['role_code'] === 'ROLE_PENGAJUAN_CORR') {
  $('#surat_permohonan_ac').prop('disabled', false);

  if($('#inp_nopol_ac').val() != ""){
    if(no_permohonan != null){
              $('#inp_nopol2_ac').prop('disabled', true);
              $('#inp_alasan_nopol_ac').prop('disabled', true);
            }else{
    $('#inp_nopol2_ac').prop('disabled', false);
    $('#inp_alasan_nopol_ac').prop('disabled', false);
  }
}
   // flagrole_ac = false;
 }
 if(role[i]['role_code'] === 'ROLE_CONFIRM_CORR'){
   $('#batalkan_koreksi_ac, #konfirmasi_ac').prop('disabled', false);

   $('.inp-ac2').prop('disabled', true);

   
  /* if(plag){
    $('#inp_nopol2_ac').prop('disabled', false);
  }*/
   /*if($('#inp_nopol_ac').val() != ""){
      $('#inp_nopol2_ac').prop('disabled', false);
    }*/
  }

  if(role[i]['role_code'] === 'ROLE_PGJN_CS_CORR'){
    $('.inp-ac2').prop('disabled', true);
    $('#surat_permohonan_ac').prop('disabled', false);
    if($('#inp_nopol_ac').val() == null || $('#inp_nopol_ac').val() == ""){
      $('#inp_nopol2_ac').prop('disabled', false);
      $('#inp_alasan_nopol_ac').prop('disabled', false);
    }else{
      $('#inp_nopol2_ac').prop('disabled', true);
      $('#inp_alasan_nopol_ac').prop('disabled', true);
    }
  }

  if(role[i]['role_code'] === 'ROLE_NOPOL_CORR'){

    $('#surat_permohonan_ac').prop('disabled', false);
      /* if(no_permohonans != null){
          $('#inp_nopol2_ac').prop('disabled',true);
        }*/
        $('#inp-ac2').prop('disabled', true);

        if($('#inp_nopol_ac').val() != null && $('#inp_nopol_ac').val() != ""){
          $('#inp_nopol2_ac').prop('disabled', false);
          $('#inp_alasan_nopol_ac').prop('disabled', false);
          plag = true;
        } else {
          $('#inp_nopol2_ac').prop('disabled', true);
          $('#inp_alasan_nopol_ac').prop('disabled', true);
        }

        if(plag){
          if(no_permohonan != null){
            $('#inp_nopol2_ac').prop('disabled', true);
            $('#inp_alasan_nopol_ac').prop('disabled', true);
          }else{
            if(no_permohonan != null){
              $('#inp_nopol2_ac').prop('disabled', true);
              $('#inp_alasan_nopol_ac').prop('disabled', true);
            }else{
              if($('#inp_nopol_ac').val() == ""){
                $('#inp_nopol2_ac').prop('disabled', true);
                $('#inp_alasan_nopol_ac').prop('disabled', true);
              }else{
                $('#inp_nopol2_ac').prop('disabled', false);
                $('#inp_alasan_nopol_ac').prop('disabled', false);
              }
            }
          }

        }
      }

    });

return false;

}

//================================================================BUTTON KONFIRMASI===================================================================//
$('#konfirmasi_ac').click(function(){
  var validasi_konfirm = $('#inp-no-permohonan-ac').val();
  var pages_ac = table_view_correction.page();
  var limits_ac = table_view_correction.page.len();
  var table_leng_ac = table_view_correction.rows().data().length ;
  table_view_correction.page.len(table_leng_ac);
  table_view_correction.draw();
  table_view_correction.search("");
  //debugger;
  var arrayData  = [];
  var tess2 = table_view_correction.rows('.selected').data()
  if (check_session() === 'true') {
    if ($('input:checkbox:checked', '#table_view_correction').not("#chk_all_tabel_ac").length < 1){
      alert_info('Tidak Ada Data Yang Dipilih');
      table_view_correction.search(search_correction);
table_view_correction.page.len(limits_ac);
table_view_correction.draw();
table_view_correction.page( pages_ac ).draw('page');
    }else{
      if(tess2.length > 0){
       contract_id = tess2[0][7];
       no_permohonan = tess2[0][2];
       console.log(contract_id);

       var listData = [];

       var contract_no = $('#inp-no-kontrak-ac').val();
       var branch_id = $('#inp-cabang-ac').val();
       var no_rangka = $('#inp_no_rangka_ac').val();
       var no_rangka_new = $('#inp_no_rangka2_ac').val();
       var no_mesin = $('#inp_no_mesin_ac').val();
       var no_mesin_new = $('#inp_no_mesin2_ac').val();
       var nama_bpkb = $('#inp_nama_bpkb_ac').val();
       var nama_bpkb_new = $('#inp_nama_bpkb2_ac').val();
       var alamat_bpkb = $('#inp_alamat_bpkb_ac').val();
       var alamat_bpkb_new = $('#inp_alamat_bpkb2_ac').val();
       var no_bpkb = $('#inp_no_bpkb_ac').val();
       var no_bpkb_new = $('#inp_no_bpkb2_ac').val();
       var reg_bpkb = $('#inp_no_reg_bpkb_ac').val();
       var reg_bpkb_new = $('#inp_no_reg2_bpkb_ac').val();
       var warna = $('#inp_warna_ac').val();
       var warna_new = $('#inp_warna2_ac').val();
       var model = $('#inp_model4_ac').val();
       var model_new = $('#inp_model2_ac').val();
       var model_custodian = $('#inp_model3_ac').val();
       var nopol = $('#inp_nopol_ac').val();
       var nopol_new = $('#inp_nopol2_ac').val();
       var tgl_bpkb = $('#inp_tgl_bpkb_ac').val();
       var tgl_bpkb_new = $('#inp_tgl_bpkb2_ac').val();
       var thn_produksi = $('#inp_tahun_ac').val();
       var thn_produksi_new = $('#inp_tahun2_ac').val();
       var thn_kendaraan = $('#inp_tahun_rakit_ac').val();
       var thn_kendaraan_new = $('#inp_tahun_rakit2_ac').val();
       var cc = $('#inp_cc_kendaraan_ac').val();
       var cc_new = $('#inp_cc_kendaraan2_ac').val();


        //debugger;
        listData.push ({   
          "contract_no" : contract_no,
          "branch_id" : branch_id,
          "no_rangka" : no_rangka,
          "no_rangka_new" : no_rangka_new,
          "no_mesin" : no_mesin,
          "no_mesin_new" : no_mesin_new,
          "nama_bpkb" : nama_bpkb,
          "nama_bpkb_new" : nama_bpkb_new,
          "alamat_bpkb" : alamat_bpkb,
          "alamat_bpkb_new" : alamat_bpkb_new,
          "no_bpkb" : no_bpkb,
          "no_bpkb_new" : no_bpkb_new,

          "warna" : warna,
          "warna_new" : warna_new,
          "model" : model,
          "model_new" : model_new,
          "nopol" :nopol,
          "nopol_new" : nopol_new,

          "thn_produksi" : thn_produksi,
          "thn_produksi_new" : thn_produksi_new,
          "thn_kendaraan" : thn_kendaraan,
          "thn_kendaraan_new" : thn_kendaraan_new,
          "cc" :cc,
          "cc_new" :cc_new,
          "no_permohonan":no_permohonan,
          "model_custodian":model_custodian
        });

//debugger;
map[contract_id] = listData;

}
for (var i = 0; i < table_view_correction.rows().data().length; i++) {
  if ($('#chk-all-tabel-ac'+i).is(":checked")) {
   var temp = table_view_correction.rows(i).data();
   var data = map[temp[0][7]]; 
           //debugger;   
           var contract_no = temp[0][1];
           var no_permohonan = temp[0][2];
           /*var branch_id = data[0].branch_id;
           var no_rangka = data[0].no_rangka;
           var no_rangka_new = data[0].no_rangka_new;
           var no_mesin = data[0].no_mesin;
           var no_mesin_new = data[0].no_mesin_new;
           var nama_bpkb = data[0].nama_bpkb;
           var nama_bpkb_new = data[0].nama_bpkb_new;
           var alamat_bpkb = data[0].alamat_bpkb;
           var alamat_bpkb_new = data[0].alamat_bpkb_new;
           var no_bpkb = data[0].no_bpkb;
           var no_bpkb_new = data[0].no_bpkb_new;
          
           var warna = data[0].warna;
           var warna_new = data[0].warna_new;
           var model = data[0].model;
           var model_new = data[0].model_new;
           var nopol = data[0].nopol;
           var nopol_new = data[0].nopol_new;
          
           var thn_produksi = data[0].thn_produksi;
           var thn_produksi_new = data[0].thn_produksi_new;
           var thn_kendaraan = data[0].thn_kendaraan;
           var thn_kendaraan_new = data[0].thn_kendaraan_new;
           var cc = data[0].cc;
           var cc_new = data[0].cc_new;*/


          //  arrayData.push({
          //   contract_no : contract_no,
          //   branch_id : branch_id,
          //   no_rangka : no_rangka,
          //   no_rangka_new : no_rangka_new,
          //   no_mesin : no_mesin,
          //   no_mesin_new : no_mesin_new,
          //   nama_bpkb : nama_bpkb,
          //   nama_bpkb_new : nama_bpkb_new,
          //   alamat_bpkb :alamat_bpkb,
          //   alamat_bpkb_new : alamat_bpkb_new,
          //   no_bpkb :no_bpkb,
          //   no_bpkb_new :no_bpkb_new,
          //   branch_id : branch_id,
          //   warna :warna,
          //   warna_new :warna_new,
          //   /*model :model,
          //   model_new :model_new,*/
          //   nopol :nopol,
          //   nopol_new :nopol_new,
          //   no_mesin_new : no_mesin_new,
          //   thn_produksi :thn_produksi,
          //   thn_produksi_new :thn_produksi_new,
          //   thn_kendaraan:thn_kendaraan,
          //   thn_kendaraan_new :thn_kendaraan_new,
          //   cc : cc,
          //   cc_new :cc_new,
          //   no_permohonan : no_permohonan,
          // });
          // debugger;

        }

      }
      flag=1;
       arrayDataCetak = arrayData.slice(); //mengcopy arrayDataCetak dan arrayData
       if(no_rangka_new === "" && no_mesin_new === "" && nama_bpkb_new === "" && alamat_bpkb_new === "" && no_bpkb_new === ""  && warna_new === "" && model_new === "" && nopol_new === ""  && thn_produksi_new === "" && thn_kendaraan_new ==="" && cc_new === ""){
        alert_info('Data Yang Baru Belum Lengkap');

      }else{
        if(validasi_konfirm === 'XXXXXXXXXXXXXX'){
          alert_info('tidak dapat melakukan konfirmasi. nomor permohonan tidak valid');
        }else{



          alert_confirm("Apakah anda yakin akan melakukan konfirmasi terhadap nomor permohonan "+no_permohonan+" ?", function(){

            /*if($('input:checkbox:checked', '#table_view_correction').not("#chk_all_tabel_ac").length < table_leng_ac){
              alert_info('Ada Data Yang Tidak Dipilih');
            }else{*/
             for (var i = 0; i < table_view_correction.rows().data().length; i++) {
              if ($('#chk-all-tabel-ac'+i).is(":checked")) {
               var temp = table_view_correction.rows(i).data();
               var data = map[temp[0][7]]; 
           //debugger;   
           var contract_no = temp[0][1];
           var no_permohonan = temp[0][2];
         }
       }

       //debugger;
       if(no_permohonan == null){
        alert_info("Nomor kontrak belum diajukan. Silahkan ajukan nomor permohonan");
      }else{
        var no_permohonan = $('#inp-no-permohonan-ac').val();
         var model_custodian = $('#inp_model3_ac').val();
        update_correction(arrayData,no_permohonan, model_custodian);
      }
      //}
    });
        }
      }
    }
    table_view_correction.page.len(limits_ac);
    table_view_correction.draw();
    table_view_correction.page( pages_ac ).draw('page');
  }
  else if (check_session() === 'false') {
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }
});


//=============================================================FUNGSI BUTTON KONFIRMASI===================================================================//
function update_correction(arrayData,no_permohonan,model_custodian){
  arrayData = [];
  arrayData.push({
    contract_no : '',
    branch_id : '',
    no_rangka : '',
    no_rangka_new : '',
    no_mesin : '',
    no_mesin_new : '',
    nama_bpkb : '',
    nama_bpkb_new : '',
    alamat_bpkb :'',
    alamat_bpkb_new : '',
    no_bpkb :'',
    no_bpkb_new :'',
    branch_id : '',
    warna :'',
    warna_new :'',
            model :'',
            model_new :'',
            nopol :'',
            nopol_new :'',
            no_mesin_new : '',
            thn_produksi :'',
            thn_produksi_new :'',
            thn_kendaraan:'',
            thn_kendaraan_new :'',
            cc : '',
            cc_new :'',
            no_permohonan : no_permohonan,
            model_custodian:model_custodian
          });
  $.ajax({
    url: base_url + "Controller_asset_correction/updateKoreksi",
    cache: false,
    type: 'post',
    data : {arrayData},
    dataType: 'json',
    success: function(response){
      //debugger;
      if(response){
        try{
          console.log(response);
          var data =JSON.stringify(response);
          //var tess2 = table_view_correction.rows('.selected').data()
          var v = $.parseJSON(response);
          //no_permohonan = tess2[0][2];

          //debugger;
          var no_permohonan = $('#inp-no-permohonan-ac').val();
          if(v['Status'] == '200'){
           alert_info("Nomor Permohonan "+no_permohonan+" berhasil dikonfirmasi");
           $('.inp-ac').val("");
           $('.inp-ac2').val("");
           $('.inp-ac').prop('disabled', true);
           $('.inp-ac2').prop('disabled', true);
           $('.inp-edit-ac').prop('disabled', true);
           $('.inp-edit-alasan-ac').prop('disabled', true);
           $('.inp-edit-alasan-ac').val("");
           $("#inp_model3_ac").prop('disabled', true);
           $("#inp-carabayar-ac").prop('disabled', true);
           $('#inp-no-kontrak-ac').val("");
           $('#inp-no-permohonan-ac').val("");
           $('#inp-start-date-ac').val("");
           $('#inp-end-date-ac').val("");
           $('#inp_nopol2_ac').val("");
           table_view_correction.clear().draw();

               //debugger;

             }else if(v['Status'] == '500'){
              alert_warning(v['pesan']);
            }else if(v['status'] == 500){
              alert_warning(v['message']);
            }else{
              alert_error('kesalahan');
            }
          }catch(e){
            $('#loading-ajax').hide();
            alert_error(e);
          }
        }else{
          alert_error("Cek Jaringan");
        }

      }, 
      error:function(response){
        console.log(response);
        if (response['responseText'] === "" && response['statusText'] === 'OK') {
          alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
          });
        }
      }
    });
}


//================================================================FUNGSI UNTUK PAYMENT METHOD======================================================//
/*function get_data_pay_methode(slc_id){
  //debugger;
  var data = '';
  $.ajax({
   url : base_url+"Controller_asset_correction/getPaymentTypeAc",
   type : 'GET',
   success : function(response){
      //debugger;
      var data = JSON.parse(response);
      console.log(response);
      if(JSON.stringify(response).includes('Timeout')){
        alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
      } else if(response){
        try{
          console.log(response);
          $('<option/>').val('').html('- PILIH TYPE -').appendTo(slc_id).addClass('form-control');
          $('<option/>').val('').html('-----------------').appendTo(slc_id).addClass('form-control');

          for (var i = 0; i < data['data'].length; i++) {
            $(slc_id).append('<option value="'+ data['data'][i].pay_methode_code +'">'+data['data'][i].pay_methode_desc+'</option>');

          }

        } catch(e) {
          $('#loading-ajax').hide();
          console.log(e);
          alert_info("Terjadi Kesalahan !");
        }
      }

    },error:function(response){
      console.log(response);
    }
  });
}
*/

//============================================================FUNGSI BUTTON SEARCH NOMOR PERMOHONAN=======================================================//
$('#btn-search-no-permohonan-ac').click(function() {
              //debugger;

              
              var branch_id = $('#inp-cabang-ac option:selected').val();
              tbl_no_permohonan_ac.clear().draw();
              table_view_correction.clear().draw();
              $('.inp-ac').val("");
              $('.inp-ac2').val("");
              $('.inp-edit-ac').val("");
              $('.inp-edit-alasan-ac').val("");
              $('#inp_nopol2_ac').val("")
              if(branch_id === ''){
               alert_info('Cabang Tidak Boleh Kosong');
               $('#div-list-branch-ac').addClass('has-error');
               return false;
             }else{
              $('#btn-search-ac').removeAttr('disabled'); 
              $('#div-list-branch-ac').removeClass('has-error');
              getNomorPermohonan();

            }
          });

$('#btn-reset-ac').click(function(){
  $('#inp-no-permohonan-ac').val('');
  $('#inp-no-permohonan-ac').removeAttr('disabled');
  $('#btn-search-no-permohonan-ac').prop('disabled',false);
  $('#inp-disetujui1-ac').val('');
  $('#inp-disetujui2-ac').val('');
  $('#inp-no-kontrak-ac').val('');
  $('#div-tgl-awal-ac').data("DateTimePicker").clear();
  $('#div-tgl-akhir-ac').data("DateTimePicker").clear();
  table_view_correction.clear().draw();
  $('.inp-ac').val("");
  $('#inp-disetujui-oleh-ac').val("");
  $('#inp-no-kontrak-ac').val("");
  $('#inp-no-permohonan-ac').val("");
  $('#inp_no_rangka2_ac').val("");
  $('#inp_no_mesin2_ac').val("");
  $('#inp_no_bpkb2_ac').val("");
  $('#inp_alasan_rangka_ac').val("");
  $('#inp_alasan_mesin_ac').val("");
  $('#inp_nama_bpkb2_ac').val("");
  $('#inp_alasan_namabpkb_ac').val("");
  $('#inp_alamat_bpkb2_ac').val("");
  $('#inp_alasan_alamatbpkb_ac').val("");
  $('#inp_no_bpkb2_ac').val("");
  $('#inp_alasan_nobpkb_ac').val("");
  $('#inp_no_reg2_bpkb_ac').val("");
  $('#inp_alasan_noregbpkb_ac').val("");
  $('#inp_warna2_ac').val("");
  $('#inp_alasan_warna_ac').val("");
  $('#inp_model3_ac').val("");
  $('#inp_model4_ac').val("");
  $('#inp_model2_ac').val("");
  $('#inp_alasan_model_ac').val("");
  $('#inp_nopol2_ac').val("");
  $('#inp_alasan_nopol_ac').val("");
  $('#inp_tgl_bpkb2_ac').val("");
  $('#inp_alasan_tglbpkb_ac').val("");
  $('#inp_tahun2_ac').val("");
  $('#inp_alasan_thnproduksi_ac').val("");
  $('#inp_tahun_rakit2_ac').val("");
  $('#inp_alasan_thnrakit_ac').val("");
  $('#inp_alasan_nobastk_ac').val("");
  $('#inp_cc_kendaraan2_ac').val("");
  $('#inp_alasan_cc_ac').val("");


});

function getNomorPermohonan() {
  var arrayData = [];
  var branch_id = $('#inp-cabang-ac').val();

  arrayData.push({
    branch_id : branch_id
  });

  $.ajax({
    url: base_url + 'Controller_asset_correction/getNoPermohonanAc',
    type: 'POST',
    dataType: 'json',
    data : {arrayData},
    cache: false,

    success: function(response) {
      //debugger;
      console.log(response);

      if (response) {
        try {
          var result = $.parseJSON(response);
          tbl_no_permohonan_ac.clear().draw();
          $.each(result['Data'], function(index) {

            tbl_no_permohonan_ac.row.add([
              this['correction_no']
              ]).draw(false);
          });

          $('#modal-no-permohonan-ac').modal({
            show: true,
            backdrop: 'static'
          });

        } catch (e) {
          console.log(e);
                    $('#loading-ajax').hide(); //menutup loading ajax
                    alert_error("Terjadi kesalahan error => " + e);
                  }
                };
              },
              error: function(response) {
                console.log(response);
                alert('Tidak terhubung dengan server');
              }
            });
}

$('#tbl_no_permohonan_ac tbody').on('mouseover', 'tr', function() {

  $(this).addClass('pointer');

  if ($(this).hasClass('selected')) {
    $(this).removeClass('selected');
  } else {
    tbl_no_permohonan_ac.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    arr_tbl = tbl_no_permohonan_ac.row(this).data();
  }


});

$('#tbl_no_permohonan_ac tbody').on('click', 'tr', function() {
  $('#inp-no-permohonan-ac').val(arr_tbl[0]);
  $('#modal-no-permohonan-ac').modal('hide');
});


$('#inp-no-permohonan-ac').click(function() {
        //debugger;

        
        var branch_id = $('#inp-cabang-ac option:selected').val();
        tbl_no_permohonan_ac.clear().draw();

        if(branch_id === ''){
         alert_info('Cabang Tidak Boleh Kosong');
         $('#div-list-branch-ac').addClass('has-error');
         return false;
       }else{
        $('#btn-search-ac').removeAttr('disabled'); 
        $('#div-list-branch-ac').removeClass('has-error');
        getNomorPermohonan();

      }
    });

function getNomorPermohonan() {
  var arrayData = [];
  var branch_id = $('#inp-cabang-ac').val();

  arrayData.push({
    branch_id : branch_id
  });

  $.ajax({
    url: base_url + 'Controller_asset_correction/getNoPermohonanAc',
    type: 'POST',
    dataType: 'json',
    data : {arrayData},
    cache: false,

    success: function(response) {

      console.log(response);

      if (response) {
        try {

                   /* if(response.includes('Error')){
                      alert_info('tidak ada pengajuan yang belum dikonfirmasi');
                      return false;
                    }*/
                    var result = $.parseJSON(response);
                    tbl_no_permohonan_ac.clear().draw();
                    $.each(result['Data'], function(index) {

                      tbl_no_permohonan_ac.row.add([
                        this['correction_no']
                        ]).draw(false);
                    });

                    $('#modal-no-permohonan-ac').modal({
                      show: true,
                      backdrop: 'static'
                    });

                  } catch (e) {
                    console.log(e);
                              $('#loading-ajax').hide(); //menutup loading ajax
                              alert_error("Terjadi kesalahan error => " + e);
                            }
                          };
                        },
                        error: function(response) {
                          console.log(response);
                          alert('Tidak terhubung dengan server');
                        }
                      });
}

$('#tbl_no_permohonan_ac tbody').on('mouseover', 'tr', function() {

  $(this).addClass('pointer');

  if ($(this).hasClass('selected')) {
    $(this).removeClass('selected');
  } else {
    tbl_no_permohonan_ac.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    arr_tbl = tbl_no_permohonan_ac.row(this).data();
  }


});

$('#tbl_no_permohonan_ac tbody').on('click', 'tr', function() {
  $('#inp-no-permohonan-ac').val(arr_tbl[0]);
  $('#modal-no-permohonan-ac').modal('hide');
});


$('#inp_model3_ac').click(function() {
  //debugger;
  var arrayData  = [];
  var tess2 = table_view_correction.rows('.selected').data()
  var obj_model = tess2[0][8];
  var obj_type= $('#inp_type_ac').val();
  var obj_brand = $('#inp_brand_ac').val();
  getModel(obj_type,obj_brand);

});
//========================================================================== GET CUSTODIAN ===============================


      function capslock(id ){  //fungsi membuat capslock
        var str = $('#'+id).val();
        $('#'+id).val(str.toUpperCase());
      }


      function getModel(obj_type,obj_brand) {
        $.ajax({
          url: base_url + 'Controller_asset_correction/getModel',
          type: 'POST',
          dataType: 'json',
          data : {
            'obj_type' :obj_type,
            'obj_brand' : obj_brand
          },
          cache: false,

          success: function(response) {
            console.log(response);

            if (response) {
              try {
                var result = $.parseJSON(response);
                tbl_model_ac.clear();
                var model_code = [];
                var model_desc = [];

                if (result['data'].length !== 0 && result['status'] === true) {
                  $('#modal-model-ac').modal('show');
                  $.each(result['data'], function(i) {
                    model_code[i] = result['data'][i]['obj_model_code'];
                    model_desc[i] = result['data'][i]['obj_model_desc'];
                    tbl_model_ac.row.add([
                      model_code[i],
                      model_desc[i]
                      ]).draw(false);
                  });
                }
              } catch (e) {
                console.log(e);
                    $('#loading-ajax').hide(); //menutup loading ajax
                    alert_error("Terjadi kesalahan error => " + e);
                  }
                };
              },
              error: function(response) {
                console.log(response);
                alert('Tidak terhubung dengan server');
              }
            });

      }

      $('#tbl_model_ac tbody').on('mouseover', 'tr', function() {

        $(this).addClass('pointer');

        if ($(this).hasClass('selected')) {
          $(this).removeClass('selected');
        } else {
          tbl_model_ac.$('tr.selected').removeClass('selected');
          $(this).addClass('selected');
          arr_tbl = tbl_model_ac.row(this).data();
        }


      });

      $('#tbl_model_ac tbody').on('click', 'tr', function() {
        $('#inp_model2_ac').val(arr_tbl[0]);
        $('#inp_model3_ac').val(arr_tbl[1]);
        $('#modal-model-ac').modal('hide');
      });


/*       $('#inp_cc_kendaraan2_ac').bind("cut copy paste",function(e) {
     e.preventDefault();
 });
*/