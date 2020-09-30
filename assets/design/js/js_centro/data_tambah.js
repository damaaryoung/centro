var persenDefault = '';
var jenisSertifikat = '';



$(document).ready(function () {     
    $('#sertKodeIkatanAgunan').change(function(){
         persenDefault = $(this).find('option:selected').attr('data-persen');//find(':selected').data('pesen'); //getAttribute('data-persen'); 
        // $('#sertPersenDijamin').val(persenDefault);
        $('#sertPersenDijamin').val(persenDefault);
    });

    $('#sertJTSHGB').hide();
    $('#sertJTSHGBlbl').hide();
    $('#sertJenisSertifikat').change(function(){
        jenisSertifikat = $(this).val(); 
        console.log(jenisSertifikat);
        if(jenisSertifikat != 'SHGB'){
            $('#sertJTSHGB').hide(); 
            $('#sertJTSHGBlbl').hide();
        }
        else if (jenisSertifikat == 'SHGB'){
            $('#sertJTSHGB').show();
            $('#sertJTSHGBlbl').show();
        }
       
    });


});

$(function(){
    $('#check_ajb').on('click', function(){                  
       $("#sertNomorAJB").prop("disabled", !this.checked); 
    });
    $('#check_imb').on('click', function(){                  
        $("#sertNomorIMB").prop("disabled", !this.checked); 
    });
    $('#check_sppt').on('click', function(){                  
        $("#sertNomorSPPT").prop("disabled", !this.checked); 
        $("#sertTahunSPPT").prop("disabled", !this.checked); 
    });
    $('#check_sht').on('click', function(){                  
        $("#sertNoSHT").prop("disabled", !this.checked); 
        $("#sertPropinsiSHT").prop("disabled", !this.checked); 
        $("#sertKotaSHT").prop("disabled", !this.checked); 
    });
    $('#check_stts').on('click', function(){                  
        $("#sertTahunSTTS").prop("disabled", !this.checked); 
    });
    $('#check_ssb_bpht').on('click', function(){                  
        $("#sertAtasNamaSSBBPHTB").prop("disabled", !this.checked); 
    });

    
    $('#check_faktur_pemilik').on('click', function(){                  
        $("#bpkbNoFakturPemilik").prop("disabled", !this.checked); 
    });
    $('#check_sk_trayek').on('click', function(){                  
        $("#noSKTrayek").prop("disabled", !this.checked); 
        $("#bpkbBerlakuSD").prop("disabled", !this.checked); 
    });
});



