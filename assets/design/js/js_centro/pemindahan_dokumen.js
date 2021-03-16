var dataTableeee = [];
var nomor = '';
var id = '';
var base_url = $('#base_url').val();
var user_kode_kantor = $('#user_kode_kantor').val();
var user_divisi_id = $('#user_divisi_id').val();

$(document).ready(function () {     
   
    dataTableeee = [];
    $('#loading').show(); 
    get_data_awal();
     
    $('.select2').select2();

    $('#kode_kantor').append('<option value="' + user_kode_kantor + '" selected>'+ user_kode_kantor +'</option>');
    if(user_kode_kantor == '00' || user_divisi_id == 'IT'){
        get_kode_kantor();
    }
    
});


$('#bodyTableLokasiJaminan').on('click','.btnDeleteLokasiJaminan', function () {
    nomor = $(this).data("nomor");
    id = $(this).data("id"); 
    verifikasi = $(this).data("verifikasi"); 

    if(verifikasi == '1'){
        alert('Data Sudah Di Verifikasi, Data Tidak Dapat Dihapus');
        return;
    }
    $('#loading').show();
    if (confirm("Apakah Anda Yakin Akan Menghapus Data Dengan Nomor " + nomor)) {
        $.ajax({
            url : base_url + "PemindahanJaminanMainController/deleteDataPemindahanLokasi",
            type : "POST",
            dataType : "json",
            data : {"nomor"    : nomor,
                    "id"       : id},
    
            success : function(response) {
                console.log(response)
                alert('Data Berhasil Dihapus');
                window.location = base_url + 'PemindahanJaminanMainController/index';
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Gagal Hapus Data Lokasi Pemindahan Lokasi Jaminan, Mohon Coba Lagi');
                window.location = base_url + 'PemindahanJaminanMainController/index';
            }
        }); 
    } else {
        alert('Data Batal Di Hapus');
        $('#loading').hide();  
    }

});

function get_data_awal(){
      
    $.ajax({
        url : base_url + "PemindahanJaminanMainController/getListJaminan",
        type : "POST",
        dataType : "json",
        data : {"search"    : 'search'
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
            console.log("FINISH");
            
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Gagal Get Data, Tidak Ada Data Atau Mohon Coba Beberapa Saat Lagi');
            $('#loading').hide(); 
        }
    });   
}
function serchDataJaminan(){
    var search = $('#search').val(); 
    var kode_kantor = $('#kode_kantor').val(); 
    dataTableeee = [];
    $('#loading').show(); 
   
    $.ajax({
        url : base_url + "PemindahanJaminanMainController/getListJaminanSearch",
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
            console.log("FINISH");
            
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
            url : base_url + "PemindahanJaminanMainController/get_kode_kantor",
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

