<!-- Modal -->
<div class="modal fade" id="mainUpdateModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style="width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Update Data Aset Dokumen</h3>
        <button type="button" class="close" id="btn_kembali_update_modal2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
      <div id="loading1">
              <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>
           <!--- FORM ATAS ------>
           <div class="row">
                  <div class="col-md-11 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-7">
                                  </div>
                                  <div class="col-sm-1">
                                    <label style="padding-top: 6px;" class="control-label" for="mainVerifikasi">Verifikasi</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input class="form-control" id="mainVerifikasi" name="mainVerifikasi" disabled>
                                  </div>
                              </div>                          
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="mainAreaKerja">Area Kerja</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <select class="form-control" id="mainAreaKerja" name="mainAreaKerja" required>
                                    </select>
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggal">Tanggal</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input readonly type="date" class="form-control" id="mainTanggal" name='mainTanggal'>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainTransaksi">Transaksi</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control" id="mainTransaksi" name="mainTransaksi">
                                            
                                        </select>
                                  </div>
                                  <div class="col-sm-3">
                                        <label style="padding-left: 30px; padding-top: 6px;" class="checkbox-inline"><input type="checkbox" id="mainTakeover" value="">&nbsp;Take Over</label>
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
                                      <label style="padding-top: 6px;" class="control-label" for="mainKota">Kota/Kabupaten</label>
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
                                      <button type="button" class="btn btn-success btn-sm" id="mainBtnSearchRekening"> <i class="fa fa-search"> </i></button>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggalRealisasi">Tanggal Realisasi</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="mainTanggalRealisasi" name="mainTanggalRealisasi" value="">
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

                  <div class="tab">
                    <button type='button' class="tablinks" id='main_tab_bpkb' onclick="openTab(event, 'BPKB')">BPKB</button>
                    <button type='button' class="tablinks" id='main_tab_sert' onclick="openTab(event, 'Sertifikat')">Sertifikat</button>
                    <!-- <button type='button' class="tablinks" id='main_tab_emas' onclick="openTab(event, 'Emas')">Emas</button> -->
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
                                    <td><p id='rowBPKBAgunanID'></p></td> 
                                    <td><p id='rowBPKBNoBpkb'></p></td> 
                                    <td><p id='rowBPKBNamaPemilik'></p></td> 
                                    <td><p id='rowBPKBAlamat'></p></td>
                                    <td><p id='rowBPKBNoPolisi'></p></td> 
                                    <td><p id='rowBPKBVerif'></p></td> 
                                    <td><a type="button" data-toggle="modal" data-target="#updateBPKB"
                                        class="btn btn-primary btn-sm" id="btnUpdateBPKB" style="width: 150px; color:white;">  
                                        <i class="fas fa-info-circle"></i> Detail</a></td>                                 
                                </tr>
                            </tbody>
                    </table>
                                      
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
                                  <th style="width: 170px;">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td><p id='rowSertAgunanID'></p></td> 
                                  <td><p id='rowSertNoSertif'></p></td>
                                  <td><p id='rowSertJenis'></p></td> 
                                  <td><p id='rowSertTanggal'></p></td>
                                  <td><p id='rowSertLuasTanah'></p></td>
                                  <td><p id='rowSertPemilik'></p></td>
                                  <td><p id='rowSertVerif'></p></td>
                                  <td><a type="button" data-toggle="modal" data-target="#updateSertifikat"
                                        class="btn btn-primary btn-sm" id="btnUpdateSertif" style="width: 150px; color:white;">  
                                        <i class="fas fa-info-circle"></i> Detail</a></td>
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                  <td><p id='rowEmasAgunanID'></p></td>
                                  <td><p id='rowEmasNoSeri'></p></td>
                                  <td><p id='rowEmasJenis'></p></td>
                                  <td><p id='rowEmasKarat'></p></td>
                                  <td><p id='rowEmasGram'></p></td>
                                  <td><p id='rowEmasHargaPasar'></p></td>
                                  <td><p id='rowEmasVerif'></p></td>
                                </tr>
                            </tbody>
                        </table>
                          <a type="button" data-toggle="modal" data-target="#updateEmas"
                              class="btn btn-primary btn-sm" id="btnUpdateSertif" >  
                          <i class="fa fa-pencil-square-o"></i> Detail</a> 
                  </div>
                    <!-- END Emas -->


              <!--- END FORM ATAS --------->
              <input type="hidden" class="form-control" id="mainId" name="mainId">
              <input type="hidden" class="form-control" id="mainNomor" name="mainNomor">
              <input type="hidden" class="form-control" id="mainNoReff" name="mainNoReff">



      </div>
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" class="btn btn-danger"  id="btn_kembali_update_modal">Kembali</button>
        <button type="button" class="btn btn-primary" id="btn_simpan_update_modal" >Simpan</button>
      </div>
    </div>
  </div>
</div>



<!-- Modal -->
<div class="modal fade" id="modalNomorRekening" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style="width:1300px; overflow-y:auto; height: 700px;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Daftar Rekening Kredit</h3>
        <button type="button" class="close" id="btn_kembali_norek_modal2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

    <!-- Data Tables -->
    <div class="box">
    
    <div class="px-2 bg-light">
              <marquee class="py-3" direction="left" onmouseover="this.stop()" onmouseout="this.start()" style=" color:#ff0018">
                  Scroll ke Kanan Untuk Tombol Aksi
              </marquee>
    </div>
    <div class="form-inline" style="padding : 10px; float: right">
                    <div class="form-group">
                      <label for="email">Search</label> &nbsp; &nbsp;
                      <input type="text" class="form-control" name="searchRekeningUpdate" id="searchRekeningUpdate" onchange="serchDataRekening()"> 
                     &nbsp;&nbsp;
                    </div>
    </div>
    <div id="loading7">
              <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
    </div>
        <div class="card-body">
            <table id="TableNoRek" class="table table-striped table-bordered" style="width:100% text-align:center" >
              <thead>
                  <tr>
                      <th style="width:50px;">Nomor Rekening</th>
                      <th style="width:50px;">No&nbsp;Alternatif</th>
                      <th style="width:50px;">Nama&nbsp;Nasabah</th>
                      <th style="width:50px;">Alamat</th>
                      <th style="width:50px;">Jml&nbsp;Pinjaman</th>
                      <th style="width:50px;">Tgl&nbsp;Realisasi</th>
                      <th style="width:50px;">Tgl&nbsp;Jt&nbsp;Tempo</th>
                      <th style="width:50px;">Pokok&nbsp;Saldo&nbsp;Akhir</th>
                      <th style="width:50px;">Verifikasi</th>
                      <th style="width:50px;">Kode Kantor</th>
                      <th style="width:50px;">Action</th>
                  </tr>
              </thead>
              <tbody id="bodyNomorRekening">

              </tbody>
          </table>
            </div>
            <!-- /.box-body -->
          </div>

      </div>
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" class="btn btn-danger"  id="btn_kembali_norek_modal">Kembali</button>
      </div>
    </div>
  </div>
</div>


