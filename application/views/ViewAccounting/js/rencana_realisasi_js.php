<script>
var base_url                     = $('#base_url').val(); 
var kd_kantor_user               = $('#user_kode_kantor').val(); 
var divisi_user                  = $('#user_divisi_id').val(); 
var select_kantor                = '';

//update btn
var kd_kantor = '';
var jenis     = '';
var tgl       = '';



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
    get_sysdate();  
   
    $('#loading-1').hide();
});

$('#modal_rencana').on('change', function() {
    var money = accounting.formatMoney($('#modal_rencana').val(), '', 2, ',', '.');
    $('#modal_rencana').val(money);
});
$('#modal_realisasi').on('change', function() {
    var money = accounting.formatMoney($('#modal_realisasi').val(), '', 2, ',', '.');
    $('#modal_realisasi').val(money);
});
$('#modal_rasio').on('change', function() {
    var money = accounting.formatMoney($('#modal_rasio').val(), '', 2, ',', '.');
    $('#modal_rasio').val(money);
});

$('#modal_rencana_update').on('change', function() {
    var money = accounting.formatMoney($('#modal_rencana_update').val(), '', 2, ',', '.');
    $('#modal_rencana_update').val(money);
});
$('#modal_realisasi_update').on('change', function() {
    var money = accounting.formatMoney($('#modal_realisasi_update').val(), '', 2, ',', '.');
    $('#modal_realisasi_update').val(money);
});
$('#modal_rasio_update').on('change', function() {
    var money = accounting.formatMoney($('#modal_rasio_update').val(), '', 2, ',', '.');
    $('#modal_rasio_update').val(money);
});

$('#btn_add_rencana').click(function () {
    get_jenis();
    select_kantor = '1';
    $('#modal_kantor_cabang').append('<option value="' + kd_kantor_user + '" selected>'+ kd_kantor_user +'</option>');
    if(kd_kantor_user == '00' || divisi_user == 'IT'){ 
        get_kode_kantor();
    }
    $('#modal_rencana_realisasi').modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
    }); 
});
$('#btn_simpan').click(function () {
    insert_rencana();
});
$('#tbl_body_rencana_realisasi').on('click','.btn_proses', function () {  

    kd_kantor = $(this).data("kd_kantor");
    jenis     = $(this).data("jenis");   
    tgl       = $(this).data("tgl"); 
    console.log(kd_kantor,jenis, tgl);
    get_details();
});
$('#tbl_body_rencana_realisasi').on('click','.btn_delete', function () {  
    kd_kantor = $(this).data("kd_kantor");
    jenis     = $(this).data("jenis");   
    tgl       = $(this).data("tgl"); 
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
            delete_rencana();   
         });
       },
       allowOutsideClick: false     
    });
});
$('#btn_simpan_update').click(function () {
    update_rencana(); 
});



function get_kode_kantor(){
    $.ajax({
            url : base_url + "Accounting/Rencana_realisasi_controller/get_kode_kantor",
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
                }else if(select_kantor == '1'){
                    $.each(response.kode_kantor,function(i,data){
                        $('#modal_kode_kantor').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
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
function get_sysdate(){
    $.ajax({
            url : base_url + "Accounting/Rencana_realisasi_controller/get_sysdate",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
                $('#src_tgl_laporan').val(response.sysdate);
                getData();
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Get Tanggal Sistem!',
                    text: 'Mohon Periksa Jaringan Anda'
                });
                
            }
    });    
}
function get_jenis(){
    $.ajax({
            url : base_url + "Accounting/Rencana_realisasi_controller/get_jenis",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
                console.log(response.sysdate);
                $.each(response.get_asuransi,function(i,data){
                    $('#modal_jenis').append('<option value="'+data.jenis+'">' + data.jenis +'</option>');
                });
                $('#modal_tgl_laporan').val(response.sysdate);
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

function getData(){
   data = '';
   $('#tbl_rencana_realisasi').DataTable().clear();
   $('#tbl_rencana_realisasi').DataTable().destroy();
   $('#loading').show(); 
   var src_kode_kantor =  $('#src_kode_kantor').val();
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   $.ajax({
           url : base_url + "Accounting/Rencana_realisasi_controller/get_data_rencana_realisasi",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
            data:{"src_kode_kantor" : src_kode_kantor,
                  "src_tgl_laporan" : src_tgl_laporan},
           success : function(response) {
               $('#src_tgl_realisasi').val(response.sysdate);
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
function get_details(){
   $('#loading').show();    
   $.ajax({
           url : base_url + "Accounting/Rencana_realisasi_controller/get_details",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           data:{"kd_kantor" : kd_kantor,
                 "jenis"     : jenis,
                 "tgl"       : tgl},
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

function mapping(response){
    for(i = 0; i < response.data_rencana.length; i++ ){
         data += `<tr style="text-align: center;">
                     <td>${response.data_rencana[i]['kode_kantor']} - ${response.data_rencana[i]['nama_kantor']}</td>
                     <td>${response.data_rencana[i]['jenis']}</td>
                     <td>${response.data_rencana[i]['tgl_laporan']}</td>
                     <td>${accounting.formatMoney(response.data_rencana[i]['rencana'], '', 2, ',', '.')}</td>
                     <td>${accounting.formatMoney(response.data_rencana[i]['realisasi'], '', 2, ',', '.')}</td>
                     <td>${accounting.formatMoney(response.data_rencana[i]['rasio'], '', 2, ',', '.')}</td>
                     <td>        
                         <button type="button" class="btn btn-primary btn-sm btn_proses" id="btn_proses"
                                 data-kd_kantor="${response.data_rencana[i]['kode_kantor']}"
                                 data-jenis="${response.data_rencana[i]['jenis']}"    
                                 data-tgl="${response.data_rencana[i]['tgl_laporan']}" 
                                 'name="btn_proses">
                                 <i class="fa fa-pen"></i> </button>
                         <button type="button" class="btn btn-danger btn-sm btn_delete" id="btn_delete"
                                 data-kd_kantor="${response.data_rencana[i]['kode_kantor']}"
                                 data-jenis="${response.data_rencana[i]['jenis']}"    
                                 data-tgl="${response.data_rencana[i]['tgl_laporan']}"   
                                 'name="btn_delete">
                                 <i class="fa fa-trash"></i> </button>
                     </td>
                     </tr>
                   `;
     }
     $('#tbl_rencana_realisasi > tbody:first').html(data);
     
     $(document).ready(function() {
         $('#tbl_rencana_realisasi').DataTable( {
             "destroy": true,
             "scrollX": true,
             "autoWidth" : false,
             "searching": false,
             "aaSorting" : []
         } );
     } );
     $('#loading').hide(); 
}

function mapping_update(response){
    $('#loading-2').hide(); 
    $('#modal_rencana_realisasi_update').modal('show');
    $('#modal_jenis_update').append('<option value="'+response.data_detail[0]['jenis']+'">' + response.data_detail[0]['jenis'] + '</option>');
    $('#modal_kode_kantor_update').append('<option value="'+response.data_detail[0]['kode_kantor']+'" selected>' + response.data_detail[0]['kode_kantor'] + ' - ' + response.data_detail[0]['nama_kantor'] +'</option>');
    $('#modal_tgl_laporan_update').val(response.data_detail[0]['tgl_laporan']);
    $('#modal_rencana_update').val(accounting.formatMoney(response.data_detail[0]['rencana'], '', 2, ',', '.'));
    $('#modal_realisasi_update').val(accounting.formatMoney(response.data_detail[0]['realisasi'], '', 2, ',', '.'));
    $('#modal_rasio_update').val(accounting.formatMoney(response.data_detail[0]['rasio'], '', 2, ',', '.'));
   
   
    $.each(response.get_asuransi,function(i,data){
        $('#modal_jenis_update').append('<option value="'+data.jenis+'">' + data.jenis +'</option>');
    });
    $('#modal_kode_kantor_update').append('<option value="' + kd_kantor_user + '">'+ kd_kantor_user +'</option>');
    if(kd_kantor_user == '00' || divisi_user == 'IT'){
        $.each(response.kode_kantor,function(i,data){
            $('#modal_kode_kantor_update').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
        });
    }

}

function close_modal(){
    clear_modal();
    $('#loading-1').hide();
    $('#modal_rencana_realisasi').modal('hide');
}
function clear_modal(){
    $('#modal_jenis').find('option').remove().end();
    $('#modal_kode_kantor').find('option').remove().end();
    $('#modal_tgl_laporan').val('');
    $('#modal_rencana').val('');
    $('#modal_realisasi').val('');
    $('#modal_rasio').val('');
}
function close_modal_update(){
    clear_modal_update();
    $('#modal_rencana_realisasi_update').modal('hide');
}
function clear_modal_update(){
    $('#modal_jenis_update').find('option').remove().end();
    $('#modal_kode_kantor_update').find('option').remove().end();
    $('#modal_tgl_laporan_update').val('');
    $('#modal_rencana_update').val('');
    $('#modal_realisasi_update').val('');
    $('#modal_rasio_update').val('');
}

function insert_rencana(){
        var modal_jenis         = $('#modal_jenis').val();
        var modal_kode_kantor   = $('#modal_kode_kantor').val();
        var modal_tgl_laporan   = $('#modal_tgl_laporan').val();
        var modal_rencana       = accounting.unformat($('#modal_rencana').val()); 
        var modal_realisasi     = accounting.unformat($('#modal_realisasi').val());
        var modal_rasio         = accounting.unformat($('#modal_rasio').val());

        console.log(modal_rasio);
      

        let fd = new FormData();
        fd.append('modal_jenis',modal_jenis);
        fd.append('modal_kode_kantor',modal_kode_kantor);
        fd.append('modal_tgl_laporan',modal_tgl_laporan);
        fd.append('modal_rencana',modal_rencana);
        fd.append('modal_realisasi',modal_realisasi);
        fd.append('modal_rasio',modal_rasio);
        $('#loading-1').show();
        
        $.ajax({
            url: base_url + "Accounting/Rencana_realisasi_controller/insert_rencana",
            type:"POST",
            timeout : 240000,
            data:fd,
            processData:false,
            contentType:false,
            cache:false,  
            dataType: 'json',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            success : function(response) {            
                    $('#loading-1').hide();  
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Proses Berhasil',
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
function delete_rencana(){
   $('#loading').show();  
   $.ajax({
           url : base_url + "Accounting/Rencana_realisasi_controller/delete_rencana",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           data:{"kd_kantor" : kd_kantor,
                 "jenis"     : jenis,
                 "tgl"       : tgl},
           success : function(response) {
               Swal.fire({
                   position: 'center',
                   icon: 'success',
                   title: 'Sukses Hapus Data Rencana Realisasi',
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
function update_rencana(){
    var modal_jenis_update       = $('#modal_jenis_update').val();
    var modal_kode_kantor_update    = $('#modal_kode_kantor_update').val();
    var modal_tgl_laporan_update    = $('#modal_tgl_laporan_update').val();
    var modal_rencana_update        = accounting.unformat($('#modal_rencana_update').val()); 
    var modal_realisasi_update      = accounting.unformat($('#modal_realisasi_update').val());
    var modal_rasio_update          = accounting.unformat($('#modal_rasio_update').val());

    
    var fd_up = new FormData();
    fd_up.append('modal_jenis_update',modal_jenis_update);
    fd_up.append('modal_kode_kantor_update',modal_kode_kantor_update);
    fd_up.append('modal_tgl_laporan_update',modal_tgl_laporan_update);
    fd_up.append('modal_rencana_update',modal_rencana_update);
    fd_up.append('modal_realisasi_update',modal_realisasi_update);
    fd_up.append('modal_rasio_update',modal_rasio_update);
    fd_up.append('kd_kantor',kd_kantor);
    fd_up.append('jenis',jenis);
    fd_up.append('tgl',tgl);
    
    
    $('#loading-2').show();
        $.ajax({
            url: base_url + "Accounting/Rencana_realisasi_controller/update_rencana",
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
                        title: 'Sukses Update Rencana Realisasi',
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
                            title: 'Gagal Update!',
                            text: 'Mohon Periksa Jaringan Anda'
                });
            }
        });
       


}

</script>