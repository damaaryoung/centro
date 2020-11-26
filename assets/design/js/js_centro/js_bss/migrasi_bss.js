$(document).ready(function () {
  // $('#employeeTable1').DataTable({
  //   "scrollX": true,
  //   "autoWidth": false,
  //   "aaSorting": [],
  //   "searching": false,
  // });
  getAreaKerja()
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
