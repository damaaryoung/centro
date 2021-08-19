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
        get_chart_rasio_liquidity_cash_ratio()
           get_chart_rasio_earning_bopo()

}

          
                $('#btn_export_chart_liquidity').click(function () 
                {
                     domtoimage.toPng(document.getElementById('reportPage_liquidity'))
                        .then(function (canvas) 
                        {
                            var pdf = new jsPDF('l', 'pt',[$('#reportPage_liquidity').width(), $('#reportPage_liquidity').height()]);
                            pdf.text(25,25,'Ratio Dashboard Liquidity')
                            pdf.addImage(canvas, 'jpeg', 0, 25, $('#reportPage_liquidity').width(), $('#reportPage_liquidity').height());
                            pdf.save("dashboard-ratio-liquidity.pdf");

                       // that.options.api.optionsChanged();
                    });
                });

                
                $('#ldr_btn').click(function () 
                {
                     domtoimage.toPng(document.getElementById('ldr_report'))
                        .then(function (canvas) 
                        {
                            var pdf = new jsPDF('l', 'pt',[$('#ldr_report').width(), $('#ldr_report').height()]);
                            pdf.addImage(canvas, 'jpeg', 0, 10, $('#ldr_report').width(), $('#ldr_report').height());
                            pdf.save("rasio-liquidity-ldr.pdf");

                       // that.options.api.optionsChanged();
                    });
                }); 
                
                $('#cash_ratio_btn').click(function () 
                {
                     domtoimage.toPng(document.getElementById('cash_ratio_report'))
                        .then(function (canvas) 
                        {
                            var pdf = new jsPDF('l', 'pt',[$('#cash_ratio_report').width(), $('#cash_ratio_report').height()]);
                            pdf.addImage(canvas, 'jpeg', 0, 10, $('#cash_ratio_report').width(), $('#cash_ratio_report').height());
                            pdf.save("rasio-liquidity-cash-ratio.pdf");

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
                get_chart_rasio_liquidity_cash_ratio()
           get_chart_rasio_earning_bopo()
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


function get_chart_rasio_earning_bopo(){
    data = '';
   $('#loading').show(); 
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   var src_kode_kantor =  $('#src_kode_kantor').val();
   
//    console.log(src_kode_kantor);
   $.ajax({
           url : base_url + "Accounting/Dashboard_ratio_controller/get_data_chart_ldr",
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
                if(!response.rasio_liquidity_ldr)
                {
                    var data_chart_rasio_liquidity_ldr = 
            {

                labels:['January','February','Maret','April','May','June','July','August','Septermber','Oktober','November','Desember'],
                datasets: [
                    {
                        label: "LDR",
                        data:0,
                        backgroundColor: color,
                    },
                ]
            };
            
                var config_chart_rasio_liquidity_ldr = 
            {
                type: 'bar',
                data:data_chart_rasio_liquidity_ldr,
                options: {}
            };
               
                 $("canvas#chart_rasio_liquidity_ldr").remove();
                 $("#chart_rasio_liquidity_ldr_container ").append('<canvas id="chart_rasio_liquidity_ldr"></canvas>'); 
                 var grapharea = document.getElementById("chart_rasio_liquidity_ldr").getContext("2d")
                   var npat_monthly = new Chart(
                    grapharea,config_chart_rasio_liquidity_ldr
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
                for (var i =0;i < response.rasio_liquidity_ldr.length;i++) 
                    {
                        label.push(response.rasio_liquidity_ldr[i]['tgl_laporan']);
                        rasio.push(response.rasio_liquidity_ldr[i]['rasio']);
                        var int_rasio= rasio.map(i=>Number(i));
                        if(int_rasio[i] > 102.25)
                        {
                            color.push('#dc474f')
                        }else if(int_rasio[i] > 98.50 && int_rasio[i] <=102.25)
                        {
                            color.push('#ffac0e')
                        }else if(int_rasio[i] >94.75 && int_rasio[i] <=98.50 )
                        {
                            color.push('#3bb0ba')
                        }
                        else if(int_rasio[i] <= 94.75 ){
                            color.push('#a1dd70')
                        }
                    }
                   // console.log(parseFloat(response.rasio_capital[i]['rasio']))
                 //   console.log(int_rasio)
                  
            //Script NPAT monthly
            var data_chart_rasio_liquidity_ldr = 
            {

                labels:label,
                datasets: [
                    {
                        label: "LDR",
                        data:int_rasio,
                        backgroundColor: color,
                    },
                ]
            };
            
                var config_chart_rasio_liquidity_ldr = 
            {
                type: 'bar',
                data:data_chart_rasio_liquidity_ldr,
                options: {}
            };
               
                 $("canvas#chart_rasio_liquidity_ldr").remove();
                 $("#chart_rasio_liquidity_ldr_container ").append('<canvas id="chart_rasio_liquidity_ldr"></canvas>'); 
                 var grapharea = document.getElementById("chart_rasio_liquidity_ldr").getContext("2d")
                   var npat_monthly = new Chart(
                    grapharea,config_chart_rasio_liquidity_ldr
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


function get_chart_rasio_liquidity_cash_ratio(){
    data = '';
   $('#loading').show(); 
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   var src_kode_kantor =  $('#src_kode_kantor').val();
   
//    console.log(src_kode_kantor);
   $.ajax({
           url : base_url + "Accounting/Dashboard_ratio_controller/get_data_chart_cash_ratio",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
            data:{"src_kode_kantor" : src_kode_kantor,
            "src_tgl_laporan" : src_tgl_laporan},       
           success : function(response) {
           //    debugger;
            $('#loading').hide(); 

             //   console.log("response chart Asert Total",response)
                if(!response.rasio_liquidity_cash_ratio)
                {
                    var data_chart_rasio_liquidity_cash_ratio = 
            {

                labels:['January','February','Maret','April','May','June','July','August','Septermber','Oktober','November','Desember'],
                datasets: [
                    {
                        label: "Cash Ratio",
                        data:0,
                        backgroundColor: color,
                    },
                ]
            };
            
                var config_chart_rasio_liquidity_cash_ratio = 
            {
                type: 'bar',
                data:data_chart_rasio_liquidity_cash_ratio,
                options: {}
            };
              console.log(data_chart_rasio_liquidity_cash_ratio) 
                 $("canvas#chart_liquidity_cash_ratio").remove();
                 $("#chart_rasio_liquidity_cash_ratio_container ").append('<canvas id="chart_liquidity_cash_ratio"></canvas>'); 
                 var grapharea = document.getElementById("chart_liquidity_cash_ratio").getContext("2d")
                   var liquidity_cash_ratio = new Chart(
                    grapharea,config_chart_rasio_liquidity_cash_ratio
                    );return 
                }
                var label=[]
                var rasio=[]
                var color=[]
                var chartColors = {
            red: 'rgb(255, 99, 132)',
            blue: 'rgb(54, 162, 235)'
            };
                for (var i =0;i < response.rasio_liquidity_cash_ratio.length;i++) 
                    {
                        label.push(response.rasio_liquidity_cash_ratio[i]['tgl_laporan']);
                        rasio.push(response.rasio_liquidity_cash_ratio[i]['rasio']);
                        var int_rasio= rasio.map(i=>Number(i));
                        if(int_rasio[i] < 2.55)
                        {
                            color.push('#dc474f')
                        }else if(int_rasio[i] >=2.55  && int_rasio[i] <3.30)
                        {
                            color.push('#ffac0e')
                        }else if(int_rasio[i] >=3.30  && int_rasio[i] <4.05 )
                        {
                            color.push('#3bb0ba')
                        }
                        else if(int_rasio[i] >= 4.05 ){
                            color.push('#a1dd70')
                        }
                    }
                   // console.log(parseFloat(response.rasio_capital[i]['rasio']))
                  //  console.log(int_rasio)
                  
            //Script NPAT monthly
            var data_chart_rasio_liquidity_cash_ratio = 
            {

                labels:label,
                datasets: [
                    {
                        label: "Cash Ratio",
                        data:int_rasio,
                        backgroundColor: color,
                    },
                ]
            };
            
                var config_chart_rasio_liquidity_cash_ratio = 
            {
                type: 'bar',
                data:data_chart_rasio_liquidity_cash_ratio,
                options: {}
            };
              console.log(data_chart_rasio_liquidity_cash_ratio) 
                 $("canvas#chart_liquidity_cash_ratio").remove();
                 $("#chart_rasio_liquidity_cash_ratio_container ").append('<canvas id="chart_liquidity_cash_ratio"></canvas>'); 
                 var grapharea = document.getElementById("chart_liquidity_cash_ratio").getContext("2d")
                   var liquidity_cash_ratio = new Chart(
                    grapharea,config_chart_rasio_liquidity_cash_ratio
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