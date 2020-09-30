///////////SUM PER FISIK
var status_save = 0;
var tabel_cash_no = $("#id-tabel-list_cash_no-rks").DataTable({
});

if (localStorage.getItem('menu_alias_am') === 'RKS') {
//ON CHANGE APPROVED BY

$('#id-btn-clear-entrycc').click(function(){
	location.reload();
});

$('input[name=radioEntrycc]').on('change',function(){
	if ($('input[name=radioEntrycc]:checked').val() === 'create') {
		location.reload();
	}else if($('input[name=radioEntrycc]:checked').val() === 'search')
	{
		$('#id-inp-cash_count_no-entrycc').prop('disabled', false);
		$('#btn-search-cash_no').prop('disabled', false);
	}
});

$('#id-btn-print-entrycc').click(function(){
	if (check_session() === 'true') {

		var user = $('#nik-login').html();
	if (localStorage.getItem('role_adh')  == 'false' ) {//if bukan adh
		alert_warning('PRINT HANYA BISA DI AKSES OLEH USER ADH');
		return false;
	}
	var cash_no = $('#id-inp-cash_count_no-entrycc').val();
	alert_confirm( 'CASH COUNT NO : '+cash_no + ' AKAN DI CETAK?', function() {
		printCashCount(cash_no,user);
	});
}else if (check_session() === 'false') {
	alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
		localStorage.clear();
		window.location.href = base_url + "Controller_login/login_view";
	});
}

});

$('#btn-search-cash_no').click(function(){
	var branch = $('#branch-id-rks').val();
	var user = $('#nik-login').html();
	var cash_no  = $('#id-inp-cash_count_no-entrycc').val();
	if (cash_no == '') {
		getListCashNo(branch,user);
	}else{
		getDetailCashNo(cash_no,user);
	}
});


///-------------TABEL KETIKA ROW DI DOBEL KLIK DATA SET KE INPUT
$('#id-tabel-list_cash_no-rks tbody').on('click', 'tr', function() {
	if ($(this).hasClass('selected')) {
		$(this).removeClass('selected');
	} else {
		tabel_cash_no.$('tr.selected').removeClass('selected');
		$(this).addClass('selected');
		arr_tbl = tabel_cash_no.row(this).data();
	}
});

// ------------ DOBEL KLIK ROW
$('#id-tabel-list_cash_no-rks tbody').on('dblclick', 'tr', function() {
	$('#id-btn-pilih-cash_no-rks').click();
});


//BTN PILIH CASH NO
$('#id-btn-pilih-cash_no-rks').click(function(){
	$('#id-inp-cash_count_no-entrycc').val(arr_tbl[1]);
	var user = $('#nik-login').html();
	var cash_no = $('#id-inp-cash_count_no-entrycc').val();
	getDetailCashNo(cash_no,user);

});


$('#id-btn-submit-entrycc').click(function(){
	if (check_session() === 'true') {
		var cash_no = $('#id-inp-cash_count_no-entrycc').val();
		var user = $('#nik-login').html();
		var adh = $('#id-slc-appr_by-entrycc :checked').val();
		var keterangan = $('#inp-ket-entrycc').val();
		//var nik_login = $('#nik-login').text(); //edited

		//edited by 15997196
			if(user.includes(adh)){
			alert_warning('Job yang dipilih untuk melakukan approval tidak boleh sama dengan job code yang melakukan Entry Cash Count.');
			return false;
		}

		alert_confirm( 'CASH COUNT NO : '+cash_no + ' AKAN DI SUBMIT?', function() {
			submitCashNO(cash_no,adh,keterangan,user);
		});
	}else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

// BTN CANCEL
$('#id-btn-cancel-entrycc').click(function(){
	if (check_session() === 'true') {
		var cash_no = $('#id-inp-cash_count_no-entrycc').val();
		var user = $('#nik-login').html();
		alert_confirm( 'CASH COUNT NO : '+cash_no + ' AKAN DI CANCEL?', function() {
			cancelCashNO(cash_no,user);
		});
	}else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});


//BTN SAVE
$('#id-btn-save-entrycc').click(function(){
	if (check_session() === 'true') {
		deb();
		var arrayData = [];
		var tot_nominal = 	 Number(accounting.unformat($('#id-inp-tot_nominal-entrycc').val()));
		var modal_kasir = Number(accounting.unformat($('#id-inp-uang_modal_kasir-entrycc').val()));
		var user = $('#nik-login').html();
		var adh = $('#id-slc-appr_by-entrycc :checked').val();
		var adh_job = $('#id-slc-appr_by-entrycc :checked').attr("job");
		var keterangan = $('#inp-ket-entrycc').val();
		var status = 0;
		var cash_no = $('#id-inp-cash_count_no-entrycc').val();
		var nik_login = $('#nik-login').text();
		// validasi job entry cc != appr	
		/*if (list_user_job.includes(adh_job)) {
			alert_warning('Job yang dipilih untuk melakukan approval tidak boleh sama dengan job code yang melakukan Entry Cash Count.');
			return false;
		}*/

		if ($('#id-inp-cash_count_no-entrycc').val() == '') {
			status = 0;
		}else{
			status = 1;
		}
		//edited by 15997196
		// if (tabel_cash_no.rows().flatten().length == 0) {
		// 	alert_error('TIDAK DAPAT PROSES, TERDAPAT KESALAHAN => Gagal get Nominal Uang');
		// 	return false;
		// }  else 
		if (adh == '') {
			alert_warning('PILIH ADH TERLEBIH DAHULU');
			$('#inp-appr-entryCC').addClass('has-error');
			document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
			return false;
		}else if(keterangan == ''){
			alert_warning('ISI KETERANGAN TERLEBIH DAHULU');
			$('#textarea-keterangan-entryCC').addClass('has-error');
			return false;
		}else{
			$('#textarea-keterangan-entryCC').removeClass('has-error');
			$('#inp-appr-entryCC').removeClass('has-error');
			for (var i = 0; i < $('.jml-fisik').length; i++) {
				var jml_fisik = Number($('.jml-fisik')[i].value);
				var jml_nominal =  Number(accounting.unformat($('.tot_nominal')[i].value));
				var denominal = Number($('.jml-fisik')[i].id);
				var domain_id = $('#id-inp-domain_id-entryCC').val();
				var batch = $('#id-inp-batch-entrycc').val();
				var branch_location = $('#id-loaction-casier').val().trim();
				if ($('.jml-fisik')[i].value == '') {
					alert_warning('isi terlebih dahulu kolom jumlah fisik : '+accounting.formatMoney(denominal,'Rp ', 2, ',', '.'));
					$('#'+denominal).css('border','2px solid #de0000');
					return;
				}else{
					$('#'+denominal).css('border','1px solid rgb(175, 167, 167)');
				}
				arrayData.push({
					denominal,
					jml_fisik,
					jml_nominal
				});
			}
		}

		//edited
		/*if (list_user_job.includes(adh_job)) {
			alert_warning('Job yang dipilih untuk melakukan approval tidak boleh sama dengan job code yang melakukan Entry Cash Count.');
			return false;
		}*/
		alert_confirm( 'APAKAH YAKIN INGIN SAVE ?', function() {
			saveData(arrayData,tot_nominal,modal_kasir,user,adh,keterangan,domain_id,status,cash_no,batch,branch_location,data_gantung,
				status_save);

		});

	}else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}

});

	// VALIDASI ONLY NUMBER
	$('#dt-table-entr_cashcount-rks tbody').on('keydown','.inp-number',function(e) {
		-1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) 
		&& (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode 
		&& 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) 
		&& (96 > e.keyCode || 105 < e.keyCode)
		&& e.preventDefault()
	});


	$('#dt-table-entr_cashcount-rks tbody').on('blur','.jml-fisik',function(){
		var nominal = Number($(this).attr('data-nominal'));
		var fisik = Number(this.value);
		if (this.value == "") {
			$('#jml-nominal-'+nominal).val(null);
		}else{
			$('#jml-nominal-'+nominal).val(accounting.formatMoney(nominal*fisik, 'Rp ', 2, ',', '.'));
		}
	});


//TOTAL NOMINAL
$('#dt-table-entr_cashcount-rks tbody').on('blur','.jml-fisik',function(){
	var jml_nominal = $('.tot_nominal');
	var total = 0;
	for (var i = 0; i < jml_nominal.length; i++) {
		var per_nominal = Number(accounting.unformat(jml_nominal[i].value));
		total += per_nominal;
	}
	$('#id-inp-tot_nominal-entrycc').val(accounting.formatMoney(total, 'Rp ', 2, ',', '.'));
});

// on focus format money field modal kasir

$('#id-inp-uang_modal_kasir-entrycc').on('focus',function(){
	this.value = accounting.unformat(this.value);
});


$('#id-inp-uang_modal_kasir-entrycc').on('blur',function(){
	this.value = accounting.formatMoney(this.value, 'Rp ', 2, ',', '.');
});

var list_user_job = [];
function getAdh(){
	$.ajax({
		url:base_url+'Controller_rekon_kasir/getEmployeeADH',
		type:'POST',
		success:function(response){
			if (response.includes('error')) {
				alert_error(response);
				return false;
			}
			console.log(response);
			try{
				deb();
				var data = $.parseJSON(response);
				var user_job = [];
					// get user job 
					for (var i = 0; i < data.job.length; i++) {
						list_user_job.push(data.job[i].job_desc);
					}
					var data = $.parseJSON(data['data']);
					$('<option/>').val('').html('- PILIH USER APPROVAL -').appendTo('#id-slc-appr_by-entrycc').addClass('form-control');
					$('<option/>').val('').html('- PILIH USER APPROVAL -').appendTo('#id-inp-appr_by-apprcc2').addClass('form-control');
					
					for (var i = 0; i < data['data1'].length; i++) {
						$('#id-slc-appr_by-entrycc').append('<option job="'+data['data1'][i].job+'" value="' + data['data1'][i].nik  +
							'">' + data['data1'][i].nik +' - '+data['data1'][i].adh_name + '</option>');

					}
					for (var i = 0; i < data['data'].length; i++) {
					$('#id-inp-appr_by-apprcc2').append('<option job="'+data['data'][i].job+'" value="' + data['data'][i].nik  +
							'">' + data['data'][i].nik +' - '+data['data'][i].adh_name + '</option>');
				}

				}catch(e) {
					$('#loading-ajax').hide(); 
					console.log(e);
					alert_error("Galat" + e);
				}
			},error:function(response){
				console.log(response);
			}
		});
}
// var tbl1 = $('#id-tabel-list_cash_no-rks').DataTable(
function deb(){
	debugger;
}

function getListCashNo(branch,user){
	$.ajax({
		url:base_url+'Controller_rekon_kasir/get_list_cash_no',
		type:'POST',
		data:{branch,user},
		success:function(response){
			console.log(response);
			if (response.includes('error')) {
				alert_error(response);
				return false;
			}
			var data = JSON.parse(response);
			try{
				data = JSON.parse(data);
				if (data['data'].length == 0) {
					alert_info('DATA TIDAK DITEMUKAN');
					return false;
				}
				tabel_cash_no.clear().draw();
				var array = [];
				var no = 1;
				$.each(data['data'], function(index) {
					array.push([
						no,
						this['cash_no']
						])
					no++;
				});
				tabel_cash_no.rows.add(array).draw();

				$('#modal-cash_no-rks').modal('show');
				// var tbl2 = $('#id-tabel-list_cash_no-rks').DataTable();
			}catch(e) {
				$('#loading-ajax').hide(); 
				console.log(e);
				alert_error("Galat" + e);
			}
		},error:function(response){
			console.log(response);
		}
	});
}

$('#modal-cash_no-rks').on('hidden', function () {
	tbl1.destroy();
})

function getDetailCashNo(cash_no,user){
	$.ajax({
		url:base_url+'Controller_rekon_kasir/get_detail_cash_no',
		type:'POST',
		data:{cash_no,user},
		success:function(response){
			console.log(response);
			if (response.includes('error')) {
				alert_error(response);
				return false;
			}
			var data = JSON.parse(response);
			try{
				data = JSON.parse(data);
				var array = [];
				if (data.data.list_data.length == 0) {
					alert_info('DATA TIDAK DITEMUKAN');
					return false;
				}
				var no = 1;

				$('#id-inp-cash_count_no-entrycc').val(data['data']['cash_no']);
				$('#id-inp-date-entrycc').val(data['data']['date']);
				$('#id-inp-casier-entrycc').val(data['data']['kasir']+' - '+data['data']['cashier_name']);
				$('#inp-ket-entrycc').val(data['data']['keterangan']);
				$('#id-inp-uang_modal_kasir-entrycc').val(accounting.formatMoney(data['data']['modal_kasir'], 'Rp ', 2, ',', '.'));
				$('#id-inp-time-entrycc').val(data['data']['time']);
				$('#id-inp-tot_nominal-entrycc').val(accounting.formatMoney(data['data']['tot_nominal'],'Rp ', 2, ',', '.'));
				$('#id-inp-domain_id-entryCC').val(data['data']['tot_nominal']);
				$('#id-inp-batch-entrycc').val(data['data']['batch_no']);
				$('#id-slc-appr_by-entrycc').val(data['data']['adh']);
				$('#id-inp-domain_id-entryCC').val(data['data']['list_data'][0].domain_id);
				$('#dt-table-entr_cashcount-rks>tbody>tr').remove();
				for (var i = 0; i < data['data']['list_data'].length; i++) {
					$('#dt-table-entr_cashcount-rks tbody').append("<tr><td><input type='text'  value='"+accounting.formatMoney(data['data']['list_data'][i].denominal, 'Rp ', 2, ',', '.')+"' disabled='' /></td><td><input type='text' data-nominal='"+data['data']['list_data'][i].denominal+"' class='jml-fisik inp-number' value='"+data['data']['list_data'][i].jml_fisik+"' id='"+data['data']['list_data'][i].denominal+"'/></td><td><input type='text' class='tot_nominal' value='"+accounting.formatMoney(data['data']['list_data'][i].jml_nominal, 'Rp ', 2, ',', '.')+"'  disabled='' id='jml-nominal-"+data['data']['list_data'][i].denominal+"'/></td></tr>");
				}
				$('#id-inp-uang_modal_kasir-entrycc').prop('disabled', false);
				$('#id-btn-submit-entrycc').prop('disabled',false);
				$('#id-inp-cash_count_no-entrycc').prop('disabled',true);
				$('#btn-search-cash_no').prop('disabled',true);
				$('#modal-cash_no-rks').modal('hide');
				$('#id-btn-save-entrycc').prop('disabled',false);
				$('#id-btn-cancel-entrycc').prop('disabled',false);
				// $('#id-btn-print-entrycc').prop('disabled', false);
				$('#inp-ket-entrycc').prop('disabled',false);
				if (data['data']['status'] == '4') {
					status_save = 4;
					$('#id-btn-print-entrycc').prop('disabled', true);
					$('#id-btn-submit-entrycc').prop('disabled',true);
					$('#inp-ket_revise-entrycc').val(data['data']['approval_note']);
					$('#id-div-reason').show();
				}else if(data['data']['status'] == '2') {
					$('#id-div-reason').hide();
					status_save = 2;
					$('#id-btn-print-entrycc').prop('disabled', false);
					$('.jml-fisik').prop('disabled',true);
					$('#id-inp-uang_modal_kasir-entrycc').prop('disabled', true);
					$('#inp-ket-entrycc').prop('disabled',true);
					$('#id-inp-cash_count_no-entrycc').prop('disabled',false);
					$('#btn-search-cash_no').prop('disabled',false);
					$('#id-btn-submit-entrycc').prop('disabled',true);
					$('#id-slc-appr_by-entrycc').prop('disabled',true);
					$('#id-btn-save-entrycc').prop('disabled',true);
					$('#id-btn-cancel-entrycc').prop('disabled',true);
				}else if(data['data']['status'] == '1' && $('#id-inp-casier-entrycc').val().substring(0,8) == $('#nik-login').text()) {
					$('#id-div-reason').hide();
					$('#id-inp-uang_modal_kasir-entrycc').prop('disabled', true);
					$('#id-btn-print-entrycc').prop('disabled', true);
					$('.jml-fisik').prop('disabled',true);
					$('#inp-ket-entrycc').prop('disabled',true);
					$('#id-inp-cash_count_no-entrycc').prop('disabled',false);
					$('#btn-search-cash_no').prop('disabled',false);
					$('#id-btn-submit-entrycc').prop('disabled',true);
					$('#id-slc-appr_by-entrycc').prop('disabled',true);
					$('#id-btn-save-entrycc').prop('disabled',true);
					$('#id-btn-cancel-entrycc').prop('disabled',false);
				}else{
					$('#id-btn-print-entrycc').prop('disabled', true);
					$('#id-div-reason').hide();
				}
				//penambahan



			}catch(e) {
				$('#loading-ajax').hide(); 
				console.log(e);
				alert_error("Galat" + e);
			}
		},error:function(response){
			console.log(response);
		}
	});
}
function getNominal(){
	$.ajax({
		url:base_url+'Controller_rekon_kasir/get_nominal',
		type:'GET',
		success:function(response){
			console.log(response);
			if (response.includes('error')) {
				alert_error(response);
				return false;
			}
			try{
				var data = JSON.parse(response);
				for (var i = 0; i < data['listNominal'].length; i++) {
					$('#dt-table-entr_cashcount-rks tbody').append("<tr><td><input type='text'  value='"+accounting.formatMoney(data['listNominal'][i].domain_value, 'Rp ', 2, ',', '.')+"' disabled='' /></td><td><input type='text' data-nominal='"+data['listNominal'][i].domain_value+"' maxlength='"+9+"' class='jml-fisik inp-number' value='"+0+"' id='"+data['listNominal'][i].domain_value+"'/></td><td><input type='text' class='tot_nominal'  disabled='' value='Rp 0.00' id='jml-nominal-"+data['listNominal'][i].domain_value+"'/></td></tr>");
				}
				$('#id-inp-domain_id-entryCC').val(data['listNominal'][0].domain_id);
				$('#id-rounding-csc').val(data['round_amount']);
				$('#id-inp-uang_modal_kasir-entrycc').val(accounting.formatMoney(data['modal_kasir'], 'Rp ', 2, ',', '.'));
			}catch(e) {
				$('#loading-ajax').hide(); 
				console.log(e);
				alert_error("Galat" + e);
			}
		},error:function(){

		}
	});
}

function saveData(arrayData,tot_nominal,modal_kasir,user,adh,keterangan,domain_id,status,cash_no,batch,branch_location,data_gantung,
	status_save){
	$.ajax({
		url:base_url+'Controller_rekon_kasir/save_data',
		type:'POST',
		data:{arrayData,tot_nominal,modal_kasir,user,adh,keterangan,domain_id,status,cash_no,batch,branch_location,data_gantung,
			status_save},
			success:function(response){
				console.log(response);
				if (response.includes('error')) {
					alert_error(response);
					return false;
				}
				var alert_data = JSON.parse(response);
				try{
					alert_data = JSON.parse(alert_data);
					if (alert_data['status'] === '500' ) {
						alert_warning(alert_data['msg']);
						return false;
					}else{
						alert_info(alert_data['msg']+' dengan nomor pengajuan : '+alert_data['cash_no']);
						// $('#id-btn-print-entrycc').prop('disabled', false); -- DI UBAH KEBUTUHAN SETELAH APPR HANYA BISA CETAK
						$('#id-inp-cash_count_no-entrycc').prop('disabled',true);
						$('#btn-search-cash_no').prop('disabled',true);
					}

					$('#id-inp-cash_count_no-entrycc').val(alert_data['cash_no']);
					$('#id-inp-date-entrycc').val(alert_data['date']);
					$('#id-inp-time-entrycc').val(alert_data['time']);
					$('#id-inp-batch-entrycc').val(alert_data['batch']);
				// $('#id-btn-save-entrycc').prop('disabled',true);
				$('#id-btn-cancel-entrycc').prop('disabled',false);
				$('#id-btn-submit-entrycc').prop('disabled',false);
				// $('#inp-ket-entrycc').prop('disabled',true);
				// $('.jml-fisik').prop('disabled',true);
			}catch(e) {
				$('#loading-ajax').hide(); 
				console.log(e);
				alert_error("Galat" + e);
			}
		},error:function(){

		}
	});
}

function cancelCashNO(cash_no,user){
	$.ajax({
		url:base_url+'Controller_rekon_kasir/cancel_cash_no',
		type:'POST',
		data:{cash_no,user},
		success:function(response){
			console.log(response);
			var data = JSON.parse(response);
			data = JSON.parse(data);
			try{
				if (data['status'] == '200') {
					alert_info(data['msg'],function(){
						location.reload();
					});
				}	else if (data['status'] == '500') {
					alert_error(data['msg'] );
				}

			}catch(e) {
				$('#loading-ajax').hide(); 
				console.log(e);
				alert_error("Galat" + e);
			}
		},error:function(response){
			console.log(response);
		}
	});
}
function submitCashNO(cash_no,adh,keterangan,user){
	$.ajax({
		url:base_url+'Controller_rekon_kasir/submit_cash_no',
		type:'POST',
		data:{cash_no,adh,keterangan,user},
		success:function(response){
			console.log(response);
			var data = JSON.parse(response);
			data = JSON.parse(data);
			try{

				if (data['status'] == '200') {
					alert_info(data['msg'],function(){
						location.reload();
					} );
					$('#id-btn-save-entrycc').prop('disabled', true);
					$('.jml-fisik').prop('disabled', false);
					$('#id-btn-cancel-entrycc').prop('disabled', true);
					$('#id-btn-submit-entrycc').prop('disabled',true);
				}	else if (data['status'] == '500') {
					alert_error(data['msg'] );
				}

			}catch(e) {
				$('#loading-ajax').hide(); 
				console.log(e);
				alert_error("Galat" + e);
			}
		},error:function(response){
			console.log(response);
		}
	});
}

function printCashCount(cash_no,user){
	$.ajax({
		url:base_url+'Controller_rekon_kasir/print_by_cash_no',
		type:'POST',
		data:{cash_no,user},
		success:function(response){
			console.log(response);
			var data = JSON.parse(response);
			try{
				data = JSON.parse(data);
				var array = [];
				var no = 1;
				$('#id-inp-data_cetak-entrycc').val(response);
				$( "#idForm" ).submit();
				//


			}catch(e) {
				$('#loading-ajax').hide(); 
				console.log(e);
				alert_error("Galat" + e);
			}
		},error:function(response){
			console.log(response);
		}
	});
}

} //WHEN MENU ALIAS CLICKED 