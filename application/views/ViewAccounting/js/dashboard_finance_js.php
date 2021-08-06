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
 

    
 
   
    get_speedometer_aset()
    get_speedometer_aset_kredit()
    get_speedometer_npat_monthly()
    get_speedometer_modal()
    $('#loading-1').hide();
});

function search()
{
    get_speedometer_modal()
    get_speedometer_npat_monthly()
    get_speedometer_aset_kredit()
    get_speedometer_aset()
    get_chart_modal();
    get_chart_aset_kredit();
    get_chart_aset()
    get_chart_npat_ytd();
    get_chart_npat_month();
}
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
                console.log($('#src_tgl_laporan').val())
                get_chart_modal();
                get_chart_aset_kredit();
                get_chart_aset();
                get_chart_npat_month();
                get_chart_npat_ytd();
                
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

function get_chart_npat_ytd(){
   data = '';
   $('#loading').show(); 
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   var src_kode_kantor =  $('#src_kode_kantor').val();
   
//    console.log(src_kode_kantor);
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_chart_npat_ytd",
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

                console.log("response chart npat ytd",response)
                if(!response.chart_npat_ytd)
                {
                    $("canvas#chart_npat_ytd").remove();
                    $('#loading').hide();
                    console.log("data tidak npat ytd ada")
                    return 
                }
                var label=[]
                var realisasi=[]
                var rencana =[]
               

                for (var i =0;i < response.chart_npat_ytd.length;i++) 
                    {
                        label.push(response.chart_npat_ytd[i]['tgl_laporan']);
                        realisasi.push(response.chart_npat_ytd[i]['realisasi']);
                        rencana.push(response.chart_npat_ytd[i]['rencana']);
                    }
                    
              
            //Script NPAT YTD
            var data_chart_npat_ytd = 
            {
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
                var config_npat_tyd = 
            {
                type: 'bar',
                data:data_chart_npat_ytd,
                options: {}
            };
                 // $('#chart_npat_ytd').remove()
                 $("canvas#chart_npat_ytd").remove();
                 $("canvas#chart_npat_ytd_container").remove();
                 $("#chart_npat_ytd_container").append('<canvas id="chart_npat_ytd"></canvas>'); 
                 var grapharea = document.getElementById("chart_npat_ytd").getContext("2d")
                   var npat_tyd = new Chart(
                    grapharea,config_npat_tyd
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

function get_chart_npat_month(){
   data = '';
   $('#loading').show(); 
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   var src_kode_kantor =  $('#src_kode_kantor').val();
   
//    console.log(src_kode_kantor);
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_chart_npat_monthly",
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

                console.log("response chart npat Monthly",response)
                if(!response.chart_npat_monthly)
                {
                    $("canvas#chart_npat_monthly").remove();
                    $('#loading').hide();
                    console.log("data npat monthly tidak ada")
                    return 
                }
                var label=[]
                var realisasi=[]
                var rencana =[]
            
                for (var i =0;i < response.chart_npat_monthly.length;i++) 
                    {
                        label.push(response.chart_npat_monthly[i]['tgl_laporan']);
                        realisasi.push(response.chart_npat_monthly[i]['realisasi']);
                        rencana.push(response.chart_npat_monthly[i]['rencana']);
                    }
                      
            //Script NPAT monthly
            var data_chart_npat_monthly = 
            {
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
                var config_npat_monthly = 
            {
                type: 'bar',
                data:data_chart_npat_monthly,
                options: {}
            };
               
                 $("canvas#chart_npat_monthly").remove();
                 $("#chart_npat_monthly_container").append('<canvas id="chart_npat_monthly"></canvas>'); 
                 var grapharea = document.getElementById("chart_npat_monthly").getContext("2d")
                   var npat_monthly = new Chart(
                    grapharea,config_npat_monthly
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

function get_chart_aset_kredit(){
    $data=''
    $('#loading').show(); 
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   var src_kode_kantor =  $('#src_kode_kantor').val();
   
//    console.log(src_kode_kantor);
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_chart_aset_kredit",
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

            console.log("response chart Aset Kredit",response)
            if(!response.chart_aset_kredit)
            {
                $("canvas#chart_aset_kredit").remove();
                $('#loading').hide();
                console.log("data aset kredit tidak ada")
                return 
            }
            var label=[]
            var realisasi=[]
            var rencana =[]

            for (var i =0;i < response.chart_aset_kredit.length;i++) 
                {
                    label.push(response.chart_aset_kredit[i]['tgl_laporan']);
                    realisasi.push(response.chart_aset_kredit[i]['realisasi']);
                    rencana.push(response.chart_aset_kredit[i]['rencana']);
                }
                
            //Script NPAT monthly
            var data_chart_aset_kredit = 
            {
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
            var config_aset_kredit = 
            {
            type: 'bar',
            data:data_chart_aset_kredit,
            options: {}
            };

            $("canvas#chart_aset_kredit").remove();
            $("#chart_aset_kredit_container").append('<canvas id="chart_aset_kredit"></canvas>'); 
            var grapharea = document.getElementById("chart_aset_kredit").getContext("2d")
            var aset_kredit = new Chart(
                grapharea,config_aset_kredit
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

function get_chart_aset(){
    data = '';
   $('#loading').show(); 
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   var src_kode_kantor =  $('#src_kode_kantor').val();
   
//    console.log(src_kode_kantor);
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_chart_aset",
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

                console.log("response chart Asert Total",response)
                if(!response.chart_aset)
                {
                    $("canvas#chart_aset").remove();
                    $('#loading').hide();
                    console.log("data Asert Total tidak ada")
                    return 
                }
                var label=[]
                var realisasi=[]
                var rencana =[]
            
                for (var i =0;i < response.chart_aset.length;i++) 
                    {
                        label.push(response.chart_aset[i]['tgl_laporan']);
                        realisasi.push(response.chart_aset[i]['realisasi']);
                        rencana.push(response.chart_aset[i]['rencana']);
                    }
                      
            //Script NPAT monthly
            var data_chart_aset = 
            {
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
                var config_chart_aset = 
            {
                type: 'bar',
                data:data_chart_aset,
                options: {}
            };
               
                 $("canvas#chart_aset").remove();
                 $("#chart_aset_total_container").append('<canvas id="chart_aset"></canvas>'); 
                 var grapharea = document.getElementById("chart_aset").getContext("2d")
                   var npat_monthly = new Chart(
                    grapharea,config_chart_aset
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

function get_chart_modal(){
    data = '';
   $('#loading').show(); 
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   var src_kode_kantor =  $('#src_kode_kantor').val();
   
//    console.log(src_kode_kantor);
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_chart_modal",
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

                console.log("response chart Modal",response)
                if(!response.chart_modal)
                {
                    $("canvas#chart_modal").remove();
                    $('#loading').hide();
                    console.log("data Modal tidak ada")
                    return 
                }
                var label=[]
                var realisasi=[]
                var rencana =[]
            
                for (var i =0;i < response.chart_modal.length;i++) 
                    {
                        label.push(response.chart_modal[i]['tgl_laporan']);
                        realisasi.push(response.chart_modal[i]['realisasi']);
                        rencana.push(response.chart_modal[i]['rencana']);
                    }
                      
            //Script NPAT monthly
            var data_chart_modal = 
            {
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
                var config_chart_modal = 
            {
                type: 'bar',
                data:data_chart_modal,
                options: {}
            };
               
                 $("canvas#chart_modal").remove();
                 $("#chart_modal_container").append('<canvas id="chart_modal"></canvas>'); 
                 var grapharea = document.getElementById("chart_modal").getContext("2d")
                   var npat_monthly = new Chart(
                    grapharea,config_chart_modal
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

function get_speedometer_aset(){
    data = '';
   $('#loading').show(); 
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   var src_kode_kantor =  $('#src_kode_kantor').val();
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_speedometer_aset",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
            data:{"src_kode_kantor" : src_kode_kantor,
            "src_tgl_laporan" : src_tgl_laporan},   
           success : function(response) {
            console.log("response speedometer Aset",response)
                if(!response.speedometer_aset)
                {
                    
                    $("canvas#gaugeAset").remove();
                    $("canvas#gaugeAset-value").remove();
                    $('#loading').hide();
                    console.log("speedometer aset tidak ada")
                    return 
                }
            $('#loading').hide(); 
                var label_modal=[]

                               //Script Speedometer Aset
                               var opts = {
                                   angle: 0.0, /// The span of the gauge arc
                                   lineWidth: 0.64, // The line thickness
                                   pointer: {
                                       length: 0.6, // Relative to gauge radius
                                       strokeWidth: 0.035 // The thickness,
                                   },
                                   colorStart: '#00E007',   // Colors
                                   colorStop: '#00E007',    // just experiment with them
                                   strokeColor: '#E0E0E0',   // to see which ones work best for you
                                   generateGradient: true,
                                   highDpiSupport: true,
                                   staticLabels: {
                                       font: "12px sans-serif",  // Specifies font
                                       labels: [0,100],  // Print labels at these values
                                       color: "#000000",  // Optional: Label text color
                                       fractionDigits: 0, // Optional: Numerical precision. 0=round off.
                                   }
                               };
                               $("#gaugeAset-value").remove();
                               $("#label_aset").remove();
                               $("#gaugeAset-value_container").prepend('<p id="label_aset">Aset : <output  id="gaugeAset-value"></output>%</p>'); 
                               $("canvas#gaugeAset").remove();
                               $("#gaugeAset_container").append('<canvas id="gaugeAset" style="width: 10vw;"></canvas>'); 
                               var target = document.getElementById('gaugeAset'); // your canvas element
                               var label = document.getElementById('label'); // your canvas element
                               var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                               gauge.maxValue = 100; // set max gauge value
                               gauge.setMinValue(0);  // set min value
                               gauge.set(parseFloat(response.speedometer_aset[0]).toFixed(2)); // set actual value
                               gauge.setTextField(document.getElementById("gaugeAset-value"));                 
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
function get_speedometer_aset_kredit(){
    data = '';
   $('#loading').show(); 
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   var src_kode_kantor =  $('#src_kode_kantor').val();
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_speedometer_aset_kredit",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           data:{"src_kode_kantor" : src_kode_kantor,
            "src_tgl_laporan" : src_tgl_laporan},   
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           success : function(response) {
            console.log("response speedometer Aset Kredit",response)
                if(!response.speedometer_aset_kredit)
                {
                    
                    $("canvas#gaugeAsetKredit").remove();
                    $("canvas#gaugeAsetKredit-value").remove();
                    $('#loading').hide();
                    console.log("speedometer aset kredit tidak ada")
                    return 
                }
            $('#loading').hide(); 
                var label_modal=[]

                               //Script Speedometer Aset
                               var opts = {
                                    angle: 0.0, /// The span of the gauge arc
                                    lineWidth: 0.64, // The line thickness
                                    pointer: {
                                        length: 0.6, // Relative to gauge radius
                                        strokeWidth: 0.035 // The thickness,
                                    },
                                    colorStart: '#8FC0DA',   // Colors
                                    colorStop: '#8FC0DA',    // just experiment with them
                                    strokeColor: '#E0E0E0',   // to see which ones work best for you
                                    generateGradient: true,
                                    highDpiSupport: true,
                                    staticLabels: {
                                        font: "12px sans-serif",  // Specifies font
                                        labels: [0,100],  // Print labels at these values
                                        color: "#000000",  // Optional: Label text color
                                        fractionDigits: 0, // Optional: Numerical precision. 0=round off.
                                    }
                                };
                               $("#gaugeAsetKredit-value").remove();
                               $("#label_aset_kredit").remove();
                               $("#gaugeAsetKredit-value_container").prepend('<p id="label_aset_kredit">Aset Kredit : <output  id="gaugeAsetKredit-value"></output>%</p>'); 
                               $("canvas#gaugeAsetKredit").remove();
                               $("#gaugeAsetKredit_container").append('<canvas id="gaugeAsetKredit" style="width: 10vw;"></canvas>'); 
                               var target = document.getElementById('gaugeAsetKredit'); // your canvas element
                               var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                               gauge.maxValue = 100; // set max gauge value
                               gauge.setMinValue(0);  // set min value
                               gauge.set(parseFloat(response.speedometer_aset_kredit[0])); // set actual value
                               gauge.setTextField(document.getElementById("gaugeAsetKredit-value"));          
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

function get_speedometer_npat_monthly(){
    data = '';
   $('#loading').show(); 
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   var src_kode_kantor =  $('#src_kode_kantor').val();

   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_speedometer_npat_monthly",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           data:{"src_kode_kantor" : src_kode_kantor,
            "src_tgl_laporan" : src_tgl_laporan},       
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           success : function(response) {
            console.log("response speedometer NPAT",response)
                if(!response.speedometer_npat_monthly)
                {
                    
                    $("canvas#gaugNpat").remove();
                    $("canvas#gaugNpat-value").remove();
                    $('#loading').hide();
                    console.log("speedometer NPAT tidak ada")
                    return 
                }
            $('#loading').hide(); 
                         
                               //Script Speedometer NPAT monthly
                               var opts = {
                                   angle: 0.0, /// The span of the gauge arc
                                   lineWidth: 0.64, // The line thickness
                                   pointer: {
                                       length: 0.6, // Relative to gauge radius
                                       strokeWidth: 0.035 // The thickness,
                                   },
                                   colorStart: '#D33A27',   // Colors
                                   colorStop: '#D33A27',    // just experiment with them
                                   strokeColor: '#E0E0E0',   // to see which ones work best for you
                                   generateGradient: true,
                                   highDpiSupport: true,
                                   staticLabels: {
                                       font: "12px sans-serif",  // Specifies font
                                       labels: [0,100],  // Print labels at these values
                                       color: "#000000",  // Optional: Label text color
                                       fractionDigits: 0, // Optional: Numerical precision. 0=round off.
                                   }
                               };
                               $("#gaugNpat-value").remove();
                               $("#label_gaugNpat").remove();
                               $("#gaugNpat-value_container").prepend('<p id="label_gaugNpat">NPAT : <output  id="gaugNpat-value"></output>%</p>'); 
                               $("canvas#gaugNpat").remove();
                               $("#gaugNpat_container").append('<canvas id="gaugNpat" style="width: 10vw;"></canvas>'); 
                               var target = document.getElementById('gaugNpat'); // your canvas element
                               var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                               gauge.maxValue = 100; // set max gauge value
                               gauge.setMinValue(0);  // set min value
                               gauge.set(parseFloat(response.speedometer_npat_monthly[0])); // set actual value
                               gauge.setTextField(document.getElementById("gaugNpat-value"));
                                  
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
function get_speedometer_modal(){
    data = '';
   $('#loading').show(); 
   var src_tgl_laporan = $('#src_tgl_laporan').val();
   var src_kode_kantor =  $('#src_kode_kantor').val();
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_speedometer_modal",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           data:{"src_kode_kantor" : src_kode_kantor,
            "src_tgl_laporan" : src_tgl_laporan},  
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           success : function(response) {
            console.log("response speedometer NPAT",response)
                if(!response.speedometer_modal)
                {
                    
                    $("canvas#gaugeModal").remove();
                    $("canvas#gaugeModal-value").remove();
                    $('#loading').hide();
                    console.log("speedometer Modal tidak ada")
                    return 
                }
            $('#loading').hide(); 
                                    //Speedometer NPAT YTD
                                    var opts = {
                                   angle: 0.0, /// The span of the gauge arc
                                   lineWidth: 0.64, // The line thickness
                                   pointer: {
                                       length: 0.6, // Relative to gauge radius
                                       strokeWidth: 0.035 // The thickness,
                                   },
                                   colorStart: '#fcba03',   // Colors
                                   colorStop: '#fcba03',    // just experiment with them
                                   strokeColor: '#E0E0E0',   // to see which ones work best for you
                                   generateGradient: true,
                                   highDpiSupport: true,
                                   staticLabels: {
                                       font: "12px sans-serif",  // Specifies font
                                       labels: [0,100],  // Print labels at these values
                                       color: "#000000",  // Optional: Label text color
                                       fractionDigits: 0, // Optional: Numerical precision. 0=round off.
                                   }
                               };
                               $("#gaugeModal-value").remove();
                               $("#label_gaugeModal").remove();
                               $("#gaugeModal-value_container").prepend('<p id="label_gaugeModal">Modal : <output  id="gaugeModal-value"></output>%</p>'); 
                               $("canvas#gaugeModal").remove();
                               $("#gaugeModal_container").append('<canvas id="gaugeModal" style="width: 10vw;"></canvas>'); 
                               var target = document.getElementById('gaugeModal'); // your canvas element
                               var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                               gauge.maxValue = 100; // set max gauge value
                               gauge.setMinValue(0);  // set min value
                               gauge.set(parseFloat(response.speedometer_modal[0])); // set actual value
                               gauge.setTextField(document.getElementById("gaugeModal-value"));
                               
                     
                                         
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