// Upload File Efiling
function getImg(evt){
    let token = localStorage.getItem("token");
    let fd = new FormData();
    let files = evt.target.files[0];
    let idFile = evt.target.getAttribute('id');
    let kd_kantor = evt.target.getAttribute('kd_kantor');
    let tgl_realisasi = evt.target.getAttribute('tgl_realisasi');
    let no_rekening = evt.target.getAttribute('no_rekening');
    fd.append('ktp',files);
    // fd.append('idFile',idFile);
    // fd.append('kd_kantor',kd_kantor);
    // fd.append('tgl_realisasi',tgl_realisasi);
    // fd.append('no_rekening',no_rekening)
    fd.append('verifikasi',1)
    fd.append('notes',"testing upload")
    $.ajax({
        url:"http://103.31.232.146/API_WEBTOOL3_2/api/master/centro/update/40-55-00001-45",
        type:"POST",
        data:fd,
        processData:false,
        contentType:false,
        cache:false,
        async:false,    
        dataType: 'json',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        beforeSend: function () {
            $('#loading-1').show();
        },
        success: function(respon){
            console.log(respon)
            $('#loading-2').hide();
            alert("Upload "+idFile+" sukses");
            $( '#'+idFile+'' ).val('');//delete form upload

            let list = `<div class="col-12 group-${idFile}" style ="display: flex; padding-bottom: 5px;" file="${respon.data['ktp']}">
                            <div class="col-10">
                                <a href="http://103.31.232.146/API_WEBTOOL3_2/${respon.data['ktp']}" target="_blank"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i> ${respon.data['ktp']}</a>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn bg-gradient-danger btn-sm btn_delete_file" nm-file="test" no-rek="tesing" id-file ="${idFile}" onclick="delete_file(this)">Delete</button>
                             </div>
                        </div>`;
            $( '#file-'+idFile+'' ).append(list);
        }
    });
}

function delete_file(d){
   let data = {
        idFile : d.getAttribute("id-file"),
        no_rekening : d.getAttribute("no-rek"),
        nm_file : d.getAttribute("nm-file")
   }
   console.log(data)
}

function updateData(){
    let ktp = loop($('#file-ktp_all').find('.group-ktp_all'));
    let kk = loop($('#file-kartu_keluarga').find('.group-kartu_keluarga'));
    function loop(css){
        var values = [];
        for (let y=0; y < css.length; ++y) {
            values.push(css[y].getAttribute("file"))
        }
        return values
    }

    let data = {
        area_kerja : $('form').find('#area_kerja').val(),
        plafon : $('form').find('#inp_plafon').val(),
        tenor : $('form').find('#inp_tenor').val(),
        no_rekening : $('form').find('#nomor_rekening').val(),
        tgl_realisasi : $('form').find('#tanggal_realisasi').val(),
        verifikasi_nasabah : $('#verifikasi_nasabah_edit').val(),
        ktp : ktp,
        kk :kk
    }
    // console.log(data)
    $.ajax({
        url: base_url + "E_FilingController/simpan_efiling",
        type: "POST",
        dataType: "json",
        data: data,
        beforeSend: function () {
          $('#loading-1').show();
        },
        success: function (respon) {
          $('#loading-1').hide();
          console.log(respon)
        }
    })
}

function closeFormEfiling() {
  $('#modal_pengisian_efiling').modal('hide');
  $(".custom-file-input").empty();
  location.reload();
}