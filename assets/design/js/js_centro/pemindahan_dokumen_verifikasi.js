var dataTableeee = [];
var nomor = '';
var id = '';
var base_url = $('#base_url').val();
var user_kode_kantor = $('#user_kode_kantor').val();
var user_divisi_id = $('#user_divisi_id').val();

$(document).ready(function () {     
   
    loadDataAwal();
    $('.select2').select2();
    $('#kode_kantor').append('<option value="' + user_kode_kantor + '" selected>'+ user_kode_kantor +'</option>');
    if(user_kode_kantor == '00' || user_divisi_id == 'IT'){
        get_kode_kantor();
    }
    
    
});


function serchDataJaminan(){
    var search = $('#search').val(); 
    var kode_kantor = $('#kode_kantor').val(); 
    dataTableeee = [];
    $('#loading').show(); 
    $.ajax({
        url : base_url + "PemindahanVerifikasiController/getListJaminanSearch",
        type : "POST",
        dataType : "json",
        data : {"search"    : search,
                "kode_kantor"    : kode_kantor
               },

        success : function(response) {
            $('#tableLokasiJaminan').DataTable().clear();
            $('#tableLokasiJaminan').DataTable().destroy();
                    
            dataTableeee.push(response); 

            $('#tableLokasiJaminan > tbody:first').html(dataTableeee);
            $(document).ready(function() {
                $('#tableLokasiJaminan').DataTable( {
                    "destroy": true,
                    "scrollX": true,
                    "autoWidth" : true,
                    "searching": false,
                    "aaSorting" : []
                } );
            } );
            $('#loading').hide();  
            
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Data Tidak Ditemukan, Mohon Periksa Kembali');
            $('#loading').hide(); 
        }
    });   
}

function loadDataAwal(){
    dataTableeee = [];
    $('#loading').show(); 
    $.ajax({
        url : base_url + "PemindahanVerifikasiController/getDataAwal",
        type : "POST",
        dataType : "json",

        success : function(response) {
            $('#tableLokasiJaminan').DataTable().clear();
            $('#tableLokasiJaminan').DataTable().destroy();
                    
            dataTableeee.push(response); 

            $('#tableLokasiJaminan > tbody:first').html(dataTableeee);
            $(document).ready(function() {
                $('#tableLokasiJaminan').DataTable( {
                    "destroy": true,
                    "scrollX": true,
                    "autoWidth" : true,
                    "searching": false,
                    "aaSorting" : []
                } );
            } );
            $('#loading').hide();  
            
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Data Tidak Ditemukan, Mohon Periksa Kembali');
            $('#loading').hide(); 
        }
    });   
}
function get_kode_kantor(){
    $.ajax({
            url : base_url + "PemindahanVerifikasiController/get_kode_kantor",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
                $.each(response.kode_kantor,function(i,data){
                    $('#kode_kantor').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
                });
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                alert('Gagal Get Data, Mohon Periksa Jaringan Anda');
                
            }
    });    
}