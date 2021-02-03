<!DOCTYPE html>
<!--
This is a starter template page. Use this page to start your new project from
scratch. This page gets rid of all links and provides the needed markup only.
-->
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>CENTRO | BPR Kredit Mandriri</title>
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
      <h1> <img src="<?= base_url(); ?>assets/dist/img/rekap_asuransi.svg" width="5%"> Polis Asuransi Jaminan
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
              <h3 class="card-title"></h3>
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
                                    <input type="date" class="form-control form-control-sm" id="src_periode" name="src_periode">
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
          <div class="card">
                  <div class="card-header">
                    <h3 class="card-title"></h3>
                    <div class="row">
                        <div class="col-md-12 mx-auto">
                                    <div class="col-sm-2">
                                        <button type="button" class="btn btn-success btn-sm" style="width: 250px;" id="btn_export_report_polis_asuransi" data-toggle="modal" data-target="#modal_data_polis_asuransi"><i class="fas fa-file-export"></i> Export Report Cover Asuransi</button>
                                    </div>
                        </div>
                    </div>
                  </div>
                  <!-- /.card-header -->
                  <div class="card-body">
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
                              <tbody id="table_body_request_jaminan">
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
                      <div class="row">
                        <div class="col-md-12 mx-auto">
                                <div class="form-group row">
                                    <div class="col-sm-2">
                                      <button type="button" class="btn btn-success btn-sm"  id="btn_refresh"><i class="fas fa-sync"></i> Refresh</button>
                                    </div>
                                </div>
                        </div>
                      </div>
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
                <!-- <div id="loading-1">
                  <img id="loading-image" style="index:999999;" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
                </div> -->
                
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
                                                        <input type="text" class="form-control form-control-sm" id="modal_nomor_rekening" name="modal_nomor_rekening" readonly>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_nama_nasabah">Nama Nasabah</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_nama_nasabah" name="modal_nama_nasabah" readonly>
                                                  </div>
                                                  
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_tempat_lahir">Tempat Lahir</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_tempat_lahir" name="modal_tempat_lahir" readonly>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_tanggal_lahir">Tanggal Lahir</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="date" class="form-control form-control-sm" id="modal_tanggal_lahir" name="modal_tanggal_lahir" readonly>
                                                  </div>
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_telepon">Telepon</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_telepon" name="modal_telepon" readonly>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_alamat">Alamat</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                      <textarea style="height: 200px;" type="text" class="form-control" id="modal_alamat" name="modal_alamat" readonly></textarea>
                                                  </div>
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_nama_jaminan">Nama Jaminan</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_nama_jaminan" name="modal_nama_jaminan" readonly>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_alamat_jaminan">Alamat Jaminan</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                      <textarea style="height: 200px;" type="text" class="form-control" id="modal_alamat_jaminan" name="modal_alamat_jaminan" readonly></textarea>
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
                                                        <input type="date" class="form-control form-control-sm" id="modal_tanggal_realisasi" name="modal_tanggal_realisasi" readonly>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_tgl_jt_tempo">Tanggal JT Tempo</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="date" class="form-control form-control-sm" id="modal_tgl_jt_tempo" name="modal_tgl_jt_tempo" readonly>
                                                  </div>
                                                  
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_pertanggungan">Pertanggungan</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_pertanggungan" name="modal_pertanggungan" readonly>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_plafon">Plafon</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_plafon" name="modal_plafon" readonly>
                                                  </div>
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_lama_cover_m">Lama Cover (M)</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                      <input type="number" class="form-control form-control-sm" id="modal_lama_cover_m" name="modal_lama_cover_m" readonly>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_rate">Rate</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_rate" name="modal_rate" readonly>
                                                  </div>
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_premi">Premi</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_premi" name="modal_premi" readonly>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_no_polis">No Polis</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_no_polis" name="modal_no_polis" readonly>
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
                <div class="modal-footer justify-content-between">
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
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
 
</body>
</html>


