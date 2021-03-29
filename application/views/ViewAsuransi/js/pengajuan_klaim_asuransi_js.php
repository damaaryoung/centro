<script>

var menu_kode               = <?php echo $this->session->userdata('pengajuan_klaim');?>;
var kd_kantor_user = '<?php echo $this->session->userdata('kd_cabang'); ?>';
var divisi_user    = '<?php echo $this->session->userdata('divisi_id'); ?>';
var base_url                = $('#base_url').val(); 
var modal_rek_polis_jaminan = '';
var modal_rek_jaminan = '';
var modal_reff_asuransi_jaminan = '';
var modal_jenis_klaim_jaminan = '';
var data = '';
var uploads = '';
var data_asuransi = '';
var upload_update = '';
var data_kd_kantor = '';
var src_kode_kantor = '';
var src_search = '';
var modal_rek_polis_jiwa = '';
var modal_rek_jiwa           = '';
var modal_reff_asuransi_jiwa = '';
var modal_jenis_klaim_jiwa   = '';
var up_rek = '';
var up_polis = '';
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
        $('#src_kode_kantor').append('<option value="' + kd_kantor_user + '" selected>'+ kd_kantor_user +'</option>');
        
        if(menu_kode == '1'){
            $('#loading-1').hide();
            get_data_jaminan();
        } else if(menu_kode == '2'){
            $('#loading-2').hide();
            get_data_jiwa();
        }


        if(kd_kantor_user == '00' || divisi_user == 'IT'){
            get_kode_kantor();
        }

    });
    
    /// PENGAJUAN KLAIM JAMINAN ///
    $('#search_jaminan').click(function () {
        get_data_cover_jaminan();
    });
    $('#btn_simpan_modal_jaminan').click(function () {
        pengajuan_klaim_jaminan_process();
    });
    $('#modal_rek_polis_jaminan').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            get_data_cover_jaminan();
        }
    }); 
    $('#table_body_pengajuan_klaim_jaminan').on('click','.btn_update_jaminan', function () {    
        rekening      = $(this).data("rekening");
        jenis         = $(this).data("jenis");
        no_reff_asuransi = $(this).data("noreff-asuransi");
        no_transaksi = $(this).data("no-trans");
        get_data_update(rekening,jenis,no_reff_asuransi,no_transaksi);
           
    });
    $('#table_body_pengajuan_klaim_jaminan').on('click','.btn_delete_jaminan', function () {    
        rekening      = $(this).data("rekening");
        jenis         = $(this).data("jenis");
        no_reff_asuransi = $(this).data("noreff-asuransi");
        status_jaminan = $(this).data("status");
        no_transaksi = $(this).data("no-trans");
        
        
        if(status_jaminan == 'PROSES'){
            return Swal.fire({
                icon: 'error',
                title: 'Tidak Dapat Delete Data!',
                text: 'Status Data Sudah dalam Proses Klaim Asuransi!'
            });
        }
        delete_klaim_jaminan(rekening,jenis,no_transaksi);
        
       
    });
    $('#btn_refresh').click(function(event) {
        if(menu_kode == '1'){
            get_data_jaminan();
        } else if(menu_kode == '2'){
            get_data_jiwa();
        }
    });
    $('#btn_simpan_modal_jaminan_update').click(function () {
            proses_update();
    });
    $('#src_search').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            get_search();
        }
    });
    ///END PENGAJUAN KLAIM JAMINAN ///

    /// PENGAJUAN KLAIM JIWA ////
    $('#btn_simpan_modal_jiwa').click(function () {
        pengajuan_klaim_jiwa_process();
    });
    $('#modal_rek_polis_jiwa').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            get_data_cover_jiwa();
        }
    }); 
    $('#search_jiwa').click(function () {
        get_data_cover_jiwa();
    });
    $("#src_kode_kantor").change(function(){
        if(menu_kode == '1'){
            get_data_jaminan();
        } else if(menu_kode == '2'){
            get_data_jiwa();
        }
    });
    $('#table_body_pengajuan_klaim_jaminan').on('click','.btn_update_jiwa', function () {    
        rekening         = $(this).data("rekening");
        jenis            = $(this).data("jenis");
        no_reff_asuransi = $(this).data("noreff-asuransi");
        no_transaksi     = $(this).data("no-trans");
        get_data_update_jiwa(rekening,jenis,no_reff_asuransi,no_transaksi);
           
    });
    $('#btn_simpan_modal_jiwa_update').click(function () {
         
         if($('#modal_upload_jiwa_update')[0].files[0] == null){
             
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
                     proses_update_jiwa(upload_update);
     
                 });
                },
                allowOutsideClick: false     
             });
          
         }else{
             upload_update = '1';
             proses_update_jiwa(upload_update);
         }
     });
    
    ///END PENGAJUAN KLAIM JIWA ///

    $('#btn_upload').click(function(event) {
        prosees_upload();
    });
    $('#btn_upload_jaminan').click(function(event) {
        prosees_upload_update();
    });

    $('#btn_upload_jiwa').click(function(event) {
        prosees_upload();
    });
    $('#btn_upload_jiwa_update').click(function(event) {
        prosees_upload_update();
    });
    
    $('#file_uploads').on('click','.btn_del_file', function () { 
        del_name      = $(this).data("file-name");
        for(i = 0; i < fileUploads[0].length; i++ ){
            var del_compare = fileUploads[0][i].toString();
            if(del_compare == del_name){
                fileUploads[0].splice(i, 1);
            }
        }
        proses_delete_upload();
    });
    $('#file_uploads_update').on('click','.btn_del_file', function () { 
        del_name      = $(this).data("file-name");
        for(i = 0; i < fileUploads[0].length; i++ ){
            var del_compare = fileUploads[0][i].toString();
            if(del_compare == del_name){
                fileUploads[0].splice(i, 1);
            }
        }
        proses_delete_upload_update();
    });

    $('#file_uploads_jiwa').on('click','.btn_del_file', function () { 
        del_name      = $(this).data("file-name");
        for(i = 0; i < fileUploads[0].length; i++ ){
            var del_compare = fileUploads[0][i].toString();
            if(del_compare == del_name){
                fileUploads[0].splice(i, 1);
            }
        }
        proses_delete_upload();
    });
    $('#file_uploads_jiwa_update').on('click','.btn_del_file', function () { 
        del_name      = $(this).data("file-name");
        for(i = 0; i < fileUploads[0].length; i++ ){
            var del_compare = fileUploads[0][i].toString();
            if(del_compare == del_name){
                fileUploads[0].splice(i, 1);
            }
        }
        proses_delete_upload_update();
    });

    

    
    
    

    //// FUNCTION HERE ////
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
    function get_search(){
        data = [];
        $('#loading').show(); 
        
        $('#tbl_pengajuan_klaim_jaminan').DataTable().clear();
        $('#tbl_pengajuan_klaim_jaminan').DataTable().destroy();
        src_search = $('#src_search').val();
        console.log(src_kode_kantor);

        $.ajax({
                url : base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/get_data_search",
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
    function mapping_get_data(response){
        if(menu_kode == '1'){
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
                                    'name="btn_update_jaminan">
                                    <i class="fa fa-pen"></i> </button>
                            <button type="button" class="btn btn-danger btn-sm btn_delete_jaminan" id="btn_delete_jaminan"
                                    data-rekening="${response.klaim_jaminan[i]['no_rekening']}"
                                    data-jenis="${response.klaim_jaminan[i]['jenis_asuransi']}"  
                                    data-noreff-asuransi="${response.klaim_jaminan[i]['no_reff_asuransi']}"  
                                    data-status="${response.klaim_jaminan[i]['status_klaim']}" 
                                    data-no-trans="${response.klaim_jaminan[i]['no_transaksi']}" 
                                    'name="btn_delete_jaminan">
                                    <i class="fa fa-trash"></i> </button>
                        </td>
                    </tr>`;
            }

        }else if(menu_kode == '2'){
            for(i = 0; i < response.klaim_jaminan.length; i++ ){
                data += `<tr style="text-align: center;">
                        <td>${response.klaim_jaminan[i]['TGL_REALISASI']}</td>
                        <td>${response.klaim_jaminan[i]['no_rekening']}</td>
                        <td>${response.klaim_jaminan[i]['NAMA_NASABAH']}</td>
                        <td>${response.klaim_jaminan[i]['jenis_jaminan']}</td>
                        <td>${response.klaim_jaminan[i]['jenis_klaim']}</td>
                        <td>${response.klaim_jaminan[i]['status_klaim']}</td>
                        <td>        
                            <button type="button" class="btn btn-primary btn-sm btn_update_jiwa" id="btn_update_jiwa"
                                    data-rekening="${response.klaim_jaminan[i]['no_rekening']}"
                                    data-jenis="${response.klaim_jaminan[i]['jenis_asuransi']}"  
                                    data-noreff-asuransi="${response.klaim_jaminan[i]['no_reff_asuransi']}"  
                                    data-status="${response.klaim_jaminan[i]['status_klaim']}" 
                                    data-no-trans="${response.klaim_jaminan[i]['no_transaksi']}" 
                                    'name="btn_update_jiwa">
                                    <i class="fa fa-pen"></i> </button>
                            <button type="button" class="btn btn-danger btn-sm btn_delete_jaminan" id="btn_delete_jaminan"
                                    data-rekening="${response.klaim_jaminan[i]['no_rekening']}"
                                    data-jenis="${response.klaim_jaminan[i]['jenis_asuransi']}"  
                                    data-noreff-asuransi="${response.klaim_jaminan[i]['no_reff_asuransi']}"  
                                    data-status="${response.klaim_jaminan[i]['status_klaim']}" 
                                    data-no-trans="${response.klaim_jaminan[i]['no_transaksi']}" 
                                    'name="btn_delete_jaminan">
                                    <i class="fa fa-trash"></i> </button>
                        </td>
                    </tr>`;
            }

        }
        
        $('#tbl_pengajuan_klaim_jaminan > tbody:first').html(data);
                    
        $(document).ready(function() {
            $('#tbl_pengajuan_klaim_jaminan').DataTable( {
                "destroy": true,
                "scrollX": true,
                "autoWidth" : false,
                "searching": false,
                "aaSorting" : []
            } );
        } );
        $('#loading').hide();                    
    }


    /// PENGAJUAN KLAIM JAMINAN ///
    function get_data_jaminan(){
        data = [];
        $('#loading').show(); 
        
        $('#tbl_pengajuan_klaim_jaminan').DataTable().clear();
        $('#tbl_pengajuan_klaim_jaminan').DataTable().destroy();
        src_kode_kantor = $('#src_kode_kantor').val();
        console.log(src_kode_kantor);

        $.ajax({
                url : base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/get_data",
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
    function get_data_cover_jaminan(){
        modal_rek_polis_jaminan = $('#modal_rek_polis_jaminan').val();
        $('#loading-1').show();
        $.ajax({
                url : base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/get_data_cover_jaminan",
                type : "POST",
                dataType : "json",
                timeout : 180000,
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                data:{  "modal_rek_polis_jaminan" : modal_rek_polis_jaminan},

                success : function(response) {
                    console.log(response);
                    if(response.data_details.length == 0){
                        $('#loading-1').hide();
                        clear_modal_jaminan();
                        return Swal.fire({
                            icon: 'error',
                            title: 'Data Tidak Ditemukan!',
                            text: 'Mohon Periksa Kembali Nomor Rekening/Nomor Polis Nasabah'
                        });
                    }
                    mapping_modal_jaminan(response);
                },
                error : function(response) {
                    console.log('failed :' + response);
                    $('#loading-1').hide();
                    return Swal.fire({
                        icon: 'error',
                        title: 'Gagal Get Data!',
                        text: 'Mohon Periksa Jaringan Anda'
                    });
                }
        });    

    }
    function pengajuan_klaim_jaminan_process(){

        modal_rek_jaminan           = $('#modal_rek_jaminan').val();
        modal_reff_asuransi_jaminan = $('#modal_reff_asuransi_jaminan').val();
        modal_jenis_klaim_jaminan   = $('#modal_jenis_klaim_jaminan').val();
        

        let fd = new FormData();
        fd.append('modal_rek_jaminan',modal_rek_jaminan);
        fd.append('modal_reff_asuransi_jaminan',modal_reff_asuransi_jaminan);
        fd.append('modal_jenis_klaim_jaminan',modal_jenis_klaim_jaminan);

        $('#loading-1').show();
        $.ajax({
            url: base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/pengajuan_klaim_jaminan_process",
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
                        title: 'Sukses Pengajuan Klaim Asuransi Jaminan',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(()=> {
                        clear_modal_jaminan();
                        $('#modal_pengajuan_klaim_jaminan').modal('hide');
                        get_data_jaminan();
                    });  
                    console.log(response);
            },
            error : function(response) {
                console.log(response);
                $('#loading-1').hide();
                clear_modal_jaminan();
                $('#modal_pengajuan_klaim_jaminan').modal('hide');
                return Swal.fire({
                            icon: 'error',
                            title: 'Gagal Pengajuan Klaim Asuransi Jaminan!',
                            text: 'Mohon Periksa Jaringan Anda'
                });
            }
        });
    }
    function delete_klaim_jaminan(rekening,jenis,no_transaksi){
        Swal.fire({
           title: 'Apakah Anda yakin akan menghapus data?',
           text: "Aksi yang dilakukan tidak dapat dibatalkan!",
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Hapus!',
           cancelButtonText: 'Batalkan',
           showLoaderOnConfirm: true,
           reverseButtons: true,
           preConfirm: function() {
             return new Promise(function(resolve) {

                $.ajax({
                      url: base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/delete_pengajuan_klaim_jaminan",
                      type : "POST",
                      dataType : "json",
                      timeout : 180000,
                      headers: {
                                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                              },
                      data:{  "rekening" : rekening,
                              "jenis" : jenis,
                              "no_transaksi" : no_transaksi,
                              },
                      success : function(response) {
                          console.log(response);
                          Swal.fire({
                              position: 'center',
                              icon: 'success',
                              title: 'Sukses Hapus Data Klaim Asuransi',
                              showConfirmButton: false,
                              timer: 2000
                          }).then(()=> {
                            if(menu_kode == '1'){
                                $('#loading-1').hide();
                                get_data_jaminan();
                            } else if(menu_kode == '2'){
                                $('#loading-2').hide();
                                get_data_jiwa();
                            }
                          }); 
                          
                            
                      },
                      error : function(response) {
                          console.log(response);
                          return Swal.fire({
                              icon: 'error',
                              title: 'Gagal Hapus Data Klaim Asuransi Jaminan!',
                              text: 'Mohon Periksa Jaringan Anda'
                          });
                      }
                });          

             });
           },
           allowOutsideClick: false     
        });
      
       
    }
    function get_data_update(rekening,jenis,no_reff_asuransi,no_transaksi){
        $('#loading').show();
        $('#loading-3').show();
        $.ajax({
                url : base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/get_data_update",
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
                    $('#loading-3').hide();
                    console.log(response);
                    $('#modal_pengajuan_klaim_jaminan_update').modal('show');
                    mapping_modal_jaminan_update(response);
                },
                error : function(response) {
                    console.log('failed :' + response);
                    $('#loading-1').hide();
                    return Swal.fire({
                        icon: 'error',
                        title: 'Gagal Get Data!',
                        text: 'Mohon Periksa Jaringan Anda'
                    });
                }
        });    
    }
    function proses_update(){
        var rek_update = $('#modal_rek_jaminan_update').val();
        var no_transaksi = $('#modal_no_transaksi_jaminan_update').val();
        var jenis_asuransi = $('#modal_jenis_asuransi_jaminan_update').val();
        var jenis_klaim = $('#modal_jenis_klaim_jaminan_update').val();

        var fd_up = new FormData();
        fd_up.append('rek_update',rek_update);
        fd_up.append('no_transaksi',no_transaksi);
        fd_up.append('jenis_asuransi',jenis_asuransi);
        fd_up.append('jenis_klaim',jenis_klaim);


        $('#loading-3').show();
        $.ajax({
            url: base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/update_process",
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
                        title: 'Sukses Update Pengajuan Klaim Asuransi Jaminan',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(()=> {
                        clear_modal_jaminan_update();
                        $('#modal_pengajuan_klaim_jaminan_update').modal('hide');
                        get_data_jaminan();
                    });  
                    
            },
            error : function(response) {
                console.log(response);
                $('#loading-3').hide();
                clear_modal_jaminan_update();
                $('#modal_pengajuan_klaim_jaminan_update').modal('hide');
                return Swal.fire({
                            icon: 'error',
                            title: 'Gagal Update Pengajuan Klaim Asuransi Jaminan!',
                            text: 'Mohon Periksa Jaringan Anda'
                });
            }
        });
       
        
    }
    
    function close_jaminan(){
        clear_modal_jaminan();
        $('#modal_pengajuan_klaim_jaminan').modal('hide');
    }
    function close_jaminan_update(){
        clear_modal_jaminan_update();
        $('#modal_pengajuan_klaim_jaminan_update').modal('hide');
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
                uploads += `<div class="col-sm-8" style="padding-top: 5px;">
                                <label  class="control-label">
                                  <a href="${root_address+path_file+fileUploads[0][i]}" id="attachment_jaminan" target="_blank">${fileUploads[0][i]}</a>
                                </label>
                                <button type="button" class="btn btn-light btn-sm control-label btn_del_file"
                                        data-file-name="${fileUploads[0][i]}" >
                                                        <i class="far fa-trash-alt danger" style="color:red"></i> 
                                                        
                                </button>
                                
                            </div>`;
            }
        }
        
        $('#file_uploads').html(uploads);
        document.getElementById("file_uploads").style.display = "block";
                                    
        $('#loading-1').hide();
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
       // document.getElementById("child_file").remove();
        document.getElementById("file_uploads").style.display = "none";
        
    }
    function mapping_modal_jaminan_update(response){
        $('#modal_nama_asuransi_jaminan_update').val(response.data_details[0]['DESKRIPSI_ASURANSI']);
        $('#modal_tanggal_realisasi_jaminan_update').val(response.data_details[0]['TGL_REALISASI']);
        $('#modal_nama_nasabah_jaminan_update').val(response.data_details[0]['NAMA_NASABAH']);
        $('#modal_jenis_jaminan_jaminan_update').val(response.data_details[0]['jenis_jaminan']);
        $('#modal_nama_jaminan_jaminan_update').val(response.data_details[0]['nama']);
        $('#modal_alamat_jaminan_jaminan_update').val(response.data_details[0]['alamat_jaminan']);
        $('#modal_pertanggungan_jaminan_update').val(accounting.formatMoney(response.data_details[0]['nilai_asuransi_jiwa'], '', 0, ',', '.'));
        $('#modal_premi_jaminan_update').val(accounting.formatMoney(response.data_details[0]['premi_asuransi'], '', 0, ',', '.'));
        $('#modal_kantor_jaminan_update').val(response.data_details[0]['nama_kantor']);
        $('#modal_rek_jaminan_update').val(response.data_details[0]['no_rekening']);
        $('#modal_reff_asuransi_jaminan_update').val(response.data_details[0]['no_reff_asuransi']);
        $('#modal_polis_jaminan_update').val(response.data_details[0]['no_polis']);
        $('#modal_jenis_klaim_jaminan_update').val(response.data_details[0]['jenis_klaim']);
        $('#modal_no_transaksi_jaminan_update').val(response.data_details[0]['no_transaksi']);
        $('#modal_jenis_asuransi_jaminan_update').val(response.data_details[0]['jenis_asuransi']);
        $('#modal_ket_return_update').val(response.data_details[0]['ket_return']);

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
                                <button type="button" class="btn btn-light btn-sm control-label btn_del_file"
                                        data-file-name="${fileUploads[0][i]}" >
                                                        <i class="far fa-trash-alt danger" style="color:red"></i> 
                                                        
                                </button>
                            </div>`;
            }
        }
        $('#file_uploads_update').html(uploads);
        document.getElementById("file_uploads_update").style.display = "block";        
        $('#loading-3').hide();
    }
    function clear_modal_jaminan_update(){
        $('#modal_nama_asuransi_jaminan_update').val('');
        $('#modal_tanggal_realisasi_jaminan_update').val('');
        $('#modal_nama_nasabah_jaminan_update').val('');
        $('#modal_jenis_jaminan_jaminan_update').val('');
        $('#modal_nama_jaminan_jaminan_update').val('');
        $('#modal_alamat_jaminan_jaminan_update').val('');
        $('#modal_pertanggungan_jaminan_update').val('');
        $('#modal_premi_jaminan_update').val('');
        $('#modal_kantor_jaminan_update').val('');
        $('#modal_rek_jaminan_update').val('');
        $('#modal_reff_asuransi_jaminan_update').val('');
        $('#modal_jenis_klaim_jaminan_update').val('');
        $('#modal_polis_jaminan_update').val('');
        $('#modal_no_transaksi_jaminan_update').val('');
        $('#modal_jenis_asuransi_jaminan_update').val('');
        $('#modal_ket_return_update').val('');
        document.getElementById("file_uploads_update").style.display = "none";
    }
    ///END PENGAJUAN KLAIM JAMINAN ///


    /// PENGAJUAN KLAIM JIWA ///
    function get_data_jiwa(){
        data = [];
        $('#loading').show(); 
        
        $('#tbl_pengajuan_klaim_jaminan').DataTable().clear();
        $('#tbl_pengajuan_klaim_jaminan').DataTable().destroy();
        src_kode_kantor = $('#src_kode_kantor').val();
        console.log(src_kode_kantor);

        $.ajax({
                url : base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/get_data",
                type : "POST",
                dataType : "json",
                timeout : 180000,
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                data:{  "src_kode_kantor" : src_kode_kantor},
                success : function(response) {
                   console.log(response);
                   mapping_get_data(response);
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
    function get_data_cover_jiwa(){
        modal_rek_polis_jiwa = $('#modal_rek_polis_jiwa').val();
        $('#loading-2').show();
        $.ajax({
                url : base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/get_data_cover_jiwa",
                type : "POST",
                dataType : "json",
                timeout : 180000,
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                data:{  "modal_rek_polis_jiwa" : modal_rek_polis_jiwa},

                success : function(response) {
                    console.log(response);
                    if(response.data_details.length == 0){
                        $('#loading-2').hide();
                        clear_modal_jiwa();
                        return Swal.fire({
                            icon: 'error',
                            title: 'Data Tidak Ditemukan!',
                            text: 'Mohon Periksa Kembali Nomor Rekening/Nomor Polis Nasabah'
                        });
                    }
                    mapping_modal_jiwa(response);
                },
                error : function(response) {
                    console.log('failed :' + response);
                    $('#loading-2').hide();
                    return Swal.fire({
                        icon: 'error',
                        title: 'Gagal Get Data!',
                        text: 'Mohon Periksa Jaringan Anda'
                    });
                }
        });    

    }
    function pengajuan_klaim_jiwa_process(){

        modal_rek_jiwa           = $('#modal_rek_jiwa').val();
        modal_reff_asuransi_jiwa = $('#modal_reff_asuransi_jiwa').val();
        modal_jenis_klaim_jiwa   = $('#modal_jenis_klaim_jiwa').val();
     
        let fd = new FormData();
        fd.append('modal_rek_jiwa',modal_rek_jiwa);
        fd.append('modal_reff_asuransi_jiwa',modal_reff_asuransi_jiwa);
        fd.append('modal_jenis_klaim_jiwa',modal_jenis_klaim_jiwa);

        $('#loading-2').show();
        $.ajax({
            url: base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/pengajuan_klaim_jiwa_process",
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
                        title: 'Sukses Pengajuan Klaim Asuransi Jiwa',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(()=> {
                        close_jiwa();
                        get_data_jiwa();
                    });  
                    console.log(response);
            },
            error : function(response) {
                console.log(response);
                $('#loading-1').hide();
                clear_modal_jaminan();
                $('#modal_pengajuan_klaim_jaminan').modal('hide');
                return Swal.fire({
                            icon: 'error',
                            title: 'Gagal Pengajuan Klaim Asuransi Jiwa!',
                            text: 'Mohon Periksa Jaringan Anda'
                });
            }
        });
    }
    function get_data_update_jiwa(rekening,jenis,no_reff_asuransi,no_transaksi){
        $('#loading').show();
        $.ajax({
                url : base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/get_data_update",
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
                    $('#modal_pengajuan_klaim_jiwa_update').modal('show');
                    mapping_modal_jiwa_update(response);
                },
                error : function(response) {
                    console.log('failed :' + response);
                    $('#loading-1').hide();
                    return Swal.fire({
                        icon: 'error',
                        title: 'Gagal Get Data!',
                        text: 'Mohon Periksa Jaringan Anda'
                    });
                }
        });    
    }


    function close_jiwa(){
        clear_modal_jiwa();
        $('#modal_pengajuan_klaim_jiwa').modal('hide');
    }
    function clear_modal_jiwa(){
        $('#modal_rek_polis_jiwa').val('');
        $('#modal_rek_jiwa').val('');
        $('#modal_polis_jiwa').val('');
        $('#modal_nama_asuransi_jiwa').val('');
        $('#modal_tgl_realisasi_jiwa').val('');
        $('#modal_nama_nasabah_jiwa').val('');
        $('#modal_tempat_lahir').val('');
        $('#modal_tgl_lahir_jiwa').val('');
        $('#modal_no_telepon_jiwa').val('');
        $('#modal_alamat_jiwa').val('');
        $('#modal_pertanggungan_jiwa').val('');
        $('#modal_premi_jiwa').val('');
        $('#modal_kantor_jiwa').val('');
        $('#modal_reff_asuransi_jiwa').val('');
        document.getElementById("file_uploads_jiwa").style.display = "none";
    }
    function mapping_modal_jiwa(response){
        $('#loading-2').hide();
        $('#modal_rek_jiwa').val(response.data_details[0]['no_rekening']);
        $('#modal_polis_jiwa').val(response.data_details[0]['no_polis']);
        $('#modal_nama_asuransi_jiwa').val(response.data_details[0]['DESKRIPSI_ASURANSI']);
        $('#modal_tgl_realisasi_jiwa').val(response.data_details[0]['TGL_REALISASI']);
        $('#modal_nama_nasabah_jiwa').val(response.data_details[0]['NAMA_NASABAH']);
        $('#modal_tempat_lahir').val(response.data_details[0]['TEMPATLAHIR']);
        $('#modal_tgl_lahir_jiwa').val(response.data_details[0]['TGLLAHIR']);
        $('#modal_no_telepon_jiwa').val(response.data_details[0]['TELPON']);
        $('#modal_alamat_jiwa').val(response.data_details[0]['alamat_nasabah']);
        $('#modal_pertanggungan_jiwa').val(accounting.formatMoney(response.data_details[0]['nilai_asuransi_jiwa'], '', 0, ',', '.'));
        $('#modal_premi_jiwa').val(accounting.formatMoney(response.data_details[0]['premi_asuransi'], '', 0, ',', '.'));
        $('#modal_kantor_jiwa').val(response.data_details[0]['nama_kantor']);
        $('#modal_reff_asuransi_jiwa').val(response.data_details[0]['no_reff_asuransi']);

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
                uploads += `<div class="col-sm-8" style="padding-top: 5px;">
                                <label  class="control-label">
                                  <a href="${root_address+path_file+fileUploads[0][i]}" id="attachment_jaminan" target="_blank">${fileUploads[0][i]}</a>
                                </label>
                                <button type="button" class="btn btn-light btn-sm control-label btn_del_file"
                                        data-file-name="${fileUploads[0][i]}" >
                                                        <i class="far fa-trash-alt danger" style="color:red"></i> 
                                                        
                                </button>
                                
                            </div>`;
            }
        }
        
        $('#file_uploads_jiwa').html(uploads);
        document.getElementById("file_uploads_jiwa").style.display = "block";
    }
    function mapping_modal_jiwa_update(response){
        $('#loading-4').hide();
        $('#modal_rek_jiwa_update').val(response.data_details[0]['no_rekening']);
        $('#modal_polis_jiwa_update').val(response.data_details[0]['no_polis']);
        $('#modal_nama_asuransi_jiwa_update').val(response.data_details[0]['DESKRIPSI_ASURANSI']);
        $('#modal_tgl_realisasi_jiwa_update').val(response.data_details[0]['TGL_REALISASI']);
        $('#modal_nama_nasabah_jiwa_update').val(response.data_details[0]['NAMA_NASABAH']);
        $('#modal_tempat_lahir_update').val(response.data_details[0]['TEMPATLAHIR']);
        $('#modal_tgl_lahir_jiwa_update').val(response.data_details[0]['TGLLAHIR']);
        $('#modal_no_telepon_jiwa_update').val(response.data_details[0]['TELPON']);
        $('#modal_alamat_jiwa_update').val(response.data_details[0]['alamat_nasabah']);
        $('#modal_pertanggungan_jiwa_update').val(accounting.formatMoney(response.data_details[0]['nilai_asuransi_jiwa'], '', 0, ',', '.'));
        $('#modal_premi_jiwa_update').val(accounting.formatMoney(response.data_details[0]['premi_asuransi'], '', 0, ',', '.'));
        $('#modal_kantor_jiwa_update').val(response.data_details[0]['nama_kantor']);
        $('#modal_reff_asuransi_jiwa_update').val(response.data_details[0]['no_reff_asuransi']);
        $('#modal_jenis_klaim_jiwa_update').val(response.data_details[0]['jenis_klaim']);
        $('#modal_jenis_asuransi_jiwa_update').val(response.data_details[0]['jenis_asuransi']);
        $('#modal_no_transaksi_jiwa_update').val(response.data_details[0]['no_transaksi']);
        $('#modal_ket_return_jiwa_update').val(response.data_details[0]['ket_return']);

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
                                <button type="button" class="btn btn-light btn-sm control-label btn_del_file"
                                        data-file-name="${fileUploads[0][i]}" >
                                                        <i class="far fa-trash-alt danger" style="color:red"></i> 
                                                        
                                </button>
                            </div>`;
            }
        }
        $('#file_uploads_jiwa_update').html(uploads);
        document.getElementById("file_uploads_jiwa_update").style.display = "block";      

    }
    function close_jiwa_update(){
        clear_modal_jiwa_update();
        $('#modal_pengajuan_klaim_jiwa_update').modal('hide');
    }
    function clear_modal_jiwa_update(){
        $('#loading-4').hide();
        $('#modal_rek_jiwa_update').val('');
        $('#modal_polis_jiwa_update').val('');
        $('#modal_nama_asuransi_jiwa_update').val('');
        $('#modal_tgl_realisasi_jiwa_update').val('');
        $('#modal_nama_nasabah_jiwa_update').val('');
        $('#modal_tempat_lahir_update').val('');
        $('#modal_tgl_lahir_jiwa_update').val('');
        $('#modal_no_telepon_jiwa_update').val('');
        $('#modal_alamat_jiwa_update').val('');
        $('#modal_pertanggungan_jiwa_update').val('');
        $('#modal_premi_jiwa_update').val('');
        $('#modal_kantor_jiwa_update').val('');
        $('#modal_reff_asuransi_jiwa_update').val('');
        $('#modal_jenis_klaim_jiwa_update').val('');
        $('#modal_jenis_asuransi_jiwa_update').val('');
        $('#modal_no_transaksi_jiwa_update').val('');
        $('#modal_ket_return_jiwa_update').val('');

        document.getElementById("file_uploads_jiwa_update").style.display = "none";
    }
    function proses_update_jiwa(upload_update){
        var rek_update = $('#modal_rek_jiwa_update').val();
        var no_transaksi = $('#modal_no_transaksi_jiwa_update').val();
        var jenis_asuransi = $('#modal_jenis_asuransi_jiwa_update').val();
        var jenis_klaim = $('#modal_jenis_klaim_jiwa_update').val();

       
        var fd_up = new FormData();
        fd_up.append('rek_update',rek_update);
        fd_up.append('no_transaksi',no_transaksi);
        fd_up.append('jenis_asuransi',jenis_asuransi);
        fd_up.append('upload_update',upload_update);
        fd_up.append('jenis_klaim',jenis_klaim);

        $('#loading-4').show();
        $.ajax({
            url: base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/update_process",
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
                    $('#loading-4').hide();
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Sukses Update Pengajuan Klaim Asuransi Jiwa',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(()=> {
                        close_jiwa_update();
                        get_data_jiwa();
                    });  
                    
            },
            error : function(response) {
                console.log(response);
                $('#loading-4').hide();
                close_jiwa_update();
                return Swal.fire({
                            icon: 'error',
                            title: 'Gagal Update Pengajuan Klaim Asuransi Jiwa!',
                            text: 'Mohon Periksa Jaringan Anda'
                });
            }
        });
       
        
    }
    
    /// END PENGAJUAN KLAIM JIWA ///

    //// upload multiple ////
    function prosees_upload(){
        
        if(menu_kode == '1'){
           up_rek   = $('#modal_rek_jaminan').val();
           up_polis = $('#modal_polis_jaminan').val();
           var files = $('#modal_upload_jaminan')[0].files[0];
           $('#loading-1').show();
        } else if(menu_kode == '2'){
            up_rek    = $('#modal_rek_jiwa').val();
            up_polis  = $('#modal_reff_asuransi_jiwa').val();
            var files = $('#modal_upload_jiwa')[0].files[0];
            $('#loading-2').show();
        }else{
            up_rek   = '';
            up_polis = '';
        }

        if(fileUploads.length > 0){
            fileUploadsLength = fileUploads[0].length;
        }else{
            fileUploadsLength = 0;
        }

        var proses_flag = 1;

        console.log(fileUploads);
      
        var fd_up = new FormData();
        fd_up.append('files',files);
        fd_up.append('up_rek',up_rek);
        fd_up.append('up_polis',up_polis);
        fd_up.append('fileUploads',fileUploads);
        fd_up.append('fileUploadsLength',fileUploadsLength);
        fd_up.append('proses_flag', proses_flag);
      
        
        $.ajax({
            url: base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/proses_upload",
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
                        if(menu_kode == '1'){
                            $('#loading-1').hide();
                            get_data_cover_jaminan();
                        } else if(menu_kode == '2'){
                            $('#loading-2').hide();
                            get_data_cover_jiwa();
                        }
                    });  
                    
            },
            error : function(response) {
                console.log(response);
                $('#loading-1').hide();
                clear_modal_jaminan();
                $('#modal_pengajuan_klaim_jaminan').modal('hide');
                return Swal.fire({
                            icon: 'error',
                            title: 'Proses Gagal!',
                            text: 'Mohon Periksa Jaringan Anda'
                });
            }
        });
       
    }
    function proses_delete_upload(){
        if(menu_kode == '1'){
           up_rek   = $('#modal_rek_jaminan').val();
           up_polis = $('#modal_polis_jaminan').val();
            $('#loading-1').show();
        } else if(menu_kode == '2'){
            up_rek    = $('#modal_rek_jiwa').val();
            up_polis  = $('#modal_reff_asuransi_jiwa').val();
            $('#loading-2').show();
        }else{
            up_rek   = '';
            up_polis = '';
        }

        if(fileUploads.length > 0){
            fileUploadsLength = fileUploads[0].length;
        }else{
            fileUploadsLength = 0;
        }
        var proses_flag = 1;
        $.ajax({
                url : base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/proses_delete_upload",
                type : "POST",
                dataType : "json",
                timeout : 180000,
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                data:{  "up_rek"            : up_rek,
                        "up_polis"          : up_polis,
                        "fileUploads"       : fileUploads[0],
                        "fileUploadsLength" : fileUploadsLength,
                        "proses_flag"       : proses_flag
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
                        if(menu_kode == '1'){
                            $('#loading-1').hide();
                            get_data_cover_jaminan();
                        } else if(menu_kode == '2'){
                            $('#loading-2').hide();
                            get_data_cover_jiwa();
                        }
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


    function prosees_upload_update(){
        var no_transaksi = '';
        var proses_flag = 2;
        debugger;
        if(menu_kode == '1'){
           up_rek   = $('#modal_rek_jaminan_update').val();
           up_polis = $('#modal_polis_jaminan_update').val();
           no_transaksi = $('#modal_no_transaksi_jaminan_update').val();
           var files = $('#modal_upload_jaminan_update')[0].files[0];
            $('#loading-3').show();
        } else if(menu_kode == '2'){
            up_rek    = $('#modal_rek_jiwa_update').val();
            up_polis  = $('#modal_reff_asuransi_jiwa_update').val();
            no_transaksi = $('#modal_no_transaksi_jiwa_update').val();
            var files = $('#modal_upload_jiwa_update')[0].files[0];
            $('#loading-4').show();
        }else{
            up_rek   = '';
            up_polis = '';
        }

        if(fileUploads.length > 0){
            fileUploadsLength = fileUploads[0].length;
        }else{
            fileUploadsLength = 0;
        }

      
        var fd_up = new FormData();
        fd_up.append('files',files);
        fd_up.append('up_rek',up_rek);
        fd_up.append('up_polis',up_polis);
        fd_up.append('fileUploads',fileUploads);
        fd_up.append('fileUploadsLength',fileUploadsLength);
        fd_up.append('no_transaksi',no_transaksi);
        fd_up.append('proses_flag',proses_flag);
      
        $.ajax({
            url: base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/proses_upload",
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
                        if(menu_kode == '1'){
                            $('#loading-3').hide();
                            get_data_update(rekening,jenis,no_reff_asuransi,no_transaksi);
                        } else if(menu_kode == '2'){
                            $('#loading-4').hide();
                            get_data_update_jiwa(rekening,jenis,no_reff_asuransi,no_transaksi)
                        }
                    });  
                    
            },
            error : function(response) {
                console.log(response);
                if(menu_kode == '1'){
                    $('#loading-3').hide();
                } else if(menu_kode == '2'){
                    $('#loading-4').hide();
                }
                return Swal.fire({
                            icon: 'error',
                            title: 'Proses Gagal!',
                            text: 'Mohon Periksa Jaringan Anda'
                });
            }
        });
       
    }

    function proses_delete_upload_update(){

         if(menu_kode == '1'){
           up_rek   = $('#modal_rek_jaminan_update').val();
           up_polis = $('#modal_polis_jaminan_update').val();
           no_transaksi = $('#modal_no_transaksi_jaminan_update').val();
           var files = $('#modal_upload_jaminan_update')[0].files[0];  
           $('#loading-3').show();
        } else if(menu_kode == '2'){
            up_rek    = $('#modal_rek_jiwa_update').val();
            up_polis  = $('#modal_reff_asuransi_jiwa_update').val();
            no_transaksi = $('#modal_no_transaksi_jiwa_update').val();
            var files = $('#modal_upload_jiwa_update')[0].files[0];
            $('#loading-4').show();
        }else{
            up_rek   = '';
            up_polis = '';
        }

        if(fileUploads.length > 0){
            fileUploadsLength = fileUploads[0].length;
        }else{
            fileUploadsLength = 0;
        }
        var proses_flag = 2;
        $.ajax({
                url : base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/proses_delete_upload",
                type : "POST",
                dataType : "json",
                timeout : 180000,
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                data:{  "up_rek"            : up_rek,
                        "up_polis"          : up_polis,
                        "fileUploads"       : fileUploads[0],
                        "fileUploadsLength" : fileUploadsLength,
                        "no_transaksi"      : no_transaksi,
                        "proses_flag"       : proses_flag
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
                        if(menu_kode == '1'){
                            $('#loading-3').hide();
                            get_data_update(rekening,jenis,no_reff_asuransi,no_transaksi);
                        } else if(menu_kode == '2'){
                            $('#loading-4').hide();
                            get_data_update_jiwa(rekening,jenis,no_reff_asuransi,no_transaksi)
                        }
                    });  
                },
                error : function(response) {
                    console.log('failed :' + response);
                    $('#loading-3').hide();
                    $('#loading-4').hide();
                    return Swal.fire({
                        icon: 'error',
                        title: 'Proses Gagal',
                        text: 'Mohon Periksa Jaringan Anda'
                    });
                    
                }
        });   
    }

</script>
