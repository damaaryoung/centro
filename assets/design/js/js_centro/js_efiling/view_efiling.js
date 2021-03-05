function detailViewEfiling(respon) {
  let data = respon.data;
  let path_file = data.efilling['folder_master'];
  let pathFileUpload = '';
  // ket Is_jenis 1 = Sefin, Is_jenis 2 = webtool
  let jenis_data = data.efilling['is_jenis']
  let no_rekening = data.header_efiling['no_rekening']
  if (jenis_data == 1) {
    pathFileUpload = `${path_file}/`;
  } else {
    // http://192.168.1.2/efiling/2018/03/02/02-38-00029-18/fatmah%20-%20PH.pdf contoh link data efiling untuk webtool
    let tgl_realisasi = data.header_efiling['tgl_realisasi']
    let kode_kantor = data.header_efiling['kode_kantor']
    let y = tgl_realisasi.split("-")[2],
      m = tgl_realisasi.split("-")[1];
    pathFileUpload = `http://192.168.1.2/${path_file}/${y}/${m}/${kode_kantor}/${no_rekening}/`;
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

  let notes_bi_checking = notes(data.efilling_bichecking['notes_bichecking'], "notes_bi_checking")
  let notes_credit_analist = notes(data.efilling_ca['notes_ca'], "notes_credit_analist")
  let notes_foto = notes(data.efilling_foto['notes_foto'], "notes_foto")
  let notes_jaminan = notes(data.efilling_jaminan['notes_jaminan'], "notes_jaminan")
  let notes_legal = notes(data.efilling_legal['notes_legal'], "notes_legal")
  let notes_nasabah = notes(data.efilling_nasabah['notes_nasabah'], "notes_nasabah")
  let notes_permohonan_kredit = notes(data.efilling_permohonan['notes_permohonan'], "notes_permohonan_kredit")
  let notes_spk_ndk = notes(data.efilling_spkndk['notes_spkndk'], "notes_spk_ndk")

  function notes(notes, id_dt) {
    if (notes == null) {
      $('#view_' + id_dt).html("-")
    } else {
      $('#view_' + id_dt).html(notes)
    }
  }

  /**Notes Function menu innerDataNasabah(data, jenis data, pathUpload, id inner data ke html)*/
  // Data nasabah
  let nasbah_ktp = innerDataNasabah(data.efilling_nasabah['ktp'], jenis_data, pathFileUpload, "view_ktp");
  let nasabah_kk = innerDataNasabah(data.efilling_nasabah['kk'], jenis_data, pathFileUpload, "view_kk");
  let nasbah_npwp = innerDataNasabah(data.efilling_nasabah['npwp'], jenis_data, pathFileUpload, "view_npwp");
  let nasabah_surat_nikah = innerDataNasabah(data.efilling_nasabah['surat_nikah'], jenis_data, pathFileUpload, "view_surat_nikah");
  let nasabah_surat_cerai = innerDataNasabah(data.efilling_nasabah['surat_cerai'], jenis_data, pathFileUpload, "view_surat_cerai");
  let nasabah_surat_lahir = innerDataNasabah(data.efilling_nasabah['surat_lahir'], jenis_data, pathFileUpload, "view_surat_lahir");
  let nasabah_surat_kematian = innerDataNasabah(data.efilling_nasabah['surat_kematian'], jenis_data, pathFileUpload, "view_surat_kematian");
  let nasabah_skd = innerDataNasabah(data.efilling_nasabah['skd'], jenis_data, pathFileUpload, "view_surat_desa");
  let nasabah_slip_gaji = innerDataNasabah(data.efilling_nasabah['slip_gaji'], jenis_data, pathFileUpload, "view_slip_gaji");
  let nasabah_take_over = innerDataNasabah(data.efilling_nasabah['take_over'], jenis_data, pathFileUpload, "view_take_over");
  let nasabah_sk_kerja = innerDataNasabah(data.efilling_nasabah['sk_kerja'], jenis_data, pathFileUpload, "view_surat_kerja");
  let nasabah_sk_usaha = innerDataNasabah(data.efilling_nasabah['sk_usaha'], jenis_data, pathFileUpload, "view_surat_usaha");
  let nasabah_rek_koran = innerDataNasabah(data.efilling_nasabah['rek_koran'], jenis_data, pathFileUpload, "view_rekening_koran");
  let nasabah_tdp = innerDataNasabah(data.efilling_nasabah['tdp'], jenis_data, pathFileUpload, "view_tdp");
  let nasabah_bon_usaha = innerDataNasabah(data.efilling_nasabah['bon_usaha'], jenis_data, pathFileUpload, "view_bon_usaha");
  // Data permohonan kredit
  let permohonan_kredit_aplikasi = innerDataNasabah(data.efilling_permohonan['aplikasi'], jenis_data, pathFileUpload, "view_permohonan_kredit");
  let permohonan_kredit_denah_lokasi = innerDataNasabah(data.efilling_permohonan['denah_lokasi'], jenis_data, pathFileUpload, "view_denah_lokasi");
  let permohonan_kredit_checklist_kelengkapan = innerDataNasabah(data.efilling_permohonan['checklist_kelengkapan'], jenis_data, pathFileUpload, "view_kelengkapan_dokumen");
  // Data jaminan
  let jaminan_adendum = innerDataNasabah(data.efilling_jaminan['adendum'], jenis_data, pathFileUpload, "view_jaminan_addendum");
  let jaminan_ahli_waris = innerDataNasabah(data.efilling_jaminan['ahli_waris'], jenis_data, pathFileUpload, "view_jaminan_ahli_waris");
  let jaminan_ajb = innerDataNasabah(data.efilling_jaminan['ajb'], jenis_data, pathFileUpload, "view_jaminan_ajb");
  let jaminan_akta_pengakuan_hak_bersama = innerDataNasabah(data.efilling_jaminan['akta_pengakuan_hak_bersama'], jenis_data, pathFileUpload, "view_jaminan_pengakuan_hak");
  let jaminan_apht = innerDataNasabah(data.efilling_jaminan['apht'], jenis_data, pathFileUpload, "view_jaminan_apht");
  let jaminan_bpkb = innerDataNasabah(data.efilling_jaminan['bpkb'], jenis_data, pathFileUpload, "view_jaminan_bpkb");
  let jaminan_cabut_roya = innerDataNasabah(data.efilling_jaminan['cabut_roya'], jenis_data, pathFileUpload, "view_jaminan_roya");
  let jaminan_fidusia = innerDataNasabah(data.efilling_jaminan['fidusia'], jenis_data, pathFileUpload, "view_jaminan_fidusia");
  let jaminan_imb = innerDataNasabah(data.efilling_jaminan['imb'], jenis_data, pathFileUpload, "view_jaminan_imb");
  let jaminan_pbb = innerDataNasabah(data.efilling_jaminan['pbb'], jenis_data, pathFileUpload, "view_jaminan_pbb");
  let jaminan_pengakuan_hutang = innerDataNasabah(data.efilling_jaminan['pengakuan_hutang'], jenis_data, pathFileUpload, "view_jaminan_pengakuan_hutang");
  let jaminan_sertifikat = innerDataNasabah(data.efilling_jaminan['sertifikat'], jenis_data, pathFileUpload, "view_jaminan_sertifikat");
  let jaminan_sht = innerDataNasabah(data.efilling_jaminan['sht'], jenis_data, pathFileUpload, "view_jaminan_sht");
  let jaminan_skmht = innerDataNasabah(data.efilling_jaminan['skmht'], jenis_data, pathFileUpload, "view_jaminan_skmht");
  // Data bi checking
  // let bi_checking_hasil = innerDataNasabah(data.efilling_bichecking['hasil'], jenis_data, pathFileUpload, "view_form_hasil_bi_checking");
  let bi_checking_persetujuan = innerDataNasabah(data.efilling_bichecking['persetujuan'], jenis_data, pathFileUpload, "view_form_persetujuan_bi_checking");
  let bi_checking_pengajuan_bi = innerDataNasabah(data.efilling_bichecking['pengajuan_bi'], jenis_data, pathFileUpload, "view_form_pengajuan_bi_checking");
  // Data credit analist
  let credit_analist_cheklist_survey = innerDataNasabah(data.efilling_ca['cheklist_survey'], jenis_data, pathFileUpload, "view_checklist_survey");
  let credit_analist_memo_ao = innerDataNasabah(data.efilling_ca['memo_ao'], jenis_data, pathFileUpload, "view_account_office");
  let credit_analist_memo_ca = innerDataNasabah(data.efilling_ca['memo_ca'], jenis_data, pathFileUpload, "view_credit_analist");
  let credit_analist_offering_letter = innerDataNasabah(data.efilling_ca['offering_letter'], jenis_data, pathFileUpload, "view_offering_let");
  let credit_analist_penilaian_jaminan = innerDataNasabah(data.efilling_ca['penilaian_jaminan'], jenis_data, pathFileUpload, "view_verifikasi_jaminan");
  let credit_analist_persetujuan_kredit = innerDataNasabah(data.efilling_ca['persetujuan_kredit'], jenis_data, pathFileUpload, "view_credit_auth_approv");
  // Data legal
  let legal_cheklist_pengikatan = innerDataNasabah(data.efilling_legal['cheklist_pengikatan'], jenis_data, pathFileUpload, "view_check_pengikatan");
  let legal_lpdk = innerDataNasabah(data.efilling_legal['lpdk'], jenis_data, pathFileUpload, "view_lpdk");
  let legal_order_pengikatan = innerDataNasabah(data.efilling_legal['order_pengikatan'], jenis_data, pathFileUpload, "view_oder_pengikatan");
  let legal_pengajuan_lpdk = innerDataNasabah(data.efilling_legal['pengajuan_lpdk'], jenis_data, pathFileUpload, "view_pengajuan");
  // Data spk & ndk
  let spk_ndk_asuransi = innerDataNasabah(data.efilling_spkndk['asuransi'], jenis_data, pathFileUpload, "view_asuransi");
  let spk_ndk_hal_penting = innerDataNasabah(data.efilling_spkndk['hal_penting'], jenis_data, pathFileUpload, "view_hal_lain");
  let spk_ndk_hold_dana = innerDataNasabah(data.efilling_spkndk['hold_dana'], jenis_data, pathFileUpload, "view_hold_dana");
  let spk_ndk_jadwal_angsuran = innerDataNasabah(data.efilling_spkndk['jadwal_angsuran'], jenis_data, pathFileUpload, "view_jadwal_angsuran");
  let spk_ndk_keabsahan_data = innerDataNasabah(data.efilling_spkndk['keabsahan_data'], jenis_data, pathFileUpload, "view_srt_keabsahan");
  let spk_ndk_personal_guarantee = innerDataNasabah(data.efilling_spkndk['personal_guarantee'], jenis_data, pathFileUpload, "view_penjamin");
  let spk_ndk_restruktur_bunga_denda = innerDataNasabah(data.efilling_spkndk['restruktur_bunga_denda'], jenis_data, pathFileUpload, "view_denda");
  let spk_ndk_sp_authentic = innerDataNasabah(data.efilling_spkndk['sp_authentic'], jenis_data, pathFileUpload, "view_srt_auth");
  let spk_ndk_sp_beda_jt_tempo = innerDataNasabah(data.efilling_spkndk['sp_beda_jt_tempo'], jenis_data, pathFileUpload, "view_srt_jth_tempo");
  let spk_ndk_sp_no_imb = innerDataNasabah(data.efilling_spkndk['sp_no_imb'], jenis_data, pathFileUpload, "view_no_IMB");
  let spk_ndk_sp_pendebetan_rekening = innerDataNasabah(data.efilling_spkndk['sp_pendebetan_rekening'], jenis_data, pathFileUpload, "view_pendebetan_rekening");
  let spk_ndk_sp_penyerahan_jaminan = innerDataNasabah(data.efilling_spkndk['sp_penyerahan_jaminan'], jenis_data, pathFileUpload, "view_srt_penyerahan_jaminan");
  let spk_ndk_sp_plang = innerDataNasabah(data.efilling_spkndk['sp_plang'], jenis_data, pathFileUpload, "view_plang");
  let spk_ndk_spk_ndk = innerDataNasabah(data.efilling_spkndk['spk_ndk'], jenis_data, pathFileUpload, "view_spk");
  let spk_ndk_surat_aksep = innerDataNasabah(data.efilling_spkndk['surat_aksep'], jenis_data, pathFileUpload, "view_srt_aksep");
  let spk_ndk_surat_transfer = innerDataNasabah(data.efilling_spkndk['surat_transfer'], jenis_data, pathFileUpload, "view_srt_transfer");
  let spk_ndk_tt_uang = innerDataNasabah(data.efilling_spkndk['tt_uang'], jenis_data, pathFileUpload, "view_tandaterima_nasabah");
  // let spk_ndk_spajk_spa_fpk = innerDataNasabah(data.efilling_spkndk['spajk_spa_fpk'], jenis_data, pathFileUpload, "view_spajk_spa_fpk");
  // Data foto
  let foto_ft_domisili = innerDataNasabah(data.efilling_foto['ft_domisili'], jenis_data, pathFileUpload, "view_foto_domisili");
  let foto_ft_jaminan = innerDataNasabah(data.efilling_foto['ft_jaminan'], jenis_data, pathFileUpload, "view_foto_jaminan");
  let foto_ft_pengikatan = innerDataNasabah(data.efilling_foto['ft_pengikatan'], jenis_data, pathFileUpload, "view_foto_pengikatan");
  let foto_ft_usaha = innerDataNasabah(data.efilling_foto['ft_usaha'], jenis_data, pathFileUpload, "view_foto_usaha");

  //Release Aset
  if (data.efilling_aset !== null) {
    let ra_tanda_terima = innerDataAsset(data.efilling_aset['ra_tanda_terima'], jenis_data, pathFileUpload, "tanda_terima_ra", no_rekening);
    let ra_surat_kuasa = innerDataAsset(data.efilling_aset['ra_surat_kuasa'], jenis_data, pathFileUpload, "surat_kuasa_ra", no_rekening);
    let ra_identitas_pengambilan = innerDataAsset(data.efilling_aset['ra_identitas_pengambilan'], jenis_data, pathFileUpload, "identitas_pengambilan_ra", no_rekening);
    let ra_lainnya = innerDataAsset(data.efilling_aset['ra_lainnya'], jenis_data, pathFileUpload, "lainnya_ra", no_rekening);
    let ra_serah_terima = innerDataAsset(data.efilling_aset['ra_serah_terima'], jenis_data, pathFileUpload, "serah_terima_ra", no_rekening);
  }
}

function innerDataNasabah(data, jenis_data, pathFileUpload, id) {
  if (data == null || data == '') {
    return $('#' + id + '').html(`<p class="ket-data-null"> Data tidak ada</p>`);
  } else {
    let list_data = "";
    $.each(JSON.parse(data), function (index, itemData) {
      if (itemData.length > 0) {
        list_data +=
          ` <a class="example-image-link" target="_blank"  href="${pathFileUpload}${itemData}"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i> ${((jenis_data == 2) ? itemData : ((itemData.split("/").length == 6 ) ? itemData.split("/")[5] : itemData.split("/")[3]))}</a></br>`;
        $('#' + id + '').html(list_data);
      }
    });
    return list_data;
  }
}

function innerDataAsset(data, jenis_data, pathFileUpload, id, no_rekening) {
  if (data == null || data == '') {
    return $('#file-' + id + '').html("");
  }else{
    let list_data = "";
    $.each(JSON.parse(data), function (index, itemData) {
      if (itemData.length > 0) {
        list_data +=
          `<div class="col-12 group-${id}" style ="display: flex; padding-bottom: 5px;" >
           <div class="col-10">
             <a class="example-image-link" target="_blank"  href="${pathFileUpload}${itemData}"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i> ${((jenis_data == 2) ? itemData : ((itemData.split("/").length == 6 ) ? itemData.split("/")[5] : itemData.split("/")[3]))}</a>
           </div>
         <div class="col-2">
           <button type="button" class="btn bg-gradient-danger btn-sm btn_delete_file" nm-file="${((jenis_data == 2) ? itemData : ((itemData.split("/").length == 6 ) ? itemData.split("/")[5] : itemData.split("/")[3]))}" no-rek="${no_rekening}" id-file ="${id}" onclick="delete_file(this)">Delete</button>
           </div>
         </div>`
        $('#file-' + id + '').html(list_data);
      }

    });
    return list_data;
  }
}

function getImgAsset(evt) {
  let fd = new FormData();
  let files = evt.target.files[0];
  let idFile = evt.target.getAttribute('id');
  let kd_kantor = evt.target.getAttribute('kd_kantor');
  let tgl_realisasi = evt.target.getAttribute('tgl_realisasi');
  let no_rekening = evt.target.getAttribute('no_rekening');
  fd.append('file', files);
  console.log(files, fd)
  // fd.append('idFile', idFile);
  // fd.append('kd_kantor', kd_kantor);
  // fd.append('tgl_realisasi', tgl_realisasi);
  // fd.append('no_rekening', no_rekening)
  // console.log(idFile)
  // if (idFile == 'tanda_terima_ra') {
  //   fd.append('lampiran_ktp', files);
  // }
  // if (idFile == 'surat_kuasa_ra') {
  //   fd.append('lampiran_kk[]', files);
  // }
  // if (idFile == 'identitas_pengambilan_ra') {
  //   fd.append('lampiran_npwp[]', files);
  // }
  // if (idFile == 'lainnya_ra') {
  //   fd.append('surat_nikah[]', files);
  // }
  // if (idFile == 'serah_terima_ra') {
  //   fd.append('surat_cerai[]', files);
  // }
// console.log(fd.append('lampiran_ktp', files))
  $.ajax({
      url:base_url + "E_FilingController/upload_efiling",
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
      cache: false,
      dataType: 'json',
      beforeSend: function () {
          $('#loading-2').show();
      },
      success: function(respon){

        // $('#file-' + idFile + '').append("");
        $('#loading-2').hide();
        alert("Upload " + idFile + " sukses");
        $('#' + idFile + '').val('');

  //       let list = 
  //       `<div class="col-12 group-${idFile}" style ="display: flex; padding-bottom: 5px;" >
  //           <div class="col-10">
  //               <i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i>  ${((is_jenis == 2) ? data[1] : ((data[1].split("/").length == 6 ) ? data[1].split("/")[5] : data[1].split("/")[3]))}
  //           </div>
  //       </div>`;
  //       $('#file-' + idFile + '').append(list);
  //       $('#btn_save_data').html(`<button type="button" class="btn btn-primary" onclick="updateData()">Save changes</button>`)
  //       $('#btn_close').hide();
      }
  });
}

$('#inputStatusVerifikasi').change(function () {
  let status = $(this).val();
  console.log(status)
});

function closeViewEfiling() {
  $('#modal_view_efiling').modal('hide');
  $('.custom-file-view').each(function (index, item) {
    $(item).empty();
  });
  location.reload();
}
