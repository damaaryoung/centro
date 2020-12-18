$(document).ready(function () {
    getAll()
    $('#efilingTable1').DataTable({
        "scrollX": true,
        "autoWidth": false,
        "aaSorting": [],
        "searching": false,
        "searchable": false 
      });
    bsCustomFileInput.init();
    
})

//Get all list Efiling
function getAll(){
    let value = 'WAITING';
    let stcolor= '';
    if (value == "NOT COMPLETED") {stcolor = 'color:#B6AC47'
    }else if (value == "DONE") {stcolor = 'color:#00AE39'
    }else if (value == "WAITING"){stcolor = 'color:#D60404'
    }else if (value == "REVISI"){stcolor = 'color:#FF6412'}


    let row = `<tr>
        <td style="width: 120px;">33-38-00050-20</td>
        <td>INTIFADA AYU SULISTYA</td>
        <td>SINDANG BARANG</td>
        <td>07-10-2020</td>
        <td>30,000,000</td>
        <td>36</td>
        <td>30,000,000</td>
        <td></td>
        <td style="width: 120px;">SULUH DAMAR GRAHITA</td>
        <td></td>
        <td>11-12-2020 14:29</td>
        <td></td>
        <td>22 jam yang lalu</td>
        <td style="${stcolor}; font-weight:bold;">WAITING</td>
        <td style="width: 120px;">
            <button type="button" class="btn btn-primary btn-sm add" title="Tambah Data" ><i class="fas fa-plus"></i></button>
            <button type="button" class="btn btn-info btn-sm edit" title="Edit Data" ><i class="fas fa-pencil-alt"></i></button>
            <button type="button" class="btn btn-warning btn-sm detail" title="Detail Data" ><i style="color: #fff;" class="fas fa-eye"></i></button>
            <button type="button" class="btn btn-warning btn-sm verifikasi" title="Verifikasi"  style="background-color: #6610f2; border-color: #6f42c1;" data="5113"><i style="color: #fff;" class="fas fa-user-check"></i></button>
        </td>
    </tr>`
    $('#efilingTable1').find('tbody').append(row);
    console.log('test')
}

// Btn action list Efiling
$('#efilingTable1').on('click', '.detail', function () {
    $('#modal_view_efiling').modal('show');
})

$('#efilingTable1').on('click', '.add', function () {
    $('#modal_pengisian_efiling').modal('show');
    $('#title_form').text("Form Pengisian E-Filling");
    $('.form-verifikasi').css("display", "none");
})

$('#efilingTable1').on('click', '.edit', function () {
    $('#modal_pengisian_efiling').modal('show');
    $('#title_form').text("Form Edit E-Filling");
    $('.form-verifikasi').css("display", "block");
})

$('#efilingTable1').on('click', '.verifikasi', function () {
    $('#modal_pengisian_efiling').modal('show');
    $('#title_form').text("Form Verifikasi E-Filling");
    $('.form-verifikasi').css("display", "block");
})

// Check verifikasi form E Filing
function check(id,ket){
    let val = $('#'+id+'').val()
    if(val == 'NOT COMPLETED'){
        $('#'+ket+'').css("display", "block");
    }else{
        $('#'+ket+'').css("display", "none");
    }
}

function getImg(evt,id){
    var files = evt.target.files;
    var file = files[0];
    console.log(file.name, id);
    // ajax
}