var table_dp_buffer_cash = $('#table-dp-buffer-cash').DataTable({
    //"responsive": true,
   // destroy: true,
    "scrollY": "300px",
    "scrollCollapse": true,
    "paging": false,
    "columnDefs": [{
            "width": "0%",
            "targets": 0
        },
        {
            "width": "30%",
            "targets": 1
        },
        {
            "width": "30%",
            "targets": 2
        },
        {
            "width": "30%",
            "targets": 3
        },
        {
            "width": "10%",
            "targets": 4
        },
    ]
});
// var table_dp_buffer_cash = $('#table-dp-buffer-cash').DataTable({
//     responsive: true
// });
var check_lenght_buffer = '';
var list_data_buffer = '';
var class_code_buffer = $('#slc-dpho-buffer-class-code').val();
var pv_no_buffer = $('#inp-dpho-buffer-pv-no').val();
$('#inp-dpho-buffer-total-amount').val(0);
var total_amt_dpho_buff = parseInt($('#inp-dpho-buffer-total-amount').val());
var bank_pengirim_buffer = $('#slc-dpho-buffer-bank-pengirim').val();
//========================================== FUNCTION CANCEL PV COLLECTION ===================================================//
// function js_dpho_buffer() {



//     var class_code_buffer = $('#slc-dpho-buffer-class-code').val();
//     var pv_no_buffer = $('#inp-dpho-buffer-pv-no').val();
//     $('#inp-dpho-buffer-total-amount').val(0);
//     var total_amt_dpho_buff = parseInt($('#inp-dpho-buffer-total-amount').val());
//     var bank_pengirim_buffer = $('#slc-dpho-buffer-bank-pengirim').val();
//     clear_dpho_buffer();

//     class_code_buffer = $('#slc-dpho-buffer-class-code').val();
//     localStorage.setItem("menu", "dpho_buffer");
//     if (class_code_buffer !== '') {
//         get_class_code_buffer();
//         get_bank_pengirim('#slc-dpho-buffer-bank-pengirim');
//     } else {

//     }
// } //FUNCTION JS DPHO BUFFER

//========================================== BTN SEARCH BUFFER ===================================================//
$('#btn-dpho-buffer-display').click(function() {

    if (check_session() === 'true') {

        class_code_buffer = $('#slc-dpho-buffer-class-code').val();
        var total_amt_buffer = $('#inp-dpho-buffer-total-amount').val('');
        pv_no_buffer = $('#inp-dpho-buffer-pv-no').val();
        console.log(class_code_buffer);
        if (class_code_buffer === '') {
            $('#div-class-code-dpho-buffer').addClass('has-error');
            alert_error("Pilih Class Code Terlebih Dahulu");
        } else {
            $('#btn-save-dpho-buffer').prop("disabled", false);
            $('#btn-generate-dpho-buffer').prop("disabled", true);
            $('#div-class-code-dpho-buffer').removeClass('has-error');
            display_buffer(class_code_buffer, pv_no_buffer, 0);
        }

    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }

});

//========================================== BUTTON SEARCH PV BUFFER ===================================================//
$('#btn-search-pv-no-dpho-buffer').click(function() {
    if (check_session() === 'true') {

        class_code_buffer = $('#slc-dpho-buffer-class-code').val();
        if (class_code_buffer === '') {
            alert_error("Pilih Class Code Terlebih Dahulu ! ");
        }else{
            $('#btn-generate-dpho-buffer').prop("disabled", false);
            get_nopv_buffer();
        }

    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }

});

//========================================== FUNCTION CLICK PV ===================================================//
$('#div-pv-no-dpho-buffercash').click(function() {
    if (check_session() === 'true') {

        class_code_buffer = $('#slc-dpho-buffer-class-code').val();
        if (class_code_buffer === '') {
            alert_error("Pilih Class Code Terlebih Dahulu ! ");
        }else{
            $('#btn-generate-dpho-buffer').prop("disabled", false);
            get_nopv_buffer();
        }
        //$('#btn-save-dpho-buffer').prop("disabled", true);


    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

//========================================== BUTTON CLEAR ===================================================//
$('#btn-clear-dpho-buffer').click(function() {
    if (check_session() === 'true') {
        clear_dpho_buffer();
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

//========================================== FUNCTION BTN CANCEL PV BUFFER ===================================================//
$('#btn-cancel-dpho-buffer').click(function() {
    if (check_session() === 'true') {

        check_lenght_buffer = $('#table-dp-buffer-cash').find('.check-dpho-buff').filter(':checked').length;
        console.log(check_lenght_buffer);
        var branch_id_ho = $('#hdn-dpho-branch-code').val();
        class_code_buffer = $('#slc-dpho-buffer-class-code').val();
        pv_no_buffer = $('#inp-dpho-buffer-pv-no').val();
        console.log(branch_id_ho, class_code_buffer, pv_no_buffer);
        if (check_lenght_buffer === 0) {
            console.log('eror confirm');
            alert_error('Pilih PV yang akan dicancel terlebih dahulu !');

        } else {
            alert_confirm('Apakah anda yakin ingin mengcancel data ?', function() {
                cancel_buffer_pv(branch_id_ho, class_code_buffer, pv_no_buffer);
            }); //alert confirm 
        }

    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }

});

//========================================== FUNCTION BTN CANCEL PV BUFFER ===================================================//
$('#btn-cetakpv-dpho-buffer').click(function() {
    if (check_session() === 'true') {

        check_lenght_buffer = $('#table-dp-buffer-cash').find('.check-dpho-buff').filter(':checked').length;
        console.log(check_lenght_buffer);
        if (check_lenght_buffer === 0) {
            console.log('eror confirm');
            alert_error('Pilih PV yang akan dicancel terlebih dahulu !');

        } else {
            alert_confirm('Apakah anda yakin akan melakukan cetak PV ?', function() {
                data_cetak_pv_buffer();
            }); //alert confirm 
        }

    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }

});


//========================================== FUNCTION TOTAL AMOUNT ===================================================//
// $('#table-dp-buffer-cash').on('click', '.check-dpho-buff', function() {
//     var check_id = (this.id).substr(16, 1);
//     console.log(check_id);
//     data_dp = table_dp_buffer_cash.rows().data();
//     console.log(data_dp);
//     var angka = accounting.unformat(data_dp[check_id][4]);
//     console.log(angka);
//     if ($('#check-dpho-buff-' + check_id).is(':checked')) {
//         console.log('angka : ' + angka);
//         total_amt_dpho_buff += parseFloat(angka);
//         $('#inp-dpho-buffer-total-amount').val(accounting.formatMoney(total_amt_dpho_buff, '', 2, ',', '.'));
//     } else {
//         total_amt_dpho_buff -= parseFloat(angka);
//         console.log('uncheck cuy');
//         $('#inp-dpho-buffer-total-amount').val(accounting.formatMoney(total_amt_dpho_buff, '', 2, ',', '.'));
//         console.log(total_amt_dpho_buff);
//     }

// });


    $('#table-dp-buffer-cash').on('click', '.check-dpho-buff', function() {
    var check_len = (this.id).length;
    console.log(check_len); 
    var check_id = (this.id).substr(16, check_len);
    data_dp = table_dp_buffer_cash.rows().data();
    console.log(data_dp);
    console.log(data_dp.length);
    var jml_data_cek = $('input.check-dpho-buff:checked').length;
    var angka = accounting.unformat(data_dp[check_id][4]);
    console.log(angka);
    console.log(jml_data_cek);
    //untuk issue bila cuma ada 1 row diceklist ,cek all harus terceklist
    if (data_dp.length == 1) {

        if ($('#check-dpho-buff-' + check_id).is(':checked')) {
            console.log('angka : ' + angka);
            total_amt_dpho_buff += parseFloat(angka);
            console.log(total_amt_dpho_buff);
            $('#inp-dpho-buffer-total-amount').val(accounting.formatMoney(total_amt_dpho_buff, '', 2, ',', '.'));
            $('#checkbox-dpho-buffer').prop('checked', true);
        } else {
            total_amt_dpho_buff -= parseFloat(angka);
            $('#inp-dpho-buffer-total-amount').val(accounting.formatMoney(total_amt_dpho_buff, '', 2, ',', '.'));
            console.log(total_amt_dpho_buff);
            $('#checkbox-dpho-buffer').prop('checked', false);
        }

    } else {
        if (data_dp.length == jml_data_cek) {
            $('#checkbox-dpho-buffer').prop('checked', true);
        } else {
            $('#checkbox-dpho-buffer').prop('checked', false);
        }

        if ($('#check-dpho-buff-' + check_id).is(':checked')) {
        console.log('angka : ' + angka);
        total_amt_dpho_buff += parseFloat(angka);
        console.log(total_amt_dpho_buff);
        $('#inp-dpho-buffer-total-amount').val(accounting.formatMoney(total_amt_dpho_buff, '', 2, ',', '.')); 
    } else {
        total_amt_dpho_buff -= parseFloat(angka);
        $('#inp-dpho-buffer-total-amount').val(accounting.formatMoney(total_amt_dpho_buff, '', 2, ',', '.'));
        console.log(total_amt_dpho_buff);
    }

    }

});

//========================================== FUNCTION CHECK ALL TABLE CUSTOMER ===================================================//
// $('#checkbox-dpho-buffer').click(function() {
//     var cust_dp = table_dp_buffer_cash.data();
//     console.log(cust_dp);
//     var tot = 0;
//     for (var i = 0; i < cust_dp.length; i++) {
//         $('#inp-dpho-buffer-total-amount').val(0);
//         if ($('#checkbox-dpho-buffer').is(":checked")) {
//             $('.check-dpho-buff').prop('checked', true);

//             var amount_cust = accounting.unformat(cust_dp[i][4]);
//             console.log(amount_cust);
//             tot += parseInt(amount_cust);
//             console.log(tot);
//         } else {
//             $('.check-dpho-buff').prop('checked', false);

//         }
//         if (i + 1 === cust_dp.length) {
//             $('#inp-dpho-buffer-total-amount').val(accounting.formatMoney(tot, '', 2, ',', '.'));
//             total_amt_dpho_buff = tot;
//         }
//     }

// });

$('#checkbox-dpho-buffer').click(function() {
    var cust_dp = table_dp_buffer_cash.data();
    var tot = 0;
    console.log(cust_dp);
    for (var i = 0; i < cust_dp.length; i++) {
        if ($('#checkbox-dpho-buffer').is(":checked")) {
            $('.check-dpho-buff').prop('checked', true);

            var amount_cust = accounting.unformat(cust_dp[i][4]);
            console.log(amount_cust);
            tot += parseInt(amount_cust);
            console.log(tot);
        } else {
            $('.check-dpho-buff').prop('checked', false);
        }
        if (i + 1 === cust_dp.length) {
            $('#inp-dpho-buffer-total-amount').val(accounting.formatMoney(tot, '', 2, ',', '.'));
            total_amt_dpho_buff = tot;
        }
    }

});

//==========================================  BUTTON SAVE ===================================================//
$('#btn-save-dpho-buffer').click(function() {
    if (check_session() === 'true') {

        check_lenght_buffer = $('#table-dp-buffer-cash').find('.check-dpho-buff').filter(':checked').length;
        console.log(check_lenght_buffer);
        list_data_buffer = table_dp_buffer_cash.data();
        console.log(list_data_buffer);
        var total_amt_buffer = $('#inp-dpho-buffer-total-amount').val();
        class_code_buffer = $('#slc-dpho-buffer-class-code').val();
        if (check_lenght_buffer === 0) {
            console.log('eror save');
            alert_error('Pilih data yang akan dibuatkan PV terlebih dahulu !');
        } else {
            alert_confirm('Apakah anda yakin ingin menyimpan data ?', function() {
                save_data_buffer();
            }); //alert confirm  
        }

    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }

});

//========================================== BUTTON GENERATE TXT   ===================================================//
$('#btn-generate-dpho-buffer').click(function() {
    if (check_session() === 'true') {
        check_lenght_buffer = $('#table-dp-buffer-cash').find('.check-dpho-buff').filter(':checked').length;
        console.log(check_lenght_buffer);
        list_data_buffer = table_dp_buffer_cash.data();
        console.log(list_data_buffer);
        class_code_buffer = $('#slc-dpho-buffer-class-code').val();
        pv_no_buffer = $('#inp-dpho-buffer-pv-no').val();
        if (check_lenght_buffer === 0) {
            console.log('eror confirm');
            alert_error('Pilih PV yang akan digenerate terlebih dahulu !');

        } else {
            alert_confirm('Apakah anda yakin ingin generate text file ?', function() {
                //insert_payment_result_buffer();
                generate_buffer();
            });
        }

    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }

});

//========================================== FUNCTION CLEAR ===================================================//
function clear_dpho_buffer() {
    $('.res-global').val('');
    $('.res-select').prop('selectedIndex', 0);
    $('#btn-generate-dpho-buffer').prop("disabled", true);
    $('#btn-cancel-dpho-buffer').prop("disabled", true);
    $('#btn-cetakpv-dpho-buffer').prop("disabled", true);
    table_dp_buffer_cash.clear().draw();
    $('#checkbox-dpho-buffer').prop("checked", false);
};

//========================================== GET CLASS CODE BUFFER ===================================================//
function get_class_code_buffer() {
    $.ajax({
        url: "Controller_draft_payment_ho_buffer_cash/get_classcode_buffer",
        type: 'GET',
        dataType: 'json',
        //async : false,
        success: function(response) {
            if (response) {
                try {
                    console.log(response['data']);
                    $('<option/>').val('').html('--SILAHKAN PILIH--').appendTo('#slc-dpho-buffer-class-code').addClass('form-control');
                    $.each(response['data'], function(list) {

                        $('#slc-dpho-buffer-class-code').append('<option value="' + this['acct_interface_group'] + '">' + this['acct_interface_group'] + ' - ' + this['acct_brief_desc'] + '</option>');
                    });
                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error(e);
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

//========================================== FUNCTION GET PV BUFFER ===================================================//
function get_nopv_buffer() {
    class_code_buffer = $('#slc-dpho-buffer-class-code').val();
    $.ajax({
        url: base_url + "Controller_draft_payment_ho_buffer_cash/get_pv_buffer",
        type: 'POST',
        dataType: 'json',
        data: {
            "p_class_code": class_code_buffer
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    table_nopv.clear().draw();
                    var data = response['pv_buffer']['data'];
                    var status = response['pv_buffer']['status'];
                    console.log(data);
                    if (status) {

                    if (data.length === 0) {
                        alert_info('Tidak ada PV');
                    } else {

                        var data_arr = [];
                        $.each(data, function(index) {
                            data_arr.push([
                             this['payment_no'],
                             this['create_date']
                            ]);
                        });
                        console.log(data_arr);

                        table_nopv.rows.add(data_arr).draw(false);
                        $("#modal-nopv").modal({
                            show: true,
                            backdrop: 'static'
                        });
                    }
                  } else {
                    alert_error('Error GetPvBuffer '+ data);
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


//========================================== CONFIRM/INSERT PAYMENT RESULT PV  ===================================================//
function insert_payment_result_buffer() {
    class_code_buffer = $('#slc-dpho-buffer-class-code').val();
    pv_no_buffer = $('#inp-dpho-buffer-pv-no').val();
    var branch_id_ho = $('#hdn-dpho-branch-code').val();
    console.log(list_data_buffer);
    var data_arr = [];
    for (var i = 0; i < list_data_buffer.length; i++) {
        if ($('#check-dpho-buff-' + i).is(":checked")) {
            //var unformat_ammount = accounting.unformat(list_data_buffer[i][4]);
            // console.log(unformat_ammount);
            data_arr.push({
                payment_detail_id: list_data_buffer[i][5],
                branch_id: list_data_buffer[i][8],
                bank_id: list_data_buffer[i][6],
                acc_no: list_data_buffer[i][7]
            });
        }
    }
    console.log(data_arr);
    $.ajax({
        url: base_url + "Controller_draft_payment_ho_buffer_cash/payment_result_buffer",
        type: 'POST',
        dataType: 'json',
        data: {
            "p_branch_id_ho": branch_id_ho,
            "p_class_code": class_code_buffer,
            "pv_no" :pv_no_buffer,
            "data": data_arr
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {

                    var result = response['result'];
                    var status = response['status'];
                    var data = response['data'];
                    console.log(status);
                    console.log(data);
                    if (status == '500') {
                        console.log('gagal generate insert_payment_result_buffer');
                        cancel_buffer(class_code_buffer, pv_no_buffer);
                        alert_error('Generate Text File gagal, Silahkan coba lagi');
                    } else {
                        console.log('berhasil save');

                        table_dp_buffer_cash.clear().draw();
                        $('#btn-generate-dpho-buffer').prop("disabled", true);
                        $('#checkbox-dpho-buffer').prop("checked", false);
                        $('#inp-dpho-buffer-total-amount').val('');
                        get_text_file_buffer(pv_no_buffer, class_code_buffer, 0);
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

//========================================== GET TEXT FILE ===================================================//
function get_text_file_buffer(pv_no, class_code, flag_text) {
    var pv_no_csv = pv_no;
    var d = new Date,
        dformat = [
            d.getDate().padLeft(),
            (d.getMonth() + 1).padLeft(),
            d.getFullYear()
        ].join('-') +
        ' ' + [d.getHours().padLeft(),
            d.getMinutes().padLeft(),
            d.getSeconds().padLeft()
        ].join('.');
    $.ajax({
        url: "Controller_draft_payment_ho/get_text_file_buffer",
        type: 'POST',
        timeput: 10000,
        dataType: 'TEXT',
        data: {
            pv_no: pv_no,
            class_code: class_code,
            flag_text: flag_text
        },

        success: function(response) {
            var status = response['status'];
            if (status == '500') {
                console.log('gagal generate get_text_file_buffer');
                cancel_buffer(class_code, pv_no);
                alert_error('Generate Text File gagal, Silahkan coba lagi');
            } else {

                console.log(response);
                console.log("ajax response success");
                console.log(response);
                var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                //window.open(uri, 'test.csv');
                var downloadLink = document.createElement("a");
                downloadLink.href = uri;
                downloadLink.download = 'DP_' + pv_no_csv + '_' + dformat + '.csv';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                console.log(class_code, pv_no);
                get_text_export_buffer(class_code, pv_no);

            }

        },
        error: function(response) {
            console.log(response);
            if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
                alert_error('Koneksi ke server gagal, silahkan coba lagi!')
            } else {
                alert(response.responseText);
            }
        }
    });
}


//========================================== FUNCTION CANCEL PV COLLECTION ===================================================//
function get_text_export_buffer(class_code, pv_no) {
    var branch_id_ho = $('#hdn-dpho-branch-code').val();
    var pv_no_csv = pv_no;
    var d = new Date,
        dformat = [
            d.getDate().padLeft(),
            (d.getMonth() + 1).padLeft(),
            d.getFullYear()
        ].join('-') +
        ' ' + [d.getHours().padLeft(),
            d.getMinutes().padLeft(),
            d.getSeconds().padLeft()
        ].join('.');
    $.ajax({
        url: "Controller_draft_payment_ho/get_export_file_buffer",
        type: 'POST',
        timeput: 10000,
        dataType: 'TEXT',
        data: {
            class_code: class_code, // $('#slc-dpho-nsb-class-code').val(),
            pv_no: pv_no, //$('#inp-dpho-nsb-pv-no').val(),
        },

        success: function(response) {

            var status = response['status'];
            if (status == '500') {
                console.log('gagal generate get_text_export_buffer');
                cancel_buffer(class_code, pv_no);
                alert_error('Generate Text File gagal, Silahkan coba lagi');

            } else {
                console.log("ajax response success");
                console.log(response);
                var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                var downloadLink = document.createElement("a");
                downloadLink.href = uri;
                downloadLink.download = 'EXPORT_' + pv_no_csv + '.csv';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                export_buffer(branch_id_ho, class_code, pv_no);

            }

        },
        error: function(response) {
            console.log(response);
            cancel_buffer(class_code, pv_no);
            if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
                alert_error('Koneksi ke server gagal, silahkan coba lagi!')
            } else {
                alert_error(response);
            }
        }
    });
}

//========================================== FUNCTION DISPLAY BUFFER ===================================================//
function display_buffer(class_code_buffer, pv_no_buffer, status) {
    // class_code_buffer =  $('#slc-dpho-buffer-class-code').val();
    // pv_no_buffer  = $('#inp-dpho-buffer-pv-no').val();
    $.ajax({
        url: base_url + "Controller_draft_payment_ho_buffer_cash/get_display_buffer",
        type: 'POST',
        dataType: 'json',
        data: {
            "p_pv_no": pv_no_buffer,
            "p_class_code": class_code_buffer
        },

        success: function(response) {
            console.log(response);
            console.log(response['status']);
            console.log(response['data'].length);
            if (response) {
                try {
                    table_dp_buffer_cash.clear().draw();
          
                        if (response['data'].length == 0) {
                            alert_info('Data tidak ditemukan');

                        } else {
                            var data = [];

                            $.each(response['data'], function(index) {
                                data.push([
                                    '<input type="checkbox" id= "check-dpho-buff-' + index + '" class="check-dpho-buff">',
                                    this['branch_id']+ ' - ' +this['branch_name'],
                                    this['acc_no']+' - '+this['rek_name'],
                                    this['payment_no'],
                                    accounting.formatMoney(this['total_amount'], '', 2, ',', '.'),
                                    this['payment_detail_id'],
                                    this['bank_id'],
                                    this['acc_no'],
                                    this['branch_id']
                                ]);                           
                            });
                            table_dp_buffer_cash.rows.add(data).draw(false);
                            $('#btn-generate-dpho-buffer').prop("disabled", false);
                            $('#btn-cancel-dpho-buffer').prop("disabled", false);
                            $('#btn-cetakpv-dpho-buffer').prop("disabled", false);
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

//========================================== FUNCTION EXPORT BUFFER ===================================================//
function export_buffer(branch_id, class_code, pv_no) {
    $.ajax({
        url: base_url + "Controller_draft_payment_ho_buffer_cash/export_buffer",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id_ho": branch_id,
            "class_code": class_code,
            "pv_no": pv_no
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    table_nopv.clear().draw();
                    //response = JSON.parse(response);
                    //console.log(response);
                    var data = response['data']['data'];
                    var status = response['data']['status'];
                    console.log(data);
                    console.log(status);
                    if (status == '500') {
                        alert_error(data);
                    } else {
                        alert_info(data);
                    }
                } catch (e) {
                    cancel_buffer(class_code, pv_no);
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Terjadi Kesalahan Get PV Buffer");
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

//========================================== FUNCTION CANCEL GENERATE BUFFER ===================================================//
function cancel_buffer(class_code, pv_no) {
    $.ajax({
        url: base_url + "Controller_draft_payment_ho_buffer_cash/cancel_buffer",
        type: 'POST',
        dataType: 'json',
        data: {
            "class_code": class_code,
            "pv_no": pv_no
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    console.log('CANCEL GENERATE TXT');
                    table_nopv.clear().draw();
                    var data = response['data'];
                    var status = response['status'];
                    console.log(data);
                    if (status == '500') {
                        alert_error(data);
                    } else {
                        alert_error('Generate Text File gagal, Silahkan coba lagi');
                        clear_dpho_buffer();
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

//========================================== FUNCTION CANCEL PV BUFFER ===================================================//
function cancel_buffer_pv(br_id, class_code, pv_no) {
    $.ajax({
        url: base_url + "Controller_draft_payment_ho_buffer_cash/cancel_buffer_pv",
        type: 'POST',
        dataType: 'json',
        data: {
            "br_id": br_id,
            "class_code": class_code,
            "pv_no": pv_no
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    var data = response['data']['data'];
                    var status = response['data']['status'];
                    console.log(data);
                    if (status == true) {
                        alert_info(data);
                        clear_dpho_buffer();
                    } else {
                        alert_error(data);
                        clear_dpho_buffer();
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


//========================================== FUNCTION GENERATE BUFFER ===================================================//
function generate_buffer() {
    class_code_buffer = $('#slc-dpho-buffer-class-code').val();
    pv_no = $('#inp-dpho-buffer-pv-no').val();
    var branch_id_ho = $('#hdn-dpho-branch-code').val();
    console.log(list_data_buffer);
    var data_arr = [];
    // for (var i = 0; i < list_data_buffer.length; i++) {
    //     if ($('#check-dpho-buff-' + i).is(":checked")) {
    //         //var unformat_ammount = accounting.unformat(list_data_buffer[i][4]);
    //         // console.log(unformat_ammount);
    //         data_arr.push({
    //             payment_detail_id: list_data_buffer[i][5],
    //             branch_id: list_data_buffer[i][8],
    //             bank_id: list_data_buffer[i][6],
    //             acc_no: list_data_buffer[i][7]
    //         });
    //     }
    // }
    //hanya untuk set null array nya agar tidak error di java
    data_arr.push({ 
    payment_detail_id: "",
    branch_id: "",
    bank_id: "",
    acc_no: ""
    });
    console.log(data_arr);
    var pv_no_csv = pv_no;
    var d = new Date,
        dformat = [
            d.getDate().padLeft(),
            (d.getMonth() + 1).padLeft(),
            d.getFullYear()
        ].join('-') +
        ' ' + [d.getHours().padLeft(),
            d.getMinutes().padLeft(),
            d.getSeconds().padLeft()
        ].join('.');
    $.ajax({
        url: base_url + "Controller_draft_payment_ho/generate_buffercash",
        type: 'POST',
        dataType: 'TEXT',
        data: {
            "p_branch_id_ho": branch_id_ho,
            "p_class_code": class_code_buffer,
            "pv_no" :pv_no,
            "data": data_arr
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {

                    //var result = response['result'];
                    var status = response['status'];
                    var data = response['data'];
                   // console.log(status);
                   // console.log(data);
                    var res =  $('#hdn-dpho-buffer-res').val(response);
                   //alert( $('#hdn-dpho-buffer-res').val().length);
                    var cari = response.indexOf('||');
                    console.log(cari);
                    var res_fnc = response.substring(0,cari);
                    var res_exp = response.slice(cari);
                    res_exp = res_exp.replace('||','');
                    if (status == '500') {
                        console.log('gagal generate insert_payment_result_buffer');
                        cancel_buffer(class_code_buffer, pv_no_buffer);                  
                    } else {
                        var flag_gen = 0;
                        if (flag_gen == 0 ) {
                        var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(res_fnc);
                        //window.open(uri, 'test.csv');
                        var downloadLink = document.createElement("a");
                        downloadLink.href = uri;
                        downloadLink.download = 'DP_' + pv_no_csv + '_' + dformat + '.csv';
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                        flag_gen = 1;
                        }
                        
                        if (flag_gen == 1) {

                        uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(res_exp);
                        downloadLink = document.createElement("a");
                        downloadLink.href = uri;
                        downloadLink.download = 'EXPORT_' + pv_no_csv + '.csv';
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);  
                        flag_gen = 0;
                        clear_dpho_buffer();
                        alert_info('Nomor PV: '+ pv_no +' sudah dikonfirmasi');
                        }

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


//========================================== FUNCTION CETAK PV ===================================================//
function data_cetak_pv_buffer() {
    class_code_buffer = $('#slc-dpho-buffer-class-code').val();
    pv_no = $('#inp-dpho-buffer-pv-no').val();
    var branch_id_ho = $('#hdn-dpho-branch-code').val();
    $.ajax({
        url: base_url + "Controller_draft_payment_ho_buffer_cash/data_cetak_pv_buffer",
        type: 'POST',
        dataType: 'json',
        data: {
            "br_id": branch_id_ho,
            "pv_no": pv_no,
            "class_code": class_code_buffer
        },
        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    var data = JSON.stringify(response);
                    var status = response['status'];
                        console.log(status);
                        if (status == '200') {
                            $('#inp-cetakpv-dpho-buffer').val(data);
                            var ab = $('#inp-cetakpv-dpho-buffer').val();
                            $("#frm-print-dpho-buffer" ).submit();
                            console.log(ab);
                        }else{
                            alert_error(response['data']);
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


function cetak_pv_buffer() {
    class_code_buffer = $('#slc-dpho-buffer-class-code').val();
    pv_no = $('#inp-dpho-buffer-pv-no').val();
    var branch_id_ho = $('#hdn-dpho-branch-code').val();
    var pv_no_csv = pv_no;
    var d = new Date,
        dformat = [
            d.getDate().padLeft(),
            (d.getMonth() + 1).padLeft(),
            d.getFullYear()
        ].join('-') +
        ' ' + [d.getHours().padLeft(),
            d.getMinutes().padLeft(),
            d.getSeconds().padLeft()
        ].join('.');
    $.ajax({
        url: base_url + "Controller_draft_payment_ho_buffer_cash/cetak_pv_buffer",
        type: 'POST',
        dataType: 'json',
        data: {
            "br_id": branch_id_ho,
            "pv_no": pv_no,
            "class_code": class_code_buffer
        },
        success: function(response) {
            console.log(response);
            if (response) {
                try {
                // var printWindow = window.open();

                // printWindow.document.write('<pre id = "printss" style="font-size:16px"></pre>');
                // printWindow.document.querySelector('pre').innerHTML = response;

                // printWindow.document.close();
                // printWindow.focus();
                // printWindow.print();
                // printWindow.close();
                uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                downloadLink.href = uri;
                downloadLink.download = 'DP_' + pv_no_csv + '_' + dformat + '.pdf';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);


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