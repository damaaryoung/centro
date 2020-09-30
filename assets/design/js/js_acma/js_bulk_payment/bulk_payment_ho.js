
if (localStorage.getItem("menu_alias_am") === "BPT") {
  var tabel_bulk_payment_main = $('#table-detail-bulk-payment-ho').DataTable({
    "responsive": true
  });

  var tabel_bulk_payment_detail_ho  = $('#table-detail-bulk-detail-ho').DataTable({
   "columnDefs": [
   {
     "targets": [ 7 ,8],
     "visible": false,
     "responsive": true,    
   }
   ]
 });

  $('.tgl-koleksi-bpm-ho').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
  });
  var total_ceklist = $('.check-bp:checked').not('#check-tbl-dtl-bp-ho').length;
  $('#table-detail-bulk-payment-ho tbody').on('click','.check-bp',function()
  {
    var total_ceklist2 = $('.check-bp:checked').not('#check-tbl-dtl-bp-ho').length;
    var idData = $(this).attr('idData');
    if (total_ceklist != total_ceklist2) {
      $('#check-tbl-dtl-bp-ho').prop('checked',false);
    }else{
      $('#check-tbl-dtl-bp-ho').prop('checked',true);
    }
    console.log(idData);
  });
///--------------------------------------------------------- TOMBOL SEARCH
$('#filter-bulk-payment-ho').click(function(){
	console.log('search');
  if (check_session() === 'true') {
    var tgl_awal = $('#tgl-awal-bpm-ho').val();
    var tgl_akhir = $('#tgl-akhir-bpm-ho').val();
    var status = $('#slc-sts-bpm-ho :checked').val();

    if (tgl_awal ==='' && tgl_akhir ==='' ) {
      alert_warning('Isi Tanggal Pengajuan terlebih dahulu!!');
      $('#div-tgl-awal-bpm').addClass('has-error');
      $('#div-tgl-akhir-bpm-ho').addClass('has-error');
    }else if(tgl_akhir ===''){
     alert_warning('Isi Tanggal Pengajuan terlebih dahulu!!');
     $('#div-tgl-akhir-bpm-ho').addClass('has-error');
   }else if(tgl_awal ===''){
     alert_warning('Isi Tanggal Pengajuan terlebih dahulu!!');
     $('#div-tgl-awal-bpm').addClass('has-error');
   }else if($('#slc-sts-bpm-ho').val() === ''){
     alert_warning('pilih status pengajuan!!');
     $('#div-slc-bp-ho').addClass('has-error');
   }
   else{
     $('#div-tgl-awal-bpm').removeClass('has-error');
     $('#div-tgl-akhir-bpm-ho').removeClass('has-error');
     $('#div-slc-bp-ho').removeClass('has-error');
     localStorage.setItem('tgl_awal',tgl_awal);
     localStorage.setItem('tgl_akhir',tgl_akhir);
     localStorage.setItem('status',status);
     getBulkByDate(tgl_awal,tgl_akhir,status);
   }
 }else if (check_session() === 'false') {
  alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
    localStorage.clear();
    window.location.href = base_url + "Controller_login/login_view";
  });
}

});

var today;
///-------------------------------------------------------------------- TOMBOL DOWNLOAD
$('#btn-download-data-bulk-payment-ho').click(function(){
  console.log('download');
  getDate();
  if (check_session() === 'true') {
    var  list_data = tabel_bulk_payment_detail_ho.data();
    var header = "NOMOR_KONTRAK ,CABANG ,KONSUMEN, TGL_JATUH_TEMPO , ANGSURAN KE- , NOMINAL "
    var data = "";
    $.each(list_data, function(index) {
      data =   data + '=' +'"'+ this[2] + '", ' + this[1] + ', ' + this[3] +', ' + this[4] + ', ' +this[5] + ', ' + accounting.unformat(this[6] )+ '\n';
    });

    var dataTxt = header + '\n'+ data;
    var file = [];
    var filename =[];
    var temp_isi;
    file.push(dataTxt);
    filename.push('BULKPAYMENT_'+list_data[0][8]+'_'+today);

    var uri = 'data:application/txt;charset=UTF-8,' + encodeURIComponent(file[0]);
    var downloadLink = document.createElement("a");

    downloadLink.href = uri;
    downloadLink.download = filename[0]+'.csv';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }else if (check_session() === 'false') {
    alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
      localStorage.clear();
      window.location.href = base_url + "Controller_login/login_view";
    });
  }
});

///---------------------------------------------------------------- TOMBOL CLEAR
$('#clear-bulk-payment-ho').click(function(){
	console.log('clear');
  console.log('clear');
  $('#tgl-awal-bpm-ho').val('');
  $('#tgl-akhir-bpm-ho').val('');
  $('#slc-sts-bpm-ho').val('');
  tabel_bulk_payment_main.clear().draw();
});

$('#check-tbl-dtl-bp-ho').click(function(){
  var pages = tabel_bulk_payment_main.page();
  var limits = tabel_bulk_payment_main.page.len();
  var table_leng = tabel_bulk_payment_main.rows().data().length ;
  tabel_bulk_payment_main.page.len(table_leng);
  tabel_bulk_payment_main.draw();

  if ($('#check-tbl-dtl-bp-ho').is(':checked')){

   $(':checkbox').prop('checked', true);
 }else{
   $(':checkbox').prop('checked', false);
 }
 tabel_bulk_payment_main.page.len(limits);
 tabel_bulk_payment_main.draw();
 tabel_bulk_payment_main.page( pages ).draw( 'page' );
});

///------------------------------------------------------------------------------------- TOMBOL APPROVE
$('#btn-approve-bulk-payment-ho').click(function(){
	console.log('approve');
  if (check_session() === 'true') {
    getRole();
    var validasi = localStorage.getItem('role');
    var user = $('#hdn-user-id-bp').val();
    var tgl_awal = localStorage.getItem('tgl_awal');
    var tgl_akhir = localStorage.getItem('tgl_akhir');
    var status = localStorage.getItem('status');
    var list_data = tabel_bulk_payment_main.data();
    var arrayData = [];
    var length = $('#table-detail-bulk-payment-ho').find('.check-bp').filter(':checked').not('#check-tbl-dtl-bp-ho').length;
    var v_tgl_koleksi = $('.tgl-koleksi-bpm-ho').val();

    if (validasi === "false") {
     alert_warning("User Tidak Mempunyai Role untuk APPROVE!!");
     return false;
   }else if (tabel_bulk_payment_main.rows().flatten().length == 0) {

    alert_warning("Data Pengajuan Masih Kosong!!");
    return false;
  }else if(length === 0){
    alert_warning("ceklist salah satu data!!");
  }else{
    var pages = tabel_bulk_payment_main.page();
    var limits = tabel_bulk_payment_main.page.len();
    var table_leng = tabel_bulk_payment_main.rows().data().length ;
    var search  = tabel_bulk_payment_main.search();

    tabel_bulk_payment_main.search("");
    tabel_bulk_payment_main.page.len(table_leng);
    tabel_bulk_payment_main.draw();

    for (var i = 0; i < list_data.length; i++) {
      if ($('#check-tbl-dtl-bp'+i).is(":checked")) {

        if ($('#tgl-koleksi-bpm-ho'+i).val() === '') {
          alert_warning('tanggal Koleksi tidak boleh kosong !!!');
          $('#tgl-koleksi-bpm-ho'+i).css({"border":"2px solid red"})
          return false;
        }else{
          $('#tgl-koleksi-bpm-ho'+i).css({"border":"none"})
          arrayData.push({
            tgl_koleksi: $('#tgl-koleksi-bpm-ho'+i).val(),
            customer_id : $('#detail-bulk-payment-ho'+i).attr('idCustomer')
          });
        }
      }
    }
    tabel_bulk_payment_main.search(search);
    tabel_bulk_payment_main.page.len(limits);
    tabel_bulk_payment_main.draw();
    tabel_bulk_payment_main.page( pages ).draw( 'page' );
    alert_confirm('APAKAH YAKIN INGIN APPROVE ?',function(){
      approveBulkPayment(arrayData,status,tgl_awal,tgl_akhir,user);
    });
  }
} else if (check_session() === 'false') {
  alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
    localStorage.clear();
    window.location.href = base_url + "Controller_login/login_view";
  });
}
});

$('#detail-bulk-payment-ho').click(function(){
	console.log('detail');
});

$('#tgl-akhir-bpm-ho').datetimepicker({
  format: 'DD-MMM-YYYY',
  allowInputToggle: true,
  maxDate: new Date()
});

function dateKoleksi(){
  $('.tgl-koleksi-bpm-ho').datetimepicker({
    format: 'DD-MMM-YYYY',
    allowInputToggle: true,
    maxDate: new Date()
  });
}

$('#tgl-awal-bpm-ho').datetimepicker({
  format: 'DD-MMM-YYYY',
  allowInputToggle: true,
  maxDate: new Date()
}).on("dp.change", function(e){
  var date = e.date;
  var dDate = date._d;
  var new_date = new Date(dDate);
  new_date.setDate(new_date.getDate() + 30);

  $('#tgl-akhir-bpm-ho').data("DateTimePicker");

  if (new_date > new Date(today)) {
    new_date = new Date(today);
  }

  $('#tgl-awal-bpm-ho').data("DateTimePicker").maxDate(new_date);
  $('#tgl-akhir-bpm-ho').data("DateTimePicker").date(new_date);
});


function getBulkByDate(tgl_awal,tgl_akhir,status){
  $.ajax({
    url:base_url+"Controller_bulk_payment/get_pengajuan_by_date",
    type:'POST',
    data:{tgl_awal,tgl_akhir,status},
    success:function(response){
      console.log(response);
      var data = $.parseJSON(response);
      var data1 = $.parseJSON(data);
      var array = [];
      var response = JSON.stringify(response);
      if(response) {
        try {
          tabel_bulk_payment_main.clear().draw();
          if (data1['ListBulk'].length < 1) {
            alert_warning(data1['keterangan']);
          }else{
            if ($('#slc-sts-bpm-ho').val() === '0') {

              var pages = tabel_bulk_payment_main.page();
              var limits = tabel_bulk_payment_main.page.len();
              var table_leng = tabel_bulk_payment_main.rows().data().length ;
              var search  = tabel_bulk_payment_main.search();

              tabel_bulk_payment_main.page.len(table_leng);
              tabel_bulk_payment_main.draw();

              $.each(data1['ListBulk'], function(index) {
               var customer = this['customer_id'];
               if (customer != null) {
                customer = this['customer_id'];
              }else{
               customer = this['customer_group_id'];
             }
             var sumtacMoney = accounting.formatMoney(this['total_nominal'], '', 2, ',', '.');
             array.push([
              '<input  class="check-bp" id="check-tbl-dtl-bp'+index+'" type="checkbox" checked disabled>',
              index + 1,
              this['customer_name'],
              this['total_unit'],
              sumtacMoney,
              this['tgl_koleksi'],
              '<button class="detail-bulk-payment-ho btn btn-primary" tgl_koleksi="'+this['tgl_koleksi']+'"  idCustomer = "'+customer+'" id="detail-bulk-payment-ho'+index+'">DETAIL</button>'            
              ]);
           });

              tabel_bulk_payment_main.rows.add(array).draw();
              $('.tgl-koleksi-bpm-ho').prop('disabled',true);
              $('.check-bp').prop('disabled',true);
              $('.check-bp').prop('checked',true);
              $('#btn-approve-bulk-payment-ho').prop('disabled',true);
                // total_ceklist = $('.check-bp').not('#check-tbl-dtl-bp').length;
                tabel_bulk_payment_main.page.len(limits);
                tabel_bulk_payment_main.draw();
                tabel_bulk_payment_main.page( pages ).draw( 'page' );   
              }else{
               $('.tgl-koleksi-bpm-ho').prop('disabled',false);
               $.each(data1['ListBulk'], function(index) {
                var customer = this['customer_id'];
                if (customer != null) {
                  customer = this['customer_id'];
                }else{
                 customer = this['customer_group_id'];
               }
               var sumtacMoney = accounting.formatMoney(this['total_nominal'], '', 2, ',', '.');
               tabel_bulk_payment_main.row.add([
                '<input  class="check-bp" id="check-tbl-dtl-bp'+index+'" type="checkbox">',
                index + 1,
                this['customer_name'],
                this['total_unit'],
                sumtacMoney,
                '  <input type="text"  placeholder="Pilih Tanggal Koleksi" id = "tgl-koleksi-bpm-ho'+index+'" class="tgl-koleksi-bpm-ho form-control input-sm inp-border"/>',
                '<button class="detail-bulk-payment-ho btn btn-primary"  idCustomer = "'+customer+'" id="detail-bulk-payment-ho'+index+'">DETAIL</button>'
                ]).draw(false);
             });
               $('.check-bp').prop('disabled',false);
               $('.check-bp').prop('checked',false);
               $('#btn-approve-bulk-payment-ho').prop('disabled',false);
               total_ceklist = $('.check-bp').not('#check-tbl-dtl-bp-ho').length;
             }
             dateKoleksi();
           }
         }
         catch(e) {
          $('#loading-ajax').hide(); 
          console.log(e);
          alert_error("Galat" + e);
        }
      }
// DISABLED APPROVE KARENA HO NAIK PHASE 2
      $('#btn-approve-bulk-payment-ho').prop('disabled',true);
    },error:function(response){
      console.log(response);
    }
  }); 

}
$("#table-detail-bulk-payment-ho").on("click",'.detail-bulk-payment-ho',function() {
  var idCustomer = $(this).attr('idCustomer');
  var tgl_awal = $('#tgl-awal-bpm-ho').val();
  var tgl_akhir = $('#tgl-akhir-bpm-ho').val();
  var status = localStorage.getItem('status');
  var tgl_koleksi = $(this).attr('tgl_koleksi');
  getDetailBulk(tgl_koleksi,idCustomer,tgl_awal,tgl_akhir,status);
});
function getDetailBulk(tgl_koleksi,idCustomer,tgl_awal,tgl_akhir,status){
  $.ajax({
    url:base_url+"Controller_bulk_payment/get_pengajuan_detail",
    type:'POST',
    data:{tgl_koleksi,idCustomer,tgl_awal,tgl_akhir,status},
    success:function(response){
      console.log(response);
      var data = $.parseJSON(response);
      var data1 = $.parseJSON(data);
      var array = [];
      var response = JSON.stringify(response);
      if(response) {
        try {
          tabel_bulk_payment_detail_ho.clear().draw();
          if (data1['ListBulk'].length < 1) {
            alert_warning(data1['alert']);
          }else{
            $.each(data1['ListBulk'], function(index) {
              var sumtacMoney = accounting.formatMoney(this['nominal'], '', 2, ',', '.');
              array.push([
                index + 1,
                this['branch_code']+ ' - ' +this['branch_name'],
                this['contract_no'],
                this['customer_name'],
                this['installment_date'],
                this['installment_no'],
                sumtacMoney,
                this['object_code'],
                this['customer_no']
                ]);
            });
            tabel_bulk_payment_detail_ho.rows.add(array).draw();
            var sumtac = tabel_bulk_payment_detail_ho.column( 6 ).data().sum();
            var sumtacMoney = accounting.formatMoney(sumtac, '', 2, ',', '.');
            $('#td-total-amount-bp').val(sumtacMoney);
            $('#modal-search-pengajuan-bulk-detail').modal('show');
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

function approveBulkPayment(arrayData,status,tgl_awal,tgl_akhir,user){

  $.ajax({
    url:base_url+"Controller_bulk_payment/approve_bulk_payment",
    type:'POST',
    data:{arrayData,status,tgl_awal,tgl_akhir,user},
    success:function(response){
      try {
        var response = JSON.parse(response);
        response = JSON.parse(response);
        if (response['status'] == '200') {
          alert_info('PENJURNALAN TELAH BERHASIL',function(){
           $('#filter-bulk-payment-ho').click();
         });
          console.log(response);
        }else if(response['status'] == '500'){
         alert_error(response['alert']);
         console.log(response);
         return false;
       }
       $('#btn-approve-bulk-payment-ho').prop('disabled',true);
       $('.tgl-koleksi-bpm-ho').prop('disabled',true);
       localStorage.setItem('status',0);
     }catch(e) {
      $('#loading-ajax').hide(); 
      console.log(e);
      alert_error("Galat" + e);
    }
  },error:function(response){
    console.log(response);
  }
});
}

function getRole(){
  $.ajax({
    url : base_url + "Controller_home/get_detail_user",
    cache : false,
    async :false,
    success : function(response){
      try{
        console.log(response);
        var role_data = $.parseJSON(response);
        var flagrole = true;
        $.each(role_data, function(i){
          if (role_data[i].role_code  === 'FIN_HO_BLK') {
            localStorage.setItem('role', true);
            flagrole = false;
          }else if(flagrole){
           localStorage.setItem('role', false);
         }
       });
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
function getDate(){
 today = new Date();
 var dd = today.getDate();
 var mm = today.getMonth() + 1; 
 var yyyy = today.getFullYear();
 var m_names = new Array("", "Jan", "Feb", "Mar",
  "Apr", "May", "Jun", "Jul", "Aug", "Sep",
  "Oct", "Nov", "Dec");

 today = dd + '-' + m_names[mm] + '-' + yyyy;
}
}