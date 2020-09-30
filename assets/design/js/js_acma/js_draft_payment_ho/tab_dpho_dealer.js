//var list_classcode_dpho_dealer = [];

var PaymentVoucherDtlDlr = [];	//Utk list model payment voucher detail group by dealer dan rekening
var payment_id_dpho_dlr = 0;
var table_detail_pv_dlr = $('#table-dpho-dealer').DataTable({
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
		"width": "8%",
		"targets": 3
	},
	{
		"width": "10%",
		"targets": 4
	},
	{
		"width": "10%",
		"targets": 5
	},
	{
		"width": "10%",
		"targets": 6
	},
	{
		"width": "10%",
		"targets": 7
	},
	{
		"width": "20%",
		"targets": 8
	}
	]
    }); //Utk datatable
var arr_detail_pv = [];
var obj_detail_pv = {};

// ------------------ EVENT HANDLER ----------------------------
//Dropdown Tipe Pembayaran : Click dealer
$('#slc-list-tab-dpho').on('change', function(){
	if($('select#slc-list-tab-dpho').val() == '02'){
		clear_dpho_dealer();
		get_dpho_dlr_bank_penerima();
		get_dpho_dlr_bank_pengirim();
		get_area_dpho_dealer();
	};
});

//Tombol search PV no
$("#btn-dpho-dlr-search-hdr").on('click',function(){ 
	//clear_dpho_dealer();
	get_pv_dpho_dlr();
	//get_pv_no();
	$('#modal-nopv').modal({
		show : true,
		backdrop : 'static'
	});
});

//Tombol search (Display Detail)
$("#btn-dpho-dlr-display").on('click',function(){ 
	if($('#input-dlr-pv-no').val() != ''){
		var payment_no = $('#input-dlr-pv-no').val(); 
		var dealer_area = $('#input-dlr-area').val();
		var dealer_bank = $('#input-dlr-bank').val();
		$('#checkbox-dpho-dlr').prop('checked', false);

		console.log({"payment_no" : payment_no, "dealer_area" : dealer_area, "dealer_bank" : dealer_bank});

		if (dealer_area != 'All'){
			dealer_area = get_branch_dpho_dealer(dealer_area);
		}
		
		
		if(dealer_bank !=  'All'){
			dealer_bank == get_branch_dpho_dealer();
		}

		console.log("dealer_area : " + dealer_area);
		console.log("dealer_bank : " + dealer_bank);

		get_pv_dtl_dpho_dlr(payment_id_dpho_dlr, dealer_area, dealer_bank);
		console.log("success : #btn-dlr-search-pv-no on.click"); 
	}
	else{
		alert_info('Nomor PV harus dipilih');
	}
});

//Tombol cancel PV
$("#btn-dpho-dlr-cancel").on('click', function(){
	var v_payment_no = $("#input-dlr-pv-no").val();
	cancel_dpho_dlr_pv(v_payment_no);
});

//Tombol Generate File
$("#btn-dpho-dlr-confirm").on('click', function(){
	if(accounting.unformat($('#inp-dpho-dlr-total').val()) <= 0){
		alert_error('Pilih Detail PV yang akan digenerate!');
	}
	else{
		var dtl_dlr = table_detail_pv_dlr.data();
		console.log(dtl_dlr);
		var dtl_object = {};
		var list_dtl_object = [];
		var list_dtl_object2 = [];
		//PAYMENT_DETAIL_ID|BRANCH_ID|CLASS_CODE|DEALER_CODE|BANK_ID|ACCNO
		for(var i = 0; i < dtl_dlr.length; i++){
			if ($('#check-dp-dlr-' + i).is(':checked')){

				var bank_id_dtl = ((dtl_dlr[i][5]).split('-')[0]).trim();
				var branch_id = ((dtl_dlr[i][3]).split('-')[0]).trim();

				dtl_object = {
					"payment_detail_id":dtl_dlr[i][12],
					"branch_id":branch_id,
					//"class_code":dtl_dlr[i][4],
					"dealer_code":dtl_dlr[i][1],
					"bank_id":bank_id_dtl,
					"acc_no":dtl_dlr[i][6],
					/*"supplier_code":dtl_dlr[i][1],
					"bank_id": bank_id,
					"paket_rekening":dtl_dlr[i][6],
					"unit":dtl_dlr[i][7],*/
				};

				list_dtl_object.push(dtl_object);
				
			}
		}

		console.log('list_dtl_object: ');
		console.log(list_dtl_object);

		var payment_no = $('#input-dlr-pv-no').val();
		var area_code = $('#input-dlr-area').val();
		var bank_id_hdr = $('#input-dlr-bank').val();

		confirm_pv(payment_no, area_code, bank_id_hdr, list_dtl_object);
	}
});

//Click tombol clear
$("#btn-dpho-dlr-clear").on('click',function(){ 
	$('#input-dlr-pv-no').empty();
	clear_dpho_dealer();
});

//===========================================Check all
$('#checkbox-dpho-dlr').click(function() {
	var pv_dtl = table_detail_pv_dlr.data();
	console.log(pv_dtl);
	var total = 0;

	$('#inp-dpho-dlr-total').val(0);
	if (pv_dtl.length > 0){
		if ($('#checkbox-dpho-dlr').is(":checked")) {
			$('.check-dp-dlr').prop('checked', true);

			total = total_amt_dpho_dlr();
			console.log("total tes=" + total);
			$('#inp-dpho-dlr-total').val(accounting.formatMoney(total, '', 2, ',', '.'));
		}else{
			$('.check-dp-dlr').prop('checked', false);
		}
	}

	if(total > 0){
		$('#btn-dlr-generate').prop("disabled", false);
		$('#btn-dpho-dlr-confirm').prop('disabled', false);
	} else {
		$('#btn-dlr-generate').prop("disabled", true);
		$('#btn-dpho-dlr-confirm').prop('disabled', true);
	}
});   


$('#table-dpho-dealer').on('click', '.check-dp-dlr', function() {
	var check_id = (this.id).substr(13, 1);
	console.log(check_id);
	var dtl_dlr = table_detail_pv_dlr.rows().data();
	console.log(dtl_dlr);
	var amount = accounting.unformat(dtl_dlr[check_id][9]);
	console.log('amount = ' + amount);

	var total = accounting.unformat($('#inp-dpho-dlr-total').val());
	console.log('total = ' + total);
	
	if ($('#check-dp-dlr-' + check_id).is(':checked')) {
		console.log('amount : ' + amount);
		total += amount;
		$('#inp-dpho-dlr-total').val(accounting.formatMoney(total, '', 2, ',', '.')); 

		$('#checkbox-dpho-dlr').prop('checked', true);
		for(var i = 0; i < dtl_dlr.length; i++){
			//Jika ada yg tidak di-check
			if (!$('#check-dp-dlr-' + i).is(':checked')){
				$('#checkbox-dpho-dlr').prop('checked', false);
				break;
			}
		}
	} else {
		total -= amount;
		$('#checkbox-dpho-dlr').prop('checked', false);
		$('#inp-dpho-dlr-total').val(accounting.formatMoney(total, '', 2, ',', '.'));
	}


	//generate_text_file(total);
	if(total > 0){
		$('#btn-dlr-generate').prop("disabled", false);
		$('#btn-dpho-dlr-confirm').prop('disabled', false);
	} else {
		$('#btn-dlr-generate').prop("disabled", true);
		$('#btn-dpho-dlr-confirm').prop('disabled', true);
	}

});

//================================================================ END EVENT HANDLER ================================================================

//================================================================ FUNCTION ================================================================
function generate_text_file(total){
	//console.log('tes total = ' + total);

};

//get detail pv yang dipilih
function get_checked_pv_dtl(){

}

function confirm_pv(p_payment_no, p_area_code, p_bank_id, p_obj_data){
	var d = new Date, dformat = [	d.getDate().padLeft(), 	(d.getMonth()+1).padLeft(), d.getFullYear()].join('-') + 
	' ' + 
	[ d.getHours().padLeft(), d.getMinutes().padLeft(), d.getSeconds().padLeft()].join('.');
	
	console.log('p_obj_data:');
	console.log(p_obj_data);

	alert_confirm("Apakah anda yakin ingin confirm PV : " + p_payment_no + " ?" , function(){
		$.ajax({
			url: "Controller_draft_payment_ho/confirm_dpho_pv_dlr",
			type: 'POST',
			timeout: 10000,
			dataType: 'TEXT',
			data: {
				"payment_no" : p_payment_no,
				"area_code" : p_area_code,
				"bank_id" : p_bank_id,
				"data" : p_obj_data			
			},
			success: function(response){

				console.log('response.substring(0,2)=' + response.substring(0,2));
				console.log(response);

				if (response.substring(0,2) == ';;') {
					var data = response.split(';;');
					alert_error('Tidak boleh pembayaran parsial' + '<br />' + 'No rekening : ' + data[0] + '<br />' + 'ID Bank : ' + data[1]);
				}
				else {
					var cari = response.indexOf('||');
					var res_exp = response.substring(0,cari);
					var res_fnc = response.slice(cari);
					res_fnc = res_fnc.replace('||','');

					//DOWNLOAD MCM CSV
					var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(res_exp);
					var downloadLink = document.createElement("a");
					downloadLink.href = uri;
					downloadLink.download = 'EXPORT_'+p_payment_no+'.csv';
					document.body.appendChild(downloadLink);
					downloadLink.click();
					document.body.removeChild(downloadLink);
					alert_info('Berhasil Confirm PV!');

					//DOWNLOAD FINANCE CSV
					var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(res_fnc);
					var downloadLink = document.createElement("a");
					downloadLink.href = uri;
					downloadLink.download = 'DP_'+p_payment_no+'_'+dformat+'.csv';
					document.body.appendChild(downloadLink);
					downloadLink.click();
					document.body.removeChild(downloadLink);
				}
			},
			error: function(response){
				console.log("error response :: ")
				console.log(response);
				if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
					alert_error('Koneksi ke server gagal, silahkan coba lagi!')
				} else {
					alert_error(response);
				}
				alert_error('Gagal Confirm PV!');
			},
		});
	});
}

function cancel_dpho_dlr_pv(p_payment_no){
	alert_confirm("Apakah anda yakin cancel PV : " + p_payment_no + "?", function(){

	});
}

function get_finance_csv_dpho_dlr(p_payment_no, p_area_code, p_bank_id, p_obj_data) {
	var pv_no_csv = p_payment_no;
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
		url: "Controller_draft_payment_ho/get_finance_csv_dpho_dlr",
		type: 'POST',
		timeput : 10000,
		dataType: 'text',
		data:{
			// class_code : class_code,// $('#slc-dpho-nsb-class-code').val(),
			// pv_no : pv_no,//$('#inp-dpho-nsb-pv-no').val(),
			// branch_code : branch_code,//$('#hdn-dpho-branch-code').val()
			"payment_no" : p_payment_no,
			"area_code" : p_area_code,
			"bank_id" : p_bank_id,
			"data" : p_obj_data		
		},

		success: function(response){
			console.log("ajax response success"); 
			console.log(response);
			if ( response.includes('Tgl Upload')) {
				var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
				var downloadLink = document.createElement("a");
				downloadLink.href = uri;
				downloadLink.download = 'DP_'+pv_no_csv+'_'+dformat+'.csv';
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
				get_text_export_dphonsb(class_code, pv_no);
			}
			else {
				alert_error('Terjadi kesalahaan saat membaca file csv finance!')
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

function get_mcm_csv_dpho_dlr(class_code, pv_no, response) {

	//vHeader := 'P'||','||to_char(sysdate, 'yyyymmdd')||','||vc_bank_muf_acct_code||''||','||:SEARCH_PV.COUNT_DATA_EXPORT||','||:SEARCH_PV.GRAND_TOTAL;
	var pv_no_csv = pv_no;
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	//date=Mon Nov 12 2018 20:20:10 GMT+0700

	console.log("date=" + yyyy + mm + dd);

	$.ajax({
		url: "Controller_draft_payment_ho/get_export_file_dpho_dlr",
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
			if (response == 500) {
				alert_error('Terjadi kesalahan saat generate text file export!');
			}
			else {
				console.log("ajax response success"); 
				console.log(response);
				var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
				var downloadLink = document.createElement("a");
				downloadLink.href = uri;
				downloadLink.download = 'EXPORT_'+pv_no_csv+'.csv';
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
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

function get_dpho_dlr_bank_penerima(){
	var list_bank_dpho_dealer = [];
	var bankCode = "";
	var bankName = "";
	var item = {};

	console.log('get_dpho_dlr_bank_penerima');
	$('#input-dlr-bank').empty();


	$.ajax({
		url: "Controller_draft_payment_ho_dealer/get_dpho_dlr_bank_penerima",
		type: 'POST',
		timeout: 10000,
		dataType: 'json',
		success: function(response){
			console.log(response['data']);
			console.log(response['status']); 
			if(response['data']) {
				try {
					console.log("function get_dpho_dlr_bank_penerima() - ajax response : "); 
					var list_result = response['data'];
					console.log(response); 

					$('#input-dlr-bank').append($('<option/>', { 
						value: 'All',
						text : 'All' 
					}));

					$.each(list_result, function(){
						bankCode = this['bankCode'];
						bankName = this['bankName'];

						var item = {"bankCode" : bankCode, "bankName" : bankName};
						list_bank_dpho_dealer.push(item);
					});

					$.each(list_bank_dpho_dealer, function(index, value){
						$('#input-dlr-bank').append($('<option/>', { 
							value: this['bankCode'],
							text : this['bankCode'] + " - " + this['bankName']
						}));
					});
				} catch(e) {
					$('#loading-ajax').hide();
					console.log(response);
					console.log(e);
					alert(e);
				}
			} else {
				console.log(response)
				alert('Data area tidak ada!');
			}
		},
		error: function(response){
			console.log("function get_dpho_dlr_bank_penerima() - error response : ");
			console.log(response);
			if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
				alert_error('Koneksi ke server gagal, silahkan coba lagi!')
			} else {
				alert_error(response);
			}
		}
	});
};

function get_dpho_dlr_bank_pengirim(){
	$.ajax({
		url : "Controller_draft_payment_ho_dealer/get_dpho_dlr_bank_pengirim",
		dataType : 'JSON',
		type : 'POST',
		timeout: 10000,
		success : function(response){
			console.log(response);
			if (response) {
				try{
					$('#input-dlr-bank-pengirim').empty();
					$('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#input-dlr-bank-pengirim').addClass('form-control');

					$.each(response['data'], function(i){
						var bank_code = response['data'][i]['bankCode'];
						var bank_name = response['data'][i]['bankName'];

						$('#input-dlr-bank-pengirim').append('<option value="'+bank_code+'">'+bank_code+ ' - ' +bank_name+ '</option>');
					})
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
		error : function(response){
			console.log("function get_dpho_dlr_bank_pengirim() - error response : ");
			console.log(response);
			if (response['responseText'] === "") {
				alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
					localStorage.clear();
					window.location.href = base_url + "Controller_login/login_view";
				});
			}
		}
	});
}

function compare(a, b){
	if (a.branch_code < b.branch_code)
		return -1;
	if(a.branch_code > b.branch_code)
		return 1;
	return 0;
}

function get_area_dpho_dealer(){

	var table_list_pv_dlr; //Utk datatable
	var list_area_dpho_dealer = [];

	console.log('get_area_dpho_dealer');
	
	$('#input-dlr-area').empty();

	// $('#input-dlr-area').append($('<option/>', { 
	// 	value: null,
	// 	text : 'SILAHKAN PILIH AREA'
	// }));

	$.ajax({
		url: "Controller_draft_payment_ho_dealer/get_dpho_dealer_area",
		type: 'POST',
		timeout: 10000,
		dataType: 'json',
		data: {
			"branch_type": "AR"
		},
		success: function(response){
			console.log(response['data']);
			console.log(response['status']); 
			if(response['data']) {
				try {
					console.log("ajax response success"); 
					var list_result = response['data'];

					list_result.sort((a, b) => (a.branch_code > b.branch_code) ? 1 : ((a.branch_code < b.branch_code) ?  -1 : 0));

					$('#input-dlr-area').append($('<option/>', { 
						value: 'All',
						text : 'All' 
					}));
					console.log(list_result); 
					for (var j = 0; j < list_result.length; ++j) {
						var item = list_result[j];
						$('#input-dlr-area').append($('<option/>', { 
							value: item['branch_code'],
							text : item['branch_code'] + " - " + item['branch_desc']
						}));
					}
					$('.selectpicker').selectpicker('refresh');
				} catch(e) {
					$('#loading-ajax').hide();
					console.log(response);
					console.log(e);
					alert(e);
				}
			} else {
				console.log(response)
				alert('Data area tidak ada!');
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


//Click tombol clear
$("#btn-clear-dpho-dealer").on('click',function(){ 
	clear_dpho_dealer();
});

//----------------------------------------------------------------------
function send_payment_id(payment_id){
	payment_id_dpho_dlr = payment_id;
	console.log("send_payment_id = " + payment_id);
};


function get_pv_dpho_dlr(){
	var table_list_pv_dlr = $('#tbl-list-nopv').DataTable(); //Utk datatable

	table_list_pv_dlr.clear().draw();
	console.log("get_pv_dpho_dlr");
	$.ajax({
		url: "Controller_draft_payment_ho_dealer/get_dpho_dealer_pv",
		type: 'GET',
		timeout: 10000,
		dataType: 'json',
		success: function(response){
			console.log(response['data']);
			console.log(response['status']);
			if(response['status']) {
				try {
					console.log("function get_pv_dpho_dlr() : ajax response success"); 
					var status = response['status'];
					var list_result = response['data'];

					if (list_result != null)
					{
						$.each(list_result, function(){
							var payment_id = this['payment_id'];
							var payment_no = this['payment_no'];
							var tanggal_pv = this['tanggal_pv'];
							table_list_pv_dlr.row.add([payment_no, payment_id, tanggal_pv]).draw(false);
						});
					};
				} catch(e) {
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
			console.log(response);
			if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
				alert_error('Koneksi ke server gagal, silahkan coba lagi!')
			} else {
				alert_error(response);
			}
		}
	});
};

function get_pv_dtl_dpho_dlr(payment_id, dealer_area, dealer_bank) {
	var number = 1;
	arr_datatable = [];
	table_detail_pv_dlr.clear().draw();

	console.log("function get_pv_dtl_dpho_dlr(" + payment_id + ", " + dealer_area + ", " + dealer_bank + ")");
	$.ajax({
		url: "Controller_draft_payment_ho_dealer/get_dpho_pv_detail",
		type: 'POST',
		dataType: 'json',
		data: {
			"payment_id" : payment_id,
			"dealer_area" : dealer_area,
			"dealer_bank" : dealer_bank
		},
		success: function(response) {
			console.log("function get_pv_dtl_dpho_dlr() - response : ");
			console.log(response);

			console.log('response status : ' + response['status']);
			if (response['status']) {
				try { 
					var result = response['status'];
					var data = response['data'];

					if (result == false) {
						alert_error(response['status']); 
					} else {
						table_detail_pv_dlr.clear().draw();
						
						$.each(data, function(index, value){
						//$.each(data.list_detail, function(){
							var branch_id = this['branch_code'];
							var branch_name = this['branch_name'];
							var class_code = this['class_code'];
							var dealer_code = this['supplier_code'];
							var dealer_name = this['supplier_name'];
							var bank_id = this['bank_id'];
							var bank_name = this['bank_name'];
							var paket_rekening = this['paket_rekening'];
							var original_amt = this['original_amt'];
							var netoff_amt = this['netoff_amt'];
							var gross_amt = this['gross_amt'];
							var tax_amt = this['tax_amt'];
							var nett_amt = this['nett_amt'];
							var unit = this['unit'];
							var payment_detail_id = this['payment_detail_id'];

							arr_datatable.push([
								'<input type="checkbox" id="check-dp-dlr-' + index + '" class="check-dp-dlr">',
								dealer_code,
								dealer_name,
								branch_id + ' - ' + branch_name,
								class_code,
								bank_id + ' - ' +  bank_name,
								paket_rekening,
								unit,
								accounting.formatMoney(tax_amt, '', 2, ',', '.'),
								accounting.formatMoney(original_amt, '', 2, ',', '.'),
								$('#input-dlr-pv-no').val(),
								bank_name,
								payment_detail_id,
								index
								]);
						});
					}
					console.log(arr_datatable);
					table_detail_pv_dlr.rows.add(arr_datatable).draw(false);

					console.log('data=');
					console.log(data);

					console.log(table_detail_pv_dlr.rows().data());
					$('#inp-dpho-dlr-total').val(0);
					if(!$.trim(response['data'])) {
						$("#btn-dpho-dlr-cetak").prop('disabled', true);
						$("#btn-dpho-dlr-cancel").prop('disabled', true);
						$("#checkbox-dpho-dlr").prop('disabled', true);
					}else{
						$("#btn-dpho-dlr-cetak").prop('disabled', false);
						$("#btn-dpho-dlr-cancel").prop('disabled', false);
						$("#checkbox-dpho-dlr").prop('disabled', false);
					}

				} catch (e) {
					$('#loading-ajax').hide();
					console.log(e);
					alert_error("Error display data, silakan hubungi tim IT");
				}
			}
		},
		error: function(response) {
			console.log(response);
		}
	});
};

function send_payment_id_dpho_dlr(payment_id){
	if(payment_id_dpho_dlr != payment_id){
		payment_id_dpho_dlr = payment_id;
		table_detail_pv_dlr.clear().draw();
		$('#input-dlr-area').val('All');
		$('#inp-dpho-dlr-total').val('');
	}

	console.log("function send_payment_id_dpho_dlr(" + payment_id + ")");
};

function clear_dpho_dealer(){
	table_detail_pv_dlr.clear().draw();
	
	$('#inp-dpho-dlr-total').val('');
	$('#input-dlr-area').val('All');
	$('#input-dlr-bank').val('All');
	$("#btn-dpho-dlr-cetak").prop('disabled', true);
	$("#btn-dpho-dlr-cancel").prop('disabled', true);
};

//Return branch_id by area_code
function get_branch_dpho_dealer(area_code){
	var list_branch_dpho_dealer = "";
	console.log("function get_branch_dpho_dealer(" + area_code + ")");

	$.ajax({
		url: "Controller_draft_payment_ho_dealer/get_dpho_dealer_branch",
		type: 'POST',
		timeout: 10000,
		dataType: 'json',
		data: {
			"branch_parent" : area_code
		},
		success: function(response){

			console.log("get_branch_dpho_dealer - response : ");
			console.log(response);

			if(response['Data']) {
				try {
					var list_result = response['Data'];

					for (var j = 0; j < list_result.length; ++j) {
						var item = list_result[j];
						list_branch_dpho_dealer += item['branch_code'] + ",";
					}

					list_branch_dpho_dealer = list_branch_dpho_dealer.substring(0, list_branch_dpho_dealer.length - 1);
					console.log("list_branch_dpho_dealer : " + list_branch_dpho_dealer); 

				} catch(e) {
					$('#loading-ajax').hide();
					console.log(response);
					console.log(e);
					alert(e);
				}
			} else {
				console.log(response)
				alert('Data branch tidak ada!');
			}
		},
		error: function(response){
			console.log("error response :: ")
			console.log(response);
			if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
				alert_error('Koneksi ke server gagal, silahkan coba lagi!')
			} else {
				alert_error(response);
			}
		},
		async : false
	});
	return list_branch_dpho_dealer;
};

function total_amt_dpho_dlr(){
	var table_data = table_detail_pv_dlr.data();
	var total = 0;
	for (var i = 0 ; i < table_data.length; i++){
		var amount = accounting.unformat(table_data[i][9]);
		console.log("amount=" + amount);
		total = total + parseInt(amount);
	}
	//total = accounting.formatMoney(total, '', 2, ',', '.');
	return total;
};

// function groupByTransfer(ParaPaymentVoucherDtl){
// 	var PaymentVoucherDtl = [];

// 	console.log("function groupByTransfer() - ParaPaymentVoucherDtl : ");
// 	console.log(ParaPaymentVoucherDtl);

// 	for(var x in ParaPaymentVoucherDtl){
// 		var indeks = 0;
// 		var sizeDetail = PaymentVoucherDtl.length;

// 		if(sizeDetail > 0){
// 			for(var y in PaymentVoucherDtl){

// 				if(ParaPaymentVoucherDtl[x].supplier_code == PaymentVoucherDtl[y].supplier_code && ParaPaymentVoucherDtl[x].paket_rekening == PaymentVoucherDtl[y].paket_rekening){

// 					PaymentVoucherDtl[y].payment_detail_id += ',' + ParaPaymentVoucherDtl[x].payment_detail_id;
// 					PaymentVoucherDtl[y].branch_code += ',' + ParaPaymentVoucherDtl[x].branch_code;
// 					PaymentVoucherDtl[y].original_amt += ParaPaymentVoucherDtl[x].original_amt;
// 					PaymentVoucherDtl[y].netoff_amt += ParaPaymentVoucherDtl[x].netoff_amt;
// 					PaymentVoucherDtl[y].gross_amt += ParaPaymentVoucherDtl[x].gross_amt;
// 					PaymentVoucherDtl[y].tax_amt += ParaPaymentVoucherDtl[x].tax_amt;
// 					PaymentVoucherDtl[y].nett_amt += ParaPaymentVoucherDtl[x].nett_amt;
// 					PaymentVoucherDtl[y].unit += ParaPaymentVoucherDtl[x].unit;
// 					indeks++;
// 					break;

// 				};
// 				if(indeks == sizeDetail - 1){
// 					PaymentVoucherDtl.push(ParaPaymentVoucherDtl[x]);
// 					indeks++;
// 					break;
// 				};
// 				indeks++;
// 			};
// 		}else{
// 			PaymentVoucherDtl.push(ParaPaymentVoucherDtl[x]);
// 		};
// 	};

// 	console.log("function groupByTransfer() - return : ");
// 	console.log(PaymentVoucherDtl);

// 	//PaymentVoucherDtlDlr = PaymentVoucherDtl;
// 	return PaymentVoucherDtl;
// };
