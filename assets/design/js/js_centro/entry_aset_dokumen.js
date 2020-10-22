var nomor = '';
var no_ref = '';
var idAgunan = '';
var data_rekening = '';
var status = '';
var datas = '';
var ListKodeKantor = '';
var sistemData = '';
var JaminanHeader = '';
var JaminanDokument = '';
var validasSaldoRekening = '';
var validasiLokasiJaminan = '';
var KreKodeJenisAgunan = '';
var KreKodeIkatanHukumAgunan = '';
var persenDefault = '';
var bpkbKantorLokasi = '';
var JenisKend = '';
var MerkKend = '';
var TypeKend = '';
var no_rekening = '';
// check bpkb
var bpkb_blanko_check = '';
var bpkb_faktur_pemilik = '';
var bpkb_check_jb = '';
var bpkb_check_skt = '';
//check sertifikat
var sert_ajb_check = '';
var sert_imb_check = '';
var sert_sppt_check = '';
var sert_skmht_check = '';
var sert_denah_check = '';
var sert_roya_check = '';
var sert_sht_check = '';
var sert_stts_check = '';
var sert_ssb_check = '';
var KodeNotaris = '';
var JenisPengurusan = '';
var namaNotaris = '';
var alamatNotaris = '';
var kotaNotaris = '';
var dataTableeee = [];
var coverNotes = '';
var base_url = $('#base_url').val();
var menuAsset = $('#menuAsset').val();
var asli_option = '<option value="1">ASLI</option> <option value="2">COPY</option>';
var jenis_sert_otion = '<option value="SHM">SHM</option> <option value="SHGB">SHGB</option> <option value="AJB">AJB</option>';
var main_transaksi ='<option value="IN TRANSIT">IN TRANSIT</option>' +
                    '<option value="KELUAR">KELUAR</option>' +
                    '<option value="MASUK">MASUK</option>'+
                    '<option value="PINJAM">PINJAM</option>'+
                    '<option value="WAITING">WAITING</option>';
var jenis_emas_list ='<option value="BATANGAN">BATANGAN</option>' +
                     '<option value="COIN">COIN</option>'+
                     '<option value="LAIN">LAIN</option>';
$('#sertKodeIkatanAgunan').change(function(){
    persenDefault = $(this).find('option:selected').attr('data-persen');
   $('#sertPersenDijamin').val(persenDefault);
});

$(document).ready(function () {     
   
    dataTableeee = [];
    $('#loading').show(); 

    $.ajax({
            url : base_url + "index.php/AsetDokumenEntryController/getListAsetDokumen",
            type : "POST",
            dataType : "json",
            data : {"test" : "test"},

            success : function(response) {
                $('#employeeTable').DataTable().clear();
                $('#employeeTable').DataTable().destroy();
                dataTableeee.push(response); 
                $('#employeeTable > tbody:first').html(dataTableeee);
                $(document).ready(function() {
                    $('#employeeTable').DataTable( {
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
                alert('Gagal Get Data, Mohon Coba Kembali Beberapa Saat Lagi');
                window.location = base_url + 'index.php/DashboardController/index';
                $('#loading').hide();
            }
    });    
    
});

$(function(){
    $('#check_ajb').on('click', function(){                  
       $("#sertNomorAJB").prop("disabled", !this.checked); 
    });
    $('#check_imb').on('click', function(){                  
        $("#sertNomorIMB").prop("disabled", !this.checked); 
    });
    $('#check_sppt').on('click', function(){                  
        $("#sertNomorSPPT").prop("disabled", !this.checked); 
        $("#sertTahunSPPT").prop("disabled", !this.checked); 
    });
    $('#check_sht').on('click', function(){                  
        $("#sertNoSHT").prop("disabled", !this.checked); 
        $("#sertPropinsiSHT").prop("disabled", !this.checked); 
        $("#sertKotaSHT").prop("disabled", !this.checked); 
    });
    $('#check_stts').on('click', function(){                  
        $("#sertTahunSTTS").prop("disabled", !this.checked); 
    });
    $('#check_ssb_bpht').on('click', function(){                  
        $("#sertAtasNamaSSBBPHTB").prop("disabled", !this.checked); 
    });

    
    $('#check_faktur_pemilik').on('click', function(){                  
        $("#bpkbNoFakturPemilik").prop("disabled", !this.checked); 
    });
    $('#check_sk_trayek').on('click', function(){                  
        $("#noSKTrayek").prop("disabled", !this.checked); 
        $("#bpkbBerlakuSD").prop("disabled", !this.checked); 
    });
});

$('#search').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        serchAsetDokumen();
    }
  }); 

// modal uodate
$('#btn_simpan_update_modal').click(function () {
   
    console.log("update simpan di klik");
    //$('#updateSertifikat').modal('hide');
    if(JaminanHeader.jenis_jaminan == 'SERTIFIKAT'){
       updateSertifikat();
    } 
    else if(JaminanHeader.jenis_jaminan == 'BPKB'){
        console.log("jaminan bpkb");
        updateBPKB();
    }
    else if(JaminanHeader.jenis_jaminan == 'EMAS'){
        console.log("jaminan emas");
        updateEmas();
    }

    $('#mainUpdateModal').modal('hide');
});
$('#btn_kembali_update_modal').click(function () { 
    $('#mainUpdateModal').modal('hide');
    $('#loading').show();
    if( menuAsset == '1'){
        window.location = base_url + 'index.php/AsetDokumenEntryController/index';
    }else if( menuAsset == '2'){
        window.location = base_url + 'index.php/AsetDokumenViewAsetController/index';
    }
});
$('#btn_kembali_update_modal2').click(function () {
    $('#mainUpdateModal').modal('hide');
    $('#loading').show();
    if( menuAsset == '1'){
        window.location = base_url + 'index.php/AsetDokumenEntryController/index';
    }else if( menuAsset == '2'){
        window.location = base_url + 'index.php/AsetDokumenViewAsetController/index';
    }
});
// modal sertifikat
$('#sert_button_simpan').click(function () {
    console.log("simpan di klik");
    $('#updateSertifikat').modal('hide');
});
$('#sert_button_kembali').click(function () {
    console.log("kembali di klik");
    mappingFieldSertifikat(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
    $('#updateSertifikat').modal('hide');
});
$('#sert_button_kembali2').click(function () {
    console.log("kembali di klik");
    mappingFieldSertifikat(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
    $('#updateSertifikat').modal('hide');
});
//modal bpkb
$('#bpkb_button_simpan').click(function () {
    console.log("simpan di klik");
    $('#updateBPKB').modal('hide');
});
$('#bpkb_button_kembali').click(function () {
    console.log("kembali di klik");
    mappingFieldBPKB(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
    $('#updateBPKB').modal('hide');
});
$('#bpkb_button_kembali2').click(function () {
    console.log("kembali di klik");
    mappingFieldBPKB(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
    $('#updateBPKB').modal('hide');
});
//modal emas
$('#emas_button_simpan').click(function () {
    console.log("simpan di klik");
    $('#updateEmas').modal('hide');
});
$('#emas_button_kembali').click(function () {
    console.log("kembali di klik");
    mappingFieldEmas(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
    $('#updateEmas').modal('hide');
});
$('#emas_button_kembali2').click(function () {
    console.log("kembali di klik");
    mappingFieldEmas(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
    $('#updateEmas').modal('hide');
});

// modal pinjam 
$('#btn_simpan_modal_pinjam').click(function () {
   
    $('#loading').show();
    $('#loading2').show();
    $.ajax({
        url : base_url + "index.php/AsetDokumenPinjamController/pinjamData",
        type : "POST",
        dataType : "json",
        data : {"mainIdPinjam"                : $('#mainIdPinjam').val(),
                "mainNomorPinjam"             : $('#mainNomorPinjam').val(),
                "mainNoReffPinjam"            : $('#mainNoReffPinjam').val(),
                "mainAreaKerjaPinjam"         : $('#mainAreaKerjaPinjam').val(),
                "mainTanggalPinjam"           : $('#mainTanggalPinjam').val(),
                "mainTransaksiPinjam"         : $('#mainTransaksiPinjam').val(),
                "mainNamaPinjam"              : $('#mainNamaPinjam').val(),
                "mainKeteranganPinjam"        : $('#mainKeteranganPinjam').val(),
                "mainAlamatPinjam"            : $('#mainAlamatPinjam').val(),
                "mainKotaPinjam"              : $('#mainKotaPinjam').val(),
                "mainJenisPengurusanPinjam"   : $('#mainJenisPengurusanPinjam').val(),
                "mainNomorRekeningPinjam"     : $('#mainNomorRekeningPinjam').val(),
                "mainTanggalRealisasiPinjam"  : $('#mainTanggalRealisasiPinjam').val(),
                "jenisJaminanPinjam"          : JaminanHeader.jenis_jaminan,
                "verifikasi"                  : JaminanHeader.verifikasi,
                "rodaKendaraanPinjam"         : JaminanHeader.roda_kendaraan,
                "mainTanggalRencanaKembaliPinjam" : $('#mainTanggalRencanaKembaliPinjam').val(),
                "jaminanDokumentID"           : JaminanDokument.id
            },

        success : function(response) {
            console.log('success');
            console.log(response);
            alert('Peminjaman Data Sukses');
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/index';  
        },
        error : function(response) {
            console.log('failed');
            alert('Gagal Melakukan Peminjaman Data');
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/index';
        }
    });  
});
$('#btn_kembali_pinjam_modal').click(function () { 
    $('#PeminjamanMainModal').modal('hide');
    $('#loading').show();
    window.location = base_url + 'index.php/AsetDokumenEntryController/index';
});
$('#btn_kembali_pinjam_modal2').click(function () {
    $('#PeminjamanMainModal').modal('hide');
    $('#loading').show();
    window.location = base_url + 'index.php/AsetDokumenEntryController/index';
});
// modal sertifikat
$('#sert_button_kembali_pinjam').click(function () {
    console.log("kembali di klik");
    $('#pinjamSertifikatModal').modal('hide');
});
$('#sert_button_kembali_pinjam2').click(function () {
    console.log("kembali di klik");
    $('#pinjamSertifikatModal').modal('hide');
});
//modal bpkb
$('#bpkb_button_kembali_pinjam').click(function () {
    console.log("kembali di klik");
    //mappingFieldBPKB(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
    $('#peminjamanBPKBModal').modal('hide');
});
$('#bpkb_button_kembali_pinjam2').click(function () {
    console.log("kembali di klik");
    //mappingFieldBPKB(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
    $('#peminjamanBPKBModal').modal('hide');
});
//modal emas
$('#emas_button_kembali_pinjam').click(function () {
    console.log("kembali di klik");
   // mappingFieldEmas(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
    $('#peminjamanEmasModal').modal('hide');
});
$('#emas_button_kembali_pinjam2').click(function () {
    console.log("kembali di klik");
   // mappingFieldEmas(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
    $('#peminjamanEmasModal').modal('hide');
});

//modal kembali
$('#btn_kembali_kembali_modal').click(function () {
    $('#KembaliMainModal').modal('hide');
    $('#loading').show();
    window.location = base_url + 'index.php/AsetDokumenEntryController/index';
});
$('#btn_kembali_kembali_modal2').click(function () {
    $('#KembaliMainModal').modal('hide');
    $('#loading').show();
    window.location = base_url + 'index.php/AsetDokumenEntryController/index';
});
$('#btn_simpan_modal_kembali').click(function () {
   console.log('button di click');
   $('#loading5').show();

   $.ajax({
    url : base_url + "index.php/AsetDokumenKembaliController/kembaliDokumen",
    type : "POST",
    dataType : "json",
    data : {"mainIdKembali"                : $('#mainIdKembali').val(),
            "mainNomorKembali"             : $('#mainNomorKembali').val(),
            "mainNoReffKembali"            : $('#mainNoReffKembali').val(),
            "mainAreaKerjaKembali"         : $('#mainAreaKerjaKembali').val(),
            "mainTanggalKembali"           : $('#mainTanggalKembali').val(),
            "mainTransaksiKembali"         : $('#mainTransaksiKembali').val(),
            "mainNamaKembali"              : $('#mainNamaKembali').val(),
            "mainKeteranganKembali"        : $('#mainKeteranganKembali').val(),
            "mainAlamatKembali"            : $('#mainAlamatKembali').val(),
            "mainKotaKembali"              : $('#mainKotaKembali').val(),
            "mainJenisPengurusanKembali"   : $('#mainJenisPengurusanKembali').val(),
            "mainNomorRekeningKembali"     : $('#mainNomorRekeningKembali').val(),
            "mainTanggalRealisasiKembali"  : $('#mainTanggalRealisasiKembali').val(),
            "jenisJaminanKembali"          : JaminanHeader.jenis_jaminan,
            "verifikasi"                  : JaminanHeader.verifikasi,
            "rodaKendaraanKembali"         : JaminanHeader.roda_kendaraan,
            "mainTanggalRencanaKembali" : $('#mainTanggalRencanaKembali').val(),
            "jaminanDokumentID"           : JaminanDokument.id,
            
            // history
            "mainIdHistory"                : JaminanHistory.id,
            "mainNomorHistory"             : JaminanHistory.nomor,
            "mainNoReffHistory"            : JaminanHistory.no_reff,
            "mainAreaKerjaHistory"         : JaminanHistory.kode_kantor,
            "mainTanggalHistory"           : JaminanHistory.tgl,
            "mainTransaksiHistory"         : JaminanHistory.jenis_jaminan,
            "mainNamaHistory"              : JaminanHistory.nama,
            "mainKeteranganHistory"        : JaminanHistory.ket,
            "mainAlamatHistory"            : JaminanHistory.alamat,
            "mainKotaHistory"              : JaminanHistory.kota,
            "mainJenisPengurusanHistory"   : JaminanHistory.jenis_pengurusan,
            "mainNomorRekeningHistory"     : JaminanHistory.no_rekening,
            "mainTanggalRealisasiHistory"  : JaminanHistory.tgl_realisasi,
            "jenisJaminanHistory"          : JaminanHistory.jenis_jaminan,
            "rodaKendaraanHistory"         : JaminanHistory.roda_kendaraan,
            "mainTanggalRencanaHistory"    : JaminanHistory.tgl_rencana_kembali,
            "mainStatusHistory"            : JaminanHistory.status
        
        },

    success : function(response) {
        console.log(response);
        alert('Data Sukses Di Kembalikan');
        $('#loading5').hide();
        window.location = base_url + 'index.php/AsetDokumenEntryController/index';  
    },
    error : function(response) {
        console.log('failed');
        alert('Gagal Kembalikan Data');
        $('#loading').hide();
        window.location = base_url + 'index.php/AsetDokumenEntryController/index';
    }
 });     
});
//kembali sertifikat
$('#sert_button_kembali_kembali').click(function () {
    console.log("kembali di klik");
    $('#kembaliSertifikatModal').modal('hide');
});
$('#sert_button_kembali_kembali2').click(function () {
    console.log("kembali di klik");
    $('#kembaliSertifikatModal').modal('hide');
});
//kembali bpkb
$('#bpkb_button_kembali_kembali').click(function () {
    $('#kembaliBPKBModal').modal('hide');
});
$('#bpkb_button_kembali_kembali2').click(function () {
    $('#kembaliBPKBModal').modal('hide');
});
//kembali emas
$('#emas_button_kembali_kembali').click(function () {
    $('#kembaliEmasModal').modal('hide');
});
$('#emas_button_kembali_kembali2').click(function () {
    $('#kembaliEmasModal').modal('hide');
});

//modal due date  
$('#btn_simpan_dueDate_modal').click(function () {
   var tanggalRencanaKembaliDueDate = $('#tanggalRencanaKembaliDueDate').val();
   var mainIdDueDate = $('#mainIdDueDate').val();
   var mainNomorDueDate =  $('#mainNomorDueDate').val();
   var mainNoReffDueDate =  $('#mainNoReffDueDate').val();

   console.log(tanggalRencanaKembaliDueDate,mainIdDueDate,mainNomorDueDate,mainNoReffDueDate);
   $('#loading6').show();
   $.ajax({
    url : base_url + "index.php/AsetDokumenUpdateController/updateDueDate",
    type : "POST",
    dataType : "json",
    data : {"tanggalRencanaKembaliDueDate" : tanggalRencanaKembaliDueDate, 
            "mainIdDueDate"                : mainIdDueDate,
            "mainNomorDueDate"             : mainNomorDueDate,
            "mainNoReffDueDate"            : mainNoReffDueDate},

    success : function(response) {
        console.log(response);
        alert('Sukses Update Due Date');

        window.location = base_url + 'index.php/AsetDokumenEntryController/index';
    },
    error : function(response) {
        console.log('failed');
        alert('Gagal Get Due Date');
        $('#loading').hide();
        window.location = base_url + 'index.php/AsetDokumenEntryController/index';
    }
    }); 
});
$('#btn_kembali_dueDate_modal').click(function () {
    $('#mainDueDateModal').modal('hide');
});
$('#btn_kembali_dueDate_modal2').click(function () {
    $('#mainDueDateModal').modal('hide');
});

//modal notaris
$('#btn_kembali_notaris_modal').click(function () {
    $('#ListNotarisModal').modal('hide');
});
$('#btn_kembali_notaris_modal2').click(function () {
    $('#ListNotarisModal').modal('hide');
});
$('#btn_cari_notaris').click(function () {
    $('#ListNotarisModal').modal('show');
    dataTableeee = [];
   $.ajax({
        url : base_url + "index.php/AsetDokumenPinjamController/getNotaris",
        type : "POST",
        dataType : "json",
        data : {"test"    : "test"},

        success : function(response) {
            console.log(response);            
            dataTableeee.push(response);           
            $('#notarisTable > tbody:first').html(dataTableeee);
            $(document).ready(function() {
                $('#notarisTable').DataTable( {
                    "destroy": true,
                    "scrollX": true,
                    "autoWidth" : false,
                    "aaSorting" : []
                } );
            } );

             $('#loading3').hide();
            
        },
        error : function(response) {
            console.log('failed');
            alert('Gagal Get Detail Notaris');
            $('#loading3').hide();
            $('#ListNotarisModal').modal('hide');
        }
   });     
});
$('#bodyNotaris').on('click','.btnPilihNotaris', function () {
    var namaNotaris   = $(this).data("nama");
    var kotaNotaris   = $(this).data("kota");
    var alamatNotaris = $(this).data("alamat");

    $('#mainNamaPinjam').val(namaNotaris);
    $('#mainAlamatPinjam').val(alamatNotaris);
    $('#mainKotaPinjam').val(kotaNotaris);
    $('#ListNotarisModal').modal('hide');
});
// modal jenis pengurusan
$('#btn_kembali_jenisPengurusan_modal').click(function () {
    $('#ListJaminanPengurusanModal').modal('hide');
});
$('#btn_kembali_jenisPengurusan_modal2').click(function () {
    $('#ListJaminanPengurusanModal').modal('hide');
});
$('#btn_cari_jenis_pengurusan').click(function () {
    $('#ListJaminanPengurusanModal').modal('show');
    dataTableeee = [];
 
   $.ajax({
    url : base_url + "index.php/AsetDokumenPinjamController/getJenisPengurusan",
    type : "POST",
    dataType : "json",
    data : {"test"    : "test"},

    success : function(response) {
        console.log('harusnya bisa');
        dataTableeee.push(response); 

        $('#JenisPengurusanTable > tbody:first').html(dataTableeee); 
        $(document).ready(function() {
            $('#JenisPengurusanTable').DataTable( {
                "destroy": true,
                "scrollX": true,
                "autoWidth" : false,
                "aaSorting" : []
            } );
        } );

        $('#loading4').hide();
         
    },
    error : function(response) {
        console.log('failed');
        alert('Gagal Get Detail Jenis Pengurusan');
        $('#loading3').hide();
        $('#ListNotarisModal').modal('hide');
    }
   });       
});
$('#bodyJenisPengurusan').on('click','.btnPiliJenis', function () {
    var namaJenisPengurusan         = $(this).data("nama");
    var keteranganJenisPengurusan   = $(this).data("keterangan");
    var sysdate                     = $(this).data("sysdate");
    var newDate = new Date(sysdate);
    var kembali = '';

    newDate.setDate(newDate.getDate() + keteranganJenisPengurusan);
    kembali = newDate.getFullYear() + "-" + ("0" + (newDate.getMonth() + 1)).slice(-2) + "-" + ("0" + (newDate.getDate())).slice(-2);
    console.log(newDate);
    $('#mainJenisPengurusanPinjam').val(namaJenisPengurusan);
    $('#mainTanggalRencanaKembaliPinjam').val(kembali);
    $('#ListJaminanPengurusanModal').modal('hide');
});



// modal penyerahan 
$('#btn_simpan_modal_penyerahan').click(function () {
    $('#loading').show();
    $('#loadingPenyerahan').show();
    $.ajax({
        url : base_url + "index.php/AsetDokumenPenyerahanController/penyerahanData",
        type : "POST",
        dataType : "json",
        data : {"mainIdPenyerahan"                : $('#mainIdPenyerahan').val(),
                "mainNomorPenyerahan"             : $('#mainNomorPenyerahan').val(),
                "mainNoReffPenyerahan"            : $('#mainNoReffPenyerahan').val(),
                "mainAreaKerjaPenyerahan"         : $('#mainAreaKerjaPenyerahan').val(),
                "mainTanggalPenyerahan"           : $('#mainTanggalPenyerahan').val(),
                "mainTransaksiPenyerahan"         : $('#mainTransaksiPenyerahan').val(),
                "mainNamaPenyerahan"              : $('#mainNamaPenyerahan').val(),
                "mainKeteranganPenyerahan"        : $('#mainKeteranganPenyerahan').val(),
                "mainAlamatPenyerahan"            : $('#mainAlamatPenyerahan').val(),
                "mainKotaPenyerahan"              : $('#mainKotaPenyerahan').val(),
                "mainJenisPengurusanPenyerahan"   : $('#mainJenisPengurusanPenyerahan').val(),
                "mainNomorRekeningPenyerahan"     : $('#mainNomorRekeningPenyerahan').val(),
                "mainTanggalRealisasiPenyerahan"  : $('#mainTanggalRealisasiPenyerahan').val(),
                "jenisJaminanPenyerahan"          : JaminanHeader.jenis_jaminan,
                "verifikasi"                  : JaminanHeader.verifikasi,
                "rodaKendaraanPenyerahan"         : JaminanHeader.roda_kendaraan,
                "mainTanggalRencanaKembaliPenyerahan" : $('#mainTanggalRencanaKembaliPenyerahan').val(),
                "jaminanDokumentID"           : JaminanDokument.id
            },

        success : function(response) {
            console.log('success');
            console.log(response);
            alert('Penyerahan Data Sukses');
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/index';  
        },
        error : function(response) {
            console.log('failed');
            alert('Gagal Melakukan Peminjaman Data');
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/index';
        }
    });  
});
$('#btn_kembali_penyerahan_modal').click(function () { 
    $('#PenyerahanMainModal').modal('hide');
    $('#loading').show();
    window.location = base_url + 'index.php/AsetDokumenEntryController/index';
});
$('#btn_kembali_penyerahan_modal2').click(function () {
    $('#PenyerahanMainModal').modal('hide');
    $('#loading').show();
    window.location = base_url + 'index.php/AsetDokumenEntryController/index';
});
// modal sertifikat
$('#sert_button_kembali_penyerahan').click(function () {
    console.log("kembali di klik");
    $('#penyerahanSertifikatModal').modal('hide');
});
$('#sert_button_kembali_penyerahan2').click(function () {
    console.log("kembali di klik");
    $('#penyerahanSertifikatModal').modal('hide');
});
//modal bpkb
$('#bpkb_button_kembali_penyerahan').click(function () {
    console.log("kembali di klik");
    $('#penyerahanBPKBModal').modal('hide');
});
$('#bpkb_button_kembali_penyerahan2').click(function () {
    console.log("kembali di klik");
    //mappingFieldBPKB(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
    $('#penyerahanBPKBModal').modal('hide');
});
//modal emas
$('#emas_button_kembali_penyerahan').click(function () {
    console.log("kembali di klik");
    $('#penyerahanEmasModal').modal('hide');
});
$('#emas_button_kembali_penyerahan2').click(function () {
    console.log("kembali di klik");
    $('#penyerahanEmasModal').modal('hide');
});


//// BUTTON DI MAIN VIEW TABLE ////
$('#bodyTableAsetDokumen').on('click','.btnUpdate', function () {
    nomor = $(this).data("nomor");
    noref = $(this).data("noref");
    status = $(this).data("status");
    idAgunan = $(this).data("agunan");
    
    $('#mainUpdateModal').modal('show');

    $('#loading').show();
    $('#loading1').show();
    // hilangkan append dulu
    $('#mainAreaKerja').find('option').remove().end();
    $('#mainTransaksi').find('option').remove().end();
    // isi select option
    $('#mainTransaksi').append(main_transaksi);

    $.ajax({
        url : base_url + "index.php/AsetDokumenUpdateController/displayDetails",
        type : "POST",
        dataType : "json",
        data : {"nomorAgunan"    : nomor, 
                "nomorRefAgunan" : noref,
                "dataStatus"     : status,
                "agunanID"       : idAgunan},

        success : function(response) {
            console.log(response);

            //hasil data query object
            ListKodeKantor = response.ListKodeKantor;
            KreKodeJenisAgunan = response.KreKodeJenisAgunan;
            KreKodeIkatanHukumAgunan = response.KreKodeIkatanHukumAgunan;
            JaminanHeader = response.getJaminanHeader[0];
            JaminanDokument = response.getJaminanDokument[0];
            MerkKend = response.MerkKend;
            TypeKend = response.TypeKend;
            JenisKend = response.JenisKend;
             

            //MAIN UPDATE FORM (HEADER)
            $('#mainAreaKerja').append('<option value="' + JaminanHeader.kode_kantor + '" selected>'+ JaminanHeader.kode_kantor + ' - ' + JaminanHeader.nama_kantor +'</option>');
            $('#mainTransaksi').append('<option value="' + JaminanHeader.status + '" selected>'+ JaminanHeader.status + '</option>');
            $('#mainTanggal').val(JaminanHeader.tgl);
            $('#mainNama').val(JaminanHeader.nama); 
            $('#mainKeterangan').val(JaminanHeader.ket);  
            $('#mainAlamat').val(JaminanHeader.alamat);   
            $('#mainKota').val(JaminanHeader.kota);  
            $('#mainJenisPengurusan').val(JaminanHeader.jenis_pengurusan);
            $('#mainNomorRekening').val(JaminanHeader.no_rekening);
            $('#mainTanggalRealisasi').val(JaminanHeader.tgl_realisasi);
            $('#mainId').val(JaminanHeader.id);
            $('#mainNomor').val(JaminanHeader.nomor);
            $('#mainNoReff').val(JaminanHeader.no_reff);
            $('#mainVerifikasi').val(JaminanHeader.verifikasi);
           

            $.each(ListKodeKantor,function(i,data){
                $('#mainAreaKerja').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
            });

            if(JaminanHeader.jenis_jaminan == 'SERTIFIKAT'){
                mappingFieldSertifikat(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
            } 
            else if(JaminanHeader.jenis_jaminan == 'BPKB'){
                mappingFieldBPKB(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument,MerkKend,TypeKend,JenisKend);
            }
            else if(JaminanHeader.jenis_jaminan == 'EMAS'){
                mappingFieldEmas(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
            }
            
            /// validasi nomor rekening sudah cair atau belum
            if(JaminanHeader.no_rekening != ''){
                alert('Maaf, Data sudah masuk BO Kredit( ' + JaminanHeader.no_rekening + ' ) dan sudah Go-Live, Data tidak dapat dirubah!');
                
                $("#btn_simpan_update_modal").prop("disabled", true);
                $("#sert_button_simpan").prop("disabled", true);
                $("#bpkb_button_simpan").prop("disabled", true);
                $("#emas_button_simpan").prop("disabled", true);
            }
            /// validasi verifikasi dokumen apakah sudah di verifikasi atau belum
            if(JaminanHeader.verifikasi == '1'){
                alert('Maaf, Data sudah diverifikasi, tidak dapat dikoreksi!');
                $("#btn_simpan_update_modal").prop("disabled", true);
                $("#sert_button_simpan").prop("disabled", true);
                $("#bpkb_button_simpan").prop("disabled", true);
                $("#emas_button_simpan").prop("disabled", true);
            } else if(JaminanDokument.verifikasi == '1'){
                alert('Maaf, Data sudah diverifikasi, tidak dapat dikoreksi!');
                $("#btn_simpan_update_modal").prop("disabled", true);
                $("#sert_button_simpan").prop("disabled", true);
                $("#bpkb_button_simpan").prop("disabled", true);
                $("#emas_button_simpan").prop("disabled", true);
            }
        
            $('#loading').hide();
            $('#loading1').hide();
        },
        error : function(response) {
            
            alert('Gagal Get Detail');
            console.log('failed');
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/index';
        }
    });
});

$('#bodyTableAsetDokumen').on('click','.btnDelete', function () {
    nomor = $(this).data("nomor");
    noref = $(this).data("noref");
    status = $(this).data("status");
    idAgunan = $(this).data("agunan");
    no_rekening = $(this).data("norekening");
    verifikasi = $(this).data("verifikasi");
    console.log( no_rekening + ' ' + verifikasi);   
    
    // validasi nomor rekening sudah cair atau blm
    if(no_rekening != ''){
        alert('Maaf, Data sudah masuk BO Kredit( ' + no_rekening + ' ) dan sudah Go-Live, Data tidak dapat dihapus!');
        return;
    }else if(verifikasi != ''){
        alert('Maaf, Data sudah diverifikasi, tidak dapat dihapus!');
        return;
    }
    
    if (confirm("Apakah Anda Yakin Akan Menghapus Data Dengan No. Ref " + nomor)) {
        deleteFunction();  
    } else {
        alert('Data Batal Di Delete');
    }
});

$('#bodyTableAsetDokumen').on('click','.btnPinjam', function () {
    nomor = $(this).data("nomor");
    noref = $(this).data("noref");
    status = $(this).data("status");
    idAgunan = $(this).data("agunan");
    console.log(nomor,noref,status,idAgunan);
    if(status == 'PINJAM'){
        alert('Maaf, data tidak dapat dipinjamkan');
        return;
    }else if(status == 'KELUAR'){
        alert('Maaf, data tidak dapat dipinjamkan');
        return;
    }else if(status == 'IN TRANSIT'){
        alert('Maaf, data tidak dapat dipinjamkan');
        return;
    }

    $('#loading').show();
    $('#PeminjamanMainModal').modal('show');

    $.ajax({
        url : base_url + "index.php/AsetDokumenPinjamController/displayDetails",
        type : "POST",
        dataType : "json",
        data : {"nomorAgunan"    : nomor, 
                "nomorRefAgunan" : noref,
                "dataStatus"     : status,
                "agunanID"       : idAgunan},

        success : function(response) {
            JaminanHeader = response.getJaminanHeader[0];
            JaminanDokument = response.getJaminanDokument[0];
            
            console.log(JaminanHeader, JaminanDokument);
 
            //  Pinjam   
            $('#mainAreaKerjaPinjam').append('<option value="' + JaminanHeader.kode_kantor + '" selected>'+ JaminanHeader.kode_kantor + ' - ' + JaminanHeader.nama_kantor +'</option>');
            $('#mainTanggalPinjam').val(JaminanHeader.tgl); 
            $('#mainNomorRekeningPinjam').val(JaminanHeader.no_rekening);
            $('#mainTanggalRealisasiPinjam').val(JaminanHeader.tgl_realisasi);
            $('#mainIdPinjam').val(JaminanHeader.id);
            $('#mainNomorPinjam').val(JaminanHeader.nomor);
            $('#mainNoReffPinjam').val(JaminanHeader.no_reff);
            $('#mainVerifikasiPinjam').val(JaminanHeader.verifikasi);

            if(JaminanHeader.jenis_jaminan == 'SERTIFIKAT'){
                mappingFieldSertifikatPinjam(JaminanHeader, JaminanDokument);
            } 
            else if(JaminanHeader.jenis_jaminan == 'BPKB'){
                mappingFieldBPKBPinjam(JaminanHeader, JaminanDokument);
            }
            else if(JaminanHeader.jenis_jaminan == 'EMAS'){
                mappingFieldEmasPinjam(JaminanHeader, JaminanDokument);
            }
            /// validasi verifikasi dokumen apakah sudah di verifikasi atau belum
            if(JaminanHeader.verifikasi == '0'){
                alert('Maaf, Data belum di verifikasi, Tidak Dapat Di Pinjamkan');
                $("#btn_simpan_modal_pinjam").prop("disabled", true);
            } else if(JaminanDokument.verifikasi == '0'){
                alert('Maaf, Data belum di verifikasi, Tidak Dapat Di Pinjamkan');
                $("#btn_simpan_modal_pinjam").prop("disabled", true);
            }

            $('#loading2').hide();
            $('#loading').hide();
            console.log("FINISH");
        },
        error : function(response) {
            console.log('failed');
            alert("Gagal Get Detail");
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/index';
        }
    });   
});

$('#bodyTableAsetDokumen').on('click','.btnKembaliDokumen', function () {
    nomor = $(this).data("nomor");
    noref = $(this).data("noref");
    status = $(this).data("status");
    idAgunan = $(this).data("agunan");
    
    $('#KembaliMainModal').modal('show');
    $('#loading5').show();

    $('#mainAreaKerjaKembali').find('option').remove().end();

    $.ajax({
        url : base_url + "index.php/AsetDokumenKembaliController/displayDetails",
        type : "POST",
        dataType : "json",
        data : {"nomorAgunan"    : nomor, 
                "nomorRefAgunan" : noref,
                "dataStatus"     : status,
                "agunanID"       : idAgunan},

        success : function(response) {
            JaminanHeader = response.getJaminanHeader[0];
            JaminanDokument = response.getJaminanDokument[0];
            JaminanHistory = response.getJaminanHistory[0];
            console.log(JaminanHeader, JaminanDokument,JaminanHistory);
            if(JaminanHeader.status != 'PINJAM'){
                alert('Maaf, Data yang dipilih belum di Pinjamkan');
                $('#KembaliMainModal').modal('hide');
                $('#loading5').hide();
                return;
            }
            
            //  Kembali   
            $('#mainAreaKerjaKembali').append('<option value="' + JaminanHeader.kode_kantor + '" selected>'+ JaminanHeader.kode_kantor + ' - ' + JaminanHeader.nama_kantor +'</option>');
            $('#mainTanggalKembali').val(JaminanHeader.tgl); 
            $('#mainNamaKembali').val(JaminanHeader.nama); 
            $('#mainKeteranganKembali').val("Data Sudah Dikembalikan"); 
            $('#mainAlamatKembali').val(JaminanHeader.alamat); 
            $('#mainKotaKembali').val(JaminanHeader.kota); 
            $('#mainJenisPengurusanKembali').val(JaminanHeader.jenis_pengurusan); 
            $('#mainTanggalRencanaKembali').val(JaminanHeader.tgl_rencana_kembali); 
            $('#mainNomorRekeningKembali').val(JaminanHeader.no_rekening);
            $('#mainTanggalRealisasiKembali').val(JaminanHeader.tgl_realisasi);
            $('#mainIdKembali').val(JaminanHeader.id);
            $('#mainNomorKembali').val(JaminanHeader.nomor);
            $('#mainNoReffKembali').val(JaminanHeader.no_reff);
            $('#mainVerifikasiKembali').val(JaminanHeader.verifikasi);

            if(JaminanHeader.jenis_jaminan == 'SERTIFIKAT'){
                mappingFieldSertifikatKembali(JaminanHeader, JaminanDokument);
            } 
            else if(JaminanHeader.jenis_jaminan == 'BPKB'){
                mappingFieldBPKBKembali(JaminanHeader, JaminanDokument);
            }
            else if(JaminanHeader.jenis_jaminan == 'EMAS'){
                mappingFieldEmasKembali(JaminanHeader, JaminanDokument);
            }

            if(JaminanHeader.verifikasi == '0'){
                alert('Maaf, Data belum di verifikasi');
                $("#btn_simpan_modal_kembali").prop("disabled", true);
            }else if(JaminanDokument.verifikasi == '0'){
                alert('Maaf, Data belum di verifikasi');
                $("#btn_simpan_modal_kembali").prop("disabled", true);
            }
            


            $('#loading5').hide();
        },
        error : function(response) {
            alert('Gagal Get Detail');
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/index';
        }
    });    
});

$('#bodyTableAsetDokumen').on('click','.btnDueDate', function () {
    nomor = $(this).data("nomor");
    noref = $(this).data("noref");
    status = $(this).data("status");
    idAgunan = $(this).data("agunan");
    console.log(nomor,noref,status,idAgunan);
    if(status != 'PINJAM'){
        alert('Maaf, data tersebut bukan Peminjaman!');
        return;
    }

    $('#loading').show();
    $('#mainDueDateModal').modal('show');
    $.ajax({
        url : base_url + "index.php/AsetDokumenUpdateController/getDueDate",
        type : "POST",
        dataType : "json",
        data : {"nomorAgunan"    : nomor, 
                "nomorRefAgunan" : noref,
                "dataStatus"     : status,
                "agunanID"       : idAgunan},

        success : function(response) {
            console.log('harusnya bisa');
            JaminanHeader = response.getJaminanHeader[0];
            console.log(JaminanHeader);

            $('#tanggalRencanaKembaliDueDate').val(JaminanHeader.tgl_rencana_kembali);
            $('#mainIdDueDate').val(JaminanHeader.id);
            $('#mainNomorDueDate').val(JaminanHeader.nomor);
            $('#mainNoReffDueDate').val(JaminanHeader.no_reff);
            $('#namaNotarisDueDate').val(JaminanHeader.nama);
            $('#CoverNotesID').val(JaminanHeader.id);

            if(JaminanHeader.upload_cover_notes == '' || JaminanHeader.upload_cover_notes == null){
                alert('Mohon lakukan upload Cover Notes baru, untuk mengubah tanggal Due Date!');
                $("#imgCoverNotes").attr('src', base_url + 'PUBLIC/CoverNotes/default.jpeg');
                $("#imgCoverNotes2").attr("href", base_url + 'PUBLIC/CoverNotes/default.jpeg');
                
                $('#btn_simpan_dueDate_modal').prop("disabled", true);
            }else{
                $("#imgCoverNotes").attr('src',  base_url + 'PUBLIC/CoverNotes/' + JaminanHeader.upload_cover_notes);
                $("#imgCoverNotes2").attr("href", base_url + 'PUBLIC/CoverNotes/' + JaminanHeader.upload_cover_notes);
                $('#btn_simpan_dueDate_modal').prop("disabled", false);
            }
            
            
            $('#loading').hide();
            $('#loading6').hide();
        },
        error : function(response) {
            console.log('failed');
            alert('Gagal Get Due Date');
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/index';
        }
    }); 
});

$('#bodyTableAsetDokumen').on('click','.btnPenyerahan', function () {
    nomor = $(this).data("nomor");
    noref = $(this).data("noref");
    status = $(this).data("status");
    idAgunan = $(this).data("agunan");
    data_rekening = $(this).data("rekening");
    $('#PenyerahanMainModal').modal('show');

    $.ajax({
        url : base_url + "index.php/AsetDokumenPenyerahanController/displayDetails",
        type : "POST",
        dataType : "json",
        data : {"nomorAgunan"    : nomor, 
                "nomorRefAgunan" : noref,
                "dataStatus"     : status,
                "agunanID"       : idAgunan,
                "data_rekening"  : data_rekening
            },

        success : function(response) {
            JaminanHeader         = response.getJaminanHeader[0];
            JaminanDokument       = response.getJaminanDokument[0];
            validasSaldoRekening  = response.validasSaldoRekening[0];
            validasiLokasiJaminan = response.validasiLokasiJaminan[0];
            
            console.log(validasSaldoRekening,validasiLokasiJaminan);
            if(validasSaldoRekening > 0){
                alert('Maaf, Data Masih Go Live, Tidak dapat dikeluarkan');
                $('#PenyerahanMainModal').modal('hide');
                $('#loading5').hide();
                return;
            }
            if(validasiLokasiJaminan > 0){
                alert('Beberapa jaminan masih berada di lokasi lain, Data tidak dapat dikeluarkan');
                $('#PenyerahanMainModal').modal('hide');
                $('#loading5').hide();
                return;
            }
 
            //  Penyerahan   
            $('#mainAreaKerjaPenyerahan').append('<option value="' + JaminanHeader.kode_kantor + '" selected>'+ JaminanHeader.kode_kantor + ' - ' + JaminanHeader.nama_kantor +'</option>');
            $('#mainTanggalPenyerahan').val(JaminanHeader.tgl); 
            $('#mainNomorRekeningPenyerahan').val(JaminanHeader.no_rekening);
            $('#mainTanggalRealisasiPenyerahan').val(JaminanHeader.tgl_realisasi);
            $('#mainIdPenyerahan').val(JaminanHeader.id);
            $('#mainNomorPenyerahan').val(JaminanHeader.nomor);
            $('#mainNoReffPenyerahan').val(JaminanHeader.no_reff);
            $('#mainNamaPenyerahan').val(JaminanHeader.nama);
            $('#mainAlamatPenyerahan').val(JaminanHeader.alamat);  
            $('#mainKotaPenyerahan').val(JaminanHeader.kota);  
            $('#mainNomorRekeningPenyerahan').val(JaminanHeader.no_rekening);
            $('#mainVerifikasiPenyerahan').val(JaminanHeader.verifikasi);
            $('#mainKeteranganPenyerahan').val("Pelunasan");  
            
            if(JaminanHeader.jenis_jaminan == 'SERTIFIKAT'){
                mappingFieldSertifikatPenyerahan(JaminanHeader, JaminanDokument);
            } 
            else if(JaminanHeader.jenis_jaminan == 'BPKB'){
                mappingFieldBPKBPenyerahan(JaminanHeader, JaminanDokument);
            }
            else if(JaminanHeader.jenis_jaminan == 'EMAS'){
                mappingFieldEmasPenyerahan(JaminanHeader, JaminanDokument);
            }
            $('#loadingPenyerahan').hide();
            $('#loading').hide();
        },
        error : function(response) {
            console.log('failed');
            alert("Gagal Get Detail");
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/index';
        }
    });   
});


$('#mainBtnSearchRekening').click(function () {
    $('#modalNomorRekening').modal('show');
    dataTableeee = [];
    console.log('button di click');
    $.ajax({
            url : base_url + "index.php/AsetDokumenUpdateController/getNomorRekening",
            type : "POST",
            dataType : "json",
            data : {"test"    : "test"},

            success : function(response) {
                //console.log(response);  
                        
                dataTableeee.push(response); 

                console.log(dataTableeee);
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
                $('#loading7').hide();  
                console.log("FINISH");
                
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Gagal Get Detail Nomor Rekening, Silahkan Coba Lagi');
                $('#modalNomorRekening').modal('hide');
            }
    });     
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


function mappingFieldSertifikat(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument){
              
                $('#main_tab_bpkb').hide(); 
                $('#main_tab_emas').hide(); 
                $('#main_tab_sert').show();

                //sert
                $('#sertKantorLokasi').find('option').remove().end();
                $('#sertKodeJenisAgunan').find('option').remove().end();
                $('#sertJenisSertifikat').find('option').remove().end();
                // remove asli dok sert
                $('#sertDokAJB').find('option').remove().end();
                $('#sertDokIMB').find('option').remove().end();
                $('#sertDokSPPT').find('option').remove().end();
                $('#sertDokSKHMT').find('option').remove().end();
                $('#sertDokDenah').find('option').remove().end();
                $('#sertDokRoya').find('option').remove().end();
                $('#sertDokSHT').find('option').remove().end();
                $('#sertDokSTTS').find('option').remove().end();
                $('#sertDokSSB').find('option').remove().end();

                // ISI
                $('#sertJenisSertifikat').append(jenis_sert_otion);
                $('#sertDokAJB').append(asli_option);
                $('#sertDokIMB').append(asli_option);
                $('#sertDokSPPT').append(asli_option);
                $('#sertDokSKHMT').append(asli_option);
                $('#sertDokDenah').append(asli_option);
                $('#sertDokRoya').append(asli_option);
                $('#sertDokSHT').append(asli_option);
                $('#sertDokSTTS').append(asli_option);
                $('#sertDokSSB').append(asli_option);

                //$('#sertTabAgunanID').html(JaminanDokument.agunan_id);
                

                // sertifikat 
                $('#sertTglRegister').val(JaminanDokument.tgl_register);
                // sertTglPenilaian ini di SID belum di bikin
                $('#sertKantorLokasi').append('<option value="' + JaminanDokument.kode_kantor_lokasi_jaminan + '" selected>'+ JaminanDokument.app_kode_kantor + ' - ' + JaminanDokument.app_nama_kantor +'</option>'); 
                $('#sertKodeJenisAgunan').append('<option value="' + JaminanDokument.jenis_agunan_detail + '" selected>' + JaminanDokument.KKJA_jenis_agunan +'</option>'); 
                $('#sertKodeIkatanAgunan').append('<option value="' + JaminanDokument.ikatan_agunan_detail + '" data-persen="'+ JaminanDokument.ikatan_persen_default +'" selected>' + JaminanDokument.ikatan_agunan +'</option>')
                $('#sertNilaiTaksasiAgunan').val(JaminanDokument.nilai_taksasi_detail); 
                $('#sertNJOP').val(JaminanDokument.nilai_njop_detail); 
                $('#sertHargaPasar').val(JaminanDokument.nilai_pasar_detail); 
                $('#sertAPHT').val(JaminanDokument.nilai_apht_detail); 
                $('#sertPersenDijamin').val(JaminanDokument.ikatan_persen_default);
                $('#sertAgunanID').val(JaminanDokument.agunan_id); 
                $('#sertID').val(JaminanDokument.id);
                //penentuan nomor sertifikat
                if(JaminanDokument.no_shm != ''){
                    $('#sertNoSert').val(JaminanDokument.no_shm); 
                    $('#sertJenisSertifikat').append('<option value="SHM" selected>SHM</option>');
                    $('#rowSertNoSertif').html(JaminanDokument.no_shm);
                    $('#rowSertJenis').html('SHM');
                } else if(JaminanDokument.no_shgb != ''){
                    $('#sertNoSert').val(JaminanDokument.no_shgb); 
                    $('#sertJenisSertifikat').append('<option value="SHGB" selected>SHGB</option>');
                    $('#rowSertNoSertif').html(JaminanDokument.no_shgb);
                    $('#rowSertJenis').html('SHGB');
                } else if(JaminanDokument.no_ajb != ''){
                    $('#sertNoSert').val(JaminanDokument.no_ajb); 
                    $('#sertJenisSertifikat').append('<option value="AJB" selected>AJB</option>');
                    $('#rowSertNoSertif').html(JaminanDokument.no_ajb);
                    $('#rowSertJenis').html('AJB');
                }
                $('#sertKOHIR').val(JaminanDokument.no_kohir); 
                $('#sertNoPERSIL').val(JaminanDokument.no_persil);  
                $('#sertTanggalSertifikat').val(JaminanDokument.tgl_sertifikat); 
                $('#sertJTSHGB').val(JaminanDokument.tgl_jt_shgb); 
                $('#sertNoSuratUkur').val(JaminanDokument.no_surat_ukur); 
                $('#sertPLBangunan').val(JaminanDokument.pl_bangunan); 
                $('#sertLuasTanah').val(JaminanDokument.luas_tanah); 
                $('#sertNamaPPAT').val(JaminanDokument.nama_ppat);  
                $('#sertNamaPemilik').val(JaminanDokument.nama_pemilik_sertifikat); 
                $('#sertAlamatSertifikat').val(JaminanDokument.alamat_sertifikat);
                $('#sertKelurahan').val(JaminanDokument.kelurahan_sertifikat);
                $('#sertKecamatan').val(JaminanDokument.kecamatan_sertifikat);
                $('#sertKota').val(JaminanDokument.kota_sertifikat);
                $('#sertPorpinsi').val(JaminanDokument.propinsi_sertifikat);
                $('#sertBatasTanah').val(JaminanDokument.batas_tanah);
                $('#sertVerifikasi').val(JaminanDokument.verifikasi);

                $('#rowSertAgunanID').html(JaminanDokument.agunan_id);
                $('#rowSertTanggal').html(JaminanDokument.tgl_sertifikat);
                $('#rowSertLuasTanah').html(JaminanDokument.luas_tanah);
                $('#rowSertPemilik').html(JaminanDokument.nama_pemilik_sertifikat);
                $('#rowSertVerif').html(JaminanDokument.verifikasi);

                // DATA LAMPIRAN  
                if(JaminanDokument.asli_ajb == 1){
                    $('#sertDokAJB').append('<option value="1" selected>ASLI</option>');
                }else{
                    $('#sertDokAJB').append('<option value="2" selected>COPY</option>');
                }
                if(JaminanDokument.asli_imb == 1){
                    $('#sertDokIMB').append('<option value="1" selected>ASLI</option>');
                }else{
                    $('#sertDokIMB').append('<option value="2" selected>COPY</option>');
                }
                if(JaminanDokument.asli_sppt == 1){
                    $('#sertDokSPPT').append('<option value="1" selected>ASLI</option>');
                }else{
                    $('#sertDokSPPT').append('<option value="2" selected>COPY</option>');
                }
                if(JaminanDokument.asli_skmht == 1){
                    $('#sertDokSKHMT').append('<option value="1" selected>ASLI</option>');
                }else{
                    $('#sertDokSKHMT').append('<option value="2" selected>COPY</option>');
                }
                if(JaminanDokument.asli_gambar_denah == 1){
                    $('#sertDokDenah').append('<option value="1" selected>ASLI</option>');
                }else{
                    $('#sertDokDenah').append('<option value="2" selected>COPY</option>');
                }
                if(JaminanDokument.asli_surat_roya == 1){
                    $('#sertDokRoya').append('<option value="1" selected>ASLI</option>');
                }else{
                    $('#sertDokRoya').append('<option value="2" selected>COPY</option>');
                }
                if(JaminanDokument.asli_sht == 1){
                    $('#sertDokSHT').append('<option value="1" selected>ASLI</option>');
                }else{
                    $('#sertDokSHT').append('<option value="2" selected>COPY</option>');
                }
                if(JaminanDokument.asli_stts == 1){
                    $('#sertDokSTTS').append('<option value="1" selected>ASLI</option>');
                }else{
                    $('#sertDokSTTS').append('<option value="2" selected>COPY</option>');
                }
                if(JaminanDokument.asli_ssb == 1){
                    $('#sertDokSSB').append('<option value="1" selected>ASLI</option>');
                }else{
                    $('#sertDokSSB').append('<option value="2" selected>COPY</option>');
                }
                $('#sertNomorAJB').val(JaminanDokument.no_ajb);  
                $('#sertTanggalAJB').val(JaminanDokument.tgl_ajb);  
                $('#sertNomorIMB').val(JaminanDokument.no_imb); 
                $('#sertNomorSPPT').val(JaminanDokument.no_sppt);
                $('#sertTahunSPPT').val(JaminanDokument.sppt_tahun);
                $('#sertNoSHT').val(JaminanDokument.no_sht);
                $('#sertPropinsiSHT').val(JaminanDokument.sht_propinsi);
                $('#sertKotaSHT').val(JaminanDokument.sht_kota);
                $('#sertTahunSTTS').val(JaminanDokument.stts_tahun);
                $('#sertAtasNamaSSBBPHTB').val(JaminanDokument.ssb_atas_nama);
                $('#sertLainnya').val(JaminanDokument.lain_lain);

                /// check box sertifikat
                if(JaminanDokument.ajb == 'Y'){
                    $("#check_ajb").prop("checked", true);
                }
                else{
                    $("#check_ajb").prop("checked", false);
                    $("#sertNomorAJB").prop("disabled", true);
                }
                if(JaminanDokument.imb == 'Y'){
                    $("#check_imb").prop("checked", true);
                }
                else{
                    $("#check_imb").prop("checked", false);
                    $("#sertNomorIMB").prop("disabled", true); 
                }
                if(JaminanDokument.sppt == 'Y'){
                    $("#check_sppt").prop("checked", true);
                }
                else{
                    $("#check_sppt").prop("checked", false);
                    $("#sertNomorSPPT").prop("disabled", true); 
                    $("#sertTahunSPPT").prop("disabled", true); 
                }
                if(JaminanDokument.skmht == 'Y'){
                    $("#check_skmht").prop("checked", true);
                }
                else{
                    $("#check_skmht").prop("checked", false);
                    $("#sertNoSHT").prop("disabled", true); 
                    $("#sertPropinsiSHT").prop("disabled", true); 
                    $("#sertKotaSHT").prop("disabled", true); 
                }
                if(JaminanDokument.gambar_denah == 'Y'){
                    $("#check_denah").prop("checked", true);
                }
                else{
                    $("#check_denah").prop("checked", false);
                }
                if(JaminanDokument.surat_roya == 'Y'){
                    $("#check_roya").prop("checked", true);
                }
                else{
                    $("#check_roya").prop("checked", false);
                }
                if(JaminanDokument.sht == 'Y'){
                    $("#check_sht").prop("checked", true);
                }
                else{
                    $("#check_sht").prop("checked", false);
                }
                if(JaminanDokument.stts == 'Y'){
                    $("#check_stts").prop("checked", true);
                }
                else{
                    $("#check_stts").prop("checked", false);
                    $("#sertTahunSTTS").prop("disabled", true); 
                }
                if(JaminanDokument.ssb == 'Y'){
                    $("#check_ssb_bpht").prop("checked", true);
                }
                else{
                    $("#check_ssb_bpht").prop("checked", false);
                    $("#sertAtasNamaSSBBPHTB").prop("disabled", true);
                }
                

                $.each(ListKodeKantor,function(i,data){
                    $('#sertKantorLokasi').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
                });
                $.each(KreKodeJenisAgunan,function(i,data){
                    $('#sertKodeJenisAgunan').append('<option value="'+data.kode_jenis_agunan+'">' + data.jenis_agunan +'</option>');
                });
                $.each(KreKodeIkatanHukumAgunan,function(i,data){
                    $('#sertKodeIkatanAgunan').append('<option value="'+data.kode_ikatan_hukum+'" data-persen="'+data.persen_default+'">' + data.ikatan_agunan +'</option>');
                });
                
}
function mappingFieldBPKB(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument){
    $('#main_tab_sert').hide(); 
    $('#main_tab_emas').hide();
    $('#main_tab_bpkb').show();

     //bpkb
     $('#bpkbKodeJenisAgunan').find('option').remove().end();
     $('#bpkbKodeIkatanAgunan').find('option').remove().end();
     $('#bpkbKantorLokasi').find('option').remove().end();
     $('#bpkbMerk').find('option').remove().end();
     $('#bpkbType').find('option').remove().end();
     $('#bpkbJenis').find('option').remove().end();
     // remove asli dok bpkb
     $('#bpkbDokKwitansiBlanko').find('option').remove().end();
     $('#bpkbDokFakturPemilik').find('option').remove().end();
     $('#bpkbDokKwJualBeli').find('option').remove().end();
     $('#bpkbDokSKTrayek').find('option').remove().end();
     
    // ISI
    $('#bpkbDokKwitansiBlanko').append(asli_option);
    $('#bpkbDokFakturPemilik').append(asli_option);
    $('#bpkbDokKwJualBeli').append(asli_option);
    $('#bpkbDokSKTrayek').append(asli_option);

    $('#rowBPKBAgunanID').html(JaminanDokument.agunan_id);
    $('#rowBPKBNoBpkb').html(JaminanDokument.nomor_bpkb);
    $('#rowBPKBNamaPemilik').html(JaminanDokument.nama_bpkb);
    $('#rowBPKBAlamat').html(JaminanDokument.alamat_bpkb);
    $('#rowBPKBNoPolisi').html(JaminanDokument.no_polisi);
    $('#rowBPKBVerif').html(JaminanDokument.verifikasi);



    ///untuk bpkb
    $('#bpkbVerifikasi').val(JaminanDokument.verifikasi);
    $('#bpkbTglRegister').val(JaminanDokument.tgl_register);
    //bpkbTglPenilaian tgl penilaian dari SID belum di develop
    $('#bpkbKantorLokasi').append('<option value="' + JaminanDokument.kode_kantor_lokasi_jaminan + '" selected>'+ JaminanDokument.app_kode_kantor + ' - ' + JaminanDokument.app_nama_kantor +'</option>'); 
    $('#bpkbKodeJenisAgunan').append('<option value="' + JaminanDokument.jenis_agunan_detail + '" selected>' + JaminanDokument.KKJA_jenis_agunan +'</option>'); 
    $('#bpkbKodeIkatanAgunan').append('<option value="' + JaminanDokument.ikatan_agunan_detail + '" data-persen="'+ JaminanDokument.ikatan_persen_default +'" selected>' + JaminanDokument.ikatan_agunan +'</option>')
    
    $('#bpkbNilaiTaksasiAgunan').val(JaminanDokument.nilai_taksasi_detail);
    $('#bpkbNJOP').val(JaminanDokument.nilai_njop_detail);
    $('#bpkbHargaPasar').val(JaminanDokument.nilai_pasar_detail);
    $('#bpkbAPHT').val(JaminanDokument.nilai_apht_detail);
    $('#bpkbPersenDijamin').val(JaminanDokument.persen_dijaminkan_detail);
    //Data BPKB
    $('#bpkbAgunanID').val(JaminanDokument.agunan_id);  
    $('#bpkbNoBPKB').val(JaminanDokument.nomor_bpkb);    
    $('#bpkbNamaPemilik').val(JaminanDokument.nama_bpkb);   
    $('#bpkbAlamatPemlik').val(JaminanDokument.alamat_bpkb);    
    $('#bpkbKotaPemilik').val(JaminanDokument.kota_bpkb);  
    $('#bpkbSilinder').val(JaminanDokument.silinder); 
    $('#bpkbNoRangka').val(JaminanDokument.no_rangka);  
    $('#bpkbNoMesin').val(JaminanDokument.no_mesin);
    $('#bpkbTahun').val(JaminanDokument.tahun);
    $('#bpkbTglExpPajak').val(JaminanDokument.tgl_expired_pajak); 
    $('#bpkbWarna').val(JaminanDokument.warna);     
    $('#bpkbNoPolisi').val(JaminanDokument.no_polisi);  
    $('#bpkbTglExpSTNK').val(JaminanDokument.tgl_expired_stnk); 
    $('#bpkbNoSTNK').val(JaminanDokument.no_stnk); 
    $('#bpkbID').val(JaminanDokument.id); 
    $('#bpkbNoReff').val(JaminanDokument.no_reff); 
    
    
    $('#bpkbMerk').append('<option value="'+JaminanDokument.kd_merk+'" selected>'+ JaminanDokument.nama_merk+'</option>');
    $('#bpkbType').append('<option value="'+JaminanDokument.kd_type+'" selected>'+ JaminanDokument.nama_type+'</option>');
    $('#bpkbJenis').append('<option value="'+JaminanDokument.kd_jenis+'"selected>'+ JaminanDokument.nama_jenis+'</option>');
    
    // Data Lampiran
    $('#bpkbNoFakturPemilik').val(JaminanDokument.no_faktur);  
    $('#noSKTrayek').val(JaminanDokument.no_sk_trayek);  
    $('#bpkbBerlakuSD').val(JaminanDokument.tgl_expired_sk_trayek);     
    $('#bpkbLainnya').val(JaminanDokument.lain_lain);
    
    if(JaminanDokument.asli_blanko == 1){
        $('#bpkbDokKwitansiBlanko').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#bpkbDokKwitansiBlanko').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_faktur_pemilik == 1){
        $('#bpkbDokFakturPemilik').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#bpkbDokFakturPemilik').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_kwitansi_jb == 1){
        $('#bpkbDokKwJualBeli').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#bpkbDokKwJualBeli').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_sk_trayek == 1){
        $('#bpkbDokSKTrayek').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#bpkbDokSKTrayek').append('<option value="2" selected>COPY</option>');
    }
    /// check box bpkb
    if(JaminanDokument.blanko == 'Y'){
        $("#check_kw_blanko").prop("checked", true);
    }
    else{
        $("#check_kw_blanko").prop("checked", false);
    }
    if(JaminanDokument.faktur_pemilik == 'Y'){
        $("#check_faktur_pemilik").prop("checked", true);
    }
    else{
        $("#check_faktur_pemilik").prop("checked", false);
        
        $("#bpkbNoFakturPemilik").prop("disabled", true); 
    }
    if(JaminanDokument.kwitansi_jb == 'Y'){
        $("#check_kw_jual_beli").prop("checked", true);
    }
    else{
        $("#check_kw_jual_beli").prop("checked", false);
    }
    if(JaminanDokument.sk_trayek == 'Y'){
        $("#check_sk_trayek").prop("checked", true);
    }
    else{
        $("#check_sk_trayek").prop("checked", false);
        $("#noSKTrayek").prop("disabled", true); 
        $("#bpkbBerlakuSD").prop("disabled", true); 
    }
    
    $.each(MerkKend,function(i,data){
        $('#bpkbMerk').append('<option value="'+data.kd_merk+'">'+ data.nm_merk+'</option>');
    });
    $.each(TypeKend,function(i,data){
        $('#bpkbType').append('<option value="'+data.kd_type+'">'+ data.nm_type+'</option>');
    });
    $.each(JenisKend,function(i,data){
        $('#bpkbJenis').append('<option value="'+data.kd_jenis+'">'+ data.nm_jenis+'</option>');
    });
    $.each(ListKodeKantor,function(i,data){
        $('#bpkbKantorLokasi').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
    });
    $.each(KreKodeJenisAgunan,function(i,data){
        $('#bpkbKodeJenisAgunan').append('<option value="'+data.kode_jenis_agunan+'">' + data.jenis_agunan +'</option>');
    });
    $.each(KreKodeIkatanHukumAgunan,function(i,data){
        $('#bpkbKodeIkatanAgunan').append('<option value="'+data.kode_ikatan_hukum+'" data-persen="'+data.persen_default+'">' + data.ikatan_agunan +'</option>');
    });
}
function mappingFieldEmas(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument){
    $('#main_tab_sert').hide(); 
    $('#main_tab_bpkb').hide();
    $('#main_tab_emas').show();

    //remove jenis emas
    $('#emasJenisEmas').find('option').remove().end();
    // ISI
    $('#emasJenisEmas').append(jenis_emas_list);

    $('#emasAgunanID').val(JaminanDokument.agunan_id); 
    $('#emasNoSeri').val(JaminanDokument.no_seri); 
    $('#emasJenisEmas').append('<option value="' + JaminanDokument.jenis_emas + '" selected>'+ JaminanDokument.jenis_emas + '</option>');
    $('#emasKarat').val(JaminanDokument.karat); 
    $('#emasBerat').val(JaminanDokument.berat); 
    $('#emasHargaPasar').val(JaminanDokument.harga_pasar); 
    $('#emasHargaTaksasi').val(JaminanDokument.harga_taksasi); 
    $('#emasID').val(JaminanDokument.id); 
    $('#emasNoReff').val(JaminanDokument.no_reff); 
    $('#emasVerifikasi').val(JaminanDokument.verifikasi);

    $('#rowEmasAgunanID').html(JaminanDokument.agunan_id);
    $('#rowEmasNoSeri').html(JaminanDokument.no_seri); 
    $('#rowEmasJenis').html(JaminanDokument.jenis_emas); 
    $('#rowEmasKarat').html(JaminanDokument.karat); 
    $('#rowEmasGram').html(JaminanDokument.berat); 
    $('#rowEmasHargaPasar').html(JaminanDokument.harga_pasar);
    $('#rowEmasVerif').html(JaminanDokument.verifikasi);  
}

function mappingFieldSertifikatPinjam(JaminanHeader, JaminanDokument){
   
    $('#main_tab_bpkbPinjam').hide(); 
    $('#main_tab_emasPinjam').hide(); 
    $('#main_tab_sertPinjam').show();

    //sert
    $('#sertKantorLokasiPinjam').find('option').remove().end();
    $('#sertKodeJenisAgunanPinjam').find('option').remove().end();
    $('#sertJenisSertifikatPinjam').find('option').remove().end();
   // $('#sertVerifikasi').find('option').remove().end();
    // remove asli dok sert
    $('#sertDokAJBPinjam').find('option').remove().end();
    $('#sertDokIMBPinjam').find('option').remove().end();
    $('#sertDokSPPTPinjam').find('option').remove().end();
    $('#sertDokSKHMTPinjam').find('option').remove().end();
    $('#sertDokDenahPinjam').find('option').remove().end();
    $('#sertDokRoyaPinjam').find('option').remove().end();
    $('#sertDokSHTPinjam').find('option').remove().end();
    $('#sertDokSTTSPinjam').find('option').remove().end();
    $('#sertDokSSBPinjam').find('option').remove().end();
    //$('#sertVerifikasiPinjam').append(jenis_verifikasi_list);



    // sertifikat 
    $('#sertTglRegisterPinjam').val(JaminanDokument.tgl_register);
    // sertTglPenilaian ini di SID belum di bikin
    $('#sertKantorLokasiPinjam').append('<option value="' + JaminanDokument.kode_kantor_lokasi_jaminan + '" selected>'+ JaminanDokument.app_kode_kantor + ' - ' + JaminanDokument.app_nama_kantor +'</option>'); 
    $('#sertKodeJenisAgunanPinjam').append('<option value="' + JaminanDokument.jenis_agunan_detail + '" selected>' + JaminanDokument.KKJA_jenis_agunan +'</option>'); 
    $('#sertKodeIkatanAgunanPinjam').append('<option value="' + JaminanDokument.ikatan_agunan_detail + '" data-persen="'+ JaminanDokument.ikatan_persen_default +'" selected>' + JaminanDokument.ikatan_agunan +'</option>');
    $('#sertVerifikasiPinjam').append('<option value="' + JaminanDokument.verifikasi + '" selected>' + JaminanDokument.verifikasi +'</option>'); 
    $('#sertNilaiTaksasiAgunanPinjam').val(JaminanDokument.nilai_taksasi_detail); 
    $('#sertNJOPPinjam').val(JaminanDokument.nilai_njop_detail); 
    $('#sertHargaPasarPinjam').val(JaminanDokument.nilai_pasar_detail); 
    $('#sertAPHTPinjam').val(JaminanDokument.nilai_apht_detail); 
    $('#sertPersenDijaminPinjam').val(JaminanDokument.ikatan_persen_default);
    $('#sertAgunanIDPinjam').val(JaminanDokument.agunan_id); 
    $('#sertIDPinjam').val(JaminanDokument.id);
    if(JaminanDokument.no_shm != ''){
        $('#sertNoSertPinjam').val(JaminanDokument.no_shm); 
        $('#sertJenisSertifikatPinjam').append('<option value="SHM" selected>SHM</option>');
        $('#rowSertNoSertifPinjam').html(JaminanDokument.no_shm);
        $('#rowSertJenisPinjam').html('SHM');
    } else if(JaminanDokument.no_shgb != ''){
        $('#sertNoSertPinjam').val(JaminanDokument.no_shgb); 
        $('#sertJenisSertifikatPinjam').append('<option value="SHGB" selected>SHGB</option>');
        $('#rowSertNoSertifPinjam').html(JaminanDokument.no_shgb);
        $('#rowSertJenisPinjam').html('SHGB');
    } else if(JaminanDokument.no_ajb != ''){
        $('#sertNoSertPinjam').val(JaminanDokument.no_ajb); 
        $('#sertJenisSertifikatPinjam').append('<option value="AJB" selected>AJB</option>');
        $('#rowSertNoSertifPinjam').html(JaminanDokument.no_ajb);
        $('#rowSertJenisPinjam').html('AJB');
    }
    $('#sertKOHIRPinjam').val(JaminanDokument.no_kohir); 
    $('#sertNoPERSILPinjam').val(JaminanDokument.no_persil);  
    $('#sertTanggalSertifikatPinjam').val(JaminanDokument.tgl_sertifikat); 
    $('#sertJTSHGBPinjam').val(JaminanDokument.tgl_jt_shgb); 
    $('#sertNoSuratUkurPinjam').val(JaminanDokument.no_surat_ukur); 
    $('#sertPLBangunanPinjam').val(JaminanDokument.pl_bangunan); 
    $('#sertLuasTanahPinjam').val(JaminanDokument.luas_tanah); 
    $('#sertNamaPPATPinjam').val(JaminanDokument.nama_ppat);  
    $('#sertNamaPemilikPinjam').val(JaminanDokument.nama_pemilik_sertifikat); 
    $('#sertAlamatSertifikatPinjam').val(JaminanDokument.alamat_sertifikat);
    $('#sertKelurahanPinjam').val(JaminanDokument.kelurahan_sertifikat);
    $('#sertKecamatanPinjam').val(JaminanDokument.kecamatan_sertifikat);
    $('#sertKotaPinjam').val(JaminanDokument.kota_sertifikat);
    $('#sertPorpinsiPinjam').val(JaminanDokument.propinsi_sertifikat);
    $('#sertBatasTanahPinjam').val(JaminanDokument.batas_tanah);
    $('#sertVerifikasiPinjam').val(JaminanDokument.verifikasi);

    $('#rowSertAgunanIDPinjam').html(JaminanDokument.agunan_id);
    $('#rowSertTanggalPinjam').html(JaminanDokument.tgl_sertifikat);
    $('#rowSertLuasTanahPinjam').html(JaminanDokument.luas_tanah);
    $('#rowSertPemilikPinjam').html(JaminanDokument.nama_pemilik_sertifikat);
    $('#rowSertVerifPinjam').html(JaminanDokument.verifikasi);    

    // DATA LAMPIRAN  
    if(JaminanDokument.asli_ajb == 1){
        $('#sertDokAJBPinjam').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokAJBPinjam').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_imb == 1){
        $('#sertDokIMBPinjam').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokIMBPinjam').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_sppt == 1){
        $('#sertDokSPPTPinjam').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokSPPTPinjam').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_skmht == 1){
        $('#sertDokSKHMTPinjam').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokSKHMTPinjam').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_gambar_denah == 1){
        $('#sertDokDenahPinjam').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokDenahPinjam').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_surat_roya == 1){
        $('#sertDokRoyaPinjam').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokRoyaPinjam').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_sht == 1){
        $('#sertDokSHTPinjam').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokSHTPinjam').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_stts == 1){
        $('#sertDokSTTSPinjam').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokSTTSPinjam').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_ssb == 1){
        $('#sertDokSSBPinjam').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokSSBPinjam').append('<option value="2" selected>COPY</option>');
    }
    $('#sertNomorAJBPinjam').val(JaminanDokument.no_ajb);  
    $('#sertTanggalAJBPinjam').val(JaminanDokument.tgl_ajb);  
    $('#sertNomorIMBPinjam').val(JaminanDokument.no_imb); 
    $('#sertNomorSPPTPinjam').val(JaminanDokument.no_sppt);
    $('#sertTahunSPPTPinjam').val(JaminanDokument.sppt_tahun);
    $('#sertNoSHTPinjam').val(JaminanDokument.no_sht);
    $('#sertPropinsiSHTPinjam').val(JaminanDokument.sht_propinsi);
    $('#sertKotaSHTPinjam').val(JaminanDokument.sht_kota);
    $('#sertTahunSTTSPinjam').val(JaminanDokument.stts_tahun);
    $('#sertAtasNamaSSBBPHTBPinjam').val(JaminanDokument.ssb_atas_nama);
    $('#sertLainnyaPinjam').val(JaminanDokument.lain_lain);

    /// check box sertifikat
    if(JaminanDokument.ajb == 'Y'){
        $("#check_ajbPinjam").prop("checked", true);
    }
    else{
        $("#check_ajbPinjam").prop("checked", false);
    }
    if(JaminanDokument.imb == 'Y'){
        $("#check_imbPinjam").prop("checked", true);
    }
    else{
        $("#check_imbPinjam").prop("checked", false);
    }
    if(JaminanDokument.sppt == 'Y'){
        $("#check_spptPinjam").prop("checked", true);
    }
    else{
        $("#check_spptPinjam").prop("checked", false);
    }
    if(JaminanDokument.skmht == 'Y'){
        $("#check_skmhtPinjam").prop("checked", true);
    }
    else{
        $("#check_skmhtPinjam").prop("checked", false);
    }
    if(JaminanDokument.gambar_denah == 'Y'){
        $("#check_denahPinjam").prop("checked", true);
    }
    else{
        $("#check_denahPinjam").prop("checked", false);
    }
    if(JaminanDokument.surat_roya == 'Y'){
        $("#check_royaPinjam").prop("checked", true);
    }
    else{
        $("#check_royaPinjam").prop("checked", false);
    }
    if(JaminanDokument.sht == 'Y'){
        $("#check_shtPinjam").prop("checked", true);
    }
    else{
        $("#check_shtPinjam").prop("checked", false);
    }
    if(JaminanDokument.stts == 'Y'){
        $("#check_sttsPinjam").prop("checked", true);
    }
    else{
        $("#check_sttsPinjam").prop("checked", false);
    }
    if(JaminanDokument.ssb == 'Y'){
        $("#check_ssb_bphtPinjam").prop("checked", true);
    }
    else{
        $("#check_ssb_bphtPinjam").prop("checked", false);
    }
}
function mappingFieldBPKBPinjam(JaminanHeader, JaminanDokument){
    $('#main_tab_sertPinjam').hide(); 
    $('#main_tab_emasPinjam').hide();
    $('#main_tab_bpkbPinjam').show();

      //bpkb
      $('#bpkbKodeJenisAgunanPinjam').find('option').remove().end();
      $('#bpkbKodeIkatanAgunanPinjam').find('option').remove().end();
      $('#bpkbKantorLokasiPinjam').find('option').remove().end();
      $('#bpkbMerkPinjam').find('option').remove().end();
      $('#bpkbTypePinjam').find('option').remove().end();
      $('#bpkbJenisPinjam').find('option').remove().end();
 
      
      // remove asli dok bpkb
      $('#bpkbDokKwitansiBlankoPinjam').find('option').remove().end();
      $('#bpkbDokFakturPemilikPinjam').find('option').remove().end();
      $('#bpkbDokKwJualBeliPinjam').find('option').remove().end();
      $('#bpkbDokSKTrayekPinjam').find('option').remove().end();
 
     ///untuk bpkb
     $('#bpkbVerifikasiPinjam').val(JaminanDokument.verifikasi);
     $('#bpkbTglRegisterPinjam').val(JaminanDokument.tgl_register);
     //bpkbTglPenilaian tgl penilaian dari SID belum di develop
     $('#bpkbKantorLokasiPinjam').append('<option value="' + JaminanDokument.kode_kantor_lokasi_jaminan + '" selected>'+ JaminanDokument.app_kode_kantor + ' - ' + JaminanDokument.app_nama_kantor +'</option>'); 
     $('#bpkbKodeJenisAgunanPinjam').append('<option value="' + JaminanDokument.jenis_agunan_detail + '" selected>' + JaminanDokument.KKJA_jenis_agunan +'</option>'); 
     $('#bpkbKodeIkatanAgunanPinjam').append('<option value="' + JaminanDokument.ikatan_agunan_detail + '" data-persen="'+ JaminanDokument.ikatan_persen_default +'" selected>' + JaminanDokument.ikatan_agunan +'</option>')
     $('#bpkbVerifikasiPinjam').append('<option value="' + JaminanDokument.verifikasi + '" selected>' + JaminanDokument.verifikasi +'</option>'); 
     $('#bpkbNilaiTaksasiAgunanPinjam').val(JaminanDokument.nilai_taksasi_detail);
     $('#bpkbNJOPPinjam').val(JaminanDokument.nilai_njop_detail);
     $('#bpkbHargaPasarPinjam').val(JaminanDokument.nilai_pasar_detail);
     $('#bpkbAPHTPinjam').val(JaminanDokument.nilai_apht_detail);
     $('#bpkbPersenDijaminPinjam').val(JaminanDokument.persen_dijaminkan_detail);
     //Data BPKB
     $('#bpkbAgunanIDPinjam').val(JaminanDokument.agunan_id);  
     $('#bpkbNoBPKBPinjam').val(JaminanDokument.nomor_bpkb);    
     $('#bpkbNamaPemilikPinjam').val(JaminanDokument.nama_bpkb);   
     $('#bpkbAlamatPemlikPinjam').val(JaminanDokument.alamat_bpkb);    
     $('#bpkbKotaPemilikPinjam').val(JaminanDokument.kota_bpkb);  
     $('#bpkbSilinderPinjam').val(JaminanDokument.silinder); 
     $('#bpkbNoRangkaPinjam').val(JaminanDokument.no_rangka);  
     $('#bpkbNoMesinPinjam').val(JaminanDokument.no_mesin);
     $('#bpkbTahunPinjam').val(JaminanDokument.tahun);
     $('#bpkbTglExpPajakPinjam').val(JaminanDokument.tgl_expired_pajak); 
     $('#bpkbWarnaPinjam').val(JaminanDokument.warna);     
     $('#bpkbNoPolisiPinjam').val(JaminanDokument.no_polisi);  
     $('#bpkbTglExpSTNKPinjam').val(JaminanDokument.tgl_expired_stnk); 
     $('#bpkbNoSTNKPinjam').val(JaminanDokument.no_stnk); 
     $('#bpkbIDPinjam').val(JaminanDokument.id); 
     $('#bpkbNoReffPinjam').val(JaminanDokument.no_reff); 
     
     
     $('#bpkbMerkPinjam').append('<option value="'+JaminanDokument.kd_merk+'" selected>'+ JaminanDokument.nama_merk+'</option>');
     $('#bpkbTypePinjam').append('<option value="'+JaminanDokument.kd_type+'" selected>'+ JaminanDokument.nama_type+'</option>');
     $('#bpkbJenisPinjam').append('<option value="'+JaminanDokument.kd_jenis+'"selected>'+ JaminanDokument.nama_jenis+'</option>');
     
     // Data Lampiran
     $('#bpkbNoFakturPemilikPinjam').val(JaminanDokument.no_faktur);  
     $('#noSKTrayekPinjam').val(JaminanDokument.no_sk_trayek);  
     $('#bpkbBerlakuSDPinjam').val(JaminanDokument.tgl_expired_sk_trayek);     
     $('#bpkbLainnyaPinjam').val(JaminanDokument.lain_lain);

    $('#rowBPKBAgunanIDPinjam').html(JaminanDokument.agunan_id);
    $('#rowBPKBNoBpkbPinjam').html(JaminanDokument.nomor_bpkb);
    $('#rowBPKBNamaPemilikPinjam').html(JaminanDokument.nama_bpkb);
    $('#rowBPKBAlamatPinjam').html(JaminanDokument.alamat_bpkb);
    $('#rowBPKBNoPolisiPinjam').html(JaminanDokument.no_polisi);
    $('#rowBPKBVerifPinjam').html(JaminanDokument.verifikasi);
     
     if(JaminanDokument.asli_blanko == 1){
         $('#bpkbDokKwitansiBlankoPinjam').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#bpkbDokKwitansiBlankoPinjam').append('<option value="2" selected>COPY</option>');
     }
     if(JaminanDokument.asli_faktur_pemilik == 1){
         $('#bpkbDokFakturPemilikPinjam').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#bpkbDokFakturPemilikPinjam').append('<option value="2" selected>COPY</option>');
     }
     if(JaminanDokument.asli_kwitansi_jb == 1){
         $('#bpkbDokKwJualBeliPinjam').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#bpkbDokKwJualBeliPinjam').append('<option value="2" selected>COPY</option>');
     }
     if(JaminanDokument.asli_sk_trayek == 1){
         $('#bpkbDokSKTrayekPinjam').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#bpkbDokSKTrayekPinjam').append('<option value="2" selected>COPY</option>');
     }
     /// check box bpkb
     if(JaminanDokument.blanko == 'Y'){
         $("#check_kw_blankoPinjam").prop("checked", true);
     }
     else{
         $("#check_kw_blankoPinjam").prop("checked", false);
     }
     if(JaminanDokument.faktur_pemilik == 'Y'){
         $("#check_faktur_pemilikPinjam").prop("checked", true);
     }
     else{
         $("#check_faktur_pemilikPinjam").prop("checked", false);
     }
     if(JaminanDokument.kwitansi_jb == 'Y'){
         $("#check_kw_jual_beliPinjam").prop("checked", true);
     }
     else{
         $("#check_kw_jual_beliPinjam").prop("checked", false);
     }
     if(JaminanDokument.sk_trayek == 'Y'){
         $("#check_sk_trayekPinjam").prop("checked", true);
     }
     else{
         $("#check_sk_trayekPinjam").prop("checked", false);
     }
}
function mappingFieldEmasPinjam(JaminanHeader, JaminanDokument){
    $('#main_tab_sertPinjam').hide(); 
    $('#main_tab_bpkbPinjam').hide();
    $('#main_tab_emasPinjam').show();

     //remove jenis emas
     $('#emasJenisEmasPinjam').find('option').remove().end();
    
     $('#emasVerifikasiPinjam').append('<option value="' + JaminanDokument.verifikasi + '" selected>' + JaminanDokument.verifikasi +'</option>'); 
     $('#emasAgunanIDPinjam').val(JaminanDokument.agunan_id); 
     $('#emasNoSeriPinjam').val(JaminanDokument.no_seri); 
     $('#emasJenisEmasPinjam').append('<option value="' + JaminanDokument.jenis_emas + '" selected>'+ JaminanDokument.jenis_emas + '</option>');
     $('#emasKaratPinjam').val(JaminanDokument.karat); 
     $('#emasBeratPinjam').val(JaminanDokument.berat); 
     $('#emasHargaPasarPinjam').val(JaminanDokument.harga_pasar); 
     $('#emasHargaTaksasiPinjam').val(JaminanDokument.harga_taksasi); 
     $('#emasIDPinjam').val(JaminanDokument.id); 
     $('#emasNoReffPinjam').val(JaminanDokument.no_reff); 
     $('#emasVerifikasiPinjam').val(JaminanDokument.verifikasi);

    $('#rowEmasAgunanIDPinjam').html(JaminanDokument.agunan_id);
    $('#rowEmasNoSeriPinjam').html(JaminanDokument.no_seri); 
    $('#rowEmasJenisPinjam').html(JaminanDokument.jenis_emas); 
    $('#rowEmasKaratPinjam').html(JaminanDokument.karat); 
    $('#rowEmasGramPinjam').html(JaminanDokument.berat); 
    $('#rowEmasHargaPasarPinjam').html(JaminanDokument.harga_pasar);
    $('#rowEmasVerifPinjam').html(JaminanDokument.verifikasi);
}

function mappingFieldSertifikatKembali(JaminanHeader, JaminanDokument){
    $('#main_tab_bpkbKembali').hide(); 
    $('#main_tab_emasKembali').hide(); 
    $('#main_tab_sertKembali').show();

     //sert
     $('#sertKantorLokasiKembali').find('option').remove().end();
     $('#sertKodeJenisAgunanKembali').find('option').remove().end();
     $('#sertJenisSertifikatKembali').find('option').remove().end();
    // $('#sertVerifikasi').find('option').remove().end();
     // remove asli dok sert
     $('#sertDokAJBKembali').find('option').remove().end();
     $('#sertDokIMBKembali').find('option').remove().end();
     $('#sertDokSPPTKembali').find('option').remove().end();
     $('#sertDokSKHMTKembali').find('option').remove().end();
     $('#sertDokDenahKembali').find('option').remove().end();
     $('#sertDokRoyaKembali').find('option').remove().end();
     $('#sertDokSHTKembali').find('option').remove().end();
     $('#sertDokSTTSKembali').find('option').remove().end();
     $('#sertDokSSBKembali').find('option').remove().end();
     //$('#sertVerifikasiKembali').append(jenis_verifikasi_list);
 
 
 
     // sertifikat 
     $('#sertTglRegisterKembali').val(JaminanDokument.tgl_register);
     // sertTglPenilaian ini di SID belum di bikin
     $('#sertKantorLokasiKembali').append('<option value="' + JaminanDokument.kode_kantor_lokasi_jaminan + '" selected>'+ JaminanDokument.app_kode_kantor + ' - ' + JaminanDokument.app_nama_kantor +'</option>'); 
     $('#sertKodeJenisAgunanKembali').append('<option value="' + JaminanDokument.jenis_agunan_detail + '" selected>' + JaminanDokument.KKJA_jenis_agunan +'</option>'); 
     $('#sertKodeIkatanAgunanKembali').append('<option value="' + JaminanDokument.ikatan_agunan_detail + '" data-persen="'+ JaminanDokument.ikatan_persen_default +'" selected>' + JaminanDokument.ikatan_agunan +'</option>');
     $('#sertVerifikasiKembali').append('<option value="' + JaminanDokument.verifikasi + '" selected>' + JaminanDokument.verifikasi +'</option>'); 
     $('#sertNilaiTaksasiAgunanKembali').val(JaminanDokument.nilai_taksasi_detail); 
     $('#sertNJOPKembali').val(JaminanDokument.nilai_njop_detail); 
     $('#sertHargaPasarKembali').val(JaminanDokument.nilai_pasar_detail); 
     $('#sertAPHTKembali').val(JaminanDokument.nilai_apht_detail); 
     $('#sertPersenDijaminKembali').val(JaminanDokument.ikatan_persen_default);
     $('#sertAgunanIDKembali').val(JaminanDokument.agunan_id); 
     $('#sertIDKembali').val(JaminanDokument.id);
     //penentuan nomor sertifikat
     if(JaminanDokument.no_shm != ''){
         $('#sertNoSertKembali').val(JaminanDokument.no_shm); 
         $('#sertJenisSertifikatKembali').append('<option value="SHM" selected>SHM</option>');
         $('#rowSertNoSertifKembali').html(JaminanDokument.no_shm);
         $('#rowSertJenisKembali').html('SHM');
     } else if(JaminanDokument.no_shgb != ''){
         $('#sertNoSertKembali').val(JaminanDokument.no_shgb); 
         $('#sertJenisSertifikatKembali').append('<option value="SHGB" selected>SHGB</option>');
         $('#rowSertNoSertifKembali').html(JaminanDokument.no_shgb);
         $('#rowSertJenisKembali').html('SHGB');
     } else if(JaminanDokument.no_ajb != ''){
         $('#sertNoSertKembali').val(JaminanDokument.no_ajb); 
         $('#sertJenisSertifikatKembali').append('<option value="AJB" selected>AJB</option>');
         $('#rowSertNoSertifKembali').html(JaminanDokument.no_ajb);
         $('#rowSertJenisKembali').html('AJB');
     }
     $('#sertKOHIRKembali').val(JaminanDokument.no_kohir); 
     $('#sertNoPERSILKembali').val(JaminanDokument.no_persil);  
     $('#sertTanggalSertifikatKembali').val(JaminanDokument.tgl_sertifikat); 
     $('#sertJTSHGBKembali').val(JaminanDokument.tgl_jt_shgb); 
     $('#sertNoSuratUkurKembali').val(JaminanDokument.no_surat_ukur); 
     $('#sertPLBangunanKembali').val(JaminanDokument.pl_bangunan); 
     $('#sertLuasTanahKembali').val(JaminanDokument.luas_tanah); 
     $('#sertNamaPPATKembali').val(JaminanDokument.nama_ppat);  
     $('#sertNamaPemilikKembali').val(JaminanDokument.nama_pemilik_sertifikat); 
     $('#sertAlamatSertifikatKembali').val(JaminanDokument.alamat_sertifikat);
     $('#sertKelurahanKembali').val(JaminanDokument.kelurahan_sertifikat);
     $('#sertKecamatanKembali').val(JaminanDokument.kecamatan_sertifikat);
     $('#sertKotaKembali').val(JaminanDokument.kota_sertifikat);
     $('#sertPorpinsiKembali').val(JaminanDokument.propinsi_sertifikat);
     $('#sertBatasTanahKembali').val(JaminanDokument.batas_tanah);
     $('#sertVerifikasiKembali').val(JaminanDokument.verifikasi);
    
    $('#rowSertAgunanIDKembali').html(JaminanDokument.agunan_id);
    $('#rowSertTanggalKembali').html(JaminanDokument.tgl_sertifikat);
    $('#rowSertLuasTanahKembali').html(JaminanDokument.luas_tanah);
    $('#rowSertPemilikKembali').html(JaminanDokument.nama_pemilik_sertifikat);
    $('#rowSertVerifKembali').html(JaminanDokument.verifikasi); 

     // DATA LAMPIRAN  
     if(JaminanDokument.asli_ajb == 1){
         $('#sertDokAJBKembali').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#sertDokAJBKembali').append('<option value="2" selected>COPY</option>');
     }
     if(JaminanDokument.asli_imb == 1){
         $('#sertDokIMBKembali').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#sertDokIMBKembali').append('<option value="2" selected>COPY</option>');
     }
     if(JaminanDokument.asli_sppt == 1){
         $('#sertDokSPPTKembali').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#sertDokSPPTKembali').append('<option value="2" selected>COPY</option>');
     }
     if(JaminanDokument.asli_skmht == 1){
         $('#sertDokSKHMTKembali').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#sertDokSKHMTKembali').append('<option value="2" selected>COPY</option>');
     }
     if(JaminanDokument.asli_gambar_denah == 1){
         $('#sertDokDenahKembali').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#sertDokDenahKembali').append('<option value="2" selected>COPY</option>');
     }
     if(JaminanDokument.asli_surat_roya == 1){
         $('#sertDokRoyaKembali').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#sertDokRoyaKembali').append('<option value="2" selected>COPY</option>');
     }
     if(JaminanDokument.asli_sht == 1){
         $('#sertDokSHTKembali').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#sertDokSHTKembali').append('<option value="2" selected>COPY</option>');
     }
     if(JaminanDokument.asli_stts == 1){
         $('#sertDokSTTSKembali').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#sertDokSTTSKembali').append('<option value="2" selected>COPY</option>');
     }
     if(JaminanDokument.asli_ssb == 1){
         $('#sertDokSSBKembali').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#sertDokSSBKembali').append('<option value="2" selected>COPY</option>');
     }
     $('#sertNomorAJBKembali').val(JaminanDokument.no_ajb);  
     $('#sertTanggalAJBKembali').val(JaminanDokument.tgl_ajb);  
     $('#sertNomorIMBKembali').val(JaminanDokument.no_imb); 
     $('#sertNomorSPPTKembali').val(JaminanDokument.no_sppt);
     $('#sertTahunSPPTKembali').val(JaminanDokument.sppt_tahun);
     $('#sertNoSHTKembali').val(JaminanDokument.no_sht);
     $('#sertPropinsiSHTKembali').val(JaminanDokument.sht_propinsi);
     $('#sertKotaSHTKembali').val(JaminanDokument.sht_kota);
     $('#sertTahunSTTSKembali').val(JaminanDokument.stts_tahun);
     $('#sertAtasNamaSSBBPHTBKembali').val(JaminanDokument.ssb_atas_nama);
     $('#sertLainnyaKembali').val(JaminanDokument.lain_lain);
 
     /// check box sertifikat
     if(JaminanDokument.ajb == 'Y'){
         $("#check_ajbKembali").prop("checked", true);
     }
     else{
         $("#check_ajbKembali").prop("checked", false);
     }
     if(JaminanDokument.imb == 'Y'){
         $("#check_imbKembali").prop("checked", true);
     }
     else{
         $("#check_imbKembali").prop("checked", false);
     }
     if(JaminanDokument.sppt == 'Y'){
         $("#check_spptKembali").prop("checked", true);
     }
     else{
         $("#check_spptKembali").prop("checked", false);
     }
     if(JaminanDokument.skmht == 'Y'){
         $("#check_skmhtKembali").prop("checked", true);
     }
     else{
         $("#check_skmhtKembali").prop("checked", false);
     }
     if(JaminanDokument.gambar_denah == 'Y'){
         $("#check_denahKembali").prop("checked", true);
     }
     else{
         $("#check_denahKembali").prop("checked", false);
     }
     if(JaminanDokument.surat_roya == 'Y'){
         $("#check_royaKembali").prop("checked", true);
     }
     else{
         $("#check_royaKembali").prop("checked", false);
     }
     if(JaminanDokument.sht == 'Y'){
         $("#check_shtKembali").prop("checked", true);
     }
     else{
         $("#check_shtKembali").prop("checked", false);
     }
     if(JaminanDokument.stts == 'Y'){
         $("#check_sttsKembali").prop("checked", true);
     }
     else{
         $("#check_sttsKembali").prop("checked", false);
     }
     if(JaminanDokument.ssb == 'Y'){
         $("#check_ssb_bphtKembali").prop("checked", true);
     }
     else{
         $("#check_ssb_bphtKembali").prop("checked", false);
     }
}
function mappingFieldBPKBKembali(JaminanHeader, JaminanDokument){
    $('#main_tab_sertKembali').hide(); 
    $('#main_tab_emasKembali').hide();
    $('#main_tab_bpkbKembali').show();

       //bpkb
       $('#bpkbKodeJenisAgunanKembali').find('option').remove().end();
       $('#bpkbKodeIkatanAgunanKembali').find('option').remove().end();
       $('#bpkbKantorLokasiKembali').find('option').remove().end();
       $('#bpkbMerkKembali').find('option').remove().end();
       $('#bpkbTypeKembali').find('option').remove().end();
       $('#bpkbJenisKembali').find('option').remove().end();
  
       
       // remove asli dok bpkb
       $('#bpkbDokKwitansiBlankoKembali').find('option').remove().end();
       $('#bpkbDokFakturPemilikKembali').find('option').remove().end();
       $('#bpkbDokKwJualBeliKembali').find('option').remove().end();
       $('#bpkbDokSKTrayekKembali').find('option').remove().end();
  
      ///untuk bpkb
      $('#bpkbVerifikasiKembali').val(JaminanDokument.verifikasi);
      $('#bpkbTglRegisterKembali').val(JaminanDokument.tgl_register);
      //bpkbTglPenilaian tgl penilaian dari SID belum di develop
      $('#bpkbKantorLokasiKembali').append('<option value="' + JaminanDokument.kode_kantor_lokasi_jaminan + '" selected>'+ JaminanDokument.app_kode_kantor + ' - ' + JaminanDokument.app_nama_kantor +'</option>'); 
      $('#bpkbKodeJenisAgunanKembali').append('<option value="' + JaminanDokument.jenis_agunan_detail + '" selected>' + JaminanDokument.KKJA_jenis_agunan +'</option>'); 
      $('#bpkbKodeIkatanAgunanKembali').append('<option value="' + JaminanDokument.ikatan_agunan_detail + '" data-persen="'+ JaminanDokument.ikatan_persen_default +'" selected>' + JaminanDokument.ikatan_agunan +'</option>')
      $('#bpkbVerifikasiKembali').append('<option value="' + JaminanDokument.verifikasi + '" selected>' + JaminanDokument.verifikasi +'</option>'); 
      $('#bpkbNilaiTaksasiAgunanKembali').val(JaminanDokument.nilai_taksasi_detail);
      $('#bpkbNJOPKembali').val(JaminanDokument.nilai_njop_detail);
      $('#bpkbHargaPasarKembali').val(JaminanDokument.nilai_pasar_detail);
      $('#bpkbAPHTKembali').val(JaminanDokument.nilai_apht_detail);
      $('#bpkbPersenDijaminKembali').val(JaminanDokument.persen_dijaminkan_detail);
      //Data BPKB
      $('#bpkbAgunanIDKembali').val(JaminanDokument.agunan_id);  
      $('#bpkbNoBPKBKembali').val(JaminanDokument.nomor_bpkb);    
      $('#bpkbNamaPemilikKembali').val(JaminanDokument.nama_bpkb);   
      $('#bpkbAlamatPemlikKembali').val(JaminanDokument.alamat_bpkb);    
      $('#bpkbKotaPemilikKembali').val(JaminanDokument.kota_bpkb);  
      $('#bpkbSilinderKembali').val(JaminanDokument.silinder); 
      $('#bpkbNoRangkaKembali').val(JaminanDokument.no_rangka);  
      $('#bpkbNoMesinKembali').val(JaminanDokument.no_mesin);
      $('#bpkbTahunKembali').val(JaminanDokument.tahun);
      $('#bpkbTglExpPajakKembali').val(JaminanDokument.tgl_expired_pajak); 
      $('#bpkbWarnaKembali').val(JaminanDokument.warna);     
      $('#bpkbNoPolisiKembali').val(JaminanDokument.no_polisi);  
      $('#bpkbTglExpSTNKKembali').val(JaminanDokument.tgl_expired_stnk); 
      $('#bpkbNoSTNKKembali').val(JaminanDokument.no_stnk); 
      $('#bpkbIDKembali').val(JaminanDokument.id); 
      $('#bpkbNoReffKembali').val(JaminanDokument.no_reff); 
      
      
      $('#bpkbMerkKembali').append('<option value="'+JaminanDokument.kd_merk+'" selected>'+ JaminanDokument.nama_merk+'</option>');
      $('#bpkbTypeKembali').append('<option value="'+JaminanDokument.kd_type+'" selected>'+ JaminanDokument.nama_type+'</option>');
      $('#bpkbJenisKembali').append('<option value="'+JaminanDokument.kd_jenis+'"selected>'+ JaminanDokument.nama_jenis+'</option>');
      
      // Data Lampiran
      $('#bpkbNoFakturPemilikKembali').val(JaminanDokument.no_faktur);  
      $('#noSKTrayekKembali').val(JaminanDokument.no_sk_trayek);  
      $('#bpkbBerlakuSDKembali').val(JaminanDokument.tgl_expired_sk_trayek);     
      $('#bpkbLainnyaKembali').val(JaminanDokument.lain_lain);

        $('#rowBPKBAgunanIDKembali').html(JaminanDokument.agunan_id);
        $('#rowBPKBNoBpkbKembali').html(JaminanDokument.nomor_bpkb);
        $('#rowBPKBNamaPemilikKembali').html(JaminanDokument.nama_bpkb);
        $('#rowBPKBAlamatKembali').html(JaminanDokument.alamat_bpkb);
        $('#rowBPKBNoPolisiKembali').html(JaminanDokument.no_polisi);
        $('#rowBPKBVerifKembali').html(JaminanDokument.verifikasi);
      
      if(JaminanDokument.asli_blanko == 1){
          $('#bpkbDokKwitansiBlankoKembali').append('<option value="1" selected>ASLI</option>');
      }else{
          $('#bpkbDokKwitansiBlankoKembali').append('<option value="2" selected>COPY</option>');
      }
      if(JaminanDokument.asli_faktur_pemilik == 1){
          $('#bpkbDokFakturPemilikKembali').append('<option value="1" selected>ASLI</option>');
      }else{
          $('#bpkbDokFakturPemilikKembali').append('<option value="2" selected>COPY</option>');
      }
      if(JaminanDokument.asli_kwitansi_jb == 1){
          $('#bpkbDokKwJualBeliKembali').append('<option value="1" selected>ASLI</option>');
      }else{
          $('#bpkbDokKwJualBeliKembali').append('<option value="2" selected>COPY</option>');
      }
      if(JaminanDokument.asli_sk_trayek == 1){
          $('#bpkbDokSKTrayekKembali').append('<option value="1" selected>ASLI</option>');
      }else{
          $('#bpkbDokSKTrayekKembali').append('<option value="2" selected>COPY</option>');
      }
      /// check box bpkb
      if(JaminanDokument.blanko == 'Y'){
          $("#check_kw_blankoKembali").prop("checked", true);
      }
      else{
          $("#check_kw_blankoKembali").prop("checked", false);
      }
      if(JaminanDokument.faktur_pemilik == 'Y'){
          $("#check_faktur_pemilikKembali").prop("checked", true);
      }
      else{
          $("#check_faktur_pemilikKembali").prop("checked", false);
      }
      if(JaminanDokument.kwitansi_jb == 'Y'){
          $("#check_kw_jual_beliKembali").prop("checked", true);
      }
      else{
          $("#check_kw_jual_beliKembali").prop("checked", false);
      }
      if(JaminanDokument.sk_trayek == 'Y'){
          $("#check_sk_trayekKembali").prop("checked", true);
      }
      else{
          $("#check_sk_trayekKembali").prop("checked", false);
      }
      
}
function mappingFieldEmasKembali(JaminanHeader, JaminanDokument){
    $('#main_tab_sertKembali').hide(); 
    $('#main_tab_bpkbKembali').hide();
    $('#main_tab_emasKembali').show();

     //remove jenis emas
     $('#emasJenisEmasKembali').find('option').remove().end();
    
     $('#emasVerifikasiKembali').append('<option value="' + JaminanDokument.verifikasi + '" selected>' + JaminanDokument.verifikasi +'</option>'); 
     $('#emasAgunanIDKembali').val(JaminanDokument.agunan_id); 
     $('#emasNoSeriKembali').val(JaminanDokument.no_seri); 
     $('#emasJenisEmasKembali').append('<option value="' + JaminanDokument.jenis_emas + '" selected>'+ JaminanDokument.jenis_emas + '</option>');
     $('#emasKaratKembali').val(JaminanDokument.karat); 
     $('#emasBeratKembali').val(JaminanDokument.berat); 
     $('#emasHargaPasarKembali').val(JaminanDokument.harga_pasar); 
     $('#emasHargaTaksasiKembali').val(JaminanDokument.harga_taksasi); 
     $('#emasIDKembali').val(JaminanDokument.id); 
     $('#emasNoReffKembali').val(JaminanDokument.no_reff); 
     $('#emasVerifikasiKembali').val(JaminanDokument.verifikasi);

     $('#rowEmasAgunanIDKembali').html(JaminanDokument.agunan_id);
    $('#rowEmasNoSeriKembali').html(JaminanDokument.no_seri); 
    $('#rowEmasJenisKembali').html(JaminanDokument.jenis_emas); 
    $('#rowEmasKaratKembali').html(JaminanDokument.karat); 
    $('#rowEmasGramKembali').html(JaminanDokument.berat); 
    $('#rowEmasHargaPasarKembali').html(JaminanDokument.harga_pasar);
    $('#rowEmasVerifKembali').html(JaminanDokument.verifikasi);
}

function mappingFieldSertifikatPenyerahan(JaminanHeader, JaminanDokument){
   
    $('#main_tab_bpkbPenyerahan').hide(); 
    $('#main_tab_emasPenyerahan').hide(); 
    $('#main_tab_sertPenyerahan').show();

    //sert
    $('#sertKantorLokasiPenyerahan').find('option').remove().end();
    $('#sertKodeJenisAgunanPenyerahan').find('option').remove().end();
    $('#sertJenisSertifikatPenyerahan').find('option').remove().end();
   // $('#sertVerifikasi').find('option').remove().end();
    // remove asli dok sert
    $('#sertDokAJBPenyerahan').find('option').remove().end();
    $('#sertDokIMBPenyerahan').find('option').remove().end();
    $('#sertDokSPPTPenyerahan').find('option').remove().end();
    $('#sertDokSKHMTPenyerahan').find('option').remove().end();
    $('#sertDokDenahPenyerahan').find('option').remove().end();
    $('#sertDokRoyaPenyerahan').find('option').remove().end();
    $('#sertDokSHTPenyerahan').find('option').remove().end();
    $('#sertDokSTTSPenyerahan').find('option').remove().end();
    $('#sertDokSSBPenyerahan').find('option').remove().end();
    //$('#sertVerifikasiPenyerahan').append(jenis_verifikasi_list);



    // sertifikat 
    $('#sertTglRegisterPenyerahan').val(JaminanDokument.tgl_register);
    // sertTglPenilaian ini di SID belum di bikin
    $('#sertKantorLokasiPenyerahan').append('<option value="' + JaminanDokument.kode_kantor_lokasi_jaminan + '" selected>'+ JaminanDokument.app_kode_kantor + ' - ' + JaminanDokument.app_nama_kantor +'</option>'); 
    $('#sertKodeJenisAgunanPenyerahan').append('<option value="' + JaminanDokument.jenis_agunan_detail + '" selected>' + JaminanDokument.KKJA_jenis_agunan +'</option>'); 
    $('#sertKodeIkatanAgunanPenyerahan').append('<option value="' + JaminanDokument.ikatan_agunan_detail + '" data-persen="'+ JaminanDokument.ikatan_persen_default +'" selected>' + JaminanDokument.ikatan_agunan +'</option>');
    $('#sertVerifikasiPenyerahan').append('<option value="' + JaminanDokument.verifikasi + '" selected>' + JaminanDokument.verifikasi +'</option>'); 
    $('#sertNilaiTaksasiAgunanPenyerahan').val(JaminanDokument.nilai_taksasi_detail); 
    $('#sertNJOPPenyerahan').val(JaminanDokument.nilai_njop_detail); 
    $('#sertHargaPasarPenyerahan').val(JaminanDokument.nilai_pasar_detail); 
    $('#sertAPHTPenyerahan').val(JaminanDokument.nilai_apht_detail); 
    $('#sertPersenDijaminPenyerahan').val(JaminanDokument.ikatan_persen_default);
    $('#sertAgunanIDPenyerahan').val(JaminanDokument.agunan_id); 
    $('#sertIDPenyerahan').val(JaminanDokument.id);
    if(JaminanDokument.no_shm != ''){
        $('#sertNoSertPenyerahan').val(JaminanDokument.no_shm); 
        $('#sertJenisSertifikatPenyerahan').append('<option value="SHM" selected>SHM</option>');
        $('#rowSertNoSertifPenyerahan').html(JaminanDokument.no_shm);
        $('#rowSertJenisPenyerahan').html('SHM');
    } else if(JaminanDokument.no_shgb != ''){
        $('#sertNoSertPenyerahan').val(JaminanDokument.no_shgb); 
        $('#sertJenisSertifikatPenyerahan').append('<option value="SHGB" selected>SHGB</option>');
        $('#rowSertNoSertifPenyerahan').html(JaminanDokument.no_shgb);
        $('#rowSertJenisPenyerahan').html('SHGB');
    } else if(JaminanDokument.no_ajb != ''){
        $('#sertNoSertPenyerahan').val(JaminanDokument.no_ajb); 
        $('#sertJenisSertifikatPenyerahan').append('<option value="AJB" selected>AJB</option>');
        $('#rowSertNoSertifPenyerahan').html(JaminanDokument.no_ajb);
        $('#rowSertJenisPenyerahan').html('AJB');
    }
    $('#sertKOHIRPenyerahan').val(JaminanDokument.no_kohir); 
    $('#sertNoPERSILPenyerahan').val(JaminanDokument.no_persil);  
    $('#sertTanggalSertifikatPenyerahan').val(JaminanDokument.tgl_sertifikat); 
    $('#sertJTSHGBPenyerahan').val(JaminanDokument.tgl_jt_shgb); 
    $('#sertNoSuratUkurPenyerahan').val(JaminanDokument.no_surat_ukur); 
    $('#sertPLBangunanPenyerahan').val(JaminanDokument.pl_bangunan); 
    $('#sertLuasTanahPenyerahan').val(JaminanDokument.luas_tanah); 
    $('#sertNamaPPATPenyerahan').val(JaminanDokument.nama_ppat);  
    $('#sertNamaPemilikPenyerahan').val(JaminanDokument.nama_pemilik_sertifikat); 
    $('#sertAlamatSertifikatPenyerahan').val(JaminanDokument.alamat_sertifikat);
    $('#sertKelurahanPenyerahan').val(JaminanDokument.kelurahan_sertifikat);
    $('#sertKecamatanPenyerahan').val(JaminanDokument.kecamatan_sertifikat);
    $('#sertKotaPenyerahan').val(JaminanDokument.kota_sertifikat);
    $('#sertPorpinsiPenyerahan').val(JaminanDokument.propinsi_sertifikat);
    $('#sertBatasTanahPenyerahan').val(JaminanDokument.batas_tanah);

    $('#rowSertAgunanIDPenyerahan').html(JaminanDokument.agunan_id);
    $('#rowSertTanggalPenyerahan').html(JaminanDokument.tgl_sertifikat);
    $('#rowSertLuasTanahPenyerahan').html(JaminanDokument.luas_tanah);
    $('#rowSertPemilikPenyerahan').html(JaminanDokument.nama_pemilik_sertifikat);
    $('#rowSertVerifPenyerahan').html(JaminanDokument.verifikasi);   
    $('#sertVerifikasiPenyerahan').val(JaminanDokument.verifikasi); 

    // DATA LAMPIRAN  
    if(JaminanDokument.asli_ajb == 1){
        $('#sertDokAJBPenyerahan').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokAJBPenyerahan').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_imb == 1){
        $('#sertDokIMBPenyerahan').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokIMBPenyerahan').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_sppt == 1){
        $('#sertDokSPPTPenyerahan').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokSPPTPenyerahan').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_skmht == 1){
        $('#sertDokSKHMTPenyerahan').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokSKHMTPenyerahan').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_gambar_denah == 1){
        $('#sertDokDenahPenyerahan').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokDenahPenyerahan').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_surat_roya == 1){
        $('#sertDokRoyaPenyerahan').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokRoyaPenyerahan').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_sht == 1){
        $('#sertDokSHTPenyerahan').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokSHTPenyerahan').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_stts == 1){
        $('#sertDokSTTSPenyerahan').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokSTTSPenyerahan').append('<option value="2" selected>COPY</option>');
    }
    if(JaminanDokument.asli_ssb == 1){
        $('#sertDokSSBPenyerahan').append('<option value="1" selected>ASLI</option>');
    }else{
        $('#sertDokSSBPenyerahan').append('<option value="2" selected>COPY</option>');
    }
    $('#sertNomorAJBPenyerahan').val(JaminanDokument.no_ajb);  
    $('#sertTanggalAJBPenyerahan').val(JaminanDokument.tgl_ajb);  
    $('#sertNomorIMBPenyerahan').val(JaminanDokument.no_imb); 
    $('#sertNomorSPPTPenyerahan').val(JaminanDokument.no_sppt);
    $('#sertTahunSPPTPenyerahan').val(JaminanDokument.sppt_tahun);
    $('#sertNoSHTPenyerahan').val(JaminanDokument.no_sht);
    $('#sertPropinsiSHTPenyerahan').val(JaminanDokument.sht_propinsi);
    $('#sertKotaSHTPenyerahan').val(JaminanDokument.sht_kota);
    $('#sertTahunSTTSPenyerahan').val(JaminanDokument.stts_tahun);
    $('#sertAtasNamaSSBBPHTBPenyerahan').val(JaminanDokument.ssb_atas_nama);
    $('#sertLainnyaPenyerahan').val(JaminanDokument.lain_lain);

    /// check box sertifikat
    if(JaminanDokument.ajb == 'Y'){
        $("#check_ajbPenyerahan").prop("checked", true);
    }
    else{
        $("#check_ajbPenyerahan").prop("checked", false);
    }
    if(JaminanDokument.imb == 'Y'){
        $("#check_imbPenyerahan").prop("checked", true);
    }
    else{
        $("#check_imbPenyerahan").prop("checked", false);
    }
    if(JaminanDokument.sppt == 'Y'){
        $("#check_spptPenyerahan").prop("checked", true);
    }
    else{
        $("#check_spptPenyerahan").prop("checked", false);
    }
    if(JaminanDokument.skmht == 'Y'){
        $("#check_skmhtPenyerahan").prop("checked", true);
    }
    else{
        $("#check_skmhtPenyerahan").prop("checked", false);
    }
    if(JaminanDokument.gambar_denah == 'Y'){
        $("#check_denahPenyerahan").prop("checked", true);
    }
    else{
        $("#check_denahPenyerahan").prop("checked", false);
    }
    if(JaminanDokument.surat_roya == 'Y'){
        $("#check_royaPenyerahan").prop("checked", true);
    }
    else{
        $("#check_royaPenyerahan").prop("checked", false);
    }
    if(JaminanDokument.sht == 'Y'){
        $("#check_shtPenyerahan").prop("checked", true);
    }
    else{
        $("#check_shtPenyerahan").prop("checked", false);
    }
    if(JaminanDokument.stts == 'Y'){
        $("#check_sttsPenyerahan").prop("checked", true);
    }
    else{
        $("#check_sttsPenyerahan").prop("checked", false);
    }
    if(JaminanDokument.ssb == 'Y'){
        $("#check_ssb_bphtPenyerahan").prop("checked", true);
    }
    else{
        $("#check_ssb_bphtPenyerahan").prop("checked", false);
    }
}
function mappingFieldBPKBPenyerahan(JaminanHeader, JaminanDokument){
    $('#main_tab_sertPenyerahan').hide(); 
    $('#main_tab_emasPenyerahan').hide();
    $('#main_tab_bpkbPenyerahan').show();

      //bpkb
      $('#bpkbKodeJenisAgunanPenyerahan').find('option').remove().end();
      $('#bpkbKodeIkatanAgunanPenyerahan').find('option').remove().end();
      $('#bpkbKantorLokasiPenyerahan').find('option').remove().end();
      $('#bpkbMerkPenyerahan').find('option').remove().end();
      $('#bpkbTypePenyerahan').find('option').remove().end();
      $('#bpkbJenisPenyerahan').find('option').remove().end();
 
      
      // remove asli dok bpkb
      $('#bpkbDokKwitansiBlankoPenyerahan').find('option').remove().end();
      $('#bpkbDokFakturPemilikPenyerahan').find('option').remove().end();
      $('#bpkbDokKwJualBeliPenyerahan').find('option').remove().end();
      $('#bpkbDokSKTrayekPenyerahan').find('option').remove().end();
 
     ///untuk bpkb
     $('#bpkbVerifikasiPenyerahan').val(JaminanDokument.verifikasi);
     $('#bpkbTglRegisterPenyerahan').val(JaminanDokument.tgl_register);
     //bpkbTglPenilaian tgl penilaian dari SID belum di develop
     $('#bpkbKantorLokasiPenyerahan').append('<option value="' + JaminanDokument.kode_kantor_lokasi_jaminan + '" selected>'+ JaminanDokument.app_kode_kantor + ' - ' + JaminanDokument.app_nama_kantor +'</option>'); 
     $('#bpkbKodeJenisAgunanPenyerahan').append('<option value="' + JaminanDokument.jenis_agunan_detail + '" selected>' + JaminanDokument.KKJA_jenis_agunan +'</option>'); 
     $('#bpkbKodeIkatanAgunanPenyerahan').append('<option value="' + JaminanDokument.ikatan_agunan_detail + '" data-persen="'+ JaminanDokument.ikatan_persen_default +'" selected>' + JaminanDokument.ikatan_agunan +'</option>')
     $('#bpkbVerifikasiPenyerahan').append('<option value="' + JaminanDokument.verifikasi + '" selected>' + JaminanDokument.verifikasi +'</option>'); 
     $('#bpkbNilaiTaksasiAgunanPenyerahan').val(JaminanDokument.nilai_taksasi_detail);
     $('#bpkbNJOPPenyerahan').val(JaminanDokument.nilai_njop_detail);
     $('#bpkbHargaPasarPenyerahan').val(JaminanDokument.nilai_pasar_detail);
     $('#bpkbAPHTPenyerahan').val(JaminanDokument.nilai_apht_detail);
     $('#bpkbPersenDijaminPenyerahan').val(JaminanDokument.persen_dijaminkan_detail);
     //Data BPKB
     $('#bpkbAgunanIDPenyerahan').val(JaminanDokument.agunan_id);  
     $('#bpkbNoBPKBPenyerahan').val(JaminanDokument.nomor_bpkb);    
     $('#bpkbNamaPemilikPenyerahan').val(JaminanDokument.nama_bpkb);   
     $('#bpkbAlamatPemlikPenyerahan').val(JaminanDokument.alamat_bpkb);    
     $('#bpkbKotaPemilikPenyerahan').val(JaminanDokument.kota_bpkb);  
     $('#bpkbSilinderPenyerahan').val(JaminanDokument.silinder); 
     $('#bpkbNoRangkaPenyerahan').val(JaminanDokument.no_rangka);  
     $('#bpkbNoMesinPenyerahan').val(JaminanDokument.no_mesin);
     $('#bpkbTahunPenyerahan').val(JaminanDokument.tahun);
     $('#bpkbTglExpPajakPenyerahan').val(JaminanDokument.tgl_expired_pajak); 
     $('#bpkbWarnaPenyerahan').val(JaminanDokument.warna);     
     $('#bpkbNoPolisiPenyerahan').val(JaminanDokument.no_polisi);  
     $('#bpkbTglExpSTNKPenyerahan').val(JaminanDokument.tgl_expired_stnk); 
     $('#bpkbNoSTNKPenyerahan').val(JaminanDokument.no_stnk); 
     $('#bpkbIDPenyerahan').val(JaminanDokument.id); 
     $('#bpkbNoReffPenyerahan').val(JaminanDokument.no_reff); 
     
     
     $('#bpkbMerkPenyerahan').append('<option value="'+JaminanDokument.kd_merk+'" selected>'+ JaminanDokument.nama_merk+'</option>');
     $('#bpkbTypePenyerahan').append('<option value="'+JaminanDokument.kd_type+'" selected>'+ JaminanDokument.nama_type+'</option>');
     $('#bpkbJenisPenyerahan').append('<option value="'+JaminanDokument.kd_jenis+'"selected>'+ JaminanDokument.nama_jenis+'</option>');
     
     // Data Lampiran
     $('#bpkbNoFakturPemilikPenyerahan').val(JaminanDokument.no_faktur);  
     $('#noSKTrayekPenyerahan').val(JaminanDokument.no_sk_trayek);  
     $('#bpkbBerlakuSDPenyerahan').val(JaminanDokument.tgl_expired_sk_trayek);     
     $('#bpkbLainnyaPenyerahan').val(JaminanDokument.lain_lain);

    $('#rowBPKBAgunanIDPenyerahan').html(JaminanDokument.agunan_id);
    $('#rowBPKBNoBpkbPenyerahan').html(JaminanDokument.nomor_bpkb);
    $('#rowBPKBNamaPemilikPenyerahan').html(JaminanDokument.nama_bpkb);
    $('#rowBPKBAlamatPenyerahan').html(JaminanDokument.alamat_bpkb);
    $('#rowBPKBNoPolisiPenyerahan').html(JaminanDokument.no_polisi);
    $('#rowBPKBVerifPenyerahan').html(JaminanDokument.verifikasi);
     
     if(JaminanDokument.asli_blanko == 1){
         $('#bpkbDokKwitansiBlankoPenyerahan').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#bpkbDokKwitansiBlankoPenyerahan').append('<option value="2" selected>COPY</option>');
     }
     if(JaminanDokument.asli_faktur_pemilik == 1){
         $('#bpkbDokFakturPemilikPenyerahan').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#bpkbDokFakturPemilikPenyerahan').append('<option value="2" selected>COPY</option>');
     }
     if(JaminanDokument.asli_kwitansi_jb == 1){
         $('#bpkbDokKwJualBeliPenyerahan').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#bpkbDokKwJualBeliPenyerahan').append('<option value="2" selected>COPY</option>');
     }
     if(JaminanDokument.asli_sk_trayek == 1){
         $('#bpkbDokSKTrayekPenyerahan').append('<option value="1" selected>ASLI</option>');
     }else{
         $('#bpkbDokSKTrayekPenyerahan').append('<option value="2" selected>COPY</option>');
     }
     /// check box bpkb
     if(JaminanDokument.blanko == 'Y'){
         $("#check_kw_blankoPenyerahan").prop("checked", true);
     }
     else{
         $("#check_kw_blankoPenyerahan").prop("checked", false);
     }
     if(JaminanDokument.faktur_pemilik == 'Y'){
         $("#check_faktur_pemilikPenyerahan").prop("checked", true);
     }
     else{
         $("#check_faktur_pemilikPenyerahan").prop("checked", false);
     }
     if(JaminanDokument.kwitansi_jb == 'Y'){
         $("#check_kw_jual_beliPenyerahan").prop("checked", true);
     }
     else{
         $("#check_kw_jual_beliPenyerahan").prop("checked", false);
     }
     if(JaminanDokument.sk_trayek == 'Y'){
         $("#check_sk_trayekPenyerahan").prop("checked", true);
     }
     else{
         $("#check_sk_trayekPenyerahan").prop("checked", false);
     }
}
function mappingFieldEmasPenyerahan(JaminanHeader, JaminanDokument){
    $('#main_tab_sertPenyerahan').hide(); 
    $('#main_tab_bpkbPenyerahan').hide();
    $('#main_tab_emasPenyerahan').show();

     //remove jenis emas
     $('#emasJenisEmasPenyerahan').find('option').remove().end();
    
     $('#emasVerifikasiPenyerahan').append('<option value="' + JaminanDokument.verifikasi + '" selected>' + JaminanDokument.verifikasi +'</option>'); 
     $('#emasAgunanIDPenyerahan').val(JaminanDokument.agunan_id); 
     $('#emasNoSeriPenyerahan').val(JaminanDokument.no_seri); 
     $('#emasJenisEmasPenyerahan').append('<option value="' + JaminanDokument.jenis_emas + '" selected>'+ JaminanDokument.jenis_emas + '</option>');
     $('#emasKaratPenyerahan').val(JaminanDokument.karat); 
     $('#emasBeratPenyerahan').val(JaminanDokument.berat); 
     $('#emasHargaPasarPenyerahan').val(JaminanDokument.harga_pasar); 
     $('#emasHargaTaksasiPenyerahan').val(JaminanDokument.harga_taksasi); 
     $('#emasIDPenyerahan').val(JaminanDokument.id); 
     $('#emasNoReffPenyerahan').val(JaminanDokument.no_reff); 
     $('#emasVerifikasiPenyerahan').val(JaminanDokument.verifikasi);

    $('#rowEmasAgunanIDPenyerahan').html(JaminanDokument.agunan_id);
    $('#rowEmasNoSeriPenyerahan').html(JaminanDokument.no_seri); 
    $('#rowEmasJenisPenyerahan').html(JaminanDokument.jenis_emas); 
    $('#rowEmasKaratPenyerahan').html(JaminanDokument.karat); 
    $('#rowEmasGramPenyerahan').html(JaminanDokument.berat); 
    $('#rowEmasHargaPasarPenyerahan').html(JaminanDokument.harga_pasar);
    $('#rowEmasVerifPenyerahan').html(JaminanDokument.verifikasi);
}

function updateSertifikat(){

    checkSertifikat();
    $('#loading1').show();
    $('#loading').show();
    $.ajax({
        url : base_url + "index.php/AsetDokumenUpdateController/updateDataSertifikat",
        type : "POST",
        dataType : "json",
        data :  {"mainId"               : $('#mainId').val(),
                "mainNomor"             : $('#mainNomor').val(),
                "mainNoReff"            : $('#mainNoReff').val(),
                "mainAreaKerja"         : $('#mainAreaKerja').val(),
                "mainTanggal"           : $('#mainTanggal').val(),
                "mainTransaksi"         : $('#mainTransaksi').val(),
                "mainNama"              : $('#mainNama').val(),
                "mainKeterangan"        : $('#mainKeterangan').val(),
                "mainAlamat"            : $('#mainAlamat').val(),
                "mainKota"              : $('#mainKota').val(),
                "mainJenisPengurusan"   : $('#mainJenisPengurusan').val(),
                "mainNomorRekening"     : $('#mainNomorRekening').val(),
                "mainTanggalRealisasi"  : $('#mainTanggalRealisasi').val(),
                "sertTglRegister"       : $('#sertTglRegister').val(),
                "sertTglPenilaian"       : $('#sertTglPenilaian').val(),
                "sertKantorLokasi"       : $('#sertKantorLokasi').val(),
                "sertKodeJenisAgunan"    : $('#sertKodeJenisAgunan').val(),
                "sertKodeIkatanAgunan"   : $('#sertKodeIkatanAgunan').val(),
                "sertNilaiTaksasiAgunan" : $('#sertNilaiTaksasiAgunan').val(),
                "sertNJOP"               : $('#sertNJOP').val(),
                "sertHargaPasar"         : $('#sertHargaPasar').val(),
                "sertAPHT"               : $('#sertAPHT').val(),
                "sertPersenDijamin"      : $('#sertPersenDijamin').val(),
                "sertAgunanID"           : $('#sertAgunanID').val(),
                "sertID"                 : $('#sertID').val(),
                "sertNoSert"             : $('#sertNoSert').val(),
                "sertKOHIR"              : $('#sertKOHIR').val(),
                "sertJenisSertifikat"    : $('#sertJenisSertifikat').val(),
                "sertNoPERSIL"           : $('#sertNoPERSIL').val(),
                "sertTanggalSertifikat"  : $('#sertTanggalSertifikat').val(),
                "sertJTSHGB"             : $('#sertJTSHGB').val(),
                "sertNoSuratUkur"        : $('#sertNoSuratUkur').val(),
                "sertPLBangunan"         : $('#sertPLBangunan').val(),
                "sertLuasTanah"          : $('#sertLuasTanah').val(),
                "sertNamaPPAT"           : $('#sertNamaPPAT').val(),
                "sertNamaPemilik"        : $('#sertNamaPemilik').val(),
                "sertAlamatSertifikat"   : $('#sertAlamatSertifikat').val(),
                "sertKelurahan"          : $('#sertKelurahan').val(),
                "sertKecamatan"          : $('#sertKecamatan').val(),
                "sertKota"               : $('#sertKota').val(),
                "sertPorpinsi"           : $('#sertPorpinsi').val(),
                "sertBatasTanah"         : $('#sertBatasTanah').val(),
                "sertDokAJB"             : $('#sertDokAJB').val(), 
                "sertDokIMB"             : $('#sertDokIMB').val(),
                "sertDokSPPT"            : $('#sertDokSPPT').val(),
                "sertDokSKHMT"           : $('#sertDokSKHMT').val(),
                "sertDokDenah"           : $('#sertDokDenah').val(),
                "sertDokRoya"            : $('#sertDokRoya').val(),
                "sertDokSHT"             : $('#sertDokSHT').val(),
                "sertDokSTTS"            : $('#sertDokSTTS').val(),
                "sertDokSSB"             : $('#sertDokSSB').val(),
                "sertNomorAJB"           : $('#sertNomorAJB').val(),
                "sertTanggalAJB"         : $('#sertTanggalAJB').val(),
                "sertNomorIMB"           : $('#sertNomorIMB').val(),    
                "sertNomorSPPT"          : $('#sertNomorSPPT').val(),
                "sertTahunSPPT"          : $('#sertTahunSPPT').val(),
                "sertNoSHT"              : $('#sertNoSHT').val(),
                "sertPropinsiSHT"        : $('#sertPropinsiSHT').val(),
                "sertKotaSHT"            : $('#sertKotaSHT').val(),
                "sertTahunSTTS"          : $('#sertTahunSTTS').val(),
                "sertAtasNamaSSBBPHTB"   : $('#sertAtasNamaSSBBPHTB').val(),
                "sertLainnya"            : $('#sertLainnya').val(),
                "check_ajb"              : sert_ajb_check,
                "check_imb"              : sert_imb_check,
                "check_sppt"             : sert_sppt_check,
                "check_skmht"            : sert_skmht_check,
                "check_denah"            : sert_denah_check,
                "check_roya"             : sert_roya_check,
                "check_sht"              : sert_sht_check,
                "check_stts"             : sert_stts_check,
                "check_ssb_bpht"         : sert_ssb_check
            },

        success : function(response) {
            console.log('harusnya bisa');
            console.log(response);
            alert('Data Sukses Di Update');
            if( menuAsset == '1'){
                window.location = base_url + 'index.php/AsetDokumenEntryController/index';
            }else if( menuAsset == '2'){
                window.location = base_url + 'index.php/AsetDokumenViewAsetController/index';
            }
        },
        error : function(response) {
            console.log('failed');
            alert('Data Gagal Update Data');
            $('#loading1').hide();
            if( menuAsset == '1'){
                window.location = base_url + 'index.php/AsetDokumenEntryController/index';
            }else if( menuAsset == '2'){
                window.location = base_url + 'index.php/AsetDokumenViewAsetController/index';
            }
        }
    });    
}
function updateBPKB(){
    $('#loading1').show();
    $('#loading').show();
    checkBPKB();
    
    $.ajax({
        url : base_url + "index.php/AsetDokumenUpdateController/updateBPKB",
        type : "POST",
        dataType : "json",
        data : {"mainId"                : $('#mainId').val(),
                "mainNomor"             : $('#mainNomor').val(),
                "mainNoReff"            : $('#mainNoReff').val(),
                "mainAreaKerja"         : $('#mainAreaKerja').val(),
                "mainTanggal"           : $('#mainTanggal').val(),
                "mainTransaksi"         : $('#mainTransaksi').val(),
                "mainNama"              : $('#mainNama').val(),
                "mainKeterangan"        : $('#mainKeterangan').val(),
                "mainAlamat"            : $('#mainAlamat').val(),
                "mainKota"              : $('#mainKota').val(),
                "mainJenisPengurusan"   : $('#mainJenisPengurusan').val(),
                "mainNomorRekening"     : $('#mainNomorRekening').val(),
                "mainTanggalRealisasi"  : $('#mainTanggalRealisasi').val(),
                "bpkbTglRegister"             : $('#bpkbTglRegister').val(),
                "bpkbTglPenilaian"            : $('bpkbTglPenilaian').val(),
                "bpkbKantorLokasi"            : $('#bpkbKantorLokasi').val(),
                "bpkbKodeJenisAgunan"         : $('#bpkbKodeJenisAgunan').val(),
                "bpkbKodeIkatanAgunan"        : $('#bpkbKodeIkatanAgunan').val(),
                "bpkbNilaiTaksasiAgunan"      : $('#bpkbNilaiTaksasiAgunan').val(),
                "bpkbNJOP"                    : $('#bpkbNJOP').val(),
                "bpkbHargaPasar"              : $('#bpkbHargaPasar').val(),
                "bpkbAPHT"                    : $('#bpkbAPHT').val(),
                "bpkbPersenDijamin"           : $('#bpkbPersenDijamin').val(),
                "bpkbAgunanID"                : $('#bpkbAgunanID').val(),  //agunan id bpkb
                "bpkbNoBPKB"                  : $('#bpkbNoBPKB').val(),    
                "bpkbNamaPemilik"             : $('#bpkbNamaPemilik').val(),   
                "bpkbAlamatPemlik"            : $('#bpkbAlamatPemlik').val(),    
                "bpkbKotaPemilik"             : $('#bpkbKotaPemilik').val(),  
                "bpkbSilinder"                : $('#bpkbSilinder').val(), 
                "bpkbNoRangka"                : $('#bpkbNoRangka').val(),  
                "bpkbNoMesin"                 : $('#bpkbNoMesin').val(),
                "bpkbTahun"                   : $('#bpkbTahun').val(),
                "bpkbTglExpPajak"             : $('#bpkbTglExpPajak').val(), 
                "bpkbWarna"                   : $('#bpkbWarna').val(),     
                "bpkbNoPolisi"                : $('#bpkbNoPolisi').val(),  
                "bpkbTglExpSTNK"              : $('#bpkbTglExpSTNK').val(), 
                "bpkbNoSTNK"                  : $('#bpkbNoSTNK').val(), 
                "bpkbID"                      : $('#bpkbID').val(),
                "bpkbNoReff"                  : $('#bpkbNoReff').val(),
                "bpkbMerk"                    : $('#bpkbMerk').val(),
                "bpkbType"                    : $('#bpkbType').val(),
                "bpkbJenis"                   : $('#bpkbJenis').val(),
                "bpkbNoFakturPemilik"         : $('#bpkbNoFakturPemilik').val(),  
                "noSKTrayek"                  : $('#noSKTrayek').val(),  
                "bpkbBerlakuSD"               : $('#bpkbBerlakuSD').val(),     
                "bpkbLainnya"                 : $('#bpkbLainnya').val(),
                "bpkbDokKwitansiBlanko"       : $('#bpkbDokKwitansiBlanko').val(),
                "bpkbDokFakturPemilik"        : $('#bpkbDokFakturPemilik').val(),
                "bpkbDokKwJualBeli"           : $('#bpkbDokKwJualBeli').val(),
                "bpkbDokSKTrayek"             : $("#bpkbDokSKTrayek").val(),
                "check_kw_blanko"             : bpkb_blanko_check,
                "check_faktur_pemilik"        : bpkb_faktur_pemilik,
                "check_kw_jual_beli"          : bpkb_check_jb,
                "check_sk_trayek"             : bpkb_check_skt
               },
        success : function(response) {
            console.log('harusnya bisa');
            console.log(response);
            alert('Data Sukses Di Update');
            $('#loading1').hide();
            if( menuAsset == '1'){
                window.location = base_url + 'index.php/AsetDokumenEntryController/index';
            }else if( menuAsset == '2'){
                window.location = base_url + 'index.php/AsetDokumenViewAsetController/index';
            }
        },
        error : function(response) {
            console.log('failed');
            alert('Data Gagal Di Update');
            $('#loading').hide();
            if( menuAsset == '1'){
                window.location = base_url + 'index.php/AsetDokumenEntryController/index';
            }else if( menuAsset == '2'){
                window.location = base_url + 'index.php/AsetDokumenViewAsetController/index';
            }
        }
    });    

}
function updateEmas(){
    $('#loading').show();
    $('#loading1').show();
    $.ajax({
        url : base_url + "index.php/AsetDokumenUpdateController/updateEmas",
        type : "POST",
        dataType : "json",
        data : {"mainId"                : $('#mainId').val(),
                "mainNomor"             : $('#mainNomor').val(),
                "mainNoReff"            : $('#mainNoReff').val(),
                "mainAreaKerja"         : $('#mainAreaKerja').val(),
                "mainTanggal"           : $('#mainTanggal').val(),
                "mainTransaksi"         : $('#mainTransaksi').val(),
                "mainNama"              : $('#mainNama').val(),
                "mainKeterangan"        : $('#mainKeterangan').val(),
                "mainAlamat"            : $('#mainAlamat').val(),
                "mainKota"              : $('#mainKota').val(),
                "mainJenisPengurusan"   : $('#mainJenisPengurusan').val(),
                "mainNomorRekening"     : $('#mainNomorRekening').val(),
                "mainTanggalRealisasi"  : $('#mainTanggalRealisasi').val(),
                "emasAgunanID"          : $('#emasAgunanID').val(),
                "emasNoSeri"            : $('#emasNoSeri').val(), 
                "emasJenisEmas"         : $('#emasJenisEmas').val(),
                "emasKarat"             : $('#emasKarat').val(), 
                "emasBerat"             : $('#emasBerat').val(), 
                "emasHargaPasar"        : $('#emasHargaPasar').val(), 
                "emasHargaTaksasi"      : $('#emasHargaTaksasi').val(),
                "emasID"                      : $('#emasID').val(),
                "emasNoReff"                  : $('#emasNoReff').val(),
            },

        success : function(response) {
            console.log('success');
            console.log(response);
            alert('Data Sukses Di Update');
            $('#loading').hide();
            if( menuAsset == '1'){
                window.location = base_url + 'index.php/AsetDokumenEntryController/index';
            }else if( menuAsset == '2'){
                window.location = base_url + 'index.php/AsetDokumenViewAsetController/index';
            } 
        },
        error : function(response) {
            console.log('failed');
            alert('Data Gagal Di Update');
            $('#loading').hide();
            if( menuAsset == '1'){
                window.location = base_url + 'index.php/AsetDokumenEntryController/index';
            }else if( menuAsset == '2'){
                window.location = base_url + 'index.php/AsetDokumenViewAsetController/index';
            }
        }
    });    
}
function deleteFunction() {
    
    console.log(nomor + ' ' + noref + ' ' + status + ' ' + base_url + ' ' + idAgunan );
    $('#loading').show();
    $.ajax({
        url : base_url + "index.php/AsetDokumenEntryController/deleteDataDokumen",
        type : "POST",
        dataType : "json",
        data : {"nomorAgunan"    : nomor, 
                "nomorRefAgunan" : noref,
                "dataStatus"     : status,
                "agunanID"       : idAgunan},

        success : function(response) {
            console.log('harusnya bisa');
            console.log(response);
            alert('Data Sukses Di Delete');
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/index';  
        },
        error : function(response) {
            console.log('failed');
            alert('Data Gagal Di Delete');
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/index';
        }
    });    

}
function checkSertifikat(){
    if ($("#check_ajb").is(":checked")){
        sert_ajb_check = 'Y';
    }else{
        sert_ajb_check = 'N';
    }
    if ($("#check_imb").is(":checked")){
        sert_imb_check = 'Y';
    }else{
        sert_imb_check = 'N';
    }
    if ($("#check_sppt").is(":checked")){
        sert_sppt_check = 'Y';
    }else{
        sert_sppt_check = 'N';
    }
    if ($("#check_skmht").is(":checked")){
        sert_skmht_check = 'Y';
    }else{
        sert_skmht_check = 'N';
    }
    if ($("#check_denah").is(":checked")){
        sert_denah_check = 'Y';
    }else{
        sert_denah_check = 'N';
    }
    if ($("#check_roya").is(":checked")){
        sert_roya_check = 'Y';
    }else{
        sert_roya_check = 'N';
    }
    if ($("#check_sht").is(":checked")){
        sert_sht_check = 'Y';
    }else{
        sert_sht_check = 'N';
    }
    if ($("#check_stts").is(":checked")){
        sert_stts_check = 'Y';
    }else{
        sert_stts_check = 'N';
    }
    if ($("#check_ssb_bpht").is(":checked")){
        sert_ssb_check = 'Y';
    }else{
        sert_ssb_check = 'N';
    }
}
function checkBPKB(){
    if ($("#check_kw_blanko").is(":checked")){
        bpkb_blanko_check = 'Y';
    }else{
        bpkb_blanko_check = 'N';
    }
    if ($("#check_faktur_pemilik").is(":checked")){
        bpkb_faktur_pemilik = 'Y';
    }else{
        bpkb_faktur_pemilik = 'N';
    }
    if ($("#check_kw_jual_beli").is(":checked")){
        bpkb_check_jb = 'Y';
    }else{
        bpkb_check_jb = 'N';
    }
    if ($("#check_sk_trayek").is(":checked")){
        bpkb_check_skt = 'Y';
    }else{
        bpkb_check_skt = 'N';
    }
}

function serchAsetDokumen(){
    var search = $('#search').val(); 
    var status = $('#status').val();  
    var kode_kantor = $('#kode_kantor').val();
    var jenis       = $('#jenis').val();
    dataTableeee = [];
    console.log(jenis + ' ' + search + ' ' + status + ' ' + kode_kantor);
    $('#loading').show(); 

    $.ajax({
            url : base_url + "index.php/AsetDokumenEntryController/getDataSearchA",
            type : "POST",
            dataType : "json",
            data : {"search"    : search,
                    "status"    : status,
                    "kode_kantor" : kode_kantor,
                    "jenis"     : jenis
                    },

            success : function(response) {
                $('#employeeTable').DataTable().clear();
                $('#employeeTable').DataTable().destroy();
                console.log(response);  
                dataTableeee.push(response); 
                console.log(dataTableeee);
                $('#employeeTable > tbody:first').html(dataTableeee);
                $(document).ready(function() {
                    $('#employeeTable').DataTable( {
                        "destroy": true,
                        "scrollX": true,
                        "autoWidth" : false,
                        "searching": false,
                        "aaSorting" : []
                    } );
                } );
                $('#loading').hide();  
                console.log("FINISH");
                
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Data Tidak Ditemukan, Mohon Periksa Kembali');
                $('#loading').hide();
            }
    });    
}
function serchAsetDokumenB(){  
    var search = $('#search').val(); 
    var status = $('#status').val();  
    var kode_kantor = $('#kode_kantor').val();
    var jenis       = $('#jenis').val();
    dataTableeee = [];
    console.log(jenis + ' ' + search + ' ' + status + ' ' + kode_kantor);
    $('#loading').show(); 

    $.ajax({
            url : base_url + "index.php/AsetDokumenEntryController/getDataSearchB",
            type : "POST",
            dataType : "json",
            data : {"search"    : search,
                    "status"    : status,
                    "kode_kantor" : kode_kantor,
                    "jenis"     : jenis
                    },

            success : function(response) {
                $('#employeeTable').DataTable().clear();
                $('#employeeTable').DataTable().destroy();
                console.log(response);  
                dataTableeee.push(response); 

                console.log(dataTableeee);
                $('#employeeTable > tbody:first').html(dataTableeee);
                $(document).ready(function() {
                    $('#employeeTable').DataTable( {
                        "destroy": true,
                        "scrollX": true,
                        "autoWidth" : false,
                        "searching": false,
                        "aaSorting" : []
                    } );
                } );
                $('#loading').hide(); 
                if(status == 'IN TRANSIT'){
                    $(".btnCetaks").hide(); 
                    $(".btnDelete").hide(); 
                    $(".btnKembaliDokumen").hide(); 
                    $(".btnDueDate").hide(); 
                    $(".btnPenyerahan").hide(); 
                    $(".btnPinjam").hide(); 
                    
                }
                console.log("FINISH");
                
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Data Tidak Ditemukan, Mohon Periksa Kembali');
                $('#loading').hide();
            }
    });    
}
function serchDataRekening(){
    $('#TableNoRek').DataTable().clear();
    $('#TableNoRek').DataTable().destroy();
    var search = $('#searchRekeningUpdate').val(); 
    dataTableeee = [];
    console.log('berubah :  ' + search + ' ');
    $('#loading7').show(); 

    //// bareng pakai function search nya di controller Aset Dokumen Entry
    $.ajax({
            url : base_url + "index.php/AsetDokumenEntryController/getDataSearchRekening",
            type : "POST",
            dataType : "json",
            data : {"search"    : search},

            success : function(response) {
                dataTableeee.push(response); 
                console.log(dataTableeee);
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
                $('#loading7').hide();  
                console.log("FINISH");
                
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Data Tidak Ditemukan');
            }
    });    
}

$('#uploadForm').on('submit', function (e) {
    e.preventDefault();
    if( $("#coverNotes").val() == '' ){
        alert("Mohon Pilih Cover Notes untuk di upload!");
    }
    else{
        $("#loading6").show();
        $.ajax({
            url : base_url + "index.php/AsetDokumenUpdateController/uploadCoverNotes",
            type : "POST",
            data : new FormData(this),
            contentType: false,
            cache: false,
            processData: false,     
            success : function(data) {
               $("#loading6").hide();
               $("#imgCoverNotes").attr('src',data);
               $("#imgCoverNotes2").attr("href", data);
               $('#btn_simpan_dueDate_modal').prop("disabled", false);
               alert("Upload cover notes sukses, anda bisa mengubah due date");
               
            },
            error : function(response) {
                console.log(response);
                alert(response);
            }
        }); 
    }
});
