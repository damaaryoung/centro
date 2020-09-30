/*variabel titip ke ar */
var nomor_memo_titip_ke_titipan_tanpa_nama = '';
var nomor_kontrak_titip_ke_titipan_tanpa_nama = '';
var nomor_kontrak_id_titip_ke_titipan_tanpa_nama = ''; //$('#inp-contract-id-titip-titipan-tanpa-nama')
var nama_nasabah_titip_ke_titipan_tanpa_nama = '';
var saldo_titip_ke_titipan_tanpa_nama = '';


$('#table-titipan-ke-titipan-tanpa-nama').on('keydown', '.inp_angka_ovb', function(e) {
	-1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
});

/*--------------------------- search nomor kontrak tab titipan to titipan tanpa nama ----------------------------*/
$('#search-no-kontrak-titipan-ketitipan-tanpa-nama').click(
    function() {
        if (check_session() === 'true') {
            disbutton();
            $('#btn-print-titip-titipan-tanpa-nama').prop('disabled', true);
            $('#inp-memo-titipan-titipan-tanpa-nama').val();
            select_branch = $('#slc-branch-depositar').val();
            console.log(select_branch)
            nomor_kontrak_titip_ke_titipan_tanpa_nama = $('#inp-no-kontrak-titip-titipan-tanpa-nama').val();
            //nama_cabang = $('#branch-code').val();
            console.log(nomor_kontrak_titip_ke_titipan_tanpa_nama);
            if (nomor_kontrak_titip_ke_titipan_tanpa_nama === '' && select_branch === '') {
                alert_error("Silahkan isi nomor kontrak dan pilih cabang");
                $('#nokontrak-validasi-titip-totitipan-tnama, #div-list-branch').addClass('has-error');
            } else if (nomor_kontrak_titip_ke_titipan_tanpa_nama === '' && select_branch !== '') {
                alert_error("Silahkan isi nomor kontrak");
                $('#nokontrak-validasi-titip-totitipan-tnama').addClass('has-error');
                $('#div-list-branch').removeClass('has-error');
            } else if (nomor_kontrak_titip_ke_titipan_tanpa_nama.length !== 12 && select_branch === '') {
                alert_error("Silahkan isi 12 digit nomor kontrak dan pilih cabang");
                $('#nokontrak-validasi-titip-totitipan-tnama, #div-list-branch').addClass('has-error');
            } else if (nomor_kontrak_titip_ke_titipan_tanpa_nama.length !== 12 && select_branch !== '') {
                alert_error("Silahkan isi 12 digit nomor kontrak");
                $('#nokontrak-validasi-titip-totitipan-tnama').addClass('has-error');
                $('#div-list-branch').removeClass('has-error');
            } else if (nomor_kontrak_titip_ke_titipan_tanpa_nama !== '' && select_branch === '') {
                alert_error("pilih cabang");
                $('#div-list-branch').addClass('has-error');
                $('#nokontrak-validasi-titip-totitipan-tnama').removeClass('has-error');
            } else {
                $('#nokontrak-validasi-titip-totitipan-tnama, #div-list-branch').removeClass('has-error');
                console.log(select_branch);
                console.log(base_url);
                $.ajax({
                    url: base_url + "Controller_deposit_to_ar/search_data_titip_ttn",
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        nomor_contract: nomor_kontrak_titip_ke_titipan_tanpa_nama,
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
                                    $('#inp-nama-nasabah-titip-titipan-tanpa-nama').val(response['nama_nasabah']);
                                    $('#inp-contract-id-titip-titipan-tanpa-nama').val(response['contract_id']);
                                    $('#inp-saldo-titip-titipan-tanpa-nama').val(accounting.formatMoney(response['saldo'], '', 2, ',', '.'));
                                    table_titipan_ke_titipan_tanpa_nama.clear();
                                    $.each(response['ListTitipToTTanpaNama'], function(index) {
                                        table_titipan_ke_titipan_tanpa_nama.row.add([
                                            '<input id= "check-titip-ttns' + index + '" class="check-titip-ttn" type="checkbox">',
                                            response['ListTitipToTTanpaNama'][index]['deskripsi'],
                                            response['ListTitipToTTanpaNama'][index]['no_angsuran'],
                                            '<input id= "nominal-pindah' + index + '" class="form-control inp_angka_ovb nominal-pindah-ovb" type="text" onclick="unformatuangovb(\'nominal-pindah' + index + '\')" onblur="formatuangovb(\'nominal-pindah' + index + '\')" value = ' + accounting.formatMoney(response['ListTitipToTTanpaNama'][index]['nominal_dipindahkan'], '', 2, ',', '.') + ' ></input>',
                                            //'<input id= "nominal-pindah' + index + '" class="form-control input-smn" type="text" value = '+ accounting.formatMoney(response['ListTitipToTTanpaNama'][index]['nominal_dipindahkan'], '', 2, ',', '.') +' ></input>',
                                            response['ListTitipToTTanpaNama'][index]['reference_no'],
                                            response['ListTitipToTTanpaNama'][index]['tanggal_penerimaan'],
                                            response['ListTitipToTTanpaNama'][index]['document_no'],
                                        ]).draw(false);
                                    });
                                    t_ttn_check = $('.check-titip-ttn').not("#check-all-titipttanpa-nama").length;
                                    $('#btn-save-titip-titipan-tanpa-nama').prop('disabled', false);
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
/*--------------------------- search nomor kontrak tab titipan to titipan tanpa nama ----------------------------*/

/*--------------------------- reset data hasil pencarian titipan to ar ----------------------------*/
$('#reset-data-titipan-ttanpanama').click(
	function(){
		$('.res-global').val('');
		table_titipan_ke_titipan_tanpa_nama.clear().draw();
		$('#btn-save-titip-titipan-tanpa-nama, #btn-confirm-titip-titipan-tanpa-nama, #btn-print-titip-titipan-tanpa-nama, #btn-cancel-titip-titipan-tanpa-nama').prop('disabled', true);
		$('#inp-no-kontrak-titip-titipan-tanpa-nama').prop('readonly',false);
		$('#search-no-kontrak-titipan-ketitipan-tanpa-nama').toggle(true);
		$('#check-all-titipttanpa-nama').prop('disabled', false);
		$('#check-all-titipttanpa-nama').prop('checked', false);
		$('#inp-no-kontrak-titip-titipan-tanpa-nama').prop('disabled', false);
	});



function disbutton (){
	$('#btn-save-titip-titipan-tanpa-nama, #btn-confirm-titip-titipan-tanpa-nama, #btn-print-titip-titipan-tanpa-nama, #btn-cancel-titip-titipan-tanpa-nama').prop('disabled', true);
}


/*--------------------------- reset data hasil pencarian titipan to ar ----------------------------*/

/*--------------------------- ambil value dari data table ----------------------------*/
var data_titipan_ke_titip_ttanpa_nama = '';
var no_angsuran = [];
var reference_no = [];
var tanggal_peneriamaan = [];
var document_no = [];
var nominal_dipindahkan = [];
var t_ttn_check = 0;

$('#table-titipan-ke-titipan-tanpa-nama tbody').on('click', '.check-titip-ttn', function(){
	console.log(this);
	var t_ttn_check2 = $('.check-titip-ttn:checked').not("#check-all-titipttanpa-nama").length;
	if (this.checked == false) {
		$('#check-all-titipttanpa-nama').prop('checked',false);
	}else{
		if (t_ttn_check == t_ttn_check2) {
			$('#check-all-titipttanpa-nama').prop('checked',true);
		}
	}
	data_titipan_ke_titip_ttanpa_nama = table_titipan_ke_titipan_tanpa_nama.row($(this).parents('tr')).data();	
	var selector = data_titipan_ke_titip_ttanpa_nama[3].substring(data_titipan_ke_titip_ttanpa_nama[3].indexOf("nominal-pindah"),data_titipan_ke_titip_ttanpa_nama[3].indexOf("\" class"));
	console.log(data_titipan_ke_titip_ttanpa_nama);
});

$('#check-all-titipttanpa-nama').click(
	function(){
		console.log('masuk ke check all');
		if ($('#check-all-titipttanpa-nama').is(':checked')){
			$('.check-titip-ttn').prop('checked', true);
			data_titipan_ke_titip_ttanpa_nama = table_titipan_ke_titipan_tanpa_nama.row($(this).parents('th')).data();
			console.log(data_titipan_ke_titip_ttanpa_nama, nominal_pindah );			
		}else{
			$('.check-titip-ttn').prop('checked', false);
			console.log("checklist dibatalkan titipan ke titipan tanpa nama");
		}
	}); 

/*--------------------------- ambil value dari data table ----------------------------*/

/*--------------------------- 3 button simpan titipan ke titipan tanpa nama ---------------------------*/
$('#btn-save-titip-titipan-tanpa-nama').click(
    function() {
        if (check_session() === 'true') {
            kode_cabang_detail = $('#slc-branch-depositar').val();
            var list_titipan_ttanpa_nama = table_titipan_ke_titipan_tanpa_nama.data();
            console.log(list_titipan_ttanpa_nama);

            var nominal1 = '';

            var list_data_titipan_ttanpa_nama = [];
            for (var i = 0; i < list_titipan_ttanpa_nama.length; i++) {
                if (($('#check-titip-ttns' + i).is(":checked")) || ($('.check-titip-ttn').is(":checked"))) {
                    nominal1 = accounting.unformat($('#nominal-pindah' + i).val());

                    var nominal = $('#' + list_titipan_ttanpa_nama[i][3].substring(list_titipan_ttanpa_nama[i][3].indexOf("nominal-pindah"), list_titipan_ttanpa_nama[i][3].indexOf("\" class"))).val();
                    list_data_titipan_ttanpa_nama.push({
                        no_angsuran: list_titipan_ttanpa_nama[i][2],
                        nominal_dipindahkan: accounting.unformat(nominal),
                        reference_no: list_titipan_ttanpa_nama[i][4],
                        tanggal_penerimaan: list_titipan_ttanpa_nama[i][5],
                        document_no: list_titipan_ttanpa_nama[i][6]
                    });
                }
            }
            console.log(list_data_titipan_ttanpa_nama);
            nomor_kontrak_id_titip_ke_titipan_tanpa_nama = $('#inp-contract-id-titip-titipan-tanpa-nama').val();
            nomor_kontrak_titip_ke_titipan_tanpa_nama = $('#inp-no-kontrak-titip-titipan-tanpa-nama').val();
            saldo_titip_ke_titipan_tanpa_nama = accounting.unformat($('#inp-saldo-titip-titipan-tanpa-nama').val());
            console.log(saldo_titip_ke_titipan_tanpa_nama);

            if (nominal1 > saldo_titip_ke_titipan_tanpa_nama) {
                alert_error("nominal yang anda masukan lebih dari jumlah saldo yang dimiliki");
            } else if ($('.check-titip-ttn').is(':checked') == false) {
                alert_error("detail data belum dipilih");
            } else if (nomor_kontrak_titip_ke_titipan_tanpa_nama.length !== 12) {
                alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
                $('#nokontrak-validasi-titip-totitipan-tnama, #validasi-nasabah-titip-totitipan-tnama, #validasi-saldo-titip-totitipan-tnama').addClass('has-error');

            } else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah anda yakin ingin menyimpan data ini?", function() {
                    $.ajax({
                        url: base_url + "Controller_deposit_to_ar/insert_titip_ttn",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            branch_id: kode_cabang_detail,
                            nomor_contract: nomor_kontrak_titip_ke_titipan_tanpa_nama,
                            contract_id: nomor_kontrak_id_titip_ke_titipan_tanpa_nama,
                            ListTitipToTTanpaNama: list_data_titipan_ttanpa_nama
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['Status'] === '200') {
                                        //
                                        $('#inp-memo-titipan-titipan-tanpa-nama').val(response['NoMemo']);
                                        alert_info("Data Dengan Nomor Laporan " + response['NoMemo'] + " Berhasil Disimpan");
                                        $('#btn-save-titip-titipan-tanpa-nama').prop('disabled', true);
                                        $('#btn-confirm-titip-titipan-tanpa-nama, #btn-cancel-titip-titipan-tanpa-nama').prop('disabled', false);
                                        $('.nominal-pindah-ovb').prop('disabled', true);
                                        $('.check-titip-ttn').prop('disabled', true);
                                        $('#check-all-titipttanpa-nama').prop('disabled', true);
                                        $('#inp-no-kontrak-titip-titipan-tanpa-nama').prop('disabled', true);
                                    } else if (response['Status'] === '500') {
                                        alert_error(response['ErrorMessage']);
                                    } else {
                                        alert_error(response['ErrorMessage']);
                                    }
                                } catch (e) {
                                    console.log(response);
                                    alert_info(e);
                                    console.log(e);
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
/*--------------------------- 3 button simpan titipan ke titipan tanpa nama ---------------------------*/


/*--------------------------- 3 button konfirmasi titipan ke titipan tanpa nama ---------------------------*/
$('#btn-confirm-titip-titipan-tanpa-nama').click(
    function() {
        if (check_session() === 'true') {
            var list_titipan_ttanpa_nama = table_titipan_ke_titipan_tanpa_nama.data();
            console.log(list_titipan_ttanpa_nama);

            var list_data_titipan_ttanpa_nama = [];
            for (var i = 0; i < list_titipan_ttanpa_nama.length; i++) {
                if (($('#check-titip-ttns' + i).is(":checked")) || ($('.check_titipttanpa_nama').is(":checked"))) {
                    nominal1 = accounting.unformat($('#nominal-pindah' + i).val());

                    var nominal = $('#' + list_titipan_ttanpa_nama[i][3].substring(list_titipan_ttanpa_nama[i][3].indexOf("nominal-pindah"), list_titipan_ttanpa_nama[i][3].indexOf("\" class"))).val();
                    list_data_titipan_ttanpa_nama.push({
                        no_angsuran: list_titipan_ttanpa_nama[i][2],
                        nominal_dipindahkan: accounting.unformat(nominal),
                        tanggal_penerimaan: list_titipan_ttanpa_nama[i][5],
                        document_no: list_titipan_ttanpa_nama[i][6]
                    });
                }
            }
            console.log(list_data_titipan_ttanpa_nama);
            nomor_memo_titip_ke_titipan_tanpa_nama = $('#inp-memo-titipan-titipan-tanpa-nama').val();
            saldo_titip_ke_titipan_tanpa_nama = accounting.unformat($('#inp-saldo-titip-titipan-tanpa-nama').val());
            nama_nasabah_titip_ke_titipan_tanpa_nama = $('#inp-nama-nasabah-titip-titipan-tanpa-nama').val();
            nomor_kontrak_titip_ke_titipan_tanpa_nama = $('#inp-no-kontrak-titip-titipan-tanpa-nama').val();
            nomor_kontrak_id_titip_ke_titipan_tanpa_nama = $('#inp-contract-id-titip-titipan-tanpa-nama').val();

            if (nomor_kontrak_titip_ke_titipan_tanpa_nama.length !== 12) {
                alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
                $('#nokontrak-validasi-titip-totitipan-tnama, #validasi-nasabah-titip-totitipan-tnama, #validasi-saldo-titip-totitipan-tnama').addClass('has-error');
                console.log('gagal, validasi 2')
            } else if (nomor_memo_titip_ke_titipan_tanpa_nama === '') {
                alert_error("nomor memo harus sudah terisi jika ingin di konfirmasi");
                $('#nomemo-validasi-titip-totitipan-tnama').addClass('has-error');
            } else if ($('.check-titip-ttn').is(':checked') == false) {
                alert_error("detail data belum dipilih");
            } else
            //
            {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("Apakah anda yakin ingin konfirmasi data ini?", function() {
                    $.ajax({
                        url: base_url + "Controller_deposit_to_ar/confirm_titip_ttn",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            branch_id: kode_cabang_detail,
                            nomor_contract: nomor_kontrak_titip_ke_titipan_tanpa_nama,
                            contract_id: nomor_kontrak_id_titip_ke_titipan_tanpa_nama,
                            nomor_memo: nomor_memo_titip_ke_titipan_tanpa_nama,
                            saldo: saldo_titip_ke_titipan_tanpa_nama,
                            ListTitipToTTanpaNama: list_data_titipan_ttanpa_nama
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['Status'] === '200') {
                                        //							
                                        alert_info("Data Dengan Nomor Laporan " + nomor_memo_titip_ke_titipan_tanpa_nama + " Berhasil Dikonfirmasi");
                                        $('#btn-save-titip-titipan-tanpa-nama, #btn-confirm-titip-titipan-tanpa-nama, #btn-cancel-titip-titipan-tanpa-nama').prop('disabled', true);
                                        $('#btn-print-titip-titipan-tanpa-nama').prop('disabled', false);
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

/*--------------------------- 3 button konfirmasi titipan ke titipan tanpa nama ---------------------------*/

/*--------------------------- 3 button batal titipan ke titipan tanpa nama ---------------------------*/
$('#btn-cancel-titip-titipan-tanpa-nama').click(
    function() {
        if (check_session() === 'true') {
            nomor_memo_titip_ke_titipan_tanpa_nama = $('#inp-memo-titipan-titipan-tanpa-nama').val();
            if (nomor_memo_titip_ke_titipan_tanpa_nama.length !== 12) {
                alert_error("nomor memo salah, nomor memo harus terisi 12 digit");
                $('#nomemo-validasi-titip-totitipan-tnama').addClass('has-error');
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
                            nomor_memo: nomor_memo_titip_ke_titipan_tanpa_nama
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['Status'] === '200') {
                                        alert_info("Data Dengan Nomor Laporan " + nomor_memo_titip_ke_titipan_tanpa_nama + " Berhasil Dibatalkan");
                                        $('#btn-save-titip-titipan-tanpa-nama, #btn-confirm-titip-titipan-tanpa-nama, #btn-cancel-titip-titipan-tanpa-nama').prop('disabled', true);
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

/*--------------------------- 3 button batal titipan ke titipan tanpa nama ---------------------------*/



/*--------------------------- 3 button cetak titipan ke titipan tanpa nama ---------------------------*/
$('#btn-print-titip-titipan-tanpa-nama').click(
	function(){	
		if (check_session() === 'true') {
			nomor_memo_titip_ke_titipan_tanpa_nama = $('#inp-memo-titipan-titipan-tanpa-nama').val();		
			nomor_kontrak_titip_ke_titipan_tanpa_nama = $('#inp-no-kontrak-titip-titipan-tanpa-nama').val();
			if (nomor_kontrak_titip_ke_titipan_tanpa_nama.length !== 12 && nomor_memo_titip_ke_titipan_tanpa_nama == null) {
				alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
				$('#nokontrak-validasi-titip-totitipan-tnama, #nomemo-validasi-titip-totitipan-tnama, #validasi-nasabah-titip-totitipan-tnama, #validasi-saldo-titip-totitipan-tnama ').addClass('has-error');
				console.log('gagal, validasi 2')
			}
			else
			{			
			//alert_error("lolos validasi simpan titipan to ar");		
			alert_confirm("Apakah anda yakin ingin mencetak data ini?", function(){
				$.ajax({
					url: base_url+"Controller_deposit_to_ar/print_titip_ttn",
					type: 'POST',
					dataType: 'json',
					data: {
						branch_id: kode_cabang_detail, //"0104"
						nomor_contract: nomor_kontrak_titip_ke_titipan_tanpa_nama, //"010417001700"
						nomor_memo: nomor_memo_titip_ke_titipan_tanpa_nama //"010418O00151"					
					},
					success:function(response){
						console.log(response);
						if (response){
							try{
								if (response['status'] === '1') {			
									alert_info("Data Dengan Nomor Laporan " +nomor_memo_titip_ke_titipan_tanpa_nama+ " Berhasil Dicetak");
									$('#btn-save-titip-titipan-tanpa-nama, #btn-confirm-titip-titipan-tanpa-nama, #btn-cancel-titip-titipan-tanpa-nama').prop('disabled', true);
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

/*--------------------------- 3 button cetak titipan ke titipan tanpa nama ---------------------------*/

