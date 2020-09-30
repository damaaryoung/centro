/*variabel titip ke ar */
var nomor_memo_titip_pendapatan = '';//$('#inp-memo-titipan-ke-pendapatan');



/*--------------------------- search nomor kontrak tab titipan to pendapatan ----------------------------*/
$('#tampil-data-titipan-pendapatan').click(	
	function(){	
		if (check_session() === 'true') {
			reset_button();
			select_branch = $('#slc-branch-depositar').val();
			console.log(select_branch);
			if (select_branch === ''){
				alert_error("Silahkan pilih cabang");
				$('#div-list-branch').addClass('has-error');
			}		
			else
			{				
				$('#div-list-branch').removeClass('has-error');					
				console.log(select_branch);
				var dataAll = [];
				$.ajax({
					url: base_url+"Controller_deposit_to_ar/search_data_titip_pend",
					type: 'POST',
					dataType: 'json',
					data:{
						branch_id: select_branch
					},
					cache: false,
					success:function(response){
						console.log(response);
						if (response){
							try{
								if(response['Status'] == "500")
								{
									console.log(response);
									alert_error(response['ErrorMessage']);
								}
								else
								{							
									console.log(response);														
									table_titipan_ke_pendapatan.clear();
									$.each(response['ListTitipPend'], function(index){								
										dataAll.push([
											'<input id= "check-titipan-pends' + index + '" class="check_titipan_pend" type="checkbox">',								
											response['ListTitipPend'][index]['nomor'],
											response['ListTitipPend'][index]['contract_no'],
											response['ListTitipPend'][index]['contract_id'],									
											response['ListTitipPend'][index]['customer_name'],
											response['ListTitipPend'][index]['installment_no'],
											response['ListTitipPend'][index]['transaction_date'],									
											accounting.formatMoney(response['ListTitipPend'][index]['current_ballance'], '', 2, ',', '.') 

											]);														
									});

									table_titipan_ke_pendapatan.rows.add(dataAll).draw(false);				


									t_pen_check = $('.check_titipan_pend').not("#check-all-titip-to-pendapatan").length;
									$('#btn-save-titipan-pendapatan').prop('disabled', false);
								}						
							}
							catch(e) {
								alert_error(e);
								console.log(response);
								console.log(e);
							}
						}					
					},					
					error:function(response){
						console.log(response);

					}
				});
			}
		} else if (check_session() === 'false') {
			alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
				localStorage.clear();
				window.location.href = base_url + "Controller_login/login_view";
			});
		}		
	});
/*--------------------------- search nomor kontrak tab titipan to pendapatan ----------------------------*/

$('#reset-data-titipan-pendapatan').click(
	function(){
		reset_button();
	});

function reset_button(){
	$('#inp-memo-titipan-ke-pendapatan').val('');
	table_titipan_ke_pendapatan.clear().draw();
	$('#check-all-titip-to-pendapatan').prop('disabled', false);
	$('#check-all-titip-to-pendapatan').prop('checked', false);
	$('#btn-save-titipan-pendapatan, #btn-confirm-titipan-pendapatan, #btn-print-titipan-pendapatan, #btn-cancel-titipan-pendapatan').prop('disabled', true);
	$('#tampil-data-titipan-pendapatan').toggle(true); 
	$('#tampil-data-titipan-pendapatan').prop('disabled', false);
}

/*--------------------------- ambil value dari data table ----------------------------*/

var data_titipan_ke_pendapatan = '';
var nokontrak = [];
var nama = [];
var no_angsuran = [];
var tanggal = [];
var nominal = [];
var t_pen_check = 0;

$('#table-titipan-ke-pendapatan tbody').on('click', '.check_titipan_pend', function(){
	console.log(this);
	var t_pen_check2 =  $('.check_titipan_pend:checked').not("#check-all-titip-to-pendapatan").length;
	if (this.checked == false) {
		$('#check-all-titip-to-pendapatan').prop('checked',false);
		
	}else{
		if (t_pen_check == t_pen_check2) {
			$('#check-all-titip-to-pendapatan').prop('checked',true);
		}
		
	}

	data_titipan_ke_pendapatan = table_titipan_ke_pendapatan.row($(this).parents('tr')).data();	
	console.log(data_titipan_ke_pendapatan);
}); 

$('#check-all-titip-to-pendapatan').click(
	function(){
		console.log('check all');
		if ($('#check-all-titip-to-pendapatan').is(':checked')){
			$('.check_titipan_pend').prop('checked', true);
			data_titipan_ke_pendapatan = table_titipan_ke_pendapatan.row($(this).parents('th')).data();
			console.log("checklist berhasil titipan ke pendapatan");
		}else{
			$('.check_titipan_pend').prop('checked', false);
			console.log("checklist dibatalkan titipan ke pendapatan");
		}
	}); 

/*--------------------------- ambil value dari data table ----------------------------*/


/*--------------------------- 1 button simpan titipan ke pendapatan ---------------------------*/
$('#btn-save-titipan-pendapatan').click(
	function(){
		if (check_session() === 'true') {
			kode_cabang_detail = $('#slc-branch-depositar').val();
			var list_titip_pendapatan = table_titipan_ke_pendapatan.data();
			console.log(list_titip_pendapatan);

			var list_data_titip_pendapatan = [];
			for (var i = 0; i < list_titip_pendapatan.length; i++){
				if($('#check-titipan-pends'+i).is(":checked") ){
					list_data_titip_pendapatan.push({					
						nomor : list_titip_pendapatan [i][1],
						contract_no : list_titip_pendapatan [i][2],
						contract_id : list_titip_pendapatan [i][3],
						installment_no : list_titip_pendapatan [i][5],
						transaction_date : list_titip_pendapatan [i][6],
						current_balance : accounting.unformat(list_titip_pendapatan[i][7])					
					});
				}			
			}
			console.log(list_data_titip_pendapatan);
		nomor_memo_titip_pendapatan = $('#inp-memo-titipan-ke-pendapatan').val(); //'010417O00016'; 
		$('#tampil-data-titipan-pendapatan').prop('disabled', true);

		if ($('.check_titipan_pend').is(':checked') == false) {
			alert_error("detail data belum dipilih");
			console.log('gagal, validasi 2')
		}
		else
		{				
			//alert_error("lolos validasi simpan titipan to ar");		
			alert_confirm("Apakah anda yakin ingin menyimpan data ini?", function(){
				$.ajax({
					url: base_url+"Controller_deposit_to_ar/insert_titip_pend",
					type: 'POST',
					dataType: 'json',
					data: {
						branch_id: kode_cabang_detail,
						ListkePendapatan: list_data_titip_pendapatan						
					},
					success: function(response){
						console.log(response);
						if(response){
							try{
								if (response['Status'] === '200') {		
									$('#inp-memo-titipan-ke-pendapatan').val(response['NoMemo']);
									alert_info("Data Dengan Nomor Laporan "+response['NoMemo']+ " Berhasil Disimpan");
									$('#btn-save-titipan-pendapatan').prop('disabled', true);
									$('#btn-confirm-titipan-pendapatan, #btn-cancel-titipan-pendapatan').prop('disabled', false);
									$('.check_titipan_pend').prop('disabled',true);
									$('#check-all-titip-to-pendapatan').prop('disabled', true);
								}
								else if (response['Status'] === '500') {
									alert_error(response['ErrorMessage']);
								}
								else {
									alert_error(response['ErrorMessage']);
								}
							} catch (e) {
								$('#loading-ajax').hide();
								alert_error(e);
							}
						}
						
					},
					error: function(response){
						console.log(response);
					}
				});
			});
			
		}
	} else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

/*--------------------------- 1 button simpan titipan ke pendapatan ---------------------------*/

/*--------------------------- 1 button confirm titipan ke pendapatan ---------------------------*/
$('#btn-confirm-titipan-pendapatan').click(
	function(){
		if (check_session() === 'true') {
			var list_titip_pendapatan = table_titipan_ke_pendapatan.data();
			console.log(list_titip_pendapatan);

			var list_data_titip_pendapatan = [];
			for (var i = 0; i < list_titip_pendapatan.length; i++){
				if($('#check-titipan-pends'+i).is(":checked") ){
					list_data_titip_pendapatan.push({					
						nomor : list_titip_pendapatan [i][1],
						contract_no : list_titip_pendapatan [i][2],
						contract_id : list_titip_pendapatan [i][3],
						installment_no : list_titip_pendapatan [i][5],
						transaction_date : list_titip_pendapatan [i][6],
						current_ballance : accounting.unformat(list_titip_pendapatan[i][7])
					});
				}			
			}
			console.log(list_data_titip_pendapatan);	

		nomor_memo_titip_pendapatan = $('#inp-memo-titipan-ke-pendapatan').val(); //'010417O00016'; 

		if ($('.check_titipan_pend').is(':checked') == false) {
			alert_error("detail data belum dipilih");
			console.log('gagal, validasi 2')
		}

		else
		{			
			//alert_error("lolos validasi simpan titipan to ar");		
			alert_confirm("Apakah anda yakin ingin konfirmasi data ini?", function(){
				$.ajax({
					url: base_url+"Controller_deposit_to_ar/confirm_titip_pend",
					type: 'POST',
					dataType: 'json',
					data: {
						branch_id: kode_cabang_detail,
						nomor_memo: nomor_memo_titip_pendapatan,
						ListkePendapatan: list_data_titip_pendapatan							
					},
					success:function(response){
						console.log(response);
						if(response){
							try{
								if (response['Status'] === '200') {
									alert_info("Data Dengan Nomor Laporan "+nomor_memo_titip_pendapatan+ " Berhasil Dikonfirmasi");
									$('#btn-save-titipan-pendapatan, #btn-confirm-titipan-pendapatan, #btn-cancel-titipan-pendapatan').prop('disabled', true);
									$('#btn-print-titipan-pendapatan').prop('disabled', false);	
								}
								else if (response['Status'] === '500') {
									alert_error(response['ErrorMessage']);
								}
								else {
									alert_error(response['ErrorMessage']);
								}
							} catch (e) {
								$('#loading-ajax').hide();
								alert_error(e);
							}
						}
						
					},
					error: function(response){
						alert_error(response);
					}
				});
			});
			
		}		
	} else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

/*--------------------------- 1 button confirm titipan ke pendapatan ---------------------------*/

/*--------------------------- 1 button print titipan ke pendapatan ---------------------------*/
$('#btn-print-titipan-pendapatan').click(
	function(){	
		if (check_session() === 'true') {
			nomor_memo_titip_pendapatan = $('#inp-memo-titipan-ke-pendapatan').val();
			if (nomor_memo_titip_pendapatan.length === null ) {
				alert_error("nomor memo wajib terisi");
				$('#nomemo-validasi-titip-ke-pendapatan').addClass('has-error');
				console.log('gagal, mendapatkan nomor memo titipan ke pendapatan')
			}
			else
			{			
			//alert_error("lolos validasi simpan titipan to ar");		
			alert_confirm("Apakah anda yakin ingin mencetak data ini?", function(){
				$.ajax({
					url: base_url+"Controller_deposit_to_ar/print_titip_pend",
					type: 'POST',
					dataType: 'json',
					data: {
						nomor_contract: '', //"010418000109" nomor_kontrak_titip_a						
						branch_id: kode_cabang_detail, //"0104"						
						nomor_memo: nomor_memo_titip_pendapatan //"010418O00166" 
					},
					success:function(response){
						console.log(response);
						if(response){
							try{
								if (response['status'] === '1') {			
									alert_info("Data Dengan Nomor Laporan " +nomor_memo_titip_pendapatan+ " Berhasil Dicetak");
									$('#btn-save-titipan-pendapatan, #btn-confirm-titipan-pendapatan, #btn-cancel-titipan-pendapatan').prop('disabled', true);
									var printWindow = window.open();
									printWindow.document.write('<pre id = "printss"></pre>');
									printWindow.document.querySelector('pre').innerHTML = response['isi'];
									printWindow.document.close();
									printWindow.focus();
									printWindow.print();
									printWindow.close();
								}
								else {
									alert_error(response['ErrorMessage']);
								}
							} catch (e) {
								$('#loading-ajax').hide();
								alert_error(e);
							}
						}
						
					},
					error: function(response){
						console.log(response);
					}
				});
			});			
		}
	} else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

/*--------------------------- 1 button print titipan ke pendapatan ---------------------------*/

/*--------------------------- 1 button batal titipan ke pendapatan ---------------------------*/
$('#btn-cancel-titipan-pendapatan').click(
	function(){
		if (check_session() === 'true') {
			nomor_memo_titip_pendapatan = $('#inp-memo-titipan-ke-pendapatan').val();		
			if (nomor_memo_titip_pendapatan.length !== 12 ) {
				alert_error("NOMOR MEMO SALAH ( TIDAK 12 DIGIT )");
				$('#nomemo-validasi-ttn-ke-muf').addClass('has-error');
				console.log('NOMOR MEMO TIDAK MEMENUHI SYARAT')
			}
			else if (nomor_memo_titip_pendapatan === '') {
				alert_error("NOMOR MEMO TIDAK BOLEH KOSONG");
			}		
			else
			{			
			//alert_error("lolos validasi simpan titipan to ar");		
			alert_info("APAKAH ANDA YAKIN MEMBATALKAN TRANSAKSI INI?", function(){
				$.ajax({
					url: base_url+"Controller_deposit_to_ar/cancel_overbook",
					type: 'POST',
					dataType: 'json',
					data: {
						branch_id: select_branch,
						nomor_memo: nomor_memo_titip_pendapatan					
					},
					success:function(response){
						console.log(response);
						if(response){
							try{
								if (response['Status'] === '200') {			
									alert_info("Data Dengan Nomor Laporan " +nomor_memo_titip_pendapatan+ " Telah Dibatalkan");
									$('#btn-save-titipan-pendapatan, #btn-confirm-titipan-pendapatan, #btn-print-titipan-pendapatan, #btn-cancel-titipan-pendapatan').prop('disabled', true);    							
								}
								else if (response['Status'] === '500') {
									alert_error(response['ErrorMessage']);
								}

							} catch (e) {
								$('#loading-ajax').hide();
								alert_error(e);
							}
						}						
					},
					error: function(response){
						console.log(response);
					}
				});
			});			
		}
	} else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});
/*--------------------------- 1 button batal titipan ke pendapatan ---------------------------*/


