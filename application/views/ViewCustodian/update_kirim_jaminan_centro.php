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

    

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1><img src="<?= base_url(); ?>assets/dist/img/request_pemindahan.svg" width="5%"> Entry Transaksi Update Jaminan Ke Centro
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
                                      <label style="padding-top: 6px;" class="control-label" for="main_nomor">Nomor</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="text" class="form-control form-control-sm" id="main_nomor" name="main_nomor" readonly value="NEW">
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="main_tanggal">Tanggal</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="date" class="form-control form-control-sm" id="main_tanggal" name="main_tanggal" value="<?php echo $sysdate;?>" readonly>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="kode_custodian">Kode Custodian</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <select class="form-control form-control-sm select2" id="kode_cuustodian" name="kode_custodian">
                                        <option value="" selected disabled hidden>Silahkan Pilih</option>
                                        <?php foreach ($getCentro as $row) : ?>
                                          <option value="<?php echo $row['kode'];?>"><?php echo $row['kode'] .' - ' .$row['nama'];?></option>
                                        <?php endforeach;?>
                                        
                                    </select>
                                  </div>
                              </div>
                      </div>
                      <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-6">
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="main_keperluan">Aset Jaminan</label>
                                  </div>
                                  <div class="col-sm-4">
                                        <select class="form-control form-control-sm select2" id="main_keperluan" name="main_keperluan">
                                            <option value="BPKB">BPKB</option>
                                            <option value="SERTIFIKAT">SERTIFIKAT</option>
                                            <option value="COVER NOTE">COVER NOTE</option>
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
        <div class="card card-danger">
                <div class="card-header">
                <h3 class="card-title"></h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <table id="table_request_jaminan" class="table table-striped table-bordered" style="width:100% text-align:center" >
                        <thead>
                            <tr>
                                <th>No Reff</th>
                                <th>Agunan ID</th>
                                <th>Jenis</th>
                                <th>Deskripsi Jaminan</th>
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
                            </tr>
                        </tbody>
                    </table>
                    <br>    
                    <div class="row">
                      <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                    <button type="button" class="btn btn-success btn-sm"  id="btn_tambah_jaminan_main">Tambah <i class="fas fa-plus-circle"></i></button>
                                  </div>
                                  <div class="col-sm-5">
                                    
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="pic_peminjaman">PIC Peminjaman</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <textarea style="height: 75px;" type="text" 
                                            class="form-control" name="pic_peminjaman" 
                                            id="pic_peminjaman" placeholder="PIC Peminjaman...."></textarea>
                                  </div>
                              </div>
                      </div>
                </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer text-center">
                    <button type="button" class="btn btn-danger"  id="btn_batal">Batal</button>
                    <button type="button" class="btn btn-primary" id="btn_simpan">Simpan</button>
                </div>
            </div>

            <!-- End Data Tables-->
            <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

      
    <!-- Modal -->
    <div class="modal fade" id="modalJaminanDokumen" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLabel">Daftar Master Jaminan</h3>
            <button type="button" class="close" aria-label="Close" onclick="closeModalJaminanDokumen()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

        <!-- Data Tables -->
        <div class="card">
          <div class="form-inline" style="padding : 10px; float: right">
                        <div class="form-group">
                          <label for="email">Search</label> &nbsp; &nbsp;
                          <input type="text" class="form-control" name="search" id="search" placeholder="Search" onchange="serchDataJaminan()"> 
                            &nbsp;&nbsp;
                        </div>
          </div>
        <div id="loadingModalJaminan">
                  <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
          </div>
                <div class="card-body">
                <table id="TableModalJaminan" class="table table-striped table-bordered" style="width:100% text-align:center" >
                  <thead>
                      <tr>
                          <th style="width:50px;">Nomor&nbsp;Reff</th>
                          <th style="width:50px;">Agunan&nbsp;ID</th>
                          <th style="width:50px;">Deskripsi&nbsp;Ringkas</th>
                          <th style="width:50px;">Nomor&nbsp;Rekening</th>
                          <th style="width:50px;">Verifikasi</th>
                          <th style="width:50px;">Action</th>
                      </tr>
                  </thead>
                  <tbody id="bodyTableModalJaminan">

                  </tbody>
              </table>
                </div>
                <!-- /.card-body -->
              </div>

          </div>
          <div class="modal-footer text-center" style="margin: 0 auto;">
            <button type="button" class="btn btn-danger" onclick="closeModalJaminanDokumen()">Kembali</button>
          </div>
        </div>
      </div>
    </div>



  <?php $this->view('ViewCustodian/js/request_jaminan_centro_js.php'); ?>

	<?php
        echo $ctrlbar;
        echo $footer;
        
	?>

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


