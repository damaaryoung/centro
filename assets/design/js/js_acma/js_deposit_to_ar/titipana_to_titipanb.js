/*variabel titip ke ar */
var nomor_memo_akeb = '';//$('#inp-memo-titipan-akeb');
var nomor_kontrak_titip_a = '';//$('#inp-no-kontrak-titipan-a');
var nomor_kontrak_titip_b = '';//$('#inp-no-kontrak-titipan-b');


$('#table-titipanA-ketitipanB').on('keydown', '.inp_angka_ovb', function(e) {
	-1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
});



/*--------------------------- search nomor kontrak tab titipana to titipanb ----------------------------*/
$('#search-no-kontrak-titipana-titipanb').click(
	function() {
		if (check_session() === 'true') {
			select_branch = $('#slc-branch-depositar').val();
			console.log(select_branch);
			nomor_kontrak_titip_a = $('#inp-no-kontrak-titipan-a').val();
			nomor_kontrak_titip_b = $('#inp-no-kontrak-titipan-b').val();
			$('#check-all-titipa-to-titipb').prop('checked', false);
            //nama_cabang = $('#branch-code').val();
            console.log(nomor_kontrak_titip_ke_ar);
            if (nomor_kontrak_titip_a === '' && nomor_kontrak_titip_b === '' && select_branch === '') {
            	alert_error("Silahkan isi nomor kontrak dan pilih cabang");
            	$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b, #div-list-branch').addClass('has-error');
            } else if (nomor_kontrak_titip_a === '' && nomor_kontrak_titip_b === '' && select_branch !== '') {
            	alert_error("Silahkan isi nomor kontrak");
            	$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b').addClass('has-error');
            	$('#div-list-branch').removeClass('has-error');
            } else if (nomor_kontrak_titip_a.length !== 12 && nomor_kontrak_titip_b !== 12 && select_branch === '') {
            	alert_error("Silahkan isi 12 digit nomor kontrak a, kontrak b dan pilih cabang");
            	$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b, #div-list-branch').addClass('has-error');
            } else if (nomor_kontrak_titip_a.length !== 12 && nomor_kontrak_titip_b.length !== 12 && select_branch !== '') {
            	alert_error("Silahkan isi 12 digit nomor kontrak");
            	$('#nokontrak-validasi-titip-a, nokontrak-validasi-titip-b').addClass('has-error');
            	$('#div-list-branch').removeClass('has-error');
            } else if (nomor_kontrak_titip_a !== '' && nomor_kontrak_titip_b !== '' && select_branch === '') {
            	alert_error("pilih cabang");
            	$('#div-list-branch').addClass('has-error');
            	$('#nokontrak-validasi-titip-a, nokontrak-validasi-titip-b').removeClass('has-error');
            } else {
            	$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b').removeClass('has-error');
            	console.log(select_branch);
            	$.ajax({
            		url: base_url + "Controller_deposit_to_ar/search_data_titip_atob",
            		type: 'POST',
            		dataType: 'json',
            		data: {
            			nomor_contract_a: nomor_kontrak_titip_a,
            			nomor_contract_b: nomor_kontrak_titip_b,
            			branch_id: select_branch
            		},
            		cache: false,
            		success: function(response) {
            			console.log(response);
            			if (response) {
            				try {
            					if (response['Status'] == "500") {
            						console.log(response);
            						alert_error(response['ErrorMessage']);
            					} else {
            						console.log(response);
            						table_titipana_ke_titipanb.clear();
            						$.each(response['ListTitipAToB'], function(index) {
            							table_titipana_ke_titipanb.row.add([
            								'<input id= "check-titipa-to-titipbs' + index + '" class="check_titipa_totitipb" type="checkbox">',
            								response['ListTitipAToB'][index]['contract_ida'],
            								response['ListTitipAToB'][index]['contract_noa'],
            								response['ListTitipAToB'][index]['nama_a'],
            								response['ListTitipAToB'][index]['installment_a'],
            								accounting.formatMoney(response['ListTitipAToB'][index]['jumlah_a'], '', 2, ',', '.'),
            								response['ListTitipAToB'][index]['tanggal'],
            								response['ListTitipAToB'][index]['contract_idb'],
            								response['ListTitipAToB'][index]['contract_nob'],
            								response['ListTitipAToB'][index]['nama_b'],
            								response['ListTitipAToB'][index]['installment_b'],
            								'<input id= "jumlahb' + index + '" class="form-control inp_angka_ovb input-smn jmlh-b" type="text" onclick="unformatuangovb(\'jumlahb' + index + '\')" onblur="formatuangovb(\'jumlahb' + index + '\')" value = ' + accounting.formatMoney(response['ListTitipAToB'][index]['jumlah_b'], '', 2, ',', '.') + ' ></input>',
            								]).draw(false);
            						});
            						t_ab_check = $('.check_titipa_totitipb').not("#check-all-titipa-to-titipb").length;
            						$('#btn-save-titipan-a-ke-b').prop('disabled', false);
            					}
            				} catch (e) {
            					console.log(response);
            					console.log(e);
            				}
            			}
            		},
            		error: function(response) {
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
$('#reset-data-titipana-titipanb').click(
	function(){
		enabledfield();
		$('#inp-no-kontrak-titipan-a, #inp-no-kontrak-titipan-b, #inp-memo-titipan-akeb').val('');
		table_titipana_ke_titipanb.clear().draw();		
		$('.chk-list').prop('checked', false);
		$('#btn-save-titipan-a-ke-b, #btn-confirm-titipan-a-ke-b, #btn-print-titipan-a-ke-b, #btn-cancel-titipan-a-ke-b').prop('disabled', true);
		$('#inp-no-kontrak-titipan-a, #inp-no-kontrak-titipan-b').prop('readonly',false);
		$('#search-no-kontrak-titipana-titipanb').toggle(true);
		$('#check-all-titipa-to-titipb').prop('disabled',false);
		$('#check-all-titipa-to-titipb').prop('checked',false);
		$('#search-no-kontrak-titipana-titipanb').prop('disabled',false);
	});

function enabledfield (){
	$('#inp-no-kontrak-titipan-a, #inp-no-kontrak-titipan-b').prop('disabled', false);
}


/*--------------------------- reset data hasil pencarian titipan to ar ----------------------------*/

/*--------------------------- ambil value dari data table ----------------------------*/
var data_titipana_ke_titipanb = '';
var nomor_contract_a = [];
var nama_a = [];
var jumlah_a = [];
var tgl_transaksi_a = [];
var nomor_contract_b = [];
var nama_b = [];
var jumlah_b = [];
var t_ab_check = 0;
$('#table-titipanA-ketitipanB tbody').on('click', '.check_titipa_totitipb', function(){
	console.log(this);
	var t_ab_check2 = $('.check_titipa_totitipb:checked').not("#check-all-titipa-to-titipb").length;	
	if (this.checked == false) {
		$('#check-all-titipa-to-titipb').prop('checked',false);
	}else{
		if (t_ab_check == t_ab_check2) {
			$('#check-all-titipa-to-titipb').prop('checked',true);
		}
	}
	data_titipana_ke_titipanb = table_titipana_ke_titipanb.row($(this).parents('tr')).data();	
	var selector = data_titipana_ke_titipanb[11].substring(data_titipana_ke_titipanb[11].indexOf("jumlahb"),data_titipana_ke_titipanb[11].indexOf("\" class"));
	console.log(data_titipana_ke_titipanb);
});

$('#check-all-titipa-to-titipb').click(
	function(){
		console.log('masuk ke check all');
		if ($('#check-all-titipa-to-titipb').is(':checked')){
			$('.check_titipa_totitipb').prop('checked', true);
			data_titipana_ke_titipanb = table_titipana_ke_titipanb.row($(this).parents('th')).data();
			console.log("checklist berhasil titipana ke titipanb");			
		}else{
			$('.check_titipa_totitipb').prop('checked', false);
			console.log("checklist dibatalkan titipana ke titipanb");
		}
	}); 

/*--------------------------- ambil value dari data table ----------------------------*/

/*--------------------------- 4 button simpan titipan a ke titipan b  ---------------------------*/
$('#btn-save-titipan-a-ke-b').click(
	function() {
		if (check_session() === 'true') {
			kode_cabang_detail = $('#slc-branch-depositar').val();
			var list_titipab = table_titipana_ke_titipanb.data();
			console.log(list_titipab);

			var list_data_titipab = [];
			var jumlah1 = '';
			var jumlah2 = '';
			for (var i = 0; i < list_titipab.length; i++) {
				if ($('#check-titipa-to-titipbs' + i).is(":checked")) {
					jumlah2 = accounting.unformat($('#jumlahb' + i).val());

					var jumlah_nilaib = $('#' + list_titipab[i][11].substring(list_titipab[i][11].indexOf("jumlahb"), list_titipab[i][11].indexOf("\" class"))).val();
					list_data_titipab.push({
						contract_ida: list_titipab[i][1],
						installment_a: list_titipab[i][4],
						jumlah_a: accounting.unformat(list_titipab[i][5]),
						contract_idb: list_titipab[i][7],
						nama_b: list_titipab[i][9],
						installment_b: list_titipab[i][10],
						jumlah_b: accounting.unformat(jumlah_nilaib),
						tanggal: list_titipab[i][6]
					});
				}

				if (jumlah2 > accounting.unformat(list_titipab[i][5])) {
					alert_error('Proses tidak dapat dilanjutkan, karena jumlah B melebihi dari jumlah A');
					return false;
				}
			}

            //console.log(jumlah_a);
            nomor_kontrak_titip_a = $('#inp-no-kontrak-titipan-a').val();
            nomor_kontrak_titip_b = $('#inp-no-kontrak-titipan-b').val();
            if (nomor_kontrak_titip_a.length !== 12 && nomor_kontrak_titip_b.length !== 12) {
            	alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
            	$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b').addClass('has-error');
            	console.log('gagal, validasi 2')
            } else if ($('.check_titipa_totitipb').is(':checked') == false) {
            	alert_error("detail data belum dipilih");
            } else {
            	alert_confirm("Apakah anda yakin ingin menyimpan data ini?", function() {
            		$.ajax({
            			url: base_url + "Controller_deposit_to_ar/insert_titip_atob",
            			type: 'POST',
            			dataType: 'json',
            			data: {
            				branch_id: kode_cabang_detail,
            				ListTitipAToB: list_data_titipab
            			},
            			success: function(response) {
            				console.log(response);
            				if (response) {
            					try {
            						if (response['Status'] === '200') {
                                        //
                                        $('#inp-memo-titipan-akeb').val(response['NoMemo']);
                                        alert_info("Data Dengan Nomor Laporan " + response['NoMemo'] + " Berhasil Disimpan");
                                        $('#btn-save-titipan-a-ke-b').prop('disabled', true);
                                        $('#btn-confirm-titipan-a-ke-b, #btn-cancel-titipan-a-ke-b').prop('disabled', false);
                                        $('.jmlh-b').prop('disabled', true);
                                        $('#inp-no-kontrak-titipan-a').prop('disabled', true);
                                        $('#inp-no-kontrak-titipan-b').prop('disabled', true);
                                        $('.check_titipa_totitipb').prop('disabled', true);
                                        $('#check-all-titipa-to-titipb').prop('disabled', true);
                                        $('#search-no-kontrak-titipana-titipanb').prop('disabled', true);
                                    } else if (response['Status'] === '500') {
                                    	alert_error(response['ErrorMessage']);
                                    } else {
                                    	alert_error(response['ErrorMessage']);
                                    }
                                } catch (e) {
                                	$('#loading-ajax').hide();
                                    console.log(e);
                                	alert_error(e);
                                }
                            }
                        },
                        error: function(response) {
                            console.log(response);
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

/*--------------------------- 4 button simpan titipan a ke titipan b  ---------------------------*/


/*--------------------------- 4 button konfirmasi titipan a ke titipan b  ---------------------------*/
$('#btn-confirm-titipan-a-ke-b').click(
	function() {
		if (check_session() === 'true') {
			var list_titipab = table_titipana_ke_titipanb.data();
			console.log(list_titipab);
			var list_data_titipab = [];
			for (var i = 0; i < list_titipab.length; i++) {
				if ($('#check-titipa-to-titipbs' + i).is(":checked")) {
					jumlah2 = accounting.unformat($('#jumlahb' + i).val());
					var jumlah_nilaib = 0;
					if (list_titipab[i][11].includes("type=")) {
						jumlah_nilaib = $('#' + list_titipab[i][11].substring(list_titipab[i][11].indexOf("jumlahb"), list_titipab[i][11].indexOf("\" class"))).val();
					} else {
						jumlah_nilaib = list_titipab[i][11];
					}
					list_data_titipab.push({
						contract_ida: list_titipab[i][1],
						contract_noa: list_titipab[i][2],
						installment_a: list_titipab[i][4],
						jumlah_a: accounting.unformat(list_titipab[i][5]),
						contract_idb: list_titipab[i][7],
						contract_nob: list_titipab[i][8],
						installment_b: list_titipab[i][10],
						jumlah_b: accounting.unformat(jumlah_nilaib),
						tanggal: list_titipab[i][6]
					});
				}
			}
			console.log(list_data_titipab);
			nomor_memo_akeb = $('#inp-memo-titipan-akeb').val();
			nomor_kontrak_titip_a = $('#inp-no-kontrak-titipan-a').val();
			nomor_kontrak_titip_b = $('#inp-no-kontrak-titipan-b').val();

			if (nomor_kontrak_titip_a.length !== 12 && nomor_kontrak_titip_b.length !== 12) {
				alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
				$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b, #nomemo-validasi-titip-akeb').addClass('has-error');
				console.log('gagal, validasi 2')
			} else if ($('.check_titipa_totitipb').is(':checked') == false) {
				alert_error("detail data belum dipilih");
			} else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah anda yakin ingin konfirmasi data ini?", function() {
                	$.ajax({
                		url: base_url + "Controller_deposit_to_ar/confirm_titip_atob",
                		type: 'POST',
                		dataType: 'json',
                		data: {
                			branch_id: kode_cabang_detail,
                			nomor_memo: nomor_memo_akeb,
                			ListTitipAToB: list_data_titipab
                		},
                		success: function(response) {
                			console.log(response);
                			if (response) {
                				try {
                					if (response['Status'] === '200') {
                                        //							
                                        alert_info("Data Dengan Nomor Laporan " + nomor_memo_akeb + " Berhasil Dikonfirmasi");
                                        $('#btn-save-titipan-a-ke-b, #btn-confirm-titipan-a-ke-b, #btn-cancel-titipan-a-ke-b').prop('disabled', true);
                                        $('#btn-print-titipan-a-ke-b').prop('disabled', false);
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

/*--------------------------- 4 button konfirmasi titipan a ke titipan b ---------------------------*/

/*--------------------------- 4 button batal titipan a ke titipan b ---------------------------*/
$('#btn-cancel-titipan-a-ke-b').click(
    function() {
        if (check_session() === 'true') {
            nomor_memo_akeb = $('#inp-memo-titipan-akeb').val();
            if (nomor_memo_akeb === '') {
                alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
                $('#nomemo-validasi-titip-akeb, #nokontrak-validasi-titip-b').addClass('has-error');
                console.log('gagal, validasi a ke b')
            } else {
                alert_confirm("Apakah anda yakin ingin membatalkan data ini?", function() {
                    $.ajax({
                        url: base_url + "Controller_deposit_to_ar/cancel_overbook",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            branch_id: kode_cabang_detail,
                            nomor_memo: nomor_memo_akeb
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['Status'] === '200') {
                                        alert_info("Data Dengan Nomor Laporan " + nomor_memo_akeb + " Berhasil Dibatalkan");
                                        $('#btn-save-titipan-a-ke-b, #btn-confirm-titipan-a-ke-b, #btn-cancel-titipan-a-ke-b').prop('disabled', true);
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

/*--------------------------- 4 batal titipan a ke titipan b ---------------------------*/

/*--------------------------- 3 button cetak titipan tanpa nama ke titipan ---------------------------*/
$('#btn-print-titipan-a-ke-b').click(
    function() {
        if (check_session() === 'true') {
            nomor_memo_akeb = $('#inp-memo-titipan-akeb').val();
            nomor_kontrak_titip_a = $('#inp-no-kontrak-titipan-a').val();
            nomor_kontrak_titip_b = $('#inp-no-kontrak-titipan-b').val();
            if (nomor_memo_akeb == '') {
                alert_error("Nomor memo masih kosong");
                $('#inp-memo-titipan-akeb').addClass('has-error');
            } else if (nomor_kontrak_titip_a.length !== 12 && nomor_kontrak_titip_b.length !== 12) {
                alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
                $('#nomemo-validasi-titip-akeb, #nokontrak-validasi-titip-b').addClass('has-error');
                console.log('gagal, print titipan a ke b')
            } else {
                alert_confirm("Apakah anda yakin ingin mencetak data ini?", function() {
                    $.ajax({
                        url: base_url + "Controller_deposit_to_ar/print_titipana_titipanb",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            nomor_contract_a: nomor_kontrak_titip_a,
                            nomor_contract_b: nomor_kontrak_titip_b,
                            branch_id: kode_cabang_detail,
                            nomor_memo: nomor_memo_akeb
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['status'] === '1') {
                                        alert_info("Data Dengan Nomor Laporan " + nomor_memo_akeb + " Berhasil Dicetak");
                                        $('#btn-save-titipan-a-ke-b, #btn-confirm-titipan-a-ke-b, #btn-cancel-titipan-a-ke-b').prop('disabled', true);
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

/*--------------------------- 3 button cetak titipan tanpa nama ke titipan ---------------------------*/




