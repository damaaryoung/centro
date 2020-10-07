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

<body class="hold-transition skin-red sidebar-mini">
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
            <h1 class="m-0 text-dark">Tambah Data Jaminan Emas</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Tambah Jaminan Emas</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content container-fluid">

    <div class="col-md-11">
        <!-- Form ATAS -->
        <div class="card card-info">
            <div class="card-header with-border">
              <h3 class="card-title">Tambah Data Jaminan Sertifikat</h3>
            </div>
            <!-- /.card-header -->

            <div class="tab">
              <button type='button' class="tablinks" onclick="openTab(event, 'DataEmas')">Data Emas</button>
              <button type='button' class="tablinks" onclick="openTab(event, 'SID')">SID</button>
            </div>

            <!-- Start Data Emas -->
            <div id="DataEmas" class="tabcontent">
                <div class="row">
                      <div class="col-md-10 mx-auto">
                      <br><br>
                          <form method="post" action="<?php echo base_url("index.php/AsetDokumenEntryController/handleUserInputEmas")?>">
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasAgunanID">Agunan ID</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="text" class="form-control" id="emasAgunanID" name='emasAgunanID' value='NEW' placeholder="NEW" readonly>
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasNoSeri">No Seri</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="text" class="form-control" id="emasNoSeri" name="emasNoSeri" value="<?php echo $this->session->tempdata('emasNoSeri'); ?>" required>
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasJenisEmas">Jenis Emas</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="emasJenisEmas" name="emasJenisEmas">
                                                <?php if($this->session->tempdata('emasJenisEmas') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('emasJenisEmas') .'">'. $this->session->tempdata('emasJenisEmas')  .'</option>';
                                                      } else{
                                                            echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                      }
                                                ?>
                                                <option value="BATANGAN">BATANGAN</option>
                                                <option value="COIN">COIN</option>
                                                <option value="LAIN">LAIN</option>
                                        </select>
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasKarat">Karat</label>
                                  </div>
                                  <div class="col-sm-2">
                                  <input type="number" class="form-control" id="emasKarat" name='emasKarat' value="<?php echo $this->session->tempdata('emasKarat'); ?>">
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Berat (Gram)</label>
                                  </div>
                                  <div class="col-sm-2">
                                  <input type="number" class="form-control" id="emasBerat" name="emasBerat" value="<?php echo $this->session->tempdata('emasBerat'); ?>">
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Harga Pasar</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="number" class="form-control" id="emasHargaPasar" name='emasHargaPasar' value="<?php echo $this->session->tempdata('emasHargaPasar'); ?>">
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Harga Taksasi</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="number" class="form-control" id="emasHargaTaksasi" name='emasHargaTaksasi' value="<?php echo $this->session->tempdata('emasHargaTaksasi'); ?>">
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                  </div>
            </div>
            <!-- END Data Emas -->

            <!-- Start SID -->
            <div id="SID" class="tabcontent">
            <div class="row">
                      <div class="col-md-10 mx-auto">
                      <br><br>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="emasSIDJenisAgunan">Jenis Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="emasSIDJenisAgunan" name="emasSIDJenisAgunan" disabled>
                                            <option value="" selected disabled hidden>Silahkan Pilih</option>
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="emasSIDPeringkatSurat">Pengikat Surat Berharga</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="emasSIDPeringkatSurat" name="emasSIDPeringkatSurat" disabled>
                                            <option value="" selected disabled hidden>Silahkan Pilih</option>   
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="emasSIDJenisPengikatan">Jenis Pengikatan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="emasSIDJenisPengikatan" name="emasSIDJenisPengikatan" disabled>
                                            <option value="" selected disabled hidden>Silahkan Pilih</option>   
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="emasSIDNamaPemilikAgunan">Nama Pemilik Agunan</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="emasSIDNamaPemilikAgunan" name='emasSIDNamaPemilikAgunan'>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="emasSIDStatus">Status/Bukti Kepemilikan</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="emasSIDStatus" name='emasSIDStatus' value='SERTIFIKAT'>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="emasSIDAlamat">Alamat</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="emasSIDAlamat" name='emasSIDAlamat'>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="emasSIDLokasi">Lokasi</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="emasSIDLokasi" name="emasSIDLokasi" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="emasSIDNJOP">Nilai Agunan (NJOP)</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="number" class="form-control" id="emasSIDNJOP" name="emasSIDNJOP">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="emasSIDBank">Nilai Agunan (Bank)</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="number" class="form-control" id="emasSIDBank" name='emasSIDBank'>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="emasSIDNilaiIndependen">Nilai Agunan Independen</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="number" class="form-control" id="emasSIDNilaiIndependen" name='emasSIDNilaiIndependen'>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="emasSIDNamaIndependen">Nama Penilai Independen</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="emasSIDNamaIndependen" name='emasSIDNamaIndependen'>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="emasSIDTglPenilaian">Tanggal Penilaian</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="date" class="form-control" id="emasSIDTglPenilaian" name='emasSIDTglPenilaian'>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="emasSIDParipasu">Paripasu (%)</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="number" class="form-control" id="emasSIDParipasu" name='emasSIDParipasu'>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="emasSIDAsuransi">Asuransi</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control select2" id="emasSIDAsuransi" name="emasSIDAsuransi">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                <option value="Y">YA</option>
                                                <option value="T">TIDAK</option>
                                        </select>
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                  </div>
            </div>
            <!-- END SID -->
            <div class="card-footer text-center">
                <button type="submit" id='btnSubmit' style="margin:5px;" class="btn btn-info">Simpan</button>
                <a href="<?php echo base_url(); ?>index.php/AsetDokumenEntryController/displayTambahAsetDokumen" type="button" style="margin:5px;" class="btn btn-danger">Kembali</a>
            </div>
            </form>
            <!-- /.card-footer -->
      </div>
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
                  <!-- Style untuk Tab Pane -->
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
        </style>

        <script>

            function openTab(evt, cityName) {
              var i, tabcontent, tablinks;
              tabcontent = document.getElementsByClassName("tabcontent");
              for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
              }
              tablinks = document.getElementsByClassName("tablinks");
              for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
              }
              document.getElementById(cityName).style.display = "block";
              evt.currentTarget.className += " active";
            }
        </script>
        <script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/data_tambah.js"></script>
</body>
</html>