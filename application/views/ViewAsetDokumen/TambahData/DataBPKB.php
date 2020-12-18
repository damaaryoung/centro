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

<body class="hold-transition skin-red sidebar-mini" onload="zoom()">
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
                                        <?php if($kode_kantor == '00' || $divisi_id == 'IT'){ ?>
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
                                        <?php }else if($kode_kantor != '00' || $divisi_id != 'IT'){
                                            echo '<input class="form-control" id="bpkbKantorLokasi" name="bpkbKantorLokasi" value="'.$kode_kantor.'" readonly>';
                                        } ?> 
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
              <button type="button" class="tablinks" onclick="openTab(event, 'SLIK')">SLIK</button>
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
                                    <select class="form-control select2" id="bpkbMerk" name="bpkbMerk" onchange="selectTypeKendaraan()">
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
                                  <textarea style="height: 100px;" type="text" class="form-control" id="bpkbLainnya" name="bpkbLainnya"><?php echo $this->session->tempdata('bpkbLainnya') ?></textarea>
                                  </div>
                            </div>
                      </div>
                </div>
                <!-- ROW --> 
            </div>
            <!-- End Data Lampiran -->




            <!-- Start SID -->
            <div id="SLIK" class="tabcontent">
            <div class="row">
                      <div class="col-md-12 mx-auto">
                      <br><br>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Status Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="sertSlikStatusAgunan" name="sertSlikStatusAgunan">
                                                
                                                <?php if($this->session->tempdata('sertSlikStatusAgunan') == '1') {
                                                        echo '<option value="1" selected>1 - Tersedia</option>
                                                              <option value="2" >2 - Indent</option>';
                                                      } else if($this->session->tempdata('sertSlikStatusAgunan') == '2'){
                                                        echo '<option value="1" >1 - Tersedia</option>
                                                              <option value="2" selected>2 - Indent</option>';
                                                      }else{
                                                        echo '<option value="1">1 - Tersedia</option>
                                                              <option value="2" selected>2 - Indent</option>';
                                                      }
                                                ?>
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Paripasu</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control select2" id="sertSlikParipasu" name="sertSlikParipasu">
                                                
                                                <?php if($this->session->tempdata('sertSlikParipasu') == 'T') {
                                                        echo '<option value="T" selected>T</option>
                                                              <option value="Y">Y</option>';
                                                      } else if($this->session->tempdata('sertSlikParipasu') == 'Y'){
                                                        echo '<option value="T" >T</option>
                                                              <option value="Y" selected>Y</option>';
                                                      }else{
                                                        echo '<option value="T"selected>T</option>
                                                              <option value="Y">Y</option>';
                                                      }
                                                ?>
                                        </select>
                                  </div>
                              </div>                
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="sertSlikJenisAgunan" name="sertSlikJenisAgunan">
                                        <?php if($this->session->tempdata('sertSlikJenisAgunan') != '') {
                                                        echo '<option value="'.$this->session->tempdata('sertSlikJenisAgunan').'" selected>'.$this->session->tempdata('sertSlikJenisAgunan').'</option>';
                                              } else{
                                                  echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                              }
                                        ?>
                                                <?php foreach ($SlikKodeJenisAgunan as $row) : ?>
                                                <option value="<?php echo $row['kode'];?>"><?php echo $row['kode'] .' - '. $row['nama'];?></option>
                                                <?php endforeach;?>
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Paripasu (%)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertSlikParipasuPersen" name="sertSlikParipasuPersen" value="<?php echo $this->session->tempdata('sertSlikParipasuPersen');?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Peringkat Agunan</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <input type="text" class="form-control" id="sertSlikPeringkatAgunan" name="sertSlikPeringkatAgunan"  maxlength="6"  value="<?php echo $this->session->tempdata('sertSlikPeringkatAgunan');?>">
                                  </div>
                                  <div class="col-sm-2">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Status Join Account</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control select2" id="sertSLikStatusJoinAccount" name="sertSLikStatusJoinAccount">
                                              
                                                <?php if($this->session->tempdata('sertSLikStatusJoinAccount') == 'T') {
                                                        echo '<option value="T" selected>T</option>
                                                              <option value="Y">Y</option>';
                                                      } else if($this->session->tempdata('sertSLikStatusJoinAccount') == 'Y'){
                                                        echo '<option value="T" >T</option>
                                                              <option value="Y" selected>Y</option>';
                                                      }else{
                                                        echo '<option value="T" selected>T</option>
                                                              <option value="Y">Y</option>';
                                                      }
                                                ?>
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lembaga Pemeringkat</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="sertSlikLembagaPemeringkat" name="sertSlikLembagaPemeringkat">
                                                <?php if($this->session->tempdata('sertSlikLembagaPemeringkat') != '') {
                                                        echo '<option value="'.$this->session->tempdata('sertSlikLembagaPemeringkat').'" selected>'.$this->session->tempdata('sertSlikLembagaPemeringkat').'</option>';
                                                    } else{
                                                        echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                    }
                                                ?>
                                                <?php foreach ($SlikLembagaPemeringkat as $row) : ?>
                                                    <option value="<?php echo $row['kode'];?>"><?php echo $row['kode'] .' - '. $row['nama'];?></option>
                                                <?php endforeach;?>
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Diasuransikan</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control select2" id="sertSlikAsuransi" name="sertSlikAsuransi">
                                        <?php if($this->session->tempdata('sertSlikAsuransi') == 'T') {
                                                        echo '<option value="T" selected>T</option>
                                                              <option value="Y">Y</option>';
                                                      } else if($this->session->tempdata('sertSlikAsuransi') == 'Y'){
                                                        echo '<option value="T" >T</option>
                                                              <option value="Y" selected>Y</option>';
                                                      }else{
                                                        echo '<option value="T"selected>T</option>
                                                              <option value="Y">Y</option>';
                                                      }
                                                ?>
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Pengikatan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="sertSlikJenisPengikatan" name="sertSlikJenisPengikatan">
                                                <?php if($this->session->tempdata('sertSlikJenisPengikatan') != '') {
                                                        echo '<option value="'.$this->session->tempdata('sertSlikJenisPengikatan').'" selected>'.$this->session->tempdata('sertSlikJenisPengikatan').'</option>';
                                                    } else{
                                                        echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                    }
                                                ?>
                                                <?php foreach ($SlikJenisPengikatan as $row) : ?>
                                                <option value="<?php echo $row['kode'];?>"><?php echo $row['kode'] .' - '. $row['nama'];?></option>
                                                <?php endforeach;?>
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tanggal Pengikatan</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <input type="date" class="form-control" id="sertSlikTanggalPengikatan" name="sertSlikTanggalPengikatan" value="<?php echo $this->session->tempdata('sertSlikTanggalPengikatan');?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama Pemilik Agunan</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <input type="text" class="form-control" id="sertSlikNamaPemilikAgunan" name="sertSlikNamaPemilikAgunan" value="<?php echo $this->session->tempdata('sertSlikNamaPemilikAgunan');?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Bukti Kepemilikan</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <input type="text" class="form-control" id="sertSlikBuktiKepemilikanAgunan" name="sertSlikBuktiKepemilikanAgunan" value="<?php echo $this->session->tempdata('sertSlikBuktiKepemilikanAgunan');?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Alamat</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <textarea style="height: 115px;" type="text" class="form-control" id="sertSlikAlamat" name="sertSlikAlamat"><?php echo $this->session->tempdata('sertSlikAlamat');?></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Kode Dati 2 Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="sertSlikKodeDati2" name="sertSlikKodeDati2">
                                                <?php if($this->session->tempdata('sertSlikKodeDati2') != '') {
                                                        echo '<option value="'.$this->session->tempdata('sertSlikKodeDati2').'" selected>'.$this->session->tempdata('sertSlikKodeDati2').'</option>';
                                                    } else{
                                                        echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                    }
                                                ?>
                                                <?php foreach ($SlikDati2 as $row) : ?>
                                                <option value="<?php echo $row['kode'];?>"><?php echo $row['kode'] .' - '. $row['nama'];?></option>
                                                <?php endforeach;?>
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (NJOP)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertSlikNilaiNJOP" name="sertSlikNilaiNJOP" value="<?php echo $this->session->tempdata('sertSlikNilaiNJOP');?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (LJK)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertSlikNilaiLJK" name="sertSlikNilaiLJK" value="<?php echo $this->session->tempdata('sertSlikNilaiLJK');?>">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tanggal Penilaian (LJK)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="sertSlikTanggalLJK" name="sertSlikTanggalLJK" value="<?php echo $this->session->tempdata('sertSlikTanggalLJK');?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan Independen</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertSlikNilaiIndependen" name="sertSlikNilaiIndependen" value="<?php echo $this->session->tempdata('sertSlikNilaiIndependen');?>">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tgl Penilaian Independen</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="sertSlikTglIndependen" name="sertSlikTglIndependen" value="<?php echo $this->session->tempdata('sertSlikTglIndependen');?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama Penilai Independen</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertSlikNamaIndependen" name="sertSlikNamaIndependen" value="<?php echo $this->session->tempdata('sertSlikNamaIndependen');?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Keterangan</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <textarea style="height: 115px;" type="text" class="form-control" id="sertSlikKeterangan" name="sertSlikKeterangan"><?php echo $this->session->tempdata('sertSlikKeterangan');?></textarea>
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                  </div>
            </div>
            <!-- END SLIK -->
            <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">


            <div class="card-footer text-center">
                <a href="<?php echo base_url(); ?>index.php/AsetDokumenEntryController/displayTambahAsetDokumen" type="button" style="margin:5px;" class="btn btn-danger">Kembali</a>
                <button type="submit" id='btnSubmit' style="margin:5px;" class="btn btn-info">Simpan</button>
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