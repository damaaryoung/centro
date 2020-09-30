/*--------------------------------------------------- INISIASI AWAL -----------------------------------------------------*/
var hasil_pencarian = '';
var hasil_nopv = '';

var table_insentif = $('#tbl-insentif-pv-ho').DataTable({
	"responsive" : true,
	"bFilter" : true,
	"bPaginate" : true,
	"bInfo" : true,
	//"scrollY" : "300px",
	//"scrollCollapse" : true,
	/*"columnDefs" : [
		{ "visible": false, "targets": [7,8,9,10], "className": 'hidden' }
	]*/
});

var tbl_bank_insentif = $('#tbl-bank-insentif').DataTable({
	"responsive" : true
});

$('#div-tgl-awl-fpd-insenpv').datetimepicker({
	format : 'DD-MMM-YYYY',
	maxDate : 'now',
	allowInputToggle : true

}).on("dp.change", function(e){
	var date = e.date;
	var dDate = date._d;
	var new_date = new Date(dDate);
	new_date.setDate(new_date.getDate() + 30);

	$('#div-tgl-akhir-fpd-insenpv').data("DateTimePicker").minDate(dDate);

	if (new_date > new Date(today)) {
		new_date = new Date(today);
	}
	//console.log(new_date, today);

	$('#div-tgl-akhir-fpd-insenpv').data("DateTimePicker").maxDate(new_date);
	$('#div-tgl-akhir-fpd-insenpv').data("DateTimePicker").date(new_date);
});

$('#div-tgl-akhir-fpd-insenpv').datetimepicker({
	format : 'DD-MMM-YYYY',
	maxDate : 'now',
	allowInputToggle : true
});
/*-----------------------------------------------------------------------------------------------------------------------*/

$('#tbl-bank-insentif').css('text-align','center');
$('#tbl-list-nopv').css('text-align','center');

/*$('#id-tab-dpho-insentif').click(function(){
	$('#slc-class-code-insenpv').append('<option>-- SILAHKAN PILIH --</option> '+'<option value=1>B-AL.ADM.DLR</option>'+'<option value=2>B-AL.REF.DLR</option>');
	get_bank_pengirim_insentif();
});*/

$('#slc-class-code-insenpv').change(function(){
	var class_code = $('#slc-class-code-insenpv').val();
	if (class_code === 'B-AL.ADM.DLR') {
		$('#inp-tipe-object-insenpv').val('MOTOR');
	}
	else if (class_code === 'B.AL.REF.DLR'){
		$('#inp-tipe-object-insenpv').val('MOBIL');
	}
	else{
		$('#inp-tipe-object-insenpv').val('');
	}
});

$('#src-bank-insenpv').click(function(){
	get_bank_insentif();
});
$('#src-no-pv-insenpv').click(function(){
	get_nopv_insentif();
});

$('#inp-bank-insenpv').click(function(){
	get_bank_insentif();
});
$('#inp-no-pv-insenpv').click(function(){
	get_nopv_insentif();
});

//MODAL OUTPUT BANK
$('#tbl-bank-insentif').on('click', 'tr', function(){
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
        hasil_pencarian = '';
    }
    else{
        tbl_bank_insentif.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        hasil_pencarian = tbl_bank_insentif.row(this).data();
    }
});

var list_empl_no = "";
var list_empl_job_code = "";
var list_empl_deal = "";

// $('#tbl-bank-insentif').on('dblclick', 'tr', function(){
//     hasil_pencarian = tbl_bank_insentif.row(this).data();
//     $('#modal-bank-insentif').modal('hide');
//     $('#inp-bank-insenpv').val(hasil_pencarian[0]+' - '+hasil_pencarian[1]);
//     getEmplByBankCode(hasil_pencarian);
// });
// $('#btn-pilih-bank-insentif').click(function(){
//     $('#modal-bank-insentif').modal('hide');
//     $('#inp-bank-insenpv').val(hasil_pencarian[0]+' - '+hasil_pencarian[1]);
//     getEmplByBankCode(hasil_pencarian);
// });
//------------------------------------------------------------------------------

$('#slc-area-insenpv').change(function(){
	console.log($('#slc-area-insenpv').val());
	get_branch_list($('#slc-area-insenpv').val());
});

$('#btn-display-insentif-pv').click(function(){
	var tipe_object = $('#inp-tipe-object-insenpv').val();
	var start_date = $('#inp-tgl-awl-fpd-insenpv').val();
	var end_date = $('#inp-tgl-akhir-fpd-insenpv').val();
	var bank_insentif = $('#inp-bank-insenpv').val();
	var no_pv = $('#inp-no-pv-insenpv').val();
	var class_code = $('#slc-class-code-insenpv').val();
	var area = $('#slc-area-insenpv').val();

	console.log(list_empl_no);
	console.log(list_empl_job_code);
	console.log(list_empl_deal);
	console.log(list_branch_child_dphonsb);
	console.log(bank_insentif);

	var tipeobjt = "";
	if (tipe_object === 'MOTOR') {
		tipeobjt = 1;
	}
	else if (tipe_object === 'MOBIL') {
		tipeobjt = 2;
	}

	if (class_code === '') {
		alert_info("Silahkan Pilih Class Code!");
		$('#div-class-code-insenpv').addClass('has-error');
	}
	else if (start_date === '' || end_date === '') {
		alert_info("Tanggal FPD Wajib Diisi.");
		$('#div-tgl-awl-fpd-insenpv').addClass('has-error');
		$('#div-tgl-akhir-fpd-insenpv').addClass('has-error');
	}
	else if (area === '') {
		alert_info("Silahkan Pilih Area Cabang.");
		$('#div-area-insenpv').addClass('has-error');
	}
	else if (bank_insentif === '') {
		alert_info("Bank Wajib Diisi");
		$('#div-bank-insenpv').addClass('has-error');
	}
	else if (no_pv === '') {
		alert_info("NO PV Wajib Diisi.");
		$('#div-no-pv-insenpv').addClass('has-error');
	}
	else{
		$('#div-class-code-insenpv').removeClass('has-error');
		$('#div-tgl-awl-fpd-insenpv').removeClass('has-error');
		$('#div-tgl-akhir-fpd-insenpv').removeClass('has-error');
		$('#div-area-insenpv').removeClass('has-error');
		$('#div-bank-insenpv').removeClass('has-error');
		$('#div-no-pv-insenpv').removeClass('has-error');
		$.ajax({
			url : base_url + "Controller_dpho_insentif/display_insentif",
			dataType : 'JSON',
			type : 'POST',
			data : {
				start_date : start_date,
				end_date : end_date,
				obj_type : tipeobjt,
				bank_code : bank_insentif,
				branch_code : list_branch_child_dphonsb,
				no_pv : no_pv
			},
			cache : false,
			success : function(response){
				console.log(response);
				if (response) {
					try{
						table_insentif.clear().draw();
						if (response['errorConsole']) {
							alert_error(response['errorConsole']);
						}
						else if (response['result'].length === 0) {
							alert_info("Tidak Ada Data Yang Ditemukan");
						}
						else{
							$.each(response['result'], function(i){
								table_insentif.row.add([
									//'<center><input type="checkbox" class="check-tbl-insentif" id="chk-tabel-insentif'+i+'"></center>',
									'<center> '+this['branch_code']+' </center>',
									'<center> '+this['empl_no']+' </center>',
									'<center> '+this['unit']+' </center>',
									'<center> '+accounting.formatMoney(this['net_amount'], '', 2, ',', '.')+' </center>',
									'<center> '+accounting.formatMoney(this['tax_amount'], '', 2, ',', '.')+' </center>',
									'<center> '+this['pv_no'] +'</center>',
									'',
									//this['end_date'],
									'<center> '+this['payment_detail_id']+' </center>',
									'<center> '+this['payment_id']+' </center>',
									'<center> '+this['bank_code']+' </center>',
									'<center> '+this['account_no']+' </center>'
									/*this['bank_code'],
									this['account_no']*/
								]).draw(false);
							});
						}
					}
					catch(e){
						$('#loading-ajax').hide();
						alert_error(e);
					}
				}
			},
			error : function(response){
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
});

/*$('#btn-save-file-insentif').click(function(){
	var filename_inp = $('#inp-save-file-insentif').val();
	var pv_no = $('#inp-no-pv-insenpv').val();
	console.log(pv_no);

	var file_name = 'EXPORT_' +pv_no+ '.csv';
	if (filename_inp !== '' && filename_inp.substr(-4) !== '.csv') {
		$('#inp-save-file-insentif').val(filename_inp+'.csv');
	}
	else if (filename_inp === '') {
		$('#inp-save-file-insentif').val(file_name);
	}
	else{
		$('#inp-save-file-insentif').val(filename_inp);
	}
});*/

$('#btn-generate-insentif').click(function(){
	var no_pv  = $('#inp-no-pv-insenpv').val();
	var bank_pengirim = $('#slc-bank-pengirim-insentif').val();
	var user = $('#hdn-user-insentif-ho').val();

	var tblinsentif = table_insentif.data();
	var tbl_insentif_length = table_insentif.data().length;
	var dData = [];
	console.log(bank_pengirim);

	if (tbl_insentif_length === 0) {
		alert_error("Belum Ada Data Yang Dipilih, Silahkan Pilih PV Terlebih Dahulu");
	}
	else if (bank_pengirim === '') {
		alert_error("Silahkan Pilih Bank Pengirim");
		$('#div-bank-pengirim-insentif').addClass('has-error');
	}
	else{
		$('#div-bank-pengirim-insentif').removeClass('has-error');

		for (var i = 0; i < tbl_insentif_length; i++) {
			dData.push({
				amount : accounting.unformat(tblinsentif[i][3]),
				pv_dtl_id : tblinsentif[i][7],
				pv_id : tblinsentif[i][8],
				bank_code : tblinsentif[i][9],
				acc_no : tblinsentif[i][10],
				user : user
			});
		}
		console.log(dData);
		$.ajax({
			url : base_url + "Controller_dpho_insentif/generate_dpho_insentif",
			type : 'POST',
			timeput : 10000,
			dataType :'text',
			data : {
				no_pv : $('#inp-no-pv-insenpv').val(),
				seq : tbl_insentif_length,
				user : user,
				list : dData
			},
			cache : false,
			success : function(response){
				console.log(response);
				//var res = JSON.parse(response);
				//console.log(res);
				var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
				var downloadLink = document.createElement("a");
				downloadLink.href = uri;
				downloadLink.download = 'EXPORT_'+no_pv+'.csv';
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
			},
			error : function(response){
				console.log(response);
			}
		});
	}
});

$('#btn-reset-insentif').click(function(){
	table_insentif.clear().draw();
	$('#slc-class-code-insenpv').prop('selectedIndex', 0);
	$('#inp-tgl-awl-fpd-insenpv').val('');
	$('#inp-tgl-akhir-fpd-insenpv').val('');
	$('#inp-tipe-object-insenpv').val('');
	$('#slc-area-insenpv').prop('selectedIndex', 0);
	$('#inp-bank-insenpv').val('');
	$('#inp-no-pv-insenpv').val('');
	$('#slc-bank-pengirim-insentif').prop('selectedIndex', 0);
});
/*-------------------------------------------------------- FUNCTION ----------------------------------------------------------*/
function get_class_code_insentif(){
	$.ajax({
		url : base_url+ "Controller_dpho_insentif/get_class_code",
		dataType : 'JSON',
		type : 'GET',
		cache : false,
		success : function(response){
			console.log(response);
			if (response) {
				try{
					$('#slc-class-code-insenpv').empty();
					$('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#slc-class-code-insenpv').addClass('form-control');

					$.each(response['data'], function(i){
						var class_code = response['data'][i]['acct_interface_group'];
						$('#slc-class-code-insenpv').append('<option value="'+class_code+'">'+class_code+'</option>');
					});
				}
				catch(e){
					$('#loading-ajax').hide();
					alert_error(e);
				}
			}
		},
		error : function(response){
			console.log(response);
		}
	});
}

/*function get_area(){
	$.ajax({
		url : base_url+"Controller_dpho_insentif/get_area",
		dataType : 'JSON',
		type : 'GET',
		cache : false,
		success : function(response){
			console.log(response);
			if (response) {
				try{
					$('#slc-area-insenpv').empty();
					$('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#slc-area-insenpv').addClass('form-control');
					$('#slc-area-insenpv').append('<option value="All">ALL - ALL</option>');

					$.each(response['data'], function(i){
						var area_code = response['data'][i]['branch_code'];
						var area_name = response['data'][i]['branch_desc'];
						$('#slc-area-insenpv').append('<option value="'+area_code+'">'+area_code+ ' - ' +area_name+'</option>');
					});
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
			console.log(response);
			if (response['responseText'] === "") {
				alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
					localStorage.clear();
					window.location.href = base_url + "Controller_login/login_view";
				});
			}
		}
	});
}*/

function get_bank_pengirim_insentif(){
	$.ajax({
		url : base_url+"Controller_dpho_insentif/get_bank_pengirim",
		dataType : 'JSON',
		type : 'GET',
		cache : false,
		success : function(response){
			console.log(response);
			if (response) {
				try{
					$('#slc-bank-pengirim-insentif').empty();
					$('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#slc-bank-pengirim-insentif').addClass('form-control');

					$.each(response['data'], function(i){
						var bank_code = response['data'][i]['bankCode'];
						var bank_name = response['data'][i]['bankName'];

						$('#slc-bank-pengirim-insentif').append('<option value="'+bank_code+'">'+bank_code+ ' - ' +bank_name+ '</option>');
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

function get_bank_insentif(){
	tbl_bank_insentif.clear().draw();
	tbl_bank_insentif.row.add([
		'- ALL -',
		'- ALL -'
	]).draw();

	$.ajax({
		url : base_url+"Controller_dpho_insentif/get_bank_insentif",
		dataType : 'JSON',
		type : 'GET',
		cache : false,
		success : function(response){
			console.log(response);
			if (response) {
				try{
					if (response['status'] === false) {
						alert_error(response['data']);
					}
					else if (response['status'] === true) {
						$('#modal-bank-insentif').modal('show');
						var data = [];

						$.each(response['data'], function(i){
							data.push([
								this['bankCode'],
								this['bankName']
							]);
							/*tbl_bank_insentif.row.add([
								this['bankCode'],
								this['bankName']
							]).draw(false);*/
						});
						tbl_bank_insentif.rows.add(data).draw(false);
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
		error : function(response){
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

function get_nopv_insentif(){
	var object = $('#slc-class-code-insenpv').val();
	console.log(object);

	if (object === '') {
		alert_info("Silahkan Pilih Class Code.");
		$('#div-class-code-insenpv').addClass('has-error');
	}
	else{

		$('#div-class-code-insenpv').removeClass('has-error');
		$.ajax({
			url : base_url+"Controller_dpho_insentif/get_pv_insentif",
			dataType : 'JSON',
			type : 'POST',
			data : {
				object
			},
			cache : false,
			success: function(response){
				console.log(response);
				if (response) {
					try{
						table_nopv.clear();
						if(response['errorConsole']){
							alert_error(response['errorConsole']);
						}
						else if (response['result'].length === 0) {
							alert_info("No PV Tidak Ada");
						}
						else{
							$.each(response['result'], function(i){
								table_nopv.row.add([
									this['payment_no'],
									this['paid_date']
								]).draw(false);
							});
							$('#modal-nopv').modal('show');
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
			error: function(response){
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
}

function getEmplByBankCode(hasil_pencarian){
	$.ajax({
    	url : base_url + "Controller_dpho_insentif/getEmplByBankCode",
    	type : 'POST',
    	dataType : 'JSON',
    	data : {
    		bank_code : hasil_pencarian[0]
    	},
    	cache : false,
    	success : function(response){
    		console.log(response);
    		if (response) {
    			try{
    				if (response['status'] === false && response['dealer'] === null && response['employee'] === null) {
    					alert_error("Tidak Ada List No Employee Pada Bank Ini");
    				}
    				else if (response['status'] === false && response['data']) {
    					alert_error(response['data']);
    				}
    				else{
    					var a = response.split(' - ');
    					console.log(a);
    					list_empl_no = a[0];
    					list_empl_job_code = a[1];
    					list_empl_deal = a[2];
    				}
    			}
    			catch(e){
					$('#loading-ajax').hide();
					alert_error(e);
				}
    		}
    	},
    	error : function(response){
    		console.log(response);
    	}
    });
}