function detailViewEfiling(respon) {
  let data = respon.data;
  let path_file = data.efilling['folder_master'];
  let pathFileUpload = '';
  // ket Is_jenis 1 = Sefin, Is_jenis 2 = webtool
  let jenis_data = data.efilling['is_jenis']
  let no_rekening = ((data.header_efiling == null) ? '' : data.header_efiling['no_rekening'])

  $(".custom-file-input").attr({
    "is_jenis": jenis_data
  })
  $("#inputStatusVerifikasi").attr({
    "no_rekening": no_rekening
  })
  if (jenis_data == 1) {
    pathFileUpload = `${path_file}/`;
  } else {
    // link  http://103.234.254.186/efiling/2018/03/02/02-38-00029-18/fatmah%20-%20PH.pdf
    let tgl_realisasi = '';
    let kode_kantor = '';
    let y = '';
    let m = '';
    if (data.efilling['no_rekening_lama'] == null) {
      tgl_realisasi = ((data.header_efiling == null) ? '' : data.header_efiling['tgl_realisasi'])
      kode_kantor = ((data.header_efiling == null) ? '' : data.header_efiling['kode_kantor'])
      y = tgl_realisasi.split("-")[2]
      m = tgl_realisasi.split("-")[1]
    } else {
      tgl_realisasi = data.efilling['tgl_realisasi_eng_lama']
      kode_kantor = data.efilling['kode_kantor_lama']
      y = tgl_realisasi.split("-")[0]
      m = tgl_realisasi.split("-")[1]
    }

    pathFileUpload = `http://103.234.254.186/${path_file}/${y}/${m}/${kode_kantor}/${no_rekening}/`;
  }

  let verifikasi_nasabah = status(data.efilling_nasabah['verifikasi_nasabah'], "verifikasi_nasabah")
  let verifikasi_bi_checking = status(data.efilling_bichecking['verifikasi_bichecking'], "verifikasi_bi_checking")
  let verifikasi_credit_analist = status(data.efilling_ca['verifikasi_ca'], "verifikasi_credit_analist")
  let verifikasi_foto = status(data.efilling_foto['verifikasi_foto'], "verifikasi_foto")
  let verifikasi_jaminan = status(data.efilling_jaminan['verifikasi_jaminan'], "verifikasi_jaminan")
  let verifikasi_legal = status(data.efilling_legal['verifikasi_legal'], "verifikasi_legal")
  let verifikasi_permohonan_kredit = status(data.efilling_permohonan['verifikasi_permohonan'], "verifikasi_permohonan_kredit")
  let verifikasi_spk_ndk = status(data.efilling_spkndk['verifikasi_spkndk'], "verifikasi_spk_ndk")

  function status(status, id_dt) {
    let text = '';
    if (status == '1') {
      text = `<p class="view_status_done">DONE</p>`
      $('#view_status_' + id_dt).html(text)
    } else if (status == '2') {
      text = `<p class="view_status_notcompleted">NOT COMPELETD</p>`
      $('#view_status_' + id_dt).html(text)
    } else if (status == '3') {
      text = `<p class="view_status_revisi">REVISI</p>`
      $('#view_status_' + id_dt).html(text)
    } else {
      $('#view_status_' + id_dt).html("")
    }
  }

  let notes_bi_checking = notes(data.efilling_bichecking['notes_bichecking'], data.efilling_bichecking['verifikasi_bichecking'], "notes_bi_checking")
  let notes_credit_analist = notes(data.efilling_ca['notes_ca'], data.efilling_ca['verifikasi_ca'], "notes_credit_analist")
  let notes_foto = notes(data.efilling_foto['notes_foto'], data.efilling_foto['verifikasi_foto'], "notes_foto")
  let notes_jaminan = notes(data.efilling_jaminan['notes_jaminan'], data.efilling_jaminan['verifikasi_jaminan'], "notes_jaminan")
  let notes_legal = notes(data.efilling_legal['notes_legal'], data.efilling_legal['verifikasi_legal'], "notes_legal")
  let notes_nasabah = notes(data.efilling_nasabah['notes_nasabah'], data.efilling_nasabah['verifikasi_nasabah'], "notes_nasabah")
  let notes_permohonan_kredit = notes(data.efilling_permohonan['notes_permohonan'], data.efilling_permohonan['verifikasi_permohonan'], "notes_permohonan_kredit")
  let notes_spk_ndk = notes(data.efilling_spkndk['notes_spkndk'], data.efilling_spkndk['verifikasi_spkndk'], "notes_spk_ndk")

  function notes(notes, status, id_dt) {
    if (notes == null || status == 1 || status == null) {
      $('#view_' + id_dt).html("-")
    } else {
      $('#view_' + id_dt).html(notes)
    }
  }

  /**Notes Function menu innerDataNasabah(data, jenis data, pathUpload, id inner data ke html)*/
  // Data nasabah
  let nasbah_ktp = innerDataNasabah(data.efilling_nasabah['ktp'], data.efilling_nasabah['ktp_nama'], jenis_data, pathFileUpload, "view_ktp");
  let nasabah_kk = innerDataNasabah(data.efilling_nasabah['kk'], data.efilling_nasabah['kk_nama'], jenis_data, pathFileUpload, "view_kk");
  let nasbah_npwp = innerDataNasabah(data.efilling_nasabah['npwp'], data.efilling_nasabah['npwp_nama'], jenis_data, pathFileUpload, "view_npwp");
  let nasabah_surat_nikah = innerDataNasabah(data.efilling_nasabah['surat_nikah'], data.efilling_nasabah['surat_nikah_nama'], jenis_data, pathFileUpload, "view_surat_nikah");
  let nasabah_surat_cerai = innerDataNasabah(data.efilling_nasabah['surat_cerai'], data.efilling_nasabah['surat_cerai_nama'], jenis_data, pathFileUpload, "view_surat_cerai");
  let nasabah_surat_lahir = innerDataNasabah(data.efilling_nasabah['surat_lahir'], data.efilling_nasabah['surat_lahir_nama'], jenis_data, pathFileUpload, "view_surat_lahir");
  let nasabah_surat_kematian = innerDataNasabah(data.efilling_nasabah['surat_kematian'], data.efilling_nasabah['surat_kematian_nama'], jenis_data, pathFileUpload, "view_surat_kematian");
  let nasabah_skd = innerDataNasabah(data.efilling_nasabah['skd'], data.efilling_nasabah['skd_nama'], jenis_data, pathFileUpload, "view_surat_desa");
  let nasabah_slip_gaji = innerDataNasabah(data.efilling_nasabah['slip_gaji'], data.efilling_nasabah['slip_gaji_nama'], jenis_data, pathFileUpload, "view_slip_gaji");
  let nasabah_take_over = innerDataNasabah(data.efilling_nasabah['take_over'], data.efilling_nasabah['take_over_nama'], jenis_data, pathFileUpload, "view_take_over");
  let nasabah_sk_kerja = innerDataNasabah(data.efilling_nasabah['sk_kerja'], data.efilling_nasabah['sk_kerja_nama'], jenis_data, pathFileUpload, "view_surat_kerja");
  let nasabah_sk_usaha = innerDataNasabah(data.efilling_nasabah['sk_usaha'], data.efilling_nasabah['sk_usaha_nama'], jenis_data, pathFileUpload, "view_surat_usaha");
  let nasabah_rek_koran = innerDataNasabah(data.efilling_nasabah['rek_koran'], data.efilling_nasabah['rek_koran_nama'], jenis_data, pathFileUpload, "view_rekening_koran");
  let nasabah_tdp = innerDataNasabah(data.efilling_nasabah['tdp'], data.efilling_nasabah['tdp_nama'], jenis_data, pathFileUpload, "view_tdp");
  let nasabah_bon_usaha = innerDataNasabah(data.efilling_nasabah['bon_usaha'], data.efilling_nasabah['bon_usaha_nama'], jenis_data, pathFileUpload, "view_bon_usaha");
  // Data permohonan kredit
  let permohonan_kredit_aplikasi = innerDataNasabah(data.efilling_permohonan['aplikasi'], data.efilling_permohonan['aplikasi_nama'], jenis_data, pathFileUpload, "view_permohonan_kredit");
  let permohonan_kredit_denah_lokasi = innerDataNasabah(data.efilling_permohonan['denah_lokasi'], data.efilling_permohonan['denah_lokasi_nama'], jenis_data, pathFileUpload, "view_denah_lokasi");
  let permohonan_kredit_checklist_kelengkapan = innerDataNasabah(data.efilling_permohonan['checklist_kelengkapan'], data.efilling_permohonan['checklist_kelengkapan_nama'], jenis_data, pathFileUpload, "view_kelengkapan_dokumen");
  // Data jaminan
  let jaminan_adendum = innerDataNasabah(data.efilling_jaminan['adendum'], data.efilling_jaminan['adendum_nama'], jenis_data, pathFileUpload, "view_jaminan_addendum");
  let jaminan_ahli_waris = innerDataNasabah(data.efilling_jaminan['ahli_waris'], data.efilling_jaminan['ahli_waris_nama'], jenis_data, pathFileUpload, "view_jaminan_ahli_waris");
  let jaminan_ajb = innerDataNasabah(data.efilling_jaminan['ajb'], data.efilling_jaminan['ajb_nama'], jenis_data, pathFileUpload, "view_jaminan_ajb");
  let jaminan_akta_pengakuan_hak_bersama = innerDataNasabah(data.efilling_jaminan['akta_pengakuan_hak_bersama'], data.efilling_jaminan['akta_pengakuan_hak_bersama_nama'], jenis_data, pathFileUpload, "view_jaminan_pengakuan_hak");
  let jaminan_apht = innerDataNasabah(data.efilling_jaminan['apht'], data.efilling_jaminan['apht_nama'], jenis_data, pathFileUpload, "view_jaminan_apht");
  let jaminan_bpkb = innerDataNasabah(data.efilling_jaminan['bpkb'], data.efilling_jaminan['bpkb_nama'], jenis_data, pathFileUpload, "view_jaminan_bpkb");
  let jaminan_cabut_roya = innerDataNasabah(data.efilling_jaminan['cabut_roya'], data.efilling_jaminan['cabut_roya_nama'], jenis_data, pathFileUpload, "view_jaminan_roya");
  let jaminan_fidusia = innerDataNasabah(data.efilling_jaminan['fidusia'], data.efilling_jaminan['fidusia_nama'], jenis_data, pathFileUpload, "view_jaminan_fidusia");
  let jaminan_imb = innerDataNasabah(data.efilling_jaminan['imb'], data.efilling_jaminan['imb_nama'], jenis_data, pathFileUpload, "view_jaminan_imb");
  let jaminan_pbb = innerDataNasabah(data.efilling_jaminan['pbb'], data.efilling_jaminan['pbb_nama'], jenis_data, pathFileUpload, "view_jaminan_pbb");
  let jaminan_pengakuan_hutang = innerDataNasabah(data.efilling_jaminan['pengakuan_hutang'], data.efilling_jaminan['pengakuan_hutang_nama'], jenis_data, pathFileUpload, "view_jaminan_pengakuan_hutang");
  let jaminan_sertifikat = innerDataNasabah(data.efilling_jaminan['sertifikat'], data.efilling_jaminan['sertifikat_nama'], jenis_data, pathFileUpload, "view_jaminan_sertifikat");
  let jaminan_sht = innerDataNasabah(data.efilling_jaminan['sht'], data.efilling_jaminan['sht_nama'], jenis_data, pathFileUpload, "view_jaminan_sht");
  let jaminan_skmht = innerDataNasabah(data.efilling_jaminan['skmht'], data.efilling_jaminan['skmht_nama'], jenis_data, pathFileUpload, "view_jaminan_skmht");
  // Data bi checking
  // let bi_checking_hasil = innerDataNasabah(data.efilling_bichecking['hasil'],data.efilling_bichecking['hasil_nama'], jenis_data, pathFileUpload, "view_form_hasil_bi_checking");
  let bi_checking_persetujuan = innerDataNasabah(data.efilling_bichecking['persetujuan'], data.efilling_bichecking['persetujuan_nama'], jenis_data, pathFileUpload, "view_form_persetujuan_bi_checking");
  let bi_checking_pengajuan_bi = innerDataNasabah(data.efilling_bichecking['pengajuan_bi'], data.efilling_bichecking['pengajuan_bi_nama'], jenis_data, pathFileUpload, "view_form_pengajuan_bi_checking");
  // Data credit analist
  let credit_analist_cheklist_survey = innerDataNasabah(data.efilling_ca['cheklist_survey'], data.efilling_ca['cheklist_survey_nama'], jenis_data, pathFileUpload, "view_checklist_survey");
  let credit_analist_memo_ao = innerDataNasabah(data.efilling_ca['memo_ao'], data.efilling_ca['memo_ao_nama'], jenis_data, pathFileUpload, "view_account_office");
  let credit_analist_memo_ca = innerDataNasabah(data.efilling_ca['memo_ca'], data.efilling_ca['memo_ca_nama'], jenis_data, pathFileUpload, "view_credit_analist");
  let credit_analist_offering_letter = innerDataNasabah(data.efilling_ca['offering_letter'], data.efilling_ca['offering_letter_nama'], jenis_data, pathFileUpload, "view_offering_let");
  let credit_analist_penilaian_jaminan = innerDataNasabah(data.efilling_ca['penilaian_jaminan'], data.efilling_ca['penilaian_jaminan_nama'], jenis_data, pathFileUpload, "view_verifikasi_jaminan");
  let credit_analist_persetujuan_kredit = innerDataNasabah(data.efilling_ca['persetujuan_kredit'], data.efilling_ca['persetujuan_kredit_nama'], jenis_data, pathFileUpload, "view_credit_auth_approv");
  // Data legal
  let legal_cheklist_pengikatan = innerDataNasabah(data.efilling_legal['cheklist_pengikatan'], data.efilling_legal['cheklist_pengikatan_nama'], jenis_data, pathFileUpload, "view_check_pengikatan");
  let legal_lpdk = innerDataNasabah(data.efilling_legal['lpdk'], data.efilling_legal['lpdk_nama'], jenis_data, pathFileUpload, "view_lpdk");
  let legal_order_pengikatan = innerDataNasabah(data.efilling_legal['order_pengikatan'], data.efilling_legal['order_pengikatan_nama'], jenis_data, pathFileUpload, "view_oder_pengikatan");
  let legal_pengajuan_lpdk = innerDataNasabah(data.efilling_legal['pengajuan_lpdk'], data.efilling_legal['pengajuan_lpdk_nama'], jenis_data, pathFileUpload, "view_pengajuan");
  // Data spk & ndk
  let spk_ndk_asuransi = innerDataNasabah(data.efilling_spkndk['asuransi'], data.efilling_spkndk['asuransi_nama'], jenis_data, pathFileUpload, "view_asuransi");
  let spk_ndk_hal_penting = innerDataNasabah(data.efilling_spkndk['hal_penting'], data.efilling_spkndk['hal_penting_nama'], jenis_data, pathFileUpload, "view_hal_lain");
  let spk_ndk_hold_dana = innerDataNasabah(data.efilling_spkndk['hold_dana'], data.efilling_spkndk['hold_dana_nama'], jenis_data, pathFileUpload, "view_hold_dana");
  let spk_ndk_jadwal_angsuran = innerDataNasabah(data.efilling_spkndk['jadwal_angsuran'], data.efilling_spkndk['jadwal_angsuran_nama'], jenis_data, pathFileUpload, "view_jadwal_angsuran");
  let spk_ndk_keabsahan_data = innerDataNasabah(data.efilling_spkndk['keabsahan_data'], data.efilling_spkndk['keabsahan_data_nama'], jenis_data, pathFileUpload, "view_srt_keabsahan");
  let spk_ndk_personal_guarantee = innerDataNasabah(data.efilling_spkndk['personal_guarantee'], data.efilling_spkndk['personal_guarantee_nama'], jenis_data, pathFileUpload, "view_penjamin");
  let spk_ndk_restruktur_bunga_denda = innerDataNasabah(data.efilling_spkndk['restruktur_bunga_denda'], data.efilling_spkndk['restruktur_bunga_denda_nama'], jenis_data, pathFileUpload, "view_denda");
  let spk_ndk_sp_authentic = innerDataNasabah(data.efilling_spkndk['sp_authentic'], data.efilling_spkndk['sp_authentic_nama'], jenis_data, pathFileUpload, "view_srt_auth");
  let spk_ndk_sp_beda_jt_tempo = innerDataNasabah(data.efilling_spkndk['sp_beda_jt_tempo'], data.efilling_spkndk['sp_beda_jt_tempo_nama'], jenis_data, pathFileUpload, "view_srt_jth_tempo");
  let spk_ndk_sp_no_imb = innerDataNasabah(data.efilling_spkndk['sp_no_imb'], data.efilling_spkndk['sp_no_imb_nama'], jenis_data, pathFileUpload, "view_no_IMB");
  let spk_ndk_sp_pendebetan_rekening = innerDataNasabah(data.efilling_spkndk['sp_pendebetan_rekening'], data.efilling_spkndk['sp_pendebetan_rekening_nama'], jenis_data, pathFileUpload, "view_pendebetan_rekening");
  let spk_ndk_sp_penyerahan_jaminan = innerDataNasabah(data.efilling_spkndk['sp_penyerahan_jaminan'], data.efilling_spkndk['sp_penyerahan_jaminan_nama'], jenis_data, pathFileUpload, "view_srt_penyerahan_jaminan");
  let spk_ndk_sp_plang = innerDataNasabah(data.efilling_spkndk['sp_plang'], data.efilling_spkndk['sp_plang_nama'], jenis_data, pathFileUpload, "view_plang");
  let spk_ndk_spk_ndk = innerDataNasabah(data.efilling_spkndk['spk_ndk'], data.efilling_spkndk['spk_ndk_nama'], jenis_data, pathFileUpload, "view_spk");
  let spk_ndk_surat_aksep = innerDataNasabah(data.efilling_spkndk['surat_aksep'], data.efilling_spkndk['surat_aksep_nama'], jenis_data, pathFileUpload, "view_srt_aksep");
  let spk_ndk_surat_transfer = innerDataNasabah(data.efilling_spkndk['surat_transfer'], data.efilling_spkndk['surat_transfer_nama'], jenis_data, pathFileUpload, "view_srt_transfer");
  let spk_ndk_tt_uang = innerDataNasabah(data.efilling_spkndk['tt_uang'], data.efilling_spkndk['tt_uang_nama'], jenis_data, pathFileUpload, "view_tandaterima_nasabah");
  let spk_ndk_spajk_spa_fpk = innerDataNasabah(data.efilling_spkndk['spajk_spa_fpk'], data.efilling_spkndk['spajk_spa_fpk_nama'], jenis_data, pathFileUpload, "view_spajk_spa_fpk");
  // Data foto
  let foto_ft_domisili = innerDataNasabah(data.efilling_foto['ft_domisili'], data.efilling_foto['ft_domisili_nama'], jenis_data, pathFileUpload, "view_foto_domisili");
  let foto_ft_jaminan = innerDataNasabah(data.efilling_foto['ft_jaminan'], data.efilling_foto['ft_jaminan_nama'], jenis_data, pathFileUpload, "view_foto_jaminan");
  let foto_ft_pengikatan = innerDataNasabah(data.efilling_foto['ft_pengikatan'], data.efilling_foto['ft_pengikatan_nama'], jenis_data, pathFileUpload, "view_foto_pengikatan");
  let foto_ft_usaha = innerDataNasabah(data.efilling_foto['ft_usaha'], data.efilling_foto['ft_usaha_nama'], jenis_data, pathFileUpload, "view_foto_usaha");

  //Release Aset
  if (data.efilling_aset !== null) {
    let ra_tanda_terima = innerDataAsset(data.efilling_aset['ra_tanda_terima'], data.efilling_aset['ra_tanda_terima_nama'], jenis_data, pathFileUpload, "tanda_terima_ra", no_rekening);
    let ra_surat_kuasa = innerDataAsset(data.efilling_aset['ra_surat_kuasa'], data.efilling_aset['ra_surat_kuasa_nama'], jenis_data, pathFileUpload, "surat_kuasa_ra", no_rekening);
    let ra_identitas_pengambilan = innerDataAsset(data.efilling_aset['ra_identitas_pengambilan'], data.efilling_aset['ra_identitas_pengambilan_nama'], jenis_data, pathFileUpload, "identitas_pengambilan_ra", no_rekening);
    let ra_lainnya = innerDataAsset(data.efilling_aset['ra_lainnya'], data.efilling_aset['ra_lainnya_nama'], jenis_data, pathFileUpload, "lainnya_ra", no_rekening);
    let ra_serah_terima = innerDataAsset(data.efilling_aset['ra_serah_terima'], data.efilling_aset['ra_serah_terima_nama'], jenis_data, pathFileUpload, "serah_terima_ra", no_rekening);
  }
}

function innerDataNasabah(file, file_name, jenis_data, pathFileUpload, id) {
  if (file == null || file == '' || JSON.parse(file) == '') {
    return $('#' + id + '').html(`<p class="ket-data-null"> Data tidak ada</p>`);
  } else {
    let parse_file = ''
    let parse_name = ''
    if (jenis_data == 1) {
      parse_file = JSON.parse(file);
      parse_name = JSON.parse(file_name)[0];
    } else {
      parse_file = JSON.parse(file);
    }

    let list_data = "";
    for (var i = 0; i < parse_file.length; i++) {
      if (parse_file[i].length > 0 || parse_name[i] == 'null') {
        list_data +=
          `<div> <a class="example-image-link" target="_blank"  href="${pathFileUpload}${parse_file[i]}"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i>${((jenis_data == 1)? parse_name[i] : parse_file[i])}</a> </div>`;
      }
    };
    return $('#' + id + '').html(list_data);
  }
}

function innerDataAsset(file, file_name, jenis_data, pathFileUpload, id, no_rekening) {
  if (file == null || file == "") {
    return $('#file-' + id + '').html("");
  } else {
    let parse_file = ''
    let parse_name = ''
    if (jenis_data == 1) {
      parse_file = JSON.parse(file);
      parse_name = JSON.parse(file_name)[0];
    } else {
      parse_file = JSON.parse(file);
    }

    let list_data = ''
    for (var i = 0; i < parse_file.length; i++) {
      if (parse_file[i].length > 0 || parse_name[i] == 'null') {
        list_data +=
          `<div class="col-12 group-${id}" style ="display: flex; padding-bottom: 5px;" >
           <div class="col-10">
             <a class="example-image-link" target="_blank"  href="${pathFileUpload}${parse_file[i]}"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i>${((jenis_data == 1)? parse_name[i] : parse_file[i])}</a>
           </div>
          <div class="col-2">
           <button type="button" class="btn bg-gradient-danger btn-sm btn_delete_file" nm-file="${((jenis_data == 1)? parse_name[i] : parse_file[i])}" no-rek="${no_rekening}" id-file ="${id}" onclick="delete_file(this)">Delete</button>
           </div>
          </div>`
      }
    }
    return $('#file-' + id + '').html(list_data);
  }
}

$('#inputStatusVerifikasi').change(function () {
  Swal.fire({
    title: 'Apakah Anda Yakin Ingin Mengubah Status E-Filling?',
    showCancelButton: true,
    confirmButtonText: `Simpan`,
    icon: 'question',
  }).then((result) => {
    if (result.value) {
      let data = {
        status: $(this).val(),
        user_id: parseJwt(token).id,
        no_rekening: $(this).attr('no_rekening')
      }
      $.ajax({
        url: base_url + "E_FilingController/Update_status",
        type: "POST",
        data: data,
        dataType: 'json',
        headers: {
          "Authorization": `Bearer ${token}`
        },
        beforeSend: function () {
          $('#loading-2').show();
        },
        success: function (respon) {
          $('#loading-2').hide();
          if (respon.success == true) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: respon.message,
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: respon.message,
              showConfirmButton: false,
              timer: 1500
            })
          }
        }
      })
    } else if (result.dismiss === 'Tidak') {
      return false
    }
  })

});

function closeViewEfiling() {
  $('#modal_view_efiling').modal('hide');
  $('.custom-file-view').each(function (index, item) {
    $(item).empty();
  });
  let kode_area = $('#kode_kantor').val();
  let filter_release = $('#filter_release').val();
  let status = $('#status').val();
  let search = $("#search").val();
  filter_efiling(kode_area, filter_release, status, search);
}
