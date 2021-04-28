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


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1> <img src="<?= base_url(); ?>assets/dist/img/rekap_asuransi.svg" width="5%"> Polis Asuransi Jiwa
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


      <!-- From card Atas -->
          <!-- Horizontal Form -->
          <div class="card card-info">
            <div class="card-header with-border">
              <h3 class="card-title">FILTER</h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body text-center">  
                <div class="row">
                      <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="src_tgl_realisasi">Periode</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="month" class="form-control form-control-sm" id="src_periode" name="src_periode">
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="src_search">Search</label>
                                  </div>
                                  <div class="col-sm-3">
                                       <input type="text" class="form-control form-control-sm" id="src_search" name="src_search" placeholder="NO REKENING / NAMA NASABAH">
                                  </div>
                              </div>
                      </div>
                </div>
                   
            </div>            
          </div>
          <!-- /.card -->
          <!-- From card Atas -->
          
          <!-- Data Tables -->
          <div class="card card-danger">
                  <div class="card-header">
                    <h3 class="card-title">DATA POLIS ASURANSI JIWA</h3>
                    <div class="row">
                        <!--<div class="col-md-12 mx-auto">
                                    <div class="col-sm-2">
                                        <button type="button" class="btn btn-success btn-sm" style="width: 250px;" id="btn_export_report_polis_asuransi" data-toggle="modal" data-target="#modal_data_polis_asuransi"><i class="fas fa-file-export"></i> Export Report Cover Asuransi</button>
                                    </div>
                        </div>-->
                    </div>
                  </div>
                  <!-- /.card-header -->
                  <div class="card-body">
                      <div class="row">
                        <div class="col-md-12 mx-auto">
                                <div class="form-group row">
                                  <div class="col-sm-10">
                                  </div>
                                  <div class="col-sm-2">
                                      <button type="button" style="width: 150px;" class="btn btn-success btn-sm"  id="btn_refresh"><i class="fas fa-sync"></i> Refresh</button>
                                  </div>
                                </div>
                        </div>
                      </div>
                      <div class="table-responsive">
                          <table id="tbl_polis_asuransi_jiwa" class="table table-striped table-bordered" style="width:100% text-align:center" >
                              <thead style="text-align: center;" class="bg-danger">
                                  <tr>
                                      <th>No&nbsp;Polis</th>
                                      <th>Tgl&nbsp;Realisasi</th>
                                      <th>No&nbsp;Rekening</th>
                                      <th>Nama&nbsp;Nasabah</th>
                                      <th>Endorsement</th>
                                      <th>Nama&nbsp;Asuransi</th>
                                      <th>Action</th>
                                  </tr>
                              </thead>
                              <tbody id="tbl_body_polis_asuransi_jiwa">
                                  <tr>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                      <br>    
            
                  </div>
                  <!-- /.card-body -->
          </div>

          <div class="modal fade" id="modal_data_polis_asuransi">
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Data Asuransi</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                <div id="loading-1">
                  <img id="loading-image" style="index:999999;" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
                </div>
                
                <!-- card data nasabah start -->
                <div class="card card-info">
                  <div class="card-header collapsed" data-toggle="collapse" href="#collapse_1" role="button" aria-expanded="true" aria-controls="collapse_1">
                    DATA NASABAH
                  </div>
                  <div class="card-body collapse " id="collapse_1">
                          <div class="row">
                              <!-- form atas -->
                              <div class="col-md-12 mx-auto">
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label style="padding-top: 5px;" class="control-label" for="modal_nomor_rekening">Nomor Rekening</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_nomor_rekening" name="modal_nomor_rekening" disabled>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_nama_nasabah">Nama Nasabah</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_nama_nasabah" name="modal_nama_nasabah" disabled>
                                                  </div>
                                                  
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_tempat_lahir">Tempat Lahir</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_tempat_lahir" name="modal_tempat_lahir" disabled>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_tanggal_lahir">Tanggal Lahir</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="date" class="form-control form-control-sm" id="modal_tanggal_lahir" name="modal_tanggal_lahir" disabled>
                                                  </div>
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_telepon">Telepon</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_telepon" name="modal_telepon" disabled>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_alamat">Alamat</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                      <textarea style="height: 200px;" type="text" class="form-control" id="modal_alamat" name="modal_alamat" readonly></textarea>
                                                  </div>
                                  </div>
                              </div>
                          </div>
                  </div>
                </div>
                <!--card data nasabah end -->

                <!-- card data nasabah start -->
                <div class="card card-info">
                  <div class="card-header collapsed" data-toggle="collapse" href="#collapse_2" role="button" aria-expanded="true" aria-controls="collapse_2">
                    DATA KREDIT NASABAH
                  </div>
                  <div class="card-body collapse " id="collapse_2">
                          <div class="row">
                              <!-- form atas -->
                              <div class="col-md-12 mx-auto">
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label style="padding-top: 5px;" class="control-label" for="modal_tanggal_realisasi">Tanggal Realisasi</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="date" class="form-control form-control-sm" id="modal_tanggal_realisasi" name="modal_tanggal_realisasi" disabled>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_tgl_jt_tempo">Tanggal JT Tempo</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="date" class="form-control form-control-sm" id="modal_tgl_jt_tempo" name="modal_tgl_jt_tempo" disabled>
                                                  </div>
                                                  
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_pertanggungan">Pertanggungan</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_pertanggungan" name="modal_pertanggungan" disabled>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_plafon">Plafon</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_plafon" name="modal_plafon" disabled>
                                                  </div>
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_lama_cover_m">Lama Cover (M)</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                      <input type="number" class="form-control form-control-sm" id="modal_lama_cover_m" name="modal_lama_cover_m" disabled>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_rate">Rate</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_rate" name="modal_rate" disabled>
                                                  </div>
                                  </div>
                                  <div class="form-group row" id="file_uploads_jiwa">
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_no_polis">No Polis</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_no_polis" name="modal_no_polis">
                                                  </div>
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_status_endorsement">Status</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <div class="form-check">
                                                            <input type="checkbox" class="form-check-input" id="modal_status_endorsement">
                                                            <label class="form-check-label" for="modal_status_endorsement">Endorsement</label>
                                                        </div>
                                                  </div>
                                  </div>

                                  
                              </div>
                          </div>
                  </div>
                </div>
                <!--card data nasabah end -->
                  
                </div>
                <!-- /.modal-body -->
                <div class="modal-footer text-center" style="margin: 0 auto;">
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" id="btn_save_polis">Save changes</button>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div>
          <!-- /.modal -->



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
<?php $this->view('ViewAsuransi/js/polis_asuransi_jiwa_js.php'); ?>
<!-- <script src="<?php// echo base_url('assets/design/js/js_centro/js_asuransi/cover_asuransi.js')?>"></script> -->
<script src="<?php echo base_url('assets/dist/js/accounting.min.js')?>"></script>
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


