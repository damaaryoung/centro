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
            <div class="">
              <div class="row">
                <div class="col-sm">
                    <div class="form-group row">
                      <label class="col col-form-label">Status</label>
                      <div class="col">
                          <select class="form-control browser-default custom-select" id="status"   style="width: 200px;">
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
                      <label class="col col-form-label"> Pencarian</label>
                      <div class="col">
                      <input type="text" class="form-control" name="search" id="search" placeholder="Nomor/Kolektor" style="width: 200px;" > 
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
              <?php if($divisi_id == 'GA' || $divisi_id == 'IT'){
                echo '<button class="btn btn-success btn-sm" data-toggle="modal" data-target="#form_send_bss"><i class="fas fa-share-square"></i> Send BSS </i></button> ';
              }?>
              <?php if($divisi_id == 'OPERASIONAL' || $divisi_id == 'IT'){
              echo '<button class="btn btn-success btn-sm" type="button" id="btn_send_pic"><i class="fas fa-share-square"></i> Send to PIC </i></button>';
              }?>   
              <button type="button" class="btn btn-info btn-sm"  id="btn_received_bss"><i class="fas fa-mail-bulk"></i> Received BSS </i><span class="badge badge-light" id="notify_received"><?php echo $notify[0]['total']; ?></span></button>
              <?php if($divisi_id == 'OPERASIONAL' || $divisi_id == 'IT'){
                echo '<button class="btn btn-secondary btn-sm" type="button" id="btn_send_migrasi"><i class="fas fa-exchange-alt"></i> Migrasi </i></button>';
              }?>  
            </div>
            
            <!-- /.card-header -->
              <!-- /.card-header -->
              <div class="card-body">
              
               <div class= "col-12">
               <table id="employeeTable1" class="table table-striped table-bordered" style="width:100% text-align:center" >
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
                    <tbody id="list_dt">
                      <?php
                            $idx = 1;
                            foreach ($getAll  as $row) {
                              $status = '';
                              if($row['status']='USED'){
                                  $status = '<span style="color:#00AE39;font-weight: bold;">'.$row['status'].'</span>';
                              }else{
                                  $status = $row['status'];
                              }
                                echo "<tr>";
                                echo "<td  class='details-click'>".$idx."</td>";
                                echo "<td class='kartu_number'>".$row['kartu_number']."</td>";
                                echo "<td>".$status."</td>";
                                echo "<td>".$row['nama_kantor']."</td>";
                                echo "<td>".$row['nama_kolektor']."</td>";
                                echo "<td>".$row['no_rekening']."</td>";
                                echo "<td>".$row['nominal']."</td>";
                                echo "<td>".$row['tgl_bss']."</td>";
                                echo "<td>".$row['nama_pic']."</td>";
                                echo "<td>".$row['timeline_tgl_buat']."</td>";
                                echo "<td>".$row['timeline_tgl_update']."</td>";
                      ?>
                            </tr>
                            
                      <?php $idx++;}  ?>
                    </tbody>
                </table>
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

 <!-- Form Modal Send BSS -->
<div class="modal fade" id="form_send_bss" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle"><i class="fas fa-share-square"></i> Send BSS </h5>
      </div>
      <div class="modal-body">
      <div id="loading-1">
        <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>
      <form>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Dari</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="kartu_number_awal" placeholder="No BSS Awal">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Sampai</label>
          <div class="col-sm-8">
            <input type="text" class="form-control" id="kartu_number_akhir" placeholder="No BSS Akhir">
          </div>
        </div>
        <div class="form-group row">
          <label  class="col-sm-4 col-form-label">Ke Area Kerja</label>
          <div class="col-sm-8">
          <select class="form-control " id="area_kerja">
            <?php foreach ($selectKodeKantor as $row) : ?>
              <option value="<?php echo $row['kode_kantor'];?>"><?php echo $row['kode_kantor'] .' - ' .$row['nama_kantor'];?></option>
            <?php endforeach;?>
          </select>
          </div>
        </div>
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id="send_bss_ga_to_area" class="btn btn-primary">Send BSS</button>
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
        echo $ModalReceivedBSS;
        echo $ModalMigrasiBSS;
        echo $ModalSendBSSPic;
	?>
 
</body>
</html>

<script src="<?php echo base_url('assets/plugins/toastr/toastr.min.js')?>"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/js_bss/list_bss.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/js_bss/received_bss.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/js_bss/migrasi_bss.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/app_assets_js_autocomplete-custom.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/js_bss/BsstoPic.js"></script>

