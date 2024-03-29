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
      <h1> <img src="<?= base_url(); ?>assets/dist/img/rekap_asuransi.svg" width="5%"> Proses Refund Asuransi Jaminan
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
                                    <select class="form-control form-control-sm select2 custom-select" id="src_kode_kantor" name="src_kode_kantor">
                                    </select>
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="src_search">Search</label>
                                  </div>
                                  <div class="col-sm-3">
                                       <input type="text" class="form-control form-control-sm" id="src_search" name="src_search" placeholder=" NO REKENING / NOMOR POLIS">
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
                                    <div class="col-sm-10">
                                      
                                    </div>
                                    <div class="col-sm-2">
                                      <button type="button" style="width: 150px;" class="btn btn-success btn-sm"  id="btn_refresh"><i class="fas fa-sync"></i> Refresh</button>
                                    </div>
                                </div>
                        </div>
                      </div>
                      <div class="table-responsive">
                          <table id="tbl_refund_jaminan" class="table table-striped table-bordered" style="width:100% text-align:center" >
                              <thead style="text-align: center;" class="bg-danger">
                                  <tr>
                                      <th>Tgl&nbsp;Realisasi</th>
                                      <th>No&nbsp;Rekening</th>
                                      <th>Nama</th>
                                      <th>Jaminan</th>
                                      <th>Jenis&nbsp;Refund</th>
                                      <th>Status&nbsp;Refund</th>
                                      <th>Action</th>
                                  </tr>
                              </thead>
                              <tbody id="tbl_body_refund_jaminan">
                              </tbody>
                          </table>
                      </div>
                      <br>    
                  
                  </div>
                  <!-- /.card-body -->
                  <!-- /.card-body -->
          </div>

          
          <!-- INSERT -->

          <div class="modal fade" id="modal_pengajuan_refund_jaminan"> 
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Proses Klaim Asuransi Jaminan</h4>
                  <button type="button" class="close" onclick="close_jaminan()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div id="loading-1">
                    <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
                  </div>
                </div>
                <div class="modal-body">
                    <div class="row" style="padding-top: 20px;">
                                  <!-- form atas -->
                                  <div class="col-md-12 mx-auto">
                                    <div class="form-group row">
                                                      <div class="col-sm-2">
                                                          <label style="padding-top: 5px;" class="control-label" for="modal_nama_asuransi_jaminan">Nomor Rekening</label>
                                                      </div>
                                                      <div class="col-sm-4">
                                                          <input type="text" class="form-control form-control-sm" id="modal_rek_jaminan" name="modal_rek_jaminan" readonly>
                                                      </div>
                                                      <div class="col-sm-2">
                                                          <label style="padding-top: 5px;" class="control-label" for="modal_tanggal_realisasi_jaminan">Nomor Polis</label>
                                                      </div>
                                                      <div class="col-sm-4">
                                                          <input type="text" class="form-control form-control-sm" id="modal_polis_jaminan" name="modal_polis_jaminan" readonly>
                                                          <input type="hidden" class="form-control form-control-sm" id="modal_jenis_asuransi_jaminan" name="modal_jenis_asuransi_jaminan" readonly>
                                                          <input type="hidden" class="form-control form-control-sm" id="modal_no_transaksi_jaminan" name="modal_no_transaksi_jaminan" readonly>
                                                      </div>
                                      </div>
                                      <div class="form-group row">
                                                      <div class="col-sm-2">
                                                          <label style="padding-top: 5px;" class="control-label" for="modal_nama_asuransi_jaminan">Nama Asuransi</label>
                                                      </div>
                                                      <div class="col-sm-4">
                                                            <input type="text" class="form-control form-control-sm" id="modal_nama_asuransi_jaminan" name="modal_nama_asuransi_jaminan" readonly>
                                                      </div>
                                                      <div class="col-sm-2">
                                                          <label style="padding-top: 5px;" class="control-label" for="modal_tanggal_realisasi_jaminan">Tanggal Realisasi</label>
                                                      </div>
                                                      <div class="col-sm-4">
                                                            <input type="date" class="form-control form-control-sm" id="modal_tanggal_realisasi_jaminan" name="modal_tanggal_realisasi_jaminan" readonly>
                                                      </div>
                                      </div>
                                      <div class="form-group row">
                                                      <div class="col-sm-2">
                                                          <label class="control-label" style="padding-top: 5px;"  for="modal_nama_nasabah_jaminan">Nama Nasabah</label>
                                                      </div>
                                                      <div class="col-sm-4">
                                                            <input type="text" class="form-control form-control-sm" id="modal_nama_nasabah_jaminan" name="modal_nama_nasabah_jaminan" readonly>
                                                      </div>
                                                      <div class="col-sm-2">
                                                          <label class="control-label" style="padding-top: 5px;"  for="modal_jenis_jaminan_jaminan">Jenis Jaminan</label>
                                                      </div>
                                                      <div class="col-sm-4">
                                                            <input type="text" class="form-control form-control-sm" id="modal_jenis_jaminan_jaminan" name="modal_jenis_jaminan_jaminan" readonly>
                                                      </div>
                                                      
                                      </div>
                                      <div class="form-group row">
                                                      <div class="col-sm-2">
                                                          <label class="control-label" style="padding-top: 5px;"  for="modal_nama_jaminan_jaminan">Atas Nama</label>
                                                      </div>
                                                      <div class="col-sm-4">
                                                            <input type="text" class="form-control form-control-sm" id="modal_nama_jaminan_jaminan" name="modal_nama_jaminan_jaminan" readonly>
                                                      </div>
                                                      <div class="col-sm-2">
                                                          <label class="control-label" style="padding-top: 5px;"  for="modal_alamat_jaminan_jaminan">Alamat Jaminan</label>
                                                      </div>
                                                      <div class="col-sm-4">
                                                            <textarea style="height: 150px;" type="text" class="form-control" id="modal_alamat_jaminan_jaminan" name="modal_alamat_jaminan_jaminan" readonly></textarea>
                                                      </div>
                                                      
                                      </div>
                                      <div class="form-group row">
                                                      <div class="col-sm-2">
                                                          <label class="control-label" style="padding-top: 5px;"  for="modal_pertanggungan_jaminan">Pertanggungan</label>
                                                      </div>
                                                      <div class="col-sm-4">
                                                            <input type="text" class="form-control form-control-sm" id="modal_pertanggungan_jaminan" name="modal_pertanggungan_jaminan" readonly>
                                                      </div>
                                                      <div class="col-sm-2">
                                                          <label class="control-label" style="padding-top: 5px;"  for="modal_premi_jaminan">Premi</label>
                                                      </div>
                                                      <div class="col-sm-4">
                                                            <input type="text" class="form-control form-control-sm" id="modal_premi_jaminan" name="modal_premi_jaminan" readonly>
                                                      </div>
                                                      
                                      </div>
                                      <div class="form-group row">
                                                      <div class="col-sm-2">
                                                          <label style="padding-top: 5px;" class="control-label" for="modal_kantor_jaminan">Kantor Cabang</label>
                                                      </div>
                                                      <div class="col-sm-4">
                                                            <input type="text" class="form-control form-control-sm" id="modal_kantor_jaminan" name="modal_kantor_jaminan" readonly>
                                                      </div>
                                                      <div class="col-sm-2">
                                                          <label style="padding-top: 5px;" class="control-label" for="modal_jenis_refund_jaminan">Jenis Refund</label>
                                                      </div>
                                                      <div class="col-sm-4">
                                                            <input type="text" class="form-control form-control-sm" id="modal_jenis_refund_jaminan" name="modal_jenis_refund_jaminan" readonly>
                                                      </div>
                                      </div>
                                      <div class="form-group row" id="file_uploads_update">
                                      </div>
                                  </div>
                    </div>
                </div>
                <!-- /.modal-body -->
                <div class="modal-footer text-center" style="margin: 0 auto;">
                  <button type="button" class="btn btn-danger" onclick="close_jaminan()">Close</button>
                  <button type="button" class="btn btn-primary" id="btn_simpan_modal_jaminan">Simpan</button>
                  <button type="button" class="btn btn-warning" id="btn_return_modal_jaminan">Return</button>
                  <button type="button" class="btn btn-success" id="btn_email_modal_jaminan">Kirim Email Ke INSCO</button>
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

  <div class="modal fade" id="modal_return">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Return Pengajuan Klaim</h4>
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
                        <label style="padding-top: 5px;" class="control-label" for="modal_nama_asuransi_jaminan">Keterangan Return</label>
                    </div>
                    
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                        <textarea style="height: 150px;" type="text" class="form-control" id="ket_return" name="ket_return"></textarea>
                    </div>
                </div>
            </div>
        </div>
        
        </div>
        <div class="modal-footer justify-content-between">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="save_return">Save changes</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->

  <div class="modal fade" id="modal_send_mail">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Masukan Penerima Email</h4>
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


  <div class="modal fade" id="modal_reject">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Reject Pengajuan Klaim</h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <div id="loading-2">
                    <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
           </div>
        </div>
        <div class="modal-body" style="height: 450px;">
          
          <div class="row" style="padding-top: 20px;">
            <!-- form atas -->
            <div class="col-md-12 mx-auto">
              <div class="form-group row">
                    <div class="col-sm-12">
                        <label style="padding-top: 5px;" class="control-label" for="ket_reject">Keterangan Reject</label>
                    </div>
                    
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                        <textarea style="height: 150px;" type="text" class="form-control" id="ket_reject" name="ket_reject"></textarea>
                    </div>
                </div>

                <div class="form-group row">
                            <div class="col-sm-2">
                                <label class="control-label" style="padding-top: 5px;"  for="modal_jenis_jaminan">Attachment</label>
                            </div>
                            <div class="col-sm-4">
                              <div class="form-group">
                                <div class="custom-file">
                                  <input type="file" class="custom-file-input form-control form-control-sm" id="modal_upload_reject">
                                  <label class="custom-file-label" for="customFile">Choose file</label>
                                </div>
                              </div>
                            </div>  
                            <div class="col-sm-4" style="padding-top: 5px;">
                                  <button type="button" class="btn btn-success btn-sm control-label" 
                                          style=" width: 150px;" id="btn_upload_reject">
                                            <i class="fas fa-upload"></i> UPLOAD
                                  </button>
                            </div>                                           
                </div>
             
                <div class="form-group row uplpads_list" id="file_uploads_reject">
                        <div class="col-sm-2">
                            <label style="padding-top: 5px;" class="control-label" for="modal_kantor_jaminan">File Attachment</label>
                        </div>
                    </div>  
        
                </div>

            </div>
        
        </div>
        <div class="modal-footer text-center" style="margin: 0 auto;">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" id="save_reject">Save changes</button>
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
<?php $this->view('ViewAsuransi/js/refund_jaminan_proses_js.php'); ?>
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




