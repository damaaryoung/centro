var dataTableeee = [];
var mainAreaKerja = '';
var mainTanggal   = '';
var mainTransaksi = '';
var mainNama      = '';
var mainKeterangan = '';
var mainKeterangan = '';
var mainKota       = '';
var mainJenisPengurusan = '';
var mainNomorRekening = '';
var mainNamaNasabah = '';
var mainTanggalRealisasi = '';
var sertTglRegister = '';
var bpkbTglRegister = '';
var base_url = $('#base_url').val();

$('#mainBtnSearchRekening').click(function () {
    dataRekening(); 
});
$('#bodyNomorRekening').on('click','.btnPilihRekening', function () {
    var namaNasabah   = $(this).data("nama");
    var noRekening   = $(this).data("norek");

    $('#mainNomorRekening').val(noRekening);
    $('#mainNamaNasabah').val(namaNasabah);
    $('#modalNomorRekening').modal('hide');
});
$('#btn_kembali_norek_modal').click(function ()  {
    $('#modalNomorRekening').modal('hide');
});
$('#btn_kembali_norek_modal2').click(function () {
    $('#modalNomorRekening').modal('hide');
});

function dataRekening(){
    $('#modalNomorRekening').modal('show');
    dataTableeee = [];
    $.ajax({
            url : base_url + "AsetDokumenEntryController/getNomorRekening",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            data : {"test"    : "test"},

            success : function(response) {
                        
                dataTableeee.push(response); 
                $('#TableNoRek > tbody:first').html(dataTableeee);
                $(document).ready(function() {
                    $('#TableNoRek').DataTable( {
                        "destroy": true,
                        "scrollX": true,
                        "autoWidth" : false,
                        "searching": false,
                        "aaSorting" : []
                    } );
                } );
                $('#loading2').hide();  
                
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading2').hide(); 
                $('#modalNomorRekening').modal('hide');
                alert('Gagal Get Detail Nomor Rekening, Mohon Periksa Jaringan Anda!');
                
            }
    });  
}

function serchDataRekening(){
    $('#TableNoRek').DataTable().clear();
    $('#TableNoRek').DataTable().destroy();
    var search = $('#search').val(); 
    dataTableeee = [];
    $('#loading2').show(); 

    $.ajax({
            url : base_url + "AsetDokumenEntryController/getDataSearchRekening",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            data : {"search"    : search},

            success : function(response) {
                        
                dataTableeee.push(response); 
                $('#TableNoRek > tbody:first').html(dataTableeee);
                $(document).ready(function() {
                    $('#TableNoRek').DataTable( {
                        "destroy": true,
                        "scrollX": true,
                        "autoWidth" : false,
                        "searching": false,
                        "aaSorting" : []
                    } );
                } );
                $('#loading2').hide();  
                
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading2').hide(); 
                alert('Gagal Get Detail Nomor Rekening, Mohon Periksa Jaringan Anda!');
            }
    });    
}


$(document).ready(function () {     
    
    console.log($('#rowSertNoSertif').val());

    if($('#rowSertNoSertif').text() != ''){
        $('#main_tab_bpkb').hide(); 
        $('#main_tab_emas').hide(); 
        $('#main_tab_sert').show();
    } else  if($('#rowBPKBNoBpkb').text() != ''){
        $('#main_tab_bpkb').show(); 
        $('#main_tab_emas').hide(); 
        $('#main_tab_sert').hide();
    } else  if($('#rowEmasNoSeri').text() != ''){
        $('#main_tab_bpkb').hide(); 
        $('#main_tab_emas').show(); 
        $('#main_tab_sert').hide();
    }
    $('#mainTakeover').on('click', function(){             

        if(document.getElementById("mainTakeover").checked == true){
            console.log('di check');
            $('#mainTransaksi option:contains(WAITING)').prop({selected: true});
        }
        if(document.getElementById("mainTakeover").checked == false){
            console.log('tidak');
            $('#mainTransaksi option:contains(MASUK)').prop({selected: true});
        }
    })


});

$('#delTempSert').click(function () {
    $('#loading').show();
    $.ajax({
        url : base_url + "AsetDokumenEntryController/deleteTempSert",
        type : "POST",
        dataType : "json",
        data : {"data"    : "data"},

        success : function(response) {
            alert('Data Sukses Di Hapus');
            $('#loading').hide();
            window.location = base_url + 'AsetDokumenEntryController/displayTambahAsetDokumen';  
        },
        error : function(response) {
            alert('Data Gagal Di Hapus');
            console.log('failed :' + response);
            $('#loading').hide();
            window.location = base_url + 'AsetDokumenEntryController/displayTambahAsetDokumen';
        }
    }); 
});

$('#deleteTempBPKB').click(function () {
    $('#loading').show();
    $.ajax({
        url : base_url + "AsetDokumenEntryController/deleteTempBPKB",
        type : "POST",
        dataType : "json",
        data : {"data"    : "data"},

        success : function(response) {
            alert('Data Sukses Di Hapus');
            $('#loading').hide();
            window.location = base_url + 'AsetDokumenEntryController/displayTambahAsetDokumen';  
        },
        error : function(response) {
            alert('Data Gagal Di Hapus');
            console.log('failed :' + response);
            $('#loading').hide();
            window.location = base_url + 'AsetDokumenEntryController/displayTambahAsetDokumen';
        }
    }); 
});

$('#delTempEmas').click(function () {
    $('#loading').show();
    $.ajax({
        url : base_url + "AsetDokumenEntryController/deleteTempEmas",
        type : "POST",
        dataType : "json",
        data : {"data"    : "data"},

        success : function(response) {
            alert('Data Sukses Di Hapus');
            $('#loading').hide();
            window.location = base_url + 'AsetDokumenEntryController/displayTambahAsetDokumen';  
        },
        error : function(response) {
            alert('Data Gagal Di Hapus');
            console.log('failed :' + response);
            $('#loading').hide();
            window.location = base_url + 'AsetDokumenEntryController/displayTambahAsetDokumen';
        }
    }); 
});

$('#btnTambahBPKB').click(function () {
    
    mainAreaKerja =  $('#mainAreaKerja').val();
    mainTanggal   =  $('#mainTanggal').val();
    mainTransaksi =  $('#mainTransaksi').val();
    mainNama      =  $('#mainNama').val();
    mainKeterangan =  $('#mainKeterangan').val(); 
    mainAlamat =  $('#mainAlamat').val(); 
    mainKota       =  $('#mainKota').val();
    mainJenisPengurusan =  $('#mainJenisPengurusan').val();
    mainNomorRekening =  $('#mainNomorRekening').val();
    mainNamaNasabah =  $('#mainNamaNasabah').val();
    mainTanggalRealisasi =  $('#mainTanggalRealisasi').val();
    
    $('#loading').show();
    $.ajax({
        url : base_url + "AsetDokumenEntryController/handleInputHeader",
        type : "POST",
        dataType : "json",
        data : {'mainAreaKerja'        :  mainAreaKerja,
                'mainTanggal'          :  mainTanggal,
                'mainTransaksi'        :  mainTransaksi,
                'mainNama'             :  mainNama,
                'mainKeterangan'       :  mainKeterangan,
                'mainAlamat'           :  mainAlamat,
                'mainKota'             :  mainKota,
                'mainJenisPengurusan'  :  mainJenisPengurusan,
                'mainNomorRekening'    :  mainNomorRekening,
                'mainNamaNasabah'      :  mainNamaNasabah,
                'mainTanggalRealisasi' :  mainTanggalRealisasi},

        success : function(response) {
            window.location = base_url + 'AsetDokumenEntryController/displayTambahDataBPKB';  
        },
        error : function(response) {
            alert('Proses Gagal, Mohon Coba Lagi');
            console.log('failed :' + response);
            window.location = base_url + 'AsetDokumenEntryController/displayTambahAsetDokumen';
        }
    }); 
});

$('#btnTambahSertif').click(function () {
    mainAreaKerja =  $('#mainAreaKerja').val();
    mainTanggal   =  $('#mainTanggal').val();
    mainTransaksi =  $('#mainTransaksi').val();
    mainNama      =  $('#mainNama').val();
    mainKeterangan =  $('#mainKeterangan').val(); 
    mainAlamat =  $('#mainAlamat').val(); 
    mainKota       =  $('#mainKota').val();
    mainJenisPengurusan =  $('#mainJenisPengurusan').val();
    mainNomorRekening =  $('#mainNomorRekening').val();
    mainNamaNasabah =  $('#mainNamaNasabah').val();
    mainTanggalRealisasi =  $('#mainTanggalRealisasi').val();
    $('#loading').show();
    $.ajax({
        url : base_url + "AsetDokumenEntryController/handleInputHeader",
        type : "POST",
        dataType : "json",
        data : {'mainAreaKerja'        :  mainAreaKerja,
                'mainTanggal'          :  mainTanggal,
                'mainTransaksi'        :  mainTransaksi,
                'mainNama'             :  mainNama,
                'mainKeterangan'       :  mainKeterangan,
                'mainAlamat'           :  mainAlamat,
                'mainKota'             :  mainKota,
                'mainJenisPengurusan'  :  mainJenisPengurusan,
                'mainNomorRekening'    :  mainNomorRekening,
                'mainNamaNasabah'      :  mainNamaNasabah,
                'mainTanggalRealisasi' :  mainTanggalRealisasi},

        success : function(response) {
            window.location = base_url + 'AsetDokumenEntryController/displayTambahDataSertifikat';  
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Proses Gagal, Mohon Coba Lagi');
            $('#loading').hide();
            window.location = base_url + 'AsetDokumenEntryController/displayTambahAsetDokumen';
        }
    }); 
});


$('#btnKembali').click(function () {
    if (confirm("Apakah Anda Yakin Akan Kembali Ke Halaman List Aset Dokumen ?")) {
          $('#loading').show();
            $.ajax({
                url : base_url + "AsetDokumenEntryController/buttonBack",
                type : "GET",
                success : function(response) {
                    window.location = base_url + 'AsetDokumenEntryController/index';  
                },
                error : function(response) {
                    console.log('failed :' + response);
                    alert('Terjadi Kesalahan Mohon Coba Lagi');
                    $('#loading').hide();
                }
            }); 
    } else {
        return;
    }
});

$('#btnSubmit').click(function () {
    console.log('test');
    if (confirm("Apakah Anda Yakin Akan Menambahkan Data Aset Dokumen ?")) {
        mainAreaKerja        =  $('#mainAreaKerja').val();
        mainTanggal          =  $('#mainTanggal').val();
        mainTransaksi        =  $('#mainTransaksi').val();
        mainNama             =  $('#mainNama').val();
        mainKeterangan       =  $('#mainKeterangan').val(); 
        mainAlamat           =  $('#mainAlamat').val(); 
        mainKota             =  $('#mainKota').val();
        mainJenisPengurusan  =  $('#mainJenisPengurusan').val();
        mainNomorRekening    =  $('#mainNomorRekening').val();
        mainNamaNasabah      =  $('#mainNamaNasabah').val();
        mainTanggalRealisasi =  $('#mainTanggalRealisasi').val();

        sertTglRegister = $('#sertTglRegister').val();
        bpkbTglRegister =  $('#bpkbTglRegister').val();

        console.log(mainAreaKerja,mainTransaksi, mainTanggal);
        if(sertTglRegister == '' && bpkbTglRegister == ''){
            alert('Anda Belum Mengisi Detail Aset Dokumen!');
            return;
        }
        $('#loading').show();
        $.ajax({
                url : base_url + "AsetDokumenEntryController/insertDataToDB",
                type : "POST",
                data : {'mainAreaKerja'      :  mainAreaKerja,
                      'mainTanggal'          :  mainTanggal,
                      'mainTransaksi'        :  mainTransaksi,
                      'mainNama'             :  mainNama,
                      'mainKeterangan'       :  mainKeterangan,
                      'mainAlamat'           :  mainAlamat,
                      'mainKota'             :  mainKota,
                      'mainJenisPengurusan'  :  mainJenisPengurusan,
                      'mainNomorRekening'    :  mainNomorRekening,
                      'mainNamaNasabah'      :  mainNamaNasabah,
                      'mainTanggalRealisasi' :  mainTanggalRealisasi},
                success : function(response) {
                    alert('Data Aset Dokumen Berhasil Disimpan');
                    window.location = base_url + 'AsetDokumenEntryController/index';  
                },
                error : function(response) {
                    console.log('failed :' + response);
                    alert('Terjadi Kesalahan Mohon Coba Lagi');
                    $('#loading').hide();
                }
        }); 
    } else {
        return;
    }
});
