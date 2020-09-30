/* variable global
$(document).ready(function() {}); */
/*----- variable nomor memo --------*/
 
var nomor_memo_titip_ketitipan_tanpa_nama = ''; 
var nomor_memo_titip_akeb = ''; 
var nomor_memo_titip_ke_pendapatan = '';
var nomor_memo_ttanpanama_ketitipan = ''; 
var nomor_memo_ar_titipan = '';
var nomor_memo_denda_titipan = '';
/*----- variable nomor memo --------*/

/*----- variable nomor kontrak --------*/ 

var nomor_kontrak_titip_ke_ttanpa_nama = ''; 
var nomor_kontrak_titipan_a = '';
var nomor_kontrak_titipan_b = '';
var nomor_kontrak_tujuan_ttanpa_nama_ke_titipan = '';
var nomor_kontrak_ar_ke_titip = '';
var nomor_kontrak_denda_titipan = '';
/*----- variable nomor kontrak --------*/

/*----- variable nama nasabah -----*/

var nama_nasabah_titip_titipan_tanpa_nama = '';
var nama_nasabah_ar_titipan = '';
var nama_nasabah_denda_titipan = '';
/*----- variable nama nasabah -----*/

/*----- variable saldo -----*/

var saldo_titip_titipan_tanpa_nama = '';
var saldo_ar_titipan = '';
var saldo_denda_titipan = '';
/*----- variable saldo -----*/
var norv_ttanpa_nama_ketitipan = ''; 

var nomor_memo = '';



/* --------------------------------------------------------------------------------------------------*/


/* --------------------------------------------------------------------------------------------------*/




var table_titipan_ke_titipan_tanpa_nama = $('#table-titipan-ke-titipan-tanpa-nama').DataTable({
	responsive: true
});

var table_titipanA_ke_titipanB = $('#table-titipanA-ketitipanB').DataTable({
	responsive: true
});

var table_titipan_ke_pendapatan = $('#table-titipan-ke-pendapatan').DataTable({
	responsive: true
});

var table_titipan_tanpa_nama_ke_muf = $('#table-titipan-tanpa-nama-ke-muf').DataTable({
	responsive: true
});

var table_titipan_tanpa_nama_ke_titipan = $('#table-titipan-tanpa-nama-ke-titipan').DataTable({
	responsive: true
});

var table_ar_ke_titipan = $('#table-ar-ke-titipan').DataTable({
	responsive: true
});

var table_denda_ke_titipan = $('#table-denda-ke-titipan').DataTable({
	responsive: true
});
/*-----------------------------------------------------------------------------------------------------*/

/*--------------- Disable Alphabet ---------------*/
$('.inp-number').on('keydown', function(e) {
	-1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) 
	&& (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode 
	&& 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) 
	&& (96 > e.keyCode || 105 < e.keyCode)
	&& e.preventDefault()
});

/*--------------- Disable Number -----------------*/
$('.inp-alphabet').on('keydown', function(e){
	var keyCode = (e.keyCode ? e.keyCode : e.which);
	if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 111) || 105 < keyCode) { 
		e.preventDefault();
	}
});

/*--------------- Disable Symbol ----------------*/
$('.inp-alphabet-number').on('keydown', function(e){
	-1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) 
	&& (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode 
	&& 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 90 < e.keyCode) 
	&& (96 > e.keyCode || 105 < e.keyCode)
	&& e.preventDefault()
});

/*--------------- Disable Several Symbol --------*/
$('.no-several-char').keypress(function (e) {
	if (e.which === 39 || e.which === 34 || e.which === 35 || (e.which > 57 && e.which < 61)
		|| e.which === 62 || (e.which > 90 && e.which < 97) || (e.which > 122 && e.which < 127) || e.which === 13) {
		return false;
} else {
}
});

/*--------------------------------cari berdasarkan nomor memo--------------------------------*/
$('#search-memo-kontrak').click(function(){
	var no_memo = $('#inp-nomor-memo').val();

	if (no_memo ===''){
		alert_error("Silahkan Input 12 Digit Nomor Memo");
		$('#nomor-memo-validasi').addClass('has-error');
	}else if (no_memo.length.length != 12) {
		alert_error("Silahkan Input 12 Digit Nomor Memo");
		$('#nomor-memo-validasi').addClass('has-error');
	}
	else		
	{
		$.ajax({
			url: base_url+"Controller_deposit_to_ar/search_no_memo",
			type: 'POST',
			dataType: 'json',
			data:{
				nomor_memo: nomor_memo,
				branch_id: select_branch
			},
			cache: false,
			success:function(response){
				console.log(response);
				if (response['Error']) {						
					console.log(response['Error']);
					alert_error(response['Error']);
				}
				else{

					if (response['overbook_type']== 1 )

						switch (response['overbook_type']) {
							case 0:
							$('#inp-no-kontrak-titipan-ar').val(response['nokontrak']);
							$('#inp-memo-titipan-ar').val(response['nomemo']);
							$('#inp-nama-nasabah-titipan-ar').val(response['nama']);
							$('#inp-saldo-titipan-ar').val(response['saldo']);
							table_titipan_ke_ar.clear();
							$.each(response['ListAr'], function(index){
								table_titipan_ke_ar.row.add([								
									'<input id= "check-angsuran-' + index + '" class="check_angsuran" type="checkbox">',								
									response['ListAr'][index]['deskripsi'],
									response['ListAr'][index]['angsuran'],
									response['ListAr'][index]['angsuranke'],
									response['ListAr'][index]['tgl_penerimaan'],
									]).draw(false);
							});
							//menuju tab yang dipilih
							$('#tab-titipan-ke-ar').attr()
							break;
							case 1:
							$('#inp-no-kontrak-titipan-denda').val(response['nokontrak']);
							$('#inp-memo-titipan-denda').val(response['nomemo']);
							$('#inp-nama-nasabah-titipan-denda').val(response['nama']);
							$('#inp-saldo-titipan-denda').val(response['saldo']);
							table_titipan_ke_denda.clear();
							$.each(response['ListDenda'], function(index){
								table_titipan_ke_denda.row.add([								
									'<input id= "check-angsuran-' + index + '" class="check_angsuran" type="checkbox">',								
									response['ListAr'][index]['deskripsi'],
									response['ListAr'][index]['angsuran'],
									response['ListAr'][index]['angsuranke'],
									response['ListAr'][index]['tgl_penerimaan'],
									]).draw(false);
							});
							break;
							case 2:
							$('#inp-no-kontrak-titip-titipan-tanpa-nama').val(response['nokontrak']);
							$('#inp-memo-titipan-titipan-tanpa-nama').val(response['nomemo']);
							$('#inp-nama-nasabah-titip-titipan-tanpa-nama').val(response['nama']);
							$('#inp-saldo-titip-titipan-tanpa-nama').val(response['saldo']);
							table_titipan_ke_titipan_tanpa_nama.clear();
							$.each(response['ListAr'], function(index){
								table_titipan_ke_ar.row.add([								
									'<input id= "check-angsuran-' + index + '" class="check_angsuran" type="checkbox">',								
									response['ListAr'][index]['deskripsi'],
									response['ListAr'][index]['angsuran'],
									response['ListAr'][index]['angsuranke'],
									response['ListAr'][index]['tgl_penerimaan'],
									]).draw(false);
							});
							break;
							case 3:
							$('#inp-no-kontrak-titipan-a').val(response['nokontrakA']);
							$('#inp-no-kontrak-titipan-b').val(response['nokontrakB']);
							$('#inp-memo-titipan-akeb').val(response['memo-akeb']);
							table_titipanA_ke_titipanB.clear();
							$.each(response['ListAr'], function(index){
								table_titipanA_ke_titipanB.row.add([								
									'<input id= "check-angsuran-' + index + '" class="check_angsuran" type="checkbox">',								
									response['ListAr'][index]['deskripsi'],
									response['ListAr'][index]['angsuran'],
									response['ListAr'][index]['angsuranke'],
									response['ListAr'][index]['tgl_penerimaan'],
									]).draw(false);
							});
							break;
							case 4:						       
							$('#inp-memo-titipan-ke-pendapatan').val(response['nomemo']);								
							table_titipan_ke_pendapatan.clear();
							$.each(response['ListAr'], function(index){
								table_titipan_ke_pendapatan.add([								
									'<input id= "check-angsuran-' + index + '" class="check_angsuran" type="checkbox">',								
									response['ListAr'][index]['deskripsi'],
									response['ListAr'][index]['angsuran'],
									response['ListAr'][index]['angsuranke'],
									response['ListAr'][index]['tgl_penerimaan'],
									]).draw(false);
							});
							break;
							case 5:
							$('#inp-no-rv-titipan-tanpa-nama-ketitipan').val(response['nokontrak']);
							$('#inp-no-kontrak-tujuan-titipan-tanpa-nama-ketitipan').val(response['kontrak_tujuan']);
							$('#inp-memo-ttanpanama-ketitipan').val(response['nomemo']);								
							table_titipan_tanpa_nama_ke_titipan.clear();
							$.each(response['ListAr'], function(index){
								table_titipan_tanpa_nama_ke_titipan.row.add([								
									'<input id= "check-angsuran-' + index + '" class="check_angsuran" type="checkbox">',								
									response['ListAr'][index]['deskripsi'],
									response['ListAr'][index]['angsuran'],
									response['ListAr'][index]['angsuranke'],
									response['ListAr'][index]['tgl_penerimaan'],
									]).draw(false);
							});
							break;
							case 7:
							$('#inp-no-kontrak-ar-titipan').val(response['nokontrak']);
							$('#inp-memo-ar-titipan').val(response['nomemo']);
							$('#inp-nama-nasabah-ar-titipan').val(response['nama']);
							$('#inp-saldo-ar-titipan').val(response['saldo']);
							table_ar_ke_titipan.clear();
							$.each(response['ListAr'], function(index){
								table_titipan_ke_denda.row.add([								
									'<input id= "check-angsuran-' + index + '" class="check_angsuran" type="checkbox">',								
									response['ListAr'][index]['deskripsi'],
									response['ListAr'][index]['angsuran'],
									response['ListAr'][index]['angsuranke'],
									response['ListAr'][index]['tgl_penerimaan'],
									]).draw(false);
							});
							break;
							case 11:
							$('#inp-no-kontrak-denda-titipan').val(response['nokontrak']);
							$('#inp-memo-denda-ketitipan').val(response['nomemo']);
							$('#inp-nama-nasabah-denda-titipan').val(response['nama']);
							$('#inp-saldo-denda-titipan').val(response['saldo']);
							table_denda_ke_titipan.clear();
							$.each(response['ListAr'], function(index){
								table_denda_ke_titipan.row.add([								
									'<input id= "check-angsuran-' + index + '" class="check_angsuran" type="checkbox">',								
									response['ListAr'][index]['deskripsi'],
									response['ListAr'][index]['angsuran'],
									response['ListAr'][index]['angsuranke'],
									response['ListAr'][index]['tgl_penerimaan'],
									]).draw(false);
							});
						}						
					}

				},
				error:function(response){
					console.log(response);

				}
			});
}
})
/*--------------------------------cari berdasarkan nomor memo--------------------------------*/

/*--------------------------------button kembali ke menu awal--------------------------------*/
$('#back-to-search-memo').click(function(){
	window.location.href=base_url+"controller_deposit_to_ar";
});
/*--------------------------------button kembali ke menu awal--------------------------------*/



/*----- create new data overbook (memunculkan tab tab yang ingin dipilih) -----*/
var select_branch = '';
var kode_cabang_detail = '';
var nama_cabang_detail = '';

$('#create-new-memo-kontrak').click(
	function(){
		kode_cabang_detail = $('#branch-code').val();
		nama_cabang_detail = $('#branch-name').val();
		if(kode_cabang_detail !=='0000'){
			console.log("masuk sebagai cabang");			
			$('#div-list-branch').show();			
			$('#slc-branch-depositar').prop('disabled', true);
			$('<option/>').val(kode_cabang_detail).html(kode_cabang_detail+' - '+nama_cabang_detail).appendTo('#slc-branch-depositar');
			$('#back-to-search-memo').show();
			$('#kode-cabang').show();
			$('#menu-tab-utama').show();
			$('#memo-tanggal').show();
			$('#content-sub-tab').show();
			$('#panel-memo').hide();
		}else
		{
			get_data_branch('#slc-branch-depositar');
			$('#div-list-branch').show();
			$('#back-to-search-memo').show();
			$('#kode-cabang').show();
			$('#menu-tab-utama').show();
			$('#memo-tanggal').show();
			$('#content-sub-tab').show();
			$('#panel-memo').hide();				
		}

	})
/*--------------------------------create new data overbook --------------------------------*/



/*---------------- simpan nama kode cabang dan nama cabang ----------------*/

//$('#kode-cabang').val(kode_cabang_detail+'  -  '+nama_cabang_detail);

/*--------------------------- simpan nama kode cabang dan nama cabang ---------------------------*/


var data_titipan_ke_ar = '';

$('#table-titipan-ke-ar tbody').on('click', '.check_angsuran', function(){
	console.log(this);
	data_titipan_ke_ar = table_titipan_ke_ar.row($(this).parents('tr')).data();	
	console.log(data_titipan_ke_ar);

});


$('#check-all-angsuran').click(
	function(){
		console.log('masuk ke fungsi berjalan');
		if ($('#check-all-angsuran').is(':checked')){
			$('.check_angsuran').prop('checked', true);
			data_titipan_ke_ar = table_titipan_ke_ar.row($(this).parents('th')).data();
			console.log("checklist berhasil");
		}else{
			$('.check_angsuran').prop('checked', false);
			console.log("checklist dibatalkan");
		}
	});

/*--------------------------- search nomor kontrak tab titipan to ar ---------------------------*/


/*--------------------------- search nomor kontrak tab titipan to denda ---------------------------*/
$('#search-no-kontrak-titipan-denda').click(	
	function(){	
		var nomor_kontrak_titip_ke_denda = $('#inp-no-kontrak-titipan-denda').val();	
		if (nomor_kontrak_titip_ke_denda === '' ){
			alert_error("Silahkan isi nomor kontrak dulu");
			$('#nokontrak-validasi-titip-todenda').addClass('has-error');
			console.log(nomor_kontrak_titip_ke_denda);
		}
		else if (nomor_kontrak_titip_ke_denda.length !== 12) {
			alert_error("Silahkan isi 12 digit nomor kontrak");
			$('#nokontrak-validasi-titip-todenda').addClass('has-error');
			console.log(nomor_kontrak_titip_ke_denda);
		}

		else
		{					
			$.ajax({
				url: base_url+"Controller_deposit_to_ar/search_data",
				type: 'POST',
				dataType: 'json',
				data:{
					nomor_contract: nomor_kontrak_titip_ke_denda,
					branch_id: nama_cabang
				},
				cache: false,
				success:function(response){
					console.log(response);
					if (response['Error']) {
						console.log(response['Error']);
						alert_error(response['Error']);
					}
					else{						
						$('#inp-nama-nasabah-titipan-ar').val(response['nama']);
						$('#inp-saldo-titipan-ar').val(response['saldo']);
						table_titipan_ke_ar.clear();
						$.each(response['ListAr'], function(index){
							table_titipan_ke_ar.row.add([
								'<input id= "check-angsuran' + index + '" class="check_angsuran" type="checkbox">',
								response['ListAr'][i]['deskripsi'],
								response['ListAr'][i]['angsuran'],
								response['ListAr'][i]['angsuranke'],
								response['ListAr'][i]['tgl_penerimaan'],
								]).draw(false);
						});
					}
				},
				error:function(response){
					console.log(response);
				}
			});
		}
	});
/*--------------------------- search nomor kontrak tab titipan to denda ---------------------------*/


/*----------------------------------------------  button simpan  ----------------------------------------------*/
/*--------------------------- 1 button simpan titipan ke angsuran ---------------------------*/
$('#btn-save-titipan-ar').click(
	function(){
		saldo_titip_ke_ar = $('#inp-saldo-titipan-ar').val();
		nama_nasabah_titip_ke_ar = $('#inp-nama-nasabah-titipan-ar').val();		
		nomor_kontrak_titip_ke_ar = $('#inp-no-kontrak-titipan-ar').val();
		if (nomor_kontrak_titip_ke_ar.length !== 12 ) {
			alert_error("Silahkan input nomor kontrak secara lengkap, sebanyak 12 digit");
			$('#nokontrak-validasi-titip-toar, #validasi-nasabah-titip-toar, #validasi-saldo-titip-toar').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			//alert_error("lolos validasi simpan titipan to ar");		
			modal_confirm("Apakah anda yakin ingin menyimpan data ini?", function(){
				$.ajax({
					url: base_url+"Controller_deposit_to_ar/insert_titipan_ke_ar",
					type: 'POST',
					dataType: 'json',
					data: {
						nomor_kontrak: nomor_kontrak,
						nomor_memo: nomor_memo,
						nama_nasabah: nama_nasabah,
						saldo: saldo						
					},
					success: function(response){
						console.log(response);
						if (response) {
							try{
								if (response['errorConsole']) {
									modal_confirm_unsuccess("Data Gagal DiSimpan, Silahkan Coba Lagi.");
								}
								else if (response['Status'] !== 'Data Berhasil Diinput') {
									modal_confirm_unsuccess("Data Gagal Disimpan, Silahkan Coba Lagi.")
								}
								else {
									modal_confirm_success("Data Dengan Nomor Laporan " +response['noLaporan']+ " Berhasil Disimpan", function(){
										window.location.href = base_url+"Controller_customer_handling";
									});
								}
							}
							catch(e){
								$('#loading-ajax').hide();
								console.log(e);
								modal_alert("Terjadi Kesalahan, Silahkan Hubungi Tim IT");
							}
						}
					},
					error: function(response){
						console.log(response);
					}
				});
			});
			
		}

	});
/*--------------------------- 2 button simpan titipan ke denda ---------------------------*/
var ListAr = {};
var deskripsi = [];
var angsuran = [];
var angsuranke = [];
var tgl_penerimaan [];
$('#btn-save-titipan-denda').click(
	function(){

		saldo_titip_ke_denda = $('#inp-saldo-titipan-denda').val();
		nama_nasabah_titip_ke_denda = $('#inp-nama-nasabah-titipan-denda').val();		
		nomor_kontrak_titip_ke_denda = $('#inp-no-kontrak-titipan-denda').val();
		if (nomor_kontrak_titip_ke_denda === '' && nama_nasabah_titip_ke_denda === '' && saldo_titip_ke_denda === ''){
			alert_error("silahkan lakukan pencarian dengan memasukan 12 digit nomor kontrak");
			$('#nokontrak-validasi-titip-todenda, #validasi-nasabah-titip-todenda, #validasi-saldo-titip-todenda').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_kontrak_titip_ke_denda.length !== 12 && nama_nasabah_titip_ke_denda === '' && saldo_titip_ke_denda ==='' ) {
			alert_error("data tidak tersedia, silahkan cari data kembali");
			$('#nokontrak-validasi-titip-todenda, #validasi-nasabah-titip-todenda, #validasi-saldo-titip-todenda').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			//alert_error("lolos validasi simpan titipan to denda");
			modal_confirm("Apakah anda yakin ingin menyimpan data ini?", function(){
				$.ajax({
					url: base_url+"Controller_deposit_to_ar/insert_titipan_ke_denda",
					type: 'POST',
					dataType: 'json',
					data: {
						nomor_kontrak: nomor_kontrak,
						nomor_memo: nomor_memo,
						nama_nasabah: nama_nasabah,
						saldo: saldo

					},
					success: function(response){
						console.log(response);
						if (response) {
							try{
								if (response['errorConsole']) {
									modal_confirm_unsuccess("Data Gagal DiSimpan, Silahkan Coba Lagi.");
								}
								else if (response['Status'] !== 'Data Berhasil Diinput') {
									modal_confirm_unsuccess("Data Gagal Disimpan, Silahkan Coba Lagi.")
								}
								else {
									modal_confirm_success("Data Dengan Nomor Laporan " +response['noLaporan']+ " Berhasil Disimpan", function(){
										window.location.href = base_url+"Controller_customer_handling";
									});
								}
							}
							catch(e){
								$('#loading-ajax').hide();
								console.log(e);
								modal_alert("Terjadi Kesalahan, Silahkan Hubungi Tim IT");
							}
						}
					},
					error: function(response){
						console.log(response);
					}
				});
			});
		}
	});
/*--------------------------- 3 button simpan titipan ke titipan tanpa nama ---------------------------*/
$('#btn-save-titip-titipan-tanpa-nama').click(
	function(){
		saldo_titip_titipan_tanpa_nama = $('#inp-saldo-titip-titipan-tanpa-nama').val();
		nama_nasabah_titip_titipan_tanpa_nama = $('#inp-nama-nasabah-titip-titipan-tanpa-nama').val();		
		nomor_kontrak_titip_ke_ttanpa_nama = $('#inp-no-kontrak-titip-titipan-tanpa-nama').val();
		if (nomor_kontrak_titip_ke_ttanpa_nama === '' && nama_nasabah_titip_titipan_tanpa_nama === '' && saldo_titip_titipan_tanpa_nama === ''){
			alert_error("silahkan lakukan pencarian dengan memasukan 12 digit nomor kontrak");
			$('#nokontrak-validasi-titip-to-ttanpa-nama, #validasi-nasabah-titip-to-ttanpa-nama, #validasi-saldo-titip-to-ttanpa-nama').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_kontrak_titip_ke_ttanpa_nama.length !== 12 && nama_nasabah_titip_titipan_tanpa_nama === '' && saldo_titip_titipan_tanpa_nama ==='' ) {
			alert_error("data tidak tersedia, silahkan cari data kembali");
			$('#nokontrak-validasi-titip-to-ttanpa-nama, #validasi-nasabah-titip-to-ttanpa-nama, #validasi-saldo-titip-to-ttanpa-nama').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi simpan titipan to titipan tanpa nama");
		}
	});
/*--------------------------- 3 button simpan titipan ke titipan tanpa nama ---------------------------*/

/*--------------------------- 4 button simpan titipan A ke titipan B ---------------------------*/
$('#btn-save-titipan-a-ke-b').click(
	function(){
		nomor_kontrak_titipan_a = $('#inp-no-kontrak-titipan-a').val();
		nomor_kontrak_titipan_b = $('#inp-no-kontrak-titipan-b').val();		
		if (nomor_kontrak_titipan_a === '' && nomor_kontrak_titipan_b === ''){
			alert_error("silahkan isi kedua nomor kontrak untuk melakukan pencarian");
			$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b').addClass('has-error');
			console.log('gagal, validasi 1')
		}
		else if (nomor_kontrak_titipan_a === '' && nomor_kontrak_titipan_b !== '') {
			alert_error("silahkan isi nomor kontrak A");
			$('#nokontrak-validasi-titip-a').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else if (nomor_kontrak_titipan_a !== '' && nomor_kontrak_titipan_b === '') {
			alert_error("silahkan isi nomor kontrak B");
			$('#nokontrak-validasi-titip-b').addClass('has-error');
			console.log('gagal, validasi 3')
		}		
		else if (nomor_kontrak_titipan_a.length !== 12 && nomor_kontrak_titipan_b !== 12) {
			alert_error("masukan 12 digit nomor kontrak dengan benar");
			$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b').addClass('has-error');
			console.log('gagal, validasi 4')
		}
		else
		{			
			alert_error("lolos validasi, simpan titipan a ke titipan b");
		}
	});
/*--------------------------- 4 button simpan titipan A ke titipan B ---------------------------*/

/*--------------------------- 5 button simpan titipan ke pendapatan ---------------------------*/
$('#btn-save-titipan-pendapatan').click(
	function(){
		
	});
/*--------------------------- 5 button simpan titipan ke pendapatan ---------------------------*/

/*--------------------------- 6 button simpan titipan tanpa nama ke titipan ---------------------------*/
/*$('#btn-save-titipan-tanpa-nama-ke-titipan').click(
	function(){
		norv_ttanpa_nama_ketitipan = $('#inp-no-rv-titipan-tanpa-nama-ketitipan').val();
		nomor_kontrak_tujuan_ttanpa_nama_ke_titipan = $('#inp-no-kontrak-tujuan-titipan-tanpa-nama-ketitipan').val();
		if (norv_ttanpa_nama_ketitipan === '' && nomor_kontrak_tujuan_ttanpa_nama_ke_titipan === '' ){
			alert_error('silhakan lakuakn pencarian dengan memasukan nomor rv dan nomor kontrak tujuan');
			$('#norv-validasi-titipan-tanpa-nama-ketitipan, #nokontrak-tujuan-validasi-titipan-tanpa-nama-ketitipan').addClass('has-error');
		}
		else if (norv_ttanpa_nama_ketitipan !== '' && nomor_kontrak_tujuan_ttanpa_nama_ke_titipan === '') {
			alert_error('isi nomor kontrak tujuan');
			$('#nokontrak-tujuan-validasi-titipan-tanpa-nama-ketitipan').addClass('has-error');
		}
		else if (norv_ttanpa_nama_ketitipan === '' && nomor_kontrak_tujuan_ttanpa_nama_ke_titipan !== '') {
			alert_error('isi nomor kontrak tujuan');
			$('#norv-validasi-titipan-tanpa-nama-ketitipan').addClass('has-error');
		}
		else if (norv_ttanpa_nama_ketitipan.length !== 12 && nomor_kontrak_tujuan_ttanpa_nama_ke_titipan.length !== 12) {
			alert_error('masukan 12 digit nomor RV dan nomor Kontrak');
			$('#norv-validasi-titipan-tanpa-nama-ketitipan, #nokontrak-tujuan-validasi-titipan-tanpa-nama-ketitipan').addClass('has-error');
		}
		else {
			alert_error("lolos validasi simpan titipan tanpa nama ke titipan");
		}
		
	});*/
/*--------------------------- 6 button simpan titipan tanpa nama ke titipan ---------------------------*/

/*-------------------------- 7 button simpan angsuran ke titipan ---------------------------*/
/*$('#btn-save-ar-titipan').click(
	function(){		
		saldo_ar_titipan = $('#inp-saldo-ar-titipan').val();
		nama_nasabah_ar_titipan = $('#inp-nama-nasabah-ar-titipan').val();		
		nomor_kontrak_ar_titipan = $('#inp-no-kontrak-ar-titipan').val();
		if (nomor_kontrak_ar_titipan === '' && nama_nasabah_ar_titipan === '' && saldo_ar_titipan === ''){
			alert_error("silahkan lakukan pencarian dengan memasukan 12 digit nomor kontrak");
			$('#nokontrak-validasi-ar-titipan, #validasi-nasabah-ar-titipan, #validasi-saldo-ar-titipan').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_kontrak_titip_ke_ttanpa_nama.length !== 12 && nama_nasabah_titip_titipan_tanpa_nama === '' && saldo_titip_titipan_tanpa_nama ==='' ) {
			alert_error("data tidak tersedia, silahkan cari data kembali");
			$('#nokontrak-validasi-ar-titipan, #validasi-nasabah-ar-titipan, #validasi-saldo-ar-titipan').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi simpan titipan to titipan tanpa nama");
		}
	});*/
/*-------------------------- 7 button simpan angsuran ke titipan ---------------------------*/

/*-------------------------- 8 button simpan denda ke titipan ---------------------------*/
$('#btn-save-denda-titipan').click(
	function(){
		saldo_denda_titipan = $('#inp-saldo-denda-titipan').val(); 
		nama_nasabah_denda_titipan = $('#inp-nama-nasabah-denda-titipan').val(); 		
		nomor_kontrak_denda_titipan = $('#inp-no-kontrak-denda-titipan').val();  
		if (nomor_kontrak_denda_titipan === '' && nama_nasabah_denda_titipan === '' && saldo_denda_titipan === ''){
			alert_error("silahkan lakukan pencarian dengan memasukan 12 digit nomor kontrak");
			$('#nokontrak-validasi-denda-titipan, #validasi-nasabah-denda-titipan, #validasi-saldo-denda-titipan').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_kontrak_titip_ke_ttanpa_nama.length !== 12 && nama_nasabah_titip_titipan_tanpa_nama === '' && saldo_titip_titipan_tanpa_nama ==='' ) {
			alert_error("data tidak tersedia, silahkan cari data kembali");
			$('#nokontrak-validasi-ar-titipan, #validasi-nasabah-denda-titipan, #validasi-saldo-denda-titipan').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi simpan titipan to titipan tanpa nama");
		}
	});
/*-------------------------- 8 button simpan denda ke titipan ---------------------------*/
/*----------------------------------------------  button simpan  ----------------------------------------------*/

/*----------------------------------------------  button konfirmasi  ----------------------------------------------*/
/*-------------------------- 1 button konfirmasi titipan ke angsuran ---------------------------*/
$('#btn-confirm-titipan-ar').click(
	function(){
		nomor_memo_titip_ar = $('#inp-memo-titipan-ar').val();
		saldo_titip_ke_ar = $('#inp-saldo-titipan-ar').val();
		nama_nasabah_titip_ke_ar = $('#inp-nama-nasabah-titipan-ar').val();		
		nomor_kontrak_titip_ke_ar = $('#inp-no-kontrak-titipan-ar').val();
		if (nomor_memo_titip_ar === '' && nomor_kontrak_titip_ke_ar === '' && nama_nasabah_titip_ke_ar === '' && saldo_titip_ke_ar === ''){
			alert_error("tidak ada data untuk di konfirmasi");
			$('#nomemo-validasi-titip-toar, #nokontrak-validasi-titip-toar, #validasi-nasabah-titip-toar, #validasi-saldo-titip-toar').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_memo_titip_ar !== 12 && nomor_kontrak_titip_ke_ar.length !== 12 && nama_nasabah_titip_ke_ar === '' && saldo_titip_ke_ar ==='' ) {
			alert_error("tidak ada data untuk di konfirmasi");
			$('#nomemo-validasi-titip-toar, #inp-nama-nasabah-titipan-ar, #inp-saldo-titipan-ar').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi konfirmasi titipan to angsuran");
		}
	});
/*-------------------------- 1 button konfirmasi titipan ke angsuran ---------------------------*/

/*-------------------------- 2 button konfirmasi titipan ke denda ---------------------------*/
$('#btn-confirm-titipan-denda').click(
	function(){
		nomor_memo_titip_denda = $('#inp-memo-titipan-denda').val();
		saldo_titip_ke_denda = $('#inp-saldo-titipan-denda').val();
		nama_nasabah_titip_ke_denda = $('#inp-nama-nasabah-titipan-denda').val();		
		nomor_kontrak_titip_ke_denda = $('#inp-no-kontrak-titipan-denda').val();
		if (nomor_memo_titip_ar === '' && nomor_kontrak_titip_ke_ar === '' && nama_nasabah_titip_ke_ar === '' && saldo_titip_ke_ar === ''){
			alert_error("tidak ada data untuk di konfirmasi");
			$('#nomemo-validasi-titip-todenda, #nokontrak-validasi-titip-todenda, #validasi-nasabah-titip-todenda, #validasi-saldo-titip-todenda').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_memo_titip_denda !== 12 && nomor_kontrak_titip_ke_denda.length !== 12 && nama_nasabah_titip_ke_denda === '' && saldo_titip_ke_denda ==='' ) {
			alert_error("tidak ada data untuk di konfirmasi");
			$('#nomemo-validasi-titip-todenda, #nokontrak-validasi-titip-todenda, #validasi-nasabah-titip-todenda, #validasi-saldo-titip-todenda').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi konfirmasi titipan to denda");
		}
	});
/*-------------------------- 2 button konfirmasi titipan ke denda ---------------------------*/

/*-------------------------- 3 button konfirmasi titipan ke titipan tanpa nama ---------------------------*/
$('#btn-confirm-titip-titipan-tanpa-nama').click(
	function(){
		nomor_memo_titip_ketitipan_tanpa_nama = $('#inp-memo-titipan-titipan-tanpa-nama').val(); 
		saldo_titip_titipan_tanpa_nama = $('#inp-saldo-titip-titipan-tanpa-nama').val();
		nama_nasabah_titip_titipan_tanpa_nama = $('#inp-nama-nasabah-titip-titipan-tanpa-nama').val();		
		nomor_kontrak_titip_ke_ttanpa_nama = $('#inp-no-kontrak-titip-titipan-tanpa-nama').val();
		if (nomor_memo_titip_ketitipan_tanpa_nama === '' && nomor_kontrak_titip_ke_ttanpa_nama === '' && nama_nasabah_titip_titipan_tanpa_nama === '' && saldo_titip_titipan_tanpa_nama === ''){
			alert_error("tidak ada data untuk di konfirmasi");
			$('#nomemo-validasi-titip-totitipan-tnama, #nokontrak-validasi-titip-totitipan-tnama, #validasi-nasabah-titip-totitipan-tnama, #validasi-saldo-titip-totitipan-tnama').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_memo_titip_ketitipan_tanpa_nama.length !== 12 && nomor_kontrak_titip_ke_ttanpa_nama.length !== 12 && nama_nasabah_titip_titipan_tanpa_nama === '' && saldo_titip_titipan_tanpa_nama ==='' ) {
			alert_error("tidak ada data untuk di konfirmasi");
			$('#nomemo-validasi-titip-totitipan-tnama, #nokontrak-validasi-titip-totitipan-tnama, #validasi-nasabah-titip-totitipan-tnama, #validasi-saldo-titip-totitipan-tnama').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi konfirmasi titipan to denda");
		}
	});
/*-------------------------- 3 button konfirmasi titipan ke titipan tanpa nama ---------------------------*/

/*-------------------------- 4 button konfirmasi titipan A ke B ---------------------------*/
$('#btn-confirm-titipan-a-ke-b').click(
	function(){
		nomor_kontrak_titipan_a = $('#inp-no-kontrak-titipan-a').val(); 
		nomor_kontrak_titipan_b  = $('#inp-no-kontrak-titipan-b').val();
		nomor_memo_titip_akeb = $('#inp-memo-titipan-akeb').val();
		if (nomor_kontrak_titipan_a === '' && nomor_kontrak_titipan_b === '' && nomor_memo_titip_akeb === '' ){
			alert_error("tidak ada data untuk di konfirmasi");
			$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b, #nomemo-validasi-titip-akeb').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_kontrak_titipan_a.length !== 12 && nomor_kontrak_titipan_b.length !== 12 && nomor_memo_titip_akeb.length !== 12) {
			alert_error("tidak ada data untuk di konfirmasi");
			$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b, #nomemo-validasi-titip-akeb').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi konfirmasi titipan a to titipan b");
		}
	});
/*-------------------------- 4 button konfirmasi titipan A ke B ---------------------------*/

/*-------------------------- 5 button konfirmasi titipan ke pendapatan ---------------------------*/
/*$('#btn-confirm-titipan-pendapatan').click(
	function(){
		nomor_memo_titip_ke_pendapatan = $('#inp-memo-titipan-ke-pendapatan').val();
		if (nomor_memo_titip_ke_pendapatan === '' && nomor_memo_titip_ke_pendapatan.length !== 12){
			alert_error("tidak ada data untuk di konfirmasi");
			$('#nomemo-validasi-titip-ke-pendapatan').addClass('has-error');
			console.log('gagal, validasi ')
		}
		else
		{			
			alert_error("lolos validasi konfirmasi titipan kependapatan");
		}
	});*/
/*-------------------------- 5 button konfirmasi titipan ke pendapatan ---------------------------*/

/*-------------------------- 6 button konfirmasi titipan tanpa nama ke titipan ---------------------------*/
$('#btn-confirm-titipan-tanpa-nama-ke-titipan').click(
	function(){
		norv_ttanpa_nama_ketitipan = ''; $('#inp-no-rv-titipan-tanpa-nama-ketitipan').val(); 
		nomor_kontrak_tujuan_ttanpa_nama_ke_titipan = ''; $('#inp-no-kontrak-tujuan-titipan-tanpa-nama-ketitipan').val();
		nomor_memo_ttanpanama_ketitipan = ''; $('#inp-memo-ttanpanama-ketitipan').val();
		if (norv_ttanpa_nama_ketitipan === '' && nomor_kontrak_tujuan_ttanpa_nama_ke_titipan === '' && nomor_memo_ttanpanama_ketitipan === '' ){
			alert_error("tidak ada data untuk di konfirmasi");
			$('#nomemo-validasi-ttanpa-nama-ketitipan, #norv-validasi-titipan-tanpa-nama-ketitipan, #nokontrak-tujuan-validasi-titipan-tanpa-nama-ketitipan').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_kontrak_titipan_a.length !== 12 && nomor_kontrak_titipan_b.length !== 12 && nomor_memo_titip_akeb.length !== 12) {
			alert_error("tidak ada data untuk di konfirmasi");
			$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b, #nomemo-validasi-titip-akeb').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi konfirmasi titipan a to titipan b");
		}
	});
/*-------------------------- 6 button konfirmasi titipan tanpa nama ke titipan ---------------------------*/

/*-------------------------- 7 button konfirmasi angsuran ke titipan ---------------------------*/
$('#btn-confirm-ar-titipan').click(
	function(){
		nomor_memo_ar_titipan = $('#inp-memo-ar-titipan').val();		
		saldo_ar_titipan = $('#inp-saldo-ar-titipan').val();
		nama_nasabah_ar_titipan = $('#inp-nama-nasabah-ar-titipan').val();		
		nomor_kontrak_ar_titipan = $('#inp-no-kontrak-ar-titipan').val();
		if (nomor_memo_ar_titipan === '' && nomor_kontrak_ar_titipan === '' && nama_nasabah_ar_titipan === '' && saldo_ar_titipan === ''){
			alert_error("tidak ada data untuk di konfirmasi");			
			$('#nomemo-validasi-ar-titipan, #nokontrak-validasi-ar-titipan, #validasi-nasabah-ar-titipan, #validasi-saldo-ar-titipan').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_memo_ar_titipan.length !== 12 && nomor_kontrak_ar_titipan.length !== 12 && nama_nasabah_ar_titipan === '' && saldo_ar_titipan ==='' ) {
			alert_error("tidak ada data untuk di konfirmasi");
			$('#nomemo-validasi-ar-titipan, #nokontrak-validasi-ar-titipan, #validasi-nasabah-ar-titipan, #validasi-saldo-ar-titipan').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi konfirmasi angsuran to titipan");
		}
	});
/*-------------------------- 7 button konfirmasi angsuran ke titipan ---------------------------*/

/*-------------------------- 8 button konfirmasi denda ke titipan ---------------------------*/
$('#btn-confirm-denda-titipan').click(
	function(){
		nomor_memo_denda_titipan = ''; $('#inp-memo-denda-titipan');				
		saldo_denda_titipan = $('#inp-saldo-denda-titipan').val(); 
		nama_nasabah_denda_titipan = $('#inp-nama-nasabah-denda-titipan').val(); 		
		nomor_kontrak_denda_titipan = $('#inp-no-kontrak-denda-titipan').val();  
		if (nomor_memo_denda_titipan === '' && nomor_kontrak_denda_titipan === '' && nama_nasabah_denda_titipan === '' && saldo_denda_titipan === ''){
			alert_error("tidak ada data untuk di konfirmasi");				
			$('#nomemo-validasi-denda-titipan, #nokontrak-validasi-denda-titipan, #validasi-nasabah-denda-titipan, #validasi-saldo-denda-titipan').addClass('has-error');				
			console.log('gagal, validasi 1')
		}		
		else if (nomor_memo_denda_titipan.length !== 12 && nomor_kontrak_denda_titipan.length !== 12 && nama_nasabah_denda_titipan === '' && saldo_denda_titipan ==='' ) {
			alert_error("tidak ada data untuk di konfirmasi");
			$('#nomemo-validasi-denda-titipan, #nokontrak-validasi-denda-titipan, #validasi-nasabah-denda-titipan, #validasi-saldo-denda-titipan').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi konfirmasi denda ke titipan");
		}
	});
/*-------------------------- 8 button konfirmasi denda ke titipan ---------------------------*/
/*----------------------------------------------  button konfirmasi  ----------------------------------------------*/

/*----------------------------------------------  button cetak  ----------------------------------------------*/
/*-------------------------- 1 button cetak titipan ke angsuran ---------------------------*/
$('#btn-print-titipan-ar').click(
	function(){
		nomor_memo_titip_ar = $('#inp-memo-titipan-ar').val();
		saldo_titip_ke_ar = $('#inp-saldo-titipan-ar').val();
		nama_nasabah_titip_ke_ar = $('#inp-nama-nasabah-titipan-ar').val();		
		nomor_kontrak_titip_ke_ar = $('#inp-no-kontrak-titipan-ar').val();
		if (nomor_memo_titip_ar === '' && nomor_kontrak_titip_ke_ar === '' && nama_nasabah_titip_ke_ar === '' && saldo_titip_ke_ar === ''){
			alert_error("tidak ada data untuk di cetak");
			$('#nomemo-validasi-titip-toar, #nokontrak-validasi-titip-toar, #validasi-nasabah-titip-toar, #validasi-saldo-titip-toar').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_memo_titip_ar !== 12 && nomor_kontrak_titip_ke_ar.length !== 12 && nama_nasabah_titip_ke_ar === '' && saldo_titip_ke_ar ==='' ) {
			alert_error("tidak ada data untuk di cetak");
			$('#nomemo-validasi-titip-toar, #inp-nama-nasabah-titipan-ar, #inp-saldo-titipan-ar').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi print titipan to angsuran");
		}
	});
/*-------------------------- 1 button cetak titipan ke angsuran ---------------------------*/

/*-------------------------- 2 button cetak titipan ke denda ---------------------------*/
$('#btn-print-titipan-denda').click(
	function(){
		nomor_memo_titip_denda = $('#inp-memo-titipan-denda').val();
		saldo_titip_ke_denda = $('#inp-saldo-titipan-denda').val();
		nama_nasabah_titip_ke_denda = $('#inp-nama-nasabah-titipan-denda').val();		
		nomor_kontrak_titip_ke_denda = $('#inp-no-kontrak-titipan-denda').val();
		if (nomor_memo_titip_denda === '' && nomor_kontrak_titip_ke_denda === '' && nama_nasabah_titip_ke_denda === '' && saldo_titip_ke_denda === ''){
			alert_error("tidak ada data untuk di cetak");			
			$('#nomemo-validasi-titip-todenda, #nokontrak-validasi-titip-todenda, #validasi-nasabah-titip-todenda, #validasi-saldo-titip-todenda').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_memo_titip_denda !== 12 && nomor_kontrak_titip_ke_denda.length !== 12 && nama_nasabah_titip_ke_denda === '' && saldo_titip_ke_denda ==='' ) {
			alert_error("tidak ada data untuk di cetak");		
			$('#nomemo-validasi-titip-todenda, #nokontrak-validasi-titip-todenda, #validasi-nasabah-titip-todenda, #validasi-saldo-titip-todenda').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi print titipan to denda");
		}
	});
/*-------------------------- 2 button cetak titipan ke denda ---------------------------*/

/*-------------------------- 3 button cetak titipan ke titipan tanpa nama ---------------------------*/
$('#btn-print-titip-titipan-tanpa-nama').click(
	function(){
		nomor_memo_titip_ketitipan_tanpa_nama = $('#inp-memo-titipan-denda').val();
		saldo_titip_titipan_tanpa_nama = $('#inp-saldo-titipan-denda').val();
		nama_nasabah_titip_titipan_tanpa_nama = $('#inp-nama-nasabah-titipan-denda').val();		
		nomor_kontrak_titip_ke_ttanpa_nama = $('#inp-no-kontrak-titipan-denda').val();
		if (nomor_memo_titip_ketitipan_tanpa_nama === '' && nomor_kontrak_titip_ke_ttanpa_nama === '' && nama_nasabah_titip_titipan_tanpa_nama === '' && saldo_titip_titipan_tanpa_nama === ''){
			alert_error("tidak ada data untuk di cetak");					
			$('#nomemo-validasi-titip-totitipan-tnama, #nokontrak-validasi-titip-totitipan-tnama, #validasi-nasabah-titip-totitipan-tnama, #validasi-saldo-titip-totitipan-tnama').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_memo_titip_ketitipan_tanpa_nama.length !== 12 && nomor_kontrak_titip_ke_ttanpa_nama.length !== 12 && nama_nasabah_titip_titipan_tanpa_nama === '' && saldo_titip_titipan_tanpa_nama ==='' ) {
			alert_error("tidak ada data untuk di cetak");
			$('#nomemo-validasi-titip-totitipan-tnama, #nokontrak-validasi-titip-totitipan-tnama, #validasi-nasabah-titip-totitipan-tnama, #validasi-saldo-titip-totitipan-tnama').addClass('has-error');					
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi print titipan to titipan tanpa nama");
		}
	});
/*-------------------------- 3 button cetak titipan ke titipan tanpa nama ---------------------------*/

/*-------------------------- 4 button cetak titipan A ke B ---------------------------*/
$('#btn-print-titipan-a-ke-b').click(
	function(){
		nomor_kontrak_titipan_a = $('#inp-no-kontrak-titipan-a').val(); 
		nomor_kontrak_titipan_b  = $('#inp-no-kontrak-titipan-b').val();
		nomor_memo_titip_akeb = $('#inp-memo-titipan-akeb').val();
		if (nomor_kontrak_titipan_a === '' && nomor_kontrak_titipan_b === '' && nomor_memo_titip_akeb === ''){
			alert_error("tidak ada data untuk di cetak");					
			$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b, #nomemo-validasi-titip-akeb').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_kontrak_titipan_a.length !== 12 && nomor_kontrak_titipan_b.length !== 12 && nomor_memo_titip_akeb.length !== 12 ) {
			alert_error("tidak ada data untuk di cetak");
			$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b, #nomemo-validasi-titip-akeb').addClass('has-error');					
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi print titipan a to titipan b");
		}
	});
/*-------------------------- 4 button cetak titipan A ke B ---------------------------*/

/*-------------------------- 5 button cetak titipan ke pendapatan ---------------------------*/
$('#btn-print-titipan-pendapatan').click(
	function(){
		nomor_memo_titip_ke_pendapatan = $('#inp-memo-titipan-ke-pendapatan').val();
		if (nomor_memo_titip_ke_pendapatan === '' || nomor_memo_titip_ke_pendapatan.length !== 12){
			alert_error("tidak ada data untuk di cetak");					
			$('#nomemo-validasi-titip-ke-pendapatan').addClass('has-error');
			console.log('gagal, validasi 1')
		}
		else
		{			
			alert_error("lolos validasi print titipan to pendapatan");
		}
	});
/*-------------------------- 5 button cetak titipan ke pendapatan ---------------------------*/

/*-------------------------- 6 button cetak titipan tanpa nama ke titipan ---------------------------*/
$('#btn-print-titipan-tanpa-nama-ke-titipan').click(
	function(){
		norv_ttanpa_nama_ketitipan = ''; $('#inp-no-rv-titipan-tanpa-nama-ketitipan').val(); 
		nomor_kontrak_tujuan_ttanpa_nama_ke_titipan = ''; $('#inp-no-kontrak-tujuan-titipan-tanpa-nama-ketitipan').val();
		nomor_memo_ttanpanama_ketitipan = ''; $('#inp-memo-ttanpanama-ketitipan').val();
		if (norv_ttanpa_nama_ketitipan === '' && nomor_kontrak_tujuan_ttanpa_nama_ke_titipan === '' && nomor_memo_ttanpanama_ketitipan === ''){
			alert_error("tidak ada data untuk di cetak");					
			$('#nomemo-validasi-ttanpa-nama-ketitipan, #norv-validasi-titipan-tanpa-nama-ketitipan, #nokontrak-tujuan-validasi-titipan-tanpa-nama-ketitipan').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (norv_ttanpa_nama_ketitipan.length !== 12 && nomor_kontrak_tujuan_ttanpa_nama_ke_titipan.length !== 12 && nomor_memo_ttanpanama_ketitipan.length !== 12 ) {
			alert_error("tidak ada data untuk di cetak");
			$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b, #nomemo-validasi-titip-akeb').addClass('has-error');					
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi print titipan tanpa nama ke titipan");
		}
	});
/*-------------------------- 6 button cetak titipan tanpa nama ke titipan ---------------------------*/	

/*-------------------------- 7 button cetak angsuran ke titipan ---------------------------*/
$('#btn-print-ar-titipan').click(
	function(){
		nomor_memo_ar_titipan = $('#inp-memo-ar-titipan').val();		
		saldo_ar_titipan = $('#inp-saldo-ar-titipan').val();
		nama_nasabah_ar_titipan = $('#inp-nama-nasabah-ar-titipan').val();		
		nomor_kontrak_ar_titipan = $('#inp-no-kontrak-ar-titipan').val();
		if (nomor_memo_ar_titipan === '' && nomor_kontrak_ar_titipan === '' && nama_nasabah_ar_titipan === '' && saldo_ar_titipan === ''){
			alert_error("tidak ada data untuk di cetak");
			$('#nomemo-validasi-ar-titipan, #nokontrak-validasi-ar-titipan, #validasi-nasabah-ar-titipan, #validasi-saldo-ar-titipan').addClass('has-error');								
			console.log('gagal, validasi 1')
		}		
		else if (nomor_memo_ar_titipan.length !== 12 && nomor_kontrak_ar_titipan.length !== 12 && nama_nasabah_ar_titipan === '' && saldo_ar_titipan ==='' ) {
			alert_error("tidak ada data untuk di cetak");
			$('#nomemo-validasi-ar-titipan, #nokontrak-validasi-ar-titipan, #validasi-nasabah-ar-titipan, #validasi-saldo-ar-titipan').addClass('has-error');								
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi print angsuran ke titipan");
		}
	});
/*-------------------------- 7 button cetak angsuran ke titipan ---------------------------*/

/*-------------------------- 8 button cetak denda ke titipan ---------------------------*/
$('#btn-print-denda-titipan').click(
	function(){
		nomor_memo_denda_titipan = ''; $('#inp-memo-denda-titipan');				
		saldo_denda_titipan = $('#inp-saldo-denda-titipan').val(); 
		nama_nasabah_denda_titipan = $('#inp-nama-nasabah-denda-titipan').val(); 		
		nomor_kontrak_denda_titipan = $('#inp-no-kontrak-denda-titipan').val();  
		if (nomor_memo_denda_titipan === '' && nomor_kontrak_denda_titipan === '' && nama_nasabah_denda_titipan === '' && saldo_denda_titipan === ''){
			alert_error("tidak ada data untuk di cetak");								
			$('#nomemo-validasi-denda-titipan, #nokontrak-validasi-denda-titipan, #validasi-nasabah-denda-titipan, #validasi-saldo-denda-titipan').addClass('has-error');		
			console.log('gagal, validasi 1')
		}		
		else if (nomor_memo_denda_titipan.length !== 12 && nomor_kontrak_denda_titipan.length !== 12 && nama_nasabah_denda_titipan === '' && saldo_denda_titipan ==='' ) {
			alert_error("tidak ada data untuk di cetak");
			$('#nomemo-validasi-denda-titipan, #nokontrak-validasi-denda-titipan, #validasi-nasabah-denda-titipan, #validasi-saldo-denda-titipan').addClass('has-error');					
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi print denda ke titipan");
		}
	});
/*-------------------------- 8 button cetak denda ke titipan ---------------------------*/
/*----------------------------------------------  button cetak  ----------------------------------------------*/


/*----------------------------------------------  button batal  ----------------------------------------------*/
/*-------------------------- 1 button batal titipan ke angsuran ---------------------------*/
$('#btn-cancel-titipan-ar').click(
	function(){
		nomor_memo_titip_ar = $('#inp-memo-titipan-ar').val();
		saldo_titip_ke_ar = $('#inp-saldo-titipan-ar').val();
		nama_nasabah_titip_ke_ar = $('#inp-nama-nasabah-titipan-ar').val();		
		nomor_kontrak_titip_ke_ar = $('#inp-no-kontrak-titipan-ar').val();
		if (nomor_memo_titip_ar === '' && nomor_kontrak_titip_ke_ar === '' && nama_nasabah_titip_ke_ar === '' && saldo_titip_ke_ar === ''){
			alert_error("tidak ada data untuk proses pembatalan");
			$('#nomemo-validasi-titip-toar, #nokontrak-validasi-titip-toar, #validasi-nasabah-titip-toar, #validasi-saldo-titip-toar').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_memo_titip_ar !== 12 && nomor_kontrak_titip_ke_ar.length !== 12 && nama_nasabah_titip_ke_ar === '' && saldo_titip_ke_ar ==='' ) {
			alert_error("tidak ada data untuk proses pembatalan");
			$('#nomemo-validasi-titip-toar, #inp-nama-nasabah-titipan-ar, #inp-saldo-titipan-ar').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi");
		}
	});
/*-------------------------- 1 button batal titipan ke angsuran ---------------------------*/

/*-------------------------- 2 button batal titipan ke denda ---------------------------*/
$('#btn-cancel-titipan-denda').click(
	function(){
		nomor_memo_titip_denda = $('#inp-memo-titipan-denda').val();
		saldo_titip_ke_denda = $('#inp-saldo-titipan-denda').val();
		nama_nasabah_titip_ke_denda = $('#inp-nama-nasabah-titipan-denda').val();		
		nomor_kontrak_titip_ke_denda = $('#inp-no-kontrak-titipan-denda').val();
		if (nomor_memo_titip_denda === '' && nomor_kontrak_titip_ke_denda === '' && nama_nasabah_titip_ke_denda === '' && saldo_titip_ke_denda === ''){
			alert_error("tidak ada data untuk proses pembatalan");			
			$('#nomemo-validasi-titip-todenda, #nokontrak-validasi-titip-todenda, #validasi-nasabah-titip-todenda, #validasi-saldo-titip-todenda').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_memo_titip_denda !== 12 && nomor_kontrak_titip_ke_denda.length !== 12 && nama_nasabah_titip_ke_denda === '' && saldo_titip_ke_denda ==='' ) {
			alert_error("tidak ada data untuk proses pembatalan");			
			$('#nomemo-validasi-titip-todenda, #nokontrak-validasi-titip-todenda, #validasi-nasabah-titip-todenda, #validasi-saldo-titip-todenda').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi, titipan ke denda");
		}
	});
/*-------------------------- 2 button batal titipan ke denda ---------------------------*/

/*-------------------------- 3 button batal titipan ke titipan tanpa nama ---------------------------*/
$('#btn-cancel-titip-titipan-tanpa-nama').click(
	function(){
		nomor_memo_titip_ketitipan_tanpa_nama = $('#inp-memo-titipan-titipan-tanpa-nama').val(); 
		saldo_titip_titipan_tanpa_nama = $('#inp-saldo-titip-titipan-tanpa-nama').val();
		nama_nasabah_titip_titipan_tanpa_nama = $('#inp-nama-nasabah-titip-titipan-tanpa-nama').val();		
		nomor_kontrak_titip_ke_ttanpa_nama = $('#inp-no-kontrak-titip-titipan-tanpa-nama').val();
		if (nomor_memo_titip_ketitipan_tanpa_nama === '' && nomor_kontrak_titip_ke_ttanpa_nama === '' && nama_nasabah_titip_titipan_tanpa_nama === '' && saldo_titip_titipan_tanpa_nama === ''){
			alert_error("tidak ada data untuk proses pembatalan");
			$('#nomemo-validasi-titip-totitipan-tnama, #nokontrak-validasi-titip-totitipan-tnama, #validasi-nasabah-titip-totitipan-tnama, #validasi-saldo-titip-totitipan-tnama').addClass('has-error');						
			console.log('gagal, validasi 1')
		}		
		else if (nomor_memo_titip_ketitipan_tanpa_nama.length !== 12 && nomor_kontrak_titip_ke_ttanpa_nama.length !== 12 && nama_nasabah_titip_titipan_tanpa_nama === '' && saldo_titip_titipan_tanpa_nama ==='' ) {
			alert_error("tidak ada data untuk proses pembatalan");			
			$('#nomemo-validasi-titip-todenda, #nokontrak-validasi-titip-todenda, #validasi-nasabah-titip-todenda, #validasi-saldo-titip-todenda').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi, cancel batal titipan ke titipan tanpa nama");
		}
	});
/*-------------------------- 4 button batal titipan A ke B ---------------------------*/
$('#btn-cancel-titipan-a-ke-b').click(
	function(){
		nomor_kontrak_titipan_a = $('#inp-no-kontrak-titipan-a').val(); 
		nomor_kontrak_titipan_b  = $('#inp-no-kontrak-titipan-b').val();
		nomor_memo_titip_akeb = $('#inp-memo-titipan-akeb').val();
		if (nomor_kontrak_titipan_a === '' && nomor_kontrak_titipan_b === '' && nomor_memo_titip_akeb === ''){
			alert_error("tidak ada data untuk proses pembatalan");
			$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b, #nomemo-validasi-titip-akeb').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_kontrak_titipan_a.length !== 12 && nomor_kontrak_titipan_b.length !== 12 && nomor_memo_titip_akeb.length !== '') {
			alert_error("tidak ada data untuk proses pembatalan");			
			$('#nokontrak-validasi-titip-a, #nokontrak-validasi-titip-b, #nomemo-validasi-titip-akeb').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi, cancel batal titipan a ke b");
		}
	});
/*-------------------------- 4 button batal titipan A ke B ---------------------------*/

/*-------------------------- 5 button batal titipan ke pendapatan ---------------------------*/
$('#btn-cancel-titipan-pendapatan').click(
	function(){
		nomor_memo_titip_ke_pendapatan = $('#inp-memo-titipan-ke-pendapatan').val();
		if (nomor_memo_titip_ke_pendapatan === '' || nomor_memo_titip_ke_pendapatan.length !== 12){
			alert_error("tidak ada data untuk proses pembatalan");
			$('#nomemo-validasi-titip-ke-pendapatan').addClass('has-error');
			console.log('gagal, validasi 1')
		}
		else
		{			
			alert_error("lolos validasi, cancel titipan ke pendapatan");
		}
	});
/*-------------------------- 5 button batal titipan ke pendapatan ---------------------------*/

/*-------------------------- 6 button batal titipan tanpa nama ke titipan ---------------------------*/
$('#btn-cancel-titipan-tanpa-nama-ke-titipan').click(
	function(){

	});	
/*-------------------------- 6 button batal titipan tanpa nama ke titipan ---------------------------*/

/*-------------------------- 7 button batal angsuran ke titipan ---------------------------*/
$('#btn-cancel-ar-titipan').click(
	function(){
		nomor_memo_ar_titipan = $('#inp-memo-ar-titipan').val();		
		saldo_ar_titipan = $('#inp-saldo-ar-titipan').val();
		nama_nasabah_ar_titipan = $('#inp-nama-nasabah-ar-titipan').val();		
		nomor_kontrak_ar_titipan = $('#inp-no-kontrak-ar-titipan').val();
		if (nomor_memo_titip_ar === '' && nomor_kontrak_titip_ke_ar === '' && nama_nasabah_titip_ke_ar === '' && saldo_titip_ke_ar === ''){
			alert_error("tidak ada data untuk proses pembatalan");
			$('#nomemo-validasi-ar-titipan, #nokontrak-validasi-ar-titipan, #validasi-nasabah-ar-titipan, #validasi-saldo-ar-titipan').addClass('has-error');			
			console.log('gagal, validasi 1')
		}		
		else if (nomor_memo_titip_ar !== 12 && nomor_kontrak_titip_ke_ar.length !== 12 && nama_nasabah_titip_ke_ar === '' && saldo_titip_ke_ar ==='' ) {
			alert_error("tidak ada data untuk proses pembatalan");
			$('#nomemo-validasi-ar-titipan, #nokontrak-validasi-ar-titipan, #validasi-nasabah-ar-titipan, #validasi-saldo-ar-titipan').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi, angsuran ke titipan");
		}
	});
/*-------------------------- 7 button batal angsuran ke titipan ---------------------------*/

/*-------------------------- 8 button batal denda ke titipan ---------------------------*/
$('#btn-cancel-denda-titipan').click(
	function(){
		nomor_memo_denda_titipan = ''; $('#inp-memo-denda-titipan');				
		saldo_denda_titipan = $('#inp-saldo-denda-titipan').val(); 
		nama_nasabah_denda_titipan = $('#inp-nama-nasabah-denda-titipan').val(); 		
		nomor_kontrak_denda_titipan = $('#inp-no-kontrak-denda-titipan').val();  
		if (nomor_memo_denda_titipan === '' && nomor_kontrak_denda_titipan === '' && nama_nasabah_denda_titipan === '' && saldo_denda_titipan === ''){
			alert_error("tidak ada data untuk proses pembatalan");
			$('#nomemo-validasi-denda-titipan, #nokontrak-validasi-denda-titipan, #validasi-nasabah-denda-titipan, #validasi-saldo-denda-titipan').addClass('has-error');
			console.log('gagal, validasi 1')
		}		
		else if (nomor_memo_denda_titipan.length !== 12 && nomor_kontrak_denda_titipan.length !== 12 && nama_nasabah_denda_titipan === '' && saldo_denda_titipan ==='' ) {
			alert_error("tidak ada data untuk proses pembatalan");
			$('#nomemo-validasi-denda-titipan, #nokontrak-validasi-denda-titipan, #validasi-nasabah-denda-titipan, #validasi-saldo-denda-titipan').addClass('has-error');
			console.log('gagal, validasi 2')
		}
		else
		{			
			alert_error("lolos validasi, cancel denda ke titipan");
		}
	});
/*-------------------------- 8 button batal denda ke titipan ---------------------------*/
/*----------------------------------------------  button batal  ----------------------------------------------*/














