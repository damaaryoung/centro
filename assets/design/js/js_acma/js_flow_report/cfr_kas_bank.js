
var statflag; 
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
var m_names = new Array("", "Jan", "Feb", "Mar",
	"Apr", "May", "Jun", "Jul", "Aug", "Sep",
	"Oct", "Nov", "Dec");
if (dd < 10) {
	dd = '0' + dd
}
today = dd + '-' + m_names[mm] + '-' + yyyy;

$('#inp-tglmis-to-kb').prop('readonly',false);

$('#inp-tglmis-from-kb').datetimepicker({
	format: 'DD-MMM-YYYY',
	allowInputToggle: true,
   //minDate: new Date(year, month-1, day-1),
   maxDate :  new Date(),
}).on("dp.change", function(e){
	var date = e.date;
	var dDate = date._d;
	var new_date = new Date(dDate);
	new_date.setDate(new_date.getDate() + 30);

	$('#inp-tglmis-to-kb').data("DateTimePicker").minDate(dDate);

	if (new_date > new Date(today)) {
		new_date = new Date(today);
	}

	$('#inp-tglmis-to-kb').data("DateTimePicker").maxDate(new_date);
	$('#inp-tglmis-to-kb').data("DateTimePicker").date(new_date);
});

$('#inp-tglmis-to-kb').datetimepicker({
	format: 'DD-MMM-YYYY',
	allowInputToggle: true,
   //minDate: new Date(year, month-1, day-1),
   maxDate :  new Date(),
});

if ($('#id-form-aplikasi-kb').length) {
	var branch_code_kb = $('#hdn-branch-code-kb').val();
	var branch_name_kb = $('#hdn-branch-name-kb').val();

	if (branch_code_kb !== '0000') {
		console.log('masuk');
		$('#slc-branch-kb').prop('disabled', true);
		$('<option/>').val(branch_code_kb+' - '+branch_name_kb).html(branch_code_kb+' - '+branch_name_kb).appendTo('#slc-branch-kb');
	}
	else{
		get_data_branch('#slc-branch-kb');

	}
}

getListBankKas('#slc-mis-kb-bank');
getListUser('#slc-mis-kb-user');
$('#slc-mis-kb-sub').val('0');
$('#rb-mis-kb-all').prop('checked',true);

$('#slc-laporan-cfr').change(function(){
	if($('#slc-laporan-cfr').val()==3){
		role_rpt_kasbank();
	}
})

$('#slc-mis-kb-sub').change(function(){
	if($('#slc-mis-kb-sub').val() == 0){
		$('#iduserkas').prop('hidden', false);
		$('#idbankkas').prop('hidden', false);
		$('#slc-mis-kb-bank').val('kode0');
		$('#rb-mis-kb-clas').prop('checked',false);
		$('#rb-mis-kb-all').prop('checked',true);
		$('#div-list-kasbank').removeClass('has-error');	
		$('#inp-tglmis-from-kb').val('');
		$('#inp-tglmis-to-kb').val('');
		$('#inp-tglmis-from-kb').data('DateTimePicker').clear();
		$('#inp-tglmis-to-kb').data('DateTimePicker').clear();
		$('#slc-mis-kb-format').val('sp');
	}else if($('#slc-mis-kb-sub').val() == 1){
		$('#iduserkas').prop('hidden', true);
		$('#idbankkas').prop('hidden', true);
		$('#slc-mis-kb-bank').val('001');
		$('#rb-mis-kb-clas').prop('checked',false);
		$('#rb-mis-kb-all').prop('checked',true);
		$('#slc-mis-kb-format').val('sp');
		$('#div-list-kasbank').removeClass('has-error');	
		$('#inp-tglmis-from-kb').val('');
		$('#inp-tglmis-to-kb').val('');
		$('#inp-tglmis-from-kb').data('DateTimePicker').clear();
		$('#inp-tglmis-to-kb').data('DateTimePicker').clear();
		$('#slc-mis-kb-format').val('sp');
	}else{
		$('#inp-tglmis-from-kb').val('');
		$('#inp-tglmis-to-kb').val('');
		$('#inp-tglmis-from-kb').data('DateTimePicker').clear();
		$('#inp-tglmis-to-kb').data('DateTimePicker').clear();
		$('#slc-mis-kb-format').val('sp');
	}

	role_rpt_kasbank();
})

$('#rb-mis-kb-all').click(function(){
	$('#rb-mis-kb-clas').prop('checked',false);
})

$('#rb-mis-kb-clas').click(function(){
	$('#rb-mis-kb-all').prop('checked',false);
})

$('#id-btn-preview-kasbank').click(function(){
	if(check_session()=== 'false'){
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}else{
		if($('#slc-mis-kb-sub').val() == 2){
			alert_info('Pilih Sub Laporan Terlebih Dahulu');
			$('#div-list-kasbank').addClass('has-error');
		}else if($('#inp-tglmis-from-kb').val() == ''){
			alert_info('Pilih tanggal terlebih dahulu');
			$('.tgl-mis-kb').addClass('has-error');
		}else if($('#slc-mis-kb-bank').val() == 'kode0'){
			alert_info('Pilih Kode Bank terlebih dahulu');
			$('#div-list-kodebank').addClass('has-error');
		}else{
			$('.tgl-mis-kb').removeClass('has-error');
			$('#div-list-kasbank').removeClass('has-error');
			$('#div-list-kodebank').removeClass('has-error');
			var flaggroup;
			var flag ;
			var tglawal = $('#inp-tglmis-from-kb').val();
			var tglakhir = $('#inp-tglmis-to-kb').val();
			var bank_id = $('#slc-mis-kb-bank').val();
			var branch = branch_code_kb;
			var branch_name = branch_name_kb;
			var br = $('#slc-branch-bfc').val();
			var bank_name = br.substring(br.indexOf("-")+1,br.length).trim();
			var name = "";
			var us = $("#head-login").html();
			var flagform ;
			var user = us.trim();

			if($('#rb-mis-kb-all').prop('checked')==true){
				flaggroup=0;
			}else if($('#rb-mis-kb-clas').prop('checked')==true){
				flaggroup=1;
			}

			if($('#slc-mis-kb-sub').val() == 0){
				flag=0;
				flagform = 0;
			}else{
				flag=1;
				flagform = 1;
			}

			if(flag == 0){
				if(flag==0){
					name = 'kasbank';
				}

				cek_dateclosing(flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name,name);
			}else{
				if(flag==0){
					name = 'kasbank';
				
				}else{
					name = 'kasbank';
				}

				if($('#slc-mis-kb-format').val()==0){
					generate_xls_kasbank(flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name,name);
				}else if($('#slc-mis-kb-format').val()==1){
					reportPdfKasBank(flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name);
				}else if($('#slc-mis-kb-format').val()==2){
					cek_data_csv_kasbank(flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name,name)
				}

			}
		}
	}
})

function reportPdfKasBank(flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name){
	$('#penampung-cetak-kb').val(flaggroup);
	$('#penampung-cetak-kb1').val(flag);
	$('#penampung-cetak-kb2').val(branch_name);
	$('#penampung-cetak-kb3').val(tglawal);
	$('#penampung-cetak-kb4').val(tglakhir);
	$('#penampung-cetak-kb5').val(user);
	$('#penampung-cetak-kb6').val(bank_id);
	$('#penampung-cetak-kb7').val(branch);
	$('#penampung-cetak-kb8').val(bank_name);
	$('#idFormKasBank').submit();
}

function cek_dateclosing(flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name,name){
	$.ajax({
		url: base_url + "Controller_flow_report/cekDateClosing",
		type: 'POST',
		data:{flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name,name},
		success: function(response){  
			if(response){
				try{
					var data = $.parseJSON(response);
					// if(data["data"].length < 1 ){
					// 	alert_error("Data tidak ditemukan");
					// } else 
					if (data["data"].length != 0 && data["data"][0].status != null) {
						alert_error(data["data"][0].status);
					}else{

						if($('#slc-mis-kb-format').val() == 'sp'){
							alert_info('Silahkan pilih format laporan');
							$('#div-list-frm').addClass('has-error');
						}else{
							$('#div-list-frm').removeClass('has-error');
							if($('#slc-mis-kb-format').val()==0){
								generate_xls_kasbank(flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name,name);
							}else if($('#slc-mis-kb-format').val()==1){
								reportPdfKasBank(flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name);
							}else if($('#slc-mis-kb-format').val()==2){
								cek_data_csv_kasbank(flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name,name)
							}
						}
						
						
					} 
				} catch(e) {
					$('#loading-ajax').hide();
					console.log(e);
					alert_info("Terjadi Kesalahan !");
				}
			}
		},error: function(response){
			alert_info('Jaringan Terputus, Silahkan Refresh Halaman');
			console.log(response);
		}
	})

}

function getListBankKas(slc_id){
	var branch_code = branch_code_kb;
	$.ajax({
		url: base_url + "Controller_flow_report/get_list_bank",
		type: 'POST',
		data:{branch_code},
		success: function(response){  
			if(JSON.stringify(response).includes('Timeout')){
				alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
			}else if(response){
				try{
					$(slc_id).empty();
					var respon = $.parseJSON(response);
					$('<option/>').val('kode0').html('-- SILAHKAN PILIH --').appendTo(slc_id).addClass('form-control');
					for (var i = 0; i < respon['data'].length; i++) {
						$(slc_id).append('<option value="'+respon['data'][i].bankCode+'">'+ respon['data'][i].bankCode +" - "+ respon['data'][i].bankName+'</option>');
					}


				} catch(e) {
					$('#loading-ajax').hide();
					console.log(e);
					alert_info("Terjadi Kesalahan !");
				}
			}else{
				alert_error(response);   
			}
		},error: function(response){
			alert_info('Jaringan Terputus, Silahkan Refresh Halaman');
			console.log(response);
		}
	})

}

function getListUser(slc_id){
	var branch = branch_code_kb;
	$.ajax({
		url: base_url + "Controller_flow_report/get_list_userkas",
		type: 'POST',
		data:{branch},
		success: function(response){  
			if(JSON.stringify(response).includes('Timeout')){
				alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
			}else if(response){
				try{
					$(slc_id).empty();
					var respon = $.parseJSON(response);
					$('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo(slc_id).addClass('form-control');
					for (var i = 0; i < respon['data'].length; i++) {
						$(slc_id).append('<option value="'+respon['data'][i].nik+'">'+ respon['data'][i].nik +" - "+ respon['data'][i].nik_name+'</option>');
					}
					$(slc_id).append('<option value="9999">All</option>');

				} catch(e) {
					$('#loading-ajax').hide();
					console.log(e);
					alert_info("Terjadi Kesalahan !");
				}
			}else{
				alert_error(response);   
			}
		},error: function(response){
			alert_info('Jaringan Terputus, Silahkan Refresh Halaman');
			console.log(response);
		}
	})

}


function generate_xls_kasbank(flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name,name){
	var ket_status ;
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	today = mm + '-' + dd + '-' + yyyy;
	var time = new Date();
	var s = time.getSeconds();
	var m = time.getMinutes();
	var h = time.getHours();
	time = h+'.'+m+'.'+s;
	$.ajax({
		url: base_url + "Controller_flow_report/get_xls_kasbank",
		dataType: 'JSON',
		type: 'POST',
		data:{flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name,today},
		cache: false,
		success: function(response){  
			if(response) {
				try{
					if(response['result'].length < 1){
						alert_info('Data tidak ditemukan');
					}else{
						download(response.result,name+'.xls',"application/vnd.ms-excel");
					}
				}catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Terjadi Kesalahan => " + e);
                }
            }else{
            	alert_error(response);
            }  
        },
        error: function(response){
        	console.log(response);
        }
    });
}

function cek_data_csv_kasbank(flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name,name){
	$.ajax({
		url: base_url + "Controller_flow_report/get_csv_kasbank",
		type: 'POST',
		data:{flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name,today},
		cache: false,
		success: function(response){   
			if(response) {
				try {
					var data = $.parseJSON(response);
					var array = [];
					var array1 = [];
					var array2 = [];
					var array3 = [];

					if(data['data'].length < 1){
						alert_info('Data tidak ditemukan');
					}else{
						array = data['data'];
						array1 = data['data1'];
						array2 = data['data2'];
						array3 = data['data3'];
						generate_csv_kasbank(array,array1,array2,array3,flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name,name);
					}

				}catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Terjadi Kesalahan => " + e);
                }
            }else{
            	alert_error(response);
            }  

        },
        error:function(response){
        	console.log(response);
        	alert_error(response);
        }
    });
}

function generate_csv_kasbank(array,array1,array2,array3,flaggroup,flag,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name,name){

	var controller = '';
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; 
	var yyyy = today.getFullYear();
	today = mm + '-' + dd + '-' + yyyy;
	var time = new Date();
	var s = time.getSeconds();
	var m = time.getMinutes();
	var h = time.getHours();
	time = h+'.'+m+'.'+s;

	if(flag == 0){
		if(flaggroup == 0){
			controller = "Controller_flow_report/read_csv_kasbankall";
		}else{
			controller = "Controller_flow_report/read_csv_kasbankclasscode";
		}
	}else{
		if(flaggroup == 0){
			controller = "Controller_flow_report/read_csv_sumkasbank";
		}else{
			controller = "Controller_flow_report/read_csv_sumkasbankclasscode";
		}
	}

	$.ajax({
		url: base_url + controller,
		dataType: 'text',
		type: 'POST',
		data:{array,array1,array2,array3,tglawal,tglakhir,user,bank_id,branch,branch_name,bank_name,today},
		cache: false,
		success: function(response){   
			if(response) {
				try {
					console.log("ajax response success"); 
					console.log(response);
					var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                        //window.open(uri, 'test.csv');
                        var downloadLink = document.createElement("a");
                        downloadLink.href = uri;
                        
                        downloadLink.download = name+'.csv';
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                        alert_info('Text File Berhasil Terbentuk Ke folder C://download/ ' + downloadLink.download);

                    }catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Terjadi Kesalahan => " + e);
                }
            }else{
            	alert_error(response);
            }  

        },
        error:function(response){
        	console.log(response);
        	alert_error(response);
        }
    });
}

function role_rpt_kasbank(){
	$.ajax({
		url : base_url + "Controller_home/get_detail_user",
		cache : false,
		async :false,
		success : function(response){
			try{
				console.log(response);
				var role_data = $.parseJSON(response);
				var flag = true;

				if($('#slc-mis-kb-sub').val() == 0){
					for (var i = 0; i < role_data.length; i++) {
						if (role_data[i].role_code  === 'RPT_KASBANK' || role_data[i].role_code  === 'APP_ADM_AM') {
							flag = false;
							$('#id-btn-preview-kasbank').prop('disabled',false);
							return false;
						}
					}

					if(flag){
						$('#id-btn-preview-kasbank').prop('disabled',true);
						alert_info('User tidak memiliki Role Kas Bank');
					}

				}else if($('#slc-mis-kb-sub').val() == 1){
					for (var i = 0; i < role_data.length; i++) {
						if (role_data[i].role_code  === 'RPT_SUM_KASBANK' || role_data[i].role_code  === 'APP_ADM_AM') {
							flag = false;
							$('#id-btn-preview-kasbank').prop('disabled',false);
							return false;
						}
					}

					if(flag){
						$('#id-btn-preview-kasbank').prop('disabled',true);
						alert_info('User tidak memiliki Role Summary Kas Bank');
					}

				}else if($('#slc-mis-kb-sub').val() == 2){
					$('#id-btn-preview-kasbank').prop('disabled',false);
				}
				
				
			}catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                }
            },
            error: function(response){
            	console.log(response);
            }
        });
}