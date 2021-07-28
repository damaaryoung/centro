<script>
var base_url                     = $('#base_url').val(); 
var kd_kantor_user               = $('#user_kode_kantor').val(); 
var divisi_user                  = $('#user_divisi_id').val(); 
var select_kantor                = '';

//update btn
var kd_kantor = '';
var jenis     = '';
var tgl       = '';



$(document).ready(function () {            
    bsCustomFileInput.init();
    $('.select2').select2();
   
    get_sysdate();  
   
    $('#loading-1').hide();
});

function get_sysdate(){
    $.ajax({
            url : base_url + "Accounting/Dashboard_finance_controller/get_sysdate",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
                $('#src_tgl_laporan').val(response.sysdate);
                getData();
            },
            error : function(response) {
                console.log('failed :' + response);
                $('#loading').hide();
                return Swal.fire({
                    icon: 'error',
                    title: 'Gagal Get Tanggal Sistem!',
                    text: 'Mohon Periksa Jaringan Anda'
                });
                
            }
    });    
}

function getData(){
   data = '';

   $('#loading').show(); 
   var src_kode_kantor =  $('#src_kode_kantor').val();
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_chart",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
            data:{"src_kode_kantor" : src_kode_kantor,
                  "src_tgl_laporan" : src_tgl_laporan},
           success : function(response) {
            $('#loading').hide(); 
               $('#src_tgl_realisasi').val(response.sysdate);
                var label=[]
                var realisasi=[]
                var rencana =[]
                var realisasi =[]
                for (var i in response.chart_npat_ytd.length) {
                        label.push(response.chart_npat_ytd[i].tgl_laporan);
                        realisasi.push(response.chart_npat_ytd[i].realisasi);
                        rencana.push(response.chart_npat_ytd[i].rencana);
                    }

            //Script NPAT YTD
            var data_chart_npat_ytd = {
                labels:label,
                datasets: [
                    {
                        label: "Target",
                        backgroundColor: 'rgb(0, 76, 153)',
                        data:rencana,
                    },
                    {
                        label: "Realisasi",
                        backgroundColor: 'rgb(255, 128, 0)',
                        data:realisasi,
                    },
            
                ]
                    };
                        var config_npat_tyd = {
                        type: 'bar',
                        data:data_chart_npat_ytd,
                        options: {}
                    };
                    var npat_tyd = new Chart(
                    document.getElementById('chart_npat_ytd'),
                    config_npat_tyd
                    );
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

function mapping(response){
     $('#chart_npat_ytd').html(data);
     
     $(document).ready(function() {
         $('#tbl_rencana_realisasi').DataTable( {
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