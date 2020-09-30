var inp_branch_dp_id = $('#slc-dp-branch').val();
var inp_tgl_awal = $('#inp-tgl-awal-dp-customer').val();
var inp_tgl_akhir = $('#inp-tgl-akhir-dp-customer').val();
var inp_cust_kontrak = $('#inp-dp-cust-kontrak-nama').val();
var slc_customer_class_code = $('#slc-dp-customer-class-code').val();
var branch_code_dp = $('#hdn-dp-branch-code').val();
var branch_name_dp = $('#hdn-dp-branch-name').val();
$('#id-form-saldo-buffer').hide();
var transaction_code = '';
var tot_amount = '';
var amount_sv_cust = '';
var alamat_sv_cust = '';
var nama_sv_cust = '';
var amount = '';
var contract_no = '';
var p_menu = 'DRPA';
var p_button = '';
var p_user = '';
var p_ipaddr = '';
var flag_search_dp = '';
var check_lenght;
var radio_val;
var list_data;
var pdc_due_date_pv;
var pay_type_dp_cust = '';
var p_pdc_no = '';
var p_total_amount = '';
var p_due_date = '';
var p_inkaso = '';
var p_bank_id = '';
var p_bank_branch = '';
var flag_form_dplain = 0;
$('#inp-dp-cust-total').val(0);
var total_amt_cust_dp = parseInt($('#inp-dp-cust-total').val());
var table_dp_customer = $('#table-dp-customer').DataTable({
    "scrollY": "300px",
    "scrollCollapse": true,
    "paging": false,
    "columnDefs": [{
            "width": "8%",
            "targets": 0
        },
        {
            "width": "10%",
            "targets": 1
        },
        {
            "width": "20%",
            "targets": 2
        },
        {
            "width": "25%",
            "targets": 3
        },
        {
            "width": "10%",
            "targets": 4
        },
    ]
});
table_dp_customer.clear().draw();

var table_dp_search_customer = $('#table-dp-search-customer').DataTable({
    responsive: true

});

// var table_dp_titip_nt = $('#table-dp-titip-nt').DataTable({
//     "scrollY": "300px",
//     "scrollCollapse": true,
//     "paging": false,
//     "columnDefs": [{
//             "width": "8%",
//             "targets": 0
//         },
//         {
//             "width": "10%",
//             "targets": 1
//         },
//         {
//             "width": "20%",
//             "targets": 2
//         },
//         {
//             "width": "25%",
//             "targets": 3
//         },
//         {
//             "width": "10%",
//             "targets": 4
//         },
//     ]
// });

//========================================== VALIDASI INPUTAN HANYA ANGKA ===================================================//
var validasi_input_dp = ['#inp-jumlah-form-dp-lain'];
$('#div-jumlah-lain').on('keydown', validasi_input_dp, function(e) {
    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
});

//========================================== FUNCTION UNTUK VALIDASI MAX DATE 30 HARI ===================================================//
$('#div-tgl-awal-cust-dp').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
}).on("dp.change", function(e) {
    var date = e.date;
    var dDate = date._d;
    var new_date = new Date(dDate);
    new_date.setDate(new_date.getDate() + 30);

    $('#div-tgl-akhir-cust-dp').data("DateTimePicker").minDate(dDate);

    if (new_date > new Date(today)) {
        new_date = new Date(today);
    }
    //console.log(new_date, today);

    $('#div-tgl-akhir-cust-dp').data("DateTimePicker").maxDate(new_date);
    $('#div-tgl-akhir-cust-dp').data("DateTimePicker").date(new_date);

});

$('#div-tgl-akhir-cust-dp,#div-tgl-akhir-cabang-dp').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
});

//=============================================== HAK AKSES ============================================================//

var role_dpc = '';
var role_code_dpc = '';
$('#btn-tambah-dp-lain').prop("disabled", true);
if (!localStorage.getItem('role_user_dpc')) {
    $.ajax({
        url: base_url + "Controller_home/get_detail_user",
        cache: false,
        async: false,
        success: function(response) {
            console.log(response);
            localStorage.setItem('role_user_dpc', response);
            role_dpc = $.parseJSON(localStorage.getItem('role_user_dpc'));
            console.log(role_dpc);
        },
        error: function(response) {
            console.log(response);
        }
    });
} else {
    role_dpc = $.parseJSON(localStorage.getItem('role_user_dpc'));
    console.log(role_dpc);
}

$.each(role_dpc, function(i) {
    console.log(role_dpc[i]['role_code']);
    if (role_dpc[i]['role_code'] === 'SBMT_DPC') {
        role_code_dpc = role_dpc[i]['role_code'];
        console.log('submit')
        $('#btn-save-dp-cust, #btn-save-dp-cabang, #btn-save-dp-lain, #id-btn-tambah-dp-lain').prop('disabled', false);
        $('#btn-tambah-dp-lain').show();
        return false;

    } else if (role_dpc[i]['role_code'] === 'VIEW_DPC') {
        role_code_dpc = role_dpc[i]['role_code'];
        console.log('view');
        $('#btn-save-dp-cust, #btn-save-dp-cabang, #btn-save-dp-lain, #id-btn-tambah-dp-lain, #btn-print-dp-lain').prop('disabled', true);
        $('#btn-tambah-dp-lain').hide();
        return false;
    }
});

//========================================== FUNCTION BTN LOAD PV ===================================================//
$('#btn-loadpv-dp-cust').click(function() {
    if (check_session() === 'true') {
        localStorage.setItem("menu", "load_pv_trade");
        localStorage.setItem("nomor_pv", $('#inp-dp-cust-nomor-pv').val());
        localStorage.setItem("branch_id", $('#slc-dp-branch').val());
        var no_pdc_dp = $('#inp-pdc-pv-cust').val();
        if (no_pdc_dp === '') {
            no_pdc_dp = '';
        } else {
            no_pdc_dp = $('#inp-pdc-pv-cust').val();
        }
        localStorage.setItem("nomor_pdc", no_pdc_dp);
        localStorage.setItem("payment_type", $('input[name="payment-type-dp-cust"]:checked').val());
        window.location.replace(base_url + 'Controller_payment_voucher_trade/');
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }

});

//========================================== FUNCTION TAB CUSTOMER ON CLICK ===================================================//
$("#id-tab-dp-customer").click(function() {
    localStorage.setItem("menu", "draft_payment_cust");
    $('#radio-pv-cash-cabang').prop('checked', true);
    //$('#inp-pdc-pv-cabang').prop('checked', false);
    $('#inp-pdc-pv-cabang').val('');
    $('#inp-pdc-pv-lain').val('');
    $('.btn-add-pdc-pv').prop('disabled', true);
    //table_dp_titip_nt.destroy();
    clear_draft_payment();
});

//========================================== KONDISI KETIKA MEMBUKA MENU DPC ===================================================//
if ($('#id-main-form-dp-customer').length) {
    localStorage.clear();
    branch_code_dp = $('#hdn-dp-branch-code').val();
    branch_name_dp = $('#hdn-dp-branch-name').val();
    get_class_code_customer();
    if (branch_code_dp !== '0000') {
        $('#slc-dp-branch').prop('disabled', true);
        $('<option/>').val(branch_code_dp).html(branch_code_dp + ' - ' + branch_name_dp).appendTo('#slc-dp-branch');
    } else {
        get_data_branch('#slc-dp-branch');
    }
};


//========================================== FUNCTION BTN ONCLICK CLEAR ===================================================//
$('#btn-clear-dp-cust').click(function() {
    if (check_session() === 'true') {
        clear_draft_payment();
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

//========================================== FUNCTION BTN SAVE ===================================================//
$("#btn-save-dp-cust").click(function() {
    if (check_session() === 'true') {
        flag_search_dp = 'save_cust';
        check_lenght = $('#table-dp-customer').find('.check-dp').filter(':checked').length;
        console.log(check_lenght);
        list_data = table_dp_customer.data();
        console.log(list_data);

        radio_val = $('input[name="payment-type-dp-cust"]:checked').val();
        var inp_pdc_pv_cust = $('#inp-pdc-pv-cust').val();
        p_button = 'SAVE';
        var total_cust_dp = $('#inp-dp-cust-total').val();
        inp_cust_kontrak = $('#inp-dp-cust-kontrak-nama').val();
        slc_customer_class_code = $('#slc-dp-customer-class-code').val();

        console.log(radio_val);
        if (radio_val === 'C') {
            if (check_lenght === 0) {
                alert_error('Pilih data yang akan dibuatkan PV terlebih dahulu !');
            } else {
                alert_confirm('Apakah anda yakin ingin menyimpan data ?', function() {
                    console.log('door');
                    save_data_customer_dp();
                }); //alert confirm  
            }

            $('#div-pdc-pv-cust').removeClass('has-error');
        } else {
            if (inp_pdc_pv_cust === null || inp_pdc_pv_cust === '') {
                alert_error('Dimohon untuk mengisi nomor PDC terlebih dahulu');
                $('#div-pdc-pv-cust').addClass('has-error');
            } else {
                $('#div-pdc-pv-cust').removeClass('has-error');
                if (check_lenght === 0) {
                    alert_error('Pilih data yang akan dibuatkan PV terlebih dahulu !');
                } else {
                    alert_confirm('Apakah anda yakin ingin menyimpan data ?', function() {
                        save_data_customer_dp_pdc();
                    }); //alert confirm 
                }
            } // IF NO PDC NULL
        }
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }




});

//========================================== FUNCTION ON CHANGE CABANG ===================================================//
$('#slc-dp-branch').change(function() {
    console.log('cabang change');
    inp_branch_dp_id = $('#slc-dp-branch').val();
    slc_customer_class_code = $('#slc-dp-customer-class-code').val();
    if (inp_branch_dp_id !== '') {
        if (slc_customer_class_code === 'B-PIUT.BC' || slc_customer_class_code === 'B-PIUT.BC-RF') {
            console.log('buffer cash');
            get_saldo_buffercash();
            $('#id-main-form-dp-customer').removeClass('has-error');
            $('#id-form-saldo-buffer').show();
        } else {
            $('#id-form-saldo-buffer').hide();
        }
    }else{
        alert_warning('Mohon untuk memilih cabang terlebih dahulu');
        $('#id-main-form-dp-customer').addClass('has-error');
    }

});

//========================================== FUNCTION RADIO BUTTON PAYMENT TYPE ===================================================//
$('input[name="payment-type-dp-cust"]').click(function() {
    if (this.value == 'C') {
        $('.btn-add-pdc-pv').prop('disabled', true);
        $('#inp-pdc-pv-cust').val('');
        pay_type_dp_cust = this.value;
        console.log(pay_type_dp_cust);

    } else if (this.value == 'G') {
        $('.btn-add-pdc-pv').prop('disabled', false);
        pay_type_dp_cust = this.value;
        console.log(pay_type_dp_cust);
    }

});


//========================================== FUNCTION CLICK BUTTON ADD PDC PV ===================================================//
$('.btn-add-pdc-pv').click(function() {
    if (check_session() === 'true') {
        console.log(flag_search_pdc_dpc);
        if (flag_search_pdc_dpc == 0) {
            $('#inp-pdc-no-mdl').val('');
            $('#inp-due-date-mdl').val('');
            $('#inp-bank-branch-mdl').val('');
            $('#chk-inkaso-pdc-dr').prop('checked', false);
            inp_branch_dp_id = $('#slc-dp-branch').val();
            get_bank_pdc(inp_branch_dp_id, '0');
        } else if (flag_search_pdc_dpc == 1) {
            //jika search pdc detail pada tab lain
            $("#modal-pdc").modal({
                show: true,
                backdrop: 'static'
            });
        }

    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }

});

//========================================== FUNCTION BUTTON DISPLAY ===================================================//
$('#btn-dp-customer-display').click(function() {
    if (check_session() === 'true') {
        flag_search_dp = 'search_cust';
        console.log(flag_search_dp);
        inp_cust_kontrak = $('#inp-dp-cust-kontrak-nama').val();
        inp_tgl_awal = $('#inp-tgl-awal-dp-customer').val();
        inp_tgl_akhir = $('#inp-tgl-akhir-dp-customer').val();
        slc_customer_class_code = $('#slc-dp-customer-class-code').val();
        inp_branch_dp_id = $('#slc-dp-branch').val();
        console.log(inp_branch_dp_id);
        if (slc_customer_class_code == 'B-UM.PK') {
            if (inp_cust_kontrak === '') {
                $('#div-kontrak-nama-dp-cust').addClass('has-error');
                alert_warning('Mohon untuk mengisi nomor kontrak');
            } else if (inp_cust_kontrak !== '' && inp_cust_kontrak.length !== 12) {
                $('#div-kontrak-nama-dp-cust').addClass('has-error');
                alert_warning('Mohon untuk mengisi nomor kontrak 12 digit angka');
            } else if (slc_customer_class_code !== '' && inp_cust_kontrak !== '') {
                $('#id-main-form-dp-customer').removeClass('has-error');
                $('#div-class-code-dp-cust').removeClass('has-error');
                $('#div-tgl-awal-cust-dp').removeClass('has-error');
                $('#div-tgl-akhir-cust-dp').removeClass('has-error');
                $('#div-kontrak-nama-dp-cust').removeClass('has-error');
                get_data_customer_dp();
            }

        } else {
            if (inp_branch_dp_id === '') {
                alert_warning('Mohon untuk memilih cabang terlebih dahulu');
                $('#id-main-form-dp-customer').addClass('has-error');
            } else if (slc_customer_class_code === '') {
                alert_warning('Mohon untuk memilih class code terlebih dahulu');
                $('#div-class-code-dp-cust').addClass('has-error');
            } else if (inp_tgl_awal !== '' && inp_tgl_akhir !== '') {
                if (inp_cust_kontrak === '') {
                    $('#div-kontrak-nama-dp-cust').addClass('has-error');
                    alert_warning('Mohon untuk mengisi nomor kontrak');
                } else {
                    $('#id-main-form-dp-customer').removeClass('has-error');
                    $('#div-class-code-dp-cust').removeClass('has-error');
                    $('#div-tgl-awal-cust-dp').removeClass('has-error');
                    $('#div-tgl-akhir-cust-dp').removeClass('has-error');
                    $('#div-kontrak-nama-dp-cust').removeClass('has-error');
                    get_data_customer_dp();
                }
            } else if (inp_cust_kontrak === '') {
                $('#div-kontrak-nama-dp-cust').addClass('has-error');
                alert_warning('Mohon untuk mengisi nomor kontrak');
            } else {
                $('#id-main-form-dp-customer').removeClass('has-error');
                $('#div-class-code-dp-cust').removeClass('has-error');
                $('#div-tgl-awal-cust-dp').removeClass('has-error');
                $('#div-tgl-akhir-cust-dp').removeClass('has-error');
                $('#div-kontrak-nama-dp-cust').removeClass('has-error');
                get_data_customer_dp();

            }


        }

    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }

});

//========================================== FUNCTION ON CHANGE CLASS CODE ===================================================//
$('#slc-dp-customer-class-code').change(function() {
    slc_customer_class_code = $('#slc-dp-customer-class-code').val();
    inp_dp_saldo_buffer_cash = $('#inp-dp-saldo-buffer-cash').val();
    console.log(slc_customer_class_code);
    if (slc_customer_class_code === 'B-TITIP') {
        $('#inp-tgl-awal-dp-customer').prop('disabled', false);
        $('#inp-tgl-akhir-dp-customer').prop('disabled', false);
        transaction_code = 'PPA06';
        $('#id-form-saldo-buffer').hide();
    } else if (slc_customer_class_code === 'B-UM.PK') {
        $('#inp-tgl-awal-dp-customer').prop('disabled', true);
        $('#inp-tgl-akhir-dp-customer').prop('disabled', true);
        $('#inp-tgl-awal-dp-customer').val('');
        $('#inp-tgl-akhir-dp-customer').val('');
        $('#id-form-saldo-buffer').hide();
        transaction_code = '';
    } else if (slc_customer_class_code === 'B-PS.AS') {

        transaction_code = 'PPA45';
        $('#id-form-saldo-buffer').hide();
    } else if (slc_customer_class_code === 'B-KL.AS') {
        $('#inp-tgl-awal-dp-customer').prop('disabled', false);
        $('#inp-tgl-akhir-dp-customer').prop('disabled', false);
        transaction_code = 'PPA03';
        $('#id-form-saldo-buffer').hide();
    } else if (slc_customer_class_code === 'B-R.AS') {
        $('#inp-tgl-awal-dp-customer').prop('disabled', false);
        $('#inp-tgl-akhir-dp-customer').prop('disabled', false);
        transaction_code = 'PPA05';
        $('#id-form-saldo-buffer').hide();
    } else if (slc_customer_class_code === 'B-KL.AS.R') {
        $('#inp-tgl-awal-dp-customer').prop('disabled', false);
        $('#inp-tgl-akhir-dp-customer').prop('disabled', false);
        transaction_code = 'PPA27';
        $('#id-form-saldo-buffer').hide();
    } else if (slc_customer_class_code === 'B-R.AS.R') {
        $('#inp-tgl-awal-dp-customer').prop('disabled', false);
        $('#inp-tgl-akhir-dp-customer').prop('disabled', false);
        transaction_code = 'PPA07';
        $('#id-form-saldo-buffer').hide();
    } else if (slc_customer_class_code === 'B-PIUT.BC' || slc_customer_class_code === 'B-PIUT.BC.RF') {
        $('#inp-tgl-awal-dp-customer').prop('disabled', false);
        $('#inp-tgl-akhir-dp-customer').prop('disabled', false);
        transaction_code = '';
        // var saldo_buffer = $('#id-form-saldo-buffer').val();
        inp_branch_dp_id = $('#slc-dp-branch').val();
        if (inp_branch_dp_id === '') {
            alert_warning('Mohon untuk memilih cabang terlebih dahulu');
            $('#id-main-form-dp-customer').addClass('has-error');
            $('#id-form-saldo-buffer').hide();
        } else if (inp_branch_dp_id !== '') {
            if (inp_dp_saldo_buffer_cash !== '') {
                $('#id-main-form-dp-customer').removeClass('has-error');
                $('#id-form-saldo-buffer').show();
            } else {
                get_saldo_buffercash();
                $('#id-main-form-dp-customer').removeClass('has-error');
                $('#id-form-saldo-buffer').show();
            }

        }


    } else {
        transaction_code = '';
        $('#id-form-saldo-buffer').hide();
    }
});
//CR B-TITIP
//========================================== FUNCTION ROW THIS DATA UNTUK TABLE CUSTOMER ===================================================//
$('#table-dp-customer').on('focus', '.amount-dp-titip', function() {
    var check_len = (this.id).length;
    console.log(check_len);
    var check_id = (this.id).substr(6, check_len);
    console.log(check_id);  
    var a =  accounting.unformat($('#amt-dp'+check_id).val());
    $('#amt-dp'+check_id).val(a); 

    $('#amt-dp'+check_id).on('blur',function(){
        console.log(check_id);
        var a =  accounting.formatMoney($('#amt-dp'+check_id).val(), '', 2, ',', '.');

        $('#amt-dp'+check_id).val(a);
    });

});

//========================================== FUNCTION TOTAL AMOUNT UNTUK TABLE CUSTOMER ===================================================//
$('#table-dp-customer').on('click', '.check-dp', function() {
    var check_len = (this.id).length;
    console.log(check_len);
    var check_id = (this.id).substr(9, check_len);
    data_dp = table_dp_customer.rows().data();
    slc_customer_class_code = $('#slc-dp-customer-class-code').val();
    //CR B-TITIP
    var angka;
    if (slc_customer_class_code == 'B-TITIP'){
        angka = accounting.unformat($('#amt-dp'+check_id).val());
    } else {
        angka = accounting.unformat(data_dp[check_id][4]);
    }
    console.log(total_amt_cust_dp + ' ' + angka);
    console.log(data_dp.length);
    var jml_data_cek = $('input.check-dp:checked').length;
    console.log(jml_data_cek);
    //untuk issue bila cuma ada 1 row diceklist ,cek all harus terceklist
    if (data_dp.length == 1) {

        if ($('#check-dp-' + check_id).is(':checked')) {
            console.log('angka : ' + angka);
            total_amt_cust_dp += parseFloat(angka);
            console.log(total_amt_cust_dp);
            $('#inp-dp-cust-total').val(accounting.formatMoney(total_amt_cust_dp, '', 2, ',', '.')); // total_amt_cust_dp
            $('#checkbox-dp-cust').prop('checked', true);
            $('#amt-dp'+check_id).prop('disabled', true);
            id_amt_titip = '#amt-dp'+check_id;
            console.log(id_amt_titip);
        } else {
            total_amt_cust_dp -= parseFloat(angka);
            $('#inp-dp-cust-total').val(accounting.formatMoney(total_amt_cust_dp, '', 2, ',', '.'));
            console.log(total_amt_cust_dp);
            $('#checkbox-dp-cust').prop('checked', false);
            $('#amt-dp'+check_id).prop('disabled', false);
            id_amt_titip = '#amt-dp'+check_id;
        }

    } else {
        if (data_dp.length == jml_data_cek) {
            $('#checkbox-dp-cust').prop('checked', true);
        } else {
            $('#checkbox-dp-cust').prop('checked', false);
        }

        if ($('#check-dp-' + check_id).is(':checked')) {
            console.log('angka : ' + angka);
            total_amt_cust_dp += parseFloat(angka);
            $('#inp-dp-cust-total').val(accounting.formatMoney(total_amt_cust_dp, '', 2, ',', '.')); // total_amt_cust_dp
            $('#amt-dp'+check_id).prop('disabled', true);
            id_amt_titip = '#amt-dp'+check_id;
        } else {
            total_amt_cust_dp -= parseFloat(angka);
            $('#inp-dp-cust-total').val(accounting.formatMoney(total_amt_cust_dp, '', 2, ',', '.'));
            console.log(total_amt_cust_dp);
            $('#amt-dp'+check_id).prop('disabled', false);
            id_amt_titip = '#amt-dp'+check_id;
        }


    }




});

//========================================== FUNCTION CHECK ALL TABLE CUSTOMER ===================================================//
$('#checkbox-dp-cust').click(function() {
    //var cust_dp = table_dp_customer.data();
    var cust_dp = table_dp_customer.rows( { filter : 'applied'} ).data();
    var tot = 0;
    console.log(cust_dp);
    for (var i = 0; i < cust_dp.length; i++) {
        $('#inp-dp-cust-total').val(0);
        if ($('#checkbox-dp-cust').is(":checked")) {
            $('.check-dp').prop('checked', true);
            //CR B-TITIP
            slc_customer_class_code = $('#slc-dp-customer-class-code').val();
            var amount_cust;
            if (slc_customer_class_code == 'B-TITIP'){
                amount_cust = accounting.unformat($('#amt-dp'+i).val());
            } else {
                amount_cust = accounting.unformat(cust_dp[i][4]); 
            }
            //var amount_cust = accounting.unformat(cust_dp[i][4]); 
            //var amount_cust = accounting.unformat($('#amt-dp'+i).val());
            $('#amt-dp'+i).prop('disabled', true);
            id_amt_titip = '#amt-dp'+i;
            console.log(amount_cust);
            tot += parseInt(amount_cust);
            console.log(tot);
        } else {
            $('.check-dp').prop('checked', false);
            $('#amt-dp'+i).prop('disabled', false);
            id_amt_titip = '#amt-dp'+i;
        }
        if (i + 1 === cust_dp.length) {
            $('#inp-dp-cust-total').val(accounting.formatMoney(tot, '', 2, ',', '.'));
            total_amt_cust_dp = tot;
        }
    }

});

//========================================== FUNCTION KETIK NO KONTRAK ENTER =========================================//
$("#inp-dp-cust-kontrak-nama").keypress(function(e) {
    var key = e.which;
    if (key == 13) // the enter key code
    {
        $('#btn-dp-customer-display').click();
        $('#inp-dp-lain-regno').trigger('focus');
        return false;
    }

});


//========================================== FUNCTION CLEAR DPC ===================================================//
function clear_draft_payment() {
    $('.res-global').val('');
    $('.res-select').prop('selectedIndex', 0);
    $('#btn btn-inline btn-primary btn-reset').prop('disabled', true);
    $('#div-kontrak-nama-dp-cust').removeClass('has-error');
    $('#inp-tgl-awal-dp-customer').val('');
    $('#inp-tgl-akhir-dp-customer').val('');
    $('#inp-tgl-awal-dp-cabang').val('');
    $('#inp-tgl-akhir-dp-cabang').val('');
    table_dp_customer.clear().draw();
    table_dp_cabang_bpiut_adp.clear().draw();
    $('#checkbox-dp-cust').prop('checked', false);
    $('#checkbox-dp-cabang').prop('checked', false);
    $('#id-form-saldo-buffer').hide();
    $('#btn-loadpv-dp-cust').prop('disabled', true);
    var bank_pdc_dp = $('#slc-bank-iss-mdl').val();
    console.log(bank_pdc_dp);
    //kalo bank issued pdc nya null,maka jalankan get bank pdc
    if (bank_pdc_dp == null) {
        flag_search_pdc_dpc = 0;
    } else {
        flag_search_pdc_dpc = 1;
    }

    $('#radio-pv-cash-cust').prop('checked', true);
    $('#slc-dp-cabang-nama').prop('disabled', true);
    $('#slc-dp-cabang-nama').empty();
    $('#radio-pdc-cust').prop('disabled', true);
    $('#table-cabang-dp').show();
    $('#table-titip-nt-dp').hide();
    $('#dp-option-nama').show();
    $('#dp-text-nama').hide();
    $('#id-dp-cabang-tanggal-ppd').show();
    $('#id-dp-tipe-objek').show();
    table_dp_titip_nt.clear().draw();
    $('#div-tipe-pembayaran-dp-cabang').css('margin-bottom', '81px');
    if ($.fn.DataTable.isDataTable('#table-dp-b-piut-adp')) {
        $('#table-dp-b-piut-adp').DataTable().destroy();
    }
    table_dp_cabang_bpiut_adp = $('#table-dp-b-piut-adp').DataTable({
        "scrollY": "300px",
        "scrollCollapse": true,
        "paging": false,
        "columnDefs": [{
                "width": "8%",
                "targets": 0
            },
            {
                "width": "10%",
                "targets": 1
            },
            {
                "width": "20%",
                "targets": 2
            },
            {
                "width": "25%",
                "targets": 3
            },
            {
                "width": "10%",
                "targets": 4
            },
        ]
    });
    //table_dp_titip_nt.destroy();
};


//========================================== FUNCTION GET CLASS CODE CUSTOMER ===================================================//
function get_class_code_customer() {
    if ($("#id-main-form-dp-customer").length) {
        $.ajax({
            url: "Controller_draft_payment/get_classcode_customer",
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function(response) {
                if (response) {
                    try {
                        console.log(response['data']);
                        $('<option/>').val('').html('--SILAHKAN PILIH--').appendTo('#slc-dp-customer-class-code').addClass('form-control');
                        $.each(response['data'], function(list) {

                            $('#slc-dp-customer-class-code').append('<option value="' + this['acct_interface_group'] + '">' + this['acct_interface_group'] + ' - ' + this['acct_brief_desc'] + '</option>');
                        });
                    } catch (e) {
                        $('#loading-ajax').hide();
                        alert_error("Terjadi Kesalahan Get Class Code Customer");
                    }
                } //if response

            },

            error: function(response) {
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });

    }
};


//========================================== FUNCTION GET DATA  ===================================================//
function get_data_customer_dp() {
    var p_exec = '';
    var p_br_id_exec = '';
    if (flag_search_dp === 'search_cust') {
        console.log(flag_search_dp);
        inp_branch_dp_id = $('#slc-dp-branch').val();
        inp_tgl_awal = $('#inp-tgl-awal-dp-customer').val();
        inp_tgl_akhir = $('#inp-tgl-akhir-dp-customer').val();
        inp_cust_kontrak = $('#inp-dp-cust-kontrak-nama').val();
        slc_customer_class_code = $('#slc-dp-customer-class-code').val();
        slc_dp_cabang_tipe_objek = '';
        p_exec = '';
        p_br_id_exec = '';
    } else {
        slc_customer_class_code = $('#slc-dp-cabang-class-code').val();
        inp_branch_dp_id = $('#slc-dp-branch').val();
        if (slc_customer_class_code == 'B-TITIP.NT') {
            console.log('B-TITIP.NT');
        } else {
            console.log(flag_search_dp);
            console.log(list_obj_group_dpc);
            inp_branch_dp_id = $('#slc-dp-branch').val();
            inp_tgl_awal = $('#inp-tgl-awal-dp-cabang').val();
            inp_tgl_akhir = $('#inp-tgl-akhir-dp-cabang').val();
            inp_cust_kontrak = '';
            //slc_dp_cabang_tipe_objek = $('#slc-dp-cabang-tipe-objek').val();
            slc_dp_cabang_tipe_objek = list_obj_group_dpc;
            var empl_code = $('#slc-dp-cabang-nama').val();
            p_exec = empl_code.substr(0, 4);
            p_br_id_exec = empl_code.substr(7, 10);
            console.log(empl_code);
            console.log(p_exec);
            console.log(p_br_id_exec);
        }

    }

    table_dp_customer.clear().draw();
    console.log(inp_branch_dp_id);
    $.ajax({
        url: base_url + "Controller_draft_payment/get_data_customer",
        type: 'POST',
        dataType: 'json',
        data: {
            "p_br_id": inp_branch_dp_id,
            "p_cust_dtstart": inp_tgl_awal,
            "p_cust_dtend": inp_tgl_akhir,
            "p_cont": inp_cust_kontrak,
            "p_class_code": slc_customer_class_code,
            "p_transcode": transaction_code,
            "p_object_group_code": slc_dp_cabang_tipe_objek,
            "p_exec": p_exec,
            "p_br_id_exec": p_br_id_exec

        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    $('#btn-loadpv-dp-cust').prop('disabled', true);
                    $('#inp-dp-cust-nomor-pv').val('');
                    $('#checkbox-dp-cust').prop('checked', false);
                    total_amt_cust_dp = 0;
                    $('#inp-dp-cust-total').val(0);
                    var data = (response['data_cust']['data']);
                    var status = response['data_cust']['status'];
                    console.log(data);
                    console.log(data.length);
                    console.log(status);
                    if (status == true) {
                        if (data.length > 0) {
                            if (flag_search_dp === 'search_cust') {
                                //UNTUK TABLE CUSTOMER
                                table_dp_customer.clear().draw();
                                //CR B-TITIP
                                if (slc_customer_class_code == 'B-TITIP') {
                                    // var deposit_amt = '<input type="text" class="form-control inp-number-dr amt-rvlain" maxlength="13" value="' + amt + '" id="amt-rvlain' + i + '">';
                                    $.each(data, function(index) {
                                        table_dp_customer.row.add([
                                            '<input type="checkbox" id= "check-dp-' + index + '" class="check-dp" >',
                                            this['contract_no'],
                                            this['customer_name'],
                                            this['alamat'],
                                            '<input type="text" class="inp-number-dp form-control amount-dp-titip"  value="' + accounting.formatMoney(this['dp_current_ball'], '', 2, ',', '.') + '" id="amt-dp' + index + '" name="">',
                                            //accounting.formatMoney(this['dp_current_ball'], '', 2, ',', '.')
                                        ]).draw(false);
                                    });
                                } else {
                                    
                                    $.each(data, function(index) {
                                        table_dp_customer.row.add([
                                            '<input type="checkbox" id= "check-dp-' + index + '" class="check-dp" >',
                                            this['contract_no'],
                                            this['customer_name'],
                                            this['alamat'],
                                            //this['dp_current_ball']
    
                                            accounting.formatMoney(this['dp_current_ball'], '', 2, ',', '.')
                                        ]).draw(false);
                                    });
                                }
                            } else {
                                $('#btn-loadpv-dp-cust').prop('disabled', true);
                                $('#inp-dp-cust-nomor-pv').val('');
                                $('#checkbox-dp-cust').prop('checked', false);

                                if (slc_customer_class_code == 'B-TITIP.NT') {

                                    table_dp_titip_nt.clear().draw();
                                    var data_arr = [];
                                    $.each(data, function(index) {
                                        var amount_dp = accounting.formatMoney(this['dp_current_ball'], '', 2, ',', '.');
                                        data_arr.push([
                                            '<input type="checkbox" id= "check-dp1-' + index + '" class="check-dp-cabang" value="'+amount_dp+'" >',
                                            this['document_no'],
                                            this['tanggal'],
                                            '99 - OTHER',
                                            accounting.formatMoney(this['dp_current_ball'], '', 2, ',', '.')
                                        ]);
                                    });
                                    console.log(data_arr);
                                    table_dp_titip_nt.rows.add(data_arr).draw(false);

                                } else {
                                    
                                    var data_dealer = response['data_cust']['dealer'];
                                    console.log(data_dealer);
                                    //accounting.unformat(total_amt_cabang_dp);
                                    console.log(total_amt_cabang_dp);
                                    total_amt_cabang_dp = 0;
                                    $('#inp-dp-cabang-total').val(0);
                                    table_dp_cabang_bpiut_adp.clear().draw();
                                    var deal_name = '';
                                    var deal_code = '';
                                    var deal_gab = '';

                                    $.each(data, function(index) {
                                        // console.log(deal_code,deal_name);
                                        var amount_dp = accounting.formatMoney(this['dp_current_ball'], '', 2, ',', '.');
                                        table_dp_cabang_bpiut_adp.row.add([
                                            '<input type="checkbox" id= "check-dp1-' + index + '" class="check-dp-cabang" value="'+amount_dp+'" >',
                                            this['contract_no'],
                                            this['customer_name'],
                                            this['dealername'], // this['alamat'],HARDCODE HARUS NGAMBIL KE PARAM UNTUK DAPATKAN NAMA DEALER
                                            //this['dp_current_ball']
                                            accounting.formatMoney(this['dp_current_ball'], '', 2, ',', '.')
                                        ]).draw(false);
                                    });
                                }
                            }

                        } //if data.length 
                        else {
                            alert_warning('DATA YANG ANDA CARI TIDAK DITEMUKAN');
                        }


                    } else {
                        alert_error(data);
                        console.log(data);
                    }

                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Terjadi Kesalahan Get Data Customer");
                }
            }
        },
        error: function(response) {
            console.log(response);
            if (response['responseText'] === "" && response['statusText'] === 'OK') {
                alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                    localStorage.clear();
                    window.location.href = base_url + "Controller_login/login_view";
                });
            }
        }
    });
}



// FUNCTION SAVE DP CASH
//========================================== FUNCTION SAVE DATA CASH ===================================================//
function save_data_customer_dp() {
    var nomor_pv = '';

    if (flag_search_dp === 'save_cust') {
        console.log(flag_search_dp);
        inp_branch_dp_id = $('#slc-dp-branch').val();
        slc_customer_class_code = $('#slc-dp-customer-class-code').val();
        p_total_amount = $('#inp-dp-cust-total').val();
        p_total_amount_cust = accounting.unformat(p_total_amount);
        console.log(p_total_amount_cust);
        console.log(empl_npk_cab);
        console.log(empl_name_cab);
        console.log(check_lenght);
        console.log(list_data);
        console.log(radio_val);
        var data_arr = [];
        //CR B-TITIP
        if (slc_customer_class_code == 'B-TITIP') {

            for (var i = 0; i < list_data.length; i++) {
                if ($('#check-dp-' + i).is(":checked")) {
                    var unformat_ammount = accounting.unformat(list_data[i][4]);
                    console.log(list_data[i][4]);
                    var str = list_data[i][4];
                    var id_amount = str.substring(str.indexOf('amt-dp')+6, str.indexOf('\" name'));
                    console.log(id_amount);
                    var val_amount = accounting.unformat($('#amt-dp'+id_amount).val());
                    data_arr.push({
                        contract_no: list_data[i][1],
                        nama_sv_cust: list_data[i][2],
                        alamat_sv_cust: list_data[i][3],
                        amount_sv_cust: val_amount
                    });
                }
            }
        } else {
            for (var i = 0; i < list_data.length; i++) {
                if ($('#check-dp-' + i).is(":checked")) {
                    var unformat_ammount = accounting.unformat(list_data[i][4])
                    data_arr.push({
                        contract_no: list_data[i][1],
                        nama_sv_cust: list_data[i][2],
                        alamat_sv_cust: list_data[i][3],
                        amount_sv_cust: unformat_ammount
                    });
                }
            }
        }

        console.log(data_arr);
        empl_npk_cab = '';
        empl_name_cab = '';
        $.ajax({
            url: base_url + "Controller_draft_payment/save_data_customer",
            type: 'POST',
            dataType: 'json',
            data: {
                "p_br_id": inp_branch_dp_id,
                "p_payment_type": radio_val,
                "p_class_code": slc_customer_class_code,
                "p_empl_npk": empl_npk_cab,
                "p_empl_name": empl_name_cab,
                "p_total_amount": p_total_amount_cust,
                "data": data_arr
            },

            success: function(response) {
                console.log(response);
                console.log(response['success']);
                if (response) {
                    try {
                        var notif = response['notif'];
                        var result = response['result'];
                        if (result === false) {
                            var status_save = response['status'];
                            console.log(status_save);
                            console.log('gagal save');
                            alert_error(status_save);
                        } else {
                            console.log('berhasil save');
                            alert_info(response['success']);
                            nomor_pv = response['nomor_pv'];
                            console.log(nomor_pv);
                            $('#inp-dp-cust-nomor-pv').val(nomor_pv);
                            table_dp_customer.clear().draw();
                            $('#inp-dp-cust-kontrak-nama').val('');
                            $('#slc-dp-customer-class-code').prop('selectedIndex', 0);
                            $('#inp-dp-cust-total').val('');
                            $('#btn-loadpv-dp-cust').prop('disabled', false);
                            $('#checkbox-dp-cust').prop('checked', false);
                            total_amt_cust_dp = 0;
                            if (slc_customer_class_code === 'B-PIUT.BC') {
                                get_saldo_buffercash();
                            } else {
                                console.log('bukan buffer cash');
                            }

                        }

                    } catch (e) {
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error("Terjadi Kesalahan Pada Proses Save Data Customer");
                    }
                }
            },
            error: function(response) {
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });

    } else {
        console.log(flag_search_dp);
        inp_branch_dp_id = $('#slc-dp-branch').val();
        slc_customer_class_code = $('#slc-dp-cabang-class-code').val();
        p_total_amount = $('#inp-dp-cabang-total').val();
        p_total_amount_cust = accounting.unformat(p_total_amount);
        var empl_code = $('#slc-dp-cabang-nama').val();
        var p_br_id_exec = '';
        var data_arr = [];
        if (slc_customer_class_code == 'B-TITIP.NT') {
            $('#div-nama-dp-cabang').removeClass('has-error');
            empl_name_cab = $('#inp-dp-cabang-nama').val();
            console.log(inp_branch_dp_id);
            for (var i = 0; i < list_data.length; i++) {
                if ($('#check-dp1-' + i).is(":checked")) {
                    var unformat_ammount = accounting.unformat(list_data[i][4])
                    console.log(unformat_ammount);
                    data_arr.push({
                        no_ref: list_data[i][1],
                        amount_sv_cust: unformat_ammount
                    });
                }
            }

        } else {
            p_br_id_exec = empl_code.substr(7, 10);
            empl_npk_cab = $('#hdn-dpcabang-empl-code').val();
            empl_name_cab = $('#hdn-dpcabang-empl-name').val();
            console.log(empl_code);
            console.log(p_br_id_exec);
            console.log(empl_npk_cab);
            console.log(empl_name_cab);
            for (var i = 0; i < list_data.length; i++) {
                if ($('#check-dp1-' + i).is(":checked")) {
                    var unformat_ammount = accounting.unformat(list_data[i][4])
                    console.log(unformat_ammount);
                    data_arr.push({
                        contract_no: list_data[i][1],
                        nama_sv_cust: list_data[i][2],
                        alamat_sv_cust: list_data[i][3],
                        amount_sv_cust: unformat_ammount
                    });
                }
            }
        }
        console.log(p_total_amount);
        console.log(check_lenght);
        console.log(list_data);
        console.log(radio_val);
        console.log(data_arr);

        $.ajax({
            url: base_url + "Controller_draft_payment/save_data_customer",
            type: 'POST',
            dataType: 'json',
            data: {
                "p_br_id": inp_branch_dp_id,
                "p_payment_type": radio_val,
                "p_class_code": slc_customer_class_code,
                "p_empl_npk": empl_npk_cab,
                "p_empl_name": empl_name_cab,
                "p_total_amount": p_total_amount_cust,
                "p_br_id_exec": p_br_id_exec,
                "data": data_arr
            },

            success: function(response) {
                console.log(response);
                console.log(response['success']);
                if (response) {
                    try {
                        var status_save = response['data'];
                        var notif = response['notif'];
                        var result = response['result'];
                        console.log(status_save);
                        if (result === false) {
                            var error = response['status'];
                            console.log('gagal save');
                            alert_error(error);
                        } else {
                            console.log('berhasil save');
                            alert_info(response['success']);
                            nomor_pv = response['nomor_pv'];
                            console.log(nomor_pv);
                            $('#inp-dp-cabang-nomor-pv').val(nomor_pv);
                            table_dp_cabang_bpiut_adp.clear().draw();
                            $('#slc-dp-cabang-class-code').prop('selectedIndex', 0);
                            $('#inp-dp-cabang-total').val('');
                            $('#btn-loadpv-dp-cabang').prop('disabled', false);
                            $('#slc-dp-cabang-nama').prop('selectedIndex', 0);
                            $('#slc-dp-cabang-tipe-objek').prop('selectedIndex', 0);
                            $('#checkbox-dp-cabang').prop('checked', false);
                            total_amt_cust_dp = 0;
                            table_dp_titip_nt.clear().draw();
                            $('#inp-dp-cabang-nama').val('');
                        }

                    } catch (e) {
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error("Terjadi Kesalahan Pada Proses Save Data Customer");
                    }
                }
            },
            error: function(response) {
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });

    }

}

//========================================== FUNCTION SAVE DATA PDC ===================================================//
function save_data_customer_dp_pdc() {
    console.log('============= INSERT PDC =================');
    var pdc_number = '';
    if (flag_search_dp === 'save_cust') {
        var inp_pdc_pv_cust = $('#inp-pdc-pv-cust').val();
        console.log(flag_search_dp);
        inp_branch_dp_id = $('#slc-dp-branch').val();
        slc_customer_class_code = $('#slc-dp-customer-class-code').val();
        p_pdc_no = $('#inp-pdc-no-mdl').val();
        console.log(p_pdc_no);
        p_total_amount = $('#inp-dp-cust-total').val();
        // console.log(p_total_amount);
        p_total_amount_cust = accounting.unformat(p_total_amount);
        p_due_date = $('#inp-due-date-mdl').val();
        if ($('#chk-inkaso-pdc-dr').is(":checked")) {
            p_inkaso = '1';
        } else {
            p_inkaso = '0';
        }

        p_bank_id = $('#slc-bank-iss-mdl').val();
        p_bank_branch = $('#inp-bank-branch-mdl').val();
        console.log(p_total_amount_cust);
        console.log(p_due_date);
        console.log(p_bank_id);
        console.log(p_bank_branch);
        console.log(empl_npk_cab);
        console.log(empl_name_cab);
        console.log(check_lenght);
        console.log(list_data);
        console.log(radio_val);
        var data_arr = [];
        //CR B-TITIP
        if (slc_customer_class_code == 'B-TITIP') {
            for (var i = 0; i < list_data.length; i++) {
                if ($('#check-dp-' + i).is(":checked")) {
                    var unformat_ammount = accounting.unformat(list_data[i][4]);
                    console.log(list_data[i][4]);
                    var str = list_data[i][4];
                    var id_amount = str.substring(str.indexOf('amt-dp')+6, str.indexOf('\" name'));
                    console.log(id_amount);
                    var val_amount = accounting.unformat($('#amt-dp'+id_amount).val());
                    data_arr.push({
                        contract_no: list_data[i][1],
                        nama_sv_cust: list_data[i][2],
                        alamat_sv_cust: list_data[i][3],
                        amount_sv_cust: val_amount
                    });
                }
            }
        } else {
            for (var i = 0; i < list_data.length; i++) {
                if ($('#check-dp-' + i).is(":checked")) {
                    var unformat_ammount = accounting.unformat(list_data[i][4])
                    data_arr.push({
                        contract_no: list_data[i][1],
                        nama_sv_cust: list_data[i][2],
                        alamat_sv_cust: list_data[i][3],
                        amount_sv_cust: unformat_ammount
                    });
                }
            }
        }


        // for (var i = 0; i < list_data.length; i++) {
        //     if ($('#check-dp-' + i).is(":checked")) {
        //         var unformat_ammount = accounting.unformat(list_data[i][4])
        //         console.log(unformat_ammount);
        //         data_arr.push({
        //             contract_no: list_data[i][1],
        //             nama_sv_cust: list_data[i][2],
        //             alamat_sv_cust: list_data[i][3],
        //             amount_sv_cust: unformat_ammount
        //         });
        //     }
        // }
        console.log(data_arr);
        empl_npk_cab = '';
        empl_name_cab = '';
        $.ajax({
            url: base_url + "Controller_draft_payment/save_data_customer_pdc",
            type: 'POST',
            dataType: 'json',
            data: {
                "p_br_id": inp_branch_dp_id,
                "p_payment_type": radio_val,
                "p_class_code": slc_customer_class_code,
                "p_empl_npk": empl_npk_cab,
                "p_empl_name": empl_name_cab,
                "p_pdc_no": p_pdc_no,
                "p_total_amount": p_total_amount_cust,
                "p_due_date": p_due_date,
                "p_inkaso": p_inkaso,
                "p_bank_id": p_bank_id,
                "p_bank_branch": p_bank_branch,
                "data": data_arr
            },

            success: function(response) {
                console.log(response);
                console.log(response['nomor_pdc']);
                if (response) {
                    try {
                        var status_save = response['status'];
                        console.log(status_save);
                        if (status_save !== null) {
                            alert_error(response['status']);
                            $('#btn-loadpv-dp-cust').prop('disabled', true);
                        } else {
                            alert_info(response['nomor_pdc']);
                            pdc_number = response['pdc_number'];
                            console.log(pdc_number);
                            $('#inp-dp-cust-nomor-pv').val(pdc_number);
                            table_dp_customer.clear().draw();
                            $('#inp-dp-cust-kontrak-nama').val('');
                            $('#slc-dp-customer-class-code').prop('selectedIndex', 0);
                            $('#inp-dp-cust-total').val('');
                            $('#btn-loadpv-dp-cust').prop('disabled', false);
                            total_amt_cust_dp = 0;
                            if (slc_customer_class_code === 'B-PIUT.BC') {
                                get_saldo_buffercash();
                            } else {
                                console.log('bukan buffer cash');
                            }
                        }


                    } catch (e) {
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error("Terjadi Kesalahan Pada Proses Save Data Customer");
                    }
                }
            },
            error: function(response) {
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
            }
        });

    } else {
        console.log(flag_search_dp);
        var pdc_pv_cabang = $('#inp-pdc-pv-cabang').val();
        inp_branch_dp_id = $('#slc-dp-branch').val();
        slc_cabang_class_code = $('#slc-dp-cabang-class-code').val();
        p_pdc_no = $('#inp-pdc-no-mdl').val();
        console.log(p_pdc_no);
        p_total_amount = $('#inp-dp-cabang-total').val();
        // console.log(p_total_amount);
        p_total_amount_cabang = accounting.unformat(p_total_amount);
        p_due_date = $('#inp-due-date-mdl').val();
        if ($('#chk-inkaso-pdc-dr').is(":checked")) {
            p_inkaso = '1';
        } else {
            p_inkaso = '0';
        }

        p_bank_id = $('#slc-bank-iss-mdl').val();
        p_bank_branch = $('#inp-bank-branch-mdl').val();
        var empl_code = $('#slc-dp-cabang-nama').val();
        p_exec = empl_code.substr(0, 4);
        p_br_id_exec = empl_code.substr(7, 10);
        empl_npk_cab = $('#hdn-dpcabang-empl-code').val();
        empl_name_cab = $('#hdn-dpcabang-empl-name').val();
        console.log(p_total_amount_cabang);
        console.log(p_due_date);
        console.log(p_bank_id);
        console.log(p_bank_branch);
        console.log(empl_npk_cab);
        console.log(empl_name_cab);
        console.log(check_lenght);
        console.log(list_data);


        console.log(radio_val);
        if (pdc_pv_cabang === null || pdc_pv_cabang === '') {
            alert_error('Dimohon untuk mengisi nomor PDC terlebih dahulu');
            $('#div-pdc-pv-cabang').addClass('has-error');
        } else {
            $('#div-pdc-pv-cabang').removeClass('has-error');

            if (check_lenght === 0) {
                alert_error('Pilih data yang akan dibuatkan PV terlebih dahulu !');
            } else {

                var data_arr = [];
                for (var i = 0; i < list_data.length; i++) {
                    if ($('#check-dp1-' + i).is(":checked")) {
                        var unformat_ammount = accounting.unformat(list_data[i][4])
                        data_arr.push({
                            contract_no: list_data[i][1],
                            nama_sv_cust: list_data[i][2],
                            alamat_sv_cust: list_data[i][3],
                            amount_sv_cust: unformat_ammount
                            // amount: '100000'

                        });
                    }
                }
                console.log(data_arr);

                $.ajax({
                    url: base_url + "Controller_draft_payment/save_data_customer_pdc",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        "p_br_id": inp_branch_dp_id,
                        "p_payment_type": radio_val,
                        "p_class_code": slc_cabang_class_code,
                        "p_empl_npk": empl_npk_cab,
                        "p_empl_name": empl_name_cab,
                        "p_pdc_no": p_pdc_no,
                        "p_total_amount": p_total_amount_cabang,
                        "p_due_date": p_due_date,
                        "p_inkaso": p_inkaso,
                        "p_bank_id": p_bank_id,
                        "p_bank_branch": p_bank_branch,
                        "p_exec": p_exec,
                        "p_br_id_exec": p_br_id_exec,
                        "data": data_arr
                    },

                    success: function(response) {
                        console.log(response);
                        console.log(response['status']);
                        if (response) {
                            try {
                                var status_save = response['status'];
                                console.log(status_save);
                                if (status_save !== null) {
                                    alert_error(response['status']);
                                    $('#btn-loadpv-dp-cust').prop('disabled', true);
                                } else {
                                    alert_info(response['nomor_pdc']);
                                    pdc_number = response['pdc_number'];
                                    console.log(pdc_number);
                                    $('#inp-dp-cabang-nomor-pv').val(pdc_number);
                                    table_dp_cabang_bpiut_adp.clear().draw();
                                    $('#slc-dp-cabang-class-code').prop('selectedIndex', 0);
                                    $('#inp-dp-cabang-total').val('');
                                    $('#btn-loadpv-dp-cabang').prop('disabled', false);
                                    $('#slc-dp-cabang-nama').prop('selectedIndex', 0);
                                    $('#slc-dp-cabang-tipe-objek').prop('selectedIndex', 0);
                                    $('#inp-pdc-pv-cabang').val('');
                                    total_amt_cust_dp = 0;
                                }

                            } catch (e) {
                                $('#loading-ajax').hide();
                                console.log(e);
                                alert_error("Terjadi Kesalahan Pada Proses Save Data Customer");
                            }
                        }
                    },
                    error: function(response) {
                        console.log(response);
                        if (response['responseText'] === "" && response['statusText'] === 'OK') {
                            alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                                localStorage.clear();
                                window.location.href = base_url + "Controller_login/login_view";
                            });
                        }
                    }
                });

            }

        } //IF PDC NO NULL

    }
}

//========================================== FUNCTION GET SALDO BUFFER CASH ===================================================//
function get_saldo_buffercash() {
    inp_branch_dp_id = $('#slc-dp-branch').val();
    branch_code_dp = $('#hdn-dp-branch-code').val();
    $.ajax({
        url: base_url + "Controller_draft_payment/get_saldo_buffer_cash",
        type: 'POST',
        dataType: 'json',
        data: {
            "p_br_id": inp_branch_dp_id
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {

                    // console.log($.parseJSON(response['data']));
                    var data = $.parseJSON(response['data_saldo_bc']);
                    console.log(data);
                    if (JSON.stringify(response['data_saldo_bc']).includes('Error')) {
                        console.log('eror');
                        alert_error(data['Error']);
                        $('#inp-dp-saldo-buffer-cash').val('');
                    } else {
                        $('#inp-dp-saldo-buffer-cash').val(accounting.formatMoney(data['Data'], '', 2, ',', '.'));
                    }


                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Terjadi Kesalahan Get Data Customer");
                }
            }
        },
        error: function(response) {
            console.log(response);
            if (response['responseText'] === "" && response['statusText'] === 'OK') {
                alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                    localStorage.clear();
                    window.location.href = base_url + "Controller_login/login_view";
                });
            }
        }
    });
}

//========================================== FUNCTION CHECK NO PDC ===================================================//
function check_pdc_no() {
    inp_branch_dp_id = $('#slc-dp-branch').val();
    inp_pdc_no_mdl = $('#inp-pdc-no-mdl').val();
    var no_pdc_mdl_cust = $('#inp-pdc-no-mdl').val();
    var no_pdc_mdl_cabang = $('#inp-pdc-no-mdl').val();
    var no_pdc_mdl_lain = $('#inp-pdc-no-mdl').val();
    $.ajax({
        url: base_url + "Controller_draft_payment/check_pdc_no",
        type: 'POST',
        dataType: 'json',
        data: {
            "p_br_id": inp_branch_dp_id,
            "p_pdc_no": inp_pdc_no_mdl
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    var data = $.parseJSON(response['data_pdc_no']);
                    var pdc_no = data['data'];
                    var result = data['result'];
                    console.log(pdc_no);
                    console.log(result);
                    if ($('#tab-dp-customer').hasClass('active')) {
                        console.log('draft payment tab cust ');
                        if (result === false) {
                            alert_error(pdc_no);
                            $('#inp-pdc-pv-cust').val('');
                        } else {
                            $('#inp-pdc-pv-cust').val(no_pdc_mdl_cust);
                        }
                    } else if ($('#tab-dp-cabang').hasClass('active')) {
                        console.log('draft payment tab cabang ');
                        if (result === false) {
                            alert_error(pdc_no);
                            $('#inp-pdc-pv-cabang').val('');
                        } else {
                            $('#inp-pdc-pv-cabang').val(no_pdc_mdl_cabang);
                        }

                    } else if ($('#tab-dp-lain').hasClass('active')) {
                        console.log('draft payment tab lain ');
                        if (result === false) {
                            alert_error(pdc_no);
                            $('#inp-pdc-pv-lain').val('');
                        } else {
                            $('#inp-pdc-pv-lain').val(no_pdc_mdl_cabang);
                        }
                    }

                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Terjadi Kesalahan Get Data Customer");
                }
            }
        },
        error: function(response) {
            console.log(response);
            if (response['responseText'] === "" && response['statusText'] === 'OK') {
                alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                    localStorage.clear();
                    window.location.href = base_url + "Controller_login/login_view";
                });
            }
        }
    });
}

//CR B-TITIP
$('#table-dp-customer').on('keydown', '.inp-number-dp', function(e) {
     -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) 
    && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode 
    && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) 
    && (96 > e.keyCode || 105 < e.keyCode)
    && e.preventDefault()

});