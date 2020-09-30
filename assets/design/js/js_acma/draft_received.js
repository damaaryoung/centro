 
console.log($('#branch-id-dr').html());
var session_branch_dr = $('#branch-id-dr').html();
var branch_code_dr = '';
//var branch_dr = '';
var pilih_rv_dr = '';
var receive_no_dr = '';
var pay_code_dr = '';
$('#total-amount-cust').val(0);
var year_dr = new Date().getFullYear().toString().substr(-2);
var rv_new_dr = '';
var a = 0;
var titipnt_exist = false;
var list_amount_due = [];
var status_contract_dr = '';
var amount = '';
var contract_no_dr = '';

//DATATABLES
var table_customer_dr = $('#table-data-customer-dr').DataTable({
    "columnDefs":[
    {
        "width": "25%",
        "targets": 4  
    }
    ]
});
var table_tab_lain = $('#table-data-rvdepo-dr').DataTable({
    "bFilter": false,
    "bPaginate": false,
    "bInfo": false/*,
    "columnDefs": [
        {
        "width": "25%", "targets": 4   
        }
        ]*/
});
var table_list_rv_dr = $('#table-rv-no-dr').DataTable({
    "columnDefs": [
    { "visible": false, "targets": 3 },
    { "visible": false, "targets": 4 },
    { "visible": false, "targets": 5 }
  ]
});

//Session branch
if (session_branch_dr == '0000') {
    branch_code_dr = $('#slc-branch-dr').val();
} else {
    $('#ho-dr').hide();
    $('#cabang-dr').show();
    branch_code_dr = session_branch_dr;
    var branch_name_dr = $('#branch-name-dr').html();
    var branch_dr = branch_code_dr + " - " + branch_name_dr;
    $('#inp-branch-dr').val(branch_dr);
}

//tab lain-lain
$('#deposit-tab-dr').click(function() {
    $('.clear-dr-recv, #inp-new-rv-dr').val(''); //remark sementara
    $('#form-add-rv').hide();
    table_tab_lain.clear().draw();
    get_payment_type();

    if(branch_code_dr != null){
        get_bank_lain_dr();    
    }
});

//tab customer
$('#customer-tab-dr').click(function() {
    $('.clear-dr-recv').val('');
    table_customer_dr.clear().draw();
});

$('#table-data-rvdepo-dr, #table-data-customer-dr').on('change', '.inp-number-dr', function(e) {
  //-1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
   //debugger;
    var val_amt =  $('#'+this.id).val();
    var unformat_val = accounting.unformat(val_amt);
     $('#'+this.id).val(accounting.formatMoney(unformat_val, '', 2, ',', '.'));

});

/*----------------------------------CHANGE-----------------------------------------*/
//branch
$('#slc-branch-dr').change(function() {
    branch_code_dr = $('#slc-branch-dr').val();
    $('.clear-dr-recv').val('');
    table_tab_lain.clear().draw();
    $('#slc-bank-code-dr').empty();
    if($('#tab-rv-deposit-dr').hasClass('active')){
        get_bank_lain_dr();    
    }
});

//payment type
$('input[type=radio][name=rad-cust-dr]').change(function() {
    if (this.value == 'c') {
        $('#btn-addpdc-cust-dr').prop('disabled', true);
        $('#inp-pdc-rv-dr').val('');
    } else if (this.value == 'g') {
        $('#btn-addpdc-cust-dr').prop('disabled', false);
    }
});

//table customer (untuk total penjumlahan)
$('#table-data-customer-dr').on('change', '.amount-rv', function() {
    hitung_total_amt_cust();
});

//table rv lain (untuk total penjumlahan)
$('#table-data-rvdepo-dr').on('change', '.amt-rvlain', function() {
    hitung_total_amt_lain();
});

//payment type
$('#slc-paytype-dr').change(function() {
    pay_code_dr = $('#slc-paytype-dr').val();
});

/*----------------------------------CLICK-----------------------------------------*/
//add pdc
$('#btn-addpdc-cust-dr').click(function() {
    var pdc_cust = $('#inp-pdc-rv-dr').val();

    if ((pdc_cust == null) || (pdc_cust == '')) {
        if ((branch_code_dr == null) || (branch_code_dr == '')) {
            alert_error('Silakan pilih cabang terlebih dahulu !');
        } else {
            $('#div-pdc-no-dr, #div-due-date-dr, #div-bank-iss-dr, #div-bank-br-dr').removeClass('has-error');
            $('#inp-pdc-no-mdl, #slc-bank-iss-mdl, #inp-bank-branch-mdl').val('');
            $('#chk-inkaso-pdc-dr').prop('checked', false);
            bank_iss_pdc('3', branch_code_dr);
        }
    } else {
        $("#modal-pdc").modal({
            show: true,
            backdrop: 'static'
        });
    }
});

//check box table customer
$('#table-data-customer-dr tbody').on('click', '.check-drv', function() {
    //cek all nya di false terlebih dahulu
    $('#chk-all-cust-dr').prop('checked', false);
    hitung_total_amt_cust();
    var count_all_row = table_customer_dr.data().length;
    var count_checked_row = $('input.check-drv:checkbox:checked').length;
    if (count_all_row == count_checked_row){
        $('#chk-all-cust-dr').prop('checked', true);
    }

});

//check all cust
$('#chk-all-cust-dr').click(function() {
    if ($('#chk-all-cust-dr').is(":checked")) {
        $('.check-drv').prop('checked', true);
        hitung_total_amt_cust();
    } else {
        $('.check-drv').prop('checked', false);
        $('#total-amount-cust').val(accounting.formatMoney(0, '', 2, ',', '.'));
    }
});

//btn search contract customer
$('#btn-search-cust').click(function() {
    if ((branch_code_dr == null) || (branch_code_dr == '')) {
        alert_error('Silahkan pilih cabang terlebih dahulu !');
        $('#div-branch-br-dr').addClass('has-error');
    } else {
        $('#div-branch-br-dr').removeClass('has-error');
        contract_no_dr = $('#inp-no-kontrak-cust').val();
        if ((contract_no_dr == null) || (contract_no_dr == '')) {
            $('#div-contract-no-dr').addClass('has-error');
            alert_error('Input No. kontrak terlebih dahulu!');
        } else if (contract_no_dr.length !== 12) {
            $('#div-contract-no-dr').addClass('has-error');
            alert_error('No. kontrak harus 12 angka!');
        } else {
            $('#div-contract-no-dr').removeClass('has-error');
            if (check_session() === 'true') {
                $.ajax({
                    url: 'controller_draft_received/get_customer',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        "branch_id": branch_code_dr,
                        "contract_no": contract_no_dr
                    },
                    cache: false,

                    success: function(response) {
                        console.log(response);

                        if (response) {
                            try {
                                var status = response['status'];
                                if (status == true) {
                                    table_customer_dr.clear().draw();
                                    list_amount_due = [];
                                    $.each(response['data'], function(i) {
                                        amount = this['amount'];
                                        var fl_amount = accounting.formatMoney(amount, '', 2, ',', '.');
                                        var notes = this['acct_desc'];
                                        
                                        if(this['acct_interface_group'] == 'T-P.BIC'){
                                            table_customer_dr.row.add([

                                                '<input type="checkbox" id= "check-crv-' + i + '" class="check-drv" >',
                                                this['contract_no'],
                                                this['acct_interface_group'],
                                                this['acct_brief_desc'],
                                                '<input type="text" class="form-control" maxlength="50" id="inp-notes-dr-' + i +'" value="' + notes +'" style="width:230px">',
                                                this['object_code'],
                                                '',
                                                fl_amount,
                                                '<input type="text" class="form-control amount-rv inp-number-dr" maxlength="15" id="inp-amount-rv-' + i + '" value="' + fl_amount + '" disabled>' 
                                            ]).draw(false);
                                        }
                                        else{
                                            table_customer_dr.row.add([

                                                '<input type="checkbox" id= "check-crv-' + i + '" class="check-drv" >',
                                                this['contract_no'],
                                                this['acct_interface_group'],
                                                this['acct_brief_desc'],
                                                '<input type="text" class="form-control" maxlength="50" id="inp-notes-dr-' + i +'" value="' + notes +'" style="width:230px">',
                                                this['object_code'],
                                                '',
                                                fl_amount,
                                                '<input type="text" class="form-control amount-rv inp-number-dr" maxlength="15" id="inp-amount-rv-' + i + '" value="' + fl_amount + '" >'
                                          
                                            ]).draw(false);
                                        }
                                       
                                        status_contract_dr = this['contract_status'];
                                        console.log('status contract = ' + status_contract_dr);
                                        $('#inp-cust-name-dr').val(this['customer_name']);

                                        list_amount_due.push(fl_amount);                                     
                                    });

                                    // addendum search alert jika nasabah tidak memiliki kewajiban
                                    if(amount <= 0){
                                        $('#btn-create-rv-cust').prop('disabled', true);
                                        alert_error('Nasabah tidak memiliki kewajiban');
                                    }
                                    else{ 
                                        $('#btn-create-rv-cust').prop('disabled', false);
                                        console.log(amount);
                                    }                                    
                                    $('#total-amount-cust').val(accounting.formatMoney(0, '', 2, ',', '.'));
                                    $('#chk-all-cust-dr').prop('checked', false);

                                } else {
                                    alert_error(response['alert']);
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
                        alert_error(response);
                    }
                });
            }else{
                alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
                  localStorage.clear();
                  window.location.href = base_url + "Controller_login/login_view";
                });
            }   
        }
    }
});

//btn create RV customer
$('#btn-create-rv-cust').click(function() {
    var lng_data = table_customer_dr.data().length;
    if (lng_data == 0){
        alert_error('Silakan lakukan pencarian kontrak terlebih dahulu !');
    }
    else{
        var lng_checked_cust = $('#table-data-customer-dr').find('.check-drv').filter(':checked').length;
        if (lng_checked_cust == 0) {
            alert_error('Pilih data yang akan dibuatkan RV terlebih dahulu !');
        } else {
            var list_cust = table_customer_dr.data();

            for (var x = 0; x < lng_data; x++) {
                if ($('#check-crv-' + x).is(":checked")) {
                    var checked_amt_paid = $('#inp-amount-rv-' + x).val();
                    var fl_amt_paid = parseFloat(accounting.unformat(checked_amt_paid));

                    var fl_amt_due = parseFloat(accounting.unformat(list_amount_due[x]));

                    var class_cd = list_cust[x][2];
                    if (class_cd == 'T-UM.PK'){
                        //if (parseInt(checked_amt_paid) > parseInt(list_amount_due[x])){
                        if (fl_amt_paid > fl_amt_due){
                            alert_error('Amount Paid tidak boleh lebih dari Gross-DP, Gross-DP = ' + list_amount_due[x]);
                            return false;
                        }     
                    }
                    else if (class_cd == 'T-PIUT.ADP'){
                        //if (parseInt(checked_amt_paid) < parseInt(list_amount_due[x])){
                        if (fl_amt_paid < fl_amt_due){
                            alert_error('Amount paid tidak boleh lebih kecil dari Amount due date !');
                            return false;
                        }    
                    }
                    else if (class_cd == 'T-COL.WO'){
                        if (fl_amt_paid > fl_amt_due){
                            alert_error('Amount Paid tidak boleh lebih dari Amount due date !');
                            return false;
                        }
                    }
                    //new edit
                    else if (class_cd == 'T-P.BIC'){
                        if (fl_amt_paid > fl_amt_due){
                            alert_error('Amount Paid tidak boleh lebih dari Amount due date !');
                            return false;
                        }
                        else if(fl_amt_due <= 0){
                            alert_error('Nilai sisa kewajiban harus lebih besar 0');
                            return false;
                        }
                        else if(fl_amt_paid <= 0){
                            alert_error('Jumlah pembayaran harus lebih besar 0');
                            return false;
                        }
                        else if(status_contract_dr != '08' && status_contract_dr != 'WO-SOLD'){  
                            alert_info('Unit untuk kontrak ' + contract_no_dr + ' belum terjual');
                            console.log(status_contract_dr);
                            return false;
                        }
                    }

                }
            }

            alert_confirm('Apakah anda yakin untuk create RV?', function() {
                //var list_cust = table_customer_dr.data();
                var contract_no = list_cust[0][1];
                var receive_from = $('#inp-cust-name-dr').val();
                var total_amount = 0;
                var bank = "";

                var rv_type = "";
                var rv_mode = "";

                var pdc_no = "";
                var pdc_due_date = "";
                var pdc_inkaso = "";
                var pdc_bank_branch = "";
                
                var list_dtl = [];

                var rad_value = $('input[name=rad-cust-dr]:checked').val();
                if (rad_value == 'c') {
                    rv_type = "T";
                    rv_mode = "1";
                }
                else if (rad_value == 'g') {
                    pdc_no = $('#inp-pdc-rv-dr').val();

                    if ((pdc_no == null) || (pdc_no == '')) {
                        alert_error('Input no PDC terlebih dahulu !');
                        return false;
                    }
                    else{
                        pdc_due_date = $('#inp-due-date-mdl').val();
                        pdc_bank_branch = $('#inp-bank-branch-mdl').val();
                        bank = $('#slc-bank-iss-mdl').val();

                        if ($('#chk-inkaso-pdc-dr').is(":checked")) {
                            pdc_inkaso = 1;
                        } else {
                            pdc_inkaso = 0;
                        }
                    }
                }

                
                for (var i = 0; i < list_cust.length; i++) {
                    if ($('#check-crv-' + i).is(":checked")) {
                        var dtl_amt = parseFloat(accounting.unformat($('#inp-amount-rv-' + i).val()));
                        list_dtl.push({
                            class_code: list_cust[i][2],
                            amount: dtl_amt,
                            remark: $('#inp-notes-dr-' + i).val(),
                            obj_code: list_cust[i][5]
                        });

                        //total_amount +=  parseInt($('#inp-amount-rv-' + i).val());
                        total_amount += dtl_amt;
                    }
                }
                
                if(parseInt(total_amount).toString().length > 13){
                    alert_error('Total amount paid tidak boleh melebihi 13 digit angka!')
                }
                else{
                    if (check_session() === 'true') {
                        $.ajax({
                            url: 'controller_draft_received/confirm_customer',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                branch: branch_code_dr,
                                contract_no: contract_no,
                                receive_from: receive_from,
                                amount: total_amount,
                                bank: bank,

                                rv_type: rv_type,
                                rv_mode: rv_mode,

                                pdc_no: pdc_no,
                                pdc_due_date: pdc_due_date,
                                pdc_inkaso: pdc_inkaso,
                                pdc_bank_branch: pdc_bank_branch,

                                list_dtl: list_dtl
                            },
                            cache: false,

                            success: function(response) {
                                console.log(response);
                                if (response) {
                                    try {
                                        var status = response['status'];
                                        if (status == true){
                                            alert_info(response['result'], function() {
                                            window.location.reload();
                                            });

                                            $('#btn-create-rv-cust').prop('disabled', true);
                                        }
                                        else{
                                            alert_error(response['result']);
                                        }
                                        
                                    } catch (e) {
                                        console.log(e);
                                        $('#loading-ajax').hide();
                                        alert_error("Terjadi Kesalahan" + e);
                                    }
                                }
                            },
                            error: function(response) {
                                console.log(response);
                                alert_error(response);
                            }
                        });
                    }else{
                        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
                          localStorage.clear();
                          window.location.href = base_url + "Controller_login/login_view";
                        });
                    }    
                }
            });
        }
    }
});

//button New tab lain2
$('#btn-new-rvno-dr').click(function() {
    a = 0;
    if((branch_code_dr == null) || (branch_code_dr == '')){
        alert_error('Silakan pilih cabang terlebih dahulu!');
    }
    else{
        titipnt_exist = false;
        rv_new_dr = branch_code_dr + year_dr + 'Rxxxxxx';
        $('#inp-new-rv-dr').val(rv_new_dr);
        $('#inp-acc-from-dr, #inp-no-doc-dr, #slc-paytype-dr, #slc-bank-code-dr, #btn-add-row-dr, #btn-add-trn-dr').prop('disabled', false);
       
        table_tab_lain.clear().draw();
        $('.clear-dr-recv').val('');
        $('#btn-cancel-rvlain-dr, #btn-receive-rv-dr, #btn-save-rv-dr').prop('disabled', true);
        get_cc_lain();
        get_obj_code();
        $('#slc-paytype-dr').val('01');
    }
});


$('#slc-cc-lain-dr').change(function() {
    var count_row = table_tab_lain.data().length;
    var class_code = $('#slc-cc-lain-dr').val();
    var cc_code = class_code.split(',')[0];
    if((count_row > 0 && cc_code == 'T-TITIP.NT') || titipnt_exist === true) {
            $('#btn-add-trn-dr').prop('disabled', true);
    }
    else{
        $('#btn-add-trn-dr').prop('disabled', false);
    }
});

//button tambah cc tab lain2
$('#btn-add-trn-dr').click(function() {

    var no_rv = $('#inp-new-rv-dr').val();
    var accept_from = $('#inp-acc-from-dr').val();
    var payment_type = $('#slc-paytype-dr').val();
    var bank_id = $('#slc-bank-code-dr').val();
    var class_code = $('#slc-cc-lain-dr').val();
    var pc_code = $('#slc-pc-code-dr').val();

    if ((no_rv == null) || (no_rv == '')) {
        alert_error('Pilih No. RV terlebih dahulu atau Klik button New untuk transaksi baru');
    }
    else if ((accept_from == null) || (accept_from == '')) {
        alert_error('Input terima dari terlebih dahulu');
    } else if ((payment_type == null) || (payment_type == '')) {
        alert_error('Pilih cara bayar terlebih dahulu');
    } else if ((bank_id == null) || (bank_id == '')) {
        alert_error('Pilih kode bank terlebih dahulu');
    } else if ((class_code == null) || (class_code == '')) {
        alert_error('Pilih class code terlebih dahulu');
    } else if ((pc_code == null) || (pc_code == '')) {
        alert_error('Pilih PC Code terlebih dahulu');
    } else {

        var cc_code = class_code.split(',')[0];
        var cc_desc = class_code.split(',')[1];
        
        var inp_id_rcv_dtl = '<input type="hidden" id="inp-rcv-dtl-id' + a + '" value="">';
        var inp_no_rv = '<input type="text" class="form-control inp-rv-dr" value="'+no_rv+'" style="width:120px" disabled>';
        var inp_cc_code = '<Input type="text" class="form-control" id="slc-cc-thlain'+a+'" value="'+cc_code+'" style="width:70px" disabled>';
        var inp_obj = '<input type="text" class="form-control" id="slc-pc-thlain'+a+'" value="'+pc_code+'" disabled>';
        var inp_cc_desc = '<input type="text" class="form-control" id="inp-desc-lain' + a + '" style="width:165px" value="'+cc_desc+'" disabled>';
        var inp_remark = '<input type="text" class="form-control remark-rvlain" maxlength="50" id="remark-rvlain' + a + '" style="width:230px" value="'+cc_desc+'">';
        var amt_paid = '<input type="text" class="form-control inp-number-dr amt-rvlain" maxlength="15" id="amt-rvlain' + a + '" style="width:100px">';
        
        table_tab_lain.row.add([
            inp_cc_code + inp_id_rcv_dtl,
            inp_no_rv,
            inp_obj,
            inp_cc_desc,
            inp_remark,
            amt_paid,
            '<button type="button" class="btn btn-inline btn-default input-sm btn-delete-rvlain" id="btn-delete-rvlain'+a+'" style="width:30px; border: none;"><span class="fa fa-close" style="color:red"></span></button>',
            a
        ]).draw(false);
        a += 1;

        if (cc_code == 'T-TITIP.NT'){
            titipnt_exist = true;
            $('#btn-add-trn-dr').prop('disabled', true);
        }

        $('#btn-save-rv-dr').prop('disabled', false);
    }
  
});

//btn delete table rv lain
$('#table-data-rvdepo-dr tbody').on('click', '.btn-delete-rvlain', function() {
    table_tab_lain
        .row($(this).parents('tr'))
        .remove()
        .draw();
    hitung_total_amt_lain();

    var count_row = table_tab_lain.data().length;
    if (count_row == 0){
        titipnt_exist = false;
        $('#btn-add-trn-dr').prop('disabled', false);
    }
});




//btn receive rv lain
$('#btn-receive-rv-dr').click(function() {
    alert_confirm('Apakah anda yakin untuk confirm RV?', function(){
        update_status_rv("BTN_RECEIVE");
    });
});

//btn search transaksi rv lain
$('#btn-search-rvlain-dr').click(function() {

    if ((branch_code_dr == null) || (branch_code_dr == '')) {
        alert_error('Silahkan pilih cabang terlebih dahulu !');
        $('#div-branch-br-dr').addClass('has-error');
    } else {
        $('#div-branch-br-dr').removeClass('has-error');
        var rv_no = $('#inp-new-rv-dr').val();

        if (rv_no.length == 0){
            if (check_session() === 'true') {
                $.ajax({
                    url: base_url + 'controller_draft_received/get_list_rv_lain',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        branch_id: branch_code_dr
                    },
                    cache: false,

                    success: function(response) {
                        console.log(response);
                        if (response) {
                            try {
                                var status = response['status'];
                                var listRv = response['listRv'];
                                var alert = response['alert'];
                                if (status == true) {
                                    if (listRv.length == 0) {
                                        alert_error('Tidak ada data');
                                    } else {
                                        $('#modal-rv-no').modal({
                                            show: true,
                                            backdrop: 'static'
                                        });
                                        table_list_rv_dr.clear().draw();
                                        $.each(listRv, function(index) {
                                            var rv_no = listRv[index]['rv_no'];
                                            var receive_date = listRv[index]['rv_date'];
                                            var received_from = listRv[index]['receive_from'];
                                            var document_no = listRv[index]['document_no'];
                                            var payment_type = listRv[index]['rv_payment_type_id'];
                                            var bank = listRv[index]['bank'];

                                            table_list_rv_dr.row.add([
                                                rv_no,
                                                receive_date,
                                                received_from,
                                                document_no,
                                                payment_type,
                                                bank
                                            ]).draw(false);
                                        });

                                    }
                                } else {
                                    alert_error(alert);
                                }
                            } catch (e) {
                                console.log(e);
                                $('#loading-ajax').hide();
                                alert_error("Terjadi Kesalahan" + e);
                            }
                        }
                    },
                    error: function(response) {
                        console.log(response);
                        alert_error(response);
                    }
                });
            }else{
                alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
                  localStorage.clear();
                  window.location.href = base_url + "Controller_login/login_view";
                });
            }    
        }
        else if (rv_no.length > 0){
            if (rv_no.length !== 13){
                alert_error('Input No. Receive dengan lengkap!');
            }
            else{
                receive_no_dr = rv_no;
                detail_rv_lain();
            }
        }
    }
});

//tr table transaksi rv lain
$('#table-rv-no-dr').on('click', 'tr', function() {
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        pilih_rv_dr = '';
    } else {
        table_list_rv_dr.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        pilih_rv_dr = table_list_rv_dr.row(this).data();
    }
});

$('#table-rv-no-dr').on( 'dblclick', 'tr', function () {
    pilih_rv_dr = table_list_rv_dr.row(this).data();
    receive_no_dr = pilih_rv_dr[0];
    $('#inp-new-rv-dr').val(receive_no_dr);
    detail_rv_lain();
});

//btn select rv (modal list rv)
$('#btn-select-rv-dr').click(function() {
    receive_no_dr = pilih_rv_dr[0];
    $('#inp-new-rv-dr').val(receive_no_dr);
    detail_rv_lain();
});

//btn Tambah rv lain (show hide form)
$('#btn-add-row-dr').click(function() {
    $('#form-add-rv').slideToggle('show');
    $('#slc-cc-lain-dr, #slc-pc-code-dr, #btn-save-rv-dr').prop('disabled', false);
    $('#btn-save-rv-dr').prop('disabled', false);
});

//btn cancel rv
$('#btn-cancel-rvlain-dr').click(function(){
    alert_confirm('Apakah anda yakin untuk membatalkan RV?', function(){
        update_status_rv("BTN_CANCEL");
    });
});

//btn clear
$('#btn-clear-tab-lain-dr').click(function(){
    clear_tab_lain();
});

$('#btn-reset-drv').click(function(){
    $('.clear-dr-recv').val('');
    table_customer_dr.clear().draw();
    $('#inp-no-kontrak-cust').prop('disabled', false);
});

//btn print
$('#btn-print-rvlain-dr').click(function(){
    var recv_no = $('#inp-new-rv-dr').val();
    alert_confirm('Ready to Print?', function(){
        if (check_session() === 'true') {
            $.ajax({
                url: 'controller_draft_received/cetak_rv_non_trade',
                type: 'POST',
                dataType: 'json',
                data: {
                    rv_no: recv_no.toUpperCase(),
                    branch_id: branch_code_dr.toUpperCase()
                },
                cache: false,

                success: function(response) {
                    console.log(response);
                    if (response) {
                        console.log(response);
                        var printWindow = window.open();
                        //printWindow.document.write(response);
                        printWindow.document.write('<pre id="printss" style="font-size:10px"></pre>');
                        //style="@page { size: landscape;}"
                        printWindow.document.querySelector('pre').innerHTML = response;
                        
                        printWindow.document.close();
                        printWindow.focus();
                        printWindow.print();
                        printWindow.close();
                    }
                    else{
                        alert_error("Data Gagal Dicetak");
                    }
                },
                error: function(response) {
                    console.log(response);
                    alert_error(response);
                }
            });
        }else{
            alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
              localStorage.clear();
              window.location.href = base_url + "Controller_login/login_view";
            });
        }    
    });
});

//btn save rv lain
$('#btn-save-rv-dr').click(function() {
    var data_tab_lain = table_tab_lain.data();

    if (data_tab_lain.length == 0){
        alert_error('Silakan tambahkan transaksi terlebih dahulu!');
    }
    else{
        var list_id = [];

        for (var i = 0; i < data_tab_lain.length; i++){
            var id = $(data_tab_lain[i][5]).attr('id');
            var angka_id = id.substring(10);

            //var angka_id = data_tab_lain[i][7];
            list_id.push(angka_id);
        }

        for (var i = 0; i < list_id.length; i++) {
            if (!$('#remark-rvlain' + list_id[i]).val()){
                alert_error('Remark tidak boleh kosong');
                return false;
            }
            else if (!$('#amt-rvlain' + list_id[i]).val()){
                alert_error('Amount paid tidak boleh kosong');
                return false;
            }
            else if (($('#amt-rvlain' + list_id[i]).val()) == 0){
                alert_error('Amount paid tidak boleh 0');
                return false;
            }
        }

        alert_confirm('Apakah anda yakin untuk menyimpan data?', function() {
            var rv_no = $('.inp-rv-dr').val();
            if(rv_no == rv_new_dr){
                rv_no = '';
            }
            var receive_from = $('#inp-acc-from-dr').val();
            var document_no = $('#inp-no-doc-dr').val();
            var total_amount = 0;
            var bank = $('#slc-bank-code-dr').val();
            var rv_type = "N";
            var rv_payment_type_id = $('#slc-paytype-dr').val();

            var list_dtl = [];
            for (var i = 0; i < list_id.length; i++) {
                var fl_amt_dtl = parseFloat(accounting.unformat($('#amt-rvlain' + list_id[i]).val()));
                list_dtl.push({
                    class_code: $('#slc-cc-thlain' + list_id[i]).val(),
                    amount: fl_amt_dtl,
                    remark: $('#remark-rvlain' + list_id[i]).val(),
                    obj_code: $('#slc-pc-thlain' + list_id[i]).val().split('-')[0].trim(),
                    rv_detail_id: $('#inp-rcv-dtl-id' + list_id[i]).val()
                })

                //total_amount +=  parseInt($('#amt-rvlain' + list_id[i]).val());
                total_amount += fl_amt_dtl;
            }

            if(parseInt(total_amount).toString().length > 13){
                alert_error('Total amount paid tidak boleh melebihi 13 digit angka!');
            }
            else{
                if (check_session() === 'true') {
                    $.ajax({
                        url: 'controller_draft_received/save_rv',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            branch: branch_code_dr,
                            receive_from: receive_from,
                            document_no: document_no,
                            amount: total_amount,
                            bank: bank,

                            rv_no: rv_no,
                            rv_type: rv_type,
                            rv_payment_type_id: rv_payment_type_id,

                            list_dtl: list_dtl
                        },
                        cache: false,

                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    var status = response['status'];
                                    if (status == true){
                                        var result = response['result'];
                                        if(response['listRvDtlId']){
                                            alert_info(result);
                                            rv_no = response['result'].substring(35);
                                                $('#inp-new-rv-dr').val(rv_no);
                                                after_save();
                                                $('#form-add-rv').hide();
                                                
                                                $.each(response['listRvDtlId'], function(index, dtl_id) {
                                                    $('#inp-rcv-dtl-id' + list_id[index]).val(dtl_id);
                                                });
                                                $('.inp-rv-dr').val(rv_no);
                                        }
                                        else{
                                            if (result == '1'){
                                                alert_info('Sudah pernah dilakukan penerimaan untuk no. RV ' +rv_no+' , mohon dapat dicek kembali');
                                                //after_receive();
                                                clear_tab_lain();
                                            }
                                            else if (result == '2'){
                                                alert_info('Sudah pernah dilakukan pembatalan untuk no. RV ' +rv_no+' , mohon dapat dicek kembali');
                                                //after_cancel();
                                                clear_tab_lain();
                                            }
                                            else{
                                                alert_info(result);
                                                after_save();
                                            }
                                        }
                                    }
                                    else{
                                        alert_error(response['result']);
                                    }
                                } catch (e) {
                                    console.log(e);
                                    $('#loading-ajax').hide();
                                    alert_error("Terjadi Kesalahan" + e);
                                }
                            }
                        },
                        error: function(response) {
                            console.log(response);
                            alert_error(response);
                        }
                    });
                }else{
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
                      localStorage.clear();
                      window.location.href = base_url + "Controller_login/login_view";
                    });
                }    
            }
        });
    }      
});

/*------------------------------------------FUNCTION-----------------------------------------------------------*/
//get payment type
function get_payment_type() {
    var option = "";
    if(check_session() === 'true'){
        $.ajax({
            url: "controller_draft_received/get_paytype_dr",
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                console.log(response);
                if (response) {
                    try{
                        var status = response['status'];
                        if (status == true){
                            $.each(response['data'], function() {
                                option += "<option value = '" + this['pay_methode_code'] + "'>" + this['pay_methode_code'] + " - " + this['pay_methode_desc'] + " </option>";
                            });

                            $('#slc-paytype-dr').html('<option value="">--SILAHKAN PILIH--</option>' + option);
                        }
                        else{
                            var notif = response['data'];
                            alert_error(notif);
                        }
                    }
                    catch(e){
                        $('#loading-ajax').hide();
                        alert_error(e);
                    }
                }
                else{
                    alert_error("Cek Jaringan");
                }
            },
            error: function(response) {
                console.log(response);
                alert_error(response);
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
          localStorage.clear();
          window.location.href = base_url + "Controller_login/login_view";
        });
    }    
};

//get bank tab lain-lain
function get_bank_lain_dr() {
    var option;
    if (check_session() === 'true') {
        $.ajax({
            url: "controller_draft_received/get_bank_mdm_dr",
            type: 'POST',
            dataType: 'json',
            data: {
                "bank_stat": "0",
                "bank_br_id": branch_code_dr
            },
            cache: false,

            success: function(response) {
                console.log(response);
                if (response) {
                    try{
                        $('#slc-bank-code-dr').empty();

                        var status = response['status'];
                        if (status == true){
                            $('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#slc-bank-code-dr').addClass('form-control');
                            $.each(response['data'], function(i){
                            var bank_code = response['data'][i]['bankCode'];
                            var bank_name = response['data'][i]['bankName'];
                            $('#slc-bank-code-dr').append('<option value="'+bank_code+'">'+bank_code+ ' - ' +bank_name+ '</option>');
                            })
                        }
                        else{
                            var notif = response['data'];
                            alert_error(notif);
                        }
                        
                    }
                    catch(e){
                        $('#loading-ajax').hide();
                        alert_error(e);
                    }
                }
                else{
                    alert_error("Cek Jaringan");
                }
            },
            error: function(response) {
                console.log(response);
                alert_error(response);
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
          localStorage.clear();
          window.location.href = base_url + "Controller_login/login_view";
        });
    }
};

function get_cc_lain(){
    if (check_session() === 'true') {
        $.ajax({
            url: "controller_draft_received/get_cc_lain",
            type: 'GET',
            dataType: 'json',
            cache: false,

            success: function(response) {
                console.log(response);
                if (response) {
                    try{
                        $('#slc-cc-lain-dr').empty();

                        var status = response['status'];
                        if (status == true){
                            $('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#slc-cc-lain-dr').addClass('form-control');
                            $.each(response['data'], function(i){
                            var domain_value = response['data'][i]['domain_value'];
                            var domain_desk = response['data'][i]['domain_desk'];
                            $('#slc-cc-lain-dr').append('<option value="'+domain_value+','+domain_desk+'">'+domain_value+ ' - ' +domain_desk+ '</option>');
                            })
                        }
                        else{
                            var notif = response['message'];
                            alert_error(notif);
                        }
                        
                    }
                    catch(e){
                        $('#loading-ajax').hide();
                        alert_error(e);
                    }
                }
                else{
                    alert_error("Cek Jaringan");
                }
            },
            error: function(response) {
                console.log(response);
                alert_error(response);
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
          localStorage.clear();
          window.location.href = base_url + "Controller_login/login_view";
        });
    }    
}

function get_obj_code(){
    if (check_session() === 'true') {
        $.ajax({
            url: "controller_draft_received/get_obj_code",
            type: 'GET',
            dataType: 'json',
            cache: false,

            success: function(response) {
                console.log(response);
                if (response) {
                    try{
                        $('#slc-pc-code-dr').empty();
                        var status = response['status'];
                        if (status == true){
                            $('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#slc-pc-code-dr').addClass('form-control');
                            $.each(response['data'], function(i){
                            var obj_code = response['data'][i]['obj_CODE'];
                            var obj_desk = response['data'][i]['obj_DESC'];
                            $('#slc-pc-code-dr').append('<option value="'+obj_code+' - '+obj_desk+'">'+obj_code+ ' - ' +obj_desk+ '</option>');
                            })
                        }
                        else{
                            if(response['data']){
                                alert_error('Data Tidak ditemukan!');
                            }
                            else{
                                alert_error(response['data']);
                            }
                        }
                    }
                    catch(e){
                        $('#loading-ajax').hide();
                        alert_error(e);
                    }
                }
                else{
                    alert_error("Cek Jaringan");
                }
            },
            error: function(response) {
                console.log(response);
                alert_error(response);
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
          localStorage.clear();
          window.location.href = base_url + "Controller_login/login_view";
        });
    }    
}

//detail rv
function detail_rv_lain (){
    if (check_session() === 'true') {
        $.ajax({
            url: base_url + 'controller_draft_received/get_detail_rv_lain',
            type: 'POST',
            dataType: 'json',
            data: {
                rv_no: receive_no_dr.toUpperCase(),
                branch: branch_code_dr.toUpperCase()
            },
            cache: false,

            success: function(response) {
                console.log(response);
                if (response) {
                    try {
                        var status = response['status'];
                        
                        if (status == true) {
                            var data = response['data'];
                            var detail_rv = data.listDtl;
                            console.log(data);

                            if (detail_rv.length == 0){
                                alert_error('Data tidak ditemukan!')
                            }
                            else{
                                if(!data.receive_from){
                                    var received_from = data.receive_from;
                                }else{
                                    var received_from = data.receive_from.toUpperCase();
                                }

                               if(!data.document_no){
                                    var received_from = data.document_no;
                                }else{
                                    var doc_no = data.document_no.toUpperCase();
                                }

                                if(!data.rv_payment_type_id){
                                    var payment_type = data.rv_payment_type_id;
                                }else{
                                    var payment_type = data.rv_payment_type_id.toUpperCase();
                                }

                                if(!data.bank){
                                    var bank = data.bank;
                                }else{
                                    var bank = data.bank.toUpperCase();
                                }

                                $('#inp-acc-from-dr').val(received_from);
                                $('#inp-no-doc-dr').val(doc_no);
                                $('#slc-paytype-dr').val(payment_type);
                                $('#slc-bank-code-dr').val(bank);

                                $('#modal-rv-no').modal('hide');
                                $('#form-add-rv').hide();

                                table_tab_lain.clear().draw();
                                var total_amount_paid = 0;

                                $.each(detail_rv, function(i) {
                                    var rv_detail_id = detail_rv[i]['rv_detail_id'];
                                    var rv_detail_id2 = '<input type="hidden" class="form-control" id="inp-rcv-dtl-id' + i + '" value="'+rv_detail_id+'">';
                                    var inp_no_rv = '<input type="text" class="form-control inp-rv-dr" value="'+receive_no_dr+'" disabled>';
                                    var class_code = detail_rv[i]['class_code'];
                                    var class_code2 = '<input type="text" class="form-control" value="' + class_code + '" id="slc-cc-thlain' + i + '" disabled>';
                                    var class_code_desc = detail_rv[i]['class_code_desc'];
                                    var obj_code = detail_rv[i]['obj_code'];
                                    var obj_code2 = '<input type="text" class="form-control" value="' + obj_code + '" id="slc-pc-thlain' + i + '" disabled>';
                                    var remarks = detail_rv[i]['remark'];
                                    var remarks2 = '<input type="text" class="form-control remark-rvlain" maxlength="50" value="' + remarks + '" id="remark-rvlain' + i + '" style="width:230px">';
                                    var amt = detail_rv[i]['amount'];
                                    var formatted_amt = accounting.formatMoney(amt, '', 2, ',', '.');
                                    var receive_amt_a = '<input type="text" class="form-control inp-number-dr amt-rvlain" maxlength="15" value="' + formatted_amt + '" id="amt-rvlain' + i + '">';

                                    table_tab_lain.row.add([
                                        class_code2 + rv_detail_id2,
                                        inp_no_rv,
                                        obj_code2,
                                        class_code_desc,
                                        remarks2,
                                        receive_amt_a,
                                        '<button type="button" class="btn btn-inline btn-default input-sm" id="" style="width:30px; border: none;" disabled><span class="fa fa-close" style="color:red"></span></button>'
                                    ]).draw(false);

                                    //total_amount_paid += parseInt(amt);
                                    total_amount_paid += parseFloat(accounting.unformat(amt));

                                    $('#inp-total-rvlain-dr').val(accounting.formatMoney(total_amount_paid, '', 2, ',', '.'));
                                });

                                var rv_status = data.rv_status;
                                if (rv_status == '0'){
                                    after_save();
                                }else if(rv_status == '1'){
                                    alert_info('Pembayaran telah dilakukan untuk No. RV ' + receive_no_dr);
                                    after_receive();

                                }else if (rv_status == '2'){
                                    alert_info('Pembatalan telah dilakukan untuk No. RV '+ receive_no_dr);
                                    after_cancel();
                                }

                            }

                            
                        } else {
                            alert_error(response['alert']);
                        }
                    } catch (e) {
                        console.log(e);
                        $('#loading-ajax').hide();
                        alert_error("Terjadi Kesalahan" + e);
                    }
                }
            },
            error: function(response) {
                console.log(response);
                alert_error(response);
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
          localStorage.clear();
          window.location.href = base_url + "Controller_login/login_view";
        });
    }
}

//hitung total amt cuts
function hitung_total_amt_cust(){
    var data_tab_cust = table_customer_dr.data();
    var total = 0;

    for (var i = 0; i < data_tab_cust.length; i++){
        if ($('#check-crv-' + i).is(":checked")) {
            if ($('#inp-amount-rv-' + i).val() == '') {
                total += 0;
            } else {
                //total += parseInt($('#inp-amount-rv-' + i).val());
                var inp_amt = $('#inp-amount-rv-' + i).val();
                var unformat_amt = accounting.unformat(inp_amt);
                total += parseFloat(unformat_amt);
            }
        } 
    }
    $('#total-amount-cust').val(accounting.formatMoney(total, '', 2, ',', '.'));
}

//hitung total amt lain
function hitung_total_amt_lain(){
    var data_tab_lain = table_tab_lain.data();

    var list_id = [];
    for (var i=0; i<data_tab_lain.length; i++){
        var id = $(data_tab_lain[i][5]).attr('id');
        var angka_id = id.substring(10);

        //var angka_id = data_tab_lain[i][7];
        list_id.push(angka_id);

    }

    var total = 0;
    for (var i = 0; i < list_id.length; i++){
        if ($('#amt-rvlain' + list_id[i]).val() == ''){
            total += 0;
        }
        else{
            //total += parseInt($('#amt-rvlain' + list_id[i]).val());
            var alpha = $('#amt-rvlain' + list_id[i]).val();
            var beta = accounting.unformat(alpha);
            total += parseFloat(beta);
        }
    }
    $('#inp-total-rvlain-dr').val(accounting.formatMoney(total, '', 2, ',', '.'));
}

function update_status_rv(btn){
    var rv_no = $('.inp-rv-dr').val();

    if (check_session() === 'true') {
        $.ajax({
            url: 'controller_draft_received/update_status_rv',
            type: 'POST',
            dataType: 'json',
            data: {
                branch: branch_code_dr,
                rv_no: rv_no,
                button: btn
            },
            cache: false,

            success: function(response) {
                console.log(response);
                if (response) {
                    try{
                        var status = response['status'];
                        if (status == true){
                            var result = response['result'];

                            if (result == '1'){
                                alert_info('Sudah pernah dilakukan penerimaan untuk no. RV ' +rv_no+' , mohon dapat dicek kembali');
                                //after_receive();
                            }
                            else if (result == '2'){
                                alert_info('Sudah pernah dilakukan pembatalan untuk no. RV ' +rv_no+' , mohon dapat dicek kembali');
                                //after_cancel();
                            }
                            else{
                                alert_info(result);
                                //clear_tab_lain();
                            }
                            clear_tab_lain();
                            titipnt_exist = false;
                            $('#btn-add-trn-dr').prop('disabled', false);
                        }
                        else{
                            alert_error(response['message']);
                        }
                    }
                    catch(e){
                        $('#loading-ajax').hide();
                        alert_error(e);
                    }
                }
                else{
                    alert_error("Cek Jaringan");
                }
            },
            error: function(response) {
                console.log(response);
                alert_error(response);
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
          localStorage.clear();
          window.location.href = base_url + "Controller_login/login_view";
        });
    }    
}

function clear_tab_lain(){
    $('.clear-dr-recv, #inp-new-rv-dr').val('');
    table_tab_lain.clear().draw();
    $('#inp-acc-from-dr, #inp-no-doc-dr, #slc-paytype-dr, #slc-bank-code-dr, #slc-cc-lain-dr, #slc-pc-code-dr, #btn-add-row-dr, #btn-add-trn-dr, #btn-cancel-rvlain-dr, #btn-print-rvlain-dr, #btn-save-rv-dr, #btn-receive-rv-dr').prop('disabled', true);
    $('#form-add-rv').hide();
}

function after_save(){
    $('#inp-acc-from-dr, #inp-no-doc-dr, #slc-paytype-dr, #slc-cc-lain-dr, #slc-pc-code-dr, #btn-add-row-dr, #btn-add-trn-dr, #btn-print-rvlain-dr, .btn-delete-rvlain').prop('disabled', true);
    $('#slc-bank-code-dr, #btn-cancel-rvlain-dr, #btn-receive-rv-dr, #btn-save-rv-dr').prop('disabled', false);
}

function after_receive(){
    $('#inp-acc-from-dr, #inp-no-doc-dr, #slc-paytype-dr, #slc-bank-code-dr, #slc-cc-lain-dr, #slc-pc-code-dr, .remark-rvlain, .amt-rvlain, #btn-add-row-dr, #btn-add-trn-dr, #btn-cancel-rvlain-dr, #btn-save-rv-dr, #btn-receive-rv-dr').prop('disabled', true);
    $('#btn-print-rvlain-dr').prop('disabled', false);
}

function after_cancel(){
    $('#inp-acc-from-dr, #inp-no-doc-dr, #slc-paytype-dr, #slc-bank-code-dr, #slc-cc-lain-dr, #slc-pc-code-dr, .remark-rvlain, .amt-rvlain, #btn-add-row-dr, #btn-add-trn-dr, #btn-cancel-rvlain-dr, #btn-print-rvlain-dr, #btn-save-rv-dr, #btn-receive-rv-dr').prop('disabled', true);
}

/*------------------tab selling-------------------*/
/*var table_selling = $('#table-data-selling-dr').DataTable();
$('#selling-tab-dr').click(function() {
    get_class_code_dr();
});


function get_class_code_dr(){
    $.ajax({
        url: "controller_draft_received/get_cc_selling",
        type: 'GET',
        dataType: 'json',
        cache: false,

        success: function(response) {
            console.log(response);
            if (response) {
                try{
                    $('#slc-cc-selling-dr').empty();

                    var status = response['status'];
                    if (status == true){
                        $('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#slc-cc-selling-dr').addClass('form-control');
                        $.each(response['data'], function(i){
                        var domain_value = response['data'][i]['domain_value'];
                        var domain_desk = response['data'][i]['domain_desk'];
                        $('#slc-cc-selling-dr').append('<option value="'+domain_value+'">'+domain_value+ ' - ' +domain_desk+ '</option>');
                        })
                    }
                    else{
                        var notif = response['message'];
                        alert_error(notif);
                    }
                    
                }
                catch(e){
                    $('#loading-ajax').hide();
                    alert_error(e);
                }
            }
            else{
                alert_error("Cek Jaringan");
            }
        },
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
    });
}*/