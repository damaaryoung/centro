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

  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>

<body class="hold-transition skin-blue sidebar-mini" onload="zoom()">
<div class="wrapper">

  	<?php 
	  echo $navbar;
      echo $sidebar;
      echo $js;
	?>

<style type="text/css">
    td.details-control {
        background: url('./assets/dist/img/details_open.png') no-repeat center center;
        cursor: pointer;
    }

    tr.shown td.details-control {
        background: url('./assets/dist/img/details_close.png') no-repeat center center;
    }

    .card-primary.card-outline-tabs>.card-header a.active {
        border-top: 3px solid #d93444;
    }

    .nav-link {
        display: block;
        padding: 0.5rem 0.9rem;
    }

    .image-upload>input {
        display: none;
    }

    .image-upload img {
        width: 40px;
        cursor: pointer;
    }
    .modal-backdrop {
                width: 100% !important;
                height: 100% !important;
              }
</style>
<link href="<?php echo base_url('assets/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css') ?>" rel="stylesheet" type="text/css">
<script src="<?php echo base_url('assets/plugins/sweetalert2/sweetalert2.min.js') ?>"></script>
<div id="lihat_data_credit" class="content-wrapper" style="padding-left: 15px; padding-right: 15px;">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1><img src="<?= base_url(); ?>assets/dist/img/monitor.svg" width="10%"> Cek Sertifikat</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item active">Data Credit Checking</li>
                    </ol>
                </div>
            </div>
        </div>
    </section>
    <section  style="min-height: 700px;">
        <div class="row">
            <div class="col-12">
                <div class="callout callout-success">
                  <div class="row">
                    <div class="col-md">
                      <div class="form-group row">
                               
                          <div class="col-md-2">
                              <label style="padding-top: 5px;" class="control-label" for="main_kode_kantor" style="text-align: left;">Kode Kantor</label>
                          </div>
                          <div class="col-md-4">
                              <select class="form-control form-control-sm select2" id="main_kode_kantor" name="main_kode_kantor" onchange=''>
                              <?php foreach ($selectKodeKantor as $row) : ?>
                                  <option value="<?php echo $row['id'];?>"><?php echo $row['id'];?> - <?php echo $row['nama'];?> </option>
                              <?php endforeach;?>
                           
                              </select>
                          </div>
                      </div>
                      <div class="input-group mb-3">
                        <input type="text" class="form-control cari-berdasarkan" placeholder="Cari berdasarkan nomor so.....">
                        <div class="input-group-append">
                          <span class="input-group-text"><i class="fas fa-search"></i></span>
                        </div>
                        <div class="input-group-append">
                          <a type="button" onclick="view_modal_excell()" class="input-group-text btn-sm btn-success" target="_blank"> <i class="fas fa-file-export"></i> Export Excel  </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <div class="box-body no-padding table-responsive">
                            <div class="data"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<!-- modal started -->
<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-body" id="view-data"></div>
    </div>
  </div>
</div>
<!-- modal ended -->







	<?php
        echo $ctrlbar;
        echo $footer;
        
	?>

<script src="<?= base_url() ?>assets/plugins/jquery-validation/jquery.validate.min.js"></script>
<script src="<?= base_url() ?>assets/plugins/jquery-validation/additional-methods.min.js"></script>
<?php $this->view('master/cek_sertifikat/index_js.php'); ?>


 
</body>
</html>


