var table_nontrade = $('#table-nontrade-drth').DataTable({
	"paging":   false,
	"ordering": false,
	"info":     false,
	"searching": false,
	'columnDefs': [
	{"width": "10%", "targets": [0,2]},
	{"width": "15%", "targets": [4]}
	]
});

$('#table-nontrade-drth').on( 'change', '.slc-classcode-nontrade-c', function () {
	debugger;
	data = table_nontrade.row($(this).closest('tr')).data();
	var idslc = data[0].substring(data[0].indexOf("id=\"slc")+4 ,data[0].indexOf("\">"));
	var iddesc = data[1].substring(data[1].indexOf("inp-de"),data[1].indexOf("\" read"));
	var idbrief = data[3].substring(data[3].indexOf("inp-br"),data[3].indexOf("\" read"));
	$('#'+iddesc).val(tmp2[$('#'+idslc).val()]);
	$('#'+idbrief).val(tmp3[$('#'+idslc).val()]);
});

var angka;
$('#btn-addrv-nontrade').click(function(){
	if(table_nontrade.rows().flatten().length != 0){
		for (var i = 0; i < table_nontrade.data().length; i++) {
			var cls = $('#slc-classcode-nontrade'+i).val();
			var dsc = $('#inp-desc-nontrade'+i).val();
			var pc = $('#slc-pc-nontrade'+i).val();
			var brf = $('#inp-brief-nontrade'+i).val();
			var amt = $('#inp-amount-nontrade'+i).val();

			if(cls == "" || dsc == "" || pc == "" || brf == "" || amt == ""){
			alert_info("Lengkapi data terlebih dahulu");
			return false;
			}else{
				table_nontrade.row.add( [
			'<select class="form-control slc-classcode-nontrade-c" data-live-search="true" id="slc-classcode-nontrade'+angka+'"></select>',
			'<input class="nonrvtrade" style="width: 100%" id="inp-desc-nontrade'+angka+'" readonly></input>',
			'<select class="form-control" data-live-search="true" id="slc-pc-nontrade'+angka+'"><option value="">- SILAHKAN PILIH -</option><option value=99> 99 - OTHERS </option> </select>',
			'<input class="nonrvtrade" style="width: 100%" maxlength="50" id="inp-brief-nontrade'+angka+'" read></input>',
			'<input  type="number" class="nonrvtrade amount-nontrade" style="width: 100%" id="inp-amount-nontrade'+angka+'"></input>',
			'<button class="btn-search-drth btn-hapus-drth" id="btn-search-cmnm-drth"><i class="fa fa-trash"></i></button>'
			] ).draw( false );
		angka +=1;
		$('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('.slc-classcode-nontrade-c').addClass('form-control');
		for(var i = 0 ; i < tmp1.length; i++){
			$('.slc-classcode-nontrade-c').append('<option value="'+ tmp1[i] +'">'+tmp1[i]+'</option>');			
		}
			}

		}	
	}else{
		table_nontrade.row.add( [
			'<select class="form-control slc-classcode-nontrade-c" data-live-search="true" id="slc-classcode-nontrade'+angka+'"></select>',
			'<input class="nonrvtrade" style="width: 100%" id="inp-desc-nontrade'+angka+'" readonly></input>',
			'<select class="form-control" data-live-search="true" id="slc-pc-nontrade'+angka+'"> <option value="">- SILAHKAN PILIH -</option> <option value=99> 99 - OTHERS </option> </select>',
			'<input class="nonrvtrade" style="width: 100%" maxlength="50" id="inp-brief-nontrade'+angka+'" read></input>',
			'<input  type="number" class="nonrvtrade amount-nontrade" style="width: 100%" id="inp-amount-nontrade'+angka+'"></input>',
			'<button class="btn-search-drth btn-hapus-drth" id="btn-search-cmnm-drth"><i class="fa fa-trash"></i></button>'
			] ).draw( false );
		angka +=1;
		$('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('.slc-classcode-nontrade-c').addClass('form-control');
		for(var i = 0 ; i < tmp1.length; i++){
			$('.slc-classcode-nontrade-c').append('<option value="'+ tmp1[i] +'">'+tmp1[i]+'</option>');			
		}
	}
});

function getInpCont(S){

	return S.substring(67,68);
}

$('#table-nontrade-drth tbody').on( 'click', '.btn-hapus-drth', function () {
	var indexs = table_nontrade.row( $(this).parents('tr') ).index();
	var inde = getInpCont(table_nontrade.rows().data()[indexs][1]) ;
	var no_cont = $('#inp-desc-nontrade'+inde).val();
	table_nontrade
	.row( $(this).parents('tr') )
	.remove()
	.draw();
});

var mapDesc = {};
var mapBrief = {};
var tmp1 = [];
var tmp2 = [];
var tmp3 = [];

function getClassCode(){
	var rvno = $('#inp-norv-nontrade').val();

	if (check_session() === 'true') {
		$.ajax({
			url: base_url +'Controller_draft_received_trade_ho/getClassCode',
			type: 'GET',
			success: function(response){
				debugger;
				response = $.parseJSON(response);
				console.log(response);
				if (response){
					try{
						var status = response['status'];
						if (status == false) {
							alert_error('Data Not Found');
						}else{
							for (var i = 0 ; i < response['data'].length; i++) {
								tmp1.push(response['data'][i].classCode);	
								tmp2[tmp1[i]] = response['data'][i].briefdesc;
								tmp3[tmp1[i]] = response['data'][i].desc;
							}
							
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				}else{
					alert_error(response);
				}
			},error: function() {
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

$('#btn-buatrvno-nontarde').click(function(){
	debugger;
	var acct = $('#inp-acc-nontrade').val();
	var docno = $('#inp-doc-nontrade').val();
	var bankid = $('#slc-bank-nontrade').val();

	if(acct == ""){
		alert_info("Silahkan Isi Accept From");
		return;
	}else if(docno == ""){
		alert_info("Silahkan isi Documen No");
		return;
	}else if(bankid == ""){
		alert_info("Silahkan Pilih Bank Tujuan");
		return;
	}

	$('#content-nontrade-drth').removeProp('hidden');
	$('#btn-print-nondrth').prop('disabled', true);
	$('#btn-confrim-nondrth').prop('disabled', true);
	$('#btn-cancel-nondrth').prop('disabled', true);
	getClassCode();

});

// function getClassCode(){
// 	$.ajax({
// 		url: base_url+'Controller_draft_received_trade_ho/getClassCode',
// 		type: 'GET',
// 		success: function(response){
// 			debugger;
// 			var data = JSON.parse(response);
// 			if(JSON.stringify(response).includes('Timeout')){
// 				alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
// 			} else if(response){
// 				try{
// 					$('.slc-classcode-nontrade-c').empty();
// 					console.log('masuk');
// 					$('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('.slc-classcode-nontrade-c').addClass('form-control');

// 					for (var i = 0; i < data['data'].length; i++) {
// 						mapDesc[data['data'][i].classCode] = data['data'][i].briefdesc;
// 						mapBrief[data['data'][i].classCode] = data['data'][i].desc;
// 						$('.slc-classcode-nontrade-c').append('<option value="'+ data['data'][i].classCode +'">'+data['data'][i].classCode+'</option>');
// 					}

// 				} catch(e) {
// 					$('#loading-ajax').hide();
// 					alert_error(e);
// 				}
// 			}else{
// 				alert_error("Cek Jaringan");
// 			}

// 		},error:function(e){
// 			debugger;
// 			alert_error('error');
// 		}
// 	});
// }

$(document).on('click', function(){
	getTotalFun();
});

function getTotalFun(){
	debugger;
	var total = 0;
	jumbaris = table_nontrade.rows().data().length;
	for (var i = 0; i < jumbaris; i++) {
	var data = table_nontrade.data();
	var jml = data[i][4].substring(data[i][4].indexOf("inp-a") ,data[i][4].indexOf("\">"))
	total = Number(total) + Number($('#'+jml).val());
	}
	$('#inp-total-nontrade2').val(total);
	$('#inp-total-nontrade').val(accounting.formatMoney(total, 'Rp', 2, ',', '.'));
}

function insertRv(){
	debugger;
	var lisData = table_nontrade.data();
	var bank_code = $('#slc-bank-nontrade').val();
	var acct = $('#inp-acc-nontrade').val();
	var docno = $('#inp-doc-nontrade').val();
	var colldate = $('#inp-collrv-drth').val();
	var rvdate = $('#inp-daterv-drth').val();
	var tamont = $('#inp-total-nontrade2').val();
	var arrayData= [];

	for (var i = 0; i < lisData.length; i++) {
		var stringid = table_nontrade.rows().data()[i][1];
		stringid = getInpCont(stringid);
		arrayData.push({
			class_code : $('#slc-classcode-nontrade'+stringid).val(),
			desc : $('#inp-desc-nontrade'+stringid).val(),
			pccode: $('#slc-pc-nontrade'+stringid).val(),
			remark: $('#inp-brief-nontrade'+stringid).val(),
			amount:$('#inp-amount-nontrade'+stringid).val()
		});
	}

	if (check_session() === 'true') {
		$.ajax({
			url: base_url+'Controller_draft_received_trade_ho/insertRvNontrade',
			type: 'POST',
			async: false,
			data:{
				arrayData,
				bank_id : bank_code,
				acct : acct,
				docno: docno,
				colldate: colldate,
				tamont: tamont
			},
			success: function(response){
				debugger;
				response = $.parseJSON(response);
			    data = $.parseJSON(response);
				console.log(response);
				if (response){
					try{
						var status = response['status'];
						if (status == false) {
							alert_error('Closing data doesnt exist');
						}else{
							var norv = data['header']['norv'];
							$('#inp-norv-nontrade').val(norv);
							table_nontrade.clear().draw();
							alert_info('Berahsil');
							$('#content-nontrade-drth').prop('hidden', true);
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				}else{
					alert_error(response);
				}
			},error: function() {
				console.log(response);
				alert_error(response);
			}
		});
	}else{
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url+"Controller_login/login_view";
		});
	}
}



$('#nontrade-drth').click(function(){
	validasi();
});

function validasi(){
	$('#inp-acc-nontrade').prop('disabled', true);
	$('#inp-doc-nontrade').prop('disabled', true);
	$('#inp-norv-nontrade').prop('disabled', true);
	$('#inp-daterv-drth').prop('disabled', true);
	$('#inp-collrv-drth').prop('disabled', true);
	$('#slc-bank-nontrade').prop('disabled', true);
	$('#btn-cari-rvno-nontrade').prop('disabled', true);
	$('#btn-buatrvno-nontarde').prop('disabled', true);
	$('#btn-carirvno-nontarde').prop('disabled', true);
	$('#content-nontrade-drth').prop('hidden', true);
};

$('#createrv-nontrade').click(function(){
	validasi();
	getBankNonTrade();
	$('#inp-acc-nontrade').prop('disabled', false);
	$('#inp-doc-nontrade').prop('disabled', false);
	$('#inp-collrv-drth').prop('disabled', false);
	$('#slc-bank-nontrade').prop('disabled', false);
	$('#btn-buatrvno-nontarde').prop('disabled', false);
	$('#inp-norv-nontrade').val('');
});

$('#carirv-nontrade').click(function(){
	validasi();
	getBankNonTrade();
	$('#btn-cari-rvno-nontrade').prop('disabled', false);
	$('#btn-carirvno-nontarde').prop('disabled', false);
	$('#inp-norv-nontrade').prop('disabled', false);
	$('#inp-acc-nontrade').val('');
	$('#inp-doc-nontrade').val('');
	$('#inp-collrv-drth').val('');
	$('#inp-norv-nontrade').val('');
});

$('.tgl-nontrade').datetimepicker({
	format: 'DD-MMM-YYYY',
	allowInputToggle: true,
	maxDate: new Date().format('DD-MMM-YYYY')
})

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
$('#inp-daterv-drth').val(today);
$('#inp-collrv-drth').val(today);

var flag_process = 0;
var dtClosing;
var dtMinClosing;
function getDayClosing(){

	if (check_session() === 'true') {
		$.ajax({
			url: base_url+'Controller_draft_received_trade_ho/getDTCLOSING',
			type: 'POST',
			async: false,
			success: function(response){
				debugger;
				response = $.parseJSON(response);
				console.log(response);
				if (response){
					try{
						var status = response['status'];
						if (status == false) {
							alert_error('Closing data doesnt exist');
						}else{
							dtClosing = response['dtClosing'];
							var today = response['sysDate'];

							if(dtClosing == '' || today == ''){
								alert_error('Invalid Server Date OR Closing Date Or Minimum Closing Date.');
								flag_process = 1;
							}
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				}else{
					alert_error(response);
				}
			},error: function() {
				console.log(response);
				alert_error(response);
			}
		});
	}else{
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url+"Controller_login/login_view";
		});
	}
}


$('#btn-save-nontrade').click(function(){
	debugger;
	var tn = table_nontrade.data().length;
	if(tn == 0){
		alert_info("Lengkapi data terlebih dahulu");
		return false;
	}
	for (var i = 0; i < table_nontrade.data().length; i++) {
			var cls = $('#slc-classcode-nontrade'+i).val();
			var dsc = $('#inp-desc-nontrade'+i).val();
			var pc = $('#slc-pc-nontrade'+i).val();
			var brf = $('#inp-brief-nontrade'+i).val();
			var amt = $('#inp-amount-nontrade'+i).val();

			if(cls == "" || dsc == "" || pc == "" || brf == "" || amt == ""){
			alert_info("Lengkapi data terlebih dahulu");
			return false;
		}
	}
	getDayClosing();
	if(flag_process != 1){
		getCountDay();
		if(flag_process !=2){
			insertRv();
		}
	}
});

function getCountDay(){
	if (check_session() === 'true') {
		$.ajax({
			url: base_url +'Controller_draft_received_trade_ho/getDTMINCLOSING',
			type: 'POST',
			async: false,
			data:{
				dtClosing : dtClosing,
			},
			success: function(response){
				response = $.parseJSON(response);
				console.log(response);
				if (response){
					try{
						var status = response['status'];
						if (status == false) {
							alert_error('Min Closing data doesnt exist');
						}else{
							dtMinClosing = response['dtMinClosing'];
							var Mclosing = dtMinClosing.replace(/-/g,'/');
							if( Mclosing > dtClosing){
								alert_info('RV Confirmation cant be done before Closing, minimum date '+dtMinClosing+' Latest Closing date '+dtClosing);
								flag_process = 2;
							}
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				}else{
					alert_error(response);
				}
			},error: function() {
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

//================================================================================================\\
//==============================================BANK==============================================\\
function getBankNonTrade(){
	var bank = $('#slc-bank-insr').val();

	if (check_session() === 'true') {
		$.ajax({
			url: 'Controller_draft_received_trade_ho/getBankNon',
			type: 'POST',
			success: function(response){
				var data = JSON.parse(response);
				if(JSON.stringify(response).includes('Timeout')){
					alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
				} else if(response){
					try{
						$('#slc-bank-nontrade').empty();
						console.log('masuk');
						$('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('#slc-bank-nontrade').addClass('form-control');

						for (var i = 0; i < data['data'].length; i++) {
							$('#slc-bank-nontrade').append('<option value="'+ data['data'][i].bankCode +'">'+data['data'][i].bankCode+'-'+data['data'][i].bankName + '</option>');
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
	}else{
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
}

//=================================================================================================\\
//==============================================CARI RV=============================================\\

function getCariRvNontrade(){
	var rvno = $('#inp-norv-nontrade').val();

	if (check_session() === 'true') {
		$.ajax({
			url: base_url +'Controller_draft_received_trade_ho/cariRvNontrade',
			type: 'POST',
			data:{
				rvno : rvno,
			},
			success: function(response){
				debugger;
				response = $.parseJSON(response);
				console.log(response);
				if (response){
					try{
						var status = response['status'];
						var flag = response['flag'];
						if (status == false) {
							alert_error('Data Not Found');
						}else{
							if(flag == 300){
								alert_info('Telah Di Receive Sebelumnya');
							}else if(flag == 400){
								alert_error('Telah Di Cancel Sebelumnya');
							}
							table_nontrade.clear().draw();
							for (var i = 0 ; i < response['data'].length; i++) {
								$('#slc-bank-nontrade').val(response['data'][i].bankid);
								$('#inp-acc-nontrade').val(response['data'][i].acct);
								$('#inp-doc-nontrade').val(response['data'][i].docno);
								table_nontrade.row.add([
									response['data'][i].classCode,
									response['data'][i].desc,
									response['data'][i].objcode,
									response['data'][i].remark,
									response['data'][i].amount,
									''
									]).draw(false);
								$('#inp-total-nontrade2').val(response['data'][i].tamount);
								debugger;
								var colldate = response['data'][i].collDate
								colldate = new Date(colldate).format('dd-mmm-yyyy');
								$('#inp-collrv-drth').val(colldate);
								$('#content-nontrade-drth').removeProp('hidden');
							}
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Silahkan Masukan no RV yang benar")
					//alert_error("Terjadi Kesalahan => "+e);
				}
			}else{
				alert_error(response);
			}
		},error: function() {
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

$('#btn-carirvno-nontarde').click(function(){
	debugger;
	var rvno = $('#inp-norv-nontrade').val();
	if(rvno == ""){
		alert_info("Silahkan Isi No RV");
		return false;
	}
	getCariRvNontrade();
	$('#btn-save-nontrade').prop('disabled', true);
	$('#btn-print-nondrth').prop('disabled', true);
});

//=================================================================================================\\
//==============================================CONFRIM RV=============================================\\

function getConNontarde(){
	var rvno = $('#inp-norv-nontrade').val();

	if (check_session() === 'true') {
		$.ajax({
			url: base_url +'Controller_draft_received_trade_ho/getConNontarde',
			type: 'POST',
			async: false,
			data:{
				rvno : rvno,
			},
			success: function(response){
				debugger;
				response = $.parseJSON(response);
				console.log(response);
				if (response){
					try{
						var status = response['status'];
						if (status == false) {
							alert_error('Data Not Found');
						}else{
							alert_refresh(rvno+' telah berhasil di konfirmasi');
						}

					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				}else{
					alert_error(response);
				}
			},error: function() {
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

$('#btn-confrim-nondrth').click(function(){
	getConNontarde();
});

//=================================================================================================\\
//==============================================CANCEL RV=============================================\\

function getCancelNon(){
	var rvno = $('#inp-norv-nontrade').val();

	if (check_session() === 'true') {
		$.ajax({
			url: base_url +'Controller_draft_received_trade_ho/getCancelNon',
			type: 'POST',
			async: false,
			data:{
				rvno : rvno,
			},
			success: function(response){
				debugger;
				response = $.parseJSON(response);
				console.log(response);
				if (response){
					try{
						var status = response['status'];
						if (status == false) {
							alert_error('Data Not Found');
						}else{
							alert_refresh(rvno+' telah berhasil di cancel');
						}

					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				}else{
					alert_error(response);
				}
			},error: function() {
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

$('#btn-cancel-nondrth').click(function(){
	getCancelNon();
});
