<script>
var dataTableeee = [];
var search = '';
var kode_kantor = '';
var base_url = $('#base_url').val();
var user_kode_kantor = $('#user_kode_kantor').val();
var user_divisi_id = $('#user_divisi_id').val();

$(document).ready(function () {     
   
   getData();
   $('.select2').select2();
   $('#main_kode_kantor').append('<option value="' + user_kode_kantor + '" selected>'+ user_kode_kantor +'</option>');
   if(user_kode_kantor == '00' || user_divisi_id == 'IT'){
       get_kode_kantor();
   }
    
});

$('#main_search').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        searchData();
    }
}); 

function getData(){
    dataTableeee = [];
    $('#loading').show(); 

    $.ajax({
            url : base_url + "Request_Jaminan_Verifikasi_Controller/getListRequest",
            type : "POST",
            dataType : "json",
            data : {"proses" : "getAwal"},

            success : function(response) {
                $('#table_request_jaminan').DataTable().clear();
                $('#table_request_jaminan').DataTable().destroy();
                dataTableeee.push(response); 
                $('#table_request_jaminan > tbody:first').html(dataTableeee);
                $(document).ready(function() {
                    $('#table_request_jaminan').DataTable( {
                        "destroy": true,
                        "scrollX": true,
                        "autoWidth" : false,
                        "searching": false,
                        "aaSorting" : []
                    } );
                } );
                $('#loading').hide();  
                
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Gagal Get Data, Tidak Ada Data / Mohon Coba Kembali Beberapa Saat Lagi');
                $('#loading').hide();
            }
    });    
}

function searchData(){
    
    dataTableeee = [];
    $('#loading').show(); 
    search      = $('#main_search').val(); 
    kode_kantor = $('#main_kode_kantor').val();
    console.log(search);

    $.ajax({
            url : base_url + "Request_Jaminan_Verifikasi_Controller/getListRequest",
            type : "POST",
            dataType : "json",
            data : {"search" : search,
                    "kode_kantor" : kode_kantor,
                    "proses" : "searchData"},
            success : function(response) {
                $('#table_request_jaminan').DataTable().clear();
                $('#table_request_jaminan').DataTable().destroy();
                dataTableeee.push(response); 
                $('#table_request_jaminan > tbody:first').html(dataTableeee);
                $(document).ready(function() {
                    $('#table_request_jaminan').DataTable( {
                        "destroy": true,
                        "scrollX": true,
                        "autoWidth" : false,
                        "searching": false,
                        "aaSorting" : []
                    } );
                } );
                $('#loading').hide();  
                
            },
            error : function(response) {
                console.log('failed :' + response);
                toastr["warning"]("Gagal Get Data, Mohon Periksa Jaringan Anda", "Perhatian!");
                toastr.options = {
                    "closeButton": true,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": true,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                    }
                $('#loading').hide();
            }
    });    
}
function get_kode_kantor(){
    $.ajax({
            url : base_url + "Request_Jaminan_Verifikasi_Controller/get_kode_kantor",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
                $.each(response.kode_kantor,function(i,data){
                    $('#main_kode_kantor').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
                });
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                alert('Gagal Get Data, Mohon Periksa Jaringan Anda');
                
            }
    });    
}


</script>