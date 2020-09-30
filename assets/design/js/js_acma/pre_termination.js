$(document).ready(function(){z  
    clearit();
    setInterval(function() {
       if(check_session() == "false"){
        console.log(check_session());
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
}, 300 * 1000);

});

console.log($('#branch-id-pt').html());
var branch_id_pt = $('#branch-id-pt').html();
var branch_code_pt = '';
var branch_name_pt = $('#branch-name-pt').html();
var reason;
var radio_value = '';
var contract_no = '';
var no_inst_preterm = '';
var totpok_tunggakan = '';
var totbung_tunggakan = '';
var total_bayar = '';
var dibayarkan = '';
var pinalty_persen = '';
var tot_wajib = '';
var dendapenalty = '';
var bunga_berjalan = '';
var sisa_pokok = '';
var bunga_hapus = '';
var titipan = '';
var sisa_bayar = '';
var inkaso_pt = [];
var financode = '';
var ref_bayar='';
var flag_pilot = 1;
if ($('#panel-filter-pt').length){
  get_sumber_dana();
  get_reason_preterm();
}

$('#diskon-preterm-hide').hide();
$('#btn-close-alert').hide();
$('#slc-branch-pt').prop("disabled",true);
// ----------------------------------------<get branch>-------------------------------

//if (branch_id_pt == '0000') {
    branch_code_pt = $('#slc-branch-pt').val();
// } else {
//     $('#ho-termination').hide();
//     $('#cabang-termination').show();
//     branch_code_pt = branch_id_pt;
//     $('#inp-branch-id-pt').val(branch_code_pt);
//     $('#inp-branch-name-pt').val(branch_name_pt);
// }

$('#slc-branch-pt').change(function() {
    branch_code_pt = $('#slc-branch-pt').val();
    //$('#inp-pdc-rv-dr').val('');
});

function isi_cabang(no){
    no=no.substring(0,4);
    if(no == '0000'){
        branch_code_pt = '0000';
    } else {
        $('#slc-branch-pt').val(no);
        $('#slc-branch-pt').change();

        $('#inp-branch-name-pt').val($("#slc-branch-pt option:selected").text());
    }
}

localStorage.removeItem('rv_stat');
localStorage.removeItem('cont_pret');
localStorage.removeItem('memo_pret');

// --------------------------------------<X>get branch---------------------------------

//----------------------------------------DataTable------------------------------------

var table_asset_termination = $('#tbl-asset-termination').DataTable({
    retrieve: true,
    bFilter: false,
    bInfo: false,
    paging: false,
    ordering: false,
});

var tabel_modal_memo = $('#tbl-memo-termination').DataTable({

});

//---------------------------------------<X>DataTable--------------------------------


//---------------------------------------Cross Branch (asb)--------------------------------
$('#no-memo-preterm').on("keyup", function(){

    if($('#no-memo-preterm').val().length ==0){
        $('#contract_preterm').prop("disabled",false);
    } else {
     $('#contract_preterm').prop("disabled",true); 
 }


    // if($('#no-memo-preterm').val().length >= 4){
    //     isi_cabang($('#no-memo-preterm').val());
    // } else{
    //     isi_cabang("1234");
    // }
    $('#contract_preterm').val("");

});

$('#contract_preterm').on("keyup", function(){

    if($('#contract_preterm').val().length ==0){
        $('#no-memo-preterm').prop("disabled",false);
    } else {
     $('#no-memo-preterm').prop("disabled",true); 
 }


    // if($('#contract_preterm').val().length >= 4){
    //     isi_cabang($('#contract_preterm').val());
    // } else{
    //     isi_cabang("1234");
    // }
    $('#no-memo-preterm').val("");

});
bank_pret_pdc(3,"0000");
//---------------------------------------Radio Button--------------------------------
$('input[type=radio][name=fillter_pembayaran]').change(function() {
    if (this.value == 'cash' && this.checked) {
        $('#btn-no-rv').show();
        $('#btn-create-no-pdc').hide();
        radio_value = this.value;
        $('#div-show-pdc').hide();
        console.log(radio_value);
    } else if (this.value == 'pdc' && this.checked) {
        $('#btn-no-rv').hide();
        $('#btn-create-no-pdc').show();
        radio_value = this.value;
        var bank_st_dr = 3;
        //bank_pret_pdc(bank_st_dr, branch_code_pt);
        $('#div-show-pdc').show();
        $("#modal-pdc").modal('show');
        //console.log(branch_code_pt);
    }
});

$('#btn-show-pdc').click(function() {

    $("#modal-pdc").modal('show');

});





$('#slc-type-pelunasan').change(function() {
    debugger;
    var denda_g = localStorage.getItem('denda');
    var total_bayar_g = localStorage.getItem('total_bayar');
    var uang_bayar_g = localStorage.getItem('uang_bayar');
    var kewajiban_g = localStorage.getItem('kewajiban_bayar');
    if (this.value == 'Y') {
        $('input[type=radio][name=fillter_pembayaran]').prop('checked', false);
        $('input[type=radio][name=fillter_pembayaran][value=cash]').prop('checked', true);
        $('input[type=radio][name=fillter_pembayaran]').prop('disabled', true);
        $('input[type=radio][name=fillter_pembayaran]').change();
        $('#uang-bayar-preterm').val(total_bayar_g);
        $('#denda-preterm').val(denda_g);
        $('#tot-kewajiban-preterm').val(kewajiban_g);
        $('#tot-bayarkan-preterm').val(total_bayar_g);
        $('#uang-bayar-preterm').change();
        $('#pinalty-plus-preterm').change();
        $('#uang-bayar-preterm').prop('disabled', true);
        $("#btn-create-preterm").html('Confirm');
        radio_value = null;
    } else if(this.value == 'R') {
        $('input[type=radio][name=fillter_pembayaran]').prop('checked', false);
        $('input[type=radio][name=fillter_pembayaran][value=cash]').prop('checked', true);
        $('input[type=radio][name=fillter_pembayaran]').prop('disabled', true);
        $('input[type=radio][name=fillter_pembayaran]').change();
        total_bayar = accounting.unformat(total_bayar_g);
        var denda_r = accounting.unformat(denda_g);
        var total_bayar_restructure = total_bayar - denda_r;
        var kewajiban_restructure = accounting.unformat(kewajiban_g) - denda_r;
        var total_restructure_f = accounting.formatMoney(total_bayar_restructure, '', 2, ',', '.');
        $('#tot-bayarkan-preterm').val(total_restructure_f);
        $('#uang-bayar-preterm').val(total_restructure_f);
        $('#tot-kewajiban-preterm').val(accounting.formatMoney(kewajiban_restructure, '', 2, ',', '.'));
        $('#denda-preterm').val( accounting.formatMoney(0, '', 2, ',', '.'));
        $('#uang-bayar-preterm').change();
        $('#pinalty-plus-preterm').change();
        $('#uang-bayar-preterm').prop('disabled', true);
        $("#btn-create-preterm").html('Confirm');
        radio_value = null;
    } else {
        $('input[type=radio][name=fillter_pembayaran]').prop('disabled', false);
        $("#btn-create-preterm").html('Create RV/PDC');
        $('#uang-bayar-preterm').prop('disabled', false);
        $('#uang-bayar-preterm').val(total_bayar_g);
        $('#denda-preterm').val(denda_g);
        $('#tot-kewajiban-preterm').val(kewajiban_g);
        $('#tot-bayarkan-preterm').val(total_bayar_g);
        $('#uang-bayar-preterm').change();
        $('#pinalty-plus-preterm').change();
    }
});

//--------------------------------------<X>Radio Button-----------------------------

//--------------------------------------Date----------------------------------------
$('.tgl-pelunasan').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    //maxDate: new Date()

}).on("dp.change", function(e){
   var cont_no = localStorage.getItem('cont_pret');
   var memo_no = localStorage.getItem('memo_pret');

   if(cont_no !=null ){
    $('#contract_preterm').val(cont_no);
    $('#no-memo-preterm').val(memo_no);  
    $('#btn-search-termination').click();
}
});
$('#tgl-pelunasan-preterm').val(new Date().format('dd-mmm-yyyy'));
$('#tgl-memo-preterm').val(new Date().format('dd-mmm-yyyy'));

//-----------------------------------<X>Date---------------------------------------


//-----------------------------------Btn Search Preterm----------------------------
$('#btn-search-termination').click(function() {
    debugger;
    console.log(branch_code_pt);
    var contract_no = $('#contract_preterm').val();
    var memono = $('#no-memo-preterm').val();
    $('#contract_preterm').prop('disabled',true);
    $('#no-memo-preterm').prop('disabled',true);
            
    clearit();
    

    if(memono == null || memono == ""){
        if (contract_no.length !== 12) {
            $('#contract_preterm').addClass('has-error');
            alert_error('No kontrak harus 12 angka');

    } else {
        get_data_termination();
    }
} else {

    if (memono.length !== 12) {
        $('#no-memo-preterm').addClass('has-error');
        alert_error('No Memo harus 12 angka');

    } else {
        get_data_memo();

    }
}

});

$("#btn-clear").click(function(){
    $('html, body').animate({scrollTop:0}, 'slow');
    $('#contract_preterm').val('');
    $('#no-memo-preterm').val('');
    $('#receive-preterm').val('');
    $('#contract_preterm').prop('disabled',false);
    $('#no-memo-preterm').prop('disabled',false);
    $('#tgl-pelunasan-preterm').val(new Date().format('dd-mmm-yyyy'));
    $('#tgl-memo-preterm').val(new Date().format('dd-mmm-yyyy'));
    table_asset_termination.clear().draw(); 
	clearit();
});

function clearit(){
    $('#inp-branch-name-pt').val('');
    $('#inp-statuswf-pt').val('');
    $('#inp-statuswf-pt').val('');
    $('#fintype-preterm').val('');
    
    $('#tgl-memo-preterm').val('');
    $('#tgl-contract-preterm').val('');
    $('#tgl-tempo-termination').val('');
    $('#no-cust-preterm').val('');
    $('#nama-cust-preterm').val('');
    $('#alamat-termination').val('');

    $('#sumber-dana-preterm').val('');
    $('#reason-preterm').val('');

    $('#inp-due-date-mdl').val(new Date().format('dd-mmm-yyyy'));
    //$('#slc-type-pelunasan option[value=D]').attr('selected','selected');
    $('#slc-type-pelunasan option[value=D]').prop('selected','selected');
    $('#pelunasan-ke-pretem').val('');
    $('#sisa-pokok-preterm').val('');
    $('#tot-pokok-preterm').val('');
    $('#denda-preterm').val('');
    $('#bunga-harian-preterm').val('');

    $('#bunga-hapus-preterm').val('');
    $('#pinalty-plus-preterm').val('');
    $('#hasil-pinalty-preterm').val('');

    $('#diskon-preterm-hide').hide();
    $('#diskon-preterm').val('');
    $('#div-show-pdc').hide();
    $('#tot-kewajiban-preterm').val('');
    $('#tot-titipan-preterm').val('');
    $('#tot-bayarkan-preterm').val('');
    $('#uang-bayar-preterm').val('');
    $('#selisih-preterm').val('');
    $('#chk-inkaso-pdc-dr').prop("checked",false);

    $('#inp-pdc-no-mdl').prop("disabled", false);
    $('#inp-due-date-mdl').prop("disabled", false);
    $('#slc-bank-iss-mdl').prop("disabled", false);
    $('#inp-bank-branch-mdl').prop("disabled", false);
    $('#chk-inkaso-pdc-dr').prop("disabled", false);
    $('#slc-type-pelunasan').prop('disabled', false);  
    $('#inp-pdc-no-mdl').val('');
    //$('#inp-due-date-mdl').val('');
    $('#slc-bank-iss-mdl').val('');
    $('#inp-bank-branch-mdl').val('');
    $('#chk-inkaso-pdc-dr').val('');

    $('#pinalty-plus-preterm').prop('disabled',false);
    $('#uang-bayar-preterm').prop('disabled',false);
    $('#btn-create-preterm').prop('disabled',false);
    $('#btn-save-preterm').prop('disabled',false);
    $('#btn-print-preterm').prop('disabled',false);
    $('#btn-cancel-preterm').prop('disabled',false);
    $('#sumber-dana-preterm').prop('disabled',false);
    $('#reason-preterm').prop('disabled',false);
    $('#tgl-pelunasan-preterm').prop('disabled',false);

    //$('#tgl-pelunasan-preterm').val(new Date().format('dd-mmm-yyyy'));
    $('#tgl-memo-preterm').val(new Date().format('dd-mmm-yyyy'));
    $('#inp-date-pdc-mdl').val(new Date().format('dd-mmm-yyyy'));
    localStorage.removeItem('denda');
    localStorage.removeItem('uang_bayar');
    localStorage.removeItem('kewajiban_bayar');
    localStorage.removeItem('total_bayar');
    localStorage.removeItem('rv_stat');
    localStorage.removeItem('cont_pret');
    localStorage.removeItem('memo_pret');
}
//-----------------------------------<X>Btn Search Preterm----------------------------

//------------------------------------Btn Save Preterm-------------------------------
$('#btn-save-preterm').click(function() {

    var flagrole =false;

    for(var i = 0 ; i < role_pret.length ; i++){
        if(role_pret[i]['role_code'] === 'SAVE-DRAFT-PRETERM'){
            flagrole = true;
            break;
        }
    }

    if(flagrole){
        console.log('masuk');
        var sumber_dana = $('#sumber-dana-preterm').val();
        var reason = $('#reason-preterm').val();
        var bayar = $('#uang-bayar-preterm').val();
        var contract = $('#contract_preterm').val();
        var sisa_pokok = $('#sisa-pokok-preterm').val();
        var tunggakan = $('#tot-pokok-preterm').val(); 
        var titipan = $('#tot-titipan-preterm').val();
        var refinancing_flag = $('#slc-type-pelunasan').val();
        var tot_tenor =  $('#total-pokok-preterm').val();
        var claim_status = $('#inp-statusclaim-pt').val();
        var banding_status = $('#inp-statusbanding-pt').val();
        var wf_status = $('#inp-statuswf-pt').val();
        var tenorke  = $('#pelunasan-ke-pretem').val();
        var selisih_preterm = accounting.unformat($('#selisih-preterm').val());
        console.log(sumber_dana);
        console.log(reason);
        if (contract == '') {
            alert_error(' Nomor Kontrak Tidak Boleh Kosong');
        } else if (sumber_dana == '') {
            alert_error('Sumber dana tidak boleh kosong!');
        } else if (reason == '') {
            alert_error('Alasan Pelunasan tidak boleh kosong!');
        } else if (bayar == '') {
            alert_error('Uang Yang Dibayarkan Tidak Boleh Kosong');
        } else if (sisa_pokok == 0) {
            alert_error('Preterm Tidak Dapat Dilakukan Karena Seluruh Angsuran Sudah Jatuh Tempo !');
        } else if (refinancing_flag == 'D') {
            alert_error("flag pelunasan harus dipilih");
        } else if(selisih_preterm < 0){
            alert_error('Selisih tidak boleh kurang dari 0');
        }else if (claim_status == '0') {
            alert_error('kontrak dalam proses claim asuransi');
        } else if (banding_status == '0' && claim_status != 'C') {
            alert_error('kontrak dalam proses banding claim asuransi');
        }else if (refinancing_flag == 'Y'){


            if((tot_tenor/2) > tenorke){
                alert_error('sudah harus bayar setengah untuk refinancing');
            } else if (tunggakan != 0) {
                alert_error('kontrak Tidak boleh punya tunggakan');
            }  else {
                alert_confirm('Draft tersimpan dengan titipan sebesar Rp.' + titipan, function() {
                    save_data_preterm();
                });
            }


        } else if (refinancing_flag == 'R'){
            if($('#fintype-preterm').val() == 'SYARIAH') {
                alert_error('kontrak Syariah tidak dapat dilakukan Restructuring');
            } else {
                save_data_preterm();
            }
        }
        else {

        //if(wf_status == null || wf_status == "FULL APPROVED" || wf_status == ""){
            alert_confirm('Draft tersimpan dengan titipan sebesar Rp.' + titipan, function() {
                save_data_preterm();
            });
        //} else {
        //    alert_error('kontrak dalam proses workflow');
        //}

    }
    } else { //else flagrole
        alert_error('Anda tidak punya privilege untuk tombol ini');
    }
});

//------------------------------------<X>Btn Save Preterm-----------------------------

//-------------------------------------get Data Preterm-------------------------------

function get_data_termination() {
    debugger;
    var contract_no = $('#contract_preterm').val();
    console.log(branch_code_pt);
    var tgl_pelunasan = $('#tgl-pelunasan-preterm').val();
    $('#slc-type-pelunasan option[value=D]').attr('selected',true);
        $.ajax({
            url: 'Controller_pre_termination/getBranchByCont',
            dataType: 'json',
            type: 'POST',
            data: {
                'contract_no': contract_no
            },
            success: function(response) {
                console.log(response);
                if (response) {
                    try {
                        branch_code_pt = response.branch_code;
                        if(flag_pilot != 1){
                            isi_cabang(branch_code_pt);
                        } else {
                           isi_cabang($('#branch-id-pt').html());
                       }
                       get_termi();
                   } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error('Terjadi Kesalahan error{getBranchByCont} =>' + e)
                }
            }
        },
        error: function(response) {
            console.log(response);
            alert_error('Tidak terhubung dengan server');
        }
    });
    // } else {
    //     get_termi();
    // }

    
}
//-------------------------------------<X>get Data Preterm-------------------------------
function get_termi(){
    debugger;
    var tot_pokok = '';
    var financetype = '';
    var diskon_lunas = '';

    contract_no = $('#contract_preterm').val();
    console.log(branch_code_pt);
    var tgl_pelunasan = $('#tgl-pelunasan-preterm').val();
    /*    var tgl_pelunasan = new Date(tgl_pelunasanx).format('dd-mm-yyyy');*/
    $.ajax({
        url: 'Controller_pre_termination/get_contract_termination',
        dataType: 'json',
        type: 'POST',
        data: {
            'branch_id': branch_code_pt,
            'contract_no': contract_no,
            'tgl_pelunasan': tgl_pelunasan
        },

        success: function(response) {
            console.log(response);
            if (response['errorConsole']) {
                if(response['errorConsole'].includes("no data found") || response['errorConsole'].includes("Size: 0")){
                    alert_error("Data Nomor Kontrak tidak ditemukan");
                } else {
                    alert_error(response['errorConsole']);
                }
            } else if (response['error']) {
                alert_error(response['error'], function() {

                });
            } else if (response['count']['error']) {
                alert_error(response['count']['error']);
            } else {

                if (response) {
                    try {
                        var tgl_kontrak = '';
                        var nama_cust = '';
                        var no_cust = '';
                        var alamat = '';
                        var data = null;
                        var total_pokok = response['tenor'];
                        var ref_flag = '';
                        $('#total-pokok-preterm').val(total_pokok);
                        
                        //status = 1 -> sudah pernah create draft
                        if (response['status'] == '1') {
                            localStorage.setItem('rv_stat', response['DataMemo'][0]['rv_status']);
                            console.log(response['DataMemo'][0]['receive_no']);

                            //draft sudah di confirm RV
                            if(response['DataMemo'][0]['receive_no'] !== null && response['DataMemo'][0]['payment_type'] == 0){

                                var data = response['DataMemo'][0];

                                var  mydate = new Date(data['memo_date']);
                                $('#inp-tgl-dummy').data("DateTimePicker").date(mydate);
                                var str = $('#inp-tgl-dummy').val();
                                $('#tgl-memo-preterm').val(str);

                                $('#no-memo-preterm').val(data['memo_no']);
                                $('#sumber-dana-preterm').val(data['fund_source']);
                                $('#pinalty-plus-preterm').prop('disabled',true);
                                $('#uang-bayar-preterm').prop('disabled',true);
                                $('#sumber-dana-preterm').prop('disabled',true);
                                $('#reason-preterm').prop('disabled',true);
                                $('#tgl-pelunasan-preterm').prop('disabled',true);
                                if(data['payment_type'] == 1){
                                    $('input[type=radio][name=fillter_pembayaran][value="cash"]').prop("checked",false);
                                    $('input[type=radio][name=fillter_pembayaran][value="pdc"]').prop("checked",true);
                                    $('#btn-no-rv').hide();
                                    $('#btn-create-no-pdc').show();
                                    $('#inp-pdc-pt').val(data['receive_no']);

                                } else {
                                    alert_info('No Kontrak dengan memo '+response['DataMemo'][0]['memo_no']+'  tidak bisa di edit,sudah digunakan untuk No RV '+response['DataMemo'][0]['receive_no'], function() {
                                        data = response['DataMemo'][0];
                                        $('#no-memo-preterm').val(data['memo_no']);

                                        mydate = new Date(response['DataMemo'][0]['act_date']);
                                        $('#inp-tgl-dummy').data("DateTimePicker").date(mydate);
                                        str = $('#inp-tgl-dummy').val();
                                        $('#tgl-pelunasan-preterm').val(str);


                                        $('#btn-search-termination').click();
                                    }); 
                                    $('input[type=radio][name=fillter_pembayaran][value="cash"]').prop("checked",true);
                                    $('input[type=radio][name=fillter_pembayaran][value="pdc"]').prop("checked",false);
                                    $('#btn-no-rv').show();
                                    $('#btn-create-no-pdc').hide();

                                    $('#receive-preterm').val(data['receive_no']);

                                }

                                $('#reason-preterm').val(data['preterm_reason']);
                                $('#uang-bayar-preterm').val(accounting.formatMoney(data['fee_amt'], '', 2, ',', '.'));
                                $('#btn-create-preterm').prop('disabled', true);
                                $('#btn-save-preterm').prop('disabled', true);
                                $('#btn-cancel-preterm').prop('disabled', true);
                            }   //draft belum di confirm (masih save)
                                else {

                                alert_info(response['message'], function() {
                                    data = response['DataMemo'][0];
                                    $('#no-memo-preterm').val(data['memo_no']);

                                    mydate = new Date(response['DataMemo'][0]['act_date']);
                                    $('#inp-tgl-dummy').data("DateTimePicker").date(mydate);
                                    str = $('#inp-tgl-dummy').val();
                                    $('#tgl-pelunasan-preterm').val(str);

                                    $('#btn-search-termination').click();
                                }); 
                                $('#pinalty-plus-preterm').prop('disabled',true);
                                $('#uang-bayar-preterm').prop('disabled',true);
                                $('#sumber-dana-preterm').prop('disabled',true);
                                $('#reason-preterm').prop('disabled',true);
                                $('#tgl-pelunasan-preterm').prop('disabled',true);
                                data = response['DataMemo'][0];
                                var  mydate = new Date(data['memo_date']);
                                $('#inp-tgl-dummy').data("DateTimePicker").date(mydate);
                                var str = $('#inp-tgl-dummy').val();
                                $('#tgl-memo-preterm').val(str);

                                $('#no-memo-preterm').val(data['memo_no']);
                                $('#sumber-dana-preterm').val(data['fund_source']);
                                $('#receive-preterm').val('');

                                if(data['payment_type'] == 1){
                                    $('input[type=radio][name=fillter_pembayaran][value="cash"]').prop("checked",false);
                                    $('input[type=radio][name=fillter_pembayaran][value="pdc"]').prop("checked",true);
                                    $('#btn-no-rv').hide();
                                    $('#btn-create-no-pdc').show();
                                    $('#div-show-pdc').show();
                                    $('#inp-pdc-pt').val(data['receive_no']);

                                    $('#inp-pdc-no-mdl').val(data['pdcno']);

                                    var  mydate = new Date(data['pdcdate']);
                                    $('#inp-tgl-dummy').data("DateTimePicker").date(mydate);
                                    var str = $('#inp-tgl-dummy').val();
                                    $('#inp-date-pdc-mdl').val(str);

                                    var  mydate = new Date(data['pdcduedate']);
                                    $('#inp-tgl-dummy').data("DateTimePicker").date(mydate);
                                    var str = $('#inp-tgl-dummy').val();
                                    $('#inp-due-date-mdl').val(str);

                                    $('#slc-bank-iss-mdl').val(data['bankid']);
                                    $('#inp-bank-branch-mdl').val(data['bankbr']);
                                    if(data['inkaso'] == 1){
                                        $('#chk-inkaso-pdc-dr').prop("checked",true);
                                    }

                                    $('#inp-sts-pdc').val(data['statuspdc']);

                                    $('#inp-pdc-no-mdl').prop("disabled", true);
                                    $('#inp-due-date-mdl').prop("disabled", true);
                                    $('#slc-bank-iss-mdl').prop("disabled", true);
                                    $('#inp-bank-branch-mdl').prop("disabled", true);
                                    $('#chk-inkaso-pdc-dr').prop("disabled", true);
                                }
                                
                                $('#reason-preterm').val(data['preterm_reason']);
                                $('#uang-bayar-preterm').val(accounting.formatMoney(data['fee_amt'], '', 2, ',', '.'));
                                $('#btn-create-preterm').prop('disabled', false);
                                $('#btn-save-preterm').prop('disabled', true);
                                $('#btn-cancel-preterm').prop('disabled', false);

                                //});
                        }
                        //flag refinancing draft / sudah konfirm
                        ref_flag = data['refinancing_flag'];
                        if(ref_flag == 'Y'){
                            $('#slc-type-pelunasan option[value=Y]').prop('selected','selected');
                            $('input[type=radio][name=fillter_pembayaran]').prop('checked', false);
                            $('input[type=radio][name=fillter_pembayaran]').prop('disabled', true);
                            $('#uang-bayar-preterm').prop('disabled', true);
                            $("#btn-create-preterm").html('Confirm');

                        }  else if (ref_flag == 'R') {
                            $('#slc-type-pelunasan option[value=R]').prop('selected','selected');
                            $('input[type=radio][name=fillter_pembayaran]').prop('checked', false);
                            $('input[type=radio][name=fillter_pembayaran]').prop('disabled', true);
                            $('#uang-bayar-preterm').prop('disabled', true);
                            $("#btn-create-preterm").html('Confirm');
                        }
                        
                        else {
                            $('#slc-type-pelunasan option[value=N]').prop('selected','selected');
                            $('input[type=radio][name=fillter_pembayaran]').prop('disabled', false);
                                                    //$('#uang-bayar-preterm').prop('disabled', false);
                                                    $("#btn-create-preterm").html('Create RV/PDC');
                         }
                            $('input[type=radio][name=fillter_pembayaran]').prop('disabled', true);
                            $('#slc-type-pelunasan').prop('disabled', 'disabled');   
                        } //belum pernah create draft 
                        else {
                            $('#no-memo-preterm').val('');
                            $('#sumber-dana-preterm').val('');
                            $('#receive-preterm').val('');
                            $('#reason-preterm').val('');
                            $('#uang-bayar-preterm').val('');
                            $('input[type=radio][name=fillter_pembayaran]').prop('disabled', false);
                            $('input[type=radio][name=fillter_pembayaran][value="cash"]').prop("checked",true);
                            $('input[type=radio][name=fillter_pembayaran][value="pdc"]').prop("checked",false);
                            $('#slc-type-pelunasan').prop('disabled', false); 
                            $('#slc-type-pelunasan option[value=D]').attr('selected',true);
                            $('#inp-pdc-pt').val('');
                            $('#btn-no-rv').show();
                            $('#btn-create-no-pdc').hide();
                            $('#btn-create-preterm').prop('disabled', true);
                            $('#btn-save-preterm').prop('disabled', false);
                            $('#btn-cancel-preterm').prop('disabled', true);
                        }
                            var data_count = response['count'];
                            var pelunasan = data_count['no_instalment'];
                            var sisa_pokok = data_count['sisa_pokok'];
                            var titipan = data_count['titipan'];
                            tot_pokok = data_count['tot_pokok'];
                            bunga_berjalan = data_count['bunga_berjalan'];
                            var tot_pinalty = data_count['tot_pinalty'];
                            totbung_tunggakan = data_count['totbung_tunggakan'];
                            totpok_tunggakan = data_count['totpok_tunggakan'];
                            no_inst_preterm = data_count['no_inst_preterm'];
                            var bunga_hapus = data_count['bunga'];
                            var decodbungadn = data_count['decodbungadn'];
                            var decodpokokdn = data_count['decodpokokdn'];
                            dendapenalty = data_count['dendapenalty'];
                            debugger;
                            var pinalty_plus = data_count['pinalty_plus'];
                            total_bayar = data_count['tot_bayar'];
                            var tot_fas = data_count['tot_fas'];
                            var sisa_ang = data_count['sisa_ang'];
                            var diskon_lunas = data_count['dis_lunas'];
                            var tot_ang = data_count['tot_ang'];
                            var totSya = sisa_ang-diskon_lunas-dendapenalty;
                            var toySyaBayar = totSya - titipan;
                            // var sisa_bayar = data_count['sisa_bayar'];
                            var tot_wajib = data_count['tot_wajib'];
                            dibayarkan = data_count['dibayarkan'];
                            var pinalty_out = data_count['pinalty_out'];                         
                            dibayarkan = tot_wajib - titipan;

                            $('#pelunasan-ke-pretem').val(pelunasan);
                            $('#sisa-pokok-preterm').val(accounting.formatMoney(sisa_pokok, '', 2, ',', '.'));
                            $('#tot-pokok-preterm').val(accounting.formatMoney(tot_pokok, '', 2, ',', '.'));
                            $('#bunga-harian-preterm').val(accounting.formatMoney(bunga_berjalan, '', 2, ',', '.'));
                            $('#denda-preterm').val(accounting.formatMoney(dendapenalty, '', 2, ',', '.'));
                            $('#hasil-pinalty-preterm').val(accounting.formatMoney(pinalty_plus, '', 2, ',', '.'));
                            $('#tot-kewajiban-preterm').val(accounting.formatMoney(tot_wajib, '', 2, ',', '.'));
                            $('#tot-titipan-preterm').val(accounting.formatMoney(titipan, '', 2, ',', '.'));
                            $('#pinalty-plus-preterm').val(accounting.formatMoney(pinalty_out, '', 2, ',', '.'));
                            $('#bunga-hapus-preterm').val(accounting.formatMoney(bunga_hapus, '', 2, ',', '.'));
                            $('#fasilitas-preterm').val(accounting.formatMoney(tot_fas, '', 2, ',', '.'));
                            $('#angsuran-ter-preterm').val(accounting.formatMoney(tot_ang, '', 2, ',', '.'));
                            $('#sisa-ang-preterm').val(accounting.formatMoney(sisa_ang, '', 2, ',', '.'));
                            $('#diskon-pel-preterm').val(accounting.formatMoney(diskon_lunas, '', 2, ',', '.'));
                            $('#total-sya-preterm').val(accounting.formatMoney(totSya, '', 2, ',', '.'));
                            $('#total-sya-by-preterm').val(accounting.formatMoney(toySyaBayar, '', 2, ',', '.'));
                            debugger;

                            //label syariah & konven
                            $('#fintype-preterm').val(response['finance_type'][0]['fin_desc']);
                            var financetype = $('#fintype-preterm').val();
                            if (financetype =='SYARIAH')
                            {
                                document.getElementById('denda-preterm-cc').innerHTML = 'Sanksi yang harus dibayar Rp';
                                document.getElementById('bunga-preterm-harian').innerHTML = 'Margin Harian Rp';
                                document.getElementById('bunga-preterm-hapus').innerHTML = 'Margin yang dihapuskan Rp';
                                document.getElementById('penalty-preterm-plus').innerHTML = 'Biaya';

                            }
                            if (financetype =='KONVENSIONAL')
                            {
                                document.getElementById('denda-preterm-cc').innerHTML = 'Denda yang harus Dibayar Rp';
                                document.getElementById('bunga-preterm-harian').innerHTML = 'Bunga Harian Berjalan Rp';
                                document.getElementById('bunga-preterm-hapus').innerHTML = 'Bunga yang dihapuskan Rp';
                                document.getElementById('penalty-preterm-plus').innerHTML = 'Penality Plus'; 


                            }
                            //perhitungan diskon lunas untuk syari'ah
                            financode = response['finance_type'][0]['fin_code']
                            $('#uang-bayar-preterm').val(accounting.formatMoney(total_bayar, '', 2, ',', '.'));
                            $('#tot-bayarkan-preterm').val(accounting.formatMoney(total_bayar, '', 2, ',', '.'));
                            uang_bayar = $('#uang-bayar-preterm').val();
                            total_bayar = $('#tot-bayarkan-preterm').val();
                            bayar = accounting.unformat(uang_bayar);
                            total = accounting.unformat(total_bayar);
                            sisa_bayar = bayar - parseFloat(total);
                            console.log('uang bayar: ' + uang_bayar);
                            console.log('total_bayar: ' + total_bayar);
                            console.log('sisa_bayar: ' + sisa_bayar);
                            $('#selisih-preterm').val(accounting.formatMoney(sisa_bayar, '', 2, ',', '.'));

                            if (financode == 2) {
                                $('#diskon-preterm-hide').show();
                                $('#diskon-preterm').val(accounting.formatMoney(diskon_lunas, '', 2, ',', '.'));
                            }

                            table_asset_termination.clear().draw();
                            $.each(response['customer'], function(index) {
                                tgl_kontrak = this['contract_date'];
                                no_cust = this['customer_no'];
                                nama_cust = this['customer_name'];
                                alamat = this['alamat_ktp'];
                                due_date = this['due_date'];

                                var claim_status = this['claim_status'];
                                var banding_status = this['banding_status'];
                                var wf_status = this['wf_status'];

                                $('#inp-statusclaim-pt').val(claim_status);
                                $('#inp-statusbanding-pt').val(banding_status);
                                $('#inp-statuswf-pt').val(wf_status);

                                console.log(alamat);
                                table_asset_termination.row.add([
                                    this['police_no'],
                                    this['engine_no'],
                                    this['chassis_no']
                                    ]).draw(false);
                                $('#tgl-contract-preterm').val(tgl_kontrak);
                                $('#no-cust-preterm').val(no_cust);
                                $('#nama-cust-preterm').val(nama_cust);
                                $('#alamat-termination').val(alamat);
                                $('#tgl-tempo-termination').val(due_date);
                            });
                            ref_bayar = $('#uang-bayar-preterm').val();
                            localStorage.setItem('cont_pret', $('#contract_preterm').val());
                            localStorage.setItem('memo_pret', $('#no-memo-preterm').val());
                            localStorage.setItem('uang_bayar', ref_bayar);
                            localStorage.setItem('denda', $('#denda-preterm').val());
                            localStorage.setItem('kewajiban_bayar', $('#tot-kewajiban-preterm').val());
                            localStorage.setItem('total_bayar', $('#tot-bayarkan-preterm').val());
                            $('#pinalty-plus-preterm').change();

                            } catch (e) {
                                $('#loading-ajax').hide();
                                console.log(e);
                                if(response['errorConsole'].includes("no data found")){
                                    alert_error("Data Nomor Kontrak tidak ditemukan");
                                } else {
                                    alert_error(response['errorConsole']);
                                }
                            }
                            }
                            }
                            },
                            error: function(response) {
                                console.log(response);
                                alert_error('Tidak terhubung dengan server');
                            }
                            })
                            }

//-------------------------------------Search Memo--------------------------------------
var pilih_memo = '';
$('#tbl-memo-termination').on('dblclick', 'tr', function() {
    pilih_memo = tabel_modal_memo.row(this).data();
    $('#modal-memo-pre-termination').modal('hide');
    $('#no-memo-preterm').val(pilih_memo[0]);
    $('#contract_preterm').val(pilih_memo[1]);

    get_data_memo();
});

$('#tbl-memo-termination').on('click', 'tr', function() {
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        pilih_memo = '';
    } else {
        tabel_modal_memo.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        pilih_memo = tabel_modal_memo.row(this).data();
        console.log(pilih_memo);

    }
});

$('#btn-pilih-memo-termination').click(function() {
    $('#no-memo-preterm').val(pilih_memo[0]);
    $('#contract_preterm').val(pilih_memo[1]);
})
//-------------------------------------Search Memo--------------------------------------

//-------------------------------------get memo------------------------------------------
$('#btn-serach-memo').click(function() {
    tabel_modal_memo.clear().draw();
    $.ajax({
        url: 'Controller_pre_termination/get_memo',
        dataType: 'json',
        type: 'POST',
        data: {
            'branch_id': branch_code_pt
        },
        success: function(response) {
            console.log(response);
            // var memo = $.parseJSON(response);
            if (response) {
                try {
                    $.each(response['NoMemo'], function() {
                        tabel_modal_memo.row.add([
                            this['memo'],
                            this['contract_no']
                            ]).draw(false);

                        $('#modal-memo-pre-termination').modal({
                            show: true,
                            backdrop: 'static'
                        });
                    });
                } catch (e) {
                    ('#loading-ajax').hide();
                    alert_error('Terjadi Kesalahan error{get_memo} =>' + e)
                }
            }

        },
        error: function(response) {
            console.log(response);
            alert_error('Tidak terhubung dengan server');
        }
    });
});
// function get_memo(){
//  console.log(branch_code_pt);

// }
//-------------------------------------<X>get memo------------------------------------------


//-------------------------------------get sumber dana--------------------------------------
function get_sumber_dana() {
    $.ajax({
        'url': 'Controller_pre_termination/get_sumber_dana',
        'type': 'GET',
        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    if (response['status'] == true) {
                        $('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#sumber-dana-preterm').addClass('form-control');
                        $.each(response['Data'], function() {

                            var sumber_dana = $('#sumber-dana-preterm').append('<option value="' + this['fund_code'] + '">' + this['fund_desc'] + '</option>');

                        });
                    } else {

                        alert_refresh('Refresh');
                    }
                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error('Terjadi Kesalahan error{get_sumber_dana} =>' + e)
                }
            }
        },
        error: function(response) {
            console.log(response);
            alert_error('Tidak terhubung dengan server');
        }
    })
}
//-------------------------------------<X>get sumber dana--------------------------------------

//-------------------------------------get reason---------------------------------------------
function get_reason_preterm() {

    $.ajax({
        'url': 'Controller_pre_termination/get_reason_preterm',
        'type': 'POST',
        'dataType' : 'json',

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    if (response['status'] == true) {
                        $('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#reason-preterm').addClass('form-control');
                        $.each(response['data'], function() {
                            var reason = $('#reason-preterm').append('<option value="' + this['mst_value'] + '">'+ this['mst_desc'] + '</option>');
                        });
                    } else {
                        alert_refresh('Refresh');
                    }

                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error('Terjadi kesalahan error{get_reason_preterm} =>' + e)
                }

            }

        },
        error: function(response) {
            console.log(response);
            alert_error('Tidak terhubung dengan server');
        }
    });
}
//-------------------------------------<X>get reason---------------------------------------------

//-------------------------------------Save Preterm----------------------------------------------
function save_data_preterm() {
    debugger;
    var contract_no = $('#contract_preterm').val();
    var tgl_contract = $('#tgl-contract-preterm').val();
    /*    var tgl_contract = new Date(tgl_contractx).format('dd-mm-yyyy');*/
    var tgl_pelunasan = $('#tgl-pelunasan-preterm').val();
    /*    var tgl_pelunasan = new Date(tgl_pelunasanx).format('dd-mm-yyyy');*/
    var tgl_memo = $('#tgl-memo-preterm').val();
    /*    var tgl_memo = new Date(tgl_memox).format('dd-mm-yyyy');*/
    var sisa_pokok = accounting.unformat($('#sisa-pokok-preterm').val());
    var bunga_dihapuskan = accounting.unformat($('#bunga-hapus-preterm').val());
    var denda = accounting.unformat($('#denda-preterm').val());
    var pinalty = accounting.unformat($('#hasil-pinalty-preterm').val());
    var persen_pinalty = accounting.unformat($('#pinalty-plus-preterm').val());
    var selisih_preterm = accounting.unformat($('#selisih-preterm').val());
    var bunga_harian = accounting.unformat($('#bunga-harian-preterm').val());
    var deposit = accounting.unformat($('#tot-titipan-preterm').val());
    var bayar = accounting.unformat($('#uang-bayar-preterm').val());
    var installmentno_before = $('#pelunasan-ke-pretem').val();
    var sumber_dana = $('#sumber-dana-preterm').val();
    var reason_preterm = $('#reason-preterm').val();
    var refinancing_flag = $('#slc-type-pelunasan').val();
    var payment_type = $('input[name=fillter_pembayaran]:checked').val();
    var rv_no = '';
    var no_pdc = $('#inp-pdc-no-mdl').val();
    var pdc_due_date = $('#inp-due-date-mdl').val();
    var bank_branch = $('#inp-bank-branch-mdl').val();
    var bank_id = $('#slc-bank-iss-mdl').val();


    if(payment_type == 'pdc'){
        payment_type = 1;
        rv_no =  $('#inp-pdc-pt').val();
    } else {
        rv_no = $('#receive-preterm').val();
        payment_type = 0;
    }

    if ($('#chk-inkaso-pdc-dr').is(":checked")) {
        inkaso_pt = 1;
    } else {
        inkaso_pt = 0;
    }

    var flag = true;
    if(payment_type == 1){
        if(no_pdc == null || no_pdc ==""){
            alert_error("No PDC tidak boleh kosong");
            flag = false;
        } else  if(pdc_due_date == null || pdc_due_date ==""){
            alert_error("Tanggal jatuh tempo PDC tidak boleh kosong");
            flag = false;
        } else  if(bank_id == null || bank_id ==""){
            alert_error("Bank PDC tidak boleh kosong");
            flag = false;
        } else  if(bank_branch == null || bank_branch ==""){
            alert_error("Cabang Bank PDC tidak boleh kosong");
            flag = false;
        }
    }
    var save_installment = '';
    if(refinancing_flag == 'R') {
        save_installment = installmentno_before;
    } else {
        save_installment = no_inst_preterm;
    }

    if(flag){
        $.ajax({
            url: 'Controller_pre_termination/save_data_preterm',
            type: 'POST',
            dataType: 'json',
            data: {

                'branch_code': branch_code_pt,
                'contract_no': contract_no,
                'tgl_pelunasan': tgl_pelunasan,
                'tgl_memo': tgl_memo,
                'insalment_no': save_installment,
                'sisa_pokok': sisa_pokok,
                'bunga_dihapuskan': bunga_dihapuskan,
                'denda': denda,
                'pokok_tunggakan': totpok_tunggakan,
                'bunga_tunggakan': totbung_tunggakan,
                'pinalty': pinalty,
                'bunga_harian': bunga_harian,
                'selisih_preterm': selisih_preterm,
                'deposit': deposit,
                'persen_pinalty': persen_pinalty,
                'bayar': bayar,
                'sumber_dana': sumber_dana,
                'reason_preterm': reason_preterm,
                'refinancing_flag': refinancing_flag,
                'payment_type': payment_type,
                'rv_no' : rv_no,
                'pdc_inkaso':inkaso_pt,
                'pdc_no':no_pdc,
                'pdc_due_date':pdc_due_date,
                'bank_branch':bank_branch,
                'bank_id':bank_id


            },
            success: function(response) {
                console.log(response);
                var status = $.parseJSON(response);
                console.log(status);


                if (status) {
                    try {
                        if (status['errorConsole']) {
                            if(status['errorConsole'].includes("no data found")){
                                alert_error("Data tidak ditemukan");
                            } else {
                                alert_error(status['errorConsole']);
                            }
                        } else if (status['Status'] == 1) {
                          alert_info('Draft Preterm tersimpan dengan nomor memo '+status['no_memo']);
                          $('#btn-create-preterm').prop('disabled', false);
                          $('#btn-cancel-preterm').prop('disabled', false);
                          $('#no-memo-preterm').val(status['no_memo']);
                          $('#pinalty-plus-preterm').prop('disabled',true);
                          $('#uang-bayar-preterm').prop('disabled',true);
                          $('#sumber-dana-preterm').prop('disabled',true);
                          $('#reason-preterm').prop('disabled',true);
                          $('#tgl-pelunasan-preterm').prop('disabled',true);
                          $('#slc-type-pelunasan').prop('disabled',true);
                          $('input[type=radio][name=fillter_pembayaran]').prop('disabled', true);
                          localStorage.setItem('memo_pret', $('#no-memo-preterm').val());
                          $('#inp-statuswf-pt').val("NEW");
                      } else {
                        alert_error(status['Status']);
                        //create_pdc_preterm(inkaso_pt);
                        $('#btn-create-preterm').prop('disabled', false);
                        $('#btn-cancel-preterm').prop('disabled', false);
                    }
                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error('Terjadi kesalahan, error{save_data_preterm} => ' + e)
                }
            }


        },
        error: function(response) {
            console.log(response);
            alert_error('Tidak terhubung dengan server');
        }


    })
}
}

//-------------------------------------<X>Save Preterm----------------------------------------------

//-------------------------------------Btn cancel Preterm-------------------------------------------
$('#btn-cancel-preterm').click(function() {
    var wf_status = $('#inp-statuswf-pt').val();
    var tgl_memo = $('#tgl-memo-preterm').val();
    var memo_no = localStorage.getItem('memo_pret');
    console.log(branch_code_pt);
    console.log(tgl_memo);
    console.log(memo_no);
    var statwf = $('#inp-statuswf-pt').val();

    if (memo_no.length == '') {
        alert_error('nomor memo kosong');
    } else if( !(statwf == "NEW" || statwf == "REJECT" || statwf == "")){
        alert_error('Workflow Transaksi ini harus di reject dahulu');
    } else {
        $.ajax({
            url: 'Controller_pre_termination/cancel_preterm',
            dataType: 'json',
            type: 'POST',
            data: {
                'branch_code': branch_code_pt,
                'tgl_memo': tgl_memo,
                'no_memo': memo_no
            },
            success: function(response) {
                console.log(response);
                if(response['status'] == true){
                 alert_refresh(response['sukses']);
             } else {
              alert_error(response['error']);
          }


      },
      error: function(response) {
        console.log(response);
        alert_error('Tidak terhubung dengan server');

    }
})
    }
});
//-------------------------------------<X>Btn cancel Preterm-------------------------------------------

//------------------------------------------Btn Create RV/PDC------------------------------------------
$('#btn-create-preterm').click(function() {
    debugger;

    var flagrole =false;

    for(var i = 0 ; i < role_pret.length ; i++){
        if(role_pret[i]['role_code'] === 'SUBMIT-DRAFT-PRETERM'){
            flagrole = true;
            break;
        }
    }


    if(flagrole){
        console.log(radio_value);
        var sumber_dana = $('#sumber-dana-preterm').val();
        var reason = $('#reason-preterm').val();
        var bayar = $('#uang-bayar-preterm').val();
        var memo_no = localStorage.getItem('memo_pret');
        var sisa_pokok = $('#sisa-pokok-preterm').val();
        var tunggakan = $('#tot-pokok-preterm').val(); 
        var titipan = $('#tot-titipan-preterm').val();
        var refinancing_flag = $('#slc-type-pelunasan').val();
        var tot_tenor =  $('#total-pokok-preterm').val();
        var claim_status = $('#inp-statusclaim-pt').val();
        var banding_status = $('#inp-statusbanding-pt').val();
        var wf_status = $('#inp-statuswf-pt').val();
        var tenorke  = $('#pelunasan-ke-pretem').val();
        var selisih_preterm = accounting.unformat($('#selisih-preterm').val());
        console.log('sumber dana: ' + sumber_dana);
        console.log('reason: ' + reason);

        if (memo_no == '') {
            alert_error(' Nomor Kontrak Tidak Boleh Kosong');
        } else if (sumber_dana == '') {
            alert_error('Sumber dana tidak boleh kosong!');
        } else if (reason == '') {
            alert_error('Alasan Pelunasan tidak boleh kosong!');
        } else if (bayar == '') {
            alert_error('Uang Yang Dibayarkan Tidak Boleh Kosong');
        } else if (sisa_pokok == 0) {
            alert_error('Preterm Tidak Dapat Dilakukan Karena Seluruh Angsuran Sudah Jatuh Tempo !');
        } else if (refinancing_flag == 'D') {
            alert_error("flag Pelunasan harus dipilih");
        } else if(selisih_preterm < 0 && !(wf_status == "PAID" || wf_status == "FULL APPROVE")){
            alert_error('Selisih tidak boleh kurang dari 0, Silahkan cancel memo dan buat draft baru !');
        } else if (claim_status == '0') {
            alert_error('kontrak dalam proses claim asuransi');
        } else if (banding_status == '0' && claim_status != 'C') {
            alert_error('kontrak dalam proses banding claim asuransi');
        }else {
            if(!(wf_status == "INPROGRESS"|| wf_status == "REVISE")){

            // if(wf_status !="PAID"){
            //     //update active workflow
            //     updateStatWF();
            // }

            if(refinancing_flag == "N"){

                radio_value = $('input[name=fillter_pembayaran]:checked').val();
                if (radio_value == 'pdc') {
                    if ($('#chk-inkaso-pdc-dr').is(":checked")) {
                        inkaso_pt = 1;
                    } else {
                        inkaso_pt = 0;
                    }
                    //create_pdc_preterm(inkaso_pt);
                    update_pdc_head();
                    console.log('pdc');
                } else {
                    create_rv_preterm();
                    console.log('rv');
                }

            } else if(refinancing_flag == "R") {
                if(localStorage.getItem('rv_stat') == "1"){
                    alert_error("memo ini telah terconfirm");
                } else if(localStorage.getItem('rv_stat') == "2"){
                    alert_error("memo ini telah tercancel");
                } else {
                    jurnal_refinancing(refinancing_flag);
                }
            } else {

                if((tot_tenor/2) > tenorke){
                    alert_error('sudah harus bayar setengah untuk refinancing');
                } else if (tunggakan != 0) {
                    alert_error('kontrak Tidak boleh punya tunggakan');
                }  else {
                    if(localStorage.getItem('rv_stat') == "1"){
                        alert_error("memo ini telah terconfirm");
                    } else if(localStorage.getItem('rv_stat') == "2"){
                        alert_error("memo ini telah tercancel");
                    } else {
                        jurnal_refinancing(refinancing_flag);
                    }

                }

            }
        } else {
            alert_error('kontrak dalam proses workflow');
        }
    }
    } else { //else flagrole
        alert_error('Anda tidak memiliki privilege untuk tombol ini');
    }

});
//------------------------------------------Btn Create RV/PDC------------------------------------------

//---------------------------------------Create RV-----------------------------------------------------
function create_rv_preterm() {
    debugger;
    //
    var tgl_pelunasan = $('#tgl-pelunasan-preterm').val();
    /*   var tgl_pelunasan = new Date(tgl_pelunasanx).format('dd-mm-yyyy');*/
    //
    var contract_no = $('#contract_preterm').val();
    var uang_bayar = accounting.unformat($('#uang-bayar-preterm').val());
    var denda = accounting.unformat($('#denda-preterm').val());
    var deposit = accounting.unformat($('#tot-titipan-preterm').val());
    var sisa_pokok = accounting.unformat($('#sisa-pokok-preterm').val());
    var selisih_preterm = accounting.unformat($('#selisih-preterm').val());
    var bunga_harian = accounting.unformat($('#bunga-harian-preterm').val());
    var pinalty = accounting.unformat($('#hasil-pinalty-preterm').val());
    var bunga_dihapuskan = accounting.unformat($('#bunga-hapus-preterm').val());
    var no_memo = $('#no-memo-preterm').val();
    var persen_pinalty = accounting.unformat($('#pinalty-plus-preterm').val());
    var sumber_dana = $('#sumber-dana-preterm').val();
    var reason_preterm = $('#reason-preterm').val();
    var refinancing_flag = $('#slc-type-pelunasan').val();
    var wf_status = $('#inp-statuswf-pt').val();
    var diskon_lunas =  bunga_dihapuskan - bunga_harian - pinalty;

    if(diskon_lunas < 0 && financode == 2){
        diskon_lunas = 0;
    }

    $.ajax({
        url: 'Controller_pre_termination/create_rv_preterm',
        dataType: 'json',
        type: 'POST',
        data: {
            'branch_code': branch_code_pt,
            'contract_no': contract_no,
            'tgl_pelunasan': tgl_pelunasan,
            'uang_bayar': uang_bayar,
            'denda': denda,
            'deposit': deposit,
            'selisih_preterm': selisih_preterm,
            'sisa_pokok': sisa_pokok,
            'bunga_harian': bunga_harian,
            'pinalty': pinalty,
            'bunga_dihapuskan': bunga_dihapuskan,
            'no_memo': no_memo,
            'totbung_tunggakan': totbung_tunggakan,
            'totpok_tunggakan': totpok_tunggakan,
            'persen_pinalty': persen_pinalty,
            'sumber_dana': sumber_dana,
            'reason_preterm': reason_preterm,
            'refinancing_flag':refinancing_flag,
            'diskon_lunas' :diskon_lunas
        },

        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    if (response['errorConsole']) {
                        alert_error(response['errorConsole']);
                    } else if (response['status'] ==  false) {
                        alert_error(response['error'], function(){
                            alert_refresh();
                        });
                    } else {
                        $('#receive-preterm').val(response['rv']);
                        $('#btn-create-preterm').prop('disabled', true);
                        alert_info('Berhasil Create Preterm dengan no Rv. ' +response['rv']);
                        if(wf_status !="PAID"){
                            //update active workflow
                            updateStatWF();
                        }
                    }
                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error('Terjadi Kesalahan error{create_rv_preterm} =>' + e)
                }
            }

        },
        error: function(response) {
            console.log(response);
            alert_error('Tidak terhubung dengan server');
        }


    });
}
//---------------------------------------<X>Create RV-----------------------------------------------------

//----------------------------------------Create Pdc------------------------------------------------------
function create_pdc_preterm(inkaso_pt){
  var tgl_pelunasan = $('#tgl-pelunasan-preterm').val();
  var contract_no = $('#contract_preterm').val();
  var uang_bayar = accounting.unformat($('#uang-bayar-preterm').val());
  var denda = accounting.unformat($('#denda-preterm').val());
  var deposit = accounting.unformat($('#tot-titipan-preterm').val());
  var sisa_pokok = accounting.unformat($('#sisa-pokok-preterm').val());
  var selisih_preterm = accounting.unformat($('#selisih-preterm').val());
  var bunga_harian = accounting.unformat($('#bunga-harian-preterm').val());
  var pinalty = accounting.unformat($('#hasil-pinalty-preterm').val());
  var bunga_dihapuskan = accounting.unformat($('#bunga-hapus-preterm').val());
  var no_pdc = $('#inp-pdc-no-mdl').val();
  var pdc_due_date = $('#inp-due-date-mdl').val();
  var bank_branch = $('#inp-bank-branch-mdl').val();
  var bank_id = $('#slc-bank-iss-mdl').val();
  var no_memo = $('#no-memo-preterm').val();
  var persen_pinalty = accounting.unformat($('#pinalty-plus-preterm').val());
  var sumber_dana = $('#sumber-dana-preterm').val();
  var reason_preterm = $('#reason-preterm').val();
  var no_pdc = $('#inp-pdc-pt').val();
  var refinancing_flag = $('#slc-type-pelunasan').val();
  var wf_status = $('#inp-statuswf-pt').val();
  var diskon_lunas =  bunga_dihapuskan - bunga_harian - pinalty;

  if(diskon_lunas < 0 && financode == 2){
    diskon_lunas = 0;
}
console.log(inkaso_pt);
$.ajax({  
    url : 'Controller_pre_termination/create_pdc_preterm',
    dataType: 'json',
    type : 'POST',
    data:{
        'branch_code': branch_code_pt,
        'contract_no':contract_no,
        'uang_bayar':uang_bayar,
        'denda':denda,
        'deposit':deposit,
        'selisih_preterm':selisih_preterm,
        'sisa_pokok':sisa_pokok,
        'bunga_harian':bunga_harian,
        'pinalty':pinalty,
        'bunga_dihapuskan':bunga_dihapuskan,
        'totpok_tunggakan':totpok_tunggakan,
        'pdc_inkaso':inkaso_pt,
        'pdc_no':no_pdc,
        'pdc_due_date':pdc_due_date,
        'bank_branch':bank_branch,
        'bank_id':bank_id,
        'no_memo':no_memo,
        'tgl_pelunasan':tgl_pelunasan,
        'totbung_tunggakan':totbung_tunggakan,
        'totpok_tunggakan':totpok_tunggakan,
        'persen_pinalty':persen_pinalty,
        'sumber_dana':sumber_dana,
        'reason_preterm':reason_preterm,
        'refinancing_flag':refinancing_flag,
        'diskon_lunas': diskon_lunas
    },

    success:function(response){
        console.log(response);
        if(response){
          try{ 
            if(response['errorConsole']){
              alert_error(response['errorConsole']);
          }else if(response['status'] == false){
              alert_error(response['error']);
          } else {
              //alert_info('Data tersimpan dengan No PDC : '+ no_pdc);
          }

      }catch(e){
        $('#loading-ajax').hide();
        alert_error('Terjadi Kesalahan error{create_pdc_preterm} =>' + e )
    }
}

},
error:function(response){
  console.log(response);
  alert_error('Tidak terhubung dengan server');
}


});
}
//----------------------------------------<X>Create Pdc------------------------------------------------------

//-----------------------------------------Btn Print Preterm------------------------------------------------
$('#btn-print-preterm').click(function() {
    alert_confirm('apakah anda yakin ingin mencetak preterm?', function() {
        debugger;
        var contract_no = $('#contract_preterm').val();
        var memono = $('#no-memo-preterm').val();
        var totwajib = $('#tot-kewajiban-preterm').val()
        var bungahapusf = $('#bunga-hapus-preterm').val();
        var bungajalanf = $('#bunga-harian-preterm').val();
        var persenf = $('#pinalty-plus-preterm').val();
        var pinaltyf = $('#hasil-pinalty-preterm').val();
        var totbayar =  $('#tot-bayarkan-preterm').val();
        var tglpret  = $('#tgl-pelunasan-preterm').val();
        var sisapokokf = $('#sisa-pokok-preterm').val();
        var alamat = $('#alamat-termination').val();
        var instno = $('#pelunasan-ke-pretem').val();
        var sumber = $("#sumber-dana-preterm option:selected").text();
        var instnow = no_inst_preterm - 1;
        instno = Number(instno) + 1;
        var alasan = $("#reason-preterm option:selected").text()
        var selisih = $('#selisih-preterm').val();
        var titipanf = $('#tot-titipan-preterm').val();
        var uangbayar = $('#uang-bayar-preterm').val();
        //SYARIAH//
        var tunggkanf = $('#tot-pokok-preterm').val();
        var totalfas = $('#fasilitas-preterm').val();
        var totalangs = $('#angsuran-ter-preterm').val();
        var sisaangs = $('#sisa-ang-preterm').val();
       // var diskonpel = $('#diskon-preterm').val();
       var diskonpelm = Math.abs(Number($('#diskon-preterm').val().replace(/[^0-9.-]+/g,"")));
       $('#diskon-pel-preterm').val(accounting.formatMoney(diskonpelm, '', 2, ',', '.'));
       var diskonpel = accounting.formatMoney(diskonpelm, '', 2, ',', '.');
       //var sisa_diskon =  Number(accounting.unformat(sisaangs)) - diskonpelm;
       //sisa_diskon = accounting.formatMoney(sisa_diskon, '', 2, ',', '.');
       var dendaf  = $('#denda-preterm').val();
       var totSya = $('#uang-bayar-preterm').val();
       var titipanf = $('#tot-titipan-preterm').val();
        //var totSSya = $('#total-sya-by-preterm').val();
        var totSSya = $('#uang-bayar-preterm').val();

        var tipeFin = $('#fintype-preterm').val();


        // var fjabatan = 0; diskon-preterm
        // for(var i = 0 ; i < role_pret.length ; i++){
        // if(role_pret[i]['role_code'] === 'SAVE-DRAFT-PRETERM'){
        //         fjabatan +=1;
        //      }
        // if(role_pret[i]['role_code'] === 'SUBMIT-DRAFT-PRETERM'){
        //         fjabatan +=2;
        //      }
        //  }

        //== total = uang bayar - titipan
        var uangbayar2=accounting.unformat(uangbayar);
        var ttip =accounting.unformat(titipanf);
        var tottal = uangbayar2 + ttip;

        tottal = accounting.formatMoney(tottal, '', 2, ',', '.');


        var jabatan = "";
        if(locname.includes("MUFNET")){
            jabatan = "Kasir+";
        } else {
            jabatan = "Customer Service";
        }

        var front = {
            'tunggakan' :tunggkanf,
            'bungahapus':bungahapusf,
            'bungajalan':bungajalanf,
            'denda'     :dendaf,
            'persen'    :persenf,
            'pinalty'   :pinaltyf,
            'titipan'   :titipanf,
            'totwajib'  :tottal,
            'totbayar'  :uangbayar,
            'tgl'       :tglpret,
            'sisapokok' :sisapokokf,
            'sumber'    :sumber,
            'alasan'    :alasan,
            'alamat'    :alamat,
            'endtung'   :instnow,
            'starttung' :instno,
            'selisih'   :selisih,
            'titipanf'  :titipanf,
            'jabatan'   :jabatan,
            'totalfas'  :totalfas,
            'totalangs' :totalangs,
            'sisaangs'  :sisaangs,
            'diskonpel' :diskonpel,
            // 'sisadiskon' : sisa_diskon,
            'dendaf'    :dendaf,
            'totSya'    :totSya,
            'totSSya'   :totSSya

        };
        totwajib = accounting.unformat(totwajib);
        //if(memono == "" || memono == null){
        //    alert_error('Silahkan save terlebih dahulu');
       // } else {

        if (tipeFin=='SYARIAH')
        {
            $.ajax({
                url: 'Controller_pre_termination/print_preterm_sya',
                dataType: 'json',
                type: 'POST',
                data: {
                    'contract_no': contract_no,
                    'totwajib' : totwajib,
                    'branch_id': branch_code_pt,
                    'front'     : front
                },

                success: function(response) {
                    console.log(response);
                    if(response){
                     var printWindow = window.open();
                  //printWindow.document.open('text/plain')
                  printWindow.document.write('<pre id = "printss" style="font-size: 13px; text-rendering: optimizeLegibility;"></pre>');
                  printWindow.document.querySelector('pre').innerHTML = response;
                  printWindow.document.close();
                  printWindow.focus();
                  printWindow.print();
                  printWindow.close();
              } else{
                  alert_error('Data Gagal di Cetak');
              }
          },
          error: function(response) {
            console.log(response);
            alert_error('Tidak terhubung dengan server');
        }

            // window.href = 'Controller_pre_termination/print_preterm/' + contract_no;              
        });
}
else
{
    $.ajax({
        url: 'Controller_pre_termination/print_preterm',
        dataType: 'json',
        type: 'POST',
        data: {
            'contract_no': contract_no,
            'totwajib' : totwajib,
            'branch_id': branch_code_pt,
            'front'     : front
        },

        success: function(response) {
            console.log(response);
            if(response){
             var printWindow = window.open();
                  //printWindow.document.open('text/plain')
                  printWindow.document.write('<pre id = "printss" style="font-size: 13px; text-rendering: optimizeLegibility;"></pre>');
                  printWindow.document.querySelector('pre').innerHTML = response;
                  printWindow.document.close();
                  printWindow.focus();
                  printWindow.print();
                  printWindow.close();
              } else{
                  alert_error('Data Gagal di Cetak');
              }
          },
          error: function(response) {
            console.log(response);
            alert_error('Tidak terhubung dengan server');
        }

            // window.href = 'Controller_pre_termination/print_preterm/' + contract_no;              
        });




    //} // tutup else
}
});

});
//-----------------------------------------<X>Btn Print Preterm------------------------------------------------

//------------------------------------------Calculate sisa bayar-----------------------------------------------
$('#uang-bayar-preterm').change(function() {
    var bayar = $('#uang-bayar-preterm').val();
    total_bayar = $('#tot-bayarkan-preterm').val();
    bayar_preterm = accounting.unformat(bayar);
    tot_bayar = accounting.unformat(total_bayar);
    console.log(parseFloat(bayar_preterm));
    console.log(parseFloat(tot_bayar));

    var selisih = bayar_preterm - parseFloat(tot_bayar);
    console.log(selisih);
    $('#uang-bayar-preterm').val(accounting.formatMoney(bayar_preterm, '', 2, ',', '.'));
    $('#selisih-preterm').val(accounting.formatMoney(selisih, '', 2, ',', '.'));

});
//----------------------------------------JURNAL REFINANCING (CONFIRM)------------------------------------------------------

function jurnal_refinancing(ref_flag) {
    var wf_status = $('#inp-statuswf-pt').val();
    var cont_no = localStorage.getItem('cont_pret');
    var memo_no = localStorage.getItem('memo_pret');
    if (memo_no.length == '') {
        alert_error('nomor memo kosong');
    } else {
        $.ajax({
            url: 'Controller_pre_termination/jurnalRefinancing',
            dataType: 'json',
            type: 'POST',
            data: {
                'branch_id': branch_code_pt,
                'cont_no': cont_no,
                'memo_no': memo_no
            },
            success: function(response) {
                console.log(response);
                if(response['status'] == true){
                    if(response['msg']!=null){
                        alert_error(response['msg']);
                    } else {
                        if(ref_flag == 'R') {
                            alert_info("memo : "+memo_no+" berhasil di restructuring");
                        } else {
                            alert_info("memo : "+memo_no+" berhasil di refinancing");
                        }                       
                        if(wf_status !="PAID"){
                        //update active workflow
                        updateStatWF();
                    }
                    $('btn-create-preterm').prop("disabled",true);
                }
            } else {
              alert_error(response['errorConsole']);
          }


      },
      error: function(response) {
        console.log(response);
        alert_error('Tidak terhubung dengan server');

    }
})
}
}

//------------------------------------------Calculate sisa bayar-----------------------------------------------

//--------------------------------------------Get Data Memo----------------------------------------------------

function get_data_memo() {
    debugger;
    contract_no = $('#contract_preterm').val();
    no_memo = $('#no-memo-preterm').val();
    tgl_pelunasan = $('#tgl-pelunasan-preterm').val();
    isi_cabang($('#branch-id-pt').html());


    $.ajax({
        url: 'Controller_pre_termination/get_data_memo',
        dataType: 'json',
        type: 'POST',
        data: {
            'branch_id': branch_code_pt,
            'contract_no': contract_no,
            'tgl_pelunasan': tgl_pelunasan,
            'flag_pilot' : flag_pilot,
            'memo_no': no_memo
        },

        success: function(response) {
            console.log(response);
            try{
                var financetype = response['fintype'][0]['fin_desc'];
                financode = response['fintype'][0]['fin_code'];

                var flag_rv = true;
                var rv_stat = null
                if (response) {
                    try {
                        if (response['errorConsole']) {
                            if(response['errorConsole'].includes("no data found")){
                                alert_error("Data tidak ditemukan");
                            } else {
                                alert_error(response['errorConsole']);
                            }
                        } else {
                            $('#pinalty-plus-preterm').prop('disabled',true);
                            $('#uang-bayar-preterm').prop('disabled',true);
                            $('#sumber-dana-preterm').prop('disabled',true);
                            $('#reason-preterm').prop('disabled',true);
                            $('#tgl-pelunasan-preterm').prop('disabled',true);
                            var data_count = response['count'];
                            var pelunasan = data_count['no_instalment'];
                            var sisa_pokok = data_count['sisa_pokok'];
                            titipan = data_count['titipan'];
                            tot_pokok = data_count['tot_pokok'];
                            bunga_berjalan = data_count['bunga_berjalan'];
                            var tot_pinalty = data_count['tot_pinalty'];
                            bunga_hapus = data_count['bunga'];
                            var decodbungadn = data_count['decodbungadn'];
                            var decodpokokdn = data_count['decodpokokdn'];
                            dendapenalty = data_count['dendapenalty'];
                            diskon_lunas = data_count['dis_lunas'];
                            no_inst_preterm = data_count['no_inst_preterm'];
                            totbung_tunggakan = data_count['totbung_tunggakan'];
                            totpok_tunggakan = data_count['totpok_tunggakan'];

                            //keperluan cetakan preterm syariah
                            var tot_fas = data_count['tot_fas'];
                            var sisa_ang = data_count['sisa_ang'];
                            var tot_ang = data_count['tot_ang'];
                            $('#fasilitas-preterm').val(accounting.formatMoney(tot_fas, '', 2, ',', '.'));
                            $('#angsuran-ter-preterm').val(accounting.formatMoney(tot_ang, '', 2, ',', '.'));
                            $('#sisa-ang-preterm').val(accounting.formatMoney(sisa_ang, '', 2, ',', '.'));


                            isi_cabang(response['customer'][0]['branch_id']);
                            $('#contract_preterm').val(response['customer'][0]['contract_no']);

                            //label untuk syari'ah & konven
                            $('#fintype-preterm').val(financetype);
                            if (financetype =='SYARIAH')
                            {
                                document.getElementById('denda-preterm-cc').innerHTML = 'Sanksi yang harus dibayar Rp';
                                document.getElementById('bunga-preterm-harian').innerHTML = 'Margin Harian Rp';
                                document.getElementById('bunga-preterm-hapus').innerHTML = 'Margin yang dihapuskan Rp';
                                document.getElementById('penalty-preterm-plus').innerHTML = 'Biaya'; 

                            }
                            if (financetype =='KONVENSIONAL')
                            {
                                document.getElementById('denda-preterm-cc').innerHTML = 'Denda yang harus Dibayar Rp';
                                document.getElementById('bunga-preterm-harian').innerHTML = 'Bunga Harian Berjalan Rp';
                                document.getElementById('bunga-preterm-hapus').innerHTML = 'Bunga yang dihapuskan Rp';
                                document.getElementById('penalty-preterm-plus').innerHTML = 'Penality Plus'; 

                            }

                            $('#pelunasan-ke-pretem').val(pelunasan);
                            $('#sisa-pokok-preterm').val(accounting.formatMoney(sisa_pokok, '', 2, ',', '.'));
                            $('#tot-pokok-preterm').val(accounting.formatMoney(tot_pokok, '', 2, ',', '.'));
                            $('#bunga-harian-preterm').val(accounting.formatMoney(bunga_berjalan, '', 2, ',', '.'));
                            $('#denda-preterm').val(accounting.formatMoney(dendapenalty, '', 2, ',', '.'));

                            //$('#tot-kewajiban-preterm').val(tot_wajib);
                            $('#tot-titipan-preterm').val(accounting.formatMoney(titipan, '', 2, ',', '.'));
                            $('#bunga-hapus-preterm').val(accounting.formatMoney(bunga_hapus, '', 2, ',', '.'));

                            //show diskon pelunasan untuk kontrak syari'ah
                            if (financode == 2) {
                                $('#diskon-preterm-hide').show();
                                $('#diskon-preterm').val(accounting.formatMoney(diskon_lunas, '', 2, ',', '.'));
                            }
                            table_asset_termination.clear().draw();

                            $.each(response['customer'], function(index) {
                                tgl_kontrak = this['contract_date'];
                                no_cust = this['customer_no'];
                                nama_cust = this['customer_name'];
                                alamat = this['alamat_ktp'];
                                due_date = this['due_date'];
                                console.log(alamat);
                                table_asset_termination.row.add([
                                    this['police_no'],
                                    this['engine_no'],
                                    this['chassis_no']
                                    ]).draw(false);
                                $('#tgl-contract-preterm').val(tgl_kontrak);
                                $('#no-cust-preterm').val(no_cust);
                                $('#nama-cust-preterm').val(nama_cust);
                                $('#alamat-termination').val(alamat);
                                $('#tgl-tempo-termination').val(due_date);
                            });


                            $.each(response['DataMemo'], function() {
                                pinalty_persen = this['adm_fee'];
                                uang_bayar = this['fee_amt'];
                                alasan = this['preterm_reason'];
                                receive_no = this['receive_no'];
                                pinalty_plus = this['termination_admin'];
                                sumber_dana = this['fund_source'];
                                memo = this['memo_no'];
                                localStorage.setItem('rv_stat', this['rv_status']);
                                var ref_flag = this['refinancing_flag'];
                                var claim_status = this['claim_status'];
                                var banding_status = this['banding_status'];
                                var wf_status = this['wf_status'];
                                var total_pokok = response['tenor'];
                                var  mydate = new Date(this['memo_date']);
                                $('#inp-tgl-dummy').data("DateTimePicker").date(mydate);
                                var str = $('#inp-tgl-dummy').val();
                                $('#tgl-memo-preterm').val(str);

                                mydate = new Date(this['act_date']);
                                $('#inp-tgl-dummy').data("DateTimePicker").date(mydate);
                                str = $('#inp-tgl-dummy').val();
                                $('#tgl-pelunasan-preterm').val(str);

                                //PDC
                                if(this['payment_type'] == 1){
                                    $('input[type=radio][name=fillter_pembayaran][value="cash"]').prop("checked",false);
                                    $('input[type=radio][name=fillter_pembayaran][value="pdc"]').prop("checked",true);
                                    $('#btn-no-rv').hide();
                                    $('#btn-create-no-pdc').show();
                                    $('#div-show-pdc').show();
                                    $('#inp-pdc-pt').val(this['receive_no']);

                                    $('#inp-pdc-no-mdl').val(this['pdcno']);

                                    var  mydate = new Date(this['pdcdate']);
                                    $('#inp-tgl-dummy').data("DateTimePicker").date(mydate);
                                    var str = $('#inp-tgl-dummy').val();
                                    $('#inp-date-pdc-mdl').val(str);

                                    var  mydate = new Date(this['pdcduedate']);
                                    $('#inp-tgl-dummy').data("DateTimePicker").date(mydate);
                                    var str = $('#inp-tgl-dummy').val();
                                    $('#inp-due-date-mdl').val(str);

                                    $('#slc-bank-iss-mdl').val(this['bankid']);
                                    $('#inp-bank-branch-mdl').val(this['bankbr']);
                                    if(this['inkaso'] == 1){
                                        $('#chk-inkaso-pdc-dr').prop("checked",true);
                                    }

                                    $('#inp-sts-pdc').val(this['statuspdc']);

                                    $('#inp-pdc-no-mdl').prop("disabled", true);
                                    $('#inp-due-date-mdl').prop("disabled", true);
                                    $('#slc-bank-iss-mdl').prop("disabled", true);
                                    $('#inp-bank-branch-mdl').prop("disabled", true);
                                    $('#chk-inkaso-pdc-dr').prop("disabled", true);
                                } //RV
                                else {
                                    $('input[type=radio][name=fillter_pembayaran][value="cash"]').prop("checked",true);
                                    $('input[type=radio][name=fillter_pembayaran][value="pdc"]').prop("checked",false);
                                    $('#btn-no-rv').show();
                                    $('#btn-create-no-pdc').hide();
                                    $('#div-show-pdc').hide();
                                    $('#receive-preterm').val(this['receive_no']);

                                    $('#inp-pdc-no-mdl').prop("disabled", false);
                                    $('#inp-due-date-mdl').prop("disabled", false);
                                    $('#slc-bank-iss-mdl').prop("disabled", false);
                                    $('#inp-bank-branch-mdl').prop("disabled", false);
                                    $('#chk-inkaso-pdc-dr').prop("disabled", false);
                                }

                                $('#pinalty-plus-preterm').val(accounting.formatMoney(pinalty_persen, '', 2, ',', '.'));
                                $('#uang-bayar-preterm').val(accounting.formatMoney(uang_bayar, '', 2, ',', '.'));
                                $('#receive-preterm').val(receive_no);
                                $('#sumber-dana-preterm').val(sumber_dana);
                                $('#reason-preterm').val(alasan);
                                $('#no-memo-preterm').val(memo);
                                $('#inp-statuswf-pt').val(wf_status);
                                $('#inp-statusclaim-pt').val(claim_status);
                                $('#inp-statusbanding-pt').val(banding_status);
                                $('#total-pokok-preterm').val(total_pokok);

                            //added by asb 17/04/18
                            if(ref_flag == 'Y'){
                                $('#slc-type-pelunasan option[value=Y]').prop('selected','selected');
                                $('input[type=radio][name=fillter_pembayaran]').prop('checked', false);
                                $('input[type=radio][name=fillter_pembayaran]').prop('disabled', true);
                                $('#uang-bayar-preterm').prop('disabled', true);
                                $("#btn-create-preterm").html('Confirm');

                            } else if(ref_flag == 'R') {
                                //$("#slc-type-pelunasan").val("R").change();
                                $('#slc-type-pelunasan option[value=R]').prop('selected','selected');
                                $('input[type=radio][name=fillter_pembayaran]').prop('checked', false);
                                $('input[type=radio][name=fillter_pembayaran]').prop('disabled', true);
                                $('#denda-preterm').val(accounting.formatMoney(this['outst_penalty'], '', 2, ',', '.'));
                                $('#uang-bayar-preterm').prop('disabled', true);
                                $("#btn-create-preterm").html('Confirm');
                            } else {
                                $('#slc-type-pelunasan option[value=N]').prop('selected','selected');
                                $('input[type=radio][name=fillter_pembayaran]').prop('disabled', false);
                             //$('#uang-bayar-preterm').prop('disabled', false);
                             $("#btn-create-preterm").html('Create RV/PDC');
                            }

                            $('input[type=radio][name=fillter_pembayaran]').prop('disabled', true);
                            $('#slc-type-pelunasan').prop("disabled",true); 

                            //resolve prod tidak count 0
                            $('#bunga-harian-preterm').val(accounting.formatMoney(this['days_interest'], '', 2, ',', '.'));
                            pinalty_plus = Math.round(pinalty_persen * parseFloat(this['outst_principal']) / 100);
                            titipan = this['depo_amt'];
                            tot_pokok = this['due_principal'] + this['due_interest'];
                            $('#tot-pokok-preterm').val(accounting.formatMoney(tot_pokok, '', 2, ',', '.'));

                            $('#hasil-pinalty-preterm').val(accounting.formatMoney(pinalty_plus, '', 2, ',', '.'));

                            //diskon_lunas =  this['outst_interest'] - this['days_interest'] - this['outst_penalty'];
                            //diskon pelunasan untuk kontrak syari'ah
                            diskon_lunas =  this['outst_interest'] - this['days_interest'] - pinalty_plus;
                            if (diskon_lunas < 0 && financode == 2) {
                                diskon_lunas = 0;
                            }
                            //issue prod java tidak jalan, hasil count selalu 0
                            // if (diskon_lunas !== 0) {
                            //     tot_wajib = parseFloat(sisa_pokok) + parseFloat(pinalty_plus) + parseFloat(dendapenalty) + parseFloat(bunga_berjalan) + parseFloat(tot_pokok);
                            // } else {
                            //     tot_wajib = parseFloat(sisa_pokok) + parseFloat(bunga_hapus) + parseFloat(dendapenalty) + parseFloat(tot_pokok);
                            // }
                            $('#diskon-preterm').val(accounting.formatMoney(diskon_lunas, '', 2, ',', '.'));

                            if (diskon_lunas !== 0) {
                                tot_wajib = parseFloat(this['outst_principal']) + parseFloat(pinalty_plus) + parseFloat(this['outst_penalty']) + parseFloat(this['days_interest']) + parseFloat(tot_pokok);
                            } else {
                                tot_wajib = parseFloat(this['outst_principal']) + parseFloat(this['outst_interest']) + parseFloat(this['outst_penalty']) + parseFloat(tot_pokok);
                            }

                            total_bayar = tot_wajib - titipan;
                            sisa_bayar = uang_bayar - total_bayar;
                            console.log('total bayar: ' + total_bayar);
                            console.log('selisih bayar: ' + sisa_bayar);

                            $('#tot-titipan-preterm').val(accounting.formatMoney(this['depo_amt'], '', 2, ',', '.'));
                            $('#tot-kewajiban-preterm').val(accounting.formatMoney(tot_wajib, '', 2, ',', '.'));
                            $('#tot-bayarkan-preterm').val(accounting.formatMoney(total_bayar, '', 2, ',', '.'));
                            $('#selisih-preterm').val(accounting.formatMoney(sisa_bayar, '', 2, ',', '.'));
                            $('#btn-create-preterm').prop('disabled', false);
                            $('#btn-cancel-preterm').prop('disabled', false);

                            rv_stat = this['rv_status'];

                            //rv status confirm / cancel
                            if(rv_stat != '0' || sisa_pokok == 0){
                                $('#pelunasan-ke-pretem').val(this['insta_no']);
                                $('#sisa-pokok-preterm').val(accounting.formatMoney(this['outst_principal'], '', 2, ',', '.'));

                                var tunggakanzz = this['due_interest'] + this['due_principal'];
                                $('#tot-pokok-preterm').val(accounting.formatMoney(tunggakanzz, '', 2, ',', '.'));
                                $('#bunga-harian-preterm').val(accounting.formatMoney(this['days_interest'], '', 2, ',', '.'));
                                $('#denda-preterm').val(accounting.formatMoney(this['outst_penalty'], '', 2, ',', '.'));

                                //$('#tot-kewajiban-preterm').val(tot_wajib);
                                $('#tot-titipan-preterm').val(accounting.formatMoney(this['depo_amt'], '', 2, ',', '.'));
                                $('#bunga-hapus-preterm').val(accounting.formatMoney(this['outst_interest'], '', 2, ',', '.'));
                                pinalty_plus = Math.round(pinalty_persen * this['outst_principal'] / 100);
                                $('#hasil-pinalty-preterm').val(accounting.formatMoney(pinalty_plus, '', 2, ',', '.'));

                                //perhitungan diskon pelunasan kontrak syari'ah
                                var diskons = this['outst_penalty'] - this['days_interest'] - pinalty_plus;
                                if (diskons < 0 && financode == 2) {
                                    diskons = 0;
                                }
                            
                                $('#pinalty-plus-preterm').prop('disabled',true);
                                $('#uang-bayar-preterm').prop('disabled',true);
                                $('#btn-create-preterm').prop('disabled',true);
                                $('#btn-save-preterm').prop('disabled',true);
                                //$('#btn-print-preterm').prop('disabled',true);
                                $('#btn-cancel-preterm').prop('disabled',true);

                                tot_pokok = this['due_principal'] + this['due_interest'];

                                total_bayar = tot_wajib - this['depo_amt'];
                                console.log('total bayar: ' + total_bayar);
                                sisa_bayar = uang_bayar - total_bayar;
                                $('#tot-kewajiban-preterm').val(accounting.formatMoney(tot_wajib, '', 2, ',', '.'));
                                $('#tot-bayarkan-preterm').val(accounting.formatMoney(total_bayar, '', 2, ',', '.'));
                                $('#selisih-preterm').val(accounting.formatMoney(sisa_bayar, '', 2, ',', '.'));

                                if(rv_stat == '2'){
                                    alert_info("Memo telah tercancel");
                                } else if(rv_stat == '1'){
                                    if (this['receive_no'] == null){
                                        $('#tot-pokok-preterm').val(accounting.formatMoney(tot_pokok, '', 2, ',', '.'));
                                        alert_info("Memo telah terconfirm");
                                    } else {
                                        if(this['payment_type'] == 1){
                                            alert_info("Memo telah terconfirm dengan no PDC "+ this['receive_no']);
                                        } else {
                                            alert_info("Memo telah terconfirm dengan no RV "+ this['receive_no']);
                                        }
                                        $('#tot-pokok-preterm').val(accounting.formatMoney(response['tunggakanmemo'], '', 2, ',', '.'));
                                    }                                                             
                                }else {
                                    alert_info("Kontrak sudah tidak aktif");
                                }
                            }
                });

                ref_bayar = $('#uang-bayar-preterm').val();
                localStorage.setItem('cont_pret', $('#contract_preterm').val());
                localStorage.setItem('memo_pret', $('#no-memo-preterm').val());
                                    //$('#pinalty-plus-preterm').change();    

                    }
                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error('Terjadi Kesalahan error{get_data_memo} =>' + e);
                }

                } 
            }catch (e) {
                $('#loading-ajax').hide();
                alert_error('Data tidak ditemukan');
            }


        },
        error: function(response) {
            console.log(response);
            alert_error('Tidak terhubung dengan server'); },async : false

        });
        //get_termiSya(); remark karena prosesnya bisa disederhanakan
        }

function get_termiSya(){
    var contract_no = $('#contract_preterm').val();
    console.log(branch_code_pt);
    //
    var tgl_pelunasan = $('#tgl-pelunasan-preterm').val();
    /*   var tgl_pelunasan = new Date(tgl_pelunasanx).format('dd-mm-yyyy');*/
    $.ajax({
       url: 'Controller_pre_termination/get_contract_termination_con',
       dataType: 'json',
       type: 'POST',
       data: {
        'branch_id': branch_code_pt,
        'contract_no': contract_no,
        'tgl_pelunasan': tgl_pelunasan
    },
    success: function(response){
          // response = $.parseJSON(response);
          console.log(response);
          debugger;
          if (response) {
            try{ var data_count = response['count'];
            var titipan = Math.abs(Number($('#tot-titipan-preterm').val().replace(/[^0-9.-]+/g,"")));
            var dendapenalty = data_count['dendapenalty'];
            var tot_fas = data_count['tot_fas'];
            var sisa_ang = data_count['sisa_ang'];
            var diskon_lunas = $('#diskon-preterm').val();
            if (diskon_lunas < 0 && fin_code == 2) {
                diskon_lunas = 0;
            }
            var tot_ang = data_count['tot_ang'];;
            var totSya = sisa_ang-diskon_lunas-dendapenalty;
            var toySyaBayar = totSya - titipan;

            $('#fasilitas-preterm').val(accounting.formatMoney(tot_fas, '', 2, ',', '.'));
            $('#angsuran-ter-preterm').val(accounting.formatMoney(tot_ang, '', 2, ',', '.'));
            $('#sisa-ang-preterm').val(accounting.formatMoney(sisa_ang, '', 2, ',', '.'));

            $('#diskon-pel-preterm').val(accounting.formatMoney(diskon_lunas, '', 2, ',', '.'));
            $('#total-sya-preterm').val(accounting.formatMoney(totSya, '', 2, ',', '.'));
            $('#total-sya-by-preterm').val(accounting.formatMoney(toySyaBayar, '', 2, ',', '.'));
            var financetype = $('#fintype-preterm').val();
            if (financetype =='SYARIAH')
            {
                document.getElementById('denda-preterm').innerHTML = 'Sanksi yang harus dibayar Rp';
                document.getElementById('bunga-preterm-harian').innerHTML = 'Margin Harian Rp';
                document.getElementById('bunga-preterm-hapus').innerHTML = 'Margin yang dihapuskan Rp';
                document.getElementById('penalty-preterm-plus').innerHTML = 'Biaya';


            }
            if (financetype =='KONVENSIONAL')
            {
                document.getElementById('denda-preterm').innerHTML = 'Denda yang harus Dibayar Rp';
                document.getElementById('bunga-preterm-harian').innerHTML = 'Bunga Harian Berjalan Rp';
                document.getElementById('bunga-preterm-hapus').innerHTML = 'Bunga yang dihapuskan Rp';
                document.getElementById('penalty-preterm-plus').innerHTML = 'Penality Plus'; 
            }


        }catch(e){
              $('#loading-ajax').hide(); //menutup loading ajax
              console.log(e);
              alert_error(e);
          }
      }else{
        alert_error(response);
    }
},
error: function(response){
  console.log(response);
  alert_error('Jaringan terputus, Silahkan coba lagi !');
}
});
}

//--------------------------------------------<X>Get Data Memo----------------------------------------------------


//---------------------------------------------On Change Pinalty Plus----------------------------------------------

$('#pinalty-plus-preterm').change(function() {

  var sisa_pokok = accounting.unformat($('#sisa-pokok-preterm').val());
  var pinalty_persen = accounting.unformat($('#pinalty-plus-preterm').val());

  var dendapenalty = accounting.unformat($('#denda-preterm').val());
  var tot_pokok = accounting.unformat($('#tot-pokok-preterm').val());
  var bunga_berjalan = accounting.unformat($('#bunga-harian-preterm').val());
  var titipan = accounting.unformat($('#tot-titipan-preterm').val());
  var bunga_hapus = accounting.unformat($('#bunga-hapus-preterm').val());
  var pinalty_plus = Math.round(pinalty_persen * sisa_pokok / 100);
  $('#hasil-pinalty-preterm').val(accounting.formatMoney(pinalty_plus, '', 2, ',', '.'));
  var hasil_pinalty = accounting.unformat($('#hasil-pinalty-preterm').val());

  var diskon_lunas =  accounting.unformat($('#diskon-preterm').val());

  diskon_lunas = parseFloat(bunga_hapus) - parseFloat(hasil_pinalty) - parseFloat(bunga_berjalan);


  if(diskon_lunas < 0 && financode == 2){
    diskon_lunas = 0;
}
$('#diskon-preterm').val(accounting.formatMoney(diskon_lunas, '', 2, ',', '.'));
      // console.log(diskon_lunas);
      // console.log(sisa_pokok);
      // console.log(hasil_pinalty);
      // console.log(dendapenalty);
      // console.log(bunga_berjalan);


      if (diskon_lunas != 0) {
          var tot_wajib = parseFloat(sisa_pokok) + parseFloat(hasil_pinalty) + parseFloat(dendapenalty) + parseFloat(bunga_berjalan) + parseFloat(tot_pokok);
     } else {
          var tot_wajib = parseFloat(sisa_pokok) + parseFloat(bunga_hapus) + parseFloat(dendapenalty) + parseFloat(tot_pokok);
    }

      var total_bayar = tot_wajib - titipan;
      console.log(total_bayar);
      $('#uang-bayar-preterm').val(accounting.formatMoney(total_bayar, '', 2, ',', '.'));
      var bayar = accounting.unformat($('#uang-bayar-preterm').val());
      sisa_bayar = 0;
      $('#tot-kewajiban-preterm').val(accounting.formatMoney(tot_wajib, '', 2, ',', '.'));
      $('#tot-bayarkan-preterm').val(accounting.formatMoney(total_bayar, '', 2, ',', '.'));
      $('#selisih-preterm').val(accounting.formatMoney(sisa_bayar, '', 2, ',', '.'));

  });

//--------------------------------------------- GET ROLE CODE -------------------------------------------//
if (!localStorage.getItem('role_user_pret')) {
    $.ajax({
        url : "Controller_home/get_detail_user",
        cache : false,
        success : function(response){
            if(response){
                try{
                    console.log(response);
                    localStorage.setItem('role_user_pret', response);
                    role_pret = $.parseJSON(localStorage.getItem('role_user_pret'));
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
    role_pret = $.parseJSON(localStorage.getItem('role_user_pret'));
    console.log('asb else');
}

var locname;
$.ajax({
    url : base_url+"Controller_pre_termination/getLocationName",
    cache : false,
    success : function(response){
        if(response){
            try{
                console.log(response);
                locname = response;
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

function bank_pret_pdc(bank_st, br_code) {
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

                        // $("#modal-pdc").modal({
                        //     show: true,
                        //     backdrop: 'static'
                        // });
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
}

$('#inp-tgl-dummy').datetimepicker({
  format: 'DD-MMM-YYYY',
});

function update_pdc_head(){
    debugger;
    var pdc_no = $('#inp-pdc-pt').val();
    var branch_id = $('#inp-branch-name-pt').val();
    var wf_status = $('#inp-statuswf-pt').val();
    

    $.ajax({
        url: 'Controller_pre_termination/updatePdcHead',
        dataType: 'json',
        type: 'POST',
        data: {
            'pdc_no': pdc_no,
            'branch_id' : branch_code_pt
        },
        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    if (response['status']){
                        alert_info("Berhasil membuat PDC dengan no PDC "+pdc_no);
                        if(wf_status !="PAID"){
                            //update active workflow
                            updateStatWF();
                        }
                    } else {
                        alert_error("Gagal Membuat PDC");
                    }
                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error('Terjadi Kesalahan error{update_pdc_head} =>' + e)
                }
            }
        },
        error: function(response) {
            console.log(response);
            alert_error('Tidak terhubung dengan server');
        }
    });

}

function updateStatWF(){

    var memo = localStorage.getItem('memo_pret');
    $.ajax({
        url: 'Controller_pre_termination/updateStatusWF',
        dataType: 'json',
        type: 'POST',
        data: {
            'memo': memo
        },
        success: function(response) {
            console.log(response);
            if (response) {
                try {
                    if (response['status']){
                        //alert_info("Berhasil Update active WF ");
                    } else {
                        //alert_error("Gagal Update active WF");
                    }
                } catch (e) {
                    $('#loading-ajax').hide();
                    alert_error('Terjadi Kesalahan error{update_WF} =>' + e)
                }
            }
        },
        error: function(response) {
            console.log(response);
            alert_error('Tidak terhubung dengan server');
        }
    });



}
//---------------------------------------------<X>On Change Pinalty Plus----------------------------------------------