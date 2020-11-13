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
            <h1>BSS</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">BSS</li>
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
            <!-- Horizontal Form -->
          <div class="card card-info">
            <div class="card-header with-border">
              <h3 class="card-title">Filter</h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body text-center">  
            <div class="">
              <div class="row">
                <div class="col-sm">
                    <div class="form-group row">
                      <label class="col col-form-label">Status</label>
                      <div class="col">
                          <select class="form-control browser-default" id="status_select"  style="width: 200px;">
                            <option value="all">ALL DATA</option>
                            <option value= "0">NEW</option>
                            <option value= "1">IN TRANSIT</option>
                            <option value= "2">OPEN</option>
                            <option value= "3">ASSIGN</option>
                            <option value= "5">USED</option>
                            <option value= "6">LOST</option>
                            <option value= "7">BROKEN</option>
                            <option value= "8">EXCHANGE PIC</option>
                          </select>
                      </div>
                    </div>   
                </div>
                <div class="col-sm">
                    <div class="form-group row">
                      <label class="col col-form-label">Filter Area</label>
                      <div class="col">
                          <select class="form-control select2" id="area_kerja" name="area_kerja" style="width: 200px;">
                              
                          </select>
                      </div>
                    </div>   
                </div>
                <div class="col-sm">
                    <div class="form-group row">
                      <label class="col col-form-label"> Pencarian</label>
                      <div class="col">
                      <input type="text" class="form-control" name="search" id="search" placeholder="Nomor/Kolektor" > 
                      </div>
                    </div>   
                </div>
              </div>
            </div>
            </div>            
          </div>
          <!-- /.card -->

            <div class="card">
            <div class="card-header">
              <button class="btn btn-success btn-sm" data-toggle="modal" data-target="#exampleModalCenter"><i class="fas fa-share-square"></i> Send BSS </i></button> 
            </div>
            <!-- /.card-header -->
              <!-- /.card-header -->
              <div class="card-body">
              
               <div class= "col-12">
               <table id="employeeTable1" class="table table-striped table-bordered table-responsive" style="width:100% text-align:center" >
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nomor</th>
                            <th>Status</th>
                            <th>Area Kerja</th>
                            <th>Kolektor</th>
                            <th>No. Rekening</th>
                            <th>Nominal</th>
                            <th>Tanggal</th>
                            <th>PIC</th>
                            <th>Tanggal Buat</th>
                            <th>Last Update</th>
                        </tr>
                    </thead>
                    <tbody>
                      <?php
                            $idx = 1;
                            foreach ($getAll['list']  as $row) {
                                echo "<tr>";
                                echo "<td>".$idx."</td>";
                                echo "<td>".$row['kartu_number']."</td>";
                                echo "<td>".$row['status']."</td>";
                                echo "<td>".$row['area_kerja']['area'][0]['nama_kantor']."</td>";
                                echo "<td>".$row['nama_kolektor']."</td>";
                                echo "<td>".$row['no_rekening']."</td>";
                                echo "<td>".$row['nominal']."</td>";
                                echo "<td>".$row['tgl_bss']."</td>";
                                echo "<td>".$row['pic']."</td>";
                                echo "<td>".$row['timeline_tgl_buat']."</td>";
                                echo "<td>".$row['timeline_tgl_update']."</td>";
                      ?>
                            </tr>
                            
                      <?php $idx++;}  ?>
                    </tbody>
                </table>
               </div>

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

 <!-- Form Modal Send BSS -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle"><i class="fas fa-share-square"></i> Send BSS </i> Send BSS</h5>
      </div>
      <div class="modal-body">
      <form action="javascript:void(0)" onsubmit="submitingData();" method="POST">
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-4 col-form-label">Dari</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="kartu_number_awal" placeholder="No BSS Awal">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-4 col-form-label">Sampai</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="kartu_number_akhir" placeholder="No BSS Akhir">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-4 col-form-label">Ke Area Kerja</label>
          <div class="col-sm-8">
          <select class="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          </div>
        </div>
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Send BSS</button>
      </div>
      </form>
    </div>
  </div>
</div>

<!-- REQUIRED JS SCRIPTS -->

	<?php
        echo $footer;
        echo $ctrlbar;
		echo $js;
	?>
 
</body>
</html>

<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/js_bss/list_bss.js"></script>
