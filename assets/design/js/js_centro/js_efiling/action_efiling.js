function get_date_time_now(){
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date+' '+time;
  return dateTime
}

// Btn action list Efiling
function action_Data() {
  let list_memory = [];

  function useClickEvent_by_Class(data_list) {
    let len_i = data_list.length;
    for (let i = 0; i < len_i; i++) {
      let elems_i = document.getElementsByClassName([data_list[i].class]);
      for (let j = 0, len_j = elems_i.length; j < len_j; j++) { //loop the elems by clasname 
        elems_i[j].addEventListener(data_list[i].action, data_list[i].method);
      }
    }
    if (data_list.saveOrNot) {
      list_memory.push(data_list);
    }
  }
  useClickEvent_by_Class([{
    class: "edit",
    action: "click",
    method: detailData_toFormEfiling,
    seveOrNot: false,
  }, {
    class: "detail",
    action: "click",
    method: detailData_toFormEfiling,
    seveOrNot: false,
  }, {
    class: "verifikasi",
    action: "click",
    method: detailData_toFormEfiling,
    seveOrNot: false,
  }]);
}
/*Notes innerdata  form edit, verifikasi, dan detail---------------------------------------------------- */
function detailData_toFormEfiling() {
  let menu_title = this.getAttribute('title');
  if (menu_title == 'Edit' || menu_title == 'Verifikasi') { // menu get halaman edit dan verifikasi
    $('#modal_pengisian_efiling').modal('show');
    $('#loading-1').hide();
    $('#area_kerja').val($(this).parents("tr").find('td.area_kerja').text())
    $('#inp_plafon').val($(this).parents("tr").find('td.plafon').text())
    $('#inp_tenor').val($(this).parents("tr").find('td.tenor').text())
    let tgl_realisasi = $(this).parents("tr").find('td.tgl_realisasi').text()
    let no_rekening = $(this).parents("tr").find('td.no_rekening').text();
    $('#nomor_rekening').val(no_rekening)
    $('#tanggal_realisasi').val(tgl_realisasi)
    let kd_kantor = this.getAttribute('kode_kantor');
    $(".custom-file-input").attr({
      "kd_kantor": kd_kantor,
      "tgl_realisasi": tgl_realisasi,
      "no_rekening": no_rekening,
    });

    if (menu_title == 'Edit') {
      $('#title_form').text("Form Edit E-Fillling");
      $('#btn_save').hide();
      $('#menu_page').val('Edit')
    } else if (menu_title == 'Verifikasi') {
      $('#title_form').text("Form Verifikasi E-Filling");
      $('#btn_save').hide();
      $('#menu_page').val('Verifikasi')
    }

    // inner Select option verifikasi "verifikasi-option-nasabah"
    let frm_verif_nasabah = form_option_verifikasi("verifikasi-option-nasabah", "verifikasi_nasabah", menu_title)
    let frm_verif_premohonan_kredit = form_option_verifikasi("verifikasi-option-permohonan-kredit", "verifikasi_premohonan_kredit", menu_title)
    let frm_verif_jaminan = form_option_verifikasi("verifikasi-option-jaminan", "verifikasi_jaminan", menu_title)
    let frm_verif_bi_checking = form_option_verifikasi("verifikasi-option-bi-checking", "verifikasi_bi_checking", menu_title)
    let frm_verif_credit_analist = form_option_verifikasi("verifikasi-option-credit-analist", "verifikasi_credit_analist", menu_title)
    let frm_verif_legal = form_option_verifikasi("verifikasi-option-legal", "verifikasi_legal", menu_title)
    let frm_verif_spk_ndk = form_option_verifikasi("verifikasi-option-spk_ndk", "verifikasi_spk", menu_title)
    let frm_verif_foto = form_option_verifikasi("verifikasi-option-foto", "verifikasi_foto", menu_title)
    // get data detail
    getDetailDataNasabah_to_FormEfiling(no_rekening, "loading-1", menu_title)
  } else { // menu get halaman view
    $('#modal_view_efiling').modal('show');
    $('#loading-2').hide();
    $('#view_area_kerja').val($(this).parents("tr").find('td.area_kerja').text())
    $('#view_nomor_rekening').val($(this).parents("tr").find('td.no_rekening').text())
    $('#view_inp_plafon').val($(this).parents("tr").find('td.plafon').text())
    $('#view_inp_tenor').val($(this).parents("tr").find('td.tenor').text())
    let tgl_realisasi = $(this).parents("tr").find('td.tgl_realisasi').text()
    $('#view_tanggal_realisasi').val(tgl_realisasi)
    let kd_kantor = this.getAttribute('kode_kantor');
    let no_rekening = $(this).parents("tr").find('td.no_rekening').text();

    $(".custom-file-input").attr({
      "kd_kantor": kd_kantor,
      "tgl_realisasi": tgl_realisasi,
      "no_rekening": no_rekening
    });
    getDetailDataNasabah_to_FormEfiling(no_rekening, "loading-2", menu_title)
  }

}

function form_option_verifikasi(frm_verifikasi, id, menu_title) {
  let select_option_status =
    `<div class="form-group row">
    <label for="${id}" class="col-sm-2 col-form-label">Status</label>
    <div class="col-sm-8">
    <select class="form-group form-control" id="${id}"  onchange="check('${id}','ket-${id}')">
        <option value="">SELECT STATUS</option>
        <option value="1">COMPLETED</option>
        <option value="2">NOT COMPLETED</option>
    </select>
    </div>
  </div>`

  let form_notes_edit =
    `<div class="card-body">
    <div class="col-sm-12" style="display: flex;">
        <div class="col-sm-2">Status </div>
        <div class="col-sm-8"
        id="${id}"></div>
    </div>
    <div class="col-sm-12" style="display: flex;">
        <div class="col-sm-2">Notes </div>
        <div class="col-sm-8" id="note_${id}"></div>
    </div>
  </div>`

  let form_notes_verifikasi =
    `<div  id="ket-${id}" style="display:none;" >
    <div class="form-group row">
    <label for="note_${id}" class="col-sm-2 col-form-label">Notes</label>
    <div class="col-sm-8">
    <textarea class="form-group form-control" id="note_${id}" rows="3" placeholder="Enter ..."></textarea>
    </div>
    </div>
  </div>`

  let form = ''
  if (menu_title == 'Edit') {
    form = form_notes_edit;
  } else if (menu_title == 'Verifikasi') {
    form = select_option_status + form_notes_verifikasi;
  }
  return $('#' + frm_verifikasi + '').html(form);
}

// Show form input notes status Verifikasi
function check(id, ket) {
  let val = $('#' + id + '').val()
  if (val == 2) {
    $('#' + ket + '').css("display", "block");
    $('#btn_save').show();
    $('#btn-close').hide();
  } else if (val == 1) {
    $('#' + ket + '').css("display", "none");
    $('#btn_save').show();
    $('#btn-close').hide();
  } else {
    $('#' + ket + '').css("display", "none");
    $('#btn-close').show();
    $('#btn_save').hide();
  }
}

function getDetailDataNasabah_to_FormEfiling(no_rekening, loading, menu_title) {
  $.ajax({
    url: api_url+"api/master/centro/show/" + no_rekening,
    type: "GET",
    dataType: "json",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    beforeSend: function () {
      $('#' + loading + '').show();
    },
    success: function (respon) {
      $('#' + loading + '').hide();
      if (menu_title == 'View') {
        detailViewEfiling(respon)
      } else {
        detailDataEfiling(respon, menu_title)
      }
    }
  })
}

function detailDataEfiling(respon, menu_title) {
  let data = respon.data;
  // ket Is_jenis 1 = Sefin, Is_jenis 2 = webtool
  let jenis_data = data.efilling['is_jenis'];
  let no_rekening = ((data.header_efiling== null)? '' : data.header_efiling['no_rekening'])

  $(".custom-file-input").attr({
    "is_jenis": jenis_data
  })
  let path_file = data.efilling['folder_master'];
  let pathFileUpload = '';
  if (jenis_data == 1) {
    pathFileUpload = `${path_file}/`;
  } else {
    // link  http://103.234.254.186/efiling/2018/03/02/02-38-00029-18/fatmah%20-%20PH.pdf
    let tgl_realisasi = '';
    let kode_kantor = '';
    let y = '';
    let m = '';
    let no_rek_webtool = '';
    if (data.efilling['no_rekening_lama'] == null) {
      no_rek_webtool = ((data.header_efiling == null) ? '' : data.header_efiling['no_rekening'])
      tgl_realisasi = ((data.header_efiling == null) ? '' : data.header_efiling['tgl_realisasi'])
      kode_kantor = ((data.header_efiling == null) ? '' : data.header_efiling['kode_kantor'])
      y = tgl_realisasi.split("-")[2]
      m = tgl_realisasi.split("-")[1]
    } else {
      no_rek_webtool = data.efilling['no_rekening_lama']
      tgl_realisasi = data.efilling['tgl_realisasi_eng_lama']
      kode_kantor = data.efilling['kode_kantor_lama']
      y = tgl_realisasi.split("-")[0]
      m = tgl_realisasi.split("-")[1]
    }

    pathFileUpload = `http://103.234.254.186/${path_file}/${y}/${m}/${kode_kantor}/${no_rek_webtool}/`;
  }

  $("#update_verifikasi_data").attr({
    "jenis_data": jenis_data
  });
  $('#nama_debitur').html(`Data E-Filling ${data.header_efiling['nama_debitur']}`)
  // variable get data status verifikasi efilling
  let status_nasabah = data.efilling_nasabah['verifikasi_nasabah'];
  let status_permohonan = data.efilling_permohonan['verifikasi_permohonan'];
  let status_jaminan = data.efilling_jaminan['verifikasi_jaminan'];
  let status_bichecking = data.efilling_bichecking['verifikasi_bichecking'];
  let status_ca = data.efilling_ca['verifikasi_ca'];
  let status_legal = data.efilling_legal['verifikasi_legal'];
  let status_spkndk = data.efilling_spkndk['verifikasi_spkndk'];
  let status_foto = data.efilling_foto['verifikasi_foto'];

  // notes innerNotes (data notes, id inner html, status efiling)
  let notes_nasabah = innertNotes(data.efilling_nasabah['notes_nasabah'], "verifikasi_nasabah", status_nasabah, menu_title)
  let notes_bi_checking = innertNotes(data.efilling_bichecking['notes_bichecking'], "verifikasi_bi_checking", status_bichecking, menu_title)
  let notes_credit_analist = innertNotes(data.efilling_ca['notes_ca'], "verifikasi_credit_analist", status_ca, menu_title)
  let notes_foto = innertNotes(data.efilling_foto['notes_foto'], "verifikasi_foto", status_foto, menu_title)
  let notes_jaminan = innertNotes(data.efilling_jaminan['notes_jaminan'], "verifikasi_jaminan", status_jaminan, menu_title)
  let notes_legal = innertNotes(data.efilling_legal['notes_legal'], "verifikasi_legal", status_legal, menu_title)
  let notes_permohonan_kredit = innertNotes(data.efilling_permohonan['notes_permohonan'], "verifikasi_premohonan_kredit", status_permohonan, menu_title)
  let notes_spk_ndk = innertNotes(data.efilling_spkndk['notes_spkndk'], "verifikasi_spk", status_spkndk, menu_title)
  let menu = ''
  if (menu_title == 'Edit') {
    menu = '_edit'
  }
  // notes innerStatusVerifikasi(status, inner data to id, menu_title)
  let verifikasi_nasabah = innerStatusVerifikasi(status_nasabah, "verifikasi_nasabah", menu_title)
  let verifikasi_bi_checking = innerStatusVerifikasi(status_bichecking, "verifikasi_bi_checking", menu_title)
  let verifikasi_credit_analist = innerStatusVerifikasi(status_ca, "verifikasi_credit_analist", menu_title)
  let verifikasi_foto = innerStatusVerifikasi(status_foto, "verifikasi_foto", menu_title)
  let verifikasi_jaminan = innerStatusVerifikasi(status_jaminan, "verifikasi_jaminan", menu_title)
  let verifikasi_legal = innerStatusVerifikasi(status_legal, "verifikasi_legal", menu_title)
  let verifikasi_permohonan_kredit = innerStatusVerifikasi(status_permohonan, "verifikasi_premohonan_kredit", menu_title)
  let verifikasi_spk_ndk = innerStatusVerifikasi(status_spkndk, "verifikasi_spk", menu_title)
  /*Notes Function menu InnerListData(data, jenis data, pathUpload, id inner data ke html, no rekening )*/
  // Data nasabah
  let nasbah_ktp = innerListData(data.efilling_nasabah['ktp'],data.efilling_nasabah['ktp_nama'], jenis_data, pathFileUpload, "ktp_all", no_rekening);
  let nasabah_kk = innerListData(data.efilling_nasabah['kk'], data.efilling_nasabah['kk_nama'],jenis_data, pathFileUpload, "kartu_keluarga", no_rekening);
  let nasbah_npwp = innerListData(data.efilling_nasabah['npwp'], data.efilling_nasabah['npwp_nama'], jenis_data, pathFileUpload, "inp_npwp", no_rekening);
  let nasabah_surat_nikah = innerListData(data.efilling_nasabah['surat_nikah'], data.efilling_nasabah['surat_nikah_nama'], jenis_data, pathFileUpload, "surat_nikah", no_rekening);
  let nasabah_surat_cerai = innerListData(data.efilling_nasabah['surat_cerai'], data.efilling_nasabah['surat_cerai_nama'], jenis_data, pathFileUpload, "surat_cerai", no_rekening);
  let nasabah_surat_lahir = innerListData(data.efilling_nasabah['surat_lahir'], data.efilling_nasabah['surat_lahir_nama'], jenis_data, pathFileUpload, "surat_lahir", no_rekening);
  let nasabah_surat_kematian = innerListData(data.efilling_nasabah['surat_kematian'], data.efilling_nasabah['surat_kematian_nama'], jenis_data, pathFileUpload, "surat_kematian", no_rekening);
  let nasabah_skd = innerListData(data.efilling_nasabah['skd'], data.efilling_nasabah['skd_nama'], jenis_data, pathFileUpload, "surat_keterangan_desa", no_rekening);
  let nasabah_slip_gaji = innerListData(data.efilling_nasabah['slip_gaji'], data.efilling_nasabah['slip_gaji_nama'], jenis_data, pathFileUpload, "slip_gaji", no_rekening);
  let nasabah_take_over = innerListData(data.efilling_nasabah['take_over'], data.efilling_nasabah['take_over_nama'], jenis_data, pathFileUpload, "take_over", no_rekening);
  let nasabah_sk_kerja = innerListData(data.efilling_nasabah['sk_kerja'], data.efilling_nasabah['sk_kerja_nama'], jenis_data, pathFileUpload, "surat_keterangan_kerja", no_rekening);
  let nasabah_sk_usaha = innerListData(data.efilling_nasabah['sk_usaha'], data.efilling_nasabah['sk_usaha_nama'], jenis_data, pathFileUpload, "surat_keterangan_usaha", no_rekening);
  let nasabah_rek_koran = innerListData(data.efilling_nasabah['rek_koran'], data.efilling_nasabah['rek_koran_nama'], jenis_data, pathFileUpload, "rekening_koran", no_rekening);
  let nasabah_tdp = innerListData(data.efilling_nasabah['tdp'], data.efilling_nasabah['tdp_nama'], jenis_data, pathFileUpload, "tdp_siup", no_rekening);
  let nasabah_bon_usaha = innerListData(data.efilling_nasabah['bon_usaha'], data.efilling_nasabah['bon_usaha_nama'], jenis_data, pathFileUpload, "bon_usaha", no_rekening);
  // Data permohonan kredit
  let permohonan_kredit_aplikasi = innerListData(data.efilling_permohonan['aplikasi'], data.efilling_permohonan['aplikasi_nama'], jenis_data, pathFileUpload, "aplikasi_permohonan_kredit", no_rekening);
  let permohonan_kredit_denah_lokasi = innerListData(data.efilling_permohonan['denah_lokasi'], data.efilling_permohonan['denah_lokasi_nama'], jenis_data, pathFileUpload, "denah_lokasi", no_rekening);
  let permohonan_kredit_checklist_kelengkapan = innerListData(data.efilling_permohonan['checklist_kelengkapan'], data.efilling_permohonan['checklist_kelengkapan_nama'], jenis_data, pathFileUpload, "kelengkapan_dokumen_kredit", no_rekening);
  // Data jaminan
  let jaminan_adendum = innerListData(data.efilling_jaminan['adendum'], data.efilling_jaminan['adendum_nama'], jenis_data, pathFileUpload, "jaminan_addendum", no_rekening);
  let jaminan_ahli_waris = innerListData(data.efilling_jaminan['ahli_waris'], data.efilling_jaminan['ahli_waris_nama'], jenis_data, pathFileUpload, "jaminan_ahli_waris", no_rekening);
  let jaminan_ajb = innerListData(data.efilling_jaminan['ajb'], data.efilling_jaminan['ajb_nama'], jenis_data, pathFileUpload, "jaminan_ajb", no_rekening);
  let jaminan_akta_pengakuan_hak_bersama = innerListData(data.efilling_jaminan['akta_pengakuan_hak_bersama'], data.efilling_jaminan['akta_pengakuan_hak_bersama_nama'], jenis_data, pathFileUpload, "jaminan_pengakuan_hak", no_rekening);
  let jaminan_apht = innerListData(data.efilling_jaminan['apht'], data.efilling_jaminan['apht_nama'], jenis_data, pathFileUpload, "jaminan_apht", no_rekening);
  let jaminan_bpkb = innerListData(data.efilling_jaminan['bpkb'], data.efilling_jaminan['bpkb_nama'], jenis_data, pathFileUpload, "jaminan_bpkb", no_rekening);
  let jaminan_cabut_roya = innerListData(data.efilling_jaminan['cabut_roya'], data.efilling_jaminan['cabut_roya_nama'], jenis_data, pathFileUpload, "jaminan_roya", no_rekening);
  let jaminan_fidusia = innerListData(data.efilling_jaminan['fidusia'], data.efilling_jaminan['fidusia_nama'], jenis_data, pathFileUpload, "jaminan_fidusia", no_rekening);
  let jaminan_imb = innerListData(data.efilling_jaminan['imb'], data.efilling_jaminan['imb_nama'], jenis_data, pathFileUpload, "jaminan_imb", no_rekening);
  let jaminan_pbb = innerListData(data.efilling_jaminan['pbb'], data.efilling_jaminan['pbb_nama'], jenis_data, pathFileUpload, "jaminan_pbb", no_rekening);
  let jaminan_pengakuan_hutang = innerListData(data.efilling_jaminan['pengakuan_hutang'], data.efilling_jaminan['pengakuan_hutang_nama'], jenis_data, pathFileUpload, "jaminan_pengakuan_hutang", no_rekening);
  let jaminan_sertifikat = innerListData(data.efilling_jaminan['sertifikat'], data.efilling_jaminan['sertifikat_nama'], jenis_data, pathFileUpload, "jaminan_sertifikat", no_rekening);
  let jaminan_sht = innerListData(data.efilling_jaminan['sht'], data.efilling_jaminan['sht_nama'], jenis_data, pathFileUpload, "jaminan_sht", no_rekening);
  let jaminan_skmht = innerListData(data.efilling_jaminan['skmht'], data.efilling_jaminan['skmht_nama'], jenis_data, pathFileUpload, "jaminan_skmht", no_rekening);

  // Data bi checking
  let bi_checking_hasil = innerListData(data.efilling_bichecking['hasil'], data.efilling_bichecking['hasil_nama'], jenis_data, pathFileUpload, "view_form_hasil_bi_checking");
  let bi_checking_persetujuan = innerListData(data.efilling_bichecking['persetujuan'], data.efilling_bichecking['persetujuan_nama'], jenis_data, pathFileUpload, "persetujuan_bi_checking", no_rekening);
  let bi_checking_pengajuan_bi = innerListData(data.efilling_bichecking['pengajuan_bi'], data.efilling_bichecking['pengajuan_bi_nama'], jenis_data, pathFileUpload, "pengajuan_bi_checking", no_rekening);
  // Data credit analist
  let credit_analist_cheklist_survey = innerListData(data.efilling_ca['cheklist_survey'], data.efilling_ca['cheklist_survey_nama'], jenis_data, pathFileUpload, "checklist_survey", no_rekening);
  let credit_analist_memo_ao = innerListData(data.efilling_ca['memo_ao'], data.efilling_ca['memo_ao_nama'], jenis_data, pathFileUpload, "credit_analist_memo_ao", no_rekening);
  let credit_analist_memo_ca = innerListData(data.efilling_ca['memo_ca'], data.efilling_ca['memo_ca_nama'], jenis_data, pathFileUpload, "credit_analist_memo_ca", no_rekening);
  let credit_analist_offering_letter = innerListData(data.efilling_ca['offering_letter'], data.efilling_ca['offering_letter_nama'], jenis_data, pathFileUpload, "offering_letter", no_rekening);
  let credit_analist_penilaian_jaminan = innerListData(data.efilling_ca['penilaian_jaminan'], data.efilling_ca['penilaian_jaminan_nama'], jenis_data, pathFileUpload, "verifikasi_penilaian", no_rekening);
  let credit_analist_persetujuan_kredit = innerListData(data.efilling_ca['persetujuan_kredit'], data.efilling_ca['persetujuan_kredit_nama'], jenis_data, pathFileUpload, "persetujuan_kredit", no_rekening);
  // Data legal
  let legal_cheklist_pengikatan = innerListData(data.efilling_legal['cheklist_pengikatan'], data.efilling_legal['cheklist_pengikatan_nama'], jenis_data, pathFileUpload, "check_pengikatan", no_rekening);
  let legal_lpdk = innerListData(data.efilling_legal['lpdk'], data.efilling_legal['lpdk_nama'], jenis_data, pathFileUpload, "lpdk",no_rekening);
  let legal_order_pengikatan = innerListData(data.efilling_legal['order_pengikatan'], data.efilling_legal['order_pengikatan_nama'], jenis_data, pathFileUpload, "oder_pengikatan", no_rekening);
  let legal_pengajuan_lpdk = innerListData(data.efilling_legal['pengajuan_lpdk'], data.efilling_legal['pengajuan_lpdk_nama'], jenis_data, pathFileUpload, "pengajuan", no_rekening);
  // Data spk & ndk
  let spk_ndk_asuransi = innerListData(data.efilling_spkndk['asuransi'], data.efilling_spkndk['asuransi_nama'], jenis_data, pathFileUpload, "asuransi", no_rekening);
  let spk_ndk_hal_penting = innerListData(data.efilling_spkndk['hal_penting'], data.efilling_spkndk['hal_penting_nama'], jenis_data, pathFileUpload, "hal_penting", no_rekening);
  let spk_ndk_hold_dana = innerListData(data.efilling_spkndk['hold_dana'], data.efilling_spkndk['hold_dana_nama'], jenis_data, pathFileUpload, "hold_dana", no_rekening);
  let spk_ndk_jadwal_angsuran = innerListData(data.efilling_spkndk['jadwal_angsuran'], data.efilling_spkndk['jadwal_angsuran_nama'], jenis_data, pathFileUpload, "jadwal_angsuran", no_rekening);
  let spk_ndk_keabsahan_data = innerListData(data.efilling_spkndk['keabsahan_data'], data.efilling_spkndk['keabsahan_data_nama'], jenis_data, pathFileUpload, "srt_keabsahan", no_rekening);
  let spk_ndk_personal_guarantee = innerListData(data.efilling_spkndk['personal_guarantee'], data.efilling_spkndk['personal_guarantee_nama'], jenis_data, pathFileUpload, "personal_guarantee", no_rekening);
  let spk_ndk_restruktur_bunga_denda = innerListData(data.efilling_spkndk['restruktur_bunga_denda'], data.efilling_spkndk['restruktur_bunga_denda_nama'], jenis_data, pathFileUpload, "denda", no_rekening);
  let spk_ndk_sp_authentic = innerListData(data.efilling_spkndk['sp_authentic'], data.efilling_spkndk['sp_authentic_nama'], jenis_data, pathFileUpload, "srt_auth", no_rekening);
  let spk_ndk_sp_beda_jt_tempo = innerListData(data.efilling_spkndk['sp_beda_jt_tempo'], data.efilling_spkndk['sp_beda_jt_tempo_nama'], jenis_data, pathFileUpload, "srt_jth_tempo", no_rekening);
  let spk_ndk_sp_no_imb = innerListData(data.efilling_spkndk['sp_no_imb'], data.efilling_spkndk['sp_no_imb_nama'], jenis_data, pathFileUpload, "sp_no_imb", no_rekening);
  let spk_ndk_sp_pendebetan_rekening = innerListData(data.efilling_spkndk['sp_pendebetan_rekening'], data.efilling_spkndk['sp_pendebetan_rekening_nama'], jenis_data, pathFileUpload, "pendebetan_rekening", no_rekening);
  let spk_ndk_sp_penyerahan_jaminan = innerListData(data.efilling_spkndk['sp_penyerahan_jaminan'], data.efilling_spkndk['sp_penyerahan_jaminan_nama'], jenis_data, pathFileUpload, "srt_penyerahan_jaminan", no_rekening);
  let spk_ndk_sp_plang = innerListData(data.efilling_spkndk['sp_plang'], data.efilling_spkndk['sp_plang_nama'], jenis_data, pathFileUpload, "sp_plang", no_rekening);
  let spk_ndk_spk_ndk = innerListData(data.efilling_spkndk['spk_ndk'], data.efilling_spkndk['spk_ndk_nama'], jenis_data, pathFileUpload, "spk", no_rekening);
  let spk_ndk_surat_aksep = innerListData(data.efilling_spkndk['surat_aksep'], data.efilling_spkndk['surat_aksep_nama'], jenis_data, pathFileUpload, "srt_aksep", no_rekening);
  let spk_ndk_surat_transfer = innerListData(data.efilling_spkndk['surat_transfer'], data.efilling_spkndk['surat_transfer_nama'], jenis_data, pathFileUpload, "srt_transfer", no_rekening);
  let spk_ndk_tt_uang = innerListData(data.efilling_spkndk['tt_uang'], data.efilling_spkndk['tt_uang_nama'], jenis_data, pathFileUpload, "tt_uang", no_rekening);
  let spk_ndk_spajk_spa_fpk = innerListData(data.efilling_spkndk['spajk_spa_fpk'], data.efilling_spkndk['spajk_spa_fpk_nama'], jenis_data, pathFileUpload, "spajk_spa_fpk", no_rekening);
  // Data foto
  let foto_ft_domisili = innerListData(data.efilling_foto['ft_domisili'], data.efilling_foto['ft_domisili_nama'], jenis_data, pathFileUpload, "foto_domisili", no_rekening);
  let foto_ft_jaminan = innerListData(data.efilling_foto['ft_jaminan'], data.efilling_foto['ft_jaminan_nama'], jenis_data, pathFileUpload, "foto_jaminan", no_rekening);
  let foto_ft_pengikatan = innerListData(data.efilling_foto['ft_pengikatan'], data.efilling_foto['ft_pengikatan_nama'], jenis_data, pathFileUpload, "foto_pengikatan", no_rekening);
  let foto_ft_usaha = innerListData(data.efilling_foto['ft_usaha'], data.efilling_foto['ft_usaha_nama'], jenis_data, pathFileUpload, "foto_usaha", no_rekening);
}

function innerListData(file,file_name, jenis_data, pathFileUpload, id, no_rekening) {
  if (file == null || file == "") {
    return $('#file-' + id + '').html("");
  } 
  else {
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
           <button type="button" class="btn bg-gradient-danger btn-sm btn_delete_file" nm-file="${((jenis_data == 1)? parse_name[i] : parse_file[i])}" no-rek="${no_rekening}" id-file ="${id}" onclick="delete_file(this)" data-toggle="tooltip" title="Delete"><i class="fa fa-trash" aria-hidden="true"></i>
           </button>
           </div>
          </div>`
      }
    }
    return $('#file-' + id + '').html(list_data);

  }
}

// option active edit data 
function innerStatusVerifikasi(statusVal, id, menu_title) {
  if (menu_title == 'Edit') {
    //Innertext detail Status Verifikasi 
    let text = '';
    if (statusVal == '1') {
      text = `<p class="view_status_done">DONE</p>`
    } else if (statusVal == '2') {
      text = `<p class="view_status_notcompleted">NOT COMPELETD</p>`
      $('#' + id).html(text)
    } else if (statusVal == '3') {
      text = `<p class="view_status_revisi">REVISI</p>`
    }
    return $('#' + id).html(text)

  } else {
    //Option detail Status Verifikasi 
    let op = '';
    if (op == null) {
      op = "0"
    } else {
      op = statusVal
    }
    return $("#" + id + " option[value='" + op + "']").prop("selected", true);
  }
}
// inner notes edit data 
function innertNotes(data, id, status, menu_title) {
  if (menu_title == 'Edit') {
    if (data == null|| status== null || status == 1) {
      $('#note_' + id).html("-")
    } else {
      $('#note_' + id).html(data)
    }
  } else {
    let text_notes = ''
    if (data !== null) {
      text_notes = $("#note_" + id).val(data)
    }
    if (status == 2) {
      text_notes = $("#ket-" + id).css("display", "block");
    }
    return text_notes
  }

}
