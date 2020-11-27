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
var mainVerifikasi = '';
var dataDefaultVerif = '';


$(document).ready(function () {     
    
    var dataNomor = $('#getNomor').val();
    console.log(dataNomor);
    mainVerifikasi = $('#mainVerifikasi').val();
    dataDefaultVerif = $('#dataDefaultVerif').val();
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
            if(dataDefaultVerif == '1'){
                Swal.fire({
                    icon: 'error',
                    title: 'Perhatian...',
                    text: 'Data Sudah Di Verifikasi, Data Tidak Dapat Dikoreksi',
                    allowOutsideClick: false,
                    footer: '<a href></a>'
                }).then(()=> {
                   $("#btn_simpan").prop("disabled", true);
                   $("#btn_print").prop("disabled", false);
                   $(".btnDeleteJaminanData").prop("disabled", true);
                });
            }else if(dataDefaultVerif == '0'){
                $("#btn_simpan").prop("disabled", false);
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

$('#btn_simpan').click(function () {

    main_tanggal               = $('#main_tanggal').val();
    kode_custodian             = $('#kode_custodian').val();
    kode_kantor_lokasi_jaminan = $('#kode_kantor_lokasi_jaminan').val();
    main_keperluan             = $('#main_keperluan').val();
    main_keterangan            = $('#main_keterangan').val();
    main_nomor                 = $('#main_nomor').val();
    mainVerifikasi             = $('#mainVerifikasi').val();
    
    dataDefaultVerif = $('#dataDefaultVerif').val();

    for(i = 0; i < mainTable.length; i++ ){
        var data = [arrNomorReff[i].toString(), arrAgunanID[i].toString()];
        parsedDataDetailArr.push(data);
    }
    lengthParsed = parsedDataDetailArr.length;

    console.log(main_nomor, main_tanggal, kode_custodian, kode_kantor_lokasi_jaminan, main_keperluan, main_keterangan, mainVerifikasi);
    console.log(parsedDataDetailArr, lengthParsed);

    if(dataDefaultVerif == '1'){
        Swal.fire({
                    icon: 'error',
                    title: 'Perhatian...',
                    text: 'Data Sudah Di Verifikasi, Data Tidak Dapat Dikoreksi',
                    allowOutsideClick: false,
                    footer: '<a href></a>'
        });
        return;
    }


    $('#loading').show(); 
    $.ajax({
        url : "<?= base_url(); ?>Request_Jaminan_Verifikasi_Controller/prosesVerifikasi",
        type : "POST",
        dataType : "json",
        data : {"main_nomor"                 : main_nomor,
                "main_tanggal"               : main_tanggal,
                "kode_custodian"             : kode_custodian,
                "kode_kantor_lokasi_jaminan" : kode_kantor_lokasi_jaminan,
                "main_keperluan"             : main_keperluan,
                "main_keterangan"            : main_keterangan,
                "mainVerifikasi"             : mainVerifikasi,
                "parsedDataDetailArr"        : parsedDataDetailArr,
                "lengthParsed"               : lengthParsed},

        success : function(response) {
            //alert('Sukses Verifikasi Request Pemindahan Dokumen'); 
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Sukses Verifikasi Request Pemindahan Dokumen',
                showConfirmButton: false,
                timer: 2000
            }).then(()=> {
                window.location = '<?= base_url(); ?>request_jaminan_verifikasi';
                $('#loading').hide(); 
                console.log(response);
            });  
        },
        error : function(response) {
            console.log('failed :' + response);
            //alert('Gagal Verifikasi Request Jaminan, Silahkan Coba Beberapa Saat Lagi Atau Hubungi Team IT');
            Swal.fire({
                    icon: 'error',
                    title: 'Perhatian...',
                    text: 'Gagal Verifikasi Request Jaminan, Silahkan Coba Beberapa Saat Lagi Atau Hubungi Team IT',
                    allowOutsideClick: false,
                    footer: '<a href></a>'
            }).then(()=> {
                window.location = '<?= base_url(); ?>request_jaminan_verifikasi';
                $('#loading').hide(); 
            });
            
        }
    });
    
}); 


</script>