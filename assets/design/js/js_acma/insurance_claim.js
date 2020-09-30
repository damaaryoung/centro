getRoleAdh();
no_special_char_insr();
var tbl_dokumen_update = $('#tbl-dokumen-update').DataTable({
    responsive: true,
    paging: false
});

var tbl_banding_dokumen = $('#tbl-dokumen-update-bd').DataTable({
    responsive: true,
    paging: false
});

var id_claim;
var branch;
var slc_tanggung = $('#slc-tanggung :selected').val().trim();
var data_claim = [];
var claim_no = $('#inp-no-claim').val().trim();
var cont_no = $('#inp-no-cont').val().trim();
var insr_type = $('#insr_type').val();
var incd_date = $('#inp-tgl-kejadian').val().trim();
var claim_date = $('#inp-tgl-pengajuan').val();
var ext_war = $('#inp-perluasan-jaminan').val();
var polis_no = $('#inp-polis-induk').val();
var claim_report_type = $('#slc-jenis-pelaporan :selected').val().trim();
var claim_type = $('#slc-jenis-klaim :selected').val().trim();
var place_accd = $('#inp-tempat-kejadian').val().trim();
var cron_accd = $('#inp-kronologi').val().trim();
var liability = $('#slc-tanggung :selected').val().trim();
var heirs1 = $('#inp-ahli-waris1').val().trim();
var heirs1_real = $('#inp-hubungan-waris1').val().trim();
var heirs2 = $('#inp-ahli-waris2').val().trim();
var heirs2_real = $('#inp-hubungan-waris2').val().trim();
var heirs3 = $('#inp-ahli-waris3').val().trim();
var heirs3_real = $('#inp-hubungan-waris3').val().trim();
var report_pol = $('#slc-polisi :selected').val().trim();
var witn = $('#inp-nama-saksi').val().trim();
var witn_addr = $('#inp-alamat-saksi').val().trim().trim()
var claim_report = $('#inp-pelapor-klaim').val().trim();
var phone_report = $('#inp-no-telp').val().trim();
var key_cont = $('#slc-kontak :selected').val().trim();
var stnk_status = $('#slc-stnk :selected').val().trim();
var obj_loc = $('#inp-lokasi-kendaraan').val().trim();
var date_death = $('#inp-tgl-meninggal').val().trim();
var claim_status = $('#inp-claim-status').val().trim();
var branch_code_claim = $('#inp-branch-id').val().trim();
var branch_name_claim = $('#inp-branch-name').val().trim();
var arrayDataTerm = [];
var cabang_user;
var cabang_peng;
var cabang_text;
var ket_banding;
var t_wajib;
// $('#btn-send-to-insurance').prop('disabled',true);
$('#slc-br-claim').val(branch_code_claim);
$('#slc-br-claim').prop('disabled',true);
// $('#slc-br-claim').prop('hidden',true);
// $('.inp-claim').prop('disabled',false);

if (branch_code_claim ) {
    localStorage.setItem("branch_id", branch_code_claim);
    getBranch('#slc-br-claim-2');
    cabang_text = $("#slc-br-claim-2 option[value='"+branch_code_claim+"']").text()
    // getBranch('#slc-br-claim');
    $('#slc-br-claim').val(cabang_text);
} 

if (branch_code_claim == '0000') {
    $('.inp-claim').prop('disabled',true);
    $('#inp-no-claim').prop('disabled',false);
    $('#inp-no-cont').prop('disabled',false);
}

function no_special_char_insr(){
    $('.no-special-char-insr').on('keydown', function(e) {
        -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode)
        && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode
        && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 90 < e.keyCode)
        && (96 > e.keyCode || 105 < e.keyCode)&& (e.keyCode != 32)
        && (e.keyCode != 188) && (e.keyCode != 190) && (e.keyCode != 191) 
        && e.preventDefault()
    });
}

$(document).ready(function() {

    $('textarea').keypress(function(event) {

        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });
});

// tanggal
//tgl claim result
$('#inp-tgl-hasil-klaim').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
});

$('#inp-tgl-pembayaran').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
});

//tglinp claim
$('#inp-tgl-pengajuan').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
});

$('#inp-tgl-kejadian').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
});

$('#inp-tgl-meninggal').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
});


$('#inp-tgl-hasil-banding-bd').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
});

///tgl banding dok
$('#inp-tgl-hasil-klaim-bd').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
});

$('#inp-tgl-pembayaran-bd').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
});


$('#slc-jenis-pelaporan').change(function() {
    if (check_session() === 'true') {
        if ($('#slc-jenis-pelaporan :selected').val() != 4) {
            $('#slc-jenis-klaim').prop('disabled', false);
            validasi_jenis_claim();
            get_jenis_claim();
        } else {
            // $('#slc-jenis-klaim').val(4);
            $('#slc-tanggung').val(4).prop('disabled', true);
            $('#slc-jenis-klaim option').remove();
            $('<option/>').val(4).html('--PILIH--').appendTo('#slc-jenis-klaim').addClass('form-control');
        }
    
        $('#inp-lokasi-kendaraan').val('');
        $('#slc-tanggung :selected').val('4');
        $('#inp-tgl-meninggal').val('');
        $('#inp-ahli-waris1').val('');
        $('#inp-ahli-waris2').val('');
        $('#inp-ahli-waris3').val('');
        $('#inp-hubungan-waris1').val('');
        $('#inp-hubungan-waris2').val('');
        $('#inp-hubungan-waris3').val('');
        $('#slc-tanggung').trigger('change');

    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }

})


function validasi_jenis_claim() {
    if ($('#slc-jenis-pelaporan :selected').val() == "1") {
        id_claim = "S";
        $('#slc-tanggung').prop('disabled', true).val(4).trigger('change');
        $('#inp-lokasi-kendaraan').prop('disabled', true);
    } else if ($('#slc-jenis-pelaporan :selected').val() == "2") {
        id_claim = "A";
        $('#slc-tanggung').prop('disabled', false).val(4).trigger('change');
        $('#inp-lokasi-kendaraan').prop('disabled', false);
    } else if ($('#slc-jenis-pelaporan :selected').val() == "3") {
        id_claim = "C";
        $('#slc-tanggung').prop('disabled', false).val(4).trigger('change');
        $('#inp-lokasi-kendaraan').prop('disabled', false);
    } else {
        $('#slc-tanggung').prop('disabled', true).val(4).trigger('change');
        $('#inp-lokasi-kendaraan').prop('disabled', true);
    }
}

$('#slc-tanggung').change(function() {
    if ($('#slc-tanggung :selected').val() !== "1") {
        $('#inp-tgl-meninggal').val('').prop('disabled', true);
        $('#inp-ahli-waris1').val('').prop('disabled', true);
        $('#inp-ahli-waris2').val('').prop('disabled', true);
        $('#inp-ahli-waris3').val('').prop('disabled', true);
        $('#inp-hubungan-waris1').val('').prop('disabled', true);
        $('#inp-hubungan-waris2').val('').prop('disabled', true);
        $('#inp-hubungan-waris3').val('').prop('disabled', true);
    } else {
        $('#inp-tgl-meninggal').val('').prop('disabled', false);
        $('#inp-ahli-waris1').val('').prop('disabled', false);
        $('#inp-ahli-waris2').val('').prop('disabled', false);
        $('#inp-ahli-waris3').val('').prop('disabled', false);
        $('#inp-hubungan-waris1').val('').prop('disabled', false);
        $('#inp-hubungan-waris2').val('').prop('disabled', false);
        $('#inp-hubungan-waris3').val('').prop('disabled', false);
    }
})


$('#btn-new-claim').on("click", function() {
    $('#inp-no-claim').val('XXXXXXXXXXXXX');
    $('#inp-no-claim').prop('disabled', true);
    $('#btn-search-claim').prop('disabled', true);
    $('#btn-new-claim').prop('disabled', true);
});

// GET JENIS CLAIM ==============================================================================================
function get_jenis_claim(id_claim2) {
    data_claim = [];
    var flag = true;
    if (id_claim2 == null) {
        flag = false;
        id_claim2 = id_claim;
    }
    $('#slc-jenis-klaim').empty();
    data_claim.push(['0', '--PILIH--']);

    $.ajax({
        url: "Controller_insurance_claim/getJenisClaim",
        type: 'POST',
        dataType: 'json',
        data: {
            "id_claim": id_claim2
        },
        success: function(response) {
            if (response) {
                try {
                    var list_param_pending_vc = response['Data'];

                    $.each(list_param_pending_vc, function() {
                        data_claim.push([this['jenis_claim'], this['jenis_claim_desc']]);
                    });

                    for (var j = 0; j < data_claim.length; ++j) {
                        var item = data_claim[j];
                        $('#slc-jenis-klaim').append($('<option/>', {
                            value: item[0],
                            text: item[1]
                        }));
                    }

                    if (flag) {
                        $('#slc-jenis-klaim').val(claim_type);
                        if ($('#slc-jenis-klaim :selected').val() != claim_type) {
                            $('#slc-jenis-klaim').val('0');
                        }
                    } else {
                        $('#slc-jenis-klaim').val('0');
                    }

                    console.log(data_claim);
                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(response);
                    console.log(e);
                    alert(e);
                }
            } else {
                console.log(response)
                alert(response.responseText);
            }
        },

        error: function(response) {
            alert_info('Jaringan Terputus, Silahkan Refresh Halaman');
            console.log(response);
        }
    });
};

$('#slc-polisi').change(function() {
    if ($('#slc-polisi :selected').val() !== '1') {
        $('#inp-nama-saksi').prop('disabled', true);
        $('#inp-alamat-saksi').prop('disabled', true);
    } else {
        $('#inp-nama-saksi').prop('disabled', false);
        $('#inp-alamat-saksi').prop('disabled', false);
    }
    $('#inp-nama-saksi').val('');
    $('#inp-alamat-saksi').val('');
})

$('#btn-clear-claim').on("click", function() {
    location.reload();
});

// BTN CARI ==============================================================================================
var doc_status = 0;

$('#inp-no-cont').keyup(function(e) {
    if (check_session() === 'true') {
        e.preventDefault();
        if (e.keyCode == 13) {
            cari_claim();
        }
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }
});

$('#inp-no-claim').keyup(function(e) {
    if (check_session() === 'true') {
        e.preventDefault();
        if (e.keyCode == 13) {
            cari_claim();
        }
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }
});

$('#btn-cari-claim').click(function() {
    if (check_session() === 'true') {
        debugger;
        cari_claim();
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }
});

function cari_claim() {
     debugger;
    var cont_no = $('#inp-no-cont').val();
    var claim_no = $('#inp-no-claim').val().toUpperCase();
    var br_id_claim = $('#slc-br-claim :selected').val();
    var br_code = $('#inp-branch-id').val();
    // if (br_id_claim !== '') {

        if (claim_no !== '' || cont_no !== '') {
            $('#slc-bank-insclaim option').remove();
            if (claim_no !== '') {
                if (claim_no === 'XXXXXXXXXXXXX') {
                    hapuserror()
                    $('#inp-no-claim').prop('disabled', true);
                    $('#inp-no-cont').prop('disabled', true);
                    get_bycont(0);
                    // $('#btn-save-insurance').prop('disabled',false);

                } else if (claim_no.length < 13) {
                    alert_info("INPUT NO KLAIM DENGAN LENGKAP");
                    $('#div-inp-no-claim').addClass('has-error');

                } else {
                    hapuserror()
                    $('#inp-no-claim').prop('disabled', true);
                    $('#inp-no-cont').prop('disabled', true);
                    get_byno();
                }

            } else if (cont_no !== '') {
                if (cont_no.length < 12) {
                    alert_info("INPUT NO KONTRAK DENGAN LENGKAP");
                    $('#div-inp-no-cont').addClass('has-error');
                } else {
                    hapuserror();
                    // $('#btn-save-insurance').prop('disabled',false);
                    $('#inp-no-claim').prop('disabled', true);
                    $('#inp-no-cont').prop('disabled', true);
                    get_bycont(0);                  
                }
            }

        } else {
            alert_info("SILAHKAN ISI NO KLAIM ATAU NO KONTRAK TERLEBIH DAHULU!");
            $('#div-inp-no-claim').addClass('has-error');
            $('#div-inp-no-cont').addClass('has-error');

        }

    // } else {
    //     alert_info("Silahkan Pilih Cabang Terlebih Dahulu.");
    //     $('#div-slc-br-claim').addClass('has-error');
    // }
};

// GET PERLUASAN ==============================================================================================


function get_perluasan() {
    cont_no = $('#inp-no-cont').val();
    claim_no = $('#inp-no-claim').val().toUpperCase();

    $.ajax({
        url: "Controller_insurance_claim/getPerluasan",
        type: 'POST',
        dataType: 'json',
        data: {
            "cont_no": cont_no,
            "claim_no": claim_no
        },

        success: function(response) {
            var res = response;
            console.log(res);
            if (response){
                fee_code = res['Data']['fee_code'];
                insr_name = res['Data']['insr_name'];
                try {
                    if (fee_code == null) {
                        $('#inp-ins-code').val('-');
                        $('#inp-ins-comm').val('-');

                    } else {
                        $('#inp-ins-code').val(fee_code);
                        $('#inp-ins-comm').val(insr_name);
                    }

                    if ($('#inp-ins-code').val() == 'PA' || $('#inp-ins-code').val() == 'CP') {
                        $('#inp-perluasan-jaminan').val('1');
                    }else{
                        $('#inp-perluasan-jaminan').val('0');
                    }
                } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }
        },

        error: function(response) {
            alert_error(response);
        }
    });
};


// GET BY NO ==============================================================================================

function get_byno() {
    claim_no = $('#inp-no-claim').val().toUpperCase();
    $.ajax({
        url: "Controller_insurance_claim/getClaimByNo",
        type: 'POST',
        dataType: 'json',
        data: {
            "claim_no": claim_no,
        },

        success: function(response) {
            console.log(response);
            var res = response;
            if (response){
                try {
                    if (res['Status'] == 500) {
                        alert_info(res['Error']);
                        $('#inp-no-claim').prop('disabled', false);
                        $('#inp-no-cont').prop('disabled', false);

                    } else {
                        claim_no = res['Data']['claim_no'];
                        claim_date = res['Data']['claim_date'];
                        cust_name = res['Data']['cust_name'];
                        fin_type = res['Data']['fin_type'];
                        police_no = res['Data']['police_no'];
                        engine_no = res['Data']['engine_no'];
                        chassis_no = res['Data']['chassis_no'];
                        obj_type = res['Data']['obj_type'];
                        obty_desc = res['Data']['obty_desc'];
                        prod_year = res['Data']['prod_year'];
                        insr_type = res['Data']['insr_type'];
                        insr_type_desc = res['Data']['insr_type_desc'];
                        //dom_desc  = res['Data']['dom_desc'];
                        polis_no = res['Data']['polis_no'];
                        addr_name = res['Data']['addr_name'];
                        claim_report_type = res['Data']['claim_report_type'];
                        claim_type = res['Data']['claim_type'];
                        claim_type_desc = res['Data']['claim_type_desc'];
                        place_accd = res['Data']['place_accd'];
                        cron_accd = res['Data']['cron_accd'];
                        liability = res['Data']['liability'];
                        heirs1 = res['Data']['heirs1'];
                        heirs1_real = res['Data']['heirs1_real'];
                        heirs2 = res['Data']['heirs2'];
                        heirs2_real = res['Data']['heirs2_real'];
                        heirs3 = res['Data']['heirs3'];
                        heirs3_real = res['Data']['heirs3_real'];
                        report_pol = res['Data']['report_pol'];
                        witn = res['Data']['witn'];
                        witn_addr = res['Data']['witn_addr'];
                        claim_report = res['Data']['claim_report'];
                        phone_report = res['Data']['phone_report'];
                        incd_date = res['Data']['incd_date'];
                        claim_status = res['Data']['claim_status'];
                        key_cont = res['Data']['key_cont'];
                        stnk_status = res['Data']['stnk_status'];
                        date_death = res['Data']['date_death'];
                        tenor = res['Data']['tenor'];
                        obj_loc = res['Data']['obj_loc'];
                        cont_no = res['Data']['cont_no'];
                        total = res['Data']['total'];
                        result_st = res['Data']['result_stats'];
                        appeal_st = res['Data']['appeal_stats'];
                        doc_status = res['Data']['doc_status'];
                        branch = res['Data']['branch'];
                        var recipient = res['Data']['recipe_report'];
                        // insr_name = res['Data']['insr_name'];
                        // fee_code = res['Data']['fee_code']
                        $('#slc-br-claim').val(branch);   
                        $('#inp-tgl-pengajuan').val(claim_date);
                        $('#inp-periode-asuransi').val(tenor);
                        $('#inp-jenis-asuransi').val(insr_type_desc);
                   /*     $('#inp-jenis-asuransi-code').val(insr_type);*/
                        $('#inp-jenis-asuransi-code').val(fin_type);
                        $('#inp-polis-induk').val(polis_no);
                        $('#inp-alamat').val(addr_name);
                        $('#slc-jenis-pelaporan').val(claim_report_type);
                        $('#slc-kontak').val(key_cont);
                        $('#inp-no-cont').val(cont_no);
                        $('#inp-nama-nasabah').val(cust_name);
                        $('#inp-no-polisi').val(police_no);
                        $('#inp-no-mesin').val(engine_no);
                        $('#inp-no-rangka').val(chassis_no);
                        $('#inp-jenis-kendaraan').val(obty_desc);
                        $('#inp-tahun-kendaraan').val(prod_year);
                        $('#result-status-inspro').val(result_st);
                        $('#appeal-status-inspro').val(appeal_st);

                        arrayDataTerm = [];
                        arrayDataTerm.push({
                            con_no: $('#inp-no-cont').val(),
                            dtbayar: new Date().format('dd-mm-yyyy'),
                            br_id: branch
                        });
                        getDataCustTerminate(arrayDataTerm);
                        getRefundAmt(arrayDataTerm);
                        getBankRef('#slc-bank-insclaim');

                        var id_claim2;
                        switch (claim_type) {
                            case 1:
                            case 4:
                            id_claim2 = "S"
                            break;
                            case 6:
                            id_claim2 = "C"
                            break;
                            default:
                            id_claim2 = "A"
                        }
                        get_jenis_claim(id_claim2);
                        $('#slc-jenis-klaim').val(claim_type);
                        $('#slc-stnk').val(stnk_status);
                        $('#slc-tanggung').val(liability);
                        $('#inp-tgl-meninggal').val(date_death);
                        $('#inp-ahli-waris1').val(heirs1);
                        $('#inp-ahli-waris2').val(heirs2);
                        $('#inp-ahli-waris3').val(heirs3);
                        $('#inp-hubungan-waris1').val(heirs1_real);
                        $('#inp-hubungan-waris2').val(heirs2_real);
                        $('#inp-hubungan-waris3').val(heirs3_real);
                        $('#inp-tempat-kejadian').val(place_accd);
                        $('#inp-lokasi-kendaraan').val(obj_loc);
                        $('#inp-kronologi').val(cron_accd);
                        $('#slc-polisi').val(report_pol);
                        $('#inp-nama-saksi').val(witn);
                        $('#inp-alamat-saksi').val(witn_addr);
                        $('#inp-pelapor-klaim').val(claim_report);
                        $('#inp-no-telp').val(phone_report);
                        $('#inp-tgl-kejadian').val(incd_date);
                        $('#inp-claim-status').val(claim_status);


                        if (recipient != null || recipient != "null") {

                            $.ajax({
                                url: "Controller_insurance_claim/getEmployeeByNik",
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                    "nik": recipient,
                                },

                                success: function(response) {
                                    var res = response;
                                    if (res){
                                     if (res == "[]") {
                                            // alert_info("PIC AWAL TIDAK DITEMUKAN");
                                        } else {
                                            try {
                                                res = JSON.parse(res);
                                                console.log(res);
                                                status = res[0]['nama'];
                                                if (status) {
                                                    // alert_info("NAMA PIC AWAL TIDAK DITEMUKAN KARENA TIMEOUT SAAT LOAD KE SERVICE IAM");
                                                    $('#inp-penerima-klaim').val(res[0]['nama']);
                                                }else{
                                                    $('#inp-penerima-klaim').val(recipient);
                                                }                                                

                                            } catch (e) {
                                                    $('#loading-ajax').hide(); //menutup loading ajax
                                                    console.log(e);
                                                    alert_error("Galat" + e);
                                                }
                                            }
                                        }

                                    },

                                    error: function(response) {
                                        alert_error(response);
                                    }
                                });
                        }

                            // $('#slc-tanggung').trigger('change');
                            if (liability !== 1) {
                                validasi_jenis_claim();
                            }
                            if (report_pol !== 1) {
                                $('#slc-polisi').trigger('change');
                            }
                            if ($('#inp-lokasi-kendaraan').val() == '') {
                                $('#inp-lokasi-kendaraan').prop('disabled', true);
                            }
                            get_perluasan();
                            if (result_st == 'A') {
                                alert_info('HASIL RESULT TELAH DISETUJUI!');
                            } else if (result_st == 'R') {
                                if (appeal_st == 'A') {  
                                    alert_info('HASIL BANDING TELAH DISETUJUI!');
                                }else if
                                (appeal_st == 'R') {
                                    alert_info('HASIL BANDING TELAH DITOLAK!');
                                } else if
                                (appeal_st == 'C') {
                                    alert_info('HASIL BANDING TELAH DIBATALKAN!');
                                } else if
                                (appeal_st == '0'){
                                    alert_info('HASIL BANDING BELUM DIPUTUSKAN!');    
                                }
                            } else if (claim_status == '2') {
                                alert_info('PENGAJUAN KLAIM TELAH DIBATALKAN');
                            } else if (result_st == "C") {
                                alert_info('KLAIM TELAH DIBATALKAN');
                            } else {
                                alert_info('HASIL RESULT BELUM DIPUTUSKAN');
                            }

                            cabang_user = $('#inp-branch-id').val();
                            cabang_peng = claim_no.substring(0,4);    
                            if (claim_status != "0" && cabang_user != '0000') {
                                if (result_st == "C" || appeal_st == "C") {
                                    $('#btn-save-insurance').prop('disabled', false);
                                }
                                if (claim_status == "1") {
                                    $('#btn-save-insurance').prop('disabled', true);
                                    $('#btn-send-to-insurance').prop('disabled', true);
                                    $('#btn-cancel-insurance').prop('disabled', true);
                                    $('#slc-jenis-pelaporan').prop('disabled', true);
                                    $('#slc-kontak').prop('disabled', true);
                                    $('#inp-tempat-kejadian').prop('disabled', true);
                                    $('#inp-kronologi').prop('disabled', true);
                                    $('#slc-tanggung').prop('disabled', true);
                                    $('#slc-jenis-klaim').prop('disabled', true);
                                    $('#slc-stnk').prop('disabled', true);
                                    $('#inp-lokasi-kendaraan').prop('disabled', true);
                                    $('#slc-polisi').prop('disabled', true);
                                    $('#inp-nama-saksi').prop('disabled', true);
                                    $('#inp-alamat-saksi').prop('disabled', true);
                                    $('#inp-pelapor-klaim').prop('disabled', true);
                                    $('#inp-no-telp').prop('disabled', true);
                                    $('#inp-tgl-kejadian').prop('disabled', true);
                                    $('#btn-print-insurance').prop('disabled', false);
                                }

                                if($('#inp-no-claim').val() == ''){
                                    $('#btn-save-insurance').prop('disabled', false);
                                    $('#btn-cancel-insurance').prop('disabled', true);
                                }
                            }else{
                                $('#btn-save-insurance').prop('disabled', false);
                                $('#btn-cancel-insurance').prop('disabled', false);
                                $('#btn-send-to-insurance').prop('disabled', false);
                            }

                        //validasi user
                        
                        if (cabang_user != cabang_peng && claim_no != 'null' && claim_no != 'null' ) {
                            $('.inp-claim').prop('disabled',true);
                            if(cabang_user == '0000'){
                                $('#btn-terminate-result').prop('disabled' , false);
                                $('#btn-terminate-result-bd').prop('disabled' , false);
                            }
                        }
                        
                        /* jika login HO maka validasi cabang di hilangkan */
                        var cabang_text = $("#slc-br-claim-2 option[value='"+cabang_peng+"']").text()
                        var cabang_val = $("#slc-br-claim-2 option[value='"+cabang_peng+"']").val();
                        $('#slc-br-claim').val(cabang_text);
             
                    }


                } //tutup try
                catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }
            //tutup if
        }, //tutup success
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
    }); //tutup ajax
}; //tutup function

// GET BY CONT ==============================================================================================

function get_bycont(parameter) {
    cont_no = $('#inp-no-cont').val();

    $.ajax({
        url: "Controller_insurance_claim/getClaimByCont",
        type: 'POST',
        dataType: 'json',
        data: {
            "cont_no": cont_no,
        },

        success: function(response) {
            var res = response;
            console.log(res);
            if (response){
                try {

                    if (res['Status'] == 500) {
                        alert_info(res['Error']);
                        $('#inp-no-claim').prop('disabled', false);
                        $('#inp-no-cont').prop('disabled', false);
                        CLEAR();
                    } else if (res['Status'] == 200) {
                        claim_no = res['Data']['claim_no'];
                        claim_date = res['Data']['claim_date'];
                        cust_name = res['Data']['cust_name'];
                        police_no = res['Data']['police_no'];
                        engine_no = res['Data']['engine_no'];
                        chassis_no = res['Data']['chassis_no'];
                        obj_type = res['Data']['obj_type'];
                        obty_desc = res['Data']['obty_desc'];
                        prod_year = res['Data']['prod_year'];
                        insr_type = res['Data']['insr_type'];
                        insr_type_desc = res['Data']['insr_type_desc'];
                        polis_no = res['Data']['polis_no'];
                        addr_name = res['Data']['addr_name'];
                        claim_report_type = res['Data']['claim_report_type'];
                        claim_type = res['Data']['claim_type'];
                        claim_type_desc = res['Data']['claim_type_desc'];
                        place_accd = res['Data']['place_accd'];
                        cron_accd = res['Data']['cron_accd'];
                        liability = res['Data']['liability'];
                        heirs1 = res['Data']['heirs1'];
                        heirs1_real = res['Data']['heirs1_real'];
                        heirs2 = res['Data']['heirs2'];
                        heirs2_real = res['Data']['heirs2_real'];
                        heirs3 = res['Data']['heirs3'];
                        heirs3_real = res['Data']['heirs3_real'];
                        report_pol = res['Data']['report_pol'];
                        witn = res['Data']['witn'];
                        witn_addr = res['Data']['witn_addr'];
                        claim_report = res['Data']['claim_report'];
                        phone_report = res['Data']['phone_report'];
                        incd_date = res['Data']['incd_date'];
                        claim_status = res['Data']['claim_status'];
                        key_cont = res['Data']['key_cont'];
                        stnk_status = res['Data']['stnk_status'];
                        date_death = res['Data']['date_death'];
                        tenor = res['Data']['tenor'];
                        obj_loc = res['Data']['obj_loc'];
                        result_st = res['Data']['result_stats'];
                        appeal_st = res['Data']['appeal_stats'];
                        doc_status = res['Data']['doc_status'];
                        branch = res['Data']['branch'];
                        var recipient = res['Data']['recipe_report'];

                        $('#slc-br-claim').val(branch);
                        $('#inp-tgl-pengajuan').val(claim_date);
                        $('#inp-periode-asuransi').val(tenor);
                        $('#inp-jenis-asuransi').val(insr_type_desc);
                        $('#inp-jenis-asuransi-code').val(insr_type);

                        $('#inp-polis-induk').val(polis_no);
                        $('#inp-alamat').val(addr_name);
                        $('#slc-jenis-pelaporan').val(claim_report_type);
                        $('#slc-kontak').val(key_cont);
                        $('#inp-no-claim').val(claim_no);
                        $('#inp-nama-nasabah').val(cust_name);
                        $('#inp-no-polisi').val(police_no);
                        $('#inp-no-mesin').val(engine_no);
                        $('#inp-no-rangka').val(chassis_no);
                        $('#inp-jenis-kendaraan').val(obty_desc);
                        $('#inp-tahun-kendaraan').val(prod_year);
                        var id_claim2;
                        switch (claim_type) {
                            case 1:
                            case 4:
                            id_claim2 = "S"
                            break;
                            case 6:
                            id_claim2 = "C"
                            break;
                            default:
                            id_claim2 = "A"
                        }
                        
                        // //var slc_jenis_klaim = document.getElementById('slc-jenis-klaim');
                        // var opt = document.createElement('option');
                        // opt.value = claim_type;
                        // opt.innerHTML = claim_type_desc;
                        // slc_jenis_klaim.appendChild(opt); 
                        if($('#inp-no-claim').val() != ''){
                            get_jenis_claim(id_claim2);
                            $('#slc-jenis-klaim').val(claim_type);
                        } 


                        $('#slc-stnk').val(stnk_status);
                        $('#slc-tanggung').val(liability);
                        $('#inp-tgl-meninggal').val(date_death);
                        $('#inp-ahli-waris1').val(heirs1);
                        $('#inp-ahli-waris2').val(heirs2);
                        $('#inp-ahli-waris3').val(heirs3);
                        $('#inp-hubungan-waris1').val(heirs1_real);
                        $('#inp-hubungan-waris2').val(heirs2_real);
                        $('#inp-hubungan-waris3').val(heirs3_real);
                        $('#inp-tempat-kejadian').val(place_accd);
                        $('#inp-lokasi-kendaraan').val(obj_loc);
                        $('#inp-kronologi').val(cron_accd);
                        $('#slc-polisi').val(report_pol);
                        $('#inp-nama-saksi').val(witn);
                        $('#inp-alamat-saksi').val(witn_addr);
                        $('#inp-pelapor-klaim').val(claim_report);
                        $('#inp-no-telp').val(phone_report);
                        $('#inp-tgl-kejadian').val(incd_date);
                        $('#inp-claim-status').val(claim_status);
                        $('#result-status-inspro').val(result_st);
                        $('#appeal-status-inspro').val(appeal_st);

                        arrayDataTerm = [];
                        arrayDataTerm.push({
                            con_no: $('#inp-no-cont').val(),
                            dtbayar: new Date().format('dd-mm-yyyy'),
                            br_id: branch
                        });
                        getDataCustTerminate(arrayDataTerm);
                        getRefundAmt(arrayDataTerm);
                        getBankRef('#slc-bank-insclaim');

                        if (recipient != null || recipient != "null") {

                            $.ajax({
                                url: "Controller_insurance_claim/getEmployeeByNik",
                                type: 'POST',
                                dataType: 'json',
                                data: {
                                    "nik": recipient,
                                },

                                success: function(response) {
                                    var res = response;
                                    if (response){
                                        if (res == "[]") {
                                            // alert_info("PIC AWAL TIDAK DITEMUKAN");
                                        } else {
                                            try {
                                                res = JSON.parse(res);
                                                console.log(res);
                                                status = res[0]['nama'];
                                                if (status) {
                                                    // alert_info("NAMA PIC AWAL TIDAK DITEMUKAN KARENA TIMEOUT SAAT LOAD KE SERVICE IAM");
                                                    $('#inp-penerima-klaim').val(res[0]['nama']);
                                                }else{
                                                    $('#inp-penerima-klaim').val(recipient);
                                                }    

                                            } catch (e) {
                                                    $('#loading-ajax').hide(); //menutup loading ajax
                                                    console.log(e);
                                                    alert_error("Galat" + e);
                                                }
                                            }
                                        }

                                    },

                                    error: function(response) {
                                        alert_error(response);
                                    }
                                });
                        }

                        if (liability !== 1) {
                            validasi_jenis_claim();
                        }
                        if (report_pol !== 1) {
                            $('#slc-polisi').trigger('change');
                        }
                        if ($('#inp-lokasi-kendaraan').val() == '') {
                            $('#inp-lokasi-kendaraan').prop('disabled', true);
                        }

                        if(claim_no != null){
                            $('#btn-send-to-insurance').prop('disabled',false);
                        }

                        get_perluasan();
                        if (parameter == 0) {
                            if (result_st == 'A') {
                                alert_info('HASIL RESULT TELAH DISETUJUI!');
                            } else if (result_st == 'R') {
                                if (appeal_st == 'A') {
                                    alert_info('HASIL BANDING TELAH DISETUJUI!');
                                }else if
                                (appeal_st == 'R') {
                                    alert_info('HASIL BANDING TELAH DITOLAK!');
                                } else{
                                    alert_info('HASIL RESULT TELAH DITOLAK!');    
                                }
                            } else if (result_st == '0') {
                                alert_info('HASIL RESULT BELUM DIPUTUSKAN');

                            }
                        } else if (parameter == 1) {
                            alert_info("DATA DENGAN NOMOR KLAIM "+ claim_no + " BERHASIL DISIMPAN")
                        } if (parameter == 2) {
                        }

                        cabang_user = $('#inp-branch-id').val();
                        cabang_peng = claim_no.substring(0,4);
                        
                        if (cabang_user != '0000') {
                            if (claim_status == "1") {

                                if (result_st == "C" || appeal_st == "C") {
                                    $('#btn-save-insurance').prop('disabled', false);
                                }

                                $('#btn-save-insurance').prop('disabled', true);
                                $('#btn-send-to-insurance').prop('disabled', true);
                                $('#btn-cancel-insurance').prop('disabled', true);
                                $('#slc-jenis-pelaporan').prop('disabled', true);
                                $('#slc-kontak').prop('disabled', true);
                                $('#inp-tempat-kejadian').prop('disabled', true);
                                $('#inp-kronologi').prop('disabled', true);
                                $('#slc-tanggung').prop('disabled', true);
                                $('#slc-jenis-klaim').prop('disabled', true);
                                $('#slc-stnk').prop('disabled', true);
                                $('#inp-lokasi-kendaraan').prop('disabled', true);
                                $('#slc-polisi').prop('disabled', true);
                                $('#inp-nama-saksi').prop('disabled', true);
                                $('#inp-alamat-saksi').prop('disabled', true);
                                $('#inp-pelapor-klaim').prop('disabled', true);
                                $('#inp-no-telp').prop('disabled', true);
                                $('#inp-tgl-kejadian').prop('disabled', true);
                                $('#btn-print-insurance').prop('disabled', false);

                            }else if (claim_status == "0"){
                                $('#btn-save-insurance').prop('disabled', false);
                                $('#btn-cancel-insurance').prop('disabled', false);
                            }

                            if($('#inp-no-claim').val() == '' && cabang_user != '0000'){
                                $('#btn-save-insurance').prop('disabled', false);
                                $('#btn-cancel-insurance').prop('disabled', true);
                            }

                        } else if (cabang_user == '0000' && claim_no == '') {
                            alert_info('KONTRAK BELUM PERNAH MENGAJUKAN KLAIM !');
                            CLEAR();
                        }
                        
                        

                        
                        //validasi user
                        
                        if (cabang_user != cabang_peng && claim_no != '') {
                            $('.inp-claim').prop('disabled',true);
                             if(cabang_user == '0000'){
                                $('#btn-terminate-result').prop('disabled' , false);
                                $('#btn-terminate-result-bd').prop('disabled' , false);
                            }
                        }

                        if (claim_no != '') {
                            /* jika login HO maka validasi cabang di hilangkan */
                            var cabang_text = $("#slc-br-claim-2 option[value='"+cabang_peng+"']").text()
                            var cabang_val = $("#slc-br-claim-2 option[value='"+cabang_peng+"']").val();
                            $('#slc-br-claim').val(cabang_text);
                        }else{
                            cabang_text = $("#slc-br-claim-2 option[value='"+branch_code_claim+"']").text()
                            $('#slc-br-claim').val(cabang_text);
                        }

                    }

                } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }

        },
        error: function(response) {
            console.log(response);
            alert_error(response);
        }

    });

};

// SAVE CLAIM INSURANCE =========================================================================================

$('#btn-save-insurance').click(function() {
    if (check_session() === 'true') {
        claim_no = $('#inp-no-claim').val().toUpperCase().trim();
        claim_report_type = $('#slc-jenis-pelaporan :selected').val().trim();
        claim_type = $('#slc-jenis-klaim :selected').val();
        key_cont = $('#slc-kontak :selected').val().trim();
        stnk_status = $('#slc-stnk').val();
        place_accd = $('#inp-tempat-kejadian').val().trim();
        place_objc = $('#inp-lokasi-kendaraan').val().trim();
        cron_accd = $('#inp-kronologi').val().trim();
        liability = $('#slc-tanggung :selected').val();
        date_death = $('#inp-tgl-meninggal').val();
        heirs1 = $('#inp-ahli-waris1').val().toUpperCase().trim();
        heirs1_real = $('#inp-hubungan-waris1').val().toUpperCase().trim();
        heirs2 = $('#inp-ahli-waris2').val().toUpperCase().trim();
        heirs2_real = $('#inp-hubungan-waris2').val().toUpperCase().trim();
        heirs3 = $('#inp-ahli-waris3').val().toUpperCase().trim();
        heirs3_real = $('#inp-hubungan-waris3').val().toUpperCase().trim();
        report_pol = $('#slc-polisi :selected').val().trim();
        witn = $('#inp-nama-saksi').val().trim();
        witn_addr = $('#inp-alamat-saksi').val().trim();
        claim_report = $('#inp-pelapor-klaim').val().trim();
        incd_date = $('#inp-tgl-kejadian').val().trim();
        hapuserror();

        if (claim_status == '') {
            alert_info('DETAIL KLAIM HARUS DI ISI !');
        } else if (claim_report_type == null || claim_report_type == '4') {
            alert_info("JENIS PELAPORAN BELUM DIPILIH !");
            $('#div-slc-jenis-pelaporan').addClass('has-error');
        } else if (claim_type == null || claim_type == 0) {
            alert_info("JENIS KLAIM BELUM DIPILIH !");
            $('#div-slc-jenis-klaim').addClass('has-error');
        } else if (key_cont == null || key_cont == '4') {
            alert_info("STATUS KUNCI BELUM DIPILIH !");
            $('#div-slc-kontak').addClass('has-error');
        } else if (stnk_status == null || stnk_status == '4') {
            alert_info("STATUS STNK BELUM DIPILIH !");
            $('#div-slc-stnk').addClass('has-error');
        } else if (place_accd == null || place_accd == '') {
            alert_info("LOKASI KEJADIAN BELUM DIISI !");
            $('#div-inp-tempat-kejadian').addClass('has-error');
        } else if (claim_report_type != 1 && (place_objc == null || place_objc == "")) {
            alert_info("LOKASI KENDARAAN BELUM DIISI !");
            $('#div-inp-lokasi-kendaraan').addClass('has-error');
        } else if (cron_accd == null || cron_accd == "") {
            alert_info("KRONOLOGI KEJADIAN BELUM DIISI !");
            $('#div-inp-kronologi').addClass('has-error');
        } else if (claim_report_type != 1 && (liability == null || liability == '4')) {
            alert_info("STATUS TERTANGGUNG BELUM DIPILIH !");
            $('#div-slc-tanggung').addClass('has-error');
        } else if (liability == 1 && (date_death == null || date_death == "")) {
            alert_info("TANGGAL MENINGGAL BELUM DIISI !");
            $('#div-tgl-meninggal').addClass('has-error');
        } else if (liability == 1 && (heirs1 == null || heirs1 == "")) {
            alert_info("NAMA AHLI WARIS BELUM DIISI !");
            $('#div-inp-ahli-waris1').addClass('has-error');
        } else if (heirs1 !== '' && (heirs1_real == '')) {
            alert_info("HUBUNGAN AHLI WARIS " + heirs1 + " BELUM DIISI !");
            $('#div-inp-hubungan-waris1').addClass('has-error');
        } else if (heirs2 !== '' && (heirs2_real == '')) {
            alert_info("HUBUNGAN AHLI WARIS " + heirs2 + " BELUM DIISI !");
            $('#div-inp-hubungan-waris1').addClass('has-error');
        } else if (heirs3 !== '' && (heirs3_real == '')) {
            alert_info("HUBUNGAN AHLI WARIS " + heirs3 + " BELUM DIISI !");
            $('#div-inp-hubungan-waris1').addClass('has-error');
        } else if (report_pol == null || report_pol == '4') {
            alert_info("STATUS LAPORAN POLISI BELUM DIPILIH !");
            $('#div-slc-polisi').addClass('has-error');
        } else if (report_pol == 1 && (witn == null || witn == "")) {
            alert_info("NAMA SAKSI BELUM DIISI !");
            $('#div-inp-nama-saksi').addClass('has-error');
        } else if (report_pol == 1 && (witn_addr == null || witn_addr == "")) {
            alert_info("ALAMAT SAKSI BELUM DIISI !");
            $('#div-inp-alamat-saksi').addClass('has-error');
        } else if (claim_report == null || claim_report == "") {
            alert_info("PELAPOR KLAIM BELUM DIISI !");
            $('#div-inp-pelapor-klaim').addClass('has-error');
        } else if (incd_date == null || incd_date == "") {
            alert_info("TANGGAL KEJADIAN BELUM DIISI !");
            $('#div-tgl-kejadian').addClass('has-error')
        } else {
            save();
        }
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }
});

function save() {
    br_id_claim = branch; 
    claim_no = $('#inp-no-claim').val().toUpperCase();
    cont_no = $('#inp-no-cont').val();
    insr_type = $('#inp-jenis-asuransi-code').val();
    incd_date = $('#inp-tgl-kejadian').val();
    claim_date = $('#inp-tgl-pengajuan').val();
    ext_war = $('#inp-perluasan-jaminan').val();
    polis_no = $('#inp-polis-induk').val().toUpperCase();
    claim_report_type = $('#slc-jenis-pelaporan :selected').val();
    claim_type = $('#slc-jenis-klaim :selected').val();
    place_accd = $('#inp-tempat-kejadian').val().toUpperCase();
    cron_accd = $('#inp-kronologi').val().toUpperCase();
    liability = $('#slc-tanggung :selected').val().toUpperCase();
    heirs1 = $('#inp-ahli-waris1').val().toUpperCase();
    heirs1_real = $('#inp-hubungan-waris1').val().toUpperCase();
    heirs2 = $('#inp-ahli-waris2').val().toUpperCase();
    heirs2_real = $('#inp-hubungan-waris2').val().toUpperCase();
    heirs3 = $('#inp-ahli-waris3').val().toUpperCase();
    heirs3_real = $('#inp-hubungan-waris3').val().toUpperCase();
    report_pol = $('#slc-polisi :selected').val();
    witn = $('#inp-nama-saksi').val().toUpperCase();
    witn_addr = $('#inp-alamat-saksi').val().toUpperCase();
    claim_report = $('#inp-pelapor-klaim').val().toUpperCase();
    phone_report = $('#inp-no-telp').val();
    key_cont = $('#slc-kontak :selected').val();
    stnk_status = $('#slc-stnk :selected').val();
    obj_loc = $('#inp-lokasi-kendaraan').val().toUpperCase();
    date_death = $('#inp-tgl-meninggal').val();
    f_clam_date = new Date(claim_date).format('yyyy-mm-dd');
    f_incd_date = new Date(incd_date).format('yyyy-mm-dd');
    if (date_death == '' || date_death == null) {
        f_date_death = null;
    } else {
        f_date_death = new Date(date_death).format('yyyy-mm-dd');
    }

    $.ajax({
        url: 'Controller_insurance_claim/save',
        type: 'POST',
        dataType: 'json',
        data: {
            'br_id_claim': br_id_claim,
            'claim_no': claim_no,
            'cont_no': cont_no,
            'insr_type': insr_type,
            'incd_date': f_incd_date,
            'claim_date': f_clam_date,
            'ext_war': ext_war,
            'polis_no': polis_no,
            'claim_report_type': claim_report_type,
            'claim_type': claim_type,
            'place_accd': place_accd,
            'cron_accd': cron_accd,
            'liability': liability,
            'heirs1': heirs1,
            'heirs1_real': heirs1_real,
            'heirs2': heirs2,
            'heirs2_real': heirs2_real,
            'heirs3': heirs3,
            'heirs3_real': heirs3_real,
            'report_pol': report_pol,
            'witn': witn,
            'witn_addr': witn_addr,
            'claim_report': claim_report,
            'phone_report': phone_report,
            'key_cont': key_cont,
            'stnk_status': stnk_status,
            'obj_loc': obj_loc,
            'date_death': f_date_death
        },

        success: function(response) {
            var res = response;
            console.log(res);
            if (response) {
                try {

                    if (res['Status']['Status'] == 200) {
                        get_bycont(1);

                    } else if (res['Status']['Status'] == 500) {
                        err = res['Status']['Error'];
                        alert_info(err);
                    }

                } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
    })
}


// CANCEL CLAIM INSURANCE =======================================================================================

$('#btn-cancel-insurance').click(function() {
    if (check_session() === 'true') {
        claim_no = $('#inp-no-claim').val().toUpperCase();
        br_id_claim = branch; 
        if (claim_status == '') {
            alert_info('DETAIL KLAIM HARUS DI ISI !');
            $('#inp-no-claim').addClass('has-error');
        } else {
            cancel_claim();
        }
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  } 

});

function cancel_claim() {
    claim_no = $('#inp-no-claim').val().toUpperCase();
    cont_no = $('#inp-no-cont').val();
    claim_date = $('#inp-tgl-pengajuan').val();
    date_death = $('#inp-tgl-meninggal').val();
    report_pol = $('#slc-polisi :selected').val();
    incd_date = $('#inp-tgl-kejadian').val();
    claim_report_type = $('#slc-jenis-pelaporan :selected').val();
    claim_type = $('#slc-jenis-klaim :selected').val();

    $.ajax({
        url: 'Controller_insurance_claim/cancel',
        type: 'POST',
        dataType: 'json',
        data: {
            'br_id_claim': br_id_claim,
            'claim_no': claim_no,
            'cont_no': cont_no,
            'claim_date': claim_date,
            'date_death': date_death,
            'report_pol': report_pol,
            'incd_date': incd_date,
            'claim_report_type': claim_report_type,
            'claim_type': claim_type

        },

        success: function(response) {
            var res = response;

            console.log(res);
            if (response) {
                try {

                    if (res['Status']['Status'] == 200) {
                        alert_info("DOKUMEN BERHASIL DICANCEL !");
                        $('#btn-send-to-insurance').prop('disabled',true);
                        $('#btn-save-insurance').prop('disabled',true);
                    } else {
                        err = res['Status']['Error'];
                        alert_error(err);
                    }

                } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
    })
}

// PRINT CLAIM INSURANCE =======================================================================================

$('#btn-print-insurance').click(function() {
    if (check_session() === 'true') {
        if (claim_no === 'XXXXXXXXXXXXX') {
            alert_info('KLAIM HARUS DISAVE DAHULU !');
            return false;
        } else if (claim_status == '') {
            alert_info('DETAIL KLAIM HARUS DI ISI !');
            return false;
        } else if (claim_status == '0' || claim_status === null) {
            alert_info('UNTUK DAPAT CETAK, MEMO HARUS DILAKUKAN SEND TO INSURANCE !');
            return false;
        } else if (claim_status == '1') {
            print();
        } else if (claim_status == '2') {
            alert_info('KLAIM SUDAH DICANCEL, TIDAK DAPAT MENJALANKAN PERINTAH !');
            return false;
        }
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  } 
});

function print() {
    claim_no = $('#inp-no-claim').val().toUpperCase();
    br_id_claim = branch; 

    $.ajax({
        url: "Controller_insurance_claim/getClaimByNo",
        type: 'POST',
        dataType: 'json',
        data: {
            "claim_no": claim_no,
            "br_id_claim": br_id_claim
        },
        success: function(response) {
            var res = response;
            if (response) {
                try {
                    var dataJson = JSON.stringify(res);

                    $('#id-no-claim').val(dataJson);
                    $('#id_print').submit();

                    // tutup $.each(res['Data'], function(index)
                } //tutup try
                catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            } //tutup if
        }, //tutup success
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
    }); //tutup ajax
}

// DOC UPDATE ============================ss==================================================================
$('#doc-update-tab').click(function() {
    if (check_session() === 'true') {
        claim_status = $('#inp-claim-status').val();
        claim_no = $('#inp-no-claim').val().toUpperCase();
        result_st = $('#result-status-inspro').val();

        if (claim_no === 'XXXXXXXXXXXXX') {
            alert_info('KLAIM HARUS DISAVE DAHULU !');
            return false;
        } else if (claim_status == '') {
            alert_info('DETAIL KLAIM HARUS DI ISI !');
            return false;
        } else if (result_st == 'R') {
            alert_info('NOMOR KLAIM ' + claim_no + ' TELAH DITOLAK');
            return false;
        } else if (result_st == 'C') {
            alert_info('NOMOR KLAIM ' + claim_no + ' TELAH DIBATALKAN');
            return false;
        } else if (claim_status == '0') {
            alert_info('UNTUK DAPAT UPDATE DOKUMEN, MEMO KLAIM HARUS DI LAKUKAN SEND TO INSURANCE OLEH CABANG!');
            return false;
        } else if (claim_status == '1') {
            get_upd_doc();
        } else if (claim_status == '2') {
            alert_info('KLAIM SUDAH DICANCEL, TIDAK ADA UPDATE DOCUMENT !');
            return false;
        } else if (claim_status == 'X') {
            alert_info('BELUM MENJALANKAN SSIS GENERATE_CLAIM_INSURANCE DI AD1SYS !');
            return false;
        }
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  } 
});

function get_upd_doc() {
    claim_no = $('#inp-no-claim').val().toUpperCase();
    br_id_claim = branch; 

    $.ajax({
        url: "Controller_insurance_claim/getUpdDoc",
        type: 'POST',
        dataType: 'json',
        data: {
            "br_id_claim": br_id_claim,
            "claim_no": claim_no
        },
        success: function(response) {
            console.log(response);
            var res = $.parseJSON(response);
            console.log(res);
            if (response) {
                try {

                    if (res['status'] == 500) {
                        alert_info("KLAIM TELAH DITOLAK, SILAHKAN AJUKAN BANDING !");
                        $('#a').click();
                    } else {
                        tbl_dokumen_update.clear().draw();
                        for (var i = 0; i < res['Data'].length; i++) {
                            no_special_char_insr();

                            if (res['Data'][i].doc_type == '1') {
                                mdt = '<font color="red"> *</font>';
                            } else {
                                mdt = '';
                            }
                            doc_status = res['docStatus'];

                            tbl_dokumen_update.row.add([
                                i + 1,
                                res['Data'][i].doc_desc + mdt,
                                '<div class="input-group input-tgl-rec">' +
                                '<input type="text" class="form-control inp-claim input-sm input-tgl-rec" id="input-tgl-rec' + i + '" value =' + res['Data'][i].doc_rec + '></input>' +
                                '<label class="input-group-addon btn" for="date">' +
                                '<span class="fa fa-calendar open-datetimepicker"></span>' +
                                '</label></div>',
                                '<div class="input-group input-tgl-upd">' +
                                '<input type="text" class="form-control inp-claim input-sm input-tgl-upd" id="input-tgl-upd' + i + '" value =' + res['Data'][i].doc_upd + '>' +
                                '<label class="input-group-addon btn" for="date">' +
                                '<span class="fa fa-calendar open-datetimepicker"></span>' +
                                '</label></div>',
                                // '<input type="text" class="form-control input-sm input-tgl-rec" id="input-tgl-rec'+i+'" value ='+ res['Data']['list_data'][i].doc_rec + '>',
                                // '<input type="text" class="form-control input-sm input-tgl-upd" id="input-tgl-upd'+i+'" value ='+ res['Data']['list_data'][i].doc_upd +'>',
                                '<input maxlength = "50" style="width: 100%;" type="text" class="form-control inp-claim input-sm input-ket-doc no-special-char-insr" id="input-ket-doc' + i + '" value ="'+ res['Data'][i].remaks.trim() +'">',
                                '<input type="hidden" class="form-control inp-claim" name="" id="inp-doc-id' + i + '" value =' + res['Data'][i].doc_id + '>'
                                ]).draw(false);

                            $('#input-tgl-rec'+i+'').datetimepicker({
                                format: 'DD-MMM-YYYY',
                                allowInputToggle: true,
                                maxDate: new Date(),
                                minDate : claim_date
                            });

                            $('#input-tgl-upd'+i+'').datetimepicker({
                                format: 'DD-MMM-YYYY',
                                allowInputToggle: true,
                                maxDate: new Date(),
                                minDate : claim_date
                            });
                        }

                        if (doc_status == 1) {
                            alert_info('DOCUMENT TELAH DI CONFIRM');
                            $('#btn-save-doc-upd').prop('disabled', true);
                            $('#btn-confirm-doc-upd').prop('disabled', true);
                            $('.input-tgl-rec').prop('disabled', true);
                            $('.input-tgl-upd').prop('disabled', true);
                            $('.input-ket-doc').prop('disabled', true);

                        }

                       

                        //validasi user
                        var cabang_user = $('#inp-branch-id').val();
                        var cabang_peng = claim_no.substring(0,4);
                        if (cabang_user != cabang_peng && claim_no != '') {
                        $('.inp-claim').prop('disabled',true);
                          if(cabang_user == '0000'){
                                $('#btn-terminate-result').prop('disabled' , false);
                                $('#btn-terminate-result-bd').prop('disabled' , false);
                            }
                        }

                }

            } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }

        },
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
    });
};

// SAVE DOC UPDATE ============================================================================================

$('#btn-save-doc-upd').click(function() {
    if (check_session() === 'true') {
        var flag = 0;
        var list_data = tbl_dokumen_update.data();
        for (var i = 0; i < list_data.length; i++) {
            var terima = new Date($('#input-tgl-rec' + i).val());
            var kirim = new Date($('#input-tgl-upd' + i).val());

            if (terima > kirim){
                alert_info('TANGGAL KIRIM PADA <b>'+list_data[i][1]+'</b> TIDAK BOLEH LEBIH KECIL DARI TANGGAL TERIMA!');
                flag = 1;
                break;
            }
        }
        if (flag === 0) {
            save_doc();
            get_upd_doc();
            $('#btn-confirm-doc-upd').prop('disabled', false);    
        }
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  } 
});

function save_doc() {
    br_id_claim = branch;
    var listDoc = [];
    var list_data = tbl_dokumen_update.data();
    var pages = tbl_dokumen_update.page();
    var remark;
    tbl_dokumen_update.page(0).draw('page');

    for (var i = 0; i < list_data.length; i++) {
        if ($('#input-tgl-rec' + i).val() == null) {
            tbl_dokumen_update.page('next').draw('page');

        }

        if ($('#input-tgl-rec' + i).val() == '' || $('#input-tgl-rec' + i).val() == null) {
            f_doc_rec = null;
        } else {
            f_doc_rec = new Date($('#input-tgl-rec' + i).val()).format('yyyy-mm-dd');
        }

        if ($('#input-tgl-upd' + i).val() == '' || $('#input-tgl-upd' + i).val() == null) {
            f_doc_upd = null;
        } else {
            f_doc_upd = new Date($('#input-tgl-upd' + i).val()).format('yyyy-mm-dd');
        } 

        if($('#input-ket-doc' + i).val().trim() == ''){
            remark = null;
        }else{
            remark = $('#input-ket-doc' + i).val().toUpperCase(); 
        }

        listDoc.push({
            claim_no: $('#inp-no-claim').val().toUpperCase(),
            doc_rec: f_doc_rec,
            doc_upd: f_doc_upd,
            remaks: remark,
            doc_id: $('#inp-doc-id' + i).val(),
            ket_banding : $('#inp-keterangan-bd-dok').val().toUpperCase()

        });
    }
    tbl_dokumen_update.page(pages).draw('page');


    $.ajax({
        url: 'Controller_insurance_claim/savedoc',
        type: 'POST',
        dataType: 'json',
        async:false,
        data: {
            "listDoc": listDoc,
            "br_id_claim": br_id_claim
        },

        success: function(response) {
            var res = $.parseJSON(response);;
            console.log(res);
            if (response) {
                try {

                    if (res['Status'] == 200) {
                        alert_info("DOKUMEN BERHASIL DIUPDATE !");

                    } else {
                        err = res['err'];
                        alert_error(err);
                    }

                } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
    })
}

// CONFIRM DOC UPDATE============================================================================================
$('#btn-confirm-doc-upd').click(function() {
    if (check_session() === 'true') {
        confrimDocUpd();
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }  

});

$('#btn-confirm-doc-bd').click(function() {
    if (check_session() === 'true') {
        confrimDocBanding();
        // get_doc_banding();
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }  
});

function confrimDocUpd() {

    $.ajax({
        url: "Controller_insurance_claim/confrimDocUpd",
        type: 'POST',
        dataType: 'json',
        async:false,
        data: {
            "claim_no": claim_no,
            "br_id_claim": br_id_claim
        },

        success: function(response) {
            var res = $.parseJSON(response);
            console.log(res);
            if (response) {
                try {
                    if (res['Status'] == 200) {
                        if (res['Data'] == 0) {
                            $('#btn-save-doc-upd').prop('disabled', true);
                            $('#btn-confirm-doc-upd').prop('disabled', true);
                            doc_status = 1;
                            $('.input-tgl-rec').prop('disabled', true);
                            $('.input-tgl-upd').prop('disabled', true);
                            $('.input-ket-doc').prop('disabled', true);
                            alert_info('DOKUMEN BERHASIL DIKONFIRMASI');

                        }else{
                            alert_info('DOKUMEN MANDATORI BELUM LENGKAP');
                        }

                    }else{
                        alert_info('DOKUMEN GAGAL DIKONFIRMASI');
                    }

                } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
    })
}

function confrimDocBanding() {
    $.ajax({
        url: "Controller_insurance_claim/confrimDocBanding",
        type: 'POST',
        dataType: 'json',
        data: {
            "claim_no": claim_no,
            "br_id_claim": br_id_claim
        },

        success: function(response) {
            var res = $.parseJSON(response);;
            console.log(res);

            if (response) {
                try {

                    if (res['Status'] == 200) {
                        if (res['Data'] == 0) {
                            $('#btn-save-doc-bd').prop('disabled', true);
                            $('#btn-confirm-doc-bd').prop('disabled', true);
                            doc_status = 2;
                            $('.input-tgl-rec-bd').prop('disabled', true);
                            $('.input-tgl-upd-bd').prop('disabled', true);
                            $('.input-ket-doc-bd').prop('disabled', true);
                            $('#inp-keterangan-bd-dok').prop('disabled', true);
                            alert_info('DOKUMEN BERHASIL DIKONFIRMASI');

                        }else{
                            if ($('#input-ket-doc-bd0').val().trim() == '' || $('#input-ket-doc-bd1').val().trim() == '' || $('#input-ket-doc-bd2').val().trim() == '') {
                                alert_info('MOHON ISI KETERANGAN DOKUMEN');
                            }
                            else{
                                alert_info('DOKUMEN MANDATORI BELUM LENGKAP');    
                            }
                            
                        }
                    }

                } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
    })
}



// CLAIM RESULT TAB ===========================================================================================
var total_wajib = 0;
$('#btn-print-result').click(function() {
    if (check_session() === 'true') {
        alert_confirm('PRINT DATA INSURANCE?', function() {
            getPrintTerm();    
        });
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }  
});

function getPrintTerm() {
    debugger;

    br_id = branch; 
    var memo_no = $('#no-memo-inspro').val();
    var fin_type= $('#inp-fin-type').val(); 
    var arrayData = [];
    arrayData.push({
        con_no: cont_no,
        br_id: br_id
    });
    var diskon ='0'
    
if (fin_type=='2')
{$.ajax({
        url: "Controller_insurance_claim/getPrintTermSya",
        cache: false,
        type: 'post',
        data: {
            arrayData
        },
        dataType: 'json',
        success: function(response) {
            // var result = $.parseJSON(response);
            if (response){
             var front = {
            'diskon' :diskon
                 };
               /*  var financetype = response['sisaAng'];*/
                var printWindow = window.open();
                printWindow.document.write('<pre id = "printss" ></pre>');
                printWindow.document.querySelector('pre').innerHTML = response;
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close();

                 
            }else{
             alert_error(response);
            }
     },
     error: function(response) {
        console.log(response);
        alert_error(response);
    }
});}
else
{
$.ajax({
        url: "Controller_insurance_claim/getPrintTerm",
        cache: false,
        type: 'post',
        data: {
            arrayData
        },
        dataType: 'json',
        success: function(response) {
            // var result = $.parseJSON(response);
            if (response){
                var printWindow = window.open();
                printWindow.document.write('<pre id = "printss" ></pre>');
                printWindow.document.querySelector('pre').innerHTML = response;
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close();
                 
            }else{
             alert_error(response);
            }
     },
     error: function(response) {
        console.log(response);
        alert_error(response);
    }
});

}
    
}

$("#dspsurat").on('blur', function(e) {
    var nilai = $("#dspsurat").val();
    this.value = accounting.formatMoney(nilai, '', 2, ',', '.');
    countTab();
});
$("#dspsurat").on('click', function(e) {
    var nilai = $("#dspsurat").val();
    this.value = accounting.unformat(nilai);
    countTab();
});

$("#dsplunas").on('blur', function(e) {
    var nilai = $("#dsplunas").val();
    this.value = accounting.formatMoney(nilai, '', 2, ',', '.');
    countTab();
});
$("#dsplunas").on('click', function(e) {
    var nilai = $("#dsplunas").val();
    this.value = accounting.unformat(nilai);
    countTab();
});

function countTab() {
    var pelunasan = accounting.unformat($('#dsplunas').val());
    var biaya_pengurusan = accounting.unformat($('#dspsurat').val());
    var total_titipan = accounting.unformat($('#dspdeposit').val());
    var refund = accounting.unformat($('#ref_amt').val());

    var tot_wajib = Number(biaya_pengurusan) + Number(pelunasan) + Number(total_wajib);
    $('#dspwajib').val(accounting.formatMoney(tot_wajib, '', 2, ',', '.'));
    var total = tot_wajib - Number(total_titipan);
    $('#dspdue').val(accounting.formatMoney(total, '', 2, ',', '.'));
    var total_refund = Number(refund) - total;
    if (total_refund < 0) {
        $('#dsprefund').val(accounting.formatMoney(0, '', 2, ',', '.'));
    }else{
        $('#dsprefund').val(accounting.formatMoney(total_refund, '', 2, ',', '.'));
    }

}

$('#btn-terminate-result').click(function() {
    debugger;
    if (check_session() === 'true') {
        var res = $('#result-status-inspro').val();
        var br_code = $('#inp-branch-id').val();
         var fin_type = $('#inp-fin-type').val();
        var br_id = branch; 
        var count = 0;
        var arrayData = [];
        arrayData.push({
            con_no: cont_no,
            dtbayar: new Date().format('dd-mm-yyyy'),
            br_id: br_id
        });
         if (localStorage.getItem('role_terminate') == 'true') {
            if ( $('#inp-receive-status-inspro').val() == '1'){
                alert_info('KONTRAK SUDAH DI TERMINATE!');
                return false;
            }else if (res == '0') {
                alert_info('KLAIM BELUM DIPUTUSKAN! ! TIDAK DAPAT MELAKUKAN TERMINATE');
                return false;
            }else if (res != 'A') {
                alert_info('HASIL KLAIM BUKAN DISETUJUI! TIDAK DAPAT MELAKUKAN TERMINATE');
                return false;
            }else{
                if ((branch != br_code) && (br_code != '0000')){
                    alert_info('TERMINATE HANYA BISA DILAKUKAN PADA CABANG ASAL PENGAJUAN');
                } else if (br_code == '0000') {
                    if($('#inp-nilai-ganti').val() != ''){
                        alert_error('UNTUK USER HO TIDAK DAPAT MELAKUKAN TERMINATE JIKA NILAI PENGGANTIAN TERISI');
                        return false;
                    }else {
                        debugger;
                        if (fin_type== '1'){
                                getCountTerminate(arrayData);
                            }
                            else
                            {
                                getCountTerminateSya(arrayData);
                            }
                        
                    }
                } else if (br_code != '0000') {
                    if($('#inp-nilai-ganti').val() == ''){
                        alert_error('UNTUK USER CABANG TIDAK DAPAT MELAKUKAN TERMINATE JIKA NILAI PENGGANTIAN TIDAK TERISI');
                        return false;
                    }else if ( $('#inp-tgl-pembayaran-bd').val() == ''){
                        alert_error('TANGGAL PENGGANTIAN HARUS TERISI UNTUK MELANJUTKAN PROSES TERMINATE!');
                        return false;
                    }else {
                        if (fin_type== '1'){
                            debugger;
                                getCountTerminate(arrayData);
                            }
                            else
                            {
                                getCountTerminateSya(arrayData);
                            }
                        
                    }
                }

            }
        }else{
            alert_error('USER TIDAK MEMILIKI HAK AKSES MELAKUKAN TERMINATE');

        }
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }  

});


/* kondisi awal */
var dspsurat;
var dsplunas;
$('#btn-print-result').prop('disabled' , true);
$('#btn-print-result-bd').prop('disabled' , true);
$('#btn-terminate-result').prop('disabled' , true);
$('#btn-terminate-result-bd').prop('disabled' , true);
function getDataCustTerminate(arrayData){
  $.ajax({
    url: "Controller_insurance_claim/getDataCustTerminate",
    cache: false,
    async : false,
    type: 'post',
    data: {
        arrayData
    },
    dataType: 'json',
    success: function(response) {
        var result = $.parseJSON(response);
        if (response) {
            try {
                if (result['Status'] == 200) {

                    $('#tgl-tempo-inspro').val(result['Data_Customer'].due_date);
                    $('#tgl-contract-inspro').val(result['Data_Customer'].cont_date);
                    $('#no-cust-inspro').val(result['Data_Customer'].cust_no);
                    $('#nama-cust-inspro').val(result['Data_Customer'].cust_name);
                    $('#tgl-memo-inspro').val(result['Data_Customer'].memo_date);
                    $('#no-memo-inspro').val(result['Data_Customer'].memo_no);
                    $('#tgl-kejadian-inspro').val(result['Data_Customer'].act_date);
                    $('#inp-receive-status-inspro').val(result['Data_Customer'].receive_status);
                    $('#inp-contract-status-inspro').val(result['Data_Customer'].status_contract); 

                    dspsurat = result['Data_Customer'].adm_fee;
                    dsplunas = result['Data_Customer'].term_paid;

                    $('#dspsurat').val(accounting.formatMoney(result['Data_Customer'].adm_fee, '', 2, ',', '.'));
                    $('#dsplunas').val(accounting.formatMoney(result['Data_Customer'].term_paid, '', 2, ',', '.'));


                    if(result['Data_Customer'].receive_status == '1'){
                        $('#btn-print-result').prop('disabled' , false);
                        $('#btn-print-result-bd').prop('disabled' , false);
                        $('#btn-terminate-result').prop('disabled' , true);
                        $('#btn-terminate-result-bd').prop('disabled' , true);
                    }else{
                        $('#btn-print-result').prop('disabled' , true);
                        $('#btn-print-result-bd').prop('disabled' , true);
                        $('#btn-terminate-result').prop('disabled' , false);
                        $('#btn-terminate-result-bd').prop('disabled' , false);
                    }

                    // if($('#inp-contract-status-inspro').val() == '01'){
                    //     $('#dspsurat').prop('disabled' , true);
                    //     $('#dsplunas').prop('disabled' , true);

                    // }

                }

            } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
        }
        },
        error: function(response) {
            alert_error(response);
            console.log(response);
        }
    });
}


function getCountTerminate(arrayData) {
    debugger;
    $.ajax({
        url: "Controller_insurance_claim/getCountTerminate",
        cache: false,
        type: 'post',
        data: {
            arrayData
        },
        dataType: 'json',
        success: function(response) {
            var result = $.parseJSON(response);
            if (response) {
                try {

                    if (result['Status'] == 200) {

                        $('#pelunasan-ke-inspro').val(result['Data_Term'].szinstnopreterm);
                        $('#pelunasan-inspro').val(result['Data_Term'].szinstno);

                        $('#dspsispok').val(accounting.formatMoney(result['Data_Term'].ospokok, '', 2, ',', '.'));
                        $('#dspdenda').val(accounting.formatMoney(result['Data_Term'].dectotpinalty, '', 2, ',', '.'));
                        $('#dspbhb').val(accounting.formatMoney(result['Data_Term'].bungahariberjalan, '', 2, ',', '.'));
                        $('#dspbunga').val(accounting.formatMoney(result['Data_Term'].osbunga, '', 2, ',', '.'));
                        $('#dspdeposit').val(accounting.formatMoney(result['Data_Term'].titipan, '', 2, ',', '.'));

                        $('#dspokok').val(accounting.formatMoney(result['Data_Term'].totpokok, '', 2, ',', '.')); //(due_prin + due_intr) 
                        
                        $('#decodpokokdn-inspro').val(result['Data_Term'].decodpokokdn);
                        $('#decodbungadn-inspro').val(result['Data_Term'].decodbungadn);

                        $('#tot-bungatunggakan-inspro').val(result['Data_Term'].totalbungatunggakan); //due_prin
                        $('#tot-pokoktunggakan-inspro').val(result['Data_Term'].totalpokoktunggakan); //due_intr

                        t_wajib = Number(result['Data_Term'].ospokok) + Number(result['Data_Term'].totalbungatunggakan) 
                                + Number(result['Data_Term'].totalpokoktunggakan) 
                                + Number(result['Data_Term'].dectotpinalty) + Number(result['Data_Term'].bungahariberjalan);

                        $('#dspwajib').val(accounting.formatMoney(t_wajib, '', 2, ',', '.'));

                        var depo = accounting.unformat($('#dspdeposit').val());

                        var dspdue = (t_wajib - Number(result['Data_Term'].titipan));
                        if (dspdue < 0 ) {
                            dspdue = 0;
                        }else if (depo > t_wajib){
                            dspdue = 0;
                        }
                        
                        $('#dspdue').val(accounting.formatMoney(dspdue, '', 2, ',', '.'));

                        total_wajib = t_wajib
                        if (g_refund > 0) {
                         var bayar = accounting.unformat($('#dspdue').val());
                         var val = g_refund - bayar;
                        
                            if (val > 0) {
                                $('#dsprefund').val(accounting.formatMoney(val, '', 2, ',', '.'));
                            } else {
                                $('#dsprefund').val(accounting.formatMoney(0, '', 2, ',', '.'));
                            }

                        } else {
                            $('#dsprefund').val(accounting.formatMoney(0, '', 2, ',', '.'));
                        }
                    $('#modal-terminate-insclaim').modal('show');

                } else if (result['Status'] == 500){
                    alert_info(result['Error']);
                    return false;
                    $('#modal-terminate-insclaim').modal('hide');
                }

            } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }
        },
        error: function(response) {
            alert_error(response);
            console.log(response);
            $('#modal-terminate-insclaim').modal('hide');
        }
    });
}


function getCountTerminateSya(arrayData) {
    debugger;
    $.ajax({
        url: "Controller_insurance_claim/getCountTerminate",
        cache: false,
        type: 'post',
        data: {
            arrayData
        },
        dataType: 'json',
        success: function(response) {
            var result = $.parseJSON(response);
            if (response) {
                try {

                    if (result['Status'] == 200) {

                        $('#pelunasan-ke-inspro').val(result['Data_Term'].szinstnopreterm);
                        $('#pelunasan-inspro').val(result['Data_Term'].szinstno);

                        $('#dspsispok').val(accounting.formatMoney(result['Data_Term'].ospokok, '', 2, ',', '.'));
                        $('#dspdenda').val(accounting.formatMoney(result['Data_Term'].dectotpinalty, '', 2, ',', '.'));
                        $('#dspbhb').val(accounting.formatMoney(result['Data_Term'].bungahariberjalan, '', 2, ',', '.'));
                        $('#dspbunga').val(accounting.formatMoney(result['Data_Term'].osbunga, '', 2, ',', '.'));
                        $('#dspdeposit').val(accounting.formatMoney(result['Data_Term'].titipan, '', 2, ',', '.'));

                        $('#dspokok').val(accounting.formatMoney(result['Data_Term'].totpokok, '', 2, ',', '.')); //(due_prin + due_intr) 
                        
                        $('#decodpokokdn-inspro').val(result['Data_Term'].decodpokokdn);
                        $('#decodbungadn-inspro').val(result['Data_Term'].decodbungadn);

                        $('#tot-bungatunggakan-inspro').val(result['Data_Term'].totalbungatunggakan); //due_prin
                        $('#tot-pokoktunggakan-inspro').val(result['Data_Term'].totalpokoktunggakan); //due_intr

                        t_wajib = Number(result['Data_Term'].ospokok) + Number(result['Data_Term'].totalbungatunggakan) 
                                + Number(result['Data_Term'].totalpokoktunggakan) 
                                + Number(result['Data_Term'].dectotpinalty) + Number(result['Data_Term'].bungahariberjalan);

                        $('#dspwajib').val(accounting.formatMoney(t_wajib, '', 2, ',', '.'));

                        var depo = accounting.unformat($('#dspdeposit').val());

                        var dspdue = (t_wajib - Number(result['Data_Term'].titipan));
                        if (dspdue < 0 ) {
                            dspdue = 0;
                        }else if (depo > t_wajib){
                            dspdue = 0;
                        }
                        
                        $('#dspdue').val(accounting.formatMoney(dspdue, '', 2, ',', '.'));

                        total_wajib = t_wajib
                        if (g_refund > 0) {
                         var bayar = accounting.unformat($('#dspdue').val());
                         var val = g_refund - bayar;
                        
                            if (val > 0) {
                                $('#dsprefund').val(accounting.formatMoney(val, '', 2, ',', '.'));
                            } else {
                                $('#dsprefund').val(accounting.formatMoney(0, '', 2, ',', '.'));
                            }

                        } else {
                            $('#dsprefund').val(accounting.formatMoney(0, '', 2, ',', '.'));
                        }
                    document.getElementById('denda-claim-harus').innerHTML = 'Sanksi yang harus Dibayar Rp';
                    document.getElementById('bunga-claim-hapus').innerHTML = 'Margin yang di hapuskan Rp';
                    document.getElementById('bunga-claim-jalan').innerHTML = 'Margin Harian Rp';
                    $('#modal-terminate-insclaim').modal('show');


                } else if (result['Status'] == 500){
                    alert_info(result['Error']);
                    return false;
                    $('#modal-terminate-insclaim').modal('hide');
                }

            } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }
        },
        error: function(response) {
            alert_error(response);
            console.log(response);
            $('#modal-terminate-insclaim').modal('hide');
        }
    });
}
$('#claim-result-tab').click(function() {
    debugger;
    if (check_session() === 'true') {
        claim_status = $('#inp-claim-status').val();
        claim_no = $('#inp-no-claim').val().toUpperCase();
        result_st = $('#result-status-inspro').val();

        if (claim_no === 'XXXXXXXXXXXXX') {
            alert_info('KLAIM HARUS DISAVE DAHULU !');
            return false;
        } else if (claim_status == '') {
            alert_info('DETAIL KLAIM HARUS DI ISI !');
            return false;
        } else if (result_st == 'R') {
            alert_info('NOMOR KLAIM ' + claim_no + ' TELAH DITOLAK');
            return false;
        } else if (result_st == 'C') {
            alert_info('NOMOR KLAIM ' + claim_no + ' TELAH DIBATALKAN');
            return false;
        } else if (doc_status != '1') {
            alert_info('HARAP LENGKAPI DOCUMENT MANDATORY TERLEBIH DAHULU DI CABANG!');
            return false;
        } else if (claim_status == '0') {
            alert_info('UNTUK DAPAT UPDATE DOKUMEN, MEMO KLAIM HARUS DI LAKUKAN SEND TO INSURANCE OLEH CABANG');
            return false;
        } else if (claim_status == '1') {
            getReceiveAmt();
            get_result_claim(0);
        } else if (claim_status == '2') {
            alert_info('KLAIM SUDAH DICANCEL, TIDAK ADA RESULT !!');
            return false;
        } else if (claim_status == 'X') {
            alert_info('BELUM MENJALANKAN SSIS GENERATE_CLAIM_INSURANCE DI AD1SYS !');
            return false;
        }
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }    

});

/* kondisi awal disabled*/
$('#btn-save-result').prop('disabled', true);
$('#btn-save-result-bd').prop('disabled', true);
$('#inp-tgl-hasil-klaim').prop('disabled', true);
$('#inp-keterangan-result').prop('disabled', true);
$('#inp-tgl-hasil-klaim-bd').prop('disabled', true);
$('#inp-keterangan-result-bd').prop('disabled', true);
function get_result_claim(stat) {
    debugger;
    var br_id = branch; 
    $.ajax({
        url: "Controller_insurance_claim/getresultclaim",
        type: 'POST',
        dataType: 'json',
        data: {
            "claim_no": claim_no,
            "br_id": br_id
        },

        success: function(response) {
            console.log(response);
            var res = response;
            if (response) {
                try {
                    if (res['Status'] == 500) {
                        alert_info(res['Error']);
                        return false;
                    } else {

                        $.each(res['Data'], function(index) {
                            claim_type_desc = this['claim_type_desc'];
                            claim_date = this['claim_date'];
                            claim_result_desc = this['claim_result_desc'].trim();
                            claim_result_date = this['claim_result_date'];
                            claim_result_status = this['claim_result_status'];
                            appeal_status = this['appeal_status'];
                            result_status = this['claim_result_status'];
                            appeal_desc = this['appeal_desc'].trim();
                            appeal_result_date = this['appeal_result_date'];
                            fin_type = this['fin_type'];

                        });

                        if (stat == 0) {

                            $('#result-status-inspro').val(claim_result_status);
                            $('#inp-asuransi-result').val(claim_type_desc);
                            $('#inp-keterangan-result').val(claim_result_desc);
                            $('#inp-tgl-hasil-klaim').data("DateTimePicker").minDate(claim_date);
                            $('#inp-tgl-hasil-klaim').val(claim_result_date);
                            $('#inp-fin-type').val(fin_type);

                            if (result_status == 'A') {
                                $('#rb-setuju').prop('checked', true);
                            } else if (result_status == 'R') {
                                $('#rb-tidak').prop('checked', true);
                            } else if (result_status == 'C') {
                                $('#rb-batal').prop('checked', true);
                            } else if (result_status == '0') {
                                $('#rb-null').prop('checked', true);
                            }

                            if(result_status == '0'){
                                $('#btn-save-result').prop('disabled', false);
                                $('#btn-save-result-bd').prop('disabled', false);
                                $('#inp-tgl-hasil-klaim').prop('disabled', false);
                                $('#inp-keterangan-result').prop('disabled', false);
                            }else{
                                $('#inp-tgl-hasil-klaim').prop('disabled',true);
                                $('#inp-keterangan-result').prop('disabled',true);
                                $('input[name=resultClaim]').prop('disabled',true);
                            }
                        }

                        if (stat == 1) {

                            $('#banding-status-inspro').val(appeal_status);
                            $('#inp-asuransi-result-bd').val(claim_type_desc);
                            $('#inp-keterangan-bd').val(appeal_desc);
                            $('#inp-tgl-hasil-banding-bd').data("DateTimePicker").minDate(claim_date);
                            $('#inp-tgl-hasil-banding-bd').val(appeal_result_date);
                            $('#inp-fin-type').val(fin_type);

                            if (appeal_status == 'A') {
                                $('#rb-setuju-bd').prop('checked', true);
                            } else if (appeal_status == 'R') {
                                $('#rb-tidak-bd').prop('checked', true);
                            } else if (appeal_status == 'C') {
                                $('#rb-batal-bd').prop('checked', true);
                            } else if (appeal_status == '0') {
                                $('#rb-null-bd').prop('checked', true);
                            }


                            if(appeal_status == '0' ){
                                $('#btn-save-result').prop('disabled', false);
                                $('#btn-save-result-bd').prop('disabled', false);
                                $('#inp-tgl-hasil-klaim-bd').prop('disabled', false);
                                $('#inp-keterangan-result-bd').prop('disabled', false);
                            }else{
                                $('#inp-tgl-hasil-banding-bd').prop('disabled',true);
                                $('#inp-keterangan-bd').prop('disabled',true);
                                $('input[name=resultBd]').prop('disabled',true);
                            }
                        }

                        //validasi user
                        var cabang_user = $('#inp-branch-id').val();
                        var cabang_peng = claim_no.substring(0,4);
                        if (cabang_user != cabang_peng && claim_no != '') {
                        $('.inp-claim').prop('disabled',true);
                          if(cabang_user == '0000'){
                                $('#btn-terminate-result').prop('disabled' , false);
                                $('#btn-terminate-result-bd').prop('disabled' , false);
                          }
                    }


                }

            } catch (e) {
                $('#loading-ajax').hide(); 
                console.log(e);
                alert_error("Galat" + e);
            }
        }
    },
    error: function(response) {
        console.log(response);
        alert_error(response);
    }
})
}

$('#btn-confirm-term').click(function() {
    arrayDataTerm = [];
    arrayDataTerm.push({
        con_no : $('#inp-no-cont').val(),
        dtbayar : new Date().format('dd-mm-yyyy'),
        br_id: branch
    });

    if (check_session() === 'true') {
        alert_confirm('TERMINATE DATA INSURANCE?', function() {
            //if( $('#inp-contract-status-inspro').val() == '02' ){
            //    saveTermClaim();
                // if (status_preterm == 1){
                //     terminateClaim();
                // }
                //getDataCustTerminate(arrayDataTerm);
            // }else{
            terminateClaim();
            //    getDataCustTerminate(arrayDataTerm);             
            //}
        });

    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  } 
});

function terminateClaim() {

    var br_id = branch;
    var cname = $('#nama-cust-inspro').val();
    var instnopreterm = $('#pelunasan-ke-inspro').val();
    var no_cust = $('#no-cust-inspro').val();
    var memo_date = $('#tgl-memo-inspro').val();
    var act_date = $('#tgl-kejadian-inspro').val();
    var due_date = $('#tgl-tempo-inspro').val();
    var date_term = new Date().format('dd-mm-yyyy');
    var dspinst_no = accounting.unformat($('#pelunasan-inspro').val()); 

    var pokokdn = accounting.unformat($('#decodpokokdn-inspro').val());
    var bungadn = accounting.unformat($('#decodbungadn-inspro').val());

    var sisapokok = accounting.unformat($('#dspsispok').val()); //outst_principal
    var bunga = accounting.unformat($('#dspbunga').val()); //outst_interest
    var bunga_hb = accounting.unformat($('#dspbhb').val()); //days_interest
    var denda = accounting.unformat($('#dspdenda').val()); //outst_pinalty
    var deposit = accounting.unformat($('#dspdeposit').val()); //depo_amt
    var totalpokoktunggakan = accounting.unformat($('#tot-pokoktunggakan-inspro').val()); //due_principal
    var totalbungatunggakan = accounting.unformat($('#tot-bungatunggakan-inspro').val()); //due_intere
    
    var dspsurat = accounting.unformat($('#dspsurat').val());
    var pelunasanlain = accounting.unformat($('#dsplunas').val());
    var dspdue = accounting.unformat($('#dspdue').val()); //add

    var arrayData = [];
    arrayData.push({
        cont_no: cont_no,
        br_id: br_id,
        cname: cname,
        instnopreterm: instnopreterm,
        date_term: date_term,
        due_date: due_date,
        memo_date: memo_date,
        act_date: act_date,
        no_cust: no_cust,
        sisapokok: sisapokok,
        bunga: bunga,
        bunga_hb: bunga_hb,
        denda: denda,
        dspinst_no: dspinst_no,
        deposit: deposit,
        totalpokoktunggakan: totalpokoktunggakan,
        totalbungatunggakan: totalbungatunggakan,
        pokokdn: pokokdn,
        bungadn: bungadn,
        pelunasanlain: pelunasanlain,
        dspdue: dspdue,
        dspsurat: dspsurat,
    });

    $.ajax({
        url: "Controller_insurance_claim/terminateClaim",
        cache: false,
        type: 'post',
        data: {
            arrayData
        },
        dataType: 'json',
        success: function(response) {
        var res = $.parseJSON(response);
        if (response) {
                try {
                if (res['Status'] == 200) {
                    refund_amount = accounting.unformat($('#dsprefund').val());
                    getDataCustTerminate(arrayDataTerm);
                    if(refund_amount > 0){
                         alert_info('TERMINATE DENGAN NOMOR MEMO ' + $('#no-memo-inspro').val() + ' TELAH BERHASIL DENGAN NILAI REFUND ' + $('#dsprefund').val() + ' !');
                    }else{
                         alert_info('TERMINATE DENGAN NOMOR MEMO ' + $('#no-memo-inspro').val() + ' TELAH BERHASIL DAN TIDAK ADA NILAI REFUND!');
                    }
                } else if (res['Status'] == 500){
                    alert_info('GAGAL TERMINATE  : ' + res['Error']);
                }
            } catch (e) {
                $('#loading-ajax').hide(); 
                console.log(e)
                alert_error("Galat" + e);
            }
        }

    },
    error: function(response) {
        console.log(response);
        alert_error(response);
    }
});

}

/*kondisi awal*/
var g_refund ;
function getReceiveAmt() {
    var br_id = branch; 
    var arrayData = [];

    arrayData.push({
        con_no: cont_no,
        br_id: br_id
    });
    $.ajax({
        url: "Controller_insurance_claim/getReceiveAMT",
        cache: false,
        type: 'post',
        async: false,
        data: {
            arrayData
        },
        dataType: 'json',
        success: function(response) {
            console.log(response);
            var result = $.parseJSON(response);
            if (response){
                try {
                    if (result['Status'] == 500) {
                        g_refund = 0;
                        $('#inp-nilai-ganti').val('');
                        $('#inp-nilai-ganti-bd').val('');
                        $('#ref_amt').val(accounting.formatMoney(0, '', 2, ',', '.'));
                    } else if (result['Status'] == 200) {

                        if (result['rec_amt'] > 0) {
                            g_refund = result['rec_amt'];
                            $('#inp-nilai-ganti').val(accounting.formatMoney(g_refund, '', 2, ',', '.'));
                            $('#inp-nilai-ganti-bd').val(accounting.formatMoney(g_refund, '', 2, ',', '.'));
                            $('#ref_amt').val(accounting.formatMoney(g_refund, '', 2, ',', '.'));

                        } else {
                            g_refund = 0;
                            $('#inp-nilai-ganti').val('');
                            $('#inp-nilai-ganti-bd').val('');
                            $('#ref_amt').val(accounting.formatMoney(0, '', 2, ',', '.'));
                        }

                        $('#inp-tgl-pembayaran').val(result['rec_date']);
                        $('#inp-tgl-pembayaran-bd').val(result['rec_date']);

                    }
                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
    });
}

var status_preterm;
function saveTermClaim() {
    var insalment_no = $('#pelunasan-ke-inspro').val();
    var br_id = branch;
    var outst_principal = accounting.unformat($('#dspsispok').val());
    var outst_pinalty = accounting.unformat($('#dspdenda').val());
    var days_interest = accounting.unformat($('#dspbhb').val());
    var outst_interest = accounting.unformat($('#dspbunga').val());
    var depo_amt = accounting.unformat($('#dspdeposit').val());
    var due_principal = accounting.unformat($('#tot-pokoktunggakan-inspro').val());
    var due_interest = accounting.unformat($('#tot-bungatunggakan-inspro').val());
    var fee_amt = accounting.unformat($('#dspwajib').val()); 
    var term_paid = accounting.unformat($('#dsplunas').val());
    var adm_fee = accounting.unformat($('#dspsurat').val());
    var term_admin =  0;
    $.ajax({
        url: "Controller_insurance_claim/savePretermClaim",
        type: 'post',
        data: {
            'branch_code': br_id,
            'contract_no': cont_no,
            'insalment_no': insalment_no,
            'outst_principal': outst_principal, //dspsispok ok
            'outst_interest': outst_interest, //dspbunga ok
            'outst_pinalty': outst_pinalty, //dspdenda ok
            'due_principal': due_principal,
            'due_interest': due_interest,
            'term_admin': term_admin,
            'days_interest': days_interest, //dspbhb ok
            'term_paid': term_paid, //pelunasanlain
            'depo_amt': depo_amt, //dspdeposit ok
            'adm_fee': adm_fee, //dspsurat ok
            'fee_amt': fee_amt, //dspdue ok
            'sumber_dana': '',
            'reason_preterm': '',
        },
        dataType: 'json',
        success: function(response) {
            //console.log(response);
            var result = $.parseJSON(response);
            if (response){
                try {
                    if (result['Status'] == 200){
                        $('#inp-contract-status-inspro').val('01');
                        $('#no-memo-inspro').val(result['memo']);
                        status_preterm = 1;
                        getDataCustTerminate(arrayDataTerm);
                    }else if(result['Status'] == 500 ){
                        status_preterm = 0;
                        alert_info(result['Error']);
                        return false;
                    }
                } catch (e) {
                    $('#loading-ajax').hide(); 
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }

        },
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
        });
}

$('#btn-save-result').click(function() {
    if (check_session() === 'true') {
        if ($('input[name=resultClaim]:checked').val() == 'null') {
            alert_info('STATUS HASIL KLAIM BELUM DIISI!');
        } else if ($('#inp-tgl-hasil-klaim').val() == '') {
            alert_info('TANGGAL HASIL KLAIM BELUM TERISI!');
            $('#inp-tgl-hasil-klaim').addClass('has-error');
        } else if ($('#inp-keterangan-result').val().trim() == '') {
            alert_info('KETERANGAN RESULT BELUM TERISI!');
            $('#div-ket-claim').addClass('has-error');
        } else {
            alert_confirm('SIMPAN DATA HASIL KLAIM ?', function() {
                saveClaimResult();
            });
        }
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }      
});

function saveClaimResult() {

    var szstat = $('input[name=resultClaim]:checked').val();
    var res_desc = $('#inp-keterangan-result').val().toUpperCase();
    var res_date = $('#inp-tgl-hasil-klaim').val();
    var br_id = branch; 

    var arrayData = [];
    arrayData.push({
        szstat: szstat,
        res_desc: res_desc,
        res_date: res_date,
        claim_no: claim_no,
        br_id   : br_id
    });


    $.ajax({
        url: "Controller_insurance_claim/saveClaimResult",
        cache: false,
        type: 'post',
        data: {
            arrayData
        },
        dataType: 'json',
        success: function(response) {
            var result = $.parseJSON(response);
            if (response) {
                try {
                    if (result['Status'] == 200) {
                        alert_info('SIMPAN DATA NOMOR KLAIM ' + claim_no + ' SUKSES');
                        $('#result-status-inspro').val(szstat);
                        $('#btn-save-result').prop('disabled',true);
                        $('#c').click();
                    } else {
                        alert_info(result['Error']);
                    }
                } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }

        },
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
    });
}
// DOC BANDING TAB  =========================================================================================

$('#banding-tab').click(function() {
    if (check_session() === 'true') {
        claim_status = $('#inp-claim-status').val();
        claim_no = $('#inp-no-claim').val().toUpperCase();
        result_st = $('#result-status-inspro').val();

        if (claim_no === 'XXXXXXXXXXXXX') {
            alert_info('KLAIM HARUS DISAVE DAHULU !!');
            return false;
        } else if (claim_status == '') {
            alert_info('DETAIL KLAIM HARUS DI ISI !!');
            return false;
        } else if (claim_status == '0') {
            alert_info('UNTUK DAPAT BANDING, MEMO KLAIM HARUS DI LAKUKAN SEND TO INSURANCE OLEH CABANG');
            return false;
        } else if (claim_status == '2') {
            alert_info('KLAIM SUDAH DICANCEL, TIDAK ADA BANDING !!');
            return false;
        } else if (result_st != 'R') {
            alert_info('HASIL KLAIM BUKAN DITOLAK !!');
            return false;
        } else if (claim_status == '1' && result_st == 'R') {
            get_doc_banding();
            getReceiveAmt();
            get_result_claim(1);
        } else if (claim_status == 'X') {
            alert_info('BELUM MENJALANKAN SSIS GENERATE_CLAIM_INSURANCE DI AD1SYS !');
            return false;
        }
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }      

});

$('#tab-banding-result').click(function() {
    if (check_session() === 'true') {
        claim_status = $('#inp-claim-status').val();
        claim_no = $('#inp-no-claim').val().toUpperCase();
        result_st = $('#result-status-inspro').val();

        if(doc_status != '2'){
          alert_info('HARAP LENGKAPI DOCUMENT MANDATORY TERLEBIH DAHULU!');
          return false;
        }else if (claim_status == '1') {
           get_result_claim(1);
        } else if (claim_status == '2') {
           alert_info('KLAIM SUDAH DICANCEL, TIDAK ADA RESULT !!');
           return false;
        }
}else if (check_session() == 'false') {
  alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
    localStorage.clear();
    window.location.href = base_url + "Controller_login/login_view";
});
}    

});

function get_doc_banding() {
    $('#btn-confirm-doc-bd').prop('disabled', true);
    $('#btn-save-doc-bd').prop('disabled', false);
    claim_no = $('#inp-no-claim').val().toUpperCase();
    br_id_claim = branch; 
    $.ajax({
        url: "Controller_insurance_claim/getdocbanding",
        type: 'POST',
        dataType: 'json',
        data: {
            "claim_no": claim_no,
            "br_id_claim": br_id_claim
        },

        success: function(response) {
            var res = $.parseJSON(response);
            console.log(res);
            if (response) {
                try {
                    tbl_banding_dokumen.clear().draw();

                    $('#inp-keterangan-bd-dok').val(res['ket_banding']);
                    for (var i = 0; i < res['list data'].length; i++) {
                        no_special_char_insr();

                        if (res['list data'][i].doc_type == '1') {
                            mdt = '<font color="red"> *</font>';
                        } else {
                            mdt = '';
                        }

                        tbl_banding_dokumen.row.add([
                            i + 1,
                            res['list data'][i].doc_desc + mdt,

                            '<div class="input-group input-tgl-rec-bd">' +
                            '<input type="text" class="form-control inp-claim input-sm input-tgl-rec-bd" id="input-tgl-rec-bd' + i + '" value =' + res['list data'][i].doc_rec + '></input>' +
                            '<label class="input-group-addon btn" for="date">' +
                            '<span class="fa fa-calendar open-datetimepicker"></span>' +
                            '</label></div>',

                            '<div class="input-group input-tgl-upd-bd">' +
                            '<input type="text" class="form-control inp-claim input-sm input-tgl-upd-bd" id="input-tgl-upd-bd' + i + '" value =' + res['list data'][i].doc_upd + '></input>' +
                            '<label class="input-group-addon btn" for="date">' +
                            '<span class="fa fa-calendar open-datetimepicker"></span>' +
                            '</label></div>',

                            '<input maxlength = "50" style="width: 100%;" type="text" class="form-control inp-claim input-sm input-ket-doc-bd no-special-char-insr" id="input-ket-doc-bd' + i + '" value ="'+ res['list data'][i].remaks.trim() +'">',

                            '<input type="hidden" class="form-control inp-claim" name="" id="inp-doc-id-bd' + i + '" value =' + res['list data'][i].doc_id + '>'
                            ]).draw(false);
                    }

                    // doc_min = res['list data']['doc_min'];
                    // tgl_res = res['list data']['tgl_res'];
                    // ket_doc_res = res['list data']['ket_doc_res'];
                    // errMessage = res['list data']['errMessage'];

                    // $('#inp-keterangan-doc-bd').val(ket_doc_res);
                    // $('#inp-tgl-hasil-banding-bd').val(tgl_res);

                    if (doc_status == 2) {
                        alert_info('DOCUMENT TELAH DI CONFIRM');
                        $('#btn-save-doc-bd').prop('disabled', true);
                        $('#btn-confirm-doc-bd').prop('disabled', true);
                        $('.input-tgl-rec-bd').prop('disabled', true);
                        $('.input-tgl-upd-bd').prop('disabled', true);
                        $('.input-ket-doc-bd').prop('disabled', true);
                        $('#inp-keterangan-bd-dok').prop('disabled', true);
                    }

                    $('.input-tgl-rec-bd').datetimepicker({
                        format: 'DD-MMM-YYYY',
                        allowInputToggle: true,
                        maxDate: new Date(),
                        minDate : claim_date
                    });
                    $('.input-tgl-upd-bd').datetimepicker({
                        format: 'DD-MMM-YYYY',
                        allowInputToggle: true,
                        maxDate: new Date(),
                        minDate : claim_date
                    });

                    //validasi user
                    var cabang_user = $('#inp-branch-id').val();
                    var cabang_peng = claim_no.substring(0,4);
                    if (cabang_user != cabang_peng && claim_no != '') {
                        $('.inp-claim').prop('disabled',true);
                        if(cabang_user == '0000'){
                                $('#btn-terminate-result').prop('disabled' , false);
                                $('#btn-terminate-result-bd').prop('disabled' , false);
                        }
                    }

                } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }

        },
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
    });
}

// SAVE DOC BANDING ============================================================================================

$('#btn-save-doc-bd').click(function() {
    if (check_session() === 'true') {
        var flag = 0;
        var list_data = tbl_banding_dokumen.data();
        for (var i = 0; i < list_data.length; i++) {
            var terima = new Date($('#input-tgl-rec-bd' + i).val());
            var kirim = new Date($('#input-tgl-upd-bd' + i).val());

            if (terima > kirim){
                alert_info('TANGGAL KIRIM PADA <b>'+list_data[i][1]+'</b> TIDAK BOLEH LEBIH KECIL DARI TANGGAL TERIMA!');
                flag = 1;
                break;
            }
        }
        if (flag === 0) {
            if( $('#inp-keterangan-bd-dok').val().trim() == ""){
                alert_info('KETERANGAN BANDING TIDAK BOLEH KOSONG');
            }else{
                save_doc_banding();
                get_doc_banding();
                $('#btn-confirm-doc-bd').prop('disabled', false); 
            }     
        }
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }
});

function save_doc_banding() {
    br_id_claim = branch;
    claim_no = $('#inp-no-claim').val().toUpperCase();
    var doc_rec = $('#input-tgl-rec-bd').val();
    var doc_upd = $('#input-tgl-upd-bd').val();
    //var remaks = $('#input-ket-doc-bd').val().toUpperCase();
    var doc_id = $('#inp-doc-id-bd').val();
    var bd_doc_rec;
    var bd_doc_upd;
    var listDoc = [];
    var remark;
    var list_data = tbl_banding_dokumen.data();
    var pages = tbl_banding_dokumen.page();
    tbl_banding_dokumen.page(0).draw('page');

    for (var i = 0; i < list_data.length; i++) {
        if ($('#input-tgl-rec-bd' + i).val() == null) {
            tbl_banding_dokumen.page('next').draw('page');

        }

        if ($('#input-tgl-rec-bd' + i).val() == '' || $('#input-tgl-rec-bd' + i).val() == null) {
            bd_doc_rec = null;
        } else {
            bd_doc_rec = new Date($('#input-tgl-rec-bd' + i).val()).format('yyyy-mm-dd');
        }

        if ($('#input-tgl-upd-bd' + i).val() == '' || $('#input-tgl-upd-bd' + i).val() == null) {
            bd_doc_upd = null;
        } else {
            bd_doc_upd = new Date($('#input-tgl-upd-bd' + i).val()).format('yyyy-mm-dd');
        }

        if($('#input-ket-doc-bd' + i).val().trim() == ''){
            remark = null;
        }else{
            remark = $('#input-ket-doc-bd' + i).val().toUpperCase(); 
        }


        listDoc.push({
            claim_no: $('#inp-no-claim').val().toUpperCase(),
            doc_rec: bd_doc_rec,
            doc_upd: bd_doc_upd,
            remaks: remark,
            doc_id: $('#inp-doc-id-bd' + i).val(),
            ket_banding : $('#inp-keterangan-bd-dok').val().toUpperCase()

        });
    }

    tbl_banding_dokumen.page(pages).draw('page');

    $.ajax({
        url: 'Controller_insurance_claim/savedoc',
        type: 'POST',
        dataType: 'json',
        async:false,
        data: {
            "listDoc": listDoc,
            "br_id_claim": br_id_claim,

        },
        success: function(response) {
            var res = $.parseJSON(response);;
            console.log(res);
            if (res) {
                try {

                    if (res['Status'] == 200) {
                        alert_info("DOKUMEN BERHASIL DIUPDATE !");

                    } else {
                        err = res['err'];
                        alert_error(err);
                    }

                } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
            alert_error('Tidak terhubung dengan server');
        }
    })
}


// RESULT BANDING  ============================================================================================
$('#btn-print-result-bd').click(function() {
    debugger;
    if (check_session() === 'true') {
        alert_confirm('PRINT DATA INSURANCE?', function() {
        getPrintTerm();
     });
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }
});

$('#btn-terminate-result-bd').click(function() {
    debugger;
    if (check_session() === 'true') {
        var res = $('#appeal-status-inspro').val();
        var br_code = $('#inp-branch-id').val();
        var br_id = branch;
       
        var count = 0;
        var arrayData = [];
        arrayData.push({
            con_no: cont_no,
            dtbayar: new Date().format('dd-mm-yyyy'),
            br_id: br_id
        });
        if (localStorage.getItem('role_terminate') == 'true') {
            if ( $('#inp-receive-status-inspro').val() == '1'){
                alert_info('KONTRAK SUDAH DI TERMINATE!');
                return false;
            }else if (res == '0') {
                alert_info('BANDING BELUM DIPUTUSKAN! TIDAK DAPAT MELAKUKAN TERMINATE');
                return false;
            }else if (res != 'A') {
                alert_info('HASIL BANDING KLAIM BUKAN DISETUJUI! TIDAK DAPAT MELAKUKAN TERMINATE');
                return false;
            }else{
                if ((branch != br_code) && (br_code != '0000')){
                    alert_info('TERMINATE HANYA BISA DILAKUKAN PADA CABANG ASAL');
                } else if (br_code == '0000') {
                    alert_error('UNTUK USER HO, TIDAK DAPAT MELAKUKAN PROSES TERMINATE PADA TAB BANDING!');
                    return false;
                } else if (br_code != '0000') {
                    if($('#inp-nilai-ganti-bd').val() == '' ){
                        alert_error('UNTUK USER CABANG TIDAK DAPAT MELAKUKAN TERMINATE JIKA NILAI PENGGANTIAN TIDAK TERISI');
                        return false;
                    }else if ( $('#inp-tgl-pembayaran-bd').val() == ''){
                        alert_error('TANGGAL PENGGANTIAN HARUS TERISI UNTUK MELANJUTKAN PROSES TERMINATE!');
                        return false;
                    }else {
                        getCountTerminate(arrayData);
                    }
                }
            }
        }else{
            alert_error('USER TIDAK MEMILIKI HAK AKSES MELAKUKAN TERMINATE');
        }
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }
});

$('#btn-save-result-bd').click(function() {
    if (check_session() === 'true') {
        if ($('input[name=resultBd]:checked').val() == 'null') {
            alert_info('STATUS KLAIM BELUM DI PILIH!');
        } else if ($('#inp-tgl-hasil-banding-bd').val() == '') {
            alert_info('TANGGAL HASIL BANDING BELUM TERISI!');
            $('#div-tgl-hasil-banding').addClass('has-error');
        } else if ($('#inp-keterangan-bd').val().trim() == "") {
            alert_info('KETERANGAN BANDING BELUM TERISI!');
            $('#div-ket-bd-claim').addClass('has-error');
        } else {
            alert_confirm('SIMPAN DATA BANDING KLAIM ?', function() {
                saveBandingResult();
            });
        }

    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
        });
    }

});

function saveBandingResult() {

    var szstat = $('input[name=resultBd]:checked').val();
    var res_desc = $('#inp-keterangan-bd').val().toUpperCase();
    var res_date = $('#inp-tgl-hasil-banding-bd').val();

    var arrayData = [];
    arrayData.push({
        br_id  : br_id_claim,
        szstat: szstat,
        res_desc: res_desc,
        res_date: res_date,
        claim_no: claim_no
    });
    $.ajax({
        url: "Controller_insurance_claim/saveBandingResult",
        cache: false,
        type: 'post',
        data: {
            arrayData
        },
        dataType: 'json',
        success: function(response) {
            var res = $.parseJSON(response);
            if (response) {
                try {
                    if (res['Status'] == 200) {
                        alert_info('SIMPAN DATA BANDING DENGAN NOMOR KLAIM ' + claim_no + ' SUKSES');
                        $('#appeal-status-inspro').val(szstat);
                        $('#btn-save-result-bd').prop('disabled',true);
                        $('#tab-banding-result').click();
                    } else {
                        alert_info(res['Error']);
                    }
                } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }

        },
        error: function(response) {
            alert_error(response);
        }
    });
}
// SEND TO INSURANCE CLAIM ============================================================================================

$('#btn-send-to-insurance').click(function() {
    if (check_session() === 'true') {

        if (claim_no === 'XXXXXXXXXXXXX') {
            alert_info('KLAIM HARUS DISAVE DAHULU !!');
            return false;
        } else if (claim_status == '') {
            alert_info('DETAIL KLAIM HARUS DI ISI !!');
            return false;
        } else {
            send();
        }
    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }


});

function send() {
    claim_no = $('#inp-no-claim').val().toUpperCase();
    $.ajax({
        url: "Controller_insurance_claim/getClaimByNo",
        type: 'POST',
        dataType: 'json',
        data: {
            "claim_no": claim_no,
        },
        success: function(response) {
            var res = response;
            if (response) {
                try {
                    if (res['Status'] == 200) {
                        var dataJson = JSON.stringify(res);
                        $('#id-no-claim-send').val(dataJson);
                        //$('#id_send').submit();
                        $.ajax({
                            url: "Controller_insurance_claim/send_mail",
                            cache: false,
                            type: 'post',
                            data: {
                                dataJson
                            },
                            dataType: 'json',
                            success: function(response) {
                                var res = response;

                                console.log(res);
                                if (res) {
                                    try {

                                        if (res['Status']['Status'] == 200) {
                                            claim_status = '1';
                                            sendInsr();
                                            $('#btn-send-to-insurance').prop('disabled', true);
                                            $('#btn-print-insurance').prop('disabled',false);
                                            $('#btn-cancel-insurance').prop('disabled', true);
                                        } else {
                                            err = res['Status']['Error'];
                                            alert_error(err);
                                        }

                                    } catch (e) {
                                                $('#loading-ajax').hide(); //menutup loading ajax
                                                console.log(e);
                                                alert_error("Galat" + e);
                                            }
                                        }

                                    },
                                    error: function(response) {
                                        alert_info('KLAIM SUDAH PERNAH DIKIRIM KE MASKAPAI !')
                                        console.log(response);
                                    }

                                });

                    } else if (res['Status'] == 500) {
                        alert_info(res['Error']);

                    }
                } //tutup try
                catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            } //tutup if
        }, //tutup success
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
    }); //tutup ajax
}


function sendInsr() {
    claim_no = $('#inp-no-claim').val().toUpperCase();
    var arrayData = [];
    arrayData.push({
        claim_no: claim_no,
    });

    $.ajax({
        url: "Controller_insurance_claim/sendInsr",
        cache: false,
        type: 'post',
        data: {
            arrayData
        },
        dataType: 'json',
        success: function(response) {
            var result = $.parseJSON(response);
            if (response) {
                try {
                    if (result['Status'] == 200) {
                        alert_info('SEND TO INSURANCE SUKSES');
                        claim_status = '1';
                        $('#inp-claim-status').val('1');
                        $('#btn-save-insurance').prop('disabled',true);
                        $('#btn-cancel-insurance').prop('disabled',true);
                        $('#btn-send-to-insurance').prop('disabled', true);
                        $('#btn-print-insurance').prop('disabled', false);
                        get_bycont(2);
                    } else {
                        alert_info(result['Error']);
                    }
                } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            } //tutup if
        },
        error: function(response) {
            alert_error(response);
        }
    });
}

// CLEAR ============================================================================================
$('#btn-reset-refund').click(function() {
    clearRefund();
});

function CLEAR() {
    $('#inp-tgl-pengajuan').val('');
    $('#inp-periode-asuransi').val('');
    $('#inp-jenis-asuransi').val('');
    $('#inp-perluasan-jaminan').val('');
    $('#inp-polis-induk').val('');
    $('#inp-alamat').val('');
    $('#slc-jenis-pelaporan').val('4');
    $('#slc-kontak').val('4');
    $('#inp-nama-nasabah').val('');
    $('#inp-no-polisi').val('');
    $('#inp-no-mesin').val('');
    $('#inp-no-rangka').val('');
    $('#inp-jenis-kendaraan').val('');
    $('#inp-tahun-kendaraan').val('');
    $('#slc-jenis-klaim').val('0');
    $('#slc-stnk').val('4');
    $('#slc-tanggung').val('4');
    $('#inp-tgl-meninggal').val('');
    $('#inp-ahli-waris1').val('');
    $('#inp-ahli-waris2').val('');
    $('#inp-ahli-waris3').val('');
    $('#inp-hubungan-waris1').val('');
    $('#inp-hubungan-waris2').val('');
    $('#inp-hubungan-waris3').val('');
    $('#inp-tempat-kejadian').val('');
    $('#inp-lokasi-kendaraan').val('');
    $('#inp-kronologi').val('');
    $('#slc-polisi').val('4');
    $('#inp-nama-saksi').val('');
    $('#inp-alamat-saksi').val('');
    $('#inp-pelapor-klaim').val('');
    $('#inp-no-telp').val('');
    $('#inp-tgl-kejadian').val('');
    $('#inp-claim-status').val('');
    $('#inp-ins-code').val('');
    $('#inp-ins-comm').val('');
}


function clearRefund() {
    $('#rek-no-inspro').val('');
    $('#rek-nama-inspro').val('');
    $('#bank-id-inspro').val('');
}

// CLEAR ERROR  ============================================================================================

function hapuserror() {
    $('#div-slc-jenis-pelaporan').removeClass('has-error');
    $('#div-slc-jenis-klaim').removeClass('has-error');
    $('#div-slc-stnk').removeClass('has-error');
    $('#div-slc-kontak').removeClass('has-error');
    $('#div-inp-tempat-kejadian').removeClass('has-error');
    $('#div-inp-kronologi').removeClass('has-error');
    $('#div-inp-lokasi-kendaraan').removeClass('has-error');
    $('#div-slc-tanggung').removeClass('has-error');
    $('#div-inp-tgl-meninggal').removeClass('has-error');
    $('#div-inp-ahli-waris1').removeClass('has-error');
    $('#div-inp-hubungan-waris1').removeClass('has-error');
    $('#div-slc-polisi').removeClass('has-error');
    $('#div-inp-nama-saksi').removeClass('has-error');
    $('#div-inp-alamat-saksi').removeClass('has-error');
    $('#div-inp-pelapor-klaim').removeClass('has-error');
    $('#div-inp-tgl-kejadian').removeClass('has-error');
    $('#div-inp-no-claim').removeClass('has-error');
    $('#div-inp-no-cont').removeClass('has-error');
    $('#div-inp-no-cont').removeClass('has-error');
    $('#div-slc-br-claim').removeClass('has-error');
    $('#div-rek-no-inspro').removeClass('has-error');
    $('#div-rek-nama-inspro').removeClass('has-error');
    $('#div-ket-claim').removeClass('has-error');
    $('#div-tgl-hasil-klaim').removeClass('has-error');
    $('#div-ket-bd-claim').removeClass('has-error');
    $('#div-tgl-bd-claim').removeClass('has-error');
    $('#div-tgl-kejadian').removeClass('has-error');
}


// REFUND ============================================================================================
$('#btn-refund-result').click(function() {
    if (refund_claim == 1){
        alert_info('KONTRAK ' + cont_no + ' TELAH MELAKUKAN PENGAJUAN REFUND KLAIM!');
        return false;
    }else if($('#refund-asuransi-inspro').val() == "0.00" 
        || $('#refund-asuransi-inspro').val() ==""){
        alert_info('TIDAK ADA NILAI REFUND KE NASABAH!');
        return false;
    }else{
       $('#modal-refund-insclaim').modal('show');

   }
});

$('#btn-refund-result-bd').click(function() {
    if (refund_claim == 1){
        alert_info('KONTRAK ' + cont_no + ' TELAH MELAKUKAN PENGAJUAN REFUND KLAIM!');
        return false;
    }else if($('#refund-asuransi-inspro-bd').val() == "0.00"
        || $('#refund-asuransi-inspro-bd').val() == ""){
        alert_info('TIDAK ADA NILAI REFUND KE NASABAH!');
        return false;
    }else{
        $('#modal-refund-insclaim').modal('show');
    }
});

$('#rb-Cabang').click(function() {
    $('#rek-no-inspro').prop('disabled',true);
    $('#rek-nama-inspro').prop('disabled',true);
});

$('#rb-Debetur').click(function() {
    $('#rek-no-inspro').prop('disabled',false);
    $('#rek-nama-inspro').prop('disabled',false);
});

$('#btn-reset-refund').click(function () {
    $('#rek-no-inspro').val('');
    $('#rek-nama-inspro').val('');
    $('#slc-bank-insclaim').val('');
});

$('#btn-confirm-refund').click(function () {
    if (check_session() === 'true') {

        var bank_id = $('#slc-bank-insclaim :selected').val();
        var acc_no = $('#rek-no-inspro').val();
        var acc_name = $('#rek-nama-inspro').val().toUpperCase();
        var arrayData = []; 

        if($('input[name=resultRef]:checked').val() == "cabang"){
            if ($('#slc-bank-insclaim :selected').val() == ""){
                alert_info('SILAHKAN PILIH BANK TERLEBIH DAHULU!');
                return false;
            }else{
                arrayData.push({
                    cont_no : cont_no,
                    branch :  branch,
                    acc_no : '',
                    acc_name : '',
                    bank : bank_id,
                    flag : 1
                });
                RefundClaim(arrayData);
            }

        }else if ($('input[name=resultRef]:checked').val() == "debetur"){
            if($('#rek-no-inspro').val() == ""){
                alert_info('NOMOR REKENING DEBETUR BELUM TERISI!');
                return false;

            }else if ($('#rek-nama-inspro').val() == ""){
                alert_info('NAMA REKENING DEBETUR BELUM TERISI!');
                return false;

            } if ($('#slc-bank-insclaim :selected').val() == ""){
                alert_info('SILAHKAN PILIH BANK TERLEBIH DAHULU!');
                return false;
            }else{
                arrayData.push({
                    cont_no : cont_no,
                    branch :  branch,
                    acc_no : acc_no,
                    acc_name : acc_name,
                    bank : bank_id,
                    flag : 2
                });
                RefundClaim(arrayData);
            }   
        }else {
            alert_info('SILAHKAN PILIH REKENING TUJUAN');
            return false;
        }

    }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }
});


function RefundClaim(arrayData) {
    $.ajax({
        url: "Controller_insurance_claim/RefundClaim",
        type: 'POST',
        data: {
            arrayData,
        },
        success: function(response) {
            var data = JSON.parse(response);
            console.log(response);
            if (response) {
                try {
                    if(data['Status'] == 200){
                      $('#refund-asuransi-inspro').val(data['Data']);
                      refund_claim = 1;
                      alert_info('REFUND BERHASIL DILAKUKAN!');
                  }else if (data['Status'] == 500){
                      alert_info('GAGAL REFUND TERMINATE : ' + data['Error']);
                      return false;
                  }
              } catch (e) {
                $('#loading-ajax').hide();
                console.log(e);
                alert_error("Galat" + e);
            }
        } 

    },
    error: function(response) {
        console.log(response);
        alert_error(response);
    }
});
}

$('#btn-refund-result').prop('disabled', true);
$('#btn-refund-result-bd').prop('disabled', true);
var refund_claim;
function getRefundAmt(arrayData) {
    $.ajax({
        url: "Controller_insurance_claim/getRefundAmt",
        type: 'POST',
        async:false,
        data: {
            arrayData,
        },
        success: function(response) {
            var data = JSON.parse(response);
            console.log(response);
            if (response) {
                try {
                    if(data['Status'] == 200){
                        if (data['Data'] > 0 && $('#inp-receive-status-inspro').val() == '1'){

                            $('#btn-refund-result').prop('disabled', false);
                            $('#btn-refund-result-bd').prop('disabled', false);
                        } 
                        refund_claim = data['Ref Flag'];
                        // if( refund_claim == 1 ){
                        //     $('#btn-refund-result').prop('disabled', true);
                        //     $('#btn-refund-result-bd').prop('disabled', true);
                        // }

                        if(data['Data'] < 0 ){
                            $('#refund-asuransi-inspro').val(accounting.formatMoney(0, '', 2, ',', '.'));
                        }else{
                            $('#refund-asuransi-inspro').val(accounting.formatMoney(data['Data'], '', 2, ',', '.'));
                        }

                    }else if (data['Status'] == 500){

                        $('#btn-refund-result').prop('disabled', true);
                        $('#btn-refund-result-bd').prop('disabled', true);
                }
            } catch (e) {
                $('#loading-ajax').hide();
                console.log(e);
                alert_error("Galat" + e);
            }
        } 
    },
    error: function(response) {
        console.log(response);
        alert_error(response);
    }
});
}


function getBankRef(slc_id) { 
    var branch_code = branch; 
    $.ajax({
        url: "Controller_insurance_claim/getBankId",
        type: 'POST',
        data: {
            branch_code
        },
        success: function(response) {
            var data = JSON.parse(response);
            console.log(response);
            if (response) {
                try {
                    $('<option/>').val('').html('- PILIH -').appendTo(slc_id).addClass('form-control');
                    for (var i = 0; i < data['data'].length; i++) {
                        $(slc_id).append('<option value="' + data['data'][i].bankCode + '">' + data['data'][i].bankCode + " - " + data['data'][i].bankName + '</option>');
                    }
                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Galat" + e);
                }
            } 

        },
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
    });
}


//BTN CIF BPKB
// $('#btn-cif-bpkb').prop('disabled',false)
$('#btn-cif-bpkb').on("click", function () {
    if (check_session() === 'true') {
        cont_no = $('#inp-no-cont').val();
        if (cont_no != "") {
            cifbpkb();   
            $('#inp-tgl-cont-bpkb').datetimepicker({
                format: 'DD-MMM-YYYY',
                allowInputToggle: true,
                maxDate: new Date()
            });

            $('#inp-tgl-tempo-bpkb').datetimepicker({
                format: 'DD-MMM-YYYY',
                allowInputToggle: true,
                maxDate: new Date()
            });

            $('#inp-tgl-stnk-bpkb').datetimepicker({
                format: 'DD-MMM-YYYY',
                allowInputToggle: true,
                maxDate: new Date()
            }); 
        }else{
            alert_info("SILAHKAN ISI NO. KONTRAK TERLEBIH DAHULU !");

        }
    }
    else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });

  }


});

function cifbpkb(){
    cont_no = $('#inp-no-cont').val();
    getBranch('#slc-branch-id-bpkb');
    
    $.ajax({
        url: "Controller_insurance_claim/getCifBpkb",
        type: 'POST',
        dataType: 'json',
        data: {
            "cont_no": cont_no,
        },

        success: function(response) {

        var res = response;
        console.log(res);
        if(response){
            try {

                if (res['Status'] == 500) {
                    alert_info(res['Error']);

                } else if (res['Status'] == 200) {
                    
                    $('#modal-cif-bpkb').modal('show');
                    nama = res['Data']['nama'];
                    alamat = res['Data']['alamat_det'];
                    tgl_kontrak = res['Data']['tgl_kontrak'];
                    os_ballance = res['Data']['os_ballance'];
                    dealer_id = res['Data']['dealer_id'];
                    dealer_nama = res['Data']['dealer_nama'];
                    branch_id = res['Data']['branch_id'];
                    branch_nama = res['Data']['branch_nama'];
                    suppl_id = res['Data']['suppl_id'];
                    suppl_nama = res['Data']['suppl_nama'];
                    tgl_tempo = res['Data']['tgl_tempo'];
                    obj_code = res['Data']['obj_code'];
                    obj_desc = res['Data']['obj_desc'];
                    loc_cola_id = res['Data']['loc_cola_id'];
                    loc_cola_desc = res['Data']['loc_cola_desc'];
                    loc_cola_det = res['Data']['loc_cola_det'];
                    saldo_denda = res['Data']['saldo_denda'];
                    merk_obj_id = res['Data']['merk_obj_id'];
                    merk_obj_nama = res['Data']['merk_obj_nama'];
                    type_id = res['Data']['type_id'];
                    type_nama = res['Data']['type_nama'];
                    obj_model_code = res['Data']['obj_model_code']; //model_obj_id = res['Data']['model_obj_id'];
                    model_obj_nama = res['Data']['model_obj_nama'];
                    tahun_buat = res['Data']['tahun_buat'];
                    warna = res['Data']['warna'];
                    cc = res['Data']['cc'];
                    tgl_stnk = res['Data']['tgl_stnk'];
                    no_polis = res['Data']['no_polis'];
                    no_ord = res['Data']['no_ord'];
                    tgl_ord = res['Data']['tgl_ord'];
                    no_rangka = res['Data']['no_rangka'];
                    no_mesin = res['Data']['no_mesin'];
                    no_plat = res['Data']['no_plat'];
                    no_bpkb = res['Data']['no_bpkb'];
                    no_reg_bpkb = res['Data']['no_reg_bpkb'];
                    nama_bpkb = res['Data']['nama_bpkb'];
                    bank_id = res['Data']['bank_id'];
                    bank_nama = res['Data']['bank_nama'];
                    status_bpkb = res['Data']['status_bpkb'];
                    status_bpkb_desc = res['Data']['status_bpkb_desc'];
                    status_kontrak = res['Data']['status_kontrak'];
                    status_kontrak_desc = res['Data']['status_kontrak_desc'];
                    total = res['Data']['total'];

                    $('#inp-name-bpkb').val(nama);
                    $('#inp-alamat-bpkb').val(alamat);
                    $('#inp-tgl-cont-bpkb').val(tgl_kontrak);
                    $('#inp-os-balance-bpkb').val("Rp "+accounting.formatMoney(os_ballance, '', 2, '.', ','));
                    // $('#inp-total-tanggung').val(accounting.formatMoney(total, '', 2, ',', '.'));

                    $('#inp-kode-dlc-bpkb').val(suppl_id+" - "+suppl_nama);
                    if (branch_id !== null) {
                        $('#slc-branch-id-bpkb').val(branch_id);
                    }
                    // $('#inp-id-supl-bpkb-id').val(suppl_id);
                    $('#inp-id-supl-bpkb').val(suppl_id+" - "+suppl_nama);
                    $('#inp-tgl-tempo-bpkb').val(tgl_tempo);
                    // $('#inp-type-obj-bpkb-id').val(obj_code);
                    $('#inp-type-obj-bpkb').val(obj_code+" - "+obj_desc);
                          
                    if (status_bpkb == 'OH') {
                        $('#inp-lokasi-bpkb').val('BRAN');
                        $('#inp-nama-lokasi-bpkb').val('CABANG');
                        get_branch_bpkb(loc_cola_id);
                    } else {
                        $('#inp-nama-lokasi-bpkb').val(loc_cola_desc);  
                        $('#inp-lokasi-bpkb').val(loc_cola_id);  
                    }

                    if (loc_cola_id == 'MUFN') {
                        $('#inp-det-lok-bpkb').val('PLAZA THB');
                    }

                    //$('#inp-det-lok-bpkb').val(loc_cola_det);
                    $('#inp-saldo-denda-bpkb').val("Rp "+accounting.formatMoney(saldo_denda, '', 2, '.', ','));
                    // $('#inp-brand-bpkb-id').val(merk_obj_id);
                    $('#inp-brand-bpkb').val(merk_obj_id+" - "+merk_obj_nama);
                    // $('#inp-type-bpkb-id').val(type_id);
                    $('#inp-type-bpkb').val(type_id+" - "+type_nama);
                    // $('#inp-model-bpkb-id').val(obj_model_code);//model_obj_id
                    $('#inp-model-bpkb').val(obj_model_code+" - "+model_obj_nama);
                    $('#inp-tahun-buat-bpkb').val(tahun_buat);
                    $('#inp-warna-bpkb').val(warna);
                    $('#inp-cc-bpkb').val(cc);
                    $('#inp-tgl-stnk-bpkb').val(tgl_stnk);
                    $('#inp-no-ins-bpkb').val(no_polis);
                    $('#inp-no-order-bpkb').val(no_ord);
                    $('#inp-tgl-order-bpkb').val(tgl_ord);
                    
                    $('#inp-no-rangka-bpkb').val(no_rangka);
                    $('#inp-no-mesin-bpkb').val(no_mesin);
                    $('#inp-no-polisi-bpkb').val(no_plat);
                    $('#inp-no-bpkb').val(no_bpkb);
                    $('#inp-no-reg-bpkb').val(no_reg_bpkb);
                    $('#inp-nama-pada-bpkb').val(nama_bpkb);
                    // $('#inp-bank-id').val(bank_id);
                    $('#inp-bank-bpkb').val(bank_id+" - "+bank_nama);
                    // $('#inp-stasus-bpkb-id').val(status_bpkb);
                    if (status_bpkb_desc != null) {
                        $('#inp-status-bpkb').val(status_bpkb+" - "+status_bpkb_desc);
                    }
                    // $('#inp-stat-cont-bpkb-id').val(status_kontrak);
                    $('#inp-stat-cont-bpkb').val(status_kontrak+" - "+status_kontrak_desc);
                    $('.inp-bpkb').prop('disabled',true);

                }

            } catch (e) {
                $('#loading-ajax').hide(); //menutup loading ajax
                console.log(e);
                alert_error("Galat" + e);
            }
        }
        },
        error: function(response) {
            console.log(response);
            alert_error(response);
        }

    });
}

function getBranch(slc_id){
    var data = '';
    $.ajax({
      url : base_url+"Controller_insurance_claim/getBranch",
      type : 'POST',
      async : false,
      dataType : 'json',
      data: {
        "data": data
    },
    success : function(response){
    if(response){
        try{
            console.log(response);
            $('<option/>').val('').html('- PILIH CABANG -').appendTo(slc_id).addClass('form-control');
            response = JSON.parse(response);
            $.each(response['data'], function(list){
              $(slc_id).append('<option value="'+ this['branch_code']+'">'+this['branch_code']+" - "+this['branch_desc']+'</option>');
            });
            console.log(localStorage.getItem("branch_id"));
            $(slc_id).val(localStorage.getItem("branch_id"));
        } catch(e) {
            $('#loading-ajax').hide();
            console.log(e);
            alert_error("Galat" + e);
        }
    }
    },
    error: function(response){
        alert_error(response);
        console.log(response);
    }
});
};

// ROLE CHECK ============================================================================================

function getRoleAdh(){
    debugger;
    $.ajax({
        url : base_url + "Controller_home/get_detail_user",
        cache : false,
        async :false,
        success : function(response){
        if(response){
            try{
                console.log(response);
                var role_data = $.parseJSON(response);
                var flagrole = true;
                $.each(role_data, function(i){
                    if (role_data[i].role_code  === 'TERMINATE_INSR') { //added
                        localStorage.setItem('role_terminate', true);
                        flagrole = false;
                    }else if(flagrole){
                        localStorage.setItem('role_terminate', false);
                    }
                });
            }catch(e) {
                $('#loading-ajax').hide(); 
                console.log(e);
                alert_error("Galat" + e);
            }
        }
        },
        error: function(response){
            console.log(response);
            alert_error(response);
        }
    });
}


function get_branch_bpkb(br_id) {

    $.ajax({
        url: "Controller_insurance_claim/getBranchBPKB",
        type: 'POST',
        dataType: 'json',
        data: {
            "loc_cola_desc": br_id,
        },

        success: function(response) {
            var res = response;
            console.log(res);
            if (response){
                nm_cab = res['Data']['branch_bpkb'];
                try {
                    if (nm_cab == null) {
                        $('#inp-det-lok-bpkb').val('-');

                    } else {
                        $('#inp-det-lok-bpkb').val(nm_cab);
                    }
                } catch (e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            }
        },

        error: function(response) {
            alert_error(response);
        }
    });
};