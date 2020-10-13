var dataTableeee = [];
var mainTable = [];
var arrNomorReff = [];
var arrAgunanID = [];
var selectedData = '';
var nomorreff = '';
var agunan_id = '';

var mainTanggal = '';
var kode_kantor_tujuan = '';
var kode_lokasi_penyimpanan = '';
var mainKeterangan = '';
var lengthParsed = '';
var parsedDataDetailArr = [];
var base_url = $('#base_url').val();


$(document).ready(function () {     
    
    var dataNomor = $('#getNomor').val();
    console.log(dataNomor);
    $('#loading').show(); 

    $.ajax({
        url : base_url + "index.php/PemindahanUpdateController/getDataDetail",
        type : "POST",
        dataType : "json",
        data : {"dataNomor" : dataNomor},

        success : function(response) {
            console.log(response); 
            //console.log(response[1][2]);

            for(i = 0; i < response.length; i++ ){
                mainTable.push(response[i][0]);
                arrNomorReff.push(response[i][1]);
                arrAgunanID.push(response[i][2]);
            }
            // console.log(arrAgunanID);
            $('#tablePemindahanUpdateMain > tbody:first').html(mainTable);

            $('#loading').hide(); 
        },
        error : function(response) {
            console.log(response);
            alert('Gagal Get Data, Mohon Coba Lagi');
            //window.location = base_url + 'index.php/PemindahanJaminanMainController/index';
        }
    });
    
});
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
$('#btn_kembali_update_pemindahan_lokasi').click(function () {
    $('#loading').show();
    window.location = base_url + 'index.php/PemindahanJaminanMainController/index';
});

$('#bodyTableModalJaminan').on('click','.btnPilihJaminan', function () {
    nomorreff = $(this).data("nomorreff");
    agunan_id = $(this).data("agunanid");
    jenis = $(this).data("jenis");
    deskripsi = $(this).data("deskripsi");
    
    selectedData = ['<tr> <td>'+ nomorreff + '</td> <td>'
                    + agunan_id + '</td> <td>'
                    + jenis +'</td> <td>'
                    + deskripsi +'</td> <td>'
                    + '<button type="button" class="btn btn-danger btn-sm btnDeleteJaminanData" style ="padding-left: 5px;"'
                    +           'data-nomorreff="'+nomorreff+'"'
                    +           'data-agunanid="'+agunan_id +'"'
                    +           'data-jenis="'+ jenis +'"'
                    +           'data-deskripsi="'+deskripsi+'"'
                    +           'name="btnDeleteJaminanData">' 
                    +           '<i style="padding-left: 5px;" class="fa fa-trash"></i> </button>  </td> </tr>'];   
   
    if(arrNomorReff.includes(nomorreff) == true && arrAgunanID.includes(agunan_id)){
        alert('Data Dengan Nomor Ref ' + nomorreff + ' dan Agunan ID ' +agunan_id+' Sudah Ada Dalam List');
        return
    }else{
        mainTable.push(selectedData);
        arrNomorReff.push(nomorreff);
        arrAgunanID.push(agunan_id);
    }
    $('#tablePemindahanUpdateMain > tbody:first').html(mainTable);
    closeModalJaminanDokumen();

});
$('#bodytablePemindahanUpdateMain').on('click','.btnDeleteJaminanData', function () {
    nomorreff = $(this).data("nomorreff");
    agunan_id = $(this).data("agunanid");
    jenis = $(this).data("jenis");
    deskripsi = $(this).data("deskripsi");
   
    selectedData = ['<tr> <td>'+ nomorreff + '</td> <td>'
                    + agunan_id + '</td> <td>'
                    + jenis +'</td> <td>'
                    + deskripsi +'</td> <td>'
                    + '<button type="button" class="btn btn-danger btn-sm btnDeleteJaminanData" style ="padding-left: 5px;"'
                    +           'data-nomorreff="'+nomorreff+'"'
                    +           'data-agunanid="'+agunan_id +'"'
                    +           'data-jenis="'+ jenis +'"'
                    +           'data-deskripsi="'+deskripsi+'"'
                    +           'name="btnDeleteJaminanData">' 
                    +           '<i style="padding-left: 5px;" class="fa fa-trash"></i> </button>  </td> </tr>']; 
    // $('#loading').show();  
    if (confirm("Apakah Anda Yakin Akan Menghapus Data Dengan No. Reff " + nomorreff)) {
        for(i = 0; i < mainTable.length; i++ ){
            var detaDelete = mainTable[i].toString();
            if(detaDelete == selectedData){
                mainTable.splice (i, 1);
                arrNomorReff.splice (i, 1);
                arrAgunanID.splice (i, 1);
            }
        }
        $('#tablePemindahanUpdateMain > tbody:first').html(mainTable);
        alert('Data Dihapus');
        $('#loading').hide();  
    } else {
        alert('Data Batal Di Hapus');
        $('#loading').hide();  
    }
    console.log(selectedData);

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
