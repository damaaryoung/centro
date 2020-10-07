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
                <h3 class="card-title"></h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
              
                <table id="employeeTable1" class="table table-striped table-bordered" style="width:100% text-align:center" >
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Nama</th>
                            <th>NIK</th>
                            <th>Jabatan</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                               $idx = 1;
                                  foreach ($UserData as $row) {
                                       $userId = $row['user_id'];
                                      // $namaDepan = $row['nama_depan'];
                                      // $namaBelakang = $row['nama_belakang'];

                                      echo "<tr>";
                                      echo "<td>".$row['user_id']."</td>";
                                      echo "<td>".$row['nama']."</td>";
                                      echo "<td>".$row['nik']."</td>";
                                      echo "<td>".$row['jabatan']."</td>";
                                      echo "<td>".$row['email']."</td>";        
                          ?>
                            <td>
                                  <div>
                                        <form method="post" action="<?php echo base_url("index.php/UserAccessController/infoUserAccess")?>">
                                            <button type="submit" class="btn btn-primary btn-sm"> <i class="fas fa-pen"></i></button>       
                                            <input type="hidden" name="userId" value="<?php echo $userId;?>">            
                                        </form>
                                  </div>
                            </td>
                            </tr>
                          <?php
                            }
                          ?>
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

 

<!-- REQUIRED JS SCRIPTS -->

	<?php
        echo $footer;
        echo $ctrlbar;
		echo $js;
	?>
 
</body>
</html>

<script>
        $(document).ready(function() {
            $('#employeeTable1').DataTable( {
                "scrollX": true,
                "autoWidth" : false,
                "aaSorting" : []
            } );
        } );
 </script>
