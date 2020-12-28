let base_url = $('#base_url').val();
$(document).ready(function () {
    getAll()
    bsCustomFileInput.init();
    
})

//Get all list Efiling
function getAll(){
    $.ajax({
        url: base_url + "E_FilingController/getEfiling",
        type: "GET",
        dataType: "json",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (respon) {
            $('#loading').hide();
            for (let i = 0; i < respon.data.length; i++) {

                let baki_debet = splitPrice(respon.data[i]['baki_debet']);
                let plafon = splitPrice(respon.data[i]['plafon']);

                function splitPrice(x) {
                    let split_price = x.split('.00')
                    let list_price = split_price[0]
                    let price = parseInt(list_price).toLocaleString();
                    return price;
                }

                let stcolor= '';
                if ( respon.data[i]['status_verifikasi'] == "NOT COMPLETED") {stcolor = 'color:#B6AC47'
                }else if (respon.data[i]['status_verifikasi'] == "DONE") {stcolor = 'color:#00AE39'
                }else if (respon.data[i]['status_verifikasi'] == "WAITING"){stcolor = 'color:#D60404'
                }else if (respon.data[i]['status_verifikasi'] == "REVISI"){stcolor = 'color:#FF6412'
                }else{stcolor= ''}

                let stcolor_upload ='';
                if(respon.data[i]['nama_user'] == "WAITING"){stcolor_upload ='color:#D60404'}else{stcolor_upload =''}

                let row = `<tr>
                    <td style="width: 120px;" class="no_rekening">${respon.data[i]['no_rekening']}</td>
                    <td>${respon.data[i]['nama_debitur']}</td>
                    <td class="area_kerja">${respon.data[i]['nama_kantor']}</td>
                    <td class="tgl_realisasi">${respon.data[i]['tgl_realisasi']}</td>
                    <td class="plafon">${plafon}</td>
                    <td class="tenor">${respon.data[i]['tenor']}</td>
                    <td>${baki_debet}</td>
                    <td>${((respon.data[i]['status_dokument']== null)?'' :respon.data[i]['status_dokument'])}</td>
                    <td style="${stcolor_upload}; font-weight:bold;" style="width: 120px;">${respon.data[i]['nama_user']}</td>
                    <td style="font-weight:bold;">${((respon.data[i]['nama_user_verif']== null)?'' :respon.data[i]['nama_user_verif'])}</td>
                    <td>${((respon.data[i]['timeline']== null)?'' :respon.data[i]['timeline'])}</td>
                    <td>${((respon.data[i]['timeline_update']== null)?'' : respon.data[i]['timeline_update'])}</td>
                    <td>${((respon.data[i]['timeline_verifikasi']== null)?'' :respon.data[i]['timeline_verifikasi'])}</td>
                    <td style="${stcolor}; font-weight:bold;">${((respon.data[i]['status_verifikasi']== null)?'': respon.data[i]['status_verifikasi'])}</td>
                    <td style="width: 120px;">
                        
                        <button type="button" class="btn btn-info btn-sm edit" title="Edit Data" ><i class="fas fa-pencil-alt"></i></button>
                        <button type="button" class="btn btn-warning btn-sm detail" title="Detail Data" ><i style="color: #fff;" class="fas fa-eye"></i></button>
                        <button type="button" class="btn btn-warning btn-sm verifikasi" title="Verifikasi"  style="background-color: #6610f2; border-color: #6f42c1;" data="5113"><i style="color: #fff;" class="fas fa-user-check"></i></button>
                    </td>
                </tr>`
                
                $('#efilingTable1').find('tbody').append(row);
            }
        $('#efilingTable1').DataTable({
            "scrollX": true,
            "autoWidth": false,
            "aaSorting": [],
            "searching": false,
            "searchable": false 
        });
        
        }
        // <button type="button" class="btn btn-primary btn-sm add" title="Tambah Data" ><i class="fas fa-plus"></i></button>
    })
    
}

// Btn action list Efiling
$('#efilingTable1').on('click', '.detail', function () {
    $('#modal_view_efiling').modal('show');
    $('#loading-2').hide();
    $('#view_area_kerja').val($(this).parents("tr").find('td.area_kerja').text())
    $('#view_nomor_rekening').val($(this).parents("tr").find('td.no_rekening').text())
    $('#view_inp_plafon').val($(this).parents("tr").find('td.plafon').text())
    $('#view_inp_tenor').val($(this).parents("tr").find('td.tenor').text())
    $('#view_tanggal_realisasi').val($(this).parents("tr").find('td.tgl_realisasi').text())
    let no_rekening = $(this).parents("tr").find('td.no_rekening').text();
    let data = {
        no_rekening : no_rekening,
    } 
    $.ajax({
        url: base_url + "E_FilingController/efiling_detail",
        type: "POST",
        dataType: "json",
        data: data,
        beforeSend: function () {
          $('#loading-2').show();
        },
        success: function (respon) {
            $('#loading-2').hide();
            console.log(respon);
        }
    })
   
})

$('#efilingTable1').on('click', '.add', function () {
    $('#modal_pengisian_efiling').modal('show');
    $('#title_form').text("Form Pengisian E-Filling");
    $('.form-verifikasi').css("display", "none");
})

$('#efilingTable1').on('click', '.edit', function () {
    $('#modal_pengisian_efiling').modal('show');
    $('#loading-1').hide();
    $('#title_form').text("Form Edit E-Filling");
    $('.form-verifikasi').css("display", "block");
    $('#area_kerja').val($(this).parents("tr").find('td.area_kerja').text())
    $('#nomor_rekening').val($(this).parents("tr").find('td.no_rekening').text())
    $('#inp_plafon').val($(this).parents("tr").find('td.plafon').text())
    $('#inp_tenor').val($(this).parents("tr").find('td.tenor').text())
    $('#tanggal_realisasi').val($(this).parents("tr").find('td.tgl_realisasi').text())
    $( ".custom-file-input" ).append( $(this).parents("tr").find('td.no_rekening').text() );
})

$('#efilingTable1').on('click', '.verifikasi', function () {
    $('#modal_pengisian_efiling').modal('show');
    $('#loading-1').hide();
    $('#title_form').text("Form Verifikasi E-Filling");
    $('.form-verifikasi').css("display", "block");
})

function getImg(evt){
    let fd = new FormData();
    let files = evt.target.files[0];
    let idFile = evt.target.getAttribute('id');
    let no_rekening = $( '#'+idFile+'' ).text();
    fd.append('file',files);
    fd.append('idFile',idFile);
    fd.append('no_rekening',no_rekening)
    
    $.ajax({
        url:base_url + "E_FilingController/upload_efiling",
        type:"POST",
        data:fd,
        processData:false,
        contentType:false,
        cache:false,
        async:false,    
        dataType: 'json',
        beforeSend: function () {
            $('#loading-1').show();
        },
        success: function(respon){
            
            $( '#file-'+idFile+'' ).append("");
            $('#loading-1').hide();
            alert("Upload "+idFile+" sukses");
            $( '#'+idFile+'' ).val('');
            console.log(respon.data["link"]);

            let list = `<div class="col-sm-10">
                            <a href="${respon.data["link"]}" target="_blank"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i> ${respon.data["filename"]}</a>
                        </div>
                        <div class="col-sm-2">
                            <form id="form-${idFile}">
                                <input type="hidden" id="no_rekening" value="${no_rekening}">
                                <button type="button" class="btn btn-block bg-gradient-danger btn-sm btn_delete_file">Delete</button>
                            </form>
                        </div>`;
            $( '#file-'+idFile+'' ).html(list);
        }
    });
}

function closeFormEfiling(){
    $('#modal_pengisian_efiling').modal('hide');
    $( ".custom-file-input" ).empty();
    location.reload();
}

// Check verifikasi form E Filing
function check(id,ket){
    let val = $('#'+id+'').val()
    if(val == 'NOT COMPLETED'){
        $('#'+ket+'').css("display", "block");
    }else{
        $('#'+ket+'').css("display", "none");
    }
}

$('#form-ktp').on('click', '.btn_delete_file', function () {
    console.log($("#no_rekening").val())
})

