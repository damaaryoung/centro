

branch_code = $('#cabang-id-reconcileReport').val();
branch_name = $('#cabang-name-reconcileReport').val();
$('#id-branch-rcc').hide();

$('#id-inp-data_from-reconcileReport').datetimepicker({
	format: 'DD-MMM-YYYY',
	allowInputToggle: true,
	maxDate: new Date()
}).on("dp.change", function(e) {
	var date = e.date;
	var dDate = date._d;
	var new_date = new Date(dDate);
	new_date.setDate(new_date.getDate() + 30);

	$('#id-inp-date_to-reconcileReport').data("DateTimePicker").minDate(dDate);

	if (new_date > new Date(today)) {
		new_date = new Date(today);
	}
    //console.log(new_date, today);

    $('#div-tgl-akhir-cust-dp').data("DateTimePicker").maxDate(new_date);
    $('#div-tgl-akhir-cust-dp').data("DateTimePicker").date(new_date);

});

$('#id-inp-date_to-reconcileReport,#id-inp-data_from-reconcileReport').datetimepicker({
	format: 'DD-MMM-YYYY',
	allowInputToggle: true,
	maxDate: new Date()
});


// $('.date-picker-reconcileReport').datetimepicker({
// 	format: 'DD-MMM-YYYY',
// 	allowInputToggle: true,
// 	maxDate: new Date()
// });
$("#id-inp-type-reconcileReport").change(function() {
	if ($('#id-inp-type-reconcileReport :checked').val() == '1') {
		$('#id-inp-date_to-reconcileReport').val('');
		$('#id-inp-date_to-reconcileReport').prop('disabled',true);
		$('#id-slc-branch-reconcileReport').prop('disabled',true);
	}else{
		$('#id-branch-rcc').prop('hidden',true);
		$('#id-slc-branch-reconcileReport').prop('hidden',false);
		$('#id-slc-branch-reconcileReport').prop('disabled',false);
		$('#id-inp-date_to-reconcileReport').prop('disabled',false);
	}


	if ($('#id-inp-type-reconcileReport :checked').val() == '1' && $('#cabang-login').html() !== 'KANTOR PUSAT') {
		$('#id-slc-branch-reconcileReport').prop('disabled',true);
		$('#id-branch-rcc').show();
		$('#id-slc-branch-reconcileReport').hide()
	}else{
		$('#id-branch-rcc').hide();
		$('#id-slc-branch-reconcileReport').show()
		$('#id-slc-branch-reconcileReport').prop('disabled',false);
	}



});
var print = []; 
$('#id-btn-print-reconcileReport').click(function(){
	if (check_session() === 'true') {
		getDate();
		var branch_code = $('#id-slc-branch-reconcileReport :selected').val();
		var type_print = $('#id-inp-type-reconcileReport :selected').val();
		var date_from = $('#id-inp-data_from-reconcileReport').val();
		var date_to = $('#id-inp-date_to-reconcileReport').val();
		var arrayData = [];
		if (branch_code == '' && $('#cabang-login').html() == 'KANTOR PUSAT' ) {
			alert_warning('Pilih cabang terlebih dahulu');
			$('#inp-branch-recRpt').addClass('has-error');
			return false;
		}else if(type_print == ''){
			alert_warning('Pilih type report terlebih dahulu');
			$('#div-type-report-recRpt').addClass('has-error');
			return false;
		}
		$('#div-type-report-recRpt').removeClass('has-error');
		$('#inp-branch-recRpt').removeClass('has-error');
		

		if (type_print == '0') {
			if (branch_code == '') {
				alert_warning('Pilih cabang terlebih dahulu');
				$('#inp-branch-recRpt').addClass('has-error');
				return false;
			}
			arrayData.push({
				branch_code,
				date_from,
				date_to
			});
			if (date_from == '') {
				alert_warning('Pilih Date From terlebih dahulu');
				$('#div-tgl-from-recRpt').addClass('has-error');
				return false;
			}else if(date_to == ''){
				alert_warning('Pilih Date To terlebih dahulu');
				$('#div-tgl-to-recRpt').addClass('has-error');
				return false;
			}else{
				$('#div-tgl-to-recRpt').removeClass('has-error');
				$('#div-tgl-from-recRpt').removeClass('has-error');
				get_data_detail(arrayData,date_from,date_to,branch_code);
			}
		}else if (type_print == '1' && $('#cabang-login').html() !== 'KANTOR PUSAT' ){
			branch_code = $('#cabang-id-reconcileReport').val();
			arrayData.push({
				branch_code,
				date_from,
				date_to
			});
			if (date_from == '') {
				alert_warning('Pilih Date From terlebih dahulu');
				$('#div-tgl-from-recRpt').addClass('has-error');
				return false;
			}else{
				get_data_sumary(arrayData);
			}
		}else if (type_print == '1' && $('#cabang-login').html() == 'KANTOR PUSAT' ){
			branch_code = $('#id-slc-branch-reconcileReport :selected').val();
			arrayData.push({
				branch_code,
				date_from,
				date_to
			});
			if (date_from == '') {
				alert_warning('Pilih Date From terlebih dahulu');
				$('#div-tgl-from-recRpt').addClass('has-error');
				return false;
			}else{
				get_data_sumary(arrayData);
			}
		}
	}else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
	
});
function get_data_detail(arrayData,date_from,date_to,branch_code){
	$.ajax({
		url:base_url+'Controller_rekon_kasir/get_rpt_reconcile_detail',
		type:'POST',
		async:false,
		data:{arrayData},
		success:function(response){
			console.log(response);
			var data = JSON.parse(response);
			try{
				data = JSON.parse(data);
				if (data['data'].length == 0) {
					alert_info('DATA TIDAK DITEMUKAN');
					return false;
				}
				print = data;
				print_type_detail(date_from,date_to,branch_code);
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

function get_data_sumary(arrayData){
	$.ajax({
		url:base_url+'Controller_rekon_kasir/get_rpt_reconcile_sumary',
		type:'POST',
		async:false,
		data:{arrayData},
		success:function(response){
			console.log(response);
			var data = JSON.parse(response);
			try{
				data = JSON.parse(data);
				if (data['data'].length == 0) {
					alert_info('DATA TIDAK DITEMUKAN');
					return false;
				}
				// var print2 = [];
				// var mapindexp = {};
				// var indexp=0;
				// for(var i = 0 ; i < data.length ; i++){

				// 		if(mapindexp[data['data'][i].batch[0].cash_count_location] == null){
				// 			mapindexp[data['data'][i].batch[0].cash_count_location] = indexp;
				// 			indexp++;
				// 			print2.push();
				// 		} else {

				// 		}
				// 		data['data'][i].batch[0].cash_count_location

				// }
				print = data;
				print_type_sumary();
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

function print_type_detail(date_from,date_to,branch_code){

	var today;
	today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; 
	var yyyy = today.getFullYear();
	var m_names = new Array("", "Jan", "Feb", "Mar",
		"Apr", "May", "Jun", "Jul", "Aug", "Sep",
		"Oct", "Nov", "Dec");

	today = dd + '-' + m_names[mm] + '-' + yyyy;
	if ($('#cabang-login').html() !== 'KANTOR PUSAT') {
		branch_code =	$('#id-branch-rcc').val();	
	}else{
		branch_code = $('#id-slc-branch-reconcileReport :selected').html();
	}
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
	var tab_text="<table><tr><td></td></tr></table><table><tr><td></td><td></td><td></td><td colspan='4' style='font-size:20px;font-weight:bold;text-align:center;'>RECONCILE REPORT (DETAIL)</td></tr></table> <table>"+
	" <table>";
	var textRange; 
	var j=0;
	branch_code = branch_code;
	var ss = $('#head-login').html();
	var artest = ["Tanggal Cetak Report", "Report From", "Report To", "Kode Cabang"];
	var did = [today,date_from,date_to,branch_code];
	for(var i = 0; i < artest.length; i++) {
		tab_text = tab_text + "<tr><td></td><td style='font-weight:bold;'>"+artest[i]+"</td><td  style='font-weight:bold;'>&nbsp;:&nbsp;"+did[i]+"</td></tr>" ;
	}

	tab_text = tab_text + "</table></table><table><table border='2px'>" +
	"<tr style='font-weight:bold;'>"+
	"<td>No</td>"+
	"<td>Contract No</td>"+
	"<td>RV No</td>"+
	"<td>Inst No</td>"+
	"<td>NIK</td>"+
	"<td>Cashier Name</td>"+
	"<td>Received Amount</td>"+
	"<td>Received Date</td>"+
	"<td>Branch/MUFNet Code</td>"+
	"</tr>";
	for(var j = 0; j < print['data'].length; j++){
		var no = j+1;
		tab_text = tab_text +
		"<tr>"+
		"<td>"+no+"</td>"+
		"<td>&nbsp;"+print['data'][j].contract_no+"</td>"+
		"<td>"+print['data'][j].rv_no+"</td>"+
		"<td>"+print['data'][j].installment_no+"</td>"+
		"<td>&nbsp;"+print['data'][j].nik+"</td>"+
		"<td>"+print['data'][j].cashier_name+"</td>"+
		"<td>"+accounting.formatMoney(print['data'][j].received_amount, '', 2, ',', '.')+"</td>"+
		"<td>&nbsp;"+print['data'][j].received_date+"</td>"+
		"<td>&nbsp;"+print['data'][j].branch_code+"</td>"+
		"</tr>";
	}	

	tab_text = tab_text + "</table> <br><table><tr><td></td><td><b>PV Koreksi<b></td></tr></table>";

	tab_text = tab_text + "<table border='2px'>" +
	"<tr style='font-weight:bold;'>"+
	"<td>No</td>"+
	"<td>PV No</td>"+
	"<td>Amount</td>"+
	"<td>Paid date</td>"+
	"<td>NIK paid</td>"+
	"<td>Name</td>"+
	"</tr>";
	for(var j = 0; j < print['data_pv'].length; j++){
		var no = j+1;
		tab_text = tab_text +
		"<tr>"+
		"<td>"+no+"</td>"+
		"<td>"+print['data_pv'][j].payment_no+"</td>"+
		"<td>"+accounting.formatMoney(print['data_pv'][j].amount, '', 2, ',', '.')+"</td>"+
		"<td>&nbsp;"+print['data_pv'][j].paid_date+"</td>"+
		"<td>&nbsp;"+print['data_pv'][j].nik_paid+"</td>"+
		"<td>"+print['data_pv'][j].customer_name+"</td>"+
		"</tr>";
	}	
	var ctx = {
		worksheet : 'Worksheet',
		table : tab_text
	}
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; 
	var yyyy = today.getFullYear();
	var hour = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();
	var link = document.createElement("a");
	link.download = dd+''+mm+''+yyyy+''+hour+''+minutes+''+seconds+''+"Reconcile_Detail_"+$('#id-slc-branch-reconcileReport :selected').val()+".xls";
	link.href = uri + base64(format(template, ctx));
	link.click();
}


function print_type_sumary(){
	var today;
	today = $('#id-inp-data_from-reconcileReport').val();
	if ($('#cabang-login').html() !== 'KANTOR PUSAT') {
		branch_code =	$('#id-branch-rcc').val();
	}else{
		branch_code = $('#id-slc-branch-reconcileReport :selected').html();
	}
	// branch_code = $('#id-branch-rcc').val();
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
	var maxrow = 0;
	for(var zz = 0 ; zz <print.data.length ; zz++){
		maxrow+= print.data[zz].list_kasir_cabang.length;
	}
	var tab_text=" <style> table{text-align:center;} </style>  <table><tr><td></td></tr></table><table><tr>";
	for (var i = 0; i < print.max_batch+3; i++) {
		tab_text = tab_text + "<td></td>";
	}
	tab_text = tab_text + "<td colspan='4' style='font-size:20px;font-weight:bold;text-align:center;'>RECONCILE REPORT (SUMARY)</td></tr></table> <table>"+
	" <table>";
	var textRange; 
	var j=0;
	branch_code = branch_code;
	var ss = $('#head-login').html();
	var artest = ["Date", "Branch"];
	var did = [today,branch_code];
	for(var i = 0; i < artest.length; i++) {
		tab_text = tab_text + "<tr><td></td><td style='font-weight:bold;'>"+artest[i]+"</td><td  style='font-weight:bold;'>&nbsp;:&nbsp;"+did[i]+"</td></tr>" ;
	}

	tab_text = tab_text + "</table></table><table><table border='2px'  >" +
	"<tr style='font-weight:bold;'>"+
	"<td rowspan='2' style='text-align:center'>No</td>"+
	"<td rowspan='2' style='text-align:center'>Branch/MUFNet</td>"+
	"<td colspan='2' style='text-align:center'>Last Cash Count</td>";
	for(var j = 0; j < print['max_batch']; j++){
		hdr_column = "CCR"+(j+1);
		tab_text = tab_text +
		"<td colspan='3' style='text-align:center'>"+hdr_column+"</td>";
		if (j==0) {
			tab_text = tab_text +"<td rowspan='2' style='text-align:center'>Total Transfer</td>";
		}

	}	
	tab_text = tab_text +
	"<td rowspan='2' style='text-align:center'>Selisih</td>"+
	"<td rowspan='2' style='text-align:center'>Uang Modal Kasir</td>"+
	"<td rowspan='2' style='text-align:center'>Total In Transit</td>"+
	"</tr>"+
	"<tr>"+
	"<td>"+'Cash Count No'+"</td>"+
	"<td>"+'Total Cash Count'+"</td>";
	for(var j = 0; j < print['max_batch']; j++){

		tab_text = tab_text +
		"<td>"+'Cash Count No'+"</td>";
		tab_text = tab_text +"<td>&nbsp;"+'Total Cash Count'+"</td>";
		tab_text = tab_text +	"<td>"+'rv total'+"</td>";
		
	}	
	tab_text = tab_text +
	"</tr>";

	//awal loop
	var cetak = true;
	for(var zz = 0 ; zz <print.data.length ; zz++){
		var flagzz=[];
		tab_text = tab_text +
		"<tr>"+
		"<td rowspan='"+print.data[zz].list_kasir_cabang.length+"'>"+(zz+1)+"</td>";
		if (branch_code.substring(7,branch_code.length).trim() !==  print.data[zz].cash_location.trim()) {
			tab_text = tab_text +"<td rowspan='"+print.data[zz].list_kasir_cabang.length+"'>"+print.data[zz].cash_location+" ("+branch_code.substring(7,branch_code.length).trim()+")"+"</td>";
		}else{
			tab_text = tab_text +"<td rowspan='"+print.data[zz].list_kasir_cabang.length+"'>"+print.data[zz].cash_location+"</td>";
		}
		var listmap = [];
		// mapping last cash
		for (var i = 0; i < print.data[zz].list_kasir_cabang.length; i++) {

			var map = {};
			for(var j = 0; j < print.data[zz].list_kasir_cabang[i].list_batch.length; j++){


				if (print.data[zz].list_kasir_cabang[i].list_batch[j].keterangan == null || print.data[zz].list_kasir_cabang[i].list_batch[j].keterangan  == 'LAST') {
					map["0"] = print.data[zz].list_kasir_cabang[i].list_batch[j];

				}else{
					map[print.data[zz].list_kasir_cabang[i].list_batch[j].batch_no] = print.data[zz].list_kasir_cabang[i].list_batch[j];
				}

			}	
				// jika yg tampil hanya last cash count maka
				if(map["0"]){
					flagzz.push(false);
				} else {
					flagzz.push(true);
				}
				listmap.push(map);
			}
			for (var i = 0; i <  listmap.length; i++) {
				var modal_kasirs = 0;
				if (i>0) {
					tab_text = tab_text +
					"<tr>";
				}
				for (var k = 0; k <= print.max_batch; k++) {
					if (k==0) {

						try{
							tab_text = tab_text + "<td>"+listmap[i][k].cash_no+"</td>"+
							"<td>"+accounting.formatMoney(listmap[i][k].total_amount, '', 2, ',', '.')+"</td>";
						}catch(e){
							tab_text = tab_text + "<td></td>"+
							"<td></td>";
						}


					}else{
						try{
							tab_text = tab_text + "<td>"+listmap[i][k].cash_no+"</td>"+
							"<td>"+accounting.formatMoney(listmap[i][k].total_amount, '', 2, ',', '.')+"</td>"+
							"<td>"+accounting.formatMoney(listmap[i][k].rv_total, '', 2, ',', '.')+"</td>";
						}catch(e){
							tab_text = tab_text + "<td></td>"+
							"<td></td>"+
							"<td></td>";
						}
						if (k==1 && i==0 && cetak == true) {
							tab_text = tab_text + "<td rowspan='"+maxrow+"'>"+accounting.formatMoney(print.data[zz].total_transfer, '', 0, ',', '.')+"</td>";
							cetak = false;
						}


					}

				}
				var plus = 0;
				if(flagzz[i]){
					plus = 1;
				}
				for(var k = 0; k < Object.size(listmap[i]); k++){

					try{
						if(modal_kasirs < listmap[i][k+plus].modal_kasir ){
							modal_kasirs = listmap[i][k+plus].modal_kasir;
						}
					}catch(e){
						try{
							modal_kasirs = listmap[i][print.max_batch].modal_kasir;
						}catch(e){
							modal_kasirs = listmap[i][print.max_batch-1].modal_kasir;
						}
					}
					

				}
				var selisih = 0;
				try{
					selisih = listmap[i][print.max_batch].selisih;
				}catch(e){
					selisih = null;
				}

				tab_text = tab_text + "<td>"+accounting.formatMoney(selisih, '', 2, ',', '.')+"</td>"+
			"<td>"+accounting.formatMoney(modal_kasirs, '', 2, ',', '.')+"</td>" //modal kasir

			if(i == 0){
				tab_text = tab_text +
				"<td rowspan="+print.data[zz].list_kasir_cabang.length+">"+accounting.formatMoney(print.data[zz].total_transit, '', 2, ',', '.')+"</td>";
			}
			tab_text = tab_text +
			"</tr>";
		}
	}

	tab_text = tab_text + "</table><br/><table>" +
	"<tr>"+

	"<td></td>"+
	"<td></td>"+
	"<td></td>"+
	"<td></td>"+
	"<td></td>"+
	"<td></td>"+

	"</tr>"+
	"<tr>";
	for (var i = 0; i < print.max_batch+1; i++) {
		tab_text = tab_text +
		"<td></td>"+
		"<td></td>"+
		"<td></td>"+
		"<td></td>";
	}
	tab_text = tab_text +
	"<td colspan='1'>Dibuat Oleh</td>"+
	"<td colspan='2'>Diketahui</td>"+
	"</tr>" +

	"<tr>"+
	"</tr>" +
	"<tr>"+
	"</tr>"+
	"<tr>"+
	"</tr>"+
	"<tr>";

	for (var i = 0; i < print.max_batch+1; i++) {
		tab_text = tab_text +

		"<td></td>"+
		"<td></td>"+
		"<td></td>"+
		"<td></td>";
	}
	tab_text = tab_text +
	"<td colspan='1'>ADH</td>"+
	"<td colspan='2'>BM/MUFNet+</td>"+
	"</tr>"
	var ctx = {
		worksheet : 'Worksheet',
		table : tab_text
	}
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; 
	var yyyy = today.getFullYear();
	var hour = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();
	var link = document.createElement("a");
	link.download = dd+''+mm+''+yyyy+''+hour+''+minutes+''+seconds+''+"Reconcile_Summary_"+$('#id-slc-branch-reconcileReport :selected').val()+".xls";
	link.href = uri + base64(format(template, ctx));
	link.click();
	branch_code = $('#cabang-id-reconcileReport').val();
}

Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};
