<script>
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
    var modal_no_polis         = '';
    var src_periode            = '';
    var src_search             = '';
    var modal_status_endorsement = '';

    $(document).ready(function () {     
        getData();
    });

    $('#tbl_body_polis_asuransi_jaminan').on('click','.btn_proses', function () {    
        rekening          = $(this).data("rekening");
        agunanid          = $(this).data("agunanid");
        nasabahid         = $(this).data("nasabahid");
        no_reff_asuransi  = $(this).data("no-reff-asuransi");
        no_reff_jaminan   = $(this).data("no-reff-jaminan");
        $('#loading').show();
        get_details();
           
    });

    $('#btn_save_polis').click(function () {
        if($("#modal_no_polis").val() == "" || $("#modal_no_polis").val() == null){
            return Swal.fire({
                        icon: 'error',
                        title: 'Oops!',
                        text: 'Anda Belum Mengisi Nomor Polis!'
            });

        }
        
        process_polis_jaminan();
    });

    $('#btn_refresh').click(function(event) {
        getData();
    }); 

    $('#src_periode').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            search_periode();
        }
    }); 

    $('#src_search').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            search();
        }
    }); 

    


    function getData(){
        data = '';
        $('#tbl_polis_asuransi_jaminan').DataTable().clear();
        $('#tbl_polis_asuransi_jaminan').DataTable().destroy();
        $('#loading').show(); 
        
            $.ajax({
                    url : base_url + "Asuransi/Polis_asuransi_jaminan_controller/get_data_polis_jaminan",
                    type : "POST",
                    dataType : "json",
                    timeout : 180000,
                    headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },

                    success : function(response) {
                        $('#src_periode').val(response.sysdate);
                        mapping_get_data(response);  
                        
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
        $.ajax({
                    url : base_url + "Asuransi/Polis_asuransi_jaminan_controller/get_data_detail",
                    type : "POST",
                    dataType : "json",
                    timeout : 180000,
                    headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                    data:{  "rekening"         : rekening,
                            "agunanid"         : agunanid,
                            "nasabahid"        : nasabahid,
                            "no_reff_asuransi" : no_reff_asuransi,
                            "no_reff_jaminan"  : no_reff_jaminan},
                    success : function(response) {
                        $('#loading').hide();
                        console.log(response);
                        $('#modal_data_polis_asuransi').modal('show');
                        var jkw_asuransi_y = response.data_details[0]['jkw_asuransi_jiwa'];
                        var jkw_asuransi_m = jkw_asuransi_y * 12;

                        $('#modal_nomor_rekening').val(response.data_details[0]['no_rekening']);
                        $('#modal_nama_nasabah').val(response.data_details[0]['NAMA_NASABAH']); 
                        $('#modal_tempat_lahir').val(response.data_details[0]['TEMPATLAHIR']); 
                        $('#modal_tanggal_lahir').val(response.data_details[0]['TGLLAHIR']); 
                        $('#modal_telepon').val(response.data_details[0]['TELPON']); 
                        $('#modal_alamat').val(response.data_details[0]['alamat_nasabah']); 
                        $('#modal_tanggal_realisasi').val(response.data_details[0]['TGL_REALISASI']); 
                        $('#modal_tgl_jt_tempo').val(response.data_details[0]['TGL_JATUH_TEMPO']); 
                        $('#modal_nilai_titipan').val(accounting.formatMoney(response.data_details[0]['titipan_asuransi'], '', 0, ',', '.')); 
                        $('#modal_jaminan').val(response.data_details[0]['jenis_jaminan']); 
                        $('#modal_nama_jaminan').val(response.data_details[0]['nama']); 
                        $('#modal_alamat_jaminan').val(response.data_details[0]['alamat_jaminan']); 

                        $('#modal_pertanggungan').val(accounting.formatMoney(response.data_details[0]['NILAI_ASURANSI'], '', 0, ',', '.')); 
                        $('#modal_plafon').val(accounting.formatMoney(response.data_details[0]['plafon'], '', 0, ',', '.')); 
                        $('#modal_lama_cover_m').val(jkw_asuransi_m); 
                        $('#modal_rate').val(response.data_details[0]['rate']); 
                        $('#modal_premi').val(accounting.formatMoney(response.data_details[0]['premi_asuransi'], '', 0, ',', '.')); 
                        $('#modal_inp_asuransi').val(response.data_details[0]['DESKRIPSI_ASURANSI']); 
                        $("#modal_no_polis").val(response.data_details[0]['no_polis']);

                        if(response.data_details[0]['status_endorsement'] == '1'){
                            document.getElementById("modal_status_endorsement").checked = true;
                        }else{
                            document.getElementById("modal_status_endorsement").checked = false;
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

    function process_polis_jaminan(){
        modal_no_polis = $("#modal_no_polis").val();
        if (document.getElementById('modal_status_endorsement').checked) {
            modal_status_endorsement = '1';
        } else {
            modal_status_endorsement = '0';
        }
        $('#loading-1').show();
        
        $.ajax({
            url : base_url + "Asuransi/Polis_asuransi_jaminan_controller/polis_jaminan_process",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            data:{  "modal_no_polis"           : modal_no_polis,
                    "modal_status_endorsement" : modal_status_endorsement,
                    "rekening"                 : rekening},

            success : function(response) {
                $('#loading-1').hide();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Sukses Update Polis Asuransi Jaminan',
                    showConfirmButton: false,
                    timer: 2000
                }).then(()=> {
                    $('#modal_data_polis_asuransi').modal('hide');
                    getData();
                });  

                        
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading-1').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Proses Gagal!',
                    text: 'Mohon Periksa Jaringan Anda!'
                });
            }
        });    
        
    }

    function search_periode(){
        data = '';
        src_periode = $('#src_periode').val();
        $('#tbl_polis_asuransi_jaminan').DataTable().clear();
        $('#tbl_polis_asuransi_jaminan').DataTable().destroy();
        $('#loading').show(); 
        
            $.ajax({
                    url : base_url + "Asuransi/Polis_asuransi_jaminan_controller/search_date",
                    type : "POST",
                    dataType : "json",
                    timeout : 180000,
                    headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                    data:{  "src_periode" : src_periode},

                    success : function(response) {
                        mapping_get_data(response);                      
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
        $('#tbl_polis_asuransi_jaminan').DataTable().clear();
        $('#tbl_polis_asuransi_jaminan').DataTable().destroy();
        $('#loading').show(); 
        
            $.ajax({
                    url : base_url + "Asuransi/Polis_asuransi_jaminan_controller/get_search",
                    type : "POST",
                    dataType : "json",
                    timeout : 180000,
                    headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                    data:{  "src_search" : src_search},

                    success : function(response) {
                        mapping_get_data(response);                      
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

    function mapping_get_data(response){
        var endorse = '';
        for(i = 0; i < response.rekap_jaminan.length; i++ ){
            if(response.rekap_jaminan[i]['status_endorsement'] == '1'){
                endorse = 'YA';
            }else if(response.rekap_jaminan[i]['status_endorsement'] == '0'){
                endorse = 'TIDAK';
            }else{
                endorse = '';
            }
            data += `<tr>
                        <td>${response.rekap_jaminan[i]['no_polis']}</td>
                        <td>${response.rekap_jaminan[i]['TGL_REALISASI']}</td>
                        <td>${response.rekap_jaminan[i]['no_rekening']}</td>
                        <td>${response.rekap_jaminan[i]['NAMA_NASABAH']}</td>
                        <td>${endorse}</td>
                        <td>${response.rekap_jaminan[i]['DESKRIPSI_ASURANSI']}</td>
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
        $('#tbl_polis_asuransi_jaminan > tbody:first').html(data);
        
        $(document).ready(function() {
            $('#tbl_polis_asuransi_jaminan').DataTable( {
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