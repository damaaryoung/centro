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

             <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title">User Info</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form class="form-horizontal">
                <div class="card-body">
                  <div class="form-group row">
                    <label for="" class="col-sm-2 col-form-label">Nama</label>
                     <div class="col-sm-9">
                     <input type="text" class="form-control" name="namaDepan" id="namaDepan" placeholder="Nama Depan" value='<?php echo $nama;?>' readonly>
                  </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">NIK</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" name="namaDepan" id="namaDepan" placeholder="Nama Depan" value='<?php echo $nik;?>' readonly>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" name="namaDepan" id="namaDepan" placeholder="Nama Depan" value='<?php echo $email;?>' readonly>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Jabatan</label>
                    <div class="col-sm-9">
                      <input type="text" class="form-control" name="namaDepan" id="namaDepan" placeholder="Nama Depan" value='<?php echo $jabatan;?>' readonly>
                    </div>
                  </div>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                 
                </div>
                <!-- /.card-footer -->
              </form>
            </div>
            <!-- /.card -->
             <div class="card">
              <div class="card-header">
                <h3 class="card-title">User Access</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <table id="employeeTable1" class="table table-striped table-bordered" style="width:100% text-align:center" >
              <thead>
                  <tr>
                      <th>Nama</th>
                      <th>Hak Akses</th>
                      <th>Tanggal Penambahan</th>
                      <th>User Penamabah</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
              <?php
                         $idx = 1;
                            foreach ($AksesData as $row) {
                                $user_access_id = $row['user_access_id'];
                                echo "<tr>";
                                echo "<td>".$row['NAMA']."</td>";
                                echo "<td>".$row['HAK_AKSES']."</td>";
                                echo "<td>".$row['TANGGAL']."</td>";
                                echo "<td>".$row['TAMBAH']."</td>";
                                  
                    ?>
                      <td>
                            <div>
                                  <form method="post" action="<?php echo base_url("index.php/UserAccessController/revokeAksesUser")?>">
                                      <button type="submit" class="btn btn-danger btn-sm"> <i class="fa fa-trash"></i></button>           
                                      <input type="hidden" name="user_access_id" value="<?php echo $user_access_id;?>">
                                      <input type="hidden" name="userId" id="userId" value="<?php echo $userId;?>"> 
                                  </form>
                            </div>
                      </td>
                      </tr>
 
                    <?php
                     //echo $delModal;
                      }
                      //endforeach;
                    ?>
              </tbody>
          </table>
              
             
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->

             <div class="card">
              <div class="card-header">
                <h3 class="card-title">Tambah User Access</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">

              <form class="form-horizontal"  method="post" action="<?php echo base_url("index.php/UserAccessController/addUserAccess")?>">
              <div class="box-body"> 
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Menu Access</label>
                    <div class="col-sm-9">
                      <select class="form-control select2" style="width: 50%;" id="access_id" name="access_id">
                            <option value="" selected disabled hidden>Silahkan Pilih</option>
                            <?php foreach ($MenuData as $row) : ?>
                              <option value="<?php echo $row['access_id'];?>"><?php echo  $row['menu_access_name'];?></option>
                            <?php endforeach;?>
                        </select>
                    </div>
                </div>
                <input type="hidden" name="userId" id="userId" value="<?php echo $userId;?>"> 

              </div>
              <!-- /.box-body -->
              <div class="card-footer text-center">
                <a href="<?php echo base_url(); ?>index.php/UserAccessController/index" type="button" style="margin:5px;" class="btn btn-danger">Kembali</a>
                <button type="submit" id='btnSubmit' style="margin:5px;" class="btn btn-info">Simpan</button>
              </div>
              <!-- /.box-footer -->
            </form>
              
             
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



	<?php
        echo $footer;
        echo $ctrlbar;
		echo $js;
	?>

  <script>
    $('#btnSubmit').prop('disabled', true);

    $(document).ready(function() {
            $('#employeeTable1').DataTable( {
                "scrollX": true,
                "autoWidth" : false,
                "aaSorting" : []
            } );
    } );

    $('#access_id').change(function(){   
      $('#btnSubmit').prop('disabled', false);
  });

  </script>
</body>
</html>