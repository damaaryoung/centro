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
<script type="text/javascript" src="<?php echo base_url(); ?>assets/plugins/bs-custom-file-input/bs-custom-file-input.min.js"></script>
<script type="text/javascript" src="<?php echo base_url();?>assets/design/js/select2.full.min.js"></script>


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1> <img src="<?= base_url(); ?>assets/dist/img/rekap_asuransi.svg" width="5%"> Rencana Realisasi
        <small></small>
      </h1>
      <ol class="breadcrumb">
     
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">
        <div id="loading">
          <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
        </div>

        <!-- From card Atas -->
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
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="src_kantor_kas_cabang">Kode Kantor</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <select class="form-control form-control-sm select2 custom-select" id="src_kode_kantor" name="src_kode_kantor" onchange="getData()">
                                    </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="src_tgl_laporan">Tgl Laporan</label>
                                  </div>
                                  <div class="col-sm-3">                                       
                                      <input type="date" class="form-control form-control-sm" id="src_tgl_laporan" name="src_tgl_laporan" style="width: 300px;"  onchange="getData()">
                                  </div>
                              </div>
                      </div>
                </div>
            </div>            
          </div>
          <!-- /.card -->

          <!-- Data Tables -->
          <div class="card card-danger">
                  <div class="card-header">
                    <h3 class="card-title"></h3>
                    <div class="row">
                                 
                    </div>
                  </div>
                  <!-- /.card-header -->
                  <div class="card-body">
                                <div class="row">
                                  <div class="col-md-12 mx-auto">
                                          <div class="form-group row">
                                              <div class="col-sm-5">
                                                  <button type="button" class="btn btn-success btn-sm" 
                                                          style="width: 250px;" id="btn_add_rencana">
                                                            <i class="fas fa-plus-circle"></i> Rencana Realisasi 
                                                  </button>
                                              </div>
                                              <div class="col-sm-5">
                                              </div>
                                              <div class="col-sm-2">
                                                  <button type="button" style="width: 150px;" class="btn btn-success btn-sm"  id="btn_refresh"><i class="fas fa-sync"></i> Refresh</button>
                                              </div>
                                          </div>
                                  </div>
                                </div>

                                <div class="table-responsive">
                                    <table id="tbl_rencana_realisasi" class="table table-striped table-bordered" style="width:100% text-align:center" >
                                        <thead style="text-align: center;" class="bg-danger">
                                            <tr>
                                                <th>Kode&nbsp;Kantor</th>
                                                <th>Jenis</th>
                                                <th>Tanggal&nbsp;Laporan</th>
                                                <th>Rencana</th>
                                                <th>Realisasi</th>
                                                <th>Rasio</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tbl_body_rencana_realisasi">
                                        </tbody>
                                    </table>
                                </div>
                                <br>    
                            </div>
                            <!-- /.card-body -->
                  <!-- /.card-body -->
          </div>

          
          <!-- INSERT -->

          <div class="modal fade" id="modal_rencana_realisasi"> 
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Rencana Realisasi</h4>
                  <button type="button" class="close" onclick="close_modal()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div id="loading-1">
                    <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
                  </div>
                </div>
                <div class="modal-body" style="height: 300px;">
                <div class="row" style="padding-top: 20px;">
                              <!-- form atas -->
                              <div class="col-md-12 mx-auto">
                                  <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_jenis">Jenis</label>
                                                </div>
                                                <div class="col-sm-4">
                                                    <select class="form-control form-control-sm select2 custom-select" 
                                                            id="modal_jenis" name="modal_jenis" style="width: 300px;">
                                                    </select>
                                                </div>
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_tgl_laporan">Tanggal Laporan</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <input type="date" class="form-control form-control-sm" id="modal_tgl_laporan" name="modal_tgl_laporan" style="width: 300px;">
                                                </div>  
                                               
                                  </div>
                                  <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label class="control-label" style="padding-top: 5px;"  for="modal_rencana">Rencana</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <input type="text" class="form-control form-control-sm" id="modal_rencana" name="modal_rencana">
                                                </div>
                                                <div class="col-sm-2">
                                                    <label class="control-label" style="padding-top: 5px;"  for="modal_realisasi">Realisasi</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <input type="text" class="form-control form-control-sm" id="modal_realisasi" name="modal_realisasi">
                                                </div>
                                  </div>
                                  <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label class="control-label" style="padding-top: 5px;"  for="modal_rasio">Rasio</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <input type="text" class="form-control form-control-sm" id="modal_rasio" name="modal_rasio">
                                                </div>
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_kode_kantor">Kode Kantor</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <select class="form-control form-control-sm select2 custom-select" 
                                                              id="modal_kode_kantor" name="modal_kode_kantor" style="width: 300px;">
                                                      </select>
                                                </div>    
                                                  
                                  </div>
                              </div>
                </div>

                </div>
                <!-- /.modal-body -->
                <div class="modal-footer text-center" style="margin: 0 auto;">
                  <button type="button" class="btn btn-danger" onclick="close_modal()">Close</button>
                  <button type="button" class="btn btn-primary" id="btn_simpan">Save changes</button>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div>

          <div class="modal fade" id="modal_rencana_realisasi_update"> 
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Update Rencana Realisasi</h4>
                  <button type="button" class="close" onclick="close_modal_update()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div id="loading-2">
                    <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
                  </div>
                </div>
                <div class="modal-body" style="height: 300px;">
                <div class="row" style="padding-top: 20px;">
                              <!-- form atas -->
                              <div class="col-md-12 mx-auto">
                                  <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_jenis_update">Jenis</label>
                                                </div>
                                                <div class="col-sm-4">
                                                    <select class="form-control form-control-sm select2 custom-select" 
                                                            id="modal_jenis_update" name="modal_jenis_update" style="width: 300px;">
                                                    </select>
                                                </div>
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_tgl_laporan_update">Tanggal Laporan</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <input type="date" class="form-control form-control-sm" id="modal_tgl_laporan_update" name="modal_tgl_laporan_update" style="width: 300px;">
                                                </div>  
                                               
                                  </div>
                                  <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label class="control-label" style="padding-top: 5px;"  for="modal_rencana_update">Rencana</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <input type="text" class="form-control form-control-sm" id="modal_rencana_update" name="modal_rencana_update">
                                                </div>
                                                <div class="col-sm-2">
                                                    <label class="control-label" style="padding-top: 5px;"  for="modal_realisasi_update">Realisasi</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <input type="text" class="form-control form-control-sm" id="modal_realisasi_update" name="modal_realisasi_update">
                                                </div>
                                  </div>
                                  <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label class="control-label" style="padding-top: 5px;"  for="modal_rasio_update">Rasio</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <input type="text" class="form-control form-control-sm" id="modal_rasio_update" name="modal_rasio_update">
                                                </div>
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_kode_kantor_update">Kode Kantor</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <select class="form-control form-control-sm select2 custom-select" 
                                                              id="modal_kode_kantor_update" name="modal_kode_kantor_update" style="width: 300px;">
                                                      </select>
                                                </div>    
                                                  
                                  </div>
                              </div>
                </div>

                </div>
                <!-- /.modal-body -->
                <div class="modal-footer text-center" style="margin: 0 auto;">
                  <button type="button" class="btn btn-danger" onclick="close_modal_update()">Close</button>
                  <button type="button" class="btn btn-primary" id="btn_simpan_update">Save changes</button>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div>

          
          
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
<script src="<?php echo base_url('assets/dist/js/accounting.min.js')?>"></script>
<?php $this->view('ViewAccounting/js/rencana_realisasi_js.php'); ?>
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




