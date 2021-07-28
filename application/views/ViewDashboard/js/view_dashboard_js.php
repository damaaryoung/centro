<script>

var base_url                     = $('#base_url').val(); 
var src_tgl_realisasi_jaminan    = '';
var src_tgl_realisasi_jiwa       = '';

$(document).ready(function () {    
    getSysdate();
    $('.view_jaminan').hide();
    $('#tbl_recon_jaminan').hide();  
    $('#load_jaminan').hide();

    $('.view_jiwa').hide();
    $('#tbl_recon_jiwa').hide(); 
    $('#load_jiwa').hide(); 
});

$('#tampil_jaminan').click(function () {
    getData_jaminan();
    $('.view_jaminan').show();
    $('#tampil_jaminan').hide(); 
});

$('#tampil_jiwa').click(function () {
    getData_jiwa();
    $('.view_jiwa').show();
    $('#tampil_jiwa').hide(); 
});



function getSysdate(){
    $.ajax({
           url : base_url + "DashboardController/getSysdate",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           success : function(sysdate) { 
                $('#src_tgl_realisasi_jaminan').val(sysdate.sysdate);
                $('#src_tgl_realisasi_jiwa').val(sysdate.sysdate); 
           },
           error : function(sysdate) {
               console.log('failed :' + sysdate);
               $('#loading').hide();
               return Swal.fire({
                   icon: 'error',
                   title: 'Gagal Get Data!',
                   text: 'Mohon Periksa Jaringan Anda'
               });
           }
   });
}

async function getData_jaminan(){
   data = '';
   src_tgl_realisasi_jaminan = $('#src_tgl_realisasi_jaminan').val();
   $('.tbl_recon_jaminan').hide();  
   $('#load_jaminan').show();
   $.ajax({
           url : base_url + "DashboardController/get_data_jaminan",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
            data:{"src_tgl_realisasi_jaminan" : src_tgl_realisasi_jaminan},
           success : function(response) { 
               console.log(response);
               mapping_jaminan(response);
           },
           error : function(response) {
               console.log(response);
               $('#load_jaminan').hide();  
               return Swal.fire({
                   icon: 'error',
                   title: 'Gagal Get Data!',
                   text: 'Mohon Periksa Jaringan Anda'
               });
           }
   });

       

}

async function getData_jiwa(){
    data1 = '';
    $('.tbl_recon_jiwa').hide();  
    $('#load_jiwa').show();
    src_tgl_realisasi_jiwa = $('#src_tgl_realisasi_jiwa').val();
    
    $.ajax({
            url : base_url + "DashboardController/get_data_jiwa",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            data:{"src_tgl_realisasi_jiwa" : src_tgl_realisasi_jiwa},
            success : function(response_jiwa) {
                console.log(response_jiwa);
                 mapping_jiwa(response_jiwa);
            },
            error : function(response_jiwa) {
                console.log(response_jiwa);
                $('#load_jiwa').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Get Data!',
                    text: 'Mohon Periksa Jaringan Anda'
                });
            }
    });

}



function mapping_jaminan(response){
    $('#load_jaminan').hide(); 
    $('.tbl_recon_jaminan').show(); 
    $('#tbl_recon_jaminan').show(); 
    $('#tbl_recon_jaminan').DataTable().clear();
    $('#tbl_recon_jaminan').DataTable().destroy();
    for(i = 0; i < response.data_rekon.length; i++ ){
        data += `<tr>
                    <td>${response.data_rekon[i]['kode_kantor']}</td>
                    <td>${response.data_rekon[i]['nama_kantor']}</td>
                    <td>${accounting.formatMoney(response.data_rekon[i]['sisa_buku_besar'], '', 2, ',', '.')}</td>
                    <td>${accounting.formatMoney(response.data_rekon[i]['sisa_centro'], '', 2, ',', '.')}</td>
                    <td>${accounting.formatMoney(response.data_rekon[i]['selisih'], '', 2, ',', '.')}</td>
                 </tr>`;
    }
        data += `<tr>
                    <td></td>
                    <td>Total Konsolidasi</td>
                    <td>${accounting.formatMoney(response.total_rekon[0]['sisa_buku_besar1'], '', 2, ',', '.')}</td>
                    <td>${accounting.formatMoney(response.total_rekon[0]['sisa_centro1'], '', 2, ',', '.')}</td>
                    <td>${accounting.formatMoney(response.total_rekon[0]['selisih1'], '', 2, ',', '.')}</td>
                 </tr>`;
    $('#tbl_recon_jaminan > tbody:first').html(data);
     
     $(document).ready(function() {
         $('#tbl_recon_jaminan').DataTable( {
             "destroy": true,
             "scrollX": true,
             "autoWidth" : false,
             "searching": false,
             "aaSorting" : [],
             "paging"    : false
         } );
     } );
     $('#loading').hide(); 
}

function mapping_jiwa(response_jiwa){
    
    $('#load_jiwa').hide(); 
    $('.tbl_recon_jiwa').show(); 
    $('#tbl_recon_jiwa').show(); 
    $('#tbl_recon_jiwa').DataTable().clear();
    $('#tbl_recon_jiwa').DataTable().destroy();
    for(i = 0; i < response_jiwa.data_rekon.length; i++ ){
        data1 += `<tr>
                    <td>${response_jiwa.data_rekon[i]['kode_kantor']}</td>
                    <td>${response_jiwa.data_rekon[i]['nama_kantor']}</td>
                    <td>${accounting.formatMoney(response_jiwa.data_rekon[i]['sisa_buku_besar'], '', 2, ',', '.')}</td>
                    <td>${accounting.formatMoney(response_jiwa.data_rekon[i]['sisa_centro'], '', 2, ',', '.')}</td>
                    <td>${accounting.formatMoney(response_jiwa.data_rekon[i]['selisih'], '', 2, ',', '.')}</td>
                 </tr>`;
    }
    data1 += `<tr>
                    <td></td>
                    <td>Total Konsolidasi</td>
                    <td>${accounting.formatMoney(response_jiwa.total_rekon[0]['sisa_buku_besar1'], '', 2, ',', '.')}</td>
                    <td>${accounting.formatMoney(response_jiwa.total_rekon[0]['sisa_centro1'], '', 2, ',', '.')}</td>
                    <td>${accounting.formatMoney(response_jiwa.total_rekon[0]['selisih1'], '', 2, ',', '.')}</td>
                 </tr>`;
    $('#tbl_recon_jiwa > tbody:first').html(data1);
     
     $(document).ready(function() {
         $('#tbl_recon_jiwa').DataTable( {
             "destroy": true,
             "scrollX": true,
             "autoWidth" : false,
             "searching": false,
             "aaSorting" : [],
             "paging"    : false
         } );
     } );
     $('#loading').hide(); 
}
</script>