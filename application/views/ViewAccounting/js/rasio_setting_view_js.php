<script>
var base_url                     = $('#base_url').val(); 
var kd_kantor_user               = $('#user_kode_kantor').val(); 
var divisi_user                  = $('#user_divisi_id').val(); 
var select_kantor                = '';

//update btn
var kd_kantor = '';
var jenis     = '';
var tgl       = '';



$(document).ready(function () {            
    bsCustomFileInput.init();
    $('.select2').select2();
    if(kd_kantor_user == '00' || divisi_user == 'IT'){
        select_kantor = '0';
        $('#src_kode_kantor').append('<option value="*" selected>Konsolidasi</option>');
        get_kode_kantor();
    }else{
        $('#src_kode_kantor').append('<option value="' + kd_kantor_user + '" selected>'+ kd_kantor_user +'</option>');
    }
    get_sysdate();  
   
    $('#loading-1').hide();
});


$('#btn_refresh').click(function () {
    getData(); 
});



function get_kode_kantor(){
    $.ajax({
            url : base_url + "Accounting/Rasio_setting_controller/get_kode_kantor",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
                if(select_kantor == '0'){
                    $.each(response.kode_kantor,function(i,data){
                        $('#src_kode_kantor').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
                    });
                }else if(select_kantor == '1'){
                    $.each(response.kode_kantor,function(i,data){
                        $('#modal_kode_kantor').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
                    });
                }
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Get List Kode Kantor!',
                    text: 'Mohon Periksa Jaringan Anda'
                });
                
            }
    });    
}
function get_sysdate(){
    $.ajax({
            url : base_url + "Accounting/Rasio_setting_controller/get_sysdate",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
                $('#src_tgl_laporan').val(response.sysdate);
                getData();
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Get Tanggal Sistem!',
                    text: 'Mohon Periksa Jaringan Anda'
                });
                
            }
    });    
}
function getData(){
   data = '';
   $('#tbl_rasio_setting').DataTable().clear();
   $('#tbl_rasio_setting').DataTable().destroy();
   $('#loading').show(); 
   var src_kode_kantor =  $('#src_kode_kantor').val();
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   $.ajax({
           url : base_url + "Accounting/Rasio_setting_controller/get_data_rasio_setting",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
            data:{"src_kode_kantor" : src_kode_kantor,
                  "src_tgl_laporan" : src_tgl_laporan},
           success : function(response) {
               mapping(response);
           },
           error : function(response) {
               console.log('failed :' + response);
               $('#loading').hide();
               return Swal.fire({
                   icon: 'error',
                   title: 'Gagal Get Data!',
                   text: 'Mohon Periksa Jaringan Anda'
               });
           }
   });
}
function mapping(response){
    for(i = 0; i < response.data_rasio.length; i++ ){
         data += `<tr style="text-align: center;">
                     <td>${response.data_rasio[i]['kode_kantor']} - ${response.data_rasio[i]['nama_kantor']}</td>
                     <td>${response.data_rasio[i]['jenis']}</td>
                     <td>${response.data_rasio[i]['tgl_laporan']}</td>
                     <td>${accounting.formatMoney(response.data_rasio[i]['jumlah1'], '', 2, ',', '.')}</td>
                     <td>${accounting.formatMoney(response.data_rasio[i]['jumlah2'], '', 2, ',', '.')}</td>
                     <td>${accounting.formatMoney(response.data_rasio[i]['rasio'], '', 2, ',', '.')}</td>
                     </tr>
                   `;
     }
     $('#tbl_rasio_setting > tbody:first').html(data);
     
     $(document).ready(function() {
         $('#tbl_rasio_setting').DataTable( {
             "destroy": true,
             "scrollX": true,
             "autoWidth" : false,
             "searching": false,
             "aaSorting" : []
         } );
     } );
     $('#loading').hide(); 
}
</script>