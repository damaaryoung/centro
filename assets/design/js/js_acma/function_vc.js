/*======================================================JS ONLOAD======================================================*/
$("#fde-view-vc").hide();
$("#branch-ho-select").hide();
/*$("#tab-costumer-vc, #div-perorangan-vc").hide();*/
$("#tab-costumer-com-vc, #div-com-vc").hide();
var detail_display="";
var data_display_selected ="";
var search_dealer = $("#dealer-select-vc").val();
var arr_contract_checked = [];
var arr_amount_checked = [];
var total_amount_vc = 0;
var no_id;
var color_checked_vc;
var engine_checked_vc;
var chasis_checked_vc;
var capacity_checked_vc;
var invoice_no_checked_vc;
var bastk_no_checked_vc ;
var invoice_date_checked_vc;
var bastk_date_checked_vc;
var pending_checked_vc;
var pending_html="<option value = '0'>-</option>";

//var i = 1;
disable_button_vc();


$('html, body').animate({scrollTop:0}, 'slow');

/*NO SPECIAL CHARACTER KEY PRESSED*/
$('#tbl-display').on('keydown','.no-special-char', function(e) {
  -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || /65|67|86|88/.test(e.keyCode) 
  && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode 
  && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 90 < e.keyCode) 
  && (96 > e.keyCode || 105 < e.keyCode) 
  && e.preventDefault()
});

/*NUMBER ONLY CHARACTER KEY PRESSED*/
$('#tbl-display').on('keydown', '.num-only',function(e) {
  -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
});

/*DATEPICKER INSIDE DATATABLE*/
$('#tbl-display').on('focus','.input-date-vc',function(e){
  $('.input-date-vc').datepicker({
    format : 'dd-M-yyyy',
    autoclose : true,
    endDate: '+0d',
/*    format: 'DD-MMM-YYYY',
    maxDate: 'now',
    allowInputToggle: true*/
  });
});

/*BRANCH LOGGED (HARDCODE)*/
var branchcode_logged ="0104";
console.log(branchcode_logged);
var branchdesc_logged = "CIKARANG";
//console.log($('#branch-code-logged-vc').val());
//$('#branch-code-logged-vc').val(branchcode_logged);
//$('#branch-logged-vc').val(branchcode_logged + ' - ' + branchdesc_logged);
$("#branch-logged-vc").html("<option value = '" + branchcode_logged+"'>" + branchcode_logged + " - " + branchdesc_logged + " </option>");
console.log(branchcode_logged);
/*
$('#detail-duedate-vc, #detail-invoice-date-vc, #detail-bastk-date-vc').datetimepicker({
  format: 'DD-MMM-YYYY'
});*/

/*LOAD DATA BANK INFORMATION*/
if ($("#dealer-select-vc").length){
  load_param_pending();
  $("#modal-dealer").on("hidden.bs.modal", function () {
    if ($('#dealer-code-select-vc').val() !== '')
    {
      bank_info_vc();
    }
  });
}

/*SYSDATE*/
var today = new Date();
var onemonthlater = new Date();
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
var mm2 = month[onemonthlater.getMonth()+1];
var yyyy = today.getFullYear();

if(dd<10){
  dd='0'+dd;
} 

var today = dd+'-'+mm+'-'+yyyy;
/*SYSDATE + 30 DAY*/
var onemonthlater = dd+'-'+mm2+'-'+yyyy;
//console.log(onemonthlater);
$("#date-now-vc").val(today);

/*DATATABLE*/
var tabel_display = $('#tbl-display').DataTable({
  paging: true,
  deferRender: true,
  ordering: false,
  //bPaginate : false,
  scrollY: "200px",
  scrollX : true,
  /*scrollX: "100%",*/
  scrollCollapse: true,
  /*fixedColumns: true,*/
/*  fixedColumns:   {
            leftColumns: 0,
            rightColumns: 3,
            heightMatch: 'semiauto'
          },*/
          columnDefs: [ 
          {
            targets: [ 21,22,23 ],
            visible: false
          },
          // { 
          //   className: "has-error", "targets": [10] },
          ],
          order: [[ 2, 'asc' ]]
        });

/*DATATABLE ON TR CLICKED*/
$('#tbl-display tbody').on( 'click', 'tr', function () {
  if ( !$(this).hasClass('selected') ) {
    tabel_display.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    data_display_selected = tabel_display.row(this).data();

    var data_contract_vc_selected = data_display_selected[6];/*$('#data_contract_no_vc'+data_display_selected[2]).html();*/
    var data_app_vc_selected = data_display_selected[3]/*$('#data_app_no_vc'+data_display_selected[2]).html();*/
    var data_amount_vc_selected = data_display_selected[18]
    var data_due_date_selected = data_display_selected[9]/*$('#data_due_date_vc'+data_display_selected[2]).val();*/

    /*var data_applicant_order_object_id_vc = $('#data_app_order_object_id_vc'+data_display_selected[2]).html();
    var applicant_order_id_vc = ($('#data_app_order_id_vc'+data_display_selected[2]).html());*/

    applicant_order_id_vc = data_display_selected[21];
    data_applicant_order_object_id_vc =  data_display_selected[22] ;

    console.log(data_contract_vc_selected);
    console.log(data_applicant_order_object_id_vc);
    console.log(applicant_order_id_vc);
    console.log(branchcode_logged);
    
    $('#detail-interest2-vc').val(data_due_date_selected);
    $('#detail-duedate-vc').val(data_due_date_selected);
    var cust_name_selected = data_display_selected[8]/*$('#data_costumer_name_vc'+data_display_selected[2]).html();*/
    console.log (cust_name_selected);
    

    $.ajax({
      url: "Controller_verification_confirmation/get_detail_via_acq_vc",
      type: 'POST',
      dataType: 'json',
      data: {
        "branch_code_logged" : branchcode_logged,
        "contract_no_selected" : data_contract_vc_selected,
        "applicant_order_object_id": data_applicant_order_object_id_vc,
        "applicant_order_id": applicant_order_id_vc,
      },
      success:function(response){

       if (response)
       {
        try {

          if (response['obj_auto']['subsidi'].length == 0)
          {
            console.log('Tidak ada data subsidi');
          }
          var detail_data_branch_code_vc = branchcode_logged;
          var detail_data_branch_name_vc = branchdesc_logged;
          $('#detail-branch-vc').val(detail_data_branch_code_vc + " - " + detail_data_branch_name_vc);

          var detail_data_dealer_code_vc = $('#dealer-code-select-vc').val();
          var detail_data_dealer_name_vc = $('#dealer-select-vc').val();
          $('#detail-dealer-vc').val(detail_data_dealer_code_vc + " - " + detail_data_dealer_name_vc);
/*
          var detail_data_address_vc = this['address'];
          $('#detail-address-vc').val(detail_data_address_vc);


          var detail_data_address_vc = this['address'];
          $('#detail-address-vc').val(detail_data_address_vc);*/


          var struktur_kredit_acq = response['obj_auto']['struktur_kredit'][0]['data1'];

          var detail_data_dp_total_vc = struktur_kredit_acq['gross_dp'];
          $('#detail-dp-total-vc').val(accounting.formatMoney(detail_data_dp_total_vc, '', 2, ',', '.'));

          var detail_data_1st_installment_vc = struktur_kredit_acq['first_installment_amt'];
          $('#detail-1st-installment-vc').val(accounting.formatMoney(detail_data_1st_installment_vc, '', 2, ',', '.'));

          var detail_data_dp_net_vc = struktur_kredit_acq['nett_dp'];
          $('#detail-dp-net-vc').val(accounting.formatMoney(detail_data_dp_net_vc, '', 2, ',', '.'));

          var detail_data_principal_vc = struktur_kredit_acq['total_prin_amt'];
          $('#detail-principal-vc').val(accounting.formatMoney(detail_data_principal_vc, '', 2, ',', '.'));

          var biaya_acq = response['obj_auto']['biaya'];
          var detail_data_paid_adm_vc = biaya_acq[0]['total_fee_amt'];
          $('#detail-paid-adm-vc').val(accounting.formatMoney(detail_data_paid_adm_vc, '', 2, ',', '.'));

          var detail_data_paid_fiducia_vc = biaya_acq[1]['total_fee_amt'];
          $('#detail-paid-fiducia-vc').val(accounting.formatMoney(detail_data_paid_fiducia_vc, '', 2, ',', '.'));

          var detail_data_fiducia_fin_vc = biaya_acq[1]['total_fee_fin'];
          $('#detail-fiducia-financed-vc').val(accounting.formatMoney(detail_data_fiducia_fin_vc, '', 2, ',', '.'));

          var detail_notaris_vc = biaya_acq[2]['total_fee_amt'];
          $('#detail-notaris-vc').val(accounting.formatMoney(detail_notaris_vc, '', 2, ',', '.'));

          var detail_provisi_paid_vc = biaya_acq[3]['total_fee_amt'];
          $('#detail-provisi-paid-vc').val(accounting.formatMoney(detail_provisi_paid_vc, '', 2, ',', '.'));

          var detail_provisi_fin_vc = biaya_acq[3]['total_fee_fin'];
          $('#detail-provisi-fin-vc').val(accounting.formatMoney(detail_provisi_fin_vc, '', 2, ',', '.'));
          $('#detail-provisi-total-vc').val(accounting.formatMoney(detail_provisi_fin_vc + detail_provisi_paid_vc, '', 2, ',', '.'));

          var insurance_acq = response['obj_auto']['asuransi'];
          var detail_data_paid_ins_vc = insurance_acq[0]['toal_insr_fee'];
          $('#detail-paid-ins-vc').val(accounting.formatMoney(detail_data_paid_ins_vc, '', 2, ',', '.'));

          var detail_data_paid_insr2_vc =  insurance_acq[1]['toal_insr_fee'];
          $('#detail-paid-insr2-vc').val(accounting.formatMoney(detail_data_paid_insr2_vc, '', 2, ',', '.'));

          var detail_data_fin_insr2_vc =  insurance_acq[1]['total_fee_fin'];
          $('#detail-fin-insr2-vc').val(accounting.formatMoney(detail_data_fin_insr2_vc, '', 2, ',', '.'));
          $('#detail-insr2-total-vc').val(accounting.formatMoney(detail_data_paid_insr2_vc + detail_data_fin_insr2_vc, '', 2, ',', '.'));

          var subsidi_acq = response['obj_auto']['subsidi'];
          var detail_subsidi_dp_vc = subsidi_acq[0]['loan_subs_amt'];
          $('#detail-subsidi-dp-vc').val(accounting.formatMoney(detail_subsidi_dp_vc, '', 2, ',', '.'));

          var detail_jp_vc = subsidi_acq[1]['loan_subs_amt'];
          $('#detail-jp-vc').val(accounting.formatMoney(detail_jp_vc, '', 2, ',', '.'));

          var detail_data_ref_adm_vc = subsidi_acq[2]['loan_subs_amt'];
          $('#detail-ref-adm-vc').val(accounting.formatMoney(detail_data_ref_adm_vc, '', 2, ',', '.'));

          var detail_bbn_dealer_vc = subsidi_acq[3]['loan_subs_amt'];
          $('#detail-bbn-dealer-vc').val(accounting.formatMoney(detail_bbn_dealer_vc, '', 2, ',', '.'));

          var detail_subsidi_pp_vc = subsidi_acq[4]['loan_subs_amt'];
          $('#detail-subsidi-potong-pelunasan-vc').val(accounting.formatMoney(detail_subsidi_pp_vc, '', 2, ',', '.'));

          var detail_subsidi_klaim_atmp_vc = subsidi_acq[5]['loan_subs_amt'];
          $('#detail-subsidi-klaim-dana-atpm-vc').val(accounting.formatMoney(detail_subsidi_klaim_atmp_vc, '', 2, ',', '.'));

          var detail_adm_vc = subsidi_acq[6]['loan_subs_amt'];
          $('#detail-adm-vc').val(accounting.formatMoney(detail_adm_vc, '', 2, ',', '.'));

          var detail_data_bbn_mu_vc = subsidi_acq[7]['loan_subs_amt'];
          $('#detail-bbn-mu-vc').val(accounting.formatMoney(detail_data_bbn_mu_vc, '', 2, ',', '.'));

          var detail_komisi_langsung_vc = subsidi_acq[8]['loan_subs_amt'];
          $('#detail-komisi-langsung-vc').val(accounting.formatMoney(detail_komisi_langsung_vc, '', 2, ',', '.'));

          var detail_data_discount_vc = subsidi_acq[9]['loan_subs_amt'];
          $('#detail-discount-vc').val(accounting.formatMoney(detail_data_discount_vc, '', 2, ',', '.'));
          $('#detail-diskom-vc').val(accounting.formatMoney(detail_komisi_langsung_vc + detail_data_discount_vc, '', 2, ',', '.'));

              /*

              var detail_subsidi_rate_vc = this['subsidi_rate'];
              $('#detail-subsidi-rate-vc').val(accounting.formatMoney(detail_subsidi_rate_vc, '', 2, ',', '.'));

              var detail_subsidi_rate_eff_vc = this['rate_eff_b4_subsidy'];
              $('#detail-rate-eff-b4-subsidy-vc').val(accounting.formatMoney(detail_subsidi_rate_eff_vc, '', 2, ',', '.'));

              var detail_subsidi_rate_flat_vc = this['rate_flat_b4_subsidy'];
              $('#detail-rate-flat-b4-subsidy-vc').val(accounting.formatMoney(detail_subsidi_rate_flat_vc, '', 2, ',', '.'));
              */
              var obj_detail = response['obj_detail']['ListObjectCode'][0];
              var address_detail = response['alamat_detail']['Data'][0];
              var get_obj_detail = response['get_obj_detail'];
              var objek_acq = response['obj_auto']['objek'][0]['data1'];
              $('#title-detail-selected-vc').html(data_app_vc_selected + " - " + obj_detail['obj_desc'] + " - " + obj_detail['obj_brand_desc'] + " - " + obj_detail['obj_model_desc'] + " - " + obj_detail['obj_type_desc'] + " Rp. " + accounting.formatMoney(objek_acq['object_otr'], '', 2, ',', '.'));
              $('#detail-address-vc').val(get_obj_detail['adress_street'] + " - " + address_detail['kel_name'] + " - " + address_detail['kec_name'] + " - " + address_detail['kab_name']);
              console.log(response); 
            } catch(e) {
             $('#loading-screen').hide();
             return undefined;
             modal_alert("Terjadi kesalahan, Hubungi Tim IT");
             console.log(response);
             console.log(e);
           }
         }
       }, 
       error: function(response) {
        console.log(response);
      }
    });

}
});

$('#tbl-display').on( 'click', '.checked-data-vc', function () {
  var checked_row_vc = tabel_display.row( $(this).parents('tr') ).data();
  no_id = checked_row_vc[2];
  var contract_checked_vc = checked_row_vc[6];/*$('#data_contract_no_vc'+no_id).html();*/
/*  var color_checked_vc = $('#data_color_vc'+no_id).val();
  var engine_checked_vc = $('#data_engine_vc'+no_id).val();
  var chasis_checked_vc = $('#data_chasis_no_vc'+no_id).val();
  var capacity_checked_vc = $('#data_capacity_vc'+no_id).val();
  var invoice_no_checked_vc = c$('#data_invoice_vc'+no_id).val();
  var bastk_no_checked_vc = $('#data_bastk_no_vc'+no_id).val();
  var invoice_date_checked_vc = $('#data_invoice_date_vc'+no_id).val();
  var bastk_date_checked_vc = $('#data_bastk_date_vc'+no_id).val();*/
  var amount_checked_vc = checked_row_vc[18];
  var amount_checked_unformatted_vc = accounting.unformat(amount_checked_vc);
  var index = $.inArray(amount_checked_unformatted_vc, arr_amount_checked);

  if (this.checked) {
    arr_contract_checked.push(contract_checked_vc);
    arr_amount_checked.push(amount_checked_unformatted_vc);
    total_amount_vc = 0;

  }else{
    arr_contract_checked.splice(index, 1);
    arr_amount_checked.splice(index, 1);
    total_amount_vc = 0;

  }
  for (var tcount = 0; tcount < arr_amount_checked.length; tcount++) {
    total_amount_vc += arr_amount_checked[tcount] << 0;
  } 

  $('#total-amount-vc').val(accounting.formatMoney(total_amount_vc, '', 2, ',', '.'));
  console.log(arr_contract_checked);
  console.log(arr_amount_checked);
  console.log(total_amount_vc);
  /*console.log(color_checked_vc);*/
});

/*NUMBER ONLY KEY PRESSED*/
//var numkey = ['#search-by-vc'];
$('#search-by-vc').on('keydown', function(e) {
  -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
});
/*END*/


/*BUTTON SHOW FDE PADA DATATABLE*/
$(document).on('click', ".btncls-fde-vc", function(){
  var selected_row_vc = tabel_display.row( $(this).parents('tr') ).data();
  var app_type_selected_vc = selected_row_vc[23];
  modal_alert("Membuka Halaman FDE dari data yang dipilih");

  $("#main-view-vc1").hide();
  $("#main-view-title-vc1").hide();
  $("#main-view-vc2").hide();
  $("#main-view-vc3").hide();
  $("#main-view-vc4").hide();
  $("#fde-view-vc").show();
  $('html, body').animate({scrollTop:0}, 'slow');
  if (app_type_selected_vc == 'COM')
  {
    $("#tab-costumer-vc, #div-perorangan-vc").hide();
    $("#tab-costumer-com-vc, #div-com-vc").show();
    $('#tab-costumer-com-vc').tab('show');
    $('#tab_saham_com_fde').removeClass('active');
    $('#tab_costumer_com_fde').addClass('active');
    


  } else {
   $("#tab-costumer-vc, #div-perorangan-vc").show();
   $("#tab-costumer-com-vc, #div-com-vc").hide();
   $('#tab-costumer-vc').tab('show');
   $('#tab_pendapatan_per_fde').removeClass('active');
   $('#tab_costumer_per_fde').addClass('active');
   
 }


/*  if ( $('#data_color_vc'+data_display_selected[2]).val() !== '' && 
    $('#data_engine_vc'+data_display_selected[2]).val() !== '' &&
    $('#data_chasis_no_vc'+data_display_selected[2]).val()!== '' &&
    $('#data_capacity_vc'+data_display_selected[2]).val() !== ''
    )
  {

    $('#data_invoice_vc'+data_display_selected[2]).prop('disabled',false);
    $('#data_bastk_no_vc'+data_display_selected[2]).prop('disabled',false);
    $('#data_invoice_date_vc'+data_display_selected[2]).prop('disabled',false);
    $('#data_bastk_date_vc'+data_display_selected[2]).prop('disabled',false);
    $('#data_status_pending_vc'+data_display_selected[2]).prop('disabled',false);

  } else if ($('#data_color_vc'+data_display_selected[2]).val() !== '' && 
    $('#data_engine_vc'+data_display_selected[2]).val() !== '' &&
    $('#data_chasis_no_vc'+data_display_selected[2]).val()!== '' &&
    $('#data_capacity_vc'+data_display_selected[2]).val() !== ''&&
    $('#data_invoice_vc'+data_display_selected[2]).val() !== '' && 
    $('#data_bastk_no_vc'+data_display_selected[2]).val() !== '' &&
    $('#data_invoice_date_vc'+data_display_selected[2]).val()!== '' &&
    $('#data_bastk_date_vc'+data_display_selected[2]).val() !== ''
    )
  {
    $('#data_status_pending_vc'+data_display_selected[2]).prop('disabled',false);
  } 
  else
    {*/
      $('#data_color_vc'+data_display_selected[2]).prop('disabled',false);
      $('#data_engine_vc'+data_display_selected[2]).prop('disabled',false);
      $('#data_chasis_no_vc'+data_display_selected[2]).prop('disabled',false);
      $('#data_capacity_vc'+data_display_selected[2]).prop('disabled',false);
      $('#data_invoice_vc'+data_display_selected[2]).prop('disabled',false);
      $('#data_bastk_no_vc'+data_display_selected[2]).prop('disabled',false);
      $('#data_invoice_date_vc'+data_display_selected[2]).prop('disabled',false);
      $('#data_bastk_date_vc'+data_display_selected[2]).prop('disabled',false);
      $('#data_status_pending_vc'+data_display_selected[2]).prop('disabled',false);
  //}
});




/*===================================================END OF JS ONLOAD==================================================*/

/*===================================================JS ONCLICK =======================================================*/
/*DEALER LIST*/
$(".dealer-vc").click(function(){
 list_dealer_vc();
});

//============================================VALIDASI TAB FDE============================================================//
var tab_costumer_vc = 0;
var tab_detail_app_vc = 0;
var tab_survey_vc = 0;
//var tab_costumer_com_vc = 0;
var subtab_identitas_vc = 0;
var subtab_pekerjaan_vc = 0;
var subtab_pendapatan_vc = 0;
var subtab_aplikasi_vc = 0;
var subtab_objek_vc = 0;
var subtab_collateral_vc = 0;
var subtab_penjamin_vc = 0;
var subtab_surv_kepemilikan_vc = 0;
var subtab_surv_hasil_vc = 0;
var subtab_identitas_com_vc = 0;
var subtab_pendapatan_com_vc = 0;
var subtab_pic_com_vc = 0;
var subtab_saham_com_vc = 0;

/*console.log("identitas " + subtab_identitas_vc);
console.log("pekerjaan " + subtab_pekerjaan_vc);
console.log("pendapatan " + subtab_pendapatan_vc);*/
/*BUTTON FDE KONFIRMASI DUMMY*/

$("#confirm-tab-com-identitas").click(function(){
 subtab_identitas_com_vc = 1;
 $("#confirm-tab-com-identitas").prop('disabled',true);
 /*$('.nav-tabs > .active').next('li').find('a').trigger('click');*/
 $('#subtab-pendapatan-com').click() ;
 $('html, body').animate({scrollTop:0}, 'slow');
});

$("#confirm-tab-com-pendapatan").click(function(){
 subtab_pendapatan_com_vc = 1;
 $("#confirm-tab-com-pendapatan").prop('disabled',true);
 /*$('.nav-tabs > .active').next('li').find('a').trigger('click');*/
 $('#subtab-pic-com').click() ;
 $('html, body').animate({scrollTop:0}, 'slow');
});

$("#confirm-tab-com-pic").click(function(){
 subtab_pic_com_vc = 1;
 $("#confirm-tab-com-pendapatan").prop('disabled',true);
 /*$('.nav-tabs > .active').next('li').find('a').trigger('click');*/
 $('#subtab-saham-com').click() ;
 $('html, body').animate({scrollTop:0}, 'slow');
});

$("#confirm-tab-com-saham").click(function(){
 subtab_saham_com_vc = 1;
 tab_costumer_vc = 1;
 $("#confirm-tab-com-saham").prop('disabled',true);
 $('#tab-detail-app-vc').click() ;
 $('html, body').animate({scrollTop:0}, 'slow');
});

$('#subtab-pendapatan-com').click(function() {
  if (subtab_identitas_com_vc == 0) {
    modal_alert('Cek Sub Tab Identitas Terlebih Dahulu');
    return false;
  } 
});

$('#subtab-pic-com').click(function() {
  if (subtab_identitas_com_vc == 0) {
    modal_alert('Cek Sub Tab Identitas Terlebih Dahulu');
    return false;
  } else if (subtab_pendapatan_com_vc == 0) {
    modal_alert('Cek Sub Tab Pendapatan Terlebih Dahulu');
    return false;
  }
});

$('#subtab-saham-com').click(function() {
  if (subtab_identitas_com_vc == 0) {
    modal_alert('Cek Sub Tab Identitas Terlebih Dahulu');
    return false;
  } else if (subtab_pendapatan_com_vc == 0) {
    modal_alert('Cek Sub Tab Pendapatan Terlebih Dahulu');
    return false;
  } else if (subtab_pic_com_vc == 0) {
    modal_alert('Cek Sub Tab PIC Management Terlebih Dahulu');
    return false;
  }
});


$("#confirm-tab-identitas").click(function(){
 subtab_identitas_vc = 1;
 $("#confirm-tab-identitas").prop('disabled',true);
 /*$('.nav-tabs > .active').next('li').find('a').trigger('click');*/
 $('#subtab-pekerjaan-perorangan').click() ;
 $('html, body').animate({scrollTop:0}, 'slow');
});

$("#confirm-tab-pekerjaan").click(function(){
 subtab_pekerjaan_vc = 1;
 $("#confirm-tab-pekerjaan").prop('disabled',true);
 $('#subtab-pendapatan-perorangan').click() ;
 $('html, body').animate({scrollTop:0}, 'slow');
});

$("#confirm-tab-pendapatan").click(function(){
 subtab_pendapatan_vc = 1;
 tab_costumer_vc = 1;
 $("#confirm-tab-pendapatan").prop('disabled',true);
 $('#tab-detail-app-vc').click() ;
 $('html, body').animate({scrollTop:0}, 'slow');
});

$("#confirm-tab-aplikasi").click(function(){
 subtab_aplikasi_vc = 1;
 $("#confirm-tab-aplikasi").prop('disabled',true);
 $('#subtab-objek').click() ;
 $('html, body').animate({scrollTop:0}, 'slow');
});

$("#confirm-tab-obj-pembiayaan").click(function(){
 subtab_objek_vc = 1;
 $("#confirm-tab-obj-pembiayaan").prop('disabled',true);
 $('#subtab-collateral').click() ;
 $('html, body').animate({scrollTop:0}, 'slow');
});

$("#confirm-tab-collateral").click(function(){
 subtab_collateral_vc = 1;
 $("#confirm-tab-collateral").prop('disabled',true);
 $('#subtab-penjamin').click() ;
 $('html, body').animate({scrollTop:0}, 'slow');
});

$("#confirm-tab-penjamin").click(function(){
 subtab_penjamin_vc = 1;
 tab_detail_app_vc = 1;
 $("#confirm-tab-penjamin").prop('disabled',true);
 $('#tab-survey-vc').click() ;
 $('html, body').animate({scrollTop:0}, 'slow');
});

$("#confirm-tab-surv-kepemilikan").click(function(){
 subtab_surv_kepemilikan_vc = 1;

 $("#confirm-tab-surv-kepemilikan").prop('disabled',true);
 $('#tab-hasil-survey').click();
 $('html, body').animate({scrollTop:0}, 'slow');
 //alert("error disini");
 /*  */
});

$("#confirm-tab-surv-hasil").click(function(){
 subtab_surv_hasil_vc = 1;
 tab_survey_vc = 1;
 $("#confirm-tab-surv-hasil").prop('disabled',true);
 $('#tab-dokumen-vc').click() ;
 $('html, body').animate({scrollTop:0}, 'slow');
});


$('#subtab-pekerjaan-perorangan').click(function() {
  if (subtab_identitas_vc == 0) {
    modal_alert('Cek Sub Tab Identitas Terlebih Dahulu');
    return false;
  } 
});

$('#subtab-pendapatan-perorangan').click(function() {
  if (subtab_identitas_vc == 0) {
    modal_alert('Cek Sub Tab Identitas Terlebih Dahulu');
    return false;
  } else if (subtab_pekerjaan_vc == 0) {
    modal_alert('Cek Sub Tab Pekerjaan Terlebih Dahulu');
    return false;
  }
});

$('#tab-detail-app-vc').click(function() {
  if (tab_costumer_vc == 0) {
    modal_alert('Cek Tab Costumer Terlebih Dahulu');
    return false;
  } 
});

$('#subtab-objek').click(function() {
  if (subtab_aplikasi_vc == 0) {
    modal_alert('Cek Sub Tab Aplikasi Terlebih Dahulu');
    return false;
  } 
});

$('#subtab-collateral').click(function() {
  if (subtab_aplikasi_vc == 0) {
    modal_alert('Cek Sub Tab Aplikasi Terlebih Dahulu');
    return false;
  }  else if (subtab_objek_vc == 0) {
    modal_alert('Cek Sub Tab Objek Pembiayaan Terlebih Dahulu');
    return false;
  }
});

$('#subtab-penjamin').click(function() {
  if (subtab_aplikasi_vc == 0) {
    modal_alert('Cek Sub Tab Aplikasi Terlebih Dahulu');
    return false;
  }  else if (subtab_objek_vc == 0) {
    modal_alert('Cek Sub Tab Objek Pembiayaan Terlebih Dahulu');
    return false;
  } else if (subtab_collateral_vc== 0)
  {
    modal_alert('Cek Sub Tab Collateral Terlebih Dahulu');
    return false;}
  });

$('#tab-survey-vc').click(function() {
  if (tab_costumer_vc == 0) {
    modal_alert('Cek Tab Costumer Terlebih Dahulu');
    return false;
  } else if (tab_detail_app_vc == 0)
  { modal_alert('Cek Tab Detail Aplikasi Terlebih Dahulu');
  return false;}
});

$('#tab-hasil-survey').click(function() {
  if (subtab_surv_kepemilikan_vc == 0) {
    modal_alert('Cek Sub Tab Kepemilikan Terlebih Dahulu');
    return false;
  } 
});

$('#tab-dokumen-vc').click(function() {
  if (tab_costumer_vc == 0) {
    modal_alert('Cek Tab Costumer Terlebih Dahulu');
    return false;
  } else if (tab_detail_app_vc == 0)
  { modal_alert('Cek Tab Detail Aplikasi Terlebih Dahulu');
  return false;}
  else if (tab_survey_vc == 0)
    { modal_alert('Cek Tab Survey Terlebih Dahulu');
  return false;}
});

$('#tbl-obj-pembiayaan-otomotive').on('click', '.btn-detail-objek-pembiayaan-vc', function(){
  $('html, body').animate({scrollTop:200}, 'slow');
  $('#tab-detail-objek-pembiayaan').show();
  $('#tab-detail-aplikasi').hide();
});

$('#close-detail-objek-pembiayaan-vc').click(function(){
  modal_confirm("Apakah anda yakin ingin keluar dari halaman ini?", function(){
    // go_to_id_by_scroll('#btn-detail-objek-pembiayaan');
    $('html, body').animate({scrollTop:200}, 'slow');
    $('#tab-detail-aplikasi').show();
    $('#tab-detail-objek-pembiayaan').hide();
  });
});

$('#tbl-coll-automotive').on('click', '.btn-detail-collateral-vc', function(){
  $('html, body').animate({scrollTop:200}, 'slow');
  $('#page-detail-collateral').show();
  $('#page-collateral').hide();
  $('#close-detail-collateral').show();
});

$('#close-detail-collateral-vc').click(function(){
  modal_confirm("Apakah anda yakin ingin keluar dari halaman ini?", function(){
    $('html, body').animate({scrollTop:200}, 'slow');
    $('#page-collateral').show();
    $('#page-detail-collateral').hide();
    $('#close-detail-collateral-vc').hide();
  });
});

$('#info-keluarga-personal').on('click', '.btn-detail-info-keluarga-vc', function(){
  $('html, body').animate({scrollTop:200}, 'slow');
  $('#page-detail-informasi-keluarga').show();
  $('#page-identitas').hide();
  $('#close-detail-info-keluarga').show();
});

$('#close-detail-info-keluarga-vc').click(function(){
  modal_confirm("Apakah anda yakin ingin keluar dari halaman ini?", function(){
    $('html, body').animate({scrollTop:200}, 'slow');
    $('#page-identitas').show();
    $('#page-detail-informasi-keluarga').hide();
    $('#close-detail-info-keluarga').hide();
  });
});

$('#info-alamat-personal').on('click', '.btn-detil-alamat-vc', function(){
  $('html, body').animate({scrollTop:200}, 'slow');
  $('#page-detail-informasi-alamat').show();
  $('#page-identitas').hide();
  $('#close-detail-info-alamat').show();
});


$('#close-detail-info-alamat-vc').click(function(){
  modal_confirm("Apakah anda yakin ingin keluar dari halaman ini?", function(){
    $('html, body').animate({scrollTop:200}, 'slow');
    $('#page-identitas').show();
    $('#page-detail-informasi-alamat').hide();
    $('#close-detail-info-alamat').hide();
  });
});
//============================================END OF VALIDASI TAB FDE=========================================================//
/*BUTTON PRINT 1*/
$("#btn-print-vc").click(function(){
  if(!$('.checked-data-vc').is(':checked'))
  {
    modal_alert("Belum ada data yang dipilih");
  } 
  else {
   $('#modal-validation-print-vc').modal({
    show : true,
    backdrop : 'static',
  });
 }
});

/*BUTTON PRINT VALIDATING*/
$("#btn-print-validated-vc").click(function(){
  var disetujui_print_vc = $("#btn-disetujui-vc").val();
  var diketahui_print_vc = $("#btn-diketahui-vc").val();
  console.log(diketahui_print_vc, disetujui_print_vc);
  if (disetujui_print_vc == 0)
  {
    modal_alert("Mohon isi kolom disetujui");
  } else if (diketahui_print_vc == 0)
  {
   modal_alert("Mohon isi kolom diketahui"); 
 } else {
  modal_confirm("Apakah anda yakin ingin mencetak PPD ini ?", function(){ 
    $('#modal-validation-print-vc').modal('hide');
    alert ("Melakukan print");
  })
}
});

/*BUTTON INPUT VC*/
/*$("#btn-save-vc").click(function(){
  if(!$('.checked-data-vc').is(':checked'))
  {
    modal_alert("Belum ada data yang dipilih");
  } 
  else {
    console.log(arr_contract_checked);
    modal_confirm("Apakah anda yakin ingin menyimpan data ini ?", function(){
    })
  }
});*/

$("#btn-ppd-vc").click(function(){
  color_checked_vc = $('#data_color_vc'+no_id).val();
  engine_checked_vc = $('#data_engine_vc'+no_id).val();
  chasis_checked_vc = $('#data_chasis_no_vc'+no_id).val();
  capacity_checked_vc = $('#data_capacity_vc'+no_id).val();
  invoice_no_checked_vc = $('#data_invoice_vc'+no_id).val();
  bastk_no_checked_vc = $('#data_bastk_no_vc'+no_id).val();
  invoice_date_checked_vc = $('#data_invoice_date_vc'+no_id).val();
  bastk_date_checked_vc = $('#data_bastk_date_vc'+no_id).val();
  pending_checked_vc = $('#data_status_pending_vc'+no_id).val();
  if(!$('.checked-data-vc').is(':checked'))
  { 
    modal_alert("Belum ada data yang dipilih");
    $('html, body').animate({scrollTop:300}, 'slow');
  } 
  else if
    (arr_contract_checked.length > 1)
  {
    modal_alert("Harap pilih hanya satu data saja!");
    $('html, body').animate({scrollTop:300}, 'slow');
  } else if 
  (pending_checked_vc != '0')
  {
    modal_alert("Tidak bisa men-PPD kontrak pending, silahkan pilih kontrak lain!");
    $('html, body').animate({scrollTop:300}, 'slow');
  } else if 
  (color_checked_vc == '')
  {
    modal_alert("Color belum diisi!");
    $('html, body').animate({scrollTop:300}, 'slow');
    $('#data_color_vc'+no_id).addClass('has-error');
    $('#data_color_vc'+no_id).focus();
  } else if 
  (engine_checked_vc == '')
  {
    modal_alert("No Engine belum diisi!");
    $('html, body').animate({scrollTop:300}, 'slow');
    $('#data_engine_vc'+no_id).addClass('has-error');
  } else if 
  (chasis_checked_vc == '')
  {
    modal_alert("No Chasis belum diisi!");
    $('html, body').animate({scrollTop:300}, 'slow');
    $('#data_chasis_no_vc'+no_id).addClass('has-error');
  } else if 
  (capacity_checked_vc == '')
  {
    modal_alert("Capacity belum diisi!");
    $('html, body').animate({scrollTop:300}, 'slow');
    $('#data_capacity_vc'+no_id).addClass('has-error');
  } else if 
  (invoice_no_checked_vc == '')
  {
    modal_alert("No. Invoice belum diisi!");
    $('html, body').animate({scrollTop:300}, 'slow');
    $('#data_invoice_vc'+no_id).addClass('has-error');
  } else if 
  (bastk_no_checked_vc == '')
  {
    modal_alert("No. Invoice belum diisi!");
    $('html, body').animate({scrollTop:300}, 'slow');
    $('#data_bastk_no_vc'+no_id).addClass('has-error');
  } else if 
  (invoice_date_checked_vc == '')
  {
    modal_alert("Tanggal Invoice belum diisi!");
    $('html, body').animate({scrollTop:300}, 'slow');
    $('#data_invoice_date_vc'+no_id).addClass('has-error');
  } else if 
  (bastk_date_checked_vc == '')
  {
    modal_alert("Tanggal BASTK belum diisi!");
    $('html, body').animate({scrollTop:300}, 'slow');
    $('#data_bastk_date_vc'+no_id).addClass('has-error');
  }
  else
  {

    modal_confirm("Apakah anda yakin membuat ppd data ini ?", function(){
      console.log(arr_contract_checked[0]);
      console.log(no_id);
      console.log(color_checked_vc);  
      console.log(engine_checked_vc);   
      console.log(chasis_checked_vc);  
      console.log(capacity_checked_vc); 
      console.log(invoice_no_checked_vc);  
      console.log(bastk_no_checked_vc);  
      console.log(invoice_date_checked_vc);  
      console.log(bastk_date_checked_vc);
      console.log(pending_checked_vc); 
    })
  }
});

/*BUTTON RESET*/
$("#btn-reset-vc").click(function(){
  var tabel_display = $('#tbl-display').DataTable();
  tabel_display.clear();
  tabel_display.draw();
  $("#dealer-code-select-vc").val("");
  $("#dealer-select-vc").val("");
  $(".reset-to-null").val("");
  $(".reset-to-zero").val(0);
  $("#title-detail-selected-vc").html("");
  disable_button_vc();
  $('html, body').animate({scrollTop:0}, 'slow');
});



/*BUTTON CLOSE FDE*/
$(document).on('click', "#close-fde-vc", function(){
 modal_confirm("Apakah anda telah membaca seluruh tab FDE?", function(){
  $("#main-view-vc1").show();
  $("#main-view-vc2").show();
  $("#main-view-vc3").show();
  $("#main-view-vc4").show();
  $("#fde-view-vc").hide();
  $("#main-view-title-vc1").show();
  $('html, body').animate({scrollTop:300}, 'slow');

});
});

/*BUTTON INPUT VC PADA DATATABLE*/
/*$(document).on('click', "#btn-input-data-vc", function(){
  $('#modal-input-vc').modal({
    show : true,
    backdrop : 'static',
  });
  $("#title-modal-input").text("Input Data No. Kontrak : " + data_display_selected[5]);
});*/

/*BUTTON SEARCH DATA*/
$("#search-filter-vc").click(function(){
  var search_dealer_code_vc = $("#dealer-code-select-vc").val();
  //var opt_value_pending = pending_html;
  var i = 1;
  arr_contract_checked = [];
  arr_amount_checked = [];
  $('#total-amount-vc').val(0);
  //var duedate;
  console.log(search_dealer_code_vc);
  console.log(branchcode_logged);
  var arr_list_ready_ppd = new Array();
  var list_ready_ppd = {
    "supplier_code" : search_dealer_code_vc
  }
  arr_list_ready_ppd.push(list_ready_ppd);


  if (search_dealer_code_vc == "")
  { 
    modal_alert("Mohon isi dealer dulu");
    $('.input-dealer-vc').addClass('has-error');
  } else {
    $('.input-dealer-vc').removeClass('has-error');
    $('#btn-reset-vc').prop('disabled',false);
    $('#btn-save-vc').prop('disabled',false);
    $('#btn-ppd-vc').prop('disabled',false);
    $('#btn-view-proposal-vc').prop('disabled',true);
    $('#btn-print-vc').prop('disabled',true);
    $(".reset-to-null").val("");
    $(".reset-to-zero").val(0);
    $("#title-detail-selected-vc").html("");

    $.ajax({
      url: "Controller_verification_confirmation/get_list_ready_ppd",
      type: 'POST',
      dataType: 'json',
      data:{
        branch_id : branchcode_logged,
        list_ready_ppd : arr_list_ready_ppd
      },

      success:function(response){
        if(response) {
          try {
            console.log(response['ppd_list']);
            console.log(response['fin_type_list']['Data']);
            search_result = response;
            if (search_result['ListReadyPPD'] == 0) {
             modal_validasi('Data tidak ditemukan');
             tabel_display.clear();
             tabel_display.draw();
           } else {
            tabel_display.clear();
            tabel_display.draw();
            console.log(response['ppd_list']['ListReadyPPD']);
            $.each(response['ppd_list']['ListReadyPPD'], function() {

              var data_app_no_vc = this['application_no'];
              var data_branch_code_vc = this['branch_id'];
              if (this['outlet_id'] !== null) {
                var data_id_outlet_vc = this['outlet_id'];
              } else {
                data_id_outlet_vc = '';
              }
              var data_contract_no_vc = this['contract_no'];
              var data_no_pp_vc = this['po_no'];
              var data_costumer_name_vc = this['cust_name'];
              var data_due_date_vc = this['duedate'];
              //var advance_arrear = this['advancearrear'];
              if (this['object_color'] !== null)
                {  var data_color_vc = this['object_color']} 
              else {
                data_color_vc = '';
              };
              if (this['no_mesin'] !== null)
                { var data_engine_vc = this['no_mesin']} 
              else {data_engine_vc=''};
              if (this['no_rangka'] !== null)
               { var data_chasis_no_vc = this['no_rangka']}
             else { data_chasis_no_vc = ''};
             if (this['eng_capacity'] !== null) 
              { var data_capacity_vc = this['eng_capacity']}
            else {data_capacity_vc = ''};

            var data_invoice_vc = "";
            var data_bastk_no_vc = "";
            var data_invoice_date_vc = "";
            var data_bastk_date_vc = "";
            var data_amount_vc = accounting.formatMoney(this['amount'], '', 2, ',', '.');
            var data_financing_type_vc = this['financing_type'];
            /*var data_status_pending_vc = this['status_pending'];*/
            var app_order_id_vc = this['applicant_order_id'];
            var app_order_object_id_vc =this['applicant_order_object_id'];
            var app_type_vc =this['applicant_type'];
            var pending_vc = 3;
            var data_financing_type_vc_full = ''

            $.each(response['fin_type_list']['Data'], function() {
             if (data_financing_type_vc == this['fin_type_code']) {
              data_financing_type_vc_full =  this['fin_type_code'] + '-' + this['fin_type_desc']
            }   
            else {
              data_financing_type_vc_full =  ''
            };   
          });



            tabel_display.row.add([
              '<button class="btn-xs btn-primary btncls-fde-vc" id="btn-fde-vc'+i+'">FDE</button>',
              '<input type="checkbox" class="form-control input-lg checked-data-vc" id="checked-vc'+i+'" value = ""/>',
              i,
              data_app_no_vc,
              data_branch_code_vc,
              data_id_outlet_vc,
              data_contract_no_vc,
              data_no_pp_vc,
              data_costumer_name_vc,
              data_due_date_vc,
              '<input type="text" class="form-control input-sm" id="data_color_vc'+i+'" value = "' + data_color_vc +'" />',
              '<input type="text" class="form-control input-sm no-special-char" id="data_engine_vc'+i+'" value = "' + data_engine_vc +'"/>',
              '<input type="text" class="form-control input-sm no-special-char" id="data_chasis_no_vc'+i+'" value = "' + data_chasis_no_vc +'" />',
              '<input type="text" class="form-control input-sm num-only" id="data_capacity_vc'+i+'" value = "' + data_capacity_vc +'" />',
              '<input type="text" class="form-control input-sm" id="data_invoice_vc'+i+'" value = "' + data_invoice_vc +'" />',
              '<input type="text" class="form-control input-sm" id="data_bastk_no_vc'+i+'" value = "' + data_bastk_no_vc +'" />',
              '<input type="text" class="form-control input-sm input-date-vc" id="data_invoice_date_vc'+i+'" value = "' + data_invoice_date_vc +'"  />',
              '<input type="text" class="form-control input-sm input-date-vc" id="data_bastk_date_vc'+i+'" value = "' + data_bastk_date_vc +'" />',
              data_amount_vc,
              data_financing_type_vc_full,
              '<select class="form-control" id="data_status_pending_vc'+i+'">' + pending_html,
              app_order_id_vc,
              app_order_object_id_vc,
              app_type_vc
              ]).draw(false);
            $("#data_status_pending_vc"+i).val(pending_vc);
            i++;
          });
}
/*          $('.input-date-vc').datepicker({  
            format : 'dd-M-yyyy',
            autoclose : true,
            endDate: '+0d',
          })*/
        } catch (e) {
          $('#loading-screen').hide();
          console.log(e);
          modal_alert ("Terjadi kesalahan, harap hubungi tim IT")
        }
      }

    }, 
    error: function(response) {
      console.log(response); 
      modal_alert("Terjadi kesalahan pada response data, Hubungi Tim IT");
    }
  });
}
});

$("#search-by-input-vc").click(function(){ 

  var search_radio_by_vc = $('input[name="search-confirmation"]:checked').val();
  var search_value_by_vc = $('#search-by-vc').val();
  var i = 1;
  var input_length_print_vc = search_value_by_vc.length;
  console.log(search_radio_by_vc);
  console.log(search_value_by_vc);

  if (search_value_by_vc == "")
  { 
    modal_alert("Mohon isi no contract/no ppd dulu");
    $('#input-number-print').addClass('has-error');
  } else if (input_length_print_vc < 12)
  {
    modal_alert("Nomor kontrak/ppd harus lengkap");
    $('#input-number-print').addClass('has-error');
  }
  else {
    $('#input-number-print').removeClass('has-error');
    $('#btn-reset-vc').prop('disabled',false);
    $('#btn-print-vc').prop('disabled',false);
    $('#btn-view-proposal-vc').prop('disabled',true);
    $('#btn-save-vc').prop('disabled',true);
    $('#btn-ppd-vc').prop('disabled',true);
    $.ajax({
      url: "assets/design/mock_json/print_vc.json",
      dataSrc : "",
      type: 'POST',
      dataType: 'json',
    /*data: {
            flag_search: search_radio_by_vc,
            search_value: search_value_by_vc,
          },*/

          success:function(response){
            console.log(response);
            search_result = response;
            if (search_result['Data'] == 0) {
             modal_validasi('Data tidak ditemukan');
             tabel_display.clear();
             tabel_display.draw();
           } else {
            tabel_display.clear();
            tabel_display.draw();
            $.each(response['Data'], function() {
             /*   $('.input-date-vc').datetimepicker({
              format: 'DD-MMM-YYYY',
              widgetPositioning: 
              {
                horizontal: 'left', 
                vertical: 'top'
              } 

            });*/
            var data_print_app_no_vc = this['app_no'];
            var data_print_branch_code_vc = this['branch_code'];
            var data_print_id_outlet_vc = this['id_outlet'];
            var data_print_contract_no_vc = this['contract_no'];
            var data_print_no_pp_vc = this['no_pp'];
            var data_print_costumer_name_vc = this['customer_name'];
            var data_print_due_date_vc = this['due_date'];
              /*var advance_arrear = this['advancearrear'];
              if (advance_arrear == "01")
              {
                duedate = today;
              } else {
                duedate = onemonthlater;
              }*/
              var data_print_color_vc = this['color'];
              var data_print_engine_vc = this['engine'];
              var data_print_chasis_no_vc = this['chasis_no'];
              var data_print_capacity_vc = this['capacity'];
              var data_print_invoice_vc = this['invoice'];
              var data_print_bastk_no_vc = this['bastk_no'];
              var data_print_invoice_date_vc = this['invoice_date'];
              var data_print_bastk_date_vc = this['bastk_date'];
              var data_print_amount_vc = this['amount'];
              var data_print_financing_type_vc = this['financing_type'];
              var data_print_status_pending_vc = this['status_pending'];
              var app_order_id_vc = this['applicant_order_id'];
              var app_order_object_id_vc =this['applicant_order_object_id'];
              var app_type_vc =this['applicant_type'];
              var pending_vc = this['status_pending'];



              tabel_display.row.add([
                '<button class="btn-xs btn-primary btncls-fde-vc" id="btn-fde-vc'+i+'">FDE</button>',
                '<input type="checkbox" class="form-control input-lg checked-data-vc" id="checked-vc'+i+'" value = ""/>',
                i,
                data_print_app_no_vc,
                data_print_branch_code_vc,
                data_print_id_outlet_vc,
                data_print_contract_no_vc,
                data_print_no_pp_vc,
                data_print_costumer_name_vc,
                data_print_due_date_vc,
                '<input type="text" class="form-control input-sm" id="data_color_vc'+i+'" value = "' + data_print_color_vc +'" disabled/>',
                '<input type="text" class="form-control input-sm" id="data_engine_vc'+i+'" value = "' + data_print_engine_vc +'" disabled/>',
                '<input type="text" class="form-control input-sm" id="data_chasis_no_vc'+i+'" value = "' + data_print_chasis_no_vc +'" disabled/>',
                '<input type="text" class="form-control input-sm" id="data_capacity_vc'+i+'" value = "' + data_print_capacity_vc +'" disabled/>',
                '<input type="text" class="form-control input-sm" id="data_invoice_vc'+i+'" value = "' + data_print_invoice_vc +'" disabled/>',
                '<input type="text" class="form-control input-sm" id="data_bastk_no_vc'+i+'" value = "' + data_print_bastk_no_vc +'" disabled/>',
                '<input type="text" class="form-control input-sm input-date-vc" id="data_invoice_date_vc'+i+'" value = "' + data_print_invoice_date_vc +'" disabled/>',
                '<input type="text" class="form-control input-sm input-date-vc" id="data_bastk_date_vc'+i+'" value = "' + data_print_bastk_date_vc +'" disabled/>',
                data_print_amount_vc,
                data_print_financing_type_vc,
                //'<input type="text" class="form-control input-sm" id="data_status_pending_vc'+i+'" value = "' + data_status_pending_vc +'" disabled/>',
                '<select class="form-control" disabled id="data_status_pending_vc'+i+'">' + pending_html,
                app_order_id_vc,
                app_order_object_id_vc,
                app_type_vc
                ]).draw(false);
              $("#data_status_pending_vc"+i).val(pending_vc);
              i++;
            });
}
}, 
error: function(response) {
}
});
}
});

$('#dealer-code-select-vc').change(function(){ 
 console.log("changed");
});

function disable_button_vc(){
  $('#btn-view-proposal-vc').prop('disabled',true);
  $('#btn-print-vc').prop('disabled',true);
  $('#btn-reset-vc').prop('disabled',true);
  $('#btn-save-vc').prop('disabled',true);
  $('#btn-ppd-vc').prop('disabled',true);
}

function list_dealer_vc(){
  //var branch_code_vc = $('#branch-code-logged-vc').val();
  $.ajax({
    url: "Controller_verification_confirmation/get_dealer_ppd",
    type: 'POST',
    dataType: 'json',
    data:{
      "branch_code" : branchcode_logged
    },

    success: function(response){
      if(response['Data']) {
        try {
          table_dealer_master.clear().draw();
          $.each(response['Data'], function() {
            table_dealer_master.row.add([
              this['deal_code'],
              this['deal_name']
              ]).draw(false);
          });

          $("#modal-dealer").modal({
            show: true,
            backdrop: 'static'
          });
        } catch(e) {
          $('#loading-screen').hide();
          console.log(response);
          console.log(e);
        }
      }

      else if(response['Error'])
      {
        modal_alert(response['Error']);
      }
      else {
        console.log(response)
        modal_alert("Terjadi kesalahan, Hubungi Tim IT");
      }
    },
    error: function(response){
      console.log(response);
      modal_alert("Terjadi kesalahan pada response data, Hubungi Tim IT");
      
    }

  });
};//tutup function

function bank_info_vc(){
  var branch_code_vc = $('#branch-code-logged-vc').val();
  var dealer_code_vc = $('#dealer-code-select-vc').val();
  var arr_mst_dealer_vc = Array();
  var list_mst_dealer_vc = {
    "dealer_code" : dealer_code_vc
  }

  arr_mst_dealer_vc.push(list_mst_dealer_vc);
  console.log(arr_mst_dealer_vc);


  $.ajax({
    url: "Controller_verification_confirmation/get_bank_info_vc",
    type: 'POST',
    dataType: 'json',
    data:{
      branch_code : branch_code_vc,
      list_mst_dealer : arr_mst_dealer_vc
    },

    success: function(response){
      console.log("STATE SUCCESS"); 
      if (response)
      {
        try {

          if(response['Data']['listMstDealer'].length == 0)
          {
            $('#acc-no-vc').val('');
            $('#bank-vc').val('');
            $('#branch-vc').val('');
          } else {
     // $.each(response['Data'], function(){
      var vc_bankacc_info_selected = response['Data']['listMstDealer'][0]['listMstDealRekeningAppr'][0];
      var vc_bank_info_selected = response['Data']['listMstBank'][0];
      var bank_acc_no_vc = vc_bankacc_info_selected['acc_no'];
      var bank_name_vc = vc_bank_info_selected['bank_name'];
      var bank_br_vc = vc_bank_info_selected['bank_br'];
      console.log(bank_name_vc);
      console.log(bank_br_vc);
      console.log(bank_acc_no_vc);

      $('#acc-no-vc').val(bank_acc_no_vc);
      $('#bank-vc').val(bank_name_vc);
      $('#branch-vc').val(bank_br_vc);

    }
  } catch(e) {
   $('#loading-screen').hide();
   console.log(response);
   console.log(e);
   //modal_alert("Terjadi kesalahan, Hubungi Tim IT");
 }
     // });
   }
 },
 error: function(response){
  console.log("STATE FAILED"); 
  modal_alert("Terjadi kesalahan pada response data, Hubungi Tim IT");
}
});
};

function load_param_pending(){
  //var branch_code_vc = $('#branch-code-logged-vc').val();
  var pending_par = [];
  
  //var pending_child = [];

  $.ajax({
    url: "Controller_verification_confirmation/get_load_param",
    type: 'GET',
    dataType: 'json',

    success: function(response){
      console.log(response['Data']);
      if(response['Data']) {
        try {
          console.log("STATE SUCCESS"); 
     // $.each(response['Data'], function(){
      var list_param_pending_vc = response['Data'];

      $.each(list_param_pending_vc, function(){
        pending_par.push([this['id_status'], this['clreason_Desc']]);
        

        //console.log(pending_desc);
      });
      for (var j = 0; j < pending_par.length; ++j) {
        var item = pending_par[j];
        pending_html+="<option value='"+ (item[0]) + "'>"+item[1]+"</option>";
      }
      //console.log(pending_par[2][1]);
      //console.log(pending_html);
    } catch(e) {
      $('#loading-screen').hide();
      console.log(response);
      console.log(e);
    }
  } else {
    console.log(response)
    modal_alert("Terjadi kesalahan, Hubungi Tim IT");
  }
},
error: function(response){
  console.log(response); 
  modal_alert("Terjadi kesalahan pada response data, Hubungi Tim IT");
}
});
};//tutup function


/*===================================================END OF JS ONCLICK =====================================================*/

/*===================================================END OF PPD=============================================================*/







