<script>
    var menu_kode              = <?php echo $this->session->userdata('menu_cover_asuransi');?>;
    var base_url               = $('#base_url').val(); 
    var kode_kantor            = $('#kode_kantor').val(); 
    var data                   = '';
    var get_data_url           = '';
    var rekening               = '';
    var agunanid               = '';
    var nasabahid              = '';
    var no_reff_asuransi       = '';
    var no_reff_jaminan        = '';
    var data_okupasi_jaminan   = '';
    var premi_jaminan          = '';
    var premi_jaminan_request  = '';
    var rate_jaminan           = '';
    var modal_rate_jiwa        = '';
    var modal_premi_jiwa       = '';
    var modal_selisih_jiwa     = '';
    var modal_extra_premi_jiwa = '';
    var src_tgl_realisasi      = '';
    var src_search             = '';
    var modal_premi_jiwa_request = '';
    var periode = '';
    var checkArray = [];
    var lengthParsed = '';

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
            if(menu_kode == '1'){
                get_data_url = base_url + "Asuransi/Cover_asuransi_controller/get_data_rekap_jaminan";
            } else if(menu_kode == '2'){
                get_data_url = base_url + "Asuransi/Cover_asuransi_controller/get_data_rekap_jiwa";
            }
            getData();
    });

    $('#tbl_body_cover_asuransi').on('click','.btn_proses', function () {    
           rekening          = $(this).data("rekening");
           agunanid          = $(this).data("agunanid");
           nasabahid         = $(this).data("nasabahid");
           no_reff_asuransi  = $(this).data("no-reff-asuransi");
           no_reff_jaminan   = $(this).data("no-reff-jaminan");
           $('#loading').show();
           get_details();
           
    });
    $('#tbl_body_cover_asuransi').on('click','.btn_done', function () {    
            rekening          = $(this).data("rekening");
            agunanid          = $(this).data("agunanid");
            nasabahid         = $(this).data("nasabahid");
            no_reff_asuransi  = $(this).data("no-reff-asuransi");
            no_reff_jaminan   = $(this).data("no-reff-jaminan");
            console.log(kode_kantor);
            if(kode_kantor != '00'){
                return Swal.fire({
                            icon: 'error',
                            title: 'Anda Tidak Memiliki Akses!',
                            text: 'Mohon Hubungi Team Asuransi, Atau Team IT!'
                });
            }
            Swal.fire({
               title: 'Apakah Anda Yakin Akan Merubah Status Menjadi SUDAH ?',
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
                    proses_done();
                });
               },
               allowOutsideClick: false     
            });
           
    });

    $('#modal_premi_jaminan').on('input', function() {
        var money = accounting.formatMoney($('#modal_premi_jaminan').val(), '', 0, ',', '.');
        $('#modal_premi_jaminan').val(money);
    });
    $('#modal_premi_jiwa').on('input', function() {
        var money = accounting.formatMoney($('#modal_premi_jiwa').val(), '', 0, ',', '.');
        $('#modal_premi_jiwa').val(money);
    });
    $('#modal_selisih_jiwa').on('input', function() {
        var money = accounting.formatMoney($('#modal_selisih_jiwa').val(), '', 0, ',', '.');
        $('#modal_selisih_jiwa').val(money);
    });
    
    $('#btn_simpan_modal').click(function () {
        if(menu_kode == '1'){
           // $('#loading-1').show();
            data_okupasi_jaminan  = $('#modal_data_okupasi_jaminan').val();
            premi_jaminan         = accounting.unformat($('#modal_premi_jaminan').val());
            premi_jaminan_request = accounting.unformat($('#modal_premi_jaminan_request').val());
            rate_jaminan          = $('#modal_rate_jaminan').val();

            console.log(rate_jaminan);

            if(rate_jaminan <= 0 || rate_jaminan == 0){
                return Swal.fire({
                    icon: 'error',
                    title: 'Mohon Masukan Rate Asuransi Jaminan!',
                    text: 'Rate Asuransi Jaminan Harus Lebih dari 0'
                });
            }else{
                Swal.fire({
                   title: 'Apakah Anda Yakin Akan Melakukan Cover Asuransi ?',
                   text: "Aksi ini akan merubah status menjadi PROSES, Lanjutkan ?",
                   showCancelButton: true,
                   confirmButtonColor: '#3085d6',
                   cancelButtonColor: '#d33',
                   confirmButtonText: 'Lanjutkan',
                   cancelButtonText: 'Batalkan',
                   showLoaderOnConfirm: true,
                   reverseButtons: true,
                   preConfirm: function() {
                    return new Promise(function(resolve) {
                        cover_jaminan_process();
                    });
                   },
                   allowOutsideClick: false     
                });
                           
            }

            
        } else if(menu_kode == '2'){
            modal_rate_jiwa          = $('#modal_rate_jiwa').val();
            modal_premi_jiwa         = accounting.unformat($('#modal_premi_jiwa').val());
            modal_premi_jiwa_request = accounting.unformat($('#modal_premi_jiwa_request').val());

            if(modal_rate_jiwa <= 0 || modal_rate_jiwa == 0){
                return Swal.fire({
                    icon: 'error',
                    title: 'Mohon Masukan Rate Asuransi Jaminan!',
                    text: 'Rate Asuransi Jaminan Harus Lebih dari 0'
                });
            }else{
                Swal.fire({
                   title: 'Apakah Anda Yakin Akan Melakukan Cover Asuransi ?',
                   text: "Aksi ini akan merubah status menjadi PROSES, Lanjutkan ?",
                   showCancelButton: true,
                   confirmButtonColor: '#3085d6',
                   cancelButtonColor: '#d33',
                   confirmButtonText: 'Lanjutkan',
                   cancelButtonText: 'Batalkan',
                   showLoaderOnConfirm: true,
                   reverseButtons: true,
                   preConfirm: function() {
                    return new Promise(function(resolve) {
                        cover_jiwa_process();
                    });
                   },
                   allowOutsideClick: false     
                });
            }
            

            
        }
    });

    $('#src_search').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            search();
        }
    }); 
    $('#src_tgl_realisasi').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            search_periode()
        }
    }); 
    $('#btn_refresh').click(function(event) {
        getData();
    }); 
    $('#btn_export_report_cover_asuransi').click(function() {
        export_to_excel();
    }); 
    $('#btn_export_selected').click(function() {
        checkArray = [];
        lengthParsed = 0;

        var tbl_cover_asuransi = $('#tbl_cover_asuransi').dataTable();
        var rowcollection =  tbl_cover_asuransi.$("input:checkbox[name=check]:checked", {"page": "all"});
        rowcollection.each(function(){
            checkArray.push([$(this).val(),$(this).data("rekening")]);
        });

        console.log(checkArray, checkArray.length);
        lengthParsed = checkArray.length;
        if(lengthParsed == 0){
            return Swal.fire({
                icon: 'error',
                title: 'Tidak Dapat Memproses Report!',
                text: 'Tidak Ada Data Yang Dipilih'
            });
        }
        export_selected();
    }); 
    
  


    ///// FUNCTION HERE //////

    function getData(){
        data = '';
        $('#tbl_cover_asuransi').DataTable().clear();
        $('#tbl_cover_asuransi').DataTable().destroy();
        $('#loading').show(); 
        
        $.ajax({
                url : get_data_url,
                type : "POST",
                dataType : "json",
                timeout : 180000,
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },

                success : function(response) {
                    //console.log(response);
                    $('#src_tgl_realisasi').val(response.sysdate);
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

    function get_details(){
        $('#modal_data_okupasi_jaminan').find('option').remove().end();
        $.ajax({
                    url : base_url + "Asuransi/Cover_asuransi_controller/get_data_detail",
                    type : "POST",
                    dataType : "json",
                    timeout : 240000,
                    headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                    data:{  "rekening"         : rekening,
                            "agunanid"         : agunanid,
                            "nasabahid"        : nasabahid,
                            "no_reff_asuransi" : no_reff_asuransi,
                            "no_reff_jaminan"  : no_reff_jaminan,
                            "menu_kode"        : menu_kode},
                    success : function(response) {
                        $('#loading').hide();
                        console.log(response);
                        $('#modal_data_asuransi').modal('show');

                        $('#modal_nomor_rekening').val(response.data_details[0]['no_rekening']);
                        $('#modal_nama_nasabah').val(response.data_details[0]['NAMA_NASABAH']); 
                        $('#modal_tempat_lahir').val(response.data_details[0]['TEMPATLAHIR']); 
                        $('#modal_tanggal_lahir').val(response.data_details[0]['TGLLAHIR']); 
                        $('#modal_telepon').val(response.data_details[0]['TELPON']); 
                        $('#modal_alamat').val(response.data_details[0]['alamat_nasabah']); 
                        $('#modal_tanggal_realisasi').val(response.data_details[0]['TGL_REALISASI']); 
                        $('#modal_tgl_jt_tempo').val(response.data_details[0]['TGL_JATUH_TEMPO']); 
                        $('#modal_plafon').val(accounting.formatMoney(response.data_details[0]['plafon'], '', 0, ',', '.')); 
                        $('#modal_nilai_titipan').val(accounting.formatMoney(response.data_details[0]['titipan_asuransi'], '', 0, ',', '.')); 
                        $('#modal_jaminan').val(response.data_details[0]['jenis_jaminan']); 
                        $('#modal_atas_nama').val(response.data_details[0]['nama']); 
                        $('#modal_alamat_kredit').val(response.data_details[0]['alamat_jaminan']); 

                        if(menu_kode == '1'){
                            var jkw_asuransi_y = response.data_details[0]['jkw_asuransi'];
                            var jkw_asuransi_m = jkw_asuransi_y * 12;
                            
                            $('#modal_lama_cover_m').val(jkw_asuransi_m); 
                            $('#modal_lama_cover_y').val(jkw_asuransi_y); 

                            
                            $('#modal_inp_asuransi_jaminan').val(response.data_details[0]['DESKRIPSI_ASURANSI']); 
                            $('#modal_data_okupasi_jaminan').val(response.data_details[0]['kode_okupasi']); 
                            $('#modal_pertanggungan_jaminan').val(accounting.formatMoney(response.data_details[0]['NILAI_ASURANSI'], '', 0, ',', '.')); 
                            $('#modal_rate_jaminan').val(response.data_details[0]['rate']); 
                            $('#modal_premi_jaminan').val(accounting.formatMoney(response.data_details[0]['premi_asuransi'], '', 0, ',', '.')); 
                            $('#modal_premi_jaminan_request').val(accounting.formatMoney(response.data_details[0]['premi_request'], '', 0, ',', '.')); 
                            $('#modal_selisih_jaminan').val(response.data_details[0]['modal_inp_asuransi_jaminan']); 

                            if(response.data_details[0]['id_okupasi'] != null){
                                $('#modal_data_okupasi_jaminan').append('<option selected value="'+response.data_details[0]['id_okupasi']+'">' + response.data_details[0]['okupasi_detail'] +'</option>');
                            }
                            
                            $.each(response.data_okupasi,function(i,data){
                                $('#modal_data_okupasi_jaminan').append('<option value="'+data.id+'">' + data.kode_okupasi + ' - ' + data.deskripsi_okupasi +'</option>');
                            });

                        }else if(menu_kode == '2'){
                            var jkw_asuransi_y = response.data_details[0]['jkw_asuransi_jiwa'];
                            var jkw_asuransi_m = jkw_asuransi_y * 12;
                            
                            $('#modal_lama_cover_m').val(jkw_asuransi_m); 
                            $('#modal_lama_cover_y').val(jkw_asuransi_y); 

                            $('#modal_inp_asuransi_jiwa').val(response.data_details[0]['DESKRIPSI_ASURANSI']); 
                            $('#modal_tinggi_badan_jiwa').val(response.data_details[0]['tinggi_asuransi_jiwa']); 
                            $('#modal_berat_badan_jiwa').val(response.data_details[0]['berat_asuransi_jiwa']); 
                            $('#modal_rate_jiwa').val(response.data_details[0]['rate']); 
                            $('#modal_premi_jiwa').val(accounting.formatMoney(response.data_details[0]['premi_asuransi'], '', 0, ',', '.')); 
                            $('#modal_premi_jiwa_request').val(accounting.formatMoney(response.data_details[0]['premi_request'], '', 0, ',', '.')); 
                            $('#modal_selisih_jiwa').val(0); 
                            
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


                        $('#loading-1').hide();
                        
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
            
   function cover_jaminan_process(){

        $.ajax({
                    url : base_url + "Asuransi/Cover_asuransi_controller/cover_jaminan_process",
                    type : "POST",
                    dataType : "json",
                    timeout : 180000,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
                    data:{  "data_okupasi_jaminan"  : data_okupasi_jaminan,
                            "premi_jaminan"         : premi_jaminan,
                            "premi_jaminan_request" : premi_jaminan_request,
                            "rate_jaminan"          : rate_jaminan,
                            "rekening"              : rekening},

                    success : function(response) {
                        $('#loading-1').hide();
                        //alert('Sukses');
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Sukses Cover Asuransi Jaminan',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(()=> {
                            $('#modal_data_asuransi').modal('hide');
                            getData();
                        });  

                        
                    },
                    error : function(response) {
                        console.log('failed :' + response);
                        $('#loading-1').hide();
                        return Swal.fire({
                            icon: 'error',
                            title: 'Proses Gagal!',
                            text: 'Mohon Periksa Jaringan Anda'
                        });
                    }
            });    
   }
   
   function cover_jiwa_process(){

        
        if (document.getElementById('modal_extra_premi_jiwa').checked) {
            modal_extra_premi_jiwa = '1';
        } else {
            modal_extra_premi_jiwa = '0';
        }

        

        let fd = new FormData();
        fd.append('rekening',rekening);
        fd.append('modal_rate_jiwa',modal_rate_jiwa);
        fd.append('modal_premi_jiwa',modal_premi_jiwa);
        fd.append('modal_extra_premi_jiwa',modal_extra_premi_jiwa); 
        fd.append('modal_premi_jiwa_request',modal_premi_jiwa_request); 
        
        $('#loading-1').show();
        $.ajax({
            url: base_url + "Asuransi/Cover_asuransi_controller/cover_jiwa_process",
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
                        title: 'Sukses Cover Asuransi Jiwa',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(()=> {
                        $('#modal_data_asuransi').modal('hide');
                        getData();
                    });  
                    console.log(response);
            },
            error : function(response) {
                console.log(response);
                $('#loading-1').hide();
                return Swal.fire({
                            icon: 'error',
                            title: 'Proses Gagal!',
                            text: 'Mohon Periksa Jaringan Anda'
                        });
            }
        });
   }

   function proses_done(){
        $.ajax({
                    url : base_url + "Asuransi/Cover_asuransi_controller/proses_done",
                    type : "POST",
                    dataType : "json",
                    timeout : 180000,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
                    data:{ "rekening"             : rekening},

                    success : function(response) {
                        $('#loading-1').hide();
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Sukses Ubah Status SUDAH',
                            showConfirmButton: false,
                            timer: 2000
                        }).then(()=> {
                            getData();
                        });  

                        
                    },
                    error : function(response) {
                        console.log('failed :' + response);
                        $('#loading-1').hide();
                        return Swal.fire({
                            icon: 'error',
                            title: 'Proses Gagal!',
                            text: 'Mohon Periksa Jaringan Anda'
                        });
                    }
            });         
   }

   function search_periode(){
        data = '';
        src_tgl_realisasi = $('#src_tgl_realisasi').val();

        $('#tbl_cover_asuransi').DataTable().clear();
        $('#tbl_cover_asuransi').DataTable().destroy();
        $('#loading').show(); 
        
        $.ajax({
                url : base_url + "Asuransi/Cover_asuransi_controller/search_periode",
                type : "POST",
                dataType : "json",
                timeout : 180000,
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                data:{  "src_tgl_realisasi" : src_tgl_realisasi},

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

   function search(){
        data = '';
        src_search = $('#src_search').val();
        $('#tbl_cover_asuransi').DataTable().clear();
        $('#tbl_cover_asuransi').DataTable().destroy();
        $('#loading').show(); 
        
        $.ajax({
                url : base_url + "Asuransi/Cover_asuransi_controller/search",
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

   function get_search_status(){
        data = '';
        src_status = $('#src_status').val();
        src_tgl_realisasi = $('#src_tgl_realisasi').val();
        $('#tbl_cover_asuransi').DataTable().clear();
        $('#tbl_cover_asuransi').DataTable().destroy();
        $('#loading').show(); 
        
        $.ajax({
                url : base_url + "Asuransi/Cover_asuransi_controller/get_search_status",
                type : "POST",
                dataType : "json",
                timeout : 180000,
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                data:{  "src_status" : src_status,
                        "src_tgl_realisasi" : src_tgl_realisasi},

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
    
   function mapping_search(response){
        for(i = 0; i < response.rekap_jaminan.length; i++ ){
            data += `<tr style="text-align:center">
                        <td><input type="checkbox" id="check" name="check" 
                            value="${response.rekap_jaminan[i]['id']}"
                            data-rekening="${response.rekap_jaminan[i]['no_rekening']}"
                                        data-agunanid="${response.rekap_jaminan[i]['agunan_id']}"  
                                        data-nasabahid="${response.rekap_jaminan[i]['nasabah_id']}"  
                                        data-no-reff-asuransi="${response.rekap_jaminan[i]['no_reff_asuransi']}"  
                                        data-no-reff-jaminan="${response.rekap_jaminan[i]['no_reff_jaminan']}" "></td>
                        <td>${response.rekap_jaminan[i]['TGL_REALISASI']}</td>
                        <td>${response.rekap_jaminan[i]['no_rekening']}</td>
                        <td>${response.rekap_jaminan[i]['NAMA_NASABAH']}</td>
                        <td>${response.rekap_jaminan[i]['jenis_jaminan']}</td>
                        <td>${response.rekap_jaminan[i]['DESKRIPSI_ASURANSI']}</td>
                        <td>${accounting.formatMoney(response.rekap_jaminan[i]['titipan_asuransi'], '', 0, ',', '.')}</td>
                        <td>${accounting.formatMoney(response.rekap_jaminan[i]['titipan_asuransi2'], '', 0, ',', '.')}</td>
                        <td>${accounting.formatMoney(response.rekap_jaminan[i]['komisi_asuransi'], '', 0, ',', '.')}</td>
                        <td>${accounting.formatMoney(response.rekap_jaminan[i]['premi_asuransi'], '', 0, ',', '.')}</td>
                        <td>${accounting.formatMoney(response.rekap_jaminan[i]['sisa_titipan_asuransi'], '', 0, ',', '.')}</td>
                        <td>${accounting.formatMoney(response.rekap_jaminan[i]['pengembalian_asuransi'], '', 0, ',', '.')}</td>
                        <td>${accounting.formatMoney(response.rekap_jaminan[i]['refund_asuransi'], '', 0, ',', '.')}</td>
                        <td>${accounting.formatMoney(response.rekap_jaminan[i]['klaim_asuransi'], '', 0, ',', '.')}</td>
                        <td>${response.rekap_jaminan[i]['status_cover']}</td>`;
           
            if(response.rekap_jaminan[i]['status_cover'] == 'BELUM'){
                data += `<td>        
                                <button type="button" class="btn btn-primary btn-sm py-0 btn_proses" id="btn_proses" style="font-size: 1  em;"
                                        data-rekening="${response.rekap_jaminan[i]['no_rekening']}"
                                        data-agunanid="${response.rekap_jaminan[i]['agunan_id']}"  
                                        data-nasabahid="${response.rekap_jaminan[i]['nasabah_id']}"  
                                        data-no-reff-asuransi="${response.rekap_jaminan[i]['no_reff_asuransi']}"  
                                        data-no-reff-jaminan="${response.rekap_jaminan[i]['no_reff_jaminan']}"  
                                        'name="btn_proses"
                                        data-toggle="tooltip" title="PROSES">
                                        <i class="fa fa-pen"></i> </button>
                            </td>
                        </tr>`;
            }else if(response.rekap_jaminan[i]['status_cover'] == 'PROSES'){
                data += `<td style="width: 200px;">    
                            <button type="button" class="btn btn-primary btn-sm py-0 btn_proses" id="btn_proses" style="font-size: 1  em;"
                                    data-rekening="${response.rekap_jaminan[i]['no_rekening']}"
                                    data-agunanid="${response.rekap_jaminan[i]['agunan_id']}"  
                                    data-nasabahid="${response.rekap_jaminan[i]['nasabah_id']}"  
                                    data-no-reff-asuransi="${response.rekap_jaminan[i]['no_reff_asuransi']}"  
                                    data-no-reff-jaminan="${response.rekap_jaminan[i]['no_reff_jaminan']}"  
                                    'name="btn_proses"
                                    data-toggle="tooltip" title="PROSES">
                                    <i class="fa fa-pen"></i> </button>`;   
                if(kode_kantor == '00'){
                    data +=        `<button type="button" class="btn btn-success btn-sm py-0 btn_done" id="btn_done" style="font-size: 1  em;"
                                    data-rekening="${response.rekap_jaminan[i]['no_rekening']}"
                                    data-agunanid="${response.rekap_jaminan[i]['agunan_id']}"  
                                    data-nasabahid="${response.rekap_jaminan[i]['nasabah_id']}"  
                                    data-no-reff-asuransi="${response.rekap_jaminan[i]['no_reff_asuransi']}"  
                                    data-no-reff-jaminan="${response.rekap_jaminan[i]['no_reff_jaminan']}"  
                                    'name="btn_done"
                                    data-toggle="tooltip" title="DONE">
                                    <i class="fa fa-check"></i> </button>`;
                }
                data += `</td>
                    </tr>`;
            }else{
                data += `<td></td>
                        </tr>`;
            }


            
            
            
        }
        $('#tbl_cover_asuransi > tbody:first').html(data);
        
        $(document).ready(function() {
            $('#tbl_cover_asuransi').DataTable( {
                "destroy": true,
                "scrollX": true,
                "autoWidth" : false,
                "searching": false,
                "aaSorting" : []
            } );
        } );
        $('#loading').hide(); 
   }

   function export_to_excel(){
        $('#loading').show(); 
        periode = $('#src_tgl_realisasi').val();
        console.log(periode);
        $.ajax({
                url : base_url + "Asuransi/Cover_asuransi_controller/export",
                type : "POST",
                dataType : "json",
                timeout : 180000,
                data:{  "periode" : periode},
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },

                success : function(response) {
                    console.log(response);
                    $('#loading').hide(); 
                    window.location.href = response.download;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Sukses Download Report Cover Asuransi',
                        showConfirmButton: false,
                        timer: 2000
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
   function export_selected(){
        $('#loading').show(); 
        $.ajax({
                url : base_url + "Asuransi/Cover_asuransi_controller/export_selected",
                type : "POST",
                dataType : "json",
                timeout : 180000,
                data:{  "checkArray" : checkArray,
                        "lengthParsed" : lengthParsed},
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },

                success : function(response) {
                    console.log(response);
                    $('#loading').hide(); 
                    window.location.href = response.download;
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Sukses Download Report Cover Asuransi',
                        showConfirmButton: false,
                        timer: 2000
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

    $('#btn_upload_jiwa').click(function(event) {
        prosees_upload();
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

    function prosees_upload(){
        
        up_rek    = $('#modal_nomor_rekening').val();
        var files = $('#modal_upload_jiwa')[0].files[0];

        if(fileUploads.length > 0){
            fileUploadsLength = fileUploads[0].length;
        }else{
            fileUploadsLength = 0;
        }

        console.log(fileUploads);
      
        var fd_up = new FormData();
        fd_up.append('files',files);
        fd_up.append('up_rek',up_rek);
        fd_up.append('fileUploads',fileUploads);
        fd_up.append('fileUploadsLength',fileUploadsLength);
        $('#loading-1').show();
        
        $.ajax({
            url: base_url + "Asuransi/Cover_asuransi_controller/proses_upload",
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
                        $('#loading-1').hide();
                        get_details();
                    });  
                    
            },
            error : function(response) {
                console.log(response);
                $('#loading-1').hide();
                get_details();
                return Swal.fire({
                            icon: 'error',
                            title: 'Proses Gagal!',
                            text: 'Mohon Periksa Jaringan Anda'
                });
            }
        });
    }

    function proses_delete_upload(){
        up_rek    = $('#modal_nomor_rekening').val();

        if(fileUploads.length > 0){
            fileUploadsLength = fileUploads[0].length;
        }else{
            fileUploadsLength = 0;
        }
        $('#loading-1').show();

        $.ajax({
                url : base_url + "Asuransi/Cover_asuransi_controller/proses_delete_upload",
                type : "POST",
                dataType : "json",
                timeout : 180000,
                headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        },
                data:{  "up_rek"            : up_rek,
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
                        $('#loading-1').hide();
                        get_details();
                    });  
                },
                error : function(response) {
                    console.log('failed :' + response);
                    $('#loading-1').hide();
                    get_details();
                    return Swal.fire({
                        icon: 'error',
                        title: 'Proses Gagal',
                        text: 'Mohon Periksa Jaringan Anda'
                    });
                    
                }
        });   
    }


   


</script>