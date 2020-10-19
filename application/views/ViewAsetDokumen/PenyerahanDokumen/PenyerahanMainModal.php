<!-- Modal -->
<div class="modal fade" id="PenyerahanMainModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style=" width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Penyerahan Data Aset Dokumen</h3>
        <button type="button" class="close" id="btn_kembali_penyerahan_modal2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
      <div id="loadingPenyerahan">
              <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>
           <!--- FORM ATAS ------>
           <div class="row">
                  <div class="col-md-11 mx-auto">
                             <div class="form-group row">
                                  <div class="col-sm-7">
                                  </div>
                                  <div class="col-sm-1">
                                    <label style="padding-top: 6px;" class="control-label" for="mainVerifikasiPenyerahan">Verifikasi</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input class="form-control select2" id="mainVerifikasiPenyerahan" name="mainVerifikasiPenyerahan" disabled>
                                  </div>
                              </div>                                
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="mainAreaKerja">Area Kerja</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <select class="form-control select2" id="mainAreaKerjaPenyerahan" name="mainAreaKerjaPenyerahan" required>
                                    </select>
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggal">Tanggal</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input readonly type="date" class="form-control" id="mainTanggalPenyerahan" name='mainTanggalPenyerahan' >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainTransaksi">Transaksi</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control select2" id="mainTransaksiPenyerahan" name="mainTransaksi" readonly>
                                          <option value="KELUAR">KELUAR</option> 
                                        </select>
                                  </div>
                                  <div class="col-sm-3">
                                        <label style="padding-left: 30px; padding-top: 6px;" class="checkbox-inline"><input type="checkbox" id="mainTakeover"  onclick="return false">&nbsp;Take Over</label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainNamaPenyerahan">Nama</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="mainNamaPenyerahan" name='mainNamaPenyerahan' readonly>
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
                                    <textarea style="height: 100px;" type="text" class="form-control" id="mainKeteranganPenyerahan" name='mainKeteranganPenyerahan' ></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainAlamatPenyerahan">Alamat</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <textarea style="height: 100px;" type="text" class="form-control" id="mainAlamatPenyerahan" name="mainAlamatPenyerahan" readonly></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainKotaPenyerahan">Kota/Kabupaten</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <input type="text" class="form-control" id="mainKotaPenyerahan" name="mainKotaPenyerahan" readonly>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainJenisPengurusan">Jenis Pengurusan</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="mainJenisPengurusanPenyerahan" name="mainJenisPengurusanPenyerahan" readonly>
                                  </div>
                                  <div class="col-sm-1">
                                    <button type="button" class="btn btn-sm btn-success" id="btn_cari_jenis_pengurusan"><i class="fa fa-search"></i></button>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggalRencanaKembaliPenyerahan">Tanggal Rencana Kembali</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input readonly type="date" class="form-control" id="mainTanggalRencanaKembaliPenyerahan" name="mainTanggalRencanaKembaliPenyerahan" value="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainNomorRekening">Nomor Rekening</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="mainNomorRekeningPenyerahan" name="mainNomorRekeningPenyerahan" readonly>
                                  </div>
                                  <div class="col-sm-1">
                                      <button type="button" class="btn btn-success btn-sm"> <i class="fa fa-search"> </i></button>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggalRealisasiPenyerahan">Tanggal Realisasi</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input readonly type="date" class="form-control" id="mainTanggalRealisasiPenyerahan" name="mainTanggalRealisasiPenyerahan" value="">
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                  </div>

                  <div class="tab">
                    <button type='button' class="tablinks" id='main_tab_bpkbPenyerahan' onclick="openTab(event, 'penyerahanBPKB')">BPKB</button>
                    <button type='button' class="tablinks" id='main_tab_sertPenyerahan' onclick="openTab(event, 'penyerahanSertifikat')">Sertifikat</button>
                    <!-- <button type='button' class="tablinks" id='main_tab_emasPenyerahan' onclick="openTab(event, 'penyerahanEmas')">Emas</button> -->
                  </div>

                  <!-- Start BPKB -->
                  <div id="penyerahanBPKB" class="tabcontent">
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
                                    <td><p id='rowBPKBAgunanIDPenyerahan'></p></td> 
                                    <td><p id='rowBPKBNoBpkbPenyerahan'></p></td> 
                                    <td><p id='rowBPKBNamaPemilikPenyerahan'></p></td> 
                                    <td><p id='rowBPKBAlamatPenyerahan'></p></td>
                                    <td><p id='rowBPKBNoPolisiPenyerahan'></p></td> 
                                    <td><p id='rowBPKBVerifPenyerahan'></p></td>
                                </tr>
                            </tbody>
                    </table>
                        <a type="button" data-toggle="modal" data-target="#penyerahanBPKBModal"
                            class="btn btn-primary btn-sm" id="btnPenyerahanBPKB" >  
                        <i class="fa fa-pencil-square-o"></i> Detail</a>  
                                      
                  </div>
                  <!-- END BPKB -->

                  <!-- Start Sertifikat -->
                  <div id="penyerahanSertifikat" class="tabcontent">
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
                                  <td><p id='rowSertAgunanIDPenyerahan'></p></td> 
                                  <td><p id='rowSertNoSertifPenyerahan'></p></td>
                                  <td><p id='rowSertJenisPenyerahan'></p></td> 
                                  <td><p id='rowSertTanggalPenyerahan'></p></td>
                                  <td><p id='rowSertLuasTanahPenyerahan'></p></td>
                                  <td><p id='rowSertPemilikPenyerahan'></p></td>
                                  <td><p id='rowSertVerifPenyerahan'></p></td>
                              </tr>
                          </tbody>
                      </table>
                        <a type="button" data-toggle="modal" data-target="#penyerahanSertifikatModal"
                            class="btn btn-primary btn-sm" id="btnPenyerahanSertif" >  
                         <i class="fa fa-pencil-square-o"></i> Detail</a>  
                  </div>
                  <!-- End Sertifikat -->

                  <!-- Start Emas -->
                  <div id="penyerahanEmas" class="tabcontent">

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
                                  <td><p id='rowEmasAgunanIDPenyerahan'></p></td>
                                  <td><p id='rowEmasNoSeriPenyerahan'></p></td>
                                  <td><p id='rowEmasJenisPenyerahan'></p></td>
                                  <td><p id='rowEmasKaratPenyerahan'></p></td>
                                  <td><p id='rowEmasGramPenyerahan'></p></td>
                                  <td><p id='rowEmasHargaPasarPenyerahan'></p></td>
                                  <td><p id='rowEmasVerifPenyerahan'></p></td>
                                </tr>
                            </tbody>
                        </table>
                          <a type="button" data-toggle="modal" data-target="#penyerahanEmasModal"
                              class="btn btn-primary btn-sm" id="btnPenyerahanSertif" >  
                          <i class="fa fa-pencil-square-o"></i> Detail</a> 
                  </div>
                    <!-- END Emas -->


              <!--- END FORM ATAS --------->
              <input type="hidden" class="form-control" id="mainIdPenyerahan" name="mainId">
              <input type="hidden" class="form-control" id="mainNomorPenyerahan" name="mainNomor">
              <input type="hidden" class="form-control" id="mainNoReffPenyerahan" name="mainNoReff">



      </div>
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" class="btn btn-danger"  id="btn_kembali_penyerahan_modal">Kembali</button>
        <button type="button" class="btn btn-primary" id="btn_simpan_modal_penyerahan" >Simpan</button>
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


