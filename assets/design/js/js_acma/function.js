
function alert_info(message, callback) {
    $('.modal-backdrop').css('display', 'none');
    $('#modal-alert').modal('show');
    $('#modal-alert-title').html('Info');
    $('#btn-no').html('OK');
    $('#btn-yes').hide();
    $('#modal-alert-message').html(message);
    $('#modal-alert-icon').removeClass('fa-times-circle').removeClass('fa-exclamation-triangle').removeClass('fa-question-circle').addClass('fa-info-circle');
    $('.fa-info-circle').css('color', '#31708f');
    $('#btn-no').trigger('focus');
    $('#btn-no').off('click').on('click', function () {
        $('#modal-alert').modal('hide');
        $('.modal-backdrop').css('display', 'none');
        $('html, body').css('padding-right', '0px');
        if (typeof callback === 'function') {
            callback();
        }
    });
}

function alert_error(message, callback) {
    $('.modal-backdrop').css('display', 'none');
    $('#modal-alert').modal('show');
    $('#modal-alert-title').html('Error');
    $('#modal-alert-message').html(message);
    $('#btn-no').html('OK');
    $('#btn-yes').hide();
    $('#modal-alert-icon').removeClass('fa-info-circle').removeClass('fa-exclamation-triangle').removeClass('fa-question-circle').addClass('fa-times-circle');
    $('.fa-times-circle').css('color', '#a94442');
    $('#btn-no').trigger('focus');
    $('#btn-no').off('click').on('click', function () {
        $('#modal-alert').modal('hide');
        $('.modal-backdrop').css('display', 'none');
        $('html, body').css('padding-right', '0px');
    });
    if (typeof callback === 'function') {
        callback();
    }
}

function alert_warning(message, callback) {
    $('.modal-backdrop').css('display', 'none');
    $('#modal-alert').modal('show');
    $('#modal-alert-title').html('Warning');
    $('#modal-alert-message').html(message);
    $('#btn-no').html('OK');
    $('#btn-yes').hide();
    $('#modal-alert-icon').removeClass('fa-info-circle').removeClass('fa-times-circle').removeClass('fa-question-circle').addClass('fa-exclamation-triangle');
    $('.fa-exclamation-triangle').css('color', '#8a6d3b');
    $('#btn-no').trigger('focus');
    $('#btn-no').off('click').on('click', function () {
        $('#modal-alert').modal('hide');
        $('.modal-backdrop').css('display', 'none');
        $('html, body').css('padding-right', '0px');
    });
    if (typeof callback === 'function') {
        callback();
    }
}

function alert_confirm(message, callback) {
    $('#modal-alert').modal('show');
    $('#modal-alert-title').html('Konfirmasi');
    $('#btn-yes').show();
    $('#btn-yes').prop('disabled', false);
    $('#btn-no').html('Tidak');
    $('#modal-alert-message').html(message);
    $('#modal-alert-icon').removeClass('fa-info-circle').removeClass('fa-exclamation-triangle').removeClass('fa-times-circle').addClass('fa-question-circle');
    $('.fa-question-circle').css('color', '#3c763d');
    $('#btn-yes').trigger('focus');
    $('#btn-yes').off('click').on('click', function () {
        $('#modal-alert').modal('hide');
        if (typeof callback === 'function') {
            callback();
        }
    });
    $('#btn-no').off('click').on('click', function () {
        $('#modal-alert').modal('hide');
    });
}

function alert_refresh(message, callback) {
    $('.modal-backdrop').css('display', 'none');
    $('#modal-alert').modal('show');
    $('#modal-alert-title').html('Info');
    $('#btn-no').html('OK');
    $('#btn-yes').hide();
    $('#modal-alert-message').html(message);
    $('#modal-alert-icon').removeClass('fa-times-circle').removeClass('fa-exclamation-triangle').removeClass('fa-question-circle').addClass('fa-info-circle');
    $('.fa-info-circle').css('color', '#31708f');
    $('#btn-no').trigger('focus');
    $('#btn-no').off('click').on('click', function () {
        $('#modal-alert').modal('hide');
        $('.modal-backdrop').css('display', 'none');
        $('html, body').css('padding-right', '0px');
        location.reload(true);
        if (typeof callback === 'function') {
            callback();
        }
    });
}

function check_session(){
    var response = $.ajax({
        url : base_url+"Controller_login/check_session",
        dataType : 'JSON',
        cache : false,
        async : false
    });
    return response.responseText;
}
console.log(check_session());

var table_history_login = $('#tbl-hist-login').DataTable({
    "responsive": true,
    "bPaginate": true,
    "bInfo" : false,
    "lengthChange": false
});

//kebutuhan untuk menu ppd cancellation dan manual journal
function hilang_spasi(string) {
    return string.split(' ').join('');
};//tutup function hilang_spasi()

/*-------- FUNCTION DATE ----------*/
var today = new Date();
var dd = today.getDate();
var month = new Array();
month[0] = "Jan";
month[1] = "Feb";
month[2] = "Mar";
month[3] = "Apr";
month[4] = "May";
month[5] = "Jun";
month[6] = "Jul";
month[7] = "Aug";
month[8] = "Sep";
month[9] = "Oct";
month[10] = "Nov";
month[11] = "Dec";
var mm = month[today.getMonth()];
var yyyy = today.getFullYear();

if(dd<10){
  dd='0'+dd;
} 

var today = dd+'-'+mm+'-'+yyyy;

/*---------------------------------*/

$('#loading-ajax').hide();    
$('.modal').on('show.bs.modal', function() {
    if ($(document).height() > $(window).height()) {
        // no-scroll
        $('body').addClass("modal-open-noscroll");
    } else {
        $('body').removeClass("modal-open-noscroll");
    }
});

$('.modal').on('hidden.bs.modal', function() {
    console.log('hide modal');
    $('body').removeClass("modal-open-noscroll");
});
$(document).ajaxStart(function() {
    $('#loading-ajax').show();
}); 
$(document).ajaxComplete(function() {
    $('#loading-ajax').hide();
});
$(document).ajaxStop(function() {
    $('#loading-ajax').hide();
});
$(document).ajaxError(function(){
    $('#loading-ajax').hide();
    //alert_info("Jaringan Terputus, Silakan Coba Lagi");
});

$('#history-login').click(function(){
    table_history_login.clear().draw();

    $.ajax({
        url: "Controller_home/get_history_login",
        cache: false,
        type: 'post',
        dataType: 'json',
        success: function(response, status, error){
            if (response !== false && error['responseText'] !== 'null' && !response.includes('Timeout')) {
                console.log(response);

                var result = $.parseJSON(response);
                console.log(result);
                $.each(result, function(){
                    console.log(new Date(this['process_date']));
                    table_history_login.row.add([
                        this['application'],
                        this['login_id'],
                        this['login_ip'],
                        new Date(this['process_date']).format('dd-mmm-yyyy HH:MM'),
                        this['process_desc'],
                        this['process_status'],
                        this['server_ip']
                        ]).draw(false);
                });
            }
            else {
                alert_info(response);
            }
        },
        error: function(response) {
            alert_info(response);
        }
    })
})

//add by kamalamay 13/10/2017
if ( $( "#panel-filter-cp" ).length ) { //select_branch_cancel_ppd
    get_data_branch('#slc-branch-cp');
} else if ( $( "#panel-filter-dr" ).length ){ //select_branch_draft_received
    get_data_branch('#slc-branch-dr');
} else if ($('#panel-filter-pt').length){
    get_data_branch('#slc-branch-pt');
} else if ( $( "#panel-filter-mj" ).length ) { //select branch manual journal 
    get_data_branch_all('#slc-branch-mj');
} else if ( $( "#panel-filter-pengajuan-autodebet" ).length ){ //select_branch_pengajuan_fiducia
    get_data_branch('#slc-br-id-autodebet')   ;
} else if ( $( "#content-reins" ).length ){ //select_branch_refund_insurance
    get_data_branch('#slc-branch-reins');
} 
// else if ( $( "#input-claim" ).length ){ //insurance_claim
//     get_data_branch('#slc-br-claim');
// }
function get_data_notariss(slc_id){
    var data = '';
    $.ajax({
        url:base_url+"Controller_main/get_notaris_am",
        type:'GET',
        success:function(response){
            var data = JSON.parse(response);
            var data2 = JSON.parse(data);
            console.log(response);
            if(JSON.stringify(response).includes('Timeout')){
                alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
            } else if(response){
              try{
                console.log(response);
                $('<option/>').val('').html('- PILIH NOTARIS -').appendTo(slc_id).addClass('form-control');
                
                for (var i = 0; i < data2['data'].length; i++) {

                    $(slc_id).append('<option value="'+ data2['data'][i].notaris_id +'">'+data2['data'][i].notaris_id+" - "+data2['data'][i].notaris_name+'</option>');

                }
                
            } catch(e) {
                $('#loading-ajax').hide();
                console.log(e);
                alert_info("Terjadi Kesalahan !");
            }
        }//if response

    }
});
}

function get_data_branch(slc_id){
    var data = '';
    $.ajax({
      url : base_url+"Controller_main/getBranchAm",
      type : 'POST',
      dataType : 'json',
      data: {
        "data": data
    },
    success : function(response){
        if(JSON.stringify(response).includes('Timeout')){
            alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
        }
        else if(response){
          try{
            console.log(response);
            $('<option/>').val('').html('- PILIH CABANG -').appendTo(slc_id).addClass('form-control');
            
            $.each(response['data'], function(list){
              $(slc_id).append('<option value="'+ this['branch_code']+'">'+this['branch_code']+" - "+this['branch_desc']+'</option>');
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

function get_data_branch_all(slc_id){
    var data = '';
    $.ajax({
      url : base_url+"Controller_main/getBranchAmAll",
      type : 'POST',
      dataType : 'json',
      data: {
        "data": data
    },
    success : function(response){
        if(JSON.stringify(response).includes('Timeout')){
            alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
        }
        else if(response){
          try{
            console.log(response);
            $('<option/>').val('').html('- PILIH CABANG -').appendTo(slc_id).addClass('form-control');
            
            $.each(response['data'], function(list){
              $(slc_id).append('<option value="'+ this['branch_code']+'">'+this['branch_code']+" - "+this['branch_desc']+'</option>');
          });
            console.log(localStorage.getItem("branch_id"));
            $(slc_id).val(localStorage.getItem("branch_id"));

            if ( $( "#panel-filter-mj" ).length ){
                $('#slc-branch-mj').val('0000');
            }
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
//end add by kamalamay 13/10/2017

// Tanggal PDC 

//add by eko
/*$('.tgl-pdc').datetimepicker({  --remark by delfi
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    minDate: 0,
    //maxDate: new Date()
    
});*/

// end edd by eko 25/10/2017

/*------------------------------------------------Validasi Form Modal PDC------------------------------------------------*/
$('#btn-conf-pdc').click(function() {

    var no_pdc_mdl = $('#inp-pdc-no-mdl').val();
    var pdc_duedate_mdl = $('#inp-due-date-mdl').val();
    var bank_iss_mdl = $('#slc-bank-iss-mdl').val();
    var bank_branch_mdl = $('#inp-bank-branch-mdl').val();

    if((no_pdc_mdl == null) || (no_pdc_mdl == '')) {
        $('#div-pdc-no-dr').addClass('has-error');
        $('#div-due-date-dr').removeClass('has-error');
        $('#div-bank-iss-dr').removeClass('has-error');
        $('#div-bank-br-dr').removeClass('has-error');
    }else if((pdc_duedate_mdl == null) || (pdc_duedate_mdl == '')){
        $('#div-due-date-dr').addClass('has-error');
        $('#div-pdc-no-dr').removeClass('has-error');
        $('#div-bank-iss-dr').removeClass('has-error');
        $('#div-bank-br-dr').removeClass('has-error');
    }else if((bank_iss_mdl == null) || (bank_iss_mdl == '')){
        $('#div-bank-iss-dr').addClass('has-error');
        $('#div-pdc-no-dr').removeClass('has-error');
        $('#div-due-date-dr').removeClass('has-error');
        $('#div-bank-br-dr').removeClass('has-error');
    }else if((bank_branch_mdl == null) || (bank_branch_mdl == '')){
        $('#div-bank-br-dr').addClass('has-error');
        $('#div-pdc-no-dr').removeClass('has-error');
        $('#div-due-date-dr').removeClass('has-error');
        $('#div-bank-iss-dr').removeClass('has-error');
    }
    else{
        $('#div-pdc-no-dr').removeClass('has-error');
        $('#div-due-date-dr').removeClass('has-error');
        $('#div-bank-iss-dr').removeClass('has-error');
        $('#div-bank-br-dr').removeClass('has-error');
        $('#div-pdc-rcd').removeClass('has-error');
        $('#modal-pdc').modal('hide');
        $('#inp-pdc-rv-dr').val(no_pdc_mdl);
        $('#inp-pdc-pt').val(no_pdc_mdl);
        $('#ipt-no-rvpdc-rcd').val(no_pdc_mdl);
        //add by faisal
        // var menu_am = localStorage.getItem("menu");
        // console.log(menu_am);
        // if (menu_am === 'draft_payment_cust') {
        //     console.log('draft payment tab cust ');


        // } else if (menu_am === 'draft_payment_cabang') { 
        //     console.log('draft payment tab cabang ');
        //     check_pdc_no();
        // } else if (menu_am === 'draft_payment_lain') { 
        //     console.log('draft payment tab lain ');
        //     check_pdc_no();
        // } else{
        //     console.log('bukan draft payment');
        // }

        if ($('#tab-dp-customer').hasClass('active') || $('#tab-dp-cabang').hasClass('active') || $('#tab-dp-lain').hasClass('active') ) {
            check_pdc_no();
        }else{

        }


    }
});
/*-----------------------------------------------------------------------------------------------------------------------*/

//add by delfi
function bank_iss_pdc(bank_st, br_code) {
    console.log(bank_st);
    console.log(br_code);
    var option;
    $.ajax({
        url: "controller_draft_received/get_bank_mdm_dr",
        type: 'POST',
        dataType: 'json',
        data: {
            "bank_stat": bank_st,
            "bank_br_id": br_code
        },
        cache: false,

        success: function(response) {
            console.log(response);
            if(response){
                try{
                    var status = response['status'];
                    var data = response['data'];
                    if (status == true){
                        $.each(response['data'], function() {
                            option += "<option value = '" + this['bankCode'] + "'>" + this['bankCode'] + " - " + this['bankName'] + " </option>";
                        });

                        $('#slc-bank-iss-mdl').html('<option value = "">--SILAHKAN PILIH--</option>' + option);

                        $("#modal-pdc").modal({
                            show: true,
                            backdrop: 'static'
                        });
                    }
                    else{
                        alert_error(data);
                    }
                }
                catch (e){
                    console.log(e);
                    $('#loading-ajax').hide();
                    alert_error("Terjadi Kesalahan" + e);
                }
            }
        },
        error: function(response) {
            console.log(response);
        }
    });
    $("#inp-date-pdc-mdl").val(today);
    $('#inp-due-date-mdl').val(today);
};

// on change bank issued
$('#slc-bank-iss-mdl').change(function() {
    var bank_iss_pdc = $('#slc-bank-iss-mdl').val();
});

$('#div-due-date-dr').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    minDate: today
});


/*disable alphabet and special character*/ 
$('.inp-number').on('keydown', function(e) {
    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) 
    && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode 
    && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) 
    && (96 > e.keyCode || 105 < e.keyCode)
    && e.preventDefault()
});

/*disable number and special character*/
$('.inp-alphabet').on('keydown', function(e){
    var keyCode = (e.keyCode ? e.keyCode : e.which);
    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 111) || 105 < keyCode) { 
        e.preventDefault();
    }
});

/*disable symbol / special character*/
$('.no-special-char').on('keydown', function(e) {
    -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13]) || /65|67|86|88/.test(e.keyCode) 
    && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode 
    && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 90 < e.keyCode) 
    && (96 > e.keyCode || 105 < e.keyCode) 
    && e.preventDefault()
});

// ----------------- FUNCTION SLIDE UP -------------------------------
//Added By Faisal
$('.slide-up').click(function() {

    if ($('#tab-dp-lain').hasClass('active')) {
        var pay_to_lain = $('#inp-dp-lain-payto').val();
        if (pay_to_lain === null || pay_to_lain === '') {
            alert_error('Dimohon untuk mengisi pay to terlebih dahulu');
            $('#div-pay-to-lain').addClass('has-error');
        }else{
            $(this).parent().next('.form-horizontal').slideToggle("slow");
            $('#div-pay-to-lain').removeClass('has-error');
            flag_form_dplain = 1;
        }

    }else{
        $(this).parent().next('.form-horizontal').slideToggle("slow");
    }

    
    // $(this).children('div').toggleClass('fa-minus-square fa-toggle-down')
});

//----------------- FUNCTION DB CLICK NO PV --------------------------
//ADDED BY FAISAL
var table_nopv = $('#tbl-list-nopv').DataTable({
  responsive: true
});

var hasil_nopv = '';
var payment_id_dpho = null; //Added By Wiwid 20180629
$('#tbl-list-nopv').on( 'click', 'tr', function () {
  if ( $(this).hasClass('selected') ) {
    $(this).removeClass('selected');
    pilih_nopv = '';
}
else {
    table_nopv.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    pilih_nopv = table_nopv.row( this ).data();
    hasil_nopv = pilih_nopv[0];
    payment_id_dpho = pilih_nopv[1];//Added By Wiwid 20180629
    console.log(hasil_nopv);
    console.log(payment_id_dpho);//Added By Wiwid 20180629


}
});


$('#tbl-list-nopv').on( 'dblclick', 'tr', function () {
    $('#modal-nopv').modal('hide');
    $('.modal-backdrop').css('display', 'none');
    $('#btn-save-dpho-buffer').prop("disabled", true);

    
    if ($('#tab-dpho-insentif').hasClass('active')) {
        $('#inp-no-pv-insenpv').val(hasil_nopv);
    }
    else if ($('#tab-dpho-fiducia').hasClass('active')) {
        $('#inp-pvno-fdc').val(hasil_nopv);
    }
    else if ($('#tab-dpho-buffer').hasClass('active')) {
        var class_code_buffer =  $('#slc-dpho-buffer-class-code').val();
        $('#inp-dpho-buffer-pv-no').val(hasil_nopv);
        display_buffer(class_code_buffer,hasil_nopv);
    }
    else if ($('#tab-dpho-nasabah').hasClass('active')) {
        $('#inp-dpho-nsb-pv-no').val(hasil_nopv);
        search_by_pv_no_2();
    }
    else if ($('#tab-dpho-collection').hasClass('active')) {
        $('#inp-pv-no-dpho-collection').val(hasil_nopv);
    }
    else if ($('#tab-dpho-dealer').hasClass('active')){
        $('#input-dlr-pv-no').val(hasil_nopv);
        send_payment_id(payment_id_dpho);
    }
});

//tambahan yaya
$('#btn-conf-nopv').click(function(){
    $('#modal-nopv').modal('hide');
    $('.modal-backdrop').css('display', 'none');
    $('#btn-save-dpho-buffer').prop("disabled", true);

    if ($('#tab-dpho-insentif').hasClass('active')) {
        $('#inp-no-pv-insenpv').val(hasil_nopv);
    }
    else if ($('#tab-dpho-fiducia').hasClass('active')) {
        $('#inp-pvno-fdc').val(hasil_nopv);
    }
    else if ($('#tab-dpho-buffer').hasClass('active')) {
        $('#inp-dpho-buffer-pv-no').val(hasil_nopv);
        display_buffer();
    }
    else if ($('#tab-dpho-nasabah').hasClass('active')) {
        $('#inp-dpho-nsb-pv-no').val(hasil_nopv);
        search_by_pv_no_2();
    }
    else if ($('#tab-dpho-collection').hasClass('active')) {
        $('#inp-pv-no-dpho-collection').val(hasil_nopv);
    }
    else if ($('#tab-dpho-dealer').hasClass('active')){
        $('#input-dlr-pv-no').val(hasil_nopv);
        send_payment_id(payment_id_dpho);
    }
});

//--------------------GET DATA BANK PENGIRIM-----------------------------
//------------------------Added by Faisal--------------------------------
function get_bank_pengirim(slc_id) {
    $.ajax({
        url: "Controller_draft_payment_ho_buffer_cash/get_bank_pengirim",
        type: 'POST',
        dataType: 'json',

        success: function(response) {
            if(JSON.stringify(response).includes('Timeout')){
                alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
            }
            else if (response) {
                try {
                    console.log(response['data']);                          
                    $('<option/>').val('').html('--SILAHKAN PILIH--').appendTo(slc_id).addClass('form-control');
                    $.each(response['data'], function(list) {

                        $(slc_id).append('<option value="' + this['bankCode'] + '">' + this['bankCode'] + ' - ' + this['bankName'] + '</option>');
                    });
                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error("Terjadi Kesalahan Get Bank Pengirim");
                }
             } //if response

         },
         error: function(response) {
            console.log(response);
        }
    });
};

//---------------------------- FUNCTION DB CLICK MODAL BANK -----------------------------------------
//---------------------------------- Added by Faisal ------------------------------------------------
var hasil_pencarian = '';
$('#tbl-bank-insentif').on('dblclick', 'tr', function(){
    hasil_pencarian = tbl_bank_insentif.row(this).data();
    $('#modal-bank-insentif').modal('hide');

    if ($('#tab-dpho-insentif').hasClass('active')) {
        if (hasil_pencarian[0] === '- ALL -') {
            $('#inp-bank-insenpv').val('ALL');
        }
        else{
            $('#inp-bank-insenpv').val(hasil_pencarian[0]+' - '+hasil_pencarian[1]);
        }
    }
    else if ($('#tab-dpho-fiducia').hasClass('active')) {

    }
    else if ($('#tab-dpho-buffer').hasClass('active')) {

    }
    else if ($('#tab-dpho-collection').hasClass('active')) {
        if (hasil_pencarian[0] === '- ALL -') {
            $('#inp-dpho-collection-bank').val('ALL');
        }else{
            $('#inp-dpho-collection-bank').val(hasil_pencarian[0]+' - '+hasil_pencarian[1]);
            $('#hdn-bank-code-dpho-collection').val(hasil_pencarian[0]);
        }
        
    }
    else if ($('#tab-dpho-nasabah').hasClass('active')) {

    }
    
});

$('#btn-pilih-bank-insentif').click(function(){
    $('#modal-bank-insentif').modal('hide');
    $('#inp-bank-insenpv').val(hasil_pencarian[0]+' - '+hasil_pencarian[1]);
    //getEmplByBankCode(hasil_pencarian);
});


// ------------------------------ FUNCTION GET BANK FOR PDC -----------------------------------------
//---------------------------------- Added by Faisal ------------------------------------------------
function get_bank_pdc(bank_br_id, bank_status) {
    $.ajax({
        url: "Controller_draft_received/get_bank_mdm_dr",
        type: 'POST',
        dataType: 'json',
        data: {
            "bank_stat": bank_status,
            "bank_br_id": bank_br_id
        },
        cache: false,


        success: function(response) {
            console.log(response);
            var bank_issued = $('#slc-bank-iss-mdl').val();
            console.log(bank_issued);
            if (bank_issued === null) {

                if (response['data'].length === 0) {
                    alert_error('Cabang ini tidak mempunyai bank issued PDC');
                } else {
                    var option = '';
                    $.each(response['data'], function() {
                        option += "<option value = '" + this['bankCode'] + "'>" + this['bankCode'] + " - " + this['bankName'] + " </option>";
                    });

                    $('#slc-bank-iss-mdl').html('<option value = "">--SILAHKAN PILIH--</option>' + option);

                    $("#modal-pdc").modal({
                        show: true,
                        backdrop: 'static'
                    });

                    $('#div-due-date-mdl').datetimepicker({
                        format: 'DD-MMM-YYYY',
                        allowInputToggle: true
                    });
                    $("#inp-date-pdc-mdl").val(today);
                    $('#inp-due-date-mdl').val(today);

                }

            } else {
                $("#modal-pdc").modal({
                    show: true,
                    backdrop: 'static'
                });
                $("#inp-date-pdc").val(today);
                $('#inp-due-date-mdl').val(today);
            }

        },
        error: function(response) {
            console.log(response);
        }
    });
}

//added by fathan, kebutuhan get area, silahkan masukkan id element
function get_area_dphonsb(slc_id){
    var list_area_dphonsb = [];
    list_area_dphonsb.push(['All', 'Semua Area']);
    $.ajax({
        url: "Controller_draft_payment_ho_nasabah/get_area_dphonsb",
        type: 'POST',
        timeout: 10000,
        dataType: 'json',
        success: function(response){
            console.log(response['data']);
            if(response['status'] == true) {
                try {
                    $(slc_id).empty();
                    console.log("ajax response success"); 
                    var list_result = response['data'];
                  //$('<option/>').val('').html('--SILAHKAN PILIH--').appendTo(slc_id).addClass('form-control'); //added by faisal 06-JUL-2018
                  $.each(list_result, function(){
                    list_area_dphonsb.push([this['branch_code'], this['branch_desc']]);

                });
                  for (var j = 0; j < list_area_dphonsb.length; ++j) {
                    var item = list_area_dphonsb[j];
                        //$('#slc-dpho-nsb-area').append($('<option/>', { 
                            $(slc_id).append($('<option/>', { 
                                value: item[0],
                                text : item[0] +' - '+ item[1] 
                            }));
                        }
                        console.log(list_area_dphonsb);
                    } catch(e) {
                        $('#loading-ajax').hide();
                        console.log(response);
                        console.log(e);
                        alert_error(e);
                    }
                } else {
                    console.log(response)
                    alert_error(response['ErrorMessage']);
                }
            },
            error: function(response){
                console.log(response);
                if (response.statusText == "timeout" || response.statusText == "Internal Server Error") {
                    alert_error('Koneksi ke server gagal, silahkan coba lagi!')
                } else {
                    alert_error('Terjadi kesalahan saat mencari list data area cabang!');
                }
            }
        });
};


// ------------------------------------------- SHOW HIDE TAB MENU DRAFT PAYMENT HO -----------------------------------------
// ----------------------------------------------------- Added by Faisal ------------------------------------------------
$('.tab-menu-dpho').hide();

$('.sub-tab-menu-dpho').removeClass('active');
$('.tab-menu-dpho').show();
$('#id-tab-import, #id-tab-dpho-dealer, #id-tab-dpho-dealer-netoff, #id-tab-dpho-asuransi, #id-tab-dpho-collection, #id-tab-dpho-insentif, #id-tab-dpho-nasabah, #id-tab-dpho-buffer').hide();
$('#id-tab-dpho-fiducia').addClass('active');
$('#tab-dpho-fiducia').addClass('active');
var branch_id_ho = $('#hdn-dpho-branch-code').val();
if ($('#tab-dpho-fiducia').hasClass('active')) {
    console.log('JEDOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR');
    get_jumlahpv_dpho(branch_id_ho,'DPH1');
    $('#id-dpho-jumlahpv').show();
}


$('#slc-list-tab-dpho').change(function(){
  if (check_session() === 'true') {
    var list_tab_menu_dpho = $('#slc-list-tab-dpho').val();
    console.log(branch_id_ho,list_tab_menu_dpho);
    console.log('cari-menu');
    switch (list_tab_menu_dpho){
        case '01':
        {
            console.log('fiducia');
            $('.sub-tab-menu-dpho').removeClass('active');
            $('.tab-menu-dpho').show();
            $('#id-tab-import, #id-tab-dpho-dealer, #id-tab-dpho-dealer-netoff, #id-tab-dpho-asuransi, #id-tab-dpho-collection, #id-tab-dpho-insentif, #id-tab-dpho-nasabah, #id-tab-dpho-buffer').hide();
            $('#id-tab-dpho-fiducia').addClass('active');
            $('#tab-dpho-fiducia').addClass('active');
            $('#btn-back-dpho').show();
            get_area_dphonsb('#slc-area-pv-fdc');
            get_bank_dp_fdc();
            get_class_codes('#slc-cc-fdc', 'DPH1');
            get_jumlahpv_dpho(branch_id_ho,'DPH1');
            $('#id-dpho-jumlahpv').show();
            break;
        }
        case '02':
        {
            console.log('dealer');
            $('.sub-tab-menu-dpho').removeClass('active');
            $('.tab-menu-dpho').show();
            $('#id-tab-import, #id-tab-dpho-fiducia, #id-tab-dpho-dealer-netoff, #id-tab-dpho-asuransi, #id-tab-dpho-collection, #id-tab-dpho-insentif, #id-tab-dpho-nasabah, #id-tab-dpho-buffer').hide();
            $('#id-tab-dpho-dealer').addClass('active');
            $('#tab-dpho-dealer').addClass('active');
            //$('#div-id-list-tab-dpho').hide();
            $('#btn-back-dpho').show();
            get_jumlahpv_dpho(branch_id_ho,'DPH2');
            $('#id-dpho-jumlahpv').show();
            break;
        }
        case '03':
        {
            console.log('dealer nett off');
            $('.sub-tab-menu-dpho').removeClass('active');
            $('.tab-menu-dpho').show();
            $('#id-tab-import, #id-tab-dpho-fiducia, #id-tab-dpho-dealer, #id-tab-dpho-asuransi, #id-tab-dpho-collection, #id-tab-dpho-insentif, #id-tab-dpho-nasabah, #id-tab-dpho-buffer').hide();
            $('#id-tab-dpho-dealer-netoff').addClass('active');
            $('#tab-dpho-dealer-netoff').addClass('active');
            //$('#div-id-list-tab-dpho').hide();
            $('#btn-back-dpho').show();
            get_jumlahpv_dpho(branch_id_ho,'DPH2');
            $('#id-dpho-jumlahpv').show();
            break;
        }
        case '04':
        {
            $('.sub-tab-menu-dpho').removeClass('active');
            $('.tab-menu-dpho').show();
            $('#id-tab-import, #id-tab-dpho-fiducia, #id-tab-dpho-dealer, #id-tab-dpho-dealer-netoff, #id-tab-dpho-collection, #id-tab-dpho-insentif, #id-tab-dpho-nasabah, #id-tab-dpho-buffer').hide();
            $('#id-tab-dpho-asuransi').addClass('active');
            $('#tab-dpho-asuransi').addClass('active');
            $('#btn-back-dpho').show();
            get_area_dphonsb('#slc-area-pv-insr');
            get_insr_insr();
            get_class_codes('#slc-cl-code-insr', 'DPH3');
            get_jumlahpv_dpho(branch_id_ho,'DPH3');
            table_asuransi_dpho.draw();
            $('#id-dpho-jumlahpv').show();
            break;
        }
        case '05':
        {
            console.log('welcome collection');
            $('.sub-tab-menu-dpho').removeClass('active');
            $('.tab-menu-dpho').show();
            $('#id-tab-import, #id-tab-dpho-fiducia, #id-tab-dpho-dealer, #id-tab-dpho-dealer-netoff, #id-tab-dpho-asuransi, #id-tab-dpho-insentif, #id-tab-dpho-nasabah, #id-tab-dpho-buffer').hide();
            $('#id-tab-dpho-collection').addClass('active');
            $('#tab-dpho-collection').addClass('active');
            //$('#div-id-list-tab-dpho').hide();
            $('#btn-back-dpho').show();
            //get_area_dphonsb('#slc-dpho-collection-area');
            clear_dpho_collection();
            get_jumlahpv_dpho(branch_id_ho,'DPH4');
            $('#id-dpho-jumlahpv').show();
            if (class_code_collection !== '') {
                get_class_code_collection();
                get_bank_pengirim('#slc-dpho-collection-bank-pengirim');
                get_objgroup_bycode();
            } else {

            }
            table_dp_collection.draw();
           // js_dpho_collection();
           break;
       }
       case '06':
       {
        console.log('welcome insentif');
        $('.sub-tab-menu-dpho').removeClass('active');
        $('.tab-menu-dpho').show();
        $('#id-tab-import, #id-tab-dpho-fiducia, #id-tab-dpho-dealer, #id-tab-dpho-dealer-netoff, #id-tab-dpho-asuransi, #id-tab-dpho-collection, #id-tab-dpho-nasabah, #id-tab-dpho-buffer').hide();
        $('#id-tab-dpho-insentif').addClass('active');
        $('#tab-dpho-insentif').addClass('active');
        $('#slc-class-code-insenpv').empty();
        get_class_code_insentif();
        get_bank_pengirim_insentif();
        get_area_dphonsb('#slc-area-insenpv');
        get_jumlahpv_dpho(branch_id_ho,'DPH5');
        $('#id-dpho-jumlahpv').show();
            //get_area();
            //$('#div-id-list-tab-dpho').hide();
            $('#btn-back-dpho').show();
            break;
        }
        case '07':
        {
            console.log('welcome nasabah');
            $('.sub-tab-menu-dpho').removeClass('active');
            $('.tab-menu-dpho').show();
            $('#id-tab-import, #id-tab-dpho-fiducia, #id-tab-dpho-dealer, #id-tab-dpho-dealer-netoff, #id-tab-dpho-asuransi, #id-tab-dpho-collection, #id-tab-dpho-insentif, #id-tab-dpho-buffer').hide();
            $('#id-tab-dpho-nasabah').addClass('active');
            $('#tab-dpho-nasabah').addClass('active');
            //$('#div-id-list-tab-dpho').hide();
            $('#btn-back-dpho').show();
            get_jumlahpv_dpho(branch_id_ho,'DPH6');
            js_dphonsb();
            $('#id-dpho-jumlahpv').show();
            break;
        }
        case '08':
        {

            console.log('welcome buffer');
            $('.sub-tab-menu-dpho').removeClass('active');
            $('.tab-menu-dpho').show();
            $('#id-tab-import, #id-tab-dpho-fiducia, #id-tab-dpho-dealer, #id-tab-dpho-dealer-netoff, #id-tab-dpho-asuransi, #id-tab-dpho-collection, #id-tab-dpho-insentif, #id-tab-dpho-nasabah').hide();
            $('#id-tab-dpho-buffer').addClass('active');
            $('#tab-dpho-buffer').addClass('active');
            //$('#div-id-list-tab-dpho').hide();
            $('#btn-back-dpho').show();
            //js_dpho_buffer();
            clear_dpho_buffer();
            get_jumlahpv_dpho(branch_id_ho,'DPH7');
            $('#id-dpho-jumlahpv').show();
            class_code_buffer = $('#slc-dpho-buffer-class-code').val();
            if (class_code_buffer !== '') {
            get_class_code_buffer();
            get_bank_pengirim('#slc-dpho-buffer-bank-pengirim');
            
            } else {

            }
            table_dp_buffer_cash.draw();
            break;
        }
        case '09':
        {
            console.log('welcome import');
            $('.sub-tab-menu-dpho').removeClass('active');
            $('.tab-menu-dpho').show();
            $('#id-tab-dpho-fiducia, #id-tab-dpho-dealer, #id-tab-dpho-dealer-netoff, #id-tab-dpho-asuransi, #id-tab-dpho-collection, #id-tab-dpho-insentif, #id-tab-dpho-nasabah , #id-tab-dpho-buffer').hide();
            $('#id-tab-import').addClass('active');
            $('#tab-eitb-import').addClass('active');
            //$('#div-id-list-tab-dpho').hide();
            $('#btn-back-dpho').show();
            //js_dpho_buffer();
            $('#inp-dpho-jumlahpv').val('');
            $('#id-dpho-jumlahpv').hide();
            break;
        }
        default:
        {
            console.log('tidak ada tab yang dipilih');
        }
    }

  } else if (check_session() === 'false') {
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function() {
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
    });
  }

});

//added by delf, kebutuhan get class code, masukan id slc dan domain id 
function get_class_codes(slc_id, domain_id){
    $.ajax({
        url: "Controller_draft_payment_ho_fiducia/get_class_code_dpho",
        type: 'POST',
        timeout: 10000,
        data: {
            id: domain_id
        },
        dataType: 'json',
        success : function(response){
            console.log(response);
            if (response) {
                try{
                    $(slc_id).empty();
                    var status = response['status'];
                    if (status == true){
                        $('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo(slc_id).addClass('form-control');
                        $.each(response['data'], function(i){
                            var domain_value = response['data'][i]['domain_value'];

                            $(slc_id).append('<option value="'+domain_value+'">'+domain_value+
                                '</option>');
                        })
                    }
                    else{
                        alert_error(response['message']);
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
        }
    });
}

$(document).on("contextmenu",function(b){            
   b.preventDefault();
   alert("Right Click Disabled");
});

function download(strData, strFileName, strMimeType) {
    var D = document, A = arguments, a = D.createElement("a"),
         d = A[0], n = A[1], t = A[2] || "application/vnd.ms-excel";
 
    var newdata = "data:" + strMimeType + ";base64," + escape(strData);
    console.log(newdata);
 
    //build download link:
    a.href = newdata;
 
    if ('download' in a) {
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
            setTimeout(function () {
                var e = D.createEvent("MouseEvents");

                e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
            );
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
  };
}

//--------------------GET JUMLAH PV DRAFT PAYMENT HO-----------------------------
//------------------------Added by Faisal--------------------------------
function get_jumlahpv_dpho(branch_id,domain_id) {
    $.ajax({
        url: "Controller_draft_payment_ho_buffer_cash/get_jumlahpv_dpho",
        type: 'POST',
        dataType: 'json',
        data: {
            "branch_id_ho": branch_id,
            "domain_id": domain_id
        },

        success: function(response) {
            if(JSON.stringify(response).includes('Timeout')){
                alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
            }
            else if (response) {
                try {
                    console.log(response['data']);  
                    console.log(branch_id,domain_id);
                    if(response['data']['status']){
                       $('#inp-dpho-jumlahpv').val(response['data']['data']);
                    } else {
                        alert_error(response['data']['data']);
                    }
                   
                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error("Terjadi Kesalahan Get Jumlah PV");
                }
             } //if response

         },
         error: function(response) {
            console.log(response);
        }
    });
};