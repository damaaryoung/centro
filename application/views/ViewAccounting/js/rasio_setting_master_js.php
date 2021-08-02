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
    getData();
    $('#loading-1').hide();
});


$('#btn_add_rasio').click(function () {
    $('#modal_rasio').modal({
            backdrop: 'static',
            keyboard: true, 
            show: true
    }); 
});
$('#btn_simpan').click(function () {
    insert_master();
});

$('#tbl_body_rasio_master').on('click','.btn_proses', function () {  
    jenis     = $(this).data("jenis");   
    get_details();
});
$('#tbl_body_rasio_master').on('click','.btn_delete', function () {  

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
    update_master(); 
});
$('#btn_search').click(function () {
    search(); 
});

function close_modal(){
    clear_modal();
    $('#loading-1').hide();
    $('#modal_rasio').modal('hide');
}
function clear_modal(){
    $('#modal_jenis').val('');
    $('#modal_kode_perk1').val('');
    $('#modal_kode_perk2').val('');
    $('#modal_flag_mutasi').val('');
}
function close_modal_update(){
    clear_modal_update();
    $('#modal_rasio_update').modal('hide');
}
function clear_modal_update(){
    $('#modal_jenis_update').val('');
    $('#modal_kode_perk1_update').val('');
    $('#modal_kode_perk2_update').val('');
    document.getElementById("modal_flag_mutasi_update").checked = false;
}

$('#src_search').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            search();
        }
}); 
function search(){
        data = '';
        var src_search = $('#src_search').val();
        $('#tbl_rasio_master').DataTable().clear();
        $('#tbl_rasio_master').DataTable().destroy();
        $('#loading').show(); 
        
        $.ajax({
                url : base_url + "Accounting/Rasio_setting_controller/search_data_rasio_master",
                type : "POST",
                dataType : "json",
                timeout : 180000,
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                data:{  "src_search" : src_search},

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


function getData(){
   data = '';
   $('#tbl_rasio_master').DataTable().clear();
   $('#tbl_rasio_master').DataTable().destroy();
   $('#loading').show(); 
   $.ajax({
           url : base_url + "Accounting/Rasio_setting_controller/get_data_rasio_master",
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
function get_details(){
   $('#loading').show();    
   $.ajax({
           url : base_url + "Accounting/Rasio_setting_controller/get_details",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           data:{"jenis"     : jenis},
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
                     <td>${response.data_master[i]['kode_perk1']}</td>
                     <td>${response.data_master[i]['kode_perk2']}</td>
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
     $('#tbl_rasio_master > tbody:first').html(data);
     
     $(document).ready(function() {
         $('#tbl_rasio_master').DataTable( {
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
    $('#modal_rasio_update').modal('show');
    $('#modal_jenis_update').val(response.data_detail[0]['jenis']);
    $('#modal_kode_perk1_update').val(response.data_detail[0]['kode_perk1']);
    $('#modal_kode_perk2_update').val(response.data_detail[0]['kode_perk2']);    
    if(response.data_detail[0]['flag_mutasi'] == '1'){
        document.getElementById("modal_flag_mutasi_update").checked = true;
    }else{
        document.getElementById("modal_flag_mutasi_update").checked = false;
    }
                        
}


function insert_master(){
        var modal_jenis         = $('#modal_jenis').val();
        var modal_kode_perk1    = $('#modal_kode_perk1').val();
        var modal_kode_perk2    = $('#modal_kode_perk2').val();
        var modal_flag_mutasi   = '';
        
        if (document.getElementById('modal_flag_mutasi').checked) {
            modal_flag_mutasi = '1';
        } else {
            modal_flag_mutasi = '0';
        }
        console.log(modal_jenis);
      

        let fd = new FormData();
        fd.append('modal_jenis',modal_jenis);
        fd.append('modal_kode_perk1',modal_kode_perk1);
        fd.append('modal_kode_perk2',modal_kode_perk2);
        fd.append('modal_flag_mutasi',modal_flag_mutasi);
      
        $('#loading-1').show();
        
        $.ajax({
            url: base_url + "Accounting/Rasio_setting_controller/insert_master",
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
           url : base_url + "Accounting/Rasio_setting_controller/delete_rencana",
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
                   title: 'Sukses Hapus Data Rasio Master',
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
                   title: 'Gagal Delete Data!',
                   text: 'Mohon Periksa Jaringan Anda'
               });
           }
   });    
}
function update_master(){
    var modal_jenis_update       = $('#modal_jenis_update').val();
    
    var modal_jenis_update         = $('#modal_jenis_update').val();
    var modal_kode_perk1_update    = $('#modal_kode_perk1_update').val();
    var modal_kode_perk2_update    = $('#modal_kode_perk2_update').val();
    var modal_flag_mutasi_update   = '';
    
    if (document.getElementById('modal_flag_mutasi_update').checked) {
        modal_flag_mutasi_update = '1';
    } else {
        modal_flag_mutasi_update = '0';
    }


    var fd_up = new FormData();
    fd_up.append('modal_jenis_update',modal_jenis_update);
    fd_up.append('modal_kode_perk1_update',modal_kode_perk1_update);
    fd_up.append('modal_kode_perk2_update',modal_kode_perk2_update);
    fd_up.append('modal_flag_mutasi_update',modal_flag_mutasi_update); 
    fd_up.append('jenis',jenis);
    $('#loading-2').show();
        $.ajax({
            url: base_url + "Accounting/Rasio_setting_controller/update_master",
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
                        title: 'Sukses Update Rasio Master',
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


</script>