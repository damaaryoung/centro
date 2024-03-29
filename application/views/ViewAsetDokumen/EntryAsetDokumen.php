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
  <link rel="stylesheet" href="<?php echo base_url('assets/design/css/select2.min.css') ?>">
  <link rel="stylesheet" href="<?php echo base_url('assets/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css')?>">
</head>

<body class="hold-transition skin-blue sidebar-mini" onload="zoom()">
<div class="wrapper">

  	<?php 
	  echo $navbar;
	  echo $sidebar;
	?>



  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        
        <?php  if( $this->session->userdata('menuAset') == '1'){ 
            echo  '<h1> <img src="'. base_url() .'assets/dist/img/monitor.svg" width="5%">
                    Entry Aset Dokumen
                    <small>Transaksi Aset Dokumen</small>
                  </h1>';
         } else{
            echo  '<h1> <img src="'. base_url() .'assets/dist/img/monitor.svg" width="5%">
                    View Asset Dokumen
                    <small>Transaksi Aset Dokumen</small>
                  </h1>';
         }?>

      <ol class="breadcrumb">
      
      </ol>
    </section>
    <section class="content container-fluid" style="min-height: 700px;">
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
                      <input type="text" class="form-control form-control-sm" name="search" id="search" placeholder="Search" > 
                     &nbsp;&nbsp;
                    </div>
                    <div class="form-group">
                      <label for="pwd">Kode Kantor</label> &nbsp;&nbsp;
                      <select class="form-control form-control-sm select2 custom-select" id="kode_kantor" name="kode_kantor" style="width: 200px;">
                      </select>
                      &nbsp;&nbsp;
                    </div>   
                    <div class="form-group">
                      <label for="pwd">Status</label> &nbsp;&nbsp;
                      <select class="form-control form-control-sm select2 custom-select" id="status" name="status" style="width: 200px;"  onchange="serchAsetDokumenB()">
                              <option value="MASUK">MASUK</option>
                              <option value="KELUAR">KELUAR</option>
                              <option value="PINJAM">PINJAM</option>
                              <option value="WAITING">WAITING</option>
                              <option value="IN TRANSIT">IN TRANSIT</option>
                      </select> &nbsp;&nbsp;
                    </div>   
                    <div class="form-group">
                      <label for="pwd">Jenis</label> &nbsp;&nbsp;
                      <select class="form-control form-control-sm select2 custom-select" id="jenis" name="jenis" style="width: 200px;"  onchange="serchAsetDokumenB()">
                              <option value="SERTIFIKAT">SERTIFIKAT</option>
                              <option value="BPKB">BPKB</option>
                              <!-- <option value="EMAS">EMAS</option> -->
                      </select> &nbsp;&nbsp;
                    </div>                 
                </div>
                   
            </div>            
          </div>
          <!-- /.card -->
          <!-- From card Bawah -->

          <div class="card">
            <div class="card-header">
                <?php  if( $this->session->userdata('menuAset') == '1'){ ?>
                  <form method="get" action="<?php echo base_url(); ?>AsetDokumenEntryController/displayTambahAsetDokumen"> 
                      <button type="submit" class="btn btn-success btn-sm" style="width: 250px;"> <i class="fas fa-plus-circle"></i> Tambah </i></button> 
                  </form>
                <?php }?>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
            <div class="px-2 bg-light">
              <marquee class="py-3" direction="left" onmouseover="this.stop()" onmouseout="this.start()" style=" color:#ff0018">
                  Scroll ke Kanan Untuk Tombol Aksi
              </marquee>
            </div>
            <table id="employeeTable" class="table table-striped table-bordered" style="width:120%" >
              <thead>
                  <tr style="text-align:center">
                      <th>Nomor</th>
                      <th>Agunan_ID</th>
                      <th>Tanggal</th>
                      <th>Nama</th>
                      <th>Alamat</th>
                      <th>Jaminan</th>
                      <th>Status</th>
                      <th>Deskripsi</th>
                      <th>Lokasi</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody id="bodyTableAsetDokumen">

              </tbody>
          </table>
            </div>
            <!-- /.card-body -->
          </div>  
          </div> 
          <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">
          <input type="hidden" class="form-control" id="menuAsset" name="menuAsset" value = "<?php echo $this->session->userdata('menuAset'); ?>">
          <input type="hidden" class="form-control" id="user_kode_kantor" name="user_kode_kantor" value = "<?php echo $kode_kantor; ?>">
          <input type="hidden" class="form-control" id="user_divisi_id" name="user_divisi_id" value = "<?php echo $divisi_id; ?>">
    </section>

	<?php
        echo $updateModalMain;
        echo $updateModalSertifikat;
        echo $updateModalBPKB;
        echo $updateModalEmas;
        echo $PeminjamanMainModal;
        echo $PeminjamanSertifikatModal;
        echo $PeminjamanBPKBModal;
        echo $PeminjamanEmasModal;
        echo $MainModalKembali;
        echo $KembaliSertifikatModal;
        echo $KembaliBPKBModal;
        echo $KembaliEmasModal;
        echo $PenyerahanMainModal;
        echo $PenyerahanSertifikatModal;
        echo $PenyerahanBPKBModal;
        echo $PenyerahanEmasModal;
        echo $DueDateMainModal;
        echo $ctrlbar;
        echo $js;
        echo $footer;
        
	?>
  <script type="text/javascript" src="<?php echo base_url();?>assets/design/js/select2.full.min.js"></script>
  <script src="<?php echo base_url('assets/plugins/sweetalert2/sweetalert2.min.js')?>"></script>
  <script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/entry_aset_dokumen.js"></script>
  

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
              .modal-backdrop {
                width: 100% !important;
                height: 100% !important;
              }
  </style>

  <script>
        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })
        

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


