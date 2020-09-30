
var list_class_code_dphonsb = [];
var list_bank_dphonsb = [];
var list_bank_pengirim_dphonsb = [];
var list_area_dphonsb = [];
var list_error_search_dphonsb = [];
var list_error_save_dphonsb = []
var list_branch_child_dphonsb ;
var arr_cont_amount = [];
var text_file_finance;var pv_no_dphonsb;
var table_dpho_nsb = $('#tbl-display-dpho-nsb').DataTable({
	responsive: true,
});

Number.prototype.padLeft = function(base,chr){
	var  len = (String(base || 10).length - String(this).length)+1;
	return len > 0? new Array(len).join(chr || '0')+this : this;
}


$('#inp-tgl-awal-fpd-dpho-nsb, #inp-tgl-akhir-fpd-dpho-nsb').datetimepicker({
	format: 'DD-MMM-YYYY',
	allowInputToggle: true,
	maxDate : 'now'
});

function get_class_code_dphonsb(){
	$.ajax({
		url: "Controller_draft_payment_ho_nasabah/get_classcode_dphonsb",
		type: 'GET',
		timeout: 10000,
		dataType: 'json',
		success: function(response){
			console.log(response['Data']);
			if(response['Data']) {
				try {
					console.log("ajax response success"); 
					var list_result = response['Data'];

					$.each(list_result, function(){
						list_class_code_dphonsb.push([this['class_code'], this['class_code_desc']]);

					});
					for (var j = 0; j < list_class_code_dphonsb.length; ++j) {
						var item = list_class_code_dphonsb[j];
						$('#slc-dpho-nsb-class-code').append($('<option/>', { 
							value: item[0],
							text : item[0] +' - '+ item[1] 
						}));
					}
					console.log(list_class_code_dphonsb);
				} catch(e) {
					$('#loading-ajax').hide();
					console.log(response);
					console.log(e);
					alert_error(response);
				}
			} else {
				console.log(response)
				alert_error(response['ErrorMessage']);
				$('#loading-ajax').hide();
			}
		},
		error: function(response){
			console.log(response);
			if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
				alert_error('Koneksi ke server gagal, silahkan coba lagi!')
			} else {
				alert_error('Terjadi kesalahan saat mencari list data class code!');
			}
			
		}
	});
};

function get_bank_dphonsb(){
	list_bank_dphonsb.push(['All', 'Semua Bank']);
	$.ajax({
		url: "Controller_draft_payment_ho_nasabah/get_bank_dphonsb",
		type: 'POST',
		timeout: 10000,
		dataType: 'json',
		data:{
			branch_code : $('#hdn-dpho-branch-code').val()
		},
		success: function(response){
			console.log(response);
			if(response['status'] == true) {
				try {
					console.log("ajax response success"); 
					var list_result = response['data'];

					$.each(list_result, function(){
						list_bank_dphonsb.push([this['bankCode'], this['bankName']]);

					});
					for (var j = 0; j < list_bank_dphonsb.length; ++j) {
						var item = list_bank_dphonsb[j];
						$('#slc-dpho-nsb-bank').append($('<option/>', { 
							value: item[0],
							text : item[0] +' - '+ item[1] 
						}));
					}
					console.log(list_bank_dphonsb);
				} catch(e) {
					$('#loading-ajax').hide();
					console.log(response);
					console.log(e);
					alert_error(response['data']);
				}
			} else {
				console.log(response)
				alert_error('Terjadi kesalahan saat mencari list data bank nasabah! ');
			}
		},
		error: function(response){
			console.log(response);
			if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
				alert_error('Koneksi ke server gagal, silahkan coba lagi!')
			} else {
				alert_error('Terjadi kesalahan saat mencari list data bank nasabah!');
			}
		}
	});
};



function get_bank_pengirim_dphonsb(){
	$.ajax({
		url: "Controller_draft_payment_ho_nasabah/get_bank_pengirim_dphonsb",
		type: 'POST',
		timeout: 10000,
		dataType: 'json',
		success: function(response){
			console.log(response['data']);
			if(response['data']) {
				try {
					console.log("ajax response success"); 
					var list_result = response['data'];

					$.each(list_result, function(){
						list_bank_pengirim_dphonsb.push([this['bankCode'], this['bankName']]);

					});
					for (var j = 0; j < list_bank_pengirim_dphonsb.length; ++j) {
						var item = list_bank_pengirim_dphonsb[j];
						$('#slc-dpho-nsb-bank-pengirim').append($('<option/>', { 
							value: item[0],
							text : item[0] +' - '+ item[1] 
						}));
					}
					console.log(list_bank_pengirim_dphonsb);
				} catch(e) {
					$('#loading-ajax').hide();
					console.log(response);
					console.log(e);
					alert_error(e);
				}
			} else {
				console.log(response)
				alert_error(response['ErrorMessage']);
			}
		},
		error: function(response){
			console.log(response);
			if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
				alert_error('Koneksi ke server gagal, silahkan coba lagi!')
			} else {
				alert_error('Terjadi kesalahan saat mencari list data bank pengirim!');
			}
		}
	});
};

function js_dphonsb(){
	//get_text_file_dphonsb('B-AL.HD.MG', '000018P000424', '0000');
	//get_text_export_dphonsb('B-AL.HD.MG', '000018P000425');
	clear_dphonsb();	localStorage.setItem('menu','dpho_nasabah');
	list_class_code_dphonsb = [];
	list_bank_dphonsb = [];
	list_bank_pengirim_dphonsb = [];
	list_area_dphonsb = [];
	$('#slc-dpho-nsb-class-code').empty().append("<option value='0' selected='true' disabled='disabled'>Silahkan pilih class code</option>");
	$('#slc-dpho-nsb-area').empty().append('<option value="0" selected="true" disabled="disabled">Silahkan pilih area</option>');
	$('#slc-dpho-nsb-bank').empty().append('<option value="0" selected="true" disabled="disabled">Silahkan pilih bank</option>');
	$('#slc-dpho-nsb-bank-pengirim').empty().append('<option value="0" selected="true" disabled="disabled">Silahkan pilih bank pengirim</option>');
	table_dpho_nsb.clear().draw();
	get_class_code_dphonsb();
	get_bank_dphonsb();
	get_area_dphonsb('#slc-dpho-nsb-area');
	get_bank_pengirim_dphonsb();
	$("#btn-display-dpho-nsb").prop('disabled', false);
	$('#inp-dpho-nsb-pv-no').val('');
	$('#inp-tgl-awal-fpd-dpho-nsb').val('');
	$('#inp-tgl-akhir-fpd-dpho-nsb').val('');
	get_branch_list('All');
	$('#slc-dpho-nsb-bank').val('All');

};

$('#btn-display-dpho-nsb').click(function(){
	if ($('#hdn-dpho-branch-code').val() !== '0000') {
		alert_error('Mohon login sebagai HO untuk menggunakan menu ini!');
	}
	else {
		var alert_search_dphonsb = [];
		list_error_search_dphonsb = [];
		var start_date_dphonsb = moment($('#inp-tgl-awal-fpd-dpho-nsb').val());
		var end_date_dphonsb = moment($('#inp-tgl-akhir-fpd-dpho-nsb').val());
	//if ($('#inp-dpho-nsb-pv-no').val() === '') {
		if ($('#slc-dpho-nsb-class-code').val() === null) {
			list_error_search_dphonsb.push('Class Code belum dipilih!')
		}
		if ($('#slc-dpho-nsb-bank').val() === null) {
			list_error_search_dphonsb.push('Bank belum dipilih!');
		}
		if ($('#slc-dpho-nsb-area').val() === null) {
			list_error_search_dphonsb.push('Area belum dipilih!');
		}
		if ($('#inp-tgl-awal-fpd-dpho-nsb').val() === '' || $('#inp-tgl-akhir-fpd-dpho-nsb').val() === '') {
			list_error_search_dphonsb.push('Mohon isi tanggal awal dan akhir FPD!');
		}
		if (start_date_dphonsb > end_date_dphonsb) {
			list_error_search_dphonsb.push('Tanggal awal tidak boleh lebih besar dari tanggal akhir');
		}
		if (list_error_search_dphonsb.length > 0 ){ 
			$('html, body').animate({scrollTop:0}, 'slow');
			for(i=0; i<list_error_search_dphonsb.length; ++i){
				alert_search_dphonsb += '<div style="float: left">' + list_error_search_dphonsb[i] + '</div></br>';
			}
			console.log(list_error_search_dphonsb);
			console.log(alert_search_dphonsb);
			alert_error(alert_search_dphonsb); 
		} 
		else {
			search_by_fpd_date_2();
		}
/*	} else
	{
		if ($('#slc-dpho-nsb-class-code').val() === null) {
			alert_error('Class Code belum dipilih!' );
		} else {
			search_by_pv_no();
		}
	}*/
}
});

$('#check-all-dphonsb').click(function(){
	var pages_dphonsb = table_dpho_nsb.page();
	var table_length_dphonsb = table_dpho_nsb.rows().data().length;
	var limits_dphonsb = table_dpho_nsb.page.len();
	var search_dphonsb  = table_dpho_nsb.search();
/*	if (this.checked) {
		//alert($('input.check-dphonsb:checked').length);
		table_dpho_nsb.search("");
		table_dpho_nsb.page.len(table_length_dphonsb);
		table_dpho_nsb.draw();
		for (var i =0; i < $('.check-dphonsb').length; i++)
		{
			$('#check-dphonsb-' + i).click();
		}
		table_dpho_nsb.page.len(limits_dphonsb);
		table_dpho_nsb.draw();
		table_dpho_nsb.page(pages_dphonsb).draw('page');
		table_dpho_nsb.search(search_dphonsb);
	} else { 
		alert('kondisi 2');
	}*/

	table_dpho_nsb.search("");
	table_dpho_nsb.page.len(table_length_dphonsb);
	table_dpho_nsb.draw();
	for (var i =0; i < $('.check-dphonsb').length; i++)
	{
		$('#check-dphonsb-' + i).click();
	}
	table_dpho_nsb.page.len(limits_dphonsb);
	table_dpho_nsb.draw();
	table_dpho_nsb.page(pages_dphonsb).draw('page');
	table_dpho_nsb.search(search_dphonsb);

});

$('#tbl-display-dpho-nsb').on( 'click', '.check-dphonsb', function () {
	var total_amount_dphonsb ;
	var checked_row_dphonsb = table_dpho_nsb.row( $(this).parents('tr') ).data();
	var cont_id = checked_row_dphonsb[10];
	var contract_no_checked = checked_row_dphonsb[2];
	detail_amount = accounting.unformat(checked_row_dphonsb[8]);
	if (this.checked) {
		arr_cont_amount.push({cont_id,contract_no_checked,detail_amount});
		console.log(arr_cont_amount);
		total_amount_dphonsb = 0;
	} else {
		for (var i =0; i < arr_cont_amount.length; i++)
			if (arr_cont_amount[i].cont_id === cont_id) {
				arr_cont_amount.splice(i,1);
			}
			console.log(arr_cont_amount);
			total_amount_dphonsb = 0;
		}

		for (var tcount = 0; tcount < arr_cont_amount.length; tcount++) {
			total_amount_dphonsb += arr_cont_amount[tcount].detail_amount << 0;
		} 
		$('#inp-total-amount-dpho-nsb').val(accounting.formatMoney(total_amount_dphonsb, '', 2, ',', '.'));
	});

$('#slc-dpho-nsb-area').change(function(){
	get_branch_list($('#slc-dpho-nsb-area').val());
});

function get_branch_list(branch_area){
	//var branch_area_dphonsb = $('#slc-dpho-nsb-area').val();
	list_branch_child_dphonsb = '';
	if (branch_area === 'All') {
		list_branch_child_dphonsb = 'All'
	}
	else {
		$.ajax({
			url: "Controller_draft_payment_ho_nasabah/get_list_branch_child2",
			type: 'POST',
			timeput : 10000,
			dataType: 'json',
			data:{
				branch_parent : branch_area,
			},

			success: function(response){
				console.log("ajax response success"); 
				if (response)
					console.log(response);
				{
					try {
						list_branch_child_dphonsb = response;
					} catch(e) {
						$('#loading-ajax').hide();
						console.log(response);
						console.log(e);
						alert_error(e);
					}
				}
			},
			error: function(response){
				console.log(response); 
				if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
					alert_error('Koneksi ke server gagal, silahkan coba lagi!')
				} else {
					alert_error(response);
				}
			}
		});
		
	}
	console.log(list_branch_child_dphonsb);
};

function search_by_fpd_date(){
	arr_cont_amount = [];
	$('#inp-dpho-nsb-pv-no').val('');
	$('#slc-dpho-nsb-bank-pengirim').val(0);
	$('#inp-total-amount-dpho-nsb').val(0);
	$('#tbl-display-dpho-nsb').DataTable().search("").draw();

	$.ajax({
		url: "Controller_draft_payment_ho_nasabah/get_search_by_fpd_date",
		type: 'POST',
		timeput : 10000,
		dataType: 'json',
		data:{
			class_code : $('#slc-dpho-nsb-class-code').val(),
			fpd_start : $('#inp-tgl-awal-fpd-dpho-nsb').val(),
			fpd_end : $('#inp-tgl-akhir-fpd-dpho-nsb').val(),
			branch_code : list_branch_child_dphonsb,
			bank_id : $('#slc-dpho-nsb-bank').val(),
		},

		success: function(response){
			console.log("ajax response success"); 
			console.log(response);
			if (response['getsearch1']['Data'])
			{
				try {
					if (response['getsearch1']['Data'].length == 0) {
						alert_error('Data tidak ditemukan');
						table_dpho_nsb.clear().draw();
					} else {
						$("#btn-save-dpho-nsb").prop('disabled', false);
						$('#slc-dpho-nsb-bank-pengirim').prop("disabled", false);
						var deal_name = '';
						var deal_code = '';
						var deal_name_result = ''; 
						var branch_name = '';
						var branch_code = '';
						var branch_name_result = '';                     
						table_dpho_nsb.clear().draw();
						$( "#check-all-dphonsb" ).prop( "disabled", false );
						$.each(response['getsearch1']['Data'], function(index) {
							deal_code_search1 = this['dealer_code'];
							branch_code_search1 = this['branch_code'];
							$.each(response['deal_name']['data'], function(index) {
								deal_code = this['dealercode'];
								deal_name = this['dealername'];
								if (deal_code === deal_code_search1) {
									deal_name_result = deal_name;
								}
							});

							$.each(response['branch_name']['data'], function(index) {
								branch_code = this['branch_code'];
								branch_name = this['branch_desc'];
								if (branch_code === branch_code_search1) {
									branch_name_result = branch_name;
								}
							});

							table_dpho_nsb.row.add([
								'<input type="checkbox" id= "check-dphonsb-' + index + '" class="check-dphonsb" >',
								branch_name_result,
								this['contract_no'],
								this['cust_name'],
								this['dealer_code'],
								deal_name_result,
								this['fpd_no'],
								this['cust_bank'] + ' - ' + this['cust_bank_name'],
								accounting.formatMoney(this['amount'], '', 2, ',', '.'),
								this['pv_no'],
								this['contract_id'],
								]).draw(false);
						});
						$('#slc-dpho-nsb-bank-pengirim').prop('disabled', false);
					}	
				} catch(e) {
					$('#loading-ajax').hide();
					console.log(response);
					console.log(e);
					alert_error(e);
				}
			}
		},
		error: function(response){
			console.log(response); 
			if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
				alert_error('Koneksi ke server gagal, silahkan coba lagi!')
			} else {
				alert_error(response);
			}
		}
	});
};

$("#btn-save-dpho-nsb").click(function(){ 
	var list_saved_data = '';
	var alert_save_dphonsb = [];
	list_error_save_dphonsb = [];
	if ($('#slc-dpho-nsb-class-code').val() === null) {
		list_error_save_dphonsb.push('Class Code belum dipilih!')
	}
	if ($('#slc-dpho-nsb-bank').val() === null) {
		list_error_save_dphonsb.push('Bank belum dipilih!');
	}
	if ($('#slc-dpho-nsb-area').val() === null) {
		list_error_save_dphonsb.push('Area belum dipilih!');
	}
	if ($('#inp-tgl-awal-fpd-dpho-nsb').val() === '' || $('#inp-tgl-akhir-fpd-dpho-nsb').val() === '') {
		list_error_save_dphonsb.push('Mohon isi tanggal awal dan akhir FPD!');
	}
	if ($('#slc-dpho-nsb-bank-pengirim').val() === null) {
		$('html, body').animate({scrollTop:300}, 'slow');
		list_error_save_dphonsb.push('Bank pengirim belum dipilih!');
	}

	if(!$('.check-dphonsb').is(':checked'))
	{ 

		$('html, body').animate({scrollTop:300}, 'slow');
		return alert_error("Belum ada data yang dipilih");
	} else {

		if ($('#inp-total-amount-dpho-nsb').val() < 1) {
			$('html, body').animate({scrollTop:300}, 'slow');
			return alert_error('Total amount harus lebih besar dari nol !');
		}
	}
	if (list_error_save_dphonsb.length > 0 ){ 
		//$('html, body').animate({scrollTop:0}, 'slow');
		for(i=0; i<list_error_save_dphonsb.length; ++i){
			alert_save_dphonsb += '<div style="float: left">' + list_error_save_dphonsb[i] + '</div></br>';
		}
		console.log(list_error_save_dphonsb);
		console.log(alert_save_dphonsb);
		return alert_error(alert_save_dphonsb); 
	} 

	for(i=0; i<arr_cont_amount.length; i++){
		console.log(arr_cont_amount[i].detail_amount + ' - ' + arr_cont_amount[i].contract_no_checked);	
		list_saved_data += '<div style="float: left">No Kontrak : ' + arr_cont_amount[i].contract_no_checked + ' <br> Jumlah : ' + arr_cont_amount[i].detail_amount+ '</div></br><br>';
	}

	//alert_confirm("Berikut adalah kontrak yang akan di simpan: <br><br>" + list_saved_data +  '<br>' + "Apakah anda yakin ingin melanjutkan proses?", function(){
		alert_confirm("Apakah anda yakin ingin melanjutkan proses?", function(){
			
			$.ajax({
				url: "Controller_draft_payment_ho_nasabah/save_dphonsb",
				type: 'POST',
				timeput : 10000,
				dataType: 'json',
				data:{
					class_code : $('#slc-dpho-nsb-class-code').val(),
					branch_code : $('#hdn-dpho-branch-code').val(),
					bank_pengirim : $('#slc-dpho-nsb-bank-pengirim').val(),
					total_amount : accounting.unformat($('#inp-total-amount-dpho-nsb').val()),
					detail_selected : arr_cont_amount
				},

				success: function(response){
					console.log("ajax response success"); 
					if (response)
					{
						pv_no_dphonsb = '';
						console.log(response); 
						try {
							if (response['Result'] == false) {
								alert_error(response['Status']);
							} else {
								alert_info(response['Success']);
								pv_no_dphonsb = response['Nomor_pv'];
								$('#inp-dpho-nsb-pv-no').val(pv_no_dphonsb);
								arr_cont_amount = [];
								$('#inp-total-amount-dpho-nsb').val(0);
								$('#tbl-display-dpho-nsb').DataTable().search("").draw();
								search_by_pv_no_2();
							}	
						} catch(e) {
							$('#loading-ajax').hide();
							console.log(response);
							console.log(e);
							alert_error(e);
						}
					}
				},
				error: function(response){
					console.log(response); 
					if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
						alert_error('Koneksi ke server gagal, silahkan coba lagi!')
					} else {
						alert_error(response);
					}
				}
			});
		});

	});

$("#btn-cancel-pv-dpho-nsb").click(function(){ 
	if ($('#slc-dpho-nsb-class-code').val() === null) {
		alert_error('Class Code belum dipilih!');
	} else if ($('#inp-dpho-nsb-pv-no').val() == '' || $('#inp-dpho-nsb-pv-no').val() == null) {
		alert_error('Nomor PV belum dipilih!');
	} else {
		alert_confirm("Apakah anda yakin ingin mencancel no pv " + $('#inp-dpho-nsb-pv-no').val() + " ?" , function(){
			$.ajax({
				url: "Controller_draft_payment_ho_nasabah/cancel_dphonsb",
				type: 'POST',
				timeput : 10000,
				dataType: 'json',
				data:{
					pv_no : $('#inp-dpho-nsb-pv-no').val(),
					branch_code : $('#hdn-dpho-branch-code').val(),
				},

				success: function(response){
					console.log("ajax response success"); 
					if (response)
					{
						try {
							if (response['Status'] == 500) {
								alert_error(response['ErrorMessage']);
							} else {
								alert_info(response['Data']);
								$('#inp-dpho-nsb-pv-no').val('');
								arr_cont_amount = [];
								$('#inp-total-amount-dpho-nsb').val(0);
								$('#btn-display-dpho-nsb').prop('disabled', false);
							}	
						} catch(e) {
							$('#loading-ajax').hide();
							console.log(response);
							console.log(e);
							alert_error(e);
						}
					}
				},
				error: function(response){
					console.log(response); 
					if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
						alert_error('Koneksi ke server gagal, silahkan coba lagi!')
					} else {
						alert_error(response);
					}
				}
			});
		});
		table_dpho_nsb.search("").clear().draw();
	}
});

$("#btn-confirm-pv-dpho-nsb").click(function(){ 
	if ($('#slc-dpho-nsb-class-code').val() === null) {
		alert_error('Class Code belum dipilih!');
	} else if ($('#inp-dpho-nsb-pv-no').val() == '' || $('#inp-dpho-nsb-pv-no').val() == null) {
		alert_error('Nomor PV belum dipilih!');
	} else if ($('#inp-total-amount-dpho-nsb').val() == '' || $('#inp-total-amount-dpho-nsb').val() == null) {
		alert_error('Total amount harus lebih besar dari nol!');
	} 
	else { 
		confirm_dphonsb();
	}
});

function confirm_dphonsb() {
	var text_file_finance = '';	var pv_no_confirm = $('#inp-dpho-nsb-pv-no').val();
	var class_code_confirm = $('#slc-dpho-nsb-class-code').val();
	var branch_code_confirm =  $('#hdn-dpho-branch-code').val();

	alert_confirm("Apakah anda yakin ingin menconfirm no pv " + $('#inp-dpho-nsb-pv-no').val() + " ?" , function(){
		$.ajax({
			url: base_url + "Controller_draft_payment_ho_nasabah/confirm_dphonsb",
			type: 'POST',
			dataType: 'json',
			data: {
				"p_pv_no": $('#inp-dpho-nsb-pv-no').val(),
				"p_class_code": $('#slc-dpho-nsb-class-code').val(),
			},

			success: function(response) {
				console.log(response);
				console.log(response['success']);
				if (response) {
					try {
						var status_save = response['Status'];
                    //var notif = response['notif'];
                    var result = response['result'];
                    console.log(status_save);
                    if (result === false) {
                    	console.log('gagal confirm dphonsb');
                    	alert_error(status_save);
                    } else {
                    	console.log('berhasil confirm dphonsb');
                    	alert_info(response['success'], function(){
                    		get_text_file_dphonsb(class_code_confirm, pv_no_confirm, branch_code_confirm);	
                    		table_dpho_nsb.clear().draw();
                    		clear_dphonsb();
                    	});
                    	

                    }
                } catch (e) {
                	$('#loading-ajax').hide();
                	console.log(e);
                	alert_error("Terjadi Kesalahan Pada Proses Confirm PV");
                }
            }
        },
        error: function(response) {
        	console.log(response);
        	alert_error(response);
        }
    });
	});
}



function rollback_dphonsb(pv_no, class_code) {
	$.ajax({
		url: base_url + "Controller_draft_payment_ho_nasabah/rollback_dphonsb",
		type: 'POST',
		dataType: 'json',
		data: {
			"p_pv_no": pv_no,
			"p_class_code": class_code,
		},

		success: function(response) {
			console.log(response);
			console.log(response['success']);
			if (response) {
				try {
					var status_save = response['status'];
					var result = response['result'];
					console.log(status_save);
					if (result === false) {
						console.log('gagal rollback dphonsb');
						alert_error(status_save);
					} else {
						console.log('berhasil rollback dphonsb');
						
					}
				} catch (e) {
					$('#loading-ajax').hide();
					console.log(e);
					alert_error("Terjadi Kesalahan Pada Proses Rollback PV");
				}
			}
		},
		error: function(response) {
			console.log(response);
			alert_error(response);
		}
	});
}


function export_dphonsb(pv_no, class_code) {
	$.ajax({
		url: base_url + "Controller_draft_payment_ho_nasabah/export_dphonsb",
		type: 'POST',
		dataType: 'json',
		data: {
			"p_pv_no": pv_no,
			"p_class_code": class_code,
		},

		success: function(response) {
			console.log(response);
			console.log(response['success']);
			if (response) {
				try {
					var status_save = response['Status'];
                    //var notif = response['notif'];
                    var result = response['result'];
                    console.log(status_save);
                    if (result === false) {
                    	console.log('gagal export dphonsb');
                    	rollback_dphonsb(pv_no,class_code);
                    	alert_info('Terjadi kesalaah saat proses export, silahkan melakukan confirm kembali!');
                    } else {
                    	console.log('berhasil export dphonsb');
                    	alert_info('Proses konfirmasi PV berhasil', function(){	
                    		table_dpho_nsb.clear().draw();
                    		clear_dphonsb();
                    	});
                    }
                } catch (e) {
                	$('#loading-ajax').hide();
                	console.log(e);
                	alert_error("Terjadi Kesalahan Pada Proses Confirm PV");
                }
            }
        },
        error: function(response) {
        	console.log(response);
        	alert_error(response);
        }
    });
}
function search_by_pv_no(){
	arr_cont_amount = [];
	$('#inp-tgl-awal-fpd-dpho-nsb').val('');
	$('#inp-tgl-akhir-fpd-dpho-nsb').val('');
	$('#slc-dpho-nsb-area').val(0);
	$('#slc-dpho-nsb-bank').val(0);
	$('#inp-total-amount-dpho-nsb').val(0);
	$('#tbl-display-dpho-nsb').DataTable().search("").draw();

	$.ajax({
		url: "Controller_draft_payment_ho_nasabah/get_search_by_pv_no",
		type: 'POST',
		timeput : 10000,
		dataType: 'json',
		data:{
			class_code : $('#slc-dpho-nsb-class-code').val(),
			pv_no : $('#inp-dpho-nsb-pv-no').val(),
			branch_code : $('#hdn-dpho-branch-code').val()
		},

		success: function(response){
			console.log("ajax response success"); 
			console.log(response);
			if (response['getsearch2']['Status'] == 200)	
			{
				try {
					if (response['getsearch2']['Data'].length == 0) {
						alert_error('Data tidak ditemukan');
						table_dpho_nsb.clear().draw();
					} else {
						$("#btn-display-dpho-nsb").prop('disabled', true);
						$("#btn-save-dpho-nsb").prop('disabled', false);
						var deal_name = '';
						var deal_code = '';
						var deal_name_result = ''; 
						var branch_name = '';
						var branch_code = '';
						var branch_name_result = '';                     
						table_dpho_nsb.clear().draw();
						$( "#check-all-dphonsb" ).prop( "disabled", true );
						$.each(response['getsearch2']['Data'], function(index) {
							deal_code_search1 = this['dealer_code'];
							branch_code_search1 = this['branch_code'];
							$.each(response['deal_name']['data'], function(index) {
								deal_code = this['dealercode'];
								deal_name = this['dealername'];
								if (deal_code === deal_code_search1) {
									deal_name_result = deal_name;
								}
							});

							$.each(response['branch_name']['data'], function(index) {
								branch_code = this['branch_code'];
								branch_name = this['branch_desc'];
								if (branch_code === branch_code_search1) {
									branch_name_result = branch_name;
								}
							});

							table_dpho_nsb.row.add([
								'<input type="checkbox" id= "check-dphonsb-' + index + '" class="check-dphonsb" checked disabled>',
								branch_name_result,
								this['contract_no'],
								this['cust_name'],
								this['dealer_code'],
								deal_name_result,
								this['fpd_no'],
								this['cust_bank'] + ' - ' + this['cust_bank_name'],
								accounting.formatMoney(this['amount'], '', 2, ',', '.'),
								this['pv_no'],
								this['contract_id'],
								]).draw(false);
						});
						$('#inp-total-amount-dpho-nsb').val(accounting.formatMoney(response['getsearch2']['TotalAmount'], '', 2, ',', '.'));
						$('#slc-dpho-nsb-bank-pengirim').val(response['getsearch2']['BankId']);
						$('#slc-dpho-nsb-bank-pengirim').prop('disabled', true);
						$('#btn-save-dpho-nsb').prop('disabled', true);
						$('#btn-confirm-pv-dpho-nsb').prop('disabled', false);
						$('#btn-cancel-pv-dpho-nsb').prop('disabled', false);
						//$('.check-dphonsb').prop('checked', true);
						//$('.check-dphonsb').prop('disabled', true);

					}	
				} catch(e) {
					$('#loading-ajax').hide();
					console.log(response);
					console.log(e);
					alert_error(e);
				}
			} else{
				alert_error(response['getsearch2']['ErrorMessage']);
				$('#tbl-display-dpho-nsb').DataTable().search("").draw();
			}
		},
		error: function(response){
			console.log(response); 
			if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
				alert_error('Koneksi ke server gagal, silahkan coba lagi!')
			} else {
				alert_error(response);
			}
		}
	});
};

function get_no_pv_dphonsb() {
	$.ajax({
		url: base_url + "Controller_draft_payment_ho_nasabah/get_pv_dphonsb",
		type: 'POST',
		dataType: 'json',
		data: {
			class_code: $('#slc-dpho-nsb-class-code').val(),
			branch_code : $('#hdn-dpho-branch-code').val()
		},

		success: function(response) {
			console.log(response);
			if (response) {
				try {
					table_nopv.clear().draw();
					var data = response['pv_list']['Data'];
					console.log(data);
					if (data.length === 0) {
						alert_info("Data tidak dapat ditampilkan");
					}else{

						$.each(data, function(index) {
							table_nopv.row.add([
								this['pv_no'],
								this['pv_date']
								]).draw(false);
							$("#modal-nopv").modal({
								show: true,
								backdrop: 'static'
							});
						});

					} 
				}catch (e) {
					$('#loading-ajax').hide();
					console.log(e);
					alert_error("Terjadi Kesalahan saat mencari no PV");
				}
			}
		},
		error: function(response) {
			console.log(response);
		}
	});
}

$("#btn-search-pv-no-dpho-nsb , #inp-dpho-nsb-pv-no").click(function(){
	if ($('#hdn-dpho-branch-code').val() !== '0000') {
		alert_error('Mohon login sebagai HO untuk menggunakan menu ini!');
	}
	else {
		if ($('#slc-dpho-nsb-class-code').val() === null)
		{ 
			alert_error('Class Code belum dipilih!' );

		} else {
			get_no_pv_dphonsb();
		}
	}
});

function clear_dphonsb() {
	arr_cont_amount = [];
	$('#inp-tgl-awal-fpd-dpho-nsb').val('');
	$('#inp-tgl-akhir-fpd-dpho-nsb').val('');
	$('#slc-dpho-nsb-class-code').val(0);
	$('#slc-dpho-nsb-area').val(0);
	$('#slc-dpho-nsb-bank').val(0);
	$('#inp-total-amount-dpho-nsb').val(0);
	$('#inp-dpho-nsb-pv-no').val('');
	$("#btn-save-dpho-nsb").prop('disabled', true);
	$("#btn-confirm-pv-dpho-nsb").prop('disabled', true);
	$("#btn-cancel-pv-dpho-nsb").prop('disabled', true);
	$('#slc-dpho-nsb-bank-pengirim').val(0);
	$('#slc-dpho-nsb-bank-pengirim').prop("disabled", false);
	$('#btn-display-dpho-nsb').prop("disabled", false);
	table_dpho_nsb.clear().draw();
}

$("#btn-clear-dpho-nsb").click(function(){
	$('html, body').animate({scrollTop:0}, 'slow');
	clear_dphonsb();
	//get_text_file_dphonsb();
});


function get_text_file_dphonsb(class_code, pv_no, branch_code) {
	var pv_no_csv = pv_no;
	var json_parse_dphonsb;
	var d = new Date,
	dformat = [
	d.getDate().padLeft(),
	(d.getMonth()+1).padLeft(),
	d.getFullYear()].join('-')+
	' ' +
	[ d.getHours().padLeft(),
	d.getMinutes().padLeft(),
	d.getSeconds().padLeft()].join('.');
	$.ajax({
		url: "Controller_draft_payment_ho/get_finance_csv_dphonsb",
		type: 'POST',
		timeput : 10000,
		dataType: 'text',
		data:{
			class_code : class_code,// $('#slc-dpho-nsb-class-code').val(),
			pv_no : pv_no,//$('#inp-dpho-nsb-pv-no').val(),
			branch_code : branch_code,//$('#hdn-dpho-branch-code').val()
		},

		success: function(response){
			console.log("ajax response success"); 
			console.log(response);
			if ( response.includes('Tgl Upload')) {
				text_file_finance = response;
/*				var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);				var downloadLink = document.createElement("a");
				downloadLink.href = uri;
				downloadLink.download = 'DP_'+pv_no_csv+'_'+dformat+'.csv';
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);*/
				get_text_export_dphonsb(class_code, pv_no);
			}
			else {
				rollback_dphonsb(pv_no,class_code);
				alert_info('Terjadi kesalaah saat penulisan data ke CSV, silahkan melakukan confirm kembali!');
			}
			
		},
		error: function(response){
			console.log(response); 
			if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
				console.log(response); 
				alert_error('Koneksi ke server gagal, silahkan coba lagi!')
			} else {
				console.log(response); 
				alert_error(response);
			}
		}
	});
}

function get_text_export_dphonsb(class_code, pv_no) {
	var pv_no_csv = pv_no;
	var d = new Date,
	dformat = [
	d.getDate().padLeft(),
	(d.getMonth()+1).padLeft(),
	d.getFullYear()].join('-')+
	' ' +
	[ d.getHours().padLeft(),
	d.getMinutes().padLeft(),
	d.getSeconds().padLeft()].join('.');
	$.ajax({
		url: "Controller_draft_payment_ho/get_mcm_csv_dphonsb",
		type: 'POST',
		timeput : 10000,
		dataType: 'text',
		data:{
			class_code : class_code,// $('#slc-dpho-nsb-class-code').val(),
			pv_no : pv_no
		},

		success: function(response){
			console.log("ajax response success"); 
			console.log(response);
			if (response.includes('<div style')) {
				console.log(response);
				rollback_dphonsb(pv_no,class_code);
				alert_info('Terjadi kesalaah saat penulisan data ke CSV, silahkan melakukan confirm kembali!');
			}
			else {
				var uri2 = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(text_file_finance);
				var downloadLink2 = document.createElement("a");
				downloadLink2.href = uri2;
				downloadLink2.download = 'DP_'+pv_no_csv+'_'+dformat+'.csv';
				document.body.appendChild(downloadLink2);
				downloadLink2.click();
				document.body.removeChild(downloadLink2);
				console.log("ajax response success"); 
				console.log(response);
				var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
				var downloadLink = document.createElement("a");
				downloadLink.href = uri;
				downloadLink.download = 'EXPORT_'+pv_no_csv+'.csv';
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
				export_dphonsb(pv_no, class_code);			}
				
			},
			error: function(response){
				console.log(response); 
				if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
					alert_error('Koneksi ke server gagal, silahkan coba lagi!')
				} else {
					alert_error(response);
				}
			}
		});
}

//antar war function
function search_by_fpd_date_2(){
	arr_cont_amount = [];
	$('#inp-dpho-nsb-pv-no').val('');
	$('#slc-dpho-nsb-bank-pengirim').val(0);
	$('#inp-total-amount-dpho-nsb').val(0);
	$('#tbl-display-dpho-nsb').DataTable().search("").draw();

	$.ajax({
		url: "Controller_draft_payment_ho_nasabah/get_search_by_fpd_date_2",
		type: 'POST',
		timeput : 10000,
		dataType: 'json',
		data:{
			class_code : $('#slc-dpho-nsb-class-code').val(),
			fpd_start : $('#inp-tgl-awal-fpd-dpho-nsb').val(),
			fpd_end : $('#inp-tgl-akhir-fpd-dpho-nsb').val(),
			branch_code : list_branch_child_dphonsb,
			bank_id : $('#slc-dpho-nsb-bank').val(),
		},

		success: function(response){
			console.log("ajax response success"); 
			console.log(response);
			if (response)
			{
				try {
					if (response['status'] =  false) {
						alert_error(response['data']);
						console.log(response);
						table_dpho_nsb.clear().draw();
					} 
					else {
						if (response['data'].length == 0) {
							alert_error("Data tidak ditemukan!");
							console.log(response);
							table_dpho_nsb.clear().draw();
						} else {
							$("#btn-save-dpho-nsb").prop('disabled', false);
							$('#slc-dpho-nsb-bank-pengirim').prop("disabled", false);      
							table_dpho_nsb.clear().draw();
							$( "#check-all-dphonsb" ).prop( "disabled", false );
							$.each(response['data'], function(index) {
								var deal_name = '';
								var deal_code = '';
								var deal_name_result = ''; 
								var branch_name = '';
								var branch_code = '';
								var branch_name_result = ''; 
								deal_code_search1 = this['dealer_code'];
								branch_code_search1 = this['branch_code'];

								$.each(response['dealer'], function(index) {
									deal_code = this['dealercode'];
									deal_name = this['dealername'];
									if (deal_code === deal_code_search1) {
										deal_name_result = deal_name;
									}
								});

								$.each(response['branch'], function(index) {
									branch_code = this['branch_code'];
									branch_name = this['branch_desc'];
									if (branch_code === branch_code_search1) {
										branch_name_result = branch_name;
									}
								});

								table_dpho_nsb.row.add([
									'<input type="checkbox" id= "check-dphonsb-' + index + '" class="check-dphonsb" >',
									branch_name_result,
									this['contract_no'],
									this['cust_name'],
									this['dealer_code'],
									deal_name_result,
									this['fpd_no'],
									this['cust_bank'] + ' - ' + this['cust_bank_name'],
									accounting.formatMoney(this['amount'], '', 2, ',', '.'),
									this['pv_no'],
									this['contract_id'],
									]).draw(false);
							});
							$('#slc-dpho-nsb-bank-pengirim').prop('disabled', false);
						}	
					}
				} catch(e) {
					$('#loading-ajax').hide();
					console.log(response);
					console.log(e);
					alert_error(e);
				}
			}
		},
		error: function(response){
			console.log(response); 
			if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
				alert_error('Koneksi ke server gagal, silahkan coba lagi!')
			} else {
				alert_error(response);
			}
		}
	});
};

function search_by_pv_no_2(){
	arr_cont_amount = [];
	$('#inp-tgl-awal-fpd-dpho-nsb').val('');
	$('#inp-tgl-akhir-fpd-dpho-nsb').val('');
	$('#slc-dpho-nsb-area').val(0);
	$('#slc-dpho-nsb-bank').val(0);
	$('#inp-total-amount-dpho-nsb').val(0);
	$('#tbl-display-dpho-nsb').DataTable().search("").draw();

	$.ajax({
		url: "Controller_draft_payment_ho_nasabah/get_search_by_pv_no_2",
		type: 'POST',
		timeput : 10000,
		dataType: 'json',
		data:{
			class_code : $('#slc-dpho-nsb-class-code').val(),
			pv_no : $('#inp-dpho-nsb-pv-no').val(),
			branch_code : $('#hdn-dpho-branch-code').val()
		},

		success: function(response){
			console.log("ajax response success"); 
			console.log(response);
			if (response)
			{
				try {
					if (response['status'] =  false) {
						alert_error('Data tidak ditemukan');
						table_dpho_nsb.clear().draw();
					} else {
						$("#btn-display-dpho-nsb").prop('disabled', true);
						$("#btn-save-dpho-nsb").prop('disabled', true);
						$('#slc-dpho-nsb-bank-pengirim').prop("disabled", true);      
						table_dpho_nsb.clear().draw();
						$( "#check-all-dphonsb" ).prop( "disabled", true );
						$.each(response['data']['list_data'], function(index) {
							var deal_name = '';
							var deal_code = '';
							var deal_name_result = ''; 
							var branch_name = '';
							var branch_code = '';
							var branch_name_result = ''; 
							deal_code_search1 = this['dealer_code'];
							branch_code_search1 = this['branch_code'];

							$.each(response['dealer'], function(index) {
								deal_code = this['dealercode'];
								deal_name = this['dealername'];
								if (deal_code === deal_code_search1) {
									deal_name_result = deal_name;
								}
							});

							$.each(response['branch'], function(index) {
								branch_code = this['branch_code'];
								branch_name = this['branch_desc'];
								if (branch_code === branch_code_search1) {
									branch_name_result = branch_name;
								}
							});

							table_dpho_nsb.row.add([
								'<input type="checkbox" id= "check-dphonsb-' + index + '" class="check-dphonsb"  checked disabled >',
								branch_name_result,
								this['contract_no'],
								this['cust_name'],
								this['dealer_code'],
								deal_name_result,
								this['fpd_no'],
								this['cust_bank'] + ' - ' + this['cust_bank_name'],
								accounting.formatMoney(this['amount'], '', 2, ',', '.'),
								this['pv_no'],
								this['contract_id'],
								]).draw(false);
						});
						$('#inp-total-amount-dpho-nsb').val(accounting.formatMoney(response['data']['total_amount'], '', 2, ',', '.'));
						$('#slc-dpho-nsb-bank-pengirim').val(response['data']['sender']);
						$('#slc-dpho-nsb-bank-pengirim').prop('disabled', true);
						$('#btn-save-dpho-nsb').prop('disabled', true);
						$('#btn-confirm-pv-dpho-nsb').prop('disabled', false);
						$('#btn-cancel-pv-dpho-nsb').prop('disabled', false);
					}	
				} catch(e) {
					$('#loading-ajax').hide();
					console.log(response);
					console.log(e);
					alert_error(e);
				}
			}
		},
		error: function(response){
			console.log(response); 
			if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
				alert_error('Koneksi ke server gagal, silahkan coba lagi!')
			} else {
				alert_error(response);
			}
		}
	});
};





