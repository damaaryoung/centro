//--------------------------------------------Prosess Baru-----------------------------------------------\\
//Deklarasi Variable
var branch_code_teller_rvt = $('#hdn-teller-branch-code').val();
var contract_id_rvt = '';
var contract_no_rvt = '';
var branchcode_rvt = '';
var terimadari_rvt = '';
var alamat_rvt = '';
var totpenalty_rvt = '';
var deposit_rvt = '';
var no_dokumen_rvt = '';
var kel_id_rvt = '';
var kel_name_rvt = '';
var kec_name_rvt = '';
var kab_name_rvt = '';
var prov_name_rvt = '';
var kode_pos_rvt = '';
var contract_idtab_rvt = '';
var contract_notab_rvt = '';
var class_codetab_rvt = '';
var class_code_desctab_rvt = '';
var instl_notab_rvt = '';
var notetab_rvt = '';
var amount_due_datetab_rvt = '';
var amount_paidtab_rvt = '';
var fin_typetab_rvt = '';
var pilih_detail_rvt = '';
var pil_class_code_rvt = '';
var amt_classcode_tambah_rvt = '';
var job_rvt = '';
var radio_value_rvt = '';
var radio_button_rvt = '';
var rvgetnew_rvt = '';
var payment_type_id_rvt = '';
var payment_type_desc_rvt = '';
var collector_id_rvt = '';
var collector_desc_rvt = '';
var collector_code_rvt = '';
var bank_id_teller_rvt = '';
var bank_desc_teller_rvt = '';
var receive_id_rvt = 0;
var receive_no_rvt = '';
var hitung_length_rvt = '';
var aksi_delete_rvt = '';
var branchname_rvt = '';
var inst_type_rvt = '';
var tenor_rvt = '';
var val_online_rvt = '';
var bank_id_rvt = '';
var collector_rvt = '';
var receive_status_rvt = '';
var instno_rvt;
var angsuran_rvt;
var tambah_decline = '';
var total_amt_teller_entry = parseInt($('#id-total-amount-tellerEntry').val());
var validasi_propPeriod = '';
var amount_propPeriod = 0;
var min_declineN = '';
var amt_due_decN = 0;
var status_contract_rvt = '';
var receive_amt_rvt = '';
var search_by = '';
//End Deklarasi Variable

//-------------------------------First Loading--------------------\\
//Data Table
var table_data_tlr_entry = $('#table-data-teller-entry').DataTable({
    "columnDefs": [{
        "width": "5%",
        "targets": 0,
        "visible": false
    }, {
        "width": "14%",
        "targets": 1
    }, {
        "width": "10%",
        "targets": 2
    }, {
        "width": "11%",
        "targets": 3
    }, {
        "width": "25%",
        "targets": 4
    }, {
        "width": "20%",
        "targets": 5
    }, {
        "width": "15%",
        "targets": 6
    }, {
        "width": "15%",
        "targets": 7
    }, {
        "width": "20%",
        "targets": 8
    }],
    "scrollY": "200px",
    "scrollCollapse": true,
    "paging": false
});
//End Data Table

if ($('#panel-teller-entry').length) {
    // console.log('awal');
    //getDataAwal();
    ($('#id-paymentType-teller-entry').val('01'));
    ($('#desc-paymentType-teller-entry').val('KASIR'));
    ($('#id-collId-teller-entry').val('0000'));
    ($('#id-CollName-teller-entry').val('KASIR'));
    ($('#desc-bank-teller-entry').val('MUF ANGSURAN'));
    ($('#id-bank-teller-entry').val('001'));
    $('#btn-tambah-classcode-teller').prop('disabled', true);
    $('#btn-cancelRv-teller-entry').prop('disabled', true);
    $('#btn-print-teller-entry').prop('disabled', true);
    $('#btn-update-teller-entry').prop('disabled', true);
}

$('#id-RvDate-teller-entry').val(new Date().format('dd-mmm-yyyy'));
$('#id-CollDate-teller-entry').val(new Date().format('dd-mmm-yyyy'));
//-------------------------End First Loading--------------------------------\\

//Radio Button Kontrak atau Receive
radio_value_rvt = "kontrak";
console.log(radio_value_rvt);
$('input[type=radio][name=radioTeller]').change(function () {
    if (this.value == 'kontrak') {
        radio_value_rvt = this.value;
        // console.log(radio_value_rvt);
        $('#id-rvNo-teller-entry').prop('disabled', true);
        $('#id-rvNo-teller-entry').val('');
        $('#id-noKontrak-teller-entry').prop('disabled', false);
    } else if (this.value == 'receive') {
        $('#id-rvNo-teller-entry').prop('disabled', false);
        $('#id-noKontrak-teller-entry').prop('disabled', true);
        $('#id-noKontrak-teller-entry').val('');
        radio_value_rvt = this.value;
        // console.log(radio_value_rvt);
    }
});
//End Radio Button Kontrak atau Receive

//--------------------------Deklarasi Datatable--------------------\\
var table_payment_type = $('#tbl-payment-teller').DataTable({
    responsive: true
});
var table_customer_no = $('#tbl-cust-teller').DataTable({
    responsive: true
});
var tbl_coll_teller = $('#tbl-coll-teller').DataTable({
    responsive: true
});
var tbl_bank_teller = $('#tbl-bank-teller').DataTable({
    responsive: true
});
var tbl_class_code_teller = $('#tbl-class-code-teller').DataTable({
    responsive: true
});
//--------------------------End Deklarasi Datatable--------------------\\

//---------------- Function Modal------------------------\\
//Modal Class Code
function modal_class_code_et_js() {
    $('.modal-backdrop').css('display', 'none');
    $('#modal-class-code').modal('show');
}
//End Modal Class Code

//Modal Payment Type
function modal_payment_type_et_js() {
    $('.modal-backdrop').css('display', 'none');
    $('#modal-payment-teller').modal('show');
}
//End Modal Payment Type

//Modal Collector Id
function modal_collectorid_et_js() {
    $('.modal-backdrop').css('display', 'none');
    $('#modal-coll-teller').modal('show');
}
//Modal Collector Id

//Modal Bank
function modal_bank_et_js() {
    $('.modal-backdrop').css('display', 'none');
    $('#modal-bank-teller').modal('show');
}
//End Modal Bank
//----------------End Function Modal------------------------\\

//-----------------------Button Click-----------------------\\
//Button Tambah Class COde
$('#btn-tambah-classcode-teller').click(function () {
    if (check_session() === 'true') {
        getclass_code_et_js();
        modal_class_code_et_js();
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function () {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//End Button Tambah Class COde

//Button Payment Type
$('#btn-search-paymentType').click(function () {
    if (check_session() === 'true') {
        getPaymentType();
        modal_payment_type_et_js();
        $('#btn-search-collId').prop('disabled', false);
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function () {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//End Button Payment Type

//Button Collector Id
$('#btn-search-collId').click(function () {
    if (check_session() === 'true') {
        if (val_online_rvt == '') { //val_online_rvt == '' //branch_code_teller_rvt === branchcode_rvt
            getColl();
            modal_collectorid_et_js();
        } else {
            if ($('#id-paymentType-teller-entry').val() != "02") {
                $('#btn-search-collId').prop('disabled', true);
            } else {
                getColl();
                modal_collectorid_et_js();
            }
        }
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function () {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//End Button Collector Id

//Button Bank
$('#btn-search-bank').click(function () {
    if (check_session() === 'true') {
        getBank();
        modal_bank_et_js();
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function () {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
// End Button Bank

//Button Clear
$('#btn-clear-teller-entry').click(function () {
    $('html, body').animate({ scrollBottom: 600 }, 'slow');
    location.reload();
    // get_format_tanggal();
});
//End Button Clear

//Button Search
$('#filter-teller-entry').click(function() {
    if (check_session() === 'true') {
        var kontrak = $('#id-noKontrak-teller-entry').val();
        var rv = $('#id-rvNo-teller-entry').val();
        console.log(radio_value_rvt);
        if (rv == '' && kontrak != '' && radio_value_rvt == 'kontrak'){
            search_by = '1';
            findbykontraknew_et_js();
            if (val_online_rvt != null) {
                $('#btn-tambah-classcode-teller').prop('disabled', false);
                // $('#btn-cancelRv-teller-entry').prop('disabled', true);
                $('#btn-print-teller-entry').prop('disabled', true);
                $('#btn-update-teller-entry').prop('disabled', false);
            } else {
                $('#btn-tambah-classcode-teller').prop('disabled', false);
                // $('#btn-cancelRv-teller-entry').prop('disabled', true);
                $('#btn-print-teller-entry').prop('disabled', true);
                $('#btn-update-teller-entry').prop('disabled', false);
            }
        } else if (rv != '' && kontrak == '' && radio_value_rvt == 'receive') {
            search_by = '2';
            findbyreceivenew_et_js();
            // $('#btn-tambah-classcode-teller').prop('disabled', true);
            // $('#btn-print-teller-entry').prop('disabled', false);
            // $('#btn-cancelRv-teller-entry').prop('disabled', false);
        } else if (rv != '' && kontrak != '' && radio_value_rvt == 'receive') {
            search_by = '2';
            findbyreceivenew_et_js();
        } else {
            alert_info('Masukan No Kontrak atau No Receive Terlebih Dahulu');
        }
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

$("#id-noKontrak-teller-entry, #id-rvNo-teller-entry").keypress(function (e) {
    var key = e.which;
    if (key == 13)  // the enter key code
    {
        $('#filter-teller-entry').click();
        return false;
    }
});
//End Button Search

//Button Confirm
$('#btn-update-teller-entry').click(function(){
    if (check_session() === 'true') {
        validasi_confirm();
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//End Button Confirm

//Button Cancel
$('#btn-cancelRv-teller-entry').click(function () {
    if (check_session() === 'true') {
        alert_confirm('Apakah Anda Yakin Untuk Cancel Data Ini ?', function (index) {
            cancel_receive_et_js();
        });
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function () {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//End Button Cancel

//Button Print
$('#btn-print-teller-entry').click(function () {
    if (check_session() === 'true') {
        // debugger;
        alert_confirm('Please Ready to Print...?', function (index) {
            //print_receive_txt_js();
            //print_teller_js_pdf();
            //print_teller_jesper();
            //get_print_rvt();
            get_print_rvt2();
        });
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function () {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
})
//End Button Print
//-----------------------End Button Click-----------------------\\


//---------------------------------Function-------------------------------------------\\

//START validasi button confirm CR November 2019
function validasi_confirm(){
        
        var total_payee_ = accounting.unformat($('#id-total-paye-tellerEntry').val());
        var total_amt_ = accounting.unformat($('#id-total-amount-tellerEntry').val());
        var contract_no_ = $('#id-noKontrak-teller-entry').val();
        
        //search by -> 1.kontrak, 2.RV

        if(search_by == '1'){
            if (total_payee_ != '' && total_payee_ != 0) {
                // console.log(accounting.unformat(total_payee_));
                if (accounting.unformat(total_payee_) < accounting.unformat(total_amt_)) {
                    alert_info('Mohon Maaf, Jumlah Total Payee yang Anda Masukan Lebih Kecil Dari Total Yang Harus Dibayarkan!');
                } else {
                    alert_confirm('Apakah Anda Yakin Akan Menyimpan Data ?', function(index) {
                        confirm_receive_et_js();
                    });
                }
            }         
            else {
                alert_confirm('Apakah Anda Yakin Akan Menyimpan Data ?', function(index) {
                    confirm_receive_et_js();
                });
            }
        }

        else if(search_by == '2'){ 

            if(class_codetab_rvt == 'T-P.BIC'){
                if(status_contract_rvt == '00'){ var status_validation = 'Aktif';}
                else if(status_contract_rvt == '01'){ var status_validation = 'Lunas Normal';}
                else if(status_contract_rvt == '02'){ var status_validation = 'Reposses';}
                else if(status_contract_rvt == '03'){ var status_validation = 'Preterminate';}
                else if(status_contract_rvt == '04'){ var status_validation = 'Klaim Asuransi';}
                else if(status_contract_rvt == '05'){ var status_validation = 'IBAM';}
                else if(status_contract_rvt == '07'){ var status_validation = 'Pembatalan Kontrak';}    
                else if(status_contract_rvt == '09'){ var status_validation = 'Pembatalan PPD';}
                else if(status_contract_rvt == '10'){ var status_validation = 'WO';}
                else {var status_validation = '';}
                
                //total_amt itu total
                //console.log('sisa kewajiban : ' + amount_due_datetab_rvt);
                //console.log('receive amount : ' + amount_paidtab_rvt);
                if(amount_due_datetab_rvt <= 0){
                    alert_info('Nilai sisa kewajiban harus lebih besar 0');
                }
                else if(status_contract_rvt != '08' && status_contract_rvt != 'WO-SOLD'){
                    alert_info('Unit untuk kontrak ' + contract_no_ + ' belum terjual');
                    console.log(status_contract_rvt);
                }
                //validasi receive amount harus lebih besar dari 0
                else if(amount_paidtab_rvt <= '0'){
                    alert_info('Receive Amount harus lebih besar dari 0');
                }
                else if(amount_paidtab_rvt > amount_due_datetab_rvt ){
                    alert_info('Receive amount tidak boleh lebih besar dari ' + amount_due_datetab_rvt);
                }
                else if(status_contract_rvt != '08' && status_contract_rvt != 'WO-SOLD'){
                    alert_info('No Kontrak ' + contract_no_  + ' status nya masih ' + status_validation);
                }
                else if (total_payee_ != '' && total_payee_ != 0) {
                    // console.log(accounting.unformat(total_payee_));
                    if (accounting.unformat(total_payee_) < accounting.unformat(total_amt_)) {
                        alert_info('Mohon Maaf, Jumlah Total Payee yang Anda Masukan Lebih Kecil Dari Total Yang Harus Dibayarkan!');
                    } else {
                        alert_confirm('Apakah Anda Yakin Akan Menyimpan Data ?', function(index) {
                            confirm_receive_et_js();
                        });
                    }
                }         
                else {
                    alert_confirm('Apakah Anda Yakin Akan Menyimpan Data ?', function(index) {
                        confirm_receive_et_js();
                    });
                }
            }
            else{
                if (total_payee_ != '' && total_payee_ != 0) {
                    // console.log(accounting.unformat(total_payee_));
                    if (accounting.unformat(total_payee_) < accounting.unformat(total_amt_)) {
                        alert_info('Mohon Maaf, Jumlah Total Payee yang Anda Masukan Lebih Kecil Dari Total Yang Harus Dibayarkan!');
                    } else {
                        alert_confirm('Apakah Anda Yakin Akan Menyimpan Data ?', function(index) {
                            confirm_receive_et_js();
                        });
                    }
                }         
                else {
                    alert_confirm('Apakah Anda Yakin Akan Menyimpan Data ?', function(index) {
                        confirm_receive_et_js();
                    });
                }
            }
            
        }
        search_by = '';

}
// END CHANGE REQUEST

//Alert Metode payment
function alert_metode(message, callback) {
    $('#modal-alert').modal('show');
    $('#modal-alert-title').html('Konfirmasi');
    $('#btn-yes').show();
    $('#btn-yes').prop('disabled', false);
    $('#btn-no').html('Tidak');
    $('#modal-alert-message').html(message);
    $('#modal-alert-icon').removeClass('fa-info-circle').removeClass('fa-exclamation-triangle').removeClass('fa-times-circle').addClass('fa-question-circle');
    $('.fa-question-circle').css('color', '#3c763d');
    $('#btn-yes').trigger('focus');
    $('#btn-yes').off('click').on('click', function () {
        $('#modal-alert').modal('hide');
        if (typeof callback === 'function') {
            callback();
        }
    });
    $('#btn-no').off('click').on('click', function () {
        $('#modal-alert').modal('hide');
        $('html, body').animate({ scrollBottom: 600 }, 'slow');
        location.reload();
    });
}
//End Alert Metode Payment

//Function Reset Data tidak digunakan
function reset_data() {
    // $('.res-global').val('');
    //getDataAwal();
    ($('#id-paymentType-teller-entry').val('01'));
    ($('#desc-paymentType-teller-entry').val('KASIR'));
    ($('#id-collId-teller-entry').val('0000'));
    ($('#id-CollName-teller-entry').val('KASIR'));
    ($('#desc-bank-teller-entry').val('MUF ANGSURAN'));
    ($('#id-bank-teller-entry').val('001'));
    $('#id-RvDate-teller-entry').val(new Date().format('dd-mmm-yyyy'));
    $('#id-CollDate-teller-entry').val(new Date().format('dd-mmm-yyyy'));
    table_data_tlr_entry.clear().draw();
    $('html, body').animate({ scrollBottom: 600 }, 'slow');
    location.reload();
}
//End Function Reset Data

//Function Loading Awal
function getDataAwal() {
    // console.log(branch_code_teller_rvt);
    $.ajax({
        url: base_url + "Controller_teler_entry/getDataAwal",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_code": branch_code_teller_rvt
        },
        cache: false,
        success: function (response) {
            // console.log(response);
            if (response) {
                try {
                    var datawal = response['Data'];
                    console.log(datawal.length);
                    if (datawal.length == 0) {
                        alert_info('Terjadi Kesalahan Saat pengambilan Data Awal, Silahkan Cek Service Paramater', function (index) {
                            localStorage.clear();
                            window.location.href = base_url + "Controller_login/login_view";
                        });
                    } else {
                        $('#id-collId-teller-entry').val(response['Data'][0]['emplNpk']);
                        $('#id-CollName-teller-entry').val(response['Data'][0]['emplName']);
                        $('#id-bank-teller-entry').val(response['Data'][1]['bankCode']);
                        $('#desc-bank-teller-entry').val(response['Data'][1]['bankName']);
                        $('#id-paymentType-teller-entry').val(response['Data'][2]['pay_methode_code']);
                        $('#desc-paymentType-teller-entry').val(response['Data'][2]['pay_methode_desc']);
                    }
                } catch (e) {
                    console.log(e);
                    $('#loading-ajax').hide(); //menutup loading ajax
                    alert_error("Terjadi kesalahan error{getDataAwal} => " + e);
                }
            }
        },
        error: function (response) {
            console.log(response);
            alert('Tidak terhubung dengan server');//Ganti dengan Responsenya
        }
    });
}
//End Function Loading Awal

//function untuk mencari data berdasarkan kontrak
function findbykontraknew_et_js() {
    var no_kontrak = $('#id-noKontrak-teller-entry').val();
    // console.log(no_kontrak);
    var coll_date = $('#id-CollDate-teller-entry').val();
    // console.log(coll_date);
    collector_id_rvt = $('#id-collId-teller-entry').val();
    var job_code = '';
    if (collector_id_rvt === '0000') {
        job_code = 'KSR';
    } else {
        var job_code = $('#id-collJob-teller-entry').val();
    }
    n = table_data_tlr_entry.data().length;
    // 26 - Agustus - 2019 Mengambil nik dari modal profile login by Icang
    var user_ksr = $('#nik-login').html();
    console.log(user_ksr);
    $.ajax({
        url: base_url + "Controller_teler_entry/findbykontraknew_et",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id": branch_code_teller_rvt,
            "contract_no": no_kontrak,
            "collect_date": coll_date,
            "collector_id": collector_id_rvt,
            "job_code": job_code,
            "user": user_ksr
        },

        // async :false,
        success: function (response) {
            console.log(response);
            // console.log(response['find_by_kontrak']['status']);
            if (response) {
                try {
                    if (response['find_by_kontrak']['status'] === false) {
                        alert_info(response['find_by_kontrak']['data'], function (index) {
                            reset_data();
                        });
                    } else {
                        // console.log(response['find_by_kontrak']['data']);
                        branchcode_rvt = response['find_by_kontrak']['data']['branch_id'];
                        var kelid = response['find_by_kontrak']['data']['kel_id'];
                        if (branch_code_teller_rvt === branchcode_rvt) {
                            // console.log(response['find_by_kontrak']['listAlamat']);
                            $.each(response['find_by_kontrak']['listAlamat'], function (index) {
                                kel_id_rvt = response['find_by_kontrak']['listAlamat']['kel_id'];
                                kel_name_rvt = response['find_by_kontrak']['listAlamat']['kel_name'];
                                kec_name_rvt = response['find_by_kontrak']['listAlamat']['kec_name'];
                                kab_name_rvt = response['find_by_kontrak']['listAlamat']['kab_name'];
                                prov_name_rvt = response['find_by_kontrak']['listAlamat']['prov_name'];
                                kode_pos_rvt = response['find_by_kontrak']['listAlamat']['zip_code'];
                                if (kel_id_rvt === null) {
                                    alert_info("Alamat Customer Tidak Ditemukan, Silahkan Cek Paramater Kelurahan Dengan ID : " + kelid, function (index) {
                                        reset_data();
                                    });
                                }
                            });
                            // console.log(response['find_by_kontrak']['listBranch']);
                            $.each(response['find_by_kontrak']['listBranch'], function (index) {
                                branchname_rvt = this['branch_desc'];
                            });
                            contract_id_rvt = response['find_by_kontrak']['data']['contractId'];
                            terimadari_rvt = response['find_by_kontrak']['data']['customerName'];
                            alamat_rvt = response['find_by_kontrak']['data']['alamtKtp'];
                            totpenalty_rvt = response['find_by_kontrak']['data']['totalPenalty'];
                            deposit_rvt = response['find_by_kontrak']['data']['depositAmount'];
                            no_dokumen_rvt = response['find_by_kontrak']['data']['depositAmount'];
                            $('#id-cabang-teller-entry').val(branchcode_rvt + ' - ' + branchname_rvt);
                            $('#id-ReceiveFrom-teller-entry').val(terimadari_rvt);
                            $('#id-Deposit-teller-entry').val(accounting.formatMoney(deposit_rvt, '', 2, ',', '.'));
                            $('#alamat-teller-entry').val(alamat_rvt + ', ' + kel_name_rvt + ', ' + kec_name_rvt + ', ' + kab_name_rvt + ', ' + prov_name_rvt + ', ' + kode_pos_rvt);
                            $('#id-total-penalty-tellerEntry').val(accounting.formatMoney(totpenalty_rvt, '', 2, ',', '.'));
                            var payment_methode = response['find_by_kontrak']['data']['payment_methode'];
                            inst_type_rvt = response['find_by_kontrak']['data']['inst_type'];
                            angsuran_rvt = response['find_by_kontrak']['data']['angsuran'];
                            table_data_tlr_entry.clear().draw();
                            // console.log(response['find_by_kontrak']['listBiayaError']);
                            if (response['find_by_kontrak']['listBiayaError'] === false) {
                                alert_error(response['find_by_kontrak']['listBiaya']);
                                $('#btn-tambah-classcode-teller').prop('disabled', true);
                                $('#btn-update-teller-entry').prop('disabled', true);
                            } else {
                                if (payment_methode == "04") {
                                    alert_metode('Tipe pembayaran Dari Kontrak Yang Bersangkutan Adalah AUTODEBET, Apakah Anda Yakin Akan Melakukan Pembayaran Secara Kasir ?', function (index) {
                                        $.each(response['find_by_kontrak']['listBiaya'], function (index) {
                                            contract_idtab_rvt = this['cont_id'];
                                            contract_notab_rvt = this['contract_no'];
                                            class_codetab_rvt = this['class_code'];
                                            instl_notab_rvt = this['instl_no'];
                                            class_code_desctab_rvt = this['class_code_desc'];
                                            notetab_rvt = this['note'];
                                            amount_due_datetab_rvt = this['amount_due_date'];
                                            if (class_codetab_rvt == 'T-DENDA') {
                                                amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(amount_paidtab_rvt, '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" maxlength="13">';
                                                // console.log(amount_paidtab_rvt);
                                            } else if (class_codetab_rvt == 'T-ANGS') {
                                                // console.log(inst_type_rvt);
                                                if (inst_type_rvt == '03') {
                                                    amt_due_decN = this['amount_due_date'];
                                                    //cek prop period untuk minimum paid amt
                                                    valPropPeriod(contract_notab_rvt, instl_notab_rvt, branchcode_rvt);
                                                    amount_propPeriod = this['amount_paid'];
                                                    amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" maxlength="13" oninput="cekPaidDecN(amt_due_decN)">';
                                                } else {
                                                    amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" disabled>';
                                                }
                                            } else {
                                                amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" disabled>';
                                            }
                                            // amount_paidtab_rvt = this['amount_paid'];
                                            fin_typetab_rvt = this['fin_type'];
                                            var fin_typedesctab
                                            if (fin_typetab_rvt === '1') {
                                                fin_typedesctab = 'KONVENSIONAL';
                                            }
                                            else {
                                                fin_typedesctab = 'SYARIAH';
                                            }
                                            var aksi = "<a class='btn btn-transparent btn-xs tooltips btn-delete-teller-entry' data-placement='top' data-toggle='tooltip' data-original-title='Remove'><i class='fa fa-times fa fa-white'></i></a>";
                                            table_data_tlr_entry.row.add([
                                                n,
                                                contract_notab_rvt,
                                                class_codetab_rvt,
                                                instl_notab_rvt,
                                                class_code_desctab_rvt,
                                                notetab_rvt,
                                                accounting.formatMoney(amount_due_datetab_rvt, '', 2, ',', '.'),
                                                amount_paidtab_rvt,
                                                fin_typedesctab,
                                                aksi,
                                                contract_idtab_rvt,
                                                n
                                            ]).draw(false);
                                            n++;
                                        });
                                        var detail_table = table_data_tlr_entry.data();
                                        // console.log(detail_table);
                                        total_amt_teller_entry = 0;
                                        for (var i = 0; i < detail_table.length; i++) {
                                            // console.log($('.id-amount-paid-tambah-teller'+detail_table[i][11]).val());
                                            var amtet = accounting.unformat($('#id-amount-paid-tambah-teller' + detail_table[i][11]).val());
                                            // console.log(amtet);
                                            total_amt_teller_entry += parseFloat(amtet);
                                            // console.log(total_amt_teller_entry);
                                            $('#id-total-amount-tellerEntry').val(accounting.formatMoney(total_amt_teller_entry, '', 2, ',', '.'));
                                        }
                                    });
                                } else {
                                    $.each(response['find_by_kontrak']['listBiaya'], function (index) {
                                        contract_idtab_rvt = this['cont_id'];
                                        contract_notab_rvt = this['contract_no'];
                                        class_codetab_rvt = this['class_code'];
                                        instl_notab_rvt = this['instl_no'];
                                        class_code_desctab_rvt = this['class_code_desc'];
                                        notetab_rvt = this['note'];
                                        amount_due_datetab_rvt = this['amount_due_date'];
                                        if (class_codetab_rvt == 'T-DENDA') {
                                            amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" maxlength="13">';
                                        } else if (class_codetab_rvt == 'T-ANGS') {
                                            // console.log(inst_type_rvt);
                                            if (inst_type_rvt == '03') {
                                                amt_due_decN = this['amount_due_date'];
                                                //cek prop period untuk minimum paid amt
                                                valPropPeriod(contract_notab_rvt, instl_notab_rvt, branchcode_rvt);
                                                amount_propPeriod = this['amount_paid'];
                                                amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" maxlength="13" oninput="cekPaidDecN(amt_due_decN)">';
                                            } else {
                                                amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" disabled>';
                                            }
                                        } else {
                                            amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" disabled>';
                                        }
                                        // amount_paidtab_rvt = this['amount_paid'];
                                        fin_typetab_rvt = this['fin_type'];
                                        var fin_typedesctab
                                        if (fin_typetab_rvt === '1') {
                                            fin_typedesctab = 'KONVENSIONAL';
                                        }
                                        else {
                                            fin_typedesctab = 'SYARIAH';
                                        }
                                        var aksi = "<a class='btn btn-transparent btn-xs tooltips btn-delete-teller-entry' data-placement='top' data-toggle='tooltip' data-original-title='Remove'><i class='fa fa-times fa fa-white'></i></a>";
                                        table_data_tlr_entry.row.add([
                                            n,
                                            contract_notab_rvt,
                                            class_codetab_rvt,
                                            instl_notab_rvt,
                                            class_code_desctab_rvt,
                                            notetab_rvt,
                                            accounting.formatMoney(amount_due_datetab_rvt, '', 2, ',', '.'),
                                            amount_paidtab_rvt,
                                            fin_typedesctab,
                                            aksi,
                                            contract_idtab_rvt,
                                            n
                                        ]).draw(false);
                                        n++;
                                    });
                                    var detail_table = table_data_tlr_entry.data();
                                    // console.log(detail_table);
                                    total_amt_teller_entry = 0;
                                    for (var i = 0; i < detail_table.length; i++) {
                                        // console.log($('.id-amount-paid-tambah-teller'+detail_table[i][11]).val());
                                        var amtet = accounting.unformat($('#id-amount-paid-tambah-teller' + detail_table[i][11]).val());
                                        // console.log(amtet);
                                        total_amt_teller_entry += parseFloat(amtet);
                                        // console.log(total_amt_teller_entry);
                                        $('#id-total-amount-tellerEntry').val(accounting.formatMoney(total_amt_teller_entry, '', 2, ',', '.'));
                                    }
                                }
                            }
                            // var detail_table = table_data_tlr_entry.data();
                            // // console.log(detail_table);
                            // total_amt_teller_entry = 0; 
                            // for (var i = 0; i < detail_table.length; i++) {
                            //     console.log('Masuk');
                            //         // console.log($('.id-amount-paid-tambah-teller'+detail_table[i][11]).val());
                            //         var amtet = accounting.unformat($('#id-amount-paid-tambah-teller'+detail_table[i][11]).val()); 
                            //         console.log(amtet);
                            //         total_amt_teller_entry += parseFloat(amtet);
                            //         // console.log(total_amt_teller_entry);
                            //         $('#id-total-amount-tellerEntry').val(accounting.formatMoney(total_amt_teller_entry, '', 2, ',', '.'));
                            // }
                        } else {
                            // console.log(response['find_by_kontrak']['listAlamat']);
                            $.each(response['find_by_kontrak']['listAlamat'], function (index) {
                                kel_id_rvt = response['find_by_kontrak']['listAlamat']['kel_id'];
                                kel_name_rvt = response['find_by_kontrak']['listAlamat']['kel_name'];
                                kec_name_rvt = response['find_by_kontrak']['listAlamat']['kec_name'];
                                kab_name_rvt = response['find_by_kontrak']['listAlamat']['kab_name'];
                                prov_name_rvt = response['find_by_kontrak']['listAlamat']['prov_name'];
                                kode_pos_rvt = response['find_by_kontrak']['listAlamat']['zip_code'];
                            });
                            // console.log(response['find_by_kontrak']['listBranch']);
                            $.each(response['find_by_kontrak']['listBranch'], function (index) {
                                branchname_rvt = this['branch_desc'];
                            });
                            contract_id_rvt = response['find_by_kontrak']['data']['contractId'];
                            terimadari_rvt = response['find_by_kontrak']['data']['customerName'];
                            alamat_rvt = response['find_by_kontrak']['data']['alamtKtp'];
                            totpenalty_rvt = response['find_by_kontrak']['data']['totalPenalty'];
                            deposit_rvt = response['find_by_kontrak']['data']['depositAmount'];
                            no_dokumen_rvt = response['find_by_kontrak']['data']['depositAmount'];
                            inst_type_rvt = response['find_by_kontrak']['data']['inst_type'];
                            tenor_rvt = response['find_by_kontrak']['data']['tenor'];
                            val_online_rvt = response['find_by_kontrak']['data']['hasil'];
                            angsuran_rvt = response['find_by_kontrak']['data']['angsuran'];
                            $('#id-cabang-teller-entry').val(branchcode_rvt + ' - ' + branchname_rvt);
                            $('#id-ReceiveFrom-teller-entry').val(terimadari_rvt);
                            $('#id-Deposit-teller-entry').val(accounting.formatMoney(deposit_rvt, '', 2, ',', '.'));
                            $('#alamat-teller-entry').val(alamat_rvt + ', ' + kel_name_rvt + ', ' + kec_name_rvt + ', ' + kab_name_rvt + ', ' + prov_name_rvt + ', ' + kode_pos_rvt);
                            $('#id-total-penalty-tellerEntry').val(accounting.formatMoney(totpenalty_rvt, '', 2, ',', '.'));
                            // console.log(response['find_by_kontrak']['listBiaya']);
                            table_data_tlr_entry.clear().draw();
                            if (val_online_rvt != null) {
                                alert_info('PROSES INI MASUK KE INTERBRANCH TELLER', function () {
                                    alert_info(val_online_rvt);
                                    $('#btn-tambah-classcode-teller').prop('disabled', true);
                                    $('#btn-update-teller-entry').prop('disabled', true);
                                });
                            } else {
                                alert_info(response['find_by_kontrak']['listBiaya']);
                            }
                        }

                    }

                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Terjadi Kesalahan Prosses Get Data by Kontrak => " + e);
                }
            }
        },
        error: function (response) {
            console.log(response);
            alert_error(response['data']);
        }
    });
}
//End function untuk mencari data berdasarkan kontrak

//Function untuk mencari data berdasarkan No Receive
function findbyreceivenew_et_js() {
    receive_no_rvt = $('#id-rvNo-teller-entry').val();
    var receive_no_rvt1 = receive_no_rvt.toUpperCase();
    // console.log(receive_no_rvt);
    n = table_data_tlr_entry.data().length;
    //new edit pelunasan
    terimadari_rvt = $('#id-ReceiveFrom-teller-entry').val();
    // 26 - Agustus - 2019 Mengambil nik dari modal profile login by Icang
    var user_ksr = $('#nik-login').html();
    $.ajax({
        url: base_url + "Controller_teler_entry/findbyreceivenew_et",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id": branch_code_teller_rvt,
            "receive_no": receive_no_rvt,
            "user": user_ksr
        },

        success: function (response) {
            console.log(response);
            // console.log(response['find_by_receive']['status']);
            // debugger;
            if (response) {
                try {
                    if (response['find_by_receive']['status'] === false) {
                        alert_info(response['find_by_receive']['data'], function (index) {
                            reset_data();
                        });
                    } else {
                        // console.log(response['find_by_receive']['payment'])
                        // console.log(response['find_by_receive']['data']);
                        $.each(response['find_by_receive']['payment'], function (index) {
                            payment_type_id_rvt = this['pay_methode_code'];
                            payment_type_desc_rvt = this['pay_methode_desc'];
                            // console.log(payment_type_id_rvt, payment_type_desc_rvt);
                            $('#id-paymentType-teller-entry').val(payment_type_id_rvt);
                            $('#desc-paymentType-teller-entry').val(payment_type_desc_rvt);
                        });
                        $.each(response['find_by_receive']['empl_name'], function (index) {
                            collector_id_rvt = this['emplNpk'];
                            collector_desc_rvt = this['emplName'];
                            job_rvt = this['emplJobCode'];
                            $('#id-collId-teller-entry').val(collector_id_rvt);
                            $('#id-CollName-teller-entry').val(collector_desc_rvt);
                            $('#id-collJob-teller-entry').val(job_rvt);
                        });
                        $.each(response['find_by_receive']['bank_name'], function (index) {
                            var bank_id_rvt = this['bankCode'];
                            var bank_name_rvt = this['bankName'];
                            $('#id-bank-teller-entry').val(bank_id_rvt);
                            $('#desc-bank-teller-entry').val(bank_name_rvt);
                        });
                        // console.log(response['find_by_receive']['listAlamat']);
                        $.each(response['find_by_receive']['listAlamat'], function (index) {
                            kel_id_rvt = response['find_by_receive']['listAlamat']['kel_id'];
                            kel_name_rvt = response['find_by_receive']['listAlamat']['kel_name'];
                            kec_name_rvt = response['find_by_receive']['listAlamat']['kec_name'];
                            kab_name_rvt = response['find_by_receive']['listAlamat']['kab_name'];
                            prov_name_rvt = response['find_by_receive']['listAlamat']['prov_name'];
                            kode_pos_rvt = response['find_by_receive']['listAlamat']['zip_code'];
                        });
                        $.each(response['find_by_receive']['listBranch'], function (index) {
                            branchname_rvt = this['branch_desc'];
                        });
                        $.each(response['find_by_receive']['data'], function (index) {
                            // console.log(response['find_by_receive']['data']['namaCustomer']);
                            branchcode_rvt = response['find_by_receive']['data']['branch_code'];
                            terimadari_rvt = response['find_by_receive']['data']['namaCustomer'];
                            alamat_rvt = response['find_by_receive']['data']['adress'];
                            document_no = response['find_by_receive']['data']['documentno'];
                            collect_date = response['find_by_receive']['data']['collect_date'];
                            deposit_rvt = response['find_by_receive']['data']['deposit_amt'];
                            // contract_id_rvt = response['find_by_receive']['data']['contractID'];
                            contract_no_rvt = response['find_by_receive']['data']['contractNo'];
                            receive_id_rvt = response['find_by_receive']['data']['receive_id'];
                            totpenalty_rvt = response['find_by_receive']['data']['denda'];
                            receive_status_rvt = response['find_by_receive']['data']['receive_status'];
                            status_contract_rvt = response['find_by_receive']['data']['statusContract'];
                            console.log('status contract = ' + status_contract_rvt)
                            // console.log(terimadari_rvt);
                            $('#id-Deposit-teller-entry').val(accounting.formatMoney(deposit_rvt, '', 2, ',', '.'));
                            $('#id-cabang-teller-entry').val(branchcode_rvt + ' - ' + branchname_rvt);
                            $('#id-ReceiveFrom-teller-entry').val(terimadari_rvt);
                            $('#alamat-teller-entry').val(alamat_rvt + ', ' + kel_name_rvt + ', ' + kec_name_rvt + ', ' + kab_name_rvt + ', ' + prov_name_rvt + ', ' + kode_pos_rvt);
                            $('#id-DocumentNo-teller-entry').val(document_no);
                            $('#id-CollDate-teller-entry').val(collect_date);
                            $('#id-noKontrak-teller-entry').val(contract_no_rvt);
                            $('#id-total-penalty-tellerEntry').val(accounting.formatMoney(totpenalty_rvt, '', 2, ',', '.'));
                            if (receive_status_rvt === '1') {
                                alert_info('NO RECEIVE : ' + receive_no_rvt1 + ' SUDAH DIBAYAR!');
                                $('#btn-tambah-classcode-teller').prop('disabled', true);
                                $('#btn-cancelRv-teller-entry').prop('disabled', true);
                                $('#btn-print-teller-entry').prop('disabled', false);
                                $('#btn-update-teller-entry').prop('disabled', true);
                            } else if (receive_status_rvt === '2') {
                                alert_info('NO RECEIVE : ' + receive_no_rvt1 + ' SUDAH DICANCEL!');
                                $('#btn-tambah-classcode-teller').prop('disabled', true);
                                $('#btn-cancelRv-teller-entry').prop('disabled', true);
                                $('#btn-print-teller-entry').prop('disabled', false);
                                $('#btn-update-teller-entry').prop('disabled', true);
                            } else {
                                $('#btn-tambah-classcode-teller').prop('disabled', true);
                                $('#btn-cancelRv-teller-entry').prop('disabled', false);
                                $('#btn-print-teller-entry').prop('disabled', false);
                                $('#btn-update-teller-entry').prop('disabled', false);
                            }
                        });
                        // console.log(response['find_by_receive']['data']['listGetRv']);
                        table_data_tlr_entry.clear().draw();
                        $.each(response['find_by_receive']['data']['listGetRv'], function (index) {
                            contract_idtab_rvt = this['contract_id'];
                            contract_notab_rvt = this['contractNo'];
                            class_codetab_rvt = this['classCode'];
                            instl_notab_rvt = this['installmentNo'];
                            class_code_desctab_rvt = this['class_code_desc'];
                            notetab_rvt = this['remarks'];
                            amount_due_datetab_rvt = this['amount_due_date'];
                            amount_paidtab_rvt = this['amountPaid'];
                            fin_typetab_rvt = this['finance_type'];
                            var fin_typedesctab
                            if (fin_typetab_rvt === '1') {
                                fin_typedesctab = 'KONVENSIONAL';
                            }
                            else {
                                fin_typedesctab = 'SYARIAH';
                            }
                            // console.log(contract_idtab_rvt);
                            var aksi = "<a class='btn btn-transparent btn-xs tooltips btn-delete-teller-entry2' data-placement='top' data-toggle='tooltip' data-original-title='Remove'><i class='fa fa-times fa fa-white' disabled></i></a>";
                            table_data_tlr_entry.row.add([
                                n,
                                contract_notab_rvt,
                                class_codetab_rvt,
                                instl_notab_rvt,
                                class_code_desctab_rvt,
                                notetab_rvt,
                                accounting.formatMoney(amount_due_datetab_rvt, '', 2, ',', '.'),
                                accounting.formatMoney(amount_paidtab_rvt, '', 2, ',', '.'),
                                fin_typedesctab,
                                aksi,
                                contract_idtab_rvt,
                                n
                            ]).draw(false);
                            n++;
                        });
                        console.log('sisa kewajiban : ' + amount_due_datetab_rvt);
                        console.log('receive amount : ' + amount_paidtab_rvt);
                        var detail_table = table_data_tlr_entry.data();
                        // console.log(detail_table);
                        total_amt_teller_entry = 0;
                        for (var i = 0; i < detail_table.length; i++) {
                            var amtet = accounting.unformat(detail_table[i][6]);
                            // console.log(amtet);
                            total_amt_teller_entry += parseFloat(amtet);
                            // console.log(total_amt_teller_entry);
                            $('#id-total-amount-tellerEntry').val(accounting.formatMoney(total_amt_teller_entry, '', 2, ',', '.'));
                        }
                    }
                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Terjadi Kesalahan Prosses Get Data By Receive => " + e);
                }
            }
        },
        error: function (response) {
            console.log(response);
            alert_error(response['data']);
        }
    });
}
//End Function untuk mencari data berdasarkan No Receive

//function get class_code setelah ditambah dengan Interbranch Teller
function getclass_code_et_js() {
    $.ajax({
        url: base_url + "Controller_teler_entry/getClassCode",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_code": branch_code_teller_rvt,
            "branch_kontrak": branchcode_rvt
        },

        success: function (response) {
            console.log(response);
            if (response) {
                try {
                    // console.log(response['data']);
                    tbl_class_code_teller.clear().draw();
                    $.each(response['data'], function (index) {
                        tbl_class_code_teller.row.add([
                            this['interfaceGroup'],
                            this['constName'],
                            this['briefDesc']
                        ]).draw(false);
                    });
                }
                catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Terjadi Kesalahan Prosses Get ClassCode => " + e);
                }
            }
        },
        error: function (response) {
            console.log(response);
            alert_error(response['data']);
        }
    });
}
//End function get class_code setelah ditambah dengan Interbranch Teller

//Function class code tambahan
function class_code_tambah_et_js() {
    // console.log(contract_id);
    var no_kontrak = $('#id-noKontrak-teller-entry').val();
    var collect_date = $('#id-CollDate-teller-entry').val();
    collector_id_rvt = $('#id-collId-teller-entry').val();
    var job_code = '';
    if (collector_id_rvt === '0000') {
        job_code = 'KSR';
    } else {
        job_code = $('#id-collJob-teller-entry').val();
    }
    var listData = table_data_tlr_entry.rows().data();
    var class_codecek = '';
    var data_arr = [];
    var cek = '';
    for (var i = 0; i < listData.length; i++) {
        data_arr.push(listData[i][2]);
    }


    const check = data_arr.includes("T-OL.RCV4");
    if (check === true) {
        cek = '1';
    } else {
        cek = '0';
    }
    $.ajax({
        url: base_url + "Controller_teler_entry/classCodeTambah",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id": branch_code_teller_rvt,
            "branch_kontrak": branchcode_rvt,
            "contract_id": contract_id_rvt,
            "contract_no": no_kontrak,
            "total_penalty": totpenalty_rvt,
            "class_code": pil_class_code_rvt,
            "coll_date": collect_date,
            "coll_id": collector_id_rvt,
            "jobId": job_code,
            "cek": cek
        },

        success: function (response) {
            console.log(response);
            if (response) {
                try {
                    if (response['classcode_tambah']['status'] === false) {
                        alert_info(response['classcode_tambah']['data']);
                    } else {
                        // console.log(response['classcode_tambah']['data']);
                        console.log(aksi_delete_rvt);
                        if (aksi_delete_rvt == "hapus") {
                            amt_classcode_tambah_rvt = hitung_length_rvt + 1;
                            // console.log(amt_classcode_tambah_rvt);
                            aksi_delete_rvt = 'hapus2';
                        } else if (aksi_delete_rvt == "hapus2") {
                            amt_classcode_tambah_rvt = table_data_tlr_entry.data().length;
                            amt_classcode_tambah_rvt = amt_classcode_tambah_rvt + 1;
                            // console.log(amt_classcode_tambah_rvt);
                        } else if (aksi_delete_rvt == "hapus3") {
                            aksi_delete_rvt = 'hapus4';
                        } else if (aksi_delete_rvt == "hapus4") {
                            var hitung = table_data_tlr_entry.data().length;
                            hitung = hitung - 1;
                            // console.log(hitung);
                            var detail_table = table_data_tlr_entry.data();
                            // console.log(detail_table[hitung][0]);
                            hitung = detail_table[hitung][0];
                            amt_classcode_tambah_rvt = hitung + 1;
                        } else {
                            amt_classcode_tambah_rvt = table_data_tlr_entry.data().length;
                            amt_classcode_tambah_rvt = amt_classcode_tambah_rvt;
                            // console.log(amt_classcode_tambah_rvt);
                        }
                        $.each(response['classcode_tambah']['data'], function (index) {
                            contract_idtab_rvt = this['cont_id'];
                            contract_notab_rvt = this['contract_no'];
                            class_codetab_rvt = this['class_code'];
                            instl_notab_rvt = this['instl_no'];
                            class_code_desctab_rvt = this['class_code_desc'];
                            // console.log(class_codetab_rvt);
                            notetab_rvt = this['note'];
                            if (class_codetab_rvt == 'T-OL.RCV1') {
                                if (inst_type_rvt == '03') {
                                    amount_due_datetab_rvt = accounting.formatMoney(this['amount_due_date'], '', 2, ',', '.');
                                    amt_due_decN = this['amount_due_date'];
                                    //cek prop period untuk minimum paid amt
                                    valPropPeriod(contract_notab_rvt, instl_notab_rvt, branchcode_rvt);
                                    amount_propPeriod = this['amount_paid'];
                                    amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" maxlength="13" oninput="cekPaidDecN(amt_due_decN)">';
                                } else {
                                    amount_due_datetab_rvt = accounting.formatMoney(this['amount_due_date'], '', 2, ',', '.');
                                    amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" disabled>';
                                }
                            } else if (class_codetab_rvt == 'T-OL.RCV4') {
                                amount_due_datetab_rvt = accounting.formatMoney(this['amount_due_date'], '', 2, ',', '.');
                                amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" disabled>';
                            } else if (class_codetab_rvt == 'T-OL.RCV2') {
                                // console.log('clas_code ini 1');
                                amount_due_datetab_rvt = accounting.formatMoney(this['amount_due_date'], '', 2, ',', '.');
                                amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" maxlength="13">';
                            } else if (class_codetab_rvt == 'T-ANGS') {
                                console.log(inst_type_rvt);
                                amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" maxlength="13">';
                            } else if (class_codetab_rvt == 'T-BUNGA') {
                                amount_due_datetab_rvt = accounting.formatMoney(this['amount_due_date'], '', 2, ',', '.');
                                amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" maxlength="13">';
                            } else if (class_codetab_rvt == 'T-LNS.NT') {
                                amount_due_datetab_rvt = accounting.formatMoney(this['amount_due_date'], '', 2, ',', '.');
                                amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" disabled>';
                            } else if (class_codetab_rvt == 'T-ADM.ANGS') {
                                amount_due_datetab_rvt = accounting.formatMoney(this['amount_due_date'], '', 2, ',', '.');
                                amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" disabled>';
                            } else {
                                amount_due_datetab_rvt = '<input id="id-amount-duedate-tambah-teller' + n + '" type="text" class="form-control amount-duedate-tambah-teller" disabled>';
                                amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" class="form-control amount-paid-tambah-teller inp-number-rvt" maxlength="13">';
                            }
                            fin_typetab_rvt = this['fin_type'];
                            var fin_typedesctab
                            if (fin_typetab_rvt === '1') {
                                fin_typedesctab = 'KONVENSIONAL';
                            }
                            else {
                                fin_typedesctab = 'SYARIAH';
                            }
                            var aksi = "<a class='btn btn-transparent btn-xs tooltips btn-delete-teller-entry' data-placement='top' data-toggle='tooltip' data-original-title='Remove'><i class='fa fa-times fa fa-white'></i></a>";
                            table_data_tlr_entry.row.add([
                                n,
                                contract_notab_rvt,
                                class_codetab_rvt,
                                instl_notab_rvt,
                                class_code_desctab_rvt,
                                notetab_rvt,
                                amount_due_datetab_rvt,
                                // accounting.formatMoney(amount_due_datetab_rvt, '', 2, ',', '.'),
                                amount_paidtab_rvt,
                                // accounting.formatMoney(amount_paidtab_rvt, '', 2, ',', '.'),
                                fin_typedesctab,
                                aksi,
                                contract_idtab_rvt,
                                n
                            ]).draw(false);
                            n++;
                        });
                        var detail_table = table_data_tlr_entry.data();
                        console.log(detail_table);
                        var paye_tot = accounting.unformat($('#id-total-paye-tellerEntry').val());
                        var change_tot = 0;
                        total_amt_teller_entry = 0;
                        for (var i = 0; i < detail_table.length; i++) {
                            // console.log($('#id-amount-paid-tambah-teller'+detail_table[i][0]).val());
                            var amtet = accounting.unformat($('#id-amount-paid-tambah-teller' + detail_table[i][0]).val());
                            // console.log(amtet);
                            total_amt_teller_entry += parseFloat(amtet);
                            // console.log(total_amt_teller_entry);
                            $('#id-total-amount-tellerEntry').val(accounting.formatMoney(total_amt_teller_entry, '', 2, ',', '.'));
                        }
                        if (paye_tot != 0) {
                            // console.log(total_amt_teller_entry, paye_tot);
                            change_tot = parseFloat(paye_tot) - parseFloat(total_amt_teller_entry);
                            // console.log(change_tot);
                            $('#id-total-change-tellerEntry').val(accounting.formatMoney(change_tot, '', 2, ',', '.'));
                        }
                    }
                }
                catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Terjadi Kesalahan Prosses Tambah ClassCode => " + e);
                }
            }
        },
        error: function (response) {
            console.log(response);
            alert_error(response['data']);
        }
    });
}
//End Function class code tambahan

//Tambah Tangs
function getTangs_js() {
    // console.log(instno_rvt);
    // console.log(contract_id_rvt);
    console.log(pil_class_code_rvt);
    $.ajax({
        url: base_url + "Controller_teler_entry/getTangs",
        type: 'POST',
        dataType: 'json',
        data: {
            "cont_id": contract_id_rvt,
            "instl_no": instno_rvt,
            "class_code": pil_class_code_rvt
        },
        cache: false,

        success: function (response) {
            console.log(response);
            if (response) {
                try {
                    // console.log(response['getTangs']['status']);
                    if (response['getTangs']['status'] === false) {
                        alert_info(response['getTangs']['data']);
                    } else {
                        if (aksi_delete_rvt == "hapus") {
                            amt_classcode_tambah_rvt = hitung_length_rvt + 1;
                            // console.log(amt_classcode_tambah_rvt);
                            aksi_delete_rvt = 'hapus2';
                        } else if (aksi_delete_rvt == "hapus2") {
                            amt_classcode_tambah_rvt = table_data_tlr_entry.data().length;
                            amt_classcode_tambah_rvt = amt_classcode_tambah_rvt + 1;
                            // console.log(amt_classcode_tambah_rvt);
                        } else if (aksi_delete_rvt == "hapus3") {
                            aksi_delete_rvt = 'hapus4';
                        } else if (aksi_delete_rvt == "hapus4") {
                            var hitung = table_data_tlr_entry.data().length;
                            hitung = hitung - 1;
                            // console.log(hitung);
                            var detail_table = table_data_tlr_entry.data();
                            // console.log(detail_table[hitung][0]);
                            hitung = detail_table[hitung][0];
                            amt_classcode_tambah_rvt = hitung + 1;
                        } else {
                            amt_classcode_tambah_rvt = table_data_tlr_entry.data().length;
                            amt_classcode_tambah_rvt = amt_classcode_tambah_rvt;
                            // console.log(amt_classcode_tambah_rvt);
                        }
                        $.each(response['getTangs']['data'], function (index) {
                            contract_idtab_rvt = this['cont_id'];
                            contract_notab_rvt = this['contract_no'];
                            class_codetab_rvt = this['class_code'];
                            instl_notab_rvt = this['instl_no'];
                            class_code_desctab_rvt = this['class_code_desc'];
                            // console.log(class_codetab_rvt);
                            notetab_rvt = this['note'];
                            if (class_codetab_rvt == 'T-ANGS') {
                                amount_due_datetab_rvt = accounting.formatMoney(this['amount_due_date'], '', 2, ',', '.');
                                amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" disabled>';
                            } else {
                                amount_due_datetab_rvt = accounting.formatMoney(this['amount_due_date'], '', 2, ',', '.');
                                amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(this['amount_paid'], '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" disabled>';
                                // amount_due_datetab_rvt = '<input id="id-amount-duedate-tambah-teller'+n+'" type="text" class="form-control amount-duedate-tambah-teller" disabled>';
                                // amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller'+n+'" type="text" class="form-control amount-paid-tambah-teller" maxlength="13">';
                            }
                            fin_typetab_rvt = this['fin_type'];
                            var fin_typedesctab
                            if (fin_typetab_rvt === '1') {
                                fin_typedesctab = 'KONVENSIONAL';
                            }
                            else {
                                fin_typedesctab = 'SYARIAH';
                            }
                            var aksi = "<a class='btn btn-transparent btn-xs tooltips btn-delete-teller-entry' data-placement='top' data-toggle='tooltip' data-original-title='Remove'><i class='fa fa-times fa fa-white'></i></a>";
                            table_data_tlr_entry.row.add([
                                n,
                                contract_notab_rvt,
                                class_codetab_rvt,
                                instl_notab_rvt,
                                class_code_desctab_rvt,
                                notetab_rvt,
                                amount_due_datetab_rvt,
                                // accounting.formatMoney(amount_due_datetab_rvt, '', 2, ',', '.'),
                                amount_paidtab_rvt,
                                // accounting.formatMoney(amount_paidtab_rvt, '', 2, ',', '.'),
                                fin_typedesctab,
                                aksi,
                                contract_idtab_rvt,
                                n
                            ]).draw(false);
                            n++;
                        });
                        var detail_table = table_data_tlr_entry.data();
                        console.log(detail_table);
                        total_amt_teller_entry = 0;
                        for (var i = 0; i < detail_table.length; i++) {
                            // console.log($('#id-amount-paid-tambah-teller'+detail_table[i][0]).val());
                            var amtet = accounting.unformat($('#id-amount-paid-tambah-teller' + detail_table[i][0]).val());
                            // console.log(amtet);
                            total_amt_teller_entry += parseFloat(amtet);
                            // console.log(total_amt_teller_entry);
                            $('#id-total-amount-tellerEntry').val(accounting.formatMoney(total_amt_teller_entry, '', 2, ',', '.'));
                        }
                        // table_data_tlr_entry.fnDraw();
                        // $('#table-data-teller-entry').DataTable().ajax.reload();
                    }
                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Terjadi Kesalahan Prosses Tambah ClassCode => " + e);
                }
            };
        },
        error: function (response) {
            console.log(response);
            alert_error(response['data']);
        }
    });
}
//End tambah Tangs

//Function Payment Type
function getPaymentType() {
    $.ajax({
        url: base_url + "Controller_teler_entry/getPaymentType",
        type: 'GET',
        dataType: 'json',
        cache: false,

        success: function (response) {
            // console.log(response);
            if (response) {
                try {
                    table_payment_type.clear().draw();
                    $.each(response['data'], function (index) {
                        var idPtype = this['pay_methode_code'];
                        var descPtype = this['pay_methode_desc'];

                        table_payment_type.row.add([
                            idPtype,
                            descPtype
                        ]).draw(false);
                    });
                } catch (e) {
                    console.log(e);
                    $('#loading-ajax').hide(); //menutup loading ajax
                    alert_error("Terjadi kesalahan Get Payment Type => " + e);
                }
            };
        },
        error: function (response) {
            console.log(response);
            alert_error(response['data']);
        }
    });
}
//End Function Payment Type

//Function Collector ID
function getColl() {
    $.ajax({
        url: base_url + "Controller_teler_entry/getCol",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_code": branch_code_teller_rvt
        },
        // cache: false,

        success: function (response) {
            // console.log(response);
            if (response) {
                try {
                    tbl_coll_teller.clear().draw();
                    $.each(response['data'], function (index) {
                        var npk = this['emplNpk'];
                        var name = this['emplName'];
                        job_rvt = this['emplJobCode'];

                        tbl_coll_teller.row.add([
                            npk,
                            name,
                            job_rvt
                        ]).draw(false);
                    });
                } catch (e) {
                    console.log(e);
                    $('#loading-ajax').hide(); //menutup loading ajax
                    alert_error("Terjadi kesalahan Get Data Collector => " + e);
                }
            };
        },
        error: function (response) {
            console.log(response);
            alert_error(response['data']);
        }
    });
}
//End Function Collector ID

//Function Bank
function getBank() {
    $.ajax({
        url: base_url + 'Controller_teler_entry/getBank',
        type: 'POST',
        dataType: 'json',
        data: {
            "bankbrid": branch_code_teller_rvt
        },
        cache: false,

        success: function (response) {
            console.log(response);
            if (response) {
                try {
                    // console.log(response['data']);
                    tbl_bank_teller.clear().draw();
                    $.each(response['data'], function (index) {
                        // console.log(this['bankcode']);
                        tbl_bank_teller.row.add([
                            this['bankCode'],
                            this['bankBr']
                        ]).draw(false);
                    });
                } catch (e) {
                    console.log(e);
                    $('#loading-ajax').hide(); //menutup loading ajax
                    alert_error("Terjadi kesalahan Get Data Bank => " + e);
                }
            };
        },
        error: function (response) {
            console.log(response);
            alert_error(response['data']);
        }
    });
}
//End Function Bank

//Function Confirm Receive
function confirm_receive_et_js() {
    contract_no_rvt = $('#id-noKontrak-teller-entry').val();
    var total_amt = parseInt(accounting.unformat($('#id-total-amount-tellerEntry').val()));
    payment_type_id_rvt = $('#id-paymentType-teller-entry').val();
    collector_id_rvt = $('#id-collId-teller-entry').val();
    var collect_date = $('#id-CollDate-teller-entry').val();
    var document_no = $('#id-DocumentNo-teller-entry').val();
    var bank_id = $('#id-bank-teller-entry').val();
    var job_code = '';
    if (collector_id_rvt === '0000') {
        job_code = 'KSR';
    } else {
        job_code = $('#id-collJob-teller-entry').val();
    }
    var getrvnew = '';
    radio_button_rvt = $('input[name="radioTeller"]:checked').val();
    // console.log(radio_button_rvt);
    if (radio_button_rvt === 'kontrak') {
        getrvnew = 'N';
    } else {
        getrvnew = 'O';
    }
    receive_no_rvt = $('#id-rvNo-teller-entry').val();
    var listData = table_data_tlr_entry.rows().data();
    console.log(listData);
    var data_arr = [];
    var unformat_amt = '';
    var unformat_amt2 = '';
    for (var i = 0; i < listData.length; i++) {
        // unformat_amt = accounting.unformat( $('#id-amount-paid-tambah-teller'+i).val());
        if (getrvnew == "N") {
            unformat_amt = accounting.unformat($('#id-amount-paid-tambah-teller' + listData[i][0]).val());
        } else {
            // console.log("sina");
            unformat_amt = accounting.unformat(listData[i][6]);
        }
        data_arr.push({
            contract_idtab_rvt: listData[i][10],
            contract_notab_rvt: listData[i][1],
            detail_amt: unformat_amt,
            class_code: listData[i][2],
            inst_no: listData[i][3]
        });
    }
    // console.log(data_arr);
    var jumbayar = $('#id-total-paye-tellerEntry').val();
    $.ajax({
        url: base_url + "Controller_teler_entry/confirmReceive",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_code": branch_code_teller_rvt,
            "branch_contract": branchcode_rvt,
            "contract_id": contract_id_rvt,
            "contract_no": contract_no_rvt,
            "total_amt": total_amt,
            "received_from": terimadari_rvt,
            "payment_type": payment_type_id_rvt,
            "col_id": collector_id_rvt,
            "collect_date": collect_date,
            "document_no": document_no,
            "bank_id": bank_id,
            "deposit": deposit_rvt,
            "job_code": job_code,
            "getrvnew": getrvnew,
            "receive_id": receive_id_rvt,
            "receive_no": receive_no_rvt,
            "bayar": accounting.unformat(jumbayar),
            "data": data_arr
        },

        success: function (response) {
            console.log(response);
            if (response) {
                try {
                    // console.log(response['status']);
                    if (response['status'] === false) {
                        alert_info(response['data']);
                    } else {
                        // console.log(response['Kembalian']);
                        var kembalian = response['Kembalian'];
                        $('#id-total-change-tellerEntry').val(accounting.formatMoney(kembalian, '', 2, ',', '.'));
                        // console.log(response['receive_no']);
                        receive_id_rvt = response['receive_id'];
                        receive_no_rvt = response['receive_no'];
                        $('#id-rvNo-teller-entry').val(receive_no_rvt);
                        // alert_info(response['data'], function(){
                        //         $('html, body').animate({scrollBottom:600}, 'slow');
                        //         location.reload();
                        //     });
                        alert_info(response['data']);
                        $('#btn-update-teller-entry').prop('disabled', true);
                        $('#btn-cancelRv-teller-entry').prop('disabled', true);
                        $('#btn-print-teller-entry').prop('disabled', false);
                    }
                } catch (response) {
                    console.log(response);
                    $('#loading-ajax').hide(); //menutup loading ajax
                    // alert_error("Terjadi kesalahan error{Confirm} => " + e);
                    alert_info(response['data']);
                }
            };
        },
        error: function (response) {
            console.log(response);
            alert_info(response['data']);
        }
    });
}
//End Function Confirm Receive

//Function Cancel Receive
function cancel_receive_et_js() {
    receive_no_rvt = $('#id-rvNo-teller-entry').val();
    // 26 - Agustus - 2019 Mengambil nik dari modal profile login by Icang
    var user_ksr = $('#nik-login').html();
    $.ajax({
        url: base_url + "Controller_teler_entry/cancelreceive",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id": branch_code_teller_rvt,
            "receive_id": receive_id_rvt,
            "receive_no": receive_no_rvt,
            "user": user_ksr
        },

        success: function (response) {
            console.log(response);
            if (response) {
                try {
                    // console.log(response['cancel_receive']['status']);
                    if (response['cancel_receive']['status'] === false) {
                        alert_info(response['cancel_receive']['data']);
                    } else {
                        alert_info(response['cancel_receive']['data'], function () {
                            $('html, body').animate({ scrollBottom: 600 }, 'slow');
                            location.reload();
                        });
                        // alert_info(response['cancel_receive']['data']);
                        $('#btn-tambah-classcode-teller').prop('disabled', true);
                        $('#btn-cancelRv-teller-entry').prop('disabled', true);
                        $('#btn-print-teller-entry').prop('disabled', true);
                        $('#btn-update-teller-entry').prop('disabled', true);
                    }
                } catch (response) {
                    console.log(response);
                    $('#loading-ajax').hide(); //menutup loading ajax
                    // alert_error("Terjadi kesalahan error{Confirm} => " + e);
                    alert_info(response['cancel_receive']['data']);
                }
            };
        },
        error: function (response) {
            console.log(response);
            alert_info(response['data']);
        }
    });
}
//End Function Cancel Receive

//Function Print Receive
function print_receive_et_js() {
    receive_no_rvt = $('#id-rvNo-teller-entry').val();
    var bankid = $('#id-bank-teller-entry').val();
    var bankdesc = $('#desc-bank-teller-entry').val();
    bank_id_rvt = bankid + " - " + bankdesc;
    // console.log(bank_id_rvt);
    var collector_code_rvt = $('#id-collId-teller-entry').val();
    var collector_desc_rvt = $('#id-CollName-teller-entry').val();
    collector_rvt = collector_code_rvt + " - " + collector_desc_rvt;
    // console.log(collector);
    $.ajax({
        url: base_url + "Controller_teler_entry/cetakTeller",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id": branch_code_teller_rvt,
            "receive_id": receive_id_rvt,
            "receive_no": receive_no_rvt,
            "bank_id": bank_id_rvt,
            "collector": collector_rvt
        },

        success: function (response) {
            // console.log('masuk print');
            // console.log(response);
            if (response) {
                // console.log('masuk print');
                alert_info('Data Berhasil Dicetak');
                var printWindow = window.open();

                printWindow.document.write('<pre id = "printss" style="font-size:16px"></pre>');
                printWindow.document.querySelector('pre').innerHTML = response;

                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            } else {
                alert_info('Data Gagal Dicetak');
            }
        },
        error: function (response) {
            console.log(response);
            alert_info(response['data']);
        }
    });
}
//End Function Print Receive
//---------------------------------End Function-------------------------------------------\\

//---------------------------------On Click----------------------------------------------------\\
//Untuk Delete Row Table Detail Biaya
$('#table-data-teller-entry').on('click', '.btn-delete-teller-entry', function () {
    // debugger;
    amt_classcode_tambah_rvt = table_data_tlr_entry.data().length;
    // console.log(amt_classcode_tambah_rvt);
    aksi_delete_rvt = "hapus";
    hitung_length_rvt = amt_classcode_tambah_rvt - 1;
    // console.log(hitung_length_rvt);
    if (hitung_length_rvt == 0) {
        aksi_delete_rvt = "hapus3";
    }
    pilih_detail_rvt = table_data_tlr_entry.row($(this).closest('tr')).data();
    // console.log(pilih_detail_rvt);
    var pilih_detail_clco = pilih_detail_rvt[2];
    console.log(pilih_detail_clco);
    var j_cek_instno_rvt;
    var j_cek_true_false_rvt;
    var j_rvt;
    // debugger;
    if (pilih_detail_clco === "T-ANGS" || pilih_detail_clco === "T-OL.RCV1") {
        // console.log("masuk hapus");
        if (inst_type_rvt == '03') { //Jika kontrak decline n dan akan menghapus angsuran, maka akan menghapus semua data table
                alert_info('Class Code yang akan anda hapus adalah T-ANGS dengan Installment No ke-' + pilih_detail_instno + ' , Tidak dapat dihapus karena sudah ada T-ANGS yang lebih besar dengan Installment No ke-' + j);
            } else {
                table_data_tlr_entry.row($(this).parents('tr')).remove().draw();
            }
        }
    } else if (pilih_detail_clco === 'T-PDP.OP-4') {
        tambah_decline = '';
        table_data_tlr_entry.row($(this).parents('tr')).remove().draw();
    } else {
        table_data_tlr_entry.row($(this).parents('tr')).remove().draw();
    }

    if (hitung_length_rvt > 0) {
        var detail_table = table_data_tlr_entry.data();
        total_amt_teller_entry = 0;
        var paye_tot = accounting.unformat($('#id-total-paye-tellerEntry').val());
        var change_tot = 0;
        for (var i = 0; i < detail_table.length; i++) {
            var amtet;
            // console.log(aksi_delete_rvt);
            // console.log($('#id-amount-paid-tambah-teller'+detail_table[i][0]).val());
            amtet = accounting.unformat($('#id-amount-paid-tambah-teller' + detail_table[i][0]).val());
            // console.log(amtet);
            total_amt_teller_entry += parseFloat(amtet);
            // console.log(total_amt_teller_entry);
            $('#id-total-amount-tellerEntry').val(accounting.formatMoney(total_amt_teller_entry, '', 2, ',', '.'));
        }
    } else {
        $('#id-total-amount-tellerEntry').val(accounting.formatMoney(0, '', 2, ',', '.'));
    }


    if (paye_tot != 0) {
        // console.log(total_amt_teller_entry, paye_tot);
        change_tot = parseFloat(paye_tot) - parseFloat(total_amt_teller_entry);
        // console.log(change_tot);
        $('#id-total-change-tellerEntry').val(accounting.formatMoney(change_tot, '', 2, ',', '.'));
    }
});
//Untuk Delete Row Table Detail Biaya

//Pilih class code
$('#tbl-class-code-teller').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        pilih_class_code = '';
    } else {
        tbl_class_code_teller.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        pilih_class_code = tbl_class_code_teller.row(this).data();
        // console.log(pilih_class_code);
    }
});

$('#tbl-class-code-teller').on('dblclick', 'tr', function () {
    $('#modal-class-code').modal('hide');
    $('.modal-backdrop').css('display', 'none');
    pilih_class_code = tbl_class_code_teller.row(this).data();
    pil_class_code_rvt = pilih_class_code[0];
    // console.log(pil_class_code_rvt);
    var listData = table_data_tlr_entry.rows().data();
    // console.log(listData);
    // console.log(listData[i][2]);
    var class_codecek = '';
    var data_arr = [];
    var cek = '';
    for (var i = 0; i < listData.length; i++) {
        data_arr.push(listData[i][2]);
    }
    console.log(data_arr);
    const check = data_arr.includes(pil_class_code_rvt);
    console.log(check);
    // debugger;
    if (pil_class_code_rvt === "T-ANGS" || pil_class_code_rvt === "T-OL.RCV1") {
        var listData1 = table_data_tlr_entry.rows().data();
        var datarr = [];
        var instl_no = '';
        for (var i = 0; i < listData1.length; i++) {
            if (listData1[i].includes("T-ANGS")) {
                // console.log("mana nih");
                datarr.push(listData1[i][3]);
            } else if (listData1[i].includes("T-OL.RCV1")) {
                datarr.push(listData1[i][3]);
            }
        }
        // debugger;
        if (check === false) {
            // console.log("belum ada");
            class_code_tambah_et_js();
        } else {
            // console.log("udah ada");
            if (inst_type_rvt == '03') {
                alert_info("Anda tidak bisa melakukan Receive data lagi untuk jenis penerimaan ANGSURAN DECLINE N !");
            } else {
                var j = 0;
                for (var i = 0; i < datarr.length; i++) {
                    if (j < parseInt(datarr[i])) {
                        j = parseInt(datarr[i]);
                    }
                }
                instno_rvt = 1 + j;
                // instno_rvt = instno_rvt.toString();
                // console.log(instno_rvt);
                getTangs_js();
            }
        }
    } else if (check === false) {
        // console.log("Boleh lanjut");
        class_code_tambah_et_js();
    }
});
//End Pilih class code

//Pilih Payment Type
$('#tbl-payment-teller').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        pilih_payment_type = '';
    } else {
        table_payment_type.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        pilih_payment_type = table_payment_type.row(this).data();
    }
});

$('#tbl-payment-teller').on('dblclick', 'tr', function () {
    $('#modal-payment-teller').modal('hide');
    $('.modal-backdrop').css('display', 'none');
    pilih_payment_type = table_payment_type.row(this).data();
    // console.log(pilih_payment_type);
    payment_type_id_rvt = pilih_payment_type[0];
    payment_type_desc_rvt = pilih_payment_type[1];
    // console.log(payment_type_id_rvt, payment_type_desc_rvt);
    $('#id-paymentType-teller-entry').val(payment_type_id_rvt);
    $('#desc-paymentType-teller-entry').val(payment_type_desc_rvt);
});
//End Pilih Payment Type

//Pilih Collector
$('#tbl-coll-teller').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        pilih_collector = '';
    } else {
        tbl_coll_teller.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        pilih_collector = tbl_coll_teller.row(this).data();
    }
});

$('#tbl-coll-teller').on('dblclick', 'tr', function () {
    $('#modal-coll-teller').modal('hide');
    $('.modal-backdrop').css('display', 'none');
    pilih_collector = tbl_coll_teller.row(this).data();
    // console.log(pilih_collector);
    collector_id_rvt = pilih_collector[0];
    collector_desc_rvt = pilih_collector[1];
    collector_code_rvt = pilih_collector[2];
    // console.log(collector_id_rvt, collector_desc_rvt, collector_code_rvt);
    $('#id-collId-teller-entry').val(collector_id_rvt);
    $('#id-CollName-teller-entry').val(collector_desc_rvt);
    $('#id-collJob-teller-entry').val(collector_code_rvt);
});
//End Pilih Collector

//Pilih Bank
$('#tbl-bank-teller').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        pilih_bank = '';
    } else {
        tbl_bank_teller.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        pilih_bank = tbl_bank_teller.row(this).data();
    }
});
$('#tbl-bank-teller').on('dblclick', 'tr', function () {
    $('#modal-bank-teller').modal('hide');
    $('.modal-backdrop').css('display', 'none');
    pilih_bank = tbl_bank_teller.row(this).data();
    // console.log(pilih_bank);
    bank_id_teller_rvt = pilih_bank[0];
    bank_desc_teller_rvt = pilih_bank[1];
    // console.log(bank_id_teller_rvt, bank_desc_teller_rvt);
    $('#id-bank-teller-entry').val(bank_id_teller_rvt);
    $('#desc-bank-teller-entry').val(bank_desc_teller_rvt);
});
// End Pilih Bank
//---------------------------------End On Click----------------------------------------------------\\

//----------------------------------On Change------------------------------------------------------\\
var amountPaidfinal;
var amountduedatefinal;
var nomer_tambah_decline;
//Untuk Mengganti nilai pada class code tambahan
$('#table-data-teller-entry').on('change', '.amount-paid-tambah-teller', function () {
    // debugger;
    var listData = table_data_tlr_entry.rows().data();
    // console.log(listData);
    var detail_tambah_teller = table_data_tlr_entry.row($(this).closest('tr')).data();
    var clas_code_det_tamb_rvt = detail_tambah_teller[2];
    // console.log(clas_code_det_tamb_rvt);
    // debugger;
    if (clas_code_det_tamb_rvt == "T-OL.RCV3") {
        amountPaidfinal = $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val();
        // console.log(amountPaidfinal);
        // console.log(angsuran_rvt);
        if (amountPaidfinal > angsuran_rvt) {
            alert_info('Mohon maaf Titipan yang anda masukan lebih besar dari nilai angsuran : ' + angsuran_rvt);
            $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val(0);
        } else {
            var formatamountPaid = accounting.formatMoney(amountPaidfinal, '', 2, ',', '.');
            $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val(formatamountPaid);
            $('#id-amount-duedate-tambah-teller' + detail_tambah_teller[11] + '').val(formatamountPaid);
            // var total_lama = accounting.unformat($('#id-total-amount-tellerEntry').val());
        }
    } else if (clas_code_det_tamb_rvt == "T-ANGS" || clas_code_det_tamb_rvt == "T-OL.RCV1") {
        if (inst_type_rvt == '03') {
            // console.log(angsuran_rvt);
            amountPaidfinal = $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val();
            amountduedatefinal = accounting.unformat(detail_tambah_teller[6]);
            var contract_no_decline = detail_tambah_teller[1];
            var installmentNo_decline = detail_tambah_teller[3];
            var finance_type_decline = detail_tambah_teller[8];
            var contract_id_decline = detail_tambah_teller[10];
            // console.log(amountduedatefinal);
            //---------------------validasi kelebihan amount T-PDP.OP-4 pindah ke event input inchange function cekPaidDecN() | edited by Della 04/20 MTC 130119
            // if (amountPaidfinal > angsuran_rvt) {
            //     // console.log('decline-n');
            //     if (amountPaidfinal > amountduedatefinal) {
            //         var formatamountPaid = accounting.formatMoney(amountduedatefinal, '', 2, ',', '.');
            //         $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val(formatamountPaid);
            //         var amt_decline = parseFloat(amountPaidfinal) - parseFloat(amountduedatefinal);
            //         amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(amt_decline, '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" disabled>';
            //         amount_due_datetab_rvt = '<input class="inp-number-rvt" id="id-amount-duedate-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(amt_decline, '', 2, ',', '.') + '" class="form-control amount-duedate-tambah-teller" disabled>';
            //         // console.log(amt_decline);
            //         var aksi = "<a class='btn btn-transparent btn-xs tooltips btn-delete-teller-entry' data-placement='top' data-toggle='tooltip' data-original-title='Remove'><i class='fa fa-times fa fa-white'></i></a>";
            //         if (tambah_decline === '') {
            //             table_data_tlr_entry.row.add([
            //                 n,
            //                 contract_no_decline,
            //                 'T-PDP.OP-4',
            //                 installmentNo_decline,
            //                 'PENDAPATAN DECLAIN N',
            //                 'PENDAPATAN DECLAIN N',
            //                 amount_due_datetab_rvt, //accounting.formatMoney(amt_decline, '', 2, ',', '.'),
            //                 amount_paidtab_rvt,
            //                 finance_type_decline,
            //                 aksi,
            //                 contract_id_decline,
            //                 n
            //             ]).draw(false);
            //             nomer_tambah_decline = n;
            //             // console.log(nomer_tambah_decline);
            //             n++;
            //             tambah_decline = '1';
            //         } else {
            //             $('#id-amount-paid-tambah-teller' + nomer_tambah_decline + '').val(accounting.formatMoney(amt_decline, '', 2, ',', '.'));
            //             $('#id-amount-duedate-tambah-teller' + nomer_tambah_decline + '').val(accounting.formatMoney(amt_decline, '', 2, ',', '.'));
            //         }
            //     } else {
            //         var formatamountPaid = accounting.formatMoney(amountPaidfinal, '', 2, ',', '.');
            //         $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val(formatamountPaid);
            //     }
            // } else 
            if (validasi_propPeriod == '1'){
                if (amountPaidfinal < amount_propPeriod){
                    var formatMinAmtPaid = accounting.formatMoney(amount_propPeriod, '', 2, ',', '.');
                    alert_error('Angsuran masuk ke dalam bulan angsuran proportional period. Minimum angsuran yang harus dibayar adalah Rp. ' + formatMinAmtPaid);
                    $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val(formatMinAmtPaid);
                }
            } else if (amountPaidfinal  == 0 ){
                var formatamountPaid = accounting.formatMoney(amountduedatefinal, '', 2, ',', '.');
                alert_error('Nilai Yang Anda Masukkan Tidak Boleh 0');
                $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val(formatamountPaid);
            } else if (amountPaidfinal < amountduedatefinal){ //info nominal yang di input kurang dari amount due
                alert_info('Nilai Yang Anda Masukkan Kurang Dari Yang Seharusnya Dibayarkan');
                var formatamtPaid = accounting.formatMoney(amountPaidfinal, '', 2, ',', '.'); 
                $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val(formatamtPaid);
            }
            //hapus T-PDP.OP4 jika yang dibayar kurang sama dengan amount due
            for (var i = 0; i < listData.length; i++) {
                if (listData[i].includes("T-PDP.OP-4") && (amountPaidfinal <= amountduedatefinal)) {
                    console.log("Hapus T-PDP.OP-4");
                    table_data_tlr_entry.row(i).remove().draw();
                    tambah_decline = '';

                    var formatamtPaid = accounting.formatMoney(amountPaidfinal, '', 2, ',', '.'); 
                    $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val(formatamtPaid);
                } 
            }
        }
            
        
        var listData2 = table_data_tlr_entry.rows().data();
        console.log(listData2);
    } else if (clas_code_det_tamb_rvt == "T-DENDA" || clas_code_det_tamb_rvt == "T-OL.RCV2") {
        amountPaidfinal = accounting.unformat($('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val());
        var amountduedatefin = accounting.unformat(detail_tambah_teller[6]);
        var amounttotdenfin = accounting.unformat($('#id-total-penalty-tellerEntry').val());
        if (amountduedatefin > amounttotdenfin) {
            if (amountPaidfinal > amountduedatefin) {
                alert_info('Mohon maaf Nilai yang akan Anda Bayarkan : ' + accounting.formatMoney(amountPaidfinal, '', 2, ',', '.') + ' lebih besar dari Nilai Total Denda : ' + accounting.formatMoney(amountduedatefin, '', 2, ',', '.'));
                $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val(0);
            } else {
                var formatamountPaid = accounting.formatMoney(amountPaidfinal, '', 2, ',', '.');
                $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val(formatamountPaid);
            }
        } else {
            console.log(amountPaidfinal + ' ' + amounttotdenfin);
            if (amountPaidfinal > amounttotdenfin) {
                alert_info('Mohon maaf Nilai yang akan Anda Bayarkan : ' + accounting.formatMoney(amountPaidfinal, '', 2, ',', '.') + ' lebih besar dari Nilai Total Denda : ' + accounting.formatMoney(amounttotdenfin, '', 2, ',', '.'));
                $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val(0);
            } else {
                var formatamountPaid = accounting.formatMoney(amountPaidfinal, '', 2, ',', '.');
                $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val(formatamountPaid);
            }
        }
    } else {
        amountPaidfinal = $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val();
        // console.log(amountPaidfinal);
        var formatamountPaid = accounting.formatMoney(amountPaidfinal, '', 2, ',', '.');
        // console.log(formatamountPaid);
        $('#id-amount-paid-tambah-teller' + detail_tambah_teller[11] + '').val(formatamountPaid);
        $('#id-amount-duedate-tambah-teller' + detail_tambah_teller[11] + '').val(formatamountPaid);
        // var total_lama = accounting.unformat($('#id-total-amount-tellerEntry').val());
        // console.log(detail_tambah_teller);
        // console.log(detail_tambah_teller[0]);
        // console.log($('#id-amount-paid-tambah-teller'+detail_tambah_teller[0]+'').val());
    }

    var detail_table = table_data_tlr_entry.data();
    total_amt_teller_entry = 0;
    var paye_tot = accounting.unformat($('#id-total-paye-tellerEntry').val());
    var change_tot = 0;
    for (var i = 0; i < detail_table.length; i++) {
        var amtet;
        // console.log(aksi_delete_rvt);
        // console.log($('#id-amount-paid-tambah-teller'+detail_table[i][0]).val());
        amtet = accounting.unformat($('#id-amount-paid-tambah-teller' + detail_table[i][0]).val());
        // console.log(amtet);
        total_amt_teller_entry += parseFloat(amtet);
        // console.log(total_amt_teller_entry);
        $('#id-total-amount-tellerEntry').val(accounting.formatMoney(total_amt_teller_entry, '', 2, ',', '.'));
    }
    if (paye_tot != 0) {
        // console.log(total_amt_teller_entry, paye_tot);
        change_tot = parseFloat(paye_tot) - parseFloat(total_amt_teller_entry);
        // console.log(change_tot);
        $('#id-total-change-tellerEntry').val(accounting.formatMoney(change_tot, '', 2, ',', '.'));
    }
});
//End Untuk Mengganti nilai pada class code tambahan

//Untuk Mengganti format untuk Field Total Payee
$('#id-total-paye-tellerEntry').on('change', function () {
    // debugger;
    var total_payee = $('#id-total-paye-tellerEntry').val();
    // console.log(total_payee);
    var totalamount = accounting.unformat($('#id-total-amount-tellerEntry').val());
    // console.log(totalamount);3
    var changeamt;
    if (total_payee == '0' || total_payee == '') {
        changeamt = 0;
    } else {
        changeamt = total_payee - totalamount;
    }
    // console.log(changeamt);
    $('#id-total-paye-tellerEntry').val(accounting.formatMoney(total_payee, '', 2, ',', '.'));
    $('#id-total-change-tellerEntry').val(accounting.formatMoney(changeamt, '', 2, ',', '.'));
});
//End Untuk Mengganti format untuk Field Total Payee
//----------------------------------End On Change------------------------------------------------------\\


//--------------------------------------------------------------------------------------------------------\\
$('#table-data-teller-entry').on('keydown', '.amount-teller', function (e) {
    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
});

$('.tgl-coll-id').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
});

function get_format_tanggal() {
    var collect_date = $('#id-CollDate-teller-entry').val();
    console.log(collect_date);
    // var collect_date2 = Date.parse(collect_date).toString("dd-mm-yyyy");
    // console.log(collect_date2);
    var d = new Date(collect_date);
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    console.log(curr_date + "-" + curr_month + "-" + curr_year);
}

$('#table-data-teller-entry').on('keydown', '.inp-number-rvt', function (e) {
    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode)
        && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode
        && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode)
        && (96 > e.keyCode || 105 < e.keyCode)
        && e.preventDefault()
});





// --------- PRINT DOM PDF ---------------------------------//
function print_teller_js_pdf() {
    receive_no_rvt = $('#id-rvNo-teller-entry').val();
    var bankid = $('#id-bank-teller-entry').val();
    var bankdesc = $('#desc-bank-teller-entry').val();
    bank_id_rvt = bankid + " - " + bankdesc;
    // console.log(bank_id_rvt);
    var collector_code_rvt = $('#id-collId-teller-entry').val();
    var collector_desc_rvt = $('#id-CollName-teller-entry').val();
    collector_rvt = collector_code_rvt + " - " + collector_desc_rvt;
    // console.log(collector);
    $.ajax({
        url: base_url + "Controller_teler_entry/print_teller_pdf",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id": branch_code_teller_rvt,
            "receive_id": receive_id_rvt,
            "receive_no": receive_no_rvt,
            "bank_id": bank_id_rvt,
            "collector": collector_rvt
        },

        success: function (response) {
            if (response) {
                console.log(response);
                try {
                    var data = JSON.stringify(response);
                    console.log(data);
                    if (response['status']) {
                        $('#inp-print-teller-pdf').val(data);
                        console.log($('#inp-print-teller-pdf').val());
                        var ab = $('#inp-print-teller-pdf').val();
                        $("#frm-print-teller-pdf").submit();
                        console.log(ab);
                        //$('#frm-print-dp-lain').submit();                    
                    } else {
                        alert_error(response['data']['errmsg']);
                    }
                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error(e);
                }
            } else {
                alert_info('Data Gagal Dicetak');
            }
        },
        error: function (response) {
            console.log(response);
            alert_error(response['data']);
        }
    });
}
//End Funtion Untuk Button Print

// -------------------------- PRINT TXT --------------------------------
function print_receive_txt_js() {
    receive_no_rvt = $('#id-rvNo-teller-entry').val();
    var bankid = $('#id-bank-teller-entry').val();
    var bankdesc = $('#desc-bank-teller-entry').val();
    bank_id_rvt = bankid + " - " + bankdesc;
    // console.log(bank_id_rvt);
    var collector_code_rvt = $('#id-collId-teller-entry').val();
    var collector_desc_rvt = $('#id-CollName-teller-entry').val();
    collector_rvt = collector_code_rvt + " - " + collector_desc_rvt;
    $.ajax({
        url: base_url + "Controller_teler_entry/cetakTeller_txt",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id": branch_code_teller_rvt,
            "receive_id": receive_id_rvt,
            "receive_no": receive_no_rvt,
            "bank_id": bank_id_rvt,
            "collector": collector_rvt
        },

        success: function (response) {
            console.log(response);
            if (response) {

            }
        },
        error: function (response) {
            console.log(response);
            alert_info(response['data']);
        }
    });
}


// --------- PRINT JESPER ---------------------------------//
function print_teller_jesper() {
    receive_no_rvt = $('#id-rvNo-teller-entry').val();
    var bankid = $('#id-bank-teller-entry').val();
    var bankdesc = $('#desc-bank-teller-entry').val();
    bank_id_rvt = bankid + " - " + bankdesc;
    // console.log(bank_id_rvt);
    var collector_code_rvt = $('#id-collId-teller-entry').val();
    var collector_desc_rvt = $('#id-CollName-teller-entry').val();
    collector_rvt = collector_code_rvt + " - " + collector_desc_rvt;
    // console.log(collector);
    $.ajax({
        url: base_url + "Controller_teler_entry/cetakTeler_Jesper",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id": branch_code_teller_rvt,
            "receive_id": receive_id_rvt,
            "receive_no": receive_no_rvt,
            "bank_id": bank_id_rvt,
            "collector": collector_rvt
        },

        success: function (response) {
            if (response) {
                console.log(response);
                try {
                    console.log('done');
                    // var data = JSON.stringify(response);
                    // console.log(data);
                    // $('#inp-print-teller-pdf').val(data);
                    // console.log($('#inp-print-teller-pdf').val());
                    // var ab = $('#inp-print-teller-pdf').val();
                    // $("#frm-print-teller-pdf" ).submit();
                    // console.log(ab);
                    //console.log(response['Data']['status']);
                    // if (response['Data']['status']) {
                    //     $('#inp-print-teller-pdf').val(data);
                    //     console.log($('#inp-print-teller-pdf').val());
                    //     var ab = $('#inp-print-teller-pdf').val();
                    //     $("#frm-print-teller-pdf" ).submit();
                    //     console.log(ab);
                    //     //$('#frm-print-dp-lain').submit();                    
                    // }else{
                    //     alert_error(response['Data']['errmsg']);
                    // }
                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error(e);
                }
            } else {
                alert_info('Data Gagal Dicetak');
            }
        },
        error: function (response) {
            console.log(response);
            alert_error(response['data']);
        }
    });
}


function get_print_rvt() {
    if (check_session() === 'true') {
        receive_no_rvt = $('#id-rvNo-teller-entry').val();
        var bankid = $('#id-bank-teller-entry').val();
        var bankdesc = $('#desc-bank-teller-entry').val();
        bank_id_rvt = bankid + " - " + bankdesc;
        // console.log(bank_id_rvt);
        var collector_code_rvt = $('#id-collId-teller-entry').val();
        var collector_desc_rvt = $('#id-CollName-teller-entry').val();
        collector_rvt = collector_code_rvt + " - " + collector_desc_rvt;

        $('#inp-penampung-rvt-branch').val(branch_code_teller_rvt);
        $('#inp-penampung-rvt-receive-id').val(receive_id_rvt);
        $('#inp-penampung-rvt-receive-no').val(receive_no_rvt);
        $('#inp-penampung-rvt-bank-id').val(bank_id_rvt);
        $('#inp-penampung-rvt-collector').val(collector_rvt);
        $('#frm-print-teller-pdf').submit();
    } else {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function () {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }

}

function get_print_rvt2() {
    receive_no_rvt = $('#id-rvNo-teller-entry').val();
    var bankid = $('#id-bank-teller-entry').val();
    var bankdesc = $('#desc-bank-teller-entry').val();
    bank_id_rvt = bankid + " - " + bankdesc;
    // console.log(bank_id_rvt);
    var collector_code_rvt = $('#id-collId-teller-entry').val();
    var collector_desc_rvt = $('#id-CollName-teller-entry').val();
    collector_rvt = collector_code_rvt + " - " + collector_desc_rvt;
    // 26 - Agustus - 2019 Mengambil nik dari modal profile login by Icang
    var user_ksr = $('#nik-login').html();
    // console.log(collector);
    $.ajax({
        url: base_url + "Controller_teler_entry/cetakTeler_arb",
        cache: false,
        type: 'POST',
        data: {
            "branch_id": branch_code_teller_rvt,
            "receive_id": receive_id_rvt,
            "receive_no": receive_no_rvt,
            "bank_id": bank_id_rvt,
            "collector": collector_rvt,
            "user": user_ksr
        },
        dataType: 'json',
        success: function (response) {
            // var result = $.parseJSON(response);

            if (response) {
                console.log(response);
                var printWindow = window.open();
                printWindow.document.write('<pre id = "printss" style="font-size:12px;"></pre>');
                printWindow.document.querySelector('pre').innerHTML = response;
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close();

            } else {
                alert_error(response);
            }
        },
        error: function (response) {
            console.log(response);
            alert_error(response);
        }
    });
}


// function get_print(){
//     if (check_session() === 'true') {
//         var tanggal = $('#tgl-awal-periode-rf').val();
//         tanggal = new Date(tanggal).format('dd/mm/yyyy');
//         var tanggal2 = $('#tgl-akhir-periode-rf').val();
//         tanggal2 = new Date(tanggal2).format('dd/mm/yyyy');

//         if ($('#slc-laporan-rf').val() === "005001") {
//             $('#penampung-branch-id').val($('#slc-branch-rf').val());
//             $('#penampung-tglstart').val($('#tgl-awal-periode-rf').val());
//             $('#penampung-tglend').val($('#tgl-akhir-periode-rf').val());
//             $('#penampung-branch').val(branch_user);
//             $('#penampung-report').val($('#slc-laporan-rf').val());
//             $('#penampung-user').val(nik_user);
//             $('#idFormSertifikat').submit();
//         }else if($('#slc-laporan-rf').val() === "005002"){
//             $('#penampung-branch-out').val(branch_user);
//             $('#penampung-tglstart-out2').val(tanggal);
//             $('#penampung-tglend-out2').val(tanggal2);
//             $('#penampung-tglstart-out').val($('#tgl-awal-periode-rf').val());
//             $('#penampung-tglend-out').val($('#tgl-akhir-periode-rf').val());
//             $('#penampung-report-out').val($('#slc-laporan-rf').val());
//             $('#penampung-user-out').val(nik_user);
//             $('#inp-branch-name-rf-out').val($('#inp-branch-name-rf').val());
//             $('#idFormOutstanding').submit();
//         }
//     }else{
//         alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
//             localStorage.clear();
//             window.location.href = base_url + "Controller_login/login_view";
//         });
//     }
// }

// --------- VALIDASI PROPORTIONAL PERIOD DECLINE N---------------------------------// MTC 130119
function valPropPeriod(contract_notab_rvt, instl_notab_rvt, branchcode_rvt) {
    $.ajax({
        url: base_url + 'Controller_teler_entry/validasiPropPeriod',
        type: 'POST',
        data: {
            contract_no: contract_notab_rvt,
            branch_id: branchcode_rvt,
            inst_no: instl_notab_rvt
        },
        dataType: 'json',
        async: false,
        success: function (response) {
            console.log(response);
            if (response) {
                if (response['validasi_declineN']['status'] == false) {
                    alert_error('Gagal validasi angsuran Decline N');
                    return false;
                } else {
                    validasi_propPeriod = response['validasi_declineN']['valPropPeriod'];
                }
            }
        },
        error: function (response) {
            console.log(response);
            alert_error(response['validasi_declineN']['errMsg']);
        }
    });



}

// --------- VALIDASI T-PDP.OP-4 DECLINE N---------------------------------// MTC 130119
function cekPaidDecN(amt_due_decN){
    var listData = table_data_tlr_entry.rows().data();
    var formatamountPaid;
    var amtPaid;
   
    for (var i = 0; i < listData.length; i++) {
        if(listData[i].includes("T-ANGS")){
            amtPaid = $('#id-amount-paid-tambah-teller' + listData[i][0]).val();
            formatamountPaid = accounting.formatMoney(amtPaid, '', 2, ',', '.');
            
            if ($('#id-amount-paid-tambah-teller' + listData[i][0]).val() > amt_due_decN){
                console.log("paid: " + amtPaid);
                console.log("due: " + amt_due_decN);

                formatamountPaid = accounting.formatMoney(amt_due_decN, '', 2, ',', '.');
                $('#id-amount-paid-tambah-teller' + listData[i][0] + '').val(formatamountPaid);
                var amt_decline = parseFloat(amtPaid) - parseFloat(amt_due_decN);
                amount_paidtab_rvt = '<input id="id-amount-paid-tambah-teller' + n+ '" type="text" value="' + accounting.formatMoney(amt_decline, '', 2, ',', '.') + '" class="form-control amount-paid-tambah-teller inp-number-rvt" disabled>';
                amount_due_datetab_rvt = '<input class="inp-number-rvt" id="id-amount-duedate-tambah-teller' + n + '" type="text" value="' + accounting.formatMoney(amt_decline, '', 2, ',', '.') + '" class="form-control amount-duedate-tambah-teller" disabled>';
                // console.log(amt_decline);
                var aksi = "<a class='btn btn-transparent btn-xs tooltips btn-delete-teller-entry' data-placement='top' data-toggle='tooltip' data-original-title='Remove'><i class='fa fa-times fa fa-white'></i></a>";
                if (tambah_decline === '') {
                    table_data_tlr_entry.row.add([
                        n,
                        listData[i][1], //cont no
                        'T-PDP.OP-4',
                        listData[i][3], //inst no
                        'PENDAPATAN DECLAIN N',
                        'PENDAPATAN DECLAIN N',
                        amount_due_datetab_rvt, //accounting.formatMoney(amt_decline, '', 2, ',', '.'),
                        amount_paidtab_rvt,
                        listData[i][8], //fin type
                        aksi,
                        listData[i][10], //cont id
                        n
                    ]).draw(false);
                    nomer_tambah_decline = n;
                    n++;
                    tambah_decline = '1';
                } else {
                    $('#id-amount-paid-tambah-teller' + nomer_tambah_decline + '').val(accounting.formatMoney(amt_decline, '', 2, ',', '.'));
                    $('#id-amount-duedate-tambah-teller' + nomer_tambah_decline + '').val(accounting.formatMoney(amt_decline, '', 2, ',', '.'));
                }
        } 
        }  
    } 
    var detail_table = table_data_tlr_entry.data();
        total_amt_teller_entry = 0;
        var paye_tot = accounting.unformat($('#id-total-paye-tellerEntry').val());
        var change_tot = 0;
        for (var i = 0; i < detail_table.length; i++) {
            var amtet;

            amtet = accounting.unformat($('#id-amount-paid-tambah-teller' + detail_table[i][0]).val());

            total_amt_teller_entry += parseFloat(amtet);
            
            $('#id-total-amount-tellerEntry').val(accounting.formatMoney(total_amt_teller_entry, '', 2, ',', '.'));
        }
        if (paye_tot != 0) {
            // console.log(total_amt_teller_entry, paye_tot);
            change_tot = parseFloat(paye_tot) - parseFloat(total_amt_teller_entry);
            // console.log(change_tot);
            $('#id-total-change-tellerEntry').val(accounting.formatMoney(change_tot, '', 2, ',', '.'));
    }