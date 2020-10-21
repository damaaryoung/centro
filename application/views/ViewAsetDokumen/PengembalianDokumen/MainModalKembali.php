<!-- Modal -->
<div class="modal fade" id="KembaliMainModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style=" width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Pengembalian Data Aset Dokumen</h3>
        <button type="button" class="close" id="btn_kembali_kembali_modal2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      
      <div id="loading5">
              <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>
           <!--- FORM ATAS ------>
           <div class="row">
                  <div class="col-md-12 mx-auto">
                             <div class="form-group row">
                                  <div class="col-sm-7">
                                  </div>
                                  <div class="col-sm-1">
                                    <label style="padding-top: 6px;" class="control-label" for="mainVerifikasiKembali">Verifikasi</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input class="form-control select2" id="mainVerifikasiKembali" name="mainVerifikasiKembali" disabled>
                                  </div>
                              </div>     
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="mainAreaKerjaKembali">Area Kerja</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <select class="form-control select2" id="mainAreaKerjaKembali" name="mainAreaKerjaKembali" required>
                                    </select>
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggalKembali">Tanggal</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input readonly type="date" class="form-control" id="mainTanggalKembali" name='mainTanggalKembali' >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainTransaksiKembali">Transaksi</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control select2" id="mainTransaksiKembali" name="mainTransaksiKembali" readonly>
                                          <option value="MASUK">MASUK</option> 
                                        </select>
                                  </div>
                                  <div class="col-sm-3">
                                        <label style="padding-left: 30px; padding-top: 6px;" class="checkbox-inline"><input type="checkbox" id="mainTakeoverKembali"  onclick="return false">&nbsp;Take Over</label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainNamaKembali">Nama</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="mainNamaKembali" name='mainNamaKembali' readonly>
                                  </div>
                                  <div class="col-sm-1">
                                    <button type="button" class="btn btn-sm btn-success" id="" data-toggle="modal" disabled>
                                      <i class="fa fa-search"></i>
                                    </button>
                                  </div>
                                  <div class="col-sm-1">
                                      <label style="padding-top: 5px;" class="control-label" for="mainKeteranganKembali">Keterangan</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <textarea style="height: 100px;" type="text" class="form-control" id="mainKeteranganKembali" name='mainKeteranganKembali' ></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainAlamatKembali">Alamat</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <textarea style="height: 100px;" type="text" class="form-control" id="mainAlamatKembali" name="mainAlamatKembali" readonly></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainKotaKembali">Kota/Kabupaten</label>
                                  </div>
                                  <div class="col-sm-5">
                                    <input type="text" class="form-control" id="mainKotaKembali" name="mainKotaKembali" readonly>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainJenisPengurusanKembali">Jenis Pengurusan</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="mainJenisPengurusanKembali" name="mainJenisPengurusanKembali" readonly>
                                  </div>
                                  <div class="col-sm-1">
                                    <button type="button" class="btn btn-sm btn-success" id="btn_cari_jenis_pengurusan_kembali" disabled><i class="fa fa-search"></i></button>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggalRencanaKembali">Tanggal Rencana Kembali</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input readonly type="date" class="form-control" id="mainTanggalRencanaKembali" name="mainTanggalRencanaKembali">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label style="padding-top: 6px;" class="control-label" for="mainNomorRekeningKembali">Nomor Rekening</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="mainNomorRekeningKembali" name="mainNomorRekeningKembali">
                                  </div>
                                  <div class="col-sm-1">
                                      <button type="button" class="btn btn-success btn-sm"> <i class="fa fa-search"> </i></button>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="mainTanggalRealisasiKembali">Tanggal Realisasi</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input readonly type="date" class="form-control" id="mainTanggalRealisasiKembali" name="mainTanggalRealisasiKembali" value="">
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                  </div>

                  <div class="tab">
                    <button type='button' class="tablinks" id='main_tab_bpkbKembali' onclick="openTab(event, 'kembaliBPKB')">BPKB</button>
                    <button type='button' class="tablinks" id='main_tab_sertKembali' onclick="openTab(event, 'kembaliSertifikat')">Sertifikat</button>
                    <!-- <button type='button' class="tablinks" id='main_tab_emasKembali' onclick="openTab(event, 'kembaliEmas')">Emas</button> -->
                  </div>

                  <!-- Start BPKB -->
                  <div id="kembaliBPKB" class="tabcontent">
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
                                    <td><p id='rowBPKBAgunanIDKembali'></p></td> 
                                    <td><p id='rowBPKBNoBpkbKembali'></p></td> 
                                    <td><p id='rowBPKBNamaPemilikKembali'></p></td> 
                                    <td><p id='rowBPKBAlamatKembali'></p></td>
                                    <td><p id='rowBPKBNoPolisiKembali'></p></td> 
                                    <td><p id='rowBPKBVerifKembali'></p></td>
                                </tr>
                            </tbody>
                    </table>
                        <a type="button" data-toggle="modal" data-target="#kembaliBPKBModal"
                            class="btn btn-primary btn-sm" id="btnKembaliBPKB" >  
                        <i class="fa fa-pencil-square-o"></i> Detail</a>  
                                      
                  </div>
                  <!-- END BPKB -->

                  <!-- Start Sertifikat -->
                  <div id="kembaliSertifikat" class="tabcontent">
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
                                  <td><p id='rowSertAgunanIDKembali'></p></td> 
                                  <td><p id='rowSertNoSertifKembali'></p></td>
                                  <td><p id='rowSertJenisKembali'></p></td> 
                                  <td><p id='rowSertTanggalKembali'></p></td>
                                  <td><p id='rowSertLuasTanahKembali'></p></td>
                                  <td><p id='rowSertPemilikKembali'></p></td>
                                  <td><p id='rowSertVerifKembali'></p></td>
                              </tr>
                          </tbody>
                      </table>
                        <a type="button" data-toggle="modal" data-target="#kembaliSertifikatModal"
                            class="btn btn-primary btn-sm" id="btnKembaliSertif" >  
                         <i class="fa fa-pencil-square-o"></i> Detail</a>  
                  </div>
                  <!-- End Sertifikat -->

                  <!-- Start Emas -->
                  <div id="kembaliEmas" class="tabcontent">

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
                                  <td><p id='rowEmasAgunanIDKembali'></p></td>
                                  <td><p id='rowEmasNoSeriKembali'></p></td>
                                  <td><p id='rowEmasJenisKembali'></p></td>
                                  <td><p id='rowEmasKaratKembali'></p></td>
                                  <td><p id='rowEmasGramKembali'></p></td>
                                  <td><p id='rowEmasHargaPasarKembali'></p></td>
                                  <td><p id='rowEmasVerifKembali'></p></td>
                                </tr>
                            </tbody>
                        </table>
                          <a type="button" data-toggle="modal" data-target="#kembaliEmasModal"
                              class="btn btn-primary btn-sm" id="btnKembaliSertif">  
                          <i class="fa fa-pencil-square-o"></i> Detail</a> 
                  </div>
                    <!-- END Emas -->


              <!--- END FORM ATAS --------->
              <input type="hidden" class="form-control" id="mainIdKembali" name="mainId">
              <input type="hidden" class="form-control" id="mainNomorKembali" name="mainNomor">
              <input type="hidden" class="form-control" id="mainNoReffKembali" name="mainNoReff">



      </div>
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" class="btn btn-danger"  id="btn_kembali_kembali_modal">Kembali</button>
        <button type="button" class="btn btn-primary" id="btn_simpan_modal_kembali" >Simpan</button>
      </div>
    </div>
  </div>
</div>