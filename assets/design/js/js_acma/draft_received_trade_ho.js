
//==============================================VALIDASI HO==============================================\\
var branch_code = $('#id-branch-drth').val();
if (branch_code !== '0000') {
	alert_info('Menu ini hanya bisa di akses oleh HO');
	$('#slc-menu-drth').prop('disabled', true);
}

//==============================================DEALER==============================================\\
function validasi(){
	$('#panel-bidding-drth').prop('hidden', true);
	$('#panel-dealer-drth').prop('hidden', true);
	$('#panel-insurance-drth').prop('hidden', true);
	$('#content-dealer-drth').prop('hidden', true);
	$('#content-ins-drth').prop('hidden', true);
	$('#content-bid-drth').prop('hidden', true);
}

function validasiDel(){
	$('#slc-dealer-deal').prop('disabled', true);
	$('#rvno-deal-drth').prop('disabled', true);
	$('#slc-bank-deal').prop('disabled', true);
	$('#slc-class-deal-drth').prop('disabled', true);
	$('#btn-createrv-deal-drth').prop('disabled', true);
	$('#btn-searchrv-deal-drth').prop('disabled', true);
}

$('#createrv-deal').click(function(){
	validasiDel();
	getDealer();
	$('#slc-dealer-deal').prop('disabled', false);
	$('#slc-bank-deal').prop('disabled', false);
	$('#slc-class-deal-drth').prop('disabled', false);
	$('#btn-createrv-deal-drth').prop('disabled', false);
	$('#rvno-deal-drth').val("");
	$('#slc-class-deal-drth').val("- SILAHKAN PILIH -");
	$('#content-dealer-drth').prop('hidden', true);
	getBankDeal();
})

$('#carirv-deal').click(function(){
	validasiDel();
	$('#rvno-deal-drth').prop('disabled', false);
	$('#btn-searchrv-deal-drth').prop('disabled', false);
	$('#content-dealer-drth').prop('hidden', true);
	$('#slc-dealer-deal').val("");
	$('#slc-class-deal-drth').val("- SILAHKAN PILIH -");
	getDealer();
	getBankDeal();
})

//==============================================GET DEALER==============================================\\
var table_dealer_drth = $('#table-dealer-drth').DataTable({
	'responsive' : true,
	'select' : true,
	'button' : false
});

function getDealer(){
	$.ajax({
		url: base_url+'Controller_draft_received_trade_ho/get_dealer',
		type: 'POST',
		success: function(response){
			var data = JSON.parse(response);
			if(JSON.stringify(response).includes('Timeout')){
				alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
			} else if(response){
				try{
					$('#slc-dealer-deal').empty();
					console.log('masuk');
					$('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('#slc-dealer-deal').addClass('form-control');

					for (var i = 0; i < data['Data'].length; i++) {
						$('#slc-dealer-deal').append('<option value="'+ data['Data'][i].dealer_code +'">'+data['Data'][i].dealer_code +'-'+data['Data'][i].dealer_name +' </option>');
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


//==============================================SEARCH RV==============================================\\

var table_rv_drth = $('#table-rv-drth') .DataTable({
	'responsive' : true,
	'select' : true
});

$('#slc-dealer-deal').change(function(){
	//getRvDealer();
});

function getRvDealer(){
	var deal_code = $('#slc-dealer-deal').val();
	$.ajax({
		url: base_url+'Controller_draft_received_trade_ho/get_code_dealer',
		type: 'POST',
		data : {
			dealer_code:deal_code
		},
		success: function(response){
			var data = JSON.parse(response);
			if(JSON.stringify(response).includes('Timeout')){
				alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
			} else if(response){
				try{
					$('#slc-rv-deal').empty();
					console.log('masuk');
					$('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('#slc-rv-deal').addClass('form-control');

					for (var i = 0; i < data['data'].length; i++) {
						$('#slc-rv-deal').append('<option value="'+ data['data'][i].rv_no +'">'+data['data'][i].rv_no +' </option>');
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

var flag = 0;
function getSearchRvNo(){
	var rv_no = $('#rvno-deal-drth').val();

	if (check_session() === 'true') {
		$.ajax({
			url : base_url+'Controller_draft_received_trade_ho/get_search_rv_no',
			type : 'POST',
			data : {
				rv_no:rv_no
			},
			success: function(response){
				response = $.parseJSON(response);
				console.log(response);
				if (response){
					try{
						var status = response['status'];
						var alert = response['flag'];
						if(status) {
							if (response['data'] == null) {
								alert_error('Data tidak ditemukan !');
							}else{
								if(alert == 300){
									alert_info('No RV Telah Di Receive Sebelumnya');
									return false;
								}else if(alert == 400){
									alert_error('No RV Telah Di Cancel Sebelumnya');
									return false;
								}
								received_trade_ho.clear().draw();
								$('#content-dealer-drth').removeProp('hidden');
								for (var i = 0 ; i < response['data'].length; i++) {
									$('#slc-bank-deal').val(response['data'][i].bank_id);
									$('#slc-class-deal-drth').val(response['data'][i].class_code);
									received_trade_ho.row.add([
										response['data'][i].class_code,
										response['data'][i].contract_no,
										response['data'][i].customer_name,
										response['data'][i].amount,
										''
										]).draw(false);
									flag = flag + 1;

									$('#inp-nama-bank-drth').val(response['data'][i].bank_id);

								}
								getTotalKomisi2();
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
			},error: function() {
				console.log(response);
				alert_error('Jaringan terputus, Silahkan coba lagi !');
			}
		});
	}else{
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
}

function getTotalKomisi2(){
	var total = 0;
	var jumbaris = received_trade_ho.rows().data().length;
	for (var i = 0; i < jumbaris; i++) {
		total = Number(total) + Number(received_trade_ho.rows().data()[i][3]);
	}
	$('#inp-total-dealer-drth').val(total);
}

$('#btn-searchrv-deal-drth').click(function(){
	var no_rv = $('#rvno-deal-drth').val();


	if (no_rv === '') {
		alert_info("Silahkan pilih No RV");
	}else{

	// $('#panel-memo-drth').prop('hidden',true);
	$('#btn-buat-rvno-drth').prop('disabled', true);
	$('#btn-add-rvno-drth').prop('disabled',true);
	$('#btn-confrim-rvno-drth').prop('disabled',false);
	$('#btn-cancel-rvno-drth').prop('disabled',false);
	$('#btn-search-bank-drth').hide();
	$('#btn-cancel-rvno-drth').prop('disabled',false);

	// $('#inp-nomor-deal-drth').val(localStorage.getItem('nomor_deal'));
	// $('#inp-nama-deal-drth').val(localStorage.getItem('nama_deal'));
	// $('#inp-nomor-rv-drth').val(localStorage.getItem('nomor_rv'));

	getSearchRvNo();
}
});

$('#table-rv-drth tbody').on('mouseover', 'tr', function() {
	$(this).addClass('pointer');
	if ($(this).hasClass('selected')) {
		$(this).removeClass('selected');
	} else {
		table_rv_drth.$('tr.selected').removeClass('selected');
		$(this).addClass('selected');
		rv_tbl = table_rv_drth.row(this).data();
	}
});

$('#table-rv-drth tbody').on('click', 'tr', function(){
	localStorage.setItem('nomor_rv', rv_tbl[0]);

	$('#inp-no-rv-drth').val(rv_tbl[0]);
	$('#modal-rv-drth').modal('hide');
});

//==============================================CONFRIM RV==============================================\\

$('#btn-confrim-rvno-drth').click(function(){
	var lisData = received_trade_ho.data();

	if (lisData.length == 0){
		alert_info('Data Kosong!');
	}else{
		alert_confirm('Apakah Anda Yakin Untuk Mengkonfirmasi RV?',function(){
			getConfrimRv();
		});
	}
});

function getConfrimRv(){

	if (check_session() === 'true') {
		$.ajax({
			url : base_url+'Controller_draft_received_trade_ho/post_confrim_rv',
			type : 'POST',
			data : {
				rv_no : rv_no
			},
			success: function(response){
				response = $.parseJSON(response);
				console.log(response);
				if(response){
					try{
						if (response['status']) {
							alert_refresh('RV Berhasil Dikonfirmasi');
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
			},error:function(response){
				console.log(response);
				alert_error('Jaringan terputus, Silahkan coba lagi !');
			}
		});
	}else{
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
}

//==============================================CANCEL RV==============================================\\

$('#btn-cancel-rvno-drth').click(function(){
	var rvno = $('#rvno-deal-drth').val();
	var lisData = received_trade_ho.data();
	if (lisData.length == 0){
		alert_refresh("Tidak Ada Data Untuk Di Cancel!");
	}else{
		alert_confirm('Apakah Anda Yakin Untuk Mengcancel RV?',function(){
			getCancelRv(rvno);
		});
	}
});

function getCancelRv(index){

	if (check_session() === 'true') {
		$.ajax({
			url : base_url+'Controller_draft_received_trade_ho/post_cancel_rv',
			type : 'POST',
			data : {
				index
			},
			success: function(response){
				response = $.parseJSON(response);
				console.log(response);
				if(response){
					try{
						if (response['status']) {
							if (response['alert'] == 1) {
								alert_info('RV terbentuk oleh JOBS tidak bisa di cancel!');
							}else{
								alert_refresh('RV Berhasil Dicancel');
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
			},error:function(response){
				console.log(response);
				alert_error('Jaringan terputus, Silahkan coba lagi !');
			}
		});
	}else{
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
}

//==============================================BUAT RV==============================================\\

var received_trade_ho = $('#table-draft-received-trade-ho').DataTable({
	"paging":   false,
	"ordering": false,
	"info":     false,
	"searching": false,
	"responsive": true

});

var table_cust_name_drth = $('#table-cust-name-drth').DataTable({

	'columnDefs': [
	{
		"targets": [ 7 ],
		"visible": false,
		"searchable": false
	},
	{
		"targets": [ 4 ],
		"visible": false,
		"searchable": false
	},
	{
		"targets": [ 5 ],
		"visible": false,
		"searchable": false
	},
	{
		"targets": [ 8 ],
		"visible": false,
		"searchable": false
	}
	]
});

$('#btn-buat-rvno-drth').click(function(){
	var lisData = received_trade_ho.data();
	var total = $('#inp-total-dealer-drth').val();

	var kode_dealer = $('#slc-dealer-deal').val();
	var bank_code = $('#slc-bank-deal').val();

	var arrayData= [];

	for (var i = 0; i < lisData.length; i++) {
		var stringid = received_trade_ho.rows().data()[i][1];
		stringid = getIdFromInpCont(stringid);
		var class_code = $('#inp-class-code'+stringid).val();
		var branch_id = $('#inp-branch-id-drth'+stringid).val();
		arrayData.push({
			branch_id : $('#inp-branch-id-drth'+stringid).val(),
			class_code : $('#inp-class-code'+stringid).val(),
			kode_dealer : $('#slc-dealer-deal').val(),
			amount:$('#inp-komisi-dealer'+stringid).val(),
			blhd:$('#inp-komisi-dealer-blhd'+stringid).val(),
			blhd1:$('#inp-komisi-dealer-blhd1'+stringid).val(),
			contract_id:$('#inp-contract-id'+stringid).val()
		});
	}

	if (bank_code == '') {
		alert_info("Silahkan pilih Bank Penerima");
	}else if(lisData.length == 0){
		alert_info("Silahkan Tambah Data");
	}else{
		$.ajax({
			url : base_url+'Controller_draft_received_trade_ho/post_data_rv',
			type : 'POST',
			data : {
				arrayData,
				total:total,
				class_code:class_code,
				kode_dealer:kode_dealer,
				bank_code:bank_code

			},
			success: function(response){
				response = $.parseJSON(response);
				console.log(response);
				if(response){
					response = JSON.parse(response);
					try{
						if (response['status']) {
							alert_refresh('Berhasil Membuat RV !');
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
			},error:function(response){
				console.log(response);
				alert_error('Jaringan terputus, Silahkan coba lagi !');
			}
		});
	}
});

var selected_index;
function getCustName(angka2)
{

	selected_index = angka2;
	$('#modal-cust-name-drth').modal('show');
// getTotalKomisi()


};

$('#table-cust-name-drth tbody').on('mouseover', 'tr', function() {
	$(this).addClass('pointer');
	if ($(this).hasClass('selected')) {
		$(this).removeClass('selected');
	} else {
		table_cust_name_drth.$('tr.selected').removeClass('selected');
		$(this).addClass('selected');
	}
});

var map = new Object();	
$('#table-cust-name-drth tbody').on('click', 'tr', function() {

	if ($(this).hasClass('selected')) {
	//$(this).removeClass('selected');
} else {
	table_cust_name_drth.$('tr.selected').removeClass('selected');
	$(this).addClass('selected');
}

var data = table_cust_name_drth.rows().data();
var indexx = data.$('tr.selected').index();

if(data[indexx][0] != null || data[indexx][0] != "" ){
	if(table_cust_name_drth.rows().count() == 1){
		received_trade_ho.row.add([
			'<input  class="no-border2" id="inp-class-code'+angka+'" readonly></input>',
			'<input class="no-border2" idBtn="angka" id="inp-no-kontrak-drth'+angka+'" readonly></input>',
			'<input class="no-border2" style="width: 80%" id="inp-nama-customer'+angka+'" readonly></input>',
			'<input class="no-border2" id="inp-komisi-dealer'+angka+'" readonly></input>'+
			'<input type="hidden" class="no-border2"  id="inp-komisi-dealer-blhd'+angka+'" readonly></input>'+
			'<input type="hidden" class="no-border2" id="inp-komisi-dealer-blhd1'+angka+'" readonly></input>'+
			'<input type="hidden" class="no-border2" id="inp-contract-id'+angka+'" readonly></input>'+
			'<input type="hidden" class="no-border2" id="inp-branch-id-drth'+angka+'" readonly></input>',
			'<button class="btn-search-drth btn-hapus-drth" id="btn-search-cmnm-drth"><i class="fa fa-trash"></i></button>'

			]).draw(true);

		$('#btn-add-rvno-drth').prop('disabled',true);
	}else{
		received_trade_ho.row.add([
			'<input  class="no-border2" id="inp-class-code'+angka+'" readonly></input>',
			'<input class="no-border2" idBtn="angka" id="inp-no-kontrak-drth'+angka+'" readonly></input>',
			'<input class="no-border2" style="width: 80%" id="inp-nama-customer'+angka+'" readonly></input>',
			'<input class="no-border2" id="inp-komisi-dealer'+angka+'" readonly></input>'+
			'<input type="hidden" class="no-border2"  id="inp-komisi-dealer-blhd'+angka+'" readonly></input>'+
			'<input type="hidden" class="no-border2" id="inp-komisi-dealer-blhd1'+angka+'" readonly></input>'+
			'<input type="hidden" class="no-border2" id="inp-contract-id'+angka+'" readonly></input>'+
			'<input type="hidden" class="no-border2" id="inp-branch-id-drth'+angka+'" readonly></input>',
			'<button class="btn-search-drth btn-hapus-drth" id="btn-search-cmnm-drth"><i class="fa fa-trash"></i></button>'

			]).draw(true);

//flag=angka;


}
angka +=1;


console.log(selected_index);

console.log(indexx);
var no_cont = $('#inp-no-kontrak-drth'+selected_index).val();
if(no_cont == null || no_cont == ""){
	no_cont = data[indexx][0];
}
$('#inp-no-kontrak-drth'+selected_index).val(data[indexx][0]);
$('#inp-branch-id-drth'+selected_index).val(data[indexx][1]);
$('#inp-nama-customer'+selected_index).val(data[indexx][2]);
$('#inp-komisi-dealer'+selected_index).val(data[indexx][3]);
$('#inp-komisi-dealer-blhd'+selected_index).val(data[indexx][4]);
$('#inp-komisi-dealer-blhd1'+selected_index).val(data[indexx][5]);
$('#inp-contract-id'+selected_index).val(data[indexx][7]);
$('#inp-class-code'+selected_index).val(data[indexx][8]);

if(map[no_cont] == null){
	map[no_cont] = 1;
} else {
	map[no_cont] = null;
	map[data[indexx][0]] = 1;
}


table_cust_name_drth.clear().draw();

for(var i=0;i<temp_table.length;i++){
	if(map[temp_table[i][0]] == 1){
		continue;
	}
	table_cust_name_drth.row.add([
		temp_table[i][0],
		temp_table[i][1],
		temp_table[i][2],
		temp_table[i][3],
		temp_table[i][4],
		temp_table[i][5],
		temp_table[i][6],
		temp_table[i][7],
		'T-AL.HD'
		]).draw(false);

}

getTotalKomisi()
$('#modal-cust-name-drth').modal('hide');

if ( selected_index == flag ) {
	$('#btn-add-rvno-drth').removeProp('disabled');
}
}

});

function getTotalKomisi(){
	var total = 0;
	var jumbaris = received_trade_ho.rows().data().length;
	for (var i = 0; i < jumbaris; i++) {
		var stringid = received_trade_ho.rows().data()[i][1];
		stringid = getIdFromInpCont(stringid);
		total = Number(total) + Number($('#inp-komisi-dealer'+stringid).val());
	}
	$('#inp-total-dealer-drth').val(total);
}

//==============================================GET BANK==============================================\\

function getIdFromInpCont(S){

	return S.substring(63,64);
}

function getBankDeal(){
	var bank = $('#slc-bank-insr').val();
	$.ajax({
		url: base_url+'Controller_draft_received_trade_ho/get_list_bank',
		type: 'POST',
		success: function(response){
			var data = JSON.parse(response);
			if(JSON.stringify(response).includes('Timeout')){
				alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
			} else if(response){
				try{
					$('#slc-bank-deal').empty();
					console.log('masuk');
					$('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('#slc-bank-deal').addClass('form-control');

					for (var i = 0; i < data['data'].length; i++) {
						$('#slc-bank-deal').append('<option value="'+ data['data'][i].bankCode +'">'+data['data'][i].bankCode+'-'+data['data'][i].bankName + '</option>');
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

$('#table-bank-drth tbody').on('mouseover', 'tr', function() {
	$(this).addClass('pointer');
	if ($(this).hasClass('selected')) {
		$(this).removeClass('selected');
	} else {
		bank_penerima_drth.$('tr.selected').removeClass('selected');
		$(this).addClass('selected');
		bp_tbl = bank_penerima_drth.row(this).data();
	}
});

$('#table-bank-drth tbody').on('click', 'tr', function(){

	$('#inp-nama-bank-drth').val(bp_tbl[0]);
	$('#inp-code-bank-drth').val(bp_tbl[1]);
	$('#modal-bank-drth').modal('hide');
});

//==============================================ADD ROW==============================================\\


var angka = 0;
$('#btn-add-rvno-drth').click(function(){

	getCustName(angka);

});

$('#table-draft-received-trade-ho tbody').on( 'click', '.btn-hapus-drth', function () {
	$('#btn-add-rvno-drth').prop('disabled',false);
	var indexs = received_trade_ho.row( $(this).parents('tr') ).index();
	var inde = getIdFromInpCont(received_trade_ho.rows().data()[indexs][1]) ;
	var no_cont = $('#inp-no-kontrak-drth'+inde).val();
	received_trade_ho
	.row( $(this).parents('tr') )
	.remove()
	.draw();

	map[no_cont] = null;
	table_cust_name_drth.clear().draw();

	for(var i=0;i<temp_table.length;i++){
		if(map[temp_table[i][0]] == 1){
			continue;
		}
		table_cust_name_drth.row.add([
			temp_table[i][0],
			temp_table[i][1],
			temp_table[i][2],
			temp_table[i][3],
			temp_table[i][4],
			temp_table[i][5],
			temp_table[i][6],
			temp_table[i][7],
			'T-AL.HD'
			]).draw(false);

	}

	getTotalKomisi()
} );


//==============================================BUTTON CREATE RV==============================================\\
var temp_table;
$('#btn-createrv-deal-drth').click(function(){

	var dealer = $('#slc-dealer-deal').val();
	var norv = $('#inp-no-rv-drth').val();
	var bank = $('#slc-bank-deal').val();
	var classcode = $('#slc-class-deal-drth').val();

	if(dealer == ''){
		alert_info("Silahkan Pilih Dealer");
		return false;
	}else if(bank == ''){
		alert_info("Silahkan Pilih Bank Penerima");
		return false;
	}else if(classcode == '- SILAHKAN PILIH -'){
		alert_info("Silahkan Pilih Class Code");
		return false;
	}else{
		$('#content-dealer-drth').removeProp('hidden');
	// $('#panel-memo-drth').prop('hidden',true);
	$('#btn-confrim-rvno-drth').prop('disabled',true);
	$('#btn-cancel-rvno-drth').prop('disabled',true);
	$('#btn-add-rvno-drth').prop('disabled',false);
	$('#btn-buat-rvno-drth').prop('disabled',false);
	$('#btn-search-bank-drth').show();
	$('#inp-nama-bank-drth').val('');
	$('#inp-total-dealer-drth').val('');

	// $('#inp-nomor-deal-drth').val(localStorage.getItem('nomor_deal'));
	// $('#inp-nama-deal-drth').val(localStorage.getItem('nama_deal'));
	// $('#inp-nomor-rv-drth').val(localStorage.getItem('nomor_rv'));
}

received_trade_ho.clear().draw();
var deal_code = $('#slc-dealer-deal').val();
$.ajax({
	url: base_url+'Controller_draft_received_trade_ho/get_cust_name',
	type: 'POST',
	data : {
		deal_code:deal_code
	},
	success: function(response){
		response = $.parseJSON(response);
		console.log(response);
		if (response){
			try{
				var status = response['status'];
				if(status) {
					if (response['data'] == null) {
						alert_error('Data tidak ditemukan !');
					}else{
						table_cust_name_drth.clear().draw();
						for (var i = 0 ; i < response['data'].length; i++) {

							if (response['data'][i].amount != 0){
								table_cust_name_drth.row.add([
									response['data'][i].contract_no,
									response['data'][i].branch_id,
									response['data'][i].customer_name,
									response['data'][i].amount,
									response['data'][i].amount_blhd,
									response['data'][i].amount_blhd1,
									response['data'][i].datetime,
									response['data'][i].contract_id,
									'T-AL.HD'
									]).draw(false);
							}
						}
						temp_table = table_cust_name_drth.rows().data();
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
	},error: function() {
		console.log(response);
		alert_error('Jaringan terputus, Silahkan coba lagi !');
	}
});
});

//==============================================INSURANCE==============================================\\
var role_confirm = false;
var role_create = false;
var role_adm = false;

$('#id-menu-drth').change(function(){
	var menu_drth = $('#slc-menu-drth :selected').val();
	console.log(menu_drth);


	if (menu_drth == 'Insurance') {
		validasi();
		$('#panel-insurance-drth').removeProp('hidden');
		$('#panel-dealer-drth').prop('hidden', true);
		$('#panel-bidding-drth').prop('hidden', true);
		validasiInsr();
		$.each(role_rvho, function(i){
			if(role_rvho[i]['role_code'] === 'CREATE_RVHO'){
				role_create = true;
			}else if(role_rvho[i]['role_code'] === 'CONTFIRM_RVHO'){
				role_confirm = true;
			}
		});


		if (role_confirm == true && role_create == true) {
			$('#createrv-insr').prop('disabled', false);
		}else if (role_confirm == true){
			$('#createrv-insr').prop('disabled', true);
		}else if(role_create == true){
			$('#createrv-insr').prop('disabled', false);
		}

	}else if(menu_drth == 'Dealer'){
		validasi();
		$('#panel-dealer-drth').removeProp('hidden');
		$('#panel-insurance-drth').prop('hidden', true);
		$('#panel-bidding-drth').prop('hidden', true);
		validasiDel();

	}else if(menu_drth == 'Bidding'){
		validasi();
		$('#panel-bidding-drth').removeProp('hidden');
		$('#panel-insurance-drth').prop('hidden', true);
		$('#panel-dealer-drth').prop('hidden', true);
		//validasiBid();
		getBankBid();
	}
})

function validasiInsr(){
	$('#slc-mas-insr').prop("disabled", true);
	$('#rvno-insr-drth').prop("disabled", true);
	$('#slc-bank-insr').prop("disabled", true);
	$('#slc-clasfun-drth').prop("disabled", true);
	$('#btn-createrv-insr-drth').hide();
	$('#btn-carirv-insr-drth').hide();
	$('#btn-save-ins-drth').prop("disabled", false);
	$('#btn-print-ins-drth').prop("disabled", false);
	$('#btn-confrim-ins-drth').prop("disabled", false);
	$('#btn-canel-insr-drth').prop("disabled", false);
}


$('#carirv-insr').click(function(){
	validasiInsr();
	$('#rvno-insr-drth').prop("disabled", false);
	$('#btn-carirv-insr-drth').show()
	$('#rvno-insr-drth').val('');
	$('#content-ins-drth').prop('hidden', true);
	$('#slc-clasfun-drth').val('- SILAHKAN PILIH -');
	getBankInsurance();
	getMaskapai();
})

$('#createrv-insr').click(function(){
	validasiInsr();
	$('#slc-mas-insr').prop("disabled", false);
	$('#slc-bank-insr').prop("disabled", false);
	$('#slc-clasfun-drth').prop("disabled", false);
	$('#btn-createrv-insr-drth').show();
	$('#rvno-insr-drth').val('');
	$('#content-ins-drth').prop('hidden', true);
	$('#slc-clasfun-drth').val('- SILAHKAN PILIH -');
	getBankInsurance();
	getMaskapai();
})

// function validateDays() {
// 	if (document.getElementById('carirv-insr').checked) {
// 		$('#slc-mas-insr').change(function(){
// 			getRvClaimFun();
// 		})
// 	}
// }

//==============================================RV INSURANCE==============================================\\
//==============================================MASKAPAI==============================================\\
var table_insurance = $('#table-ins-trade-ho').DataTable({
	'scrollY':        "200px",
	'scrollCollapse': true,
	'paging':         false,
	"columnDefs": [
	{
		'bSortable': true,
		"targets": [6],
		"visible": false,
		"responsive": true,
	}
	]
}); 

function getMaskapai(){
	$.ajax({
		url: base_url+'Controller_draft_received_trade_ho/getMaskapai',
		type: 'POST',
		success: function(response){
			var data = JSON.parse(response);
			if(JSON.stringify(response).includes('Timeout')){
				alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
			} else if(response){
				try{
					$('#slc-mas-insr').empty();
					console.log('masuk');
					$('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('#slc-mas-insr').addClass('form-control');

					for (var i = 0; i < data['data'].length; i++) {
						$('#slc-mas-insr').append('<option value="'+ data['data'][i].insr_id +'">'+data['data'][i].insr_id+'-'+data['data'][i].insr_name + '</option>');
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

//==============================================RV INSURANCE==============================================\\
//==============================================BANK==============================================\\

function getBankInsurance(){
	var bank = $('#slc-bank-insr').val();
	$.ajax({
		url: base_url+'Controller_draft_received_trade_ho/get_list_bank',
		type: 'POST',
		success: function(response){
			var data = JSON.parse(response);
			if(JSON.stringify(response).includes('Timeout')){
				alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
			} else if(response){
				try{
					$('#slc-bank-insr').empty();
					console.log('masuk');
					$('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('#slc-bank-insr').addClass('form-control');

					for (var i = 0; i < data['data'].length; i++) {
						$('#slc-bank-insr').append('<option value="'+ data['data'][i].bankCode +'">'+data['data'][i].bankCode+'-'+data['data'][i].bankName + '</option>');
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

//==============================================RV INSURANCE==============================================\\
//==============================================GET CONTFUN==============================================\\

var totalfun = $('#inp-total-refund-drth').val();
var tmp1 = [];

$('#btn-createrv-insr-drth').click(function(){
	$('#content-ins-drth').prop('hidden', true);
	$('tfoot tr th input#inp-total-refund-drth').val('');
	var classcodeinsr = $('#slc-clasfun-drth').val();
	var maskapai = $('#slc-mas-insr').val();
	var bank = $('#slc-bank-insr').val();

	if(classcodeinsr == "- SILAHKAN PILIH -"){
		alert_info("Silahkan Pilih Class Code");
		return false;
	} else if(maskapai == ""){
		alert_info("Silahkan Pilih Maskapai");
		return false;
	} else if(bank == ""){
		alert_info("Silahkan Pilih Bank");
		return false;
	}

	if(classcodeinsr == "T-AL.KL.AS"){
		getConClaim()
	}else if(classcodeinsr == "T-AL.R.AS"){
		getConFun();
	}
	
	$('#btn-print-ins-drth').prop("disabled", true);
	$('#btn-confrim-ins-drth').prop("disabled", true);
	$('#btn-canel-insr-drth').prop("disabled", true);
})

function getConFun(){
	var insrcode = $('#slc-mas-insr').val();

	if (check_session() === 'true') {
		$.ajax({
			url: base_url+'Controller_draft_received_trade_ho/getContFun',
			type: 'POST',
			data : {
				insrcode:insrcode
			},
			success: function(response){
				response = $.parseJSON(response);
				console.log(response);
				if (response){
					try{
						var status = response['status'];
						if(status) {
							if (response['data'] < 1) {
								alert_error('Data tidak ditemukan !');
								return false;
							}else{
								table_insurance.clear().draw();
								$('#content-ins-drth').removeProp('hidden');
								tmp1=[];
								for (var i = 0 ; i < response['data'].length; i++) {

									table_insurance.row.add([
										'<input type="checkbox" class="funclas" id="chk-all-tabel-drth'+i+'" width="100%">',
										response['data'][i].contno,
										response['data'][i].custname,
										response['data'][i].amount,
										response['data'][i].conid

										]).draw(false);

									tmp1.push( response['data'][i].amount);
								}
                                // getTotalFun();
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
            },error: function() {
            	console.log(response);
            	alert_error('Jaringan terputus, Silahkan coba lagi !');
            }
        });
	}else{
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
}

var tot = 0;
$('#table-ins-trade-ho tbody').on('click', function(){
	if($('#carirv-insr').prop('checked')==false){
		jumlahtot();
	}

});

function jumlahtot(){
	tot =0;
	var flag = true;
	for (var i = 0; i < table_insurance.data().length; i++) {

		if ($('#chk-all-tabel-drth'+i).is(":checked")) {    
			flag=false;
			if(tmp1[i] == null || tmp1[i]=="")
			{
				tmp1[i]=0;
			}
			var not_fee = tmp1[i];
			not_fee = accounting.unformat(not_fee);
			console.log(not_fee);
			tot = tot + parseInt(not_fee);
			console.log(tot);
			$('tfoot tr th input#inp-total-refund-drth').val(accounting.formatMoney(tot, 'Rp', 2, ',', '.'));
			$('#inp-total-refund2-drth').val(tot);
		}
	}
	if(flag){
		$('tfoot tr th input#inp-total-refund-drth').val('')
	}
}

$('#chk-all-tabel-drth').click(function(){
	var tot = 0;
	for (var i = 0; i < table_insurance.data().length; i++) {

		if ($('#chk-all-tabel-drth').is(":checked")) {
			$('.funclas').prop('checked', true);

			var not_fee = accounting.unformat(table_insurance.rows().data()[i][3]);
      //var not_fee = fees[i];
      console.log(not_fee);
      tot += parseInt(not_fee);
      console.log(tot);
      
  }else{
  	$('.funclas').prop('checked', false);

  }
  if (i+1 === table_insurance.data().length) {
  	$('#inp-total-refund-drth').val(tot);


  }
}
});

$('#table-ins-trade-ho').on( 'click', '.funclas', function () {
	if($('input:checkbox:checked', table_insurance[0]).not("#chk-all-tabel-drth").length == table_insurance.data().length ){
		$("#chk-all-tabel-drth").prop("checked",true);
	} else {
		$("#chk-all-tabel-drth").prop("checked",false);
	}
});


//==============================================RV INSURANCE==============================================\\
//==============================================SAVE RV==============================================\\


function save_refund_drth(){
	var pages_insr = table_insurance.page();
	var limits_insr = table_insurance.page.len();
	var table_leng_insr = table_insurance.rows().data().length ;
	var search  = table_insurance.search();
	table_insurance.search("");
	table_insurance.page.len(table_leng_insr);
	table_insurance.draw();

	var tabel_data = table_insurance.data();
	console.log(tabel_data);
	var list_contno = [];
	var list_amount = [];
	var list_amtclm = [];
	var list_contid = [];
	var length_data = tabel_data.length;
	var kontrak_sukses = 0;
	var kontrak_gagal = 0;
	var tamount = $('#inp-total-refund2-drth').val();
	var str = $('#slc-mas-insr option:selected').text();
	var maskapai = str.substring(str.indexOf("-")+1, str.length);
	var codemas = $('#slc-mas-insr').val();
	var bankid = $('#slc-bank-insr').val();
	var classcode = $('#slc-clasfun-drth').val();
	var check_length = $('#table-ins-trade-ho').find('.funclas').filter(':checked').length;

	if(check_length === 0) {
		alert_warning('Pilih data yang akan dibuat RV !');
	}else{
		for (var i = 0; i < length_data; i++) {
			if ($('#chk-all-tabel-drth'+i).is(':checked')) {
				kontrak_sukses = kontrak_sukses + 1;

				var test = accounting.unformat($('#amt-claim-drth'+i).val());
				if(test == ""){
					alert_info('Silahkan Isi Data yang Lengkap!')
					return false;
				}

				var classcodeinsr = $('#slc-clasfun-drth').val();

				if(classcodeinsr == "T-AL.KL.AS"){
					list_amount.push(accounting.unformat($('#amt-claim-drth'+i).val()));
				}else if(classcodeinsr == "T-AL.R.AS"){
					list_amount.push(tabel_data[i][5]);
				}

				list_contno.push(tabel_data[i][3]);

				list_contid.push(tabel_data[i][6]);

			}else{
				kontrak_gagal = kontrak_gagal + 1;
			}
		}
		console.log(list_contno);
		$.ajax({
			url: base_url + 'Controller_draft_received_trade_ho/saveDataFun',
			type: 'POST',
			dataType: 'json',
			data:
			{
				"contno" : list_contno,
				"amount" : list_amount,
				"conid" : list_contid,
				"amtclm" : list_amtclm,
				"classcode" : classcode,
				"tamount" : tamount,
				"maskapai" : maskapai,
				"codemas" : codemas,
				"bankid" : bankid
			},
			async: false,
			success: function(response) {
				console.log(response);
				if (response) {
					try{ 
						result = $.parseJSON(response);
						if(!result['error']){
							var status = result['no_rv']       
							alert_info('Data Berhasil Disimpan Dengan No RV '+status+'', function(){
								$('#carirv-insr').click();
								$('#rvno-insr-drth').val(status);
								$('#btn-carirv-insr-drth').click();
							});
						}else{
							alert_error('Data Gagal Disimpan')
						}

					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi kesalahan error => " + e);
					}
				}        
			},
			error: function(response) {
				console.log(response);
				alert_error(response);
			}
		});
	}
}

$('#btn-save-ins-drth').click(function(){
	alert_confirm('Apakah Anda Yakin Untuk Save No RV?',function(){
		save_refund_drth();
	});
});

//==============================================RV INSURANCE==============================================\\
//==============================================GET CONTCLAIM==============================================\\

function getConClaim(){
	var insrcode = $('#slc-mas-insr').val();

	if (check_session() === 'true') {
		$.ajax({
			url: base_url+'Controller_draft_received_trade_ho/getContClaim',
			type: 'POST',
			data : {
				insrcode:insrcode
			},
			success: function(response){
				response = $.parseJSON(response);
				console.log(response);
				if (response){
					try{
						var status = response['status'];
						if(status) {
							if (response['data'].length < 1) {
								alert_error('Data tidak ditemukan !');
								return false;
							}else{
								table_insurance.clear().draw();
								$('#content-ins-drth').removeProp('hidden');
								tmp1=[];
								var tmpclaim = [];
								for (var i = 0 ; i < response['data'].length; i++) {

									tmpclaim.push([
										'<input type="checkbox" class="funclas" id="chk-all-tabel-drth'+i+'" width="100%">',
										response['data'][i].branch,
										response['data'][i].branchname,
										response['data'][i].contno,
										response['data'][i].custname,
										'<input type="text" class="funclass inp-number2" id="amt-claim-drth'+i+'" onblur="pushToTmp1('+i+'), jumlahtot(), formatmoney(\'amt-claim-drth'+i+'\')" onfocus="unformatmoney(\'amt-claim-drth'+i+'\')" width="100%" maxlength="11">',
										response['data'][i].conid
										]);

									tmp1.push($('#amt-claim-drth'+i).val());
								}
								table_insurance.rows.add(tmpclaim).draw(false);
								$.each(role_rvho, function(i){
									console.log(role_rvho[i]['role_code']);
									if(role_rvho[i]['role_code'] === 'CREATE_RVHO' || role_rvho[i]['role_code'] === 'APP_ADM_AM') {
										$('.funclass').prop('disabled', false);
										roll = false;
									}else if(roll){
										$('.funclass').prop('disabled', true);
									}
								});

							}
						}else{
							alert_error(response['errorConsole']);
						}

						$('.inp-number2').on('keydown', function(e) {
							-1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) 
							&& (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode 
							&& 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) 
							&& (96 > e.keyCode || 105 < e.keyCode)
							&& e.preventDefault()
						});
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
				alert_error('Jaringan terputus, Silahkan coba lagi !');
			}
		});
	}else{
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
}

function pushToTmp1(ids){

	tmp1[ids] = $('#amt-claim-drth'+ids).val();

}

//==============================================RV INSURANCE==============================================\\
//==============================================SARCH RV==============================================\\
var print = [];
var amount1=[];
function getCariRvInsr(){
	var insrcode = $('#slc-mas-insr').val();
	var rvno = $('#rvno-insr-drth').val().toUpperCase();

	if (check_session() === 'true') {
		amount1=[];
		$.ajax({
			url: base_url+'Controller_draft_received_trade_ho/getCariRvInsr',
			type: 'POST',
			data : {
				rvno:rvno
			},
			success: function(response){
				response = $.parseJSON(response);
				console.log(response);
				if (response){
					try{
						var status = response['status'];
						var tanda = response['flag'];
						if(status) {
							if (response['data'] == null) {
								alert_error('Data tidak ditemukan !');
							}else{

								if(tanda == 400){
									alert_info('No RV Telah di Cancel Sebelumnya!');
									return false;
								}else if(response['data'] == ""){
									alert_info('Data Tidak Ditemukan');
									return false;
								}

								table_insurance.clear().draw();
								print = [];
								$('#content-ins-drth').removeProp('hidden');
								for (var i = 0 ; i < response['data'].length; i++) {
									$('#slc-bank-insr').val(response['data'][i].bankid);
									$('#slc-clasfun-drth').val(response['data'][i].classcode);
									var sys = response['data'][i].rvdate;
									var systtd = sys.replace(/-/g,'/');

									print.push([
										'<input type="checkbox" class="funclas" id="chk-all-tabel-drth'+i+'" width="100%" disabled checked="true">',
										response['data'][i].branch,
										response['data'][i].branchname,
										response['data'][i].contno,
										response['data'][i].custname,
										accounting.formatMoney(response['data'][i].amount, 'Rp.',2 , ',', '.'),
										response['data'][i].amount,
										response['data'][i].conid,
										response['data'][i].maskapai,
										accounting.formatMoney(response['data'][i].tamount, 'Rp.',2 , ',', '.'),
										response['data'][i].rvno,
										response['data'][i].classcode,
										systtd,
										response['sysDate'],
										response['data'][i].fullname,
										])
									amount1.push({amount : response['data'][i].amount});
									$('#slc-mas-insr').val(response['data'][i].codemas);
									$('#chk-all-tabel-drth').prop('checked', true);
									$('#chk-all-tabel-drth').prop('disabled', true);
								}
								table_insurance.rows.add(print).draw(false);
								getTotalInsr();

								if(tanda == 300){
									$('#btn-confrim-ins-drth').prop('disabled', true);
									$('#btn-canel-insr-drth').prop('disabled', true);
									$('#btn-print-ins-drth').prop('disabled', false);
									alert_info('No RV Telah di Confrim Sebelumnya')
									return false;
								}
								$.each(role_rvho, function(i){
									console.log(role_rvho[i]['role_code']);
									if(role_create == true && role_confirm == true) {
										$('#btn-confrim-ins-drth').prop('disabled', false);
										$('#btn-canel-insr-drth').prop('disabled', false);
										$('#btn-print-ins-drth').prop('disabled', false);
										return false;
									}else if(role_confirm == true){
										$('#btn-confrim-ins-drth').prop('disabled', false);
										$('#btn-canel-insr-drth').prop('disabled', true);
										$('#btn-print-ins-drth').prop('disabled', false);
										return false;
									}else{
										$('#btn-confrim-ins-drth').prop('disabled', true);
									}
								});
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
			},error: function() {
				console.log(response);
				alert_error('Jaringan terputus, Silahkan coba lagi !');
			}
		});
	}else{
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
}

$('#btn-carirv-insr-drth').click(function(){
	var maskapai = $('#slc-mas-insr').val();
	var rvno = $('#rvno-insr-drth').val();
	if(rvno == ""){
		alert_info("Silahkan Isi No RV");
		return false;
	}

	getCariRvInsr();

	$('#btn-save-ins-drth').prop("disabled", true);
})

function getTotalInsr(){
	var total = 0;
	var jumbaris = table_insurance.rows().data();
	for (var i = 0; i < amount1.length; i++) {
		total = Number(total) + Number(amount1[i].amount);
	}
	$('tfoot tr th input#inp-total-refund-drth').val(accounting.formatMoney(total,'Rp',2,',','.'));
}

//=============================================RV INSURANCE==============================================\\
//==============================================CONFRIM RV==============================================\\


$('#btn-confrim-ins-drth').click(function(){
	alert_confirm('Apakah Anda Yakin Untuk Mengconfrim RV?',function(){
		getConfrimInsr();
	});
});

var collstatus = [];
function getConfrimInsr(){
	var rvno = $('#rvno-insr-drth').val();
	collstatus = [];
	for(var i = 0; i < table_insurance.data().length; i++) {
		collstatus.push({'ajk' : table_insurance.data()[i][3]})
	}

	if (check_session() === 'true') {
		$.ajax({
			url: base_url+'Controller_draft_received_trade_ho/getConfrimInsr',
			type: 'POST',
			dataType: 'json',
			data : {
				rvno:rvno,
				collstatus:collstatus
			},
			success: function(response){
				console.log(response);
				if (response){
					try{
						var status = response['status'];
						var ok = response['ok'];
						if(status) {
							if(ok !== '500') {
								var str = "";
								for(var i = 0 ; i< response['data'].length ; i++){
									str = str + response['data'][i].contno + " dengan status BPKB " + response['data'][i].coll_status + "<br/>"
								}
								alert_refresh('Berhasil Confrim RV! <br/>' +str);
							} else {
								alert_error('Gagal Konfirmasi RV: '+response['alert']);
							}
					}else{
						alert_error('Gagal Konfirmasi RV dengan error'+response['errorConsole']);
					}
				}catch(e){
					$('#loading-ajax').hide();
					console.log(e);
					var error = response['error']
					if(error == undefined){
						error = 'Pada Service CMS/CCS'
					}
					alert_error("Terjadi Kesalahan => "+error);
				}
			}else{
				alert_error(response);
			}
		},error: function() {
			console.log(response);
			alert_error('Jaringan terputus, Silahkan coba lagi !');
		}
	});
	}else{
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
}

//=============================================RV INSURANCE==============================================\\
//==============================================Cancel RV==============================================\\

$('#btn-canel-insr-drth').click(function(){
	var rvno = $('#rvno-insr-drth').val();
	alert_confirm('Apakah Anda Yakin Untuk Mengcancel RV?',function(){
		getCancelRv(rvno);
	});
});

//=============================================RV INSURANCE==============================================\\
//==============================================Print RV==============================================\\
function print_csv(array){
	if (check_session() === 'true') {
		$.ajax({
			url: base_url + "Controller_draft_received_trade_ho/read_csv1",
			dataType: 'text',
			type: 'POST',
			data:{array},
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
                    downloadLink.download = 'RV INSURANCE.csv';
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

$('#btn-print-ins-drth').click(function(){
	if (check_session() === 'true') {
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

		var tab_text="RV INSURANCE CLAIM <table>";
		var textRange; var j=0;

		var ss = $('#head-login').html();


        // var tab = document.getElementById('print');

        // for(j = 0 ; j < tab.rows.length ; j++) 
        // {     
        //     tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
        // }

        var artest = ["RV No", "Class Code", "RV Date", "Total Rv Amount"];
        var did = [print[0][10],print[0][11],print[0][12],print[0][9]]
        for(var i = 0; i < artest.length; i++) {
        	tab_text = tab_text + "<tr><td>"+artest[i]+"</td><td>:"+did[i]+"</td></tr>" ;
        }

        tab_text = tab_text + "</table><br/><table border='2px'>" +
        "<tr bgcolor='#87AFC6'>"+
        "<td>Branch Code</td>"+
        "<td>Branch Name</td>"+
        "<td>Maskapai</td>"+
        "<td>Contract No</td>"+
        "<td>Customer Name</td>"+
        "<td>Sold Price</td>"+
        "</tr>";
        for(var j = 0; j < print.length; j++){
        	tab_text = tab_text +
        	"<tr>"+
        	"<td>&nbsp;"+print[j][1]+"</td>"+
        	"<td>"+print[j][2]+"</td>"+
        	"<td>"+print[j][8]+"</td>"+
        	"<td>&nbsp;"+print[j][3]+"</td>"+
        	"<td>"+print[j][4]+"</td>"+
        	"<td>"+print[j][5]+"</td>"+
        	"</tr>";
        }	

        tab_text = tab_text + "</table><br/><table>" +
        "<tr>"+
        "<td></td>"+
        "<td></td>"+
        "<td></td>"+
        "<td></td>"+
        "<td colspan='2'>HEAD OFFICE, "+print[0][13]+"</td>"+
        "</tr>"+
        "<tr>"+
        "<td colspan='2'>Dibuat oleh</td>"+
        "<td colspan='2'>Disetujui</td>"+
        "<td colspan='2'>Mengetahui</td>"+
        "</tr>" +
        "<tr>"+
        "<td colspan='2'></td>"+
        "<td colspan='2'></td>"+
        "<td colspan='2'></td>"+
        "</tr>" +
        "<tr>"+
        "<td colspan='2'></td>"+
        "<td colspan='2'></td>"+
        "<td colspan='2'></td>"+
        "</tr>"+
        "<tr>"+
        "<td colspan='2'></td>"+
        "<td colspan='2'></td>"+
        "<td colspan='2'></td>"+
        "</tr>"+
        "<tr>"+
        "<td colspan='2'>"+print[0][14]+"</td>"+ //+ss.trim()+
        "<td colspan='2'>(Section Head)</td>"+
        "<td colspan='2'>(Finance Dept Head)</td>"+
        "</tr>"

        var ctx = {
        	worksheet : 'Worksheet',
        	table : tab_text
        }

        var link = document.createElement("a");
        link.download = "RV INSURANCE.xls";
        link.href = uri + base64(format(template, ctx));
        link.click();
    }else{
    	alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
    		localStorage.clear();
    		window.location.href = base_url + "Controller_login/login_view";
    	});
    }
});

//amt-claim-drth0
function formatmoney(id){
	var angka = $('#'+id).val();
	$('#'+id).val(accounting.formatMoney(angka, '', 2, ',', '.'));
}

function unformatmoney(id){
	var angka = $('#'+id).val();
	if(angka != ""){
		$('#'+id).val(accounting.unformat(angka, '', 2, ',', '.'));
	}
}


// $('#uang-bayar-preterm').change(function() {
//     bayar = $('#uang-bayar-preterm').val();
//     total_bayar = $('#tot-bayarkan-preterm').val();
//     bayar_preterm = accounting.unformat(bayar);
//     tot_bayar = accounting.unformat(total_bayar);
//     console.log(parseFloat(bayar_preterm));
//     console.log(parseFloat(tot_bayar));

//     var selisih = bayar_preterm - parseFloat(tot_bayar);
//     console.log(selisih);
//     $('#selisih-preterm').val(accounting.formatMoney(selisih, '', 2, ',', '.'));

// });

//==============================================BIDDING==============================================\\

var table_bidding = $('#table-bid-trade-ho').DataTable();

//DATE FROM\\
$('.tgl-bid-drth').datetimepicker({
	format: 'DD-MMM-YYYY',
	allowInputToggle: true,
	maxDate: new Date().format('DD-MMM-YYYY')
})

function validasiBid(){
	$('#inp-tglbid-from-drth').prop('disabled', true);
	$('#inp-tglbid-to-drth').prop('disabled', true);
	$('#inp-norv-bid').prop('disabled', true);
	$('#slc-bank-bid').prop('disabled', true);
	$('#btn-carirv-bid-drth').prop('disabled', true);
	$('#btn-buatrv-bid-drth').prop('disabled', true);
}

$('#createrv-bid').click(function(){
	validasiBid();
	$('#inp-tglbid-from-drth').prop('disabled', false);
	$('#inp-tglbid-to-drth').prop('disabled', false);
	$('#inp-norv-bid').prop('disabled', true);
	$('#slc-bank-bid').prop('disabled', false);
	$('#btn-buatrv-bid-drth').prop('disabled', false);
	getBankBid();
})

$('#carirv-bid').click(function(){
	validasiBid()
	$('#inp-tglbid-from-drth').prop('disabled', true);
	$('#inp-tglbid-to-drth').prop('disabled', true);
	$('#inp-norv-bid').prop('disabled', false);
	$('#slc-bank-bid').prop('disabled', true);
	$('#btn-carirv-bid-drth').prop('disabled', false);
	getBankBid();
})

//==============================================GETBANK==============================================\\

function getBankBid(){
	var bank = $('#slc-bank-insr').val();
	$.ajax({
		url: base_url+'Controller_draft_received_trade_ho/get_list_bank',
		type: 'POST',
		success: function(response){
			var data = JSON.parse(response);
			if(JSON.stringify(response).includes('Timeout')){
				alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
			} else if(response){
				try{
					$('#slc-bank-bid').empty();
					console.log('masuk');
					$('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('#slc-bank-bid').addClass('form-control');

					for (var i = 0; i < data['data'].length; i++) {
						$('#slc-bank-bid').append('<option value="'+ data['data'][i].bankCode +'">'+data['data'][i].bankCode+'-'+data['data'][i].bankName + '</option>');
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

//==============================================BUAT RV==============================================\\

$('#btn-buatrv-bid-drth').click(function(){
	var datesrc = $('#inp-tglbid-from-drth').val();
	var datedsc = $('#inp-tglbid-to-drth').val();
	var bank = $('#slc-bank-bid').val();

	if (datesrc == ""){
		alert_info('Masukan Date From');
		return false;
	}else if(datedsc == ""){
		alert_info('Masukan Date From');
		return false;
	}else if(bank == ""){
		alert_info('Silahkan Pilih Bank');
		return false;
	}
	getContBidding();
	$('#content-bid-drth').removeProp('hidden');
	$('#btn-print-bid-drth').prop('disabled', true);
	$('#btn-confrim-bid-drth').prop('disabled', true);
	$('#btn-cancelbid-drth').prop('disabled', true);
});

function getContBidding(){
	var datesrc = $('#inp-tglbid-from-drth').val();
	var datedsc = $('#inp-tglbid-to-drth').val();

	if (check_session() === 'true') {
		$.ajax({
			url: base_url +'Controller_draft_received_trade_ho/contBidding',
			type: 'POST',
			data:{
				datesrc : datesrc,
				datedsc : datedsc,
			},
			success: function(response){
				response = $.parseJSON(response);
				console.log(response);
				if (response){
					try{
						var status = response['status'];
						if (status == false) {
							alert_error('Data Not Found');
						}else{
							table_nontrade.clear().draw();
							for (var i = 0 ; i < response['data'].length; i++) {
								table_bidding.row.add([
									'<input type="checkbox" class="bidclass" id="chk-tabelbid-drth'+i+'" width="100%">',
									response['data'][i].branchid,
									response['data'][i].branchname,
									response['data'][i].fpdno,
									'',
									'',
									''
									]).draw(false);
							}
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
						$('#content-bid-drth').prop('hidden', true);
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

//==================================================================================================\\
//==============================================CARI RV==============================================\\

//VALIDASI\\
$('#btn-carirv-bid-drth').click(function(){
	var rvno = $('#inp-norv-bid').val();


	if(rvno == ""){
		alert_info('Silahkan Isi RV No')
		return false;
	}

	getCariBidding();
	$('#content-bid-drth').removeProp('hidden');
});

function getCariBidding(){

	var rvno = $('#inp-norv-bid').val();

	if (check_session() === 'true') {
		$.ajax({
			url: base_url +'Controller_draft_received_trade_ho/cariBidding',
			type: 'POST',
			data:{
				rvno : rvno,
			},
			success: function(response){
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
								alert_info('No RV Telah Di Receive Sebelumnya');
								return false;
							}else if(flag == 400){
								alert_error('No RV Telah Di Cancel Sebelumnya');
								return false;
							}
							table_nontrade.clear().draw();
							for (var i = 0 ; i < response['data'].length; i++) {
								table_bidding.row.add([
									'<input type="checkbox" class="bidclass" id="chk-tabelbid-drth'+i+'" width="100%" disabled>',
									response['data'][i].branchid,
									response['data'][i].branchname,
									response['data'][i].fpdno,
									'',
									'',
									''
									]).draw(false);
								$('#slc-bank-bid').val(response['data'][i].bankid)
							}
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
						$('#content-bid-drth').prop('hidden', true);
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

var role_rvho;
if (!localStorage.getItem('role_user_rvho')) {
	$.ajax({
		url : "Controller_home/get_detail_user",
		cache : false,
		success : function(response){
			if(response){
				try{
					console.log(response);
					localStorage.setItem('role_user_rvho', response);
					role_rvho = $.parseJSON(localStorage.getItem('role_user_rvho'));
					console.log(role_rvho);
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
	role_rvho = $.parseJSON(localStorage.getItem('role_user_rvho'));
	console.log(role_rvho);
}

var roll = true;
