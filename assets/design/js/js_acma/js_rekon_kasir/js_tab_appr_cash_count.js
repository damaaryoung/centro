
var tabel_appr_cash_no = $("#id-table-appr-cashCount").DataTable({
	
});

var tabel_pv_cash_no = $("#id-table-pv-cashCount").DataTable({
	"columnDefs": [
	{
		"targets": [ 9 ],
		"visible": false,
		"responsive": true,    
	}]
});

var tabel_trail_cash_no = $("#id-table-trail-cashCount").DataTable({
	ordering: false
});


var tabel_pv_head_cash_no = $("#id-tabel-pv-rks").DataTable({
	"columnDefs": [
	{
		"targets": [ 6,7,8,9 ],
		"visible": false,
		"responsive": true,    
	}]
});

$('#id-detail_appr_ecc').hide();
var selisih ;
var amount;
var total_selisih ;
var total_rekon;
var list_pv_selected = [];
var amount_pv = 0;
var rv_total = 0;
var round_amount = 0;
var modal_kasir = 0;

$('#id-inp-pembulatan-apprcc').on('keyup',function(){
	var max_round = Number($('#id-rounding-csc').val());
	var modal_kasir = accounting.unformat($('#id-inp-uang_modal_kasir-apprcc').val());
	if (accounting.unformat(this.value) > max_round) {
		alert_warning('Nilai Pembulatan tidak boleh melebihi '+accounting.formatMoney(max_round, '', 2, ',', '.'));
		return false;
	}
	amount = Number(this.value);
	var rv_total = Number(accounting.unformat($('#id-inp-rv_total-apprcc').val()));
	total_rekon = Number(accounting.unformat($('#id-inp-tot_nominal-apprcc').val())); 
	if (amount > max_round) {
		alert_warning('Nilai Pembulatan tidak boleh melebihi '+accounting.formatMoney(max_round, '', 2, ',', '.'));
		this.value = 0;
		$('#id-inp-selisih_saldo-apprcc').val(accounting.formatMoney(total_rekon + rv_total, '', 2, ',', '.'));
		return false;
	}else{
		if (selisih.includes('-')) {
			total_selisih = rv_total - amount;
		}else{
			total_selisih = amount + rv_total;
		}

	  $('#id-inp-selisih_saldo-apprcc').val(accounting.formatMoney(total_rekon - total_selisih - modal_kasir + amount_pv, '', 2, ',', '.'));
	  //$('#id-inp-selisih_saldo-apprcc').val(accounting.formatMoney(total_rekon + rv_total - modal_kasir - amount_pv + amount, '', 2, ',', '.')); //edited by 15997196
	}
	deb();
	round_amount = amount;
});
function deb(){
	debugger;
}
$('#id-inp-pembulatan-apprcc').on('blur',function(){

	this.value = accounting.formatMoney(amount, '', 2, ',', '.');		

});

$('#id-inp-pembulatan-apprcc').on('click',function(){
	var amount = this.value;
	this.value = accounting.unformat(amount);
});

$('#id-btn-hdr-apprCc').on('click',function(){
	var branch_code = $('#branch-id-rks').val();
	var nik_adh = $('#nik-login').text();
	getDataAppr(nik_adh,branch_code);
});

$('#id-btn-approve-rks').on('click',function(){
	var selisih = Number(accounting.unformat($('#id-inp-selisih_saldo-apprcc').val()));
	var appr_note = $('#inp-reason-apprcc').val();
	var cash_no = $('#id-inp-cash_count_no-apprcc').val();
	var nik_adh = $('#nik-login').text();
	round_amount = accounting.unformat($('#id-inp-pembulatan-apprcc').val());
	var tbl_pv = tabel_pv_cash_no.rows().flatten().length;
	var nik_appr = $('#id-inp-appr_by-apprcc2 :selected').val();
	var list_pv = "";
	if (tbl_pv > 0 && nik_appr == "") {
		alert_warning('Pilih User Approval correction terlebih dahulu');
		$('#div-appr-corr').addClass('has-error');
		$('html, body').animate({scrollTop:800}, 'slow');
		return false;
	}else if(tbl_pv > 0 && nik_appr != "" ){
		for (var i = 0; i < tbl_pv; i++) {
			list_pv = list_pv+tabel_pv_cash_no.data()[i][9]+",";
		}
		list_pv = list_pv.substring(0,list_pv.length-1);
	}
	$('#div-appr-corr').removeClass('has-error');
	alert_confirm( 'CASH COUNT NO : '+cash_no + ' AKAN DI APPROVE?', function() {
		apprCashNo(cash_no,nik_adh,appr_note,round_amount,list_pv,nik_appr);
	});


});

$('#id-btn-appr-apprcc').on('click',function(){
	var selisih = Number(accounting.unformat($('#id-inp-selisih_saldo-apprcc').val()));
	var appr_note = $('#inp-reason-apprcc').val();

	//validasi correction by zikri
	var nik_login = $('#nik-login').text();
	var adh = $('#id-inp-appr_by-apprcc2 :checked').val();
	var vadi = document.getElementById ('id-inp-appr_by-apprcc2');
	var adh_lagi = $('#id-inp-appr_by-apprcc2 :checked').attr("job"); //edited 10 Maret 2020
	var kasir = $('#id-inp-casier-job').val();  //edited 10 Maret 2020
	var approve = $('#id-inp-appr_by-job').val(); //edited 10 Maret 2020

	if(kasir.includes(adh_lagi)){
		alert_warning('Job code yang dipilih untuk melakukan Approval tidak boleh sama dengan Job Kasir');
			return false;
		}else if (approve.includes(adh_lagi)){
			alert_warning('Job code yang dipilih untuk melakukan Approval tidak boleh sama dengan Job Approval Correction');
			return false;
		}
	
	if (check_session() === 'true') {
		if (appr_note == '') {
			alert_warning('Isi Reason terlebih dahulu');
			$('#textarea-keterangan-revise-apprCC').addClass('has-error');
			$('html, body').animate({scrollTop:600}, 'slow');
			return false;
		}
		if ( selisih == 0) {
			$('#textarea-keterangan-revise-apprCC').removeClass('has-error');
			var cash_no = $('#id-inp-cash_count_no-apprcc').val();
			var nik_adh = $('#nik-login').text();
			var round_amount = accounting.unformat($('#id-inp-pembulatan-apprcc').val());
			var tbl_pv = tabel_pv_cash_no.rows().flatten().length;
			var nik_appr = $('#id-inp-appr_by-apprcc2 :selected').val();
			var list_pv = "";

			if (tbl_pv > 0 && nik_appr == "") {
				alert_warning('Pilih User Approval correction terlebih dahulu');
				$('#div-appr-corr').addClass('has-error');
				$('html, body').animate({scrollTop:800}, 'slow');
				return false;
			}else if(tbl_pv > 0 && nik_appr != "" ){
				for (var i = 0; i < tbl_pv; i++) {
					list_pv = list_pv+tabel_pv_cash_no.data()[i][9]+",";
				}
				list_pv = list_pv.substring(0,list_pv.length-1);
			}
			
			$('#id-inp-cash_count_no-info').val(cash_no); 
			$('#id-inp-nik-info').val($('#id-inp-casier-apprcc').val().split("-")[0]);
			$('#id-inp-name-info').val($('#id-inp-casier-apprcc').val().split("-")[1]);
			$('#id-inp-cash_count_total-info').val($('#id-inp-tot_nominal-apprcc').val());
			$('#id-inp-modal_kasir-info').val($('#id-inp-uang_modal_kasir-apprcc').val());
			$('#id-inp-selisih-info').val($('#id-inp-selisih_saldo-apprcc').val());

			deb();
			//validasi by 15997196 15 Januari 2020
	if(selisih == 0 && tbl_pv == 0 || vadi.disabled ){
		if (nik_login.includes(adh)) { 
		 	localStorage.clear();
		 }
		}else{
			if (nik_login.includes(adh)) { 	
			alert_warning('Job code yang dipilih untuk melakukan approval tidak boleh sama dengan job code yang melakukan PV Corection');
		 	return false;	 	
		 }
		}

			$('#modal-approval-rks').modal('show');
			// alert_confirm( 'CASH COUNT NO : '+cash_no + ' AKAN DI APPROVE?', function() {
			// 	apprCashNo(cash_no,nik_adh,appr_note,round_amount,list_pv,nik_appr);
			// });
		}else{
			alert_warning('Tidak Dapat melakukan Approve Selisih Saldo harus  Rp. 0.00 ');
			$('html, body').animate({scrollTop:0}, 'slow');
			return false;
		}
		

	}else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}

});
function deb(){
	debugger;
}
$('#id-btn-revise-apprcc').on('click',function(){
	if (check_session() === 'true') {
		var cash_no = $('#id-inp-cash_count_no-apprcc').val();
		var nik_adh = $('#nik-login').text();
		var appr_note = $('#inp-reason-apprcc').val();
		//validasi correction by zikri
		var adh = $('#id-inp-appr_by-apprcc2 :checked').val();
		var adh_job = $('#id-inp-appr_by-apprcc2 :checked').attr("job");

		//Validasi job correction tidak boleh sama dengan job approval by zikri
		if (adh.includes(nik_adh)) { 
			alert_warning('Job yang dipilih untuk melakukan Revise tidak boleh sama dengan Job yang melakukan approval.');
			return false;
		}

		if (appr_note == '') {
			alert_warning('Isi Reason terlebih dahulu');
			$('#textarea-keterangan-revise-apprCC').addClass('has-error');
			return false;
		}else{
			$('#textarea-keterangan-revise-apprCC').removeClass('has-error');
			alert_confirm( 'CASH COUNT NO : '+cash_no + ' AKAN DI AJUKAN REVISI ?', function() {
				reviseCashNo(cash_no,nik_adh,appr_note);
			});
		}
		
	}else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

$('#id-table-appr-cashCount tbody').on('click','.btn-detail-cc',function(){
	$('input:text').not('#id-inp-casier-entrycc').val('');
	$('textarea').val('');
	$('#id-inp-pembulatan-apprcc').val('0');
	var cash_no = tabel_appr_cash_no.row($(this).closest('tr')).data()[4];
	getDetailCashNoAppr(cash_no)
});

$('#id-btn-print-apprcc').click(function(){
	if (check_session() === 'true') {
		var cash_no = $('#id-inp-cash_count_no-apprcc').val();
		// var user = $('#id-inp-casier-apprcc').val().substring(0,8);
		var user = $('#nik-login').text();
		alert_confirm( 'CASH COUNT NO : '+cash_no + ' AKAN DI CETAK?', function() {
			printCashCountAppr(cash_no,user);
		});
	}else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

$('#id-btn-pilih-pv-rks').click(function(){
	var list_data = tabel_pv_head_cash_no.data();
	var list_data_pv = tabel_pv_cash_no.data();
	var arrayData = [];
	var list_pv_backup  = [];
	for (var i = 0; i < list_pv_selected.length; i++) {
		list_pv_backup.push(list_pv_selected[i]);
	}
	var amount_pv_backup = amount_pv;
	var no = 0;
	var length_checked = $('.check-pv-rks:checked').not('#check-tbl-pv-rks').length;

	if (length_checked < 1) {
		alert_warning('Pilih salah satu pv terlebih dahulu');
		return false;
	}

	for (var i = 0; i < list_data.length; i++) { 
		if ($('#check-tbl-pv-rks'+i).is(":checked")) {
			if (!list_pv_selected.includes(tabel_pv_head_cash_no.data()[i][1])) {
				amount_pv = amount_pv + Number(Number(accounting.unformat(tabel_pv_head_cash_no.data()[i][3])));
				arrayData.push([
					tabel_pv_head_cash_no.data()[i][1],
					tabel_pv_head_cash_no.data()[i][2],
					tabel_pv_head_cash_no.data()[i][3],
					tabel_pv_head_cash_no.data()[i][9],
					tabel_pv_head_cash_no.data()[i][8],
					tabel_pv_head_cash_no.data()[i][4],
					tabel_pv_head_cash_no.data()[i][7],
					tabel_pv_head_cash_no.data()[i][5],
					'<button type="button"  class="btn btn-danger btn-delete-pv-cc" id="id-btn-pv-acc"'+no+' >delete</button>',
					tabel_pv_head_cash_no.data()[i][6]
					]);
				list_pv_selected.push(tabel_pv_head_cash_no.data()[i][1]);

			}else{
				alert_warning('Nomor Pv '+tabel_pv_head_cash_no.data()[i][1]+' sudah dipilih');
				amount_pv = amount_pv_backup;
				list_pv_selected = [];
				for (var i = 0; i < list_pv_backup.length; i++) {
					list_pv_selected.push(list_pv_backup[i]);
				}
				return false
			}
			no++;
		}

	}
	tabel_pv_cash_no.rows.add(arrayData).draw();
	$('#id-inp-selisih_saldo-apprcc').val(accounting.formatMoney(Number(accounting.unformat(selisih)) + amount_pv, '', 2, ',', '.')); // edited by 15997196
	$('#modal-pv-rks').modal('hide');
});

$('#id-btn-addPv-apprcc').click(function(){
	$('#check-tbl-pv-rks').prop('checked',false);
	var branch_code = $('#branch-id-rks').val();
	getDataPv(branch_code);
});

$("#id-table-pv-cashCount").on('click','.btn-delete-pv-cc',function(e) {
	debugger;
	var pv_no = tabel_pv_cash_no.row($(this).closest('tr')).data()[0];
	var select_amt = tabel_pv_cash_no.row($(this).closest('tr')).data()[2];
	var total_selisih = Number(accounting.unformat($('#id-inp-selisih_saldo-apprcc').val())); 
	var total_rekon = Number(accounting.unformat($('#id-inp-tot_nominal-apprcc').val())); 
	var modal_kasir = accounting.unformat($('#id-inp-uang_modal_kasir-apprcc').val());
	amount_pv = amount_pv-accounting.unformat(select_amt);
	list_pv_selected = arrayRemove(list_pv_selected,pv_no);
	tabel_pv_cash_no.row($(this).closest('tr')).remove();
	var whichtr = $(this).closest("tr");
	whichtr.remove();
	if (total_selisih == total_rekon + rv_total - modal_kasir){  
	$('#id-inp-selisih_saldo-apprcc').val(accounting.formatMoney(Number(accounting.unformat(amount_pv)) - rv_total, '', 2, ',', '.')); //edited by 15997196 15 Januari 2020
	//$('#id-inp-selisih_saldo-apprcc').val(accounting.formatMoney(total_rekon + rv_total - modal_kasir - amount_pv + round_amount, '', 2, ',', '.'));    
	}else{
		$('#id-inp-selisih_saldo-apprcc').val(accounting.formatMoney(Number(accounting.unformat(total_rekon))- modal_kasir - rv_total + amount_pv, '', 2, ',', '.'));
	}
});

$("#check-tbl-pv-rks").click(function(){
	$('input:checkbox').not(this).prop('checked', this.checked);
});


$("#id-tabel-pv-rks").on('click','.check-pv-rks',function(e) {
	var length_check = $('.check-pv-rks').not('#check-tbl-pv-rks').length;
	var length_checked = $('.check-pv-rks:checked').not('#check-tbl-pv-rks').length;
	if (length_check != length_checked) {
		$('#check-tbl-pv-rks').prop('checked',false);
	}else{
		$('#check-tbl-pv-rks').prop('checked',true);
	}
});


function getDataPv(branch_code){
	$.ajax({
		url:base_url+'Controller_rekon_kasir/get_data_pv',
		type:'POST',
		data:{branch_code},
		success:function(response){
			console.log(response);
			var data = JSON.parse(response);
			try{
				data = JSON.parse(data);
				if (data['data'].length == 0) {			
					alert_warning('DATA PV TIDAK DITEMUKAN');
					return false;
				}
				tabel_pv_head_cash_no.clear().draw();
				var array = [];
				var no = 1;
				$.each(data['data'], function(index) {
					array.push([
						'<input class="check-pv-rks" id="check-tbl-pv-rks'+index+'" type="checkbox">',
						this['payment_no'],
						this['class_code'],
						accounting.formatMoney(this['amount'], '', 2, ',', '.'),
						this['customer_name'],
						this['paid_date'],
						this['pv_id'],
						this['payment_type'],
						this['customer_no'],
						this['remarks']
						])
					no++;
				});
				tabel_pv_head_cash_no.rows.add(array).draw();
				$('#modal-pv-rks').modal('show');
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

function getDataAppr(nik_adh,branch_code){
	$.ajax({
		url:base_url+'Controller_rekon_kasir/get_data_appr',
		type:'POST',
		data:{nik_adh,branch_code},
		success:function(response){
			console.log(response);
			var data = JSON.parse(response);
			try{
				data = JSON.parse(data);
				if (data['data'].length == 0) {			
					return false;
				}
				tabel_appr_cash_no.clear().draw();
				var array = [];
				var no = 1;
				$.each(data['data'], function(index) {
					array.push([
						this['branch_code'],
						this['branch_location'],
						this['user'],
						this['cashier_name'],
						this['cash_no'],
						this['submit_date'],
						this['batch_no'],
						'<a type="button" href="#" class="btn-detail-cc" id="id-btn-detail-acc"'+index+'>View<a/>'
						])
					no++;
				});
				// $('#id-inp-uang_transit-apprcc').val(accounting.formatMoney(data['amount_h'],'Rp ', 2, ',', '.'));
				// $('#id-inp-selisih_saldo-apprcc').val(accounting.formatMoney(data['selisih_amount'],'Rp ', 2, ',', '.'));
				tabel_appr_cash_no.rows.add(array).draw();
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

function getDetailCashNoAppr(cash_no){
	$.ajax({
		url:base_url+'Controller_rekon_kasir/get_data_detail_appr',
		type:'POST',
		data:{cash_no},
		success:function(response){
			console.log(response);
			var data = JSON.parse(response);
			try{
				data = JSON.parse(data);
				$('#content-appr').hide();
				$('#id-detail_appr_ecc').show();
				$('#id-inp-cash_count_no-apprcc').val(data['data']['cash_no']);
				$('#id-inp-date-apprcc').val(data['data']['date']);
				$('#id-inp-casier-apprcc').val(data['data']['kasir']+' - '+data['data']['cashier_name']);
				$('#inp-ket-apprcc').val(data['data']['keterangan']);
				$('#id-inp-uang_modal_kasir-apprcc').val(accounting.formatMoney(data['data']['modal_kasir'],'Rp ', 2, ',', '.'));
				$('#id-inp-time-apprcc').val(data['data']['time']);
				$('#id-inp-tot_nominal-apprcc').val(accounting.formatMoney(data['data']['tot_nominal'],'Rp ', 2, ',', '.'));
				$('#id-inp-domain_id-apprcc').val(data['data']['tot_nominal']);
				$('#id-inp-batch-apprcc').val(data['data']['batch_no']);
				$('#id-inp-appr_by-apprcc').val(data['data']['adh']+' - '+data['data']['adh_name']);
				$('#id-inp-domain_id-apprcc').val(data['data']['list_data'][0].domain_id);
				$('#id-inp-appr_by-job').val(data['data']['job_desc_appr']); //edited 10 Maret 2020
				$('#dt-table-entr_cashcount-rks>tbody>tr').remove();
				for (var i = 0; i < data['data']['list_data'].length; i++) {
					$('#dt-table-entr_cashcount-rks-appr tbody').append("<tr><td><input type='text'  value='"+accounting.formatMoney(data['data']['list_data'][i].denominal,'Rp ', 2, ',', '.')+"' disabled='' /></td><td><input type='text' disabled='' data-nominal='"+data['data']['list_data'][i].denominal+"' class='jml-fisik inp-number' value='"+data['data']['list_data'][i].jml_fisik+"' id='"+data['data']['list_data'][i].denominal+"'/></td><td><input type='text' class='tot_nominal' value='"+accounting.formatMoney(data['data']['list_data'][i].jml_nominal,'Rp ', 2, ',', '.')+"'  disabled='' id='jml-nominal-"+data['data']['list_data'][i].denominal+"'/></td></tr>");
				}

				$('#id-inp-uang_transit-apprcc').val(accounting.formatMoney(data['amount_h'], '', 2, ',', '.'));
				$('#id-inp-selisih_saldo-apprcc').val(accounting.formatMoney(data['selisih_amount'].replace(/,/g, '.'), '', 2, ',', '.'));
				$('#id-inp-rv_total-apprcc').val(data['rv_total'].replace(/,/g, '.'));
				$('#inp-reason-apprcc').val(data['data']['approval_note']);
				var array = [];
				tabel_pv_cash_no.clear().draw();
				$.each(data['data_pv'], function(index) {
					array.push([
						this['payment_no'],
						this['class_code'],
						accounting.formatMoney(this['amount'], '', 2, ',', '.'),
						this['remarks'],
						this['customer_no'],
						this['customer_name'],
						this['payment_type'],
						this['paid_date'],
						'<button type="button"  class="btn btn-danger btn-delete-pv-cc" id="id-btn-pv-acc" >delete</button>',
						this['pv_id']
						])

					list_pv_selected.push(this['payment_no']);

					amount_pv = amount_pv + this['amount'];
				});

				tabel_pv_cash_no.rows.add(array).draw();

				array = [];
				tabel_trail_cash_no.clear().draw();
				$.each(data['data_trail'], function(index) {
					array.push([
						this['nik'],
						this['cashier_name'],
						this['job'],
						accounting.formatMoney(this['tot_nominal'], '', 2, ',', '.'),
						this['status'],
						this['keterangan'],
						this['time']
						])
				});
				
				$('#id-inp-casier-job').val(data['data_trail'][0]['job']);

				tabel_trail_cash_no.rows.add(array).draw();
				var tbl_pv = tabel_pv_cash_no.rows().flatten().length;
				$('#id-inp-appr_by-apprcc2').val(data['data']['approval_pv']);

				if ($("#nik-login").text() == data['data']['approval_pv']) {
					$('.btn-delete-pv-cc').hide();
					$('#id-inp-appr_by-apprcc2').prop('disabled',true);
					$('#id-btn-addPv-apprcc').prop('disabled',true);
				}else{
					$('.btn-delete-pv-cc').show();
					$('#id-inp-appr_by-apprcc2').prop('disabled',false);
					$('#id-btn-addPv-apprcc').prop('disabled',false);
				}
				
				$('#id-btn-print-apprcc').prop('disabled',true);
				selisih = $('#id-inp-selisih_saldo-apprcc').val();
				rv_total = data['rv_total'].replace(/,/g, '.');
				var total_rekon = Number(accounting.unformat($('#id-inp-tot_nominal-apprcc').val())); 
				var modal_kasir = accounting.unformat($('#id-inp-uang_modal_kasir-apprcc').val());
				var round_amount = data['data']['round_amount'];
				$('#id-inp-pembulatan-apprcc').val(accounting.formatMoney(data['data']['round_amount'], '', 2, ',', '.'));
				$('#modal-cash_no-rks').modal('hide');
				$('#inp-ket-entrycc').prop('disabled',false);
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

function printCashCountAppr(cash_no,user){
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
				$('#id-inp-data_cetak-apprcc').val(response);
				$( "#idForm-appr" ).submit();
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

function apprCashNo(cash_no,nik_adh,appr_note,round_amount,list_pv,nik_appr){
	$.ajax({
		url:base_url+'Controller_rekon_kasir/approve_cash_no',
		type:'POST',
		data:{cash_no,nik_adh,appr_note,round_amount,list_pv,nik_appr},
		success:function(response){
			console.log(response);
			var data = JSON.parse(response);
			data = JSON.parse(data);
			try{
				if (data['status'] == '200') {	
					if (data['msg'].includes('LANJUT')) {
						alert_info(data['msg'],function (){
							location.reload();
						} );
					}else{
						alert_info(data['msg'],function (){
						/*window.location.reload();*/
						} );
						$('#modal-approval-rks').modal('hide');
						$('#id-btn-save-entrycc').prop('disabled', true);
						$('.jml-fisik').prop('disabled', false);
						$('#id-btn-revise-apprcc').prop('disabled', true);
						$('#id-btn-appr-apprcc').prop('disabled',true);
						$('#id-btn-print-apprcc').prop('disabled',false);
					}			
					list_pv_selected = [];
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
function reviseCashNo(cash_no,nik_adh,appr_note){
	$.ajax({
		url:base_url+'Controller_rekon_kasir/revise_cash_no',
		type:'POST',
		data:{cash_no,nik_adh,appr_note},
		success:function(response){
			console.log(response);
			var data = JSON.parse(response);
			data = JSON.parse(data);
			try{

				if (data['status'] == '200') {
					alert_info(data['msg'],function(){
						$('#id-btn-hdr-apprCc').click();
						selisih = 0 ;
						amount = 0;
						total_selisih = 0 ;
						total_rekon = 0;
						list_pv_selected = [];
						amount_pv = 0;
					} );
					$('#id-btn-save-entrycc').prop('disabled', true);
					$('.jml-fisik').prop('disabled', false);
					$('#id-btn-revise-apprcc').prop('disabled', true);
					$('#id-btn-appr-apprcc').prop('disabled',true);
					list_pv_selected = [];
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


function arrayRemove(arr, value) {

	return arr.filter(function(ele){
		return ele != value;
	});

}

$('.inp-number-rekon').on('keydown', function(e) {
	-1 !== $.inArray(e.keyCode, [190,46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) 
	&& (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode 
	&& 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) 
	&& (96 > e.keyCode || 105 < e.keyCode)
	&& e.preventDefault()
});
