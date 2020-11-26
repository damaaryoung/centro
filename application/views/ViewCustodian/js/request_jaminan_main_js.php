<script>
var dataTableeee = [];
var search = '';
var kode_kantor = '';
var base_url = $('#base_url').val();

$(document).ready(function () {     
   
    dataTableeee = [];
    $('#loading').show(); 

    $.ajax({
            url : base_url + "index.php/Request_Jaminan_Centro_Controller/getListRequest",
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

$('#btn_tambah').click(function () {
    window.location = '<?= base_url(); ?>Request_Jaminan_Centro_Controller/transaksiRequestJaminan';
});

function searchData(){
    
    dataTableeee = [];
    $('#loading').show(); 
    search      = $('#main_search').val(); 
    kode_kantor = $('#main_kode_kantor').val();
    //console.log(search);

    $.ajax({
            url : base_url + "index.php/Request_Jaminan_Centro_Controller/getListRequest",
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
                alert('Data Tidak Ditemukan');
                $('#loading').hide();
            }
    });    
}

$('#table_body_request_jaminan').on('click','.btnDeleteRequestJaminan', function () {
    nomor = $(this).data("nomor");
    id = $(this).data("id"); 
    verifikasi = $(this).data("verifikasi"); 

    if(verifikasi == '1'){
        alert('Data Sudah Di Verifikasi, Data Tidak Dapat Dihapus');
        return;
    }
    //console.log('button di click : ' + nomor + ' ' + id);
    $('#loading').show();
    if (confirm("Apakah Anda Yakin Akan Menghapus Data Dengan Nomor " + nomor)) {
        $.ajax({
            url : base_url + "index.php/Request_Jaminan_Centro_Controller/deleteDataPemindahanLokasi",
            type : "POST",
            dataType : "json",
            data : {"nomor"    : nomor,
                    "id"       : id},
    
            success : function(response) {
                console.log(response)
                alert('Data Berhasil Dihapus');
                window.location = '<?= base_url(); ?>request_jaminan_centro';
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Gagal Hapus Data Lokasi Pemindahan Lokasi Jaminan, Mohon Coba Lagi');
                window.location = '<?= base_url(); ?>request_jaminan_centro';
            }
        }); 
    } else {
        alert('Data Batal Di Hapus');
        $('#loading').hide();  
    }

});


</script>