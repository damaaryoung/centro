var tabel_detail_bulk_payment   = $('#table-detail-bulk-payment-branch').DataTable({
	"columnDefs": [
	{
		"targets": [ 8,9 ],
		"visible": false,
		"responsive": true,    
	}

	]
});


var tabel_pengajuan_bulk_cusgrup = $('#tabel-pengajuan-bulk-cusgrup').DataTable({
});

var tabel_pengajuan_bulk = $('#tabel-pengajuan-bulk-payment-branch').DataTable({
	"columnDefs": [
	{
		"targets": [ 4 ],
		"visible": false,
		"responsive": true,    
	}

	]

});

var tabel_pengajuan_bulkBranch = $('#tabel-pengajuan-bulk-branch').DataTable({
	"columnDefs": [
	{
		"responsive": true   
	}

	]

});



if (localStorage.getItem('menu_alias_am') === 'BPT') {
	getRole();
	arr_tbl = null;
	$('#btn-save-bulk-payment-branch').attr('disabled',true);
	$('input[name=no-numeric]').hide();
	$('input[name=no-alphabet]').hide();
	jQuery.fn.dataTable.Api.register( 'sum()', function ( ) {
		return this.flatten().reduce( function ( a, b ) {
			if ( typeof a === 'string' ) {
				a = a.replace(/[^\d.-]/g, '') * 1;
			}
			if ( typeof b === 'string' ) {
				b = b.replace(/[^\d.-]/g, '') * 1;
			}

			return a + b;
		}, 0 );
	} );


	// validasi role bulkpayment dan rv_collector

	if (localStorage.getItem('role') == 'true' && localStorage.getItem('role_rv_colllector') == 'true' ) {

	}else if(localStorage.getItem('role') == 'true' && localStorage.getItem('role_rv_colllector') == 'false' ){
		$('#btn-tab-bulk').click();
		$('#btn-tab-rv_collector').hide();
		$('#rvcollector').hide();
	}else if(localStorage.getItem('role') == 'false' && localStorage.getItem('role_rv_colllector') == 'true' )
	{
		$('#btn-tab-rv_collector').click();
		$('#btn-tab-bulk').hide();
		$('#bulkpayment').hide();
	}else{
		$('#btn-tab-rv_collector').hide();
		$('#rvcollector').hide();
		$('#btn-tab-bulk').hide();
		$('#bulkpayment').hide();
	}





	var nominal = [];
	$('#table-detail-bulk-payment-branch tbody').on('click', '.check-bp', function() {


		var pages = tabel_detail_bulk_payment.page();
		var limits = tabel_detail_bulk_payment.page.len();
		var table_leng = tabel_detail_bulk_payment.rows().data().length ;
		tabel_detail_bulk_payment.page.len(table_leng);
		tabel_detail_bulk_payment.draw();
		var tot = 0;
		var tot_kons = 0;

		for (var i = 0; i < tabel_detail_bulk_payment.data().length; i++) {
			if ($('#check-tbl-dtl-bp' + i).is(":checked")) {
				var tot_nominal = nominal[i];
				tot = tot + parseInt(tot_nominal);
			}
			if (i + 1 === tabel_detail_bulk_payment.data().length) {
				$('tfoot td input#td-total-amount-bp').val(accounting.formatMoney(tot, 'Rp ', 2, ',', '.'));
			}
		}

		tabel_detail_bulk_payment.page.len(limits);
		tabel_detail_bulk_payment.draw();
		tabel_detail_bulk_payment.page( pages ).draw( 'page' );
	});


	$('input[name=radioBulk]').on('change',function(){
		if ($('input[name=radioBulk]:checked').val() === 'nama') {

			$('input[name=alphabet-no]').val('');
			$('input[name=alphabet-no]').show();
			$('input[name=no-alphabet]').hide();
			$('input[name=no-numeric]').hide();
			$('input[name=no-numeric]').prop('id','');
			$('input[name=alphabet-no]').prop('id','id-customer-bulk-payment-branch');
			$('input[name=no-alphabet]').prop('id','');
			$('#id-noPengajuan-bulk-payment-branch').prop('disabled', true);
			$('#id-noPengajuan-bulk-payment-branch').removeAttr('placeholder');
			$('#id-customer-bulk-payment-branch').prop('disabled', false);
			$('#id-customer-bulk-payment-branch').attr('placeholder','Nama Customer');
		}else if($('input[name=radioBulk]:checked').val() === 'no')
		{	
			$('input[name=alphabet-no]').val('');	
			$('input[name=alphabet-no]').hide();
			$('input[name=alphabet-no]').prop('id','');
			$('input[name=no-alphabet]').val('');
			$('input[name=no-numeric]').hide();
			$('input[name=no-alphabet]').show();
			$('input[name=no-alphabet]').prop('id','id-customer-bulk-payment-branch');
			$('input[name=no-numeric]').prop('id','');
			$('#id-noPengajuan-bulk-payment-branch').removeAttr('placeholder');
			$('#id-customer-bulk-payment-branch').prop('disabled',false);
			$('#id-noPengajuan-bulk-payment-branch').prop('disabled',true);
			$('#id-customer-bulk-payment-branch').attr('placeholder','No Customer');

		}else{
			$('input[name=alphabet-no]').val('');
			$('input[name=alphabet-no]').show();
			$('input[name=no-alphabet]').hide();
			$('input[name=no-numeric]').hide();
			$('input[name=no-numeric]').prop('id','');
			$('input[name=alphabet-no]').prop('id','id-customer-bulk-payment-branch');
			$('input[name=no-alphabet]').prop('id','');
			$('#id-customer-bulk-payment-branch').removeClass('inp-number');
			$('#id-noPengajuan-bulk-payment-branch').removeAttr('placeholder');
			$('#id-customer-bulk-payment-branch').prop('disabled',false);
			$('#id-noPengajuan-bulk-payment-branch').prop('disabled',true);
			$('#id-customer-bulk-payment-branch').attr('placeholder','Customer Group Id');
		}
	});

	$('#btn-search-bp').click(function(){			
		getBulkByBranch();
	});
	$('#filter-bulk-payment-branch').click(function()
	{	
		var vCustomer = $('#id-customer-bulk-payment-branch').val();
		if (vCustomer === '') {
			alert_warning('Kata kunci tidak boleh kosong!!');
			$('#div-rb-bp-branch').addClass('has-error');
			return false;
		}else if (vCustomer.length < 4 ) {
			alert_warning('Mohon isi dengan 4 Digit atau lebih agar mempermudah pencarian');
			$('#div-rb-bp-branch').addClass('has-error');
			return false;
		}else{
			$('#div-rb-bp-branch').removeClass('has-error');
		}

		if ($('input[name=radioBulk]:checked').val() === 'nama') {
			$('#div-rb-bp-branch').removeClass('has-error');
			getBulkByName(vCustomer.toUpperCase());
		}
		else if($('input[name=radioBulk]:checked').val() === 'no')
		{
			$('#div-rb-bp-branch').removeClass('has-error');
			getBulkByNo(vCustomer.toUpperCase());
		}else if($('input[name=radioBulk]:checked').val() === 'cgi'){
			$('#div-rb-bp-branch').removeClass('has-error');

			localStorage.setItem('customer_group_id',vCustomer.toUpperCase());
			getBulkByCGI(vCustomer.toUpperCase());
		}

		console.log('search');
	});
	var total_ceklist = $('.check-bp:checked').not('#check-tbl-dtl-bp').length;

	$('#table-detail-bulk-payment-branch tbody').on('click', '.check-bp', function() {
		// var total_ceklist2 = $('.check-bp:checked').not('#check-tbl-dtl-bp').length;
		// var idData = $(this).attr('idData');
		
		// if (this.checked == false) {

		// }else{
			
		// }
		// if (total_ceklist != total_ceklist2) {
		// 	$('#check-tbl-dtl-bp').prop('checked',false);
		// }
		// console.log(idData);
	});

	$('#table-detail-bulk-payment-branch tbody').on('click','.check-bp',function()
	{
		var total_ceklist2 = $('.check-bp:checked').not('#check-tbl-dtl-bp').length;
		var idData = $(this).attr('idData');
		if (total_ceklist != total_ceklist2) {
			$('#check-tbl-dtl-bp').prop('checked',false);
		}else{
			$('#check-tbl-dtl-bp').prop('checked',true);
		}
		console.log(idData);
	});

	$('#check-tbl-dtl-bp').click(
		function(){
			var pages = tabel_detail_bulk_payment.page();
			var limits = tabel_detail_bulk_payment.page.len();
			var table_leng = tabel_detail_bulk_payment.rows().data().length ;
			tabel_detail_bulk_payment.page.len(table_leng);
			tabel_detail_bulk_payment.draw();

			var tabel_data = tabel_detail_bulk_payment.data();
			var tot = 0;

			for (var i = 0; i < tabel_data.length; i++) {
				if ($('#check-tbl-dtl-bp').is(':checked')) {
					$(':checkbox').prop('checked', true);
					
				} else {
					$(':checkbox').prop('checked', false);
				}
				if (i + 1 === tabel_data.length) {
					$('tfoot td input#td-total-amount-bp').val(accounting.formatMoney(tot, 'Rp', 2, ',', '.'));
				}
			}

			for (var i = 0; i < $('.check-bp:checked').not('#check-tbl-dtl-bp').length; i++) {
				var nominal = accounting.unformat(tabel_data[i][7]);
				console.log(nominal);
				tot += parseInt(nominal);
				console.log(tot);
				if (i + 1 === $('.check-bp:checked').not('#check-tbl-dtl-bp').length) {
					$('tfoot td input#td-total-amount-bp').val(accounting.formatMoney(tot, 'Rp', 2, ',', '.'));
				}
			}

			tabel_detail_bulk_payment.page.len(limits);
			tabel_detail_bulk_payment.draw();
			tabel_detail_bulk_payment.page( pages ).draw( 'page' );
		});


	$('#btn-save-bulk-payment-branch').click(function()
	{
		if (check_session() === 'true') {
			getRole();
			var length = $('#table-detail-bulk-payment-branch').find('.check-bp').filter(':checked').not('#check-tbl-dtl-bp').length;
			var validasi = localStorage.getItem('role');

			if (validasi === 'false') {
				alert_warning('User tidak mempunyai role untuk Save Bulk Payment!!');
				return false;
			}else if (tabel_detail_bulk_payment.rows().flatten().length == 0) {

				alert_warning("Data Pengajuan Masih Kosong!!");
				return false;
			}else if(length === 0){
				alert_warning("ceklist salah satu data!!");
			}else{
				console.log('save');
				var  list_data = tabel_detail_bulk_payment.data();
				var customer_id =  $('#id-customer-no-customer-hidden').val();
				var vuser = $('#hdn-user-id-bp').val();
				var arrayData = []; 
				var arrayDataHeader = []; 
				var total_nominals = 0;

				var pages = tabel_detail_bulk_payment.page();
				var limits = tabel_detail_bulk_payment.page.len();
				var table_leng = tabel_detail_bulk_payment.rows().data().length ;
				var search  = tabel_detail_bulk_payment.search();

				tabel_detail_bulk_payment.search("");
				tabel_detail_bulk_payment.page.len(table_leng);
				tabel_detail_bulk_payment.draw();
				var customer_group_id="";
				if ($('input[name=radioBulk]:checked').val() === 'cgi') {
					customer_group_id =  cus_group_id;
					customer_id = 0;
				}else{
					customer_group_id =  "";
					customer_id = list_data[0][9];
				}
				var total_unit = $('.check-bp:checkbox:checked').not('#check-tbl-dtl-bp').length;
				var map = new Object();
				var map2 = new Object();

				for (var i = 0; i < list_data.length; i++) {	
					if ($('#check-tbl-dtl-bp'+i).is(":checked")) {
						arrayData.push({	
							contract_no : list_data[i][3],
							installment_no :list_data[i][6],
							nominal:accounting.unformat(list_data[i][7]),
							user:vuser,
							contract_id:list_data[i][8],
							customer_id: list_data[i][9]

						});
					}
				}
				// for (var i = 0; i < arrayData.length; i++) {

				// 	if (map [arrayData[i].customer_id] == null ) {

				// 		map [arrayData[i].customer_id] = Number(accounting.unformat(arrayData[i].nominal));
				// 		map2 [arrayData[i].customer_id] =  1;
				// 	}else{
				// 		map [arrayData[i].customer_id] +=  Number(accounting.unformat(arrayData[i].nominal));
				// 		map2 [arrayData[i].customer_id] +=  1;
				// 	}
				// }

				// for (var i = 0; i < arrayData.length; i++) {
				// 	if (map [arrayData[i].customer_id] == null ) {
				// 		continue;
				// 	}

				var total_nominals = accounting.unformat($('#td-total-amount-bp').val());
				var total_unit = $('.check-bp:checkbox:checked').not('#check-tbl-dtl-bp').length;
				arrayDataHeader.push({
					customer_id:customer_id,
					total_nominals,
					customer_group_id,
					total_unit
				});
					// map [arrayData[i].customer_id] = null;
					// map2 [arrayData[i].customer_id] = null;
				// }
				tabel_detail_bulk_payment.search(search);
				tabel_detail_bulk_payment.page.len(limits);
				tabel_detail_bulk_payment.draw();
				tabel_detail_bulk_payment.page( pages ).draw( 'page' );
				alert_confirm('APAKAH YAKIN INGIN SAVE ?',function(){
					insertPengajuanBulk(arrayData,arrayDataHeader);
				});
			}

		} else if (check_session() === 'false') {
			alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
				localStorage.clear();
				window.location.href = base_url + "Controller_login/login_view";
			});
		}


	});

	$('#btn-clear-bulk-payment-branch').click(function()
	{
		location.reload();
	});


//tabel list_pengajuan
///-------------TABEL KETIKA ROW DI DOBEL KLIK DATA SET KE INPUT
$('#tabel-pengajuan-bulk-branch tbody').on('click', 'tr', function() {
	if ($(this).hasClass('selected')) {
		//$(this).removeClass('selected');
		//arr_tbl = null;
	} else {
		tabel_pengajuan_bulkBranch.$('tr.selected').removeClass('selected');
		$(this).addClass('selected');
		arr_tbl = tabel_pengajuan_bulkBranch.row(this).data();
	}
});

///-------------TABEL KETIKA ROW DI DOBEL KLIK DATA SET KE INPUT
$('#tabel-pengajuan-bulk-cusgrup  tbody').on('click', 'tr', function() {
	if ($(this).hasClass('selected')) {

	} else {
		tabel_pengajuan_bulk_cusgrup.$('tr.selected').removeClass('selected');
		$(this).addClass('selected');
		arr_tbl = tabel_pengajuan_bulk_cusgrup.row(this).data();
	}
});

//tabel list_pengajuan
// ------------ DOBEL KLIK ROW
$('#tabel-pengajuan-bulk-branch tbody').on('dblclick', 'tr', function() {
	$('#btn-pilih-data-bulk-payment-branch1').click();
});

// ------------ DOBEL KLIK ROW
$('#tabel-pengajuan-bulk-cusgrup tbody').on('dblclick', 'tr', function() {
	$('#btn-pilih-data-bulk-payment-cusgrup').click();
});
var cus_group_id;
$('#btn-pilih-data-bulk-payment-cusgrup').on('click',function(){
	if (tabel_pengajuan_bulk_cusgrup.$('tr.selected').length > 0) {
		var index_space = arr_tbl[1].indexOf(' ');
		$('#id-customer-no-customer-hidden').val(arr_tbl[1].substring(0,index_space));
		var status = 1;
		cus_group_id = $('#id-customer-no-customer-hidden').val();
		getBulkDetail(cus_group_id,status);
	} else {
		alert_warning('Pilih salah satu data terlebih dahulu');
	}
	
});

$('#btn-pilih-pengajuan-bulk-payment-branch').on('click',function(){
	if (tabel_pengajuan_bulk.$('tr.selected').length > 0) {
		$('#id-customer-no-customer-hidden').val(arr_tbl[4]);
		var status = 0;
		var customer_id = $('#id-customer-no-customer-hidden').val();
		getBulkDetail(customer_id,status);
	} else {
		alert_warning('Pilih salah satu data terlebih dahulu');
	}

	
});

$('#btn-pilih-data-bulk-payment-branch1').on('click',function(){
	if (tabel_pengajuan_bulkBranch.$('tr.selected').length > 0) {
		$('#id-bulk-payment-hidden').val(arr_tbl[1]);
		$('#id-noPengajuan-bulk-payment-branch').val(arr_tbl[1]);
		var idbulk = $('#id-bulk-payment-hidden').val();
		getByIdBulk(idbulk);
	} else {
		alert_warning('Pilih salah satu data terlebih dahulu');
	}
	
});

///-------------TABEL KETIKA ROW DI DOBEL KLIK DATA SET KE INPUT
$('#tabel-pengajuan-bulk-payment-branch tbody').on('click', 'tr', function() {
	if ($(this).hasClass('selected')) {
	} else {
		tabel_pengajuan_bulk.$('tr.selected').removeClass('selected');
		$(this).addClass('selected');
		arr_tbl = tabel_pengajuan_bulk.row(this).data();
	}
});


// ------------ DOBEL KLIK ROW
$('#tabel-pengajuan-bulk-payment-branch tbody').on('dblclick', 'tr', function() {
	$('#btn-pilih-pengajuan-bulk-payment-branch').click();

});

//----------------------------------------------------------------------------------- function insert pengajuan bulk
function insertPengajuanBulk(Data,DataHeader){
	$.ajax({
		url:base_url+"Controller_bulk_payment/insert_pengajuan_bulk",
		type:'POST',
		data:{Data,DataHeader},
		success:function(response){
			console.log(response);
			var responseStringfly = JSON.stringify(response);
			try{
				var data = $.parseJSON(response);
				var data1 = $.parseJSON(data);

				if (data1['status'] == '200') {
					alert_info(data1['pesan']+' dengan nomor pengajuan :'+data1['no_pengajuan'],function(){
						if ($('input[name=radioBulk]:checked').val() === 'cgi') {
							$('#btn-pilih-data-bulk-payment-cusgrup').click();
						}else{
							$('#btn-pilih-pengajuan-bulk-payment-branch').click();
						}	
						$('#check-tbl-dtl-bp').prop('checked',false);
					});
					$('#btn-save-bulk-payment-branch').prop('disabled',true);
				}else if (data1['status'] == '500') {
					alert_warning(data1['pesan']+' err');
				}else if(response.includes('error')){
					alert_error(response);
				}
			}catch (e) {
				$('#overlay-screen').hide();
				console.log(e);
			}
			
		},error:function(response){
			console.log(response);
		}
	});	
};

//------------------------------------------------------------------------------------ function GET BULK DETAIL BY ID BULK
function getByIdBulk(bulk_id){
	$.ajax({
		url:base_url+"Controller_bulk_payment/get_bulk_by_idBulk",
		type:'POST',
		data:{bulk_id},
		success:function(response){

			console.log(response);
			var data = $.parseJSON(response);
			var data1 = $.parseJSON(data);
			var response = JSON.stringify(response);
			if(response.includes('error')){
				alert_error(response);
				return false;
			}
			if(response) {

				try {
					tabel_detail_bulk_payment.clear().draw();

					if (data1['ListBulk'].length < 1) {
						alert_warning(data1['alert']);
						
					}else{
						$('#id-keterangan-bulk-payment-branch').val(data1['keterangan']);
						$.each(data1['ListBulk'], function(index) {
							var v_nominal = accounting.formatMoney(this['nominal'], '', 2, ',', '.');
							tabel_detail_bulk_payment.row.add([
								'<input disabled checked class="check-bp" id="check-tbl-dtl-bp'+index+'" type="checkbox">',
								index + 1,
								this['branch_code'] + ' - ' + this['branch_name'],
								this['contract_no'],
								this['customer_name'],
								this['installment_date'],
								this['installment_no'],
								v_nominal,
								'',
								''
								]).draw(false);
						});
						var sumtac = tabel_detail_bulk_payment.column( 7 ).data().sum();
						var sumtacMoney = accounting.formatMoney(sumtac, '', 2, ',', '.');
						$('#td-total-amount-bp').val(sumtacMoney);
						$('#modal-search-pengajuan-bulk-branch').modal('hide');
					}
				}
				catch(e) {
					$('#loading-ajax').hide(); 
					console.log(e);
					alert_error("Galat" + e);
				}
			}

		},error:function(response){

			console.log(response);
		}
	});

	
}

//------------------------------------------------------------------------------------ function GET BULK DETAIL
function getBulkDetail(customer_id,status){
	$.ajax({
		url:base_url+"Controller_bulk_payment/get_bulk_detail",
		type:'POST',
		data:{customer_id,status},
		success:function(response){
			console.log(response);
			if(response.includes('error')){
				alert_error(response);
				return false;
			}
			var data = $.parseJSON(response);
			var data1 = $.parseJSON(data);
			var array =[];
			var response = JSON.stringify(response);
			if(response) {

				try {
					tabel_detail_bulk_payment.clear().draw();
					if (data1['ListBulkDetail'].length < 1) {
						alert_warning('data tidak ditemukan');
						
					}else{
						nominal = [];
						$.each(data1['ListBulkDetail'], function(index) {
							var v_nominal = accounting.formatMoney(this['nominal'], '', 2, ',', '.');
							nominal.push(this['nominal']);
							array.push([
								'<input class="check-bp" id="check-tbl-dtl-bp'+index+'" type="checkbox">',
								index + 1,
								this['branch_code'] + ' - ' + this['branch_name'],
								this['contract_no'],
								this['customer_name'],
								this['installment_date'],
								this['installment_no'],
								v_nominal,
								this['contract_id'],
								this['customer_id']

								]);

						});

						tabel_detail_bulk_payment.rows.add(array).draw();
						// var sumtac = tabel_detail_bulk_payment.column( 7 ).data().sum();
						// var sumtacMoney = accounting.formatMoney(sumtac, '', 2, ',', '.');
						// $('#td-total-amount-bp').val(sumtacMoney);
						$('#btn-save-bulk-payment-branch').prop('disabled',false);
						$('#modal-search-pengajuan-bulk-paytmet-branch').modal('hide');
						$('#modal-search-pengajuan-bulk-cusgrup').modal('hide');
						$('#id-keterangan-bulk-payment-branch').val('');
						$('input[name=radioBulk]').prop('disabled',true);
						total_ceklist = $('.check-bp').not('#check-tbl-dtl-bp').length;
					}
				}
				catch(e) {
					$('#loading-ajax').hide(); 
					console.log(e);
					alert_error("Galat" + e);
				}
			}

		},error:function(response){

			console.log(response);
		}
	});

	
}

//------------------------------------------------------------------------------------ function GET BULK BY NAME
function getBulkByName(vCustomer){
	$.ajax({
		url:base_url+"Controller_bulk_payment/get_bulk_byName",
		type:'POST',
		data:{vCustomer},
		success:function(response){
			console.log(response);
			if(response.includes('error')){
				alert_error(response);
				return false;
			}
			var data = $.parseJSON(response);
			var data1 = $.parseJSON(data);
			var array =[];
			var response = JSON.stringify(response);
			if(response) {
				try {
					tabel_pengajuan_bulk.clear().draw();

					if (data1['ListBulk'].length < 1) {
						alert_warning('data tidak ditemukan');
						
					}else{
						$.each(data1['ListBulk'], function(index) {
							array.push([
								index + 1,
								this['customer_name'],
								this['customer_no'],
								this['branch_code'] + ' - ' + this['branch_name'],
								this['customer_id']
								]);

						});
						tabel_pengajuan_bulk.rows.add(array).draw();
						$('#check-tbl-dtl-bp').prop('disabled',false);
						$('#check-tbl-dtl-bp').removeAttr('checked');
						$('#btn-save-bulk-payment-branch').prop('disabled',false);
						$('#modal-search-pengajuan-bulk-paytmet-branch').modal('show');
					}
				}
				catch(e) {
					$('#loading-ajax').hide(); 
					console.log(e);
					alert_error("Galat" + e);
				}
			}
		},error:function(response){
			console.log(response);
		}
	});
	console.log(vCustomer);
}
//------------------------------------------------------------------------------------ function GET BULK BY NO
function getBulkByNo(vCustomer){
	$.ajax({
		url:base_url+"Controller_bulk_payment/get_bulk_byNo",
		type:'POST',
		data:{vCustomer},
		success:function(response){
			console.log(response);
			if(response.includes('error')){
				alert_error(response);
				return false;
			}
			var data = $.parseJSON(response);
			var data1 = $.parseJSON(data);
			var array =[];
			var response = JSON.stringify(response);
			if(response) {
				try {
					tabel_pengajuan_bulk.clear().draw();

					if (data1['ListBulk'].length < 1) {
						alert_warning('data tidak ditemukan');
					}else{
						$.each(data1['ListBulk'], function(index) {
							array.push([
								index + 1,
								this['customer_name'],
								this['customer_no'],
								this['branch_code'] + ' - ' + this['branch_name'],
								this['customer_id']
								]);		
						});
						tabel_pengajuan_bulk.rows.add(array).draw();
						$('#check-tbl-dtl-bp').prop('disabled',false);
						$('#check-tbl-dtl-bp').removeAttr('checked');
						$('#btn-save-bulk-payment-branch').prop('disabled',false);
						$('#modal-search-pengajuan-bulk-paytmet-branch').modal('show');
					}
				}
				catch(e) {
					$('#loading-ajax').hide(); 
					console.log(e);
					alert_error("Galat" + e);
				}
			}

		},error:function(response){

			console.log(response);
		}
	});
}
/// get BULK BY CUSTOMER GROUP ID
function getBulkByCGI(vCustomer){

	$.ajax({
		url:base_url+"Controller_bulk_payment/get_bulk_byCGI",
		type:'POST',
		data:{vCustomer},
		success:function(response){
			console.log(response);
			if(response.includes('error')){
				alert_error(response);
				return false;
			}
			var data = $.parseJSON(response);
			var data1 = $.parseJSON(data);
			var array=[];
			var response = JSON.stringify(response);
			if(response) {

				try {
					tabel_pengajuan_bulk_cusgrup.clear().draw();

					if (data1['ListBulk'].length < 1) {
						alert_warning('data tidak ditemukan');
						
					}else{
						$.each(data1['ListBulk'], function(index) {
							array.push([
								index + 1,
								this['customer_no'],
								this['branch_code'] + ' - ' + this['branch_name']
								]);
						});
						tabel_pengajuan_bulk_cusgrup.rows.add(array).draw();
						$('#check-tbl-dtl-bp').prop('disabled',false);
						$('#check-tbl-dtl-bp').removeAttr('checked');
						$('#btn-save-bulk-payment-branch').prop('disabled',false);
						$('#modal-search-pengajuan-bulk-cusgrup').modal('show');
					}
				}
				catch(e) {
					$('#loading-ajax').hide(); 
					console.log(e);
					alert_error("Galat" + e);
				}
			}

		},error:function(response){

			console.log(response);
		}
	});
}

///------------------------------------------------------------ GET BULK BY BRANCH
function getBulkByBranch(){

	$.ajax({
		url:base_url+"Controller_bulk_payment/get_bulk_byBranch",
		type:'POST',
		success:function(response){
			console.log(response);
			if(response.includes('error')){
				alert_error(response);
				return false;
			}
			var data = $.parseJSON(response);
			var data1 = $.parseJSON(data);
			var array =[];
			var response = JSON.stringify(response);
			if(response) {

				try {
					tabel_pengajuan_bulkBranch.clear().draw();

					if (data1['ListBulk'].length < 1) {
						alert_warning('data tidak ditemukan');
						
					}else{
						$.each(data1['ListBulk'], function(index) {
							array.push([
								index + 1,
								this['bulk_id'],
								this['customer_name'],
								this['total_unit'],
								this['installment_date']
								]);
						});

						tabel_pengajuan_bulkBranch.rows.add(array).draw();
						$('#check-tbl-dtl-bp').prop('disabled',true);
						$('#check-tbl-dtl-bp').attr('checked',true);
						$('#btn-save-bulk-payment-branch').prop('disabled',true);
						$('#modal-search-pengajuan-bulk-branch').modal('show');
					}
				}
				catch(e) {
					$('#loading-ajax').hide(); 
					console.log(e);
					alert_error("Galat" + e);
				}
			}

		},error:function(response){

			console.log(response);
		}
	});
}

function getRole(){
	$.ajax({
		url : base_url + "Controller_home/get_detail_user",
		cache : false,
		async :false,
		success : function(response){

			try{
				console.log(response);
				var role_data = $.parseJSON(response);
				var flagrole = true;
				$.each(role_data, function(i){
					if (role_data[i].role_code  === 'FIN_CBG_BLK') {
						localStorage.setItem('role', true);
						flagrole = false;
					}else if(flagrole){
						localStorage.setItem('role', false);
					}
				});
			}catch(e) {
				$('#loading-ajax').hide(); 
				console.log(e);
				alert_error("Galat" + e);
			}
		},
		error: function(response){
			console.log(response);
		}
	});

	$.ajax({
		url : base_url + "Controller_home/get_detail_user",
		cache : false,
		async :false,
		success : function(response){

			try{
				console.log(response);
				var role_data = $.parseJSON(response);
				var flagrole = true;
				$.each(role_data, function(i){
					if (role_data[i].role_code  === 'KSR_RV_CLTR' || role_data[i].role_code  === 'APP_ADM_ADH') {
						localStorage.setItem('role_rv_colllector', true);
						flagrole = false;
					}else if(flagrole){
						localStorage.setItem('role_rv_colllector', false);
					}
				});
			}catch(e) {
				$('#loading-ajax').hide(); 
				console.log(e);
				alert_error("Galat" + e);
			}
		},
		error: function(response){
			console.log(response);
		}
	});
}


}