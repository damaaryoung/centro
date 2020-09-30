
var table_list = $('#idList').DataTable({ 
  "searching": false, 
  "paging":   false,
  "ordering": false,
  
  "columnDefs": [
  {
    "targets": [1],
    "visible": false,
    "responsive": true, 
    
  },
  
  ]

});
var role_chpay;
var flag_role_chpay = true;
// var table_data_kontrak = $("<table />").attr({id:'tbl-kontrak'});

// $(document).ready(function(){
//   $('#btn-search-adbt').css('backgroundColor','#5cb85c');  
//   $('#btn-search-adbt').css('borderColor','#5cb85c');  
// })



function get_contract_adbt(){
  var slc_branch = $('#slc-branch-adbt').val();
  var branch_code = $('#id-branch-adbt').val();
  var no_kontrak = $('#contract-no').val();
  
  if(slc_branch === ''){
    alert_info("Silahkan Pilih Cabang Terlebih Dahulu");
    $('#id-form-aplikasi-adbt').addClass('has-error');
  }else if(no_kontrak === ''){
    alert_info('Isi Nomor Kontrak Terlebih Dahulu !');
    $('#div-cont-no').addClass('has-error');
  }else{

   var arrayData  = [];
   
   arrayData.push({   
    contract_no : no_kontrak,
    appl_br_id : slc_branch
  });
   get_contract_no(arrayData);
   
 }
}

$('#contract-no').keyup(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if (code == 13 ) {
   $('#div-acc-no').removeClass('has-error');
   get_contract_adbt();
 }
});

$('#btn-search-adbt').on("click", function () {
  $('#div-acc-no').removeClass('has-error');
  if(check_session()=== 'false'){
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }else{
  get_contract_adbt();
}
  
});

function val_removed_disabled(){
  $('#slc-pay-type-adbt').removeProp('disabled');
  $('#slc-bank-adbt').removeProp('disabled');
  $('#acc-no').removeProp('disabled');
  $('#acc-name').removeProp('disabled');
  
  
}

function val_disabled(){
 
 $('#slc-bank-adbt').prop('disabled',true);
 $('#acc-no').prop('disabled',true);
 $('#acc-name').prop('disabled',true);
 $('#cust-name-adbt').prop('disabled',true);
 
}


function document_autodebet(){
 
  var slc_type = $('#slc-pay-type-adbt').val();
  table_list.clear().draw();
  if( slc_type === ''){
    
  }else{
    $('#div-effective').removeProp('hidden');
    val_removed_disabled();
    if(slc_type === '04'){

      val_removed_disabled();
      list_document();
    }else{
      val_disabled();
    }
  }
}

$('#slc-pay-type-adbt').change(function(){
  $('#div-acc-no').removeClass('has-error');
   if(check_session()=== 'false'){
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }else{
  var slc_pay = $('#slc-pay-type-adbt').val();
      // var map[] = new Object();

      
      if(slc_pay === '04'){
       list = [];
       list.push({
        "nama_bank" : $('#slc-bank-adbt').val(),
        "no_rek" : $('#acc-no').val(),
        "nama_rek" : $('#acc-name').val(),
        "nama_cust" : $('#cust-name-adbt').val()
      })

        // map['04'] = list;
        // localStorage.setItem('nama_bank', $('#slc-bank-adbt').val());
        // localStorage.setItem('no_rek', $('#acc-no').val());
        // localStorage.setItem('nama_rek', $('#acc-name').val());
        val_removed_disabled();
        list_document_mdm();
       // $('#slc-bank-adbt').val(listA[0].nama_bankA);
       //  $('#acc-no').val(listA[0].no_rekA);
       //  $('#acc-name').val(listA[0].nama_rekA);

       
     }else{
        //  listA = [];
        //   listA.push({
        //   "nama_bankA" : $('#slc-bank-adbt').val(),
        //   "no_rekA" : $('#acc-no').val(),
        //   "nama_rekA" : $('#acc-name').val()
        // })
        val_disabled();
        
        $('#slc-bank-adbt').val(list[0].nama_bank);
        $('#acc-no').val(list[0].no_rek);
        $('#acc-name').val(list[0].nama_rek);
        $('#cust-name-adbt').val(list[0].nama_cust);
        
         // $('#slc-bank-adbt').val(localStorage.getItem('nama_bank'));
         // $('#acc-no').val(localStorage.getItem('no_rek'));
         // $('#acc-name').val(localStorage.getItem('nama_rek'));
         $('#error').hide();
         table_list.clear().draw();

       }
     }
     });

// $('#slc-branch-adbt').change(function(){
  
// $('#id-branch-adbt').val($(this).find(":selected").val());

// });


$('#tgl-effective').datetimepicker({
  format: 'DD-MMM-YYYY',
  allowInputToggle: true
});

if ($('#id-form-aplikasi-adbt').length) {
  var branch_code = $('#hdn-branch-code').val();
  var branch_name = $('#hdn-branch-name').val();

  console.log(branch_code);

  if (branch_code !== '0000') {
    console.log('masuk');
    $('#slc-branch-adbt').prop('disabled', true);
    $('<option/>').val(branch_code).html(branch_code+' - '+branch_name).appendTo('#slc-branch-adbt');
  }
  else{
    get_data_branch('#slc-branch-adbt');

  }
}

if ($('#id-detail-type-adbt').length) {

  var pay_type_id = $('#hdn-type-id').val();
  var pay_type_desc = $('#hdn-type-desc').val();
  
  console.log(pay_type_id);

  if (pay_type_id !== '') {
    console.log('masuk');
    
    $('<option/>').val(pay_type_id).html(pay_type_desc).appendTo('#slc-pay-type-adbt');
  }
  else{
    payment_type('#slc-pay-type-adbt');

    //--------------------------------------------- GET ROLE CODE -------------------------------------------//
if (!localStorage.getItem('role_user_chpay')) {
    $.ajax({
        url : "Controller_home/get_detail_user",
        cache : false,
        async : false,
        success : function(response){
            if(response){
                try{
                    console.log(response);
                    localStorage.setItem('role_user_chpay', response);
                    role_chpay = $.parseJSON(localStorage.getItem('role_user_chpay'));
                    console.log(role_chpay);
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
    role_chpay = $.parseJSON(localStorage.getItem('role_user_chpay'));
    console.log(role_chpay);
    console.log('aji else');
}

$.each(role_chpay, function(i){
  console.log(role_chpay[i]['role_code']);
  if(role_chpay[i]['role_code'] === 'VIEW_CHPAY_ADBT'){
      $('#btn-update-adbt').prop('disabled', true);
      flag_role_chpay = false;
  }else if(flag_role_chpay){
      $('#btn-update-adbt').prop('disabled', false);
}
});

  }
}

$('#btn-update-adbt').click(function(){
  if(check_session()=== 'false'){
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }else{
      if($('#hdn-branch-code').val() === "0000"){
        alert_error("User HO Tidak Dapat Melakukan Perubahan Pembayaran");
      }else{
  var tbl_list = table_list.rows().data();
  var pay_type =  $('#slc-pay-type-adbt').val();
  var bank_type =  $('#slc-bank-adbt').val();
  var acc_no =  $('#acc-no').val();
  var a = $('#acc-name').val();
  var acc_name = a.toUpperCase();
  var cont_id = $('#contract-id').val();
  $('#div-acc-no').removeClass('has-error');
  $('#div-name-rek-adbt').removeClass('has-error');
  $('#div-list-bank-adbt').removeClass('has-error');

  if(cont_id === ''){
   alert_info('Isi data terlebih dahulu!');
 }else{ 
  if(pay_type === ''){
    alert_info('Pilih tipe pembayaran!');
  } 
  
  else if (pay_type === '04'){
    if(bank_type === ''){
      alert_info('Nama Bank Harus Di Isi!');
      $('#div-list-bank-adbt').addClass('has-error');
    }else{
     if(acc_name === ''){
       alert_info('Nama Rekening Harus Di Isi!');
       $('#div-name-rek-adbt').addClass('has-error');
    } else{
       if(acc_no === ''){
      alert_info('Nomor Rekening Harus Di Isi!');
      $('#div-acc-no').addClass('has-error');
     }else{
      var lacc_no = acc_no.substr(0,1);
      var sacc_no = acc_no.substr(4,1);
      if((acc_no.length != '13' || acc_no == '0000000000000' || (lacc_no != '1' && lacc_no != '0' && lacc_no != '9')) || (sacc_no == '1' || sacc_no == '2' || sacc_no == '6') ){
        alert_info('Nomor rekening tidak memenuhi kriteria!');
        $('#div-acc-no').addClass('has-error');
      }
      else{
        var flag = true;
        for (var i = 0 ; i < table_list.rows().data().length ; i++) {
          if($('#list-doc'+i).val() === ''){
            flag =false;
            break;
          }
        }
        if(flag){
          alert_confirm('Apakah anda yakin ?', function(){
            
            update_data_adbt();

            
          });

        }else{
          alert_info('Tanggal Terima Harus Di Isi!');
          $('.div-list-dcmnt').addClass('has-error');
          
        }
        
      }
    }
  }

}

}else{
 alert_info('Perubahan tipe pembayaran hanya Autodebet');
}


}
}
}
});


// $('#btn-update-adbt').click(function(){
  function update_data_adbt(){  
    
   var no_kontrak = $('#contract-no').val();
   var branch_code = $('#slc-branch-adbt').val();
   var contract_id = $('#contract-id').val();
   var tgl_effective = $('#tgl-effective').val();
   var a = $('#acc-name').val();
   var acc_name = a.toUpperCase();
   var acc_no = $('#acc-no').val();
   var slc_bank = $('#slc-bank-adbt').val();
   var slc_pay_type = $('#slc-pay-type-adbt').val();
   var cust_type = $('#customer-type').val();
   var obj_code = $('#obj-code').val();  
   var app_date = $('#app-date').val();
   
   // app_date = new Date(app_date).format("yyyy/mm/dd");

   var arrayData  = [];
   var dataInsert=[];
   for (var i = 0; i < table_list.rows().data().length; i++) {
     var receive_date = $('#list-doc'+i).val();
     receive_date = new Date(receive_date).format("yyyy-mm-dd");
     dataInsert.push({

       doc_proc_list_id :  table_list.rows().data()[i][1],
       doc_code :  table_list.rows().data()[i][0],
       receive_date : receive_date

     });   
     
   }    
   
   arrayData.push({   
    contract_id : contract_id,
    appl_br_id : branch_code,
    appl_payment_type : slc_pay_type,
    autodebit_bank_id : slc_bank,
    appl_autodebit_acc_no : acc_no,
    appl_autodebit_acc_name : acc_name,
    effective_date : tgl_effective,
    cust_type : cust_type,
    obj_code : obj_code
    
  });
   update_adbt(arrayData,dataInsert);
   
 }


 if ($('#id-detail-bank-adbt').length) {

  var bank_code = $('#hdn-bank-id').val();
  var bank_name = $('#hdn-bank-name').val();
  
  console.log(bank_code);

  if (bank_code !== '') {
    console.log('masuk');
    $('#slc-bank-adbt').prop('disabled', true);
    $('<option/>').val(bank_code).html(bank_name).appendTo('#slc-bank-adbt');
  }
  else{
    list_bank('#slc-bank-adbt');

  }
}

function update_adbt(arrayData,dataInsert){

  $.ajax({
    'url' :'Controller_autodebet/update_kontrak',
    'type' :'POST',
    'data' :{arrayData,dataInsert},

    success : function(response){

     try{
      console.log(response);
      var data =JSON.stringify(response);
      var v = $.parseJSON(response);
      if(v['Status'] == "200"){
        alert_info(v['Message'], function(){
          history.go(0);  
        });
        
      }else if(v['Status'] == "500"){
        alert_info(v["ErrorMessage"]);
      }else{
        alert_error(v['errorConsole']);
      };
    }catch(e){
     $('#loading-ajax').hide();
     console.log(e);
     alert_error("Terjadi Kesalahan => "+e);
   }
   
 },error:function(response){
  alert_error('Error Connection');
  
}

});

}

function get_contract_no(arrayData){
  // var branch_id =  $('#Id').val();
// var branch_code = $('#hdn-branch-code').val();
 // console.log(branch_id_cp);
 // console.log(appl_no_cp);
 //console.log(reason);
 var slc_branch = $('#slc-branch-adbt').val();
 var no_kontrak = $('#contract-no').val();
 if (branch_code !== null) {
   $.ajax({
     'url' : 'Controller_autodebet/get_data_kontrak',
     'type' : 'POST',
     'data' : {arrayData},
     
     success:function(response){

      $('#id-form-aplikasi-adbt').removeClass('has-error');
      $('#div-cont-no').removeClass('has-error');
      
      console.log(response);
      
      if (response ){
       try{
         var result = JSON.parse(response);

         console.log(result);

         if (result['Data'].length < 1) {
           alert_error("Nomor Kontrak Tidak Ditemukan");
           table_list.clear().draw();
           $('#slc-bank-adbt,#acc-no,#acc-name,#contract-id,#slc-pay-type-adbt,#cust-name-adbt,#tgl-effective').val('');
           $('#slc-pay-type-adbt,#slc-bank-adbt,#acc-no,#acc-name,#cust-name-adbt').prop('disabled',true);
           
         }else{
          //$('#btn-update-adbt').prop('disabled',false);
          table_list.clear().draw();
             // table_data_kontrak.clear().draw();
             $.each(result['Data'], function(index){
               // table_data_kontrak.row.add([
                 // this['appl_contract_no'],
                 $('#slc-pay-type-adbt').val(this['appl_payment_type']);
                 $('#cust-name-adbt').val(this['cust_last_name']);
                 $('#slc-bank-adbt').val(this['autodebit_bank_id']);
                 $('#acc-no').val(this['appl_autodebit_acc_no']);
                 $('#acc-name').val(this['appl_autodebit_acc_name']);
                 $('#contract-id').val(this['contract_id']);
                 $('#customer-type').val(this['cust_type']);
                 $('#app-date').val(this['application_date']);
                 $('#obj-code').val(this['object_code']);
                 
                 $('#tgl-effective').val(this['effective_date']);
                 
               // ]).draw(false);
               //console.log(response);
             });
             
             document_autodebet();
           }  
           
           
         }catch(e){
           $('#loading-ajax').hide();
           console.log(e);
           alert_error("Terjadi Kesalahan => "+e);
         }
       }else{
        alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");
       }
       
     },
     error:function(response){
       console.log(response);
     }
   })
 }else{
   alert_info('Error Get Reason, Silahkan Coba Lagi !');
 }
}

$("#btn-clear-adbt").click(function(){
  
  history.go(0);
  
});

// function val_branch(){
//   $("#contract-no").val('');
//   $("#cust-name").val('');
//   $("#slc-pay-type").val('');
//   $("#slc-bank").val('');
//    $("#acc-no").val('');
//    $("#tgl-effective").val('');
//    table_list.clear().draw();
// }

// $('#tbl-kontrak tbody').on('dblclick', 'tr', function() {
//  if ($(this).hasClass('selected')) {
//    $(this).removeClass('selected');
//  } else {
//    table_data_kontrak.$('tr.selected').removeClass('selected');
//    $(this).addClass('selected');
//    arr_tbl = table_data_kontrak.row(this).data();
//  }
// $('#modal-kontrak').modal('hide');
// debugger;
//  $('.a1').removeAttr('disabled');
//  $("#btn-effective").removeAttr('hidden');


//   if($("#contract-no").val() !== null){
//     $("#btn-kontrak").attr('disabled',true);

//   }else{
//       $("#btn-kontrak").removeAttr('disabled');
//   }

// });

// $('#tbl-kontrak tbody').on('dblclick', 'tr', function() {
//   $('#contract-no').val(arr_tbl[0]);
//    $('#cust-name').val(arr_tbl[2]);
//    $('#acc-no').val(arr_tbl[4]);
//    $('#slc-bank').val(arr_tbl[3]);
//     $('#tgl-effective').val(arr_tbl[7]);
//     $('#slc-pay-type').val(arr_tbl[6]);
//         var slc_type = $('#slc-pay-type').val();
//       if(slc_type === '04'){
//           $('#slc-pay-type').attr('disabled',true);
//             $('.a2').removeAttr('disabled');
//             list_document();
//     }else{

//        $('.a2').attr('disabled',true);

//     }
// });



function list_document_mdm(){
 var contract = $('#contract-no').val(); 
 var obj_code =  $('#obj-code').val();
 var app_date =  $('#app-date').val();
 var cust_type =  $('#customer-type').val();

 if (cust_type == "PER"){
  cust_type = parseInt("5", cust_type);
}else{
  cust_type = parseInt("6", cust_type);
}


if(contract !== null){
  $.ajax({
    'url' :'Controller_autodebet/post_list_document_mdm',
    'type' :'POST',
    'data' :{
      
     
      'obj_code' : obj_code,
      'cust_type' : cust_type,
      'app_date' : app_date
    },
    success : function(response){
      
      
       //console.log(response);
       if (response ){
         try{
           response = $.parseJSON(response);
           console.log(response);
           if (response['data'] == null) {
             alert_error('Koneksi Terputus !');
           }else{
             table_list.clear().draw();
             for (var i = 0 ; i < response['data'].length; i++) {

              table_list.row.add([
                response['data'][i].doc_code,
                response['data'][i].doc_prog_list_id,
                response['data'][i].doc_name,

                '<div class="input-group div-list-dcmnt no-padding">'
                + '<input class="form-control list-dcmnt" id="list-doc'+i+'" value=""></input>'
                + '<label class="input-group-addon btn" for="date">'
                +'<span class="fa fa-calendar open-datetimepicker"></span>'
                + '</label></div>'
                
                ]).draw(false);

              

              $('#list-doc'+i).on("keypress keyup", false); 

              $('#list-doc'+i).keydown(function(e) {
                var code = (e.keyCode ? e.keyCode : e.which);
                if (code != 8 ) {
                 return false;
               }
             });

              $('#list-doc'+i).datetimepicker({
               format: 'DD-MMM-YYYY',
               maxDate : 'now',
             });
              
            } 

          }
        }catch(e){
         $('#loading-ajax').hide();
         console.log(e);
         alert_error("Terjadi Kesalahan => "+e);
         val_disabled();
       }
     }else{
      alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");
      val_disabled();
     }
     
   },
   error:function(response){
     console.log(response);
     alert_error("Koneksi Terputus, Tidak Terhubung Dengan Server");
     val_disabled();
   }
   

 });
}

}

function list_document(){
  var contract_id = $('#contract-id').val();
  var contract = $('#contract-no').val(); 
  var obj_code =  $('#obj-code').val();
  var cust_type =  $('#customer-type').val();
  var app_date =  $('#app-date').val();

  if(contract !== null){
    $.ajax({
      'url' :'Controller_autodebet/post_list_document',
      'type' :'POST',
      'data' :{
        
       'contract_id' : contract_id,
       'obj_code' : obj_code,
       'cust_type' : cust_type,
       'app_date' : app_date
     },
     success : function(response){
      
       $('#slc-pay-type-adbt').prop('disabled',true);
       //$('#btn-update-adbt').prop('disabled',true);
       //console.log(response);
       if (response ){
         try{
           response = $.parseJSON(response);
           console.log(response);
           if (response['data'] == null) {
             alert_error('Koneksi Terputus !');
             $('#slc-pay-type-adbt').val('');
             $('#cust-name-adbt').val('');
             $('#contract-no').val('');
             $('#slc-bank-adbt').val('');
             $('#acc-no').val('');
             $('#acc-name').val('');
             $('#contract-id').val('');
             $('#customer-type').val('');
             $('#app-date').val('');
             $('#obj-code').val('');              
             $('#tgl-effective').val('');
             $('#div-effective').prop('hidden',true);
             $('#slc-bank-adbt').prop('disabled',true);
             $('#acc-no').prop('disabled',true);
             $('#acc-name').prop('disabled',true);
           }else{
             table_list.clear().draw();
             for (var i = 0 ; i < response['data'].listDocument.length; i++) {
                        //  var date = response['data'].listDocument[i].receive;
                        // date = new Date(date).format("dd-mmm-yyyy");
                        table_list.row.add([
                          response['data'].listDocument[i].doc_code,
                          response['data'].listDocument[i].doc_proc_list,
                          response['data'].listDocument[i].doc_name,

                          '<div class="input-group div-list-dcmnt">'
                          + '<input class="form-control list-dcmnt" id="list-doc'+i+'" value="'+response['data'].listDocument[i].receive+'"></input>'
                          + '<label class="input-group-addon btn" for="date">'
                          +'<span class="fa fa-calendar open-datetimepicker"></span>'
                          + '</label></div>'

                          ]).draw(false);

                        $('#list-doc'+i).on("keypress keyup", false); 

                        $('#list-doc'+i).keydown(function(e) {
                          var code = (e.keyCode ? e.keyCode : e.which);
                          if (code != 8 ) {
                            return false;
                          }
                        });

                        $('#list-doc'+i).datetimepicker({
                         format: 'DD-MMM-YYYY',
                         maxDate : 'now',
                         
                       }); 
                      }

                      
                    }
                  }catch(e){
                   $('#loading-ajax').hide();
                   console.log(e);
                   alert_error("Terjadi Kesalahan => "+e);
                 }
               }
               
             },
             error:function(response){
               console.log(response);
             }
           });
  }

}



// $(document).ready(function () {
  
//   var keyDown = false, ctrl = 17, vKey = 86, Vkey = 118; 
  
//   $(document).keydown(function (e) {
//     if (e.keyCode == ctrl) keyDown = true;
//   }).keyup(function (e) {
//     if (e.keyCode == ctrl) keyDown = false;
//   });
  
//   $('#acc-no').on('keypress', function (e) {
   
//     if (!e) var e = window.event;
//     if (e.keyCode > 0 && e.which == 0) return true;
//     if (e.keyCode)    code = e.keyCode;
//     else if (e.which) code = e.which;
//     var character = String.fromCharCode(code);
//     if (character == '\b' || character == ' ' || character == '\t') return true;
//     if (keyDown && (code == vKey || code == Vkey)) return (character);
//     else return (/[0-9]$/.test(character));
//   }).on('focusout', function (e) {
//     var $this = $(this);
//     $this.val($this.val().replace(/[^0-9]/g, ''));
//   }).on('paste', function (e) {
//     var $this = $(this);
//     setTimeout(function () {
//       $this.val($this.val().replace(/[^0-9]/g, ''));
//     }, 5);
//   });
// });




function payment_type(slc_id){
  var data = '';
  $.ajax({
    url : base_url+"Controller_autodebet/getPaymentType",
    type : 'POST',
      //dataType : 'json',
      data: {
       "paym_type_id": data
     },
     success : function(response){
       
      try{
        var data = JSON.parse(response);
        console.log(response);
        if(JSON.stringify(response).includes('Timeout')){
         alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
       } else if(response){
        
         console.log(response);
         $('<option/>').val('').html('- PILIH TYPE -').appendTo(slc_id).addClass('form-control');
         $('<option disabled/>').val('').html('-----------------').appendTo(slc_id).addClass('form-control');
         
         for (var i = 0; i < data['data'].length; i++) {
           $(slc_id).append('<option value="'+ data['data'][i].pay_methode_code +'">'+data['data'][i].pay_methode_desc+'</option>');

         }
       }//if response
     }   catch(e) {
      $('#loading-ajax').hide();
      console.log(e);
      alert_error("Terjadi Kesalahan => "+e);
    }

  }
});
}

function list_bank(slc_id){
  var data = '';
  $.ajax({
    url : base_url+"Controller_autodebet/getListBank",
    type : 'POST',
      // dataType : 'json',
      data: {
        "bank_id": data
      },
      success : function(response){
        
       try{
        var data = JSON.parse(response);
        console.log(response);
        if(JSON.stringify(response).includes('Timeout')){
         alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
       } else if(response){
        
         console.log(response);
         $('<option/>').val('').html('- PILIH BANK -').appendTo(slc_id).addClass('form-control');
         //$('<option/>').val('').html('-----------------').appendTo(slc_id).addClass('form-control');
         
         for (var i = 0; i < data['data'].length; i++) {
           $(slc_id).append('<option value="'+ data['data'][i].bankCode +'">'+data['data'][i].bankName+'</option>');

         }
         
         
       }//if response
     } catch(e) {
       $('#loading-ajax').hide();
       console.log(e);
       alert_error("Terjadi Kesalahan => "+e);
     }

   }
 });
}










