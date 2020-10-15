var dataTableeee = [];
var nomor = '';
var id = '';
var base_url = $('#base_url').val();



function serchDataJaminan(){
    var search = $('#search').val(); 
    var kode_kantor = $('#kode_kantor').val(); 
    dataTableeee = [];
    console.log('berubah :  ' + search + ' ' + kode_kantor);
    $('#loading').show(); 
    $('#tableLokasiJaminan').DataTable().clear();
    $('#tableLokasiJaminan').DataTable().destroy();
    $.ajax({
        url : base_url + "index.php/PemindahanVerifikasiController/getListJaminanSearch",
        type : "POST",
        dataType : "json",
        data : {"search"    : search,
                "kode_kantor"    : kode_kantor
               },

        success : function(response) {
            //console.log(response);  
                    
            dataTableeee.push(response); 

            console.log(dataTableeee);
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
            console.log("FINISH");
            
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Data Tidak Ditemukan, Mohon Periksa Kembali');
            $('#loading').hide(); 
        }
    });   
}
