<!-- Modal -->
<div class="modal fade" id="PeminjamanMainModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style=" width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Peminjaman Data Aset Dokumen</h3>
        <button type="button" class="close" id="btn_kembali_pinjam_modal2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
      <div id="loading2">
              <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>
           <!--- FORM ATAS ------>
           <div class="row">
                  <div class="col-md-11 mx-auto">
                          
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="mainAreaKerja">Area Kerja</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <select class="form-control select2" id="mainAreaKerjaPinjam" name="mainAreaKerjaPinjam" required>
                                    </select>
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggal">Tanggal</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input readonly type="date" class="form-control" id="mainTanggalPinjam" name='mainTanggalPinjam' >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainTransaksi">Transaksi</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control select2" id="mainTransaksiPinjam" name="mainTransaksi" readonly>
                                          <option value="PINJAM">PINJAM</option> 
                                        </select>
                                  </div>
                                  <div class="col-sm-3">
                                        <label style="padding-left: 30px; padding-top: 6px;" class="checkbox-inline"><input type="checkbox" id="mainTakeover"  onclick="return false">&nbsp;Take Over</label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainNamaPinjam">Nama</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="mainNamaPinjam" name='mainNamaPinjam' readonly>
                                  </div>
                                  <div class="col-sm-1">
                                    <button type="button" class="btn btn-sm btn-success" id="btn_cari_notaris" data-toggle="modal" >
                                      <i class="fa fa-search"></i>
                                    </button>
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="mainKeterangan">Keterangan</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <textarea style="height: 100px;" type="text" class="form-control" id="mainKeteranganPinjam" name='mainKeteranganPinjam' ></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainAlamatPinjam">Alamat</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <textarea style="height: 100px;" type="text" class="form-control" id="mainAlamatPinjam" name="mainAlamatPinjam" readonly></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainKotaPinjam">Kota</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <input type="text" class="form-control" id="mainKotaPinjam" name="mainKotaPinjam" readonly>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainJenisPengurusan">Jenis Pengurusan</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="mainJenisPengurusanPinjam" name="mainJenisPengurusanPinjam" readonly>
                                  </div>
                                  <div class="col-sm-1">
                                    <button type="button" class="btn btn-sm btn-success" id="btn_cari_jenis_pengurusan"><i class="fa fa-search"></i></button>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggalRencanaKembaliPinjam">Tanggal Rencana Kembali</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input readonly type="date" class="form-control" id="mainTanggalRencanaKembaliPinjam" name="mainTanggalRencanaKembaliPinjam" value="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainNomorRekening">Nomor Rekening</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="mainNomorRekeningPinjam" name="mainNomorRekeningPinjam">
                                  </div>
                                  <div class="col-sm-1">
                                      <button type="button" class="btn btn-success btn-sm"> <i class="fa fa-search"> </i></button>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggalRealisasiPinjam">Tanggal Realisasi</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input readonly type="date" class="form-control" id="mainTanggalRealisasiPinjam" name="mainTanggalRealisasiPinjam" value="">
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                  </div>

                  <div class="tab">
                    <button type='button' class="tablinks" id='main_tab_bpkbPinjam' onclick="openTab(event, 'pinjamBPKB')">BPKB</button>
                    <button type='button' class="tablinks" id='main_tab_sertPinjam' onclick="openTab(event, 'pinjamSertifikat')">Sertifikat</button>
                    <button type='button' class="tablinks" id='main_tab_emasPinjam' onclick="openTab(event, 'pinjamEmas')">Emas</button>
                  </div>

                  <!-- Start BPKB -->
                  <div id="pinjamBPKB" class="tabcontent">
                    <table id="" class="table table-striped table-bordered display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Agunan&nbsp;ID</th>
                                    <th>No.&nbsp;BPKB</th>
                                    <th>Nama Pemilik</th>
                                    <th>Alamat&nbsp;Pemilik</th>
                                    <th>No.&nbsp;Polisi</th>
                                    <th>Verifikasi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><p id='rowBPKBAgunanIDPinjam'></p></td> 
                                    <td><p id='rowBPKBNoBpkbPinjam'></p></td> 
                                    <td><p id='rowBPKBNamaPemilikPinjam'></p></td> 
                                    <td><p id='rowBPKBAlamatPinjam'></p></td>
                                    <td><p id='rowBPKBNoPolisiPinjam'></p></td> 
                                    <td><p id='rowBPKBVerifPinjam'></p></td>
                                </tr>
                            </tbody>
                    </table>
                        <a type="button" data-toggle="modal" data-target="#peminjamanBPKBModal"
                            class="btn btn-primary btn-sm" id="btnPinjamBPKB" >  
                        <i class="fa fa-pencil-square-o"></i> Detail</a>  
                                      
                  </div>
                  <!-- END BPKB -->

                  <!-- Start Sertifikat -->
                  <div id="pinjamSertifikat" class="tabcontent">
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
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td><p id='rowSertAgunanIDPinjam'></p></td> 
                                  <td><p id='rowSertNoSertifPinjam'></p></td>
                                  <td><p id='rowSertJenisPinjam'></p></td> 
                                  <td><p id='rowSertTanggalPinjam'></p></td>
                                  <td><p id='rowSertLuasTanahPinjam'></p></td>
                                  <td><p id='rowSertPemilikPinjam'></p></td>
                                  <td><p id='rowSertVerifPinjam'></p></td>
                              </tr>
                          </tbody>
                      </table>
                        <a type="button" data-toggle="modal" data-target="#pinjamSertifikatModal"
                            class="btn btn-primary btn-sm" id="btnPinjamSertif" >  
                         <i class="fa fa-pencil-square-o"></i> Detail</a>  
                  </div>
                  <!-- End Sertifikat -->

                  <!-- Start Emas -->
                  <div id="pinjamEmas" class="tabcontent">

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
                                  <td><p id='rowEmasAgunanIDPinjam'></p></td>
                                  <td><p id='rowEmasNoSeriPinjam'></p></td>
                                  <td><p id='rowEmasJenisPinjam'></p></td>
                                  <td><p id='rowEmasKaratPinjam'></p></td>
                                  <td><p id='rowEmasGramPinjam'></p></td>
                                  <td><p id='rowEmasHargaPasarPinjam'></p></td>
                                  <td><p id='rowEmasVerifPinjam'></p></td>
                                </tr>
                            </tbody>
                        </table>
                          <a type="button" data-toggle="modal" data-target="#peminjamanEmasModal"
                              class="btn btn-primary btn-sm" id="btnPinjamSertif" >  
                          <i class="fa fa-pencil-square-o"></i> Detail</a> 
                  </div>
                    <!-- END Emas -->


              <!--- END FORM ATAS --------->
              <input type="hidden" class="form-control" id="mainIdPinjam" name="mainId">
              <input type="hidden" class="form-control" id="mainNomorPinjam" name="mainNomor">
              <input type="hidden" class="form-control" id="mainNoReffPinjam" name="mainNoReff">



      </div>
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" class="btn btn-danger"  id="btn_kembali_pinjam_modal">Kembali</button>
        <button type="button" class="btn btn-primary" id="btn_simpan_modal_pinjam" >Simpan</button>
      </div>
    </div>
  </div>
</div>






<!-- Modal -->
<div class="modal fade" id="ListNotarisModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style="width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Data Master Notaris / Biro Jasa</h3>
        <button type="button" class="close" id="btn_kembali_notaris_modal2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

              <!-- Data Tables -->
    <div class="box">
    <div id="loading3">
              <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>
            <div class="box-body">
            <table id="notarisTable" class="table table-striped table-bordered" style="width:100% text-align:center" >
              <thead>
                  <tr>
                      <th style="width:50px;">Kode</th>
                      <th style="width:50px;">Nama&nbsp;Notaris&nbsp;/&nbsp;Biro&nbsp;Jasa</th>
                      <th style="width:50px;">Flag&nbsp;Aktif</th>
                      <th style="width:50px;">Action</th>
                  </tr>
              </thead>
              <tbody id="bodyNotaris">           
              </tbody>
          </table>
            </div>
            <!-- /.box-body -->
          </div>
    
      </div>
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" class="btn btn-danger"  id="btn_kembali_notaris_modal">Kembali</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="ListJaminanPengurusanModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style="width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Data Master Jenis Pengurusan</h3>
        <button type="button" class="close" id="btn_kembali_jenisPengurusan_modal2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

    <!-- Data Tables -->
    <div class="box">
    <div id="loading4">
              <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>
            <div class="box-body">
            <table id="JenisPengurusanTable" class="table table-striped table-bordered" style="width:100% text-align:center" >
              <thead>
                  <tr>
                      <th style="width:50px;">Kode</th>
                      <th style="width:50px;">Jenis&nbsp;Pengurusan</th>
                      <th style="width:50px;">Jangka&nbsp;Waktu(Hari)</th>
                      <th style="width:50px;">Flag&nbsp;Aktif</th>
                      <th style="width:50px;">Action</th>
                  </tr>
              </thead>
              <tbody id="bodyJenisPengurusan">
              </tbody>
          </table>
            </div>
            <!-- /.box-body -->
          </div>

      </div>
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" class="btn btn-danger"  id="btn_kembali_jenisPengurusan_modal">Kembali</button>
      </div>
    </div>
  </div>
</div>


