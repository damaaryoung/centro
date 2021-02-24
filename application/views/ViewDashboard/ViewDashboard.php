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
</head>
<body class="hold-transition sidebar-mini">
<div class="wrapper">

  <?php
    echo $navbar;
    echo $sidebar;
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
                     <img src="<?php echo base_url(); ?>assets/design/images/kmi_logo.png" 
                        id="imgCoverNotes" 
                        alt="Image Centro" 
                        style="width: 350px; height: 350px; text-align: center;">
                    </div>             
                </div> 
            </div>            
          </div>
          <!-- /.card -->
          <!-- END MENU FILTER -->

      




      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <?php
        echo $footer;
        echo $ctrlbar;
        echo $js;
  
  ?>


<!-- ./wrapper -->



</body>
</html>
