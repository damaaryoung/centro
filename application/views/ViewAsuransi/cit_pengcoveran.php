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
      <h1> <img src="<?= base_url(); ?>assets/dist/img/rekap_asuransi.svg" width="5%"> Pengcoveran Asuransi CIT
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
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="src_search">Search</label>
                                  </div>
                                  <div class="col-sm-4">                                       
                                        <div class="input-group mb-3">
                                          <input type="text" class="form-control form-control-sm" id="src_search" name="src_search" placeholder="NO TRANSAKSI">
                                          <div class="input-group-append">
                                            <span class="input-group-text btn btn-sm" id="btn_search"><i class="fas fa-search"></i></span>
                                          </div>
                                        </div>
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
                                                          style="width: 250px;" id="btn_pengajuan">
                                                            <i class="fas fa-plus-circle"></i> Pengajuan Asuransi CIT
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
                                    <table id="tbl_cit" class="table table-striped table-bordered" style="width:100% text-align:center" >
                                        <thead style="text-align: center;" class="bg-danger">
                                            <tr>
                                                <th>No&nbsp;Transaksi</th>
                                                <th>Tgl&nbsp;Cover</th>
                                                <th>Nama&nbsp;Bank</th>
                                                <th>Nama&nbsp;Cabang</th>
                                                <th>Limit&nbsp;CIT Cabang</th>
                                                <th>Nominal&nbsp;Disetor</th>
                                                <th>Status&nbsp;</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tbl_body_cit">
                                        </tbody>
                                    </table>
                                </div>
                                <br>    
                            </div>
                            <!-- /.card-body -->
                  <!-- /.card-body -->
          </div>

          
          <!-- INSERT -->

          <div class="modal fade" id="modal_pengcoveran_cit"> 
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Pengajuan Asuransi Cash In Transit</h4>
                  <button type="button" class="close" onclick="close_modal()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div id="loading-1">
                    <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
                  </div>
                </div>
                <div class="modal-body" style="height: 350px;">
                <div class="row" style="padding-top: 20px;">
                              <!-- form atas -->
                              <div class="col-md-12 mx-auto">
                                  <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_tgl_cover">Tanggal Cover</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <input type="date" class="form-control form-control-sm" id="modal_tgl_cover" name="modal_tgl_cover" style="width: 300px;">
                                                </div>  
                                                <div class="col-sm-2">
                                                    <label class="control-label" style="padding-top: 5px;"  for="modal_limit_cit">Limit CIT Cabang</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <input type="text" class="form-control form-control-sm" id="modal_limit_cit" name="modal_limit_cit">
                                                </div>
                                  </div>
                                  <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_nama_bank">Nama Bank</label>
                                                </div>
                                                <div class="col-sm-4">
                                                    <input type="text" class="form-control form-control-sm" id="modal_nama_bank" name="modal_nama_bank">
                                                </div>
                                                <div class="col-sm-2">
                                                    <label class="control-label" style="padding-top: 5px;"  for="modal_nominal">Nominal Yang Disetor</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <input type="text" class="form-control form-control-sm" id="modal_nominal" name="modal_nominal">
                                                </div>
                                  </div>
                                  <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_nomor_rekening">Nomor Rekening</label>
                                                </div>
                                                <div class="col-sm-4">
                                                    <input type="text" class="form-control form-control-sm" id="modal_nomor_rekening" name="modal_nomor_rekening">
                                                </div>  
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_kantor_cabang">Kantor Cabang</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <select class="form-control form-control-sm select2 custom-select" 
                                                              id="modal_kantor_cabang" name="modal_kantor_cabang" style="width: 300px;">
                                                      </select>
                                                </div>                                            
                                                  
                                  </div>
                                  <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_alamat_bank">Alamat Bank</label>
                                                </div>
                                                <div class="col-sm-4">
                                                    <textarea style="height: 120px;" type="text" class="form-control" id="modal_alamat_bank" name="modal_alamat_bank"></textarea>
                                                </div>  
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="pic_penyetor">PIC Penyetor</label>
                                                </div>
                                                <div class="col-sm-4">
                                                    <input type="text" class="form-control form-control-sm" id="modal_pic_penyetor" name="modal_pic_penyetor">
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

          <!-- Update -->
          <div class="modal fade" id="modal_pengcoveran_cit_update"> 
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Update Pengajuan Asuransi Cash In Transit</h4>
                  <button type="button" class="close" onclick="close_modal_update()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div id="loading-2">
                    <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
                  </div>
                </div>
                <div class="modal-body" style="height: 400px;">
                <div class="row" style="padding-top: 20px;">
                              <!-- form atas -->
                              <div class="col-md-12 mx-auto">
                                  <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_tgl_cover_update">Tanggal Cover</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <input type="date" class="form-control form-control-sm" id="modal_tgl_cover_update" name="modal_tgl_cover_update" style="width: 300px;">
                                                </div>  
                                                <div class="col-sm-2">
                                                    <label class="control-label" style="padding-top: 5px;"  for="modal_limit_cit_update">Limit CIT Cabang</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <input type="text" class="form-control form-control-sm" id="modal_limit_cit_update" name="modal_limit_cit_update">
                                                </div>
                                  </div>
                                  <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_nama_bank_update">Nama Bank</label>
                                                </div>
                                                <div class="col-sm-4">
                                                    <input type="text" class="form-control form-control-sm" id="modal_nama_bank_update" name="modal_nama_bank_update">
                                                </div>
                                                <div class="col-sm-2">
                                                    <label class="control-label" style="padding-top: 5px;"  for="modal_nominal_update">Nominal Yang Disetor</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <input type="text" class="form-control form-control-sm" id="modal_nominal_update" name="modal_nominal_update">
                                                </div>
                                  </div>
                                  <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_nomor_rekening_update">Nomor Rekening</label>
                                                </div>
                                                <div class="col-sm-4">
                                                    <input type="text" class="form-control form-control-sm" id="modal_nomor_rekening_update" name="modal_nomor_rekening_update">
                                                </div>  
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_kantor_cabang_update">Kantor Cabang</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <select class="form-control form-control-sm select2 custom-select" 
                                                              id="modal_kantor_cabang_update" name="modal_kantor_cabang_update" style="width: 300px;">
                                                      </select>
                                                </div>                                            
                                                  
                                  </div>
                                  <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_alamat_bank_update">Alamat Bank</label>
                                                </div>
                                                <div class="col-sm-4">
                                                    <textarea style="height: 120px;" type="text" class="form-control" id="modal_alamat_bank_update" name="modal_alamat_bank_update"></textarea>
                                                </div>  
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="modal_pic_penyetor_update">PIC Penyetor</label>
                                                </div>
                                                <div class="col-sm-4">
                                                    <input type="text" class="form-control form-control-sm" id="modal_pic_penyetor_update" name="modal_pic_penyetor_update">
                                                </div>                                                    
                                  </div>
                                  <div class="form-group row">
                                                  <div class="col-sm-2">
                                                      <label class="control-label" style="padding-top: 5px;"  for="modal_upload_update">Attachment</label>
                                                  </div>
                                                  <div class="col-sm-4">
                                                    <div class="form-group">
                                                      <div class="custom-file">
                                                        <input type="file" class="custom-file-input form-control form-control-sm" id="modal_upload_update">
                                                        <label class="custom-file-label" for="customFile">Choose file</label>
                                                      </div>
                                                    </div>
                                                  </div>     
                                                  <div class="col-sm-4" style="padding-top: 5px;">
                                                        <button type="button" class="btn btn-success btn-sm control-label" 
                                                                style=" width: 150px;" id="btn_upload">
                                                                  <i class="fas fa-upload"></i> UPLOAD
                                                        </button>
                                                  </div>                                                       
                                  </div>
                                  <div class="form-group row" id="file_uploads_update">
                                  </div>
                              </div>
                              
                              <input type="hidden" class="form-control form-control-sm" id="id_update" name="id_update" readonly>
                              <input type="hidden" class="form-control form-control-sm" id="no_transaksi_update" name="no_transaksi_update" readonly>
                </div>

                </div>
                <!-- /.modal-body -->
                <div class="modal-footer text-center" style="margin: 0 auto;">
                  <button type="button" class="btn btn-danger" onclick="close_modal_update()">Close</button>
                  <button type="button" class="btn btn-primary" id="btn_simpan_update">Save changes</button>
                  <button type="button" class="btn btn-success" id="btn_email_modal">Kirim Email Cover CIT</button>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div>
          <!-- /.modal jaminan -->

          
          
        <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">
        <input type="hidden" class="form-control" id="user_kode_kantor" name="user_kode_kantor" value = "<?php echo $kode_kantor; ?>">
        <input type="hidden" class="form-control" id="user_divisi_id" name="user_divisi_id" value = "<?php echo $divisi_id; ?>">

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <div class="modal fade" id="modal_send_mail">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Masukan Penerima Email</h4>
          <div id="loading-3">
            <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
          </div>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" style="height: 300px;">
          
          <div class="row" style="padding-top: 20px;">
            <!-- form atas -->
            <div class="col-md-12 mx-auto">
              <div class="form-group row">
                    <div class="col-sm-12">
                        <label style="padding-top: 5px;" class="control-label" for="modal_email_penerima">Email Penerima</label>
                    </div>
                    <div class="col-sm-12">
                        <p>Pisahkan Dengan Tanda Koma (,) Jika Penerima Lebih Dari Satu !</p>
                    </div>
                    
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                        <textarea style="height: 150px;" type="text" class="form-control" id="modal_email_penerima" name="modal_email_penerima"></textarea>
                    </div>
                </div>
            </div>
        </div>
        
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="send_mail">Send Email</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->



	<?php
        echo $ctrlbar;
        echo $footer;
        
	?>
<script src="<?php echo base_url('assets/dist/js/accounting.min.js')?>"></script>
<?php $this->view('ViewAsuransi/js/cit_pengcoveran_js.php'); ?>
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




