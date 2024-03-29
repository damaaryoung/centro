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
<script type="text/javascript" src="<?php echo base_url(); ?>assets/plugins/bs-custom-file-input/bs-custom-file-input.min.js"></script>
<script type="text/javascript" src="<?php echo base_url();?>assets/design/js/select2.full.min.js"></script>


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1> <img src="<?= base_url(); ?>assets/dist/img/rekap_asuransi.svg" width="5%"> Cover Asuransi <?php if($this->session->userdata('menu_cover_asuransi') == '1'){ echo "Jaminan";}else { echo "Jiwa";}?>
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
                                    <input type="month" class="form-control form-control-sm" id="src_tgl_realisasi" name="src_tgl_realisasi" onchange="get_search_status()">
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="src_kantor_kas_cabang">Status</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <select class="form-control form-control-sm select2 custom-select" id="src_status" name="src_status" onchange="get_search_status()">
                                        <option value="">ALL STATUS</option>
                                        <option value="BELUM">BELUM</option>
                                        <option value="PROSES">PROSES</option>
                                        <option value="SUDAH">SUDAH</option>
                                    </select>
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="src_search">Search</label>
                                  </div>
                                  <div class="col-sm-2">
                                       <input type="text" class="form-control form-control-sm" id="src_search" name="src_search" placeholder="NO REKENING / NAMA NASABAH">
                                  </div>
                                  <div class="col-sm-2">
                                        <button type="button" class="btn btn-success btn-sm" style="width: 220px;" id="btn_export_report_cover_asuransi"><i class="fas fa-file-export"></i> Export ALL Report</button>
                                  </div>
                              </div>
                      </div>
                      <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="src_nama_asuansi">Asuransi</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <select class="form-control form-control-sm select2 custom-select" id="src_nama_asuansi" name="src_nama_asuansi" onchange="get_search_asuransi()">
                                      </select>
                                  </div>
                                  <div class="col-sm-2">
                                        <button type="button" class="btn btn-warning btn-sm" style="width: 220px;" id="btn_export_by_asuransi"><i class="fas fa-file-export"></i> Export By Asuransi</button>
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
                    <h3 class="card-title"></h3>
                    <!-- <div class="row">
                        <div class="col-md-12 mx-auto">
                                    <div class="col-sm-2">
                                        <button type="button" class="btn btn-success btn-sm" style="width: 250px;" id="btn_export_report_cover_asuransi" data-toggle="modal" data-target="#modal_data_asuransi"><i class="fas fa-file-export"></i> Export Report Cover Asuransi</button>
                                    </div>
                        </div>
                    </div> -->
                  </div>
                  <!-- /.card-header -->
                  <div class="card-body">
                      <div class="row">
                        <div class="col-md-12 mx-auto">
                                <div class="form-group row">
                                    <div class="col-sm-2">
                                          <button type="button" class="btn btn-primary btn-sm" style="width: 220px;" id="btn_export_selected"><i class="fas fa-file-export"></i> Export Selected Data</button>
                                    </div>
                                    <div class="col-sm-8">
                                    </div>
                                    <div class="col-sm-2">
                                      <button type="button" style="width: 150px;" class="btn btn-success btn-sm"  id="btn_refresh"><i class="fas fa-sync"></i> Refresh</button>
                                    </div>
                                </div>
                        </div>
                      </div>
                      <div class="table-responsive">
                          <table id="tbl_cover_asuransi" class="table table-striped table-bordered" style="width:200%" >
                              <thead style="text-align: center;" class="bg-danger">
                                  <tr>
                                      <th></th>
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
                                      <th>Cover&nbsp;Asuransi</th>
                                      <th>Action</th>
                                  </tr>
                              </thead>
                              <tbody id="tbl_body_cover_asuransi">
                              </tbody>
                          </table>
                      </div>
                  </div>
                  <!-- /.card-body -->
          </div>

          <div class="modal fade" id="modal_data_asuransi">
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
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_plafon">Plafon</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_plafon" name="modal_plafon" readonly>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_lama_cover">Lama Cover (M/Y)</label>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <input type="text" class="form-control form-control-sm" id="modal_lama_cover_m" name="modal_lama_cover_m" readonly>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <input type="text" class="form-control form-control-sm" id="modal_lama_cover_y" name="modal_lama_cover_y" readonly>
                                                  </div>
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_nilai_titipan">Nilai Titipan</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_nilai_titipan" name="modal_nilai_titipan" readonly>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_jaminan">Jaminan</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                      <input type="text" class="form-control form-control-sm" id="modal_jaminan" name="modal_jaminan" readonly>
                                                  </div>
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_atas_nama">Atas Nama</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_atas_nama" name="modal_atas_nama" readonly>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_alamat">Alamat</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                      <textarea style="height: 200px;" type="text" class="form-control" id="modal_alamat_kredit" name="modal_alamat_kredit" readonly></textarea>
                                                  </div>
                                  </div>
                              </div>
                          </div>
                  </div>
                </div>
                <!--card data nasabah end -->
                
                <?php if($this->session->userdata('menu_cover_asuransi') == '1'){?>
                <!-- card data nasabah start -->
                <div class="card card-info">
                  <div class="card-header collapsed" data-toggle="collapse" href="#collapse_3" role="button" aria-expanded="true" aria-controls="collapse_3">
                    PREMI ASURANSI
                  </div>
                  <div class="card-body collapse " id="collapse_3">
                          <div class="row">
                              <!-- form atas -->
                              <div class="col-md-12 mx-auto">
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label style="padding-top: 5px;" class="control-label" for="modal_inp_asuransi_jaminan">Asuransi</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_inp_asuransi_jaminan" name="modal_inp_asuransi_jaminan" readonly>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_data_okupasi_jaminan">Data Okupasi</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <select class="form-control form-control-sm select2 custom-select" id="modal_data_okupasi_jaminan" name="modal_data_okupasi_jaminan" style="width: 100%">
                                                
                                                        </select>
                                                  </div>
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_pertanggungan_jaminan">Pertanggungan</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_pertanggungan_jaminan" name="modal_pertanggungan_jaminan" disabled>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_premi_jaminan">Pembayaran Premi</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_premi_jaminan" name="modal_premi_jaminan" readonly>
                                                  </div>
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_premi_jaminan_request">Premi Request</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_premi_jaminan_request" name="modal_premi_jaminan_request">
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_rate_jaminan">Rate</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="number" class="form-control form-control-sm" id="modal_rate_jaminan" name="modal_rate_jaminan" >
                                                  </div>
                                  </div>
                              </div>
                          </div>
                  </div>
                </div>
                <!--card data nasabah end -->
                <?php } ?>
              
                <?php if($this->session->userdata('menu_cover_asuransi') == '2'){?>
                <!-- card data nasabah start -->
                <div class="card card-info">
                  <div class="card-header collapsed" data-toggle="collapse" href="#collapse_3" role="button" aria-expanded="true" aria-controls="collapse_3">
                    PREMI ASURANSI
                  </div>
                  <div class="card-body collapse " id="collapse_3">
                          <div class="row">
                              <!-- form atas -->
                              <div class="col-md-12 mx-auto">
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label style="padding-top: 5px;" class="control-label" for="modal_inp_asuransi_jiwa">Asuransi</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_inp_asuransi_jiwa" name="modal_inp_asuransi_jiwa" readonly>
                                                  </div>
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_berat_badan_jiwa">Berat Badan</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_berat_badan_jiwa" name="modal_berat_badan_jiwa" readonly>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_tinggi_badan_jiwa">Tinggi Badan</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_tinggi_badan_jiwa" name="modal_tinggi_badan_jiwa" readonly>
                                                  </div>
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_premi_jiwa">Pembayaran Premi</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_premi_jiwa" name="modal_premi_jiwa" readonly>
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_rate_jiwa">Rate</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="number" class="form-control form-control-sm" id="modal_rate_jiwa" name="modal_rate_jiwa" >
                                                  </div>
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_premi_jiwa_request">Premi Request</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                        <input type="text" class="form-control form-control-sm" id="modal_premi_jiwa_request" name="modal_premi_jiwa_request">
                                                  </div>
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_extra_premi_jiwa">Extra Premi</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                      <input type="checkbox" class="form-control form-control-sm" id="modal_extra_premi_jiwa" name="modal_extra_premi_jiwa">
                                                  </div>
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_upload_jiwa">Attachment</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                    <div class="form-group">
                                                      <div class="custom-file">
                                                        <input type="file" class="custom-file-input form-control form-control-sm" id="modal_upload_jiwa">
                                                        <label class="custom-file-label" for="customFile">Choose file</label>
                                                      </div>
                                                    </div>
                                                  </div>  
                                                  <div class="col-sm-4" style="padding-top: 5px;">
                                                        <button type="button" class="btn btn-success btn-sm control-label" 
                                                                style=" width: 150px;" id="btn_upload_jiwa">
                                                                  <i class="fas fa-upload"></i> UPLOAD
                                                        </button>
                                                  </div>                                                  
                                  </div>
                                  <div class="form-group row" id="file_uploads_jiwa">
                                  </div>
                              </div>
                          </div>
                  </div>
                </div>
                <!--card data nasabah end -->
                <?php } ?>

                  
                </div>
                <!-- /.modal-body -->
                <div class="modal-footer text-center" style="margin: 0 auto;">
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" id="btn_simpan_modal">Save changes</button>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div>
          <!-- /.modal -->



        <!-- End Data Tables-->
        <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">
        <input type="hidden" class="form-control" id="kode_kantor" name="kode_kantor" value = "<?php echo $kode_kantor; ?>">

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->



	<?php
        echo $ctrlbar;
        echo $footer;
        
	?>
<script src="<?php echo base_url('assets/dist/js/accounting.min.js')?>"></script>
<?php $this->view('ViewAsuransi/js/cover_asuransi_js.php'); ?>
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


