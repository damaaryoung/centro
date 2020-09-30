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
                                      <select class="form-control select2" id="sertKantorLokasi" name="sertKantorLokasi">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                <?php foreach ($ListKodeKantor as $row) : ?>
                                                <option value="<?php echo $row['kode_kantor'];?>"><?php echo $row['kode_kantor'];?> - <?php echo $row['nama_kantor'];?> </option>
                                                <?php endforeach;?>
                                      </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Agunan</label>
                                  </div>
                                  <div class="col-sm-7">
                                      <select class="form-control select2" id="sertKodeJenisAgunan" name="sertKodeJenisAgunan">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
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
                                        <option value="" selected disabled hidden>Silahkan Pilih</option>
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
                                      <input type="number" class="form-control" id="sertNilaiTaksasiAgunan" name="sertNilaiTaksasiAgunan">
                                  </div>
                                  <div class="col-sm-1">
                                      <label type="number" class="control-label" style="padding-top: 5px;">NJOP</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertNJOP" name="sertNJOP" >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Harga Pasar</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertHargaPasar" name="sertHargaPasar">
                                  </div>
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="">APHT</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertAPHT" name="sertAPHT">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Persen Dijamin</label>
                                  </div>
                                  <div class="col-sm-2">
                                      <input type="number" class="form-control" id="sertPersenDijamin" name="sertPersenDijamin" readonly>
                                  </div>
                              </div>
                             
                      </div>
                  </div>
            </div>

            <div class="tab">
              <button type="button" class="tablinks" onclick="openTab(event, 'DataSertifikat')">Data Sertifikat</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'DataLampiran')">Data Lampiran</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'SID')">SID</button>
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
                                      <input type="text" class="form-control" id="sertNoSert" name="sertNoSert">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. KOHIR</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertKOHIR" name="sertKOHIR">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Sertifkat</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control select2" id="sertJenisSertifikat" name="sertJenisSertifikat">
                                            <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            <option value="SHM">SHM</option>
                                            <option value="SHGB">SHGB</option>
                                            <option value="AJB">AJB</option>
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. PERSIL</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNoPERSIL" name="sertNoPERSIL">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Tanggal Sertifikat</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="date" class="form-control" id="sertTanggalSertifikat" name="sertTanggalSertifikat">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" id="sertJTSHGBlbl" for="sertJTSHGB">Tgl JT SHGB</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="date" class="form-control" id="sertJTSHGB" name="sertJTSHGB">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. Surat Ukur</label>
                                  </div>
                                  <div class="col-sm-4">
                                      <input type="text" class="form-control" id="sertNoSuratUkur" name="sertNoSuratUkur">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">P L Bangunan</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertPLBangunan" name="sertPLBangunan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Luas Tanah</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertLuasTanah" name="sertLuasTanah">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama PPAT</label>
                                  </div>
                                  <div class="col-sm-4">
                                      <input type="text" class="form-control" id="sertNamaPPAT" name="sertNamaPPAT">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama Pemilik</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="sertNamaPemilik" name="sertNamaPemilik">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Alamat Sertifikat</label>
                                  </div>
                                  <div class="col-sm-8">
                                  <textarea style="height: 75px;" type="text" class="form-control" name="sertAlamatSertifikat" id="sertAlamatSertifikat" placeholder="Alamat..."></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Keluarhan</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertKelurahan" name="sertKelurahan" >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Kecamatan</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertKecamatan" name="sertKecamatan" >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Kota</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertKota" name="sertKota">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Propinsi</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertPorpinsi" name="sertPorpinsi">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Batas Tanah</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="sertBatasTanah" name="sertBatasTanah">
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
                                            <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            <option value="1">ASLI</option>
                                            <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" value="Y" id="check_ajb" name="check_ajb">&nbsp;AJB</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNomorAJB" name="sertNomorAJB" disabled>
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
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                <option value="1">ASLI</option>
                                                <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_imb" name='check_imb' value="Y">&nbsp;IMB</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNomorIMB" name="sertNomorIMB" disabled>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSPPT" name="sertDokSPPT">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                <option value="1">ASLI</option>
                                                <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_sppt" name='check_sppt' value="Y">&nbsp;SPPT</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNomorSPPT" name="sertNomorSPPT" disabled>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Tahun</label>
                                </div>
                                <div class="col-sm-3">
                                  <input type="number" class="form-control" id="sertTahunSPPT" name="sertTahunSPPT" min="1500" max="2999" disabled>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSKHMT" name="sertDokSKHMT">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                <option value="1">ASLI</option>
                                                <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_skmht" name='check_skmht' value="Y">&nbsp;SKMHT</label>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokDenah" name="sertDokDenah">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                <option value="1">ASLI</option>
                                                <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_denah" name='check_denah' value="Y">&nbsp;Denah</label>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokRoya" name="sertDokRoya">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                <option value="1">ASLI</option>
                                                <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_roya" name='check_roya' value="Y">&nbsp;Roya</label>
                                </div>
                            </div>
                            <!--- SHT --->
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSHT" name="sertDokSHT">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                <option value="1">ASLI</option>
                                                <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_sht" name='check_sht' value="Y">&nbsp;SHT</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNoSHT" name="sertNoSHT" disabled>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-3">
                                   
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Propinsi</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertPropinsiSHT" name="sertPropinsiSHT" disabled>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-3">
                                   
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Kota</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertKotaSHT" name="sertKotaSHT" disabled>
                                </div>
                            </div>
                            <!--- SHT --->
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSTTS" name="sertDokSTTS">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                <option value="1">ASLI</option>
                                                <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_stts" name='check_stts' value="Y">&nbsp;STTS</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Tahun</label>
                                </div>
                                <div class="col-sm-3">
                                  <input type="number" class="form-control" id="sertTahunSTTS" name="sertTahunSTTS" placeholder="Tahun" min="1500" max="2999" disabled>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSSB" name="sertDokSSB">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                <option value="1">ASLI</option>
                                                <option value="2">COPY</option>
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_ssb_bpht" name='check_ssb_bpht' value="Y">&nbsp;SSB/BPHTB</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Atas Nama</label>
                                </div>
                                <div class="col-sm-5">
                                  <input type="text" class="form-control" id="sertAtasNamaSSBBPHTB" name="sertAtasNamaSSBBPHTB" placeholder="Atas Nama" disabled>
                                </div>
                            </div>
                            <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lainnya</label>
                                  </div>
                                  <div class="col-sm-9">
                                  <textarea style="height: 115px;" type="text" class="form-control" id="sertLainnya" name="sertLainnya"></textarea>
                                  </div>
                            </div>
                      </div>
                </div>
                <!-- ROW --> 
            </div>
            <!-- End Data Lampiran -->




            <!-- Start SID -->
            <div id="SID" class="tabcontent" style="font-size: 13px;">
            <div class="row">
                      <div class="col-md-10 mx-auto">
                      <br><br>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="sertSIDJenisAgunan" name="sertSIDJenisAgunan">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                <?php foreach ($NamaJenisAgunan as $row) : ?>
                                                <option value="<?php echo $row['Desc1'];?>"><?php echo  $row['nm_jenis_agunan'];?></option>
                                                <?php endforeach;?>
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Peringkat Surat Berharga</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="sertSIDPeringkatSurat" name="sertSIDPeringkatSurat">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                <?php foreach ($RefJenisPeringkat as $row) : ?>
                                                <option value="<?php echo $row['Desc1'];?>"><?php echo  $row['nm_peringkat'];?></option>
                                                <?php endforeach;?>
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Pengikatan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="sertJenisPengikatan" name="sertJenisPengikatan">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                <?php foreach ($RefJenisPengikatan as $row) : ?>
                                                <option value="<?php echo $row['Desc1'];?>"><?php echo  $row['nm_pengikatan'];?></option>
                                                <?php endforeach;?>
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama Pemilik Agunan</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="sertSIDNamaPemilikAgunan" name="sertSIDNamaPemilikAgunan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Status/Bukti Kepemilikan</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="sertSIDBuktiPemilikAgunan" name="sertSIDBuktiPemilikAgunan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Alamat</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="sertSIDAlamat" name="sertSIDAlamat">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lokasi</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="sertSIDLokasi" name="sertSIDLokasi">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                <?php foreach ($RefDati2 as $row) : ?>
                                                <option value="<?php echo $row['Desc1'];?>"><?php echo  $row['nm_dati2'];?></option>
                                                <?php endforeach;?>
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (NJOP)</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="number" class="form-control" id="sertNilaiNJOP" name="sertNilaiNJOP">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (Bank)</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="number" class="form-control" id="sertNilaiBank" name="sertNilaiBank">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan Independen</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="number" class="form-control" id="sertNilaiIndependen" name="sertNilaiIndependen">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama Penilai Independen</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertNamaIndependen" name="sertNamaIndependen">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Paripasu (%)</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="number" class="form-control" id="sertParipasu" name="sertParipasu">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Asuransi</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control select2" id="sertAsuransi" name="sertAsuransi">
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