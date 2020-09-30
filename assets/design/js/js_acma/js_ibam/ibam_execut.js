if ($('#id-form-aplikasi-ibam').length) {
var branch_code = $('#ibam-branch-code').val();
var branch_name = $('#ibam-branch-name').val();

console.log(branch_code);

if (branch_code !== '0000') {
console.log('masuk');
$('#slc-ibam-branch').prop('disabled', true);
$('<option/>').val(branch_code).html(branch_code+' - '+branch_name).appendTo('#slc-ibam-branch');
getNoreg();;
}
else{
get_data_branch('#slc-ibam-branch');
}
}

var jobs = [];

function getJobsIbam(){
if (check_session() === 'true') {
$.ajax({ 
    url: base_url + "Controller_execution_ibam/getJobsIbam",
    dataType: 'json',
    type: 'GET',
    cache: false,
    success: function(response){
        console.log(response);
        if (response) {
            try{
                jobs = [];
                 for (var i = 0 ; i < response['Data'].length; i++) {
                jobs.push(
                    response["Data"][i].job
                    )
            }

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
        alert_error(response);
    } 
});
}else{
alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
    localStorage.clear();
    window.location.href = base_url + "Controller_login/login_view";
});
}
};

if (localStorage.getItem("menu_alias_am") === "EIB") { 
getJobsIbam();
if(check_session()=== 'false'){
alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
    localStorage.clear();
    window.location.href = base_url + "Controller_login/login_view";
});
}else{
$.ajax({
    url: base_url + "Controller_execution_ibam/privillage_job",
    cache: false,
    //async: false,
    success: function(response){
        try{
            console.log(response);
            var data = $.parseJSON(response);
            var job = '';
            var arif = false;
            for (var i = 0; i < data[0].length; i++) {
                job = data[0][i].job_desc;
                   if(jobs.includes(job) == true){
                    arif = true;
                    break;
                   }else{
                    arif = false
                   }
            } 

             if (arif == true) {
                    // $('#ibam-branch-jobs').val(job);
                    getNoreg();
                }else{
                    alert_info('LOGIN SEBAGAI ARH UNTUK MENGGUNAKAN MENU INI');
                    $('#slc-ibam-branch').prop('disabled', true);
                    $('#slc-reg-ibam').prop('disabled', true);
                    return false;
                }

            // if ($('#ibam-branch-jobs').val() == 'ARH' || $('#ibam-branch-jobs').val() == 'NEW_ARH') {
            //     getNoreg();
            // }else{
            //     return false;
            // }
            
        }catch(e){
            $('#loading-ajax').hide();
            console.log(e);
            alert_error("Terjadi Kesalahan => "+e);
        }
    },
    error: function(response){
        alert_error('Error Connection');
    }
});
}

}

var table_ibam_exe = $('#id-tbl-ibam').DataTable({

'select' : true,
'button' : false,
'searching' : false,
'lengthChange' : false,
'scrollY':       "280px",
'scrollX':        true,
'scrollCollapse': true,
'paging':         false,
"columnDefs": [
{
'bSortable': true,
"targets": [ 8,9,10,11,12,13],
"visible": false,
"responsive": true,
}

],
});

// var table_ibam_exe = $('#id-tbl-ibam').removeAttr('width').DataTable( {
//     scrollY:        "70vh",
//     scrollX:        true,
//     scrollCollapse: true,
//     paging:         false,
//     searching :false,
//     columnDefs: [
//     { width: 46, targets: 2 },
//     { width: 91, targets: 3 },
//     { width: 165, targets: 4 },
//      {
//         'bSortable': true,
//         "targets": [ 8,9,10,11,12,13],
//         "visible": false,
//         "responsive": true,
//     }
//     ],

// } );

//=======================================GET NOREG====================================\\ 

function getNoreg(){
var branch_code = $('#slc-ibam-branch').val();
var no_reg = $('#slc-reg-ibam').val();
$.ajax({
url: 'Controller_execution_ibam/getNoreg',
type: 'POST',
data : {
    branch_code:branch_code
},
success: function(response){
    var data = JSON.parse(response);
    if(JSON.stringify(response).includes('Timeout')){
        alert_refresh('Terjadi kesalahan koneksi,silahkan coba lagi');
    } else if(response){
        try{
          $('#slc-reg-ibam').empty();
          console.log('masuk');
          $('<option/>').val('').html('- SILAHKAN PILIH -').appendTo('#slc-reg-ibam').addClass('form-control');

          for (var i = 0; i < data['data'].length; i++) {
           $('#slc-reg-ibam').append('<option value="'+ data['data'][i].no_reg +'">'+data['data'][i].no_reg + '</option>');
       }

   } catch(e) {
      $('#loading-ajax').hide();
      alert_error(e);
  }
}else{
 alert_error("Cek Jaringan");
}

},error:function(e){
//debugger;;
alert_error('error');
}
});
}

// $('#slc-ibam-branch').change(function(){
//     getNoreg();
// })

//=======================================GET CONTRACT====================================\\ 
var tmp = [];
var tmp2 = [];
function getContract(callback){
var branch_code = $('#slc-ibam-branch').val();
var no_reg = $('#slc-reg-ibam').val();

if (check_session() === 'true') {
$.ajax({
    url: base_url +'Controller_execution_ibam/getContract',
    type: 'POST',
    data : {
        branch_code:branch_code,
        no_reg:no_reg
    },
    success: function(response){
        response = $.parseJSON(response);
        console.log(response);
        if (response){
            try{
             var status = response['status'];
             if(status) {
                if (response['data'] == null) {
                    alert_error('Data tidak ditemukan !');
                }else{
                    table_ibam_exe.clear().draw();
                    tmp = [];
                    tmp2 = [];
                    for (var i = 0 ; i < response['data'].length; i++) {

                        tmp2.push([
                         i+1,
                         response['data'][i].branch,
                         response['data'][i].cont_no,
                         response['data'][i].cust_name,
                         response['data'][i].addr,
                         response['data'][i].dst_name,
                         accounting.formatMoney(response['data'][i].utang, '', 2 , ',','.'),
                         response['data'][i].col_status,
                         response['data'][i].zipcode,
                         response['data'][i].tenor,
                         response['data'][i].subzipcode,
                         response['data'][i].objcode,
                         response['data'][i].no_reg,
                         response['data'][i].conid
                         ])


                        tmp.push([
                         i+1,
                         response['data'][i].branch,
                         response['data'][i].cont_no,
                         response['data'][i].cust_name,
                         response['data'][i].addr,
                         response['data'][i].dst_name,
                         response['data'][i].utang,
                         response['data'][i].col_status,
                         response['data'][i].zipcode,
                         response['data'][i].tenor,
                         response['data'][i].subzipcode,
                         response['data'][i].objcode,
                         response['data'][i].no_reg,
                         response['data'][i].conid,
                         response['data'][i].org_name,
                         response['data'][i].obj_des,
                         response['data'][i].constatus,
                         response['data'][i].cont_task,
                         response['data'][i].status_draft
                         ])
                    }
                    table_ibam_exe.rows.add(tmp2).draw();
                    var branch_code = $('#slc-ibam-branch').val();
                    var test = $('#slc-reg-ibam').val();
                    var dest = test.substring(5,9);
                    callback(branch_code, dest);
                    today = response['sysDate'];
                }
            }else{
                alert_error(response['errorConsole']);
            }
        }catch(e){
            $('#loading-ajax').hide();
            console.log(e);
            alert_error("Terjadi Kesalahan => "+e);
        }
    }else{
        alert_error(response);
    }
},error: function() {
    console.log(response);
    alert_error('Jaringan terputus, Silahkan coba lagi !');
}
});
}else{
alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
localStorage.clear();
window.location.href = base_url + "Controller_login/login_view";
});
}
}
var arrayData= [];
$('#slc-reg-ibam').change(function(){
getContract(getBranchName);
$('#btn-proses-ibam').prop('disabled', false);
$('#btn-preview-ibam').prop('disabled', false);
});

//=======================================VALIDASI====================================\\ 
var flag_process = 0;
var flag = 0;
$('#btn-proses-ibam').click(function(){   
getMDTCLOSINGSRC();
getMDTCLOSINGDTN();
if(flag_process != 1 && flag != 1){
alert_confirm('Apakah Anda Yakin Untuk Mengeksekusi?',function(){
  insertEx();
});
}
});

if (localStorage.getItem("menu_alias_am") === "EIB") {
$('#btn-agsource-ibam').prop('disabled', true);
$('#btn-agdest-ibam').prop('disabled', true);
$('#btn-preview-ibam').prop('disabled', true);
$('#btn-proses-ibam').prop('disabled', true);
}

$('#btn-proses-ibam').click(function(){
document.getElementById("ck2").setAttribute('disabled', 'disabled');
document.getElementById("ck3").setAttribute('disabled', 'disabled');
})

var clssrc;
function getMDTCLOSINGSRC(){
var branch_code = $('#slc-ibam-branch').val();

if (check_session() === 'true') {
$.ajax({
url: base_url +'Controller_execution_ibam/getClosing',
type: 'POST',
async: false,
data : {
    branch_code:branch_code
},
success: function(response){
    var response = $.parseJSON(response);
    console.log(response);
    if (response){
        try{
         var status = response['status'];
         if(status == false) {
            alert_error('Data tidak ditemukan !');
        }else{
           clssrc = response['mdtClosing'];

           if(clssrc != today){
            alert_refresh('Eksekusi IBAM Gagal silahkan lakukan closing cabang asal terlebih dahulu');
            flag_process = 1;
        }
    }
}catch(e){
    $('#loading-ajax').hide();
    console.log(e);
    alert_error("Terjadi Kesalahan => "+e);
}
}else{
alert_error(response);
}
},error: function(response) {
console.log(response);
alert_error('Jaringan terputus, Silahkan coba lagi !');
}
});
}else{
alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
localStorage.clear();
window.location.href = base_url + "Controller_login/login_view";
});
}
}

var today = '';
var clsdsn;
function getMDTCLOSINGDTN(){
var test = $('#slc-reg-ibam').val();
var dest = test.substring(5,9);

if (check_session() === 'true') {
$.ajax({
url: base_url +'Controller_execution_ibam/getClosing',
type: 'POST',
async: false,
data : {
    branch_code:dest,
},
success: function(response){
    var response = $.parseJSON(response);
    console.log(response);
    if (response){
        try{
         var status = response['status'];
         if(status == false) {
            alert_error('Data tidak ditemukan !');
        }else{
           clsdsn = response['mdtClosing'];

           if(clsdsn != today){
            alert_refresh('Eksekusi IBAM Gagal silahkan lakukan closing cabang tujuan terlebih dahulu');
            flag = 1;
        }
    }
}catch(e){
    $('#loading-ajax').hide();
    console.log(e);
    alert_error("Terjadi Kesalahan => "+e);
}
}else{
alert_error(response);
}
},error: function(response) {
console.log(response);
alert_error('Jaringan terputus, Silahkan coba lagi !');
}
});
}else{
alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
localStorage.clear();
window.location.href = base_url + "Controller_login/login_view";
});
}
}

//=======================================GENERATE CSV====================================\\ 
$("#btn-agsource-ibam").click(function(){
print_csv(tmp);
});

$("#btn-agdest-ibam").click(function(){
var branch_code = $('#slc-ibam-branch').val();
var no_reg = $('#slc-reg-ibam').val(); 
genereate_csv_dest(branch_code,no_reg);
});

function genereate_csv_dest(branch_code,no_reg){
var ket_status;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
today = mm + '-' + dd + '-' + yyyy;
var time = new Date();
var s = time.getSeconds();
var m = time.getMinutes();
var h = time.getHours();
time = h+'.'+m+'.'+s;

if (check_session() === 'true') {
$.ajax({
    url: base_url + "Controller_execution_ibam/getDest",
    dataType: 'text',
    type: 'POST',
    data:{branch_code,no_reg},
    cache: false,
    success: function(response){                   
        if(response) {
            try {
                console.log("ajax response success"); 
                console.log(response);
                var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
            //window.open(uri, 'test.csv');
            var downloadLink = document.createElement("a");
            downloadLink.href = uri;
            downloadLink.download = 'IBAM DESTINATION'+' '+dest_name+ '-' +src_name+'.csv';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            alert_info('Text File Berhasil Terbentuk ' + downloadLink.download);

        }catch(e) {
        $('#loading-ajax').hide(); //menutup loading ajax
        console.log(e);
        alert_error("Terjadi Kesalahan => " + e);
    }
}else{
    alert_error(response);
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

$("#btn-preview-ibam").click(function(){
priview_csv(tmp);
});

function print_csv(array){
if (check_session() === 'true') {
var branch_code = $('#slc-ibam-branch').val();
var no_reg = $('#slc-reg-ibam').val();
var test = $('#slc-reg-ibam').val();
var dest = test.substring(5,9);
$.ajax({
    url: base_url + "Controller_execution_ibam/read_csv_dpho_1",
    dataType: 'text',
    type: 'POST',
    data:{array},
    cache: false,
    success: function(response){                    
        if(response) {
            try {
                console.log("ajax response success"); 
                console.log(response);
                var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
            //window.open(uri, 'test.csv');
            var downloadLink = document.createElement("a");
            downloadLink.href = uri;
            downloadLink.download = 'IBAM SOURCE'+' '+src_name+ '-' +dest_name+'.csv';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            alert_info('Text File Berhasil Terbentuk Ke folder C://download/ ' + downloadLink.download);

        }catch(e) {
        $('#loading-ajax').hide(); //menutup loading ajax
        console.log(e);
        alert_error("Terjadi Kesalahan => " + e);
    }
}else{
    alert_error(response);
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

function priview_csv(array){
var branch_code = $('#slc-ibam-branch').val();
var no_reg = $('#slc-reg-ibam').val();
var test = $('#slc-reg-ibam').val();
var dest = test.substring(5,9);
if (check_session() === 'true') {
$.ajax({
    url: base_url + "Controller_execution_ibam/read_csv_dpho_3",
    dataType: 'text',
    type: 'POST',
    data:{array},
    cache: false,
    success: function(response){                   
        if(response) {
            try {
                console.log("ajax response success"); 
                console.log(response);
                var uri = 'data:application/csv;charset=UTF-8,' + encodeURIComponent(response);
            //window.open(uri, 'test.csv');
            var downloadLink = document.createElement("a");
            downloadLink.href = uri;
            downloadLink.download = 'IBAM'+' '+src_name+ '-' +dest_name+'.csv';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            alert_info('Text File Berhasil Terbentuk Ke folder C://download/ ' + downloadLink.download);

        }catch(e) {
        $('#loading-ajax').hide(); //menutup loading ajax
        console.log(e);
        alert_error("Terjadi Kesalahan => " + e);
    }
}else{
    alert_error(response);
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

//=======================================INSERT AND UPDATE====================================\\ 

var exl = [];
var exl2 = [];
function insertEx(){
// var branch_code = $('#slc-ibam-branch').val();
// var no_reg = $('#slc-reg-ibam').val();
// var test = $('#slc-reg-ibam').val();
// var dest = test.substring(5,9);

for (var i = 0; i < table_ibam_exe.data().length; i++) {
var branch_code = $('#slc-ibam-branch').val();
var no_reg = $('#slc-reg-ibam').val();
var test = $('#slc-reg-ibam').val();
var dest = test.substring(5,9);
arrayData.push({
contid : table_ibam_exe.rows().data()[i][13],
collstatus : table_ibam_exe.rows().data()[i][7],
branch_code : branch_code,
no_reg : no_reg,
dest : dest,
today : today,
clssrc : clssrc,
clsdsn : clsdsn
})
}

if (check_session() === 'true') {
$.ajax({
url: base_url +'Controller_execution_ibam/getInsertEx',
type: 'POST',
data : {
        // branch_code:branch_code,
        // no_reg:no_reg,
        // dest : dest,
        arrayData,
        // today : today,
        // clssrc : clssrc,
        // clsdsn : clsdsn
    },
    success: function(response){
        responses = $.parseJSON(response);
        if (responses){
           try{
             var status = responses['status'];
             var test = responses['flag'];
             if(status == false) {
                alert_error('Data tidak ditemukan !');
            }else{
                if(test != 200){
                    alert_error(responses["errorConsole: "]);
                    return false;
                }

                if(responses['gagal'].length != 0){
                    exl = [];
                    for(var i = 0 ; i < responses['gagal'].length; i++){

                        exl.push([
                            responses['gagal'][i].branch,
                            responses['gagal'][i].cont_no,
                            responses['gagal'][i].cust_name,
                            responses['gagal'][i].dest,
                            responses['gagal'][i].dst_name,
                            responses['gagal'][i].org_name,
                            responses['gagal'][i].zipcode,
                            responses['gagal'][i].subzipcode,
                            responses['gagal'][i].alasan,
                            responses['gagal'][i].alamat
                            ])

                    }
                    print_exl();
                }

                if(responses['berhasil'].length != 0){
                    exl2 = [];
                    for(var i = 0 ; i < responses['berhasil'].length; i++){

                        exl2.push([
                            responses['berhasil'][i].branch,
                            responses['berhasil'][i].cont_no,
                            responses['berhasil'][i].cust_name,
                            responses['berhasil'][i].dest,
                            responses['berhasil'][i].dst_name,
                            responses['berhasil'][i].org_name,
                            responses['berhasil'][i].zipcode,
                            responses['berhasil'][i].subzipcode,
                            responses['berhasil'][i].alamat
                            ])

                    }
                    print_exl2();
                }

                alert_info('Berhasil Insert !');
                table_ibam_exe.clear().draw();
                $('#btn-agdest-ibam').prop('disabled', false);
                $('#btn-proses-ibam').prop('disabled', true);
                $('#btn-agsource-ibam').prop('disabled', false);
                $('#btn-preview-ibam').prop('disabled', true);

            }
        }catch(e){
            $('#loading-ajax').hide();
            console.log(e);
            alert_error("Terjadi Kesalahan => "+e);
        } 
    }else{
        alert_error(responses);
    }
},error: function(response) {
    console.log(response);
    alert_error('Jaringan terputus, Silahkan coba lagi !');
}
});
}else{
alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
localStorage.clear();
window.location.href = base_url + "Controller_login/login_view";
});
}
}

var dest_name;
var src_name;
function getBranchName(branch_code, dest){
var branchsrc = $('#slc-ibam-branch').val();
if (check_session() === 'true') {
$.ajax({
url: base_url +'Controller_execution_ibam/getBranchName',
type: 'POST',
data : {
    branch_code,
    dest,
},
success: function(response){
    var response = $.parseJSON(response);
    console.log(response);
    if (response){
        try{
         var status = response['status'];
         if(status == false) {
            alert_error('Data tidak ditemukan !');
        }else{
           dest_name = "";
           src_name = "";
           for(var i = 0 ; i < response.data.length; i++){
            if(branchsrc == response['data'][i].branch_code){
               src_name = response['data'][i].branch_desc;
           }else{

               dest_name = response['data'][i].branch_desc;
           }

       }
   }
}catch(e){
$('#loading-ajax').hide();
console.log(e);
alert_error("Terjadi Kesalahan => "+e);
}
}else{
alert_error(response);
}
},error: function(response) {
console.log(response);
alert_error('Jaringan terputus, Silahkan coba lagi !');
}
});
}else{
alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
localStorage.clear();
window.location.href = base_url + "Controller_login/login_view";
});
}
}


function print_exl(){
if (check_session() === 'true') {
var htmls = "";
var uri = 'data:application/vnd.ms-excel;base64,';
var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'; 
var base64 = function(s) {
    return window.btoa(unescape(encodeURIComponent(s)))
};

var format = function(s, c) {
    return s.replace(/{(\w+)}/g, function(m, p) {
        return c[p];
    })
};

//var tab_text="<table>";
var textRange; var j=0;

var ss = $('#head-login').html();


// var tab = document.getElementById('print');

// for(j = 0 ; j < tab.rows.length ; j++) 
// {     
//     tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
// }

var tab_text = "<table border='2px'>" +
"<tr bgcolor='#87AFC6'>"+
"<td>KODE CABANG ASAL</td>"+
"<td>NAMA CABANG ASAL</td>"+
"<td>NOMOR KONTRAK</td>"+
"<td>NAMA NASABAH</td>"+
"<td>ALAMAT NASABAH</td>"+
"<td>ZIPCODE</td>"+
"<td>SUBZIPCODE</td>"+
"<td>KODE CABANG TUJUAN</td>"+
"<td>NAMA CABANG TUJUAN</td>"+
"<td>ALASAN</td>"+
"</tr>";
for(var j = 0; j < exl.length; j++){
    tab_text = tab_text +
    "<tr>"+
    "<td>&nbsp;"+exl[j][0]+"</td>"+
    "<td>"+exl[j][5]+"</td>"+
    "<td>&nbsp;"+exl[j][1]+"</td>"+
    "<td>"+exl[j][2]+"</td>"+
    "<td>"+exl[j][9]+"</td>"+
    "<td>&nbsp;"+exl[j][6]+"</td>"+
    "<td>&nbsp;"+exl[j][7]+"</td>"+
    "<td>&nbsp;"+exl[j][3]+"</td>"+
    "<td>"+exl[j][4]+"</td>"+
    "<td>"+exl[j][8]+"</td>"+
    "</tr>";
}   

var ctx = {
    worksheet : 'Worksheet',
    table : tab_text
}

var link = document.createElement("a");
link.download = "GAGAL IBAM.xls";
link.href = uri + base64(format(template, ctx));
link.click();
}else{
alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
    localStorage.clear();
    window.location.href = base_url + "Controller_login/login_view";
});
}
}

function print_exl2(){
if (check_session() === 'true') {
var htmls = "";
var uri = 'data:application/vnd.ms-excel;base64,';
var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'; 
var base64 = function(s) {
    return window.btoa(unescape(encodeURIComponent(s)))
};

var format = function(s, c) {
    return s.replace(/{(\w+)}/g, function(m, p) {
        return c[p];
    })
};

//var tab_text="<table>";
var textRange; var j=0;

var ss = $('#head-login').html();


// var tab = document.getElementById('print');

// for(j = 0 ; j < tab.rows.length ; j++) 
// {     
//     tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
// }

var tab_text = "<table border='2px'>" +
"<tr bgcolor='#87AFC6'>"+
"<td>KODE CABANG ASAL</td>"+
"<td>NAMA CABANG ASAL</td>"+
"<td>NOMOR KONTRAK</td>"+
"<td>NAMA NASABAH</td>"+
"<td>ALAMAT NASABAH</td>"+
"<td>ZIPCODE</td>"+
"<td>SUBZIPCODE</td>"+
"<td>KODE CABANG TUJUAN</td>"+
"<td>NAMA CABANG TUJUAN</td>"+
"</tr>";
for(var j = 0; j < exl2.length; j++){
    tab_text = tab_text +
    "<tr>"+
    "<td>&nbsp;"+exl2[j][0]+"</td>"+
    "<td>"+exl2[j][5]+"</td>"+
    "<td>&nbsp;"+exl2[j][1]+"</td>"+
    "<td>"+exl2[j][2]+"</td>"+
    "<td>"+exl2[j][8]+"</td>"+
    "<td>&nbsp;"+exl2[j][6]+"</td>"+
    "<td>&nbsp;"+exl2[j][7]+"</td>"+
    "<td>&nbsp;"+exl2[j][3]+"</td>"+
    "<td>"+exl2[j][4]+"</td>"+
    "</tr>";
}   

var ctx = {
    worksheet : 'Worksheet',
    table : tab_text
}

var link = document.createElement("a");
link.download = "BERHASIL IBAM.xls";
link.href = uri + base64(format(template, ctx));
link.click();
}else{
alert_info("Session Anda Telah Habis, Silahkan Login Kembali", function(){
    localStorage.clear();
    window.location.href = base_url + "Controller_login/login_view";
});
}
}
