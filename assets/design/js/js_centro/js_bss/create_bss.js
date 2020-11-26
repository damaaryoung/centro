
function send_bss(){
    let kartu_number_awal= $("#kartu_number_awal").val();
    let kartu_number_akhir= $("#kartu_number_akhir").val();
    let area_kerja= $("#area_kerja").val();
    let selisih = (kartu_number_akhir - kartu_number_awal)+1;
    if( selisih <= 0 || selisih > 50 ) {
        alert("Maaf No Kartu BSS Akhir Harus lebih besar dari No Awal Atau Maximal 50 lembar");
        window.location = base_url + 'bss';
    }else{
        send_bss_db(kartu_number_awal, kartu_number_akhir, area_kerja)
    }
}
function send_bss_db(kartu_number_awal, kartu_number_akhir, area_kerja) {
    let data = {
      kartu_number_awal: kartu_number_awal,
      kartu_number_akhir: kartu_number_akhir,
      area_kerja: area_kerja
    }
    
    $.ajax({
        type: "POST",
        url: base_url + "BSSController/sendBSS",
        // headers: {
        //   "Authorization": token
        // },
        dataType: "json",
        data: data,
        beforeSend: function () {
          $('#loading').show();
        },
        success: function (respon) {
            alert(respon.message);
            setTimeout(function(){ $('#form_send_bss').modal('hide');},1000);
            window.location = base_url + 'bss';
            $('#loading').hide();
        }
    });
  }