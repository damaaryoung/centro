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
      <h1> <img src="<?= base_url(); ?>assets/dist/img/rekap_asuransi.svg" width="5%"> Pengajuan Klaim Asuransi
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
                                      <label style="padding-top: 5px;" class="control-label" for="src_kantor_kas_cabang">Kantor Kas Cabang</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <select class="form-control form-control-sm select2 custom-select" id="src_kantor_kas_cabang" name="src_kantor_kas_cabang">
                                        
                                    </select>
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
          <div class="card card-danger card-outline card-outline-tabs">
            <div class="card-header p-0 border-bottom-0">
              <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                <li class="nav-item">
                  <a class="nav-link active" id="tab-klaim-asuransi-jaminan" data-toggle="pill" href="#body_tab_klaim_asuransi_jaminan" role="tab" aria-controls="body_tab_klaim_asuransi_jaminan" aria-selected="true">Asuransi Jaminan</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" id="tab-klaim-asuransi-jiwa" data-toggle="pill" href="#body_tab_klaim_asuransi_jiwa" role="tab" aria-controls="custom-tabs-four-profile" aria-selected="false">Asuransi Jiwa</a>
                </li>
              </ul>
            </div>
            <div class="card-body" style="min-height: 700px;">
              <div class="tab-content" id="custom-tabs-four-tabContent">
          
                <!-- KLAIM ASURANSI JAMINAN -->
                <div class="tab-pane fade show active" id="body_tab_klaim_asuransi_jaminan" role="tabpanel" aria-labelledby="tab-klaim-asuransi-jaminan">
                    <!-- Data Tables -->
                    <div class="card">
                            <div class="card-header">
                              <h3 class="card-title"></h3>
                              <div class="row">
                                  <div class="col-md-12 mx-auto">
                                              <div class="col-sm-2">
                                                  <button type="button" class="btn btn-success btn-sm" 
                                                          style="width: 250px;" id="btn_pengajuan_jaminan" 
                                                          data-toggle="modal" data-target="#modal_pengajuan_klaim_jaminan">
                                                            <i class="fas fa-plus-circle"></i> Pengajuan Klaim Asuransi Jaminan
                                                  </button>
                                              </div>
                                  </div>
                              </div>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table id="tbl_pengajuan_klaim_jaminan" class="table table-striped table-bordered" style="width:100% text-align:center" >
                                        <thead style="text-align: center;" class="bg-danger">
                                            <tr>
                                                <th>Tgl&nbsp;Realisasi</th>
                                                <th>No&nbsp;Rekening</th>
                                                <th>Nama</th>
                                                <th>Jabatan</th>
                                                <th>Jenis&nbsp;Klaim</th>
                                                <th>Status&nbsp;Klaim</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="table_body_pengajuan_klaim_jaminan">
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
                                                <button type="button" class="btn btn-success btn-sm"  id="btn_refresh_jaminan"><i class="fas fa-sync"></i> Refresh</button>
                                              </div>
                                          </div>
                                  </div>
                                </div>
                            </div>
                            <!-- /.card-body -->
                    </div>
                    <!-- END Data Tables -->
                </div>
                <!-- END KLAIM ASURANSI JAMINAN -->
                
                <!-- KLAIM ASURANSI JIWA -->
                <div class="tab-pane fade" id="body_tab_klaim_asuransi_jiwa" role="tabpanel" aria-labelledby="tab-klaim-asuransi-jiwa">
                  
                    <!-- Data Tables -->
                    <div class="card">
                            <div class="card-header">
                              <h3 class="card-title"></h3>
                              <div class="row">
                                  <div class="col-md-12 mx-auto">
                                              <div class="col-sm-2">
                                                  <button type="button" class="btn btn-success btn-sm" 
                                                          style="width: 250px;" id="btn_pengajuan_jiwa" 
                                                          data-toggle="modal" data-target="#modal_pengajuan_klaim_jiwa">
                                                            <i class="fas fa-plus-circle"></i> Pengajuan Klaim Asuransi Jiwa
                                                  </button>
                                              </div>
                                  </div>
                              </div>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table id="tbl_pengajuan_klaim_jiwa" class="table table-striped table-bordered" style="width:100% text-align:center" >
                                        <thead style="text-align: center;" class="bg-danger">
                                            <tr>
                                                <th>Tgl&nbsp;Realisasi</th>
                                                <th>No&nbsp;Rekening</th>
                                                <th>Nama</th>
                                                <th>Jabatan</th>
                                                <th>Jenis&nbsp;Klaim</th>
                                                <th>Status&nbsp;Klaim</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="table_body_pengajuan_klaim_jiwa">
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
                                                <button type="button" class="btn btn-success btn-sm"  id="btn_refresh_jiwa"><i class="fas fa-sync"></i> Refresh</button>
                                              </div>
                                          </div>
                                  </div>
                                </div>
                            </div>
                            <!-- /.card-body -->
                    </div>
                    <!-- END Data Tables -->
                  

                  
                </div>
                <!-- END KLAIM ASURANSI JIWA -->


              </div>
            </div>
          </div>

          <div class="modal fade" id="modal_pengajuan_klaim_jaminan">
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Pengajuan Klaim Asuransi Jaminan</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                <div class="row">
                              <!-- form atas -->
                              <div class="col-md-12 mx-auto">
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label style="padding-top: 5px;" class="control-label" for="modal_nama_asuransi_jaminan">Nama Asuransi</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_nama_asuransi_jaminan" name="modal_nama_asuransi_jaminan">
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_jenis_jaminan_jaminan">Jenis Jaminan</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_jenis_jaminan" name="modal_jenis_jaminan">
                                                  </div>
                                                  
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label style="padding-top: 5px;" class="control-label" for="modal_tanggal_realisasi_jaminan">Tanggal Realisasi</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="date" class="form-control form-control-sm" id="modal_tanggal_realisasi_jaminan" name="modal_tanggal_realisasi_jaminan">
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_jenis_jaminan">Kunci Pencarian</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_jenis_jaminan" name="modal_jenis_jaminan">
                                                  </div>
                                                  
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label style="padding-top: 5px;" class="control-label" for="modal_kantor_kas_jaminan">Kantor Kas Cabang</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <select class="form-control form-control-sm select2 custom-select" id="modal_kantor_kas_jaminan" name="modal_kantor_kas_jaminan" style="width: 300px">
                                        
                                                        </select>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_jenis_jaminan">Attachment</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                    <div class="form-group">
                                                      <!-- <label for="customFile">Custom File</label> -->

                                                      <div class="custom-file">
                                                        <input type="file" class="custom-file-input form-control form-control-sm" id="customFile">
                                                        <label class="custom-file-label" for="customFile">Choose file</label>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  
                                  </div>
                              </div>
                </div>





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
          <!-- /.modal jaminan -->

          <div class="modal fade" id="modal_pengajuan_klaim_jiwa">
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Pengajuan Klaim Asuransi Jiwa</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                <div class="row">
                              <!-- form atas -->
                              <div class="col-md-12 mx-auto">
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label style="padding-top: 5px;" class="control-label" for="modal_nama_asuransi_jiwa">Nama Asuransi</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_nama_asuransi_jiwa" name="modal_nama_asuransi_jiwa">
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_jenis_jaminan_jiwa">Jenis Jiwa</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_jenis_jiwa" name="modal_jenis_jiwa">
                                                  </div>
                                                  
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label style="padding-top: 5px;" class="control-label" for="modal_tanggal_realisasi_jiwa">Tanggal Realisasi</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="date" class="form-control form-control-sm" id="modal_tanggal_realisasi_jiwa" name="modal_tanggal_realisasi_jiwa">
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_jenis_jiwa">Kunci Pencarian</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_jenis_jiwa" name="modal_jenis_jiwa">
                                                  </div>
                                                  
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label style="padding-top: 5px;" class="control-label" for="modal_kantor_kas_jiwa">Kantor Kas Cabang</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <select class="form-control form-control-sm select2 custom-select" id="modal_kantor_kas_jiwa" name="modal_kantor_kas_jiwa" style="width: 300px">
                                        
                                                        </select>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_jenis_jiwa">Attachment</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                    <div class="form-group">
                                                      <!-- <label for="customFile">Custom File</label> -->

                                                      <div class="custom-file">
                                                        <input type="file" class="custom-file-input form-control form-control-sm" id="customFile">
                                                        <label class="custom-file-label" for="customFile">Choose file</label>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  
                                  </div>
                              </div>
                </div>





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
          <!-- /.modal jiwa-->
          
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




