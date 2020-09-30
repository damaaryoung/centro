var branch_code = $('#pvrv-branch-code').val();
var branch_name = $('#pvrv-branch-name').val();
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
var m_names = new Array("", "Jan", "Feb", "Mar",
	"Apr", "May", "Jun", "Jul", "Aug", "Sep",
	"Oct", "Nov", "Dec");
if (dd < 10) {
	dd = '0' + dd
}
today = dd + '-' + m_names[mm] + '-' + yyyy;



$('#inp-tglmis-from-pvrv').datetimepicker({
	format: 'DD-MMM-YYYY',
	allowInputToggle: true,
	maxDate: new Date()
})

$('#inp-tglmis-to-pvrv').datetimepicker({
	format: 'DD-MMM-YYYY',
	allowInputToggle: true,
	maxDate: new Date(),
	minDate : today
})

$('#inp-tglmis-to-pvrv').blur(function(){
	var bfdate = $('#inp-tglmis-from-pvrv').val();
	var nextDay = new Date(bfdate);
	var d = nextDay.addDays(7).format('dd-mm-yyyy');
	
});

Date.prototype.addDays = function(days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

$('#inp-tglmis-from-pvrv').blur(function(){
	var bfdate = $('#inp-tglmis-from-pvrv').val();
	var nextDay = new Date(bfdate);
	var d = nextDay.addDays(30);
	var todai = new Date();
	if(d > todai){
		$('#inp-tglmis-to-pvrv').data('DateTimePicker').minDate(nextDay);
		$('#inp-tglmis-to-pvrv').data('DateTimePicker').maxDate(todai);
		$('#inp-tglmis-to-pvrv').val(todai.format('dd-mmm-yyyy'));
		return false;
	}
	$('#inp-tglmis-to-pvrv').data('DateTimePicker').minDate(nextDay);
	$('#inp-tglmis-to-pvrv').data('DateTimePicker').maxDate(d);
	$('#inp-tglmis-to-pvrv').val(d.format('dd-mmm-yyyy'));
});

$('#rb-mis-pvrv-pccode').click(function(){
	$('#rb-mis-pvrv-pvrv').prop('checked', false);
	$('#div-idmis-group').prop('hidden', false);
})

$('#rb-mis-pvrv-pvrv').click(function(){
	$('#rb-mis-pvrv-pccode').prop('checked', false);
	$('#div-idmis-group').prop('hidden', true);
	$('#rb-mis-pvrv-all').prop('checked', false);
	$('#rb-mis-pvrv-class').prop('checked', false);
})

$('#rb-mis-pvrv-all').click(function(){
	$('#rb-mis-pvrv-class').prop('checked', false);
})

$('#rb-mis-pvrv-class').click(function(){
	$('#rb-mis-pvrv-all').prop('checked', false);
})

if($('#slc-mis-pvrv-sub').val() == 0){
	$('#div-id-receive').prop('hidden', true)
}

$('#rb-mis-pvrv-detail').click(function(){
	$('#rb-mis-pvrv-sumarry').prop('checked', false);
	$('#div-id-receive').prop('hidden', false);
	$('#div-id-pvrv-pk').prop('hidden', false);
	$('#div-idmis-group').prop('hidden', true);
	$('#div-id-pvrv-bank').prop('hidden', true);
})

$('#rb-mis-pvrv-sumarry').click(function(){
	$('#rb-mis-pvrv-detail').prop('checked', false);
	$('#div-id-pvrv-bank').prop('hidden', false);
	$('#div-id-pvrv-pk').prop('hidden', true);
	$('#div-idmis-group').prop('hidden', true);
	$('#rb-mis-pvrv-all').prop('checked', false);
	$('#rb-mis-pvrv-class').prop('checked', false);
	$('#rb-mis-pvrv-pccode').prop('checked', false);
	$('#rb-mis-pvrv-pvrv').prop('checked', false);
	$('#div-id-receive').prop('hidden', true);
	getBankSum();
})

$('#btn-preview-cfr-pvrv').click(function(){
	var laporan = $('#slc-mis-pvrv-sub').val();
	var tglawal = $('#inp-tglmis-from-pvrv').val();
	var tglakhir = $('#inp-tglmis-to-pvrv').val();
	var paid = $('#slc-mis-pvrv-payment').val();
	var receive = $('#slc-mis-pvrv-payment').val();
	var pccode = $('#rb-mis-pvrv-pccode').val();
	var pvrv = $('#rb-mis-pvrv-pvrv').val();
	var gjall = $('#rb-mis-pvrv-all').val();
	var glclass = $('#rb-mis-pvrv-class').val();
	var tprint = $('#slc-mis-pvrv-format').val();
})


//-----------------------BUTTON PRINT-----------------------\\
var init = 0;
var pk;
var gb;
var fcsv;

$('#btn-preview-cfr-pvrv').click(function(){
	var sub = $('#slc-mis-pvrv-sub').val();
	var format = $('#slc-mis-pvrv-format').val();
	var pvstatus = $('#slc-mis-pvrv-payment').val();
	var rvstatus = $('#slc-mis-pvrv-receive').val();

	if(pvstatus == "3" || rvstatus == "1" || $('#rb-mis-pvrv-sumarry').prop('checked')){
		if(sub ==1){
			if($('#rb-mis-pvrv-detail').prop('checked') == false  && $('#rb-mis-pvrv-sumarry').prop('checked') == false ){
				alert_info("Silahkan Pilih Jenis Laporan");
				return false;
			}else if(format == "- SILAHKAN PILIH -"){
				alert_info("Silahkan Pilih Format Print");
				return false;
			}
			flag = 1;
			if($('#rb-mis-pvrv-detail').prop('checked') == true){
				if($('#slc-mis-pvrv-receive').val() == '- SILAHKAN PILIH -'){
					alert_info("Silahkan Pilih Jenis Payment");
					return false;
				}else if($('#rb-mis-pvrv-pvrv').prop('checked') == false && $('#rb-mis-pvrv-pccode').prop('checked') == false){
					alert_info("Silahkan Pilih Pengelompokan");
					return false;
				}
				if($('#rb-mis-pvrv-pvrv').is(":checked")){
					pk = 2;
					gb = 2;
					if(format == 0){
						print_excel_rv();
					}else if(format == 2){
						getDataArr();
						// if(fcsv != 1){
						// 	genereate_csv_rv(tmp,tmp2,tmp3);
						// }
					}else if(format == 1){
						init = 2;
						getPDF_rv1();
					}
				}else if($('#rb-mis-pvrv-pccode').prop('checked') == true){ 
					if($('#rb-mis-pvrv-all').prop('checked') == false && $('#rb-mis-pvrv-class').prop('checked') == false){
						alert_info("Silahkan Pilih Group By");
						return false;
					}
					if($('#rb-mis-pvrv-class').prop('checked') == true){
						pk = 1;
						gb = 0;
						if(format == 0){
							print_excel_rv();
						}else if(format == 2){
							getDataRV2();
							// if(fcsv != 1){
							// 	genereate_csv_rv2(tmp,tmp2,tmp3,tmp4);
							// }
						}else if(format == 1){
							init = 3;
							getPDF_rv1();
						}
					}else if($('#rb-mis-pvrv-all').prop('checked') == true){
						pk = 1;
						gb = 1;
						if(format == 0){
							print_excel_rv();
						}else if(format == 2){
							getDataRV2();
							// if(fcsv != 1){
							// 	genereate_csv_rv2(tmp,tmp2,tmp3,tmp4);
							// }
						}else if(format == 1){
							init = 3;
							getPDF_rv1();
						}
					}
				}
			}else if($('#rb-mis-pvrv-sumarry').prop('checked') == true){
				flag = 2;
				if(format == 1){
					init = 1;
					getPDF_rv1();
				}else if(format == 2){
					getDataSumRv();
					// if(fcsv != 1){
					// 	genereate_csv_sumrv(tmp, tmp2, tmp3);
					// }
				}else if(format == 0){
					print_excel_sumrv();
				}
			}
		}else if(sub == 0){
			if(format == "- SILAHKAN PILIH -"){
				alert_info("Silahkan Pilih Format Print");
				return false;
			}else if($('#rb-mis-pvrv-pvrv').prop('checked') == false && $('#rb-mis-pvrv-pccode').prop('checked') == false){
				alert_info("Silahkan Pilih Pengelompokan");
				return false;
			}else if($('#slc-mis-pvrv-payment').val() == "sp"){
				alert_info("Silahkan Pilih Jenis Payment");
				return false;
			}
			if($('#rb-mis-pvrv-pvrv').prop('checked') == true){
				flag = 3;
				gb = 0;
				if(format == 1){
					init =1;
					getPDF_pv1();
				}else if(format == 2){
					pk = 2;
					getDataArrPv();
					// if(fcsv != 1){
					// 	genereate_csv_pv(tmp,tmp2,tmp3);
					// }
				}else if(format == 0){
					pk = 2;
					print_excel_pv();
				}
			}else if($('#rb-mis-pvrv-pccode').prop('checked') == true){
				if($('#rb-mis-pvrv-all').prop('checked') == false && $('#rb-mis-pvrv-class').prop('checked') == false){
					alert_info("Silahkan Pilih Group By");
					return false;
				}
				if($('#rb-mis-pvrv-class').prop('checked') == true){
					flag = 3;
					gb = 0;
					if(format == 0){
						pk = 1;
						print_excel_pv();
					}else if(format == 2){
						pk = 1;
						getDataPV2();
						// if(fcsv != 1){
						// 	genereate_csv_pv2(tmp,tmp2,tmp3,tmp4);
						// }
					}else if(format == 1){
						init = 2;
						getPDF_pv1();
					}
				}else if($('#rb-mis-pvrv-all').prop('checked') == true){
					flag = 3;
					gb = 1;
					if(format == 0){
						pk = 1;
						print_excel_pv();
					}else if(format == 2){
						pk = 1;
						getDataPV2();
						// if(fcsv != 1){
						// 	genereate_csv_pv2(tmp,tmp2,tmp3,tmp4);
						// }
					}else if(format == 1){
						init = 2;
						getPDF_pv1();
					}
				}
			}
		}
	}else{
		if(sub ==1){
			if($('#rb-mis-pvrv-detail').prop('checked') == false  && $('#rb-mis-pvrv-sumarry').prop('checked') == false ){
				alert_info("Silahkan Pilih Jenis Laporan");
				return false;
			}else if(format == "- SILAHKAN PILIH -"){
				alert_info("Silahkan Pilih Format Print");
				return false;
			}
			flag = 1;
			if($('#rb-mis-pvrv-detail').prop('checked') == true){
				if($('#slc-mis-pvrv-receive').val() == '- SILAHKAN PILIH -'){
					alert_info("Silahkan Pilih Jenis Payment");
					return false;
				}else if($('#rb-mis-pvrv-pvrv').prop('checked') == false && $('#rb-mis-pvrv-pccode').prop('checked') == false){
					alert_info("Silahkan Pilih Pengelompokan");
					return false;
				}
				if($('#rb-mis-pvrv-pvrv').is(":checked")){
					gb = 2;
					pk = 3;
					if(format == 0){
						print_excel_rv();
					}else if(format == 2){
						getDataRV3();
						// if(fcsv != 1){
						// 	genereate_csv_rv3(tmp,tmp2);
						// }
					}else if(format == 1){
						init = 4;
						getPDF_rv1();
					}
				}else if($('#rb-mis-pvrv-pccode').prop('checked') == true){ 
					if($('#rb-mis-pvrv-all').prop('checked') == false && $('#rb-mis-pvrv-class').prop('checked') == false){
						alert_info("Silahkan Pilih Group By");
						return false;
					}
					if($('#rb-mis-pvrv-class').prop('checked') == true){
						pk = 4;
						gb = 0;
						if(format == 0){
							print_excel_rv();
						}else if(format == 2){
							getDataRV4();
							// if(fcsv != 1){
							// 	genereate_csv_rv4(tmp,tmp2,tmp3);
							// }
						}else if(format == 1){
							init = 5;
							getPDF_rv1();
						}
					}else if($('#rb-mis-pvrv-all').prop('checked') == true){
						pk = 4;
						gb = 1;
						if(format == 0){
							print_excel_rv();
						}else if(format == 2){
							getDataRV4();
							// if(fcsv != 1){
							// 	genereate_csv_rv4(tmp,tmp2,tmp3);
							// }
						}else if(format == 1){
							init = 5;
							getPDF_rv1();
						}
					}
				}
			}
		}else if(sub == 0){
			if(format == "- SILAHKAN PILIH -"){
				alert_info("Silahkan Pilih Format Print");
				return false;
			}else if($('#rb-mis-pvrv-pvrv').prop('checked') == false && $('#rb-mis-pvrv-pccode').prop('checked') == false){
				alert_info("Silahkan Pilih Pengelompokan");
				return false;
			}else if($('#slc-mis-pvrv-payment').val() == "sp"){
				alert_info("Silahkan Pilih Jenis Payment");
				return false;
			}
			if($('#rb-mis-pvrv-pvrv').prop('checked') == true){
				flag = 3;
				gb = 0;
				pk = 3;
				if(format == 1){
					init =3;
					getPDF_pv1();
				}else if(format == 2){
					getDataPV3();
					// if(fcsv != 1){
					// 	genereate_csv_pv3(tmp,tmp2);
					// }
				}else if(format == 0){
					print_excel_pv();
				}
			}else if($('#rb-mis-pvrv-pccode').prop('checked') == true){
				if($('#rb-mis-pvrv-all').prop('checked') == false && $('#rb-mis-pvrv-class').prop('checked') == false){
					alert_info("Silahkan Pilih Group By");
					return false;
				}
				if($('#rb-mis-pvrv-class').prop('checked') == true){
					flag = 3;
					gb = 0;
					pk = 4;
					if(format == 0){
						print_excel_pv();
					}else if(format == 2){
						getDataPV4();
						// if(fcsv != 1){
						// 	genereate_csv_pv4(tmp,tmp2,tmp3);
						// }
					}else if(format == 1){
						init = 4;
						getPDF_pv1();
					}
				}else if($('#rb-mis-pvrv-all').prop('checked') == true){
					flag = 3;
					gb = 1;
					pk = 4;
					if(format == 0){
						print_excel_pv();
					}else if(format == 2){
						getDataPV4();
						// if(fcsv != 1){
						// 	genereate_csv_pv4(tmp,tmp2,tmp3);
						// }
					}else if(format == 1){
						init = 4;
						getPDF_pv1();
					}
				}
			}
		}

	}
});

//-----------------------END BUTTON PRINT-----------------------\\

//------------------------EXCEL PRITN-------------------\\
var print = [];
var flag = 0;

function print_excel_rv(){
	if (check_session() === 'true') {
		var dtfrom = $('#inp-tglmis-from-pvrv').val();
		var dtto = $('#inp-tglmis-to-pvrv').val();
		var status = $('#slc-mis-pvrv-receive').val();
		var rvstatus;

		if(status == "0"){
			rvstatus = "SAVE";
		}else if(status == "1"){
			rvstatus = "RECEIVE";
		}else{
			rvstatus = "CANCEL";
		}

		$.ajax({
			url: base_url + 'Controller_flow_report/getExcelRV',
			type: 'POST',
			dataType: 'json',
			data:
			{
				dtfrom:dtfrom,
				dtto:dtto,
				status:status,
				branch_code:branch_code,
				flag:flag,
				pk:pk,
				gb:gb
			},
			success:function(response){
				console.log(response);
				if (response["result"] == "") {
					alert_info('Data tidak ditemukan.');
					return false;
				}else if(response){
					try{
						download(response.result,'REPORT RV '+rvstatus+'.xls',"application/vnd.ms-excel");
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => " + e);
					}
				}else{
					alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
				}
			},
			error: function(response) {
				console.log(response);
				if (response['responseText'] === "" && response['statusText'] === 'OK') {
					alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
						localStorage.clear();
						window.location.href = base_url + "Controller_login/login_view";
					});
				}else if (response['statusText'] === 'Internal Server Error') {
					alert_error('Gagal Terhubung ke Server: ' + response['responseText']);
				}else if (response['responseText'] !== null || response['responseText'] !== "") {
					alert_error(response['responseText']);
				}
			}
		});
	}else{
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
}

function print_excel_pv(){
	if (check_session() === 'true') {
		var dtfrom = $('#inp-tglmis-from-pvrv').val();
		var dtto = $('#inp-tglmis-to-pvrv').val();
		var status = $('#slc-mis-pvrv-payment').val();
		var pvstatus;

		if(status == "0"){
			pvstatus = "SAVE";
		}else if(status == "3"){
			pvstatus = "PAID";
		}else{
			pvstatus = "CANCEL";
		}

		$.ajax({
			url: base_url + 'Controller_flow_report/getExelPV',
			type: 'POST',
			dataType: 'json',
			data:
			{
				dtfrom:dtfrom,
				dtto:dtto,
				status:status,
				branch_code:branch_code,
				flag:flag,
				pk:pk,
				gb:gb
			},
			success:function(response){
				console.log(response);
				if (response["result"] == "") {
					alert_info('Data tidak ditemukan.');
					return false;
				}else if(response){
					
					try{
						download(response.result,'REPORT PV '+pvstatus+'.xls',"application/vnd.ms-excel");
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => " + e);
					}
				}else{
					alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
				}
			},
			error: function(response) {
				console.log(response);
				if (response['responseText'] === "" && response['statusText'] === 'OK') {
					alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
						localStorage.clear();
						window.location.href = base_url + "Controller_login/login_view";
					});
				}else if (response['statusText'] === 'Internal Server Error') {
					alert_error('Gagal Terhubung ke Server: ' + response['responseText']);
				}else if (response['responseText'] !== null || response['responseText'] !== "") {
					alert_error(response['responseText']);
				}
			}
		});
	}else{
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
}

function print_excel_sumrv(){
	if (check_session() === 'true') {
		var dtfrom = $('#inp-tglmis-from-pvrv').val();
		var dtto = $('#inp-tglmis-to-pvrv').val();
		var bank = $('#slc-mis-pvrv-bank').val();

		$.ajax({
			url: base_url + 'Controller_flow_report/getExcelSumRv2',
			type: 'POST',
			dataType: 'json',
			data:
			{
				dtfrom:dtfrom,
				dtto:dtto,
				branch_code:branch_code,
				bank:bank
			},
			success:function(response){
				console.log(response);
				if (response["result"] == "") {
					alert_info('Data tidak ditemukan.');
					return false;
				}else if(response){
					try{
						download(response.result,'Report RV.xls',"application/vnd.ms-excel");
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => " + e);
					}
				}else{
					alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
				}
			},
			error: function(response) {
				console.log(response);
				if (response['responseText'] === "" && response['statusText'] === 'OK') {
					alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
						localStorage.clear();
						window.location.href = base_url + "Controller_login/login_view";
					});
				}else if (response['statusText'] === 'Internal Server Error') {
					alert_error('Gagal Terhubung ke Server: ' + response['responseText']);
				}else if (response['responseText'] !== null || response['responseText'] !== "") {
					alert_error(response['responseText']);
				}
			}
		});
	}else{
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
}

//------------------------END EXCEL PRITN-------------------\\

//------------------------CSV PRITN-------------------\\
function genereate_csv_rv(array,array2,array3){
	var status = $('#slc-mis-pvrv-receive').val();
	var rvstatus;

	if(status == "0"){
		rvstatus = "SAVE";
	}else if(status == "1"){
		rvstatus = "RECEIVE";
	}else{
		rvstatus = "CANCEL";
	}
	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/read_csv_rv1",
			dataType: 'text',
			type: 'POST',
			data : {array, array2, array3},
			cache: false,
			success: function(response){              
				if(response) {
					try {
						console.log("ajax response success"); 
						console.log(response);
						var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                    //window.open(uri, 'test.csv');
                    var downloadLink = document.createElement("a");
                    downloadLink.href = uri;
                    downloadLink.download = 'REPORT RV '+rvstatus+'.csv';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    alert_info('Text File Berhasil Terbentuk Ke folder C://download/ ' + downloadLink.download);

                }catch(e) {
                $('#loading-ajax').hide(); //menutup loading ajax
                console.log(e);
                alert_error("Terjadi Kesalahan => " + e);
            }
        }else{
        	alert_error(response);
        }  

    },
    error:function(response){
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

function genereate_csv_rv2(array,array2,array3,array4){
	var status = $('#slc-mis-pvrv-receive').val();
	var rvstatus;

	if(status == "0"){
		rvstatus = "SAVE";
	}else if(status == "1"){
		rvstatus = "RECEIVE";
	}else{
		rvstatus = "CANCEL";
	}
	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/read_csv_rv2",
			dataType: 'text',
			type: 'POST',
			data : {array, array2, array3, array4},
			cache: false,
			async: false,
			success: function(response){               
				if(response) {
					try {
						console.log("ajax response success"); 
						console.log(response);
						var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                    //window.open(uri, 'test.csv');
                    var downloadLink = document.createElement("a");
                    downloadLink.href = uri;
                    downloadLink.download = 'REPORT RV '+rvstatus+'.csv';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    alert_info('Text File Berhasil Terbentuk Ke folder C://download/ ' + downloadLink.download);

                }catch(e) {
                $('#loading-ajax').hide(); //menutup loading ajax
                console.log(e);
                alert_error("Terjadi Kesalahan => " + e);
            }
        }else{
        	alert_error(response);
        }  

    },
    error:function(response){
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

function genereate_csv_rv3(array,array2){
	var status = $('#slc-mis-pvrv-receive').val();
	var rvstatus;

	if(status == "0"){
		rvstatus = "SAVE";
	}else if(status == "1"){
		rvstatus = "RECEIVE";
	}else{
		rvstatus = "CANCEL";
	}
	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/read_csv_rv3",
			dataType: 'text',
			type: 'POST',
			data : {array, array2},
			cache: false,
			success: function(response){              
				if(response) {
					try {
						console.log("ajax response success"); 
						console.log(response);
						var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                    //window.open(uri, 'test.csv');
                    var downloadLink = document.createElement("a");
                    downloadLink.href = uri;
                    downloadLink.download = 'REPORT RV '+rvstatus+'.csv';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    alert_info('Text File Berhasil Terbentuk Ke folder C://download/ ' + downloadLink.download);

                }catch(e) {
                $('#loading-ajax').hide(); //menutup loading ajax
                console.log(e);
                alert_error("Terjadi Kesalahan => " + e);
            }
        }else{
        	alert_error(response);
        }  

    },
    error:function(response){
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

function genereate_csv_rv4(array,array2,array3){
	var status = $('#slc-mis-pvrv-receive').val();
	var rvstatus;

	if(status == "0"){
		rvstatus = "SAVE";
	}else if(status == "1"){
		rvstatus = "RECEIVE";
	}else{
		rvstatus = "CANCEL";
	}
	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/read_csv_rv4",
			dataType: 'text',
			type: 'POST',
			data : {array, array2, array3},
			cache: false,
			success: function(response){              
				if(response) {
					try {
						console.log("ajax response success"); 
						console.log(response);
						var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                    //window.open(uri, 'test.csv');
                    var downloadLink = document.createElement("a");
                    downloadLink.href = uri;
                    downloadLink.download = 'REPORT RV '+rvstatus+'.csv';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    alert_info('Text File Berhasil Terbentuk Ke folder C://download/ ' + downloadLink.download);

                }catch(e) {
                $('#loading-ajax').hide(); //menutup loading ajax
                console.log(e);
                alert_error("Terjadi Kesalahan => " + e);
            }
        }else{
        	alert_error(response);
        }  

    },
    error:function(response){
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


function genereate_csv_pv(array,array2,array3){
	var status = $('#slc-mis-pvrv-payment').val();
	var pvstatus;

	if(status == "0"){
		pvstatus = "SAVE";
	}else if(status == "3"){
		pvstatus = "PAID";
	}else{
		pvstatus = "CANCEL";
	}
	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/read_csv_pv1",
			dataType: 'text',
			type: 'POST',
			data : {array, array2, array3},
			cache: false,
			async: false,
			success: function(response){                
				if(response) {
					try {
						console.log("ajax response success"); 
						console.log(response);
						var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                    //window.open(uri, 'test.csv');
                    var downloadLink = document.createElement("a");
                    downloadLink.href = uri;
                    downloadLink.download = 'REPORT PV '+pvstatus+'.csv';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    alert_info('Text File Berhasil Terbentuk Ke folder C://download/ ' + downloadLink.download);

                }catch(e) {
                $('#loading-ajax').hide(); //menutup loading ajax
                console.log(e);
                alert_error("Terjadi Kesalahan => " + e);
            }
        }else{
        	alert_error(response);
        }  

    },
    error:function(response){
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

function genereate_csv_pv2(array,array2,array3,array4){
	var status = $('#slc-mis-pvrv-payment').val();
	var pvstatus;

	if(status == "0"){
		pvstatus = "SAVE";
	}else if(status == "3"){
		pvstatus = "PAID";
	}else{
		pvstatus = "CANCEL";
	}
	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/read_csv_pv2",
			dataType: 'text',
			type: 'POST',
			data : {array, array2, array3, array4},
			cache: false,
			async: false,
			success: function(response){              
				if(response) {
					try {
						console.log("ajax response success"); 
						console.log(response);
						var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                    //window.open(uri, 'test.csv');
                    var downloadLink = document.createElement("a");
                    downloadLink.href = uri;
                    downloadLink.download = 'REPORT PV '+pvstatus+'.csv';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    alert_info('Text File Berhasil Terbentuk Ke folder C://download/ ' + downloadLink.download);

                }catch(e) {
                $('#loading-ajax').hide(); //menutup loading ajax
                console.log(e);
                alert_error("Terjadi Kesalahan => " + e);
            }
        }else{
        	alert_error(response);
        }  

    },
    error:function(response){
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

function genereate_csv_pv3(array,array2){
	var status = $('#slc-mis-pvrv-payment').val();
	var pvstatus;

	if(status == "0"){
		pvstatus = "SAVE";
	}else if(status == "3"){
		pvstatus = "PAID";
	}else{
		pvstatus = "CANCEL";
	}
	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/read_csv_pv3",
			dataType: 'text',
			type: 'POST',
			data : {array, array2},
			cache: false,
			async: false,
			success: function(response){                
				if(response) {
					try {
						console.log("ajax response success"); 
						console.log(response);
						var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                    //window.open(uri, 'test.csv');
                    var downloadLink = document.createElement("a");
                    downloadLink.href = uri;
                    downloadLink.download = 'REPORT PV '+pvstatus+'.csv';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    alert_info('Text File Berhasil Terbentuk Ke folder C://download/ ' + downloadLink.download);

                }catch(e) {
                $('#loading-ajax').hide(); //menutup loading ajax
                console.log(e);
                alert_error("Terjadi Kesalahan => " + e);
            }
        }else{
        	alert_error(response);
        }  

    },
    error:function(response){
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

function genereate_csv_pv4(array,array2,array3){
	var status = $('#slc-mis-pvrv-payment').val();
	var pvstatus;

	if(status == "0"){
		pvstatus = "SAVE";
	}else if(status == "3"){
		pvstatus = "PAID";
	}else{
		pvstatus = "CANCEL";
	}
	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/read_csv_pv4",
			dataType: 'text',
			type: 'POST',
			data : {array, array2, array3},
			cache: false,
			async: false,
			success: function(response){              
				if(response) {
					try {
						console.log("ajax response success"); 
						console.log(response);
						var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                    //window.open(uri, 'test.csv');
                    var downloadLink = document.createElement("a");
                    downloadLink.href = uri;
                    downloadLink.download = 'REPORT PV '+pvstatus+'.csv';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    alert_info('Text File Berhasil Terbentuk Ke folder C://download/ ' + downloadLink.download);

                }catch(e) {
                $('#loading-ajax').hide(); //menutup loading ajax
                console.log(e);
                alert_error("Terjadi Kesalahan => " + e);
            }
        }else{
        	alert_error(response);
        }  

    },
    error:function(response){
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

function genereate_csv_sumrv(array,array2,array3){
	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/read_csv_sumrv",
			dataType: 'text',
			type: 'POST',
			data : {array, array2, array3},
			success: function(response){                
				if(response) {
					try {
						$('#loading-ajax').show();
						console.log("ajax response success"); 
						console.log(response);
						var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                    //window.open(uri, 'test.csv');
                    var downloadLink = document.createElement("a");
                    downloadLink.href = uri;
                    downloadLink.download = 'REPORT SUMMARY RV.csv';
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                    alert_info('Text File Berhasil Terbentuk Ke folder C://download/ ' + downloadLink.download);

                }catch(e) {
                $('#loading-ajax').hide(); //menutup loading ajax
                console.log(e);
                alert_error("Terjadi Kesalahan => " + e);
            }
        }else{
        	alert_error(response);
        }  

    },
    error:function(response){
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

var tmp = [];
var tmp2 = [];
var tmp3 = [];
var tmp4 = [];

function getDataArr(){
	var dtfrom = $('#inp-tglmis-from-pvrv').val();
	var dtto = $('#inp-tglmis-to-pvrv').val();
	var status = $('#slc-mis-pvrv-receive').val();
	var rvstatus;

	if(status == "0"){
		rvstatus = "SAVE";
	}else if(status == "1"){
		rvstatus = "RECEIVE";
	}else{
		rvstatus = "CANCEL";
	}

	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/getCSVRV",
			dataType: 'text',
			type: 'POST',
			cache: false,
			data : {
				dtfrom:dtfrom,
				dtto:dtto,
				status:status,
				branch_code:branch_code,
				flag:flag,
				pk:pk,
				gb:gb
			},
			cache: false,
			success: function(response){
				response = $.parseJSON(response);               
				if(response["data"].length == 0) {
					fcsv = 1;
					alert_info('Data tidak ditemukan.');
					return false;
				}else if(response){
					try{
						var status = response['status'];
						if(status) {
							if (response['data'] == null) {
								alert_error('Data tidak ditemukan !');
							}else{
								tmp = [];
								tmp2 = [];
								tmp3 = [];
								for (var i = 0 ; i < response['data'].length; i++) {
									tmp.push([
										i+1,
										response['data'][i][0][0].szuser,
										response['data'][i][0][0].username,
										branch_code,
										branch_name,
										dtfrom,
										dtto,
										rvstatus
										])
									for (var j = 0 ; j < response['data'][i].length; j++) {
										tmp2.push([
											response['data'][i][j][0].szuser,	
											response['data'][i][j][0].bankname
											])
										for (var x = 0 ; x < response['data'][i][j].length; x++) {
											tmp3.push([
												response['data'][i][j][x].bankname,
												response['data'][i][j][x].objname,	
												response['data'][i][j][x].rcno,
												response['data'][i][j][x].custname,
												response['data'][i][j][x].insno,
												response['data'][i][j][x].rctype,
												response['data'][i][j][x].classcode,
												response['data'][i][j][x].docno,
												response['data'][i][j][x].remarks,
												response['data'][i][j][x].selhari,
												response['data'][i][j][x].amt_head,
												response['data'][i][j][x].szuser
												])
										}
									}
								}

								genereate_csv_rv(tmp,tmp2,tmp3);

							}
						}else{
							alert_error(response['errorConsole']);
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				}else{
					alert_error(response);
				}  

			},
			error:function(response){
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


function getDataArrPv(){
	var dtfrom = $('#inp-tglmis-from-pvrv').val();
	var dtto = $('#inp-tglmis-to-pvrv').val();
	var status = $('#slc-mis-pvrv-payment').val();
	var pvstatus;

	if(status == "0"){
		pvstatus = "SAVE";
	}else if(status == "3"){
		pvstatus = "PAID";
	}else{
		pvstatus = "CANCEL";
	}

	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/getCSVPV",
			dataType: 'text',
			type: 'POST',
			cache: false,
			data : {
				dtfrom:dtfrom,
				dtto:dtto,
				status:status,
				branch_code:branch_code,
				flag:flag,
				pk:pk,
				gb:gb
			},
			cache: false,
			success: function(response){
				response = $.parseJSON(response);          
				if(response["data"].length == 0) {
					fcsv = 1 ;
					alert_info('Data tidak ditemukan.');
					return false;
				}else if(response){
					try{
						var status = response['status'];
						if(status) {
							if (response['data'] == null) {
								alert_error('Data tidak ditemukan !');
							}else{
								tmp = [];
								tmp2 = [];
								tmp3 = [];
								for (var i = 0 ; i < response['data'].length; i++) {
									tmp.push([
										i+1,
										response['data'][i][0][0].szuser,
										response['data'][i][0][0].username,
										branch_code,
										branch_name,
										dtfrom,
										dtto,
										pvstatus
										])
									for (var j = 0 ; j < response['data'][i].length; j++) {
										tmp2.push([
											response['data'][i][j][0].szuser,
											response['data'][i][j][0].bankname
											])
										for (var x = 0 ; x < response['data'][i][j].length; x++) {
											tmp3.push([
												response['data'][i][j][x].bankname,
												response['data'][i][j][x].pvno,
												response['data'][i][j][x].custname,
												response['data'][i][j][x].pvtype,
												response['data'][i][j][x].pdcno,
												response['data'][i][j][x].amt_dit,
												response['data'][i][j][x].szuser
												])
										}
									}
								}

								genereate_csv_pv(tmp,tmp2,tmp3);

							}
						}else{
							alert_error(response['errorConsole']);
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				}else{
					alert_error(response);
				}  

			},
			error:function(response){
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

function getDataSumRv(){
	var dtfrom = $('#inp-tglmis-from-pvrv').val();
	var dtto = $('#inp-tglmis-to-pvrv').val();
	var bank = $('#slc-mis-pvrv-bank').val();
	var bankname = $('#slc-mis-pvrv-bank option:selected').text();
	bankname = bankname.substring('4','20');

	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/getExcelSumRv",
			dataType: 'text',
			type: 'POST',
			data : {
				dtfrom:dtfrom,
				dtto:dtto,
				bank:bank,
				branch_code:branch_code
			},
			cache: false,
			success: function(response){
				response = $.parseJSON(response);              
				if(response["data"].length == 0) {
					fcsv = 1;
					alert_info('Data tidak ditemukan.');
					return false;
				}else if(response){
					try{
						var status = response['status'];
						if(status) {
							if (response['data'] == null) {
								alert_error('Data tidak ditemukan !');
							}else{
								tmp = [];
								tmp2 = [];
								tmp3 = [];
								for (var i = 0 ; i < response['data'].length; i++) {
									tmp.push([
										i+1,
										response['data'][i][0].szuser,
										response['data'][i][0].username,
										bank,
										bankname,
										dtfrom,
										dtto,
										response['data'][i][0].alamat
										])
									for (var j = 0 ; j < response['data'][i].length; j++) {
										tmp2.push([
											response['data'][i][j].szuser,
											response['data'][i][j].objcode,
											response['data'][i][j].objname,
											response['data'][i][j].amt_head
											])
										var obj = response['data'][i][j].objcode;
										if(tmp3.length == 0){
											tmp3.push([response['data'][i][j].objcode,
												response['data'][i][j].objname,])
											continue;
										}
										var fazar = false;
										for(var z = 0; z < tmp3.length; z++){
											if(tmp3[z].includes(obj) == false){										
												fazar = true;											
											} else {
												fazar = false;
												break;
											}
										}
										if (fazar) {
											tmp3.push([response['data'][i][j].objcode,
												response['data'][i][j].objname,]);
										}										
									}
								}

								genereate_csv_sumrv(tmp,tmp2,tmp3);

							}

						}else{
							alert_error(response['errorConsole']);
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				}else{
					alert_error(response);
				}  

			},
			error:function(response){
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

function getDataRV2(){
	var dtfrom = $('#inp-tglmis-from-pvrv').val();
	var dtto = $('#inp-tglmis-to-pvrv').val();
	var status = $('#slc-mis-pvrv-receive').val();
	var rvstatus;

	if(status == "0"){
		rvstatus = "SAVE";
	}else if(status == "1"){
		rvstatus = "RECEIVE";
	}else{
		rvstatus = "CANCEL";
	}

	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/getCSVRV",
			dataType: 'text',
			type: 'POST',
			cache: false,
			data : {
				dtfrom:dtfrom,
				dtto:dtto,
				status:status,
				branch_code:branch_code,
				flag:flag,
				pk:pk,
				gb:gb

			},
			cache: false,
			success: function(response){
				response = $.parseJSON(response);                
				if(response["data"].length == 0) {
					fcsv = 1;
					alert_info('Data tidak ditemukan.');
					return false;
				}else if(response){
					try{
						var status = response['status'];
						if(status) {
							if (response['data'] == null) {
								alert_error('Data tidak ditemukan !');
							}else{
								tmp = [];
								tmp2 = [];
								tmp3 = [];
								tmp4 = [];
								for (var i = 0 ; i < response['data'].length; i++) {
									tmp.push([
										i+1,
										response['data'][i][0][0][0].szuser,
										response['data'][i][0][0][0].username,
										branch_code,
										branch_name,
										dtfrom,
										dtto,
										rvstatus
										])
									for (var j = 0 ; j < response['data'][i].length; j++) {
										tmp2.push([
											response['data'][i][j][0][0].szuser,	
											response['data'][i][j][0][0].bankname
											])
										for (var x = 0 ; x < response['data'][i][j].length; x++) {
											tmp3.push([
												response['data'][i][j][x][0].szuser,	
												response['data'][i][j][x][0].bankname,
												response['data'][i][j][x][0].objname
												]);
											for(var z = 0 ; z < response['data'][i][j][x].length; z++){
												tmp4.push([
													response['data'][i][j][x][z].bankname,
													response['data'][i][j][x][z].objname,	
													response['data'][i][j][x][z].rcno,
													response['data'][i][j][x][z].custname,
													response['data'][i][j][x][z].insno,
													response['data'][i][j][x][z].rctype,
													response['data'][i][j][x][z].classcode,
													response['data'][i][j][x][z].docno,
													response['data'][i][j][x][z].remarks,
													response['data'][i][j][x][z].selhari,
													response['data'][i][j][x][z].amt_dit,
													response['data'][i][j][x][z].szuser
													])
											}
										}
									}
								}

								genereate_csv_rv2(tmp,tmp2,tmp3,tmp4);

							}
						}else{
							alert_error(response['errorConsole']);
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				}else{
					alert_error(response);
				}  

			},
			error:function(response){
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

function getDataPV2(){
	var dtfrom = $('#inp-tglmis-from-pvrv').val();
	var dtto = $('#inp-tglmis-to-pvrv').val();
	var status = $('#slc-mis-pvrv-payment').val();
	var pvstatus;

	if(status == "0"){
		pvstatus = "SAVE";
	}else if(status == "3"){
		pvstatus = "PAID";
	}else{
		pvstatus = "CANCEL";
	}

	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/getCSVPV",
			dataType: 'text',
			type: 'POST',
			cache: false,
			data : {
				dtfrom:dtfrom,
				dtto:dtto,
				status:status,
				branch_code:branch_code,
				flag:flag,
				pk:pk,
				gb:gb
			},
			cache: false,
			success: function(response){
				response = $.parseJSON(response);         
				if(response["data"].length == 0) {
					fcsv = 1;
					alert_info('Data tidak ditemukan.');
					return false;
				}else if(response){
					try{
						var status = response['status'];
						if(status) {
							if (response['data'] == null) {
								alert_error('Data tidak ditemukan !');
							}else{
								tmp = [];
								tmp2 = [];
								tmp3 = [];
								tmp4 = [];
								for (var i = 0 ; i < response['data'].length; i++) {
									tmp.push([
										i+1,
										response['data'][i][0][0][0].szuser,
										response['data'][i][0][0][0].username,
										branch_code,
										branch_name,
										dtfrom,
										dtto,
										pvstatus
										])
									for (var j = 0 ; j < response['data'][i].length; j++) {
										tmp2.push([
											response['data'][i][j][0][0].szuser,	
											response['data'][i][j][0][0].bankname
											])
										for (var x = 0 ; x < response['data'][i][j].length; x++) {
											tmp3.push([
												response['data'][i][j][x][0].szuser,	
												response['data'][i][j][x][0].bankname,
												response['data'][i][j][x][0].objname
												]);
											for(var z = 0 ; z < response['data'][i][j][x].length; z++){
												tmp4.push([
													response['data'][i][j][x][z].bankname,
													response['data'][i][j][x][z].objname,	
													response['data'][i][j][x][z].pvno,
													response['data'][i][j][x][z].custname,
													response['data'][i][j][x][z].pvtype,
													response['data'][i][j][x][z].pdcno,
													response['data'][i][j][x][z].amt_dit,
													response['data'][i][j][x][z].classcode,
													response['data'][i][j][x][z].remarks,
													response['data'][i][j][x][z].szuser,
													response['data'][i][j][x][z].contno
													])
											}
										}
									}
								}

								genereate_csv_pv2(tmp,tmp2,tmp3,tmp4);

							}
						}else{
							alert_error(response['errorConsole']);
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				}else{
					alert_error(response);
				}  

			},
			error:function(response){
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

function getDataRV3(){
	var dtfrom = $('#inp-tglmis-from-pvrv').val();
	var dtto = $('#inp-tglmis-to-pvrv').val();
	var status = $('#slc-mis-pvrv-receive').val();
	var rvstatus;

	if(status == "0"){
		rvstatus = "SAVE";
	}else if(status == "1"){
		rvstatus = "RECEIVE";
	}else{
		rvstatus = "CANCEL";
	}

	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/getCSVRV",
			dataType: 'text',
			type: 'POST',
			cache: false,
			data : {
				dtfrom:dtfrom,
				dtto:dtto,
				status:status,
				branch_code:branch_code,
				flag:flag,
				pk:pk,
				gb:gb
			},
			cache: false,
			success: function(response){
				response = $.parseJSON(response);            
				if(response["data"].length == 0) {
					fcsv = 1;
					alert_info('Data tidak ditemukan.');
					return false;
				}else if(response){
					try{
						var status = response['status'];
						if(status) {
							if (response['data'] == null) {
								alert_error('Data tidak ditemukan !');
							}else{
								tmp = [];
								tmp2 = [];
								for (var i = 0 ; i < response['data'].length; i++) {
									tmp.push([
										i+1,
										response['data'][i][0].szuser,
										response['data'][i][0].username,
										branch_code,
										branch_name,
										dtfrom,
										dtto,
										rvstatus
										])
									for (var x = 0 ; x < response['data'][i].length; x++) {
										tmp2.push([
											response['data'][i][x].bankname,
											response['data'][i][x].objname,	
											response['data'][i][x].rcno,
											response['data'][i][x].custname,
											response['data'][i][x].insno,
											response['data'][i][x].rctype,
											response['data'][i][x].classcode,
											response['data'][i][x].docno,
											response['data'][i][x].remarks,
											response['data'][i][x].selhari,
											response['data'][i][x].amt_dit,
											response['data'][i][x].szuser
											])
									}
								}

								genereate_csv_rv3(tmp,tmp2);

							}
						}else{
							alert_error(response['errorConsole']);
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				}else{
					alert_error(response);
				}  

			},
			error:function(response){
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

function getDataRV4(){
	var dtfrom = $('#inp-tglmis-from-pvrv').val();
	var dtto = $('#inp-tglmis-to-pvrv').val();
	var status = $('#slc-mis-pvrv-receive').val();
	var rvstatus;

	if(status == "0"){
		rvstatus = "SAVE";
	}else if(status == "1"){
		rvstatus = "RECEIVE";
	}else{
		rvstatus = "CANCEL";
	}

	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/getCSVRV",
			dataType: 'text',
			type: 'POST',
			cache: false,
			data : {
				dtfrom:dtfrom,
				dtto:dtto,
				status:status,
				branch_code:branch_code,
				flag:flag,
				pk:pk,
				gb:gb
			},
			cache: false,
			success: function(response){
				response = $.parseJSON(response);            
				if(response["data"].length == 0) {
					fcsv = 1;
					alert_info('Data tidak ditemukan.');
					return false;
				}else if(response){
					try{
						var status = response['status'];
						if(status) {
							if (response['data'] == null) {
								alert_error('Data tidak ditemukan !');
							}else{
								tmp = [];
								tmp2 = [];
								tmp3 = [];
								for (var i = 0 ; i < response['data'].length; i++) {
									tmp.push([
										i+1,
										response['data'][i][0][0].szuser,
										response['data'][i][0][0].username,
										branch_code,
										branch_name,
										dtfrom,
										dtto,
										rvstatus
										])
									for (var j = 0 ; j < response['data'][i].length; j++) {
										tmp2.push([
											response['data'][i][j][0].szuser,	
											response['data'][i][j][0].objname
											])
										for (var x = 0 ; x < response['data'][i][j].length; x++) {
											tmp3.push([
												response['data'][i][j][x].bankname,
												response['data'][i][j][x].objname,	
												response['data'][i][j][x].rcno,
												response['data'][i][j][x].custname,
												response['data'][i][j][x].insno,
												response['data'][i][j][x].rctype,
												response['data'][i][j][x].classcode,
												response['data'][i][j][x].docno,
												response['data'][i][j][x].remarks,
												response['data'][i][j][x].selhari,
												response['data'][i][j][x].amt_dit,
												response['data'][i][j][x].szuser
												])
										}
									}
								}

								genereate_csv_rv4(tmp,tmp2,tmp3);

							}
						}else{
							alert_error(response['errorConsole']);
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				}else{
					alert_error(response);
				}  

			},
			error:function(response){
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

function getDataPV3(){
	var dtfrom = $('#inp-tglmis-from-pvrv').val();
	var dtto = $('#inp-tglmis-to-pvrv').val();
	var status = $('#slc-mis-pvrv-payment').val();
	var pvstatus;

	if(status == "0"){
		pvstatus = "SAVE";
	}else if(status == "3"){
		pvstatus = "PAID";
	}else{
		pvstatus = "CANCEL";
	}

	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/getCSVPV",
			dataType: 'text',
			type: 'POST',
			cache: false,
			data : {
				dtfrom:dtfrom,
				dtto:dtto,
				status:status,
				branch_code:branch_code,
				flag:flag,
				pk:pk,
				gb:gb
			},
			cache: false,
			success: function(response){
				response = $.parseJSON(response);       
				if(response["data"].length == 0) {
					fcsv = 1 ;
					alert_info('Data tidak ditemukan.');
					return false;
				}else if(response){
					try{
						var status = response['status'];
						if(status) {
							if (response['data'] == null) {
								alert_error('Data tidak ditemukan !');
							}else{
								tmp = [];
								tmp2 = [];
								for (var i = 0 ; i < response['data'].length; i++) {
									tmp.push([
										i+1,
										response['data'][i][0].szuser,
										response['data'][i][0].username,
										branch_code,
										branch_name,
										dtfrom,
										dtto,
										pvstatus
										])
									for (var x = 0 ; x < response['data'][i].length; x++) {
										tmp2.push([
											response['data'][i][x].bankname,
											response['data'][i][x].pvno,
											response['data'][i][x].custname,
											response['data'][i][x].pvtype,
											response['data'][i][x].pdcno,
											response['data'][i][x].amt_dit,
											response['data'][i][x].szuser
											])
									}
								}

								genereate_csv_pv3(tmp,tmp2);

							}
						}else{
							alert_error(response['errorConsole']);
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				}else{
					alert_error(response);
				}  

			},
			error:function(response){
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

function getDataPV4(){
	var dtfrom = $('#inp-tglmis-from-pvrv').val();
	var dtto = $('#inp-tglmis-to-pvrv').val();
	var status = $('#slc-mis-pvrv-payment').val();
	var pvstatus;

	if(status == "0"){
		pvstatus = "SAVE";
	}else if(status == "3"){
		pvstatus = "PAID";
	}else{
		pvstatus = "CANCEL";
	}

	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_flow_report/getCSVPV",
			dataType: 'text',
			type: 'POST',
			cache: false,
			data : {
				dtfrom:dtfrom,
				dtto:dtto,
				status:status,
				branch_code:branch_code,
				flag:flag,
				pk:pk,
				gb:gb
			},
			cache: false,
			success: function(response){
				response = $.parseJSON(response);            
				if(response["data"].length == 0) {
					fcsv = 1;
					alert_info('Data tidak ditemukan.');
					return false;
				}else if(response){
					try{
						var status = response['status'];
						if(status) {
							if (response['data'] == null) {
								alert_error('Data tidak ditemukan !');
							}else{
								tmp = [];
								tmp2 = [];
								tmp3 = [];
								for (var i = 0 ; i < response['data'].length; i++) {
									tmp.push([
										i+1,
										response['data'][i][0][0].szuser,
										response['data'][i][0][0].username,
										branch_code,
										branch_name,
										dtfrom,
										dtto,
										pvstatus
										])
									for (var x = 0 ; x < response['data'][i].length; x++) {
										tmp2.push([
											response['data'][i][x][0].szuser,
											response['data'][i][x][0].objname
											]);
										for(var z = 0 ; z < response['data'][i][x].length; z++){
											tmp3.push([
												response['data'][i][x][z].bankname,
												response['data'][i][x][z].objname,	
												response['data'][i][x][z].pvno,
												response['data'][i][x][z].custname,
												response['data'][i][x][z].pvtype,
												response['data'][i][x][z].pdcno,
												response['data'][i][x][z].amt_dit,
												response['data'][i][x][z].classcode,
												response['data'][i][x][z].remarks,
												response['data'][i][x][z].szuser,
												response['data'][i][x][z].contno
												])
										}
									}
								}

								genereate_csv_pv4(tmp,tmp2,tmp3);
								
							}
						}else{
							alert_error(response['errorConsole']);
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				}else{
					alert_error(response);
				}  

			},
			error:function(response){
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

//------------------------END CSV PRITN-------------------\\

//------------------------PDF PRITN-------------------\\
function getPDF_rv1(){
	var dtfrom = $('#inp-tglmis-from-pvrv').val();
	var dtto = $('#inp-tglmis-to-pvrv').val();
	var status = $('#slc-mis-pvrv-receive').val();
	var bankid = $('#slc-mis-pvrv-bank').val();

	$('#penampung-cetak-rv').val(dtfrom);
	$('#penampung-cetak-rv1').val(dtto);
	$('#penampung-cetak-rv2').val(status);
	$('#penampung-cetak-rv3').val(branch_code);
	$('#penampung-cetak-rv4').val(init);
	$('#penampung-cetak-rv5').val(flag);
	$('#penampung-cetak-rv6').val(bankid);
	$('#penampung-cetak-rv7').val(gb);

	$('#idFormatrv').submit();
}

function getPDF_pv1(){
	var dtfrom = $('#inp-tglmis-from-pvrv').val();
	var dtto = $('#inp-tglmis-to-pvrv').val();
	var status = $('#slc-mis-pvrv-payment').val();

	$('#penampung-cetak-pv').val(dtfrom);
	$('#penampung-cetak-pv1').val(dtto);
	$('#penampung-cetak-pv2').val(status);
	$('#penampung-cetak-pv3').val(branch_code);
	$('#penampung-cetak-pv4').val(init);
	$('#penampung-cetak-pv5').val(flag);
	$('#penampung-cetak-pv6').val(gb);

	$('#idFormatpv').submit();
}
//------------------------END PDF PRITN-------------------\\

//----------------------BANK--------------------\\

function getBankSum(){
	$.ajax({
		url: base_url+'Controller_flow_report/get_list_bank',
		type: 'POST',
		data : {branch_code:branch_code},
		success: function(response){
			var data = JSON.parse(response);
			if(JSON.stringify(response).includes('Timeout')){
				alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
			} else if(response){
				try{
					$('#slc-mis-pvrv-bank').empty();
					console.log('masuk');
					$('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('#slc-mis-pvrv-bank').addClass('form-control');

					for (var i = 0; i < data['data'].length; i++) {
						$('#slc-mis-pvrv-bank').append('<option value="'+ data['data'][i].bankCode +'">'+data['data'][i].bankCode+'-'+data['data'][i].bankName + '</option>');
					}

				} catch(e) {
					$('#loading-ajax').hide();
					alert_error(e);
				}
			}else{
				alert_error("Cek Jaringan");
			}

		},error:function(e){
			alert_error('error');
		}
	});
}
//----------------------END BANK--------------------\\

//----------------------ROLE--------------------\\

var role_pvrv;
if (!localStorage.getItem('role_user_pvrv')) {
	$.ajax({
		url : "Controller_home/get_detail_user",
		cache : false,
		success : function(response){
			if(response){
				try{
					console.log(response);
					localStorage.setItem('role_user_pvrv', response);
					role_pvrv = $.parseJSON(localStorage.getItem('role_user_pvrv'));
					console.log(role_pvrv);
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
	role_pvrv = $.parseJSON(localStorage.getItem('role_user_pvrv'));
	console.log(role_pvrv);
}

var roll = true;

// function validasiRoll(){
// 	$('#pk-mis-pvrv').prop('hidden', true);
// 	$('#pk-mis-pccodce').prop('hidden', true);
// 	$('#jl-mis-sumrv').prop('hidden', true);
// 	$('#jl-mis-detail').prop('hidden', true);
// 	$('#btn-preview-cfr-pvrv').prop('disabled', true);
// }

var role_pv1 = false;
var role_rv1 = false;
var role_adm = false;

$('#slc-laporan-cfr').change(function(){
	var menu_utama = $('#slc-laporan-cfr').val();
	if(menu_utama == '002000'){
		$('#slc-mis-pvrv-sub').val('- SILAHKAN PILIH -');
		validasiSub();
		$('#btn-preview-cfr-pvrv').prop('disabled', true);
	}
})

$('#slc-mis-pvrv-sub').change(function(){
	validasiSub();
	var menu_pvrv = $('#slc-mis-pvrv-sub').val();

	if(menu_pvrv == '- SILAHKAN PILIH -'){
		$('#btn-preview-cfr-pvrv').prop('disabled', true);
	}

	$.each(role_pvrv, function(i){
		if(role_pvrv[i]['role_code'] === 'MIS_PV_PVRV'){
			role_pv1 = true;
		}
		if(role_pvrv[i]['role_code'] === 'MIS_RV_PVRV'){
			role_rv1 = true;
		}
		if(role_pvrv[i]['role_code'] === 'APP_ADM_AM'){
			role_adm = true;
		}
	});

	if (menu_pvrv == '0') {
		if (role_pv1 == true || role_adm == true) {
			$('#btn-preview-cfr-pvrv').prop('disabled', false);
		}else{
			$('#btn-preview-cfr-pvrv').prop('disabled', true);
			alert_info('User Tidak Memiliki Role Print PV');
			return false;
		}

	}else if(menu_pvrv == '1'){
		if (role_rv1 == true || role_adm == true) {
			$('#btn-preview-cfr-pvrv').prop('disabled', false);
		}else{
			$('#btn-preview-cfr-pvrv').prop('disabled', true);
			alert_info('User Tidak Memiliki Role Print RV');
			return false;
		}
	}

	// if (menu_pvrv == '0') {
	// 	$.each(role_pvrv, function(i){
	// 		if(role_pvrv[i]['role_code'] === 'MIS_PV_PVRV'){
	// 			role_pv1 = true;
	// 		}else if(role_pvrv[i]['role_code'] === 'MIS_PV_PCCODE'){
	// 			role_pv2 = true;
	// 		}
	// 	});

	// 	if (role_pv1 == true ) {
	// 		$('#btn-preview-cfr-pvrv').prop('disabled', false);
	// 		$('#pk-mis-pvrv').prop('hidden', false);
	// 	}else if(role_pv2 == true){
	// 		$('#btn-preview-cfr-pvrv').prop('disabled', false);
	// 		$('#pk-mis-pccodce').prop('hidden', false);
	// 	}else if(role_pv1 == true && role_pv2 == true){
	// 		$('#btn-preview-cfr-pvrv').prop('disabled', false);
	// 		$('#pk-mis-pvrv').prop('hidden', false);
	// 		$('#pk-mis-pccodce').prop('hidden', false);
	// 	}else{
	// 		$('#btn-preview-cfr-pvrv').prop('disabled', true);
	// 	}

	// }else if(menu_pvrv == '1'){
	// 	$.each(role_pvrv, function(i){
	// 		if(role_pvrv[i]['role_code'] === 'MIS_RV_PVRV'){
	// 			role_rv1 = true;
	// 		}else if(role_pvrv[i]['role_code'] === 'MIS_RV_PCCODE'){
	// 			role_rv2 = true;
	// 		}else if(role_pvrv[i]['role_code'] === 'MIS_SUMRV'){
	// 			role_sumrv = true;
	// 		}
	// 	});

	// 	if(role_sumrv == true){
	// 		$('#btn-preview-cfr-pvrv').prop('disabled', false);
	// 		$('#jl-mis-sumrv').prop('hidden', false);
	// 	}else if(role_rv1 == true){
	// 		$('#btn-preview-cfr-pvrv').prop('disabled', false);
	// 		$('#jl-mis-detail').prop('hidden', false);
	// 		$('#pk-mis-pvrv').prop('hidden', false);
	// 	}else if(role_rv2 == true){
	// 		$('#btn-preview-cfr-pvrv').prop('disabled', false);
	// 		$('#jl-mis-detail').prop('hidden', false);
	// 		$('#pk-mis-pccodce').prop('hidden', false);
	// 	}else if(role_rv1 == true && role_rv2 == true){
	// 		$('#btn-preview-cfr-pvrv').prop('disabled', false);
	// 		$('#jl-mis-detail').prop('hidden', false);
	// 		$('#pk-mis-pccodce').prop('hidden', false);
	// 		$('#pk-mis-pvrv').prop('hidden', false);
	// 	}else if(role_sumrv == true && role_rv1 == true){
	// 		$('#btn-preview-cfr-pvrv').prop('disabled', false);
	// 		$('#jl-mis-detail').prop('hidden', false);
	// 		$('#pk-mis-pvrv').prop('hidden', false);
	// 		$('#jl-mis-sumrv').prop('hidden', false);
	// 	}else if(role_sumrv == true && role_rv2 == true){
	// 		$('#btn-preview-cfr-pvrv').prop('disabled', false);
	// 		$('#jl-mis-detail').prop('hidden', false);
	// 		$('#pk-mis-pccodce').prop('hidden', false);
	// 		$('#jl-mis-sumrv').prop('hidden', false);
	// 	}else if(role_sumrv == true && role_rv1 == true && role_rv2 == true){
	// 		$('#btn-preview-cfr-pvrv').prop('disabled', false);
	// 		$('#jl-mis-detail').prop('hidden', false);
	// 		$('#pk-mis-pccodce').prop('hidden', false);
	// 		$('#jl-mis-sumrv').prop('hidden', false);
	// 		$('#pk-mis-pvrv').prop('hidden', false);
	// 	}else{
	// 		$('#btn-preview-cfr-pvrv').prop('disabled', true);
	// 	}

	// }

});
//----------------------END ROLE--------------------\\


function validasiSub(){
	if($('#slc-mis-pvrv-sub').val() == 0){
		$('#div-id-receive').prop('hidden', true);
		$('#div-id-paid').prop('hidden', false);
		$('#div-id-pvrv-jenis').prop('hidden', true);
		$('#div-id-pvrv-pk').prop('hidden', false);
		$('#rb-mis-pvrv-pccode').prop('checked', false);
		$('#rb-mis-pvrv-pvrv').prop('checked', false);
		$('#rb-mis-pvrv-all').prop('checked', false);
		$('#rb-mis-pvrv-class').prop('checked', false);
		$('#div-idmis-group').prop('hidden', true);
		$('#rb-mis-pvrv-detail').prop('checked', false);
		$('#rb-mis-pvrv-sumarry').prop('checked', false);
		$('#slc-mis-pvrv-payment').val('sp');
		$('#div-id-pvrv-bank').prop('hidden', true);
		$('#slc-mis-pvrv-format').val("- SILAHKAN PILIH -");
		$('#inp-tglmis-from-pvrv').val("");
		$('#inp-tglmis-to-pvrv').val("");
		$('#slc-mis-pvrv-receive').val("- SILAHKAN PILIH -");
	}else if($('#slc-mis-pvrv-sub').val() == 1){
		$('#div-id-paid').prop('hidden', true);
		$('#div-id-pvrv-jenis').prop('hidden', false);
		$('#div-id-pvrv-pk').prop('hidden', true);
		$('#div-idmis-group').prop('hidden', true);
		$('#rb-mis-pvrv-pccode').prop('checked', false);
		$('#slc-mis-pvrv-format').val("- SILAHKAN PILIH -");
		$('#inp-tglmis-from-pvrv').val("");
		$('#inp-tglmis-to-pvrv').val("");
		$('#slc-mis-pvrv-receive').val("- SILAHKAN PILIH -");
		$('#rb-mis-pvrv-pvrv').prop('checked', false);
		$('#rb-mis-pvrv-all').prop('checked', false);
		$('#rb-mis-pvrv-class').prop('checked', false);
		$('#slc-mis-pvrv-payment').val('sp');
	}else{
		$('#div-id-paid').prop('hidden', true);
		$('#div-id-receive').prop('hidden', true);
		$('#div-id-pvrv-pk').prop('hidden', true);
		$('#div-id-pvrv-jenis').prop('hidden', true);
		$('#inp-tglmis-from-pvrv').val("");
		$('#inp-tglmis-to-pvrv').val("");
	}
}