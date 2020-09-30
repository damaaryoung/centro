/*variabel titipan tanpa nama ke titipan */
var no_rv_titipan_tanpa_nama_ke_titipan = ''; //$('#inp-no-rv-titipan-tanpa-nama-ketitipan');
var no_kontrak_tujuan_titipan_tanpa_nama = ''; //$('#inp-no-kontrak-tujuan-titipan-tanpa-nama-ketitipan');
var no_memo_titipan_tanpa_nama_ke_titipan = ''; //$('#inp-memo-ttanpanama-ketitipan');


$('#btn-tambah-rv-ovb').click(
	function(){
		tabelttnttp();
	});

$('#src-no-memo-rv').click(function(){
	select_branch = $('#slc-branch-depositar').val();	
	var index = '';
	console.log(select_branch);

	if (select_branch === '') {
		alert_info("Silahkan Input Cabang!");
	}
	else{
		get_memo_rv(select_branch, index);
	}
});

/*---------- GET MEMO RV FROM TABLE -----------*/
var hasil_pencarian = '';
$('#tbl-memo-rv-ovb').on('click', 'tr', function(){
	if ( $(this).hasClass('selected') ) {
		$(this).removeClass('selected');
		hasil_pencarian = '';
	}
	else{
		table_memo_rv.$('tr.selected').removeClass('selected');
		$(this).addClass('selected');
		hasil_pencarian = table_memo_rv.row(this).data();
	}
});
$('#tbl-memo-rv-ovb').on('dblclick', 'tr', function(){
	hasil_pencarian = table_memo_rv.row(this).data();
	$('#modal-memo-rv').modal('hide');
	$('#inp-no-rv-titipan-tanpa-nama-ketitipan').val(hasil_pencarian[0]);
});

$('#btn-pilih-memo-rv').click(function(){
	$('#modal-memo-rv').modal('hide');
	$('#inp-no-rv-titipan-tanpa-nama-ketitipan').val(hasil_pencarian[0]);
});

/*--------------------------- search nomor kontrak tab titipan tanpa nama to titipan ----------------------------*/
$('#search-no-kontrak-ttn-ketitipan').click(	
	function(){	
		if (check_session() === 'true') {
			disbuttonttn();
			$('#inp-memo-ttanpanama-ketitipan').val();
			select_branch = $('#slc-branch-depositar').val();
			console.log(select_branch);	
			no_rv_titipan_tanpa_nama_ke_titipan = $('#inp-no-rv-titipan-tanpa-nama-ketitipan').val();
			no_kontrak_tujuan_titipan_tanpa_nama = $('#inp-no-kontrak-tujuan-titipan-tanpa-nama-ketitipan').val();
			console.log(no_rv_titipan_tanpa_nama_ke_titipan, no_kontrak_tujuan_titipan_tanpa_nama);

			if (no_rv_titipan_tanpa_nama_ke_titipan === ''  && no_kontrak_tujuan_titipan_tanpa_nama === '' && select_branch === ''){
				alert_error("Silahkan isi nomor rv, kontrak tujuan dan pilih cabang");
				$('#norv-validasi-titipan-tanpa-nama-ketitipan, #nokontrak-tujuan-validasi-titipan-tanpa-nama-ketitipan, #div-list-branch').addClass('has-error');
			}		
			else if (no_rv_titipan_tanpa_nama_ke_titipan.length !== 12  && no_kontrak_tujuan_titipan_tanpa_nama.length !== 12 && select_branch === ''){
				alert_error("Silahkan isi nomor rv, kontrak tujuan dan pilih cabang");
				$('#norv-validasi-titipan-tanpa-nama-ketitipan, #nokontrak-tujuan-validasi-titipan-tanpa-nama-ketitipan, #div-list-branch').addClass('has-error'); 
			}
			else
			{				
				$('#norv-validasi-titipan-tanpa-nama-ketitipan, #nokontrak-tujuan-validasi-titipan-tanpa-nama-ketitipan, #div-list-branch').removeClass('has-error');					
				console.log(select_branch);
				$.ajax({
					url: base_url+"Controller_deposit_to_ar/search_data_ttn_titip",
					type: 'POST',
					dataType: 'json',
					data:{
						nomor_rv: no_rv_titipan_tanpa_nama_ke_titipan,
						nomor_contract_tujuan: no_kontrak_tujuan_titipan_tanpa_nama,
						branch_id: select_branch
					},
					cache: false,
					success:function(response){
						console.log(response);
						if(response){
							try{
								if(response['Status'] == "500")
								{
									console.log(response);
									alert_error(response['ErrorMessage']);
								}
								else
								{							
									console.log(response);													
									table_titipan_tanpa_nama_ke_titipan.clear();
									$.each(response['ListTTanpaNamaToTitip'], function(index){
										table_titipan_tanpa_nama_ke_titipan.row.add([								
											'<input id= "check-ttanpa-nama-titipans' + index + '" class="check_ttanpa_nama_titipan" type="checkbox">',								
											response['ListTTanpaNamaToTitip'][index]['nomor_rv'],
											response['ListTTanpaNamaToTitip'][index]['deposit_date'],
											accounting.formatMoney(response['ListTTanpaNamaToTitip'][index]['current_balance'],'', 2, ',', '.'),
											response['ListTTanpaNamaToTitip'][index]['deskripsi'],
											response['ListTTanpaNamaToTitip'][index]['nama_nasabah'],
											response['ListTTanpaNamaToTitip'][index]['contract_id'],
											response['ListTTanpaNamaToTitip'][index]['nomor_contract_tujuan'],
											response['ListTTanpaNamaToTitip'][index]['no_angsuran'],
											accounting.formatMoney(response['ListTTanpaNamaToTitip'][index]['nominal_angsuran'], '', 2, ',', '.')						
											]).draw(false);									
									});	
									ttn_t_check = $('.check_ttanpa_nama_titipan').not("#check-all-ttanpa-nama-titipan").length;
									$('#btn-save-titipan-tanpa-nama-ke-titipan').prop('disabled', false);						
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
/*--------------------------- search nomor kontrak tab titipan tanpa nama to titipan ----------------------------*/

/*--------------------------- reset data hasil pencarian titipan tanpa nama to titipan ----------------------------*/
$('#reset-data-ttn-ketitipan').click(
	function(){
		$('.res-global').val('');
		table_titipan_tanpa_nama_ke_titipan.clear().draw();		
		$('#btn-save-titipan-tanpa-nama-ke-titipan, #btn-confirm-titipan-tanpa-nama-ke-titipan, #btn-print-titipan-tanpa-nama-ke-titipan, #btn-cancel-titipan-tanpa-nama-ke-titipan').prop('disabled', true);
		$('#inp-no-rv-titipan-tanpa-nama-ketitipan, #inp-no-kontrak-tujuan-titipan-tanpa-nama-ketitipan').prop('disabled',false);
		$('#search-no-kontrak-ttn-ketitipan').toggle(true);
		$('#check-all-ttanpa-nama-titipan').prop('disabled', false);
		$('#check-all-ttanpa-nama-titipan').prop('checked', false);
	});

function disbuttonttn (){
	$('#btn-save-titipan-tanpa-nama-ke-titipan, #btn-confirm-titipan-tanpa-nama-ke-titipan, #btn-print-titipan-tanpa-nama-ke-titipan, #btn-cancel-titipan-tanpa-nama-ke-titipan').prop('disabled', true);
}


/*--------------------------- reset data hasil titipan tanpa nama to titipan ----------------------------*/

/*--------------------------- ambil value dari data table ----------------------------*/
var data_ttanpa_nama_ketitipan = '';
var nomor_rv = [];
var nomor_contract_tujuan = [];
var no_angsuran = [];
var nominal_angsuran = [];
var deposit_date = [];
var deskripsi = [];
var nama_nasabah = [];
var contract_id = [];
var current_balance = [];	
var ttn_t_check = 0;


$('#table-titipan-tanpa-nama-ke-titipan tbody').on('click', '.check_ttanpa_nama_titipan', function(){
	console.log(this);	
	var ttn_t_check2 = $('.check_ttanpa_nama_titipan:checked').not("#check-all-ttanpa-nama-titipan").length;
	if (this.checked == false) {
		$('#check-all-ttanpa-nama-titipan').prop('checked',false);
	}else{
		if (ttn_t_check == ttn_t_check2) {
			$('#check-all-ttanpa-nama-titipan').prop('checked',true);
		}
	}
	data_ttanpa_nama_ketitipan = table_titipan_tanpa_nama_ke_titipan.row($(this).parents('tr')).data();	
	console.log(data_ttanpa_nama_ketitipan);
});

$('#check-all-ttanpa-nama-titipan').click(
	function(){
		console.log('masuk ke check all');
		if ($('#check-all-ttanpa-nama-titipan').is(':checked')){
			$('.check_ttanpa_nama_titipan').prop('checked', true);
			data_ttanpa_nama_ketitipan = table_titipan_tanpa_nama_ke_titipan.row($(this).parents('th')).data();
			console.log("checklist berhasil titipan tanpa nama ke titipan");			
		}else{
			$('.check_ttanpa_nama_titipan').prop('checked', false);
			console.log("checklist dibatalkan titipan tanpa nama ke titipan");
		}
	}); 

/*--------------------------- ambil value dari data table ----------------------------*/

/*--------------------------- 3 button simpan titipan tanpa nama to titipan ---------------------------*/
$('#btn-save-titipan-tanpa-nama-ke-titipan').click(
    function() {
        if (check_session() === 'true') {
            var list_ttanpa_nama_titipan = table_titipan_tanpa_nama_ke_titipan.data();
            console.log(list_ttanpa_nama_titipan);

            var list_data_ttanpa_nama_titipan = [];
            for (var i = 0; i < list_ttanpa_nama_titipan.length; i++) {
                if (($('#check-ttanpa-nama-titipans' + i).is(":checked")) || ($('.check_ttanpa_nama_titipan').is(":checked"))) {
                    list_data_ttanpa_nama_titipan.push({
                        nomor_rv: list_ttanpa_nama_titipan[i][1],
                        nomor_contract_tujuan: list_ttanpa_nama_titipan[i][7],
                        contract_id: list_ttanpa_nama_titipan[i][6],
                        deposit_date: list_ttanpa_nama_titipan[i][2],
                        current_balance: accounting.unformat(list_ttanpa_nama_titipan[i][3])
                    });
                }
            }
            console.log(list_data_ttanpa_nama_titipan);
            no_rv_titipan_tanpa_nama_ke_titipan = $('#inp-no-rv-titipan-tanpa-nama-ketitipan').val();
            no_kontrak_tujuan_titipan_tanpa_nama = $('#inp-no-kontrak-tujuan-titipan-tanpa-nama-ketitipan').val();


            if ($('.check_ttanpa_nama_titipan').is(':checked') === false) {
                alert_error("detail data belum dipilih");
                console.log('gagal, belum checklist datatable titipan tanpa nama ke titipan')
            } else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah Anda yakin ingin menyimpan data ini?", function() {
                    $.ajax({
                        url: base_url + "Controller_deposit_to_ar/insert_ttn_titip",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            branch_id: kode_cabang_detail,
                            ListTtanpanamatitipan: list_data_ttanpa_nama_titipan
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['Status'] === '200') {
                                        //
                                        $('#inp-memo-ttanpanama-ketitipan').val(response['NoMemo']);
                                        alert_info("Data Dengan Nomor Laporan " + response['NoMemo'] + " Berhasil Disimpan");
                                        $('#btn-save-titipan-tanpa-nama-ke-titipan').prop('disabled', true);
                                        $('#btn-confirm-titipan-tanpa-nama-ke-titipan, #btn-cancel-titipan-tanpa-nama-ke-titipan').prop('disabled', false);
                                        $('.check_ttanpa_nama_titipan').prop('disabled', true);
                                        $('#check-all-ttanpa-nama-titipan').prop('disabled', true);
                                        $('#inp-no-rv-titipan-tanpa-nama-ketitipan, #inp-no-kontrak-tujuan-titipan-tanpa-nama-ketitipan').prop('disabled', true);
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

/*--------------------------- 3 button simpan titipan tanpa nama to titipan ---------------------------*/


/*--------------------------- 3 button konfirmasi titipan tanpa nama to titipan ---------------------------*/
$('#btn-confirm-titipan-tanpa-nama-ke-titipan').click(
    function() {
        if (check_session() === 'true') {
            var list_ttanpa_nama_titipan = table_titipan_tanpa_nama_ke_titipan.data();
            console.log(list_ttanpa_nama_titipan);

            var list_data_ttanpa_nama_titipan = [];
            for (var i = 0; i < list_ttanpa_nama_titipan.length; i++) {
                if (($('#check-ttanpa-nama-titipans' + i).is(":checked")) || ($('.check_titipttanpa_nama').is(":checked"))) {
                    list_data_ttanpa_nama_titipan.push({
                        nomor_rv: list_ttanpa_nama_titipan[i][1],
                        nomor_contract_tujuan: list_ttanpa_nama_titipan[i][7],
                        contract_id: list_ttanpa_nama_titipan[i][6],
                        deposit_date: list_ttanpa_nama_titipan[i][2],
                        current_balance: accounting.unformat(list_ttanpa_nama_titipan[i][3])
                    });
                }
            }
            console.log(list_data_ttanpa_nama_titipan);
            no_memo_titipan_tanpa_nama_ke_titipan = $('#inp-memo-ttanpanama-ketitipan').val();

            if ($('.check_ttanpa_nama_titipan').is(':checked') == false) {
                alert_error("detail data belum dipilih");
                console.log('gagal, belum checklist datatable titipan tanpa nama ke titipan')

            } else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah anda yakin ingin konfirmasi data ini?", function() {
                    $.ajax({
                        url: base_url + "Controller_deposit_to_ar/confirm_ttn_titip",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            branch_id: kode_cabang_detail,
                            nomor_memo: no_memo_titipan_tanpa_nama_ke_titipan,
                            ListTtanpanamatitipan: list_data_ttanpa_nama_titipan
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['Status'] === '200') {
                                        //							
                                        alert_info("Data Dengan Nomor Laporan " + no_memo_titipan_tanpa_nama_ke_titipan + " Berhasil Dikonfirmasi");
                                        $('#btn-save-titipan-tanpa-nama-ke-titipan, #btn-confirm-titipan-tanpa-nama-ke-titipan, #btn-cancel-titipan-tanpa-nama-ke-titipan').prop('disabled', true);
                                        $('#inp-no-rv-titipan-tanpa-nama-ketitipan, #inp-no-kontrak-tujuan-titipan-tanpa-nama-ketitipan').prop('disabled', true);
                                        $('#btn-print-titipan-tanpa-nama-ke-titipan').prop('disabled', false);
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

/*--------------------------- 3 button konfirmasi titipan tanpa nama to titipan ---------------------------*/

/*--------------------------- 3 button cetak titipan tanpa nama ke titipan ---------------------------*/
$('#btn-print-titipan-tanpa-nama-ke-titipan').click(
    function() {
        if (check_session() === 'true') {
            no_rv_titipan_tanpa_nama_ke_titipan = $('#inp-no-rv-titipan-tanpa-nama-ketitipan').val();
            no_kontrak_tujuan_titipan_tanpa_nama = $('#inp-no-kontrak-tujuan-titipan-tanpa-nama-ketitipan').val();
            no_memo_titipan_tanpa_nama_ke_titipan = $('#inp-memo-ttanpanama-ketitipan').val();
            if (no_memo_titipan_tanpa_nama_ke_titipan == ' ') {
                alert_error("nomor memo salah");
                $('#norv-validasi-titipan-tanpa-nama-ketitipan, #nokontrak-tujuan-validasi-titipan-tanpa-nama-ketitipan, #nomemo-validasi-ttanpa-nama-ketitipan ').addClass('has-error');
                console.log('gagal print titipan tanpa nama ke titipan')
            } else {
                alert_confirm("Apakah anda yakin ingin mencetak data ini?", function() {
                    $.ajax({
                        url: base_url + "Controller_deposit_to_ar/print_ttn_titipan",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            branch_id: kode_cabang_detail, //"0104",
                            nomor_contract: no_kontrak_tujuan_titipan_tanpa_nama, //"010418000090"
                            nomor_memo: no_memo_titipan_tanpa_nama_ke_titipan //"010418O00163"					
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['status'] === '1') {
                                        alert_info("Data Dengan Nomor Laporan " + no_memo_titipan_tanpa_nama_ke_titipan + " Berhasil Dicetak");
                                        $('#btn-save-titip-titipan-tanpa-nama, #btn-confirm-titip-titipan-tanpa-nama, #btn-cancel-titip-titipan-tanpa-nama').prop('disabled', true);
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


/*--------------------------- 3 button batal titipan tanpa nama ke titipan ---------------------------*/
$('#btn-cancel-titipan-tanpa-nama-ke-titipan').click(
    function() {
        if (check_session() === 'true') {
            no_memo_titipan_tanpa_nama_ke_titipan = $('#inp-memo-ttanpanama-ketitipan').val();
            if (no_memo_titipan_tanpa_nama_ke_titipan.length !== 12) {
                alert_error("nomor memo salah, nomor memo harus terisi 12 digit");
                $('#nomemo-validasi-ttanpa-nama-ketitipan').addClass('has-error');
                console.log('gagal, gagal cancel titipan ke titipan tanpa nama')
            } else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah anda yakin ingin membatalkan data ini?", function() {
                    $.ajax({
                        url: base_url + "Controller_deposit_to_ar/cancel_overbook",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            branch_id: kode_cabang_detail,
                            nomor_memo: no_memo_titipan_tanpa_nama_ke_titipan
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['Status'] === '200') {
                                        alert_info("Data Dengan Nomor Laporan " + no_memo_titipan_tanpa_nama_ke_titipan + " Berhasil Dibatalkan");
                                        $('#btn-save-titipan-tanpa-nama-ke-titipan, #btn-confirm-titipan-tanpa-nama-ke-titipan, #btn-cancel-titipan-tanpa-nama-ke-titipan').prop('disabled', true);
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

/*--------------------------- 3 button batal titipan tanpa nama ke titipan ---------------------------*/

function get_memo_rv(select_branch, index){
	$.ajax({
		url: base_url + "Controller_deposit_to_ar/search_data_ttn_muf",
		type: 'POST',
		dataType: 'json',
		data: {
			branch_id: select_branch
		},
		cache: false,
		success: function(response){
			console.log(response);
			if (response) {
				try{
					var res = response;
					table_memo_rv.clear();
					var docno = [];
					var cubal = [];
					var tran_code = [];
					var bran_code = [];
					var dd = [];
					//console.log(res['data']);
					if (res['ListTitipMuf'].length !== 0 && res['Status'] === '200') {
						$('#modal-memo-rv').modal('show');

						$.each(res['ListTitipMuf'], function(i){
							docno[i] = res['ListTitipMuf'][i]['document_no'];		
							dd[i] = res['ListTitipMuf'][i]['deposit_date'];							
							cubal[i] = res['ListTitipMuf'][i]['current_balance'];
							tran_code[i] = res['ListTitipMuf'][i]['transaction_code'];
							bran_code[i] = res['ListTitipMuf'][i]['branch_code'];

							if (docno[i] === null) {
								docno[i] = '';
							}
							else{
								docno[i] = res['ListTitipMuf'][i]['document_no'];
							}							
							table_memo_rv.row.add([
								docno[i],
								dd[i],
								accounting.formatMoney(cubal[i], '', 2, ',', '.'),
								tran_code[i],
								bran_code[i]
								]).draw(false);
						});

					}
					else if (res['Status'] === '500') {
						alert_error(res['ErrorMessage']);
					}
				}
				catch(e){
					$('#loading-ajax').hide();
					alert_error(e);
				}
			}
			else{
				alert_error("Cek Jaringan");
			}
		},
		error: function(response){
			console.log(response);
			if (response['responseText'] === "" && response['statusText'] === 'OK') {
				alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
					localStorage.clear();
					window.location.href = base_url + "Controller_login/login_view";
				});
			}
		}
	});
}