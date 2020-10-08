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
      <h1>Verifikasi Aset Dokumen
        <small>Transaksi Aset Dokumen</small>
      </h1>
      <ol class="breadcrumb">
     
      </ol>
    </section>

    <!-- Main content -->
    <section class="content container-fluid">

    <div id="loading">
      <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
    </div>


      <!-- From card Bawah -->
          <!-- Horizontal Form -->
          <div class="card card-info">
            <div class="card-header with-border">
              <h3 class="card-title">Filter</h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body text-center">  

               <div class="form-inline">
                    <div class="form-group">
                      <label for="email">Search</label> &nbsp; &nbsp;
                      <input type="text" class="form-control" name="search" id="search" placeholder="Search" onchange="serchDataVerif()"> 
                     &nbsp;&nbsp;
                    </div>
                    <div class="form-group">
                      <label for="pwd">Kode Kantor</label> &nbsp;&nbsp;
                      <select class="form-control select2" id="kode_kantor" name="kode_kantor" style="width: 200px;"  onchange="serchDataVerif()">
                            <option value="<?php echo $this->session->userdata('kd_cabang'); ?>"><?php echo $this->session->userdata('kd_cabang'); ?></option>
                            <?php foreach ($selectKodeKantor as $row) : ?>
                              <option value="<?php echo $row['kode_kantor'];?>"><?php echo $row['kode_kantor'] .' - ' .$row['nama_kantor'];?></option>
                            <?php endforeach;?>
                      </select>&nbsp;&nbsp;
                    </div>   
                    <div class="form-group">
                      <label for="pwd">Status</label> &nbsp;&nbsp;
                      <select class="form-control select2" id="status" name="status" style="width: 200px;"  onchange="serchDataVerif()">
                              <option value="MASUK">MASUK</option>
                              <option value="KELUAR">KELUAR</option>
                              <option value="PINJAM">PINJAM</option>
                              <option value="WAITING">WAITING</option>
                              <option value="IN TRANSIT">IN TRANSIT</option>
                              <option value="KEMBALI">KEMBALI</option>
                      </select> &nbsp;&nbsp;
                    </div>               
                </div>
                   
            </div>            
          </div>
          <!-- /.card -->
          <!-- From card Bawah -->






   
    <!-- Data Tables -->
    <div class="card">
            <div class="card-header">
              <h3 class="card-title"></h3>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
            <table id="employeeTable" class="table table-striped table-bordered" style="width:100% text-align:center" >
                <thead>
                    <tr>
                        <th>Nomor</th>
                        <th>Tanggal</th>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>Jaminan</th>
                        <th>Status</th>
                        <th>Status&nbsp;Kontrak</th>
                        <th style="width:100px;">Action</th>
                    </tr>
                </thead>
                <tbody id="bodyTableVerif">
                <?php
                            $idx = 1;
                                foreach ($ListAssetVerifikasi as $row) :
                                    // $idData = $row['id_data'];
                                    $idx= 0;
                                    echo "<tr>";
                                    echo "<td>".$row['nomor']."</td>";
                                    echo "<td>".$row['tgl']."</td>";
                                    echo "<td>".$row['nama']."</td>";     
                                    echo "<td>".$row['alamat']."</td>";
                                    echo "<td>".$row['jenis_jaminan']."</td>";
                                    echo "<td>".$row['status']."</td>";
                                    echo "<td>".$row['kontrak_status']."</td>";
                                
                        ?>
                        <td>
                                <div>
                                        <button type="button" class="btn btn-success btn-sm btnVerifikasi" style ='padding-left: 5px;'
                                                data-nomor="<?= $row['nomor'] ?>"
                                                data-noref="<?= $row['no_reff'] ?>" 
                                                data-status="<?= $row['status'] ?>"
                                                data-id="<?= $row['id'] ?>"
                                                data-agunanid="<?= $row['agunan_id'] ?>"
                                                name="btnVerifikasi"> 
                                                <i style="padding-left: 5px;" class="fa fa-check"></i>
                                        </button>

                                    
                                </div>
                        </td>
                        </tr>
                        <?php
                            $idx++;
                            endforeach;
                        ?>
                </tbody>
            </table>
            </div>
            <!-- /.card-body -->
          </div>

          <!-- End Data Tables-->
        <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

 

<!-- REQUIRED JS SCRIPTS -->

	<?php
        echo $footer;
        echo $ctrlbar;
        echo $js;
        echo $VerifikasiMainModal;
        echo $VerifikasiModalSertifikat;
        echo $VerifikasieModalBPKB;
        echo $VerifikasiModalEmas;
	?>

<script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/verifikasi_aset_dokumen.js"></script>

<style>
              /* Style the tab */
              .tab {
                overflow: hidden;
                border: 1px solid #ccc;
                background-color: #f1f1f1;
              }

              /* Style the buttons inside the tab */
              .tab button {
                background-color: inherit;
                float: left;
                border: none;
                outline: none;
                cursor: pointer;
                padding: 14px 16px;
                transition: 0.3s;
                font-size: 17px;
              }

              /* Change background color of buttons on hover */
              .tab button:hover {
                background-color: #ddd;
              }

              /* Create an active/current tablink class */
              .tab button.active {
                background-color: #ccc;
              }

              /* Style the tab content */
              .tabcontent {
                display: none;
                padding: 6px 12px;
                border: 1px solid #ccc;
                border-top: none;
              }
              /* Important part */
              .modal-dialog{
                  overflow-y: initial !important
              }
              .modal-body{
                  height: 500px;
                  overflow-y: auto;
              }
</style>
<script>
         $(document).ready(function() {
            $('#employeeTable').DataTable( {
                "scrollX": true,
                "autoWidth" : true,
                "searching": false,
                "aaSorting" : []
            } );
        } );

        function openTab(evt, tabName) {
              var i, tabcontent, tablinks;
              tabcontent = document.getElementsByClassName("tabcontent");
              for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
              }
              tablinks = document.getElementsByClassName("tablinks");
              for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
              }
              document.getElementById(tabName).style.display = "block";
              evt.currentTarget.className += " active";
        }
 </script>
 
</body>
</html>






