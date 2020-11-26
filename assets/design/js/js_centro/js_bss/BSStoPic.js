$('#btn_send_pic').click(function () {
  $('#form_send_BSStoPic').modal('show');
  get_user_received_bss()
  getKartuBSS()
})

function closeFormBSStoPic() {
  $('#form_send_BSStoPic').modal('hide');
}

function get_user_received_bss() {
  $.ajax({
    url: base_url + "BSSController/get_user_received_bss",
    type: "GET",
    dataType: "json",
    success: function (respon) {
      let row = '';
      for (let i = 0; i < respon.length; i++) {
        row += `<option value="${respon[i]['user_id_received']}">${respon[i]['nama']}</option>`
      }
      $('#user_pic').append(row);
    }
  })
}

$('#send_bss_to_pic').click(function () {
  let data = {
    kartu_number_awal: $("#no_kartu_awal").val(),
    kartu_number_akhir: $("#no_kartu_akhir").val(),
    user_id_received: $("#user_pic").val()
  }
  console.log(data)

  $.ajax({
    type: "POST",
    url: base_url + "BSSController/send_bss_to_pic",
    // headers: {
    //   "Authorization": token
    // },
    dataType: "json",
    data: data,
    beforeSend: function () {
      $('#loading').show();
    },
    success: function (respon) {
      console.log(respon)
      setTimeout(function () {
        $('#form_send_BSStoPic').modal('hide');
      }, 1000);
      window.location = base_url + 'bss';
      $('#loading').hide();
    }
  });
})


function getKartuBSS() {
  $.ajax({
    url: base_url + "BSSController/getKartuBSS",
    type: "GET",
    dataType: "json",
    success: function (x) {
      console.log(x)
      let dataAutoComplete = x.map(x => {
        return {
          id: x.kartu_number,
          text: x.kartu_number
        }
      })

      $("#noawal").on("keyup", function () {
        if ($(this).val()) {
          $('#noawal').autocompleteCustom({
            data: dataAutoComplete, //theData is your JSON
            limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function (val) {
              document.getElementById('noawal').setAttribute('data-id', val)
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
          });
        }
        if (!$(this).val()) {
          $('#noawal').removeAttr('data-id');
        }
      })

      $("#noakhir").on("keyup", function () {
        if ($(this).val()) {
          $('#noakhir').autocompleteCustom({
            data: dataAutoComplete, //theData is your JSON
            limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function (val) {
              document.getElementById('noakhir').setAttribute('data-id', val)
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
          });
        }
        if (!$(this).val()) {
          $('#noakhir').removeAttr('data-id');
        }
      })

      $("#no_kartu_awal").on("keyup", function () {
        if ($(this).val()) {
          $('#no_kartu_awal').autocompleteCustom({
            data: dataAutoComplete, //theData is your JSON
            limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function (val) {
              document.getElementById('no_kartu_awal').setAttribute('data-id', val)
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
          });
        }
        if (!$(this).val()) {
          $('#no_kartu_awal').removeAttr('data-id');
        }
      })

      $("#no_kartu_akhir").on("keyup", function () {
        if ($(this).val()) {
          $('#no_kartu_akhir').autocompleteCustom({
            data: dataAutoComplete, //theData is your JSON
            limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function (val) {
              document.getElementById('no_kartu_akhir').setAttribute('data-id', val)
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
          });
        }
        if (!$(this).val()) {
          $('#no_kartu_akhir').removeAttr('data-id');
        }
      })

    }
  })
}
