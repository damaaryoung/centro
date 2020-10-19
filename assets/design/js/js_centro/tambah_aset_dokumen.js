var dataTableeee = [];
var base_url = $('#base_url').val();

$('#mainBtnSearchRekening').click(function () {
    $('#modalNomorRekening').modal('show');
    dataTableeee = [];
    console.log('button di click');
    $.ajax({
            url : base_url + "index.php/AsetDokumenEntryController/getNomorRekening",
            type : "POST",
            dataType : "json",
            data : {"test"    : "test"},

            success : function(response) {
                //console.log(response);  
                        
                dataTableeee.push(response); 

                console.log(dataTableeee);
                $('#TableNoRek > tbody:first').html(dataTableeee);
                $(document).ready(function() {
                    $('#TableNoRek').DataTable( {
                        "destroy": true,
                        "scrollX": true,
                        "autoWidth" : false,
                        "searching": false,
                        "aaSorting" : []
                    } );
                } );
                $('#loading2').hide();  
                console.log("FINISH");
                
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Gagal Get Detail Nomor Rekening, Silahkan Coba Lagi');
                $('#modalNomorRekening').modal('hide');
            }
    });    
    
});
$('#bodyNomorRekening').on('click','.btnPilihRekening', function () {
    var namaNasabah   = $(this).data("nama");
    var noRekening   = $(this).data("norek");

    $('#mainNomorRekening').val(noRekening);
    $('#mainNamaNasabah').val(namaNasabah);
    $('#modalNomorRekening').modal('hide');
});
$('#btn_kembali_norek_modal').click(function ()  {
    $('#modalNomorRekening').modal('hide');
});
$('#btn_kembali_norek_modal2').click(function () {
    $('#modalNomorRekening').modal('hide');
});



function serchDataRekening(){
    $('#TableNoRek').DataTable().clear();
    $('#TableNoRek').DataTable().destroy();
    var search = $('#search').val(); 
    dataTableeee = [];
    console.log('berubah :  ' + search + ' ');
    $('#loading2').show(); 

    $.ajax({
            url : base_url + "index.php/AsetDokumenEntryController/getDataSearchRekening",
            type : "POST",
            dataType : "json",
            data : {"search"    : search},

            success : function(response) {
                //console.log(response);  
                        
                dataTableeee.push(response); 

                console.log(dataTableeee);
                $('#TableNoRek > tbody:first').html(dataTableeee);
                $(document).ready(function() {
                    $('#TableNoRek').DataTable( {
                        "destroy": true,
                        "scrollX": true,
                        "autoWidth" : false,
                        "searching": false,
                        "aaSorting" : []
                    } );
                } );
                $('#loading2').hide();  
                console.log("FINISH");
                
            },
            error : function(response) {
                console.log('failed :' + response);
                alert('Data Tidak Ditemukan');
            }
    });    
}


$(document).ready(function () {     
    
    console.log($('#rowSertNoSertif').val());

    if($('#rowSertNoSertif').text() != ''){
        $('#main_tab_bpkb').hide(); 
        $('#main_tab_emas').hide(); 
        $('#main_tab_sert').show();
    } else  if($('#rowBPKBNoBpkb').text() != ''){
        $('#main_tab_bpkb').show(); 
        $('#main_tab_emas').hide(); 
        $('#main_tab_sert').hide();
    } else  if($('#rowEmasNoSeri').text() != ''){
        $('#main_tab_bpkb').hide(); 
        $('#main_tab_emas').show(); 
        $('#main_tab_sert').hide();
    }
    $('#mainTakeover').on('click', function(){             

        if(document.getElementById("mainTakeover").checked == true){
            console.log('di check');
            $('#mainTransaksi option:contains(WAITING)').prop({selected: true});
        }
        if(document.getElementById("mainTakeover").checked == false){
            console.log('tidak');
            $('#mainTransaksi option:contains(MASUK)').prop({selected: true});
        }
    })


});

$('#delTempSert').click(function () {
    $('#loading').show();
    $.ajax({
        url : base_url + "index.php/AsetDokumenEntryController/deleteTempSert",
        type : "POST",
        dataType : "json",
        data : {"data"    : "data"},

        success : function(response) {
            console.log(response);
            alert('Data Sukses Di Hapus');
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/displayTambahAsetDokumen';  
        },
        error : function(response) {
            alert('Data Gagal Di Hapus');
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/displayTambahAsetDokumen';
        }
    }); 
});

$('#deleteTempBPKB').click(function () {
    $('#loading').show();
    $.ajax({
        url : base_url + "index.php/AsetDokumenEntryController/deleteTempBPKB",
        type : "POST",
        dataType : "json",
        data : {"data"    : "data"},

        success : function(response) {
            console.log(response);
            alert('Data Sukses Di Hapus');
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/displayTambahAsetDokumen';  
        },
        error : function(response) {
            alert('Data Gagal Di Hapus');
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/displayTambahAsetDokumen';
        }
    }); 
});

$('#delTempEmas').click(function () {
    $('#loading').show();
    $.ajax({
        url : base_url + "index.php/AsetDokumenEntryController/deleteTempEmas",
        type : "POST",
        dataType : "json",
        data : {"data"    : "data"},

        success : function(response) {
            console.log(response);
            alert('Data Sukses Di Hapus');
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/displayTambahAsetDokumen';  
        },
        error : function(response) {
            alert('Data Gagal Di Hapus');
            $('#loading').hide();
            window.location = base_url + 'index.php/AsetDokumenEntryController/displayTambahAsetDokumen';
        }
    }); 
});