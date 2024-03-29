var nomor = '';
var noref = '';
var status = '';
var id = '';
var agunanID = '';
var JaminanHeader = '';
var JaminanDokument = '';
var JaminanSlik = '';
var idHeader = '';
var nomorHeader = '';
var noRefHeader = '';
var verifHeader = '';
var idDokument = '';
var varIdAgunanDokument = '';
var nomorDokument = '';
var verifDokument = '';
var dataTableeee = [];

var jenis_verifikasi0 = '<option value="0">0</option>'; 
var jenis_verifikasi1 = '<option value="1">1</option>';
var base_url = $('#base_url').val();
var user_kode_kantor = $('#user_kode_kantor').val();
var user_divisi_id = $('#user_divisi_id').val();

$(document).ready(function () {     
   
    loadDataAwal();
    $('.select2').select2();
    $('#kode_kantor').append('<option value="' + user_kode_kantor + '" selected>'+ user_kode_kantor +'</option>');
    if(user_kode_kantor == '00' || user_divisi_id == 'IT'){
        get_kode_kantor();
    }
    
});

$('#bodyTableVerif').on('click','.btnVerifikasi', function () {
    nomor = $(this).data("nomor");
    noref = $(this).data("noref");
    status = $(this).data("status");
    id =  $(this).data("id"); //id header
    agunanID = $(this).data("agunanid");

    $('#mainVerifikasiModal').modal('show');

    $('#mainVerifikasi').find('option').remove().end();

    $('#loading1').show();
    $.ajax({
        url : base_url + "AsetDokumenVerifikasiController/displayDetails",
        type : "POST",
        dataType : "json",
        data : {"nomorAgunan"    : nomor, 
                "nomorRefAgunan" : noref,
                "dataStatus"     : status,
                "agunanID"       : agunanID},

        success : function(response) {

            JaminanHeader   = response.getJaminanHeader[0];
            JaminanDokument = response.getJaminanDokument[0];
            JaminanSlik     = response.getJaminanSLIK[0];

            //MAIN FORM
            $('#mainAreaKerja').append('<option value="' + JaminanHeader.kode_kantor + '" selected>'+ JaminanHeader.kode_kantor + ' - ' + JaminanHeader.nama_kantor +'</option>');
            $('#mainTransaksi').append('<option value="' + JaminanHeader.status + '" selected>'+ JaminanHeader.status + '</option>');
            $('#mainTanggal').val(JaminanHeader.tgl);
            $('#mainNama').val(JaminanHeader.nama); 
            $('#mainKeterangan').val(JaminanHeader.ket);  
            $('#mainAlamat').val(JaminanHeader.alamat);   
            $('#mainKota').val(JaminanHeader.kota);  
            $('#mainJenisPengurusan').val(JaminanHeader.jenis_pengurusan);
            $('#mainNomorRekening').val(JaminanHeader.no_rekening);
            $('#mainId').val(JaminanHeader.id);
            $('#mainNomor').val(JaminanHeader.nomor);
            $('#mainNoReff').val(JaminanHeader.no_reff);
            $('#mainVerifikasi').append('<option value="' + JaminanHeader.verifikasi + '" selected>' + JaminanHeader.verifikasi  + '</option>');
            if(JaminanHeader.verifikasi == '0'){
                $('#mainVerifikasi').append(jenis_verifikasi1);
            }else if(JaminanHeader.verifikasi == '1'){
                $('#mainVerifikasi').append(jenis_verifikasi0);
            }
           
            if(JaminanHeader.jenis_jaminan == 'SERTIFIKAT'){
               mappingFieldSertifikat(JaminanHeader,JaminanDokument, JaminanSlik);               
            } 
            else if(JaminanHeader.jenis_jaminan == 'BPKB'){
                mappingFieldBPKB(JaminanHeader,JaminanDokument, JaminanSlik);
            }
            else if(JaminanHeader.jenis_jaminan == 'EMAS'){
                mappingFieldEmas(JaminanHeader,JaminanDokument);
            }

            $('#loading1').hide(); 
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Gagal get Details');
            $('#loading1').hide();
            window.location = base_url + 'AsetDokumenVerifikasiController/index';
        }
    });  
});

//main
$('#btn_kembali_verifikasi_modal').click(function () { 
    $('#mainVerifikasiModal').modal('hide'); 
});
$('#btn_kembali_verifikasi_modal2').click(function () {
    $('#mainVerifikasiModal').modal('hide'); 
});
//sertifikat
$('#sert_button_kembali').click(function () {
    mappingFieldSertifikat(JaminanHeader,JaminanDokument, JaminanSlik);
    $('#verifikasiSertifikat').modal('hide');
});
$('#sert_button_kembali2').click(function () {
    mappingFieldSertifikat(JaminanHeader,JaminanDokument, JaminanSlik);
    $('#verifikasiSertifikat').modal('hide');
});
$('#sert_button_simpan').click(function () {
    $('#verifikasiSertifikat').modal('hide');
});
//bpkb
$('#bpkb_button_simpan').click(function () {
    $('#verifikasiBPKB').modal('hide');
});
$('#bpkb_button_kembali').click(function () {
    mappingFieldBPKB(JaminanHeader,JaminanDokument);
    $('#verifikasiBPKB').modal('hide');
});
$('#bpkb_button_kembali2').click(function () {
    mappingFieldBPKB(JaminanHeader,JaminanDokument);
    $('#verifikasiBPKB').modal('hide');
});
//emas
$('#emas_button_simpan').click(function () {
    $('#verifikasiEmas').modal('hide');
});
$('#emas_button_kembali').click(function () {
    mappingFieldEmas(JaminanHeader,JaminanDokument);
    $('#verifikasiEmas').modal('hide');
});
$('#emas_button_kembali2').click(function () {
    mappingFieldEmas(JaminanHeader,JaminanDokument);
    $('#verifikasiEmas').modal('hide');
});

$('#btn_simpan_verifikasi_modal').click(function () {
   
    if(JaminanHeader.jenis_jaminan == 'SERTIFIKAT'){
        verifikasiHeader();
    } 
    else if(JaminanHeader.jenis_jaminan == 'BPKB'){
        verifikasiHeader();
    }
    else if(JaminanHeader.jenis_jaminan == 'EMAS'){
        verifikasiHeader();
    }

    // $('#mainUpdateModal').modal('hide');
});


function mappingFieldSertifikat(JaminanHeader,JaminanDokument, JaminanSlik){
    //sert
    $('#sertKantorLokasi').find('option').remove().end();
    $('#sertKodeJenisAgunan').find('option').remove().end();
    $('#sertJenisSertifikat').find('option').remove().end();
    $('#sertVerifikasi').find('option').remove().end();
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
    
    if(JaminanDokument.verifikasi == '0'){
        $('#sertVerifikasi').append(jenis_verifikasi1);
    }else if(JaminanDokument.verifikasi == '1'){
        $('#sertVerifikasi').append(jenis_verifikasi0);
    }



    // sertifikat 
    $('#sertTglRegister').val(JaminanDokument.tgl_register);
    // sertTglPenilaian ini di SID belum di bikin
    $('#sertKantorLokasi').append('<option value="' + JaminanDokument.kode_kantor_lokasi_jaminan + '" selected>'+ JaminanDokument.app_kode_kantor + ' - ' + JaminanDokument.app_nama_kantor +'</option>'); 
    $('#sertKodeJenisAgunan').append('<option value="' + JaminanDokument.jenis_agunan_detail + '" selected>' + JaminanDokument.KKJA_jenis_agunan +'</option>'); 
    $('#sertKodeIkatanAgunan').append('<option value="' + JaminanDokument.ikatan_agunan_detail + '" data-persen="'+ JaminanDokument.ikatan_persen_default +'" selected>' + JaminanDokument.ikatan_agunan +'</option>');
    $('#sertVerifikasi').append('<option value="' + JaminanDokument.verifikasi + '" selected>' + JaminanDokument.verifikasi +'</option>'); 
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


    $('#rowSertAgunanID').html(JaminanDokument.agunan_id);
    $('#rowSertTanggal').html(JaminanDokument.tgl_sertifikat);
    $('#rowSertLuasTanah').html(JaminanDokument.luas_tanah);
    $('#rowSertPemilik').html(JaminanDokument.nama_pemilik_sertifikat);
    $('#rowSertVerif').html(JaminanDokument.verifikasi);
    // $('#rowSertNoSertif').html(JaminanDokument.no_sht);
    // $('#rowSertJenis').html(JaminanDokument.sertJenisSertifikat);

    $('#main_tab_bpkb').hide(); 
    $('#main_tab_emas').hide(); 
    $('#main_tab_sert').show();

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
    }
    if(JaminanDokument.imb == 'Y'){
        $("#check_imb").prop("checked", true);
    }
    else{
        $("#check_imb").prop("checked", false);
    }
    if(JaminanDokument.sppt == 'Y'){
        $("#check_sppt").prop("checked", true);
    }
    else{
        $("#check_sppt").prop("checked", false);
    }
    if(JaminanDokument.skmht == 'Y'){
        $("#check_skmht").prop("checked", true);
    }
    else{
        $("#check_skmht").prop("checked", false);
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
    }
    if(JaminanDokument.ssb == 'Y'){
        $("#check_ssb_bpht").prop("checked", true);
    }
    else{
        $("#check_ssb_bpht").prop("checked", false);
    }

    /// SLIK ///
    if(JaminanSlik != null){    
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
        if(JaminanSlik.kode_jenis_agunan != ''){
            $('#sertSlikJenisAgunan').append('<option value="'+JaminanSlik.kode_jenis_agunan+'" selected>' + JaminanSlik.SlikJenisAgunan + '</option>');
        }else { $('#sertSlikJenisAgunan').append('<option value="'+JaminanSlik.kode_jenis_agunan+'" selected> Tidak Dipilih </option>'); }
        
        if(JaminanSlik.kode_lembaga_pemeringkat != ''){
            $('#sertSlikLembagaPemeringkat').append('<option value="'+JaminanSlik.kode_lembaga_pemeringkat+'" selected>' + JaminanSlik.SlikLembagaPemeringkat + '</option>');
        }else { $('#sertSlikLembagaPemeringkat').append('<option value="'+JaminanSlik.kode_lembaga_pemeringkat+'" selected> Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_jenis_pengikatan != ''){
            $('#sertSlikJenisPengikatan').append('<option value="'+JaminanSlik.kode_jenis_pengikatan+'" selected>' + JaminanSlik.SlikJenisPengikatan + '</option>');
        }else { $('#sertSlikJenisPengikatan').append('<option value="'+JaminanSlik.kode_jenis_pengikatan+'" selected>  Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_kab_kota != ''){
            $('#sertSlikKodeDati2').append('<option value="'+JaminanSlik.kode_kab_kota+'" selected>' + JaminanSlik.SlikKodeDati2 + '</option>');
        }else { $('#sertSlikKodeDati2').append('<option value="'+JaminanSlik.kode_kab_kota+'" selected> Tidak Dipilih </option>'); }
        
    
        

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
    
}
function mappingFieldBPKB(JaminanHeader,JaminanDokument){
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
     $('#bpkbVerifikasi').find('option').remove().end();

     
     // remove asli dok bpkb
     $('#bpkbDokKwitansiBlanko').find('option').remove().end();
     $('#bpkbDokFakturPemilik').find('option').remove().end();
     $('#bpkbDokKwJualBeli').find('option').remove().end();
     $('#bpkbDokSKTrayek').find('option').remove().end();
     

    if(JaminanDokument.verifikasi == '0'){
        $('#bpkbVerifikasi').append(jenis_verifikasi1);
    }else if(JaminanDokument.verifikasi == '1'){
        $('#bpkbVerifikasi').append(jenis_verifikasi0);
    }

    ///untuk bpkb
    $('#bpkbTglRegister').val(JaminanDokument.tgl_register);
    //bpkbTglPenilaian tgl penilaian dari SID belum di develop
    $('#bpkbKantorLokasi').append('<option value="' + JaminanDokument.kode_kantor_lokasi_jaminan + '" selected>'+ JaminanDokument.app_kode_kantor + ' - ' + JaminanDokument.app_nama_kantor +'</option>'); 
    $('#bpkbKodeJenisAgunan').append('<option value="' + JaminanDokument.jenis_agunan_detail + '" selected>' + JaminanDokument.KKJA_jenis_agunan +'</option>'); 
    $('#bpkbKodeIkatanAgunan').append('<option value="' + JaminanDokument.ikatan_agunan_detail + '" data-persen="'+ JaminanDokument.ikatan_persen_default +'" selected>' + JaminanDokument.ikatan_agunan +'</option>')
    $('#bpkbVerifikasi').append('<option value="' + JaminanDokument.verifikasi + '" selected>' + JaminanDokument.verifikasi +'</option>'); 
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

    $('#rowBPKBAgunanID').html(JaminanDokument.agunan_id);
    $('#rowBPKBNoBpkb').html(JaminanDokument.nomor_bpkb);
    $('#rowBPKBNamaPemilik').html(JaminanDokument.nama_bpkb);
    $('#rowBPKBAlamat').html(JaminanDokument.alamat_bpkb);
    $('#rowBPKBNoPolisi').html(JaminanDokument.no_polisi);
    $('#rowBPKBVerif').html(JaminanDokument.verifikasi);
    
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
    }

    /// SLIK ///
    if(JaminanSlik != null){                 
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
        }else { $('#sertSlikJenisAgunan').append('<option value="'+JaminanSlik.kode_jenis_agunan+'" selected> Tidak Dipilih </option>'); }
        
        if(JaminanSlik.kode_lembaga_pemeringkat != ''){
            $('#bpkbSlikLembagaPemeringkat').append('<option value="'+JaminanSlik.kode_lembaga_pemeringkat+'" selected>' + JaminanSlik.SlikLembagaPemeringkat + '</option>');
        }else { $('#bpkbSlikLembagaPemeringkat').append('<option value="'+JaminanSlik.kode_lembaga_pemeringkat+'" selected> Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_jenis_pengikatan != ''){
            $('#bpkbSlikJenisPengikatan').append('<option value="'+JaminanSlik.kode_jenis_pengikatan+'" selected>' + JaminanSlik.SlikJenisPengikatan + '</option>');
        }else { $('#bpkbSlikJenisPengikatan').append('<option value="'+JaminanSlik.kode_jenis_pengikatan+'" selected>  Tidak Dipilih </option>'); }

        if(JaminanSlik.kode_kab_kota != ''){
            $('#bpkbSlikKodeDati2').append('<option value="'+JaminanSlik.kode_kab_kota+'" selected>' + JaminanSlik.SlikKodeDati2 + '</option>');
        }else { $('#bpkbSlikKodeDati2').append('<option value="'+JaminanSlik.kode_kab_kota+'" selected> Tidak Dipilih </option>'); }
        
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

        $('#bpkbSlikStatusAgunan').append('<option value="1">1 - Tersedia</option> <option value="2" selected>2 - Indent</option>');
        $('#bpkbSlikParipasu').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        $('#bpkbSLikStatusJoinAccount').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        $('#bpkbSlikAsuransi').append('<option value="T">T</option> <option value="Y" selected>Y</option>');
        
    
}
function mappingFieldEmas(JaminanHeader,JaminanDokument){
    $('#main_tab_sert').hide(); 
    $('#main_tab_bpkb').hide();
    $('#main_tab_emas').show();
    //remove jenis emas
    $('#emasJenisEmas').find('option').remove().end();
    $('#emasVerifikasi').find('option').remove().end();

    if(JaminanDokument.verifikasi == '0'){
        $('#emasVerifikasi').append(jenis_verifikasi1);
    }else if(JaminanDokument.verifikasi == '1'){
        $('#emasVerifikasi').append(jenis_verifikasi0);
    }


    $('#emasVerifikasi').append('<option value="' + JaminanDokument.verifikasi + '" selected>' + JaminanDokument.verifikasi +'</option>'); 
    $('#emasAgunanID').val(JaminanDokument.agunan_id); 
    $('#emasNoSeri').val(JaminanDokument.no_seri); 
    $('#emasJenisEmas').append('<option value="' + JaminanDokument.jenis_emas + '" selected>'+ JaminanDokument.jenis_emas + '</option>');
    $('#emasKarat').val(JaminanDokument.karat); 
    $('#emasBerat').val(JaminanDokument.berat); 
    $('#emasHargaPasar').val(JaminanDokument.harga_pasar); 
    $('#emasHargaTaksasi').val(JaminanDokument.harga_taksasi); 
    $('#emasID').val(JaminanDokument.id); 
    $('#emasNoReff').val(JaminanDokument.no_reff); 

    $('#rowEmasAgunanID').html(JaminanDokument.agunan_id);
    $('#rowEmasNoSeri').html(JaminanDokument.no_seri); 
    $('#rowEmasJenis').html(JaminanDokument.jenis_emas); 
    $('#rowEmasKarat').html(JaminanDokument.karat); 
    $('#rowEmasGram').html(JaminanDokument.berat); 
    $('#rowEmasHargaPasar').html(JaminanDokument.harga_pasar);
    $('#rowEmasVerif').html(JaminanDokument.verifikasi);
}

function verifikasiHeader(){    
    idHeader            = $('#mainId').val();
    nomorHeader         =  $('#mainNomor').val();
    noRefHeader         =  $('#mainNoReff').val();
    verifHeader         = $('#mainVerifikasi').val();
    if(JaminanHeader.jenis_jaminan == 'SERTIFIKAT'){
        idDokument          = $('#sertID').val();
        varIdAgunanDokument = $('#sertAgunanID').val();
        verifDokument       = $('#sertVerifikasi').val();            
     } 
     else if(JaminanHeader.jenis_jaminan == 'BPKB'){
        idDokument          = $('#bpkbID').val(); 
        varIdAgunanDokument = $('#bpkbAgunanID').val();   
        verifDokument       = $('#bpkbVerifikasi').val(); 
     }
     else if(JaminanHeader.jenis_jaminan == 'EMAS'){
        idDokument          = $('#emasID').val();
        varIdAgunanDokument = $('#emasAgunanID').val();   
        verifDokument       = $('#emasVerifikasi').val(); 
     }

    $('#mainVerifikasiModal').scrollTop(0); 
    $('#loading1').show();   
    $('#loading').show();   
    $("#btn_kembali_verifikasi_modal").prop("disabled", true);
    $("#btn_simpan_verifikasi_modal").prop("disabled", true);

    $.ajax({
        url : base_url + "AsetDokumenVerifikasiController/verifikasi",
        type : "POST",
        dataType : "json",
        data : {"idHeader"            : idHeader, 
                "nomorHeader"         : nomorHeader,
                "noRefHeader"         : noRefHeader,
                "verifHeader"         : verifHeader,
                "idDokument"          : idDokument,
                "varIdAgunanDokument" : varIdAgunanDokument,
                "verifDokument"       : verifDokument
            },

        success : function(response) {
            alert('Data Verifikasi Sukses');
            window.location = base_url + 'AsetDokumenVerifikasiController/index';  
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Data Gagal Di Verifikasi');
            window.location = base_url + 'AsetDokumenVerifikasiController/index';
        }
    });    
}
function serchDataVerif(){
    $('#employeeTable').DataTable().clear();
    $('#employeeTable').DataTable().destroy();
    var search = $('#search').val(); 
    var status = $('#status').val();  
    var kode_kantor = $('#kode_kantor').val();
    dataTableeee = [];
    $('#loading').show(); 

    $.ajax({
            url : base_url + "AsetDokumenVerifikasiController/getDataSearch",
            type : "POST",
            dataType : "json",
            data : {"search"    : search,
                    "status"    : status,
                    "kode_kantor" : kode_kantor
                    },

            success : function(response) {                        
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
                alert('Data Tidak Ditemukan');
                window.location = base_url + 'AsetDokumenVerifikasiController/index';
            }
    });    
}

function loadDataAwal(){
    dataTableeee = [];
    $('#loading').show(); 

    $.ajax({
            url : base_url + "AsetDokumenVerifikasiController/getDataAwal",
            type : "POST",
            dataType : "json",
            timeout : 180000,

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
                        "paging":   true,
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
function get_kode_kantor(){
    $.ajax({
            url : base_url + "AsetDokumenVerifikasiController/get_kode_kantor",
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