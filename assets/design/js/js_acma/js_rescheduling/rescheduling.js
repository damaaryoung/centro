
var cur_inst_date = '';
var cur_inst_date_max = '';
var ipt_tgl_inst_baru_rcd = '';
var status = '';
var role_rcdl='';
var flag_role_rcdl=true;

if ($('#div-form-aplikasi-rcd').length) {
	var branch_code = $('#ipt-branch-code-rcd').val();
	var branch_name = $('#ipt-branch-name-rcd').val();
	if ($('#ipt-branch-code-rcd').val() === '0000') {
		get_data_branch('#slc-branch-rcd');
		$('#slc-branch-rcd').prop('disabled', false);
	} else {
		$('#slc-branch-rcd').prop('disabled', true);
		$('<option/>').val(branch_code).html(branch_code + ' - ' + branch_name).appendTo('#slc-branch-rcd');
	}
	var cabang = $('#slc-branch-rcd').val();
	get_employee(cabang);

	//--------------------------------------------- GET ROLE CODE -------------------------------------------//
	if (!localStorage.getItem('role_user_rcdl')) {
		$.ajax({
			url : "Controller_home/get_detail_user",
			cache : false,
			success : function(response){
				if(response){
					try{
						console.log(response);
						localStorage.setItem('role_user_rcdl', response);
						role_rcdl = $.parseJSON(localStorage.getItem('role_user_rcdl'));
						console.log(role_rcdl);
					}
					catch(e){
						console.log(e);
						$('#loading-ajax').hide();
						alert_error("Terjadi Kesalahan "+e);
					}
				}
			},
			error: function(response){
				console.log(response);
			}
		});
	}else{
		role_rcdl = $.parseJSON(localStorage.getItem('role_user_rcdl'));
		console.log(role_rcdl);
	}
}

$('#slc-branch-rcd').change(function(){
	var cabang = $('#slc-branch-rcd').val();
	get_employee(cabang);
});

$('#ipt-no-kontrak-rcd').keypress(function(event) {
	if (event.keyCode == 13) {
		$('#btn-proses-kontrak-rcd').click();
	}
});
$('#ipt-no-memo-rcd').keypress(function(event) {
	if (event.keyCode == 13) {
		$('#btn-proses-kontrak-rcd').click();
	}
});

$('#ipt-no-kontrak-rcd, #ipt-no-memo-rcd').on('input', function(){
	$('#div-no-memo-rcd, #div-no-kontrak-rcd').removeClass('has-error');
});

$('#ipt-no-kontrak-rcd').on('input', function(){
	$('#ipt-no-memo-rcd').val('');
	$('#ipt-alasan-rcd').val('');
	$('#ipt-tgl-inst-baru-rcd').val('');
	$('.ipt-disable-rcd').val('');
	$('.ipt-hidden-rcd').val('');
	$('.slc-clear-rcd').prop("disabled", false);
	$('.slc-clear-rcd').prop("selectedIndex", 0);
	$('#ipt-tgl-inst-baru-rcd').prop("disabled",false);
	$('#ipt-alasan-rcd').prop("disabled",false);
	$('#ipt-tipe-pembayaran-cash-rcd').prop('checked', true);
	$('.ipt-tipe-pembayaran').prop('disabled', false);
	$('.btn-rcd').prop('disabled', true);
	$('#div-front-end-rcd').removeClass('has-error');
	$('#div-resurveyor-rcd').removeClass('has-error');
	$('#div-analyst-rcd').removeClass('has-error');
});

$('#ipt-no-memo-rcd').on('input', function(){
	$('#ipt-no-kontrak-rcd').val('');
	$('#ipt-alasan-rcd').val('');
	$('#ipt-tgl-inst-baru-rcd').val('');
	$('.ipt-disable-rcd').val('');
	$('.ipt-hidden-rcd').val('');
	$('.slc-clear-rcd').prop("disabled", false);
	$('.slc-clear-rcd').prop("selectedIndex", 0);
	$('#ipt-tgl-inst-baru-rcd').prop("disabled",false);
	$('#ipt-alasan-rcd').prop("disabled",false);
	$('#ipt-tipe-pembayaran-cash-rcd').prop('checked', true);
	$('.ipt-tipe-pembayaran').prop('disabled', false);
	$('.btn-rcd').prop('disabled', true);
	$('#ipt-no-kontrak-rcd').prop('disabled', false);
	$('#div-front-end-rcd').removeClass('has-error');
	$('#div-resurveyor-rcd').removeClass('has-error');
	$('#div-analyst-rcd').removeClass('has-error');
});

$('#ipt-tgl-inst-baru-rcd').datetimepicker({
	format: 'DD-MMM-YYYY',
	allowInputToggle: true,	
});

$('#ipt-tgl-inst-baru-rcd').on('dp.change', function() {
	calculate_interest();
});


$('#btn-proses-kontrak-rcd').click(function() {
	var no_kontrak = $('#ipt-no-kontrak-rcd').val();
	var no_memo = $('#ipt-no-memo-rcd').val();
	var cabang = $('#slc-branch-rcd').val();
	$('#div-front-end-rcd').removeClass('has-error');
	$('#div-resurveyor-rcd').removeClass('has-error');
	$('#div-analyst-rcd').removeClass('has-error');

	if (check_session() === 'true') {
		if (no_kontrak === '' && no_memo === '') {
			alert_error("Isi Nomor Kontrak Atau Nomor Memo Terlebih Dahulu Untuk Melakukan Pencarian.");
			$('#div-no-memo-rcd').addClass('has-error');
			$('#div-no-kontrak-rcd').addClass('has-error');
		}
		else{
			$.ajax({
				url: base_url + "Controller_rescheduling/get_kontrak_dtl",
				dataType: 'json',
				type: 'POST',
				data: {
					no_kontrak,
					//reschedule_id,
					no_memo,
					cabang
				},
				cache: false,
				success: function(response) {
					console.log(response);
					if (response) {
						try {
							$('#ipt-no-memo-rcd').prop('disabled', false);
							if (response['Status'] === '500') {
								alert_error(response['ErrorMessage']);
								clear();
							} else if (response['Status'] === '200') {
								var tgl_inst_lama = response['DetailContract']['old_instdate'];
								var tgl_inst_baru = response['DetailContract']['new_instdate'];
								var sisa_pokok = response['DetailContract']['curr_prin'];
								var bunga_berjalan = response['DetailContract']['daily_int_fee'];
								var biaya_admin = response['DetailContract']['adm_fee'];
								var eff_rate = response['DetailContract']['eff_rate'];
								var fin_type = response['DetailContract']['fin_type'];

								$('.slc-clear-rcd').prop("selectedIndex", 0);
								$('#ipt-alasan-rcd').val("");
								$('#ipt-status-rcd').val(response['DetailContract']['status_cont']);
								$('#ipt-no-memo-rcd').val(response['DetailContract']['memo_no']);
								$('#ipt-no-kontrak-rcd').val(response['DetailContract']['contract_no']);
								$('#ipt-id-kontrak-rcd').val(response['DetailContract']['contract_id']);
								$('#ipt-next-inst-no-rcd').val(response['DetailContract']['next_inst_no']);
								$('#ipt-obj-code-rcd').val(response['DetailContract']['objCode']);
								$('#ipt-cust-id-rcd').val(response['DetailContract']['customer_id']);
								$('#ipt-nama-nasabah-rcd').val(response['DetailContract']['customer_name']);
								$('#ipt-alamat-rcd').val(response['DetailAddress']['kel_name']+" "+response['DetailContract']['rt_rw']+" "+response['DetailAddress']['kec_name']+" "+response['DetailAddress']['kab_name']+" "+response['DetailAddress']['prov_name']+" "+response['DetailAddress']['zip_code']);
								$('#ipt-no-rvpdc-rcd').val(response['DetailContract']['no_rv_pdc']);
								$('#ipt-tgl-memo-rcd').val(response['DetailContract']['memo_date']);
								$('#ipt-objek-rcd').val(response['DetailContract']['object_name']);
								$('#ipt-brandmodel-rcd').val(response['DetailContract']['object_brand_name'] + " / " + response['DetailContract']['object_model_name']);
								$('#ipt-no-polisi-rcd').val(response['DetailContract']['police_no']);
								$('#ipt-tgl-inst-lama-rcd').val(tgl_inst_lama);
								$('#ipt-fin-type-rcd').val(fin_type);
								$('#ipt-biaya-bunga-harian-rcd').val(accounting.formatMoney(bunga_berjalan, '', 2, ',', '.'));
								$('#ipt-biaya-admin-rcd').val(accounting.formatMoney(biaya_admin, '', 2, ',', '.'));
								$('#ipt-biaya-total-rcd').val(accounting.formatMoney(response['DetailContract']['total_fee'], '', 2, ',', '.'));
								$('#ipt-eff-rate-rcd').val(accounting.formatMoney(eff_rate, '', 5, '', '.'));
								$('#ipt-pembayaran-bulanan-rcd').val(accounting.formatMoney(response['DetailContract']['inst_amt'], '', 2, ',', '.'));
								$('#ipt-hutang-sekarang-rcd').val(accounting.formatMoney(sisa_pokok, '', 2, ',', '.'));
								$('#slc-frontend-rcd').val(response['DetailContract']['pic']);
								$('#slc-analyst-rcd').val(response['DetailContract']['analyst']);
								$('#slc-resurveyor-rcd').val(response['DetailContract']['resurveyor']);
								$('#ipt-alasan-rcd').val(response['DetailContract']['alasan']);
								$('#ipt-rcd-id-rcd').val(response['DetailContract']['reschedule_id']);

								if (response['DetailContract']['payment_type'] === 0) {
									$('#ipt-tipe-pembayaran-cash-rcd').prop('checked', true);
									$('#ipt-tipe-pembayaran-pdc-rcd').prop('checked', false);
								} else if (response['DetailContract']['payment_type'] === 1) {
									$('#ipt-tipe-pembayaran-cash-rcd').prop('checked', false);
									$('#ipt-tipe-pembayaran-pdc-rcd').prop('checked', true);
								}

								status = response['DetailContract']['status2'];	
								
								if(status == 9){
									$('.ipt-tipe-pembayaran').prop('disabled', true);
									$('#btn-save-draft-rcd').prop('disabled', false);
									$('#btn-print-history-rcd').prop('disabled', false);
									$('#btn-print-draft-rcd').prop('disabled', false);
									$('#btn-clear-rcd').prop('disabled', false);
								}else if(status == 0){
									$('.ipt-tipe-pembayaran').prop('disabled', false);
									$('#btn-save-draft-rcd').prop('disabled', false);
									$('#btn-clear-rcd').prop('disabled', false);
									$('#btn-cancel-draft-rcd').prop('disabled', false);
									$('#btn-create-rv-rcd').prop('disabled', false);
									$('#btn-print-history-rcd').prop('disabled', false);
									$('#btn-print-memo-rcd').prop('disabled', false);
									$('#btn-print-draft-rcd').prop('disabled', true);
								}else if(status == 2){
									$('#btn-save-draft-rcd').prop('disabled', true);
									$('#btn-cancel-draft-rcd').prop('disabled', true);
									$('#btn-create-rv-rcd').prop('disabled', true);
									$('#btn-print-history-rcd').prop('disabled', false);
									$('#btn-print-memo-rcd').prop('disabled', true);
									$('#btn-print-draft-rcd').prop('disabled', true);
									$('#btn-clear-rcd').prop('disabled', false);
									$('.ipt-tipe-pembayaran').prop('disabled', true);
									$('#ipt-alasan-rcd').prop('disabled', true);
									$('#ipt-tgl-inst-baru-rcd').prop('disabled', true);
									$('#ipt-no-memo-rcd').prop('disabled', true);
									$('#ipt-no-kontrak-rcd').prop('disabled', true);
									$('#slc-frontend-rcd').prop('disabled', true);
									$('#slc-resurveyor-rcd').prop('disabled', true);
									$('#slc-analyst-rcd').prop('disabled', true);
								}else if(status == 3){
									$('#btn-save-draft-rcd').prop('disabled', true);
									$('#btn-cancel-draft-rcd').prop('disabled', true);
									$('#btn-create-rv-rcd').prop('disabled', true);
									$('#btn-print-history-rcd').prop('disabled', false);
									$('#btn-print-memo-rcd').prop('disabled', false);
									$('#btn-print-draft-rcd').prop('disabled', true);
									$('#btn-clear-rcd').prop('disabled', false);
									$('.ipt-tipe-pembayaran').prop('disabled', true);
									$('#ipt-alasan-rcd').prop('disabled', true);
									$('#ipt-tgl-inst-baru-rcd').prop('disabled', true);
									$('#ipt-no-memo-rcd').prop('disabled', false);
									$('#slc-frontend-rcd').prop('disabled', true);
									$('#slc-resurveyor-rcd').prop('disabled', true);
									$('#slc-analyst-rcd').prop('disabled', true);
								}else if(status == 1){
									$('#btn-save-draft-rcd').prop('disabled', true);
									$('#btn-cancel-draft-rcd').prop('disabled', true);
									$('#btn-create-rv-rcd').prop('disabled', true);
									$('#btn-print-history-rcd').prop('disabled', false);
									$('#btn-print-memo-rcd').prop('disabled', false);
									$('#btn-print-draft-rcd').prop('disabled', true);
									$('#btn-clear-rcd').prop('disabled', false);
									$('.ipt-tipe-pembayaran').prop('disabled', true);
									$('#ipt-alasan-rcd').prop('disabled', true);
									$('#ipt-tgl-inst-baru-rcd').prop('disabled', true);
									$('#ipt-no-memo-rcd').prop('disabled', true);
									$('#ipt-no-kontrak-rcd').prop('disabled', true);
									$('#slc-frontend-rcd').prop('disabled', true);
									$('#slc-resurveyor-rcd').prop('disabled', true);
									$('#slc-analyst-rcd').prop('disabled', true);
								}

								cur_inst_date = response['DetailContract']['new_instdate2'];
								cur_inst_date_max = response['DetailContract']['new_instdate_max'];

								$('#ipt-tgl-inst-baru-rcd').data("DateTimePicker").maxDate(cur_inst_date_max).minDate(cur_inst_date);
								$('#ipt-tgl-inst-baru-rcd').val(tgl_inst_baru);

								calculate_interest_search(tgl_inst_lama,tgl_inst_baru,sisa_pokok,bunga_berjalan,biaya_admin,eff_rate,fin_type);
							}						
						} catch (e) {
							$('#loading-ajax').hide();
							alert_error("Terjadi Kesalahan => "+e);
						}
					}
				},
				error: function(response) {
					console.log(response);
				}
			});
}
}else if (check_session() === 'false') {
	alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
		localStorage.clear();
		window.location.href = base_url + "Controller_login/login_view";
	});
}
});

$('#btn-clear-rcd').click(function() {
	$('.ipt-clear-rcd').val("");
	$('.slc-clear-rcd').prop("selectedIndex", 0);
	$('#ipt-no-memo-rcd').prop('disabled', false);
	$('#ipt-tipe-pembayaran-cash-rcd').prop('checked', true);
	$('.ipt-tipe-pembayaran').prop('disabled', false);
	$('#btn-save-draft-rcd').prop('disabled', true);
	$('#btn-clear-rcd').prop('disabled', true);
	$('#btn-cancel-draft-rcd').prop('disabled', true);
	$('#btn-create-rv-rcd').prop('disabled', true);
	$('#btn-print-history-rcd').prop('disabled', true);
	$('#btn-print-memo-rcd').prop('disabled', true);
	$('#btn-print-draft-rcd').prop('disabled', true);
	$('#ipt-alasan-rcd').prop('disabled', false);
	$('#ipt-tgl-inst-baru-rcd').prop('disabled', false);
	$('#ipt-no-memo-rcd').prop('disabled', false);
	$('#ipt-no-kontrak-rcd').prop('disabled', false);
	$('#slc-frontend-rcd').prop('disabled', false);
	$('#slc-resurveyor-rcd').prop('disabled', false);
	$('#slc-analyst-rcd').prop('disabled', false);
	$('html, body').animate({
		scrollTop: 0
	}, 'slow');
});

function clear(){
	$('.ipt-clear-rcd').val("");
	$('.slc-clear-rcd').prop("selectedIndex", 0);
	$('#ipt-no-memo-rcd').prop('disabled', false);
	$('#ipt-tipe-pembayaran-cash-rcd').prop('checked', true);
	$('.ipt-tipe-pembayaran').prop('disabled', false);
	$('#btn-save-draft-rcd').prop('disabled', true);
	$('#btn-clear-rcd').prop('disabled', true);
	$('#btn-cancel-draft-rcd').prop('disabled', true);
	$('#btn-create-rv-rcd').prop('disabled', true);
	$('#btn-print-history-rcd').prop('disabled', true);
	$('#btn-print-memo-rcd').prop('disabled', true);
	$('#btn-print-draft-rcd').prop('disabled', true);
	$('html, body').animate({
		scrollTop: 0
	}, 'slow');
}

$('#ipt-tipe-pembayaran-pdc-rcd').click(function() {
	var inp_branch_dp_id = $('#slc-branch-rcd').val();
	console.log(inp_branch_dp_id);
	var bank_stat = '0';
	if ((inp_branch_dp_id == null) || (inp_branch_dp_id == '')) {
		alert_error('Silahkan pilih cabang terlebih dahulu !');
	} else {
		bank_iss_pdc(bank_stat, inp_branch_dp_id);
	}
});

function get_employee(cabang) {
	console.log(cabang);
	$.ajax({
		url: base_url + "Controller_rescheduling/get_employee",
		dataType: 'JSON',
		type: 'POST',
		data: {
			cabang
		},
		cache: false,
		success: function(response) {
			console.log(response);
			if (response) {
				try {
					if (response['status'] === false) {
						alert_error(response['data']);
					} else if (response['status'] === true) {
						$('#slc-frontend-rcd').empty();
						$('#slc-resurveyor-rcd').empty();
						$('#slc-analyst-rcd').empty();

						$('<option/>').val('').html('-- Silahkan Pilih --').appendTo('#slc-frontend-rcd').addClass('form-control');
						$.each(response['EmployeePic'], function(i) {
							var empl_npk = response['EmployeePic'][i]['empl_npk'];
							var empl_name = response['EmployeePic'][i]['empl_name'];

							$('#slc-frontend-rcd').append('<option value="' + empl_npk + '">' + empl_npk + ' - ' + empl_name + '</option>');
						});


						$('<option/>').val('').html('-- Silahkan Pilih --').appendTo('#slc-resurveyor-rcd').addClass('form-control');
						$.each(response['EmployeeResurveyor'], function(i) {
							var empl_npk = response['EmployeeResurveyor'][i]['empl_npk'];
							var empl_name = response['EmployeeResurveyor'][i]['empl_name'];

							$('#slc-resurveyor-rcd').append('<option value="'+empl_npk+'">' + empl_npk + ' - ' + empl_name + '</option>');
						});


						$('<option/>').val('').html('-- Silahkan Pilih --').appendTo('#slc-analyst-rcd').addClass('form-control');
						$.each(response['EmployeeAnalys'], function(i) {
							var empl_npk = response['EmployeeAnalys'][i]['empl_npk'];
							var empl_name = response['EmployeeAnalys'][i]['empl_name'];

							$('#slc-analyst-rcd').append('<option value="'+empl_npk+'">' + empl_npk + ' - ' + empl_name + '</option>');
						});
					}
				} catch (e) {
					$('#loading-ajax').hide();
					alert_error("Terjadi Kesalahan => "+e);
				}
			}
		},
		error: function(response) {
			console.log(response);
		}
	});
}

function calculate_interest() {
	$.ajax({
		url: base_url + "Controller_rescheduling/calculate_interest",
		dataType: 'JSON',
		type: 'POST',
		data: {
			tgl_lama: $('#ipt-tgl-inst-lama-rcd').val(),
			tgl_baru: $('#ipt-tgl-inst-baru-rcd').val(),
			hutang_skrg: accounting.unformat($('#ipt-hutang-sekarang-rcd').val()),
			bunga_berjalan: accounting.unformat($('#ipt-biaya-bunga-harian-rcd').val()),
			biaya_admin: accounting.unformat($('#ipt-biaya-admin-rcd').val()),
			eff_rate: accounting.unformat($('#ipt-eff-rate-rcd').val()),
			fin_type: accounting.unformat($('#ipt-fin-type-rcd').val())
		},
		async:false,
		success: function(response) {
			console.log(response);
			if (response) {
				try {
					$('#ipt-biaya-bunga-harian-rcd').val(accounting.formatMoney(response['daily_int_fee'], '', 2, ',', '.'));
					$('#ipt-biaya-admin-rcd').val(accounting.formatMoney(response['adm_fee'], '', 2, ',', '.'));
					$('#ipt-biaya-total-rcd').val(accounting.formatMoney(response['total_fee'], '', 2, ',', '.'));
				} catch (e) {
					$('#loading-ajax').hide();
					alert_error("Terjadi Kesalahan => "+e);
				}
			}
		},
		error: function(response) {
			console.log(response);
		}
	});
}

function calculate_interest_search(tgl_inst_lama,tgl_inst_baru,sisa_pokok,bunga_berjalan,biaya_admin,eff_rate,fin_type) {
	$.ajax({
		url: base_url + "Controller_rescheduling/calculate_interest",
		dataType: 'JSON',
		type: 'POST',
		data: {
			tgl_lama: tgl_inst_lama,
			tgl_baru: tgl_inst_baru,
			hutang_skrg: sisa_pokok,
			bunga_berjalan: bunga_berjalan,
			biaya_admin: biaya_admin,
			eff_rate: eff_rate,
			fin_type: fin_type
		},
		async:false,
		success: function(response) {
			console.log(response);
			if (response) {
				try {
					$('#ipt-biaya-bunga-harian-rcd').val(accounting.formatMoney(response['daily_int_fee'], '', 2, ',', '.'));
					$('#ipt-biaya-admin-rcd').val(accounting.formatMoney(response['adm_fee'], '', 2, ',', '.'));
					$('#ipt-biaya-total-rcd').val(accounting.formatMoney(response['total_fee'], '', 2, ',', '.'));
				} catch (e) {
					$('#loading-ajax').hide();
					alert_error("Terjadi Kesalahan => "+e);
				}
			}
		},
		error: function(response) {
			console.log(response);
		}
	});
}

$('#btn-save-draft-rcd').click(function() {
	var cabang = $('#slc-branch-rcd').val();

	if (check_session() === 'true') {

		flag_role_rcdl = true;
		for (var i = 0; i < role_rcdl.length; i++) {
			if(role_rcdl[i]['role_code'] === 'SAVE_DRAFT_RCDL') {
				flag_role_rcdl = false;
				break;
			}
		}

		if(flag_role_rcdl){
			alert_error('Button save draft hanya bisa dilakukan oleh CS !');
		}else{
			$.ajax({
				url: base_url + "Controller_rescheduling/get_holiday",
				dataType: 'json',
				type: 'POST',
				data: {
					cabang
				},
				cache: false,
				success: function(response) {
					console.log(response);
					if (response) {
						try {
							$('#ipt-no-memo-rcd').prop('disabled', false);
							if (response['status'] === false) {
								alert_error("Kesalahan Pada Koneksi "+response['data']);
							}
							else if (response['status'] === true && response['data'].length > 0 ) {
								alert_error('Tidak Dapat Dilanjutkan Karena Hari Libur Pada Tanggal ' + response['data']);
							}
							else if (response['status'] === true && response['data'].length === 0) {
								save_draft();
							} 
						} catch (e) {
							$('#loading-ajax').hide();
							alert_error("Terjadi Kesalahan => "+e);
						}
					}
				},
				error: function(response) {
					console.log(response);
				}
			});
		}
		
	}else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

$('#slc-frontend-rcd').on('input', function(){
	$('#div-front-end-rcd').removeClass('has-error');
});
$('#slc-resurveyor-rcd').on('input', function(){
	$('#div-resurveyor-rcd').removeClass('has-error');
});
$('#slc-analyst-rcd').on('input', function(){
	$('#div-analyst-rcd').removeClass('has-error');
});
$('#ipt-alasan-rcd').on('input', function(){
	$('#div-alasan-rcd').removeClass('has-error');
});

function save_draft() {
	var kontrak_id = $('#ipt-id-kontrak-rcd').val();
	var pic = $('#slc-frontend-rcd').val();
	var resurveyor = $('#slc-resurveyor-rcd').val();
	var analyst = $('#slc-analyst-rcd').val();
	var tgl_memo = $('#ipt-tgl-memo-rcd').val();
	var tgl_angs_lama = $('#ipt-tgl-inst-lama-rcd').val();
	var tgl_angs_baru = $('#ipt-tgl-inst-baru-rcd').val();
	var alasan = $('#ipt-alasan-rcd').val();
	var hutang_skrg =  accounting.unformat($('#ipt-hutang-sekarang-rcd').val()); 
	var pembayaran_bulanan =  accounting.unformat($('#ipt-pembayaran-bulanan-rcd').val());
	var biaya_admin =  accounting.unformat($('#ipt-biaya-admin-rcd').val());
	var no_memo =  $('#ipt-no-memo-rcd').val();
	var reschedule_id =  $('#ipt-rcd-id-rcd').val();

	if (pic === '' && resurveyor === '' && analyst === '' && alasan === ''){
		alert_error("Data Front End (PIC), Resurveyor, Analyst, Alasan Belum Diisi !");
		$('#div-front-end-rcd').addClass('has-error');
		$('#div-resurveyor-rcd').addClass('has-error');
		$('#div-analyst-rcd').addClass('has-error');
		$('#div-alasan-rcd').addClass('has-error'); 
	}
	else if (pic === '' && resurveyor === '' && analyst === ''){
		alert_error("Data Front End (PIC), Resurveyor, Analyst Belum Diisi !");
		$('#div-front-end-rcd').addClass('has-error');
		$('#div-resurveyor-rcd').addClass('has-error');
		$('#div-analyst-rcd').addClass('has-error');
	}
	else if (pic === '' && resurveyor === '' && alasan === ''){
		alert_error("Data Front End (PIC), Resurveyor, Alasan Belum Diisi !");
		$('#div-front-end-rcd').addClass('has-error');
		$('#div-resurveyor-rcd').addClass('has-error');
		$('#div-alasan-rcd').addClass('has-error'); 
	}
	else if (pic === '' && analyst === '' && alasan === ''){
		alert_error("Data Front End (PIC), Analyst, Alasan Belum Diisi !");
		$('#div-front-end-rcd').addClass('has-error');
		$('#div-alasan-rcd').addClass('has-error'); 
		$('#div-analyst-rcd').addClass('has-error');
	}
	else if (resurveyor === '' && analyst === '' && alasan === ''){
		alert_error("Data Resurveyor, Analyst, Alasan Belum Diisi !");
		$('#div-resurveyor-rcd').addClass('has-error');
		$('#div-alasan-rcd').addClass('has-error'); 
		$('#div-analyst-rcd').addClass('has-error');
	}
	else if (pic === '' && resurveyor === ''){
		alert_error("Data Front End (PIC), Resurveyor Belum Diisi !");
		$('#div-front-end-rcd').addClass('has-error');
		$('#div-resurveyor-rcd').addClass('has-error');
	}
	else if (pic === '' && analyst === ''){
		alert_error("Data Front End (PIC), Analyst Belum Diisi !");
		$('#div-front-end-rcd').addClass('has-error');
		$('#div-analyst-rcd').addClass('has-error');
	}
	else if (resurveyor === '' && analyst === ''){
		alert_error("Data Resurveyor, Analyst Belum Diisi !");
		$('#div-resurveyor-rcd').addClass('has-error');
		$('#div-analyst-rcd').addClass('has-error');
	}
	else if (alasan === '' && analyst === ''){
		alert_error("Data Alasan, Analyst Belum Diisi !");
		$('#div-alasan-rcd').addClass('has-error'); 
		$('#div-analyst-rcd').addClass('has-error');
	}
	else if (alasan === '' && resurveyor === ''){
		alert_error("Data Alasan, Resurveyor Belum Diisi !");
		$('#div-alasan-rcd').addClass('has-error'); 
		$('#div-resurveyor-rcd').addClass('has-error');
	}
	else if (alasan === '' && pic === ''){
		alert_error("Data Alasan, Front End (PIC) Belum Diisi !");
		$('#div-front-end-rcd').addClass('has-error');
		$('#div-alasan-rcd').addClass('has-error'); 
	}
	else if (pic === ''){
		alert_error("Silahkan Pilih Front End (PIC) Terlebih Dahulu.");
		$('#div-front-end-rcd').addClass('has-error');
	}
	else if (resurveyor === '') {
		alert_error("Silahkan Pilih Resurveyor Terlebih Dahulu.");
		$('#div-resurveyor-rcd').addClass('has-error');
	}
	else if (analyst === '') {
		alert_error("Silahkan Pilih Analyst Terlebih Dahulu.");
		$('#div-analyst-rcd').addClass('has-error');
	}
	else if (alasan === '') {
		alert_error("Silahkan Isi Alasan Terlebih Dahulu.");
		$('#div-alasan-rcd').addClass('has-error');
	}
	else{
		$.ajax({
			url: base_url + "Controller_rescheduling/save_draft",
			dataType: 'JSON',
			type: 'POST',
			data: {
				kontrak_id,
				pic,
				resurveyor,
				analyst,
				tgl_memo,
				tgl_angs_lama,
				tgl_angs_baru,
				alasan,
				hutang_skrg,
				pembayaran_bulanan,
				biaya_admin
			},
			success: function(response) {
				console.log(response);
				if(response){
					try{
						if (response['Status'] === '200') {
							if((no_memo === "" || no_memo === null)&&(reschedule_id === '0')){
								$('#ipt-no-memo-rcd').val(response['no_memo']);	
								$('#ipt-rcd-id-rcd').val(response['reschedule_id']);				
							}

							$('#ipt-status-rcd').val('( SAVED )');
							if(no_memo === "" || no_memo === null){
								alert_info("Draft Kontrak Berhasil di Save Dengan Nomor Memo Rescheduling " + response['no_memo']);
							}else{
								alert_info("Draft Kontrak Berhasil di Update");
							}
							$('.ipt-tipe-pembayaran').prop('disabled', false);
							$('#btn-save-draft-rcd').prop('disabled', false);
							$('#btn-clear-rcd').prop('disabled', false);
							$('#btn-cancel-draft-rcd').prop('disabled', false);
							$('#btn-create-rv-rcd').prop('disabled', false);
							$('#btn-print-history-rcd').prop('disabled', false);
							$('#btn-print-memo-rcd').prop('disabled', false);
							$('#btn-print-draft-rcd').prop('disabled', true);
							$('html, body').animate({
								scrollTop: 0
							}, 'slow');
						} else if (response['Status'] === '500') {
							alert_error(response['ErrorMessage']); 
						}
					}catch(e){
						$('#loading-ajax').hide();
						alert_error("Terjadi Kesalahan => "+e);
					}
				}
			},
			error: function(response) {
				console.log(response);
			}
		});
	}
}

function cancelDraft(){
	var reschedule_id = $('#ipt-rcd-id-rcd').val();
	$.ajax({
		url: base_url + "Controller_rescheduling/cancel_draft",
		dataType: 'json',
		type: 'POST',
		data: {
			reschedule_id
		},
		cache: false,
		success: function(response) {
			console.log(response);
			if (response) {
				try {
					if (response['Status'] === '200') {
						alert_info("Memo Rescheduling Berhasil Dibatalkan !");
						$('#ipt-status-rcd').val('( CANCELED )');
						$('#btn-save-draft-rcd').prop('disabled', true);
						$('#btn-clear-rcd').prop('disabled', false);
						$('#btn-cancel-draft-rcd').prop('disabled', true);
						$('#btn-create-rv-rcd').prop('disabled', true);
						$('#btn-print-history-rcd').prop('disabled', false);
						$('#btn-print-memo-rcd').prop('disabled', true);
						$('#btn-print-draft-rcd').prop('disabled', true);
						$('.ipt-tipe-pembayaran').prop('disabled', true);
						$('html, body').animate({
							scrollTop: 0
						}, 'slow');
					}else if (response['Status'] === '500') {
						alert_error(response['ErrorMessage']); 
						$('html, body').animate({
							scrollTop: 0
						}, 'slow');
					}
				} catch (e) {
					$('#loading-ajax').hide();
					alert_error("Terjadi Kesalahan => "+e);
				}
			}
		},
		error: function(response) {
			console.log(response);
		}
	});
}

$('#btn-cancel-draft-rcd').click(function() {
	if (check_session() === 'true') {
		alert_confirm("Apakah Anda Yakin Akan Membatalkan Memo Rescheduling Ini ?",function(){
			cancelDraft();
		});
	}else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

$('#btn-create-rv-rcd').click(function() {
	var cabang = $('#slc-branch-rcd').val();

	if (check_session() === 'true') {

		flag_role_rcdl = true;
		for (var i = 0; i < role_rcdl.length; i++) {
			if(role_rcdl[i]['role_code'] === 'CREATE_RV_RCDL') {
				flag_role_rcdl = false;
				break;
			}
		}

		if(flag_role_rcdl){
			alert_error('Button create RV hanya bisa dilakukan oleh ADH !');
		}else{
			$.ajax({
			url: base_url + "Controller_rescheduling/get_holiday",
			dataType: 'json',
			type: 'POST',
			data: {
				cabang
			},
			cache: false,
			success: function(response) {
				console.log(response);
				if (response) {
					try {
						$('#ipt-no-memo-rcd').prop('disabled', false);
						if (response['status'] === false) {
							alert_error("Kesalahan Pada Koneksi "+response['data']);
						}
						else if (response['status'] === true && (response['data'] != "" || response['data'].length > 0)) {
							alert_error('Tidak Dapat Dilanjutkan Karena Hari Libur Pada Tanggal ' + response['data']);
						}
						else if (response['status'] === true && (response['data'] === "" || response['data'].length == 0)) {
							console.log("asdasd");
							create_rv();
						} 
					} catch (e) {
						$('#loading-ajax').hide();
						alert_error("Terjadi Kesalahan => "+e);
					}
				}
			},
			error: function(response) {
				console.log(response);
			}
		});
		}
	}else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

function create_rv() {
	var pdc_date = $('#inp-date-pdc-mdl').val();
	var pdc_due_date = $('#inp-due-date-mdl').val();
	var bank_issued = $('#slc-bank-iss-mdl').val();
	if($('#chk-inkaso-pdc-dr').is(':checked')){
		var inkaso = 1;
	}else{
		var inkaso = 0;
	}
	var bank_branch = $('#inp-bank-branch-mdl').val();
	var reschedule_id =  $('#ipt-rcd-id-rcd').val();
	if($('#ipt-tipe-pembayaran-cash-rcd').is(':checked')){
		var payment_type = 0;
	}else{
		var payment_type = 1;
	}
	var tgl_memo = $('#ipt-tgl-memo-rcd').val();
	var biaya_total = accounting.unformat($('#ipt-biaya-total-rcd').val());
	var hutang_skrg =  accounting.unformat($('#ipt-hutang-sekarang-rcd').val()); 
	var pembayaran_bulanan =  accounting.unformat($('#ipt-pembayaran-bulanan-rcd').val());
	var biaya_admin =  accounting.unformat($('#ipt-biaya-admin-rcd').val());
	var tgl_angs_lama = $('#ipt-tgl-inst-lama-rcd').val();
	var tgl_angs_baru = $('#ipt-tgl-inst-baru-rcd').val();
	var pic = $('#slc-frontend-rcd').val();
	var resurveyor = $('#slc-resurveyor-rcd').val();
	var analyst = $('#slc-analyst-rcd').val();
	var alasan = $('#ipt-alasan-rcd').val();
	var next_inst_no = $('#ipt-next-inst-no-rcd').val();
	var bunga_harian = accounting.unformat($('#ipt-biaya-bunga-harian-rcd').val());
	var obj_code = $('#ipt-obj-code-rcd').val();
	var customer_name = $('#ipt-nama-nasabah-rcd').val();
	var customer_id = $('#ipt-cust-id-rcd').val();
	var fin_type = $('#ipt-fin-type-rcd').val();
	var no_rv_pdc =  $('#ipt-no-rvpdc-rcd').val();
	

	if (pic === '' && resurveyor === '' && analyst === '' && alasan === ''){
		alert_error("Data Front End (PIC), Resurveyor, Analyst, Alasan Belum Diisi !");
		$('#div-front-end-rcd').addClass('has-error');
		$('#div-resurveyor-rcd').addClass('has-error');
		$('#div-analyst-rcd').addClass('has-error');
		$('#div-alasan-rcd').addClass('has-error'); 
	}
	else if (pic === '' && resurveyor === '' && analyst === ''){
		alert_error("Data Front End (PIC), Resurveyor, Analyst Belum Diisi !");
		$('#div-front-end-rcd').addClass('has-error');
		$('#div-resurveyor-rcd').addClass('has-error');
		$('#div-analyst-rcd').addClass('has-error');
	}
	else if (pic === '' && resurveyor === '' && alasan === ''){
		alert_error("Data Front End (PIC), Resurveyor, Alasan Belum Diisi !");
		$('#div-front-end-rcd').addClass('has-error');
		$('#div-resurveyor-rcd').addClass('has-error');
		$('#div-alasan-rcd').addClass('has-error'); 
	}
	else if (pic === '' && analyst === '' && alasan === ''){
		alert_error("Data Front End (PIC), Analyst, Alasan Belum Diisi !");
		$('#div-front-end-rcd').addClass('has-error');
		$('#div-alasan-rcd').addClass('has-error'); 
		$('#div-analyst-rcd').addClass('has-error');
	}
	else if (resurveyor === '' && analyst === '' && alasan === ''){
		alert_error("Data Resurveyor, Analyst, Alasan Belum Diisi !");
		$('#div-resurveyor-rcd').addClass('has-error');
		$('#div-alasan-rcd').addClass('has-error'); 
		$('#div-analyst-rcd').addClass('has-error');
	}
	else if (pic === '' && resurveyor === ''){
		alert_error("Data Front End (PIC), Resurveyor Belum Diisi !");
		$('#div-front-end-rcd').addClass('has-error');
		$('#div-resurveyor-rcd').addClass('has-error');
	}
	else if (pic === '' && analyst === ''){
		alert_error("Data Front End (PIC), Analyst Belum Diisi !");
		$('#div-front-end-rcd').addClass('has-error');
		$('#div-analyst-rcd').addClass('has-error');
	}
	else if (resurveyor === '' && analyst === ''){
		alert_error("Data Resurveyor, Analyst Belum Diisi !");
		$('#div-resurveyor-rcd').addClass('has-error');
		$('#div-analyst-rcd').addClass('has-error');
	}
	else if (alasan === '' && analyst === ''){
		alert_error("Data Analyst, Alasan Belum Diisi !");
		$('#div-alasan-rcd').addClass('has-error'); 
		$('#div-analyst-rcd').addClass('has-error');
	}
	else if (alasan === '' && resurveyor === ''){
		alert_error("Data Resurveyor, Alasan Belum Diisi !");
		$('#div-alasan-rcd').addClass('has-error'); 
		$('#div-resurveyor-rcd').addClass('has-error');
	}
	else if (alasan === '' && pic === ''){
		alert_error("Data Front End (PIC), Alasan Belum Diisi !");
		$('#div-front-end-rcd').addClass('has-error');
		$('#div-alasan-rcd').addClass('has-error'); 
	}
	else if (pic === ''){
		alert_error("Silahkan Pilih Front End (PIC) Terlebih Dahulu.");
		$('#div-front-end-rcd').addClass('has-error');
	}
	else if (resurveyor === '') {
		alert_error("Silahkan Pilih Resurveyor Terlebih Dahulu.");
		$('#div-resurveyor-rcd').addClass('has-error');
	}
	else if (analyst === '') {
		alert_error("Silahkan Pilih Analyst Terlebih Dahulu.");
		$('#div-analyst-rcd').addClass('has-error');
	}
	else if (alasan === '') {
		alert_error("Silahkan Isi Alasan Terlebih Dahulu.");
		$('#div-alasan-rcd').addClass('has-error');
	}
	else if($('#ipt-tipe-pembayaran-pdc-rcd').is(':checked') && no_rv_pdc === ''){
		alert_error("Nomor PDC Belum Diisi !");
		$('#div-pdc-rcd').addClass('has-error');
	}
	else{
		$.ajax({
			url: base_url + "Controller_rescheduling/create_rv",
			dataType: 'JSON',
			type: 'POST',
			data: {
				reschedule_id,
				payment_type,
				tgl_memo,
				biaya_total,
				hutang_skrg,
				pembayaran_bulanan,
				biaya_admin,
				tgl_angs_lama,
				tgl_angs_baru,
				pic,
				resurveyor,
				analyst,
				alasan,
				next_inst_no,
				bunga_harian,
				obj_code,
				customer_name,
				customer_id,
				no_rv_pdc,
				pdc_date,
				pdc_due_date,
				bank_issued,
				inkaso,
				bank_branch,
				fin_type
			},
			success: function(response) {
				console.log(response);
				if(response){
					try{
						if (response['Status'] === '200') {
							$('#ipt-status-rcd').val('( RV / PDC CREATED )');
							$('.ipt-tipe-pembayaran').prop('disabled',true);
							$('#btn-save-draft-rcd').prop('disabled', true);
							$('#btn-clear-rcd').prop('disabled', false);
							$('#btn-cancel-draft-rcd').prop('disabled', true);
							$('#btn-create-rv-rcd').prop('disabled', true);
							$('#btn-print-history-rcd').prop('disabled', false);
							$('#btn-print-memo-rcd').prop('disabled', false);
							$('#btn-print-draft-rcd').prop('disabled', true);
							$('#slc-bank-iss-mdl').val();
							$('#slc-bank-iss-mdl').prop("selectedIndex", 0);
							$('#chk-inkaso-pdc-dr').prop("checked",false)
							$('#inp-bank-branch-mdl').val('');

							if((no_rv_pdc === "" || no_rv_pdc === null)){
								$('#ipt-no-rvpdc-rcd').val(response['no_rv']);
								alert_info("RV Rescheduling Berhasil Disimpan, No RV / PDC " + response['no_rv']);				
							}else{
								alert_info("RV Rescheduling Berhasil Disimpan, No RV / PDC " + no_rv_pdc);	
							}
							$('html, body').animate({
								scrollTop: 0
							}, 'slow');
						} else if (response['Status'] === '500') {
							alert_error(response['ErrorMessage']); 
						}
					}catch(e) {
						$('#loading-ajax').hide();
						alert_error("Terjadi Kesalahan => "+e);
					}
				}
			},
			error: function(response) {
				console.log(response);
			}
		});
	}
}

$('#btn-print-draft-rcd').click(function() {
	var analyst = $('#slc-analyst-rcd').val();
	var pic = $('#slc-frontend-rcd').val();
	var resurveyor = $('#slc-resurveyor-rcd').val();
	var kontrak_id = $('#ipt-id-kontrak-rcd').val();
	var cabang = $('#slc-branch-rcd').val();
	var customer_name = $('#ipt-nama-nasabah-rcd').val();
	var alamat = $('#ipt-alamat-rcd').val();
	var object = $('#ipt-objek-rcd').val();
	var model = $('#ipt-brandmodel-rcd').val();
	var no_polisi = $('#ipt-no-polisi-rcd').val();
	var next_inst_no = $('#ipt-next-inst-no-rcd').val();
	var sisa_pokok = accounting.unformat($('#ipt-hutang-sekarang-rcd').val());
	var tgl_angs_lama = $('#ipt-tgl-inst-lama-rcd').val();
	var tgl_angs_baru = $('#ipt-tgl-inst-baru-rcd').val();
	var bunga_harian = accounting.unformat($('#ipt-biaya-bunga-harian-rcd').val());
	var biaya_admin =  accounting.unformat($('#ipt-biaya-admin-rcd').val());
	var biaya_total = accounting.unformat($('#ipt-biaya-total-rcd').val());
	var analisa = $('#slc-analyst-rcd option:selected').text();
	var no_rv = $('#ipt-no-rvpdc-rcd').val();
	var no_kontrak = $('#ipt-no-kontrak-rcd').val();

	var res = analisa.substr(7);
	var analyst2 = res.substr(0,res.lastIndexOf(" "));

	if (check_session() === 'true') {
		if (pic === '' && resurveyor === '' && analyst === ''){
			alert_error("Data Front End (PIC), Resurveyor, Analyst Belum Diisi !");
			$('#div-front-end-rcd').addClass('has-error');
			$('#div-resurveyor-rcd').addClass('has-error');
			$('#div-analyst-rcd').addClass('has-error');
		}
		else if (pic === '' && resurveyor === ''){
			alert_error("Data Front End (PIC), Resurveyor Belum Diisi !");
			$('#div-front-end-rcd').addClass('has-error');
			$('#div-resurveyor-rcd').addClass('has-error');
		}
		else if (pic === '' && analyst === ''){
			alert_error("Data Front End (PIC), Analyst Belum Diisi !");
			$('#div-front-end-rcd').addClass('has-error');
			$('#div-analyst-rcd').addClass('has-error');
		}
		else if (resurveyor === '' && analyst === ''){
			alert_error("Data Resurveyor, Analyst Belum Diisi !");
			$('#div-resurveyor-rcd').addClass('has-error');
			$('#div-analyst-rcd').addClass('has-error');
		}
		else if (pic === ''){
			alert_error("Silahkan Pilih Front End (PIC) Terlebih Dahulu.");
			$('#div-front-end-rcd').addClass('has-error');
		}
		else if (resurveyor === '') {
			alert_error("Silahkan Pilih Resurveyor Terlebih Dahulu.");
			$('#div-resurveyor-rcd').addClass('has-error');
		}
		else if (analyst === '') {
			alert_error("Silahkan Pilih Analyst Terlebih Dahulu.");
			$('#div-analyst-rcd').addClass('has-error');
		}
		else{
			$.ajax({
				url: base_url + "Controller_rescheduling/print_draft",
				dataType: 'json',
				type: 'POST',
				data: {
					kontrak_id,
					cabang,
					customer_name,
					alamat,
					object,
					model,
					no_polisi,
					next_inst_no,
					sisa_pokok,
					tgl_angs_lama,
					tgl_angs_baru,
					bunga_harian,
					biaya_admin,
					biaya_total,
					analyst2,
					no_rv,
					no_kontrak
				},
				cache: false,
				success: function(response) {
					console.log(response);
					if (response) {
						try {
							var data = JSON.parse(response);
							if (data['Status'] == '500') {
								alert_error(data['ErrorMessage']);
							}else if (data['Status'] == '200'){
								$("#ipt-print-draft" ).val(response);
								$("#frm-print-draft-rcd" ).submit();
							}
						} catch (e) {
							$('#loading-ajax').hide();
							alert_error("Terjadi Kesalahan => "+e);
						}
					}
				},
				error: function(response) {
					console.log(response);
				}
			});
		}
	}else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

$('#btn-print-memo-rcd').click(function() {

	var kontrak_id = $('#ipt-id-kontrak-rcd').val();
	var cabang = $('#slc-branch-rcd').val();
	var next_inst_no = $('#ipt-next-inst-no-rcd').val();
	var no_memo = $('#ipt-no-memo-rcd').val();
	var memo_date = $('#ipt-tgl-memo-rcd').val();
	var no_kontrak = $('#ipt-no-kontrak-rcd').val();
	var customer_name = $('#ipt-nama-nasabah-rcd').val();
	var alamat = $('#ipt-alamat-rcd').val();
	var object = $('#ipt-objek-rcd').val();
	var model = $('#ipt-brandmodel-rcd').val();
	var no_polisi = $('#ipt-no-polisi-rcd').val();
	var alasan = $('#ipt-alasan-rcd').val();
	var tgl_angs_lama = $('#ipt-tgl-inst-lama-rcd').val();
	var tgl_angs_baru = $('#ipt-tgl-inst-baru-rcd').val();
	var bunga_harian = accounting.unformat($('#ipt-biaya-bunga-harian-rcd').val());
	var biaya_admin =  accounting.unformat($('#ipt-biaya-admin-rcd').val());
	var biaya_total = accounting.unformat($('#ipt-biaya-total-rcd').val());
	var pembayaran_bulanan =  accounting.unformat($('#ipt-pembayaran-bulanan-rcd').val());

	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_rescheduling/print_memo",
			dataType: 'json',
			type: 'POST',
			data: {
				kontrak_id,
				cabang,
				next_inst_no,
				no_memo,
				memo_date,
				no_kontrak,
				customer_name,
				alamat,
				object,
				model,
				no_polisi,
				alasan,
				tgl_angs_lama,
				tgl_angs_baru,
				bunga_harian,
				biaya_admin,
				biaya_total,
				pembayaran_bulanan
			},
			cache: false,
			success: function(response) {
				console.log(response);
				if (response) {
					try {
						var data = JSON.parse(response);
						if (data['Status'] == '500') {
							alert_error(data['ErrorMessage']);
						}else if (data['Status'] == '200'){
							$("#ipt-print-memo" ).val(response);
							$("#frm-print-memo-rcd" ).submit();
						}
					} catch (e) {
						$('#loading-ajax').hide();
						alert_error("Terjadi Kesalahan => "+e);
					}
				}
			},
			error: function(response) {
				console.log(response);
			}
		});
	}else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

$('#btn-print-history-rcd').click(function() {
	var kontrak_id = $('#ipt-id-kontrak-rcd').val();
	var kontrak_no = $('#ipt-no-kontrak-rcd').val();
	var cabang = $('#slc-branch-rcd').val();
	var customer_name = $('#ipt-nama-nasabah-rcd').val();
	var model = $('#ipt-brandmodel-rcd').val();
	var no_polisi = $('#ipt-no-polisi-rcd').val();

	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_rescheduling/print_paymentHistory",
			dataType: 'json',
			type: 'POST',
			data: {
				kontrak_id,
				kontrak_no,
				cabang,
				customer_name,
				model,
				no_polisi
			},
			cache: false,
			success: function(response) {
				console.log(response);
				if (response) {
					try {
						var data = JSON.parse(response);
						if (data['Status'] == '500') {
							alert_error(data['ErrorMessage']);
						}else if (data['Status'] == '200'){
							$("#ipt-print-ph" ).val(response);
							$("#frm-print-payment-rcd" ).submit();
						}
					} catch (e) {
						$('#loading-ajax').hide();
						alert_error("Terjadi Kesalahan => "+e);
					}
				}
			},
			error: function(response) {
				console.log(response);
			}
		});
	}else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});