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
      <h1> <img src="<?= base_url(); ?>assets/dist/img/rekap_asuransi.svg" width="5%"> Rekap Titipan Asuransi <?php if($this->session->userdata('menu_rekap_asuransi') == '1'){ echo "Jaminan";}else { echo "Jiwa";}?>
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
                Filter
            </div>
            <!-- /.card-header -->
            <div class="card-body text-center">  
                <div class="row">
                      <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-md-1">
                                      <label style="padding-top: 5px;" class="control-label" for="src_tgl_realisasi">Tgl&nbsp;Realisasi</label>
                                  </div>
                                  <div class="col-md-2">
                                    <input type="date" class="form-control form-control-sm" id="src_tgl_realisasi" name="src_tgl_realisasi" onchange="search_tanggal()">
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="src_kantor_kas_cabang">Kode Kantor</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <select class="form-control form-control-sm select2 custom-select" id="src_kode_kantor" name="src_kode_kantor" onchange="search_tanggal()">
                                    </select>
                                  </div>
                                  <div class="col-md-1">
                                      <label style="padding-top: 5px;" class="control-label" for="src_search">Search</label>
                                  </div>
                                  <div class="col-md-3">
                                       <input type="text" class="form-control form-control-sm" id="src_search" name="src_search" placeholder="NO REKENING / NAMA NASABAH">
                                  </div>
                              </div>
                      </div>
                </div>
                   
            </div>            
          </div>

          <div class="card card-success">
            <div class="card-header with-border">
              Rekonsiliasi&nbsp;Saldo&nbsp;
            </div>
            
              <marquee class="py-3 recon_view" direction="left" onmouseover="this.stop()" onmouseout="this.start()" style=" color:#b02e2e" id="running_text1">
                  Saldo Buku Besar Hutang Asuransi Belum Balance
              </marquee>
            <!-- MENU FILTER -->
            <!-- /.card-header -->
            <div class="card-body">  
                      
                      <div id="load_recon">
                        <img style="width: 150px; height: 150px; text-align: center;" id="loading-image1" src="<?php echo base_url(); ?>assets/design/images/ajax-loader2.gif" alt="Loading..." />
                      </div>

                <div class="row recon_view">
                      <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-md-1">
                                      <label style="padding-top: 5px;" class="control-label" for="src_tgl_realisasi">Buku&nbsp;Besar</label>
                                  </div>
                                  <div class="col-md-3">
                                    <input type="text" class="form-control form-control-sm" id="saldo_buku_besar" name="saldo_buku_besar" readonly>
                                  </div>
                                  <div class="col-md-1">
                                      <label style="padding-top: 5px;" class="control-label" for="src_tgl_realisasi">Web Centro</label>
                                  </div>
                                  <div class="col-md-3">
                                    <input type="text" class="form-control form-control-sm" id="saldo_rekap_centro" name="saldo_rekap_centro" readonly>
                                  </div>
                                  <div class="col-md-1">
                                    <label style="padding-top: 5px;" class="control-label" for="src_tgl_realisasi">Selisih</label>
                                  </div>
                                  <div class="col-md-3">
                                       <input type="text" class="form-control form-control-sm" id="saldo_selisih" name="saldo_selisih" readonly>
                                  </div>
                              </div>
                      </div>
                </div>

            </div>            
          </div>
          <!-- /.card -->



        <!-- From card Bawah -->


        <!-- Data Tables -->
          <div class="card card-danger">
                  <div class="card-header">
                    <h3 class="card-title"></h3>
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
                          <table id="tbl_rekap_titipan_asuransi" class="table table-striped table-bordered" style="width:200% text-align:center" >
                              <thead style="text-align: center;" class="bg-danger">
                                  <tr>
                                      <th>Tgl&nbsp;Realisasi</th>
                                      <th>No&nbsp;Rekening</th>
                                      <th>Nama&nbsp;Nasabah</th>
                                      <th>Jaminan</th>
                                      <th>Nama&nbsp;Asuransi</th>
                                      <th>Titipan&nbsp;Asuransi</th>
                                      <th>Titipan&nbsp;Asuransi&nbsp;Tambahan</th>
                                      <th>Komisi&nbsp;Asuransi</th>
                                      <th>Premi&nbsp;Asuransi</th>
                                      <th>Sisa&nbsp;Titipan</th>
                                      <th>Pengembalian&nbsp;Asuransi</th>
                                      <th>Refund&nbsp;Asuransi</th>
                                      <th>Klaim&nbsp;Asuransi</th>
                                  </tr>
                              </thead>
                              <tbody id="tbl_body_rekap_titipan">
                              </tbody>
                          </table>
                      </div>
                      <br>    
                     
                  </div>
                  <!-- /.card-body -->
          </div>
        <!-- End Data Tables-->

          <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">
          <input type="hidden" class="form-control" id="user_kode_kantor" name="user_kode_kantor" value = "<?php echo $kode_kantor; ?>">

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->



	<?php
        echo $ctrlbar;
        echo $footer;
        
	?>
<?php $this->view('ViewAsuransi/js/rekap_titipan_asuransi_js.php'); ?>
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


