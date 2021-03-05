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

<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">

  	<?php 
	  echo $navbar;
	  echo $sidebar;
	?>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Data User Access</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Data User Access</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div id="loading">
                <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
              </div>
         

            <div class="card">
              <div class="card-header">
                <div class="input-group mb-3">
                  <input type="text" class="form-control cari-berdasarkan" id='search' placeholder="Cari user....">
                  <div class="input-group-append">
                    <span class="input-group-text" style="cursor:pointer" onclick="searchData()"><i class="fas fa-search" ></i></span>
                  </div>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
              
                <table id="employeeTable" class="table table-striped table-bordered" style="width:100% text-align:center" >
                    <thead>
                            <th>User ID</th>
                            <th>Nama</th>
                            <th>NIK</th>
                            <th>Jabatan</th>
                            <th>Email</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody id="tbUserAccess">
                      
                    </tbody>
                </table>

              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">

  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
              <div id="loading1">
                <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
              </div>

              <div class="row">
                        <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-4" style="text-align: left;">
                                      <label style="padding-top: 6px;" class="control-label" for="input_nama_grup_edit">Group Menu</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <select class="form-control select2" id="input_nama_grup_edit" name="input_nama_grup_edit">
                                      </select>
                                  </div>
                              </div>
                        </div>
              </div>

              <div  id="formUserAccess">
                <table id="tableAkses" class="table table-striped" style="width:100%; text-align:center; height: 500px;">
                    <thead>
                            <th>Menu</th>
                            <th>Akses</th>
                        </tr>
                    </thead>
                    <tbody id="body_tbl_access">
                  
                    </tbody>
                </table>
              </div>
              <input type="hidden" class="form-control" id="id_user_get" name="id_user_get">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="saveUserAccess()">Save changes</button>
      </div>
    </div>
  </div>
</div>


<!-- REQUIRED JS SCRIPTS -->

	<?php
        echo $footer;
        echo $ctrlbar;
		    echo $js;
	?>
  
<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/js_user_access/user_access.js"></script>
 
</body>
</html>
