// HAK AKSES USER REPORT PDC --------------------------------------------------------------

var role_pdcp = '';

if (!localStorage.getItem('role_user_pdcp')) {
    $.ajax({
        url : base_url + "Controller_home/get_detail_user",
        cache : false,
        async : false,
        success : function(response){
            console.log(response);
            localStorage.setItem('role_user_pdcp', response);
            role_pdcp = $.parseJSON(localStorage.getItem('role_user_pdcp'));
            console.log(role_pdcp);
        },
        error: function(response){
            console.log(response);
        }
    });
}
else{
    role_pdcp = $.parseJSON(localStorage.getItem('role_user_pdcp'));
    console.log(role_pdcp);
}
// --------------------------------------------------------------------------------------------

// DATETIME PICKER -------------------------------------------------
$('#div-tgl-awal-reportpdc').datetimepicker({
	format: 'DD-MMM-YYYY',
	maxDate: 'now',
	allowInputToggle: true
}).on("dp.change", function(e){
	var date = e.date;
	var dDate = date._d;
	var new_date = new Date(dDate);
	new_date.setDate(new_date.getDate() + 30);

	$('#div-tgl-akhir-reportpdc').data("DateTimePicker").minDate(dDate);

	if (new_date > new Date(today)) {
		new_date = new Date(today);
	}
	//console.log(new_date, today);

	$('#div-tgl-akhir-reportpdc').data("DateTimePicker").maxDate(new_date);
	$('#div-tgl-akhir-reportpdc').data("DateTimePicker").date(new_date);
});

$('#div-tgl-akhir-reportpdc').datetimepicker({
	format : 'DD-MMM-YYYY',
	maxDate : 'now',
	allowInputToggle : true
});

//------------------------------------------------------------------------------
var role_tolak = 0;
var role_bjt = 0;
var role_jt = 0;
var role_all = 0;
$('#slc-fcash-report-pdc').change(function(){
	var sub_laporan = $('#slc-fcash-report-pdc').val();
	$.each(role_pdcp, function(i){
	    if (role_pdcp[i]['role_code'] === 'RPT_ALL_PDC') {
	        role_all = 1;
	    }
	    else if (role_pdcp[i]['role_code'] === 'RPT_BJT_PDC') {
	    	role_bjt = 1;
	    }
	    else if (role_pdcp[i]['role_code'] === 'RPT_JT_PDC') {
	    	role_jt = 1;
	    }
	    else if (role_pdcp[i]['role_code'] === 'RPT_TL_PDC') {
	    	role_tolak = 1;
	    }
	    else if (role_pdcp[i]['role_code'] == 'APP_ADM_AM') {
	    	role_all = 1;
	    	role_bjt = 1;
	    	role_jt = 1;
	    	role_tolak = 1;
	    }
	});

	if (sub_laporan === '001001' && role_jt == 0) {
		alert_info("User Tidak Memiliki Hak Akses PDC Jatuh Tempo");
		$('#btn-preview-cfr-pdc').prop('disabled', true);
	}
	else if (sub_laporan === '001002' && role_bjt == 0) {
		alert_info("User Tidak Memiliki Hak Akses PDC Belum Jatuh Tempo");
		$('#btn-preview-cfr-pdc').prop('disabled', true);
	}
	else if (sub_laporan === '001003' && role_tolak == 0) {
		alert_info("User Tidak Memiliki Hak Akses PDC Tolak");
		$('#btn-preview-cfr-pdc').prop('disabled', true);
	}
	else if (sub_laporan === '001004' && role_all == 0) {
		alert_info("User Tidak Memiliki Hak Akses PDC All");
		$('#btn-preview-cfr-pdc').prop('disabled', true);
	}
	else{
		$('#btn-preview-cfr-pdc').prop('disabled', false);
	}

	if ($('#slc-fcash-report-pdc').val() === "001002") {
		$('#div-tgl-jt-tempo-pdc').hide();
		$('#inp-tgl-awal-reportpdc').val(null);
		$('#inp-tgl-akhir-reportpdc').val(null);
	}
	else{
		$('#div-tgl-jt-tempo-pdc').show();
	}
});

$('#btn-preview-cfr-pdc').click(function(){
	var format = $('#slc-format-reportpdc').val();
	var sub_laporan = $('#slc-fcash-report-pdc').val();
	var start_date = $('#inp-tgl-awal-reportpdc').val();
	var end_date = $('#inp-tgl-akhir-reportpdc').val();
	var branch_code = $('#hdn-branch-code-fcash').val();

	if (check_session() === 'true') {
		if (sub_laporan == "") {
			alert_error("Silahkan Pilih Sub Laporan Terlebih Dahulu");
			$('#div-fcash-report-pdc').addClass('has-error');
		}
		else if (start_date === "" && sub_laporan !== "001002") {
			$('#div-tgl-awal-reportpdc').addClass('has-error');
			alert_error("Silahkan Input Tanggal Awal");
		}
		else if (end_date === "" && sub_laporan !== "001002") {
			$('#div-tgl-akhir-reportpdc').addClass('has-error');
			alert_error("Silahkan Input Tanggal Akhir");
		}
		else if (format === "0") {
			alert_error("Silahkan Pilih Format File yang Akan Di Download");
			$('#div-format-reportpdc').addClass('has-error');
		}
		else{
			$('#div-fcash-report-pdc').removeClass('has-error');
			$('#div-tgl-awal-reportpdc').removeClass('has-error');
			$('#div-tgl-akhir-reportpdc').removeClass('has-error');
			$('#div-format-reportpdc').removeClass('has-error');

			if (format == "1") {
				get_print_pdf();
			}
			else if (format == "2") {
				get_print_xls();
			}
			/*else if (format == "2" && sub_laporan != "22") {
				get_print_xls_pdc();
			}
			else if (format == "2" && sub_laporan == "22") {
				get_print_xls_tolak_pdc();
			}*/
			else if (format == "3") {
				get_print_csv();
			}
		}
	}
	else if (check_session() === 'false'){
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

//------------------------------------------------------------------------------
function get_sub_laporan_pdc(){
	$.ajax({
		url : base_url + "Controller_flow_report/get_sublaporan_pdc",
		dataType: 'json',
		type: 'GET',
		cache: false,
		success: function(response){
			console.log(response);
			$('#slc-fcash-report-pdc').empty();
			if (response['errorConsole']) {
				alert_error(response['errorConsole']);
			}
			else{
				$('<option/>').val('').html('-- Silahkan Pilih --').appendTo('#slc-fcash-report-pdc').addClass('form-control');
				$.each(response['data'], function(i){
					var report_code = response['data'][i]['report_code'];
					var report_desc = response['data'][i]['report_desc'];
					$('#slc-fcash-report-pdc').append('<option value="'+report_code+'">'+report_desc+'</option>');
				});
			}
		},
		error : function(response){
			console.log(response);
		}
	});
}

function get_print_pdf(){
	var start_date = $('#inp-tgl-awal-reportpdc').val();
	var end_date = $('#inp-tgl-akhir-reportpdc').val();
	var branch_code = $('#hdn-branch-code-fcash').val();
	var sub_laporan = $('#slc-fcash-report-pdc').val();

	$('#hdn-branch-code').val(branch_code);
	$('#hdn-start-date').val(start_date);
	$('#hdn-end-date').val(end_date);
	$('#hdn-sub-laporan').val(sub_laporan);
	$('#form-report-pdc').submit();
}

function get_print_xls(){
	var start_date = $('#inp-tgl-awal-reportpdc').val();
	var end_date = $('#inp-tgl-akhir-reportpdc').val();
	var branch_code = $('#hdn-branch-code-fcash').val();
	var sub_laporan = $('#slc-fcash-report-pdc').val();

	$.ajax({
		url : base_url + "Controller_flow_report/get_print_xls_pdc",
		type : 'POST',
		data : {
			branch_code,
			start_date,
			end_date,
			sub_laporan
		},
		cache : false,
		success: function(response){
			console.log(response);
			//console.log(response.result.toString());

			if (response['result'] == "") {
				alert_info("Data Tidak Ditemukan");
			}
			else if (response) {
				try{
					if (sub_laporan == "001001") {
						download(response.result,'PDCjatuhtempo.xls',"application/vnd.ms-excel");
					}
					else if (sub_laporan == "001002") {
						download(response.result,'PDCbelumjatuhtempo.xls',"application/vnd.ms-excel");
					}
					else if (sub_laporan == "001003") {
						download(response.result,'PDCditolak.xls',"application/vnd.ms-excel");
					}
					else if (sub_laporan == "001004") {
						download(response.result,'PDCall.xls',"application/vnd.ms-excel");
					}
				}
				catch(e){
					$('#loading-ajax').hide();
					console.log(e);
                    alert_error("Terjadi Kesalahan => " + e);
				}
			}
		},
		error: function(response){
			console.log(response);
		}
	});
}

function get_print_csv(){
	var start_date = $('#inp-tgl-awal-reportpdc').val();
	var end_date = $('#inp-tgl-akhir-reportpdc').val();
	var branch_code = $('#hdn-branch-code-fcash').val();
	var sub_laporan = $('#slc-fcash-report-pdc').val();

	$.ajax({
		url : base_url + "Controller_flow_report/get_print_csv_pdc",
		type : 'POST',
		timeput : 10000,
		dataType :'text',
		data : {
			start_date,
			end_date,
			branch_code,
			sub_laporan
		},
		cache : false,
		success : function(response){
			console.log(response);
			if (response) {
				try{
					var filename = "";
					if (sub_laporan == "001001") {
						filename = "PDCjatuhtempo";
					}
					else if (sub_laporan == "001002") {
						filename = "PDCbelumjatuhtempo";
					}
					else if (sub_laporan == "001003") {
						filename = "PDCditolak";
					}
					else if (sub_laporan == "001004") {
						filename = "PDCall";
					}

					var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
					var downloadLink = document.createElement("a");
					downloadLink.href = uri;
					downloadLink.download = filename+'.csv';
					document.body.appendChild(downloadLink);
					downloadLink.click();
					document.body.removeChild(downloadLink);
				}
				catch(e){
					$('#loading-ajax').hide();
					console.log(e);
                    alert_error("Terjadi Kesalahan => " + e);
				}
			}
			else{
				alert_info("Data Tidak Ditemukan");
			}
		},
		error : function(response){
			console.log(response);
			alert_error(response);
		}
	});
}

// TIDAK DIGUNAKAN
function get_print_xls_pdc(){
	var start_date = $('#inp-tgl-awal-reportpdc').val();
	var end_date = $('#inp-tgl-akhir-reportpdc').val();
	var branch_code = $('#hdn-branch-code-fcash').val();
	var sub_laporan = $('#slc-fcash-report-pdc').val();

	$.ajax({
		url : base_url + "Controller_flow_report/get_print_xlsx_pdc",
		type : 'POST',
		dataType : 'JSON',
		data : {
			branch_code,
			start_date,
			end_date,
			sub_laporan
		},
		cache : false,
		success : function(response){
			console.log(response);
			var list_array = [];
			if (response['errorConsole']) {
				alert_error(response['errorConsole']);
			}
			else if (response['data'].length === 0) {
				alert_info("Data Tidak Ditemukan");
			}
			else{
				var totalgroup =0;
                var totalall =0;
				var flag = true;

				for (var i = 0; i < response['data'].length; i++) {
					var ref_no = response['data'][i]['reference_no'];
					if (ref_no === null) {
						ref_no = "";
					}
					list_array.push([
						"'"+response['data'][i]['contract_no'],
						response['data'][i]['cust_name'],
						response['data'][i]['pdc_date'],
						response['data'][i]['pdc_due_date'],
						response['data'][i]['pdc_no'],
						response['data'][i]['bank_name'],
						response['data'][i]['inst_no'],
						response['data'][i]['from_to'],
						ref_no,
						response['data'][i]['detail_amt'],
						response['data'][i]['type_desc'],
						response['data'][i]['pdc_type']
					]);
				}

				var tgl_print = response['tgl_print'];
				var lap_desc = response['laporan_desc'];
				var branch_name = response['branch_name'];

				var htmls = "";
                var uri = 'data:application/vnd.ms-excel;base64,';
                var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'; 
                var base64 = function(s) {
                    return window.btoa(unescape(encodeURIComponent(s)))
                };

                var format = function(s, c) {
                    return s.replace(/{(\w+)}/g, function(m, p) {
                        return c[p];
                    })
                };

                var tab_text = "<table><tr><td colspan='3'><b>PT. MANDIRI UTAMA FINANCE</b></td>"+
                	"<td></td>"+
                	"<td></td>"+
                	"<td></td>"+
                	"<td></td>"+
                	"<td></td>"+
                	"<td></td>"+
                	"<td colspan='2'>Tanggal Print : " +tgl_print+"</td>"+
                	"</tr></table>";

                tab_text = tab_text + "<span><b>'"+branch_code+"</b></span><br/><span><b>"+branch_name+"</b></span>";
                tab_text = tab_text + "<table><tr><td colspan = '11'><center><b>"+lap_desc+"</b></center></td></tr>";

                if (sub_laporan !== "NOT") {
                	tab_text = tab_text + "<tr><td colspan = '11'><center>Periode : "+start_date+" S/D "+end_date+"</center></td></tr>";
                }
                	
                tab_text = tab_text + "<tr></tr>"+
                	"<tr><td><center><b>No.</b></center></td>"+
                	"<td><center><b>No Kontrak</b></center></td>"+
                	"<td><center><b>Nama Customer</b></center></td>"+
                	"<td><center><b>Tgl. PDC</b></center></td>"+
                	"<td><center><b>Tgl. JT</b></center></td>"+
                	"<td><center><b>No. PDC</b></center></td>"+
                	"<td><center><b>Nama Bank</b></center></td>"+
                	"<td><center><b>Inst.</b></center></td>"+
                	"<td><center><b>Terima Dari / Bayar Kepada</b></center></td>"+
                	"<td><center><b>No Voucher</b></center></td>"+
                	"<td><center><b>Jumlah</b></center></td></tr>"; 
                
				var no_seq = 0;
                for (var i = 0; i < list_array.length; i++) {
                	if (list_array[i][11] == "P") {
                		no_seq += 1;
                		if (flag == true) {
                			tab_text = tab_text + "<tr></tr><tr><td colspan = '2'>"+list_array[i][10]+"</td></tr>";
                		}
                		tab_text = tab_text +
                			"<tr><td><center>"+no_seq+"</center></td>"+
                			"<td>"+list_array[i][0]+"</td>"+
                			"<td>"+list_array[i][1]+"</td>"+
                			"<td><center>"+list_array[i][2]+"</center></td>"+
                			"<td><center>"+list_array[i][3]+"</center></td>"+
                			"<td>"+list_array[i][4]+"</td>"+
                			"<td>"+list_array[i][5]+"</td>"+
                			"<td><center>"+list_array[i][6]+"</center></td>"+
                			"<td>"+list_array[i][7]+"</td>"+
                			"<td>"+list_array[i][8]+"</td>"+
                			"<td>"+list_array[i][9]+"</td></tr>";
                			flag = false;
                			totalgroup += Number(list_array[i][9]);
                	}

                	
                }
                if (totalgroup !== 0) {
                	tab_text = tab_text + "<tr><td><b>Total :</b></td><td colspan = '9'></td><td><b>"+totalgroup+"</b></td></tr>";
                }
                
                flag = true;
                totalgroup=0;
                no_seq = 0;
                for (var i = 0; i < list_array.length; i++) {
                	if (list_array[i][11] == "R") {
                		no_seq += 1;
                		if (flag == true) {
                			tab_text = tab_text + "<tr></tr><tr><td colspan = '2'>"+list_array[i][10]+"</td></tr>";
                		}

                		tab_text = tab_text + 
                			"<tr><td><center>"+no_seq+"</center></td>"+
                			"<td>"+list_array[i][0]+"</td>"+
                			"<td>"+list_array[i][1]+"</td>"+
                			"<td><center>"+list_array[i][2]+"</center></td>"+
                			"<td><center>"+list_array[i][3]+"</center></td>"+
                			"<td>"+list_array[i][4]+"</td>"+
                			"<td>"+list_array[i][5]+"</td>"+
                			"<td><center>"+list_array[i][6]+"</center></td>"+
                			"<td>"+list_array[i][7]+"</td>"+
                			"<td>"+list_array[i][8]+"</td>"+
                			"<td>"+list_array[i][9]+"</td></tr>";
                			flag = false;
                			totalgroup += Number(list_array[i][9]);
                	}

                	totalall += Number(list_array[i][9]);
                }

                if (totalgroup !== 0) {
                	tab_text = tab_text + "<tr><td><b>Total : </b></td><td colspan = '9'></td><td><b>"+totalgroup+"</b></td></tr>";
                }

                tab_text = tab_text + "<tr></tr>"+
                	"<tr></tr>"+
                	"<tr><td><b>Grand Total : </b></td><td colspan = '9'></td><td><b>"+totalall+"</b></td></tr>";
                
                var ctx = {
                    worksheet : 'Worksheet',
                    table : tab_text
                }

                var link = document.createElement("a");
                link.download = "ReportDuePDC.xls";
                link.href = uri + base64(format(template, ctx));
                link.click();
			}
		},
		error : function(response){
			console.log(response);
			alert_error(response);
		}
	});
}