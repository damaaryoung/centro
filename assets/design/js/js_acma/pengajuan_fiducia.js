var tbl_pengajuan_fdc = $('#tbl-pengajuan-fdc').DataTable({
    "columnDefs": [
    {
        "targets": [1],
        "visible": false,
        "responsive": true,
    }],
    "scrollY":        "360px",
    "scrollCollapse": true,
    "paging":         false
});

var tbl_dtl_fiducia = $('#tbl-detail-pfdc').DataTable({
    "columnDefs": [
    {
        "targets": [2,11,12],
        "visible": false
    }],
    "scrollY":        "360px",
    "scrollCollapse": true,
    "paging":         false
});

var tbl_history_fdc = $('#tbl-history-pfdc').DataTable();
var branch_code_fdc = $('#branch-id-fdc').val();
var branch_name_fdc = $('#branch-name-fdc').val();
var map_pfdc = new Object();
var flag_role_pfdc = true;
var role_pfdc;
var data_no_pfdc;
var tgl_regis;
var pesan;
var error_server = false;
var flag_branch_create = false;
var flag_conf_verif = false;
var aa;
var map_pfdc = new Object();

//----------------------------------------- GET STATUS FIDUCIA ----------------------------------------------//
get_status_fiducia('#slc-status-fdc');

//------------------------------------------ GET CABANG BERDASARKAN USER LOGIN ------------------------------//
if(branch_code_fdc !== '0000') {
    $('<option/>').val(branch_code_fdc).html(branch_code_fdc + ' - ' + branch_name_fdc).appendTo('#slc-br-id-fdc');
}else{
    get_data_branch('#slc-br-id-fdc');
}

//--------------------------------------------- GET ROLE CODE -------------------------------------------//
if (!localStorage.getItem('role_user_pfdc')) {
    $.ajax({
        url : "Controller_home/get_detail_user",
        cache : false,
        success : function(response){
            if(response){
                try{
                    console.log(response);
                    localStorage.setItem('role_user_pfdc', response);
                    role_pfdc = $.parseJSON(localStorage.getItem('role_user_pfdc'));
                    console.log(role_pfdc);
                    console.log('aji sukses');
                }
                catch(e){
                    console.log(e);
                    $('#loading-ajax').hide();
                    alert_error("Terjadi Kesalahan "+e);
                }
            }
        },
        error: function(response){
            console.log(response);
        }
    });
}else{
    role_pfdc = $.parseJSON(localStorage.getItem('role_user_pfdc'));
    console.log(role_pfdc);
    console.log('aji else');
}

//----------------------------------------- VALIDASI TANGGAL TIDAK BOLEH MELEBIHI 30 HARI (MAIN) ---------------------//
$('#tgl-awal-fdc').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
}).on("dp.change", function(e){
    var date = e.date;
    var dDate = date._d;
    var new_date = new Date(dDate);
    new_date.setDate(new_date.getDate() + 30);
    $('#tgl-akhir-fdc').data("DateTimePicker").minDate(dDate);

    if (new_date > new Date(today)) {
        new_date = new Date(today);
    }

    $('#tgl-akhir-fdc').data("DateTimePicker").maxDate(new_date);
    $('#tgl-akhir-fdc').data("DateTimePicker").date(new_date);
});

$('#tgl-akhir-fdc').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
});

//----------------------------------------- VALIDASI TANGGAL TIDAK BOLEH MELEBIHI 30 HARI (DETAIL) ---------------------//
$('#tgl-awal-dtl-fdc').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
}).on("dp.change", function(e){
    var date = e.date;
    var dDate = date._d;
    var new_date = new Date(dDate);
    new_date.setDate(new_date.getDate() + 30);
    $('#tgl-akhir-dtl-fdc').data("DateTimePicker").minDate(dDate);

    if (new_date > new Date(today)) {
        new_date = new Date(today);
    }

    $('#tgl-akhir-dtl-fdc').data("DateTimePicker").maxDate(new_date);
    $('#tgl-akhir-dtl-fdc').data("DateTimePicker").date(new_date);
});

$('#tgl-akhir-dtl-fdc').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
});

// ------------------------------ BUTTON CLEAR CONTRACT (MAIN) ------------------------------ //
$('#btn-clear-pengajuan-fdc').on("click", function(){
    $('#tgl-awal-fdc').data("DateTimePicker").clear();
    $('#tgl-akhir-fdc').data("DateTimePicker").clear();
    $('#slc-status-fdc').val('');
    $('#cont-id-hist-pfdc').val('');
    tbl_pengajuan_fdc.clear().draw();
    tbl_history_fdc.clear().draw();
});

// ------------------------------ BUTTON NEW CONTRACT (MAIN) ------------------------------ //
$('#btn-new-pengajuan-fdc').click(function(){
    flag_role_pfdc = true;
    console.log(branch_code_fdc);
    console.log(branch_name_fdc);
    for (var i = 0; i < role_pfdc.length; i++) {
        if(role_pfdc[i]['role_code'] === 'CREATE_FDC') {
            flag_role_pfdc = false;
            break;
        }
    }

    if(!flag_role_pfdc){
    $('#detail-pengajuan-fiducia').show();
    $('#search-pengajuan-fiducia').hide();
    $('#btn-new-dtl-pfdc').prop('disabled', true);
    $('#btn-ho-verify-dtl-pfdc').prop('disabled', true);
    $('#btn-confirm-dtl-pfdc').prop('disabled', true);
    $('#btn-create-dtl-pfdc').prop('disabled', true);
    $('#btn-clear-dtl-pfdc').prop('disabled', false);
    $('#btn-back-dtl-pfdc').prop('disabled', false);
    $('#btn-upload-dtl-pfdc').prop('disabled', true);
    $('#btn-search-dtl-pfdc').prop('disabled', false);
    $('#tgl-awal-dtl-fdc').data("DateTimePicker").clear();
    $('#tgl-akhir-dtl-fdc').data("DateTimePicker").clear();
    $('#tgl-regis-dtl-fdc').val('');
    $('#inp-regis-no-fdc').val('');
    tbl_dtl_fiducia.clear().draw();

    if(branch_code_fdc === "0000"){
        $('#slc-br-id-fdc').prop('disabled', false);
    }else{
        $('#slc-br-id-fdc').val(branch_code_fdc);
        $('#slc-br-id-fdc').prop('disabled', true);
    }
    }else{
        alert_error("Tombol Baru Hanya Untuk CAD");
    }

});

// ------------------------------ BUTTON SEARCH PENGAJUAN FIDUCIA (MAIN) ------------------------------ //
$('#btn-search-pengajuan-fdc').click(function(){
    var regis_start_date = $('#tgl-awal-fdc').val();
    var regis_end_date = $('#tgl-akhir-fdc').val();
    var status = $('#slc-status-fdc').val();
    var flag = "";

    if (regis_start_date === '' && regis_end_date === ''){
        alert_info("Silahkan Pilih Periode Pengajuan Fiducia");
        $('#div-tgl-awal-fdc').addClass('has-error');
        $('#div-tgl-akhir-fdc').addClass('has-error');
    }else if(status === ''){
        alert_info("Silahkan Pilih Status Terlebih Dahulu.");
        $('#list-status-fdc').addClass('has-error');
    }else{
        $('#div-tgl-awal-fdc').removeClass('has-error');
        $('#div-tgl-akhir-fdc').removeClass('has-error');
        $('#list-status-fdc').removeClass('has-error');
        post_data_regis_fdc(regis_start_date,regis_end_date,status,flag);
    }
});

// ------------------------------ FUNGSI CEK DETAIL FIDUCIA YANG SUDAH REGISTRASI ------------------------------ //
$('#tbl-pengajuan-fdc').on( 'click', '.btncls-dtl-pfdc', function(){
    if(check_session()=== 'false'){
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }else{
        var data_detail = tbl_pengajuan_fdc.row($(this).closest('tr')).data();
        var branch_id = data_detail[1];
        var no_pengajuan_fdc = data_detail[3];
        var tgl_pengajuan_fdc = data_detail[4];
        var status_validate;
        var status_fiducia;
        var button = "";
        tbl_dtl_fiducia.clear().draw();
        console.log(data_detail);
        console.log(branch_id);
        console.log(no_pengajuan_fdc);
        console.log(tgl_pengajuan_fdc);
        $('#detail-pengajuan-fiducia').show();
        $('#search-pengajuan-fiducia').hide();
        $.ajax({
            url: "Controller_pengajuan_fiducia/post_data_dtl_regis_fdc",
            type: 'POST',
            dataType:'json',
            data:{
                "registration_no": no_pengajuan_fdc
            },
            success: function(response){
                console.log(response);
                var res = $.parseJSON(response);
                console.log(res);
                if(res){
                    try{
                        tbl_dtl_fiducia.clear().draw();
                        var data = [];
                        $.each(res['Data'], function(index){
                            status_fiducia = this['status'];
                            var style_visible = '';
                            var ceklis_pfdc = '<i class="fa fa fa-check-circle stats-up-pfdc-c"  aria-hidden="true" id="ceklis-pfdc'+index+'" style="color:green" hidden></i><i class="fa fa-spinner fa-spin stats-load-pfdc-c"  aria-hidden="true" id="stats-load-pfdc'+index+'" hidden></i><i class="fa fa fa-times-circle stats-fail-pfdc-c"  aria-hidden="true" id="stats-fail-pfdc'+index+'" style="color:red" hidden></i>';
                            var lihat_document_fiducia = '<a id="btn-view-dokument-pfdc'+index+'" class="btn btn-transparent  btn-view-dokument-pfdc" title="Lihat Dokumen" data-placement="top" data-toggle="tooltip"  data-original-title="View"><i class="fa fa-file-image-o"  aria-hidden="true"></i></a>';
                            var aksi_document_fiducia = '<a class="btn btn-transparent  btn-upload-document-pfdc" title="Upload Dokumen" data-placement="top" data-toggle="tooltip"  id="btn-upload-document-pfdc'+index+'" data-original-title="Upload" style="visibility:'+ style_visible +';"><i class="fa fa-upload"  aria-hidden="true"></i></a>';

                            if( this['status'] === 'Branch Confirm'){
                                select_status ='<select class="slc-status-dtl-fdc" id="slc-status-dtl-fdc'+index+'" type="selected" onchange="change_confirm_fdc('+index+')"><option value="02"> ' + this['status'] + '</option><option value="03"> HO Approve </option><option value="04"> HO Reject </option></select>';

                            }else{
                                select_status = '<select class="slc-status-dtl-fdc" id="slc-status-dtl-fdc'+index+'" disabled type="selected" ><option value=""> ' + this['status'] + '</option><option value="03"> HO Approve </option><option value="04"> HO Reject </option></select>';
                            }

                            if(this['reject_desc'] !== null){
                                var keterangan_reject = '<input class="input-ket" id="inp-ket-fdc'+index+'" value="'+this['reject_desc']+'" disabled>';
                            }else{
                                var keterangan_reject = '<input class="input-ket" id="inp-ket-fdc'+index+'" disabled>';
                            }

                            data.push([
                                '<input class="check-pfdc-dtl" id="check-tbl-dtl-pfdc'+index+'" type="checkbox" disabled="">',
                                index + 1,
                                this['branch_id'],
                                this['branch_name'],
                                this['outlet_id'],
                                this['ppd_date'],
                                this['contract_no'],
                                this['customer_name'],
                                select_status,//'<select class="slc-status-dtl" id="slc-status-dtl'+index+'" type="selected" disabled="true"><option> ' + this['status'] + '</option><option value="HO_APPROVE"> HO APPROVE </option><option value="HO_REJECT"> HO REJECT </option></select>',
                                keterangan_reject,
                                lihat_document_fiducia + ceklis_pfdc,
                                this['customer_no'],
                                this['application_no']
                            ]);
                        });
                        tbl_dtl_fiducia.rows.add(data).draw(false);
                        if(status_fiducia.includes("Create")){
                            status_validate = "BRANCH CREATE";
                        }else if(status_fiducia.includes("Confirm")){
                            status_validate = "BRANCH CONFIRM";
                            $('.slc-status-dtl-fdc').val("03");
                        }else{
                            status_validate = "HO VERIFY";
                        }
                        $('#inp-checkAll-fdc').prop('checked',true);
                        $('#inp-checkAll-fdc').prop('disabled',true);
                        $('.check-pfdc-dtl').prop('checked', true);
                        validatedtlfdc(status_validate);
                        $('#slc-br-id-fdc').prop('disabled', true);
                        $('#slc-br-id-fdc').val(branch_id);
                        $('#inp-regis-no-fdc').val(no_pengajuan_fdc);
                        $('#tgl-regis-dtl-fdc').val(tgl_pengajuan_fdc);                                               
                    }catch(e){
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Galat " + e);
                    }
                }else{
                    alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");
                }
            },
            error: function(response){
                console.log(response);
                alert_error(response);
            }
        });
    }
});

// ------------------------------ BUTTON CLEAR CONTRACT DETAIL -------------------------//
$('#btn-clear-dtl-pfdc').on("click", function(){
    if(branch_code_fdc == "0000"){
        $('#slc-br-id-fdc').val('');
        $('#slc-br-id-fdc').prop('disabled', false);
    }else{
        $('#slc-br-id-fdc').val();
    }
    $('#tgl-awal-dtl-fdc').data("DateTimePicker").clear();
    $('#tgl-akhir-dtl-fdc').data("DateTimePicker").clear();
    $('#inp-regis-no-fdc').val('');
    $('#tgl-regis-dtl-fdc').val('');
    tbl_dtl_fiducia.clear().draw();
    $('#inp-dtl-checkall').prop('checked', false);
    $('#btn-new-dtl-pfdc').prop('disabled', false);
    $('#btn-search-dtl-pfdc').prop('disabled', true);
    $('#btn-create-dtl-pfdc').prop('disabled', true);
    $('#btn-confirm-dtl-pfdc').prop('disabled', true);
    $('#btn-ho-verify-dtl-pfdc').prop('disabled', true);
    $('#btn-upload-dtl-pfdc').prop('disabled', true);
    $('#inp-checkAll-fdc').prop('checked', false);
    $('#inp-checkAll-fdc').prop('disabled', false);
});

// ------------------------------ BUTTON BARU DETAIL PENGAJUAN FIDUCIA ---------------------------- //
$('#btn-new-dtl-pfdc').on("click", function(){
    flag_role_pfdc = true;
    for(var i = 0; i < role_pfdc.length; i++ ){
        console.log(role_pfdc[i]['role_code']);
        if(role_pfdc[i]['role_code'] === 'CREATE_FDC'){
            flag_role_pfdc = false;
            break;
        }

    }
    if(!flag_role_pfdc){
        $('#btn-search-dtl-pfdc').prop('disabled', false);
        $('#btn-new-dtl-pfdc').prop('disabled', true);
    }else{
        alert_error("Tombol Baru Hanya Untuk CAD");
    }

});

// ------------------------------ BUTTON CARI FIDUCIA YANG LOLOS PPD ------------------------------ //
$('#btn-search-dtl-pfdc').click(function(){
    var ppd_start_date = $('#tgl-awal-dtl-fdc').val();
    var ppd_end_date = $('#tgl-akhir-dtl-fdc').val();
    var branch = $('#slc-br-id-fdc').val();

    if (branch === '') {
        alert_info("Silahkan Pilih Cabang Terlebih Dahulu.");
        $('#div-slc-br-id-fdc').addClass('has-error');
    }else if(ppd_start_date === '' && ppd_end_date === ''){
        alert_info("Silahkan Pilih Periode PPD");
        $('#div-tgl-awal-dtl-fdc').addClass('has-error');
        $('#div-tgl-akhir-dtl-fdc').addClass('has-error');
    }else{
        $('#div-tgl-awal-dtl-fdc').removeClass('has-error');
        $('#div-tgl-akhir-dtl-fdc').removeClass('has-error');
        $('#div-slc-br-id-fdc').removeClass('has-error');
        console.log(ppd_start_date);
        console.log(ppd_end_date);
        console.log(branch);
        post_data_lolos_ppd_fdc(ppd_start_date,ppd_end_date,branch);
        // $('#btn-search-dtl-pfdc').prop('disabled', true);
    }
    $('#btn-new-dtl-pfdc').prop('disabled', true);
    $('#btn-ho-verify-dtl-pfdc').prop('disabled', true);
    $('#btn-confirm-dtl-pfdc').prop('disabled', true);
    $('#btn-clear-dtl-pfdc').prop('disabled', false);
    $('#btn-back-dtl-pfdc').prop('disabled', false);
    $('#btn-upload-dtl-pfdc').prop('disabled', true);
    $('#inp-checkAll-fdc').prop('checked', false);

});

//--------------------------------------- FUNGSI CHECK ALL -------------------------------------------------//
$('#inp-checkAll-fdc').click(function(){
    // var pages_pfdc = tbl_dtl_fiducia.page();
    // var limits_pfdc = tbl_dtl_fiducia.page.len();
    // var table_leng_pfdc = tbl_dtl_fiducia.rows().data().length ;
    // var search_pfdc  = tbl_dtl_fiducia.search();
    // tbl_dtl_fiducia.search("");
    // tbl_dtl_fiducia.page.len(table_leng_pfdc);
    // tbl_dtl_fiducia.draw();
    if ($('#inp-checkAll-fdc').is(':checked')){
        $(':checkbox:enabled').prop('checked', true);
        console.log("ceklis");
    }else{
        $(':checkbox:enabled').prop('checked', false);
        console.log("unceklis");
    }
    // tbl_dtl_fiducia.search(search_pfdc);
    // tbl_dtl_fiducia.page.len(limits_pfdc);
    // tbl_dtl_fiducia.draw();
    // tbl_dtl_fiducia.page( pages_pfdc ).draw( 'page' );
});

// ------------------------------ BUTTON KEMBALI FIDUCIA ------------------------------ //
$('#btn-back-dtl-pfdc').on("click", function(){
    $('#inp-checkAll-fdc').prop('checked',false);
    $('#inp-checkAll-fdc').prop('disabled',false);
    $('#search-pengajuan-fiducia').show();
    $('#detail-pengajuan-fiducia').hide();
    tbl_pengajuan_fdc.clear().draw();
    tbl_history_fdc.clear().draw();
    var regis_start_date = $('#tgl-awal-fdc').val();
    var regis_end_date = $('#tgl-akhir-fdc').val();
    var status = $('#slc-status-fdc').val();
    var flag = "kembali";
    if (regis_start_date !== '' && regis_end_date !== '' && status !== ''){        
        post_data_regis_fdc(regis_start_date,regis_end_date,status,flag);
    }
});

// ------------------------------ BUTTON HISTORY CONTRACT ------------------------------ //
$('#btn-history-contract-pengajuan-fdc').on("click", function(){
    $('#cont-id-hist-pfdc').val('');
    $('#notaris-id-name').prop('hidden', true);
    tbl_history_fdc.clear().draw();
    $('#modal-pfdc').modal('show');
    $('#btn-cek-hist-pfdc').on("click", function (){
        var cont_id = $('#cont-id-hist-pfdc').val();
        if(cont_id === ''){
            alert_info("Silahkan Masukkan Nomor Kontrak");
            $('#div-cont-id-hist-pfdc').addClass('has-error');
        } else {
            $('#div-cont-id-hist-pfdc').removeClass('has-error');
            post_history_contract_fdc();
        }
    });
});

// ------------------------------------- BUTTON KELUAR/EXIT MODAL HISTORY CONTRACT -----------------------------------//
// $('#btn-close-hst-pfdc').click(function(){
//     $('#cont-id-hist-pfdc').val('');
//     $('#notaris-id-name').prop('hidden', true);
//     tbl_history_fdc.clear().draw();
// });

// ------------------------------ BUTTON PENGAJUAN CABANG FIDUCIA ------------------------------ //
$('#btn-create-dtl-pfdc').click(function(){
    if(check_session()=== 'false'){
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }else{
        flag_role_pfdc = true;
        for(var i = 0; i < role_pfdc.length; i++ ){
                        console.log(role_pfdc[i]['role_code']);
                        if(role_pfdc[i]['role_code'] === 'CREATE_FDC'){
                            flag_role_pfdc = false;
                            break;
                        }

        }
        if(!flag_role_pfdc){
        var check_lenght = $('#tbl-detail-pfdc').find('.check-pfdc').filter(':checked').length;
        console.log(check_lenght);
        if(branch_code_fdc === "0000"){
            alert_error("Pusat hanya dapat Proses HO Verify");
        }else if(check_lenght === 0){
            alert_error("Pilih data yang akan diajukan terlebih dahulu !");
        }else{
            alert_confirm('Apakah Anda Yakin Ingin Melakukan Pengajuan?', function(){
                create_pengajuan_fiducia();
                if(error_server === false){
                    var button = "create";
                    //debugger;
                    post_data_dtl_regis_fdc(data_no_pfdc,button);
                    if(flag_branch_create){

                    }else{  
                    $('#btn-upload-dtl-pfdc').prop('disabled', false);
                    $('#btn-new-dtl-pfdc').prop('disabled', true);
                    $('#btn-ho-verify-dtl-pfdc').prop('disabled', true);
                    $('#btn-create-dtl-pfdc').prop('disabled', true);
                    $('#btn-search-dtl-pfdc').prop('disabled', true);
                    $('#btn-clear-dtl-pfdc').prop('disabled', false);
                    $('#btn-back-dtl-pfdc').prop('disabled', false);
                    $('#slc-br-id-fdc').prop('disabled', true);
                    $('#btn-confirm-dtl-pfdc').prop('disabled', false);
                    $('#slc-br-id-fdc').val(branch_code_fdc);
                    $('#inp-regis-no-fdc').val(data_no_pfdc);
                    $('#tgl-regis-dtl-fdc').val(tgl_regis);

                    }
                flag_branch_create = false;
                }
                error_server = false;
            });
        }
    }else{
        alert_error("Pengajuan Hanya Bisa Dilakukan Oleh CAD");
    }
    }
});

// ------------------------------ BUTTON KONFIRMASI CABANG FIDUCIA ------------------------------ //
$('#btn-confirm-dtl-pfdc').click(function(){
    if(check_session()=== 'false'){
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }else{
        flag_role_pfdc = true;
        for(var i = 0; i < role_pfdc.length; i++ ){
                        console.log(role_pfdc[i]['role_code']);
                        if(role_pfdc[i]['role_code'] === 'CONF_FDC'){
                            flag_role_pfdc = false;
                            break;
                        }

                    }
                    if(!flag_role_pfdc){
                        
        var button = "confirm";
        var status = "02";
        var registration_no_fdc = $('#inp-regis-no-fdc').val();
        var tgl_regis_fdc = $('#tgl-regis-dtl-fdc').val();
        var check_lenght = $('#tbl-detail-pfdc').find('.check-pfdc-dtl').filter(':checked').length;
        var branch_id_fdc = $('#slc-br-id-fdc').val();
        var listStatus = [];
        var listKetReject = [];
        var listContract = [];

        for (i = 0; i < check_lenght; i++) { 
            listStatus.push($('#slc-status-dtl-fdc'+i+'').val());
            listKetReject.push($('#inp-ket-fdc'+i+'').val());
            listContract.push(tbl_dtl_fiducia.data()[i][6]);
        }
        console.log(listStatus);
        console.log(listContract);
        console.log(listKetReject);

        if(branch_code_fdc === "0000"){
            alert_error("Pusat Hanya Dapat Proses HO Verify");
        }else{
            alert_confirm('Apakah Anda Yakin Ingin Melakukan Konfirmasi Pengajuan?', function(){
                confirm_verification_fiducia(branch_id_fdc,registration_no_fdc,status,listContract,listStatus,listKetReject);
                //debugger;
                if(error_server === false && flag_conf_verif === false){
                    post_data_dtl_regis_fdc(registration_no_fdc,button);
                    $('#btn-new-dtl-pfdc').prop('disabled', true);
                    $('#btn-confirm-dtl-pfdc').prop('disabled', true);
                    $('#btn-create-dtl-pfdc').prop('disabled', true);
                    $('#btn-upload-dtl-pfdc').prop('disabled', true);
                    $('#btn-search-dtl-pfdc').prop('disabled', true);
                    $('#btn-clear-dtl-pfdc').prop('disabled', false);
                    $('#btn-back-dtl-pfdc').prop('disabled', false);
                    $('#slc-br-id-fdc').prop('disabled', true);
                    $('#btn-ho-verify-dtl-pfdc').prop('disabled', false);
                    $('#slc-br-id-fdc').val(branch_id_fdc);
                    $('#inp-regis-no-fdc').val(registration_no_fdc);
                    $('#tgl-regis-dtl-fdc').val(tgl_regis_fdc);
                }
                error_server = false;
                flag_conf_verif = false;                  
            });
        }
    }else{
        alert_error("Konfirmasi Hanya Bisa Dilakukan Oleh ADH");
    }
    }
});

// ------------------------------ BUTTON VERIFIKASI HO FIDUCIA ------------------------------ //
$('#btn-ho-verify-dtl-pfdc').click(function(){
    if(check_session()=== 'false'){
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }else{

        if(branch_code_fdc === '0000'){
            flag_role_pfdc = true;
            for(i = 0; i < role_pfdc.length; i++){
                        if(role_pfdc[i]['role_code'] === 'VERIF_FIDUCIA') {
                            flag_role_pfdc = false;
                            break;
                        }
            }
        if(!flag_role_pfdc){
        var button = "verify";
        var status = "03";
        var registration_no_fdc = $('#inp-regis-no-fdc').val();
        var branch_id_fdc = $('#slc-br-id-fdc').val();
        var check_lenght = $('#tbl-detail-pfdc').find('.check-pfdc-dtl').filter(':checked').length;
        var array_value = [];
        var array_ket = [];
        var listStatus = [];
        var listKetReject = [];
        var listContract = [];
    

            for (i = 0; i < check_lenght; i++) {
                array_value.push($('#slc-status-dtl-fdc'+i+'').val());
                array_ket.push($('#inp-ket-fdc'+i+'').val());
                console.log(array_value);
                console.log(array_ket);

                if(array_value[i] != "03" && array_value[i] != "04"){
                    alert_info("Silahkan Pilih Status Pengajuan Terlebih Dahulu");
                    break;
                }else if(array_value[i] === "04" && array_ket[i] === ''){
                    alert_info("Silahkan Isi Keterangan Reject Terlebih Dahulu");
                    break;
                }else if(array_value[i] === "03" && array_ket[i] !== ''){
                    alert_info("Keterangan Reject Harus Kosong");
                    break;
                    array_ket[i] = '';
                }
            }

            if(i>=check_lenght){

                for (i = 0; i < check_lenght; i++) { 
                    listContract.push(tbl_dtl_fiducia.data()[i][6]);
                }
                     listStatus = array_value;
                     listKetReject = array_ket;
                alert_confirm('Apakah Anda Yakin Ingin Melakukan Verifikasi?', function(){
                    confirm_verification_fiducia(branch_id_fdc,registration_no_fdc,status,listContract,listStatus,listKetReject);
                    if(error_server === false && flag_conf_verif === false){
                        $('#btn-new-dtl-pfdc').prop('disabled', true);
                        $('#btn-confirm-dtl-pfdc').prop('disabled', true);
                        $('#btn-create-dtl-pfdc').prop('disabled', true);
                        $('#btn-ho-verify-dtl-pfdc').prop('disabled', true);
                        $('#btn-search-dtl-pfdc').prop('disabled', true);
                        $('#btn-clear-dtl-pfdc').prop('disabled', false);
                        $('#btn-back-dtl-pfdc').prop('disabled', false);
                    }
                    error_server = false;
                });
            }
        }else{
            alert_error("Anda Tidak Mempunyai Akses Untuk Melakukan Verifikasi");
        }
        }else{
            alert_error("Verifikasi Pengajuan Fiducia Hanya Bisa Dilakukan Oleh HO");
        }
    }
});

//----------------------------------- BUTTON UPLOAD DOKUMEN FIDUCIA ---------------------------------------------//
$('#btn-upload-dtl-pfdc').on('click', function(){
    if(check_session()=== 'false'){
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }else{
        flag_role_pfdc = true;
        for(i = 0; i < role_pfdc.length; i++){
                        if(role_pfdc[i]['role_code'] === 'CREATE_FDC') {
                            flag_role_pfdc = false;
                            break;
                        }
        }
        if(!flag_role_pfdc){
            $('#modal-upload-dokumen-pfdc').modal('show');
        }else{
            alert_error("Upload Dokumen Hanya Bisa Dilakukan Oleh CAD");
        }
    }
});

//------------------------------ MODAL UPLOAD DOKUMEN -------------------------------------------------//
$('#btn-upload-document-modal-pfdc').on('click', function(){
    //debugger;
    //var application_no = $('#inp-application-no').val(); //ini belum ada ... pindah bawah?
    if ($('#file-pfdc').val()) {
        if($('#slc-upload-document-name').is(':disabled')){ // belum paham
            console.log('disable upload');
            ('#loading-ajax').show();
            upload_doc_file_pfdc_obj();
            //upload_doc_file_pad(kode_doc_obj, jenis_doc, application_no, doc_status, rowindex);                  
        }else{
            console.log('Masuk else upload');
            $('#loading-ajax').show();
            upload_doc_file_pfdc_obj();
        }
    }else{
        alert_error('Belum ada file yang dipilih');
    }
});

//----------------------------------- BUTTON UPLOAD DOKUMEN FIDUCIA PER ROW ---------------------------------------------//
// $('#tbl-detail-pfdc').on( 'click', '.btn-upload-document-pfdc', function () {

//     var sel_data = tbl_dtl_fiducia.row($(this).closest('tr')).data();
//     $('#kontrak-dokumen-pfdc').val(sel_data[6]);
//     $('#appno-dokumen-pfdc').val(sel_data[12]);
//     $('#nocus-dokumen-pfdc').val(sel_data[11]);
//     $('#namacus-dokumen-pfdc').val(sel_data[7]);
//     $('#modal-upload-dokumen-pfdc').modal('show');

// });

//----------------------------------- BUTTON VIEW DOKUMEN FIDUCIA PER ROW ---------------------------------------------//
$('#tbl-detail-pfdc').on('click', '.btn-view-dokument-pfdc', function(index){
    if(check_session()=== 'false'){
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }else{
        var sel_data = tbl_dtl_fiducia.row($(this).closest('tr')).data();
        var doc_id = '112';
        var doc_name = 'Dokumen Fiducia';
        var no_app = sel_data[12];
        var nama_cust = sel_data[7];
        var no_kontrak = sel_data[6];
        var cust_no = sel_data[11];
        get_follow_up_document_pfdc_image_dms("01", no_app, doc_id, doc_name, nama_cust, cust_no, no_kontrak);
    }  
});

//------------------------------------ CHECKALL VALIDASI ----------------------------------------------------------//
$('#tbl-detail-pfdc').on('click','.check-pfdc', function(index){
    var check_lenght = $('#tbl-detail-pfdc').find('.check-pfdc').filter(':checked').length;
    var length_data = tbl_dtl_fiducia.data().length;
    if(check_lenght == length_data){
        $('#inp-checkAll-fdc').prop('checked', true);
    }else{
        $('#inp-checkAll-fdc').prop('checked', false);
    }

});

//---------------------------- PENGATUR GAMBAR -------------------------------------------------------//

// Lidya, 17 Juli 2017, Fitur Zoom, Rotate dan Drag pada View Dokumen LiteDMS
imageHeight = $('#img-preview-pfdc img').height();
imageWidth = $('#img-preview-pfdc img').width();
$('#zoom-in').click(function(){
    $('#img-preview-pfdc img').css({
        height: '+=' + imageHeight * 0.1,
        width: '+=' + imageWidth * 0.1
    });
});


$('#zoom-out').click(function(){
    $('#img-preview-pfdc img').css({
        height: '-=' + imageHeight * 0.1,
        width: '-=' + imageWidth * 0.1
    });
});

$('#img-preview-pfdc').on('mousedown', 'img', function(event){
    var mousePos = { x: event.clientX, y: event.clientY };
    var _this = this;

    var scrollLeft = $(_this).parent().scrollLeft();
    var scrollTop = $(_this).parent().scrollTop();

    $(document).on('mousemove', function(event){
        var offsetX = event.clientX - mousePos.x;
        var offsetY = event.clientY - mousePos.y;

        $(_this).parent().scrollLeft(scrollLeft - offsetX);
        $(_this).parent().scrollTop(scrollTop - offsetY);
    });

    $(document).on('mouseup', function(){
        $(document).off("mousemove");     
    });
    return false;
});

var rotateDeg = 0;
$('#rotate').click(function() {
    rotateDeg += 90;
    if(rotateDeg == 360){
        rotateDeg = 0;
    }

    $('#img-preview-pfdc img').css({
        'transform': 'rotate('+ rotateDeg +'deg)', //standard ver
        '-webkit-transform': 'rotate('+ rotateDeg +'deg)', //Chrome
        '-moz-transform':'rotate('+ rotateDeg +'deg)', //Firefox
        '-o-transform': 'rotate('+ rotateDeg +'deg)', //Opera
        '-ms-transform': 'rotate('+ rotateDeg +'deg)' //Internet Explorer
    });
});

//--------------------- DRAG AND DROP UNTUK UPLOAD GAMBAR/FILE/DOKUMEN -------------------------------------//
$("html").on("dragover", function(e){
    e.preventDefault();
    e.stopPropagation();
    //$("h1").text("Drag here");
});

$("html").on("drop", function(e){ 
    e.preventDefault(); e.stopPropagation(); 
});

 // Drag enter
$('.upload-area-pfdc').on('dragenter', function(e){
    e.stopPropagation();
    e.preventDefault();
        //$("#drop-pad").text("Drop");
});

// Drag over
$('.upload-area-pfdc').on('dragover', function(e){
    e.stopPropagation();
    e.preventDefault();
        //$("#drop-pad").text("Drop");
    });

// Drop
$('.upload-area-pfdc').on('drop', function(e){
    //e.stopPropagation();
    //e.preventDefault();
    //$("#drop-pad").text("Upload");
    var file = e.originalEvent.dataTransfer.files;
    //var fd = new FormData();
    //fd.append('file', file[0]);
    upload_doc_file_pfdc_obj(file);
});

// Open file selector on div click
$("#uploadfile-pfdc").click(function(){
    $("#file-pfdc").click();
});

//------------------------------- FUNGSI UNTUK MENAMPILKAN STATUS FIDUCIA -------------------------------------------//
function get_status_fiducia(slc_id){
    var data = "";
    var status_fiducia_param = "";
    $.ajax({
        url: "Controller_pengajuan_fiducia/get_value_status_fiducia",
        type: 'POST',
        dataType: 'json',
        data:{
            "data" : data
        },
        success:function(response){
            if(response){
                try{
                    console.log(response);
                    $('<option/>').val('').html('-- PILIH STATUS --').appendTo(slc_id).addClass('form-control');
                    $.each(response['data'], function(i){
                        if(this['mst_value'] == '01'){
                            status_fiducia_param = 'BRANCH CREATE';
                        }else if(this['mst_value'] == '02'){
                            status_fiducia_param = 'BRANCH CONFIRM';
                        }else if(this['mst_value'] == '03'){
                            status_fiducia_param = 'HO VERIFY';
                        }
                        $(slc_id).append('<option value = "'+this['mst_value']+'">'+status_fiducia_param+'</option>')
                    });
                }catch(e){
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat " + e);
                }

            }else{
                alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");
            }
        },
        error:function(response){
            console.log(response);
            alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");
        }

    });
}  

// ------------------------------ FUNGSI PENGAJUAN FIDUCIA UNTUK MENCARI DATA YANG SUDAH REGISTRASI FIDUCIA ------------------------------ //
function post_data_regis_fdc(regis_start_date,regis_end_date,status,flag){
    //var data = 'logged_in_acma_pfdc';
    if(check_session()=== 'false'){
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }else{
        console.log(regis_start_date);
        console.log(regis_end_date);
        console.log(status);
        console.log(flag);

        $.ajax({
            url: "Controller_pengajuan_fiducia/post_regis_fdc",
            type: 'POST',
            dataType:'json',
            data:{
                "date_start": regis_start_date,
                "date_end": regis_end_date,
                "status": status
            },
            success: function(response){
                if(response){
                    try{
                        console.log(response);
                        var res = $.parseJSON(response);
                        console.log(res);
                        if(res['Data'].length < 1){
                            if(flag == ""){
                                tbl_pengajuan_fdc.clear().draw();
                                alert_info('Nomor Pengajuan Tidak Ditemukan Berdasarkan Tanggal yang Dicari');
                            }else{
                                tbl_pengajuan_fdc.clear().draw();
                            }
                        }else{
                            tbl_pengajuan_fdc.clear().draw();
                            var data = [];
                            $.each(res['Data'], function(index){

                                if(this['status'] === 'Branch Create'){
                                    var status_pfdc = "Branch Create";
                                }else if(this['status'] === 'Branch Confirm'){
                                    var status_pfdc = "Branch Confirm";
                                }else{
                                    var status_pfdc = "HO Verify";
                                }
                            
                                data.push([
                                    '<button class="btn-xs btn-primary btncls-dtl-pfdc" id="btn-tbl-pfdc'+index+'">DETAIL</button>',
                                    this['branch_id'],
                                    this['branch_name'],
                                    this['registration_no'],
                                    this['registration_date'],
                                    this['total_unit'],
                                    status_pfdc
                                ]);
                            });
                            tbl_pengajuan_fdc.rows.add(data).draw(false);
                        }
                    }catch(e){
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Galat " + e);
                    }
                }else{
                alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");
                }     
            },
            error: function(response){
                console.log(response);
                alert_error(response);
            }
        });
    }
};

//------------- FUNGSI MENAMPILKAN DATA FIDUCIA BERDASARKAN NOMOR PENGAJUAN ---------------------------------//
function post_data_dtl_regis_fdc(no_pengajuan_fdc,button){
    //debugger;
    if(no_pengajuan_fdc == null && button == "create" && aa == 8){
        alert_warning(pesan);
        flag_branch_create = true;
    }else if(no_pengajuan_fdc == null && button == "create" && aa != 1){
        alert_error(pesan);
        flag_branch_create = true;
    }else{
    $.ajax({
        url: "Controller_pengajuan_fiducia/post_data_dtl_regis_fdc",
        type: 'POST',
        dataType:'json',
        data:{
            "registration_no": no_pengajuan_fdc
        },
        success: function(response){
            console.log(response);
            var res = $.parseJSON(response);
            console.log(res);
            if(res){
                try{
                    
                    tbl_dtl_fiducia.clear().draw();
                    var data = [];
                    $.each(res['Data'], function(index){
                        var style_visible = '';
                        var ceklis_pfdc = '<i class="fa fa fa-check-circle stats-up-pfdc-c"  aria-hidden="true" id="ceklis-pfdc'+index+'" style="color:green" hidden></i><i class="fa fa-spinner fa-spin stats-load-pfdc-c"  aria-hidden="true" id="stats-load-pfdc'+index+'" hidden></i><i class="fa fa fa-times-circle stats-fail-pfdc-c"  aria-hidden="true" id="stats-fail-pfdc'+index+'" style="color:red" hidden></i>';
                        var lihat_document_fiducia = '<a id="btn-view-dokument-pfdc'+index+'" class="btn btn-transparent  btn-view-dokument-pfdc" title="Lihat Dokumen" data-placement="top" data-toggle="tooltip"  data-original-title="View"><i class="fa fa-file-image-o"  aria-hidden="true"></i></a>';
                        var aksi_document_fiducia = '<a class="btn btn-transparent  btn-upload-document-pfdc" title="Upload Dokumen" data-placement="top" data-toggle="tooltip"  id="btn-upload-document-pfdc'+index+'" data-original-title="Upload" style="visibility:'+ style_visible +';"><i class="fa fa-upload"  aria-hidden="true"></i></a>';

                        if( this['status'] === 'Branch Confirm'){
                            var select_status ='<select class="slc-status-dtl-fdc" id="slc-status-dtl-fdc'+index+'" type="selected" onchange="change_confirm_fdc('+index+')"><option value="02"> ' + this['status'] + '</option><option value="03"> HO Approve </option><option value="04"> HO Reject </option></select>';
                        }else{
                            var select_status = '<select class="slc-status-dtl-fdc" id="slc-status-dtl-fdc'+index+'" disabled type="selected" ><option value=""> ' + this['status'] + '</option><option value="03"> HO Approve </option><option value="04"> HO Reject </option></select>';
                        }

                        if(this['reject_desc'] !== null){
                            var keterangan_reject = '<input class="input-ket" id="inp-ket-fdc'+index+'" value="'+this['reject_desc']+'" disabled>';
                        }else{
                            var keterangan_reject = '<input class="input-ket" id="inp-ket-fdc'+index+'" disabled>';
                        }

                        data.push([
                            '<input class="check-pfdc-dtl" id="check-tbl-dtl-pfdc'+index+'" type="checkbox" disabled="">',
                            index + 1,
                            this['branch_id'],
                            this['branch_name'],
                            this['outlet_id'],
                            this['ppd_date'],
                            this['contract_no'],
                            this['customer_name'],
                            select_status,//'<select class="slc-status-dtl" id="slc-status-dtl'+index+'" type="selected" disabled="true"><option> ' + this['status'] + '</option><option value="HO_APPROVE"> HO APPROVE </option><option value="HO_REJECT"> HO REJECT </option></select>',
                            keterangan_reject,
                            lihat_document_fiducia + ceklis_pfdc,
                            this['customer_no'],
                            this['application_no']
                        ]);
                    });
                    tbl_dtl_fiducia.rows.add(data).draw(false);
                    $('#inp-checkAll-fdc').prop('checked',true);
                    $('#inp-checkAll-fdc').prop('disabled',true);
                    $('.check-pfdc-dtl').prop('checked', true);

                    if(button == "create"){
                        alert_info("Pengajuan Fiducia Berhasil Dengan No. Pengajuan "+no_pengajuan_fdc+" \n</br></br><b>Pastikan Kembali Untuk Upload File</b>" );
                    }else if(button == "confirm"){
                        alert_info("Konfirmasi Pengajuan Fiducia Berhasil Dengan No. Pengajuan " + no_pengajuan_fdc);
                    }
                                  
                }catch(e){
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat " + e);
                }
            }else{
                alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");
            }
        },
        error: function(response) {
            console.log(response);
            alert_error(response);
        }
    });
}
};

//------------------- FUNGSI UNTUK VALIDASI STATUS PENGAJUAN ------------------------------------//
function validatedtlfdc(status_validate){
    if(status_validate == "BRANCH CREATE"){
        $('#btn-new-dtl-pfdc').prop('disabled', true);
        $('#btn-ho-verify-dtl-pfdc').prop('disabled', true);
        $('#btn-create-dtl-pfdc').prop('disabled', true);
        $('#btn-search-dtl-pfdc').prop('disabled', true);
        $('#btn-clear-dtl-pfdc').prop('disabled', false);
        $('#btn-back-dtl-pfdc').prop('disabled', false);
        $('#btn-confirm-dtl-pfdc').prop('disabled', false);
        $('#btn-upload-dtl-pfdc').prop('disabled', false);
    }else if(status_validate == "BRANCH CONFIRM"){
        $('#btn-new-dtl-pfdc').prop('disabled', true);
        $('#btn-confirm-dtl-pfdc').prop('disabled', true);
        $('#btn-create-dtl-pfdc').prop('disabled', true);
        $('#btn-search-dtl-pfdc').prop('disabled', true);
        $('#btn-clear-dtl-pfdc').prop('disabled', false);
        $('#btn-back-dtl-pfdc').prop('disabled', false);
        $('#btn-upload-dtl-pfdc').prop('disabled', true);
        $('#btn-ho-verify-dtl-pfdc').prop('disabled', false);      
    }else{
        $('#btn-new-dtl-pfdc').prop('disabled', true);
        $('#btn-confirm-dtl-pfdc').prop('disabled', true);
        $('#btn-create-dtl-pfdc').prop('disabled', true);
        $('#btn-search-dtl-pfdc').prop('disabled', true);
        $('#btn-ho-verify-dtl-pfdc').prop('disabled', true);
        $('#btn-clear-dtl-pfdc').prop('disabled', false);
        $('#btn-back-dtl-pfdc').prop('disabled', false);
        $('#btn-upload-dtl-pfdc').prop('disabled', true);
    }
};

//------------------ FUNGSI CARI PENGAJUAN FIDUCIA YANG LOLOS PPD -------------------------------------//
function post_data_lolos_ppd_fdc(ppd_start_date,ppd_end_date,branch){
    if(check_session()=== 'false'){
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }else{
        $.ajax({
            url: "Controller_pengajuan_fiducia/post_filter_new_fdc",
            type: 'POST',
            dataType:'json',
            data:{
                "branch_id": branch,
                "date_start": ppd_start_date,
                "date_end": ppd_end_date
            },
            success: function(response){
                if(response){
                    try{
                        console.log(response);
                        var res = $.parseJSON(response);
                        console.log(res);

                        if(res['Data'].length < 1){
                            alert_info('Nomor Kontrak Tidak Ditemukan Berdasarkan Tanggal yang Dicari');
                            tbl_dtl_fiducia.clear().draw();
                            $('#btn-create-dtl-pfdc').prop('disabled', true);
                        }else{
                            $('#btn-create-dtl-pfdc').prop('disabled', false);
                            tbl_dtl_fiducia.clear().draw();
                            var data = [];
                            $.each(res['Data'], function(index){
                                var style_visible = '';
                                var lihat_document_fiducia = '<a id="btn-view-dokument-pfdc'+index+'" class="btn btn-transparent  btn-view-dokument-pfdc" title="Lihat Dokumen" data-placement="top" data-toggle="tooltip"  data-original-title="View"><i class="fa fa-file-image-o"  aria-hidden="true"></i></a>';                                             
                                var ceklis_pfdc = '<i class="fa fa fa-check-circle stats-up-pfdc-c"  aria-hidden="true" id="ceklis-pfdc'+index+'" style="color:green" hidden></i><i class="fa fa-spinner fa-spin stats-load-pfdc-c"  aria-hidden="true" id="stats-load-pfdc'+index+'" hidden></i><i class="fa fa fa-times-circle stats-fail-pfdc-c"  aria-hidden="true" id="stats-fail-pfdc'+index+'" style="color:red" hidden></i>';
                                var aksi_document_fiducia = '<a class="btn btn-transparent  btn-upload-document-pfdc" title="Upload Dokumen" data-placement="top" data-toggle="tooltip"  id="btn-upload-document-pfdc'+index+'" data-original-title="Upload" style="visibility:'+ style_visible +';"><i class="fa fa-upload"  aria-hidden="true"></i></a>';
                                console.log(this['branch_id']);
                                if( this['status'] === "null"){
                                    var status = "";
                                }else{
                                    var status = this['status'];
                                }
                                var disable = (this['flag_doc'] == "0")?"disabled":""; 
                                data.push([
                                    '<input class="check-pfdc" id="check-tbl-dtl-pfdc'+index+'" type="checkbox"'+disable+'>',
                                    index + 1,
                                    this['branch_id'],
                                    this['branch_name'],
                                    this['outlet_id'],
                                    this['ppd_date'],
                                    this['contract_no'],
                                    this['customer_name'],
                                    '<select class="slc-status" id="slc-status'+index+'" disabled style="width:100px"> <option value="'+status+'"></option></select>',
                                    '<input class="input-ket" id="inp-ket-fdc'+index+'" disabled>',
                                    lihat_document_fiducia + ceklis_pfdc,
                                    this['customer_no'],
                                    this['application_no']
                                ]);
                        //i++;
                            });
                            tbl_dtl_fiducia.rows.add(data).draw(false);
                        }
                    }catch(e){
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Galat" + e);
                    }
                }else{
                    alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");
                }          
            },
            error: function(response){
                console.log(response);
                alert_error(response);
            }
        });
    }
};

// ------------------------------ FUNGSI PENGAJUAN FIDUCIA UNTUK MELIHAT RIWAYAT DATA YANG SUDAH REGISTRASI FIDUCIA ------------------------------ //
function post_history_contract_fdc(){
    if(check_session()=== 'false'){
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }else{
        var cont_id = $('#cont-id-hist-pfdc').val();
        $.ajax({
            url: "Controller_pengajuan_fiducia/post_history_contract",
            type: 'POST',
            dataType:'json',
            data:{
                "contract_no": cont_id
            },
            success: function(response){
                if(response){
                    try {
                        console.log(response);
                        var res = $.parseJSON(response);
                        console.log(res);

                        if(res['Data'].length < 1){
                            tbl_history_fdc.clear().draw();
                            $('#notaris-id-name').prop('hidden', true);
                            alert_info('Nomor Kontrak Tidak Ditemukan');
                        }else{              
                            tbl_history_fdc.clear().draw();
                            var data = [];
                            $.each(res['Data'], function(index){
                                console.log(this['contract_id']);
                                console.log(this['created_date']);
                                console.log(this['history_desc']);

                                data.push([
                                    this['created_date'],
                                    this['history_desc']
                                ]);                       
                            });
                            tbl_history_fdc.rows.add(data).draw(false);
                            if(res['Data'][0].notaris_name != "null"){
                                $('#notaris-id-name').prop('hidden', false);
                                $('#notaris-name-fdc').val(res['Data'][0].notaris_name);
                            }else{
                                $('#notaris-id-name').prop('hidden', true);
                            }
                        }
                    }catch(e){
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Galat " + e);
                    }
                }else{
                    alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");
                }
            },
            error: function(response){
                console.log(response);
                alert_error(response);
            }
        });
    }
};

//----------------------------------------------- FUNGSI CREATE PENGAJUAN FIDUCIA --------------------------------------------------//
function create_pengajuan_fiducia(){
    var p_br_id = $('#slc-br-id-fdc').val();
    var listContract = [];    
    // var list_data = tbl_dtl_fiducia.data();

    // for(i = 0; i < list_data.length; i++){ 
    //     if($('#check-tbl-dtl-pfdc'+i).is(":checked")){
    //         listContract.push(list_data[i][6]);
    //     }
    // }
    // console.log(listContract);
    // console.log(p_br_id);

    var list_data = tbl_dtl_fiducia.$(":checkbox:checked", {
                        "page": "all"
                    });

    list_data.each(function(index, elem) { 
        listContract.push(tbl_dtl_fiducia.row($(elem).closest('tr')).data()[6]);
    });
    console.log(listContract);
    
    $.ajax({
        url: 'Controller_pengajuan_fiducia/create_data_pfdc',
        type: 'POST',
        dataType: 'json',
        data:{
            "branch_id": p_br_id,
            "contract_no": listContract
        },
        async: false,
        success: function(response){
            console.log(response);               
            if(response){
                //debugger;
                try{ 
                    if(response['errorConsole']){
                        alert_error(response['errorConsole']);
                        error_server = true;
                    }else{
                        data_no_pfdc = (response['reg_no']);
                        tgl_regis = (response['regis_date']);
                        pesan = (response['pesan']); 
                        aa = (response['aa']);
                    }         
                    //console.log(response['status']);
                }catch(e){
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Galat "+e);
                    error_server = true;
                }
            }else{
                alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");
                error_server = true;
            }        
        },
        error: function(response){
            console.log(response);
            alert_error(response);
            error_server = true;
        }
    });
};

//------------------- FUNGSI UNTUK KONFIRMASI DAN VERIFIKASI PENGAJUAN FIDUCIA ----------------------------//
function confirm_verification_fiducia(branch_id_fdc,registration_no_fdc,status,listContract,listStatus,listKetReject){
    console.log(registration_no_fdc);
    console.log(status);
    console.log(listContract);
    console.log(listStatus);
    console.log(listKetReject);
    console.log(branch_id_fdc);

    $.ajax({
        url: 'Controller_pengajuan_fiducia/save_data_pfdc',
        type: 'POST',
        dataType: 'json',
        data:{
            "p_br_id" : branch_id_fdc,
            "registration_no" : registration_no_fdc,
            "listContract": listContract,
            "stats" : status,
            "listStatus" : listStatus,
            "listKetReject" : listKetReject
        },
        async: false,
        success: function(response){
            //debugger;
            if(response){
                try{            
                    if(response['errorConsole']){
                        alert_error(response['errorConsole']);
                        flag_conf_verif = true;
                    }else{
                        console.log(response['aa']);
                        console.log(response['pesan']);
                    if(status == "03"){
                        if(response['aa'] == 0){
                            flag_conf_verif = true;
                            alert_warning(response['pesan']);
                        }else if(response['aa'] != 0 && response['aa'] != 1){
                            alert_error(response['pesan']);
                            flag_conf_verif = true;
                        }else{
                            $('.slc-status-dtl-fdc').prop('disabled', true);
                            $('.input-ket').prop('disabled',true);
                            alert_info("Verifikasi Pengajuan Fiducia Berhasil.");
                        }
                    }else{
                        if(response['aa'] == 0){
                            alert_warning(response['pesan']);
                            flag_conf_verif = true;
                        }else if(response['aa'] != 0 && response['aa'] != 1){
                            alert_error(response['pesan']);
                            flag_conf_verif = true;
                        }else{
                            console.log("Sukses Konfirmasi "+response['aa']);
                        }
                    }
                }
                   
                }catch(e){
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Galat "+e);
                    error_server = true;
                }
            }else{
                alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");
                error_server = true;
            }        
        },
        error: function(response){
            console.log(response);
            alert_error(response);
            error_server = true;
        }
    });
};

//---------------- FUNGSI UNTUK CHANGE STATUS KONFIRMASI KE HO APRROVE/REJECT --------------------//
function change_confirm_fdc(index){
    var value = $('#slc-status-dtl-fdc'+index+'').val();
    console.log(value);

    if( value == '04'){
        $('#inp-ket-fdc'+index+'').prop('disabled', false);
        console.log('reason '+index);
    }else{
        $('#inp-ket-fdc'+index+'').prop('disabled', true);
        $('#inp-ket-fdc'+index+'').val('');
        console.log('approve '+index);
    }
}

//----------------- FUNGSI UNTUK UPLOAD DOKUMEN KE LITE DMS ----------------------------------------//
function upload_doc_file_pfdc_obj(){
    upload_doc_file_pfdc_obj(null);
}

function upload_doc_file_pfdc_obj(doc){
    $('.stats-up-pfdc-c').hide();
    map_pfdc = new Object();
    var totalUploadpfdc = 0;
    var gagalUploadpfdc = 0;
    var berhasilUploadpfdc = 0;
    var tidakUploadpfdc = 0;
    var data_pfdc = tbl_dtl_fiducia.data();

    $('input:checkbox:checked', tbl_dtl_fiducia[0]).not('#inp-checkAll-fdc').each(function(){
        var get_contract = tbl_dtl_fiducia.row($(this).closest('tr')).data();
        var acb = get_contract[0].substring(get_contract[0].indexOf("id="),get_contract[0].indexOf("\" type"));
        var index_row = acb.substring(acb.indexOf("pfdc")+4);
        $('#ceklis-pfdc'+index_row).hide();
        $('#stats-fail-pfdc'+index_row).hide();
        $('#stats-load-pfdc'+index_row).css("display","inline-block");
        map_pfdc[get_contract[6]] = get_contract;
        totalUploadpfdc++; 
    });

    if(doc == null){
        doc = $('#file-pfdc').prop('files');
    }

    var flag_document_pfdc = true;

    for(var i = 0; i < doc.length; i++){
        var p =  $('#loading-ajax').show().promise();
        var z = 0;
        p = p.then(function(){
            var contract_pfdc = doc[i].name;
            contract_pfdc = contract_pfdc.substr(0, contract_pfdc.indexOf("_"));

            if(map_pfdc[contract_pfdc] == null){
                return false;
            }

            flag_document_pfdc = false;
            var row_data = map_pfdc[contract_pfdc];
            map_pfdc[contract_pfdc] = null;
            var acb = row_data[0].substring(row_data[0].indexOf("id="),row_data[0].indexOf("\" type"));
            var index_row = acb.substring(acb.indexOf("pfdc")+4);
            var formdata = new FormData();
            var no_kontrak = row_data[6]; //dari inputan
            var application_no = row_data[12]; //dari inputan
            var doc_status = 'R'; 
            var no_customer = row_data[11]; // dari inputan
            var nama_customer = row_data[7]; // dari inputan
            console.log('upload object');
            formdata.append("no_kontrak", no_kontrak);
            formdata.append("no_customer", no_customer);
            //formdata.append("jenis_doc",jenis_doc); //hardcode controller
            formdata.append("application_no",application_no);
            formdata.append("nama_customer", nama_customer);
            formdata.append("jenis_doc", "112");

            if(doc != null){
                formdata.append("file", doc[i]);
            }else{
                formdata.append("file", $('#file-pfdc').prop('files')[i]);
            }

            $.ajax({
                url: "Controller_dokumen/upload_doc_file",
                type: 'POST',
                cache: false,
                data: formdata,
                contentType: false,
                processData: false
            }).then(function(response){
            //debugger;
            console.log( 'done with ', z );     // log it
            console.log(response);
            // $('#ceklis-pfdc'+index_row).show();
            //     $('#stats-fail-pfdc'+index_row).hide();
            //     $('#stats-load-pfdc'+index_row).css("display","none");
            //     insert_doc_fiducia(no_kontrak,$('#slc-br-id-fdc').val());
            //     berhasilUploadpfdc++;
            if(response){
                try{
                    var datas = $.parseJSON(response);
            console.log(datas['message']);
            if(datas['message'] == "Success" && datas['lite_dms_message'].includes("success")){
                $('#ceklis-pfdc'+index_row).show();
                $('#stats-fail-pfdc'+index_row).hide();
                $('#stats-load-pfdc'+index_row).css("display","none");
                insert_doc_fiducia(no_kontrak,$('#slc-br-id-fdc').val());
                berhasilUploadpfdc++;
            }else{
                $('#ceklis-pfdc'+index_row).hide();
                $('#stats-fail-pfdc'+index_row).show();
                $('#stats-load-pfdc'+index_row).hide();
                gagalUploadpfdc++;
            }
            
            cek_proses_upload_pfdc(totalUploadpfdc,berhasilUploadpfdc,gagalUploadpfdc,tidakUploadpfdc);
            return true;
        }catch(e){
             $('#ceklis-pfdc'+index_row).hide();
                $('#stats-fail-pfdc'+index_row).show();
                $('#stats-load-pfdc'+index_row).hide();
                gagalUploadpfdc++;
                cek_proses_upload_pfdc(totalUploadpfdc,berhasilUploadpfdc,gagalUploadpfdc,tidakUploadpfdc);
            return true;
        }
                
        }else{
             $('#ceklis-pfdc'+index_row).hide();
                $('#stats-fail-pfdc'+index_row).show();
                $('#stats-load-pfdc'+index_row).hide();
                gagalUploadpfdc++;
                 cek_proses_upload_pfdc(totalUploadpfdc,berhasilUploadpfdc,gagalUploadpfdc,tidakUploadpfdc);
            return true;
        }
            
        }, 
        function(response){ 
            //debugger;
            $('#ceklis-pfdc'+index_row).hide();
            $('#stats-fail-pfdc'+index_row).show();
            $('#stats-load-pfdc'+index_row).hide();
            gagalUploadpfdc++;
            cek_proses_upload_pfdc(totalUploadpfdc,berhasilUploadpfdc,gagalUploadpfdc,tidakUploadpfdc);
            return $.Deferred().resolve();      // suppress request failure
        });
        });
        p.then(function(){                   // when all the actions are done
            $('#loading-ajax').hide(); 
            $('#modal-upload-dokumen-pfdc').modal('hide');   // when all done - fade out
        });
    }

    if(flag_document_pfdc){
        $('.stats-up-pfdc-c').hide();
        $('.stats-fail-pfdc-c').hide();
        $('.stats-load-pfdc-c').css("display","none");
        alert_error("File tidak ada yang cocok dengan nomor kontrak \n </br>Nama File Harus <b>NOMOR KONTRAK_NAMA DEBITUR</b>");
    }else{
        $.each( map_pfdc, function( key, nilai ){
            if(nilai != null){
                var tes = nilai;
                var acb = tes[0].substring(tes[0].indexOf("id="),tes[0].indexOf("\" type"));
                var check_id = acb.substring(acb.indexOf("pfdc")+4);
                $('#ceklis-pfdc'+check_id).hide();
                $('#stats-fail-pfdc'+check_id).show();
                $('#stats-load-pfdc'+check_id).hide();
                tidakUploadpfdc++;
                cek_proses_upload_pfdc(totalUploadpfdc,berhasilUploadpfdc,gagalUploadpfdc,tidakUploadpfdc);
                    //alert( key + ": " + value );
                }
            });    
    }
}

//--------------------------- FUNGSI UNTUK CEK PROSES UPLOAD KE LITE DMS ---------------------------------------------//
function cek_proses_upload_pfdc(totalUploadpfdc,berhasilUploadpfdc,gagalUploadpfdc,tidakUploadpfdc){
    if(totalUploadpfdc <= (berhasilUploadpfdc + gagalUploadpfdc + tidakUploadpfdc)){
        var proses_upload_pfdc = "Proses Upload telah selesai,  \n<br/> Kontrak yang Dipilih = "+totalUploadpfdc+" \n<br/> Berhasil = "+berhasilUploadpfdc+" \n<br/> Gagal = "+gagalUploadpfdc+" \n<br/> Tidak ada Kontrak yang cocok = "+tidakUploadpfdc;
        //debugger;
        alert_info(proses_upload_pfdc);
    }
}

//------------------------------- FUNGSI UNTUK MENAMPILKAN DOKUMEN DARI LITE DMS -----------------------------------//
function get_follow_up_document_pfdc_image_dms(flag, no_aplikasi, doc_id, doc_name, nama_cust, cust_no, no_kontrak){
    if (flag == "02" || no_kontrak == null || no_kontrak == 'undefined'){
        no_kontrak = "";
    } 

    if (flag == "03") {
        $url_dms = 'dms_view_img_1';
    } else {
        $url_dms = 'dms_view_img_2';
    }

    if (cust_no == null) {
        cust_no = "";
    }

    console.log(no_kontrak);
    console.log(cust_no);
    console.log(no_aplikasi);
    console.log(doc_id);
    console.log(nama_cust);
    
    $.ajax({
        url:'Controller_dokumen/'+$url_dms,
        type:'POST',
        data:{
            appl_no: no_aplikasi,
            doc_id: doc_id,
            no_kontrak: no_kontrak,
            nama_customer : nama_cust,
            no_customer : cust_no
        },
        success: function(response, error){
            if (response == 'Image Not Found') {
                if(no_kontrak == "" || no_kontrak == "null" || no_kontrak == null){
                    console.log('CEK DMS FASE 1');
                    get_follow_up_document_pfdc_image_dms("03", no_aplikasi, doc_id, doc_name, nama_cust, cust_no, "");
                }else{
                    console.log('TIDAK ADA NO KONTRAK');
                    get_follow_up_document_pfdc_image_dms("02", no_aplikasi, doc_id, doc_name, nama_cust, cust_no, "");
                }
            }else if(response == 'Image All DMS Not Found'){
                alert_info('Dokumen Belum Diupload');
            }else{
                if(error.includes('failed to open stream')){
                    alert_info(message_timeout_searchparam, function(){
                        console.log('timeout search/param');
                    });
                }else{
                    console.log("DATA FOUND");
                    var hasil = $.parseJSON(response);
                    var file_name = hasil.file_name.split(".");
                    var ext = file_name[1];

                    if(response.includes('.pdf') || response.includes('.tif') || response.includes('.tiff')){
                        console.log('PDF/TIFF');
                        console.log(hasil.file_name); 
                        window.open(base_url + 'Controller_dokumen/download_file/'+hasil.file_name,'_blank');
                    }else{
                        console.log(ext);
                        file_name_global = hasil.file_name;
                        base64_global = hasil.base64;
                        $('#img-dokumen-pfdc').prop('src', 'data:image/'+ext+';base64, '+hasil.base64);
                        $('#img-preview-pfdc img').css({
                            'transform':'rotate(0deg)',
                            'height':'350px',
                            'width':'auto'
                        });
                        $('#nama-dokumen-pfdc').html(doc_name);
                        $('#modal-view-dokumen-pfdc').modal('show');
                    }
                }
            }
        },
        error:function(response){
            console.log(response);    
            alert_error('Koneksi Terputus, Tidak Terhubung Dengan Server');
        }
    });
}

//==================================== FUNGSI UNTUK INSERT DOKUMEN FIDUCIA ===================================//
function insert_doc_fiducia(no_kontrak,branch_code){
    $.ajax({
        url: 'Controller_pengajuan_fiducia/insert_document_fiducia',
        type: 'POST',
        dataType: 'json',
        data:{
            "branch_id": branch_code,
            "contract_no": no_kontrak
        },
        success: function(response){
            console.log(response);               
            if(response){
                //debugger;
                try{ 
                    
                }catch(e){
                    $('#loading-ajax').hide();
                    console.log(e);
                    alert_error("Galat "+e);
                }
            }else{
                alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");
            }        
        },
        error: function(response){
            console.log(response);
            alert_error(response);
        }
    });
}