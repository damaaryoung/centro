<script>
var dataTableeee        = [];
var selectedData        = [];
var mainTable           = [];
var arrNomorReff        = [];
var arrAgunanID         = [];
var parsedDataDetailArr = [];
var email               = [];
var emailData           = [];
var lengthParsed  = '';
var nomorreff     = '';
var agunan_id     = '';
var deskripsi     = '';
var jenis         = '';
var main_tanggal  = '';
var kode_custodian = '';
var kode_kantor_lokasi_jaminan = '';
var main_keperluan = '';
var main_keterangan = '';
var main_pic = '';


$('#btn_tambah_jaminan_main').click(function () {
    dataTableeee = [];
    $('#modalJaminanDokumen').modal('show');
    kode_kantor_lokasi_jaminan = $('#kode_kantor_lokasi_jaminan').val();
    
    $('#TableModalJaminan').DataTable().clear();
    $('#TableModalJaminan').DataTable().destroy();
    $.ajax({
            url :  "<?= base_url(); ?>Request_Jaminan_Centro_Controller/getMasterJaminan",
            type : "POST",
            dataType : "json",
            data : {"kode_kantor_lokasi_jaminan"    : kode_kantor_lokasi_jaminan},

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
        url : "<?= base_url(); ?>Request_Jaminan_Centro_Controller/getMasterJaminanSearch",
        type : "POST",
        dataType : "json",
        data : {"search"    : search},

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
            alert('Data Tidak Ditemukan, Mohon Periksa Kembali');
            $('#loadingModalJaminan').hide(); 
        }
    });   
}

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
    email = ['<tr> <td>'+ nomorreff + '</td> <td>'
                    + agunan_id + '</td> <td>'
                    + jenis +'</td> <td>'
                    + deskripsi +'</td>'
                    + '</tr>'];   
   
    if(arrNomorReff.includes(nomorreff) == true && arrAgunanID.includes(agunan_id) == true){
        alert('Data Dengan Nomor Ref ' + nomorreff + ' dan Agunan ID ' +agunan_id+' Sudah Ada Dalam List');
        return
    }else{
        mainTable.push(selectedData);
        emailData.push(email);
        arrNomorReff.push(nomorreff);
        arrAgunanID.push(agunan_id);
    }
    $('#table_request_jaminan > tbody:first').html(mainTable);
    closeModalJaminanDokumen();

});

$('#table_body_request_jaminan').on('click','.btnDeleteJaminanData', function () {
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
    email = ['<tr> <td>'+ nomorreff + '</td> <td>'
                    + agunan_id + '</td> <td>'
                    + jenis +'</td> <td>'
                    + deskripsi +'</td>'
                    + '</tr>'];
    $('#loading').show();  
    if (confirm("Apakah Anda Yakin Akan Menghapus Data Dengan No. Reff " + nomorreff)) {
        for(i = 0; i < mainTable.length; i++ ){
            var detaDelete = mainTable[i].toString();
            if(detaDelete == selectedData){
                mainTable.splice (i, 1);
                emailData.splice (i, 1);
                arrNomorReff.splice (i, 1);
                arrAgunanID.splice (i, 1);
            }
        }
        $('#table_request_jaminan > tbody:first').html(mainTable);
        alert('Data Dihapus');
        $('#loading').hide();  
    } else {
        alert('Data Batal Di Hapus');
        $('#loading').hide();  
    }

});

$('#btn_simpan').click(function () {

    main_tanggal    = $('#main_tanggal').val();
    kode_custodian  = $('#kode_custodian').val();
    kode_kantor_lokasi_jaminan = $('#kode_kantor_lokasi_jaminan').val();
    main_keperluan  = $('#main_keperluan').val();
    main_keterangan = $('#main_keterangan').val();
    main_pic        = $('#main_pic').val();

    for(i = 0; i < mainTable.length; i++ ){
        var data = [arrNomorReff[i].toString(), arrAgunanID[i].toString(), emailData[i].toString()];
        parsedDataDetailArr.push(data);
    }
    lengthParsed = parsedDataDetailArr.length;

    // console.log(main_tanggal, kode_custodian, kode_kantor_lokasi_jaminan, main_keperluan, main_keterangan, main_pic);
    // console.log(parsedDataDetailArr, lengthParsed);
   
    if(lengthParsed == 0){
        alert("Anda Belum Menambahkan Detail Data Pengajuan !");
        return;
    }
    console.log(mainTable);
    $('#loading').show(); 
    $.ajax({
        url : "<?= base_url(); ?>Request_Jaminan_Centro_Controller/insertDataPemindahan",
        type : "POST",
        dataType : "json",
        data : {"main_tanggal"               : main_tanggal,
                "kode_custodian"             : kode_custodian,
                "kode_kantor_lokasi_jaminan" : kode_kantor_lokasi_jaminan,
                "main_keperluan"             : main_keperluan,
                "main_keterangan"            : main_keterangan,
                "parsedDataDetailArr"        : parsedDataDetailArr,
                "lengthParsed"               : lengthParsed,
                "main_pic"                   : main_pic},

        success : function(response) {
            console.log(response);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Sukses Request Jaminan Ke Centro, Silahkan Tunggu Proses Verifikasi Dari Centro',
                showConfirmButton: false,
                timer: 2000
            }).then(()=> {
                window.location = '<?= base_url(); ?>request_jaminan_centro';
                $('#loading').hide(); 
                console.log(response);
            });  

        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Gagal Request Jaminan Ke Centro, Silahkan Coba Beberapa Saat Lagi');
            window.location = '<?= base_url(); ?>request_jaminan_centro';
        }
    });
    
}); 

$('#btn_batal').click(function () {
    window.location = '<?= base_url(); ?>request_jaminan_centro';
});







</script>