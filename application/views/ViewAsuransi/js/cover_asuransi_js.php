<script>
    var menu_kode              = <?php echo $this->session->userdata('menu_cover_asuransi');?>;
    var base_url               = $('#base_url').val(); 
    var data                   = '';
    var get_data_url           = '';
    var rekening               = '';
    var agunanid               = '';
    var nasabahid              = '';
    var no_reff_asuransi       = '';
    var no_reff_jaminan        = '';
    var data_okupasi_jaminan   = '';
    var premi_jaminan          = '';
    var rate_jaminan           = '';
    var modal_rate_jiwa        = '';
    var modal_premi_jiwa       = '';
    var modal_selisih_jiwa     = '';
    var modal_extra_premi_jiwa = '';


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
            $('#loading-1').show();
            data_okupasi_jaminan = $('#modal_data_okupasi_jaminan').val();
            premi_jaminan        = accounting.unformat($('#modal_premi_jaminan').val());
            rate_jaminan         = $('#modal_rate_jaminan').val();
           
            cover_jaminan_process();

            
        } else if(menu_kode == '2'){
            
            cover_jiwa_process();
        }
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
                    headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },

                    success : function(response) {
                        //console.log(response);
                        $('#src_tgl_realisasi').val(response.sysdate);


                        for(i = 0; i < response.rekap_jaminan.length; i++ ){
                            data += `<tr>
                                        <td>${response.rekap_jaminan[i]['TGL_REALISASI']}</td>
                                        <td>${response.rekap_jaminan[i]['no_rekening']}</td>
                                        <td>${response.rekap_jaminan[i]['NAMA_NASABAH']}</td>
                                        <td>${response.rekap_jaminan[i]['jenis_jaminan']}</td>
                                        <td>${response.rekap_jaminan[i]['DESKRIPSI_ASURANSI']}</td>
                                        <td>${accounting.formatMoney(response.rekap_jaminan[i]['titipan_asuransi'], '', 0, ',', '.')}</td>
                                        <td>${accounting.formatMoney(response.rekap_jaminan[i]['komisi_asuransi'], '', 0, ',', '.')}</td>
                                        <td>${accounting.formatMoney(response.rekap_jaminan[i]['premi_asuransi'], '', 0, ',', '.')}</td>
                                        <td>${accounting.formatMoney(response.rekap_jaminan[i]['sisa_titipan_asuransi'], '', 0, ',', '.')}</td>
                                        <td>${response.rekap_jaminan[i]['status_cover']}</td>
                                        <td>        
                                            <button type="button" class="btn btn-primary btn-sm btn_proses" id="btn_proses"
                                                    data-rekening="${response.rekap_jaminan[i]['no_rekening']}"
                                                    data-agunanid="${response.rekap_jaminan[i]['agunan_id']}"  
                                                    data-nasabahid="${response.rekap_jaminan[i]['nasabah_id']}"  
                                                    data-no-reff-asuransi="${response.rekap_jaminan[i]['no_reff_asuransi']}"  
                                                    data-no-reff-jaminan="${response.rekap_jaminan[i]['no_reff_jaminan']}"  
                                                    'name="btn_proses">
                                                    <i class="fa fa-pen"></i> </button>
                                        </td>
                                    </tr>`;
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
                        
                    },
                    error : function(response) {
                        console.log('failed :' + response);
                        alert('Gagal Get Data, Tidak Ada Data / Mohon Coba Kembali Beberapa Saat Lagi');
                        $('#loading').hide();
                    }
            });    
    }

    function get_details(){
        $('#modal_data_okupasi_jaminan').find('option').remove().end();
        $.ajax({
                    url : base_url + "Asuransi/Cover_asuransi_controller/get_data_detail",
                    type : "POST",
                    dataType : "json",
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
                        $('#modal_plafon').val(accounting.formatMoney(response.data_details[0]['plafond'], '', 0, ',', '.')); 
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
                            $('#modal_premi_jiwa').val(response.data_details[0]['premi_asuransi']); 
                            $('#modal_selisih_jiwa').val(0); 
                        }


                        $('#loading-1').hide();
                        
                    },
                    error : function(response) {
                        console.log('failed :' + response);
                        alert('Gagal Get Data, Tidak Ada Data / Mohon Coba Kembali Beberapa Saat Lagi');
                        $('#loading').hide();
                    }
            });    
       
    }
            
   function cover_jaminan_process(){
        $.ajax({
                    url : base_url + "Asuransi/Cover_asuransi_controller/cover_jaminan_process",
                    type : "POST",
                    dataType : "json",
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
                    data:{  "data_okupasi_jaminan" : data_okupasi_jaminan,
                            "premi_jaminan"        : premi_jaminan,
                            "rate_jaminan"         : rate_jaminan,
                            "rekening"             : rekening},

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
                        alert('Gagal Cover Jaminan, Mohon Periksa Jaringan Anda');
                        $('#loading-1').hide();
                    }
            });    
   }
   
   function cover_jiwa_process(){

        modal_rate_jiwa        = $('#modal_rate_jiwa').val();
        modal_premi_jiwa       = accounting.unformat($('#modal_premi_jiwa').val());
        if (document.getElementById('modal_extra_premi_jiwa').checked) {
            modal_extra_premi_jiwa = '1';
        } else {
            modal_extra_premi_jiwa = '0';
        }

        if($('#modal_file_spa_spajk_jiwa')[0].files[0] == null){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Anda Belum Memilih File SPA/SPAJK Untuk Di Upload!'
            });
        }

        let fd = new FormData();
        let files = $('#modal_file_spa_spajk_jiwa')[0].files[0];

        fd.append('files',files);
        fd.append('rekening',rekening);
        fd.append('modal_rate_jiwa',modal_rate_jiwa);
        fd.append('modal_premi_jiwa',modal_premi_jiwa);
        fd.append('modal_extra_premi_jiwa',modal_extra_premi_jiwa);
       
        console.log(files);
        $('#loading-1').show();
        $.ajax({
            url: base_url + "Asuransi/Cover_asuransi_controller/cover_jiwa_process",
            type:"POST",
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
                        title: 'Sukses Cover Asuransi Jaminan',
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
                alert('Gagal Cover Jiwa');
                $('#loading-1').hide();
            }
        });
   }
    
</script>