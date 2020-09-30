/*variabel denda ke titipan */
var nomor_memo_denda_ke_titip = ''; //$('#inp-memo-denda-ketitipan').val();
var nomor_kontrak_denda_ke_titip = '';//$('#inp-no-kontrak-denda-titipan').val();
var nomor_kontrak_id_denda_ke_titip = '';
var nama_nasabah_denda_ke_titip = '';//$('#inp-nama-nasabah-denda-titipan').val();
var saldo_denda_ke_titip = '';//$('#inp-saldo-denda-titipan').val();


/*--------------------------- search nomor kontrak tab denda to titipan ----------------------------*/

$('#search-no-kontrak-denda-titipan').click(	
	function(){	
		if (check_session() === 'true') {
			select_branch = $('#slc-branch-depositar').val();
			console.log(select_branch)
			nomor_kontrak_denda_ke_titip = $('#inp-no-kontrak-denda-titipan').val();
			saldo_denda_ke_titip = $('#inp-saldo-denda-titipan').val();		
			nama_cabang = $('#branch-code').val();
			console.log(nomor_kontrak_denda_ke_titip);
			if (nomor_kontrak_denda_ke_titip === ''  && select_branch === ''){
				alert_error("Silahkan isi nomor kontrak dan pilih cabang");
				$('#nokontrak-validasi-denda-titipan, #div-list-branch').addClass('has-error');
			}		
			else if (nomor_kontrak_denda_ke_titip === '' && select_branch !== '') {
				alert_error("Silahkan isi nomor kontrak");
				$('#nokontrak-validasi-denda-titipan').addClass('has-error');
				$('#div-list-branch').removeClass('has-error');
			}		
			else if (nomor_kontrak_denda_ke_titip.length !== 12 && select_branch ==='' ) {
				alert_error("Silahkan isi 12 digit nomor kontrak dan pilih cabang");
				$('#nokontrak-validasi-denda-titipan, #div-list-branch').addClass('has-error');		
			}		
			else if (nomor_kontrak_denda_ke_titip.length !== 12 && select_branch !=='' ) {
				alert_error("Silahkan isi 12 digit nomor kontrak");
				$('#nokontrak-validasi-denda-titipan').addClass('has-error');
				$('#div-list-branch').removeClass('has-error');
			}	
			else if (nomor_kontrak_denda_ke_titip !== '' && select_branch === '' ) {
				alert_error("pilih cabang");			
				$('#div-list-branch').addClass('has-error');
				$('#nokontrak-validasi-denda-titipan').removeClass('has-error');
			}	
			else
			{				
				$('#nokontrak-validasi-denda-titipan, #div-list-branch').removeClass('has-error');					
				console.log(select_branch);
				$.ajax({
					url: base_url+"Controller_deposit_to_ar/search_data_denda_titip",
					type: 'POST',
					dataType: 'json',
					data:{
						nomor_contract: nomor_kontrak_denda_ke_titip,
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
									$('#inp-nama-nasabah-denda-titipan').val(response['nama_nasabah']);
									$('#inp-contract-id-denda-titipan').val(response['contract_id']);																										
									$('#inp-saldo-denda-titipan').val(accounting.formatMoney(response['saldo'], '', 2, ',', '.'));								
									table_denda_ke_titipan.clear();
									$.each(response['ListDendaToTitip'], function(index){								
										table_denda_ke_titipan.row.add([								
											'<input id= "check-denda-titips' + index + '" class="check_denda_titip" type="checkbox">',								
											response['ListDendaToTitip'][index]['deskripsi'],
											response['ListDendaToTitip'][index]['no_angsuran'],									
											accounting.formatMoney(response['ListDendaToTitip'][index]['denda'], '', 2, ',', '.'),
											'<input id= "denda_overbook' + index + '" class="form-control inp-number input-smn inp-denda-ovb" type="text" onclick="unformatuangovb(\'denda_overbook' + index + '\')" onblur="formatuangovb(\'denda_overbook' + index + '\')" value = '+ accounting.formatMoney(response['ListDendaToTitip'][index]['denda_overbook'], '', 2, ',', '.') + '></input>',//(response['ListTitipDenda'][index]['titipan'], '', 2, ',', '.') +' ></input>',
											//accounting.formatMoney(response['ListDendaToTitip'][index]['denda_overbook'], '', 2, ',', '.'),									
											response['ListDendaToTitip'][index]['tanggal_penerimaan'],
											]).draw(false);														
									});
									d_t_check = $('.check_denda_titip').not("#check-all-dendatitip").length;
									$('#btn-save-denda-titipan').prop('disabled', false);
								}						
							}
							catch(e) {
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
/*--------------------------- search nomor kontrak tab denda to titipan ----------------------------*/

/*--------------------------- reset data hasil pencarian denda to titipan ----------------------------*/
$('#reset-data-denda-titipan').click(
	function(){
		$('.res-global').val('');
		table_denda_ke_titipan.clear().draw();	
		$('#btn-save-denda-titipan, #btn-confirm-denda-titipan, #btn-print-denda-titipan, #btn-cancel-denda-titipan').prop('disabled', true);
		$('#inp-no-kontrak-denda-titipan').prop('readonly',false);	
		$('#inp-no-kontrak-denda-titipan').prop('disabled',false);	
		$('#search-no-kontrak-denda-titipan').toggle(true);
		$('#check-all-dendatitip').prop('disabled', false);
		$('#check-all-dendatitip').prop('checked', false);
		$('#search-no-kontrak-titipan-denda').prop('disabled',false);
	});





/*--------------------------- reset data hasil pencarian denda to titipan ----------------------------*/

/*--------------------------- ambil value dari data table ----------------------------*/
var data_denda_ke_titipan = '';
var deskripsi = [];
var no_angsuran = [];
var denda = [];
var denda_overbook = [];
var tanggal_penerimaan = [];
var d_t_check = 0;



$('#table-denda-ke-titipan').on('click', '.check_denda_titip', function(){
	console.log(this);
	var d_t_check2 = $('.check_denda_titip:checked').not("#check-all-dendatitip").length;
	if (this.checked == false) {
		$('#check-all-dendatitip').prop('checked',false);
	}else{
		if (d_t_check == d_t_check2) {
			$('#check-all-dendatitip').prop('checked',true);
		}

	}
	data_denda_ke_titipan = table_denda_ke_titipan.row($(this).parents('tr')).data();
	var selector = data_denda_ke_titipan[4].substring(data_denda_ke_titipan[4].indexOf("denda_overbook"),data_denda_ke_titipan[4].indexOf("\" class"));	
	console.log(data_denda_ke_titipan);
});

$('#check-all-dendatitip').click(
	function(){
		console.log('masuk ke check all');
		if ($('#check-all-dendatitip').is(':checked')){
			$('.check_denda_titip').prop('checked', true);
			data_denda_ke_titipan = table_denda_ke_titipan.row($(this).parents('th')).data();
			console.log("checklist berhasil denda ke titipan");				
		}else{
			$('.check_denda_titip').prop('checked', false);
			console.log("checklist dibatalkan titipan ke ar");
		}
	}); 




/*--------------------------- ambil value dari data table ----------------------------*/


/*--------------------------- 8 button simpan data denda to titipan ---------------------------*/
$('#btn-save-denda-titipan').click(
    function() {
        if (check_session() === 'true') {
            kode_cabang_detail = $('#slc-branch-depositar').val();
            console.log(kode_cabang_detail);
            var list_dendatitipan = table_denda_ke_titipan.data();
            console.log(list_dendatitipan);
            var list_data_dendatitipan = [];
            var dendaoverbook = '';
            for (var i = 0; i < list_dendatitipan.length; i++) {
                if ($('#check-denda-titips' + i).is(":checked")) {
                	dendaoverbook = accounting.unformat($('#denda_overbook' + i).val());
                	var dendaoverbook_2 = $('#' + list_dendatitipan[i][4].substring(list_dendatitipan[i][4].indexOf("denda_overbook"), list_dendatitipan[i][4].indexOf("\" class"))).val();
                    list_data_dendatitipan.push({
                        deskripsi: list_dendatitipan[i][1],
                        no_angsuran: list_dendatitipan[i][2],
                        denda: accounting.unformat(list_dendatitipan[i][3]),
                        denda_overbook: accounting.unformat(dendaoverbook_2),
                        tanggal_penerimaan: list_dendatitipan[i][5]
                    });
                }
            }
            console.log(list_data_dendatitipan);
            saldo_denda_ke_titip = accounting.unformat($('#inp-saldo-denda-titipan').val());
            nomor_kontrak_id_denda_ke_titip = $('#inp-contract-id-denda-titipan').val();
            if (nomor_kontrak_denda_ke_titip.length !== 12) {
                alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
                $('#nokontrak-validasi-denda-titipan, #validasi-nasabah-denda-titipan, #validasi-saldo-denda-titipan').addClass('has-error');
                console.log('gagal, validasi 2')
            } else if ($('.check_denda_titip').is(':checked') == false) {
                alert_error("detail data belum dipilih");
            } else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah anda yakin ingin menyimpan data ini?", function() {
                    $.ajax({
                        url: base_url + "Controller_deposit_to_ar/insert_denda_ke_titipan",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            branch_id: kode_cabang_detail,
                            nomor_kontrak_id: nomor_kontrak_id_denda_ke_titip,
                            saldo: saldo_denda_ke_titip,
                            ListDendaToTitip: list_data_dendatitipan
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['Status'] === '200') {
                                        //
                                        $('#inp-memo-denda-ketitipan').val(response['NoMemo']);
                                        alert_info("Data Dengan Nomor Laporan " + response['NoMemo'] + " Berhasil Disimpan");
                                        $('#inp-no-kontrak-denda-titipan').prop('disabled', true);
                                        $('#btn-save-denda-titipan').prop('disabled', true);
                                        $('#btn-confirm-denda-titipan, #btn-cancel-denda-titipan').prop('disabled', false);
                                        $('.check_denda_titip').prop('disabled', true);
                                        $('.inp-denda-ovb').prop('disabled', true);
                                        $('#check-all-dendatitip').prop('disabled', true);
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

/*--------------------------- 8 button simpan data denda to titipan ---------------------------*/



/*--------------------------- 8 button konfirmasi data denda to titipan ---------------------------*/
$('#btn-confirm-denda-titipan').click(
    function() {
        if (check_session() === 'true') {
            kode_cabang_detail = $('#slc-branch-depositar').val();
            console.log(kode_cabang_detail);
            var list_dendatitipan = table_denda_ke_titipan.data();
            console.log(list_dendatitipan);
            var list_data_dendatitipan = [];
            for (var i = 0; i < list_dendatitipan.length; i++) {
                if ($('#check-denda-titips' + i).is(":checked")) {
                	dendaoverbook = accounting.unformat($('#denda_overbook' + i).val());
                	var dendaoverbook_2 = $('#' + list_dendatitipan[i][4].substring(list_dendatitipan[i][4].indexOf("denda_overbook"), list_dendatitipan[i][4].indexOf("\" class"))).val();
                    list_data_dendatitipan.push({
                        deskripsi: list_dendatitipan[i][1],
                        no_angsuran: list_dendatitipan[i][2],
                        denda: accounting.unformat(list_dendatitipan[i][3]),
                        denda_overbook: accounting.unformat(dendaoverbook_2),
                        tanggal_penerimaan: list_dendatitipan[i][5]
                    });
                }
            }
            console.log(list_data_dendatitipan);
            nomor_memo_denda_ke_titip = $('#inp-memo-denda-ketitipan').val();
            saldo_denda_ke_titip = accounting.unformat($('#inp-saldo-denda-titipan').val());
            nomor_kontrak_id_denda_ke_titip = $('#inp-contract-id-denda-titipan').val();
            nomor_kontrak_denda_ke_titip = $('#inp-no-kontrak-denda-titipan').val();
            if (nomor_kontrak_denda_ke_titip.length !== 12) {
                alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
                $('#nokontrak-validasi-denda-titipan, #validasi-nasabah-denda-titipan, #validasi-saldo-denda-titipan').addClass('has-error');
                console.log('gagal, validasi 2')
            } else if ($('.check_denda_titip').is(':checked') == false) {
                alert_error("detail data belum dipilih");
            } else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah anda yakin ingin konfirmasi data ini?", function() {
                    $.ajax({
                        url: base_url + "Controller_deposit_to_ar/confirm_denda_ke_titipan",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            branch_id: kode_cabang_detail,
                            nomor_memo: nomor_memo_denda_ke_titip,
                            nomor_kontrak_id: nomor_kontrak_id_denda_ke_titip,
                            nomor_contract: nomor_kontrak_denda_ke_titip,
                            saldo: saldo_denda_ke_titip,
                            ListDendaTitip: list_data_dendatitipan
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['Status'] === '200') {
                                        alert_info("Data Dengan Nomor Laporan " + nomor_memo_denda_ke_titip + " Berhasil Dikonfirmasi");
                                        $('#btn-save-denda-titipan, #btn-confirm-denda-titipan, #btn-cancel-denda-titipan').prop('disabled', true);
                                        $('#btn-print-denda-titipan').prop('disabled', false);
                                    } else {
                                        alert_error(response['ErrorMessage']);
                                    }
                                } catch (e) {
                                    console.log(response);
                                    alert_error(e);
                                    console.log(e);
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

/*--------------------------- 2 button konfirmasi denda ke titipan---------------------------*/

/*--------------------------- 2 button batal denda ke titipan---------------------------*/
$('#btn-cancel-denda-titipan').click(
    function() {
        if (check_session() === 'true') {
            nomor_memo_denda_ke_titip = $('#inp-memo-denda-ketitipan').val();
            if (nomor_memo_denda_ke_titip.length !== 12) {
                alert_error("Silahkan input nomor memo secara lengkap, sebanyak 12 digit");
                $('#nomemo-validasi-denda-titipan, #validasi-nasabah-denda-titipan, #validasi-saldo-denda-titipan').addClass('has-error');
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
                            nomor_memo: nomor_memo_denda_ke_titip
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['Status'] === '200') {
                                        alert_info("Data Dengan Nomor Laporan " + nomor_memo_denda_ke_titip + " Berhasil Dibatalkan");
                                        $('#btn-save-denda-titipan, #btn-confirm-denda-titipan, #btn-cancel-denda-titipan').prop('disabled', true);
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

/*--------------------------- 8 button print denda ke titipan ---------------------------*/
$('#btn-print-denda-titipan').click(
    function() {
        if (check_session() === 'true') {
            nomor_memo_denda_ke_titip = $('#inp-memo-denda-ketitipan').val();
            nomor_kontrak_denda_ke_titip = $('#inp-no-kontrak-denda-titipan').val();
            if (nomor_memo_denda_ke_titip == ' ') {
                alert_error("nomor memo salah");
                $('#nokontrak-validasi-denda-titipan, #nomemo-validasi-denda-titipan, #validasi-nasabah-denda-titipan, #vvalidasi-saldo-denda-titipan ').addClass('has-error');
                console.log('gagal, validasi 2')
            } else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah anda yakin ingin mencetak data ini?", function() {
                    $.ajax({
                        url: base_url + "Controller_deposit_to_ar/print_denda_to_titipan",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            branch_id: kode_cabang_detail, //"0104"
                            nomor_contract: nomor_kontrak_denda_ke_titip, //"010417001700"
                            nomor_memo: nomor_memo_denda_ke_titip //"010418O00161"					
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['status'] === '1') {
                                        alert_info("Data Dengan Nomor Laporan " + nomor_memo_denda_ke_titip + " Berhasil Dicetak");
                                        $('#btn-save-denda-titipan, #btn-confirm-denda-titipan, #btn-cancel-denda-titipan').prop('disabled', true);
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

/*--------------------------- 2 button print denda ke titipan ---------------------------*/
