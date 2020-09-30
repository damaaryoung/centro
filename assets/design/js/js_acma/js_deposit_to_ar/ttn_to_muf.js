/*variabel titip ke ar */
var nomor_memo_ttn_muf = '';//$('#inp-memo-titipan-ke-pendapatan');
var slc_class_code = '';







/*--------------------------- 1 button tampilkan data titipan ke pendapatan ---------------------------*/
$('#tampil-data-ttn-muf').click(
    function() {
        if (check_session() === 'true') {
            console.log('button berfungsi');
            hapusdata();
            $.ajax({
                url: base_url + "Controller_deposit_to_ar/search_data_ttn_muf",
                type: 'POST',
                dataType: 'json',
                data: {
                    branch_id: select_branch
                },
                cache: false,
                success: function(response) {
                    console.log(response);
                    if (response) {
                        try {
                            if (response['Status'] == '500') {
                                console.log(response);
                                alert_error(response['ErrorMessage']);
                            } else if (response['Status'] !== '200') {
                                alert_error(response['ErrorMessage']);
                            } else {
                                table_ttn_muf.clear();
                                $.each(response['ListTitipMuf'], function(index) {
                                    table_ttn_muf.row.add([
                                        '<input id= "check-ttn-tomufs' + index + '" class="check_ttn_tomuf" type="checkbox">',
                                        response['ListTitipMuf'][index]['document_no'],
                                        accounting.formatMoney(response['ListTitipMuf'][index]['current_balance'], '', 2, ',', '.'),
                                        response['ListTitipMuf'][index]['transaction_code'],
                                        response['ListTitipMuf'][index]['branch_code']
                                    ]).draw(false);
                                });
                                $('#btn-save-ttn-muf, #slc-ttn-muf').prop('disabled', false);
                                n_check = $('.check_ttn_tomuf').not("#check-all-angsuran").length;
                                //$('#check-ttn-tomufs0').prop('disabled',false);													
                            }
                        } catch (e) {
                            alert_error(e);
                            console.log(response);
                            console.log(e);
                        }
                    }
                },
                error: function(response) {
                    console.log(response);
                }
            });
        } else if (check_session() === 'false') {
            alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
                localStorage.clear();
                window.location.href = base_url + "Controller_login/login_view";
            });
        }
    });
/*--------------------------- button tampilkan data titipan tanpa nama ke mufinance ---------------------------*/

/*--------------------------- reset data hasil pencarian titipan tanpa nama ke mufinance -----------------------*/
$('#reset-data-ttn-muf').click(
	function(){
		hapusdata();
	});

function hapusdata(){
	$('#inp-memo-ttn-ke-muf').val('');
	$('#slc-ttn-muf').val('00');
	$('#slc-ttn-muf').prop('disabled', false);
	table_ttn_muf.clear().draw();
	$('.chk-list').prop('checked', false);
	$('#btn-save-ttn-muf, #btn-confirm-ttn-muf, #btn-print-ttn-muf, #btn-cancel-ttn-muf').prop('disabled', true);
	$('#tampil-data-ttn-muf').toggle(true);
	$('#tampil-data-ttn-muf').prop('disabled', false);
	$('#check-all-ttn-muf').prop('disabled',false);

}

/*--------------------------- reset data hasil pencarian titipan tanpa nama ke mufinance -----------------------*/


/*--------------------------- ambil value dari data table ----------------------------*/
var data_ttn_to_muf = '';
var document_no = [];
var current_balance = [];
var transaction_code = [];
var branch_code = [];
var n_check = 0;
$('#table-ttn-muf tbody').on('click', '.check_ttn_tomuf', function(){
	console.log(this);
	var n_check2 =  $('.check_ttn_tomuf:checked').not("#check-all-ttn-muf").length;
	if (this.checked == false) {
		//$('#check-ttn-tomufs'+id_next).prop('disabled',true);
		$('#check-all-ttn-muf').prop('checked',false);
		
	}else{
		if (n_check == n_check2) {
			$('#check-all-ttn-muf').prop('checked',true);
		}
		
	}

	data_ttn_to_muf = table_ttn_muf.row($(this).parents('tr')).data();	
	console.log(data_ttn_to_muf);
}); 

$('#check-all-ttn-muf').click(
	function(){
		console.log('check all');
		if ($('#check-all-ttn-muf').is(':checked')){
			$('.check_ttn_tomuf').prop('checked', true);
			data_ttn_to_muf = table_ttn_muf.row($(this).parents('th')).data();
			console.log("checklist all berhasil titipan tanpa nama ke muf");


		}else{
			$('.check_ttn_tomuf').prop('checked', false);
			console.log("checklist dibatalkan titipan tanpa nama ke muf");
		}
	}); 

/*--------------------------- ambil value dari data table ----------------------------*/



/*--------------------------- button simpan titipan tanpa nama ke mufinance ---------------------------*/
$('#btn-save-ttn-muf').click(
    function() {
        if (check_session() === 'true') {
            var list_ttnmuf = table_ttn_muf.data();
            console.log(list_ttnmuf)

            var list_data_ttnmuf = [];
            for (var i = 0; i < list_ttnmuf.length; i++) {
                if ($('#check-ttn-tomufs' + i).is(':checked') || ($('#check-all-ttn-muf').is(':checked'))) {
                    list_data_ttnmuf.push({
                        document_no: list_ttnmuf[i][1],
                        current_balance: accounting.unformat(list_ttnmuf[i][2])
                    });
                }
            }
            console.log(list_ttnmuf);
            console.log(list_data_ttnmuf);
            slc_class_code = $('#slc-ttn-muf').val();


            if ($('.check_ttn_tomuf').is(':checked') == false && slc_class_code == '00') {
                $('#slc-validasi-ttn-muf').addClass('has-error');
                alert_error("CHECKLIST DATA DAN PILIH CLASS CODE BELUM DILAKUKAN");
                console.log('gagal, validasi cheklist data dan class code')
            } else if (slc_class_code == '00') {
                $('#slc-validasi-ttn-muf').addClass('has-error');
                alert_error("PILIH CLASS CODE BELUM DILAKUKAN");
                console.log('gagal, validasi pilih class code')
            } else if (slc_class_code !== '00' && $('.check_ttn_tomuf').is(':checked') == false) {
                $('#slc-validasi-ttn-muf').removeClass('has-error');
                alert_error("CHEKLIST DATA BELUM DILAKUKAN");
                console.log('gagal, validasi pilih class code')
            } else {
                alert_error("lolos validasi simpan titipan to ar");
                $('#slc-validasi-ttn-muf').removeClass('has-error');
                alert_info("Apakah anda yakin ingin menyimpan data ini?", function() {
                    $.ajax({
                        url: base_url + "Controller_deposit_to_ar/insert_ttn_ke_muf",
                        type: 'POST',
                        dataType: 'json',
                        cache: false,
                        data: {
                            branch_id: select_branch,
                            class_Code: slc_class_code,
                            ListTtnMuf: list_data_ttnmuf
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['Status'] === '200') {
                                        $('#inp-memo-ttn-ke-muf').val(response['NoMemo']);
                                        alert_info("Data Dengan Nomor Laporan " + response['NoMemo'] + " Berhasil Disimpan");
                                        $('#btn-save-ttn-muf, #btn-print-ttn-muf').prop('disabled', true);
                                        $('#btn-confirm-ttn-muf, #btn-cancel-ttn-muf').prop('disabled', false);
                                        $('#slc-ttn-muf').prop('disabled', true);
                                        $('.check_ttn_tomuf').prop('disabled', true);
                                        $('#check-all-ttn-muf').prop('disabled', true);
                                        $('#tampil-data-ttn-muf').prop('disabled', true);

                                    } else if (response['Status'] === '500') {
                                        alert_error(response['ErrorMessage']);
                                    }
                                } catch (e) {
                                    console.log(response);
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

/*--------------------------- button simpan titipan tanpa nama ke mufinance ---------------------------*/


/*--------------------------- button konfirmasi titipan tanpa nama ke mufinance ---------------------------*/
$('#btn-confirm-ttn-muf').click(
    function() {
        if (check_session() === 'true') {
            var list_ttnmuf = table_ttn_muf.data();
            console.log(list_ttnmuf);

            var list_data_ttnmuf = [];
            for (var i = 0; i < list_ttnmuf.length; i++) {
                if ($('#check-ttn-tomufs' + i).is(':checked') || ($('#check-all-ttn-muf').is(':checked'))) {
                    list_data_ttnmuf.push({
                        document_no: list_ttnmuf[i][1],
                        current_balance: accounting.unformat(list_ttnmuf[i][2])
                    });
                }
            }
            console.log(list_data_ttnmuf);
            nomor_memo_ttn_muf = $('#inp-memo-ttn-ke-muf').val();
            slc_class_code = $('#slc-ttn-muf').val();

            if ($('.check_ttn_tomuf').is(':checked') == false && slc_class_code == '00') {
                $('#slc-validasi-ttn-muf').addClass('has-error');
                alert_error("CHECKLIST DATA DAN PILIH CLASS CODE BELUM DILAKUKAN");
                console.log('gagal, validasi cheklist data dan class code')
            } else if (slc_class_code == '00') {
                $('#slc-validasi-ttn-muf').addClass('has-error');
                alert_error("PILIH CLASS CODE BELUM DILAKUKAN");
                console.log('gagal, validasi pilih class code')
            } else if (slc_class_code !== '00' && $('.check_ttn_tomuf').is(':checked') == false) {
                $('#slc-validasi-ttn-muf').removeClass('has-error');
                alert_error("CHEKLIST DATA DATA BELUM DILAKUKAN");
                console.log('gagal, validasi pilih class code')
            } else if (nomor_memo_ttn_muf === '' && nomor_memo_ttn_muf.length !== 12) {
                $('#nomemo-validasi-ttn-ke-muf').addClass('has-error');
                alert_error("NOMOR MEMO TIDAK ADA");
                console.log('gagal, validasi pilih class code')
            } else {
                alert_error("lolos validasi simpan titipan to ar");
                $('#slc-validasi-ttn-muf').removeClass('has-error');
                alert_info("Apakah anda yakin ingin konfirmasi data ini?", function() {
                    $.ajax({
                        url: base_url + "Controller_deposit_to_ar/confirm_ttn_ke_muf",
                        type: 'POST',
                        dataType: 'json',
                        cache: false,
                        data: {
                            branch_id: select_branch,
                            nomor_memo: nomor_memo_ttn_muf,
                            class_Code: slc_class_code,
                            ListTtnMuf: list_data_ttnmuf
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['Status'] === '200') {
                                        alert_info("Data Dengan Nomor Laporan " + nomor_memo_ttn_muf + " Telah Dikonfirmasi", function() {
                                            $('#btn-save-ttn-muf, #btn-confirm-ttn-muf, #btn-cancel-ttn-muf').prop('disabled', true);
                                            $('.btn-print-ovb').prop('disabled', false);
                                        });
                                    } else if (response['Status'] === '500') {
                                        alert_error(response['ErrorMessage']);
                                    } else {
                                        alert_error(response['ErrorMessage']);
                                    }
                                } catch (e) {
                                    alert_error(response);
                                    console.log(e);
                                }
                            }
                        },
                        error: function(response) {
                            alert_error(response.responseText);
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


/*--------------------------- button konfirmasi titipan tanpa nama ke mufinance ---------------------------*/

/*--------------------------- button cetak titipan tanpa nama ke mufinance ---------------------------*/
$('#btn-print-ttn-muf').click(
    function() {
        if (check_session() === 'true') {
            nomor_memo_ttn_muf = $('#inp-memo-ttn-ke-muf').val();
            slc_class_code = $('#slc-ttn-muf').val();
            if (nomor_memo_ttn_muf.length !== 12 && nomor_memo_titip_ar == null) {
                alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
                $('#nokontrak-validasi-titip-toar, #validasi-nasabah-titip-toar, #validasi-saldo-titip-toar').addClass('has-error');
                console.log('gagal, validasi 2')
            } else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_confirm("APAKAH ANDA YAKIN MENCETAK DATA INI?", function() {
                    $.ajax({
                        url: base_url + "Controller_deposit_to_ar/print_ttn_muf",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            branch_id: select_branch,
                            /*"0104",*/
                            nomor_memo: nomor_memo_ttn_muf /*"010418O00196"*/
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['status'] === '1') {
                                        alert_info("Data Dengan Nomor Laporan " + nomor_memo_ttn_muf + " Telah Dicetak");
                                        $('#btn-save-ttn-muf, #btn-confirm-ttn-muf, btn-cancel-ttn-muf').prop('disabled', true);
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

/*--------------------------- button cetak titipan tanpa nama ke mufinance ---------------------------*/

/*--------------------------- button batal titipan tanpa nama ke mufinance ---------------------------*/
$('#btn-cancel-ttn-muf').click(
    function() {
        if (check_session() === 'true') {
            nomor_memo_ttn_muf = $('#inp-memo-ttn-ke-muf').val();
            if (nomor_memo_ttn_muf.length !== 12) {
                alert_error("NOMOR MEMO SALAH ( TIDAK 12 DIGIT )");
                $('#nomemo-validasi-ttn-ke-muf').addClass('has-error');
                console.log('NOMOR MEMO TIDAK MEMENUHI SYARAT')
            } else if (nomor_memo_ttn_muf === '') {
                alert_error("NOMOR MEMO TIDAK BOLEH KOSONG");
            } else {
                //alert_error("lolos validasi simpan titipan to ar");		
                alert_info("APAKAH ANDA YAKIN MEMBATALKAN TRANSAKSI INI?", function() {
                    $.ajax({
                        url: base_url + "Controller_deposit_to_ar/cancel_overbook",
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            branch_id: select_branch,
                            nomor_memo: nomor_memo_ttn_muf
                        },
                        success: function(response) {
                            console.log(response);
                            if (response) {
                                try {
                                    if (response['Status'] === '200') {
                                        alert_info("Data Dengan Nomor Laporan " + nomor_memo_ttn_muf + " Telah Dibatalkan");
                                        $('#btn-save-ttn-muf, #btn-confirm-ttn-muf, #btn-cancel-ttn-muf, #btn-print-ttn-muf').prop('disabled', true);
                                    } else if (response['Status'] === '500') {
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
/*--------------------------- button batal titipan tanpa nama ke mufinance ---------------------------*/
