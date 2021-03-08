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
  <link rel="stylesheet" href="<?php echo base_url('assets/design/css/select2.min.css') ?>">
</head>

<body class="hold-transition skin-blue sidebar-mini" onload="zoom()">
<div class="wrapper">

  	<?php 
	    echo $navbar;
      echo $sidebar;
      echo $js;
	?>

<script src="<?php echo base_url('assets/plugins/toastr/toastr.min.js')?>"></script>
<script type="text/javascript" src="<?php echo base_url();?>assets/design/js/select2.full.min.js"></script>
    

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1><img src="<?= base_url(); ?>assets/dist/img/verification.svg" width="5%"> Verifikasi Request Jaminan Ke Centro
        <small></small>
      </h1>
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
          <div class="card card-info">
            <div class="card-header with-border">
              <h3 class="card-title"></h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body text-center">  
                <div class="row">
                      <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label style="padding-top: 6px;" class="control-label" for="main_search">Search</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="text" class="form-control form-control-sm" id="main_search" name="main_search">
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="main_kode_kantor">Kode Kantor</label>
                                  </div>
                                  <div class="col-sm-4">
                                      <select class="form-control form-control-sm select2" id="main_kode_kantor" name="main_kode_kantor" onchange='searchData()'>
                                      </select>
                                  </div>
                              </div>
                      </div>
                </div>
                   
            </div>            
          </div>
          <!-- /.card -->
          <!-- From card Bawah -->


        <!-- Data Tables -->
        <div class="card ">
                <div class="card-header">
                <h3 class="card-title"></h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <table id="table_request_jaminan" class="table table-striped table-bordered" style="width:100% text-align:center" >
                        <thead>
                            <tr>
                                <th>Nomor</th>
                                <th>Tanggal</th>
                                <th>Nama Kantor Asal</th>
                                <th>Nama Kantor Tujuan</th>
                                <th>Verifikasi</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="table_body_request_jaminan">
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <br>    
                    <div class="row">
                      <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                    <button type="button" class="btn btn-success btn-sm"  id="btn_refresh" onclick="getData()"><i class="fas fa-sync"></i> Refresh</button>
                                  </div>
                              </div>
                      </div>
                </div>
                </div>
                <!-- /.card-body -->
            </div>

            <!-- End Data Tables-->
            <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">
            <input type="hidden" class="form-control" id="user_kode_kantor" name="user_kode_kantor" value = "<?php echo $kode_kantor; ?>">
            <input type="hidden" class="form-control" id="user_divisi_id" name="user_divisi_id" value = "<?php echo $divisi_id; ?>">

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->



	<?php
        echo $ctrlbar;
        echo $footer;
        
	?>
<?php $this->view('ViewCustodian/js/request_jaminan_verifikasi_js.php'); ?>
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
 
</body>
</html>


