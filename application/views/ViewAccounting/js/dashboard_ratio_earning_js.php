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
    get_chart_rasio_earning_roa()
    get_chart_rasio_earning_bopo()

}

                $('#roa_btn').click(function () 
                {
                     domtoimage.toPng(document.getElementById('roa_report'))
                        .then(function (canvas) 
                        {
                            var pdf = new jsPDF('l', 'pt',[$('#roa_report').width(), $('#roa_report').height()]);
                            pdf.addImage(canvas, 'jpeg', 0, 0, $('#roa_report').width(), $('#roa_report').height());
                            pdf.save("rasio-earning-roa.pdf");

                       // that.options.api.optionsChanged();
                    });
                }); 

                
                $('#earning_bopo_btn').click(function () 
                {
                     domtoimage.toPng(document.getElementById('earning_bopo_report'))
                        .then(function (canvas) 
                        {
                            var pdf = new jsPDF('l', 'pt',[$('#earning_bopo_report').width(), $('#earning_bopo_report').height()]);
                            pdf.addImage(canvas, 'jpeg', 0, 0, $('#earning_bopo_report').width(), $('#earning_bopo_report').height());
                            pdf.save("rasio-earning-bopo.pdf");

                       // that.options.api.optionsChanged();
                    });
                }); 
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
                get_chart_rasio_earning_roa()
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
           url : base_url + "Accounting/Dashboard_ratio_controller/get_data_chart_bopo",
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
                if(!response.rasio_earning_bopo)
                {
                    var data_chart_rasio_earning_bopo = 
            {

                labels:['January','February','Maret','April','May','June','July','August','Septermber','Oktober','November','Desember'],
                datasets: [
                    {
                        label: "BOPO",
                        data:0,
                        backgroundColor: color,
                    },
                ]
            };
            
                var config_chart_rasio_earning_bopo = 
            {
                type: 'bar',
                data:data_chart_rasio_earning_bopo,
                options: {}
            };
               
                 $("canvas#chart_rasio_earning_bopo").remove();
                 $("#chart_rasio_earning_bopo_container ").append('<canvas id="chart_rasio_earning_bopo"></canvas>'); 
                 var grapharea = document.getElementById("chart_rasio_earning_bopo").getContext("2d")
                   var npat_monthly = new Chart(
                    grapharea,config_chart_rasio_earning_bopo
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
                for (var i =0;i < response.rasio_earning_bopo.length;i++) 
                    {
                        label.push(response.rasio_earning_bopo[i]['tgl_laporan']);
                        rasio.push(response.rasio_earning_bopo[i]['rasio']);
                        var int_rasio= rasio.map(i=>Number(i));
                        if(int_rasio[i] > 95.92)
                        {
                            color.push('#dc474f')
                        }else if(int_rasio[i] > 94.72 && int_rasio[i] <= 95.92)
                        {
                            color.push('#ffac0e')
                        }else if(int_rasio[i] > 93.52 && int_rasio[i] <=94.72 )
                        {
                            color.push('#3bb0ba')
                        }
                        else if(int_rasio[i] <= 93.52 ){
                            color.push('#a1dd70')
                        }
                    }
                   // console.log(parseFloat(response.rasio_capital[i]['rasio']))
                 //   console.log(int_rasio)
                  
            //Script NPAT monthly
            var data_chart_rasio_earning_bopo = 
            {

                labels:label,
                datasets: [
                    {
                        label: "BOPO",
                        data:int_rasio,
                        backgroundColor: color,
                    },
                ]
            };
            
                var config_chart_rasio_earning_bopo = 
            {
                type: 'bar',
                data:data_chart_rasio_earning_bopo,
                options: {}
            };
               
                 $("canvas#chart_rasio_earning_bopo").remove();
                 $("#chart_rasio_earning_bopo_container ").append('<canvas id="chart_rasio_earning_bopo"></canvas>'); 
                 var grapharea = document.getElementById("chart_rasio_earning_bopo").getContext("2d")
                   var npat_monthly = new Chart(
                    grapharea,config_chart_rasio_earning_bopo
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


function get_chart_rasio_earning_roa(){
    data = '';
   $('#loading').show(); 
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   var src_kode_kantor =  $('#src_kode_kantor').val();
   
//    console.log(src_kode_kantor);
   $.ajax({
           url : base_url + "Accounting/Dashboard_ratio_controller/get_data_chart_roa",
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
                if(!response.rasio_earning_roa)
                {
                    var data_chart_rasio_earning_roa = 
            {

                labels:['January','February','Maret','April','May','June','July','August','Septermber','Oktober','November','Desember'],
                datasets: [
                    {
                        label: "ROA",
                        data:0,
                        backgroundColor: color,
                    },
                ]
            };
            
                var config_chart_rasio_earning_roa = 
            {
                type: 'bar',
                data:data_chart_rasio_earning_roa,
                options: {}
            };
              console.log(data_chart_rasio_earning_roa) 
                 $("canvas#chart_earning_roa").remove();
                 $("#chart_rasio_earning_roa_container ").append('<canvas id="chart_earning_roa"></canvas>'); 
                 var grapharea = document.getElementById("chart_earning_roa").getContext("2d")
                   var npat_monthly = new Chart(
                    grapharea,config_chart_rasio_earning_roa
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
                for (var i =0;i < response.rasio_earning_roa.length;i++) 
                    {
                        label.push(response.rasio_earning_roa[i]['tgl_laporan']);
                        rasio.push(response.rasio_earning_roa[i]['rasio']);
                        var int_rasio= rasio.map(i=>Number(i));
                        if(int_rasio[i] < 0.765)
                        {
                            color.push('rgb(235, 0, 0)')
                        }else if(int_rasio[i] < 0.999 && int_rasio[i] >= 0.765)
                        {
                            color.push('rgb(255, 255, 51)')
                        }else if(int_rasio[i] < 1.215 && int_rasio[i] >=0.999 )
                        {
                            color.push('rgb(0, 128, 255)')
                        }
                        else if(int_rasio[i] >= 1.215 ){
                            color.push('rgb(51, 235, 51)')
                        }
                    }
                   // console.log(parseFloat(response.rasio_capital[i]['rasio']))
                  //  console.log(int_rasio)
                  
            //Script NPAT monthly
            var data_chart_rasio_earning_roa = 
            {

                labels:label,
                datasets: [
                    {
                        label: "ROA",
                        data:int_rasio,
                        backgroundColor: color,
                    },
                ]
            };
            
                var config_chart_rasio_earning_roa = 
            {
                type: 'bar',
                data:data_chart_rasio_earning_roa,
                options: {}
            };
              console.log(data_chart_rasio_earning_roa) 
                 $("canvas#chart_earning_roa").remove();
                 $("#chart_rasio_earning_roa_container ").append('<canvas id="chart_earning_roa"></canvas>'); 
                 var grapharea = document.getElementById("chart_earning_roa").getContext("2d")
                   var npat_monthly = new Chart(
                    grapharea,config_chart_rasio_earning_roa
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