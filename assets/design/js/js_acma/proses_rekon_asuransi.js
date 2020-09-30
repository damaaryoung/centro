//===========================================START AUTHOR: 15997085==========================================\\
var tabel_view_pra = $('#tabel-view-pra').DataTable({
    "columnDefs": [
        {
            "targets": [2,5,6,10,11,12,13,14,15,16,17,18,19],
            "visible": false,
            "responsive": true,   
            "searchable" : false    
        },
    ],
    "order":[[20,"asc"]]
});

var tabel_data_cabang = $('#tabel-data-cabang').DataTable({
    "paging":   false,
    "ordering": false,
    "searching": false,
    "info" : false
});

var tabel_perusahaan_pra = $('#tabel-perusahaan-pra').DataTable({
    "order": [[ 1, "asc" ]]
});
var tabel_area_pra = $('#tabel-area-pra').DataTable({
    "order": [[ 1, "asc" ]]
});
var tabel_cabang_pra = $('#tabel-cabang-pra').DataTable({
    "order": [[ 1, "asc" ]]
});
var tabel_reconsile_pra = $('#tabel-reconsile-pra').DataTable({
    "order": [[ 0, "asc" ]],
    "columnDefs":[
        {
            "targets": [4],
            "visible": false,
            "responsive": true,
            "searchable": false
        },
    ]
});

var no_reconsile_generate = '';
var arr_tbl = "";
var arr_branch = [];
var check_length_all_data;
var total_nilai_order = [];
var total_nilai_rekon = [];

$('#btn-export-pra').prop('disabled', true);
$('#btn-simpan-pra').prop('disabled', true);
$('#btn-konfirmasi-pra').prop('disabled', true);
$('#btn-cancel-pra').prop('disabled', true);
$('#inp-no-reconsile-pra').prop('disabled', true);
$('#btn-no-reconsile-pra').prop('disabled', true);
$('#slc-tipe-asuransi-pra').prop('disabled', true);
$('#inp-perusahaan-2-pra').prop('disabled', true);
$('#btn-search-perusahaan-pra').prop('disabled', true);
$('#tgl-awal-periode-pra').prop('disabled', true);
$('#tgl-akhir-periode-pra').prop('disabled', true);
$('#inp-area-2-pra').prop('disabled', true);
$('#btn-search-area-pra').prop('disabled', true);
$('#inp-cabang-2-pra').prop('disabled', true);
$('#btn-search-cabang-pra').prop('disabled', true);
$('#btn-search-pra').prop('disabled', true);
$('#chk-all-tabel-pra').prop('checked', false);
$('#chk-all-tabel-pra').prop('disabled', false);

//==============================================TANGGAL PERIODE==============================================\\

$('#tgl-awal-periode-pra').datetimepicker({
    format: 'DD-MMM-YYYY',
    maxDate : new Date(),
    allowInputToggle: true
}).on("dp.change", function(e){
    var date = e.date;
    var d_date = date._d;
    var new_date = new Date(d_date);
    new_date.setDate(new_date.getDate() + 30);

    $('#tgl-akhir-periode-pra').data("DateTimePicker").minDate(d_date);
    
    if (new_date > new Date(today)) {
        new_date = new Date(today);
    }
    
    $('#tgl-akhir-periode-pra').data("DateTimePicker").maxDate(new_date);
    $('#tgl-akhir-periode-pra').data("DateTimePicker").date(new_date);
});

$('#tgl-akhir-periode-pra').datetimepicker({
    format: 'DD-MMM-YYYY',
    maxDate : new Date(),
    allowInputToggle: true
});

//===========================================================================================================\\
//==================================================ROLE=====================================================\\
var branch_id = $('#branch-id-pra').val();
var role_user_pras;
var flag_role_pras = false;

if (branch_id !== '0000') {
    alert_info('Proses Rekon Asuransi hanya bisa di akses oleh Insurance HO');
    $('#radio-new-recon').prop('disabled', true);
    $('#radio-search-recon').prop('disabled', true);
}else if (branch_id === '0000') {
    if (!localStorage.getItem('role_user_pras')) {
        $.ajax({
            url : "Controller_home/get_detail_user",
            cache : false,
            async : false,
            success : function(response){
                if(response){
                    try{
                        console.log(response);
                        localStorage.setItem('role_user_pras', response);
                        role_user_pras = $.parseJSON(localStorage.getItem('role_user_pras'));
                        console.log(role_user_pras);
                    }catch(e){
                        console.log(e);
                        $('#loading-ajax').hide();
                        alert_error("Terjadi kesalahan error => "+e);
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
                    alert_error('Gagal Terhubung ke Server: ' + response['responseText']);
                }
            }
        });
    }else{
        role_user_pras = $.parseJSON(localStorage.getItem('role_user_pras'));
        console.log(role_user_pras);
    }

    $.each(role_user_pras, function(i){
        console.log(role_user_pras[i]['role_code']);
        if (role_user_pras[i]['role_code'] === 'REKAS') {
            flag_role_pras = true;
        }
    });
    if (flag_role_pras === false) {
        alert_info('Proses Rekon Asuransi hanya bisa di akses oleh Insurance HO');
        $('#radio-new-recon').prop('disabled', true);
        $('#radio-search-recon').prop('disabled', true);
    }
}

//===========================================================================================================\\
//==================================================RADIO BUTTON=============================================\\
$('#radio-new-recon').click(function(){
    $('#inp-no-reconsile-pra').val("");
    $('#inp-no-reconsile-2-pra').val("");
    $('#slc-tipe-asuransi-pra').val("");
    $('#inp-perusahaan-pra').val("");
    $('#inp-perusahaan-2-pra').val("");
    $('#inp-perusahaan-3-pra').val("");
    $('#tgl-awal-periode-pra').data("DateTimePicker").clear();
    $('#tgl-akhir-periode-pra').data("DateTimePicker").clear();
    $('#inp-area-pra').val("");
    $('#inp-area-2-pra').val("");
    $('#inp-cabang-pra').val("");
    $('#inp-cabang-2-pra').val("");
    $('#inp-status-rec-pra').val("");
    $('#inp-send-kontrak-pra').val("");
    $('#inp-kontrak-sukses-pra').val("");
    $('#inp-kontrak-gagal-pra').val("");
    $('#inp-tgl-rec-pra').val("");
    $('#inp-tgl-conf-pra').val("");
    $('#inp-user-pra').val("");
    $('#inp-no-reconsile-pra').prop('disabled', true);
    $('#btn-no-reconsile-pra').prop('disabled', true);
    $('#slc-tipe-asuransi-pra').prop('disabled', false);
    $('#inp-perusahaan-2-pra').prop('disabled', false);
    $('#btn-search-perusahaan-pra').prop('disabled', false);
    $('#tgl-awal-periode-pra').prop('disabled', false);
    $('#tgl-akhir-periode-pra').prop('disabled', false);
    $('#inp-area-2-pra').prop('disabled', false);
    $('#btn-search-area-pra').prop('disabled', false);
    $('#inp-cabang-2-pra').prop('disabled', false);
    $('#btn-search-cabang-pra').prop('disabled', false);
    $('#btn-search-pra').prop('disabled', false);
    $('#btn-export-pra').prop('disabled', true);
    $('#btn-simpan-pra').prop('disabled', true);
    $('#btn-konfirmasi-pra').prop('disabled', true);
    $('#btn-cancel-pra').prop('disabled', true);
    $('#chk-all-tabel-pra').prop('checked', false);
    $('#chk-all-tabel-pra').prop('disabled', false);
    $('#inp-total-order-amt-pra').val("");
    $('#inp-total-rekon-amt-pra').val("");
    tabel_view_pra.clear().draw();
});
$('#radio-search-recon').click(function(){
    $('#inp-no-reconsile-pra').val("");
    $('#inp-no-reconsile-2-pra').val("");
    $('#slc-tipe-asuransi-pra').val("");
    $('#inp-perusahaan-pra').val("");
    $('#inp-perusahaan-2-pra').val("");
    $('#inp-perusahaan-3-pra').val("");
    $('#tgl-awal-periode-pra').data("DateTimePicker").clear();
    $('#tgl-akhir-periode-pra').data("DateTimePicker").clear();
    $('#inp-area-pra').val("");
    $('#inp-area-2-pra').val("");
    $('#inp-cabang-pra').val("");
    $('#inp-cabang-2-pra').val("");
    $('#inp-status-rec-pra').val("");
    $('#inp-send-kontrak-pra').val("");
    $('#inp-kontrak-sukses-pra').val("");
    $('#inp-kontrak-gagal-pra').val("");
    $('#inp-tgl-rec-pra').val("");
    $('#inp-tgl-conf-pra').val("");
    $('#inp-user-pra').val("");
    $('#inp-no-reconsile-pra').prop('disabled', false);
    $('#btn-no-reconsile-pra').prop('disabled', false);
    $('#slc-tipe-asuransi-pra').prop('disabled', true);
    $('#inp-perusahaan-2-pra').prop('disabled', true);
    $('#btn-search-perusahaan-pra').prop('disabled', true);
    $('#tgl-awal-periode-pra').prop('disabled', true);
    $('#tgl-akhir-periode-pra').prop('disabled', true);
    $('#inp-area-2-pra').prop('disabled', true);
    $('#btn-search-area-pra').prop('disabled', true);
    $('#inp-cabang-2-pra').prop('disabled', true);
    $('#btn-search-cabang-pra').prop('disabled', true);
    $('#btn-search-pra').prop('disabled', true);
    $('#btn-export-pra').prop('disabled', true);
    $('#btn-simpan-pra').prop('disabled', true);
    $('#btn-konfirmasi-pra').prop('disabled', true);
    $('#btn-cancel-pra').prop('disabled', true);
    $('#chk-all-tabel-pra').prop('checked', false);
    $('#chk-all-tabel-pra').prop('disabled', false);
    $('#inp-total-order-amt-pra').val("");
    $('#inp-total-rekon-amt-pra').val("");
    $('#div-tipe-asuransi-pra').removeClass('has-error');
    $('#tgl-awal-periode-pra').removeClass('has-error');
    $('#tgl-akhir-periode-pra').removeClass('has-error');
    tabel_view_pra.clear().draw();
});
//===========================================================================================================\\
//==================================DROPDOWN LIST TIPE PERUSAHAAN ASURANSI===================================\\
$('#slc-tipe-asuransi-pra').change(function(){
    $('#inp-perusahaan-pra').val("");
    $('#inp-perusahaan-2-pra').val("");
    $('#tgl-awal-periode-pra').data("DateTimePicker").clear();
    $('#tgl-akhir-periode-pra').data("DateTimePicker").clear();
    $('#inp-area-pra').val("");
    $('#inp-area-2-pra').val("");
    $('#inp-cabang-pra').val("");
    $('#inp-cabang-2-pra').val("");
    tabel_view_pra.clear().draw();
    $('#inp-total-order-amt-pra').val("");
    $('#inp-total-rekon-amt-pra').val("");
    $('#chk-all-tabel-pra').prop('checked', false);
    $('#chk-all-tabel-pra').prop('disabled', false);
    $('#btn-export-pra').prop('disabled', true);
    $('#btn-simpan-pra').prop('disabled', true);
    $('#btn-konfirmasi-pra').prop('disabled', true);
    $('#btn-cancel-pra').prop('disabled', true);
});
//===========================================================================================================\\
//=====================================BUTTON SEARCH PERUSAHAAN ASURANSI=====================================\\
$('#btn-search-perusahaan-pra').click(function() {
    if (check_session() === 'true') {
        $('#tgl-awal-periode-pra').data("DateTimePicker").clear();
        $('#tgl-akhir-periode-pra').data("DateTimePicker").clear();
        $('#inp-area-pra').val("");
        $('#inp-area-2-pra').val("");
        $('#inp-cabang-pra').val("");
        $('#inp-cabang-2-pra').val("");
        tabel_view_pra.clear().draw();
        $('#inp-total-order-amt-pra').val("");
        $('#inp-total-rekon-amt-pra').val("");
        $('#chk-all-tabel-pra').prop('checked', false);
        $('#chk-all-tabel-pra').prop('disabled', false);
        $('#btn-export-pra').prop('disabled', true);
        $('#btn-simpan-pra').prop('disabled', true);
        $('#btn-konfirmasi-pra').prop('disabled', true);
        $('#btn-cancel-pra').prop('disabled', true);

        var tipe_asuransi = $('#slc-tipe-asuransi-pra option:selected').val();

        if (tipe_asuransi === '') {
            alert_warning("Pilih Tipe Asuransi Terlebih Dahulu");
            $('#div-tipe-asuransi-pra').addClass('has-error');
        }else if (tipe_asuransi === 'CP'){
            get_list_perusahaan_cp();
            $('#modal-search-perushaan-pra').modal('show'); 
        }else if (tipe_asuransi === 'MV'){  
            get_list_perusahaan();
            $('#modal-search-perushaan-pra').modal('show');
        }else{
            get_list_perusahaan_pa();
            $('#modal-search-perushaan-pra').modal('show');
        }
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

$('#inp-perusahaan-2-pra').click(function() {
    if (check_session() === 'true') {
        $('#tgl-awal-periode-pra').data("DateTimePicker").clear();
        $('#tgl-akhir-periode-pra').data("DateTimePicker").clear();
        $('#inp-area-pra').val("");
        $('#inp-area-2-pra').val("");
        $('#inp-cabang-pra').val("");
        $('#inp-cabang-2-pra').val("");
        tabel_view_pra.clear().draw();
        $('#inp-total-order-amt-pra').val("");
        $('#inp-total-rekon-amt-pra').val("");
        $('#chk-all-tabel-pra').prop('checked', false);
        $('#chk-all-tabel-pra').prop('disabled', false);
        $('#btn-export-pra').prop('disabled', true);
        $('#btn-simpan-pra').prop('disabled', true);
        $('#btn-konfirmasi-pra').prop('disabled', true);
        $('#btn-cancel-pra').prop('disabled', true);

        var tipe_asuransi = $('#slc-tipe-asuransi-pra option:selected').val();

        if (tipe_asuransi === '') {
            alert_warning("Pilih Tipe Asuransi Terlebih Dahulu");
            $('#div-tipe-asuransi-pra').addClass('has-error');
        }else if (tipe_asuransi === 'CP'){
            get_list_perusahaan_cp();
            $('#modal-search-perushaan-pra').modal('show'); 
        }else if (tipe_asuransi === 'MV'){  
            get_list_perusahaan();
            $('#modal-search-perushaan-pra').modal('show');
        }else{
            get_list_perusahaan_pa();
            $('#modal-search-perushaan-pra').modal('show');
        }
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

$('#tabel-perusahaan-pra tbody').on('mouseover', 'tr', function() {
    $(this).addClass('pointer');

    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    }else{
        tabel_perusahaan_pra.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        arr_tbl = tabel_perusahaan_pra.row(this).data();
    }
});

$('#tabel-perusahaan-pra tbody').on('click', 'tr', function() {
    $('#inp-perusahaan-pra').val(arr_tbl[0]);
    $('#inp-perusahaan-2-pra').val(arr_tbl[0]+' - '+arr_tbl[1]);
    $('#modal-search-perushaan-pra').modal('hide');
});

//===========================================================================================================\\
//=============================================BUTTON SEARCH AREA============================================\\

$('#btn-search-area-pra').click(function(){
    if (check_session() === 'true') {
        $('#inp-cabang-pra').val("");
        $('#inp-cabang-2-pra').val("");
        tabel_view_pra.clear().draw();
        $('#inp-total-order-amt-pra').val("");
        $('#inp-total-rekon-amt-pra').val("");
        $('#chk-all-tabel-pra').prop('checked', false);
        $('#chk-all-tabel-pra').prop('disabled', false);
        $('#btn-export-pra').prop('disabled', true);
        $('#btn-simpan-pra').prop('disabled', true);
        $('#btn-konfirmasi-pra').prop('disabled', true);
        $('#btn-cancel-pra').prop('disabled', true);
        var perusahaan = $('#inp-perusahaan-pra').val();
        var tgl_awal = $('#tgl-awal-periode-pra').val();
        var tgl_akhir = $('#tgl-akhir-periode-pra').val();
        var area_1 = $('#inp-area-pra').val();
        var area_2 = $('#inp-area-2-pra').val();
        var tipe_asuransi = $('#slc-tipe-asuransi-pra option:selected').val();
        
        if (tipe_asuransi === '') {
            alert_warning("Pilih Tipe Asuransi Terlebih Dahulu");
            $('#div-tipe-asuransi-pra').addClass('has-error');
        }else if (perusahaan === '') {
            alert_warning("Pilih Perusahaan Asuransi Terlebih Dahulu");
        }else if (tgl_awal === '' || tgl_akhir === '') {
            alert_warning("Input Periode Tanggal Terlebih Dahulu");
            $('#div-tgl-awal-periode-pra').addClass('has-error');
            $('#div-tgl-akhir-periode-pra').addClass('has-error');
        }else{
            get_list_area();
            $('#modal-search-area-pra').modal('show');
        }

        if (area_1 !== '' && area_2 !== '') {
            $('#inp-cabang-pra').val("");
            $('#inp-cabang-2-pra').val("");
        }
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

$('#inp-area-2-pra').click(function(){
    if (check_session() === 'true') {
        $('#inp-cabang-pra').val("");
        $('#inp-cabang-2-pra').val("");
        tabel_view_pra.clear().draw();
        $('#inp-total-order-amt-pra').val("");
        $('#inp-total-rekon-amt-pra').val("");
        $('#chk-all-tabel-pra').prop('checked', false);
        $('#chk-all-tabel-pra').prop('disabled', false);
        $('#btn-export-pra').prop('disabled', true);
        $('#btn-simpan-pra').prop('disabled', true);
        $('#btn-konfirmasi-pra').prop('disabled', true);
        $('#btn-cancel-pra').prop('disabled', true);
        var perusahaan = $('#inp-perusahaan-pra').val();
        var tgl_awal = $('#tgl-awal-periode-pra').val();
        var tgl_akhir = $('#tgl-akhir-periode-pra').val();
        var area_1 = $('#inp-area-pra').val();
        var area_2 = $('#inp-area-2-pra').val();
        var tipe_asuransi = $('#slc-tipe-asuransi-pra option:selected').val();
        
        if (tipe_asuransi === '') {
            alert_warning("Pilih Tipe Asuransi Terlebih Dahulu");
            $('#div-tipe-asuransi-pra').addClass('has-error');
        }else if (perusahaan === '') {
            alert_warning("Pilih Perusahaan Asuransi Terlebih Dahulu");
        }else if (tgl_awal === '' || tgl_akhir === '') {
            alert_warning("Input Periode Tanggal Terlebih Dahulu");
            $('#div-tgl-awal-periode-pra').addClass('has-error');
            $('#div-tgl-akhir-periode-pra').addClass('has-error');
        }else{
            get_list_area();
            $('#modal-search-area-pra').modal('show');
        }

        if (area_1 !== '' && area_2 !== '') {
            $('#inp-cabang-pra').val("");
            $('#inp-cabang-2-pra').val("");
        }
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

$('#tabel-area-pra tbody').on('mouseover', 'tr', function() {
    $(this).addClass('pointer');

    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    }else{
        tabel_area_pra.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        arr_tbl = tabel_area_pra.row(this).data();
    }
});

$('#tabel-area-pra tbody').on('click', 'tr', function() {
    $('#inp-area-pra').val(arr_tbl[0]);
    $('#inp-area-2-pra').val(arr_tbl[0]+' - '+arr_tbl[1]);
    $('#modal-search-area-pra').modal('hide');
});

//===========================================================================================================\\
//============================================BUTTON SEARCH CABANG===========================================\\

$('#btn-search-cabang-pra').click(function(){
    if (check_session() === 'true') {
        tabel_view_pra.clear().draw();
        $('#inp-total-order-amt-pra').val("");
        $('#inp-total-rekon-amt-pra').val("");
        $('#chk-all-tabel-pra').prop('checked', false);
        $('#chk-all-tabel-pra').prop('disabled', false);
        $('#btn-export-pra').prop('disabled', true);
        $('#btn-simpan-pra').prop('disabled', true);
        $('#btn-konfirmasi-pra').prop('disabled', true);
        $('#btn-cancel-pra').prop('disabled', true);
        var area = $('#inp-area-pra').val();
        var perusahaan = $('#inp-perusahaan-pra').val();
        var tgl_awal = $('#tgl-awal-periode-pra').val();
        var tgl_akhir = $('#tgl-akhir-periode-pra').val();
        var tipe_asuransi = $('#slc-tipe-asuransi-pra option:selected').val();
        
        if (tipe_asuransi === '') {
            alert_warning("Pilih Tipe Asuransi Terlebih Dahulu");
            $('#div-tipe-asuransi-pra').addClass('has-error');
        }else if (perusahaan === '') {
            alert_warning("Pilih Perusahaan Asuransi Terlebih Dahulu");
        }else if (tgl_awal === '' || tgl_akhir === '') {
            alert_warning("Input Periode Tanggal Terlebih Dahulu");
            $('#div-tgl-awal-periode-pra').addClass('has-error');
            $('#div-tgl-akhir-periode-pra').addClass('has-error');
        }else if (area === '') {
            alert_warning("Pilih Area Terlebih Dahulu");
        }else {
            get_list_cabang_by_area();
            $('#modal-search-cabang-pra').modal('show');
        }
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

$('#inp-cabang-2-pra').click(function(){
    if (check_session() === 'true') {
        tabel_view_pra.clear().draw();
        $('#inp-total-order-amt-pra').val("");
        $('#inp-total-rekon-amt-pra').val("");
        $('#chk-all-tabel-pra').prop('checked', false);
        $('#chk-all-tabel-pra').prop('disabled', false);
        $('#btn-export-pra').prop('disabled', true);
        $('#btn-simpan-pra').prop('disabled', true);
        $('#btn-konfirmasi-pra').prop('disabled', true);
        $('#btn-cancel-pra').prop('disabled', true);
        var area = $('#inp-area-pra').val();
        var perusahaan = $('#inp-perusahaan-pra').val();
        var tgl_awal = $('#tgl-awal-periode-pra').val();
        var tgl_akhir = $('#tgl-akhir-periode-pra').val();
        var tipe_asuransi = $('#slc-tipe-asuransi-pra option:selected').val();
        
        if (tipe_asuransi === '') {
            alert_warning("Pilih Tipe Asuransi Terlebih Dahulu");
            $('#div-tipe-asuransi-pra').addClass('has-error');
        }else if (perusahaan === '') {
            alert_warning("Pilih Perusahaan Asuransi Terlebih Dahulu");
        }else if (tgl_awal === '' || tgl_akhir === '') {
            alert_warning("Input Periode Tanggal Terlebih Dahulu");
            $('#div-tgl-awal-periode-pra').addClass('has-error');
            $('#div-tgl-akhir-periode-pra').addClass('has-error');
        }else if (area === '') {
            alert_warning("Pilih Area Terlebih Dahulu");
        }else {
            get_list_cabang_by_area();
            $('#modal-search-cabang-pra').modal('show');
        }
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

$('#tabel-cabang-pra tbody').on('mouseover', 'tr', function() {
    $(this).addClass('pointer');
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    } else {
        tabel_cabang_pra.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        arr_tbl = tabel_cabang_pra.row(this).data();
    }
});

$('#tabel-cabang-pra tbody').on('click', 'tr', function() {
    $('#inp-cabang-pra').val(arr_tbl[0]);
    $('#inp-cabang-2-pra').val(arr_tbl[0]+' - '+arr_tbl[1]);
    $('#modal-search-cabang-pra').modal('hide');
});

//===========================================================================================================\\
//==========================================BUTTON SEARCH RECONSILE==========================================\\

$('#btn-no-reconsile-pra').click(function(){
    if (check_session() === 'true') {
        $('#inp-no-reconsile-pra').val("");
        $('#inp-no-reconsile-2-pra').val("");
        $('#inp-status-rec-pra').val("");
        $('#inp-send-kontrak-pra').val("");
        $('#inp-kontrak-sukses-pra').val("");
        $('#inp-kontrak-gagal-pra').val("");
        $('#inp-tgl-rec-pra').val("");
        $('#inp-user-pra').val("");
        $('#slc-tipe-asuransi-pra').val("");
        $('#inp-perusahaan-pra').val("");
        $('#inp-perusahaan-2-pra').val("");
        $('#tgl-awal-periode-pra').data("DateTimePicker").clear();
        $('#tgl-akhir-periode-pra').data("DateTimePicker").clear();
        $('#inp-area-pra').val("");
        $('#inp-area-2-pra').val("");
        $('#inp-cabang-pra').val("");
        $('#inp-cabang-2-pra').val("");
        tabel_view_pra.clear().draw();
        $('#inp-total-order-amt-pra').val("");
        $('#inp-total-rekon-amt-pra').val("");
        $('#btn-export-pra').prop('disabled',true);
        $('#btn-simpan-pra').prop('disabled', true);
        $('#btn-konfirmasi-pra').prop('disabled', true);
        $('#btn-cancel-pra').prop('disabled', true);

        get_list_no_reconsile();
        $('#modal-search-reconsile-pra').modal('show');
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
$('#inp-no-reconsile-pra').click(function(){
    if (check_session() === 'true') {
        $('#inp-no-reconsile-pra').val("");
        $('#inp-no-reconsile-2-pra').val("");
        $('#inp-status-rec-pra').val("");
        $('#inp-send-kontrak-pra').val("");
        $('#inp-kontrak-sukses-pra').val("");
        $('#inp-kontrak-gagal-pra').val("");
        $('#inp-tgl-rec-pra').val("");
        $('#inp-user-pra').val("");
        $('#slc-tipe-asuransi-pra').val("");
        $('#inp-perusahaan-pra').val("");
        $('#inp-perusahaan-2-pra').val("");
        $('#tgl-awal-periode-pra').data("DateTimePicker").clear();
        $('#tgl-akhir-periode-pra').data("DateTimePicker").clear();
        $('#inp-area-pra').val("");
        $('#inp-area-2-pra').val("");
        $('#inp-cabang-pra').val("");
        $('#inp-cabang-2-pra').val("");
        tabel_view_pra.clear().draw();
        $('#inp-total-order-amt-pra').val("");
        $('#inp-total-rekon-amt-pra').val("");
        $('#btn-export-pra').prop('disabled',true);
        $('#btn-simpan-pra').prop('disabled', true);
        $('#btn-konfirmasi-pra').prop('disabled', true);
        $('#btn-cancel-pra').prop('disabled', true);

        get_list_no_reconsile();
        $('#modal-search-reconsile-pra').modal('show');        
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

$('#tabel-reconsile-pra tbody').on('mouseover', 'tr', function() {
    $(this).addClass('pointer');
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    } else {
        tabel_reconsile_pra.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        arr_tbl = tabel_reconsile_pra.row(this).data();
    }
});

$('#tabel-reconsile-pra tbody').on('click', 'tr', function() {
    var get_data = tabel_reconsile_pra.rows(this).data();
    var rec_no = get_data[0][0];

    get_view_saved_data(rec_no);

    $('#chk-all-tabel-pra').prop('checked', true);
    $('#chk-all-tabel-pra').prop('disabled', true);
    $('#modal-search-reconsile-pra').modal('hide');
});

//===========================================================================================================\\
//==============================================BUTTON CARI DATA=============================================\\

$('#btn-search-pra').click(function(){
    if (check_session() === 'true') {
        var cabang = $('#inp-cabang-pra').val();
        var area = $('#inp-area-pra').val();
        var perusahaan = $('#inp-perusahaan-pra').val();
        var tgl_awal = $('#tgl-awal-periode-pra').val();
        var tgl_akhir = $('#tgl-akhir-periode-pra').val();
        var tipe_asuransi = $('#slc-tipe-asuransi-pra option:selected').val();
        
        if (tipe_asuransi === '') {
            alert_warning("Pilih Tipe Asuransi Terlebih Dahulu");
            $('#div-tipe-asuransi-pra').addClass('has-error');
        }else if (perusahaan === '') {
            alert_warning("Pilih Perusahaan Asuransi Terlebih Dahulu");
        }else if (tgl_awal === '' || tgl_akhir === '') {
            alert_warning("Input Periode Tanggal Terlebih Dahulu");
            $('#div-tgl-awal-periode-pra').addClass('has-error');
            $('#div-tgl-akhir-periode-pra').addClass('has-error');
        }else if (area === '') {
            alert_warning("Pilih Area Terlebih Dahulu");
        }else if (cabang === '') {
            alert_warning("Pilih Cabang Terlebih Dahulu");
        }else{
            get_data_cabang();
            $('#div-tipe-asuransi-pra').removeClass('has-error');
            $('#tgl-awal-periode-pra').removeClass('has-error');
            $('#tgl-akhir-periode-pra').removeClass('has-error');
            $('#btn-simpan-pra').prop('disabled', false);
            $('#btn-export-pra').prop('disabled', true);
            $('#btn-konfirmasi-pra').prop('disabled', true);
            $('#btn-cancel-pra').prop('disabled', true);
            $('#chk-all-tabel-pra').prop('checked', false);
            $('#chk-all-tabel-pra').prop('disabled', false);
        }
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

//===========================================================================================================\\
//===============================================CHECKLIST DATA==============================================\\
$('#chk-all-tabel-pra').click(function(){
    var pages_pra = tabel_view_pra.page();
    var limits_pra = tabel_view_pra.page.len();
    var table_leng_pra = tabel_view_pra.rows().data().length ;
    var search  = tabel_view_pra.search();
    tabel_view_pra.search("");
    tabel_view_pra.page.len(table_leng_pra);
    tabel_view_pra.draw();
    var tabel_pra = tabel_view_pra.data();

    if ($('#chk-all-tabel-pra').is(":checked")) {
        $('.checks-pra').prop("checked", true);
    }else{ 
        $('.checks-pra').prop("checked", false);
    }
    check_length_all_data = $('#tabel-view-pra').find('.checks-pra').filter(':checked').length;
    
    tabel_view_pra.page.len(limits_pra);
    tabel_view_pra.draw();
    tabel_view_pra.page(pages_pra).draw('page');
    tabel_view_pra.search(search);

    var tot_order = 0;
    var tot_rekon = 0;

    var list_data = tabel_view_pra.$(":checkbox:checked", {
                        "page": "all"
                    });
    list_data.each(function(index, elem) {
        tot_order = tot_order + parseInt(tabel_view_pra.row($(elem).closest('tr')).data()[5]);
        tot_rekon = tot_rekon + parseInt(tabel_view_pra.row($(elem).closest('tr')).data()[6]);
    });
    
    $('#inp-total-order-amt-pra').val(accounting.formatMoney(tot_order, '', 0, ','));
    $('#inp-total-rekon-amt-pra').val(accounting.formatMoney(tot_rekon, '', 0, ','));
});

$('#tabel-view-pra tbody').on('click', '.checks-pra', function(){
    var pages_pra = tabel_view_pra.page();
    var limits_pra = tabel_view_pra.page.len();
    var table_leng_pra = tabel_view_pra.rows().data().length ;
    var search  = tabel_view_pra.search();
    tabel_view_pra.search("");
    tabel_view_pra.page.len(table_leng_pra);
    tabel_view_pra.draw();
    var check_length = $('#tabel-view-pra').find('.checks-pra').filter(':checked').length;
    var tot_order = 0;
    var tot_rekon = 0;

    tabel_view_pra.page.len(limits_pra);
    tabel_view_pra.draw();
    tabel_view_pra.page(pages_pra).draw('page');
    tabel_view_pra.search(search); 

    var list_data = tabel_view_pra.$(":checkbox:checked", {
                        "page": "all"
                    });
    list_data.each(function(index, elem) {
        tot_order = tot_order + parseInt(tabel_view_pra.row($(elem).closest('tr')).data()[5]);
        tot_rekon = tot_rekon + parseInt(tabel_view_pra.row($(elem).closest('tr')).data()[6]);
    });
    
    $('#inp-total-order-amt-pra').val(accounting.formatMoney(tot_order, '', 0, ','));
    $('#inp-total-rekon-amt-pra').val(accounting.formatMoney(tot_rekon, '', 0, ','));

    if (check_length < check_length_all_data){
        $('#chk-all-tabel-pra').prop("checked", false);
    }else if (check_length === check_length_all_data && check_length !== 0 && check_length_all_data !== 0) {
        $('#chk-all-tabel-pra').prop("checked", true);
    }
});

//===========================================================================================================\\
//==============================================BUTTON SAVE DATA=============================================\\

$('#btn-simpan-pra').click(function(){
    if (check_session() === 'true') {
        var check_length = $('#tabel-view-pra').find('.checks-pra').filter(':checked').length;
        if (check_length === 0) {
            alert_info('Data Belum Dipilih');
        }else{
            alert_confirm('Simpan Data ?', function(){
                save_data_pra();    
            });
        }
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

//===========================================================================================================\\
//============================================BUTTON KONFIRMASI DATA==========================================\\

$('#btn-konfirmasi-pra').click(function(){
    if (check_session() === 'true') {
        var no_recon = $('#inp-no-reconsile-pra').val();
        alert_confirm('Konfirmasi Data Dengan No Reconsile: '+no_recon+ ' ?', function(){
            konfirmasi_data_pra();
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

//===========================================================================================================\\
//=============================================BUTTON CANCEL DATA============================================\\

$('#btn-cancel-pra').click(function(){
    if (check_session() === 'true') {
        var no_recon = $('#inp-no-reconsile-pra').val();
        alert_confirm('Batalkan Data Dengan No Reconsile: '+no_recon+ ' ?', function(){
            cancel_data_pra();
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

//===========================================================================================================\\
//=============================================BUTTON EXPORT DATA============================================\\
$('#btn-export-pra').click(function(){
    if (check_session() === 'true') {
        var no_recon = $('#inp-no-reconsile-pra').val();
        var insurance_name = $('#inp-perusahaan-3-pra').val();
        var asuransi_type = $('#slc-tipe-asuransi-pra').val();
        var tanggal_confirm = $('#inp-tgl-conf-pra').val();
        var tgl_confirm = $('#inp-tgl-rec-pra').val();
        if (tanggal_confirm === '' || tanggal_confirm === null) {
            tanggal_confirm = tgl_confirm;    
        }
        tanggal_confirm = new Date(tanggal_confirm).format('dd-mm-yyyy');
        var a = tanggal_confirm.substr(0,2);
        var b = tanggal_confirm.substr(3,2);
        var c = tanggal_confirm.substr(8,2);
        var tanggal = a+b+c;

        $.ajax({
            url: base_url + 'Controller_proses_rekon_asuransi/get_xls_asuransi',
            type: 'POST',
            dataType: 'json',
            data: {
                'id' : no_recon
            },
            cache: false,
            success:function(response){
                console.log(response);
                if (response) {
                    try{
                        if (response.result) {
                            download(response.result,insurance_name+'_'+asuransi_type+'_'+tanggal+'.xls',"application/vnd.ms-excel");
                        }else{
                            alert_error('Gagal Download File!');
                        }
                    }catch(e){
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Terjadi kesalahan error => " + e);
                    }
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
                    $('#btn-simpan-pra').prop('disabled', true);
                    $('#btn-konfirmasi-pra').prop('disabled', true);
                    $('#btn-cancel-pra').prop('disabled', true);
                    $('#btn-export-pra').prop('disabled', true);
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
});

//===========================================================================================================\\
//=================================================FUNCTION==================================================\\
function total_rek_order(){
    var order = 0;
    var rekon = 0;
    var tabel_view_pra_length = tabel_view_pra.rows().data().length;

    if (tabel_view_pra_length === 0) {
        $('#inp-total-order-amt-pra').val("");
        $('#inp-total-rekon-amt-pra').val("");
    } else {
        for (var i = 0; i < tabel_view_pra_length; i++) {
            order = Number(order)+Number(tabel_view_pra.rows().data()[i][5]);
            rekon = Number(rekon)+Number(tabel_view_pra.rows().data()[i][6]);
        }
        var total_order = accounting.formatMoney(order, '', 0, ',');
        var total_rekon = accounting.formatMoney(rekon, '', 0, ',');
        $('#inp-total-order-amt-pra').val(total_order);
        $('#inp-total-rekon-amt-pra').val(total_rekon);
    }    
}

function get_list_perusahaan(){
    if (check_session() === 'true') {
        $.ajax({
            url: 'Controller_proses_rekon_asuransi/get_list_perusahaan',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function(response) {
                console.log(response);
                $('#modal-search-perushaan-pra').modal({
                    show: true,
                    backdrop: 'static'
                });
                if (response) {
                    try {
                        tabel_perusahaan_pra.clear().draw();
                        $.each(response['data'], function(index) {
                            var id_perusahaan = this['insr_id'];
                            var nama_perusahaan = this['insr_name'];

                            tabel_perusahaan_pra.row.add([
                                id_perusahaan,
                                nama_perusahaan
                            ]).draw(false);
                        });
                    } catch (e) {
                        console.log(e);
                        $('#loading-ajax').hide(); //menutup loading ajax
                        alert_error("Terjadi kesalahan error => " + e);
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

function get_list_perusahaan_pa(){
    if (check_session() === 'true') {
        $.ajax({
            url: 'Controller_proses_rekon_asuransi/get_list_perusahaan_pa',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function(response) {
                console.log(response);
                $('#modal-search-perushaan-pra').modal({
                    show: true,
                    backdrop: 'static'
                });
                if (response) {
                    try {
                        tabel_perusahaan_pra.clear().draw();
                        $.each(response['data'], function(index) {
                            var id_perusahaan = this['insr_id'];
                            var nama_perusahaan = this['insr_name'];

                            tabel_perusahaan_pra.row.add([
                                id_perusahaan,
                                nama_perusahaan
                            ]).draw(false);
                        });
                    } catch (e) {
                        console.log(e);
                        $('#loading-ajax').hide(); //menutup loading ajax
                        alert_error("Terjadi kesalahan error => " + e);
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

function get_list_perusahaan_cp() {
    if (check_session() === 'true') {
        $.ajax({
            url: 'Controller_proses_rekon_asuransi/get_list_perusahaan_cp',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function(response) {
                console.log(response);
                $('#modal-search-perushaan-pra').modal({
                    show: true,
                    backdrop: 'static'
                });
                if (response) {
                    try {
                        tabel_perusahaan_pra.clear().draw();
                        $.each(response['data'], function(index) {
                            var id_perusahaan = this['insr_id'];
                            var nama_perusahaan = this['insr_name'];

                            tabel_perusahaan_pra.row.add([
                                id_perusahaan,
                                nama_perusahaan
                            ]).draw(false);
                        });
                    } catch (e) {
                        console.log(e);
                        $('#loading-ajax').hide(); //menutup loading ajax
                        alert_error("Terjadi kesalahan error => " + e);
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

function get_list_area() {
    if (check_session() === 'true') {
        $.ajax({
            url:'Controller_proses_rekon_asuransi/get_list_area',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function(response) {
                console.log(response);
                $('#modal-search-area-pra').modal({
                    show: true,
                    backdrop: 'static'
                });
                if (response) {
                    try {
                        tabel_area_pra.clear().draw();
                        $.each(response['data'], function(index) {
                            var id_area = this['branch_code'];
                            var nama_area = this['branch_desc'];

                            tabel_area_pra.row.add([
                                id_area,
                                nama_area
                            ]).draw(false);
                        });
                        tabel_area_pra.row.add([
                                'ALL',
                                'ALL'
                        ]).draw(false);
                    } catch (e) {
                        console.log(e);
                        $('#loading-ajax').hide(); //menutup loading ajax
                        alert_error("Terjadi kesalahan error => " + e);
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

function get_list_cabang_by_area(){
    if (check_session() === 'true') {
        var area_pra = $('#inp-area-pra').val();
        var arrayData = [];

        arrayData.push({
            branch_code : area_pra
        });
        $.ajax({
            url: base_url + 'Controller_proses_rekon_asuransi/get_list_cabang',
            type: 'POST',
            data: {arrayData},
            cache: false,
            success:function(response){
                console.log(response);
                if (response) {
                    try{
                        var result = $.parseJSON(response);
                        tabel_cabang_pra.clear().draw();
                        $.each(result['data'], function(index){
                            tabel_cabang_pra.row.add([
                                this['branch_code'],
                                this['branch_desc']
                                ]).draw(false);     
                        });
                        tabel_cabang_pra.row.add([
                                'ALL',
                                'ALL'
                        ]).draw(false);
                    }catch(e){
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Terjadi kesalahan error => " + e);
                    }
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
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

function get_data_cabang(){
    var area = $('#inp-area-pra').val();
    var cabang = $('#inp-cabang-pra').val();
    var arrayData = [];
    
    arrayData.push({
        branch_area : area,
        branch_cabang : cabang
    });

    if (check_session() === 'true') {
        $.ajax({
            url: base_url + 'Controller_proses_rekon_asuransi/get_data_cabang',
            type: 'POST',
            data: {arrayData},
            cache: false,
            success:function(response){
                console.log(response);
                if (response) {
                    try{
                        var result = $.parseJSON(response);
                        var array_cabang = [];
                        tabel_data_cabang.clear().draw();
                        $.each(result['data'], function(index){
                            array_cabang.push([
                                this['branch_code']
                            ]); 
                        });
                        tabel_data_cabang.rows.add(array_cabang).draw(false);
                        get_view_data();
                    }catch(e){
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Terjadi kesalahan error => " + e);
                    }
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
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

function get_view_data(){
    var cabang_data = tabel_data_cabang.rows().data();
    var cabang_length = cabang_data.length;
    var flag_error_server = false;
    var type_asuransi = $('#slc-tipe-asuransi-pra option:selected').val();
    var perusahan_asuransi = $('#inp-perusahaan-pra').val();
    var periode_awal = $('#tgl-awal-periode-pra').val();
    var periode_akhir = $('#tgl-akhir-periode-pra').val();
    var cabang = [];
    var arrayData = [];
    var data_tabel = [];

    for (var i = 0; i < cabang_length; i++) {
        cabang.push(cabang_data[i][0]);    
    }
    arrayData.push({
        sztype_asuransi : type_asuransi,
        szperusahaan : perusahan_asuransi,
        szperiode_awal : periode_awal,
        szperiode_akhir : periode_akhir,
        szcabang : cabang
    });

    if (check_session() === 'true') {
        if (type_asuransi === 'CP') {
            $.ajax({
                url: base_url + 'Controller_proses_rekon_asuransi/get_view_data',
                type: 'POST',
                data: {arrayData},
                cache: false,
                async: false,
                success:function(response){
                    console.log(response);
                    if (response) {
                        try{
                            var data = $.parseJSON(response);
                            tabel_view_pra.clear().draw();
                            if (data['alert'] === null){
                                if (data['data'].length < 1) {
                                    alert_info('Data Tidak Ditemukan');
                                    $('#btn-simpan-pra').prop('disabled', true);
                                    $('#inp-total-order-amt-pra').val("");
                                    $('#inp-total-rekon-amt-pra').val("");
                                }else{
                                    $.each(data['data'], function(index){
                                        var batch_date =  this['batch_date'];
                                        var polis_tgl = this['polis_tgl'];
                                        var rec_tgl = this['rec_tgl'];
                                        batch_date = new Date(batch_date).format('dd-mmm-yyyy');
                                        polis_tgl = new Date(polis_tgl).format('dd-mmm-yyyy');
                                        rec_tgl = new Date(rec_tgl).format('dd-mmm-yyyy');

                                        var kontrak_status ='';
                                        if (this['kontrak_status'] === '09') {
                                            kontrak_status = 'YES';
                                        }else{
                                            kontrak_status;
                                        }
                                        var order = accounting.formatMoney(this['total_insr_fin'], '', 0, ',');
                                        var rekon = accounting.formatMoney(this['rec_amt'], '', 0, ',');

                                        total_nilai_order.push([
                                            this['total_insr_fin']
                                        ]);
                                        total_nilai_rekon.push([
                                            this['rec_amt']
                                        ]);

                                        data_tabel.push([
                                            '<input type="checkbox" class ="checks-pra" id="chk-all-tabel-pra'+index+'" width="100%">',
                                            '',
                                            this['kontrak_id'],
                                            this['kontrak_no'],
                                            this['no_polis'],
                                            this['total_insr_fin'],
                                            this['rec_amt'],
                                            order,
                                            rekon,
                                            this['sts_desc'],
                                            batch_date,
                                            this['file_tn'],
                                            this['brch_id'],
                                            this['insr_compid'],
                                            polis_tgl,
                                            rec_tgl,
                                            this['sandi'],
                                            this['stage_prc'],
                                            this['stage_pr'],
                                            this['sts'],
                                            kontrak_status
                                        ]);
                                    });
                                    tabel_view_pra.rows.add(data_tabel).draw(false);
                                    // total_rek_order();
                                    $('#inp-total-order-amt-pra').val(0);
                                    $('#inp-total-rekon-amt-pra').val(0);
                                }
                            }else if(data['alert'] !== null){
                                alert_error('Error mencari data: '+data['alert'] + ' / ' +data['errorConsole']);
                            }
                        }catch(e){
                            $('#loading-ajax').hide();
                            console.log(e);
                            alert_error("Terjadi kesalahan error => " + e);
                        }
                    }else{
                        alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
                        $('#btn-simpan-pra').prop('disabled', true);
                        flag_error_server = true;
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
                    $('#btn-simpan-pra').prop('disabled', true);
                    flag_error_server = true;
                }
            });
        }else{
            $.ajax({
                url: base_url + 'Controller_proses_rekon_asuransi/get_view_data',
                type: 'POST',
                data: {arrayData},
                cache: false,
                async: false,
                success:function(response){
                    console.log(response);
                    if (response) {
                        try{
                            var data = $.parseJSON(response);
                            tabel_view_pra.clear().draw();
                            if(data['alert'] === null){
                                if (data['data'].length < 1) {
                                    alert_info('Data Tidak Ditemukan');
                                    $('#btn-simpan-pra').prop('disabled', true);
                                    $('#inp-total-order-amt-pra').val("");
                                    $('#inp-total-rekon-amt-pra').val("");
                                }else{
                                    $.each(data['data'], function(index){
                                        var batch_date =  this['batch_date'];
                                        var polis_tgl = this['polis_tgl'];
                                        var rec_tgl = this['rec_tgl'];
                                        batch_date = new Date(batch_date).format('dd-mmm-yyyy');
                                        polis_tgl = new Date(polis_tgl).format('dd-mmm-yyyy');
                                        rec_tgl = new Date(rec_tgl).format('dd-mmm-yyyy');

                                        var kontrak_status ='';
                                        if (this['kontrak_status'] === '09') {
                                            kontrak_status = 'YES';
                                        }
                                        var order = accounting.formatMoney(this['premi_amt'], '', 0, ',');
                                        var rekon = accounting.formatMoney(this['rec_amt'], '', 0, ',');

                                        total_nilai_order.push([
                                            this['premi_amt']
                                        ]);
                                        total_nilai_rekon.push([
                                            this['rec_amt']
                                        ]);

                                        data_tabel.push([
                                            '<input type="checkbox" class ="checks-pra" id="chk-all-tabel-pra'+index+'" width="100%">',
                                            '',
                                            this['kontrak_id'],
                                            this['kontrak_no'],
                                            this['no_polis'],
                                            this['premi_amt'],
                                            this['rec_amt'],
                                            order,
                                            rekon,
                                            this['sts_desc'],
                                            batch_date,
                                            this['file_tn'],
                                            this['brch_id'],
                                            this['insr_compid'],
                                            polis_tgl,
                                            rec_tgl,
                                            this['sandi'],
                                            this['stage_prc'],
                                            this['stage_pr'],
                                            this['sts'],
                                            kontrak_status
                                        ]);
                                    });
                                    tabel_view_pra.rows.add(data_tabel).draw(false);
                                    // total_rek_order();
                                    $('#inp-total-order-amt-pra').val(0);
                                    $('#inp-total-rekon-amt-pra').val(0);
                                } 
                            }else if(data['alert'] !== null){
                                alert_error('Error mencari data: '+data['alert']);
                            }
                        }catch(e){
                            $('#loading-ajax').hide();
                            console.log(e);
                            alert_error("Terjadi kesalahan error => " + e);
                        }
                    }else{
                        alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
                        $('#btn-simpan-pra').prop('disabled', true);
                        flag_error_server = true;
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
                    $('#btn-simpan-pra').prop('disabled', true);
                    flag_error_server = true;
                }
            });
        }
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
}

function get_list_no_reconsile() {
    var list_no_reconsile = [];
    var data = '';
    if (check_session() === 'true') {
        $.ajax({
            url: base_url + 'Controller_proses_rekon_asuransi/get_list_no_reconsile',
            type: 'POST',
            data: {
                data: data
            },
            cache: false,
            success: function(response) {
                console.log(response);
                $('#modal-search-reconsile-pra').modal({
                    show: true,
                    backdrop: 'static'
                });
                if (response) {
                    var result = $.parseJSON(response);
                    try {
                        tabel_reconsile_pra.clear().draw();
                        if (result['Alert'] === 'Berhasil') {
                            if(result['Data'] !== null){
                                $.each(result['Data'], function(index) {
                                    var status_reconsile = this['status'];
                                    var status = '';
                                    if (status_reconsile === 'C') {
                                        status = 'CONFIRM';
                                    }else{
                                        status = 'SAVE';
                                    }
                                    list_no_reconsile.push([
                                        this['reconsile_id'],
                                        this['reconsile_date'],
                                        this['insr_type'],
                                        this['insr_name'],
                                        this['insr_id'],
                                        status
                                    ]);
                                });
                                tabel_reconsile_pra.rows.add(list_no_reconsile).draw(false);    
                            }else if(result['Data'] === null){
                                alert_error('Data tidak tersedia!');
                            }
                        }else if(result['Alert'] !== 'Berhasil'){
                            alert_error(result['Alert']);
                        }
                    } catch (e) {
                        console.log(e);
                        $('#loading-ajax').hide(); //menutup loading ajax
                        alert_error("Terjadi kesalahan error => " + e);
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

function get_view_saved_data(id){
    if (check_session() === 'true') {
        var data_tabel = [];
        $.ajax({
            url: base_url + 'Controller_proses_rekon_asuransi/get_view_saved_data',
            type: 'POST',
            data: {
                'id' : id
            },
            cache: false,
            success:function(response){
                console.log(response);
                if (response) {
                    try{
                        var tabel_view_pra = $('#tabel-view-pra').DataTable();
                        var result = $.parseJSON(response);
                        tabel_view_pra.clear().draw();
                        if (result['Error'] !== null) {
                            alert_error('Error data: '+result['Error']);
                        }else if(result['Error'] === null){
                            if (result['Data'] !== null) {
                                var status_rec = result['Data'].reconsile_flag;
                                if (status_rec === 'S') {
                                    $('#inp-status-rec-pra').val("TERSIMPAN");
                                    $('#btn-simpan-pra').prop('disabled', true);
                                    $('#btn-konfirmasi-pra').prop('disabled', false);
                                    $('#btn-cancel-pra').prop('disabled', false);
                                    $('#btn-export-pra').prop('disabled', true);
                                    $('#inp-tgl-rec-pra').val(result['Data'].reconsile_date);
                                }else{
                                    $('#inp-status-rec-pra').val("DIKONFIRMASI");
                                    $('#btn-simpan-pra').prop('disabled', true);
                                    $('#btn-konfirmasi-pra').prop('disabled', true);
                                    $('#btn-cancel-pra').prop('disabled', true);
                                    $('#btn-export-pra').prop('disabled', false);
                                    $('#inp-tgl-rec-pra').val(result['Data'].reconsile_date);
                                    $('#inp-tgl-conf-pra').val(result['Data'].confirm_date)
                                }
                                $('#radio-search-recon').prop('checked', true);
                                $('#inp-no-reconsile-pra').prop('disabled', false);
                                $('#btn-no-reconsile-pra').prop('disabled', false);
                                $('#slc-tipe-asuransi-pra').prop('disabled', true);
                                $('#inp-perusahaan-2-pra').prop('disabled', true);
                                $('#btn-search-perusahaan-pra').prop('disabled', true);
                                $('#tgl-awal-periode-pra').prop('disabled', true);
                                $('#tgl-akhir-periode-pra').prop('disabled', true);
                                $('#inp-area-2-pra').prop('disabled', true);
                                $('#btn-search-area-pra').prop('disabled', true);
                                $('#inp-cabang-2-pra').prop('disabled', true);
                                $('#btn-search-cabang-pra').prop('disabled', true);
                                $('#btn-search-pra').prop('disabled', true);
                                $('#inp-send-kontrak-pra').val(result['Data'].total_contract_send);
                                $('#inp-kontrak-sukses-pra').val(result['Data'].total_contract_success);
                                $('#inp-kontrak-gagal-pra').val(result['Data'].total_contract_failed);
                                $('#inp-user-pra').val(result['Data'].created_by);
                                $('#inp-area-2-pra').val(result['Data'].area);
                                $('#inp-cabang-2-pra').val(result['Data'].branch);
                                $('#tgl-awal-periode-pra').val(result['Data'].start_period);
                                $('#tgl-akhir-periode-pra').val(result['Data'].end_period);

                                $('#inp-perusahaan-2-pra').val(result['Data']['listSavedDataDtl'][0].insr_comp_id +' - '+ result['Data']['listSavedDataDtl'][0].insr_name);
                                $('#inp-perusahaan-3-pra').val(result['Data']['listSavedDataDtl'][0].insr_name);
                                $('#inp-no-reconsile-pra').val(result['Data']['listSavedDataDtl'][0].reconsile_id);
                                $('#inp-no-reconsile-2-pra').val(result['Data']['listSavedDataDtl'][0].reconsile_id);

                                if (result['Data']['listSavedDataDtl'][0].data_code === 'ORD') {
                                    $('#slc-tipe-asuransi-pra').val('MV');
                                }else if (result['Data']['listSavedDataDtl'][0].data_code === 'ORDPA') {
                                    $('#slc-tipe-asuransi-pra').val('PA');
                                }else if (result['Data']['listSavedDataDtl'][0].data_code === 'ORDCP') {
                                    $('#slc-tipe-asuransi-pra').val('CP');
                                }

                                for (var i = 0; i < result['Data']['listSavedDataDtl'].length; i++) {
                                    var status;

                                    if (result['Data']['listSavedDataDtl'][i].status === 'Y') {
                                        status = 'SUKSES';
                                    }else{
                                        status = 'GAGAL';
                                    }

                                    var order = accounting.formatMoney(result['Data']['listSavedDataDtl'][i].insr_premi_amount, '', 0, ',');
                                    var rekon = accounting.formatMoney(result['Data']['listSavedDataDtl'][i].insr_recon_amount, '', 0, ',');

                                    data_tabel.push([
                                        '<input type="checkbox" class ="checks-pra" id="chk-all-tabel-view-pra'+i+'" width="100%">',
                                        result['Data']['listSavedDataDtl'][i].reconsile_id,
                                        '',
                                        result['Data']['listSavedDataDtl'][i].contract_no,
                                        result['Data']['listSavedDataDtl'][i].insr_polis_no,
                                        result['Data']['listSavedDataDtl'][i].insr_premi_amount,
                                        result['Data']['listSavedDataDtl'][i].insr_recon_amount,
                                        order,
                                        rekon,
                                        status,
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        '',
                                        ''
                                    ]);
                                }

                                tabel_view_pra.rows.add(data_tabel).draw(false);
                                var pages_pra = tabel_view_pra.page();
                                var limits_pra = tabel_view_pra.page.len();
                                var table_leng_pra = tabel_view_pra.rows().data().length ;
                                var search  = tabel_view_pra.search();
                                tabel_view_pra.search("");
                                tabel_view_pra.page.len(table_leng_pra);
                                tabel_view_pra.draw();

                                $('.checks-pra').prop('checked', true);
                                $('.checks-pra').prop('disabled', true);
                                $('#chk-all-tabel-pra').prop('disabled', true);

                                tabel_view_pra.page.len(limits_pra);
                                tabel_view_pra.draw();
                                tabel_view_pra.page(pages_pra).draw('page');
                                tabel_view_pra.search(search);
                                total_rek_order();
                            }
                        }
                    }catch(e){
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Terjadi kesalahan error => " + e);
                    }
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
                    $('#btn-simpan-pra').prop('disabled', true);
                    $('#btn-konfirmasi-pra').prop('disabled', true);
                    $('#btn-cancel-pra').prop('disabled', true);
                    $('#btn-export-pra').prop('disabled', true);
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

function save_data_pra(){
    var tabel_data = tabel_view_pra.data();
    var list_check_id_kontrak = [];
    var list_no_polis = [];
    var list_order = [];
    var list_rekon = [];
    var list_batch_date = [];
    var list_file_tn = [];
    var list_insr_compid = [];
    var list_polis_tgl = [];
    var list_rec_tgl = [];
    var list_sandi = [];
    var list_stage_prc = [];
    var list_stage_pr = [];
    var list_sts = [];
    var flag = 'S';
    var tipe_asuransi = $('#slc-tipe-asuransi-pra option:selected').val();
    var perusahaan = $('#inp-perusahaan-pra').val();
    var tgl_awal = $('#tgl-awal-periode-pra').val();
    var tgl_akhir = $('#tgl-akhir-periode-pra').val();
    var cabang = $('#inp-cabang-2-pra').val();
    var area = $('#inp-area-2-pra').val();
    var length_data = tabel_data.length;
    var kontrak_sukses = 0;
    var kontrak_gagal = 0;
    var kontrak_kirim = 0;
    var status = "";
    var nilai_rekon;
    if (check_session() === 'true') {
        var list_data = tabel_view_pra.$(":checkbox:checked", {
                        "page": "all"
                    });
        list_data.each(function(index, elem) {
            status = tabel_view_pra.row($(elem).closest('tr')).data()[19];
            nilai_rekon = tabel_view_pra.row($(elem).closest('tr')).data()[6];
            if (status === "Y" && nilai_rekon !== "") {

                kontrak_sukses = kontrak_sukses + 1;

                list_check_id_kontrak.push(tabel_view_pra.row($(elem).closest('tr')).data()[2]);
                list_no_polis.push(tabel_view_pra.row($(elem).closest('tr')).data()[4]);
                list_order.push(tabel_view_pra.row($(elem).closest('tr')).data()[5]);
                list_rekon.push(tabel_view_pra.row($(elem).closest('tr')).data()[6]);
                list_batch_date.push(tabel_view_pra.row($(elem).closest('tr')).data()[10]);
                list_file_tn.push(tabel_view_pra.row($(elem).closest('tr')).data()[11]);
                list_insr_compid.push(tabel_view_pra.row($(elem).closest('tr')).data()[13]);
                list_polis_tgl.push(tabel_view_pra.row($(elem).closest('tr')).data()[14]);
                list_rec_tgl.push(tabel_view_pra.row($(elem).closest('tr')).data()[15]);
                list_sandi.push(tabel_view_pra.row($(elem).closest('tr')).data()[16]);
                list_stage_prc.push(tabel_view_pra.row($(elem).closest('tr')).data()[17]);
                list_stage_pr.push(tabel_view_pra.row($(elem).closest('tr')).data()[18]);
                list_sts.push(tabel_view_pra.row($(elem).closest('tr')).data()[19]);

            }else if (status === "N" || nilai_rekon === "") {
                kontrak_gagal = kontrak_gagal + 1;
            }
            kontrak_kirim = kontrak_sukses;
        });
        kontrak_gagal = kontrak_gagal + (length_data - list_data.length);
        $.ajax({
            url: base_url + 'Controller_proses_rekon_asuransi/save_data_pra',
            type: 'POST',
            dataType: 'json',
            data:
                {
                    "flag" : flag,
                    "contract_id" : list_check_id_kontrak,
                    "polis_no" : list_no_polis,
                    "no_order" : list_order,
                    "no_rekon" : list_rekon,
                    "batch_date" : list_batch_date,
                    "file_tn" : list_file_tn,
                    "insr_compid" : list_insr_compid,
                    "polis_tgl" : list_polis_tgl,
                    "rec_tgl" : list_rec_tgl,
                    "sandi" : list_sandi,
                    "stage_prc" : list_stage_prc,
                    "stage_pr" : list_stage_pr,
                    "sts" : list_sts,
                    "kontrak_kirim" : kontrak_kirim,
                    "kontrak_sukses" : kontrak_sukses,
                    "kontrak_gagal" : kontrak_gagal,
                    "branch" : cabang,
                    "area" : area,
                    "start_period" : tgl_awal,
                    "end_period" : tgl_akhir,
                    "tipe_asuransi" : tipe_asuransi
                },
            success: function(response) {
                console.log(response);
                if (response) {
                    try{ 
                        var result = $.parseJSON(response);
                        if (result['Alert'] === null && result['Info'] === null) {
                            no_reconsile_generate =  result['no_reconsile'];        
                            alert_info('Data Berhasil Disimpan Dengan Nomor Reconsile: ' + no_reconsile_generate,
                                function(){
                                    get_view_saved_data(no_reconsile_generate);
                                    $('#chk-all-tabel-pra').prop('checked', true);
                                    $('#chk-all-tabel-pra').prop('disabled', true);
                            });
                        }else if(result['Alert'] !== null){
                            alert_error(result['Alert']);
                        }else if(result['Info'] !== null){
                            alert_info(result['Info']);
                        }
                    }
                    catch(e){
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error("Terjadi kesalahan error => " + e);
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

function konfirmasi_data_pra(){
    var no_recon = $('#inp-no-reconsile-pra').val();
    var no_recon_2 = $('#inp-no-reconsile-2-pra').val();
    if (check_session() === 'true') {
        $.ajax({
            url: base_url + 'Controller_proses_rekon_asuransi/konfirmasi_data_pra',
            type: 'POST',
            data: {
                "rec_no" : no_recon
            },
            cache: false,
            async: false,
            success:function(response){
                console.log(response);
                if (response) {
                    try{
                        var result = $.parseJSON(response);
                        if (result['error'] === null) {
                            alert_info('Data Dengan No Reconsile: '+no_recon+' Berhasil Dikonfirmasi', function(){
                                get_view_saved_data(no_recon_2);
                            });    
                        }else if(result['error'] !== null){
                            alert_error('Error : '+result['error']);
                        }
                    }catch(e){
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Terjadi kesalahan error => " + e);
                    }
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
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

function cancel_data_pra(){
    var no_recon = $('#inp-no-reconsile-pra').val();
    if (check_session() === 'true') {
        $.ajax({
            url: base_url + 'Controller_proses_rekon_asuransi/cancel_data_pra',
            type: 'POST',
            data: {
                "rec_no" : no_recon
            },
            cache: false,
            success:function(response){
                console.log(response);
                if (response) {
                    try{
                        var result = $.parseJSON(response);
                        if (result['error'] === null) {
                            alert_info('Data Dengan No Reconsile: '+no_recon+' Berhasil Dibatalkan', function(){
                                location.reload();
                            });
                        }else if(result['error'] !== null){
                            alert_error('Error : '+result['error']);
                        }
                    }catch(e){
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Terjadi kesalahan error => " + e);
                    }
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
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
//============================================END AUTHOR: 15997085===========================================\\