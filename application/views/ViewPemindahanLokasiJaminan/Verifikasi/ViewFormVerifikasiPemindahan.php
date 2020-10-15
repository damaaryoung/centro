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
<body class="hold-transition sidebar-mini">
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
            <h1 class="m-0 text-dark">Verifikasi Pemindahan Lokasi Jaminan</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Starter Page</li>
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

      <!-- Form ATAS -->
      <div class="card card-info">
            <div class="card-header with-border">
              <h3 class="card-title">Verifikasi Data Aset Dokumen</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->
              <div class="container py-5" style="font-size: 12px;">
                  <div class="row">
                      <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label style="padding-top: 6px;" class="control-label" for="mainNomor">Verifikasi</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <select class="form-control form-control-sm select2" id="mainVerifikasi" name="mainVerifikasi">
                                        <option value="<?php echo $verifikasi?>" selected ><?php echo $verifikasi?></option>
                                        <?php 
                                          if($verifikasi == '0'){
                                            echo '<option value="1">1</option>';
                                          }
                                          else{
                                            echo '<option value="0">0</option>';
                                          }
                                        ?>
                                  </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label style="padding-top: 6px;" class="control-label" for="mainNomor">Nomor</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="text" class="form-control form-control-sm" id="mainNomor" name="mainNomor" readonly value="<?php echo $nomor?>">
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggalRealisasi">Tanggal</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="date" class="form-control form-control-sm" id="mainTanggal" name="mainTanggal" value="<?php echo $tgl?>" readonly>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggalRealisasi">Kode Kantor Tujuan</label>
                                  </div>   
                                  <div class="col-sm-3">   
                                  <select class="form-control form-control-sm select2" id="kode_kantor_tujuan" name="kode_kantor_tujuan" readonly>
                                        <option value="<?php echo $kode_kantor_tujuan?>" selected ><?php echo $kode_kantor_tujuan?></option>
                                        <?php foreach ($selectKodeKantor as $row) : ?>
                                        <option value="<?php echo $row['kode_kantor'];?>"><?php echo $row['kode_kantor'] .' - ' .$row['nama_kantor'];?></option>
                                        <?php endforeach;?>
                                  </select>
                                  </div>
                              </div>
                          <!-- Form ATAS -->

                          <div id="BPKB" class="tabcontent">
                            <table id="tablePemindahanVerifikasiMain" class="table table-striped table-bordered display" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>No.&nbsp;Reff</th>
                                            <th>Agunan&nbsp;ID</th>
                                            <th>Jenis</th>
                                            <th style="width: 500px;">Deskripsi&nbsp;Jaminan</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody  id="bodytablePemindahanVerifikasiMain">
                                            <td></td> 
                                            <td></td> 
                                            <td></td> 
                                            <td></td> 
                                            <td></td> 
                                    </tbody>
                            </table>
                      </div>

                      
                      <div class="form-group row">
                                  <div class="col-sm-2">
                                    <button type="button" class="btn btn-success"  id="btn_tambah_jaminan_main">Tambah <i class="fas fa-plus-circle"></i></button>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="mainLokasiJaminan">Kode Lokasi Penyimpanan</label>
                                  </div>
                                  <div class="col-sm-3">  
                                  <select class="form-control form-control-sm select2" id="kode_lokasi_penyimpanan" name="kode_lokasi_penyimpanan" readonly>
                                          <option value="<?php echo $lokasi_penyimpanan?>" selected ><?php echo $lokasi_penyimpanan?></option>
                                          <?php foreach ($getCentro as $row) : ?>
                                            <option value="<?php echo $row['kode'];?>"><?php echo $row['kode'] .' - ' .$row['nama'];?></option>
                                          <?php endforeach;?>
                                  </select>
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="mainKeterangan">Keterangan</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <textarea style="height: 75px;" type="text" 
                                            class="form-control" name="mainKeterangan" 
                                            id="mainKeterangan" readonly><?php echo $ket;?></textarea>
                                  </div>
                     </div>
                      </div>
                  </div>
              </div>
              <div class="card-footer text-center">
                    <button type="button" class="btn btn-danger"  id="btn_kembali_verifikasi_pemindahan_lokasi">Kembali</button>
                    <button type="button" class="btn btn-primary" id="btn_simpan_verifikasi_pemindahan_lokasi" >Simpan</button>
             </div>

       </div>

       <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">                                  
       <input type="hidden" class="form-control" id="getNomor" name="getNomor" value = "<?php echo $getNomor; ?>"> 
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  <?php
        echo $ModalJaminanDokumen;
        echo $footer;
        echo $ctrlbar;
        echo $js;
  
  ?>
  <script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/pemindahan_dokumen_verifikasi_proses.js"></script>

<!-- ./wrapper -->



</body>
</html>
