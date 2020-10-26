var dataTableeee = [];
var mainTable = [];
var arrNomorReff = [];
var arrAgunanID = [];
var selectedData = '';
var nomorreff = '';
var agunan_id = '';
var mainNomor = '';

var mainTanggal = '';
var kode_kantor_tujuan = '';
var kode_lokasi_penyimpanan = '';
var mainKeterangan = '';
var lengthParsed = '';
var parsedDataDetailArr = [];
var base_url = $('#base_url').val();


$(document).ready(function () {     
    
    var dataNomor = $('#getNomor').val();
    $('#loading').show(); 

    $.ajax({
        url : base_url + "index.php/PemindahanVerifikasiController/getDataDetail",
        type : "POST",
        dataType : "json",
        data : {"dataNomor" : dataNomor},

        success : function(response) {
            for(i = 0; i < response.length; i++ ){
                mainTable.push(response[i][0]);
                arrNomorReff.push(response[i][1]);
                arrAgunanID.push(response[i][2]);
            }
            $('#tablePemindahanVerifikasiMain > tbody:first').html(mainTable);
            $("#btn_tambah_jaminan_main").prop("disabled", true);
            $(".btnDeleteJaminanData").prop("disabled", true);
            $('#loading').hide(); 
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Gagal Get Data, Mohon Coba Lagi');
            window.location = base_url + 'index.php/PemindahanVerifikasiController/index';
        }
    });
    
});

$('#btn_kembali_verifikasi_pemindahan_lokasi').click(function () {
    $('#loading').show();
    window.location = base_url + 'index.php/PemindahanVerifikasiController/index';
});

$('#btn_simpan_verifikasi_pemindahan_lokasi').click(function () {
    mainTanggal             = $('#mainTanggal').val();
    kode_kantor_tujuan      = $('#kode_kantor_tujuan').val();  
    kode_lokasi_penyimpanan = $('#kode_lokasi_penyimpanan').val();  
    mainKeterangan          = $('#mainKeterangan').val(); 
    mainNomor               = $('#mainNomor').val();
    mainVerifikasi          = $('#mainVerifikasi').val();

    for(i = 0; i < mainTable.length; i++ ){
        var data = [arrNomorReff[i].toString(), arrAgunanID[i].toString()];
        parsedDataDetailArr.push(data);
    }
    lengthParsed = parsedDataDetailArr.length;

    $('#loading').show(); 
    $.ajax({
        url : base_url + "index.php/PemindahanVerifikasiController/prosesVerifikasi",
        type : "POST",
        dataType : "json",
        data : {"mainTanggal"             : mainTanggal,
                "kode_kantor_tujuan"      : kode_kantor_tujuan,
                "kode_lokasi_penyimpanan" : kode_lokasi_penyimpanan,
                "mainKeterangan"          : mainKeterangan,
                "mainNomor"               : mainNomor,
                "parsedDataDetailArr"     : parsedDataDetailArr,
                "lengthParsed"            : lengthParsed,
                "mainVerifikasi"          : mainVerifikasi
            },

        success : function(response) {
            alert('Data Sukses di Verifikasi');   
            window.location = base_url + 'index.php/PemindahanVerifikasiController/index';

        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Gagal Verifikasi Data Pemindahan Jaminan, Mohon Coba Lagi atau Hubungi Team IT');
            window.location = base_url + 'index.php/PemindahanVerifikasiController/index';
        }
    });
    
});

