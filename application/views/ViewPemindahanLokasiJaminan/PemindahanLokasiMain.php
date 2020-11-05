<!DOCTYPE html>
<!--
This is a starter template page. Use this page to start your new project from
scratch. This page gets rid of all links and provides the needed markup only.
-->
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>CENTRO | BPR Kredit Mandriri</title>
  <link rel="icon" type="image/jpeg" href="<?php echo base_url(); ?>assets/design/images/kmi_logo.png" />
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

  <title>AdminLTE 3 | Starter</title>
  <?php echo $css;?>
</head>
<body class="hold-transition sidebar-mini" style="min-height: 700px;" onload="zoom()">
<div class="wrapper">

  <?php
    echo $navbar;
    echo $sidebar;
  ?>

 

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark"><img src="<?= base_url(); ?>assets/dist/img/file.svg" width="10%"> Pemindahan Lokasi Jaminan</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Pemindahan Lokasi Jaminan</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
      <div class="container-fluid">
      <div id="loading">
                <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>
      <!-- From card Bawah -->
          <!-- Horizontal Form -->
          <div class="card card-info">
            <div class="card-header with-border">
              <h3 class="card-title">Filter</h3>
            </div>
            
            <!-- MENU FILTER -->
            <!-- /.card-header -->
            <div class="card-body text-center">   

               <div class="form-inline">
                    <div class="form-group">
                      <label for="search">Search</label> &nbsp; &nbsp;
                      <input type="text" class="form-control" name="search" id="search" placeholder="Search" onchange="serchDataJaminan()"> 
                     &nbsp;&nbsp;
                    </div>
                    <div class="form-group">
                      <label for="pwd">Kode Kantor</label> &nbsp;&nbsp;
                      <select class="form-control select2" id="kode_kantor" name="kode_kantor" style="width: 400px;" onchange="serchDataJaminan()">
                            <option value="<?php echo $this->session->userdata('kd_cabang'); ?>"><?php echo $this->session->userdata('kd_cabang'); ?></option>
                            <?php foreach ($selectKodeKantor as $row) : ?>
                              <option value="<?php echo $row['kode_kantor'];?>"><?php echo $row['kode_kantor'] .' - ' .$row['nama_kantor'];?></option>
                            <?php endforeach;?>
                      </select>&nbsp;&nbsp;
                    </div>                  
                </div> 
            </div>            
          </div>
          <!-- /.card -->
          <!-- END MENU FILTER -->

          <div class="card" style="min-height: 700px;">
            <div class="card-header">
              <form method="get" action="<?php echo base_url(); ?>index.php/PemindahanInsertController/index"> 
                  <button type="submit" class="btn btn-success btn-sm"> <i class="fa fa-plus"> Tambah </i></button> 
                  <!--<input type="hidden" name="idData" value="<?php //echo $idData; ?>">    -->        
               </form>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
                    <table id="tableLokasiJaminan" class="table table-striped table-bordered" style="width:100% text-align:center" >
                        <thead>
                            <tr>
                                <th>Nomor</th>
                                <th>Tanggal</th>
                                <th>Nama&nbsp;Kantor&nbsp;Asal</th>
                                <th>Nama&nbsp;Kantor&nbsp;Tujuan</th>
                                <th>Nama&nbsp;Lokasi&nbsp;Penyimpanan</th>
                                <th>Verifikasi</th>
                                <th style="width:200px;">Action</th>
                            </tr>
                        </thead>
                        <tbody id="bodyTableLokasiJaminan">
                     
                        </tbody>
                    </table>
            </div>
            <!-- /.card-body -->
          </div>  
          <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">

      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <?php
        echo $footer;
        echo $ctrlbar;
        echo $js;
  
  ?>
  <script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/pemindahan_dokumen.js"></script>


<!-- ./wrapper -->

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
        $(document).ready(function() {
            $('#tableLokasiJaminan').DataTable( {
                "scrollX": true,
                "autoWidth" : true,
                "searching": false,
                "aaSorting" : []
            } );
        } );

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
