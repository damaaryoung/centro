console.log($('#branch-id-reins').html());
var branch_code_reins = $('#branch-id-reins').html();
var branch_name_reins = $('#branch-name-reins').html();

//if(branch_code_reins == '0000'){
  branch_code_reins = $('#slc-branch-reins').val();
// } else {
//   $('#ho-rep-reins').hide();
//     $('#branch-rep-reins').show();
//   $('#inp-rep-branch-id-reins').val(branch_code_reins);
//     $('#inp-rep-branch-name-reins').val(branch_name_reins);
// }

function tabcek(ids,hrefs){
    var lis = $("ul.tabs-refins > li");
    lis.removeClass("active");
    $('#'+ids+' a[href="#'+hrefs+'"]').tab('show');
    $('#'+ids).addClass("active");
}

function startup(){

$('#tabs-entry-reins').hide();
$('#tabs-export-reins').hide();
$('#tabs-import-reins').hide();
$('#tabs-report-reins').hide();
$('#tabs-process-reins').hide();

var showEntry = false;
var showExport = false;
var showImport = false;
var showReport = false;
var showProcess = false;

var isNoActive = true;

for(var i = 0 ; i < role_refins.length ; i++){

        // if(role_refins[i]['role_code'] === 'APPR-ENTRY-REFINS' || 
        //   role_refins[i]['role_code'] === 'REJC-ENTRY-REFINS' ||
        //   role_refins[i]['role_code'] === 'SUBMIT-ENTRY-REFINS'){

          showEntry = true;
        //   continue;

        // }

        if(role_refins[i]['role_code'] === 'EXPORT-REFINS' || 
           role_refins[i]['role_code'] === 'APPR-EXPORT-REFINS' || 
           role_refins[i]['role_code'] === 'CNFRM-EXPORT-REFINS' || 
           role_refins[i]['role_code'] === 'S2IN-EXPORT-REFINS'){

          showExport = true;
          continue;
        }

        if(role_refins[i]['role_code'] === 'IMPORT-REFINS'){

          showImport = true;
          continue;
        }

        if(role_refins[i]['role_code'] === 'REPORT-REFINS'){

          showReport = true;
          continue;
        }

        if(role_refins[i]['role_code'] === 'PROCESS-REFINS'){

          showProcess = true;
          continue;
        }



    }






if(showEntry) {

  $('#tabs-entry-reins').show();

  if(isNoActive){
    tabcek("tabs-entry-reins","tab-entry-refund");
    isNoActive = false;
  }
}

if(showExport) {
  $('#tabs-export-reins').show();

  if(isNoActive){
    tabcek("tabs-export-reins","tab-export-refund");
    isNoActive = false;
  }

}

if(showImport) {
  $('#tabs-import-reins').show();

  if(isNoActive){
    tabcek("tabs-import-reins","tab-import-refund");
    isNoActive = false;
  }

}

if(showReport) {
  $('#tabs-report-reins').show();

  if(isNoActive){
    tabcek("tabs-report-reins","tab-report-refund");
    isNoActive = false;
  }

}

if(showProcess) {
  $('#tabs-process-reins').show();

  if(isNoActive){
    tabcek("tabs-process-reins","tab-process-refund");
    isNoActive = false;
  }

}


}
  //getInsType();
  getInsCompany();
  getRefundType();
  $('#btn-entry-submit-reins').prop("disabled",true);
  $('#btn-entry-approve-reins').prop("disabled",true);
  $('#btn-entry-reject-reins').prop("disabled",true);

if (!localStorage.getItem('role_user_refins')) {
    $.ajax({
        url : "Controller_home/get_detail_user",
        cache : false,
        success : function(response){
            if(response){
                try{
                    console.log(response);
                    localStorage.setItem('role_user_refins', response);
                    role_refins = $.parseJSON(localStorage.getItem('role_user_refins'));
                    console.log(role_refins);
                    console.log('asb sukses');
                    startup();
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
    role_refins = $.parseJSON(localStorage.getItem('role_user_refins'));
    console.log(role_refins);
    console.log('asb else');
    startup();
}


function toDateData(dateStr) {
    var hasildata;
    if (dateStr !== "") {
        var month = dateStr.substring(0, dateStr.indexOf("/", 1));
        var day = dateStr.substring(dateStr.indexOf("/", 1) + 1, dateStr.indexOf("/", 3));
        var year = dateStr.substring(dateStr.indexOf("/", 3) + 1, dateStr.length);
        var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        var month1 = months[parseInt(month) - 1];
        hasildata = day + '-' + month1 + '-' + year;
    } else {
        hasildata = "";
    }
    return hasildata;
}

//input tanggal
var datadate = new Date();
var fullDate = new Date();
var twoDigitMonth = fullDate.getMonth()+1+"";
    if(twoDigitMonth.length==1)  
        twoDigitMonth="0" +twoDigitMonth;
var twoDigitDate = fullDate.getDate()+"";
    if(twoDigitDate.length==1) 
        twoDigitDate="0" +twoDigitDate;
var currentDate =  twoDigitMonth + "/" + twoDigitDate + "/" +  fullDate.getFullYear();

$('#inp-rep-date-end-reins').val(toDateData(currentDate));

var dateToday = new Date();

if (dateToday.getDate() >= 8){
    var fromDate =  (dateToday.getMonth() + 1)+"/"+(dateToday.getDate() -29)+ "/" +   dateToday.getFullYear()
$('#inp-rep-date-first-reins').val(toDateData(fromDate));

}
else{
    var fromDate =  (dateToday.getMonth() + 1)+"/"+"01"+ "/" +   dateToday.getFullYear()
$('#inp-rep-date-first-reins').val(toDateData(fromDate));

}

$('#inp-rep-date-first-reins').datetimepicker({
    format: 'DD-MMM-YYYY',
    maxDate: toDateData(currentDate),
    useCurrent: false,
    allowInputToggle: true
});


$('#inp-rep-date-end-reins').datetimepicker({
    format: 'DD-MMM-YYYY',
    useCurrent: false,
    minDate: toDateData(fromDate),
    maxDate: currentDate,
    ignoreReadonly: true,
    allowInputToggle: true
});


// JS TAB ENTRY REFUND
$('#btn-entry-search-reins').click(function(){

  

  if($('#inp-entry-memo-reins').val() == '' && $('#inp-entry-con-reins').val() == ''){
    alert_error('No memo pretermination atau nomor kontrak tidak boleh kosong !!');
    $('#div-entry-memo-reins').addClass('has-error');
    $('#div-entry-con-reins').addClass('has-error');
  } else {
    //jalankan function
     $('#div-entry-memo-reins').removeClass('has-error');
    $('#div-entry-con-reins').removeClass('has-error');
    searchEntry();
    

  }
});

$('#inp-entry-memo-reins').on('keyup', function(){

  if($('#inp-entry-memo-reins').val() != ''){
    $('#inp-entry-con-reins').prop("disabled",true);
  } else {
    $('#inp-entry-con-reins').prop("disabled",false);
  }
});

$('#inp-entry-con-reins').on('keyup', function(){

  if($('#inp-entry-con-reins').val() != ''){
    $('#inp-entry-memo-reins').prop("disabled",true);
  } else {
    $('#inp-entry-memo-reins').prop("disabled",false);
  }
});
function searchEntry(){
  var cont_no = $('#inp-entry-con-reins').val();
  var memo_no = $('#inp-entry-memo-reins').val();
  
  $.ajax({
        url: "Controller_refund_insurance/searchEntry",
        type: 'POST',
        dataType:'json',
        data:{
            "memo_no": memo_no,
            "cont_no": cont_no
        },

        success: function(response) {
            console.log(response);
            var res = $.parseJSON(response);
            console.log(res);
            if(response) {
                try {
                  if(res['status'] == "sukses"){
                    var datz = res['data'];
                    debugger;
                $('#inp-entry-con-reins').val(datz['cont_no']);
                $('#inp-entry-memo-reins').val(datz['memo_no']);

                $('#inp-entry-date-reins').val(datz['pt_date']);
                $('#inp-entry-name-reins').val(datz['cus_name']);
                $('#inp-entry-instype-reins').val(datz['ins_type']);
                $('#inp-entry-com-reins').val(datz['ins_com']);
                $('#inp-entry-inspol-reins').val(datz['ins_policy']);
                $('#inp-bankno-reins').val(datz['acc_no']);
                $('#slc-entry-reins').val(datz['bank_id']);
                $('#inp-entry-refmemo-reins').val(datz['refund_memo']);
                $('#inp-entry-batchno-reins').val(datz['batch_no']);
                $('#inp-entry-stats-reins').val(datz['status']);
                $('#inp-account-reins').val(datz['acc_name']);
                $('#inp-entry-amt-reins').val(datz['refund_amount']);
                          
                
                $('#inp-entry-refid-reins').val(datz['refund_id']);  
                $('#inp-entry-notes-reins').val(datz['note'])

                $('#inp-entry-cid-reins').val(datz['cont_id']); 


                validateButtonEntry()

                } else {
                  alert_error("Gagal silahkan coba lagi");
                  }
                }
                catch(e) {
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Gagal ! error => "+e);
                    }
                }
            },
            error: function(response) {
                console.log(response);
            }
        });


}

$('#btn-entry-submit-reins').click(function(){

  var flagrole =true;

    for(var i = 0 ; i < role_refins.length  ; i++){
        if(role_refins[i]['role_code'] === 'SUBMIT-ENTRY-REFINS'){
                flagrole = false;
                break;
             }
    }


   if(!flagrole){ 
   var slc_bankid = $('#slc-entry-reins').val();
   if($('#inp-bankno-reins').val() == '' && $('#inp-account-reins').val() == '' && (slc_bankid == null || slc_bankid == '')  && $('#inp-notes-reins').val() == ''){
      
      $('.div-all-entry-reins').addClass('has-error');
      alert_error('Data belum lengkap');

   }else if ($('#inp-bankno-reins').val() == ''){

      $('#div-bankno-reins').addClass('has-error');
      $('#div-account-reins').removeClass('has-error');
      $('#div-entry-reins').removeClass('has-error');
      $('#div-notes-reins').removeClass('has-error');
       alert_error('Data belum lengkap');

   } else if($('#inp-account-reins').val() == ''){
       $('#div-bankno-reins').removeClass('has-error');
      $('#div-account-reins').addClass('has-error');
      $('#div-entry-reins').removeClass('has-error');
      $('#div-notes-reins').removeClass('has-error');
       alert_error('Data belum lengkap');
   }else if($('#slc-entry-reins').val() == ''){

      $('#div-bankno-reins').removeClass('has-error');
      $('#div-account-reins').removeClass('has-error');
      $('#div-entry-reins').addClass('has-error');
      $('#div-notes-reins').removeClass('has-error');
       alert_error('Data belum lengkap');

   //}else if($('#inp-notes-reins').val() == ''){

   //    $('#div-bankno-reins').removeClass('has-error');
   //    $('#div-account-reins').removeClass('has-error');
   //    $('#div-entry-reins').removeClass('has-error');
   //    $('#div-notes-reins').addClass('has-error');
   //     alert_error('Data belum lengkap');

    } else {

       $('#div-bankno-reins').removeClass('has-error');
      $('#div-account-reins').removeClass('has-error');
      $('#div-entry-reins').removeClass('has-error');
      $('#div-notes-reins').removeClass('has-error');

      alert_confirm("Apakah anda yakin submit entry ini?", function(){

    var note = $('#inp-entry-notes-reins').val();
    var refund_id = $('#inp-entry-refid-reins').val();
    var cont_id = $('#inp-entry-cid-reins').val();
    var acc_no = $('#inp-bankno-reins').val();
    var bankid = $('#slc-entry-reins').val();
    var acc_name = $('#inp-account-reins').val();
    debugger;
    $.ajax({
        url: "Controller_refund_insurance/submitEntry",
        type: 'POST',
        dataType:'json',
        data:{
            "refund_id": refund_id,
            "cont_id": cont_id,
            "acc_no": acc_no,
            "acc_name": acc_name,
            "bank_id": bankid,
            "note": note
        },

        success: function(response) {
            console.log(response);
            var res = $.parseJSON(response);
            console.log(res);
            if(response) {
                try {
                  if(res['status'] == "sukses"){
                searchEntry();
                alert_info("Submit Berhasil");
                } else {
                  alert_error("Gagal silahkan coba lagi");
                  }
                }
                catch(e) {
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Gagal ! error => "+e);
                    }
                }
            },
            error: function(response) {
                console.log(response);
            }
        });


  });

   }
 } else {

  alert_error("Anda tidak mempunyai role");
 }
});


$('#btn-entry-approve-reins').on("click", function() {

  var flagrole =true;

    for(var i = 0 ; i < role_refins.length  ; i++){
        if(role_refins[i]['role_code'] === 'APPR-ENTRY-REFINS'){
                flagrole = false;
                break;
             }
    }

    if(!flagrole) {
  alert_confirm("Apakah anda yakin menyetujui entry ini?", function(){

    var note = $('#inp-entry-notes-reins').val();
    var refund_id = $('#inp-entry-refid-reins').val();

    $.ajax({
        url: "Controller_refund_insurance/approveEntry",
        type: 'POST',
        dataType:'json',
        data:{
            "refund_id": refund_id,
            "note": note
        },

        success: function(response) {
            console.log(response);
            var res = $.parseJSON(response);
            console.log(res);
            if(response) {
                try {
                  if(res['status'] == "sukses"){
                searchEntry();
                alert_info("Approve Berhasil");
                } else {
                  alert_error("Gagal silahkan coba lagi");
                  }
                }
                catch(e) {
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Gagal ! error => "+e);
                    }
                }
            },
            error: function(response) {
                console.log(response);
            }
        });


  });

} else {
  alert_error("Anda tidak mempunyai role ini");
}
});


$('#btn-entry-reject-reins').on("click", function() {

  var flagrole =true;

    for(var i = 0 ; i < role_refins.length  ; i++){
        if(role_refins[i]['role_code'] === 'REJC-ENTRY-REFINS'){
                flagrole = false;
                break;
             }
    }

    if(!flagrole) {
  alert_confirm("Apakah anda yakin menolak entry ini?", function(){

    var note = $('#inp-entry-notes-reins').val();
    var refund_id = $('#inp-entry-refid-reins').val();

    $.ajax({
        url: "Controller_refund_insurance/rejectEntry",
        type: 'POST',
        dataType:'json',
        data:{
            "refund_id": refund_id,
            "note": note
        },

        success: function(response) {
            console.log(response);
            var res = $.parseJSON(response);
            console.log(res);
            if(response) {
                try {
                  if(res['status'] == "sukses"){
                searchEntry();
                alert_info("Reject Berhasil");
                } else {
                  alert_error("Gagal silahkan coba lagi");
                  }
                }
                catch(e) {
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Gagal ! error => "+e);
                    }
                }
            },
            error: function(response) {
                console.log(response);
            }
        });


  });

} else {
  alert_error("Anda tidak mempunyai role ini");
}

});


function validateButtonEntry(){
  var status = $('#inp-entry-stats-reins').val();

  $('#inp-entry-con-reins').prop("disabled",true);
  $('#inp-entry-memo-reins').prop("disabled",true);

  if(status == "" || status.toUpperCase() == "REJECT"){

    $('#btn-entry-submit-reins').prop("disabled",false);
    $('#btn-entry-approve-reins').prop("disabled",true);
    $('#btn-entry-reject-reins').prop("disabled",true);
    $('#inp-entry-accno-reins').prop("disabled",false);
    $('#inp-entry-accname-reins').prop("disabled",false);
    $('#inp-entry-bankid-reins').prop("disabled",false);

  } else if (status.toUpperCase() == "SUBMIT"){
    $('#btn-entry-submit-reins').prop("disabled",true);
    $('#btn-entry-approve-reins').prop("disabled",false);
    $('#btn-entry-reject-reins').prop("disabled",false);
    $('#inp-entry-accno-reins').prop("disabled",true);
    $('#inp-entry-accname-reins').prop("disabled",true);
    $('#inp-entry-bankid-reins').prop("disabled",true);
  } else if (status.toUpperCase() == "APPROVE ADH"){
    $('#btn-entry-submit-reins').prop("disabled",true);
    $('#btn-entry-approve-reins').prop("disabled",true);
    $('#btn-entry-reject-reins').prop("disabled",false);
    $('#inp-entry-accno-reins').prop("disabled",true);
    $('#inp-entry-accname-reins').prop("disabled",true);
    $('#inp-entry-bankid-reins').prop("disabled",true);
    } else {
    $('#btn-entry-submit-reins').prop("disabled",true);
    $('#btn-entry-approve-reins').prop("disabled",true);
    $('#btn-entry-reject-reins').prop("disabled",true);
    $('#inp-entry-accno-reins').prop("disabled",true);
    $('#inp-entry-accname-reins').prop("disabled",true);
    $('#inp-entry-bankid-reins').prop("disabled",true);
  }
}


// JS TAB EXPORT REFUND
var tabel_export_refund = $('#tbl-export-refund').DataTable({
  "paging": false,
  "scrollY": "360px",
  "scrollCollapse": true,
  "columnDefs": [
            {
                "targets": [ 15 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 16 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 17 ],
                "visible": false,
                "searchable": false
            },
            {
                "targets": [ 18 ],
                "visible": false,
                "searchable": false
            }
        ]
});

$("#check-all-export-refund").click(function(){
    $('input:checkbox',tabel_export_refund[0]).not(this).prop('checked', this.checked);
});



// $("th :checkbox").change(function() {
//     $(this).closest("table").find('[type=checkbox]').prop("checked", this.checked);
// });


$('#btn-exp-search-reins').on("click", function() {
  var ins_com = $('#inp-exp-ins-com-reins').val();
  var ins_type = $('#inp-exp-ins-type-reins').val();
  //var ref_type = $('#inp-exp-type-reins').val();
  var ref_type = $('#inp-exp-type-reins').val(); 
  var start_date = $('#inp-exp-date-first-reins').val();
  var end_date = $('#inp-exp-date-end-reins').val();
  var batch_no = $('#inp-exp-btachno-reins').val();
  var isDisable = "";
  if(batch_no.trim() != ""){
        isDisable = "disabled";
    }
    var flag = true;
    var note = "";

    if($('input[type=radio][name=optradio_refund]:checked').val() == 'crtnewbatch' ){
      
      if($('#inp-exp-ins-type-reins').val() == ''){
        note = note + "Silahkan pilih Insurance Type <br>"
        $('#div-exp-ins-type-reins').addClass('has-error');
        flag = false;
      } else{
        $('#div-exp-ins-type-reins').removeClass('has-error');
      }

      if($('#inp-exp-ins-com-reins').val() == ''){
        note = note + "Silahkan pilih Insurance Company <br>"
        $('#div-exp-ins-com-reins').addClass('has-error');
        flag = false;
      } else{
        $('#div-exp-ins-com-reins').removeClass('has-error');
      }

      if($('#inp-exp-type-reins').val() == ''){
        note = note + "Silahkan pilih Refund Type <br>"
        $('#div-exp-type-reins').addClass('has-error');
        flag = false;
      } else{
        $('#div-exp-type-reins').removeClass('has-error');
      }

      if($('#inp-exp-date-first-reins').val() == ''){
        note = note + "Tanggal tidak boleh kosong <br>"
        $('#div-exp-date-first-reins').addClass('has-error');
        flag = false;
      } else{
        $('#div-exp-date-first-reins').removeClass('has-error');
      }

    } else {

      if($('#inp-exp-btachno-reins').val() == ''){
        note = note + "Batch No tidak boleh kosong <br>"
        $('#div-exp-btachno-reins').addClass('has-error');
        flag = false;
      } else{
        $('#div-exp-btachno-reins').removeClass('has-error');
      }
    }

    if(!flag){
        alert_error(note);
        return;
      }
  $.ajax({
        url: "Controller_refund_insurance/searchExport",
        type: 'POST',
        dataType:'json',
        data:{
            "ins_com": ins_com,
            "ins_type": ins_type,
            "ref_type": ref_type,
            "start_date": start_date,
            "end_date": end_date,
            "batch_no": batch_no
        },

        success: function(response) {
            console.log(response);
            var res = $.parseJSON(response);
            console.log(res);
            if(response) {
                try {
                  debugger;
                  if(res['status_refund'] == null || res['status_refund'] == ''){
                    $('#btn-exp-conf-reins').prop("disabled",false);
                    $('#btn-exp-approve-reins').prop("disabled",true);
                    $('#btn-exp-send-reins').prop("disabled",true);
                    $('#btn-exp-expo-reins').prop("disabled",true);
                  } else if(res['status_refund'] == '03'){
                    $('#btn-exp-conf-reins').prop("disabled",true);
                    $('#btn-exp-approve-reins').prop("disabled",false);
                    $('#btn-exp-send-reins').prop("disabled",true);
                    $('#btn-exp-expo-reins').prop("disabled",true);
                  } else if(res['status_refund'] == '04'){
                    $('#btn-exp-conf-reins').prop("disabled",true);
                    $('#btn-exp-approve-reins').prop("disabled",true);
                    $('#btn-exp-send-reins').prop("disabled",false);
                    $('#btn-exp-expo-reins').prop("disabled",true);
                  } else {
                    $('#btn-exp-conf-reins').prop("disabled",true);
                    $('#btn-exp-approve-reins').prop("disabled",true);
                    $('#btn-exp-send-reins').prop("disabled",true);
                    $('#btn-exp-expo-reins').prop("disabled",false);
                  }

                  $('#inp-exp-status-reins').val(res['status_refund_desc'])
                  
                  tabel_export_refund.clear().draw();
                      $.each(res['data'], function(index) {
                        var sstat = "";

                        //ini harcode an
                        if(this['cont_stat'] == '02'){
                          sstat = "SOLD";
                        } else if(this['cont_stat'] == '04'){
                          sstat = "WO";
                        } else {
                          sstat = "PT";
                        }
                        tabel_export_refund.row.add([
                          '<input type="checkbox" class="ckbox" '+isDisable+'>',
                            this['batch_no'],
                            this['memo_no'],
                            this['cont_no'],
                            this['ins_policy'],
                            this['cus_name'],
                            this['branch'],
                            this['ob_type'],
                            this['ob_model'],
                            this['noka'],
                            this['nosin'],
                            sstat,
                            this['ins_com'],
                            this['close_date'],
                            this['refund_date'],
                            this['refund_id'],
                            this['cont_id'],
                            this['branch_code'],
                            this['batch_date']               

                            ]).draw(false);
                    });
                      if(isDisable){
                        $('#check-all-export-refund').click()
                        $('#check-all-export-refund').prop("disabled",true);
                      } else {
                        $('#check-all-export-refund').prop("disabled",false);
                      }
                }
                catch(e) {
                        $('#loading-ajax').hide(); //menutup loading ajax
                        console.log(e);
                        alert_error("Data tidak ditemukan ! error => "+e);
                    }
                }
            },
            error: function(response) {
                console.log(response);
            }
        });
});

$('#btn-exp-conf-reins').on("click", function() {


var flagrole =true;

    for(var i = 0 ; i < role_refins.length  ; i++){
        if(role_refins[i]['role_code'] === 'CNFRM-EXPORT-REFINS'){
                flagrole = false;
                break;
             }
    }
    if(!flagrole){
  var listData = [];
  if($('input:checkbox:checked', $('#tbl-export-refund')).not("#check-all-export-refund").length > 0 ){
    $('input:checkbox:checked', $('#tbl-export-refund')).not("#check-all-export-refund").each(function() {
            var data = tabel_export_refund.row($(this).closest('tr') ).data();

             listData.push({
               "refund_id" :data[15],
               "cont_id" :data[16],
               "branch_code" : data[17]
             });

             


    });
          //ajax ke controller
          $.ajax({
            url: "Controller_refund_insurance/confirmExport",
            type: 'POST',
            dataType:'json',
            data:{
                "data": listData
            },

            success: function(response) {
                console.log(response);
                debugger;
                var res = $.parseJSON(response);
                console.log(res);
                if(response) {
                    try {
                      if(res['data']){
                      alert_info("Confirm berhasil, Batch terbuat dengan no "+res['data']);
                      $('#inp-exp-btachno-reins').val(res['data']);
                      $('#btn-exp-search-reins').click();
                      } else {
                        alert_error("Gagal Silahkan coba lagi");
                      }
                    } 
                    
                    catch(e) {
                            $('#loading-ajax').hide(); //menutup loading ajax
                            console.log(e);
                            alert_error("Gagal ! error => "+e);
                        }
                    }
                },
                error: function(response) {
                    console.log(response);
                }
            });

  } else {
    alert_error("Pilih data terlebih dahulu");
  }
} else {
  alert_error("Tidak punya previlege");
}
});

//APPROVE EXPORT BUTTON
$('#btn-exp-approve-reins').on("click", function() {

  var flagrole =true;

    for(var i = 0 ; i < role_refins.length  ; i++){
        if(role_refins[i]['role_code'] === 'APPR-EXPORT-REFINS'){
                flagrole = false;
                break;
             }
    }

    if(!flagrole){
  var listData = [];
  alert_confirm("Apakah anda yakin?", function(){
    tabel_export_refund.rows().data().each(function(data) {
             listData.push(
               data[15]
             );
    });

    //ajax ke controller
          $.ajax({
            url: "Controller_refund_insurance/updateStatusToApprove",
            type: 'POST',
            dataType:'json',
            data:{
                "data": listData
            },

            success: function(response) {
                console.log(response);
                debugger;
                var res = $.parseJSON(response);
                console.log(res);
                if(response) {
                    try {
                      if(res['data']){
                      alert_info("Approve berhasil");
                      $('#btn-exp-search-reins').click();
                      } else {
                        alert_error("Gagal Silahkan coba lagi");
                      }
                    } 
                    
                    catch(e) {
                            $('#loading-ajax').hide(); //menutup loading ajax
                            console.log(e);
                            alert_error("Gagal ! error => "+e);
                        }
                    }
                },
                error: function(response) {
                    console.log(response);
                }
            });

  } );
 }else {
  alert_error("Tidak punya previlege");
}
});


// SEND TO INS BUTTON
$('#btn-exp-send-reins').on("click", function() {

  var flagrole =true;

    for(var i = 0 ; i < role_refins.length  ; i++){
        if(role_refins[i]['role_code'] === 'S2IN-EXPORT-REFINS'){
                flagrole = false;
                break;
             }
    }

    if(!flagrole){
  var listData = [];
  alert_confirm("Apakah anda yakin?", function(){
    tabel_export_refund.rows().data().each(function(data) {

             listData.push(
               data[15]
             );


             


    });

    //ajax ke controller
          $.ajax({
            url: "Controller_refund_insurance/sendToInsurance",
            type: 'POST',
            dataType:'json',
            data:{
                "data": listData
            },

            success: function(response) {
                console.log(response);
                debugger;
                var res = $.parseJSON(response);
                console.log(res);
                if(response) {
                    try {
                      if(res['data']){
                      alert_info("Send To Insurance berhasil");
                      $('#btn-exp-search-reins').click();
                      } else {
                        alert_error("Gagal Silahkan coba lagi");
                      }
                    } 
                    
                    catch(e) {
                            $('#loading-ajax').hide(); //menutup loading ajax
                            console.log(e);
                            alert_error("Gagal ! error => "+e);
                        }
                    }
                },
                error: function(response) {
                    console.log(response);
                }
            });

  } );
} else {
  alert_error("Tidak punya previlege");
}
});

//EXPORT BUTTON
$('#btn-exp-expo-reins').on("click", function () {
        var dataz = tabel_export_refund.rows().data();
        var csvrow = [];
        var batch_date = dataz[0][18];
        var batch_type = "";

        var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();


    today = mm + '/' + dd + '/' + yyyy;

        if(dataz[0][11] == '04') {
          batch_type = "WO";
        } else if(dataz[0][11] == '02') {
          batch_type = "SOLD";
        } else {
          batch_type = "Normal Preterm";
        }
          csvrow.push(["PENGAJUAN REFUND PREMI ASURANSI"]);
          csvrow.push(["Tanggal", today]);
          csvrow.push(["BATCH NO",dataz[0][1]]);
          csvrow.push(["REFUND TYPE",batch_type]);
          csvrow.push(["MASKAPAI",dataz[0][12]]);
          csvrow.push([""]);
          csvrow.push(["NO","NO MEMO", "NO KONTRAK", "NO POLIS", "NAMA CUSTOMER", "CABANG", "OBTY_DESC", "OBMO_DESC", "NO RANGKA", "NO MESIN", "STATUS KONTRAK", "ASURANSI", "TGL PEMBATALAN", "TGL PENGAJUAN REFUND" ]);
          var noo = 1;
        $.each(dataz, function(index) {
                csvrow.push([noo, this[2],"\t"+this[3],
                      this[4],this[5],this[6],this[7],
                      this[8],this[9],this[10],this[11],
                      this[12],this[13],this[14]]);
                noo++;
        });

        let csvContent = "data:text/csv;charset=utf-8,";
            csvrow.forEach(function(rowArray){
                    let row = rowArray.join(";");
                    csvContent += row + "\r\n";
        }); 


        var encodedUri = encodeURI(csvContent);
        var link = $("<a id='lol'> lol </a>");
        link.prop("href", encodedUri);
        link.prop("download", "Pengajuan Refund - "+batch_type+" Tanggal "+batch_date+".csv");
        debugger;
        //$('#list-status-autodebet').append(link);
        link.get(0).click();
        //window.location = link.prop("href");
        //document.body.appendChild(link); // Required for FF

        //link.click(); // This will download the data file named "my_data.csv".
        //debugger;
});


getBankId();
function getBankId(){
  $.ajax({
    'url':'Controller_refund_insurance/getBankId',
    'type':'POST',
     'dataType': 'Json',
    success: function(response){
      //console.log(getInsType);
      if(response['status']){
        try{
          console.log(response);
          if(response['status'] == true){
            $('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#slc-entry-reins').addClass('form-control');
            $.each(response['data'], function(){
              $('#slc-entry-reins').append('<option value="'+this['bankCode']+'">' + this['bankCode'] +'-'+this['bankName']);
            });
          } else {
            alert_refresh('Refresh');
           }
        } catch(e){
          $('#loading-ajax').hide();
          alert_error('Terjadi Kesalahan error{getInsType} =>' + e)
        }
      }

    },
    error: function(response){
      console.log(response);
      alert_error('Tidak terhubung dengan server');
    }
  });
}

// JS TAB EXPORT REFUND

var radio_value = '';
$('input[type=radio][name=optradio_refund]').change(function(){
  if(this.value == 'crtnewbatch'){
     $('#inp-exp-btachno-reins').prop('disabled', true);
    $('#inp-exp-ins-type-reins').prop('disabled', false);
    $('#inp-exp-ins-com-reins').prop('disabled', false);
    $('#inp-exp-type-reins').prop('disabled', false);
    $('#inp-exp-date-first-reins').prop('disabled', false);
    $('#inp-exp-date-end-reins').prop('disabled', false);
     radio_value = this.value;
     console.log(radio_value);
     $('#div-exp-btachno-reins').removeClass('has-error');

  } else if (this.value == 'srcbatch'){
    $('#inp-exp-btachno-reins').prop('disabled', false);
    $('#inp-exp-ins-type-reins').prop('disabled', true);
    $('#inp-exp-ins-com-reins').prop('disabled', true);
    $('#inp-exp-type-reins').prop('disabled', true);
    $('#inp-exp-date-first-reins').prop('disabled', true);
    $('#inp-exp-date-end-reins').prop('disabled', true);
     radio_value = this.value;
     console.log(radio_value);

    $('#div-exp-ins-com-reins').removeClass('has-error');
    $('#div-exp-type-reins').removeClass('has-error');
    $('#div-exp-date-first-reins').removeClass('has-error');
    $('#div-exp-date-end-reins').removeClass('has-error');
  }
});

$('#inp-exp-date-first-reins, #inp-pro-date-first-reins,#inp-req-date-first-reins').datetimepicker({
  format: 'DD-MMM-YYYY',
   maxDate: toDateData(currentDate)
});

$('#inp-exp-date-end-reins, #inp-pro-date-end-reins,#inp-req-date-end-reins').datetimepicker({
    format: 'DD-MMM-YYYY',
    maxDate: toDateData(currentDate),

});

getInsType();
function getInsType(){
  $.ajax({
    'url':'Controller_refund_insurance/getInsType',
    'type':'POST',
     'dataType': 'Json',
    success: function(response){
      
      var getInsType = $.parseJSON(response);
      debugger;
      //console.log(getInsType);
      try{
      if(getInsType){
        
          console.log(getInsType)
            $('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#inp-exp-ins-type-reins').addClass('form-control');
            $.each(getInsType['data'], function(){
              $('#inp-exp-ins-type-reins').append('<option value="'+this['insr_type_id']+'">' + this['insr_type_id'] + "  -  " + this['insr_type_desc']);
            });
          } else {
            alert_refresh('Refresh');
           }
        } catch(e){
          $('#loading-ajax').hide();
          alert_error('Terjadi Kesalahan error{getInsType} =>' + e)
        }
      },

    error: function(response){
      console.log(response);
      alert_error('Tidak terhubung dengan server');
    }
  });
}

function getInsCompany(){
  $.ajax({
    'url':'Controller_refund_insurance/getInsCompany',
    'type':'POST',
    'dataType': 'Json',
    success: function(response){
      
      var getInsCompany = $.parseJSON(response);
      if(getInsCompany){
        try{
          if(getInsCompany['status'] == true){
            $('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#inp-exp-ins-com-reins').addClass('form-control');
            $.each(getInsCompany['data'], function(){
              $('#inp-exp-ins-com-reins').append('<option value="'+this['insr_id']+'">' +this['insr_id']+ "  -  " + this['insr_name']);
            });
          } else {
            alert_refresh('Refresh');
          }
        } catch(e){
          $('#loading-ajax').hide();
          alert_error('Terjadi Kesalahan error{getInsCompany} => '+ e);
        }
      }
    },
    error: function(response){
      console.log(response);
      alert_error('Tidak terhubung denagan server');
    }
  });
}



function getRefundType(){
  $.ajax({
    'url':'Controller_refund_insurance/getRefundType',
    'type':'POST',
    'dataType': 'Json',
    success: function(response){
      
      var getInsCompany = $.parseJSON(response);
      if(getInsCompany){
        try{
          if(getInsCompany['status'] == true){
            $('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#inp-exp-type-reins').addClass('form-control');
            $.each(getInsCompany['data'], function(){
              $('#inp-exp-type-reins').append('<option value="'+this['mst_value']+'">' + this['mst_desc']);
            });
          } else {
            alert_refresh('Refresh');
          }
        } catch(e){
          $('#loading-ajax').hide();
          alert_error('Terjadi Kesalahan error{getRefundType} => '+ e);
        }
      }
    },
    error: function(response){
      console.log(response);
      alert_error('Tidak terhubung denagan server');
    }
  });
}


$('#inp-exp-date-first-reins').on("dp.change", function(e) {

    $('#inp-exp-date-end-reins').data("DateTimePicker").minDate(e.date._d);

    new_date = new Date(e.date._d);
    new_date.setDate(new_date.getDate() + 30000);
    if (new_date > new Date(currentDate)) {
        new_date = new Date(currentDate);

    }
    $('#inp-exp-date-end-reins').data("DateTimePicker").maxDate(new_date);
    $('#inp-exp-date-end-reins').data("DateTimePicker").date(new_date);

});

$('#inp-pro-date-first-reins').on("dp.change", function(e) {

    $('#inp-pro-date-end-reins').data("DateTimePicker").minDate(e.date._d);

    new_date = new Date(e.date._d);
    new_date.setDate(new_date.getDate() + 30000);
    if (new_date > new Date(currentDate)) {
        new_date = new Date(currentDate);

    }
    $('#inp-pro-date-end-reins').data("DateTimePicker").maxDate(new_date);
    $('#inp-pro-date-end-reins').data("DateTimePicker").date(new_date);

});

$('#inp-req-date-first-reins').on("dp.change", function(e) {

    $('#inp-req-date-end-reins').data("DateTimePicker").minDate(e.date._d);

    new_date = new Date(e.date._d);
    new_date.setDate(new_date.getDate() + 30000);
    if (new_date > new Date(currentDate)) {
        new_date = new Date(currentDate);

    }
    $('#inp-req-date-end-reins').data("DateTimePicker").maxDate(new_date);
    $('#inp-req-date-end-reins').data("DateTimePicker").date(new_date);

});




// JS TAB IMPORT REFUND
var filename_import = '' ;
var tabel_import_refund = $('#tbl-import-refund').DataTable();
  


$('#btn-upload-import-reins').click(function(){
    $('#inp-upload-file').click();
});

$('#btn-imp-upload').click(function(){
  filename_import = $('#inp-imp-memo')[0].files[0].name;
  localStorage.setItem("filename_import", filename_import);
  var ffile = $('#inp-imp-memo')[0].files[0];
  var formdata = new FormData();
    formdata.append("file", ffile);
  //$('#inp-eitb-import-filename').val(filename_import);
  //tmppath_eitb = URL.createObjectURL(event.target.files[0]);
  //$("img").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
  //alert(tmppath_eitb);

  $.ajax({
    url: "Controller_refund_insurance/get_url_file",
    type: 'POST',
    timeput : 10000,
    dataType: 'json',
    contentType: false,
        processData: false,
        async: false,
    data:formdata,
    success: function(response){
      try {
        tabel_import_refund.clear();
        if(response[0].length != 11){
          alert_error("isi file tidak cocok");
        } else {
         $.each(response, function(index) {
           var str = this[4];
           tabel_import_refund.row.add([
              this[0],
              this[1],
              this[2],
              this[3],
              str.trim(),
              this[5],
              this[6],
              this[7],
              this[8],
              this[9],
              accounting.formatMoney(this[10] , '', 2, ',', '.')
                   
                            ]).draw(false);
           $('#btn-imp-conf').prop("disabled",false);
        //   var str = this[14];
        //   pv_remarks.push([str.substring(str.indexOf("_")+1, str.indexOf(".")),this[2]]);
         });
        }
        console.log(response);  
      }
      catch(e) {
        alert(e);
        console.log(response);
        console.log(e);
      }
    },
    error: function(response){
      console.log(response);
      alert(response.responseText);
    }
  });
});

$('#btn-imp-conf').prop("disabled",true);

//BUTON CONFIRM IMPORT

$('#btn-imp-conf').on("click", function() {

  var listData = [];
  var filename = localStorage.getItem("filename_import");
    tabel_import_refund.rows().every(function() {
        debugger;
        var data = this.data();
             listData.push({
               "memo_no" : data[1],
               "cont_no" : data[4],
               "refund_paid_date" : data[9],
               "refund_amount" :  accounting.unformat(data[10])
             }
             );


             


    });

    //ajax ke controller
          $.ajax({
            url: "Controller_refund_insurance/confirmImport",
            type: 'POST',
            dataType:'json',
            data:{
                "data": listData,
                "filename" : filename
            },

            success: function(response) {
                console.log(response);
                debugger;
                var res = $.parseJSON(response);
                console.log(res);
                if(response) {
                    try {
                      if(res['status'] == 'sukses'){
                        var pesan = "";
                        if(res['notfound']){
                          pesan = pesan + res['notfound']
                        }
                        if(res['errorUpdate']){
                          pesan = pesan + res['errorUpdate']
                        }
                        
                        pesan = pesan + "Berhasil confirm : "+res['updated']+" Memo"

                      alert_info(pesan);
                      } else {
                        alert_error("Gagal Silahkan coba lagi <br>"+res['data']);
                      }
                    } 
                    
                    catch(e) {
                            $('#loading-ajax').hide(); //menutup loading ajax
                            console.log(e);
                            alert_error("Gagal ! error => "+e);
                        }
                    }
                },
                error: function(response) {
                    console.log(response);
                }
            });


});


//JS TAB REPORT REFUND
$('#inp-rep-date-first-reins').on("dp.change", function(e) {

    $('#inp-rep-date-end-reins').data("DateTimePicker").minDate(e.date._d);

    new_date = new Date(e.date._d);
    new_date.setDate(new_date.getDate() + 30);
    if (new_date > new Date(currentDate)) {
        new_date = new Date(currentDate);

    }
    $('#inp-rep-date-end-reins').data("DateTimePicker").maxDate(new_date);
    $('#inp-rep-date-end-reins').data("DateTimePicker").date(new_date);

});

getReprotType();

function getReprotType(){
  $.ajax({
    'url':'Controller_refund_insurance/getReportType',
    'type':'POST',
    'dataType': 'Json',
    success: function(response){
      
      var getInsCompany = $.parseJSON(response);
      if(getInsCompany){
        try{
          if(getInsCompany['status'] == true){
            $('<option/>').val('').html('-- SILAHKAN PILIH --').appendTo('#inp-rep-type').addClass('form-control');
            $.each(getInsCompany['data'], function(){
              $('#inp-rep-type').append('<option value="'+this['mst_value']+'">' + this['mst_desc']);
            });
          } else {
            alert_refresh('Refresh');
          }
        } catch(e){
          $('#loading-ajax').hide();
          alert_error('Terjadi Kesalahan error{getRefundType} => '+ e);
        }
      }
    },
    error: function(response){
      console.log(response);
      alert_error('Tidak terhubung denagan server');
    }
  });
}


$('#inp-rep-type').on("change", function(){

  var report_type = $('#inp-rep-type').val();
  if(report_type == "04"){
    $('#inp-rep-date-first-reins').prop("disabled",true);
  } else {
    $('#inp-rep-date-first-reins').prop("disabled",false);
  }

});


$('#print-rep-reins').on("click", function() {

  var report_type = $('#inp-rep-type').val();
  var branch = $('#slc-branch-reins').val();
  var periode_start = $('#inp-rep-date-first-reins').val();
  var periode_end = $('#inp-rep-date-end-reins').val();

  if(report_type == null){
    alert_error("Silahkan pilih Report Type");
  } else if(branch == null){
    alert_error("Silahkan pilih Cabang");
  } else if(periode_start == null || periode_end == null){
    alert_error("Tanggal tidak boleh kosong");
  } else {

    if(report_type == "01"){
      reportRefund(periode_start,periode_end,branch);
    } else if(report_type == "02") {
      reportKlaimOut(periode_start,periode_end,branch);
    } else if(report_type == "03") {
      reportKlaimIn(periode_start,periode_end,branch);
    }else if(report_type == "04") {
      reportKlaimAging(branch);
    }


  }

});

function reportRefund(periode_start,periode_end,branch){
    
    $.ajax({
            url: "Controller_refund_insurance/reportRefund",
            type: 'POST',
            dataType:'json',
            data:{
                "periode_start": periode_start,
                "periode_end" : periode_end,
                "branch" : branch
            },

            success: function(response) {
                console.log(response);
                var dataz = $.parseJSON(response);
                if(response) {
                    try {
                      debugger;

                       if(dataz['data'] && dataz['data'].length >0){
                          var csvrow = [];

                          var today = new Date();
                          var dd = today.getDate();
                          var mm = today.getMonth()+1; //January is 0!
                          var yyyy = today.getFullYear();


                          today = mm + '/' + dd + '/' + yyyy;

                          csvrow.push(["REPORT REFUND PREMI ASURANSI"]);
                          csvrow.push(["Tanggal", today]);
                          csvrow.push(["PERIODE",periode_start +" - "+periode_end]);
                          csvrow.push([""]);
                          csvrow.push(["NO","NO MEMO", "NO KONTRAK", "NO POLIS", "NAMA CUSTOMER", "CABANG", "OBTY_DESC", "OBMO_DESC", "NO RANGKA", "NO MESIN", "STATUS KONTRAK", "ASURANSI", "TGL PEMBATALAN", "TGL PENGAJUAN REFUND", "TANGGAL PEMBAYARAN REFUND", "NILAI REFUND PREMI" ]);
                          //var noo = 1;

                        $.each(dataz['data'], function(index) {
                                csvrow.push([index + 1, this['memo_no'],"\t"+this['cont_no'],
                                      "\t"+this['ins_polis'],this['cus_name'],this['branch_name'],this['obty_desc'],
                                      this['obmo_desc'],this['noka'],this['nosin'],this['stat_cont_desc'],
                                      this['ins_comp'],this['tgl_pembatalan'],this['tgl_pengajuan'],this['tgl_pembayaran'],this['amount']]);
                                // noo++;
                        });

                        let csvContent = "data:text/csv;charset=utf-8,";
                            csvrow.forEach(function(rowArray){
                                    let row = rowArray.join(";");
                                    csvContent += row + "\r\n";
                        }); 


                        var encodedUri = encodeURI(csvContent);
                        var link = $("<a id='lol'> lol </a>");
                        link.prop("href", encodedUri);
                        link.prop("download", "Report Refund "+branch+" - Periode_"+periode_start+" - "+periode_end+".csv");
                        link.get(0).click();

                        } else {
                        alert_error("data tidak ditumakan");
                      }
                    }
                    catch(e) {
                            $('#loading-ajax').hide(); //menutup loading ajax
                            console.log(e);
                            alert_error("Gagal ! error => "+e);
                        }
                    }
                },
                error: function(response) {
                    console.log(response);
                }
            });

}


function reportKlaimIn(periode_start,periode_end,branch){
    
    $.ajax({
            url: "Controller_refund_insurance/reportKlaimIn",
            type: 'POST',
            dataType:'json',
            data:{
                "periode_start": periode_start,
                "periode_end" : periode_end,
                "branch" : branch
            },

            success: function(response) {
                console.log(response);
                var dataz = $.parseJSON(response);
                if(response) {
                    try {
                      debugger;
                        if(dataz['data'] && dataz['data'].length >0){
                          var csvrow = [];

                          var today = new Date();
                          var dd = today.getDate();
                          var mm = today.getMonth()+1; //January is 0!
                          var yyyy = today.getFullYear();


                          today = mm + '/' + dd + '/' + yyyy;

                          csvrow.push(["REPORT KLAIM ASURANSI IN"]);
                          csvrow.push(["Tanggal", today]);
                          csvrow.push(["PERIODE",periode_start +" - "+periode_end]);
                          csvrow.push([""]);
                          csvrow.push(["BR ID","CABANG", "NO KONTRAK", "NAMA CUSTOMER", "OBJECT", "INSC TYPE", "JENIS CLAIM", "INSR CLAIM TYPE", "START DATE", "END DATE", "DOL", "TANGGAL LAPORAN AWAL KLAIM", "SUM INSURED", "TOTAL KEWAJIBAN", "STATUS KLAIM", "INSURANCE NAME" ]);
                          
                          //var noo = 1;

                          $.each(dataz['data'], function(index) {
                                csvrow.push(["\t"+this['branch_code'], this['branch_name'],"\t"+this['cont_no'],
                                      this['cus_name'],this['obj_group'],this['insc_type'],this['claim_desc'],
                                      this['claim_code'],this['start_date'],this['end_date'],this['dol'],
                                      this['tgl_lpr_claim'],this['sum_insured'],this['total_kewajiban'],this['status_kalim'],this['ins_com']]);
                                // noo++;
                        });

                        

                        let csvContent = "data:text/csv;charset=utf-8,";
                            csvrow.forEach(function(rowArray){
                                    let row = rowArray.join(";");
                                    csvContent += row + "\r\n";
                        }); 


                        var encodedUri = encodeURI(csvContent);
                        var link = $("<a id='lol'> lol </a>");
                        link.prop("href", encodedUri);
                        link.prop("download", "Report Klaim In "+branch+" - Periode_"+periode_start+" - "+periode_end+".csv");
                        link.get(0).click();
                      }else {
                        alert_error("data tidak ditumakan");
                      }
                 }
                    
                    catch(e) {
                            $('#loading-ajax').hide(); //menutup loading ajax
                            console.log(e);
                            alert_error("Gagal ! error => "+e);
                        }
                    }
                },
                error: function(response) {
                    console.log(response);
                }
            });

}

function reportKlaimOut(periode_start,periode_end,branch){
    
    $.ajax({
            url: "Controller_refund_insurance/reportKlaimOut",
            type: 'POST',
            dataType:'json',
            data:{
                "periode_start": periode_start,
                "periode_end" : periode_end,
                "branch" : branch
            },

            success: function(response) {
                console.log(response);
                var dataz = $.parseJSON(response);
                if(response) {
                    try {
                      debugger;
                        if(dataz['data'] && dataz['data'].length >0){
                          var csvrow = [];

                          var today = new Date();
                          var dd = today.getDate();
                          var mm = today.getMonth()+1; //January is 0!
                          var yyyy = today.getFullYear();


                          today = mm + '/' + dd + '/' + yyyy;

                          csvrow.push(["REPORT KLAIM ASURANSI OUT"]);
                          csvrow.push(["Tanggal", today]);
                          csvrow.push(["PERIODE",periode_start +" - "+periode_end]);
                          csvrow.push([""]);
                          csvrow.push(["BR ID","CABANG","INSR CLAIM NO", "NO KONTRAK", "NAMA CUSTOMER", "OBJECT", "INSC TYPE", "JENIS CLAIM", "INSR CLAIM TYPE", "START DATE", "END DATE", "DOL", "TANGGAL LAPORAN AWAL KLAIM","TANGGAL BERKAS COMPLETE","TANGGAL PENGIRIMAN KE INSURANCE","HASIL KLAIM","TANGGAL HASIL KLAIM","TANGGAL PEMBAYARAN KLAIM","TANGGAL TERMINATE", "SUM INSURED", "TOTAL KEWAJIBAN","CLAIM AMOUNT","OD DAY", "OD MONTH", "OD DOL TO LAPORAN AWAL KLAIM","OD DOL TO BERKAS COMPLETE","OD PENGIRIMAN TO HASIL KLAIM","OD HASIL KALIM TO PEMBAYARAN KALIM", "STATUS KLAIM", "INSURANCE NAME" ]);
                          //var noo = 1;

                          $.each(dataz['data'], function(index) {
                            var hasilc = this['hasil_claim'];
                            if( hasilc == "A"){
                              hasilc =  "DISETUJUI";
                            } else if (hasilc == "R"){
                              hasilc = "REJECT"
                            }
                                csvrow.push(["\t"+this['branch_code'], this['branch_name'],"\t"+this['claim_no'],"\t"+this['cont_no'],
                                      this['cust_name'],this['obj_group_desc'],this['insc_type'],this['claim_desc'],
                                      this['claim_code'],this['start_date'],this['end_date'],this['dol'],
                                      this['tgl_lpr_claim'],this['tgl_berkas_cmplt'],this['tgl_send2ins'],hasilc,this['tgl_hasil'],
                                      this['tgl_pembayaran'],this['tgl_terminate'],this['obj_price'],this['total_kewajiban'],this['claim_amount'],
                                      this['od_day'],this['od_month'],this['od_dol2claim'],this['od_dol2berkas'],this['od_send2hasil'],this['od_claimtopembayaran'],
                                      this['status_claim'],this['ins_com']]);
                                // noo++;
                        });

                        

                        let csvContent = "data:text/csv;charset=utf-8,";
                            csvrow.forEach(function(rowArray){
                                    let row = rowArray.join(";");
                                    csvContent += row + "\r\n";
                        }); 


                        var encodedUri = encodeURI(csvContent);
                        var link = $("<a id='lol'> lol </a>");
                        link.prop("href", encodedUri);
                        link.prop("download", "Report Klaim Out "+branch+" - Periode_"+periode_start+" - "+periode_end+".csv");
                        link.get(0).click();
                      }else {
                        alert_error("data tidak ditumakan");
                      }
                 }
                    
                    catch(e) {
                            $('#loading-ajax').hide(); //menutup loading ajax
                            console.log(e);
                            alert_error("Gagal ! error => "+e);
                        }
                    }
                },
                error: function(response) {
                    console.log(response);
                }
            });

}

function reportKlaimAging(branch){
    
    $.ajax({
            url: "Controller_refund_insurance/reportKlaimAging",
            type: 'POST',
            dataType:'json',
            data:{
                "branch" : branch
            },

            success: function(response) {
                console.log(response);
                var dataz = $.parseJSON(response);
                if(response) {
                    try {
                      debugger;
                        if(dataz['data'] && dataz['data'].length >0){
                          var csvrow = [];

                          var today = new Date();
                          var dd = today.getDate();
                          var mm = today.getMonth()+1; //January is 0!
                          var yyyy = today.getFullYear();


                          today = mm + '/' + dd + '/' + yyyy;

                          csvrow.push(["REPORT KLAIM ASURANSI AGING"]);
                          csvrow.push(["Tanggal", today]);
                          //csvrow.push(["PER TANGGAL",periode_start +" - "+periode_end]);
                          csvrow.push([""]);
                          csvrow.push(["BR ID","CABANG", "NO KONTRAK", "NAMA CUSTOMER", "OBJECT", "INSC TYPE", "JENIS CLAIM", "INSR CLAIM TYPE", "START DATE", "END DATE", "DOL", "TANGGAL LAPORAN AWAL KLAIM","TANGGAL BERKAS COMPLETE","TANGGAL PENGIRIMAN KE INSURANCE", "SUM INSURED", "TOTAL KEWAJIBAN","OD DAY", "OD MONTH", "STATUS KLAIM", "BERKAS DIKIRIM", "KEKURANGAN BERKAS", "INSURANCE NAME" ]);
                          //var noo = 1;

                          $.each(dataz['data'], function(index) {
                            debugger;
                                csvrow.push(["\t"+this['branch_code'], this['branch_name'],"\t"+this['cont_no'],
                                      this['cust_name'],this['obj_group_desc'],this['insc_type'],this['claim_desc'],
                                      this['claim_code'],this['start_date'],this['end_date'],this['dol'],this['tgl_lpr_claim'],
                                      this['tgl_berkas_cmplt'],this['tgl_send2ins'],this['obj_price'],this['total_kewajiban'],this['od_day'],this['od_month'], 
                                      this['status_claim'],this['berkas_kirim'],this['berkas_kurang'],this['ins_com']]);
                                // noo++;
                        });

                        

                        let csvContent = "data:text/csv;charset=utf-8,";
                            csvrow.forEach(function(rowArray){
                                    let row = rowArray.join(";");
                                    csvContent += row + "\r\n";
                        }); 


                        var encodedUri = encodeURI(csvContent);
                        var link = $("<a id='lol'> lol </a>");
                        link.prop("href", encodedUri);
                        link.prop("download", "Report Klaim Aging "+branch+" - "+today+" .csv");
                        link.get(0).click();
                      } else {
                        alert_error("data tidak ditumakan");
                      }

                 } 
                    
                    catch(e) {
                            $('#loading-ajax').hide(); //menutup loading ajax
                            console.log(e);
                            alert_error("Gagal ! error => "+e);
                        }
                    }
                },
                error: function(response) {
                    console.log(response);
                }
            });

}



var radio_value = '';
$('input[type=radio][name=optradio_refund]').change(function(){
  if(this.value == 'crtnewbatch'){
    $('#inp-exp-btachno-reins').val('');
    $('#inp-exp-btachno-reins').prop('disabled', true);
    $('#inp-exp-ins-type-reins').prop('disabled', false);
    $('#inp-exp-ins-com-reins').prop('disabled', false);
    $('#inp-exp-type-reins').prop('disabled', false);
    $('#inp-exp-date-first-reins').prop('disabled', false);
    $('#div-exp-btachno-reins').removeClass('has-error');
     radio_value = this.value;
     console.log(radio_value);
  } else if (this.value == 'srcbatch'){
    $('#inp-exp-btachno-reins').prop('disabled', false);
    $('#inp-exp-ins-type-reins').prop('disabled', true);
    $('#inp-exp-ins-com-reins').prop('disabled', true);
    $('#inp-exp-type-reins').prop('disabled', true);
    $('#inp-exp-date-first-reins').prop('disabled', true);
    $('#div-exp-ins-type-reins').removeClass('has-error');
    $('#div-exp-ins-com-reins').removeClass('has-error');
    $('#div-exp-type-reins').removeClass('has-error');
    $('#div-exp-date-first-reins').removeClass('has-error');
     radio_value = this.value;
     console.log(radio_value);
  }
});


function getSeparator(){
  var list = ["a", "b"];
listSeparator = list.toLocaleString().substring(1, 2);
alert(listSeparator);
}


   
//JS TAb PROCESS REFUND PRETERM
var tabel_proses_refund = $('#tbl-process-refund').DataTable({
  "paging": false,
  "scrollY": "360px",
  "scrollCollapse": true,
  "columnDefs": [
            {
                "targets": [ 12 ],
                "visible": false,
                "searchable": false
            }
        ]
});

$("#check-all-process-refund").click(function(){
    $('input:checkbox',tabel_proses_refund[0]).not(this).prop('checked', this.checked);
});

$('#btn-pro-reins').click(function(){
  var start_date = $('#inp-pro-date-first-reins').val();
  var end_date = $('#inp-pro-date-end-reins').val();

  $.ajax({
    url:'Controller_refund_insurance/searchProcess',
    type:'POST',
    dataType: 'Json',
    data:{
            "start_date": start_date,
            "end_date" : end_date
         },
    success: function(response){
        try{
          var res = $.parseJSON(response);

          var datat = [];

          tabel_proses_refund.clear().draw();
           $.each(res['data'], function(index) {

              datat.push([
                  '<input type="checkbox" class="ckbox">',
                  this['cont_no'],
                  this['cus_name'],
                  this['batch_no'],
                  this['refund_no'],
                  this['preterm_no'],
                  this['ins_polis'],
                  this['amount'],
                  this['acc_no'],
                  this['acc_name'],
                  this['bank_id'],
                  this['no_pv'],
                  this['refund_id']

                ]);

           });

           tabel_proses_refund.rows.add(datat).draw(false);

        } catch(e){
          $('#loading-ajax').hide();
          alert_error('Terjadi Kesalahan error => '+ e);
        }
      
    },
    error: function(response){
      console.log(response);
      alert_error('Tidak terhubung denagan server');
    }
  });


});


$('#btn-req-reins').click(function(){
var start_date = $('#inp-req-date-first-reins').val();
  var end_date = $('#inp-req-date-end-reins').val();

  $.ajax({
    url:'Controller_refund_insurance/searchRequest',
    type:'POST',
    dataType: 'Json',
    data:{
            "start_date": start_date,
            "end_date" : end_date
         },
    success: function(response){
        try{
          var res = $.parseJSON(response);

          var datat = [];

          tabel_proses_refund.clear().draw();
           $.each(res['data'], function(index) {

              datat.push([
                  '<input type="checkbox" class="ckbox">',
                  this['cont_no'],
                  this['cus_name'],
                  this['batch_no'],
                  this['refund_no'],
                  this['preterm_no'],
                  this['ins_polis'],
                  this['amount'],
                  this['acc_no'],
                  this['acc_name'],
                  this['bank_id'],
                  this['no_pv'],
                  this['refund_id']

                ]);

           });

           tabel_proses_refund.rows.add(datat).draw(false);

        } catch(e){
          $('#loading-ajax').hide();
          alert_error('Terjadi Kesalahan error => '+ e);
        }
      
    },
    error: function(response){
      console.log(response);
      alert_error('Tidak terhubung denagan server');
    }
  });

  
});

$('#btn-pv-request-reins').click(function(){

  var listData = [];
  if($('input:checkbox:checked', $('#tbl-process-refund')).not("#check-all-process-refund").length > 0 ){
    $('input:checkbox:checked', $('#tbl-process-refund')).not("#check-all-process-refund").each(function() {
            var data = tabel_proses_refund.row($(this).closest('tr') ).data();
            debugger;
             listData.push(
               data[12]
             );
    });

    //ajax ke controller
          $.ajax({
            url: "Controller_refund_insurance/requestPv",
            type: 'POST',
            dataType:'json',
            data:{
                "data": listData
            },

            success: function(response) {
                console.log(response);
                debugger;
                var res = $.parseJSON(response);
                console.log(res);
                if(response) {
                    try {
                      if(res['status'] == 'true'){
                      alert_info("Request berhasil");
                      $('#btn-pro-reins').click();
                      } else {
                        alert_error("Gagal Silahkan coba lagi");
                      }
                    } 
                    
                    catch(e) {
                            $('#loading-ajax').hide(); //menutup loading ajax
                            console.log(e);
                            alert_error("Gagal ! error => "+e);
                        }
                    }
                },
                error: function(response) {
                    console.log(response);
                }
            });
  }
});

$('#btn-confirm-reins').click(function(){

   var listData = [];
  if($('input:checkbox:checked', $('#tbl-process-refund')).not("#check-all-process-refund").length > 0 ){
    $('input:checkbox:checked', $('#tbl-process-refund')).not("#check-all-process-refund").each(function() {
            var data = tabel_proses_refund.row($(this).closest('tr') ).data();

             listData.push(
               data[12]
             );
    });
    //ajax ke controller
          $.ajax({
            url: "Controller_refund_insurance/confirmRequest",
            type: 'POST',
            dataType:'json',
            data:{
                "data": listData
            },

            success: function(response) {
                console.log(response);
                debugger;
                var res = $.parseJSON(response);
                console.log(res);
                if(response) {
                    try {
                      if(res['data']  == 'true'){
                      alert_info("Confirm berhasil");
                      $('#btn-req-reins').click();
                      } else {
                        alert_error("Gagal Silahkan coba lagi");
                      }
                    } 
                    
                    catch(e) {
                            $('#loading-ajax').hide(); //menutup loading ajax
                            console.log(e);
                            alert_error("Gagal ! error => "+e);
                        }
                    }
                },
                error: function(response) {
                    console.log(response);
                }
            });
        }
  
});