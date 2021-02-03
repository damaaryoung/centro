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

    $(document).ready(function () {     
       
        
            
            if(menu_kode == '1'){
                get_data_url = base_url + "Asuransi/Rekap_titipan_asuransi_controller/get_data_rekap_jaminan";
            } else if(menu_kode == '2'){
                get_data_url = base_url + "Asuransi/Rekap_titipan_asuransi_controller/get_data_rekap_jiwa";
            }
            getData();
    });

    // $('#tbl_rekap_titipan_asuransi').on('click','.btn_proses', function () {
           
    //        rekening          = $(this).data("rekening");
    //        agunanid          = $(this).data("agunanid");
    //        nasabahid         = $(this).data("nasabahid");
    //        no_reff_asuransi  = $(this).data("no-reff-asuransi");
    //        no_reff_jaminan   = $(this).data("no-reff-jaminan");

    // });

    ///// FUNCTION HERE //////

    function getData(){
        dataTableeee = [];
        $('#loading').show(); 
        
            $.ajax({
                    url : get_data_url,
                    type : "POST",
                    dataType : "json",
                    headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },

                    success : function(response) {
                        $('#tbl_rekap_titipan_asuransi').DataTable().clear();
                        $('#tbl_rekap_titipan_asuransi').DataTable().destroy();
                        console.log(response);
                        $('#src_tgl_realisasi').val(response.sysdate);


                        for(i = 0; i < response.rekap_jaminan.length; i++ ){
                            data += `<tr>
                                        <td>${response.rekap_jaminan[i]['TGL_REALISASI']}</td>
                                        <td>${response.rekap_jaminan[i]['no_rekening']}</td>
                                        <td>${response.rekap_jaminan[i]['NAMA_NASABAH']}</td>
                                        <td>${response.rekap_jaminan[i]['jenis_jaminan']}</td>
                                        <td>${response.rekap_jaminan[i]['DESKRIPSI_ASURANSI']}</td>
                                        <td>${response.rekap_jaminan[i]['titipan_asuransi']}</td>
                                        <td>${response.rekap_jaminan[i]['komisi_asuransi']}</td>
                                        <td>${response.rekap_jaminan[i]['premi_asuransi']}</td>
                                        <td>${response.rekap_jaminan[i]['sisa_titipan_asuransi']}</td>
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
                        
                    },
                    error : function(response) {
                        console.log('failed :' + response);
                        alert('Gagal Get Data, Tidak Ada Data / Mohon Coba Kembali Beberapa Saat Lagi');
                        $('#loading').hide();
                    }
            });    
       


    }

    
    
</script>