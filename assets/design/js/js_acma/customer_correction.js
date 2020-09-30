console.log($('#branch-id-cc').html());
var branch_id_cc = $('#branch-id-cc').html();
var branch_name_cc = $('#branch-name-cc').html();

var tabel_srt_permohonan = $('#tabel-srt-permohonan-cc').DataTable({
 "columnDefs": [{
  "targets": [2, 3],
  "visible": false,
  "responsive": true,
  "searchable": false
 }, ]
});

var tabel_doc = $('#table-cust-dokumen').DataTable({});
var tabel_doc2 = $('#table-cust-dokumen2').DataTable({});
var table_kodepos_per = $('#tabel-result-kode-pos').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kelurahan_per = $('#tabel-result-kelurahan').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kodepos_sps = $('#tabel-result-kode-pos-spouse').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kelurahan_sps = $('#tabel-result-kelurahan-spouse').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kodepos_curr = $('#tabel-result-kode-pos-current').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kelurahan_curr = $('#tabel-result-kelurahan-current').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kodepos_occp = $('#tabel-result-kode-pos-occupation').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kelurahan_occp = $('#tabel-result-kelurahan-occupation').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kodepos_oth = $('#tabel-result-kode-pos-other').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kelurahan_oth = $('#tabel-result-kelurahan-other').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kodepos_guar = $('#tabel-result-kode-pos-guarantor').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kelurahan_guar = $('#tabel-result-kelurahan-guarantor').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kodepos_guarr = $('#tabel-result-kode-pos-guarantorr').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kelurahan_guarr = $('#tabel-result-kelurahan-guarantorr').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kodepos_com = $('#tabel-result-kode-pos-company').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kelurahan_com = $('#tabel-result-kelurahan-company').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kodepos_hold_per = $('#tabel-result-kode-pos-holder-per').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kelurahan_hold_per = $('#tabel-result-kelurahan-holder-per').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kodepos_hold_ent = $('#tabel-result-kode-pos-holder-ent').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kelurahan_hold_ent = $('#tabel-result-kelurahan-holder-ent').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kodepos_pic = $('#tabel-result-kode-pos-pic').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_kelurahan_pic = $('#tabel-result-kelurahan-pic').DataTable({
 "columnDefs": [{
  'bSortable': true,
  "targets": [5, 6, 7, 8],
  "visible": false,
  "responsive": true,
 }],
});
var table_sector_com = $('#table-sektor-ekonomi-job-com').DataTable({});
var table_lapangan_com = $('#table-lapangan-usaha-com').DataTable({});
var table_sector_occp = $('#table-sektor-ekonomi-occupation').DataTable({});
var table_lapangan_occp = $('#table-lapangan-usaha-occupation').DataTable({});


$('#tabel-srt-permohonan-cc tbody').on('mouseover', 'tr', function() {
 $(this).addClass('pointer');
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  tabel_srt_permohonan.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  arr_tbl = tabel_srt_permohonan.row(this).data();
  // $('#inp-no-permohonan-cc').val(arr_tbl[1]);
 }
});

$('#tabel-srt-permohonan-cc tbody').on('click', 'tr', function() {
 // $('#btn-pilih-data-srt_permohonan-cc').click();
 var get_data = tabel_srt_permohonan.rows(this).data();
 $('#inp-no-permohonan-cc').val(get_data[0][1]);
 $('#input-no-contract').val(get_data[0][2]);
 $('#inp-cust-type-cc').val(get_data[0][3]);
//debugger;
 $('#modal-search-srt-permohonan').modal('hide');
 if ($('#inp-cust-type-cc').val() === "COM") {
  get_view_detail_company();
  $('#cetak-permohonan-cc').prop('disabled', true);
  $('#PER').hide();
  $('#COM').show();
 } else if ($('#inp-cust-type-cc').val() === "PER") {
  get_view_detail_customer();
  $('#cetak-permohonan-cc').prop('disabled', true);
//   if ($('#slc-status-pernikahan-per').val() != '01') {
//     $('.cls-identitas-spouse').hide();
//     $('#inp-jml-tanggung-kk2').prop('disabled', true);
//     $('#inp-education-spouse-kk2').prop('disabled', true);
//     $('#slc-alasan-education-spouse-kk').prop('disabled', true);
// } else {
//     $('.cls-identitas-spouse').show();
// }
  $('#PER').show();
  $('#COM').hide();
 }

});


//===========================================================//
$(function($) {
 $('#inp-no-npwp-perusahaan').mask('99.999.999.9-999.999');
 $('#inp-npwp-other2').mask('99.999.999.9-999.999');
 $('#inp-no-npwp-perusahaan').mask('99.999.999.9-999.999');
 $('#inp-npwp-holder-pri').mask('99.999.999.9-999.999');
 $('#inp-npwp-holder-pri2').mask('99.999.999.9-999.999');
 $('#inp-npwp-holder-ent').mask('99.999.999.9-999.999');
 $('#inp-npwp-holder-ent2').mask('99.999.999.9-999.999');
});


////=====================clear button

$('#bersihkan-kolom-cc').click(function() {
 //location.reload();
 $('#btn-search-request-cc').prop('disabled', true);
 $('#input-no-contract').prop('disabled', true);
 $('#simpan-koreksi-cc').prop('disabled', true);
 $('#cetak-permohonan-cc').prop('disabled', true);
 $('#konfirmasi-permohonan-cc').prop('disabled', true);
 $('#batalkan-koreksi-cc').prop('disabled', true);
 $('#inp-no-permohonan-cc').prop('disabled', false);
 $('#search-no-permohonan-cc').prop('disabled', false);
 $('#btn-new-request-cc').prop('disabled', false);
 $('#inp-cust-type-cc').prop('disabled', false);
 $('.form-control').not('#slc-branch-cc').val("");
 $('html, body').animate({scrollTop:0}, 'slow');
 tabel_doc2.clear().draw();
 tabel_doc.clear().draw();
 $('.disabel').prop('disabled', false);
});


//===============================================
$('#inp-no-permohonan-cc').on('click', function() {
 //alert('coba');
 if (check_session() === 'false') {
  alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
   localStorage.clear();
   window.location.href = base_url + "Controller_login/login_view";
  });
 } else {
  var v_branch = $('#slc-branch-cc').val();
  getSrtPermohonan(v_branch);
 }
});

//===============================================
$('#search-no-permohonan-cc').on('click', function() {
 //alert('coba');
 if (check_session() === 'false') {
  alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
   localStorage.clear();
   window.location.href = base_url + "Controller_login/login_view";
  });
 } else {
  var v_branch = $('#slc-branch-cc').val();
  getSrtPermohonan(v_branch);
 }
});

//=======================================================NEW SURAT PERMOHONAN========================================

$('#btn-new-request-cc').click(function() {
 $('#bersihkan-kolom-cc').click();
 var branch_code = $('#branch-id-cc').html();
 if (branch_code === "") {
  alert_info('Isi Cabang Terlebih Dahulu');
  $('#div-list-branch-ac').addClass('has-error');
 } else {
  $('#input-no-contract').prop('disabled', false);
  $('#inp-no-permohonan-cc').val('XXXXXXXXXXXXXX').prop('disabled', true);
  $('#search-no-permohonan-cc').prop('disabled', true);
  $('#btn-search-request-cc').prop('disabled', false);
 }
});

//=======================================================BTN SEARCH DATA==========================================================

$('#btn-search-request-cc').click(function() {
 var contract_no = $('#input-no-contract').val();
 if (contract_no == "") {
  alert_error("Nomor Kontrak Belum Diisi");
 } else {
  $('.disabel').val("");
  $('.disabel').prop('disabled', false);
  get_data_cc();
 }
});

// function get_type_cont() {
//  var contract_no = $('#input-no-contract').val();
//  var tipe_debitur = $('#inp-cust-type-cc :selected').val();
//  var arrayData = [];
//  var branch_code = $('#branch-id-cc').html();
//  var no_permohonan = $('#inp-no-permohonan-cc').val();
//  var flag = 1;

//  if (contract_no === "") {
//   alert_warning('Isi No Kontrak Terlebih dahulu');
//   return false;
//  } else if ($('#inp-cust-type-cc :selected').val() === "") {
//   alert_warning('Isi Tipe Debitur Terlebih dahulu');
//   return false;
//  }

//  if (no_permohonan !== 'XXXXXXXXXXXXXX') {
//   flag = 1;
//  }
//  arrayData.push({
//   contract_no,
//   tipe_debitur,
//   branch_code,
//   no_permohonan,
//   flag
//  });
//  get_data_cc(arrayData);
// }

//========================================================================================================
var flag_role_cuscor = true;
$('#simpan-koreksi-cc').click(function() {

 if (check_session() === 'false') {
  alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
   localStorage.clear();
   window.location.href = base_url + "Controller_login/login_view";
  });
 } else {

  flag_role_cuscor = true;
  for (var i = 0; i < role_cuscor.length; i++) {
   if (role_cuscor[i]['role_code'] === 'SBMT_CUS_CORR') {
    flag_role_cuscor = false;
    break;
   }
  }

  if (flag_role_cuscor) {
   alert_error("Tombol Save Hanya Bisa Diakses Oleh BP/BP+");
  } else {
   var awal = 0;
   var a = "";
   $('.disabel').each(function(index) {
    a = this.id;
    if ($('#' + a + '').val() == "") {
     awal++
    }
   });

   if (awal == 369) {
    alert_error("Tidak Ada Perubahan Pada Data");
   } else {

    //======================== Validasi Tab Company Detail ====================================//
    if ($('#inp-subkode-pos-alamat-perusahaan2').val() != "" && $('#slc-alasan-subkode-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada Sub Zip Code Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-subkode-pos-alamat-perusahaan2').val() == "" && $('#slc-alasan-subkode-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada Sub Zip Code Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-telp-alamat-perusahaan2').val() != "" && $('#slc-alasan-no-telp-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada No. Telp Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-telp-alamat-perusahaan2').val() == "" && $('#slc-alasan-no-telp-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada No. Telp Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-fax-alamat-perusahaan2').val() != "" && $('#slc-alasan-no-fax-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada No. Fax Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-fax-alamat-perusahaan2').val() == "" && $('#slc-alasan-no-fax-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada No. Telp Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-email-perusahaan2').val() != "" && $('#slc-alasan-email-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada Email Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-email-perusahaan2').val() == "" && $('#slc-alasan-email-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada Email Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-no-akte-perusahaan2').val() != "" && $('#slc-alasan-no-akte-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada No Akte Pendirian Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-no-akte-perusahaan2').val() == "" && $('#slc-alasan-no-akte-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada No Akte Pendirian Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-tgl-pendirian-perusahaan2').val() != "" && $('#slc-alasan-tgl-pendirian-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada Tanggal Pendirian Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-tgl-pendirian-perusahaan2').val() == "" && $('#slc-alasan-tgl-pendirian-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada Tanggal Pendirian Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-no-resi-perusahaan2').val() != "" && $('#slc-alasan-no-resi-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada No Resi Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-no-resi-perusahaan2').val() == "" && $('#slc-alasan-no-resi-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada No Resi Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-tgl-resi-perusahaan2').val() != "" && $('#slc-alasan-tgl-resi-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada Resi Date Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-tgl-resi-perusahaan2').val() == "" && $('#slc-alasan-tgl-resi-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada Resi Date Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-no-siup-perusahaan2').val() != "" && $('#slc-alasan-no-siup-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada No SIUP Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-no-siup-perusahaan2').val() == "" && $('#slc-alasan-no-siup-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada No SIUP Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-tgl-siup-perusahaan2').val() != "" && $('#slc-alasan-tgl-siup-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada Tanggal SIUP Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-tgl-siup-perusahaan2').val() == "" && $('#slc-alasan-tgl-siup-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada Tanggal SIUP Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-no-tdp-perusahaan2').val() != "" && $('#slc-alasan-no-tdp-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada Nomor TDP Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-no-tdp-perusahaan2').val() == "" && $('#slc-alasan-no-tdp-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada Nomor TDP Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-tgl-tdp-perusahaan2').val() != "" && $('#slc-alasan-tgl-tdp-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada Tanggal TDP Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-tgl-tdp-perusahaan2').val() == "" && $('#slc-alasan-tgl-tdp-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada Tanggal TDP Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-tgl-akta-perusahaan2').val() != "" && $('#slc-alasan-tgl-akta-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada Last Akte Date Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-tgl-akta-perusahaan2').val() == "" && $('#slc-alasan-tgl-akta-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada Last Akte Date Tidak Boleh Kosong");
     return false;
    }


    if ($('#inp-sektor-ekonomi-perusahaan2').val() != "" && $('#slc-alasan-sektor-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada Sektor Ekonomi Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-sektor-ekonomi-perusahaan2').val() == "" && $('#slc-alasan-sektor-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada Sektor Ekonomi Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-lapangan-usaha-perusahaan2').val() != "" && $('#slc-alasan-lapangan-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada Lapangan Usaha Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-lapangan-usaha-perusahaan2').val() == "" && $('#slc-alasan-lapangan-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada Lapangan Usaha Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-total-pegawai2').val() != "" && $('#slc-alasan-ttl-pgw-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada Total Pegawai Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-total-pegawai2').val() == "" && $('#slc-alasan-ttl-pgw-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada Total Pegawai Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-public-perusahaan2').val() != "" && $('#slc-alasan-public-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada Go Public Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-public-perusahaan2').val() == "" && $('#slc-alasan-public-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada Go Public Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-status-lokasi2').val() != "" && $('#slc-alasan-stat-lok-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada Status Lokasi Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-status-lokasi2').val() == "" && $('#slc-alasan-stat-lok-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada Status Lokasi Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-modal-dasar-perusahaan2').val() != "" && $('#slc-alasan-modal-dasar-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada Modal Dasar Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-modal-dasar-perusahaan2').val() == "" && $('#slc-alasan-modal-dasar-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada Modal Dasar Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-paid-up-perusahaan2').val() != "" && $('#inp-alasan-paid-up-com').val() == "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Alasan Pada Paid Up Capital Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-paid-up-perusahaan2').val() == "" && $('#inp-alasan-paid-up-com').val() != "") {
     alert_error("<b>=== Tab Company Detail ===</b><br> Data Baru Pada Paid Up Capital Tidak Boleh Kosong");
     return false;
    }

    //================================== TAB SHARE HOLDER (SUB TAB PERSONAL SHARE HOLDER DATA) =========================//

    if ($('#inp-tgl-id-holder-pri2').val() != "" && $('#slc-alasan-tgl-id-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Tanggal Identitas Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-tgl-id-holder-pri2').val() == "" && $('#slc-alasan-tgl-id-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Tanggal Identitas Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-alias-holder-pri2').val() != "" && $('#slc-alasan-alias-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Alias Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-alias-holder-pri2').val() == "" && $('#slc-alasan-alias-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Alias Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-gelar-holder-pri2').val() != "" && $('#slc-alasan-gelar-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Gelar Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-gelar-holder-pri2').val() == "" && $('#slc-alasan-gelar-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Gelar Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-jenis-kelamin-holder-pri2').val() != "" && $('#slc-alasan-jns-klmn-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Jenis Kelamin Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-jenis-kelamin-holder-pri2').val() == "" && $('#slc-alasan-jns-klmn-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Jenis Kelamin Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-agama-holder-pri2').val() != "" && $('#slc-alasan-agama-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Agama Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-agama-holder-pri2').val() == "" && $('#slc-alasan-agama-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Agama Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-status-pernikahan-holder-pri2').val() != "" && $('#slc-alasan-pernikahan-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Status Pernikahan Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-status-pernikahan-holder-pri2').val() == "" && $('#slc-alasan-pernikahan-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Status Pernikahan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-alamat-holder-pri2').val() != "" && $('#slc-alasan-alamat-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Alamat Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-alamat-holder-pri2').val() == "" && $('#slc-alasan-alamat-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Alamat Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rtrw-holder-pri2').val() != "" && $('#slc-alasan-rtrw-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rtrw-holder-pri2').val() == "" && $('#slc-alasan-rtrw-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rw-holder-pri2').val() != "" && $('#slc-alasan-rtrw-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rw-holder-pri2').val() == "" && $('#slc-alasan-rtrw-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kodepos-holder-pri2').val() != "" && $('#slc-alasan-kodepos-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Kode Pos Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kodepos-holder-pri2').val() == "" && $('#slc-alasan-kodepos-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Kode Pos Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kelurahan-alamat-holder-pri2').val() != "" && $('#slc-alasan-kelurahan-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Kelurahan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kelurahan-alamat-holder-pri2').val() == "" && $('#slc-alasan-kelurahan-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Kelurahan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kecamatan-alamat-holder-pri2').val() != "" && $('#slc-alasan-kecamatan-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Kecamatan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kecamatan-alamat-holder-pri2').val() == "" && $('#slc-alasan-kecamatan-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Kecamatan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kabupaten-alamat-holder-pri2').val() != "" && $('#slc-alasan-kabupaten-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kabupaten-alamat-holder-pri2').val() == "" && $('#slc-alasan-kabupaten-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-provinsi-alamat-holder-pri2').val() != "" && $('#slc-alasan-provinsi-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Provinsi Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-provinsi-alamat-holder-pri2').val() == "" && $('#slc-alasan-provinsi-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Provinsi Tidak Boleh Kosong");
     return false;
    }


    if ($('#inp-npwp-holder-pri2').val() != "" && $('#slc-alasan-npwp-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada No NPWP Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-npwp-holder-pri2').val() == "" && $('#slc-alasan-npwp-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada No NPWP Tidak Boleh Kosong");
     return false;
    }else if($('#inp-npwp-holder-pri2').val() != "" && $('#slc-alasan-npwp-holder-pri').val() != ""){
      if(cek_validasi_npwp($('#inp-npwp-holder-pri2').val()) == 0){
        alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> No NPWP Tidak Valid");
        return false;
      }
      
    }

    if ($('#inp-telepon-holder-pri2').val() != "" && $('#slc-alasan-no-tlp-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada No Telepon Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-telepon-holder-pri2').val() == "" && $('#slc-alasan-no-tlp-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada No Telepon Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-hanphone-holder-pri2').val() != "" && $('#slc-alasan-no-hp-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada No Handphone Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-hanphone-holder-pri2').val() == "" && $('#slc-alasan-no-hp-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada No Handphone Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-fax-holder-pri2').val() != "" && $('#slc-alasan-no-fax-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada No Fax Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-fax-holder-pri2').val() == "" && $('#slc-alasan-no-fax-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada No Fax Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-email-holder-pri2').val() != "" && $('#slc-alasan-email-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Email Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-email-holder-pri2').val() == "" && $('#slc-alasan-email-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Email Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-share-holder-pri2').val() != "" && $('#slc-alasan-share-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Share% Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-share-holder-pri2').val() == "" && $('#slc-alasan-share-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Share% Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-jabatan-holder-pri2').val() != "" && $('#slc-alasan-jabatan-holder-pri').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Alasan Pada Jabatan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-jabatan-holder-pri2').val() == "" && $('#slc-alasan-jabatan-holder-pri').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Personal Shareholder Data ==</b><br> Data Baru Pada Jabatan Tidak Boleh Kosong");
     return false;
    }

    //================================== TAB SHARE HOLDER (SUB TAB LEGAL ENTITY SHAREHOLDER) =========================//

    if ($('#id-comtype-holder-ent2').val() != "" && $('#slc-alasan-id-comtype-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Company Type Tidak Boleh Kosong");
     return false;
    } else if ($('#id-comtype-holder-ent2').val() == "" && $('#slc-alasan-id-comtype-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Company Type Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-comname-holder-ent2').val() != "" && $('#slc-alasan-comname-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Company Name Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-comname-holder-ent2').val() == "" && $('#slc-alasan-comname-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Company Name Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-bentuk-holder-ent2').val() != "" && $('#slc-alasan-tgl-bentuk-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Bentuk Perusahaan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-bentuk-holder-ent2').val() == "" && $('#slc-alasan-tgl-bentuk-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Bentuk Perusahaan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-alamat-holder-ent2').val() != "" && $('#slc-alasan-alamat-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Alamat Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-alamat-holder-ent2').val() == "" && $('#slc-alasan-alamat-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Alamat Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rtrw-holder-ent2').val() != "" && $('#slc-alasan-rtrw-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rtrw-holder-ent2').val() == "" && $('#slc-alasan-rtrw-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rw-holder-ent2').val() != "" && $('#slc-alasan-rtrw-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rw-holder-ent2').val() == "" && $('#slc-alasan-rtrw-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kodepos-holder-ent2').val() != "" && $('#slc-alasan-kodepos-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Kode Pos Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kodepos-holder-ent2').val() == "" && $('#slc-alasan-kodepos-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Kode Pos Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kelurahan-holder-ent2').val() != "" && $('#slc-alasan-kelurahan-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Kelurahan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kelurahan-holder-ent2').val() == "" && $('#slc-alasan-kelurahan-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Kelurahan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kecamatan-holder-ent2').val() != "" && $('#slc-alasan-kecamatan-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Kecamatan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kecamatan-holder-ent2').val() == "" && $('#slc-alasan-kecamatan-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Kecamatan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kabupaten-holder-ent2').val() != "" && $('#slc-alasan-kabupaten-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kabupaten-holder-ent2').val() == "" && $('#slc-alasan-kabupaten-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-provinsi-holder-ent2').val() != "" && $('#slc-alasan-provinsi-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Provinsi Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-provinsi-holder-ent2').val() == "" && $('#slc-alasan-provinsi-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Provinsi Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-subkode-holder-ent2').val() != "" && $('#slc-alasan-subkode-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Sub Zip Code Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-subkode-holder-ent2').val() == "" && $('#slc-alasan-subkode-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Sub Zip Code Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-telepon-holder-ent2').val() != "" && $('#slc-alasan-no-tlp-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada No Telephone Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-telepon-holder-ent2').val() == "" && $('#slc-alasan-no-tlp-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada No Telephone Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-fax-holder-ent2').val() != "" && $('#slc-alasan-no-fax-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada No Fax Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-fax-holder-ent2').val() == "" && $('#slc-alasan-no-fax-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada No Fax Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-email-holder-ent2').val() != "" && $('#slc-alasan-email-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Email Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-email-holder-ent2').val() == "" && $('#slc-alasan-email-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Email Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-estno-holder-ent2').val() != "" && $('#slc-alasan-estno-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Establish No Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-estno-holder-ent2').val() == "" && $('#slc-alasan-estno-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Establish No Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-estdate-holder-ent2').val() != "" && $('#slc-alasan-estdate-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Establish Date Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-estdate-holder-ent2').val() == "" && $('#slc-alasan-estdate-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Establish Date Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-estdate-holder-ent2').val() != "" && $('#slc-alasan-estdate-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Establish Date Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-estdate-holder-ent2').val() == "" && $('#slc-alasan-estdate-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Establish Date Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-npwp-holder-ent2').val() != "" && $('#slc-alasan-npwp-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada NPWP Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-npwp-holder-ent2').val() == "" && $('#slc-alasan-npwp-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada NPWP Tidak Boleh Kosong");
     return false;
    }else if($('#inp-npwp-holder-ent2').val() != "" && $('#slc-alasan-npwp-holder-ent').val() != ""){
      if(cek_validasi_npwp($('#inp-npwp-holder-ent2').val()) == 0){
        alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> No NPWP Tidak Valid");
        return false;
      }
    }

    if ($('#inp-share-holder-ent2').val() != "" && $('#slc-alasan-share-holder-ent').val() == "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Alasan Pada Share% Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-share-holder-ent2').val() == "" && $('#slc-alasan-share-holder-ent').val() != "") {
     alert_error("<b>=== Tab Shareholder ===</b><br><b>== Legal Entity Shareholder ==</b><br> Data Baru Pada Share% Tidak Boleh Kosong");
     return false;
    }

    //=================================================== TAB PIC MANAGEMENT ===============================================//

    if ($('#inp-tgl-id-pic2').val() != "" && $('#slc-alasan-tgl-id-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Tanggal Identitas Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-tgl-id-pic2').val() == "" && $('#slc-alasan-tgl-id-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Tanggal Identitas Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-exp-id-date-pic2').val() != "" && $('#slc-alasan-exp-id-date-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Expired Identitas Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-exp-id-date-pic2').val() == "" && $('#slc-alasan-exp-id-date-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Expired Identitas Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-nama-awal-pic2').val() != "" && $('#slc-alasan-nama-awal-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Nama Awal Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-nama-awal-pic2').val() == "" && $('#slc-alasan-nama-awal-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Nama Awal Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-nama-akhir-pic2').val() != "" && $('#slc-alasan-nama-akhir-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Nama Akhir Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-nama-akhir-pic2').val() == "" && $('#slc-alasan-nama-akhir-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Nama Akhir Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-alias-pic2').val() != "" && $('#slc-alasan-alias-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Alias Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-alias-pic2').val() == "" && $('#slc-alasan-alias-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Alias Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-gelar-pic2').val() != "" && $('#slc-alasan-gelar-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Gelar Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-gelar-pic2').val() == "" && $('#slc-alasan-gelar-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Gelar Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-jenis-kelamin-pic2').val() != "" && $('#slc-alasan-jns-klmn-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Jenis Kelamin Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-jenis-kelamin-pic2').val() == "" && $('#slc-alasan-jns-klmn-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Jenis Kelamin Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-agama-pic2').val() != "" && $('#slc-alasan-agama-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Agama Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-agama-pic2').val() == "" && $('#slc-alasan-agama-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Agama Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-status-pernikahan-pic2').val() != "" && $('#slc-alasan-status-pernikahan-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Status Pernikahan Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-status-pernikahan-pic2').val() == "" && $('#slc-alasan-status-pernikahan-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Status Pernikahan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-alamat-pic2').val() != "" && $('#slc-alasan-alamat-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Alamat Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-alamat-pic2').val() == "" && $('#slc-alasan-alamat-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Alamat Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rtrw-pic2').val() != "" && $('#slc-alasan-rtrw-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rtrw-pic2').val() == "" && $('#slc-alasan-rtrw-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rw-pic2').val() != "" && $('#slc-alasan-rtrw-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rw-pic2').val() == "" && $('#slc-alasan-rtrw-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kode-pos-alamat-pic2').val() != "" && $('#slc-alasan-kodepos-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Kode Pos Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kode-pos-alamat-pic2').val() == "" && $('#slc-alasan-kodepos-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Kode Pos Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kelurahan-alamat-pic2').val() != "" && $('#slc-alasan-kelurahan-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Kelurahan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kelurahan-alamat-pic2').val() == "" && $('#slc-alasan-kelurahan-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Kelurahan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kecamatan-alamat-pic2').val() != "" && $('#slc-alasan-kecamatan-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Kecamatan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kecamatan-alamat-pic2').val() == "" && $('#slc-alasan-kecamatan-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Kecamatan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kabupaten-alamat-pic2').val() != "" && $('#slc-alasan-kabupaten-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kabupaten-alamat-pic2').val() == "" && $('#slc-alasan-kabupaten-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-provinsi-alamat-pic2').val() != "" && $('#slc-alasan-provinsi-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Provinsi Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-provinsi-alamat-pic2').val() == "" && $('#slc-alasan-provinsi-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Provinsi Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-telepon-pic2').val() != "" && $('#slc-alasan-no-tlp-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada No Telephone Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-telepon-pic2').val() == "" && $('#slc-alasan-no-tlp-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada No Telephone Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-hanphone-pic2').val() != "" && $('#slc-alasan-no-hp-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada No Handphone Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-hanphone-pic2').val() == "" && $('#slc-alasan-no-hp-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada No Handphone Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-fax-pic2').val() != "" && $('#slc-alasan-no-fax-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada No Fax Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-fax-pic2').val() == "" && $('#slc-alasan-no-fax-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada No fax Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-email-pic2').val() != "" && $('#slc-alasan-email-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Email Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-email-pic2').val() == "" && $('#slc-alasan-email-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Email Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-share-pic2').val() != "" && $('#slc-alasan-share-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Share% Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-share-pic2').val() == "" && $('#slc-alasan-share-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Share% Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-npwp-pic2').val() != "" && $('#slc-alasan-npwp-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada No NPWP Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-npwp-pic2').val() == "" && $('#slc-alasan-npwp-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada No NPWP Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-jabatan-pic2').val() != "" && $('#slc-alasan-jabatan-pic').val() == "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Alasan Pada Jabatan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-jabatan-pic2').val() == "" && $('#slc-alasan-jabatan-pic').val() != "") {
     alert_error("<b>=== Tab PIC Management ===</b><br> Data Baru Pada Jabatan Tidak Boleh Kosong");
     return false;
    }

    //========================================= Tab Penjamin ========================================================//

    if ($('#slc-jenis-identitas-penjaminn2').val() != "" && $('#slc-alasan-jns-id-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Tipe Identitas Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-jenis-identitas-penjaminn2').val() == "" && $('#slc-alasan-jns-id-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Tipe Identitas Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-no-identitas-penjaminn2').val() != "" && $('#slc-alasan-no-id-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Nomor Identitas Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-no-identitas-penjaminn2').val() == "" && $('#slc-alasan-no-id-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Nomor Identitas Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-issued-date-penjaminn2').val() != "" && $('#slc-alasan-tgl-id-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Tanggal Identitas Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-issued-date-penjaminn2').val() == "" && $('#slc-alasan-tgl-id-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Tanggal Identitas Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-expired-date-penjaminn2').val() != "" && $('#slc-alasan-exp-id-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Expired Identitas Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-expired-date-penjaminn2').val() == "" && $('#slc-alasan-exp-id-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Expired Identitas Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-fname-penjaminn2').val() != "" && $('#slc-alasan-fname-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Nama Depan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-fname-penjaminn2').val() == "" && $('#slc-alasan-fname-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Nama Depan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-lname-penjaminn2').val() != "" && $('#slc-alasan-lname-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Nama Belakang Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-lname-penjaminn2').val() == "" && $('#slc-alasan-lname-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Nama Belakang Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-alias-penjaminn2').val() != "" && $('#slc-alasan-alias-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Alias Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-alias-penjaminn2').val() == "" && $('#slc-alasan-alias-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Alias Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-gelar-penjaminn2').val() != "" && $('#slc-alasan-gelar-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Gelar Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-gelar-penjaminn2').val() == "" && $('#slc-alasan-gelar-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Gelar Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-tempat-lahir-penjaminn2').val() != "" && $('#slc-alasan-tmpt-lhr-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Tempat Lahir Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-tempat-lahir-penjaminn2').val() == "" && $('#slc-alasan-tmpt-lhr-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Tempat Lahir Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-tanggal-lahir-penjaminn2').val() != "" && $('#slc-alasan-tgl-lhr-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Tanggal Lahir Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-tanggal-lahir-penjaminn2').val() == "" && $('#slc-alasan-tgl-lhr-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Tanggal Lahir Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-jenis-kelamin-penjaminn2').val() != "" && $('#slc-alasan-jns-klmn-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Jenis Kelamin Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-jenis-kelamin-penjaminn2').val() == "" && $('#slc-alasan-jns-klmn-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Jenis Kelamin Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-agama-penjaminn2').val() != "" && $('#slc-alasan-agama-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Agama Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-agama-penjaminn2').val() == "" && $('#slc-alasan-agama-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Agama Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-pekerjaan-penjaminn2').val() != "" && $('#slc-alasan-pekerjaan-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Pekerjaan Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-pekerjaan-penjaminn2').val() == "" && $('#slc-alasan-pekerjaan-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Pekerjaan Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-status-pernikahan-penjaminn2').val() != "" && $('#slc-alasan-pernikahan-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Status Pernikahan Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-status-pernikahan-penjaminn2').val() == "" && $('#slc-alasan-pernikahan-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Status Pernikahan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-alamat-penjaminn2').val() != "" && $('#slc-alasan-alamat-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Alamat Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-alamat-penjaminn2').val() == "" && $('#slc-alasan-alamat-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Alamat Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rtrw-penjaminn2').val() != "" && $('#slc-alasan-rtrw-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rtrw-penjaminn2').val() == "" && $('#slc-alasan-rtrw-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rw-penjaminn2').val() != "" && $('#slc-alasan-rtrw-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rw-penjaminn2').val() == "" && $('#slc-alasan-rtrw-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kode-pos-alamat-penjaminn2').val() != "" && $('#slc-alasan-kodepos-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Kode Pos Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kode-pos-alamat-penjaminn2').val() == "" && $('#slc-alasan-kodepos-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Kode Pos Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kelurahan-alamat-penjaminn2').val() != "" && $('#slc-alasan-kelurahan-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Kelurahan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kelurahan-alamat-penjaminn2').val() == "" && $('#slc-alasan-kelurahan-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Kelurahan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kecamatan-alamat-penjaminn2').val() != "" && $('#slc-alasan-kecamatan-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Kecamatan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kecamatan-alamat-penjaminn2').val() == "" && $('#slc-alasan-kecamatan-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Kecamatan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kabupaten-alamat-penjaminn2').val() != "" && $('#slc-alasan-kabupaten-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kabupaten-alamat-penjaminn2').val() == "" && $('#slc-alasan-kabupaten-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-provinsi-alamat-penjaminn2').val() != "" && $('#slc-alasan-provinsi-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Provinsi Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-provinsi-alamat-penjaminn2').val() == "" && $('#slc-alasan-provinsi-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Provinsi Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-telepon-penjaminn2').val() != "" && $('#slc-alasan-no-tlp-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada No Telephone Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-telepon-penjaminn2').val() == "" && $('#slc-alasan-no-tlp-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada No Telephone Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-hanphone-penjaminn2').val() != "" && $('#slc-alasan-no-hp-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada No Handphone Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-hanphone-penjaminn2').val() == "" && $('#slc-alasan-no-hp-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada No HandPhone Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-email-penjaminn2').val() != "" && $('#slc-alasan-email-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Personal Email Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-email-penjaminn2').val() == "" && $('#slc-alasan-email-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Personal Email Tidak Boleh Kosong");
     return false;
    }

    if ($('#status-hubungan-penjaminn2').val() != "" && $('#slc-alasan-stat-hub-penjaminn').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Status Hubungan Tidak Boleh Kosong");
     return false;
    } else if ($('#status-hubungan-penjaminn2').val() == "" && $('#slc-alasan-stat-hub-penjaminn').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Status Hubungan Tidak Boleh Kosong");
     return false;
    }

    //========================================== TAB PERSONAL (CUSTOMER DETAIL SUB TAB KTP/SIM/PASSPORT APPLICANT) =====//

    if ($('#id-type-per2').val() != "" && $('#slc-alasan-id-type-per').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Applicant ==</b><br> Alasan Pada Tipe Identitas Tidak Boleh Kosong");
     return false;
    } else if ($('#id-type-per2').val() == "" && $('#slc-alasan-id-type-per').val() != "") {
     alert_error("<b>=== Tab Personal DETAIL ===</b><br><b>== Tab KTP/SIM/Passport Applicant ==</b><br> Data Baru Pada Tipe Identitas Tidak Boleh Kosong");
     return false;
    }

    if ($('#id-type-per2').val() != "01" && $('#id-type-per2').val() != "06" && $('#id-type-per2').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Applicant ==</b><br> Perubahan Tipe Identitas Hanya Bisa Ke KTP dan KTP Sementara/Resi KTP");
     return false;
    }

    if ($('#inp-alias-per2').val() != "" && $('#slc-alasan-alias-per').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Applicant ==</b><br> Alasan Pada Alias Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-alias-per2').val() == "" && $('#slc-alasan-alias-per').val() != "") {
     alert_error("<b>=== Tab Personal DETAIL ===</b><br><b>== Tab KTP/SIM/Passport Applicant ==</b><br> Data Baru Pada Alias Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-agama-per2').val() != "" && $('#slc-alasan-agama-per').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Applicant ==</b><br> Alasan Pada Agama Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-agama-per2').val() == "" && $('#slc-alasan-agama-per').val() != "") {
     alert_error("<b>=== Tab Personal DETAIL ===</b><br><b>== Tab KTP/SIM/Passport Applicant ==</b><br> Data Baru Pada Agama Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-agama-per2').val() != "" && $('#slc-alasan-agama-per').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Applicant ==</b><br> Alasan Pada Agama Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-agama-per2').val() == "" && $('#slc-alasan-agama-per').val() != "") {
     alert_error("<b>=== Tab Personal DETAIL ===</b><br><b>== Tab KTP/SIM/Passport Applicant ==</b><br> Data Baru Pada Agama Tidak Boleh Kosong");
     return false;
    }

    //========================================== TAB PERSONAL (CUSTOMER DETAIL SUB TAB KTP/SIM/PASSPORT SPOUSE) =====//

    if ($('#inp-tgl-id-spouse2').val() != "" && $('#slc-alasan-tgl-id-spouse').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Alasan Pada Tanggal Identitas Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-tgl-id-spouse2').val() == "" && $('#slc-alasan-tgl-id-spouse').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Data Baru Pada Tanggal Identitas Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-exp-id-date-spouse2').val() != "" && $('#slc-alasan-exp-id-date-spouse').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Alasan Pada Expired Identitas Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-exp-id-date-spouse2').val() == "" && $('#slc-alasan-exp-id-date-spouse').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Data Baru Pada Expired Identitas Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-alias-spouse2').val() != "" && $('#slc-alasan-alias-spouse').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Alasan Pada Alias Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-alias-spouse2').val() == "" && $('#slc-alasan-alias-spouse').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Data Baru Pada Alias Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-gelar-spouse2').val() != "" && $('#slc-alasan-gelar-spouse').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Alasan Pada Gelar Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-gelar-spouse2').val() == "" && $('#slc-alasan-gelar-spouse').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Data Baru Pada Gelar Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-no-telp-spouse2').val() != "" && $('#slc-alasan-no-telp-spouse').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Alasan Pada Telepon Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-no-telp-spouse2').val() == "" && $('#slc-alasan-no-telp-spouse').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Data Baru Pada Telepon Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-no-hp-spouse2').val() != "" && $('#slc-alasan-no-hp-spouse').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Alasan Pada No Handphone Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-no-hp-spouse2').val() == "" && $('#slc-alasan-no-hp-spouse').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Data Baru Pada No Handphone Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-agama-spouse2').val() != "" && $('#slc-alasan-agama-spouse').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Alasan Pada Agama Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-agama-spouse2').val() == "" && $('#slc-alasan-agama-spouse').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Data Baru Pada Agama Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-alamat-spouse2').val() != "" && $('#slc-alasan-alamat-spouse').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Alasan Pada Alamat Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-alamat-spouse2').val() == "" && $('#slc-alasan-alamat-spouse').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Data Baru Pada Alamat Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rtrw-spouse2').val() != "" && $('#slc-alasan-rtrw-spouse').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rtrw-spouse2').val() == "" && $('#slc-alasan-rtrw-spouse').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rw-spouse2').val() != "" && $('#slc-alasan-rtrw-spouse').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rw-spouse2').val() == "" && $('#slc-alasan-rtrw-spouse').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kode-pos-alamat-spouse2').val() != "" && $('#slc-alasan-kodepos-spouse').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Alasan Pada Kode Pos Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kode-pos-alamat-spouse2').val() == "" && $('#slc-alasan-kodepos-spouse').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Data Baru Pada Kode Pos Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kelurahan-alamat-spouse2').val() != "" && $('#slc-alasan-kelurahan-spouse').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Alasan Pada Kelurahan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kelurahan-alamat-spouse2').val() == "" && $('#slc-alasan-kelurahan-spouse').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Data Baru Pada Kelurahan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kecamatan-alamat-spouse2').val() != "" && $('#slc-alasan-kecamatan-spouse').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Alasan Pada Kecamatan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kecamatan-alamat-spouse2').val() == "" && $('#slc-alasan-kecamatan-spouse').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Data Baru Pada Kecamatan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kabupaten-alamat-spouse2').val() != "" && $('#slc-alasan-kabupaten-spouse').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Alasan Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kabupaten-alamat-spouse2').val() == "" && $('#slc-alasan-kabupaten-spouse').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Data Baru Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-provinsi-alamat-spouse2').val() != "" && $('#slc-alasan-provinsi-spouse').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Alasan Pada Provinsi Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-provinsi-alamat-spouse2').val() == "" && $('#slc-alasan-provinsi-spouse').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab KTP/SIM/Passport Spouse ==</b><br> Data Baru Pada Provinsi Tidak Boleh Kosong");
     return false;
    }

    //============================= TAB FAMILY CARD INPUT ======================================//

    if ($('#inp-no-kk2').val() != "" && $('#slc-alasan-no-kk').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Family Card Input ==</b><br> Alasan Pada No Kartu Keluarga Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-no-kk2').val() == "" && $('#slc-alasan-no-kk').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Family Card Input ==</b><br> Data Baru Pada No Kartu Keluarga Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-jml-tanggung-kk2').val() != "" && $('#slc-alasan-jml-tanggung-kk').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Family Card Input ==</b><br> Alasan Pada Jumlah Tanggungan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-jml-tanggung-kk2').val() == "" && $('#slc-alasan-jml-tanggung-kk').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Family Card Input ==</b><br> Data Baru Pada Jumlah Tanggungan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-education-kk2').val() != "" && $('#slc-alasan-education-kk').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Family Card Input ==</b><br> Alasan Pada Pendidikan Pemohon Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-education-kk2').val() == "" && $('#slc-alasan-education-kk').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Family Card Input ==</b><br> Data Baru Pada Pendidikan Pemohon Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-nationality-kk2').val() != "" && $('#slc-alasan-nationality-kk').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Family Card Input ==</b><br> Alasan Pada Kebangsaan Pemohon Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-nationality-kk2').val() == "" && $('#slc-alasan-nationality-kk').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Family Card Input ==</b><br> Data Baru Pada Kebangsaan Pemohon Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-education-spouse-kk2').val() != "" && $('#slc-alasan-education-spouse-kk').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Family Card Input ==</b><br> Alasan Pada Pendidikan Pasangan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-education-spouse-kk2').val() == "" && $('#slc-alasan-education-spouse-kk').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Family Card Input ==</b><br> Data Baru Pada Pendidikan Pasangan Tidak Boleh Kosong");
     return false;
    }

    //======================================= TAB CURRENT RESIDENCE ======================//

    if ($('#inp-kode-pos-alamat-resident2').val() != "" && $('#slc-alasan-kodepos-resident').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Alasan Pada Kode Pos Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kode-pos-alamat-resident2').val() == "" && $('#slc-alasan-kodepos-resident').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Data Baru Pada Kode Pos Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kelurahan-alamat-resident2').val() != "" && $('#slc-alasan-kelurahan-resident').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Alasan Pada Kelurahan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kelurahan-alamat-resident2').val() == "" && $('#slc-alasan-kelurahan-resident').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Data Baru Pada Kelurahan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kecamatan-alamat-resident2').val() != "" && $('#slc-alasan-kecamatan-resident').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Alasan Pada Kecamatan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kecamatan-alamat-resident2').val() == "" && $('#slc-alasan-kecamatan-resident').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Data Baru Pada Kecamatan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kabupaten-alamat-resident2').val() != "" && $('#slc-alasan-kabupaten-resident').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Alasan Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kabupaten-alamat-resident2').val() == "" && $('#slc-alasan-kabupaten-resident').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Data Baru Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-provinsi-alamat-resident2').val() != "" && $('#slc-alasan-provinsi-resident').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Alasan Pada Provinsi Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-provinsi-alamat-resident2').val() == "" && $('#slc-alasan-provinsi-resident').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Data Baru Pada Provinsi Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-telepon-resident2').val() != "" && $('#slc-alasan-no-tlp-resident').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Alasan Pada No Telephone Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-telepon-resident2').val() == "" && $('#slc-alasan-no-tlp-resident').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Data Baru Pada No Telephone Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-hanphone-resident2').val() != "" && $('#slc-alasan-no-hp-resident').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Alasan Pada No Handphone Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-hanphone-resident2').val() == "" && $('#slc-alasan-no-hp-resident').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Data Baru Pada No Handphone Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-fax-resident2').val() != "" && $('#slc-alasan-no-fax-resident').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Alasan Pada No Fax Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-fax-resident2').val() == "" && $('#slc-alasan-no-fax-resident').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Data Baru Pada No Fax Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-email-resident2').val() != "" && $('#slc-alasan-email-resident').val() == "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Alasan Pada Email Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-email-resident2').val() == "" && $('#slc-alasan-email-resident').val() != "") {
     alert_error("<b>=== Tab Personal Detail ===</b><br><b>== Tab Current Residence ==</b><br> Data Baru Pada Email Tidak Boleh Kosong");
     return false;
    }


    //======================================= TAB PERSONAL (OCCUPATION DETAIL) =======================================//

    if ($('#slc-jenis-perusahaan-occp2').val() != "" && $('#slc-alasan-perusahaan-occp').val() == "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Alasan Pada Jenis Perusahaan Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-jenis-perusahaan-occp2').val() == "" && $('#slc-alasan-perusahaan-occp').val() != "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Data Baru Pada Jenis Perusahaan Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-fasilitas-perusahaan-occp2').val() != "" && $('#slc-alasan-fasilitas-perusahaan-occp').val() == "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Alasan Pada Fasilitas Perusahaan Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-fasilitas-perusahaan-occp2').val() == "" && $('#slc-alasan-fasilitas-perusahaan-occp').val() != "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Data Baru Pada Fasilitas Perusahaan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-bisnis-lain-occp2').val() != "" && $('#slc-alasan-bisnis-lain-occp').val() == "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Alasan Pada Bisnis Lainnya Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-bisnis-lain-occp2').val() == "" && $('#slc-alasan-bisnis-lain-occp').val() != "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Data Baru Pada Bisnis Lainnya Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-atasan-langsung-occp2').val() != "" && $('#slc-alasan-atasan-langsung-occp').val() == "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Alasan Pada Atasan Langsung Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-atasan-langsung-occp2').val() == "" && $('#slc-alasan-atasan-langsung-occp').val() != "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Data Baru Pada Atasan Langsung Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-alamat-occp2').val() != "" && $('#slc-alasan-alamat-occp').val() == "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Alasan Pada Alamat Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-alamat-occp2').val() == "" && $('#slc-alasan-alamat-occp').val() != "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Data Baru Pada Alamat Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rtrw-alamat-occp2').val() != "" && $('#slc-alasan-rtrw-occp').val() == "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rtrw-alamat-occp2').val() == "" && $('#slc-alasan-rtrw-occp').val() != "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rw-alamat-occp2').val() != "" && $('#slc-alasan-rtrw-occp').val() == "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rw-alamat-occp2').val() == "" && $('#slc-alasan-rtrw-occp').val() != "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kode-pos-occp2').val() != "" && $('#slc-alasan-kodepos-occp').val() == "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Alasan Pada Kode Pos Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kode-pos-occp2').val() == "" && $('#slc-alasan-kodepos-occp').val() != "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Data Baru Pada Kode Pos Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kelurahan-occp2').val() != "" && $('#slc-alasan-kelurahan-occp').val() == "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Alasan Pada Kelurahan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kelurahan-occp2').val() == "" && $('#slc-alasan-kelurahan-occp').val() != "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Data Baru Pada Kelurahan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kecamatan-occp2').val() != "" && $('#slc-alasan-kecamatan-occp').val() == "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Alasan Pada Kecamatan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kecamatan-occp2').val() == "" && $('#slc-alasan-kecamatan-occp').val() != "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Data Baru Pada Kecamatan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kabupaten-occp2').val() != "" && $('#slc-alasan-kabupaten-occp').val() == "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Alasan Pada Kabupaten Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kabupaten-occp2').val() == "" && $('#slc-alasan-kabupaten-occp').val() != "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Data Baru Pada Kabupaten Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-provinsi-occp2').val() != "" && $('#slc-alasan-provinsi-occp').val() == "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Alasan Pada Provinsi Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-provinsi-occp2').val() == "" && $('#slc-alasan-provinsi-occp').val() != "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Data Baru Pada Provinsi Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-telepon-occp2').val() != "" && $('#slc-alasan-no-tlp-occp').val() == "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Alasan Pada No Telephone Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-telepon-occp2').val() == "" && $('#slc-alasan-no-tlp-occp').val() != "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Data Baru Pada No Telephone Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-fax-occp2').val() != "" && $('#slc-alasan-no-fax-occp').val() == "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Alasan Pada No Fax Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-fax-occp2').val() == "" && $('#slc-alasan-no-fax-occp').val() != "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Data Baru Pada No Fax Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-email-occp2').val() != "" && $('#slc-alasan-email-occp').val() == "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Alasan Pada Email Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-email-occp2').val() == "" && $('#slc-alasan-email-occp').val() != "") {
     alert_error("<b>=== Tab Occupation Detail ===</b><br> Data Baru Pada Email Tidak Boleh Kosong");
     return false;
    }

    //=========================== TAB OTHER (OTHER) PERSONAL ===========================================//
    
    if ($('#inp-npwp-other2').val() != "" && $('#slc-alasan-npwp-other').val() == "") {
     alert_error("<b>=== Tab Other ===</b><br> Alasan Pada No NPWP Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-npwp-other2').val() == "" && $('#slc-alasan-npwp-other').val() != "") {
     alert_error("<b>=== Tab Other ===</b><br> Data Baru Pada No NPWP Tidak Boleh Kosong");
     return false;
    }else if($('#inp-npwp-other2').val() != "" && $('#slc-alasan-npwp-other').val() != ""){
      if(cek_validasi_npwp($('#inp-npwp-other2').val()) == 0){
        alert_error("<b>=== Tab Other ===</b><br> No NPWP Tidak Valid");
      return false;
      }
      
    }

    if ($('#inp-no-resi-other2').val() != "" && $('#slc-alasan-no-resi-other').val() == "") {
     alert_error("<b>=== Tab Other ===</b><br> Alasan Pada No Resi Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-no-resi-other2').val() == "" && $('#slc-alasan-no-resi-other').val() != "") {
     alert_error("<b>=== Tab Other ===</b><br> Data Baru Pada No Resi Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-tgl-resi-other2').val() != "" && $('#slc-alasan-tgl-resi-other').val() == "") {
     alert_error("<b>=== Tab Other ===</b><br> Alasan Pada Resi Date Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-tgl-resi-other2').val() == "" && $('#slc-alasan-tgl-resi-other').val() != "") {
     alert_error("<b>=== Tab Other ===</b><br> Data Baru Pada Resi Date Tidak Boleh Kosong");
     return false;
    }

    //========================= TAB OTHER (EMERGENY CONTACT) PERSONAL ================================//

    if ($('#inp-alias-other2').val() != "" && $('#slc-alasan-alias-other').val() == "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Alasan Pada Alias Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-alias-other2').val() == "" && $('#slc-alasan-alias-other').val() != "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Data Baru Pada Alias Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-gelar-other2').val() != "" && $('#slc-alasan-gelar-other').val() == "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Alasan Pada Gelar Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-gelar-other2').val() == "" && $('#slc-alasan-gelar-other').val() != "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Data Baru Pada Gelar Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-alamat-other2').val() != "" && $('#slc-alasan-alamat-other').val() == "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Alasan Pada Alamat Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-alamat-other2').val() == "" && $('#slc-alasan-alamat-other').val() != "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Data Baru Pada Alamat Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rtrw-other2').val() != "" && $('#slc-alasan-rtrw-other').val() == "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rtrw-other2').val() == "" && $('#slc-alasan-rtrw-other').val() != "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rw-other2').val() != "" && $('#slc-alasan-rtrw-other').val() == "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rw-other2').val() == "" && $('#slc-alasan-rtrw-other').val() != "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kode-pos-other2').val() != "" && $('#slc-alasan-kodepos-other').val() == "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Alasan Pada Kode Pos Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kode-pos-other2').val() == "" && $('#slc-alasan-kodepos-other').val() != "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Data Baru Pada Kode Pos Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kelurahan-alamat-other2').val() != "" && $('#slc-alasan-kelurahan-other').val() == "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Alasan Pada Kelurahan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kelurahan-alamat-other2').val() == "" && $('#slc-alasan-kelurahan-other').val() != "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Data Baru Pada Kelurahan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kecamatan-alamat-other2').val() != "" && $('#slc-alasan-kecamatan-other').val() == "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Alasan Pada Kecamatan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kecamatan-alamat-other2').val() == "" && $('#slc-alasan-kecamatan-other').val() != "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Data Baru Pada Kecamatan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kabupaten-alamat-other2').val() != "" && $('#slc-alasan-kabupaten-other').val() == "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Alasan Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kabupaten-alamat-other2').val() == "" && $('#slc-alasan-kabupaten-other').val() != "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Data Baru Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-provinsi-alamat-other2').val() != "" && $('#slc-alasan-provinsi-other').val() == "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Alasan Pada Provinsi Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-provinsi-alamat-other2').val() == "" && $('#slc-alasan-provinsi-other').val() != "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Data Baru Pada Provinsi Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-status-hubungan-other2').val() != "" && $('#slc-alasan-status-hubungan-other').val() == "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Alasan Pada Status Hubungan Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-status-hubungan-other2').val() == "" && $('#slc-alasan-status-hubungan-other').val() != "") {
     alert_error("<b>=== Tab Other ===</b><br><b>== Emergency Contact ==</b><br> Data Baru Pada Status Hubungan Tidak Boleh Kosong");
     return false;
    }

    //============================================= TAB PENJAMIN PERSONAL ==============================================//

    if ($('#slc-jenis-identitas-penjamin2').val() != "" && $('#slc-alasan-jns-id-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Tipe Identitas Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-jenis-identitas-penjamin2').val() == "" && $('#slc-alasan-jns-id-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Tipe Identitas Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-no-identitas-penjamin2').val() != "" && $('#slc-alasan-no-id-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Nomor Identitas Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-no-identitas-penjamin2').val() == "" && $('#slc-alasan-no-id-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Nomor Identitas Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-issued-date-penjamin2').val() != "" && $('#slc-alasan-tgl-id-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Tanggal Identitas Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-issued-date-penjamin2').val() == "" && $('#slc-alasan-tgl-id-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Tanggal Identitas Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-expired-date-penjamin2').val() != "" && $('#slc-alasan-exp-id-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Expired Identitas Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-expired-date-penjamin2').val() == "" && $('#slc-alasan-exp-id-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Expired Identitas Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-fname-penjamin2').val() != "" && $('#slc-alasan-fname-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Nama Depan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-fname-penjamin2').val() == "" && $('#slc-alasan-fname-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Nama Depan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-lname-penjamin2').val() != "" && $('#slc-alasan-lname-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Nama Belakang Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-lname-penjamin2').val() == "" && $('#slc-alasan-lname-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Nama Belakang Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-alias-penjamin2').val() != "" && $('#slc-alasan-alias-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Alias Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-alias-penjamin2').val() == "" && $('#slc-alasan-alias-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Alias Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-gelar-penjamin2').val() != "" && $('#slc-alasan-gelar-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Gelar Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-gelar-penjamin2').val() == "" && $('#slc-alasan-gelar-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Gelar Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-tempat-lahir-penjamin2').val() != "" && $('#slc-alasan-tmpt-lhr-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Tempat Lahir Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-tempat-lahir-penjamin2').val() == "" && $('#slc-alasan-tmpt-lhr-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Tempat Lahir Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-tanggal-lahir-penjamin2').val() != "" && $('#slc-alasan-tgl-lhr-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Tanggal Lahir Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-tanggal-lahir-penjamin2').val() == "" && $('#slc-alasan-tgl-lhr-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Tanggal Lahir Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-jenis-kelamin-penjamin2').val() != "" && $('#slc-alasan-jns-klmn-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Jenis Kelamin Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-jenis-kelamin-penjamin2').val() == "" && $('#slc-alasan-jns-klmn-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Jenis Kelamin Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-agama-penjamin2').val() != "" && $('#slc-alasan-agama-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Agama Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-agama-penjamin2').val() == "" && $('#slc-alasan-agama-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Agama Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-pekerjaan-penjamin2').val() != "" && $('#slc-alasan-pekerjaan-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Pekerjaan Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-pekerjaan-penjamin2').val() == "" && $('#slc-alasan-pekerjaan-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Pekerjaan Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-status-pernikahan-penjamin2').val() != "" && $('#slc-alasan-pernikahan-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Status Pernikahan Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-status-pernikahan-penjamin2').val() == "" && $('#slc-alasan-pernikahan-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Status Pernikahan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-alamat-penjamin2').val() != "" && $('#slc-alasan-alamat-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Alamat Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-alamat-penjamin2').val() == "" && $('#slc-alasan-alamat-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Alamat Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rtrw-penjamin2').val() != "" && $('#slc-alasan-rtrw-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rtrw-penjamin2').val() == "" && $('#slc-alasan-rtrw-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-rw-penjamin2').val() != "" && $('#slc-alasan-rtrw-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-rw-penjamin2').val() == "" && $('#slc-alasan-rtrw-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Rt/Rw Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kode-pos-alamat-penjamin2').val() != "" && $('#slc-alasan-kodepos-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Kode Pos Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kode-pos-alamat-penjamin2').val() == "" && $('#slc-alasan-kodepos-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Kode Pos Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kelurahan-alamat-penjamin2').val() != "" && $('#slc-alasan-kelurahan-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Kelurahan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kelurahan-alamat-penjamin2').val() == "" && $('#slc-alasan-kelurahan-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Kelurahan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kecamatan-alamat-penjamin2').val() != "" && $('#slc-alasan-kecamatan-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Kecamatan Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kecamatan-alamat-penjamin2').val() == "" && $('#slc-alasan-kecamatan-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Kecamatan Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-kabupaten-alamat-penjamin2').val() != "" && $('#slc-alasan-kabupaten-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-kabupaten-alamat-penjamin2').val() == "" && $('#slc-alasan-kabupaten-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Kabupaten/Kota Tidak Boleh Kosong");
     return false;
    }

    if ($('#slc-provinsi-alamat-penjamin2').val() != "" && $('#slc-alasan-provinsi-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Provinsi Tidak Boleh Kosong");
     return false;
    } else if ($('#slc-provinsi-alamat-penjamin2').val() == "" && $('#slc-alasan-provinsi-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Provinsi Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-telepon-penjamin2').val() != "" && $('#slc-alasan-no-tlp-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada No Telephone Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-telepon-penjamin2').val() == "" && $('#slc-alasan-no-tlp-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada No Telephone Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-hanphone-penjamin2').val() != "" && $('#slc-alasan-no-hp-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada No Handphone Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-hanphone-penjamin2').val() == "" && $('#slc-alasan-no-hp-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada No Handphone Tidak Boleh Kosong");
     return false;
    }

    if ($('#inp-email-penjamin2').val() != "" && $('#slc-alasan-email-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Personal Email Tidak Boleh Kosong");
     return false;
    } else if ($('#inp-email-penjamin2').val() == "" && $('#slc-alasan-email-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Personal Email Tidak Boleh Kosong");
     return false;
    }

    if ($('#status-hubungan-penjamin2').val() != "" && $('#slc-alasan-stat-hub-penjamin').val() == "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Alasan Pada Status Hubungan Tidak Boleh Kosong");
     return false;
    } else if ($('#status-hubungan-penjamin2').val() == "" && $('#slc-alasan-stat-hub-penjamin').val() != "") {
     alert_error("<b>=== Tab Penjamin ===</b><br> Data Baru Pada Status Hubungan Tidak Boleh Kosong");
     return false;
    }

    var arrayData = [];

    v_branch = $('#slc-branch-cc').val();
    v_contract_no = $('#input-no-contract').val();
    v_ref_no = $('#inp-ref-no').val();
    //////company
    v_subzip_lama = $('#inp-subkode-pos-alamat-perusahaan').val();
    v_notlp_lama = $('#inp-telp-alamat-perusahaan').val();
    v_nofax_lama = $('#inp-fax-alamat-perusahaan').val();
    v_email_lama = $('#inp-email-perusahaan').val();
    v_no_akte_lama = $('#inp-no-akte-perusahaan').val();
    v_tgl_pendirian_lama = $('#inp-tgl-pendirian-perusahaan').val();
    v_tgl_resino_lama = $('#inp-no-resi-perusahaan').val();
    v_tgl_residate_lama = $('#inp-tgl-resi-perusahaan').val();
    v_no_siup_lama = $('#inp-no-siup-perusahaan').val();
    v_tgl_siup_lama = $('#inp-tgl-siup-perusahaan').val();
    v_no_tdp_lama = $('#inp-no-tdp-perusahaan').val();
    v_tgl_tdp_lama = $('#inp-tgl-tdp-perusahaan').val();
    v_sektor_ekonomi_lama = $('#inp-sektor-ekonomi-id-perusahaan').val();
    v_lapangan_usaha_lama = $('#inp-lapangan-usaha-id-perusahaan').val();
    v_total_pegawai_lama = $('#inp-total-pegawai').val();
    v_public_perusahaan_lama = $('#slc-public-perusahaan :selected').val();
    v_status_lokasi_lama = $('#slc-status-lokasi :selected').val();
    v_modal_dasar_lama = $('#inp-modal-dasar-perusahaan').val();
    v_paid_up_lama = $('#inp-paid-up-perusahaan').val();
    v_tgl_akta_lama = $('#inp-tgl-akta-perusahaan').val();
    //////guarantor
    v_tipe_id_penjamin_lama = $('#slc-jenis-identitas-penjamin :selected').val();
    v_no_id_penjamin_lama = $('#inp-no-identitas-penjamin').val();
    v_id_date_penjamin_lama = $('#inp-issued-date-penjamin').val();
    v_exp_date_penjamin_lama = $('#inp-expired-date-penjamin').val();
    v_fnama_penjamin_lama = $('#inp-fname-penjamin').val();
    v_lnama_penjamin_lama = $('#inp-lname-penjamin').val();
    v_alias_penjamin_lama = $('#inp-alias-penjamin').val();
    v_gelar_penjamin_lama = $('#inp-gelar-penjamin').val();
    v_tempat_lahir_penjamin_lama = $('#inp-tempat-lahir-penjamin').val();
    v_tgl_lahir_penjamin_lama = $('#inp-tanggal-lahir-penjamin').val();
    v_jenis_kelamin_penjamin_lama = $('#slc-jenis-kelamin-penjamin').val();
    v_agama_penjamin_lama = $('#slc-agama-penjamin').val();
    v_pekerjaan_penjamin_lama = $('#slc-pekerjaan-penjamin').val();
    v_pernikahan_penjamin_lama = $('#slc-status-pernikahan-penjamin').val();
    v_rtrw_penjamin_lama = $('#inp-rtrw-penjamin').val();
    //v_rw_penjamin_lama = $('#inp-rw-penjamin').val();
    v_zipcode_penjamin_lama = $('#inp-kode-pos-alamat-penjamin').val();
    v_alamat_penjamin_lama = $('#inp-alamat-penjamin').val();
    v_kelurahan_penjamin_lama = $('#inp-kelurahan-alamat-penjamin-id').val();
    v_kecamatan_penjamin_lama = $('#inp-kecamatan-alamat-penjamin-id').val();
    v_kabupaten_kota_penjamin_lama = $('#inp-kabupaten-alamat-penjamin-id').val();
    v_provinsi_penjamin_lama = $('#inp-provinsi-penjamin-id').val();
    v_email_penjamin_lama = $('#inp-email-penjamin').val();
    v_nohp_penjamin_lama = $('#inp-hanphone-penjamin').val();
    v_notlp_penjamin_lama = $('#inp-telepon-penjamin').val();
    v_hubungan_penjamin_lama = $('#status-hubungan-penjamin').val();
    //////guarantor2
    v_tipe_id_penjaminn_lama = $('#slc-jenis-identitas-penjaminn :selected').val();
    v_no_id_penjaminn_lama = $('#inp-no-identitas-penjaminn').val();
    v_id_date_penjaminn_lama = $('#inp-issued-date-penjaminn').val();
    v_exp_date_penjaminn_lama = $('#inp-expired-date-penjaminn').val();
    v_fnama_penjaminn_lama = $('#inp-fname-penjaminn').val();
    v_lnama_penjaminn_lama = $('#inp-lname-penjaminn').val();
    v_alias_penjaminn_lama = $('#inp-alias-penjaminn').val();
    v_gelar_penjaminn_lama = $('#inp-gelar-penjaminn').val();
    v_tempat_lahir_penjaminn_lama = $('#inp-tempat-lahir-penjaminn').val();
    v_tgl_lahir_penjaminn_lama = $('#inp-tanggal-lahir-penjaminn').val();
    v_jenis_kelamin_penjaminn_lama = $('#slc-jenis-kelamin-penjaminn').val();
    v_agama_penjaminn_lama = $('#slc-agama-penjaminn').val();
    v_pekerjaan_penjaminn_lama = $('#slc-pekerjaan-penjaminn').val();
    v_pernikahan_penjaminn_lama = $('#slc-status-pernikahan-penjaminn').val();
    v_rtrw_penjaminn_lama = $('#inp-rtrw-penjaminn').val();
    //v_rw_penjaminn_lama = $('#inp-rw-penjaminn').val();
    v_zipcode_penjaminn_lama = $('#inp-kode-pos-alamat-penjaminn').val();
    v_alamat_penjaminn_lama = $('#inp-alamat-penjaminn').val();
    v_kelurahan_penjaminn_lama = $('#inp-kelurahan-alamat-penjaminn-id').val();
    v_kecamatan_penjaminn_lama = $('#inp-kecamatan-alamat-penjaminn-id').val();
    v_kabupaten_kota_penjaminn_lama = $('#inp-kabupaten-alamat-penjaminn-id').val();
    v_provinsi_penjaminn_lama = $('#inp-provinsi-penjaminn-id').val();
    v_email_penjaminn_lama = $('#inp-email-penjaminn').val();
    v_nohp_penjaminn_lama = $('#inp-hanphone-penjaminn').val();
    v_notlp_penjaminn_lama = $('#inp-telepon-penjaminn').val();
    v_hubungan_penjaminn_lama = $('#status-hubungan-penjaminn').val();
    //////holder per
    v_tgl_id_holderper_lama = $('#inp-tgl-id-holder-pri').val();
    v_alias_holderper_lama = $('#inp-alias-holder-pri').val();
    v_gelar_holderper_lama = $('#inp-gelar-holder-pri').val();
    v_jenis_kelamin_holderper_lama = $('#slc-jenis-kelamin-holder-pri').val();
    v_agama_holderper_lama = $('#slc-agama-holder-pri').val();
    v_pernikahan_holderper_lama = $('#slc-status-pernikahan-holder-pri').val();
    v_rtrw_holderper_lama = $('#inp-rtrw-holder-pri').val();
    v_rw_holderper_lama = $('#inp-rw-holder-pri').val();
    v_zipcode_holderper_lama = $('#inp-kodepos-holder-pri').val();
    v_alamat_holderper_lama = $('#inp-alamat-holder-pri').val();
    v_kelurahan_holderper_lama = $('#inp-kelurahan-alamat-holder-pri').val();
    v_kecamatan_holderper_lama = $('#inp-kecamatan-alamat-holder-pri').val();
    v_kabupaten_kota_holderper_lama = $('#inp-kabupaten-alamat-holder-pri').val();
    v_provinsi_holderper_lama = $('#inp-provinsi-alamat-holder-pri').val();
    v_kelurahan_holderper_lama_id = $('#inp-kelurahan-alamat-holder-pri-id').val();
    v_kecamatan_holderper_lama_id = $('#inp-kecamatan-alamat-holder-pri-id').val();
    v_kabupaten_kota_holderper_lama_id = $('#inp-kabupaten-alamat-holder-pri-id').val();
    v_provinsi_holderper_lama_id = $('#inp-provinsi-holder-pri-id').val();
    v_npwp_holderper_lama = $('#inp-npwp-holder-pri').val();
    v_notelp_holderper_lama = $('#inp-telepon-holder-pri').val();
    v_nohp_holderper_lama = $('#inp-hanphone-holder-pri').val();
    v_nofax_holderper_lama = $('#inp-fax-holder-pri').val();
    v_email_holderper_lama = $('#inp-email-holder-pri').val();
    v_share_holderper_lama = $('#inp-share-holder-pri').val();
    v_jabatan_holderper_lama = $('#inp-jabatan-holder-pri').val();
    ///////holder ent
    v_comtype_holderent_lama = $('#id-comtype-holder-ent').val();
    v_comname_holderent_lama = $('#inp-comname-holder-ent').val();
    v_bentuk_holderent_lama = $('#inp-bentuk-holder-ent').val();
    v_rtrw_holderent_lama = $('#inp-rtrw-holder-ent').val();
    v_rw_holderent_lama = $('#inp-rw-holder-ent').val();
    v_zipcode_holderent_lama = $('#inp-kodepos-holder-ent').val();
    v_alamat_holderent_lama = $('#inp-alamat-holder-ent').val();
    v_kelurahan_holderent_lama = $('#inp-kelurahan-holder-ent').val();
    v_kecamatan_holderent_lama = $('#inp-kecamatan-holder-ent').val();
    v_kabupaten_kota_holderent_lama = $('#inp-kabupaten-holder-ent').val();
    v_provinsi_holderent_lama = $('#inp-provinsi-holder-ent').val();
    v_kelurahan_holderent_lama_id = $('#inp-kelurahan-holder-ent-id').val();
    v_kecamatan_holderent_lama_id = $('#inp-kecamatan-holder-ent-id').val();
    v_kabupaten_kota_holderent_lama_id = $('#inp-kabupaten-holder-ent-id').val();
    v_provinsi_holderent_lama_id = $('#inp-provinsi-holder-ent-id').val();
    v_subzip_holderent_lama = $('#inp-subkode-holder-ent').val();
    v_esthno_holderent_lama = $('#inp-estno-holder-ent').val();
    v_esthdate_holderent_lama = $('#inp-estdate-holder-ent').val();
    v_npwp_holderent_lama = $('#inp-npwp-holder-ent').val();
    v_notelp_holderent_lama = $('#inp-telepon-holder-ent').val();
    v_nohp_holderent_lama = $('#inp-hanphone-holder-ent').val();
    v_nofax_holderent_lama = $('#inp-fax-holder-ent').val();
    v_email_holderent_lama = $('#inp-email-holder-ent').val();
    v_share_holderent_lama = $('#inp-share-holder-ent').val();
    ///////pic
    v_tgl_id_pic_lama = $('#inp-tgl-id-pic').val();
    v_exp_id_date_pic_lama = $('#inp-exp-id-date-pic').val();
    v_nama_awal_pic_lama = $('#inp-nama-awal-pic').val();
    //v_nama_akhir_pic_lama = $('#inp-nama-akhir-pic').val();
    v_alias_pic_lama = $('#inp-alias-pic').val();
    v_gelar_pic_lama = $('#inp-gelar-pic').val();
    v_jenis_kelamin_pic_lama = $('#slc-jenis-kelamin-pic').val();
    v_agama_pic_lama = $('#slc-agama-pic').val();
    v_pernikahan_pic_lama = $('#slc-status-pernikahan-pic').val();
    v_rtrw_pic_lama = $('#inp-rtrw-pic').val();
    //v_rw_pic_lama = $('#inp-rw-pic').val();
    v_zipcode_pic_lama = $('#inp-kode-pos-alamat-pic').val();
    v_alamat_pic_lama = $('#inp-alamat-pic').val();
    v_kelurahan_pic_lama = $('#inp-kelurahan-alamat-pic').val();
    v_kecamatan_pic_lama = $('#inp-kecamatan-alamat-pic').val();
    v_kabupaten_kota_pic_lama = $('#inp-kabupaten-alamat-pic').val();
    v_provinsi_pic_lama = $('#inp-provinsi-alamat-pic').val();
    v_kelurahan_pic_lama_id = $('#inp-kelurahan-alamat-pic-id').val();
    v_kecamatan_pic_lama_id = $('#inp-kecamatan-alamat-pic-id').val();
    v_kabupaten_kota_pic_lama_id = $('#inp-kabupaten-alamat-pic-id').val();
    v_provinsi_pic_lama_id = $('#inp-provinsi-pic-id').val();
    v_npwp_pic_lama = $('#inp-npwp-pic').val();
    v_notelp_pic_lama = $('#inp-telepon-pic').val();
    v_nohp_pic_lama = $('#inp-hanphone-pic').val();
    v_nofax_pic_lama = $('#inp-fax-pic').val();
    v_email_pic_lama = $('#inp-email-pic').val();
    v_share_pic_lama = $('#inp-share-pic').val();
    v_jabatan_pic_lama = $('#inp-jabatan-pic').val();
    /////
    ///personal
    v_idtype_per_lama = $('#id-type-per').val();
    v_alias_per_lama = $('#inp-alias-per').val();
    v_agama_per_lama = $('#slc-agama-per').val();
    ///spouse
    v_iddate_sps_lama = $('#inp-tgl-id-spouse').val();
    v_idexpdate_sps_lama = $('#inp-exp-id-date-spouse').val();
    v_alias_sps_lama = $('#inp-alias-spouse').val();
    v_gelar_sps_lama = $('#inp-gelar-spouse').val();
    v_notlp_sps_lama = $('#inp-no-telp-spouse').val();
    v_nohp_sps_lama = $('#inp-no-hp-spouse').val();
    v_agama_sps_lama = $('#slc-agama-spouse').val();
    v_alamat_sps_lama = $('#inp-alamat-spouse').val();
    v_rtrw_sps_lama = $('#inp-rtrw-spouse').val();
    v_rw_sps_lama = $('#inp-rw-spouse').val();
    v_kodepos_sps_lama = $('#inp-kode-pos-alamat-spouse').val();
    v_kelurahan_sps_lama = $('#inp-kelurahan-alamat-spouse-id').val();
    v_kecamatan_sps_lama = $('#inp-kecamatan-alamat-spouse-id').val();
    v_kabupaten_sps_lama = $('#inp-kabupaten-alamat-spouse-id').val();
    v_provinsi_sps_lama = $('#inp-provinsi-spouse-id').val();
    ////familycard
    v_nokk_kk_lama = $('#inp-no-kk').val();
    v_tanggungan_kk_lama = $('#inp-jml-tanggung-kk').val();
    v_pendidikan_kk_lama = $('#inp-education-kk').val();
    v_nation_kk_lama = $('#inp-nationality-kk').val();
    v_sps_pendidikan_kk_lama = $('#inp-education-spouse-kk').val();
    ///current
    v_notlp_curr_lama = $('#inp-telepon-resident').val();
    v_nohp_curr_lama = $('#inp-hanphone-resident').val();
    v_nofax_curr_lama = $('#inp-fax-resident').val();
    v_email_curr_lama = $('#inp-email-resident').val();
    ///occp
    v_comtype_occp_lama = $('#slc-jenis-perusahaan-occp').val();
    v_comfclt_occp_lama = $('#slc-fasilitas-perusahaan-occp').val();
    v_othbus_occp_lama = $('#inp-bisnis-lain-occp').val();
    v_head_occp_lama = $('#inp-atasan-langsung-occp').val();
    v_alamat_occp_lama = $('#inp-alamat-occp').val();
    v_rtrw_occp_lama = $('#inp-rtrw-alamat-occp').val();
    //v_rw_occp_lama = $('#inp-rw-alamat-occp').val();
    v_kodepos_occp_lama = $('#inp-kode-pos-occp').val();
    v_kelurahan_occp_lama = $('#inp-kelurahan-id-occp').val();
    v_kecamatan_occp_lama = $('#inp-kecamatan-id-occp').val();
    v_kabupaten_occp_lama = $('#inp-kabupaten-id-occp').val();
    v_provinsi_occp_lama = $('#inp-provinsi-id-occp').val();
    v_notlp_occp_lama = $('#inp-telepon-occp').val();
    v_nofax_occp_lama = $('#inp-fax-occp').val();
    v_email_occp_lama = $('#inp-email-occp').val();
    ///other
    v_npwp_other_lama = $('#inp-npwp-other').val();
    v_resino_other_lama = $('#inp-no-resi-other').val();
    v_residate_other_lama = $('#inp-tgl-resi-other').val();
    v_alias_other_lama = $('#inp-alias-other').val();
    v_gelar_other_lama = $('#inp-gelar-other').val();
    v_alamat_other_lama = $('#inp-alamat-other').val();
    v_rtrw_other_lama = $('#inp-rtrw-other').val();
    v_rw_other_lama = $('#inp-rw-other').val();
    v_kodepos_other_lama = $('#inp-kode-pos-other').val();
    v_kelurahan_other_lama = $('#inp-kelurahan-alamat-other-id').val();
    v_kecamatan_other_lama = $('#inp-kecamatan-alamat-other-id').val();
    v_kabupaten_other_lama = $('#inp-kabupaten-alamat-other-id').val();
    v_provinsi_other_lama = $('#inp-provinsi-other-id').val();
    v_relationship_other_lama = $('#slc-status-hubungan-other').val();

    //////company2
    v_subzip = $('#inp-subkode-pos-alamat-perusahaan2').val();
    v_notlp = $('#inp-telp-alamat-perusahaan2').val();
    v_nofax = $('#inp-fax-alamat-perusahaan2').val();
    v_email = $('#inp-email-perusahaan2').val().toUpperCase();
    v_no_akte = $('#inp-no-akte-perusahaan2').val();
    v_tgl_pendirian = $('#inp-tgl-pendirian-perusahaan2').val().toUpperCase();
    v_tgl_resino = $('#inp-no-resi-perusahaan2').val();
    v_tgl_residate = $('#inp-tgl-resi-perusahaan2').val();
    v_no_siup = $('#inp-no-siup-perusahaan2').val();
    v_tgl_siup = $('#inp-tgl-siup-perusahaan2').val().toUpperCase();
    v_no_tdp = $('#inp-no-tdp-perusahaan2').val();
    v_tgl_tdp = $('#inp-tgl-tdp-perusahaan2').val().toUpperCase();
    v_sektor_ekonomi = $('#inp-sektor-ekonomi-id-perusahaan2').val();
    v_lapangan_usaha = $('#inp-lapangan-usaha-id-perusahaan2').val();
    v_total_pegawai = $('#inp-total-pegawai2').val();
    v_public_perusahaan = $('#slc-public-perusahaan2 :selected').val();
    v_status_lokasi = $('#slc-status-lokasi2 :selected').val();
    v_modal_dasar = $('#inp-modal-dasar-perusahaan2').val();
    v_paid_up = $('#slc-paid-up-perusahaan2').val();
    v_tgl_akta = $('#inp-tgl-akta-perusahaan2').val().toUpperCase();
    //////guarantor2
    v_tipe_id_penjamin = $('#slc-jenis-identitas-penjamin2 :selected').val();
    v_no_id_penjamin = $('#inp-no-identitas-penjamin2').val();
    v_id_date_penjamin = $('#inp-issued-date-penjamin2').val().toUpperCase();
    v_exp_date_penjamin = $('#inp-expired-date-penjamin2').val().toUpperCase();
    v_fnama_penjamin = $('#inp-fname-penjamin2').val().toUpperCase();
    v_lnama_penjamin = $('#inp-lname-penjamin2').val().toUpperCase();
    v_alias_penjamin = $('#inp-alias-penjamin2').val().toUpperCase();
    v_gelar_penjamin = $('#inp-gelar-penjamin2').val();
    v_tempat_lahir_penjamin = $('#inp-tempat-lahir-penjamin2').val().toUpperCase();
    v_tgl_lahir_penjamin = $('#inp-tanggal-lahir-penjamin2').val().toUpperCase();
    v_jenis_kelamin_penjamin = $('#slc-jenis-kelamin-penjamin2').val().toUpperCase();
    v_agama_penjamin = $('#slc-agama-penjamin2').val();
    v_pekerjaan_penjamin = $('#slc-pekerjaan-penjamin2').val();
    v_pernikahan_penjamin = $('#slc-status-pernikahan-penjamin2').val();
    v_rtrw_penjamin = $('#inp-rtrw-penjamin2').val();
    v_rw_penjamin = $('#inp-rw-penjamin2').val();
    v_zipcode_penjamin = $('#inp-kode-pos-alamat-penjamin2').val().toUpperCase();
    v_alamat_penjamin = $('#inp-alamat-penjamin2').val();
    v_kelurahan_penjamin = $('#inp-kelurahan-alamat-penjamin-id2').val();
    v_kecamatan_penjamin = $('#inp-kecamatan-alamat-penjamin-id2').val();
    v_kabupaten_kota_penjamin = $('#inp-kabupaten-alamat-penjamin-id2').val();
    v_provinsi_penjamin = $('#inp-provinsi-penjamin-id2').val();
    v_email_penjamin = $('#inp-email-penjamin2').val().toUpperCase();
    v_nohp_penjamin = $('#inp-hanphone-penjamin2').val();
    v_notlp_penjamin = $('#inp-telepon-penjamin2').val();
    v_hubungan_penjamin = $('#status-hubungan-penjamin2').val();
    //////guarantorr2
    v_tipe_id_penjaminn = $('#slc-jenis-identitas-penjaminn2 :selected').val();
    v_no_id_penjaminn = $('#inp-no-identitas-penjaminn2').val();
    v_id_date_penjaminn = $('#inp-issued-date-penjaminn2').val().toUpperCase();
    v_exp_date_penjaminn = $('#inp-expired-date-penjaminn2').val().toUpperCase();
    v_fnama_penjaminn = $('#inp-fname-penjaminn2').val().toUpperCase();
    v_lnama_penjaminn = $('#inp-lname-penjaminn2').val().toUpperCase();
    v_alias_penjaminn = $('#inp-alias-penjaminn2').val().toUpperCase();
    v_gelar_penjaminn = $('#inp-gelar-penjaminn2').val();
    v_tempat_lahir_penjaminn = $('#inp-tempat-lahir-penjaminn2').val().toUpperCase();
    v_tgl_lahir_penjaminn = $('#inp-tanggal-lahir-penjaminn2').val().toUpperCase();
    v_jenis_kelamin_penjaminn = $('#slc-jenis-kelamin-penjaminn2').val().toUpperCase();
    v_agama_penjaminn = $('#slc-agama-penjaminn2').val();
    v_pekerjaan_penjaminn = $('#slc-pekerjaan-penjaminn2').val();
    v_pernikahan_penjaminn = $('#slc-status-pernikahan-penjaminn2').val();
    v_rtrw_penjaminn = $('#inp-rtrw-penjaminn2').val();
    v_rw_penjaminn = $('#inp-rw-penjaminn2').val();
    v_zipcode_penjaminn = $('#inp-kode-pos-alamat-penjaminn2').val();
    v_alamat_penjaminn = $('#inp-alamat-penjaminn2').val().toUpperCase();
    v_kelurahan_penjaminn = $('#inp-kelurahan-alamat-penjaminn-id2').val();
    v_kecamatan_penjaminn = $('#inp-kecamatan-alamat-penjaminn-id2').val();
    v_kabupaten_kota_penjaminn = $('#inp-kabupaten-alamat-penjaminn-id2').val();
    v_provinsi_penjaminn = $('#inp-provinsi-penjaminn-id2').val();
    v_email_penjaminn = $('#inp-email-penjaminn2').val().toUpperCase();
    v_nohp_penjaminn = $('#inp-hanphone-penjaminn2').val();
    v_notlp_penjaminn = $('#inp-telepon-penjaminn2').val();
    v_hubungan_penjaminn = $('#status-hubungan-penjaminn2').val();
    //////holder per2
    v_tgl_id_holderper = $('#inp-tgl-id-holder-pri2').val();
    v_alias_holderper = $('#inp-alias-holder-pri2').val().toUpperCase();
    v_gelar_holderper = $('#inp-gelar-holder-pri2').val();
    v_jenis_kelamin_holderper = $('#slc-jenis-kelamin-holder-pri2').val().toUpperCase();
    v_agama_holderper = $('#slc-agama-holder-pri2').val();
    v_pernikahan_holderper = $('#slc-status-pernikahan-holder-pri2').val();
    v_rtrw_holderper = $('#inp-rtrw-holder-pri2').val();
    v_rw_holderper = $('#inp-rw-holder-pri2').val();
    v_zipcode_holderper = $('#inp-kodepos-holder-pri2').val();
    v_alamat_holderper = $('#inp-alamat-holder-pri2').val().toUpperCase();
    v_kelurahan_holderper = $('#inp-kelurahan-alamat-holder-pri2').val();
    v_kecamatan_holderper = $('#inp-kecamatan-alamat-holder-pri2').val();
    v_kabupaten_kota_holderper = $('#inp-kabupaten-alamat-holder-pri2').val();
    v_provinsi_holderper = $('#inp-provinsi-alamat-holder-pri2').val();
    v_kelurahan_holderper_id = $('#inp-kelurahan-alamat-holder-pri-id2').val();
    v_kecamatan_holderper_id = $('#inp-kecamatan-alamat-holder-pri-id2').val();
    v_kabupaten_kota_holderper_id = $('#inp-kabupaten-alamat-holder-pri-id2').val();
    v_provinsi_holderper_id = $('#inp-provinsi-holder-pri-id2').val();
    v_npwp_holderper = $('#inp-npwp-holder-pri2').val();
    v_notelp_holderper = $('#inp-telepon-holder-pri2').val();
    v_nohp_holderper = $('#inp-hanphone-holder-pri2').val();
    v_nofax_holderper = $('#inp-fax-holder-pri2').val();
    v_email_holderper = $('#inp-email-holder-pri2').val().toUpperCase();
    v_share_holderper = $('#inp-share-holder-pri2').val();
    v_jabatan_holderper = $('#inp-jabatan-holder-pri2').val();
    ///////holder ent2
    v_comtype_holderent = $('#id-comtype-holder-ent2').val();
    v_comname_holderent = $('#inp-comname-holder-ent2').val().toUpperCase();
    v_bentuk_holderent = $('#inp-bentuk-holder-ent2').val();
    v_rtrw_holderent = $('#inp-rtrw-holder-ent2').val();
    v_rw_holderent = $('#inp-rw-holder-ent2').val();
    v_zipcode_holderent = $('#inp-kodepos-holder-ent2').val();
    v_alamat_holderent = $('#inp-alamat-holder-ent2').val().toUpperCase();
    v_kelurahan_holderent = $('#inp-kelurahan-holder-ent2').val();
    v_kecamatan_holderent = $('#inp-kecamatan-holder-ent2').val();
    v_kabupaten_kota_holderent = $('#inp-kabupaten-holder-ent2').val();
    v_provinsi_holderent = $('#inp-provinsi-holder-ent2').val();
    v_kelurahan_holderent_id = $('#inp-kelurahan-holder-ent-id2').val();
    v_kecamatan_holderent_id = $('#inp-kecamatan-holder-ent-id2').val();
    v_kabupaten_kota_holderent_id = $('#inp-kabupaten-holder-ent-id2').val();
    v_provinsi_holderent_id = $('#inp-provinsi-holder-ent-id2').val();
    v_subzip_holderent = $('#inp-subkode-holder-ent2').val();
    v_esthno_holderent = $('#inp-estno-holder-ent2').val();
    v_esthdate_holderent = $('#inp-estdate-holder-ent2').val().toUpperCase();
    v_npwp_holderent = $('#inp-npwp-holder-ent2').val();
    v_notelp_holderent = $('#inp-telepon-holder-ent2').val();
    v_nohp_holderent = $('#inp-hanphone-holder-ent2').val();
    v_nofax_holderent = $('#inp-fax-holder-ent2').val();
    v_email_holderent = $('#inp-email-holder-ent2').val().toUpperCase();
    v_share_holderent = $('#inp-share-holder-ent2').val();
    ///////pic2
    v_tgl_id_pic = $('#inp-tgl-id-pic2').val().toUpperCase();
    v_exp_id_date_pic = $('#inp-exp-id-date-pic2').val().toUpperCase();
    v_nama_awal_pic = $('#inp-nama-awal-pic2').val().toUpperCase();
    v_nama_akhir_pic = $('#inp-nama-akhir-pic2').val().toUpperCase();
    v_alias_pic = $('#inp-alias-pic2').val().toUpperCase();
    v_gelar_pic = $('#inp-gelar-pic2').val();
    v_jenis_kelamin_pic = $('#slc-jenis-kelamin-pic2').val().toUpperCase();
    v_agama_pic = $('#slc-agama-pic2').val();
    v_pernikahan_pic = $('#slc-status-pernikahan-pic2').val();
    v_rtrw_pic = $('#inp-rtrw-pic2').val();
    v_rw_pic = $('#inp-rw-pic2').val();
    v_zipcode_pic = $('#inp-kode-pos-alamat-pic2').val();
    v_alamat_pic = $('#inp-alamat-pic2').val().toUpperCase();
    v_kelurahan_pic = $('#inp-kelurahan-alamat-pic2').val();
    v_kecamatan_pic = $('#inp-kecamatan-alamat-pic2').val();
    v_kabupaten_kota_pic = $('#inp-kabupaten-alamat-pic2').val();
    v_provinsi_pic = $('#inp-provinsi-alamat-pic2').val();
    v_kelurahan_pic_id = $('#inp-kelurahan-alamat-pic-id2').val();
    v_kecamatan_pic_id = $('#inp-kecamatan-alamat-pic-id2').val();
    v_kabupaten_kota_pic_id = $('#inp-kabupaten-alamat-pic-id2').val();
    v_provinsi_pic_id = $('#inp-provinsi-pic-id2').val();
    v_npwp_pic = $('#inp-npwp-pic2').val();
    v_notelp_pic = $('#inp-telepon-pic2').val();
    v_nohp_pic = $('#inp-hanphone-pic2').val();
    v_nofax_pic = $('#inp-fax-pic2').val();
    v_email_pic = $('#inp-email-pic2').val().toUpperCase();
    v_share_pic = $('#inp-share-pic2').val();
    v_jabatan_pic = $('#inp-jabatan-pic2').val();
    ///personal2
    v_idtype_per = $('#id-type-per2').val();
    v_alias_per = $('#inp-alias-per2').val().toUpperCase()
    v_agama_per = $('#slc-agama-per2').val();
    ///spouse2
    v_iddate_sps = $('#inp-tgl-id-spouse2').val().toUpperCase();
    v_idexpdate_sps = $('#inp-exp-id-date-spouse2').val().toUpperCase();
    v_alias_sps = $('#inp-alias-spouse2').val().toUpperCase();
    v_gelar_sps = $('#inp-gelar-spouse2').val();
    v_notlp_sps = $('#inp-no-telp-spouse2').val();
    v_nohp_sps = $('#inp-no-hp-spouse2').val();
    v_agama_sps = $('#slc-agama-spouse2').val();
    v_alamat_sps = $('#inp-alamat-spouse2').val().toUpperCase();
    v_rtrw_sps = $('#inp-rtrw-spouse2').val();
    v_rw_sps = $('#inp-rw-spouse2').val();
    v_kodepos_sps = $('#inp-kode-pos-alamat-spouse2').val();
    v_kelurahan_sps = $('#inp-kelurahan-alamat-spouse-id2').val();
    v_kecamatan_sps = $('#inp-kecamatan-alamat-spouse-id2').val();
    v_kabupaten_sps = $('#inp-kabupaten-alamat-spouse-id2').val();
    v_provinsi_sps = $('#inp-provinsi-spouse-id2').val();
    ////familycard2
    v_nokk_kk = $('#inp-no-kk2').val();
    v_tanggungan_kk = $('#inp-jml-tanggung-kk2').val();
    v_pendidikan_kk = $('#inp-education-kk2').val();
    v_nation_kk = $('#inp-nationality-kk2').val().toUpperCase();
    v_sps_pendidikan_kk = $('#inp-education-spouse-kk2').val();
    ///current2
    v_notlp_curr = $('#inp-telepon-resident2').val();
    v_nohp_curr = $('#inp-hanphone-resident2').val();
    v_nofax_curr = $('#inp-fax-resident2').val();
    v_email_curr = $('#inp-email-resident2').val().toUpperCase();
    ///occp2
    v_comtype_occp = $('#slc-jenis-perusahaan-occp2').val();
    v_comfclt_occp = $('#slc-fasilitas-perusahaan-occp2').val();
    v_othbus_occp = $('#inp-bisnis-lain-occp2').val().toUpperCase();
    v_head_occp = $('#inp-atasan-langsung-occp2').val().toUpperCase();
    v_alamat_occp = $('#inp-alamat-occp2').val().toUpperCase();
    v_rtrw_occp = $('#inp-rtrw-alamat-occp2').val();
    v_rw_occp = $('#inp-rw-alamat-occp2').val();
    v_kodepos_occp = $('#inp-kode-pos-occp2').val();
    v_kelurahan_occp = $('#inp-kelurahan-id-occp2').val();
    v_kecamatan_occp = $('#inp-kecamatan-id-occp2').val();
    v_kabupaten_occp = $('#inp-kabupaten-id-occp2').val();
    v_provinsi_occp = $('#inp-provinsi-id-occp2').val();
    v_notlp_occp = $('#inp-telepon-occp2').val();
    v_nofax_occp = $('#inp-fax-occp2').val();
    v_email_occp = $('#inp-email-occp2').val().toUpperCase();
    ///other2
    v_npwp_other = $('#inp-npwp-other2').val();
    v_resino_other = $('#inp-no-resi-other2').val();
    v_residate_other = $('#inp-tgl-resi-other2').val();
    v_alias_other = $('#inp-alias-other2').val().toUpperCase();
    v_gelar_other = $('#inp-gelar-other2').val();
    v_alamat_other = $('#inp-alamat-other2').val().toUpperCase();
    v_rtrw_other = $('#inp-rtrw-other2').val();
    v_rw_other = $('#inp-rw-other2').val();
    v_kodepos_other = $('#inp-kode-pos-other2').val();
    v_kelurahan_other = $('#inp-kelurahan-alamat-other-id2').val();
    v_kecamatan_other = $('#inp-kecamatan-alamat-other-id2').val();
    v_kabupaten_other = $('#inp-kabupaten-alamat-other-id2').val();
    v_provinsi_other = $('#inp-provinsi-other-id2').val();
    v_relationship_other = $('#slc-status-hubungan-other2').val();

    //////alasan company
    v_alasan_subzip = $('#slc-alasan-subkode-com').val();
    v_alasan_notlp = $('#slc-alasan-no-telp-com').val();
    v_alasan_nofax = $('#slc-alasan-no-fax-com').val();
    v_alasan_email = $('#slc-alasan-email-com').val();
    v_alasan_no_akte = $('#slc-alasan-no-akte-com').val();
    v_alasan_tgl_pendirian = $('#slc-alasan-tgl-pendirian-com').val();
    v_alasan_tgl_resino = $('#slc-alasan-no-resi-com').val();
    v_alasan_tgl_residate = $('#slc-alasan-tgl-resi-com').val();
    v_alasan_no_siup = $('#slc-alasan-no-siup-com').val();
    v_alasan_tgl_siup = $('#slc-alasan-tgl-siup-com').val();
    v_alasan_no_tdp = $('#slc-alasan-no-tdp-com').val();
    v_alasan_tgl_tdp = $('#slc-alasan-tgl-tdp-com').val();
    v_alasan_sektor_ekonomi = $('#slc-alasan-sektor-com').val();
    v_alasan_lapangan_usaha = $('#slc-alasan-lapangan-com').val();
    v_alasan_total_pegawai = $('#slc-alasan-ttl-pgw-com').val();
    v_alasan_public_perusahaan = $('#slc-alasan-public-com').val();
    v_alasan_status_lokasi = $('#slc-alasan-stat-lok-com').val();
    v_alasan_modal_dasar = $('#slc-alasan-modal-dasar-com').val();
    v_alasan_paid_up = $('#inp-alasan-paid-up-com').val();
    v_alasan_tgl_akta = $('#slc-alasan-tgl-akta-com').val();
    //////alasan guarantor
    v_alasan_tipe_id_penjamin = $('#slc-alasan-jns-id-penjamin').val();
    v_alasan_no_id_penjamin = $('#slc-alasan-no-id-penjamin').val();
    v_alasan_id_date_penjamin = $('#slc-alasan-tgl-id-penjamin').val();
    v_alasan_exp_date_penjamin = $('#slc-alasan-exp-id-penjamin').val();
    v_alasan_fnama_penjamin = $('#slc-alasan-fname-penjamin').val();
    v_alasan_lnama_penjamin = $('#slc-alasan-lname-penjamin').val();
    v_alasan_alias_penjamin = $('#slc-alasan-alias-penjamin').val();
    v_alasan_gelar_penjamin = $('#slc-alasan-gelar-penjamin').val();
    v_alasan_tempat_lahir_penjamin = $('#slc-alasan-tmpt-lhr-penjamin').val();
    v_alasan_tgl_lahir_penjamin = $('#slc-alasan-tgl-lhr-penjamin').val();
    v_alasan_jenis_kelamin_penjamin = $('#slc-alasan-jns-klmn-penjamin').val();
    v_alasan_agama_penjamin = $('#slc-alasan-agama-penjamin').val();
    v_alasan_pekerjaan_penjamin = $('#slc-alasan-pekerjaan-penjamin').val();
    v_alasan_pernikahan_penjamin = $('#slc-alasan-pernikahan-penjamin').val();
    v_alasan_rtrw_penjamin = $('#slc-alasan-rtrw-penjamin').val();
    v_alasan_zipcode_penjamin = $('#slc-alasan-kodepos-penjamin').val();
    v_alasan_alamat_penjamin = $('#slc-alasan-alamat-penjamin').val();
    v_alasan_kelurahan_penjamin = $('#slc-alasan-kelurahan-penjamin').val();
    v_alasan_kecamatan_penjamin = $('#slc-alasan-kecamatan-penjamin').val();
    v_alasan_kabupaten_kota_penjamin = $('#slc-alasan-kabupaten-penjamin').val();
    v_alasan_provinsi_penjamin = $('#slc-alasan-provinsi-penjamin').val();
    v_alasan_email_penjamin = $('#slc-alasan-email-penjamin').val();
    v_alasan_nohp_penjamin = $('#slc-alasan-no-hp-penjamin').val();
    v_alasan_notlp_penjamin = $('#slc-alasan-no-tlp-penjamin').val();
    v_alasan_hubungan_penjamin = $('#slc-alasan-stat-hub-penjamin').val();
    //////alasan guarantorr
    v_alasan_tipe_id_penjaminn = $('#slc-alasan-jns-id-penjaminn').val();
    v_alasan_no_id_penjaminn = $('#slc-alasan-no-id-penjaminn').val();
    v_alasan_id_date_penjaminn = $('#slc-alasan-tgl-id-penjaminn').val();
    v_alasan_exp_date_penjaminn = $('#slc-alasan-exp-id-penjaminn').val();
    v_alasan_fnama_penjaminn = $('#slc-alasan-fname-penjaminn').val();
    v_alasan_lnama_penjaminn = $('#slc-alasan-lname-penjaminn').val();
    v_alasan_alias_penjaminn = $('#slc-alasan-alias-penjaminn').val();
    v_alasan_gelar_penjaminn = $('#slc-alasan-gelar-penjaminn').val();
    v_alasan_tempat_lahir_penjaminn = $('#slc-alasan-tmpt-lhr-penjaminn').val();
    v_alasan_tgl_lahir_penjaminn = $('#slc-alasan-tgl-lhr-penjaminn').val();
    v_alasan_jenis_kelamin_penjaminn = $('#slc-alasan-jns-klmn-penjaminn').val();
    v_alasan_agama_penjaminn = $('#slc-alasan-agama-penjaminn').val();
    v_alasan_pekerjaan_penjaminn = $('#slc-alasan-pekerjaan-penjaminn').val();
    v_alasan_pernikahan_penjaminn = $('#slc-alasan-pernikahan-penjaminn').val();
    v_alasan_rtrw_penjaminn = $('#slc-alasan-rtrw-penjaminn').val();
    v_alasan_zipcode_penjaminn = $('#slc-alasan-kodepos-penjaminn').val();
    v_alasan_alamat_penjaminn = $('#slc-alasan-alamat-penjaminn').val();
    v_alasan_kelurahan_penjaminn = $('#slc-alasan-kelurahan-penjaminn').val();
    v_alasan_kecamatan_penjaminn = $('#slc-alasan-kecamatan-penjaminn').val();
    v_alasan_kabupaten_kota_penjaminn = $('#slc-alasan-kabupaten-penjaminn').val();
    v_alasan_provinsi_penjaminn = $('#slc-alasan-provinsi-penjaminn').val();
    v_alasan_email_penjaminn = $('#slc-alasan-email-penjaminn').val();
    v_alasan_nohp_penjaminn = $('#slc-alasan-no-hp-penjaminn').val();
    v_alasan_notlp_penjaminn = $('#slc-alasan-no-tlp-penjaminn').val();
    v_alasan_hubungan_penjaminn = $('#slc-alasan-stat-hub-penjaminn').val();
    //////alasan holder per
    v_alasan_tgl_id_holderper = $('#slc-alasan-tgl-id-holder-pri').val();
    v_alasan_alias_holderper = $('#slc-alasan-alias-holder-pri').val();
    v_alasan_gelar_holderper = $('#slc-alasan-gelar-holder-pri').val();
    v_alasan_jenis_kelamin_holderper = $('#slc-alasan-jns-klmn-holder-pri').val();
    v_alasan_agama_holderper = $('#slc-alasan-agama-holder-pri').val();
    v_alasan_pernikahan_holderper = $('#slc-alasan-pernikahan-holder-pri').val();
    v_alasan_rtrw_holderper = $('#slc-alasan-rtrw-holder-pri').val();
    v_alasan_zipcode_holderper = $('#slc-alasan-kodepos-holder-pri').val();
    v_alasan_alamat_holderper = $('#slc-alasan-alamat-holder-pri').val();
    v_alasan_kelurahan_holderper = $('#slc-alasan-kelurahan-holder-pri').val();
    v_alasan_kecamatan_holderper = $('#slc-alasan-kecamatan-holder-pri').val();
    v_alasan_kabupaten_kota_holderper = $('#slc-alasan-kabupaten-holder-pri').val();
    v_alasan_provinsi_holderper = $('#slc-alasan-provinsi-holder-pri').val();
    v_alasan_npwp_holderper = $('#slc-alasan-npwp-holder-pri').val();
    v_alasan_notelp_holderper = $('#slc-alasan-no-tlp-holder-pri').val();
    v_alasan_nohp_holderper = $('#slc-alasan-no-hp-holder-pri').val();
    v_alasan_nofax_holderper = $('#slc-alasan-no-fax-holder-pri').val();
    v_alasan_email_holderper = $('#slc-alasan-email-holder-pri').val();
    v_alasan_share_holderper = $('#slc-alasan-share-holder-pri').val();
    v_alasan_jabatan_holderper = $('#slc-alasan-jabatan-holder-pri').val();
    ///////alasan holder ent
    v_alasan_comtype_holderent = $('#slc-alasan-id-comtype-holder-ent').val();
    v_alasan_comname_holderent = $('#slc-alasan-comname-holder-ent').val();
    v_alasan_bentuk_holderent = $('#slc-alasan-tgl-bentuk-holder-ent').val();
    v_alasan_rtrw_holderent = $('#slc-alasan-rtrw-holder-ent').val();
    v_alasan_zipcode_holderent = $('#slc-alasan-kodepos-holder-ent').val();
    v_alasan_alamat_holderent = $('#slc-alasan-alamat-holder-ent').val();
    v_alasan_kelurahan_holderent = $('#slc-alasan-kelurahan-holder-ent').val();
    v_alasan_kecamatan_holderent = $('#slc-alasan-kecamatan-holder-ent').val();
    v_alasan_kabupaten_kota_holderent = $('#slc-alasan-kabupaten-holder-ent').val();
    v_alasan_provinsi_holderent = $('#slc-alasan-provinsi-holder-ent').val();
    v_alasan_subzip_holderent = $('#slc-alasan-subkode-holder-ent').val();
    v_alasan_esthno_holderent = $('#slc-alasan-estno-holder-ent').val();
    v_alasan_esthdate_holderent = $('#slc-alasan-estdate-holder-ent').val();
    v_alasan_npwp_holderent = $('#slc-alasan-npwp-holder-ent').val();
    v_alasan_notelp_holderent = $('#slc-alasan-no-tlp-holder-ent').val();
    v_alasan_nofax_holderent = $('#slc-alasan-no-fax-holder-ent').val();
    v_alasan_email_holderent = $('#slc-alasan-email-holder-ent').val();
    v_alasan_share_holderent = $('#slc-alasan-share-holder-ent').val();
    ///////alasan pic
    v_alasan_tgl_id_pic = $('#slc-alasan-tgl-id-pic').val();
    v_alasan_exp_id_date_pic = $('#slc-alasan-exp-id-date-pic').val();
    v_alasan_nama_awal_pic = $('#slc-alasan-nama-awal-pic').val();
    //v_alasan_nama_akhir_pic = $('#slc-alasan-nama-akhir-pic').val();
    v_alasan_alias_pic = $('#slc-alasan-alias-pic').val();
    v_alasan_gelar_pic = $('#slc-alasan-gelar-pic').val();
    v_alasan_jenis_kelamin_pic = $('#slc-alasan-jns-klmn-pic').val();
    v_alasan_agama_pic = $('#slc-alasan-agama-pic').val();
    v_alasan_pernikahan_pic = $('#slc-alasan-status-pernikahan-pic').val();
    v_alasan_rtrw_pic = $('#slc-alasan-rtrw-pic').val();
    v_alasan_zipcode_pic = $('#slc-alasan-kodepos-pic').val();
    v_alasan_alamat_pic = $('#slc-alasan-alamat-pic').val();
    v_alasan_kelurahan_pic = $('#slc-alasan-kelurahan-pic').val();
    v_alasan_kecamatan_pic = $('#slc-alasan-kecamatan-pic').val();
    v_alasan_kabupaten_kota_pic = $('#slc-alasan-kabupaten-pic').val();
    v_alasan_provinsi_pic = $('#slc-alasan-provinsi-pic').val();
    v_alasan_npwp_pic = $('#slc-alasan-npwp-pic').val();
    v_alasan_notelp_pic = $('#slc-alasan-no-tlp-pic').val();
    v_alasan_nohp_pic = $('#slc-alasan-no-hp-pic').val();
    v_alasan_nofax_pic = $('#slc-alasan-no-fax-pic').val();
    v_alasan_email_pic = $('#slc-alasan-email-pic').val();
    v_alasan_share_pic = $('#slc-alasan-share-pic').val();
    v_alasan_jabatan_pic = $('#slc-alasan-jabatan-pic').val();
    ///alasan personal
    v_alasan_idtype_per = $('#slc-alasan-id-type-per').val();
    v_alasan_alias_per = $('#slc-alasan-alias-per').val();
    v_alasan_agama_per = $('#slc-alasan-agama-per').val();
    ///alasan spouse
    v_alasan_iddate_sps = $('#slc-alasan-tgl-id-spouse').val();
    v_alasan_idexpdate_sps = $('#slc-alasan-exp-id-date-spouse').val();
    v_alasan_alias_sps = $('#slc-alasan-alias-spouse').val();
    v_alasan_gelar_sps = $('#slc-alasan-gelar-spouse').val();
    v_alasan_notlp_sps = $('#slc-alasan-no-telp-spouse').val();
    v_alasan_nohp_sps = $('#slc-alasan-no-hp-spouse').val();
    v_alasan_agama_sps = $('#slc-alasan-agama-spouse').val();
    v_alasan_alamat_sps = $('#slc-alasan-alamat-spouse').val();
    v_alasan_rtrw_sps = $('#slc-alasan-rtrw-spouse').val();
    v_alasan_kodepos_sps = $('#slc-alasan-kodepos-spouse').val();
    v_alasan_kelurahan_sps = $('#slc-alasan-kelurahan-spouse').val();
    v_alasan_kecamatan_sps = $('#slc-alasan-kecamatan-spouse').val();
    v_alasan_kabupaten_sps = $('#slc-alasan-kabupaten-spouse').val();
    v_alasan_provinsi_sps = $('#slc-alasan-provinsi-spouse').val();
    ////alasan familycard
    v_alasan_nokk_kk = $('#slc-alasan-no-kk').val();
    v_alasan_tanggungan_kk = $('#slc-alasan-jml-tanggung-kk').val();
    v_alasan_pendidikan_kk = $('#slc-alasan-education-kk').val();
    v_alasan_nation_kk = $('#slc-alasan-nationality-kk').val();
    v_alasan_sps_pendidikan_kk = $('#slc-alasan-education-spouse-kk').val();
    ///alasan current
    v_alasan_notlp_curr = $('#slc-alasan-no-tlp-resident').val();
    v_alasan_nohp_curr = $('#slc-alasan-no-hp-resident').val();
    v_alasan_nofax_curr = $('#slc-alasan-no-fax-resident').val();
    v_alasan_email_curr = $('#slc-alasan-email-resident').val();
    ///alasan occp
    v_alasan_comtype_occp = $('#slc-alasan-perusahaan-occp').val();
    v_alasan_comfclt_occp = $('#slc-alasan-fasilitas-perusahaan-occp').val();
    v_alasan_othbus_occp = $('#slc-alasan-bisnis-lain-occp').val();
    v_alasan_head_occp = $('#slc-alasan-atasan-langsung-occp').val();
    v_alasan_alamat_occp = $('#slc-alasan-alamat-occp').val();
    v_alasan_rtrw_occp = $('#slc-alasan-rtrw-occp').val();
    v_alasan_kodepos_occp = $('#slc-alasan-kodepos-occp').val();
    v_alasan_kelurahan_occp = $('#slc-alasan-kelurahan-occp').val();
    v_alasan_kecamatan_occp = $('#slc-alasan-kecamatan-occp').val();
    v_alasan_kabupaten_occp = $('#slc-alasan-kabupaten-occp').val();
    v_alasan_provinsi_occp = $('#slc-alasan-provinsi-occp').val();
    v_alasan_notlp_occp = $('#slc-alasan-no-tlp-occp').val();
    v_alasan_nofax_occp = $('#slc-alasan-no-fax-occp').val();
    v_alasan_email_occp = $('#slc-alasan-email-occp').val();
    ///alasan other
    v_alasan_npwp_other = $('#slc-alasan-npwp-other').val();
    v_alasan_resino_other = $('#slc-alasan-no-resi-other').val();
    v_alasan_residate_other = $('#slc-alasan-tgl-resi-other').val();
    v_alasan_alias_other = $('#slc-alasan-alias-other').val();
    v_alasan_gelar_other = $('#slc-alasan-gelar-other').val();
    v_alasan_alamat_other = $('#slc-alasan-alamat-other').val();
    v_alasan_rtrw_other = $('#slc-alasan-rtrw-other').val();
    v_alasan_kodepos_other = $('#slc-alasan-kodepos-other').val();
    v_alasan_kelurahan_other = $('#slc-alasan-kelurahan-other').val();
    v_alasan_kecamatan_other = $('#slc-alasan-kecamatan-other').val();
    v_alasan_kabupaten_other = $('#slc-alasan-kabupaten-other').val();
    v_alasan_provinsi_other = $('#slc-alasan-provinsi-other').val();
    v_alasan_relationship_other = $('#slc-alasan-status-hubungan-other').val();

    arrayData.push({
     //perusahaanlama
     v_branch,
     v_ref_no,
     v_contract_no,
     v_subzip_lama,
     v_notlp_lama,
     v_nofax_lama,
     v_email_lama,
     v_no_akte_lama,
     v_tgl_pendirian_lama,
     v_tgl_resino_lama,
     v_tgl_residate_lama,
     v_no_siup_lama,
     v_tgl_siup_lama,
     v_no_tdp_lama,
     v_tgl_tdp_lama,
     v_sektor_ekonomi_lama,
     v_lapangan_usaha_lama,
     v_total_pegawai_lama,
     v_public_perusahaan_lama,
     v_status_lokasi_lama,
     v_modal_dasar_lama,
     v_paid_up_lama,
     v_tgl_akta_lama,
     //guarantorlama
     v_tipe_id_penjamin_lama,
     v_no_id_penjamin_lama,
     v_id_date_penjamin_lama,
     v_exp_date_penjamin_lama,
     v_fnama_penjamin_lama,
     v_lnama_penjamin_lama,
     v_alias_penjamin_lama,
     v_gelar_penjamin_lama,
     v_tempat_lahir_penjamin_lama,
     v_tgl_lahir_penjamin_lama,
     v_jenis_kelamin_penjamin_lama,
     v_agama_penjamin_lama,
     v_pekerjaan_penjamin_lama,
     v_pernikahan_penjamin_lama,
     v_rtrw_penjamin_lama,
     //v_rw_penjamin_lama,
     v_zipcode_penjamin_lama,
     v_alamat_penjamin_lama,
     v_kelurahan_penjamin_lama,
     v_kecamatan_penjamin_lama,
     v_kabupaten_kota_penjamin_lama,
     v_provinsi_penjamin_lama,
     v_email_penjamin_lama,
     v_nohp_penjamin_lama,
     v_notlp_penjamin_lama,
     v_hubungan_penjamin_lama,
     v_tipe_id_penjaminn_lama,
     //guarantorrlama
     v_no_id_penjaminn_lama,
     v_id_date_penjaminn_lama,
     v_exp_date_penjaminn_lama,
     v_fnama_penjaminn_lama,
     v_lnama_penjaminn_lama,
     v_alias_penjaminn_lama,
     v_gelar_penjaminn_lama,
     v_tempat_lahir_penjaminn_lama,
     v_tgl_lahir_penjaminn_lama,
     v_jenis_kelamin_penjaminn_lama,
     v_agama_penjaminn_lama,
     v_pekerjaan_penjaminn_lama,
     v_pernikahan_penjaminn_lama,
     v_rtrw_penjaminn_lama,
     //v_rw_penjaminn_lama,
     v_zipcode_penjaminn_lama,
     v_alamat_penjaminn_lama,
     v_kelurahan_penjaminn_lama,
     v_kecamatan_penjaminn_lama,
     v_kabupaten_kota_penjaminn_lama,
     v_provinsi_penjaminn_lama,
     v_email_penjaminn_lama,
     v_nohp_penjaminn_lama,
     v_notlp_penjaminn_lama,
     v_hubungan_penjaminn_lama,
     //holder per lama
     v_tgl_id_holderper_lama,
     v_alias_holderper_lama,
     v_gelar_holderper_lama,
     v_jenis_kelamin_holderper_lama,
     v_agama_holderper_lama,
     v_pernikahan_holderper_lama,
     v_rtrw_holderper_lama,
     v_rw_holderper_lama,
     v_zipcode_holderper_lama,
     v_alamat_holderper_lama,
     v_kelurahan_holderper_lama,
     v_kecamatan_holderper_lama,
     v_kabupaten_kota_holderper_lama,
     v_provinsi_holderper_lama,
     v_kelurahan_holderper_lama_id,
     v_kecamatan_holderper_lama_id,
     v_kabupaten_kota_holderper_lama_id,
     v_provinsi_holderper_lama_id,
     v_npwp_holderper_lama,
     v_notelp_holderper_lama,
     v_nohp_holderper_lama,
     v_nofax_holderper_lama,
     v_email_holderper_lama,
     v_share_holderper_lama,
     v_jabatan_holderper_lama,
     //holder ent lama
     v_comtype_holderent_lama,
     v_comname_holderent_lama,
     v_bentuk_holderent_lama,
     v_rtrw_holderent_lama,
     v_rw_holderent_lama,
     v_zipcode_holderent_lama,
     v_alamat_holderent_lama,
     v_kelurahan_holderent_lama,
     v_kecamatan_holderent_lama,
     v_kabupaten_kota_holderent_lama,
     v_provinsi_holderent_lama,
     v_kelurahan_holderent_lama_id,
     v_kecamatan_holderent_lama_id,
     v_kabupaten_kota_holderent_lama_id,
     v_provinsi_holderent_lama_id,
     v_subzip_holderent_lama,
     v_esthno_holderent_lama,
     v_esthdate_holderent_lama,
     v_npwp_holderent_lama,
     v_notelp_holderent_lama,
     v_nohp_holderent_lama,
     v_nofax_holderent_lama,
     v_email_holderent_lama,
     v_share_holderent_lama,
     //piclama
     v_tgl_id_pic_lama,
     v_exp_id_date_pic_lama,
     v_nama_awal_pic_lama,
     //v_nama_akhir_pic_lama,
     v_alias_pic_lama,
     v_gelar_pic_lama,
     v_jenis_kelamin_pic_lama,
     v_agama_pic_lama,
     v_pernikahan_pic_lama,
     v_rtrw_pic_lama,
     //v_rw_pic_lama,
     v_zipcode_pic_lama,
     v_alamat_pic_lama,
     v_kelurahan_pic_lama,
     v_kecamatan_pic_lama,
     v_kabupaten_kota_pic_lama,
     v_provinsi_pic_lama,
     v_kelurahan_pic_lama_id,
     v_kecamatan_pic_lama_id,
     v_kabupaten_kota_pic_lama_id,
     v_provinsi_pic_lama_id,
     v_npwp_pic_lama,
     v_notelp_pic_lama,
     v_nohp_pic_lama,
     v_nofax_pic_lama,
     v_email_pic_lama,
     v_share_pic_lama,
     v_jabatan_pic_lama,
     ///personallama
     v_idtype_per_lama,
     v_alias_per_lama,
     v_agama_per_lama,
     ///spouselama
     v_iddate_sps_lama,
     v_idexpdate_sps_lama,
     v_alias_sps_lama,
     v_gelar_sps_lama,
     v_notlp_sps_lama,
     v_nohp_sps_lama,
     v_agama_sps_lama,
     v_alamat_sps_lama,
     v_rtrw_sps_lama,
     v_rw_sps_lama,
     v_kodepos_sps_lama,
     v_kelurahan_sps_lama,
     v_kecamatan_sps_lama,
     v_kabupaten_sps_lama,
     v_provinsi_sps_lama,
     ////familycardlama
     v_nokk_kk_lama,
     v_tanggungan_kk_lama,
     v_pendidikan_kk_lama,
     v_nation_kk_lama,
     v_sps_pendidikan_kk_lama,
     ///currentlama
     v_notlp_curr_lama,
     v_nohp_curr_lama,
     v_nofax_curr_lama,
     v_email_curr_lama,
     ///occplama
     v_comtype_occp_lama,
     v_comfclt_occp_lama,
     v_othbus_occp_lama,
     v_head_occp_lama,
     v_alamat_occp_lama,
     v_rtrw_occp_lama,
     //v_rw_occp_lama,
     v_kodepos_occp_lama,
     v_kelurahan_occp_lama,
     v_kecamatan_occp_lama,
     v_kabupaten_occp_lama,
     v_provinsi_occp_lama,
     v_notlp_occp_lama,
     v_nofax_occp_lama,
     v_email_occp_lama,
     ///otherlama
     v_npwp_other_lama,
     v_resino_other_lama,
     v_residate_other_lama,
     v_alias_other_lama,
     v_gelar_other_lama,
     v_alamat_other_lama,
     v_rtrw_other_lama,
     v_rw_other_lama,
     v_kodepos_other_lama,
     v_kelurahan_other_lama,
     v_kecamatan_other_lama,
     v_kabupaten_other_lama,
     v_provinsi_other_lama,
     v_relationship_other_lama,
     //perusahaan
     v_subzip,
     v_notlp,
     v_nofax,
     v_email,
     v_no_akte,
     v_tgl_pendirian,
     v_tgl_resino,
     v_tgl_residate,
     v_no_siup,
     v_tgl_siup,
     v_no_tdp,
     v_tgl_tdp,
     v_sektor_ekonomi,
     v_lapangan_usaha,
     v_total_pegawai,
     v_public_perusahaan,
     v_status_lokasi,
     v_modal_dasar,
     v_paid_up,
     v_tgl_akta,
     //guarantor
     v_tipe_id_penjamin,
     v_no_id_penjamin,
     v_id_date_penjamin,
     v_exp_date_penjamin,
     v_fnama_penjamin,
     v_lnama_penjamin,
     v_alias_penjamin,
     v_gelar_penjamin,
     v_tempat_lahir_penjamin,
     v_tgl_lahir_penjamin,
     v_jenis_kelamin_penjamin,
     v_agama_penjamin,
     v_pekerjaan_penjamin,
     v_pernikahan_penjamin,
     v_rtrw_penjamin,
     v_rw_penjamin,
     v_zipcode_penjamin,
     v_alamat_penjamin,
     v_kelurahan_penjamin,
     v_kecamatan_penjamin,
     v_kabupaten_kota_penjamin,
     v_provinsi_penjamin,
     v_email_penjamin,
     v_nohp_penjamin,
     v_notlp_penjamin,
     v_hubungan_penjamin,
     //guarantorr
     v_tipe_id_penjaminn,
     v_no_id_penjaminn,
     v_id_date_penjaminn,
     v_exp_date_penjaminn,
     v_fnama_penjaminn,
     v_lnama_penjaminn,
     v_alias_penjaminn,
     v_gelar_penjaminn,
     v_tempat_lahir_penjaminn,
     v_tgl_lahir_penjaminn,
     v_jenis_kelamin_penjaminn,
     v_agama_penjaminn,
     v_pekerjaan_penjaminn,
     v_pernikahan_penjaminn,
     v_rtrw_penjaminn,
     v_rw_penjaminn,
     v_zipcode_penjaminn,
     v_alamat_penjaminn,
     v_kelurahan_penjaminn,
     v_kecamatan_penjaminn,
     v_kabupaten_kota_penjaminn,
     v_provinsi_penjaminn,
     v_email_penjaminn,
     v_nohp_penjaminn,
     v_notlp_penjaminn,
     v_hubungan_penjaminn,
     //holder per
     v_tgl_id_holderper,
     v_alias_holderper,
     v_gelar_holderper,
     v_jenis_kelamin_holderper,
     v_agama_holderper,
     v_pernikahan_holderper,
     v_rtrw_holderper,
     v_rw_holderper,
     v_zipcode_holderper,
     v_alamat_holderper,
     v_kelurahan_holderper,
     v_kecamatan_holderper,
     v_kabupaten_kota_holderper,
     v_provinsi_holderper,
     v_kelurahan_holderper_id,
     v_kecamatan_holderper_id,
     v_kabupaten_kota_holderper_id,
     v_provinsi_holderper_id,
     v_npwp_holderper,
     v_notelp_holderper,
     v_nohp_holderper,
     v_nofax_holderper,
     v_email_holderper,
     v_share_holderper,
     v_jabatan_holderper,
     //holder ent
     v_comtype_holderent,
     v_comname_holderent,
     v_bentuk_holderent,
     v_rtrw_holderent,
     v_rw_holderent,
     v_zipcode_holderent,
     v_alamat_holderent,
     v_kelurahan_holderent,
     v_kecamatan_holderent,
     v_kabupaten_kota_holderent,
     v_provinsi_holderent,
     v_kelurahan_holderent_id,
     v_kecamatan_holderent_id,
     v_kabupaten_kota_holderent_id,
     v_provinsi_holderent_id,
     v_subzip_holderent,
     v_esthno_holderent,
     v_esthdate_holderent,
     v_npwp_holderent,
     v_notelp_holderent,
     v_nohp_holderent,
     v_nofax_holderent,
     v_email_holderent,
     v_share_holderent,
     //pic
     v_tgl_id_pic,
     v_exp_id_date_pic,
     v_nama_awal_pic,
     v_nama_akhir_pic,
     v_alias_pic,
     v_gelar_pic,
     v_jenis_kelamin_pic,
     v_agama_pic,
     v_pernikahan_pic,
     v_rtrw_pic,
     v_rw_pic,
     v_zipcode_pic,
     v_alamat_pic,
     v_kelurahan_pic,
     v_kecamatan_pic,
     v_kabupaten_kota_pic,
     v_provinsi_pic,
     v_kelurahan_pic_id,
     v_kecamatan_pic_id,
     v_kabupaten_kota_pic_id,
     v_provinsi_pic_id,
     v_npwp_pic,
     v_notelp_pic,
     v_nohp_pic,
     v_nofax_pic,
     v_email_pic,
     v_share_pic,
     v_jabatan_pic,
     ///personal
     v_idtype_per,
     v_alias_per,
     v_agama_per,
     ///spouse
     v_iddate_sps,
     v_idexpdate_sps,
     v_alias_sps,
     v_gelar_sps,
     v_notlp_sps,
     v_nohp_sps,
     v_agama_sps,
     v_alamat_sps,
     v_rtrw_sps,
     v_rw_sps,
     v_kodepos_sps,
     v_kelurahan_sps,
     v_kecamatan_sps,
     v_kabupaten_sps,
     v_provinsi_sps,
     ////familycard
     v_nokk_kk,
     v_tanggungan_kk,
     v_pendidikan_kk,
     v_nation_kk,
     v_sps_pendidikan_kk,
     ///current
     v_notlp_curr,
     v_nohp_curr,
     v_nofax_curr,
     v_email_curr,
     ///occp
     v_comtype_occp,
     v_comfclt_occp,
     v_othbus_occp,
     v_head_occp,
     v_alamat_occp,
     v_rtrw_occp,
     v_rw_occp,
     v_kodepos_occp,
     v_kelurahan_occp,
     v_kecamatan_occp,
     v_kabupaten_occp,
     v_provinsi_occp,
     v_notlp_occp,
     v_nofax_occp,
     v_email_occp,
     ///other
     v_npwp_other,
     v_resino_other,
     v_residate_other,
     v_alias_other,
     v_gelar_other,
     v_alamat_other,
     v_rtrw_other,
     v_rw_other,
     v_kodepos_other,
     v_kelurahan_other,
     v_kecamatan_other,
     v_kabupaten_other,
     v_provinsi_other,
     v_relationship_other,
     ////ALASAN
     //alasaperusahaan
     v_alasan_subzip,
     v_alasan_notlp,
     v_alasan_nofax,
     v_alasan_email,
     v_alasan_no_akte,
     v_alasan_tgl_pendirian,
     v_alasan_tgl_resino,
     v_alasan_tgl_residate,
     v_alasan_no_siup,
     v_alasan_tgl_siup,
     v_alasan_no_tdp,
     v_alasan_tgl_tdp,
     v_alasan_sektor_ekonomi,
     v_alasan_lapangan_usaha,
     v_alasan_total_pegawai,
     v_alasan_public_perusahaan,
     v_alasan_status_lokasi,
     v_alasan_modal_dasar,
     v_alasan_paid_up,
     v_alasan_tgl_akta,
     //alasan guarantor
     v_alasan_tipe_id_penjamin,
     v_alasan_no_id_penjamin,
     v_alasan_id_date_penjamin,
     v_alasan_exp_date_penjamin,
     v_alasan_fnama_penjamin,
     v_alasan_lnama_penjamin,
     v_alasan_alias_penjamin,
     v_alasan_gelar_penjamin,
     v_alasan_tempat_lahir_penjamin,
     v_alasan_tgl_lahir_penjamin,
     v_alasan_jenis_kelamin_penjamin,
     v_alasan_agama_penjamin,
     v_alasan_pekerjaan_penjamin,
     v_alasan_pernikahan_penjamin,
     v_alasan_rtrw_penjamin,
     v_alasan_zipcode_penjamin,
     v_alasan_alamat_penjamin,
     v_alasan_kelurahan_penjamin,
     v_alasan_kecamatan_penjamin,
     v_alasan_kabupaten_kota_penjamin,
     v_alasan_provinsi_penjamin,
     v_alasan_email_penjamin,
     v_alasan_nohp_penjamin,
     v_alasan_notlp_penjamin,
     v_alasan_hubungan_penjamin,
     //alasan guarantorr
     v_alasan_tipe_id_penjaminn,
     v_alasan_no_id_penjaminn,
     v_alasan_id_date_penjaminn,
     v_alasan_exp_date_penjaminn,
     v_alasan_fnama_penjaminn,
     v_alasan_lnama_penjaminn,
     v_alasan_alias_penjaminn,
     v_alasan_gelar_penjaminn,
     v_alasan_tempat_lahir_penjaminn,
     v_alasan_tgl_lahir_penjaminn,
     v_alasan_jenis_kelamin_penjaminn,
     v_alasan_agama_penjaminn,
     v_alasan_pekerjaan_penjaminn,
     v_alasan_pernikahan_penjaminn,
     v_alasan_rtrw_penjaminn,
     v_alasan_zipcode_penjaminn,
     v_alasan_alamat_penjaminn,
     v_alasan_kelurahan_penjaminn,
     v_alasan_kecamatan_penjaminn,
     v_alasan_kabupaten_kota_penjaminn,
     v_alasan_provinsi_penjaminn,
     v_alasan_email_penjaminn,
     v_alasan_nohp_penjaminn,
     v_alasan_notlp_penjaminn,
     v_alasan_hubungan_penjaminn,
     //alasan shareholder per
     v_alasan_tgl_id_holderper,
     v_alasan_alias_holderper,
     v_alasan_gelar_holderper,
     v_alasan_jenis_kelamin_holderper,
     v_alasan_agama_holderper,
     v_alasan_pernikahan_holderper,
     v_alasan_rtrw_holderper,
     v_alasan_zipcode_holderper,
     v_alasan_alamat_holderper,
     v_alasan_kelurahan_holderper,
     v_alasan_kecamatan_holderper,
     v_alasan_kabupaten_kota_holderper,
     v_alasan_provinsi_holderper,
     v_alasan_npwp_holderper,
     v_alasan_notelp_holderper,
     v_alasan_nohp_holderper,
     v_alasan_nofax_holderper,
     v_alasan_email_holderper,
     v_alasan_share_holderper,
     v_alasan_jabatan_holderper,
     //alasan shareholder ent
     v_alasan_comtype_holderent,
     v_alasan_comname_holderent,
     v_alasan_bentuk_holderent,
     v_alasan_rtrw_holderent,
     v_alasan_zipcode_holderent,
     v_alasan_alamat_holderent,
     v_alasan_kelurahan_holderent,
     v_alasan_kecamatan_holderent,
     v_alasan_kabupaten_kota_holderent,
     v_alasan_provinsi_holderent,
     v_alasan_subzip_holderent,
     v_alasan_esthno_holderent,
     v_alasan_esthdate_holderent,
     v_alasan_npwp_holderent,
     v_alasan_notelp_holderent,
     v_alasan_nofax_holderent,
     v_alasan_email_holderent,
     v_alasan_share_holderent,
     //alasan pic
     v_alasan_tgl_id_pic,
     v_alasan_exp_id_date_pic,
     v_alasan_nama_awal_pic,
     //v_alasan_nama_akhir_pic,
     v_alasan_alias_pic,
     v_alasan_gelar_pic,
     v_alasan_jenis_kelamin_pic,
     v_alasan_agama_pic,
     v_alasan_pernikahan_pic,
     v_alasan_rtrw_pic,
     v_alasan_alamat_pic,
     v_alasan_zipcode_pic,
     v_alasan_kelurahan_pic,
     v_alasan_kecamatan_pic,
     v_alasan_kabupaten_kota_pic,
     v_alasan_provinsi_pic,
     v_alasan_npwp_pic,
     v_alasan_notelp_pic,
     v_alasan_nohp_pic,
     v_alasan_nofax_pic,
     v_alasan_email_pic,
     v_alasan_share_pic,
     v_alasan_jabatan_pic,
     ///alasan personal
     v_alasan_idtype_per,
     v_alasan_alias_per,
     v_alasan_agama_per,
     ///spouse
     v_alasan_iddate_sps,
     v_alasan_idexpdate_sps,
     v_alasan_alias_sps,
     v_alasan_gelar_sps,
     v_alasan_notlp_sps,
     v_alasan_nohp_sps,
     v_alasan_agama_sps,
     v_alasan_alamat_sps,
     v_alasan_rtrw_sps,
     v_alasan_kodepos_sps,
     v_alasan_kelurahan_sps,
     v_alasan_kecamatan_sps,
     v_alasan_kabupaten_sps,
     v_alasan_provinsi_sps,
     ////alasan familycard
     v_alasan_nokk_kk,
     v_alasan_tanggungan_kk,
     v_alasan_pendidikan_kk,
     v_alasan_nation_kk,
     v_alasan_sps_pendidikan_kk,
     ///current
     v_alasan_notlp_curr,
     v_alasan_nohp_curr,
     v_alasan_nofax_curr,
     v_alasan_email_curr,
     ///alasan occp
     v_alasan_comtype_occp,
     v_alasan_comfclt_occp,
     v_alasan_othbus_occp,
     v_alasan_head_occp,
     v_alasan_alamat_occp,
     v_alasan_rtrw_occp,
     v_alasan_kodepos_occp,
     v_alasan_kelurahan_occp,
     v_alasan_kecamatan_occp,
     v_alasan_kabupaten_occp,
     v_alasan_provinsi_occp,
     v_alasan_notlp_occp,
     v_alasan_nofax_occp,
     v_alasan_email_occp,
     ///alasan other
     v_alasan_npwp_other,
     v_alasan_resino_other,
     v_alasan_residate_other,
     v_alasan_alias_other,
     v_alasan_gelar_other,
     v_alasan_alamat_other,
     v_alasan_rtrw_other,
     v_alasan_kodepos_other,
     v_alasan_kelurahan_other,
     v_alasan_kecamatan_other,
     v_alasan_kabupaten_other,
     v_alasan_provinsi_other,
     v_alasan_relationship_other
    });
    
    alert_confirm("Apakah Anda Yakin Ingin Melakukan Koreksi?", function() {
     console.log(arrayData);
     if ($('#inp-cust-type-cc').val() == "COM") {
        var length_gua_com = $('#inp-no-identitas-penjaminn2').val();
        if (length_gua_com.length > 0 && length_gua_com.length < 16) {
            alert_info('No KTP tidak boleh kurang dari 16 digit');
        }else{
      save_cc(arrayData);
  }
     } else {
        var length_gua_per = $('#inp-no-identitas-penjamin2').val();
        if (length_gua_per.length > 0 && length_gua_per.length < 16) {
            alert_info('No KTP tidak boleh kurang dari 16 digit');
        }else{
     save_cc_per(arrayData);
  } 
     }
    });
   }
  }
 }
 //alert_info("Lolos Validasi :D");
});

//========================================================================================================================//

if (branch_id_cc !== '0000') {
 $('#ho-cc').hide();
 $('#cabang-cc').show();
 $('#inp-branch-id-cc').val(branch_id_cc);
 $('#inp-branch-name-cc').val(branch_id_cc + ' - ' + branch_name_cc);
 $('<option/>').val(branch_id_cc).html(branch_id_cc + ' - ' + branch_name_cc).appendTo('#slc-branch-cc');
 $('#slc-branch-cc').prop('disabled', true);
} else {
 get_data_branch('#slc-branch-cc');
}

var role_cuscor = "";
var flag_role_cuscor = true;

//=========================================================LOADING DATA PARAM============================================================================//
if ($('#customer-correction-am').length) {
 $('#btn-search-request-cc').prop('disabled', true);
 $('#simpan-koreksi-cc').prop('disabled', true);
 $('#cetak-permohonan-cc').prop('disabled', true);
 $('#konfirmasi-permohonan-cc').prop('disabled', true);
 $('#batalkan-koreksi-cc').prop('disabled', true);
 getCustomertype();
 getRelationship();
 getCardType();
 getTitle();
 getNationality();
 getReligion();
 getEducation();
 getOccupation2();
 getGenderType();
 getStatusEmpl();
 getMaritalType();
 getCustAddress();
 getCreditCard();
 getCompanyType();
 getCompanyFacility();
 getLocationStat();
 getCompLocation();
 getElectricType();
 getStreetType();
 getHouseStatus();
 getList_Bank();
 getProfesi();
 getJabatann();
 get_employee_kcbcc();
 get_empl_adhcc();
 getReasonCustomer();

 if (!localStorage.getItem('role_user_cuscor')) {
  $.ajax({
   url: "Controller_home/get_detail_user",
   cache: false,
   success: function(response) {
    if (response) {
     try {
      console.log(response);
      localStorage.setItem('role_user_cuscor', response);
      role_cuscor = $.parseJSON(localStorage.getItem('role_user_cuscor'));
      console.log(role_cuscor);

     } catch (e) {
      console.log(e);
      $('#loading-ajax').hide();
      alert_error("Terjadi Kesalahan " + e);
     }
    }
   },
   error: function(response) {
    console.log(response);
   }
  });
 } else {
  role_cuscor = $.parseJSON(localStorage.getItem('role_user_cuscor'));
  console.log(role_cuscor);
 }
}
//==========================================================POP UP MODAL=================================================================================//
//holder pri
$('#inp-kodepos-holder-pri2').click(function() {
 $('#modal-cari-kode-pos-holder-per').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#inp-kelurahan-alamat-holder-pri2').click(function() {
 $('#modal-cari-kelurahan-holder-per').modal({
  show: true,
  backdrop: 'static'
 });
});
$('#src-kodepos-holder-pri2').click(function() {
 $('#modal-cari-kode-pos-holder-per').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#src-kelurahan-alamat-holder-pri2').click(function() {
 $('#modal-cari-kelurahan-holder-per').modal({
  show: true,
  backdrop: 'static'
 });
});

//holder ent
$('#inp-kodepos-holder-ent2').click(function() {
 $('#modal-cari-kode-pos-holder-ent').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#inp-kelurahan-holder-ent2').click(function() {
 $('#modal-cari-kelurahan-holder-ent').modal({
  show: true,
  backdrop: 'static'
 });
});
$('#src-kodepos-holder-ent2').click(function() {
 $('#modal-cari-kode-pos-holder-ent').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#src-kelurahan-holder-ent2').click(function() {
 $('#modal-cari-kelurahan-holder-ent').modal({
  show: true,
  backdrop: 'static'
 });
});

//pic
$('#inp-kode-pos-alamat-pic2').click(function() {
 $('#modal-cari-kode-pos-pic').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#inp-kelurahan-alamat-pic2').click(function() {
 $('#modal-cari-kelurahan-pic').modal({
  show: true,
  backdrop: 'static'
 });
});
$('#src-kode-pos-alamat-pic2').click(function() {
 $('#modal-cari-kode-pos-pic').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#src-kelurahan-alamat-pic2').click(function() {
 $('#modal-cari-kelurahan-pic').modal({
  show: true,
  backdrop: 'static'
 });
});

//guarantor
$('#inp-kode-pos-alamat-penjamin2').click(function() {
 $('#modal-cari-kode-pos-guarantor').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#inp-kelurahan-alamat-penjamin2').click(function() {
 $('#modal-cari-kelurahan-guarantor').modal({
  show: true,
  backdrop: 'static'
 });
});
$('#src-kode-pos-alamat-penjamin2').click(function() {
 $('#modal-cari-kode-pos-guarantor').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#src-kelurahan-alamat-penjamin2').click(function() {
 $('#modal-cari-kelurahan-guarantor').modal({
  show: true,
  backdrop: 'static'
 });
});

//guarantor2
$('#inp-kode-pos-alamat-penjaminn2').click(function() {
 $('#modal-cari-kode-pos-guarantorr').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#inp-kelurahan-alamat-penjaminn2').click(function() {
 $('#modal-cari-kelurahan-guarantorr').modal({
  show: true,
  backdrop: 'static'
 });
});
$('#src-kode-pos-alamat-penjaminn2').click(function() {
 $('#modal-cari-kode-pos-guarantorr').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#src-kelurahan-alamat-penjaminn2').click(function() {
 $('#modal-cari-kelurahan-guarantorr').modal({
  show: true,
  backdrop: 'static'
 });
});

//spouse
$('#inp-kode-pos-alamat-spouse2').click(function() {
 $('#modal-cari-kode-pos-spouse').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#inp-kelurahan-alamat-spouse2').click(function() {
 $('#modal-cari-kelurahan-spouse').modal({
  show: true,
  backdrop: 'static'
 });
});
$('#src-kode-pos-alamat-spouse2').click(function() {
 $('#modal-cari-kode-pos-spouse').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#src-kelurahan-alamat-spouse2').click(function() {
 $('#modal-cari-kelurahan-spouse').modal({
  show: true,
  backdrop: 'static'
 });
});

//current
$('#inp-kode-pos-alamat-resident2').click(function() {
 $('#modal-cari-kode-pos-current').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#inp-kelurahan-alamat-resident2').click(function() {
 $('#modal-cari-kelurahan-current').modal({
  show: true,
  backdrop: 'static'
 });
});

//occupation
$('#inp-kode-pos-occp2').click(function() {
 $('#modal-cari-kode-pos-occupation').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#inp-kelurahan-occp2').click(function() {
 $('#modal-cari-kelurahan-occupation').modal({
  show: true,
  backdrop: 'static'
 });
});
$('#src-kode-pos-occp2').click(function() {
 $('#modal-cari-kode-pos-occupation').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#src-kelurahan-occp2').click(function() {
 $('#modal-cari-kelurahan-occupation').modal({
  show: true,
  backdrop: 'static'
 });
});

//other
$('#inp-kode-pos-other2').click(function() {
 $('#modal-cari-kode-pos-other').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#inp-kelurahan-alamat-other2').click(function() {
 $('#modal-cari-kelurahan-other').modal({
  show: true,
  backdrop: 'static'
 });
});
$('#src-kode-pos-other2').click(function() {
 $('#modal-cari-kode-pos-other').modal({
  show: true,
  backdrop: 'static'
 });
});

$('#src-kelurahan-alamat-other2').click(function() {
 $('#modal-cari-kelurahan-other').modal({
  show: true,
  backdrop: 'static'
 });
});

//sector company
$('#inp-sektor-ekonomi-perusahaan2').click(function() {
 $('#modal-search-sektor-ekonomi-com').modal({
  show: true,
  backdrop: 'static'
 });
 getSector(table_sector_com);
});

$('#inp-lapangan-usaha-perusahaan2').click(function() {
 $('#modal-search-lapangan-usaha-com').modal({
  show: true,
  backdrop: 'static'
 });
 getNature_Buss(table_lapangan_com);
});
//sector company
$('#src-sektor-ekonomi-perusahaan').click(function() {
 $('#modal-search-sektor-ekonomi-com').modal({
  show: true,
  backdrop: 'static'
 });
 getSector(table_sector_com);
});

$('#src-lapangan-usaha-perusahaan').click(function() {
 $('#modal-search-lapangan-usaha-com').modal({
  show: true,
  backdrop: 'static'
 });
 getNature_Buss(table_lapangan_com);
});

//=========================================================== DOUBLE KLIK MODAL =================================================================//
//company sektor ekonomi dan lapangan usaha
$('#table-sektor-ekonomi-job-com tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_sector_com.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_sector_com.row(this).data();
  $('#inp-sektor-ekonomi-perusahaan2').val(arr_tbl[1]);
  $('#inp-sektor-ekonomi-id-perusahaan2').val(arr_tbl[0]);
 }
 $('#modal-search-sektor-ekonomi-com').modal('hide');
});

$('#table-lapangan-usaha-com tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_lapangan_com.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_lapangan_com.row(this).data();
  $('#inp-lapangan-usaha-perusahaan2').val(arr_tbl[1]);
  $('#inp-lapangan-usaha-id-perusahaan2').val(arr_tbl[0]);
 }
 $('#modal-search-lapangan-usaha-com').modal('hide');
});

//spouse
$('#tabel-result-kode-pos-spouse tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_sps.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kodepos_sps.row(this).data();
  $('#inp-kode-pos-alamat-spouse2').val(arr_tbl[0]);
  $('#inp-kelurahan-alamat-spouse2').val(arr_tbl[1]);
  $('#inp-kecamatan-alamat-spouse2').val(arr_tbl[2]);
  $('#inp-kabupaten-alamat-spouse2').val(arr_tbl[3]);
  $('#inp-provinsi-alamat-spouse2').val(arr_tbl[4]);
  $('#inp-kelurahan-alamat-spouse-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-alamat-spouse-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-alamat-spouse-id2').val(arr_tbl[7]);
  $('#inp-provinsi-spouse-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kode-pos-spouse').modal('hide');
});

$('#tabel-result-kelurahan-spouse tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_sps.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kelurahan_sps.row(this).data();
  $('#inp-kode-pos-alamat-spouse2').val(arr_tbl[0]);
  $('#inp-kelurahan-alamat-spouse2').val(arr_tbl[1]);
  $('#inp-kecamatan-alamat-spouse2').val(arr_tbl[2]);
  $('#inp-kabupaten-alamat-spouse2').val(arr_tbl[3]);
  $('#inp-provinsi-alamat-spouse2').val(arr_tbl[4]);
  $('#inp-kelurahan-alamat-spouse-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-alamat-spouse-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-alamat-spouse-id2').val(arr_tbl[7]);
  $('#inp-provinsi-spouse-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kelurahan-spouse').modal('hide');
});
//current address
$('#tabel-result-kode-pos-current tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_curr.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kodepos_curr.row(this).data();
  $('#inp-kode-pos-alamat-resident2').val(arr_tbl[0]);
  $('#inp-kelurahan-alamat-resident2').val(arr_tbl[1]);
  $('#inp-kecamatan-alamat-resident2').val(arr_tbl[2]);
  $('#inp-kabupaten-alamat-resident2').val(arr_tbl[3]);
  $('#inp-provinsi-alamat-resident2').val(arr_tbl[4]);
  $('#inp-kelurahan-alamat-resident-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-alamat-resident-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-alamat-resident-id2').val(arr_tbl[7]);
  $('#inp-provinsi-alamat-resident-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kode-pos-current').modal('hide');
});

$('#tabel-result-kelurahan-current tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_curr.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kelurahan_curr.row(this).data();
  $('#inp-kode-pos-alamat-resident2').val(arr_tbl[0]);
  $('#inp-kelurahan-alamat-resident2').val(arr_tbl[1]);
  $('#inp-kecamatan-alamat-resident2').val(arr_tbl[2]);
  $('#inp-kabupaten-alamat-resident2').val(arr_tbl[3]);
  $('#inp-provinsi-alamat-resident2').val(arr_tbl[4]);
  $('#inp-kelurahan-alamat-resident-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-alamat-resident-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-alamat-resident-id2').val(arr_tbl[7]);
  $('#inp-provinsi-alamat-resident-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kelurahan-current').modal('hide');
});
//occupation
$('#tabel-result-kode-pos-occupation tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_occp.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kodepos_occp.row(this).data();
  $('#inp-kode-pos-occp2').val(arr_tbl[0]);
  $('#inp-kelurahan-occp2').val(arr_tbl[1]);
  $('#inp-kecamatan-occp2').val(arr_tbl[2]);
  $('#inp-kabupaten-occp2').val(arr_tbl[3]);
  $('#inp-provinsi-occp2').val(arr_tbl[4]);
  $('#inp-kelurahan-id-occp2').val(arr_tbl[5]);
  $('#inp-kecamatan-id-occp2').val(arr_tbl[6]);
  $('#inp-kabupaten-id-occp2').val(arr_tbl[7]);
  $('#inp-provinsi-id-occp2').val(arr_tbl[8]);
 }
 $('#modal-cari-kode-pos-occupation').modal('hide');
});

$('#tabel-result-kelurahan-occupation tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_occp.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kelurahan_occp.row(this).data();
  $('#inp-kode-pos-occp2').val(arr_tbl[0]);
  $('#inp-kelurahan-occp2').val(arr_tbl[1]);
  $('#inp-kecamatan-occp2').val(arr_tbl[2]);
  $('#inp-kabupaten-occp2').val(arr_tbl[3]);
  $('#inp-provinsi-occp2').val(arr_tbl[4]);
  $('#inp-kelurahan-id-occp2').val(arr_tbl[5]);
  $('#inp-kecamatan-id-occp2').val(arr_tbl[6]);
  $('#inp-kabupaten-id-occp2').val(arr_tbl[7]);
  $('#inp-provinsi-id-occp2').val(arr_tbl[8]);
 }
 $('#modal-cari-kelurahan-occupation').modal('hide');
});
//other
$('#tabel-result-kode-pos-other tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_oth.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kodepos_oth.row(this).data();
  $('#inp-kode-pos-other2').val(arr_tbl[0]);
  $('#inp-kelurahan-alamat-other2').val(arr_tbl[1]);
  $('#inp-kecamatan-alamat-other2').val(arr_tbl[2]);
  $('#inp-kabupaten-alamat-other2').val(arr_tbl[3]);
  $('#inp-provinsi-alamat-other2').val(arr_tbl[4]);
  $('#inp-kelurahan-alamat-other-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-alamat-other-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-alamat-other-id2').val(arr_tbl[7]);
  $('#inp-provinsi-other-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kode-pos-other').modal('hide');
});

$('#tabel-result-kelurahan-other tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_oth.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kelurahan_oth.row(this).data();

  $('#inp-kode-pos-other2').val(arr_tbl[0]);
  $('#inp-kelurahan-alamat-other2').val(arr_tbl[1]);
  $('#inp-kecamatan-alamat-other2').val(arr_tbl[2]);
  $('#inp-kabupaten-alamat-other2').val(arr_tbl[3]);
  $('#inp-provinsi-alamat-other2').val(arr_tbl[4]);
  $('#inp-kelurahan-alamat-other-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-alamat-other-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-alamat-other-id2').val(arr_tbl[7]);
  $('#inp-provinsi-other-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kelurahan-other').modal('hide');
});
//shareholder pri
$('#tabel-result-kode-pos-holder-per tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_hold_per.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kodepos_hold_per.row(this).data();
  $('#inp-kodepos-holder-pri2').val(arr_tbl[0]);
  $('#inp-kelurahan-alamat-holder-pri2').val(arr_tbl[1]);
  $('#inp-kecamatan-alamat-holder-pri2').val(arr_tbl[2]);
  $('#inp-kabupaten-alamat-holder-pri2').val(arr_tbl[3]);
  $('#inp-provinsi-alamat-holder-pri2').val(arr_tbl[4]);
  $('#inp-kelurahan-alamat-holder-pri-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-alamat-holder-pri-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-alamat-holder-pri-id2').val(arr_tbl[7]);
  $('#inp-provinsi-holder-pri-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kode-pos-holder-per').modal('hide');
});

$('#tabel-result-kelurahan-holder-per tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_hold_per.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kelurahan_hold_per.row(this).data();
  $('#inp-kodepos-holder-pri2').val(arr_tbl[0]);
  $('#inp-kelurahan-alamat-holder-pri2').val(arr_tbl[1]);
  $('#inp-kecamatan-alamat-holder-pri2').val(arr_tbl[2]);
  $('#inp-kabupaten-alamat-holder-pri2').val(arr_tbl[3]);
  $('#inp-provinsi-alamat-holder-pri2').val(arr_tbl[4]);
  $('#inp-kelurahan-alamat-holder-pri-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-alamat-holder-pri-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-alamat-holder-pri-id2').val(arr_tbl[7]);
  $('#inp-provinsi-holder-pri-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kelurahan-holder-per').modal('hide');
});
//shareholder ent
$('#tabel-result-kode-pos-holder-ent tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_hold_ent.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kodepos_hold_ent.row(this).data();
  $('#inp-kodepos-holder-ent2').val(arr_tbl[0]);
  $('#inp-kelurahan-holder-ent2').val(arr_tbl[1]);
  $('#inp-kecamatan-holder-ent2').val(arr_tbl[2]);
  $('#inp-kabupaten-holder-ent2').val(arr_tbl[3]);
  $('#inp-provinsi-holder-ent2').val(arr_tbl[4]);
  $('#inp-kelurahan-holder-ent-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-holder-ent-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-holder-ent-id2').val(arr_tbl[7]);
  $('#inp-provinsi-holder-ent-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kode-pos-holder-ent').modal('hide');
});

$('#tabel-result-kelurahan-holder-ent tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_hold_ent.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kelurahan_hold_ent.row(this).data();
  $('#inp-kodepos-holder-ent2').val(arr_tbl[0]);
  $('#inp-kelurahan-holder-ent2').val(arr_tbl[1]);
  $('#inp-kecamatan-holder-ent2').val(arr_tbl[2]);
  $('#inp-kabupaten-holder-ent2').val(arr_tbl[3]);
  $('#inp-provinsi-holder-ent2').val(arr_tbl[4]);
  $('#inp-kelurahan-holder-ent-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-holder-ent-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-holder-ent-id2').val(arr_tbl[7]);
  $('#inp-provinsi-holder-ent-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kelurahan-holder-ent').modal('hide');
});
//pic
$('#tabel-result-kode-pos-pic tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_pic.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kodepos_pic.row(this).data();
  $('#inp-kode-pos-alamat-pic2').val(arr_tbl[0]);
  $('#inp-kelurahan-alamat-pic2').val(arr_tbl[1]);
  $('#inp-kecamatan-alamat-pic2').val(arr_tbl[2]);
  $('#inp-kabupaten-alamat-pic2').val(arr_tbl[3]);
  $('#inp-provinsi-alamat-pic2').val(arr_tbl[4]);
  $('#inp-kelurahan-alamat-pic-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-alamat-pic-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-alamat-pic-id2').val(arr_tbl[7]);
  $('#inp-provinsi-pic-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kode-pos-pic').modal('hide');
});

$('#tabel-result-kelurahan-pic tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_pic.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kelurahan_pic.row(this).data();
  $('#inp-kode-pos-alamat-pic2').val(arr_tbl[0]);
  $('#inp-kelurahan-alamat-pic2').val(arr_tbl[1]);
  $('#inp-kecamatan-alamat-pic2').val(arr_tbl[2]);
  $('#inp-kabupaten-alamat-pic2').val(arr_tbl[3]);
  $('#inp-provinsi-alamat-pic2').val(arr_tbl[4]);
  $('#inp-kelurahan-alamat-pic-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-alamat-pic-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-alamat-pic-id2').val(arr_tbl[7]);
  $('#inp-provinsi-pic-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kelurahan-pic').modal('hide');
});
//guarantor
$('#tabel-result-kode-pos-guarantor tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_guar.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kodepos_guar.row(this).data();
  $('#inp-kode-pos-alamat-penjamin2').val(arr_tbl[0]);
  $('#inp-kelurahan-alamat-penjamin2').val(arr_tbl[1]);
  $('#inp-kecamatan-alamat-penjamin2').val(arr_tbl[2]);
  $('#inp-kabupaten-alamat-penjamin2').val(arr_tbl[3]);
  $('#slc-provinsi-alamat-penjamin2').val(arr_tbl[4]);
  $('#inp-kelurahan-alamat-penjamin-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-alamat-penjamin-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-alamat-penjamin-id2').val(arr_tbl[7]);
  $('#inp-provinsi-penjamin-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kode-pos-guarantor').modal('hide');
});

$('#tabel-result-kelurahan-guarantor tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_guar.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kelurahan_guar.row(this).data();
  $('#inp-kode-pos-alamat-penjamin2').val(arr_tbl[0]);
  $('#inp-kelurahan-alamat-penjamin2').val(arr_tbl[1]);
  $('#inp-kecamatan-alamat-penjamin2').val(arr_tbl[2]);
  $('#inp-kabupaten-alamat-penjamin2').val(arr_tbl[3]);
  $('#slc-provinsi-alamat-penjamin2').val(arr_tbl[4]);
  $('#inp-kelurahan-alamat-penjamin-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-alamat-penjamin-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-alamat-penjamin-id2').val(arr_tbl[7]);
  $('#inp-provinsi-penjamin-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kelurahan-guarantor').modal('hide');
});
//guarantor2
$('#tabel-result-kode-pos-guarantorr tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_guarr.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kodepos_guarr.row(this).data();
  //debugger;
  $('#inp-kode-pos-alamat-penjaminn2').val(arr_tbl[0]);
  $('#inp-kelurahan-alamat-penjaminn2').val(arr_tbl[1]);
  $('#inp-kecamatan-alamat-penjaminn2').val(arr_tbl[2]);
  $('#inp-kabupaten-alamat-penjaminn2').val(arr_tbl[3]);
  $('#slc-provinsi-alamat-penjaminn2').val(arr_tbl[4]);
  $('#inp-kelurahan-alamat-penjaminn-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-alamat-penjaminn-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-alamat-penjaminn-id2').val(arr_tbl[7]);
  $('#inp-provinsi-penjaminn-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kode-pos-guarantorr').modal('hide');
});

$('#tabel-result-kelurahan-guarantorr tbody').on('dblclick', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_guarr.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  var arr_tbl = table_kelurahan_guarr.row(this).data();
  $('#inp-kode-pos-alamat-penjaminn2').val(arr_tbl[0]);
  $('#inp-kelurahan-alamat-penjaminn2').val(arr_tbl[1]);
  $('#inp-kecamatan-alamat-penjaminn2').val(arr_tbl[2]);
  $('#inp-kabupaten-alamat-penjaminn2').val(arr_tbl[3]);
  $('#slc-provinsi-alamat-penjaminn2').val(arr_tbl[4]);
  $('#inp-kelurahan-alamat-penjaminn-id2').val(arr_tbl[5]);
  $('#inp-kecamatan-alamat-penjaminn-id2').val(arr_tbl[6]);
  $('#inp-kabupaten-alamat-penjaminn-id2').val(arr_tbl[7]);
  $('#inp-provinsi-penjaminn-id2').val(arr_tbl[8]);
 }
 $('#modal-cari-kelurahan-guarantorr').modal('hide');
});
//=========================================================== KLIK PILIH MODAL =========================================================================//
//company sektor ekonomi dan lapangan usaha
$('#table-sektor-ekonomi-job-com tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_sector_com.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');

 }
});

$('#btn-pilih-sektor-ekonomi-job-com').click(function() {
 var arr_tbl = table_sector_com.row('.selected').data();
 $('#inp-sektor-ekonomi-perusahaan2').val(arr_tbl[1]);
 $('#inp-sektor-ekonomi-id-perusahaan2').val(arr_tbl[0]);
 $('#modal-search-sektor-ekonomi-com').modal('hide');
});

$('#table-lapangan-usaha-com tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_lapangan_com.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
 }
});

$('#btn-pilih-lapangan-usaha-com').click(function() {
 var arr_tbl = table_lapangan_com.row('.selected').data();
 $('#inp-lapangan-usaha-perusahaan2').val(arr_tbl[1]);
 $('#inp-lapangan-usaha-id-perusahaan2').val(arr_tbl[0]);
 $('#modal-search-lapangan-usaha-com').modal('hide');
});

//spouse
$('#tabel-result-kelurahan-spouse tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_sps.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');

 }
});

$('#btn-pilih-kelurahan-spouse').click(function() {
 var arr_tbl = table_kelurahan_sps.row('.selected').data();
 $('#inp-kode-pos-alamat-spouse2').val(arr_tbl[0]);
 $('#inp-kelurahan-alamat-spouse2').val(arr_tbl[1]);
 $('#inp-kecamatan-alamat-spouse2').val(arr_tbl[2]);
 $('#inp-kabupaten-alamat-spouse2').val(arr_tbl[3]);
 $('#inp-provinsi-alamat-spouse2').val(arr_tbl[4]);
 $('#inp-kelurahan-alamat-spouse-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-alamat-spouse-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-alamat-spouse-id2').val(arr_tbl[7]);
 $('#inp-provinsi-spouse-id2').val(arr_tbl[8]);
 $('#modal-cari-kelurahan-spouse').modal('hide');
});

$('#tabel-result-kode-pos-spouse tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_sps.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
 }
});

$('#btn-pilih-kode-pos-spouse').click(function() {
 var arr_tbl = table_kodepos_sps.row('.selected').data();
 $('#inp-kode-pos-alamat-spouse2').val(arr_tbl[0]);
 $('#inp-kelurahan-alamat-spouse2').val(arr_tbl[1]);
 $('#inp-kecamatan-alamat-spouse2').val(arr_tbl[2]);
 $('#inp-kabupaten-alamat-spouse2').val(arr_tbl[3]);
 $('#inp-provinsi-alamat-spouse2').val(arr_tbl[4]);
 $('#inp-kelurahan-alamat-spouse-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-alamat-spouse-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-alamat-spouse-id2').val(arr_tbl[7]);
 $('#inp-provinsi-spouse-id2').val(arr_tbl[8]);
 $('#modal-cari-kode-pos-spouse').modal('hide');
});
//current
$('#tabel-result-kelurahan-current tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_curr.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');

 }
});

$('#btn-pilih-kelurahan-current').click(function() {
 var arr_tbl = table_kelurahan_curr.row('.selected').data();
 $('#inp-kode-pos-alamat-resident2').val(arr_tbl[0]);
 $('#inp-kelurahan-alamat-resident2').val(arr_tbl[1]);
 $('#inp-kecamatan-alamat-resident2').val(arr_tbl[2]);
 $('#inp-kabupaten-alamat-resident2').val(arr_tbl[3]);
 $('#inp-provinsi-alamat-resident2').val(arr_tbl[4]);
 $('#inp-kelurahan-alamat-resident-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-alamat-resident-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-alamat-resident-id2').val(arr_tbl[7]);
 $('#inp-provinsi-alamat-resident-id2').val(arr_tbl[8]);
 $('#modal-cari-kelurahan-resident').modal('hide');
});

$('#tabel-result-kode-pos-current tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_curr.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
 }
});

$('#btn-pilih-kode-pos-current').click(function() {
 var arr_tbl = table_kodepos_curr.row('.selected').data();
 $('#inp-kode-pos-alamat-resident2').val(arr_tbl[0]);
 $('#inp-kelurahan-alamat-resident2').val(arr_tbl[1]);
 $('#inp-kecamatan-alamat-resident2').val(arr_tbl[2]);
 $('#inp-kabupaten-alamat-resident2').val(arr_tbl[3]);
 $('#inp-provinsi-alamat-resident2').val(arr_tbl[4]);
 $('#inp-kelurahan-alamat-resident-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-alamat-resident-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-alamat-resident-id2').val(arr_tbl[7]);
 $('#inp-provinsi-alamat-resident-id2').val(arr_tbl[8]);
 $('#modal-cari-kode-pos-resident').modal('hide');
});
//occupation
$('#tabel-result-kelurahan-occupation tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_occp.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');

 }
});

$('#btn-pilih-kelurahan-occupation').click(function() {
 var arr_tbl = table_kelurahan_occp.row('.selected').data();
 $('#inp-kode-pos-occp2').val(arr_tbl[0]);
 $('#inp-kelurahan-occp2').val(arr_tbl[1]);
 $('#inp-kecamatan-occp2').val(arr_tbl[2]);
 $('#inp-kabupaten-occp2').val(arr_tbl[3]);
 $('#inp-provinsi-occp2').val(arr_tbl[4]);
 $('#inp-kelurahan-id-occp2').val(arr_tbl[5]);
 $('#inp-kecamatan-id-occp2').val(arr_tbl[6]);
 $('#inp-kabupaten-id-occp2').val(arr_tbl[7]);
 $('#inp-provinsi-id-occp2').val(arr_tbl[8]);
 $('#modal-cari-kelurahan-occupation').modal('hide');
});

$('#tabel-result-kode-pos-occupation tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_occp.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
 }
});

$('#btn-pilih-kode-pos-occupation').click(function() {
 var arr_tbl = table_kodepos_occp.row('.selected').data();
 $('#inp-kode-pos-occp2').val(arr_tbl[0]);
 $('#inp-kelurahan-occp2').val(arr_tbl[1]);
 $('#inp-kecamatan-occp2').val(arr_tbl[2]);
 $('#inp-kabupaten-occp2').val(arr_tbl[3]);
 $('#inp-provinsi-occp2').val(arr_tbl[4]);
 $('#inp-kelurahan-id-occp2').val(arr_tbl[5]);
 $('#inp-kecamatan-id-occp2').val(arr_tbl[6]);
 $('#inp-kabupaten-id-occp2').val(arr_tbl[7]);
 $('#inp-provinsi-id-occp2').val(arr_tbl[8]);
 $('#modal-cari-kode-pos-occupation').modal('hide');
});
//other
$('#tabel-result-kelurahan-other tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_oth.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');

 }
});

$('#btn-pilih-kelurahan-other').click(function() {
 var arr_tbl = table_kelurahan_oth.row('.selected').data();
 $('#inp-kode-pos-other2').val(arr_tbl[0]);
 $('#inp-kelurahan-alamat-other2').val(arr_tbl[1]);
 $('#inp-kecamatan-alamat-other2').val(arr_tbl[2]);
 $('#inp-kabupaten-alamat-other2').val(arr_tbl[3]);
 $('#inp-provinsi-alamat-other2').val(arr_tbl[4]);
 $('#inp-kelurahan-alamat-other-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-alamat-other-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-alamat-other-id2').val(arr_tbl[7]);
 $('#inp-provinsi-other-id2').val(arr_tbl[8]);
 $('#modal-cari-kelurahan-other').modal('hide');
});

$('#tabel-result-kode-pos-other tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_oth.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
 }
});

$('#btn-pilih-kode-pos-other').click(function() {
 var arr_tbl = table_kodepos_oth.row('.selected').data();
 $('#inp-kode-pos-other2').val(arr_tbl[0]);
 $('#inp-kelurahan-alamat-other2').val(arr_tbl[1]);
 $('#inp-kecamatan-alamat-other2').val(arr_tbl[2]);
 $('#inp-kabupaten-alamat-other2').val(arr_tbl[3]);
 $('#inp-provinsi-alamat-other2').val(arr_tbl[4]);
 $('#inp-kelurahan-alamat-other-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-alamat-other-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-alamat-other-id2').val(arr_tbl[7]);
 $('#inp-provinsi-alamat-other-id2').val(arr_tbl[8]);
 $('#modal-cari-kode-pos-other').modal('hide');
});
//shareholder per
$('#tabel-result-kelurahan-holder-per tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_hold_per.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');

 }
});

$('#btn-pilih-kelurahan-holder-per').click(function() {
 var arr_tbl = table_kelurahan_hold_per.row('.selected').data();
 $('#inp-kode-pos-alamat-holder-pri2').val(arr_tbl[0]);
 $('#inp-kelurahan-alamat-holder-pri2').val(arr_tbl[1]);
 $('#inp-kecamatan-alamat-holder-pri2').val(arr_tbl[2]);
 $('#inp-kabupaten-alamat-holder-pri2').val(arr_tbl[3]);
 $('#inp-provinsi-alamat-holder-pri2').val(arr_tbl[4]);
 $('#inp-kelurahan-alamat-holder-pri-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-alamat-holder-pri-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-alamat-holder-pri-id2').val(arr_tbl[7]);
 $('#inp-provinsi-holder-pri-id2').val(arr_tbl[8]);
 $('#modal-cari-kelurahan-holder-pri').modal('hide');
});

$('#tabel-result-kode-pos-holder-per tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_hold_per.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
 }
});

$('#btn-pilih-kode-pos-holder-per').click(function() {
 var arr_tbl = table_kodepos_hold_per.row('.selected').data();
 $('#inp-kode-pos-alamat-holder-pri2').val(arr_tbl[0]);
 $('#inp-kelurahan-alamat-holder-pri2').val(arr_tbl[1]);
 $('#inp-kecamatan-alamat-holder-per2').val(arr_tbl[2]);
 $('#inp-kabupaten-alamat-holder-pri2').val(arr_tbl[3]);
 $('#inp-provinsi-alamat-holder-pri2').val(arr_tbl[4]);
 $('#inp-kelurahan-alamat-holder-pri-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-alamat-holder-pri-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-alamat-holder-pri-id2').val(arr_tbl[7]);
 $('#inp-provinsi-holder-pri-id2').val(arr_tbl[8]);
 $('#modal-cari-kode-pos-holder-pri').modal('hide');
});
//shareholder ent
$('#tabel-result-kelurahan-holder-ent tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_hold_ent.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');

 }
});

$('#btn-pilih-kelurahan-holder-ent').click(function() {
 var arr_tbl = table_kelurahan_hold_ent.row('.selected').data();
 $('#inp-kode-pos-holder-ent2').val(arr_tbl[0]);
 $('#inp-kelurahan-holder-ent2').val(arr_tbl[1]);
 $('#inp-kecamatan-holder-ent2').val(arr_tbl[2]);
 $('#inp-kabupaten-holder-ent2').val(arr_tbl[3]);
 $('#inp-provinsi-holder-ent2').val(arr_tbl[4]);
 $('#inp-kelurahan-holder-ent-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-holder-ent-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-holder-ent-id2').val(arr_tbl[7]);
 $('#inp-provinsi-holder-ent-id2').val(arr_tbl[8]);
 $('#modal-cari-kelurahan-holder-ent').modal('hide');
});

$('#tabel-result-kode-pos-holder-ent tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_hold_ent.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
 }
});

$('#btn-pilih-kode-pos-holder-ent').click(function() {
 var arr_tbl = table_kodepos_hold_ent.row('.selected').data();
 $('#inp-kode-pos-holder-ent2').val(arr_tbl[0]);
 $('#inp-kelurahan-holder-ent2').val(arr_tbl[1]);
 $('#inp-kecamatan-holder-ent2').val(arr_tbl[2]);
 $('#inp-kabupaten-holder-ent2').val(arr_tbl[3]);
 $('#inp-provinsi-holder-ent2').val(arr_tbl[4]);
 $('#inp-kelurahan-holder-ent-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-holder-ent-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-holder-ent-id2').val(arr_tbl[7]);
 $('#inp-provinsi-holder-ent-id2').val(arr_tbl[8]);
 $('#modal-cari-kode-pos-holder-ent').modal('hide');
});
//pic
$('#tabel-result-kelurahan-pic tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_pic.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');

 }
});

$('#btn-pilih-kelurahan-pic').click(function() {
 var arr_tbl = table_kelurahan_pic.row('.selected').data();
 $('#inp-kode-pos-alamat-pic2').val(arr_tbl[0]);
 $('#inp-kelurahan-alamat-pic2').val(arr_tbl[1]);
 $('#inp-kecamatan-alamat-pic2').val(arr_tbl[2]);
 $('#inp-kabupaten-alamat-pic2').val(arr_tbl[3]);
 $('#inp-provinsi-alamat-pic2').val(arr_tbl[4]);
 $('#inp-kelurahan-alamat-pic-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-alamat-pic-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-alamat-pic-id2').val(arr_tbl[7]);
 $('#inp-provinsi-pic-id2').val(arr_tbl[8]);
 $('#modal-cari-kelurahan-pic').modal('hide');
});

$('#tabel-result-kode-pos-pic tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_pic.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
 }
});

$('#btn-pilih-kode-pos-pic').click(function() {
 var arr_tbl = table_kodepos_pic.row('.selected').data();
 $('#inp-kode-pos-alamat-pic2').val(arr_tbl[0]);
 $('#inp-kelurahan-alamat-pic2').val(arr_tbl[1]);
 $('#inp-kecamatan-alamat-pic2').val(arr_tbl[2]);
 $('#inp-kabupaten-alamat-pic2').val(arr_tbl[3]);
 $('#inp-provinsi-alamat-pic2').val(arr_tbl[4]);
 $('#inp-kelurahan-alamat-pic-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-alamat-pic-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-alamat-pic-id2').val(arr_tbl[7]);
 $('#inp-provinsi-pic-id2').val(arr_tbl[8]);
 $('#modal-cari-kode-pos-pic').modal('hide');
});
//guarantor
$('#tabel-result-kelurahan-guarantor tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_guar.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');

 }
});

$('#btn-pilih-kelurahan-guarantor').click(function() {
 var arr_tbl = table_kelurahan_guar.row('.selected').data();
 $('#inp-kode-pos-alamat-penjamin2').val(arr_tbl[0]);
 $('#inp-kelurahan-alamat-penjamin2').val(arr_tbl[1]);
 $('#inp-kecamatan-alamat-penjamin2').val(arr_tbl[2]);
 $('#inp-kabupaten-alamat-penjamin2').val(arr_tbl[3]);
 $('#inp-provinsi-alamat-penjamin2').val(arr_tbl[4]);
 $('#inp-kelurahan-alamat-penjamin-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-alamat-penjamin-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-alamat-penjamin-id2').val(arr_tbl[7]);
 $('#inp-provinsi-penjamin-id2').val(arr_tbl[8]);
 $('#modal-cari-kelurahan-guarantor').modal('hide');
});

$('#tabel-result-kode-pos-guarantor tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_guar.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
 }
});

$('#btn-pilih-kode-pos-guarantor').click(function() {
 var arr_tbl = table_kodepos_guar.row('.selected').data();
 $('#inp-kode-pos-alamat-penjamin2').val(arr_tbl[0]);
 $('#inp-kelurahan-alamat-penjamin2').val(arr_tbl[1]);
 $('#inp-kecamatan-alamat-penjamin2').val(arr_tbl[2]);
 $('#inp-kabupaten-alamat-penjamin2').val(arr_tbl[3]);
 $('#inp-provinsi-alamat-penjamin2').val(arr_tbl[4]);
 $('#inp-kelurahan-alamat-penjamin-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-alamat-penjamin-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-alamat-penjamin-id2').val(arr_tbl[7]);
 $('#inp-provinsi-penjamin-id2').val(arr_tbl[8]);
 $('#modal-cari-kode-pos-guarantor').modal('hide');
});
//guarantor2
$('#tabel-result-kelurahan-guarantorr tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kelurahan_guarr.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');

 }
});

$('#btn-pilih-kelurahan-guarantorr').click(function() {
 var arr_tbl = table_kelurahan_guar.row('.selected').data();
 $('#inp-kode-pos-alamat-penjaminn2').val(arr_tbl[0]);
 $('#inp-kelurahan-alamat-penjaminn2').val(arr_tbl[1]);
 $('#inp-kecamatan-alamat-penjaminn2').val(arr_tbl[2]);
 $('#inp-kabupaten-alamat-penjaminn2').val(arr_tbl[3]);
 $('#slc-provinsi-alamat-penjaminn2').val(arr_tbl[4]);
 $('#inp-kelurahan-alamat-penjaminn-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-alamat-penjaminn-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-alamat-penjaminn-id2').val(arr_tbl[7]);
 $('#inp-provinsi-penjaminn-id2').val(arr_tbl[8]);
 $('#modal-cari-kelurahan-guarantorr').modal('hide');
});

$('#tabel-result-kode-pos-guarantorr tbody').on('click', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
 } else {
  table_kodepos_guarr.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
 }
});

$('#btn-pilih-kode-pos-guarantorr').click(function() {
 var arr_tbl = table_kodepos_guarr.row('.selected').data();
 $('#inp-kode-pos-alamat-penjaminn2').val(arr_tbl[0]);
 $('#inp-kelurahan-alamat-penjaminn2').val(arr_tbl[1]);
 $('#inp-kecamatan-alamat-penjaminn2').val(arr_tbl[2]);
 $('#inp-kabupaten-alamat-penjaminn2').val(arr_tbl[3]);
 $('#inp-provinsi-alamat-penjaminn2').val(arr_tbl[4]);
 $('#inp-kelurahan-alamat-penjaminn-id2').val(arr_tbl[5]);
 $('#inp-kecamatan-alamat-penjaminn-id2').val(arr_tbl[6]);
 $('#inp-kabupaten-alamat-penjaminn-id2').val(arr_tbl[7]);
 $('#inp-provinsi-penjaminn-id2').val(arr_tbl[8]);
 $('#modal-cari-kode-pos-guarantorr').modal('hide');
});
//===========================================================DATE TIME PICKER==========================================================================//
$('.cls-date-cuscor').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
});

$('.cls-maxdate-cuscor').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true
});


// ============================================================SCROLL ANIMATION======================================================================= //
function go_to_up_by_scroll() {
 $('html, body').animate({
  scrollTop: 0 //$('#'+id).offset().top-300
 }, 'slow');
}

function go_to_id_by_scroll(id) {
 $('html, body').animate({
  scrollTop: $(id).offset().top - 80
 }, 1000);
}
// =============================================================MENGAMBIL DATA PARAM UNTUK LIST DATA==================================================================== //
function get_employee_kcbcc() {

 var branch_code = $('#inp-branch-id-cc').val();
 var arrayData = [];
 arrayData.push({
  branch_code: branch_code
 });
 var data = '';

 $.ajax({
  url: base_url + "Controller_customer_correction/getEmplKCBcc",
  cache: false,
  type: 'post',
  data: {
   arrayData
  },
  dataType: 'json',
  success: function(response) {


   console.log(response);
   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     //var data = JSON.parse(response);
     $('#slc-setuju-oleh2-cc').empty();
     console.log('masuk');
     $('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('#slc-setuju-oleh2-cc').addClass('form-control');
     for (var i = 0; i < response['data'].length; i++) {
      $('#slc-setuju-oleh2-cc').append('<option value="' + response['data'][i].emplName + '">' + response['data'][i].emplName + ' - ' + response['data'][i].emplJobCode + '</option>');
     }

    } catch (e) {
     $('#loading-ajax').hide();
     alert_error(e);
    }
   } else {
    alert_error("Cek Jaringan");
   }

  }
 });
}


function get_empl_adhcc() {

 var branch_code = $('#inp-branch-id-cc').val();

 var arrayData = [];

 arrayData.push({
  branch_code: branch_code
 });

 var data = '';
 $.ajax({
  url: base_url + "Controller_customer_correction/getEmployeeADHcc",
  cache: false,
  type: 'post',
  data: {
   arrayData
  },
  dataType: 'json',
  success: function(response) {

   if (response) {

    try {
     $('#slc-setuju-oleh-cc').empty();
     // var result = JSON.parse(response);
     console.log('masuk');
     $('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('#slc-setuju-oleh-cc').addClass('form-control');
     for (var i = 0; i < response['data'].length; i++) {
      $('#slc-setuju-oleh-cc').append('<option value="' + response['data'][i].emplName + '">' + response['data'][i].emplName + ' - ' + response['data'][i].emplJobCode + '</option>');

     }
    } catch (e) {
     $('#loading-ajax').hide();
     alert_error(e);
    }
   } else {
    alert_error("Cek Jaringan");
   }
  }

 });

}

function getReasonCustomer() {
 var data = '';
 $.ajax({
  url: base_url + "Controller_customer_correction/getAlasanCC",
  cache: false,
  type: 'get',
  //data : {arrayData},
  dataType: 'json',
  success: function(response) {
   //debugger;
   console.log(response);
   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('.slc-edit-alasan-cuscor').empty();
     console.log('masuk');
     $('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('.slc-edit-alasan-cuscor').addClass('form-control');

     for (var i = 0; i < response['data'].length; i++) {
      $('.slc-edit-alasan-cuscor').append('<option value="' + response['data'][i].reason_code + '">' + response['data'][i].reason_desc + '</option>');
     }

    } catch (e) {
     $('#loading-ajax').hide();
     alert_error(e);
    }
   } else {
    alert_error("Cek Jaringan");
   }

  }
 });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getHouseStatus(proof_own) {
 $.ajax({
  url: base_url + "Controller_customer_correction/get_House_status",
  type: 'GET',
  success: function(response) {
   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     console.log(response);
     $('<option>').val('').html('').appendTo('#status-kepemilikan-rumah').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['house_status_desc']);
      $('#status-kepemilikan-rumah').append($('<option>', {
       value: this['house_status_code'],
       text: this['house_status_code'] + ' - ' + this['house_status_desc']
      }))
     });
     $('#status-kepemilikan-rumah').val(proof_own);
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Terjadi Kesalahan !");
    }
   }

  },
  error: function(response) {
   console.log(response);
  }
 });
}


function getCompanyFacility() {
 $.ajax({
  url: base_url + "Controller_customer_correction/get_company_facility",
  type: 'GET',
  success: function(response) {
   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     console.log(response);
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-fasilitasi-com-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['comp_facility_code']);
      $('.cls-fasilitasi-com-cc').append($('<option>', {
       value: this['comp_facility_code'],
       text: this['comp_facility_code'] + ' - ' + this['comp_facility_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Terjadi Kesalahan !");
    }
   }

  },
  error: function(response) {
   console.log(response);
  }
 });
}


// dropdown pilih tipe jalan //
function getStreetType(street_type) {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_Street_type",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('').appendTo('#tipe-jalan').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['street_type_desc']);
      $('#tipe-jalan').append($('<option>', {
       value: this['street_type_code'],
       text: this['street_type_code'] + ' - ' + this['street_type_desc']
      }))
     });
     $('#tipe-jalan').val(street_type);
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}

// dropdown pilih listrik //
function getElectricType(electricity) {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_Electric_type",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('').appendTo('#kelistrikan-rumah').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['elec_status_desc']);
      $('#kelistrikan-rumah').append($('<option>', {
       value: this['elec_type_code'],
       text: this['elec_type_code'] + ' - ' + this['elec_type_desc']
      }))
     });
     $('#kelistrikan-rumah').val(electricity);
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}

//dropdown pilih card//
function getCardType(id_type_h) {
 console.log(id_type_h);
 $.ajax({
  url: base_url + "Controller_customer_correction/get_Card_type",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-jenis-identitas-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['id_card_type_desc']);
      $('.cls-jenis-identitas-cc').append($('<option>', {
       value: this['id_card_type_code'],
       text: this['id_card_type_code'] + ' - ' + this['id_card_type_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}

var respon_marital = '';
//dropdown pilih marital(hubungan)//
function getMaritalType() {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_Marital_type",
  type: 'GET',
  success: function(response) {
   console.log(response);
   respon_marital = response;

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-status-pernikahan-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['marital_desc']);
      $('.cls-status-pernikahan-cc').append($('<option>', {
       value: this['marital_code'],
       text: this['marital_code'] + ' - ' + this['marital_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}

//dropdown pilih gender(kelamin)//
function getGenderType() {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_Gender_type",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-jenis-kelamin-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['gender_desc']);
      $('.cls-jenis-kelamin-cc').append($('<option>', {
       value: this['gender_code'],
       text: this['gender_code'] + ' - ' + this['gender_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}

function getStatusEmpl() {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_status_employee",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-status-pegawai-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['gender_desc']);
      $('.cls-status-pegawai-cc').append($('<option>', {
       value: this['empl_status_code'],
       text: this['empl_status_desc'] + ' - ' + this['empl_status_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}

//dropdown pilih alamat perorangan//
function getCustAddress() {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_Cust_address",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-jenis-alamat-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['cust_address_desc']);
      $('.cls-jenis-alamat-cc').append($('<option>', {
       value: this['cust_address_code'],
       text: this['cust_address_code'] + ' - ' + this['cust_address_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}

//dropdown pilih ocupation//
function getOccupation2() {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_Occupation_id",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-pekerjaan-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['ocpt_desc']);
      $('.cls-pekerjaan-cc').append($('<option>', {
       value: this['ocpt_id'],
       text: this['ocpt_id'] + ' - ' + this['ocpt_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}

//-dropdown pilih Title/Gelar-//
function getTitle() {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_Title_id",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-title-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['title_desc']);
      $('.cls-title-cc').append($('<option>', {
       value: this['title_id'],
       text: this['title_id'] + ' - ' + this['title_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}


function getNationality() {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_nationality",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-nationality-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['title_desc']);
      $('.cls-nationality-cc').append($('<option>', {
       value: this['nationality_code'],
       text: this['nationality_code'] + ' - ' + this['nationality_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}

//dropdown select Relationship//
function getRelationship() {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_Relationship",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-status-hubungan-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['relation_desc']);
      $('.cls-status-hubungan-cc').append($('<option>', {
       value: this['relation_code'],
       text: this['relation_code'] + ' - ' + this['relation_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}

//dropdown select religion//
function getReligion() {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_Religion",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-agama-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['religion_desc']);
      $('.cls-agama-cc').append($('<option>', {
       value: this['religion_code'],
       text: this['religion_code'] + ' - ' + this['religion_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}
//education//
function getEducation() {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_Education",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-pendidikan-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['education_desc']);
      $('.cls-pendidikan-cc').append($('<option>', {
       value: this['education_code'],
       text: this['education_code'] + ' - ' + this['education_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}

//creditcard//
function getCreditCard() {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_Credit_card",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('#slc-jenis-kartu-kredit-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['credit_card_desc']);
      $('#slc-jenis-kartu-kredit').append($('<option>', {
       value: this['credit_card_code'],
       text: this['credit_card_code'] + ' - ' + this['credit_card_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}

//company type//
function getCompanyType() {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_Company_type",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-jenis-perusahaan-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['company_type_desc']);
      $('.cls-jenis-perusahaan-cc').append($('<option>', {
       value: this['company_type_code'],
       text: this['company_type_code'] + ' - ' + this['company_type_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}

//status lokasi//
function getLocationStat() {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_Location_stat",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-status-lokasi-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['status_lokasi_usaha_desc']);
      $('.cls-status-lokasi-cc').append($('<option>', {
       value: this['status_lokasi_usaha_code'],
       text: this['status_lokasi_usaha_code'] + ' - ' + this['status_lokasi_usaha_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });

}

//lokasi usaha//
function getCompLocation() {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_Comp_location",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-lokasi-usaha-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['lokasi_usaha_desc']);
      $('.cls-lokasi-usaha-cc').append($('<option>', {
       value: this['lokasi_usaha_code'],
       text: this['lokasi_usaha_code'] + ' - ' + this['lokasi_usaha_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });
}

function getProfesi() {

 $.ajax({
  url: base_url + "Controller_customer_correction/get_Profesi",
  type: 'GET',
  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-jenis-profesi-professional-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['profesi_desc']);
      $('.cls-jenis-profesi-professional-cc').append($('<option>', {
       value: this['profesi_code'],
       text: this['profesi_code'] + ' - ' + this['profesi_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });
}

function getList_Bank() {
 $.ajax({
  url: base_url + "Controller_customer_correction/get_List_bank",
  type: 'GET',

  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('#slc-nama-bank').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['bankName']);
      $('#slc-nama-bank').append($('<option>', {
       value: this['bankCode'],
       text: this['bankCode'] + ' - ' + this['bankName']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });
}

function getJabatann() {
 $.ajax({
  url: base_url + "Controller_customer_correction/get_Jabatan",
  type: 'GET',

  success: function(response) {
   console.log(response);

   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     $('<option>').val('').html('--Silahkan pilih--').appendTo('.cls-jabatan-com-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['jabatan_desc']);
      $('.cls-jabatan-com-cc').append($('<option>', {
       value: this['jabatan_code'],
       text: this['jabatan_code'] + ' - ' + this['jabatan_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }

  },
  error: function(response) {

   console.log(response);
  }
 });
}

function getCustomertype() {
 $.ajax({
  url: base_url + "Controller_customer_correction/get_Customer_type",
  type: 'GET',
  success: function(response) {
   if (JSON.stringify(response).includes('Timeout')) {
    alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
   } else if (response) {
    try {
     console.log(response);
     $('<option>').val('').html('--Silahkan pilih--').appendTo('#inp-cust-type-cc').addClass('form-control');
     $.each(response['data'], function() {
      console.log(this['cust_type_desc']);
      $('#inp-cust-type-cc').append($('<option>', {
       value: this['cust_type_code'],
       text: this['cust_type_code'] + ' - ' + this['cust_type_desc']
      }))
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Terjadi Kesalahan !");
    }
   }

  },
  error: function(response) {
   console.log(response);
  }
 });
}
//========================================================fungsi enter=============================================================================//
$('#input-no-contract').keydown(function(e) {
 if (e.keyCode === 13 && !e.shiftKey) {
  // var no_app = $('#inp-no-aplikasi').val();
  // var no_cust = $('#inp-no-customer').val();
  e.preventDefault();
  $('#btn-search-request-cc').click();
  // var cont_no = $('#input-no-contract').val();
  // var br_id = $('#inp-branch-id-cc').val();
  // if (no_app == '' || no_cust == '') {
  //     e.preventDefault();
  //     search_cc();
  // } else {

  // }

 }
});

$('#btn-search-cc').click(function() {
 search_cc();
});
console.log($('#input-no-contract').val().length);

function search_cc() {
 if ($('#input-no-contract').val() == '') {
  alert_info('No Kontrak Harus Diisi');
 } else if ($('#input-no-contract').val().length < 12) {
  alert_info('No Kontrak Harus 12 Karakter');
 } else {
  var cont_no = $('#input-no-contract').val();
  var br_id = $('#inp-branch-id-cc').val();
  get_bycontractcc(cont_no, br_id);
 }

 console.log(fpd_no);
}
//===================================================================================================================================//
$('#button-cari-kode-pos-holder-per').click(function() {
 var kode_pos_hold_per = $('#inp-cari-kode-pos-holder-per').val();
 cari_kode_pos(kode_pos_hold_per, table_kodepos_hold_per);

});

$('#button-cari-kode-pos-holder-ent').click(function() {
 var kode_pos_hold_ent = $('#inp-cari-kode-pos-holder-ent').val();
 cari_kode_pos(kode_pos_hold_ent, table_kodepos_hold_ent);

});

$('#button-cari-kode-pos-pic').click(function() {
 var kode_pos_pic = $('#inp-cari-kode-pos-pic').val();
 cari_kode_pos(kode_pos_pic, table_kodepos_pic);

});

$('#button-cari-kode-pos-guarantor').click(function() {
 var kode_pos_guarantor = $('#inp-cari-kode-pos-guarantor').val();
 cari_kode_pos(kode_pos_guarantor, table_kodepos_guar);
});

$('#button-cari-kode-pos-guarantorr').click(function() {
 var kode_pos_guarantorr = $('#inp-cari-kode-pos-guarantorr').val();
 cari_kode_pos(kode_pos_guarantorr, table_kodepos_guarr);
});

$('#button-cari-kode-pos-spouse').click(function() {
 var kode_pos_spouse = $('#inp-cari-kode-pos-spouse').val();
 cari_kode_pos(kode_pos_spouse, table_kodepos_sps);

});

$('#button-cari-kode-pos-current').click(function() {
 var kode_pos_current = $('#inp-cari-kode-pos-current').val();
 cari_kode_pos(kode_pos_current, table_kodepos_curr);

});

$('#button-cari-kode-pos-occupation').click(function() {
 var kode_pos_occupation = $('#inp-cari-kode-pos-occupation').val();
 cari_kode_pos(kode_pos_occupation, table_kodepos_occp);

});

$('#button-cari-kode-pos-other').click(function() {
 var kode_pos_other = $('#inp-cari-kode-pos-other').val();
 cari_kode_pos(kode_pos_other, table_kodepos_oth);

});
//==========================================================================//
$('#button-cari-kelurahan-holder-per').click(function() {
 var kelurahan_hold_per = $('#inp-cari-kelurahan-holder-per').val().toUpperCase();
 cari_kelurahan(kelurahan_hold_per, table_kelurahan_hold_per);

});

$('#button-cari-kelurahan-holder-ent').click(function() {
 var kelurahan_hold_ent = $('#inp-cari-kelurahan-holder-ent').val().toUpperCase();
 cari_kelurahan(kelurahan_hold_ent, table_kelurahan_hold_ent);

});

$('#button-cari-kelurahan-pic').click(function() {
 var kelurahan_pic = $('#inp-cari-kelurahan-pic').val().toUpperCase();
 cari_kelurahan(kelurahan_pic, table_kelurahan_pic);

});

$('#button-cari-kelurahan-guarantor').click(function() {
 var kelurahan_guarantor = $('#inp-cari-kelurahan-guarantor').val().toUpperCase();
 cari_kelurahan(kelurahan_guarantor, table_kelurahan_guar);

});

$('#button-cari-kelurahan-guarantorr').click(function() {
 var kelurahan_guarantorr = $('#inp-cari-kelurahan-guarantorr').val().toUpperCase();
 cari_kelurahan(kelurahan_guarantorr, table_kelurahan_guarr);

});

$('#button-cari-kelurahan-spouse').click(function() {
 var kelurahan_spouse = $('#inp-cari-kelurahan-spouse').val().toUpperCase();
 cari_kelurahan(kelurahan_spouse, table_kelurahan_sps);

});

$('#button-cari-kelurahan-current').click(function() {
 var kelurahan_current = $('#inp-cari-kelurahan-current').val().toUpperCase();
 cari_kelurahan(kelurahan_current, table_kelurahan_curr);

});

$('#button-cari-kelurahan-occupation').click(function() {
 var kelurahan_occupation = $('#inp-cari-kelurahan-occupation').val().toUpperCase();
 cari_kelurahan(kelurahan_occupation, table_kelurahan_occp);

});

$('#button-cari-kelurahan-other').click(function() {
 var kelurahan_other = $('#inp-cari-kelurahan-other').val().toUpperCase();
 cari_kelurahan(kelurahan_other, table_kelurahan_oth);

});
//=========================================================================================================================//


// $('.btn-cari-kelurahan').click(function() {
//     cari_kelurahan();
// });

function cari_kode_pos(kode_pos, datatable) {

 $.ajax({
  url: "Controller_customer_correction/cari_kode_pos",
  type: 'POST',
  dataType: 'json',
  data: {
   "data": kode_pos
  },
  success: function(response) {
   console.log(response);
   datatable.clear().draw();
   if (response['status']) {
    $.each(response['data'], function() {
     datatable.row.add([
      this['zip_code'],
      this['kel_name'],
      this['kec_name'],
      this['kab_name'],
      this['prov_name'],
      this['kel_id'],
      this['kec_id'],
      this['kab_id'],
      this['prov_id']
     ]).draw(false);
    });
   } else {
    alert_error("Data Tidak Ditemukan");
   }
  },
  error: function(response) {
   console.log(response);
  }
 });
}

function cari_kelurahan(kelurahan_name, datatables) {
 $.ajax({
  url: "Controller_customer_correction/cari_kelurahan",
  type: 'POST',
  dataType: 'json',
  data: {
   "data": kelurahan_name
  },
  success: function(response) {
   //debugger;
   console.log(response);
   datatables.clear().draw();
   if (response['status']) {
    $.each(response['data'], function() {
     datatables.row.add([
      this['zip_code'],
      this['kel_name'],
      this['kec_name'],
      this['kab_name'],
      this['prov_name'],
      this['kel_id'],
      this['kec_id'],
      this['kab_id'],
      this['prov_id']
     ]).draw(false);
    });
   } else {
    alert_error("Data Tidak Ditemukan");
   }
  },
  error: function(response) {
   console.log(response);
  }

 });
}

function getSector(datatable) {
 $.ajax({
  url: base_url + "Controller_customer_correction/get_Economic_Sector",
  type: 'GET',
  success: function(response) {
   console.log(response);
   if (response) {
    try {
     datatable.clear().draw();
     $.each(response['data'], function(index) {
      datatable.row.add([
       this['eco_sector_code'],
       this['eco_sector_desc']
      ]).draw(false);
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }
  },
  error: function(response) {
   console.log(response);
  }
 });
}

function getNature_Buss(datatable) {
 $.ajax({
  url: base_url + "Controller_customer_correction/get_Nature_of_Buss",
  type: 'GET',
  success: function(response) {
   console.log(response);
   if (response) {
    try {
     datatable.clear().draw();
     $.each(response['data'], function(index) {
      datatable.row.add([
       this['nature_of_buss_code'],
       this['nature_of_buss_desc']
      ]).draw(false);
     });
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }
  },
  error: function(response) {
   console.log(response);
  }
 });
}


function get_data_cc() {
   var contract_no = $('#input-no-contract').val();
 var tipe_debitur = $('#inp-cust-type-cc :selected').val();
 var arrayData = [];
 var branch_code = $('#branch-id-cc').html();
 var no_permohonan = $('#inp-no-permohonan-cc').val();
 var flag = 1;

 arrayData.push({
  contract_no,
  tipe_debitur,
  branch_code,
  no_permohonan,
  flag
 });

 $.ajax({
  url: base_url +
   "Controller_customer_correction/getDataCustomer",
  type: 'POST',
  data: {
   arrayData
  },
  success: function(response) {
   console.log(response);
   // debugger;
   var
    array = [];
   if (response) {
    //debugger;
    try {
     fpd_no = response['DataAplikasi'][0].fpd_no;
     var customer_type = response['DataAplikasi'][0].cust_type;
     console.log(fpd_no);
     if (response['DataAplikasi'][0].pesan == null) {
      $('#inp-cust-type-cc').prop('disabled', true);
      $('#inp-cust-type-cc').val(customer_type);
      $('#simpan-koreksi-cc').prop('disabled', false);
      $('.disabel').prop('disabel', false);
      $('#slc-status-hubungan-other2').prop('disabled', true);
      $('#slc-alasan-status-hubungan-other').prop('disabled', true);
      if (customer_type == 'PER') {
       $('#PER').show();
       $('#COM').hide();
      } else {
       $('#PER').hide();
       $('#COM').show();

      }

      //aplikasi
      $('#inp-no-aplikasi').val(response['DataAplikasi'][0].application_no);
      $('#inp-no-customer').val(response['DataAplikasi'][0].customer_no);
      $('#inp-entry-date').val(response['DataAplikasi'][0].application_date);
      $('#inp-order-date').val(response['DataAplikasi'][0].date_confirm);
      $('#inp-dealer-cc').val(response['DataAplikasi'][0].supplier_name);  

      if (customer_type === 'PER') {
       //personal
       var per = response['DataPersonal'];
       if (per.length > 0) {
        $('#id-type-per').val(response['DataPersonal'][0].id_type);
        $('#inp-id-no-per').val(response['DataPersonal'][0].id_no);
        $('#inp-tgl-id-per').val(response['DataPersonal'][0].id_date);
        $('#inp-exp-id-date-per').val(response['DataPersonal'][0].id_exp_date);
        $('#inp-nama-awal-per').val(response['DataPersonal'][0].customer_name);
        $('#inp-alias-per').val(response['DataPersonal'][0].customer_alias_name);
        $('#slc-jenis-kelamin-per').val(response['DataPersonal'][0].sex_type);
        $('#inp-gelar-per').val(response['DataPersonal'][0].tittle);
        $('#inp-tempat-lahir-per').val(response['DataPersonal'][0].birth_place);
        $('#inp-tanggal-lahir-per').val(response['DataPersonal'][0].birth_date);
        $('#id-type-per').val(response['DataPersonal'][0].id_type);
        $('#inp-job-per').val(response['DataPersonal'][0].occupation_id);
        $('#slc-status-pernikahan-per').val(response['DataPersonal'][0].marital_status);
        $('#slc-agama-per').val(response['DataPersonal'][0].religion_id);
        $('#inp-rtrw-per').val(response['DataPersonal'][0].rt_rw);
        $('#inp-alamat-per').val(response['DataPersonal'][0].address_name);
        $('#inp-kode-pos-alamat-per').val(response['DataPersonal'][0].zip_code);
        $('#inp-kelurahan-alamat-per').val(response['DataPersonal'][0].kelurahan_name);
        $('#inp-kelurahan-alamat-per-id').val(response['DataPersonal'][0].kelurahan_id);
        $('#inp-kecamatan-alamat-per').val(response['DataPersonal'][0].kecamatan_name);
        $('#inp-kecamatan-alamat-per-id').val(response['DataPersonal'][0].kecamatan_id);
        $('#inp-kabupaten-alamat-per').val(response['DataPersonal'][0].kabupaten_name);
        $('#inp-kabupaten-alamat-per-id').val(response['DataPersonal'][0].kab_kota_id);
        $('#inp-provinsi-alamat-per').val(response['DataPersonal'][0].provinsi_name);
        $('#inp-provinsi-per-id').val(response['DataPersonal'][0].provinsi_id);
        $('#inp-sub-kode-pos-alamat-per').val(response['DataPersonal'][0].subzipcode);
        $('#inp-npwp-other').val(response['DataPersonal'][0].npwp_no);
        //familycard
        $('#inp-ibu-kandung-kk').val(response['DataPersonal'][0].mother_maiden_name);
        $('#inp-jml-tanggung-kk').val(response['DataPersonal'][0].no_of_dependents);
        $('#inp-education-kk').val(response['DataPersonal'][0].education_id);
        $('#inp-nationality-kk').val(response['DataPersonal'][0].nationality_id);
       }
       //document
       tabel_doc.clear().draw();
       for (var i = 0; i < response['DataDocument'].length; i++) {
        array.push([
         response['DataDocument'][i].doc_code,
         response['DataDocument'][i].doc_name,
         response['DataDocument'][i].receive_date
        ]);
       }
       tabel_doc.rows.add(array).draw();
       //spouse
       var sps = response['DataSpouse'];
       if (sps.length > 0) {

        $('#id-type-spouse').val(response['DataSpouse'][0].fml_idtype);
        $('#inp-id-no-spouse').val(response['DataSpouse'][0].fml_idno);
        $('#inp-tgl-id-spouse').val(response['DataSpouse'][0].fml_iddate);
        $('#inp-exp-id-date-spouse').val(response['DataSpouse'][0].fml_expdate);
        $('#inp-nama-awal-spouse').val(response['DataSpouse'][0].fml_name);
        $('#inp-alias-spouse').val(response['DataSpouse'][0].fml_aname);
        $('#inp-gelar-spouse').val(response['DataSpouse'][0].fml_title);
        $('#inp-no-telp-spouse').val(response['DataSpouse'][0].fml_phone);
        $('#inp-no-hp-spouse').val(response['DataSpouse'][0].fml_hpno);
        $('#slc-jenis-kelamin-spouse').val(response['DataSpouse'][0].fml_gender);
        $('#inp-tempat-lahir-spouse').val(response['DataSpouse'][0].fml_birthplace);
        $('#inp-tanggal-lahir-spouse').val(response['DataSpouse'][0].fml_datebirth);
        $('#slc-status-nikahan-spouse').val(response['DataSpouse'][0].fml_marital);
        $('#inp-job-spouse').val(response['DataSpouse'][0].fml_occupation);
        $('#slc-agama-spouse').val(response['DataSpouse'][0].fml_religi);
        $('#inp-kode-pos-alamat-spouse').val(response['DataSpouse'][0].fml_zipcode);
        $('#inp-rtrw-spouse').val(response['DataSpouse'][0].fml_rt);
        $('#inp-rw-spouse').val(response['DataSpouse'][0].fml_rw);
        $('#inp-kode-pos-alamat-spouse').val(response['DataSpouse'][0].fml_zipcode);
        $('#inp-is-emergency-spouse').val(response['DataSpouse'][0].fml_isemergency);
        $('#inp-is-relation-spouse').val(response['DataSpouse'][0].fml_relation);

        $('#inp-kelurahan-alamat-spouse-id').val(response['DataSpouse'][0].fml_kelurahan);
        if ($('#inp-kelurahan-alamat-spouse-id').val() === "" || $('#inp-kelurahan-alamat-spouse-id').val() === "null") {
         $('#inp-kelurahan-alamat-spouse-id').val("");
        }

        $('#inp-kelurahan-alamat-spouse').val(response['DataSpouse'][0].fml_kelurahan_name);
        if ($('#inp-kelurahan-alamat-spouse').val() === "" || $('#inp-kelurahan-alamat-spouse').val() === "null") {
         $('#inp-kelurahan-alamat-spouse').val("");
        }

        $('#inp-kecamatan-alamat-spouse').val(response['DataSpouse'][0].fml_kecamatan_name);
        if ($('#inp-kecamatan-alamat-spouse').val() === "" || $('#inp-kecamatan-alamat-spouse').val() === "null") {
         $('#inp-kecamatan-alamat-spouse').val("");
        }

        $('#inp-kabupaten-alamat-spouse').val(response['DataSpouse'][0].fml_kabupaten_name);
        if ($('#inp-kabupaten-alamat-spouse').val() === "" || $('#inp-kabupaten-alamat-spouse').val() === "null") {
         $('#inp-kabupaten-alamat-spouse').val("");
        }

        $('#inp-provinsi-alamat-spouse').val(response['DataSpouse'][0].fml_provinsi_name);
        if ($('#inp-provinsi-alamat-spouse').val() === "" || $('#inp-provinsi-alamat-spouse').val() === "null") {
         $('#inp-provinsi-alamat-spouse').val("");
        }

        $('#inp-sub-kode-pos-alamat-spouse').val(response['DataSpouse'][0].fml_subzip);
        $('#inp-alamat-spouse').val(response['DataSpouse'][0].fml_addname);
        //familycard
        $('#inp-no-kk').val(response['DataSpouse'][0].fml_familycard);
        $('#inp-education-spouse-kk').val(response['DataSpouse'][0].fml_education);
       }

        // if ($('#slc-status-pernikahan-per').val() === '01'  && $('#inp-is-emergency-spouse').val() !== '1'){
        //    $('.cls-identitas-spouse').show();
        //    $('.tab-other').prop('disabled', false);

        // } else if ($('#slc-status-pernikahan-per').val() === '01' && $('#inp-is-emergency-spouse').val() === '1'){
        //     $('.cls-identitas-spouse').show();
        //     $('.tab-other').prop('disabled', true);
        // } else {
        //     $('.cls-identitas-spouse').hide();
        //     $('#inp-jml-tanggung-kk2').prop('disabled', true);
        //     $('#inp-education-spouse-kk2').prop('disabled', true);
        //     $('#slc-alasan-education-spouse-kk').prop('disabled', true);
        // }

       var addr = response['DataCurAddr'];
       if (addr.length > 0) {
        //currentAddr
        $('#inp-alamat-resident').val(response['DataCurAddr'][0].address_name);
        $('#inp-rtrw-resident').val(response['DataCurAddr'][0].rt_rw);
        $('#inp-kode-pos-alamat-resident').val(response['DataCurAddr'][0].zip_code);
        $('#inp-kelurahan-alamat-resident').val(response['DataCurAddr'][0].kelurahan_name);
        $('#inp-kecamatan-alamat-resident').val(response['DataCurAddr'][0].kecamatan_name);
        $('#inp-kabupaten-alamat-resident').val(response['DataCurAddr'][0].kabupaten_name);
        $('#inp-provinsi-alamat-resident').val(response['DataCurAddr'][0].provinsi_name);
        $('#inp-kelurahan-alamat-resident-id').val(response['DataCurAddr'][0].kelurahan_id);
        $('#inp-kecamatan-alamat-resident-id').val(response['DataCurAddr'][0].kecamatan_id);
        $('#inp-kabupaten-alamat-resident-id').val(response['DataCurAddr'][0].kab_kota_id);
        $('#inp-provinsi-alamat-resident-id').val(response['DataCurAddr'][0].provinsi_id);
        $('#inp-telepon-resident').val(response['DataCurAddr'][0].phone_no);
        $('#inp-hanphone-resident').val(response['DataCurAddr'][0].handphone_no);
        $('#inp-fax-resident').val(response['DataCurAddr'][0].fax_no);
        $('#inp-email-resident').val(response['DataCurAddr'][0].email);
       }
       var occp = response['DataOccp'];
       if (occp.length > 0) {
        //occupation
        $('#inp-nama-perusahaan-occp').val(response['DataOccp'][0].empl_name);
        $('#slc-jenis-perusahaan-occp').val(response['DataOccp'][0].empl_type);
        $('#inp-sector-economi-occp').val(response['DataOccp'][0].empl_eco_sect_name);
        $('#inp-lapangan-usaha-occp').val(response['DataOccp'][0].empl_nob_name);
        $('#slc-fasilitas-perusahaan-occp').val(response['DataOccp'][0].empl_facility);
        $('#inp-bisnis-lain-occp').val(response['DataOccp'][0].empl_otherbuss);
        $('#slc-posisi-kerja-occp').val(response['DataOccp'][0].empl_jobposition);
        $('#inp-atasan-langsung-occp').val(response['DataOccp'][0].empl_headname);
        $('#inp-total-pegawai-occp').val(response['DataOccp'][0].empl_total_empl);
        $('#inp-lama-usaha-occp').val(response['DataOccp'][0].empl_nyow);
        $('#slc-status-pegawai-occp').val(response['DataOccp'][0].empl_stat_code);
        $('#inp-alamat-occp').val(response['DataOccp'][0].address_name);
        $('#inp-rtrw-alamat-occp').val(response['DataOccp'][0].rt_rw);
        $('#inp-kode-pos-occp').val(response['DataOccp'][0].zip_code);
        $('#inp-kelurahan-occp').val(response['DataOccp'][0].kelurahan_name_job);
        $('#inp-kecamatan-occp').val(response['DataOccp'][0].kecamatan_name_job);
        $('#inp-kabupaten-occp').val(response['DataOccp'][0].kab_kota_name_job);
        $('#inp-provinsi-occp').val(response['DataOccp'][0].provinsi_name_job);
        $('#inp-kelurahan-id-occp').val(response['DataOccp'][0].kelurahan_id_job);
        $('#inp-kecamatan-id-occp').val(response['DataOccp'][0].kecamatan_id_job);
        $('#inp-kabupaten-id-occp').val(response['DataOccp'][0].kab_kota_id_job);
        $('#inp-provinsi-id-occp').val(response['DataOccp'][0].provinsi_id_job);
        $('#inp-telepon-occp').val(response['DataOccp'][0].phone_no);
        $('#inp-fax-occp').val(response['DataOccp'][0].fax_no);
        $('#inp-email-occp').val(response['DataOccp'][0].email);
        $('#inp-tipe-occp-flag').val(response['DataOccp'][0].flag_occupation);
       }
       //other
       var oth = response['DataOther']
       if (oth.length > 0) {
        $('#slc-jenis-alamat-other').val(response['DataOther'][0].fml_addid);
        /*$('#inp-no-resi-other').val(response['DataOther'][0].com_type);
        $('#inp-tgl-resi-other').val(response['DataOther'][0].com_type);*/
        //-//
        //$('#inp-no-kk').val(response['DataOther'][0].fml_familycard); 
        $('#inp-nama-lengkap-other').val(response['DataOther'][0].fml_name);
        $('#inp-alias-other').val(response['DataOther'][0].fml_aname);
        $('#inp-gelar-other').val(response['DataOther'][0].fml_title);
        $('#inp-rtrw-other').val(response['DataOther'][0].fml_rt);
        $('#inp-rw-other').val(response['DataOther'][0].fml_rw);
        $('#inp-kode-pos-other').val(response['DataOther'][0].fml_zipcode);
        $('#inp-alamat-other').val(response['DataOther'][0].fml_addname);

        $('#inp-kelurahan-alamat-other-id').val(response['DataOther'][0].fml_kelurahan);
        if ($('#inp-kelurahan-alamat-other-id').val() === "" || $('#inp-kelurahan-alamat-other-id').val() === "null") {
         $('#inp-kelurahan-alamat-other-id').val("");
        }

        $('#inp-kelurahan-alamat-other').val(response['DataOther'][0].fml_kelurahan_name);
        if ($('#inp-kelurahan-alamat-other').val() === "" || $('#inp-kelurahan-alamat-other').val() === "null") {
         $('#inp-kelurahan-alamat-other').val("");
        }

        $('#inp-kecamatan-alamat-other').val(response['DataOther'][0].fml_kecamatan_name);
        if ($('#inp-kecamatan-alamat-other').val() === "" || $('#inp-kecamatan-alamat-other').val() === "null") {
         $('#inp-kecamatan-alamat-other').val("");
        }

        $('#inp-kabupaten-alamat-other').val(response['DataOther'][0].fml_kabupaten_name);
        if ($('#inp-kabupaten-alamat-other').val() === "" || $('#inp-kabupaten-alamat-other').val() === "null") {
         $('#inp-kabupaten-alamat-other').val("");
        }

        $('#inp-provinsi-alamat-other').val(response['DataOther'][0].fml_provinsi_name);
        if ($('#inp-provinsi-alamat-other').val() === "" || $('#inp-provinsi-alamat-other').val() === "null") {
         $('#inp-provinsi-alamat-other').val("");
        }
        $('#inp-telepon-other').val(response['DataOther'][0].fml_phone);
        $('#inp-hanphone-other').val(response['DataOther'][0].fml_hpno);
        $('#slc-status-hubungan-other').val(response['DataOther'][0].fml_relation);
        $('#inp-is-emergency-oth').val(response['DataOther'][0].fml_isemergency);

         if ($('#inp-is-emergency-spouse').val() === '1' && $('#inp-is-relation-spouse').val() === '04') {
        $('#inp-no-kk').val(response['DataSpouse'][0].fml_familycard);
       } if(response['DataOther'][0].fml_familycard != null) {
        $('#inp-no-kk').val(response['DataOther'][0].fml_familycard);
       }
     }
       //guarantor
       var guar = response['DataGuarantor']
       if (guar.length > 0) {
        $('#inp-no-penjamin').val(response['DataGuarantor'][0].gua_no);
        $('#slc-jenis-identitas-penjamin').val(response['DataGuarantor'][0].gua_idtype);
        $('#inp-no-identitas-penjamin').val(response['DataGuarantor'][0].gua_idno);
        $('#inp-issued-date-penjamin').val(response['DataGuarantor'][0].gua_iddate);
        $('#inp-expired-date-penjamin').val(response['DataGuarantor'][0].gua_expdate);
        $('#inp-fname-penjamin').val(response['DataGuarantor'][0].gua_fname);
        $('#inp-lname-penjamin').val(response['DataGuarantor'][0].gua_lname);
        $('#inp-alias-penjamin').val(response['DataGuarantor'][0].gua_alias);
        $('#inp-gelar-penjamin').val(response['DataGuarantor'][0].gua_title);
        $('#inp-tempat-lahir-penjamin').val(response['DataGuarantor'][0].gua_bornplc);
        $('#inp-tanggal-lahir-penjamin').val(response['DataGuarantor'][0].gua_borndate);
        $('#slc-jenis-kelamin-penjamin').val(response['DataGuarantor'][0].gua_gender);
        $('#slc-agama-penjamin').val(response['DataGuarantor'][0].gua_religi);
        $('#slc-pekerjaan-penjamin').val(response['DataGuarantor'][0].gua_occp);
        $('#slc-status-pernikahan-penjamin').val(response['DataGuarantor'][0].gua_mrtl);
        $('#inp-rtrw-penjamin').val(response['DataGuarantor'][0].gua_rtrw);
        $('#inp-kode-pos-alamat-penjamin').val(response['DataGuarantor'][0].gua_zipcode);
        $('#inp-alamat-penjamin').val(response['DataGuarantor'][0].gua_addr);

        $('#inp-kelurahan-alamat-penjamin').val(response['DataGuarantor'][0].gua_kelu_name);
        if ($('#inp-kelurahan-alamat-penjamin').val() === "" || $('#inp-kelurahan-alamat-penjamin').val() === "null") {
         $('#inp-kelurahan-alamat-penjamin').val("");
        }

        $('#inp-kecamatan-alamat-penjamin').val(response['DataGuarantor'][0].gua_keca_name);
        if ($('#inp-kecamatan-alamat-penjamin').val() === "" || $('#inp-kecamatan-alamat-penjamin').val() === "null") {
         $('#inp-kecamatan-alamat-penjamin').val("");
        }

        $('#inp-kabupaten-alamat-penjamin').val(response['DataGuarantor'][0].gua_kabkot_name);
        if ($('#inp-kabupaten-alamat-penjamin').val() === "" || $('#inp-kabupaten-alamat-penjamin').val() === "null") {
         $('#inp-kabupaten-alamat-penjamin').val("");
        }

        $('#inp-provinsi-alamat-penjamin').val(response['DataGuarantor'][0].gua_prov_name);
        if ($('#inp-provinsi-alamat-penjamin').val() === "" || $('#inp-provinsi-alamat-penjamin').val() === "null") {
         $('#inp-provinsi-alamat-penjamin').val("");
        }

        $('#inp-email-penjamin').val(response['DataGuarantor'][0].gua_email);
        $('#inp-hanphone-penjamin').val(response['DataGuarantor'][0].gua_nohp);
        $('#inp-telepon-penjamin').val(response['DataGuarantor'][0].gua_notelp);
        $('#status-hubungan-penjamin').val(response['DataGuarantor'][0].gua_relati);
       }
     

       if ($('#slc-status-pernikahan-per').val() === '01'  && $('#inp-is-emergency-spouse').val() !== '1'){
           $('.cls-identitas-spouse').show();
           $('.tab_sps1').prop('disabled', true);
           $('.tab_sps').prop('disabled', false);
           $('.slc-alasan-alamat-sps').prop('disabled', false);
           
        } else if ($('#slc-status-pernikahan-per').val() === '01' && $('#inp-is-emergency-spouse').val() === '1'){
            $('.cls-identitas-spouse').show();
            $('.tab_sps').prop('disabled', true);
            $('.slc-alasan-alamat-sps').prop('disabled', true);
            //$('.tab_sps1').val("");
        }
        // else if ($('#slc-status-pernikahan-per').val() === '02'){
        //     $('.cls-identitas-spouse').hide();
        //     $('.tab-other').prop('disabled', true);
        // }
        else {
            $('.tab_sps').prop('disabled', true);
            $('#inp-jml-tanggung-kk2').prop('disabled', true);
            $('#slc-alasan-jml-tanggung-kk').prop('disabled', true);
            $('#inp-education-spouse-kk2').prop('disabled', true);
            $('#slc-alasan-education-spouse-kk').prop('disabled', true);

        }

        if ($('#inp-is-emergency-spouse').val() === "1" || $('#inp-is-emergency-oth').val() === "1"){ 
          $('#inp-no-kk2').prop('disabled', false);
          $('#slc-alasan-no-kk').prop('disabled', false);
          $('.tab_oth').prop('disabled', false);
        } else if ($('#inp-is-emergency-spouse').val() === "" && $('#inp-is-emergency-oth').val() === "" || $('#inp-is-emergency-spouse').val() === "null" && $('#inp-is-emergency-oth').val() === "null"){
          $('#inp-no-kk2').prop('disabled', true);
          $('#slc-alasan-no-kk').prop('disabled', true);
          $('.tab_oth').prop('disabled', true);
        }

//     $('#slc-pekerjaan').on('change', function() {
//     var select_pekerjaan = $('#inp-job-per').val();
//     console.log(select_pekerjaan);
//     if (select_pekerjaan == '036' || select_pekerjaan == '009' || select_pekerjaan == '037' || select_pekerjaan == '014' || select_pekerjaan == '010' || select_pekerjaan == '021' || select_pekerjaan == '030' || select_pekerjaan == '026' || select_pekerjaan == '029' || select_pekerjaan == '004' || select_pekerjaan == '005' || select_pekerjaan == '006' || select_pekerjaan == '001' || select_pekerjaan == '002' || select_pekerjaan == '003' || select_pekerjaan == '007' || select_pekerjaan == '008' || select_pekerjaan == '019' || select_pekerjaan == '032' || select_pekerjaan == '035' || select_pekerjaan == '031' || select_pekerjaan == '012' || select_pekerjaan == '011' || select_pekerjaan == '034' || select_pekerjaan == '099') {
//         $('#block-pekerjaan-professional').hide();
//         $('#block-pekerjaan-wiraswasta').hide();
//         $('#block-pekerjaan-karyawan').show();
//     } else if (select_pekerjaan == '017' || select_pekerjaan == '016' || select_pekerjaan == '013' || select_pekerjaan == '028' || select_pekerjaan == '015' || select_pekerjaan == '033') {
//         $('#block-pekerjaan-karyawan').hide();
//         $('#block-pekerjaan-professional').hide();
//         $('#block-pekerjaan-wiraswasta').show();
//     } else if (select_pekerjaan == '022' || select_pekerjaan == '023' || select_pekerjaan == '018' || select_pekerjaan == '020' || select_pekerjaan == '024' || select_pekerjaan == '027' || select_pekerjaan == '025') {
//         $('#block-pekerjaan-karyawan').hide();
//         $('#block-pekerjaan-professional').show();
//         $('#block-pekerjaan-wiraswasta').hide();
//     }
// });

    // $('#slc-pekerjaan').on('change', function() {
    var select_pekerjaan = $('#inp-tipe-occp-flag').val();
    console.log("Tipe Pekerjaan "+select_pekerjaan);
    if (select_pekerjaan == '03') {
        $('.cls-occp-cuscor').prop('disabled', false);
    } else {
        $('.cls-occp-cuscor').prop('disabled', true);
    }
// });

      } else {
       var com = response['DataCompany'];
       if (com.length > 0) {
        //perusahaan
        $('#slc-jenis-perusahaan').val(response['DataCompany'][0].com_type);
        $('#slc-bentuk-perusahaan2').val(response['DataCompany'][0].buss_type);
        $('#inp-nama-perusahaan').val(response['DataCompany'][0].cust_name_com);
        $('#inp-alamat-perusahaan').val(response['DataCompany'][0].addr);
        $('#inp-rtrw-alamat-perusahaan').val(response['DataCompany'][0].rtrw);
        $('#inp-kode-pos-alamat-perusahaan').val(response['DataCompany'][0].zipcode);

        $('#inp-kelurahan-alamat-perusahaan').val(response['DataCompany'][0].kelu_name);
        if ($('#inp-kelurahan-alamat-perusahaan').val() === "" || $('#inp-kelurahan-alamat-perusahaan').val() === "null") {
         $('#inp-kelurahan-alamat-perusahaan').val("");
        }

        $('#inp-kecamatan-alamat-perusahaan').val(response['DataCompany'][0].keca_name);
        if ($('#inp-kecamatan-alamat-perusahaan').val() === "" || $('#inp-kecamatan-alamat-perusahaan').val() === "null") {
         $('#inp-kecamatan-alamat-perusahaan').val("");
        }

        $('#inp-kabupaten-alamat-perusahaan').val(response['DataCompany'][0].kab_name);
        if ($('#inp-kabupaten-alamat-perusahaan').val() === "" || $('#inp-kabupaten-alamat-perusahaan').val() === "null") {
         $('#inp-kabupaten-alamat-perusahaan').val("");
        }

        $('#inp-provinsi-alamat-perusahaan').val(response['DataCompany'][0].prov_name);
        if ($('#inp-provinsi-alamat-perusahaan').val() === "" || $('#inp-provinsi-alamat-perusahaan').val() === "null") {
         $('#inp-provinsi-alamat-perusahaan').val("");
        }

        $('#inp-telp-alamat-perusahaan').val(response['DataCompany'][0].phone);
        $('#inp-subkode-pos-alamat-perusahaan').val(response['DataCompany'][0].subzipcode);
        $('#inp-fax-alamat-perusahaan').val(response['DataCompany'][0].fax);
        $('#inp-email-perusahaan').val(response['DataCompany'][0].email);
        $('#inp-no-akte-perusahaan').val(response['DataCompany'][0].notary_no);
        $('#inp-tgl-pendirian-perusahaan').val(response['DataCompany'][0].notary_date);
        $('#inp-email-perusahaan').val(response['DataCompany'][0].email);
        $('#inp-no-npwp-perusahaan').val(response['DataCompany'][0].npwp_no);
        $('#inp-no-siup-perusahaan').val(response['DataCompany'][0].siupno);
        $('#inp-tgl-siup-perusahaan').val(response['DataCompany'][0].siupdate);
        $('#inp-no-tdp-perusahaan').val(response['DataCompany'][0].tdpno);
        $('#inp-tgl-tdp-perusahaan').val(response['DataCompany'][0].tdpdate);
        $('#inp-tgl-akta-perusahaan').val(response['DataCompany'][0].akta_date);
        $('#inp-sektor-ekonomi-perusahaan').val(response['DataCompany'][0].sect_eco_name);
        $('#inp-lapangan-usaha-perusahaan').val(response['DataCompany'][0].nature_buss_name);
        $('#inp-sektor-ekonomi-id-perusahaan').val(response['DataCompany'][0].sect_eco);
        $('#inp-lapangan-usaha-id-perusahaan').val(response['DataCompany'][0].nature_buss);
        $('#inp-lama-usaha').val(response['DataCompany'][0].nyob);
        $('#inp-total-pegawai').val(response['DataCompany'][0].no_emp);
        $('#slc-public-perusahaan').val(response['DataCompany'][0].go_public);
        $('#slc-milik-tmpt').val(response['DataCompany'][0].comown);
        $('#slc-status-lokasi').val(response['DataCompany'][0].buss_loct);
       }

       tabel_doc2.clear().draw();
       for (var i = 0; i < response['DataDocument'].length; i++) {
        array.push([
         response['DataDocument'][i].doc_code,
         response['DataDocument'][i].doc_name,
         response['DataDocument'][i].receive_date
        ]);
       }
       tabel_doc2.rows.add(array).draw();

       var holdpri = response['DataHolderPer'];
       if (holdpri.length > 0) {
        //holder per
        $('#id-type-holder-pri').val(response['DataHolderPer'][0].hold_idtype);
        $('#inp-id-no-holder-pri').val(response['DataHolderPer'][0].hold_idno);
        $('#inp-tgl-id-holder-pri').val(response['DataHolderPer'][0].hold_iddate);
        $('#inp-exp-date-holder-pri').val(response['DataHolderPer'][0].hold_expdate);
        $('#inp-nama-awal-holder-pri').val(response['DataHolderPer'][0].hold_fname);
        $('#inp-nama-akhir-holder-pri').val(response['DataHolderPer'][0].hold_lname);
        $('#inp-alias-holder-pri').val(response['DataHolderPer'][0].hold_alias);
        $('#inp-gelar-holder-pri').val(response['DataHolderPer'][0].hold_title);
        $('#inp-tempat-lahir-holder-pri').val(response['DataHolderPer'][0].hold_bornplc);
        $('#inp-tanggal-lahir-holder-pri').val(response['DataHolderPer'][0].hold_borndate);
        $('#slc-jenis-kelamin-holder-pri').val(response['DataHolderPer'][0].hold_gender);
        $('#slc-agama-holder-pri').val(response['DataHolderPer'][0].hold_religi);
        $('#slc-status-pernikahan-holder-pri').val(response['DataHolderPer'][0].hold_marital);
        $('#inp-rtrw-holder-pri').val(response['DataHolderPer'][0].hold_rtrw);
        $('#inp-rw-holder-pri').val(response['DataHolderPer'][0].hold_rw);
        $('#inp-kodepos-holder-pri').val(response['DataHolderPer'][0].hold_zipcode);
        $('#inp-alamat-holder-pri').val(response['DataHolderPer'][0].hold_addr);

        $('#inp-kelurahan-alamat-holder-pri').val(response['DataHolderPer'][0].hold_kelu_name);
        if ($('#inp-kelurahan-alamat-holder-pri').val() === "" || $('#inp-kelurahan-alamat-holder-pri').val() === "null") {
         $('#inp-kelurahan-alamat-holder-pri').val("");
        }

        $('#inp-kelurahan-alamat-holder-pri-id').val(response['DataHolderPer'][0].hold_kelu);
        if ($('#inp-kelurahan-alamat-holder-pri-id').val() === "" || $('#inp-kelurahan-alamat-holder-pri-id').val() === "null") {
         $('#inp-kelurahan-alamat-holder-pri-id').val("");
        }

        $('#inp-kecamatan-alamat-holder-pri').val(response['DataHolderPer'][0].hold_keca_name);
        if ($('#inp-kecamatan-alamat-holder-pri').val() === "" || $('#inp-kecamatan-alamat-holder-pri').val() === "null") {
         $('#inp-kecamatan-alamat-holder-pri').val("");
        }

        $('#inp-kabupaten-alamat-holder-pri').val(response['DataHolderPer'][0].hold_kabkot_name);
        if ($('#inp-kabupaten-alamat-holder-pri').val() === "" || $('#inp-kabupaten-alamat-holder-pri').val() === "null") {
         $('#inp-kabupaten-alamat-holder-pri').val("");
        }

        $('#inp-provinsi-alamat-holder-pri').val(response['DataHolderPer'][0].hold_prov_name);
        if ($('#inp-provinsi-alamat-holder-pri').val() === "" || $('#inp-provinsi-alamat-holder-pri').val() === "null") {
         $('#inp-provinsi-alamat-holder-pri').val("");
        }

        $('#inp-npwp-holder-pri').val(response['DataHolderPer'][0].hold_npwp);
        $('#inp-telepon-holder-pri').val(response['DataHolderPer'][0].hold_notelp);
        $('#inp-hanphone-holder-pri').val(response['DataHolderPer'][0].hold_nohp);
        $('#inp-fax-holder-pri').val(response['DataHolderPer'][0].hold_fax);
        $('#inp-email-holder-pri').val(response['DataHolderPer'][0].hold_email);
        $('#inp-share-holder-pri').val(response['DataHolderPer'][0].hold_share);
        $('#inp-jabatan-holder-pri').val(response['DataHolderPer'][0].hold_occupation);
       }
       var holdent = response['DataHolderEnt'];
       if (holdent.length > 0) {
        //holder ent
        $('#id-comtype-holder-ent').val(response['DataHolderEnt'][0].hold_company_type);
        $('#inp-comname-holder-ent').val(response['DataHolderEnt'][0].hold_company_name);
        $('#inp-bentuk-holder-ent').val(response['DataHolderEnt'][0].hold_company_prof_code);
        $('#inp-alamat-holder-ent').val(response['DataHolderEnt'][0].hold_addr);
        $('#inp-rtrw-holder-ent').val(response['DataHolderEnt'][0].hold_rtrw);
        $('#inp-rw-holder-ent').val(response['DataHolderEnt'][0].hold_rw);
        $('#inp-kodepos-holder-ent').val(response['DataHolderEnt'][0].hold_zipcode);
        $('#inp-subkode-holder-ent').val(response['DataHolderEnt'][0].hold_subzipcode);

        $('#inp-kelurahan-holder-ent').val(response['DataHolderEnt'][0].hold_kelu_name);
        if ($('#inp-kelurahan-holder-ent').val() === "" || $('#inp-kelurahan-holder-ent').val() === "null") {
         $('#inp-kelurahan-holder-ent').val("");
        }

        $('#inp-kelurahan-alamat-holder-ent-id').val(response['DataHolderEnt'][0].hold_kelu);
        if ($('#inp-kelurahan-alamat-holder-ent-id').val() === "" || $('#inp-kelurahan-alamat-holder-ent-id').val() === "null") {
         $('#inp-kelurahan-alamat-holder-ent-id').val("");
        }

        $('#inp-kecamatan-holder-ent').val(response['DataHolderEnt'][0].hold_keca_name);
        if ($('#inp-kecamatan-holder-ent').val() === "" || $('#inp-kecamatan-holder-ent').val() === "null") {
         $('#inp-kecamatan-holder-ent').val("");
        }

        $('#inp-kabupaten-holder-ent').val(response['DataHolderEnt'][0].hold_kabkot_name);
        if ($('#inp-kabupaten-holder-ent').val() === "" || $('#inp-kabupaten-holder-ent').val() === "null") {
         $('#inp-kabupaten-holder-ent').val("");
        }

        $('#inp-provinsi-holder-ent').val(response['DataHolderEnt'][0].hold_prov_name);
        if ($('#inp-provinsi-holder-ent').val() === "" || $('#inp-provinsi-holder-ent').val() === "null") {
         $('#inp-provinsi-holder-ent').val("");
        }

        $('#inp-telepon-holder-ent').val(response['DataHolderEnt'][0].hold_notelp);
        $('#inp-fax-holder-ent').val(response['DataHolderEnt'][0].hold_fax);
        $('#inp-email-holder-ent').val(response['DataHolderEnt'][0].hold_email);
        $('#inp-estno-holder-ent').val(response['DataHolderEnt'][0].hold_establis_no);
        $('#inp-estdate-holder-ent').val(response['DataHolderEnt'][0].hold_establis_date);
        $('#inp-npwp-holder-ent').val(response['DataHolderEnt'][0].hold_npwp);
        $('#inp-share-holder-ent').val(response['DataHolderEnt'][0].hold_share);
       }
       var pic = response['DataPic'];
       if (pic.length > 0) {
        //pic
        $('#id-type-pic').val(response['DataPic'][0].pic_idtype);
        $('#inp-id-no-pic').val(response['DataPic'][0].pic_idno);
        $('#inp-tgl-id-pic').val(response['DataPic'][0].pic_iddate);
        $('#inp-exp-id-date-pic').val(response['DataPic'][0].pic_expdate);
        $('#inp-nama-awal-pic').val(response['DataPic'][0].pic_fname);
        $('#inp-nama-akhir-pic').val(response['DataPic'][0].pic_lname);
        $('#inp-alias-pic').val(response['DataPic'][0].pic_alias);
        $('#inp-gelar-pic').val(response['DataPic'][0].pic_title);
        $('#inp-tempat-lahir-pic').val(response['DataPic'][0].pic_bornplc);
        $('#inp-tanggal-lahir-pic').val(response['DataPic'][0].pic_borndate);
        $('#slc-jenis-kelamin-pic').val(response['DataPic'][0].pic_gender);
        $('#slc-agama-pic').val(response['DataPic'][0].pic_religi);
        $('#slc-status-pernikahan-pic').val(response['DataPic'][0].pic_marital);
        $('#inp-rtrw-pic').val(response['DataPic'][0].pic_rtrw);
        $('#inp-kode-pos-alamat-pic').val(response['DataPic'][0].pic_zipcode);
        $('#inp-alamat-pic').val(response['DataPic'][0].pic_addr);

        $('#inp-kelurahan-alamat-pic').val(response['DataPic'][0].pic_kelu_name);
        if ($('#inp-kelurahan-alamat-pic').val() === "" || $('#inp-kelurahan-alamat-pic').val() === "null") {
         $('#inp-kelurahan-alamat-pic').val("");
        }

        $('#inp-kecamatan-alamat-pic').val(response['DataPic'][0].pic_keca_name);
        if ($('#inp-kecamatan-alamat-pic').val() === "" || $('#inp-kecamatan-alamat-pic').val() === "null") {
         $('#inp-kecamatan-alamat-pic').val("");
        }

        $('#inp-kabupaten-alamat-pic').val(response['DataPic'][0].pic_kabkot_name);
        if ($('#inp-kabupaten-alamat-pic').val() === "" || $('#inp-kabupaten-alamat-pic').val() === "null") {
         $('#inp-kabupaten-alamat-pic').val("");
        }

        $('#inp-provinsi-alamat-pic').val(response['DataPic'][0].pic_prov_name);
        if ($('#inp-provinsi-alamat-pic').val() === "" || $('#inp-provinsi-alamat-pic').val() === "null") {
         $('#inp-provinsi-alamat-pic').val("");
        }

        $('#inp-npwp-pic').val(response['DataPic'][0].pic_npwp);
        $('#inp-telepon-pic').val(response['DataPic'][0].pic_notelp);
        $('#inp-hanphone-pic').val(response['DataPic'][0].pic_nohp);
        $('#inp-fax-pic').val(response['DataPic'][0].pic_fax);
        $('#inp-email-pic').val(response['DataPic'][0].pic_email);
        $('#inp-share-pic').val(response['DataPic'][0].pic_share);
        $('#inp-jabatan-pic').val(response['DataPic'][0].pic_jabatan);
       }
       //guarantor
       var guar = response['DataGuarantor']
       //debugger;
       if (guar.length > 0) {
        $('#inp-no-penjaminn').val(response['DataGuarantor'][0].gua_no);
        $('#slc-jenis-identitas-penjaminn').val(response['DataGuarantor'][0].gua_idtype);
        $('#inp-no-identitas-penjaminn').val(response['DataGuarantor'][0].gua_idno);
        $('#inp-issued-date-penjaminn').val(response['DataGuarantor'][0].gua_iddate);
        $('#inp-expired-date-penjaminn').val(response['DataGuarantor'][0].gua_expdate);
        $('#inp-fname-penjaminn').val(response['DataGuarantor'][0].gua_fname);
        $('#inp-lname-penjaminn').val(response['DataGuarantor'][0].gua_lname);
        $('#inp-alias-penjaminn').val(response['DataGuarantor'][0].gua_alias);
        $('#inp-gelar-penjaminn').val(response['DataGuarantor'][0].gua_title);
        $('#inp-tempat-lahir-penjaminn').val(response['DataGuarantor'][0].gua_bornplc);
        $('#inp-tanggal-lahir-penjaminn').val(response['DataGuarantor'][0].gua_borndate);
        $('#slc-jenis-kelamin-penjaminn').val(response['DataGuarantor'][0].gua_gender);
        $('#slc-agama-penjaminn').val(response['DataGuarantor'][0].gua_religi);
        $('#slc-pekerjaan-penjaminn').val(response['DataGuarantor'][0].gua_occp);
        $('#slc-status-pernikahan-penjaminn').val(response['DataGuarantor'][0].gua_mrtl);
        $('#inp-rtrw-penjaminn').val(response['DataGuarantor'][0].gua_rtrw);
        $('#inp-kode-pos-alamat-penjaminn').val(response['DataGuarantor'][0].gua_zipcode);
        $('#inp-alamat-penjaminn').val(response['DataGuarantor'][0].gua_addr);

        $('#inp-kelurahan-alamat-penjaminn').val(response['DataGuarantor'][0].gua_kelu_name);
        if ($('#inp-kelurahan-alamat-penjaminn').val() === "" || $('#inp-kelurahan-alamat-penjaminn').val() === "null") {
         $('#inp-kelurahan-alamat-penjaminn').val("");
        }

        $('#inp-kecamatan-alamat-penjaminn').val(response['DataGuarantor'][0].gua_keca_name);
        if ($('#inp-kecamatan-alamat-penjaminn').val() === "" || $('#inp-kecamatan-alamat-penjaminn').val() === "null") {
         $('#inp-kecamatan-alamat-penjaminn').val("");
        }

        $('#inp-kabupaten-alamat-penjaminn').val(response['DataGuarantor'][0].gua_kabkot_name);
        if ($('#inp-kabupaten-alamat-penjaminn').val() === "" || $('#inp-kabupaten-alamat-penjaminn').val() === "null") {
         $('#inp-kabupaten-alamat-penjaminn').val("");
        }

        $('#inp-provinsi-alamat-penjaminn').val(response['DataGuarantor'][0].gua_prov_name);
        if ($('#inp-provinsi-alamat-penjaminn').val() === "" || $('#inp-provinsi-alamat-penjaminn').val() === "null") {
         $('#inp-provinsi-alamat-penjaminn').val("");
        }

        $('#inp-email-penjaminn').val(response['DataGuarantor'][0].gua_email);
        $('#inp-hanphone-penjaminn').val(response['DataGuarantor'][0].gua_nohp);
        $('#inp-telepon-penjaminn').val(response['DataGuarantor'][0].gua_notelp);
        $('#status-hubungan-penjaminn').val(response['DataGuarantor'][0].gua_relati);
       }
      }

     } else {
      if (response['DataAplikasi'][0].pesan == "Data Tidak Ditemukan") {
       alert_error(response['DataAplikasi'][0].pesan);
      } else {
       alert_warning(response['DataAplikasi'][0].pesan);
      }
     }

    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }else{
    alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");
   }
  },
  error: function(response) {

   console.log(response);
  }
 });

}

function save_cc(arrayData) {

 $.ajax({
  url: base_url + "Controller_customer_correction/saveCC",
  type: 'POST',
  data: {
   arrayData
  },
  success: function(response) {
   console.log(response);

   if (response) {
    try {
     if (response['status'] == "200") {
      alert_info("Proses save berhasil dengan No.Permohonan: " + response['pesan']);
      $('#inp-no-permohonan-cc').val(response['pesan']);
      $('.disabel').prop('disabled', true);
      $('#cetak-permohonan-cc').prop('disabled', false);
      $('#konfirmasi-permohonan-cc').prop('disabled', false);
      $('#batalkan-koreksi-cc').prop('disabled', false);
      $('#simpan-koreksi-cc').prop('disabled', true);
     } else {
      alert_info(response['pesan']);
     }
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }
  },
  error: function(response) {

   console.log(response);
  }
 });

}

function save_cc_per(arrayData) {

 $.ajax({
  url: base_url + "Controller_customer_correction/saveCCPer",
  type: 'POST',
  data: {
   arrayData
  },
  success: function(response) {
   console.log(response);

   if (response) {
    try {
     if (response['status'] == "200") {
      alert_info("Proses save berhasil dengan No.Permohonan: " + response['pesan']);
      $('#inp-no-permohonan-cc').val(response['pesan']);
      $('.disabel').prop('disabled', true);
      $('#cetak-permohonan-cc').prop('disabled', false);
      $('#konfirmasi-permohonan-cc').prop('disabled', false);
      $('#batalkan-koreksi-cc').prop('disabled', false);
      $('#simpan-koreksi-cc').prop('disabled', true);
     } else {
      alert_info(response['pesan']);
     }
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }
  },
  error: function(response) {

   console.log(response);
  }
 });

}

function getSrtPermohonan(v_branch) {
 $.ajax({
  url: base_url + "Controller_customer_correction/getSrtPermohonan",
  type: 'POST',
  data: {
   v_branch
  },
  success: function(response) {
   console.log(response);
   var array = [];
   if (response) {
    try {
     tabel_srt_permohonan.clear().draw();
     $.each(response['Data'], function(index) {
      array.push([
       index + 1,
       this.correction_no,
       this.contract_no,
       this.cust_type
      ]);
     });
     tabel_srt_permohonan.rows.add(array).draw();
     $('#modal-search-srt-permohonan').modal('show');
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }else{
    alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server")
   }
  },
  error: function(response) {

   console.log(response);
  }
 });
}

//========================================================================================================================================//

//================================================== CETAKAN ==========================================================================//

$('#cetak-permohonan-cc').click(function() {
 var disetujui1 = $('#slc-setuju-oleh-cc').val().toUpperCase();
 var disetujui2 = $('#slc-setuju-oleh2-cc').val().toUpperCase();
 var contract_no = $('#input-no-contract').val();
 var no_permohonan = $('#inp-no-permohonan-cc').val().toUpperCase();
 var tipe_debitur = $('#inp-cust-type-cc').val();
 var arrayData = [];
 if (disetujui1 == "") {
  alert_info("Disetujui Oleh Belum Terisi");
  return false;
 } else if (disetujui2 == "") {
  alert_info("Disetujui Oleh Belum Terisi");
  return false;
 } else if (no_permohonan == "") {
  alert_info("Nomor Permohonan Belum Diisi");
  return false;
 } else {
  alert_confirm("Apakah anda yakin akan mencetak permohonan dengan nomor " + no_permohonan + " ?", function() {


   arrayData.push({
    //tab company detail
    subzipcode_comp_detail_lama: $('#inp-subkode-pos-alamat-perusahaan').val(),
    subzipcode_comp_detail_baru: $('#inp-subkode-pos-alamat-perusahaan2').val(),
    subzipcode_comp_detail_reason: $('#slc-alasan-subkode-com :selected').text(),
    no_telp_comp_detail_lama: $('#inp-telp-alamat-perusahaan').val(),
    no_telp_comp_detail_baru: $('#inp-telp-alamat-perusahaan2').val(),
    no_telp_comp_detail_reason: $('#slc-alasan-no-telp-com :selected').text(),
    no_fax_comp_detail_lama: $('#inp-fax-alamat-perusahaan').val(),
    no_fax_comp_detail_baru: $('#inp-fax-alamat-perusahaan2').val(),
    no_fax_comp_detail_reason: $('#slc-alasan-no-fax-com :selected').text(),
    email_comp_detail_lama: $('#inp-email-perusahaan').val(),
    email_comp_detail_baru: $('#inp-email-perusahaan2').val(),
    email_comp_detail_reason: $('#slc-alasan-email-com :selected').text(),
    no_akte_comp_detail_lama: $('#inp-no-akte-perusahaan').val(),
    no_akte_comp_detail_baru: $('#inp-no-akte-perusahaan2').val(),
    no_akte_comp_detail_reason: $('#slc-alasan-no-akte-com :selected').text(),
    tgl_pendiri_comp_detail_lama: $('#inp-tgl-pendirian-perusahaan').val(),
    tgl_pendiri_comp_detail_baru: $('#inp-tgl-pendirian-perusahaan2').val(),
    tgl_pendiri_comp_detail_reason: $('#slc-alasan-tgl-pendirian-com :selected').text(),
    no_resi_comp_detail_lama: $('#inp-no-resi-perusahaan').val(),
    no_resi_comp_detail_baru: $('#inp-no-resi-perusahaan2').val(),
    no_resi_comp_detail_reason: $('#slc-alasan-no-resi-com :selected').text(),
    tgl_resi_comp_detail_lama: $('#inp-tgl-resi-perusahaan').val(),
    tgl_resi_comp_detail_baru: $('#inp-tgl-resi-perusahaan2').val(),
    tgl_resi_comp_detail_reason: $('#slc-alasan-tgl-resi-com :selected').text(),
    no_siup_comp_detail_lama: $('#inp-no-siup-perusahaan').val(),
    no_siup_comp_detail_baru: $('#inp-no-siup-perusahaan2').val(),
    no_siup_comp_detail_reason: $('#slc-alasan-no-siup-com :selected').text(),
    tgl_siup_comp_detail_lama: $('#inp-tgl-siup-perusahaan').val(),
    tgl_siup_comp_detail_baru: $('#inp-tgl-siup-perusahaan2').val(),
    tgl_siup_comp_detail_reason: $('#slc-alasan-tgl-siup-com :selected').text(),
    no_tdp_comp_detail_lama: $('#inp-no-tdp-perusahaan').val(),
    no_tdp_comp_detail_baru: $('#inp-no-tdp-perusahaan2').val(),
    no_tdp_comp_detail_reason: $('#slc-alasan-no-tdp-com :selected').text(),
    tgl_tdp_comp_detail_lama: $('#inp-tgl-tdp-perusahaan').val(),
    tgl_tdp_comp_detail_baru: $('#inp-tgl-tdp-perusahaan2').val(),
    tgl_tdp_comp_detail_reason: $('#slc-alasan-tgl-tdp-com :selected').text(),
    sektor_ekonimi_comp_detail_lama: $('#inp-sektor-ekonomi-perusahaan').val(),
    sektor_ekonimi_comp_detail_baru: $('#inp-sektor-ekonomi-perusahaan2').val(),
    sektor_ekonimi_comp_detail_reason: $('#slc-alasan-sektor-com :selected').text(),
    lap_usaha_comp_detail_lama: $('#inp-lapangan-usaha-perusahaan').val(),
    lap_usaha_comp_detail_baru: $('#inp-lapangan-usaha-perusahaan2').val(),
    lap_usaha_comp_detail_reason: $('#slc-alasan-lapangan-com :selected').text(),
    total_pegawai_comp_detail_lama: $('#inp-total-pegawai').val(),
    total_pegawai_comp_detail_baru: $('#inp-total-pegawai2').val(),
    total_pegawai_comp_detail_reason: $('#slc-alasan-ttl-pgw-com :selected').text(),
    go_public_comp_detail_lama: $('#slc-public-perusahaan :selected').text(),
    go_public_comp_detail_baru: $('#slc-public-perusahaan2 :selected').text(),
    go_public_comp_detail_reason: $('#slc-alasan-public-com :selected').text(),
    status_lokasi_comp_detail_lama: $('#slc-status-lokasi :selected').text(),
    status_lokasi_comp_detail_baru: $('#slc-status-lokasi2 :selected').text(),
    status_lokasi_comp_detail_reason: $('#slc-alasan-stat-lok-com :selected').text(),
    modal_dasar_comp_detail_lama: $('#inp-modal-dasar-perusahaan').val(),
    modal_dasar_comp_detail_baru: $('#inp-modal-dasar-perusahaan2').val(),
    modal_dasar_comp_detail_reason: $('#slc-alasan-modal-dasar-com :selected').text(),
    paid_up_comp_detail_lama: $('#inp-paid-up-perusahaan').val(),
    paid_up_comp_detail_baru: $('#slc-paid-up-perusahaan2').val(),
    paid_up_comp_detail_reason: $('#inp-alasan-paid-up-com :selected').text(),
    tgl_akta_comp_detail_lama: $('#inp-tgl-akta-perusahaan').val(),
    tgl_akta_comp_detail_baru: $('#inp-tgl-akta-perusahaan2').val(),
    tgl_akta_comp_detail_reason: $('#slc-alasan-tgl-akta-com :selected').text(),
    // tab shareholder sub personal shareholder data
    tgl_identitas_per_shareholder_lama: $('#inp-tgl-id-holder-pri').val(),
    tgl_identitas_per_shareholder_baru: $('#inp-tgl-id-holder-pri2').val(),
    tgl_identitas_per_shareholder_reason: $('#slc-alasan-tgl-id-holder-pri :selected').text(),
    alias_per_shareholder_lama: $('#inp-alias-holder-pri').val(),
    alias_per_shareholder_baru: $('#inp-alias-holder-pri2').val(),
    alias_per_shareholder_reason: $('#slc-alasan-alias-holder-pri :selected').text(),
    gelar_per_shareholder_lama: $('#inp-gelar-holder-pri :selected').text(),
    gelar_per_shareholder_baru: $('#inp-gelar-holder-pri2 :selected').text(),
    gelar_per_shareholder_reason: $('#slc-alasan-gelar-holder-pri :selected').text(),
    jenis_kel_per_shareholder_lama: $('#slc-jenis-kelamin-holder-pri :selected').text(),
    jenis_kel_per_shareholder_baru: $('#slc-jenis-kelamin-holder-pri2 :selected').text(),
    jenis_kel_per_shareholder_reason: $('#slc-alasan-jns-klmn-holder-pri :selected').text(),
    agama_per_shareholder_lama: $('#slc-agama-holder-pri :selected').text(),
    agama_per_shareholder_baru: $('#slc-agama-holder-pri2 :selected').text(),
    agama_per_shareholder_reason: $('#slc-alasan-agama-holder-pri :selected').text(),
    status_pernikahan_per_shareholder_lama: $('#slc-status-pernikahan-holder-pri :selected').text(),
    status_pernikahan_per_shareholder_baru: $('#slc-status-pernikahan-holder-pri2 :selected').text(),
    status_pernikahan_per_shareholder_reason: $('#slc-alasan-pernikahan-holder-pri :selected').text(),
    alamat_per_shareholder_lama: $('#inp-alamat-holder-pri').val(),
    alamat_per_shareholder_baru: $('#inp-alamat-holder-pri2').val(),
    alamat_per_shareholder_reason: $('#slc-alasan-alamat-holder-pri :selected').text(),
    rtrw_per_shareholder_lama: $('#inp-rtrw-holder-pri').val()+'/'+$('#inp-rw-holder-pri').val(),
    rtrw_per_shareholder_baru: $('#inp-rtrw-holder-pri2').val() + '/' + $('#inp-rw-holder-pri2').val(),
    rtrw_per_shareholder_reason: $('#slc-alasan-rtrw-holder-pri :selected').text(),
    kode_pos_shareholder_lama: $('#inp-kodepos-holder-pri').val(),
    kode_pos_shareholder_baru: $('#inp-kodepos-holder-pri2').val(),
    kode_pos_shareholder_reason: $('#slc-alasan-kodepos-holder-pri :selected').text(),
    kelurahan_shareholder_lama: $('#inp-kelurahan-alamat-holder-pri').val(),
    kelurahan_shareholder_baru: $('#inp-kelurahan-alamat-holder-pri2').val(),
    kelurahan_shareholder_reason: $('#slc-alasan-kelurahan-holder-pri :selected').text(),
    kecamatan_shareholder_lama: $('#inp-kecamatan-alamat-holder-pri').val(),
    kecamatan_shareholder_baru: $('#inp-kecamatan-alamat-holder-pri2').val(),
    kecamatan_shareholder_reason: $('#slc-alasan-kecamatan-holder-pri :selected').text(),
    kabupaten_shareholder_lama: $('#inp-kabupaten-alamat-holder-pri').val(),
    kabupaten_shareholder_baru: $('#inp-kabupaten-alamat-holder-pri2').val(),
    kabupaten_shareholder_reason: $('#slc-alasan-kabupaten-holder-pri :selected').text(),
    provinsi_shareholder_lama: $('#inp-provinsi-alamat-holder-pri').val(),
    provinsi_shareholder_baru: $('#inp-provinsi-alamat-holder-pri2').val(),
    provinsi_shareholder_reason: $('#slc-alasan-provinsi-holder-pri :selected').text(),
    no_npwp_shareholder_lama: $('#inp-npwp-holder-pri').val(),
    no_npwp_shareholder_baru: $('#inp-npwp-holder-pri2').val(),
    no_npwp_shareholder_reason: $('#slc-alasan-npwp-holder-pri :selected').text(),
    no_telp_shareholder_lama: $('#inp-telepon-holder-pri').val(),
    no_telp_shareholder_baru: $('#inp-telepon-holder-pri2').val(),
    no_telp_shareholder_reason: $('#slc-alasan-no-tlp-holder-pri :selected').text(),
    no_hp_shareholder_lama: $('#inp-hanphone-holder-pri').val(),
    no_hp_shareholder_baru: $('#inp-hanphone-holder-pri2').val(),
    no_hp_shareholder_reason: $('#slc-alasan-no-hp-holder-pri :selected').text(),
    no_fax_per_shareholder_lama: $('#inp-fax-holder-pri').val(),
    no_fax_per_shareholder_baru: $('#inp-fax-holder-pri2').val(),
    no_fax_per_shareholder_reason: $('#slc-alasan-no-fax-holder-pri :selected').text(),
    email_per_shareholder_lama: $('#inp-email-holder-pri').val(),
    email_per_shareholder_baru: $('#inp-email-holder-pri2').val(),
    email_per_shareholder_reason: $('#slc-alasan-email-holder-pri :selected').text(),
    share_per_shareholder_lama: $('#inp-share-holder-pri').val(),
    share_per_shareholder_baru: $('#inp-share-holder-pri2').val(),
    share_per_shareholder_reason: $('#slc-alasan-share-holder-pri :selected').text(),
    jabatan_per_shareholder_lama: $('#inp-jabatan-holder-pri :selected').text(),
    jabatan_per_shareholder_baru: $('#inp-jabatan-holder-pri2 :selected').text(),
    jabatan_per_shareholder_reason: $('#slc-alasan-jabatan-holder-pri :selected').text(),
    // tab shareholder sub legal entity shareholder
    comp_type_entity_shareholder_lama: $('#id-comtype-holder-ent :selected').text(),
    comp_type_entity_shareholder_baru: $('#id-comtype-holder-ent2 :selected').text(),
    comp_type_entity_shareholder_reason: $('#slc-alasan-id-comtype-holder-ent :selected').text(),
    comp_name_entity_shareholder_lama: $('#inp-comname-holder-ent').val(),
    comp_name_entity_shareholder_baru: $('#inp-comname-holder-ent2').val(),
    comp_name_entity_shareholder_reason: $('#slc-alasan-comname-holder-ent :selected').text(),
    bentuk_perusahaan_entity_shareholder_lama: $('#inp-bentuk-holder-ent').val(),
    bentuk_perusahaan_entity_shareholder_baru: $('#inp-bentuk-holder-ent2').val(),
    bentuk_perusahaan_entity_shareholder_reason: $('#slc-alasan-tgl-bentuk-holder-ent :selected').text(),
    alamat_entity_shareholder_lama: $('#inp-alamat-holder-ent').val(),
    alamat_entity_shareholder_baru: $('#inp-alamat-holder-ent2').val(),
    alamat_entity_shareholder_reason: $('#slc-alasan-alamat-holder-ent :selected').text(),
    rtrw_entity_shareholder_lama: $('#inp-rtrw-holder-ent').val()+'/'+$('#inp-rw-holder-ent').val(),
    rtrw_entity_shareholder_baru: $('#inp-rtrw-holder-ent2').val() + '/' + $('#inp-rw-holder-ent2').val(),
    rtrw_entity_shareholder_reason: $('#slc-alasan-rtrw-holder-ent :selected').text(),
    kode_pos_entity_shareholder_lama: $('#inp-kodepos-holder-ent').val(),
    kode_pos_entity_shareholder_baru: $('#inp-kodepos-holder-ent2').val(),
    kode_pos_entity_shareholder_reason: $('#slc-alasan-kodepos-holder-ent :selected').text(),
    kelurahan_entity_shareholder_lama: $('#inp-kelurahan-holder-ent').val(),
    kelurahan_entity_shareholder_baru: $('#inp-kelurahan-holder-ent2').val(),
    kelurahan_entity_shareholder_reason: $('#slc-alasan-kelurahan-holder-ent :selected').text(),
    kecamatan_entity_shareholder_lama: $('#inp-kecamatan-holder-ent').val(),
    kecamatan_entity_shareholder_baru: $('#inp-kecamatan-holder-ent2').val(),
    kecamatan_entity_shareholder_reason: $('#slc-alasan-kecamatan-holder-ent :selected').text(),
    kabupaten_entity_shareholder_lama: $('#inp-kabupaten-holder-ent').val(),
    kabupaten_entity_shareholder_baru: $('#inp-kabupaten-holder-ent2').val(),
    kabupaten_entity_shareholder_reason: $('#slc-alasan-kabupaten-holder-ent :selected').text(),
    provinsi_entity_shareholder_lama: $('#inp-provinsi-holder-ent').val(),
    provinsi_entity_shareholder_baru: $('#inp-provinsi-holder-ent2').val(),
    provinsi_entity_shareholder_reason: $('#slc-alasan-provinsi-holder-ent :selected').text(),
    subzipcode_entity_shareholder_lama: $('#inp-subkode-holder-ent').val(),
    subzipcode_entity_shareholder_baru: $('#inp-subkode-holder-ent2').val(),
    subzipcode_entity_shareholder_reason: $('#slc-alasan-subkode-holder-ent :selected').text(),
    no_telp_entity_shareholder_lama: $('#inp-telepon-holder-ent').val(),
    no_telp_entity_shareholder_baru: $('#inp-telepon-holder-ent2').val(),
    no_telp_entity_shareholder_reason: $('#slc-alasan-no-tlp-holder-ent :selected').text(),
    no_fax_entity_shareholder_lama: $('#inp-fax-holder-ent').val(),
    no_fax_entity_shareholder_baru: $('#inp-fax-holder-ent2').val(),
    no_fax_entity_shareholder_reason: $('#slc-alasan-no-fax-holder-ent :selected').text(),
    email_entity_shareholder_lama: $('#inp-email-holder-ent').val(),
    email_entity_shareholder_baru: $('#inp-email-holder-ent2').val(),
    email_entity_shareholder_reason: $('#slc-alasan-email-holder-ent :selected').text(),
    establish_no_entity_shareholder_lama: $('#inp-estno-holder-ent').val(),
    establish_no_entity_shareholder_baru: $('#inp-estno-holder-ent2').val(),
    establish_no_entity_shareholder_reason: $('#slc-alasan-estno-holder-ent :selected').text(),
    establish_date_entity_shareholder_lama: $('#inp-estdate-holder-ent').val(),
    establish_date_entity_shareholder_baru: $('#inp-estdate-holder-ent2').val(),
    establish_date_entity_shareholder_reason: $('#slc-alasan-estdate-holder-ent :selected').text(),
    npwp_entity_shareholder_lama: $('#inp-npwp-holder-ent').val(),
    npwp_entity_shareholder_baru: $('#inp-npwp-holder-ent2').val(),
    npwp_entity_shareholder_reason: $('#slc-alasan-npwp-holder-ent :selected').text(),
    share_entity_shareholder_lama: $('#inp-share-holder-ent').val(),
    share_entity_shareholder_baru: $('#inp-share-holder-ent2').val(),
    share_entity_shareholder_reason: $('#slc-alasan-share-holder-ent :selected').text(),
    //tab pic management
    tgl_identitas_pic_lama: $('#inp-tgl-id-pic').val(),
    tgl_identitas_pic_baru: $('#inp-tgl-id-pic2').val(),
    tgl_identitas_pic_reason: $('#slc-alasan-tgl-id-pic :selected').text(),
    expired_identitas_pic_lama: $('#inp-exp-id-date-pic').val(),
    expired_identitas_pic_baru: $('#inp-exp-id-date-pic2').val(),
    expired_identitas_pic_reason: $('#slc-alasan-exp-id-date-pic :selected').text(),
    nama_lengkap_identitas_pic_lama: $('#inp-nama-awal-pic').val(),
    nama_lengkap_identitas_pic_baru: $('#inp-nama-awal-pic2').val(),
    nama_lengkap_identitas_pic_reason: $('#slc-alasan-nama-awal-pic :selected').text(),
    sid_name_pic_lama: $('#inp-alias-pic').val(),
    sid_name_pic_baru: $('#inp-alias-pic2').val(),
    sid_name_pic_reason: $('#slc-alasan-alias-pic :selected').text(),
    gelar_pic_lama: $('#inp-gelar-pic :selected').text(),
    gelar_pic_baru: $('#inp-gelar-pic2 :selected').text(),
    gelar_pic_reason: $('#slc-alasan-gelar-pic :selected').text(),
    jenis_kel_pic_lama: $('#slc-jenis-kelamin-pic :selected').text(),
    jenis_kel_pic_baru: $('#slc-jenis-kelamin-pic2 :selected').text(),
    jenis_kel_pic_reason: $('#slc-alasan-jns-klmn-pic :selected').text(),
    agama_pic_lama: $('#slc-agama-pic :selected').text(),
    agama_pic_baru: $('#slc-agama-pic2 :selected').text(),
    agama_pic_reason: $('#slc-alasan-agama-pic :selected').text(),
    status_pernikahan_pic_lama: $('#slc-status-pernikahan-pic :selected').text(),
    status_pernikahan_pic_baru: $('#slc-status-pernikahan-pic2 :selected').text(),
    status_pernikahan_pic_reason: $('#slc-alasan-status-pernikahan-pic :selected').text(),
    alamat_pic_lama: $('#inp-alamat-pic').val(),
    alamat_pic_baru: $('#inp-alamat-pic2').val(),
    alamat_pic_reason: $('#slc-alasan-alamat-pic :selected').text(),
    rtrw_pic_lama: $('#inp-rtrw-pic').val(),
    rtrw_pic_baru: $('#inp-rtrw-pic2').val() + '/' + $('#inp-rw-pic2').val(),
    rtrw_pic_reason: $('#slc-alasan-rtrw-pic :selected').text(),
    kode_pos_pic_lama: $('#inp-kode-pos-alamat-pic').val(),
    kode_pos_pic_baru: $('#inp-kode-pos-alamat-pic2').val(),
    kode_pos_pic_reason: $('#slc-alasan-kodepos-pic :selected').text(),
    kelurahan_pic_lama: $('#inp-kelurahan-alamat-pic').val(),
    kelurahan_pic_baru: $('#inp-kelurahan-alamat-pic2').val(),
    kelurahan_pic_reason: $('#slc-alasan-kelurahan-pic :selected').text(),
    kecamatan_pic_lama: $('#inp-kecamatan-alamat-pic').val(),
    kecamatan_pic_baru: $('#inp-kecamatan-alamat-pic2').val(),
    kecamatan_pic_reason: $('#slc-alasan-kecamatan-pic :selected').text(),
    kabupaten_pic_lama: $('#inp-kabupaten-alamat-pic').val(),
    kabupaten_pic_baru: $('#inp-kabupaten-alamat-pic2').val(),
    kabupaten_pic_reason: $('#slc-alasan-kabupaten-pic :selected').text(),
    provinsi_pic_lama: $('#inp-provinsi-alamat-pic').val(),
    provinsi_pic_baru: $('#inp-provinsi-alamat-pic2').val(),
    provinsi_pic_reason: $('#slc-alasan-provinsi-pic :selected').text(),
    no_telp_pic_lama: $('#inp-telepon-pic').val(),
    no_telp_pic_baru: $('#inp-telepon-pic2').val(),
    no_telp_pic_reason: $('#slc-alasan-no-tlp-pic :selected').text(),
    no_hp_pic_lama: $('#inp-hanphone-pic').val(),
    no_hp_pic_baru: $('#inp-hanphone-pic2').val(),
    no_hp_pic_reason: $('#slc-alasan-no-hp-pic :selected').text(),
    no_fax_pic_lama: $('#inp-fax-pic').val(),
    no_fax_pic_baru: $('#inp-fax-pic2').val(),
    no_fax_pic_reason: $('#slc-alasan-no-fax-pic :selected').text(),
    email_pic_lama: $('#inp-email-pic').val(),
    email_pic_baru: $('#inp-email-pic2').val(),
    email_pic_reason: $('#slc-alasan-email-pic :selected').text(),
    share_pic_lama: $('#inp-share-pic').val(),
    share_pic_baru: $('#inp-share-pic2').val(),
    share_pic_reason: $('#slc-alasan-share-pic :selected').text(),
    no_npwp_pic_lama: $('#inp-npwp-pic').val(),
    no_npwp_pic_baru: $('#inp-npwp-pic2').val(),
    no_npwp_pic_reason: $('#slc-alasan-npwp-pic :selected').text(),
    jabatan_pic_lama: $('#inp-jabatan-pic :selected').text(),
    jabatan_pic_baru: $('#inp-jabatan-pic2 :selected').text(),
    jabatan_pic_reason: $('#slc-alasan-jabatan-pic :selected').text(),
    //tab penjamin
    tipe_id_penjamin_comp_lama: $('#slc-jenis-identitas-penjaminn :selected').text(),
    tipe_id_penjamin_comp_baru: $('#slc-jenis-identitas-penjaminn2 :selected').text(),
    tipe_id_penjamin_comp_reason: $('#slc-alasan-jns-id-penjaminn :selected').text(),
    nomor_id_penjamin_comp_lama: $('#inp-no-identitas-penjaminn').val(),
    nomor_id_penjamin_comp_baru: $('#inp-no-identitas-penjaminn2').val(),
    nomor_id_penjamin_comp_reason: $('#slc-alasan-no-id-penjaminn :selected').text(),
    tgl_identitas_penjamin_comp_lama: $('#inp-issued-date-penjaminn').val(),
    tgl_identitas_penjamin_comp_baru: $('#inp-issued-date-penjaminn2').val(),
    tgl_identitas_penjamin_comp_reason: $('#slc-alasan-tgl-id-penjaminn :selected').text(),
    expired_identitas_penjamin_comp_lama: $('#inp-expired-date-penjaminn').val(),
    expired_identitas_penjamin_comp_baru: $('#inp-expired-date-penjaminn2').val(),
    expired_identitas_penjamin_comp_reason: $('#slc-alasan-exp-id-penjaminn :selected').text(),
    nama_depan_identitas_penjamin_comp_lama: $('#inp-fname-penjaminn').val(),
    nama_depan_identitas_penjamin_comp_baru: $('#inp-fname-penjaminn2').val(),
    nama_depan_identitas_penjamin_comp_reason: $('#slc-alasan-fname-penjaminn :selected').text(),
    nama_belakang_identitas_penjamin_comp_lama: $('#inp-lname-penjaminn').val(),
    nama_belakang_identitas_penjamin_comp_baru: $('#inp-lname-penjaminn2').val(),
    nama_belakang_identitas_penjamin_comp_reason: $('#slc-alasan-lname-penjaminn :selected').text(),
    alias_identitas_penjamin_comp_lama: $('#inp-alias-penjaminn').val(),
    alias_identitas_penjamin_comp_baru: $('#inp-alias-penjaminn2').val(),
    alias_identitas_penjamin_comp_reason: $('#slc-alasan-alias-penjaminn :selected').text(),
    gelar_identitas_penjamin_comp_lama: $('#inp-gelar-penjaminn :selected').text(),
    gelar_identitas_penjamin_comp_baru: $('#inp-gelar-penjaminn2 :selected').text(),
    gelar_identitas_penjamin_comp_reason: $('#slc-alasan-gelar-penjaminn :selected').text(),
    tempat_lahir_penjamin_comp_lama: $('#inp-tempat-lahir-penjaminn').val(),
    tempat_lahir_penjamin_comp_baru: $('#inp-tempat-lahir-penjaminn2').val(),
    tempat_lahir_penjamin_comp_reason: $('#slc-alasan-tmpt-lhr-penjaminn :selected').text(),
    tanggal_lahir_penjamin_comp_lama: $('#inp-tanggal-lahir-penjaminn').val(),
    tanggal_lahir_penjamin_comp_baru: $('#inp-tanggal-lahir-penjaminn2').val(),
    tanggal_lahir_penjamin_comp_reason: $('#slc-alasan-tgl-lhr-penjaminn :selected').text(),
    jenis_kel_penjamin_comp_lama: $('#slc-jenis-kelamin-penjaminn :selected').text(),
    jenis_kel_penjamin_comp_baru: $('#slc-jenis-kelamin-penjaminn2 :selected').text(),
    jenis_kel_penjamin_comp_reason: $('#slc-alasan-jns-klmn-penjaminn :selected').text(),
    agama_penjamin_comp_lama: $('#slc-agama-penjaminn :selected').text(),
    agama_penjamin_comp_baru: $('#slc-agama-penjaminn2 :selected').text(),
    agama_penjamin_comp_reason: $('#slc-alasan-agama-penjaminn :selected').text(),
    pekerjaan_penjamin_comp_lama: $('#slc-pekerjaan-penjaminn :selected').text(),
    pekerjaan_penjamin_comp_baru: $('#slc-pekerjaan-penjaminn2 :selected').text(),
    pekerjaan_penjamin_comp_reason: $('#slc-alasan-pekerjaan-penjaminn :selected').text(),
    status_pernikahan_penjamin_comp_lama: $('#slc-status-pernikahan-penjaminn :selected').text(),
    status_pernikahan_penjamin_comp_baru: $('#slc-status-pernikahan-penjaminn2 :selected').text(),
    status_pernikahan_penjamin_comp_reason: $('#slc-alasan-pernikahan-penjaminn :selected').text(),
    alamat_penjamin_comp_lama: $('#inp-alamat-penjaminn').val(),
    alamat_penjamin_comp_baru: $('#inp-alamat-penjaminn2').val(),
    alamat_penjamin_comp_reason: $('#slc-alasan-alamat-penjaminn :selected').text(),
    rtrw_penjamin_comp_lama: $('#inp-rtrw-penjaminn').val(),
    rtrw_penjamin_comp_baru: $('#inp-rtrw-penjaminn2').val() + '/' + $('#inp-rw-penjaminn2').val(),
    rtrw_penjamin_comp_reason: $('#slc-alasan-rtrw-penjaminn :selected').text(),
    kode_pos_penjamin_comp_lama: $('#inp-kode-pos-alamat-penjaminn').val(),
    kode_pos_penjamin_comp_baru: $('#inp-kode-pos-alamat-penjaminn2').val(),
    kode_pos_penjamin_comp_reason: $('#slc-alasan-kodepos-penjaminn :selected').text(),
    kelurahan_penjamin_comp_lama: $('#inp-kelurahan-alamat-penjaminn').val(),
    kelurahan_penjamin_comp_baru: $('#inp-kelurahan-alamat-penjaminn2').val(),
    kelurahan_penjamin_comp_reason: $('#slc-alasan-kelurahan-penjaminn :selected').text(),
    kecamatan_penjamin_comp_lama: $('#inp-kecamatan-alamat-penjaminn').val(),
    kecamatan_penjamin_comp_baru: $('#inp-kecamatan-alamat-penjaminn2').val(),
    kecamatan_penjamin_comp_reason: $('#slc-alasan-kecamatan-penjaminn :selected').text(),
    kabupaten_penjamin_comp_lama: $('#inp-kabupaten-alamat-penjaminn').val(),
    kabupaten_penjamin_comp_baru: $('#inp-kabupaten-alamat-penjaminn2').val(),
    kabupaten_penjamin_comp_reason: $('#slc-alasan-kabupaten-penjaminn :selected').text(),
    provinsi_penjamin_comp_lama: $('#inp-provinsi-alamat-penjaminn').val(),
    provinsi_penjamin_comp_baru: $('#slc-provinsi-alamat-penjaminn2').val(),
    provinsi_penjamin_comp_reason: $('#slc-alasan-provinsi-penjaminn :selected').text(),
    no_telp_penjamin_comp_lama: $('#inp-telepon-penjaminn').val(),
    no_telp_penjamin_comp_baru: $('#inp-telepon-penjaminn2').val(),
    no_telp_penjamin_comp_reason: $('#slc-alasan-no-tlp-penjaminn :selected').text(),
    no_hp_penjamin_comp_lama: $('#inp-hanphone-penjaminn').val(),
    no_hp_penjamin_comp_baru: $('#inp-hanphone-penjaminn2').val(),
    no_hp_penjamin_comp_reason: $('#slc-alasan-no-hp-penjaminn :selected').text(),
    personal_email_penjamin_comp_lama: $('#inp-email-penjaminn').val(),
    personal_email_penjamin_comp_baru: $('#inp-email-penjaminn2').val(),
    personal_email_penjamin_comp_reason: $('#slc-alasan-email-penjaminn :selected').text(),
    status_hubungan_penjamin_comp_lama: $('#status-hubungan-penjaminn :selected').text(),
    status_hubungan_penjamin_comp_baru: $('#status-hubungan-penjaminn2 :selected').text(),
    status_hubungan_penjamin_comp_reason: $('#slc-alasan-stat-hub-penjaminn :selected').text(),
    // ============================================ TAB PERSONAL =================================================//
    // ====================================== TAB PASSPORT APPLICANT ================================================//
    tipe_id_applicant_lama: $('#id-type-per :selected').text(),
    tipe_id_applicant_baru: $('#id-type-per2 :selected').text(),
    tipe_id_applicant_reason: $('#slc-alasan-id-type-per :selected').text(),
    alias_applicant_lama: $('#inp-alias-per').val(),
    alias_applicant_baru: $('#inp-alias-per2').val(),
    alias_applicant_reason: $('#slc-alasan-alias-per :selected').text(),
    agama_applicant_lama: $('#slc-agama-per :selected').text(),
    agama_applicant_baru: $('#slc-agama-per2 :selected').text(),
    agama_applicant_reason: $('#slc-alasan-agama-per :selected').text(),
    // ================= tab passport spouse ==============//
    tgl_identitas_spouse_lama: $('#inp-tgl-id-spouse').val(),
    tgl_identitas_spouse_baru: $('#inp-tgl-id-spouse2').val(),
    tgl_identitas_spouse_reason: $('#slc-alasan-tgl-id-spouse :selected').text(),
    expired_identitas_spouse_lama: $('#inp-exp-id-date-spouse').val(),
    expired_identitas_spouse_baru: $('#inp-exp-id-date-spouse2').val(),
    expired_identitas_spouse_reason: $('#slc-alasan-exp-id-date-spouse :selected').text(),
    alias_spouse_lama: $('#inp-alias-spouse').val(),
    alias_spouse_baru: $('#inp-alias-spouse2').val(),
    alias_spouse_reason: $('#slc-alasan-alias-spouse :selected').text(),
    gelar_spouse_lama: $('#inp-gelar-spouse :selected').text(),
    gelar_spouse_baru: $('#inp-gelar-spouse2 :selected').text(),
    gelar_spouse_reason: $('#slc-alasan-gelar-spouse :selected').text(),
    telp_spouse_lama: $('#inp-no-telp-spouse').val(),
    telp_spouse_baru: $('#inp-no-telp-spouse2').val(),
    telp_spouse_reason: $('#slc-alasan-no-telp-spouse :selected').text(),
    no_hp_spouse_lama: $('#inp-no-hp-spouse').val(),
    no_hp_spouse_baru: $('#inp-no-hp-spouse2').val(),
    no_hp_spouse_reason: $('#slc-alasan-no-hp-spouse :selected').text(),
    agama_spouse_lama: $('#slc-agama-spouse :selected').text(),
    agama_spouse_baru: $('#slc-agama-spouse2 :selected').text(),
    agama_spouse_reason: $('#slc-alasan-agama-spouse :selected').text(),
    alamat_spouse_lama: $('#inp-alamat-spouse').val(),
    alamat_spouse_baru: $('#inp-alamat-spouse2').val(),
    alamat_spouse_reason: $('#slc-alasan-alamat-spouse :selected').text(),
    rtrw_spouse_lama: $('#inp-rtrw-spouse').val()+'/'+$('#inp-rw-spouse').val(),
    rtrw_spouse_baru: $('#inp-rtrw-spouse2').val() + '/' + $('#inp-rw-spouse2').val(),
    rtrw_spouse_reason: $('#slc-alasan-rtrw-spouse :selected').text(),
    kode_pos_spouse_lama: $('#inp-kode-pos-alamat-spouse').val(),
    kode_pos_spouse_baru: $('#inp-kode-pos-alamat-spouse2').val(),
    kode_pos_spouse_reason: $('#slc-alasan-kodepos-spouse :selected').text(),
    kelurahan_spouse_lama: $('#inp-kelurahan-alamat-spouse').val(),
    kelurahan_spouse_baru: $('#inp-kelurahan-alamat-spouse2').val(),
    kelurahan_spouse_reason: $('#slc-alasan-kelurahan-spouse :selected').text(),
    kecamatan_spouse_lama: $('#inp-kecamatan-alamat-spouse').val(),
    kecamatan_spouse_baru: $('#inp-kecamatan-alamat-spouse2').val(),
    kecamatan_spouse_reason: $('#slc-alasan-kecamatan-spouse :selected').text(),
    kabupaten_spouse_lama: $('#inp-kabupaten-alamat-spouse').val(),
    kabupaten_spouse_baru: $('#inp-kabupaten-alamat-spouse2').val(),
    kabupaten_spouse_reason: $('#slc-alasan-kabupaten-spouse :selected').text(),
    provinsi_spouse_lama: $('#inp-provinsi-alamat-spouse').val(),
    provinsi_spouse_baru: $('#inp-provinsi-alamat-spouse2').val(),
    provinsi_spouse_reason: $('#slc-alasan-provinsi-spouse :selected').text(),
    // tab family card input
    no_kk_family_card_lama: $('#inp-no-kk').val(),
    no_kk_family_card_baru: $('#inp-no-kk2').val(),
    no_kk_family_card_reason: $('#slc-alasan-no-kk :selected').text(),
    jml_tanggungan_family_card_lama: $('#inp-jml-tanggung-kk').val(),
    jml_tanggungan_family_card_baru: $('#inp-jml-tanggung-kk2').val(),
    jml_tanggungan_family_card_reason: $('#slc-alasan-jml-tanggung-kk :selected').text(),
    pend_pemohon_family_card_lama: $('#inp-education-kk :selected').text(),
    pend_pemohon_family_card_baru: $('#inp-education-kk2 :selected').text(),
    pend_pemohon_family_card_reason: $('#slc-alasan-education-kk :selected').text(),
    bangsa_pemohon_family_card_lama: $('#inp-nationality-kk :selected').text(),
    bangsa_pemohon_family_card_baru: $('#inp-nationality-kk2 :selected').text(),
    bangsa_pemohon_family_card_reason: $('#slc-alasan-nationality-kk :selected').text(),
    pend_pasangan_family_card_lama: $('#inp-education-spouse-kk :selected').text(),
    pend_pasangan_family_card_baru: $('#inp-education-spouse-kk2 :selected').text(),
    pend_pasangan_family_card_reason: $('#slc-alasan-education-spouse-kk :selected').text(),
    //tab current residence
    no_telp_current_residence_lama: $('#inp-telepon-resident').val(),
    no_telp_current_residence_baru: $('#inp-telepon-resident2').val(),
    no_telp_current_residence_reason: $('#slc-alasan-no-tlp-resident :selected').text(),
    no_hp_current_residence_lama: $('#inp-hanphone-resident').val(),
    no_hp_current_residence_baru: $('#inp-hanphone-resident2').val(),
    no_hp_current_residence_reason: $('#slc-alasan-no-hp-resident :selected').text(),
    no_fax_current_residence_lama: $('#inp-fax-resident').val(),
    no_fax_current_residence_baru: $('#inp-fax-resident2').val(),
    no_fax_current_residence_reason: $('#slc-alasan-no-fax-resident :selected').text(),
    email_current_residence_lama: $('#inp-email-resident').val(),
    email_current_residence_baru: $('#inp-email-resident2').val(),
    email_current_residence_reason: $('#slc-alasan-email-resident :selected').text(),
    //tab occupation detail
    jenis_perusahaan_ocp_lama: $('#slc-jenis-perusahaan-occp :selected').text(),
    jenis_perusahaan_ocp_baru: $('#slc-jenis-perusahaan-occp2 :selected').text(),
    jenis_perusahaan_ocp_reason: $('#slc-alasan-perusahaan-occp :selected').text(),
    fasilitas_perusahaan_ocp_lama: $('#slc-fasilitas-perusahaan-occp :selected').text(),
    fasilitas_perusahaan_ocp_baru: $('#slc-fasilitas-perusahaan-occp2 :selected').text(),
    fasilitas_perusahaan_ocp_reason: $('#slc-alasan-fasilitas-perusahaan-occp :selected').text(),
    bisnis_lain_ocp_lama: $('#inp-bisnis-lain-occp').val(),
    bisnis_lain_ocp_baru: $('#inp-bisnis-lain-occp2').val(),
    bisnis_lain_ocp_reason: $('#slc-alasan-bisnis-lain-occp :selected').text(),
    atasan_langsung_ocp_lama: $('#inp-atasan-langsung-occp').val(),
    atasan_langsung_ocp_baru: $('#inp-atasan-langsung-occp2').val(),
    atasan_langsung_ocp_reason: $('#slc-alasan-atasan-langsung-occp :selected').text(),
    alamat_ocp_lama: $('#inp-alamat-occp').val(),
    alamat_ocp_baru: $('#inp-alamat-occp2').val(),
    alamat_ocp_reason: $('#slc-alasan-alamat-occp :selected').text(),
    rtrw_ocp_lama: $('#inp-rtrw-alamat-occp').val(),
    rtrw_ocp_baru: $('#inp-rtrw-alamat-occp2').val() + '/' + $('#inp-rw-alamat-occp2').val(),
    rtrw_ocp_reason: $('#slc-alasan-rtrw-occp :selected').text(),
    kode_pos_ocp_lama: $('#inp-kode-pos-occp').val(),
    kode_pos_ocp_baru: $('#inp-kode-pos-occp2').val(),
    kode_pos_ocp_reason: $('#slc-alasan-kodepos-occp :selected').text(),
    kelurahan_ocp_lama: $('#inp-kelurahan-occp').val(),
    kelurahan_ocp_baru: $('#inp-kelurahan-occp2').val(),
    kelurahan_ocp_reason: $('#slc-alasan-kelurahan-occp :selected').text(),
    kecamatan_ocp_lama: $('#inp-kecamatan-occp').val(),
    kecamatan_ocp_baru: $('#inp-kecamatan-occp2').val(),
    kecamatan_ocp_reason: $('#slc-alasan-kecamatan-occp :selected').text(),
    kabupaten_ocp_lama: $('#inp-kabupaten-occp').val(),
    kabupaten_ocp_baru: $('#inp-kabupaten-occp2').val(),
    kabupaten_ocp_reason: $('#slc-alasan-kabupaten-occp :selected').text(),
    provinsi_ocp_lama: $('#inp-provinsi-occp').val(),
    provinsi_ocp_baru: $('#inp-provinsi-occp2').val(),
    provinsi_ocp_reason: $('#slc-alasan-provinsi-occp :selected').text(),
    no_telp_ocp_lama: $('#inp-telepon-occp').val(),
    no_telp_ocp_baru: $('#inp-telepon-occp2').val(),
    no_telp_ocp_reason: $('#slc-alasan-no-tlp-occp :selected').text(),
    no_fax_ocp_lama: $('#inp-fax-occp').val(),
    no_fax_ocp_baru: $('#inp-fax-occp2').val(),
    no_fax_ocp_reason: $('#slc-alasan-no-fax-occp :selected').text(),
    email_ocp_lama: $('#inp-email-occp').val(),
    email_ocp_baru: $('#inp-email-occp2').val(),
    email_ocp_reason: $('#slc-alasan-email-occp :selected').text(),
    //tab other
    no_npwp_other_lama: $('#inp-npwp-other').val(),
    no_npwp_other_baru: $('#inp-npwp-other2').val(),
    no_npwp_other_reason: $('#slc-alasan-npwp-other :selected').text(),
    no_resi_other_lama: $('#inp-no-resi-other').val(),
    no_resi_other_baru: $('#inp-no-resi-other2').val(),
    no_resi_other_reason: $('#slc-alasan-no-resi-other :selected').text(),
    tgl_resi_other_lama: $('#inp-tgl-resi-other').val(),
    tgl_resi_other_baru: $('#inp-tgl-resi-other2').val(),
    tgl_resi_other_reason: $('#slc-alasan-tgl-resi-other :selected').text(),
    //emergency contact
    alias_other_lama: $('#inp-alias-other').val(),
    alias_other_baru: $('#inp-alias-other2').val(),
    alias_other_reason: $('#slc-alasan-alias-other :selected').text(),
    gelar_other_lama: $('#inp-gelar-other :selected').text(),
    gelar_other_baru: $('#inp-gelar-other2 :selected').text(),
    gelar_other_reason: $('#slc-alasan-gelar-other :selected').text(),
    alamat_other_lama: $('#inp-alamat-other').val(),
    alamat_other_baru: $('#inp-alamat-other2').val(),
    alamat_other_reason: $('#slc-alasan-alamat-other :selected').text(),
    rtrw_other_lama: $('#inp-rtrw-other').val()+'/'+$('#inp-rw-other').val(),
    rtrw_other_baru: $('#inp-rtrw-other2').val() + '/' + $('#inp-rw-other2').val(),
    // rw_other_baru: $('#inp-rw-other2').val(),
    rtrw_other_reason: $('#slc-alasan-rtrw-other :selected').text(),
    kode_pos_other_lama: $('#inp-kode-pos-other').val(),
    kode_pos_other_baru: $('#inp-kode-pos-other2').val(),
    kode_pos_other_reason: $('#slc-alasan-kodepos-other :selected').text(),
    kelurahan_other_lama: $('#inp-kelurahan-alamat-other').val(),
    kelurahan_other_baru: $('#inp-kelurahan-alamat-other2').val(),
    kelurahan_other_reason: $('#slc-alasan-kelurahan-other :selected').text(),
    kecamatan_other_lama: $('#inp-kecamatan-alamat-other').val(),
    kecamatan_other_baru: $('#inp-kecamatan-alamat-other2').val(),
    kecamatan_other_reason: $('#slc-alasan-kecamatan-other :selected').text(),
    kabupaten_other_lama: $('#inp-kabupaten-alamat-other').val(),
    kabupaten_other_baru: $('#inp-kabupaten-alamat-other2').val(),
    kabupaten_other_reason: $('#slc-alasan-kabupaten-other :selected').text(),
    provinsi_other_lama: $('#inp-provinsi-alamat-other').val(),
    provinsi_other_baru: $('#inp-provinsi-alamat-other2').val(),
    provinsi_other_reason: $('#slc-alasan-provinsi-other :selected').text(),
    status_hubungan_other_lama: $('#slc-status-hubungan-other :selected').text(),
    status_hubungan_other_baru: $('#slc-status-hubungan-other2 :selected').text(),
    status_hubungan_other_reason: $('#slc-alasan-status-hubungan-other :selected').text(),
    //tab penjamin
    tipe_id_penjamin_per_lama: $('#slc-jenis-identitas-penjamin :selected').text(),
    tipe_id_penjamin_per_baru: $('#slc-jenis-identitas-penjamin2 :selected').text(),
    tipe_id_penjamin_per_reason: $('#slc-alasan-jns-id-penjamin :selected').text(),
    no_id_penjamin_per_lama: $('#inp-no-identitas-penjamin').val(),
    no_id_penjamin_per_baru: $('#inp-no-identitas-penjamin2').val(),
    no_id_penjamin_per_reason: $('#slc-alasan-no-id-penjamin :selected').text(),
    tgl_id_penjamin_per_lama: $('#inp-issued-date-penjamin').val(),
    tgl_id_penjamin_per_baru: $('#inp-issued-date-penjamin2').val(),
    tgl_id_penjamin_per_reason: $('#slc-alasan-tgl-id-penjamin :selected').text(),
    expired_id_penjamin_per_lama: $('#inp-expired-date-penjamin').val(),
    expired_id_penjamin_per_baru: $('#inp-expired-date-penjamin2').val(),
    expired_id_penjamin_per_reason: $('#slc-alasan-exp-id-penjamin :selected').text(),
    nama_depan_id_penjamin_per_lama: $('#inp-fname-penjamin').val(),
    nama_depan_id_penjamin_per_baru: $('#inp-fname-penjamin2').val(),
    nama_depan_id_penjamin_per_reason: $('#slc-alasan-fname-penjamin :selected').text(),
    nama_belakang_id_penjamin_lama: $('#inp-lname-penjamin').val(),
    nama_belakang_id_penjamin_baru: $('#inp-lname-penjamin2').val(),
    nama_belakang_id_penjamin_reason: $('#slc-alasan-lname-penjamin :selected').text(),
    alias_penjamin_per_lama: $('#inp-alias-penjamin').val(),
    alias_penjamin_per_baru: $('#inp-alias-penjamin2').val(),
    alias_penjamin_per_reason: $('#slc-alasan-alias-penjamin :selected').text(),
    gelar_penjamin_per_lama: $('#inp-gelar-penjamin :selected').text(),
    gelar_penjamin_per_baru: $('#inp-gelar-penjamin2 :selected').text(),
    gelar_penjamin_per_reason: $('#slc-alasan-gelar-penjamin :selected').text(),
    tempat_lahir_penjamin_per_lama: $('#inp-tempat-lahir-penjamin').val(),
    tempat_lahir_penjamin_per_baru: $('#inp-tempat-lahir-penjamin2').val(),
    tempat_lahir_penjamin_per_reason: $('#slc-alasan-tmpt-lhr-penjamin :selected').text(),
    tgl_lahir_penjamin_per_lama: $('#inp-tanggal-lahir-penjamin').val(),
    tgl_lahir_penjamin_per_baru: $('#inp-tanggal-lahir-penjamin2').val(),
    tgl_lahir_penjamin_per_reason: $('#slc-alasan-tgl-lhr-penjamin :selected').text(),
    jenis_kel_penjamin_per_lama: $('#slc-jenis-kelamin-penjamin :selected').text(),
    jenis_kel_penjamin_per_baru: $('#slc-jenis-kelamin-penjamin2 :selected').text(),
    jenis_kel_penjamin_per_reason: $('#slc-alasan-jns-klmn-penjamin :selected').text(),
    agama_penjamin_per_lama: $('#slc-agama-penjamin :selected').text(),
    agama_penjamin_per_baru: $('#slc-agama-penjamin2 :selected').text(),
    agama_penjamin_per_reason: $('#slc-alasan-agama-penjamin :selected').text(),
    pekerjaan_penjamin_per_lama: $('#slc-pekerjaan-penjamin :selected').text(),
    pekerjaan_penjamin_per_baru: $('#slc-pekerjaan-penjamin2 :selected').text(),
    pekerjaan_penjamin_per_reason: $('#slc-alasan-pekerjaan-penjamin :selected').text(),
    status_pernikahan_penjamin_per_lama: $('#slc-status-pernikahan-penjamin :selected').text(),
    status_pernikahan_penjamin_per_baru: $('#slc-status-pernikahan-penjamin2 :selected').text(),
    status_pernikahan_penjamin_per_reason: $('#slc-alasan-pernikahan-penjamin :selected').text(),
    alamat_penjamin_per_lama: $('#inp-alamat-penjamin').val(),
    alamat_penjamin_per_baru: $('#inp-alamat-penjamin2').val(),
    alamat_penjamin_per_reason: $('#slc-alasan-alamat-penjamin :selected').text(),
    rtrw_penjamin_per_lama: $('#inp-rtrw-penjamin').val(),
    rtrw_penjamin_per_baru: $('#inp-rtrw-penjamin2').val() + '/' + $('#inp-rw-penjamin2').val(),
    rtrw_penjamin_per_reason: $('#slc-alasan-rtrw-penjamin :selected').text(),
    kode_pos_penjamin_per_lama: $('#inp-kode-pos-alamat-penjamin').val(),
    kode_pos_penjamin_per_baru: $('#inp-kode-pos-alamat-penjamin2').val(),
    kode_pos_penjamin_per_reason: $('#slc-alasan-kodepos-penjamin :selected').text(),
    kelurahan_penjamin_per_lama: $('#inp-kelurahan-alamat-penjamin').val(),
    kelurahan_penjamin_per_baru: $('#inp-kelurahan-alamat-penjamin2').val(),
    kelurahan_penjamin_per_reason: $('#slc-alasan-kelurahan-penjamin :selected').text(),
    kecamatan_penjamin_per_lama: $('#inp-kecamatan-alamat-penjamin').val(),
    kecamatan_penjamin_per_baru: $('#inp-kecamatan-alamat-penjamin2').val(),
    kecamatan_penjamin_per_reason: $('#slc-alasan-kecamatan-penjamin :selected').text(),
    kabupaten_penjamin_per_lama: $('#inp-kabupaten-alamat-penjamin').val(),
    kabupaten_penjamin_per_baru: $('#inp-kabupaten-alamat-penjamin2').val(),
    kabupaten_penjamin_per_reason: $('#slc-alasan-kabupaten-penjamin :selected').text(),
    provinsi_penjamin_per_lama: $('#inp-provinsi-alamat-penjamin').val(),
    provinsi_penjamin_per_baru: $('#slc-provinsi-alamat-penjamin2').val(),
    provinsi_penjamin_per_reason: $('#slc-alasan-kabupaten-penjamin :selected').text(),
    no_tlp_penjamin_per_lama: $('#inp-telepon-penjamin').val(),
    no_tlp_penjamin_per_baru: $('#inp-telepon-penjamin2').val(),
    no_tlp_penjamin_per_reason: $('#slc-alasan-no-tlp-penjamin :selected').text(),
    no_hp_penjamin_per_lama: $('#inp-hanphone-penjamin').val(),
    no_hp_penjamin_per_baru: $('#inp-hanphone-penjamin2').val(),
    no_hp_penjamin_per_reason: $('#slc-alasan-no-hp-penjamin :selected').text(),
    personal_email_penjamin_per_lama: $('#inp-email-penjamin').val(),
    personal_email_penjamin_per_baru: $('#inp-email-penjamin2').val(),
    personal_email_penjamin_per_reason: $('#slc-alasan-email-penjamin :selected').text(),
    status_hubungan_penjamin_per_lama: $('#status-hubungan-penjamin :selected').text(),
    status_hubungan_penjamin_per_baru: $('#status-hubungan-penjamin2 :selected').text(),
    status_hubungan_penjamin_per_reason: $('#slc-alasan-stat-hub-penjamin :selected').text(),
   });
   var dataHasil = JSON.stringify(arrayData);
   var cabang_cetak = $('#slc-branch-cc').val();
   $.ajax({
    url: base_url + "Controller_customer_correction/getAlamatReport",
    type: 'post',
    dataType: 'json',
    async: false,
    data: {
     "branch_code": cabang_cetak
    },
    success: function(response) {
     console.log(response);

     if (JSON.stringify(response).includes('Timeout')) {
      alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
     } else if (response) {
      try {
       $('#penampung-cabang').val(response['data'][0].branch_desc);
       $('#penampung-alamat-cabang').val(response['data'][0].bran_address1);
       $('#penampung-alamat-cabang2').val(response['data'][0].bran_address2);
      } catch (e) {
       $('#loading-ajax').hide();
       console.log(e);
       alert_error("Galat" + e);
      }
     }

    },
    error: function(response) {

     console.log(response);
    }
   });
   if ($('#inp-cust-type-cc').val() == "COM") {
    var nama_debitur = $('#inp-nama-perusahaan').val();
   } else {
    var nama_debitur = $('#inp-nama-awal-per').val();
   }

   $('#penampung-kontrak').val(contract_no);
   $('#penampung-permohonan').val(no_permohonan);
   $('#penampung-debitur').val(nama_debitur);
   $('#penampung-setujui1').val(disetujui1);
   $('#penampung-setujui2').val(disetujui2);
   $('#penampung-datacetak').val(dataHasil);
   $('#idForm').submit();
  });
 }
});

// ================================= ON CHANGE TIPE DEBITUR ======================================================//
$('#inp-cust-type-cc').change(function() {
 var debitur = $('#inp-cust-type-cc').val();
 if (debitur == "COM") {
  $('#COM').show();
  $('#PER').hide();
 } else {
  $('#COM').hide();
  $('#PER').show();
 }
});

// =================================== TOMBOL CANCEL CORRECTION ================================================//
$('#batalkan-koreksi-cc').click(function() {
 if (check_session() === 'false') {
  alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
   localStorage.clear();
   window.location.href = base_url + "Controller_login/login_view";
  });
 } else {
  var branch_code = $('#slc-branch-cc').val();
  var no_permohonan = $('#inp-no-permohonan-cc').val();
  alert_confirm("Apakah anda yakin akan membatalkan permohonan dengan nomor " + no_permohonan + " ?", function() {
   $.ajax({
    url: base_url + "Controller_customer_correction/cancelCustomerCorrection",
    type: 'post',
    dataType: 'json',
    async: false,
    data: {
     "contract_no": no_permohonan,
     "branch_id": branch_code
    },
    success: function(response) {
     console.log(response);

     if (JSON.stringify(response).includes('Timeout')) {
      alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
     } else if (response) {
      try {
       if (response['pesan'] == "200") {
        alert_info("Nomor Permohonan " + no_permohonan + " berhasil dibatalkan");
        $('#bersihkan-kolom-cc').click();
        $('#btn-new-request-cc').prop('disabled', false);
       } else if (response['pesan'] == "500") {
        alert_error(response['error']);
       } else {
        alert_error(response['errorConsole']);
       }
      } catch (e) {
       $('#loading-ajax').hide();
       console.log(e);
       alert_error("Galat" + e);
      }
     }

    },
    error: function(response) {

     console.log(response);
    }
   });
  });
 }
});

function get_view_detail_company() {

 var arrayData = [];
 var branch_id = $('#slc-branch-cc').val();
 var no_permohonan = $('#inp-no-permohonan-cc').val();
 var no_kontrak = $('#input-no-contract').val();
 var cust_type = $('#inp-cust-type-cc').val();
 var flag = "2";
 var tabel_cust = [];

 arrayData.push({
  branch_id: branch_id,
  cust_type: cust_type,
  no_permohonan: no_permohonan,
  contract_no: no_kontrak,
  flag: flag
 });

 if (check_session() === 'true') {
  $.ajax({
   url: base_url + 'Controller_customer_correction/get_view_detail_company',
   type: 'POST',
   data: {
    arrayData
   },
   cache: false,
   success: function(response) {


    if (response) {
     try {
      var data = $.parseJSON(response);
      console.log(data);
      //debugger;
      if (data['alert'] !== null) {
       alert_error(data['alert']);
      } else if (data['alert'] === null) {
       $('#btn-new-request-cc').prop('disabled', true);
       $('#inp-cust-type-cc').prop('disabled', true);
       $('#cetak-permohonan-cc').prop('disabled', false);
       $('#konfirmasi-permohonan-cc').prop('disabled', false);
       $('#batalkan-koreksi-cc').prop('disabled', false);
       $('.disabel').val("");
       $('.disabel').prop('disabled', true);
       if (data['DataDocument'].length !== 0) {
        $.each(data['DataDocument']['DataDocument'], function(index) {
         tabel_cust.push([
          this['doc_code'],
          this['doc_name'],
          this['receive_date']
         ]);
        });
        tabel_doc2.rows.add(tabel_cust).draw(false);
       }
       if (data['dtl_com'] !== null) {
        $.each(data['dtl_com'], function(index) {
         $('#slc-jenis-perusahaan').val(this['com_type_old']);
         if ($('#slc-jenis-perusahaan').val() === "" || $('#slc-jenis-perusahaan').val() === "null") {
          $('#slc-jenis-perusahaan').val(this['com_type']);
         }
         // $('#slc-jenis-perusahaan2').val(this['com_type_new']);
         // $('#slc-alasan-tipe-com').val(this['r_com_type']);

         $('#inp-nama-perusahaan').val(this['cust_name_com_old']);
         if ($('#inp-nama-perusahaan').val() === "" || $('#inp-nama-perusahaan').val() === "null") {
          $('#inp-nama-perusahaan').val(this['cust_name_com']);
         }
         // $('#inp-nama-perusahaan2').val(this['cust_name_com_new']);
         // $('#slc-alasan-nama-com').val(this['r_cust_name_com']);

         //BUTUH KONFIRMASI
         // $('#slc-bentuk-perusahaan').val(this['com_type_old']);
         // $('#slc-bentuk-perusahaan2').val(this['com_type_new']);
         // $('#slc-alasan-bentuk-com').val(this['r_com_type']);

         $('#inp-alamat-perusahaan').val(this['addr_old']);
         if ($('#inp-alamat-perusahaan').val() === "" || $('#inp-alamat-perusahaan').val() === "") {
          $('#inp-alamat-perusahaan').val(this['addr']);
         }
         // $('#inp-alamat-perusahaan2').val(this['addr_new']);
         // $('#slc-alasan-alamat-com').val(this['r_addr']);

         $('#inp-rtrw-alamat-perusahaan').val(this['rtrw_old']);
         if ($('#inp-rtrw-alamat-perusahaan').val() === "" || $('#inp-rtrw-alamat-perusahaan').val() === "null") {
          $('#inp-rtrw-alamat-perusahaan').val(this['rtrw']);
         }
         // $('#inp-rtrw-alamat-perusahaan2').val(this['rtrw_new']);
         // $('#slc-alasan-rtrw-com').val(this['r_rtrw']);

         $('#inp-kode-pos-alamat-perusahaan').val(this['zipcode_old']);
         if ($('#inp-kode-pos-alamat-perusahaan').val() === "" || $('#inp-kode-pos-alamat-perusahaan').val() === "null") {
          $('#inp-kode-pos-alamat-perusahaan').val(this['zipcode']);
         }
         // $('#inp-kode-pos-alamat-perusahaan2').val(this['zipcode_new']);
         // $('#slc-alasan-zipcode-com').val(this['r_zipcode']);

         $('#inp-kelurahan-alamat-perusahaan').val(this['kelu_old_name']);
         if ($('#inp-kelurahan-alamat-perusahaan').val() === "" || $('#inp-kelurahan-alamat-perusahaan').val() === "null") {
          $('#inp-kelurahan-alamat-perusahaan').val(this['kelu_name']);
         }
         if ($('#inp-kelurahan-alamat-perusahaan').val() === "" || $('#inp-kelurahan-alamat-perusahaan').val() === "null") {
          $('#inp-kelurahan-alamat-perusahaan').val("");
         }

         $('#inp-kelurahan-alamat-id-perusahaan').val(this['kelu_id_old']);
         if ($('#inp-kelurahan-alamat-id-perusahaan').val() === "" || $('#inp-kelurahan-alamat-id-perusahaan').val() === "null") {
          $('#inp-kelurahan-alamat-id-perusahaan').val(this['kelu_id']);
         }
         if ($('#inp-kelurahan-alamat-id-perusahaan').val() === "" || $('#inp-kelurahan-alamat-id-perusahaan').val() === "null") {
          $('#inp-kelurahan-alamat-id-perusahaan').val("");
         }
         // $('#inp-kelurahan-alamat-perusahaan2').val(this['kelu_id_new']);
         // $('#slc-alasan-kelurahan-com').val(this['r_kelu_id']);
         $('#inp-kecamatan-alamat-perusahaan').val(this['keca_old_name']);
         if ($('#inp-kecamatan-alamat-perusahaan').val() === "" || $('#inp-kecamatan-alamat-perusahaan').val() === "null") {
          $('#inp-kecamatan-alamat-perusahaan').val(this['keca_name']);
         }
         if ($('#inp-kecamatan-alamat-perusahaan').val() === "" || $('#inp-kecamatan-alamat-perusahaan').val() === "null") {
          $('#inp-kecamatan-alamat-perusahaan').val("");
         }

         $('#inp-kecamatan-alamat-id-perusahaan').val(this['keca_id_old']);
         if ($('#inp-kecamatan-alamat-id-perusahaan').val() === "" || $('#inp-kecamatan-alamat-id-perusahaan').val() === "null") {
          $('#inp-kecamatan-alamat-id-perusahaan').val(this['keca_id'])
         }
         if ($('#inp-kecamatan-alamat-id-perusahaan').val() === "" || $('#inp-kecamatan-alamat-id-perusahaan').val() === "null") {
          $('#inp-kecamatan-alamat-id-perusahaan').val("");
         }
         // $('#inp-kecamatan-alamat-perusahaan2').val(this['keca_id_new']);
         // $('#slc-alasan-kecamatan-com').val(this['r_keca_id']);
         $('#inp-kabupaten-alamat-perusahaan').val(this['kab_old_name']);
         if ($('#inp-kabupaten-alamat-perusahaan').val() === "" || $('#inp-kabupaten-alamat-perusahaan').val() === "null") {
          $('#inp-kabupaten-alamat-perusahaan').val(this['kab_name']);
         }
         if ($('#inp-kabupaten-alamat-perusahaan').val() === "" || $('#inp-kabupaten-alamat-perusahaan').val() === "null") {
          $('#inp-kabupaten-alamat-perusahaan').val("");
         }

         $('#inp-kabupaten-alamat-id-perusahaan').val(this['kab_id_old']);
         if ($('#inp-kabupaten-alamat-id-perusahaan').val() === "" || $('#inp-kabupaten-alamat-id-perusahaan').val() === "null") {
          $('#inp-kabupaten-alamat-id-perusahaan').val(this['kab_id']);
         }
         if ($('#inp-kabupaten-alamat-id-perusahaan').val() === "" || $('#inp-kabupaten-alamat-id-perusahaan').val() === "null") {
          $('#inp-kabupaten-alamat-id-perusahaan').val("");
         }
         // $('#inp-kabupaten-alamat-perusahaan2').val(this['kab_id_new']);
         // $('#slc-alasan-kabupaten-com').val(this['r_kab_id']);
         $('#inp-provinsi-alamat-perusahaan').val(this['prov_old_name']);
         if ($('#inp-provinsi-alamat-perusahaan').val() === "" || $('#inp-provinsi-alamat-perusahaan').val() === "null") {
          $('#inp-provinsi-alamat-perusahaan').val(this['prov_name']);
         }
         if ($('#inp-provinsi-alamat-perusahaan').val() === "" || $('#inp-provinsi-alamat-perusahaan').val() === "null") {
          $('#inp-provinsi-alamat-perusahaan').val("");
         }

         $('#inp-provinsi-alamat-id-perusahaan').val(this['prov_id_old']);
         if ($('#inp-provinsi-alamat-id-perusahaan').val() === "" || $('#inp-provinsi-alamat-id-perusahaan').val() === "null") {
          $('#inp-provinsi-alamat-id-perusahaan').val(this['prov_id']);
         }
         if ($('#inp-provinsi-alamat-id-perusahaan').val() === "" || $('#inp-provinsi-alamat-id-perusahaan').val() === "null") {
          $('#inp-provinsi-alamat-id-perusahaan').val("");
         }
         // $('#inp-provinsi-alamat-perusahaan2').val(this['prov_id_new']);
         // $('#slc-alasan-provinsi-com').val(this['r_prov_id']);

         $('#inp-subkode-pos-alamat-perusahaan').val(this['subzipcode_old']);
         if ($('#inp-subkode-pos-alamat-perusahaan').val() === "") {
          $('#inp-subkode-pos-alamat-perusahaan').val(this['subzipcode']);
         }
         $('#inp-subkode-pos-alamat-perusahaan2').val(this['subzipcode_new']);
         $('#slc-alasan-subkode-com').val(this['r_subzipcode']);

         $('#inp-telp-alamat-perusahaan').val(this['phone_old']);
         if ($('#inp-telp-alamat-perusahaan').val() === "") {
          $('#inp-telp-alamat-perusahaan').val(this['phone']);
         }
         $('#inp-telp-alamat-perusahaan2').val(this['phone_new']);
         $('#slc-alasan-no-telp-com').val(this['r_phone']);

         $('#inp-fax-alamat-perusahaan').val(this['fax_old']);
         if ($('#inp-fax-alamat-perusahaan').val() === "") {
          $('#inp-fax-alamat-perusahaan').val(this['fax']);
         }
         $('#inp-fax-alamat-perusahaan2').val(this['fax_new']);
         $('#slc-alasan-no-fax-com').val(this['r_fax']);

         $('#inp-email-perusahaan').val(this['email_old']);
         if ($('#inp-email-perusahaan').val() === "") {
          $('#inp-email-perusahaan').val(this['email']);
         }
         $('#inp-email-perusahaan2').val(this['email_new']);
         $('#slc-alasan-email-com').val(this['r_email']);

         $('#inp-no-akte-perusahaan').val(this['notary_no_old'])
         if ($('#inp-no-akte-perusahaan').val() === "") {
          $('#inp-no-akte-perusahaan').val(this['notary_no']);
         }
         $('#inp-no-akte-perusahaan2').val(this['notary_no_new']);
         $('#slc-alasan-no-akte-com').val(this['r_notary_no']);

         $('#inp-tgl-pendirian-perusahaan').val(this['notary_date_old']);
         if ($('#inp-tgl-pendirian-perusahaan').val() === "") {
          $('#inp-tgl-pendirian-perusahaan').val(this['notary_date']);
         }
         $('#inp-tgl-pendirian-perusahaan2').val(this['notary_date_new']);
         $('#slc-alasan-tgl-pendirian-com').val(this['r_notary_date']);

         $('#inp-no-resi-perusahaan').val(this['resi_no_old']);
         if ($('#inp-no-resi-perusahaan').val() === "") {
          $('#inp-no-resi-perusahaan').val(this['resi_no']);
         }
         $('#inp-no-resi-perusahaan2').val(this['resi_no_new']);
         $('#slc-alasan-no-resi-com').val(this['r_resi_no']);

         $('#inp-tgl-resi-perusahaan').val(this['resi_date_old']);
         if ($('#inp-tgl-resi-perusahaan').val() === "") {
          $('#inp-tgl-resi-perusahaan').val(this['resi_date']);
         }
         $('#inp-tgl-resi-perusahaan2').val(this['resi_date_new']);
         $('#slc-alasan-tgl-resi-com').val(this['r_resi_date']);

         $('#inp-no-npwp-perusahaan').val(this['npwp_no_old']);
         if ($('#inp-no-npwp-perusahaan').val() === "") {
          $('#inp-no-npwp-perusahaan').val(this['npwp_no']);
         }
         $('#inp-no-npwp-perusahaan2').val(this['npwp_no_com_new']);
         $('#slc-alasan-no-npwp-com').val(this['r_npwno_com']);

         $('#inp-no-siup-perusahaan').val(this['siupno_old']);
         if ($('#inp-no-siup-perusahaan').val() === "") {
          $('#inp-no-siup-perusahaan').val(this['siupno']);
         }
         $('#inp-no-siup-perusahaan2').val(this['siupno_new']);
         $('#slc-alasan-no-siup-com').val(this['r_siuno']);

         $('#inp-tgl-siup-perusahaan').val(this['siupdate_old']);
         if ($('#inp-tgl-siup-perusahaan').val() === "") {
          $('#inp-tgl-siup-perusahaan').val(this['siupdate_old']);
         }
         $('#inp-tgl-siup-perusahaan2').val(this['siupdate_new']);
         $('#slc-alasan-tgl-siup-com').val(this['r_siupdate']);

         $('#inp-no-tdp-perusahaan').val(this['tdpno_old']);
         if ($('#inp-no-tdp-perusahaan').val() === "") {
          $('#inp-no-tdp-perusahaan').val(this['tdpno_old']);
         }
         $('#inp-no-tdp-perusahaan2').val(this['tdpno_new']);
         $('#slc-alasan-no-tdp-com').val(this['r_tdno']);

         $('#inp-tgl-tdp-perusahaan').val(this['tdpdate_old']);
         if ($('#inp-tgl-tdp-perusahaan').val() === "") {
          $('#inp-tgl-tdp-perusahaan').val(this['tdpdate']);
         }
         $('#inp-tgl-tdp-perusahaan2').val(this['tdpdate_new']);
         $('#slc-alasan-tgl-tdp-com').val(this['r_tddate']);


         $('#inp-tgl-akta-perusahaan').val(this['akta_date_old']);
         if ($('#inp-tgl-akta-perusahaan').val() === "") {
          $('#inp-tgl-akta-perusahaan').val(this['akta_date']);
         }
         $('#inp-tgl-akta-perusahaan2').val(this['akta_date_new']);
         $('#slc-alasan-tgl-akta-com').val(this['r_akta_date']);


         $('#inp-sektor-ekonomi-perusahaan').val(this['sect_eco__name_old']);
         $('#inp-sektor-ekonomi-id-perusahaan').val(this['sect_eco_old']);
         if ($('#inp-sektor-ekonomi-perusahaan').val() === "" || $('#inp-sektor-ekonomi-id-perusahaan').val() === "" || $('#inp-sektor-ekonomi-perusahaan').val() === "null" || $('#inp-sektor-ekonomi-id-perusahaan').val() === "null") {
          $('#inp-sektor-ekonomi-perusahaan').val(this['sect_eco_name']);
          $('#inp-sektor-ekonomi-id-perusahaan').val(this['sect_eco']);
         }
         $('#inp-sektor-ekonomi-perusahaan2').val(this['sect_eco_name_new']);
         $('#inp-sektor-ekonomi-id-perusahaan2').val(this['sect_eco_new']);
         if ($('#inp-sektor-ekonomi-perusahaan2').val() === "" || $('#inp-sektor-ekonomi-id-perusahaan2').val() === "" || $('#inp-sektor-ekonomi-perusahaan2').val() === "null" || $('#inp-sektor-ekonomi-id-perusahaan2').val() === "null") {
          $('#inp-sektor-ekonomi-perusahaan2').val("");
          $('#inp-sektor-ekonomi-id-perusahaan2').val("");
         }
         $('#slc-alasan-sektor-com').val(this['r_sect_eco']);

         $('#inp-lapangan-usaha-perusahaan').val(this['nature_buss_name_old']);
         $('#inp-lapangan-usaha-id-perusahaan').val(this['nature_buss_old']);
         if ($('#inp-lapangan-usaha-perusahaan').val() === "" || $('#inp-lapangan-usaha-id-perusahaan').val() === "" || $('#inp-lapangan-usaha-perusahaan').val() === "null" || $('#inp-lapangan-usaha-id-perusahaan').val() === "null") {
          $('#inp-lapangan-usaha-perusahaan').val(this['nature_buss_name']);
          $('#inp-lapangan-usaha-id-perusahaan').val(this['nature_buss']);
         }
         $('#inp-lapangan-usaha-perusahaan2').val(this['nature_buss_name_new']);
         $('#inp-lapangan-usaha-id-perusahaan2').val(this['nature_buss_new']);
         if ($('#inp-lapangan-usaha-perusahaan2').val() === "" || $('#inp-lapangan-usaha-id-perusahaan2').val() === "" || $('#inp-lapangan-usaha-perusahaan2').val() === "null" || $('#inp-lapangan-usaha-id-perusahaan2').val() === "null") {
          $('#inp-lapangan-usaha-perusahaan2').val("");
          $('#inp-lapangan-usaha-id-perusahaan2').val("");
         }
         $('#slc-alasan-lapangan-com').val(this['r_nature_buss']);

         $('#inp-lama-usaha').val(this['nyob_old']);
         if ($('#inp-lama-usaha').val() === "") {
          $('#inp-lama-usaha').val(this['nyob']);
         }
         $('#inp-lama-usaha2').val(this['nyob_new']);
         $('#slc-alasan-lama-usaha-com').val(this['r_nyob']);

         $('#inp-total-pegawai').val(this['no_empl_old']);
         if ($('#inp-total-pegawai').val() === "") {
          $('#inp-total-pegawai').val(this['no_emp']);
         }
         $('#inp-total-pegawai2').val(this['no_empl_new']);
         $('#slc-alasan-ttl-pgw-com').val(this['r_no_empl']);

         $('#slc-public-perusahaan').val(this['go_public_old']);
         if ($('#slc-public-perusahaan').val() === "") {
          $('#slc-public-perusahaan').val(this['go_public']);
         }
         $('#slc-public-perusahaan2').val(this['go_public_new']);
         $('#slc-alasan-public-com').val(this['r_go_public']);

         $('#slc-milik-tmpt').val(this['comown_old']);
         if ($('#slc-milik-tmpt').val() === "") {
          $('#slc-milik-tmpt').val(this['comown']);
         }
         $('#slc-milik-tmpt2').val(this['comown_new']);
         $('#slc-alasan-milik-com').val(this['r_comown']);

         $('#slc-status-lokasi').val(this['buss_loct_old']);
         if ($('#slc-status-lokasi').val() === "") {
          $('#slc-status-lokasi').val(this['buss_loct']);
         }
         $('#slc-status-lokasi2').val(this['buss_loct_new']);
         $('#slc-alasan-stat-lok-com').val(this['r_buss_loct']);

         $('#inp-modal-dasar-perusahaan').val(this['modal_dasar_old']);
         if ($('#inp-modal-dasar-perusahaan').val() === "") {
          $('#inp-modal-dasar-perusahaan').val(this['modal_dasar']);
         }
         $('#inp-modal-dasar-perusahaan2').val(this['modal_dasar_new']);
         $('#slc-alasan-modal-dasar-com').val(this['r_modal_dasar']);

         $('#inp-paid-up-perusahaan').val(this['paid_up_old']);
         if ($('#inp-paid-up-perusahaan').val() === "") {
          $('#inp-paid-up-perusahaan').val(this['paid_up']);
         }
         $('#slc-paid-up-perusahaan2').val(this['paid_up_new']);
         $('#inp-alasan-paid-up-com').val(this['r_paid_up']);
        });
       }
       if (data['dtl_hold_per'] !== null) {
        $.each(data['dtl_hold_per'], function(index) {
         $('#id-type-holder-pri').val(this['hold_idtype_old']);
         if ($('#id-type-holder-pri').val() === "" || $('#id-type-holder-pri').val() === "null") {
          $('#id-type-holder-pri').val(this['hold_idtype']);
         }

         $('#inp-id-no-holder-pri').val(this['hold_idno_old']);
         if ($('#inp-id-no-holder-pri').val() === "" || $('#inp-id-no-holder-pri').val() === "null") {
          $('#inp-id-no-holder-pri').val(this['hold_idno']);
         }

         $('#inp-tgl-id-holder-pri').val(this['hold_iddate_old']);
         if ($('#inp-tgl-id-holder-pri').val() === "" || $('#inp-tgl-id-holder-pri').val() === "null") {
          $('#inp-tgl-id-holder-pri').val(this['hold_iddate']);
         }
         $('#inp-tgl-id-holder-pri2').val(this['hold_iddate_new']);
         $('#slc-alasan-tgl-id-holder-pri').val(this['r_hold_iddate']);


         $('#inp-exp-date-holder-pri').val(this['hold_expdate_old']);
         if ($('#inp-exp-date-holder-pri').val() === "" || $('#inp-exp-date-holder-pri').val() === "null") {
          $('#inp-exp-date-holder-pri').val(this['hold_expdate']);
         }

         $('#inp-nama-awal-holder-pri').val(this['hold_fname']);
         $('#inp-nama-akhir-holder-pri').val(this['hold_lname']);

         $('#inp-alias-holder-pri').val(this['hold_alias_old']);
         if ($('#inp-alias-holder-pri').val() === "" || $('#inp-alias-holder-pri').val() === "null") {
          $('#inp-alias-holder-pri').val(this['hold_alias']);
         }
         $('#inp-alias-holder-pri2').val(this['hold_alias_new']);
         $('#slc-alasan-alias-holder-pri').val(this['r_hold_alias']);

         $('#inp-gelar-holder-pri').val(this['hold_title_old']);
         if ($('#inp-gelar-holder-pri').val() === "" || $('#inp-gelar-holder-pri').val() === "null") {
          $('#inp-gelar-holder-pri').val(this['hold_title']);
         }
         $('#inp-gelar-holder-pri2').val(this['hold_title_new']);
         $('#slc-alasan-gelar-holder-pri').val(this['r_hold_title']);

         $('#inp-tempat-lahir-holder-pri').val(this['hold_bornplc_old']);
         if ($('#inp-tempat-lahir-holder-pri').val() === "" || $('#inp-tempat-lahir-holder-pri').val() === "null") {
          $('#inp-tempat-lahir-holder-pri').val(this['hold_bornplc']);
         }

         $('#inp-tanggal-lahir-holder-pri').val(this['hold_borndate_old']);
         if ($('#inp-tanggal-lahir-holder-pri').val() === "" || $('#inp-tanggal-lahir-holder-pri').val() === "null") {
          $('#inp-tanggal-lahir-holder-pri').val(this['hold_borndate']);
         }

         $('#slc-jenis-kelamin-holder-pri').val(this['hold_gender_old']);
         if ($('#slc-jenis-kelamin-holder-pri').val() === "" || $('#slc-jenis-kelamin-holder-pri').val() === "null") {
          $('#slc-jenis-kelamin-holder-pri').val(this['hold_gender']);
         }
         $('#slc-jenis-kelamin-holder-pri2').val(this['hold_gender_new']);
         $('#slc-alasan-jns-klmn-holder-pri').val(this['r_hold_gender']);

         $('#slc-agama-holder-pri').val(this['hold_religi_old']);
         if ($('#slc-agama-holder-pri').val() === "" || $('#slc-agama-holder-pri').val() === "null") {
          $('#slc-agama-holder-pri').val(this['hold_religi']);
         }
         $('#slc-agama-holder-pri2').val(this['hold_religi_new']);
         $('#slc-alasan-agama-holder-pri').val(this['r_hold_religi']);

         $('#slc-status-pernikahan-holder-pri').val(this['hold_marital_old']);
         if ($('#slc-status-pernikahan-holder-pri').val() === "" || $('#slc-status-pernikahan-holder-pri').val() === "null") {
          $('#slc-status-pernikahan-holder-pri').val(this['hold_marital']);
         }
         $('#slc-status-pernikahan-holder-pri2').val(this['hold_marital_new']);
         $('#slc-alasan-pernikahan-holder-pri').val(this['r_hold_marital']);


         $('#inp-alamat-holder-pri').val(this['hold_addr_old']);
         if ($('#inp-alamat-holder-pri').val() === "" || $('#inp-alamat-holder-pri').val() === "null") {
          $('#inp-alamat-holder-pri').val(this['hold_addr']);
         }
         $('#inp-alamat-holder-pri2').val(this['hold_addr_new']);
         $('#slc-alasan-alamat-holder-pri').val(this['r_hold_addr']);

         // $('#inp-rtrw-holder-pri').val(this['hold_rtrw_old']);
         // if ($('#inp-rtrw-holder-pri').val() === "" || $('#inp-rtrw-holder-pri').val() === "null") {
         //  $('#inp-rtrw-holder-pri').val(this['hold_rtrw']);
         // }

         // if (this['hold_rtrw_new'] != null) {
         //  var str_hold_pri_rt = this['hold_rtrw_new'];
         //  var rt_rw_holder_pri = str_hold_pri_rt.split("/");
         //  $('#inp-rtrw-holder-pri2').val(rt_rw_holder_pri[0]);
         //  $('#inp-rw-holder-pri2').val(rt_rw_holder_pri[1]);
         // } else {
         //  $('#inp-rtrw-holder-pri2').val(this['hold_rtrw_new']);
         //  $('#inp-rw-holder-pri2').val(this['hold_rtrw_new']);
         // }

         // $('#slc-alasan-rtrw-holder-pri').val(this['r_hold_rtrw']);
         $('#inp-rtrw-holder-pri').val(this['hold_rtrw_old']);
        if ($('#inp-rtrw-holder-pri').val() === "" || $('#inp-rtrw-holder-pri').val() === "null") {
         $('#inp-rtrw-holder-pri').val(this['hold_rtrw']);
        }
        $('#inp-rtrw-holder-pri2').val(this['hold_rtrw_new']);
        if ($('#inp-rtrw-holder-pri2').val() === "" || $('#inp-rtrw-holder-pri2').val() === "null") {
         $('#inp-rtrw-holder-pri2').val("");
        }
        $('#inp-rw-holder-pri').val(this['hold_rw_old']);
        if ($('#inp-rw-holder-pri').val() === "" || $('#inp-rw-holder-pri').val() === "null") {
         $('#inp-rw-holder-pri').val(this['hold_rw']);
        }
        $('#inp-rw-holder-pri2').val(this['hold_rw_new']);
        if ($('#inp-rw-holder-pri2').val() === "" || $('#inp-rw-holder-pri2').val() === "null") {
         $('#inp-rw-holder-pri2').val("");
        }
        $('#slc-alasan-rtrw-holder-pri').val(this['r_hold_rtrw']);

         $('#inp-kodepos-holder-pri').val(this['hold_zipcode_old']);
         if ($('#inp-kodepos-holder-pri').val() === "" || $('#inp-kodepos-holder-pri').val() === "null") {
          $('#inp-kodepos-holder-pri').val(this['hold_zipcode']);
         }
         $('#inp-kodepos-holder-pri2').val(this['hold_zipcode_new']);
         $('#slc-alasan-kodepos-holder-pri').val(this['r_hold_zipcode']);

         $('#inp-kelurahan-alamat-holder-pri-id').val(this['hold_kelu_old']);
         $('#inp-kelurahan-alamat-holder-pri').val(this['hold_kelu_old_name']);
         if ($('#inp-kelurahan-alamat-holder-pri-id').val() === "" || $('#inp-kelurahan-alamat-holder-pri-id').val() === "null" || $('#inp-kelurahan-alamat-holder-pri').val() === "" || $('#inp-kelurahan-alamat-holder-pri').val() === "null") {
          $('#inp-kelurahan-alamat-holder-pri-id').val(this['hold_kelu']);
          $('#inp-kelurahan-alamat-holder-pri').val(this['hold_kelu_name']);
          if ($('#inp-kelurahan-alamat-holder-pri-id').val() === "" || $('#inp-kelurahan-alamat-holder-pri-id').val() === "null" || $('#inp-kelurahan-alamat-holder-pri').val() === "" || $('#inp-kelurahan-alamat-holder-pri').val() === "null") {
           $('#inp-kelurahan-alamat-holder-pri-id').val("");
           $('#inp-kelurahan-alamat-holder-pri').val("");
          }
         }
         $('#inp-kelurahan-alamat-holder-pri-id2').val(this['hold_kelu_new']);
         $('#inp-kelurahan-alamat-holder-pri2').val(this['hold_kelu_new_name']);
         if ($('#inp-kelurahan-alamat-holder-pri-id2').val() === "" || $('#inp-kelurahan-alamat-holder-pri-id2').val() === "null" || $('#inp-kelurahan-alamat-holder-pri2').val() === "" || $('#inp-kelurahan-alamat-holder-pri2').val() === "null") {
          $('#inp-kelurahan-alamat-holder-pri-id2').val("");
          $('#inp-kelurahan-alamat-holder-pri2').val("");
         }
         $('#slc-alasan-kelurahan-holder-pri').val(this['r_hold_kelu']);

         // $('#inp-kecamatan-alamat-holder-pri-id').val(this['hold_keca_old']);
         $('#inp-kecamatan-alamat-holder-pri').val(this['hold_keca_old_name']);
         if ($('#inp-kecamatan-alamat-holder-pri').val() === "" || $('#inp-kecamatan-alamat-holder-pri').val() === "null" || $('#inp-kecamatan-alamat-holder-pri').val() === "" || $('#inp-kecamatan-alamat-holder-pri').val() === "null") {
          // $('#inp-kecamatan-alamat-holder-pri-id').val(this['hold_keca']);
          $('#inp-kecamatan-alamat-holder-pri').val(this['hold_keca_name']);
          if ($('#inp-kecamatan-alamat-holder-pri').val() === "" || $('#inp-kecamatan-alamat-holder-pri').val() === "null" || $('#inp-kecamatan-alamat-holder-pri').val() === "" || $('#inp-kecamatan-alamat-holder-pri').val() === "null") {
           // $('#inp-kecamatan-alamat-holder-pri-id').val("");
           $('#inp-kecamatan-alamat-holder-pri').val("");
          }
         }
         // $('#inp-kecamatan-alamat-holder-pri-id2').val(this['hold_keca_new']);
         $('#inp-kecamatan-alamat-holder-pri2').val(this['hold_keca_new_name']);
         if ($('#inp-kecamatan-alamat-holder-pri2').val() === "" || $('#inp-kecamatan-alamat-holder-pri2').val() === "null" || $('#inp-kecamatan-alamat-holder-pri2').val() === "" || $('#inp-kecamatan-alamat-holder-pri2').val() === "null") {
          // $('#inp-kecamatan-alamat-holder-pri-id2').val("");
          $('#inp-kecamatan-alamat-holder-pri2').val("");
         }
         $('#slc-alasan-kecamatan-holder-pri').val(this['r_hold_keca']);

         // $('#inp-kabupaten-alamat-holder-pri-id').val(this['hold_kabu_old']);
         $('#inp-kabupaten-alamat-holder-pri').val(this['hold_kabu_old_name']);
         if ($('#inp-kabupaten-alamat-holder-pri').val() === "" || $('#inp-kabupaten-alamat-holder-pri').val() === "null" || $('#inp-kabupaten-alamat-holder-pri').val() === "" || $('#inp-kabupaten-alamat-holder-pri').val() === "null") {
          // $('#inp-kabupaten-alamat-holder-pri-id').val(this['hold_kabu']);
          $('#inp-kabupaten-alamat-holder-pri').val(this['hold_kabkot_name']);
          if ($('#inp-kabupaten-alamat-holder-pri').val() === "" || $('#inp-kabupaten-alamat-holder-pri').val() === "null" || $('#inp-kabupaten-alamat-holder-pri').val() === "" || $('#inp-kabupaten-alamat-holder-pri').val() === "null") {
           // $('#inp-kabupaten-alamat-holder-pri-id').val("");
           $('#inp-kabupaten-alamat-holder-pri').val("");
          }
         }
         // $('#inp-kabupaten-alamat-holder-pri-id2').val(this['hold_kabu_new']);
         $('#inp-kabupaten-alamat-holder-pri2').val(this['hold_kabu_new_name']);
         if ($('#inp-kabupaten-alamat-holder-pri2').val() === "" || $('#inp-kabupaten-alamat-holder-pri2').val() === "null" || $('#inp-kabupaten-alamat-holder-pri2').val() === "" || $('#inp-kabupaten-alamat-holder-pri2').val() === "null") {
          // $('#inp-kabupaten-alamat-holder-pri-id2').val("");
          $('#inp-kabupaten-alamat-holder-pri2').val("");
         }
         $('#slc-alasan-kabupaten-holder-pri').val(this['r_hold_kabu']);

         // $('#inp-provinsi-holder-pri-id').val(this['hold_prov_old']);
         $('#inp-provinsi-alamat-holder-pri').val(this['hold_prov_old_name']);
         // if ($('#inp-provinsi-holder-pri-id').val() === "" || $('#inp-provinsi-holder-pri-id').val() === "null") {
         //  $('#inp-provinsi-holder-pri-id').val(this['hold_prov']);
         //  if ($('#inp-provinsi-holder-pri-id').val() === "" || $('#inp-provinsi-holder-pri-id').val() === "null") {
         //   $('#inp-provinsi-holder-pri-id').val("");
         //  }
         // }
         if ($('#inp-provinsi-alamat-holder-pri').val() === "" || $('#inp-provinsi-alamat-holder-pri').val() === "null") {
          $('#inp-provinsi-alamat-holder-pri').val(this['hold_prov_name']);
          if ($('#inp-provinsi-alamat-holder-pri').val() === "" || $('#inp-provinsi-alamat-holder-pri').val() === "null") {
           $('#inp-provinsi-alamat-holder-pri').val("");
          }
         }
         // $('#inp-provinsi-holder-pri-id2').val(this['hold_prov_new']);
         $('#inp-provinsi-alamat-holder-pri2').val(this['hold_prov_new_name']);
         // if ($('#inp-provinsi-holder-pri-id2').val() === "" || $('#inp-provinsi-holder-pri-id2').val() === "null") {
         //  $('#inp-provinsi-holder-pri-id2').val("");
         // }
         if ($('#inp-provinsi-alamat-holder-pri2').val() === "" || $('#inp-provinsi-alamat-holder-pri2').val() === "null") {
          $('#inp-provinsi-alamat-holder-pri2').val("");
         }
         $('#slc-alasan-provinsi-holder-pri').val(this['r_hold_prov']);

         $('#inp-npwp-holder-pri').val(this['hold_npwp_old']);
         if ($('#inp-npwp-holder-pri').val() === "" || $('#inp-npwp-holder-pri').val() === "null") {
          $('#inp-npwp-holder-pri').val(this['hold_npwp']);
         }
         $('#inp-npwp-holder-pri2').val(this['hold_npwnew']);
         $('#slc-alasan-npwp-holder-pri').val(this['r_hold_npwp']);

         $('#inp-telepon-holder-pri').val(this['hold_notelp_old']);
         if ($('#inp-telepon-holder-pri').val() === "" || $('#inp-telepon-holder-pri').val() === "null") {
          $('#inp-telepon-holder-pri').val(this['hold_notelp']);
         }
         $('#inp-telepon-holder-pri2').val(this['hold_notelnew']);
         $('#slc-alasan-no-tlp-holder-pri').val(this['r_hold_notelp']);

         $('#inp-hanphone-holder-pri').val(this['hold_nohp_old']);
         if ($('#inp-hanphone-holder-pri').val() === "" || $('#inp-hanphone-holder-pri').val() === "null") {
          $('#inp-hanphone-holder-pri').val(this['hold_nohp']);
         }
         $('#inp-hanphone-holder-pri2').val(this['hold_nohnew']);
         $('#slc-alasan-no-hp-holder-pri').val(this['r_hold_nohp']);

         $('#inp-fax-holder-pri').val(this['hold_fax_old']);
         if ($('#inp-fax-holder-pri').val() === "" || $('#inp-fax-holder-pri').val() === "null") {
          $('#inp-fax-holder-pri').val(this['hold_fax']);
         }
         $('#inp-fax-holder-pri2').val(this['hold_fax_new']);
         $('#slc-alasan-no-fax-holder-pri').val(this['r_hold_fax']);

         $('#inp-email-holder-pri').val(this['hold_email_old']);
         if ($('#inp-email-holder-pri').val() === "" || $('#inp-email-holder-pri').val() === "null") {
          $('#inp-email-holder-pri').val(this['hold_email']);
         }
         $('#inp-email-holder-pri2').val(this['hold_email_new']);
         $('#slc-alasan-email-holder-pri').val(this['r_hold_email']);

         $('#inp-share-holder-pri').val(this['hold_share_old']);
         if ($('#inp-share-holder-pri').val() === "" || $('#inp-share-holder-pri').val() === "null" || $('#inp-share-holder-pri').val() === "0") {
          $('#inp-share-holder-pri').val(this['hold_share']);
          if ($('#inp-share-holder-pri').val() === "" || $('#inp-share-holder-pri').val() === "null" || $('#inp-share-holder-pri').val() === "0") {
            $('#inp-share-holder-pri').val("");
          }
         }
         $('#inp-share-holder-pri2').val(this['hold_share_new']);
         if ($('#inp-share-holder-pri2').val() === "" || $('#inp-share-holder-pri2').val() === "null" || $('#inp-share-holder-pri2').val() === "0") {
            $('#inp-share-holder-pri2').val("");
         }
         $('#slc-alasan-share-holder-pri').val(this['r_hold_share']);

         $('#inp-jabatan-holder-pri').val(this['hold_jabatan_old']);
         if ($('#inp-jabatan-holder-pri').val() === "" || $('#inp-jabatan-holder-pri').val() === "null") {
          $('#inp-jabatan-holder-pri').val(this['hold_jabatan']);
         }
         $('#inp-jabatan-holder-pri2').val(this['hold_jabatan_new']);
         $('#slc-alasan-jabatan-holder-pri').val(this['r_hold_jabatan']);
        });
       }
       if (data['dtl_hold_ent'] !== null) {
        $.each(data['dtl_hold_ent'], function(index) {
         $('#id-comtype-holder-ent').val(this['hold_company_type_old']);
         if ($('#id-comtype-holder-ent').val() === "" || $('#id-comtype-holder-ent').val() === "null") {
          $('#id-comtype-holder-ent').val(this['hold_company_type']);
         }
         $('#id-comtype-holder-ent2').val(this['hold_company_type_new']);
         $('#slc-alasan-id-comtype-holder-ent').val(this['r_hold_company_type']);

         $('#inp-comname-holder-ent').val(this['hold_company_name_old']);
         if ($('#inp-comname-holder-ent').val() === "" || $('#inp-comname-holder-ent').val() === "null") {
          $('#inp-comname-holder-ent').val(this['hold_company_name']);
         }
         $('#inp-comname-holder-ent2').val(this['hold_company_name_new']);
         $('#slc-alasan-comname-holder-ent').val(this['r_hold_company_name']);

         $('#inp-alamat-holder-ent').val(this['hold_addr_old']);
         if ($('#inp-alamat-holder-ent').val() === "" || $('#inp-alamat-holder-ent').val() === "null") {
          $('#inp-alamat-holder-ent').val(this['hold_addr']);
         }
         $('#inp-alamat-holder-ent2').val(this['hold_addr_new']);
         $('#slc-alasan-alamat-holder-ent').val(this['r_hold_addr']);

         // $('#inp-rtrw-holder-ent').val(this['hold_rtrw_old']);
         // if ($('#inp-rtrw-holder-ent').val() === "" || $('#inp-rtrw-holder-ent').val() === "null") {
         //  $('#inp-rtrw-holder-ent').val(this['hold_rtrw']);
         // }

         // if (this['hold_rtrw_new'] != null) {
         //  var str_hold_ent_rtrw = this['hold_rtrw_new'];
         //  var rt_rw_holder_ent = str_hold_ent_rtrw.split("/");
         //  $('#inp-rtrw-holder-ent2').val(rt_rw_holder_ent[0]);
         //  $('#inp-rw-holder-ent2').val(rt_rw_holder_ent[1]);
         // } else {
         //  $('#inp-rtrw-holder-ent2').val(this['hold_rtrw_new']);
         //  $('#inp-rw-holder-ent2').val(this['hold_rtrw_new']);
         // }

         // $('#slc-alasan-rtrw-holder-ent').val(this['r_hold_rtrw']);
         $('#inp-rtrw-holder-ent').val(this['hold_rtrw_old']);
        if ($('#inp-rtrw-holder-ent').val() === "" || $('#inp-rtrw-holder-ent').val() === "null") {
         $('#inp-rtrw-holder-ent').val(this['hold_rtrw']);
        }
        $('#inp-rtrw-holder-ent2').val(this['hold_rtrw_new']);
        if ($('#inp-rtrw-holder-ent2').val() === "" || $('#inp-rtrw-holder-ent2').val() === "null") {
         $('#inp-rtrw-holder-ent2').val("");
        }
        $('#inp-rw-holder-ent').val(this['hold_rw_old']);
        if ($('#inp-rw-holder-ent').val() === "" || $('#inp-rw-holder-ent').val() === "null") {
         $('#inp-rw-holder-ent').val(this['hold_rw']);
        }
        $('#inp-rw-holder-ent2').val(this['hold_rw_new']);
        if ($('#inp-rw-holder-ent2').val() === "" || $('#inp-rw-holder-ent2').val() === "null") {
         $('#inp-rw-holder-ent2').val("");
        }
        $('#slc-alasan-rtrw-holder-ent').val(this['r_hold_rtrw']);

         $('#inp-kodepos-holder-ent').val(this['hold_zipcode_old']);
         if ($('#inp-kodepos-holder-ent').val() === "" || $('#inp-kodepos-holder-ent').val() === "") {
          $('#inp-kodepos-holder-ent').val(this['hold_zipcode']);
         }
         $('#inp-kodepos-holder-ent2').val(this['hold_zipcode_new']);
         $('#slc-alasan-kodepos-holder-ent').val(this['r_hold_zipcode']);

         $('#inp-kelurahan-holder-ent-id').val(this['hold_kelu_old']);
         if ($('#inp-kelurahan-holder-ent-id').val() === "" || $('#inp-kelurahan-holder-ent-id').val() === "null") {
          $('#inp-kelurahan-holder-ent-id').val(this['hold_kelu']);
          if ($('#inp-kelurahan-holder-ent-id').val() === "" || $('#inp-kelurahan-holder-ent-id').val() === "null") {
           $('#inp-kelurahan-holder-ent-id').val("");
          }
         }
         $('#inp-kelurahan-holder-ent').val(this['hold_kelu_old_name']);
         if ($('#inp-kelurahan-holder-ent').val() === "" || $('#inp-kelurahan-holder-ent').val() === "null") {
          $('#inp-kelurahan-holder-ent').val(this['hold_kelu_name']);
          if ($('#inp-kelurahan-holder-ent').val() === "" || $('#inp-kelurahan-holder-ent').val() === "null") {
           $('#inp-kelurahan-holder-ent').val("");
          }
         }
         $('#inp-kelurahan-holder-ent-id2').val(this['hold_kelu_new']);
         if ($('#inp-kelurahan-holder-ent-id2').val() === "null" || $('#inp-kelurahan-holder-ent-id2').val() === "") {
          $('#inp-kelurahan-holder-ent-id2').val("");
         }
         $('#inp-kelurahan-holder-ent2').val(this['hold_kelu_new_name']);
         if ($('#inp-kelurahan-holder-ent2').val() === "null" || $('#inp-kelurahan-holder-ent2').val() === "") {
          $('#inp-kelurahan-holder-ent2').val("");
         }
         $('#slc-alasan-kelurahan-holder-ent').val(this['r_hold_kelu']);

         // $('#inp-kecamatan-holder-ent-id').val(this['hold_keca_old']);
         // if ($('#inp-kecamatan-holder-ent-id').val() === "" || $('#inp-kecamatan-holder-ent-id').val() === "null") {
         //  $('#inp-kecamatan-holder-ent-id').val(this['hold_keca']);
         //  if ($('#inp-kecamatan-holder-ent-id').val() === "" || $('#inp-kecamatan-holder-ent-id').val() === "null") {
         //   $('#inp-kecamatan-holder-ent-id').val("");
         //  }
         // }
         $('#inp-kecamatan-holder-ent').val(this['hold_keca_old_name']);
         if ($('#inp-kecamatan-holder-ent').val() === "" || $('#inp-kecamatan-holder-ent').val() === "null") {
          $('#inp-kecamatan-holder-ent').val(this['hold_keca_name']);
          if ($('#inp-kecamatan-holder-ent').val() === "" || $('#inp-kecamatan-holder-ent').val() === "null") {
           $('#inp-kecamatan-holder-ent').val("");
          }
         }
         // $('#inp-kecamatan-holder-ent-id2').val(this['hold_keca_new']);
         // if ($('#inp-kecamatan-holder-ent-id2').val() === "" || $('#inp-kecamatan-holder-ent-id2').val() === "null") {
         //  $('#inp-kecamatan-holder-ent-id2').val("");
         // }
         $('#inp-kecamatan-holder-ent2').val(this['hold_keca_new_name']);
         if ($('#inp-kecamatan-holder-ent2').val() === "" || $('#inp-kecamatan-holder-ent2').val() === "null") {
          $('#inp-kecamatan-holder-ent2').val("");
         }
         $('#slc-alasan-kecamatan-holder-ent').val(this['r_hold_keca']);

         // $('#inp-kabupaten-holder-ent-id').val(this['hold_kabu_old']);
         // if ($('#inp-kabupaten-holder-ent-id').val() === "" || $('#inp-kabupaten-holder-ent-id').val() === "null") {
         //  $('#inp-kabupaten-holder-ent-id').val(this['hold_kabu']);
         //  if ($('#inp-kabupaten-holder-ent-id').val() === "" || $('#inp-kabupaten-holder-ent-id').val() === "null") {
         //   $('#inp-kabupaten-holder-ent-id').val("");
         //  }
         // }
         $('#inp-kabupaten-holder-ent').val(this['hold_kabu_old_name']);
         if ($('#inp-kabupaten-holder-ent').val() === "" || $('#inp-kabupaten-holder-ent').val() === "null") {
          $('#inp-kabupaten-holder-ent').val(this['hold_kabkot_name']);
          if ($('#inp-kabupaten-holder-ent').val() === "" || $('#inp-kabupaten-holder-ent').val() === "null") {
           $('#inp-kabupaten-holder-ent').val("");
          }
         }
         // $('#inp-kabupaten-holder-ent-id2').val(this['hold_kabu_new']);
         // if ($('#inp-kabupaten-holder-ent-id2').val() === "" || $('#inp-kabupaten-holder-ent-id2').val() === "null") {
         //  $('#inp-kabupaten-holder-ent-id2').val("");
         // }
         $('#inp-kabupaten-holder-ent2').val(this['hold_kabu_new_name']);
         if ($('#inp-kabupaten-holder-ent2').val() === "" || $('#inp-kabupaten-holder-ent2').val() === "null") {
          $('#inp-kabupaten-holder-ent2').val("");
         }
         $('#slc-alasan-kabupaten-holder-ent').val(this['r_hold_kabu']);

         // $('#inp-provinsi-holder-ent-id').val(this['hold_prov_old']);
         // if ($('#inp-provinsi-holder-ent-id').val() === "" || $('#inp-provinsi-holder-ent-id').val() === "null") {
         //  $('#inp-provinsi-holder-ent-id').val(this['hold_prov']);
         //  if ($('#inp-provinsi-holder-ent-id').val() === "" || $('#inp-provinsi-holder-ent-id').val() === "null") {
         //   $('#inp-provinsi-holder-ent-id').val("");
         //  }
         // }
         $('#inp-provinsi-holder-ent').val(this['hold_prov_old_name']);
         if ($('#inp-provinsi-holder-ent').val() === "" || $('#inp-provinsi-holder-ent').val() === "null") {
          $('#inp-provinsi-holder-ent').val(this['hold_prov_name']);
          if ($('#inp-provinsi-holder-ent').val() === "" || $('#inp-provinsi-holder-ent').val() === "null") {
           $('#inp-provinsi-holder-ent').val("");
          }
         }
         // $('#inp-provinsi-holder-ent-id2').val(this['hold_prov_new']);
         // if ($('#inp-provinsi-holder-ent-id2').val() === "" || $('#inp-provinsi-holder-ent-id2').val() === "null") {
         //  $('#inp-provinsi-holder-ent-id2').val("");
         // }
         $('#inp-provinsi-holder-ent2').val(this['hold_prov_new_name']);
         if ($('#inp-provinsi-holder-ent2').val() === "" || $('#inp-provinsi-holder-ent2').val() === "null") {
          $('#inp-provinsi-holder-ent2').val("");
         }
         $('#slc-alasan-provinsi-holder-ent').val(this['r_hold_prov']);

         $('#inp-subkode-holder-ent').val(this['hold_subzipcode_old']);
         if ($('#inp-subkode-holder-ent').val() === "" || $('#inp-subkode-holder-ent').val() === "null") {
          $('#inp-subkode-holder-ent').val(this['hold_subzipcode']);
         }
         $('#inp-subkode-holder-ent2').val(this['hold_subzipcode_new']);
         $('#slc-alasan-subkode-holder-ent').val(this['r_hold_subzipcode']);

         $('#inp-telepon-holder-ent').val(this['hold_notelp_old']);
         if ($('#inp-telepon-holder-ent').val() === "" || $('#inp-telepon-holder-ent').val() === "null") {
          $('#inp-telepon-holder-ent').val(this['hold_notelp']);
         }
         $('#inp-telepon-holder-ent2').val(this['hold_notelnew']);
         $('#slc-alasan-no-tlp-holder-ent').val(this['r_hold_notelp']);

         $('#inp-fax-holder-ent').val(this['hold_fax_old']);
         if ($('#inp-fax-holder-ent').val() === "" || $('#inp-fax-holder-ent').val() === "null") {
          $('#inp-fax-holder-ent').val(this['hold_fax']);
         }
         $('#inp-fax-holder-ent2').val(this['hold_fax_new']);
         $('#slc-alasan-no-fax-holder-ent').val(this['r_hold_fax']);

         $('#inp-email-holder-ent').val(this['hold_email_old']);
         if ($('#inp-email-holder-ent').val() === "" || $('#inp-email-holder-ent').val() === "null") {
          $('#inp-email-holder-ent').val(this['hold_email']);
         }
         $('#inp-email-holder-ent2').val(this['hold_email_new']);
         $('#slc-alasan-email-holder-ent').val(this['r_hold_email']);

         $('#inp-estno-holder-ent').val(this['hold_establis_no_old']);
         if ($('#inp-estno-holder-ent').val() === "" || $('#inp-estno-holder-ent').val() === "null") {
          $('#inp-estno-holder-ent').val(this['hold_establis_no']);
         }
         $('#inp-estno-holder-ent2').val(this['hold_establis_no_new']);
         $('#slc-alasan-estno-holder-ent').val(this['r_hold_establis_no']);

         $('#inp-estdate-holder-ent').val(this['hold_establis_date_old']);
         if ($('#inp-estdate-holder-ent').val() === "" || $('#inp-estdate-holder-ent').val() === "null") {
          $('#inp-estdate-holder-ent').val(this['hold_establis_date']);
         }
         $('#inp-estdate-holder-ent2').val(this['hold_establis_date_new']);
         $('#slc-alasan-estdate-holder-ent').val(this['r_hold_establis_date']);

         $('#inp-npwp-holder-ent').val(this['hold_npwp_old']);
         if ($('#inp-npwp-holder-ent').val() === "" || $('#inp-npwp-holder-ent').val() === "null") {
          $('#inp-npwp-holder-ent').val(this['hold_npwp']);
         }
         $('#inp-npwp-holder-ent2').val(this['hold_npwnew']);
         $('#slc-alasan-npwp-holder-ent').val(this['r_hold_npwp']);

         // $('#inp-share-holder-ent').val(this['hold_share_old']);
         // if ($('#inp-share-holder-ent').val() === "" || $('#inp-share-holder-ent').val() === "null") {
         //  $('#inp-share-holder-ent').val(this['hold_share']);
         // }
         // $('#inp-share-holder-ent2').val(this['hold_share_new']);
         // $('#slc-alasan-share-holder-ent').val(this['r_hold_share']);

         $('#inp-share-holder-ent').val(this['hold_share_old']);
         if ($('#inp-share-holder-ent').val() === "" || $('#inp-share-holder-ent').val() === "null" || $('#inp-share-holder-ent').val() === "0") {
          $('#inp-share-holder-ent').val(this['hold_share']);
          if ($('#inp-share-holder-ent').val() === "" || $('#inp-share-holder-ent').val() === "null" || $('#inp-share-holder-ent').val() === "0") {
            $('#inp-share-holder-ent').val("");
          }
         }
         $('#inp-share-holder-ent2').val(this['hold_share_new']);
         if ($('#inp-share-holder-ent2').val() === "" || $('#inp-share-holder-ent2').val() === "null" || $('#inp-share-holder-ent2').val() === "0") {
            $('#inp-share-holder-ent2').val("");
         }
         $('#slc-alasan-share-holder-ent').val(this['r_hold_share']);

        });
       }
       if (data['dtl_pic_mgm'] !== null) {
        $.each(data['dtl_pic_mgm'], function(index) {

         $('#id-type-pic').val(this['pic_idtype_old']);
         if ($('#id-type-pic').val() === "" || $('#id-type-pic').val() === "null") {
          $('#id-type-pic').val(this['pic_idtype']);
         }
         // $('#id-type-pic').val(this['pic_idtype_new']);
         // $('#id-type-pic').val(this['r_pic_idtype']);

         $('#inp-id-no-pic').val(this['pic_idno_old']);
         if ($('#inp-id-no-pic').val() === "" || $('#inp-id-no-pic').val() === "null") {
          $('#inp-id-no-pic').val(this['pic_idno']);
         }
         // $('#id-type-pic').val(this['pic_idno_new']);
         // $('#id-type-pic').val(this['r_pic_idno']);

         $('#inp-tgl-id-pic').val(this['pic_iddate_old']);
         if ($('#inp-tgl-id-pic').val() === "" || $('#inp-tgl-id-pic').val() === "null") {
          $('#inp-tgl-id-pic').val(this['pic_iddate']);
         }
         $('#inp-tgl-id-pic2').val(this['pic_iddate_new']);
         $('#slc-alasan-tgl-id-pic').val(this['r_pic_iddate']);

         $('#inp-exp-id-date-pic').val(this['pic_expdate_old']);
         if ($('#inp-exp-id-date-pic').val() === "" || $('#inp-exp-id-date-pic').val() === "null") {
          $('#inp-exp-id-date-pic').val(this['pic_expdate']);
         }
         $('#inp-exp-id-date-pic2').val(this['pic_expdate_new']);
         $('#slc-alasan-exp-id-date-pic').val(this['r_pic_expdate']);

         $('#inp-nama-awal-pic').val(this['pic_fname_old']);
         if ($('#inp-nama-awal-pic').val() === "" || $('#inp-nama-awal-pic').val() === "null") {
          $('#inp-nama-awal-pic').val(this['pic_fname']);
         }
         $('#inp-nama-awal-pic2').val(this['pic_fname_new']);
         $('#slc-alasan-nama-awal-pic').val(this['r_pic_fname']);

         $('#inp-alias-pic').val(this['pic_lname_old']);
         if ($('#inp-alias-pic').val() === "" || $('#inp-alias-pic').val() === "null") {
          $('#inp-alias-pic').val(this['pic_lname']);
         }
         $('#inp-alias-pic2').val(this['pic_lname_new']);
         $('#slc-alasan-alias-pic').val(this['r_pic_lname']);

         $('#inp-gelar-pic').val(this['pic_title_old']);
         if ($('#inp-gelar-pic').val() === "" || $('#inp-gelar-pic').val() === "null") {
          $('#inp-gelar-pic').val(this['pic_title']);
         }
         $('#inp-gelar-pic2').val(this['pic_title_new']);
         $('#slc-alasan-gelar-pic').val(this['r_pic_title']);

         $('#inp-tempat-lahir-pic').val(this['pic_bornplc_old']);
         if ($('#inp-tempat-lahir-pic').val() === "" || $('#inp-tempat-lahir-pic').val() === "null") {
          $('#inp-tempat-lahir-pic').val(this['pic_bornplc']);
         }
         // $('#id-type-pic').val(this['pic_bornplc_new']);
         // $('#id-type-pic').val(this['r_pic_bornplc']);

         $('#inp-tanggal-lahir-pic').val(this['pic_borndate_old']);
         if ($('#inp-tanggal-lahir-pic').val() === "" || $('#inp-tanggal-lahir-pic').val() === "null") {
          $('#inp-tanggal-lahir-pic').val(this['pic_borndate']);
         }
         // $('#id-type-pic').val(this['pic_borndate_new']);
         // $('#id-type-pic').val(this['r_pic_borndate']);

         $('#slc-jenis-kelamin-pic').val(this['pic_gender_old']);
         if ($('#slc-jenis-kelamin-pic').val() === "" || $('#slc-jenis-kelamin-pic').val() === "null") {
          $('#slc-jenis-kelamin-pic').val(this['pic_gender']);
         }
         $('#slc-jenis-kelamin-pic2').val(this['pic_gender_new']);
         $('#slc-alasan-jns-klmn-pic').val(this['r_pic_gender']);

         $('#slc-agama-pic').val(this['pic_religi_old']);
         if ($('#slc-agama-pic').val() === "" || $('#slc-agama-pic').val() === "null") {
          $('#slc-agama-pic').val(this['pic_religi']);
         }
         $('#slc-agama-pic2').val(this['pic_religi_new']);
         $('#slc-alasan-agama-pic').val(this['r_pic_religi']);

         $('#slc-status-pernikahan-pic').val(this['pic_marital_old']);
         if ($('#slc-status-pernikahan-pic').val() === "" || $('#slc-status-pernikahan-pic').val() === "null") {
          $('#slc-status-pernikahan-pic').val(this['pic_marital']);
         }
         $('#slc-status-pernikahan-pic2').val(this['pic_marital_new']);
         $('#slc-alasan-status-pernikahan-pic').val(this['r_pic_marital']);

         $('#inp-alamat-pic').val(this['pic_addr_old']);
         if ($('#inp-alamat-pic').val() === "" || $('#inp-alamat-pic').val() === "null") {
          $('#inp-alamat-pic').val(this['pic_addr']);
         }
         $('#inp-alamat-pic2').val(this['pic_addr_new']);
         $('#slc-alasan-alamat-pic').val(this['r_pic_addr']);

         $('#inp-rtrw-pic').val(this['pic_rtrw_old']);
         if ($('#inp-rtrw-pic').val() === "" || $('#inp-rtrw-pic').val() === "null") {
          $('#inp-rtrw-pic').val(this['pic_rtrw']);
         }

         if (this['pic_rtrw_new'] != null) {
          var str_pic_rtrw = this['pic_rtrw_new'];
          var rt_rw_pic = str_pic_rtrw.split("/");
          $('#inp-rtrw-pic2').val(rt_rw_pic[0]);
          $('#inp-rw-pic2').val(rt_rw_pic[1]);
         } else {
          $('#inp-rtrw-pic2').val(this['pic_rtrw_new']);
          $('#inp-rw-pic2').val(this['pic_rtrw_new']);
         }

         $('#slc-alasan-rtrw-pic').val(this['r_pic_rtrw']);

         $('#inp-kode-pos-alamat-pic').val(this['pic_zipcode_old']);
         if ($('#inp-kode-pos-alamat-pic').val() === "" || $('#inp-kode-pos-alamat-pic').val() === "null") {
          $('#inp-kode-pos-alamat-pic').val(this['pic_zipcode']);
         }
         $('#inp-kode-pos-alamat-pic2').val(this['pic_zipcode_new']);
         $('#slc-alasan-kodepos-pic').val(this['r_pic_zipcode']);

         $('#inp-kelurahan-alamat-pic-id').val(this['pic_kelu_old']);
         if ($('#inp-kelurahan-alamat-pic-id').val() === "" || $('#inp-kelurahan-alamat-pic-id').val() === "null") {
          $('#inp-kelurahan-alamat-pic-id').val(this['pic_kelu']);
          if ($('#inp-kelurahan-alamat-pic-id').val() === "" || $('#inp-kelurahan-alamat-pic-id').val() === "null") {
           $('#inp-kelurahan-alamat-pic-id').val("");
          }
         }
         $('#inp-kelurahan-alamat-pic').val(this['pic_kelu_old_name']);
         if ($('#inp-kelurahan-alamat-pic').val() === "" || $('#inp-kelurahan-alamat-pic').val() === "null") {
          $('#inp-kelurahan-alamat-pic').val(this['pic_kelu_name']);
          if ($('#inp-kelurahan-alamat-pic').val() === "" || $('#inp-kelurahan-alamat-pic').val() === "null") {
           $('#inp-kelurahan-alamat-pic').val("");
          }
         }
         $('#inp-kelurahan-alamat-pic-id2').val(this['pic_kelu_new']);
         if ($('#inp-kelurahan-alamat-pic-id2').val() === "" || $('#inp-kelurahan-alamat-pic-id2').val() === "null") {
          $('#inp-kelurahan-alamat-pic-id2').val("");
         }
         $('#inp-kelurahan-alamat-pic2').val(this['pic_kelu_new_name']);
         if ($('#inp-kelurahan-alamat-pic2').val() === "" || $('#inp-kelurahan-alamat-pic2').val() === "null") {
          $('#inp-kelurahan-alamat-pic2').val("");
         }
         $('#slc-alasan-kelurahan-pic').val(this['r_pic_kelu']);

         $('#inp-kecamatan-alamat-pic-id').val(this['pic_keca_old']);
         if ($('#inp-kecamatan-alamat-pic-id').val() === "" || $('#inp-kecamatan-alamat-pic-id').val() === "null") {
          $('#inp-kecamatan-alamat-pic-id').val(this['pic_keca']);
          if ($('#inp-kecamatan-alamat-pic-id').val() === "" || $('#inp-kecamatan-alamat-pic-id').val() === "null") {
           $('#inp-kecamatan-alamat-pic-id').val("");
          }
         }
         $('#inp-kecamatan-alamat-pic').val(this['pic_keca_old_name']);
         if ($('#inp-kecamatan-alamat-pic').val() === "" || $('#inp-kecamatan-alamat-pic').val() === "null") {
          $('#inp-kecamatan-alamat-pic').val(this['pic_keca_name']);
          if ($('#inp-kecamatan-alamat-pic').val() === "" || $('#inp-kecamatan-alamat-pic').val() === "null") {
           $('#inp-kecamatan-alamat-pic').val("");
          }
         }
         $('#inp-kecamatan-alamat-pic-id2').val(this['pic_keca_new']);
         if ($('#inp-kecamatan-alamat-pic-id2').val() === "" || $('#inp-kecamatan-alamat-pic-id2').val() === "null") {
          $('#inp-kecamatan-alamat-pic-id2').val("");
         }
         $('#inp-kecamatan-alamat-pic2').val(this['pic_keca_new_name']);
         if ($('#inp-kecamatan-alamat-pic2').val() === "" || $('#inp-kecamatan-alamat-pic2').val() === "null") {
          $('#inp-kecamatan-alamat-pic2').val("");
         }
         $('#slc-alasan-kecamatan-pic').val(this['r_pic_keca']);

         $('#inp-kabupaten-alamat-pic-id').val(this['pic_kabu_old']);
         if ($('#inp-kabupaten-alamat-pic-id').val() === "" || $('#inp-kabupaten-alamat-pic-id').val() === "null") {
          $('#inp-kabupaten-alamat-pic-id').val(this['pic_kabu']);
          if ($('#inp-kabupaten-alamat-pic-id').val() === "" || $('#inp-kabupaten-alamat-pic-id').val() === "null") {
           $('#inp-kabupaten-alamat-pic-id').val("");
          }
         }
         $('#inp-kabupaten-alamat-pic').val(this['pic_kabkot_old_name']);
         if ($('#inp-kabupaten-alamat-pic').val() === "" || $('#inp-kabupaten-alamat-pic').val() === "null") {
          $('#inp-kabupaten-alamat-pic').val(this['pic_kabkot_name']);
          if ($('#inp-kabupaten-alamat-pic').val() === "" || $('#inp-kabupaten-alamat-pic').val() === "null") {
           $('#inp-kabupaten-alamat-pic').val("");
          }
         }
         $('#inp-kabupaten-alamat-pic-id2').val(this['pic_kabu_new']);
         if ($('#inp-kabupaten-alamat-pic-id2').val() === "" || $('#inp-kabupaten-alamat-pic-id2').val() === "null") {
          $('#inp-kabupaten-alamat-pic-id2').val("");
         }
         $('#inp-kabupaten-alamat-pic2').val(this['pic_kabkot_new_name']);
         if ($('#inp-kabupaten-alamat-pic2').val() === "" || $('#inp-kabupaten-alamat-pic2').val() === "null") {
          $('#inp-kabupaten-alamat-pic2').val("");
         }
         $('#slc-alasan-kabupaten-pic').val(this['r_pic_kabu']);

         $('#inp-provinsi-pic-id').val(this['pic_prov_old']);
         if ($('#inp-provinsi-pic-id').val() === "" || $('#inp-provinsi-pic-id').val() === "null") {
          $('#inp-provinsi-pic-id').val(this['pic_prov']);
          if ($('#inp-provinsi-pic-id').val() === "" || $('#inp-provinsi-pic-id').val() === "null") {
           $('#inp-provinsi-pic-id').val("");
          }
         }
         $('#inp-provinsi-alamat-pic').val(this['pic_prov_old_name']);
         if ($('#inp-provinsi-alamat-pic').val() === "" || $('#inp-provinsi-alamat-pic').val() === "null") {
          $('#inp-provinsi-alamat-pic').val(this['pic_prov_name']);
          if ($('#inp-provinsi-alamat-pic').val() === "" || $('#inp-provinsi-alamat-pic').val() === "null") {
           $('#inp-provinsi-alamat-pic').val("");
          }
         }
         $('#inp-provinsi-pic-id2').val(this['pic_prov_new']);
         if ($('#inp-provinsi-pic-id2').val() === "" || $('#inp-provinsi-pic-id2').val() === "null") {
          $('#inp-provinsi-pic-id2').val("");
         }
         $('#inp-provinsi-alamat-pic2').val(this['pic_prov_new_name']);
         if ($('#inp-provinsi-alamat-pic2').val() === "" || $('#inp-provinsi-alamat-pic2').val() === "null") {
          $('#inp-provinsi-alamat-pic2').val("");
         }
         $('#slc-alasan-provinsi-pic').val(this['r_pic_prov']);

         $('#inp-telepon-pic').val(this['pic_notelp_old']);
         if ($('#inp-telepon-pic').val() === "" || $('#inp-telepon-pic').val() === "null") {
          $('#inp-telepon-pic').val(this['pic_notelp']);
         }
         $('#inp-telepon-pic2').val(this['pic_notelnew']);
         $('#slc-alasan-no-tlp-pic').val(this['r_pic_notelp']);

         $('#inp-hanphone-pic').val(this['pic_nohp_old']);
         if ($('#inp-hanphone-pic').val() === "" || $('#inp-hanphone-pic').val() === "null") {
          $('#inp-hanphone-pic').val(this['pic_nohp']);
         }
         $('#inp-hanphone-pic2').val(this['pic_nohnew']);
         $('#slc-alasan-no-hp-pic').val(this['r_pic_nohp']);

         $('#inp-fax-pic').val(this['pic_fax_old']);
         if ($('#inp-fax-pic').val() === "" || $('#inp-fax-pic').val() === "null") {
          $('#inp-fax-pic').val(this['pic_fax']);
         }
         $('#inp-fax-pic2').val(this['pic_fax_new']);
         $('#slc-alasan-no-fax-pic').val(this['r_pic_fax']);

         $('#inp-email-pic').val(this['pic_email_old']);
         if ($('#inp-email-pic').val() === "" || $('#inp-email-pic').val() === "null") {
          $('#inp-email-pic').val(this['pic_email']);
         }
         $('#inp-email-pic2').val(this['pic_email_new']);
         $('#slc-alasan-email-pic').val(this['r_pic_email']);

         $('#inp-share-pic').val(this['pic_share_old']);
         if ($('#inp-share-pic').val() === "" || $('#inp-share-pic').val() === "null") {
          $('#inp-share-pic').val(this['pic_share']);
         }
         $('#inp-share-pic2').val(this['pic_share_new']);
         $('#slc-alasan-share-pic').val(this['r_pic_share']);

         $('#inp-npwp-pic').val(this['pic_npwp_old']);
         if ($('#inp-npwp-pic').val() === "" || $('#inp-npwp-pic').val() === "null") {
          $('#inp-npwp-pic').val(this['pic_npwp']);
         }
         $('#inp-npwp-pic2').val(this['pic_npwnew']);
         $('#slc-alasan-npwp-pic').val(this['r_pic_npwp']);

         $('#inp-jabatan-pic').val(this['pic_jabatan_old']);
         if ($('#inp-jabatan-pic').val() === "" || $('#inp-jabatan-pic').val() === "null") {
          $('#inp-jabatan-pic').val(this['pic_jabatan']);
         }
         $('#inp-jabatan-pic2').val(this['pic_jabatan_new']);
         $('#slc-alasan-jabatan-pic').val(this['r_pic_jabatan']);
        });
       }
       if (data['dtl_guarantor'] !== null) {
        $.each(data['dtl_guarantor'], function(index) {

         $('#inp-no-penjaminn').val(this['gua_no']);
         if ($('#inp-no-penjaminn').val() === "" || $('#inp-no-penjaminn').val() === "null") {
          $('#inp-no-penjaminn').val(this['gua_no']);
         }
         // $('#inp-no-penjaminn2').val(this['gua_no_new']);
         // $('#slc-alasan-no-penjaminn').val(this['r_gua_no']);

         $('#slc-jenis-identitas-penjaminn').val(this['gua_idtype_old']);
         if ($('#slc-jenis-identitas-penjaminn').val() === "" || $('#slc-jenis-identitas-penjaminn').val() === "null") {
          $('#slc-jenis-identitas-penjaminn').val(this['gua_idtype']);
         }
         $('#slc-jenis-identitas-penjaminn2').val(this['gua_idtype_new']);
         $('#slc-alasan-jns-id-penjaminn').val(this['r_gua_idtype']);

         $('#inp-no-identitas-penjaminn').val(this['gua_idno_old']);
         if ($('#inp-no-identitas-penjaminn').val() === "" || $('#inp-no-identitas-penjaminn').val() === "null") {
          $('#inp-no-identitas-penjaminn').val(this['gua_idno']);
         }
         $('#inp-no-identitas-penjaminn2').val(this['gua_idno_new']);
         $('#slc-alasan-no-id-penjaminn').val(this['r_gua_idno']);

         $('#inp-issued-date-penjaminn').val(this['gua_iddate_old']);
         if ($('#inp-issued-date-penjaminn').val() === "" || $('#inp-issued-date-penjaminn').val() === "null") {
          $('#inp-issued-date-penjaminn').val(this['gua_iddate']);
         }
         $('#inp-issued-date-penjaminn2').val(this['gua_iddate_new']);
         $('#slc-alasan-tgl-id-penjaminn').val(this['r_gua_iddate']);

         $('#inp-expired-date-penjaminn').val(this['gua_expdate_old']);
         if ($('#inp-expired-date-penjaminn').val() === "" || $('#inp-expired-date-penjaminn').val() === "null") {
          $('#inp-expired-date-penjaminn').val(this['gua_expdate']);
         }
         $('#inp-expired-date-penjaminn2').val(this['gua_expdate_new']);
         $('#slc-alasan-exp-id-penjaminn').val(this['r_gua_expdate']);

         $('#inp-fname-penjaminn').val(this['gua_fname_old']);
         if ($('#inp-fname-penjaminn').val() === "" || $('#inp-fname-penjaminn').val() === "null") {
          $('#inp-fname-penjaminn').val(this['gua_fname']);
         }
         $('#inp-fname-penjaminn2').val(this['gua_fname_new']);
         $('#slc-alasan-fname-penjaminn').val(this['r_gua_fname']);

         $('#inp-lname-penjaminn').val(this['gua_lname_old']);
         if ($('#inp-lname-penjaminn').val() === "" || $('#inp-lname-penjaminn').val() === "null") {
          $('#inp-lname-penjaminn').val(this['gua_lname']);
         }
         $('#inp-lname-penjaminn2').val(this['gua_lname_new']);
         $('#slc-alasan-lname-penjaminn').val(this['r_gua_lname']);

         $('#inp-alias-penjaminn').val(this['gua_alias_old']);
         if ($('#inp-alias-penjaminn').val() === "" || $('#inp-alias-penjaminn').val() === "null") {
          $('#inp-alias-penjaminn').val(this['gua_alias']);
         }
         $('#inp-alias-penjaminn2').val(this['gua_alias_new']);
         $('#slc-alasan-alias-penjaminn').val(this['r_gua_alias']);

         $('#inp-gelar-penjaminn').val(this['gua_title_old']);
         if ($('#inp-gelar-penjaminn').val() === "" || $('#inp-gelar-penjaminn').val() === "null") {
          $('#inp-gelar-penjaminn').val(this['gua_title']);
         }
         $('#inp-gelar-penjaminn2').val(this['gua_title_new']);
         $('#slc-alasan-gelar-penjaminn').val(this['r_gua_title']);

         $('#inp-tempat-lahir-penjaminn').val(this['gua_bornplc_old']);
         if ($('#inp-tempat-lahir-penjaminn').val() === "" || $('#inp-tempat-lahir-penjaminn').val() === "null") {
          $('#inp-tempat-lahir-penjaminn').val(this['gua_bornplc']);
         }
         $('#inp-tempat-lahir-penjaminn2').val(this['gua_bornplc_new']);
         $('#slc-alasan-tmpt-lhr-penjaminn').val(this['r_gua_bornplc']);

         $('#inp-tanggal-lahir-penjaminn').val(this['gua_borndate_old']);
         if ($('#inp-tanggal-lahir-penjaminn').val() === "" || $('#inp-tanggal-lahir-penjaminn').val() === "null") {
          $('#inp-tanggal-lahir-penjaminn').val(this['gua_borndate']);
         }
         $('#inp-tanggal-lahir-penjaminn2').val(this['gua_borndate_new']);
         $('#slc-alasan-tgl-lhr-penjaminn').val(this['r_gua_borndate']);

         $('#slc-jenis-kelamin-penjaminn').val(this['gua_gender_old']);
         if ($('#slc-jenis-kelamin-penjaminn').val() === "" || $('#slc-jenis-kelamin-penjaminn').val() === "null") {
          $('#slc-jenis-kelamin-penjaminn').val(this['gua_gender']);
         }
         $('#slc-jenis-kelamin-penjaminn2').val(this['gua_gender_new']);
         $('#slc-alasan-jns-klmn-penjaminn').val(this['r_gua_gender']);

         $('#slc-agama-penjaminn').val(this['gua_religi_old']);
         if ($('#slc-agama-penjaminn').val() === "" || $('#slc-agama-penjaminn').val() === "null") {
          $('#slc-agama-penjaminn').val(this['gua_religi']);
         }
         $('#slc-agama-penjaminn2').val(this['gua_religi_new']);
         $('#slc-alasan-agama-penjaminn').val(this['r_gua_religi']);

         $('#slc-pekerjaan-penjaminn').val(this['gua_occp_old']);
         if ($('#slc-pekerjaan-penjaminn').val() === "" || $('#slc-pekerjaan-penjaminn').val() === "null") {
          $('#slc-pekerjaan-penjaminn').val(this['gua_occp']);
         }
         $('#slc-pekerjaan-penjaminn2').val(this['gua_occnew']);
         $('#slc-alasan-pekerjaan-penjaminn').val(this['r_gua_occp']);

         $('#slc-status-pernikahan-penjaminn').val(this['gua_mrtl_old']);
         if ($('#slc-status-pernikahan-penjaminn').val() === "" || $('#slc-status-pernikahan-penjaminn').val() === "null") {
          $('#slc-status-pernikahan-penjaminn').val(this['gua_mrtl']);
         }
         $('#slc-status-pernikahan-penjaminn2').val(this['gua_mrtl_new']);
         $('#slc-alasan-pernikahan-penjaminn').val(this['r_gua_mrtl']);

         $('#inp-alamat-penjaminn').val(this['gua_addr_old']);
         if ($('#inp-alamat-penjaminn').val() === "" || $('#inp-alamat-penjaminn').val() === "null") {
          $('#inp-alamat-penjaminn').val(this['gua_addr']);
         }
         $('#inp-alamat-penjaminn2').val(this['gua_addr_new']);
         $('#slc-alasan-alamat-penjaminn').val(this['r_gua_addr']);

         $('#inp-rtrw-penjaminn').val(this['gua_rtrw_old']);
         if ($('#inp-alamat-penjaminn').val() === "" || $('#inp-alamat-penjaminn').val() === "null") {
          $('#inp-rtrw-penjaminn').val(this['gua_rtrw']);
         }

         if (this['gua_rtrw_new'] != null) {
          var str_penjaminn_rtrw = this['gua_rtrw_new'];
          var rt_rw_penjaminn = str_penjaminn_rtrw.split("/");
          $('#inp-rtrw-penjaminn2').val(rt_rw_penjaminn[0]);
          $('#inp-rw-penjaminn2').val(rt_rw_penjaminn[1]);
         } else {
          $('#inp-rtrw-penjaminn2').val(this['gua_rtrw_new']);
          $('#inp-rw-penjaminn2').val(this['gua_rtrw_new']);
         }

         $('#slc-alasan-rtrw-penjaminn').val(this['r_gua_rtrw']);

         $('#inp-kode-pos-alamat-penjaminn').val(this['gua_zipcode_old']);
         if ($('#inp-kode-pos-alamat-penjaminn').val() === "" || $('#inp-kode-pos-alamat-penjaminn').val() === "null") {
          $('#inp-kode-pos-alamat-penjaminn').val(this['gua_zipcode']);
         }
         $('#inp-kode-pos-alamat-penjaminn2').val(this['gua_zipcode_new']);
         $('#slc-alasan-kodepos-penjaminn').val(this['r_gua_zipcode']);

         $('#inp-kelurahan-alamat-penjaminn-id').val(this['gua_kelu_old']);
         if ($('#inp-kelurahan-alamat-penjaminn-id').val() === "" || $('#inp-kelurahan-alamat-penjaminn-id').val() === "null") {
          $('#inp-kelurahan-alamat-penjaminn-id').val(this['gua_kelu']);
          if ($('#inp-kelurahan-alamat-penjaminn-id').val() === "" || $('#inp-kelurahan-alamat-penjaminn-id').val() === "null") {
           $('#inp-kelurahan-alamat-penjaminn-id').val("");
          }
         }
         $('#inp-kelurahan-alamat-penjaminn').val(this['gua_kelu_old_name']);
         if ($('#inp-kelurahan-alamat-penjaminn').val() === "" || $('#inp-kelurahan-alamat-penjaminn').val() === "null") {
          $('#inp-kelurahan-alamat-penjaminn').val(this['gua_kelu_name']);
          if ($('#inp-kelurahan-alamat-penjaminn').val() === "" || $('#inp-kelurahan-alamat-penjaminn').val() === "null") {
           $('#inp-kelurahan-alamat-penjaminn').val("");
          }
         }
         $('#inp-kelurahan-alamat-penjaminn-id2').val(this['gua_kelu_new']);
         if ($('#inp-kelurahan-alamat-penjaminn2-id2').val() === "" || $('#inp-kelurahan-alamat-penjaminn2-id2').val() === "null") {
          $('#inp-kelurahan-alamat-penjaminn2-id2').val("");
         }
         $('#inp-kelurahan-alamat-penjaminn2').val(this['gua_kelu_new_name']);
         if ($('#inp-kelurahan-alamat-penjaminn2').val() === "" || $('#inp-kelurahan-alamat-penjaminn2').val() === "null") {
          $('#inp-kelurahan-alamat-penjaminn2').val("");
         }
         $('#slc-alasan-kelurahan-penjaminn').val(this['r_gua_kelu']);

         $('#inp-kecamatan-alamat-penjaminn-id').val(this['gua_keca_old']);
         if ($('#inp-kecamatan-alamat-penjaminn-id').val() === "" || $('#inp-kecamatan-alamat-penjaminn-id').val() === "null") {
          $('#inp-kecamatan-alamat-penjaminn-id').val(this['gua_keca']);
          if ($('#inp-kecamatan-alamat-penjaminn-id').val() === "" || $('#inp-kecamatan-alamat-penjaminn-id').val() === "null") {
           $('#inp-kecamatan-alamat-penjaminn-id').val("");
          }
         }
         $('#inp-kecamatan-alamat-penjaminn').val(this['gua_keca_old_name']);
         if ($('#inp-kecamatan-alamat-penjaminn').val() === "" || $('#inp-kecamatan-alamat-penjaminn').val() === "null") {
          $('#inp-kecamatan-alamat-penjaminn').val(this['gua_keca_name']);
          if ($('#inp-kecamatan-alamat-penjaminn').val() === "" || $('#inp-kecamatan-alamat-penjaminn').val() === "null") {
           $('#inp-kecamatan-alamat-penjaminn').val("");
          }
         }
         $('#inp-kecamatan-alamat-penjaminn-id2').val(this['gua_keca_new']);
         if ($('#inp-kecamatan-alamat-penjaminn-id2').val() === "" || $('#inp-kecamatan-alamat-penjaminn-id2').val() === "null") {
          $('#inp-kecamatan-alamat-penjaminn-id2').val("");
         }
         $('#inp-kecamatan-alamat-penjaminn2').val(this['gua_keca_new_name']);
         if ($('#inp-kecamatan-alamat-penjaminn2').val() === "" || $('#inp-kecamatan-alamat-penjaminn2').val() === "null") {
          $('#inp-kecamatan-alamat-penjaminn2').val("");
         }
         $('#slc-alasan-kecamatan-penjaminn').val(this['r_gua_keca']);

         $('#inp-kabupaten-alamat-penjaminn-id').val(this['gua_kabkot_old']);
         if ($('#inp-kabupaten-alamat-penjaminn-id').val() === "" || $('#inp-kabupaten-alamat-penjaminn-id').val() === "null") {
          $('#inp-kabupaten-alamat-penjaminn-id').val(this['gua_kabkot']);
          if ($('#inp-kabupaten-alamat-penjaminn-id').val() === "" || $('#inp-kabupaten-alamat-penjaminn-id').val() === "null") {
           $('#inp-kabupaten-alamat-penjaminn-id').val("");
          }
         }
         $('#inp-kabupaten-alamat-penjaminn').val(this['gua_kabkot_old_name']);
         if ($('#inp-kabupaten-alamat-penjaminn').val() === "" || $('#inp-kabupaten-alamat-penjaminn').val() === "null") {
          $('#inp-kabupaten-alamat-penjaminn').val(this['gua_kabkot_name']);
          if ($('#inp-kabupaten-alamat-penjaminn').val() === "" || $('#inp-kabupaten-alamat-penjaminn').val() === "null") {
           $('#inp-kabupaten-alamat-penjaminn').val("");
          }
         }
         $('#inp-kabupaten-alamat-penjaminn-id2').val(this['gua_kabkot_new']);
         if ($('#inp-kabupaten-alamat-penjaminn-id2').val() === "" || $('#inp-kabupaten-alamat-penjaminn-id2').val() === "null") {
          $('#inp-kabupaten-alamat-penjaminn-id2').val("");
         }
         $('#inp-kabupaten-alamat-penjaminn2').val(this['gua_kabkot_new_name']);
         if ($('#inp-kabupaten-alamat-penjaminn2').val() === "" || $('#inp-kabupaten-alamat-penjaminn2').val() === "null") {
          $('#inp-kabupaten-alamat-penjaminn2').val("");
         }
         $('#slc-alasan-kabupaten-penjaminn').val(this['r_gua_kabkot']);

         $('#inp-provinsi-penjaminn-id').val(this['gua_prov_old']);
         if ($('#inp-provinsi-penjaminn-id').val() === "" || $('#inp-alamat-penjaminn-id').val() === "null") {
          $('#inp-provinsi-penjaminn-id').val(this['gua_prov']);
          if ($('#inp-provinsi-penjaminn-id').val() === "" || $('#inp-alamat-penjaminn-id').val() === "null") {
           $('#inp-provinsi-penjaminn-id').val("");
          }
         }
         $('#inp-provinsi-alamat-penjaminn').val(this['gua_prov_old_name']);
         if ($('#inp-provinsi-alamat-penjaminn').val() === "" || $('#inp-provinsi-alamat-penjaminn').val() === "null") {
          $('#inp-provinsi-alamat-penjaminn').val(this['gua_prov_name']);
          if ($('#inp-provinsi-alamat-penjaminn').val() === "" || $('#inp-provinsi-alamat-penjaminn').val() === "null") {
           $('#inp-provinsi-alamat-penjaminn').val("");
          }
         }
         $('#inp-provinsi-penjaminn-id2').val(this['gua_prov_new']);
         if ($('#inp-provinsi-penjaminn-id2').val() === "" || $('#inp-alamat-penjaminn-id2').val() === "null") {
          $('#inp-provinsi-penjaminn-id2').val("");
         }
         $('#slc-provinsi-alamat-penjaminn2').val(this['gua_prov_new_name']);
         if ($('#slc-provinsi-alamat-penjaminn2').val() === "" || $('#slc-provinsi-alamat-penjaminn2').val() === "null") {
          $('#slc-provinsi-alamat-penjaminn2').val("");
         }
         $('#slc-alasan-provinsi-penjaminn').val(this['r_gua_prov']);

         $('#inp-telepon-penjaminn').val(this['gua_notelp_old']);
         if ($('#inp-telepon-penjaminn').val() === "" || $('#inp-telepon-penjaminn').val() === "null") {
          $('#inp-telepon-penjaminn').val(this['gua_notelp']);
         }
         $('#inp-telepon-penjaminn2').val(this['gua_notelpnew']);
         $('#slc-alasan-no-tlp-penjaminn').val(this['r_gua_notelp']);

         $('#inp-hanphone-penjaminn').val(this['gua_nohp_old']);
         if ($('#inp-hanphone-penjaminn').val() === "" || $('#inp-hanphone-penjaminn').val() === "null") {
          $('#inp-hanphone-penjaminn').val(this['gua_nohp']);
         }
         $('#inp-hanphone-penjaminn2').val(this['gua_nohpnew']);
         $('#slc-alasan-no-hp-penjaminn').val(this['r_gua_nohp']);

         $('#inp-email-penjaminn').val(this['gua_email_old']);
         if ($('#inp-email-penjaminn').val() === "" || $('#inp-email-penjaminn').val() === "null") {
          $('#inp-email-penjaminn').val(this['gua_email']);
         }
         $('#inp-email-penjaminn2').val(this['gua_email_new']);
         $('#slc-alasan-email-penjaminn').val(this['r_gua_email']);

         $('#status-hubungan-penjaminn').val(this['gua_relati_old']);
         if ($('#status-hubungan-penjaminn').val() === "" || $('#status-hubungan-penjaminn').val() === "null") {
          $('#status-hubungan-penjaminn').val(this['gua_relati']);
         }
         $('#status-hubungan-penjaminn2').val(this['gua_relati_new']);
         $('#slc-alasan-stat-hub-penjaminn').val(this['r_gua_relati']);
        });
       }
       if (data['dtl_application'].length !== 0) {
        $('#inp-no-aplikasi').val(data['dtl_application'].application_no);
        $('#inp-no-customer').val(data['dtl_application'].customer_no);
        $('#inp-entry-date').val(data['dtl_application'].application_date);
        $('#inp-order-date').val(data['dtl_application'].date_confirm);
        $('#slc-branch-cc').val(data['dtl_application'].branch_id);
        $('#inp-dealer-cc').val(data['dtl_application'].supplier_name);
       }
      }
     } catch (e) {
      console.log(e);
     }
    }
   },
   error: function(response) {
    console.log(response);
    if (response['responseText'] === "" && response['statusText'] === 'OK') {
     alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
     });
    } else if (response['statusText'] === 'Internal Server Error') {
     alert_error('Gagal Terhubung ke Server: ' + response['responseText']);
    }
   }
  });
 }
}


function get_view_detail_customer() {
 var arrayData = [];
 var branch_id = $('#slc-branch-cc').val();
 var no_permohonan = $('#inp-no-permohonan-cc').val();
 var no_kontrak = $('#input-no-contract').val();
 var cust_type = $('#inp-cust-type-cc').val();
 var flag = "2";
 var tabel_cust = [];

 arrayData.push({
  branch_id: branch_id,
  cust_type: cust_type,
  no_permohonan: no_permohonan,
  contract_no: no_kontrak,
  flag: flag
 });

 if (check_session() === 'true') {
  $.ajax({
   url: base_url + 'Controller_customer_correction/get_view_detail_personal',
   type: 'POST',
   data: {
    arrayData
   },
   cache: false,
   success: function(response) {
    if (response) {
     try {
      //debugger;
      console.log(response);
      var result = $.parseJSON(response);
      if (result['alert'] === null) {
       $('#btn-new-request-cc').prop('disabled', true);
       $('#inp-cust-type-cc').prop('disabled', true);
       $('#cetak-permohonan-cc').prop('disabled', false);
       $('#konfirmasi-permohonan-cc').prop('disabled', false);
       $('#batalkan-koreksi-cc').prop('disabled', false);
       $('.disabel').val("");
       $('.disabel').prop('disabled', true);

       if (result['DataDocument'].length !== 0) {
        $.each(result['DataDocument']['DataDocument'], function(index) {
         tabel_cust.push([
          this['doc_code'],
          this['doc_name'],
          this['receive_date']
         ]);
        });
        tabel_doc.rows.add(tabel_cust).draw(false);
       }
       if (result['dtl_per'].length !== 0) {

        $('#inp-npwp-other').val(result['dtl_per'][0].npwp_no_old);
        if ($('#inp-npwp-other').val() === "" || $('#inp-npwp-other').val() === "null") {
         $('#inp-npwp-other').val(result['dtl_per'][0].npwp_no);
        }
        $('#inp-npwp-other2').val(result['dtl_per'][0].npwp_no_new);
        $('#slc-alasan-npwp-other').val(result['dtl_per'][0].r_npwp_no);

        $('#id-type-per').val(result['dtl_per'][0].id_type_old);
        if ($('#id-type-per').val() === "" || $('#id-type-per').val() === "null") {
         $('#id-type-per').val(result['dtl_per'][0].id_type);
        }
        $('#id-type-per2').val(result['dtl_per'][0].id_type_new);
        $('#slc-alasan-id-type-per').val(result['dtl_per'][0].r_id_type);
        $('#inp-id-no-per').val(result['dtl_per'][0].id_no);
        $('#inp-tgl-id-per').val(result['dtl_per'][0].id_date);
        $('#inp-exp-id-date-per').val(result['dtl_per'][0].id_exp_date);
        $('#inp-nama-awal-per').val(result['dtl_per'][0].customer_name);

        $('#inp-alias-per').val(result['dtl_per'][0].alias_old);
        if ($('#inp-alias-per').val() === "" || $('#inp-alias-per').val() === "null") {
         $('#inp-alias-per').val(result['dtl_per'][0].customer_alias_name);
        }
        $('#inp-alias-per2').val(result['dtl_per'][0].alias_new);
        $('#slc-alasan-alias-per').val(result['dtl_per'][0].r_alias);
        $('#slc-jenis-kelamin-per').val(result['dtl_per'][0].sex_type);
        $('#inp-gelar-per').val(result['dtl_per'][0].tittle);
        $('#inp-tempat-lahir-per').val(result['dtl_per'][0].birth_place);
        $('#inp-tanggal-lahir-per').val(result['dtl_per'][0].birth_date);
        $('#inp-job-per').val(result['dtl_per'][0].occupation_id);
        $('#slc-status-pernikahan-per').val(result['dtl_per'][0].marital_status);

        $('#slc-agama-per').val(result['dtl_per'][0].religion_id_old);
        if ($('#slc-agama-per').val() === "" || $('#slc-agama-per').val() === "null") {
         $('#slc-agama-per').val(result['dtl_per'][0].religion_id);
        }
        $('#slc-agama-per2').val(result['dtl_per'][0].religion_id_new);
        $('#slc-alasan-agama-per').val(result['dtl_per'][0].r_religion_id);
        $('#inp-alamat-per').val(result['dtl_per'][0].address_name);
        $('#inp-rtrw-per').val(result['dtl_per'][0].rt_rw);
        $('#inp-kode-pos-alamat-per').val(result['dtl_per'][0].zip_code);
        $('#inp-kelurahan-alamat-per-id').val(result['dtl_per'][0].kelurahan_id);
        $('#inp-kelurahan-alamat-per').val(result['dtl_per'][0].kelurahan_name);
        $('#inp-kecamatan-alamat-per-id').val(result['dtl_per'][0].kecamatan_id);
        $('#inp-kecamatan-alamat-per').val(result['dtl_per'][0].kecamatan_name);
        $('#inp-kabupaten-alamat-per-id').val(result['dtl_per'][0].kab_kota_id);
        $('#inp-kabupaten-alamat-per').val(result['dtl_per'][0].kabupaten_name);
        $('#inp-provinsi-per-id').val(result['dtl_per'][0].provinsi_id);
        $('#inp-provinsi-alamat-per').val(result['dtl_per'][0].provinsi_name);
        $('#inp-sub-kode-pos-alamat-per').val(result['dtl_per'][0].subzipcode);

        //TAB FAMILY
        $('#inp-jml-tanggung-kk').val(result['dtl_per'][0].no_of_dependents_old);
        if ($('#inp-jml-tanggung-kk').val() === "" || $('#inp-jml-tanggung-kk').val() === "null" || $('#inp-jml-tanggung-kk').val() === "0") {
         $('#inp-jml-tanggung-kk').val(result['dtl_per'][0].no_of_dependents);
        }
        $('#inp-jml-tanggung-kk2').val(result['dtl_per'][0].no_of_dependents_new);
        if ($('#inp-jml-tanggung-kk2').val() === "" || $('#inp-jml-tanggung-kk2').val() === "null" || $('#inp-jml-tanggung-kk2').val() === "0"|| $('#inp-jml-tanggung-kk2').val() === 0) {
        $('#inp-jml-tanggung-kk2').val("");
        }
        $('#slc-alasan-jml-tanggung-kk').val(result['dtl_per'][0].r_no_of_dependents);

        $('#inp-nationality-kk').val(result['dtl_per'][0].nationality_id_old);
        if ($('#inp-nationality-kk').val() === "" || $('#inp-nationality-kk').val() === "null") {
         $('#inp-nationality-kk').val(result['dtl_per'][0].nationality_id);
        }
        $('#inp-nationality-kk2').val(result['dtl_per'][0].nationality_id_new);
        $('#slc-alasan-nationality-kk').val(result['dtl_per'][0].r_nationality_id);

        $('#inp-education-kk').val(result['dtl_per'][0].education_id_old);
        if ($('#inp-education-kk').val() === "" || $('#inp-education-kk').val() === "null") {
         $('#inp-education-kk').val(result['dtl_per'][0].education_id);
        }
        $('#inp-education-kk2').val(result['dtl_per'][0].education_id_new);
        $('#slc-alasan-education-kk').val(result['dtl_per'][0].r_education_id);
        $('#inp-ibu-kandung-kk').val(result['dtl_per'][0].mother_maiden_name);
       }
       if (result['dtl_spouse'].length !== 0) {
        $('#id-type-spouse').val(result['dtl_spouse'][0].fml_idtype);
        $('#inp-id-no-spouse').val(result['dtl_spouse'][0].fml_idno);

        $('#inp-tgl-id-spouse').val(result['dtl_spouse'][0].fml_iddate_old);
        if ($('#inp-tgl-id-spouse').val() === "" || $('#inp-tgl-id-spouse').val() === "null") {
         $('#inp-tgl-id-spouse').val(result['dtl_spouse'][0].fml_iddate);
        }
        $('#inp-tgl-id-spouse2').val(result['dtl_spouse'][0].fml_iddate_new);
        $('#slc-alasan-tgl-id-spouse').val(result['dtl_spouse'][0].r_fml_iddate);

        $('#inp-exp-id-date-spouse').val(result['dtl_spouse'][0].fml_expdate_old);
        if ($('#inp-exp-id-date-spouse').val() === "" || $('#inp-exp-id-date-spouse').val() === "null") {
         $('#inp-exp-id-date-spouse').val(result['dtl_spouse'][0].fml_expdate);
        }
        $('#inp-exp-id-date-spouse2').val(result['dtl_spouse'][0].fml_expdate_new);
        $('#slc-alasan-exp-id-date-spouse').val(result['dtl_spouse'][0].r_fml_expdate);
        $('#inp-nama-awal-spouse').val(result['dtl_spouse'][0].fml_name);

        $('#inp-alias-spouse').val(result['dtl_spouse'][0].fml_aname_old);
        if ($('#inp-alias-spouse').val() === "" || $('#inp-alias-spouse').val() === "null") {
         $('#inp-alias-spouse').val(result['dtl_spouse'][0].fml_aname);
        }
        $('#inp-alias-spouse2').val(result['dtl_spouse'][0].fml_aname_new);
        $('#slc-alasan-alias-spouse').val(result['dtl_spouse'][0].r_fml_aname);
        
        $('#inp-gelar-spouse').val(result['dtl_spouse'][0].fml_title_old);
        if ($('#inp-gelar-spouse').val() === "" || $('#inp-gelar-spouse').val() === "null") {
         $('#inp-gelar-spouse').val(result['dtl_spouse'][0].fml_title);
        }
        $('#inp-gelar-spouse2').val(result['dtl_spouse'][0].fml_title_new);
        $('#slc-alasan-gelar-spouse').val(result['dtl_spouse'][0].r_fml_title);
        
        $('#inp-no-telp-spouse').val(result['dtl_spouse'][0].fml_phone_old);
        if ($('#inp-no-telp-spouse').val() === "" || $('#inp-no-telp-spouse').val() === "null") {
         $('#inp-no-telp-spouse').val(result['dtl_spouse'][0].fml_phone);
        }
        $('#inp-no-telp-spouse2').val(result['dtl_spouse'][0].fml_phone_new);
        $('#slc-alasan-no-telp-spouse').val(result['dtl_spouse'][0].r_fml_phone);

        $('#inp-no-hp-spouse').val(result['dtl_spouse'][0].fml_hpno_old);
        if ($('#inp-no-hp-spouse').val() === "" || $('#inp-no-hp-spouse').val() === "null") {
         $('#inp-no-hp-spouse').val(result['dtl_spouse'][0].fml_hpno);
        }
        $('#inp-no-hp-spouse2').val(result['dtl_spouse'][0].fml_hpno_new);
        $('#slc-alasan-no-hp-spouse').val(result['dtl_spouse'][0].r_fml_hpno);
        $('#slc-jenis-kelamin-spouse').val(result['dtl_spouse'][0].fml_gender);
        $('#inp-tempat-lahir-spouse').val(result['dtl_spouse'][0].fml_birthplace);
        $('#inp-tanggal-lahir-spouse').val(result['dtl_spouse'][0].fml_datebirth);
        $('#inp-job-spouse').val(result['dtl_spouse'][0].fml_occupation);
        $('#slc-status-nikahan-spouse').val(result['dtl_spouse'][0].fml_marital);

        $('#slc-agama-spouse').val(result['dtl_spouse'][0].fml_religi_old);
        if ($('#slc-agama-spouse').val() === "" || $('#slc-agama-spouse').val() === "null") {
         $('#slc-agama-spouse').val(result['dtl_spouse'][0].fml_religi);
        }
        $('#slc-agama-spouse2').val(result['dtl_spouse'][0].fml_religi_new);
        $('#slc-alasan-agama-spouse').val(result['dtl_spouse'][0].r_fml_religi);

        $('#inp-alamat-spouse').val(result['dtl_spouse'][0].fml_addname_old);
        if ($('#inp-alamat-spouse').val() === "" || $('#inp-alamat-spouse').val() === "null") {
         $('#inp-alamat-spouse').val(result['dtl_spouse'][0].fml_addname);
        }
        $('#inp-alamat-spouse2').val(result['dtl_spouse'][0].fml_addname_new);
        $('#slc-alasan-alamat-spouse').val(result['dtl_spouse'][0].r_fml_addname);

        $('#inp-rtrw-spouse').val(result['dtl_spouse'][0].fml_rt_old);
        if ($('#inp-rtrw-spouse').val() === "" || $('#inp-rtrw-spouse').val() === "null") {
         $('#inp-rtrw-spouse').val(result['dtl_spouse'][0].fml_rt);
        }

        $('#inp-rtrw-spouse2').val(result['dtl_spouse'][0].fml_rt_new);
        if ($('#inp-rtrw-spouse2').val() === "" || $('#inp-rtrw-spouse2').val() === "null") {
         $('#inp-rtrw-spouse2').val("");
        }

        $('#inp-rw-spouse').val(result['dtl_spouse'][0].fml_rw_old);
        if ($('#inp-rw-spouse').val() === "" || $('#inp-rw-spouse').val() === "null") {
         $('#inp-rw-spouse').val(result['dtl_spouse'][0].fml_rw);
        }
        $('#inp-rw-spouse2').val(result['dtl_spouse'][0].fml_rw_new);
        if ($('#inp-rw-spouse2').val() === "" || $('#inp-rw-spouse2').val() === "null") {
         $('#inp-rw-spouse2').val("");
        }

        $('#slc-alasan-rtrw-spouse').val(result['dtl_spouse'][0].r_fml_rt);

        $('#inp-kode-pos-alamat-spouse').val(result['dtl_spouse'][0].fml_zipcode_old);
        if ($('#inp-kode-pos-alamat-spouse').val() === "" || $('#inp-kode-pos-alamat-spouse').val() === "null") {
         $('#inp-kode-pos-alamat-spouse').val(result['dtl_spouse'][0].fml_zipcode);
        }
        $('#inp-kode-pos-alamat-spouse2').val(result['dtl_spouse'][0].fml_zipcode_new);
        $('#slc-alasan-kodepos-spouse').val(result['dtl_spouse'][0].r_fml_zipcode);

        $('#inp-kelurahan-alamat-spouse-id').val(result['dtl_spouse'][0].fml_kelurahan_old);
        if ($('#inp-kelurahan-alamat-spouse-id').val() === "" || $('#inp-kelurahan-alamat-spouse-id').val() === "null") {
         $('#inp-kelurahan-alamat-spouse-id').val(result['dtl_spouse'][0].fml_kelurahan);
         if ($('#inp-kelurahan-alamat-spouse-id').val() === "" || $('#inp-kelurahan-alamat-spouse-id').val() === "null") {
          $('#inp-kelurahan-alamat-spouse-id').val("");
         }
        }
        $('#inp-kelurahan-alamat-spouse').val(result['dtl_spouse'][0].fml_kelurahan_old_name);
        if ($('#inp-kelurahan-alamat-spouse').val() === "" || $('#inp-kelurahan-alamat-spouse').val() === "null") {
         $('#inp-kelurahan-alamat-spouse').val(result['dtl_spouse'][0].fml_kelurahan_name);
         if ($('#inp-kelurahan-alamat-spouse').val() === "" || $('#inp-kelurahan-alamat-spouse').val() === "null") {
          $('#inp-kelurahan-alamat-spouse').val("");
         }
        }
        $('#inp-kelurahan-alamat-spouse-id2').val(result['dtl_spouse'][0].fml_kelurahan_new);
        if ($('#inp-kelurahan-alamat-spouse-id2').val() === "" || $('#inp-kelurahan-alamat-spouse-id2').val() === "null") {
         $('#inp-kelurahan-alamat-spouse-id2').val("");
        }
        $('#inp-kelurahan-alamat-spouse2').val(result['dtl_spouse'][0].fml_kelurahan_new_name);
        if ($('#inp-kelurahan-alamat-spouse2').val() === "" || $('#inp-kelurahan-alamat-spouse2').val() === "null") {
         $('#inp-kelurahan-alamat-spouse2').val("");
        }
        $('#slc-alasan-kelurahan-spouse').val(result['dtl_spouse'][0].r_fml_kelurahan);

        $('#inp-kecamatan-alamat-spouse').val(result['dtl_spouse'][0].fml_kecamatan_name_old);
        if ($('#inp-kecamatan-alamat-spouse').val() === "" || $('#inp-kecamatan-alamat-spouse').val() === "null") {
         $('#inp-kecamatan-alamat-spouse').val(result['dtl_spouse'][0].fml_kecamatan_name);
         if ($('#inp-kecamatan-alamat-spouse').val() === "" || $('#inp-kecamatan-alamat-spouse').val() === "null") {
          $('#inp-kecamatan-alamat-spouse').val("");
         }
        }
        $('#inp-kecamatan-alamat-spouse2').val(result['dtl_spouse'][0].fml_kecamatan_name_new);
        if ($('#inp-kecamatan-alamat-spouse2').val() === "" || $('#inp-kecamatan-alamat-spouse2').val() === "null") {
         $('#inp-kecamatan-alamat-spouse2').val("");
        }
        $('#slc-alasan-kecamatan-spouse').val(result['dtl_spouse'][0].r_fml_kelurahan);

        $('#inp-kabupaten-alamat-spouse').val(result['dtl_spouse'][0].fml_kabupaten_name_old);
        if ($('#inp-kabupaten-alamat-spouse').val() === "" || $('#inp-kabupaten-alamat-spouse').val() === "null") {
         $('#inp-kabupaten-alamat-spouse').val(result['dtl_spouse'][0].fml_kabupaten_name);
         if ($('#inp-kabupaten-alamat-spouse').val() === "" || $('#inp-kabupaten-alamat-spouse').val() === "null") {
          $('#inp-kabupaten-alamat-spouse').val("");
         }
        }
        $('#inp-kabupaten-alamat-spouse2').val(result['dtl_spouse'][0].fml_kabupaten_name_new);
        if ($('#inp-kabupaten-alamat-spouse2').val() === "" || $('#inp-kabupaten-alamat-spouse2').val() === "null") {
         $('#inp-kabupaten-alamat-spouse2').val("");
        }
        $('#slc-alasan-kabupaten-spouse').val(result['dtl_spouse'][0].r_fml_kelurahan);

        $('#inp-provinsi-alamat-spouse').val(result['dtl_spouse'][0].fml_provinsi_name_old);
        if ($('#inp-provinsi-alamat-spouse').val() === "" || $('#inp-provinsi-alamat-spouse').val() === "null") {
         $('#inp-provinsi-alamat-spouse').val(result['dtl_spouse'][0].fml_provinsi_name);
         if ($('#inp-provinsi-alamat-spouse').val() === "" || $('#inp-provinsi-alamat-spouse').val() === "null") {
          $('#inp-provinsi-alamat-spouse').val("");
         }
        }
        $('#inp-provinsi-alamat-spouse2').val(result['dtl_spouse'][0].fml_provinsi_name_new);
        if ($('#inp-provinsi-alamat-spouse2').val() === "" || $('#inp-provinsi-alamat-spouse2').val() === "null") {
         $('#inp-provinsi-alamat-spouse2').val("");
        }
        $('#slc-alasan-provinsi-spouse').val(result['dtl_spouse'][0].r_fml_kelurahan);

        $('#inp-sub-kode-pos-alamat-spouse').val(result['dtl_spouse'][0].fml_subzip);

        //TAB FAMILY
        $('#inp-is-emergency-spouse').val(result['dtl_spouse'][0].fml_isemergency)

        $('#inp-no-kk').val(result['dtl_spouse'][0].fml_familycard_old);
        if ($('#inp-no-kk').val() === "" || $('#inp-no-kk').val() === "null") {
         $('#inp-no-kk').val(result['dtl_spouse'][0].fml_familycard);
        }
        $('#inp-no-kk2').val(result['dtl_spouse'][0].fml_familycard_new);
        $('#slc-alasan-no-kk').val(result['dtl_spouse'][0].r_fml_familycard);

        $('#inp-education-spouse-kk').val(result['dtl_spouse'][0].fml_education_old);
        if ($('#inp-education-spouse-kk').val() === "" || $('#inp-education-spouse-kk').val() === "null") {
         $('#inp-education-spouse-kk').val(result['dtl_spouse'][0].fml_education);
        }
        $('#inp-education-spouse-kk2').val(result['dtl_spouse'][0].fml_education_new);
        $('#slc-alasan-education-spouse-kk').val(result['dtl_spouse'][0].r_fml_education);
       }

       if (result['dtl_cr'].length !== 0) {
        $('#inp-alamat-resident').val(result['dtl_cr'][0].address_name);
        $('#inp-rtrw-resident').val(result['dtl_cr'][0].rt_rw);
        $('#inp-kode-pos-alamat-resident').val(result['dtl_cr'][0].zip_code);
        $('#inp-kelurahan-alamat-resident-id').val(result['dtl_cr'][0].kelurahan_id);
        $('#inp-kelurahan-alamat-resident').val(result['dtl_cr'][0].kelurahan_name);
        $('#inp-kecamatan-alamat-resident-id').val(result['dtl_cr'][0].kecamatan_id);
        $('#inp-kecamatan-alamat-resident').val(result['dtl_cr'][0].kecamatan_name);
        $('#inp-kabupaten-alamat-resident-id').val(result['dtl_cr'][0].kab_kota_id);
        $('#inp-kabupaten-alamat-resident').val(result['dtl_cr'][0].kabupaten_name);
        $('#inp-provinsi-resident-id').val(result['dtl_cr'][0].provinsi_id);
        $('#inp-provinsi-alamat-resident').val(result['dtl_cr'][0].provinsi_name);

        $('#inp-telepon-resident').val(result['dtl_cr'][0].phone_no_old);
        if ($('#inp-telepon-resident').val() === "" || $('#inp-telepon-resident').val() === "null") {
         $('#inp-telepon-resident').val(result['dtl_cr'][0].phone_no);
        }
        $('#inp-telepon-resident2').val(result['dtl_cr'][0].phone_no_new);
        $('#slc-alasan-no-tlp-resident').val(result['dtl_cr'][0].r_phone_no);

        $('#inp-hanphone-resident').val(result['dtl_cr'][0].handphone_no_old);
        if ($('#inp-hanphone-resident').val() === "" || $('#inp-hanphone-resident').val() === "null") {
         $('#inp-hanphone-resident').val(result['dtl_cr'][0].handphone_no);
        }
        $('#inp-hanphone-resident2').val(result['dtl_cr'][0].handphone_no_new);
        $('#slc-alasan-no-hp-resident').val(result['dtl_cr'][0].r_handphone_no);

        $('#inp-fax-resident').val(result['dtl_cr'][0].fax_no_old);
        if ($('#inp-fax-resident').val() === "" || $('#inp-fax-resident').val() === "null") {
         $('#inp-fax-resident').val(result['dtl_cr'][0].fax_no);
        }
        $('#inp-fax-resident2').val(result['dtl_cr'][0].fax_no_new);
        $('#slc-alasan-no-fax-resident').val(result['dtl_cr'][0].r_fax_no);

        $('#inp-email-resident').val(result['dtl_cr'][0].email_old);
        if ($('#inp-email-resident').val() === "" || $('#inp-email-resident').val() === "null") {
         $('#inp-email-resident').val(result['dtl_cr'][0].email);
        }
        $('#inp-email-resident2').val(result['dtl_cr'][0].email_new);
        $('#slc-alasan-email-resident').val(result['dtl_cr'][0].r_email);
       }
       if (result['dtl_job'].length !== 0) {
        $('#inp-nama-perusahaan-occp').val(result['dtl_job'][0].empl_name);

        $('#slc-jenis-perusahaan-occp').val(result['dtl_job'][0].empl_type_old);
        if ($('#slc-jenis-perusahaan-occp').val() === "" || $('#slc-jenis-perusahaan-occp').val() === "null") {
         $('#slc-jenis-perusahaan-occp').val(result['dtl_job'][0].empl_type);
        }
        $('#slc-jenis-perusahaan-occp2').val(result['dtl_job'][0].empl_type_new);
        $('#slc-alasan-perusahaan-occp').val(result['dtl_job'][0].r_empl_type);
        // $('#inp-email-resident2').val(result['dtl_job'][0].empl_eco_sect);
        $('#inp-sector-economi-occp').val(result['dtl_job'][0].empl_eco_sect_name);
        if ($('#inp-sector-economi-occp').val() === "" || $('#inp-sector-economi-occp').val() === "null") {
         $('#inp-sector-economi-occp').val("");
        }
        // $('#inp-email-resident2').val(result['dtl_job'][0].empl_nob);
        $('#inp-lapangan-usaha-occp').val(result['dtl_job'][0].empl_nob_name);
        if ($('#inp-lapangan-usaha-occp').val() === "" || $('#inp-lapangan-usaha-occp').val() === "null") {
         $('#inp-lapangan-usaha-occp').val("");
        }

        $('#slc-fasilitas-perusahaan-occp').val(result['dtl_job'][0].empl_facility_old);
        if ($('#slc-fasilitas-perusahaan-occp').val() === "" || $('#slc-fasilitas-perusahaan-occp').val() === "null") {
         $('#slc-fasilitas-perusahaan-occp').val(result['dtl_job'][0].empl_facility);
        }
        $('#slc-fasilitas-perusahaan-occp2').val(result['dtl_job'][0].empl_facility_new);
        $('#slc-alasan-fasilitas-perusahaan-occp').val(result['dtl_job'][0].r_empl_facility);

        $('#inp-bisnis-lain-occp').val(result['dtl_job'][0].empl_otherbuss_old);
        if ($('#inp-bisnis-lain-occp').val() === "" || $('#inp-bisnis-lain-occp').val() === "null") {
         $('#inp-bisnis-lain-occp').val(result['dtl_job'][0].empl_otherbuss);
        }
        $('#inp-bisnis-lain-occp2').val(result['dtl_job'][0].empl_otherbuss_new);
        $('#slc-alasan-bisnis-lain-occp').val(result['dtl_job'][0].r_empl_otherbuss);

        $('#inp-tipe-occp-flag').val(result['dtl_job'][0].flag_occupation);
        $('#slc-posisi-kerja-occp').val(result['dtl_job'][0].empl_jobposition);

        $('#inp-atasan-langsung-occp').val(result['dtl_job'][0].empl_rdclead_old);
        if ($('#inp-atasan-langsung-occp').val() === "" || $('#inp-atasan-langsung-occp').val() === "null") {
         $('#inp-atasan-langsung-occp').val(result['dtl_job'][0].empl_rdclead);
        }
        $('#inp-atasan-langsung-occp2').val(result['dtl_job'][0].empl_rdclead_new);
        $('#slc-alasan-atasan-langsung-occp').val(result['dtl_job'][0].r_empl_rdclead);
        $('#inp-total-pegawai-occp').val(result['dtl_job'][0].empl_total_empl);
        $('#inp-lama-usaha-occp').val(result['dtl_job'][0].empl_nyow);
        $('#slc-status-pegawai-occp').val(result['dtl_job'][0].empl_stat_code);

        $('#inp-alamat-occp').val(result['dtl_job'][0].address_name_old);
        if ($('#inp-alamat-occp').val() === "" || $('#inp-alamat-occp').val() === "null") {
         $('#inp-alamat-occp').val(result['dtl_job'][0].address_name);
        }
        $('#inp-alamat-occp2').val(result['dtl_job'][0].address_name_new);
        $('#slc-alasan-alamat-occp').val(result['dtl_job'][0].r_address_name);

        $('#inp-rtrw-alamat-occp').val(result['dtl_job'][0].rt_rw_old);
        if ($('#inp-rtrw-alamat-occp').val() === "" || $('#inp-rtrw-alamat-occp').val() === "null") {
         $('#inp-rtrw-alamat-occp').val(result['dtl_job'][0].rt_rw);
        }

        if (result['dtl_job'][0].rt_rw_new != null) {
         var str_occp_rtrw = result['dtl_job'][0].rt_rw_new;
         var rt_rw_occp = str_occp_rtrw.split("/");

         $('#inp-rtrw-alamat-occp2').val(rt_rw_occp[0]);
         $('#inp-rw-alamat-occp2').val(rt_rw_occp[1]);
        } else {
         $('#inp-rtrw-alamat-occp2').val(result['dtl_job'][0].rt_rw_new);
         $('#inp-rw-alamat-occp2').val(result['dtl_job'][0].rt_rw_new);
        }

        $('#slc-alasan-rtrw-occp').val(result['dtl_job'][0].r_rt_rw);

        $('#inp-kode-pos-occp').val(result['dtl_job'][0].zip_code_old);
        if ($('#inp-kode-pos-occp').val() === "" || $('#inp-kode-pos-occp').val() === "null") {
         $('#inp-kode-pos-occp').val(result['dtl_job'][0].zip_code);
        }
        $('#inp-kode-pos-occp2').val(result['dtl_job'][0].zip_code_new);
        $('#slc-alasan-kodepos-occp').val(result['dtl_job'][0].r_zip_code);


        $('#inp-kelurahan-id-occp').val(result['dtl_job'][0].kelurahan_id_job_old);
        if ($('#inp-kelurahan-id-occp').val() === "" || $('#inp-kelurahan-id-occp').val() === "null") {
         $('#inp-kelurahan-id-occp').val(result['dtl_job'][0].kelurahan_id_job);
         if ($('#inp-kelurahan-id-occp').val() === "" || $('#inp-kelurahan-id-occp').val() === "null") {
          $('#inp-kelurahan-id-occp').val("");
         }
        }
        $('#inp-kelurahan-occp').val(result['dtl_job'][0].kelurahan_name_job_old);
        if ($('#inp-kelurahan-occp').val() === "" || $('#inp-kelurahan-occp').val() === "null") {
         $('#inp-kelurahan-occp').val(result['dtl_job'][0].kelurahan_name_job);
         if ($('#inp-kelurahan-occp').val() === "" || $('#inp-kelurahan-occp').val() === "null") {
          $('#inp-kelurahan-occp').val("");
         }
        }
        $('#inp-kelurahan-id-occp2').val(result['dtl_job'][0].kelurahan_id_job_new);
        if ($('#inp-kelurahan-id-occp2').val() === "" || $('#inp-kelurahan-id-occp2').val() === "null") {
         $('#inp-kelurahan-id-occp2').val("");
        }
        $('#inp-kelurahan-occp2').val(result['dtl_job'][0].kelurahan_name_job_new);
        if ($('#inp-kelurahan-occp2').val() === "" || $('#inp-kelurahan-occp2').val() === "null") {
         $('#inp-kelurahan-occp2').val("");
        }
        $('#slc-alasan-kelurahan-occp').val(result['dtl_job'][0].r_kelurahan_id_job);


        $('#inp-kecamatan-id-occp').val(result['dtl_job'][0].kecamatan_id_job_old);
        if ($('#inp-kecamatan-id-occp').val() === "" || $('#inp-kecamatan-id-occp').val() === "null") {
         $('#inp-kecamatan-id-occp').val(result['dtl_job'][0].kecamatan_id_job);
         if ($('#inp-kecamatan-id-occp').val() === "" || $('#inp-kecamatan-id-occp').val() === "null") {
          $('#inp-kecamatan-id-occp').val("");
         }
        }
        $('#inp-kecamatan-occp').val(result['dtl_job'][0].kecamatan_name_job_old);
        if ($('#inp-kecamatan-occp').val() === "" || $('#inp-kecamatan-occp').val() === "null") {
         $('#inp-kecamatan-occp').val(result['dtl_job'][0].kecamatan_name_job);
         if ($('#inp-kecamatan-occp').val() === "" || $('#inp-kecamatan-occp').val() === "null") {
          $('#inp-kecamatan-occp').val("");
         }
        }
        $('#inp-kecamatan-id-occp2').val(result['dtl_job'][0].kecamatan_id_job_new);
        if ($('#inp-kecamatan-id-occp2').val() === "" || $('#inp-kecamatan-id-occp2').val() === "null") {
         $('#inp-kecamatan-id-occp2').val("");
        }
        $('#inp-kecamatan-occp2').val(result['dtl_job'][0].kecamatan_name_job_new);
        if ($('#inp-kecamatan-occp2').val() === "" || $('#inp-kecamatan-occp2').val() === "null") {
         $('#inp-kecamatan-occp2').val("");
        }
        $('#slc-alasan-kecamatan-occp').val(result['dtl_job'][0].r_kecamatan_id_job);


        $('#inp-kabupaten-id-occp').val(result['dtl_job'][0].kab_kota_id_job_old);
        if ($('#inp-kabupaten-id-occp').val() === "" || $('#inp-kabupaten-id-occp').val() === "null") {
         $('#inp-kabupaten-id-occp').val(result['dtl_job'][0].kab_kota_id_job);
         if ($('#inp-kabupaten-id-occp').val() === "" || $('#inp-kabupaten-id-occp').val() === "null") {
          $('#inp-kabupaten-id-occp').val("");
         }
        }
        $('#inp-kabupaten-occp').val(result['dtl_job'][0].kab_kota_name_job_old);
        if ($('#inp-kabupaten-occp').val() === "" || $('#inp-kabupaten-occp').val() === "null") {
         $('#inp-kabupaten-occp').val(result['dtl_job'][0].kab_kota_name_job);
         if ($('#inp-kabupaten-occp').val() === "" || $('#inp-kabupaten-occp').val() === "null") {
          $('#inp-kabupaten-occp').val("");
         }
        }
        $('#inp-kabupaten-id-occp2').val(result['dtl_job'][0].kab_kota_id_job_new);
        if ($('#inp-kabupaten-id-occp2').val() === "" || $('#inp-kabupaten-id-occp2').val() === "null") {
         $('#inp-kabupaten-id-occp2').val("");
        }
        $('#inp-kabupaten-occp2').val(result['dtl_job'][0].kab_kota_name_job_new);
        if ($('#inp-kabupaten-occp2').val() === "" || $('#inp-kabupaten-occp2').val() === "null") {
         $('#inp-kabupaten-occp2').val("");
        }
        $('#slc-alasan-kabupaten-occp').val(result['dtl_job'][0].r_kab_kota_id_job);


        $('#inp-provinsi-id-occp').val(result['dtl_job'][0].provinsi_id_job_old);
        if ($('#inp-provinsi-id-occp').val() === "" || $('#inp-provinsi-id-occp').val() === "null") {
         $('#inp-provinsi-id-occp').val(result['dtl_job'][0].provinsi_id_job);
         if ($('#inp-provinsi-id-occp').val() === "" || $('#inp-provinsi-id-occp').val() === "null") {
          $('#inp-provinsi-id-occp').val("");
         }
        }
        $('#inp-provinsi-occp').val(result['dtl_job'][0].provinsi_name_job_old);
        if ($('#inp-provinsi-occp').val() === "" || $('#inp-provinsi-occp').val() === "null") {
         $('#inp-provinsi-occp').val(result['dtl_job'][0].provinsi_name_job);
         if ($('#inp-provinsi-occp').val() === "" || $('#inp-provinsi-occp').val() === "null") {
          $('#inp-provinsi-occp').val("");
         }
        }
        $('#inp-provinsi-id-occp2').val(result['dtl_job'][0].provinsi_id_job_new);
        if ($('#inp-provinsi-id-occp2').val() === "" || $('#inp-provinsi-id-occp2').val() === "null") {
         $('#inp-provinsi-id-occp2').val("");
        }
        $('#inp-provinsi-occp2').val(result['dtl_job'][0].provinsi_name_job_new);
        if ($('#inp-provinsi-occp2').val() === "" || $('#inp-provinsi-occp2').val() === "null") {
         $('#inp-provinsi-occp2').val("");
        }
        $('#slc-alasan-provinsi-occp').val(result['dtl_job'][0].r_provinsi_id_job);

        $('#inp-telepon-occp').val(result['dtl_job'][0].phone_no_old);
        if ($('#inp-telepon-occp').val() === "" || $('#inp-telepon-occp').val() === "null") {
         $('#inp-telepon-occp').val(result['dtl_job'][0].phone_no);
        }
        $('#inp-telepon-occp2').val(result['dtl_job'][0].phone_no_new);
        $('#slc-alasan-no-tlp-occp').val(result['dtl_job'][0].r_phone_no);

        $('#inp-fax-occp').val(result['dtl_job'][0].fax_no_old);
        if ($('#inp-fax-occp').val() === "" || $('#inp-fax-occp').val() === "null") {
         $('#inp-fax-occp').val(result['dtl_job'][0].fax_no);
        }
        $('#inp-fax-occp2').val(result['dtl_job'][0].fax_no_new);
        $('#slc-alasan-no-fax-occp').val(result['dtl_job'][0].r_fax_no);

        $('#inp-email-occp').val(result['dtl_job'][0].email_old);
        if ($('#inp-email-occp').val() === "" || $('#inp-email-occp').val() === "null") {
         $('#inp-email-occp').val(result['dtl_job'][0].email);
        }
        $('#inp-email-occp2').val(result['dtl_job'][0].email_new);
        $('#slc-alasan-email-occp').val(result['dtl_job'][0].r_email);
       }
       if (result['dtl_other'].length !== 0) {

        // $('#inp-npwp-other').val(result['dtl_other'][0].fml_npwp_old);
        // if ($('#inp-npwp-other').val() === "" || $('#inp-npwp-other').val() === "null") {
        //  $('#inp-npwp-other').val(result['dtl_other'][0].fml_npwp);
        // }
        // $('#inp-npwp-other2').val(result['dtl_other'][0].fml_npwp_new);
        // $('#slc-alasan-npwp-other').val(result['dtl_other'][0].r_fml_npwp);
        $('#inp-no-kk').val(result['dtl_other'][0].fml_familycard_old);
        if ($('#inp-no-kk').val() === "" || $('#inp-no-kk').val() === "null") {
         $('#inp-no-kk').val(result['dtl_other'][0].fml_familycard);
        }
        $('#inp-no-kk2').val(result['dtl_other'][0].fml_familycard_new);
        $('#slc-alasan-no-kk').val(result['dtl_other'][0].r_fml_familycard);

        $('#slc-jenis-alamat-other').val(result['dtl_other'][0].fml_addid);

        $('#inp-nama-lengkap-other').val(result['dtl_other'][0].fml_name);

        $('#inp-alias-other').val(result['dtl_other'][0].fml_aname_old);
        if ($('#inp-alias-other').val() === "" || $('#inp-alias-other').val() === "null") {
         $('#inp-alias-other').val(result['dtl_other'][0].fml_aname);
        }
        $('#inp-alias-other2').val(result['dtl_other'][0].fml_aname_new);
        $('#slc-alasan-alias-other').val(result['dtl_other'][0].r_fml_aname);

        $('#inp-gelar-other').val(result['dtl_other'][0].fml_title_old);
        if ($('#inp-gelar-other').val() === "" || $('#inp-gelar-other').val() === "null") {
         $('#inp-gelar-other').val(result['dtl_other'][0].fml_title);
        }
        $('#inp-gelar-other2').val(result['dtl_other'][0].fml_title_new);
        $('#slc-alasan-gelar-other').val(result['dtl_other'][0].r_fml_title);

        $('#inp-alamat-other').val(result['dtl_other'][0].fml_addname_old);
        if ($('#inp-alamat-other').val() === "" || $('#inp-alamat-other').val() === "null") {
         $('#inp-alamat-other').val(result['dtl_other'][0].fml_addname);
        }
        $('#inp-alamat-other2').val(result['dtl_other'][0].fml_addname_new);
        $('#slc-alasan-alamat-other').val(result['dtl_other'][0].r_fml_addname);

        $('#inp-rtrw-other').val(result['dtl_other'][0].fml_rt_old);
        if ($('#inp-rtrw-other').val() === "" || $('#inp-rtrw-other').val() === "null") {
         $('#inp-rtrw-other').val(result['dtl_other'][0].fml_rt);
        }
        $('#inp-rtrw-other2').val(result['dtl_other'][0].fml_rt_new);
        if ($('#inp-rtrw-other2').val() === "" || $('#inp-rtrw-other2').val() === "null") {
         $('#inp-rtrw-other2').val("");
        }
        $('#inp-rw-other').val(result['dtl_other'][0].fml_rw_old);
        if ($('#inp-rw-other').val() === "" || $('#inp-rw-other').val() === "null") {
         $('#inp-rw-other').val(result['dtl_other'][0].fml_rw);
        }
        $('#inp-rw-other2').val(result['dtl_other'][0].fml_rw_new);
        if ($('#inp-rw-other2').val() === "" || $('#inp-rw-other2').val() === "null") {
         $('#inp-rw-other2').val("");
        }
        $('#slc-alasan-rtrw-other').val(result['dtl_other'][0].r_fml_rt);

        $('#inp-kode-pos-other').val(result['dtl_other'][0].fml_zipcode_old);
        if ($('#inp-kode-pos-other').val() === "" || $('#inp-kode-pos-other').val() === "null") {
         $('#inp-kode-pos-other').val(result['dtl_other'][0].fml_zipcode);
        }
        $('#inp-kode-pos-other2').val(result['dtl_other'][0].fml_zipcode_new);
        $('#slc-alasan-kodepos-other').val(result['dtl_other'][0].r_fml_zipcode);


        $('#inp-kelurahan-alamat-other-id').val(result['dtl_other'][0].fml_kelurahan_old);
        if ($('#inp-kelurahan-alamat-other-id').val() === "" || $('#inp-kelurahan-alamat-other-id').val() === "null") {
         $('#inp-kelurahan-alamat-other-id').val(result['dtl_other'][0].fml_kelurahan);
         if ($('#inp-kelurahan-alamat-other-id').val() === "" || $('#inp-kelurahan-alamat-other-id').val() === "null") {
          $('#inp-kelurahan-alamat-other-id').val("");
         }
        }
        $('#inp-kelurahan-alamat-other').val(result['dtl_other'][0].fml_kelurahan_old_name);
        if ($('#inp-kelurahan-alamat-other').val() === "" || $('#inp-kelurahan-alamat-other').val() === "null") {
         $('#inp-kelurahan-alamat-other').val(result['dtl_other'][0].fml_kelurahan_name);
         if ($('#inp-kelurahan-alamat-other').val() === "" || $('#inp-kelurahan-alamat-other').val() === "null") {
          $('#inp-kelurahan-alamat-other').val("");
         }
        }
        $('#inp-kelurahan-alamat-other-id2').val(result['dtl_other'][0].fml_kelurahan_new);
        if ($('#inp-kelurahan-alamat-other-id2').val() === "" || $('#inp-kelurahan-alamat-other-id2').val() === "null") {
         $('#inp-kelurahan-alamat-other-id2').val("");
        }
        $('#inp-kelurahan-alamat-other2').val(result['dtl_other'][0].fml_kelurahan_new_name);
        if ($('#inp-kelurahan-alamat-other2').val() === "" || $('#inp-kelurahan-alamat-other2').val() === "null") {
         $('#inp-kelurahan-alamat-other2').val("");
        }
        $('#slc-alasan-kelurahan-other').val(result['dtl_other'][0].r_fml_kelurahan);
        // $('#inp-kecamatan-alamat-other-id').val(result['dtl_other'][0].fml_kecamatan);
        // $('#inp-kecamatan-alamat-other-id').val(result['dtl_other'][0].fml_kecamatan_old);

        $('#inp-kecamatan-alamat-other').val(result['dtl_other'][0].fml_kecamatan_name_old);
        if ($('#inp-kecamatan-alamat-other').val() === "" || $('#inp-kecamatan-alamat-other').val() === "null") {
         $('#inp-kecamatan-alamat-other').val(result['dtl_other'][0].fml_kecamatan_name);
         if ($('#inp-kecamatan-alamat-other').val() === "" || $('#inp-kecamatan-alamat-other').val() === "null") {
          $('#inp-kecamatan-alamat-other').val("");
         }
        }
        // $('#inp-kecamatan-alamat-other-id2').val(result['dtl_other'][0].fml_kecamatan_new);
        $('#inp-kecamatan-alamat-other2').val(result['dtl_other'][0].fml_kecamatan_name_new);
        if ($('#inp-kecamatan-alamat-other2').val() === "" || $('#inp-kecamatan-alamat-other2').val() === "null") {
         $('#inp-kecamatan-alamat-other2').val("");
        }
        $('#slc-alasan-kecamatan-other').val(result['dtl_other'][0].r_fml_kelurahan);
        // $('#inp-kabupaten-alamat-other-id').val(result['dtl_other'][0].fml_kabupaten);                                
        // $('#inp-kabupaten-alamat-other-id').val(result['dtl_other'][0].fml_kabupaten_old);

        $('#inp-kabupaten-alamat-other').val(result['dtl_other'][0].fml_kabupaten_name_old);
        if ($('#inp-kabupaten-alamat-other').val() === "" || $('#inp-kabupaten-alamat-other').val() === "null") {
         $('#inp-kabupaten-alamat-other').val(result['dtl_other'][0].fml_kabupaten_name);
         if ($('#inp-kabupaten-alamat-other').val() === "" || $('#inp-kabupaten-alamat-other').val() === "null") {
          $('#inp-kabupaten-alamat-other').val("");
         }
        }
        // $('#inp-kabupaten-alamat-other-id2').val(result['dtl_other'][0].fml_kabupaten_new);
        $('#inp-kabupaten-alamat-other2').val(result['dtl_other'][0].fml_kabupaten_name_new);
        if ($('#inp-kabupaten-alamat-other2').val() === "" || $('#inp-kabupaten-alamat-other2').val() === "null") {
         $('#inp-kabupaten-alamat-other2').val("");
        }
        $('#slc-alasan-kabupaten-other').val(result['dtl_other'][0].r_fml_kelurahan);
        // $('#inp-provinsi-other-id').val(result['dtl_other'][0].fml_provinsi);
        // $('#inp-provinsi-other-id').val(result['dtl_other'][0].fml_provinsi_old);

        $('#inp-provinsi-alamat-other').val(result['dtl_other'][0].fml_provinsi_name_old);
        if ($('#inp-provinsi-alamat-other').val() === "" || $('#inp-provinsi-alamat-other').val() === "null") {
         $('#inp-provinsi-alamat-other').val(result['dtl_other'][0].fml_provinsi_name);
         if ($('#inp-provinsi-alamat-other').val() === "" || $('#inp-provinsi-alamat-other').val() === "null") {
          $('#inp-provinsi-alamat-other').val("");
         }
        }
        $('#inp-provinsi-alamat-other2').val(result['dtl_other'][0].fml_provinsi_name_new);
        if ($('#inp-provinsi-alamat-other2').val() === "" || $('#inp-provinsi-alamat-other2').val() === "null") {
         $('#inp-provinsi-alamat-other2').val("");
        }
        // $('#inp-provinsi-other-id2').val(result['dtl_other'][0].fml_provinsi_new);
        $('#slc-alasan-provinsi-other').val(result['dtl_other'][0].r_fml_kelurahan);
        $('#inp-telepon-other').val(result['dtl_other'][0].fml_phone);
        $('#inp-hanphone-other').val(result['dtl_other'][0].fml_hpno);

        $('#slc-status-hubungan-other').val(result['dtl_other'][0].fml_relation_old);
        if ($('#slc-status-hubungan-other').val() === "" || $('#slc-status-hubungan-other').val() === "null") {
         $('#slc-status-hubungan-other').val(result['dtl_other'][0].fml_relation);
        }
        $('#slc-status-hubungan-other2').val(result['dtl_other'][0].fml_relation_new);
        $('#slc-alasan-status-hubungan-other').val(result['dtl_other'][0].r_fml_relation);
       }


       // if ($('#slc-status-pernikahan-per').val() === '01'  && $('#inp-is-emergency-spouse').val() !== '1'){
       //     $('.cls-identitas-spouse').show();
       //     $('.tab_sps1').prop('disabled', true);
       //     $('.tab_sps').prop('disabled', false);
       //     $('.slc-alasan-alamat-sps').prop('disabled', false);
           
       //  } else 
        //if ($('#slc-status-pernikahan-per').val() === '01' && $('#inp-is-emergency-spouse').val() === '1'){
            //$('.cls-identitas-spouse').show();
            //$('.tab_sps').prop('disabled', true);
            //$('.slc-alasan-alamat-sps').prop('disabled', true);
            //$('.tab_sps1').val("");
        //}

       if (result['dtl_guarantor'].length !== 0) {
        $('#inp-no-penjamin').val(result['dtl_guarantor'][0].gua_no);
        if ($('#inp-no-penjamin').val() === "" || $('#inp-no-penjamin').val() === "null") {
         $('#inp-no-penjamin').val(result['dtl_guarantor'][0].gua_no);
        }
        // $('#inp-no-penjamin2').val(result['dtl_guarantor'][0].gua_no_new);
        // $('#slc-alasan-no-penjamin').val(result['dtl_guarantor'][0].r_gua_no);

        $('#slc-jenis-identitas-penjamin').val(result['dtl_guarantor'][0].gua_idtype_old);
        if ($('#slc-jenis-identitas-penjamin').val() === "" || $('#slc-jenis-identitas-penjamin').val() === "null") {
         $('#slc-jenis-identitas-penjamin').val(result['dtl_guarantor'][0].gua_idtype);
        }
        $('#slc-jenis-identitas-penjamin2').val(result['dtl_guarantor'][0].gua_idtype_new);
        $('#slc-alasan-jns-id-penjamin').val(result['dtl_guarantor'][0].r_gua_idtype);

        $('#inp-no-identitas-penjamin').val(result['dtl_guarantor'][0].gua_idno_old);
        if ($('#inp-no-identitas-penjamin').val() === "" || $('#inp-no-identitas-penjamin').val() === "null") {
         $('#inp-no-identitas-penjamin').val(result['dtl_guarantor'][0].gua_idno);
        }
        $('#inp-no-identitas-penjamin2').val(result['dtl_guarantor'][0].gua_idno_new);
        $('#slc-alasan-no-id-penjamin').val(result['dtl_guarantor'][0].r_gua_idno);

        $('#inp-issued-date-penjamin').val(result['dtl_guarantor'][0].gua_iddate_old);
        if ($('#inp-issued-date-penjamin').val() === "" || $('#inp-issued-date-penjamin').val() === "null") {
         $('#inp-issued-date-penjamin').val(result['dtl_guarantor'][0].gua_iddate);
        }
        $('#inp-issued-date-penjamin2').val(result['dtl_guarantor'][0].gua_iddate_new);
        $('#slc-alasan-tgl-id-penjamin').val(result['dtl_guarantor'][0].r_gua_iddate);

        $('#inp-expired-date-penjamin').val(result['dtl_guarantor'][0].gua_expdate_old);
        if ($('#inp-expired-date-penjamin').val() === "" || $('#inp-expired-date-penjamin').val() === "null") {
         $('#inp-expired-date-penjamin').val(result['dtl_guarantor'][0].gua_expdate);
        }
        $('#inp-expired-date-penjamin2').val(result['dtl_guarantor'][0].gua_expdate_new);
        $('#slc-alasan-exp-id-penjamin').val(result['dtl_guarantor'][0].r_gua_expdate);

        $('#inp-fname-penjamin').val(result['dtl_guarantor'][0].gua_fname_old);
        if ($('#inp-fname-penjamin').val() === "" || $('#inp-fname-penjamin').val() === "null") {
         $('#inp-fname-penjamin').val(result['dtl_guarantor'][0].gua_fname);
        }
        $('#inp-fname-penjamin2').val(result['dtl_guarantor'][0].gua_fname_new);
        $('#slc-alasan-fname-penjamin').val(result['dtl_guarantor'][0].r_gua_fname);

        $('#inp-lname-penjamin').val(result['dtl_guarantor'][0].gua_lname_old);
        if ($('#inp-lname-penjamin').val() === "" || $('#inp-lname-penjamin').val() === "null") {
         $('#inp-lname-penjamin').val(result['dtl_guarantor'][0].gua_lname);
        }
        $('#inp-lname-penjamin2').val(result['dtl_guarantor'][0].gua_lname_new);
        $('#slc-alasan-lname-penjamin').val(result['dtl_guarantor'][0].r_gua_lname);

        $('#inp-alias-penjamin').val(result['dtl_guarantor'][0].gua_alias_old);
        if ($('#inp-alias-penjamin').val() === "" || $('#inp-alias-penjamin').val() === "null") {
         $('#inp-alias-penjamin').val(result['dtl_guarantor'][0].gua_alias);
        }
        $('#inp-alias-penjamin2').val(result['dtl_guarantor'][0].gua_alias_new);
        $('#slc-alasan-alias-penjamin').val(result['dtl_guarantor'][0].r_gua_alias);

        $('#inp-gelar-penjamin').val(result['dtl_guarantor'][0].gua_title_old);
        if ($('#inp-gelar-penjamin').val() === "" || $('#inp-gelar-penjamin').val() === "null") {
         $('#inp-gelar-penjamin').val(result['dtl_guarantor'][0].gua_title);
        }
        $('#inp-gelar-penjamin2').val(result['dtl_guarantor'][0].gua_title_new);
        $('#slc-alasan-gelar-penjamin').val(result['dtl_guarantor'][0].r_gua_title);

        $('#inp-tempat-lahir-penjamin').val(result['dtl_guarantor'][0].gua_bornplc_old);
        if ($('#inp-tempat-lahir-penjamin').val() === "" || $('#inp-tempat-lahir-penjamin').val() === "null") {
         $('#inp-tempat-lahir-penjamin').val(result['dtl_guarantor'][0].gua_bornplc);
        }
        $('#inp-tempat-lahir-penjamin2').val(result['dtl_guarantor'][0].gua_bornplc_new);
        $('#slc-alasan-tmpt-lhr-penjamin').val(result['dtl_guarantor'][0].r_gua_bornplc);

        $('#inp-tanggal-lahir-penjamin').val(result['dtl_guarantor'][0].gua_borndate_old);
        if ($('#inp-tanggal-lahir-penjamin').val() === "" || $('#inp-tanggal-lahir-penjamin').val() === "null") {
         $('#inp-tanggal-lahir-penjamin').val(result['dtl_guarantor'][0].gua_borndate);
        }
        $('#inp-tanggal-lahir-penjamin2').val(result['dtl_guarantor'][0].gua_borndate_new);
        $('#slc-alasan-tgl-lhr-penjamin').val(result['dtl_guarantor'][0].r_gua_borndate);

        $('#slc-jenis-kelamin-penjamin').val(result['dtl_guarantor'][0].gua_gender_old);
        if ($('#slc-jenis-kelamin-penjamin').val() === "" || $('#slc-jenis-kelamin-penjamin').val() === "null") {
         $('#slc-jenis-kelamin-penjamin').val(result['dtl_guarantor'][0].gua_gender);
        }
        $('#slc-jenis-kelamin-penjamin2').val(result['dtl_guarantor'][0].gua_gender_new);
        $('#slc-alasan-jns-klmn-penjamin').val(result['dtl_guarantor'][0].r_gua_gender);

        $('#slc-agama-penjamin').val(result['dtl_guarantor'][0].gua_religi_old);
        if ($('#slc-agama-penjamin').val() === "" || $('#slc-agama-penjamin').val() === "null") {
         $('#slc-agama-penjamin').val(result['dtl_guarantor'][0].gua_religi);
        }
        $('#slc-agama-penjamin2').val(result['dtl_guarantor'][0].gua_religi_new);
        $('#slc-alasan-agama-penjamin').val(result['dtl_guarantor'][0].r_gua_religi);

        $('#slc-pekerjaan-penjamin').val(result['dtl_guarantor'][0].gua_occp_old);
        if ($('#slc-pekerjaan-penjamin').val() === "" || $('#slc-pekerjaan-penjamin').val() === "null") {
         $('#slc-pekerjaan-penjamin').val(result['dtl_guarantor'][0].gua_occp);
        }
        $('#slc-pekerjaan-penjamin2').val(result['dtl_guarantor'][0].gua_occnew);
        $('#slc-alasan-pekerjaan-penjamin').val(result['dtl_guarantor'][0].r_gua_occp);

        $('#slc-status-pernikahan-penjamin').val(result['dtl_guarantor'][0].gua_mrtl_old);
        if ($('#slc-status-pernikahan-penjamin').val() === "" || $('#slc-status-pernikahan-penjamin').val() === "null") {
         $('#slc-status-pernikahan-penjamin').val(result['dtl_guarantor'][0].gua_mrtl);
        }
        $('#slc-status-pernikahan-penjamin2').val(result['dtl_guarantor'][0].gua_mrtl_new);
        $('#slc-alasan-pernikahan-penjamin').val(result['dtl_guarantor'][0].r_gua_mrtl);

        $('#inp-alamat-penjamin').val(result['dtl_guarantor'][0].gua_addr_old);
        if ($('#inp-alamat-penjamin').val() === "" || $('#inp-alamat-penjamin').val() === "null") {
         $('#inp-alamat-penjamin').val(result['dtl_guarantor'][0].gua_addr);
        }
        $('#inp-alamat-penjamin2').val(result['dtl_guarantor'][0].gua_addr_new);
        $('#slc-alasan-alamat-penjamin').val(result['dtl_guarantor'][0].r_gua_addr);

        $('#inp-rtrw-penjamin').val(result['dtl_guarantor'][0].gua_rtrw_old);
        if ($('#inp-rtrw-penjamin').val() === "" || $('#inp-alamat-penjamin').val() === "null") {
         $('#inp-rtrw-penjamin').val(result['dtl_guarantor'][0].gua_rtrw);
        }

        if (result['dtl_guarantor'][0].gua_rtrw_new != null) {
         var str_penjamin_rtrw = result['dtl_guarantor'][0].gua_rtrw_new;
         var rt_rw_penjamin = str_penjamin_rtrw.split("/");

         $('#inp-rtrw-penjamin2').val(rt_rw_penjamin[0]);
         $('#inp-rw-penjamin2').val(rt_rw_penjamin[1]);
        } else {
         $('#inp-rtrw-penjamin2').val(result['dtl_guarantor'][0].gua_rtrw_new);
         $('#inp-rw-penjamin2').val(result['dtl_guarantor'][0].gua_rtrw_new);
        }
        $('#slc-alasan-rtrw-penjamin').val(result['dtl_guarantor'][0].r_gua_rtrw);

        $('#inp-kode-pos-alamat-penjamin').val(result['dtl_guarantor'][0].gua_zipcode_old);
        if ($('#inp-kode-pos-alamat-penjamin').val() === "" || $('#inp-kode-pos-alamat-penjamin').val() === "null") {
         $('#inp-kode-pos-alamat-penjamin').val(result['dtl_guarantor'][0].gua_zipcode);
        }
        $('#inp-kode-pos-alamat-penjamin2').val(result['dtl_guarantor'][0].gua_zipcode_new);
        $('#slc-alasan-kodepos-penjamin').val(result['dtl_guarantor'][0].r_gua_zipcode);

        $('#inp-kelurahan-alamat-penjamin-id').val(result['dtl_guarantor'][0].gua_kelu_old);
        if ($('#inp-kelurahan-alamat-penjamin-id').val() === "" || $('#inp-kelurahan-alamat-penjamin-id').val() === "null") {
         $('#inp-kelurahan-alamat-penjamin-id').val(result['dtl_guarantor'][0].gua_kelu);
         if ($('#inp-kelurahan-alamat-penjamin-id').val() === "" || $('#inp-kelurahan-alamat-penjamin-id').val() === "null") {
          $('#inp-kelurahan-alamat-penjamin-id').val("");
         }
        }
        $('#inp-kelurahan-alamat-penjamin').val(result['dtl_guarantor'][0].gua_kelu_old_name);
        if ($('#inp-kelurahan-alamat-penjamin').val() === "" || $('#inp-kelurahan-alamat-penjamin').val() === "null") {
         $('#inp-kelurahan-alamat-penjamin').val(result['dtl_guarantor'][0].gua_kelu_name);
         if ($('#inp-kelurahan-alamat-penjamin').val() === "" || $('#inp-kelurahan-alamat-penjamin').val() === "null") {
          $('#inp-kelurahan-alamat-penjamin').val("");
         }
        }
        $('#inp-kelurahan-alamat-penjamin2').val(result['dtl_guarantor'][0].gua_kelu_new_name);
        if ($('#inp-kelurahan-alamat-penjamin2').val() === "" || $('#inp-kelurahan-alamat-penjamin2').val() === "null") {
         $('#inp-kelurahan-alamat-penjamin2').val("");
        }
        $('#inp-kelurahan-alamat-penjamin-id2').val(result['dtl_guarantor'][0].gua_kelu_new);
        if ($('#inp-kelurahan-alamat-penjamin-id2').val() === "" || $('#inp-kelurahan-alamat-penjamin-id2').val() === "null") {
         $('#inp-kelurahan-alamat-penjamin-id2').val("");
        }
        $('#slc-alasan-kelurahan-penjamin').val(result['dtl_guarantor'][0].r_gua_kelu);

        $('#inp-kecamatan-alamat-penjamin-id').val(result['dtl_guarantor'][0].gua_keca_old);
        if ($('#inp-kecamatan-alamat-penjamin-id').val() === "" || $('#inp-kecamatan-alamat-penjamin-id').val() === "null") {
         $('#inp-kecamatan-alamat-penjamin-id').val(result['dtl_guarantor'][0].gua_keca);
         if ($('#inp-kecamatan-alamat-penjamin-id').val() === "" || $('#inp-kecamatan-alamat-penjamin-id').val() === "null") {
          $('#inp-kecamatan-alamat-penjamin-id').val("");
         }
        }
        $('#inp-kecamatan-alamat-penjamin').val(result['dtl_guarantor'][0].gua_keca_old_name);
        if ($('#inp-kecamatan-alamat-penjamin').val() === "" || $('#inp-kecamatan-alamat-penjamin').val() === "null") {
         $('#inp-kecamatan-alamat-penjamin').val(result['dtl_guarantor'][0].gua_keca_name);
         if ($('#inp-kecamatan-alamat-penjamin').val() === "" || $('#inp-kecamatan-alamat-penjamin').val() === "null") {
          $('#inp-kecamatan-alamat-penjamin').val("");
         }
        }
        $('#inp-kecamatan-alamat-penjamin-id2').val(result['dtl_guarantor'][0].gua_keca_new);
        if ($('#inp-kecamatan-alamat-penjamin-id2').val() === "" || $('#inp-kecamatan-alamat-penjamin-id2').val() === "null") {
         $('#inp-kecamatan-alamat-penjamin-id2').val("");
        }
        $('#inp-kecamatan-alamat-penjamin2').val(result['dtl_guarantor'][0].gua_keca_new_name);
        if ($('#inp-kecamatan-alamat-penjamin2').val() === "" || $('#inp-kecamatan-alamat-penjamin2').val() === "null") {
         $('#inp-kecamatan-alamat-penjamin2').val("");
        }
        $('#slc-alasan-kecamatan-penjamin').val(result['dtl_guarantor'][0].r_gua_keca);

        $('#inp-kabupaten-alamat-penjamin-id').val(result['dtl_guarantor'][0].gua_kabkot_old);
        if ($('#inp-kabupaten-alamat-penjamin-id').val() === "" || $('#inp-kabupaten-alamat-penjamin-id').val() === "null") {
         $('#inp-kabupaten-alamat-penjamin-id').val(result['dtl_guarantor'][0].gua_kabkot);
         if ($('#inp-kabupaten-alamat-penjamin-id').val() === "" || $('#inp-kabupaten-alamat-penjamin-id').val() === "null") {
          $('#inp-kabupaten-alamat-penjamin-id').val("");
         }
        }
        $('#inp-kabupaten-alamat-penjamin').val(result['dtl_guarantor'][0].gua_kabkot_old_name);
        if ($('#inp-kabupaten-alamat-penjamin').val() === "" || $('#inp-kabupaten-alamat-penjamin').val() === "null") {
         $('#inp-kabupaten-alamat-penjamin').val(result['dtl_guarantor'][0].gua_kabkot_name);
         if ($('#inp-kabupaten-alamat-penjamin').val() === "" || $('#inp-kabupaten-alamat-penjamin').val() === "null") {
          $('#inp-kabupaten-alamat-penjamin').val("");
         }
        }
        $('#inp-kabupaten-alamat-penjamin-id2').val(result['dtl_guarantor'][0].gua_kabkot_new);
        if ($('#inp-kabupaten-alamat-penjamin-id2').val() === "" || $('#inp-kabupaten-alamat-penjamin-id2').val() === "null") {
         $('#inp-kabupaten-alamat-penjamin-id2').val("");
        }
        $('#inp-kabupaten-alamat-penjamin2').val(result['dtl_guarantor'][0].gua_kabkot_new_name);
        if ($('#inp-kabupaten-alamat-penjamin2').val() === "" || $('#inp-kabupaten-alamat-penjamin2').val() === "null") {
         $('#inp-kabupaten-alamat-penjamin2').val("");
        }
        $('#slc-alasan-kabupaten-penjamin').val(result['dtl_guarantor'][0].r_gua_kabkot);

        $('#inp-provinsi-penjamin-id').val(result['dtl_guarantor'][0].gua_prov_old);
        if ($('#inp-provinsi-penjamin-id').val() === "" || $('#inp-alamat-penjamin-id').val() === "null") {
         $('#inp-provinsi-penjamin-id').val(result['dtl_guarantor'][0].gua_prov);
         if ($('#inp-provinsi-alamat-penjamin-id').val() === "" || $('#inp-provinsi-alamat-penjamin-id').val() === "null") {
          $('#inp-provinsi-alamat-penjamin-id').val("");
         }
        }
        $('#inp-provinsi-alamat-penjamin').val(result['dtl_guarantor'][0].gua_prov_old_name);
        if ($('#inp-provinsi-alamat-penjamin').val() === "" || $('#inp-provinsi-alamat-penjamin').val() === "null") {
         $('#inp-provinsi-alamat-penjamin').val(result['dtl_guarantor'][0].gua_prov_name);
         if ($('#inp-provinsi-alamat-penjamin').val() === "" || $('#inp-provinsi-alamat-penjamin').val() === "null") {
          $('#inp-provinsi-alamat-penjamin').val("");
         }
        }
        $('#inp-provinsi-penjamin-id2').val(result['dtl_guarantor'][0].gua_prov_new);
        if ($('#inp-provinsi-penjamin-id2').val() === "" || $('#inp-provinsi-penjamin-id2').val() === "null") {
         $('#inp-provinsi-penjamin-id2').val("");
        }
        $('#slc-provinsi-alamat-penjamin2').val(result['dtl_guarantor'][0].gua_prov_new_name);
        if ($('#slc-provinsi-alamat-penjamin2').val() === "" || $('#slc-provinsi-alamat-penjamin2').val() === "null") {
         $('#slc-provinsi-alamat-penjamin2').val("");
        }
        $('#slc-alasan-provinsi-penjamin').val(result['dtl_guarantor'][0].r_gua_prov);

        $('#inp-telepon-penjamin').val(result['dtl_guarantor'][0].gua_notelp_old);
        if ($('#inp-telepon-penjamin').val() === "" || $('#inp-telepon-penjamin').val() === "null") {
         $('#inp-telepon-penjamin').val(result['dtl_guarantor'][0].gua_notelp);
        }
        $('#inp-telepon-penjamin2').val(result['dtl_guarantor'][0].gua_notelpnew);
        $('#slc-alasan-no-tlp-penjamin').val(result['dtl_guarantor'][0].r_gua_notelp);

        $('#inp-hanphone-penjamin').val(result['dtl_guarantor'][0].gua_nohp_old);
        if ($('#inp-hanphone-penjamin').val() === "" || $('#inp-hanphone-penjamin').val() === "null") {
         $('#inp-hanphone-penjamin').val(result['dtl_guarantor'][0].gua_nohp);
        }
        $('#inp-hanphone-penjamin2').val(result['dtl_guarantor'][0].gua_nohpnew);
        $('#slc-alasan-no-hp-penjamin').val(result['dtl_guarantor'][0].r_gua_nohp);

        $('#inp-email-penjamin').val(result['dtl_guarantor'][0].gua_email_old);
        if ($('#inp-email-penjamin').val() === "" || $('#inp-email-penjamin').val() === "null") {
         $('#inp-email-penjamin').val(result['dtl_guarantor'][0].gua_email);
        }
        $('#inp-email-penjamin2').val(result['dtl_guarantor'][0].gua_email_new);
        $('#slc-alasan-email-penjamin').val(result['dtl_guarantor'][0].r_gua_email);

        $('#status-hubungan-penjamin').val(result['dtl_guarantor'][0].gua_relati_old);
        if ($('#status-hubungan-penjamin').val() === "" || $('#status-hubungan-penjamin').val() === "null") {
         $('#status-hubungan-penjamin').val(result['dtl_guarantor'][0].gua_relati);
        }
        $('#status-hubungan-penjamin2').val(result['dtl_guarantor'][0].gua_relati_new);
        $('#slc-alasan-stat-hub-penjamin').val(result['dtl_guarantor'][0].r_gua_relati);
       }
       if (result['dtl_application'].length !== 0) {
        $('#inp-no-aplikasi').val(result['dtl_application'].application_no);
        $('#inp-no-customer').val(result['dtl_application'].customer_no);
        $('#inp-entry-date').val(result['dtl_application'].application_date);
        $('#inp-order-date').val(result['dtl_application'].date_confirm);
        $('#slc-branch-cc').val(result['dtl_application'].branch_id);
        $('#inp-dealer-cc').val(result['dtl_application'].supplier_name);
       }
      } else if (result['alert'] !== null) {
       alert_error('Error Detail Permohonan: ' + result['alert']);
      }
     } catch (e) {
      console.log(e);
     }
    }
   },
   error: function(response) {
    console.log(response);
    if (response['responseText'] === "" && response['statusText'] === 'OK') {
     alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
     });
    } else if (response['statusText'] === 'Internal Server Error') {
     alert_error('Gagal Terhubung ke Server: ' + response['responseText']);
    }
   }
  });
 }
}

//========================================================= TOMBOL UPDATE ==========================================//
$('#konfirmasi-permohonan-cc').click(function() {
 if (check_session() === 'false') {
  alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
   localStorage.clear();
   window.location.href = base_url + "Controller_login/login_view";
  });
 } else {

  flag_role_cuscor = true;
  for (var i = 0; i < role_cuscor.length; i++) {
   if (role_cuscor[i]['role_code'] === 'CONF_CUS_CORR') {
    flag_role_cuscor = false;
    break;
   }
  }

  if (flag_role_cuscor) {
   alert_error("Tombol Confirm Hanya Bisa Diakses Oleh ADH/BM");
  } else {
   var no_permohonan = $('#inp-no-permohonan-cc').val();
   alert_confirm("Apakah anda yakin akan melakukan konfirmasi terhadap nomor permohonan " + no_permohonan + " ?", function() {
    if ($('#inp-cust-type-cc').val() == "PER") {
     update_confirm();
    } else {
     update_confirm_com();
    }
   });
  }
 }

});

function update_confirm() {
 var arrayData = [];

 v_branch = $('#slc-branch-cc').val();
 v_contract_no = $('#input-no-contract').val();
 v_ref_no = $('#inp-ref-no').val();
 v_no_permohonan = $('#inp-no-permohonan-cc').val();
 v_cust_type = $('#inp-cust-type-cc').val();
 v_flag_occp = $('#inp-tipe-occp-flag').val();
 //////company
 v_subzip = $('#inp-subkode-pos-alamat-perusahaan2').val();
 v_notlp = $('#inp-telp-alamat-perusahaan2').val();
 v_nofax = $('#inp-fax-alamat-perusahaan2').val();
 v_email = $('#inp-email-perusahaan2').val().toUpperCase();
 v_no_akte = $('#inp-no-akte-perusahaan2').val().toUpperCase();
 v_tgl_pendirian = $('#inp-tgl-pendirian-perusahaan2').val().toUpperCase();
 v_tgl_resino = $('#inp-no-resi-perusahaan2').val().toUpperCase();
 v_tgl_residate = $('#inp-tgl-resi-perusahaan2').val().toUpperCase();
 v_no_siup = $('#inp-no-siup-perusahaan2').val().toUpperCase();
 v_tgl_siup = $('#inp-tgl-siup-perusahaan2').val().toUpperCase();
 v_no_tdp = $('#inp-no-tdp-perusahaan2').val().toUpperCase();
 v_tgl_tdp = $('#inp-tgl-tdp-perusahaan2').val().toUpperCase();
 v_sektor_ekonomi = $('#inp-sektor-ekonomi-id-perusahaan2').val();
 v_lapangan_usaha = $('#inp-lapangan-usaha-id-perusahaan2').val();
 v_total_pegawai = $('#inp-total-pegawai2').val();
 v_public_perusahaan = $('#slc-public-perusahaan2 :selected').val().toUpperCase();
 v_status_lokasi = $('#slc-status-lokasi2 :selected').val();
 v_modal_dasar = $('#inp-modal-dasar-perusahaan2').val();
 v_paid_up = $('#slc-paid-up-perusahaan2').val();
 v_akta_date = $('#inp-tgl-akta-perusahaan2').val().toUpperCase();
 //////guarantor
 v_tipe_id_penjamin = $('#slc-jenis-identitas-penjamin2 :selected').val();
 v_no_id_penjamin = $('#inp-no-identitas-penjamin2').val();
 v_id_date_penjamin = $('#inp-issued-date-penjamin2').val().toUpperCase();
 v_exp_date_penjamin = $('#inp-expired-date-penjamin2').val().toUpperCase();
 v_fnama_penjamin = $('#inp-fname-penjamin2').val().toUpperCase();
 v_lnama_penjamin = $('#inp-lname-penjamin2').val().toUpperCase();
 v_alias_penjamin = $('#inp-alias-penjamin2').val().toUpperCase();
 v_gelar_penjamin = $('#inp-gelar-penjamin2').val();
 v_tempat_lahir_penjamin = $('#inp-tempat-lahir-penjamin2').val().toUpperCase();
 v_tgl_lahir_penjamin = $('#inp-tanggal-lahir-penjamin2').val().toUpperCase();
 v_jenis_kelamin_penjamin = $('#slc-jenis-kelamin-penjamin2').val().toUpperCase();
 v_agama_penjamin = $('#slc-agama-penjamin2').val();
 v_pekerjaan_penjamin = $('#slc-pekerjaan-penjamin2').val();
 v_pernikahan_penjamin = $('#slc-status-pernikahan-penjamin2').val();
 v_rtrw_penjamin = $('#inp-rtrw-penjamin2').val();
 v_rw_penjamin = $('#inp-rw-penjamin2').val();
 v_zipcode_penjamin = $('#inp-kode-pos-alamat-penjamin2').val();
 v_alamat_penjamin = $('#inp-alamat-penjamin2').val().toUpperCase();
 v_kelurahan_penjamin = $('#inp-kelurahan-alamat-penjamin-id2').val();
 v_kecamatan_penjamin = $('#inp-kecamatan-alamat-penjamin-id2').val();
 v_kabupaten_kota_penjamin = $('#inp-kabupaten-alamat-penjamin-id2').val();
 v_provinsi_penjamin = $('#inp-provinsi-penjamin-id2').val();
 v_email_penjamin = $('#inp-email-penjamin2').val().toUpperCase();
 v_nohp_penjamin = $('#inp-hanphone-penjamin2').val();
 v_notlp_penjamin = $('#inp-telepon-penjamin2').val();
 v_hubungan_penjamin = $('#status-hubungan-penjamin2').val();
 //////holder per
 v_tgl_id_holderper = $('#inp-tgl-id-holder-pri2').val().toUpperCase();
 v_alias_holderper = $('#inp-alias-holder-pri2').val().toUpperCase();
 v_gelar_holderper = $('#inp-gelar-holder-pri2').val().toUpperCase();
 v_jenis_kelamin_holderper = $('#slc-jenis-kelamin-holder-pri2').val();
 v_agama_holderper = $('#slc-agama-holder-pri2').val();
 v_pernikahan_holderper = $('#slc-status-pernikahan-holder-pri2').val();
 v_rtrw_holderper = $('#inp-rtrw-holder-pri2').val();
 v_rw_holderper = $('#inp-rw-holder-pri2').val();
 v_zipcode_holderper = $('#inp-kodepos-holder-pri2').val();
 v_alamat_holderper = $('#inp-alamat-holder-pri2').val().toUpperCase();
 v_kelurahan_holderper = $('#inp-kelurahan-alamat-holder-pri2').val();
 v_kecamatan_holderper = $('#inp-kecamatan-alamat-holder-pri2').val();
 v_kabupaten_kota_holderper = $('#inp-kabupaten-alamat-holder-pri2').val();
 v_provinsi_holderper = $('#inp-provinsi-alamat-holder-pri2').val();
 v_kelurahan_holderper_id = $('#inp-kelurahan-alamat-holder-pri-id2').val();
 v_kecamatan_holderper_id = $('#inp-kecamatan-alamat-holder-pri-id2').val();
 v_kabupaten_kota_holderper_id = $('#inp-kabupaten-alamat-holder-pri-id2').val();
 v_provinsi_holderper_id = $('#inp-provinsi-holder-pri-id2').val();
 v_npwp_holderper = $('#inp-npwp-holder-pri2').val();
 v_notelp_holderper = $('#inp-telepon-holder-pri2').val();
 v_nohp_holderper = $('#inp-hanphone-holder-pri2').val();
 v_nofax_holderper = $('#inp-fax-holder-pri2').val();
 v_email_holderper = $('#inp-email-holder-pri2').val().toUpperCase();
 v_share_holderper = $('#inp-share-holder-pri2').val();
 v_jabatan_holderper = $('#inp-jabatan-holder-pri2').val();
 ///////holder ent
 v_comtype_holderent = $('#id-comtype-holder-ent2').val();
 v_comname_holderent = $('#inp-comname-holder-ent2').val().toUpperCase();
 v_bentuk_holderent = $('#inp-bentuk-holder-ent2').val();
 v_rtrw_holderent = $('#inp-rtrw-holder-ent2').val();
 v_rw_holderent = $('#inp-rw-holder-ent2').val();
 v_zipcode_holderent = $('#inp-kodepos-holder-ent2').val();
 v_alamat_holderent = $('#inp-alamat-holder-ent2').val().toUpperCase();
 v_kelurahan_holderent = $('#inp-kelurahan-holder-ent2').val();
 v_kecamatan_holderent = $('#inp-kecamatan-holder-ent2').val();
 v_kabupaten_kota_holderent = $('#inp-kabupaten-holder-ent2').val();
 v_provinsi_holderent = $('#inp-provinsi-holder-ent2').val();
 v_kelurahan_holderent_id = $('#inp-kelurahan-holder-ent-id2').val();
 v_kecamatan_holderent_id = $('#inp-kecamatan-holder-ent-id2').val();
 v_kabupaten_kota_holderent_id = $('#inp-kabupaten-holder-ent-id2').val();
 v_provinsi_holderent_id = $('#inp-provinsi-holder-ent-id2').val();
 v_subzip_holderent = $('#inp-subkode-holder-ent2').val();
 v_esthno_holderent = $('#inp-estno-holder-ent2').val().toUpperCase();
 v_esthdate_holderent = $('#inp-estdate-holder-ent2').val().toUpperCase();
 v_npwp_holderent = $('#inp-npwp-holder-ent2').val();
 v_notelp_holderent = $('#inp-telepon-holder-ent2').val();
 v_nohp_holderent = $('#inp-hanphone-holder-ent2').val();
 v_nofax_holderent = $('#inp-fax-holder-ent2').val();
 v_email_holderent = $('#inp-email-holder-ent2').val().toUpperCase();
 v_share_holderent = $('#inp-share-holder-ent2').val();
 ///////pic
 v_tgl_id_pic = $('#inp-tgl-id-pic2').val().toUpperCase();
 v_exp_id_date_pic = $('#inp-exp-id-date-pic2').val().toUpperCase();
 v_nama_awal_pic = $('#inp-nama-awal-pic2').val().toUpperCase();
 v_nama_akhir_pic = $('#inp-nama-akhir-pic2').val().toUpperCase();
 v_alias_pic = $('#inp-alias-pic2').val().toUpperCase();
 v_gelar_pic = $('#inp-gelar-pic2').val();
 v_jenis_kelamin_pic = $('#slc-jenis-kelamin-pic2').val();
 v_agama_pic = $('#slc-agama-pic2').val();
 v_pernikahan_pic = $('#slc-status-pernikahan-pic2').val();
 v_rtrw_pic = $('#inp-rtrw-pic2').val();
 v_rw_pic = $('#inp-rw-pic2').val();
 v_zipcode_pic = $('#inp-kode-pos-alamat-pic2').val();
 v_alamat_pic = $('#inp-alamat-pic2').val().toUpperCase();
 v_kelurahan_pic = $('#inp-kelurahan-alamat-pic2').val();
 v_kecamatan_pic = $('#inp-kecamatan-alamat-pic2').val();
 v_kabupaten_kota_pic = $('#inp-kabupaten-alamat-pic2').val();
 v_provinsi_pic = $('#inp-provinsi-alamat-pic2').val();
 v_kelurahan_pic_id = $('#inp-kelurahan-alamat-pic-id2').val();
 v_kecamatan_pic_id = $('#inp-kecamatan-alamat-pic-id2').val();
 v_kabupaten_kota_pic_id = $('#inp-kabupaten-alamat-pic-id2').val();
 v_provinsi_pic_id = $('#inp-provinsi-pic-id2').val();
 v_npwp_pic = $('#inp-npwp-pic2').val();
 v_notelp_pic = $('#inp-telepon-pic2').val();
 v_nohp_pic = $('#inp-hanphone-pic2').val();
 v_nofax_pic = $('#inp-fax-pic2').val();
 v_email_pic = $('#inp-email-pic2').val().toUpperCase();
 v_share_pic = $('#inp-share-pic2').val();
 v_jabatan_pic = $('#inp-jabatan-pic2').val();
 ///personal
 v_idtype_per = $('#id-type-per2').val();
 v_alias_per = $('#inp-alias-per2').val().toUpperCase();
 v_agama_per = $('#slc-agama-per2').val();
 ///spouse
 v_iddate_sps = $('#inp-tgl-id-spouse2').val().toUpperCase();
 v_idexpdate_sps = $('#inp-exp-id-date-spouse2').val().toUpperCase();
 v_alias_sps = $('#inp-alias-spouse2').val().toUpperCase();
 v_gelar_sps = $('#inp-gelar-spouse2').val();
 v_notlp_sps = $('#inp-no-telp-spouse2').val();
 v_nohp_sps = $('#inp-no-hp-spouse2').val();
 v_agama_sps = $('#slc-agama-spouse2').val();
 v_alamat_sps = $('#inp-alamat-spouse2').val().toUpperCase();
 v_rtrw_sps = $('#inp-rtrw-spouse2').val();
 v_rw_sps = $('#inp-rw-spouse2').val();
 v_kodepos_sps = $('#inp-kode-pos-alamat-spouse2').val();
 v_kelurahan_sps = $('#inp-kelurahan-alamat-spouse-id2').val();
 v_kecamatan_sps = $('#inp-kecamatan-alamat-spouse-id2').val();
 v_kabupaten_sps = $('#inp-kabupaten-alamat-spouse-id2').val();
 v_provinsi_sps = $('#inp-provinsi-spouse-id2').val();
 //v_is_emergency = $('#inp-is-emergency-spouse').val();
 //v_relation_sps = $('#inp-is-relation-spouse').val();
 ////familycard
 // v_nokk_kk = $('#inp-no-kk2').val();

  //if ( $('#inp-is-emergency-spouse').val() === "1" && $('#inp-is-relation-spouse').val() === "04") {
    v_nokk_kk = $('#inp-no-kk2').val();
  //  v_fml_card = "";   
 //}else{
  //  v_nokk_kk = "";
    v_fml_card =  $('#inp-no-kk2').val();
 //}

 if ($('#inp-jml-tanggung-kk2').val() === "" || $('#inp-jml-tanggung-kk2').val() === null || $('#inp-jml-tanggung-kk2').val() === "0" || $('#inp-jml-tanggung-kk2').val() === 0) {
    v_tanggungan_kk = $('#inp-jml-tanggung-kk').val();   
 }else{
    v_tanggungan_kk = $('#inp-jml-tanggung-kk2').val();
 }
 //v_tanggungan_kk = $('#inp-jml-tanggung-kk2').val();
 v_pendidikan_kk = $('#inp-education-kk2').val();
 v_nation_kk = $('#inp-nationality-kk2').val();
 v_sps_pendidikan_kk = $('#inp-education-spouse-kk2').val();
 ///current
 v_notlp_curr = $('#inp-telepon-resident2').val();
 v_nohp_curr = $('#inp-hanphone-resident2').val();
 v_nofax_curr = $('#inp-fax-resident2').val();
 v_email_curr = $('#inp-email-resident2').val().toUpperCase();
 ///occp
 v_comtype_occp = $('#slc-jenis-perusahaan-occp2').val();
 v_comfclt_occp = $('#slc-fasilitas-perusahaan-occp2').val();
 v_otherbuss_occp = $('#inp-bisnis-lain-occp2').val().toUpperCase();
 v_head_occp = $('#inp-atasan-langsung-occp2').val().toUpperCase();
 v_alamat_occp = $('#inp-alamat-occp2').val().toUpperCase();
 v_rtrw_occp = $('#inp-rtrw-alamat-occp2').val();
 v_rw_occp = $('#inp-rw-alamat-occp2').val();
 v_kodepos_occp = $('#inp-kode-pos-occp2').val();
 v_kelurahan_occp = $('#inp-kelurahan-id-occp2').val();
 v_kecamatan_occp = $('#inp-kecamatan-id-occp2').val();
 v_kabupaten_occp = $('#inp-kabupaten-id-occp2').val();
 v_provinsi_occp = $('#inp-provinsi-id-occp2').val();
 v_notlp_occp = $('#inp-telepon-occp2').val();
 v_nofax_occp = $('#inp-fax-occp2').val();
 v_email_occp = $('#inp-email-occp2').val().toUpperCase();
 ///other
 v_npwp_other = $('#inp-npwp-other2').val();
 v_resino_other = $('#inp-no-resi-other2').val();
 v_residate_other = $('#inp-tgl-resi-other2').val();
 v_alias_other = $('#inp-alias-other2').val().toUpperCase();
 v_gelar_other = $('#inp-gelar-other2').val();
 v_alamat_other = $('#inp-alamat-other2').val().toUpperCase();
 v_rtrw_other = $('#inp-rtrw-other2').val();
 v_rw_other = $('#inp-rw-other2').val();
 v_kodepos_other = $('#inp-kode-pos-other2').val();
 v_kelurahan_other = $('#inp-kelurahan-alamat-other-id2').val();
 v_kecamatan_other = $('#inp-kecamatan-alamat-other-id2').val();
 v_kabupaten_other = $('#inp-kabupaten-alamat-other-id2').val();
 v_provinsi_other = $('#inp-provinsi-other-id2').val();
 v_relationship_other = $('#slc-status-hubungan-other2').val();

 arrayData.push({
  v_branch,
  v_contract_no,
  v_ref_no,
  v_no_permohonan,
  v_cust_type,
  v_flag_occp,
  //v_is_emergency,
  v_fml_card,
  //v_relation_sps,
  //perusahaan
  v_subzip,
  v_notlp,
  v_nofax,
  v_email,
  v_no_akte,
  v_tgl_pendirian,
  v_tgl_resino,
  v_tgl_residate,
  v_no_siup,
  v_tgl_siup,
  v_no_tdp,
  v_tgl_tdp,
  v_sektor_ekonomi,
  v_lapangan_usaha,
  v_total_pegawai,
  v_public_perusahaan,
  v_status_lokasi,
  v_modal_dasar,
  v_paid_up,
  v_akta_date,
  //guarantor
  v_tipe_id_penjamin,
  v_no_id_penjamin,
  v_id_date_penjamin,
  v_exp_date_penjamin,
  v_fnama_penjamin,
  v_lnama_penjamin,
  v_alias_penjamin,
  v_gelar_penjamin,
  v_tempat_lahir_penjamin,
  v_tgl_lahir_penjamin,
  v_jenis_kelamin_penjamin,
  v_agama_penjamin,
  v_pekerjaan_penjamin,
  v_pernikahan_penjamin,
  v_rtrw_penjamin,
  v_rw_penjamin,
  v_zipcode_penjamin,
  v_alamat_penjamin,
  v_kelurahan_penjamin,
  v_kecamatan_penjamin,
  v_kabupaten_kota_penjamin,
  v_provinsi_penjamin,
  v_email_penjamin,
  v_nohp_penjamin,
  v_notlp_penjamin,
  v_hubungan_penjamin,
  //holder per
  v_tgl_id_holderper,
  v_alias_holderper,
  v_gelar_holderper,
  v_jenis_kelamin_holderper,
  v_agama_holderper,
  v_pernikahan_holderper,
  v_rtrw_holderper,
  v_rw_holderper,
  v_zipcode_holderper,
  v_alamat_holderper,
  v_kelurahan_holderper,
  v_kecamatan_holderper,
  v_kabupaten_kota_holderper,
  v_provinsi_holderper,
  v_kelurahan_holderper_id,
  v_kecamatan_holderper_id,
  v_kabupaten_kota_holderper_id,
  v_provinsi_holderper_id,
  v_npwp_holderper,
  v_notelp_holderper,
  v_nohp_holderper,
  v_nofax_holderper,
  v_email_holderper,
  v_share_holderper,
  v_jabatan_holderper,
  //holder ent
  v_comtype_holderent,
  v_comname_holderent,
  v_bentuk_holderent,
  v_rtrw_holderent,
  v_rw_holderent,
  v_zipcode_holderent,
  v_alamat_holderent,
  v_kelurahan_holderent,
  v_kecamatan_holderent,
  v_kabupaten_kota_holderent,
  v_provinsi_holderent,
  v_kelurahan_holderent_id,
  v_kecamatan_holderent_id,
  v_kabupaten_kota_holderent_id,
  v_provinsi_holderent_id,
  v_subzip_holderent,
  v_esthno_holderent,
  v_esthdate_holderent,
  v_npwp_holderent,
  v_notelp_holderent,
  v_nohp_holderent,
  v_nofax_holderent,
  v_email_holderent,
  v_share_holderent,
  //pic
  v_tgl_id_pic,
  v_exp_id_date_pic,
  v_nama_awal_pic,
  v_nama_akhir_pic,
  v_alias_pic,
  v_gelar_pic,
  v_jenis_kelamin_pic,
  v_agama_pic,
  v_pernikahan_pic,
  v_rtrw_pic,
  v_rw_pic,
  v_zipcode_pic,
  v_alamat_pic,
  v_kelurahan_pic,
  v_kecamatan_pic,
  v_kabupaten_kota_pic,
  v_provinsi_pic,
  v_kelurahan_pic_id,
  v_kecamatan_pic_id,
  v_kabupaten_kota_pic_id,
  v_provinsi_pic_id,
  v_npwp_pic,
  v_notelp_pic,
  v_nohp_pic,
  v_nofax_pic,
  v_email_pic,
  v_share_pic,
  v_jabatan_pic,
  ///personal
  v_idtype_per,
  v_alias_per,
  v_agama_per,
  ///spouse
  v_iddate_sps,
  v_idexpdate_sps,
  v_alias_sps,
  v_gelar_sps,
  v_notlp_sps,
  v_nohp_sps,
  v_agama_sps,
  v_alamat_sps,
  v_rtrw_sps,
  v_rw_sps,
  v_kodepos_sps,
  v_kelurahan_sps,
  v_kecamatan_sps,
  v_kabupaten_sps,
  v_provinsi_sps,
  ////familycard
  v_nokk_kk,
  v_tanggungan_kk,
  v_pendidikan_kk,
  v_nation_kk,
  v_sps_pendidikan_kk,
  ///current
  v_notlp_curr,
  v_nohp_curr,
  v_nofax_curr,
  v_email_curr,
  ///occp
  v_comtype_occp,
  v_comfclt_occp,
  v_otherbuss_occp,
  v_head_occp,
  v_alamat_occp,
  v_rtrw_occp,
  v_rw_occp,
  v_kodepos_occp,
  v_kelurahan_occp,
  v_kecamatan_occp,
  v_kabupaten_occp,
  v_provinsi_occp,
  v_notlp_occp,
  v_nofax_occp,
  v_email_occp,
  ///other
  v_npwp_other,
  v_resino_other,
  v_residate_other,
  v_alias_other,
  v_gelar_other,
  v_alamat_other,
  v_rtrw_other,
  v_rw_other,
  v_kodepos_other,
  v_kelurahan_other,
  v_kecamatan_other,
  v_kabupaten_other,
  v_provinsi_other,
  v_relationship_other
 });
 var no_permohonan = $('#inp-no-permohonan-cc').val();
 $.ajax({
  url: "Controller_customer_correction/update_confirm",
  type: 'POST',
  dataType: 'json',
  data: {
   arrayData
  },
  success: function(response) {
   console.log(response);
   if (response) {
    var data = $.parseJSON(response);
    try {
     if (data['Status'] == '200') {
        console.log('goyang cop law');
        $('#konfirmasi-permohonan-cc').prop('disabled', true);
        $('#batalkan-koreksi-cc').prop('disabled', true);
      alert_info("Nomor permohonan " + no_permohonan + " berhasil dikonfirmasi");
      return false;
     } else if (data['Status'] == '500') {
      alert_info(data['Error']);
      return false;
     } else {
      alert_error('Error Confirm Personal');
      return false;
     }
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }


  },
  error: function(response) {
   alert_info("Error Connection");
   console.log(response);
  }

 });
};

function update_confirm_com() {
 var arrayData = [];

 v_branch = $('#slc-branch-cc').val();
 v_contract_no = $('#input-no-contract').val();
 v_ref_no = $('#inp-ref-no').val();
 v_no_permohonan = $('#inp-no-permohonan-cc').val();
 v_cust_type = $('#inp-cust-type-cc').val();
 //////company
 v_subzip = $('#inp-subkode-pos-alamat-perusahaan2').val();
 v_notlp = $('#inp-telp-alamat-perusahaan2').val();
 v_nofax = $('#inp-fax-alamat-perusahaan2').val();
 v_email = $('#inp-email-perusahaan2').val().toUpperCase();
 v_no_akte = $('#inp-no-akte-perusahaan2').val().toUpperCase();
 v_tgl_pendirian = $('#inp-tgl-pendirian-perusahaan2').val().toUpperCase();
 v_tgl_resino = $('#inp-no-resi-perusahaan2').val().toUpperCase();
 v_tgl_residate = $('#inp-tgl-resi-perusahaan2').val().toUpperCase();
 v_no_siup = $('#inp-no-siup-perusahaan2').val().toUpperCase();
 v_tgl_siup = $('#inp-tgl-siup-perusahaan2').val().toUpperCase();
 v_no_tdp = $('#inp-no-tdp-perusahaan2').val().toUpperCase();
 v_tgl_tdp = $('#inp-tgl-tdp-perusahaan2').val().toUpperCase();
 v_sektor_ekonomi = $('#inp-sektor-ekonomi-id-perusahaan2').val();
 v_lapangan_usaha = $('#inp-lapangan-usaha-id-perusahaan2').val();
 v_total_pegawai = $('#inp-total-pegawai2').val();
 v_public_perusahaan = $('#slc-public-perusahaan2 :selected').val();
 v_status_lokasi = $('#slc-status-lokasi2 :selected').val();
 v_modal_dasar = $('#inp-modal-dasar-perusahaan2').val();
 v_paid_up = $('#slc-paid-up-perusahaan2').val();
 v_akta_date = $('#inp-tgl-akta-perusahaan2').val().toUpperCase();
 //////guarantorr
 v_tipe_id_penjaminn = $('#slc-jenis-identitas-penjaminn2 :selected').val();
 v_no_id_penjaminn = $('#inp-no-identitas-penjaminn2').val();
 v_id_date_penjaminn = $('#inp-issued-date-penjaminn2').val().toUpperCase();
 v_exp_date_penjaminn = $('#inp-expired-date-penjaminn2').val().toUpperCase();
 v_fnama_penjaminn = $('#inp-fname-penjaminn2').val().toUpperCase();
 v_lnama_penjaminn = $('#inp-lname-penjaminn2').val().toUpperCase();
 v_alias_penjaminn = $('#inp-alias-penjaminn2').val().toUpperCase();
 v_gelar_penjaminn = $('#inp-gelar-penjaminn2').val().toUpperCase();
 v_tempat_lahir_penjaminn = $('#inp-tempat-lahir-penjaminn2').val().toUpperCase();
 v_tgl_lahir_penjaminn = $('#inp-tanggal-lahir-penjaminn2').val().toUpperCase();
 v_jenis_kelamin_penjaminn = $('#slc-jenis-kelamin-penjaminn2').val();
 v_agama_penjaminn = $('#slc-agama-penjaminn2').val();
 v_pekerjaan_penjaminn = $('#slc-pekerjaan-penjaminn2').val().toUpperCase();
 v_pernikahan_penjaminn = $('#slc-status-pernikahan-penjaminn2').val();
 v_rtrw_penjaminn = $('#inp-rtrw-penjaminn2').val();
 v_rw_penjaminn = $('#inp-rw-penjaminn2').val();
 v_zipcode_penjaminn = $('#inp-kode-pos-alamat-penjaminn2').val();
 v_alamat_penjaminn = $('#inp-alamat-penjaminn2').val().toUpperCase();
 v_kelurahan_penjaminn = $('#inp-kelurahan-alamat-penjaminn-id2').val();
 v_kecamatan_penjaminn = $('#inp-kecamatan-alamat-penjaminn-id2').val();
 v_kabupaten_kota_penjaminn = $('#inp-kabupaten-alamat-penjaminn-id2').val();
 v_provinsi_penjaminn = $('#inp-provinsi-penjaminn-id2').val();
 v_email_penjaminn = $('#inp-email-penjaminn2').val().toUpperCase();
 v_nohp_penjaminn = $('#inp-hanphone-penjaminn2').val();
 v_notlp_penjaminn = $('#inp-telepon-penjaminn2').val();
 v_hubungan_penjaminn = $('#status-hubungan-penjaminn2').val();
 //////holder per
 v_tgl_id_holderper = $('#inp-tgl-id-holder-pri2').val().toUpperCase();
 v_alias_holderper = $('#inp-alias-holder-pri2').val().toUpperCase();
 v_gelar_holderper = $('#inp-gelar-holder-pri2').val();
 v_jenis_kelamin_holderper = $('#slc-jenis-kelamin-holder-pri2').val();
 v_agama_holderper = $('#slc-agama-holder-pri2').val();
 v_pernikahan_holderper = $('#slc-status-pernikahan-holder-pri2').val();
 v_rtrw_holderper = $('#inp-rtrw-holder-pri2').val();
 v_rw_holderper = $('#inp-rw-holder-pri2').val();
 v_zipcode_holderper = $('#inp-kodepos-holder-pri2').val();
 v_alamat_holderper = $('#inp-alamat-holder-pri2').val().toUpperCase();
 v_kelurahan_holderper = $('#inp-kelurahan-alamat-holder-pri2').val();
 v_kecamatan_holderper = $('#inp-kecamatan-alamat-holder-pri2').val();
 v_kabupaten_kota_holderper = $('#inp-kabupaten-alamat-holder-pri2').val();
 v_provinsi_holderper = $('#inp-provinsi-alamat-holder-pri2').val();
 v_kelurahan_holderper_id = $('#inp-kelurahan-alamat-holder-pri-id2').val();
 v_kecamatan_holderper_id = $('#inp-kecamatan-alamat-holder-pri-id2').val();
 v_kabupaten_kota_holderper_id = $('#inp-kabupaten-alamat-holder-pri-id2').val();
 v_provinsi_holderper_id = $('#inp-provinsi-holder-pri-id2').val();
 v_npwp_holderper = $('#inp-npwp-holder-pri2').val();
 v_notelp_holderper = $('#inp-telepon-holder-pri2').val();
 v_nohp_holderper = $('#inp-hanphone-holder-pri2').val();
 v_nofax_holderper = $('#inp-fax-holder-pri2').val();
 v_email_holderper = $('#inp-email-holder-pri2').val().toUpperCase();
 if ($('#inp-share-holder-pri2').val() === "" || $('#inp-share-holder-pri2').val() === null || $('#inp-share-holder-pri2').val() === "0" || $('#inp-share-holder-pri2').val() === 0) {
    v_share_holderper = $('#inp-share-holder-pri').val();   
 }else{
    v_share_holderper = $('#inp-share-holder-pri2').val();
 }
 
 v_jabatan_holderper = $('#inp-jabatan-holder-pri2').val();
 ///////holder ent
 v_comtype_holderent = $('#id-comtype-holder-ent2').val();
 v_comname_holderent = $('#inp-comname-holder-ent2').val().toUpperCase();
 v_bentuk_holderent = $('#inp-bentuk-holder-ent2').val();
 v_rtrw_holderent = $('#inp-rtrw-holder-ent2').val();
 v_rw_holderent = $('#inp-rw-holder-ent2').val();
 v_zipcode_holderent = $('#inp-kodepos-holder-ent2').val();
 v_alamat_holderent = $('#inp-alamat-holder-ent2').val();
 v_kelurahan_holderent = $('#inp-kelurahan-holder-ent2').val();
 v_kecamatan_holderent = $('#inp-kecamatan-holder-ent2').val();
 v_kabupaten_kota_holderent = $('#inp-kabupaten-holder-ent2').val();
 v_provinsi_holderent = $('#inp-provinsi-holder-ent2').val();
 v_kelurahan_holderent_id = $('#inp-kelurahan-holder-ent-id2').val();
 v_kecamatan_holderent_id = $('#inp-kecamatan-holder-ent-id2').val();
 v_kabupaten_kota_holderent_id = $('#inp-kabupaten-holder-ent-id2').val();
 v_provinsi_holderent_id = $('#inp-provinsi-holder-ent-id2').val();
 v_subzip_holderent = $('#inp-subkode-holder-ent2').val();
 v_esthno_holderent = $('#inp-estno-holder-ent2').val().toUpperCase();
 v_esthdate_holderent = $('#inp-estdate-holder-ent2').val().toUpperCase();
 v_npwp_holderent = $('#inp-npwp-holder-ent2').val();
 v_notelp_holderent = $('#inp-telepon-holder-ent2').val();
 v_nohp_holderent = $('#inp-hanphone-holder-ent2').val();
 v_nofax_holderent = $('#inp-fax-holder-ent2').val();
 v_email_holderent = $('#inp-email-holder-ent2').val().toUpperCase();
 // v_share_holderent = $('#inp-share-holder-ent2').val();
  if ($('#inp-share-holder-ent2').val() === "" || $('#inp-share-holder-ent2').val() === null || $('#inp-share-holder-ent2').val() === "0" || $('#inp-share-holder-ent2').val() === 0) {
    v_share_holderent = $('#inp-share-holder-ent').val();   
 }else{
    v_share_holderent = $('#inp-share-holder-ent2').val();
 }
 ///////pic
 v_tgl_id_pic = $('#inp-tgl-id-pic2').val().toUpperCase();
 v_exp_id_date_pic = $('#inp-exp-id-date-pic2').val().toUpperCase();
 v_nama_awal_pic = $('#inp-nama-awal-pic2').val().toUpperCase();
 v_nama_akhir_pic = $('#inp-nama-akhir-pic2').val().toUpperCase();
 v_alias_pic = $('#inp-alias-pic2').val().toUpperCase();
 v_gelar_pic = $('#inp-gelar-pic2').val();
 v_jenis_kelamin_pic = $('#slc-jenis-kelamin-pic2').val();
 v_agama_pic = $('#slc-agama-pic2').val();
 v_pernikahan_pic = $('#slc-status-pernikahan-pic2').val();
 v_rtrw_pic = $('#inp-rtrw-pic2').val();
 v_rw_pic = $('#inp-rw-pic2').val();
 v_zipcode_pic = $('#inp-kode-pos-alamat-pic2').val();
 v_alamat_pic = $('#inp-alamat-pic2').val().toUpperCase();
 v_kelurahan_pic = $('#inp-kelurahan-alamat-pic2').val();
 v_kecamatan_pic = $('#inp-kecamatan-alamat-pic2').val();
 v_kabupaten_kota_pic = $('#inp-kabupaten-alamat-pic2').val();
 v_provinsi_pic = $('#inp-provinsi-alamat-pic2').val();
 v_kelurahan_pic_id = $('#inp-kelurahan-alamat-pic-id2').val();
 v_kecamatan_pic_id = $('#inp-kecamatan-alamat-pic-id2').val();
 v_kabupaten_kota_pic_id = $('#inp-kabupaten-alamat-pic-id2').val();
 v_provinsi_pic_id = $('#inp-provinsi-pic-id2').val();
 v_npwp_pic = $('#inp-npwp-pic2').val();
 v_notelp_pic = $('#inp-telepon-pic2').val();
 v_nohp_pic = $('#inp-hanphone-pic2').val();
 v_nofax_pic = $('#inp-fax-pic2').val();
 v_email_pic = $('#inp-email-pic2').val().toUpperCase();
 v_share_pic = $('#inp-share-pic2').val();
 v_jabatan_pic = $('#inp-jabatan-pic2').val();
 ///personal
 v_idtype_per = $('#id-type-per2').val();
 v_alias_per = $('#inp-alias-per2').val().toUpperCase();
 v_agama_per = $('#slc-agama-per2').val();
 ///spouse
 v_iddate_sps = $('#inp-tgl-id-spouse2').val().toUpperCase();
 v_idexpdate_sps = $('#inp-exp-id-date-spouse2').val().toUpperCase();
 v_alias_sps = $('#inp-alias-spouse2').val().toUpperCase();
 v_gelar_sps = $('#inp-gelar-spouse2').val();
 v_notlp_sps = $('#inp-no-telp-spouse2').val();
 v_nohp_sps = $('#inp-no-hp-spouse2').val();
 v_agama_sps = $('#slc-agama-spouse2').val();
 v_alamat_sps = $('#inp-alamat-spouse2').val();
 v_rtrw_sps = $('#inp-rtrw-spouse2').val();
 v_rw_sps = $('#inp-rw-spouse2').val();
 v_kodepos_sps = $('#inp-kode-pos-alamat-spouse2').val();
 v_kelurahan_sps = $('#inp-kelurahan-alamat-spouse-id2').val();
 v_kecamatan_sps = $('#inp-kecamatan-alamat-spouse-id2').val();
 v_kabupaten_sps = $('#inp-kabupaten-alamat-spouse-id2').val();
 v_provinsi_sps = $('#inp-provinsi-spouse-id2').val();
 ////familycard
 v_nokk_kk = $('#inp-no-kk2').val();
 v_tanggungan_kk = $('#inp-jml-tanggung-kk2').val();
 v_pendidikan_kk = $('#inp-education-kk2').val();
 v_nation_kk = $('#inp-nationality-kk2').val();
 v_sps_pendidikan_kk = $('#inp-education-spouse-kk2').val();
 ///current
 v_notlp_curr = $('#inp-telepon-resident2').val();
 v_nohp_curr = $('#inp-hanphone-resident2').val();
 v_nofax_curr = $('#inp-fax-resident2').val();
 v_email_curr = $('#inp-email-resident2').val().toUpperCase();
 ///occp
 v_comtype_occp = $('#slc-jenis-perusahaan-occp2').val();
 v_comfclt_occp = $('#slc-fasilitas-perusahaan-occp2').val();
 v_otherbuss_occp = $('#inp-bisnis-lain-occp2').val().toUpperCase();
 v_head_occp = $('#inp-atasan-langsung-occp2').val();
 v_alamat_occp = $('#inp-alamat-occp2').val();
 v_rtrw_occp = $('#inp-rtrw-alamat-occp2').val();
 v_rw_occp = $('#inp-rw-alamat-occp2').val();
 v_kodepos_occp = $('#inp-kode-pos-occp2').val();
 v_kelurahan_occp = $('#inp-kelurahan-id-occp2').val();
 v_kecamatan_occp = $('#inp-kecamatan-id-occp2').val();
 v_kabupaten_occp = $('#inp-kabupaten-id-occp2').val();
 v_provinsi_occp = $('#inp-provinsi-id-occp2').val();
 v_notlp_occp = $('#inp-telepon-occp2').val();
 v_nofax_occp = $('#inp-fax-occp2').val();
 v_email_occp = $('#inp-email-occp2').val().toUpperCase();
 ///other
 v_npwp_other = $('#inp-npwp-other2').val();
 v_resino_other = $('#inp-no-resi-other2').val().toUpperCase();
 v_residate_other = $('#inp-tgl-resi-other2').val().toUpperCase();
 v_alias_other = $('#inp-alias-other2').val().toUpperCase();
 v_gelar_other = $('#inp-gelar-other2').val();
 v_alamat_other = $('#inp-alamat-other2').val().toUpperCase();
 v_rtrw_other = $('#inp-rtrw-other2').val();
 v_rw_other = $('#inp-rw-other2').val();
 v_kodepos_other = $('#inp-kode-pos-other2').val();
 v_kelurahan_other = $('#inp-kelurahan-alamat-other-id2').val();
 v_kecamatan_other = $('#inp-kecamatan-alamat-other-id2').val();
 v_kabupaten_other = $('#inp-kabupaten-alamat-other-id2').val();
 v_provinsi_other = $('#inp-provinsi-other-id2').val();
 v_relationship_other = $('#slc-status-hubungan-other2').val();

 arrayData.push({
  v_branch,
  v_contract_no,
  v_ref_no,
  v_no_permohonan,
  v_cust_type,
  //perusahaan
  v_subzip,
  v_notlp,
  v_nofax,
  v_email,
  v_no_akte,
  v_tgl_pendirian,
  v_tgl_resino,
  v_tgl_residate,
  v_no_siup,
  v_tgl_siup,
  v_no_tdp,
  v_tgl_tdp,
  v_sektor_ekonomi,
  v_lapangan_usaha,
  v_total_pegawai,
  v_public_perusahaan,
  v_status_lokasi,
  v_modal_dasar,
  v_paid_up,
  v_akta_date,
  //guarantorr
  v_tipe_id_penjaminn,
  v_no_id_penjaminn,
  v_id_date_penjaminn,
  v_exp_date_penjaminn,
  v_fnama_penjaminn,
  v_lnama_penjaminn,
  v_alias_penjaminn,
  v_gelar_penjaminn,
  v_tempat_lahir_penjaminn,
  v_tgl_lahir_penjaminn,
  v_jenis_kelamin_penjaminn,
  v_agama_penjaminn,
  v_pekerjaan_penjaminn,
  v_pernikahan_penjaminn,
  v_rtrw_penjaminn,
  v_rw_penjaminn,
  v_zipcode_penjaminn,
  v_alamat_penjaminn,
  v_kelurahan_penjaminn,
  v_kecamatan_penjaminn,
  v_kabupaten_kota_penjaminn,
  v_provinsi_penjaminn,
  v_email_penjaminn,
  v_nohp_penjaminn,
  v_notlp_penjaminn,
  v_hubungan_penjaminn,
  //holder per
  v_tgl_id_holderper,
  v_alias_holderper,
  v_gelar_holderper,
  v_jenis_kelamin_holderper,
  v_agama_holderper,
  v_pernikahan_holderper,
  v_rtrw_holderper,
  v_rw_holderper,
  v_zipcode_holderper,
  v_alamat_holderper,
  v_kelurahan_holderper,
  v_kecamatan_holderper,
  v_kabupaten_kota_holderper,
  v_provinsi_holderper,
  v_kelurahan_holderper_id,
  v_kecamatan_holderper_id,
  v_kabupaten_kota_holderper_id,
  v_provinsi_holderper_id,
  v_npwp_holderper,
  v_notelp_holderper,
  v_nohp_holderper,
  v_nofax_holderper,
  v_email_holderper,
  v_share_holderper,
  v_jabatan_holderper,
  //holder ent
  v_comtype_holderent,
  v_comname_holderent,
  v_bentuk_holderent,
  v_rtrw_holderent,
  v_rw_holderent,
  v_zipcode_holderent,
  v_alamat_holderent,
  v_kelurahan_holderent,
  v_kecamatan_holderent,
  v_kabupaten_kota_holderent,
  v_provinsi_holderent,
  v_kelurahan_holderent_id,
  v_kecamatan_holderent_id,
  v_kabupaten_kota_holderent_id,
  v_provinsi_holderent_id,
  v_subzip_holderent,
  v_esthno_holderent,
  v_esthdate_holderent,
  v_npwp_holderent,
  v_notelp_holderent,
  v_nohp_holderent,
  v_nofax_holderent,
  v_email_holderent,
  v_share_holderent,
  //pic
  v_tgl_id_pic,
  v_exp_id_date_pic,
  v_nama_awal_pic,
  v_nama_akhir_pic,
  v_alias_pic,
  v_gelar_pic,
  v_jenis_kelamin_pic,
  v_agama_pic,
  v_pernikahan_pic,
  v_rtrw_pic,
  v_rw_pic,
  v_zipcode_pic,
  v_alamat_pic,
  v_kelurahan_pic,
  v_kecamatan_pic,
  v_kabupaten_kota_pic,
  v_provinsi_pic,
  v_kelurahan_pic_id,
  v_kecamatan_pic_id,
  v_kabupaten_kota_pic_id,
  v_provinsi_pic_id,
  v_npwp_pic,
  v_notelp_pic,
  v_nohp_pic,
  v_nofax_pic,
  v_email_pic,
  v_share_pic,
  v_jabatan_pic,
  ///personal
  v_idtype_per,
  v_alias_per,
  v_agama_per,
  ///spouse
  v_iddate_sps,
  v_idexpdate_sps,
  v_alias_sps,
  v_gelar_sps,
  v_notlp_sps,
  v_nohp_sps,
  v_agama_sps,
  v_alamat_sps,
  v_rtrw_sps,
  v_rw_sps,
  v_kodepos_sps,
  v_kelurahan_sps,
  v_kecamatan_sps,
  v_kabupaten_sps,
  v_provinsi_sps,
  ////familycard
  v_nokk_kk,
  v_tanggungan_kk,
  v_pendidikan_kk,
  v_nation_kk,
  v_sps_pendidikan_kk,
  ///current
  v_notlp_curr,
  v_nohp_curr,
  v_nofax_curr,
  v_email_curr,
  ///occp
  v_comtype_occp,
  v_comfclt_occp,
  v_otherbuss_occp,
  v_head_occp,
  v_alamat_occp,
  v_rtrw_occp,
  v_rw_occp,
  v_kodepos_occp,
  v_kelurahan_occp,
  v_kecamatan_occp,
  v_kabupaten_occp,
  v_provinsi_occp,
  v_notlp_occp,
  v_nofax_occp,
  v_email_occp,
  ///other
  v_npwp_other,
  v_resino_other,
  v_residate_other,
  v_alias_other,
  v_gelar_other,
  v_alamat_other,
  v_rtrw_other,
  v_rw_other,
  v_kodepos_other,
  v_kelurahan_other,
  v_kecamatan_other,
  v_kabupaten_other,
  v_provinsi_other,
  v_relationship_other
 });
 var no_permohonan = $('#inp-no-permohonan-cc').val();
 $.ajax({
  url: "Controller_customer_correction/update_confirm_com",
  type: 'POST',
  dataType: 'json',
  data: {
   arrayData
  },
  success: function(response) {
   console.log(response);
   var data = $.parseJSON(response);
   if (response) {
    try {
     if (data['Status'] == '200') {
        $('#konfirmasi-permohonan-cc').prop('disabled', true);
        $('#batalkan-koreksi-cc').prop('disabled', true);
      alert_info("Nomor permohonan " + no_permohonan + " berhasil dikonfirmasi");
      return false;
     } else if (data['Status'] == '500') {
      alert_info(data['Error']);
      return false;
     } else {
      alert_error('Error Confirm Company');
      return false;
     }
    } catch (e) {
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Galat" + e);
    }
   }


  },
  error: function(response) {
   alert_info("Error Connection");
   console.log(response);
  }

 });
};

///////////////////////////////////////on change alasan alamat/////////////////////////////////////////
$('#slc-alasan-kodepos-penjamin').change(function(){
    var alasan_penjamin =  $('#slc-alasan-kodepos-penjamin').val();
    $('.slc-alasan-alamat-pnj-per').val(alasan_penjamin);
})
$('#slc-alasan-kodepos-penjaminn').change(function(){
    var alasan_penjaminn =  $('#slc-alasan-kodepos-penjaminn').val();
    $('.slc-alasan-alamat-pnj-com').val(alasan_penjaminn);
})
$('#slc-alasan-kodepos-holder-pri').change(function(){
    var alasan_pri =  $('#slc-alasan-kodepos-holder-pri').val();
    $('.slc-alasan-alamat-hld-per').val(alasan_pri);
})
$('#slc-alasan-kodepos-holder-ent').change(function(){
    var alasan_ent =  $('#slc-alasan-kodepos-holder-ent').val();
    $('.slc-alasan-alamat-hld-com').val(alasan_ent);
})
$('#slc-alasan-kodepos-pic').change(function(){
    var alasan_pic =  $('#slc-alasan-kodepos-pic').val();
    $('.slc-alasan-alamat-pic').val(alasan_pic);
})
$('#slc-alasan-kodepos-spouse').change(function(){
    var alasan_spouse =  $('#slc-alasan-kodepos-spouse').val();
    $('.slc-alasan-alamat-sps').val(alasan_spouse);
})
$('#slc-alasan-kodepos-occp').change(function(){
    var alasan_occp =  $('#slc-alasan-kodepos-occp').val();
    $('.slc-alasan-alamat-ocp').val(alasan_occp);
})
$('#slc-alasan-kodepos-other').change(function(){
    var alasan_other =  $('#slc-alasan-kodepos-other').val();
    $('.slc-alasan-alamat-oth').val(alasan_other);
})

function cek_validasi_npwp(no_npwp){
    var temp_npwp = no_npwp.replace(/[-. ]/g,"").split("");
    var no_npwp = JSON.parse("[" + temp_npwp + "]");
    var v_validasi1 = 0;
    var v_validasi2 = 0;
    var v_temp_val2 = 0;
    var v_satuan    = 0;
    var v_puluhan   = 0;
    var v_jml       = 0;
    var v_tot_jml   = 0;
    var v_val_npwp  = 9;
    var sum = 0;
    var i = 1;
    for (i = 1; i <= v_val_npwp; i++) {
            sum += no_npwp[i-1];
    }
    if (sum === 0 ){
         return 0;
    }else{
        var i = 1;
        for (i = 1; i <= v_val_npwp; i++) {
           if (i == v_val_npwp){
                v_validasi1 = no_npwp[i-1];
           }else{
            if( i%2 == 0){
                v_temp_val2 = no_npwp[i-1] * 2;
           }else{
                 v_temp_val2 = no_npwp[i-1] * 1;
           }
           if (v_temp_val2.toString().length == 1){
                v_satuan  = v_temp_val2;
                v_puluhan = 0;
           }else if(v_temp_val2.toString().length == 2){
                v_satuan  = Number(v_temp_val2.toString().substring(0,1));
                v_puluhan = Number(v_temp_val2.toString().substring(1,2));
           }
           v_jml     = v_satuan + v_puluhan;
           v_tot_jml = v_tot_jml + v_jml;
        }
        }
        v_validasi2 = (Math.ceil((v_tot_jml / 10)) * 10) - v_tot_jml; 
        if (v_validasi1 - v_validasi2 !== 0){
            return 0;
        }else{
            return 1;
        }
    }
}
