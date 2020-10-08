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
            <h1 class="m-0 text-dark">Entry Pemindahan Lokasi Jaminan</h1>
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
              <h3 class="card-title">Tambah Data Aset Dokumen</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->
              <div class="container py-5" style="font-size: 12px;">
                  <div class="row">
                      <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label style="padding-top: 6px;" class="control-label" for="mainNomor">Nomor</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="text" class="form-control form-control-sm" id="mainNomor" name="mainNomor" readonly value="NEW">
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggalRealisasi">Tanggal</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="date" class="form-control form-control-sm" id="mainTanggal" name="mainTanggal">
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggalRealisasi">Kode Kantor Tujuan</label>
                                  </div>
                                  <div class="col-sm-3">
                                  <select class="form-control form-control-sm select2" id="kode_kantor" name="kode_kantor">
                                        <option value="<?php echo $this->session->userdata('kd_cabang'); ?>"><?php echo $this->session->userdata('kd_cabang'); ?></option>
                                        <?php foreach ($selectKodeKantor as $row) : ?>
                                        <option value="<?php echo $row['kode_kantor'];?>"><?php echo $row['kode_kantor'] .' - ' .$row['nama_kantor'];?></option>
                                        <?php endforeach;?>
                                  </select>
                                  </div>
                              </div>
                          <!-- Form ATAS -->

                          <div id="BPKB" class="tabcontent">
                            <table id="" class="table table-striped table-bordered display" style="width:100%">
                                    <thead>
                                        <tr>
                                            <th>No.&nbsp;Reff</th>
                                            <th>Agunan&nbsp;ID</th>
                                            <th>Jenis</th>
                                            <th>Deskripsi&nbsp;Jaminan</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><p id='rowNoReff'><?php //echo $bpkbAgunanID; ?></p></td> 
                                            <td><p id='rowAgunanID'><?php //echo $bpkbNoBPKB; ?></p></p></td> 
                                            <td><p id='rowJenis'><?php //echo $bpkbNamaPemilik; ?></p></td> 
                                            <td><p id='rowDeskripsi'><?php// echo $bpkbAlamatPemlik; ?></p></td> 
                                            <td> 
                                                <button type="button" class="btn btn-danger btn-sm" 
                                                        id="deleteTempBPKB"
                                                        data-toggle="tooltip" 
                                                        data-placement="bottom" 
                                                        title="Hapus"
                                                        name="deleteTempBPKB"> 
                                                        <i class="fa fa-trash"></i>
                                                </button>
                                            </td> 
                                            
                                        </tr>
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
                                  <select class="form-control form-control-sm select2" id="mainLokasiJaminan" name="mainLokasiJaminan">
                                        <option value="<?php echo $this->session->userdata('kd_cabang'); ?>"><?php echo $this->session->userdata('kd_cabang'); ?></option>
                                        <?php foreach ($selectKodeKantor as $row) : ?>
                                        <option value="<?php echo $row['kode_kantor'];?>"><?php echo $row['kode_kantor'] .' - ' .$row['nama_kantor'];?></option>
                                        <?php endforeach;?>
                                  </select>
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="mainKeterangan">Keterangan</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="text" class="form-control form-control-sm" id="mainKeterangan" name="mainKeterangan">
                                  </div>
                     </div>
                      </div>
                  </div>
              </div>
              <div class="card-footer text-center">
                    <button type="button" class="btn btn-danger"  id="btn_kembali_update_modal">Kembali</button>
                    <button type="button" class="btn btn-primary" id="btn_simpan_update_modal" >Simpan</button>
             </div>

       </div>

       <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">                                  


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
  <script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/pemindahan_dokumen_insert.js"></script>

<!-- ./wrapper -->



</body>
</html>
