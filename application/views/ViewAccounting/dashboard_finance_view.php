<!DOCTYPE html>
<!--
This is a starter template page. Use this page to start your new project from
scratch. This page gets rid of all links and provides the needed markup only.
-->
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>CENTRO | BPR Kredit Mandiri</title>
  <link rel="icon" type="image/jpeg" href="<?php echo base_url(); ?>assets/design/images/kmi_logo.png" />
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <?php echo $css; ?>
  <link rel="stylesheet" href="<?php echo base_url('assets/plugins/toastr/toastr.min.css')?>">
  <link rel="stylesheet" href="<?php echo base_url('assets/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css')?>">
  <link rel="stylesheet" href="<?php echo base_url('assets/design/css/select2.min.css') ?>">
  <script type="text/javascript" src="<?php echo base_url();?>node_modules/chart.js/dist/gauge.min.js"></script>
  <link rel="stylesheet"href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>

<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">

  	<?php 
	  echo $navbar;
      echo $sidebar;
      echo $js;
	?>
<script src="<?php echo base_url('assets/plugins/sweetalert2/sweetalert2.min.js')?>"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/plugins/bs-custom-file-input/bs-custom-file-input.min.js"></script>
<script type="text/javascript" src="<?php echo base_url();?>assets/design/js/select2.full.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script type="text/javascript" src="<?php echo base_url();?>node_modules/chart.js/dist/gauge.min.js"></script>

  <!-- Content Wrapper. Contains page content -->

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h3> <img src="<?= base_url(); ?>assets/dist/img/rekap_asuransi.svg" width="5%"> Financial Dashboard        <small></small>
      </h3>
      <ol class="breadcrumb">
     
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid" style="min-height: 700px;">

    <div id="loading">
      <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
    </div>


      <!-- From card Bawah -->
          <!-- Horizontal Form -->
          <div class="card card-info collapsed-box">
            <div class="card-header with-border ">
              
              <h3 class="card-title">Filter</h3>
              <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
                  </button>
                  <!-- <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i></button> -->
                </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body text-center">  
                <div class="row">
                      <div class="col-md-12 mx-auto">
                              <div class="form-group row justify-content-sm-center">
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="src_tgl_realisasi">Periode</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="date" class="form-control form-control-sm" id="src_tgl_realisasi" name="src_tgl_realisasi" onchange="search_tanggal()">
                                  </div>
                              </div>
                      </div>
                </div>
                   
            </div>            
          </div>
          <!-- /.card -->
          <!-- From card Bawah -->


        <!-- Data Dashboard -->
          <div class="card card-danger">
                  <div class="card-header">
                  <h3 class="card-title">Dashboard</h3>
                      <div class="card-tools">
                      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
                      </button>
                      <!-- <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i></button> -->
                    </div>
                  </div>
                  <!-- /.card-header -->
                  <div class="card-body">
                      
                    <div class="row">
                      <div class="col-md-12 mx-auto">
                        <div class="form-group row justify-content-sm-center">
                            <div class="col-sm-6">
                              <h4>Target vs Realisasi</h4>
                             
                              <table>
                                <tr>
                                    <tr>
                                      <td><canvas id="gaugeAset" style="width: 220px;"></canvas></td>
                                      <td><canvas id="gaugeAsetKredit"  style="width: 220px;"></canvas></td>
                                    </tr>
                                 
                                    <tr style="text-align: center;">
                                    <td style="font-size: 25px;"><output  id="gaugeAset-value"></output>%</td>
                                    <td style="font-size: 25px;"><output id="gaugeAsetKredit-value"></output>%</td>
                                    </tr>

                                    <tr>
                                    <td><output id="gaugeAset-value"value></output> Aset</td>
                                    <td><output id="gaugeAsetKredit-value"></output> Aset Kredit</td>
                                    </tr>
                                </tr>
                                <tr>
                                    <tr>
                                      <td><canvas id="gaugNpat"  style="width: 220px;"></canvas></td>
                                      <td><canvas id="gaugeModal"  style="width: 220px;"></canvas></td>
                                    </tr>
                                  <tr style="text-align: center;">
                                    <td style="font-size: 25px;"><output id="gaugNpat-value"></output>%</td>
                                    <td style="font-size: 25px;"><output id="gaugeModal-value"></output>%</td>
                                  </tr>
                                  <tr>
                                    <td><output id="gaugNpat-value"></output> NPAT</td>
                                    <td><output id="gaugeModal-value"></output> Modal</td>
                                  </tr>
                                </tr>
                                
                              </table>
       
                              <script>
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
                                        labels: [0,56,100],  // Print labels at these values
                                        color: "#000000",  // Optional: Label text color
                                        fractionDigits: 0, // Optional: Numerical precision. 0=round off.
                                    }
                                };
                                var target = document.getElementById('gaugeAset'); // your canvas element
                                var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                                gauge.maxValue = 100; // set max gauge value
                                gauge.setMinValue(0);  // set min value
                                gauge.set(<?= json_encode($speedometer_aset=$data['total'])?>); // set actual value
                                gauge.setTextField(document.getElementById("gaugeAset-value"));

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
                                        labels: [0,44,100],  // Print labels at these values
                                        color: "#000000",  // Optional: Label text color
                                        fractionDigits: 0, // Optional: Numerical precision. 0=round off.
                                    }
                                };
                                var target = document.getElementById('gaugeAsetKredit'); // your canvas element
                                var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                                gauge.maxValue = 100; // set max gauge value
                                gauge.setMinValue(0);  // set min value
                                gauge.set(36); // set actual value
                                gauge.setTextField(document.getElementById("gaugeAsetKredit-value"));

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
                                        labels: [0,20,100],  // Print labels at these values
                                        color: "#000000",  // Optional: Label text color
                                        fractionDigits: 0, // Optional: Numerical precision. 0=round off.
                                    }
                                };
                                var target = document.getElementById('gaugNpat'); // your canvas element
                                var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                                gauge.maxValue = 100; // set max gauge value
                                gauge.setMinValue(0);  // set min value
                                gauge.set(26); // set actual value
                                gauge.setTextField(document.getElementById("gaugNpat-value"));
                                
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
                                        labels: [0,36,100],  // Print labels at these values
                                        color: "#000000",  // Optional: Label text color
                                        fractionDigits: 0, // Optional: Numerical precision. 0=round off.
                                    }
                                };
                                var target = document.getElementById('gaugeModal'); // your canvas element
                                var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
                                gauge.maxValue = 100; // set max gauge value
                                gauge.setMinValue(0);  // set min value
                                gauge.set(38); // set actual value
                                gauge.setTextField(document.getElementById("gaugeModal-value"));

                              </script>  
                          </div>
                          
                          <div class="col-sm-6">
                          <h4>Modal</h4>
                                      <canvas id="chart_modal"></canvas>

                                      <?php
                                        foreach($chart_modal as $data){
                                            $tgl_laporan_modal[] = $data->tgl_laporan;
                                            $realisasi_modal[] = (float) $data->realisasi;
                                            $rencana_modal[] = (float) $data->rencana;
                                        }
                                    ?>
                                        <!-- script Aset Total -->
                                        <script>
                                        var data = {
                                        labels: <?php echo json_encode($tgl_laporan_modal);?>,
                                        datasets: [
                                            {
                                              backgroundColor: 'rgb(0, 76, 153)',
                                              data: <?php echo json_encode($rencana_modal);?>,
                                              label: "Target"
                                            },
                                            {
                                              backgroundColor: 'rgb(255, 128, 0)',
                                              data: <?php echo json_encode($realisasi_modal);?>,
                                              label: "Realisasi"
                                            },
                                  
                                        ]
                                          };
                                              const config_5 = {
                                              type: 'bar',
                                              data,
                                              options: {}
                                            };
                                            var myChart = new Chart(
                                            document.getElementById('chart_modal'),
                                            config_5 
                                          );
                                        </script>    
                          <div>
                        </div>          
                      </div>
                    </div>

                    <div class="form-group row justify-content-sm-center">
                                  <div class="col-sm-6">
                                      <h4>Aset Total</h4>
                                      <canvas id="chart_aset"></canvas>

                                      <?php
                                        foreach($chart_aset as $data){
                                            $tgl_laporan_aset[] = $data->tgl_laporan;
                                            $realisasi_aset[] = (float) $data->realisasi;
                                            $rencana_aset[] = (float) $data->rencana;
                                        }
                                    ?>
                                        <!-- script Aset Total -->
                                        <script>
                                        var data = {
                                        labels: <?php echo json_encode($tgl_laporan_aset);?>,
                                        datasets: [
                                            {
                                              backgroundColor: 'rgb(0, 76, 153)',
                                              data: <?php echo json_encode($rencana_aset);?>,
                                              label: "Target"
                                            },
                                            {
                                              backgroundColor: 'rgb(255, 128, 0)',
                                              data: <?php echo json_encode($realisasi_aset);?>,
                                              label: "Realisasi"
                                            },
                                  
                                        ]
                                          };
                                              const config_1 = {
                                              type: 'bar',
                                              data,
                                              options: {}
                                            };
                                            var myChart = new Chart(
                                            document.getElementById('chart_aset'),
                                            config_1
                                          );
                                        </script> 
                                    </div>    
                                   
                                  <div class="col-sm-6">
                                      <h4>Aset Kredit</h4>
                                      <canvas id="chart_aset_kredit"></canvas>

                                      <?php
                                        foreach($chart_aset_kredit as $data){
                                            $tgl_laporan_aset_kredit[] = $data->tgl_laporan;
                                            $realisasi_aset_kredit[] = (float) $data->realisasi;
                                            $rencana_aset_kredit[] = (float) $data->rencana;

                                        }
                                    ?>
                                        <!-- script Aset Kredit -->
                                        <script>

                                        var data = {
                                        labels: <?php echo json_encode($tgl_laporan_aset_kredit);?>,
                                        datasets: [
                                            {
                                              backgroundColor: 'rgb(0, 76, 153)',
                                              data: <?php echo json_encode($rencana_aset_kredit);?>,
                                              label: "Target"
                                            },
                                            {
                                              backgroundColor: 'rgb(255, 128, 0)',
                                              data: <?php echo json_encode($realisasi_aset_kredit);?>,
                                              label: "Realisasi"
                                            },
                                  
                                        ]
                                          };
                                              const config_2 = {
                                              type: 'bar',
                                              data,
                                              options: {}
                                            };
                                            var myChart_2 = new Chart(
                                            document.getElementById('chart_aset_kredit'),
                                            config_2
                                          );
                                        </script> 
                                    </div>    
                                  </div>

                                  <div class="form-group row justify-content-sm-center">
                                    <div class="col-sm-6">
                                      <h4>NPAT Monthly</h4>
                                      <canvas id="chart_npat_monthly"></canvas>

                                      <?php
                                        foreach($chart_npat_montly as $data){
                                            $tgl_laporan_npat_montly[] = $data->tgl_laporan;
                                            $realisasi_npat_montly[] = (float) $data->realisasi;
                                            $rencana_npat_montly[] = (float) $data->rencana;

                                        }
                                    ?>
                                        <!-- script NPAT Monthly -->
                                        <script>
                                        var data = {
                                        labels: <?php echo json_encode($tgl_laporan_npat_montly);?>,
                                        datasets: [
                                            {
                                              backgroundColor: 'rgb(0, 76, 153)',
                                              data: <?php echo json_encode($rencana_npat_montly);?>,
                                              label: "Target"
                                            },
                                            {
                                              backgroundColor: 'rgb(255, 128, 0)',
                                              data: <?php echo json_encode($realisasi_npat_montly);?>,
                                              label: "Realisasi"
                                            },
                                  
                                        ]
                                          };
                                              const config_npat_monthly = {
                                              type: 'bar',
                                              data,
                                              options: {}
                                            };
                                            var myChart_npat_monthly = new Chart(
                                            document.getElementById('chart_npat_monthly'),
                                            config_npat_monthly
                                          );
                                        </script> 
                                    </div>
                                    <div class="col-sm-6">
                                    <h4>NPAT YTD</h4>
                                      <canvas id="chart_npat_ytd"></canvas>
                                      <!-- Chart NPAT YTD -->
                                      <?php
                                        foreach($chart_npat_ytd as $data){
                                            $tgl_laporan_npat_ytd[] = $data->tgl_laporan;
                                            $realisasi_npat_ytd[] = (float) $data->realisasi;
                                            $rencana_npat_ytd[] = (float) $data->rencana;

                                        }
                                    ?>
                                 <script>
                                      
                                          // Scrip NPAT YTD
                                        var data = {
                                        labels:<?php echo json_encode($tgl_laporan_npat_ytd);?>,
                                        datasets: [
                                            {
                                                label: "Target",
                                                backgroundColor: 'rgb(0, 76, 153)',
                                                data: <?php echo json_encode($rencana_npat_ytd);?>,
                                            },
                                            {
                                                label: "Realisasi",
                                                backgroundColor: 'rgb(255, 128, 0)',
                                                data: <?php echo json_encode($realisasi_npat_ytd);?>,
                                            },
                                  
                                        ]
                                          };
                                              const config_npat_tyd = {
                                              type: 'bar',
                                              data,
                                              options: {}
                                            };
                                            var npat_tyd = new Chart(
                                            document.getElementById('chart_npat_ytd'),
                                            config_npat_tyd
                                          );
                                       
                                        </script> 

                                    </div>             
                                  </div>
                    
                      <br>    
                     
                  </div>
                  <!-- /.card-body -->
          </div>
        <!-- End Data Tables-->

          <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->



	<?php
        echo $ctrlbar;
        echo $footer;
        
	?>
<!--  -->
<script src="<?php echo base_url('assets/dist/js/accounting.min.js')?>"></script>

 
</body>
</html>