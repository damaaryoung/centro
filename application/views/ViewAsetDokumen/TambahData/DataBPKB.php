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
  <link rel="icon" type="image/jpeg" href="<?php echo base_url(); ?>assets/design/images/kmi_logo.jpg" />
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
 
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Tambah Data Jaminan BPKB</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Tambah Jaminan BPKB</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content container-fluid">
      <div id="loading">
        <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>

    <div class="col-md-11">
        <!-- Form ATAS -->
        <div class="card card-info">
            <div class="card-header with-border">
              <h3 class="card-title">Tambah Data Jaminan BPKB</h3>
            </div>
            <!-- /.card-header -->    
            <!-- form start -->
            <div class="container py-5">
                  <div class="row">
                      <div class="col-md-10 mx-auto">
                      <br><br>
                          <form method="post" action="<?php echo base_url("index.php/AsetDokumenEntryController/handleUserInputBPKB")?>">
                             <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="bpkbTglRegister">Tanggal Register</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <?php foreach ($sysdate as $row) : ?>
                                        <input type="date" class="form-control" id="bpkbTglRegister" name="bpkbTglRegister" value="<?php echo $row['sysdate'];?>" readonly>
                                    <?php endforeach;?>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="bpkbTglPenilaian">Tanggal Penilaian</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <?php foreach ($sysdate as $row) : ?>
                                        <input type="date" class="form-control" id="bpkbTglPenilaian" name="bpkbTglPenilaian" value="<?php echo $row['sysdate'];?>" >
                                    <?php endforeach;?>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbKantorLokasi">Kantor Lokasi Jaminan</label>
                                  </div>
                                  <div class="col-sm-7">
                                      <select class="form-control select2" id="bpkbKantorLokasi" name="bpkbKantorLokasi">
                                                <?php if($this->session->tempdata('bpkbKantorLokasi') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('bpkbKantorLokasi') .'">'. $this->session->tempdata('bpkbKantorLokasi') .'</option>';
                                                      } else{
                                                            echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                      }
                                                ?>
                                                <?php foreach ($ListKodeKantor as $row) : ?>
                                                <option value="<?php echo $row['kode_kantor'];?>"><?php echo $row['kode_kantor'];?> - <?php echo $row['nama_kantor'];?> </option>
                                                <?php endforeach;?>
                                      </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbKodeJenisAgunan">Jenis Agunan</label>
                                  </div>
                                  <div class="col-sm-7">
                                      <select class="form-control select2" id="bpkbKodeJenisAgunan" name="bpkbKodeJenisAgunan">
                                                <?php if($this->session->tempdata('bpkbKodeJenisAgunan') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('bpkbKodeJenisAgunan') .'">'. $this->session->tempdata('bpkbKodeJenisAgunan') .'</option>';
                                                      } else{
                                                            echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                      }
                                                ?>
                                                <?php foreach ($KreKodeJenisAgunan as $row) : ?>
                                                <option value="<?php echo $row['kode_jenis_agunan'];?>"><?php echo $row['jenis_agunan'];?> </option>
                                                <?php endforeach;?>
                                      </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbKodeIkatanAgunan">Ikatan Agunan</label>
                                  </div>
                                  <div class="col-sm-7">
                                    <select class="form-control select2" id="bpkbKodeIkatanAgunan" name="bpkbKodeIkatanAgunan">
                                                <?php if($this->session->tempdata('bpkbKodeIkatanAgunan') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('bpkbKodeIkatanAgunan') .'">'. $this->session->tempdata('bpkbKodeIkatanAgunan') .'</option>';
                                                      } else{
                                                            echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                      }
                                                ?>
                                        <?php foreach ($KreKodeIkatanHukumAgunan as $row) : ?>
                                        <option value="<?php echo $row['kode_ikatan_hukum'];?>" data-persen="<?php echo $row['persen_default'];?>"><?php echo $row['ikatan_agunan'];?> </option>
                                        <?php endforeach;?>
                                    </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNilaiTaksasiAgunan">Nilai Taksasi Agunan</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbNilaiTaksasiAgunan" name="bpkbNilaiTaksasiAgunan"  value="<?php echo $this->session->tempdata('bpkbNilaiTaksasiAgunan'); ?>" >
                                  </div>
                                  <div class="col-sm-1">
                                      <label type="number" class="control-label" style="padding-top: 5px;">NJOP</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbNJOP" name="bpkbNJOP"  value="<?php echo $this->session->tempdata('bpkbNJOP'); ?>" >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbHargaPasar">Harga Pasar</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbHargaPasar" name="bpkbHargaPasar"  value="<?php echo $this->session->tempdata('bpkbHargaPasar'); ?>" >
                                  </div>
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbAPHT">APHT</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbAPHT" name="bpkbAPHT"  value="<?php echo $this->session->tempdata('bpkbAPHT'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbPersenDijamin">Persen Dijamin</label>
                                  </div>
                                  <div class="col-sm-2">
                                      <input type="number" class="form-control" id="bpkbPersenDijamin" name="bpkbPersenDijamin" readonly>
                                  </div>
                              </div>
                             
                          <!-- Form ATAS -->
                      </div>
                  </div>
            </div>

            <div class="tab">
              <button type="button" class="tablinks" onclick="openTab(event, 'DataBPKB')">Data BPKB</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'DataLampiran')">Data Lampiran</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'SID')">SID</button>
            </div>

            <!-- Start Data BPKB -->
            <div id="DataBPKB" class="tabcontent">
                <div class="row">
                      <div class="col-md-12 mx-auto">
                      <br><br>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Agunan ID</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="bpkbAgunanID" name="bpkbAgunanID" value="NEW" placeholder="NEW" readonly>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoBPKB">No. BPKB</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="bpkbNoBPKB" name="bpkbNoBPKB" value="<?php echo $this->session->tempdata('bpkbNoBPKB'); ?>"> 
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNamaPemilik">Nama Pemilik</label>
                                  </div>
                                  <div class="col-sm-7">
                                      <input type="text" class="form-control" id="bpkbNamaPemilik" name="bpkbNamaPemilik" value="<?php echo $this->session->tempdata('bpkbNamaPemilik'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbAlamatPemlik">Alamat Pemilik</label>
                                  </div>
                                  <div class="col-sm-7">
                                    <textarea style="height: 75px;" type="text" class="form-control" id="bpkbAlamatPemlik" name="bpkbAlamatPemlik"><?php echo $this->session->tempdata('bpkbAlamatPemlik'); ?></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbKotaPemilik">Kota Pemilik</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbKotaPemilik" name="bpkbKotaPemilik" value="<?php echo $this->session->tempdata('bpkbKotaPemilik'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Merk/Type</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <select class="form-control select2" id="bpkbMerk" name="bpkbMerk">
                                                <?php if($this->session->tempdata('bpkbMerk') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('bpkbMerk') .'">'. $this->session->tempdata('bpkbMerk') .'</option>';
                                                      } else{
                                                            echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                      }
                                                ?>
                                                <?php foreach ($MerkKend as $row) : ?>
                                                <option value="<?php echo $row['kd_merk'];?>"><?php echo  $row['nm_merk'];?></option>
                                                <?php endforeach;?>
                                    </select>
                                  </div>
                                  <div class="col-sm-4">
                                        <select class="form-control select2" id="bpkbType" name="bpkbType">
                                                <?php if($this->session->tempdata('bpkbType') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('bpkbType') .'">'. $this->session->tempdata('bpkbType') .'</option>';
                                                      } else{
                                                            echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                      }
                                                ?>
                                                <?php foreach ($TypeKend as $row) : ?>
                                                <option value="<?php echo $row['kd_type'];?>"><?php echo  $row['nm_type'];?></option>
                                                <?php endforeach;?>
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 6px;" for="">Jenis / Silinder</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <select class="form-control select2" id="bpkbJenis" name="bpkbJenis">
                                                <?php if($this->session->tempdata('bpkbJenis') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('bpkbJenis') .'">'. $this->session->tempdata('bpkbJenis') .'</option>';
                                                      } else{
                                                            echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                      }
                                                ?>
                                                <?php foreach ($JenisKend as $row) : ?>
                                                <option value="<?php echo $row['kd_jenis'];?>"><?php echo  $row['nm_jenis'];?></option>
                                                <?php endforeach;?>
                                    </select>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="number" class="form-control" id="bpkbSilinder" name="bpkbSilinder" placeholder="Silinder" value="<?php echo $this->session->tempdata('bpkbSilinder'); ?>"> 
                                  </div>
                                  <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 6px;" for="">CC</label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoRangka">No. Rangka</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoRangka" name="bpkbNoRangka" value="<?php echo $this->session->tempdata('bpkbNoRangka'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoMesin">No. Mesin</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoMesin" name="bpkbNoMesin" value="<?php echo $this->session->tempdata('bpkbNoMesin'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbTahun">Tahun</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="number" class="form-control" id="bpkbTahun" name="bpkbTahun" value="<?php echo $this->session->tempdata('bpkbTahun'); ?>" min="1500" max="2999">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbTglExpPajak">Tgl. Exp Pajak</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbTglExpPajak" name="bpkbTglExpPajak"  value="<?php echo $this->session->tempdata('bpkbTglExpPajak'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbTahun">Warna</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="bpkbWarna" name="bpkbWarna"  value="<?php echo $this->session->tempdata('bpkbWarna'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoPolisi">No. Polisi</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="text" class="form-control" id="bpkbNoPolisi" name="bpkbNoPolisi"  value="<?php echo $this->session->tempdata('bpkbNoPolisi'); ?>">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tgl. Exp STNK</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbTglExpSTNK" name="bpkbTglExpSTNK" value="<?php echo $this->session->tempdata('bpkbTglExpSTNK'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. STNK</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoSTNK" name="bpkbNoSTNK" value="<?php echo $this->session->tempdata('bpkbNoSTNK'); ?>">
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                  </div>
            </div>
            <!-- END Data BPKB -->



            <!-- Start Data Lampiran -->
            <div id="DataLampiran" class="tabcontent">
                <!-- ROW -->
                <div class="row">
                      <div class="col-md-12 mx-auto">
                      <br><br>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="bpkbDokKwitansiBlanko" name="bpkbDokKwitansiBlanko">
                                            <?php if($this->session->tempdata('bpkbDokKwitansiBlanko') != NULL ) {
                                                        echo '<option selected value="'. $this->session->tempdata('bpkbDokKwitansiBlanko') .'">'
                                                        . (($this->session->tempdata('bpkbDokKwitansiBlanko') == '1')? 'ASLI':'COPY')
                                                        .'</option>';
                                                } else{
                                                        echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                }
                                            ?>
                                            <option value="1">ASLI</option>
                                            <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <?php if($this->session->tempdata('blanko') != NULL ) {
                                                    if($this->session->tempdata('blanko') == 'N' ) {
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                                             <input type="checkbox"  value="Y" id="check_kw_blanko" name="check_kw_blanko">&nbsp;Kwitansi Blanko</label>';
                                                    } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                                              <input type="checkbox"  value="Y" id="check_kw_blanko" name="check_kw_blanko" checked>&nbsp;Kwitansi Blanko</label>';
                                                     }   
                                            } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                                              <input type="checkbox"  value="Y" id="check_kw_blanko" name="check_kw_blanko">&nbsp;Kwitansi Blanko</label>';
                                            }
                                    ?>
                                </div>
                            </div>

                            <div class="form-group row">
                            <div class="col-sm-2">
                                    <select class="form-control select2" id="bpkbDokFakturPemilik" name="bpkbDokFakturPemilik">
                                            <?php if($this->session->tempdata('bpkbDokFakturPemilik') != NULL ) {
                                                        echo '<option selected value="'. $this->session->tempdata('bpkbDokFakturPemilik') .'">'
                                                        . (($this->session->tempdata('bpkbDokFakturPemilik') == '1')? 'ASLI':'COPY')
                                                        .'</option>';
                                                } else{
                                                        echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                }
                                            ?>
                                            <option value="1">ASLI</option>
                                            <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    
                                    <?php if($this->session->tempdata('faktur_pemilik') != NULL ) {
                                                    if($this->session->tempdata('faktur_pemilik') == 'N' ) {
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                                              <input type="checkbox"  value="Y" id="check_faktur_pemilik" name="check_faktur_pemilik">&nbsp;Faktur Pemilik</label>';
                                                    } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                                              <input type="checkbox"  value="Y" id="check_faktur_pemilik" name="check_faktur_pemilik" checked>&nbsp;Faktur Pemilik</label>';
                                                     }   
                                            } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                                              <input type="checkbox"  value="Y" id="check_faktur_pemilik" name="check_faktur_pemilik">&nbsp;Faktur Pemilik</label>';
                                            }
                                    ?>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoFakturPemilik">&nbsp;No. Faktur Pemilik</label>
                                </div>
                                <div class="col-sm-5">
                                      <?php if($this->session->tempdata('bpkbNoFakturPemilik') != NULL ) {
                                                        echo '<input type="text" class="form-control" id="bpkbNoFakturPemilik" name="bpkbNoFakturPemilik"  value="'. $this->session->tempdata('bpkbNoFakturPemilik') .'">';
                                                } else{
                                                        echo '<input type="text" class="form-control" id="bpkbNoFakturPemilik" name="bpkbNoFakturPemilik" disabled>';
                                                }
                                      ?> 
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="bpkbDokKwJualBeli" name="bpkbDokKwJualBeli">
                                            <?php if($this->session->tempdata('bpkbDokKwJualBeli') != NULL ) {
                                                        echo '<option selected value="'. $this->session->tempdata('bpkbDokKwJualBeli') .'">'
                                                        . (($this->session->tempdata('bpkbDokKwJualBeli') == '1')? 'ASLI':'COPY')
                                                        .'</option>';
                                                } else{
                                                        echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                }
                                            ?>
                                            <option value="1">ASLI</option>
                                            <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    
                                    <?php if($this->session->tempdata('kwitansi_jb') != NULL ) {
                                                    if($this->session->tempdata('kwitansi_jb') == 'N' ) {
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                                        <input type="checkbox" value="Y" id="check_kw_jual_beli" name="check_kw_jual_beli">&nbsp;Kwitansi Jual Beli</label>';
                                                    } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                                        <input type="checkbox" value="Y" id="check_kw_jual_beli" name="check_kw_jual_beli" checked>&nbsp;Kwitansi Jual Beli</label>';
                                                     }   
                                            } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                                        <input type="checkbox" value="Y" id="check_kw_jual_beli" name="check_kw_jual_beli">&nbsp;Kwitansi Jual Beli</label>';
                                            }
                                    ?>
                                </div>
                            </div>
                            <!-- SK TRAYEK -->
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="bpkbDokSKTrayek" name="bpkbDokSKTrayek">
                                            <?php if($this->session->tempdata('bpkbDokSKTrayek') != NULL ) {
                                                        echo '<option selected value="'. $this->session->tempdata('bpkbDokSKTrayek') .'">'
                                                        . (($this->session->tempdata('bpkbDokSKTrayek') == '1')? 'ASLI':'COPY')
                                                        .'</option>';
                                                } else{
                                                        echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                }
                                            ?>
                                            <option value="1">ASLI</option>
                                            <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <?php if($this->session->tempdata('sk_trayek') != NULL ) {
                                                    if($this->session->tempdata('sk_trayek') == 'N' ) {
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                                        <input type="checkbox" value="Y" id="check_sk_trayek" name="check_sk_trayek">&nbsp;SK Trayek</label>';
                                                    } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                                        <input type="checkbox" value="Y" id="check_sk_trayek" name="check_sk_trayek" checked>&nbsp;SK Trayek</label>';
                                                     }   
                                            } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                                        <input type="checkbox" value="Y" id="check_sk_trayek" name="check_sk_trayek">&nbsp;SK Trayek</label>';
                                            }
                                    ?>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. SK Trayek</label>
                                </div>
                                <div class="col-sm-5">
                                      <?php if($this->session->tempdata('noSKTrayek') != NULL ) {
                                                        echo '<input type="text" class="form-control" id="noSKTrayek" name="noSKTrayek"  value="'. $this->session->tempdata('noSKTrayek') .'">';
                                                } else{
                                                        echo '<input type="text" class="form-control" id="noSKTrayek" name="noSKTrayek" disabled>';
                                                }
                                      ?>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                   
                                </div>
                                <div class="col-sm-2">
                                    
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Berlaku s/d</label>
                                </div>
                                <div class="col-sm-3">
                                      <?php if($this->session->tempdata('bpkbBerlakuSD') != NULL ) {
                                                        echo '<input type="date" class="form-control" id="bpkbBerlakuSD" name="bpkbBerlakuSD"  value="'. $this->session->tempdata('bpkbBerlakuSD') .'">';
                                                } else{
                                                        echo '<input type="date" class="form-control" id="bpkbBerlakuSD" name="bpkbBerlakuSD" disabled>';
                                                }
                                      ?>
                                </div>
                            </div>
                            <!-- SK TRAYEK -->
                            <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lainnya</label>
                                  </div>
                                  <div class="col-sm-9">
                                  <textarea style="height: 100px;" type="text" class="form-control" id="bpkbLainnya" name="bpkbLainnya"></textarea>
                                  </div>
                            </div>
                      </div>
                </div>
                <!-- ROW --> 
            </div>
            <!-- End Data Lampiran -->




            <!-- Start SID -->
            <div id="SID" class="tabcontent">
            <div class="row">
                      <div class="col-md-10 mx-auto">
                      <br><br>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbSIDJenisAgunan">Jenis Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="bpkbSIDJenisAgunan" name="bpkbSIDJenisAgunan" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbSIDPengikatSurat">Pengikat Surat Berharga</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="bpkbSIDPengikatSurat" name="bpkbSIDPengikatSurat" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbSIDJenisPengikatan">Jenis Pengikatan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="bpkbSIDJenisPengikatan" name="bpkbSIDJenisPengikatan" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                               
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbSIDNamaPemilikAgunan">Nama Pemilik Agunan</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="bpkbSIDNamaPemilikAgunan" name="bpkbSIDNamaPemilikAgunan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbSIDStatusBuktiKepemilikan">Status/Bukti Kepemilikan</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="bpkbSIDStatusBuktiKepemilikan" name="bpkbSIDStatusBuktiKepemilikan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbSIDAlamat">Alamat</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="bpkbSIDAlamat" name="bpkbSIDAlamat">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbSIDLokasi">Lokasi</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="bpkbSIDLokasi" name="bpkbSIDLokasi" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbSIDNJOP">Nilai Agunan (NJOP)</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="number" class="form-control" id="bpkbSIDNJOP" name='bpkbSIDNJOP' placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="nilaiSIDAgunanBank">Nilai Agunan (Bank)</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="number" class="form-control" id="nilaiSIDAgunanBank" name="nilaiSIDAgunanBank" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbSIDNilaiIndependen">Nilai Agunan Independen</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="number" class="form-control" id="bpkbSIDNilaiIndependen" name="bpkbSIDNilaiIndependen" >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbSIDNamaIndependen">Nama Penilai Independen</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbSIDNamaIndependen" name="bpkbSIDNamaIndependen">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Paripasu (%)</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="number" class="form-control" id="bpkbSIDParipasu" name="bpkbSIDParipasu">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Asuransi</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control select2" id="bpkbSIDAsuransi" name="bpkbSIDAsuransi">
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