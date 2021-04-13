function closeModal() {
  $('#modal_received_bss').modal('hide');
}


$('#btn_received_bss').click(function () {
  $('#loading-7').hide();
  $('#modal_received_bss').modal('show');
  $.ajax({
    url: base_url + "BSSController/get_received_bss",
    type: "GET",
    dataType: "json",
    success: function (respon) {
      $('#TableReceived').DataTable().clear();
      $('#TableReceived').DataTable().destroy();
      let obj = respon.data;
      let row = "";

      for (let i = 0; i < respon.data.length; i++) {
        let ket = "";
        if (obj[i]['keterangan'] == null) {
          ket = "";
        } else {
          ket = obj[i]['keterangan']
        }

        let approve = "";
        if (obj[i]['timeline_tgl_approved'] == null) {
          approve = "";
        } else {
          approve = obj[i]['timeline_tgl_approved']
        }


        let btn_approve = ` <button type="button" class="btn btn-success btn-sm btn-ok" data-toggle="tooltip" data-placement="top" title="OK"  
                            data-id="${obj[i]['id']}"
                            migrasi ="${obj[i]['is_migrasi']}"
                            user_id_received = "${obj[i]['user_id_received']}" 
                            kode_kantor_received = "${obj[i]['kode_kantor_received']}"
                            appoved = "Approved">
                            <i class="fa fa-check" aria-hidden="true" ></i></button> 
                            <button type="button" class="btn  btn-danger btn-sm btn-reject" data-toggle="tooltip" data-placement="top" 
                            title="REJECT" data-id="${obj[i]['id']}"
                            migrasi ="${obj[i]['is_migrasi']}"
                            user_id_received = "${obj[i]['user_id_received']}" 
                            kode_kantor_received = "${obj[i]['kode_kantor_received']}">
                            <i class="fa fa-times" aria-hidden="true"></i></button>`

        let btn_hide = `<button type="button" class="btn btn-success btn-sm btn-ok" data-toggle="tooltip" data-placement="top" title="OK" disabled>
                        <i class="fa fa-check" aria-hidden="true" ></i></button> 
                        <button type="button" class="btn  btn-danger btn-sm btn-reject" data-toggle="tooltip" data-placement="top" 
                        title="REJECT" disabled><i class="fa fa-times" aria-hidden="true"></i></button>`;
        let x = '';
        let btn_approve_kolektor = '';
        if (obj[i]['status'] == '1' || obj[i]['status'] == '2') {
          x = btn_hide;
          if (respon.jabatan == "HEAD OPERATIONAL") {
            btn_approve_kolektor = `<button type="button" class="btn btn-primary btn-sm btn-approval-kolektor" data-toggle="tooltip" data-placement="top" 
            title="Assign Kolektotor" disabled>
            <i class="fas fa-hands"></i></button> `
          }
        } else if ((respon.divisi_id == 'IT' || respon.divisi_id == 'OPERASIONAL') && obj[i]['status'] == '0') {
          x = btn_approve;
          if (respon.jabatan == "HEAD OPERATIONAL") {
            btn_approve_kolektor = `<button type="button" class="btn btn-primary btn-sm btn-approval-kolektor" data-toggle="tooltip" data-placement="top" title="Assign Kolektotor "  
                                        data-id="${obj[i]['id']}"
                                        migrasi ="${obj[i]['is_migrasi']}"
                                        user_id_received = "${obj[i]['user_id_received']}" 
                                        kode_kantor_received = "${obj[i]['kode_kantor_received']}"
                                        appoved = "ApprovedToKolektor"><i class="fas fa-hands"></i></button> `
          }
        } else {
          x = btn_hide;
        }

        let status = "";
        if (obj[i]['status'] == '1') {
          status = `<span style="color:#00AE39">${obj[i]['status_app']}</span>`;
        } else if (obj[i]['status'] == '0') {
          status = `<span style="color:#6c757d">${obj[i]['status_app']}</span>`;
        } else {
          status = `<span style="color:#D60404">${obj[i]['status_app']}</span>`;
        }
        row += ` <tr style="text-align:center">
                          <td class="no_awal">${obj[i]['kartu_number_awal']}</td>
                          <td class="no_akhir">${obj[i]['kartu_number_akhir']}</td>
                          <td class="jml">${obj[i]['jml']}</td>
                          <td class="nama_user_send" style="width: 200px;">${obj[i]['nama_user_send']}</td>
                          <td class="tujuan_ke" style="width: 200px;">${obj[i]['tujuan_ke']}</td>
                          <td class="status_app" style ="font-weight: bold;">${status}</td>
                          <td class="timeline_tgl_buat">${obj[i]['timeline_tgl_buat']}</td>
                          <td class="timeline_tgl_approved">${approve}</td>
                          <td class="keterangan" style="width: 200px;">${ket}</td>
                          <td class="action" style="width: 200px;">
                            ${btn_approve_kolektor}${x}
                          </td>
                      </tr>`
      }
      $('#TableReceived > tbody:first').html(row);

      $(document).ready(function () {
        $('#TableReceived').DataTable({
          "destroy": true,
          "scrollX": true,
          "autoWidth": false,
          "aaSorting": [],
          "searching": false,
          pageLength: 5,
          lengthMenu: [
            [5, 10, 20, -1],
            [5, 10, 20]
          ]
        });
      });
      $('#loadingModal').hide();



    }
  });
})

function serchReceived() {
  let data = {
    no_received: $('#no_received').val()
  }
  $.ajax({
    url: base_url + "BSSController/search_received_bss",
    type: "POST",
    dataType: "json",
    data: data,
    success: function (respon) {
      $('#TableReceived').DataTable().clear();
      $('#TableReceived').DataTable().destroy();
      let obj = respon.data;
      let row = "";

      for (let i = 0; i < respon.data.length; i++) {
        let ket = "";
        if (obj[i]['keterangan'] == null) {
          ket = "";
        } else {
          ket = obj[i]['keterangan']
        }

        let approve = "";
        if (obj[i]['timeline_tgl_approved'] == null) {
          approve = "";
        } else {
          approve = obj[i]['timeline_tgl_approved']
        }


        let btn_approve = ` <button type="button" class="btn btn-success btn-sm btn-ok" data-toggle="tooltip" data-placement="top" title="OK"  
                            data-id="${obj[i]['id']}"
                            migrasi ="${obj[i]['is_migrasi']}"
                            user_id_received = "${obj[i]['user_id_received']}" 
                            kode_kantor_received = "${obj[i]['kode_kantor_received']}"
                            appoved = "Approved">
                            <i class="fa fa-check" aria-hidden="true" ></i></button> 
                            <button type="button" class="btn  btn-danger btn-sm btn-reject" data-toggle="tooltip" data-placement="top" 
                            title="REJECT" data-id="${obj[i]['id']}"
                            migrasi ="${obj[i]['is_migrasi']}"
                            user_id_received = "${obj[i]['user_id_received']}" 
                            kode_kantor_received = "${obj[i]['kode_kantor_received']}">
                            <i class="fa fa-times" aria-hidden="true"></i></button>`

        let btn_hide = `<button type="button" class="btn btn-success btn-sm btn-ok" data-toggle="tooltip" data-placement="top" title="OK" disabled>
                        <i class="fa fa-check" aria-hidden="true" ></i></button> 
                        <button type="button" class="btn  btn-danger btn-sm btn-reject" data-toggle="tooltip" data-placement="top" 
                        title="REJECT" disabled><i class="fa fa-times" aria-hidden="true"></i></button>`;
        let x = '';
        let btn_approve_kolektor = '';
        if (obj[i]['status'] == '1' || obj[i]['status'] == '2') {
          x = btn_hide;
          if (respon.jabatan == "HEAD OPERATIONAL") {
            btn_approve_kolektor = `<button type="button" class="btn btn-primary btn-sm btn-approval-kolektor" data-toggle="tooltip" data-placement="top" 
            title="Assign Kolektotor" disabled>
            <i class="fas fa-hands"></i></button> `
          }
        } else if ((respon.divisi_id == 'IT' || respon.divisi_id == 'OPERASIONAL') && obj[i]['status'] == '0') {
          x = btn_approve;
          if (respon.jabatan == "HEAD OPERATIONAL") {
            btn_approve_kolektor = `<button type="button" class="btn btn-primary btn-sm btn-approval-kolektor" data-toggle="tooltip" data-placement="top" title="Assign Kolektotor "  
                                        data-id="${obj[i]['id']}"
                                        migrasi ="${obj[i]['is_migrasi']}"
                                        user_id_received = "${obj[i]['user_id_received']}" 
                                        kode_kantor_received = "${obj[i]['kode_kantor_received']}"
                                        appoved = "ApprovedToKolektor"><i class="fas fa-hands"></i></button> `
          }
        } else {
          x = btn_hide;
        }

        let status = "";
        if (obj[i]['status'] == '1') {
          status = `<span style="color:#00AE39">${obj[i]['status_app']}</span>`;
        } else if (obj[i]['status'] == '0') {
          status = `<span style="color:#6c757d">${obj[i]['status_app']}</span>`;
        } else {
          status = `<span style="color:#D60404">${obj[i]['status_app']}</span>`;
        }
        row += ` <tr style="text-align:center">
                          <td class="no_awal">${obj[i]['kartu_number_awal']}</td>
                          <td class="no_akhir">${obj[i]['kartu_number_akhir']}</td>
                          <td class="jml">${obj[i]['jml']}</td>
                          <td class="nama_user_send" style="width: 200px;">${obj[i]['nama_user_send']}</td>
                          <td class="tujuan_ke" style="width: 200px;">${obj[i]['tujuan_ke']}</td>
                          <td class="status_app" style ="font-weight: bold;">${status}</td>
                          <td class="timeline_tgl_buat">${obj[i]['timeline_tgl_buat']}</td>
                          <td class="timeline_tgl_approved">${approve}</td>
                          <td class="keterangan" style="width: 200px;">${ket}</td>
                          <td class="action" style="width: 200px;">
                            ${btn_approve_kolektor}${x}
                          </td>
                      </tr>`
      }
      $('#TableReceived > tbody:first').html(row);

      $(document).ready(function () {
        $('#TableReceived').DataTable({
          "destroy": true,
          "scrollX": true,
          "autoWidth": false,
          "aaSorting": [],
          "searching": false,
          pageLength: 5,
          lengthMenu: [
            [5, 10, 20, -1],
            [5, 10, 20, 'Todos']
          ]
        });
      });
      $('#loadingModal').hide();

    }
  });
}

$('#TableReceived').on('click', '.btn-reject', function () {
  $('#loading-5').hide();
  if (confirm("Konfirmasi,Yakin Anda ingin reject BSS ini ??") == true) {
    $('#formApproval').modal('show');
    $('#id').val(this.getAttribute('data-id'))
    $('#no_awal').val($(this).parents("tr").find('td.no_awal').text())
    $('#no_akhir').val($(this).parents("tr").find('td.no_akhir').text())
    $('#nama_user_send').val($(this).parents("tr").find('td.nama_user_send').text())
    $('#is_migrasi').val(this.getAttribute('migrasi'))
    $('#user_id_received').val(this.getAttribute('user_id_received'))
    $('#kode_kantor_received').val(this.getAttribute('kode_kantor_received'))
    $('#appoved').val(this.getAttribute('appoved'))
  } else {
    return false;
  }

});


// send approval reject
$('#send_approval_reject').click(function () {
  let data = {
    id: $("#id").val(),
    no_awal: $("#no_awal").val(),
    no_akhir: $("#no_akhir").val(),
    nama_user_send: $("#nama_user_send").val(),
    is_migrasi: $("#is_migrasi").val(),
    user_id_received: $('#user_id_received').val(),
    kode_kantor_received: $('#kode_kantor_received').val(),
    keterangan: $('#message-text').val(),
    appoved: "Reject"
  }
 
  $.ajax({
    url: base_url + "BSSController/insertReceivedApproved",
    type: "POST",
    dataType: "json",
    data: data,
    beforeSend: function () {
      $('#loading-5').show();
    },
    success: function (respon) {
      toastr["success"](respon.message)
      window.location = base_url + 'bss';
      $('#loading-5').hide();
    }
  })
})


//send approval ok
$('#TableReceived').on('click', '.btn-ok', function () {
  if (confirm("Konfirmasi,Yakin Anda ingin received BSS ini ??") == true) {
    let data = {
      id: this.getAttribute('data-id'),
      no_awal: $(this).parents("tr").find('td.no_awal').text(),
      no_akhir: $(this).parents("tr").find('td.no_akhir').text(),
      nama_user_send: $(this).parents("tr").find('td.nama_user_send').text(),
      is_migrasi: this.getAttribute('migrasi'),
      user_id_received: this.getAttribute('user_id_received'),
      kode_kantor_received: this.getAttribute('kode_kantor_received'),
      appoved: this.getAttribute('appoved')
    }
    insertReceived(data)
    // console.log(data)
  } else {
    return false;
  }

});

// send approval from HEAD OPERASIONAL to KOLEKTOR
$('#TableReceived').on('click', '.btn-approval-kolektor', function () {
  let data = {
    id: this.getAttribute('data-id'),
    no_awal: $(this).parents("tr").find('td.no_awal').text(),
    no_akhir: $(this).parents("tr").find('td.no_akhir').text(),
    nama_user_send: $(this).parents("tr").find('td.nama_user_send').text(),
    is_migrasi: this.getAttribute('migrasi'),
    user_id_received: this.getAttribute('user_id_received'),
    kode_kantor_received: this.getAttribute('kode_kantor_received'),
    appoved: this.getAttribute('appoved')
  }

  insertReceived(data)
})

//send approval ok to query
function insertReceived(data) {
  $.ajax({
    url: base_url + "BSSController/insertReceivedApproved",
    type: "POST",
    dataType: "json",
    data: data,
    beforeSend: function () {
      $('#loading-7').show();
    },
    success: function (respon) {
      toastr["success"](respon.message)
      window.location = base_url + 'bss';
      $('#loading-7').hide();
    }
  })
}

