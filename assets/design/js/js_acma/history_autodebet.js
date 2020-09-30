/*	$('#btn-search-ha').prop('disabled', true);
	$("#btn-activeFlag-ha").prop("disabled", true);
	$("#btn-print-ha").prop("disabled", true);
	$("#btn-clear-ha").prop("disabled", true);*/

	var role_his_adbt = '';
	var tabel_history = $('#dt-table-history').DataTable();

	$('#btn-search-ha').click(function(){
		var contract_no = $('#inp-contract-no-ha').val();
		var aktifkan_had = $('#branch-id-had').val();

		// if(aktifkan_had === '0000'){
		
			if(check_session() === 'false'){
				alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			      localStorage.clear();
			      window.location.href = base_url + "Controller_login/login_view";
			    });
			}else{

				if(contract_no === "" || contract_no === null){
					alert_info('Isi Nomor Kontrak Terlebih Dahulu !');
				}else if (contract_no.length != 12 ) {
				    alert_error('Silahkan masukkan no kontrak dengan lengkap !');
				}else
					var arrayData  = [];   
					arrayData.push({   
						contract_no : contract_no,
					});
					getDataHistory(arrayData);		 
				}
		// }else{
		// 		alert_info('Tombol Ini Hanya Bisa Diakses Oleh Finance HO');
		// }
	});



	$('#btn-activeFlag-ha').click(function(){
		var contract_no = $('#inp-contract-no-ha').val();
		var szuser = $('#hdn-user-id-ha').val();
		var branch_code = $('#hdn-branch-code-ha').val();
		var szname = $('#inp-name-ha').val();
		var szno_rek = $('#inp-account-na-ha').val();
		var sznama_rek = $('#inp-account-name-ha').val();
		var aktifkan_had = $('#branch-id-had').val();
		var status ;
		var arrayData = [];
		
		if (check_session() === 'true'){
			if(aktifkan_had === '0000'){
				if($('#inp-status-ha').val() == "Aktif"){
					alert_info("Kontrak tersebut sudah aktif status autodebet");
				}else{
					alert_confirm('Aktifkan flag autodebet' , function(){
					arrayData.push({   
							contract_no : contract_no,
							szuser : szuser,
							branch_code : branch_code,
							szname : szname,
							szno_rek : szno_rek,
							sznama_rek : sznama_rek
						});
						activeAutodebit(arrayData);
					});
				}

			}else{
				alert_info('Tombol Ini Hanya Bisa Diakses Oleh Finance HO');
			}
		}else if (check_session() === 'false') {
		    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
		      localStorage.clear();
		      window.location.href = base_url + "Controller_login/login_view";
		    });
	  	}
	
	});


	$('#btn-print-ha').click(function(){

		var fund_status = $("#slc-status-ha option:selected").val();
		var start_date  = $('#inp-start-date-ha').val(); 
		var end_date    = $('#inp-end-date-ha').val(); 
		var aktifkan_had = $('#branch-id-had').val();

		if(aktifkan_had === '0000'){
		if(fund_status == "gagal"){
			fund_status = 3;
		}else{
			fund_status = 2;
		}
		
		if(start_date === "" || start_date === null ){
			alert_info('Isi Date Terlebih Dahulu !');
		}else if(check_session() === 'false'){
			alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
	      localStorage.clear();
	      window.location.href = base_url + "Controller_login/login_view";
	    });
		}else{
			var arrayData = [];

			arrayData.push({   
				fund_status : fund_status,
				start_date : start_date,
				end_date : end_date
			});
			reportAutodebit(arrayData,fund_status)
		
		}
	}else{
		alert_info('Tombol Ini Hanya Bisa Diakses Oleh Finance HO');
	}
	});


	$('#btn-clear-ha').click(function(){
		var aktifkan_had = $('#branch-id-had').val();

		if(aktifkan_had === '0000'){
		clearHA();
	}else{
		alert_info('Tombol Ini Hanya Bisa Diakses Oleh Finance HO');
	}
	});

	function clearHA(){
		$('#inp-name-ha').val('');
		$('#inp-account-na-ha').val('');
		$('#inp-account-name-ha').val('');
		$('#inp-status-ha').val('');
		$('#inp-inst-ha').val('');
		$('#inp-payment-date-ha').val('');
		$('#inp-ket-ha').val('');
		$('#inp-contract-no-ha').val('');
		$("#btn-activeFlag-ha").prop("disabled", true);
		tabel_history.clear().draw();
	}

	function activeAutodebit(arrayData){
		$.ajax({
			url: base_url+"controller_history_autodebet/updateAutodebit",

			cache: false,
			type: 'post',
			data : {arrayData},
			dataType: 'json',
			success: function(response){
				if(response) {
					try {
						var result = $.parseJSON(response);	
						if(result['Status'] == '500'){
							alert_info(result['Error']);
						}else if (result['Status'] == '200'){
							$('#inp-status-ha').val('Aktif');
							$('#btn-activeFlag-ha').prop("disabled", true)
							alert_info("Berhasil Update Status Autodebet");
						}
					}catch(e) {
						$('#loading-ajax').hide(); 
						console.log(e);
						alert_error("Terjadi Kesalahan => " + e);
					}
				}else{
					alert_error("Error Cek Koneksi");
				}

			},
			error:function(response){
				console.log(response);
				alert_error(response);
				if (response['responseText'] === "" && response['statusText'] === 'OK') {
					alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
						localStorage.clear();
						window.location.href = base_url + "Controller_login/login_view";
					});
				}
			}
		});
	}

	function reportAutodebit(arrayData,status){

		var ket_status;
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 
		var yyyy = today.getFullYear();
		today = dd + '-' + mm + '-' + yyyy;
		var time = new Date();
		var s = time.getSeconds();
		var m = time.getMinutes();
		var h = time.getHours();
		time = h+'.'+m+'.'+s;
		debugger;
		$.ajax({
			url: base_url + "Controller_history_autodebet/getReport",
			cache: false,
			type: 'post',
			data : {arrayData},
			dataType: 'text',
			success: function(response){
				console.log(response);
				if(response) {
					try {
						if(status == 3){
							ket_status = 'Gagal History_Autodebet';
						}else{
							ket_status = 'Sukses History_Autodebet';
						}

						console.log("ajax response success"); 
						console.log(response);
						var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
						var downloadLink = document.createElement("a");
						downloadLink.href = uri;
						downloadLink.download = ket_status+' '+today+ ' ' +time+'.csv';
						document.body.appendChild(downloadLink);
						downloadLink.click();
						document.body.removeChild(downloadLink);
						alert_info('Text File Berhasil Terbentuk Ke folder C://download/ ' + downloadLink.download);

					}catch(e) {
						$('#loading-ajax').hide(); 
						console.log(e);
						alert_error("Terjadi Kesalahan => " + e);
					}
				}
				

			},
			error:function(response){
				console.log(response);
				alert_error(response);
				if (response['responseText'] === "" && response['statusText'] === 'OK') {
					alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
						localStorage.clear();
						window.location.href = base_url + "Controller_login/login_view";
					});
				}
			}
		});
	}

	function getDataHistory(arrayData){
		$.ajax({
			url: base_url + "Controller_history_autodebet/selectHistory",
			cache: false,
			type: 'post',
			data : {arrayData},
			dataType: 'json',
			success: function(response){
				tabel_history.clear().draw();
				var result = $.parseJSON(response);
				var status = $('#inp-status-ha').val();
				console.log(result);
				if(response) {
					try {
						if(result['Status'] === '500'){
							clearHA();
							alert_info(result['Error']);	
						}else{

							$('#inp-name-ha').val(result['Data'].cust_name);
							$('#inp-account-na-ha').val(result['Data'].appl_autodebit_acc_no);
							$('#inp-account-name-ha').val(result['Data'].benificiary_name);
							$('#inp-status-ha').val(result['Data'].status_AutoDebet);
							$('#inp-inst-ha').val(result['Data'].angs);
							$('#inp-payment-date-ha').val(result['Data'].jTempo);
							$('#inp-ket-ha').val(result['Data'].ket_akhir);
							
							for (var i = result['Data']['listDataHistory'].length - 1; i >= 0; i--) {

								tabel_history.row.add([
									result['Data']['listDataHistory'][i].create_date,
									result['Data']['listDataHistory'][i].update_date,
									result['Data']['listDataHistory'][i].kontrak,
									result['Data']['listDataHistory'][i].angs,
									result['Data']['listDataHistory'][i].no_rek,
									result['Data']['listDataHistory'][i].nama_rek,
									result['Data']['listDataHistory'][i].amt,
									result['Data']['listDataHistory'][i].ket,
									]).draw(false);
							}


							if( result['Data']['status_AutoDebet'] != 'Aktif' ){
									$("#btn-activeFlag-ha").prop("disabled", false);

							}

						}
					}catch(e) {
						$('#loading-ajax').hide(); 
						console.log(e);
						alert_error("Terjadi Kesalahan => " + e);
					}
				}else{
					alert_error("Error Cek Koneksi");
				}

			},
			error:function(response){
				console.log(response);
				alert_error(response);
				if (response['responseText'] === "" && response['statusText'] === 'OK') {
					alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
						localStorage.clear();
						window.location.href = base_url + "Controller_login/login_view";
					});
				}
			}
		});

	}

	$('#div-tgl-akhir').datetimepicker({
		format: 'DD-MMM-YYYY',
		allowInputToggle: true
	});

	$('#div-tgl-awal').datetimepicker({
		format: 'DD-MMM-YYYY',
		allowInputToggle: true
	}).on("dp.change", function(e){
		var date = e.date;
		var dDate = date._d;
		var new_date = new Date(dDate);
		new_date.setDate(new_date.getDate() + 15);

		if (new_date > new Date(today)) {
			new_date = new Date(today);
			$('#div-tgl-awal').data("DateTimePicker").maxDate(new_date);
			$('#div-tgl-akhir').data("DateTimePicker").maxDate(new_date);
		}
		$('#div-tgl-akhir').data("DateTimePicker").date(new_date);
	});


	/*if (!localStorage.getItem('role_user_his_adbt')) {
		$.ajax({
			url : base_url+"Controller_home/get_detail_user",
			cache : false,
			success : function(response){
				if(response){
					try{
						console.log(response);
						localStorage.setItem('role_user_his_adbt', response);
						role_his_adbt = $.parseJSON(localStorage.getItem('role_user_his_adbt'));
						get_roleHis();
						console.log(role_his_adbt);
					}catch(e){
						console.log(e);
						$('#loading-ajax').hide();
						alert_error("Terjadi kesalahan error => "+e);
					}
				}
			},
			error: function(response){
				console.log(response);
			}
		});
	}else{
		role_his_adbt = $.parseJSON(localStorage.getItem('role_user_his_adbt'));
		get_roleHis();
		console.log(role_his_adbt);
	}

	function get_roleHis(){
	$.each(role_his_adbt, function(i){
		if (role_his_adbt[i]['role_code'] === 'HIS_ADBT') {	
			$('#btn-search-ha, #btn-print-ha, #btn-clear-ha').prop('disabled', false);
		}
	});
}
*/