<script>
var base_url                     = $('#base_url').val(); 
var kd_kantor_user               = $('#user_kode_kantor').val(); 
var divisi_user                  = $('#user_divisi_id').val(); 
var select_kantor                = '';

//update btn
var jenis     = '';

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
});

$('#modal_flag_mutasi').on('click', function(){             

if(document.getElementById("modal_flag_mutasi").checked == true){
   // console.log('di check');
     $('#modal_flag_mutasi ').val(1);
}
if(document.getElementById("modal_flag_mutasi").checked == false){
   // console.log('tidak');
    $('#modal_flag_mutasi ').val(0);
}
});

$('#modal_flag_mutasi_update').on('click', function(){             

if(document.getElementById("modal_flag_mutasi_update").checked == true){
   // console.log('di check');
     $('#modal_flag_mutasi_update ').val(1);
}
if(document.getElementById("modal_flag_mutasi_update").checked == false){
   // console.log('tidak');
    $('#modal_flag_mutasi_update ').val(0);
}
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
    insert_master();


});
$('#tbl_body_rencana_realisasi').on('click','.btn_proses', function () {  


    jenis     = $(this).data("jenis");   

  //  console.log(jenis);
    get_details();
});
$('#tbl_body_rencana_realisasi').on('click','.btn_delete', function () {  

    jenis     = $(this).data("jenis");   

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
$('#src_search').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            search();
        }
    }); 
    function search(){
        data = '';
        src_search = $('#src_search').val();
        $('#tbl_rencana_realisasi').DataTable().clear();
        $('#tbl_rencana_realisasi').DataTable().destroy();
        $('#loading').show(); 
        
        $.ajax({
                url : base_url + "Accounting/Rencana_realisasi_master_controller/search",
                type : "POST",
                dataType : "json",
                timeout : 180000,
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                data:{  "src_search" : src_search},

                success : function(response) {
                    mapping_search(response);
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
function get_jenis(){
    $.ajax({
            url : base_url + "Accounting/Rencana_realisasi_master_controller/get_jenis",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
             //   console.log(response.sysdate);
                $.each(response.get_asuransi,function(i,data){
                    $('#modal_jenis').append('<option value="'+data.jenis+'">' + data.jenis +'</option>');
                });
                $('#modal_tgl_pembuatan').val(response.sysdate);
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
   
   $.ajax({
           url : base_url + "Accounting/Rencana_realisasi_master_controller/get_data_rencana_realisasi_master",
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
function get_details(){
   $('#loading').show();    
   $.ajax({
           url : base_url + "Accounting/Rencana_realisasi_master_controller/get_details",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           data:{"jenis"     : jenis,},
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
    for(i = 0; i < response.data_master.length; i++ ){
         data += `<tr style="text-align: center;">
                   
                     <td>${response.data_master[i]['jenis']}</td>
                     <td>${response.data_master[i]['kode_perk']}</td>
                     <td>${response.data_master[i]['flag_mutasi']}</td>
                
                   
                     <td>        
                         <button type="button" class="btn btn-primary btn-sm btn_proses" id="btn_proses"
                                 data-jenis="${response.data_master[i]['jenis']}"    
                                 'name="btn_proses">
                                 <i class="fa fa-pen"></i> </button>
                         <button type="button" class="btn btn-danger btn-sm btn_delete" id="btn_delete"   
                                 data-jenis="${response.data_master[i]['jenis']}"    
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
    $('#modal_jenis_update').val(response.data_detail[0]['jenis']);
    $('#modal_flag_mutasi_update').val(response.data_detail[0]['flag_mutasi']);
    $('#modal_kode_perk_update').val(response.data_detail[0]['kode_perk']);
    
    if(response.data_detail[0]['flag_mutasi'] == '1'){
        document.getElementById("modal_flag_mutasi_update").checked = true;
    }else{
        document.getElementById("modal_flag_mutasi_update").checked = false;
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

function insert_master(){
        var modal_jenis         = $('#modal_jenis').val();
        var modal_flag_mutasi   = $('#modal_flag_mutasi').val();
        var modal_kode_perk   = $('#modal_kode_perk').val();
        console.log(modal_jenis);
      

        let fd = new FormData();
        fd.append('modal_jenis',modal_jenis);
        fd.append('modal_flag_mutasi',modal_flag_mutasi);
        fd.append('modal_kode_perk',modal_kode_perk);
      
        $('#loading-1').show();
        
        $.ajax({
            url: base_url + "Accounting/Rencana_realisasi_master_controller/insert_master",
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
                    close_modal();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Proses Berhasil',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(()=> {
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
                            title: 'Gagal Insert',
                            text: 'Mohon Periksa Jaringan Anda'
                });
        }
    });
}
function delete_rencana(){
   $('#loading').show();  
   $.ajax({
           url : base_url + "Accounting/Rencana_realisasi_master_controller/delete_master",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           data:{"jenis"     : jenis},
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
    var modal_flag_mutasi_update    = $('#modal_flag_mutasi_update').val();
    var $modal_kode_perk_update    = $('#modal_kode_perk_update').val();


    var fd_up = new FormData();
    fd_up.append('modal_jenis_update',modal_jenis_update);
    fd_up.append('modal_flag_mutasi_update',modal_flag_mutasi_update);
    fd_up.append('modal_kode_perk_update',$modal_kode_perk_update);  
    fd_up.append('jenis',jenis);
    $('#loading-2').show();
        $.ajax({
            url: base_url + "Accounting/Rencana_realisasi_master_controller/update_master",
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
                    close_modal_update();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Sukses Update Rencana Realisasi',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(()=> {
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

function mapping_search(response){
    
        for(i = 0; i < response.rekap_jenis.length; i++ ){
            data += `<tr style="text-align:center">
                        <td>${response.rekap_jenis[i]['jenis']}</td>
                        <td>${response.rekap_jenis[i]['flag_mutasi']}</td>
                        <td>${response.rekap_jenis[i]['kode_perk']}</td>
                        <td>        
                         <button type="button" class="btn btn-primary btn-sm btn_proses" id="btn_proses"
                                 data-jenis="${response.rekap_jenis[i]['jenis']}"    
                                 'name="btn_proses">
                                 <i class="fa fa-pen"></i> </button>
                         <button type="button" class="btn btn-danger btn-sm btn_delete" id="btn_delete"   
                                 data-jenis="${response.rekap_jenis[i]['jenis']}"    
                                 'name="btn_delete">
                                 <i class="fa fa-trash"></i> </button>
                     </td>
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

</script>