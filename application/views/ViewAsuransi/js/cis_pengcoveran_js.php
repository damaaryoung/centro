<script>


var base_url                     = $('#base_url').val(); 
var kd_kantor_user               = $('#user_kode_kantor').val(); 
var divisi_user                  = $('#user_divisi_id').val(); 
var id                           = '';
var no_transaksi                 = '';
var status                       = '';
var select_kantor                = '';
var id_update                    = '';
var no_transaksi_update          = '';
var modal_nama_asuransi_update   = '';
var modal_kantor_cabang_update   = '';
var modal_tgl_cover_update       = '';
var modal_limit_kas_update       = '';
var modal_saldo_akhir_kas_update = '';
var upload_update = '';
var checkArray = [];
var check_before = '';
var lengthParsed = '';
$(document).ready(function () {            
   bsCustomFileInput.init();
   $('.select2').select2();
   $('#src_kode_kantor').append('<option value="' + kd_kantor_user + '" selected>'+ kd_kantor_user +'</option>');
   
   getData();
   if(kd_kantor_user == '00' || divisi_user == 'IT'){
       select_kantor = '0';
       get_kode_kantor();
   }
   
   $('#loading-1').hide();
});

$('#btn_refresh').click(function () {
    getData();
});
$('#btn_email').click(function () {
    checkArray = [];
    lengthParsed = 0;
    $("input:checkbox[name=check]:checked").each(function(){
        checkArray.push([$(this).val(),$(this).data("asuransi")]);
    });
    lengthParsed = checkArray.length;
    if(lengthParsed == 0){
        return Swal.fire({
            icon: 'error',
            title: 'Tidak Dapat Memproses Email!',
            text: 'Tidak Ada Data Yang Dipilih'
        });
    }

    for(i = 0; i < lengthParsed; i++ ){
        if(i == 0){
            check_before = checkArray[i][1].toString();
        }else{
            check_before = checkArray[i-i][1].toString();
        }
        
        if(check_before != checkArray[i][1].toString()){
            return Swal.fire({
                icon: 'error',
                title: 'Tidak Dapat Memproses Email!',
                text: 'Anda Mencentang Data Yang Di Cover Asuransi Yang Berbeda'
            });
        }
    }
   proses_email_cis(checkArray,lengthParsed);
});
/// function here //
function getData(){
   data = '';
   $('#tbl_cis').DataTable().clear();
   $('#tbl_cis').DataTable().destroy();
   $('#loading').show(); 
   
   $.ajax({
           url : base_url + "Asuransi/Cash_in_save_controller/get_data_cis",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           success : function(response) {
               mapping(response);
               
           },
           error : function(response) {
               console.log('failed :' + response);
               $('#loading').hide();
               return Swal.fire({
                   icon: 'error',
                   title: 'Gagal Get Data!',
                   text: 'Mohon Periksa Jaringan Anda'
               });
           }
   });    
}
function get_asuransi(){
    $.ajax({
            url : base_url + "Asuransi/Cash_in_save_controller/get_asuransi",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
                console.log(response.sysdate);
                $.each(response.get_asuransi,function(i,data){
                    $('#modal_nama_asuransi').append('<option value="'+data.kode+'">' + data.nama +'</option>');
                });
                $('#modal_tgl_cover').val(response.sysdate);
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Get List Asuransi!',
                    text: 'Mohon Periksa Jaringan Anda'
                });
                
            }
    });    
}
function get_kode_kantor(){
    $.ajax({
            url : base_url + "Asuransi/Proses_klaim_jiwa_controller/get_kode_kantor",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
                if(select_kantor == '0'){
                    $.each(response.kode_kantor,function(i,data){
                        $('#src_kode_kantor').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
                    });
                }else{
                    $('#modal_kantor_cabang').append('<option value="' + kd_kantor_user + '" selected>'+ kd_kantor_user +'</option>');
                    $.each(response.kode_kantor,function(i,data){
                        $('#modal_kantor_cabang').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
                    });
                }
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
function proses_email_cis(checkArray,lengthParsed){
    $('#loading').show();  
    $.ajax({
            url : base_url + "Asuransi/Cash_in_save_controller/proses_email_cis",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            data:{"checkArray"    : checkArray,
                    "lengthParsed": lengthParsed},
            success : function(response) {

                console.log(response);
                // Swal.fire({
                //     position: 'center',
                //     icon: 'success',
                //     title: 'Sukses Kirim Email',
                //     showConfirmButton: false,
                //     timer: 2000
                // }).then(()=> {
                //     getData(response);
                // }); 
                getData(response);
                
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Kirim Email!',
                    text: 'Mohon Periksa Jaringan Anda'
                });
            }
    });    
}

function mapping(response){
     for(i = 0; i < response.data_cis.length; i++ ){
         data += `<tr style="text-align:center">
                     <td><input type="checkbox" id="check" name="check" 
                            value="${response.data_cis[i]['id']}"
                            data-asuransi="${response.data_cis[i]['kode_asuransi']}"></td>
                     <td>${response.data_cis[i]['tgl_cover']}</td>
                     <td>${response.data_cis[i]['nama_asuransi']}</td>
                     <td>${response.data_cis[i]['nama_kantor']}</td>
                     <td>${accounting.formatMoney(response.data_cis[i]['limit_kas'], '', 0, ',', '.')}</td>
                     <td>${accounting.formatMoney(response.data_cis[i]['saldo_kas'], '', 0, ',', '.')}</td>
                     <td>${response.data_cis[i]['status']}</td>
                 </tr>`;
     }
     $('#tbl_cis > tbody:first').html(data);
     
     $(document).ready(function() {
         $('#tbl_cis').DataTable( {
             "destroy": true,
             "scrollX": true,
             "autoWidth" : false,
             "searching": false,
             "aaSorting" : []
         } );
     } );
     $('#loading').hide(); 
}
function toggle(source) {
  checkboxes = document.getElementsByName('check');
  for(var i=0, n=checkboxes.length;i<n;i++) {
    checkboxes[i].checked = source.checked;
  }
}
</script>