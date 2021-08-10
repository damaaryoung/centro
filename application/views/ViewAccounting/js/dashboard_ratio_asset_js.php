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
    get_chart_aset_kap()
    get_chart_aset_ppap()

}

                // $('#btn_export_chart').click(function(event) {
                    
                //     html2canvas(document.getElementById('reportPage'),{
                //         onrendered:function (canvas){
                //             var img =canvas.toDataURL('image/png')
                //             var doc=new jsPDF("p", "pt", "a4")
                //             doc.text(220,25,'Financial Dashboard')
                //             doc.addImage(img, 'PNG',-88, 75, 680, 700)
                //             doc.save('dashboard.pdf')
                //         }
                //     })
                // });
                //    $('#tvsr_btn').click(function(event) {
                    
                //     html2canvas(document.getElementById('tvsrealisasi_report'),{
                //         onrendered:function (canvas){
                            
                //             var img =  canvas.toDataURL('image/png', 1.0);
                //             var doc = new jsPDF("l", "pt", "a4", [canvas.width, canvas.height]);
                //            // doc.text(120, 15, "Diagram NPAT YTD");
                //             doc.addImage(img, 'png', -60,50, canvas.width, canvas.height); 
                //             doc.save('target-vs-realisasi.pdf')
                //         }
                //     })
                // })
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
              get_chart_aset_kap()
              get_chart_aset_ppap()
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


function get_chart_aset_kap(){
    data = '';
   $('#loading').show(); 
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   var src_kode_kantor =  $('#src_kode_kantor').val();
   
//    console.log(src_kode_kantor);
   $.ajax({
           url : base_url + "Accounting/Dashboard_ratio_controller/get_data_chart_kap",
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
                if(!response.rasio_asset_kap)
                {
                    var data_chart_rasio_capital = 
            {

                labels:['January','February','Maret','April','May','June','July','August','Septermber','Oktober','November','Desember'],
                datasets: [
                    {
                        label: "KAP",
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
                 $("#chart_rasio_capital_container").append('<canvas style="height:100px;" id="chart_rasio_capital"></canvas>'); 
                 var grapharea = document.getElementById("chart_rasio_capital").getContext("2d")
                   var npat_monthly = new Chart(
                    grapharea,config_chart_rasio_capital
                    ); return
                }
                var label=[]
                var rasio=[]
                var color=[]
                var chartColors = {
            red: 'rgb(255, 99, 132)',
            blue: 'rgb(54, 162, 235)'
            };
                for (var i =0;i < response.rasio_asset_kap.length;i++) 
                    {
                        label.push(response.rasio_asset_kap[i]['tgl_laporan']);
                        rasio.push(response.rasio_asset_kap[i]['rasio']);
                        var int_rasio= rasio.map(i=>Number(i));
                        if(int_rasio[i] < 8)
                        {
                            color.push('rgb(235, 0, 0)')
                        }else if(int_rasio[i] < 12 && int_rasio[i] >= 8)
                        {
                            color.push('rgb(255, 255, 51)')
                        }
                        else{
                            color.push('rgb(51, 235, 51)')
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
                        label: "KAP",
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
                 $("#chart_rasio_capital_container").append('<canvas style="height:100px;" id="chart_rasio_capital"></canvas>'); 
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
                    $('#aset_btn').click(function () 
                {
                     domtoimage.toPng(document.getElementById('capital_report'))
                        .then(function (canvas) 
                        {
                            var pdf = new jsPDF('l', 'pt',[$('#capital_report').width(), $('#capital_report').height()]);
                            pdf.addImage(canvas, 'jpeg', 0, 0, $('#capital_report').width(), $('#capital_report').height());
                            pdf.save("rasio.pdf");

                       // that.options.api.optionsChanged();
                    });
                }); 
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

function get_chart_aset_ppap(){
    data = '';
   $('#loading').show(); 
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   var src_kode_kantor =  $('#src_kode_kantor').val();
   
//    console.log(src_kode_kantor);
   $.ajax({
           url : base_url + "Accounting/Dashboard_ratio_controller/get_data_chart_ppap",
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
                if(!response.rasio_asset_ppap)
                {
                    var data_chart_rasio_aset_ppap = 
            {

                labels:['January','February','Maret','April','May','June','July','August','Septermber','Oktober','November','Desember'],
                datasets: [
                    {
                        label: "PPAP",
                        data:0,
                        backgroundColor: color,
                    },
                ]
            };
            
                var config_chart_rasio_aset_ppap = 
            {
                type: 'bar',
                data:data_chart_rasio_aset_ppap,
                options: {}
            };
               
                 $("canvas#chart_rasio_asset_ppap").remove();
                 $("#chart_rasio_aset_ppap_container").append('<canvas style="height:100px;" id="chart_rasio_asset_ppap"></canvas>'); 
                 var grapharea = document.getElementById("chart_rasio_asset_ppap").getContext("2d")
                   var rasio_aset_ppap = new Chart(
                    grapharea,config_chart_rasio_aset_ppap
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
                for (var i =0;i < response.rasio_asset_ppap.length;i++) 
                    {
                        label.push(response.rasio_asset_ppap[i]['tgl_laporan']);
                        rasio.push(response.rasio_asset_ppap[i]['rasio']);
                        var int_rasio= rasio.map(i=>Number(i));
                        if(int_rasio[i] < 8)
                        {
                            color.push('rgb(235, 0, 0)')
                        }else if(int_rasio[i] < 12 && int_rasio[i] >= 8)
                        {
                            color.push('rgb(255, 255, 51)')
                        }
                        else{
                            color.push('rgb(51, 235, 51)')
                        }
                    }
                   // console.log(parseFloat(response.rasio_capital[i]['rasio']))
                    console.log(int_rasio)
                  
            //Script NPAT monthly
            var data_chart_rasio_aset_ppap = 
            {

                labels:label,
                datasets: [
                    {
                        label: "PPAP",
                        data:int_rasio,
                        backgroundColor: color,
                    },
                ]
            };
            
                var config_chart_rasio_aset_ppap = 
            {
                type: 'bar',
                data:data_chart_rasio_aset_ppap,
                options: {}
            };
               
                 $("canvas#chart_rasio_asset_ppap").remove();
                 $("#chart_rasio_aset_ppap_container").append('<canvas style="height:100px;" id="chart_rasio_asset_ppap"></canvas>'); 
                 var grapharea = document.getElementById("chart_rasio_asset_ppap").getContext("2d")
                   var rasio_aset_ppap = new Chart(
                    grapharea,config_chart_rasio_aset_ppap
                    ); 

           
                    rasio_aset_ppap.update()

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
                    $('#aset_btn').click(function () 
                {
                     domtoimage.toPng(document.getElementById('capital_report'))
                        .then(function (canvas) 
                        {
                            var pdf = new jsPDF('l', 'pt',[$('#capital_report').width(), $('#capital_report').height()]);
                            pdf.addImage(canvas, 'jpeg', 0, 0, $('#capital_report').width(), $('#capital_report').height());
                            pdf.save("rasio.pdf");

                       // that.options.api.optionsChanged();
                    });
                }); 
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