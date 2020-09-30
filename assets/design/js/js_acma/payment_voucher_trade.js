//=============================================== HAK AKSES ============================================================//

var inp_branch_id = $('#inp-branch-code-pvt').val();
var payment_no = '';
var pay_tom = '';
var bank_it = '';
var bank_code_pvt = '';
var bank_name_pvt = '';
var pdc_no_pvt = '';
var m_dtclosing = '';
var remark = '';
var jumlahpdc = '';
var bankcode = '';
var rg_cashpdc = '';
var pay_mode = '';
var bank_pvt = '';
var bank_id = $('#inp-bank-pvt').val();
var pv_date = '';
var doc_no = '';
var user = $('#hdn-user').val();
var payment_id = '';
var pdc_id = '';
var contract_id = '';
var class_code = '';
var detail_amt = '';
var total_amount = '';
var description = '';
var pc_code = '';
var pembayaranke = '';
var inst_no = '';
var listData = "";
var cust_id = '';
var bank_accno = '';
var no_pv_pvt = '';
var no_pdc_pvt = '';
var reg_no_pvt = '';



var role_dpc = '';
var role_code_dpc = '';
// $('#btn-tambah-dp-lain').prop("disabled", true);
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

var table_pvt = $('#tbl-pvt').DataTable({
  responsive: true,
    "columnDefs": [
    { "width": "30%", "targets": 3 }
    ]

});

var table_pvt_nontrade = $('#tbl-pvt-nontrade').DataTable({
  responsive: true,
    "columnDefs": [
    { "width": "30%", "targets": 2 }
    ]

});

if ($('#page-payment-voucher-trade').length) {
    // console.log('awal payment');
    $('#btn-print-pvt').prop('disabled', true);
    $('#btn-save-pvt').prop('disabled', true);
    $('#btn-paid-pvt').prop('disabled', true);
    $('#btn-cancel-pvt').prop('disabled', true);
    // $('#tbl-pvt-nontrade').hide();
    $('#tbl-pvt-nontrade').parents('div.dataTables_wrapper').first().hide(); //Menghide table untuk class code Non Trade
    $('#lbl-register-no-pvt').hide();
}

//Insialisasi Datatable
var table_search_no_pv_pvt = $('#tbl-search-no-pv-pvt').DataTable({
  responsive: true
});
var table_search_bank_pvt = $('#tbl-search-bank-pvt').DataTable({
  responsive: true
});
var table_search_nopdc_pvt = $('#tbl-search-nopdc-pvt').DataTable({
  responsive: true
});
//End Insialisasi Datatable

//Kondisi Ketika Load dari Menu Draf Payment
if (localStorage.getItem("menu") == "load_pv_trade") {
	$.each(role_dpc, function(i) {
		console.log(role_dpc[i]['role_code']);
		if (role_dpc[i]['role_code'] === 'SBMT_DPC') {
		    role_code_dpc = role_dpc[i]['role_code'];
		    console.log('submit')
		    $('#btn-save-pvt, #btn-paid-pvt, #btn-cancel-pvt').prop('disabled', false);
		    // $('#btn-tambah-dp-lain').show();
		    return false;
		} else if (role_dpc[i]['role_code'] === 'VIEW_DPC') {
		    role_code_dpc = role_dpc[i]['role_code'];
		    console.log('view');
		    console.log(role_code_dpc);
		    $('#btn-save-pvt, #btn-paid-pvt, #btn-cancel-pvt').prop('disabled', true);
		    // $('#btn-tambah-dp-lain').hide();
		    return false;
		}
	});
    // localStorage.setItem("menu", "pv_trade");
    console.log('menu pv trade ');
    no_pv_pvt = localStorage.getItem("nomor_pv");
    inp_branch_id = localStorage.getItem("branch_id");
    pay_mode = localStorage.getItem("payment_type");
    no_pdc_pvt = localStorage.getItem("nomor_pdc");
    // console.log(no_pv_pvt);
    // console.log(inp_branch_id);
    // console.log(pay_mode);
    // console.log(no_pdc_pvt);
    if (pay_mode === 'C') {
    	// console.log('pvvvv kk');
    	$('#rdo-pdc').hide();
		$('#rdo-cash-bank').show();
		$('#cash-bank-pvt').prop("checked", true);
		$('#pdc-pvt').prop("checked", false);
		get_header_cash_pvt_js(); 
    	$('#btn-print-pvt').prop('disabled', true);
    	$('#btn-save-pvt').prop('disabled', false);
    	$('#btn-paid-pvt').prop('disabled', false);
    	$('#btn-cancel-pvt').prop('disabled', false);
    } else{
    	// console.log('pdc kk');
    	$('#rdo-pdc').show();
		$('#rdo-cash-bank').hide();
		$('#cash-bank-pvt').prop("checked", false);
		$('#pdc-pvt').prop("checked", true);
    	get_header_pdc_pvt_js();
    	$('#btn-print-pvt').prop('disabled', true);
	    $('#btn-save-pvt').prop('disabled', true);
	    $('#btn-paid-pvt').prop('disabled', false);
	    $('#btn-cancel-pvt').prop('disabled', true);
    }
} else {
	// console.log('bukan dari load');
	$('#rdo-pdc').hide();
	$('#rdo-cash-bank').show();
	$('#cash-bank-pvt').prop("checked", true);
	$('#pdc-pvt').prop("checked", false);
}
//End Kondisi Ketika Load dari Menu Draf Payment

$(document).keydown(function( e ) {
	if( e.keyCode == 116 ) {
        reset_data();
    }
});

$('#PVTR').click(function(){
    reset_data();  
});


$('#inp-pv-date').val(today);
$('#inp-bank-pvt').val('001 - MUF ANGSURAN');

//------------------------------------------Modal---------------------------------------\\

//Modal No PV
function modal_no_pv_pvt() {
    $('.modal-backdrop').css('display', 'none');
    $('#modal-no-pv-pvt').modal('show');
}
//End Modal No PV

//Modal Bank
function modal_bank_pvt() {
    $('.modal-backdrop').css('display', 'none');
    $('#modal-bank-pvt').modal('show');
}
//End Modal Bank

//Modal No PDC
function modal_nopdc_pvt() {
    $('.modal-backdrop').css('display', 'none');
    $('#modal-nopdc-pvt').modal('show');
}
//End Modal No PDC

//------------------------------------------End Modal---------------------------------------\\

//---------------------------------------Button Click-------------------------------------------\\

//Radio Button PDC
$('#pdc-pvt').click(function () {
	if (check_session() === 'true') {
		reset_data();
		$('#btn-search-pv-no').prop('disabled', true);
		$('#rdo-pdc').show();
		$('#rdo-cash-bank').hide();
	} else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//End Radio Button PDC

//Radio Button CASH
$('#cash-bank-pvt').click(function () {
	if (check_session() === 'true') {
		reset_data();
		$('html, body').animate({scrollBottom:600}, 'slow');
	    location.reload();
		$('#rdo-pdc').hide();
		$('#rdo-cash-bank').show(); 
	} else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//End Radio Button CASH

//Button Search PV
$('#btn-search-pv-no').click(function () {
	if (check_session() === 'true') {
		$.each(role_dpc, function(i) {
		    console.log(role_dpc[i]['role_code']);
		    if (role_dpc[i]['role_code'] === 'SBMT_DPC') {
		        role_code_dpc = role_dpc[i]['role_code'];
		        console.log('submit')
		        $('#btn-save-pvt, #btn-paid-pvt, #btn-cancel-pvt').prop('disabled', false);
		        // $('#btn-tambah-dp-lain').show();
		        return false;

		    } else if (role_dpc[i]['role_code'] === 'VIEW_DPC') {
		        role_code_dpc = role_dpc[i]['role_code'];
		        console.log('view');
		        console.log(role_code_dpc);
		        $('#btn-save-pvt, #btn-paid-pvt, #btn-cancel-pvt').prop('disabled', true);
		        // $('#btn-tambah-dp-lain').hide();
		        return false;
		    }
		});
		var count_pv_pvt = $('#inp-pv-no').val();
		if (count_pv_pvt != "") {
			if (count_pv_pvt.length != 13) {
				alert_info("Harap Mengisi No PV Dengan Benar");
			} else {
				get_header_cash_pvt_js();
			}
		} else {
			get_no_pv_pvt_js();
			modal_no_pv_pvt();
		}
	} else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

$( "#inp-pv-no" ).keypress(function(e) {
   var key = e.which;
   if(key == 13)  // the enter key code
     {
        $('#btn-search-pv-no').click();
        return false;  
     }
});
//End Button Search PV

//Button Search Bank
$('#btn-search-bank-pvt').click(function () {
	if (check_session() === 'true') {
		get_bank_pvt_js();
		modal_bank_pvt();
	} else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//End Search Bank

//Button Search PDC
$('#btn-search-no-pdc').click(function () {
	if (check_session() === 'true') {
		get_nopdc_pvt_js();
		modal_nopdc_pvt();
	} else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//End Button Search PDC

//Button Save
$('#btn-save-pvt').click(function() {
	if (check_session() === 'true') {
		save_master_pvt_js();
	} else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//End Button Save

//Button Paid
$('#btn-paid-pvt').click(function () {
	if (check_session() === 'true') {
		alert_confirm('APAKAH ANDA YAKIN UNTUK MELAKUKAN PAID?', function(){
			paid_master_pvt_js();
		});
	} else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//End Button Paid

//Button Cancel
$('#btn-cancel-pvt').click(function () {
	if (check_session() === 'true') {
		alert_confirm('APAKAH ANDA YAKIN UNTUK MELAKUKAN CANCEL ?', function(index) {
	        cancel_master_pvt_js();
	    });
		// cancel_master_pvt_js();
	} else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//End Button Cancel

//Button Print
$('#btn-print-pvt').click(function () {
	if (check_session() === 'true') {
		alert_confirm('Please Ready to Print...?', function(index) {
			print_pvt_js_pdf();
	    });
	} else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//End Button Print

//Function Reset Data
function reset_data(){
  	$('.res-global').val('');
 	$('#inp-pv-date').val(today);
	table_pvt.clear().draw();
	localStorage.clear();
	$('#inp-pay-to-pvt').val('');
	$('#inp-payment-to-pvt').val('');
	$('#inp-pv-no').val('');
	$('#inp-bank-pvt').val('');
	$('#inp-acc-pvt').val('');
	$('#inp-remark-pvt').val('');
	$('#inp-no-pdc-pvt').val('');
	$('#inp-bank-pdc-pvt').val('');
	$('#inp-bank-branch-pdc-pvt').val('');
	$('#inp-pdc-date-pvt').val('');
	$('#inp-pdc-due-date-pvt').val('');
	$('#inp-jumlah-pdc-pvt').val('');

	$('#btn-save-pvt').prop('disabled', true);
	$('#btn-paid-pvt').prop('disabled', true);
	$('#btn-cancel-pvt').prop('disabled', true);
	$('#btn-print-pvt').prop('disabled', true);
}

$('#btn-clear-pvt').click(function () {
	if (check_session() === 'true') {
	  	reset_data();
	  	$('html, body').animate({scrollBottom:600}, 'slow');
	    location.reload();
	    localStorage.clear();
	} else if (check_session() === 'false') {
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//End Function Reset Data
//-----------------------End Button Click-----------------------\\


//---------------------------------Function-------------------------------------------\\

//Function Untuk get No PV
function get_no_pv_pvt_js() {
  	// console.log(inp_branch_id);
    $.ajax({
        url: base_url+"Controller_payment_voucher_trade/get_no_pv_pvt",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id": inp_branch_id

        },

        // async :false,
	    success: function(response) {
	   	console.log(response);
	   		if (response) {
				try{
					// console.log(response['no_pv_pvt']['Data']);
					table_search_no_pv_pvt.clear().draw();
					$.each(response['no_pv_pvt']['data'], function(index) {
		            table_search_no_pv_pvt.row.add([
		                    this['payment_no'],
		                    this['pdc_id'],
		                    this['user_id'],
		                    accounting.formatMoney(this['amount'], '', 2, ',', '.')
		                ]).draw(false);
		            });
				} catch(e){
					$('#loading-ajax').hide();
					console.log(e);
					alert_error("Terjadi Kesalahan Ambil Data NO PV => " +e);
				}
			}
		},
		error: function(response){
			console.log(response);
			alert_error(response['data']);
		}
	});
}
//End Function Untuk get No PV

//Function Untuk get Bank
function get_bank_pvt_js() {
 // console.log(inp_branch_id);
    $.ajax({
        url: base_url+"Controller_payment_voucher_trade/get_bank_pvt",
        type: 'POST',
        dataType: 'json',
        data: {
            "bankbrid": inp_branch_id
        },

        // async :false,
   		success: function(response) {
   		console.log(response);
   			if (response) {
				try{
					// console.log(response['bank_pvt']['data']);
					table_search_bank_pvt.clear().draw();
					$.each(response['bank_pvt']['data'], function(index) {
                        table_search_bank_pvt.row.add([
                                this['bankCode'] + ' - ' + this['bankBr'],
                                this['bankName']
                            ]).draw(false);
                    });
				} catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan Ambil Data Bank => " +e);
				}
			}
		},
		error: function(response){
			console.log(response);
			alert_error(response['data']);
		}
	});
}
//End Function Untuk get Bank

//Funtion Untuk get PDC
function get_nopdc_pvt_js() {
 	// console.log(inp_branch_id);
    $.ajax({
        url: base_url+"Controller_payment_voucher_trade/get_nopdc_pvt",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id" : inp_branch_id

        },

        // async :false,
   		success: function(response) {
   		console.log(response);
			if (response) {
				try{
					// console.log(response['nopdc_pvt']['data']);
					// console.log(response['nopdc_pvt']['bank_name']);
					table_search_nopdc_pvt.clear().draw();
					var bank_pvt_ = '';
					var error = '';
					if (response['nopdc_pvt']['status'] === false) {
						error = response['nopdc_pvt']['data'];
        				alert_info("Gagal Mengambil Data, " + error, function() {
        					location.reload();
		    				localStorage.clear();
        				});
					} else {
						$.each(response['nopdc_pvt']['data'], function(index) {
							bank_it = this['bank_id'];
							var bank_gab = this['bank_gab'];
							console.log(bank_it);
							if (bank_gab == null) {
								error = 'Data Bank Tidak Ditemukan. Silahkan Cek Parameter Bank Dengan Cabang : ' + inp_branch_id + ' Dan Kode Bank : ' + bank_it;
								alert_info(error, function() {
									location.reload();
			    					localStorage.clear();
								});
							} else {
								table_search_nopdc_pvt.row.add([
					                this['pdc_no'],
					                accounting.formatMoney(this['pdc_amount'], '', 2, ',', '.'),
					                // this['pdc_amount'],
					                this['pdc_date'],
					                this['pdc_duea_date'],
					                this['bank_branch'],
					                bank_gab,
					                // bank_it + ' - ' + bank_name_pvt,
					                this['reject_reason']
					            ]).draw(false);
							}	                
			            });
					}					
				} catch(e){
					$('#loading-ajax').hide();
					console.log(e);
					alert_error("Terjadi Kesalahan Ambil Data No PDC => " +e);
				}
			}
		},
		error: function(response){
			console.log(response);
			alert_error(response['data']);
		}
	});
}
//End Funtion Untuk get PDC

//Function Untuk get data header Cash
function get_header_cash_pvt_js() {
	if (localStorage.getItem("menu") == "load_pv_trade") {

	    no_pv_pvt = localStorage.getItem("nomor_pv");
	    inp_branch_id = localStorage.getItem("branch_id");
	    // console.log(no_pv_pvt);
	    // console.log(inp_branch_id);
	    // console.log(no_pdc_pvt);
	    $('#inp-pv-no').val(no_pv_pvt);
	} else {
		// console.log('salah');
		var no_pv_pvt1 = $('#inp-pv-no').val();
		no_pv_pvt = no_pv_pvt1.toUpperCase();
	}

	var no_pv_pvt1 = $('#inp-pv-no').val();
	no_pv_pvt = no_pv_pvt1.toUpperCase();
	// console.log(inp_branch_id);
	// console.log(no_pv_pvt);
	// console.log(no_pdc_pvt);
	console.log(role_code_dpc);
    $.ajax({
    	url: base_url+"Controller_payment_voucher_trade/get_data_pvt",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id" : inp_branch_id,
			"payment_no" : no_pv_pvt,
			"pdc_no" : no_pdc_pvt   
        },

        success : function(response) {
        	console.log(response);
        	if (response) {
        		try {
        			// console.log(response['data_pvt']['status']);
        			if (response['data_pvt']['status'] === false) {
        				var error = response['data_pvt']['data'];
        				alert_info("Gagal Mengambil Data, Silahkan Cek Kembali No PV Yang Anda Masukan! " + error);
        			} else {
        				if (response['data_pvt']['header']['payment_type'] == "T") {
        					// $('#lbl-payment-to-pvt').show();
        					// $('#lbl-register-no-pvt').hide();
        					$('#lbl-payment-to-pvt').html('Payment To');
        					if (response['data_pvt']['header']['bank_id'] != null) {
	        					// console.log(response['data_pvt']['bank_name']);
	        					$.each(response['data_pvt']['bank_name'], function(index) {
	        						bank_name_pvt = this['bankName'];	
	        						// console.log(bank_name_pvt);
	        						bank_accno = this['accNo'];
	        						// console.log(bank_accno);
	        					});
	        				}
	        				$.each(response['data_pvt']['header'], function(index) {
	        					// console.log(response['data_pvt']['header']);
	        					payment_id = response['data_pvt']['header']['payment_id'];
	        					// console.log(payment_id);
								if (response['data_pvt']['header']['pdc_id'] == 0) {
				                    pdc_id = '';
				                } else {
				                	pdc_id = response['data_pvt']['header']['pdc_id'];
				                }
				                // console.log(pdc_id);
								var payment_status = response['data_pvt']['header']['payment_status'];
								// console.log(payment_status);
								pay_tom = response['data_pvt']['header']['pay_to'];
								// console.log(pay_tom);
								bank_it = response['data_pvt']['header']['bank_id'];
								// console.log(bank_it);
								remark = response['data_pvt']['header']['remarks'];
								// console.log(remark);
								pv_date = response['data_pvt']['header']['paid_date'];
								// console.log(pv_date);
								doc_no = response['data_pvt']['header']['document_no'];
								// console.log(doc_no);
								total_amount = response['data_pvt']['header']['amount'];
								// console.log(total_amount);
								pembayaranke = response['data_pvt']['header']['payment_to'];
								// console.log(pembayaranke);
								cust_id = response['data_pvt']['header']['customer_id'];
								$('#inp-doc-no-pvt').val(doc_no);
								if (pv_date != null) {
									$('#inp-pv-date').val(pv_date);
								} else {
									$('#inp-pv-date').val(today);
								}
								if (pembayaranke === "Mandiri Utama Finance") {
									var pay_top = '';
									$.each(response['data_pvt']['empl_name'], function(index) {
										pay_top = this['EMPL_NPK_GAB'];
									});
									$('#inp-pay-to-pvt').val(pay_top);
								} else {
									$('#inp-pay-to-pvt').val(pay_tom);
									// console.log('masuk customer');
								}
								$('#inp-payment-to-pvt').val(pembayaranke);
								$('#inp-total-pvt').val(accounting.formatMoney(total_amount, '', 2, ',', '.')); 
								pay_mode = response['data_pvt']['header']['pay_mod'];
								if (pay_mode.includes('CASH')) {
									$('#cash-bank-pvt').prop('checked', true);
									$('#pdc-pvt').prop('checked', false);
									$('#rdo-pdc').hide();
									$('#rdo-cash-bank').show();
									if (bank_it != null) {
										$('#inp-bank-pvt').val(bank_it + ' - ' + bank_name_pvt);
									} else {
										$('#inp-bank-pvt').val('001 - MUF ANGSURAN');
									}
									$('#inp-acc-pvt').val(bank_accno);
									$('#inp-remark-pvt').val(remark);
								}else{
									pdc_no_pvt = response['data_pvt']['header']['pdc_no'];
									// console.log(bank_it + ' - ' + bank_name_pvt);
									jumlahpdc = response['data_pvt']['header']['jumlah_pdc'];
									// console.log(jumlahpdc);
									$('#cash-bank-pvt').prop('checked', false);
									$('#pdc-pvt').prop('checked', true);
									$('#rdo-pdc').show();
									$('#rdo-cash-bank').hide();
									$('#inp-no-pdc-pvt').val(pdc_no_pvt);
									$('#inp-bank-pdc-pvt').val(bank_it + ' - ' + bank_name_pvt);
									$('#inp-bank-branch-pdc-pvt').val(response['data_pvt']['header']['bank_branch']);
									$('#inp-pdc-date-pvt').val(response['data_pvt']['header']['pdc_date']);
									$('#inp-pdc-due-date-pvt').val(response['data_pvt']['header']['pdc_due_date']);
									$('#inp-jumlah-pdc-pvt').val(accounting.formatMoney(jumlahpdc, '', 2, ',', '.'));
									$('#btn-save-pvt').prop('disabled', true);
									$('#btn-cancel-pvt').prop('disabled', true);
								}
								if (payment_status == '0' && role_code_dpc === 'SBMT_DPC') {
									$('#btn-save-pvt').prop('disabled', false);
									$('#btn-paid-pvt').prop('disabled', false);
									$('#btn-cancel-pvt').prop('disabled', false);
								} else if (payment_status == '3') {
									$('#btn-save-pvt').prop('disabled', true);
									$('#btn-paid-pvt').prop('disabled', true);
									$('#btn-cancel-pvt').prop('disabled', true);
									$('#btn-print-pvt').prop('disabled', false);
									alert_info('No PV telah di Paid');
								} else if (payment_status == '2') {
									$('#btn-save-pvt').prop('disabled', true);
									$('#btn-paid-pvt').prop('disabled', true);
									$('#btn-cancel-pvt').prop('disabled', true);
									alert_info('No PV telah di Cancel');
								} else {
									$('#btn-save-pvt').prop('disabled', true);
									$('#btn-paid-pvt').prop('disabled', true);
									$('#btn-cancel-pvt').prop('disabled', true);
								}
	        				});
							if (response['data_pvt']['detail'].length > 0) {
	        					// console.log('Ada Detail');
	        					// console.log(response['data_pvt']['detail']);
	        					table_pvt.clear().draw();      		
	        					table_pvt_nontrade.clear().draw();  
    							$('#tbl-pvt').parents('div.dataTables_wrapper').first().show();			
    							$('#tbl-pvt-nontrade').parents('div.dataTables_wrapper').first().hide();
								var branch = "";
								var branchcode = "";
								var branchname = "";
								var cabang = "";

								$.each(response['data_pvt']['detail'], function(index) {
									branch = this['branch'];
									// console.log(branch);
									contract_id = this['contract_id'];
									// console.log(contract_id);
									class_code = this['class_code'];
									// console.log(class_code);
									detail_amt = this['detail_amount'];
									// console.log(detail_amt);
									description = this['acct_desc'];
									// console.log(description);
									pc_code = this['pc_code'];
									// console.log(pc_code);
									inst_no = this['installment_no'];
									// console.log(inst_no);
									// console.log(response['data_pvt']['branch_name']);
									if (response['data_pvt']['branch_name'] != null) {
										// console.log("masuk sini");
										if (response['data_pvt']['branch_name'].length > 0) {
											// console.log("masuk sini");
											$.each(response['data_pvt']['branch_name'], function(index) {
												branchcode = this['branch_code'];
												branchname = this['branch_desc'];
												if (branchcode === branch) {
													cabang = branchname;
												}
											});
										}
									}								
					                table_pvt.row.add([
					                 	cabang,
					                 	class_code,
					                 	this['acct_brief_desc'],
					                 	description,
					                 	this['contract_no'],
					                 	accounting.formatMoney(detail_amt, '', 2, ',', '.'),
					                 	contract_id,
					                 	pc_code,
					                 	inst_no
					                ]).draw(false);	
					            });
	        				} else {
	        					alert_info(response['data_pvt']['detail']);
	        				}
        				} else {
        					// $('#lbl-register-no-pvt').show();
        					// $('#lbl-payment-to-pvt').hide();
        					$('#lbl-payment-to-pvt').html('Register No');
        					$.each(response['data_pvt']['header'], function(index) {
	        					// console.log(response['data_pvt']['header']);
	        					payment_id = response['data_pvt']['header']['payment_id'];
	        					// console.log(payment_id);
								if (response['data_pvt']['header']['pdc_id'] == 0) {
				                    pdc_id = '';
				                } else {
				                	pdc_id = response['data_pvt']['header']['pdc_id'];
				                }
				                // console.log(pdc_id);
								var payment_status = response['data_pvt']['header']['payment_status'];
								// console.log(payment_status);
								pay_tom = response['data_pvt']['header']['pay_to'];
								// console.log(pay_tom);
								bank_it = response['data_pvt']['header']['bank_id'];
								// console.log(bank_it);
								remark = response['data_pvt']['header']['remarks'];
								// console.log(remark);
								pv_date = response['data_pvt']['header']['paid_date'];
								// console.log(pv_date);
								doc_no = response['data_pvt']['header']['document_no'];
								// console.log(doc_no);
								total_amount = response['data_pvt']['header']['amount'];
								// console.log(total_amount);
								pembayaranke = response['data_pvt']['header']['payment_to'];
								// console.log(pembayaranke);
								cust_id = response['data_pvt']['header']['customer_id'];
								reg_no_pvt = response['data_pvt']['header']['reg_no'];
								$('#inp-doc-no-pvt').val(doc_no);
								if (pv_date != null) {
									$('#inp-pv-date').val(pv_date);
								} else {
									$('#inp-pv-date').val(today);
								}
								$('#inp-pay-to-pvt').val(pay_tom);
								$('#inp-total-pvt').val(accounting.formatMoney(total_amount, '', 2, ',', '.')); 
								$('#inp-payment-to-pvt').val(reg_no_pvt);
								pay_mode = response['data_pvt']['header']['pay_mod'];
								if (pay_mode == '1') {
									pay_mode = "CASH";
								} else {
									pay_mode = "PDC";
								}
								// console.log(pay_mode);
								bank_it = response['data_pvt']['header']['bank'];
								// console.log(bank_it);
								bank_accno = response['data_pvt']['header']['acc'];
								// console.log(bank_accno);
								if (pay_mode.includes('CASH')) {
									$('#cash-bank-pvt').prop('checked', true);
									$('#pdc-pvt').prop('checked', false);
									$('#rdo-pdc').hide();
									$('#rdo-cash-bank').show();
									if (bank_it != null) {
										$('#inp-bank-pvt').val(bank_it);
									} else {
										$('#inp-bank-pvt').val('001 - MUF ANGSURAN');
									}
									$('#inp-acc-pvt').val(bank_accno);
									$('#inp-remark-pvt').val(remark);
								}else{
									pdc_no_pvt = response['data_pvt']['header']['pdc_no'];
									jumlahpdc = response['data_pvt']['header']['jumlah_pdc'];
									$('#cash-bank-pvt').prop('checked', false);
									$('#pdc-pvt').prop('checked', true);
									$('#rdo-pdc').show();
									$('#rdo-cash-bank').hide();
									$('#inp-no-pdc-pvt').val(pdc_no_pvt);
									$('#inp-bank-pdc-pvt').val(response['data_pvt']['header']['bank_pdc']);
									$('#inp-bank-branch-pdc-pvt').val(response['data_pvt']['header']['bank_branch']);
									$('#inp-pdc-date-pvt').val(response['data_pvt']['header']['pdc_date']);
									$('#inp-pdc-due-date-pvt').val(response['data_pvt']['header']['pdc_due_date']);
									$('#inp-jumlah-pdc-pvt').val(accounting.formatMoney(jumlahpdc, '', 2, ',', '.'));
									$('#btn-save-pvt').prop('disabled', true);
									$('#btn-cancel-pvt').prop('disabled', true);
								}
								if (payment_status == '0' && role_code_dpc === 'SBMT_DPC') {
									$('#btn-save-pvt').prop('disabled', false);
									$('#btn-paid-pvt').prop('disabled', false);
									$('#btn-cancel-pvt').prop('disabled', false);
								} else if (payment_status == '3') {
									$('#btn-save-pvt').prop('disabled', true);
									$('#btn-paid-pvt').prop('disabled', true);
									$('#btn-cancel-pvt').prop('disabled', true);
									$('#btn-print-pvt').prop('disabled', false);
									alert_info('No PV telah di Paid');
								} else if (payment_status == '2') {
									$('#btn-save-pvt').prop('disabled', true);
									$('#btn-paid-pvt').prop('disabled', true);
									$('#btn-cancel-pvt').prop('disabled', true);
									alert_info('No PV telah di Cancel');
								} else {
									$('#btn-save-pvt').prop('disabled', true);
									$('#btn-paid-pvt').prop('disabled', true);
									$('#btn-cancel-pvt').prop('disabled', true);
								}
	        				});
							if (response['data_pvt']['detail'].length > 0) {
	        					// console.log('Ada Detail');
	        					// console.log(response['data_pvt']['detail']);	  
	        					table_pvt.clear().draw();      		
	        					table_pvt_nontrade.clear().draw();  			
    							$('#tbl-pvt-nontrade').parents('div.dataTables_wrapper').first().show();
    							$('#tbl-pvt').parents('div.dataTables_wrapper').first().hide();
								var branch = "";
								var branchcode = "";
								var branchname = "";
								var cabang = "";

								$.each(response['data_pvt']['detail'], function(index) {
									doc_no = this['document_no'];
									$('#inp-doc-no-pvt').val(doc_no);
									class_code = this['class_code'];
									// console.log(class_code);
									description = this['acct_desc'];
									// console.log(description);
									branch = this['branch'];
									// console.log(branch);
									// contract_id = this['contract_id'];
									// // console.log(contract_id);									
									detail_amt = this['detail_amount'];
									// console.log(detail_amt);
									pc_code = this['pc_code'];
									// console.log(pc_code);
									inst_no = this['installment_no'];
									// console.log(inst_no);							
					                table_pvt_nontrade.row.add([
					                 	class_code,
					                 	this['acct_brief_desc'],
					                 	description,
					                 	branch, 
					                 	this['bank_cabang'], 
					                 	pc_code, 
					                 	accounting.formatMoney(detail_amt, '', 2, ',', '.'),
					                 	contract_id,
					                 	pc_code,
					                 	inst_no
					                ]).draw(false);	
					            });
	        				} else {
	        					alert_info(response['data_pvt']['detail']);
	        				}
        				}       		        				
        			}
        		} catch(e){
					$('#loading-ajax').hide();
					console.log(e);
					alert_error("Terjadi Kesalahan Menampilkan Data Payment => " +e);
				}
        	}
        },
        error: function(response){
			console.log(response);
			alert_error(response['data']);
		}
    });
}
//End Function Untuk get data header Cash

//Function Untuk get data header PDC
function get_header_pdc_pvt_js() {
	$.each(role_dpc, function(i) {
		console.log(role_dpc[i]['role_code']);
		if (role_dpc[i]['role_code'] === 'SBMT_DPC') {
		    role_code_dpc = role_dpc[i]['role_code'];
		    console.log('submit')
		    $('#btn-save-pvt, #btn-paid-pvt, #btn-cancel-pvt').prop('disabled', false);
		    // $('#btn-tambah-dp-lain').show();
		    return false;
		   } else if (role_dpc[i]['role_code'] === 'VIEW_DPC') {
		       role_code_dpc = role_dpc[i]['role_code'];
		       console.log('view');
		       console.log(role_code_dpc);
		       $('#btn-save-pvt, #btn-paid-pvt, #btn-cancel-pvt').prop('disabled', true);
		       // $('#btn-tambah-dp-lain').hide();
		       return false;
		   }
	});
	if (localStorage.getItem("menu") == "load_pv_trade") {
		no_pv_pvt = localStorage.getItem("nomor_pv");
    	inp_branch_id = localStorage.getItem("branch_id");
    	// pay_mode = localStorage.getItem("payment_type");
    	no_pdc_pvt = no_pv_pvt;
    	// console.log(no_pdc_pvt);
    	$('#inp-no-pdc-pvt').val(no_pdc_pvt);   	
	} else {

	}	
	$.ajax({
		url: base_url+"Controller_payment_voucher_trade/get_data_pvt",
        type: 'POST',
        dataType: 'json',
        data: {
            "pdc_no" : no_pdc_pvt,
            "branch_id" : inp_branch_id
        },

        async :false,
    	success: function(response) {
    	console.log(response);
	    	if (response) {
	    		try {
	    			if (response['data_pvt']['status'] === false) {
	    				alert_error(response['data_pvt']['header']);
	    			} else {
	    				// console.log(response['data_pvt']['header']);
		    			// console.log(response['data_pvt']['bank_name']);
		    			// console.log(response['data_pvt']['empl_name']);
						$.each(response['data_pvt']['bank_name'], function(index) {
							bank_name_pvt = this['bankName'];
							// console.log(bank_name_pvt);
						}); 
						// doc_no = response['data_pvt']['doc_no'];
						// console.log(doc_no);
						// $('#inp-doc-no-pvt').val(doc_no);
						// payment_no = response['view_header_pdc_pvt']['pv_no'];
						// console.log(payment_no);
						// $('#inp-pv-no').val(payment_no);
						$.each(response['data_pvt']['header'], function(index) {
							pdc_id = response['data_pvt']['header']['pdc_id'];
							console.log(response['data_pvt']['header']['pdc_id']);
							pay_tom = response['data_pvt']['header']['pay_to'];
							pay_mode = response['data_pvt']['header']['pay_mod'];
							pembayaranke = response['data_pvt']['header']['payment_to'];
							bank_it = response['data_pvt']['header']['bank_id'];
							bank_branch	= response['data_pvt']['header']['bank_branch'];
							if (response['data_pvt']['header']['pdc_date'] != null) {
		                        var pdc_date = new Date(response['data_pvt']['header']['pdc_date']).format('dd-mmm-yyyy');
		                        $('#inp-pdc-date-pvt').val(pdc_date);
		                    } else {
		                        $('#inp-pdc-date-pvt').val();
		                    }
		                    if (response['data_pvt']['header']['pdc_due_date'] != null) {
		                        var pdc_due_date = new Date(response['data_pvt']['header']['pdc_due_date']).format('dd-mmm-yyyy');
		                        $('#inp-pdc-due-date-pvt').val(pdc_due_date);
		                    } else {
		                        $('#inp-pdc-due-date-pvt').val();
		                    }
							// pdc_due_date = response['data_pvt']['header']['pdc_due_date'];
							jumlahpdc = response['data_pvt']['header']['jumlah_pdc'];
							total_amount = response['data_pvt']['header']['amount'];
							cust_id = response['data_pvt']['header']['customer_id'];
							$('#inp-pay-to-pvt').val(pay_tom);
							$('#inp-payment-to-pvt').val(pembayaranke);
							$('#inp-bank-pdc-pvt').val(bank_it + ' - ' + bank_name_pvt);
							$('#inp-bank-branch-pdc-pvt').val(bank_branch);
							$('#inp-jumlah-pdc-pvt').val(accounting.formatMoney(jumlahpdc, '', 2, ',', '.'));
							$('#inp-total-pvt').val(accounting.formatMoney(total_amount, '', 2, ',', '.'));
							if (role_code_dpc === 'SBMT_DPC') {
								$('#btn-save-pvt').prop('disabled', false);
								$('#btn-cancel-pvt').prop('disabled', false);
								$('#btn-print-pvt').prop('disabled', false);

							} else {
								$('#btn-save-pvt').prop('disabled', true);
								$('#btn-cancel-pvt').prop('disabled', true);
								$('#btn-print-pvt').prop('disabled', true);
							}							
						});
						if(response['data_pvt']['detail'].length > 0) {
							// console.log('ada detail');
							// console.log(response['data_pvt']['detail']);
							table_pvt.clear().draw();
							var branch = "";
							var branchcode = "";
							var branchname = "";
							var cabang = "";

							$.each(response['data_pvt']['detail'], function(index) {
								branch = this['branch'];
								// console.log(branch);
								contract_id = this['contract_id'];
								// console.log(contract_id);
								class_code = this['class_code'];
								// console.log(class_code);
								detail_amt = this['detail_amount'];
								// console.log(detail_amt);
								description = this['acct_desc'];
								// console.log(description);
								pc_code = this['pc_code'];
								// console.log(pc_code);
								inst_no = this['installment_no'];
								// console.log(inst_no);
								// console.log(response['data_pvt']['branch_name']);
								$.each(response['data_pvt']['branch_name'], function(index) {
									branchcode = this['branch_code'];
									branchname = this['branch_desc'];
									if (branchcode === branch) {
										cabang = branchname;
									}
								});
					            table_pvt.row.add([
					            	cabang,
					            	class_code,
					            	this['acct_brief_desc'],
					            	description,
					            	this['contract_no'],
					            	accounting.formatMoney(detail_amt, '', 2, ',', '.'),
					            	contract_id,
					            	pc_code,
					            	inst_no
					            ]).draw(false);	
					        });
						} else {
							alert_info(response['data_pvt']['detail']);
						}
	    			}
	    		} catch(e){
					$('#loading-ajax').hide();
					console.log(e);
					alert_error("Terjadi Kesalahan Menampilkan Data PDC => " +e);
				}
	    	}
	    },
	    error: function(response){
			console.log(response);
			alert_error(response['data']);
		}	
	});
}
//End Function Untuk get data header PDC

//Function untuk Button Save
function save_master_pvt_js() {
	var payment_to = $('#inp-pay-to-pvt').val();
	var bankcode = '';
	if (pay_mode == "PDC") {
		bankcode = $('#inp-bank-pdc-pvt').val();
	} else {
		bankcode = $('#inp-bank-pvt').val();
	}
	var remarkk = $('#inp-remark-pvt').val();
	var paid_date = $('#inp-pv-date').val();
	var pdc_date = $('#inp-pdc-date-pvt').val();
	var total_amt = accounting.unformat($('#inp-total-pvt').val());
	var doc_nos = $('#inp-doc-no-pvt').val();
	// console.log(payment_to);
	$.ajax({
		url: base_url+"Controller_payment_voucher_trade/save_master_pvt",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id" : inp_branch_id,
			"payment_id" : payment_id,
			"pdc_id" : pdc_id,
			"pay_to" : payment_to,
			"m_dtclosing" : m_dtclosing,
			"payment_mode" : pay_mode,
			"bank_code" : bankcode,
			"remark" : remarkk,
			"jumlah_pdc" : jumlahpdc, 
			"paid_date" : paid_date, 
			"pdc_date" : pdc_date,
			"total_amt" : total_amt, 
			"document_no" : doc_nos   
        },

        success : function(response) {
        	doc_no = response['document_no'];
        	if (response) {
        		try {
        			if (response['status'] === false) {
        				alert_info(response['data']);
        			} else {
	        			alert_info(response['data']);
	        			$('#inp-doc-no-pvt').val(doc_no);
	        			$('#btn-save-pvt').prop('disabled', true);
						$('#btn-paid-pvt').prop('disabled', false);
						$('#btn-cancel-pvt').prop('disabled', false);
        			}
        		} catch(e){
					$('#loading-ajax').hide();
					console.log(e);
					alert_error("Terjadi Kesalahan Prosses Save => " +e);
				}
        	}
        },
        error: function(response){
			console.log(response);
			alert_error(response['data']);
		}
	});
}
//End Function untuk Button Save

//Function Untuk Button Paid
function paid_master_pvt_js() {
	var payment_to = $('#inp-pay-to-pvt').val();
	var pv_no = $('#inp-pv-no').val();
	var docu_no = $('#inp-doc-no-pvt').val();
	var pdc_no = $('#inp-no-pdc-pvt').val();
	var bankcode = '';
	if (pay_mode == "PDC") {
		bankcode = $('#inp-bank-pdc-pvt').val();
	} else {
		bankcode = $('#inp-bank-pvt').val();
	}
	var remarkk = $('#inp-remark-pvt').val();
	var bayar_ke = $('#inp-payment-to-pvt').val();
	var paid_date = $('#inp-pv-date').val();
	// console.log(bankcode);
	$.ajax({
		url: base_url+"Controller_payment_voucher_trade/paid_master_pvt",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id" : inp_branch_id,
			"payment_id" : payment_id,
			"payment_no" : pv_no,
			"pdc_id" : pdc_id,
			"document_no" : docu_no,
			"payment_mode" : pay_mode,
			"bank_code" : bankcode,
			"total_amt" : total_amount,
			"remarks" : remarkk,
			"pay_to" : payment_to,
            "pembayaranke" : pembayaranke, 
            "pdc_no" : pdc_no, 
            "paid_date" : paid_date,
            "jumlah_pdc" : jumlahpdc  
        },

        success : function(response) {
        	if (response) {
        		console.log(response);
        		try {
        			if (response['status'] === false) {
        				alert_info(response['data']);
        			} else {
	        			alert_info(response['data']);
	        			// console.log(response['data']);
	        			$('#inp-pv-no').val(response['payment_no']);
	        			$('#inp-doc-no-pvt').val(response['document_no']);
	        			$('#btn-save-pvt').prop('disabled', true);
						$('#btn-paid-pvt').prop('disabled', true);
						$('#btn-cancel-pvt').prop('disabled', true);
						$('#btn-print-pvt').prop('disabled', false);
        			}
        		} catch(e){
					$('#loading-ajax').hide();
					console.log(e);
					alert_error("Terjadi Kesalahan Prosses Paid => " +e);
				}
        	}
        },
        error: function(response){
			console.log(response);
			alert_error(response['data']);
		}
	});
}
//End Function Untuk Button Paid

//Function Untuk Button Cancel
function cancel_master_pvt_js() {
	var pv_no = $('#inp-pv-no').val();
	// console.log(inp_branch_id);
	// console.log(payment_id);
	// console.log(pdc_id);
	// console.log(contract_id);
	// console.log(class_code);
	// console.log(total_amount);
	// console.log(pembayaranke);
    $.ajax({
        url: base_url+"Controller_payment_voucher_trade/cancel_master_pvt",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id" : inp_branch_id,
			"payment_id" : payment_id,
			"payment_no" : pv_no,
            "pembayaranke" : pembayaranke      
        },

   		success: function(response) {
   		// console.log(response['notif']);
   		// console.log(response['status']);
			if (response) {
				try{
					// alert_info(response['data']);
					if (response['status'] === true) {
						alert_info(response['data'], function(){
                                $('html, body').animate({scrollBottom:600}, 'slow');
                                location.reload();
                                localStorage.clear();
                            });
						$('#btn-save-pvt').prop('disabled', true);
						$('#btn-paid-pvt').prop('disabled', true);
						$('#btn-cancel-pvt').prop('disabled', true);
					} else {
						alert_info(response['data']);
						$('#btn-save-pvt').prop('disabled', false);
						$('#btn-paid-pvt').prop('disabled', false);
						$('#btn-cancel-pvt').prop('disabled', false);
					}	
				} catch(e){
					$('#loading-ajax').hide();
					console.log(e);
					alert_error("Terjadi Kesalahan Prosses Cancel => " +e);
				}
			}
		},
		error: function(response){
			console.log(response);
			alert_error(response['data']);
		}
	});
}
//End Function Untuk Button Cancel

//Function Untuk Button Print
function print_pvt_js() {
	var pv_no = $('#inp-pv-no').val();
	var doc_no = $('#inp-doc-no-pvt').val();
	var pdc_no_ = $('#inp-no-pdc-pvt').val();
	var total_amt = $('#inp-total-pvt').val();
	var bank_ = '';
	if (pay_mode.includes('CASH')) {
		bank_ = $('#inp-bank-pvt').val();
	} else {
		bank_ = $('#inp-bank-pdc-pvt').val();
	}
	var bankacc_ = $('#inp-acc-pvt').val();
	var pdc_date_ = $('#inp-pdc-date-pvt').val();
	var pdcdue_date_ = $('#inp-pdc-due-date-pvt').val();
	var payment_date_ = $('#inp-pv-date').val();
	var pay_to_ = $('#inp-pay-to-pvt').val();
	// console.log(pdc_id);
	// console.log(pay_mode);
	// console.log(total_amount);
	$.ajax({
		url: base_url+"Controller_payment_voucher_trade/print_pvt",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id" : inp_branch_id,
			"payment_id" : payment_id,
			"payment_no" : pv_no,
			"document_no" : doc_no,
			"pdc_id" : pdc_id,
			"pdc_no" : pdc_no_,
            "pembayaranke" : pay_to_,
            "total_amt" : total_amount,
            "payment_mode" : pay_mode,
            "bank" : bank_,
            "bankacc" : bankacc_,
            "pdc_date" : pdc_date_,
            "pdcdue_date" : pdcdue_date_,
            "payment_date" : payment_date_
        },		

        success: function(response) {
        	if (response) {
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
		error: function(response){
			console.log(response);
			alert_error(response['data']);
		}
	});
}

function print_pvt_js_pdf() {
	var pv_no = $('#inp-pv-no').val();
	var doc_no = $('#inp-doc-no-pvt').val();
	var pdc_no_ = $('#inp-no-pdc-pvt').val();
	var total_amt = $('#inp-total-pvt').val();
	var bank_ = '';
	if (pay_mode.includes('CASH')) {
		bank_ = $('#inp-bank-pvt').val();
	} else {
		bank_ = $('#inp-bank-pdc-pvt').val();
	}
	var bankacc_ = $('#inp-acc-pvt').val();
	var pdc_date_ = $('#inp-pdc-date-pvt').val();
	var pdcdue_date_ = $('#inp-pdc-due-date-pvt').val();
	var payment_date_ = $('#inp-pv-date').val();
	var pay_to_ = $('#inp-pay-to-pvt').val();
	// console.log(pdc_id);
	// console.log(pay_mode);
	// console.log(total_amount);
	$.ajax({
		url: base_url+"Controller_payment_voucher_trade/print_pvt_pdf",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id" : inp_branch_id,
			"payment_id" : payment_id,
			"payment_no" : pv_no,
			"document_no" : doc_no,
			"pdc_id" : pdc_id,
			"pdc_no" : pdc_no_,
            "pembayaranke" : pay_to_,
            "total_amt" : total_amount,
            "payment_mode" : pay_mode,
            "bank" : bank_,
            "bankacc" : bankacc_,
            "pdc_date" : pdc_date_,
            "pdcdue_date" : pdcdue_date_,
            "payment_date" : payment_date_
        },		

        success: function(response) {
        	if (response) {
        		console.log(response);
        		try {
                    var data = JSON.stringify(response);
                    console.log(response['data']['bank']);
                    if (response['status']) {
                    	$('#inp-print-pvt-pdf').val(data);
	                    var ab = $('#inp-print-pvt-pdf').val();
	                    $("#frm-print-pvt-pdf" ).submit();
	                    console.log(ab);
	                    //$('#frm-print-dp-lain').submit();                    
                    }else{
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
		error: function(response){
			console.log(response);
			alert_error(response['data']);
		}
	});
}
//End Funtion Untuk Button Print

//---------------------------------End Function-------------------------------------------\\


//---------------------------------On Click----------------------------------------------------\\

//Function untuk Pilih No PV
$('#tbl-search-no-pv-pvt').on( 'click', 'tr', function () {
	if ( $(this).hasClass('selected') ) {
	    $(this).removeClass('selected');
	    pilih_nopv = '';
	} else {
	    table_search_no_pv_pvt.$('tr.selected').removeClass('selected');
	    $(this).addClass('selected');
	    pilih_nopv = table_search_no_pv_pvt.row( this ).data();
	    // console.log(pilih_nopv);
	}
});

$('#tbl-search-no-pv-pvt').on( 'dblclick', 'tr', function () {
	$('#modal-no-pv-pvt').modal('hide');
	$('.modal-backdrop').css('display', 'none');
	pilih_nopv = table_search_no_pv_pvt.row( this ).data();
	no_pv_pvt = pilih_nopv[0];
	// console.log(no_pv_pvt);
	$('#inp-pv-no').val(no_pv_pvt);
	// get_view_header_pvt_js();
	get_header_cash_pvt_js(); //masih dicoba
	// console.log(bank_it);
	// console.log(pay_tom);
	// get_view_detail_pvt_js();
});
//End Function untuk Pilih No PV

//Function untuk pilih No PDC
$('#tbl-search-nopdc-pvt').on( 'click', 'tr', function () {
  	if ( $(this).hasClass('selected') ) {
    	$(this).removeClass('selected');
    	pilih_nopdc = '';
  	} else {
	    table_search_nopdc_pvt.$('tr.selected').removeClass('selected');
	    $(this).addClass('selected');
	    pilih_nopdc = table_search_nopdc_pvt.row( this ).data();
	    console.log(pilih_nopdc);
  	}
});

$('#tbl-search-nopdc-pvt').on( 'dblclick', 'tr', function () {
	$('#modal-nopdc-pvt').modal('hide');
	$('.modal-backdrop').css('display', 'none');
	pilih_nopdc = table_search_nopdc_pvt.row( this ).data();
	no_pdc_pvt = pilih_nopdc[0];
	// console.log(no_pdc_pvt);
	$('#inp-no-pdc-pvt').val(no_pdc_pvt);
	get_header_pdc_pvt_js();//get_view_header_pdc_pvt_js();
	// console.log(bank_it);
	// console.log(pay_tom);
	// get_view_detail_pvt_js();
});
//End Function untuk pilih No PDC

//Function untuk Pilih Bank
$('#tbl-search-bank-pvt').on( 'click', 'tr', function () {
	if ( $(this).hasClass('selected') ) {
	    $(this).removeClass('selected');
	    pilih_bank_pvt = '';
	} else {
	    table_search_bank_pvt.$('tr.selected').removeClass('selected');
	    $(this).addClass('selected');
	    pilih_bank_pvt = table_search_bank_pvt.row( this ).data();
	    // console.log(pilih_bank_pvt);
	}
});

$('#tbl-search-bank-pvt').on( 'dblclick', 'tr', function () {
	$('#modal-bank-pvt').modal('hide');
	$('.modal-backdrop').css('display', 'none');
	pilih_bank_pvt = table_search_bank_pvt.row( this ).data();
	bank_pvt = pilih_bank_pvt[0];
	// console.log(bank_pvt);
	$('#inp-bank-pvt').val(bank_pvt);
});
//End Function untuk Pilih Bank

//---------------------------------End On Click----------------------------------------------------\\