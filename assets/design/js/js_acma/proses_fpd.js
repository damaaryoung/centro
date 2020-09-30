
var fees = [];
var fees2 = [];
var flag_create_fpd =0 ;
var table_fpd =  $('#id-tbl-fpd').DataTable({


  "columnDefs": [
  {
    'bSortable': true,
    "targets": [ 4,9 ],
    "visible": false,
    "responsive": true,
  }
  
  ],

  "scrollY":        "370px",
  "scrollCollapse": true,
  "paging":         false,

});


$("input#id-no-fpd").on({
  keydown: function(e) {
    if (e.which === 32)
      return false;
  },
  change: function() {
    this.value = this.value.replace(/\s/g, "");
  },

});

$('#tgl-awal-fpd').datetimepicker({
 format: 'DD-MMM-YYYY',
// maxDate : 'now',
maxDate: new Date()

}).on("dp.change", function(e){
  var date = e.date;
  var dDate = date._d;
  var new_date = new Date(dDate);
  new_date.setDate(new_date.getDate() + 30);

  $('#tgl-akhir-fpd').data("DateTimePicker").minDate(dDate);

  if (new_date > new Date(today)) {
    new_date = new Date(today);
  }

  $('#tgl-akhir-fpd').data("DateTimePicker").maxDate(new_date);
  $('#tgl-akhir-fpd').data("DateTimePicker").date(new_date);
});

$('#tgl-akhir-fpd').datetimepicker({
  format: 'DD-MMM-YYYY',
  allowInputToggle: true,
  maxDate: new Date()
});

var selected_index = [];
// $('#tgl-awal-fpd').datetimepicker({
//  format: 'DD-MMM-YYYY',
//  maxDate : 'now',

// }).on('dp.change',function(){

//            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
//            var firstDate = new Date($("#tgl-awal-fpd").val());
//            var secondDate = new Date($("#tgl-akhir-fpd").val());
//            if(firstDate.getTime() > secondDate.getTime()){
//              alert_info('Tidak boleh lebih besar dari tanggal akhir');
//              $('#div-tgl-awal-fpd').addClass('has-error');
//              $('#tgl-awal-fpd').data('DateTimePicker').clear();
//              $("#tgl-awal-fpd").val('');

//            }

//          }); 

// $('#tgl-akhir-fpd').datetimepicker({
//  format: 'DD-MMM-YYYY',
//  maxDate : 'now',


// }).on('dp.change',function(){

//            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
//            var firstDate = new Date($("#tgl-awal-fpd").val());
//            var secondDate = new Date($("#tgl-akhir-fpd").val());

//            if (secondDate.getTime() < firstDate.getTime()) {
//             alert_info('Tidak boleh lebih kecil dari tanggal awal');
//             $('#div-tgl-akhir-fpd').addClass('has-error');
//             $('#tgl-akhir-fpd').data('DateTimePicker').clear();
//             $("#tgl-akhir-fpd").val('');

//           }

//         })



$('#btn-clear-fpd').click(function(){
  history.go(0);
});


if ($('#id-form-aplikasi-fpd').length) {
  var branch_code = $('#hdn-branch-code').val();
  var branch_name = $('#hdn-branch-name').val();

  console.log(branch_code);

  if (branch_code !== '0000') {
    console.log('masuk');
    $('#slc-branch-fpd').prop('disabled', true);
    $('<option/>').val(branch_code).html(branch_code+' - '+branch_name).appendTo('#slc-branch-fpd');
  }
  else{
    get_data_branch('#slc-branch-fpd');

  }
}

if ($('#id-form-notaris-fpd').length) {
  var notaris_id = $('#hdn-notaris-id').val();
  var notaris_name = $('#hdn-notaris-name').val();
  console.log(notaris_id);

  if (notaris_id !== '') {
    console.log('masuk');
    $('#slc-notaris-fpd').prop('disabled', true);
    $('<option/>').val(notaris_id).html(notaris_id+' - '+notaris_name).appendTo('#slc-notaris-fpd');
  }
  else{
    get_data_notariss('#slc-notaris-fpd');

  }
}

// function arSearch(){

//   var arrayData= [];
//   var tla = $('#tgl-awal-fpd').val();
//   tla = new Date(tla).format('dd/mm/yyyy');
//   var tlak = $('#tgl-akhir-fpd').val();
//   tlak = new Date(tlak).format('dd/mm/yyyy');
//   arrayData.push({
//     tgl_awal:tla,
//     tgl_akhir:tlak,
//     notaris_id:$('#slc-notaris-fpd').val()
//   });
//   getSearch(arrayData);
// }



function arSearch(){

  var arrayData= [];
  arrayData.push({
    tgl_awal:$('#tgl-awal-fpd').val(),
    tgl_akhir:$('#tgl-akhir-fpd').val(),
    notaris_id:$('#slc-notaris-fpd').val()
  });
  getSearch(arrayData);
}

$('#btn-search-fpd').click(function(){
  if(check_session()=== 'false'){
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }else{
    var tgl_1 = $('#tgl-awal-fpd').val();
    var tgl_2 = $('#tgl-akhir-fpd').val();
    var notaris = $('#slc-notaris-fpd').val();
    if (tgl_1 === '' || tgl_2 === '') {
      alert_info("Silahkan Pilih Periode Proses FPD");
      $('#div-tgl-awal-fpd').addClass('has-error');
      $('#tgl-awal-fpd').addClass('has-error');
      $('#div-tgl-akhir-fpd').addClass('has-error');
      $('#tgl-akhir-fpd').addClass('has-error');
      
    } else if(notaris === ''){
      alert_info("Silahkan Pilih Notaris");
      $('#id-form-notaris-fpd').addClass('has-error');
    }else{
     $('#id-form-notaris-fpd').removeClass('has-error');
     $('#div-tgl-awal-fpd').removeClass('has-error');
     $('#tgl-awal-fpd').removeClass('has-error');
     $('#div-tgl-akhir-fpd').removeClass('has-error');
     $('#tgl-akhir-fpd').removeClass('has-error');
     flag_create_fpd =0;
     arSearch();
     
   }
 }

});

function search_no_fpd(){
  if($('#id-no-fpd').val()===''){
    alert_info('Nomor FPD Harus di Isi !');
    $('#div-id-no-fpd').addClass('has-error');
  }else if($('input#id-no-fpd').val().length < 18){
    alert_info('Nomor Fpd Minimal 18 Karakter !');
    $('#div-id-no-fpd').addClass('has-error');

  }else{
    getSearchFpd();
    $('#div-id-no-fpd').removeClass('has-error');
    $('#btn-create-fpd').prop('disabled',true);

  }
}

$('#id-no-fpd').keyup(function(e) {
  if(check_session()=== 'false'){
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }else{
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13 ) {

     search_no_fpd();
   }
 }

});


$('#btn-searchfpd-fpd').click(function(){
  if(check_session()=== 'false'){
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }else{
   search_no_fpd();
 }

});

// var role_fpd; 

// if (localStorage.getItem("menu_alias_am") === "PFPD") {
//   getRoleFpd();
// }

$('#btn-create-fpd').click(function(ev){
  if(check_session()=== 'false'){
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }else{

    var tbl_fpd = table_fpd.rows( { search: 'applied' } ).data();
    var arrayData  = [];
    if(tbl_fpd.rows().data().length === 0){
      alert_info('Data Masih Kosong !');
    } else if($('input:checkbox:checked').not("#chk-all").length < 1){
      alert_info('Tidak Ada Data yang dipilih !');
    }else if(branch_code != '0000'){
      alert_info('Buat FPD Hanya bisa dibuat oleh HO');
    }else{

     for (var i = 0; i < tbl_fpd.data().length; i++) {
      var ac = tbl_fpd.data()[i][2];
      var fix = ac.substr(0,4);
      var z = tbl_fpd.data()[i][1];

      if ($('#check-tbl-search'+(z-1)).is(":checked")) { 

       arrayData.push({ 
        branch_code : fix,
        contract_id : tbl_fpd.data()[i][4],
        not_fee : accounting.formatMoney(tbl_fpd.rows().data()[i][7], '','' , '', ''),
        pnbp_fee : accounting.formatMoney(tbl_fpd.rows().data()[i][8], '', '', '', ''),
        object_code : tbl_fpd.data()[i][9]
      });

       selected_index.push(i);

     }

   }
   alert_confirm("Apakah anda yakin ?", function(){
    createFpd(arrayData);
  });

 }
}

});

function getRoleFpd(){
  $.ajax({
    url : base_url + "Controller_proses_fpd/get_detail_user",
    cache : false,
    success : function(response){
      try{
        console.log(response);
        var role_data = $.parseJSON(response);
        var flag_role = true;
        $.each(role_data, function(i){
          if (role_data[i].role_code  === 'CR_FPD_FID') {
            localStorage.setItem('role_fpd', true);
            flag_role = false;
          }else if(flag_role){
           localStorage.setItem('role_fpd', false);
         }
       });
      }catch(e) {
                    $('#loading-ajax').hide(); //menutup loading ajax
                    console.log(e);
                    alert_error("Galat" + e);
                  }
                },
                error: function(response){
                  console.log(response);
                }
              });
  
}
  //    for (var i = 0; i < tbl_fpd.rows().data().length; i++) {

  //   if ($('#chk-all').is(":checked")) {
  //     $('.check-search').prop('checked', true);

  //     arrayData.push({ 
  //         branch_code : tbl_fpd.rows().data()[i][2],
  //         contract_id : tbl_fpd.rows().data()[i][4],
  //        not_fee : ($('#inp-not-fee-fpd'+i).val()),
  //          pnbp_fee : ($('#inp-pnbp-fee-fpd'+i).val())
  //       });
  //   }else{

  //   }
  
  // }
  function createFpd(arrayData){
    $.ajax({
      'url' :'Controller_proses_fpd/create_fpd',
      'type' :'POST',
      'data' :{
        arrayData
      },
      success : function(response){

       try{
        console.log(response);
        var data =JSON.stringify(response);
        var v = $.parseJSON(response);
        
        if(data.includes('berhasil')){
          alert_info(v['pesan']);
          
        }else{
          alert_info(v['pesan'], function(){
            // for(var i=0;i<selected_index.length;i++){
            //   table_fpd.rows((selected_index[i]-i)).remove();

            // }
            // table_fpd.rows().draw();
            flag_create_fpd=1;
            arSearch();

            $('#chk-all').removeProp('checked');
            $('tfoot th input#inp-tot-pnbp-fee').val('Rp0.00');
            $('tfoot th input#inp-tot-notery-fee').val('Rp0.00');

          });
          
          
          
        };
      }catch(e){
       $('#loading-ajax').hide();
       console.log(e);
       alert_error("Terjadi Kesalahan => "+e);
     }
     
     
   },error:function(response){
    alert_error('Error Connection');
    
  }
  
  
})

  }


  function getSearch(arrayData){
   fees = [];
   fees2 = [];
   
   $.ajax({
    'url' :'Controller_proses_fpd/get_search',
    'type' :'POST',
    'data' :{
      arrayData
    },
    success : function(response){

      if(response) {
        try {
          var data1 = $.parseJSON(response);
          console.log(response);

          if (data1['Data'].listSearchFpd.length <1) {
            if(flag_create_fpd == 0){
             alert_info('Data tidak ditemukan');
           }

         }else{
                  //alert(data1['Data'].length+' Data ditemukan');
                  $('#btn-create-fpd').removeProp('disabled');
                  $('tfoot th input#inp-tot-notery-fee').val('Rp0.00');
                  $('tfoot th input#inp-tot-pnbp-fee').val('Rp0.00');
                  $('#chk-all').prop("checked",false);
                }

                table_fpd.clear().draw();
                var dataSearch = [];
                $.each(data1['Data'].listSearchFpd, function(index) {

                 var bast_date =  this['bast_date'];
                 bast_date = new Date(bast_date).format('dd-mmm-yyyy');
                //bast_date = new Date(bast_date).toString('DD-MMM-YYYY');
                dataSearch.push([
                 '<input class="check-search" id="check-tbl-search'+index+'" type="checkbox">',
                 index + 1,
                 this['branch_code']+' - '+ this['branch_name'],
                 
                 bast_date,
                 this['contract_id'],
                 this['contract_no'],
                 this['cust_name'],
                 accounting.formatMoney(this['notary_fee'], 'Rp', 2, ',', '.'),
                 accounting.formatMoney(this['pnbp_fee'], 'Rp', 2, ',', '.'),
                 this['object_code']
                 ])
                

                fees.push(this['notary_fee']);
                fees2.push(this['pnbp_fee']);
              });
                table_fpd.rows.add(dataSearch).draw(false);
                
              }
              catch(e) {
               $('#loading-ajax').hide();
               console.log(e);
               alert_error("Terjadi Kesalahan => "+e);
               
             }
           }
           
         },
         error:function(response){
           console.log(response);
           alert_error('Error Connection');
         }
         

       });


 }

 function getSearchFpd(){


   fees = [];
   fees2 = [];
   var fpdno = $('#id-no-fpd').val();
   var fpd_no = fpdno.toUpperCase();
   $.ajax({
    'url' :'Controller_proses_fpd/get_search_fpd',
    'type' :'POST',
    'data' :{

      'fpd_no' : fpd_no
    },
    success : function(response){

      if(response) {

        try {
         var data1 = $.parseJSON(response);
         console.log(response);

         if (data1['data'].length <1) {
          alert_info('Data tidak ditemukan');

        }else{    

                  //alert(data1['data'].length+' Data ditemukan');
                  $('tfoot th input#inp-tot-notery-fee').val('Rp0.00');
                  $('tfoot th input#inp-tot-pnbp-fee').val('Rp0.00');
                  $('#div-total').removeProp('hidden');
                  $('#chk-all').removeProp("checked");
                }

                table_fpd.clear().draw();
                var dataFpd = [];
                $.each(data1['data'], function(index) {

                 var bast_date =  this['bast_date'];
                 bast_date = new Date(bast_date).format('dd-mmm-yyyy');
                 console.log(this['branch_name']);

                 dataFpd.push([
                   '<input class="check-search" id="check-tbl-search'+index+'" type="checkbox">',
                   index + 1,
                   this['branch_code']+' - '+ this['branch_name'],
                   bast_date,
                   this['contract_id'],
                   this['contract_no'],
                   this['cust_name'],
                   accounting.formatMoney(this['notary_fee'], 'Rp', 2, ',', '.'),
                   accounting.formatMoney(this['pnbp_fee'], 'Rp', 2, ',', '.'),
                   this['object_code'],
                   ])
                 fees.push(this['notary_fee']);
                 fees2.push(this['pnbp_fee']);

               });
                
                table_fpd.rows.add(dataFpd).draw(false);
                $('#chk-all').prop("checked",true);
                total_all();
                $('#chk-all').prop("disabled",true);  
                $('.check-search').prop('disabled', true);
                
                //   var rows = document.getElementsByTagName("tr") ;
                //   for (var i = 0; i< rows.length; i++) {
                //      if(i%2==0) {
                //     rows[i].style.backgroundColor = 'white';
                //   }
                //   else {
                //     rows[i].style.backgroundColor = '#ececec';
                //   }
                // }

                
              } catch(e) {
               $('#loading-ajax').hide();
               console.log(e);
               alert_error("Terjadi Kesalahan => "+e);
               
             }
           }
           
         },
         error:function(response){
           console.log(response);
           alert_error('Error Connection');
         }
         

       });
 }

 $('#id-tbl-fpd tbody').on('click', '.check-search', function(){

  //var tbl_fpd = table_fpd.data();
  //console.log(tbl_fpd);
  var tot = 0;
  var tot1 = 0;

  for (var i = 0; i < table_fpd.data().length; i++) {



    if ($('#check-tbl-search'+i).is(":checked")) {    
      //var not_fee = accounting.unformat(tbl_fpd.rows().data()[i][7]);
      var not_fee = fees[i];
      console.log(not_fee);
      tot = tot + parseInt(not_fee);
      console.log(tot);

      var pnbp_fee = fees2[i];
      console.log(pnbp_fee);
      tot1 += parseInt(pnbp_fee);
      console.log(tot1);
    }
    
    if (i+1 === table_fpd.data().length) {

     $('tfoot th input#inp-tot-notery-fee').val(accounting.formatMoney(tot, 'Rp', 2, ',', '.'));
     $('tfoot th input#inp-tot-pnbp-fee').val(accounting.formatMoney(tot1, 'Rp', 2, ',', '.'));
         // notery.push({
         //  "tot_notery" : $('#inp-tot-notery-fee').val(accounting.formatMoney(tot, 'Rp', 2, ',', '.'))
         // });
         //  $('tfoot th#inp-tot-noteryfee').val(notery[0].tot_notery);
       }
       

     }

   });

 $('#chk-all').click(function(){
  total_all();
});

 function total_all(){

  var tbl_fpd_row = table_fpd.rows( { search: 'applied' } ).nodes();
  var tbl_fpd_ = table_fpd.rows( { search: 'applied' } ).data();
  var tot = 0;
  var tot1 = 0;

  if($('#chk-all').prop('checked') == true){
    $('.check-search').prop('checked', true);
    //$('input[type="checkbox"]', tbl_fpd_row).prop('checked', true);
    for (var i = 0; i < tbl_fpd_.length; i++) {
      var not_fee = accounting.unformat(tbl_fpd_[i][7]);
      var pnbp_fee = accounting.unformat(tbl_fpd_[i][8]);
      tot += parseInt(not_fee);
      tot1 += parseInt(pnbp_fee);
      $('tfoot th input#inp-tot-notery-fee').val(accounting.formatMoney(tot, 'Rp', 2, ',', '.'));
      $('tfoot th input#inp-tot-pnbp-fee').val(accounting.formatMoney(tot1, 'Rp', 2, ',', '.'));
    }
  }else{
    //$('input[type="checkbox"]', tbl_fpd_row).prop('checked', false);
    $('.check-search').prop('checked', false);
    
    $('tfoot th input#inp-tot-notery-fee').val('Rp0.00');
    $('tfoot th input#inp-tot-pnbp-fee').val('Rp0.00');

  }

  

  // for (var i = 0; i < tbl_fpd.data().length; i++) {

  //   if ($('#chk-all').is(":checked")) {
  //     $('.check-search').prop('checked', true);

  //     var not_fee = accounting.unformat(tbl_fpd[i][7]);
  //     //var not_fee = fees[i];
  //     console.log(not_fee);
  //     tot += parseInt(not_fee);
  //     console.log(tot);
  //     $('tfoot th input#inp-tot-notery-fee').val(accounting.formatMoney(tot, 'Rp', 2, ',', '.'));

  //      var pnbp_fee = accounting.unformat(tbl_fpd[i][8]);
  //     //var pnbp_fee = fees2[i];
  //     console.log(pnbp_fee);
  //     tot1 += parseInt(pnbp_fee);
  //     console.log(tot1);
  //     $('tfoot th input#inp-tot-pnbp-fee').val(accounting.formatMoney(tot1, 'Rp', 2, ',', '.'));

  //   }else{
  //     $('.check-search').prop('checked', false);
  //   }

  //    if (i+1 === tbl_fpd.length) {
  //         $('tfoot th input#inp-tot-notery-fee').val(accounting.formatMoney(tot, 'Rp', 2, ',', '.'));
  //         $('tfoot th input#inp-tot-pnbp-fee').val(accounting.formatMoney(tot1, 'Rp', 2, ',', '.'));

  //       }

   //}

 }


           //  var x1 = 0;
           // if (tgl1 == " ") {
           //   debugger;
           //     //$('#div-mtr-tgl-pengajuan-awal').addClass('has-error');
           //     prop_info_message.push({
           //         message: '<b>Tanggal Awal</b> : Tidak boleh kosong'
           //     });
           //     x1 = 0;
           // } else if (!tgl1 == " ") {
           //   debugger;
           //     //$('#div-mtr-tgl-pengajuan-awal').removeClass('has-error');
           //     x1 = 1;
           // }

           // var x2 = 0;
           // if (tgl2 == " ") {
           //   debugger;
           //     //$('#div-mtr-tgl-pengajuan-akhir').addClass('has-error');
           //     prop_info_message.push({
           //         message: '<b>Tanggal Akhir</b> : Tidak boleh kosong'
           //     });
           //     x2 = 0;
           // } else if (!tgl2 == " ") {
           //   debugger;
           //     //$('#div-mtr-tgl-pengajuan-akhir').removeClass('has-error');
           //     x2 = 1;
           // }
           

//        var input = $('#tgl-akhir-fpd').val();

//     var week = input.replace(/-/g,' ');
//    var date = new Date(week);
//        prefixes = [1, 2, 3, 4, 5];


//   var bs =$('#weeek').val(prefixes[0 | date.getDate() / 7]);
// return bs ;









