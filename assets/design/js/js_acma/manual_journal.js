console.log($('#branch-id-mj').html());
var branch_id_mj = $('#branch-id-mj').html();
var branch_name_mj = $('#branch-name-mj').html();
var option_major = '';
var row_table_mj = 0;
var id_debit_mj = 0;
var id_kredit_mj = 0;
// var option_portfolio = '';
var pilih_data_mj = '';
var pilih_account = '';
var add_cond = '';
var id_kode_akun = '';
var id_desk_akun = '';
var saldo_debit_mj = 0;
var saldo_kredit_mj = 0;
var id_ref = '';
var pilih_reference = '';
var seq_id = 'SEQJOURNALNO';
var flag_validasi_mj = 0;

if (branch_id_mj !== '0000') {
  console.log('Cabang');
  $('#ho-mj').hide();
  $('#cabang-mj').show();
  // $('#inp-branch-id-mj').val(branch_id_mj);
  // $('#inp-branch-name-mj').val(branch_name_mj);
  $('#inp-branch-mj').val(branch_id_mj+' - '+branch_name_mj);
  // $('#slc-branch-mj').prop('disabled', true);
  // $('#slc-branch-mj').html('<option value = "'+branch_id_mj+'">'+branch_id_mj+' - '+branch_name_mj+'</option');
}

$('.tgl-entry-mj').datetimepicker({
  format: 'DD-MMM-YYYY',
  allowInputToggle: true,
  maxDate: new Date().format('DD-MMM-YYYY')
})

var table_data_mj = $('#table-data-mj').DataTable({
  scrollX : true,
  scrollCollapse : true,
  paging : false,
  searching : false,
  columnDefs: [
    {
      targets: [10],
      visible: false
    }/*,
    {
      targets: [6],
      visible: false
    }*/
  ]
});

get_list_major();

//=================================== DATATABLES ===================================
$('#table-data-mj').on('keydown', '.inp_angka_mj', function(e) {
  -1 !== $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) || /65|67|86|88/.test(e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey) || 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || 48 > e.keyCode || 57 < e.keyCode) && (96 > e.keyCode || 105 < e.keyCode) && e.preventDefault()
});

$('#table-data-mj').on( 'click', 'tr', function () {
  pilih_data_mj = table_data_mj.row($(this).closest('tr')).data();
});

$('#table-data-mj').on('click', '.akun-mj', function() {
  var new_add_cond = table_data_mj.row($(this).closest('tr')).data()[10];
  console.log(new_add_cond);
  if (add_cond !== new_add_cond) {
    pilih_account = '';
    $('#btn-select-account').prop('disabled', true);
    get_list_account_mj(new_add_cond);
  }else{
    pilih_account = '';
    $('#btn-select-account').prop('disabled', true);
    $('#modal-account').modal({
      show : true,
      backdrop : 'static'
    });
  }
  id_kode_akun = '#kode-akun-mj'+(this.id).substring(12, 13);
  id_desk_akun = '#desk-akun-mj'+(this.id).substring(12, 13);
});

$('#table-data-mj').on('click', '.ref-mj', function() {
  $('#modal-reference').modal({
    show : true,
    backdrop : 'static'
  });
  id_ref = '#ref-mj'+(this.id).substring(6, 7);
  console.log(id_ref);
});

$('#table-data-mj').on('change', '.debit-mj', function() {
  var total_debit_mj = 0;
  var debit_mj = 0;
  // console.log('id_debit_mj = '+id_debit_mj);
  for (var i = 0; i < id_debit_mj; i++) {
    // console.log('total_debit_mj = '+total_debit_mj);
    console.log('debit-mj'+i+' = '+$('#debit-mj'+i).val());
    if ($('#debit-mj'+i).val() == '') {
      total_debit_mj += 0;
      debit_mj = 0;
    }else{
      total_debit_mj += parseInt($('#debit-mj'+i).val());
      debit_mj = parseInt($('#debit-mj'+i).val());
    }
    if ($('#debit-mj'+i).is(':enabled')) {
      $('#debit-mj'+i).val(debit_mj);
    }
    // $('#debit-mj'+i).val(accounting.formatMoney(debit_mj, '', 2, ',', '.'));
    debit_mj = 0;
  }
  // console.log('total_debit_mj akhir = '+total_debit_mj);
  // $('#total-debit-mj').val(total_debit_mj);
  saldo_debit_mj = total_debit_mj;
  $('#total-debit-mj').val(accounting.formatMoney(total_debit_mj, '', 2, ',', '.'));
});

$('#table-data-mj').on('change', '.kredit-mj', function() {
  var total_kredit_mj = 0;
  var kredit_mj = 0;
  // console.log('id_kredit_mj = '+id_kredit_mj);
  for (var i = 0; i < id_kredit_mj; i++) {
    // console.log('total_kredit_mj = '+total_kredit_mj);
    console.log('kredit-mj'+i+' = '+$('#kredit-mj'+i).val());
    if ($('#kredit-mj'+i).val() == '') {
      total_kredit_mj += 0;
      kredit_mj = 0;
    }else{
      total_kredit_mj += parseInt($('#kredit-mj'+i).val());
      kredit_mj = parseInt($('#kredit-mj'+i).val());
    }
    if ($('#kredit-mj'+i).is(':enabled')) {
      $('#kredit-mj'+i).val(kredit_mj);
    }
    // $('#debit-mj'+i).val(accounting.formatMoney(debit_mj, '', 2, ',', '.'));
    kredit_mj = 0;
  }
  // console.log('total_kredit_mj akhir = '+total_kredit_mj);
  // $('#total-kredit-mj').val(total_kredit_mj);
  saldo_kredit_mj = total_kredit_mj;
  $('#total-kredit-mj').val(accounting.formatMoney(total_kredit_mj, '', 2, ',', '.'));
});

var table_account_mj = $('#table-account').DataTable();
$('#table-account').on( 'click', 'tr', function () {
  if ( $(this).hasClass('selected') ) {
    $(this).removeClass('selected');
    pilih_account = '';
    $('#btn-select-account').prop('disabled', true);
  }
  else {
    table_account_mj.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btn-select-account').prop('disabled', false);
    pilih_account = table_account_mj.row( this ).data();
  }
});

$('#table-account').on( 'dblclick', 'tr', function () {
  var data = table_data_mj.rows().data();
  var show_hide_ref = 0;
  pilih_account = table_account_mj.row( this ).data();
  console.log(pilih_account);
  $('#modal-account').modal('hide');
  $(id_kode_akun).val(pilih_account[0]);
  $(id_desk_akun).val(pilih_account[1]);
  /*$.each(data, function(index){
    if ($('#kode-akun-mj'+index).val() == '22039999') {
      show_hide_ref = 1;
    }
  })
  if ( show_hide_ref == 1 ) {
    table_data_mj.column( 6 ).visible( true );
    show_hide_ref = 0;
  }else{
    table_data_mj.column( 6 ).visible( false );
    show_hide_ref = 0;
  }*/
});

$('#btn-select-account').click(function(){
  var show_hide_ref = 0;
  $('#modal-account').modal('hide');
  if ((pilih_account == null)||(pilih_account == '')) {
    $(id_kode_akun).val('');
    $(id_desk_akun).val('');
  }else{
    $(id_kode_akun).val(pilih_account[0]);
    $(id_desk_akun).val(pilih_account[1]);
    /*$.each(data, function(index){
      if ($('#kode-akun-mj'+index).val() == '22039999') {
        show_hide_ref = 1;
      }
    })
    if ( show_hide_ref == 1 ) {
      table_data_mj.column( 6 ).visible( true );
    show_hide_ref = 0;
    }else{
      table_data_mj.column( 6 ).visible( false );
    show_hide_ref = 0;}*/
  }
});

var table_reference_mj = $('#table-reference').DataTable({
  paging : false,
  searching : false
});

$('#table-reference').on( 'click', 'tr', function () {
  if ( $(this).hasClass('selected') ) {
    $(this).removeClass('selected');
    pilih_reference = '';
    $('#btn-select-reference').prop('disabled', true);
  }
  else {
    table_reference_mj.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    $('#btn-select-reference').prop('disabled', false);
    pilih_reference = table_reference_mj.row( this ).data();
  }
});

$('#table-reference').on( 'dblclick', 'tr', function () {
  pilih_reference = table_reference_mj.row( this ).data();
  console.log(pilih_reference);
  $('#modal-reference').modal('hide');
  $(id_ref).val(pilih_reference[0]);
});

$('#btn-select-reference').click(function(){
  $('#modal-reference').modal('hide');
  if ((pilih_reference == null)||(pilih_reference == '')) {
    $(id_ref).val('');
  }else{
    $(id_ref).val(pilih_reference[0]);
  }
});

$('#table-data-mj').on('click', '.btn-hapus-cc', function() {
  var cc_delete = table_data_mj.row($(this).closest('tr')).data()[0];
  var data = table_data_mj.rows().data();
  // table_data_mj.row(0).remove().draw();
  // table_data_mj.row(1).remove().draw();
  var index = 0;
  $.each(data, function(i){
    if ( this[0] == cc_delete ) {
      table_data_mj.row(index).remove().draw();
    } else {
      index += 1;
    }
  });
});


//=================================== ONCLICK ===================================
$('#btn-search-journal').click(function(){
  var journal_no = $('#inp-no-journal-mj').val();
  if ($('#inp-no-journal-mj').val() == '' || journal_no == null) {
    alert_error('Silahkan masukkan No Journal terlebih dahulu !');
  } else if (branch_id_mj == '0000' && $('#slc-branch-mj').val() == ''){
    alert_error('Silahkan pilih cabang terlebih dahulu !');
  } else if (journal_no.length != 13 ) {
    alert_error('Silahkan masukkan No Journal yang sesuai !');
  } else {
    detail_journal(journal_no);
  }
})

$('#btn-reset-mj').click(function(){
	reset_mj();
})

$('#btn-add-cc').click(function(){
  console.log($('#slc-classcode-mj').val());
  if ($('#slc-classcode-mj').val() == '0') {
    alert_error('Silahkan pilih <b>Class Code</b> terlebih dahulu !');
  }else{
    get_list_detail_class_code_mj($('#slc-classcode-mj').val());
  }
  $('#btn-journal-mj').prop('disabled', false);
  $('#total-debit-mj').val(accounting.formatMoney(saldo_debit_mj, '', 2, ',', '.'));
  $('#total-kredit-mj').val(accounting.formatMoney(saldo_kredit_mj, '', 2, ',', '.'));
});

$('#btn-journal-mj').click(function(){
  flag_validasi_mj = 0;
  console.log(saldo_debit_mj);
  console.log(saldo_kredit_mj);
  if ($('#inp-tgl-entry-mj').val() == '') {
    alert_error('Tanggal Entry Tidak Boleh Kosong!');
  }else if ((saldo_debit_mj == 0) && (saldo_kredit_mj == 0)) {
    alert_error('Jumlah Tidak Boleh 0 !');
  }else if (saldo_debit_mj !== saldo_kredit_mj) {
    alert_error('Jumlah Tidak Balance !');
  }else if (saldo_debit_mj < 0) {
    alert_error('Jumlah Tidak Boleh Negatif !');
  }else {
    if (check_session() === 'true') {
      journal_mj();
    } else {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
      });
    }
  }
});

$('#btn-cari-ref').click(function(){
  var cari_ref = $('#inp-cari-ref').val();
  if ((cari_ref == '')||(cari_ref == null)||(cari_ref.length < 7)) {
    alert_error('Mohon input minimal 7 karakter !');
  }else{
    get_list_reference_no_mj(cari_ref);
  }
});

//=================================== ON CHANGE ==============================
$('input[type=radio][name=filter_mjh]').change(function() {
    if (this.value == 'snj') {
      reset_mj();
      get_list_major();
      console.log('new journal');
    } else if (this.value == 'ssj') {
      $('.new-inp, .slc-mj').prop('disabled', true);
      $('.search').prop('disabled', false);
      $('.slc-mj').html('<option>--SILAHKAN PILIH--</option>');
      $('#btn-search-journal').prop('disabled', false);
      $('#btn-add-cc').prop('disabled', true);
      console.log('search journal');
    }
});

$('#slc-major-mj').change(function() {
  console.log($('#slc-major-mj').val());
  if ($('#slc-major-mj').val() == '0') {
    $('#slc-submajor-mj').html('<option value = "0">--SILAHKAN PILIH--</option>');
    $('#slc-classcode-mj').html('<option value = "0">--SILAHKAN PILIH--</option>');
  }else{
    $('#slc-classcode-mj').html('<option value = "0">--SILAHKAN PILIH--</option>');
    get_list_sub_major_mj($('#slc-major-mj').val());
  }
  table_data_mj.clear().draw();
});

$('#slc-submajor-mj').change(function() {
  console.log($('#slc-submajor-mj').val());
  if ($('#slc-submajor-mj').val() == '0') {
    // $('#slc-classcode-mj').prop('disabled', true);
    $('#slc-classcode-mj').html('<option value = "0">--SILAHKAN PILIH--</option>');
    // $('#btn-add-cc').prop('disabled', true);
  }else{
    get_list_class_code_mj($('#slc-major-mj').val(),$('#slc-submajor-mj').val());
  }
  table_data_mj.clear().draw();
});

//=================================== FUNCTION ===================================
// function hilang_spasi(string) {
//     return string.split(' ').join('');
// };//tutup function hilang_spasi()

function generate_memo_no_mj(){
  // var option = '<option>--SILAHKAN PILIH--</option>';
  // var option = '';
  $.ajax({
    url: "Controller_manual_journal/generate_memo_no",
    type: 'POST',
    dataType: 'JSON',
    data:{
        "branch_id" : branch_id_mj,
        "seq_id" : seq_id
    },
    success: function(response){ 
      console.log(response);
      
      if (response) {
        try{
          var status = response['status'];
          if (status) {
            if (option_major == '') {
              $.each(response['listMajor'], function(index){
                option_major +='<option value = "'+this["acctConstName"]+'">'+this["major"]+' </option>';
              });
              $('#slc-major-mj').html('<option value = "0">--SILAHKAN PILIH--</option>'+option_major);
            }
            var memo_no = response['memoNo'];
            $('#inp-no-journal-mj').val(memo_no);
            $('#inp-tgl-entry-mj').val(new Date().format('dd-mmm-yyyy')); // HH:mm:ss
          }else{
            alert_error(response['message']);
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
};//tutup function generate_memo_no_mj()

function get_list_major(){
  $.ajax({
    url: "Controller_manual_journal/get_list_major",
    type: 'GET',
    dataType: 'JSON',
    success: function(response){ 
      console.log(response);
      
      if (response) {
        try{
          var status = response['status'];
          if (status) {
            if (option_major == '') {
              $.each(response['listMajor'], function(index){
                option_major +='<option value = "'+this["acctConstName"]+'">'+this["major"]+' </option>';
              });
              $('#slc-major-mj').html('<option value = "0">--SILAHKAN PILIH--</option>'+option_major);
            }
            // $('#inp-tgl-entry-mj').val(new Date().format('dd-mmm-yyyy')); // HH:mm:ss
          }else{
            alert_error(response['message']);
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

function get_list_sub_major_mj(major){
  var option = '<option value = "0">--SILAHKAN PILIH--</option>';
  $.ajax({
    url: "Controller_manual_journal/get_list_sub_major",
    type: 'POST',
    dataType: 'JSON',
    data:{
        "acct_const_name" : major
    },
    success: function(response){ 
      console.log(response);
      
      if (response) {
        try{
          var status = response['status'];
          if (status) {
            if (response['listSubMajor'] !== null) {
              $.each(response['listSubMajor'], function(index){
                option += '<option value = "'+this["subMajor"]+'">'+this["acctBriefDesc"]+' </option>';
              });
              $('#slc-submajor-mj').html(option);
              // $('#slc-submajor-mj').prop('disabled', false);
              // $('#slc-classcode-mj').prop('disabled', true);
              // $('#slc-classcode-mj').html('<option value = "0">--SILAHKAN PILIH--</option>');
            }else{
              alert_error('List Sub Major Kosong');
            }
          }else{
            alert_error(response['message']);
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

function get_list_class_code_mj(major, sub_major){
  var option = '<option value = "0">--SILAHKAN PILIH--</option>';
  $.ajax({
    url: "Controller_manual_journal/get_list_class_code",
    type: 'POST',
    dataType: 'JSON',
    data:{
        "acct_const_name" : major,
        "acct_brief_desc" : sub_major
    },
    success: function(response){ 
      console.log(response);
      
      if (response) {
        try{
          var status = response['status'];
          if (status) {
            if (response['listClassCode'] !== null) {
              $.each(response['listClassCode'], function(index){
                option += '<option value = "'+this["classCode"]+'">'+this["acctInterfaceGroup"]+' </option>';
              });
              $('#slc-classcode-mj').html(option);
              // $('#slc-classcode-mj').prop('disabled', false);
            }else{
              alert_error('List Class Code Kosong');
            }
          }else{
            alert_error(response['message']);
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

function get_list_detail_class_code_mj(class_code){
  // class_code = 'GJ KOREKSI';
  var option_portfolio = '';
  var kode_akun_mj;
  var debit;
  var kredit;
  $.ajax({
    url: "Controller_manual_journal/get_list_detail_class_code",
    type: 'POST',
    dataType: 'JSON',
    data:{
        "acct_interface_group" : class_code
    },
    success: function(response){ 
      console.log(response);
      
      if (response) {
        try{
          if (response['status']) {

              $.each(response['listPortfolioIn'], function(index){
                option_portfolio += '<option value = "'+this["portfolioCode"]+'">'+this["portfolioCode"]+' - '+this["portfolioDesc"]+' </option>';
              });

              $.each(response['listDetailClassCode'], function(index){
                if (class_code == 'GJ KOREKSI') {
                  kode_akun_mj = '<input type="text" class="form-control akun-mj" id="kode-akun-mj'+row_table_mj+'" style="width:75px;" readonly><button type="button" class="btn btn-inline btn-default akun-mj" style="width:30px; border: none;"><span class="fa fa-search"></span></button>';
                }else{
                  kode_akun_mj = '<input type="text" class="form-control" id="kode-akun-mj'+row_table_mj+'" disabled>';
                }
                if (this['acctDCTypes'] == 'D') {
                  debit = '<input type="text" class="form-control inp_angka_mj debit-mj" id="debit-mj'+id_debit_mj+'">';
                  kredit = '<input type="text" class="form-control" id="kredit-mj'+id_kredit_mj+'" disabled>';
                  id_debit_mj += 1;
                  id_kredit_mj += 1;
                }else{
                  debit = '<input type="text" class="form-control" id="debit-mj'+id_debit_mj+'" disabled>';
                  kredit = '<input type="text" class="form-control inp_angka_mj kredit-mj" id="kredit-mj'+id_kredit_mj+'">';
                  id_debit_mj += 1;
                  id_kredit_mj += 1;
                }
                table_data_mj.row.add([
                  class_code,
                  this['acctBriefDesc'],
                  '<input type="text" class="form-control" id="ket-mj'+row_table_mj+'" style="width:170px;">',
                  kode_akun_mj,
                  '<input type="text" class="form-control" id="desk-akun-mj'+row_table_mj+'" style="width:170px;" readonly>',
                  '<select class="form-control" id="kode-portfolio-mj'+row_table_mj+'"><option value = "0">--SILAHKAN PILIH--</option>'+option_portfolio+'</select>',
                  '<input type="text" class="form-control ref-mj" id="ref-mj'+row_table_mj+'" style="width:100px;" readonly><button type="button" class="btn btn-inline btn-default ref-mj" style="width:30px; border: none;"><span class="fa fa-search"></span></button>',
                  debit,
                  kredit,
                  "<a type='button' class='btn btn-transparent btn-xs tooltips btn-hapus-cc '><i class='fa fa-trash' style='color: #E91E63;'></i></a>",
                  this['acctAddCond']
                ]).draw(false);

                if( $('#slc-classcode-mj').val() == 'GJ KOREKSI' ){
                  $('#inp-no-ref1-mj').val(branch_id_mj + new Date().format('yy') + 'M');
                }else{
                  $('#inp-no-ref1-mj').val(branch_id_mj + new Date().format('yy') + 'G');
                }

                // table_data_mj.column( 6 ).visible( false );

                row_table_mj += 1;
              });

              $("#table-data-mj ref-mj").attr('maxlength','20');
              // console.log(row_table_mj);
          }else{
            alert_error(response['message']);
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

function get_list_account_mj(p_add_cond){
  $.ajax({
    url: "Controller_manual_journal/get_list_account",
    type: 'POST',
    dataType: 'JSON',
    data:{
        "branch_id" : branch_id_mj,
        "add_cond" : p_add_cond
    },
    success: function(response){ 
      response = $.parseJSON(response);
      console.log(response);
      
      if (response) {
        try{
          var status = response['status'];
          if (status) {
            table_account_mj.clear().draw();
            $.each(response['listAccount'], function(index){
              table_account_mj.row.add([
                   this['acctCode'],
                   this['acctDesc']
                ]).draw(false);
            });

            $('#modal-account').modal({
              show : true,
              backdrop : 'static'
            });

            add_cond = p_add_cond;

          }else{
            alert_error(response['message']);
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

function get_list_reference_mj(reference_mj){
  $.ajax({
    url: "Controller_manual_journal/get_list_reference",
    type: 'POST',
    dataType: 'JSON',
    data:{
        "reference" : reference_mj
    },
    success: function(response){ 
      response = $.parseJSON(response);
      console.log(response);
      
      if (response) {
        try{
          var status = response['status'];
          if (status) {
            if (response['listReference'] == null) {
              alert_error('Data tidak ada');
            }else{
              table_reference_mj.clear().draw();
              $.each(response['listReference'], function(index){
                table_account_mj.row.add([
                     this['reference']
                  ]).draw(false);
              });
            }
          }else{
            alert_error(response['message']);
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

function journal_mj(){
  console.log(branch_id_mj);
  var data = table_data_mj.rows().data();
  var list_journal = [];
  var reference_no = $('#inp-no-ref1-mj').val() + $('#inp-no-ref2-mj').val();
  var tgl_journal_mj = new Date($('#inp-tgl-entry-mj').val()).format('dd/mm/yyyy');
  // console.log(data);
  $.each(data, function(index){
    // console.log('index ke : '+index);
    if ($('#ket-mj'+index).val() == '') {
      alert_error('Masih ada keterangan yang kosong !');
      flag_validasi_mj = 1;
    }else if ($('#kode-akun-mj'+index).val() == '') {
      alert_error('Masih ada Kode Akun yang kosong !');
      flag_validasi_mj = 1;
    }else if ($('#kode-portfolio-mj'+index).val() == '') {
      alert_error('Masih ada Portfolio yang kosong !');
      flag_validasi_mj = 1;
    }else{
      if ($('#kode-akun-mj'+index).val() == '22039999') {
        if ($('#debit-mj'+index).is(':enabled')){
          if ($('#ref-mj'+index).val() == '') {
            alert_error('Akun Hutang Lain-lain sisi debit harus diisi No Reff Inisiate dikolom Referensi !');
            flag_validasi_mj = 1;
          }else{
            // console.log(data[index][0]);
            // console.log(data[index][1]);
            // console.log($('#ket-mj'+index).val());
            // console.log($('#kode-akun-mj'+index).val());
            // console.log($('#desk-akun-mj'+index).val());
            // console.log($('#kode-portfolio-mj'+index).val());
            // console.log($('#ref-mj'+index).val());
            // console.log($('#debit-mj'+index).val());
            list_journal.push({
              classCode : data[index][0],
              class_code_desc : data[index][1],
              notes : ($('#ket-mj'+index).val()).substring(0, 19),
              accountCode : $('#kode-akun-mj'+index).val(),
              portfolioCode : $('#kode-portfolio-mj'+index).val(),
              referenceNo : reference_no,
              reference : $('#ref-mj'+index).val(),
              dcTypes : 'D',
              baseAmount : parseInt($('#debit-mj'+index).val())
            });
          }
        }else if ($('#kredit-mj'+index).is(':enabled')) {}{
          if ($('#ref-mj'+index).val() == '') {
            alert_error('Akun Hutang Lain-lain sisi Kredit harus diisi No Reff Inisiate dikolom Referensi');
            flag_validasi_mj = 1;
          }else{
            // console.log(data[index][0]);
            // console.log(data[index][1]);
            // console.log($('#ket-mj'+index).val());
            // console.log($('#kode-akun-mj'+index).val());
            // console.log($('#desk-akun-mj'+index).val());
            // console.log($('#kode-portfolio-mj'+index).val());
            // console.log($('#ref-mj'+index).val());
            // console.log($('#kredit-mj'+index).val());
            list_journal.push({
              classCode : data[index][0],
              class_code_desc : data[index][1],
              notes : ($('#ket-mj'+index).val()).substring(0, 19),
              accountCode : $('#kode-akun-mj'+index).val(),
              portfolioCode : $('#kode-portfolio-mj'+index).val(),
              referenceNo : reference_no,
              reference : $('#ref-mj'+index).val(),
              dcTypes : 'C',
              baseAmount : parseInt($('#kredit-mj'+index).val())
            });
          }
        }
      }else{
        var d_c_type = '';
        var amount = 0;
        // console.log(data[index][0]);
        // console.log(data[index][1]);
        // console.log($('#ket-mj'+index).val());
        // console.log($('#kode-akun-mj'+index).val());
        // console.log($('#desk-akun-mj'+index).val());
        // console.log($('#kode-portfolio-mj'+index).val());
        // console.log($('#ref-mj'+index).val());
        if ($('#debit-mj'+index).is(':enabled')){
          // console.log($('#debit-mj'+index).val());
          d_c_type = 'D';
          amount = $('#debit-mj'+index).val();
        }else if ($('#kredit-mj'+index).is(':enabled')) {
          // console.log($('#kredit-mj'+index).val());
          d_c_type = 'C';
          amount = $('#kredit-mj'+index).val();
        }
        list_journal.push({
          classCode : data[index][0],
          class_code_desc : data[index][1],
          notes : ($('#ket-mj'+index).val()).substring(0, 19),
          accountCode : $('#kode-akun-mj'+index).val(),
          portfolioCode : $('#kode-portfolio-mj'+index).val(),
          referenceNo : reference_no,
          reference : '',
          dcTypes : d_c_type,
          baseAmount : parseInt(amount)
        });
      }
    }
  })
  console.log(list_journal);

  if (flag_validasi_mj == 0) {
    var portfolio_mj = [];
    var flag_portfolio_code = 0; //0 : belum ada, 1 : sudah ada di variable portfolio_mj
    console.log(portfolio_mj);
    $.each(list_journal, function(index){ //looping berdasarkan data yang sudah di tampung ke variable list_journal
      if (portfolio_mj.length > 0) { //kondisi apabila sudah ada data di variable array portfolio_mj
        // console.log('a');
        flag_portfolio_code = 0;
        for (var a = 0; a < portfolio_mj.length; a++) {
          // console.log('b');
          if (portfolio_mj[a]['portfolio_code'] == this['portfolioCode']) {
            // console.log('c');
            if (this['dcTypes'] == 'D') {
              // console.log('d');
              portfolio_mj[a]['d_amount'] += this['baseAmount'];
            }else if (this['dcTypes'] == 'C') {
              // console.log('e');
              portfolio_mj[a]['c_amount'] += this['baseAmount'];
            }
            flag_portfolio_code = 1;
          }
        }
        if (flag_portfolio_code == 0) {
          // console.log('f');
          if (this['dcTypes'] == 'D') {
            // console.log('g');
            portfolio_mj.push({
              portfolio_code : this['portfolioCode'],
              d_amount : this['baseAmount'],
              c_amount : 0
            })
          }else if (this['dcTypes'] == 'C') {
            // console.log('h');
            portfolio_mj.push({
              portfolio_code : this['portfolioCode'],
              d_amount : 0,
              c_amount : this['baseAmount']
            })
          }
        }
      }else{
        // console.log('i');
        if (this['dcTypes'] == 'D') {
          // console.log('j');
          portfolio_mj.push({
            portfolio_code : this['portfolioCode'],
            d_amount : this['baseAmount'],
            c_amount : 0
          })
        }else if (this['dcTypes'] == 'C') {
          // console.log('k');
          portfolio_mj.push({
            portfolio_code : this['portfolioCode'],
            d_amount : 0,
            c_amount : this['baseAmount']
          })
        }
      }
      // console.log('index ke : '+index);
      // console.log(portfolio_mj);
    })
    console.log(portfolio_mj);

    var portfolio_beda = '';
    $.each(portfolio_mj, function(index){
      if (portfolio_beda == '') {
        if ((this['d_amount']) !== (this['c_amount'])) {
          portfolio_beda = this['portfolio_code'];
        }
      }
    })

    if (portfolio_beda !== '') {
      alert_error('Total Portfolio code <b>'+portfolio_beda+'</b> berbeda antara debit dan kredit , proses tidak dapat dilanjutkan !');
    }else{
      console.log('Goto Ajax');
      $.ajax({
        url: "Controller_manual_journal/journal_mj",
        type: 'POST',
        dataType: 'JSON',
        data:{
            "branch_id" : branch_id_mj,
            "tgl_journal" : tgl_journal_mj,
            "list_journal" : list_journal
        },
        success: function(response){
          // response = $.parseJSON(response);
          console.log(response);
          if (response) {
            try{
              if (response['status']) {
                alert_confirm(response['message'], function(){
                  window.open(window.href = 'Controller_manual_journal/print_journal/'+response['journalNo']);
                  reset_mj();
                  detail_journal(response['journalNo']);
                  // $('#inp-no-journal-mj').val(response['journalNo']);
                });
              }else{
                alert_error(response['message']);
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
  }
}

function detail_journal(journal_no){
  var debit;
  var kredit;
  var total_debit = 0;
  var total_kredit = 0;

  $.ajax({
    url: "Controller_manual_journal/detail_journal",
    type: 'POST',
    dataType: 'JSON',
    data:{
        "journal_no" : journal_no
    },
    success: function(response){ 
      // response = $.parseJSON(response);
      console.log(response);
      
      if (response) {
        try{
          if (response['status']) {
            table_data_mj.column( 9 ).visible( false );
            table_data_mj.clear().draw();
            $.each(response['dataJournal'], function(index){
              if (this['dcTypes'] == 'D') {
                debit = this['baseAmount'];
                total_debit += debit;
                kredit = null;
              }else{
                debit = null;
                kredit = this['baseAmount'];
                total_kredit += kredit;
              }
              table_data_mj.row.add([
                   this['classCode'],
                   this['acctBriefDesc'],
                   this['notes'],
                   this['accountCode'],
                   this['accountDesc'],
                   this['portfolioCode'],
                   this['contractNo'],
                   debit,
                   kredit,
                   null,
                   null
                ]).draw(false);
            });

            $('#slc-branch-mj').val((response['dataJournal'][0]['branchId']));
            $('#inp-tgl-entry-mj').val((response['dataJournal'][0]['transactionDate']));
            $('#inp-no-ref1-mj').val((response['dataJournal'][0]['referenceNo']).substring(0, 7));
            $('#inp-no-ref2-mj').val((response['dataJournal'][0]['referenceNo']).substring(13, 7));
            $('#slc-major-mj').html('<option>'+response['dataSelect']['acctConstName']+'</option>');
            $('#slc-submajor-mj').html('<option>'+response['dataSelect']['acctBriefDesc']+'</option>');
            $('#slc-classcode-mj').html('<option>'+response['dataSelect']['acctInterfaceGroup']+'</option>');
            $('#total-debit-mj').val(accounting.formatMoney(total_debit, '', 2, ',', '.'));
            $('#total-kredit-mj').val(accounting.formatMoney(total_kredit, '', 2, ',', '.'));
          }else{
            alert_error(response['message']);
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

function reset_mj(){
  $("#radio-dealer-drc").prop("checked", true);
  $('#slc-branch-mj').prop('disabled', false);
  $('#inp-no-journal-mj').val('').prop('disabled', true);
  $('#inp-tgl-entry-mj').val(null).prop('disabled', false);
  $('#inp-no-ref1-mj').val('').prop('disabled', true);
  $('#inp-no-ref1-mj').val('').prop('disabled', false);
  $('.slc-mj').html('<option value = "0">--SILAHKAN PILIH--</option>').prop('disabled', false);
  get_list_major();
  $('#btn-search-journal').prop('disabled', true);
  $('#btn-add-cc').prop('disabled', false);
  table_data_mj.clear().draw();

  $('html, body').animate({scrollTop:0}, 'slow');

  $('#total-debit-mj').val('');
  $('#total-kredit-mj').val('');

  option_major = '';

  saldo_debit_mj = 0;
  saldo_kredit_mj = 0;

  id_debit_mj = 0;
  id_kredit_mj = 0;
}