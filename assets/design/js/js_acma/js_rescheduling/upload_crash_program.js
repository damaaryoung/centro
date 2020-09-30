$('#btn-tab-cp-upload').click(function(){
  $('#btn-clear-cp').click();
});

$('#btn-tab-cp-approve').click(function(){
  $('#btn-clear-appr-cp').click();
});


getRoleCp();
getDate();
var nik_login = $('#nik-login').text();
var name_login = $('#name-login').text();

//Datatable tab upload
var table_tab_upload_cp = $('#table-tab-upload-cp').DataTable({
 paging: false,
 deferRender: true,
 scrollY: "200px",
 scrollX : true,
 scrollCollapse: true,
 "columnDefs":[
 {
  "targets": [ 10 ],
  "visible": false
}
]
});

function wait(ms){
 var start = new Date().getTime();
 var end = start;
 while(end < start + ms) {
   end = new Date().getTime();
 }
}  

//Datatable tab upload
var table_modal_batch = $('#table-search-batch').DataTable({
  "columnDefs":[
  {
    "targets": [ 4 ],
    "visible": false
  }
  ]
});

//radio button search tab upload
$('#inp-search-cp').click(function(){
  $('#inp-batch-no-cp').prop('disabled', false);
  $('#src-batch-no-cp').prop('disabled', false);
  $('#inp-create-new-cp').prop('checked', false);
  //$('#btn-search-cp').prop('disabled', false);
  $('#btn-upload-cp').prop('disabled', true);
  $('#inp-reference-cp').prop('disabled', true);
  $('#inp-browse-file-cp').prop('disabled', true);
  $('#id-createdby-cp,#inp-status-cp,#inp-batch-no-cp,#inp-reference-cp,#inp-browse-file-cp').val('');
  table_tab_upload_cp.clear().draw();
  $('#id-div-file-reference').show();
  $('.file_cp_2').hide();
  $('#div-excel').removeClass('error-cp');
  $('#div-pdf').removeClass('error-cp');
});

//radio button create tab upload
$('#inp-create-new-cp').click(function(){
  $('#inp-batch-no-cp').prop('disabled', true);
  $('#src-batch-no-cp').prop('disabled', true);
  $('#inp-search-cp').prop('checked', false);
  $('#btn-upload-cp').prop('disabled', false);
  //$('#btn-search-cp').prop('disabled', true);
  $('#inp-reference-cp').prop('disabled', false);
  $('#inp-browse-file-cp').prop('disabled', false);
  $('#inp-status-cp').val('NEW');
  $('#inp-batch-no-cp').val('');
  table_tab_upload_cp.clear().draw();
  $('#id-div-file-reference').show();
  $('.file_cp_2').hide();
});

$('#btn-print-cp').click(function(){
  if (check_session() === 'true') {
   var id_batch = $('#id-id_batch').val();
   ajax_print_batch(id_batch);
 }else if (check_session() === 'false') {
  alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
    localStorage.clear();
    window.location.href = base_url + "Controller_login/login_view";
  });
}
});

$('#btn-clear-cp').on('click',function(){
 $("html, body").animate({
  scrollTop: 0
}, 400);

$('#inp-search-cp').click();
$('#btn-print-cp').prop('disabled', true);
$('#btn-proceed-cp').prop('disabled', true);
$('#btn-cancel-cp').prop('disabled', true);
});

$('#table-search-batch tbody').on('click', 'tr', function() {
  if ($(this).hasClass('selected')) {
    $(this).removeClass('selected');
  } else {
    table_modal_batch.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    arr_tbl = table_modal_batch.row(this).data();
  }
  $('#id-id_batch').val(arr_tbl[4]);
  $('#inp-batch-no-cp').val(arr_tbl[0]);
  $('#inp-status-cp').val(arr_tbl[3]);
});

$('#table-search-batch tbody,#btn-ok-batch').on('dblclick', 'tr', function() {

  table_modal_batch.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  arr_tbl = table_modal_batch.row(this).data();

  $('#inp-batch-no-cp').val(arr_tbl[0]);
  $('#inp-status-cp').val(arr_tbl[3]);
  $('#modal-batch-cp').modal('hide');
  $('#btn-ok-batch').click();
  table_checked  == 1;

});

$('#table-tab-upload-cp').on('click','.print-draft',function(){
  if (check_session() === 'true') {
   data = table_tab_upload_cp.row($(this).closest('tr')).data();
   var contract_id = data[10];
   var id_batch = $('#id-id_batch').val();
   ajax_print_draft(contract_id,id_batch);
 }else if (check_session() === 'false') {
  alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
    localStorage.clear();
    window.location.href = base_url + "Controller_login/login_view";
  });
}
});

$('#table-tab-upload-cp').on('click','.print-memo',function(){
  if (check_session() === 'true') {
   data = table_tab_upload_cp.row($(this).closest('tr')).data();
   var contract_id = data[10];
   ajax_print_memo(contract_id);
 }else if (check_session() === 'false') {
  alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
    localStorage.clear();
    window.location.href = base_url + "Controller_login/login_view";
  });
}
});

var table_checked  = 0;
// OK BATCH PADA MODAL
$('#btn-search-cp,#btn-ok-batch').on('click',function(){
  if ($('#inp-batch-no-cp').val()===""){
    alert_warning('Belum Ada Nomor Batch Yang Dipilih !');
    return false;
  }else{
    if (table_modal_batch.$('tr.selected').length > 0 || table_checked  == 1) {
      table_checked = 0;
      var id_batch = $('#id-id_batch').val();
      var no_batch = $('#inp-batch-no-cp').val();
      var status_batch =  $('#inp-status-cp').val();
      $.ajax({
        url:base_url+"Controller_crash_program/get_data_batch",
        data:{id_batch , no_batch,status_batch},
        type:'POST',
        success:function(response){
          console.log(response);
          var data = $.parseJSON(response);
          var arrayData = [];
          if(response) {
            try {
              table_tab_upload_cp.clear().draw();
              if (data.Status == '200') {
                $.each(data['list_data'], function(index) {
                  var button_cetak = ''; 
                  if (status_batch == 'NEW' || status_batch == 'PROCEED'|| status_batch == 'REJECTED'  ) {
                   button_cetak = '<button class="btn btn-primary print-draft" type="button"><span class="fa fa-print "></span> draft</button>';
                 }else if(status_batch == 'APPROVED' ){
                  button_cetak = '<button class="btn btn-primary print-draft" type="button"><span class="fa fa-print"></span> draft</button>&nbsp<button class="btn btn-primary print-memo" type="button"><span class="fa fa-print"></span> memo</button>';
                }
                arrayData.push([
                  index + 1,
                  this['branch_code'],
                  this['contract_no'],
                  this['cust_name'],
                  this['due_date_old'],
                  this['due_date_new'],
                  this['next_inst_no'],
                  accounting.formatMoney(this['daily_interest_fee'], '', 2, ',', '.'),
                  this['flag_jf'],
                  button_cetak,
                  this['contract_id']
                  ]);
              });
                $('#id-createdby-cp').val(data['upload_by']);
                $('#id-uploadedby-cp').val(data['approve_by']);
                table_tab_upload_cp.rows.add(arrayData).draw(); 
                $('#table-tab-upload-cp').DataTable().columns.adjust()
                .responsive.recalc();
                $('#btn-proceed-cp').prop('disabled',false);
                $('#btn-cancel-cp').prop('disabled',false);
                var status = $('#inp-status-cp').val();
                if (status == 'NEW') {
                  if(localStorage.getItem('role_col') == 'true'){
                    $('#btn-proceed-cp,#btn-cancel-cp').prop('disabled',false);
                    $('#btn-print-cp').prop('disabled',true);
                  }else if(localStorage.getItem('role_arh') == 'true' || localStorage.getItem('role_ar_rem') == 'true'){
                    $('#btn-proceed-cp,#btn-cancel-cp,#btn-print-cp').prop('disabled',true);
                  }                
                }else if(status == 'PROCEED'){
                  if(localStorage.getItem('role_col') == 'true' || localStorage.getItem('role_arh') == 'true'){
                    $('#btn-proceed-cp,#btn-cancel-cp').prop('disabled',true);
                    $('#btn-print-cp').prop('disabled',false);
                  }else if(localStorage.getItem('role_ar_rem') == 'true'){
                    $('#btn-proceed-cp,#btn-cancel-cp,#btn-print-cp').prop('disabled',true);
                  }
                }else if(status == 'REJECTED'){
                  if(localStorage.getItem('role_col') == 'true' || localStorage.getItem('role_arh') == 'true'){
                    $('#btn-proceed-cp,#btn-cancel-cp').prop('disabled',true);
                    $('#btn-print-cp').prop('disabled',false);
                  }else if(localStorage.getItem('role_ar_rem') == 'true'){
                    $('#btn-proceed-cp,#btn-cancel-cp,#btn-print-cp').prop('disabled',true);
                  }
                }else{
                  if(localStorage.getItem('role_col') == 'true' || localStorage.getItem('role_arh') == 'true'){
                    $('#btn-proceed-cp,#btn-cancel-cp').prop('disabled',true);
                    $('#btn-print-cp').prop('disabled',false);
                  }else if(localStorage.getItem('role_ar_rem') == 'true'){
                    $('#btn-proceed-cp,#btn-cancel-cp,#btn-print-cp').prop('disabled',true);
                  }
                }
                pdf = 'data:application/octet-stream;base64,' + data['File'];
                $('#id-file-reference').attr('download',data['document_refence']);
                $('#id-file-reference').text(data['document_refence']);
                $('#id-file-reference').attr('href',pdf);
         // $('#id-file-reference').attr('href','data:application/octet-stream;base64,'+data['File']);
         $('#id-div-file-reference').hide();
         $('.file_cp_2').show();
       }else{
        alert_error(data.ErrorMessage);
      }
    }
    catch(e) {
      $('#loading-ajax').hide(); 
      console.log(e);
      alert_error("Galat" + e);
    }
  }

},error:function(response){

  console.log(response);
}
});

}else{
  alert_warning('Belum Ada Nomor Batch Yang Dipilih !');
  return false;
}
}  
});

var pdf = '';
window.downloadPDF = function downloadPDF() {

  var dlnk = document.getElementById('id-file-click');
  dlnk.click();
}

//SEARCH BATCH
$("#src-batch-no-cp,#inp-batch-no-cp").click(function(){
  if (check_session() === 'true') {
    var user_type = 0;
    // if (localStorage.getItem('role_col') == 'true') {
    //   user_type = 0;
    // } else if(localStorage.getItem('role_arh') == 'true'){
    //   user_type = 1;
    // } else if(localStorage.getItem('role_ar_rem') == 'true'){
    //   user_type = 1;
    // }
    $.ajax({
      url:base_url+"Controller_crash_program/get_list_batch",
      type:'POST',
      data:{user_type},
      success:function(response){
        console.log(response);
        var data = $.parseJSON(response);
        data = $.parseJSON(data);
        var arrayData = [];
        if(response) {
          try {
            table_modal_batch.clear().draw();
            if (data.Status == '200') {
              $.each(data['list_batch'], function(index) {
                arrayData.push([
                  this['batch_no'],
                  this['total_contract'],
                  this['upload_date'],
                  this['status'],
                  this['batch_id']
                  ]);
              });
              table_modal_batch.rows.add(arrayData).draw(); 
              $("#modal-batch-cp").modal('show');
            }else{
              alert_error(data.ErrorMessage);
            }
          }
          catch(e) {
            $('#loading-ajax').hide(); 
            console.log(e);
            alert_error("Galat" + e);
          }
        }

      },error:function(response){

        console.log(response);
      }
    });
  }else if (check_session() === 'false') {
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }
});

// PROSES
$('#btn-proceed-cp,#btn-cancel-cp').on('click',function(){
  if (check_session() === 'true') {
    var id_batch = $('#id-id_batch').val();
    var no_batch = $('#inp-batch-no-cp').val();
    var user = $('#id-createdby-cp').val();
    var button_flag = this.attributes.flag.value;
    var desc = '';
    var arrayData = [];
    if (button_flag == '0') {
      desc = 'proses';
    }else if(button_flag == '1'){
      desc = 'cancel';
    }

    arrayData.push({
      "batch_id": id_batch
    });

    alert_confirm('Batch dengan no '+no_batch+' akan di'+desc+'?',function(){
     ajax_procced(arrayData,user,button_flag);
   });
  }else if (check_session() === 'false') {
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }
});

// UPLOAD
$('#btn-upload-cp').on('click',function(){
  if (check_session() === 'true') {
    if ($('#inp-browse-file-cp').val() == '') {
      alert_warning('Pilih File excel yang akan di upload!!');
      $('#div-excel').addClass('error-cp');
      $('#div-pdf').removeClass('error-cp');
      return false;
    }else if ($('#inp-reference-cp').val() == ''){
      alert_warning('Pilih File Reference (pdf) yang akan di upload!!');
      $('#div-pdf').addClass('error-cp');
      $('#div-excel').removeClass('error-cp');
      return false;
    }else{
     $('#div-excel').removeClass('error-cp');
     $('#div-pdf').removeClass('error-cp');
   }
   $('#id-data-upload-file').submit();
 }else if (check_session() === 'false') {
  alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
    localStorage.clear();
    window.location.href = base_url + "Controller_login/login_view";
  });
}

});


// UPLOAD
$("#id-data-upload-file").on('submit',function(e) {

 var vfiles_pdf = $('#inp-reference-cp')[0].files[0].name;
 var vfiles_excel = $('#inp-browse-file-cp')[0].files[0].name;
 var file_valid_pdf =  vfiles_pdf.substring(vfiles_pdf.lastIndexOf(".")+1,vfiles_pdf.length);
 var file_valid_excel =  vfiles_excel.substring(vfiles_excel.lastIndexOf(".")+1,vfiles_excel.length);
 if (!(file_valid_excel === 'xls' || file_valid_excel === 'xlsx')) {
  alert_warning('Browse File harus xls/xlsx');
  $('#inp-browse-file-cp').prop('style','');
  $('#div-excel').addClass('has-error');
  return false;
}
$('#div-excel').removeClass('has-error');
if (!(file_valid_pdf === 'pdf')) {
  alert_warning('Reference File harus pdf');
  $('#inp-browse-file-cp').prop('style','');
  $('#div-pdf').addClass('has-error');
  return false;
}
$('#div-pdf').removeClass('has-error');
var formData = new FormData(this);

$.ajax({
  url: base_url + "Controller_crash_program/upload_file",
  type: 'POST',
  contentType: 'application/json',
  data: formData,
  success: function(response) {
    console.log(response);
    if (response.includes('Undefined offset') || response.includes('ErrorMessage')) {
      alert_error('Cek file yang anda upload, Pastikan sesuai format');
      $('#div-excel').addClass('has-error');
      return false;
    }
    $('#div-excel').removeClass('has-error');
    try{
      var array =[];
      var data = $.parseJSON(response);
      if (data.Status == '200') {
        alert_info('Data berhasil diupload dengan no Batch : '+data.batch_no);
        $('#inp-search-cp').click();
        $('#id-id_batch').val(data.batch_id);
        $('#inp-batch-no-cp').val(data.batch_no);
        $('#inp-status-cp').val('NEW');
        wait(10000);
        table_checked = 1;
        $('#btn-search-cp').click();
      }else if(data.Status == '500'){
       alert_error(data.message);
       return false;
     }
     $('#btn-proceed-cp').prop('disabled',false);
   }catch (e) {
    $('#loading-ajax').hide();
    console.log(e);
    alert_error("Terjadi Kesalahan => " + e);
  }

},error: function(response) {
  alert_error('Error Connection');
  console.log(response);
},
cache: false,
contentType: false,
processData: false
});

e.preventDefault();
return false;

});

function ajax_procced(arrayData,user,button_flag){
 $.ajax({
  url:base_url+"Controller_crash_program/procces_batch",
  data:{arrayData,user,button_flag},
  type:'POST',
  success:function(response){
    console.log(response);
    var data = $.parseJSON(response);
    data = $.parseJSON(data);
    var arrayData = [];
    var no_batch = $('#inp-batch-no-cp').val();
    if(response) {
      try {
        table_tab_upload_cp.clear().draw();
        if (data.Status == '200') {
          if (button_flag == '0') {
            alert_info('Batch '+no_batch+' Berhasil Diproses');
            $('#btn-print-cp').prop('disabled',false);
            $('#btn-proceed-cp').prop('disabled',true);
            $('#inp-status-cp').val('PROCEED');
            table_checked = 1;
            $('#btn-search-cp').click();
          }else if(button_flag == '1'){
            alert_info('Batch '+no_batch+' Berhasil Dicancel');
            $('#btn-proceed-cp,#btn-print-cp,#btn-cancel-cp').prop('disabled',true);
            $('#inp-status-cp').val('REJECTED');
            table_checked = 1;
            $('#btn-search-cp').click();
          }else if (button_flag == '2') {
            alert_info(' Data Berhasil diReject !',function(){
              flag_reject = 1;
              $('#btn-print-appr-cp,#btn-reject-appr-cp,#btn-approve-appr-cp').prop('disabled',true);
              $('#id-createdby_appr-cp').val('');
              $('#btn-show-data-cp').click();
            });

          }else if(button_flag == '3'){
           alert_info('Berhasil diApprove',function(){
            $('#chk-all-appr-cp').prop('checked',false);
            $('#btn-print-appr-cp,#btn-reject-appr-cp,#btn-approve-appr-cp').prop('disabled',true);
            $('#id-createdby_appr-cp').val('');
            $('#btn-show-data-cp').click();
          });

         }
       }else{
        var response = JSON.parse(response);
        response = JSON.parse(response);
        alert_error(response.ErrorMessage);
        $('#btn-print-cp').prop('disabled',false);
        $('#btn-proceed-cp,#btn-cancel-cp').prop('disabled',true);
        $('#id-createdby-cp,#id-uploadedby-cp').val('');
      }
    }
    catch(e) {
      $('#loading-ajax').hide(); 
      console.log(e);
      alert_error("Galat" + e);
    }
  }

},error:function(response){

  console.log(response);
}
});
}

function getDate(){
  today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; 
  var yyyy = today.getFullYear();
  var m_names = new Array("", "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec");


  if (dd.toString().length == 1) {
   dd = '0'+dd;
 }
 today = dd + '-' + m_names[mm] + '-' + yyyy;

 $('#inp-date-cp').val(today);
}

function ajax_print_draft(contract_id,id_batch){
  $.ajax({
    url:base_url+"Controller_crash_program/get_data_print_draft",
    data:{contract_id,id_batch},
    type:'POST',
    success:function(response){
      console.log(response);
      var data = $.parseJSON(response);
      data = $.parseJSON(data);
      if(response) {
        try {
         $('#data_draft').val(response);
         $('#id-form-print_draft').submit();
       }
       catch(e) {
        $('#loading-ajax').hide(); 
        console.log(e);
        alert_error("Galat" + e);
      }
    }

  },error:function(response){

    console.log(response);
  }
});
}

function ajax_print_memo(contract_id){
  $.ajax({
    url:base_url+"Controller_crash_program/get_data_print_memo",
    data:{contract_id},
    type:'POST',
    success:function(response){
      console.log(response);
      var data = $.parseJSON(response);
      data = $.parseJSON(data);
      if(response) {
        try {
         $('#data_memo').val(response);
         $('#id-form-print_memo').submit();
       }
       catch(e) {
        $('#loading-ajax').hide(); 
        console.log(e);
        alert_error("Galat" + e);
      }
    }

  },error:function(response){

    console.log(response);
  }
});
}

function getRoleCp(){
  $.ajax({
    url : base_url + "Controller_home/get_detail_user",
    cache : false,
    async :false,
    success : function(response){
      try{
        console.log(response);
        var role_data = $.parseJSON(response);
        localStorage.setItem('role_arh', false);  
        localStorage.setItem('role_col', false);
        localStorage.setItem('role_ar_rem', false);
        $.each(role_data, function(i){
          if (role_data[i].role_code  === 'AM_ARH') {
            localStorage.setItem('role_arh', true);
            return false;
          }
        });
        $.each(role_data, function(i){
         if (role_data[i].role_code  === 'AM_COLL_HO') {
          localStorage.setItem('role_col', true);
          return false;
        }
      });
        $.each(role_data, function(i){
         if (role_data[i].role_code  === 'AM_AR_REM') {
          localStorage.setItem('role_ar_rem', true);
          return false;

        }
      });
        if (localStorage.getItem('role_col') == 'true') {
        } 
        else if (localStorage.getItem('role_arh') == 'true') {
          $('#id-create_new_batch').hide();
          $('.file_cp').hide()
        }
        else if (localStorage.getItem('role_ar_rem') == 'true') {
          $('#id-create_new_batch').hide();
          $('.file_cp').hide()
        } 

      }catch(e) {
        $('#loading-ajax').hide(); 
        console.log(e);
        alert_error("Galat" + e);
      }
    },
    error: function(response){
      console.log(response);
    }
  });
}

function ajax_print_batch(id_batch){
  $.ajax({
    url:base_url+"Controller_crash_program/get_data_print_batch",
    data:{id_batch},
    type:'POST',
    success:function(response){
      if(response) {
        try {
         $('#data_batch').val(response);
         $('#id-form-print-cp').submit();
       }
       catch(e) {
        $('#loading-ajax').hide(); 
        console.log(e);
        alert_error("Galat" + e);
      }
    }

  },error:function(response){

    console.log(response);
  }
});
}
