//==============================================================================================================================\\
$('#div-pdc-cfr').hide();
$('#div-pvrv-cfr').hide();
$('#div-kas-cfr').hide();
$('#div-buffercash-cfr').hide();

$('#slc-laporan-cfr').change(function(){
	var laporan = $('#slc-laporan-cfr').val();
	if (laporan === "") {
		$('#div-pdc-cfr').hide();
		$('#div-pvrv-cfr').hide();
		$('#div-kas-cfr').hide();
		$('#div-buffercash-cfr').hide();
	}else if (laporan === "001000") {
		$('#div-pdc-cfr').show();
		$('#div-pvrv-cfr').hide();
		$('#div-kas-cfr').hide();
		$('#div-buffercash-cfr').hide();
        get_sub_laporan_pdc();
	}else if (laporan === "002000") {
		$('#div-pdc-cfr').hide();
		$('#div-pvrv-cfr').show();
		$('#div-kas-cfr').hide();
		$('#div-buffercash-cfr').hide();
	}else if (laporan === "003000") {
		$('#div-pdc-cfr').hide();
		$('#div-pvrv-cfr').hide();
		$('#div-kas-cfr').show();
		$('#div-buffercash-cfr').hide();
	}else if (laporan === "004000") {
		$('#div-pdc-cfr').hide();
		$('#div-pvrv-cfr').hide();
		$('#div-kas-cfr').hide();
		$('#div-buffercash-cfr').show();
	}
});

get_list_report();

//=============================================================================================================================\\
function get_list_report(){
    if (check_session() === 'true') {
        $.ajax({ 
            url: base_url + "Controller_flow_report/get_list_report",
            dataType: 'json',
            type: 'GET',
            cache: false,
            success: function(response){
                console.log(response);
                if (response) {
                    try{
                        $('<option/>').val('').html('-- Silahkan Pilih --').appendTo('#slc-laporan-cfr').addClass('form-control');
                        $.each(response['Data'], function(i){ 
                            $('#slc-laporan-cfr').append('<option value="' + this['report_code'] + '">' + this['report_desc'] + '</option>');
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
                alert_error(response);
            } 
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
};