//=======================================================AUTHOR: 15997085========================================================\\
//SET VARIABLE GLOBAL
var branch_user = $('#inp-branch-id-rf').val();
var branch_name_user = $('#inp-branch-name-rf').val();
var nik_user = $('#inp-nik-rf').val();
var role_user_reportfiducia;
var flag = false;
var kriteria_laporan = 0;

get_list_report();

$('#tgl-awal-periode-rf').prop('disabled', true);
$('#tgl-akhir-periode-rf').prop('disabled', true);
$('#slc-format-rf').prop('disabled', true);
$('#btn-preview-rf').prop('disabled', true);

//SET ROLE
if (!localStorage.getItem('role_user_reportfiducia')) {
    $.ajax({
        'url' : "Controller_home/get_detail_user",
        'cache' : false,
        'async' : false,
        success : function(response){
            if(response){
                try{
                    console.log(response);
                    localStorage.setItem('role_user_reportfiducia', response);
                    role_user_reportfiducia = $.parseJSON(localStorage.getItem('role_user_reportfiducia'));
                    console.log(role_user_reportfiducia);
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
    role_user_reportfiducia = $.parseJSON(localStorage.getItem('role_user_reportfiducia'));
    console.log(role_user_reportfiducia);
}

$('#div-cabang-rf').hide();

$('#slc-laporan-rf').change(function(){
    $('#tgl-awal-periode-rf').prop('disabled', true);
    $('#tgl-akhir-periode-rf').prop('disabled', true);
    $('#slc-format-rf').prop('disabled', true);
    $('#btn-preview-rf').prop('disabled', true);
    $('#slc-branch-rf').prop('disabled', true);
    $('#div-cabang-rf').hide();

    var laporan = $('#slc-laporan-rf').val();

    if (laporan == '005001') {
        $('#div-cabang-rf').show();
        $.each(role_user_reportfiducia, function(i){
            console.log(role_user_reportfiducia[i]['role_code']);
            if (role_user_reportfiducia[i]['role_code'] === 'RF_SRTF' || role_user_reportfiducia[i]['role_code'] === 'APP_ADM_AM') {
                flag = true;
            }
        });
        if (flag === true) {
            if (branch_user !== '0000') {
                $('<option/>').val(branch_user).html(branch_user + ' - ' + branch_name_user).appendTo('#slc-branch-rf');
            }else if (branch_user === '0000') {
                $('#slc-branch-rf').prop('disabled', false);
                get_data_branch('#slc-branch-rf');
            }
            $('#tgl-awal-periode-rf').data("DateTimePicker").clear();
            $('#tgl-akhir-periode-rf').data("DateTimePicker").clear();
            $('#tgl-awal-periode-rf').prop('disabled', false);
            $('#tgl-akhir-periode-rf').prop('disabled', false);
            $('#slc-format-rf').prop('disabled', false);
            $('#btn-preview-rf').prop('disabled', false);
        }else{
            alert_info('User Tidak Memiliki Role Report Fiducia List Sertifikat!');
            $('#tgl-awal-periode-rf').data("DateTimePicker").clear();
            $('#tgl-akhir-periode-rf').data("DateTimePicker").clear();
        }
        flag = false;
    }else if(laporan == '005002'){
        $('#div-cabang-rf').hide();
        $.each(role_user_reportfiducia, function(i){
            console.log(role_user_reportfiducia[i]['role_code']);
            if (role_user_reportfiducia[i]['role_code'] === 'RF_OUTS' || role_user_reportfiducia[i]['role_code'] === 'APP_ADM_AM') {
                flag = true;
            }
        });
        if (flag === true) {
            $('#tgl-awal-periode-rf').data("DateTimePicker").clear();
            $('#tgl-akhir-periode-rf').data("DateTimePicker").clear();
            $('#tgl-awal-periode-rf').prop('disabled', false);
            $('#tgl-akhir-periode-rf').prop('disabled', false);
            $('#slc-format-rf').prop('disabled', false);
            $('#btn-preview-rf').prop('disabled', false);
        }else{
            alert_info('User Tidak Memiliki Role Report Fiducia List Outstanding!');
            $('#tgl-awal-periode-rf').data("DateTimePicker").clear();
            $('#tgl-akhir-periode-rf').data("DateTimePicker").clear();
        }
        flag = false;
    }
});

//SET TANGGAL
$('#tgl-awal-periode-rf').datetimepicker({
    format: 'DD-MMM-YYYY',
    maxDate : new Date(),
    allowInputToggle: true
}).on("dp.change", function(e){
    var date = e.date;
    var d_date = date._d;
    var new_date = new Date(d_date);
    new_date.setDate(new_date.getDate() + 30);

    $('#tgl-akhir-periode-rf').data("DateTimePicker").minDate(d_date);
    
    if (new_date > new Date(today)) {
        new_date = new Date(today);
    }
    
    $('#tgl-akhir-periode-rf').data("DateTimePicker").maxDate(new_date);
    $('#tgl-akhir-periode-rf').data("DateTimePicker").date(new_date);
});

$('#tgl-akhir-periode-rf').datetimepicker({
    format: 'DD-MMM-YYYY',
    maxDate : new Date(),
    allowInputToggle: true
});

//==========================================================PREVIEW=============================================================\\
$('#btn-preview-rf').click(function(){
	if ($('#slc-laporan-rf').val() === "") {
		alert_warning("Silahkan Pilih Laporan Terlebih Dahulu !");
		$('#div-laporan-rf').addClass('has-error');
	}else if ($('#slc-laporan-rf').val() === "005001") {
		if ($('#tgl-awal-periode-rf').val() === "" || $('#tgl-akhir-periode-rf').val() === "") {
			alert_warning("Silahkan Pilih Periode Tanggal Terlebih Dahulu !");
			$('#div-tgl-awal-periode-rf').addClass('has-error');
			$('#div-tgl-akhir-periode-rf').addClass('has-error');
		}else if ($('#slc-branch-rf').val() === "") {
			alert_warning("Silahkan Pilih Cabang Terlebih Dahulu !");
			$('#div-branch-rf').addClass('has-error');
		}else if ($('#slc-format-rf').val() === "0") {
			alert_warning("Silahkan Pilih Format Laporan Terlebih Dahulu !");
			$('#div-format-rf').addClass('has-error');
		}else if ($('#slc-format-rf').val() === "1") {
			get_print();
        }else if ($('#slc-format-rf').val() === "2") {
            print_excel_xls_sertifikat();
        }else if ($('#slc-format-rf').val() === "3") {
            print_csv_sertifikat();
        }
	}else if ($('#slc-laporan-rf').val() === "005002") {
		if ($('#tgl-awal-periode-rf').val() === "" || $('#tgl-akhir-periode-rf').val() === "") {
			alert_warning("Silahkan Pilih Periode Tanggal Terlebih Dahulu !");
			$('#div-tgl-awal-periode-rf').addClass('has-error');
			$('#div-tgl-akhir-periode-rf').addClass('has-error');
		}else if ($('#slc-format-rf').val() === "0") {
			alert_warning("Silahkan Pilih Format Laporan Terlebih Dahulu !");
			$('#div-format-rf').addClass('has-error');
		}else if ($('#slc-format-rf').val() === "1") {
			get_print();
		}else if ($('#slc-format-rf').val() === "2"){
            print_excel_xls_outstanding();
		}else if ($('#slc-format-rf').val() === "3"){
            print_csv_outstanding();
        }

	}
});

//========================================================FUNCTION==============================================================\\
function get_list_report(){
    if (check_session() === 'true') {
        $.ajax({ 
            url: base_url + "Controller_report_fiducia/get_list_report",
            dataType: 'json',
            type: 'GET',
            cache: false,
            success: function(response){
                console.log(response);
                if (response) {
                    try{
                        $('<option/>').val('').html('-- Silahkan Pilih --').appendTo('#slc-laporan-rf').addClass('form-control');
                        $.each(response['Data'], function(i){ 
                            $('#slc-laporan-rf').append('<option value="' + this['report_code'] + '">' + this['report_desc'] + '</option>');
                        }); 
                    }catch(e){ 
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error("Terjadi kesalahan error => " + e);
                    } 
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
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
                else if (response['statusText'] === 'Internal Server Error') {
                    alert_error('Gagal Terhubung ke Server: ' + response['responseText']);
                }
            } 
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
}

function get_print(){
	if (check_session() === 'true') {
        var tanggal = $('#tgl-awal-periode-rf').val();
        tanggal = new Date(tanggal).format('dd/mm/yyyy');
        var tanggal2 = $('#tgl-akhir-periode-rf').val();
        tanggal2 = new Date(tanggal2).format('dd/mm/yyyy');

		if ($('#slc-laporan-rf').val() === "005001") {
			$('#penampung-branch-id').val($('#slc-branch-rf').val());
			$('#penampung-tglstart').val($('#tgl-awal-periode-rf').val());
			$('#penampung-tglend').val($('#tgl-akhir-periode-rf').val());
			$('#penampung-branch').val(branch_user);
			$('#penampung-report').val($('#slc-laporan-rf').val());
			$('#penampung-user').val(nik_user);
			$('#idFormSertifikat').submit();
		}else if($('#slc-laporan-rf').val() === "005002"){
			$('#penampung-branch-out').val(branch_user);
            $('#penampung-tglstart-out2').val(tanggal);
            $('#penampung-tglend-out2').val(tanggal2);
			$('#penampung-tglstart-out').val($('#tgl-awal-periode-rf').val());
			$('#penampung-tglend-out').val($('#tgl-akhir-periode-rf').val());
			$('#penampung-report-out').val($('#slc-laporan-rf').val());
			$('#penampung-user-out').val(nik_user);
			$('#inp-branch-name-rf-out').val($('#inp-branch-name-rf').val());
			$('#idFormOutstanding').submit();
		}
	}else{
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
	}
}

function print_excel_xls_sertifikat(){
	if (check_session() === 'true') {
        var branch_id = $('#slc-branch-rf').val();
        var tgl_awal = $('#tgl-awal-periode-rf').val();
        var tgl_akhir = $('#tgl-akhir-periode-rf').val();
        var laporan = $('#slc-laporan-rf').val();

        $.ajax({
            url: base_url + 'Controller_report_fiducia/get_xls_sertifikat',
            type: 'POST',
            dataType: 'json',
            data:
                {
                    "branch_id" : branch_id,
                    "tgl_awal" : tgl_awal,
                    "tgl_akhir" : tgl_akhir,
                    "branch" : branch_user,
                    "report_code" : laporan,
                    "user" : nik_user
                },
            success:function(response){
                console.log(response);
                if (response) {
                    try{
                        if (response.result) {
                            download(response.result,'Daftarsertifikatkontrak.xls',"application/vnd.ms-excel");
                        }else{
                            alert_info('Data Tidak Ditemukan !');
                        }
                    }catch(e){
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error("Terjadi Kesalahan => " + e);
                    }
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
                }
            },
            error: function(response) {
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }else if (response['statusText'] === 'Internal Server Error') {
                    alert_error('Gagal Terhubung ke Server: ' + response['responseText']);
                }else if (response['responseText'] !== null || response['responseText'] !== "") {
                    alert_error(response['responseText']);
                }
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
}

function print_csv_sertifikat(){
    if (check_session() === 'true') {
        var branch_id = $('#slc-branch-rf').val();
        var tgl_awal = $('#tgl-awal-periode-rf').val();
        var tgl_akhir = $('#tgl-akhir-periode-rf').val();
        var laporan = $('#slc-laporan-rf').val();

        $.ajax({
            url: base_url + "Controller_report_fiducia/get_csv_sertifikat",
            dataType: 'text',
            type: 'POST',
            data:{
                branch_id,
                tgl_awal,
                tgl_akhir,
                branch_user,
                laporan,
                nik_user
            },
            cache: false,
            success: function(response){
                if(response) {
                    try {
                        console.log(response);
                        var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                        var downloadLink = document.createElement("a");
                        downloadLink.href = uri;
                        downloadLink.download = 'Daftarsertifikatkontrak.csv';
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                    }catch(e) {
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error("Terjadi Kesalahan => " + e);
                    }
                }else{
                    alert_info('Data Tidak Ditemukan !');
                }
            },
            error:function(response){
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
                else if (response['statusText'] === 'Internal Server Error') {
                    alert_error('Gagal Terhubung ke Server: ' + response['responseText']);
                }
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
}

function print_excel_xls_outstanding(){
    if (check_session() === 'true') {
        var tgl_awal = $('#tgl-awal-periode-rf').val();
        var tgl_akhir = $('#tgl-akhir-periode-rf').val();
        var laporan = $('#slc-laporan-rf').val();
        var print_xls_outstanding = [];

        $.ajax({
            url: base_url + 'Controller_report_fiducia/get_xls_outstanding',
            type: 'POST',
            dataType: 'json',
            data:
                {
                    "branch" : branch_user,
                    "report_id" : laporan,
                    "user" : nik_user,
                    "tgl_awal_ppd" : tgl_awal,
                    "tgl_akhir_ppd" : tgl_akhir,
                    "cabang" : branch_name_user
                },
            success:function(response){
                console.log(response);
                if(response) {
                    try {
                        if (response.result) {
                            download(response.result,'Daftarsertifikatoutstanding.xls',"application/vnd.ms-excel");
                        }else{
                            alert_info('Data Tidak Ditemukan !');
                        }
                    }catch(e){
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error("Terjadi Kesalahan => " + e);
                    }
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
                }
            },
            error: function(response) {
                console.log(response);  
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
                else if (response['statusText'] === 'Internal Server Error') {
                    alert_error('Gagal Terhubung ke Server: ' + response['responseText']);
                }
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
}

function print_csv_outstanding(){
    if (check_session() === 'true') {
        var tgl_awal = $('#tgl-awal-periode-rf').val();
        var tgl_akhir = $('#tgl-akhir-periode-rf').val();
        var laporan = $('#slc-laporan-rf').val();

        $.ajax({
            url: base_url + "Controller_report_fiducia/get_csv_outstanding",
            dataType: 'text',
            type: 'POST',
            data:{
                branch_user,
                laporan,
                nik_user,
                tgl_awal,
                tgl_akhir,
                branch_name_user
            },
            cache: false,
            success: function(response){
                if(response) {
                    try {
                        console.log(response);
                        var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                        var downloadLink = document.createElement("a");
                        downloadLink.href = uri;
                        downloadLink.download = 'Daftarsertifikatoutstanding.csv';
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                    }catch(e) {
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error("Terjadi Kesalahan => " + e);
                    }
                }else{
                    alert_info('Data Tidak Ditemukan !');
                }
            },
            error:function(response){
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
                        localStorage.clear();
                        window.location.href = base_url + "Controller_login/login_view";
                    });
                }
                else if (response['statusText'] === 'Internal Server Error') {
                    alert_error('Gagal Terhubung ke Server: ' + response['responseText']);
                }
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
}