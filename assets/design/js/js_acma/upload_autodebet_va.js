var tbl_autdebet_va = $('#table-upload-autodebet-va').DataTable({
	"responsive" : true,
	"bFilter" : false
});

var tbl_file_send_uad = $('#tbl-file-send-uad').DataTable({
	"responsive" : true
});

$('#tbl-file-send-uad').css('text-align', 'center');
var hasil_pilih = '';

tbl_autdebet_va.on( 'order.dt search.dt', function () {
    tbl_autdebet_va.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
        cell.innerHTML = i+1;
    } );
} ).draw();

$('#src-txt-file-uad').click(function(){
	$('#inp-txt-file-upload-uad').click();
	/*var file_send = $('#inp-txt-from-uad').val();
	if (file_send === '') {
		alert_error("Silahkan Pilih File Atodebet Yand Sudah Di Upload Ke MCM.");
		$('#div-txt-from-uad').addClass('has-error');
	}
	else{
		$('#div-txt-from-uad').removeClass('has-error');
		$('#inp-txt-file-upload-uad').click();
	}*/
});

if($('#pnl-upload-autodebet').length){
	file_autodebet_process();
};

// ------ TIDAK DIGUNAKAN ------------------
$('#src-txt-from-uad').click(function(){
	if (check_session() === 'true') {
		$.ajax({
			url : base_url + "Controller_upload_autodebet_va/get_file_send",
			type : 'GET',
			dataType : 'JSON',
			cache : false,
			success : function(response){
				console.log(response);
				if (response) {
					try{
						tbl_file_send_uad.clear().draw();
						if (response['errorConsole']) {
							alert_error(response['errorConsole']);
						}
						else if (response['result'].length === 0) {
							alert_error("Tidak Ada File Yang Di Upload Ke MCM");
						}
						else {
							$('#modal-file-send-uad').modal('show');
							$.each(response['result'], function(i){
								tbl_file_send_uad.row.add([
									this['create_date'],
									this['file_send']
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
				if (response['responseText'] === "" && response['statusText'] === 'OK') {
					alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
						localStorage.clear();
						window.location.href = base_url + "Controller_login/login_view";
					});
				}
				else if (response['statusText'] === 'Internal Server Error') {
					alert_error("Koneksi Ke Server Terputus, Silahkan Refresh Halaman.");
				}
			}
		});
	}
	else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

$('#tbl-file-send-uad').on('click', 'tr', function(){
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
        hasil_pilih = '';
    }
    else{
        tbl_file_send_uad.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        hasil_pilih = tbl_file_send_uad.row(this).data();
    }
});

/*$('#tbl-file-send-uad').on('dblclick', 'tr', function(){
	hasil_pilih = tbl_file_send_uad.row(this).data();
	$('#modal-file-send-uad').modal('hide');
	$('#inp-txt-from-uad').val(hasil_pilih[1]);
});*/

$('#btn-pilih-file-send-uad').click(function(){
	$('#modal-file-send-uad').modal('hide');
	$('#inp-txt-from-uad').val(hasil_pilih[1]);
});
//----------------------------------------------------------------------------

var upload_file = [];
var code_file = '';
var txt_row_excel = '';
$('#inp-txt-file-upload-uad').change(function(){
	var file = $('#inp-txt-file-upload-uad').val();
	var file_ = file.split('\\');
	var ffile_ = file_[2];
	console.log(ffile_);
	$('#inp-txt-file-uad').val(ffile_);

	var file_export = $('#inp-txt-file-upload-uad')[0].files[0];
	console.log(file_export);
	var formData = new FormData(); // Currently empty
	formData.append('file', file_export);
	console.log(formData);
	upload_file = [];

	if (check_session() === 'true') {
		$.ajax({
			url : base_url + "Controller_upload_autodebet_va/get_file",
			type: 'POST',
			timeput : 10000,
			dataType: 'json',
			contentType: false,
			processData: false,
			async: false,
			data : formData,
			success : function(response){
				console.log(response);
				if (response) {
					/*var res = $.parseJSON(response);
					console.log(res);*/					
					try{
						txt_row_excel = response.length;
						code_file = response[0]['Remark'];
						console.log(txt_row_excel);
						$.each(response, function(i){
							var execute_date = response[i]['Executed Date'];
							var reference_no = response[i]['Refference No.'];
							var credit_account = response[i]['Creditted Account'];
							var debitted_account = response[i]['Debitted Account'];
							var remark = response[i]['Remark'];
							var customer = response[i]['Customer Reference No'];
							var amount = response[i]['Amount'];
							var success = response[i]['Successfull/Fail'];
							var reason = response[i]['Reason'];
							
							upload_file.push({
								ffile_ : ffile_,
								remark : remark,
								kontrak_id : customer,
								amount : amount,
								execute_date : execute_date,
								success : success
							});
						});
						console.log(upload_file);
					}
					catch(e){
						$('#loading-ajax').hide();
						alert_error(e);
					}
				}
			},
			error : function(response){
				console.log(response);
				if (response['responseText'] === "" && response['statusText'] === 'OK') {
					alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
						localStorage.clear();
						window.location.href = base_url + "Controller_login/login_view";
					});
				}
				else if (response['statusText'] === 'Internal Server Error') {
					alert_error("Koneksi Ke Server Terputus, Silahkan Refresh Halaman.");
				}
			}
		});
	}
	else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

$('#btn-upload-autodebet-va').click(function(){
	console.log(upload_file);
	console.log(code_file);
	var text_file = $('#inp-txt-file-uad').val();
	var user = $('#hdn-user-upload').val();

	var fileName = text_file.split('.');
	var fName = fileName[0];

	if (check_session() === 'true') {
		if (text_file === '') {
			$('#div-txt-file-uad').addClass('has-error');
			alert_info("Silahkan Pilih File Respon Autodebet Dari MCM.");
		}
		else{
			$('#div-txt-file-uad').removeClass('has-error');
			$.ajax({
				url : base_url + "Controller_upload_autodebet_va/upload_autodebet",
				type : 'POST',
				dataType : 'JSON',
				data : {
					text_file : text_file,
					codefile : code_file,
					user : user,
					list : upload_file
				},
				cache : false,
				success : function(response){
					console.log(response);
					if (response) {
						try{
							var array = [];
							tbl_autdebet_va.clear().draw();
							if (response['errorConsole']) {
								alert_error(response['errorConsole']);
							}
							else if (response['pesan'] === 'Proses upload data selesai') {
								alert_info("Proses Upload Data Selesai.");
								$('#inp-jumlah-kontrak-uad').val(txt_row_excel);
								var txt;
								var file = [];
								$.each(response['data'], function(){
									array.push([
										this['branch_id'],
										this['contract_id'],
										this['installment_no'],
										accounting.formatMoney(this['amount'], '', 2, ',', '.'),
										this['status_success_fail'],
										this['tgl_koleksi']
									]);
									/*tbl_autdebet_va.row.add([
										this['branch_id'],
										this['contract_id'],
										this['installment_no'],
										accounting.formatMoney(this['amount'], '', 2, ',', '.'),
										this['status_success_fail'],
										this['tgl_koleksi']
									]).draw(false);*/
								});
								tbl_autdebet_va.rows.add(array).draw();

								var kontrak_deactive = response['list_kontrak'];
								if (kontrak_deactive.length !== 0) {

									alert_info("Terdapat Kontrak Invalid", function(){
										for (var i = 0; i < kontrak_deactive.length; i++) {
											txt = "\r" + kontrak_deactive[i]['contract_id'] + "," + kontrak_deactive[i]['reason'];
											file.push(txt);
										}

										var uri = 'data:application/txt;charset=UTF-8,' + encodeURIComponent(file);
		                                var downloadLink = document.createElement("a");
		                                downloadLink.href = uri;
		                                downloadLink.download = 'Kontrak_' + fName + '.txt';
		                                document.body.appendChild(downloadLink);
		                                downloadLink.click();
		                                document.body.removeChild(downloadLink);
									});
								}
							}
							else {
								alert_info(response['pesan']);
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
					if (response['responseText'] === "" && response['statusText'] === 'OK') {
						alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
							localStorage.clear();
							window.location.href = base_url + "Controller_login/login_view";
						});
					}
					else if (response['statusText'] === 'Internal Server Error') {
						alert_error("Koneksi Ke Server Terputus, Silahkan Refresh Halaman.");
					}
				}
			});
		}
	}
	else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

$('#btn-create-rv-upload-adv').click(function(){
	var row_excel = $('#inp-jumlah-kontrak-uad').val();
	var row_table = tbl_autdebet_va.length;
	var list_data = [];

	var list_autodebet = tbl_autdebet_va.data();
	console.log(list_autodebet);

	//var total_nominal = 0;
	/*for (var x = 0; x < list_autodebet.length; x++) {
		total_nominal += accounting.unformat(list_autodebet[x][3]); 
	}*/

	for (var i = 0; i < list_autodebet.length; i++) {
		list_data.push({
			txt_file : $('#inp-txt-file-uad').val(),
			cabang : list_autodebet[i][0],
			kontrak_id : list_autodebet[i][1],
			status : list_autodebet[i][4],
			tgl_koleksi : list_autodebet[i][5],
			jumlah_nominal : accounting.unformat(list_autodebet[i][3])
			//total_nominal : total_nominal
		});
		row_table++;
	}

	console.log(row_table);
	console.log(list_data);

	if (check_session() === 'true') {
		if (row_table === 0) {
			alert_error("Tidak ada No Kontrak yang Dipilih");
		}
		else if (parseInt(row_table) !== parseInt(row_excel)) {
			alert_error("Jumlah Kontrak Di Excel Tidak Sama Dengan Grid Hasil Upload");
		}
		else{
			alert_info("Yakin Akan Create RV?", function(){
				create_rv_autodebet(list_data);
			});
		}
	}
	else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

function file_autodebet_process(){
	$.ajax({
		url : base_url + "Controller_upload_autodebet_va/get_file_send",
		type : 'GET',
		dataType : 'JSON',
		cache : false,
		success : function(response){
			console.log(response);
			if (response) {
				try{
					$('#slc-file-upload-autodebet').empty();

					if (response['errorConsole']) {
						alert_error(response['errorConsole']);
					}
					else if (response['result'].length === 0) {
						alert_error("Tidak Ada File Yang Di Upload Ke MCM");
					}
					else {
						$('<option/>').val('').html('').appendTo('#slc-file-upload-autodebet').addClass('form-control');
						$.each(response['result'], function(i){
							$('#slc-file-upload-autodebet').append('<option value="'+response['result'][i]['file_send']+'">'+response['result'][i]['create_date']+ ' - ' +response['result'][i]['file_send']+'</option>');
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
			if (response['responseText'] === "" && response['statusText'] === 'OK') {
				alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
					localStorage.clear();
					window.location.href = base_url + "Controller_login/login_view";
				});
			}
			else if (response['statusText'] === 'Internal Server Error') {
				alert_error("Koneksi Ke Server Terputus, Silahkan Refresh Halaman.");
			}
		}
	});
}

function create_rv_autodebet(list_data){
	var txt_file = $('#inp-txt-file-uad').val();
	var user = $('#hdn-user-upload').val();
	$.ajax({
		url : base_url + "Controller_upload_autodebet_va/create_rv_autodebet",
		type : 'POST',
		dataType : 'JSON',
		data : {
			txt_file : txt_file,
			user : user,
			list_data : list_data
		},
		cache : false,
		success : function(response){
			console.log(response);
			if (response) {
				try{
					if (response['errMessage']) {
						alert_error(response['errMessage']);
					}
					else if (response['errorConsole']) {
						alert_error(response['errorConsole']);
					}
					else if (response['result']) {
						alert_info(response['result'], function(){
							window.location.href = base_url + "Controller_upload_autodebet_va";
						})
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
			if (response['responseText'] === "" && response['statusText'] === 'OK') {
				alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
					localStorage.clear();
					window.location.href = base_url + "Controller_login/login_view";
				});
			}
			else if (response['statusText'] === 'Internal Server Error') {
				alert_error("Koneksi Ke Server Terputus, Silahkan Refresh Halaman.");
			}
		}
	});
}