var dataTableeee = [];
var mainTable = [];
var arrNomor = [];
var selectedData = '';
var nomor = '';
var agunan_id = '';
var index = 0;
var indexarray = '';
var base_url = $('#base_url').val();

$('#btn_tambah_jaminan_main').click(function () {
    dataTableeee = [];
    $('#modalJaminanDokumen').modal('show');
    $.ajax({
            url : base_url + "index.php/PemindahanInsertController/getMasterJaminan",
            type : "POST",
            dataType : "json",
            data : {"test"    : "test"},

            success : function(response) {
                dataTableeee.push(response); 

                $('#TableModalJaminan > tbody:first').html(dataTableeee);
                $(document).ready(function() {
                    $('#TableModalJaminan').DataTable( {
                        "destroy": true,
                        "scrollX": true,
                        "autoWidth" : false,
                        "searching": false,
                        "aaSorting" : []
                    } );
                } );
                $('#loadingModalJaminan').hide();  
                
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Gagal Get Data Master Jaminan');
                $('#modalNomorRekening').modal('hide');
            }
    });    
    
});
$('#btn_kembali_update_modal').click(function () {
    $('#loading').show();
    window.location = base_url + 'index.php/PemindahanJaminanMainController/index';
});

$('#bodyTableModalJaminan').on('click','.btnPilihJaminan', function () {
    nomor = $(this).data("nomor");
    agunan_id = $(this).data("agunanid");
    jenis = $(this).data("jenis");
    deskripsi = $(this).data("deskripsi");
    

    //console.log(nomor,agunan_id,jenis,deskripsi);
    selectedData = ['<tr> <td>'+ nomor + '</td> <td>'
                    + agunan_id + '</td> <td>'
                    + jenis +'</td> <td>'
                    + deskripsi +'</td> <td>'
                    + '<button type="button" class="btn btn-danger btn-sm btnDeleteJaminanData" style ="padding-left: 5px;"'
                    +           'data-nomor="'+nomor+'"'
                    +           'data-agunanid="'+agunan_id +'"'
                    +           'data-jenis="'+ jenis +'"'
                    +           'data-deskripsi="'+deskripsi+'"'
                    +           'data-indexarray="'+index+'"'
                    +           'name="btnDeleteJaminanData">' 
                    +           '<i style="padding-left: 5px;" class="fa fa-trash"></i> </button>  </td> </tr>'];   
   
    if(arrNomor.includes(nomor) == true){
        alert('Data Dengan Nomor ' + nomor + ' Sudah Ada');
        return
    }else{
        mainTable.push(selectedData);
        arrNomor.push(nomor);
    }
    $('#tablePemindahanInsertMain > tbody:first').html(mainTable);
    closeModalJaminanDokumen();
    index++;

});

$('#bodytablePemindahanInsertMain').on('click','.btnDeleteJaminanData', function () {
    nomor = $(this).data("nomor");
    agunan_id = $(this).data("agunanid");
    jenis = $(this).data("jenis");
    deskripsi = $(this).data("deskripsi");
    indexarray = $(this).data("indexarray");

    console.log(arrNomor.indexOf(nomor));
    if (confirm("Apakah Anda Yakin Akan Menghapus Data Dengan Nomor " + nomor)) {
        mainTable.splice(indexarray, 1);
        arrNomor.splice(arrNomor.indexOf(nomor), 1);
        $('#tablePemindahanInsertMain > tbody:first').html(mainTable);
    } else {
        alert('Data Batal Di Delete');
    }

});



function closeModalJaminanDokumen(){
    $('#modalJaminanDokumen').modal('hide');
}
function serchDataJaminan(){
    var search = $('#search').val(); 
    dataTableeee = [];
    $('#loadingModalJaminan').show(); 
    $('#TableModalJaminan').DataTable().clear();
    $('#TableModalJaminan').DataTable().destroy();
    $.ajax({
        url : base_url + "index.php/PemindahanInsertController/getMasterJaminanSearch",
        type : "POST",
        dataType : "json",
        data : {"search"    : search},

        success : function(response) {
            //console.log(response);  
                    
            dataTableeee.push(response); 

            console.log(dataTableeee);
            $('#TableModalJaminan > tbody:first').html(dataTableeee);
            $(document).ready(function() {
                $('#TableModalJaminan').DataTable( {
                    "destroy": true,
                    "scrollX": true,
                    "autoWidth" : false,
                    "searching": false,
                    "aaSorting" : []
                } );
            } );
            $('#loadingModalJaminan').hide();  
            
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Data Tidak Ditemukan, Mohon Periksa Kembali');
            $('#loadingModalJaminan').hide(); 
        }
    });   
}

