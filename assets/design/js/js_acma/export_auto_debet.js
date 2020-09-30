// =============================================AUTHOR : 15997085 & 15997075 =============================================\\

$('#div-date-exad').datetimepicker({
    format: 'DD-MMM-YYYY',
    minDate : moment().millisecond(0).second(0).minute(0).hour(0),
    allowInputToggle: true
});

$('#div-date-manual-exad').datetimepicker({
    format: 'DD-MMM-YYYY',
    minDate : moment().millisecond(0).second(0).minute(0).hour(0),
    allowInputToggle: true
});

var tabel_pengajuan_exp_adb = $('#table-pengajuan-exad').DataTable({
    "columnDefs": [
      { "width": "20%", "targets": 0 },
      { "width": "60%", "targets": 1 },
      { "width": "10%", "targets": 2 }
    ],
    "paging":   false,
    "ordering": false,
    "searching": false
});

var tabel_kontrak_exp_adb = $('#table-kontrak-exad').DataTable();

var tabel_batch_kor_exad = $('#table-batch-exad').DataTable({
    "order": [[ 0, "desc" ]],
    "ordering" : false,
    "columnDefs":[
        {
            "targets": [2],
            "visible": false,
            "responsive": true,
            "searchable": false
        },
    ]
});

var tabel_koreksi_exad = $('#table-koreksi-exad').DataTable();

var arr_tbl = "";
//==============================================GET DAY, BANK & ROLE=====================================================\\
var nik = $('#nik-exad').val();
var today = new Date();
var weekday = new Array(7);
weekday[0] = "Minggu";
weekday[1] = "Senin";
weekday[2] = "Selasa";
weekday[3] = "Rabu";
weekday[4] = "Kamis";
weekday[5] = "Jumat";
weekday[6] = "Sabtu";

var hari = weekday[today.getDay()];

if (hari == weekday[5]){
    $('#inp-notes-exad').html('Dear '+nik+', hari ini hari '+ hari+', pastikan file yang di export juga untuk hari minggu dan senin');
}

get_list_bank();

var role_user_exautodebet;

if (!localStorage.getItem('role_user_exautodebet')) {
    $.ajax({
        'url' : "Controller_home/get_detail_user",
        'cache' : false,
        'async' : false,
        success : function(response){
            if(response){
                try{
                    console.log(response);
                    localStorage.setItem('role_user_exautodebet', response);
                    role_user_exautodebet = $.parseJSON(localStorage.getItem('role_user_exautodebet'));
                    console.log(role_user_exautodebet);
                }catch(e){
                    console.log(e);
                    $('#loading-ajax').hide();
                    alert_error("Terjadi kesalahan error => "+e);
                }
            }
        },
        error: function(response){
            console.log(response);
        }
    });
}else{
    role_user_exautodebet = $.parseJSON(localStorage.getItem('role_user_exautodebet'));
    console.log(role_user_exautodebet);
}


var branch_id =  $('#branch-id-exad').val();
var flag_role_exad = false;
var flag_role_peng_man_exad = false;
var flag_role_koreksi = false;
if (branch_id !== '0000') {
    alert_info('Menu Export Autodebet Hanya Dapat Diakses Oleh HO');
    $('#btn-export-exad').prop('disabled', true);
    $('#inp-date-exad').prop('disabled', true);
    $('#slc-bank-exad').prop('disabled', true);
}else if (branch_id === '0000') {
    $.each(role_user_exautodebet, function(i){
        console.log(role_user_exautodebet[i]['role_code']);
        if (role_user_exautodebet[i]['role_code'] === 'EX_ADBT') {
            $('#btn-export-exad').prop('disabled', false);
            flag_role_exad = true;
        }
    });
    if (flag_role_exad === false) {
        alert_info('Tab Export Autodebet hanya bisa di akses oleh Finance HO');
        $('#btn-export-exad').prop('disabled', true);
        $('#inp-date-exad').prop('disabled', true);
        $('#slc-bank-exad').prop('disabled', true);
    }

    $('#exp-adb-export-tab').click(function(){
        $.each(role_user_exautodebet, function(i){
            console.log(role_user_exautodebet[i]['role_code']);
            if (role_user_exautodebet[i]['role_code'] === 'EX_ADBT') {
                $('#btn-export-exad').prop('disabled', false);
                flag_role_exad = true;
            }
        });
        if (flag_role_exad === false) {
            alert_info('Tab Export Autodebet hanya bisa di akses oleh Finance HO');
            $('#btn-export-exad').prop('disabled', true);
            $('#inp-date-exad').prop('disabled', true);
            $('#slc-bank-exad').prop('disabled', true);
        }
    });
}

//=======================================================================================================================\\
//==================================================GENERATE TEXTFILE====================================================\\

$("#btn-export-exad").click(function(){
    var start_date = $('#inp-date-exad').val();
    var bank_id = $('#slc-bank-exad').val();

    if (start_date === '') {
        alert_info('Input Tanggal Terlebih Dahulu!');
        $('#div-date-exad').addClass('has-error');
    }else if(bank_id === ''){
        alert_info("Silahkan Input Bank!");
        $('#div-bank-exad').addClass('has-error');
    }else{
        if (check_session() === 'true') {
            alert_confirm('Export Data ?', function(){    
                genereate_text_file();
            });
        }else{
            alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
                localStorage.clear();
                window.location.href = base_url + "Controller_login/login_view";
            });
        }
    }
});

//=======================================================================================================================\\
//=======================================================UPLOAD FILES====================================================\\
var filename_import = '';

$('#btn-upload-exad').click(function(){
    if ($('#inp-pengajuan-exad').val() !== '') {
        $('#inp-pengajuan-exad').val("");
        if ($('#inp-pengajuan-exad').val() === '') {
            $('#inp-pengajuan-exad').val('UPLOAD');
        }
    }else{
        $('#inp-pengajuan-exad').val('UPLOAD');
    }

    filename_import = $('#inp-txt-file-upload-exad')[0].files[0].name;
    localStorage.setItem("filename_import", filename_import);
    var ffile = $('#inp-txt-file-upload-exad')[0].files[0];
    var formdata = new FormData();
    formdata.append("file", ffile);

    $('#p-name-file-exad').val(filename_import);
    $.ajax({
        url: base_url + "Controller_export_autodebet/get_url_file_csv",
        type: 'POST',
        timeput : 10000,
        dataType: 'json',
        contentType: false,
        processData: false,
        async: false,
        data:formdata,
        success: function(response){
            try {
                var arr_data_csv = [];
                tabel_pengajuan_exp_adb.clear();
                if (response[0][0].length !== 12 || response[0][1].length > 200) {
                    alert_info("Isi File Tidak Cocok");
                }else{
                    $.each(response, function(index) {
                        arr_data_csv.push([
                            this[0],
                            this[1],
                            ''
                        ]);
                    });
                    tabel_pengajuan_exp_adb.rows.add(arr_data_csv).draw(false);
                    $('#btn-add-kontrak-exad').prop('disabled', true);
                    console.log(response);
                }
            }catch(e){
                alert_error(e);
                console.log(response);
                console.log(e);
            }
        },
        error: function(response){
          console.log(response);
          alert(response.responseText);
        }
    });
});

//=======================================================================================================================\\
//=======================================================DATA KONTRAK====================================================\\

var angka_exp_adb = 0;

$('#exp-adb-pengajuan-tab').one('click', function(){
    if (check_session() === 'true') {
        if (branch_id !== '0000') {
            alert_info('Menu Export Autodebet Hanya Dapat Diakses Oleh HO');
            $('#inp-txt-file-upload-exad').prop('disabled', true);
            $('#btn-upload-exad').prop('disabled', true);
            $('#btn-simpan-exad').prop('disabled', true);
            $('#btn-add-kontrak-exad').prop('disabled', true);
            $('#btn-clear-exad').prop('disabled', true);
            $('#inp-date-manual-exad').prop('disabled', true);
            return false;
        }else if (branch_id === '0000'){
            $.each(role_user_exautodebet, function(i){
                if (role_user_exautodebet[i]['role_code'] === 'PENG_MAN_EXAD') {
                    flag_role_peng_man_exad = true;
                    get_list_kontrak();
                }
            });
            if (flag_role_peng_man_exad === false) {
                alert_info('Tab Pengajuan Manual hanya bisa di akses oleh Collection HO');
                $('#inp-txt-file-upload-exad').prop('disabled', true);
                $('#btn-upload-exad').prop('disabled', true);
                $('#btn-simpan-exad').prop('disabled', true);
                $('#btn-add-kontrak-exad').prop('disabled', true);
                $('#btn-clear-exad').prop('disabled', true);
                $('#inp-date-manual-exad').prop('disabled', true);
            }
        }
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

$('#btn-add-kontrak-exad').click(function(){
    if (check_session() === 'true') {
        get_data_kontrak_manual(angka_exp_adb);
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});

var index_selected;

function get_data_kontrak_manual(angka2adb){
    index_selected = angka2adb;
    $('#modal-search-kontrak-exad').modal('show');
};

$('#table-kontrak-exad tbody').on('mouseover', 'tr', function() {
    $(this).addClass('pointer');
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    } else {
        tabel_kontrak_exp_adb.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
});

var map = new Object();
var temp_tabel;
$('#table-kontrak-exad tbody').on('click', 'tr', function() {
    if (check_session() === 'true') {
        if ($('#inp-pengajuan-exad').val() !== '') {
            $('#inp-pengajuan-exad').val("");
            if ($('#inp-pengajuan-exad').val() === '') {
                $('#inp-pengajuan-exad').val('ADD');
            }
        }else{
            $('#inp-pengajuan-exad').val('ADD');
        }
        $('#btn-upload-exad').prop('disabled', true);
        $('#inp-txt-file-upload-exad').prop('disabled', true);
        $('#p-name-file-exad').val('');
        var data = tabel_kontrak_exp_adb.rows().data();
        var pages_exad = tabel_kontrak_exp_adb.page();
        var limits_exad = tabel_kontrak_exp_adb.page.len();
        var table_leng_exad = tabel_kontrak_exp_adb.rows().data().length;
        var search  = tabel_kontrak_exp_adb.search();
        tabel_kontrak_exp_adb.search("");
        tabel_kontrak_exp_adb.page.len(table_leng_exad);
        tabel_kontrak_exp_adb.draw();
        var indexx = data.$('tr.selected').index();

        if (data[indexx][0] != null || data[indexx][0] !="") {
            if (tabel_kontrak_exp_adb.rows().count() == 1) {
                var tbl_pengajuan_arr = [];
                tbl_pengajuan_arr.push([
                    // '',// '<input type="text" class="no_border2" id="inp-idkontrak-exad'+angka_exp_adb+'" disabled>',
                    '<input type="text" class="no_border2" id="inp-nokontrak-exad'+angka_exp_adb+'" disabled>',
                    // '',// '<input type="text" class="no_border2" id="inp-nocicilan-exad'+angka_exp_adb+'" disabled>',
                    // '',// '<input type="text" class="no_border2" id="inp-tglcicilan-exad'+angka_exp_adb+'" disabled>',
                    '<input type="text" class="alasan" id="inp-alasan-exad'+angka_exp_adb+'" style="width: 100%;" maxlength="200" />',
                    '<button type="button" class="btn btn-danger btn-delete" style="padding: 2%; width: 100%;">Hapus</button>'
                ]);
                tabel_pengajuan_exp_adb.rows.add(tbl_pengajuan_arr).draw(true);
                $('#btn-add-kontrak-exad').prop('disabled',true);
            }else{
                var tbl_pengajuan_arr = [];
                tbl_pengajuan_arr.push([
                    // '',// '<input type="text" class="no_border2" id="inp-idkontrak-exad'+angka_exp_adb+'" disabled>',
                    '<input type="text" class="no_border2" id="inp-nokontrak-exad'+angka_exp_adb+'" disabled>',
                    // '',// '<input type="text" class="no_border2" id="inp-nocicilan-exad'+angka_exp_adb+'" disabled>',
                    // '',// '<input type="text" class="no_border2" id="inp-tglcicilan-exad'+angka_exp_adb+'" disabled>',
                    '<input type="text" class="alasan" id="inp-alasan-exad'+angka_exp_adb+'" style="width: 100%;" maxlength="200" />',
                    '<button type="button" class="btn btn-danger btn-delete" style="padding: 2%; width: 100%;">Hapus</button>'
                ]);
                tabel_pengajuan_exp_adb.rows.add(tbl_pengajuan_arr).draw(true);
                // $('#btn-add-kontrak-exad').prop('disabled',false);
            }

            angka_exp_adb += 1;
            var no_cont = $('#inp-nokontrak-exad'+index_selected).val();

            if(no_cont == null || no_cont == ""){
                no_cont = data[indexx][0];
            }

            // $('#inp-idkontrak-exad'+index_selected).val(data[indexx][0]);
            $('#inp-nokontrak-exad'+index_selected).val(data[indexx][0]);
            // $('#inp-nocicilan-exad'+index_selected).val(data[indexx][2]);
            // $('#inp-tglcicilan-exad'+index_selected).val(data[indexx][3]);

            if(map[no_cont] == null){
                map[no_cont] = 1;
            }else{
                map[no_cont] = null;
                map[data[indexx][0]] = 1;
            }

            tabel_kontrak_exp_adb.clear().draw();
            var temp_tabel_kontrak = [];
            for (var i = 0; i < temp_tabel.length; i++) {
                if (map[temp_tabel[i][0]] == 1) {
                    continue;
                }
                temp_tabel_kontrak.push([
                    temp_tabel[i][0]
                    // temp_tabel[i][1],
                    // temp_tabel[i][2],
                    // temp_tabel[i][3]
                ]);
            }
            tabel_kontrak_exp_adb.rows.add(temp_tabel_kontrak).draw(false);
            // $("#table-pengajuan-exad").find("td")[0].style.width = "20%";
            // $("#table-pengajuan-exad").find("td")[1].style.width = "60%";
            // $("#table-pengajuan-exad").find("td")[2].style.width = "10%";

            $('#modal-search-kontrak-exad').modal('hide');
        }

        tabel_kontrak_exp_adb.page.len(limits_exad);
        tabel_kontrak_exp_adb.draw();
        tabel_kontrak_exp_adb.page(pages_exad).draw('page');
        tabel_kontrak_exp_adb.search(search);
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//=======================================================================================================================\\
//===============================================HAPUS DATA TABLE========================================================\\

$('#table-pengajuan-exad tbody').on( 'click', '.btn-delete', function () {
    $('#btn-add-kontrak-exad').prop('disabled',false);


    var list_data = tabel_pengajuan_exp_adb.rows().data();
    
    var indexs = tabel_pengajuan_exp_adb.row($(this).parents('tr')).index();
    var indeks = list_data[indexs][0].substring(list_data[0][0].indexOf("xad") + 3, list_data[0][0].indexOf("\" disabled"));
    var no_cont = $('#inp-nokontrak-exad'+indeks).val();
    
    tabel_pengajuan_exp_adb.row($(this).parents('tr')).remove().draw();
    
    map[no_cont] = null;
    tabel_kontrak_exp_adb.clear().draw();

    var temp_tabel_kontrak_exp = [];

    for(var i = 0; i < temp_tabel.length; i++){
        if(map[temp_tabel[i][0]] == 1){
            continue;
        }
        temp_tabel_kontrak_exp.push([
            temp_tabel[i][0]
            // temp_tabel[i][1],
            // temp_tabel[i][2],
            // temp_tabel[i][3]
        ]);
    }
    tabel_kontrak_exp_adb.rows.add(temp_tabel_kontrak_exp).draw(false);

    if (list_data.length === 1) {
        $('#inp-txt-file-upload-exad').prop('disabled', false);
        $('#btn-upload-exad').prop('disabled', false);
        $('#inp-pengajuan-exad').val("");
    }

    // $("#table-pengajuan-exad").find("td")[0].style.width = "20%";
    // $("#table-pengajuan-exad").find("td")[1].style.width = "60%";
    // $("#table-pengajuan-exad").find("td")[2].style.width = "10%";
    
});
//=======================================================================================================================\\
//==================================================SIMPAN DATA TABLE====================================================\\
var id_alasan = 0;
$('#btn-simpan-exad').click(function(){
    if (check_session() === 'true') {
        if($('#p-name-file-exad').val() !==''){
            var data_pengajuan = tabel_pengajuan_exp_adb.rows().data();
            var tanggal = $('#inp-date-manual-exad').val();
            var flag = true;
            if (data_pengajuan.length === 0) {
                alert_info("Data Pengajuan Kosong !");
            }else if(tanggal ==='' ){
                alert_info('Tanggal Tidak Boleh Kosong!');
                 $('#div-date-manual-exad').addClass('has-error');
            }else if(data_pengajuan.length != 0) {
                for (var i = 0; i < data_pengajuan.length; i++) {
                    if (data_pengajuan[i][0].length !== 12) {
                        alert_info('Kesalahan pada nomor kontrak: '+data_pengajuan[i][0]);
                        flag = false;
                    }else if(data_pengajuan[i][1].length === 0 || data_pengajuan[i][1].length > 200){
                        alert_info('Alasan pada kontrak <b>'+data_pengajuan[i][0]+'</b> belum diisi atau melebihi dari 200 karakter');
                        flag = false;
                    }
                }
                if (flag === true) {
                    alert_confirm('Simpan Data?', function(){
                        pengajuan_manual_csv();
                    });
                }
            }
        }else if ($('#p-name-file-exad').val() ==='') {
            var data = tabel_pengajuan_exp_adb.rows().data();
            var flag = true;
            var tanggal = $('#inp-date-manual-exad').val();
            if (data.length === 0) {
                alert_info("Data Pengajuan Kosong !");
            }else if(tanggal ==='' ){
                alert_info('Tanggal Tidak Boleh Kosong!');
                 $('#div-date-manual-exad').addClass('has-error');
            }else if(data.length != 0) {
                for (i = 0; i < data.length; i++) {
                    id_kontrak = data[i][0].substring(data[i][0].indexOf("xad") + 3,data[i][0].indexOf("\" disabled"));
                    id_alasan = data[i][1].substring(data[i][1].indexOf("xad") + 3,data[i][1].indexOf("\" style"));
                    if ($('#inp-alasan-exad'+id_alasan).val() === '' || $('#inp-alasan-exad'+id_alasan).val() === null) {
                        var no_kontrak = $('#inp-nokontrak-exad'+id_kontrak).val();
                        alert_info('Alasan Pada Kontrak <b>'+no_kontrak+'</b> Belum Diisi');
                        flag = false;
                        break;
                    }
                }
                if(flag === true){
                    alert_confirm('Simpan Data?', function(){
                        pengajuan_manual();
                    });
                }
            }
        }
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
});
//================================================CLEAR PENGAJUAN MANUAL=================================================\\
$('#btn-clear-exad').click(function(){
    $('#btn-add-kontrak-exad').prop('disabled', false);
    tabel_pengajuan_exp_adb.clear().draw();
    $('#btn-upload-exad').prop('disabled', false);
    $('#p-name-file-exad').val('');
    $('#inp-txt-file-upload-exad').prop('disabled', false);
    $('#inp-txt-file-upload-exad').val('');
    $('#inp-pengajuan-exad').val('');
});
//==================================================KOREKSI AUTODEBET====================================================\\
$('#exp-adb-koreksi-tab').click(function(){
    if (check_session() === 'true') {
        if (branch_id !== '0000') {
            alert_info('Menu Export Autodebet Hanya Dapat Diakses Oleh HO');
            return false;
        }else if (branch_id === '0000') {
            $.each(role_user_exautodebet, function(i){
                if (role_user_exautodebet[i]['role_code'] === 'EX_ADBT') {
                    flag_role_koreksi = true;
                    $('#btn-koreksi-exad').prop('disabled', false);
                    $('#inp-file-exad').prop('disabled', false);
                    $('#src-file-exad').prop('disabled', false);
                    $('#inp-batch-exad').prop('disabled', false);
                    $('#src-batch-exad').prop('disabled', false);
                    $('#inp-file-upload-exad').prop('disabled', false);
                }
            });
            if (flag_role_koreksi === false) {
                alert_info('Tab Koreksi Autodebet Hanya Bisa Di Akses Oleh Finance HO');
                $('#btn-koreksi-exad').prop('disabled', true);
                $('#inp-file-exad').prop('disabled', true);
                $('#src-file-exad').prop('disabled', true);
                $('#inp-batch-exad').prop('disabled', true);
                $('#src-batch-exad').prop('disabled', true);
                $('#inp-file-upload-exad').prop('disabled', true);
            }
        }
    }
});
//=================================================UPLOAD FILE KOREKSI===================================================\\
$('#src-file-exad').click(function(){
    if ($('#inp-batch-exad').val() === "") {
        alert_warning('Batch Tidak Boleh Kosong !')
        $('#div-batch-exad').addClass('has-error');
    }else{
        $('#inp-file-upload-exad').click();
        $('#div-batch-exad').removeClass('has-error');
    }
});

$('#inp-file-exad').click(function(){
    if ($('#inp-batch-exad').val() === "") {
        alert_warning('Batch Tidak Boleh Kosong !')
        $('#div-batch-exad').addClass('has-error');
    }else{
        $('#inp-file-upload-exad').click();
        $('#div-batch-exad').removeClass('has-error');
    }
});
var file_error = '';
$('#inp-file-upload-exad').change(function(){
    $('#div-file-exad').removeClass('has-error');

    file_error = $('#inp-file-upload-exad')[0].files[0].name;
    localStorage.setItem("file_error", file_error);
    var ffile = $('#inp-file-upload-exad')[0].files[0];
    var formdata = new FormData();
    formdata.append("file", ffile);
    $('#inp-file-exad').val(file_error);

    $.ajax({
        url: base_url + "Controller_export_autodebet/get_error_file_csv",
        type: 'POST',
        timeput : 10000,
        dataType: 'json',
        contentType: false,
        processData: false,
        async: false,
        data:formdata,
        success: function(response){
            try {
                var arr_data_csv = [];
                tabel_koreksi_exad.clear();
                // if (response[0][0].length !== 12 || response[0][1].length > 200) {
                    // alert_info("Isi File Tidak Cocok");
                // }else{
                    $.each(response, function(index) {
                        arr_data_csv.push([
                            this[0]
                        ]);
                    });
                    tabel_koreksi_exad.rows.add(arr_data_csv).draw(false);
                    // $('#btn-add-kontrak-exad').prop('disabled', true);
                    console.log(response);
                // }
            }catch(e){
                alert_error(e);
                console.log(response);
                console.log(e);
            }
        },
        error: function(response){
          console.log(response);
          alert(response.responseText);
        }
    });
});
//=======================================================LIST BATCH======================================================\\
$('#inp-batch-exad').click(function(){
    get_list_batch();
    $('#modal-list-batch-exad').modal('show');
});

$('#src-batch-exad').click(function(){
    get_list_batch();
    $('#modal-list-batch-exad').modal('show');
});

$('#table-batch-exad').on('mouseover', 'tr', function() {
    $(this).addClass('pointer');
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    }else{
        tabel_batch_kor_exad.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        arr_tbl = tabel_batch_kor_exad.row(this).data();
    }
});

$('#table-batch-exad tbody').on('click', 'tr', function() {
    $('#inp-batch-exad').val(arr_tbl[1]);
    $('#inp-accno-exad').val(arr_tbl[2]);
    $('#modal-list-batch-exad').modal('hide');
    $('#div-batch-exad').removeClass('has-error');
});

//==============================================GENERATE TEXTFILE KOREKSI================================================\\
$('#btn-koreksi-exad').click(function(){
    if ($('#inp-batch-exad').val() === "" && $('#inp-file-exad').val() === "") {
        alert_warning('Batch dan File Reject Tidak Boleh Kosong !');
        $('#div-batch-exad').addClass('has-error');
        $('#div-file-exad').addClass('has-error');
    }else if ($('#inp-batch-exad').val() === "") {
        alert_warning('Batch Tidak Boleh Kosong !')
        $('#div-batch-exad').addClass('has-error');
        $('#div-file-exad').removeClass('has-error');
    }else if ($('#inp-file-exad').val() === "") {
        alert_warning('File Reject Tidak Boleh Kosong !')
        $('#div-file-exad').addClass('has-error');
        $('#div-batch-exad').removeClass('has-error');
    }else{
        genereate_text_file_koreksi();
        $('#div-batch-exad').removeClass('has-error');
        $('#div-file-exad').removeClass('has-error');
    }
});
//=======================================================================================================================\\

function get_list_bank(){
    if (check_session() === 'true') {
        $.ajax({ 
            url: base_url + "Controller_export_autodebet/get_list_bank_export",
            dataType: 'json',
            type: 'GET',
            cache: false,
            success: function(response){
                console.log(response);
                if (response) {
                    try{
                        $('<option/>').val('').html('-- Silahkan Pilih --').appendTo('#slc-bank-exad').addClass('form-control');
                        $.each(response['data'], function(i){ 
                            $('#slc-bank-exad').append('<option value="' + this['bankCode'] + '">' + this['bankName'] + '</option>');
                            $('#get-accno-exad').val(this['accNo']);
                        }); 
                    }catch(e){ 
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error("Terjadi kesalahan error => " + e);
                    } 
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
                }
            },
            error: function(response){ 
                console.log(response);
                if (response['responseText'] === "" && response['statusText'] === 'OK') {
                    alert_error("Tidak Terhubung Pada Server, Silahkan Coba Kembali / Hubungi Tim IT");
                }else if (response['statusText'] === 'Internal Server Error') {
                    alert_error('Gagal Terhubung ke Server: ' + response['responseText']);
                }else if (response['responseText'] !== "" && response['statusText'] === 'OK') {
                    alert_error('Gagal Terhubung ke Server: ' + response['responseText']);
                }
            } 
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
}

function genereate_text_file(){
    if (check_session() === 'true') {
        var start_date = $('#inp-date-exad').val();
        var bank_id = $('#slc-bank-exad').val();
        var accno = $('#get-accno-exad').val();
        var arrayData = [];

        arrayData.push({
            startdate : start_date,
            bank_id : bank_id,
            accno :  accno
        });
        $.ajax({
            url: base_url + "Controller_export_autodebet/post_date_bank",
            dataType: 'json',
            type: 'POST',
            data:{arrayData},
            cache: false,
            success: function(response){                    
                console.log(response);
                if (response) {
                    try{
                        var result = $.parseJSON(response);
                        var file = [];
                        var filename =[];
                        var temp_isi;
                        if (result['out'] === 0) {
                            alert_warning('Silahkan Input Pengajuan Autodebet Terlebih Dahulu !');
                        }else if (result['alert'] !== null || result['out'] === 2) {
                            alert_warning(result['alert']);
                        }else if(result['out'] === 1) {
                            //Download As Zip
                            // var zip = new JSZip();

                            for (var i = 0; i < result['Header'].length; i++) {
                            temp_isi = ""+result['Header'][i]['date']+";"+result['Header'][i]['jml_line']+"\rP;"
                            +result['Header'][i]['str_date']+";"
                            +result['Header'][i]['rekmuf']+";"
                            +result['Header'][i]['row']+";"
                            +result['Header'][i]['mount']+";";
                            //result['Header'][i]['file_send'];
                            //result['Header'][i]['file_id'];
                                for (var j = 0; j < result['Header'][i]['isi'].length; j++) {
                                    
                                    if (result['Header'][i]['isi'][j]['email'] !==null) {

                                        temp_isi = temp_isi +"\r"+ result['Header'][i]['isi'][j]['account_no']+";"
                                        +result['Header'][i]['isi'][j]['account_name']+";"
                                        +result['Header'][i]['isi'][j]['amount']+";"
                                        +result['Header'][i]['isi'][j]['rowid']+";AUTO DEBIT KE "
                                        +result['Header'][i]['isi'][j]['szrec']+";"
                                        +result['Header'][i]['isi'][j]['contract_id']+";"
                                        +result['Header'][i]['isi'][j]['flag']+";"
                                        +result['Header'][i]['isi'][j]['email']+";";

                                    }else if (result['Header'][i]['isi'][j]['email'] ===null) {

                                        temp_isi = temp_isi +"\r"+ result['Header'][i]['isi'][j]['account_no']+";"
                                        +result['Header'][i]['isi'][j]['account_name']+";"
                                        +result['Header'][i]['isi'][j]['amount']+";"
                                        +result['Header'][i]['isi'][j]['rowid']+";AUTO DEBIT KE "
                                        +result['Header'][i]['isi'][j]['szrec']+";"
                                        +result['Header'][i]['isi'][j]['contract_id']+";"
                                        +result['Header'][i]['isi'][j]['flag']+";";
                                        // +result['Header'][i]['isi'][j]['email']+";";
                                        // result['Header'][i]['isi'][j]['seq'];
                                    }
                                }
                                file.push(temp_isi);
                                filename.push(result['Header'][i]['file_send']);

                                //Generate Textfile, Download As Zip

                                //Pemberian tanggal untuk namafile.zip
                                // var tanggal = new Date();
                                // var dd = tanggal.getDate();
                                // var mm = tanggal.getMonth()+1;
                                // var yyyy = tanggal.getFullYear();
                                // var hh = tanggal.getHours();
                                // var min = tanggal.getMinutes();
                                // var sec = tanggal.getSeconds();
                                // if(dd<10) {
                                //     dd = '0'+dd
                                // } 
                                // if(mm<10) {
                                //     mm = '0'+mm
                                // } 
                                // tanggal = dd + '-' + mm + '-' + yyyy + ' ' + hh + ':' + min + ':' + sec;

                                // zip.file(filename[i]+".txt", file[i]);
                                // zip.generateAsync({type:"blob"}).then(function(content) {
                                //     saveAs(content, "Export Autodebet "+tanggal+".zip");
                                // });

                                //Generate Textfile, Download As Textfile
                                var uri = 'data:application/txt;charset=UTF-8,' + encodeURIComponent(file[i]);
                                var downloadLink = document.createElement("a");
                                downloadLink.href = uri;
                                downloadLink.download = filename[i];
                                document.body.appendChild(downloadLink);
                                downloadLink.click();
                                document.body.removeChild(downloadLink);
                            }
                            alert_info('Textfile Telah Terbentuk !', function(){
                                location.reload();
                            });
                        }
                    }catch(e){
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_info("Terjadi kesalahan error => " + e);
                    }
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
                }
            },
            error:function(response){
                console.log(response);
                alert_error(response);
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
}

function get_list_kontrak() {
    if (check_session() === 'true') {
        var list_kontrak = [];
        $.ajax({
            url:'Controller_export_autodebet/get_list_kontrak',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function(response){
                console.log(response);
                if (response) {
                    try {
                        tabel_kontrak_exp_adb.clear().draw();
                        // var result = $.parseJSON(response);
                        // var isi_tabel;
                        if (response['alert'] === null) {
                            for (var i = 0; i < response['data'].length; i++) {
                                // isi_tabel = 
                                list_kontrak.push([response['data'][i].contract_num]);
                            }
                            var tanggal = response["tanggal"];
                            tanggal = new Date(tanggal).format('dd-mmm-yyyy');
                            $('#inp-date-manual-exad').val(tanggal);
                            // $.each(response['data'], function(index) {
                            //     list_kontrak.push([
                            //         this['contract_no']
                            //         // this['installment_date']
                            //     ]);
                            // });
                            tabel_kontrak_exp_adb.rows.add(list_kontrak).draw(false);
                            temp_tabel = tabel_kontrak_exp_adb.rows().data();
                        }else if (response['alert'] !== null) {
                            alert_error("Error : " + response['alert']);
                        }
                    } catch (e) {
                        console.log(e);
                        $('#loading-ajax').hide(); //menutup loading ajax
                        alert_error("Terjadi kesalahan error => " + e);
                    }
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
                }
            },
            error: function(response) {
                console.log(response);
                alert_error('Koneksi Gagal, Silahkan Coba Lagi' + response);
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
}

function pengajuan_manual(){
    if (check_session() === 'true') {
        var list_data = tabel_pengajuan_exp_adb.rows().data();
        var arrayData = [];
        var kontrak_list = [];
        var reason_list = [];

        for (var i = 0; i < list_data.length; i++) {
            
            var string_id = tabel_pengajuan_exp_adb.rows().data()[i][0];
            var reason_id = tabel_pengajuan_exp_adb.rows().data()[i][1];

            string_id = string_id.substring(list_data[i][0].indexOf("xad") + 3, list_data[i][0].indexOf("\" disabled"));
            reason_id = reason_id.substring(list_data[i][1].indexOf("xad") + 3, list_data[i][1].indexOf("\" style"));

            kontrak_list.push($('#inp-nokontrak-exad'+string_id).val());
            reason_list.push($('#inp-alasan-exad'+reason_id).val());

            arrayData.push({
                contract_no : kontrak_list,
                installment_date : $('#inp-date-manual-exad').val(),
                reason : reason_list,
                status : $('#inp-pengajuan-exad').val()
            });
        }
        $.ajax({
            url : 'Controller_export_autodebet/post_data_pengajuan_manual',
            type : 'POST',
            data : {arrayData},
            success: function(response){
                if (response) {
                    try{
                        var result = $.parseJSON(response);
                        console.log(result);
                        if (result['msg'] !== null || result['out'] === 0) {
                            alert_info(result['msg']);
                            var tanggal = result["tanggal"];
                            tanggal = new Date(tanggal).format('dd-mmm-yyyy');
                            $('#inp-date-manual-exad').val(tanggal);
                        }else if(result['msg'] === null){
                            if (result['alert'] !== null) {
                                alert_error("Error: "+result['alert']);
                            }else if(result['out'] === 1){
                                alert_info('Data Telah Tersimpan !', function(){
                                    location.reload();
                                });
                            }    
                        }
                    }catch(e){
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error("Terjadi kesalahan error => " + e);
                    }
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
                }
            },error:function(response){
                console.log(response);
                alert_error('Koneksi Gagal, Silahkan Coba Lagi' + response);
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
}

function pengajuan_manual_csv(){
    if (check_session() === 'true') {
        var list_data = tabel_pengajuan_exp_adb.rows().data();
        var length_data = list_data.length;
        var list_no_kontrak = [];
        var list_reason = [];

        for (var i = 0; i < length_data; i++) {
            list_no_kontrak.push(list_data[i][0]);
            list_reason.push(list_data[i][1]);
        }

        $.ajax({
            url : 'Controller_export_autodebet/post_data_pengajuan_manual_csv',
            type : 'POST',
            dataType: 'json',
            data : {
                "contract_no" : list_no_kontrak,
                "installment_date" : $('#inp-date-manual-exad').val(),
                "reason" : list_reason,
                "status" : $('#inp-pengajuan-exad').val()
            },
            async: false,
            success: function(response){
                if (response) {
                    try{
                        var result = $.parseJSON(response);
                        if (result['msg'] !== null) {
                            alert_info(result['msg']);
                            var tanggal = result["tanggal"];
                            tanggal = new Date(tanggal).format('dd-mmm-yyyy');
                            $('#inp-date-manual-exad').val(tanggal);
                        }else if(result['msg'] === null){
                            if (result['alert'] !== null) {
                                alert_error("Error: "+result['alert']);
                            }else if(result['out'] === 1){
                                alert_info('Data Telah Tersimpan !', function(){
                                    location.reload();
                                });  
                            }    
                        }
                    }catch(e){
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error("Terjadi kesalahan error => " + e);
                    }
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
                }
            },error:function(response){
                console.log(response);
                alert_error('Koneksi Gagal, Silahkan Coba Lagi' + response);
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
}

function get_list_batch(){
    if (check_session() === 'true') {
        var list_batch = [];
        $.ajax({
            url: base_url + 'Controller_export_autodebet/get_list_batch',
            type: 'GET',
            cache: false,
            success: function(response){
                console.log(response);
                $('#modal-list-batch-exad').modal({
                    show: true,
                    backdrop: 'static'
                });
                if (response) {
                    try {
                        tabel_batch_kor_exad.clear().draw();
                        if (response['Alert'] === "Berhasil") {
                            for (var i = 0; i < response['Data'].length; i++) {
                                list_batch.push([
                                    response['Data'][i].create_date,
                                    response['Data'][i].file_send,
                                    response['Data'][i].accno
                                ]);
                            }
                            tabel_batch_kor_exad.rows.add(list_batch).draw(false);
                        }else if (result['Alert'] !== "Berhasil") {
                            alert_error(result['Alert']);
                        }
                    } catch (e) {
                        console.log(e);
                        $('#loading-ajax').hide(); //menutup loading ajax
                        alert_error("Terjadi kesalahan error => " + e);
                    }
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
                }
            },
            error: function(response) {
                console.log(response);
                alert_error('Koneksi Gagal, Silahkan Coba Lagi ' + response);
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
}

function genereate_text_file_koreksi(){
    if (check_session() === 'true') {
        var accno = $('#inp-accno-exad').val();
        var file_send = $('#inp-batch-exad').val();
        var file_reject = $('#inp-file-exad').val();
        var list_data = tabel_koreksi_exad.data();
        var list_messages = [];
        var lines = [];
        for (var i = 1; i < list_data.length; i++) {
            var messages = list_data[i][0];
            list_messages.push(messages.substring(list_data[i][0].indexOf("Message : "), list_data[i][0].indexOf("(line")));
            lines.push(Number(messages.substring(list_data[i][0].indexOf("(line")+5, list_data[i][0].indexOf(")"))));
        }
        $.ajax({
            url : base_url + 'Controller_export_autodebet/generate_koreksi_text_file',
            type: 'POST',
            dataType: 'text',
            data:
                {
                    "file_send" : file_send,
                    "file_reject" : file_reject,
                    "line_to" : lines,
                    "notes" : list_messages,
                    "accno" : accno
                },
            success: function(response) {
                console.log(response);
                if(response) {
                    try {
                        console.log(response);
                        var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
                        var downloadLink = document.createElement("a");
                        downloadLink.href = uri;
                        downloadLink.download = 'Koreksi_Autodebet.csv';
                        document.body.appendChild(downloadLink);
                        downloadLink.click();
                        document.body.removeChild(downloadLink);
                    }catch(e) {
                        $('#loading-ajax').hide();
                        console.log(e);
                        alert_error("Terjadi Kesalahan => " + e);
                    }
                }else{
                    alert_info('Koneksi Terputus, Tidak Terhubung Dengan Server');
                }
            },
            error: function(response) {
                console.log(response);
                alert_error(response);
            }
        });
    }else{
        alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
            localStorage.clear();
            window.location.href = base_url + "Controller_login/login_view";
        });
    }
}
//=======================================================================================================================\\