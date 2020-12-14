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
  <link rel="stylesheet" href="<?php echo base_url('assets/plugins/toastr/toastr.min.css')?>">
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
  
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
    background: url('https://datatables.net/examples/resources/details_open.png') no-repeat center center;
    cursor: alias;
}
tr.shown td.details-control {
    background: url('https://datatables.net/examples/resources/details_close.png') no-repeat center center;
}

td.details-click {
    background: url('https://datatables.net/examples/resources/details_open.png') no-repeat center center;
    cursor: alias;
}
tr.shown td.details-click {
    background: url('https://datatables.net/examples/resources/details_close.png') no-repeat center center;
}


</style>
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
            <h1><i class="fas fa-paste" style="color:#dc3545"></i> E Filing</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">E Filing</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <div class="row">
        <div id="loading">
                <img id="loading-image" style="index:999999;" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
              </div>
          <div class="col-12">
            <div class="card">
            
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
                        <select class="form-control select2 custom-select" id="kode_kantor" style="width: 200px;">
                            <option value="all">ALL AREA</option>
                            <?php foreach ($selectKodeKantor as $row) : ?>
                            <option value="<?php echo $row['kode_kantor'];?>"><?php echo $row['kode_kantor'] .' - ' .$row['nama_kantor'];?></option>
                            <?php endforeach;?>
                        </select>
                      </div>
                    </div>   
                </div>
                <div class="col-sm">
                    <div class="form-group row">
                      <label class="col col-form-label">Filter Release</label>
                      <div class="col">
                          <select class="form-control browser-default custom-select" id="status"   style="width: 200px;">
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
                            <option value= "0">WAITING</option>
                            <option value= "1">DONE</option>
                            <option value= "2">NOT COMPLETE</option>
                            <option value= "3">REVISI</option>
                          </select>
                      </div>
                    </div>   
                </div>
                <div class="col-sm">
                    <div class="form-group row">
                      <label class="col col-form-label"> Pencarian</label>
                      <div class="col">
                      <input type="search" class="form-control" name="search" id="search" placeholder="Nomor/Kolektor" aria-label="Search" style="width: 200px;" > 
                      </div>
                    </div>   
                </div>
              </div>
            </div>            
          </div>
          <!-- /.card -->

            <div class="card">
            <div class="card-header">
             
            </div>
            
            <!-- /.card-header -->
              <!-- /.card-header -->
              <div class="card-body">
              
               <div class= "col-12">
                <div class="table-responsive">
                        <table id="efilingTable1" class="table table-striped table-bordered" style="width:100% text-align:center" >
                            <thead style="text-align: center;">
                                <tr>
                                    <th>No Rekening </th>
                                    <th>Nasabah</th>
                                    <th>Area Kerja</th>
                                    <th>Tgl.Realiasi</th>
                                    <th>Plafon</th>
                                    <th>Tenor</th>
                                    <th>Baki Debet</th>
                                    <th>Status Dokumen</th>
                                    <th>Status Verifikasi</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody style="text-align: center;" id="list_dt">
                            <tr>
                                <td  style="width: 150px;">33-38-00050-20</td>
                                <td style="width: 180px;">INTIFADA AYU SULISTYA</td>
                                <td>SINDANG BARANG</td>
                                <td>07-10-2020</td>
                                <td>30,000,000</td>
                                <td>36</td>
                                <td>30,000,000</td>
                                <td></td>
                                <td>WAITING</td>
                                <td style="width: 180px;">
                                    <button type="button" class="btn btn-info btn-sm edit" title="Ubah Pengajuan" disabled="" data-target="#update" data="5113"><i class="fas fa-pencil-alt"></i></button>
                                    <button type="button" class="btn btn-warning btn-sm edit" title="Detail Pengajuan" onclick="click_detail()" data-target="#update" data="5113"><i style="color: #fff;" class="fas fa-eye"></i></button>
                                    <button type="button" disabled="" class="btn btn-warning btn-sm note" title="Note Pengajuan" style="background-color: #6610f2; border-color: #6f42c1;" data="5113"><i style="color: #fff;" class="fas fa-sticky-note"></i></button>
                                    <button type="button" disabled="" class="btn btn-default bg-gradient-danger btn-sm cancel" title="Cancel Pengajuan" data="5113"><i style="color: #fff;" class="fas fa-window-close"></i></button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
               </div>
               <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">
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

<!-- REQUIRED JS SCRIPTS -->

	<?php
        echo $footer;
        echo $ctrlbar;
        echo $js;
	?>
 
</body>
</html>

<script src="<?php echo base_url('assets/plugins/toastr/toastr.min.js')?>"></script>
