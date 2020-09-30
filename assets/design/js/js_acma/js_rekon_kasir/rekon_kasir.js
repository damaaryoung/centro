
var data_gantung;
if (localStorage.getItem('menu_alias_am') === 'RKS') {
	debugger;
	//1
	getRoleKasir();
	getRoleAdh();
	var user_location = $('#cabang-login').html();
	if (localStorage.getItem('role_adh') == 'false' && user_location !== 'KANTOR PUSAT' ) {//if bukan adh
		$('#id-btn-hdr-apprCc').remove();
		$('#id-btn-hdr-rptRcl').remove();
	}
	if (user_location === 'KANTOR PUSAT') {//if kantor pusat
		debugger; //2
		$('#id-btn-hdr-rptRcl').click();
		$('#id-btn-hdr-apprCc').remove();
		$('#id-btn-hdr-entryCc').remove();
		$('#id-header-text-rks').html('Reconcile Report');
		get_data_branch('#id-slc-branch-reconcileReport');
	}else{
		getDate();
		getNominal();
		getAdh();
		getValidasiGantung();
		
	}
	$('.btn-hdr-rks').on('click',function(){
		debugger; //3
		$('#id-header-text-rks').html(this.text);
		if (this.text == "Approve Cash Count") {
			$('input:text').not('#id-inp-casier-entrycc').val('');
			$('textarea').val('');
			$('#dt-table-entr_cashcount-rks-appr>tbody>tr').remove();
			tabel_appr_cash_no.clear().draw();
			$('#id-btn-appr-apprcc').prop('disabled',false);
			$('#id-btn-revise-apprcc').prop('disabled',false);
			$('#content-appr').show();
			$('#id-detail_appr_ecc').hide();
			selisih = 0 ;
			amount = 0;
			total_selisih = 0 ;
			total_rekon = 0;
			list_pv_selected = [];
			amount_pv = 0;
		}else if (this.text == "Entry Cash Count") {
			location.reload();
			$('#id-div-reason').hide();
			$('input:text').not('#id-inp-casier-entrycc').val('');
			$('textarea').val('');
			$('#id-btn-save-entrycc').prop('disabled',false);
			$('#id-inp-tot_nominal-entrycc').val('0');
			$('#dt-table-entr_cashcount-rks>tbody>tr').remove();
			$('#dt-table-entr_cashcount-rks-appr>tbody>tr').remove();
			getDate();
			getNominal();

		}else{
			if ($('#cabang-login').html() !== 'KANTOR PUSAT') {
				$('#id-inp-type-reconcileReport').val("");
				$('#id-slc-branch-reconcileReport').show();
			}
			$('input:text').not('#id-inp-casier-entrycc').val('');
			$('#id-slc-branch-reconcileReport>option').remove();
			$('#id-branch-rcc').hide();
			if(branch_code !== '0000') {

				get_data_branch_mufnet('#id-slc-branch-reconcileReport',branch_code);
				// $('<option/>').val(branch_code).html(branch_code + ' - ' + branch_name).appendTo('#id-slc-branch-reconcileReport');

			} else {
				get_data_branch('#id-slc-branch-reconcileReport');
			}  	

			$('#id-branch-rcc').val(branch_code+' - '+branch_name);	
		}
		
		

	});
}

function getRoleKasir(){
	$.ajax({
		url : base_url + "Controller_home/get_detail_user",
		cache : false,
		async :false,
		success : function(response){
			try{
				console.log(response);
				var role_data = $.parseJSON(response);
				var flagrole = true;
				$.each(role_data, function(i){
					if (role_data[i].role_code  === 'TLR_RKN_KSR') {
						localStorage.setItem('role_kasir', true);
						flagrole = false;
					}else if(flagrole){
						localStorage.setItem('role_kasir', false);
					}
				});
			}catch(e) {
				$('#loading-ajax').hide(); 
				console.log(e);
				alert_error("Galat" + e);
			}
		},
		error: function(response){
			console.log(response);
		}
	});
}
var role_user = [];
function getRoleAdh(){
	$.ajax({
		url : base_url + "Controller_home/get_detail_user",
		cache : false,
		async :false,
		success : function(response){
			try{
				console.log(response);
				var role_data = $.parseJSON(response);
				var flagrole = true;
				$.each(role_data, function(i){
					if (role_data[i].role_code  === 'APPR_RKN_KSR') {
						localStorage.setItem('role_adh', true);
						flagrole = false;
					}else if(flagrole){
						localStorage.setItem('role_adh', false);
					}
				});
			}catch(e) {
				$('#loading-ajax').hide(); 
				console.log(e);
				alert_error("Galat" + e);
			}
		},
		error: function(response){
			console.log(response);
		}
	});
}

function getDate(){
	today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; 
	var yyyy = today.getFullYear();
	var m_names = new Array("", "Jan", "Feb", "Mar",
		"Apr", "May", "Jun", "Jul", "Aug", "Sep",
		"Oct", "Nov", "Dec");

	today = dd + '-' + m_names[mm] + '-' + yyyy;
}

function getValidasiGantung(){
	var user = $('#nik-login').html();

	$.ajax({
		url:base_url+'Controller_rekon_kasir/get_data_gantung',
		type:'POST',
		data:{user},
		success:function(response){
			console.log(response);
			if (response.includes('error')) {
				alert_error(response);
				return false;
			}
			try{
				var data = JSON.parse(response);
				data = JSON.parse(data);
				if (data['status'] == '200') {
					data_gantung = data.status_gantung;
					if (data.status_gantung === '1'  ) {
						alert_info('SILAHKAN REKON DATA YANG MENGGANTUNG');
					}
				}	else if (data['status'] == '500') {
					alert_error(data['msg'] );
				}
			}catch(e) {
				$('#loading-ajax').hide(); 
				console.log(e);
				alert_error("Galat" + e);
			}
		},error:function(){

		}
	});


}

$('.no-special-char-rekon').on('keydown', function(e) {
	-1 !== $.inArray(e.keyCode, [190, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) 
	&& (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode 
	&& 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 90 < e.keyCode) 
	&& (96 > e.keyCode || 105 < e.keyCode)&& (e.keyCode != 32)
	&& e.preventDefault()
});

function get_data_branch_mufnet(slc_id,branch_code){
	$.ajax({
		url : base_url+"Controller_rekon_kasir/get_branch_mufnet",
		type : 'POST',
		dataType : 'json',
		data: {
			branch_code
		},
		success : function(response){
			if(JSON.stringify(response).includes('Timeout')){
				alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
			}
			else if(response){
				try{
					response = JSON.parse(response);
					console.log(response);
					$('<option/>').val('').html('- PILIH CABANG/ MUFNET -').appendTo(slc_id).addClass('form-control');

					$.each(response['data'], function(list){ 
						//$(slc_id).append('<option value="'+ this['branch_code']+'">'+this['branch_code']+" - "+this['branch_location']+'</option>');
						$(slc_id).append('<option value="'+ this['branch_code']+'">'+this['branch_location']+'</option>'); // edited by 15997196
					});
					console.log(localStorage.getItem("branch_id"));
					$(slc_id).val(localStorage.getItem("branch_id"));
				} catch(e) {
					$('#loading-ajax').hide();
					console.log(e);
					alert_info("Terjadi Kesalahan !");
				}
        }//if response

    },
    error: function(response){
    	alert_info('Jaringan Terputus, Silahkan Refresh Halaman');
    	console.log(response);
    }
});
};
