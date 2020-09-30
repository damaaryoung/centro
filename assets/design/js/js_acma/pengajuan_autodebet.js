//if (localStorage.getItem("menu_alias_am") === "PJAD") {
    $(document).ready(function(){

        setInterval(function() {
           if(check_session() == "false"){
            alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
                localStorage.clear();
                window.location.href = base_url + "Controller_login/login_view";
            });
        }
    }, 300 * 1000);

    });


    var tbl_pengajuan_autodebet = $('#tbl-pengajuan-autodebet').DataTable({
      "paging": false,
      "scrollY": "360px",
      "scrollCollapse": true  
  });

    var tbl_dtl_autodebet = $('#tbl-detail-autodebet').DataTable({
        "paging": false,
        "scrollY": "360px",
        "scrollCollapse": true,
        "columnDefs": [
        {
            "targets": [ 11 ],
            "visible": false,
            "searchable": false
        },
        {
            "targets": [ 12 ],
            "visible": false,
            "searchable": false
        }
        ]
    }
    );
    var tbl_dtl_autodebet_unsort = tbl_dtl_autodebet.rows().data().order(1,"asc");
    var tbl_history_autodebet = $('#tbl-history-autodebet').DataTable();
    var slc_status_dtl = "";
    var arr_chk_p_cont_no_autodebet = [];
    var arr_chk_p_stats_autodebet = [];
    var arr_chk_p_ket_autodebet = [];
    var data_selected_autodebet = "";
    var data_no_autodebet = "";
    var arr_selected_autodebet = [];
    var cont_no = "";
    var p_reg_no = "";
    var reg_no = "";
    var stats = "";
    var p_menu = "";
    var p_button= "";
    var p_ipaddr = "";
    var check_lenght;
    var tgl_regis = "";
    var arr_tgl_ppd = [];
    var tgl_min_ppd_autodebet = "";
    var tgl_max_ppd_autodebet = "";
    var mapselected = new Object();
    var role_padbt;
    var branch_code_autodebet = $('#inp-branch-id').val();
    var branch_name_autodebet = $('#inp-branch-name').val();
    var status_autodebet = $('#inp-status-autodebet').val();

    console.log('test');

// $('#slc-status-autodebet').one('click',function() {
// get_data_status('#slc-status-autodebet');
// });


if($('#detail-pengajuan-autodebet').length) {
    branch_code_autodebet = $('#inp-branch-id').val();
    branch_name_autodebet = $('#inp-branch-name').val();
    // console.log(branch_code_autodebet);
    if(branch_code_autodebet !== '0000') {
        // console.log('masuk');
        $('<option/>').val(branch_code_autodebet).html(branch_code_autodebet + ' - ' + branch_name_autodebet).appendTo('#slc-br-id-autodebet');
    } else {
        get_data_branch('#slc-br-id-autodebet');
    }
}
//--------------------------------------------- GET ROLE CODE -------------------------------------------//
if (!localStorage.getItem('role_user_padbt')) {
    $.ajax({
        url : "Controller_home/get_detail_user",
        cache : false,
        success : function(response){
            if(response){
                try{
                    console.log(response);
                    localStorage.setItem('role_user_padbt', response);
                    role_padbt = $.parseJSON(localStorage.getItem('role_user_padbt'));
                    console.log(role_padbt);
                    console.log('asb sukses');
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
    role_padbt = $.parseJSON(localStorage.getItem('role_user_padbt'));
    console.log(role_padbt);
    console.log('asb else');
}

$('#btn-create-dtl-autodebet').prop('disabled', true);

// ------------------------------ BUTTON SEARCH CONTRACT ------------------------------ //
$('#btn-search-pengajuan-autodebet').click(function() {
    var regis_start_date = $('#inp-tgl-awal').val();
    var regis_end_date = $('#inp-tgl-akhir').val();
    var status = $('#slc-status-autodebet').val();



    if ( $('#slc-status-autodebet option:selected').val()=='02') {
        localStorage.setItem("detail", "BCR");
    }else{
        localStorage.setItem("detail", "");
    }

    if (regis_start_date === '' || regis_end_date === '') {
        alert_info("Silahkan Pilih Periode Pengajuan autodebet");
        $('#div-tgl-awal-autodebet').addClass('has-error');
        $('#div-tgl-akhir-autodebet').addClass('has-error');
    }else if (status === '' || status == null || status =="00") {
        alert_info("Silahkan Pilih Status Terlebih Dahulu.");
        $('#list-status-autodebet').addClass('has-error');
    } else {
        $('#div-tgl-awal-autodebet').removeClass('has-error');
        $('#div-tgl-akhir-autodebet').removeClass('has-error');
        $('#list-status-autodebet').removeClass('has-error');
        post_data_regis_autodebet();
    }
});

// ------------------------------ BUTTON NEW CONTRACT ------------------------------ //
$('#btn-new-pengajuan-autodebet').click(function() {
    var flagrole =true;

    for(var i = 0 ; i < role_padbt.length ; i++){
        if(role_padbt[i]['role_code'] === 'BR_CRT_ADBT'){
            flagrole = false;
            break;
        }
    }

    if(!flagrole){
        p_br_id = $('#inp-branch-id').val();
    //p_br_id = "0104";
    $('#detail-pengajuan-autodebet').show();
    $('#search-pengajuan-autodebet').hide();
    $('#btn-clear-dtl-autodebet').click();

    $('#btn-new-dtl-autodebet').prop('disabled', true);
    $('#btn-ho-verify-dtl-autodebet').prop('disabled', true);
    $('#btn-confirm-dtl-autodebet').prop('disabled', true);
    $('#btn-upload-autodebet').prop('disabled', true);
    

    $('#btn-create-dtl-autodebet').prop('disabled', false);
    $('#btn-search-dtl-autodebet').prop('disabled', false);
    $('#btn-clear-dtl-autodebet').prop('disabled', false);
    $('#btn-back-dtl-autodebet').prop('disabled', false);
    if(p_br_id == "0000"){
        $('#slc-br-id-autodebet').prop('disabled', false);
    }else{
        $('#slc-br-id-autodebet').val(p_br_id);
        $('#slc-br-id-autodebet').prop('disabled', true);
    }
} else {
    alert_error("Tombol baru hanya untuk CAD");
}
});

// ------------------------------ BUTTON CLEAR CONTRACT ------------------------------ //
$('#btn-clear-pengajuan-autodebet').on("click", function () {
    $('#inp-tgl-awal').data("DateTimePicker").clear();
    $('#inp-tgl-akhir').data("DateTimePicker").clear();
    $('#slc-status-autodebet').val('');
    $('#tbl-pengajuan-autodebet').val('');
    tbl_pengajuan_autodebet.clear().draw();
});

// ------------------------------ BUTTON CLEAR CONTRACT ------------------------------ //
$('#btn-clear-dtl-autodebet').on("click", function () {
    $('#inp-tgl-awal-dtl').data("DateTimePicker").clear();
    $('#inp-tgl-akhir-dtl').data("DateTimePicker").clear();
    $('#inp-regis-no-autodebet').val('');
    $('#inp-tgl-regis-dtl').val('');
    p_br_id = $('#inp-branch-id').val();
    $('#slc-br-id-autodebet').val(p_br_id);
    // $('#slc-br-id-autodebet').val('');
    $('#tbl-detail-autodebet').val('');
    $('#btn-ho-verify-dtl-autodebet').prop('disabled', true);
    $('#btn-confirm-dtl-autodebet').prop('disabled', true);
    $('#btn-create-dtl-autodebet').prop('disabled', true);
    tbl_dtl_autodebet.clear().draw();
    $('#btn-new-dtl-autodebet').prop('disabled', false);
    arr_chk_p_cont_no_autodebet = [];
    arr_chk_p_stats_autodebet = [];
    arr_chk_p_ket_autodebet = [];

    $('#inp-checkAll').prop('checked', false);
    $('#inp-checkAll').prop('disabled', false);



});

// ------------------------------ BUTTON HISTORY CONTRACT ------------------------------ //
$('#btn-history-contract-pengajuan-autodebet').on("click", function () {
    $('#modal-autodebet').modal('show');

    $('#btn-cek-hst-autodebet').on("click", function () {
        var cont_id = $('#inp-cont-id').val();
        if (cont_id === '') {
            alert_info("Silahkan Masukkan Nomor Kontrak");
            $('#div-cont-id').addClass('has-error');
        } else {
            $('#div-cont-id').removeClass('has-error');
            post_history_contract();
        }
    });
    //$('#detail-pengajuan-autodebet').hide();
});

// ------------------------------ BUTTON CARI FORM DETAIL AUTODEBIT ------------------------------ //
$('#btn-search-dtl-autodebet').click(function() {
    var ppd_start_date = $('#inp-tgl-awal-dtl').val();
    var ppd_end_date = $('#inp-tgl-akhir-dtl').val();
    var branch = $('#slc-br-id-autodebet').val();
    tbl_dtl_autodebet.clear().draw();
    
    $('#btn-upload-autodebet').prop("disabled", true);

    if (branch === '') {
        alert_info("Silahkan Pilih Cabang Terlebih Dahulu.");
        $('#div-slc-br-id-autodebet').addClass('has-error');
    } else if (ppd_start_date === '' || ppd_end_date === '') {
        alert_info("Silahkan Pilih Periode PPD");
        $('#div-inp-tgl-awal-dtl').addClass('has-error');
        $('#div-inp-tgl-akhir-dtl').addClass('has-error');
    } else {
        $('#div-inp-tgl-awal-dtl').removeClass('has-error');
        $('#div-inp-tgl-akhir-dtl').removeClass('has-error');
        $('#div-slc-br-id-autodebet').removeClass('has-error');
        $('#inp-checkAll').prop("checked",false);
        $('#inp-checkAll').prop("disabled",false);
        post_data_lolos_ppd();
    }

    $('#btn-new-dtl-autodebet').prop('disabled', true);
    $('#btn-ho-verify-dtl-autodebet').prop('disabled', true);
    $('#btn-confirm-dtl-autodebet').prop('disabled', true);

    $('#btn-create-dtl-autodebet').prop('disabled', false);
    $('#btn-search-dtl-autodebet').prop('disabled', false);
    $('#btn-clear-dtl-autodebet').prop('disabled', false);
    $('#btn-back-dtl-autodebet').prop('disabled', false);
});

$('#btn-new-dtl-autodebet').click(function() {


    var flagrole =true;

    for(var i = 0 ; i < role_padbt.length ; i++){
        if(role_padbt[i]['role_code'] === 'BR_CRT_ADBT'){
            flagrole = false;
            break;
        }
    }


    if(!flagrole){
        p_br_id = $('#inp-branch-id').val();
        $('#btn-new-dtl-autodebet').prop('disabled', true);
        $('#btn-ho-verify-dtl-autodebet').prop('disabled', true);
        $('#btn-confirm-dtl-autodebet').prop('disabled', true);
        $('#btn-create-dtl-autodebet').prop('disabled', false);
        $('#btn-search-dtl-autodebet').prop('disabled', false);
        $('#btn-clear-dtl-autodebet').prop('disabled', false);
        $('#btn-back-dtl-autodebet').prop('disabled', false);
        $('#btn-upload-autodebet').prop('disabled', true);
        if(p_br_id == "0000"){
            $('#slc-br-id-autodebet').prop('disabled', false);
        } else {
            $('#slc-br-id-autodebet').val(p_br_id);
            $('#slc-br-id-autodebet').prop('disabled', true);
        }
    } else {
        alert_error("Tombol baru hanya untuk CAD");
    }
});

// ------------------------------ BUTTON PENGAJUAN CABANG AUTODEBIT ------------------------------ //
$('#btn-create-dtl-autodebet').click(function() {
    p_button = 'CREATE';
    check_lenght = $('#tbl-detail-autodebet').find('.check-autodebet').filter(':checked').length;
    p_br_id  = $('#inp-branch-id').val();

    var flagrole =true;

    for(var i = 0 ; i < role_padbt.length ; i++){
        if(role_padbt[i]['role_code'] === 'BR_CRT_ADBT'){
            flagrole = false;
            break;
        }
    }

    if(p_br_id == '0000') {
        alert_error("Pengajuan hanya dilakukan oleh cabang");
    } if(flagrole){

        alert_error("Hanya CAD yang bisa membuat pengajuan");
    }else{
        create_pengajuan_autodebet();
        
        if($('#tbl-detail-autodebet').find('.check-autodebet').filter(':checked').length !== 0) {

            //alert_info("Pengajuan autodebet Berhasil Dengan No. Pengajuan " + data_no_autodebet);

            post_data_dtl_regis_autodebet(1);

            $('#btn-new-dtl-autodebet').prop('disabled', true);
            $('#btn-ho-verify-dtl-autodebet').prop('disabled', true);
            $('#btn-create-dtl-autodebet').prop('disabled', true);

            $('#btn-confirm-dtl-autodebet').prop('disabled', false);
            $('#btn-search-dtl-autodebet').prop('disabled', false);
            $('#btn-clear-dtl-autodebet').prop('disabled', false);
            $('#btn-back-dtl-autodebet').prop('disabled', false);

            $(document).ready(function() {
                var checkboxes = $('#inp-checkAll');

            // Check all checkboxes
            var chk_all = checkboxes.prop('checked', true );
            checkboxes.prop('disabled', true );

            // Check if they are all checked and alert a message or, if not, alert something else.
            if (checkboxes.filter(':checked').length == checkboxes.length) {
                if (chk_all !== false) {
                    data_selected_autodebet = tbl_dtl_autodebet.row().data();
                    p_br_id = data_selected_autodebet[2];
                    data_no_autodebet = data_no_autodebet;
                    tgl_regis = tgl_regis;
                    console.log('checked');        
                    console.log(data_selected_autodebet);
                    console.log(p_br_id);
                    console.log(data_no_autodebet);
                    console.log(tgl_regis);

                    if(data_no_autodebet.includes("Nomor")){
                        alert_error(data_no_autodebet);
                    } else {
                        $('#slc-br-id-autodebet').prop('disabled', true);
                        $('#slc-br-id-autodebet').val(p_br_id);

                        $('#inp-regis-no-autodebet').val(data_no_autodebet);
                        
                        $('#tgl-regis-dtl-autodebet').val(tgl_regis);
                    }
                }
            }
        });
        }
        else {
            //alert_error("pengajuan gagal");
            alert_error('Pilih data yang akan diajukan terlebih dahulu !');
        }}
    });

// ------------------------------ BUTTON KONFIRMASI CABANG AUTODEBET ------------------------------ //
$('#btn-confirm-dtl-autodebet').click(function() {
    button = 'CONFIRM';
    p_reg_no = $('#inp-regis-no-autodebet').val();
    tgl_regis = $('#tgl-regis-dtl-autodebet').val();
    p_br_id  = $('#inp-branch-id').val();
    stats = '02';
    listStat = [];
    var flagrole =true;

    for(var i = 0 ; i < role_padbt.length ; i++){
        if(role_padbt[i]['role_code'] === 'BR_CRM_ADBT'){
            flagrole = false;
            break;
        }
    }

    if(p_br_id == '0000') {
        alert_error("Konfirmasi hanya dilakukan oleh cabang");
    } else if(flagrole) {
        alert_error("Konfirmasi hanya dilakukan oleh ADH");
    }else{
        insertAutodebet(0);
        if(reg_no !== 0 && p_reg_no != '') {
            alert_info("Konfirmasi Pengajuan autodebet Berhasil Dengan No. Pengajuan " + p_reg_no);

            data_no_autodebet = $('#inp-regis-no-autodebet').val();
            post_data_dtl_regis_autodebet();
            $('#btn-new-dtl-autodebet').prop('disabled', true);
            $('#btn-confirm-dtl-autodebet').prop('disabled', true);
            $('#btn-create-dtl-autodebet').prop('disabled', true);
            $('#btn-upload-autodebet').prop('disabled', true);

            $('#btn-ho-verify-dtl-autodebet').prop('disabled', false);
            $('#btn-search-dtl-autodebet').prop('disabled', false);
            $('#btn-clear-dtl-autodebet').prop('disabled', false);
            $('#btn-back-dtl-autodebet').prop('disabled', false);

            $(document).ready(function() {
                var checkboxes = $(':checkbox');
                var chk_all = checkboxes.prop('checked', true );
                checkboxes.prop('disabled', true );
                if (checkboxes.filter(':checked').length == checkboxes.length) {
                    if (chk_all !== false) {
                        data_selected_autodebet = tbl_dtl_autodebet.row().data();
                        p_br_id = data_selected_autodebet[2];
                        check_lenght = data_selected_autodebet.length;
                        console.log(check_lenght)
                        console.log('checked');        
                        console.log(data_selected_autodebet);
                        console.log(p_br_id);
                        console.log(data_no_autodebet);
                        console.log(tgl_regis);

                        $('#slc-br-id-autodebet').prop('disabled', true);
                        $('#slc-br-id-autodebet').val(p_br_id);
                        $('#inp-regis-no-autodebet').val(data_no_autodebet);
                        $('#tgl-regis-dtl-autodebet').val(tgl_regis);
                    }
                }


                check_lenght = $('#tbl-detail-autodebet tr').length - 1; 
                console.log(check_lenght);

                $.each(check_lenght, function(index) {
                    $('#slc-status-dtl'+index+'').change(function () {
                        var value = $('#slc-status-dtl'+index+'').val();
                        if ( value == '04') {
                            $('#inp-ket'+index+'').prop('disabled', false);
                            console.log('false');
                        } else {
                            $('#inp-ket'+index+'').prop('disabled', true);
                            console.log('true');
                        }
                    });
                });

            });
        }
} // ttp else

});
var value ;
function tes(index){
 value = $('#slc-status-dtl'+index+'').val();
 console.log(value);
 if ( value == '04') {
    $('#inp-ket'+index+'').prop('disabled', false);
    console.log('false'+index);
} else {
    $('#inp-ket'+index+'').prop('disabled', true);
    $('#inp-ket'+index+'').val('');
    console.log('true'+index);
}
inp_ket_reject = $('#inp-ket'+index+'').val();
}

function tes2(index){
 inp_ket_reject = $('#inp-ket'+index+'').val();
}

// ------------------------------ BUTTON VERIFIKASI HO AUTODEBIT ------------------------------ //
$('#btn-ho-verify-dtl-autodebet').click(function() {
    p_button = 'VERIFY';
    p_reg_no = $('#inp-regis-no-autodebet').val();
    p_br_id = $('#inp-branch-id').val();
    check_lenght = $('#tbl-detail-autodebet tr').length - 1; 

    var flagrole =true;

    for(var i = 0 ; i < role_padbt.length ; i++){
        if(role_padbt[i]['role_code'] === 'HO_VRF_ADBT'){
            flagrole = false;
            break;
        }
    }

    
    if(p_br_id !== '0000'){
        p_br_id = $('#slc-br-id-autodebet').val();
    }
    slc_status_dtl = $('.slc-status-dtl').val();
    $('.slc-status-dtl').change();
    
    stats = value;

    console.log($('#slc-status-dtl0').val());
    //console.log(inp_ket_reject);
    
    if(flagrole){
        alert_error("Anda tidak punya previlege");
    } else if (p_reg_no !== 0 && p_br_id === '0000') {
        if (value !== '03' && value !== '04') {
            alert_info("Silahkan Pilih Status Pengajuan Terlebih Dahulu");
        } else if (value === '04' && inp_ket_reject === '') {
            // inp_ket_reject.addClass('has-error');
            // $('inp_ket_reject').addClass('has-error');
            // inp_ket_reject.val() = '';
            alert_info("Silahkan Isi Keterangan Reject Terlebih Dahulu");
        } else if (value === '03' && inp_ket_reject != '') {
            alert_info("Keterangan Reject Harus Kosong");
            inp_ket_reject.val() = '';
        } else {
            alert_info("Verifikasi Pengajuan autodebet Berhasil.");
            insertAutodebet(1);

            $('#btn-new-dtl-autodebet').prop('disabled', true);
            $('#btn-confirm-dtl-autodebet').prop('disabled', true);
            $('#btn-create-dtl-autodebet').prop('disabled', true);
            $('#btn-ho-verify-dtl-autodebet').prop('disabled', true);
            $('#btn-upload-autodebet').prop('disabled', true);
            
            $('#btn-search-dtl-autodebet').prop('disabled', false);
            $('#btn-clear-dtl-autodebet').prop('disabled', false);
            $('#btn-back-dtl-autodebet').prop('disabled', false);
        }

    } else {
        alert_error("Verifikasi Pengajuan autodebet Hanya Bisa Dilakukan Oleh HO");
    }
});

// ------------------------------ BUTTON KEMBALI AUTODEBIT ------------------------------ //
$('#btn-back-dtl-autodebet').on("click", function () {
    $('#search-pengajuan-autodebet').show();
    $('#detail-pengajuan-autodebet').hide();
    tbl_pengajuan_autodebet.draw();
    $('#btn-search-pengajuan-autodebet').click();
});

// ------------------------------ FUNCTION PENGAJUAN AUTODEBIT UNTUK MENCARI DATA YANG LOLOS PPD ------------------------------ //
function post_data_lolos_ppd() {
    var format_tgl_1 = $('#inp-tgl-awal-dtl').val();
    var format_tgl_2 = $('#inp-tgl-akhir-dtl').val();

    var inp_br_id = $('#slc-br-id-autodebet').val();
    var inp_tgl_dtl_awal = new Date(format_tgl_1).format('yyyy-mm-dd');
    var inp_tgl_dtl_akhir = new Date(format_tgl_2).format('yyyy-mm-dd');
    var data = tbl_dtl_autodebet.rows().data();

    console.log(format_tgl_1);
    console.log(format_tgl_2);
    console.log(inp_br_id);
    console.log(inp_tgl_dtl_awal);
    console.log(inp_tgl_dtl_akhir);

    $.ajax({
        url: "Controller_pengajuan_autodebet/post_filter_new_autodebet",
        type: 'POST',
        dataType:'json',
        data:{
            "branch_id": inp_br_id,
            "date_start": inp_tgl_dtl_awal,
            "date_end": inp_tgl_dtl_akhir
        },

        success: function(response) {
            // console.log("parameter berhasil di get");
            console.log(response);
            var res = $.parseJSON(response);
            console.log(res);
            if(res['errorConsole']){
                alert_error('data tidak ditemukan');
            } else {
                if(response) {
                    try {
                        tbl_dtl_autodebet.clear().draw();
                        var datat = [];
                        if(res['Data'].length > 0){
                            $.each(res['Data'], function(index) {
                                var cekbox = '';
                                var style_visible = '';
                                var lihat_document = '<a id="btn-view-dokument-pad'+index+'" class="btn btn-transparent  btn-view-dokument-pad" title="Lihat Dokumen" data-placement="top" data-toggle="tooltip"  data-original-title="View"><i class="fa fa-file-image-o"  aria-hidden="true"></i></a>';
                                var aksi_document = '<a class="btn btn-transparent  btn-upload-document-pad" title="Upload Dokumen" data-placement="top" data-toggle="tooltip"  id="btn-upload-document-pad'+index+'" data-original-title="Upload" style="visibility:'+ style_visible +';"><i class="fa fa-upload"  aria-hidden="true"></i></a>';
                                var ejay = '<i class="fa fa fa-check-circle stats-up-pad-c"  aria-hidden="true" id="stats-up-pad'+index+'" style="color:green" hidden> </i> <i class="fa fa-spinner fa-spin stats-load-pad-c"  aria-hidden="true" id="stats-load-pad'+index+'" hidden> </i> <i class="fa fa fa-times-circle stats-fail-pad-c"  aria-hidden="true" id="stats-fail-pad'+index+'" style="color:red" hidden> </i>';
                                console.log(this['branch_id']);
                                if (this['flag_doc'] === "1") {
                                    cekbox = '<input class="check-autodebet" id="check-tbl-dtl-autodebet'+index+'" type="checkbox">'
                                    
                                }else{
                                    cekbox = '<input class="check-autodebet" id="check-tbl-dtl-autodebet'+index+'" type="checkbox" disabled>';
                                }
                                datat.push([
                                    cekbox,
                                    index + 1,
                                    this['branch_id'],
                                    this['mufnet'],
                                    this['cont_no'],
                                    this['cust_name'],
                                    this['acc_no'],
                                    this['acc_name'],
                                    this['status'],
                                    this['reject_desc'],
                                    lihat_document + ejay,
                                    this['appno'],
                                    this['nocus']
                                ]);
                            });
                            tbl_dtl_autodebet.rows.add(datat).draw(false);

                            if (localStorage.getItem('detail') == 'BCR') {
                                $('.slc-status-dtl').val("03");
                            } //DARI FZ

                            tbl_dtl_autodebet_unsort = tbl_dtl_autodebet.rows().data().order(1,"asc");
                        } else {
                            alert_error("Data tidak ditemukan");
                        }
                    }catch(e){
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Galat" + e);
                    }
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });
};

// ------------------------------ BUTTON PENGAUJUAN ULANG ------------------------------ //
$('#btn-pengajuan-ulang').click(function() {
    var cont_no = $('#inp-cont-id').val();
    var user = $('#slc-br-id-autodebet').val();
    var br_id = $('#inp-branch-id').val();
    if (br_id === '0000' ) {
        if (cont_no === ""){
         alert_info("Silahkan Masukkan Nomor Kontrak");
         $('#div-cont-id').addClass('has-error');
     } else {
        //let isSure = confirm("Apakah anda yakin?");

        alert_confirm('Anda yakin  mengganti status cont '+cont_no+' menjadi pengajuan ulang ?',function(){
           post_pengajuan_ulang();

       });

    }
} else { alert_error("Pengajuan Ulang Hanya Bisa Dilakukan Oleh HO");}
});


// ------------------------------ FUNCTION PENGAJUAN AUTODEBIT UNTUK INSERT DATA REGISTRASI AUTODEBIT ------------------------------ //
function insertAutodebet(fl) {

    var branch_id = $('#slc-br-id-autodebet').val();
    var listContract = [];
    var listStat = [];
    var listKet = [];

    var pages = tbl_dtl_autodebet.page();
    var limits = tbl_dtl_autodebet.page.len();
    var table_leng = tbl_dtl_autodebet.rows().data().length ;
    var search  = tbl_dtl_autodebet.search();

    tbl_dtl_autodebet.search("");
    tbl_dtl_autodebet.page.len(table_leng);
    tbl_dtl_autodebet.draw();


    if(check_lenght === 0) {
        alert_error('Pilih data yang akan diajukan terlebih dahulu !');
    } else {
        if(arr_chk_p_cont_no_autodebet.length <= 0 && fl ==1){
            for (i = 0; i < check_lenght; i++) { 
                listStat.push($('#slc-status-dtl'+i+'').val());
                listKet.push($('#inp-ket'+i+'').val());
            } 
        }else {
            for (i = 0; i < arr_chk_p_cont_no_autodebet.length; i++) { 
                listContract.push(arr_chk_p_cont_no_autodebet[i]);
                listStat.push(arr_chk_p_stats_autodebet[i]);
                listKet.push(arr_chk_p_ket_autodebet[i]);
            }
        }
        console.log(check_lenght);
        console.log(listContract);
        console.log(branch_id);

        $.ajax({
            url: 'Controller_pengajuan_autodebet/save_data_autodebet',
            type: 'POST',
            dataType: 'json',
            data:
            {

                "branch_id" : branch_id,
                "cont_no": listContract,
                "stats":stats,
                "listStat":listStat,
                "reg_no":p_reg_no,
                "reject_desc":listKet


            },
            async: false,

            success: function(response) {
                console.log(response);
                tgl_regis = (response['tgl_regis']);
                console.log(tgl_regis);        
            },
            error: function(response) {
                console.log(response);
            }
        })
    }

    tbl_dtl_autodebet.search(search);
    tbl_dtl_autodebet.page.len(limits);
    tbl_dtl_autodebet.draw();
    tbl_dtl_autodebet.page( pages ).draw( 'page' );

};

// ------------------------------ FUNCTION CREATE PENGAJUAN AUTODEBET ------------------------------ //
function create_pengajuan_autodebet() {
    var branch_id = $('#slc-br-id-autodebet').val();
    var listContract = [];

    var pages = tbl_dtl_autodebet.page();
    var limits = tbl_dtl_autodebet.page.len();
    var table_leng = tbl_dtl_autodebet.rows().data().length ;
    var search  = tbl_dtl_autodebet.search();
    arr_chk_p_cont_no_autodebet = [];
    tbl_dtl_autodebet.search("");
    tbl_dtl_autodebet.page.len(table_leng);
    tbl_dtl_autodebet.draw();


    if($('#tbl-detail-autodebet').find('.check-autodebet').filter(':checked').length === 0) {
        alert_error('Pilih data yang akan diajukan terlebih dahulu !');
    } else {
        var tercentang = $('#tbl-detail-autodebet').find('.check-autodebet').filter(':checked')
        for(var k=0 ; k<tercentang.length;k++ ){
            var check_id = (tercentang[k].id).substring(23);
            pushkeArraypad(check_id);
        }

        for (i = 0; i < arr_chk_p_cont_no_autodebet.length; i++) { 
            listContract.push(arr_chk_p_cont_no_autodebet[i]);
        }

        console.log(listContract);
        console.log(branch_id);

        $.ajax({
            url: 'Controller_pengajuan_autodebet/save_data_create_pengajuan_autodebet',
            type: 'POST',
            dataType: 'json',
            data:
            {

                "branch_id" : branch_id,
                "cont_no": listContract


            },
            async: false,

            success: function(response) {
                console.log(response);
                $('#btn-upload-autodebet').prop('disabled', false);
                data_no_autodebet = (response['reg_no']);
                console.log(data_no_autodebet);
                tgl_regis = (response['tgl_regis']);
                console.log(tgl_regis);
                if (response) {
                    try{ 
                        if(response['reg_no'].includes("Nomor Kontrak")){
                            alert_error(response['reg_no']);
                        } else {          
                            alert_info(response['Status']+" dengan no pengajuan "+data_no_autodebet+" Jangan lupa upload dokumen");
                        }
                    }
                    catch(e){
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error(e);
                    }
                }        
            },
            error: function(response) {
                console.log(response);
            }
        })
    }

    tbl_dtl_autodebet.search(search);
    tbl_dtl_autodebet.page.len(limits);
    tbl_dtl_autodebet.draw();
    tbl_dtl_autodebet.page( pages ).draw( 'page' );
};

// ------------------------------ FUNCTION PENGAJUAN AUTODEBIT UNTUK MENCARI DATA YANG SUDAH REGISTRASI AUTODEBET ------------------------------ //
function post_data_regis_autodebet() {
 var format_tgl_1 = $('#inp-tgl-awal').val();
 var format_tgl_2 = $('#inp-tgl-akhir').val();
 var slc_status = $('#slc-status-autodebet').val();

 var inp_br_id = $('#slc-br-id-autodebet').val();
 var inp_tgl_awal = new Date(format_tgl_1).format('yyyy-mm-dd');
 var inp_tgl_akhir = new Date(format_tgl_2).format('yyyy-mm-dd');
 var data = tbl_pengajuan_autodebet.rows().data();

 $.ajax({
    url: "Controller_pengajuan_autodebet/post_regis_autodebet",
    type: 'POST',
    dataType:'json',
    data:{
        "date_start": inp_tgl_awal,
        "date_end": inp_tgl_akhir,
        "status": slc_status
    },

    success: function(response) {
        console.log(response);
        var res = $.parseJSON(response);
        console.log(res);
        if(response) {
            try {
                tbl_pengajuan_autodebet.clear().draw();
                var datat = [];
                $.each(res['Data'], function(index) {
                    var  mydate = new Date(this['registration_date']);
                    $('#inp-tgl-dummy').data("DateTimePicker").date(mydate);
                    var str = $('#inp-tgl-dummy').val();
                    datat.push([
                        '<button class="btn-xs btn-primary btncls-dtl-autodebet" id="btn-tbl-autodebet'+index+'">DETAIL</button>',
                        this['branch_id'],
                        this['registration_no'],
                        str,
                        this['total_unit'],
                        this['status'],
                        '<select id="index'+index+'" disabled> <option> ' + this['status'] + '</option> '+index+'</select>'
                        ]);
                });

                tbl_pengajuan_autodebet.rows.add(datat).draw(false);

                if(tbl_pengajuan_autodebet.rows().data().length < 1 ){
                    alert_error("Data Tidak ditemukan");
                }
            }
            catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat main " + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });

};



// ------------------------------ Function data yang sudah registrasi AUTODEBIT hdr melalui btn-detail ------------------------------ //
function post_data_dtl_regis_autodebet(fl) {
    var select_status;
    console.log(data_no_autodebet);
    $.ajax({
        url: "Controller_pengajuan_autodebet/post_dtl_autodebet",
        type: 'POST',
        dataType:'json',
        // async: false,
        data:{
            "cont_no": data_no_autodebet
        },

        success: function(response) {
            console.log(response);
            var res = $.parseJSON(response);
            console.log(res);
            //$('#btn-upload-autodebet').prop('disabled', true);
            if(res) {
                try {
                    tbl_dtl_autodebet.clear().draw();
                    var datat = [];
                    $.each(res['Data'], function(index) {
                        if (localStorage.getItem('detail') == 'BCR') {
                            select_status ='<select class="slc-status-dtl" id="slc-status-dtl'+index+'" type="selected" onchange="tes('+index+')"><option> ' + this['status'] + '</option><option value="03" selected> HO Approve </option><option value="04"> HO Reject </option></select>';

                        } else{
                            select_status = '<select class="slc-status-dtl" id="slc-status-dtl'+index+'" disabled type="selected" ><option> ' + this['status'] + '</option><option value="03"> HO Approve </option><option value="04"> HO Reject </option></select>';

                        }
                        if(this['reject_desc'] == null || this['reject_desc'] == 'null'){

                            this['reject_desc'] = '';
                        }

                        // $('.slc-status-dtl').change();
                        var style_visible = '';
                        var lihat_document = '<a id="btn-view-dokument-pad'+index+'" class="btn btn-transparent  btn-view-dokument-pad" title="Lihat Dokumen" data-placement="top" data-toggle="tooltip"  data-original-title="View"><i class="fa fa-file-image-o"  aria-hidden="true"></i></a>';
                        var aksi_document = '<a class="btn btn-transparent  btn-upload-document-pad" title="Upload Dokumen" data-placement="top" data-toggle="tooltip"  id="btn-upload-document-pad'+index+'" data-original-title="Upload" style="visibility:'+ style_visible +';"><i class="fa fa-upload"  aria-hidden="true"></i></a>';
                        var ejay = '<i class="fa fa fa-check-circle stats-up-pad-c"  aria-hidden="true" id="stats-up-pad'+index+'" style="color:green" hidden> </i> <i class="fa fa-spinner fa-spin stats-load-pad-c"  aria-hidden="true" id="stats-load-pad'+index+'" hidden> </i> <i class="fa fa fa-times-circle stats-fail-pad-c"  aria-hidden="true" id="stats-fail-pad'+index+'" style="color:red" hidden> </i>';
                        console.log(this['branch_id']);
                        datat
                        datat.push([
                            '<input class="check-autodebet-dtl" id="check-tbl-dtl-autodebet'+index+'" type="checkbox" disabled="" checked>',
                            index + 1,
                            this['branch_id'], 
                            this['mufnet'],
                            this['cont_no'],
                            this['cust_name'],
                            this['acc_no'],
                            this['acc_name'],
                            select_status,
                            
                            '<input class="input-ket" id="inp-ket'+index+'" value="'+this['reject_desc']+'" disabled onchange="tes2('+index+')">',
                            lihat_document + ejay,
                            this['appno'],
                            this['nocus']
                            ]);

                        //$('#check-tbl-dtl-autodebet'+index).prop('checked', true);
                        
                    });
                    $('.slc-status-dtl').change();

                    tbl_dtl_autodebet.rows.add(datat).draw(false);


                    if(tbl_dtl_autodebet.rows().data().length < 1 ){
                        alert_info("Data Tidak ditemukan");
                    } else {
                        $('#btn-search-dtl-autodebet').prop('disabled', true);
                    }
                }
                catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    if(fl!=1){
                        alert_error("Galat " + e);
                    }
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });
};

// ------------------------------ FUNCTION PENGAJUAN AUTODEBIT UNTUK MELIHAT RIWAYAT DATA YANG SUDAH REGISTRASI AUTODEBIT ------------------------------ //
function post_history_contract() {
    var inp_cont_id = $('#inp-cont-id').val();
    console.log(inp_cont_id);
    $.ajax({
        url: "Controller_pengajuan_autodebet/post_history_contract",
        type: 'POST',
        dataType:'json',
        // async: false,
        data:{
            "cont_id": inp_cont_id
        },

        success: function(response) {
            console.log(response);
            var res = $.parseJSON(response);
            console.log(res);
            if(response) {
                try {
                    tbl_history_autodebet.clear().draw();
                    var datat = [];
                    $.each(res['Data'], function(index) {
                        var  mydate = new Date(this['created_date']);
                        $('#inp-tgl-dummy').data("DateTimePicker").date(mydate);
                        var str = $('#inp-tgl-dummy').val();
                        datat.push([
                            str,
                            this['history_desc']
                            ]);
                        //i++;
                    });

                    tbl_history_autodebet.rows.add(datat).draw(false);

                    if(tbl_history_autodebet.rows().data().length < 1 ){
                        alert_error("Data Tidak ditemukan");
                    }
                }
                catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat " + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });
};

// ------------------------------ FUNCTION PENGAJUAN ULANG AUTODEBET ------------------------------ //
function post_pengajuan_ulang() {
    var cont_no = $('#inp-cont-id').val();
    console.log(cont_no);
    $.ajax({
        url: "Controller_pengajuan_autodebet/save_data_pengajuan_ulang",
        type: 'POST',
        dataType:'json',
        // async: false,
        data:{
            "cont_no": cont_no
        },

        success: function(response) {

            console.log(response);
            var res = response;
            if (res['Status']){
                alert_info("PENGAJUAN ULANG BERHASIL");
            }else{
                alert_error("TIDAK BISA MELAKUKAN PENGAJUAN ULANG ! ");
            }
            
            console.log(res);
            if(response) {
                try {
                    tbl_history_autodebet.clear().draw();
                    var datat = [];

                    $.each(res['Data'], function(index) {
                        console.log(this['cont_no']);
                        var  mydate = new Date(this['created_date']);
                        $('#inp-tgl-dummy').data("DateTimePicker").date(mydate);
                        var str = $('#inp-tgl-dummy').val();

                        datat.push([
                            str,
                            this['history_desc']
                            ]);
                    });

                    tbl_history_autodebet.rows.add(datat).draw(false);
                }
                catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("KONTRAK TIDAK DITEMUKAN ! error => "+e);
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });
};



function validatedtl() {
    var sts = $('#slc-status-autodebet')[0];
    if(sts.selectedIndex == 0) {
        alert_info('Status belum dipilih');
    }
    else if(sts.selectedIndex == 1) {
        $('#btn-new-dtl-autodebet').prop('disabled', true);
        $('#btn-ho-verify-dtl-autodebet').prop('disabled', true);
        $('#btn-create-dtl-autodebet').prop('disabled', true);
        $('#btn-upload-autodebet').prop('disabled', false);

        $('#btn-confirm-dtl-autodebet').prop('disabled', false);
        $('#btn-search-dtl-autodebet').prop('disabled', false);
        $('#btn-clear-dtl-autodebet').prop('disabled', false);
        $('#btn-back-dtl-autodebet').prop('disabled', false);
        $('.slc-status-dtl').prop('disabled', true);
        $('.input-ket').prop('disabled', true);
        $('#slc-status-dtl').prop('disabled', true);
        $('#input-ket').prop('disabled', true);
    }
    else if(sts.selectedIndex == 2) {
        $('#btn-new-dtl-autodebet').prop('disabled', true);
        $('#btn-confirm-dtl-autodebet').prop('disabled', true);
        $('#btn-create-dtl-autodebet').prop('disabled', true); 
        $('#btn-upload-autodebet').prop('disabled', true);

        $('#btn-ho-verify-dtl-autodebet').prop('disabled', false);
        $('#btn-search-dtl-autodebet').prop('disabled', false);
        $('#btn-clear-dtl-autodebet').prop('disabled', false);
        $('#btn-back-dtl-autodebet').prop('disabled', false);
        $('#slc-status-dtl').prop('disabled', false);
        $('#input-ket0').prop('disabled', false);
    }
    else if(sts.selectedIndex == 3) {
        $('#btn-new-dtl-autodebet').prop('disabled', true);
        $('#btn-confirm-dtl-autodebet').prop('disabled', true);
        $('#btn-create-dtl-autodebet').prop('disabled', true);
        $('#btn-ho-verify-dtl-autodebet').prop('disabled', true);
        $('#btn-upload-autodebet').prop('disabled', true);

        $('#btn-search-dtl-autodebet').prop('disabled', false);
        $('#btn-clear-dtl-autodebet').prop('disabled', false);
        $('#btn-back-dtl-autodebet').prop('disabled', false);
    }
    else {
        var selectedText = sts.options[sts.selectedIndex].text;
    }
};



// ------------------------------ FUNGSI UNTUK CHECK PADA TABEL ------------------------------ //
$('#tbl-pengajuan-autodebet').on( 'click', '.btncls-dtl-autodebet', function () {
    data_dtl_selected_autodebet = tbl_pengajuan_autodebet.row($(this).closest('tr')).data();
    p_br_id = data_dtl_selected_autodebet[1];
    data_no_autodebet = data_dtl_selected_autodebet[2];
    tgl_regis = data_dtl_selected_autodebet[3];
    $('#detail-pengajuan-autodebet').show();
    $('#search-pengajuan-autodebet').hide();
    
    validatedtl();

    post_data_dtl_regis_autodebet();

    $(document).ready(function() {
        var checkboxes = $(':checkbox');
        var slc_sts_dtl = $('.slc-status-dtl');

            // Check all checkboxes
            var chk_all = checkboxes.prop('checked', true );
            checkboxes.prop('disabled', true );
            slc_sts_dtl.prop('disabled', false);

        });

    $('#slc-br-id-autodebet').prop('disabled', true);
    $('#slc-br-id-autodebet').val(p_br_id);
    $('#inp-regis-no-autodebet').val(data_no_autodebet);
    $('#inp-tgl-regis-dtl').val(tgl_regis);
});

$('#tbl-detail-autodebet').on('click', 'tr', function(){
  data_cont = tbl_dtl_autodebet.rows().data();
});

$('#tbl-detail-autodebet').on( 'click', '.btn-upload-document-pad', function () {
    var sel_data = tbl_dtl_autodebet.row($(this).closest('tr')).data();
    $('#kontrak-dokumen-pad').val(sel_data[4]);
    $('#appno-dokumen-pad').val(sel_data[11]);
    $('#nocus-dokumen-pad').val(sel_data[12]);
    $('#namacus-dokumen-pad').val(sel_data[5]);
    $('#modal-upload-dokumen-pad').modal('show');
});

$('#btn-upload-autodebet').on( 'click', function () {

    var flagrole =true;

    for(var i = 0 ; i < role_padbt.length ; i++){
        if(role_padbt[i]['role_code'] === 'BR_CRT_ADBT'){
            flagrole = false;
            break;
        }
    }

    if(flagrole){
        alert_error('Hanya CAD yang bisa upload !')
    } else{
     $('#modal-upload-dokumen-pad').modal('show');
 }
});


$('#tbl-detail-autodebet').on('click', '.btn-view-dokument-pad', function(index) {
    var sel_data = tbl_dtl_autodebet.row($(this).closest('tr')).data();
    var doc_id = '113';
    var doc_name = 'File';
    var no_app = sel_data[11];
    var nama_cust = sel_data[5];
    var no_kontrak = sel_data[4];
    var cust_no = sel_data[12];
    get_follow_up_document_image_dms("01", no_app, doc_id, doc_name, nama_cust, cust_no, no_kontrak);  
});

// $('#tbl-detail-autodebet').on('click', '.check-autodebet', function() {

//     var check_id = (this.id).substr(23, 1);
//     console.log(check_id);
//     data_cont = tbl_dtl_autodebet.rows().data();
//     console.log(data_cont);
//     var p_cont = data_cont[check_id];
//     console.log(p_cont);
//     cont_no = p_cont[3];
//     var stt = p_cont[7]; 
//     var ket = p_cont[8];

//     var unchk_arr = arr_chk_p_cont_no_autodebet.indexOf(cont_no);

//     if(this.checked) {
//         arr_chk_p_cont_no_autodebet.push(cont_no);
//         arr_chk_p_stats_autodebet.push(stt);
//         arr_chk_p_ket_autodebet.push(ket);
//     } else {
//         arr_chk_p_cont_no_autodebet.splice(unchk_arr, 1);
//         arr_chk_p_stats_autodebet.splice(unchk_arr, 1);
//         arr_chk_p_ket_autodebet.splice(unchk_arr, 1);
//     }

// });

function pushkeArraypad(check_id) {

    //var check_id = (this.id).substr(23, 1);
    console.log(check_id);
    data_cont = tbl_dtl_autodebet_unsort;
    console.log(data_cont);
    var p_cont = data_cont[check_id];
    console.log(p_cont);
    cont_no = p_cont[4];
    var stt = p_cont[8]; 
    var ket = p_cont[9];


    arr_chk_p_cont_no_autodebet.push(cont_no);
    arr_chk_p_stats_autodebet.push(stt);
    arr_chk_p_ket_autodebet.push(ket);


}


// ------------------------------ Validasi Tanggal tidak boleh melebihi 30 hari ------------------------------ //

$('#inp-tgl-awal').datetimepicker({
  format: 'DD-MMM-YYYY',
  allowInputToggle: true,
  maxDate: new Date()
}).on("dp.change", function(e){
    var date = e.date;
    var dDate = date._d;
    var new_date = new Date(dDate);
    new_date.setDate(new_date.getDate() + 30);

    $('#inp-tgl-akhir').data("DateTimePicker").minDate(dDate);

    if (new_date > new Date(today)) {
        new_date = new Date(today);
    }

    $('#inp-tgl-akhir').data("DateTimePicker").maxDate(new_date);
    $('#inp-tgl-akhir').data("DateTimePicker").date(new_date);
});

$('#inp-tgl-akhir').datetimepicker({
  format: 'DD-MMM-YYYY',
  allowInputToggle: true,
  maxDate: new Date()
});

// FORM DETAIL

$('#inp-tgl-awal-dtl').datetimepicker({
  format: 'DD-MMM-YYYY',
  allowInputToggle: true,
  maxDate: new Date()
}).on("dp.change", function(e){
    var date = e.date;
    var dDate = date._d;
    var new_date = new Date(dDate);
    new_date.setDate(new_date.getDate() + 30);

    $('#inp-tgl-akhir-dtl').data("DateTimePicker").minDate(dDate);

    if (new_date > new Date(today)) {
        new_date = new Date(today);
    }

    $('#inp-tgl-akhir-dtl').data("DateTimePicker").maxDate(new_date);
    $('#inp-tgl-akhir-dtl').data("DateTimePicker").date(new_date);
});

$('#inp-tgl-akhir-dtl').datetimepicker({
  format: 'DD-MMM-YYYY',
  allowInputToggle: true,
  maxDate: new Date()
});

$('#inp-tgl-dummy').datetimepicker({
  format: 'DD-MMM-YYYY',
});

$('#inp-checkAll').click(function(){
    if ($('#inp-checkAll').is(':checked')){
        for (var i = 0; i < tbl_dtl_autodebet.rows().data().length; i++) {
            if(!$('#check-tbl-dtl-autodebet'+i).is(':disabled')){
                $('#check-tbl-dtl-autodebet'+i).prop('checked', true); 
            }
        }
    }else{
        $(':checkbox').prop('checked', false);
    }
}); 

function get_data_status(slc_id){
    var data = '';
    $.ajax({
      url : base_url+"Controller_pengajuan_autodebet/get_data_status",
      type : 'POST',
      dataType : 'json',
      data: {
        "data": data
    },
    success : function(response){
        console.log(response);
        //var ress = JSON.parse(response);
        if(JSON.stringify(response).includes('Timeout')){
            alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
        }
        else if(response){
          try{
            $(slc_id).html('');
            $('<option/>').val('').html('- PILIH STATUS -').appendTo(slc_id).addClass('form-control');
            console.log(response);
            $.each(response, function(list){
              // console.log("hoi"+list);
              // console.log("hoi2"+this.length);
              $.each(this, function(list2) { 
                console.log("hoi"+this);
                $(slc_id).append('<option value="'+ this.mst_value+'">'+this.mst_desc+'</option>');
            });
          });

            $(slc_id).val(localStorage.getItem("status_desc"));
        } catch(e) {
            $('#loading-ajax').hide();
            console.log(e);
            alert_info("Terjadi Kesalahan => "+e);
        }
        }//if response

    },
    error: function(response){
        alert_info('Jaringan Terputus, Silahkan Refresh Halaman');
        console.log(response);
    }
});
};




//------------------ UNDER  DEVELOPMENT --------------------------
$('#btn-upload-document-modal-pad').on('click', function() {
    //var application_no = $('#inp-application-no').val(); //ini belum ada ... pindah bawah?
    if ($('#file').val()) {
                if ($('#slc-upload-document-name').is(':disabled')) { // belum paham
                    console.log('disable upload');
                    upload_doc_file_pad_obj();
                    //upload_doc_file_pad(kode_doc_obj, jenis_doc, application_no, doc_status, rowindex);

                    
                } else {
                    console.log('Masuk else upload');
                    upload_doc_file_pad_obj();
                }
            } else {
                alert_error('Belum ada file yang dipilih');
            }

        })

//----------------------- UPLOAD TO LITE DMS -----------------------------

// function getBase64(file) {
//    var reader = new FileReader();
//    reader.readAsDataURL(file);
//    reader.onload = function () {
//      console.log(reader.result);
//    };
//    reader.onerror = function (error) {
//      console.log('Error: ', error);
//    };
// }

function upload_doc_file_pad_obj(){
    upload_doc_file_pad_obj(null);
}

function upload_doc_file_pad_obj(doc){
    //$('.stats-up-pad-c').hide();
    
    mapselected = new Object();
    var totalUpload = 0;
    var gagalUpload = 0;
    var berhasilUpload = 0;
    var tidakUpload = 0;
    var dataz = tbl_dtl_autodebet.rows().data();
    $('#loading-ajax').show();
    $('input:checkbox:checked', tbl_dtl_autodebet[0]).not("#inp-checkAll").each(function() {
        var tes = tbl_dtl_autodebet.row($(this).closest('tr') ).data();
        var ids = tes[0].substring(tes[0].indexOf("id="),tes[0].indexOf("\" type"));

        var check_id = ids.substring(ids.indexOf("bet") + 3);
        $('#stats-up-pad'+check_id).hide();
        $('#stats-fail-pad'+check_id).hide();
        $('#stats-load-pad'+check_id).css("display","inline-block");
        mapselected[tes[4]] = tes;
        totalUpload++;
    });

    
    if(doc == null){
        doc = $('#file').prop('files');
    }

    
    var flagtaada = true;
    for(var z =0;z<doc.length;z++){

        var i = 0;
        var p =  $('#loading-ajax').show().promise();

        p = p.then( function() {
            var no_kontz = doc[z].name;
            no_kontz= no_kontz.substring(0, no_kontz.indexOf("_"));
            if(mapselected[no_kontz] == null) {
                return false;
            }
            flagtaada = false;
            var sel_dataz = mapselected[no_kontz];
            mapselected[no_kontz] = null;
            var ids = sel_dataz[0].substring(sel_dataz[0].indexOf("id="),sel_dataz[0].indexOf("\" type"));
            var check_id = ids.substring(ids.indexOf("bet") + 3);
            var application_no = sel_dataz[11];
            var nama_customer = sel_dataz[5];
            var no_kontrak = sel_dataz[4];
            var no_customer = sel_dataz[12];

            var br_id = $('#slc-br-id-autodebet').val();

            var formdata = new FormData();
            var doc_status = 'R'; 
            console.log('upload object');
            formdata.append("no_kontrak", no_kontrak);
            formdata.append("no_customer", no_customer);
    //formdata.append("jenis_doc",jenis_doc); //hardcode controller
    formdata.append("application_no",application_no);
    if(doc != null){
        formdata.append("file", doc[z]);

    } else {
        formdata.append("file", $('#file').prop('files')[z]);
    }
    //formdata.append("flag",flag);
    formdata.append("nama_customer", nama_customer);
    formdata.append("jenis_doc", "113");
    
    

    //var urlsoap = $('#inp-soap-config').val();
    //var userRef = $('#nik-login').val();
    //var ffile = getBase64(doc);
    //var task_kontrak = no_kontrak+'_001';
    //$ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
    //var file_name = '113' + '_' + application_no + '_' + task_kontrak + '.' + 'png';


    // var pl = new SOAPClientParameters();

    // var gass= {
    //     TypeDoc : 'AGR',
    //     JenisDocCode : '113',
    //     NamaCustomer : nama_customer,
    //     NoCustomer : no_customer,
    //     NoApplication : application_no,
    //     NoAgreement : no_kontrak,
    //     NoAsset : '',
    //     NoMou : '',
    //     FileName : file_name,
    //     ByteImage : 123,
    //     UserName : 'admin',
    //     Rolename : 'UD',
    //     HostName : '123',
    //     UserReference : userRef
    // };

    // SOAPClient.invoke(urlsoap,'UploadDocConfins',pl,true);

    // $.soap({
    // url: urlsoap,
    // method: 'UploadDocConfins',                           // service operation name
    //                                                 // 1) will be appended to url if appendMethodToURL=true
    //                                                 // 2) will be used for request element name when building xml from JSON 'params' (unless 'elementName' is provided)
    //                                                 // 3) will be used to set SOAPAction request header if no SOAPAction is specified
    // appendMethodToURL: false,                        // method name will be appended to URL defaults to true
    // SOAPAction: 'UploadDocConfins',                           // manually set the Request Header 'SOAPAction', defaults to the method specified above (optional)
    // soap12: false,

    // data: {
    //     TypeDoc : 'AGR',
    //     JenisDocCode : '113',
    //     NamaCustomer : nama_customer,
    //     NoCustomer : no_customer,
    //     NoApplication : application_no,
    //     NoAgreement : no_kontrak,
    //     NoAsset : '',
    //     NoMou : '',
    //     FileName : file_name,
    //     ByteImage : null,
    //     UserName : 'admin',
    //     Rolename : 'UD',
    //     HostName : '123',
    //     UserReference : userRef
    // },
    
    // success: function (soapResponse) {
    //     debugger;
    //     alert('asd');
    //     // do stuff with soapResponse
    //     // if you want to have the response as JSON use soapResponse.toJSON();
    //     // or soapResponse.toString() to get XML string
    //     // or soapResponse.toXML() to get XML DOM
    // },
    // error: function (SOAPResponse) {
    //     alert('ror');
    //     debugger;
    //     // show error
    // }
    // });

    
    
    $.ajax({
        url: base_url + "Controller_dokumen/upload_doc_file",
        type: 'POST',
        cache: false,
        data: formdata,
        contentType: false,
        processData: false,
    }).then(
    function(data) {
        if (data) {
            
            try{
                var data1 = JSON.parse(data);
                if (data1.error == false && data1.message == "Success") {
                        console.log( 'done with ', i );     // log it
                        $('#stats-up-pad'+check_id).show();
                        $('#stats-fail-pad'+check_id).hide();
                        $('#stats-load-pad'+check_id).css("display","none");
                        berhasilUpload++;
                        cek_proses_upload_pad(totalUpload,berhasilUpload,gagalUpload,tidakUpload);
                        insertDocAutodebit(no_kontrak,br_id);
                        return true;
                    }else{
                        $('#stats-up-pad'+check_id).hide();
                        $('#stats-fail-pad'+check_id).show();
                        $('#stats-load-pad'+check_id).css("display","none");
                        gagalUpload++;
                        cek_proses_upload_pad(totalUpload,berhasilUpload,gagalUpload,tidakUpload);
                        return $.Deferred().resolve();      // suppress request failure
                    } 
                }catch(e){
                    $('#stats-up-pad'+check_id).hide();
                    $('#stats-fail-pad'+check_id).show();
                    $('#stats-load-pad'+check_id).css("display","none");
                    gagalUpload++;
                    cek_proses_upload_pad(totalUpload,berhasilUpload,gagalUpload,tidakUpload);
                    return $.Deferred().resolve();
                }
            }else{
                $('#stats-up-pad'+check_id).hide();
                $('#stats-fail-pad'+check_id).show();
                $('#stats-load-pad'+check_id).css("display","none");
                gagalUpload++;
                cek_proses_upload_pad(totalUpload,berhasilUpload,gagalUpload,tidakUpload);
                return $.Deferred().resolve();
            }
            
        }, 

        function(data) { 
            console.log( 'gal with ', i );
            $('#stats-up-pad'+check_id).hide();
            $('#stats-fail-pad'+check_id).show();
            $('#stats-load-pad'+check_id).css("display","none");
            gagalUpload++;
            cek_proses_upload_pad(totalUpload,berhasilUpload,gagalUpload,tidakUpload);
            return $.Deferred().resolve();      // suppress request failure
        } 
        );
} );



    p.then( function() {        // when all the actions are done
            //setTimeout(function(){               
                $('#loading-ajax').hide(); 
            //}, 3000 );                            // paksa keluar loading ajax selama 3 detik
            $('#modal-upload-dokumen-pad').modal('hide');   // when all done - fade out
        } );

}

if(flagtaada){
    $('.stats-up-pad-c').hide();
    $('.stats-fail-pad-c').hide();
    $('.stats-load-pad-c').css("display","none");
    alert_error("File tidak ada yang cocok dengan nomor kontrak");
} else {

    $.each( mapselected, function( key, value ) {
        if(value != null){
            var tes = value;
            var ids = tes[0].substring(tes[0].indexOf("id="),tes[0].indexOf("\" type"));
            var check_id = ids.substring(ids.indexOf("bet") + 3);
            $('#stats-up-pad'+check_id).hide();
            $('#stats-fail-pad'+check_id).show();
            $('#stats-load-pad'+check_id).hide();
            tidakUpload++;
        //alert( key + ": " + value );
        cek_proses_upload_pad(totalUpload,berhasilUpload,gagalUpload,tidakUpload);
    }
});
}


}

function cek_proses_upload_pad(totalUpload,berhasilUpload,gagalUpload,tidakUpload){
    if(totalUpload <= (berhasilUpload + gagalUpload + tidakUpload)){
        var pesan = "Proses Upload telah selesai, \n<br/> Berhasil = "+berhasilUpload+" \n<br/> Gagal = "+gagalUpload+" \n<br/> Tidak ada Kontrak yang cocok = "+tidakUpload;
        alert_info(pesan);
    }
}

//     console.log('Before or after?');
//------------ VIEW DOC ------------
function get_follow_up_document_image_dms(flag, no_aplikasi, doc_id, doc_name, nama_cust, cust_no, no_kontrak) {

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
        url:base_url+'Controller_dokumen/'+$url_dms,
        type:'POST',
        data:{
            appl_no: no_aplikasi,
            doc_id: doc_id,
            no_kontrak: no_kontrak,
            nama_customer : nama_cust,
            no_customer : cust_no
        },
        success: function(response, error){
        //console.log(response);
        if (response == 'Image Not Found') {
            if (no_kontrak == "" || no_kontrak == "null" || no_kontrak == null) {
                console.log('CEK DMS FASE 1');
                get_follow_up_document_image_dms("03", no_aplikasi, doc_id, doc_name, nama_cust, cust_no, "");
            } else {
                console.log('TIDAK ADA NO KONTRAK');
                get_follow_up_document_image_dms("02", no_aplikasi, doc_id, doc_name, nama_cust, cust_no, "");
            }
        } else if (response == 'Image All DMS Not Found') {
            console.log('TIDAK ADA');
            $('#loading-ajax').hide();
            alert_info('Dokumen Tidak Ditemukan');
        } else {
            if (error.includes('failed to open stream')) {
                alert_info(message_timeout_searchparam, function(){
                    console.log('timeout search/param');
                });
            } else {
                console.log("DATA FOUND");
                var hasil = $.parseJSON(response);
                var file_name = hasil.file_name.split(".");
                var ext = file_name[1];
                if (response.includes('.pdf') || response.includes('.tif') || response.includes('.tiff')) {

                    console.log('PDF/TIFF');
                    console.log(hasil.file_name); 
                    window.open(
                        base_url + 'Controller_dokumen/download_file/'+hasil.file_name,
                        '_blank' 
                        );

                } else {
                    console.log(ext);
                    file_name_global = hasil.file_name;
                    base64_global = hasil.base64;
                    $('#img-dokumen').prop('src', 'data:image/'+ext+';base64, '+hasil.base64);
                    $('#img-preview img').css({
                        'transform':'rotate(0deg)',
                        'height':'350px',
                        'width':'auto'
                    });
                    $('#nama-dokumen').html(hasil.file_name);
                    $('#modal-view-dokumen-pad').modal('show');
                }
            }
        }
    },
    error:function(response){
        console.log(response);
        alert_error('Gagal, file belum terupload atau ' + response.statusText);
            //alert_error(status, response);
        }
    });
}


    /// ------------- PENGATUR GAMBAR -----------------

    // Lidya, 17 Juli 2017, Fitur Zoom, Rotate dan Drag pada View Dokumen LiteDMS
    imageHeight = $('#img-preview img').height();
    imageWidth = $('#img-preview img').width();
    $('#zoom-in').click(function(){
        $('#img-preview img').css({
            height: '+=' + imageHeight * 0.1,
            width: '+=' + imageWidth * 0.1
        });
    });


    $('#zoom-out').click(function(){
        $('#img-preview img').css({
            height: '-=' + imageHeight * 0.1,
            width: '-=' + imageWidth * 0.1
        });
    });

    $('#img-preview').on('mousedown', 'img', function(event) {
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

        $('#img-preview img').css({
        'transform': 'rotate('+ rotateDeg +'deg)', //standard ver
        '-webkit-transform': 'rotate('+ rotateDeg +'deg)', //Chrome
        '-moz-transform':'rotate('+ rotateDeg +'deg)', //Firefox
        '-o-transform': 'rotate('+ rotateDeg +'deg)', //Opera
        '-ms-transform': 'rotate('+ rotateDeg +'deg)' //Internet Explorer
    });
    });

    $("html").on("dragover", function(e) {
        e.preventDefault();
        e.stopPropagation();
    //$("h1").text("Drag here");
});

    $("html").on("drop", function(e) { e.preventDefault(); e.stopPropagation(); });

 // Drag enter
 $('.upload-area-pad').on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
        //$("#drop-pad").text("Drop");
    });

    // Drag over
    $('.upload-area-pad').on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        //$("#drop-pad").text("Drop");
    });

    // Drop
    $('.upload-area-pad').on('drop', function (e) {
        //e.stopPropagation();
        //e.preventDefault();

        //$("#drop-pad").text("Upload");

        var file = e.originalEvent.dataTransfer.files;

        upload_doc_file_pad_obj(file);
    });

    // Open file selector on div click
    $("#uploadfile").click(function(){
        $("#file").click();
    });



    /// ------------- INSERT_DOC_AUTODEBIT -----------------
    function insertDocAutodebit(no_kontrak,br_id) {
        var listContract = [];
        listContract.push(no_kontrak);
        $.ajax({
            url: 'Controller_pengajuan_autodebet/insert_doc_autodebit',
            type: 'POST',
            dataType: 'json',
            data:
            {

                "branch_id" : br_id,
                "cont_no": listContract


            },
            // async: false,

            success: function(response) {
                console.log(response);
                $('#btn-upload-autodebet').prop('disabled', false);
                data_no_autodebet = (response['reg_no']);
                console.log(data_no_autodebet);
                tgl_regis = (response['tgl_regis']);
                console.log(tgl_regis);
                if (response) {
                    try{ 
                        if(response.Status == 'Berhasil'){
                            console.log('Berhasil Insert Doc');
                        } else {
                            console.log('Gagal Insert Doc');
                        }
                    }
                    catch(e){
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error(e);
                    }
                }        
            },
            error: function(response) {
                console.log(response);
            }
        })
    };

//} // tutup js menu alias