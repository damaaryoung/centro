<script>
var dataTableeee = [];
var search = '';
var kode_kantor = '';
var base_url = $('#base_url').val();

$(document).ready(function () {     
   
    dataTableeee = [];
    $('#loading').show(); 

    $.ajax({
            url : base_url + "index.php/Request_Jaminan_Verifikasi_Controller/getListRequest",
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

    
});

$('#main_search').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        searchData();
    }
}); 


function searchData(){
    
    dataTableeee = [];
    $('#loading').show(); 
    search      = $('#main_search').val(); 
    kode_kantor = $('#main_kode_kantor').val();
    console.log(search);

    $.ajax({
            url : base_url + "index.php/Request_Jaminan_Verifikasi_Controller/getListRequest",
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
                toastr["warning"]("Data Tidak Ditemukan", "Perhatian!");
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
</script>