// Check verifikasi form E Filing
function check(id, ket) {
  let val = $('#' + id + '').val()
  console.log(val)
  if (val == 2) {
    $('#' + ket + '').css("display", "block");
  } else {
    $('#' + ket + '').css("display", "none");
  }
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

function detailData_toFormEfiling() {
  let menu_title = this.getAttribute('title');
  if (menu_title == 'Edit' || menu_title == 'Verifikasi') {
    $('#modal_pengisian_efiling').modal('show');
    $('#loading-1').hide();
    $('#nama_debitur').html(`Data E-filing ${$(this).parents("tr").find('td.nama_debitur').text()}`)
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
      "no_rekening": no_rekening
    });

    if (menu_title == 'Edit') {
      $('#title_form').text("Form Edit E-Filing");
      $('#btn_save').html(`<button type="button" class="btn btn-primary" onclick="updateData()">Save changes</button>`)
    } else if (menu_title == 'Verifikasi') {
      $('#title_form').text("Form Verifikasi E-Filing");
      $('#btn_save').html(`<button type="button" class="btn btn-primary" onclick="updateData()">Save changes</button>`)
    }
    let menu=''
    if(menu_title == 'Edit'){
      menu = '_edit'
    }
    // inner Select option verifikasi
    let frm_verif_nasabah = form_option_verifikasi("verifikasi-option-nasabah", "verifikasi_nasabah"+menu, menu_title)
    let frm_verif_premohonan_kredit = form_option_verifikasi("verifikasi-option-permohonan-kredit", "verifikasi_premohonan_kredit"+menu, menu_title)
    let frm_verif_jaminan = form_option_verifikasi("verifikasi-option-jaminan", "verifikasi_jaminan"+menu, menu_title)
    let frm_verif_bi_checking = form_option_verifikasi("verifikasi-option-bi-checking", "verifikasi_bi_checking"+menu, menu_title)
    let frm_verif_credit_analist = form_option_verifikasi("verifikasi-option-credit-analist", "verifikasi_credit_analist"+menu, menu_title)
    let frm_verif_legal = form_option_verifikasi("verifikasi-option-legal", "verifikasi_legal"+menu, menu_title)
    let frm_verif_spk_ndk = form_option_verifikasi("verifikasi-option-spk_ndk", "verifikasi_spk"+menu, menu_title)
    let frm_verif_foto = form_option_verifikasi("verifikasi-option-foto", "verifikasi_foto"+menu, menu_title)
    // get data detail
    getDetailDataNasabah_to_FormEfiling(no_rekening, "loading-1", menu_title)
  } else { // menu get form view
    $('#modal_view_efiling').modal('show');
    $('#loading-2').hide();
    $('#view_debitur').html(`Data E-filing ${$(this).parents("tr").find('td.nama_debitur').text()}`)
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
  let form = ''
  if(menu_title == 'Edit'){
    form = `
    <div class="form-group row">
        <label for="${id}" class="col-sm-2 col-form-label">Status</label>
        <div class="col-sm-8">
        <select class="form-group form-control" id="${id}">
            <option value="null">SELECT STATUS</option>
            <option value="1">COMPLETED</option>
            <option value="2">NOT COMPLETED</option>
        </select>
        </div>
    </div>`
  }else if(menu_title == 'Verifikasi'){
    form = `
    <div class="form-group row">
        <label for="${id}" class="col-sm-2 col-form-label">Status</label>
        <div class="col-sm-8">
        <select class="form-group form-control" id="${id}"  onchange="check('${id}','ket-${id}')">
            <option value="null">SELECT STATUS</option>
            <option value="1">COMPLETED</option>
            <option value="2">NOT COMPLETED</option>
        </select>
        </div>
    </div>
    <div  id="ket-${id}" style="display:none;" >
        <div class="form-group row">
        <label for="note_${id}" class="col-sm-2 col-form-label">Notes</label>
        <div class="col-sm-8">
        <textarea class="form-group form-control" id="note_${id}" rows="3" placeholder="Enter ..."></textarea>
        </div>
        </div>
    </div>`;
  }
  
  return $('#' + frm_verifikasi + '').html(form);
}



function getDetailDataNasabah_to_FormEfiling(no_rekening, loading, menu_title) {
  let data = {
    no_rekening: no_rekening,
  }
  $.ajax({
    url: base_url + "E_FilingController/efiling_detail",
    type: "POST",
    dataType: "json",
    data: data,
    beforeSend: function () {
      $('#' + loading + '').show();
    },
    success: function (respon) {
      $('#' + loading + '').hide();
      if (menu_title == 'View') {
        detailViewEfiling(respon)
      } 
      else {
        detailDataEfiling(respon, menu_title, no_rekening)
      }
    }
  })
}

function detailDataEfiling(respon, menu_title, no_rekening){
  let data = respon.data;
  let path_file = data['path_file'];
  let pathFileUpload = '';
  if (data['is_jenis'] == 1) {
    pathFileUpload = `${path_file}/`;
  } else {
    pathFileUpload = `http://192.168.1.2/${path_file}/`;
  }
  
  let notes_nasabah = innertNotes(data['notes_nasabah'], "verifikasi_nasabah", data['verifikasi_nasabah'])
  let notes_bi_checking = innertNotes(data['notes_bi_checking'], "verifikasi_bi_checking", data['verifikasi_bi_checking'])
  let notes_credit_analist = innertNotes(data['notes_credit_analist'], "verifikasi_credit_analist", data['verifikasi_credit_analist'])
  let notes_foto = innertNotes(data['notes_foto'], "verifikasi_foto", data['verifikasi_foto'])
  let notes_jaminan = innertNotes(data['notes_jaminan'], "verifikasi_jaminan", data['verifikasi_jaminan'])
  let notes_legal = innertNotes(data['notes_legal'], "verifikasi_legal", data['verifikasi_legal'])
  let notes_permohonan_kredit = innertNotes(data['notes_permohonan_kredit'], "verifikasi_premohonan_kredit", data['verifikasi_permohonan_kredit'])
  let notes_spk_ndk = innertNotes(data['notes_spk_ndk'], "verifikasi_spk", data['verifikasi_spk_ndk'])
  let menu=''
  if(menu_title == 'Edit'){
    menu = '_edit'
  }
  let verifikasi_nasabah =  getOptionEditStatus(data['verifikasi_nasabah'], "verifikasi_nasabah"+menu)
  let verifikasi_bi_checking = getOptionEditStatus(data['verifikasi_bi_checking'], "verifikasi_bi_checking"+menu)
  let verifikasi_credit_analist = getOptionEditStatus(data['verifikasi_credit_analist'], "verifikasi_credit_analist"+menu)
  let verifikasi_foto = getOptionEditStatus(data['verifikasi_foto'], "verifikasi_foto"+menu)
  let verifikasi_jaminan = getOptionEditStatus(data['verifikasi_jaminan'], "verifikasi_jaminan"+menu)
  let verifikasi_legal = getOptionEditStatus(data['verifikasi_legal'], "verifikasi_legal"+menu)
  let verifikasi_permohonan_kredit = getOptionEditStatus(data['verifikasi_permohonan_kredit'], "verifikasi_premohonan_kredit"+menu)
  let verifikasi_spk_ndk = getOptionEditStatus(data['verifikasi_spk_ndk'], "verifikasi_spk"+menu)

  let jenis_data = data['is_jenis']
  // Data nasabah
  let nasbah_ktp = innerListData(data['nasabah_ktp'], jenis_data, pathFileUpload, "ktp_all", no_rekening);
  let nasabah_kk = innerListData(data['nasabah_kk'], jenis_data, pathFileUpload, "kartu_keluarga", no_rekening);
  let nasbah_npwp = innerListData(data['nasabah_npwp'], jenis_data, pathFileUpload, "inp_npwp", no_rekening);
  let nasabah_surat_nikah = innerListData(data['nasabah_surat_nikah'], jenis_data, pathFileUpload, "surat_nikah", no_rekening);
  let nasabah_surat_cerai = innerListData(data['nasabah_surat_cerai'], jenis_data, pathFileUpload, "surat_cerai", no_rekening);
  let nasabah_surat_lahir = innerListData(data['nasabah_surat_lahir'], jenis_data, pathFileUpload, "surat_lahir", no_rekening);
  let nasabah_surat_kematian = innerListData(data['nasabah_surat_kematian'], jenis_data, pathFileUpload, "surat_kematian", no_rekening);
  let nasabah_skd = innerListData(data['nasabah_skd'], jenis_data, pathFileUpload, "surat_keterangan_desa", no_rekening);
  let nasabah_slip_gaji = innerListData(data['nasabah_slip_gaji'], jenis_data, pathFileUpload, "slip_gaji", no_rekening);
  let nasabah_take_over = innerListData(data['nasabah_take_over'], jenis_data, pathFileUpload, "take_over", no_rekening);
  let nasabah_sk_kerja = innerListData(data['nasabah_sk_kerja'], jenis_data, pathFileUpload, "surat_keterangan_kerja", no_rekening);
  let nasabah_sk_usaha = innerListData(data['nasabah_sk_usaha'], jenis_data, pathFileUpload, "surat_keterangan_usaha", no_rekening);
  let nasabah_rek_koran = innerListData(data['nasabah_rek_koran'], jenis_data, pathFileUpload, "rekening_koran", no_rekening);
  let nasabah_tdp = innerListData(data['nasabah_tdp'], jenis_data, pathFileUpload, "tdp_siup", no_rekening);
  let nasabah_bon_usaha = innerListData(data['nasabah_bon_usaha'], jenis_data, pathFileUpload, "bon_usaha", no_rekening);
  // Data permohonan kredit
  let permohonan_kredit_aplikasi = innerListData(data['permohonan_kredit_aplikasi'], jenis_data, pathFileUpload, "aplikasi_permohonan_kredit", no_rekening);
  let permohonan_kredit_denah_lokasi = innerListData(data['permohonan_kredit_denah_lokasi'], jenis_data, pathFileUpload, "denah_lokasi", no_rekening);
  let permohonan_kredit_checklist_kelengkapan = innerListData(data['permohonan_kredit_checklist_kelengkapan'], jenis_data, pathFileUpload, "kelengkapan_dokumen_kredit", no_rekening);
  // Data jaminan
  let jaminan_adendum = innerListData(data['jaminan_adendum'], jenis_data, pathFileUpload, "jaminan_addendum", no_rekening);
  let jaminan_ahli_waris = innerListData(data['jaminan_ahli_waris'], jenis_data, pathFileUpload, "jaminan_ahli_waris", no_rekening);
  let jaminan_ajb = innerListData(data['jaminan_ajb'], jenis_data, pathFileUpload, "jaminan_ajb", no_rekening);
  let jaminan_akta_pengakuan_hak_bersama = innerListData(data['jaminan_akta_pengakuan_hak_bersama'], jenis_data, pathFileUpload, "jaminan_pengakuan_hak", no_rekening);
  let jaminan_apht = innerListData(data['jaminan_apht'], jenis_data, pathFileUpload, "jaminan_apht", no_rekening);
  let jaminan_bpkb = innerListData(data['jaminan_bpkb'], jenis_data, pathFileUpload, "jaminan_bpkb", no_rekening);
  let jaminan_cabut_roya = innerListData(data['jaminan_cabut_roya'], jenis_data, pathFileUpload, "jaminan_roya", no_rekening);
  let jaminan_fidusia = innerListData(data['jaminan_fidusia'], jenis_data, pathFileUpload, "jaminan_fidusia", no_rekening);
  let jaminan_imb = innerListData(data['jaminan_imb'], jenis_data, pathFileUpload, "jaminan_imb", no_rekening);
  let jaminan_pbb = innerListData(data['jaminan_pbb'], jenis_data, pathFileUpload, "jaminan_pbb", no_rekening);
  let jaminan_pengakuan_hutang = innerListData(data['jaminan_pengakuan_hutang'], jenis_data, pathFileUpload, "jaminan_pengakuan_hutang", no_rekening);
  let jaminan_sertifikat = innerListData(data['jaminan_sertifikat'], jenis_data, pathFileUpload, "jaminan_sertifikat", no_rekening);
  let jaminan_sht = innerListData(data['jaminan_sht'], jenis_data, pathFileUpload, "jaminan_sht", no_rekening);
  let jaminan_skmht = innerListData(data['jaminan_skmht'], jenis_data, pathFileUpload, "jaminan_skmht", no_rekening);
  // Data bi checking
  // let bi_checking_hasil = innerListData(data['bi_checking_hasil'], jenis_data, pathFileUpload, "view_form_hasil_bi_checking");
  let bi_checking_persetujuan = innerListData(data['bi_checking_persetujuan'], jenis_data, pathFileUpload, "persetujuan_bi_checking", no_rekening);
  let bi_checking_pengajuan_bi = innerListData(data['bi_checking_pengajuan_bi'], jenis_data, pathFileUpload, "pengajuan_bi_checking", no_rekening);
  // Data credit analist
  let credit_analist_cheklist_survey = innerListData(data['credit_analist_cheklist_survey'], jenis_data, pathFileUpload, "checklist_survey", no_rekening);
  let credit_analist_memo_ao = innerListData(data['credit_analist_memo_ao'], jenis_data, pathFileUpload, "credit_analist_memo_ao", no_rekening);
  let credit_analist_memo_ca = innerListData(data['credit_analist_memo_ca'], jenis_data, pathFileUpload, "credit_analist_memo_ca", no_rekening);
  let credit_analist_offering_letter = innerListData(data['credit_analist_offering_letter'], jenis_data, pathFileUpload, "offering_letter", no_rekening);
  let credit_analist_penilaian_jaminan = innerListData(data['credit_analist_penilaian_jaminan'], jenis_data, pathFileUpload, "verifikasi_penilaian", no_rekening);
  let credit_analist_persetujuan_kredit = innerListData(data['credit_analist_persetujuan_kredit'], jenis_data, pathFileUpload, "persetujuan_kredit", no_rekening);
  // Data legal
  let legal_cheklist_pengikatan = innerListData(data['legal_cheklist_pengikatan'], jenis_data, pathFileUpload, "check_pengikatan", no_rekening);
  let legal_lpdk = innerListData(data['legal_lpdk'], jenis_data, pathFileUpload, "lpdk", no_rekening);
  let legal_order_pengikatan = innerListData(data['legal_order_pengikatan'], jenis_data, pathFileUpload, "oder_pengikatan", no_rekening);
  let legal_pengajuan_lpdk = innerListData(data['legal_pengajuan_lpdk'], jenis_data, pathFileUpload, "pengajuan", no_rekening);
  // Data spk & ndk
  let spk_ndk_asuransi = innerListData(data['spk_ndk_asuransi'], jenis_data, pathFileUpload, "asuransi", no_rekening);
  let spk_ndk_hal_penting = innerListData(data['spk_ndk_hal_penting'], jenis_data, pathFileUpload, "hal_penting", no_rekening);
  let spk_ndk_hold_dana = innerListData(data['spk_ndk_hold_dana'], jenis_data, pathFileUpload, "hold_dana", no_rekening);
  let spk_ndk_jadwal_angsuran = innerListData(data['spk_ndk_jadwal_angsuran'], jenis_data, pathFileUpload, "jadwal_angsuran", no_rekening);
  let spk_ndk_keabsahan_data = innerListData(data['spk_ndk_keabsahan_data'], jenis_data, pathFileUpload, "srt_keabsahan", no_rekening);
  let spk_ndk_personal_guarantee = innerListData(data['spk_ndk_personal_guarantee'], jenis_data, pathFileUpload, "personal_guarantee", no_rekening);
  let spk_ndk_restruktur_bunga_denda = innerListData(data['spk_ndk_restruktur_bunga_denda'], jenis_data, pathFileUpload, "denda", no_rekening);
  let spk_ndk_sp_authentic = innerListData(data['spk_ndk_sp_authentic'], jenis_data, pathFileUpload, "srt_auth", no_rekening);
  let spk_ndk_sp_beda_jt_tempo = innerListData(data['spk_ndk_sp_beda_jt_tempo'], jenis_data, pathFileUpload, "srt_jth_tempo", no_rekening);
  let spk_ndk_sp_no_imb = innerListData(data['spk_ndk_sp_no_imb'], jenis_data, pathFileUpload, "sp_no_imb", no_rekening);
  let spk_ndk_sp_pendebetan_rekening = innerListData(data['spk_ndk_sp_pendebetan_rekening'], jenis_data, pathFileUpload, "pendebetan_rekening", no_rekening);
  let spk_ndk_sp_penyerahan_jaminan = innerListData(data['spk_ndk_sp_penyerahan_jaminan'], jenis_data, pathFileUpload, "srt_penyerahan_jaminan", no_rekening);
  let spk_ndk_sp_plang = innerListData(data['spk_ndk_sp_plang'], jenis_data, pathFileUpload, "sp_plang", no_rekening);
  let spk_ndk_spk_ndk = innerListData(data['spk_ndk_spk_ndk'], jenis_data, pathFileUpload, "spk", no_rekening);
  let spk_ndk_surat_aksep = innerListData(data['spk_ndk_surat_aksep'], jenis_data, pathFileUpload, "srt_aksep", no_rekening);
  let spk_ndk_surat_transfer = innerListData(data['spk_ndk_surat_transfer'], jenis_data, pathFileUpload, "srt_transfer", no_rekening);
  let spk_ndk_tt_uang = innerListData(data['spk_ndk_tt_uang'], jenis_data, pathFileUpload, "tt_uang", no_rekening);
  // Data foto
  let foto_ft_domisili = innerListData(data['foto_ft_domisili'], jenis_data, pathFileUpload, "foto_domisili", no_rekening);
  let foto_ft_jaminan = innerListData(data['foto_ft_jaminan'], jenis_data, pathFileUpload, "foto_jaminan", no_rekening);
  let foto_ft_pengikatan = innerListData(data['foto_ft_pengikatan'], jenis_data, pathFileUpload, "foto_pengikatan", no_rekening);
  let foto_ft_usaha = innerListData(data['foto_ft_usaha'], jenis_data, pathFileUpload, "foto_usaha", no_rekening);
}

function innerListData(data, jenis_data, pathFileUpload, id, no_rekening) {
  if (data !== null) {
    // console.log(JSON.parse(data))
    let list_data = "";
    $.each(JSON.parse(data), function (index, itemData) {
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
    });
    return list_data;
  }
}

function getOptionEditStatus(statusVal, id){
  let op = statusVal;
  $.each(op.split(","), function(i,e){
    return  $("#"+id+" option[value='" + e + "']").prop("selected", true);
  })
} 

function innertNotes(data, id, status){
  let text_notes = ''
  if (data !== null) {
    text_notes = $("#note_"+id).val(data)
  }
  if(status == 2){
    text_notes=  $("#ket-"+id).css("display", "block");
  }
  return text_notes
  
}