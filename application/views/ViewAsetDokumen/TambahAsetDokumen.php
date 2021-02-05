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
                          <form method="post" action="<?php echo base_url("AsetDokumenEntryController/insertDataToDB")?>">
                          <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="mainAreaKerja">Area Kerja</label>
                                  </div>
                                  <div class="col-sm-5"> 
                                  
                                    <select class="form-control select2" id="mainAreaKerja" name="mainAreaKerja" required>
                                                <?php if($this->session->tempdata('mainAreaKerja') != null){
                                                  echo '<option value="'.$this->session->tempdata('mainAreaKerja').'" selected>'.$this->session->tempdata('mainAreaKerja').'</option>';
                                                } else {?> 
                                                    <option value="<?php echo $this->session->userdata('kd_cabang'); ?>" selected><?php echo $this->session->userdata('kd_cabang'); ?></option>
                                                <?php }?>                                                
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
                                  <?php if($this->session->tempdata('mainTanggal') != null){ 
                                      echo '<input readonly type="date" class="form-control" id="mainTanggal" name="mainTanggal" value="'.$this->session->tempdata('mainTanggal').'" placeholder="">';
                                  } else {?>
                                  <?php foreach ($sysdate as $row) : ?>
                                      <input readonly type="date" class="form-control" id="mainTanggal" name='mainTanggal' value="<?php echo $row['sysdate'];?>" placeholder="">
                                    <?php endforeach;
                                  }?>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainTransaksi">Transaksi</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control select2" id="mainTransaksi" name="mainTransaksi" readonly>
                                            <?php if($this->session->tempdata('mainTransaksi') != null){ 
                                              echo '<option  value="'.$this->session->tempdata('mainTransaksi').'" selected>'.$this->session->tempdata('mainTransaksi').'</option>';
                                            }?>
                                            <option  value="MASUK"><?php echo 'MASUK';?></option>
                                            <option  value="WAITING"><?php echo 'WAITING';?></option>
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
                                    <input type="text" class="form-control" id="mainNama" name='mainNama' value="<?php echo $this->session->tempdata('mainNama'); ?>">
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="mainKeterangan">Keterangan</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <textarea style="height: 100px;" type="text" class="form-control" id="mainKeterangan" name='mainKeterangan'><?php echo $this->session->tempdata('mainKeterangan'); ?></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainAlamat">Alamat</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <textarea style="height: 100px;" type="text" class="form-control" id="mainAlamat" name="mainAlamat"><?php echo $this->session->tempdata('mainAlamat'); ?></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainKota">Kota/Kabupaten</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <input type="text" class="form-control" id="mainKota" name="mainKota" value="<?php echo $this->session->tempdata('mainKota'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainJenisPengurusan">Jenis Pengurusan</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <input type="text" class="form-control" id="mainJenisPengurusan" name="mainJenisPengurusan" value="<?php echo $this->session->tempdata('mainJenisPengurusan'); ?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainNomorRekening">Nomor Rekening</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="mainNomorRekening" name="mainNomorRekening" 
                                            value="<?php echo $this->session->tempdata('mainNomorRekening'); ?>" 
                                            onclick="dataRekening()"
                                            required>
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
                                    <input type="text" class="form-control" id="mainNamaNasabah" name="mainNamaNasabah" readonly value="<?php echo $this->session->tempdata('mainNamaNasabah'); ?>">
                                  </div>
                              </div>

                          <!-- Form ATAS -->
                      </div>
                  </div>
              </div>
                              
            <div class="tab">
              <button type='button' class="tablinks" id='main_tab_bpkb' onclick="openTab(event, 'BPKB')">BPKB</button>
              <button type='button' class="tablinks" id='main_tab_sert' onclick="openTab(event, 'Sertifikat')">Sertifikat</button>
              <!-- <button type='button' class="tablinks" id='main_tab_emas' onclick="openTab(event, 'Emas')">Emas</button> -->
            </div>

            <!-- Start BPKB -->
            <div id="BPKB" class="tabcontent">
                <br>
                <div class="row">
                   <div class="col-md-12 mx-auto">
                    <button type="button" class="btn btn-primary btn-sm" id="btnTambahBPKB" style="width:250px;"> 
                      <i class="fas fa-plus-circle"></i> 
                      <?php if($bpkbAgunanID != null){
                        echo "Edit";
                      }else { echo "Tambah";}
                      ?>
                    </button> 
                   </div>
                </div>
                <br>
              <table id="" class="table table-striped table-bordered display" style="width:100%">
                      <thead>
                          <tr>
                              <th>Agunan&nbsp;ID</th>
                              <th>No.&nbsp;BPKB</th>
                              <th>Nama Pemilik</th>
                              <th>Alamat&nbsp;Pemilik</th>
                              <th>No.&nbsp;Polisi</th>
                              <!-- <th>Verifikasi</th> -->
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><p id='rowBPKBAgunanID'><?php echo $bpkbAgunanID; ?></p></td> 
                              <td><p id='rowBPKBNoBpkb'><?php echo $bpkbNoBPKB; ?></p></p></td> 
                              <td><p id='rowBPKBNamaPemilik'><?php echo $bpkbNamaPemilik; ?></p></td> 
                              <td><p id='rowBPKBAlamat'><?php echo $bpkbAlamatPemlik; ?></p></td>
                              <td><p id='rowBPKBNoPolisi'><?php echo $bpkbNoPolisi; ?></p></td> 
                              <!-- <td><p id='rowBPKBVerif'><?php //echo 'Verifikasi'; ?></p></td>    -->
                              <td>                                                           
                                <?php if($bpkbAgunanID != null){
                                ?>
                                  <button type="button" class="btn btn-danger btn-sm" 
                                          id="deleteTempBPKB"
                                          data-toggle="tooltip" 
                                          data-placement="bottom" 
                                          title="Hapus"
                                          name="deleteTempBPKB"> 
                                          <i class="fa fa-trash"></i>
                                  </button>
                                <?php
                                } ?>
                              </td> 
                             
                          </tr>
                      </tbody>
              </table>  
            </div>
            <!-- END BPKB -->

            <!-- Start Sertifikat -->
            <div id="Sertifikat" class="tabcontent">
                <br>
                <div class="row">
                   <div class="col-md-12 mx-auto">
                     <button type="button" class="btn btn-primary btn-sm" id="btnTambahSertif" style="width:250px;"> 
                         <i class="fas fa-plus-circle"></i>
                         <?php if($sertAgunanID != null){
                           echo "Edit";
                         }else { echo "Tambah";}
                         ?>
                     </button> 
                   </div>
                </div>
                <br>
                
                <table id="" class="table table-striped table-bordered display" style="width:100%">
                    <thead>
                        <tr>
                            <th>Agunan&nbsp;ID</th>
                            <th>No&nbsp;Sertifikat</th>
                            <th>Jenis</th>
                            <th>Tanggal&nbsp;Surat</th>
                            <th>Luas Tanah</th>
                            <th>Nama&nbsp;Pemilik</th>
                            <!-- <th>Verifikasi</th> -->
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><p id='rowSertAgunanID'><?php echo $sertAgunanID; ?></p></td> 
                            <td><p id='rowSertNoSertif'><?php echo $sertNoSert;?></p></td>
                            <td><p id='rowSertJenis'><?php echo $sertJenisSertifikat; ?></p></td> 
                            <td><p id='rowSertTanggal'><?php echo $sertTanggalSertifikat; ?></p></td>
                            <td><p id='rowSertLuasTanah'><?php echo $sertLuasTanah; ?></p></td>
                            <td><p id='rowSertPemilik'><?php echo $sertNamaPemilik; ?></p></td>
                            <!-- <td><p id='rowSertVerif'><?php // echo 'Verifikasi'; ?></p></td> -->
                            <td>                            
                              <?php if($sertAgunanID != null){
                              ?>
                                <button type="button" class="btn btn-danger btn-sm" 
                                        id="delTempSert"
                                        data-toggle="tooltip" 
                                        data-placement="bottom" 
                                        title="Hapus"
                                        name="delTempSert"> 
                                        <i class="fa fa-trash"></i>
                                </button>
                              <?php
                              } ?>
                                
                            </td>
                        </tr>
                    </tbody>
                </table> 
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
                          <td><p id='rowEmasAgunanID'><?php echo $emasAgunanID; ?></p></td>
                          <td><p id='rowEmasNoSeri'><?php echo $emasNoSeri; ?></p></td>
                          <td><p id='rowEmasJenis'><?php echo $emasJenisEmas; ?></p></td>
                          <td><p id='rowEmasKarat'><?php echo $emasBerat; ?></p></td>
                          <td><p id='rowEmasGram'><?php echo $emasBerat; ?></p></td>
                          <td><p id='rowEmasHargaPasar'><?php echo $emasHargaPasar; ?></p></td>
                          <td><p id='rowEmasVerif'><?php echo 'Verifikasi'; ?></p></td>
                          <td> 
                              <button type="button" class="btn btn-danger btn-sm" 
                                      id="delTempEmas"
                                      data-toggle="tooltip" 
                                      data-placement="bottom" 
                                      title="Hapus"
                                      name="delTempEmas"> 
                                      <i class="fa fa-trash"></i>
                              </button>
                          </td>
                        </tr>
                    </tbody>
                </table>
                    <a type="button" class="btn btn-primary btn-sm" id="btnTambahBPKB"> <i class="fa fa-pencil-square-o"></i> Tambah</a>  
                    
            </div>
            <!-- END Emas -->


             <div class="card-footer text-center">
             <!--END Test keluarin variable -->
                <button type="button" id='btnKembali' style="margin:5px;" class="btn btn-danger"> Kembali </button>
                <button type="button" id='btnSubmit' class="btn btn-info"> Simpan </button>
            </form>
          </div>
          <!-- /.card-footer -->
      </div>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
 <input type="hidden" class="form-control" id="base_url" name="base_url" value = "<?php echo base_url(); ?>">

 <input type="hidden" class="form-control" id="sertTglRegister" name="sertTglRegister" value = "<?php echo $sertTglRegister;?>">
 <input type="hidden" class="form-control" id="bpkbTglRegister" name="bpkbTglRegister" value = "<?php echo $bpkbTglRegister;?>">

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
              
              .modal-backdrop {
                width: 100% !important;
                height: 100% !important;
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