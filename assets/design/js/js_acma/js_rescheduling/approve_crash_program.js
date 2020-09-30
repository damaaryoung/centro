    //Datatable tab approve
    var table_tab_approve_cp = $('#table-tab-approve-cp').DataTable({
      paging: false,
      deferRender: true,
      scrollY: "200px",
      scrollX : true,
      scrollCollapse: true,
      "columnDefs":[
      {
        "targets": [ 7,8,9 ],
        "visible": false
      }
      ]
    });
    //tanggal tab approve
    $('#div-tgl-awal-cp').datetimepicker({
      format: 'DD-MMM-YYYY',
      allowInputToggle: true,
      maxDate: new Date()
    }).on("dp.change", function(e) {
      var date = e.date;
      var dDate = date._d;
      var new_date = new Date(dDate);
      new_date.setDate(new_date.getDate() + 30);

      $('#div-tgl-akhir-cp').data("DateTimePicker").minDate(dDate);

      if (new_date > new Date(today)) {
        new_date = new Date(today);
      }
      $('#div-tgl-akhir-cp').data("DateTimePicker").maxDate(new_date);
      $('#div-tgl-akhir-cp').data("DateTimePicker").date(new_date);

    });

    $('#div-tgl-akhir-cp').datetimepicker({
      format: 'DD-MMM-YYYY',
      allowInputToggle: true,
      maxDate: new Date()
    });

    $('#table-tab-approve-cp').on('click','.print-batch',function(){
      if (check_session() === 'true') {
       data = table_tab_approve_cp.row($(this).closest('tr')).data();
       var id_batch = data[7];
       var batch_no = data[1];
       $('#id-batch-appr').val(id_batch);
       ajax_print_batch_appr(batch_no,id_batch);
     }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
      });
    }
  });

    $('#table-tab-approve-cp').on('click','td',function(){
     var checked_row = table_tab_approve_cp.row($(this).parents('tr') ).data();
     $('#id-createdby_appr-cp').val(checked_row[8]);
     $('#id-uploadedby_appr-cp').val(checked_row[9]);
   });


    // if (localStorage.getItem('role_ar_rem') == 'true'){
    // }else{
    //   table_tab_approve_cp.column( 0 ).visible( false );
    // }

    $('#table-tab-approve-cp').on('click','.checkbox-appr-cp',function(){
      var checked_all = true;
      $('.checkbox-appr-cp').each(function(){
        if (this.checked == false) {
          checked_all = false;  
        }
      });

      if (checked_all == false) {
        $('#chk-all-appr-cp').prop('checked',false);
      }else{
       $('#chk-all-appr-cp').prop('checked',true);
     }

   });

    $('#btn-clear-appr-cp').click(function(){
     table_tab_approve_cp.clear().draw();
     $('#id-uploadedby-cp,#id-createdby-cp,#inp-upload-date-cp,#inp-to-date-cp').val('');
     $('#chk-all-appr-cp').prop('checked',false);
     $('#div-tgl-akhir-cp,#div-tgl-awal-cp').removeClass('has-error');
     $('#id-createdby_appr-cp').val('');
     $('#id-uploadedby_appr-cp').val('');
     $("html, body").animate({
      scrollTop: 0
    }, 400);  

   });

    $('#chk-all-appr-cp').click(function(){
     if ($('#chk-all-appr-cp').is(':checked')){
      $(':checkbox').prop('checked', true);

    }else{
      $(':checkbox').prop('checked', false);
    }
      tot_check = $('.checkbox-appr-cp1:checked').not('#chk-all-appr-cp').length;
      if (tot_check > 1) {
        if(localStorage.getItem('role_ar_rem') == 'true'){
          $('#btn-print-appr-cp').prop('disabled',true);
          $('#btn-reject-appr-cp').prop('disabled',false);
          $('#btn-approve-appr-cp').prop('disabled',false);
        }else{
         $('#btn-print-appr-cp').prop('disabled',true);
         $('#btn-reject-appr-cp').prop('disabled',true);
         $('#btn-approve-appr-cp').prop('disabled',true);
       }
     }else if (tot_check == 0){
      $('#btn-print-appr-cp').prop('disabled',true);
      $('#btn-reject-appr-cp').prop('disabled',true);
      $('#btn-approve-appr-cp').prop('disabled',true);
    }else if(tot_check == 1){
     if(localStorage.getItem('role_ar_rem') == 'true'){
      $('#btn-print-appr-cp').prop('disabled',true);
      $('#btn-reject-appr-cp').prop('disabled',false);
      $('#btn-approve-appr-cp').prop('disabled',false);
    }else{
      $('#btn-print-appr-cp').prop('disabled',false);
      $('#btn-reject-appr-cp').prop('disabled',true);
      $('#btn-approve-appr-cp').prop('disabled',true);
    }
  }

  });

    $('#table-tab-approve-cp tbody').on( 'click', 'tr', function () {
      if ( $(this).hasClass('selected') ) {
        $(this).removeClass('selected');
      }
      else {
        table_tab_approve_cp.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
      }
    } );

    var tot_check= 0;
    $('#table-tab-approve-cp tbody').on( 'click', '.checkbox-appr-cp1', function () {
      tot_check = $('.checkbox-appr-cp1:checked').not('#chk-all-appr-cp').length;
      if (tot_check > 1) {
        if(localStorage.getItem('role_ar_rem') == 'true'){
          $('#btn-print-appr-cp').prop('disabled',true);
          $('#btn-reject-appr-cp').prop('disabled',false);
          $('#btn-approve-appr-cp').prop('disabled',false);
        }else{
         $('#btn-print-appr-cp').prop('disabled',true);
         $('#btn-reject-appr-cp').prop('disabled',true);
         $('#btn-approve-appr-cp').prop('disabled',true);
       }
     }else if (tot_check == 0){
      $('#btn-print-appr-cp').prop('disabled',true);
      $('#btn-reject-appr-cp').prop('disabled',true);
      $('#btn-approve-appr-cp').prop('disabled',true);
    }else if(tot_check == 1){
     if(localStorage.getItem('role_ar_rem') == 'true'){
      $('#btn-print-appr-cp').prop('disabled',true);
      $('#btn-reject-appr-cp').prop('disabled',false);
      $('#btn-approve-appr-cp').prop('disabled',false);
    }else{
      $('#btn-print-appr-cp').prop('disabled',false);
      $('#btn-reject-appr-cp').prop('disabled',true);
      $('#btn-approve-appr-cp').prop('disabled',true);
    }
  }

} );



    $('#btn-print-appr-cp').on('click',function(){
      var index = $('.checkbox-appr-cp:checked')
      index = index[0].id;
      var id_batch = table_tab_approve_cp.data()[index][7];

      if (check_session() === 'true') {
       ajax_print_batch(id_batch);
     }else if (check_session() === 'false') {
      alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
        localStorage.clear();
        window.location.href = base_url + "Controller_login/login_view";
      });
    }
  });

    //SEARCH BATCH
    $("#btn-show-data-cp").click(function(){

      var date_from = $('#inp-upload-date-cp').val();
      var date_to = $('#inp-to-date-cp').val();
      if (date_from == '') {
        alert_warning('Pilih range tanggal awal terlebih dahulu');
        $('#div-tgl-awal-cp').addClass('has-error');
        return false;
      } else if (date_to == '') {
        alert_warning('Pilih range tanggal akhir terlebih dahulu');
        $('#div-tgl-akhir-cp').addClass('has-error');
        return false;
      }else{
        $('#div-tgl-akhir-cp,#div-tgl-awal-cp').removeClass('has-error');
        ajax_show_data(date_from,date_to);
      }

    });

    $(".btn-cp").click(function(){

      var length_ceklist_checked = $('.checkbox-appr-cp:checked').length;
      if (length_ceklist_checked < 1 ) {
        alert_warning('Ceklist salah satu data terlebih dahulu!');
        return false;
      }
      var arrayData = [];
      var dataValidasi = [];
      var user = $('#id-createdby-cp').val();
      var button_flag = this.attributes.flag.value;
      if (button_flag == '2') {
        desc = 'reject';
      }else if(button_flag == '3'){
        desc = 'approve';
      }

      $('input:checkbox:checked').not('#chk-all-appr-cp').each(function(){
        var data = table_tab_approve_cp.row($(this).closest('tr') ).data();
        arrayData.push({
          batch_id : data[7]
        });
        var status = data[3];
        dataValidasi.push(
          status
          );
      });

      if (dataValidasi.includes('REJECTED') && dataValidasi.includes('APPROVED')) {
        alert_warning('Data status REJECTED dan APPORVED tidak bisa diproses lagi, silahkan cek kembali data yang anda pilih');
        return false;
      } else if (dataValidasi.includes('REJECTED')) {
        alert_warning('Data status REJECTED tidak bisa diproses approve, silahkan cek kembali data yang anda pilih');
        return false;
      }else if (dataValidasi.includes('APPROVED')){
        alert_warning('Data status APPROVED tidak bisa diproses approve, silahkan cek kembali data yang anda pilih');
        return false;
      }

      alert_confirm('Data batch akan di'+desc+'?',function(){
       ajax_procced(arrayData,user,button_flag);
     });


    });

flag_reject = 0;
    function ajax_show_data(date_from,date_to){
     $.ajax({
      url:base_url+"Controller_crash_program/search_batch",
      type:'POST',
      data:{date_from,date_to},
      success:function(response){
        console.log(response);
        var data = $.parseJSON(response);
        data = $.parseJSON(data);
        var arrayData = [];
        if(response) {
          try {
            table_tab_approve_cp.clear().draw();
            if (data.Status == '200') {
              $.each(data['list_batch'], function(index) {
                arrayData.push([
                  '<input type="checkbox" class="checkbox-appr-cp checkbox-appr-cp1" id="'+index+'" />',
                  this['batch_no'],
                  this['doc_reference'],
                  this['status'],
                  this['total_contract'],
                  this['upload_date'],
                  '<button class="btn btn-primary print-batch"><span class="fa fa-download"></span></button>',
                  this['batch_id'],
                  this['upload_by'],
                  this['approved_by']
                  ]);
              });
              table_tab_approve_cp.rows.add(arrayData).draw();
            }else{
              if (flag_reject == 0) {
              alert_error(data.ErrorMessage);
              }else{
                flag_reject = 0;
              } 

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

   function ajax_print_batch_appr(batch_no,id_batch){
    $.ajax({
      url:base_url+"Controller_crash_program/print_batch_xls",
      data:{id_batch},
      type:'POST',
      success:function(response){
        console.log(response);
        if(response) {
          try {
            download(response.result,'Batch-'+batch_no+'.xls',"application/vnd.ms-excel");
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

  //  function ajax_print_batch_appr(id_batch){
  //   $.ajax({
  //     url:base_url+"Controller_crash_program/print_batch_appr",
  //     data:{id_batch},
  //     type:'POST',
  //     success:function(response){
  //       console.log(response);
  //       var data = $.parseJSON(response);
  //       data = $.parseJSON(data);
  //       if(response) {
  //         try {
  //          $('#data_batch').val(response);
  //          $('#id-form-print-cp').submit();
  //        }
  //        catch(e) {
  //         $('#loading-ajax').hide(); 
  //         console.log(e);
  //         alert_error("Galat" + e);
  //       }
  //     }

  //   },error:function(response){

  //     console.log(response);
  //   }
  // });
  // }

