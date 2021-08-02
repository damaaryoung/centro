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
<script type="text/javascript" src="<?php echo base_url();?>node_modules/chart.js/dist/chart.min.js"></script>
<script type="text/javascript" src="<?php echo base_url();?>node_modules/chart.js/dist/gauge.min.js"></script>

  <!-- Content Wrapper. Contains page content -->

  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h3> <img src="<?= base_url(); ?>assets/dist/img/rekap_asuransi.svg" width="5%"> Financial Dashboard
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
                </div>
            </div>
            <!-- /.card-header -->
            <div class="card-body text-center">  
                <div class="row">
                      <div class="col-md-12 mx-auto">
                      <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="src_kantor_kas_cabang">Kode Kantor</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <select class="form-control form-control-sm select2 custom-select" id="src_kode_kantor" name="src_kode_kantor" onchange="search()">
                                    </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="src_tgl_laporan">Periode</label>
                                  </div>
                                  <div class="col-sm-3">                                       
                                  <input type="month" class="form-control form-control-sm" id="src_tgl_laporan" name="src_tgl_laporan" style="width: 300px;"  onchange="search()">
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
                                  <div class="card">

                                        <div class="card-header">
                                          Target vs Realisasi
                                            <div class="card-tools">
                                                <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
                                                  <!-- <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i></button> -->
                                          </div>
                                        </div>
      
                                      <div class="card-body">
                                               <div class="form-group row justify-content-sm-center">
                                                    <div class="col-md-4" >
                                                      <div class="container" id="gaugeAset_container">
                                                        <canvas id="gaugeAset" style="width: 10vw;"></canvas>
                                                      </div>

                                                      <div class="container" id="gaugeAset-value_container">
                                                        <p id="label_aset"><output  id="gaugeAset-value"></output></p>                                             
                                                      </div>

                                                      </div>

                                                    <div class="col-md-4">
                                                      <div class="container" id="gaugeAsetKredit_container">
                                                          <canvas id="gaugeAsetKredit" style="width: 10vw;"></canvas>
                                                      </div>

                                                      <div class="container" id="gaugeAsetKredit-value_container">
                                                        <p id="label_aset_kredit"><output  id="gaugeAsetKredit-value"></output></p>                                             
                                                      </div>

                                                    </div>       
                                                    <div class="col-md-4">

                                                    <div class="container" id="gaugNpat_container">
                                                          <canvas id="gaugNpat" style="width: 10vw;"></canvas>
                                                    </div>

                                                    <div class="container" id="gaugNpat-value_container">
                                                        <p id="label_gaugNpat"><output  id="gaugNpat-value"></output></p>                                             
                                                    </div>
                                                    
                                                  </div>
                                                  <div class="col-md-4">
                                                      <div class="container" id="gaugeModal_container">
                                                            <canvas id="gaugeModal" style="width: 10vw;"></canvas>
                                                      </div>
    
                                                      <div class="container" id="gaugeModal-value_container">
                                                          <p id="label_gaugeModal"><output  id="gaugeModal-value"></output></p>                                             
                                                      </div>
                                                    </div>   
                                                </div>
                                         
                                        
                                      </div>
                              
                                  </div>
                                </div>
                          
                          <div class="col-sm-6">
                              <div class="card">
                                 <div class="card-header">
                                    Modal
                                      <div class="card-tools">
                                      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
                                      </button>
                                      <!-- <button type="button" class="btn btn-tool" data-card-widget="remove"><i class="fas fa-times"></i></button> -->
                                      </div>
                                  </div>

                                  <div class="card-body"id="chart_modal_container">
                                    <canvas id="chart_modal"></canvas>

                                  <div>
                                </div>     
                              </div>
                            </div>             
                        </div>
                    </div>
                    <div class="form-group row justify-content-sm-center">
                                  <div class="col-sm-6">
                                    <div class="card ">
                                    <div class="card-header">
                                    Aset Total
                                    <div class="card-tools">
                                      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
                                    </div>
                                    </div>
                                    <div class="card-body" id="chart_aset_total_container">
                                    <canvas id="chart_aset"></canvas>
                                    </div>
                                  </div>
                                </div>    
                                  <div class="col-sm-6">
                                  <div class="card">
                                    <div class="card-header">
                                    Aset Kredit
                                    <div class="card-tools">
                                      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
                                    </div>
                                    </div>
                                    <div class="card-body" id="chart_aset_kredit_container">
                                      <canvas id="chart_aset_kredit"  ></canvas>
                                    </div>
                                  </div>
                                    </div>    
                                  </div>

                                  <div class="form-group row justify-content-sm-center">
                                    <div class="col-sm-6">
                                    <div class="card ">
                                      <div class="card-header">
                                      NPAT Monthly
                                      <div class="card-tools">
                                      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
                                      </button>
                                    </div>
                                      </div>
                                      <div class="card-body" id="chart_npat_monthly_container">
                                        <canvas id="chart_npat_monthly"></canvas>
                                      </div>
                                    </div>
                                    </div>
                                    <div class="col-sm-6">
                                    <div class="card">
                                      <div class="card-header">
                                      NPAT YTD
                                      <div class="card-tools">
                                      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i></button>
                                    </div>
                                      </div>
                                      <div class="card-body" id="chart_npat_ytd_container">
                                        <canvas id="chart_npat_ytd"></canvas>
                                      </div>
                                    </div>
                                    </div>             
                                  </div>
                  </div>
                  <!-- /.card-body -->
          </div>
        <!-- End Data Tables-->
        <input type="hidden" class="form-control" id="user_kode_kantor" name="user_kode_kantor" value = "<?php echo $kode_kantor; ?>">
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
<?php $this->view('ViewAccounting/js/dashboard_finance_js.php'); ?>
 
</body>
</html>