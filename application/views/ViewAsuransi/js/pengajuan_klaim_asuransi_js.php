<script>

var menu_kode               = <?php echo $this->session->userdata('pengajuan_klaim');?>;
var base_url                = $('#base_url').val(); 
var modal_rek_polis_jaminan = '';
var modal_rek_jaminan = '';
var modal_reff_asuransi_jaminan = '';
var modal_jenis_klaim_jaminan = '';
var data = '';
var data_asuransi = '';
var upload_update = '';

    $(document).ready(function () {     
        
        bsCustomFileInput.init();
        $('.select2').select2();
        $('#loading-1').hide();

        if(menu_kode == '1'){
            get_data_jaminan();
        } else if(menu_kode == '2'){
            get_data_url = base_url + "Asuransi/Cover_asuransi_controller/get_data_rekap_jiwa";
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
            get_data_url = base_url + "Asuransi/Cover_asuransi_controller/get_data_rekap_jiwa";
        }
    });
    $('#btn_simpan_modal_jaminan_update').click(function () {
         
        if($('#modal_upload_jaminan_update')[0].files[0] == null){
            
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
                    proses_update(upload_update);
    
                });
               },
               allowOutsideClick: false     
            });
         
        }else{
            upload_update = '1';
            proses_update(upload_update);
        }
    });
    
    ///END PENGAJUAN KLAIM JAMINAN ///




    //// FUNCTION HERE ////


    /// PENGAJUAN KLAIM JAMINAN ///
    function get_data_jaminan(){
        data = [];
        $('#loading').show(); 
        
        $('#tbl_pengajuan_klaim_jaminan').DataTable().clear();
        $('#tbl_pengajuan_klaim_jaminan').DataTable().destroy();
            $.ajax({
                    url : base_url + "Asuransi/Pengajuan_klaim_asuransi_controller/get_data_jaminan",
                    type : "POST",
                    dataType : "json",
                    timeout : 180000,
                    headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },

                    success : function(response) {
                       console.log(response);
                       mapping_get_data(response)
                    },
                    error : function(response) {
                        console.log('failed :' + response);
                        $('#loading').hide();
                        return Swal.fire({
                            icon: 'error',
                            title: 'Gagal Pengajuan Klaim Asuransi Jaminan!',
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
        
        if($('#modal_upload_jaminan')[0].files[0] == null){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Anda Belum Memilih File Attachment Untuk Di Upload!'
            });
        }

        let fd = new FormData();
        let files = $('#modal_upload_jaminan')[0].files[0];

        fd.append('files',files);
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
                              title: 'Sukses Hapus Data Klaim Asuransi Jaminan',
                              showConfirmButton: false,
                              timer: 2000
                          }).then(()=> {
                            get_data_jaminan();
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
                    $('#modal_pengajuan_klaim_jaminan_update').modal('show');
                    // if(response.data_details.length == 0){
                    //     $('#loading-1').hide();
                    //     clear_modal_jaminan();
                    //     return Swal.fire({
                    //         icon: 'error',
                    //         title: 'Data Tidak Ditemukan!',
                    //         text: 'Mohon Periksa Kembali Nomor Rekening/Nomor Polis Nasabah'
                    //     });
                    // }
                    mapping_modal_jaminan_update(response)
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
    function proses_update(upload_update){
        var rek_update = $('#modal_rek_jaminan_update').val();
        var no_transaksi = $('#modal_no_transaksi_jaminan_update').val();
        var jenis_asuransi = $('#modal_jenis_asuransi_jaminan_update').val();
        var jenis_klaim = $('#modal_jenis_klaim_jaminan_update').val();

        if(upload_update == '0'){
            var fd_up = new FormData();
            fd_up.append('rek_update',rek_update);
            fd_up.append('no_transaksi',no_transaksi);
            fd_up.append('jenis_asuransi',jenis_asuransi);
            fd_up.append('upload_update',upload_update);
            fd_up.append('jenis_klaim',jenis_klaim);

        }else if(upload_update == '1'){
            var fd_up = new FormData();
            let files = $('#modal_upload_jaminan_update')[0].files[0];

            fd_up.append('files',files);
            fd_up.append('rek_update',rek_update);
            fd_up.append('no_transaksi',no_transaksi);
            fd_up.append('jenis_asuransi',jenis_asuransi);
            fd_up.append('upload_update',upload_update);
            fd_up.append('jenis_klaim',jenis_klaim);

        }

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
        

        document.getElementById("attachment_jaminan_update").href = response.data_details[0]['root_address'] + response.data_details[0]['path_file']; 
        
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
        document.getElementById("attachment_jaminan_update").href = '';
    }
    ///END PENGAJUAN KLAIM JAMINAN ///

</script>

<!-- $.ajax({
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
                              title: 'Sukses Hapus Data Klaim Asuransi Jaminan',
                              showConfirmButton: false,
                              timer: 2000
                          }).then(()=> {
                            get_data_jaminan();
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
                });           -->