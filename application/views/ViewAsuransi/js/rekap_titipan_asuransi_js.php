<script>
    var menu_kode         = <?php echo $this->session->userdata('menu_rekap_asuransi');?>;
    var base_url          = $('#base_url').val(); 
    var kd_kantor_user    = $('#user_kode_kantor').val(); 
    var data              = '';
    var get_data_url      = '';
    var rekening          = '';
    var agunanid          = '';
    var nasabahid         = '';
    var no_reff_asuransi  = '';
    var no_reff_jaminan   = '';
    var src_tgl_realisasi = '';
    var src_search        = '';
    var src_kode_kantor   = '';

    $(document).ready(function () { 
            $('.select2').select2();  
            $('#load_recon').hide(); 
            $('.recon_view').hide(); 
            if(menu_kode == '1'){
                get_data_url = base_url + "Asuransi/Rekap_titipan_asuransi_controller/get_data_rekap_jaminan";
            } else if(menu_kode == '2'){
                get_data_url = base_url + "Asuransi/Rekap_titipan_asuransi_controller/get_data_rekap_jiwa";
            }
            if(kd_kantor_user == '00' || divisi_user == 'IT'){
                select_kantor = '0';
                $('#src_kode_kantor').append('<option value="" selected>ALL</option>');
                get_kode_kantor();
            }else{
                $('#src_kode_kantor').append('<option value="' + kd_kantor_user + '" selected>'+ kd_kantor_user +'</option>');
            }
            getData();
    });
    $('#src_search').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            search();
        }
    }); 
    $('#btn_refresh').click(function(event) {
        getData();
    }); 

    ///// FUNCTION HERE //////
    function get_kode_kantor(){
        $.ajax({
                url : base_url + "Asuransi/Rekap_titipan_asuransi_controller/get_kode_kantor",
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
    function getData(){
        data = [];
        $('#loading').show(); 
        
        $('#tbl_rekap_titipan_asuransi').DataTable().clear();
        $('#tbl_rekap_titipan_asuransi').DataTable().destroy();
        src_kode_kantor = $('#src_kode_kantor').val();
            $.ajax({
                    url : get_data_url,
                    type : "POST",
                    dataType : "json",
                    timeout : 180000,
                    headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                    data: {'src_kode_kantor' : src_kode_kantor},

                    success : function(response) {
                        $('#src_tgl_realisasi').val(response.sysdate);
                        mapping_get_data(response);
                        get_rekonsiliasi(); 
                    },
                    error : function(response) {
                        console.log('failed :' + response);
                        alert('Gagal Get Data, Tidak Ada Data / Mohon Coba Kembali Beberapa Saat Lagi');
                        $('#loading').hide();
                    }
            });    
    }

    function search_tanggal(){
        data = [];
        src_tgl_realisasi = $('#src_tgl_realisasi').val();
        src_kode_kantor = $('#src_kode_kantor').val();

        $('#tbl_rekap_titipan_asuransi').DataTable().clear();
        $('#tbl_rekap_titipan_asuransi').DataTable().destroy();

        $('#loading').show(); 
            $.ajax({
                    url : base_url + "Asuransi/Rekap_titipan_asuransi_controller/getSearch_Tanggal",
                    type : "POST",
                    dataType : "json",
                    timeout : 180000,
                    headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                    data:{  "src_tgl_realisasi"         : src_tgl_realisasi,
                            'src_kode_kantor' : src_kode_kantor},

                    success : function(response) {
                        mapping_get_data(response);
                        get_rekonsiliasi(); 
                    },
                    error : function(response) {
                        console.log('failed :' + response);
                        alert('Gagal Get Data, Tidak Ada Data / Mohon Coba Kembali Beberapa Saat Lagi');
                        $('#loading').hide();
                    }
            });    
    }
    function search(){
        data = [];
        src_search = $('#src_search').val();
        $('#loading').show(); 
        $('#tbl_rekap_titipan_asuransi').DataTable().clear();
        $('#tbl_rekap_titipan_asuransi').DataTable().destroy();
        
            $.ajax({
                    url : base_url + "Asuransi/Rekap_titipan_asuransi_controller/get_search",
                    type : "POST",
                    dataType : "json",
                    timeout : 180000,
                    headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                    data:{  "src_search"         : src_search},

                    success : function(response) {
                        mapping_get_data(response);                        
                    },
                    error : function(response) {
                        console.log('failed :' + response);
                        alert('Gagal Get Data, Tidak Ada Data / Mohon Coba Kembali Beberapa Saat Lagi');
                        $('#loading').hide();
                    }
            });    
    }
    function mapping_get_data(response){
        
        for(i = 0; i < response.rekap_jaminan.length; i++ ){
            data += `<tr>
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
                    </tr>`;
        }
        $('#tbl_rekap_titipan_asuransi > tbody:first').html(data);
                    
        $(document).ready(function() {
            $('#tbl_rekap_titipan_asuransi').DataTable( {
                "destroy": true,
                "scrollX": true,
                "autoWidth" : false,
                "searching": false,
                "aaSorting" : []
            } );
        } );
        $('#loading').hide();                   
    }
    async function get_rekonsiliasi(){
        
        src_tgl_realisasi = $('#src_tgl_realisasi').val();
        $('.recon_view').hide();
        $('#load_recon').show();  
        $.ajax({
                    url : base_url + "Asuransi/Rekap_titipan_asuransi_controller/get_rekonsiliasi",
                    type : "POST",
                    dataType : "json",
                    timeout : 180000,
                    headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                    data:{  "src_tgl_realisasi"         : src_tgl_realisasi,
                            'src_kode_kantor' : src_kode_kantor},

                    success : function(response) {
                        
                        var buku_besar = response.buku_besar;
                        var web_centro = response.web_centro;
                        var selisih = buku_besar - web_centro;

                        
                        $('.recon_view').show();

                        $('#saldo_buku_besar').val(accounting.formatMoney(buku_besar, '', 2, ',', '.'));
                        $('#saldo_rekap_centro').val(accounting.formatMoney(web_centro, '', 2, ',', '.'));
                        $('#saldo_selisih').val(accounting.formatMoney(selisih, '', 2, ',', '.'));

                        if(selisih == 0){
                            $('#running_text1').hide();
                        }else{
                            $('#running_text1').show();
                        }

                        $('#load_recon').hide();  
                    },
                    error : function(response) {
                        console.log('failed :' + response);
                        alert('Gagal Get Data Rekonsiliasi, Data Tidak Tersedia atau Periksa Jaringan Anda');
                        $('#load_recon').hide();
                    }
            });        
    }
    
    
</script>