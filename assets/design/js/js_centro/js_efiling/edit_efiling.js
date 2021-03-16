
// Upload File Efiling
function getImg(evt) {
  let token = localStorage.getItem("token");
  let menu_title = $('form').find('#menu_page').val()
  let idFile = evt.target.getAttribute('id');
  Swal.fire({
    title: 'Apakah Anda Yakin Ingin Upload File ini ?',
    showCancelButton: true,
    confirmButtonText: `Simpan`,
    icon: 'question',
  }).then((result) => {
    if (result.value) {
      let fd = new FormData();
      let files = evt.target.files[0];
      let no_rekening = evt.target.getAttribute('no_rekening');
      let is_jenis = evt.target.getAttribute('is_jenis');
      let file_name = ''

      /*Start Menu Nasabah --------------------------------------------------------*/ //done
      if (idFile == 'ktp_all') {
        file_name = 'lampiran_ktp[]'
      }
      if (idFile == 'kartu_keluarga') {
        file_name = 'lampiran_kk[]'
      }
      if (idFile == 'inp_npwp') {
        file_name = 'lampiran_npwp[]'
      }
      if (idFile == 'surat_nikah') {
        file_name = 'surat_nikah[]'
      }
      if (idFile == 'surat_cerai') {
        file_name = 'surat_cerai[]'
      }
      if (idFile == 'surat_lahir') {
        file_name = 'surat_lahir[]'
      }
      if (idFile == 'surat_kematian') {
        file_name = 'surat_kematian[]'
      }
      if (idFile == 'surat_keterangan_desa') {
        file_name = 'skd[]'
      }
      if (idFile == 'slip_gaji') {
        file_name = 'slipgaji[]'
      }
      if (idFile == 'take_over') {
        file_name = 'take_over[]'
      }
      if (idFile == 'surat_keterangan_kerja') {
        file_name = 'skk[]'
      }
      if (idFile == 'surat_keterangan_usaha') {
        file_name = 'sku[]'
      }
      if (idFile == 'rekening_koran') {
        file_name = 'rek_koran[]'
      }
      if (idFile == 'tdp_siup') {
        file_name = 'tdp[]'
      }
      if (idFile == 'bon_usaha') {
        file_name = 'bon_usaha[]'
      }
      /*End Menu Nasabah ----------------------------------------------------------*/
      /*Start Menu Permohonan -----------------------------------------------------*/ //done
      if (idFile == 'aplikasi_permohonan_kredit') {
        file_name = 'aplikasi_kredit[]'
      }
      if (idFile == 'denah_lokasi') {
        file_name = 'denah_lokasi[]'
      }
      if (idFile == 'kelengkapan_dokumen_kredit') {
        file_name = 'checklist_kelengkapan[]'
      }
      /*End Menu Permohonan -------------------------------------------------------*/
      /*Start Menu Jaminan --------------------------------------------------------*/ //done
      if (idFile == 'jaminan_sertifikat') {
        file_name = 'sertifikat[]'
      }
      if (idFile == 'jaminan_skmht') {
        file_name = 'skmht[]'
      }
      if (idFile == 'jaminan_apht') {
        file_name = 'apht[]'
      }
      if (idFile == 'jaminan_roya') {
        file_name = 'cabut_roya[]'
      }
      if (idFile == 'jaminan_sht') {
        file_name = 'sht[]'
      }
      if (idFile == 'jaminan_pbb') {
        file_name = 'pbb[]'
      }
      if (idFile == 'jaminan_imb') {
        file_name = 'imb[]'
      }
      if (idFile == 'jaminan_ajb') {
        file_name = 'ajb[]'
      }
      if (idFile == 'jaminan_bpkb') {
        file_name = 'bpkb[]'
      }
      if (idFile == 'jaminan_fidusia') {
        file_name = 'fidusia[]'
      }
      if (idFile == 'jaminan_ahli_waris') {
        file_name = 'ahli_waris[]'
      }
      if (idFile == 'jaminan_pengakuan_hutang') {
        file_name = 'pengakuan_hutang[]'
      }
      if (idFile == 'jaminan_pengakuan_hak') {
        file_name = 'akta_pengakuan_hak_bersama[]'
      }
      if (idFile == 'jaminan_addendum') {
        file_name = 'adendum[]'
      }
      /*End Menu Jaminan ----------------------------------------------------------*/
      /*Start Menu Bi Checking ----------------------------------------------------*/ //done
      if (idFile == 'pengajuan_bi_checking') {
        file_name = 'lampiran_pengajuan_bi[]'
      }
      if (idFile == 'persetujuan_bi_checking') {
        file_name = 'lampiran_persetujuan_bi[]'
      }
      if (idFile == 'hasil_bi_checking') {
        file_name = 'lampiran_hasil_bi[]'
      }
      /*End Menu Bi Checking ------------------------------------------------------*/
      /*Start Menu CA  ------------------------------------------------------------*/ //done
      if (idFile == 'credit_analist_memo_ao') {
        file_name = 'memo_ao[]'
      }
      if (idFile == 'credit_analist_memo_ca') {
        file_name = 'memo_ca[]'
      }
      if (idFile == 'offering_letter') {
        file_name = 'offering_letter[]'
      }
      if (idFile == 'verifikasi_penilaian') {
        file_name = 'penilaian_jaminan[]'
      }
      if (idFile == 'checklist_survey') {
        file_name = 'cheklistsurvey[]'
      }
      if (idFile == 'persetujuan_kredit') {
        file_name = 'persetujuan_kredit[]'
      }
      /*End Menu CA ---------------------------------------------------------------*/
      /*Start Menu Legal  ---------------------------------------------------------*/ //done
      if (idFile == 'pengajuan') {
        file_name = 'pengajuan_lpdk[]'
      }
      if (idFile == 'lpdk') {
        file_name = 'lpdk[]'
      }
      if (idFile == 'check_pengikatan') {
        file_name = 'cheklist_pengikatan[]'
      }
      if (idFile == 'oder_pengikatan') {
        file_name = 'order_pengikatan[]'
      }
      /*End Menu Legal ------------------------------------------------------------*/
      /*Start Menu Spkndk  --------------------------------------------------------*/ //done
      if (idFile == 'spkndk') {
        file_name = 'spk_ndk[]'
      }
      if (idFile == 'asuransi') {
        file_name = 'asuransi[]'
      }
      if (idFile == 'spajk_spa_fpk') {
        file_name = 'spajk_spa_fpk[]'
      }
      if (idFile == 'sp_no_imb') {
        file_name = 'sp_no_imb[]'
      }
      if (idFile == 'jadwal_angsuran') {
        file_name = 'jadwal_angsuran[]'
      }
      if (idFile == 'personal_guarantee') {
        file_name = 'personal_guarantee[]'
      }
      if (idFile == 'hold_dana') {
        file_name = 'hold_dana[]'
      }
      if (idFile == 'srt_transfer') {
        file_name = 'surat_transfer[]'
      }
      if (idFile == 'srt_keabsahan') {
        file_name = 'keabsahan_data[]'
      }
      if (idFile == 'srt_jth_tempo') {
        file_name = 'sp_beda_jt_tempo[]'
      }
      if (idFile == 'srt_auth') {
        file_name = 'sp_authentic[]'
      }
      if (idFile == 'srt_penyerahan_jaminan') {
        file_name = 'sp_penyerahan_jaminan[]'
      }
      if (idFile == 'denda') {
        file_name = 'restruktur_bunga_denda[]'
      }
      if (idFile == 'srt_aksep') {
        file_name = 'surat_aksep[]'
      }
      if (idFile == 'tt_uang') {
        file_name = 'tt_uang[]'
      }
      if (idFile == 'pendebetan_rekening') {
        file_name = 'sp_pendebetan_rekening[]'
      }
      if (idFile == 'sp_plang') {
        file_name = 'sp_plang[]'
      }
      if (idFile == 'hal_penting') {
        file_name = 'hal_penting[]'
      }
      /*End Menu Spkndk -----------------------------------------------------------*/
      /*Start Menu Foto  ----------------------------------------------------------*/ // done
      if (idFile == 'foto_jaminan') {
        file_name = 'ft_jaminan[]'
      }
      if (idFile == 'foto_pengikatan') {
        file_name = 'ft_pengikatan[]'
      }
      if (idFile == 'foto_domisili') {
        file_name = 'ft_domisili[]'
      }
      if (idFile == 'foto_usaha') {
        file_name = 'ft_usaha[]'
      }
      /*End Menu Foto -------------------------------------------------------------*/
      /*Start Menu Release Aset ----------------------------------------------------------*/ // done
      if (idFile == 'tanda_terima_ra') {
        file_name = 'ra_tanda_terima[]'
      }
      if (idFile == 'surat_kuasa_ra') {
        file_name = 'ra_surat_kuasa[]'
      }
      if (idFile == 'identitas_pengambilan_ra') {
        file_name = 'ra_identitas_pengambilan[]'
      }
      if (idFile == 'lainnya_ra') {
        file_name = 'ra_lainnya[]'
      }
      if (idFile == 'serah_terima_ra') {
        file_name = 'ra_serah_terima[]'
      }
      /*End Menu Release Aset -------------------------------------------------------------*/
      let page_load = ''
      let user_upload = ''
      if (menu_title == undefined || menu_title == '') {
        page_load = 'loading-2' // loading di halaman view
        user_upload = 'user_verif' //field body up user
      } else {
        page_load = 'loading-1'
        user_upload = 'user_id' //field body up user
      }

      let userID = parseJwt (token).id;
      let dateNOW = get_date_time_now();
      let url_upload = ''

      fd.append(file_name, files);
      fd.append(user_upload, userID)
      fd.append('tgl_buat', dateNOW)
      
      if(is_jenis == 2){
        url_upload = 'http://103.31.232.146/API_WEBTOOL3_2/api/master/centro/update/webtool/'
      }else{
        url_upload = 'http://103.31.232.146/API_WEBTOOL3_2/api/master/centro/update/'
      }
      $.ajax({
        url: url_upload + no_rekening,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        dataType: 'json',
        headers: {
          "Authorization": `Bearer ${token}`
        },
        beforeSend: function () {
          $('#' + page_load).show();
        },
        success: function (respon) {
          $('#' + page_load).hide();
          Swal.fire({
            title: 'File Berhasil di Upload',
            confirmButtonText: `OK`,
            icon: 'success',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              $('#' + idFile + '').next('label').html('Choose file');
              update_detail_data('',is_jenis)
            }
          })
        },
        error: function (jqXHR, exception) {
          toastr["error"]("Not valid request. Upload must be a file of type: jpg, jpeg, png, pdf.")
          $('#' + page_load).hide();
        }
      });
    } else if (result.dismiss === 'Tidak') {
      return false
    }
  })
}

$('#update_verifikasi_data').click(function () {
  Swal.fire({
    title: 'Apakah Anda Yakin Ingin Update Verifikasi Data E Filling ?',
    // showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: `Simpan`,
    icon: 'question',
  }).then((result) => {
    if (result.value) {
      let no_rekening = $('form').find('#nomor_rekening').val()
      let menu_title = $('form').find('#menu_page').val()
      let verifikasi_nasabah = $("#verifikasi_nasabah").val()
      let verifikasi_permohonan = $("#verifikasi_premohonan_kredit").val()
      let verifikasi_jaminan = $("#verifikasi_jaminan").val()
      let verifikasi_bi = $("#verifikasi_bi_checking").val()
      let verifikasi_ca = $("#verifikasi_credit_analist").val()
      let verifikasi_foto = $("#verifikasi_foto").val()
      let verifikasi_legal = $('#verifikasi_legal').val()
      let verifikasi_spk = $('#verifikasi_spk').val()

      let notes_nasabah = ((verifikasi_nasabah == 1)? '' : $('#note_verifikasi_nasabah').val())
      let notes_jaminan = ((verifikasi_jaminan == 1)? '' : $('#note_verifikasi_jaminan').val())
      let notes_legal = ((verifikasi_legal == 1)? '' : $('#note_verifikasi_legal').val())
      let notes_spk = ((verifikasi_spk == 1)? '' : $('#note_verifikasi_spk').val())
      let notes_permohonan = ((verifikasi_permohonan == 1) ? '' : $('#note_verifikasi_premohonan_kredit').val())
      let notes_bi = ((verifikasi_bi == 1) ? '' : $('#note_verifikasi_bi_checking').val())
      let notes_ca = ((verifikasi_ca == 1) ? '' : $('#note_verifikasi_credit_analist').val())
      let notes_foto = ((verifikasi_foto == 1) ? '' : $('#note_verifikasi_foto').val())

      let data;
      switch (menu_title) {
        // case 'Edit':
        //   data = {
        //     verifikasi_nasabah: verifikasi_nasabah,
        //     verifikasi_permohonan: verifikasi_permohonan,
        //     verifikasi_jaminan: verifikasi_jaminan,
        //     verifikasi_bi: verifikasi_bi,
        //     verifikasi_ca: verifikasi_ca,
        //     verifikasi_foto: verifikasi_foto,
        //     verifikasi_legal: verifikasi_legal,
        //     verifikasi_spk: verifikasi_spk,
        //   }
        //   break;
        case 'Verifikasi':
          data = {
            verifikasi_nasabah: verifikasi_nasabah,
            verifikasi_permohonan: verifikasi_permohonan,
            verifikasi_jaminan: verifikasi_jaminan,
            verifikasi_bi: verifikasi_bi,
            verifikasi_ca: verifikasi_ca,
            verifikasi_foto: verifikasi_foto,
            verifikasi_legal: verifikasi_legal,
            verifikasi_spk: verifikasi_spk,
            notes_nasabah:  notes_nasabah,
            notes_permohonan:  notes_permohonan,
            notes_bi: notes_bi,
            notes_ca:  notes_ca,
            notes_foto: notes_foto,
            notes_jaminan: notes_jaminan,
            notes_legal: notes_legal,
            notes_spk: notes_spk,
            user_verif : parseJwt (token).id,
            tgl_verif : get_date_time_now()
          }
          break;
      }
      let is_jenis = this.getAttribute('jenis_data')
      update_detail_data(data,is_jenis)
      // console.log(data)
    } 
    else if (result.dismiss === 'Tidak') {
      return false
    }
  })
})

function update_detail_data(data,is_jenis) {
  let dt = {}
  if (data !== undefined) {
    dt = data
  }

  let no_rekening = '';
  let menu_title = $('form').find('#menu_page').val()

  let page_load = ''
  if (menu_title == undefined || menu_title == '') {
    page_load = 'loading-2'
    no_rekening = $('form').find('#view_nomor_rekening').val()
    title = 'View'
  } else {
    page_load = 'loading-1'
    no_rekening = $('form').find('#nomor_rekening').val()
    title = menu_title
  }

  let url_upload =''
  if(is_jenis == 2){
    url_upload = 'http://103.31.232.146/API_WEBTOOL3_2/api/master/centro/update/webtool/'
  }else{
    url_upload = 'http://103.31.232.146/API_WEBTOOL3_2/api/master/centro/update/'
  }
  $.ajax({
    url: url_upload + no_rekening,
    type: "POST",
    data: dt,
    dataType: 'json',
    headers: {
      "Authorization": `Bearer ${token}`
    },
    beforeSend: function () {
      $('#' + page_load).show();
    },
    success: function (respon) {
      getDetailDataNasabah_to_FormEfiling(no_rekening, page_load, title);
      $('#' + page_load).hide();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Data Berhasil Di Perbarui',
        showConfirmButton: false,
        timer: 1500
      })
      $('#btn_save').hide();
      $('#btn-close').show();
    }
  })
}

function closeFormEfiling() {
  $('#modal_pengisian_efiling').modal('hide');
  $('.inner_list_upload').each(function (index, item) {
    $(item).empty();
  });
  location.reload();
}

/** Function delete file efiling */
function delete_file(d) {
  let token = localStorage.getItem("token");
  let menu_title = $('form').find('#menu_page').val()
  let idFile = d.getAttribute("id-file")
  let no_rekening = d.getAttribute("no-rek")
  Swal.fire({
    title: 'Apakah Anda Yakin Ingin Hapus File ini ?',
    showCancelButton: true,
    confirmButtonText: `Ya`,
    icon: 'question',
  }).then((result) => {
    if (result.value) {
      let tbl = '';
      let col = '';
      if (idFile == 'ktp_all') {
        tbl = 'efiling_nasabah'
        col = 'ktp'
      }
      if (idFile == 'kartu_keluarga') {
        tbl = 'efiling_nasabah'
        col = 'kk'
      }
      if (idFile == 'inp_npwp') {
        tbl = 'efiling_nasabah'
        col = 'npwp'
      }
      if (idFile == 'surat_nikah') {
        tbl = 'efiling_nasabah'
        col = 'surat_nikah'
      }
      if (idFile == 'surat_cerai') {
        tbl = 'efiling_nasabah'
        col = 'surat_cerai'
      }
      if (idFile == 'surat_lahir') {
        tbl = 'efiling_nasabah'
        col = 'surat_lahir'
      }
      if (idFile == 'surat_kematian') {
        tbl = 'efiling_nasabah'
        col = 'surat_kematian'
      }
      if (idFile == 'surat_keterangan_desa') {
        tbl = 'efiling_nasabah'
        col = 'skd'
      }
      if (idFile == 'slip_gaji') {
        tbl = 'efiling_nasabah'
        col = 'slip_gaji'
      }
      if (idFile == 'take_over') {
        tbl = 'efiling_nasabah'
        col = 'take_over'
      }
      if (idFile == 'surat_keterangan_kerja') {
        tbl = 'efiling_nasabah'
        col = 'sk_kerja'
      }
      if (idFile == 'surat_keterangan_usaha') {
        tbl = 'efiling_nasabah'
        col = 'sk_usaha'
      }
      if (idFile == 'rekening_koran') {
        tbl = 'efiling_nasabah'
        col = 'rek_koran'
      }
      if (idFile == 'tdp_siup') {
        tbl = 'efiling_nasabah'
        col = 'tdp'
      }
      if (idFile == 'bon_usaha') {
        tbl = 'efiling_nasabah'
        col = 'bon_usaha'
      }
      /*End Menu Nasabah ----------------------------------------------------------*/
      /*Start Menu Permohonan -----------------------------------------------------*/ //done
      if (idFile == 'aplikasi_permohonan_kredit') {
        tbl = 'efiling_permohonan_kredit'
        col = 'aplikasi'
      }
      if (idFile == 'denah_lokasi') {
        tbl = 'efiling_permohonan_kredit'
        col = 'denah_lokasi'
      }
      if (idFile == 'kelengkapan_dokumen_kredit') {
        tbl = 'efiling_permohonan_kredit'
        col = 'checklist_kelengkapan'
      }
      /*End Menu Permohonan -------------------------------------------------------*/
      /*Start Menu Jaminan --------------------------------------------------------*/ //done
      if (idFile == 'jaminan_sertifikat') {
        tbl = 'efiling_jaminan'
        col = 'sertifikat'
      }
      if (idFile == 'jaminan_skmht') {
        tbl = 'efiling_jaminan'
        col = 'skmht'
      }
      if (idFile == 'jaminan_apht') {
        tbl = 'efiling_jaminan'
        col = 'apht'
      }
      if (idFile == 'jaminan_roya') {
        tbl = 'efiling_jaminan'
        col = 'cabut_roya'
      }
      if (idFile == 'jaminan_sht') {
        tbl = 'efiling_jaminan'
        col = 'sht'
      }
      if (idFile == 'jaminan_pbb') {
        tbl = 'efiling_jaminan'
        col = 'pbb'
      }
      if (idFile == 'jaminan_imb') {
        tbl = 'efiling_jaminan'
        col = 'imb'
      }
      if (idFile == 'jaminan_ajb') {
        tbl = 'efiling_jaminan'
        col = 'ajb'
      }
      if (idFile == 'jaminan_bpkb') {
        tbl = 'efiling_jaminan'
        col = 'bpkb'
      }
      if (idFile == 'jaminan_fidusia') {
        tbl = 'efiling_jaminan'
        col = 'fidusia'
      }
      if (idFile == 'jaminan_ahli_waris') {
        tbl = 'efiling_jaminan'
        col = 'ahli_waris'
      }
      if (idFile == 'jaminan_pengakuan_hutang') {
        tbl = 'efiling_jaminan'
        col = 'pengakuan_hutang'
      }
      if (idFile == 'jaminan_pengakuan_hak') {
        tbl = 'efiling_jaminan'
        col = 'akta_pengakuan_hak_bersama'
      }
      if (idFile == 'jaminan_addendum') {
        tbl = 'efiling_jaminan'
        col = 'adendum'
      }
      /*End Menu Jaminan ----------------------------------------------------------*/
      /*Start Menu Bi Checking ----------------------------------------------------*/ //done
      if (idFile == 'pengajuan_bi_checking') {
        tbl = 'efiling_bi_checking'
        col = 'pengajuan_bi'
      }
      if (idFile == 'persetujuan_bi_checking') {
        tbl = 'efiling_bi_checking'
        col = 'persetujuan'
      }
      if (idFile == 'hasil_bi_checking') {
        tbl = 'efiling_bi_checking'
        col = 'hasil'
      }
      /*End Menu Bi Checking ------------------------------------------------------*/
      /*Start Menu CA  ------------------------------------------------------------*/ //done
      if (idFile == 'credit_analist_memo_ao') {
        tbl = 'efiling_credit_analist'
        col = 'memo_ao'
      }
      if (idFile == 'credit_analist_memo_ca') {
        tbl = 'efiling_credit_analist'
        col = 'memo_ca'
      }
      if (idFile == 'offering_letter') {
        tbl = 'efiling_credit_analist'
        col = 'offering_letter'
      }
      if (idFile == 'verifikasi_penilaian') {
        tbl = 'efiling_credit_analist'
        col = 'penilaian_jaminan'
      }
      if (idFile == 'checklist_survey') {
        tbl = 'efiling_credit_analist'
        col = 'cheklist_survey'
      }
      if (idFile == 'persetujuan_kredit') {
        tbl = 'efiling_credit_analist'
        col = 'persetujuan_kredit'
      }
      /*End Menu CA ---------------------------------------------------------------*/
      /*Start Menu Legal  ---------------------------------------------------------*/ //done
      if (idFile == 'pengajuan') {
        tbl = 'efiling_legal'
        col = 'pengajuan_lpdk'
      }
      if (idFile == 'lpdk') {
        tbl = 'efiling_legal'
        col = 'lpdk'
      }
      if (idFile == 'check_pengikatan') {
        tbl = 'efiling_legal'
        col = 'cheklist_pengikatan'
      }
      if (idFile == 'oder_pengikatan') {
        tbl = 'efiling_legal'
        col = 'order_pengikatan'
      }
      /*End Menu Legal ------------------------------------------------------------*/
      /*Start Menu Spkndk  --------------------------------------------------------*/ //done
      if (idFile == 'spkndk') {
        tbl = 'efiling_spk_ndk'
        col = 'spk_ndk'
      }
      if (idFile == 'asuransi') {
        tbl = 'efiling_spk_ndk'
        col = 'asuransi'
      }
      if (idFile == 'spajk_spa_fpk') {
        tbl = 'efiling_spk_ndk'
        col = 'spajk_spa_fpk'
      }
      if (idFile == 'sp_no_imb') {
        tbl = 'efiling_spk_ndk'
        col = 'sp_no_imb'
      }
      if (idFile == 'jadwal_angsuran') {
        tbl = 'efiling_spk_ndk'
        col = 'jadwal_angsuran'
      }
      if (idFile == 'personal_guarantee') {
        tbl = 'efiling_spk_ndk'
        col = 'personal_guarantee'
      }
      if (idFile == 'hold_dana') {
        tbl = 'efiling_spk_ndk'
        col = 'hold_dana'
      }
      if (idFile == 'srt_transfer') {
        tbl = 'efiling_spk_ndk'
        col = 'surat_transfer'
      }
      if (idFile == 'srt_keabsahan') {
        tbl = 'efiling_spk_ndk'
        col = 'keabsahan_data'
      }
      if (idFile == 'srt_jth_tempo') {
        tbl = 'efiling_spk_ndk'
        col = 'sp_beda_jt_tempo'
      }
      if (idFile == 'srt_auth') {
        tbl = 'efiling_spk_ndk'
        col = 'sp_authentic'
      }
      if (idFile == 'srt_penyerahan_jaminan') {
        tbl = 'efiling_spk_ndk'
        col = 'sp_penyerahan_jaminan'
      }
      if (idFile == 'denda') {
        tbl = 'efiling_spk_ndk'
        col = 'restruktur_bunga_denda'
      }
      if (idFile == 'srt_aksep') {
        tbl = 'efiling_spk_ndk'
        col = 'surat_aksep'
      }
      if (idFile == 'tt_uang') {
        tbl = 'efiling_spk_ndk'
        col = 'tt_uang'
      }
      if (idFile == 'pendebetan_rekening') {
        tbl = 'efiling_spk_ndk'
        col = 'sp_pendebetan_rekening'
      }
      if (idFile == 'sp_plang') {
        tbl = 'efiling_spk_ndk'
        col = 'surat_aksep'
      }
      if (idFile == 'hal_penting') {
        tbl = 'efiling_spk_ndk'
        col = 'hal_penting'
      }
      /*End Menu Spkndk -----------------------------------------------------------*/
      /*Start Menu Foto  ----------------------------------------------------------*/ // done
      if (idFile == 'foto_jaminan') {
        tbl = 'efiling_foto'
        col = 'ft_jaminan'
      }
      if (idFile == 'foto_pengikatan') {
        tbl = 'efiling_foto'
        col = 'ft_pengikatan'
      }
      if (idFile == 'foto_domisili') {
        tbl = 'efiling_foto'
        col = 'ft_domisili'
      }
      if (idFile == 'foto_usaha') {
        tbl = 'efiling_foto'
        col = 'ft_usaha'
      }
      /*Start Menu Release Aset ----------------------------------------------------------*/ // done
      if (idFile == 'tanda_terima_ra') {
        tbl = 'efiling_release_aset'
        col = 'ra_tanda_terima'
      }
      if (idFile == 'surat_kuasa_ra') {
        tbl = 'efiling_release_aset'
        col = 'ra_surat_kuasa'
      }
      if (idFile == 'identitas_pengambilan_ra') {
        tbl = 'efiling_release_aset'
        col = 'ra_identitas_pengambilan'
      }
      if (idFile == 'lainnya_ra') {
        tbl = 'efiling_release_aset'
        col = 'ra_lainnya'
      }
      if (idFile == 'serah_terima_ra') {
        tbl = 'efiling_release_aset'
        col = 'ra_serah_terima'
      }

      let title =''
      let page_load = ''
      if (menu_title == undefined || menu_title == '') {
        page_load = 'loading-2'
        title = 'View'
      } else {
        page_load = 'loading-1'
        title = menu_title
      }

      let data = {
        jenis: tbl,
        column: col,
        files: d.getAttribute("nm-file")
      }
      $.ajax({
        url: "http://103.31.232.146/API_WEBTOOL3_2/api/master/centro/delete/file/" + no_rekening,
        type: "POST",
        data: data,
        dataType: 'json',
        headers: {
          "Authorization": `Bearer ${token}`
        },
        beforeSend: function () {
          $('#' + page_load).show();
        },
        success: function (respon) {
          $('#' + page_load).hide();
          Swal.fire({
            title: 'File Berhasil di Hapus',
            confirmButtonText: `OK`,
            icon: 'success',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              getDetailDataNasabah_to_FormEfiling(no_rekening, page_load, title);

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Data Berhasil Di Perbarui',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
        }
      });
    }else if (result.dismiss === 'Tidak') {
      return false
    }
  })
  
}
