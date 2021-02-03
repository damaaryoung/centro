function detailViewEfiling(respon) {
  console.log(respon)
  let data = respon.data;
  let path_file = data['path_file'];
  let pathFileUpload = '';
  // ket Is_jenis 1 = Sefin, Is_jenis 2 = webtool
  if (data['is_jenis'] == 1) {
    pathFileUpload = `${path_file}/`;
  } else {
    pathFileUpload = `http://192.168.1.2/${path_file}/`;
  }

  let verifikasi_nasabah = status(data['verifikasi_nasabah'], "verifikasi_nasabah")
  let verifikasi_bi_checking = status(data['verifikasi_bi_checking'], "verifikasi_bi_checking")
  let verifikasi_credit_analist = status(data['verifikasi_credit_analist'], "verifikasi_credit_analist")
  let verifikasi_foto = status(data['verifikasi_foto'], "verifikasi_foto")
  let verifikasi_jaminan = status(data['verifikasi_jaminan'], "verifikasi_jaminan")
  let verifikasi_legal = status(data['verifikasi_legal'], "verifikasi_legal")
  let verifikasi_permohonan_kredit = status(data['verifikasi_permohonan_kredit'], "verifikasi_permohonan_kredit")
  let verifikasi_spk_ndk = status(data['verifikasi_spk_ndk'], "verifikasi_spk_ndk")
  let verifikasi_release_aset = status(data['verifikasi_release_aset'], "verifikasi_release_aset")

  function status(status, id_dt) {
    let text = '';
    if (status == '1') {
      text = `<p class="view_status_done">DONE</p>`
      $('#view_status_' + id_dt).html(text)
    } else if (status == '2') {
      text = `<p class="view_status_notcompleted">NOT COMPELETD</p>`
      $$('#view_status_' + id_dt).html(text)
    } else if (status == '3') {
      text = `<p class="view_status_revisi">REVISI</p>`
      $('#view_status_' + id_dt).html(text)
    } else {
      $('#view_status_' + id_dt).html("")
    }
  }

  let notes_bi_checking = notes(data['notes_bi_checking'], "notes_bi_checking")
  let notes_credit_analist = notes(data['notes_credit_analist'], "notes_credit_analist")
  let notes_foto = notes(data['notes_foto'], "notes_foto")
  let notes_jaminan = notes(data['notes_jaminan'], "notes_jaminan")
  let notes_legal = notes(data['notes_legal'], "notes_legal")
  let notes_nasabah = notes(data['notes_nasabah'], "notes_nasabah")
  let notes_permohonan_kredit = notes(data['notes_permohonan_kredit'], "notes_permohonan_kredit")
  let notes_release_aset = notes(data['notes_release_aset'], "notes_release_aset")
  let notes_spk_ndk = notes(data['notes_spk_ndk'], "notes_spk_ndk")

  function notes(notes, id_dt) {
    if (notes == null) {
      $('#view_' + id_dt).html("-")
    } else {
      $('#view_' + id_dt).html(notes)
    }
  }

  let jenis_data = data['is_jenis']
  // Data nasabah
  let nasbah_ktp = innerDataNasabah(data['nasabah_ktp'], jenis_data, pathFileUpload, "view_ktp");
  let nasabah_kk = innerDataNasabah(data['nasabah_kk'], jenis_data, pathFileUpload, "view_kk");
  let nasbah_npwp = innerDataNasabah(data['nasabah_npwp'], jenis_data, pathFileUpload, "view_npwp");
  let nasabah_surat_nikah = innerDataNasabah(data['nasabah_surat_nikah'], jenis_data, pathFileUpload, "view_surat_nikah");
  let nasabah_surat_cerai = innerDataNasabah(data['nasabah_surat_cerai'], jenis_data, pathFileUpload, "view_surat_cerai");
  let nasabah_surat_lahir = innerDataNasabah(data['nasabah_surat_lahir'], jenis_data, pathFileUpload, "view_surat_lahir");
  let nasabah_surat_kematian = innerDataNasabah(data['nasabah_surat_kematian'], jenis_data, pathFileUpload, "view_surat_kematian");
  let nasabah_skd = innerDataNasabah(data['nasabah_skd'], jenis_data, pathFileUpload, "view_surat_desa");
  let nasabah_slip_gaji = innerDataNasabah(data['nasabah_slip_gaji'], jenis_data, pathFileUpload, "view_slip_gaji");
  let nasabah_take_over = innerDataNasabah(data['nasabah_take_over'], jenis_data, pathFileUpload, "view_take_over");
  let nasabah_sk_kerja = innerDataNasabah(data['nasabah_sk_kerja'], jenis_data, pathFileUpload, "view_surat_kerja");
  let nasabah_sk_usaha = innerDataNasabah(data['nasabah_sk_usaha'], jenis_data, pathFileUpload, "view_surat_usaha");
  let nasabah_rek_koran = innerDataNasabah(data['nasabah_rek_koran'], jenis_data, pathFileUpload, "view_rekening_koran");
  let nasabah_tdp = innerDataNasabah(data['nasabah_tdp'], jenis_data, pathFileUpload, "view_tdp");
  let nasabah_bon_usaha = innerDataNasabah(data['nasabah_bon_usaha'], jenis_data, pathFileUpload, "view_bon_usaha");
  // Data permohonan kredit
  let permohonan_kredit_aplikasi = innerDataNasabah(data['permohonan_kredit_aplikasi'], jenis_data, pathFileUpload, "view_permohonan_kredit");
  let permohonan_kredit_denah_lokasi = innerDataNasabah(data['permohonan_kredit_denah_lokasi'], jenis_data, pathFileUpload, "view_denah_lokasi");
  let permohonan_kredit_checklist_kelengkapan = innerDataNasabah(data['permohonan_kredit_checklist_kelengkapan'], jenis_data, pathFileUpload, "view_kelengkapan_dokumen");
  // Data jaminan
  let jaminan_adendum = innerDataNasabah(data['jaminan_adendum'], jenis_data, pathFileUpload, "view_jaminan_addendum");
  let jaminan_ahli_waris = innerDataNasabah(data['jaminan_ahli_waris'], jenis_data, pathFileUpload, "view_jaminan_ahli_waris");
  let jaminan_ajb = innerDataNasabah(data['jaminan_ajb'], jenis_data, pathFileUpload, "view_jaminan_ajb");
  let jaminan_akta_pengakuan_hak_bersama = innerDataNasabah(data['jaminan_akta_pengakuan_hak_bersama'], jenis_data, pathFileUpload, "view_jaminan_pengakuan_hak");
  let jaminan_apht = innerDataNasabah(data['jaminan_apht'], jenis_data, pathFileUpload, "view_jaminan_apht");
  let jaminan_bpkb = innerDataNasabah(data['jaminan_bpkb'], jenis_data, pathFileUpload, "view_jaminan_bpkb");
  let jaminan_cabut_roya = innerDataNasabah(data['jaminan_cabut_roya'], jenis_data, pathFileUpload, "view_jaminan_roya");
  let jaminan_fidusia = innerDataNasabah(data['jaminan_fidusia'], jenis_data, pathFileUpload, "view_jaminan_fidusia");
  let jaminan_imb = innerDataNasabah(data['jaminan_imb'], jenis_data, pathFileUpload, "view_jaminan_imb");
  let jaminan_pbb = innerDataNasabah(data['jaminan_pbb'], jenis_data, pathFileUpload, "view_jaminan_pbb");
  let jaminan_pengakuan_hutang = innerDataNasabah(data['jaminan_pengakuan_hutang'], jenis_data, pathFileUpload, "view_jaminan_pengakuan_hutang");
  let jaminan_sertifikat = innerDataNasabah(data['jaminan_sertifikat'], jenis_data, pathFileUpload, "view_jaminan_sertifikat");
  let jaminan_sht = innerDataNasabah(data['jaminan_sht'], jenis_data, pathFileUpload, "view_jaminan_sht");
  let jaminan_skmht = innerDataNasabah(data['jaminan_skmht'], jenis_data, pathFileUpload, "view_jaminan_skmht");
  // Data bi checking
  // let bi_checking_hasil = innerDataNasabah(data['bi_checking_hasil'], jenis_data, pathFileUpload, "view_form_hasil_bi_checking");
  let bi_checking_persetujuan = innerDataNasabah(data['bi_checking_persetujuan'], jenis_data, pathFileUpload, "view_form_persetujuan_bi_checking");
  let bi_checking_pengajuan_bi = innerDataNasabah(data['bi_checking_pengajuan_bi'], jenis_data, pathFileUpload, "view_form_pengajuan_bi_checking");
  // Data credit analist
  let credit_analist_cheklist_survey = innerDataNasabah(data['credit_analist_cheklist_survey'], jenis_data, pathFileUpload, "view_checklist_survey");
  let credit_analist_memo_ao = innerDataNasabah(data['credit_analist_memo_ao'], jenis_data, pathFileUpload, "view_account_office");
  let credit_analist_memo_ca = innerDataNasabah(data['credit_analist_memo_ca'], jenis_data, pathFileUpload, "view_credit_analist");
  let credit_analist_offering_letter = innerDataNasabah(data['credit_analist_offering_letter'], jenis_data, pathFileUpload, "view_offering_let");
  let credit_analist_penilaian_jaminan = innerDataNasabah(data['credit_analist_penilaian_jaminan'], jenis_data, pathFileUpload, "view_verifikasi_jaminan");
  let credit_analist_persetujuan_kredit = innerDataNasabah(data['credit_analist_persetujuan_kredit'], jenis_data, pathFileUpload, "view_credit_auth_approv");
  // Data legal
  let legal_cheklist_pengikatan = innerDataNasabah(data['legal_cheklist_pengikatan'], jenis_data, pathFileUpload, "view_check_pengikatan");
  let legal_lpdk = innerDataNasabah(data['legal_lpdk'], jenis_data, pathFileUpload, "view_lpdk");
  let legal_order_pengikatan = innerDataNasabah(data['legal_order_pengikatan'], jenis_data, pathFileUpload, "view_oder_pengikatan");
  let legal_pengajuan_lpdk = innerDataNasabah(data['legal_pengajuan_lpdk'], jenis_data, pathFileUpload, "view_pengajuan");
  // Data spk & ndk
  let spk_ndk_asuransi = innerDataNasabah(data['spk_ndk_asuransi'], jenis_data, pathFileUpload, "view_asuransi");
  let spk_ndk_hal_penting = innerDataNasabah(data['spk_ndk_hal_penting'], jenis_data, pathFileUpload, "view_hal_lain");
  let spk_ndk_hold_dana = innerDataNasabah(data['spk_ndk_hold_dana'], jenis_data, pathFileUpload, "view_hold_dana");
  let spk_ndk_jadwal_angsuran = innerDataNasabah(data['spk_ndk_jadwal_angsuran'], jenis_data, pathFileUpload, "view_jadwal_angsuran");
  let spk_ndk_keabsahan_data = innerDataNasabah(data['spk_ndk_keabsahan_data'], jenis_data, pathFileUpload, "view_srt_keabsahan");
  let spk_ndk_personal_guarantee = innerDataNasabah(data['spk_ndk_personal_guarantee'], jenis_data, pathFileUpload, "view_penjamin");
  let spk_ndk_restruktur_bunga_denda = innerDataNasabah(data['spk_ndk_restruktur_bunga_denda'], jenis_data, pathFileUpload, "view_denda");
  let spk_ndk_sp_authentic = innerDataNasabah(data['spk_ndk_sp_authentic'], jenis_data, pathFileUpload, "view_srt_auth");
  let spk_ndk_sp_beda_jt_tempo = innerDataNasabah(data['spk_ndk_sp_beda_jt_tempo'], jenis_data, pathFileUpload, "view_srt_jth_tempo");
  let spk_ndk_sp_no_imb = innerDataNasabah(data['spk_ndk_sp_no_imb'], jenis_data, pathFileUpload, "view_no_IMB");
  let spk_ndk_sp_pendebetan_rekening = innerDataNasabah(data['spk_ndk_sp_pendebetan_rekening'], jenis_data, pathFileUpload, "view_pendebetan_rekening");
  let spk_ndk_sp_penyerahan_jaminan = innerDataNasabah(data['spk_ndk_sp_penyerahan_jaminan'], jenis_data, pathFileUpload, "view_srt_penyerahan_jaminan");
  let spk_ndk_sp_plang = innerDataNasabah(data['spk_ndk_sp_plang'], jenis_data, pathFileUpload, "view_plang");
  let spk_ndk_spk_ndk = innerDataNasabah(data['spk_ndk_spk_ndk'], jenis_data, pathFileUpload, "view_spk");
  let spk_ndk_surat_aksep = innerDataNasabah(data['spk_ndk_surat_aksep'], jenis_data, pathFileUpload, "view_srt_aksep");
  let spk_ndk_surat_transfer = innerDataNasabah(data['spk_ndk_surat_transfer'], jenis_data, pathFileUpload, "view_srt_transfer");
  let spk_ndk_tt_uang = innerDataNasabah(data['spk_ndk_tt_uang'], jenis_data, pathFileUpload, "view_tandaterima_nasabah");
  // Data foto
  let foto_ft_domisili = innerDataNasabah(data['foto_ft_domisili'], jenis_data, pathFileUpload, "view_foto_domisili");
  let foto_ft_jaminan = innerDataNasabah(data['foto_ft_jaminan'], jenis_data, pathFileUpload, "view_foto_jaminan");
  let foto_ft_pengikatan = innerDataNasabah(data['foto_ft_pengikatan'], jenis_data, pathFileUpload, "view_foto_pengikatan");
  let foto_ft_usaha = innerDataNasabah(data['foto_ft_usaha'], jenis_data, pathFileUpload, "view_foto_usaha");
}

function innerDataNasabah(data, jenis_data, pathFileUpload, id) {
  if (data == null) {
    return $('#' + id + '').html(`<p class="ket-data-null"> Data tidak ada</p>`);
  } else {
    let list_data = "";
    $.each(JSON.parse(data), function (index, itemData) {
      // list_data += `<a class="example-image-link" target="_blank"  href="${pathFileUpload}${itemData}"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i> ${((jenis_data == 2) ? itemData : ((itemData.split("/").length == 6 ) ? itemData.split("/")[5] : itemData.split("/")[3]))}</a></br>`;
      list_data += `<a class="example-image-link" target="_blank"  href="${pathFileUpload}${itemData}"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i> ${itemData}</a></br>`;
      $('#' + id + '').html(list_data);
    });
    return list_data;
  }
}

function getImgRa(evt) {
  let fd = new FormData();
  let files = evt.target.files[0];
  let idFile = evt.target.getAttribute('id');
  let kd_kantor = evt.target.getAttribute('kd_kantor');
  let tgl_realisasi = evt.target.getAttribute('tgl_realisasi');
  let no_rekening = evt.target.getAttribute('no_rekening');
  fd.append('file', files);
  fd.append('idFile', idFile);
  fd.append('kd_kantor', kd_kantor);
  fd.append('tgl_realisasi', tgl_realisasi);
  fd.append('no_rekening', no_rekening)

  // $.ajax({
  //     url:base_url + "E_FilingController/upload_efiling",
  //     type:"POST",
  //     data:fd,
  //     processData:false,
  //     contentType:false,
  //     cache:false,
  //     async:false,    
  //     dataType: 'json',
  //     beforeSend: function () {
  //         $('#loading-1').show();
  //     },
  //     success: function(respon){

  $('#file-' + idFile + '').append("");
  $('#loading-2').hide();
  alert("Upload " + idFile + " sukses");
  $('#' + idFile + '').val('');
  // console.log(respon.data["link"]);

  let list = `<div class="col-12" style ="display: flex; padding-bottom: 5px;">
                            <div class="col-12">
                                <a href="" target="_blank"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i> test</a>
                            </div>
                           
                        </div>`;
  $('#file-' + idFile + '').html(list);
  //     }
  // });
}


function closeViewEfiling() {
  $('#modal_view_efiling').modal('hide');
  $(".custom-file-input").empty();
  location.reload();
}
