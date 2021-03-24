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

$(document).ready(function () {            
   bsCustomFileInput.init();
   $('.select2').select2();
   $('#src_kode_kantor').append('<option value="' + kd_kantor_user + '" selected>'+ kd_kantor_user +'</option>');
   
   getData();
   if(kd_kantor_user == '00' || divisi_user == 'IT'){
       select_kantor = '0';
       get_kode_kantor();
   }
   
   $('#loading-1').hide();
});
$('#modal_limit_kas').on('input', function() {
    var money = accounting.formatMoney($('#modal_limit_kas').val(), '', 0, ',', '.');
    $('#modal_limit_kas').val(money);
});
$('#modal_saldo_akhir_kas').on('input', function() {
    var money = accounting.formatMoney($('#modal_saldo_akhir_kas').val(), '', 0, ',', '.');
    $('#modal_saldo_akhir_kas').val(money);
});
$('#modal_limit_kas_update').on('input', function() {
    var money = accounting.formatMoney($('#modal_limit_kas_update').val(), '', 0, ',', '.');
    $('#modal_limit_kas_update').val(money);
});
$('#modal_saldo_akhir_kas_update').on('input', function() {
    var money = accounting.formatMoney($('#modal_saldo_akhir_kas_update').val(), '', 0, ',', '.');
    $('#modal_saldo_akhir_kas_update').val(money);
});
$('#btn_pengajuan').click(function () {
    get_asuransi();
    $('#modal_kantor_cabang').append('<option value="' + kd_kantor_user + '" selected>'+ kd_kantor_user +'</option>');
   select_kantor = '1';
    if(kd_kantor_user == '00' || divisi_user == 'IT'){ 
        get_kode_kantor();
    }
    $('#modal_pengajuan_klaim_cis').modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
    }); 
});
$('#btn_simpan').click(function () {
    pengajuan_klaim_jiwa_process();
});
$('#tbl_body_cis').on('click','.btn_proses', function () {  
    id           = $(this).data("id");
    no_transaksi = $(this).data("no-trans");
       get_details();
});
$('#tbl_body_cis').on('click','.btn_delete', function () {  
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
    
    if($('#modal_upload_update')[0].files[0] == null){
        
        Swal.fire({
           title: 'Anda Belum Memilih File Attachment Untuk Di Upload!',
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
                upload_update = '0';
                update_cis();    
             });
           },
           allowOutsideClick: false     
        });
     
    }else{
        upload_update = '1';
        update_cis();    
    }
});
$('#btn_refresh').click(function () {
    getData();
});
/// function here //
function getData(){
   data = '';
   $('#tbl_cis').DataTable().clear();
   $('#tbl_cis').DataTable().destroy();
   $('#loading').show(); 
   
   $.ajax({
           url : base_url + "Asuransi/Cash_in_save_controller/get_data_cis",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
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
function pengajuan_klaim_jiwa_process(){
        var modal_nama_asuransi   = $('#modal_nama_asuransi').val();
        var modal_tgl_cover       = $('#modal_tgl_cover').val();
        var modal_kantor_cabang   = $('#modal_kantor_cabang').val();
        var modal_limit_kas       = accounting.unformat($('#modal_limit_kas').val()); 
        var modal_saldo_akhir_kas = accounting.unformat($('#modal_saldo_akhir_kas').val());

        if($('#modal_upload')[0].files[0] == null){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Anda Belum Memilih File Attachment Untuk Di Upload!'
            });
        }

        let fd = new FormData();
        let files = $('#modal_upload')[0].files[0];
        fd.append('files',files);
        fd.append('modal_nama_asuransi',modal_nama_asuransi);
        fd.append('modal_tgl_cover',modal_tgl_cover);
        fd.append('modal_kantor_cabang',modal_kantor_cabang);
        fd.append('modal_limit_kas',modal_limit_kas);
        fd.append('modal_saldo_akhir_kas',modal_saldo_akhir_kas);
        $('#loading-1').show();
        console.log(modal_nama_asuransi,modal_tgl_cover,modal_kantor_cabang,modal_limit_kas,modal_saldo_akhir_kas);

        $.ajax({
            url: base_url + "Asuransi/Cash_in_save_controller/pengajuan_cis",
            type:"POST",
            timeout : 240000,
            data:fd,
            processData:false,
            contentType:false,
            cache:false,  
            dataType: 'json',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            success : function(response) {
            
                    $('#loading-2').hide();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Sukses Pengajuan Asuransi Cash In Save',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(()=> {
                        close_modal();
                        getData();
                    });  
                    console.log(response);
            },
            error : function(response) {
                console.log(response);
                $('#loading-1').hide();
                close_modal()
                return Swal.fire({
                            icon: 'error',
                            title: 'Gagal Pengajuan Asuransi Cash In Save!',
                            text: 'Mohon Periksa Jaringan Anda'
                });
        }
    });
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
function update_cis(){
    id_update           = $('#id_update').val();
    no_transaksi_update = $('#no_transaksi_update').val();
    modal_nama_asuransi_update = $('#modal_nama_asuransi_update').val();
    modal_kantor_cabang_update = $('#modal_kantor_cabang_update').val();
    modal_tgl_cover_update = $('#modal_tgl_cover_update').val();
    modal_limit_kas_update = accounting.unformat($('#modal_limit_kas_update').val());
    modal_saldo_akhir_kas_update = accounting.unformat($('#modal_saldo_akhir_kas_update').val());

    if(upload_update == '0'){
         var fd_up = new FormData();
         fd_up.append('id_update',id_update);
         fd_up.append('no_transaksi_update',no_transaksi_update);
         fd_up.append('modal_nama_asuransi_update',modal_nama_asuransi_update);
         fd_up.append('modal_kantor_cabang_update',modal_kantor_cabang_update);
         fd_up.append('modal_tgl_cover_update',modal_tgl_cover_update);
         fd_up.append('modal_limit_kas_update',modal_limit_kas_update);
         fd_up.append('modal_saldo_akhir_kas_update',modal_saldo_akhir_kas_update);
    }else if(upload_update == '1'){
        var fd_up = new FormData();
        let files = $('#modal_upload_update')[0].files[0];
        
        fd_up.append('files',files);
        fd_up.append('id_update',id_update);
        fd_up.append('no_transaksi_update',no_transaksi_update);
        fd_up.append('modal_nama_asuransi_update',modal_nama_asuransi_update);
        fd_up.append('modal_kantor_cabang_update',modal_kantor_cabang_update);
        fd_up.append('modal_tgl_cover_update',modal_tgl_cover_update);
        fd_up.append('modal_limit_kas_update',modal_limit_kas_update);
        fd_up.append('modal_saldo_akhir_kas_update',modal_saldo_akhir_kas_update);
    }
    fd_up.append('upload_update',upload_update);
    $('#loading-2').show();
        $.ajax({
            url: base_url + "Asuransi/Cash_in_save_controller/update_cis",
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
                        title: 'Sukses Update Pengajuan Asuransi CIS',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(()=> {
                        close_modal_update();
                        getData();
                    });  
                    
            },
            error : function(response) {
                console.log(response);
                $('#loading-2').hide();
                close_modal_update();
                return Swal.fire({
                            icon: 'error',
                            title: 'Gagal Update Pengajuan CIS!',
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
            text: 'Status Pengajuan PROSES'
        });
    }else if(status == '2'){
        return Swal.fire({
            icon: 'error',
            title: 'Tidak Dapat Hapus Data!',
            text: 'Status Pengajuan DONE'
        });
    }  
    $('#loading').show();  
    $.ajax({
            url : base_url + "Asuransi/Cash_in_save_controller/delete_cis",
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
                    title: 'Sukses Hapus Data Pengajuan Asuransi CIS',
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

function mapping(response){
     for(i = 0; i < response.data_cis.length; i++ ){
         data += `<tr>
                     <td>${response.data_cis[i]['tgl_cover']}</td>
                     <td>${response.data_cis[i]['nama_asuransi']}</td>
                     <td>${response.data_cis[i]['nama_kantor']}</td>
                     <td>${accounting.formatMoney(response.data_cis[i]['limit_kas'], '', 0, ',', '.')}</td>
                     <td>${accounting.formatMoney(response.data_cis[i]['saldo_kas'], '', 0, ',', '.')}</td>
                     <td>${response.data_cis[i]['status']}</td>
                     <td>        
                         <button type="button" class="btn btn-primary btn-sm btn_proses" id="btn_proses"
                                 data-id="${response.data_cis[i]['id']}"
                                 data-no-trans="${response.data_cis[i]['no_transaksi']}"    
                                 'name="btn_proses">
                                 <i class="fa fa-pen"></i> </button>
                         <button type="button" class="btn btn-danger btn-sm btn_delete" id="btn_delete"
                                 data-id="${response.data_cis[i]['id']}"
                                 data-no-trans="${response.data_cis[i]['no_transaksi']}"    
                                 data-status="${response.data_cis[i]['status_no']}"   
                                 'name="btn_proses">
                                 <i class="fa fa-trash"></i> </button>
                     </td>
                 </tr>`;
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
function close_modal(){
    clear_modal();
    $('#loading-1').hide();
    $('#modal_pengajuan_klaim_cis').modal('hide');
}
function clear_modal(){
    $('#modal_nama_asuransi').find('option').remove().end();
    $('#modal_kantor_cabang').find('option').remove().end();
    $('#modal_tgl_cover').val('');
    $('#modal_limit_kas').val('');
    $('#modal_saldo_akhir_kas').val('');
    document.getElementById('modal_upload').value = null;
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
    $.each(response.get_asuransi,function(i,data){
        $('#modal_nama_asuransi_update').append('<option value="'+data.kode+'">' + data.nama +'</option>');
    });
    $('#modal_kantor_cabang_update').append('<option value="' + kd_kantor_user + '">'+ kd_kantor_user +'</option>');
    if(kd_kantor_user == '00' || divisi_user == 'IT'){
        $.each(response.kode_kantor,function(i,data){
            $('#modal_kantor_cabang_update').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
        });
    }

    document.getElementById("attachment_update").href = response.data_cis[0]['root_address'] + response.data_cis[0]['path_file'];
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
    document.getElementById("attachment_update").href = '';
}

</script>