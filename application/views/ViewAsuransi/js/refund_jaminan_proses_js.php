<script>
var base_url         = $('#base_url').val(); 
var kd_kantor_user   = $('#user_kode_kantor').val(); 
var divisi_user      = $('#user_divisi_id').val(); 
var rekening         = '';
var jenis            = '';
var no_reff_asuransi = '';
var no_transaksi     = '';
var data             = '';
var src_kode_kantor  = '';
var src_search       = '';
var send_mail        = '';
var email_insco      = '';
var tgl_klaim        = '';
var fileUploads = [];
var uploads     = '';
var root_document = '';
var root_address  = '';
var path_file     = '';
var file_name     = '';
var del_name     = '';
var ket_reject = '';

$(document).ready(function () {  
    bsCustomFileInput.init();
    $('.select2').select2();
    $('#src_kode_kantor').append('<option value="' + kd_kantor_user + '" selected>'+ kd_kantor_user +'</option>');
    
    get_data_jaminan();

    if(kd_kantor_user == '00' || divisi_user == 'IT'){
        get_kode_kantor();
    }

});


//// MAIN ////
function get_kode_kantor(){
    $.ajax({
            url : base_url + "Asuransi/Proses_refund_asuransi_controller/get_kode_kantor",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
                $.each(response.kode_kantor,function(i,data){
                    $('#src_kode_kantor').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
                });
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Get List Kode Kantor!',
                    text: 'Mohon Periksa Jaringan Anda'
                });
                
            }
    });    
}

////JAMINAN ////
function get_data_jaminan(){
    data = [];
    $('#loading').show(); 
    
    $('#tbl_klaim_jaminan').DataTable().clear();
    $('#tbl_klaim_jaminan').DataTable().destroy();
    src_kode_kantor = $('#src_kode_kantor').val();
    console.log(src_kode_kantor);

    $.ajax({
            url : base_url + "Asuransi/Proses_refund_asuransi_controller/get_data",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            data:{  "src_kode_kantor" : src_kode_kantor},
            success : function(response) {
               console.log(response);
               mapping_get_data(response)
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Get Data',
                    text: 'Mohon Periksa Jaringan Anda'
                });
                
            }
    });    
}



function mapping_get_data(response){
        for(i = 0; i < response.refund_jaminan.length; i++ ){
            data += `<tr style="text-align: center;">
                    <td>${response.refund_jaminan[i]['TGL_REALISASI']}</td>
                    <td>${response.refund_jaminan[i]['no_rekening']}</td>
                    <td>${response.refund_jaminan[i]['NAMA_NASABAH']}</td>
                    <td>${response.refund_jaminan[i]['jenis_jaminan']}</td>
                    <td>${response.refund_jaminan[i]['jenis_refund']}</td>
                    <td>${response.refund_jaminan[i]['status_refund']}</td>
                    <td>        
                        <button type="button" class="btn btn-primary btn-sm btn_update_jaminan" id="btn_update_jaminan"
                                data-rekening="${response.refund_jaminan[i]['no_rekening']}"
                                data-jenis="${response.refund_jaminan[i]['jenis_asuransi']}"  
                                data-noreff-asuransi="${response.refund_jaminan[i]['no_reff_asuransi']}"  
                                data-status="${response.refund_jaminan[i]['status_refund']}" 
                                data-no-trans="${response.refund_jaminan[i]['no_transaksi']}" 
                                data-toggle="tooltip" 
								data-placement="bottom" 
								title="Proses"
                                'name="btn_update_jaminan">
                                <i class="fa fa-pen"></i> </button>`;
            if(response.refund_jaminan[i]['status_refund'] == 'PROSES'){
                data += `&nbsp;&nbsp;
                        <button type="button" class="btn btn-warning btn-sm btn_reject_jaminan" id="btn_reject_jaminan"
                                data-rekening="${response.refund_jaminan[i]['no_rekening']}"
                                data-jenis="${response.refund_jaminan[i]['jenis_asuransi']}"  
                                data-noreff-asuransi="${response.refund_jaminan[i]['no_reff_asuransi']}"  
                                data-status="${response.refund_jaminan[i]['status_refund']}" 
                                data-no-trans="${response.refund_jaminan[i]['no_transaksi']}" 
                                data-toggle="tooltip" 
								data-placement="bottom" 
								title="Reject"
                                'name="btn_reject_jaminan">
                                <i class="fas fa-times-circle"></i> </button>`; 
            }    
            data += `</td>
                </tr>`;
        }

    $('#tbl_klaim_jaminan > tbody:first').html(data);
                
    $(document).ready(function() {
        $('#tbl_klaim_jaminan').DataTable( {
            "destroy": true,
            "scrollX": true,
            "autoWidth" : false,
            "searching": false,
            "aaSorting" : []
        } );
    } );
    $('#loading').hide();                    
}
</script>