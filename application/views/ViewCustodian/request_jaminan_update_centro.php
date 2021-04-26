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

  <link rel="stylesheet" href="<?php echo base_url('assets/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css')?>">
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
      <h1><img src="<?= base_url(); ?>assets/dist/img/request_pemindahan.svg" width="5%"> Update Request Jaminan Ke Centro
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
                                  <div class="col-sm-1"  style="text-align: left;">
                                      <label style="padding-top: 6px;" class="control-label" for="main_nomor">Nomor</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="text" class="form-control form-control-sm" id="main_nomor" name="main_nomor" readonly value="<?php echo $nomor;?>">
                                  </div>
                                  <div class="col-sm-1"  style="text-align: left;">
                                      <label style="padding-top: 5px;" class="control-label" for="main_tanggal">Tanggal</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="date" class="form-control form-control-sm" id="main_tanggal" name="main_tanggal" value="<?php echo $tgl;?>" readonly>
                                  </div>
                                  <div class="col-sm-2" style="text-align: left;">
                                      <label style="padding-top: 6px;" class="control-label" for="main_nomor">Verifikasi</label>
                                  </div>
                                  <div class="col-sm-2">
                                        <select class="form-control form-control-sm select2" id="mainVerifikasi" name="mainVerifikasi" disabled>
                                              <option value="<?php echo $verifikasi?>" selected ><?php echo $verifikasi?></option>
                                              <?php 
                                                if($verifikasi == '0'){
                                                  echo '<option value="1">1</option>';
                                                }
                                                else{
                                                  echo '<option value="0">0</option>';
                                                }
                                              ?>
                                        </select>
                                  </div>
                              </div>
                      </div>
                      <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-3" style="text-align: left;">
                                      <label style="padding-top: 5px;" class="control-label" for="kode_kantor_lokasi_jaminan">Kode Kantor Lokasi Jaminan</label>
                                  </div>
                                  <div class="col-sm-3">
                                  <select class="form-control form-control-sm select2" readonly disabled id="kode_kantor_lokasi_jaminan" name="kode_kantor_lokasi_jaminan">
                                        <option value="<?php echo $kode_kantor_lokasi_jaminan;?>" selected ><?php echo $kode_kantor_lokasi_jaminan;?></option>
                                        <?php foreach ($selectKodeKantor as $row) : ?>
                                        <option value="<?php echo $row['kode_kantor'];?>"><?php echo $row['kode_kantor'] .' - ' .$row['nama_kantor'];?></option>
                                        <?php endforeach;?>
                                  </select>
                                  </div>
                                  <div class="col-sm-2" style="text-align: left;">
                                      <label style="padding-top: 5px;" class="control-label" for="kode_custodian">Kode Custodian</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <select class="form-control form-control-sm select2" id="kode_custodian" name="kode_custodian">
                                        <option value="<?php echo $kode_custodian;?>" selected ><?php echo $kode_custodian;?></option>
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
                              <div class="col-sm-2" style="text-align: left;" >
                                    <label style="padding-top: 6px;" class="control-label" for="main_keperluan">Keperluan</label>
                              </div>
                              <div class="col-sm-4">
                                        <select class="form-control form-control-sm select2" id="main_keperluan" name="main_keperluan">
                                            <option value="<?php echo $keperluan;?>" selected ><?php echo $keperluan;?></option>
                                            <option value="Pelunasan Kontrak">Pelunasan Kontrak</option>
                                            <option value="Proses Litigasi">Proses Litigasi</option>
                                            <option value="Pemeriksaan Audit">Pemeriksaan Audit</option>
                                            <option value="Repeat Order Naik HT">Repeat Order Naik HT</option>
                                        </select>
                                  </div>
                            </div>
                        </div>
                        <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-3" style="text-align: left;">
                                    <label style="padding-top: 5px;" class="control-label" for="main_keterangan">PIC Peminjam</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="text" class="form-control form-control-sm" id="main_pic" name="main_pic" value="<?php echo $pic_request_pemindahan; ?>">
                                  </div>
                                  <div class="col-sm-2" style="text-align: left;">
                                      <label style="padding-top: 5px;" class="control-label" for="main_keterangan">Keterangan</label>
                                  </div>  
                                  <div class="col-sm-4">
                                        <textarea style="height: 75px;" type="text" 
                                            class="form-control" name="main_keterangan" 
                                            id="main_keterangan" placeholder="Keterangan...."><?php echo $ket;?></textarea>
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
                <h3 class="card-title">DATA REQUEST JAMINAN</h3>
                </div>
                <!-- /.card-header -->
                <div class="card-body">
                    <div class="row">
                      <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                 <div class="col-sm-1">
                                    <button type="button" class="btn btn-success btn-sm" style="width: 250px;" id="btn_tambah_jaminan_main">Tambah <i class="fas fa-plus-circle"></i></button>
                                  </div>
                              </div>
                      </div>
                    </div>
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
                </div>
                <!-- /.card-body -->
                <div class="card-footer text-center">
                    <button type="button" class="btn btn-danger"  id="btn_batal">Batal</button>
                    <button type="button" class="btn btn-primary" id="btn_simpan">Simpan</button>
                </div>
            </div>

            <!-- End Data Tables-->
            <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">                              
            <input type="hidden" class="form-control" id="getNomor" name="getNomor" value = "<?php echo $getNomor; ?>"> 

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
                          
                          <div class="input-group input-group-sm">
                            <input type="text" class="form-control" name="search" id="search" style="width: 200px;" placeholder="Search" onchange="serchDataJaminan()">
                              <span class="input-group-append">
                                <button type="button" class="btn btn-info btn-flat"  onclick="serchDataJaminan()">Cari!</button>
                              </span>
                            </div> 
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
                          <th style="width:100px;">Deskripsi&nbsp;Ringkas</th>
                          <th style="width:50px;">Nomor&nbsp;Rekening</th>
                          <th style="width:50px;">Kode&nbsp;Kantor</th>
                          <th style="width:50px;">Kode&nbsp;Kantor&nbsp;Lokasi</th>
                          <th style="width:50px;">Lokasi&nbsp;Penyimpanan</th>
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



  <?php $this->view('ViewCustodian/js/request_jaminan_update_js.php'); ?>

	<?php
        echo $ctrlbar;
        echo $footer;
        
	?>
<script src="<?php echo base_url('assets/plugins/sweetalert2/sweetalert2.min.js')?>"></script>
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


