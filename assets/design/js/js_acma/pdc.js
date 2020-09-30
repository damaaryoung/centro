/*-------------------------------------------------- DATATABLE ------------------------------------------------------------*/
var tabel_pdc_rv = $("#tbl-pdc-rv").DataTable({
	"responsive" : true,
	"bFilter" : false,
	"bPaginate" : false,
	"bInfo" : false,
	"columnDefs" : [
		{"visible" : false, "targets": [8], "className": 'hidden'}
	]
});

var tabel_pdc_pv = $('#tbl-pdc-pv').DataTable({
	"responsive" : true,
	"bFilter" : false,
	"bPaginate" : false,
	"bInfo" : false
});

var tabel_pdc_send = $('#tbl-send-to-bank').DataTable({
	"responsive" : true,
	"bFilter" : true, 	// update mba tita search ditampilkan, standup meeting 26 juli 2018
	"bPaginate" : false,
	"scrollY" : "300px",
	"scrollCollapse" : true,
	"bInfo" : false
});

var tabel_pdc_appr = $('#tbl-approve-reject').DataTable({
	"responsive" : true,
	"bFilter" : true,	// update mba tita search ditampilkan, standup meeting 26 juli 2018
	"bPaginate" : true,
	"bInfo" : false,
	"columnDefs" : [
        //hide the tenth column
        { "visible": false, "targets": [10], "className": 'hidden' }
    ]
});

var tabel_bank_issued = $('#tbl-bank-issued').DataTable({
    "responsive": true
});

$('#tbl-pdc-rv').on('keydown', '.inp-number', function(e){
	-1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) 
    && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode 
    && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) 
    && (96 > e.keyCode || 105 < e.keyCode)
    && e.preventDefault()
});

$('#inp-search-pdc-rv, #inp-no-pdc-rv').on('keydown', function(e) {
    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) 
    && (!0 === e.ctrlKey || !0 === e.metaKey) || 32 <= e.keyCode 
    && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 90 < e.keyCode) 
    && (96 > e.keyCode || 105 < e.keyCode) 
    && e.preventDefault()
});

$('#inp-search-kontrak-rv').keypress(function(event) {
	if (event.keyCode == 13) {
		$('#btn-search-pdc-rv').click();
	}
});

$('#inp-search-pdc-rv').keypress(function(event) {
	if (event.keyCode == 13) {
		$('#btn-search-pdc-rv').click();
	}
});
/*-------------------------------------------------------------------------------------------------------------------------*/
/*------------ SLIDE TOGGLE -------------*/
$('#coba').slideToggle('hide');

$('#btn-add-tbl-rv').click(function(){
	$('#coba').slideToggle('show');
	var a = tabel_pdc_rv.data();
	console.log(a);
});

var cek = '';
var cek_contract = '';
var cek_class_code = [];
var indextitip = null;
var inst_type = '';
var date_awal; //penambaham var date_awal oleh adit 

/*--------------------------------------*/
/*----------------------------------------------- DATETIMEPICKER ----------------------------------------------------------*/
var d = new Date();
var hours = d.getHours();
var minutes = d.getMinutes();
var seconds = d.getSeconds();

$('#div-due-date-pdc-rv').datetimepicker({
	format: 'DD-MMM-YYYY',
	minDate: 'now',
	allowInputToggle: true
}).on("dp.change", function(i){
	var pdc_due_date = $('#inp-due-date-pdc-rv').val();
	var cek_tabel = tabel_pdc_rv.data();
	var kontrak = $('#slc-no-kontrak-rv').val();
	var class_code = $('#slc-class-code-rv').val();
	var count = cek_tabel.length;
	var classcode = '';
	var inst_date = '';

	if (pdc_due_date !== today && count !== 0) {
		for (var i = 0; i < count; i++) {
			classcode = cek_tabel[i][2];
			inst_date = cek_tabel[i][8];

			var diff = new Date(Date.parse(pdc_due_date) - Date.parse(inst_date));

			// get days
			var days = diff/1000/60/60/24;
			console.log(days);

			if (classcode === 'T-ANGS - ANGSURAN NO./KE' && days > 0 && (i == count - 1 || i == count - 2)) {
				console.log('masuk kondisi t-angs');
				console.log(inst_date);

				tabel_pdc_rv.clear().draw();
				get_by_class_code();
				break;
			}
			else if (classcode === 'T-DENDA - DENDA' && days > 0 && class_code === 'T-DENDA') {
				console.log('masuk kondisi t-denda');

				tabel_pdc_rv.clear().draw();
				get_by_class_code();
				break;
			}
		}
	}
});

$('#div-tgl-awal-send').datetimepicker({
	format: 'DD-MMM-YYYY',
	//maxDate : 'now',
	allowInputToggle: true
}).on("dp.change", function(e){
	var date = e.date;
	var dDate = date._d;
	var new_date = new Date(dDate);
	new_date.setDate(new_date.getDate() + 30);

	$('#div-tgl-akhir-send').data("DateTimePicker").minDate(dDate);

	/*if (new_date > new Date(today)) {
		new_date = new Date(today);
	}*/
	//console.log(new_date, today);

	$('#div-tgl-akhir-send').data("DateTimePicker").maxDate(new_date);
	$('#div-tgl-akhir-send').data("DateTimePicker").date(new_date);
});

$('#div-tgl-akhir-send').datetimepicker({
	format: 'DD-MMM-YYYY',
	//maxDate: 'now',
	allowInputToggle: true
});

$('#div-tgl-awl-appr').datetimepicker({
	format: 'DD-MMM-YYYY',
	maxDate : 'now',
	allowInputToggle: true
}).on("dp.change", function(e){
	var date = e.date;
	var dDate = date._d;
	var new_date = new Date(dDate);
	new_date.setDate(new_date.getDate() + 30);

	$('#div-tgl-akhir-appr').data("DateTimePicker").minDate(dDate);

	if (new_date > new Date(today)) {
		new_date = new Date(today);
	}
	//console.log(new_date, today);

	$('#div-tgl-akhir-appr').data("DateTimePicker").maxDate(new_date);
	$('#div-tgl-akhir-appr').data("DateTimePicker").date(new_date);
});

$('#div-tgl-akhir-appr').datetimepicker({
	format: 'DD-MMM-YYYY',
	maxDate: 'now',
	allowInputToggle: true
});

var firstDay = "01"+ "-" + mm + "-" +  yyyy;
console.log(firstDay);

$('#inp-tgl-awal-send, #inp-tgl-awl-appr').val(firstDay);
$("#inp-date-pdc-rv, #inp-due-date-pdc-rv, #inp-date-pdc-pv, #inp-due-date-pdc-pv, #inp-tgl-akhir-send, #inp-tgl-akhir-appr").val(today);
/*---------------------------------------------------------------------------------------------------------------------------*/

if ($('#id-form-aplikasi').length) {
	var branch_code = $('#hdn-branch-code').val();
	var branch_name = $('#hdn-branch-name').val();

	console.log(branch_code);

	if (branch_code !== '0000') {
		console.log('masuk');
		$('#slc-branch-pdc').prop('disabled', true);
		$('<option/>').val(branch_code).html(branch_code+' - '+branch_name).appendTo('#slc-branch-pdc');
		get_bank_tujuan();
	}
	else{
		get_data_branch('#slc-branch-pdc');
	}

	getClassCode(); //untuk mendapatkan class code
}

$('#slc-branch-pdc').change(function(){
	if ($("#pdc-approve-reject").hasClass('active')) {
		get_bank_tujuan();
	}
});

/*--------------------------------------------------- HAK AKSES USER PDC----------------------------------------------------*/

var role_pdcp = '';

if (!localStorage.getItem('role_user_pdcp')) {
    $.ajax({
        url : base_url + "Controller_home/get_detail_user",
        cache : false,
        async : false,
        success : function(response){
            console.log(response);
            localStorage.setItem('role_user_pdcp', response);
            role_pdcp = $.parseJSON(localStorage.getItem('role_user_pdcp'));
            console.log(role_pdcp);
        },
        error: function(response){
            console.log(response);
        }
    });
}
else{
    role_pdcp = $.parseJSON(localStorage.getItem('role_user_pdcp'));
    console.log(role_pdcp);
}

$.each(role_pdcp, function(i){
    console.log(role_pdcp[i]['role_code']);
    if (role_pdcp[i]['role_code'] === 'SBMT_PDC') {
        $('#btn-save-pdc-appr').prop('disabled', true);
    }
    else if (role_pdcp[i]['role_code'] === 'APPR_PDC') {
        $('#btn-save-pdc-rv, #btn-cancel-pdc-rv, #btn-save-pdc-send').prop('disabled', true);
    }
});


/*------------------------------------------------ END VALIDASI HAK AKSES PDC-----------------------------------------------*/

/*--------------------------------------------------------- CLEAR DATA -------------------------------------------------*/
$('#btn-reset-pdc-rv').click(function(){
	cek = '';
	cek_contract = '';
    cek_class_code = [];
    $('#slc-no-kontrak-rv').empty();
    $('#slc-class-code-rv').prop('selectedIndex', 0);
	$('.res-global, #inp-search-pdc-rv, #inp-search-kontrak-rv').val('');
	$('#inp-date-pdc-rv').val(today);
	$('#inp-due-date-pdc-rv').val(today);
	$('#chk-inkaso-rv').prop('checked', false);
	tabel_pdc_rv.clear().draw();
	$('#div-list-branch, #div-search-kontrak-rv, #div-search-pdc-rv, #div-bank-branch-rv, #div-bank-issued-rv').removeClass('has-error');
	$('#inp-search-kontrak-rv, #inp-search-pdc-rv, #btn-add-tbl-rv, #btn-add-class-rv, #inp-no-pdc-rv, #slc-no-kontrak-rv, #slc-class-code-rv').prop('disabled', false);
});

$('#btn-add-class-rv2').click(function(){
	 $('#inp-no-pdc-rv').prop('disabled', false);
});

$('#btn-reset-pdc-send').on("click", function(){
	$('.res-global').val('');
	tabel_pdc_send.clear().draw();
	$('#inp-tgl-awal-send').val(firstDay);
	$('#inp-tgl-akhir-send').val(today);
	$('#div-list-branch, #div-tgl-awal-send, #div-tgl-akhir-send, #div-bank-id-send, #div-bank-name-send').removeClass('has-error');
});

$('#btn-reject-pdc-appr').click(function(){
	$('.res-global').val('');
	$('#slc-bank-tujuan-appr').prop('selectedIndex', 0);
	tabel_pdc_appr.clear().draw();
	$('#inp-tgl-awl-appr').val(firstDay);
	$('#inp-tgl-akhir-appr').val(today);
	$('#inp-tot-amount-appr').val(0);
	$('#inp-tot-amount-reject').val(0);
	$('#div-list-branch, #div-tgl-awl-appr, #div-tgl-akhir-appr, #div-bank-id-appr, #div-bank-name-appr, #div-bank-tujuan-appr').removeClass('has-error');
});

$('#pdc-pv-tab').click(function(){
	$('.res-global').val('');
	$('#inp-date-pdc-pv').val(today);
	$('#inp-due-date-pdc-pv').val(today);
	$('#chk-inkaso-pv').prop('checked', false);
	$('#div-list-branch').removeClass('has-error');
});

$('#pdc-rv-registration-tab').click(function(){
	cek = '';
	cek_contract = '';
    cek_class_code = [];
    $('#slc-no-kontrak-rv').empty();
    $('#slc-class-code-rv').prop('selectedIndex', 0);
	$('.res-global, #inp-search-pdc-rv, #inp-search-kontrak-rv').val('');
	//$('.res-select').prop('selectedIndex', 0);
	$('#inp-date-pdc-rv, #inp-due-date-pdc-rv, #inp-tgl-akhir-send, #inp-tgl-akhir-appr').val(today);
	$('#chk-inkaso-rv').prop('checked', false);
	$('#chk-all-tabel-pdc').prop('checked', false);
	$('#div-list-branch, #div-search-kontrak-rv, #div-search-pdc-rv, #div-bank-branch-rv, #div-bank-issued-rv').removeClass('has-error');
	$('#div-tgl-awal-send, #div-tgl-akhir-send, #div-bank-id-send, #div-bank-name-send').removeClass('has-error');
	$('#div-tgl-awl-appr, #div-tgl-akhir-appr, #div-bank-id-appr, #div-bank-name-appr, #div-bank-tujuan-appr').removeClass('has-error');
	tabel_pdc_rv.clear().draw();
	$('#inp-search-kontrak-rv, #inp-search-pdc-rv, #btn-add-tbl-rv, #btn-add-class-rv, #inp-no-pdc-rv, #slc-no-kontrak-rv, #slc-class-code-rv').prop('disabled', false);
});

$('#pdc-send-to-bank-tab').click(function(){
	$('.res-global, #inp-search-pdc-rv, #inp-search-kontrak-rv').val('');
	tabel_pdc_send.clear().draw();
	$('#inp-tgl-awal-send, #inp-tgl-awl-appr').val(firstDay);
	$('#inp-date-pdc-rv, #inp-due-date-pdc-rv, #inp-tgl-akhir-send, #inp-tgl-akhir-appr').val(today);
	$('#div-list-branch, #div-search-kontrak-rv, #div-search-pdc-rv, #div-bank-branch-rv, #div-bank-issued-rv').removeClass('has-error');
	$('#div-tgl-awal-send, #div-tgl-akhir-send, #div-bank-id-send, #div-bank-name-send').removeClass('has-error');
	$('#div-tgl-awl-appr, #div-tgl-akhir-appr, #div-bank-id-appr, #div-bank-name-appr, #div-bank-tujuan-appr').removeClass('has-error');
});

$('#pdc-approve-reject-tab').click(function(){
	$('.res-global, #inp-search-pdc-rv, #inp-search-kontrak-rv').val('');
	$('#inp-tot-amount-reject').val(0);
	$('#inp-tot-amount-appr').val(0);
	$('#slc-bank-tujuan-appr').prop('selectedIndex', 0);
	$('#slc-branch-pdc').prop('selectedIndex', 0);
	tabel_pdc_appr.clear().draw();
	$('#inp-tgl-awal-send, #inp-tgl-awl-appr').val(firstDay);
	$('#inp-date-pdc-rv, #inp-due-date-pdc-rv, #inp-tgl-akhir-send, #inp-tgl-akhir-appr').val(today);
	$('#div-list-branch, #div-search-kontrak-rv, #div-search-pdc-rv, #div-bank-branch-rv, #div-bank-issued-rv').removeClass('has-error');
	$('#div-tgl-awal-send, #div-tgl-akhir-send, #div-bank-id-send, #div-bank-name-send').removeClass('has-error');
	$('#div-tgl-awl-appr, #div-tgl-akhir-appr, #div-bank-id-appr, #div-bank-name-appr, #div-bank-tujuan-appr').removeClass('has-error');
});
/*-----------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------- SEARCH BANK ISSUED ------------------------------------------------------*/
$('#src-bank-issued-rv').click(function(){
	var cabang = $('#slc-branch-pdc').val();
	var index = '';
	console.log(cabang);

	if (cabang === '') {
		alert_info("Silahkan Input Cabang!");
		$('#div-list-branch').addClass('has-error');
	}
	else{
		$('#div-list-branch').removeClass('has-error');
		get_bank_issued(cabang, index);
	}
});

$('#inp-bank-issued-rv').click(function(){
	var cabang = $('#slc-branch-pdc').val();
	var index = '';
	console.log(cabang);

	if (cabang === '') {
		alert_info("Silahkan Input Cabang!");
		$('#div-list-branch').addClass('has-error');
	}
	else{
		$('#div-list-branch').removeClass('has-error');
		get_bank_issued(cabang, index);
	}
});

$("#src-bank-id-send").click(function(){
	var cabang = $('#slc-branch-pdc').val();
	var index = '';

	if (cabang === '') {
		alert_info("Silahkan Input Cabang!");
		$('#div-list-branch').addClass('has-error');
	}
	else{
		$('#div-list-branch').removeClass('has-error');
		get_bank_issued(cabang, index);
	}
});

$('#inp-bank-name-send').click(function(){
	var cabang = $('#slc-branch-pdc').val();
	var index = '';

	if (cabang === '') {
		alert_info("Silahkan Input Cabang!");
		$('#div-list-branch').addClass('has-error');
	}
	else{
		$('#div-list-branch').removeClass('has-error');
		get_bank_issued(cabang, index);
	}
});

$('#src-bank-id-appr').click(function(){
	var cabang = $('#slc-branch-pdc').val();
	var index = '';

	if (cabang === '') {
		alert_info("Silahkan Input Cabang!");
		$('#div-list-branch').addClass('has-error');
	}
	else{
		$('#div-list-branch').removeClass('has-error');
		get_bank_issued(cabang, index);
	}
});

$('#inp-bank-name-appr').click(function(){
	var cabang = $('#slc-branch-pdc').val();
	var index = '';

	if (cabang === '') {
		alert_info("Silahkan Input Cabang!");
		$('#div-list-branch').addClass('has-error');
	}
	else{
		$('#div-list-branch').removeClass('has-error');
		get_bank_issued(cabang, index);
	}
});

/*---------- GET DATA BANK ISSUED FROM TABLE -----------*/
var hasil_pencarian = '';
$('#tbl-bank-issued').on('click', 'tr', function(){
    if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
        hasil_pencarian = '';
    }
    else{
        tabel_bank_issued.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        hasil_pencarian = tabel_bank_issued.row(this).data();
    }
});
$('#tbl-bank-issued').on('dblclick', 'tr', function(){
    hasil_pencarian = tabel_bank_issued.row(this).data();
    var inkaso = $('#hdn-modal-inkaso').val(); //keperluan yaya
    $('#modal-bank-issued').modal('hide');

    if (inkaso === '') {
        if ($('#pdc-rv-registration').hasClass('active')) {
            $('#inp-bank-issued-rv').val(hasil_pencarian[1]);
        }
        else if ($('#pdc-send-to-bank').hasClass('active')) {
            $('#inp-bank-id-send').val(hasil_pencarian[0]);
            $('#inp-bank-name-send').val(hasil_pencarian[2]);
        }
        else if ($("#pdc-approve-reject").hasClass('active')) {
            $('#inp-bank-id-appr').val(hasil_pencarian[0]);
            $('#inp-bank-name-appr').val(hasil_pencarian[2]);
        }
    }else{
        $('#inp-inkaso-send'+inkaso).val(hasil_pencarian[1]);
    }

    
});
$('#btn-pilih-bank-issued').click(function(){
    $('#modal-bank-issued').modal('hide');

    if ($('#pdc-rv-registration').hasClass('active')) {
        $('#inp-bank-issued-rv').val(hasil_pencarian[1]);
    }
    else if ($('#pdc-send-to-bank').hasClass('active')) {
        $('#inp-bank-id-send').val(hasil_pencarian[0]);
        $('#inp-bank-name-send').val(hasil_pencarian[2]);
    }
    else if ($("#pdc-approve-reject").hasClass('active')) {
        $('#inp-bank-id-appr').val(hasil_pencarian[0]);
        $('#inp-bank-name-appr').val(hasil_pencarian[2]);
    }
});
/*-----------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------- Search PDC RV ---------------------------------------------------*/

$('#inp-search-kontrak-rv').change(function(){
	$('#inp-search-pdc-rv').prop('disabled', true);
	if ($('#inp-search-kontrak-rv').val() === '') {
		$('#inp-search-pdc-rv').prop('disabled', false);
		$('#slc-no-kontrak-rv').empty();
    	$('#slc-class-code-rv').prop('selectedIndex', 0);
		$('.res-global').val('');
		tabel_pdc_rv.clear().draw();
		$('#chk-inkaso-rv').prop('checked', false);
		$('#chk-all-tabel-pdc').prop('checked', false);
		$("#inp-date-pdc-rv").val(today);
		$('#inp-due-date-pdc-rv').val(today);
	}
});

$('#inp-search-pdc-rv').change(function(){
	$('#inp-search-kontrak-rv').prop('disabled', true);
	if ($('#inp-search-pdc-rv').val() === '') {
		$('#inp-search-kontrak-rv, #inp-bank-branch-rv').prop('disabled', false);
		$('.res-global').val('');
    	$('#slc-class-code-rv').prop('selectedIndex', 0);
		$('#btn-add-tbl-rv, #btn-add-class-rv, #inp-no-pdc-rv, #inp-rec-from-rv, #inp-due-date-pdc-rv').prop('disabled', false);
		$('#slc-no-kontrak-rv, #slc-class-code-rv').prop('disabled', false);
		tabel_pdc_rv.clear().draw();
		$('#chk-inkaso-rv').prop('checked', false);
		$('#chk-inkaso-rv').prop('disabled', false);
		$("#inp-date-pdc-rv").val(today);
		$('#inp-due-date-pdc-rv').val(today);
		$('#chk-all-tabel-pdc').prop('disabled', false);
		$('#chk-all-tabel-pdc').prop('checked', false);
		$('#btn-save-pdc-rv, #src-bank-issued-rv, #inp-bank-issued-rv').prop('disabled', false);
	}
});

$('#inp-search-pdc-rv').on('input', function(){
	$('#inp-search-kontrak-rv, #inp-bank-branch-rv').prop('disabled', false);
	$('.res-global').val('');
    $('#slc-class-code-rv').prop('selectedIndex', 0);
	$('#btn-add-tbl-rv, #btn-add-class-rv, #inp-no-pdc-rv, #inp-rec-from-rv, #inp-due-date-pdc-rv').prop('disabled', false);
	$('#slc-no-kontrak-rv, #slc-class-code-rv').prop('disabled', false);
	tabel_pdc_rv.clear().draw();
	$('#chk-inkaso-rv').prop('checked', false);
	$('#chk-inkaso-rv').prop('disabled', false);
	$("#inp-date-pdc-rv").val(today);
	$('#inp-due-date-pdc-rv').val(today);
	$('#chk-all-tabel-pdc').prop('disabled', false);
	$('#chk-all-tabel-pdc').prop('checked', false);
	$('#btn-save-pdc-rv, #src-bank-issued-rv, #inp-bank-issued-rv').prop('disabled', false);
});
$('#inp-search-kontrak-rv').on('input', function(){
	$('#inp-search-pdc-rv').prop('disabled', false);
	$('#slc-no-kontrak-rv').empty();
	$('.res-global').val('');
    $('#slc-class-code-rv').prop('selectedIndex', 0);
	tabel_pdc_rv.clear().draw();
	$('#chk-inkaso-rv').prop('checked', false);
	$('#chk-all-tabel-pdc').prop('checked', false);
	$("#inp-date-pdc-rv").val(today);
	$('#inp-due-date-pdc-rv').val(today);
});

$("#btn-search-pdc-rv").click(function(){
	debugger;
	var cabang = $('#slc-branch-pdc').val();
	var no_pdc = $('#inp-search-pdc-rv').val();
	var no_kontrak = $('#inp-search-kontrak-rv').val();
	tabel_pdc_rv.clear();

	//search berdasarkan no kontrak
	if (check_session() === 'true') {
		if (no_pdc === '' && no_kontrak !== '') {
			if (cabang === '') {
				alert_info("Silahkan Input Cabang!");
				$('#div-list-branch').addClass('has-error');
			}
			else if (no_kontrak === '') {
				alert_info("Nomor Kontrak Belum Diisi");
				$('#div-search-kontrak-rv').addClass('has-error');
			}
			else{
				$('#div-list-branch').removeClass('has-error');
				$('#div-search-kontrak-rv').removeClass('has-error');
				$('#btn-add-tbl-rv').prop('disabled', false);
				cek = '';
				cek_contract = '';
				cek_class_code = [];
				indextitip = null;
				$.ajax({
					url: base_url + "Controller_pdc/get_no_kontrak",
					dataType: 'json',
					type: 'POST',
					data:{
						no_kontrak,
						cabang
					},
					cache: false,
					success: function(response){
						console.log(response);
						if (response) {
							try{
								$('#inp-due-date-pdc-rv').val(today);
								$('#slc-no-kontrak-rv').empty();
								$('.res-global').val('');
								$('#slc-class-code-rv').prop('selectedIndex', 0);

								//$('#slc-class-code-rv').empty();
								if (response['errorConsole']) {
									alert_error(response['errorConsole']);
								}
								else if (response['errMessage']) {
									alert_error(response['errMessage']);
								}
								else if (response['data'].length === 0) {
									alert_info("Kontrak Belum Di PPD.");
								}
								else{
									$('#coba').slideToggle('show');
									tabel_pdc_rv.clear().draw();
									$('#inp-no-pdc-rv').prop('disabled', false);
									$('#slc-no-kontrak-rv').prop('disabled', false);
									$('#slc-class-code-rv').prop('disabled', false);
									$('#btn-add-class-rv').prop('disabled', false);
									$('#inp-no-pdc-rv').val('');

									$('#slc-no-kontrak-rv').empty();
									$('<option/>').val('').html('-- Silahkan Pilih --').appendTo('#slc-no-kontrak-rv').addClass('form-control');
									$.each(response['data'], function(i){
										var kontrak_no = response['data'][i]['contract_no'];
										$('#inp-cust-no-rv').val(response['data'][i]['customer_no']);
										$('#inp-rec-from-rv').val(response['data'][i]['customer_name']);

										$('#slc-no-kontrak-rv').append('<option value="'+kontrak_no+'">'+kontrak_no+'</option>');
									});
									$('#inp-total-pinalty-pdc').val(accounting.formatMoney(response['totpin'], '', 2, ',', '.'));
								}
							}
							catch(e){
								$('#loading-ajax').hide();
								alert_error(e);
							}
						}
						else{
							alert_error("Cek Jaringan");
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
					}
				});
			}
		}
		//search berdasarkan no pdc
		else{
			if (cabang === '') {
				alert_info("Silahkan Input Cabang!");
				$('#div-list-branch').addClass('has-error');
			}
			else if (no_pdc === '') {
				alert_info("Nomor PDC Belum Diisi");
				$('#div-search-pdc-rv').addClass('has-error');	
			}
			else{
				$('#div-list-branch').removeClass('has-error');
				$('#div-search-pdc-rv').removeClass('has-error');
				$.ajax({
					url: base_url + "Controller_pdc/get_pdc_rv",
					dataType: 'json',
					type: 'POST',
					data:{
						no_pdc,
						cabang
					},
					cache: false,
					success: function(response){
						console.log(response);
						if (response) {
							try{
								tabel_pdc_rv.clear();
								if (response['errorConsole']) {
									alert_error(response['errorConsole']);
								}
								else if (response['errMessage']) {
									alert_error(response['errMessage']);
								}
								else if (response['status'] === 404) {
									alert_error(response['message']+ ' ' +response['status']);
								}
								else if (!response['message']) {
									if (response['send_no'] === '-') {
										$('#inp-rec-from-rv, #inp-due-date-pdc-rv, #inp-bank-branch-rv, #chk-inkaso-rv').prop('disabled', false);
										$('#btn-save-pdc-rv').prop('disabled', false);
									}
									else{
										$('#inp-due-date-pdc-rv, #inp-bank-branch-rv, #chk-inkaso-rv, #inp-bank-issued-rv','#inp-amount-pdc').prop('disabled', true);
										$('#btn-save-pdc-rv, #src-bank-issued-rv').prop('disabled', true);
										alert_info("PDC Sudah Selesai Send To Bank");
									}
									$('#slc-no-kontrak-rv').empty();
									//$('#slc-class-code-rv').empty();
									$('#btn-add-tbl-rv').prop('disabled', true);
									$('#inp-no-pdc-rv').prop('disabled', true);
									$('#slc-no-kontrak-rv').prop('disabled', true);
									$('#slc-class-code-rv').prop('disabled', true);
									$('#btn-add-class-rv').prop('disabled', true);


									$('#inp-no-pdc-rv').val(response['pdc_no']);
									$('#inp-cust-no-rv').val(response['cust_no']);
									$('#inp-vendor-type-rv').val(response['cust_type']);
									$('#inp-rec-from-rv').val(response['from_to']);
									$('#inp-bank-issued-rv').val(response['bank_id']+ ' - ' +response['bank_name']);
									$('#inp-bank-branch-rv').val(response['bank_branch']);
									$('#inp-date-pdc-rv').val(response['pdc_date']);
									$('#inp-due-date-pdc-rv').val(response['pdc_due_date']);
									$('#inp-total-amount-pdc').val(accounting.formatMoney(response['pdc_amount'], '', 2, ',', '.'));
									if (response['inkaso'] === '0') {
										$('#chk-inkaso-rv').prop("checked", false);
									}
									else if (response['inkaso'] === '1') {
										$('#chk-inkaso-rv').prop("checked", true);
									}

									var res_table_pdc = response['list'];
									var instl_no = '';
									var class_code = '';
									
									$.each(res_table_pdc, function(i){
										if(res_table_pdc[i]['acct_code_flag'] === 'JL' && response['send_no'] === '-'){
											$('#inp-rec-from-rv').prop('disabled', true);
										}
										else if (res_table_pdc[i]['acct_code_flag'] !== 'JL' && response['send_no'] === '-') {
											$('#inp-rec-from-rv').prop('disabled', false);
										}

										if (this['installment_no'] === '-') {
											instl_no = '';
										}else{
											instl_no = this['installment_no'];
										}

										if (this['class_code'] === 'T-ANGS') {
											class_code = this['class_code']+ ' - ' +this['acct_brief_desc']+ ' - ' +instl_no;
										}
										else{
											if (this['class_code'] === 'T-PIUT.ADP') {
												class_code = this['class_code']+ ' - ' + this['remarks'];	
											}
											else{
												class_code = this['class_code']+ ' - ' +this['acct_brief_desc'];
											}
										}

										
										tabel_pdc_rv.row.add([
											'<center><input type="checkbox" class="check-pdc-rv" id="chk-tabel-pdc-rv'+i+'"></center>',
											this['contract_no'],
											class_code,
											'<input type="text" class="form-control" id="inp-install-no'+i+'" value="'+instl_no+'" disabled>',
											this['portfolio_code'],
											'<input type="text" class="form-control" id="inp-remark-pdc'+i+'" value="'+this['remarks']+'" >',
											'<input type="text" class="form-control" id="inp-amt-due'+i+'" value="'+accounting.formatMoney(this['detail_amount1'], '', 2, ',', '.')+'" disabled="" >',
											'<input type="text" class="form-control amount-pdc inp-number" id="inp-amount-pdc'+i+'" value="'+accounting.formatMoney(this['detail_amount'], '', 2, ',', '.')+'">',
											this['pdc_due_date']
										]).draw(false);

										$('#chk-tabel-pdc-rv'+i).prop('disabled', true);
										$('#chk-tabel-pdc-rv'+i).prop('checked', true);
										$('#chk-all-tabel-pdc').prop('disabled', true);
										$('#chk-all-tabel-pdc').prop('checked', true);

										if ((this['class_code'] === 'T-ANGS' && this['installment_type'] !== '03') || this['class_code'] === 'T-UM.PK' || this['class_code'] === 'T-PIUT.ADP' || this['class_code'] === 'T-ADM.ANGS' || response['flag_preterm'] !== null) {
											$('#inp-amount-pdc'+i).prop('disabled', true);
										}
										else{
											$('#inp-amount-pdc'+i).prop('disabled', false);	
										}

										if (response['send_no'] === '-') {
											$('#inp-remark-pdc'+i).prop('disabled', false);
										}
										else{
											$('#inp-remark-pdc'+i).prop('disabled', true);	
										}
									});
								}	
							}
							catch(e){
								$('#loading-ajax').hide();
								alert_error(e);
							}
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
							alert_error(response['responseText']);
						}
					}
				});
			}
		}
	}
	else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});
function deb(){
	debugger;
}
/*------------------------------------------ SEARCH BERDASARKAN CLASS CODE ---------------------------------------------*/
$('#btn-add-class-rv').click(function(){
	var no_pdc = $('#inp-no-pdc-rv').val();
	var class_code = $('#slc-class-code-rv').val();
	var no_kontrak = $('#slc-no-kontrak-rv').val();
	var flag = true;
	console.log(no_kontrak);
	console.log(cek_class_code);
	//cek = '';
	//cek_class_code = [];

	if (check_session() === 'true') {
		if (no_pdc === '' || no_pdc === null) {
			alert_error("Silahkan Masukkan Nomor PDC Terlebih Dahulu");
			$('#div-no-pdc-rv').addClass('has-error');
		}
		else if (no_kontrak === '' || no_kontrak === null) {
			alert_error("Silahkan Pilih No Kontrak.");
			$('#div-no-kontrak-rv').addClass('has-error');
		}
		else if (class_code === '' || class_code === null) {
			alert_error("Silahkan Pilih Class Code");
			$('#div-class-code-rv').addClass('has-error');
		}
			
		else{
			$('#div-no-pdc-rv').removeClass('has-error');
			$('#div-class-code-rv').removeClass('has-error');
			$('#div-no-kontrak-rv').removeClass('has-error');
			$('#inp-no-pdc-rv').prop('disabled', true); // Edit by Adit 
			$.ajax({
				url : base_url+"Controller_pdc/validasi_classcode",	
				dataType: 'JSON',
				type: 'POST',
				data:{
					no_pdc,
					no_kontrak,
					class_code
				},
				cache: false,
				success: function(response){
					console.log(response);
					if (response) {
						try{
							//tabel_pdc_rv.clear().draw();
							var res = $.parseJSON(response);
							console.log(res);
							if (res['errorConsole']) {
								alert_error(res['errorConsole']);
								
							}
							else if (res['hasil'] === null){
								console.log(cek_class_code);
								for (var i = 0; i < cek_class_code.length; i++) {
									console.log(cek_class_code[i]['cek'])
									if (class_code === cek_class_code[i]['cek'] && no_kontrak === cek_class_code[i]['cek_contract']) {
										flag = false;
										console.log(flag);
									}
								}
								console.log(flag);
								if (flag) {
									get_by_class_code();								
								}
								else{
									alert_error("Class Code " +class_code+ " dengan Kontrak " +no_kontrak+ " Sudah ada.");
								}
								
							}
							else if (res['hasil'] !== null) {
								$('#inp-no-pdc-rv').prop('disabled', false); // Edit by Adit 
								alert_error(res['hasil']);
							}
						}
						catch(e){
							$('#loading-ajax').hide();

							alert_error(e);
						}
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
				}
			});
		}
	}
	else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});
/*------------------------------------------ FUNGSI UNTUK CHECK PADA TABEL ---------------------------------------------*/
$('#tbl-pdc-rv tbody').on('click', '.check-pdc-rv', function(){
	var pdc_rv = tabel_pdc_rv.data();
	console.log(pdc_rv);
	var tot = 0;

	for (var i = 0; i < pdc_rv.length; i++) {
		$('#inp-total-amount-pdc').val(0);

		if ($('#chk-tabel-pdc-rv'+i).is(":checked")) {	
			console.log('masuk');	
			var amount_pdc = accounting.unformat($('#inp-amount-pdc'+i).val());
			console.log(amount_pdc);
			tot += parseInt(amount_pdc);
			console.log(tot);
		}
		else{
			$('#chk-all-tabel-pdc').prop('checked', false);
		}

		if (i+1 === pdc_rv.length) {
			console.log(i+1);
            $('#inp-total-amount-pdc').val(accounting.formatMoney(tot, '', 2, ',', '.'));
        }
	}
});

$('#chk-all-tabel-pdc').click(function(){
	var pdc_rv = tabel_pdc_rv.data();
	console.log(pdc_rv);
	var tot = 0;

	for (var i = 0; i < pdc_rv.length; i++) {
		$('#inp-total-amount-pdc').val(0);
		if ($('#chk-all-tabel-pdc').is(":checked")) {
			$('.check-pdc-rv').prop('checked', true);

			var amount_pdc = accounting.unformat($('#inp-amount-pdc'+i).val());
			console.log(amount_pdc);
			tot += parseInt(amount_pdc);
			console.log(tot);
		}else{
			$('.check-pdc-rv').prop('checked', false);
		}
		if (i+1 === pdc_rv.length) {
            $('#inp-total-amount-pdc').val(accounting.formatMoney(tot, '', 2, ',', '.'));
        }
	}
});

/*----------------------------- FUNGSI UNTUK PENJUMLAHAN AMOUNT DUE ------------------------------*/
$('#tbl-pdc-rv').on('change', '.amount-pdc', function(){
	var amt_pdc = tabel_pdc_rv.row($(this).parents('tr')).data();
	var list_tbl_pdc = tabel_pdc_rv.data();
	var length_tbl = tabel_pdc_rv.data().length;
	var i = (this.id).substr(14, 1);
	console.log(i);
	console.log(amt_pdc);
	console.log(list_tbl_pdc);
	var tot = 0;
	var class_code_flag = [];
	var contract_flag = [];

	console.log($('#inp-amount-pdc'+i).val());

	var class_code = amt_pdc[2];
	var a = class_code.split(' - ');
	var classcode = a[0];
	var contract_no = amt_pdc[1];

	if (classcode !== 'T-DENDA' && classcode !== 'T-BUNGA' && classcode !== 'T-ANGS' && inst_type !== '03') {
		var amt_paid = accounting.unformat($('#inp-amount-pdc'+i).val());
		$('#inp-amt-due'+i).val(accounting.formatMoney(amt_paid, '', 2, ',', '.'));
		console.log($('#inp-amount-pdc'+i).val());
	}	

	var pdc_no = $('#inp-search-pdc-rv').val();
	var install_no = $('#inp-install-no'+i).val();
	var decpinalty = accounting.unformat($('#inp-amt-due'+i).val());
	var dectotal = accounting.unformat($('#inp-amount-pdc'+i).val());
	var decsisa = dectotal - decpinalty;
	console.log(decsisa);
	console.log(install_no);
	console.log(inst_type);

	var total_pinalty = accounting.unformat($('#inp-total-pinalty-pdc').val());
	if (classcode === 'T-ANGS') {
		if (decsisa <= 0) {
			
		}
		else{
			if (indextitip == null) {
				indextitip = length_tbl;
				$('#inp-amount-pdc'+i).val(accounting.formatMoney(decpinalty, '', 2, ',', '.'));
				tabel_pdc_rv.row.add([
					'<center><input type="checkbox" class="check-pdc-rv" id="chk-tabel-pdc-rv'+length_tbl+'"></center>',
					contract_no,
					'T-PDP.OP-4 - PENDAPATAN DECLAIN N',
					'<input type="text" class="form-control" id="inp-install-no'+length_tbl+'" value="'+install_no+'" disabled>',
					amt_pdc[4],
					'<input type="text" class="form-control" id="inp-remark-pdc'+length_tbl+'" value="PENDAPATAN DECLAIN N" >',
					'<input type="text" class="form-control" id="inp-amt-due'+length_tbl+'" value="'+accounting.formatMoney(decsisa, '', 2, ',', '.')+'" disabled="" >',
					'<input type="text" class="form-control amount-pdc inp-number" id="inp-amount-pdc'+length_tbl+'" value="'+accounting.formatMoney(decsisa, '', 2, ',', '.')+'">',
					amt_pdc[8]
				]).draw(false);
				cek = 'T-PDP.OP-4';
				cek_contract = contract_no;
				cek_class_code.push({
					cek,
					cek_contract
				});
			}
			else{
				$('#inp-amount-pdc'+i).val(accounting.formatMoney(decpinalty, '', 2, ',', '.'));
				$('#inp-amt-due'+indextitip).val(accounting.formatMoney(decsisa, '', 2, ',', '.'));
				$('#inp-amount-pdc'+indextitip).val(accounting.formatMoney(decsisa, '', 2, ',', '.'));
			}
		}
	}
	else if ((classcode === 'T-DENDA' || classcode === 'T-BUNGA') && pdc_no !== '') {
		if (decsisa > 0) {
			$('#inp-amount-pdc'+i).val(accounting.formatMoney(decpinalty, '', 2, ',', '.'));
		}	
	}
	else if (classcode === 'T-DENDA' && pdc_no === '') {

		var flag_class = true;
		var dec_sisa = dectotal - total_pinalty;
		for (var x = 0; x < list_tbl_pdc.length; x++) {
			class_code_flag = list_tbl_pdc[x][2];
			contract_flag = list_tbl_pdc[x][1];

			if (class_code_flag === 'T-TITIP - PENERIMAAN TITIPAN' && contract_flag == amt_pdc[1]) {
				console.log(contract_flag);
				console.log(amt_pdc[1]);
				flag_class = false;
				cek = 'T-TITIP';
				cek_contract = contract_no;
				cek_class_code.push({
					cek,
					cek_contract
				});

				var str = list_tbl_pdc[x][6];
				var str_split = str.split(' ');
				var idx_str = str_split[3];
				var idx_class_code = idx_str.substr(-2, 1);
				console.log(idx_class_code);

				if (decsisa > 0 && dectotal > total_pinalty) {
					console.log('cek cek cek');
					$('#inp-amount-pdc'+i).val(accounting.formatMoney(total_pinalty, '', 2, ',', '.'));
					$('#inp-install-no'+idx_class_code).val(install_no);
					$('#inp-amount-pdc'+idx_class_code).val(accounting.formatMoney(dec_sisa, '', 2, ',', '.'));
					$('#inp-amt-due'+idx_class_code).val(accounting.formatMoney(dec_sisa, '', 2, ',', '.'));
				}
				break;
			}
		}
		if (flag_class) {
			console.log('flag_class = true');
			if(indextitip == null){
				console.log('indextitip == null');
				if (decsisa > 0 && dectotal > total_pinalty) {
					indextitip = length_tbl;
					$('#inp-amount-pdc'+i).val(accounting.formatMoney(total_pinalty, '', 2, ',', '.'));
					tabel_pdc_rv.row.add([
						'<center><input type="checkbox" class="check-pdc-rv" id="chk-tabel-pdc-rv'+length_tbl+'"></center>',
						contract_no,
						'T-TITIP - PENERIMAAN TITIPAN',
						'<input type="text" class="form-control" id="inp-install-no'+length_tbl+'" value="'+install_no+'" disabled>',
						amt_pdc[4],
						'<input type="text" class="form-control" id="inp-remark-pdc'+length_tbl+'" value="PENERIMAAN TITIPAN" >',
						'<input type="text" class="form-control" id="inp-amt-due'+length_tbl+'" value="'+accounting.formatMoney(dec_sisa, '', 2, ',', '.')+'" disabled="" >',
						'<input type="text" class="form-control amount-pdc inp-number" id="inp-amount-pdc'+length_tbl+'" value="'+accounting.formatMoney(dec_sisa, '', 2, ',', '.')+'">',
						amt_pdc[8]
					]).draw(false);
					cek = 'T-TITIP';
					cek_contract = contract_no;
					cek_class_code.push({
						cek,
						cek_contract
					});
				} 
			}else {
				if (class_code_flag == 'T-TITIP - PENERIMAAN TITIPAN' && contract_flag == amt_pdc[1]) {
					if (decsisa > 0 && dectotal > total_pinalty) {
						$('#inp-amount-pdc'+i).val(accounting.formatMoney(total_pinalty, '', 2, ',', '.'));
						$('#inp-amt-due'+indextitip).val(accounting.formatMoney(dec_sisa, '', 2, ',', '.'));
						$('#inp-amount-pdc'+indextitip).val(accounting.formatMoney(dec_sisa, '', 2, ',', '.'));
					}
				}
				else{
					if (decsisa > 0 && dectotal > total_pinalty) {
						indextitip = length_tbl;
						$('#inp-amount-pdc'+i).val(accounting.formatMoney(total_pinalty, '', 2, ',', '.'));
						tabel_pdc_rv.row.add([
							'<center><input type="checkbox" class="check-pdc-rv" id="chk-tabel-pdc-rv'+length_tbl+'"></center>',
							contract_no,
							'T-TITIP - PENERIMAAN TITIPAN',
							'<input type="text" class="form-control" id="inp-install-no'+length_tbl+'" value="'+install_no+'" disabled>',
							amt_pdc[4],
							'<input type="text" class="form-control" id="inp-remark-pdc'+length_tbl+'" value="PENERIMAAN TITIPAN" >',
							'<input type="text" class="form-control" id="inp-amt-due'+length_tbl+'" value="'+accounting.formatMoney(dec_sisa, '', 2, ',', '.')+'" disabled="" >',
							'<input type="text" class="form-control amount-pdc inp-number" id="inp-amount-pdc'+length_tbl+'" value="'+accounting.formatMoney(dec_sisa, '', 2, ',', '.')+'">',
							amt_pdc[8]
						]).draw(false);
						cek = 'T-TITIP';
						cek_contract = contract_no;
						cek_class_code.push({
							cek,
							cek_contract
						});
					} 
				}
			}
		}
	}
	else if (classcode === 'T-BUNGA' && pdc_no === '') {
		console.log(decpinalty);

		if (length_tbl !== 0) {
			var flag_class = true;
			for (var x = 0; x < list_tbl_pdc.length; x++) {
				class_code_flag = list_tbl_pdc[x][2];
				contract_flag = list_tbl_pdc[x][1];

				if (class_code_flag === 'T-TITIP - PENERIMAAN TITIPAN' && contract_flag == amt_pdc[1]) {
					flag_class = false;
					cek = 'T-TITIP';
					cek_contract = contract_no;
					cek_class_code.push({
						cek,
						contract_no
					});

					var str = list_tbl_pdc[x][6];
					var str_split = str.split(' ');
					var idx_str = str_split[3];
					var idx_class_code = idx_str.substr(-2, 1);
					console.log(idx_class_code);

					if (decsisa > 0) {
						console.log('cek cek cek');
						$('#inp-amount-pdc'+i).val(accounting.formatMoney(decpinalty, '', 2, ',', '.'));
						$('#inp-amount-pdc'+idx_class_code).val(accounting.formatMoney(decsisa, '', 2, ',', '.'));
						$('#inp-amt-due'+idx_class_code).val(accounting.formatMoney(decsisa, '', 2, ',', '.'));
					}
					break;
				}
			}
			if (flag_class) {
				if (indextitip == null) {
					if (decpinalty == 0) {
						console.log('amount due 0');
						indextitip = length_tbl;
						$('#inp-amount-pdc'+i).val(0);
						tabel_pdc_rv.row.add([
							'<center><input type="checkbox" class="check-pdc-rv" id="chk-tabel-pdc-rv'+length_tbl+'"></center>',
							contract_no,
							'T-TITIP - PENERIMAAN TITIPAN',
							'<input type="text" class="form-control" id="inp-install-no'+length_tbl+'" value="'+install_no+'" disabled>',
							amt_pdc[4],
							'<input type="text" class="form-control" id="inp-remark-pdc'+length_tbl+'" value="PENERIMAAN TITIPAN" >',
							'<input type="text" class="form-control" id="inp-amt-due'+length_tbl+'" value="'+accounting.formatMoney(dectotal, '', 2, ',', '.')+'" disabled="" >',
							'<input type="text" class="form-control amount-pdc inp-number" id="inp-amount-pdc'+length_tbl+'" value="'+accounting.formatMoney(dectotal, '', 2, ',', '.')+'">',
							amt_pdc[8]
						]).draw(false);
						cek = 'T-TITIP';
						cek_contract = contract_no;
						cek_class_code.push({
							cek,
							contract_no
						});
					}
					else{
						if (decsisa > 0) {
							console.log('masuk min');
							indextitip = length_tbl;
							$('#inp-amount-pdc'+i).val(accounting.formatMoney(decpinalty, '', 2, ',', '.'));
							tabel_pdc_rv.row.add([
								'<center><input type="checkbox" class="check-pdc-rv" id="chk-tabel-pdc-rv'+length_tbl+'"></center>',
								contract_no,
								'T-TITIP - PENERIMAAN TITIPAN',
								'<input type="text" class="form-control" id="inp-install-no'+length_tbl+'" value="'+install_no+'" disabled>',
								amt_pdc[4],
								'<input type="text" class="form-control" id="inp-remark-pdc'+length_tbl+'" value="PENERIMAAN TITIPAN" >',
								'<input type="text" class="form-control" id="inp-amt-due'+length_tbl+'" value="'+accounting.formatMoney(decsisa, '', 2, ',', '.')+'" disabled="" >',
								'<input type="text" class="form-control amount-pdc inp-number" id="inp-amount-pdc'+length_tbl+'" value="'+accounting.formatMoney(decsisa, '', 2, ',', '.')+'">',
								amt_pdc[8]
							]).draw(false);
							cek = 'T-TITIP';
							cek_contract = contract_no;
							cek_class_code.push({
								cek,
								contract_no
							});
						}
					}
				}
				else {
					console.log('masuk else');
					if (class_code_flag == 'T-TITIP - PENERIMAAN TITIPAN' && contract_flag == amt_pdc[1]) {
						if (decsisa > 0) {
							$('#inp-amount-pdc'+i).val(accounting.formatMoney(decpinalty, '', 2, ',', '.'));
							$('#inp-amt-due'+indextitip).val(accounting.formatMoney(decsisa, '', 2, ',', '.'));
							$('#inp-amount-pdc'+indextitip).val(accounting.formatMoney(decsisa, '', 2, ',', '.'));
						}
					}
					else {
						if (decpinalty == 0) {
							console.log('amount due 0');
							indextitip = length_tbl;
							$('#inp-amount-pdc'+i).val(0);
							tabel_pdc_rv.row.add([
								'<center><input type="checkbox" class="check-pdc-rv" id="chk-tabel-pdc-rv'+length_tbl+'"></center>',
								contract_no,
								'T-TITIP - PENERIMAAN TITIPAN',
								'<input type="text" class="form-control" id="inp-install-no'+length_tbl+'" value="'+install_no+'" disabled>',
								amt_pdc[4],
								'<input type="text" class="form-control" id="inp-remark-pdc'+length_tbl+'" value="PENERIMAAN TITIPAN" >',
								'<input type="text" class="form-control" id="inp-amt-due'+length_tbl+'" value="'+accounting.formatMoney(dectotal, '', 2, ',', '.')+'" disabled="" >',
								'<input type="text" class="form-control amount-pdc inp-number" id="inp-amount-pdc'+length_tbl+'" value="'+accounting.formatMoney(dectotal, '', 2, ',', '.')+'">',
								amt_pdc[8]
							]).draw(false);
							cek = 'T-TITIP';
							cek_contract = contract_no;
							cek_class_code.push({
								cek,
								contract_no
							});
						}
						else{
							if (decsisa > 0) {
								console.log('masuk min');
								indextitip = length_tbl;
								$('#inp-amount-pdc'+i).val(accounting.formatMoney(decpinalty, '', 2, ',', '.'));
								tabel_pdc_rv.row.add([
									'<center><input type="checkbox" class="check-pdc-rv" id="chk-tabel-pdc-rv'+length_tbl+'"></center>',
									contract_no,
									'T-TITIP - PENERIMAAN TITIPAN',
									'<input type="text" class="form-control" id="inp-install-no'+length_tbl+'" value="'+install_no+'" disabled>',
									amt_pdc[4],
									'<input type="text" class="form-control" id="inp-remark-pdc'+length_tbl+'" value="PENERIMAAN TITIPAN" >',
									'<input type="text" class="form-control" id="inp-amt-due'+length_tbl+'" value="'+accounting.formatMoney(decsisa, '', 2, ',', '.')+'" disabled="" >',
									'<input type="text" class="form-control amount-pdc inp-number" id="inp-amount-pdc'+length_tbl+'" value="'+accounting.formatMoney(decsisa, '', 2, ',', '.')+'">',
									amt_pdc[8]
								]).draw(false);
								cek = 'T-TITIP';
								cek_contract = contract_no;
								cek_class_code.push({
									cek,
									contract_no
								});
							}
						}
					}
				}
			}
		}
	}

	//var list_tbl_pdc_x = tabel_pdc_rv.data();
	//console.log(list_tbl_pdc_x);
	
	for (var j = 0; j < list_tbl_pdc.length; j++) {
		var amount = accounting.unformat($('#inp-amount-pdc'+j).val());
		console.log(amount);
		tot += parseInt(amount);
		console.log(tot);
	}
	$('#inp-total-amount-pdc').val(accounting.formatMoney(tot, '', 2, ',', '.'));
	
});
/*---------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------- PROSES INSERT PDC RV REGISTRATION -------------------------------------------*/

$('#btn-save-pdc-rv').click(function(){
	var list_data = tabel_pdc_rv.data();
	var length = $('#tbl-pdc-rv').find('.check-pdc-rv').filter(':checked').length;
	console.log(length);

	var bank_branch = $('#inp-bank-branch-rv').val();
	var bank_issued = $('#inp-bank-issued-rv').val();
	var from_to = $('#inp-rec-from-rv').val();
	var new_data = [];
	var nmr_pdc = $('#inp-no-pdc-rv').val();


	if (check_session() === 'true') {
		if (bank_issued === '') {
			alert_error("Bank Issued Belum Diisi.");
			$('#div-bank-issued-rv').addClass('has-error');
		}
		else if (bank_branch === '') {
			alert_error("Bank Cabang Belum Diisi.");
			$('#div-bank-branch-rv').addClass('has-error');
		}
		else if (from_to === '') {
			alert_error("Nama Customer Belum Terisi.");
			$('#div-rec-from-rv').addClass('has-error');
		}
		else if (length === 0) {
			alert_error("Silahkan Pilih Data Yang Akan Disimpan Terlebih Dahulu.");
		}
	
		else{
			$('#div-bank-issued-rv').removeClass('has-error');
			$('#div-bank-branch-rv').removeClass('has-error');
			console.log(length);
			for (var i = 0; i < list_data.length; i++) {
				if ($('#chk-tabel-pdc-rv'+i).is(":checked")) {
					//checked += 1;
					new_data.push({
						no_kontrak : list_data[i][1],
			 			class_code : list_data[i][2],
			 			installment_no : $('#inp-install-no'+i).val(),
			 			remark : $('#inp-remark-pdc'+i).val(),
			 			amt_paid : accounting.unformat($('#inp-amount-pdc'+i).val())
					});
				}
			}
			console.log(new_data);
			alert_confirm("Apakah anda yakin akan menyimpan data?", function(){
				insert_pdc_rv(new_data);
			});
		}
	}
	else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

$('#btn-cancel-pdc-rv').click(function(){
	if (check_session() === 'true') {
		alert_confirm("Apakah anda yakin akan cancel PDC ini?", function(){
			cancel_pdc_rv();
		});
	}
	else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});
/*-------------------------------------------------- PROSES SEND TO BANK -----------------------------------------------*/
$('#btn-search-pdc-send').click(function(){
	var start_date = $('#inp-tgl-awal-send').val();
	var end_date = $('#inp-tgl-akhir-send').val();
	var bank_id = $('#inp-bank-id-send').val();
	var cabang =  $('#slc-branch-pdc').val();

	if (check_session() === 'true') {
		if (start_date === '' && end_date === '') {
			alert_error("Silahkan Input Periode Jatuh Tempo PDC.");
			$('#div-tgl-awal-send').addClass('has-error');
			$('#div-tgl-akhir-send').addClass('has-error');
		}
		/*else if (bank_id === '') {
			alert_error("Silahkan Pilih Bank.");
			$('#div-bank-id-send').addClass('has-error');
			$('#div-bank-name-send').addClass('has-error');
		}*/
		else if (cabang === '') {
			alert_error("Pilih Cabang Terlebih Dahulu.");
			$('#div-list-branch').addClass('has-error');
		}
		else{
			$('#div-tgl-awal-send').removeClass('has-error');
			$('#div-tgl-akhir-send').removeClass('has-error');
			$('#div-bank-id-send').removeClass('has-error');
			$('#div-bank-name-send').removeClass('has-error');
			$('#div-list-branch').removeClass('has-error');
			$.ajax({
				url: base_url + "Controller_pdc/search_pdc_send",
				type: 'POST',
				dataType: 'json',
				data:{
					start_date,
					end_date,
					bank_id,
					cabang
				},
				cache: false,
				success: function(response){
					var response = $.parseJSON(response);
					console.log(response);
					if (response) {
						try{
							tabel_pdc_send.clear();
							if (response['errorConsole']) {
								alert_error(response['errorConsole']);
							}
							else if (response['data'].length === 0) {
								alert_error("Data Tidak Ada Untuk Bank Id : "+bank_id+ " Untuk Periode "+start_date+ " s/d "+end_date);
							}
							else{
								$.each(response['data'], function(i){
									var pdc_inkaso = '';
									if (this['pdc_inkaso'] === '1') {
										pdc_inkaso = '<div class="input-group"><input type="text" class="form-control" id="inp-inkaso-send'+i+'" disabled="" ><button class="btn btn-default input-sm cls-inkaso-send" id="src-inkaso-send'+i+'" style="width:30px; border: none;"><i class="fa fa-search" style="color: #333;"></i></button></div>';
									}
									else{
										pdc_inkaso = '<input type="text" class="form-control" id="inp-inkaso-send'+i+'" disabled="" >';
									}
									tabel_pdc_send.row.add([
										'<center><input type="checkbox" class="check-pdc-send" id="chk-tabel-pdc-send'+i+'" ></center>',
										this['rownum'],
										this['pdc_due_date'],
										this['pdc_no'],
										this['from_to'],
										accounting.formatMoney(this['pdc_amount'], '', 2, ',', '.'),
										this['cust_type'],
										this['bank_id'],
										pdc_inkaso
									]).draw(false);
								});
							}
						}
						catch(e){
							$('#loading-ajax').hide();
							alert_error(e);
						}
					}
					else{
						alert_error("Cek Jaringan");
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
				}
			});
		}
	}
	else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

$('#chk-all-pdc-send').click(function(){
	var pdc_send = tabel_pdc_send.data();
	console.log(pdc_send);

	for (var i = pdc_send.length - 1; i >= 0; i--) {
		if ($('#chk-all-pdc-send').is(":checked")) {
			$('.check-pdc-send').prop("checked", true);
		}
		else{
			$(".check-pdc-send").prop("checked", false);
		}
	}
});

$('#tbl-send-to-bank tbody').on('click', '.check-pdc-send', function(){
	var pdc_send = tabel_pdc_send.data();
	console.log(pdc_send);

	for (var i = 0; i < pdc_send.length; i++) {

		if ($('#chk-tabel-pdc-send'+i).is(":checked")) {	
			console.log('checked');	
		}
		else{
			$('#chk-all-pdc-send').prop('checked', false);
		}
	}
});

$('#btn-save-pdc-send').click(function(){
	var cabang = $('#slc-branch-pdc').val();
	var list_pdc_send = tabel_pdc_send.data();
	var length = $('#tbl-send-to-bank').find('.check-pdc-send').filter(':checked').length;
	console.log(list_pdc_send);
	var new_data = [];
	var bank_inkaso = '';

	if (check_session() === 'true') {
		if (length === 0) {
			alert_error("Silahkan Pilih Data Yang Akan Disimpan Terlebih Dahulu");
		}
		else{
			console.log(length);
			for (var i = 0; i < list_pdc_send.length; i++) {
				if ($('#chk-tabel-pdc-send'+i).is(":checked")) {
					if ($('#inp-inkaso-send'+i).val() !== '') {
						bank_inkaso = $('#inp-inkaso-send'+i).val();
					}
					else{
						bank_inkaso = list_pdc_send[i][7];
					}
					new_data.push({
						pdc_no : list_pdc_send[i][3],
						bank : bank_inkaso
					});
				}
			}
			console.log(new_data);
			alert_confirm("Apakah anda yakin akan send to bank "+length+" PDC ini?", function(){
				insert_pdc_send(new_data);
			});
		}
	}
	else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

$('#tbl-send-to-bank tbody').on('click', '.cls-inkaso-send', function(){
	var bank_inkaso = tabel_pdc_send.row($(this).parents('tr')).data();
	var index = bank_inkaso[1] - 1;
	var cabang = $('#slc-branch-pdc').val();
	console.log(index);
	get_bank_issued(cabang, index);
});
/*----------------------------------------------- END PROSES SEND TO BANK ----------------------------------------------*/

/*------------------------------------------------ PROSES APPROVE REJECT -----------------------------------------------*/
$('#btn-search-pdc-appr').click(function(){
	var pdc_start_date = $('#inp-tgl-awl-appr').val();
	var pdc_end_date = $('#inp-tgl-akhir-appr').val();
	var cabang = $('#slc-branch-pdc').val();
	var bank_id = $('#inp-bank-id-appr').val();
	console.log(cabang);

	if (check_session() === 'true') {
		if (pdc_start_date === '' && pdc_end_date === '') {
			alert_error("Silahkan Pilih Periode PDC Send Date");
			$('#div-tgl-awl-appr').addClass('has-error');
			$('#div-tgl-akhir-appr').addClass('has-error');
		}
		else if (cabang === '') {
			alert_error("Silahkan Pilih Cabang Terlebih Dahulu.");
			$('#div-list-branch').addClass('has-error');
		}
		else if (bank_id === '') {
			alert_error("Silahkan Pilih Bank Terlebih Dahulu.");
			$('#div-bank-id-appr').addClass('has-error');
			$('#div-bank-name-appr').addClass('has-error');
		}
		else{
			$('#div-tgl-awl-appr').removeClass('has-error');
			$('#div-tgl-akhir-appr').removeClass('has-error');
			$('#div-list-branch').removeClass('has-error');
			$('#div-bank-id-appr').removeClass('has-error');
			$('#div-bank-name-appr').removeClass('has-error');

			$.ajax({
				url : base_url+"Controller_pdc/select_pdc_appr",
				dataType : 'json',
				type : 'POST',
				cache : false,
				data : {
					pdc_start_date,
					pdc_end_date,
					cabang,
					bank_id
				},
				success : function(response){
					console.log(response);
					if (response) {
						try{
							tabel_pdc_appr.clear();
							if (response['errorConsole']) {
								alert_error(response['errorConsole']);
							}
							else if (response['data'].length === 0) {
								alert_info("Data Tidak Ditemukan");
							}
							else{
								$.each(response['data'], function(i){
									tabel_pdc_appr.row.add([
										this['rownum'],
										this['send_date'],
										this['pdc_no'],
										this['from_to'],
										accounting.formatMoney(this['pdc_amount'], '', 2, ',', '.'),
										this['bank_id'],
										this['cust_type'],

										'<div class="input-group" id="div-col-date-appr'+i+'"><input type="text" class="form-control input-sm inp-col-appr" id="inp-col-date-appr'+i+'"></div>',
										'<center><input type="checkbox" class="chk-pdc-appr" id="chk-tabel-pdc-appr'+i+'" >Appr <input type="checkbox" class="chk-pdc-reject" id="chk-tabel-pdc-reject'+i+'" value="1" >Reject</center>',
										'<input type="text" class="form-control inp-note-rjt" id="inp-note-reject'+i+'" >',
										'<input type="text" id="hdn-pdc-due-date'+i+'" class="form-control" value="'+this['pdc_due_date']+'" disabled="">'

									]).draw(false);
								});
							}
						}
						catch(e){
							$('#loading-ajax').hide();
							alert_error(e);
						}
					}
				},
				error : function(response){
					console.log(response);
					if (response['responseText'] === "" && response['statusText'] === 'OK') {
						alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
							localStorage.clear();
							window.location.href = base_url + "Controller_login/login_view";
						});
					}
				}
			});
		}
	}
	else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});

//approve all
$('#chk-all-pdc-appr').click(function(){
	var pdc_appr = tabel_pdc_appr.data();
	console.log(pdc_appr);
	var tot = 0;

	for (var i = 0; i < pdc_appr.length; i++) {
		$('#inp-tot-amount-appr').val(0);

		if ($('#chk-all-pdc-appr').is(":checked")) {
			var col_due_date = $('#hdn-pdc-due-date'+i).val();
			$('#inp-col-date-appr'+i).val(col_due_date);

			$('.inp-note-rjt').val('');
			$('.inp-note-rjt').prop('disabled', true);
			$('.chk-pdc-appr').prop('checked', true);
			$('.chk-pdc-reject').prop('checked', false);
			$('#chk-all-pdc-reject').prop('checked', false);
			$('#inp-tot-amount-reject').val(accounting.formatMoney(0, '', 2, ',', '.'));

			var amount = accounting.unformat(pdc_appr[i][4]);
			console.log(amount);
			tot += parseInt(amount);
			console.log(tot);
		}else{
			$('.chk-pdc-appr').prop('checked', false);
			$('.inp-col-appr').val('');
			$('.inp-note-rjt').prop('disabled', false);
		}
		if (i+1 === pdc_appr.length) {
            $('#inp-tot-amount-appr').val(accounting.formatMoney(tot, '', 2, ',', '.'));
        }
	}
});

//reject all
$('#chk-all-pdc-reject').click(function(){
	var pdc_reject = tabel_pdc_appr.data();
	console.log(pdc_reject);
	var tot = 0;

	for (var i = 0; i < pdc_reject.length; i++) {
		$('#inp-tot-amount-reject').val(0);

		if ($('#chk-all-pdc-reject').is(":checked")) {
			$('.inp-col-appr').val('');
			$('.inp-note-rjt').prop('disabled', false);
			$('.chk-pdc-reject').prop('checked', true);
			$('.chk-pdc-appr').prop('checked', false);
			$('#chk-all-pdc-appr').prop('checked', false);
			$('#inp-tot-amount-appr').val(accounting.formatMoney(0, '', 2, ',', '.'));

			var amount = accounting.unformat(pdc_reject[i][4]);
			console.log(amount);
			tot += parseInt(amount);
			console.log(tot);
		}else{
			$('.chk-pdc-reject').prop('checked', false);
			$('.inp-note-rjt').val('');
		}
		if (i+1 === pdc_reject.length) {
            $('#inp-tot-amount-reject').val(accounting.formatMoney(tot, '', 2, ',', '.'));
        }
	}
});

var tot_appr = 0;
var tot_appr1 = 0;
var tot_rjt = 0;
var tot_rjt1 = 0;
$('#inp-tot-amount-appr').val(0);
$('#inp-tot-amount-reject').val(0);

//approve
$('#tbl-approve-reject tbody').on('click', '.chk-pdc-appr', function(){
	
	var col_date = tabel_pdc_appr.row($(this).parents('tr')).data();
	var tot_reject = parseInt(accounting.unformat($('#inp-tot-amount-reject').val()));
	console.log(tot_reject);
	var i = col_date[0]-1;
	var amount = accounting.unformat(col_date[4]);
	tot_appr = parseInt(accounting.unformat($('#inp-tot-amount-appr').val()));


	if ($('#chk-tabel-pdc-appr'+i).is(":checked")) {
		var col_due_date = $('#hdn-pdc-due-date'+i).val();
		$('#inp-col-date-appr'+i).val(col_due_date);

		if ($('#chk-tabel-pdc-reject'+i).is(":checked")) {
			$('#chk-tabel-pdc-reject'+i).prop("checked", false);
			tot_appr1 = tot_reject - parseInt(amount);
			console.log(tot_appr1);
			tot_reject = tot_appr1;
		}
		console.log(amount);
		tot_appr += parseInt(amount);
		$('#inp-note-reject'+i).prop('disabled', true);
		$('#inp-note-reject'+i).val('');
	}
	else{
		$('#inp-col-date-appr'+i).val('');
		$('#chk-all-pdc-appr').prop('checked', false);
		$('#inp-col-date-appr'+i).prop('disabled', false);
		$('#inp-note-reject'+i).prop('disabled', false);
		tot_appr -= parseInt(amount);
	}
	$('#inp-tot-amount-appr').val(accounting.formatMoney(tot_appr, '', 2, ',', '.'));
	$('#inp-tot-amount-reject').val(accounting.formatMoney(tot_reject, '', 2, ',', '.'));
});

//reject
$('#tbl-approve-reject tbody').on('click', '.chk-pdc-reject', function(){
	var col_date = tabel_pdc_appr.row($(this).parents('tr')).data();
	var tot_approve = parseInt(accounting.unformat($('#inp-tot-amount-appr').val()));
	
	console.log(tot_approve);
	var i = col_date[0]-1;
	var amount = accounting.unformat(col_date[4]);
	tot_rjt = parseInt(accounting.unformat($('#inp-tot-amount-reject').val()));

	if ($('#chk-tabel-pdc-reject'+i).is(":checked")) {
		$('#inp-col-date-appr'+i).val('');
		$('#inp-col-date-appr'+i).prop('disabled', false);
		$('#inp-note-reject'+i).prop('disabled', false);

		if ($('#chk-tabel-pdc-appr'+i).is(":checked")) {
			$('#chk-tabel-pdc-appr'+i).prop('checked', false);
			tot_rjt1 = tot_approve - parseInt(amount);
			console.log(tot_rjt1);
			tot_approve = tot_rjt1;
		}
		console.log(amount);
		tot_rjt += parseInt(amount);
	}
	else{
		tot_rjt -= parseInt(amount);
		$('#chk-all-pdc-reject').prop('checked', false);
	}
	$('#inp-tot-amount-reject').val(accounting.formatMoney(tot_rjt, '', 2, ',', '.'));
	$('#inp-tot-amount-appr').val(accounting.formatMoney(tot_approve, '', 2, ',', '.'));
});

//datepicker coll date
$('#tbl-approve-reject tbody').on('focus', 'tr', function(){ //penambahan code
	var i = tabel_pdc_appr.row(this).index();
	var col_date = tabel_pdc_appr.row(i).data();//penambahan var col_date
	//date_awal = col_date[1]; //penambahan oleh adit

	$('#inp-col-date-appr'+i).datetimepicker({
	format: 'DD-MMM-YYYY',
	maxDate : 'now',
	//minDate : date_awal, //penambahan minDate
	allowInputToggle: true
});

});
//insert appr/reject
$('#btn-save-pdc-appr').click(function(){
	var list_appr = tabel_pdc_appr.data();
	var length_appr = $('#tbl-approve-reject').find('.chk-pdc-appr').filter(':checked').length;
	var length_reject = $('#tbl-approve-reject').find('.chk-pdc-reject').filter(':checked').length;
	var bank_tujuan = $('#slc-bank-tujuan-appr').val();
	var new_data = [];
	var flag = '';

	if (check_session() === 'true') {
		if (length_appr === 0 && length_reject === 0) {
			alert_error("Silahkan Pilih Data Yang Akan Disimpan Terlebih Dahulu");
		}
		else{
			console.log(length_appr);
			console.log(length_reject);
			for (var i = 0; i < list_appr.length; i++) {
				var col_date = $('#inp-col-date-appr'+i).val();
				var due_date = $('#hdn-pdc-due-date'+i).val();
				console.log(col_date);
				console.log(due_date);
				console.log(list_appr);

				if ($('#chk-tabel-pdc-appr'+i).is(":checked") || $('#chk-tabel-pdc-reject'+i).is(":checked")) {
					if($('#chk-tabel-pdc-appr'+i).is(":checked")){
						console.log("masuk approve");
						flag = '0';
						new_data.push({
							bank_tujuan : $('#slc-bank-tujuan-appr').val(),
							branch : $('#slc-branch-pdc').val(),
							pdc_no : list_appr[i][2],
							col_date : $('#inp-col-date-appr'+i).val(),
							reject : $('#inp-note-reject'+i).val(),
							flag : flag
						});
					}
					if($('#chk-tabel-pdc-reject'+i).is(":checked")){
						console.log("masuk reject");
						flag = '1';
						new_data.push({
							bank_tujuan : $('#slc-bank-tujuan-appr').val(),
							branch : $('#slc-branch-pdc').val(),
							pdc_no : list_appr[i][2],
							col_date : $('#inp-col-date-appr'+i).val(),
							reject : $('#inp-note-reject'+i).val(),
							flag : flag
						});
					}
				}
			}
			console.log(new_data);
			if (bank_tujuan === '') {
				alert_info("Bank Tujuan Harus Diisi.");
				$('#div-bank-tujuan-appr').addClass('has-error');
			}		
		
			else{
				$('#div-bank-tujuan-appr').removeClass('has-error');
				alert_confirm("Apakah anda yakin akan menyimpan data?", function(){
					insert_pdc_journal(new_data);
				});
			}
			
		}
	}
	else if (check_session() === 'false') {
		alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
			localStorage.clear();
			window.location.href = base_url + "Controller_login/login_view";
		});
	}
});
/*---------------------------------------------- END PROSES APPROVE REJECT ---------------------------------------------*/

/*--------------------------------------------------- PROSES PDC PV ----------------------------------------------------*/
// PROSES PDC PV DI TAKE OUT ------------------------------

$('#btn-search-pdc-pv').click(function(){
	var cabang = $('#slc-branch-pdc').val();
	var pdc_no = $('#inp-pdc-pv').val();

	if (pdc_no === '') {
		alert_info("Silahkan Input No PDC.");
		$('#div-pdc-pv').addClass('has-error');
	}
	else if (cabang === ''){
		alert_info("Cabang belum dipilih.");
		$('#div-list-branch').addClass('has-error');
	}
	else{
		$.ajax({
			url : base_url+"Controller_pdc/get_pdc_pv",
			type : 'POST',
			dataType : 'JSON',
			data : {
				no_pdc : pdc_no,
				cabang : cabang
			},
			cache : false,
			success : function(response){
				console.log(response);
				if (response) {
					try{
						tabel_pdc_pv.clear().draw();
						if (response['errorConsole']) {
							alert_error(response['errorConsole']);
						}
						else if (response['errMessage']) {
							alert_error(response['errMessage']);
						}
						else if (response['status'] === 404) {
							alert_error(response['message']+ ' ' +response['status']);
						}
						else{
							$('#inp-bank-issued-pv').val(response['bank']);
							$('#inp-bank-branch-pv').val(response['bank_branch']);
							$('#inp-cust-no-pv').val(response['cust_no']);
							$('#inp-vendor-type-pv').val(response['cust_type']);
							$('#inp-rec-from-pv').val(response['from_to']);
							$('#inp-total-pdc-pv').val(accounting.formatMoney(response['pdc_amount'], '', 2, ',', '.'));
							if (response['inkaso'] === '0') {
								$('#chk-inkaso-pv').prop("checked", false);
							}
							else if (response['inkaso'] === '1') {
								$('#chk-inkaso-pv').prop("checked", true);
							}
							$('#inp-date-pdc-pv').val(response['pdc_date']);
							$('#inp-due-date-pdc-pv').val(response['pdc_due_date']);

							$.each(response['list'], function(i){
								tabel_pdc_pv.row.add([
									this['rownum'],
									this['branch_id'],
									this['class_code']+ ' - ' +this['acct_brief_desc'],
									this['remarks'],
									this['contract_no'],
									this['portfolio_code'],
									accounting.formatMoney(this['detail_amount'], '', 2, ',', '.')
								]).draw(false);
							});
						}
					}
					catch(e){
						$('#loading-ajax').hide();
						alert_error(e);
					}
				}
			},
			error : function(response){
				console.log(response);
				if (response['responseText'] === "" && response['statusText'] === 'OK') {
					alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
						localStorage.clear();
						window.location.href = base_url + "Controller_login/login_view";
					});
				}
			}
		});
	}
});

$('#btn-cancel-pdc-pv').click(function(){
	var tbl_pv = tabel_pdc_pv.data();
	console.log(tbl_pv);

	var new_data = [];
	$.each(tbl_pv, function(i){
		new_data.push({
			cabang : tbl_pv[i][1],
			no_pdc : $('#inp-pdc-pv').val(),
			class_code : tbl_pv[i][2],
			no_kontrak : tbl_pv[i][4]
		});
	});
	console.log(new_data);
	$.ajax({
		url: base_url+"Controller_pdc/cancel_pv",
		type : 'POST',
		dataType : 'JSON',
		data:{
			user_id : $('#hdn-user-nik-pdc').val(),
			data : new_data
		},
		cache : false,
		success: function(response){
			console.log(response);
			if (response) {
				try{
					if (response['errorConsole']) {
						alert_error(response['errorConsole']);
					}
					else if (response['errMessage']) {
						alert_error(response['errMessage']);
					}
					else if(response['status']){
						alert_info(response['status'], function(){
							window.location.href = base_url+"Controller_pdc";
						});
					}
				}
				catch(e){
					$('#loading-ajax').hide();
					alert_error(e);
				}
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
		}
	});
});
// PROSES PDC PV DI TAKE OUT ------------------------------
/*------------------------------------------------- END PROSES PDC PV --------------------------------------------------*/
/*---------------------------------------------------- PROSES PRINT ----------------------------------------------------*/
$('#btn-print-pdc-rv').click(function(){
	var list_tbl = tabel_pdc_rv.data().length;
	console.log(list_tbl);

	var no_pdc = $('#inp-no-pdc-rv').val();
	var cabang = $('#slc-branch-pdc').val();

	if (list_tbl === 0) {
		alert_error("PDC Tidak Ditemukan.");
	}
	else if (no_pdc === '') {
		alert_error("No PDC Harus Di Isi Untuk Bisa Di Print.");
	}
	else{
		$.ajax({
			url : base_url + "Controller_pdc/validate_print",
			type : 'POST',
			dataType : 'JSON',
			data: {
				cabang,
				no_pdc
			},
			cache : false,
			success: function(response){
				console.log(response);
				if (response) {
					try{
						if (response['errorConsole']) {
							alert_error(response['errorConsole']);
						}
						else if (response['result'] !== '200') {
							alert_info(response['result']);
						}
						else if (response['result'] === '200') {
							alert_info("Please Ready to Print...?", function(){
								$.ajax({
									url : base_url + "Controller_pdc/print_pdc",
									type : 'POST',
									data : {
										cabang,
										no_pdc
									},
									cache : false,
									success : function(res){
										console.log(res);
										if (res) {
											var printWindow = window.open();
									        printWindow.document.write('<pre id = "printss"></pre>');
									        printWindow.document.querySelector('pre').innerHTML = res;
									        
									        printWindow.document.close();
									        printWindow.focus();
									        printWindow.print();
									        printWindow.close();
										}
										else{
											alert_error("Data Gagal Dicetak");
										}
									},
									error : function(res){
										//console.log(res);
									}
								});
							});
							//window.location.href = base_url + "Controller_pdc/print_pdc/" +no_pdc+ "/" +cabang;
						}
					}
					catch(e){
						$('#loading-ajax').hide();
						alert_error(e);
					}
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
			}
		});
	}
});
/*--------------------------------------------------END PROSES PRINT ---------------------------------------------------*/
/*------------------------------------------------------ FUNCTION ------------------------------------------------------*/
//FUNGSI UNTUK MENDAPATKAN CLASS CODE
function getClassCode(){
	$.ajax({
		url: base_url + "Controller_pdc/get_class_code",
		dataType: 'json',
		type: 'GET',
		cache: false,
		success: function(response){
			console.log(response);
			if (response) {
				try{
					if (response['data']) {
						$('#slc-class-code-rv').empty();
						$('<option/>').val('').html('-- Silahkan Pilih --').appendTo('#slc-class-code-rv').addClass('form-control');
						
						$.each(response['data'], function(i){
							$('#slc-class-code-rv').append('<option value="'+response['data'][i]['acct_interface_group']+'">'+response['data'][i]['acct_interface_group']+ ' - ' +response['data'][i]['acct_desc']+'</option>');
						});
					}
				}catch(e){
					$('#loading-ajax').hide();
					alert_error(e);
				}
			}
			else{
				alert_error("Cek Jaringan");
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
		}
	});
}

function get_bank_issued(cabang, index){
	$.ajax({
		url: base_url + "Controller_pdc/get_bank_branch",
		type: 'POST',
		dataType: 'json',
		data: {
			branch_code: cabang
		},
		cache: false,
		success: function(response){
			console.log(response);
			if (response) {
				try{
					var res = $.parseJSON(response);
					tabel_bank_issued.clear();
					var x = [];
					var accno = [];
					var bank_br = [];
					var bank_code = [];
					var bank_name = [];
					$('#hdn-modal-inkaso').val(index);
					//console.log(res['data']);
					if (res['data'].length !== 0 && res['status'] === true) {
						$('#modal-bank-issued').modal('show');

						$.each(res['data'], function(i){
							bank_br[i] = res['data'][i]['bankBr'];
							bank_code[i] = res['data'][i]['bankCode'];
							bank_name[i] = res['data'][i]['bankName'];
							if (accno[i] === null) {
								accno[i] = '';
							}
							else{
								accno[i] = res['data'][i]['accNo'];
							}
							if (bank_br[i] === null) {
								bank_br[i] = '';
							}else{
								bank_br[i] = res['data'][i]['bankBr'];
							}

							x.push([
								bank_code[i],
								bank_code[i]+ ' - ' +bank_name[i],
								bank_br[i]
								//accno[i]
							]);
						});
						tabel_bank_issued.rows.add(x).draw(false);
					}
					else if (res['status'] === false) {
						alert_error(res['data']);
					}
				}
				catch(e){
					$('#loading-ajax').hide();
					alert_error(e);
				}
			}
			else{
				alert_error("Cek Jaringan");
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
		}
	});
}

function get_bank_tujuan(){
	var branch_code = $('#slc-branch-pdc').val();
	$.ajax({
		url: base_url+"Controller_pdc/get_bank_tujuan",
		dataType: 'json',
		type: 'POST',
		data:{
			branch_code
		},
		cache: false,
		success: function(response){
			console.log(response);

			if (response) {
				try{
					$('#slc-bank-tujuan-appr').empty();

					if (response['status'] === false && response['data'] === 'Data Tidak Ditemukan') {
						$('<option/>').val('').html('Tidak Ada Bank Untuk Cabang Ini').appendTo('#slc-bank-tujuan-appr').addClass('form-control');
					}
					else if (response['status'] === true) {
						$('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#slc-bank-tujuan-appr').addClass('form-control');

						$.each(response['data'], function(i){
							var bank_code = response['data'][i]['bankCode'];
							var bank_name = response['data'][i]['bankName'];

							$('#slc-bank-tujuan-appr').append('<option value="'+bank_code+'">'+bank_code+ ' - ' +bank_name+'</option>');
						});
					}
					else{
						alert_error(response['data']);	
					}
				}
				catch(e){
					$('#loading-ajax').hide();
					alert_error(e);
				}
			}
			else{
				alert_error("Cek Jaringan");
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
		}
	});
}

function insert_pdc_rv(new_data){
	var cabang = $('#slc-branch-pdc').val();
	var pdc_no = $('#inp-no-pdc-rv').val();
	var pdc_due_date = $('#inp-due-date-pdc-rv').val();
	var pdc_cust_no = $('#inp-cust-no-rv').val();
	var pdc_amount = accounting.unformat($('#inp-total-amount-pdc').val());
	var bank_id = $('#inp-bank-issued-rv').val();
	var pdc_inkaso = $('#chk-inkaso-rv').val();
	var from_to = $('#inp-rec-from-rv').val();

	if ($('#chk-inkaso-rv').is(":checked")) {
		pdc_inkaso = 1;
	}
	else{
		pdc_inkaso = 0;
	}
	// console.log(pdc_inkaso);
	var bank_branch = $('#inp-bank-branch-rv').val();
	var cust_type = $('#inp-vendor-type-rv').val();

	$.ajax({
		url: base_url+"Controller_pdc/insert_pdc_rv",
		type: 'POST',
		dataType: 'json',
		data:{
			cabang : cabang,
			pdc_no : pdc_no,
			pdc_from_to : from_to,
			pdc_due_date : pdc_due_date,
			pdc_cust_no : pdc_cust_no,
			pdc_amount : pdc_amount,
			bank_id : bank_id,
			pdc_inkaso : pdc_inkaso,
			bank_branch : bank_branch,
			cust_type : cust_type,
			user_id : $('#hdn-user-nik-pdc').val(),
			data: new_data
		},
		cache: false,
		success: function(response){
			console.log(response);
			if (response) {
				try{
					if (response['errorConsole']) {
						alert_error(response['errorConsole']);
					}
					else if (response['errMessage']) {
						alert_error(response['errMessage']);
					}
					else if (response['result']) {
						alert_info(response['result'], function(){
							window.location.href = base_url + "Controller_pdc";
						});
					}
				}
				catch(e){
					$('#loading-ajax').hide();
					alert_error(e);
				}
			}
			else{
				alert_error("Cek Jaringan");
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
		}
	});
}

function cancel_pdc_rv(){
	$.ajax({
		url : base_url + "Controller_pdc/cancel_pdc_rv",
		type : 'POST',
		dataType : 'JSON',
		data : {
			cabang : $('#slc-branch-pdc').val(),
			no_pdc : $('#inp-no-pdc-rv').val(),
			user_id : $('#hdn-user-nik-pdc').val()
		},
		cache : false,
		success : function(response){
			console.log(response);
			if (response) {
				try{
					if (response['errorConsole']) {
						alert_error(response['errorConsole']);
					}
					else if (response['errMessage']) {
						alert_error(response['errMessage']);
					}
					else if (response['result']) {
						alert_info(response['result'], function(){
							window.location.href = base_url + "Controller_pdc";
						});
					}
				}
				catch(e){
					$('#loading-ajax').hide();
					alert_error(e);
				}
			}
			else{
				alert_error("Cek Jaringan");
			}
		},
		error : function(response){
			console.log(response);
			if (response['responseText'] === "" && response['statusText'] === 'OK') {
				alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
					localStorage.clear();
					window.location.href = base_url + "Controller_login/login_view";
				});
			}
		}
	});
}

function insert_pdc_send(new_data){
	var cabang = $('#slc-branch-pdc').val();
	$.ajax({
		url : base_url+"Controller_pdc/insert_pdc_send",
		type: 'POST',
		dataType: 'json',
		data : {
			branch : cabang,
			user_id : $('#hdn-user-nik-pdc').val(),
			list_pdc : new_data
		},
		cache : false,
		success : function(response){
			console.log(response);
			if (response) {
				try{
					if (response['errorConsole']) {
						alert_error(response['errorConsole']);
					}
					else if (response['errMessage']) {
						alert_error(response['errMessage']);
					}
					else if (response['result']) {
						alert_info(response['result'], function(){
							window.location.href = base_url + "Controller_pdc";
						});
					}
				}
				catch(e){
					$('#loading-ajax').hide();
					alert_error(e);
				}
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
		}
	});
}

function insert_pdc_journal(new_data){
	$.ajax({
		url : base_url+"Controller_pdc/insert_pdc_jurnal",
		dataType : 'json',
		type : 'POST',
		cache : false,
		data : {
			user_id : $('#hdn-user-nik-pdc').val(),
			branch : $('#slc-branch-pdc').val(),
			list_pdc : new_data
		},
		success: function(response){
			console.log(response);
			if (response) {
				try{
					if (response['errorConsole']) {
						alert_error(response['errorConsole']);
					}
					else if (response['errMessage']) {
						alert_error(response['errMessage']);
					}
					else if (response['result']) {
						alert_info(response['result'], function(){
							window.location.href = base_url + "Controller_pdc";
						});
					}
				}
				catch(e){
					$('#loading-ajax').hide();
					alert_error(e);
				}
			}
			else{
				alert_error("Cek Jaringan");
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
		}
	});
}

//function get data by class code
function get_by_class_code(){
	var no_kontrak = $('#slc-no-kontrak-rv').val();
	var class_code = $('#slc-class-code-rv').val();
	var cabang = $('#slc-branch-pdc').val();
	var due_date = $('#inp-due-date-pdc-rv').val();
	
	//var tbl_pdc = tabel_pdc_rv.data().toArray;
	//console.log(tbl_pdc);
	//var length_tbl = tbl_pdc.length;
	var length_tbl = tabel_pdc_rv.data().length;
	console.log(length_tbl);

	var tes_tbl = tabel_pdc_rv.data();
	console.log(tes_tbl);

	$.ajax({
		url: base_url+"Controller_pdc/get_by_class_code",
		dataType: 'JSON',
		type: 'POST',
		data:{
			no_kontrak,
			class_code,
			cabang,
			due_date
		},
		cache: false,
		success: function(response){
			console.log(response);
			if (response) {
				try{
					var res_data_angs = response['data_angs'];
					var res_data_lain = response['data_lain']; 

					//tabel_pdc_rv.clear().draw();

					if (response['data_angs']) {
						if (response['data_angs'].errorConsole) {
							alert_error(response['data_angs']['errorConsole']);
						}
						else if (response['data_angs']['list_angs'].length === 0) {
							alert_info("Tidak Ada Angsuran yg Bisa Dibayar");
						}
						else if (response['data_angs']['errMessage'] !== null) {
							alert_error(response['data_angs']['errMessage']);
						}
						else{
							var class_code_flag = [];
							inst_type = response['data_angs']['inst_type'];

							$('#inp-total-pinalty-pdc').val(accounting.formatMoney(response['data_angs']['tot_pinalty'], '', 2, ',', '.'));
							$.each(response['data_angs']['list_angs'], function(i){
								cek = response['data_angs']['list_angs'][i]['acct_interface_group'];
								cek_contract = response['data_angs']['list_angs'][i]['contract_no'];
								cek_class_code.push({
									cek,
									cek_contract
								});

								tabel_pdc_rv.row.add([
									'<center><input type="checkbox" class="check-pdc-rv" id="chk-tabel-pdc-rv'+length_tbl+'"></center>',
									this['contract_no'],
									this['acct_interface_group']+ ' - ' +this['acct_brief_desc'],
									'<input type="text" class="form-control" id="inp-install-no'+length_tbl+'" value="'+this['installment_no']+'" disabled>',
									this['portfolio_code'],
									'<input type="text" class="form-control" id="inp-remark-pdc'+length_tbl+'" value="'+this['acct_desc']+'" >',
									'<input type="text" class="form-control" id="inp-amt-due'+length_tbl+'" value="'+accounting.formatMoney(this['amount_due'], '', 2, ',', '.')+'" disabled="" >',
									'<input type="text" class="form-control amount-pdc inp-number" id="inp-amount-pdc'+length_tbl+'" value="'+accounting.formatMoney(this['amount_paid'], '', 2, ',', '.')+'">',
									this['installment_date']
								]).draw(false);
								if (response['data_angs']['list_angs'][i]['acct_interface_group'] === 'T-ANGS' && response['data_angs']['inst_type'] !== '03') {
									$('#inp-amount-pdc'+length_tbl).prop('disabled', true);
								}
								else{
									$('#inp-amount-pdc'+length_tbl).prop('disabled', false);	
								}
								length_tbl++;
							});

							//Edit by Adit
							/*$.each(response['data_angs']['list_denda'], function(i){
								console.log(response['data_angs']['list_denda']);
								var class_code_denda = response['data_angs']['list_denda'];

								

								cek = response['data_angs']['list_denda'][i]['acct_interface_group'];
								cek_contract = response['data_angs']['list_denda'][i]['contract_no'];
								cek_class_code.push({
									cek,
									cek_contract
								});

								if (this['amount_due'] <= 0) {

								}
								else{
									if (tes_tbl.length != 0) {
										console.log('ada');
										for (var j = 0; j < tes_tbl.length; j++) {
											var class_code = class_code_denda[i]['acct_interface_group'];
											var class_code_exist = tes_tbl[j][2];
											var kontrak = class_code_denda[i]['contract_no'];
											var kontrak_exist = tes_tbl[j][1];
											if (class_code_exist != class_code && kontrak_exist != kontrak) {
												tabel_pdc_rv.row.add([
													'<center><input type="checkbox" class="check-pdc-rv" id="chk-tabel-pdc-rv'+length_tbl+'"></center>',
													this['contract_no'],
													this['acct_interface_group']+ ' - ' +this['acct_brief_desc'],
													'<input type="text" class="form-control" id="inp-install-no'+length_tbl+'" value="'+this['installment_no']+'" disabled>',
													this['portfolio_code'],
													'<input type="text" class="form-control" id="inp-remark-pdc'+length_tbl+'" value="'+this['acct_desc']+'" >',
													'<input type="text" class="form-control" id="inp-amt-due'+length_tbl+'" value="'+accounting.formatMoney(this['amount_due'], '', 2, ',', '.')+'" disabled="" >',
													'<input type="text" class="form-control amount-pdc inp-number" id="inp-amount-pdc'+length_tbl+'" value="'+accounting.formatMoney(this['amount_paid'], '', 2, ',', '.')+'">',
													this['installment_date']
												]).draw(false);
												length_tbl++;
												break;
											}	
										}
									} else {
										console.log('tidak');
										tabel_pdc_rv.row.add([
											'<center><input type="checkbox" class="check-pdc-rv" id="chk-tabel-pdc-rv'+length_tbl+'"></center>',
											this['contract_no'],
											this['acct_interface_group']+ ' - ' +this['acct_brief_desc'],
											'<input type="text" class="form-control" id="inp-install-no'+length_tbl+'" value="'+this['installment_no']+'" disabled>',
											this['portfolio_code'],
											'<input type="text" class="form-control" id="inp-remark-pdc'+length_tbl+'" value="'+this['acct_desc']+'" >',
											'<input type="text" class="form-control" id="inp-amt-due'+length_tbl+'" value="'+accounting.formatMoney(this['amount_due'], '', 2, ',', '.')+'" disabled="" >',
											'<input type="text" class="form-control amount-pdc inp-number" id="inp-amount-pdc'+length_tbl+'" value="'+accounting.formatMoney(this['amount_paid'], '', 2, ',', '.')+'">',
											this['installment_date']
										]).draw(false);
										length_tbl++;
									}									
								}
							});*/
						}
					}
					
					else if (response['data_lain']) {
						if (response['data_lain'].errorConsole) {
							alert_error(response['data_lain']['errorConsole']);
						}
						else if (response['data_lain']['data'].length === 0) {
							if (class_code === 'T-DENDA') {
								alert_info("Tidak Ada Denda yg Harus Dibayar.");
							}
							else{
								alert_info("Tidak Ada Data yg Ditemukan.");
							}
						}
						else{
							inst_type = response['data_lain']['inst_type'];
							$('#inp-total-pinalty-pdc').val(accounting.formatMoney(response['data_lain']['tot_pin'], '', 2, ',', '.'));
							$.each(response['data_lain']['data'], function(i){

								if (this['acct_interface_group'] === 'T-DENDA' && this['amount_due'] <= 0) {
									alert_info("Tidak Ada Denda yg Harus Dibayar.");
								}
								else{
									cek = response['data_lain']['data'][i]['acct_interface_group'];
									cek_contract = response['data_lain']['data'][i]['contract_no'];
									cek_class_code.push({
										cek,
										cek_contract
									});
									tabel_pdc_rv.row.add([
										'<center><input type="checkbox" class="check-pdc-rv" id="chk-tabel-pdc-rv'+length_tbl+'"></center>',
										this['contract_no'],
										this['acct_interface_group']+ ' - ' +this['acct_desc'],
										'<input type="text" class="form-control" id="inp-install-no'+length_tbl+'" value="'+this['installment_no']+'" disabled>',
										this['portfolio_code'],
										'<input type="text" class="form-control" id="inp-remark-pdc'+length_tbl+'" value="'+this['acct_brief_desc']+'" >',
										'<input type="text" class="form-control" id="inp-amt-due'+length_tbl+'" value="'+accounting.formatMoney(this['amount_due'], '', 2, ',', '.')+'" disabled="" >',
										'<input type="text" class="form-control amount-pdc inp-number" id="inp-amount-pdc'+length_tbl+'" value="'+accounting.formatMoney(this['amount_paid'], '', 2, ',', '.')+'">',
										this['installment_date']
									]).draw(false);
									length_tbl++;
								}
							});
						}
					}
				}
				catch(e){
					$('#loading-ajax').hide();
					alert_error(e); 
				}
			}
			else{
				alert_error("Cek Jaringan");
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
		}
	});
}
/*---------------------------------------------------- END FUNCTION ----------------------------------------------------*/