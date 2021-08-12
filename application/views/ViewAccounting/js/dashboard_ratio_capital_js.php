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

    if(kd_kantor_user == '00' || divisi_user == 'IT'){
        select_kantor = '0';
        $('#src_kode_kantor').append('<option value="" selected>ALL</option>');
        get_kode_kantor();

    }else{
        $('#src_kode_kantor').append('<option value="' + kd_kantor_user + '" selected>'+ kd_kantor_user +'</option>');
    }
 
    $('#loading-1').hide();
});
             
function search()
{
    get_chart_rasio_capital()

}

        
                $('#btn_export_chart').click(function () 
                {
                     domtoimage.toPng(document.getElementById('reportPage'))
                        .then(function (canvas) 
                        {
                            var pdf = new jsPDF('p', 'pt',[$('#reportPage').width(), $('#reportPage').height()]);
                            pdf.text(400,25,'Financial Dashboard')
                            pdf.addImage(canvas, 'jpeg', 0, 50, $('#reportPage').width(), $('#reportPage').height());
                            pdf.save("dashboard.pdf");

                       // that.options.api.optionsChanged();
                    });
                });

                $('#aset_btn').click(function () 
                {
                     domtoimage.toPng(document.getElementById('capital_report'))
                        .then(function (canvas) 
                        {
                            var pdf = new jsPDF('l', 'pt',[$('#aset_kap_report').width(), $('#aset_kap_report').height()]);
                            pdf.addImage(canvas, 'jpeg', 0, 0, $('#capital_aset_kap_reportreport').width(), $('#aset_kap_report').height());
                            pdf.save("rasio-capital-kpmm.pdf");

                       // that.options.api.optionsChanged();
                    });
                }); 
             


function get_sysdate(){
    $.ajax({
            url : base_url + "Accounting/Dashboard_ratio_controller/get_sysdate",
            type : "POST",
            dataType : "json",
            timeout : 180000,
            headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    },
            success : function(response) {
                $('#src_tgl_laporan').val(response.sysdate);
              get_chart_rasio_capital()
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


function get_chart_rasio_capital(){
    data = '';
   $('#loading').show(); 
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   var src_kode_kantor =  $('#src_kode_kantor').val();
   
//    console.log(src_kode_kantor);
   $.ajax({
           url : base_url + "Accounting/Dashboard_ratio_controller/get_data_chart_capital",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
            data:{"src_kode_kantor" : src_kode_kantor,
            "src_tgl_laporan" : src_tgl_laporan},       
           success : function(response) {
            //   debugger;
            $('#loading').hide(); 

            //    console.log("response chart Asert Total",response)
                if(!response.rasio_capital)
                {
                    var data_chart_rasio_capital = 
            {

                labels:['January','February','Maret','April','May','June','July','August','Septermber','Oktober','November','Desember'],
                datasets: [
                    {
                        label: "KPMM",
                        data:0,
                        backgroundColor: color,
                    },
                ]
            };
            
                var config_chart_rasio_capital = 
            {
                type: 'bar',
                data:data_chart_rasio_capital,
                options: {}
            };
               
                 $("canvas#chart_rasio_capital").remove();
                 $("#chart_rasio_capital_container").append('<canvas id="chart_rasio_capital"></canvas>'); 
                 var grapharea = document.getElementById("chart_rasio_capital").getContext("2d")
                   var npat_monthly = new Chart(
                    grapharea,config_chart_rasio_capital
                    ); 
                    return
                }
                var label=[]
                var rasio=[]
                var color=[]
                var chartColors = {
            red: 'rgb(255, 99, 132)',
            blue: 'rgb(54, 162, 235)'
            };
                for (var i =0;i < response.rasio_capital.length;i++) 
                    {
                        label.push(response.rasio_capital[i]['tgl_laporan']);
                        rasio.push(response.rasio_capital[i]['rasio']);
                        var int_rasio= rasio.map(i=>Number(i));
                        if(int_rasio[i] < 6)
                        {
                            color.push('#dc474f')
                        }else if(int_rasio[i] < 8 && int_rasio[i] >= 6)
                        {
                            color.push('#ffac0e')
                        }else if(int_rasio[i] < 12 && int_rasio[i] >= 8)
                        {
                            color.push('#3bb0ba')
                        }
                        else{
                            color.push('#a1dd70')
                        }
                    }
                   // console.log(parseFloat(response.rasio_capital[i]['rasio']))
                    console.log(int_rasio)
                  
            //Script NPAT monthly
            var data_chart_rasio_capital = 
            {

                labels:label,
                datasets: [
                    {
                        label: "KPMM",
                        data:int_rasio,
                        backgroundColor: color,
                    },
                ]
            };
            
                var config_chart_rasio_capital = 
            {
                type: 'bar',
                data:data_chart_rasio_capital,
                options: {}
            };
               
                 $("canvas#chart_rasio_capital").remove();
                 $("#chart_rasio_capital_container").append('<canvas id="chart_rasio_capital"></canvas>'); 
                 var grapharea = document.getElementById("chart_rasio_capital").getContext("2d")
                   var npat_monthly = new Chart(
                    grapharea,config_chart_rasio_capital
                    ); 

           
            npat_monthly.update()

                    // $('#aset_btn').click(function(event) {          
                    //     var canvas = document.querySelector('#chart_aset');
                    //     //creates image
                    //     var canvasImg = canvas.toDataURL("image/png", 1.0);
                    //     //creates PDF from img
                    //     var doc = new jsPDF('landscape');
                    //     doc.setFillColor(204, 204,204,204);
                    //     doc.setFontSize(20);
                    //     doc.text(120, 15, "Diagram Aset Total");
                    //     doc.addImage(canvasImg, 'PNG', 30, 55, 230, 100 );
                    //     doc.save('aset-total.pdf');
                    // }); 
                  
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

    


function get_kode_kantor(){
    $.ajax({
            url : base_url + "Accounting/Dashboard_finance_controller/get_kode_kantor",
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
                }else if(select_kantor == '1'){
                    $.each(response.kode_kantor,function(i,data){
                        $('#modal_kode_kantor').append('<option value="'+data.kode_kantor+'">' + data.kode_kantor + ' - ' + data.nama_kantor+'</option>');
                    });
                }
                get_sysdate();  
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

</script>