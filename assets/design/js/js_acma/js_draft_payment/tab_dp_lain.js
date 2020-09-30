var table_dp_lain_lain = $('#table-dp-lain').DataTable({
    "scrollY":        "300px",
    "scrollCollapse": true,
    "paging":         false,
    "columnDefs": [{
            "width": "10%",
            "targets": 0
        },
        {
            "width": "20%",
            "targets": 1
        },
        {
            "width": "10%",
            "targets": 2
        }
    ]
});

var table_nopdc = $('#tbl-list-nopdc').DataTable({
    responsive: true
});

var table_nopv_dp = $('#tbl-list-nopv-dp').DataTable({
    responsive: true
});
var hasil_nopv_dp = '';
var hasil_nopdc = '';
$('#id-radio-lain-x').hide();
$('#form-dp-lain').hide();
var tambah_form_arr = [];
var total_amt_lain_dp = parseInt($('#inp-dp-cust-total').val());
var flag_search_pdc_dpc = 0;
var pc_code_lain;
var pc_code_desk;
var acc_no_dplain;
var response_get_bank_lain;
var response_get_obj_group_lain;
$('#btn-tambah-dp-lain').show();
table_dp_lain_lain.clear().draw();


//========================================== FUNCTION KLICK TAB LAIN ===================================================//
$('#id-tab-dp-lain').click(function() {

    if (check_session() === 'true') {

        localStorage.setItem("menu", "draft_payment_lain");
        $('#inp-pdc-pv-cust').val('');
        $('#inp-pdc-pv-cabang').val('');
        var list_data_dp_lain = '';
        var radio_val_dp_lain = '';
        var pay_to_dp_lain = $('#inp-dp-lain-payto').val();
        $('#inp-jumlah-total-dp-lain').val(0);
        $('#div-id-pdc-dp-lain').hide();
        $('#inp-dp-lain-tglpv').val(today);
        $('#inp-dp-lain-tanggalpdc').val(today);
        $('#inp-dp-lain-duepdc').val(today);
        var slc_cashbank_dplain = $('#slc-dp-lain-cashbank').val();
        console.log(slc_cashbank_dplain);
        inp_branch_dp_id = $('#slc-dp-branch').val();
        get_bank_lain_dp(0, inp_branch_dp_id);
        get_class_code_lain();
        get_bank_pdc_lain(inp_branch_dp_id, '0');
        clear_tab_lain();
        $.each(role_dpc, function(i) {
            console.log(role_dpc[i]['role_code']);
            if (role_dpc[i]['role_code'] === 'SBMT_DPC') {
                console.log('submit')
                $('#btn-save-dp-cust, #btn-save-dp-cabang, #btn-save-dp-lain, #id-btn-tambah-dp-lain').prop('disabled', false);
                $('#btn-tambah-dp-lain').show();
                return false;

            } else if (role_dpc[i]['role_code'] === 'VIEW_DPC') {
                console.log('view');
                $('#btn-save-dp-cust, #btn-save-dp-cabang, #btn-save-dp-lain, #id-btn-tambah-dp-lain, #btn-print-dp-lain').prop('disabled', true);
                $('#btn-tambah-dp-lain').hide();
                return false;
            }
        });


    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }


}); //tutup id tab lain

//========================================== ON CHANGE CABANG ===================================================//
$('#slc-dp-branch').change(function() {
    inp_branch_dp_id = $('#slc-dp-branch').val();
    if ($('#tab-dp-lain').hasClass('active')) {
        get_bank_lain_dp(0, inp_branch_dp_id);
    }
});

//========================================== ONCHANGE CASB/BANK CODE ===================================================//
$('#slc-dp-lain-cashbank').change(function() {
    slc_cashbank_dplain = $('#slc-dp-lain-cashbank').val();
    console.log(response_get_bank_lain);
    $.each(response_get_bank_lain['data'], function(i) {
        var bank_code = response_get_bank_lain['data'][i]['bankCode'];
        var bank_name = response_get_bank_lain['data'][i]['bankName'];
        var acc_no = response_get_bank_lain['data'][i]['accNo'];
        if (bank_code === slc_cashbank_dplain) {
            $('#inp-dp-lain-ac').val(acc_no);
            $('#hdn-dplain-bank-desc').val(bank_name);
            $('#hdn-dplain-bank-accno').val(acc_no);
            console.log(bank_name,acc_no);
        } else if (slc_cashbank_dplain === '') {
            $('#inp-dp-lain-ac').val('');
        }
    });
});

//========================================== FUNCTION GET BANK ACCNO ===================================================//
$('#slc-bank-iss-mdl').change(function() {
    var bank_pdc = $('#slc-bank-iss-mdl').val();
    console.log(response_get_bank_lain);
    $.each(response_get_bank_lain['data'], function(i) {
        var bank_code = response_get_bank_lain['data'][i]['bankCode'];
        var bank_name = response_get_bank_lain['data'][i]['bankName'];
        var acc_no = response_get_bank_lain['data'][i]['accNo'];
        if (bank_code === bank_pdc) {
            $('#hdn-dplain-bank-desc').val(bank_name);
            $('#hdn-dplain-bank-accno').val(acc_no);
        } else if (bank_pdc === '') {
            $('#hdn-dplain-bank-desc').val('');
        }

    });
});


//========================================== FUNCTION ON CHANGE DESKRIPSI CLASS CODE ===================================================//
$('#slc-class-code-form-dp-lain').change(function() {
    get_brief_desc();

});

//========================================== FUNCTION ON CHANGE PAYMENT TYPE ===================================================//
$('input[name="rd-payment-type-lain"]').click(function() {
    if (this.value == 'C') {
        $('#div-id-cash-dp-lain').show();
        $('#div-id-panel-dp-lain').css('margin-bottom', '40px');
        $('#div-id-rd-dp-lain').css('padding-bottom', '14px');
        $('.btn-add-pdc-pv').prop('disabled', true);
        $('#div-id-pdc-dp-lain').hide();
        $('#inp-pdc-pv-lain').val('');

    } else if (this.value == 'G') {
        $('#div-id-pdc-dp-lain').show();
        $('#div-id-panel-dp-lain').css('margin-bottom', '161px');
        $('#div-id-rd-dp-lain').css('padding-bottom', '50px');
        $('#div-id-cash-dp-lain').hide();
        $('.btn-add-pdc-pv').prop('disabled', false);
        $('#radio-pdc-lain').prop('disabled', false);
        $('#inp-pdc-pv-lain').prop('disabled', false);
    }

});




//========================================== FUNCTION RADIO BUTTON PAYMENT TYPE ===================================================//
$('input[name="payment-type-dp-lain"]').click(function() {
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

//========================================== BUTTON TAMBAH DETAIL ===================================================//
$('#btn-tambah-dp-lain').click(function() {

    if (check_session() === 'true') {

        var pay_to_lain = $('#inp-dp-lain-payto').val();
        if (pay_to_lain === null || pay_to_lain === '') {
            alert_error('Dimohon untuk mengisi pay to terlebih dahulu');
            $('#div-pay-to-lain').addClass('has-error');
        } else {
            $('#div-pay-to-lain').removeClass('has-error');
            console.log('dor');
            $('#slc-class-code-form-dp-lain').prop('selectedIndex', 0);
            $('#inp-deskripsi-dp-lain').val('');
            $('#inp-keterangan-transaksi-dp-lain').val('');
            $('#slc-cabang-form-dp-lain').prop('selectedIndex', 0);
            $('#slc-bank-cabang-form-dp-lain').prop('selectedIndex', 0);
            $('#slc-bank-cabang-form-dp-lain').prop('disabled', true);
            $('#slc-pc-code-form-dp-lain').prop('selectedIndex', 0);
            $('#inp-jumlah-form-dp-lain').val('');
            p_total_amount = $('#inp-jumlah-total-dp-lain').val();
            console.log(p_total_amount);
            $('#inp-no-kontrak-dp-lain').val('');
            var val_pccode = $('#slc-pc-code-form-dp-lain').val();
            if (val_pccode === null || val_pccode === '') {
                get_obj_others();
            } else {

            }

            branch_code_dp = $('#hdn-dp-branch-code').val();
            branch_name_dp = $('#hdn-dp-branch-name').val();
            if (branch_code_dp !== '0000') {
                $('#slc-cabang-form-dp-lain').prop('disabled', true);
                $('<option/>').val(branch_code_dp).html(branch_code_dp + ' - ' + branch_name_dp).appendTo('#slc-cabang-form-dp-lain');
            } else {
                get_data_branch('#slc-cabang-form-dp-lain');
            }

            //format money ketika focus out 
            $('#inp-jumlah-form-dp-lain').focus(function(){
                    $('#inp-jumlah-form-dp-lain').blur(function(){
                      var jml_amt_dtl = $('#inp-jumlah-form-dp-lain').val();
                      $('#inp-jumlah-form-dp-lain').val(accounting.formatMoney(jml_amt_dtl, '', 2, ',', '.'));
                    });
            });


        }


    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }

});

//========================================== BUTTON SAVE TAB LAIN ===================================================//
//FUNCTION ONCLICK BTN SAVE LAIN
$('#btn-save-dp-lain').click(function() {

    if (check_session() === 'true') {

        var slc_cabang_lain = $('#slc-dp-branch').val();
        var payment_to = $('#inp-dp-lain-payto').val();
        if (slc_cabang_lain === '') {
            alert_error('Harap memilih cabang terlebih dahulu');
            $('#id-main-form-dp-customer').addClass('has-error');
        } else if (payment_to === '') {
            alert_error('Harap mengisi kolom pay to terlebih dahulu');
            $('#div-pay-to-lain').addClass('has-error');

        } else {
            $('#id-main-form-dp-customer').removeClass('has-error');
            $('#div-pay-to-lain').removeClass('has-error');

            var check_lenght = table_dp_lain_lain.data().count();
            console.log(check_lenght);

            list_data_dp_lain = table_dp_lain_lain.data();
            console.log(list_data_dp_lain);
            radio_val_dp_lain = $('input[name="rd-payment-type-lain"]:checked').val();
            console.log(radio_val_dp_lain);
            var inp_pdc_pv_lain = $('#inp-pdc-pv-lain').val();
            if (radio_val_dp_lain === 'C') {
                if (check_lenght === 0) {
                    alert_error('Pilih data yang akan dibuatkan PV terlebih dahulu !');
                } else {

                    var bank_id = $('#slc-dp-lain-cashbank').val();
                    var remarks = $('#inp-dp-lain-remarks').val();
                    console.log(bank_id, remarks);
                    var no_pv_lain = $('#inp-dp-lain-pvno').val();
                    if (bank_id === '' || bank_id == '00') {
                        alert_error('Dimohon untuk memilih bank code !');
                        $('#div-cashbank-lain').addClass('has-error');
                    } else if (remarks === '') {
                        alert_error('Dimohon untuk mengisi remarks !');
                        $('#div-remarks-lain').addClass('has-error');
                    } else {
                        $('#div-pvno-lain').removeClass('has-error');
                        $('#div-pvno-lain').removeClass('has-error');
                        $('#div-cashbank-lain').removeClass('has-error');
                        $('#div-remarks-lain').removeClass('has-error');
                        alert_confirm('Apakah anda yakin ingin menyimpan data ?', function() {

                            save_data_tab_lain();

                        }); //alert confirm  

                    }


                }

                $('#div-pdc-pv-lain').removeClass('has-error');
            } else {
                if (inp_pdc_pv_lain === null || inp_pdc_pv_lain === '') {
                    alert_error('Dimohon untuk mengisi nomor PDC terlebih dahulu');
                    $('#div-pdc-pv-lain').addClass('has-error');
                } else {
                    $('#div-pdc-pv-lain').removeClass('has-error');
                    if (check_lenght === 0) {
                        alert_error('Pilih data yang akan dibuatkan PV terlebih dahulu !');
                    } else {
                        // get_data_employee();
                        alert_confirm('Apakah anda yakin ingin menyimpan data ?', function() {

                            save_data_tab_lain_pdc();
                        }); //alert confirm 
                    }
                } // IF NO PDC NULL
            }
        } //if cabang null


    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }



});

//========================================== BUTTON SAVE PADA TAMBAH ===================================================//
$('#btn-save-form-dp-lain').click(function() {

    if (check_session() === 'true') {
        var class_code_form = $('#slc-class-code-form-dp-lain').val();
        var deskripsi_form = $('#inp-deskripsi-dp-lain').val();
        var keterangan_transaksi = $('#inp-keterangan-transaksi-dp-lain').val().toUpperCase();
        var cabang_form = $('#slc-cabang-form-dp-lain').val();
        var bank_cabang = $('#slc-bank-cabang-form-dp-lain').val();
        //var no_kontrak = $('#inp-no-kontrak-dp-lain').val();
        var pc_code_form = $('#slc-pc-code-form-dp-lain').val();
        var jumlah_form = $('#inp-jumlah-form-dp-lain').val();
        branch_name_dp = $('#hdn-dp-branch-name').val();
        var aksi = "<a class='btn btn-transparent btn-xs btn-detail-dpho-lain' data-placement='top' data-original-title='Detail'><i class='fa fa-pencil'></i></a><a class='btn btn-transparent btn-xs tooltips btn-delete-dpho-lain' data-placement='top' data-toggle='tooltip' data-original-title='Remove'><i class='fa fa-times fa fa-white'></i></a>";
        var arr_dp_lain = [];
        var cabang_gabungan = cabang_form + ' - ' + branch_name_dp;
        var pc_code_gabungan = '';
        console.log(response_get_obj_group_lain);
        pc_code_lain = $('#hdn-dplain-pccode').val();
        pc_code_desk = $('#hdn-dplain-pccode-desc').val();
        console.log(pc_code_lain, pc_code_desk);
        pc_code_gabungan = pc_code_form + ' - ' + pc_code_desk.toUpperCase();
        console.log(pc_code_gabungan);
        if (class_code_form === null || class_code_form === '') {
            alert_error('Dimohon untuk memilih class code terlebih dahulu');
            $('#div-class-code-lain').addClass('has-error');
        } else if (keterangan_transaksi === null || keterangan_transaksi === '') {
            alert_error('Dimohon untuk mengisi keterangan transaksi terlebih dahulu');
            $('#div-keterangan-transaksi-lain').addClass('has-error');
        } else if (pc_code_form === null || pc_code_form === '' || pc_code_form === '0') {
            alert_error('Dimohon untuk memilih pc code terlebih dahulu');
            $('#div-pc-code-lain').addClass('has-error');
        } else if (jumlah_form === null || jumlah_form === '') {
            alert_error('Dimohon untuk mengisi jumlah terlebih dahulu');
            $('#div-jumlah-lain').addClass('has-error');
        } else if (jumlah_form === 0 || jumlah_form <= 0) {
            alert_error('Jumlah amount tidak boleh sama dengan atau kurang dari 0');
            $('#div-jumlah-lain').addClass('has-error');
        } else {
            $('#div-class-code-lain').removeClass('has-error');
            $('#div-keterangan-transaksi-lain').removeClass('has-error');
            $('#div-pc-code-lain').removeClass('has-error');
            $('#div-jumlah-lain').removeClass('has-error');
            $('#div-jumlah-lain').removeClass('has-error');

            jumlah_form = accounting.formatMoney(jumlah_form, '', 2, ',', '.');
            arr_dp_lain.push({
                class_code_form,
                deskripsi_form,
                //no_kontrak,
                keterangan_transaksi,
                cabang_gabungan,
                bank_cabang,
                pc_code_gabungan,
                jumlah_form,
                aksi
            });
            console.log(arr_dp_lain);
            $.each(arr_dp_lain, function(index) {
                table_dp_lain_lain.row.add([
                    this['class_code_form'],
                    this['deskripsi_form'],
                    //this['no_kontrak'],
                    this['keterangan_transaksi'],
                    this['cabang_gabungan'],
                    this['bank_cabang'],
                    this['pc_code_gabungan'],
                    this['jumlah_form'],
                    this['aksi']
                ]).draw(false);
            });

            console.log(jumlah_form);
            jumlah_form = accounting.unformat(jumlah_form);
            console.log(jumlah_form);
            total_amt_lain_dp += parseFloat(jumlah_form);
            $('#inp-jumlah-total-dp-lain').val(accounting.formatMoney(total_amt_lain_dp, '', 2, ',', '.'));

            tambah_form_arr = [];
            flag_form_dplain = 0; 
           $("#form-dp-lain").slideUp(1220);
            // $('#inp-jumlah-form-dp-lain').val('');
        }


    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }


});

//========================================== BUTTON EDIT DETAIL ===================================================//
$('#table-dp-lain').on('click', '.btn-detail-dpho-lain', function() {
    pilih_detail = table_dp_lain_lain.row($(this).closest('tr')).data();
    console.log(pilih_detail);
    var class_code_form = $('#slc-class-code-form-dp-lain').val(pilih_detail[0]);
    var deskripsi_form = $('#inp-deskripsi-dp-lain').val(pilih_detail[1]);
    //var no_kontrak = $('#inp-no-kontrak-dp-lain').val(pilih_detail[2]);
    var keterangan_transaksi = $('#inp-keterangan-transaksi-dp-lain').val(pilih_detail[2]);
    var split_cabang = pilih_detail[3].split(' - ');
    var split_pc = pilih_detail[5].split(' - ');
    var cabang_form = $('#slc-cabang-form-dp-lain').val(split_cabang[0]);
    var bank_cabang = $('#slc-bank-cabang-form-dp-lain').val(pilih_detail[4]);
    var pc_code_form = $('#slc-pc-code-form-dp-lain').val(split_pc[0]);
    var jml = accounting.unformat(pilih_detail[6]);
    var jml_format = pilih_detail[6];
    var jumlah_form = $('#inp-jumlah-form-dp-lain').val(jml_format);
    $('#btn-tambah-dp-lain').parent().next('.form-horizontal').slideToggle("slow");
    table_dp_lain_lain.row($(this).parents('tr')).remove().draw();
    console.log(total_amt_lain_dp);
    console.log(jml);
    total_amt_lain_dp -= parseInt(jml);
    console.log(total_amt_lain_dp);
    $('#inp-jumlah-total-dp-lain').val(accounting.formatMoney(total_amt_lain_dp, '', 2, ',', '.'));
});

//========================================== ONCLICK TABLE DP LAIN ===================================================//
$('#table-dp-lain').on('click', '.btn-delete-dpho-lain', function() {
    pilih_detail = table_dp_lain_lain.row($(this).closest('tr')).data();
    console.log(pilih_detail);
    var amt = accounting.unformat(pilih_detail[6]);
    total_amt_lain_dp -= parseInt(amt);
    console.log(total_amt_lain_dp);
    $('#inp-jumlah-total-dp-lain').val(accounting.formatMoney(total_amt_lain_dp, '', 2, ',', '.'));
    table_dp_lain_lain.row($(this).parents('tr')).remove().draw();
});


//========================================== FUNCTION CLICK GET NO PDC ===================================================//
$( "#inp-pdc-pv-lain" ).keypress(function(e) {
   var key = e.which;
   if(key == 13)  // the enter key code
     {
        $('#btn-search-pdc-lain').click();
             $('#inp-dp-lain-regno').trigger('focus');
        return false;  
     }

});

$('#btn-search-pdc-lain').click(function() {
    if (check_session() === 'true') {

        var slc_cabang_lain = $('#slc-dp-branch').val();
        var no_pdc_dp = $('#inp-pdc-pv-lain').val();
        $('#inp-dp-lain-documentno').val('');
        $('#inp-dp-lain-pvno').val('');
        $('#inp-dp-lain-payto').val('');
        get_nopdc_lain(slc_cabang_lain, no_pdc_dp);
        $('#inp-dp-lain-regno').trigger('focus');
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }

});

//========================================== FUNCTION CLICK GET PV ===================================================//

$( "#inp-dp-lain-pvno" ).keypress(function(e) {
   var key = e.which;
   if(key == 13)  // the enter key code
     {
        $('#btn-search-pvno-dp-lain').click();
        $('#inp-dp-lain-regno').trigger('focus');
        return false;  
     }

});

$('#btn-search-pvno-dp-lain').click(function() {

    if (check_session() === 'true') {

        var slc_cabang_lain = $('#slc-dp-branch').val();
        var nopv_dp = $('#inp-dp-lain-pvno').val();
        console.log(nopv_dp);
        $('#inp-dp-lain-regno').trigger('focus');
        if ($('#inp-dp-lain-pvno').attr('disabled')) {
            clear_tab_lain();
            nopv_dp = '';
            get_nopv_lain(slc_cabang_lain, nopv_dp);
        } else {
            clear_tab_lain();
            get_nopv_lain(slc_cabang_lain, nopv_dp);
        }

    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }

});

//========================================== FUNCTION CLEAR TAB LAIN ===================================================//
$('#btn-clear-dp-lain').click(function() {
    if (check_session() === 'true') {
        clear_tab_lain();
    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

//========================================== FUNCTION BTN PRINT TAB LAIN  ===================================================//
$('#btn-print-dp-lain').click(function() {

    if (check_session() === 'true') {

        if ($('#rd-cash-dp-lain').is(':checked')) {

            slc_cashbank_dplain = $('#slc-dp-lain-cashbank').val();
            console.log(slc_cashbank_dplain);
            console.log(response_get_bank_lain);
            $.each(response_get_bank_lain['data'], function(i) {
                var bank_code = response_get_bank_lain['data'][i]['bankCode'];
                var bank_name = response_get_bank_lain['data'][i]['bankName'];
                var acc_no = response_get_bank_lain['data'][i]['accNo'];
                if (bank_code === slc_cashbank_dplain) {
                    $('#inp-dp-lain-ac').val(acc_no);
                    $('#hdn-dplain-bank-desc').val(bank_name);
                    $('#hdn-dplain-bank-accno').val(acc_no);
                } else if (slc_cashbank_dplain === '') {
                    $('#inp-dp-lain-ac').val('');
                }
            });

        } else {

            var bank_pdc = $('#slc-bank-iss-mdl').val();
            $.each(response_get_bank_lain['data'], function(i) {
                var bank_code = response_get_bank_lain['data'][i]['bankCode'];
                var bank_name = response_get_bank_lain['data'][i]['bankName'];
                var acc_no = response_get_bank_lain['data'][i]['accNo'];
                if (bank_code === bank_pdc) {
                    $('#hdn-dplain-bank-desc').val(bank_name);
                    $('#hdn-dplain-bank-accno').val(acc_no);
                } else if (bank_pdc === '') {
                    $('#hdn-dplain-bank-desc').val('');
                }

            });

        }
        // $("#printabel").remove();
        // loadOtherPage1();

        alert_confirm('Apakah anda yakin ingin mencetak data ?', function() {
            data_pv_lain_pdf();
           //print_pv_lain_pdf();
            //print_pv_lain2();
        }); //alert confirm  


    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }


});

//========================================== FUNCTION BTN CANCEL PV ===================================================//
$('#btn-cancel-dp-lain').click(function() {
    if (check_session() === 'true') {

        var check_lenght = table_dp_lain_lain.data().count();
        console.log(check_lenght);

        list_data_dp_lain = table_dp_lain_lain.data();
        console.log(list_data_dp_lain);
        var slc_cabang_lain = $('#slc-dp-branch').val();
        var payment_to = $('#inp-dp-lain-payto').val();
        if (slc_cabang_lain === '') {
            alert_error('Harap memilih cabang terlebih dahulu');
            $('#id-main-form-dp-customer').addClass('has-error');
        } else if (payment_to === '') {
            alert_error('Harap mengisi kolom pay to terlebih dahulu');
            $('#div-pay-to-lain').addClass('has-error');

        } else {
            $('#id-main-form-dp-customer').removeClass('has-error');
            $('#div-pay-to-lain').removeClass('has-error');

            alert_confirm('Apakah anda yakin ingin Men-Cancel data ini ?', function() {
                var no_pv_lain = $('#inp-dp-lain-pvno').val();
                if (no_pv_lain !== '' && no_pv_lain.length === 13) {
                    cancel_data_lain();
                } else {
                    alert_error('Nomor pv harus terdiri dari 13 digit !');
                }
            }); //alert confirm  
        } // IF CABANG NULL

    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }


});

//========================================== FUNCTION BTN PAID TAB LAIN ===================================================//
$('#btn-paid-dp-lain').click(function() {

    if (check_session() === 'true') {

        var slc_cabang_lain = $('#slc-dp-branch').val();
        var payment_to = $('#inp-dp-lain-payto').val();
        if (slc_cabang_lain === '') {
            alert_error('Harap memilih cabang terlebih dahulu');
            $('#id-main-form-dp-customer').addClass('has-error');
        } else if (payment_to === '') {
            alert_error('Harap mengisi kolom pay to terlebih dahulu');
            $('#div-pay-to-lain').addClass('has-error');

        } else {
            $('#id-main-form-dp-customer').removeClass('has-error');
            $('#div-pay-to-lain').removeClass('has-error');

            var check_lenght = table_dp_lain_lain.data().count();
            console.log(check_lenght);

            list_data_dp_lain = table_dp_lain_lain.data();
            console.log(list_data_dp_lain);
            radio_val_dp_lain = $('input[name="rd-payment-type-lain"]:checked').val();
            console.log(radio_val_dp_lain);
            var inp_pdc_pv_lain = $('#inp-pdc-pv-lain').val();


            if (radio_val_dp_lain === 'C') {
                if (check_lenght === 0) {
                    alert_error('Pilih data yang akan dibuatkan PV terlebih dahulu !');
                } else {
                    var bank_id = $('#slc-dp-lain-cashbank').val();
                    var remarks = $('#inp-dp-lain-remarks').val();
                    console.log(bank_id, remarks);
                    var no_pv_lain = $('#inp-dp-lain-pvno').val();
                    if (no_pv_lain === '') {
                        alert_error('Nomor PV tidak boleh kosong  !');
                        $('#div-pvno-lain').addClass('has-error');
                    } else if (no_pv_lain.length !== 13) {
                        alert_error('Nomor PV harus teridiri dari 13 digit !');
                        $('#div-pvno-lain').addClass('has-error');
                    } else if (bank_id === '') {
                        alert_error('Dimohon untuk memilih bank code !');
                        $('#div-cashbank-lain').addClass('has-error');
                    } else if (remarks === '') {
                        alert_error('Dimohon untuk mengisi remarks !');
                        $('#div-remarks-lain').addClass('has-error');
                    } else {
                        $('#div-pvno-lain').removeClass('has-error');
                        $('#div-pvno-lain').removeClass('has-error');
                        $('#div-cashbank-lain').removeClass('has-error');
                        $('#div-remarks-lain').removeClass('has-error');
                        alert_confirm('Apakah anda yakin ingin menyimpan data ?', function() {

                            paid_data_lain_pdc();

                        }); //alert confirm  

                    }

                }

                $('#div-pdc-pv-lain').removeClass('has-error');

            } else {
                if (inp_pdc_pv_lain === null || inp_pdc_pv_lain === '') {
                    alert_error('Dimohon untuk mengisi nomor PDC terlebih dahulu');
                    $('#div-pdc-pv-lain').addClass('has-error');
                } else {
                    $('#div-pdc-pv-lain').removeClass('has-error');
                    if (check_lenght === 0) {
                        alert_error('Pilih data yang akan diPaid terlebih dahulu !');
                    } else {
                        // get_data_employee();
                        alert_confirm('Apakah anda yakin ingin Me-Paid data ini ?', function() {

                            paid_data_lain_pdc();
                        }); //alert confirm 
                    }
                } // IF NO PDC NULL
            }
        } //if cabang null

    } else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }

});

//========================================== FUNCTION CLEAR TAB LAIN ===================================================//
function clear_tab_lain() {
    table_dp_lain_lain.clear().draw();
    $('.res-global').val('');
    $('.res-select').prop('selectedIndex', 0);
    $('#rd-cash-dp-lain').prop('checked', true);
    $('#inp-dp-lain-pvno').prop('disabled', false);
    $('#inp-jumlah-total-dp-lain').val(0);
    $('#inp-dp-lain-pvno').prop('disabled', false);
    $('#inp-dp-lain-regno').prop('disabled', false);
    $('#inp-pdc-pv-lain').prop('disabled', false);
    $('#radio-pdc-lain').prop('disabled', false);
    $('#div-id-cash-dp-lain').show();
    $('#div-id-pdc-dp-lain').hide();
    $('#div-id-panel-dp-lain').css('margin-bottom', '40px');
    $('#div-id-rd-dp-lain').css('padding-bottom', '14px');
    $('.btn-add-pdc-pv').prop('disabled', true);
    $('#btn-paid-dp-lain').prop('disabled', true);
    $('#btn-save-dp-lain').prop('disabled', false);
    $('#slc-dp-lain-cashbank').prop('disabled', false);
    $('#inp-pdc-no-mdl').prop('disabled', false);
    $('#slc-bank-iss-mdl').prop('disabled', false);
    $('#inp-bank-branch-mdl').prop('disabled', false);
    $('#inp-due-date-mdl').prop('disabled', false);
    $('#chk-inkaso-pdc-dr').prop('disabled', false);
    $('#btn-search-pdc-lain').prop('disabled', false);
    $('#btn-conf-pdc').prop('disabled', false);
    $('#btn-print-dp-lain').prop('disabled', true);
    $('#btn-cancel-dp-lain').prop('disabled', true);
    $('#btn-tambah-dp-lain').show();
    $('#rd-cash-dp-lain').prop('disabled', false);
    $('#rd-pdc-dp-lain').prop('disabled', false);
    $('#inp-dp-lain-payto').prop('disabled', false);
    $('#inp-dp-lain-remarks').prop('disabled', false);
    $('#inp-pdc-no-mdl').val('');
    $('#inp-bank-branch-mdl').val('');
    $('#slc-bank-iss-mdl').prop('selectedIndex', 0);
    $('#chk-inkaso-pdc-dr').prop('checked', false);
    $("#form-dp-lain").slideUp(1220);
    // if (flag_form_dplain == 1) {
    //     $('#btn-tambah-dp-lain').click();
    //     flag_form_dplain = 0
    // }else{
    //     flag_form_dplain = 0
    // }
    $('#div-pay-to-lain').removeClass('has-error');
   // flag_search_pdc_dpc = 0;
    p_total_amount = 0;
    total_amt_lain_dp = 0;

    $.each(role_dpc, function(i) {
        console.log(role_dpc[i]['role_code']);
        if (role_dpc[i]['role_code'] === 'SBMT_DPC') {
            console.log('submit')
            $('#btn-save-dp-cust, #btn-save-dp-cabang, #btn-save-dp-lain, #id-btn-tambah-dp-lain').prop('disabled', false);
            $('#btn-tambah-dp-lain').show();
            return false;
        } else if (role_dpc[i]['role_code'] === 'VIEW_DPC') {
            console.log('view');
            $('#btn-save-dp-cust, #btn-save-dp-cabang, #btn-save-dp-lain, #id-btn-tambah-dp-lain, #btn-print-dp-lain').prop('disabled', true);
            $('#btn-tambah-dp-lain').hide();
            return false;
        }
    });



}
//========================================== FUNCTION GET CLASS CODE LAIN ===================================================//
function get_class_code_lain() {
    $.ajax({
        url: "Controller_draft_payment/get_classcode_lain",
        type: 'GET',
        dataType: 'json',

        success: function(response) {
            if (response) {
                try {
                    $('#slc-class-code-form-dp-lain').empty();
                    console.log(response['data']);
                    $('<option/>').val('').html('--SILAHKAN PILIH--').appendTo('#slc-class-code-form-dp-lain').addClass('form-control');
                    $.each(response['data'], function(list) {

                        $('#slc-class-code-form-dp-lain').append('<option value="' + this['acct_interface_group'] + '">' + this['acct_interface_group'] + ' - ' + this['acct_brief_desc'] + '</option>');
                    });
                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error("Terjadi Kesalahan Get Class Code Lain");
                }
            } //if response

        },
        error: function(response) {
            console.log(response);
        }
    });


};


//========================================== FUNCTION GET KETERANGAN CLASS CODE / BRIEF DESC ===================================================//
function get_brief_desc() {
    var class_code_form = $('#slc-class-code-form-dp-lain').val();
    $.ajax({
        url: base_url + "Controller_draft_payment/get_briefdesc",
        type: 'POST',
        dataType: 'json',
        data: {
            "p_class_code": class_code_form
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    console.log(response['data']);
                    $.each(response['data'], function(list) {

                        var deskripsi_form = $('#inp-deskripsi-dp-lain').val(this['acct_brief_desc']);
                    });


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


//========================================== FUNCTION SAVE DATA TAB LAIN ===================================================//
function save_data_tab_lain() {
    pay_to_dp_lain = $('#inp-dp-lain-payto').val();
    inp_branch_dp_id = $('#slc-dp-branch').val();
    p_total_amount = $('#inp-jumlah-total-dp-lain').val();
    var reg_no = $('#inp-dp-lain-regno').val();
    var remarks = $('#inp-dp-lain-remarks').val();
    var bank_id = $('#slc-dp-lain-cashbank').val();
    //inp_branch_dp_id = '0104';
    // console.log(p_total_amount);
    p_total_amount_cust = accounting.unformat(p_total_amount);
    console.log(p_total_amount_cust);
    console.log(list_data_dp_lain);

    var amount_lain = '';
    var class_code_lain = '';
    var keterangan_lain = '';
    var no_kontrak = '';

    console.log(radio_val_dp_lain);

    var data_arr = [];
    for (var i = 0; i < list_data_dp_lain.length; i++) {
        //if ($('#check-dp-' + i).is(":checked")) {
        var unformat_ammount = accounting.unformat(list_data_dp_lain[i][6]);
        console.log(unformat_ammount);
        data_arr.push({
            //no_kontrak: list_data_dp_lain[i][2],
            amount_lain: unformat_ammount,
            class_code_lain: list_data_dp_lain[i][0],
            keterangan_lain: list_data_dp_lain[i][2]
        });
        //}
    }
    console.log(data_arr);

    $.ajax({
        url: base_url + "Controller_draft_payment/save_data_lain",
        type: 'POST',
        dataType: 'json',
        data: {
            "p_br_id": inp_branch_dp_id,
            "p_payment_to": pay_to_dp_lain,
            "p_payment_type": radio_val_dp_lain,
            "p_total_amount": p_total_amount_cust,
            "p_reg_no": reg_no,
            "p_remarks": remarks,
            "p_bank_id": bank_id,
            "data": data_arr

        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    var status_save = response['status'];
                    var notif = response['notif'];
                    var result = response['result'];
                    console.log(status_save);
                    if (result === false) {
                        console.log('gagal save');
                        alert_error(status_save);
                    } else {
                        console.log('berhasil save');
                        alert_info(response['success']);
                        nomor_pv = response['nomor_pv'];
                        var doc_no = response['doc_no'];
                        console.log(nomor_pv);
                        console.log(doc_no);
                        $('#inp-dp-lain-pvno').val(nomor_pv);
                        $('#inp-dp-lain-nomor-pv').val(nomor_pv);
                        $('#inp-dp-lain-pvno').prop('disabled', true);
                        $('#inp-dp-lain-documentno').val(doc_no);
                        $('.btn-detail-dpho-lain').hide();
                        $('.btn-delete-dpho-lain').hide();
                        $('.btn-detail-dpho-lain').prop('disabled', true);
                        $('.btn-delete-dpho-lain').hide('disabled', true);
                        $('#btn-save-dp-lain').prop('disabled', true);
                        $('#btn-cancel-dp-lain').prop('disabled', false);
                        // $('#inp-dp-lain-regno').prop('disabled', true);

                        // table_dp_lain_lain.clear().draw();
                        //$('#inp-dp-lain-payto').val('');
                        //$('#inp-jumlah-total-dp-lain').val('');
                        $('#btn-paid-dp-lain').prop('disabled', false);
                        total_amt_lain_dp = 0;
                        p_total_amount = 0;
                        $('#btn-tambah-dp-lain').hide();
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
        }
    });

}


//========================================== FUNCTION GET CLASS CODE CUSTOMER ===================================================//
function get_obj_group_lain() {
    $.ajax({
        url: "Controller_draft_payment/get_objgroup_cabang",
        type: 'GET',
        dataType: 'json',

        success: function(response) {
            if (response) {
                try {

                    console.log(response['data']);
                    $('#slc-pc-code-form-dp-lain').empty();
                    $('<option/>').val('0').html('--SILAHKAN PILIH--').appendTo('#slc-pc-code-form-dp-lain').addClass('form-control');
                    $.each(response['data'], function(list) {

                        $('#slc-pc-code-form-dp-lain').append('<option value="' + this['obj_group_code'] + ' - ' + this['obj_group_desc'] + '">' + this['obj_group_code'] + ' - ' + this['obj_group_desc'] + '</option>');



                    });
                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error("Gagal get data object group");
                }
            } //if response

        },
        error: function(response) {
            console.log(response);
        }
    });

};

//========================================== FUNCTION GET CLASS CODE CUSTOMER ===================================================//
function get_bank_lain_dp(bank_stat, bank_br_id) {
    $.ajax({
        url: "Controller_draft_payment/get_bank_mdm_dp",
        type: 'POST',
        dataType: 'json',
        data: {
            "bank_stat": bank_stat,
            "bank_br_id": bank_br_id
        },
        cache: false,

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    $('#slc-dp-lain-cashbank').empty();
                    response_get_bank_lain = response;
                    var status = response['status'];
                    console.log(status);
                    if (status == true) {
                        $('<option/>').val('00').html('-- SILAHKAN PILIH --').appendTo('#slc-dp-lain-cashbank').addClass('form-control');
                        $.each(response['data'], function(i) {
                            var bank_code = response['data'][i]['bankCode'];
                            var bank_name = response['data'][i]['bankName'];
                            $('#slc-dp-lain-cashbank').append('<option value="' + bank_code + '">' + bank_code + ' - ' + bank_name + '</option>');
                        })
                    } else {
                        var notif = response['data'];
                        alert_error(notif);
                    }

                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error(e);
                }
            } else {
                alert_error("Cek Jaringan");
            }
        },
        error: function(response) {
            console.log(response);
        }
    });
};


//========================================== FUNCTION GET CLASS CODE CUSTOMER ===================================================//
function get_obj_others() {
    $.ajax({
        url: "Controller_draft_payment/get_obj_others",
        type: 'POST',
        dataType: 'json',

        success: function(response) {
            if (response) {
                try {

                    $('#slc-pc-code-form-dp-lain').empty();
                    //$('<option/>').val('0').html('--SILAHKAN PILIH--').appendTo('#slc-pc-code-form-dp-lain').addClass('form-control');
                    var obj_Code = response['data']['data']['objCode'];
                    var obj_Desc = response['data']['data']['objDesc'];
                    $('#hdn-dplain-pccode').val(obj_Code);
                    $('#hdn-dplain-pccode-desc').val(obj_Desc);

                    console.log(obj_Code);
                    $('#slc-pc-code-form-dp-lain').append('<option value="' + obj_Code + '">' + obj_Code + ' - ' + obj_Desc + '</option>');
                    // $.each(function(){
                    //       console.log(response['data']);
                    //     $('#slc-pc-code-form-dp-lain').append('<option value="'+this['objCode']+'">'+this['objCode']+' - '+this['objDesc']+'</option>');
                    // });
                    // $.each(response['data']['data'], function(list){

                    //    $('#slc-pc-code-form-dp-lain').append('<option value="'+this['objCode']+' - '+this['objDesc']+'">'+this['objCode']+' - '+this['objDesc']+'</option>');
                    // });
                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error("Gagal get data object group");
                }
            } //if response

        },
        error: function(response) {
            console.log(response);
        }
    });

};


//========================================== FUNCTION SAVE DATA PDC LAIN ===================================================//
function save_data_tab_lain_pdc() {
    pay_to_dp_lain = $('#inp-dp-lain-payto').val();
    inp_branch_dp_id = $('#slc-dp-branch').val();
    console.log(inp_branch_dp_id);
    var p_due_date = $('#inp-due-date-mdl').val();
    var p_pdc_no = $('#inp-pdc-no-mdl').val();
    var p_total_amount = $('#inp-jumlah-total-dp-lain').val();
    var p_inkaso = '';
    if ($('#chk-inkaso-pdc-dr').is(":checked")) {
        p_inkaso = '1';
    } else {
        p_inkaso = '0';
    }
    var p_bank_id = $('#slc-bank-iss-mdl').val();
    var p_bank_branch = $('#inp-bank-branch-mdl').val();
    var reg_no = $('#inp-dp-lain-regno').val();
    var remarks = $('#inp-dp-lain-remarks').val();
    // console.log(p_total_amount);
    p_total_amount_cust = accounting.unformat(p_total_amount);
    console.log(p_total_amount_cust);
    console.log(list_data_dp_lain);

    var amount_lain = '';
    var class_code_lain = '';
    var keterangan_lain = '';
    var no_kontrak = '';

    console.log(radio_val_dp_lain);

    var data_arr = [];
    for (var i = 0; i < list_data_dp_lain.length; i++) {
        //if ($('#check-dp-' + i).is(":checked")) {
        var unformat_ammount = accounting.unformat(list_data_dp_lain[i][6])
        data_arr.push({
            // no_kontrak: list_data_dp_lain[i][2],
            amount_lain: unformat_ammount,
            class_code_lain: list_data_dp_lain[i][0],
            keterangan_lain: list_data_dp_lain[i][2]
        });
        //}
    }
    console.log(data_arr);

    $.ajax({
        url: base_url + "Controller_draft_payment/save_data_lain_pdc",
        type: 'POST',
        dataType: 'json',
        data: {
            "p_br_id": inp_branch_dp_id,
            "p_payment_to": pay_to_dp_lain,
            "p_payment_type": radio_val_dp_lain,
            "p_pdc_no": p_pdc_no,
            "p_total_amount": p_total_amount_cust,
            "p_due_date": p_due_date,
            "p_inkaso": p_inkaso,
            "p_bank_id": p_bank_id,
            "p_bank_branch": p_bank_branch,
            "p_reg_no": reg_no,
            "p_remakrs": remarks,
            "data": data_arr

        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    var status_save = response['status'];
                    var notif = response['notif'];
                    var result = response['result'];
                    console.log(status_save);
                    if (result === false) {
                        console.log('gagal save');
                        alert_error(status_save);
                    } else {
                        console.log('berhasil save');
                        alert_info(response['nomor_pdc']);
                        nomor_pv = response['pdc_number'];
                        console.log(nomor_pv);
                        $('#inp-dp-lain-nomor-pv').val(nomor_pv);
                        // table_dp_lain_lain.clear().draw();
                        // $('#inp-dp-lain-payto').val('');
                        // $('#inp-jumlah-total-dp-lain').val('');
                        $('#btn-paid-dp-lain').prop('disabled', false);
                        $('.btn-detail-dpho-lain').hide();
                        $('.btn-delete-dpho-lain').hide();
                        $('.btn-detail-dpho-lain').prop('disabled', true);
                        $('.btn-delete-dpho-lain').hide('disabled', true);
                        $('#btn-save-dp-lain').prop('disabled', true);
                        $('#btn-cancel-dp-lain').prop('disabled', true);
                        $('#inp-dp-lain-pvno').prop('disabled', true);
                        $('#inp-dp-lain-pvno').val('');
                        //total_amt_lain_dp = 0;
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
        }
    });

}

 

//========================================== FUNCTION GET NO PDC LAIN ===================================================//
function get_nopdc_lain(branch_id, no_pdc) {

    $.ajax({
        url: base_url + "Controller_draft_payment/get_pdcno_lain",
        type: 'POST',
        dataType: 'json',
        data: {
            "br_id": branch_id,
            "pdc_no": no_pdc
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    table_nopdc.clear().draw();
                    var data = response['data']['data'];
                    var status = response['data']['status'];
                    console.log(data);
                    if (data.length === 0) {
                        alert_info('Nomor PDC ' + no_pdc.toUpperCase() + ' tidak ditemukan dalam database !');
                    } else {
                        var data_arr = [];
                        $.each(data, function(index) {
                            data_arr.push([
                             this['p_pdc_no'],
                             this['pdc_date'],
                             this['pdc_due_date'],
                             this['from_to'],
                             accounting.formatMoney(this['pdc_amount'], '', 2, ',', '.'),
                            ]);
                        });
                        console.log(data_arr);
                        table_nopdc.rows.add(data_arr).draw(false);

                        $("#modal-nopdc").modal({
                           show: true,
                           backdrop: 'static'
                        });
                        flag_search_pdc_dpc = 1;

                        var pay_to_lain =  $('#inp-dp-lain-payto').val();
                        console.log(flag_form_dplain,pay_to_lain);
                        if (pay_to_lain == '') {
                            console.log('masukkk');
                        }else{
                            if (flag_form_dplain == 1) {
                             console.log('satu');
                             $('#btn-tambah-dp-lain').click();
                             flag_form_dplain = 0
                            }else{
                                 console.log('nol');
                            }
                            
                        }

                    }
                } catch (e) {
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Terjadi Kesalahan Get PV Buffer");
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });
}


//========================================== FUNCTION GET NO Pv LAIN ===================================================//
function get_nopv_lain(branch_id, no_pv) {

    $.ajax({
        url: base_url + "Controller_draft_payment/get_nopv_lain",
        type: 'POST',
        dataType: 'json',
        data: {
            "br_id": branch_id,
            "pv_no": no_pv
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    table_nopv_dp.clear().draw();
                    var data = response['data']['data'];
                    var status = response['data']['status'];
                    console.log(data);
                    if (data.length === 0) {
                        alert_info('Nomor PV ' + no_pv.toUpperCase() + ' tidak ditemukan dalam database !');
                    } else {
                        var data_arr = [];
                        $.each(data, function(index) {
                            data_arr.push([
                                this['p_pv_no'],
                                this['p_remakrs']
                            ]);
                            
                        });
                        console.log(data_arr);
                        table_nopv_dp.rows.add(data_arr).draw(false);
                        var pay_to_lain =  $('#inp-dp-lain-payto').val();
                        console.log(flag_form_dplain,pay_to_lain);
                        if (pay_to_lain == '') {
                            console.log('masukkk');
                        }else{
                            if (flag_form_dplain == 1) {
                             console.log('satu');
                             $('#btn-tambah-dp-lain').click();
                             flag_form_dplain = 0
                            }else{
                                 console.log('nol');
                            }
                            
                        }
                        
                        $("#modal-nopv-dp").modal({
                            show: true,
                            backdrop: 'static'
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


//========================================== FUNCTION MODAL NO PV TAB LAIN ===================================================//

$('#tbl-list-nopv-dp').on('click', 'tr', function() {
    var pilih_nopv_dp = '';
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        pilih_nopv_dp = '';

    } else {
        table_nopv_dp.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        pilih_nopv_dp = table_nopv_dp.row(this).data();
        hasil_nopv_dp = pilih_nopv_dp[0];
        console.log(hasil_nopv_dp);
    }
});

//========================================== FUNCTION GET CLASS CODE CUSTOMER ===================================================//
$('#tbl-list-nopv-dp').on('dblclick', 'tr', function() {
    $('#modal-nopv-dp').modal('hide');
    $('.modal-backdrop').css('display', 'none');
    var branch_id_cabang = $('#slc-dp-branch').val();
    if ($('#tab-dp-lain').hasClass('active')) {
        clear_tab_lain();
        $('#inp-dp-lain-pvno').val(hasil_nopv_dp);
        $('#radio-pdc-lain').prop('disabled', true);
        $('#inp-dp-lain-pvno').prop('disabled', true);
        get_dtl_pv_nontrade(branch_id_cabang, hasil_nopv_dp);
    }

});


//========================================== FUNCTION GET CLASS CODE CUSTOMER ===================================================//
$('#btn-conf-nopv-dp').click(function() {
    $('#modal-nopv-dp').modal('hide');
    $('.modal-backdrop').css('display', 'none');
    var branch_id_cabang = $('#slc-dp-branch').val();
    if ($('#tab-dp-lain').hasClass('active')) {
        clear_tab_lain();
        $('#inp-dp-lain-pvno').val(hasil_nopv_dp);
        $('#radio-pdc-lain').prop('disabled', true);
        $('#inp-dp-lain-pvno').prop('disabled', true);
        get_dtl_pv_nontrade(branch_id_cabang, hasil_nopv_dp);
    }

});


//========================================== FUNCTION MODAL NOPDC ===================================================//


$('#tbl-list-nopdc').on('click', 'tr', function() {
    var pilih_nopdc = '';
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        pilih_nopdc = '';

    } else {
        table_nopdc.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        pilih_nopdc = table_nopdc.row(this).data();
        hasil_nopdc = pilih_nopdc[0];
        console.log(hasil_nopdc);
    }
});

$('#tbl-list-nopdc').on('dblclick', 'tr', function() {
    $('#modal-nopdc').modal('hide');
    $('.modal-backdrop').css('display', 'none');

    if ($('#tab-dp-lain').hasClass('active')) {
        var slc_dp_branch = $('#slc-dp-branch').val();
        $('#inp-pdc-pv-lain').val(hasil_nopdc);
        //$('#radio-pdc-lain').prop('disabled', true);
        $('#inp-pdc-pv-lain').prop('disabled', true);
        get_dtl_pdc_nontrade(slc_dp_branch, hasil_nopdc);
    }

});


$('#btn-conf-nopdc').click(function() {
    $('#modal-nopdc').modal('hide');
    $('.modal-backdrop').css('display', 'none');

    if ($('#tab-dp-lain').hasClass('active')) {
        var slc_dp_branch = $('#slc-dp-branch').val();
        $('#inp-pdc-pv-lain').val(hasil_nopdc);
        // $('#radio-pdc-lain').prop('disabled', true);
        $('#inp-pdc-pv-lain').prop('disabled', true);
        get_dtl_pdc_nontrade(slc_dp_branch, hasil_nopdc);
    }

});

//========================================== FUNCTION GET NO Pv LAIN ===================================================//
function get_dtl_pv_nontrade(branch_id, no_pv) {
    $.ajax({
        url: base_url + "Controller_draft_payment/get_dtl_pv_nontrade",
        type: 'POST',
        dataType: 'json',
        data: {
            "br_id": branch_id,
            "pv_no": no_pv
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    table_nopv_dp.clear().draw();
                    var data_hdr = response['data']['data'];
                    var data_dtl = response['data']['data']['detail'];
                    var status = response['data']['status'];
                    var total_amt_lain_dp = 0;


                    console.log(data_hdr);
                    if (status) {

                        if ( role_code_dpc == 'VIEW_DPC') {
                            console.log('view');
                            $('#btn-save-dp-cust, #btn-save-dp-cabang, #btn-save-dp-lain, #id-btn-tambah-dp-lain, #btn-print-dp-lain').prop('disabled', true);
                            $('#btn-tambah-dp-lain').hide();

                            $('#btn-tambah-dp-lain').hide();
                            $('#inp-dp-lain-payto').val(data_hdr['payment_to']);
                            $('#inp-dp-lain-documentno').val(data_hdr['doc_no']);
                            $('#inp-dp-lain-regno').val(data_hdr['reg_no']);
                            $('#inp-jumlah-total-dp-lain').val(accounting.formatMoney(data_hdr['amount'], '', 2, ',', '.'));
                            $('#slc-dp-lain-cashbank').val(data_hdr['bank_id']);
                            $('#inp-dp-lain-remarks').val(data_hdr['remarks']);
                            $('#rd-cash-dp-lain').prop('disabled', true);
                            $('#rd-pdc-dp-lain').prop('disabled', true);
                            $('#inp-dp-lain-payto').prop('disabled', true);
                            $('#inp-dp-lain-pvno').prop('disabled', true);
                            $('#inp-dp-lain-regno').prop('disabled', true);
                            $('#slc-dp-lain-cashbank').prop('disabled', true);
                            $('#inp-dp-lain-remarks').prop('disabled', true);

                            if (data_hdr['pdc_no'] !== null) {
                            flag_search_pdc_dpc = 1;
                            $('#inp-pdc-pv-lain').val(data_hdr['pdc_no']);
                            $('#inp-pdc-no-mdl').val(data_hdr['pdc_no']);
                            $('#slc-bank-iss-mdl').val(data_hdr['bank_id_pdc']);
                            $('#inp-bank-branch-mdl').val(data_hdr['bank_branch']);
                            $('#inp-pdc-no-mdl').prop('disabled', true);
                            $('#slc-bank-iss-mdl').prop('disabled', true);
                            $('#inp-bank-branch-mdl').prop('disabled', true);
                            $('#inp-due-date-mdl').prop('disabled', true);
                            $('#chk-inkaso-pdc-dr').prop('disabled', true);
                            $('#btn-conf-pdc').prop('disabled', true);

                            $('#rd-pdc-dp-lain').prop('checked', true);
                            $('#div-id-pdc-dp-lain').show();
                            $('#div-id-panel-dp-lain').css('margin-bottom', '161px');
                            $('#div-id-rd-dp-lain').css('padding-bottom', '50px');
                            $('#div-id-cash-dp-lain').hide();
                            $('.btn-add-pdc-pv').prop('disabled', false);
                            $('#radio-pdc-lain').prop('disabled', false);
                            $('#inp-pdc-pv-lain').prop('disabled', true);
                            $('#btn-search-pdc-lain').prop('disabled', true);

                            var inkaso = data_hdr['inkaso'];

                            if (inkaso == 1) {
                                $('#chk-inkaso-pdc-dr').prop('checked', true);
                            } else {
                                $('#chk-inkaso-pdc-dr').prop('checked', false);
                            }
                            var pdc_date = '';
                            if (data_hdr['pdc_date'] != null) {
                                pdc_date = new Date(data_hdr['pdc_date']).format('dd-mmm-yyyy');
                            } else {
                                pdc_date = '';
                            }

                            var pdc_due_date = '';
                            if (data_hdr['pdc_due_date'] != null) {
                                pdc_due_date = new Date(data_hdr['pdc_due_date']).format('dd-mmm-yyyy');
                            } else {
                                pdc_due_date = '';
                            }
                            $('#inp-date-pdc-mdl').val(pdc_date);
                            $('#inp-due-date-mdl').val(pdc_due_date);

                            $("#modal-pdc").modal({
                                show: true,
                                backdrop: 'static'
                            });

                        } else {

                            flag_search_pdc_dpc = 0;
                            $.each(response_get_bank_lain['data'], function(i) {
                                var bank_code = response_get_bank_lain['data'][i]['bankCode'];
                                var bank_name = response_get_bank_lain['data'][i]['bankName'];
                                var acc_no = response_get_bank_lain['data'][i]['accNo'];
                                if (bank_code === data_hdr['bank_id']) {
                                    $('#inp-dp-lain-ac').val(acc_no);
                                } else if (data_hdr['bank_id'] === '') {
                                    $('#inp-dp-lain-ac').val('');
                                }
                            });

                        }

                        $.each(data_dtl, function(index) {
                            table_dp_lain_lain.row.add([
                                this['class_code'],
                                this['brief_desc'],
                                this['remarks'],
                                this['br_id'] + '-' + this['branch_name'],
                                null,
                                this['pc_code'],
                                accounting.formatMoney(this['amount'], '', 2, ',', '.'),
                                null,
                            ]).draw(false);

                        });


                        }else{
  
                        $('#btn-tambah-dp-lain').hide();
                        console.log();
                        $('#inp-dp-lain-payto').val(data_hdr['payment_to']);
                        $('#inp-dp-lain-documentno').val(data_hdr['doc_no']);
                        $('#inp-dp-lain-regno').val(data_hdr['reg_no']);
                        $('#inp-jumlah-total-dp-lain').val(accounting.formatMoney(data_hdr['amount'], '', 2, ',', '.'));
                        $('#btn-paid-dp-lain').prop('disabled', false);
                        $('#btn-save-dp-lain').prop('disabled', true);
                        $('#btn-tambah-dp-lain').prop('disabled', true);
                        $('#btn-tambah-dp-lain').hide();
                        var payment_status = data_hdr['payment_status'];
                        console.log(payment_status);
                        if (payment_status == '3') {
                            $('#btn-print-dp-lain').prop('disabled', false);
                            $('#slc-dp-lain-cashbank').prop('disabled', true);
                            $('#inp-dp-lain-remarks').prop('disabled', true);
                            $('#inp-dp-lain-payto').prop('disabled', true);
                            $('#inp-dp-lain-regno').prop('disabled', true);
                            $('#rd-cash-dp-lain').prop('disabled', true);
                            $('#rd-pdc-dp-lain').prop('disabled', true);
                            $('#btn-paid-dp-lain').prop('disabled', true);
                            $('#btn-cancel-dp-lain').prop('disabled', true);

                        } else {
                            $('#btn-print-dp-lain').prop('disabled', true);
                            $('#slc-dp-lain-cashbank').prop('disabled', false);
                            $('#inp-dp-lain-remarks').prop('disabled', false);
                            $('#inp-dp-lain-payto').prop('disabled', false);
                            $('#inp-dp-lain-regno').prop('disabled', false);
                            $('#rd-cash-dp-lain').prop('disabled', false);
                            $('#rd-pdc-dp-lain').prop('disabled', false);
                            $('#btn-paid-dp-lain').prop('disabled', false);
                            $('#btn-cancel-dp-lain').prop('disabled', false);
                        }


                        $('#slc-dp-lain-cashbank').val(data_hdr['bank_id']);
                        $('#inp-dp-lain-remarks').val(data_hdr['remarks']);

                        if (data_hdr['pdc_no'] !== null) {
                            flag_search_pdc_dpc = 1;
                            $('#inp-pdc-pv-lain').val(data_hdr['pdc_no']);
                            $('#inp-pdc-no-mdl').val(data_hdr['pdc_no']);
                            $('#slc-bank-iss-mdl').val(data_hdr['bank_id_pdc']);
                            $('#inp-bank-branch-mdl').val(data_hdr['bank_branch']);
                            $('#inp-pdc-no-mdl').prop('disabled', true);
                            $('#slc-bank-iss-mdl').prop('disabled', true);
                            $('#inp-bank-branch-mdl').prop('disabled', true);
                            $('#inp-due-date-mdl').prop('disabled', true);
                            $('#chk-inkaso-pdc-dr').prop('disabled', true);
                            $('#btn-conf-pdc').prop('disabled', true);

                            $('#rd-pdc-dp-lain').prop('checked', true);
                            $('#div-id-pdc-dp-lain').show();
                            $('#div-id-panel-dp-lain').css('margin-bottom', '161px');
                            $('#div-id-rd-dp-lain').css('padding-bottom', '50px');
                            $('#div-id-cash-dp-lain').hide();
                            $('.btn-add-pdc-pv').prop('disabled', false);
                            $('#radio-pdc-lain').prop('disabled', false);
                            $('#inp-pdc-pv-lain').prop('disabled', true);
                            $('#btn-search-pdc-lain').prop('disabled', true);

                            var inkaso = data_hdr['inkaso'];

                            if (inkaso == 1) {
                                $('#chk-inkaso-pdc-dr').prop('checked', true);
                            } else {
                                $('#chk-inkaso-pdc-dr').prop('checked', false);
                            }
                            var pdc_date = '';
                            if (data_hdr['pdc_date'] != null) {
                                pdc_date = new Date(data_hdr['pdc_date']).format('dd-mmm-yyyy');
                            } else {
                                pdc_date = '';
                            }

                            var pdc_due_date = '';
                            if (data_hdr['pdc_due_date'] != null) {
                                pdc_due_date = new Date(data_hdr['pdc_due_date']).format('dd-mmm-yyyy');
                            } else {
                                pdc_due_date = '';
                            }
                            $('#inp-date-pdc-mdl').val(pdc_date);
                            $('#inp-due-date-mdl').val(pdc_due_date);

                            $("#modal-pdc").modal({
                                show: true,
                                backdrop: 'static'
                            });


                        } else {
                            flag_search_pdc_dpc = 0;
                            $.each(response_get_bank_lain['data'], function(i) {
                                var bank_code = response_get_bank_lain['data'][i]['bankCode'];
                                var bank_name = response_get_bank_lain['data'][i]['bankName'];
                                var acc_no = response_get_bank_lain['data'][i]['accNo'];
                                if (bank_code === data_hdr['bank_id']) {
                                    $('#inp-dp-lain-ac').val(acc_no);
                                } else if (data_hdr['bank_id'] === '') {
                                    $('#inp-dp-lain-ac').val('');
                                }
                            });

                        }

                        $.each(data_dtl, function(index) {
                            table_dp_lain_lain.row.add([
                                this['class_code'],
                                this['brief_desc'],
                                this['remarks'],
                                this['br_id'] + '-' + this['branch_name'],
                                null,
                                this['pc_code'],
                                accounting.formatMoney(this['amount'], '', 2, ',', '.'),
                                null,
                            ]).draw(false);

                        });


                    }//VIEW_DPC 

                    } else {
                        alert_info(data_hdr);


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




//========================================== FUNCTION GET DTL PDC LAIN ===================================================//
function get_dtl_pdc_nontrade(branch_id, no_pdc) {

    $.ajax({
        url: base_url + "Controller_draft_payment/get_dtl_pdc_nontrade",
        type: 'POST',
        dataType: 'json',
        data: {
            "br_id": branch_id,
            "pdc_no": no_pdc
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    table_nopv_dp.clear().draw();
                    var data_hdr = response['data']['data'];
                    var data_dtl = response['data']['data']['detail'];
                    //var data_bank = response['data']['bank'];
                    var status = response['data']['status'];
                    var total_amt_lain_dp = 0;
                    var pdc_status = data_hdr['pdc_status'];
                    table_dp_lain_lain.clear().draw();
                    console.log(data_hdr);
                    if (status) {

                        if ( role_code_dpc == 'VIEW_DPC') {
                            console.log('view');
                            $('#btn-save-dp-cust, #btn-save-dp-cabang, #btn-save-dp-lain, #id-btn-tambah-dp-lain, #btn-print-dp-lain').prop('disabled', true);
                            $('#btn-tambah-dp-lain').hide();

                            $('#inp-dp-lain-payto').val(data_hdr['payment_to']);
                            $('#slc-dp-lain-cashbank').val(data_hdr['bank_id']);
                            $('#inp-pdc-no-mdl').val(no_pdc);
                            $('#slc-bank-iss-mdl').val(data_hdr['bank_id_pdc']);
                            $('#inp-bank-branch-mdl').val(data_hdr['bank_branch']);
                            $('#inp-jumlah-total-dp-lain').val(accounting.formatMoney(data_hdr['amount'], '', 2, ',', '.'));
                            $('#btn-tambah-dp-lain').hide();
                            $('#slc-dp-lain-cashbank').prop('disabled', true);
                            $('#inp-pdc-no-mdl').prop('disabled', true);
                            $('#slc-bank-iss-mdl').prop('disabled', true);
                            $('#inp-bank-branch-mdl').prop('disabled', true);
                            $('#inp-due-date-mdl').prop('disabled', true);
                            $('#chk-inkaso-pdc-dr').prop('disabled', true);
                            $('#btn-tambah-dp-lain').prop('disabled', true);
                            $('#rd-cash-dp-lain').prop('disabled', true);
                            $('#rd-pdc-dp-lain').prop('disabled', true);
                            $('#btn-conf-pdc').prop('disabled', true);
                            $('#inp-dp-lain-payto').prop('disabled', true);
                            $('#inp-dp-lain-pvno').prop('disabled', true);
                            $('#inp-dp-lain-regno').prop('disabled', true);


                             var inkaso = data_hdr['inkaso'];

                        if (inkaso == 1) {
                            $('#chk-inkaso-pdc-dr').prop('checked', true);
                        } else {
                            $('#chk-inkaso-pdc-dr').prop('checked', false);
                        }
                        var pdc_date = '';
                        if (data_hdr['pdc_date'] != null) {
                            pdc_date = new Date(data_hdr['pdc_date']).format('dd-mmm-yyyy');
                        } else {
                            pdc_date = '';
                        }

                        var pdc_due_date = '';
                        if (data_hdr['pdc_due_date'] != null) {
                            pdc_due_date = new Date(data_hdr['pdc_due_date']).format('dd-mmm-yyyy');
                        } else {
                            pdc_due_date = '';
                        }
                        $('#inp-date-pdc-mdl').val(pdc_date);
                        $('#inp-due-date-mdl').val(pdc_due_date);

                        $("#modal-pdc").modal({
                            show: true,
                            backdrop: 'static'
                        });


                        }else{
                        
                        $('#inp-dp-lain-payto').val(data_hdr['payment_to']);
                        $('#slc-dp-lain-cashbank').val(data_hdr['bank_id']);
                        $('#inp-pdc-no-mdl').val(no_pdc);
                        $('#slc-bank-iss-mdl').val(data_hdr['bank_id_pdc']);
                        $('#inp-bank-branch-mdl').val(data_hdr['bank_branch']);
                        $('#slc-dp-lain-cashbank').prop('disabled', true);
                        $('#inp-pdc-no-mdl').prop('disabled', true);
                        $('#slc-bank-iss-mdl').prop('disabled', true);
                        $('#inp-bank-branch-mdl').prop('disabled', true);
                        $('#inp-due-date-mdl').prop('disabled', true);
                        $('#chk-inkaso-pdc-dr').prop('disabled', true);
                        $('#btn-tambah-dp-lain').prop('disabled', true);
                        $('#inp-jumlah-total-dp-lain').val(accounting.formatMoney(data_hdr['amount'], '', 2, ',', '.'));
                        $('#rd-cash-dp-lain').prop('disabled', true);
                        $('#rd-pdc-dp-lain').prop('disabled', true);
                        

                        var inkaso = data_hdr['inkaso'];

                        if (inkaso == 1) {
                            $('#chk-inkaso-pdc-dr').prop('checked', true);
                        } else {
                            $('#chk-inkaso-pdc-dr').prop('checked', false);
                        }
                        var pdc_date = '';
                        if (data_hdr['pdc_date'] != null) {
                            pdc_date = new Date(data_hdr['pdc_date']).format('dd-mmm-yyyy');
                        } else {
                            pdc_date = '';
                        }

                        var pdc_due_date = '';
                        if (data_hdr['pdc_due_date'] != null) {
                            pdc_due_date = new Date(data_hdr['pdc_due_date']).format('dd-mmm-yyyy');
                        } else {
                            pdc_due_date = '';
                        }
                        $('#inp-date-pdc-mdl').val(pdc_date);
                        $('#inp-due-date-mdl').val(pdc_due_date);

                        $("#modal-pdc").modal({
                            show: true,
                            backdrop: 'static'
                        });


                        $('#btn-conf-pdc').prop('disabled', true);
                        $('#btn-paid-dp-lain').prop('disabled', false);
                        $('#btn-save-dp-lain').prop('disabled', true);
                        $('#btn-print-dp-lain').prop('disabled', true);
                        $('#btn-tambah-dp-lain').hide();
                     }//VIEW_DPC
                     $('#inp-dp-lain-pvno').prop('disabled', true);
                     $('#btn-search-pdc-lain').prop('disabled', true);
                        $.each(data_dtl, function(index) {
                            table_dp_lain_lain.row.add([
                               this['class_code'],
                                this['brief_desc'],
                                this['remarks'],
                                this['br_id'] + '-' + this['branch_name'],
                                null,
                                this['pc_code'],
                                accounting.formatMoney(this['amount'], '', 2, ',', '.'),
                                null,
                            ]).draw(false);

                        });

                    } else {
                        alert_info('Nomor PDC ' + no_pdc.toUpperCase() + ' tidak ditemukan dalam database !');


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

//========================================== FUNCTION GET BANK PDC LAIN ===================================================//
function get_bank_pdc_lain(bank_br_id, bank_status) {
    $.ajax({
        url: "Controller_draft_received/get_bank_mdm_dr",
        type: 'POST',
        dataType: 'json',
        data: {
            "bank_stat": bank_status,
            "bank_br_id": bank_br_id
        },
        cache: false,


        success: function(response) {
            console.log(response);
            var bank_issued = $('#slc-bank-iss-mdl').val();
            console.log(bank_issued);
            if (bank_issued === null) {

                if (response['data'].length === 0) {
                    alert_error('Cabang ini tidak mempunyai bank issued PDC');
                } else {
                    var option = '';
                    $.each(response['data'], function() {
                        option += "<option value = '" + this['bankCode'] + "'>" + this['bankCode'] + " - " + this['bankName'] + " </option>";
                    });

                    $('#slc-bank-iss-mdl').html('<option value = "">--SILAHKAN PILIH--</option>' + option);


                    $('#div-due-date-mdl').datetimepicker({
                        format: 'DD-MMM-YYYY',
                        allowInputToggle: true
                    });
                    $("#inp-date-pdc-mdl").val(today);
                    $('#inp-due-date-mdl').val(today);

                }

            } else {

                $("#inp-date-pdc").val(today);
                $('#inp-due-date-mdl').val(today);
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




//========================================== FUNCTION PAID TAB LAIN ===================================================//
function paid_data_lain_pdc() {
    pay_to_dp_lain = $('#inp-dp-lain-payto').val();
    inp_branch_dp_id = $('#slc-dp-branch').val();
    var p_pdc_no = $('#inp-pdc-no-mdl').val();
    var p_total_amount = $('#inp-jumlah-total-dp-lain').val();
    var p_bank_id = '';
    var remarks = '';
    if ($('#rd-cash-dp-lain').is(':checked')) {
        p_bank_id = $('#slc-dp-lain-cashbank').val();
        remarks = $('#inp-dp-lain-remarks').val();
    } else {
        p_bank_id = $('#slc-bank-iss-mdl').val();
    }
    var reg_no = $('#inp-dp-lain-regno').val().trim();
    console.log(remarks);
    var p_pv_no = $('#inp-dp-lain-pvno').val();
    var p_doc_no = $('#inp-dp-lain-documentno').val();
    // console.log(p_total_amount);
    p_total_amount_cust = accounting.unformat(p_total_amount);
    console.log(p_total_amount_cust);
    console.log(list_data_dp_lain);

    var amount_lain = '';
    var class_code_lain = '';
    var keterangan_lain = '';

    console.log(radio_val_dp_lain);

    var data_arr = [];
    for (var i = 0; i < list_data_dp_lain.length; i++) {
        //if ($('#check-dp-' + i).is(":checked")) {
        var unformat_ammount = accounting.unformat(list_data_dp_lain[i][6]);
        var pc_code = list_data_dp_lain[i][5].split(' - ');
        pc_code = pc_code[0].trim();
        data_arr.push({
            amount_lain: unformat_ammount,
            class_code_lain: list_data_dp_lain[i][0],
            keterangan_lain: list_data_dp_lain[i][2],
            pc_code: pc_code
        });
        //}
    }
    console.log(data_arr);

    $.ajax({
        url: base_url + "Controller_draft_payment/paid_data_lain_pdc",
        type: 'POST',
        dataType: 'json',
        data: {
            "p_br_id": inp_branch_dp_id,
            "p_pv_no": p_pv_no,
            "p_doc_no": p_doc_no,
            "p_payment_to": pay_to_dp_lain,
            "p_payment_type": radio_val_dp_lain,
            "p_pdc_no": p_pdc_no,
            "p_total_amount": p_total_amount_cust,
            "p_bank_id": p_bank_id,
            "p_reg_no": reg_no,
            "p_remakrs": remarks,
            "data": data_arr

        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    var data = response['data'];
                    var notif = response['notif'];
                    var status = response['status'];
                    console.log(status);
                    if (status === false) {
                        console.log('gagal save');
                        alert_error(data);
                    } else {
                        console.log('berhasil save');
                        alert_info(data);
                        clear_tab_lain();
                        // table_dp_lain_lain.clear().draw();
                        // $('.res-global').val('');
                        // $('.res-select').prop('selectedIndex', 0);
                        // $('#btn-paid-dp-lain').prop('disabled', false);
                        // $('.btn-detail-dpho-lain').hide();
                        // $('.btn-delete-dpho-lain').hide();
                        // $('.btn-detail-dpho-lain').prop('disabled', true);
                        // $('.btn-delete-dpho-lain').hide('disabled', true);
                        // $('#btn-save-dp-lain').prop('disabled', true);
                        // $('#inp-dp-lain-pvno').prop('disabled', false);
                        // p_total_amount = 0;
                        // total_amt_lain_dp = 0;
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



//========================================== FUNCTION CANCEL TAB LAIN ===================================================//
function cancel_data_lain() {
    inp_branch_dp_id = $('#slc-dp-branch').val();
    var pdc_no = $('#inp-pdc-no-mdl').val();
    var pv_no = $('#inp-dp-lain-pvno').val();

    console.log(list_data_dp_lain);

    var class_code_lain = '';

    var data_arr = [];

    for (var i = 0; i < list_data_dp_lain.length; i++) {
        data_arr.push({
            class_code_lain: list_data_dp_lain[i][0],

        });

    }
    //console.log(data_arr);
    class_code_lain = data_arr[0]['class_code_lain'];

    $.ajax({
        url: base_url + "Controller_draft_payment/cancel_data_lain",
        type: 'POST',
        dataType: 'json',
        data: {
            "br_id": inp_branch_dp_id,
            "pv_no": pv_no,
            "pdc_no": pdc_no,
            "class_code": class_code_lain
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    var data = response['data'];
                    var status = response['status'];
                    console.log(status);
                    if (status === false) {
                        console.log('gagal save');
                        alert_error(data);
                    } else {
                        console.log('berhasil save');
                        alert_info(data);
                        clear_tab_lain();
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




//========================================== FUNCTION PRINT TAB LAIN ===================================================//
function data_pv_lain_pdf() {
    inp_branch_dp_id = $('#slc-dp-branch').val();
    var br_name = $('#hdn-dp-branch-name').val();
    var pv_no = $('#inp-dp-lain-pvno').val();
    var bank_id;
    var remarks;
    var bank_name;
    var bank_accno;
    var pdc_no;
    var pdc_date;
    var pdc_due_date;
    if ($('#rd-cash-dp-lain').is(':checked')) {
        bank_id = $('#slc-dp-lain-cashbank').val();
        bank_name = $('#hdn-dplain-bank-desc').val();
        bank_accno = $('#hdn-dplain-bank-accno').val();
    } else {
        pdc_no = $('#inp-pdc-no-mdl').val();
        pdc_date = $('#inp-date-pdc-mdl').val();
        pdc_due_date = $('#inp-due-date-mdl').val();
        bank_id = $('#slc-bank-iss-mdl').val();
        bank_name = $('#hdn-dplain-bank-desc').val();
        bank_accno = $('#hdn-dplain-bank-accno').val();
    }

    $.ajax({
        url: base_url + "Controller_draft_payment/data_pdf_pv_lain",
        type: 'POST',
        dataType: 'json',
        data: {
            "br_id": inp_branch_dp_id,
            "br_name": br_name,
            "pv_no": pv_no,
            "pdc_no": pdc_no,
            "pdc_date": pdc_date,
            "pdc_due_date": pdc_due_date,
            "bank_code": bank_id,
            "bank_name": bank_name,
            "bank_accno": bank_accno

        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    var data = JSON.stringify(response);
                        console.log(response['status']);
                        if (response['status']) {
                            $('#inp-print-dp-lain').val(data);
                            var ab = $('#inp-print-dp-lain').val();
                            $("#frm-print-dp-lain" ).submit();
                            console.log(ab);
                            //$('#frm-print-dp-lain').submit();
                        }else{
                            alert_error(response['data']);
                        }
                        // var data = JSON.parse(response);
                        // if (data['Status'] == '500') {
                        //     alert_error(data['ErrorMessage']);
                        // }else if (data['Status'] == '200'){
                        //     $("#ipt-print-draft" ).val(response);
                        //     $("#frm-print-draft-rcd" ).submit();
                        // } 

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



function print_pv_lain_pdf() {
    inp_branch_dp_id = $('#slc-dp-branch').val();
    var br_name = $('#hdn-dp-branch-name').val();
    var pv_no = $('#inp-dp-lain-pvno').val();
    var bank_id;
    var remarks;
    var bank_name;
    var bank_accno;
    var pdc_no;
    var pdc_date;
    var pdc_due_date;
    if ($('#rd-cash-dp-lain').is(':checked')) {
        bank_id = $('#slc-dp-lain-cashbank').val();
        bank_name = $('#hdn-dplain-bank-desc').val();
        bank_accno = $('#hdn-dplain-bank-accno').val();
    } else {
        pdc_no = $('#inp-pdc-no-mdl').val();
        pdc_date = $('#inp-date-pdc-mdl').val();
        pdc_due_date = $('#inp-due-date-mdl').val();
        bank_id = $('#slc-bank-iss-mdl').val();
        bank_name = $('#hdn-dplain-bank-desc').val();
        bank_accno = $('#hdn-dplain-bank-accno').val();
    }

    $.ajax({
        url: base_url + "Controller_draft_payment/pdf_pv_lain",
        type: 'POST',
        dataType: 'json',
        data: {
            "br_id": inp_branch_dp_id,
            "br_name": br_name,
            "pv_no": pv_no,
            "pdc_no": pdc_no,
            "pdc_date": pdc_date,
            "pdc_due_date": pdc_due_date,
            "bank_code": bank_id,
            "bank_name": bank_name,
            "bank_accno": bank_accno

        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                alert_info('Data Berhasil Dicetak');
                var printWindow = window.open();

                printWindow.document.write('<pre id = "printss" style="font-size:16px"></pre>');
                printWindow.document.querySelector('pre').innerHTML = response;

                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close();

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


function print_pv_lain2() {
    inp_branch_dp_id = $('#slc-dp-branch').val();
    var br_name = $('#hdn-dp-branch-name').val();
    var pv_no = $('#inp-dp-lain-pvno').val();
    var bank_id;
    var remarks;
    var bank_name;
    var bank_accno;
    // var bank_id_pdc;
    // var bank_name_pdc ='';
    // var bank_accno_pdc = '';
    var pdc_no;
    var pdc_date;
    var pdc_due_date;
    if ($('#rd-cash-dp-lain').is(':checked')) {
        bank_id = $('#slc-dp-lain-cashbank').val();
        bank_name = $('#hdn-dplain-bank-desc').val();
        bank_accno = $('#hdn-dplain-bank-accno').val();
    } else {
        pdc_no = $('#inp-pdc-no-mdl').val();
        pdc_date = $('#inp-date-pdc-mdl').val();
        pdc_due_date = $('#inp-due-date-mdl').val();
        bank_id = $('#slc-bank-iss-mdl').val();
        bank_name = $('#hdn-dplain-bank-desc').val();
        bank_accno = $('#hdn-dplain-bank-accno').val();
    }

    $.ajax({
        url: base_url + "Controller_draft_payment/print_pv_lain2",
        type: 'POST',
        dataType: 'json',
        data: {
            "br_id": inp_branch_dp_id,
            "br_name": br_name,
            "pv_no": pv_no,
            "pdc_no": pdc_no,
            "pdc_date": pdc_date,
            "pdc_due_date": pdc_due_date,
            "bank_code": bank_id,
            "bank_name": bank_name,
            "bank_accno": bank_accno

        },

        success: function(response) {
            console.log(response);
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
        error: function(response) {
            console.log(response);
            alert_info(response['data']);
        }
    });

}

