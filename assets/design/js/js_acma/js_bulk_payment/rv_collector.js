
$('#btn-log-out').click(function(){
  localStorage.clear();
});


var table_detail_rv_collector = $('#table-detail-rv-collector').DataTable({
   "columnDefs": [
   {
   "targets": [ 12 ],
   "visible": false,
   "searchable" : false,
   
 },
 {
   "targets": [ 1,4,5,9,3,10,8,2,11 ], 
   "class": "col-3"
   
 },
  {
   "targets": [ 7 ], 
   "class": "col-4",
   
 },
 {
   "targets": [ 14 ],
   "visible": false,
   "searchable" : false,
  
 }
 ],
    "scrollX" : true,
    "scrollY": "360px",
    "scrollCollapse" : true,
      "paging" : false
});

var map = {};
var contract_no;
var last_installment;
var installment_amt;
var id_instalment = 0;
var hasil_akhir =0;
var id_instalment_tetap = 0;
var data_installment = 0;
var data_amount = 0;

$('#btn-searh-rv-collector').click(function(){
  var search_param = $('#search-param-rv-collector').val();
  var search_key = $('#search-key-rv-collector').val();
   $('#coll-id-rv-collector').val('');
   $('#coll-nama-rv-collector').val('');
   $('#batch-no-rv-collector').val('');  
   $('tfoot  td input#tot-rv-collector').val('');

   if(search_param ==  4){
    $('#btn-ok-rv-collector').prop('disabled',true);
   }else{
     $('#btn-ok-rv-collector').prop('disabled',false);
   }

  if (check_session() === 'true') {
    var arrayData  = [];
    arrayData.push ({   
      search_param : search_param,
      search_key : search_key
      //batch_no : batch_no
    });
    if(search_param == '00'){
      alert_info('Pilih Search Param Terlebih dahulu');
       $('#search-param-rv-collector').addClass('has-error');
    }else{
    getDetailRvCollector(arrayData);
     $('#search-param-rv-collector').removeClass('has-error');
}
  }


  
  else if (check_session() === 'false') {
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }
});    



function getDetailRvCollector(arrayData){
  var receive_no = "";
  var over_due = "";
  var val_batch = $('#batch-no-rv-collector').val();



 $.ajax({
   url : base_url+"Controller_rv_collector/getDetailRvCollector",
   cache: false,
   type: 'post',
   data : {arrayData},
   dataType: 'json',
   success : function(response){
    var data = JSON.parse(response);
    console.log(response);
    if(JSON.stringify(response).includes('Timeout')){
      alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
    } else if(response){
      try{
       if(response['errorConsole']){
        alert_error(response['errorConsole']);
      }else{
       table_detail_rv_collector.clear().draw();
       var result = $.parseJSON(response);

       if(result['status'] === false){

        alert_info('Data Tidak Ditemukan atau Periksa Search Key dan Search Param');    

      }else if(result['status'] === "500"){
        alert_info('Gagal delete di database hubungi IT');
      }else if(result['data'].length < 1){
        alert_info('Data Tidak Ditemukan atau Periksa Search Key dan Search Param');    
      }else{
        /*var today = new Date();
        var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
     dd = '0'+dd
   } 

   if(mm<10) {
     mm = '0'+mm
   } 

   today = dd + '-' + mm + '-' + yyyy;*/
    //document.write(today);
    $('#coll-id-rv-collector').val(result['data'][0].coll_id_collector);
    $('#coll-nama-rv-collector').val(result['data'][0].coll_name);
    $('#coll-id-npk-collector').val(result['data'][0].npk);
    $('#batch-no-rv-collector').val(result['data'][0].batch_no2);
     var val_batch = $('#batch-no-rv-collector').val();
     if(val_batch == ""){
       $('#btn-received-rv-collector').prop('disabled',false);
   }else{
      
       $('#btn-received-rv-collector').prop('disabled',true);
   }


   $.each(result['data'],function(index){
          if(this['no_rv'] == null){
              receive_no = "";
            }else{
              receive_no = this['no_rv'];
            }


            if(this['over_due'] == '0'){
              over_due = "-";
            }else{
              over_due = this['over_due'];
            }
          //debugger;
          table_detail_rv_collector.row.add([
            '<input class="check-rv" id="check-tbl-dtl-rc'+index+'" type="checkbox">',
            this['coll_id'],
            this['contract_no'],
            this['cust_name'],
            '<input type="text" value ="'+accounting.formatMoney(this['inst_due'], '', 2, ',', '.')+'" class="form-control " id="instl_due'+index+'" disabled=""> ',
            '<input type="text" value ="'+accounting.formatMoney(this['penalty'], '', 2, ',', '.')+'" class="form-control " id="penalty_due'+index+'" disabled=""> ',
            '<input type="text" value ="'+accounting.formatMoney(this['amount_paid'], '', 2, ',', '.')+'" class="form-control " id="amount_paid'+index+'" disabled=""> ',
            over_due,
            this['tta_no'],
            '<input type="text" value ="'+receive_no+'" class="form-control " id="receceive-no-rv" disabled=""> ',
            this['task_list_date'],
            this['payment_date'],
            this['cont_id'],
            '<button class="btn btn-inline btn-success btn-detail-rv" id="btn-detail-rv-collector'+index+'">Detail</button>',
            index

            ]).draw(false);
        });

  
 }
}

} catch(e) {
  $('#loading-ajax').hide();
  alert_error(e);
}
}else{
 alert_error("Cek Jaringan");
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
}
});
}



$('#table-detail-rv-collector').on('click', '.btn-detail-rv', function(){
  if (check_session() === 'true') {
contract_no = 0;
dkhc_no = 0;
last_installment =0;
installment_amt=0;
id_instalment = 0;
hasil_akhir =0;
id_instalment_tetap = 0;
 hasil_data = table_detail_rv_collector.row($(this).closest('tr')).data();
 $('#modal-detail-rv-collector').modal('show');
 console.log(hasil_data[2]);
 contract_no = hasil_data[2];
 dkhc_no = hasil_data[1];
 index = hasil_data[14];

 $.ajax({
  url: base_url+"Controller_rv_collector/getDataDetail",
  dataType: "json",
  type: "POST",
  data: {
   contract_no,
   dkhc_no
 },
 success: function(response) {
  //debugger;
  console.log(response);

  if (response) {
    try {
      var result = $.parseJSON(response);
         data_installment = result['data_installment'];
         data_amount = result['data_amount'];
      $('.div_instl').remove();
      $('.rmv').remove();
      
      $('#name-rv-collector').val('');
      $('#address-rv-collector').val('');
      $('#fee-rv-collector').val('');
      $('#Installment-rv-collector-id').val('');
      $('#Installment-rv-collector').val('');
      $('#penalty-rv-collector').val('');
      $('#deposit-rv-collector').val('');
      $('#total-rv-collector').val('');

      $('#address-rv-collector').val(result['Data'][0].alamat);
      $('#name-rv-collector').val(result['Data'][0].customer_name);
      $('#fee-rv-collector').val(accounting.formatMoney(result['Data'][0].fee, '', 2, ',', '.'));
      $('#penalty-rv-collector').val(accounting.formatMoney(result['Data'][0].penalty, '', 2, ',', '.'));
      $('#deposit-rv-collector').val(accounting.formatMoney(result['Data'][0].deposit, '', 2, ',', '.'));
      $('#total-rv-collector').val(accounting.formatMoney(result['Data'][0].total, '', 2, ',', '.'));
      $('#calc-rv-collector').val(result['Data'][0].calc_id);
       $('#id-index').val(index);

     /*  if(result['Data'].length ===1){
          $("#container").append("<div class='idku-rv"+id_instalment+" rmv'>"+
            "<div class='ol-xs-1 col-sm-2'><input id='Installment-rv-collector-id"+id_instalment+"' value='"+0+"' type='text'  class='form-control' name='member' disabled> </div>"+
            "<div class='ol-xs-2 col-sm-4'><input id='Installment-rv-collector"+id_instalment+"' value='"+accounting.formatMoney(0, '', 2, ',', '.')+"' type='text' class='form-control rv_amt hitung' name='member' disabled></div>"+
            "</div>");
          $("#container").append("<div class='div_instl idku-rv"+id_instalment+"><br></div>");
          $('#tmbh-rv-collector').hide();
         // $('#krg-rv-collector').hide();
       }*/

       for (var i = 1; i < result.Data.length; i++) {
        if (i == 1) {
          $("#container").append("<div class='idku-rv"+id_instalment+" rmv'>"+
            "<div class='ol-xs-1 col-sm-2'><input id='Installment-rv-collector-id"+id_instalment+"' value='"+result.Data[i].installment_no+"' type='text'  class='form-control' name='member' disabled> </div>"+
            "<div class='ol-xs-2 col-sm-4'><input id='Installment-rv-collector"+id_instalment+"' value='"+accounting.formatMoney(result.Data[i].installment_amt, '', 2, ',', '.')+"' type='text' class='form-control rv_amt hitung' name='member' disabled></div>"+
            "</div>");
          $("#container").append("<div class='div_instl idku-rv"+id_instalment+"><br></div>");
        }
        if (i>1) {
         $("#container").append("<div class='idku-rv"+id_instalment+" rmv'>"+
          "<div class='col-xs-4 col-sm-4'><label></label> </div>"+
          "<div class='ol-xs-1 col-sm-2'><input id='Installment-rv-collector-id"+id_instalment+"' value='"+result.Data[i].installment_no+"' type='text'  class='form-control' name='member' disabled> </div>"+
          "<div class='ol-xs-2 col-sm-4'><input id='Installment-rv-collector"+id_instalment+"' value='"+accounting.formatMoney(result.Data[i].installment_amt, '', 2, ',', '.')+"' type='text' class='form-control rv_amt hitung' name='member' disabled></div>"+
          "</div>");
         $("#container").append("<div class='div_instl idku-rv"+id_instalment+"><br></div>");
       }
       id_instalment_tetap = id_instalment_tetap + 1;
       id_instalment = id_instalment + 1;
       last_installment = result.Data[i].installment_no;
       installment_amt = result.Data[i].installment_amt;
     }
   } catch (e) {
    console.log(e);
    $('#loading-ajax').hide(); 
    alert_error("Terjadi kesalahan error => " + e);
  }
};
},
error: function(response) {
  console.log(response);
  alert('Tidak terhubung dengan server');
}
})
}else if (check_session() === 'false') {
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  

}
});






$(function() {
  $("#tmbh-rv-collector").click(function(e) {
    validasi_tambah();
    //debugger;
    var deposit = Number(accounting.unformat($('#deposit-rv-collector').val()));
    if ( deposit < installment_amt || installment_amt == 0 ) {
      alert_warning('tidak cukup menambah installment');
      return false;
    }else if( (last_installment +1) > data_installment){
      alert_warning('installment sudah terbayarkan keseluruhan');
      return false;
    }else {                     
      last_installment = last_installment+1; //kebutuhan hapus
      var installment_amt2 = installment_amt;


      if(last_installment == data_installment){
        installment_amt2 = data_amount;
      }

      $("#container").append("<div class='idku-rv"+id_instalment+" rmv"+id_instalment+" rmv'>"+
        "<div class='col-xs-4 col-sm-4'><label></label> </div>"+
        "<div class='ol-xs-1 col-sm-2'><input id='Installment-rv-collector-id"+id_instalment+"' value='"+last_installment+"' type='text' class='form-control' name='member' disabled> </div>"+
        "<div class='ol-xs-2 col-sm-4'><input id='Installment-rv-collector"+id_instalment+"' value='"+accounting.formatMoney(installment_amt2, '', 2, ',', '.')+"' type='text' class='form-control rv_amt hitung' name='member' disabled></div>"+
        "</div>");
      $("#container").append("<div class='div_instl idku-rv"+id_instalment+"><br></div>");

      id_instalment = id_instalment + 1;
    }
    var total =  Number(accounting.unformat($('#total-rv-collector').val()));
    //total = total + installment_amt2;
    $('#total-rv-collector').val(accounting.formatMoney(total, '', 2, ',', '.'));
    
    deposit = deposit - installment_amt2;

    $('#deposit-rv-collector').val(accounting.formatMoney(deposit, '', 2, ',', '.'));


  });

  $("#krg-rv-collector").click(function(e) {
    if(id_instalment == 1){
      alert_warning('installment tidak boleh kosong');
      return false;
    }
    var installment_amt2 = installment_amt;


      if(last_installment == data_installment){
        installment_amt2 = data_amount;
      }

    last_installment = last_installment-1;
    id_instalment = id_instalment - 1;

    $(".idku-rv"+id_instalment).remove();

    var total =  Number(accounting.unformat($('#total-rv-collector').val()));
    //total = total - installment_amt2;
    $('#total-rv-collector').val(accounting.formatMoney(total, '', 2, ',', '.'));
    var deposit = Number(accounting.unformat($('#deposit-rv-collector').val()));
    deposit = deposit + installment_amt2;
    $('#deposit-rv-collector').val(accounting.formatMoney(deposit, '', 2, ',', '.'));


  });
});

$('#btn-ok-rv-collector').click(function(){
  var penalty = accounting.unformat($('#penalty-rv-collector').val());
  var deposit = accounting.unformat($('#deposit-rv-collector').val());
  var calc_id = $('#calc-rv-collector').val();
  var total = accounting.unformat($('#total-rv-collector').val());
  var index = $('#id-index').val();
  var penalty_format  = accounting.formatMoney(penalty, '', 2, ',', '.');
 


  var arrayData=[];
  var flag = 0; // 0 = hapus, 1 = insert, 2 = tidak hapus, tidak insert
  if ($('.rv_amt').length != id_instalment_tetap && $('.rv_amt').length < id_instalment_tetap ) {
   var last_installment =  $('#Installment-rv-collector-id'+(id_instalment-1)).val();  // untuk hapus dikurang 1 dari isntallment id totalnya
    flag = 0;
  }else if($('.rv_amt').length != id_instalment_tetap && $('.rv_amt').length > id_instalment_tetap  ){
    for (var i = id_instalment_tetap; i < $('.rv_amt').length; i++) {
        arrayData.push({
            installment_no:$('#Installment-rv-collector-id'+i).val(),
            installment_amt:accounting.unformat($('.rv_amt')[i].value)
        });
    }
    flag = 1;
  }else{
       flag = 2;
  } 

 //debugger;
  update_insert_rv_collector(penalty,deposit,flag,last_installment,calc_id,arrayData,total);
   $('#penalty_due'+index).val(penalty_format);
  $('#amount_paid'+index).val(accounting.formatMoney(total, '', 2, ',', '.'));
 jumlah_total();

});

function  update_insert_rv_collector(penalty,deposit,flag,last_installment,calc_id,arrayData,total){
   $.ajax({
  url: base_url+"Controller_rv_collector/update_insert_rv_collector",
  dataType: "json",
  type: "POST",
  data: {
   penalty,
   deposit,
   flag,
   last_installment,
   calc_id,
   arrayData,
   total
 },
  success: function(response) {
  //debugger;
  console.log(response);

  if (response) {
    try {
      //debugger;
       var result = $.parseJSON(response);
      $('.div_instl').remove();
      $('.rmv').remove();
       if(result['status'] == '200'){
        alert_info('Berhasil Update Data');
      }
        else if (result['status'] == '500'){
          alert_error(result['pesan']);
        }else{
          alert_error("Cek Jaringan");
        }

     }

   catch (e) {
    console.log(e);
    $('#loading-ajax').hide(); 
    alert_error("Terjadi kesalahan error => " + e);
  }
}
},

error: function(response) {
  //debugger;
  console.log(response);
  alert('Tidak terhubung dengan server');
}
});
}

function validasi_tambah(){
  //debugger;
  var max_amount = 0;
  for (var i = 0; i < $('.rv_amt').length; i++) {
   max_amount = max_amount + Number( accounting.unformat($('.rv_amt')[i].value));
 }
 var total = Number(accounting.unformat($('#total-rv-collector').val()));
 var deposit = Number(accounting.unformat($('#deposit-rv-collector').val()));
 var fee = Number(accounting.unformat($('#fee-rv-collector').val()));
 hasil_akhir = total - deposit - fee - max_amount;
}



$('#btn-received-rv-collector').on( 'click', function () {

    var  list_data = table_detail_rv_collector.data();
     var nik = $('#coll-id-rv-collector').val();
     var npk = $('#coll-id-npk-collector').val();
     var total = accounting.unformat($('tfoot  td input#tot-rv-collector')[1].value);


     console.log(total);
     var arrayData=[];

     for (var i = 0; i < list_data.length; i++) { 
          if ($('#check-tbl-dtl-rc'+i).is(":checked")) {
            arrayData.push({  
              contract_no : list_data[i][2],
              dkhc_no :list_data[i][1]
              //total: $('#amount_paid'+i).val()

            });
          }
        }
          if ($('input:checkbox:checked', table_detail_rv_collector[0]).not("#check-tbl-dtl-rc").length < 1 ){
    alert_info('Tidak Ada Data Yang Dipilih');
  }else{
        //debugger;
        receiveRvCollector(arrayData, nik, npk,total);
      }
 
  });

function receiveRvCollector(arrayData,nik,npk,total){

    $.ajax({
    url: base_url + "Controller_rv_collector/receiveRvCollector",
    dataType: 'json',
    cache: false,
    type: 'post',
    data : {arrayData,nik,npk,total
    },

      success: function(response){
        console.log(response);
      //debugger;
      if(response){
        try{
          console.log(response);
          var data =JSON.stringify(response);
          var v = $.parseJSON(response);
            if(v['result'] == '200'){
              alert_info('Berhasil Receive dengan Batch No : '+v["batch_no"]+'');
              $('#coll-id-rv-collector').val('');
              $('#coll-nama-rv-collector').val('');
              $('#coll-id-npk-collector').val('');
              $('#search-key-rv-collector').val('');
              $('#search-param-rv-collector').val('00');
              $('#batch-no-rv-collector').val('');
              $('tfoot  td input#tot-rv-collector').val('');
              
               table_detail_rv_collector.clear().draw();

           }else if(v['errorConsole']){
              alert_error(v['errorConsole']['cause']['message']);
           }else{
              alert_error(v['errMessage']);
           }
         }
           catch(e){
            $('#loading-ajax').hide();
            alert_error(e);
          }
        }else{
          alert_error("Cek Jaringan");
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
      }
    });
}


$('#table-detail-rv-collector tbody').on('click', '.check-rv', function(){
  //debugger;
  jumlah_total();
  
});

 function jumlah_total(){
  var rv_collector = table_detail_rv_collector.data();
  console.log(rv_collector);
  var tot = 0;

  for (var i = 0; i < rv_collector.length; i++) {
    $('#tot-rv-collector').val(0);

    if ($('#check-tbl-dtl-rc'+i).is(":checked")) {  
      console.log('masuk'); 
      var amount_rv_collector = accounting.unformat($('#amount_paid'+i).val());
      console.log(amount_rv_collector);
      tot += parseInt(amount_rv_collector);
      console.log(tot);
    }

    if (i+1 === rv_collector.length) {
      console.log(i+1);
          $('tfoot td input#tot-rv-collector').val(accounting.formatMoney(tot, '', 2, ',', '.'));

    }
  }
 }


 function tambah(){
  var max_amount = 0;
  for (var i = 0; i < $('.rv_amt').length; i++) {
   max_amount = max_amount + Number(accounting.unformat($('.rv_amt')[i].value));

 }
                //nilai pertamaa
                var penalty=accounting.unformat($("#penalty-rv-collector").val());
                //nilai kedua
                var deposit=accounting.unformat($("#deposit-rv-collector").val()); 
                var fee=accounting.unformat($("#fee-rv-collector").val());
                //operasi tambah
                var tambah=parseInt(penalty)+parseInt(deposit)+parseInt(fee)+parseInt(max_amount);
                 totalku = accounting.unformat(tambah);
                //menampilkan hasil tambah
                //document.getElementById("total-rv-collector").value=accounting.formatMoney(totalku);
                $('#total-rv-collector').val(accounting.formatMoney(totalku, '', 2, ',', '.'));
            }


$('#penalty-rv-collector').on('blur',function(){
  this.value = accounting.formatMoney(this.value, '', 2, ',', '.');    
});

var amount_inp;
$('#penalty-rv-collector').on('click',function(){
  var amount_inp = this.value;
  this.value = accounting.unformat(amount_inp);
});


$('#deposit-rv-collector').on('blur',function(){
  this.value = accounting.formatMoney(this.value, '', 2, ',', '.');    
});

var amount_deposit_inp;
$('#deposit-rv-collector').on('click',function(){
  var amount_deposit_inp = this.value;
  this.value = accounting.unformat(amount_deposit_inp);
});



  $('#btn-print-rv-collector').on( 'click', function () {
      var  list_data = table_detail_rv_collector.data();
     var arrayData=[];
     var batchNo = $('#batch-no-rv-collector').val();
      var namaCollector = $('#coll-nama-rv-collector').val();
      var nikCollector = $('#coll-id-rv-collector').val();
      var total = $('#tot-rv-collector').val();


if(batchNo == ""){
  alert_info('hanya bisa melakukan print jika sudah di receive');
  return false;
}

     for (var i = 0; i < list_data.length; i++) { 
          if ($('#check-tbl-dtl-rc'+i).is(":checked")) {
            arrayData.push({  
              contract_no : list_data[i][2],
              nama_konsumen :list_data[i][3],
              amount_paid : $('#amount_paid'+i).val()

            });
          }
        }
        if ($('input:checkbox:checked', table_detail_rv_collector[0]).not("#check-tbl-dtl-rc").length < 1 ){
    alert_info('Tidak Ada Data Yang Dipilih');
  }else{
      if(batchNo == ""){
  alert_info('hanya bisa melakukan print jika sudah di receive');
  return false;
}else{
   print_rv_collector(arrayData,batchNo,namaCollector,nikCollector,total);
 }
 }
  });


  function print_rv_collector(arrayData,batchNo,namaCollector,nikCollector,total){
//debugger;
    $.ajax({
    url: base_url + "Controller_rv_collector/export_collector",
    cache: false,
    type: 'post',
    data : {arrayData,batchNo,namaCollector,nikCollector,total},
    dataType: 'json',
    success: function(response){
         if(response){
          try{
            console.log(response);
          var data =JSON.stringify(response);
         // var dataHasil = JSON.stringify(arrayData);
       
//debugger;
     
               $('#penampung').val(data);
              
               $('#idForm').submit();
      }catch(e){
            $('#loading-ajax').hide();
            alert_error(e);
          }
    }else{
      alert_error("Cek Jaringan");
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
      }
});
  }