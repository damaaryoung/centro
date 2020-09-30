/*variabel titip ke ar */
var nomor_memo_titip_ar = '';
var nomor_kontrak_id_titip_ke_ar = '';
var nomor_kontrak_titip_ke_ar = '';
var nama_nasabah_titip_ke_ar = '';
var saldo_titip_ke_ar = '';


/*--------------------------- search nomor kontrak tab titipan to ar ----------------------------*/
$('#search-no-kontrak-titipan-ar').click(
	function() {
		if (check_session() === 'true') {
			$('#inp-memo-titipan-ar, #inp-nama-nasabah-titipan-ar, #inp-saldo-titipan-ar').val('');
			$('.chk-list').prop('checked', false);
			$('#btn-print-titipan-ar').prop('disabled', true);
			console.log(select_branch);
			nomor_kontrak_titip_ke_ar = $('#inp-no-kontrak-titipan-ar').val();
            //nama_cabang = $('#branch-code').val();
            console.log(select_branch, nomor_kontrak_titip_ke_ar)
            if (nomor_kontrak_titip_ke_ar === '' && kode_cabang_detail === '') {
            	alert_error("Silahkan isi nomor kontrak dan pilih cabang");
            	$('#nokontrak-validasi-titip-toar, #div-list-branch').addClass('has-error');
            } else if (nomor_kontrak_titip_ke_ar === '' && kode_cabang_detail !== '') {
            	alert_error("Silahkan isi nomor kontrak");
            	$('#nokontrak-validasi-titip-toar').addClass('has-error');
            	$('#div-list-branch').removeClass('has-error');
            } else if (nomor_kontrak_titip_ke_ar.length !== 12 && select_branch === '') {
            	alert_error("Silahkan isi 12 digit nomor kontrak dan pilih cabang");
            	$('#nokontrak-validasi-titip-toar, #div-list-branch').addClass('has-error');
            } else if (nomor_kontrak_titip_ke_ar.length !== 12 && select_branch !== '') {
            	alert_error("Silahkan isi 12 digit nomor kontrak");
            	$('#nokontrak-validasi-titip-toar').addClass('has-error');
            	$('#div-list-branch').removeClass('has-error');
            } else if (nomor_kontrak_titip_ke_ar !== '' && kode_cabang_detail === '') {
            	alert_error("pilih cabang");
            	$('#div-list-branch').addClass('has-error');
            	$('#nokontrak-validasi-titip-toar').removeClass('has-error');
            } else {
            	$('#nokontrak-validasi-titip-toar, #validasi-nasabah-titip-toar, #validasi-saldo-titip-toar, #div-list-branch').removeClass('has-error');
            	console.log(select_branch);
            	$.ajax({
            		url: base_url + "Controller_deposit_to_ar/search_data_titip_ar",
            		type: 'POST',
            		dataType: 'json',
            		data: {
            			nomor_contract: nomor_kontrak_titip_ke_ar,
            			branch_id: select_branch
            		},
            		cache: false,
            		success: function(response) {
            			console.log(response);
            			if(response){
            				try {
            					if (response['Status'] == '500') {
            						console.log(response);
            						alert_error(response['ErrorMessage']);
            					} else if (response['Status'] !== '200') {
            						alert_error(response['ErrorMessage']);
            					} else {

            						var list_data_ar = [];
            						var x = 0;
            						console.log(response);
            						$('#btn-save-titipan-ar').prop('disabled', false);
            						$('#inp-contract-id-titipan-ar').val(response['contract_id']);
            						$('#inp-nama-nasabah-titipan-ar').val(response['nama_nasabah']);
            						$('#inp-saldo-titipan-ar').val(accounting.formatMoney(response['saldo'], '', 2, ',', '.'));
            						x = response.ListTitipAr.length - 1;

            						console.log(x);
            						for (var i = 0; i < response.ListTitipAr.length; i++) {
            							list_data_ar.push({
            								deskripsi: response['ListTitipAr'][x]['deskripsi'],
            								nominal_angsuran: accounting.formatMoney(response['ListTitipAr'][x]['angsuran'], '', 2, ',', '.'),
            								no_angsuran: response['ListTitipAr'][x]['angsuran_ke'],
            								tanggal_penerimaan: response['ListTitipAr'][x]['tgl_penerimaan']
            							});
            							x = x - 1;
            						}
            						console.log(list_data_ar);
            						table_titipan_ke_ar.clear();

            						for (var y = 0; y < list_data_ar.length; y++) {
            							table_titipan_ke_ar.row.add([
            								'<input disabled="" id="check-angsurans' + y + '" class="check_angsuran chk-box" type="checkbox">',
            								list_data_ar[y]['deskripsi'],
            								list_data_ar[y]['nominal_angsuran'],
            								list_data_ar[y]['no_angsuran'],
            								list_data_ar[y]['tanggal_penerimaan'],
            								]).draw(false);

            						}
            						n_check = $('.check_angsuran').not("#check-all-angsuran").length - 1;
            						$('#check-angsurans0').prop('disabled', false);
            					}
            				} catch (e) {
            					alert_error(e);
            				}
            			}            			
            		},
            		error: function(response) {
            			alert_error(response);

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
$('#reset-data-titipan-ar').click(
	function() {
		$('.res-global').val('');
		table_titipan_ke_ar.clear().draw();
		$('.chk-list').prop('checked', false);
		$('#check-all-angsuran').prop('disabled', false);
		$('#btn-save-titipan-ar, #btn-confirm-titipan-ar, #btn-print-titipan-ar, #btn-cancel-titipan-ar').prop('disabled', true);
		$('#inp-no-kontrak-titipan-ar').prop('readonly', false);
		$('#inp-no-kontrak-titipan-ar').prop('disabled', false);
		$('#search-no-kontrak-titipan-ar').toggle(true);
		$('#search-no-kontrak-titipan-ar').prop('disabled', false);

	});

/*--------------------------- reset data hasil pencarian titipan to ar ----------------------------*/



/*--------------------------- ambil value dari data table ----------------------------*/
var data_titipan_ke_ar = '';
var deskripsi = [];
var nominal_angsuran = [];
var no_angsuran = [];
var tanggal_peneriamaan = [];
var n_check = 0;
$('#table-titipan-ke-ar tbody').on('click', '.check_angsuran', function() {
	console.log(this);

    /*var pages = table_titipan_ke_ar.page();
    var limits = table_titipan_ke_ar.page.len();
    var table_leng = table_titipan_ke_ar.rows().data().length ;
    var search  = table_titipan_ke_ar.search();

    table_titipan_ke_ar.search("");
    table_titipan_ke_ar.page.len(table_leng);
    table_titipan_ke_ar.draw();*/

    var id_next = this.id.substring(15, 18);
    id_next = Number(id_next);
    id_next = id_next + 1;
    var id_next_a = this.id.substring(15, 18);

    if (this.checked == false) {
    	$('#check-angsurans' + id_next).prop('disabled', true);
    	$('#check-all-angsuran').prop('checked', false);
    	for (var i = 0; i < $('.check_angsuran').length; i++) {

    		if (i > id_next_a) {
    			$('#check-angsurans' + i).prop('checked', false);
    			$('#check-angsurans' + i).prop('disabled', true);
    		}
    	}
    } else {
    	$('#check-angsurans' + id_next).prop('disabled', false);
    	if ($('#check-angsurans' + n_check).is(":checked")) {
    		$('#check-all-angsuran').prop('checked', true);
    	}


    }
    /*table_titipan_ke_ar.search(search);
    	table_titipan_ke_ar.page.len(limits);
    	table_titipan_ke_ar.draw();
    	table_titipan_ke_ar.page( pages ).draw( 'page' );*/

    	data_titipan_ke_ar = table_titipan_ke_ar.row($(this).parents('tr')).data();
    	console.log(data_titipan_ke_ar);
    });



$('#check-all-angsuran').click(
	function() {

        /*var pages = table_titipan_ke_ar.page();
        var limits = table_titipan_ke_ar.page.len();
        var table_leng = table_titipan_ke_ar.rows().data().length ;
        var search  = table_titipan_ke_ar.search();

        table_titipan_ke_ar.search("");
        table_titipan_ke_ar.page.len(table_leng);
        table_titipan_ke_ar.draw();*/
        console.log('masuk, check all titipan ke angsuran fungsi berjalan');


        console.log('check all');

        if ($('#check-all-angsuran').is(':checked')) {
        	$('.check_angsuran').prop('checked', true);
        	$('.check_angsuran').prop('disabled', false);

        	data_titipan_ke_ar = table_titipan_ke_ar.row($(this).parents('th')).data();
        	console.log("checklist all berhasil titipan ke angsuran");
        } else {
        	$('.check_angsuran').prop('checked', false);
        	$('.check_angsuran').prop('disabled', true);
        	console.log("checklist dibatalkan titipan ke angsuran");
        	$('#check-angsurans0').prop('disabled', false);
        }
        /*table_titipan_ke_ar.search(search);
        table_titipan_ke_ar.page.len(limits);
        table_titipan_ke_ar.draw();
        table_titipan_ke_ar.page( pages ).draw( 'page' );*/
    });

/*--------------------------- ambil value dari data table ----------------------------*/

/*--------------------------- 1 button simpan titipan ke angsuran ---------------------------*/
$('#btn-save-titipan-ar').click(
	function() {
		if (check_session() === 'true') {
			var list_angsuran = table_titipan_ke_ar.data();
			console.log(list_angsuran);

			var list_data_angsuran = [];
			for (var i = 0; i < list_angsuran.length; i++) {
				if ($('#check-angsurans' + i).is(":checked") || ($('#check-all-angsuran').is(":checked"))) {
					list_data_angsuran.push({
						deskripsi: list_angsuran[i][1],
						nominal_angsuran: accounting.unformat(list_angsuran[i][2]),
						no_angsuran: list_angsuran[i][3],
						tanggal_penerimaan: list_angsuran[i][4]
					});
				}
			}
			console.log(list_data_angsuran);
			nomor_memo_titip_ar = $('#inp-memo-titipan-ar').val();
			saldo_titip_ke_ar = accounting.unformat($('#inp-saldo-titipan-ar').val());
			nama_nasabah_titip_ke_ar = $('#inp-nama-nasabah-titipan-ar').val();
			nomor_kontrak_titip_ke_ar = $('#inp-no-kontrak-titipan-ar').val();
			nomor_kontrak_id_titip_ke_ar = $('#inp-contract-id-titipan-ar').val();

			if ($('.check_angsuran').is(':checked') == false) {
				alert_error("detail data belum dipilih");
				console.log('gagal, belum checklist datatable')
			} else  {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah anda yakin ingin menyimpan data ini?", function() {

                	$.ajax({
                		url: base_url + "Controller_deposit_to_ar/insert_titipan_ke_ar",
                		type: 'POST',
                		dataType: 'json',
                		cache: false,
                		data: {
                			nomor_contract_id: nomor_kontrak_id_titip_ke_ar,
                			branch_id: select_branch,
                			no_memo: nomor_memo_titip_ar,
                			nama_nasabah: nama_nasabah_titip_ke_ar,
                			saldo: saldo_titip_ke_ar,
                			ListTitipAr: list_data_angsuran
                		},
                		success: function(response) {
                			console.log(response);
                			if (response) {
                				try {
                					if (response['Status'] == '200') {
                						$('#inp-memo-titipan-ar').val(response['NoMemo']);
                						alert_info("Data Dengan Nomor Laporan " + response['NoMemo'] + " Berhasil Disimpan");
                						$('#btn-save-titipan-ar, #search-no-kontrak-titipan-ar').prop('disabled', true);
                						$('#btn-confirm-titipan-ar, #btn-cancel-titipan-ar').prop('disabled', false);
                						$('.check_angsuran').prop('disabled', true);
                						$('#check-all-angsuran').prop('disabled', true);
                						$('#inp-no-kontrak-titipan-ar').prop('disabled', true);

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
        }
        else if (check_session() === 'false') {
        	alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
        		localStorage.clear();
        		window.location.href = base_url + "Controller_login/login_view";
        	});
        }

    });

/*--------------------------- 1 button simpan titipan ke angsuran ---------------------------*/


/*--------------------------- 1 button konfirmasi titipan ke angsuran ---------------------------*/
$('#btn-confirm-titipan-ar').click(
	function() {
		if (check_session() === 'true') {
			var list_angsuran = table_titipan_ke_ar.data();
			console.log(list_angsuran);

			var list_data_angsuran = [];
			for (var i = 0; i < list_angsuran.length; i++) {
				if ($('#check-angsurans' + i).is(":checked") || ($('#check-all-angsuran').is(":checked"))) {
					list_data_angsuran.push({
						deskripsi: list_angsuran[i][1],
						nominal_angsuran: accounting.unformat(list_angsuran[i][2]),
						no_angsuran: list_angsuran[i][3],
						tanggal_penerimaan: list_angsuran[i][4]
					});
				}
			}
			console.log(list_data_angsuran);
            nomor_memo_titip_ar = $('#inp-memo-titipan-ar').val(); //$('#inp-memo-titipan-ar').val();
            saldo_titip_ke_ar = accounting.unformat($('#inp-saldo-titipan-ar').val());
            nomor_kontrak_id_titip_ke_ar = $('#inp-contract-id-titipan-ar').val();
            nama_nasabah_titip_ke_ar = $('#inp-nama-nasabah-titipan-ar').val();
            nomor_kontrak_titip_ke_ar = $('#inp-no-kontrak-titipan-ar').val();

            if ($('.check_angsuran').is(':checked') == false) {
            	alert_error("pilih data yang ingin dipilih");
                //$('#nokontrak-validasi-titip-toar, #validasi-nasabah-titip-toar, #validasi-saldo-titip-toar').addClass('has-error');
                console.log('gagal, validasi 2')
            } else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah anda yakin ingin konfirmasi data ini?", function() {
                	$.ajax({
                		url: base_url + "Controller_deposit_to_ar/confirm_titipan_ke_ar",
                		type: 'POST',
                		dataType: 'json',
                		data: {
                			nomor_contract_id: nomor_kontrak_id_titip_ke_ar,
                			nomor_contract: nomor_kontrak_titip_ke_ar,
                			branch_id: select_branch,
                			no_memo: nomor_memo_titip_ar,
                			nama_nasabah: nama_nasabah_titip_ke_ar,
                			saldo: saldo_titip_ke_ar,
                			ListTitipAr: list_data_angsuran
                		},
                		success: function(response) {
                			console.log(response);
                			if (response) {
                				try {
                					if (response['Status'] === '200') {
                						alert_info("Data Dengan Nomor Laporan " + nomor_memo_titip_ar + " Telah Dikonfirmasi", function() {
                							$('.btn-konfirmasi-ovb, .btn-cancel-ovb').prop('disabled', true);
                							$('.btn-print-ovb').prop('disabled', false);
                						});
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

/*--------------------------- 1 button konfirmasi titipan ke angsuran ---------------------------*/


/*--------------------------- 1 button batal titipan ke angsuran ---------------------------*/
$('#btn-cancel-titipan-ar').click(
	function() {
		if (check_session() === 'true') {
			nomor_memo_titip_ar = $('#inp-memo-titipan-ar').val();
			if (nomor_memo_titip_ar === '') {
				alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
				$('#nokontrak-validasi-titip-toar, #validasi-nasabah-titip-toar, #validasi-saldo-titip-toar').addClass('has-error');
				console.log('gagal, validasi 2')
			} else {
                    //alert_error("lolos validasi simpan titipan to ar");		
                    alert_info("APAKAH ANDA YAKIN MEMBATALKAN TRANSAKSI INI?", function() {
                    	$.ajax({
                    		url: base_url + "Controller_deposit_to_ar/cancel_overbook",
                    		type: 'POST',
                    		dataType: 'json',
                    		data: {
                    			branch_id: select_branch,
                    			nomor_memo: nomor_memo_titip_ar
                    		},
                    		success: function(response) {
                    			console.log(response);
                    			if (response){
                    				try{
                    					if (response['Status'] === '200') {
                    						alert_info("Data Dengan Nomor Laporan " + nomor_memo_titip_ar + " Telah Dibatalkan");
                    						$('#btn-save-titipan-ar, #btn-confirm-titipan-ar, #btn-print-titipan-ar, #btn-cancel-titipan-ar').prop('disabled', true);
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
            }
            else if (check_session() === 'false') {
            	alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
            		localStorage.clear();
            		window.location.href = base_url + "Controller_login/login_view";
            	});
            }

        });

/*--------------------------- 1 button print titipan ke angsuran ---------------------------*/

$('#btn-print-titipan-ar').click(
	function() {
		if (check_session() === 'true') {
			nomor_kontrak_titip_ke_ar = $('#inp-no-kontrak-titipan-ar').val();
			nomor_memo_titip_ar = $('#inp-memo-titipan-ar').val();
			if (nomor_kontrak_titip_ke_ar.length !== 12 && nomor_memo_titip_ar == null) {
				alert_error("NOMOR MEMO BELUM ADA ATAU NOMOR MEMO KURANG DARI 12 DIGIT");
				$('#nokontrak-validasi-titip-toar, #validasi-nasabah-titip-toar, #validasi-saldo-titip-toar').addClass('has-error');
				console.log('gagal, validasi 2')
			} else {
                    //alert_error("lolos validasi simpan titipan to ar");		
                    alert_confirm("APAKAH ANDA YAKIN MENCETAK DATA INI?", function() {
                    	$.ajax({
                    		url: base_url + "Controller_deposit_to_ar/print_titipan_to_ar",
                    		type: 'POST',
                    		dataType: 'json',
                    		data: {
                    			branch_id: select_branch,
                    			nomor_contract: nomor_kontrak_titip_ke_ar,
                    			nomor_memo: nomor_memo_titip_ar 
                    		},
                    		success: function(response) {
                    			console.log(response);
                    			if (response) {
                    				try {
                    					if (response['status'] === '1') {
                    						alert_info("Data Dengan Nomor Laporan " + nomor_memo_titip_ar + " Telah Dicetak");
                    						$('#btn-save-titipan-ar, #btn-confirm-titipan-ar, #btn-cancel-titipan-ar').prop('disabled', true);
                    						var printWindow = window.open();
                    						printWindow.document.write('<pre id = "printss"></pre>');
                    						printWindow.document.querySelector('pre').innerHTML = response['isi'];
                    						printWindow.document.close();
                    						printWindow.focus();
                    						printWindow.print();
                    						printWindow.close();
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

        /*--------------------------- 1 button print titipan ke angsuran ---------------------------*/