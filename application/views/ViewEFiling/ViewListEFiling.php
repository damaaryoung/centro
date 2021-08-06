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
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
  <link rel="stylesheet" href="<?php echo base_url('assets/design/css/select2.min.css') ?>">
  
  <link rel="stylesheet" href="<?php echo base_url('assets/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css')?>">
</head>
<style>
.kolektorClick:hover td{
  background-color:#dee2e6;
}

.update_assignClick:hover td{
  background-color:#dee2e6;
}
#loading-image{
    z-index: 99999;
}
td.details-control {
  background: url('../assets/dist/img/details_open.png') no-repeat center center;
  cursor: pointer;
}

tr.shown td.details-control {
  background: url('../assets/dist/img/details_close.png') no-repeat center center;
}


.select2-container .select2-selection--single {
    height: calc(2.25rem + 2px) !important;
}

/* .dataTables_scrollBody{
  position: unset !important;
  overflow: visible  !important;
  width: 100%;
} */
/*  
.table-responsive-disabled .dataTables_scrollBody {
    overflow: hidden !important;
} */

.btn-sm {
  width: 32px !important;
  height: 30px !important;
}
.btn-action {
  padding-left: 1px;
  padding-right: 1px;
}
table.dataTable.table-sm>thead>tr>th {
    padding-right: 98px;
}

</style>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">

  <?php 
	  echo $navbar;
	  echo $sidebar;
	?>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper" style="padding-left: 15px; padding-right: 15px;">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1><i class="fas fa-paste" style="color:#dc3545"></i> E Filling</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">E Filling</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
              <div id="loading" style = "position: fixed; top: 0; left: 10%;  width: 100%; height: 100%;">
                <img id="loading-image" style="index:999999;" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
              </div>
          <div class="col-12">
            <!-- Horizontal Form -->
                <div class="card card-info">
                  <div class="card-header with-border">
                    <h3 class="card-title">Filter</h3>
                  </div>
                  <!-- /.card-header -->
                  <div class="card-body text-center">  
                    <div class="row">
                      <div class="col-sm">
                          <div class="form-group row">
                            <label class="col col-form-label">Filter Area Kerja</label>
                            <div class="col">
                              <?php
                                if($kode_kantor == '00' || $divisi_id == 'IT'){
                              ?>
                                <select class="form-control select2 custom-select" id="kode_kantor" style="width: 200px;">
                                    <option value="all">ALL AREA</option>
                                    <?php foreach ($selectKodeKantor as $row) : ?>
                                    <option value="<?php echo $row['kode_kantor'];?>"><?php echo $row['kode_kantor'] .' - ' .$row['nama_kantor'];?></option>
                                    <?php endforeach;?>
                                </select>
                              <?php }else if($kode_kantor != '00' || $divisi_id != 'IT'){
                                echo '<input class="form-control" id="kode_kantor" style="width: 200px;" value="'.$kode_kantor.'" readonly>'; 
                              } ?>
                            </div>
                          </div>   
                      </div>
                      <div class="col-sm">
                          <div class="form-group row">
                            <label class="col col-form-label">Filter Release</label>
                            <div class="col">
                                <select class="form-control browser-default custom-select" id="filter_release"   style="width: 200px;">
                                  <option value="all">ALL DATA</option>
                                  <option value= "1">BAKI DEBET NOL DAN RELEASE</option>
                                </select>
                            </div>
                          </div>   
                      </div>
                      <div class="col-sm">
                          <div class="form-group row">
                            <label class="col col-form-label">Status Verifikasi  </label>
                            <div class="col">
                                <select class="form-control browser-default custom-select" id="status"   style="width: 200px;">
                                  <option value="all">ALL DATA</option>
                                  <option value= "WAITING">WAITING</option>
                                  <option value= "DONE">DONE</option>
                                  <option value= "NOT COOMPLETE">NOT COMPLETE</option>
                                  <option value= "REVISI">REVISI</option>
                                </select>
                            </div>
                          </div>   
                      </div>
                      <div class="col-sm">
                          <div class="form-group row">
                            <label class="col col-form-label"> Pencarian</label>
                            <div class="col">
                            <input type="search" class="form-control" name="search" id="search" placeholder="No.Rekening" aria-label="Search" style="width: 200px;" > 
                            </div>
                          </div>   
                      </div>
                    </div>
                  </div>            
                </div>
            <!-- /.card -->
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="box-body table-responsive no-padding">
                                  <table id="efilingTable1" class="table table-bordered table-hover table-sm" style="white-space: nowrap; width: 100%;">
                                    <thead style="font-size: 12px;" class="bg-danger">
                                      <tr>
                                        <th scope="col">No.Rekening</th>
                                        <th scope="col">Nasabah</th>
                                        <th scope="col">Area Kerja</th>
                                        <th scope="col">Tgl Realisasi</th>
                                        <th scope="col">Plafon</th>
                                        <th scope="col">Tenor</th>
                                        <th scope="col">Baki Debet</th>
                                        <th scope="col">Status Dokumen</th>
                                        <th scope="col">Upload User</th>
                                        <th scope="col">Verifikasi User</th>
                                        <th scope="col">Tgl Buat</th>
                                        <th scope="col">Tgl Update</th>
                                        <th scope="col">Tgl Verifikasi</th>
                                        <th scope="col">Status Verifikasi</th>
                                        <th scope="col">Action </th>
                                      </tr>
                                    </thead>
                                    <tbody style="font-size: 12px" id="list_dt">
                                    </tbody>
                                  </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">
            <input type="hidden" class="form-control" id="api_url" name="api_url" value = "<?php echo config_item('api_url'); ?>">
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

<!-- REQUIRED JS SCRIPTS -->

	<?php
    echo $footer;
    echo $ctrlbar;
    echo $Modaldetail_efiling;
    echo $Modalview_efiling;
    echo $Modalduplikat_efiling;
    echo $js;    
	?>
 
</body>
</html>

<script src="<?php echo base_url('assets/plugins/toastr/toastr.min.js')?>"></script>
<script src="<?php echo base_url('assets/plugins/sweetalert2/sweetalert2.min.js')?>"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/select2.full.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/bs-custom-file-input.min.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/js_efiling/list_efiling.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/js_efiling/action_efiling.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/js_efiling/edit_efiling.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/js_efiling/view_efiling.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/js_efiling/buildPagination.js"></script>

