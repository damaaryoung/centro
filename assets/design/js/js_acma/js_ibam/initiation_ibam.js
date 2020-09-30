// var tbl_ibamsrc = $('#id-tbl-app-ibamsrc').DataTable({
// 	"responsive":     true,
// 	"scrollY":        "70vh",
// 	"scrollCollapse": true,
// 	"paging":         false,
// 	"searching":false,
// 	"columnDefs": [
//     { "width": "110%", "targets": 2 }
//   ]
// });




var tbl_ibamsrc = $('#id-tbl-app-ibamsrc').removeAttr('width').DataTable( {
	scrollY:        "70vh",
	scrollX:        true,
	scrollCollapse: true,
	paging:         false,
	searching :false,
	columnDefs: [
	{ width: 46, targets: 2 },
	{ width: 91, targets: 3 },
	{ width: 165, targets: 4 },
	],

} );


var tbl_ibamdst = $('#id-tbl-app-ibamdst').removeAttr('width').DataTable({
	scrollY:        "70vh",
	scrollX:        true,
	scrollCollapse: true,
	paging:         false,
	searching :false,
	columnDefs: [
	{ width: 40, targets: 2 },
	{ width: 85, targets: 3 },
	{ width: 165, targets: 4 },
	{
		
		"targets": [ 5,6 ],
		"visible": false,
	}
	],

	// "scrollY":        "70vh",
	// "scrollCollapse": true,
	// "paging":         false,
	// "searching":false,

	
	// "columnDefs": [
	// {
		
	// 	"targets": [ 5,6 ],
	// 	"visible": false,
	// }

	// ],
});


var tbl_hisappr = $('#id-tblhist-appibam').DataTable({
	//"scrollY":        "370px",
	//"scrollCollapse": true,
	//"paging":         false,
	"columnDefs": [
	{
		'bSortable': true,
		"targets": [ 6 ],
		"visible": false,
		"responsive": true,
	}],

	"order": [[ 6, "asc" ]]
	
})

$(document).ready(function(){
	tbl_ibamdst.clear().draw();	
});

// var tbl_hisappr = $('#id-tblhist-appibam').DataTable({
// 	//"scrollY":        "370px",
// 	//"scrollCollapse": true,
// 	//"paging":         false,
// 	"columnDefs": [
// 	{
// 		'bSortable': true,
// 		"targets": [ 6 ],
// 		"visible": false,
// 		"responsive": true,
// 	}],

// 	"order": [[ 6, "asc" ]]

// });

var tbl_searchinit = $('#id-tblsearch-appibam').DataTable({"columnDefs": [
{
	"targets": [4],
	"visible": false,
	"responsive": true, 

},
]
});


var arrJob = [];
var arrCbng = [];
var dataArea = [];
var dataJob=[];
var arrBm = [];
var arrArea = [];
var flag = '';
var arrCheck = [];
var index = [];
var array_temp = [];
var flag_save = '';
var cab = '';
var cab_name = '';
var branch_code = '';
var branch_name = '';
var count_cont = '';

if ($('#id-form-aplikasi-appibam-dest').length) {
	var branch_code_dest = $('#hdn-branch-code-appibam-dest').val();
	var branch_name_dest = $('#hdn-branch-name-appibam-dest').val();

	console.log('masuk');
		//$('#slc-branch-appibam-dest').prop('disabled', true);
		//$('<option/>').val(branch_code).html(branch_code+' - '+branch_name).appendTo('#slc-branch-appibam-dest');
		
		get_data_branch('#slc-branch-appibam-dest');
		
	}

	$('#btn-clear-appibam').click(function(){
		history.go(0);
	});

	$('#btn-new-appibam').click(function(){
		$('#hdn-inp-flag').val(0);
		var source_br = $('#slc-branch-appibam').val();

		var register = $('#inp-reg-appibam').val();
		var code_area = 8888;

		if (source_br == '') {
			alert_info('Pilih Cabang Awal terlebih dahulu');
			$('#id-form-aplikasi-appibam').addClass('has-error');
		} else {
			var reg = $('#inp-reg-appibam').val('XXXXXXXXXXXXXXXXXXXX');
			$('#id-form-aplikasi-appibam').removeClass('has-error');
			flag = 0;
			
			new_ibam_area(source_br,register,code_area,flag);

		}
	});

	$('#btn-search-appibam').click(function(){
		$('#id-form-aplikasi-appibam').removeClass('has-error');
		$('#id-form-aplikasi-appibam-dest').removeClass('has-error');
		var branch_code_search = $('#slc-branch-appibam').val();
		if (branch_code_search == ''){
			alert_info('Pilih Cabang Asal terlebih dahulu');
			$('#id-form-aplikasi-appibam').addClass('has-error');
		}else if($('#inp-reg-appibam').val() == ''){
			var no_reg = '';
			flag = 0;
			seacrh_noreg_ibam(branch_code_search,no_reg,flag);

		}else{
			var no_regis = $('#inp-reg-appibam').val();
			flag = 1;
			seacrh_noreg_ibam(branch_code_search,no_reg,flag);
			var branch = $('#inp-src-searchibam').val();
			var branch_new = $('#inp-dst-searchibam').val();
			var noreg = $('#inp-noreg-searchibam').val();
			list_cont_dest(branch,branch_new,noreg,no_regis);
		}

	});

	$('#modal-search-appibam tbody').on('click', 'tr', function(){
		if ($(this).hasClass('selected')) {
			$(this).removeClass('selected');
		} else{
			tbl_searchinit.$('tr.selected').removeClass('selected');
			$(this).addClass('selected');
			arr_tbl = tbl_searchinit.row(this).data();
		}
	})

	$('#modal-search-appibam tbody').on('dblclick', 'tr', function(){
		$('#btn-pilih-regibam').click();
	})

	$('#btn-pilih-regibam').click(function(){
		$('#hdn-inp-flag').val(1);
		var noreg = arr_tbl[1];
		var branch = arr_tbl[2];
		var branch_new = arr_tbl[3];
		var mutid = arr_tbl[4];
		$('#modal-search-appibam').modal('hide');
		$('#inp-mutationid').val(mutid);
		list_cont_dest(branch,branch_new,mutid,noreg);

		

	})

	$('#btn-inst-dest-appibam').click(function(){
		var selected_index = [];
		arrCheck = []
		var arrSend = [];
		var srcBranch = $('#slc-branch-appibam').val();
		var destBranch = $('#slc-branch-appibam-dest').val();
		var index_tbl_ibamdst = tbl_ibamdst.data().length;

		if($('#id-tbl-app-ibamsrc input:checkbox:checked:not(:disabled)').not("#chk-all-app-ibamsrc").length < 1){
			alert_info('Tidak Ada Data yang dipilih !');
		}else if ($('#btn-conf-appibam').prop('disabled') == true && $('#inp-stat-mutibam').val() >= '0'){
			alert_info('Data tidak dapat di edit');
		}else if(destBranch == ''){
			alert_info('Pilih cabang tujuan terlebih dahulu !');
			$('#id-form-aplikasi-appibam-dest').addClass('has-error');
		}else{
			$('#id-form-aplikasi-appibam-dest').removeClass('has-error');
			for (var i = 0; i < tbl_ibamsrc.data().length; i++) {

				if ($('#check-tbl-appribamsrc'+i).is(":checked")) {
					if ($('#check-tbl-appribamsrc'+i+'').prop('disabled') === false && $('#check-tbl-appribamsrc'+i+'').prop('checked') === true) {
						var cek_data = cek_data_ibam_dst(tbl_ibamsrc.data()[i], i);
						if (!cek_data) {
							arrSend.push({
								'id' : i,
								'branch' : srcBranch,
								'branch_new' : destBranch,
								'zip' : tbl_ibamsrc.data()[i][1],
								'szip' : tbl_ibamsrc.data()[i][2],
								'desc' : tbl_ibamsrc.data()[i][3],
								'sdesc' :tbl_ibamsrc.data()[i][4], 

							})					
							selected_index.push(i);			
						}
					}

				}		
			}


			for (var j=0; j < arrSend.length; j ++) {
				var kolom1 = '<input class="check-tbl-apprdest" id="check-tbl-appribamdest'+j+'" type="checkbox">';
				arrCheck.push([
					kolom1,
					arrSend[j].zip,
					arrSend[j].szip,
					arrSend[j].desc,
					arrSend[j].sdesc,
					arrSend[j].id,
					'N'
					]);
				$("#check-tbl-appribamsrc"+arrSend[j].id+"").prop("disabled",true);
				$("#check-tbl-appribamsrc"+arrSend[j].id+"").prop("checked",true);
				index_tbl_ibamdst = index_tbl_ibamdst + 1;
			}	

			if (arrSend.length > 0) {
				flag = 2;
				insert_ibam_area(arrSend,flag);
			}

		}
	})

	$('#btn-del-dest-appibam').click(function(){
		var selected_index = [];
		var arrDel = [];
		var flag = 0;
		var srcBranch = $('#slc-branch-appibam').val();
		var destBranch = $('#slc-branch-appibam-dest').val();
		var reg = $('#inp-mutationid').val();
		var lengthdst = $('.check-tbl-apprdest');


		if($('#id-tbl-app-ibamdst input:checkbox:checked').not("#chk-all-app-ibamdst").length < 1){
			alert_info('Tidak Ada Data yang dipilih !');
			$('#chk-all-app-ibamdst').prop('checked',false);
		}else if ($('#btn-conf-appibam').prop('disabled') == true && $('#inp-stat-mutibam').val() >= '0'){
			alert_info('Data tidak dapat di edit');
		}else if(lengthdst.length == lengthdst.filter(':checked').length && $('#inp-reg-appibam').val() != 'XXXXXXXXXXXXXXXXXXXX'){
			alert_info('Data area moving account tidak boleh kosong');
		}else{

			for (var i = 0; i < tbl_ibamdst.rows().data().length; i++) {
				if (tbl_ibamdst.row(i).data()[6] === 'Y') {

					arrDel.push({
						zip : tbl_ibamdst.row(i).data()[1],
						szip : tbl_ibamdst.row(i).data()[2],

					})
				}
			}
	// tbl_ibamdst.rows().draw();
	flag = 2;
	delete_ibam_area(arrDel,srcBranch,destBranch,flag,reg);
	
}

});

	$('#btn-hist-appibam').click(function(){
		var registrasi = $('#inp-reg-appibam').val();
		var br_id = $('#slc-branch-appibam').val();
		if (registrasi == ''){
			alert_info('Isi nomor register terlebih dahulu');
			$('#div-no-reg1-appibam').addClass('has-error');
		}else{
			$('#div-no-reg1-appibam').removeClass('has-error');
			history_ibam(registrasi,br_id);	
		}

	});

	// $('#id-tbl-app-ibamdst tbody').on('click', 'tr', function() {
	// 	if (tbl_ibamdst.row(this).data()[6] === 'Y') {
	// 		tbl_ibamdst.row(this).data()[6] = 'N';
	// 	} else {
	// 		tbl_ibamdst.row(this).data()[6] = 'Y';
	// 	}
	// });	

	$('#chk-all-app-ibamsrc').click(function(){
		if($('#chk-all-app-ibamsrc').is(':checked')){
			for (var i = 0; i < tbl_ibamsrc.rows().data().length; i++) {
				if ($('#check-tbl-appribamsrc'+i+'').prop('disabled') === false && $('#check-tbl-appribamsrc'+i+'').prop('checked') === false) {
					$('#check-tbl-appribamsrc'+i+'').prop('checked',true);
				}

			}
		} else if(!$('#chk-all-app-ibamsrc').is(':checked')){
			for (var i = 0; i < tbl_ibamsrc.rows().data().length; i++) {
				if($('#check-tbl-appribamsrc'+i+'').prop('disabled') === false && $('#check-tbl-appribamsrc'+i+'').prop('checked') === true){
					$('#check-tbl-appribamsrc'+i+'').prop('checked',false);
				}
			}
		}
	});

	$('#chk-all-app-ibamdst').click(function(){
		console.log($('#chk-all-app-ibamdst').is(':checked'));
		if($('#chk-all-app-ibamdst').is(':checked')){
			$('.check-tbl-apprdest').prop('checked',true);
			if ($('#chk-all-app-ibamdst').is(':checked') === true) {
				for (var i = 0; i < tbl_ibamdst.rows().data().length; i++) {
					tbl_ibamdst.rows().data()[i][6] = 'Y';
				}
			} else {
				for (var i = 0; i < tbl_ibamdst.rows().data().length; i++) {
					tbl_ibamdst.rows().data()[i][6] = 'N';
				}
			}



		} else {
			$('.check-tbl-apprdest').prop('checked',false);
		}
	});

	$('#btn-save-appibam').click(function(){
		if(check_session()=== 'false'){
			alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
				localStorage.clear();
				window.location.href = base_url + "Controller_login/login_view";
			});
		}else{
			if(tbl_ibamdst.data().length < 1){
				alert_info('Data area moving account tidak boleh kosong');
			}
                        // else if (flag_save == '0'){
			// 	alert_info('Proses save sudah dilakukan');
			// }
                        else{
				
				alert_confirm("Apakah anda yakin ?", function(){
					var branchSrc = $('#slc-branch-appibam').val();
					var branchDst = $('#slc-branch-appibam-dest').val();
					var noreg = $('#inp-reg-appibam').val();
					var noseq = $('#inp-seqibam').val();

					$.ajax({
						'url' :'Controller_initiation_ibam/save_ibam_area',
						'type' :'POST',
						'data' : {
							'branch' : branchSrc,
							'branch_new' : branchDst,
							'seq' : noseq,
							'no_reg' : noreg
						},
						success : function(response){
							
							try{

								console.log(response);

								var v = $.parseJSON(response);
								if(v['status'] == '200'){

									alert_info('Data Berhasil Disimpan');
									$('#inp-reg-appibam').val(v['data']);
									$('#inp-seqibam').val('0');
									$('#slc-branch-appibam-dest').prop('disabled',true);
							// $('#btn-inst-dest-appibam').prop('disabled',true);
							// $('#btn-del-dest-appibam').prop('disabled',true);
							$('#btn-prev-appibam').prop('disabled',false);
							$('#btn-conf-appibam').prop('disabled',false);
							$('#inp-reg-appibam').prop('disabled',true);
							flag_save = 0;

						}else{
							alert_info(v['data']);
						}
					}catch(e){
						$('#loading-ajax').hide();
						console.log(e);
						alert_error("Terjadi Kesalahan => "+e);
					}
				},error:function(response){
					alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");

				}


			})

				});
			}
		}

	});

	$('#btn-conf-appibam').click(function(){

		var arrConf = [];
		var level = $('#inp-level0-appibam').val();
		var appid = $('#inp-appid-appibam').val();
		var branchSrc = $('#slc-branch-appibam').val();
		var branchDst = $('#slc-branch-appibam-dest').val();
		var noreg = $('#inp-reg-appibam').val();


		if(tbl_ibamdst.data().length < 1){
			alert_info('Tidak Ada Data Yang Disimpan');
		}else if ($('#inp-reg-appibam').val() == 'XXXXXXXXXXXXXXXXXXXX') {
			alert_info('Proses Konfirmasi tidak bisa dilakukan sebelum proses simpan');
		} else if(flag == '1'){
			alert_info('Proses konfirmasi telah dilakukan');
		}else if($('#inp-appid-appibam-destchange').val() == 1){
			alert_info('Proses konfirmasi telah dilakukan');
		}else {
			flag = 0;

			for (var i = 0; i < 1 ; i++) {
				arrConf.push({
					level : level,
					apprid : appid,
					branch : branchSrc,
					branch_new : branchDst,
					reg : noreg,
					zip :'',
					szip : '',
					apprdate : '',
					apprstat : '',
					reason : ''

				})
			}


			alert_confirm("Apakah anda yakin ingin konfirmasi ?", function(){
				confirm_approval_ibam(arrConf);
			})
		}
	});

	function confirm_approval_ibam(arrayData){

		$.ajax({
			'url' :'Controller_approval_ibam/confirm_appr_ibam',
			'type' :'POST',
			'data' : {
				arrayData
			},
			success : function(response){
				try{

					console.log(response);

					var v = $.parseJSON(response);

					if(v['status'] == '200'){
						alert_info('Konfirmasi Sukses');
						$('#btn-conf-appibam').prop('disabled',true);
						$('#btn-save-appibam').prop('disabled',true);
						$('#btn-hist-appibam').prop('disabled',false);
						$('#inp-stat-mutibam').val("0");
						$('#slc-area-code-ibam').prop('disabled',true);
						flag = 1;
					}else{
						alert_info('Konfirmasi Gagal');
						flag = 0;
					}
				}catch(e){
					$('#loading-ajax').hide();
					console.log(e);
					alert_error("Terjadi Kesalahan => "+e);
				}
			},error:function(response){
				alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");

			}

		})
	}

	$('#btn-prev-appibam').click(function(){
		
		var noreg = $('#inp-reg-appibam').val();
		var cabS = $('#slc-branch-appibam').val();
		var cabSrc = $('#slc-branch-appibam [value='+cabS+']').html();
		cabSrc = cabSrc.substring(cabSrc.indexOf("-")+1,cabSrc.length).trim();
		var cabD = $('#slc-branch-appibam-dest').val();
		var cabDest = $('#slc-branch-appibam-dest [value='+cabD+']').html();
		cabDest = cabDest.substring(cabDest.indexOf("-")+1,cabDest.length).trim();
		generate_csv_kontrak(noreg,cabSrc,cabDest);
	});

	$('#slc-area-code-ibam').change(function(){

		var area_code = $('#slc-area-code-ibam').val();
		var source_br = $('#slc-branch-appibam').val();
		var register = $('#inp-reg-appibam').val();
		if(area_code == ''){
			return false;
		}
		if(area_code == '9999'){

			flag = 1;
			var flag_new = 2;
			new_ibam_area(source_br,register,area_code,flag_new);

		}else{
			var flag_new = $('#hdn-inp-flag').val();
			var mutid;
			if(flag_new == 0){
				mutid = 0;
			}else{
				mutid = $('#inp-mutationid').val();
			}

			$.ajax({
				'url' : 'Controller_initiation_ibam/get_zipcode_byarea',
				'type' : 'POST',
				'data' : { 
					'area_code' : area_code,
					'branch' : source_br,
					'flag' : flag_new,
					'mut_id' : mutid

				},

				success : function(response){

					try{
						var v = $.parseJSON(response);
						if (v['status'] != '200') {
							alert_info('Koneksi terputus');
						}else{

							if(v['data'].length < 1){
								alert_info('data tidak ditemukan');	
							}else{
								var dataSrc = [];

						// $('#inp-reg-appibam').prop('disabled',true);
						// $('#slc-branch-appibam').prop('disabled',true);
						// $('#inp-seqibam').val('1');
						$('#btn-save-appibam').prop('disabled',false);

						cleartable()

						tbl_ibamsrc.clear().draw();
						for (var i = 0; i < v['data'].length; i++) {
							dataSrc.push([
								'<input class="check-tbl-appr" id="check-tbl-appribamsrc'+i+'" type="checkbox">',
								v['data'][i].zip_code,
								v['data'][i].szip_code,
								v['data'][i].desc_area,
								v['data'][i].desc_szip_area,
								])
						}

						tbl_ibamsrc.rows.add(dataSrc).draw(false);

						if(tbl_ibamsrc.data().length == 0){
							$('tfoot th input#inp-jmlh-kontraksrc').val(0);
						}else{
							$('tfoot th input#inp-jmlh-kontraksrc').val(v['vcount']);
						}

						$('#hdn-inp-jmlh-kontraksrc').val(v['vcount']);

						$('.check-tbl-appr').change(function(){
							var lengthsrc = $('.check-tbl-appr');
							if(lengthsrc.length == lengthsrc.filter(':checked').length){
								$('#chk-all-app-ibamsrc').prop('checked',true);
							}else{
								$('#chk-all-app-ibamsrc').prop('checked',false);
							}
						})
					}

				}

			}catch(e){
				$('#loading-ajax').hide();
				console.log(e);
				alert_error("Terjadi Kesalahan => "+e);
			}

		},error:function(response){
			alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");

		}
	})
		}
	});

	$('#IAIB').on('click',function(){
		$('#loading-ajax').show();
	})

	$('#slc-branch-appibam-dest').change(function(){
		if ($('#slc-branch-appibam-dest').val() == $('#slc-branch-appibam').val()) {
			alert_info('Cabang Tujuan tidak boleh sama dengan Cabang Asal');
			$('#slc-branch-appibam-dest').val('');
		}
	})


//============================================== Function =======================================================================================

if (localStorage.getItem("menu_alias_am") === "IAIB") {
	if(check_session()=== 'false'){
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}else{
		$.ajax({
			url: base_url + "Controller_approval_ibam/privillage_job",
			cache: false,
			success: function(response){
				try{
					console.log(response);
					var data = $.parseJSON(response);
					var arrArh = [];
					var job = '';
					cab = '';
					cab_name = '';
					var cabArr = [];
					for (var i = 0; i < data[0].length; i++) {

						arrArh.push({
							job : data[0][i].job_desc
						});
					}
					
					for (var i = 0; i < data[1].length; i++) {
						var initCab = data[1][i].branch_code;
						var initCab1 = data[1][i].branch_code;
						initCab = initCab.substr(0,2);
						initCab1 = initCab1.substr(2,2);

						if(initCab == '00'){
							cabArr.push({
								cab_area : data[1][i].branch_code
							});
						}else{
							cab = data[1][i].branch_code;
							cab_name = data[1][i].branch_name;
							
						}

						if (initCab1 == '00') {
							cab = data[1][i].branch_code;
							cab_name = data[1][i].branch_name;
						}
						if ($('#id-form-aplikasi-appibam').length) {
							branch_code = cab;
							branch_name = cab_name;

							console.log(branch_code);

							if (branch_code !== '0000') {
								console.log('masuk');
								$('#slc-branch-appibam').prop('disabled', true);
								$('<option/>').val(branch_code).html(branch_code+' - '+branch_name).appendTo('#slc-branch-appibam');
							}
							else{
								get_data_branch('#slc-branch-appibam');

							}
						}

						console.log(data[1][i].branch_name);
					}

					for (var i = 0; i < arrArh.length; i++) {
						job = job+arrArh[i].job+'#';
					}
					job = job.substring(0,job.length-1);
					login_ibam_init(job);
				}catch(e){
					$('#loading-ajax').hide();
					console.log(e);
					alert_error("Terjadi Kesalahan => "+e);
				}
			},
			error: function(response){
				alert_error('Error Connection');
			}
		});
	}

}

function login_ibam_init(job){
	$.ajax({
		'url' :base_url+'Controller_approval_ibam/log_approval_ibam',
		'type' :'POST',
		'data' : {
			job,
		},

		success : function(response){

			try{
				console.log(response);

				var v = $.parseJSON(response);

				for (var i = 0; i < v['data'].length; i++) {
					if(v['data'][i].level == 0){
						$('#inp-level0-appibam').val(v['data'][i].level);
						$('#inp-appid-appibam').val(v['data'][i].appid);
						$('#branch-job-appibam').val(v['data'][i].job);
						break;
					}else{
						$('#inp-level0-appibam').val(v['data'][i].level);
						$('#inp-appid-appibam').val(v['data'][i].appid);
						$('#branch-job-appibam').val(v['data'][i].job);
					}
				}

				if(v['data'].length < 1 ){
					alert_error('User Tidak Masuk dalam Approval Branch Setting Initiation IBAM');
					$('#content-canvas1-appibam').prop('hidden');
					$('#content-canvas2-appibam').prop('hidden');
				}else if ($('#inp-level0-appibam').val() != '0'){
					alert_error('Anda tidak berhak mengakses menu ini');
					$('#content-canvas1-appibam').prop('hidden');
					$('#content-canvas2-appibam').prop('hidden');
				}else{
					//for (var i = 0; i < v['data'].length ; i++) {	
						$('#content-canvas1-appibam').removeProp('hidden');
						$('#inp-level0-appibam').val();
						$('#inp-appid-appibam').val();
						$('#branch-job-appibam').val();
						$('#inp-seqibam').val('0');
						$('#slc-branch-appibam-dest').prop('disabled',true);

						tbl_ibamsrc.clear().draw();
						tbl_ibamdst.clear().draw();
						
				//	}


			}

		}catch(e){
			$('#loading-ajax').hide();
			console.log(e);
			alert_error("Terjadi Kesalahan => "+e);
		}

	},error:function(response){
		alert_error('Error Connection');

	}

});
}

function new_ibam_area(branch_ib,register_ib,area,flag_new){
	if(check_session()=== 'false'){
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}else{
		$.ajax({
			'url' : 'Controller_initiation_ibam/new_appr_ibam',
			'type' : 'POST',
			'data' : { 
				branch_ib,
				register_ib,
				area,
				flag_new
			},

			success : function(response){

				try{
					var v = $.parseJSON(response);
					
					if (v['dataErr'] != '200' && v['status'] == '500' ) {
						$('#inp-reg-appibam').val('');
						alert_info(v['dataErr']);
					}else if (v['dataErr'] == '200' && v['status'] == '500') {
						listAreaDropdown(branch_ib);
						$('#inp-seqibam').val('1');
						$('#slc-branch-appibam-dest').prop('disabled',false);
						$('#inp-reg-appibam').prop('disabled',true);
						$('#slc-area-code-ibam').val('8888');
						return;
					}else if(v['data'].length < 1){
						alert_info('data tidak ditemukan');
						if($('#slc-area-code-ibam').children('option').length > 2){
							return;
						}else{
							$('#inp-reg-appibam').val('');
							$('#inp-reg-appibam').prop('disabled',false);
							$('#btn-new-appibam').prop('disabled',false);
							$('#btn-search-appibam').prop('disabled',false);	
						}

					}else{
						cleartable();
						$('#slc-branch-appibam-dest').val('');
						$('#btn-search-appibam').prop('disabled',true);
						$('#btn-new-appibam').prop('disabled',true);
						var dataSrc = [];
						$('#inp-reg-appibam').prop('readonly',true);
						$('#slc-branch-appibam').attr('disabled',true);
						$('#inp-seqibam').val('1');
						$('#btn-save-appibam').prop('disabled',false);
						tbl_ibamsrc.clear().draw();
						for (var i = 0; i < v['data'].length; i++) {
							dataSrc.push([
								'<input class="check-tbl-appr" id="check-tbl-appribamsrc'+i+'" type="checkbox">',
								v['data'][i].zip_code,
								v['data'][i].szip_code,
								v['data'][i].desc_area,
								v['data'][i].desc_szip_area,
								])
						}

						tbl_ibamsrc.rows.add(dataSrc).draw(false);
						//$("th#tot-src").text(v['vcount']);
						$('tfoot th input#inp-jmlh-kontraksrc').val(v['vcount']);
						$('#hdn-inp-jmlh-kontraksrc').val(v['vcount']);
						
						if (flag == 0) {
							listAreaDropdown(branch_ib);
						} else {

						}

					}

				}catch(e){
					$('#loading-ajax').hide();
					console.log(e);
					alert_error("Terjadi Kesalahan => "+e);
				}

			},error:function(response){
				alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");

			}
		});
	}
}

var dataDst = [];
function list_cont_dest(branch,branch_new,no_reg,regis){

	$.ajax({
		'url' : 'Controller_initiation_ibam/get_list_cont_dest',
		'type' : 'POST',
		'data' : { 
			branch,
			branch_new,
			no_reg

		},

		success : function(response){

			try{
				var v = $.parseJSON(response);
				if (v['status'] != '200') {
					return;
				}else{
					
					if(v['data'].length > 0){
						cleartable();
						var status = v['ap_stat']; 
						if(status == 'APPR'){
							status = 'APPROVED';
						}else{
							status = 'REJECT';
						}

						if(v['level'] == '3'){
							alert_info('Proses Moving Account '+ regis + ' telah ' + status);							
						}else if(v['level'] == '0' || v['level'] == null){

						}else{
							alert_info('Proses Moving Account '+ regis + ' telah ' + status + ' Level ' + v['level']);
						}

						flag = 0;
						$('#btn-new-appibam').prop('disabled',true);

						dataDst = [];
						var dataSrc = [];
						$('#inp-reg-appibam').prop('readonly',true);
						$('#slc-branch-appibam').attr('disabled',true);
						$('#inp-seqibam').val('1');
						$('#slc-branch-appibam').val(branch);
						$('#slc-branch-appibam-dest').val(branch_new);
						$('#btn-search-appibam').prop('disabled',true);


						tbl_ibamdst.clear().draw();
						for (var i = 0; i < v['data'].length; i++) {
							dataDst.push([
								'<input class="check-tbl-apprdest" id="check-tbl-appribamdest'+i+'" type="checkbox">',
								v['data'][i].zip_code,
								v['data'][i].szip_code,
								v['data'][i].desc_area,
								v['data'][i].desc_szip_area,
								'',
								''
								])
							$('#inp-reg-appibam').val(v['data'][i].no_reg);
							$('#inp-appid-appibam-destchange').val(v['data'][i].appr);
							$('#inp-stat-mutibam').val(v['data'][i].mut_stat);

						}
						tbl_ibamsrc.clear().draw();
						for (var i = 0; i < v['data1'].length; i++) {
							dataSrc.push([
								'<input class="check-tbl-appr" id="check-tbl-appribamsrc'+i+'" type="checkbox">',
								v['data1'][i].zip_code,
								v['data1'][i].szip_code,
								v['data1'][i].desc_area,
								v['data1'][i].desc_szip_area,
								])
						}

						tbl_ibamsrc.rows.add(dataSrc).draw(false);
						tbl_ibamdst.rows.add(dataDst).draw(false);
						for(var i = 0 ; i < dataDst.length ; i++){
							$('#check-tbl-appribamdest'+i, $('#id-tbl-app-ibamdst')).on('click',function() {

								if (tbl_ibamdst.row($(this).closest('tr') ).data()[6] === 'Y') {
									tbl_ibamdst.row($(this).closest('tr') ).data()[6] = 'N';
								} else {
									tbl_ibamdst.row($(this).closest('tr') ).data()[6] = 'Y';
								}
							});	
						}
						$('#slc-branch-appibam-dest').prop('disabled',true);
						$('#hdn-inp-jmlh-kontrakdst').val(v['vcount']);
						$('#hdn-inp-jmlh-kontraksrc').val(v['ncount']);
						$('tfoot th input#inp-jmlh-kontrakdst').val($('#hdn-inp-jmlh-kontrakdst').val());
						$('tfoot th input#inp-jmlh-kontraksrc').val(v['ncount']);
						
						if ($('#inp-reg-appibam').val() == 'XXXXXXXXXXXXXXXXXXXX') {
							$('#btn-save-appibam').prop('disabled',false);
							$('#btn-conf-appibam').prop('disabled',false);
							$('#btn-prev-appibam').prop('disabled',true);
						}else if($('#inp-stat-mutibam').val() >= "0"){
							$('#btn-save-appibam').prop('disabled',true);
							$('#btn-conf-appibam').prop('disabled',true);
							$('#btn-prev-appibam').prop('disabled',false);
							$('#btn-hist-appibam').prop('disabled',false);
						}else if($('#inp-stat-mutibam').val() == "" && $('#inp-reg-appibam').val() != 'XXXXXXXXXXXXXXXXXXXX'){
							$('#btn-save-appibam').prop('disabled',false);
							$('#btn-conf-appibam').prop('disabled',false);
							$('#btn-prev-appibam').prop('disabled',false);
							$('#btn-hist-appibam').prop('disabled',true);
							flag_save = 0;
						}else{
							$('#btn-save-appibam').prop('disabled',false);
							$('#btn-conf-appibam').prop('disabled',true);
							$('#btn-prev-appibam').prop('disabled',false);
							$('#inp-seqibam').val('0');

						}

						$('.check-tbl-appr').change(function(){
							var lengthsrc = $('.check-tbl-appr');
							if(lengthsrc.length == lengthsrc.filter(':checked').length){
								$('#chk-all-app-ibamsrc').prop('checked',true);
							}else{
								$('#chk-all-app-ibamsrc').prop('checked',false);
							}
						});

						$('.check-tbl-apprdest').change(function(){
							var lengthdst = $('.check-tbl-apprdest');
							if(lengthdst.length == lengthdst.filter(':checked').length){
								$('#chk-all-app-ibamdst').prop('checked',true);
							}else{
								$('#chk-all-app-ibamdst').prop('checked',false);
							}
						})

						if (flag == 0) {
							listAreaDropdown(branch);
						} else {

						}
					}else{
						return false;
					}


				}

			}catch(e){
				$('#loading-ajax').hide();
				console.log(e);
				alert_error("Terjadi Kesalahan => "+e);
			}

		},error:function(response){
			alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");

		}
	});
}

function listAreaDropdown(branch){
	$.ajax({
		'url' : 'Controller_initiation_ibam/list_area_code',
		'type' : 'POST',
		'data' : { 
			branch
		},
		success : function(response){

				//var data = JSON.parse(response);
				var data2 = JSON.parse(response);
				console.log(response);
				if(JSON.stringify(response).includes('Timeout')){
					alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
				} else if(response){
					try{
						console.log(response);
						//$('<option/>').val('').html('- PILIH AREA -').appendTo('#slcibamcode').addClass('form-control').hide();
						$('#btn-search-appibam').prop('disabled',true);
						$('#btn-new-appibam').prop('disabled',true);
						$("#slc-area-code-ibam").children('option:not(:first)').remove();
						for (var i = 0; i < data2['data'].length; i++) {

							$('#slc-area-code-ibam').append('<option value="'+ data2['data'][i].area_code +'">'+data2['data'][i].area_code+" - "+data2['data'][i].desc_area+'</option>');

						}

						$('#slc-area-code-ibam').append('<option value="9999">All Area</option>');
						
						if($('#inp-stat-mutibam').val() >= "0"){
							$('#slc-area-code-ibam').prop('disabled',true);
							$('#slc-area-code-ibam').val('9999');
						}else if($('#inp-stat-mutibam').val() == '' && $('#slc-branch-appibam-dest').val() == ''){
							$('#slc-area-code-ibam').prop('disabled',false);
							$("select option[value*='8888']").prop('disabled',true);
						}else{
							$('#slc-area-code-ibam').prop('disabled',false);
							$("select option[value*='8888']").prop('disabled',true);
							$('#slc-area-code-ibam').val('9999');
						}
						

					} catch(e) {
						$('#loading-ajax').hide();
						console.log(e);
						alert_info("Terjadi Kesalahan !");
					}
        }//if response
    },error:function(response){
    	alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");

    }
})
}

function seacrh_noreg_ibam(branch_code,no_reg,flag){
	$.ajax({
		'url' : 'Controller_initiation_ibam/get_search_noreg_ibam',
		'type' : 'POST',
		'async' : false,
		'data' : { 
			
			branch_code,no_reg,flag

		},
		success : function(response){	
			
			try{
				
				var v = $.parseJSON(response);
				if (v['data'].length < 1) {
					console.log("500");
					alert_info('Data tidak ditemukan');
				} else {
					if(v['data'].length == 1 && v['data'][0].no_reg == $('#inp-reg-appibam').val()){

						$('#inp-src-searchibam').val(v['data'][0].branch);
						$('#inp-dst-searchibam').val(v['data'][0].branch_new);
						$('#inp-noreg-searchibam').val(v['data'][0].no_reg);
					}else{
						$('#id-form-aplikasi-appibam').removeClass('has-error');
						$('#modal-search-appibam').modal('show');
						var arrSearch = [];
						tbl_searchinit.clear().draw();
						var adb=[];
						for (var i = 0; i < v['data'].length; i++) {
							arrSearch.push([
								i+1,
								v['data'][i].no_reg,
								v['data'][i].branch,
								v['data'][i].branch_new,
								v['data'][i].mut_id
								])

						}

						tbl_searchinit.rows.add(arrSearch).draw(false);
					}
					
				}
				
			}catch(e){
				$('#loading-ajax').hide();
				console.log(e);
				alert_error("Terjadi Kesalahan => "+e);
			}
			
		},error:function(response){
			alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");

		}
	})
}

function insert_ibam_area(arrayData,flag){
	var srcBranch = $('#slc-branch-appibam').val();
	var destBranch = $('#slc-branch-appibam-dest').val();
	var reg = $('#inp-reg-appibam').val();
	
	$.ajax({
		'url' :'Controller_initiation_ibam/insert_ibam_area',
		'type' :'POST',
		'data' : {
			'branch' : srcBranch,
			'branch_new' : destBranch,
			'reg' : reg,
			'flag' : flag,
			arrayData
		},

		success : function(response){
			
			try{

				console.log(response);
				var v = $.parseJSON(response);
				var count = v['total'];
				if($('#hdn-inp-jmlh-kontrakdst').val() == '' ){
					$('#hdn-inp-jmlh-kontrakdst').val(0);
				}
				$('#btn-conf-appibam').prop('disabled',true);
				$('#btn-prev-appibam').prop('disabled',true);
				var total = parseInt($('#hdn-inp-jmlh-kontrakdst').val()) + parseInt(count);
				var totsrc = parseInt($('#hdn-inp-jmlh-kontraksrc').val()) - v['total'];
				total = total.toString();
				
				if(v['status'] == '200'){
					console.log(v['status']);
					console.log('Data Berhasil Disimpan');
					$('#slc-branch-appibam-dest').prop('disabled',true);
					$('#inp-mutationid').val(v['mutation_id']);
					tbl_ibamdst.rows.add(arrCheck).draw();

					for(var i = 0 ; i < arrCheck.length ; i++){
						$('#check-tbl-appribamdest'+i, $('#id-tbl-app-ibamdst')).on('click',function() {
							
							if (tbl_ibamdst.row($(this).closest('tr') ).data()[6] === 'Y') {
								tbl_ibamdst.row($(this).closest('tr') ).data()[6] = 'N';
							} else {
								tbl_ibamdst.row($(this).closest('tr') ).data()[6] = 'Y';
							}
						});	
					}
					$('#hdn-inp-jmlh-kontrakdst').val(total);
					$('tfoot tr th input#inp-jmlh-kontrakdst').val($('#hdn-inp-jmlh-kontrakdst').val());
					$('#hdn-inp-flag').val(1);

					if(totsrc <= 0){
						$('tfoot tr th input#inp-jmlh-kontraksrc').val(0);
						$('#hdn-inp-jmlh-kontraksrc').val(0);
					}else{
						$('tfoot tr th input#inp-jmlh-kontraksrc').val(totsrc);
						$('#hdn-inp-jmlh-kontraksrc').val(totsrc);
					}
					flag_save = 1;

					$('.check-tbl-apprdest').change(function(){
						var lengthdst = $('.check-tbl-apprdest');
						if(lengthdst.length == lengthdst.filter(':checked').length){
							$('#chk-all-app-ibamdst').prop('checked',true);
						}else{
							$('#chk-all-app-ibamdst').prop('checked',false);
						}
					})

				}else{
					console.log(v['status']);
				}

			}catch(e){
				$('#loading-ajax').hide();
				console.log(e);
				alert_error("Terjadi Kesalahan => "+e);
			}

		},error:function(response){
			alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");

		}

	});
}

function cek_data_ibam_dst(data,index) {
	var result = false;
	if ($('#id-tbl-app-ibamdst').DataTable().rows().data().length > 0) {
		for (var i = 0; i < $('#id-tbl-app-ibamdst').DataTable().rows().data().length; i++) {
			if (
				$('#id-tbl-app-ibamdst').DataTable().rows().data()[i][1] === data[1] && 
				$('#id-tbl-app-ibamdst').DataTable().rows().data()[i][2] === data[2]
				) {
				$("#check-tbl-appribamsrc"+index+"").prop("disabled",true);
			$("#check-tbl-appribamsrc"+index+"").prop("checked",true);
			$('#id-tbl-app-ibamdst').DataTable().rows().data()[i][5] = index;
			result = true;
		} 
	}
}
return result;
}

function delete_ibam_area(arrayData,srcBranch,destBranch,flag,reg){
	$.ajax({
		'url' :'Controller_initiation_ibam/delete_ibam_area',
		'type' :'POST',
		'data' : {
			arrayData,srcBranch,destBranch,flag,reg
		},

		success : function(response){
			
			try{
				console.log(response);
				var v = $.parseJSON(response);
				var countdst = v['total'];
				var jmlhdst = 0;
				
				if(v['status'] == '200'){
					var tbl_min = tbl_ibamdst.rows().data().length;
					$('#chk-all-app-ibamsrc').prop('checked',false);
					console.log(v['status']);
					index = [];
					for (var i = 0; i < tbl_ibamdst.rows().data().length; i++) {
						if (tbl_ibamdst.row(i).data()[6] === 'Y') {
							$("#check-tbl-appribamsrc"+tbl_ibamdst.data()[i][5]+"").prop('disabled',false);
							$("#check-tbl-appribamsrc"+tbl_ibamdst.data()[i][5]+"").prop('checked',false);
							index.push(i);
						}

					}

					$('#chk-all-app-ibamdst').prop('checked',false);
					tbl_ibamdst.rows(index).remove().draw();
					
					if(countdst != 0){
						jmlhdst = countdst;
					}

					if(jmlhdst != $('#hdn-inp-jmlh-kontraksrc').val()){
						
						var totalsrc = parseInt(jmlhdst) + parseInt($('#hdn-inp-jmlh-kontraksrc').val());
						$('tfoot th input#inp-jmlh-kontraksrc').val(totalsrc);
						$('#hdn-inp-jmlh-kontraksrc').val(totalsrc);
						
					}

					var totDel = parseInt($('#hdn-inp-jmlh-kontrakdst').val()) - parseInt(countdst);
					$('#hdn-inp-jmlh-kontrakdst').val(totDel);
					$('tfoot tr th input#inp-jmlh-kontrakdst').val($('#hdn-inp-jmlh-kontrakdst').val());

					$('#btn-conf-appibam').prop('disabled',true);
					$('#btn-prev-appibam').prop('disabled',true);
					flag_save = 1;
					$('#hdn-inp-flag').val(1);

					if(tbl_ibamdst.data().length == 0){
						$('#slc-branch-appibam-dest').prop('disabled',false);
						$('tfoot tr th input#inp-jmlh-kontrakdst').val(0);
						$('#hdn-inp-jmlh-kontrakdst').val(0);
					}

				}else{
					console.log(v['status']);
				}

			}catch(e){
				$('#loading-ajax').hide();
				console.log(e);
				alert_error("Terjadi Kesalahan => "+e);
			}

		},error:function(response){
			alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server"+response);

		}

	});
}

function cleartable(){

	var dataSrcclear = [];
	var dataDstclear = [];

	for (var i = 0; i < 11; i++) {
		dataSrcclear.push([
			'',
			'',
			'',
			'Kode Area',
			'',
			'',
			''
			])
	}

	tbl_ibamsrc.rows.add(dataSrcclear).draw(false);

	if(tbl_ibamdst.data().length == 0){
		for (var i = 0; i < 11; i++) {
			dataDstclear.push([
				'',
				'',
				'',
				'Kode Area',
				'',
				'',
				''
				])
		}

		tbl_ibamdst.rows.add(dataDstclear).draw(false);
		tbl_ibamdst.clear().draw();
	}
}

function history_ibam(registrasi,br_id){
	$.ajax({
		'url' :'Controller_approval_ibam/hist_appr_ibam',
		'type' :'POST',
		'data' : {
			registrasi,
			br_id
		},

		success : function(response){

			try{
				$('#modal-hist-appibam').modal('show');
				console.log(response);

				var v = $.parseJSON(response);
				if(v['data'].length < 1 ){
					// alert_info('Tidak ada data history');
					tbl_hisappr.clear().draw();
					$('#mod-src-appr-ibam').val('');
					$('#mod-dest-appr-ibam').val('');
					$('#mod-reg-appr-ibam').val('');
				}else{
					
					tbl_hisappr.clear().draw();
					for (var i = 0; i < v['data'].length ; i++) {

						$('#mod-src-appr-ibam').val(v['data'][i].src_br_id +'-'+v['data'][i].branch_name);
						$('#mod-dest-appr-ibam').val(v['data'][i].br_name+'-'+v['data'][i].branch_new_name);
						$('#mod-reg-appr-ibam').val(v['data'][i].register);
						tbl_hisappr.row.add([
							v['data'][i].user_id,
							v['data'][i].job_name,
							v['data'][i].level,
							v['data'][i].sysdate,
							v['data'][i].status,
							v['data'][i].reason,
							v['data'][i].apprid

							]).draw(false);
					}
				}

			}catch(e){
				$('#loading-ajax').hide();
				console.log(e);
				alert_error("Terjadi Kesalahan => "+e);
			}

		},error:function(response){
			alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");

		}

	});
}

