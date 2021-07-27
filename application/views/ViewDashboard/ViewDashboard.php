<!DOCTYPE html>
<!--
This is a starter template page. Use this page to start your new project from
scratch. This page gets rid of all links and provides the needed markup only.
-->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>CENTRO | BPR Kredit Mandiri</title>
  <link rel="icon" type="image/jpeg" href="<?php echo base_url(); ?>assets/design/images/kmi_logo.png" />
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

  <title>AdminLTE 3 | Starter</title>
  <?php echo $css;?>
  <link rel="stylesheet" href="<?php echo base_url('assets/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css')?>">
</head>
<body class="hold-transition sidebar-mini">
<div class="wrapper">

  <?php
    echo $navbar;
    echo $sidebar;
    echo $js;
  ?>

 

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Dashboard Page</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Starter Page</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">


      <div class="card card-info">
            <div class="card-header with-border">
              <h3 class="card-title">Selamat Datang Di Website Central Operation</h3>
            </div>
            
            <!-- MENU FILTER -->
            <!-- /.card-header -->
            <div class="card-body text-center">  

               <div>
                    <div class="form-group" style="">
                     <img src="<?php //echo base_url(); ?>assets/design/images/kmi_logo.png" 
                        id="imgCoverNotes" 
                        alt="Image Centro" 
                        style="width: 150px; height: 150px; text-align: center;">
                    </div>             
                </div> 


            </div>            
          </div>
          <!-- /.card -->
          <!-- END MENU FILTER -->


          <div class="row">

              <!-- left column -->
              <div class="col-md-6">
                <!-- general form elements -->
                <div class="card card-info">
                  <div class="card-header">
                    <h3 class="card-title">Rekonsiliasi Hutang Asuransi Jaminan</h3>
                  </div>
                  <!-- /.card-header -->
                  <!-- form start -->
                  
                  <div class="card-body">
                        <div class="row">
                              <div class="col-md-12 mx-auto">
                                      <div class="form-group row">
                                          <div class="col-md-12 text-center">
                                              <button type="button" id="tampil_jaminan" class="btn btn-success btn-sm" style="width: 250px; text-align:center;">Tampilkan Data </i></button> 
                                          </div>
                                        </div>
                              </div>
                        </div>
                        
                        <div class="row view_jaminan">
                              <div class="col-md-12 mx-auto">
                                      <div class="form-group row">
                                        <div class="col-md-5">
                                            <label style="padding-top: 5px;" class="control-label" for="src_tgl_realisasi_jaminan">Tgl&nbsp;Realisasi</label>
                                        </div>
                                        <div class="col-md-7">
                                          <input type="date" class="form-control form-control-sm" id="src_tgl_realisasi_jaminan" name="src_tgl_realisasi_jaminan" onchange="getData_jaminan()">
                                        </div>
                                      </div>
                              </div>
                        </div>
                       

                        <div id="load_jaminan">
                          <img id="loading-image1" src="<?php echo base_url(); ?>assets/design/images/ajax-loader3.gif" alt="Loading..." />
                        </div>
                        <div class="table-responsive tbl_recon_jaminan">
                            <table id="tbl_recon_jaminan" class="table table-striped table-bordered" style="width:100% text-align:center" >
                                <thead style="text-align: center;" class="bg-danger">
                                    <tr>
                                        <th>Kode&nbsp;Kantor</th>
                                        <th>Nama&nbsp;Kantor</th>
                                        <th>Buku Besar</th>
                                        <th>Web Centro</th>
                                        <th>Selisih</th>
                                    </tr>
                                </thead>
                                <tbody id="tbl_body_recon_jaminan">
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- /.card-body -->
                   
                    <div class="card-footer">
                      
                    </div>
                </div>
                <!-- /.card -->
            </div>




            <!-- right column -->
            <div class="col-md-6">
                <!-- Form Element sizes -->
                <div class="card card-success">
                  <div class="card-header">
                    <h3 class="card-title">Rekonsiliasi Hutang Asuransi Jiwa</h3>
                  </div>
                  <div class="card-body">
                      <div class="row">
                              <div class="col-md-12 mx-auto">
                                      <div class="form-group row">
                                          <div class="col-md-12 text-center">
                                              <button type="button" id="tampil_jiwa" class="btn btn-success btn-sm" style="width: 250px; text-align:center;">Tampilkan Data </i></button> 
                                          </div>
                                        </div>
                              </div>
                      </div>
                      <div class="row view_jiwa">
                              <div class="col-md-12 mx-auto">
                                      <div class="form-group row">
                                        <div class="col-md-5">
                                            <label style="padding-top: 5px;" class="control-label" for="src_tgl_realisasi_jiwa">Tgl&nbsp;Realisasi</label>
                                        </div>
                                        <div class="col-md-7">
                                          <input type="date" class="form-control form-control-sm" id="src_tgl_realisasi_jiwa" name="src_tgl_realisasi_jiwa" onchange="getData_jiwa()">
                                        </div>
                                      </div>
                              </div>
                        </div>
                        
                      <div id="load_jiwa">
                        <img id="loading-image1" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
                      </div>
                      
                      <div class="table-responsive tbl_recon_jiwa">
                          <table id="tbl_recon_jiwa" class="table table-striped table-bordered" style="width:100% text-align:center" >
                              <thead style="text-align: center;" class="bg-fuchsia">
                                  <tr>
                                      <th>Kode&nbsp;Kantor</th>
                                      <th>Nama&nbsp;Kantor</th>
                                      <th>Buku Besar</th>
                                      <th>Web Centro</th>
                                      <th>Selisih</th>
                                  </tr>
                              </thead>
                              <tbody id="tbl_body_recon_jiwa">
                              </tbody>
                          </table>
                      </div>
                  </div>
                  <!-- /.card-body -->
                  <div class="card-footer">
                      
                    </div>
                </div>
                <!-- /.card -->
              </div>
            </div>
           

      
          <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">



      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->


  <script src="<?php echo base_url('assets/plugins/sweetalert2/sweetalert2.min.js')?>"></script>
  <script src="<?php echo base_url('assets/dist/js/accounting.min.js')?>"></script>
  <?php $this->view('ViewDashboard/js/view_dashboard_js.php'); ?>
  <?php
        echo $footer;
        echo $ctrlbar;
  
  ?>


<!-- ./wrapper -->



</body>
</html>
