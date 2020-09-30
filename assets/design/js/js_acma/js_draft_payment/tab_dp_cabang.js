$('#id-dp-cabang-no-fpd2').hide();
$('#id-dp-cabang-dealer').hide();
$('#btn-dp-cabang-display').show();
$('#id-radio-abnormal').hide();
$('#id-radio-normal').show();
$('#id-dp-cabang-hit-pajak').hide();
$('#id-datatable-cabang-mediator').hide();
$('#create-penjamin').hide();
$('#inp-dp-cabang-total').val(0);
$('#table-cabang-dp').show();
$('#table-titip-nt-dp').hide();
var slc_dp_cabang_tipe_objek = $('#slc-dp-cabang-tipe-objek').val();
var slc_dp_cabang_class_code = $('#slc-dp-cabang-class-code').val();
var inp_tgl_awal_cabang = $('#inp-tgl-awal-dp-cabang').val();
var inp_tgl_akhir_cabang = $('#inp-tgl-akhir-dp-cabang').val();
var slc_dp_cabang_nama = $("#slc-dp-cabang-nama").val();
var option_value = $('#slc-dp-cabang-class-code').val();
var total_amt_cabang_dp = parseInt($('#inp-dp-cabang-total').val());
var empl_npk_cab = '';
var empl_name_cab = '';
var empl_gab_cab = '';
var list_obj_group_dpc;
var list_data_empl_dpcabang;

//=============================================== INISIALISASI DATA TABLE ============================================================//
var table_dp_cabang_bpiut_adp = $('#table-dp-b-piut-adp').DataTable({
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

var table_dp_titip_nt = $('#table-dp-titip-nt').DataTable({
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

//=============================================== FUNCTION BTN LOAD PV ============================================================//
$('#btn-loadpv-dp-cabang').click(function() {
    if (check_session() === 'true') {
        localStorage.setItem("menu", "load_pv_trade");
        localStorage.setItem("nomor_pv", $('#inp-dp-cabang-nomor-pv').val());
        localStorage.setItem("branch_id", $('#slc-dp-branch').val());
        localStorage.setItem("payment_type", $('input[name="payment-type-dp-cabang"]:checked').val());
        window.location.replace(base_url + 'Controller_payment_voucher_trade/');
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }


});

//=============================================== FUNCTION ONCLICK BTN DISPLAY CABANG ============================================================//
$('#btn-dp-cabang-display').click(function() {
    if (check_session() === 'true') {
        flag_search_dp = 'search_cabang';
        table_dp_cabang_bpiut_adp.clear().draw();
        inp_tgl_awal = $('#inp-tgl-awal-dp-cabang').val();
        inp_tgl_akhir = $('#inp-tgl-akhir-dp-cabang').val();
        slc_customer_class_code = $('#slc-dp-cabang-class-code').val();
        branch_code_dp = $('#slc-dp-branch').val();
        slc_kolektor_name = $('#slc-dp-cabang-nama').val();
        slc_tipe_objek = $('#slc-dp-cabang-tipe-objek').val();
        console.log(branch_code_dp);

        if (slc_customer_class_code == 'B-TITIP.NT') {
            if (branch_code_dp === '') {
                alert_warning('Mohon untuk memilih cabang terlebih dahulu');
                $('#id-main-form-dp-customer').addClass('has-error');
            }else if (slc_customer_class_code == 0) {
                alert_warning('Mohon untuk memilih class code terlebih dahulu');
                $('#div-class-code-dp-cabang').addClass('has-error');
            } else {
                $('#div-nama-dp-cabang').removeClass('has-error');
                $('#div-class-code-dp-cabang').removeClass('has-error');
                $('#id-main-form-dp-customer').removeClass('has-error');
                get_data_customer_dp();
            }
        } else {

            if (branch_code_dp === '') {
                alert_warning('Mohon untuk memilih cabang terlebih dahulu');
                $('#id-main-form-dp-customer').addClass('has-error');
            } else if (slc_customer_class_code == 0) {
                alert_warning('Mohon untuk memilih class code terlebih dahulu');
                $('#div-class-code-dp-cabang').addClass('has-error');
            } else if (inp_tgl_awal !== '' && inp_tgl_akhir !== '') {
                // alert_warning('Mohon untuk mengisi tanggal ppd terlebih dahulu');
                // $('#div-tgl-awal-cabang-dp').addClass('has-error');
                // $('#div-tgl-akhir-cabang-dp').addClass('has-error');

                if (slc_kolektor_name === '') {
                    alert_warning('Mohon untuk memilih nama kolektor terlebih dahulu');
                    $('#div-nama-dp-cabang').addClass('has-error');
                } else if (slc_tipe_objek === '') {
                    alert_warning('Mohon untuk memilih tipe objek terlebih dahulu');
                    $('#div-tipe-objek-dp-cabang').addClass('has-error');
                } else {
                    $('#id-main-form-dp-customer').removeClass('has-error');
                    $('#div-class-code-dp-cabang').removeClass('has-error');
                    $('#div-tgl-awal-cabang-dp').removeClass('has-error');
                    $('#div-tgl-akhir-cabang-dp').removeClass('has-error');
                    $('#div-nama-dp-cabang').removeClass('has-error');
                    $('#div-tipe-objek-dp-cabang').removeClass('has-error');
                    get_data_customer_dp();
                }
            } else if (slc_kolektor_name === '') {
                alert_warning('Mohon untuk memilih nama kolektor terlebih dahulu');
                $('#div-nama-dp-cabang').addClass('has-error');
            } else if (slc_tipe_objek === '') {
                alert_warning('Mohon untuk memilih tipe objek terlebih dahulu');
                $('#div-tipe-objek-dp-cabang').addClass('has-error');
            } else {
                $('#id-main-form-dp-customer').removeClass('has-error');
                $('#div-class-code-dp-cabang').removeClass('has-error');
                $('#div-tgl-awal-cabang-dp').removeClass('has-error');
                $('#div-tgl-akhir-cabang-dp').removeClass('has-error');
                $('#div-nama-dp-cabang').removeClass('has-error');
                $('#div-tipe-objek-dp-cabang').removeClass('has-error');
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

//=============================================== FUNCTION BTN ONCLICK CLEAR ============================================================//
$('#btn-clear-dp-cabang').click(function() {
    if (check_session() === 'true') {
        clear_draft_payment();
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

//=============================================== FUNCTION RADIO BUTTON PAYMENT TYPE ============================================================//
$('input[name="payment-type-dp-cabang"]').click(function() {
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


    // if ($(this).is(':checked') && $(this).val() == '0') {
    //        //$('#myModal').modal('show');
    //        $("#modal-pdc").modal({
    //          show: true,
    //          backdrop: 'static'
    //        });
    //    }
});

//=============================================== FUNCTION ONCLICK BTN SAVE CABANG ============================================================//
$('#btn-save-dp-cabang').click(function() {
    if (check_session() === 'true') {
        flag_search_dp = 'save_cabang';
        console.log('save cabang');
        radio_val = $('input[name="payment-type-dp-cabang"]:checked').val();
        console.log(radio_val);
        var inp_pdc_pv_cust = $('#inp-pdc-pv-cabang').val();
        slc_customer_class_code = $('#slc-dp-cabang-class-code').val();
         if (slc_customer_class_code == 0) {
                alert_warning('Mohon untuk memilih class code terlebih dahulu');
                $('#div-class-code-dp-cabang').addClass('has-error');
        } else {

        if (slc_dp_cabang_class_code == 'B-TITIP.NT') {
            check_lenght = $('#table-dp-titip-nt').find('.check-dp-cabang').filter(':checked').length;
            console.log(check_lenght);
            list_data = table_dp_titip_nt.data();
            console.log(list_data);
            var inp_nama = $('#inp-dp-cabang-nama').val();
            console.log(inp_nama);
            if (inp_nama == '') {
                $('#div-nama-dp-cabang').addClass('has-error');
                alert_warning('Mohon untuk mengisi nama terlebih dahulu ');
            } else {
                if (radio_val === 'C') {
                    if (check_lenght === 0) {
                        alert_error('Pilih data yang akan dibuatkan PV terlebih dahulu !');
                    } else {
                        //get_data_employee();
                        alert_confirm('Apakah anda yakin ingin menyimpan data ?', function() {

                            save_data_customer_dp();
                        }); //alert confirm  
                    }

                    $('#div-pdc-pv-cust').removeClass('has-error');
                } else {
                    if (inp_pdc_pv_cust === null || inp_pdc_pv_cust === '') {
                        alert_error('Dimohon untuk mengisi nomor PDC terlebih dahulu');
                        $('#div-pdc-pv-cabang').addClass('has-error');
                    } else {
                        $('#div-pdc-pv-cabang').removeClass('has-error');
                        if (check_lenght === 0) {
                            alert_error('Pilih data yang akan dibuatkan PV terlebih dahulu !');
                        } else {
                            // get_data_employee();
                            alert_confirm('Apakah anda yakin ingin menyimpan data ?', function() {

                                save_data_customer_dp_pdc();
                            }); //alert confirm 
                        }
                    } // IF NO PDC NULL
                }
            }

        } else {
            check_lenght = $('#table-dp-b-piut-adp').find('.check-dp-cabang').filter(':checked').length;
            console.log(check_lenght);
            list_data = table_dp_cabang_bpiut_adp.data();
            console.log(list_data);
            if (radio_val === 'C') {
                if (check_lenght === 0) {
                    alert_error('Pilih data yang akan dibuatkan PV terlebih dahulu !');
                } else {
                    //get_data_employee();
                    alert_confirm('Apakah anda yakin ingin menyimpan data ?', function() {

                        save_data_customer_dp();
                    }); //alert confirm  
                }

                $('#div-pdc-pv-cust').removeClass('has-error');
            } else {
                if (inp_pdc_pv_cust === null || inp_pdc_pv_cust === '') {
                    alert_error('Dimohon untuk mengisi nomor PDC terlebih dahulu');
                    $('#div-pdc-pv-cabang').addClass('has-error');
                } else {
                    $('#div-pdc-pv-cabang').removeClass('has-error');
                    if (check_lenght === 0) {
                        alert_error('Pilih data yang akan dibuatkan PV terlebih dahulu !');
                    } else {
                        // get_data_employee();
                        alert_confirm('Apakah anda yakin ingin menyimpan data ?', function() {

                            save_data_customer_dp_pdc();
                        }); //alert confirm 
                    }
                } // IF NO PDC NULL
            }
        }

    }

        p_button = 'SAVE';

    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }


});

//=============================================== FUNCTION UNTUK VALIDASI MAX DATE 30 HARI ============================================================//
$('#div-tgl-awal-cabang-dp').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
}).on("dp.change", function(e) {
    var date = e.date;
    var dDate = date._d;
    var new_date = new Date(dDate);
    new_date.setDate(new_date.getDate() + 30);

    $('#div-tgl-akhir-cabang-dp').data("DateTimePicker").minDate(dDate);

    if (new_date > new Date(today)) {
        new_date = new Date(today);
    }
    //console.log(new_date, today);

    $('#div-tgl-akhir-cabang-dp').data("DateTimePicker").maxDate(new_date);
    $('#div-tgl-akhir-cabang-dp').data("DateTimePicker").date(new_date);

});

//=============================================== FUNCTION ON CHANGE CLASS CODE CABANG ============================================================//
$('#slc-dp-cabang-class-code').change(function() {
    slc_dp_cabang_class_code = $('#slc-dp-cabang-class-code').val();
    if (slc_dp_cabang_class_code == '0') {
        $('#slc-dp-cabang-nama').empty();
        $('#slc-dp-cabang-nama').prop('disabled', true);
    } else {
        $('#slc-dp-cabang-nama').prop('disabled', false);
    }

    // if (slc_dp_cabang_class_code === 'B-PIUT.ADP') {
    //     transaction_code = '';
    //     console.log('adp');
    // } else {
    //     console.log('others ADP');
    //     transaction_code = '';
    // }
});

//=============================================== FUNCTION ROW THIS DATA UNTUK TABLE CABANG ============================================================//
var row_data_dp;
$('#table-dp-b-piut-adp').on('click', 'tr', function() {
    row_data_dp = table_dp_cabang_bpiut_adp.rows().data();
    //console.log(data);
});

//=============================================== FUNCTION TOTAL AMOUNT UNTUK TABLE CABANG ============================================================//
$('#table-dp-b-piut-adp').on('click', '.check-dp-cabang', function() {
    var check_len = (this.id).length;
    console.log(check_len);
    var check_id = (this.id).substr(10, check_len);
    console.log(check_id);
    data_dp = table_dp_cabang_bpiut_adp.rows().data();
    console.log(data_dp);
    console.log(data_dp.length);
    var jml_data_cek = $('input.check-dp-cabang:checked').length;
    var angka = accounting.unformat(this.value);
    console.log(angka);
    console.log(jml_data_cek);

    //untuk issue bila cuma ada 1 row diceklist ,cek all harus terceklist
    if (data_dp.length == 1) {

        if ($('#check-dp1-' + check_id).is(':checked')) {
            console.log('angka : ' + angka);
            total_amt_cabang_dp += parseFloat(angka);
            console.log(total_amt_cabang_dp);
            $('#inp-dp-cabang-total').val(accounting.formatMoney(total_amt_cabang_dp, '', 2, ',', '.')); // total_amt_cust_dp
            $('#checkbox-dp-cabang').prop('checked', true);
        } else {
            total_amt_cabang_dp -= parseFloat(angka);
            $('#inp-dp-cabang-total').val(accounting.formatMoney(total_amt_cabang_dp, '', 2, ',', '.'));
            console.log(total_amt_cabang_dp);
            $('#checkbox-dp-cabang').prop('checked', false);
        }

    } else {
        if (data_dp.length == jml_data_cek) {
            $('#checkbox-dp-cabang').prop('checked', true);
        } else {
            $('#checkbox-dp-cabang').prop('checked', false);
        }
        console.log(check_id);
        if ($('#check-dp1-' + check_id).is(':checked')) {
            console.log('angka : ' + angka);
            total_amt_cabang_dp += parseFloat(angka);
            console.log(total_amt_cabang_dp);
            $('#inp-dp-cabang-total').val(accounting.formatMoney(total_amt_cabang_dp, '', 2, ',', '.')); // total_amt_cust_dp
        } else {
            total_amt_cabang_dp -= parseFloat(angka);
            $('#inp-dp-cabang-total').val(accounting.formatMoney(total_amt_cabang_dp, '', 2, ',', '.'));
            console.log(total_amt_cabang_dp);
        }

    }



});

//=============================================== FUNCTION CHECK ALL TABLE CABANG ============================================================//
$('#checkbox-dp-cabang').click(function() {
    //var cust_dp = table_dp_cabang_bpiut_adp.data();
    var cust_dp = table_dp_cabang_bpiut_adp.rows( { filter : 'applied'} ).data();
    var tot = 0;
    console.log(cust_dp);
    for (var i = 0; i < cust_dp.length; i++) {
        if ($('#checkbox-dp-cabang').is(":checked")) {
            $('.check-dp-cabang').prop('checked', true);

            var amount_cust = accounting.unformat(cust_dp[i][4]);
            console.log(amount_cust);
            tot += parseInt(amount_cust);
            console.log(tot);
        } else {
            $('.check-dp-cabang').prop('checked', false);
        }
        if (i + 1 === cust_dp.length) {
            $('#inp-dp-cabang-total').val(accounting.formatMoney(tot, '', 2, ',', '.'));
            total_amt_cabang_dp = tot;
        }
    }

});



//=============================================== FUNCTION ROW THIS DATA UNTUK TABLE B-TITIP.NT ============================================================//
var row_data_nt_dp;
$('#table-dp-titip-nt').on('click', 'tr', function() {
    row_data_nt_dp = table_dp_titip_nt.rows().data();
    //console.log(data);
});

//=============================================== FUNCTION TOTAL AMOUNT UNTUK TABLE CABANG ============================================================//
$('#table-dp-titip-nt').on('click', '.check-dp-cabang', function(i) {
    debugger;
    var check_len = (this.id).length;
    var amountDp = this.value;
    var check_id = (this.id).substr(10, check_len);
    console.log(check_id);
    data_dp = table_dp_titip_nt.rows().data();
    var jml_data_cek = $('input.check-dp-cabang:checked').length;
    var angka = accounting.unformat(amountDp);

    //untuk issue bila cuma ada 1 row diceklist ,cek all harus terceklist
    if (data_dp.length == 1) {

        if ($('#check-dp1-' + check_id).is(':checked')) {
            console.log('angka : ' + angka);
            total_amt_cabang_dp += parseFloat(angka);
            console.log(total_amt_cabang_dp);
            $('#inp-dp-cabang-total').val(accounting.formatMoney(total_amt_cabang_dp, '', 2, ',', '.')); // total_amt_cust_dp
            $('#checkbox-nt-dp-cabang').prop('checked', true);
        } else {
            total_amt_cabang_dp -= parseFloat(angka);
            $('#inp-dp-cabang-total').val(accounting.formatMoney(total_amt_cabang_dp, '', 2, ',', '.'));
            console.log(total_amt_cabang_dp);
            $('#checkbox-nt-dp-cabang').prop('checked', false);
        }

    } else {
        if (data_dp.length == jml_data_cek) {
            $('#checkbox-nt-dp-cabang').prop('checked', true);
        } else {
            $('#checkbox-nt-dp-cabang').prop('checked', false);
        }
        console.log(check_id);
        if ($('#check-dp1-' + check_id).is(':checked')) {
            console.log('angka : ' + angka);
            total_amt_cabang_dp += parseFloat(angka);
            console.log(total_amt_cabang_dp);
            $('#inp-dp-cabang-total').val(accounting.formatMoney(total_amt_cabang_dp, '', 2, ',', '.')); // total_amt_cust_dp
        } else {
            total_amt_cabang_dp -= parseFloat(angka);
            $('#inp-dp-cabang-total').val(accounting.formatMoney(total_amt_cabang_dp, '', 2, ',', '.'));
            console.log(total_amt_cabang_dp);
        }

    }



 });

//=============================================== FUNCTION CHECK ALL TABLE CABANG ============================================================//
$('#checkbox-nt-dp-cabang').click(function() {
    //var cust_dp = table_dp_titip_nt.data();
    var cust_dp = table_dp_titip_nt.rows( { filter : 'applied'} ).data();
    var tot = 0;
    console.log(cust_dp);
    for (var i = 0; i < cust_dp.length; i++) {
        if ($('#checkbox-nt-dp-cabang').is(":checked")) {
            $('.check-dp-cabang').prop('checked', true);

            var amount_cust = accounting.unformat(cust_dp[i][4]);
            console.log(amount_cust);
            tot += parseInt(amount_cust);
            console.log(tot);
        } else {
            $('.check-dp-cabang').prop('checked', false);
        }
        if (i + 1 === cust_dp.length) {
            $('#inp-dp-cabang-total').val(accounting.formatMoney(tot, '', 2, ',', '.'));
            total_amt_cabang_dp = tot;
        }
    }

});

//=============================================== FUNCTION UNTUK VALIDASI MAX DATE 30 HARI ============================================================//
$('#div-tgl-awal-cabang-dp').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
}).on("dp.change", function(e) {
    var date = e.date;
    var dDate = date._d;
    var new_date = new Date(dDate);
    new_date.setDate(new_date.getDate() + 30);

    $('#div-tgl-akhir-cabang-dp').data("DateTimePicker").minDate(dDate);

    if (new_date > new Date(today)) {
        new_date = new Date(today);
    }
    //console.log(new_date, today);

    $('#div-tgl-akhir-cabang-dp').data("DateTimePicker").maxDate(new_date);
    $('#div-tgl-akhir-cabang-dp').data("DateTimePicker").date(new_date);

});

//=============================================== ON CHANGE CLASS CODE TAB CABANG ============================================================//
$('#slc-dp-cabang-class-code').on('change', function() {
    option_value = $('#slc-dp-cabang-class-code').val();
    $('#inp-dp-cabang-total').val(0);
    if (option_value === 'B-PIUT.ADP' || option_value === 'B-COL.WO.R' || option_value === 'B-PIUT.ADP2' || option_value === 'B-COL.WO.R2') {
        get_data_empl_b_piut_adp();
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
    } else if (option_value === 'B-COL.WO' || option_value === 'B-COL.WO2' || option_value === 'B-OL.WO') {
        get_empl_nas();
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
    } else if (option_value === 'B-TITIP.NT') {
        $('#table-cabang-dp').hide();
        $('#table-titip-nt-dp').show();
        $('#dp-option-nama').hide();
        $('#dp-text-nama').show();
        $('#id-dp-cabang-tanggal-ppd').hide();
        $('#id-dp-tipe-objek').hide();
        $('#div-tipe-pembayaran-dp-cabang').css('margin-bottom', '0px');
        if ($.fn.DataTable.isDataTable('#table-dp-titip-nt')) {
            $('#table-dp-titip-nt').DataTable().destroy();
        }

        table_dp_titip_nt = $('#table-dp-titip-nt').DataTable({
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
    } else {

    }

});


//=============================================== FUNCTION RADIO BUTTON PAYMENT TYPE ============================================================//
$("#id-tab-dp-cabang").click(function() {
    if (check_session() === 'true') {
        $('.btn-add-pdc-pv').prop('disabled', true);
        $('#radio-pv-cash-cust').prop('checked', true);
        $('#radio-pdc-cust').prop('checked', false);
        $('#inp-pdc-pv-cust').val('');
        $('#radio-pv-cash-lain').prop('checked', true);
        $('#radio-pdc-lain').prop('checked', false);
        $('#inp-pdc-pv-lain').val('');
        $('#slc-dp-cabang-nama').prop('disabled', true);
        $('#slc-dp-cabang-nama').empty();
        //$('#slc-dp-cabang-class-code').prop('selectedIndex', 0);
        $('.res-select').prop('selectedIndex', 0);
        table_dp_cabang_bpiut_adp.clear().draw();
        //table_dp_titip_nt.destroy();
        localStorage.setItem("menu", "draft_payment_cabang");
        var cab_class_code = $('#slc-dp-cabang-class-code').val();
        if (cab_class_code !== null) {} else {
            localStorage.setItem("menu", "draft_payment_cabang");
            get_class_code_cabang();
            get_obj_group_cabang();
        }

    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }

});

//=============================================== ON CHANGE TIPE OBJEK // OBJ_CODE ============================================================//
$('#slc-dp-cabang-tipe-objek').change(function() {
    get_obj_list();
});

//=============================================== ON CHANGE NAME EMPLOYEE ============================================================//
$('#slc-dp-cabang-nama').change(function() {
    var empl_code_val = $('#slc-dp-cabang-nama').val();
    empl_code_val = empl_code_val.split(' - ');
    console.log(list_data_empl_dpcabang['data']);
    if (slc_dp_cabang_class_code == 'B-COL.WO' || slc_dp_cabang_class_code == 'B-OL.WO') {
        $.each(list_data_empl_dpcabang['data'], function(i) {
            var empl_code = this['empl_npk'];
            var empl_name = this['empl_name'];
            empl_code = empl_code.split(' - ');
            if (empl_code[0] == empl_code_val[0] && empl_code[1] == empl_code_val[1]) {
                $('#hdn-dpcabang-empl-code').val(empl_code[0]);
                $('#hdn-dpcabang-empl-name').val(empl_name);
                return false;
            } else {
                $('#hdn-dpcabang-empl-code').val('');
                $('#hdn-dpcabang-empl-name').val('');
            }

        });

    } else {

        $.each(list_data_empl_dpcabang['data'], function(i) {
            var empl_code = this['emplNPK'];
            var empl_name = this['emplName'];
            console.log(empl_code, empl_name);
            empl_name = empl_name.split(' - ');
            if (empl_code == empl_code_val) {
                $('#hdn-dpcabang-empl-code').val(empl_code);
                $('#hdn-dpcabang-empl-name').val(empl_name[0]);
                return false;
            } else {
                $('#hdn-dpcabang-empl-code').val('');
                $('#hdn-dpcabang-empl-name').val('');
            }

        });

    }

    console.log($('#hdn-dpcabang-empl-code').val(), $('#hdn-dpcabang-empl-name').val());


});


//=============================================== GET CLASS CODE UNTUK TAB CABANG ============================================================//
function get_class_code_cabang() {
    $.ajax({
        url: "Controller_draft_payment/get_classcode_cabang",
        type: 'GET',
        dataType: 'json',
        // async: false,
        success: function(response) {
            if (response) {
                try {
                    console.log(response['data']);

                    $('<option/>').val('0').html('--SILAHKAN PILIH--').appendTo('#slc-dp-cabang-class-code').addClass('form-control');
                    $.each(response['data'], function(list) {

                        $('#slc-dp-cabang-class-code').append('<option value="' + this['acct_interface_group'] + '">' + this['acct_brief_desc'] + '</option>');
                    });
                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error("Terjadi Kesalahan Get Class Code Cabang");
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

};

//=============================================== GET OBJ GROUP UNTUK TAB CABANG ============================================================//
function get_obj_group_cabang() {
    $.ajax({
        url: "Controller_draft_payment/get_objgroup_cabang",
        type: 'GET',
        dataType: 'json',

        success: function(response) {
            if (response) {
                try {
                    console.log(response['data']);

                    $('<option/>').val('').html('--SILAHKAN PILIH--').appendTo('#slc-dp-cabang-tipe-objek').addClass('form-control');
                    $.each(response['data'], function(list) {

                        $('#slc-dp-cabang-tipe-objek').append('<option value="' + this['obj_group_code'] + '">' + this['obj_group_code'] + ' - ' + this['obj_group_desc'] + '</option>');
                    });
                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error("Gagal get data object group");
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

};

//=============================================== GET EMPL UNTUK CLASS CODE B-PIUT.ADP ============================================================//
function get_data_empl_b_piut_adp() {
    inp_branch_dp_id = $('#slc-dp-branch').val();
    $('#slc-dp-cabang-nama').val('');
    console.log(inp_branch_dp_id);
    $.ajax({
        url: base_url + "Controller_draft_payment/get_empl_b_piut_adp",
        type: 'POST',
        dataType: 'json',
        data: {
            "p_br_id": inp_branch_dp_id
        },
        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    list_data_empl_dpcabang = '';
                    $('#slc-dp-cabang-nama').empty();
                    var data_empl = $.parseJSON(response['data_empl']);
                    console.log(data_empl);
                    console.log(data_empl['data']);
                    list_data_empl_dpcabang = data_empl;
                    $('<option/>').val('').html('--SILAHKAN PILIH--').appendTo('#slc-dp-cabang-nama').addClass('form-control');
                    $.each(data_empl['data'], function(list) {

                        $('#slc-dp-cabang-nama').append('<option value="' + this['emplNPK'] + '">' + this['emplNPK'] + ' - ' + this['emplName'] + '</option>');
                    });
                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Terjadi Kesalahan Get Data B-PIUT.ADP");
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

//=============================================== GET EMPL UNTUK CLASS CODE B-PIUT.ADP ============================================================//
function get_data_employee() {
    slc_dp_cabang_class_code = $('#slc-dp-cabang-class-code').val();

    if (slc_dp_cabang_class_code === 'B-PIUT.ADP') {
        inp_branch_dp_id = $('#slc-dp-branch').val();
        slc_dp_cabang_nama = $("#slc-dp-cabang-nama").val();
        console.log(inp_branch_dp_id);
        console.log(slc_dp_cabang_nama);

    } else if (slc_dp_cabang_class_code === 'B-COL.WO' || slc_dp_cabang_class_code === 'B-OL.WO') {
        inp_branch_dp_id = $('#slc-dp-branch').val();
        slc_dp_cabang_nama2 = $("#slc-dp-cabang-nama").val();
        slc_dp_cabang_nama = slc_dp_cabang_nama2.substr(0, 4);
        inp_branch_dp_id = slc_dp_cabang_nama2.substr(7, 10);
        console.log(inp_branch_dp_id);
        console.log(slc_dp_cabang_nama);
    }

    $.ajax({
        url: base_url + "Controller_draft_payment/get_data_empl",
        type: 'POST',
        dataType: 'json',
        data: {
            "p_br_id": inp_branch_dp_id,
            "p_empl_npk": slc_dp_cabang_nama
        },
        // async: false,
        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    console.log(response['data']);
                    if (response['data'].length == 0) {
                        alert_error('Data Employee Tidak Ditemukan');
                    } else {
                        $.each(response['data'], function(index) {
                            empl_npk_cab = this['emplNpk'];
                            empl_name_cab = this['emplName'];
                            empl_gab_cab = this['emplNpkGab'];
                        });
                    }


                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error(e);
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

//=============================================== GET EMPL NASIONAL ============================================================//
function get_empl_nas() {
    inp_branch_dp_id = $('#slc-dp-branch').val();
    $('#slc-dp-cabang-nama').val('');
    console.log(inp_branch_dp_id);
    $.ajax({
        url: base_url + "Controller_draft_payment/get_empl_nas",
        type: 'POST',
        dataType: 'json',
        data: {
            "p_br_id": inp_branch_dp_id
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    list_data_empl_dpcabang = '';
                    $('#slc-dp-cabang-nama').empty();
                    // console.log($.parseJSON(response['data_cust']));
                    var data_empl = $.parseJSON(response['data_empl']);
                    console.log(data_empl);
                    console.log(data_empl['data']);
                    list_data_empl_dpcabang = data_empl;
                    $('<option/>').val('').html('--SILAHKAN PILIH--').appendTo('#slc-dp-cabang-nama').addClass('form-control');
                    $.each(data_empl['data'], function(list) {

                        $('#slc-dp-cabang-nama').append('<option value="' + this['empl_npk'] + '">' + this['empl'] + '</option>');
                    });

                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Terjadi Kesalahan Get Data B-PIUT.ADP");
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


//=============================================== FUNCTION GET OBJ CODE ============================================================//
function get_obj_list() {
    list_obj_group_dpc = '';
    var obj_group_code = $('#slc-dp-cabang-tipe-objek').val();

    console.log(obj_group_code);
    $.ajax({
        url: "Controller_draft_payment/get_list_obj_code",
        type: 'POST',
        timeput: 10000,
        dataType: 'json',
        data: {
            "obj_group_code": obj_group_code
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    if (response['Status'] == 500) {
                        alert_error(response['Data']);
                    } else {
                        list_obj_group_dpc = response;
                        console.log(list_obj_group_dpc);

                    }
                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(response);
                    console.log(e);
                    alert_error(e);
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
};