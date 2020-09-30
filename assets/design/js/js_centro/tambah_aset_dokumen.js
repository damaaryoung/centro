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