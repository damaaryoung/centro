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
            <h1 class="m-0 text-dark">Tambah Data Aset Dokumen</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Tambah Jaminan</li>
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
              <h3 class="card-title">Tambah Data Aset Dokumen</h3>
            </div>
            <!-- /.card-header -->
            <!-- form start -->
              <div class="container py-5" style="font-size: 12px;">
                  <div class="row">
                      <div class="col-md-10 mx-auto">
                      <br><br>
                          <form method="post" action="<?php echo base_url("index.php/AsetDokumenEntryController/insertDataToDB")?>">
                          <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="mainAreaKerja">Area Kerja</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <select class="form-control select2" id="mainAreaKerja" name="mainAreaKerja" required>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                <?php foreach ($ListKodeKantor as $row) : ?>
                                                <option value="<?php echo $row['kode_kantor'];?>"><?php echo $row['kode_kantor'];?> - <?php echo $row['nama_kantor'];?> </option>
                                                <?php endforeach;?>
                                    </select>
                                  </div>
                                  <div class="col-sm-1">
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggal">Tanggal</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <?php foreach ($sysdate as $row) : ?>
                                      <input readonly type="date" class="form-control" id="mainTanggal" name='mainTanggal' value="<?php echo $row['sysdate'];?>" placeholder="">
                                    <?php endforeach;?>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainTransaksi">Transaksi</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control select2" id="mainTransaksi" name="mainTransaksi">
                                            <?php //foreach ($MenuData as $row) : ?>
                                            <option selected value="<?php echo 'MASUK';?>"><?php echo 'MASUK';?></option>
                                            <?php //endforeach;?>
                                        </select>
                                  </div>
                                  <div class="col-sm-3">
                                        <label style="padding-left: 30px; padding-top: 6px;" class="checkbox-inline"><input type="checkbox" id="mainTakeover" value="">Take Over</label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainNama">Nama</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="mainNama" name='mainNama'>
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="mainKeterangan">Keterangan</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <textarea style="height: 100px;" type="text" class="form-control" id="mainKeterangan" name='mainKeterangan'></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainAlamat">Alamat</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <textarea style="height: 100px;" type="text" class="form-control" id="mainAlamat" name="mainAlamat"></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainKota">Kota</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <input type="text" class="form-control" id="mainKota" name="mainKota">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainJenisPengurusan">Jenis Pengurusan</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <input type="text" class="form-control" id="mainJenisPengurusan" name="mainJenisPengurusan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainNomorRekening">Nomor Rekening</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="mainNomorRekening" name="mainNomorRekening">
                                  </div>
                                  <div class="col-sm-1">
                                      <button type="button" class="btn btn-success btn-sm" 
                                              id="mainBtnSearchRekening" 
                                              data-button ="btnTambahAsetDokumen"> 
                                        <i class="fa fa-search"> </i>
                                      </button>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggalRealisasi">Tanggal Realisasi</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <?php foreach ($sysdate as $row) : ?>
                                      <input readonly type="date" class="form-control" id="mainTanggalRealisasi" name="mainTanggalRealisasi" value="<?php echo $row['sysdate'];?>">
                                    <?php endforeach;?>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainNomorRekening">Nama Nasabah</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="mainNamaNasabah" name="mainNamaNasabah" readonly>
                                  </div>
                              </div>

                          <!-- Form ATAS -->
                      </div>
                  </div>
              </div>
                              
            <div class="tab">
              <button type='button' class="tablinks" onclick="openTab(event, 'BPKB')">BPKB</button>
              <button type='button' class="tablinks" onclick="openTab(event, 'Sertifikat')">Sertifikat</button>
              <button type='button' class="tablinks" onclick="openTab(event, 'Emas')">Emas</button>
            </div>

            <!-- Start BPKB -->
            <div id="BPKB" class="tabcontent">
              <table id="" class="table table-striped table-bordered display" style="width:100%">
                      <thead>
                          <tr>
                              <th>Agunan&nbsp;ID</th>
                              <th>No.&nbsp;BPKB</th>
                              <th>Nama Pemilik</th>
                              <th>Alamat&nbsp;Pemilik</th>
                              <th>No.&nbsp;Polisi</th>
                              <th>Verifikasi</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><?php echo $bpkbAgunanID; ?></td> 
                              <td><?php echo $bpkbNoBPKB; ?></td> 
                              <td><?php echo $bpkbNamaPemilik; ?></td> 
                              <td><?php echo $bpkbAlamatPemlik; ?></td>
                              <td><?php echo $bpkbNoPolisi; ?></td> 
                              <td><?php echo 'Verifikasi'; ?></td> 
                              <td><?php echo 'Action'; ?></td> 
                             
                          </tr>
                      </tbody>
              </table>
              <a type="button" class="btn btn-primary btn-sm" id="btnTambahBPKB" href="<?php echo base_url(); ?>index.php/AsetDokumenEntryController/displayTambahDataBPKB"> <i class="fa fa-pencil-square-o"></i> Tambah</a>   
            </div>
            <!-- END BPKB -->

            <!-- Start Sertifikat -->
            <div id="Sertifikat" class="tabcontent">
                <table id="" class="table table-striped table-bordered display" style="width:100%">
                    <thead>
                        <tr>
                            <th>Agunan&nbsp;ID</th>
                            <th>No&nbsp;Sertifikat</th>
                            <th>Jenis</th>
                            <th>Tanggal&nbsp;Surat</th>
                            <th>Luas Tanah</th>
                            <th>Nama&nbsp;Pemilik</th>
                            <th>Verifikasi</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><?php echo $sertAgunanID; ?></td> 
                            <td><?php echo $sertNoSert;?></td>
                            <td><?php echo $sertJenisSertifikat; ?></td> 
                            <td><?php echo $sertTanggalSertifikat; ?></td>
                            <td><?php echo $sertLuasTanah; ?></td>
                            <td><?php echo $sertNamaPemilik; ?></td>
                            <td>Verifikasi</td>
                            <td>Action</td>
                        </tr>
                    </tbody>
                </table>
                <a type="button" class="btn btn-primary btn-sm" id="btnTambahSertif" href="<?php echo base_url(); ?>index.php/AsetDokumenEntryController/displayTambahDataSertifikat"> <i class="fa fa-pencil-square-o"></i> Tambah</a>  
                  
       
       
            </div>
            <!-- End Sertifikat -->

            <!-- Start Emas -->
            <div id="Emas" class="tabcontent">

            <table id="" class="table table-striped table-bordered display" style="width:100%">
                    <thead>
                        <tr>
                            <th>Agunan&nbsp;ID</th>
                            <th>No&nbsp;Seri</th>
                            <th>Jenis</th>
                            <th>Karat</th>
                            <th>Gram</th>
                            <th>Harga&nbsp;Pasar</th>
                            <th>Verifikasi</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td><?php echo $emasAgunanID; ?></td>
                          <td><?php echo $emasNoSeri; ?></td>
                          <td><?php echo $emasJenisEmas; ?></td>
                          <td><?php echo $emasKarat; ?></td>
                          <td><?php echo $emasBerat; ?></td>
                          <td><?php echo $emasHargaPasar; ?></td>
                          <td><?php echo 'Verifikasi'; ?></td>
                          <td><?php echo 'Action'; ?></td>
                        </tr>
                    </tbody>
                </table>
                    <a type="button" class="btn btn-primary btn-sm" id="btnTambahBPKB" href="<?php echo base_url(); ?>index.php/AsetDokumenEntryController/displayTambahDataEmas"> <i class="fa fa-pencil-square-o"></i> Tambah</a>  
                    
            </div>
            <!-- END Emas -->


             <!-- END SID -->
             <div class="card-footer text-center">

             <!-- Test keluarin variable -->
             <?php 
                // test keluarin paramenter sertifikat

                // DATA FORM ATAS   
                    // echo 'Tgl register ' . $sertTglRegister   . '<br>';  
                    // echo 'sertTglPenilaian ' .              $sertTglPenilaian   . '<br>'; 
                    // echo 'sertKantorLokasi ' .              $sertKantorLokasi  . '<br>'; 
                    // echo 'sertKodeJenisAgunan '.               $sertKodeJenisAgunan  . '<br>';
                    // echo 'sertNilaiTaksasiAgunan ' .               $sertNilaiTaksasiAgunan  . '<br>';  
                    // echo 'sertNJOP '.         $sertNJOP  . '<br>';    
                    // echo 'sertHargaPasar '   .           $sertHargaPasar  . '<br>';
                    // echo 'sertAPHT ' .             $sertAPHT  . '<br>'; 
                    // echo 'sertPersenDijamin '.              $sertPersenDijamin  . '<br>';

                    // // DATA SERTIFIKAT
                    //      echo 'Tgl sertAgunanID ' . $sertAgunanID   . '<br>';
                    //      echo 'Tgl sertID ' . $sertID  . '<br>';
                    //      echo 'Tgl sertNoSert ' . $sertNoSert  . '<br>';
                    //      echo 'Tgl register ' . $sertKOHIR  . '<br>';
                    //      echo 'Tgl sertKOHIR ' . $sertJenisSertifikat  . '<br>';
                    //      echo 'Tgl sertNoPERSIL ' . $sertNoPERSIL  . '<br>';
                    //      echo 'Tgl sertTanggalSertifikat ' . $sertTanggalSertifikat  . '<br>';
                    //      echo 'Tgl sertJTSHGB ' . $sertJTSHGB  . '<br>';
                    //      echo 'Tgl sertNoSuratUkur ' . $sertNoSuratUkur  . '<br>';
                    //      echo 'Tgl sertPLBangunan ' . $sertPLBangunan  . '<br>';
                    //      echo 'Tgl sertLuasTanah ' . $sertLuasTanah  . '<br>';
                    //      echo 'Tgl sertNamaPPAT ' . $sertNamaPPAT  . '<br>';
                    //      echo 'Tgl sertNamaPemilik ' . $sertNamaPemilik  . '<br>';
                    //      echo 'Tgl sertAlamatSertifikat ' . $sertAlamatSertifikat  . '<br>';
                    //      echo 'Tgl sertKelurahan ' . $sertKelurahan  . '<br>';
                    //      echo 'Tgl sertKecamatan ' .$sertKecamatan  . '<br>';
                    //      echo 'Tgl sertKota ' . $sertKota  . '<br>';
                    //      echo 'Tgl sertPorpinsi ' . $sertPorpinsi  . '<br>';
                    //      echo 'Tgl sertBatasTanah ' .$sertBatasTanah  . '<br>';

                    //       // DATA LAMPIRAN
                    //       echo 'Tgl sertDokAJB ' .$sertDokAJB  . '<br>';
                    //       echo 'Tgl sertNomorAJB ' .$sertNomorAJB  . '<br>';
                    //       echo 'Tgl sertTanggalAJB ' .$sertTanggalAJB  . '<br>';
                    //       echo 'Tgl sertDokIMB ' .$sertDokIMB;
                    //       echo 'Tgl sertNomorIMB ' .$sertNomorIMB  . '<br>';
                    //       echo 'Tgl sertDokSPPT ' .$sertDokSPPT  . '<br>';
                    //       echo 'Tgl sertNomorSPPT ' .$sertNomorSPPT  . '<br>';
                    //       echo 'Tgl sertTahunSPPT ' .$sertTahunSPPT  . '<br>';
                    //       echo 'Tgl sertDokSKHMT ' .$sertDokSKHMT  . '<br>';
                    //       echo 'Tgl sertDokDenah ' .$sertDokDenah  . '<br>';
                    //       echo 'Tgl sertDokRoya ' .$sertDokRoya  . '<br>';
                    //       echo 'Tgl sertDokSHT ' .$sertDokSHT  . '<br>';
                    //       echo 'Tgl sertNoSHT ' .$sertNoSHT  . '<br>';
                    //       echo 'Tgl sertPropinsiSHT ' .$sertPropinsiSHT  . '<br>';
                    //       echo 'Tgl sertKotaSHT ' .$sertKotaSHT  . '<br>';
                    //       echo 'Tgl sertDokSTTS ' .$sertDokSTTS  . '<br>';
                    //       echo 'Tgl sertTahunSTTS ' .$sertTahunSTTS  . '<br>';
                    //       echo 'Tgl sertDokSSB ' .$sertDokSSB  . '<br>';
                    //       echo 'Tgl sertAtasNamaSSBBPHTB ' .$sertAtasNamaSSBBPHTB  . '<br>';
                    //       echo 'Tgl sertLainnya ' .$sertLainnya  . '<br>';

                    //       // DATA SID
                    //        echo 'Tgl sertSIDJenisAgunan ' .$sertSIDJenisAgunan  . '<br>';
                    //        echo 'Tgl sertSIDPeringkatSurat ' .$sertSIDPeringkatSurat  . '<br>';
                    //        echo 'Tgl sertJenisPengikatan ' .$sertJenisPengikatan  . '<br>';
                    //        echo 'Tgl sertSIDNamaPemilikAgunan ' .$sertSIDNamaPemilikAgunan  . '<br>';
                    //        echo 'Tgl sertSIDBuktiPemilikAgunan ' .$sertSIDBuktiPemilikAgunan  . '<br>';
                    //        echo 'Tgl sertSIDAlamat ' .$sertSIDAlamat  . '<br>';
                    //        echo 'Tgl sertSIDLokasi ' .$sertSIDLokasi  . '<br>';
                    //        echo 'Tgl sertNilaiNJOP ' .$sertNilaiNJOP  . '<br>';
                    //        echo 'Tgl sertNilaiBank ' .$sertNilaiBank  . '<br>';
                    //        echo 'Tgl sertNilaiIndependen ' .$sertNilaiIndependen  . '<br>';
                    //        echo 'Tgl sertNamaIndependen ' .$sertNamaIndependen  . '<br>';
                    //        echo 'Tgl sertParipasu ' .$sertParipasu  . '<br>';
                    //        echo 'Tgl sertAsuransi ' .$sertAsuransi  . '<br>';
                    //         // END FORM TAMBAH SERTIFIKAT ///

                    //         echo 'checkajb ' .$ajb  . '<br>';
                    //         echo ' imb ' .$imb  . '<br>';
                    //         echo ' sppt ' .$sppt  . '<br>';
                    //         echo ' skmht ' .$skmht  . '<br>';
                    //         echo ' denah ' .$denah  . '<br>';
                    //         echo ' roya ' .$roya  . '<br>';
                    //         echo ' sht ' .$sht  . '<br>';
                    //         echo ' stts ' .$stts  . '<br>';
                    //         echo ' ssb ' .$ssb_bpht  . '<br>';

                    //test keluarin paramenter BPKB


                  // //DATA FORM ATAS   
                  //   echo 'Tgl register BPKB ' . $bpkbTglRegister   . '<br>';  
                  //   echo 'bpkbTglPenilaian ' .              $bpkbTglPenilaian   . '<br>'; 
                  //   echo 'bpkbKantorLokasi ' .              $bpkbKantorLokasi  . '<br>'; 
                  //   echo 'bpkbKodeJenisAgunan '.               $bpkbKodeJenisAgunan  . '<br>';
                  //   echo 'bpkbKodeIkatanAgunan ' .               $bpkbKodeIkatanAgunan  . '<br>';  
                  //   echo 'bpkbNilaiTaksasiAgunan '.         $bpkbNilaiTaksasiAgunan  . '<br>';    
                  //   echo 'bpkbNJOP '   .           $bpkbNJOP  . '<br>';
                  //   echo 'bpkbHargaPasar ' .             $bpkbHargaPasar  . '<br>'; 
                  //   echo 'bpkbAPHT '.              $bpkbAPHT  . '<br>';
                  //   echo 'bpkbPersenDijamin '.              $bpkbPersenDijamin  . '<br>';


                  //   // DATA BPKB
                  //        echo 'Tgl bpkbAgunanID ' . $bpkbAgunanID   . '<br>';
                  //        echo 'Tgl bpkbNoBPKB ' . $bpkbNoBPKB  . '<br>';
                  //        echo 'Tgl bpkbNamaPemilik ' . $bpkbNamaPemilik  . '<br>';
                  //        echo 'Tgl bpkbAlamatPemlik ' . $bpkbAlamatPemlik  . '<br>';
                  //        echo 'Tgl bpkbKotaPemilik ' . $bpkbKotaPemilik  . '<br>';
                  //        echo 'Tgl bpkbMerk ' . $bpkbMerk  . '<br>';
                  //        echo 'Tgl bpkbType ' . $bpkbType  . '<br>';
                  //        echo 'Tgl bpkbJenis ' . $bpkbJenis  . '<br>';
                  //        echo 'Tgl bpkbSilinder ' . $bpkbSilinder  . '<br>';
                  //        echo 'Tgl bpkbNoRangka ' . $bpkbNoRangka  . '<br>';
                  //        echo 'Tgl bpkbNoMesin ' . $bpkbNoMesin  . '<br>';
                  //        echo 'Tgl bpkbTahun ' . $bpkbTahun  . '<br>';
                  //        echo 'Tgl bpkbTglExpPajak ' . $bpkbTglExpPajak  . '<br>';
                  //        echo 'Tgl bpkbNoPolisi ' . $bpkbNoPolisi  . '<br>';
                  //        echo 'Tgl bpkbTglExpSTNK ' . $bpkbTglExpSTNK  . '<br>';
                  //        echo 'Tgl bpkbNoSTNK ' .$bpkbNoSTNK  . '<br>';

                  //         // DATA LAMPIRAN

                  //         echo 'Tgl bpkbDokKwitansiBlanko ' .$bpkbDokKwitansiBlanko  . '<br>';
                  //         echo 'Tgl bpkbDokFakturPemilik ' .$bpkbDokFakturPemilik  . '<br>';
                  //         echo 'Tgl bpkbDokKwJualBeli ' .$bpkbDokKwJualBeli  . '<br>';
                  //         echo 'Tgl bpkbDokSKTrayek ' .$bpkbDokSKTrayek;
                  //         echo 'Tgl blanko ' .$blanko  . '<br>';
                  //         echo 'Tgl faktur_pemilik ' .$faktur_pemilik  . '<br>';
                  //         echo 'Tgl kwitansi_jb ' .$kwitansi_jb  . '<br>';
                  //         echo 'Tgl sk_trayek ' .$sk_trayek  . '<br>';
                  //         echo 'Tgl bpkbNoFakturPemilik ' .$bpkbNoFakturPemilik  . '<br>';
                  //         echo 'Tgl noSKTrayek ' .$noSKTrayek  . '<br>';
                  //         echo 'Tgl bpkbBerlakuSD ' .$bpkbBerlakuSD  . '<br>';
                  //         echo 'Tgl bpkbLainnya ' .$bpkbLainnya  . '<br>';

                  //         // DATA SID
                  //         $data['bpkbSIDJenisAgunan'] 			= $this->session->tempdata('bpkbSIDJenisAgunan');
                  //         $data['bpkbSIDPengikatSurat'] 			= $this->session->tempdata('bpkbSIDPengikatSurat');
                  //         $data['bpkbSIDJenisPengikatan']			= $this->session->tempdata('bpkbSIDJenisPengikatan');
                  //         $data['bpkbSIDNamaPemilikAgunan'] 		= $this->session->tempdata('bpkbSIDNamaPemilikAgunan');
                  //         $data['bpkbSIDStatusBuktiKepemilikan'] 	= $this->session->tempdata('bpkbSIDStatusBuktiKepemilikan');
                  //         $data['bpkbSIDAlamat'] 					= $this->session->tempdata('bpkbSIDAlamat');
                  //         $data['bpkbSIDLokasi'] 					= $this->session->tempdata('bpkbSIDLokasi');
                  //         $data['bpkbSIDNJOP'] 					= $this->session->tempdata('bpkbSIDNJOP');
                  //         $data['nilaiSIDAgunanBank'] 			= $this->session->tempdata('nilaiSIDAgunanBank');
                  //         $data['bpkbSIDNilaiIndependen'] 		= $this->session->tempdata('bpkbSIDNilaiIndependen');
                  //         $data['bpkbSIDNamaIndependen'] 			= $this->session->tempdata('bpkbSIDNamaIndependen');
                  //         $data['bpkbSIDParipasu'] 				= $this->session->tempdata('bpkbSIDParipasu');
                  //         $data['bpkbSIDAsuransi'] 				= $this->session->tempdata('bpkbSIDAsuransi');


                  //          echo 'Tgl bpkbSIDJenisAgunan ' .$bpkbSIDJenisAgunan  . '<br>';
                  //          echo 'Tgl bpkbSIDPengikatSurat ' .$bpkbSIDPengikatSurat  . '<br>';
                  //          echo 'Tgl bpkbSIDJenisPengikatan ' .$bpkbSIDJenisPengikatan  . '<br>';
                  //          echo 'Tgl bpkbSIDNamaPemilikAgunan ' .$bpkbSIDNamaPemilikAgunan  . '<br>';
                  //          echo 'Tgl bpkbSIDStatusBuktiKepemilikan ' .$bpkbSIDStatusBuktiKepemilikan  . '<br>';
                  //          echo 'Tgl bpkbSIDAlamat ' .$bpkbSIDAlamat  . '<br>';
                  //          echo 'Tgl bpkbSIDLokasi ' .$bpkbSIDLokasi  . '<br>';
                  //          echo 'Tgl bpkbSIDNJOP ' .$bpkbSIDNJOP  . '<br>';
                  //          echo 'Tgl nilaiSIDAgunanBank ' .$nilaiSIDAgunanBank  . '<br>';
                  //          echo 'Tgl bpkbSIDNilaiIndependen ' .$bpkbSIDNilaiIndependen  . '<br>';
                  //          echo 'Tgl bpkbSIDNamaIndependen ' .$bpkbSIDNamaIndependen  . '<br>';
                  //          echo 'Tgl bpkbSIDParipasu ' .$bpkbSIDParipasu  . '<br>';
                  //          echo 'Tgl bpkbSIDAsuransi ' .$bpkbSIDAsuransi  . '<br>';
                  //           // END FORM TAMBAH SERTIFIKAT ///

             ?>
             <!--END Test keluarin variable -->
                <input type="hidden" name="test" value="<?php// echo $user_access_id;?>">


                <a href="<?php echo base_url(); ?>index.php/AsetDokumenEntryController/index" type="button" style="margin:5px;" class="btn btn-danger">Kembali</a>
                <button type="submit" id='btnSubmit' style="margin:5px;" class="btn btn-info">Simpan</button>
            </div>
            <!-- /.card-footer -->
            </form>
      </div>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
 <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">

<!-- REQUIRED JS SCRIPTS -->

	<?php
        echo $footer;
        //echo $ctrlbar;
        echo $js;
        echo $modalRekening;
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

          $(document).ready(function() {
                $('#example').DataTable( {
                    "scrollX": true,
                    "autoWidth" : true,
                    "aaSorting" : []
                } );
            } );
            $(document).ready(function() {
                $('#example1').DataTable( {
                    "scrollX": true,
                    "autoWidth" : true,
                    "aaSorting" : []
                } );
            } );
            $(document).ready(function() {
                $('#example2').DataTable( {
                    "scrollX": true,
                    "autoWidth" : true,
                    "aaSorting" : []
                } );
            } );
            

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
        <script type="text/javascript" src="<?php echo base_url(); ?>assets/design/js/js_centro/tambah_aset_dokumen.js"></script>
</body>
</html>