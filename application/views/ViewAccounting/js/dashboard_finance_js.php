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
    get_chart_npat_ytd();
    get_chart_npat_month();
    get_chart_aset();
    get_chart_aset_kredit();
    get_chart_modal();
    get_speedometer_aset()
    get_speedometer_aset_kredit()
    get_speedometer_npat_monthly()
    get_speedometer_modal()
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
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_chart_npat_ytd",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           success : function(response) {
            $('#loading').hide(); 
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

function get_chart_npat_month(){
   data = '';
   $('#loading').show(); 
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_chart_npat_monthly",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           success : function(response) {
            $('#loading').hide(); 
                var label_npat_monthly=[]
                var realisasi_npat_monthly=[]
                var rencana_npat_monthly =[]

                for (var i =0;i < response.chart_npat_monthly.length;i++) 
                {
                    label_npat_monthly.push(response.chart_npat_monthly[i]['tgl_laporan']);
                    realisasi_npat_monthly.push(response.chart_npat_monthly[i]['realisasi']);
                    rencana_npat_monthly.push(response.chart_npat_monthly[i]['rencana']);
                }

            //Script NPAT YTD
            var data_chart_npat_ytd = {
                labels:label_npat_monthly,
                datasets: [
                    {
                        label: "Target",
                        backgroundColor: 'rgb(0, 76, 153)',
                        data:rencana_npat_monthly,
                    },
                    {
                        label: "Realisasi",
                        backgroundColor: 'rgb(255, 128, 0)',
                        data:realisasi_npat_monthly,
                    },
            
                ]
                    };
                        var config_npat_tyd = {
                        type: 'bar',
                        data:data_chart_npat_ytd,
                        options: {}
                    };
                    var npat_tyd = new Chart(
                    document.getElementById('chart_npat_monthly'),
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

function get_chart_aset_kredit(){
   data = '';
   $('#loading').show(); 
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_chart_aset_kredit",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           success : function(response) {
            $('#loading').hide(); 
                var label_aset_kredit=[]
                var realisasi_aset_kredit=[]
                var rencana_aset_kredit =[]

                for (var i =0;i < response.chart_aset_kredit.length;i++) 
                {
                    label_aset_kredit.push(response.chart_aset_kredit[i]['tgl_laporan']);
                    realisasi_aset_kredit.push(response.chart_aset_kredit[i]['realisasi']);
                    rencana_aset_kredit.push(response.chart_aset_kredit[i]['rencana']);
                }

            //Script NPAT YTD
            var data_chart_aset_kredit = {
                labels:label_aset_kredit,
                datasets: [
                    {
                        label: "Target",
                        backgroundColor: 'rgb(0, 76, 153)',
                        data:rencana_aset_kredit,
                    },
                    {
                        label: "Realisasi",
                        backgroundColor: 'rgb(255, 128, 0)',
                        data:realisasi_aset_kredit,
                    },
            
                ]
                    };
                        var config_aset_kredit = {
                        type: 'bar',
                        data:data_chart_aset_kredit,
                        options: {}
                    };
                    var chart_aset_kredit = new Chart(
                    document.getElementById('chart_aset_kredit'),
                    config_aset_kredit
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
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_chart_aset",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           success : function(response) {
            $('#loading').hide(); 
                var label_aset=[]
                var realisasi_aset=[]
                var rencana_aset =[]

                for (var i =0;i < response.chart_aset.length;i++) 
                {
                    label_aset.push(response.chart_aset[i]['tgl_laporan']);
                    realisasi_aset.push(response.chart_aset[i]['realisasi']);
                    rencana_aset.push(response.chart_aset[i]['rencana']);
                }

            //Script NPAT YTD
            var data_chart_aset = {
                labels:label_aset,
                datasets: [
                    {
                        label: "Target",
                        backgroundColor: 'rgb(0, 76, 153)',
                        data:rencana_aset,
                    },
                    {
                        label: "Realisasi",
                        backgroundColor: 'rgb(255, 128, 0)',
                        data:realisasi_aset,
                    },
            
                ]
                    };
                        var config_aset = {
                        type: 'bar',
                        data:data_chart_aset,
                        options: {}
                    };
                    var chart_aset = new Chart(
                    document.getElementById('chart_aset'),
                    config_aset
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
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_chart_modal",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           success : function(response) {
            $('#loading').hide(); 
                var label_modal=[]
                var realisasi_modal=[]
                var rencana_modal =[]

                for (var i =0;i < response.chart_modal.length;i++) 
                {
                    label_modal.push(response.chart_modal[i]['tgl_laporan']);
                    realisasi_modal.push(response.chart_modal[i]['realisasi']);
                    rencana_modal.push(response.chart_modal[i]['rencana']);
                }

            //Script NPAT YTD
            var data_chart_modal = {
                labels:label_modal,
                datasets: [
                    {
                        label: "Target",
                        backgroundColor: 'rgb(0, 76, 153)',
                        data:rencana_modal,
                    },
                    {
                        label: "Realisasi",
                        backgroundColor: 'rgb(255, 128, 0)',
                        data:realisasi_modal,
                    },
            
                ]
                    };
                        var config_modal = {
                        type: 'bar',
                        data:data_chart_modal,
                        options: {}
                    };
                    var chart_modal = new Chart(
                    document.getElementById('chart_modal'),
                    config_modal
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
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_speedometer_aset",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           success : function(response) {
            $('#loading').hide(); 
                var label_modal=[]


                for (var i =0;i < response.speedometer_aset.length;i++) 

                               //Script Speedometer Aset
                               var opts = {
                                   angle: 0.0, /// The span of the gauge arc
                                   lineWidth: 0.44, // The line thickness
                                   pointer: {
                                       length: 0.6, // Relative to gauge radius
                                       strokeWidth: 0.035 // The thickness,
                                   },
                                   colorStart: '#6FADCF',   // Colors
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
                               var target = document.getElementById('gaugeAset'); // your canvas element
                               var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                               gauge.maxValue = 100; // set max gauge value
                               gauge.setMinValue(0);  // set min value
                               gauge.set(response.speedometer_aset[0]); // set actual value
                               console.log(response.speedometer_aset[0])
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
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_speedometer_aset_krerdit",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           success : function(response) {
            $('#loading').hide(); 
                             
                               //Script Speedometer Aset Kredit
                               var opts = {
                                   angle: 0.0, /// The span of the gauge arc
                                   lineWidth: 0.44, // The line thickness
                                   pointer: {
                                       length: 0.6, // Relative to gauge radius
                                       strokeWidth: 0.035 // The thickness,
                                   },
                                   colorStart: '#6FADCF',   // Colors
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
                               var target = document.getElementById('gaugeAsetKredit'); // your canvas element
                               var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                               gauge.maxValue = 100; // set max gauge value
                               gauge.setMinValue(0);  // set min value
                               gauge.set(response.speedometer_aset_kredit[0]); // set actual value
                               console.log(response.speedometer_aset_kredit[0])
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
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_speedometer_npat_monthly",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           success : function(response) {
            $('#loading').hide(); 
                         
                               //Script Speedometer NPAT monthly
                               var opts = {
                                   angle: 0.0, /// The span of the gauge arc
                                   lineWidth: 0.44, // The line thickness
                                   pointer: {
                                       length: 0.6, // Relative to gauge radius
                                       strokeWidth: 0.035 // The thickness,
                                   },
                                   colorStart: '#6FADCF',   // Colors
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
                               var target = document.getElementById('gaugNpat'); // your canvas element
                               var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                               gauge.maxValue = 100; // set max gauge value
                               gauge.setMinValue(0);  // set min value
                               gauge.set(response.speedometer_npat_monthly[0]); // set actual value
                               console.log(response.speedometer_npat_monthly[0])
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
   $.ajax({
           url : base_url + "Accounting/Dashboard_finance_controller/get_data_speedometer_modal",
           type : "POST",
           dataType : "json",
           timeout : 180000,
           headers: {
                       'Authorization': 'Bearer ' + localStorage.getItem('token')
                   },
           success : function(response) {
            $('#loading').hide(); 
                                    //Speedometer NPAT YTD
                                    var opts = {
                                   angle: 0.0, /// The span of the gauge arc
                                   lineWidth: 0.44, // The line thickness
                                   pointer: {
                                       length: 0.6, // Relative to gauge radius
                                       strokeWidth: 0.035 // The thickness,
                                   },
                                   colorStart: '#6FADCF',   // Colors
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
                               var target = document.getElementById('gaugeModal'); // your canvas element
                               var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                               gauge.maxValue = 100; // set max gauge value
                               gauge.setMinValue(0);  // set min value
                               gauge.set(response.speedometer_modal[0]); // set actual value
                               console.log(response.speedometer_modal[0])
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




</script>