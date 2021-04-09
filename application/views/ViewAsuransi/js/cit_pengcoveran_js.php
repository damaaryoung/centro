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
var modal_tgl_cover_update = '';
var modal_nama_bank_update = '';
var modal_nomor_rekening_update = '';
var modal_alamat_bank_update = '';
var modal_pic_penyetor_update = '';
var modal_kantor_cabang_update = '';
var modal_limit_cit_update = '';
var modal_nominal_update = '';
var upload_update = '';
var no_trans = '';
var zerofilled = '';

var fileUploads = [];
var root_document = '';
var root_address = '';
var path_file = '';
var file_name = '';
var parsedArray = [];
var fileUploadsLength = '';

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

$('#btn_pengajuan').click(function () {
    select_kantor = '1';
    $('#modal_kantor_cabang').append('<option value="' + kd_kantor_user + '" selected>'+ kd_kantor_user +'</option>');
    if(kd_kantor_user == '00' || divisi_user == 'IT'){ 
        get_kode_kantor();
    }
    $('#modal_pengcoveran_cit').modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
    }); 
});
$('#modal_limit_cit').on('input', function() {
    var money = accounting.formatMoney($('#modal_limit_cit').val(), '', 0, ',', '.');
    $('#modal_limit_cit').val(money);
});
$('#modal_nominal').on('input', function() {
    var money = accounting.formatMoney($('#modal_nominal').val(), '', 0, ',', '.');
    $('#modal_nominal').val(money);
});
$('#btn_simpan').click(function () {
    pengajuan_cis();
});
$('#tbl_body_cit').on('click','.btn_proses', function () {  
    id           = $(this).data("id");
    no_transaksi = $(this).data("no-trans");
    get_details();
});
$('#tbl_body_cit').on('click','.btn_delete', function () {  
    id           = $(this).data("id");
    no_transaksi = $(this).data("no-trans");
    status       = $(this).data("status");
    Swal.fire({
       title: 'Apakah Anda Yakin Akan Menghapus Data ?',
       text: "Data Yang Dihapus Tidak Dapat Dikembalikan, Hapus?",
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Hapus',
       cancelButtonText: 'Batalkan',
       showLoaderOnConfirm: true,
       reverseButtons: true,
       preConfirm: function() {
        return new Promise(function(resolve) {
            delete_cis();   
         });
       },
       allowOutsideClick: false     
    });
});
$('#btn_simpan_update').click(function () {
    update_cit(); 
});
$('#btn_upload').click(function(event) {
    prosees_upload();
});
$('#file_uploads_update').on('click','.btn_del_file', function () { 
    del_name      = $(this).data("file-name");
    for(i = 0; i < fileUploads[0].length; i++ ){
        var del_compare = fileUploads[0][i].toString();
        if(del_compare == del_name){
            fileUploads[0].splice(i, 1);
        }
    }
    proses_delete_upload();
});
$('#btn_refresh').click(function () {
    getData();
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
$('#btn_email_modal').click(function(event) {
    $('#modal_send_mail').modal('show');
});
$('#send_mail').click(function () {
    modal_email_penerima = $("#modal_email_penerima").val();
    id_update           = $('#id_update').val();
    no_transaksi_update = $('#no_transaksi_update').val();
    
    if(fileUploads.length == 0){
            Swal.fire({
               title: 'Anda Belum Upload File Pendukung',
               text: "Lanjukan kirim email Cover CIT, Lanjutkan?",
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Lanjutkan',
               cancelButtonText: 'Batalkan',
               showLoaderOnConfirm: true,
               reverseButtons: true,
               preConfirm: function() {
                return new Promise(function(resolve) {
                    proses_email_cit(modal_email_penerima,id_update,no_transaksi_update);
                 });
               },
               allowOutsideClick: false     
            });
    }else{
        proses_email_cit(modal_email_penerima,id_update,no_transaksi_update);
    }
});






function get_kode_kantor(){
    $.ajax({
            url : base_url + "Asuransi/Cash_in_transit_controller/get_kode_kantor",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            data:{"select_kantor" : select_kantor},
            success : function(response) {
                if(select_kantor == '0'){
                    $.each(response.kode_kantor,function(i,data){
                        $('#src_kode_kantor').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
                    });
                }else if(select_kantor == '1'){
                    $.each(response.kode_kantor,function(i,data){
                        $('#modal_kantor_cabang').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
                    });
                    $('#modal_tgl_cover').val(response.sysdate);
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
function getData(){
   data = '';
   $('#tbl_cit').DataTable().clear();
   $('#tbl_cit').DataTable().destroy();
   $('#loading').show(); 
   var src_kode_kantor =  $('#src_kode_kantor').val();
   
   $.ajax({
           url : base_url + "Asuransi/Cash_in_transit_controller/get_data_cit",
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
function mapping(response){
     for(i = 0; i < response.data_cit.length; i++ ){
         data += `<tr>
                     <td>${response.data_cit[i]['no_transaksi']}</td>
                     <td>${response.data_cit[i]['tgl_cover']}</td>
                     <td>${response.data_cit[i]['nama_bank']}</td>
                     <td>${response.data_cit[i]['nama_kantor']}</td>
                     <td>${accounting.formatMoney(response.data_cit[i]['limit_cit_cabang'], '', 0, ',', '.')}</td>
                     <td>${accounting.formatMoney(response.data_cit[i]['nominal_setor_cit'], '', 0, ',', '.')}</td>
                     <td>${response.data_cit[i]['status_detail']}</td>
                     <td>        
                         <button type="button" class="btn btn-primary btn-sm btn_proses" id="btn_proses"
                                 data-id="${response.data_cit[i]['id']}"
                                 data-no-trans="${response.data_cit[i]['no_transaksi']}"    
                                 'name="btn_proses">
                                 <i class="fa fa-pen"></i> </button>
                         <button type="button" class="btn btn-danger btn-sm btn_delete" id="btn_delete"
                                 data-id="${response.data_cit[i]['id']}"
                                 data-no-trans="${response.data_cit[i]['no_transaksi']}"    
                                 data-status="${response.data_cit[i]['status']}"   
                                 'name="btn_proses">
                                 <i class="fa fa-trash"></i> </button>
                     </td>
                 </tr>`;
     }
     $('#tbl_cit > tbody:first').html(data);
     
     $(document).ready(function() {
         $('#tbl_cit').DataTable( {
             "destroy": true,
             "scrollX": true,
             "autoWidth" : false,
             "searching": false,
             "aaSorting" : []
         } );
     } );
     $('#loading').hide(); 
}
function pengajuan_cis(){
        var modal_tgl_cover      = $('#modal_tgl_cover').val();
        var modal_nama_bank      = $('#modal_nama_bank').val();
        var modal_nomor_rekening = $('#modal_nomor_rekening').val();
        var modal_kantor_cabang  = $('#modal_kantor_cabang').val();
        var modal_alamat_bank    = $('#modal_alamat_bank').val();
        var modal_pic_penyetor   = $('#modal_pic_penyetor').val();
        var modal_limit_cit = accounting.unformat($('#modal_limit_cit').val()); 
        var modal_nominal   = accounting.unformat($('#modal_nominal').val());

        let fd = new FormData();
        fd.append('modal_tgl_cover',modal_tgl_cover);
        fd.append('modal_nama_bank',modal_nama_bank);
        fd.append('modal_nomor_rekening',modal_nomor_rekening);
        fd.append('modal_kantor_cabang',modal_kantor_cabang);
        fd.append('modal_alamat_bank',modal_alamat_bank);
        fd.append('modal_pic_penyetor',modal_pic_penyetor);
        fd.append('modal_limit_cit',modal_limit_cit);
        fd.append('modal_nominal',modal_nominal);
        $('#loading-1').show();
        
        $.ajax({
            url: base_url + "Asuransi/Cash_in_transit_controller/pengajuan_cit",
            type:"POST",
            timeout : 240000,
            data:fd,
            processData:false,
            contentType:false,
            cache:false,  
            dataType: 'json',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            success : function(response) {
                    
                    if(response.data_details.no_transaksi == null){
                        no_trans = 0;
                    }else{
                        no_trans = response.data_details.no_transaksi;
                    }
                    zerofilled = ('00000000000'+ no_trans).slice(-11);
            
                    $('#loading-2').hide();  

                    Swal.fire({
                       position: 'center',
                       icon: 'success',
                       title: 'Sukses Pengajuan CIT, No Transaksi : ' + zerofilled,
                       text: "Silahkan lengkapi data pengajuan, dengan mengupload file pendukung!",
                       showCancelButton: false,
                       confirmButtonColor: '#3085d6',
                       confirmButtonText: 'Lanjutkan',
                       showLoaderOnConfirm: true,
                       reverseButtons: true,
                       preConfirm: function() {
                        return new Promise(function(resolve) {
                            close_modal();
                            getData();  
                            Swal.fire({
                               position: 'center',
                               icon: 'success',
                               showConfirmButton: false,
                               timer: 1500
                            })
                        });
                       },
                       allowOutsideClick: false     
                    });
                    console.log(response);
            },
            error : function(response) {
                console.log(response);
                $('#loading-1').hide();
                close_modal()
                return Swal.fire({
                            icon: 'error',
                            title: 'Gagal Pengajuan Asuransi Cash In Transit!',
                            text: 'Mohon Periksa Jaringan Anda'
                });
        }
    });
}
function close_modal(){
    clear_modal();
    $('#loading-1').hide();
    $('#modal_pengcoveran_cit').modal('hide');
}
function clear_modal(){
    $('#modal_tgl_cover').val('');
    $('#modal_limit_cit').val('');
    $('#modal_nama_bank').val('');
    $('#modal_nominal').val('');
    $('#modal_nomor_rekening').val('');
    $('#modal_alamat_bank').val('');
    $('#modal_pic_penyetor').val('');
    $('#modal_kantor_cabang').find('option').remove().end();
}
function get_details(){
   $('#loading').show();    
   $.ajax({
           url : base_url + "Asuransi/Cash_in_transit_controller/get_details",
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
                console.log(response);
                mapping_update(response);
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
    $('#modal_pengcoveran_cit_update').modal('show');
    
    $('#modal_tgl_cover_update').val(response.data_cit[0]['tgl_cover']);
    $('#modal_nama_bank_update').val(response.data_cit[0]['nama_bank']);
    $('#modal_limit_cit_update').val(accounting.formatMoney(response.data_cit[0]['limit_cit_cabang'], '', 0, ',', '.'));
    $('#modal_nominal_update').val(accounting.formatMoney(response.data_cit[0]['nominal_setor_cit'], '', 0, ',', '.'));
    $('#modal_nomor_rekening_update').val(response.data_cit[0]['no_rekening']);
    $('#modal_alamat_bank_update').val(response.data_cit[0]['alamat_bank']);
    $('#modal_pic_penyetor_update').val(response.data_cit[0]['pic_penyetor']);
    
    $('#id_update').val(response.data_cit[0]['id']);
    $('#no_transaksi_update').val(response.data_cit[0]['no_transaksi']);
    
    $('#modal_kantor_cabang_update').append('<option value="'+response.data_cit[0]['kode_kantor']+'" selected>' + response.data_cit[0]['kode_kantor'] + ' - ' + response.data_cit[0]['nama_kantor'] +'</option>');
    
    if(kd_kantor_user == '00' || divisi_user == 'IT'){
        $.each(response.kode_kantor,function(i,data){
            $('#modal_kantor_cabang_update').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
        });
    }else{
        $('#modal_kantor_cabang_update').append('<option value="' + kd_kantor_user + '">'+ kd_kantor_user +'</option>');
    }

    fileUploads = [];
    uploads     = '';
    root_document = response.data_cit[0]['root_document'];
    root_address  = response.data_cit[0]['root_address'];
    path_file     = response.data_cit[0]['path_file'];
    file_name     = JSON.parse(response.data_cit[0]['file_name']);

    uploads += `<div class="col-sm-2">
                    <label style="padding-top: 5px;" class="control-label" for="modal_kantor_jaminan">File Attachment: </label>
                </div>`;
    if(file_name == null){
        fileUploads = [];
    }else if(file_name == ''){
        fileUploads = [];
    }else{
        fileUploads.push(file_name);
       // loop_view_file(fileUploads,uploads);
        for(i = 0; i < fileUploads[0].length; i++ ){
            uploads += `<div class="col-sm-8">
                            <label style="padding-top: 5px;" class="control-label">
                              <a href="${root_address+path_file+fileUploads[0][i]}" id="attachment_jaminan" target="_blank">${fileUploads[0][i]}</a>
                            </label>
                            <button type="button" class="btn btn-light btn-sm control-label btn_del_file"
                                    data-file-name="${fileUploads[0][i]}" >
                                                    <i class="far fa-trash-alt danger" style="color:red"></i> 
                                                    
                            </button>
                        </div>`;
        }
    }
    $('#file_uploads_update').html(uploads);
    document.getElementById("file_uploads_update").style.display = "block";  
}
function close_modal_update(){
    clear_modal_update();
    $('#modal_pengcoveran_cit_update').modal('hide');
}
function clear_modal_update(){
    $('#modal_kantor_cabang_update').find('option').remove().end();
    $('#modal_tgl_cover_update').val('');
    $('#modal_nama_bank_update').val('');
    $('#modal_limit_cit_update').val('');
    $('#modal_nominal_update').val('');
    $('#modal_nomor_rekening_update').val('');
    $('#modal_alamat_bank_update').val('');
    $('#modal_pic_penyetor_update').val('');
    
    $('#id_update').val('');
    $('#no_transaksi_update').val('');
    document.getElementById("file_uploads_update").style.display = "none";
}
function update_cit(){
    id_update           = $('#id_update').val();
    no_transaksi_update = $('#no_transaksi_update').val();

    modal_tgl_cover_update = $('#modal_tgl_cover_update').val();
    modal_nama_bank_update = $('#modal_nama_bank_update').val();
    modal_nomor_rekening_update = $('#modal_nomor_rekening_update').val();
    modal_alamat_bank_update = $('#modal_alamat_bank_update').val();
    modal_pic_penyetor_update = $('#modal_pic_penyetor_update').val();
    modal_kantor_cabang_update = $('#modal_kantor_cabang_update').val();
    modal_limit_cit_update = accounting.unformat($('#modal_limit_cit_update').val());
    modal_nominal_update = accounting.unformat($('#modal_nominal_update').val());


    var fd_up = new FormData();
    fd_up.append('id_update',id_update);
    fd_up.append('no_transaksi_update',no_transaksi_update);
    fd_up.append('modal_tgl_cover_update',modal_tgl_cover_update);
    fd_up.append('modal_nama_bank_update',modal_nama_bank_update);
    fd_up.append('modal_nomor_rekening_update',modal_nomor_rekening_update);
    fd_up.append('modal_alamat_bank_update',modal_alamat_bank_update);
    fd_up.append('modal_pic_penyetor_update',modal_pic_penyetor_update);
    fd_up.append('modal_kantor_cabang_update',modal_kantor_cabang_update);
    fd_up.append('modal_limit_cit_update',modal_limit_cit_update);
    fd_up.append('modal_nominal_update',modal_nominal_update);
    
    $('#loading-2').show();
        $.ajax({
            url: base_url + "Asuransi/Cash_in_transit_controller/update_cit",
            type:"POST",
            timeout : 240000,
            data:fd_up,
            processData:false,
            contentType:false,
            cache:false,  
            dataType: 'json',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            success : function(response) {
                console.log(response);
                    $('#loading-3').hide();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Sukses Update Pengajuan Asuransi CIT',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(()=> {
                        get_details();
                    });  
                    
            },
            error : function(response) {
                console.log(response);
                $('#loading-2').hide();
                close_modal_update();
                return Swal.fire({
                            icon: 'error',
                            title: 'Gagal Update Pengajuan CIT!',
                            text: 'Mohon Periksa Jaringan Anda'
                });
            }
        });
       


}
function delete_cis(){
   
   if(status == '1'){
       return Swal.fire({
           icon: 'error',
           title: 'Tidak Dapat Hapus Data!',
           text: 'Sudah Send Email'
       });
   }
   $('#loading').show();  
   $.ajax({
           url : base_url + "Asuransi/Cash_in_transit_controller/delete_cit",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           data:{"id"           : id,
                 "no_transaksi" : no_transaksi,
                 "status"       : status},
           success : function(response) {
               Swal.fire({
                   position: 'center',
                   icon: 'success',
                   title: 'Sukses Hapus Data Pengajuan Asuransi CIT',
                   showConfirmButton: false,
                   timer: 2000
               }).then(()=> {
                   getData(response);
               }); 
               
               
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
function prosees_upload(){

    id_update           = $('#id_update').val();
    no_transaksi_update = $('#no_transaksi_update').val();
    var files = $('#modal_upload_update')[0].files[0];

    if(fileUploads.length > 0){
        fileUploadsLength = fileUploads[0].length;
    }else{
        fileUploadsLength = 0;
    }
  
    var fd_up = new FormData();
    fd_up.append('files',files);
    fd_up.append('id_update',id_update);
    fd_up.append('no_transaksi_update',no_transaksi_update);
    fd_up.append('fileUploads',fileUploads);
    fd_up.append('fileUploadsLength',fileUploadsLength);
    
    $('#loading-2').show();
    
    $.ajax({
        url: base_url + "Asuransi/Cash_in_transit_controller/proses_upload",
        type:"POST",
        timeout : 240000,
        data:fd_up,
        processData:false,
        contentType:false,
        cache:false,  
        dataType: 'json',
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        success : function(response) {
            console.log(response);                    
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sukses Upload File Attachment',
                    showConfirmButton: false,
                    timer: 2000
                }).then(()=> {
                    get_details();
                });  
                
        },
        error : function(response) {
            console.log(response);
            $('#loading-2').hide();
            return Swal.fire({
                        icon: 'error',
                        title: 'Proses Upload Gagal!',
                        text: 'Mohon Periksa Jaringan Anda'
            });
        }
    });
   
}
function proses_delete_upload(){
    id_update           = $('#id_update').val();
    no_transaksi_update = $('#no_transaksi_update').val();
    var files = $('#modal_upload_update')[0].files[0];

    if(fileUploads.length > 0){
        fileUploadsLength = fileUploads[0].length;
    }else{
        fileUploadsLength = 0;
    }
    
    $('#loading-2').show();
    var proses_flag = 1;
    $.ajax({
            url : base_url + "Asuransi/Cash_in_transit_controller/proses_delete_upload",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            data:{  "id_update"            : id_update,
                    "no_transaksi_update"  : no_transaksi_update,
                    "fileUploads"       : fileUploads[0],
                    "fileUploadsLength" : fileUploadsLength
                },
            success : function(response) {
                console.log(response);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'File Berhasil Dihapus',
                    showConfirmButton: false,
                    timer: 2000
                }).then(()=> {
                    get_details();
                });  
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading-2').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Proses Gagal',
                    text: 'Mohon Periksa Jaringan Anda'
                });
                
            }
    });   
}
function get_data_search(){
   data = '';
   $('#tbl_cit').DataTable().clear();
   $('#tbl_cit').DataTable().destroy();
   $('#loading').show(); 
   var src_kode_kantor = $('#src_kode_kantor').val();
   var src_search      = $('#src_search').val();
   $.ajax({
           url : base_url + "Asuransi/Cash_in_transit_controller/get_data_search",
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
function proses_email_cit(modal_email_penerima,id_update,no_transaksi_update){
    $('#loading').show();  
    $('#loading-3').show(); 
    $.ajax({
            url : base_url + "Asuransi/Cash_in_transit_controller/proses_email_cit",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            data:{"id_update"            : id_update,
                  "no_transaksi_update"  : no_transaksi_update,
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
                    $('#modal_pengcoveran_cit_update').modal('hide');
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
</script>