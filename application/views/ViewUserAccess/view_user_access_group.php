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
            <h1>Data User Access Group</h1>
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
                  <input type="text" class="form-control cari-berdasarkan" id='search' placeholder="Cari grup memu....">
                  <div class="input-group-append">
                    <span class="input-group-text" style="cursor:pointer" onclick="searchData()"><i class="fas fa-search" ></i></span>
                  </div>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <span>
                    <button type="button" class="btn btn-success btn-sm" id="btnTambah" style="width: 250px;"> <i class="fas fa-plus-circle"></i> Tambah </button>
                </span> <br> <br>
                <table id="employeeTable" class="table table-striped table-bordered" style="width:100% text-align:center" >
                    <thead>
                            <th>ID</th>
                            <th>Nama Group</th>
                            <th>Deskripsi</th>
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

    <!-- MODAL TAMBAH -->
    <div class="modal fade" id="modalGropMenu" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle1"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                    <div id="loading2">
                        <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
                    </div>
                    <div class="row">
                        <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-4" style="text-align: left;">
                                      <label style="padding-top: 6px;" class="control-label" for="input_nama_grup">Nama Group</label>
                                  </div>
                                  <div class="col-sm-8">
                                    <input type="text" class="form-control form-control-sm" id="input_nama_grup" name="input_nama_grup" placeholder="Nama Grup Menu">
                                  </div>
                              </div>
                              <div class="form-group row">
                                 <div class="col-sm-4" style="text-align: left;">
                                      <label style="padding-top: 6px;" class="control-label" for="input_deskripsi">Deskripsi</label>
                                  </div>
                                  <div class="col-sm-8">
                                        <textarea style="height: 75px;" type="text" 
                                            class="form-control" name="input_deskripsi" 
                                            id="input_deskripsi" placeholder="Deskripsi...."></textarea>
                                  </div>
                              </div>
                        </div>
                    </div>
                    
                    <div  id="formUserAccess1">
                        <table id="tableAkses1" class="table table-striped" style="width:100%; text-align:center; height: 500px;">
                            <thead>
                                    <th>Menu</th>
                                    <th>Akses</th>
                                </tr>
                            </thead>
                            <tbody id="body_tbl_access">
                        
                            </tbody>
                        </table>
                    </div>
                    <input type="hidden" class="form-control" id="id_header" name="id_header">

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="save_tambah_grup()">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    <!-- END MODAL TAMBAH -->

    <!-- MODAL EDIT -->
    <div class="modal fade" id="modalGropMenuEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitleEdit" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitleEdit"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                    <div id="loading3">
                        <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
                    </div>
                    <div class="row">
                        <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-4" style="text-align: left;">
                                      <label style="padding-top: 6px;" class="control-label" for="input_nama_grup_edit">Nama Group</label>
                                  </div>
                                  <div class="col-sm-8">
                                    <input type="text" class="form-control form-control-sm" id="input_nama_grup_edit" name="input_nama_grup_edit" placeholder="Nama Grup Menu">
                                  </div>
                              </div>
                              <div class="form-group row">
                                 <div class="col-sm-4" style="text-align: left;">
                                      <label style="padding-top: 6px;" class="control-label" for="input_deskripsi_edit">Deskripsi</label>
                                  </div>
                                  <div class="col-sm-8">
                                        <textarea style="height: 75px;" type="text" 
                                            class="form-control" name="input_deskripsi_edit" 
                                            id="input_deskripsi_edit" placeholder="Deskripsi...."></textarea>
                                  </div>
                              </div>
                        </div>
                    </div>
                    
                    <div  id="formUpdateGroupMenu">
                        <table id="tableAkses_edit" class="table table-striped" style="width:100%; text-align:center; height: 500px;">
                            <thead>
                                    <th>Menu</th>
                                    <th>Akses</th>
                                </tr>
                            </thead>
                            <tbody id="body_tbl_access_edit">
                        
                            </tbody>
                        </table>
                    </div>
                    <input type="hidden" class="form-control" id="id_header_edit" name="id_header_edit">

            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="update_group_menu()">Save changes</button>
            </div>
            </div>
        </div>
    </div>
    <!--END  MODAL EDIT -->

<!-- REQUIRED JS SCRIPTS -->

	<?php
        echo $footer;
        echo $ctrlbar;
		echo $js;
	?>
  
<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/js_user_access/user_access_group.js"></script>
 
</body>
</html>
