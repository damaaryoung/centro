var dataTableeee = [];
var nomor = '';
var id = '';
var base_url = $('#base_url').val();

$(document).ready(function () {     
   
    loadDataAwal();
    
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