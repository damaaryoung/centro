<script>
var base_url         = $('#base_url').val(); 
var kd_kantor_user   = $('#user_kode_kantor').val(); 
var divisi_user      = $('#user_divisi_id').val(); 
var rekening         = '';
var jenis            = '';
var no_reff_asuransi = '';
var no_transaksi     = '';
var data             = '';
var src_kode_kantor  = '';
var src_search       = '';
var send_mail        = '';
var email_insco      = '';
var tgl_klaim        = '';
var fileUploads = [];
var uploads     = '';
var root_document = '';
var root_address  = '';
var path_file     = '';
var file_name     = '';
var del_name     = '';
var ket_reject = '';

$(document).ready(function () {  
    bsCustomFileInput.init();
    $('.select2').select2();
    $('#src_kode_kantor').append('<option value="' + kd_kantor_user + '" selected>'+ kd_kantor_user +'</option>');
    
    get_data_jaminan();

    if(kd_kantor_user == '00' || divisi_user == 'IT'){
        get_kode_kantor();
    }

});
$('#src_search').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        get_search();
    }
});
$('#btn_refresh').click(function(event) {
    get_data_jaminan();
});
$("#src_kode_kantor").change(function(){
    get_data_jaminan();
});
$('#tbl_body_klaim_jaminan').on('click','.btn_update_jaminan', function () {    
    rekening      = $(this).data("rekening");
    jenis         = $(this).data("jenis");
    no_reff_asuransi = $(this).data("noreff-asuransi");
    no_transaksi = $(this).data("no-trans");
    get_data_proses(rekening,jenis,no_reff_asuransi,no_transaksi);
       
});
$('#tbl_body_klaim_jaminan').on('click','.btn_reject_jaminan', function () {    
    rekening      = $(this).data("rekening");
    jenis         = $(this).data("jenis");
    no_reff_asuransi = $(this).data("noreff-asuransi");
    no_transaksi = $(this).data("no-trans");
    get_data_reject(rekening,jenis,no_reff_asuransi,no_transaksi);
       
});
$('#btn_return_modal_jaminan').click(function(event) {
    $('#modal_return').modal('show');
});
$('#btn_simpan_modal_jaminan').click(function(event) {
    Swal.fire({
       title: 'Apakah Anda Yakin Akan Melakukan SIMPAN Klaim ?',
       text: "Lanjutkan ?",
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Lanjutkan',
       cancelButtonText: 'Batalkan',
       showLoaderOnConfirm: true,
       reverseButtons: true,
       preConfirm: function() {
        return new Promise(function(resolve) {
            proses_simpan();
        });
       },
       allowOutsideClick: false     
    });
});
$('#btn_email_modal_jaminan').click(function(event) {
    $('#modal_send_mail').modal('show');
});

$('#save_return').click(function(event) {
    Swal.fire({
       title: 'Apakah Anda Yakin Akan Melakukan RETURN Klaim ?',
       text: "Lanjutkan ?",
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Lanjutkan',
       cancelButtonText: 'Batalkan',
       showLoaderOnConfirm: true,
       reverseButtons: true,
       preConfirm: function() {
        return new Promise(function(resolve) {
            proses_return();
        });
       },
       allowOutsideClick: false     
    });
});
$('#send_mail').click(function(event) {
    if(send_mail == '1'){
        Swal.fire({
           title: 'Data Ini Sudah Dikirimkan Email Ke INSCO, Kirim Ulang?',
           text: "Lanjutkan ?",
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Lanjutkan',
           cancelButtonText: 'Batalkan',
           showLoaderOnConfirm: true,
           reverseButtons: true,
           preConfirm: function() {
            return new Promise(function(resolve) {
                proses_emails();
            });
           },
           allowOutsideClick: false     
        });

    }else{
        Swal.fire({
           title: 'Apakah Anda Yakin Akan Kirim Email ke INSCO ?',
           text: "Lanjutkan ?",
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Lanjutkan',
           cancelButtonText: 'Batalkan',
           showLoaderOnConfirm: true,
           reverseButtons: true,
           preConfirm: function() {
            return new Promise(function(resolve) {
                proses_emails();
            });
           },
           allowOutsideClick: false     
        });
    }
});
$('#btn_upload_reject').click(function(event) {
    prosees_upload();
});
$('#file_uploads_reject').on('click','.btn_del_file', function () { 
    del_name      = $(this).data("file-name");
    for(i = 0; i < fileUploads[0].length; i++ ){
        var del_compare = fileUploads[0][i].toString();
        if(del_compare == del_name){
            fileUploads[0].splice(i, 1);
        }
    }
    proses_delete_upload_reject();
});
$('#save_reject').click(function(event) {
    prosees_reject();
});

function get_kode_kantor(){
    $.ajax({
            url : base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/get_kode_kantor",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
                $.each(response.kode_kantor,function(i,data){
                    $('#src_kode_kantor').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
                });
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
function get_data_jaminan(){
    data = [];
    $('#loading').show(); 
    
    $('#tbl_klaim_jaminan').DataTable().clear();
    $('#tbl_klaim_jaminan').DataTable().destroy();
    src_kode_kantor = $('#src_kode_kantor').val();
    console.log(src_kode_kantor);

    $.ajax({
            url : base_url + "Asuransi/Proses_klaim_jaminan_controller/get_data",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            data:{  "src_kode_kantor" : src_kode_kantor},
            success : function(response) {
               console.log(response);
               mapping_get_data(response)
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Get Data',
                    text: 'Mohon Periksa Jaringan Anda'
                });
                
            }
    });    
}
function get_search(){
        data = [];
        $('#loading').show(); 
        
        $('#tbl_klaim_jaminan').DataTable().clear();
        $('#tbl_klaim_jaminan').DataTable().destroy();
        src_search = $('#src_search').val();
        console.log(src_kode_kantor);

        $.ajax({
                url : base_url + "Asuransi/Proses_klaim_jaminan_controller/get_data_search",
                type : "POST",
                dataType : "json",
                timeout : 180000,
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                data:{  "src_search" : src_search},
                success : function(response) {
                   console.log(response);
                   mapping_get_data(response)
                },
                error : function(response) {
                    console.log('failed :' + response);
                    $('#loading').hide();
                    return Swal.fire({
                        icon: 'error',
                        title: 'Gagal Get Data',
                        text: 'Mohon Periksa Jaringan Anda'
                    });
                    
                }
        });    
}
function get_data_proses(rekening,jenis,no_reff_asuransi,no_transaksi){
    $('#loading').show();
    $.ajax({
            url : base_url + "Asuransi/Proses_klaim_jaminan_controller/get_data_update",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            data:{  "rekening" : rekening,
                    "jenis" : jenis,
                    "no_reff_asuransi" : no_reff_asuransi,
                    "no_transaksi" : no_transaksi},
            success : function(response) {
                $('#loading').hide();
                console.log(response);
                $('#modal_pengajuan_klaim_jaminan').modal('show');
                mapping_modal_jaminan(response);
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
function get_data_reject(rekening,jenis,no_reff_asuransi,no_transaksi){
    
    $('#loading').show();
    $.ajax({
            url : base_url + "Asuransi/Proses_klaim_jaminan_controller/get_data_reject",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            data:{  "rekening" : rekening,
                    "jenis" : jenis,
                    "no_reff_asuransi" : no_reff_asuransi,
                    "no_transaksi" : no_transaksi},
            success : function(response) {
                $('#loading').hide();
                console.log(response);
                $('#modal_reject').modal('show');
                mapping_modal_reject(response);
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
function proses_return(){
    var rek_update = $('#modal_rek_jaminan').val();
    var no_transaksi = $('#modal_no_transaksi_jaminan').val();
    var jenis_asuransi = $('#modal_jenis_asuransi_jaminan').val();
    var ket_return     = $('#ket_return').val();

    console.log(rek_update,no_transaksi,jenis_asuransi);
    $.ajax({
            url : base_url + "Asuransi/Proses_klaim_jaminan_controller/proses_return",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            data:{"rek_update" : rek_update,
                  "no_transaksi" : no_transaksi,
                  "jenis_asuransi" : jenis_asuransi,
                  "ket_return"  : ket_return
                },
            success : function(response) {
                console.log(response);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sukses RETURN Pengajuan Klaim Asuransi Jaminan',
                    showConfirmButton: false,
                    timer: 2000
                }).then(()=> {
                    $('#modal_return').modal('hide');
                    close_jaminan();
                    get_data_jaminan();
                });  
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Get Data',
                    text: 'Mohon Periksa Jaringan Anda'
                });
                
            }
    });    
}
function proses_simpan(){
    var rek_update = $('#modal_rek_jaminan').val();
    var no_transaksi = $('#modal_no_transaksi_jaminan').val();
    var jenis_asuransi = $('#modal_jenis_asuransi_jaminan').val();

    console.log(rek_update,no_transaksi,jenis_asuransi);
    $.ajax({
            url : base_url + "Asuransi/Proses_klaim_jaminan_controller/proses_simpan",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            data:{"rek_update" : rek_update,
                  "no_transaksi" : no_transaksi,
                  "jenis_asuransi" : jenis_asuransi},
            success : function(response) {
                console.log(response);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sukses SIMPAN Pengajuan Klaim Asuransi Jaminan',
                    showConfirmButton: false,
                    timer: 2000
                }).then(()=> {
                    document.getElementById("btn_email_modal_jaminan").disabled = false;
                    document.getElementById("btn_return_modal_jaminan").disabled = true;
                    get_data_jaminan();
                });  
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Get Data',
                    text: 'Mohon Periksa Jaringan Anda'
                });
                
            }
    });    
}
function proses_emails(){
    var nama_nasabah_email = $('#modal_nama_nasabah_jaminan').val();
    var no_polis_email = $('#modal_polis_jaminan').val();
    var rek_update = $('#modal_rek_jaminan').val();
    var no_transaksi = $('#modal_no_transaksi_jaminan').val();
    var modal_email_penerima = $('#modal_email_penerima').val();
    console.log(nama_nasabah_email,no_polis_email,tgl_klaim,email_insco,modal_email_penerima);

    $.ajax({
            url : base_url + "Asuransi/Proses_klaim_jaminan_controller/proses_email",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            data:{"nama_nasabah_email"   : nama_nasabah_email,
                  "no_polis_email"       : no_polis_email,
                  "tgl_klaim"            : tgl_klaim,
                  "email_insco"          : email_insco,
                  "rek_update"           : rek_update,
                  "no_transaksi"         : no_transaksi,
                  "modal_email_penerima" : modal_email_penerima
                },
            success : function(response) {
                console.log(response);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sukses Kirim Email Ke INSCO',
                    showConfirmButton: false,
                    timer: 2000
                }).then(()=> {
                    $('#modal_send_mail').modal('hide');
                    $('#modal_email_penerima').val('');
                    close_jaminan();
                });  
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                $('#modal_send_mail').modal('hide');
                $('#modal_email_penerima').val('');
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Kirim Email',
                    text: 'Mohon Periksa Jaringan Anda'
                });
                
            }
    }); 
}


function close_jaminan(){
    clear_modal_jaminan();
    $('#modal_pengajuan_klaim_jaminan').modal('hide');
}
function mapping_get_data(response){
        for(i = 0; i < response.klaim_jaminan.length; i++ ){
            data += `<tr style="text-align: center;">
                    <td>${response.klaim_jaminan[i]['TGL_REALISASI']}</td>
                    <td>${response.klaim_jaminan[i]['no_rekening']}</td>
                    <td>${response.klaim_jaminan[i]['NAMA_NASABAH']}</td>
                    <td>${response.klaim_jaminan[i]['jenis_jaminan']}</td>
                    <td>${response.klaim_jaminan[i]['jenis_klaim']}</td>
                    <td>${response.klaim_jaminan[i]['status_klaim']}</td>
                    <td>        
                        <button type="button" class="btn btn-primary btn-sm btn_update_jaminan" id="btn_update_jaminan"
                                data-rekening="${response.klaim_jaminan[i]['no_rekening']}"
                                data-jenis="${response.klaim_jaminan[i]['jenis_asuransi']}"  
                                data-noreff-asuransi="${response.klaim_jaminan[i]['no_reff_asuransi']}"  
                                data-status="${response.klaim_jaminan[i]['status_klaim']}" 
                                data-no-trans="${response.klaim_jaminan[i]['no_transaksi']}" 
                                data-toggle="tooltip" 
								data-placement="bottom" 
								title="Proses"
                                'name="btn_update_jaminan">
                                <i class="fa fa-pen"></i> </button>`;
            if(response.klaim_jaminan[i]['status_klaim'] == 'PROSES'){
                data += `&nbsp;&nbsp;
                        <button type="button" class="btn btn-warning btn-sm btn_reject_jaminan" id="btn_reject_jaminan"
                                data-rekening="${response.klaim_jaminan[i]['no_rekening']}"
                                data-jenis="${response.klaim_jaminan[i]['jenis_asuransi']}"  
                                data-noreff-asuransi="${response.klaim_jaminan[i]['no_reff_asuransi']}"  
                                data-status="${response.klaim_jaminan[i]['status_klaim']}" 
                                data-no-trans="${response.klaim_jaminan[i]['no_transaksi']}" 
                                data-toggle="tooltip" 
								data-placement="bottom" 
								title="Reject"
                                'name="btn_reject_jaminan">
                                <i class="fas fa-times-circle"></i> </button>`; 
            }    
            data += `</td>
                </tr>`;
        }

    $('#tbl_klaim_jaminan > tbody:first').html(data);
                
    $(document).ready(function() {
        $('#tbl_klaim_jaminan').DataTable( {
            "destroy": true,
            "scrollX": true,
            "autoWidth" : false,
            "searching": false,
            "aaSorting" : []
        } );
    } );
    $('#loading').hide();                    
}
function mapping_modal_jaminan(response){
    $('#modal_nama_asuransi_jaminan').val(response.data_details[0]['DESKRIPSI_ASURANSI']);
    $('#modal_tanggal_realisasi_jaminan').val(response.data_details[0]['TGL_REALISASI']);
    $('#modal_nama_nasabah_jaminan').val(response.data_details[0]['NAMA_NASABAH']);
    $('#modal_jenis_jaminan_jaminan').val(response.data_details[0]['jenis_jaminan']);
    $('#modal_nama_jaminan_jaminan').val(response.data_details[0]['nama']);
    $('#modal_alamat_jaminan_jaminan').val(response.data_details[0]['alamat_jaminan']);
    $('#modal_pertanggungan_jaminan').val(accounting.formatMoney(response.data_details[0]['nilai_asuransi_jiwa'], '', 0, ',', '.'));
    $('#modal_premi_jaminan').val(accounting.formatMoney(response.data_details[0]['premi_asuransi'], '', 0, ',', '.'));
    $('#modal_kantor_jaminan').val(response.data_details[0]['nama_kantor']);
    $('#modal_rek_jaminan').val(response.data_details[0]['no_rekening']);
    $('#modal_reff_asuransi_jaminan').val(response.data_details[0]['no_reff_asuransi']);
    $('#modal_polis_jaminan').val(response.data_details[0]['no_polis']);
    $('#modal_jenis_klaim_jaminan').val(response.data_details[0]['jenis_klaim']);
    $('#modal_no_transaksi_jaminan').val(response.data_details[0]['no_transaksi']);
    $('#modal_jenis_asuransi_jaminan').val(response.data_details[0]['jenis_asuransi']);
    
    if(response.data_details[0]['status_klaim'] == '0' ||response.data_details[0]['status_klaim'] == 'null'){
        document.getElementById("btn_email_modal_jaminan").disabled = true;
        document.getElementById("btn_return_modal_jaminan").disabled = false;
    }else{
        document.getElementById("btn_email_modal_jaminan").disabled = false;
        document.getElementById("btn_return_modal_jaminan").disabled = true;
    }
    
    send_mail   = response.data_details[0]['send_mail'];
    email_insco = response.data_details[0]['email'];
    tgl_klaim   = response.data_details[0]['create_date'];

    fileUploads = [];
    uploads     = '';
    root_document = response.data_details[0]['root_document'];
    root_address  = response.data_details[0]['root_address'];
    path_file     = response.data_details[0]['path_file'];
    file_name     = JSON.parse(response.data_details[0]['file_name']);

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
                        </div>`;
        }
    }
    $('#file_uploads_update').html(uploads);
    document.getElementById("file_uploads_update").style.display = "block";   

    $('#loading-1').hide();
}
function mapping_modal_reject(response){
    $('#ket_reject').val(response.data_details[0]['keterangan']);
    
    fileUploads = [];
    uploads     = '';
    root_document = response.data_details[0]['root_document'];
    root_address  = response.data_details[0]['root_address'];
    path_file     = response.data_details[0]['path_file'];
    file_name     = JSON.parse(response.data_details[0]['file_name_reject']);

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
    $('#file_uploads_reject').html(uploads);
    document.getElementById("file_uploads_reject").style.display = "block";   

    $('#loading-2').hide();
}
function clear_modal_jaminan(){
    $('#modal_nama_asuransi_jaminan').val('');
    $('#modal_tanggal_realisasi_jaminan').val('');
    $('#modal_nama_nasabah_jaminan').val('');
    $('#modal_jenis_jaminan_jaminan').val('');
    $('#modal_nama_jaminan_jaminan').val('');
    $('#modal_alamat_jaminan_jaminan').val('');
    $('#modal_pertanggungan_jaminan').val('');
    $('#modal_premi_jaminan').val('');
    $('#modal_kantor_jaminan').val('');
    $('#modal_rek_jaminan').val('');
    $('#modal_reff_asuransi_jaminan').val('');
    $('#modal_jenis_klaim_jaminan').val('');
    $('#modal_polis_jaminan').val('');
    $('#modal_no_transaksi_jaminan').val('');
    $('#modal_jenis_asuransi_jaminan').val('');
    send_mail   = '';
    email_insco = '';
    tgl_klaim   = '';
    document.getElementById("file_uploads_update").style.display = "none";
}
function prosees_upload(){
        
        if(fileUploads.length > 0){
            fileUploadsLength = fileUploads[0].length;
        }else{
            fileUploadsLength = 0;
        }

        var files = $('#modal_upload_reject')[0].files[0];

        console.log(fileUploads);
        $('#loading-2').show();
        var fd_up = new FormData();
        fd_up.append('files',files);
        fd_up.append('rekening',rekening);
        fd_up.append('jenis',jenis);
        fd_up.append('no_reff_asuransi', no_reff_asuransi);
        fd_up.append('no_transaksi', no_transaksi);
        fd_up.append('fileUploads',fileUploads);
        fd_up.append('fileUploadsLength',fileUploadsLength);
      
        
        $.ajax({
            url: base_url + "Asuransi/Proses_klaim_jaminan_controller/proses_upload_reject",
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
                        $('#loading-2').hide();
                        get_data_reject(rekening,jenis,no_reff_asuransi,no_transaksi);
                    });  
                    
            },
            error : function(response) {
                console.log(response);
                $('#loading-2').hide();
                $('#modal_reject').modal('hide');
                return Swal.fire({
                            icon: 'error',
                            title: 'Proses Gagal!',
                            text: 'Mohon Periksa Jaringan Anda'
                });
            }
        });
       
}

function proses_delete_upload_reject(){

        if(fileUploads.length > 0){
            fileUploadsLength = fileUploads[0].length;
        }else{
            fileUploadsLength = 0;
        }

        $.ajax({
                url : base_url + "Asuransi/Proses_klaim_jaminan_controller/proses_delete_upload_reject",
                type : "POST",
                dataType : "json",
                timeout : 180000,
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                data:{  "rekening"          : rekening,
                        "jenis"             : jenis,
                        "no_reff_asuransi"  : no_reff_asuransi,
                        "no_transaksi"      : no_transaksi,
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
                        $('#loading-2').hide();
                        get_data_reject(rekening,jenis,no_reff_asuransi,no_transaksi);
                    });  
                },
                error : function(response) {
                    console.log('failed :' + response);
                    $('#loading-1').hide();
                    return Swal.fire({
                        icon: 'error',
                        title: 'Proses Gagal',
                        text: 'Mohon Periksa Jaringan Anda'
                    });
                    
                }
        });   
}

function prosees_reject(){

       ket_reject = $('#ket_reject').val();

        $.ajax({
                url : base_url + "Asuransi/Proses_klaim_jaminan_controller/proses_reject",
                type : "POST",
                dataType : "json",
                timeout : 180000,
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                data:{  "rekening"          : rekening,
                        "jenis"             : jenis,
                        "no_reff_asuransi"  : no_reff_asuransi,
                        "no_transaksi"      : no_transaksi,
                        "ket_reject"        : ket_reject
                    },
                success : function(response) {
                    console.log(response);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Pengajuan Berhasil Di Reject',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(()=> {
                        $('#modal_reject').modal('hide');
                        get_data_jaminan();
                    });  
                },
                error : function(response) {
                    console.log('failed :' + response);
                    $('#loading-1').hide();
                    $('#modal_reject').modal('hide');
                    return Swal.fire({
                        icon: 'error',
                        title: 'Proses Gagal',
                        text: 'Mohon Periksa Jaringan Anda'
                    });
                    
                }
        });   
}
</script>