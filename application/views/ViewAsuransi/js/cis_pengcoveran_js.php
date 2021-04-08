<script>


var base_url                     = $('#base_url').val(); 
var kd_kantor_user               = $('#user_kode_kantor').val(); 
var divisi_user                  = $('#user_divisi_id').val(); 
var id                           = '';
var no_transaksi                 = '';
var status                       = '';
var select_kantor                = '';
var id_update                    = '';
var no_transaksi_update          = '';
var modal_nama_asuransi_update   = '';
var modal_kantor_cabang_update   = '';
var modal_tgl_cover_update       = '';
var modal_limit_kas_update       = '';
var modal_saldo_akhir_kas_update = '';
var upload_update = '';
var checkArray = [];
var check_before = '';
var lengthParsed = '';
var modal_email_penerima = '';
var modal_notes = '';
$(document).ready(function () {            
    bsCustomFileInput.init();
    $('.select2').select2();
    if(kd_kantor_user == '00' || divisi_user == 'IT'){
        select_kantor = '0';
        $('#src_kode_kantor').append('<option value="" selected>ALL</option>');
        get_kode_kantor();
    }else{
        $('#src_kode_kantor').append('<option value="' + kd_kantor_user + '" selected>'+ kd_kantor_user +'</option>');
    }
    getData();
    
    $('#loading-1').hide();
    $('#loading-3').hide();
});

$('#btn_refresh').click(function () {
    getData();
});
$('#btn_email').click(function () {
    checkArray = [];
    lengthParsed = 0;
    $("input:checkbox[name=check]:checked").each(function(){
        checkArray.push([$(this).val(),$(this).data("asuransi"),$(this).data("no_trans")]);
    });
    console.log(checkArray, checkArray.length);
    lengthParsed = checkArray.length;
    if(lengthParsed == 0){
        return Swal.fire({
            icon: 'error',
            title: 'Tidak Dapat Memproses Email!',
            text: 'Tidak Ada Data Yang Dipilih'
        });
    }
    /// fungsi untuk validasi asuransi berbeda
    // for(i = 0; i < lengthParsed; i++ ){
    //     if(i == 0){
    //         check_before = '' + checkArray[i][1].toString();
    //     }else{
    //         check_before = checkArray[i-i][1].toString();
    //     }
        
    //     if(check_before != checkArray[i][1].toString()){
    //         return Swal.fire({
    //             icon: 'error',
    //             title: 'Tidak Dapat Memproses Email!',
    //             text: 'Anda Mencentang Data Yang Di Cover Asuransi Yang Berbeda'
    //         });
    //     }
    // }
    
    $('#modal_send_mail').modal('show');

    
   //   proses_email_cis(checkArray,lengthParsed);
});
$('#send_mail').click(function () {
    modal_email_penerima = $("#modal_email_penerima").val();
    console.log(checkArray,lengthParsed,modal_email_penerima);
    proses_email_cis(checkArray,lengthParsed,modal_email_penerima);
});
$('#tbl_body_cis').on('click','.btn_proses', function () {  
    id           = $(this).data("id");
    no_transaksi = $(this).data("no-trans");
    get_details();
});
$('#btn_simpan_update').click(function () {
    Swal.fire({
       title: 'Apakah Anda Yakin Akan Add Notes ?',
       text: "Aksi ini akan merubah status menjadi DONE, Lanjutkan?",
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Lanjutkan',
       cancelButtonText: 'Batalkan',
       showLoaderOnConfirm: true,
       reverseButtons: true,
       preConfirm: function() {
        return new Promise(function(resolve) {
            add_notes();   
         });
       },
       allowOutsideClick: false     
    });

   // proses_email_cis(checkArray,lengthParsed,modal_email_penerima);
});
$('#src_search').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            get_data_search();
        }
});
$('#btn_search').click(function () {
    get_data_search();
}); 
/// function here //
function getData(){
   data = '';
   $('#tbl_cis').DataTable().clear();
   $('#tbl_cis').DataTable().destroy();
   $('#loading').show();
   var src_kode_kantor =  $('#src_kode_kantor').val();
   
   $.ajax({
           url : base_url + "Asuransi/Cash_in_save_controller/get_data_cis",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           data:{"src_kode_kantor" : src_kode_kantor},
           success : function(response) {
               mapping(response);
               
           },
           error : function(response) {
               console.log('failed :' + response);
               $('#loading').hide();
               return Swal.fire({
                   icon: 'error',
                   title: 'Gagal Get Data!',
                   text: 'Mohon Periksa Jaringan Anda'
               });
           }
   });    
}
function get_asuransi(){
    $.ajax({
            url : base_url + "Asuransi/Cash_in_save_controller/get_asuransi",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
                console.log(response.sysdate);
                $.each(response.get_asuransi,function(i,data){
                    $('#modal_nama_asuransi').append('<option value="'+data.kode+'">' + data.nama +'</option>');
                });
                $('#modal_tgl_cover').val(response.sysdate);
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Get List Asuransi!',
                    text: 'Mohon Periksa Jaringan Anda'
                });
                
            }
    });    
}
function get_kode_kantor(){
    $.ajax({
            url : base_url + "Asuransi/Proses_klaim_jiwa_controller/get_kode_kantor",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
                if(select_kantor == '0'){
                    $.each(response.kode_kantor,function(i,data){
                        $('#src_kode_kantor').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
                    });
                }else{
                    $('#modal_kantor_cabang').append('<option value="' + kd_kantor_user + '" selected>'+ kd_kantor_user +'</option>');
                    $.each(response.kode_kantor,function(i,data){
                        $('#modal_kantor_cabang').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
                    });
                }
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Get List Kode Kantor!',
                    text: 'Mohon Periksa Jaringan Anda'
                });
                
            }
    });    
}
function proses_email_cis(checkArray,lengthParsed,modal_email_penerima){
    $('#loading').show();  
    $('#loading-3').show(); 
    $.ajax({
            url : base_url + "Asuransi/Cash_in_save_controller/proses_email_cis",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            data:{"checkArray"             : checkArray,
                    "lengthParsed"         : lengthParsed,
                    "modal_email_penerima" : modal_email_penerima},
            success : function(response) {

                console.log(response);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sukses Kirim Email',
                    showConfirmButton: false,
                    timer: 2000
                }).then(()=> {
                    $('#loading').hide();  
                    $('#loading-3').hide(); 
                    $('#modal_send_mail').modal('hide');
                    getData();
                });                 
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();  
                $('#loading-3').hide(); 
                $('#modal_send_mail').modal('hide');
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Kirim Email!',
                    text: 'Mohon Periksa Jaringan Anda'
                });
            }
    });    
}

function mapping(response){
     for(i = 0; i < response.data_cis.length; i++ ){
         data += `<tr style="text-align:center">
                     <td><input type="checkbox" id="check" name="check" 
                            value="${response.data_cis[i]['id']}"
                            data-asuransi="${response.data_cis[i]['kode_asuransi']}"
                            data-no_trans="${response.data_cis[i]['no_transaksi']}"></td>
                     <td>${response.data_cis[i]['no_transaksi']}</td>
                     <td>${response.data_cis[i]['tgl_cover']}</td>
                     <td>${response.data_cis[i]['nama_asuransi']}</td>
                     <td>${response.data_cis[i]['nama_kantor']}</td>
                     <td>${accounting.formatMoney(response.data_cis[i]['limit_kas'], '', 0, ',', '.')}</td>
                     <td>${accounting.formatMoney(response.data_cis[i]['saldo_kas'], '', 0, ',', '.')}</td>
                     <td>${response.data_cis[i]['status']}</td>`;
        if(response.data_cis[i]['status_no'] == 0){
            data += `<td><button type="button" class="btn btn-primary btn-sm btn_proses" id="btn_proses"
                                 data-id="${response.data_cis[i]['id']}"
                                 data-no-trans="${response.data_cis[i]['no_transaksi']}"    
                                 'name="btn_proses" disabled>
                                 <i class="fa fa-pen"></i>Add Notes </button></td>
                 </tr>`;
        }else{
            data += `<td><button type="button" class="btn btn-primary btn-sm btn_proses" id="btn_proses"
                                 data-id="${response.data_cis[i]['id']}"
                                 data-no-trans="${response.data_cis[i]['no_transaksi']}"    
                                 'name="btn_proses">
                                 <i class="fa fa-pen"></i>Add Notes </button></td>
                 </tr>`;
        }

     }
     $('#tbl_cis > tbody:first').html(data);
     
     $(document).ready(function() {
         $('#tbl_cis').DataTable( {
             "destroy": true,
             "scrollX": true,
             "autoWidth" : false,
             "searching": false,
             "aaSorting" : []
         } );
     } );
     $('#loading').hide(); 
}
function toggle(source) {
  checkboxes = document.getElementsByName('check');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = source.checked;
  }
}

function get_details(){
   $('#loading').show();    
   $.ajax({
           url : base_url + "Asuransi/Cash_in_save_controller/get_details",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           data:{"id"           : id,
                 "no_transaksi" : no_transaksi},
           success : function(response) {
                $('#loading').hide(); 
                mapping_update(response);
                console.log(response);
               
           },
           error : function(response) {
               console.log('failed :' + response);
               $('#loading').hide();
               return Swal.fire({
                   icon: 'error',
                   title: 'Gagal Get Data!',
                   text: 'Mohon Periksa Jaringan Anda'
               });
           }
   });    
}
function mapping_update(response){
    $('#loading-2').hide(); 
    $('#modal_pengajuan_klaim_cis_update').modal('show');
    $('#modal_nama_asuransi_update').append('<option value="'+response.data_cis[0]['kode_asuransi']+'">' + response.data_cis[0]['kode_asuransi'] + ' - ' + response.data_cis[0]['nama_asuransi'] +'</option>');
    $('#modal_kantor_cabang_update').append('<option value="'+response.data_cis[0]['kode_kantor']+'" selected>' + response.data_cis[0]['kode_kantor'] + ' - ' + response.data_cis[0]['nama_kantor'] +'</option>');
    $('#modal_tgl_cover_update').val(response.data_cis[0]['tgl_cover']);
    $('#modal_limit_kas_update').val(accounting.formatMoney(response.data_cis[0]['limit_kas'], '', 0, ',', '.'));
    $('#modal_saldo_akhir_kas_update').val(accounting.formatMoney(response.data_cis[0]['saldo_kas'], '', 0, ',', '.'));
    $('#id_update').val(response.data_cis[0]['id']);
    $('#no_transaksi_update').val(response.data_cis[0]['no_transaksi']);
    $('#modal_notes').val(response.data_cis[0]['notes']);

    fileUploads = [];
    uploads     = '';
    root_document = response.data_cis[0]['root_document'];
    root_address  = response.data_cis[0]['root_address'];
    path_file     = response.data_cis[0]['path_file'];
    file_name     = JSON.parse(response.data_cis[0]['file_name']);

    uploads += `<div class="col-sm-2">
                    <label style="padding-top: 5px;" class="control-label" for="modal_kantor_jaminan">File Attachment: </label>
                </div>`;
    if(file_name == null){
        fileUploads = [];
    }else if(file_name == ''){
        fileUploads = [];
    }else{
        fileUploads.push(file_name);
        for(i = 0; i < fileUploads[0].length; i++ ){
            uploads += `<div class="col-sm-8">
                            <label style="padding-top: 5px;" class="control-label">
                              <a href="${root_address+path_file+fileUploads[0][i]}" id="attachment_jaminan" target="_blank">${fileUploads[0][i]}</a>
                            </label>
                        </div>`;
        }
    }
    $('#file_uploads_update').html(uploads);
    document.getElementById("file_uploads_update").style.display = "block";  
}
function close_modal_update(){
    clear_modal_update();
    $('#modal_pengajuan_klaim_cis_update').modal('hide');
}
function clear_modal_update(){
    $('#modal_nama_asuransi_update').find('option').remove().end();
    $('#modal_kantor_cabang_update').find('option').remove().end();
    $('#modal_tgl_cover_update').val('');
    $('#modal_limit_kas_update').val('');
    $('#modal_saldo_akhir_kas_update').val('');
    $('#id_update').val('');
    $('#no_transaksi_update').val('');
    document.getElementById("file_uploads_update").style.display = "none";
}
function add_notes(){
    modal_notes = $('#modal_notes').val();
    
    $('#loading').show();  
    $('#loading-2').show(); 
    $.ajax({
            url : base_url + "Asuransi/Cash_in_save_controller/add_notes",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            data:{"id"          : id,
                  "no_transaksi": no_transaksi,
                  "modal_notes" : modal_notes},
            success : function(response) {

                console.log(response);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Proses Add Notes Sukses',
                    showConfirmButton: false,
                    timer: 2000
                }).then(()=> {
                    $('#loading').hide();  
                    close_modal_update();
                    getData();
                });                 
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();  
                close_modal_update()
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Proses Add Notes!',
                    text: 'Mohon Periksa Jaringan Anda'
                });
            }
    });    
}
function get_data_search(){
   data = '';
   $('#tbl_cis').DataTable().clear();
   $('#tbl_cis').DataTable().destroy();
   $('#loading').show(); 
   var src_kode_kantor = $('#src_kode_kantor').val();
   var src_search      = $('#src_search').val();
   $.ajax({
           url : base_url + "Asuransi/Cash_in_save_controller/get_data_search",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
            data:{"src_kode_kantor" : src_kode_kantor,
                  "src_search"      : src_search},
           success : function(response) {
               mapping(response);
           },
           error : function(response) {
               console.log('failed :' + response);
               $('#loading').hide();
               return Swal.fire({
                   icon: 'error',
                   title: 'Gagal Get Data!',
                   text: 'Mohon Periksa Jaringan Anda'
               });
           }
   });    
}

</script>