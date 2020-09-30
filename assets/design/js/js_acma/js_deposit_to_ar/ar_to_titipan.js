/*variabel titip ke ar */
var nomor_memo_ar_ke_titip = '';  //$('#inp-memo-ar-titipan');
var nomor_kontrak_ar_ke_titip = ''; //$('#inp-no-kontrak-ar-titipan');
var nomor_kontrak_id_ar_ke_titip = '';
var nama_nasabah_ar_ke_titip = ''; //$('#inp-nama-nasabah-ar-titipan');
var saldo_ar_ke_titip = ''; //$('#inp-saldo-ar-titipan');


/*--------------------------- search nomor kontrak tab ar titipan ----------------------------*/
$('#search-no-kontrak-ar-titipan').click(	
	function(){	
		if (check_session() === 'true') {
			$('#inp-memo-titipan-ar, #inp-nama-nasabah-titipan-ar, #inp-saldo-titipan-ar').val('');	
			table_titipan_ke_ar.clear().draw();
			$('.chk-list').prop('checked', false);
			$('#btn-print-titipan-ar').prop('disabled', true);	

			console.log(select_branch);	
			nomor_kontrak_ar_ke_titip = $('#inp-no-kontrak-ar-titipan').val();
			console.log(nomor_kontrak_ar_ke_titip);
			if (nomor_kontrak_ar_ke_titip === ''  && select_branch === ''){
				alert_error("Silahkan isi nomor kontrak dan pilih cabang");
				$('#nokontrak-validasi-ar-titipan, #div-list-branch').addClass('has-error');
			}		
			else if (nomor_kontrak_ar_ke_titip === '' && select_branch !== '') {
				alert_error("Silahkan isi nomor kontrak");
				$('#nokontrak-validasi-ar-titipan').addClass('has-error');
				$('#div-list-branch').removeClass('has-error');
			}		
			else if (nomor_kontrak_ar_ke_titip.length !== 12 && select_branch ==='' ) {
				alert_error("Silahkan isi 12 digit nomor kontrak dan pilih cabang");
				$('#nokontrak-validasi-ar-titipan, #div-list-branch').addClass('has-error');		
			}		
			else if (nomor_kontrak_ar_ke_titip.length !== 12 && select_branch !=='' ) {
				alert_error("Silahkan isi 12 digit nomor kontrak");
				$('#nokontrak-validasi-ar-titipan').addClass('has-error');
				$('#div-list-branch').removeClass('has-error');
			}	
			else if (nomor_kontrak_ar_ke_titip !== '' && select_branch === '' ) {
				alert_error("pilih cabang");			
				$('#div-list-branch').addClass('has-error');
				$('#nokontrak-validasi-ar-titipan').removeClass('has-error');
			}	
			else
			{				
				$('#nokontrak-validasi-ar-titipan, #div-list-branch').removeClass('has-error');					
				console.log(select_branch);
				$.ajax({
					url: base_url+"Controller_deposit_to_ar/search_data_ar_titip",
					type: 'POST',
					dataType: 'json',
					data:{
						nomor_contract: nomor_kontrak_ar_ke_titip,
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
									$('#btn-save-ar-titipan').prop('disabled', false);
									$('#inp-contract-id-ar-titipan').val(response['contract_id']);
									$('#inp-nama-nasabah-ar-titipan').val(response['nama_nasabah']);
									table_ar_ke_titipan.clear();
									$.each(response['ListArToTitip'], function(index){								
										table_ar_ke_titipan.row.add([								
											'<input disabled="" id= "check-ar-titips' + index + '" class="check_ar_titip" type="checkbox">',								
											response['ListArToTitip'][index]['deskripsi'],
											response['ListArToTitip'][index]['no_referensi'],
											response['ListArToTitip'][index]['tgl_penerimaan'],
											response['ListArToTitip'][index]['no_angsuran'],
											accounting.formatMoney(response['ListArToTitip'][index]['nominal_angsuran'], '', 2, ',', '.'),									
											]).draw(false);														
									});
									n_check = $('.check_ar_titip').not("#check-all-angsuran-titip").length-1;
									$('#check-ar-titips0').prop('disabled',false);
								}						
							}
							catch(e) {
								console.log(response);
								alert_error(response['ErrorMessage']);
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
/*--------------------------- search nomor kontrak tab ar titipan ----------------------------*/

/*--------------------------- reset data hasil pencarian titipan to ar ----------------------------*/
$('#reset-data-ar-titipan').click(
	function(){
		$('.res-global').val('');
		table_ar_ke_titipan.clear().draw();	
		$('#btn-save-ar-titipan, #btn-confirm-ar-titipan, #btn-print-ar-titipan, #btn-cancel-ar-titipan').prop('disabled', true);
		$('#inp-no-kontrak-ar-titipan').prop('disabled',false);
		$('#inp-no-kontrak-ar-titipan').prop('readonly',false);	
		$('#search-no-kontrak-ar-titipan').toggle(true);
		$('#search-no-kontrak-ar-titipan').prop('disabled',false);
		$('#check-all-angsuran-titip').prop('disabled',false);
	});

/*--------------------------- reset data hasil pencarian titipan to ar ----------------------------*/


/*--------------------------- ambil value dari data table ----------------------------*/
var data_ar_ke_titipan = '';
var deskripsi = [];
var no_referensi = [];
var tgl_penerimaan = [];
var no_angsuran = [];
var nominal_angsuran = [];
$('#table-ar-ke-titipan tbody').on('click', '.check_ar_titip', function(){
	console.log(this);

	/*var pages = table_ar_ke_titipan.page();
	var limits = table_ar_ke_titipan.page.len();
	var table_leng = table_ar_ke_titipan.rows().data().length ;
	var search  = table_ar_ke_titipan.search();

	table_ar_ke_titipan.search("");
	table_ar_ke_titipan.page.len(table_leng);
	table_ar_ke_titipan.draw();*/


	var id_next =  this.id.substring(15,18);
	id_next = Number(id_next);
	id_next = id_next+1;
	var id_next_a =  this.id.substring(15,18);

	if (this.checked == false) {
		$('#check-ar-titips'+id_next).prop('disabled',true);
		$('#check-all-angsuran-titip').prop('checked',false);
		for (var i = 0; i < $('.check_ar_titip').length; i++) {
			
			if (i > id_next_a) {
				$('#check-ar-titips'+i).prop('checked',false);
				$('#check-ar-titips'+i).prop('disabled',true);
			}
		}
	}else{
		$('#check-ar-titips'+id_next).prop('disabled',false);
		if ($('#check-ar-titips'+n_check).is(":checked")) {
			$('#check-all-angsuran-titip').prop('checked',true);
		}
	}
	

	data_ar_ke_titipan = table_ar_ke_titipan.row($(this).parents('tr')).data();	
	console.log(data_ar_ke_titipan);

	/*table_ar_ke_titipan.search(search);
	table_ar_ke_titipan.page.len(limits);
	table_ar_ke_titipan.draw();
	table_ar_ke_titipan.page( pages ).draw( 'page' );*/

});
$('#check-all-angsuran-titip').click(
	function(){
		/*var pages = table_ar_ke_titipan.page();
		var limits = table_ar_ke_titipan.page.len();
		var table_leng = table_ar_ke_titipan.rows().data().length ;
		var search  = table_ar_ke_titipan.search();

		table_ar_ke_titipan.search("");
		table_ar_ke_titipan.page.len(table_leng);
		table_ar_ke_titipan.draw();*/
		console.log('masuk, fungsi berjalan');
		if ($('#check-all-angsuran-titip').is(':checked')){
			$('.check_ar_titip').prop('checked', true);
			$('.check_ar_titip').prop('disabled',false);
			data_ar_ke_titipan = table_ar_ke_titipan.row($(this).parents('th')).data();
			console.log("checklist berhasil ar ke titipan");
		}else{



			$('.check_ar_titip').prop('checked', false);
			$('.check_ar_titip').prop('disabled', true);
			console.log("checklist dibatalkan ar ke titipan");
			$('#check-ar-titips0').prop('disabled',false);
		}
		/*table_ar_ke_titipan.search(search);
		table_ar_ke_titipan.page.len(limits);
		table_ar_ke_titipan.draw();
		table_ar_ke_titipan.page( pages ).draw( 'page' );*/
	}); 

/*--------------------------- ambil value dari data table ----------------------------*/

/*--------------------------- 1 button simpan titipan ke angsuran ---------------------------*/
$('#btn-save-ar-titipan').click(
	function() {
		if (check_session() === 'true') {
			kode_cabang_detail = $('#slc-branch-depositar').val();
			var list_angsuran_titip = table_ar_ke_titipan.data();
			console.log(list_angsuran_titip);

			var list_data_angsuran_titip = [];
			for (var i = 0; i < list_angsuran_titip.length; i++) {
				if ($('#check-ar-titips' + i).is(":checked") || ($('#check-all-angsuran-titip').is(":checked"))) {
					list_data_angsuran_titip.push({
						deskripsi: list_angsuran_titip[i][1],
						no_referensi: list_angsuran_titip[i][2],
						tgl_penerimaan: list_angsuran_titip[i][3],
						no_angsuran: list_angsuran_titip[i][4],
						nominal_angsuran: accounting.unformat(list_angsuran_titip[i][5])
					});
				}
			}
			console.log(list_data_angsuran_titip);
			nomor_kontrak_ar_ke_titip = $('#inp-no-kontrak-ar-titipan').val();
			nomor_kontrak_id_ar_ke_titip = $('#inp-contract-id-ar-titipan').val();

			if ($('.check_ar_titip').is(':checked') == false) {
				alert_error("detail data belum dipilih");
				console.log('gagal, belum checklist datatable')
			} else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah anda yakin ingin menyimpan data ini?", function() {
                	$.ajax({
                		url: base_url + "Controller_deposit_to_ar/insert_ar_ke_titipan",
                		type: 'POST',
                		dataType: 'json',
                		data: {
                			branch_id: select_branch,
                			nomor_kontrak_id: nomor_kontrak_id_ar_ke_titip,
                			ListArToTitip: list_data_angsuran_titip
                		},
                		success: function(response) {
                			console.log(response);
                			if (response) {
                				try {
                					if (response['Status'] === '200') {
                                        //
                                        $('#inp-memo-ar-titipan').val(response['NoMemo']);
                                        alert_info("Data Dengan Nomor Laporan " + response['NoMemo'] + " Berhasil Disimpan");
                                        $('#btn-save-ar-titipan, #btn-print-ar-titipan, #search-no-kontrak-ar-titipan').prop('disabled', true);
                                        $('#btn-confirm-ar-titipan, #btn-cancel-ar-titipan').prop('disabled', false);
                                        $('.check_ar_titip').prop('disabled', true);
                                        $('#check-all-angsuran-titip').prop('disabled', true);
                                        $('#inp-no-kontrak-ar-titipan').prop('disabled', true);
                                    } else if (response['Status'] === '500') {
                                    	alert_error(response['ErrorMessage']);
                                    } else {
                                    	alert_error(response['ErrorMessage']);
                                    }

                                } catch (e) {
                                	$('#loading-ajax').hide();
                                	alert_error(e);
                                }
                            }
                        },
                        error: function(response) {
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

/*--------------------------- 1 button simpan titipan ke angsuran -------------------------------*/


/*--------------------------- 1 button konfirmasi titipan ke angsuran ---------------------------*/
$('#btn-confirm-ar-titipan').click(
	function(){
		if (check_session() === 'true') {
			var list_angsuran_titip = table_ar_ke_titipan.data();
			console.log(list_angsuran_titip);

			var list_data_angsuran_titip = [];
			for (var i = 0; i < list_angsuran_titip.length; i++){
				if($('#check-ar-titips'+i).is(":checked") || ($('#check-all-angsuran-titip').is(":checked")) ){
					list_data_angsuran_titip.push({
						deskripsi : list_angsuran_titip[i][1],
						no_referensi : list_angsuran_titip[i][2],
						tgl_penerimaan : list_angsuran_titip[i][3],
						no_angsuran : list_angsuran_titip[i][4],					
						nominal_angsuran : accounting.unformat(list_angsuran_titip[i][5])					
					});
				}	
			}
			console.log(list_data_angsuran_titip);
			nomor_memo_ar_titip = $('#inp-memo-ar-titipan').val();
			nama_nasabah_ar_ke_titip = $('#inp-nama-nasabah-ar-titipan').val();		
			nomor_kontrak_ar_ke_titip = $('#inp-no-kontrak-ar-titipan').val();
			nomor_kontrak_id_ar_ke_titip = $('#inp-contract-id-ar-titipan').val();

			if (nomor_kontrak_ar_ke_titip.length !== 12 ) {
				alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
				$('#nokontrak-validasi-ar-titipan, #validasi-nasabah-ar-titipan').addClass('has-error');
				console.log('gagal, validasi 2')
			}
			else
			{			
			//alert_error("lolos validasi simpan titipan to ar");		
			alert_confirm("Apakah anda yakin ingin konfirmasi data ini?", function(){
				$.ajax({
					url: base_url+"Controller_deposit_to_ar/confirm_ar_ke_titipan",
					type: 'POST',
					dataType: 'json',
					data: {
						branch_id: select_branch,
						no_memo: nomor_memo_ar_titip,
						nomor_contract_id: nomor_kontrak_id_ar_ke_titip,
						nomor_contract: nomor_kontrak_ar_ke_titip,
						ListArToTitip: list_data_angsuran_titip																		
					},
					success:function(response){
						console.log(response);
						if (response){
							try{
								if (response['Status'] === '200') {							
									alert_info("Data Dengan Nomor Laporan " +nomor_memo_ar_titip+ " Berhasil Dikonfirmasi", function(){
										$('.btn-konfirmasi-ovb, .btn-cancel-ovb').prop('disabled', true);
										$('.btn-print-ovb').prop('disabled', false);
									});
								}
								else if (response['Status'] === '500') {
									alert_error(response['ErrorMessage']);
								}
								else {
									alert_error(response['ErrorMessage']);
								}
							}catch (e) {
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

/*--------------------------- 1 button konfirmasi titipan ke angsuran ---------------------------*/


/*--------------------------- 1 button batal angsuran ke titipan ---------------------------*/
$('#btn-cancel-ar-titipan').click(
	function() {
		if (check_session() === 'true') {
			nomor_memo_ar_titip = $('#inp-memo-ar-titipan').val();
			if (nomor_memo_ar_titip.length !== 12) {
				alert_error("Silahkan input nomor memo secara lengkap, sebanyak 12 digit");
				$('#nokontrak-validasi-ar-titipan, #nomemo-validasi-ar-titipan, #validasi-nasabah-ar-titipan').addClass('has-error');
				console.log('gagal, validasi batal cancel ar to titipan')
			} else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah anda yakin ingin membatalkan proses ini?", function() {
                	$.ajax({
                		url: base_url + "Controller_deposit_to_ar/cancel_overbook",
                		type: 'POST',
                		dataType: 'json',
                		data: {
                			branch_id: select_branch,
                			nomor_memo: nomor_memo_ar_titip
                		},
                		success: function(response) {
                			console.log(response);
                			if (response){
                				try{
                					if (response['Status'] === '200') {
                						alert_info("Data Dengan Nomor Laporan " + nomor_memo_ar_titip + " Berhasil Dibatalkan");
                						$('#btn-save-ar-titipan, #btn-confirm-ar-titipan, #btn-cancel-ar-titipan').prop('disabled', true);
                					} else if (response['Status'] === '500') {
                						alert_error(response['ErrorMessage']);
                					} else {
                						alert_error(response['ErrorMessage']);
                					}

                				}catch (e) {
                					$('#loading-ajax').hide();
                					alert_error(e);
                				}
                			}                			
                		},
                		error: function(response) {
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

/*--------------------------- 1 button batal angsuran ke titipan ---------------------------*/

/*--------------------------- 1 button print titipan ke angsuran ---------------------------*/

$('#btn-print-ar-titipan').click(	
	function(){	
		if (check_session() === 'true') {
			nomor_kontrak_ar_ke_titip = $('#inp-no-kontrak-ar-titipan').val();
			nomor_memo_ar_titip = $('#inp-memo-ar-titipan').val();
			nomor_memo_ar_titip = $('#inp-memo-ar-titipan').val();		
			if (nomor_kontrak_ar_ke_titip.length !== 12 && nomor_memo_ar_titip == null) {
				alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
				$('#nokontrak-validasi-ar-titipan, #validasi-nasabah-ar-titipan ').addClass('has-error');
				console.log('gagal, validasi 2')
			}
			else
			{			
			//alert_error("lolos validasi simpan titipan to ar");		
			alert_confirm("APAKAH ANDA YAKIN MENCETAK DATA INI?", function(){
				$.ajax({
					url: base_url+"Controller_deposit_to_ar/print_ar_totitipan",
					type: 'POST',
					dataType: 'json',
					data: {
						branch_id: select_branch, //"0104",
						nomor_contract: nomor_kontrak_ar_ke_titip, //"010418000058",
						nomor_memo: nomor_memo_ar_titip, //"010418O00180" 				
					},
					success:function(response){
						console.log(response);
						if (response) {
							try{
								if (response['status'] === '1') {			
									alert_info("Data Dengan Nomor Laporan " +nomor_memo_ar_titip+ " Berhasil Dicetak");
									$('#btn-save-titipan-ar').prop('disabled', true);
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

/*--------------------------- 1 button print titipan ke angsuran ---------------------------*/




