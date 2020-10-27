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
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Tambah Data Jaminan Sertifikat</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Tambah Jaminan Sertifikat</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content container-fluid">

    <div class="col-md-11">
        <div class="card card-info">
            <div class="card-header with-border">
              <h3 class="card-title">Tambah Data Jaminan Sertifikat</h3>
            </div>
            <!-- /.card-header -->
            <div class="container py-5">
                  <div class="row">
                      <div class="col-md-10 mx-auto">
                      <br><br>
                      <!-- MAIN FORM -->
                          <form  method="post" action="<?php echo base_url("index.php/AsetDokumenEntryController/handleUserInputSertifikat")?>">
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="sertTglRegister">Tanggal Register</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <?php foreach ($sysdate as $row) : ?>
                                        <input type="date" class="form-control" id="sertTglRegister" name="sertTglRegister" value="<?php echo $row['sysdate'];?>" readonly>
                                    <?php endforeach;?>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="sertTglPenilaian">Tanggal Penilaian</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <?php foreach ($sysdate as $row) : ?>
                                        <input type="date" class="form-control" id="sertTglPenilaian" name="sertTglPenilaian" value="<?php echo $row['sysdate'];?>" >
                                    <?php endforeach;?>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKantorLokasi">Kantor Lokasi Jaminan</label>
                                  </div>
                                  <div class="col-sm-7">
                                        <?php if($kode_kantor == '00' || $divisi_id == 'IT'){ ?>
                                            <select class="form-control select2" id="sertKantorLokasi" name="sertKantorLokasi">
                                                        <?php if($this->session->tempdata('sertKantorLokasi') != NULL ) {
                                                                    echo '<option selected value="'. $this->session->tempdata('sertKantorLokasi') .'">'. $this->session->tempdata('sertKantorLokasi')  .'</option>';
                                                            } else{
                                                                    echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                            }
                                                        ?>
                                                        <?php foreach ($ListKodeKantor as $row) : ?>
                                                        <option value="<?php echo $row['kode_kantor'];?>"><?php echo $row['kode_kantor'];?> - <?php echo $row['nama_kantor'];?> </option>
                                                        <?php endforeach;?>
                                            </select>
                                        <?php }else if($kode_kantor != '00' || $divisi_id != 'IT'){
                                            echo '<input class="form-control" id="sertKantorLokasi" name="sertKantorLokasi" value="'.$kode_kantor.'" readonly>';
                                        } ?>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Agunan</label>
                                  </div>
                                  <div class="col-sm-7">
                                      <select class="form-control select2" id="sertKodeJenisAgunan" name="sertKodeJenisAgunan">
                                                <?php if($this->session->tempdata('sertKodeJenisAgunan') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('sertKodeJenisAgunan') .'">'. $this->session->tempdata('sertKodeJenisAgunan')  .'</option>';
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
                                      <label class="control-label" style="padding-top: 5px;" for="">Ikatan Agunan</label>
                                  </div>
                                  <div class="col-sm-7">
                                    <select class="form-control select2" id="sertKodeIkatanAgunan" name="sertKodeIkatanAgunan">
                                        <?php if($this->session->tempdata('sertKodeIkatanAgunan') != NULL ) {
                                                     echo '<option selected value="'. $this->session->tempdata('sertKodeIkatanAgunan') .'">'. $this->session->tempdata('sertKodeIkatanAgunan')  .'</option>';
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
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Taksasi Agunan</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertNilaiTaksasiAgunan" name="sertNilaiTaksasiAgunan" value="<?php echo $this->session->tempdata('sertNilaiTaksasiAgunan'); ?>">
                                  </div>
                                  <div class="col-sm-1">
                                      <label type="number" class="control-label" style="padding-top: 5px;">NJOP</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertNJOP" name="sertNJOP" value="<?php echo $this->session->tempdata('sertNJOP'); ?>" >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Harga Pasar</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertHargaPasar" name="sertHargaPasar" value="<?php echo $this->session->tempdata('sertHargaPasar'); ?>"> 
                                  </div>
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="">APHT</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertAPHT" name="sertAPHT" value="<?php echo $this->session->tempdata('sertAPHT'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Persen Dijamin</label>
                                  </div>
                                  <div class="col-sm-2">
                                      <input type="number" class="form-control" id="sertPersenDijamin" name="sertPersenDijamin" value="<?php echo $this->session->tempdata('sertPersenDijamin'); ?>" readonly>
                                  </div>
                              </div>
                             
                      </div>
                  </div>
            </div>

            <div class="tab">
              <button type="button" class="tablinks" onclick="openTab(event, 'DataSertifikat')">Data Sertifikat</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'DataLampiran')">Data Lampiran</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'SLIK')">SLIK</button>
            </div>

            <!-- Start Data Sertifikat -->
            <div id="DataSertifikat" class="tabcontent" style="font-size: 13px;">
                <div class="row">
                      <div class="col-md-10 mx-auto">
                      <br><br>
                         
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Agunan ID</label>
                                  </div>
                                  <div class="col-sm-3">
                                  <input type="text" class="form-control" id="sertAgunanID" name="sertAgunanID" placeholder='NEW' value='NEW' readonly>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertID" name="sertID" readonly value="<?php echo $nextID;?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. Sertifikat</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNoSert" name="sertNoSert" value="<?php echo $this->session->tempdata('sertNoSert'); ?>">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. KOHIR</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertKOHIR" name="sertKOHIR" value="<?php echo $this->session->tempdata('sertKOHIR'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Sertifkat</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control select2" id="sertJenisSertifikat" name="sertJenisSertifikat">
                                            <?php if($this->session->tempdata('sertJenisSertifikat') != NULL ) {
                                                     echo '<option selected value="'. $this->session->tempdata('sertJenisSertifikat') .'">'. $this->session->tempdata('sertJenisSertifikat')  .'</option>';
                                              } else{
                                                     echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                              }
                                            ?>
                                            <option value="SHM">SHM</option>
                                            <option value="SHGB">SHGB</option>
                                            <option value="AJB">AJB</option>
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. PERSIL</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNoPERSIL" name="sertNoPERSIL" value="<?php echo $this->session->tempdata('sertNoPERSIL'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Tanggal Sertifikat</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="date" class="form-control" id="sertTanggalSertifikat" name="sertTanggalSertifikat" value="<?php echo $this->session->tempdata('sertTanggalSertifikat'); ?>">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" id="sertJTSHGBlbl" for="sertJTSHGB">Tgl JT SHGB</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="date" class="form-control" id="sertJTSHGB" name="sertJTSHGB" value="<?php echo $this->session->tempdata('sertJTSHGB'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. Surat Ukur</label>
                                  </div>
                                  <div class="col-sm-4">
                                      <input type="text" class="form-control" id="sertNoSuratUkur" name="sertNoSuratUkur" value="<?php echo $this->session->tempdata('sertNoSuratUkur'); ?>"> 
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">P L Bangunan</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertPLBangunan" name="sertPLBangunan" value="<?php echo $this->session->tempdata('sertPLBangunan'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Luas Tanah</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertLuasTanah" name="sertLuasTanah" value="<?php echo $this->session->tempdata('sertLuasTanah'); ?>">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama PPAT</label>
                                  </div>
                                  <div class="col-sm-4">
                                      <input type="text" class="form-control" id="sertNamaPPAT" name="sertNamaPPAT" value="<?php echo $this->session->tempdata('sertNamaPPAT'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama Pemilik</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="sertNamaPemilik" name="sertNamaPemilik" value="<?php echo $this->session->tempdata('sertNamaPemilik'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Alamat Sertifikat</label>
                                  </div>
                                  <div class="col-sm-8">
                                  <textarea style="height: 75px;" type="text" 
                                            class="form-control" name="sertAlamatSertifikat" 
                                            id="sertAlamatSertifikat" placeholder="Alamat..."><?php echo $this->session->tempdata('sertAlamatSertifikat'); ?></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Kelurahan</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertKelurahan" name="sertKelurahan" value="<?php echo $this->session->tempdata('sertKelurahan'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Kecamatan</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertKecamatan" name="sertKecamatan" value="<?php echo $this->session->tempdata('sertKecamatan'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Kota</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertKota" name="sertKota" value="<?php echo $this->session->tempdata('sertKota'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Propinsi</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertPorpinsi" name="sertPorpinsi" value="<?php echo $this->session->tempdata('sertPorpinsi'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Batas Tanah</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="sertBatasTanah" name="sertBatasTanah" value="<?php echo $this->session->tempdata('sertBatasTanah'); ?>">
                                  </div>
                              </div>
                      </div>
                  </div>
            </div>
            <!-- END Data Sertifikat -->



            <!-- Start Data Lampiran -->
            <div id="DataLampiran" class="tabcontent" style="font-size: 13px;">
                <!-- ROW -->
                <div class="row">
                      <div class="col-md-12 mx-auto">
                      <br><br>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokAJB" name="sertDokAJB">
                                            <?php if($this->session->tempdata('sertDokAJB') != NULL ) {
                                                        echo '<option selected value="'. $this->session->tempdata('sertDokAJB') .'">'
                                                        . (($this->session->tempdata('sertDokAJB') == '1')? 'ASLI':'COPY')
                                                        .'</option>';
                                                } else{
                                                        echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                }
                                            ?>
                                            <option value="1">ASLI</option>
                                            <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                        <?php if($this->session->tempdata('ajb') != NULL ) {
                                                    if($this->session->tempdata('ajb') == 'N' ) {
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" value="Y" id="check_ajb" name="check_ajb">&nbsp;AJB</label>';
                                                    } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" value="Y" id="check_ajb" name="check_ajb" checked>&nbsp;AJB</label>';
                                                     }   
                                            } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" value="Y" id="check_ajb" name="check_ajb">&nbsp;AJB</label>';
                                            }
                                        ?>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                            <?php if($this->session->tempdata('sertNomorAJB') != NULL ) {
                                                        echo '<input type="text" class="form-control" id="sertNomorAJB" name="sertNomorAJB"  value="'. $this->session->tempdata('sertNomorAJB') .'">';
                                                } else{
                                                        echo '<input type="text" class="form-control" id="sertNomorAJB" name="sertNomorAJB" disabled>';
                                                }
                                            ?>                                      
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Tanggal AJB</label>
                                </div>
                                <div class="col-sm-3">
                                  <input type="date" class="form-control" id="sertTanggalAJB" name="sertTanggalAJB" >
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokIMB" name="sertDokIMB">
                                                <?php if($this->session->tempdata('sertDokIMB') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('sertDokIMB') .'">'
                                                            . (($this->session->tempdata('sertDokIMB') == '1')? 'ASLI':'COPY')
                                                            .'</option>';
                                                    } else{
                                                            echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                    }
                                                ?>
                                                <option value="1">ASLI</option>
                                                <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                        <?php if($this->session->tempdata('imb') != NULL ) {
                                                    if($this->session->tempdata('imb') == 'N' ) {
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_imb" name="check_imb" value="Y">&nbsp;IMB</label>';
                                                    } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_imb" name="check_imb" value="Y" checked>&nbsp;IMB</label>';
                                                     }   
                                            } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_imb" name="check_imb" value="Y">&nbsp;IMB</label>';
                                            }
                                        ?>
                                    
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                        <?php if($this->session->tempdata('sertNomorIMB') != NULL ) {
                                                        echo '<input type="text" class="form-control" id="sertNomorIMB" name="sertNomorIMB"  value="'. $this->session->tempdata('sertNomorIMB') .'">';
                                                } else{
                                                        echo '<input type="text" class="form-control" id="sertNomorIMB" name="sertNomorIMB" disabled>';
                                            }
                                        ?>   
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSPPT" name="sertDokSPPT">
                                                <?php if($this->session->tempdata('sertDokSPPT') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('sertDokSPPT') .'">'
                                                            . (($this->session->tempdata('sertDokSPPT') == '1')? 'ASLI':'COPY')
                                                            .'</option>';
                                                    } else{
                                                            echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                    }
                                                ?>
                                                <option value="1">ASLI</option>
                                                <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                        <?php if($this->session->tempdata('sppt') != NULL ) {
                                                    if($this->session->tempdata('sppt') == 'N' ) {
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_sppt" name="check_sppt" value="Y">&nbsp;SPPT</label>';
                                                    } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_sppt" name="check_sppt" value="Y" checked>&nbsp;SPPT</label>';
                                                    }   
                                            } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_sppt" name="check_sppt" value="Y">&nbsp;SPPT</label>';
                                            }
                                        ?>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                        <?php if($this->session->tempdata('sertNomorSPPT') != NULL ) {
                                                        echo '<input type="text" class="form-control" id="sertNomorSPPT" name="sertNomorSPPT"  value="'. $this->session->tempdata('sertNomorSPPT') .'">';
                                                } else{
                                                        echo '<input type="text" class="form-control" id="sertNomorSPPT" name="sertNomorSPPT" disabled>';
                                            }
                                        ?>   
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Tahun</label>
                                </div>
                                <div class="col-sm-3">
                                  
                                        <?php if($this->session->tempdata('sertTahunSPPT') != NULL ) {
                                                        echo '<input type="text" class="form-control" id="sertTahunSPPT" name="sertTahunSPPT"  value="'. $this->session->tempdata('sertTahunSPPT') .'">';
                                                } else{
                                                        echo '<input type="number" class="form-control" id="sertTahunSPPT" name="sertTahunSPPT" min="1500" max="2999" disabled>';
                                              }
                                        ?>   
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSKHMT" name="sertDokSKHMT">
                                                <?php if($this->session->tempdata('sertDokSKHMT') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('sertDokSKHMT') .'">'
                                                            . (($this->session->tempdata('sertDokSKHMT') == '1')? 'ASLI':'COPY')
                                                            .'</option>';
                                                    } else{
                                                            echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                    }
                                                ?>
                                                <option value="1">ASLI</option>
                                                <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                        <?php if($this->session->tempdata('skmht') != NULL ) {
                                                    if($this->session->tempdata('skmht') == 'N' ) {
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_skmht" name="check_skmht" value="Y">&nbsp;SKMHT</label>';
                                                    } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_skmht" name="check_skmht" value="Y" checked>&nbsp;SKMHT</label>';
                                                    }   
                                            } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_skmht" name="check_skmht" value="Y">&nbsp;SKMHT</label>';
                                            }
                                        ?>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokDenah" name="sertDokDenah">
                                                <?php if($this->session->tempdata('sertDokDenah') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('sertDokDenah') .'">'
                                                            . (($this->session->tempdata('sertDokDenah') == '1')? 'ASLI':'COPY')
                                                            .'</option>';
                                                    } else{
                                                            echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                    }
                                                ?>
                                                <option value="1">ASLI</option>
                                                <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                        <?php if($this->session->tempdata('denah') != NULL ) {
                                                    if($this->session->tempdata('denah') == 'N' ) {
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_denah" name="check_denah" value="Y">&nbsp;Denah</label>';
                                                    } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_denah" name="check_denah" value="Y" checked>&nbsp;Denah</label>';
                                                    }   
                                            } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_denah" name="check_denah" value="Y">&nbsp;Denah</label>';
                                            }
                                        ?>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokRoya" name="sertDokRoya">
                                                <?php if($this->session->tempdata('sertDokRoya') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('sertDokRoya') .'">'
                                                            . (($this->session->tempdata('sertDokRoya') == '1')? 'ASLI':'COPY')
                                                            .'</option>';
                                                    } else{
                                                            echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                    }
                                                ?>
                                                <option value="1">ASLI</option>
                                                <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                        <?php if($this->session->tempdata('roya') != NULL ) {
                                                    if($this->session->tempdata('roya') == 'N' ) {
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_roya" name="check_roya" value="Y">&nbsp;Roya</label>';
                                                    } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_roya" name="check_roya" value="Y" checked>&nbsp;Roya</label>';
                                                    }   
                                            } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_roya" name="check_roya" value="Y">&nbsp;Roya</label>';
                                            }
                                        ?> 
                                </div>
                            </div>
                            <!--- SHT --->
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSHT" name="sertDokSHT">
                                                <?php if($this->session->tempdata('sertDokSHT') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('sertDokSHT') .'">'
                                                            . (($this->session->tempdata('sertDokSHT') == '1')? 'ASLI':'COPY')
                                                            .'</option>';
                                                    } else{
                                                            echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                    }
                                                ?>
                                                <option value="1">ASLI</option>
                                                <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                        <?php if($this->session->tempdata('sht') != NULL ) {
                                                    if($this->session->tempdata('sht') == 'N' ) {
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_sht" name="check_sht" value="Y">&nbsp;SHT</label>';
                                                    } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_sht" name="check_sht" value="Y" checked>&nbsp;SHT</label>';
                                                    }   
                                            } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_sht" name="check_sht" value="Y">&nbsp;SHT</label>';
                                            }
                                        ?>                                        
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                        <?php if($this->session->tempdata('sertNoSHT') != NULL ) {
                                                        echo '<input type="text" class="form-control" id="sertNoSHT" name="sertNoSHT"  value="'. $this->session->tempdata('sertNoSHT') .'">';
                                                } else{
                                                        echo '<input type="text" class="form-control" id="sertNoSHT" name="sertNoSHT" disabled>';
                                              }
                                        ?>                                         
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-3">
                                   
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Propinsi</label>
                                </div>
                                <div class="col-sm-3">
                                        <?php if($this->session->tempdata('sertPropinsiSHT') != NULL ) {
                                                        echo '<input type="text" class="form-control" id="sertPropinsiSHT" name="sertPropinsiSHT"  value="'. $this->session->tempdata('sertPropinsiSHT') .'">';
                                                } else{
                                                        echo '<input type="text" class="form-control" id="sertPropinsiSHT" name="sertPropinsiSHT" disabled>';
                                              }
                                        ?>                                        
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-3">
                                   
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Kota</label>
                                </div>
                                <div class="col-sm-3">
                                        <?php if($this->session->tempdata('sertKotaSHT') != NULL ) {
                                                        echo '<input type="text" class="form-control" id="sertKotaSHT" name="sertKotaSHT"  value="'. $this->session->tempdata('sertKotaSHT') .'">';
                                                } else{
                                                        echo '<input type="text" class="form-control" id="sertKotaSHT" name="sertKotaSHT" disabled>';
                                              }
                                        ?>  
                                      
                                </div>
                            </div>
                            <!--- SHT --->
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSTTS" name="sertDokSTTS">
                                                <?php if($this->session->tempdata('sertDokSTTS') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('sertDokSTTS') .'">'
                                                            . (($this->session->tempdata('sertDokSTTS') == '1')? 'ASLI':'COPY')
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
                                        <?php if($this->session->tempdata('stts') != NULL ) {
                                                    if($this->session->tempdata('stts') == 'N' ) {
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_stts" name="check_stts" value="Y">&nbsp;STTS</label>';
                                                    } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_stts" name="check_stts" value="Y" checked>&nbsp;STTS</label>';
                                                    }   
                                            } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_stts" name="check_stts" value="Y">&nbsp;STTS</label>';
                                            }
                                        ?>   
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Tahun</label>
                                </div>
                                <div class="col-sm-3">
                                        <?php if($this->session->tempdata('sertTahunSTTS') != NULL ) {
                                                        echo '<input type="text" class="form-control" id="sertTahunSTTS" name="sertTahunSTTS"  value="'. $this->session->tempdata('sertTahunSTTS') .'">';
                                                } else{
                                                        echo '<input type="number" class="form-control" id="sertTahunSTTS" name="sertTahunSTTS" placeholder="Tahun" min="1500" max="2999" disabled>';
                                              }
                                        ?>  
                                  
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSSB" name="sertDokSSB">
                                                <?php if($this->session->tempdata('sertDokSSB') != NULL ) {
                                                            echo '<option selected value="'. $this->session->tempdata('sertDokSSB') .'">'
                                                            . (($this->session->tempdata('sertDokSSB') == '1')? 'ASLI':'COPY')
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
                                        <?php if($this->session->tempdata('ssb_bpht') != NULL ) {
                                                    if($this->session->tempdata('ssb_bpht') == 'N' ) {
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_ssb_bpht" name="check_ssb_bpht" value="Y">&nbsp;SSB/BPHTB</label>';
                                                    } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_ssb_bpht" name="check_ssb_bpht" value="Y" checked>&nbsp;SSB/BPHTB</label>';
                                                    }   
                                            } else{
                                                        echo '<label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_ssb_bpht" name="check_ssb_bpht" value="Y">&nbsp;SSB/BPHTB</label>';
                                            }
                                        ?>  
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Atas Nama</label>
                                </div>
                                <div class="col-sm-5">
                                        <?php if($this->session->tempdata('sertAtasNamaSSBBPHTB') != NULL ) {
                                                        echo '<input type="text" class="form-control" id="sertAtasNamaSSBBPHTB" name="sertAtasNamaSSBBPHTB"  value="'. $this->session->tempdata('sertAtasNamaSSBBPHTB') .'">';
                                                } else{
                                                        echo '<input type="text" class="form-control" id="sertAtasNamaSSBBPHTB" name="sertAtasNamaSSBBPHTB" placeholder="Atas Nama" disabled>';
                                              }
                                        ?>  
                                </div>
                            </div>
                            <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lainnya</label>
                                  </div>
                                  <div class="col-sm-9">
                                  <textarea style="height: 115px;" type="text" class="form-control" id="sertLainnya" name="sertLainnya"><?php echo $this->session->tempdata('sertLainnya');?></textarea>
                                  </div>
                            </div>
                      </div>
                </div>
                <!-- ROW --> 
            </div>
            <!-- End Data Lampiran -->




            <!-- Start SLIK -->
            <div id="SLIK" class="tabcontent" style="font-size: 13px;">
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
                                                        echo '<option value="T">T</option>
                                                              <option value="Y" selected>Y</option>';
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
                                                <?php if($this->session->tempdata('sertSlikJenisAgunan') != '') {
                                                        echo '<option value="'.$this->session->tempdata('sertSlikJenisAgunan').'" selected>'.$this->session->tempdata('sertSlikJenisAgunan').'</option>';
                                                    } else{
                                                        echo '<option value="" selected disabled hidden>Silahkan Pilih</option>';
                                                    }
                                                ?>
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
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
                                                        echo '<option value="T">T</option>
                                                              <option value="Y" selected>Y</option>';
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