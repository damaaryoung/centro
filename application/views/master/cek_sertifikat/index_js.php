<script type="text/javascript">
  $(document).ready(function(){
    tampil_data(filter='',page='');
    $( ".cari-berdasarkan" ).keyup(function() {
      var filter=$(this).val();
      tampil_data(filter,page='1');
    });
  });

  function pagination($page){
    var filter=$('.cari-berdasarkan').val();
    var page=$page;
    tampil_data(filter,page);
  }
  function tampil_data(filter='',page=''){
    $.ajax({
      url: "<?= base_url(); ?>index.php/CekSertifikat_controller/tampil_data2",
      data:{page:page,filter:filter},
      type: "POST",
      success: function(response) {
        $('.data').html(response);
      }
    });
  }

  function view($id){
    $('.bd-example-modal-lg').modal('show')
    $.ajax({
      url: "<?= base_url(); ?>index.php/CekSertifikat_controller/view",
      data:{'id':$id},
      type: "POST",
      success: function(response) {
        document.getElementById("view-data").innerHTML = response;
      }
    });
  }
  function back(){
    $(".show-data").css("display", "block");
    $(".edit-data").css("display", "none");
    $(".updated").css("display", "block");
    $(".save").css("display", "none");
    $(".back").css("display", "none");
  }
  function ubah(){
    $(".show-data").css("display", "none");
    $(".edit-data").css("display", "block");
    $(".updated").css("display", "none");
    $(".save").css("display", "block");
    $(".back").css("display", "block");
    $(function () {
      $('.check-ajb').click(function(){
        if(document.getElementById('check-ajb').checked == true){
           $(".nomor-ajb").css("display", "block");
         }else {
           $(".nomor-ajb").css("display", "none");
           $('#nomor-ajb-val').val("");
         }
      })
      $('.check-imb').click(function(){
        if(document.getElementById('check-imb').checked == true){
           $(".nomor-imb").css("display", "block");
         }else {
           $(".nomor-imb").css("display", "none");
           $('#nomor-imb-val').val("");
         }
      })
      $('.check-sppt').click(function(){
        if(document.getElementById('check-sppt').checked == true){
           $(".nomor-sppt").css("display", "block");
         }else {
           $(".nomor-sppt").css("display", "none");
           $('#nomor-sppt-val').val("");
         }
      })
      $('.check-sht').click(function(){
        if(document.getElementById('check-sht').checked == true){
           $(".nomor-sht").css("display", "block");
         }else {
           $(".nomor-sht").css("display", "none");
           $('#nomor-sht-val').val("");
         }
      })
      $('.check-stts').click(function(){
        if(document.getElementById('check-stts').checked == true){
           $(".nomor-stts").css("display", "block");
         }else {
           $(".nomor-stts").css("display", "none");
           $('#nomor-stts-val').val("");
         }
      })
      $('.check-ssb').click(function(){
        if(document.getElementById('check-ssb').checked == true){
           $(".nomor-ssb").css("display", "block");
         }else {
           $(".nomor-ssb").css("display", "none");
           $('#nomor-ssb-val').val("");
         }
      })
      $.validator.setDefaults({
        submitHandler: function () {
          var data=$('#quickForm').serialize();
          // start at ajax updated
          $.ajax({
            url: "<?= base_url(); ?>index.php/CekSertifikat_controller/updated",
            data:data,
            type: "POST",
            beforeSend: function() {
                $('.spinner').css("display", "block");
                $('.save').css("display", "none");
            },
            success: function(response) {
              alert(response);
              Swal.fire(
                'Berhasil Tersimpan.',
                'Perubahan Data Tersimpan.',
                'success'
              )
              $('.spinner').css("display", "none");
              $('.save').css("display", "block");
              $('.bd-example-modal-lg').modal('hide');
            }
          });
          // end at ajax updated
        }
      });
      $('#quickForm').validate({
        rules: {
          nama: {
            required: true,
          },
          alamat: {
            required: true,
          },
          no_shm: {
            required: true,
          },
          nomor_surat_ukur: {
            required: true,
          },
          tgl_sertifikat: {
            required: true,
          },
          luas_tanah: {
            required: true,
          },
        },
        messages: {
          nama: "Please accept our nama",
          alamat: "Please accept our alamat",
          no_shm: "Please accept our no_shm",
          nomor_surat_ukur: "Please accept our nomor surat ukur",
          tgl_sertifikat: "Please accept our luas tanah",
          luas_tanah: "Please accept our luas tanah",
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
          error.addClass('invalid-feedback');
          element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
          $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element).removeClass('is-invalid');
        }
      });
    });
  }

  //function untuk esport excel
  function view_modal_excell(){
    $('.bd-example-modal-lg').modal('show')
    $.ajax({
      url: "<?= base_url(); ?>index.php/CekSertifikat_controller/exportExcelModal",
      data:{'id':''},
      type: "POST",
      success: function(response) {
        document.getElementById("view-data").innerHTML = response;
      }
    });
  }
  
  function dateValidation(){
    var dari_tgl = $("#dari_tgl").val();
    var sampai_tgl = '';
    console.log(dari_tgl);

    $('#sampai_tgl').prop("disabled", false);
    $('#sampai_tgl').prop("min", dari_tgl);

    sampai_tgl = $("#sampai_tgl").val();
  }

  
</script>
