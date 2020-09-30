

var tabel_list_fiducia = $('#tabel-list-fiducia').DataTable({
  "columnDefs": [
  {
   "targets": [ 6,7],
   "visible": false,
   "responsive": true,     
 }

 ]
});


if (localStorage.getItem("menu_alias_am") === "ENFD") {

  notaris_code_fdc = $('#notaris-id-fdc').val();
  notaris_name_fdc = $('#notaris-name-fdc').val();
  branch_code_fdc = $('#cabang-id-fdc').val();
  branch_name_fdc = $('#cabang-name-fdc').val();
  no_bast = $("#no-bast-enf-fdc").val();

  var tabel_fiducia = $('#tabel-fiducia').DataTable({

    "responsive": true
  });


  $('#checkAll').on('click',function()
  {

    var pages = tabel_list_fiducia.page();
    var limits = tabel_list_fiducia.page.len();
    var table_leng = tabel_list_fiducia.rows().data().length ;
    tabel_list_fiducia.page.len(table_leng);
    tabel_list_fiducia.draw();
    var checkboxes = $(':checkbox');


    if ($('#checkAll').is(':checked')){

      $(':checkbox').prop('checked', true);

    }else{
      $(':checkbox').prop('checked', false);

    }


    tabel_list_fiducia.page.len(limits);
    tabel_list_fiducia.draw();
    tabel_list_fiducia.page( pages ).draw( 'page' );
    tabel_list_fiducia.page( pages ).draw( 'page' );

  });




  if(branch_code_fdc !== '0000') {

    $('<option/>').val(branch_code_fdc).html(branch_code_fdc + ' - ' + branch_name_fdc).appendTo('#slc-cb-enf-fdc');
  } else {
    get_data_branch('#slc-cb-enf-fdc');
  }    

  get_data_notariss('#slc-ntr-enf-fdc');
  $('#btn-search-enf-pfdc').click(function() {
   $('.check-enf').prop('checked',false);
   cariData();
 });


  $('#btn-search-bast-enf-pfdc').click(function() {
    cariBast();
    console.log('cari BAST');
  });


  $('#btn-create-bast-enf-fdc').click(function() {
   if (check_session() === 'true') {
     var slc_ntr = $('#slc-ntr-enf-fdc option:selected').val();
     var length = $('#tabel-list-fiducia').find('.check-enf').filter(':checked').length;
     var akses = false;
     var cabang = $('#cabang-login').html();

     if (cabang !== 'KANTOR PUSAT') {
      alert_warning('USER CABANG TIDAK BOLEH MELAKUKAN CREATE BAST!!!');
      return false;
    } else if ($('#no-bast-enf-fdc').val() !== '') {
     alert_warning('sudah pernah cetak bast!!');
   } else if(slc_ntr == ''){
     alert_warning("Pilih notaris!!");
     $('#div-slc-ntr-enf-fdc').addClass('has-error');
   }else if (tabel_list_fiducia.rows().flatten().length == 0) {
    alert_warning("data kosong!!");
  }else if (length === 0 ){
    alert_warning('ceklist salah satu data');
  }else{
    $('#div-slc-ntr-enf-fdc').removeClass('has-error');
    $('#div-slc-ntr-enf-fdc').removeClass('has-error');

    alert_confirm('APAKAH YAKIN BUAT BAST ?',function(){
      buatBast();
    });
    console.log('buat BAST');
  }
}else if (check_session() === 'false') {
  alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
    localStorage.clear();
    window.location.href = base_url + "Controller_login/login_view";
  });
}
});


  $('#btn-cancel-bast-enf-fdc').click(function() {
   if (check_session() === 'true') {
    var vNoBast = $('#no-bast-enf-fdc').val();
    var cabang = $('#cabang-login').html();
    if (cabang !== 'KANTOR PUSAT') {
      alert_warning('USER CABANG TIDAK BOLEH MELAKUKAN CANCEL BAST!!!');
      return false;
    }else{
      alert_confirm('BAST dengan Nomor '+ vNoBast +' Akan Dibatalkan?',function(){

        cancelBast(vNoBast);

      });
    }
  }else if (check_session() === 'false') {
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }
});

  $('#btn-print-enf-fdc').click(function() {
    if (check_session() === 'true') {
      console.log('cetak');
      var cabang = $('#cabang-login').html();
      if (cabang !== 'KANTOR PUSAT') {
        alert_warning('USER CABANG TIDAK BOLEH MELAKUKAN CETAK BAST!!!');
      }else if (cabang === 'KANTOR PUSAT'){
        alert_confirm('APAKAH YAKIN CETAK BAST ?',function(){
          no_bast = $("#no-bast-enf-fdc").val();
          if (no_bast != '') {
           cetakLampiran();
           $( "#idForm" ).submit();
         }else{
          alert_warning('cetak hanya untuk kontrak yang mempunyai nomor Bast!');
        }

      });
      }
    } else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
      });
    }
  });


  function cariBast(){

   branch_code_fdc = $('#slc-cb-enf-fdc option:selected').val();
   if (branch_code_fdc === '') {
    alert_warning("Silahkan Pilih Cabang!");
    $('#div-slc-cb-enf-fdc').addClass('has-error');
    return false;
  }else{
    $('#div-slc-cb-enf-fdc').removeClass('has-error');
    var branch_code = $('#slc-cb-enf-fdc').val();
    $.ajax({
      url:base_url+'Controller_entry_notaris_fiducia/get_fiducia_dist',
      type:'POST',
      data:{branch_code},
      success:function(response){
       console.log(response);
       var data = JSON.parse(response);
       tabel_fiducia.clear().draw();
       var angka = 1;
       var array = [];
       var data = JSON.parse(response);
       var data1 = $.parseJSON(data);  

       try {
         if (data1['Data'].length < 1) {
          alert_info('Data tidak ditemukan');
          return false;
        }

        if(response) {
          $('#id-tabel-fiducia-txt').text('Tanggal Bast');
          tabel_fiducia.clear().draw();
          $.each(data1['Data'], function(index) {
            array.push([
              this['bast_no'],
              this['notaris_id']+' - '+this['notaris_name'],
              this['bast_date']
              ]);
          });
          tabel_fiducia.rows.add(array).draw(); 
          $('#checkAll').prop('checked',true);
          $('#btn-create-bast-enf-fdc').prop('disabled',true);
          $('#btn-cancel-bast-enf-fdc').prop('disabled',false);
          $('#btn-print-enf-fdc').prop('disabled',false);
          $('#modal-search-enf').modal('toggle');
          $('#modal-search-enf').modal('show');

        }  
      } catch(e) {
        $('#loading-ajax').hide();
        console.log(e);
        alert_error("Galat" + e);
      }

    }

  });

  }

}

function cariData(){

  branch_code_fdc = $('#slc-cb-enf-fdc option:selected').val();
  tgl_1 = $('#tgl-awal-enf-fdc').val();
  tgl_2 = $('#tgl-akhir-enf-fdc').val();

  if (tgl_1 === '' || tgl_2 === '') {
    alert_info("Silahkan Pilih Periode Pengajuan Fiducia");
    $('#div-tgl-awal-enf-fdc').addClass('has-error');
    $('#div-tgl-akhir-enf-fdc').addClass('has-error');
  }
  else if (branch_code_fdc === '') {
    alert_info("Silahkan Pilih Cabang!");
    $('#div-slc-cb-enf-fdc').addClass('has-error');
  }
  else{
    $('#div-slc-cb-enf-fdc').removeClass('has-error');
    $('#div-tgl-awal-enf-fdc').removeClass('has-error');
    $('#div-tgl-akhir-enf-fdc').removeClass('has-error');
    $("#no-bast-enf-fdc").val(''); 

    var arrayData= [];

    arrayData.push({
      branch_code:$('#slc-cb-enf-fdc').val(),
      notaris_id:$('#slc-ntr-enf-fdc').val(),
      tgl_1:$('#tgl-awal-enf-fdc').val(),
      tgl_2:$('#tgl-akhir-enf-fdc').val()
    });

    $.ajax({
      url:base_url+"Controller_entry_notaris_fiducia/get_list_pk",
      type:'POST',
      data:{arrayData},
      success:function(response){
        console.log(response);
        var data = $.parseJSON(response);
        var data1 = $.parseJSON(data);
        var array = [];
        if(response) {
          try {
            tabel_list_fiducia.clear().draw();
            if (data1['ListFiducia'].length <1) {
              alert_info('data tidak ditemukan');
            }else{
             // alert_info(data1['ListFiducia'].length+' Data ditemukan');
           }
           $('#id-tabel-fiducia-txt').text('Tanggal PPD');
           $.each(data1['ListFiducia'], function(index) {
            array.push([
              '<input class="check-enf" id="check-tbl-dtl-enf'+index+'" type="checkbox">',
              index + 1,
              this['branch_code'] +' - '+ data1['branch_name'][0].branch_desc,
              this['bast_date'],
              this['contract_no'],
              this['customer_id'],
              this['object_code'],
              this['contract_id']
              ]);
          });
           tabel_list_fiducia.rows.add(array).draw(); 
           $('.check-enf').prop('disabled',false);
            $('#btn-create-bast-enf-fdc').prop('disabled',false);
           $('#btn-cancel-bast-enf-fdc').prop('disabled',false);
           $('#btn-print-enf-fdc').prop('disabled',false);
         }
         catch(e) {
          $('#loading-ajax').hide(); 
          console.log(e);
          alert_error("Galat" + e);
        }
      }

    },error:function(response){

      console.log(response);
    }
  });

  }


}

function buatBast (){

  var branch_code = $('#slc-cb-enf-fdc').val();
  var notaris_code = $('#slc-ntr-enf-fdc').val();
  var arrayData = []; 
  var list_data = tabel_list_fiducia.data();
  var slc_ntr = $('#slc-ntr-enf-fdc option:selected').val();
  check_lenght = $('#tbl-detail-pfdc').find('.check-pfdc').filter(':checked').length;

  var pages = tabel_list_fiducia.page();
  var limits = tabel_list_fiducia.page.len();
  var table_leng = tabel_list_fiducia.rows().data().length ;
  var search  = tabel_list_fiducia.search();

  tabel_list_fiducia.search("");
  tabel_list_fiducia.page.len(table_leng);
  tabel_list_fiducia.draw();


  for (var i = 0; i < list_data.length; i++) {
    if ($('#check-tbl-dtl-enf'+i).is(":checked")) {
      arrayData.push({
       contract_no : list_data[i][4],
       object_code : list_data[i][6],
       contract_id : list_data[i][7],
       no_bast,branch_code,
       notaris_code
     });
    }
  }
  tabel_list_fiducia.search(search);
  tabel_list_fiducia.page.len(limits);
  tabel_list_fiducia.draw();
  tabel_list_fiducia.page( pages ).draw( 'page' );



  $.ajax({
    url:base_url+"Controller_entry_notaris_fiducia/post_data_bast",
    type:'POST',
    data:{arrayData},
    success:function(response){
      try {
        var data = $.parseJSON(response);
        var data1 = $.parseJSON(data);
        if(JSON.stringify(response).includes('PERNAH CETAK')){
          alert_warning(data1['alert']);
        }else if (JSON.stringify(response).includes('BERHASIL')) {
          alert_info(' BAST BERHASIL dibuat dengan Nomor BAST: ' + data1['nobast'] );
          $('#no-bast-enf-fdc').val(data1['nobast'] );
           $('#no-bast-enf-fdc2').val(data1['nobast'] );
          $('.check-enf').prop('disabled',true);
          $('#btn-create-bast-enf-fdc').prop('disabled',true);
          $('#btn-cancel-bast-enf-fdc').prop('disabled',false);
          $('#btn-pilih-enf-bast').click();


        }else if(JSON.stringify(response).includes('error')){
          alert_error(' Terjadi Kesalahan ' +response);
        }
      } catch(e) {
        $('#loading-ajax').hide(); 
        console.log(e);
        alert_error("Galat" + e);
      }

    },error:function(response){

      console.log(response);
    }
  });



}



function cancelBast(vNoBast){
  no_bast = $("#no-bast-enf-fdc").val();

  if (no_bast === '') {
    alert_warning('no bast kosong');
  }
  else{

   $.ajax({
    url:base_url+"Controller_entry_notaris_fiducia/cancel_data_bast",
    type:'POST',
    data:{no_bast},
    success:function(response){
      try {
        var data = $.parseJSON(response);
        var data1 = $.parseJSON(data);
      // alert_info(data1['alert']);

      if (response.includes('tidak')) {
        alert_warning(data1['alert']);
      }else{
        alert_refresh('BAST dengan Nomor '+ vNoBast +' Berhasil Dibatalkan ');
      }
      
      console.log(response);
    }catch(e) {
      $('#loading-ajax').hide(); 
      console.log(e);
      alert_error("Galat" + e);
    }
  },error:function(response){

    console.log(response);
  }
});

 }

}

function cetakLampiran(){

 $.ajax({
  url:base_url+"Controller_entry_notaris_fiducia/cetak_lampiran",
  type:'POST',
  data:{no_bast},
  success:function(response){

   console.log(response);
   var data = $.parseJSON(response);
   var data1 = $.parseJSON(data);
   if(response) {
    try {
      var data2 ="";
      var header = 'NO;No Perjanjian Pembiayaan Konsumen;Nama Konsumen;Pekerjaan;Kota_lahir;Tgl_Lahir;Alamat;Nama Kelurahan/Desa;RT/RW;Kecamatan;Nama Kota/Kabupaten;Propinsi;Nomor KTP/SIM;Tgl surat kuasa pembebanan fidusia;Tgl Perjanjian Pembiayaan Konsumen;Tgl Akhir Angsuran;Hutang Pokok;Nilai Penjaminan;OTR;No Polisi utk kendaraan Bekas;Merk;Type;Thn_Buat;No_Rangka;No_Mesin;Warna;Tanggal Surat Pernyataan;BPKB_Nomor utk Kendaraan Bekas;Dealer;Kondisi Kendaraan (baru/bekas);';
      for (var i = 0; i < data1['data'].length; i++) {

        data2 = data2 + data1['data'][i].rownum + ';'  + data1['data'][i].contractNo + ';' + data1['data'][i].custLastName  + ';' + data1['data'][i].occupationDesc  + ';' + 
        data1['data'][i].customerBirthPlace  + ';' + data1['data'][i].birthDate  + ';' + data1['data'][i].addressName  + ';' + 
        data1['data'][i].kelurahanDesc  + ';' + data1['data'][i].rtRw  + ';' + data1['data'][i].kecamatanDesc  + ';' +
        data1['data'][i].kabKotDesc  + ';' + data1['data'][i].provinsiDesc  + ';' + data1['data'][i].idNo  + ';' + 
        data1['data'][i].tanggalSuratKuasa  + ';' + data1['data'][i].tglPerjanjianPembiayaan  + ';' + 
        data1['data'][i].tanggalAkhirAngsuran  + ';' + data1['data'][i].nilaiPenjaminan  + ';' +
        data1['data'][i].objectPrice  + ';' + data1['data'][i].policeNo  + ';' + data1['data'][i].objectModelDesc  + ';' +
        data1['data'][i].objectTypeDesc  + ';' + data1['data'][i].productionYear  + ';' + data1['data'][i].chassisNo  + ';' + 
        data1['data'][i].engineNo+';'+data1['data'][i].objectColor  + ';' + data1['data'][i].tanggalSuratPernyataan  + ';' +
        data1['data'][i].registerName+';'+data1['data'][i].supplierDesc+';' + data1['data'][i].objectCodeDesc +"\n";

      }

      var dataTxt = header + '\n'+ data2;
      var nameFile = 'CETAK_BAST_FIDUCIA '+ $("#no-bast-enf-fdc").val();
      var file = [];
      var filename =[];
      var temp_isi;
      file.push(dataTxt);
      filename.push(nameFile);

      var uri = 'data:application/txt;charset=UTF-8,' + encodeURIComponent(file[0]);
      var downloadLink = document.createElement("a");
      downloadLink.href = uri;
      downloadLink.download = data1['name_file'];
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

    } catch(e) {
      $('#loading-ajax').hide(); 
      console.log(e);
      alert_error("Galat" + e);
    }


  }

},error:function(response){

  console.log(response);
}
});
}


$('#btn-clear-enf-fdc').click(function() {
 $('#slc-cb-enf-fdc').val('');
 $('#tgl-awal-enf-fdc').data("DateTimePicker").clear();
 $('#tgl-akhir-enf-fdc').data("DateTimePicker").clear();
 $('#slc-ntr-enf-fdc').val('');
 $("#no-bast-enf-fdc").val('');
 $('#btn-print-enf-fdc').prop('disabled',true);
 $('#btn-cancel-bast-enf-fdc').prop('disabled',true);
 $('#btn-create-bast-enf-fdc').prop('disabled',true);
 $('#div-slc-cb-enf-fdc').removeClass('has-error');
 $('#div-tgl-awal-enf-fdc').removeClass('has-error');
 $('#div-tgl-akhir-enf-fdc').removeClass('has-error');
 $('#div-slc-ntr-enf-fdc').removeClass('has-error');
 tabel_list_fiducia.clear();
 tabel_fiducia.clear();
 tabel_list_fiducia.clear().draw();

});

///-------------TABEL KETIKA ROW DI DOBEL KLIK DATA SET KE INPUT
$('#tabel-fiducia tbody').on('click', 'tr', function() {
  if ($(this).hasClass('selected')) {
    $(this).removeClass('selected');
  } else {
    tabel_fiducia.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    arr_tbl = tabel_fiducia.row(this).data();
  }
   $('#no-bast-enf-fdc').val(arr_tbl[0]);
  $('#no-bast-enf-fdc2').val(arr_tbl[0]);
});

$('#btn-pilih-enf-bast').on('click',function(){
 
  var no_bast =  $('#no-bast-enf-fdc').val();

  $.ajax({
    url:base_url+"Controller_entry_notaris_fiducia/get_fiducia",
    type:'POST',
    data:{no_bast},
    success:function(response){
      var angka = 1;
      var data = $.parseJSON(response);
      var data1 = $.parseJSON(data);
      var array = [];
      if(response) {
        try {
          tabel_list_fiducia.clear().draw();

          for (var i = 0; i < data1['Data'].length; i++) {
            array.push([
              '<input class="check-enf" id="check-tbl-dtl-enf'+i+'" checked type="checkbox" checked="" disabled="" >',
              angka++,
              data1['Data'][i].branch_code+' - '+data1['branch_name'][0].branch_desc,
              data1['Data'][i].bast_date,
              data1['Data'][i].contract_no,
              data1['Data'][i].customer_id,
              '',
              ''                     
              ]);
          }
          $('.check-enf').prop('disabled',true);
           $('.check-enf').prop('checked',true);
          tabel_list_fiducia.rows.add(array).draw();
        }
        catch(e) {
          $('#loading-ajax').hide(); 
          console.log(e);
          alert_error("Galat" + e);
        }
      }

    }
  });

  $('#modal-search-enf').modal('hide');

});

$('#tabel-fiducia tbody').on('dblclick', 'tr', function() {

  $('#btn-pilih-enf-bast').click();


});

///-------------TABEL KETIKA ROW DI DOBEL KLIK DATA SET KE INPUT

$('#tgl-awal-enf-fdc').datetimepicker({
  format: 'DD-MMM-YYYY',
  allowInputToggle: true,
  maxDate: new Date()
}).on("dp.change", function(e){
  var date = e.date;
  var dDate = date._d;
  var new_date = new Date(dDate);
  new_date.setDate(new_date.getDate() + 30);

  $('#tgl-akhir-enf-fdc').data("DateTimePicker");

  if (new_date > new Date(today)) {
    new_date = new Date(today);
  }

  $('#tgl-akhir-enf-fdc').data("DateTimePicker").maxDate(new_date);
  $('#tgl-akhir-enf-fdc').data("DateTimePicker").date(new_date);
});

$('#tgl-akhir-enf-fdc').datetimepicker({
  format: 'DD-MMM-YYYY',
  allowInputToggle: true,
  maxDate: new Date()
});

// $('#checkAll').click(
//  function(){



//    if ($('#checkAll').is(':checked')){

//      $(':checkbox').prop('checked', true);
//    }else{
//      $(':checkbox').prop('checked', false);

//    }


//  });

// function getFirstRole(){
//  $.ajax({
//   url : base_url + "Controller_entry_notaris_fiducia/get_detail_user",
//   cache : false,
//   async :false,
//   success : function(response){
//     try{
//       console.log(response);
//       var role_data = $.parseJSON(response);

//       $.each(role_data, function(i){
//         if (role_data[i].role_code  === 'ENF') {
//           $('#btn-create-bast-enf-fdc').prop('disabled',false);
//           return false;
//         }
//       });
//     }catch(e) {
//                     $('#loading-ajax').hide(); //menutup loading ajax
//                     console.log(e);
//                     alert_error("Galat" + e);
//                   }
//                 },
//                 error: function(response){
//                   console.log(response);
//                 }
//               });

// }


// function getRole(){
//   $.ajax({
//     url : base_url + "Controller_entry_notaris_fiducia/get_detail_user",
//     cache : false,
//     async :false,
//     success : function(response){
//       try{
//         console.log(response);
//         var role_data = $.parseJSON(response);
//         var flagrole = true;
//         $.each(role_data, function(i){
//           if (role_data[i].role_code  === 'ENF') {
//             localStorage.setItem('role', true);
//             flagrole = false;
//           }else if(flagrole){
//            localStorage.setItem('role', false);
//          }
//        });
//       }catch(e) {
//                     $('#loading-ajax').hide(); //menutup loading ajax
//                     console.log(e);
//                     alert_error("Galat" + e);
//                   }
//                 },
//                 error: function(response){
//                   console.log(response);
//                 }
//               });

// }

}

