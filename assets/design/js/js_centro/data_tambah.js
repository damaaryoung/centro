var persenDefault = '';
var jenisSertifikat = '';
var base_url = $('#base_url').val();    



$(document).ready(function () {     
    $('#sertKodeIkatanAgunan').change(function(){
         persenDefault = $(this).find('option:selected').attr('data-persen');
        $('#sertPersenDijamin').val(persenDefault);
    });

    jenisSertifikat = $('#sertJenisSertifikat').val();
    if(jenisSertifikat != 'SHGB'){
        $('#sertJTSHGB').hide(); 
        $('#sertJTSHGBlbl').hide();
    }
    else if (jenisSertifikat == 'SHGB'){
        $('#sertJTSHGB').show();
        $('#sertJTSHGBlbl').show();
    }
    
    $('#sertJenisSertifikat').change(function(){
        jenisSertifikat = $('#sertJenisSertifikat').val();
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


function selectTypeKendaraan(){
    var merk = $('#bpkbMerk').val();
    console.log(merk);

    $.ajax({
        url : base_url + "AsetDokumenEntryController/getTypeKend",
        type : "POST",
        dataType : "json",
        data : {"merk"       : merk},
        success : function(response) {
           console.log(response.typeKend);
           $('#bpkbType').find('option').remove().end();
           $.each(response.typeKend,function(i,data){
            $('#bpkbType').append('<option value="'+data.kd_type+'">' + data.nm_type + '</option>');
           });
       
        },
        error : function(response) {
            console.log('failed :' + response);
            alert('Gagal Get Tipe Kendaraan');
        }
    });    
}
