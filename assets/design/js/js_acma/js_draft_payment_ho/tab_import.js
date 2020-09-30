
var table_eitb_import = $('#tbl-display-eitb-import').DataTable({
	responsive: true,
});

var arr_display_acc_no =[];
var	arr_display_pv_no =[];
var	arr_display_result=[];
var	arr_display_reason=[];
var arr_display =[];
var array_disp_res = [];
var filename_import = '' ;
var tmppath_eitb = '';
var today = new Date();
var onemonthlater = new Date();
var dd = today.getDate();
var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";
var mm = month[today.getMonth()];
var mm2 = month[onemonthlater.getMonth()+1];
var yyyy = today.getFullYear();
if(dd<10){
	dd='0'+dd;
} 
var today = dd+'-'+mm+'-'+yyyy;
$("#inp-eitb-import-sysdate").val(today);

$('#btn-search-file-eitb-import').click(function(){
	$('#inp-eitb-import-file').click();
});

$('#inp-eitb-import-file').change(function(){
	arr_display_acc_no =[];
	arr_display_pv_no=[];
	arr_display_result=[];
	arr_display_reason=[];
	arr_display = [];
	filename_import = $('#inp-eitb-import-file')[0].files[0].name;
	ffile = event.target.files[0];
	var formdata = new FormData();
	formdata.append("file", ffile);
	$('#inp-eitb-import-filename').val(filename_import);
	//tmppath_eitb = URL.createObjectURL(event.target.files[0]);
	//$("img").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));

	$.ajax({
		url: base_url +"controller_export_import_bank/get_url_file",
		type: 'POST',
		timeput : 10000,
		dataType: 'json',
		contentType: false,
		processData: false,
		async: false,
		data:formdata,
		success: function(response){
			try {
				for (var i = 1; i < response.length; i++) {
					var resp =  response[i].toString();
					var res_array = resp.split(",");
					var acc_ben = res_array[2].split('/');
					var acc_no =  acc_ben[0];
					var ben_name = acc_ben[1];
					var pv_no = res_array[5].slice(0, res_array[5].indexOf('|'));
					var code = res_array[5].slice(-1);
					var result = res_array[7];
					var reason = res_array[8];
					arr_display.push({acc_no,pv_no,result,reason,code,ben_name});

				}
				console.log(arr_display);
			}

			catch(e) {
				alert(e);
				console.log(response);
				console.log(e);
			}
		},
		error: function(response){
			console.log(response);
			alert(response.responseText);
		}
	});
});



$('#btn-upload-eitb-import').click(function(){
	array_disp_res = [];
	console.log(arr_display);
	$.ajax({
		url: base_url +"controller_export_import_bank/get_mcm",
		type: 'POST',
		dataType: 'json',
		data:{
			"p_listRow": arr_display/*,
			"p_listAccno": arr_display_acc_no,
			"p_listPvno": arr_display_pv_no,
			"p_listResult": arr_display_result,
			"p_listReason": arr_display_reason*/
		},
		success: function(response){
			try {
				if (response['Status'] == 500) {
					alert_error(response['ErrMsg'])
				} else {
					if (response['Data'].length == 0) {
						alert_error('Data tidak ditemukan, mohon periksa file yang diupload!')
					}
					else {
						table_eitb_import.clear().draw();
						$.each(response['Data'], function(index) {
							var amount_formated = accounting.formatMoney(this['amount'], '', 2, ',', '.');
							array_disp_res.push([
								this['fpd_no'],
								this['pv_no'],
								this['code'],
								this['acc_no'] + '/' + this['beneficiery_name'],
								this['cus_ref_no'],
								this['unit'],
								amount_formated,
								this['result'],
								this['reason'],
								]);
						});
						table_eitb_import.rows.add(array_disp_res).draw();
						$("#btn-proses-eitb-import").prop('disabled', false);
						$("#import_pv_out").val(response['Pv_out']);

					}
				}
				console.log(response);
			}

			catch(e) {
				alert(e);
				console.log(response);
				console.log(e);
			}
		},
		error: function(response){
			console.log(response);
			alert(response.responseText);
		}
	});


	$('#btn-proses-eitb-import').click(function(){
		var pv_create_jurnal_ho = $("#import_pv_out").val();
		$.ajax({
			url: base_url +"controller_export_import_bank/jurnal_ho",
			type: 'POST',
			dataType: 'json',
			data:{
				"p_pv_no": pv_create_jurnal_ho
			},
			success: function(response){
				try {
					if (response['result'] == false) {
						alert_error(response['status'])
					} else {
						alert_info(response['success']);
					}
					console.log(response);
				}

				catch(e) {
					alert(e);
					console.log(response);
					console.log(e);
				}
			},
			error: function(response){
				console.log(response);
				alert(response.responseText);
			}
		});
	});

});













