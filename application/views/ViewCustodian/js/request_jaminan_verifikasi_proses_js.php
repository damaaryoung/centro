<script>

var dataTableeee        = [];
var selectedData        = [];
var mainTable           = [];
var arrNomorReff        = [];
var arrAgunanID         = [];
var parsedDataDetailArr = [];
var lengthParsed               = '';
var nomorreff                  = '';
var agunan_id                  = '';
var deskripsi                  = '';
var jenis                      = '';
var main_tanggal               = '';
var kode_custodian             = '';
var kode_kantor_lokasi_jaminan = '';
var main_keperluan             = '';
var main_keterangan            = '';
var main_nomor                 = '';


$(document).ready(function () {     
    
    var dataNomor = $('#getNomor').val();
    console.log(dataNomor);
    var mainVerifikasi = $('#mainVerifikasi').val();
    $('#loading').show(); 

    $.ajax({
        url : "<?= base_url(); ?>Request_Jaminan_Verifikasi_Controller/getDataDetail",
        type : "POST",
        dataType : "json",
        data : {"dataNomor" : dataNomor},

        success : function(response) {
            console.log(response);
            for(i = 0; i < response.length; i++ ){
                mainTable.push(response[i][0]);
                arrNomorReff.push(response[i][1]);
                arrAgunanID.push(response[i][2]);
            }
            $('#table_request_jaminan > tbody:first').html(mainTable);

            $('#loading').hide(); 
            if(mainVerifikasi == '1'){
                alert('Data sudah di verifikasi, tidak dapat dikoreksi');
                $("#btn_simpan_update_pemindahan_lokasi").prop("disabled", true);
                $("#btn_tambah_jaminan_main").prop("disabled", true);
                $(".btnDeleteJaminanData").prop("disabled", true);
                
                
            }else if(mainVerifikasi == '0'){
                $("#btn_simpan_update_pemindahan_lokasi").prop("disabled", false);
            }
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Gagal Get Data, Mohon Coba Lagi');
            window.location = base_url + 'index.php/PemindahanJaminanMainController/index';
        }
    });
    
});

$('#btn_batal').click(function () {
   
    window.location = '<?= base_url(); ?>Request_Jaminan_Verifikasi_Controller/index';
    
});
</script>