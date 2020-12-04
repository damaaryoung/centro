$(document).ready(function () {
  // $('#employeeTable1').DataTable({
  //   "scrollX": true,
  //   "autoWidth": false,
  //   "aaSorting": [],
  //   "searching": false,
  // });
  getAreaKerja()
  getKartuBSS()
});

function getAreaKerja() {
  $.ajax({
    url: base_url + "BSSController/getAreaKode",
    type: "GET",
    dataType: "json",
    success: function (respon) {
      let row = '';
      for (let i = 0; i < respon.length; i++) {
        row += `<option value="${respon[i]['kode_kantor']}">${respon[i]['kode_kantor']}-${respon[i]['nama_kantor']}</option>`
      }
      $('#AreaKantor').append(row);
    }
  })
}

$('#migrasi_bss').click(function () {
  let data ={
    kartu_number_awal : $('#noawal').val(),
    kartu_number_akhir : $('#noakhir').val(),
    kode_kantor_received : $('#AreaKantor').val()
  }
  $.ajax({
    url: base_url + "BSSController/migrasi",
    type: "POST",
    dataType: "json",
    data: data,
    beforeSend: function () {
      $('#loading-6').show();
    },
    success: function (respon) {
      if(respon.success == true){
        $('#form-migrasi')[0].reset()
        toastr["success"](respon.message)
        window.location = base_url + 'bss';
        $('#loading-6').hide();
     }else{
        toastr["error"](respon.message)
        $('#loading-6').hide();
     }
      
    }
  })
})
