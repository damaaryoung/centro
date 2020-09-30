/*variabel titip ke ar */
var nomor_memo_titip_denda = '';
var nomor_kontrak_titip_ke_denda = '';
var nomor_kontrak_id_titip_ke_denda = '';
var nama_nasabah_titip_ke_denda = '';
var saldo_titip_ke_denda = '';


/*--------------------------- search nomor kontrak tab titipan to denda ----------------------------*/
$('#search-no-kontrak-titipan-denda').click(	
	function(){	
		if (check_session() === 'true') {
			select_branch = $('#slc-branch-depositar').val();
			console.log(select_branch);
			nomor_kontrak_titip_ke_denda = $('#inp-no-kontrak-titipan-denda').val();		
		//nama_cabang = $('#branch-code').val();
		console.log(nomor_kontrak_titip_ke_denda);
		if (nomor_kontrak_titip_ke_denda === ''  && select_branch === ''){
			alert_error("Silahkan isi nomor kontrak dan pilih cabang");
			$('#nokontrak-validasi-titip-todenda, #div-list-branch').addClass('has-error');
		}		
		else if (nomor_kontrak_titip_ke_denda === '' && select_branch !== '') {
			alert_error("Silahkan isi nomor kontrak");
			$('#nokontrak-validasi-titip-todenda').addClass('has-error');
			$('#div-list-branch').removeClass('has-error');
		}		
		else if (nomor_kontrak_titip_ke_denda.length !== 12 && select_branch ==='' ) {
			alert_error("Silahkan isi 12 digit nomor kontrak dan pilih cabang");
			$('#nokontrak-validasi-titip-todenda, #div-list-branch').addClass('has-error');		
		}		
		else if (nomor_kontrak_titip_ke_denda.length !== 12 && select_branch !=='' ) {
			alert_error("Silahkan isi 12 digit nomor kontrak");
			$('#nokontrak-validasi-titip-todenda').addClass('has-error');
			$('#div-list-branch').removeClass('has-error');
		}	
		else if (nomor_kontrak_titip_ke_denda !== '' && select_branch === '' ) {
			alert_error("pilih cabang");			
			$('#div-list-branch').addClass('has-error');
			$('#nokontrak-validasi-titip-todenda').removeClass('has-error');
		}	
		else
		{				
			$('#nokontrak-validasi-titip-todenda, #div-list-branch').removeClass('has-error');					
			console.log(select_branch);
			$.ajax({
				url: base_url+"Controller_deposit_to_ar/search_data_titip_denda",
				type: 'POST',
				dataType: 'json',
				data:{
					nomor_contract: nomor_kontrak_titip_ke_denda,
					branch_id: select_branch
				},
				cache: false,
				success:function(response){
					console.log(response);
					if (response) {
						try{
							if(response['Status'] == "500")
							{
								console.log(response);
								alert_error(response['ErrorMessage']);
							}
							else
							{							
								console.log(response);
								$('#inp-nama-nasabah-titipan-denda').val(response['nama_nasabah']);
								$('#inp-contract-id-titipan-denda').val(response['contract_id']);														
								$('#inp-saldo-titipan-denda').val(accounting.formatMoney(response['saldo'], '', 2, ',', '.'));							
								table_titipan_ke_denda.clear();
								$.each(response['ListTitipDenda'], function(index){								
									table_titipan_ke_denda.row.add([								
										'<input id= "check-titip-dendas' + index + '" class="check_titip_denda" type="checkbox">',								
										response['ListTitipDenda'][index]['deskripsi'],
										response['ListTitipDenda'][index]['no_angsuran'],									
										accounting.formatMoney(response['ListTitipDenda'][index]['denda'], '', 2, ',', '.'),
										'<input id= "titipan' + index + '" class="form-control inp-number input-smn inp-titipan" type="text" onclick="unformatuangovb(\'titipan' + index + '\')" onblur="formatuangovb(\'titipan' + index + '\')" value = '+ accounting.formatMoney(response['ListTitipDenda'][index]['titipan'], '', 2, ',', '.') +' ></input>',
									//'<input id= "titipan' + index + '" class="form-control input-smn" type="text" value = '+ accounting.formatMoney(response['ListTitipDenda'][index]['titipan'], '', 2, ',', '.') +' ></input>',
									//accounting.formatMoney(response['ListTitipDenda'][index]['titipan'], '', 2, ',', '.'), 
									response['ListTitipDenda'][index]['tanggal'],
									]).draw(false);														
								});
								t_d_check = $('.check_titip_denda').not("#check-all-titipdenda").length;
								$('#btn-save-titipan-denda').prop('disabled', false);
							}						
						}
						catch(e) {
							console.log(response);
							alert_error(e);
						}
					}					
				},					
				error:function(response){
					alert_error(response);
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
/*--------------------------- search nomor kontrak tab titipan to ar ----------------------------*/

/*--------------------------- reset data hasil pencarian titipan to ar ----------------------------*/
$('#reset-data-titipan-denda').click(
	function(){
		$('.res-global').val('');
		table_titipan_ke_denda.clear().draw();	
		$('#btn-save-titipan-denda, #btn-confirm-titipan-denda, #btn-print-titipan-denda, #btn-cancel-titipan-denda').prop('disabled', true);
		$('#inp-no-kontrak-titipan-denda').prop('readonly',false);	
		$('#inp-no-kontrak-titipan-denda').prop('disabled',false);
		$('#search-no-kontrak-titipan-denda').toggle(true);
		$('#check-all-titipdenda').prop('disabled', false);
		$('#check-all-titipdenda').prop('checked', false);
		$('#search-no-kontrak-titipan-denda').prop('disabled', false);
	});
/*--------------------------- reset data hasil pencarian titipan to ar ----------------------------*/

/*--------------------------- ambil value dari data table ----------------------------*/
var data_titipan_ke_denda = '';
var deskripsi = [];
var no_angsuran = [];
var denda = [];
var titipan = [];
var tgl_penerimaan = [];
var t_d_check = 0;

$('#table-titipan-ke-denda tbody').on('click', '.check_titip_denda', function(){
	console.log(this);
	var t_d_check2 = $('.check_titip_denda:checked').not("#check-all-titipdenda").length;	
	if (this.checked == false) {
		$('#check-all-titipdenda').prop('checked',false);
	}else{
		if (t_d_check == t_d_check2) {
			$('#check-all-titipdenda').prop('checked',true);
		}
		
	}
	data_titipan_ke_denda = table_titipan_ke_denda.row($(this).parents('tr')).data();
	var selector = data_titipan_ke_denda[4].substring(data_titipan_ke_denda[4].indexOf("titipan"),data_titipan_ke_denda[4].indexOf("\" class"));
	console.log(data_titipan_ke_denda);
});

$('#check-all-titipdenda').click(
	function(){
		console.log('masuk ke check all');
		if ($('#check-all-titipdenda').is(':checked')){
			$('.check_titip_denda').prop('checked', true);
			data_titipan_ke_denda = table_titipan_ke_denda.row($(this).parents('th')).data();
			console.log("checklist berhasil titipan ke denda");			
		}else{
			$('.check_titip_denda').prop('checked', false);
			console.log("checklist dibatalkan titipan ke denda");
		}
	}); 

/*--------------------------- ambil value dari data table ----------------------------*/


/*--------------------------- 2 button simpan titipan ke denda ---------------------------*/
$('#btn-save-titipan-denda').click(
	function() {
		if (check_session() === 'true') {
			kode_cabang_detail = $('#slc-branch-depositar').val();
			console.log(kode_cabang_detail);
			var list_denda = table_titipan_ke_denda.data();
			console.log(list_denda);
			var list_data_denda = [];
			var titipan2 = '';
			for (var i = 0; i < list_denda.length; i++) {
				if ($('#check-titip-dendas' + i).is(":checked")) {
					titipan2 = accounting.unformat($('#titipan' + i).val());
					var titipan_2 = $('#' + list_denda[i][4].substring(list_denda[i][4].indexOf("titipan"), list_denda[i][4].indexOf("\" class"))).val();
					list_data_denda.push({
						deskripsi: list_denda[i][1],
						no_angsuran: list_denda[i][2],
						denda: accounting.unformat(list_denda[i][3]),
						titipan: accounting.unformat(titipan_2),
						tanggal: list_denda[i][5]
					});
				}
			}
			console.log(list_data_denda);
			saldo_titip_ke_denda = accounting.unformat($('#inp-saldo-titipan-denda').val());
			nomor_kontrak_id_titip_ke_denda = $('#inp-contract-id-titipan-denda').val();
			if (nomor_kontrak_titip_ke_denda.length !== 12) {
				alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
				$('#nokontrak-validasi-titip-todenda, #validasi-nasabah-titip-todenda, #validasi-saldo-titip-todenda').addClass('has-error');
				console.log('gagal, validasi 2')
			} else if ($('.check_titip_denda').is(':checked') == false) {
				alert_error("detail data belum dipilih");
			} else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah anda yakin ingin menyimpan data ini?", function() {
                	$.ajax({
                		url: base_url + "Controller_deposit_to_ar/insert_titipan_ke_denda",
                		type: 'POST',
                		dataType: 'json',
                		data: {
                			branch_id: kode_cabang_detail,
                			saldo: saldo_titip_ke_denda,
                			nomor_kontrak_id: nomor_kontrak_id_titip_ke_denda,
                			ListTitipDenda: list_data_denda
                		},
                		success: function(response) {
                			console.log(response);
                			if (response) {
                				try {
                					if (response['Status'] === '200') {
                                        //
                                        $('#inp-memo-titipan-denda').val(response['NoMemo']);
                                        alert_info("Data Dengan Nomor Laporan " + response['NoMemo'] + " Berhasil Disimpan");
                                        $('#btn-save-titipan-denda, #search-no-kontrak-titipan-denda').prop('disabled', true);
                                        $('#btn-confirm-titipan-denda, #btn-cancel-titipan-denda').prop('disabled', false);
                                        $('.check_titip_denda').prop('disabled', true);
                                        $('#check-all-titipdenda').prop('disabled', true);
                                        $('.inp-titipan').prop('disabled', true);
                                        $('#inp-no-kontrak-titipan-denda').prop('disabled', true);
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

/*--------------------------- 2 button simpan titipan ke denda ---------------------------*/


/*--------------------------- 2 button konfirmasi titipan ke denda ---------------------------*/
$('#btn-confirm-titipan-denda').click(
	function() {
		if (check_session() === 'true') {
			var list_denda = table_titipan_ke_denda.data();
			console.log(list_denda);
			var list_data_denda = [];
			var titipan2 = '';
			for (var i = 0; i < list_denda.length; i++) {
				if ($('#check-titip-dendas' + i).is(":checked")) {
					titipan2 = accounting.unformat($('#titipan' + i).val());
					var titipan_2 = 0;
					if (list_denda[i][4].includes("type=")) {
						titipan_2 = $('#' + list_denda[i][4].substring(list_denda[i][4].indexOf("titip"), list_denda[i][4].indexOf("\" class"))).val();
					} else {
						titipan_2 = list_denda[i][4];
					}
					list_data_denda.push({
						deskripsi: list_denda[i][1],
						no_angsuran: list_denda[i][2],
						denda: accounting.unformat(list_denda[i][3]),
						titipan: accounting.unformat(titipan_2),
						tanggal: list_denda[i][5]
					});
				}
			}
			console.log(list_data_denda);
			nomor_memo_titip_denda = $('#inp-memo-titipan-denda').val();
			saldo_titip_ke_denda = accounting.unformat($('#inp-saldo-titipan-denda').val());
			nama_nasabah_titip_ke_denda = $('#inp-nama-nasabah-titipan-denda').val();
			nomor_kontrak_titip_ke_denda = $('#inp-no-kontrak-titipan-denda').val();
			nomor_kontrak_id_titip_ke_denda = $('#inp-contract-id-titipan-denda').val();

			if (nomor_kontrak_titip_ke_denda.length !== 12) {
				alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
				$('#nokontrak-validasi-titip-todenda, #validasi-nasabah-titip-todenda, #validasi-saldo-titip-todenda').addClass('has-error');
				console.log('gagal, validasi 2')
			} else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah anda yakin ingin konfirmasi data ini?", function() {
                	$.ajax({
                		url: base_url + "Controller_deposit_to_ar/confirm_titipan_ke_denda",
                		type: 'POST',
                		dataType: 'json',
                		data: {
                			branch_id: kode_cabang_detail,
                			saldo: saldo_titip_ke_denda,
                			nomor_memo: nomor_memo_titip_denda,
                			nomor_contract_id: nomor_kontrak_id_titip_ke_denda,
                			nomor_contract: nomor_kontrak_titip_ke_denda,
                			ListTitipDenda: list_data_denda
                		},
                		success: function(response) {
                			console.log(response);
                			if (response) {
                				try {
                					if (response['Status'] === '200') {
                						alert_info("Data Dengan Nomor Laporan " + nomor_memo_titip_denda + " Berhasil Dikonfirmasi", function() {
                							$('#btn-save-titipan-denda, #btn-confirm-titipan-denda, #btn-cancel-titipan-denda').prop('disabled', true);
                							$('#btn-print-titipan-denda').prop('disabled', false);
                						});
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

/*--------------------------- 2 button konfirmasi titipan ke denda ---------------------------*/


/*--------------------------- 2 button batal titipan ke denda ---------------------------*/
$('#btn-cancel-titipan-denda').click(
	function() {
		if (check_session() === 'true') {
			nomor_memo_titip_denda = $('#inp-memo-titipan-denda').val();
			saldo_titip_ke_denda = accounting.unformat($('#inp-saldo-titipan-denda').val());
			nama_nasabah_titip_ke_denda = $('#inp-nama-nasabah-titipan-denda').val();
			nomor_kontrak_titip_ke_denda = $('#inp-no-kontrak-titipan-denda').val();
			nomor_kontrak_id_titip_ke_denda = $('#inp-contract-id-titipan-denda').val();
			if (nomor_kontrak_titip_ke_denda.length !== 12) {
				alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
				$('#nomemo-validasi-titip-todenda, #validasi-nasabah-titip-toar, #validasi-saldo-titip-toar').addClass('has-error');
				console.log('gagal, validasi 2')
			} else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah anda yakin ingin membatalkan data ini?", function() {
                	$.ajax({
                		url: base_url + "Controller_deposit_to_ar/cancel_overbook",
                		type: 'POST',
                		dataType: 'json',
                		data: {
                			branch_id: kode_cabang_detail,
                			nomor_memo: nomor_memo_titip_denda
                		},
                		success: function(response) {
                			console.log(response);
                			if (response) {
                				try {
                					if (response['Status'] === '200') {
                						alert_info("Data Dengan Nomor Laporan " + nomor_memo_titip_denda + " Berhasil Dibatalkan");
                						$('#btn-save-titipan-denda, #btn-confirm-titipan-denda, #btn-cancel-titipan-denda').prop('disabled', true);
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

/*--------------------------- 2 button batal titipan ke denda ---------------------------*/

/*--------------------------- 2 button print titipan ke denda ---------------------------*/

$('#btn-print-titipan-denda').click(
	function(){	
		if (check_session() === 'true') {
			nomor_memo_titip_denda = $('#inp-memo-titipan-denda').val();
			saldo_titip_ke_denda = accounting.unformat($('#inp-saldo-titipan-denda').val());
			nama_nasabah_titip_ke_denda = $('#inp-nama-nasabah-titipan-denda').val();		
			nomor_kontrak_titip_ke_denda = $('#inp-no-kontrak-titipan-denda').val();
			nomor_kontrak_id_titip_ke_denda = $('#inp-contract-id-titipan-denda').val();		
			if (nomor_kontrak_titip_ke_denda.length !== 12 && nomor_memo_titip_denda == null) {
				alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
				$('#nokontrak-validasi-titip-todenda, #validasi-nasabah-titip-todenda, #validasi-saldo-titip-todenda ').addClass('has-error');
				console.log('gagal, validasi 2')
			}
			else
			{			
			//alert_error("lolos validasi simpan titipan to ar");		
			alert_confirm("APAKAH ANDA YAKIN MENCETAK DATA INI?", function(){
				$.ajax({
					url: base_url+"Controller_deposit_to_ar/print_titipan_to_denda",
					type: 'POST',
					dataType: 'json',
					data: {
						branch_id: kode_cabang_detail, //"0104"
						nomor_contract: nomor_kontrak_titip_ke_denda, //"010417001700"
						nomor_memo: nomor_memo_titip_denda //"010418O00151"
					},
					success:function(response){
						console.log(response);
						if (response) {
							try{
								if (response['status'] === '1') {			
									alert_info("Data Dengan Nomor Laporan " +nomor_memo_titip_denda+ " Berhasil Dicetak");
									$('#btn-save-titipan-denda, #btn-confirm-titipan-denda, #btn-cancel-titipan-denda').prop('disabled', true);
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

/*--------------------------- 2 button print titipan ke denda ---------------------------*/


