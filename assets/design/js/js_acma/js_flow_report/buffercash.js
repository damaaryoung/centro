$('#id-slc-buffercash').change(function(){
	$.ajax({
		url : base_url + "Controller_home/get_detail_user",
		cache : false,
		async :false,
		success : function(response){
			try{
				console.log(response);
				var role_data = $.parseJSON(response);
				var flag = true;

				if($('#id-slc-buffercash').val() == 1){
					$('#div-slc-buffercash').removeClass('has-error');
					$('#id-awal-buffercash').val('');
					$('#id-akhir-buffercash').val('');
					$('#id-awal-buffercash').data('DateTimePicker').clear();
					$('#id-akhir-buffercash').data('DateTimePicker').clear();
					$('#id-format-buffercash').val('0')
					for (var i = 0; i < role_data.length; i++) {

						if (role_data[i].role_code  === 'PMK_BFC' || role_data[i].role_code  === 'APP_ADM_AM') {
							$('#id-btn-preview-buffercash').prop('disabled',false);
							flag = false;
							return false;
						}
					}

					if(flag){
						$('#id-btn-preview-buffercash').prop('disabled',true);
						alert_info('User tidak memiliki Role Pemakaian Buffer Cash');
					}

				}else if($('#id-slc-buffercash').val() == 2){
					$('#id-awal-buffercash').val('');
					$('#id-akhir-buffercash').val('');
					$('#id-format-buffercash').val('0')
					$('#id-awal-buffercash').data('DateTimePicker').clear();
					$('#id-akhir-buffercash').data('DateTimePicker').clear();
					$('#div-slc-buffercash').removeClass('has-error');
					for (var i = 0; i < role_data.length; i++) {
						if (role_data[i].role_code  === 'PNS_BFC' || role_data[i].role_code  === 'APP_ADM_AM') {
							flag = false;
							$('#id-btn-preview-buffercash').prop('disabled',false);
							return false;
						}
					}

					if(flag){
						$('#id-btn-preview-buffercash').prop('disabled',true);
						alert_info('User tidak memiliki Role History Pengisian Buffer Cash');
					}
				}else{
					$('#id-btn-preview-buffercash').prop('disabled',false);
					$('#id-awal-buffercash').val('');
					$('#id-akhir-buffercash').val('');
					$('#id-format-buffercash').val('0');
					$('#id-awal-buffercash').data('DateTimePicker').clear();
					$('#id-akhir-buffercash').data('DateTimePicker').clear();
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

})

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

$('#id-akhir-buffercash').prop('readonly',false);

$('#id-awal-buffercash').datetimepicker({
	format: 'DD-MMM-YYYY',
	allowInputToggle: true,
   //minDate: new Date(year, month-1, day-1),
   maxDate :  new Date(),
}).on("dp.change", function(e){
	var date = e.date;
	var dDate = date._d;
	var new_date = new Date(dDate);
	new_date.setDate(new_date.getDate() + 30);

	$('#id-akhir-buffercash').data("DateTimePicker").minDate(dDate);

	if (new_date > new Date(today)) {
		new_date = new Date(today);
	}

	$('#id-akhir-buffercash').data("DateTimePicker").maxDate(new_date);
	$('#id-akhir-buffercash').data("DateTimePicker").date(new_date);
});
//on('dp.change',function(){

//             var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
//             var firstDate = new Date($("#id-awal-buffercash").val());
//             var secondDate = new Date($("#id-akhir-buffercash").val());
//             if(firstDate.getTime() > secondDate.getTime()){
//             	alert_info('Tanggal awal lebih besar dari tanggal akhir');
//             	$('#div-awal-bfc').addClass('has-error');
//             	$('#id-awal-buffercash').data('DateTimePicker').clear();
//             	$("#id-awal-buffercash").val('');

//             }

//         }); 

$('#id-akhir-buffercash').datetimepicker({
	format: 'DD-MMM-YYYY',
	allowInputToggle: true,
   //minDate: new Date(year, month-1, day-1),
   maxDate :  new Date(),
});

$('#btn-clear-buffercash').click(function(){
	$("#form-bfc")[0].reset();
})

if ($('#id-form-aplikasi-bfc').length) {
	var branch_code_bfc = $('#hdn-branch-code-bfc').val();
	var branch_name_bfc = $('#hdn-branch-name-bfc').val();

	if (branch_code_bfc !== '0000') {
		console.log('masuk');
		$('#slc-branch-bfc').prop('disabled', true);
		$('<option/>').val(branch_code_bfc+' - '+branch_name_bfc).html(branch_code_bfc+' - '+branch_name_bfc).appendTo('#slc-branch-bfc');
	}
	else{
		get_data_branch('#slc-branch-bfc');

	}
}

$('#id-btn-preview-buffercash').click(function(){
	if(check_session()=== 'false'){
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}else{
		var flag;
	// var br = $('#slc-branch-bfc').val();
	// var branch = br.substr(0,4);
	// var branch_name = br.substring(br.indexOf("-")+1,br.length).trim();
	var branch = branch_code_bfc;
	var branch_name = branch_name_bfc;
	var tglawal = $('#id-awal-buffercash').val();
	var tglakhir = $('#id-akhir-buffercash').val();
	var name = '';
	if($('#id-slc-buffercash').val()==0){
		alert_info("Pilih Sub Laporan terlebih dahulu");
		$('#div-slc-buffercash').addClass('has-error');
	}else if($('#id-awal-buffercash').val()==""){
		alert_info('Pilih tanggal bayar terlebih dahulu');
		$('#div-awal-bfc,#div-akhir-bfc').addClass('has-error');
	}else if($('#id-format-buffercash').val()==0) {
		alert_info("Pilih format laporan terlebih dahulu");
		$('#div-format-buffercash').addClass('has-error');
	}else{
		$('#div-format-buffercash').removeClass('has-error');
		$('#div-slc-buffercash').removeClass('has-error');
		$('#div-awal-bfc,#div-akhir-bfc').removeClass('has-error');
		if($('#id-slc-buffercash').val() == 1){
			flag=1;
			name = 'Laporanpemakaianbuffercash';
		}else if($('#id-slc-buffercash').val() == 2){
			flag=2;
			name = 'Historypengisianbuffercash';
		}

		if($('#id-format-buffercash').val() == 1){
			if($('#id-slc-buffercash').val() == 1){
				reportBufferCashpemakaian(branch,branch_name,tglawal,tglakhir,flag);
			}else if($('#id-slc-buffercash').val() == 2){
				reportBufferCashpengisian(branch,branch_name,tglawal,tglakhir,flag);
			}
		}else if($('#id-format-buffercash').val() == 2){
			generate_xls_bfc(branch,branch_name,tglawal,tglakhir,flag,name);
		}else if($('#id-format-buffercash').val() == 3){
			cek_data_csv_bfc(branch,branch_name,tglawal,tglakhir,flag,name);
		}
	}
}

});

function reportBufferCashpemakaian(branch,branch_name,tglawal,tglakhir,flag){
	$('#penampung-cetak-bfc').val(branch);
	$('#penampung-cetak-bfc1').val(branch_name);
	$('#penampung-cetak-bfc2').val(tglawal);
	$('#penampung-cetak-bfc3').val(tglakhir);
	$('#penampung-cetak-bfc4').val(flag);
	$('#penampung-cetak-bfc5').val(name);
	$('#idFormBfcpemakaian').submit();
}

function reportBufferCashpengisian(branch,branch_name,tglawal,tglakhir,flag){
	$('#penampung-cetak-bfc6').val(branch);
	$('#penampung-cetak-bfc7').val(branch_name);
	$('#penampung-cetak-bfc8').val(tglawal);
	$('#penampung-cetak-bfc9').val(tglakhir);
	$('#penampung-cetak-bfc10').val(flag);
	$('#idFormBfcpengisian').submit();
}

function cek_data_csv_bfc(branch,branch_name,tglawal,tglakhir,flag,name){
	$.ajax({
		url: base_url + "Controller_flow_report/get_csv_bfc",
		type: 'POST',
		data:{branch,branch_name,tglawal,tglakhir,flag},
		cache: false,
		success: function(response){   
			if(response) {
				try {
					var data = $.parseJSON(response);
					var array = [];
					if(data['data'].length < 1){
						alert_info('Data tidak ditemukan');
					}else{
						array = data['data'];
						generate_csv_bfc(array,branch_name,name,flag)
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

function generate_csv_bfc(array,branch_name,name,flag){
	var controller ='';
	if(flag == 1){
		controller = "Controller_flow_report/read_csv_bfc_pemakaian";
	}else {
		controller = "Controller_flow_report/read_csv_bfc_pengisian";
	}
	$.ajax({
		url: base_url + controller,
		dataType: 'text',
		type: 'POST',
		data:{array,branch_name},
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

function generate_xls_bfc(branch,branch_name,tglawal,tglakhir,flag,name){
	$.ajax({
		url: base_url + "Controller_flow_report/get_xls_bfc",
		dataType: 'JSON',
		type: 'POST',
		data:{branch,branch_name,tglawal,tglakhir,flag},
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