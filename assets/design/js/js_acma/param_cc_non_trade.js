/*  $('#table-data-mj').on('click', '.akun-mj', function() {
  debugger;
  var new_add_cond = table_data_mj.row($(this).closest('tr')).data()[10];*/
  $('#coba1').slideToggle('hide');
  var table_param = $("#tbl-param").DataTable({
    columnDefs: [
    {
      targets: [6,7,8],
      visible: false
    }
    ]

  });
  var table_param1 = $("#tbl-param1").DataTable({

  });
  $('#btn-add-tbl-rv').click(function(){
    $('#coba1').slideToggle('show');
    var a = table_param.data();
    console.log(a);
  });
  $('#btn-show-param-cc').click(function(){
    debugger;
    var ho_branch = $('#inp-ho-branch-fil').val();
    var type = $('#inp-type-fil').val();
    var status = $('#inp-status-fil').val();


    if (ho_branch === '' || ho_branch === null) {
      alert_info("Silahkan pilih HO/Branch");
      $('#div-ho-branch-fil').addClass('has-error');
    }

    else if (type === '' || type === null) {
      alert_info("Silahkan Isi Account Code");
      $('#div-type-fil').addClass('has-error');
    }
    else if (status === '' || status === null) {
      alert_info("Silahkan Isi Status");
      $('#div-status-fil').addClass('has-error');
    }

    else 
    {

      $.ajax({
        url: base_url + "Controller_param_cc_non_trade/getDataParam",
        type: 'POST',
        dataType: 'JSON',
        data:{                       
          "ho_branch"  : ho_branch,
          "type"      : type,
          "status"    : status},
          success: function(response){
            table_param.clear().draw();
            var result = $.parseJSON(response);
            console.log(result);
            debugger;
            if(response) {
              try {

                for (var i = result['Data'].length - 1; i >= 0; i--) {
                  result['Data'][i].accountVoucherType;
                  result['Data'][i].status;
                  var y =result['Data'][i].accountVoucherType;
                  var x = result['Data'][i].status;


                  if (x==0)
                  {
                    x ="Active";
                  }
                  else
                  {
                    x ="Non-Active";
                  }

                  if (y=="RN")
                  {
                    y ="RV";
                  }
                  else
                  {
                    y ="PV";
                  }
                  table_param.row.add([
                    result['Data'][i].domainValue,
                    result['Data'][i].domainDesk,
                    y,
                    x,
                    result['Data'][i].accountCode,
                    '<input type="button" style="" class="btn btn-inline btn-primary btn-update"  id="btn-save-param-non'+i+'" value="Update">',
                    result['Data'][i].accountLocCode,
                    result['Data'][i].accountDCCode,
                    result['Data'][i].status
                    ]).draw(false);


                  table.push({
                    listaccount : result['Data'][i].domainValue

                  });  

                }


              }catch(e) {
                $('#loading-ajax').hide(); 
                console.log(e);
                alert_error("Terjadi Kesalahan => " + e);
              }
            }else{
              alert_error("Error Cek Koneksi");
            }
          }
          // response = $.parseJSON(response);
      /*    console.log(response);
          debugger;
          if (response) {
            try{
              debugger;
              alert_info('Anda Sudah Memasukkan Data');
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
        }*/
      });
    }
  });
/*
var arrayDataParam = [];
arrayDataParam.push({   
            domainName : '',
            domainValue : '',
            domainDesk : ''
          });
getDataParam(arrayDataParam);

function getDataParam(arrayData){
  debugger;
    $.ajax({
      url: base_url + "Controller_param_cc_non_trade/getDataParam",
      cache: false,
      type: 'post',
      data : {arrayData},
      dataType: 'json',
      success: function(response){
        table_param.clear().draw();
        var result = $.parseJSON(response);
    
        console.log(result);
        if(response) {
          try {
                
              for (var i = result['Data'].length - 1; i >= 0; i--) {
                result['Data'][i].status;
                var x = result['Data'][i].accountAddStatus;
                if (x==0)
                {
                  x ="Active";
                }
                else
                {
                  x ="Non-Active";
                }
                table_param.row.add([
                  result['Data'][i].domainValue,
                  result['Data'][i].domainDesk,
                  x,
                  '<input type="button" style="" class="btn btn-inline btn-primary btn-update"  id="btn-save-param-non'+i+'" value="Update">',
                  result['Data'][i].accountLocCode,
                  result['Data'][i].accountDCCode,
                  result['Data'][i].accountVoucherType,
                  result['Data'][i].accountCode,
                  result['Data'][i].accountAddStatus
                  ]).draw(false);
              
                  }
          }catch(e) {
            $('#loading-ajax').hide(); 
            console.log(e);
            alert_error("Terjadi Kesalahan => " + e);
          }
        }else{
          alert_error("Error Cek Koneksi");
        }

      },
      error:function(response){
        console.log(response);
        alert_error(response);
        if (response['responseText'] === "" && response['statusText'] === 'OK') {
          alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
          });
        }
      }
    });

  }*/
/*var str = 'It iS a Great Day.';
var string = str.toUpperCase();
print(string);*/
$('#btn-add-param').click(function(){
  debugger;
  var str_class_code = $('#inp-param1-cc').val().trim();
  var class_code = str_class_code.toUpperCase();
  var str_account_code = $('#inp-param1-ac').val();
  var account_code = str_account_code.toUpperCase();
  var str_description = $('#inp-param1-des').val();
  var description = str_description.toUpperCase();
  var str_ho_branch = $('#inp-param1-ho-br').val();
  var ho_branch= str_ho_branch.toUpperCase();
  var str_debit_kredit = $('input[name=radioparamdeb]:checked').val();
  var debit_kredit= str_debit_kredit.toUpperCase();
  var str_type = $('input[name=radioparamtype]:checked').val();
  var type= str_type.toUpperCase();
  var str_status = $('input[name=radioparamsta]:checked').val();
  var status= str_status.toUpperCase();



/*var class_code = $('#inp-param1-cc').val();
var account_code = $('#inp-param1-ac').val();
var description = $('#inp-param1-des').val();
var ho_branch = $('#inp-param1-ho-br').val();
var debit_kredit = $('input[name=radioparamdeb]:checked').val();
var type = $('input[name=radioparamtype]:checked').val();
var status = $('input[name=radioparamsta]:checked').val();*/
if (class_code === '' || class_code === null) {
  alert_info("Silahkan Isi Class Code");
  $('#div-param1-cc').addClass('has-error');
}

else if (account_code === '' || account_code === null) {
  alert_info("Silahkan Isi Account Code");
  $('#div-param1-ac').addClass('has-error');
}
else if (description === '' || description === null) {
  alert_info("Silahkan Isi Description");
  $('#div-param1-des').addClass('has-error');
}
else if (ho_branch === '' || ho_branch === null) {
  alert_info("Silahkan pilih HO/Branch");
  $('#div-param1-ho-br').addClass('has-error');
}

else 
{

  $.ajax({
    url: base_url + "Controller_param_cc_non_trade/insertDataParam",
    type: 'POST',
    dataType: 'JSON',
    data:{
      "class_code" : class_code,
      "account_code" : account_code,
      "description" : description,
      "ho_branch"  :ho_branch,
      "debit_kredit": debit_kredit,
      "type"  : type,
      "status" : status
    },
    success: function(response){
          // response = $.parseJSON(response);
          console.log(response);
          debugger;
          if (response) {
            try{
              debugger;
              if(response['status']=='200')
                {alert_info("Terimakasih, Anda Sudah Memasukkan Data", function(){
                 location.reload();

               });
            }
            else
            {
             alert_error(response['message'])
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
});




var button_update = 0;

$('#tbl-param').on('click','.btn-update',function(){
	debugger;
  var list_data = table_param.row($(this).closest('tr')).data();

  var class_code = list_data[0];
  var description = list_data[1];
  var acct_code = list_data[4];
  var ho_branch = list_data[6];
  var d_c_type = list_data[7];
  var acct_voc_type = list_data[2];
  var acct_status = list_data[8];
  $('#inp-param1-cc-mod').val(class_code);
  $('#inp-param1-ac-mod').val(acct_code);
  $('#inp-param1-des-mod').val(description);
  $("#inp-param1-ho-br-mod option[value='"+ho_branch+"']").attr('selected', 'selected');
  debugger;
  if(d_c_type=='D'){
    $('input:radio[name=radioparamdeb-mod]').val(['D']);
  }
  else 
  {
    $('input:radio[name=radioparamdeb-mod]').val(['C']);

  }
  if(acct_voc_type=='PV'){
    $('input:radio[name=radioparamtype-mod]').val(['PN']);
  }
  else 
  {
    $('input:radio[name=radioparamtype-mod]').val(['RN']);

  }
  if(acct_status=='0'){
    $('input:radio[name=radioparamsta-mod]').val(['0']);
  }
  else 
  {
    $('input:radio[name=radioparamsta-mod]').val(['1']);

  }

  debugger;
  $('#param-non-cc').modal('show');
  /*-------------------------------------------------- DATATABLE ------------------------------------------------------------*/
  $('#button-account-code-mod').click(function(){
    debugger;

    button_update = 1;
    $('#modal-account-code-list').modal('show');
  });

});

$('#btn-add-param-mod').click(function(){

  debugger;
  var class_code = $('#inp-param1-cc-mod').val().trim();
  var account_code = $('#inp-param1-ac-mod').val();
  var str_description = $('#inp-param1-des-mod').val();
  var description = str_description.toUpperCase();
  var ho_branch = $('#inp-param1-ho-br-mod').val();
  var debit_kredit = $('input[name=radioparamdeb-mod]:checked').val();
  var type = $('input[name=radioparamtype-mod]:checked').val();
  var status = $('input[name=radioparamsta-mod]:checked').val();
  if (class_code === '' || class_code === null) {
    alert_info("Silahkan Isi Class Code");
    $('#div-param1-cc-mod').addClass('has-error');
  }

  else if (account_code === '' || account_code === null) {
    alert_info("Silahkan Isi Account Code");
    $('#div-param1-ac-mod').addClass('has-error');
  }
  else if (description === '' || description === null) {
    alert_info("Silahkan Isi Description");
    $('#div-param1-des-mod').addClass('has-error');
  }
  else if (ho_branch === '' || ho_branch === null) {
    alert_info("Silahkan pilih HO/Branch");
    $('#div-param1-ho-br-mod').addClass('has-error');
  }

  else 
  {

    $.ajax({

      url: base_url + "Controller_param_cc_non_trade/updateDataParam",
      type: 'POST',
      dataType: 'JSON',
      data:{
        "class_code" : class_code,
        "account_code" : account_code,
        "description" : description,
        "ho_branch"  :ho_branch,
        "debit_kredit": debit_kredit,
        "type"  : type,
        "status" : status
      },
      success: function(response){  
        debugger;
          // response = $.parseJSON(response);
          console.log(response);
          if (response) {
            try{
              alert_info("Terimakasih, Anda Sudah Mengubah Data", function(){
               location.reload();
             });
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
});

$('#button-account-code').click(function(){
  getDataAccount();
  debugger;

  
});
var table_account= $("#tbl-account").DataTable({

});
// var arrayDataAccount = [];
// arrayDataAccount.push({   
//             accountCode : '',
//             domainDesk : ''
//           });

var table = [];
function getDataAccount(){
  debugger;
  $.ajax({
    url: base_url + "Controller_param_cc_non_trade/getDataAccount",
    cache: false,
    type: 'get',

    dataType: 'json',
    success: function(response){
      table_account.clear().draw();
        // var result = $.parseJSON(response);

        console.log(response);
        debugger;
        if(response) {
          try {

            for (var i = response["listAccount"].length - 1; i >= 0; i--) {

              table_account.row.add([

                response["listAccount"][i].accountCode,
                response["listAccount"][i].domainDesk
                ]).draw(false);



            }
            $('#modal-account-code-list').modal('show');
          }catch(e) {
            $('#loading-ajax').hide(); 
            console.log(e);
            alert_error("Terjadi Kesalahan => " + e);
          }
        }else{
          alert_error("Error Cek Koneksi");
        }

      },
      error:function(response){
        console.log(response);
        alert_error(response);
        if (response['responseText'] === "" && response['statusText'] === 'OK') {
          alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
          });
        }
      }
    });

}

var arr_tbl = [];
$('#tbl-account tbody').on('mouseover', 'tr', function() {
 if ($(this).hasClass('selected')) {
  $(this).removeClass('selected');
}else{
  table_account.$('tr.selected').removeClass('selected');
  $(this).addClass('selected');
  arr_tbl = table_account.row(this).data();
}
});

$('#tbl-account tbody').on('click', 'tr', function() {
  if (button_update === 0) {
    $('#inp-param1-ac').val(arr_tbl[0]);
  }else{

    $('#inp-param1-ac-mod').val(arr_tbl[0]);
    button_update = 0;
  }
  $('#modal-account-code-list').modal('hide');
});

$('#btn-print-param-cc').click(function(){
	debugger;
  var ho_branch = $('#inp-ho-branch-fil').val();
  var type = $('#inp-type-fil').val();
  var status = $('#inp-status-fil').val();
  get_xls(ho_branch,type,status);
});
function get_xls(ho_branch,type,status){
 $.ajax({
  url: base_url + 'Controller_param_cc_non_trade/get_xls_param',
  type: 'POST',
  dataType: 'json',
  data:
  { "ho_branch"  : ho_branch,
  "type"      : type,
  "status"    : status
},
success:function(response){
  console.log(response);
  if (response) {
    try{
      if (response.result) {
        download(response.result,'class_code_list.xls',"application/vnd.ms-excel");
      }else{
        alert_info('Data Tidak Ditemukan !');
      }
    }catch(e){
      $('#loading-ajax').hide();
      console.log(e);
      alert_error("Terjadi Kesalahan => " + e);
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
  }else if (response['statusText'] === 'Internal Server Error') {
    alert_error('Gagal Terhubung ke Server: ' + response['responseText']);
  }else if (response['responseText'] !== null || response['responseText'] !== "") {
    alert_error(response['responseText']);
  }
}
});}

 $('.inp-space').on('keydown', function(e){
  var keyCode = (e.keyCode ? e.keyCode : e.which);
  if (keyCode == 32) { 
    e.preventDefault();
  }
});
