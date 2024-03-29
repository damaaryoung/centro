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
var JaminanCoverNotes = '';
var JaminanSlik = '';
var SlikKodeJenisAgunan = '';
var SlikLembagaPemeringkat = '';
var SlikJenisPengikatan = '';
var SlikDati2 = '';
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
var mainJenisPengurusanPinjam = '';
var mainNamaPinjam = '';
var base_url = $('#base_url').val();
var menuAsset = $('#menuAsset').val();
var user_kode_kantor = $('#user_kode_kantor').val();
var user_divisi_id = $('#user_divisi_id').val();
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
   
    loadDataAwal();
    $('.select2').select2();

    $('#kode_kantor').append('<option value="' + user_kode_kantor + '" selected>'+ user_kode_kantor +'</option>');
    if(user_kode_kantor == '00' || user_divisi_id == 'IT'){
        get_kode_kantor();
    }
    
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
    //$('#updateSertifikat').modal('hide');
    if(JaminanHeader.jenis_jaminan == 'SERTIFIKAT'){
       updateSertifikat();
    } 
    else if(JaminanHeader.jenis_jaminan == 'BPKB'){
        updateBPKB();
    }
    else if(JaminanHeader.jenis_jaminan == 'EMAS'){
        updateEmas();
    }

    $('#mainUpdateModal').modal('hide');
});
$('#btn_kembali_update_modal').click(function () { 
    $('#mainUpdateModal').modal('hide');
});
$('#btn_kembali_update_modal2').click(function () {
    $('#mainUpdateModal').modal('hide');
});
// modal sertifikat
$('#sert_button_simpan').click(function () {
    $('#updateSertifikat').modal('hide');
});
$('#sert_button_kembali').click(function () {
    mappingFieldSertifikat(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument,JaminanSlik,SlikKodeJenisAgunan,SlikLembagaPemeringkat,SlikJenisPengikatan,SlikDati2);
    $('#updateSertifikat').modal('hide');
});
$('#sert_button_kembali2').click(function () {
    mappingFieldSertifikat(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument,JaminanSlik,SlikKodeJenisAgunan,SlikLembagaPemeringkat,SlikJenisPengikatan,SlikDati2);
                                                    
    $('#updateSertifikat').modal('hide');
});
//modal bpkb
$('#bpkb_button_simpan').click(function () {
    $('#updateBPKB').modal('hide');
});
$('#bpkb_button_kembali').click(function () {
    mappingFieldBPKB(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument,MerkKend,TypeKend,JenisKend,JaminanSlik,SlikKodeJenisAgunan,SlikLembagaPemeringkat,SlikJenisPengikatan,SlikDati2);
    $('#updateBPKB').modal('hide');
});
$('#bpkb_button_kembali2').click(function () {
    mappingFieldBPKB(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument,MerkKend,TypeKend,JenisKend,JaminanSlik,SlikKodeJenisAgunan,SlikLembagaPemeringkat,SlikJenisPengikatan,SlikDati2);
    $('#updateBPKB').modal('hide');
});
//modal emas
$('#emas_button_simpan').click(function () {
    $('#updateEmas').modal('hide');
});
$('#emas_button_kembali').click(function () {
    mappingFieldEmas(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
    $('#updateEmas').modal('hide');
});
$('#emas_button_kembali2').click(function () {
    mappingFieldEmas(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
    $('#updateEmas').modal('hide');
});

// modal pinjam 
$('#btn_simpan_modal_pinjam').click(function () {
    mainJenisPengurusanPinjam = $('#mainJenisPengurusanPinjam').val();
    mainNamaPinjam = $('#mainNamaPinjam').val();
   
    if(mainNamaPinjam == ''){
        return Swal.fire({
            icon: 'error',
            title: 'Mohon Masukan Nama Notaris !',
            text: 'Nama Notaris Tidak Boleh Kosong!'
        });
    }
    else if(mainJenisPengurusanPinjam == ''){
        Swal.fire({
            title: 'Jenis Pengurusan Belum Diisi!',
            text: "Tanggal Rencana Kembali Juga Akan Kosong, Lanjutkan Peminjaman ?",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Lanjutkan',
            cancelButtonText: 'Batalkan',
            showLoaderOnConfirm: true,
            reverseButtons: true,
            preConfirm: function() {
             return new Promise(function(resolve) {
                peminjaman_dokument();
             });
            },
            allowOutsideClick: false     
         });
         console.log("ini dijalanin1");
         return;
    }else{
        console.log("ini dijalanin");
        peminjaman_dokument();
    }

 
});
$('#btn_kembali_pinjam_modal').click(function () { 
    $('#PeminjamanMainModal').modal('hide');
});
$('#btn_kembali_pinjam_modal2').click(function () {
    $('#PeminjamanMainModal').modal('hide');
});
// modal sertifikat
$('#sert_button_kembali_pinjam').click(function () {
    $('#pinjamSertifikatModal').modal('hide');
});
$('#sert_button_kembali_pinjam2').click(function () {
    $('#pinjamSertifikatModal').modal('hide');
});
//modal bpkb
$('#bpkb_button_kembali_pinjam').click(function () {
    $('#peminjamanBPKBModal').modal('hide');
});
$('#bpkb_button_kembali_pinjam2').click(function () {
    $('#peminjamanBPKBModal').modal('hide');
});
//modal emas
$('#emas_button_kembali_pinjam').click(function () {
   // mappingFieldEmas(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
    $('#peminjamanEmasModal').modal('hide');
});
$('#emas_button_kembali_pinjam2').click(function () {
   // mappingFieldEmas(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
    $('#peminjamanEmasModal').modal('hide');
});

//modal kembali
$('#btn_kembali_kembali_modal').click(function () {
    $('#KembaliMainModal').modal('hide');
});
$('#btn_kembali_kembali_modal2').click(function () {
    $('#KembaliMainModal').modal('hide');
});
$('#btn_simpan_modal_kembali').click(function () {
   $('#loading5').show();

   $.ajax({
    url : base_url + "AsetDokumenKembaliController/kembaliDokumen",
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
        alert('Data Sukses Di Kembalikan');
        $('#loading5').hide();
        window.location = base_url + 'AsetDokumenEntryController/index';  
    },
    error : function(response) {
        console.log('failed :' + response);
        alert('Gagal Kembalikan Data');
        $('#loading').hide();
        window.location = base_url + 'AsetDokumenEntryController/index';
    }
 });     
});
//kembali sertifikat
$('#sert_button_kembali_kembali').click(function () {
    $('#kembaliSertifikatModal').modal('hide');
});
$('#sert_button_kembali_kembali2').click(function () {
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

   $('#loading6').show();
   $.ajax({
    url : base_url + "AsetDokumenUpdateController/updateDueDate",
    type : "POST",
    dataType : "json",
    data : {"tanggalRencanaKembaliDueDate" : tanggalRencanaKembaliDueDate, 
            "mainIdDueDate"                : mainIdDueDate,
            "mainNomorDueDate"             : mainNomorDueDate,
            "mainNoReffDueDate"            : mainNoReffDueDate},

    success : function(response) {
        alert('Sukses Update Due Date');

        window.location = base_url + 'AsetDokumenEntryController/index';
    },
    error : function(response) {
        console.log('failed :' + response);
        alert('Gagal Get Due Date');
        $('#loading').hide();
        window.location = base_url + 'AsetDokumenEntryController/index';
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
        url : base_url + "AsetDokumenPinjamController/getNotaris",
        type : "POST",
        dataType : "json",
        data : {"test"    : "test"},

        success : function(response) {  
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
            console.log('failed :' + response);
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
    url : base_url + "AsetDokumenPinjamController/getJenisPengurusan",
    type : "POST",
    dataType : "json",
    data : {"test"    : "test"},

    success : function(response) {
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
        console.log('failed :' + response);
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
    $('#mainJenisPengurusanPinjam').val(namaJenisPengurusan);
    $('#mainTanggalRencanaKembaliPinjam').val(kembali);
    $('#ListJaminanPengurusanModal').modal('hide');
});



// modal penyerahan 
$('#btn_simpan_modal_penyerahan').click(function () {
    $('#loading').show();
    $('#loadingPenyerahan').show();
    $.ajax({
        url : base_url + "AsetDokumenPenyerahanController/penyerahanData",
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
            alert('Penyerahan Data Sukses');
            $('#loading').hide();
            window.location = base_url + 'AsetDokumenEntryController/index';  
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Gagal Melakukan Peminjaman Data');
            $('#loading').hide();
            window.location = base_url + 'AsetDokumenEntryController/index';
        }
    });  
});
$('#btn_kembali_penyerahan_modal').click(function () { 
    $('#PenyerahanMainModal').modal('hide');
});
$('#btn_kembali_penyerahan_modal2').click(function () {
    $('#PenyerahanMainModal').modal('hide');
});
// modal sertifikat
$('#sert_button_kembali_penyerahan').click(function () {
    $('#penyerahanSertifikatModal').modal('hide');
});
$('#sert_button_kembali_penyerahan2').click(function () {
    $('#penyerahanSertifikatModal').modal('hide');
});
//modal bpkb
$('#bpkb_button_kembali_penyerahan').click(function () {
    $('#penyerahanBPKBModal').modal('hide');
});
$('#bpkb_button_kembali_penyerahan2').click(function () {
    $('#penyerahanBPKBModal').modal('hide');
});
//modal emas
$('#emas_button_kembali_penyerahan').click(function () {
    $('#penyerahanEmasModal').modal('hide');
});
$('#emas_button_kembali_penyerahan2').click(function () {
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
        url : base_url + "AsetDokumenUpdateController/displayDetails",
        type : "POST",
        dataType : "json",
        timeout : 180000,
        data : {"nomorAgunan"    : nomor, 
                "nomorRefAgunan" : noref,
                "dataStatus"     : status,
                "agunanID"       : idAgunan},

        success : function(response) {
            $("#btn_simpan_update_modal").prop("disabled", false);
            $("#sert_button_simpan").prop("disabled", false);
            $("#bpkb_button_simpan").prop("disabled", false);
            $("#emas_button_simpan").prop("disabled", false);

            console.log(response);
            ListKodeKantor = response.ListKodeKantor;
            KreKodeJenisAgunan = response.KreKodeJenisAgunan;
            KreKodeIkatanHukumAgunan = response.KreKodeIkatanHukumAgunan;
            JaminanHeader = response.getJaminanHeader[0];
            JaminanDokument = response.getJaminanDokument[0];
            MerkKend = response.MerkKend;
            TypeKend = response.TypeKend;
            JenisKend = response.JenisKend;

            JaminanSlik            = response.getJaminanSLIK[0];
            SlikKodeJenisAgunan    = response.getSlikKodeJenisAgunan;
            SlikLembagaPemeringkat = response.getSlikLembagaPemeringkat;
            SlikJenisPengikatan    = response.getSlikJenisPengikatan;
            SlikDati2              = response.getSlikDati2;

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
            $('#mainNamaNasabah').val(JaminanHeader.nama_nasabah);

            $.each(ListKodeKantor,function(i,data){
                $('#mainAreaKerja').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
            });

            if(JaminanHeader.jenis_jaminan == 'SERTIFIKAT'){
                mappingFieldSertifikat(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument,JaminanSlik,SlikKodeJenisAgunan,SlikLembagaPemeringkat,SlikJenisPengikatan,SlikDati2);
            } 
            else if(JaminanHeader.jenis_jaminan == 'BPKB'){
                mappingFieldBPKB(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument,MerkKend,TypeKend,JenisKend,JaminanSlik,SlikKodeJenisAgunan,SlikLembagaPemeringkat,SlikJenisPengikatan,SlikDati2);
            }
            else if(JaminanHeader.jenis_jaminan == 'EMAS'){
                mappingFieldEmas(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument);
            }
            
            /// validasi nomor rekening sudah cair atau belum
            if(JaminanHeader.no_rekening != '' && JaminanHeader.verifikasi == '1'){
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
            alert('Gagal Get Detail, Mohon Periksa Jaringan Anda!');
            console.log('failed :' + response);
            $('#mainUpdateModal').modal('hide');
            $('#loading').hide();
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

    console.log(idAgunan);
    
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
    console.log(idAgunan);
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
        url : base_url + "AsetDokumenPinjamController/displayDetails",
        type : "POST",
        dataType : "json",
        timeout : 180000,
        data : {"nomorAgunan"    : nomor, 
                "nomorRefAgunan" : noref,
                "dataStatus"     : status,
                "agunanID"       : idAgunan},

        success : function(response) {
            JaminanHeader = response.getJaminanHeader[0];
            JaminanDokument = response.getJaminanDokument[0];
            JaminanSlik     = response.getJaminanSLIK[0];
            
 
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
                mappingFieldSertifikatPinjam(JaminanHeader, JaminanDokument, JaminanSlik);
            } 
            else if(JaminanHeader.jenis_jaminan == 'BPKB'){
                mappingFieldBPKBPinjam(JaminanHeader, JaminanDokument, JaminanSlik);
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
            if(JaminanHeader.verifikasi == '1' && JaminanDokument.verifikasi == '1'){
            //    alert('Maaf, Data belum di verifikasi, Tidak Dapat Di Pinjamkan');
                $("#btn_simpan_modal_pinjam").prop("disabled", false);
            }
            else{
                $("#btn_simpan_modal_pinjam").prop("disabled", true);
            }
         

            $('#loading2').hide();
            $('#loading').hide();
        },
        error : function(response) {
            console.log('failed :' + response);
            alert("Gagal Get Detail, Mohon Periksa Jaringan Anda!");
            $('#loading').hide();
            $('#PeminjamanMainModal').modal('hide');
        }
    });   
});

$('#bodyTableAsetDokumen').on('click','.btnKembaliDokumen', function () {
    nomor = $(this).data("nomor");
    noref = $(this).data("noref");
    status = $(this).data("status");
    idAgunan = $(this).data("agunan");
    console.log(idAgunan);
    $('#KembaliMainModal').modal('show');
    $('#loading5').show();

    $('#mainAreaKerjaKembali').find('option').remove().end();

    $.ajax({
        url : base_url + "AsetDokumenKembaliController/displayDetails",
        type : "POST",
        dataType : "json",
        timeout : 180000,
        data : {"nomorAgunan"    : nomor, 
                "nomorRefAgunan" : noref,
                "dataStatus"     : status,
                "agunanID"       : idAgunan},

        success : function(response) {
            
            console.log(response);
            JaminanHeader = response.getJaminanHeader[0];
            JaminanDokument = response.getJaminanDokument[0];
            JaminanHistory = response.getJaminanHistory[0];
            JaminanSlik     = response.getJaminanSLIK[0];
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
                mappingFieldSertifikatKembali(JaminanHeader, JaminanDokument, JaminanSlik);
            } 
            else if(JaminanHeader.jenis_jaminan == 'BPKB'){
                mappingFieldBPKBKembali(JaminanHeader, JaminanDokument, JaminanSlik);
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
            alert('Gagal Get Detail, Mohon Periksa Jaringan Anda!');
            $('#loading').hide();
            $('#KembaliMainModal').modal('hide');
        }
    });    
});

$('#bodyTableAsetDokumen').on('click','.btnDueDate', function () {
    nomor = $(this).data("nomor");
    noref = $(this).data("noref");
    status = $(this).data("status");
    idAgunan = $(this).data("agunan");
    if(status != 'PINJAM'){
        alert('Maaf, data tersebut bukan Peminjaman!');
        return;
    }

    $('#loading').show();
    $('#mainDueDateModal').modal('show');
    $.ajax({
        url : base_url + "AsetDokumenUpdateController/getDueDate",
        type : "POST",
        dataType : "json",
        timeout : 180000,
        data : {"nomorAgunan"    : nomor, 
                "nomorRefAgunan" : noref,
                "dataStatus"     : status,
                "agunanID"       : idAgunan},

        success : function(response) {
            JaminanHeader = response.getJaminanHeader[0];
            JaminanDokument = response.getJaminanDokument[0];
            if(response.getCoverNotes[0] == null){
                JaminanCoverNotes = null;
            }else{
                JaminanCoverNotes = response.getCoverNotes[0];
            }
            

            $('#tanggalRencanaKembaliDueDate').val(JaminanHeader.tgl_rencana_kembali);
            $('#mainIdDueDate').val(JaminanHeader.id);
            $('#mainNomorDueDate').val(JaminanHeader.nomor);
            $('#mainNoReffDueDate').val(JaminanHeader.no_reff);
            $('#namaNotarisDueDate').val(JaminanHeader.nama);
            $('#CoverNotesID').val(JaminanHeader.id);
            $('#CoverNotesAgunanID').val(JaminanDokument.agunan_id);
            $('#CoverNotesNoReff').val(JaminanHeader.no_reff);

            var tempSysdate = new Date(JaminanHeader.sysdate);
            var tempKembali = new Date(JaminanHeader.tgl_rencana_kembali);             
            
            if( tempKembali > tempSysdate){
                alert('Tanggal Rencana Kembali Belum Expired, Tidak Dapat Update Due Date!');
                if(JaminanCoverNotes == '' || JaminanCoverNotes == null){
                    $("#imgCoverNotes").attr('src', base_url + 'PUBLIC/CoverNotes/default.jpeg');
                    $("#imgCoverNotes2").attr("href", base_url + 'PUBLIC/CoverNotes/default.jpeg');
                }else{
                    $("#imgCoverNotes").attr('src',  base_url + 'PUBLIC/CoverNotes/' + JaminanCoverNotes.upload_cover_notes);
                    $("#imgCoverNotes2").attr("href", base_url + 'PUBLIC/CoverNotes/' + JaminanCoverNotes.upload_cover_notes);
                }
                $('#btn_simpan_dueDate_modal').prop("disabled", true);
                $('#btnUploadCoverNotes').prop("disabled", true);
                
            }
            else if(JaminanCoverNotes == '' || JaminanCoverNotes == null){
                alert('Mohon lakukan upload Cover Notes baru, untuk mengubah tanggal Due Date!');
                $("#imgCoverNotes").attr('src', base_url + 'PUBLIC/CoverNotes/default.jpeg');
                $("#imgCoverNotes2").attr("href", base_url + 'PUBLIC/CoverNotes/default.jpeg');
                
                $('#btn_simpan_dueDate_modal').prop("disabled", true);
                $('#btnUploadCoverNotes').prop("disabled", false);
            }else{
                $("#imgCoverNotes").attr('src', JaminanCoverNotes.root_address + JaminanCoverNotes.path_file);
                $("#imgCoverNotes2").attr("href", JaminanCoverNotes.root_address + JaminanCoverNotes.path_file);
                $('#btn_simpan_dueDate_modal').prop("disabled", false);
                $('#btnUploadCoverNotes').prop("disabled", false);
            }
            
            
            $('#loading').hide();
            $('#loading6').hide();
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Gagal Get Details, Mohon Periksa Jaringan Anda!');
            $('#loading').hide();
            $('#mainDueDateModal').modal('hide');
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
    $('#loadingPenyerahan').show();

    $.ajax({
        url : base_url + "AsetDokumenPenyerahanController/displayDetails",
        type : "POST",
        dataType : "json",
        timeout : 180000,
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
            JaminanSlik           = response.getJaminanSLIK[0];
            
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
                mappingFieldSertifikatPenyerahan(JaminanHeader, JaminanDokument, JaminanSlik);
            } 
            else if(JaminanHeader.jenis_jaminan == 'BPKB'){
                mappingFieldBPKBPenyerahan(JaminanHeader, JaminanDokument, JaminanSlik);
            }
            else if(JaminanHeader.jenis_jaminan == 'EMAS'){
                mappingFieldEmasPenyerahan(JaminanHeader, JaminanDokument);
            }
            $('#loadingPenyerahan').hide();
            $('#loading').hide();
        },
        error : function(response) {
            console.log('failed :' + response);
            alert("Gagal Get Detail, Mohon Periksa Jaringan Anda!");
            $('#loading').hide();
            $('#PenyerahanMainModal').modal('hide');
        }
    });   
});


$('#mainBtnSearchRekening').click(function () {
    $('#modalNomorRekening').modal('show');
    dataTableeee = [];
    $.ajax({
            url : base_url + "AsetDokumenUpdateController/getNomorRekening",
            type : "POST",
            dataType : "json",
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
                $('#loading7').hide();  
                
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


function mappingFieldSertifikat(ListKodeKantor,KreKodeJenisAgunan,KreKodeIkatanHukumAgunan,JaminanHeader,JaminanDokument,JaminanSlik,SlikKodeJenisAgunan,SlikLembagaPemeringkat,SlikJenisPengikatan,SlikDati2){
              
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
                $('#sertSlikJenisAgunan').find('option').remove().end();
                $('#sertSlikLembagaPemeringkat').find('option').remove().end();
                $('#sertSlikJenisPengikatan').find('option').remove().end();
                $('#sertSlikKodeDati2').find('option').remove().end();
                $('#sertSlikJenisAgunan').find('option').remove().end();
                $('#sertSlikLembagaPemeringkat').find('option').remove().end();
                $('#sertSlikJenisPengikatan').find('option').remove().end();
                $('#sertSlikKodeDati2').find('option').remove().end();

                
                $('#sertSlikParipasu').find('option').remove().end();
                $('#sertSLikStatusJoinAccount').find('option').remove().end();
                $('#sertSlikAsuransi').find('option').remove().end();
                $('#sertSlikStatusAgunan').find('option').remove().end();

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

                /// SLIK ///
                if(JaminanSlik != null){   
                    $('#sertTglPenilaian').val(JaminanSlik.tanggal_penilaian_independen); 
                    $('#sertSlikPeringkatAgunan').val(JaminanSlik.peringkat_agunan);  
                    $('#sertSlikParipasuPersen').val(JaminanSlik.prosentase_paripasu); 
                    $('#sertSlikTanggalPengikatan').val(JaminanSlik.tanggal_pengikatan); 
                    $('#sertSlikNamaPemilikAgunan').val(JaminanSlik.nama_pemilik_agunan);
                    $('#sertSlikBuktiKepemilikanAgunan').val(JaminanSlik.bukti_kepemilikan);
                    $('#sertSlikAlamat').val(JaminanSlik.alamat_agunan);
                    $('#sertSlikNilaiNJOP').val(JaminanSlik.nilai_agunan);
                    $('#sertSlikNilaiLJK').val(JaminanSlik.nilai_agunan_menurut_ljk);
                    $('#sertSlikTanggalLJK').val(JaminanSlik.tanggal_penilaian_ljk);
                    $('#sertSlikNilaiIndependen').val(JaminanSlik.nilai_agunan_penilai_independen);
                    $('#sertSlikNamaIndependen').val(JaminanSlik.nama_penilai_independen);
                    $('#sertSlikTglIndependen').val(JaminanSlik.tanggal_penilaian_independen);
                    $('#sertSlikKeterangan').val(JaminanSlik.keterangan);
                    if(JaminanSlik.kode_jenis_agunan != null){
                        $('#sertSlikJenisAgunan').append('<option value="'+JaminanSlik.kode_jenis_agunan+'" selected>' + JaminanSlik.SlikJenisAgunan + '</option>');
                    }else { $('#sertSlikJenisAgunan').append('<option value="" selected> Tidak Dipilih </option>'); }
                    
                    if( JaminanSlik.kode_lembaga_pemeringkat != null ){
                        $('#sertSlikLembagaPemeringkat').append('<option value="'+JaminanSlik.kode_lembaga_pemeringkat+'" selected>' + JaminanSlik.SlikLembagaPemeringkat + '</option>');
                    }else { $('#sertSlikLembagaPemeringkat').append('<option value="" selected> Tidak Dipilih </option>'); }

                    if(JaminanSlik.kode_jenis_pengikatan != null){
                        $('#sertSlikJenisPengikatan').append('<option value="'+JaminanSlik.kode_jenis_pengikatan+'" selected>' + JaminanSlik.SlikJenisPengikatan + '</option>');
                    }else { $('#sertSlikJenisPengikatan').append('<option value="" selected>  Tidak Dipilih </option>'); }

                    if(JaminanSlik.kode_kab_kota != null && JaminanSlik.SlikKodeDati2 != null){
                        $('#sertSlikKodeDati2').append('<option value="'+JaminanSlik.kode_kab_kota+'" selected>' + JaminanSlik.SlikKodeDati2 + '</option>');
                    }else { $('#sertSlikKodeDati2').append('<option value="" selected> Tidak Dipilih </option>'); }
                    
                
                    

                    if( JaminanSlik.kode_status_agunan == '1') {
                        $('#sertSlikStatusAgunan').append('<option value="1" selected>1 - Tersedia</option> <option value="2" >2 - Indent</option>');
                    } else if(JaminanSlik.kode_status_agunan == '2'){
                        $('#sertSlikStatusAgunan').append('<option value="1" >1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
                    }else{
                        $('#sertSlikStatusAgunan').append('<option value="1">1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
                    }
                    if( JaminanSlik.status_paripasu == 'Y') {
                        $('#sertSlikParipasu').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
                    } else if(JaminanSlik.status_paripasu == 'T'){
                        $('#sertSlikParipasu').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
                    }else{
                        $('#sertSlikParipasu').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
                    }

                    if( JaminanSlik.status_kredit_join == 'Y') {
                        $('#sertSLikStatusJoinAccount').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
                    } else if(JaminanSlik.status_kredit_join == 'T'){
                        $('#sertSLikStatusJoinAccount').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
                    }else{
                        $('#sertSLikStatusJoinAccount').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
                    }

                    if( JaminanSlik.diasuransikan == 'Y') {
                        $('#sertSlikAsuransi').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
                    } else if(JaminanSlik.diasuransikan == 'T'){
                        $('#sertSlikAsuransi').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
                    }else{
                        $('#sertSlikAsuransi').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
                    }
            
                 
                }
                else if(JaminanSlik == null){
                    $('#sertSLikStatusJoinAccount').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
                    $('#sertSlikAsuransi').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
                    $('#sertSlikParipasu').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
                    $('#sertSlikStatusAgunan').append('<option value="1">1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');

                }
                
                
                $.each(SlikKodeJenisAgunan,function(i,data){
                    $('#sertSlikJenisAgunan').append('<option value="'+data.kode+'">' + data.kode + ' - ' + data.nama+'</option>');
                });
                $.each(SlikLembagaPemeringkat,function(i,data){
                    $('#sertSlikLembagaPemeringkat').append('<option value="'+data.kode+'">' + data.kode + ' - ' + data.nama+'</option>');
                });
                $.each(SlikJenisPengikatan,function(i,data){
                    $('#sertSlikJenisPengikatan').append('<option value="'+data.kode+'">' + data.kode + ' - ' + data.nama+'</option>');
                });
                $.each(SlikDati2,function(i,data){
                    $('#sertSlikKodeDati2').append('<option value="'+data.kode+'">' + data.kode + ' - ' + data.nama+'</option>');
                });

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

     $('#bpkbSlikJenisAgunan').find('option').remove().end();
     $('#bpkbSlikLembagaPemeringkat').find('option').remove().end();
     $('#bpkbSlikJenisPengikatan').find('option').remove().end();
     $('#bpkbSlikKodeDati2').find('option').remove().end();
     
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

    /// SLIK ///
    if(JaminanSlik != null){    
        $('#bpkbTglPenilaian').val(JaminanSlik.tanggal_penilaian_independen);             
        $('#bpkbSlikPeringkatAgunan').val(JaminanSlik.peringkat_agunan);  
        $('#bpkbSlikParipasuPersen').val(JaminanSlik.prosentase_paripasu); 
        $('#bpkbSlikTanggalPengikatan').val(JaminanSlik.tanggal_pengikatan); 
        $('#bpkbSlikNamaPemilikAgunan').val(JaminanSlik.nama_pemilik_agunan);
        $('#bpkbSlikBuktiKepemilikanAgunan').val(JaminanSlik.bukti_kepemilikan);
        $('#bpkbSlikAlamat').val(JaminanSlik.alamat_agunan);
        $('#bpkbSlikNilaiNJOP').val(JaminanSlik.nilai_agunan);
        $('#bpkbSlikNilaiLJK').val(JaminanSlik.nilai_agunan_menurut_ljk);
        $('#bpkbSlikTanggalLJK').val(JaminanSlik.tanggal_penilaian_ljk);
        $('#bpkbSlikNilaiIndependen').val(JaminanSlik.nilai_agunan_penilai_independen);
        $('#bpkbSlikNamaIndependen').val(JaminanSlik.nama_penilai_independen);
        $('#bpkbSlikTglIndependen').val(JaminanSlik.tanggal_penilaian_independen);
        $('#bpkbSlikKeterangan').val(JaminanSlik.keterangan);
        if(JaminanSlik.kode_jenis_agunan != ''){
            $('#bpkbSlikJenisAgunan').append('<option value="'+JaminanSlik.kode_jenis_agunan+'" selected>' + JaminanSlik.SlikJenisAgunan + '</option>');
        }else { $('#sertSlikJenisAgunan').append('<option value="" selected> Tidak Dipilih </option>'); }
        
        if(JaminanSlik.kode_lembaga_pemeringkat != ''){
            $('#bpkbSlikLembagaPemeringkat').append('<option value="'+JaminanSlik.kode_lembaga_pemeringkat+'" selected>' + JaminanSlik.SlikLembagaPemeringkat + '</option>');
        }else { $('#bpkbSlikLembagaPemeringkat').append('<option value="" selected> Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_jenis_pengikatan != ''){
            $('#bpkbSlikJenisPengikatan').append('<option value="'+JaminanSlik.kode_jenis_pengikatan+'" selected>' + JaminanSlik.SlikJenisPengikatan + '</option>');
        }else { $('#bpkbSlikJenisPengikatan').append('<option value="" selected>  Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_kab_kota != ''){
            $('#bpkbSlikKodeDati2').append('<option value="'+JaminanSlik.kode_kab_kota+'" selected>' + JaminanSlik.SlikKodeDati2 + '</option>');
        }else { $('#bpkbSlikKodeDati2').append('<option value="" selected> Tidak Dipilih </option>'); }
        
        if( JaminanSlik.kode_status_agunan == '1') {
            $('#bpkbSlikStatusAgunan').append('<option value="1" selected>1 - Tersedia</option> <option value="2" >2 - Indent</option>');
        } else if(JaminanSlik.kode_status_agunan == '2'){
            $('#bpkbSlikStatusAgunan').append('<option value="1" >1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
        }
        if( JaminanSlik.status_paripasu == 'Y') {
            $('#bpkbSlikParipasu').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.status_paripasu == 'T'){
            $('#bpkbSlikParipasu').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }
        if( JaminanSlik.status_kredit_join == 'Y') {
            $('#bpkbSLikStatusJoinAccount').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.status_kredit_join == 'T'){
            $('#bpkbSLikStatusJoinAccount').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }
        if( JaminanSlik.diasuransikan == 'Y') {
            $('#bpkbSlikAsuransi').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.diasuransikan == 'T'){
            $('#bpkbSlikAsuransi').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }
        
    }    
    if(JaminanSlik == null){ 
        $('#bpkbSlikStatusAgunan').append('<option value="1">1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
        $('#bpkbSlikParipasu').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        $('#bpkbSLikStatusJoinAccount').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        $('#bpkbSlikAsuransi').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
    }    
      
        $.each(SlikKodeJenisAgunan,function(i,data){
            $('#bpkbSlikJenisAgunan').append('<option value="'+data.kode+'">' + data.kode + ' - ' + data.nama+'</option>');
        });
        $.each(SlikLembagaPemeringkat,function(i,data){
            $('#bpkbSlikLembagaPemeringkat').append('<option value="'+data.kode+'">' + data.kode + ' - ' + data.nama+'</option>');
        });
        $.each(SlikJenisPengikatan,function(i,data){
            $('#bpkbSlikJenisPengikatan').append('<option value="'+data.kode+'">' + data.kode + ' - ' + data.nama+'</option>');
        });
        $.each(SlikDati2,function(i,data){
            $('#bpkbSlikKodeDati2').append('<option value="'+data.kode+'">' + data.kode + ' - ' + data.nama+'</option>');
        });
         
    
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

function mappingFieldSertifikatPinjam(JaminanHeader, JaminanDokument, JaminanSlik){
   
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

    /// SLIK ///
    if(JaminanSlik != null){        
         $('#sertTglPenilaianPinjam').val(JaminanSlik.tanggal_penilaian_independen);    
         $('#sertSlikPeringkatAgunanPinjam').val(JaminanSlik.peringkat_agunan);  
         $('#sertSlikParipasuPersenPinjam').val(JaminanSlik.prosentase_paripasu); 
         $('#sertSlikTanggalPengikatanPinjam').val(JaminanSlik.tanggal_pengikatan); 
         $('#sertSlikNamaPemilikAgunanPinjam').val(JaminanSlik.nama_pemilik_agunan);
         $('#sertSlikBuktiKepemilikanAgunanPinjam').val(JaminanSlik.bukti_kepemilikan);
         $('#sertSlikAlamatPinjam').val(JaminanSlik.alamat_agunan);
         $('#sertSlikNilaiNJOPPinjam').val(JaminanSlik.nilai_agunan);
         $('#sertSlikNilaiLJKPinjam').val(JaminanSlik.nilai_agunan_menurut_ljk);
         $('#sertSlikTanggalLJKPinjam').val(JaminanSlik.tanggal_penilaian_ljk);
         $('#sertSlikNilaiIndependenPinjam').val(JaminanSlik.nilai_agunan_penilai_independen);
         $('#sertSlikNamaIndependenPinjam').val(JaminanSlik.nama_penilai_independen);
         $('#sertSlikTglIndependenPinjam').val(JaminanSlik.tanggal_penilaian_independen);
         $('#sertSlikKeteranganPinjam').val(JaminanSlik.keterangan);
         if(JaminanSlik.kode_jenis_agunan != null){
             $('#sertSlikJenisAgunanPinjam').append('<option value="'+JaminanSlik.kode_jenis_agunan+'" selected>' + JaminanSlik.SlikJenisAgunan + '</option>');
         }else { $('#sertSlikJenisAgunanPinjam').append('<option value="" selected> Tidak Dipilih </option>'); }
         
         if(JaminanSlik.kode_lembaga_pemeringkat != null){
             $('#sertSlikLembagaPemeringkatPinjam').append('<option value="'+JaminanSlik.kode_lembaga_pemeringkat+'" selected>' + JaminanSlik.SlikLembagaPemeringkat + '</option>');
         }else { $('#sertSlikLembagaPemeringkatPinjam').append('<option value="" selected> Tidak Dipilih </option>'); }

         if(JaminanSlik.kode_jenis_pengikatan != null){
             $('#sertSlikJenisPengikatanPinjam').append('<option value="'+JaminanSlik.kode_jenis_pengikatan+'" selected>' + JaminanSlik.SlikJenisPengikatan + '</option>');
         }else { $('#sertSlikJenisPengikatanPinjam').append('<option value="" selected>  Tidak Dipilih </option>'); }

         if(JaminanSlik.kode_kab_kota != null && JaminanSlik.SlikKodeDati2 != null){
             $('#sertSlikKodeDati2Pinjam').append('<option value="'+JaminanSlik.kode_kab_kota+'" selected>' + JaminanSlik.SlikKodeDati2 + '</option>');
         }else { $('#sertSlikKodeDati2Pinjam').append('<option value="" selected> Tidak Dipilih </option>'); }
         
        
         

         if( JaminanSlik.kode_status_agunan == '1') {
             $('#sertSlikStatusAgunanPinjam').append('<option value="1" selected>1 - Tersedia</option> <option value="2" >2 - Indent</option>');
         } else if(JaminanSlik.kode_status_agunan == '2'){
             $('#sertSlikStatusAgunanPinjam').append('<option value="1" >1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
         }else{
             $('#sertSlikStatusAgunanPinjam').append('<option value="1">1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
         }
         if( JaminanSlik.status_paripasu == 'Y') {
             $('#sertSlikParipasuPinjam').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
         } else if(JaminanSlik.status_paripasu == 'T'){
             $('#sertSlikParipasuPinjam').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
         }else{
             $('#sertSlikParipasuPinjam').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
         }

         if( JaminanSlik.status_kredit_join == 'Y') {
             $('#sertSLikStatusJoinAccountPinjam').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
         } else if(JaminanSlik.status_kredit_join == 'T'){
             $('#sertSLikStatusJoinAccountPinjam').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
         }else{
             $('#sertSLikStatusJoinAccountPinjam').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
         }

         if( JaminanSlik.diasuransikan == 'Y') {
             $('#sertSlikAsuransiPinjam').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
         } else if(JaminanSlik.diasuransikan == 'T'){
             $('#sertSlikAsuransiPinjam').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
         }else{
             $('#sertSlikAsuransiPinjam').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
         }
    }    

}
function mappingFieldBPKBPinjam(JaminanHeader, JaminanDokument, JaminanSlik){
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
 
      $('#bpkbSlikJenisAgunanPinjam').find('option').remove().end();
      $('#bpkbSlikLembagaPemeringkatPinjam').find('option').remove().end();
      $('#bpkbSlikJenisPengikatanPinjam').find('option').remove().end();
      $('#bpkbSlikKodeDati2Pinjam').find('option').remove().end();

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

    if(JaminanSlik != null){      
        $('#bpkbTglPenilaianPinjam').val(JaminanSlik.tanggal_penilaian_independen);         
        $('#bpkbSlikPeringkatAgunanPinjam').val(JaminanSlik.peringkat_agunan);  
        $('#bpkbSlikParipasuPersenPinjam').val(JaminanSlik.prosentase_paripasu); 
        $('#bpkbSlikTanggalPengikatanPinjam').val(JaminanSlik.tanggal_pengikatan); 
        $('#bpkbSlikNamaPemilikAgunanPinjam').val(JaminanSlik.nama_pemilik_agunan);
        $('#bpkbSlikBuktiKepemilikanAgunanPinjam').val(JaminanSlik.bukti_kepemilikan);
        $('#bpkbSlikAlamatPinjam').val(JaminanSlik.alamat_agunan);
        $('#bpkbSlikNilaiNJOPPinjam').val(JaminanSlik.nilai_agunan);
        $('#bpkbSlikNilaiLJKPinjam').val(JaminanSlik.nilai_agunan_menurut_ljk);
        $('#bpkbSlikTanggalLJKPinjam').val(JaminanSlik.tanggal_penilaian_ljk);
        $('#bpkbSlikNilaiIndependenPinjam').val(JaminanSlik.nilai_agunan_penilai_independen);
        $('#bpkbSlikNamaIndependenPinjam').val(JaminanSlik.nama_penilai_independen);
        $('#bpkbSlikTglIndependenPinjam').val(JaminanSlik.tanggal_penilaian_independen);
        $('#bpkbSlikKeteranganPinjam').val(JaminanSlik.keterangan);

        if(JaminanSlik.kode_jenis_agunan != ''){
            $('#bpkbSlikJenisAgunanPinjam').append('<option value="'+JaminanSlik.kode_jenis_agunan+'" selected>' + JaminanSlik.SlikJenisAgunan + '</option>');
        }else { $('#bpkbSlikJenisAgunanPinjam').append('<option value="" selected> Tidak Dipilih </option>'); }
        
        if(JaminanSlik.kode_lembaga_pemeringkat != ''){
            $('#bpkbSlikLembagaPemeringkatPinjam').append('<option value="'+JaminanSlik.kode_lembaga_pemeringkat+'" selected>' + JaminanSlik.SlikLembagaPemeringkat + '</option>');
        }else { $('#bpkbSlikLembagaPemeringkatPinjam').append('<option value="" selected> Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_jenis_pengikatan != ''){
            $('#bpkbSlikJenisPengikatanPinjam').append('<option value="'+JaminanSlik.kode_jenis_pengikatan+'" selected>' + JaminanSlik.SlikJenisPengikatan + '</option>');
        }else { $('#bpkbSlikJenisPengikatanPinjam').append('<option value="" selected>  Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_kab_kota != ''){
            $('#bpkbSlikKodeDati2Pinjam').append('<option value="'+JaminanSlik.kode_kab_kota+'" selected>' + JaminanSlik.SlikKodeDati2 + '</option>');
        }else { $('#bpkbSlikKodeDati2Pinjam').append('<option value="" selected> Tidak Dipilih </option>'); }
        
       
        

        if( JaminanSlik.kode_status_agunan == '1') {
            $('#bpkbSlikStatusAgunanPinjam').append('<option value="1" selected>1 - Tersedia</option> <option value="2" >2 - Indent</option>');
        } else if(JaminanSlik.kode_status_agunan == '2'){
            $('#bpkbSlikStatusAgunanPinjam').append('<option value="1" >1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
        }else{
            $('#bpkbSlikStatusAgunanPinjam').append('<option value="1">1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
        }
        if( JaminanSlik.status_paripasu == 'Y') {
            $('#bpkbSlikParipasuPinjam').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.status_paripasu == 'T'){
            $('#bpkbSlikParipasuPinjam').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }else{
            $('#bpkbSlikParipasuPinjam').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        }

        if( JaminanSlik.status_kredit_join == 'Y') {
            $('#bpkbSLikStatusJoinAccountPinjam').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.status_kredit_join == 'T'){
            $('#bpkbSLikStatusJoinAccountPinjam').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }else{
            $('#bpkbSLikStatusJoinAccountPinjam').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        }

        if( JaminanSlik.diasuransikan == 'Y') {
            $('#bpkbSlikAsuransiPinjam').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.diasuransikan == 'T'){
            $('#bpkbSlikAsuransiPinjam').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }else{
            $('#bpkbSlikAsuransiPinjam').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        }
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

function mappingFieldSertifikatKembali(JaminanHeader, JaminanDokument, JaminanSlik){
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

     /// SLIK ///
    if(JaminanSlik != null){ 
        $('#sertTglPenilaianKembali').val(JaminanSlik.tanggal_penilaian_independen);           
        $('#sertSlikPeringkatAgunanKembali').val(JaminanSlik.peringkat_agunan);  
        $('#sertSlikParipasuPersenKembali').val(JaminanSlik.prosentase_paripasu); 
        $('#sertSlikTanggalPengikatanKembali').val(JaminanSlik.tanggal_pengikatan); 
        $('#sertSlikNamaPemilikAgunanKembali').val(JaminanSlik.nama_pemilik_agunan);
        $('#sertSlikBuktiKepemilikanAgunanKembali').val(JaminanSlik.bukti_kepemilikan);
        $('#sertSlikAlamatKembali').val(JaminanSlik.alamat_agunan);
        $('#sertSlikNilaiNJOPKembali').val(JaminanSlik.nilai_agunan);
        $('#sertSlikNilaiLJKKembali').val(JaminanSlik.nilai_agunan_menurut_ljk);
        $('#sertSlikTanggalLJKKembali').val(JaminanSlik.tanggal_penilaian_ljk);
        $('#sertSlikNilaiIndependenKembali').val(JaminanSlik.nilai_agunan_penilai_independen);
        $('#sertSlikNamaIndependenKembali').val(JaminanSlik.nama_penilai_independen);
        $('#sertSlikTglIndependenKembali').val(JaminanSlik.tanggal_penilaian_independen);
        $('#sertSlikKeteranganKembali').val(JaminanSlik.keterangan);
        if(JaminanSlik.kode_jenis_agunan != null){
            $('#sertSlikJenisAgunanKembali').append('<option value="'+JaminanSlik.kode_jenis_agunan+'" selected>' + JaminanSlik.SlikJenisAgunan + '</option>');
        }else { $('#sertSlikJenisAgunanKembali').append('<option value="" selected> Tidak Dipilih </option>'); }
        
        if(JaminanSlik.kode_lembaga_pemeringkat != null){
            $('#sertSlikLembagaPemeringkatKembali').append('<option value="'+JaminanSlik.kode_lembaga_pemeringkat+'" selected>' + JaminanSlik.SlikLembagaPemeringkat + '</option>');
        }else { $('#sertSlikLembagaPemeringkatKembali').append('<option value="" selected> Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_jenis_pengikatan != null){
            $('#sertSlikJenisPengikatanKembali').append('<option value="'+JaminanSlik.kode_jenis_pengikatan+'" selected>' + JaminanSlik.SlikJenisPengikatan + '</option>');
        }else { $('#sertSlikJenisPengikatanKembali').append('<option value="" selected>  Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_kab_kota != null && JaminanSlik.SlikKodeDati2 != null){
            $('#sertSlikKodeDati2Kembali').append('<option value="'+JaminanSlik.kode_kab_kota+'" selected>' + JaminanSlik.SlikKodeDati2 + '</option>');
        }else { $('#sertSlikKodeDati2Kembali').append('<option value="" selected> Tidak Dipilih </option>'); }
        
       
        

        if( JaminanSlik.kode_status_agunan == '1') {
            $('#sertSlikStatusAgunanKembali').append('<option value="1" selected>1 - Tersedia</option> <option value="2" >2 - Indent</option>');
        } else if(JaminanSlik.kode_status_agunan == '2'){
            $('#sertSlikStatusAgunanKembali').append('<option value="1" >1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
        }else{
            $('#sertSlikStatusAgunanKembali').append('<option value="1">1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
        }
        if( JaminanSlik.status_paripasu == 'Y') {
            $('#sertSlikParipasuKembali').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.status_paripasu == 'T'){
            $('#sertSlikParipasuKembali').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }else{
            $('#sertSlikParipasuKembali').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        }

        if( JaminanSlik.status_kredit_join == 'Y') {
            $('#sertSLikStatusJoinAccountKembali').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.status_kredit_join == 'T'){
            $('#sertSLikStatusJoinAccountKembali').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }else{
            $('#sertSLikStatusJoinAccountKembali').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        }

        if( JaminanSlik.diasuransikan == 'Y') {
            $('#sertSlikAsuransiKembali').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.diasuransikan == 'T'){
            $('#sertSlikAsuransiKembali').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }else{
            $('#sertSlikAsuransiKembali').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        }
   }    


}
function mappingFieldBPKBKembali(JaminanHeader, JaminanDokument, JaminanSlik){
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

       
       $('#bpkbSlikJenisAgunanKembali').find('option').remove().end();
       $('#bpkbSlikLembagaPemeringkatKembali').find('option').remove().end();
       $('#bpkbSlikJenisPengikatanKembali').find('option').remove().end();
       $('#bpkbSlikKodeDati2Kembali').find('option').remove().end();
  
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

    if(JaminanSlik != null){            
        $('#bpkbTglPenilaianPinjamKembali').val(JaminanSlik.tanggal_penilaian_independen);  
        $('#bpkbSlikPeringkatAgunanKembali').val(JaminanSlik.peringkat_agunan);  
        $('#bpkbSlikParipasuPersenKembali').val(JaminanSlik.prosentase_paripasu); 
        $('#bpkbSlikTanggalPengikatanKembali').val(JaminanSlik.tanggal_pengikatan); 
        $('#bpkbSlikNamaPemilikAgunanKembali').val(JaminanSlik.nama_pemilik_agunan);
        $('#bpkbSlikBuktiKepemilikanAgunanKembali').val(JaminanSlik.bukti_kepemilikan);
        $('#bpkbSlikAlamatKembali').val(JaminanSlik.alamat_agunan);
        $('#bpkbSlikNilaiNJOPKembali').val(JaminanSlik.nilai_agunan);
        $('#bpkbSlikNilaiLJKKembali').val(JaminanSlik.nilai_agunan_menurut_ljk);
        $('#bpkbSlikTanggalLJKKembali').val(JaminanSlik.tanggal_penilaian_ljk);
        $('#bpkbSlikNilaiIndependenKembali').val(JaminanSlik.nilai_agunan_penilai_independen);
        $('#bpkbSlikNamaIndependenKembali').val(JaminanSlik.nama_penilai_independen);
        $('#bpkbSlikTglIndependenKembali').val(JaminanSlik.tanggal_penilaian_independen);
        $('#bpkbSlikKeteranganKembali').val(JaminanSlik.keterangan);
        if(JaminanSlik.kode_jenis_agunan != ''){
            $('#bpkbSlikJenisAgunanKembali').append('<option value="'+JaminanSlik.kode_jenis_agunan+'" selected>' + JaminanSlik.SlikJenisAgunan + '</option>');
        }else { $('#bpkbSlikJenisAgunanKembali').append('<option value="" selected> Tidak Dipilih </option>'); }
        
        if(JaminanSlik.kode_lembaga_pemeringkat != ''){
            $('#bpkbSlikLembagaPemeringkatKembali').append('<option value="'+JaminanSlik.kode_lembaga_pemeringkat+'" selected>' + JaminanSlik.SlikLembagaPemeringkat + '</option>');
        }else { $('#bpkbSlikLembagaPemeringkatKembali').append('<option value="" selected> Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_jenis_pengikatan != ''){
            $('#bpkbSlikJenisPengikatanKembali').append('<option value="'+JaminanSlik.kode_jenis_pengikatan+'" selected>' + JaminanSlik.SlikJenisPengikatan + '</option>');
        }else { $('#bpkbSlikJenisPengikatanKembali').append('<option value="" selected>  Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_kab_kota != ''){
            $('#bpkbSlikKodeDati2Kembali').append('<option value="'+JaminanSlik.kode_kab_kota+'" selected>' + JaminanSlik.SlikKodeDati2 + '</option>');
        }else { $('#bpkbSlikKodeDati2Kembali').append('<option value="" selected> Tidak Dipilih </option>'); }
        
       
        

        if( JaminanSlik.kode_status_agunan == '1') {
            $('#bpkbSlikStatusAgunanKembali').append('<option value="1" selected>1 - Tersedia</option> <option value="2" >2 - Indent</option>');
        } else if(JaminanSlik.kode_status_agunan == '2'){
            $('#bpkbSlikStatusAgunanKembali').append('<option value="1" >1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
        }else{
            $('#bpkbSlikStatusAgunanKembali').append('<option value="1">1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
        }
        if( JaminanSlik.status_paripasu == 'Y') {
            $('#bpkbSlikParipasuKembali').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.status_paripasu == 'T'){
            $('#bpkbSlikParipasuKembali').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }else{
            $('#bpkbSlikParipasuKembali').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        }

        if( JaminanSlik.status_kredit_join == 'Y') {
            $('#bpkbSLikStatusJoinAccountKembali').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.status_kredit_join == 'T'){
            $('#bpkbSLikStatusJoinAccountKembali').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }else{
            $('#bpkbSLikStatusJoinAccountKembali').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        }

        if( JaminanSlik.diasuransikan == 'Y') {
            $('#bpkbSlikAsuransiKembali').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.diasuransikan == 'T'){
            $('#bpkbSlikAsuransiKembali').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }else{
            $('#bpkbSlikAsuransiKembali').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        }
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

function mappingFieldSertifikatPenyerahan(JaminanHeader, JaminanDokument, JaminanSlik){
   
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
     /// SLIK ///
     if(JaminanSlik != null){    
        $('#sertTglPenilaianPenyerahan').val(JaminanSlik.tanggal_penilaian_independen);        
        $('#sertSlikPeringkatAgunanPenyerahan').val(JaminanSlik.peringkat_agunan);  
        $('#sertSlikParipasuPersenPenyerahan').val(JaminanSlik.prosentase_paripasu); 
        $('#sertSlikTanggalPengikatanPenyerahan').val(JaminanSlik.tanggal_pengikatan); 
        $('#sertSlikNamaPemilikAgunanPenyerahan').val(JaminanSlik.nama_pemilik_agunan);
        $('#sertSlikBuktiKepemilikanAgunanPenyerahan').val(JaminanSlik.bukti_kepemilikan);
        $('#sertSlikAlamatPenyerahan').val(JaminanSlik.alamat_agunan);
        $('#sertSlikNilaiNJOPPenyerahan').val(JaminanSlik.nilai_agunan);
        $('#sertSlikNilaiLJKPenyerahan').val(JaminanSlik.nilai_agunan_menurut_ljk);
        $('#sertSlikTanggalLJKPenyerahan').val(JaminanSlik.tanggal_penilaian_ljk);
        $('#sertSlikNilaiIndependenPenyerahan').val(JaminanSlik.nilai_agunan_penilai_independen);
        $('#sertSlikNamaIndependenPenyerahan').val(JaminanSlik.nama_penilai_independen);
        $('#sertSlikTglIndependenPenyerahan').val(JaminanSlik.tanggal_penilaian_independen);
        $('#sertSlikKeteranganPenyerahan').val(JaminanSlik.keterangan);
        if(JaminanSlik.kode_jenis_agunan != null){
            $('#sertSlikJenisAgunanPenyerahan').append('<option value="'+JaminanSlik.kode_jenis_agunan+'" selected>' + JaminanSlik.SlikJenisAgunan + '</option>');
        }else { $('#sertSlikJenisAgunanPenyerahan').append('<option value="" selected> Tidak Dipilih </option>'); }
        
        if(JaminanSlik.kode_lembaga_pemeringkat != null){
            $('#sertSlikLembagaPemeringkatPenyerahan').append('<option value="'+JaminanSlik.kode_lembaga_pemeringkat+'" selected>' + JaminanSlik.SlikLembagaPemeringkat + '</option>');
        }else { $('#sertSlikLembagaPemeringkatPenyerahan').append('<option value="" selected> Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_jenis_pengikatan != null){
            $('#sertSlikJenisPengikatanPenyerahan').append('<option value="'+JaminanSlik.kode_jenis_pengikatan+'" selected>' + JaminanSlik.SlikJenisPengikatan + '</option>');
        }else { $('#sertSlikJenisPengikatanPenyerahan').append('<option value="" selected>  Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_kab_kota != null && JaminanSlik.SlikKodeDati2 != null){
            $('#sertSlikKodeDati2Penyerahan').append('<option value="'+JaminanSlik.kode_kab_kota+'" selected>' + JaminanSlik.SlikKodeDati2 + '</option>');
        }else { $('#sertSlikKodeDati2Penyerahan').append('<option value="" selected> Tidak Dipilih </option>'); }
        
       
        

        if( JaminanSlik.kode_status_agunan == '1') {
            $('#sertSlikStatusAgunanPenyerahan').append('<option value="1" selected>1 - Tersedia</option> <option value="2" >2 - Indent</option>');
        } else if(JaminanSlik.kode_status_agunan == '2'){
            $('#sertSlikStatusAgunanPenyerahan').append('<option value="1" >1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
        }else{
            $('#sertSlikStatusAgunanPenyerahan').append('<option value="1">1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
        }
        if( JaminanSlik.status_paripasu == 'Y') {
            $('#sertSlikParipasuPenyerahan').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.status_paripasu == 'T'){
            $('#sertSlikParipasuPenyerahan').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }else{
            $('#sertSlikParipasuPenyerahan').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        }

        if( JaminanSlik.status_kredit_join == 'Y') {
            $('#sertSLikStatusJoinAccountPenyerahan').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.status_kredit_join == 'T'){
            $('#sertSLikStatusJoinAccountPenyerahan').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }else{
            $('#sertSLikStatusJoinAccountPenyerahan').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        }

        if( JaminanSlik.diasuransikan == 'Y') {
            $('#sertSlikAsuransiPenyerahan').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.diasuransikan == 'T'){
            $('#sertSlikAsuransiPenyerahan').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }else{
            $('#sertSlikAsuransiPenyerahan').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        }
   }    
}
function mappingFieldBPKBPenyerahan(JaminanHeader, JaminanDokument, JaminanSlik){
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

      $('#bpkbSlikJenisAgunanPenyerahan').find('option').remove().end();
      $('#bpkbSlikLembagaPemeringkatPenyerahan').find('option').remove().end();
      $('#bpkbSlikJenisPengikatanPenyerahan').find('option').remove().end();
      $('#bpkbSlikKodeDati2Penyerahan').find('option').remove().end();
 
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
     if(JaminanSlik != null){      
        $('#bpkbTglPenilaianPinjamPenyerahan').val(JaminanSlik.tanggal_penilaian_independen);      
        $('#bpkbSlikPeringkatAgunanPenyerahan').val(JaminanSlik.peringkat_agunan);  
        $('#bpkbSlikParipasuPersenPenyerahan').val(JaminanSlik.prosentase_paripasu); 
        $('#bpkbSlikTanggalPengikatanPenyerahan').val(JaminanSlik.tanggal_pengikatan); 
        $('#bpkbSlikNamaPemilikAgunanPenyerahan').val(JaminanSlik.nama_pemilik_agunan);
        $('#bpkbSlikBuktiKepemilikanAgunanPenyerahan').val(JaminanSlik.bukti_kepemilikan);
        $('#bpkbSlikAlamatPenyerahan').val(JaminanSlik.alamat_agunan);
        $('#bpkbSlikNilaiNJOPPenyerahan').val(JaminanSlik.nilai_agunan);
        $('#bpkbSlikNilaiLJKPenyerahan').val(JaminanSlik.nilai_agunan_menurut_ljk);
        $('#bpkbSlikTanggalLJKPenyerahan').val(JaminanSlik.tanggal_penilaian_ljk);
        $('#bpkbSlikNilaiIndependenPenyerahan').val(JaminanSlik.nilai_agunan_penilai_independen);
        $('#bpkbSlikNamaIndependenPenyerahan').val(JaminanSlik.nama_penilai_independen);
        $('#bpkbSlikTglIndependenPenyerahan').val(JaminanSlik.tanggal_penilaian_independen);
        $('#bpkbSlikKeteranganPenyerahan').val(JaminanSlik.keterangan);
        if(JaminanSlik.kode_jenis_agunan != ''){
            $('#bpkbSlikJenisAgunanPenyerahan').append('<option value="'+JaminanSlik.kode_jenis_agunan+'" selected>' + JaminanSlik.SlikJenisAgunan + '</option>');
        }else { $('#bpkbSlikJenisAgunanPenyerahan').append('<option value="'+JaminanSlik.kode_jenis_agunan+'" selected> Tidak Dipilih </option>'); }
        
        if(JaminanSlik.kode_lembaga_pemeringkat != ''){
            $('#bpkbSlikLembagaPemeringkatPenyerahan').append('<option value="'+JaminanSlik.kode_lembaga_pemeringkat+'" selected>' + JaminanSlik.SlikLembagaPemeringkat + '</option>');
        }else { $('#bpkbSlikLembagaPemeringkatPenyerahan').append('<option value="'+JaminanSlik.kode_lembaga_pemeringkat+'" selected> Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_jenis_pengikatan != ''){
            $('#bpkbSlikJenisPengikatanPenyerahan').append('<option value="'+JaminanSlik.kode_jenis_pengikatan+'" selected>' + JaminanSlik.SlikJenisPengikatan + '</option>');
        }else { $('#bpkbSlikJenisPengikatanPenyerahan').append('<option value="'+JaminanSlik.kode_jenis_pengikatan+'" selected>  Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_kab_kota != ''){
            $('#bpkbSlikKodeDati2Penyerahan').append('<option value="'+JaminanSlik.kode_kab_kota+'" selected>' + JaminanSlik.SlikKodeDati2 + '</option>');
        }else { $('#bpkbSlikKodeDati2Penyerahan').append('<option value="'+JaminanSlik.kode_kab_kota+'" selected> Tidak Dipilih </option>'); }
        
       
        

        if( JaminanSlik.kode_status_agunan == '1') {
            $('#bpkbSlikStatusAgunanPenyerahan').append('<option value="1" selected>1 - Tersedia</option> <option value="2" >2 - Indent</option>');
        } else if(JaminanSlik.kode_status_agunan == '2'){
            $('#bpkbSlikStatusAgunanPenyerahan').append('<option value="1" >1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
        }else{
            $('#bpkbSlikStatusAgunanPenyerahan').append('<option value="1">1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
        }
        if( JaminanSlik.status_paripasu == 'Y') {
            $('#bpkbSlikParipasuPenyerahan').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.status_paripasu == 'T'){
            $('#bpkbSlikParipasuPenyerahan').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }else{
            $('#bpkbSlikParipasuPenyerahan').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        }

        if( JaminanSlik.status_kredit_join == 'Y') {
            $('#bpkbSLikStatusJoinAccountPenyerahan').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.status_kredit_join == 'T'){
            $('#bpkbSLikStatusJoinAccountPenyerahan').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }else{
            $('#bpkbSLikStatusJoinAccountPenyerahan').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        }

        if( JaminanSlik.diasuransikan == 'Y') {
            $('#bpkbSlikAsuransiPenyerahan').append('<option value="T" >T</option> <option value="Y" selected>Y</option>');
        } else if(JaminanSlik.diasuransikan == 'T'){
            $('#bpkbSlikAsuransiPenyerahan').append('<option value="T" selected>T</option> <option value="Y">Y</option>');
        }else{
            $('#bpkbSlikAsuransiPenyerahan').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        }
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
        url : base_url + "AsetDokumenUpdateController/updateDataSertifikat",
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
                "check_ssb_bpht"         : sert_ssb_check,
                "sertSlikPeringkatAgunan"        : $('#sertSlikPeringkatAgunan').val(), 
                "sertSlikParipasuPersen"         : $('#sertSlikParipasuPersen').val(),
                "sertSlikTanggalPengikatan"      : $('#sertSlikTanggalPengikatan').val(), 
                "sertSlikNamaPemilikAgunan"      : $('#sertSlikNamaPemilikAgunan').val(),
                "sertSlikBuktiKepemilikanAgunan" : $('#sertSlikBuktiKepemilikanAgunan').val(),
                "sertSlikAlamat"                 : $('#sertSlikAlamat').val(),
                "sertSlikNilaiNJOP"              : $('#sertSlikNilaiNJOP').val(),
                "sertSlikNilaiLJK"               : $('#sertSlikNilaiLJK').val(),
                "sertSlikTanggalLJK"             : $('#sertSlikTanggalLJK').val(),
                "sertSlikNilaiIndependen"        : $('#sertSlikNilaiIndependen').val(),
                "sertSlikNamaIndependen"         : $('#sertSlikNamaIndependen').val(),
                "sertSlikTglIndependen"          : $('#sertSlikTglIndependen').val(),
                "sertSlikKeterangan"             : $('#sertSlikKeterangan').val(),
                "sertSlikJenisAgunan"            : $('#sertSlikJenisAgunan').val(),
                "sertSlikLembagaPemeringkat"     : $('#sertSlikLembagaPemeringkat').val(),
                "sertSlikJenisPengikatan"        : $('#sertSlikJenisPengikatan').val(),
                "sertSlikKodeDati2"              : $('#sertSlikKodeDati2').val(),
                "sertSlikStatusAgunan"           : $('#sertSlikStatusAgunan').val(),
                "sertSlikParipasu"               : $('#sertSlikParipasu').val(),
                "sertSLikStatusJoinAccount"      : $('#sertSLikStatusJoinAccount').val(),
                "sertSlikAsuransi"               : $('#sertSlikAsuransi').val()
            },

        success : function(response) {
            alert('Data Sukses Di Update');
            if( menuAsset == '1'){
                window.location = base_url + 'AsetDokumenEntryController/index';
            }else if( menuAsset == '2'){
                window.location = base_url + 'AsetDokumenViewAsetController/index';
            }
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Data Gagal Update Data');
            $('#loading1').hide();
            if( menuAsset == '1'){
                window.location = base_url + 'AsetDokumenEntryController/index';
            }else if( menuAsset == '2'){
                window.location = base_url + 'AsetDokumenViewAsetController/index';
            }
        }
    });    
}
function updateBPKB(){
    $('#loading1').show();
    $('#loading').show();
    checkBPKB();
    
    $.ajax({
        url : base_url + "AsetDokumenUpdateController/updateBPKB",
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
                "check_sk_trayek"             : bpkb_check_skt,
                "bpkbSlikPeringkatAgunan"        : $('#bpkbSlikPeringkatAgunan').val(), 
                "bpkbSlikParipasuPersen"         : $('#bpkbSlikParipasuPersen').val(),
                "bpkbSlikTanggalPengikatan"      : $('#bpkbSlikTanggalPengikatan').val(), 
                "bpkbSlikNamaPemilikAgunan"      : $('#bpkbSlikNamaPemilikAgunan').val(),
                "bpkbSlikBuktiKepemilikanAgunan" : $('#bpkbSlikBuktiKepemilikanAgunan').val(),
                "bpkbSlikAlamat"                 : $('#bpkbSlikAlamat').val(),
                "bpkbSlikNilaiNJOP"              : $('#bpkbSlikNilaiNJOP').val(),
                "bpkbSlikNilaiLJK"               : $('#bpkbSlikNilaiLJK').val(),
                "bpkbSlikTanggalLJK"             : $('#bpkbSlikTanggalLJK').val(),
                "bpkbSlikNilaiIndependen"        : $('#bpkbSlikNilaiIndependen').val(),
                "bpkbSlikNamaIndependen"         : $('#bpkbSlikNamaIndependen').val(),
                "bpkbSlikTglIndependen"          : $('#bpkbSlikTglIndependen').val(),
                "bpkbSlikKeterangan"             : $('#bpkbSlikKeterangan').val(),
                "bpkbSlikJenisAgunan"            : $('#bpkbSlikJenisAgunan').val(),
                "bpkbSlikLembagaPemeringkat"     : $('#bpkbSlikLembagaPemeringkat').val(),
                "bpkbSlikJenisPengikatan"        : $('#bpkbSlikJenisPengikatan').val(),
                "bpkbSlikKodeDati2"              : $('#bpkbSlikKodeDati2').val(),
                "bpkbSlikStatusAgunan"           : $('#bpkbSlikStatusAgunan').val(),
                "bpkbSlikParipasu"               : $('#bpkbSlikParipasu').val(),
                "bpkbSLikStatusJoinAccount"      : $('#bpkbSLikStatusJoinAccount').val(),
                "bpkbSlikAsuransi"               : $('#bpkbSlikAsuransi').val()
               },
        success : function(response) {
            alert('Data Sukses Di Update');
            $('#loading1').hide();
            if( menuAsset == '1'){
                window.location = base_url + 'AsetDokumenEntryController/index';
            }else if( menuAsset == '2'){
                window.location = base_url + 'AsetDokumenViewAsetController/index';
            }
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Data Gagal Di Update');
            $('#loading').hide();
            if( menuAsset == '1'){
                window.location = base_url + 'AsetDokumenEntryController/index';
            }else if( menuAsset == '2'){
                window.location = base_url + 'AsetDokumenViewAsetController/index';
            }
        }
    });    

}
function updateEmas(){
    $('#loading').show();
    $('#loading1').show();
    $.ajax({
        url : base_url + "AsetDokumenUpdateController/updateEmas",
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
            alert('Data Sukses Di Update');
            $('#loading').hide();
            if( menuAsset == '1'){
                window.location = base_url + 'AsetDokumenEntryController/index';
            }else if( menuAsset == '2'){
                window.location = base_url + 'AsetDokumenViewAsetController/index';
            } 
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Data Gagal Di Update');
            $('#loading').hide();
            if( menuAsset == '1'){
                window.location = base_url + 'AsetDokumenEntryController/index';
            }else if( menuAsset == '2'){
                window.location = base_url + 'AsetDokumenViewAsetController/index';
            }
        }
    });    
}
function deleteFunction() {
    $('#loading').show();
    $.ajax({
        url : base_url + "AsetDokumenEntryController/deleteDataDokumen",
        type : "POST",
        dataType : "json",
        data : {"nomorAgunan"    : nomor, 
                "nomorRefAgunan" : noref,
                "dataStatus"     : status,
                "agunanID"       : idAgunan},

        success : function(response) {
            alert('Data Sukses Di Delete');
            $('#loading').hide();
            window.location = base_url + 'AsetDokumenEntryController/index';  
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Data Gagal Di Delete');
            $('#loading').hide();
            window.location = base_url + 'AsetDokumenEntryController/index';
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
    $('#loading').show(); 

    $.ajax({
            url : base_url + "AsetDokumenEntryController/getDataSearchA",
            type : "POST",
            dataType : "json",
            timeout : 300000,
            data : {"search"    : search,
                    "status"    : status,
                    "kode_kantor" : kode_kantor,
                    "jenis"     : jenis
                    },

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
                alert('Gagal Get Data, Mohon Periksa Jaringan Anda!');
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
    $('#loading').show(); 

    $.ajax({
            url : base_url + "AsetDokumenEntryController/getDataSearchB",
            type : "POST",
            dataType : "json",
            timeout : 300000,
            data : {"search"    : search,
                    "status"    : status,
                    "kode_kantor" : kode_kantor,
                    "jenis"     : jenis
                    },

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
                if(status == 'IN TRANSIT'){
                    $(".btnCetaks").hide(); 
                    $(".btnDelete").hide(); 
                    $(".btnKembaliDokumen").hide(); 
                    $(".btnDueDate").hide(); 
                    $(".btnPenyerahan").hide(); 
                    $(".btnPinjam").hide(); 
                    
                }
                
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
    $('#loading7').show(); 

    //// bareng pakai function search nya di controller Aset Dokumen Entry
    $.ajax({
            url : base_url + "AsetDokumenEntryController/getDataSearchRekening",
            type : "POST",
            dataType : "json",
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
                $('#loading7').hide(); 
                
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Data Tidak Ditemukan');
            }
    });    
}

function loadDataAwal(){
    dataTableeee = [];
    $('#loading').show(); 

    $.ajax({
            url : base_url + "AsetDokumenEntryController/getListAsetDokumen",
            type : "POST",
            dataType : "json",
            timeout : 180000,
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
                        "paging":   false,
                        "aaSorting" : []
                    } );
                } );
                $('#loading').hide();  
                
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Gagal Get Data, Mohon Periksa Jaringan Anda');
                $('#loading').hide();
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
            url : base_url + "AsetDokumenUpdateController/uploadCoverNotes",
            type : "POST",
            data : new FormData(this),
            contentType: false,
            cache: false,
            processData: false,     
            success : function(response) {
               $("#imgCoverNotes").attr('src',"asd");
               $("#imgCoverNotes2").attr("href", "ads");
               $("#loading6").hide();
               
               alert("Upload cover notes sukses, anda bisa mengubah due date");
               $("#imgCoverNotes").attr('src',response);
               $("#imgCoverNotes2").attr("href", response);
               $('#btn_simpan_dueDate_modal').prop("disabled", false);
               
            },
            error : function(response) {
                console.log(response);
                alert(response);
            }
        }); 
    }
});

function get_kode_kantor(){
    $.ajax({
            url : base_url + "AsetDokumenEntryController/get_kode_kantor",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
                $.each(response.kode_kantor,function(i,data){
                    $('#kode_kantor').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
                });
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                alert('Gagal Get Data, Mohon Periksa Jaringan Anda');
                
            }
    });    
}

function peminjaman_dokument(){
    $('#loading').show();
    $('#loading2').show();
    $.ajax({
        url : base_url + "AsetDokumenPinjamController/pinjamData",
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
            alert('Peminjaman Data Sukses');
            $('#loading').hide();
            window.location = base_url + 'AsetDokumenEntryController/index';  
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Gagal Melakukan Peminjaman Data');
            $('#loading').hide();
            window.location = base_url + 'AsetDokumenEntryController/index';
        }
    }); 
}