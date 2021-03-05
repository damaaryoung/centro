<script>
    var menu_kode         = <?php echo $this->session->userdata('menu_rekap_asuransi');?>;
    var base_url          = $('#base_url').val(); 
    var data              = '';
    var get_data_url      = '';
    var rekening          = '';
    var agunanid          = '';
    var nasabahid         = '';
    var no_reff_asuransi  = '';
    var no_reff_jaminan   = '';
    var src_tgl_realisasi = '';
    var src_search        = '';

    $(document).ready(function () {   
            if(menu_kode == '1'){
                get_data_url = base_url + "Asuransi/Rekap_titipan_asuransi_controller/get_data_rekap_jaminan";
            } else if(menu_kode == '2'){
                get_data_url = base_url + "Asuransi/Rekap_titipan_asuransi_controller/get_data_rekap_jiwa";
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

    function getData(){
        data = [];
        $('#loading').show(); 
        
        $('#tbl_rekap_titipan_asuransi').DataTable().clear();
        $('#tbl_rekap_titipan_asuransi').DataTable().destroy();
            $.ajax({
                    url : get_data_url,
                    type : "POST",
                    dataType : "json",
                    timeout : 180000,
                    headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },

                    success : function(response) {
                        $('#src_tgl_realisasi').val(response.sysdate);
                        mapping_get_data(response);
                        
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
                    data:{  "src_tgl_realisasi"         : src_tgl_realisasi},

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
                        <td>${accounting.formatMoney(response.rekap_jaminan[i]['komisi_asuransi'], '', 0, ',', '.')}</td>
                        <td>${accounting.formatMoney(response.rekap_jaminan[i]['premi_asuransi'], '', 0, ',', '.')}</td>
                        <td>${accounting.formatMoney(response.rekap_jaminan[i]['sisa_titipan_asuransi'], '', 0, ',', '.')}</td>
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
    
    
</script>