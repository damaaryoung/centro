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

  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>

<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">

  	<?php 
	  echo $navbar;
      echo $sidebar;
      echo $js;
	?>
<script src="<?php echo base_url('assets/plugins/sweetalert2/sweetalert2.min.js')?>"></script>
<script src="<?php echo base_url('assets/plugins/toastr/toastr.min.js')?>"></script>
<script type="text/javascript" src="<?php echo base_url();?>assets/design/js/select2.full.min.js"></script>


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1> <img src="<?= base_url(); ?>assets/dist/img/rekap_asuransi.svg" width="5%"> Proses Klaim Asuransi
        <small></small>
      </h1>
      <ol class="breadcrumb">
     
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid" style="height: auto;">

    <div id="loading">
      <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
    </div>

          <!-- From card Atas -->
          <div class="card card-danger card-outline card-outline-tabs">
            <div class="card-header p-0 border-bottom-0">
              <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="tab-laporan-cover_asuransi" data-toggle="pill" href="#body_tab_laporan_cover-asuransi" role="tab" aria-controls="body_tab_klaim_asuransi_jaminan" aria-selected="true">Laporan Cover Asuransi</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="tab-laporan-klaim-asuransi" data-toggle="pill" href="#body-tab-laporan-klaim-asuransi" role="tab" aria-controls="custom-tabs-four-profile" aria-selected="false">Laporan Klaim Asuransi</a>
                </li>
              </ul>
            </div>
            <div class="card-body" style="min-height: 830px;">
              <div class="tab-content" id="custom-tabs-four-tabContent">
            
                <!-- KLAIM ASURANSI JAMINAN -->
                <div class="tab-pane fade show active" id="body_tab_laporan_cover-asuransi" role="tabpanel" aria-labelledby="tab-laporan-cover_asuransi">
                    <!-- Data Tables -->
                    <div class="card">

                      <div class="card-header">
                        <h3 class="card-title text-center">Parameter Cetak</h3>
                      </div>
                      <!-- /.card-header -->
                      <div class="card-body">
                            <div class="row">
                                      <!-- form atas -->
                                      <div class="col-md-8 mx-auto">
                                          <div class="form-group row" style="padding-top: 30px;">
                                                          <div class="col-sm-2">
                                                              <label style="padding-top: 5px;" class="control-label" for="report_cover_asuransi_nama_asuransi">Nama Asuransi</label>
                                                          </div>
                                                          <div class="col-sm-8">
                                                                <select class="form-control form-control-sm select2 custom-select" id="report_cover_asuransi_nama_asuransi" name="report_cover_asuransi_nama_asuransi" style="width: 100%">
                                                
                                                                </select>
                                                          </div>
                                          </div>
                                          <div class="form-group row">
                                                          <div class="col-sm-2">
                                                              <label class="control-label" style="padding-top: 5px;"  for="modal_nama_nasabah_jaminan">Jenis Jaminan</label>
                                                          </div>
                                                          <div class="col-sm-8">
                                                                <select class="form-control form-control-sm select2 custom-select" id="modal_nama_asuransi_jaminan" name="modal_nama_asuransi_jaminan" style="width: 100%">
                                                
                                                                </select>
                                                          </div>
                                          </div>
                                          <div class="form-group row">
                                                          <div class="col-sm-2">
                                                              <label class="control-label" style="padding-top: 5px;"  for="modal_nama_nasabah_jaminan">Periode Cover</label>
                                                          </div>
                                                          <div class="col-sm-4">
                                                                <input type="date" class="form-control form-control-sm" id="modal_nama_nasabah_jaminan" name="modal_nama_nasabah_jaminan">
                                                          </div>
                                                          <div class="col-sm-4">
                                                                <input type="date" class="form-control form-control-sm" id="modal_nama_nasabah_jaminan" name="modal_nama_nasabah_jaminan">
                                                          </div>
                                          </div>
                                          <div class="form-group row">
                                              <div class="col-sm-2">
                                                  <button type="button" class="btn btn-success btn-sm" style="width: 250px;"  id="btn_tambah"><i class="fas fa-file-export"></i> Cetak Data</button>
                                              </div>
                                          </div>
                                      </div>
                            </div>

                      </div>                            


                    </div>
                    <!-- END Data Tables -->
                </div>
                <!-- END KLAIM ASURANSI JAMINAN -->
                
                <!-- KLAIM ASURANSI JIWA -->
                <div class="tab-pane fade" id="body-tab-laporan-klaim-asuransi" role="tabpanel" aria-labelledby="tab-laporan-klaim-asuransi">
                  
                    <!-- Data Tables -->
                    <div class="card">
                      sadasd
                    </div>
                    <!-- END Data Tables -->

                </div>
                <!-- END KLAIM ASURANSI JIWA -->
              </div>
            </div>
          </div>

    


      
          
        <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->



	<?php
        echo $ctrlbar;
        echo $footer;
        
	?>
<?php //$this->view('ViewCustodian/js/request_jaminan_main_js.php'); ?>
<script src="<?php echo base_url('assets/design/js/js_centro/js_asuransi/cover_asuransi.js')?>"></script>
<style>
              /* Important part */
              .modal-dialog{
                  overflow-y: initial !important
              }
              .modal-body{
                  height: 500px;
                  overflow-y: auto;
              }
              
              .modal-backdrop {
                width: 100% !important;
                height: 100% !important;
              }
              
</style>
<script>
  $(document).ready(function () {     
    $('.select2').select2();
  });
</script>
 
</body>
</html>




