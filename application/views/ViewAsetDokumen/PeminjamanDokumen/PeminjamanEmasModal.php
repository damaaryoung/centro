<!-- Modal -->
<div class="modal fade" id="peminjamanEmasModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style="margin-bottom:50px; width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Peminjaman Data Aset Dokumen Emas</h3>
        <button type="button" class="close"  id="emas_button_kembali_pinjam2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!--Start Modal Body-->
      <div class="modal-body">  
          
            <div class="tab">
              <button type='button' class="tablinks" onclick="openTab(event, 'DataEmasPinjam')">Data Emas</button>
              <button type='button' class="tablinks" onclick="openTab(event, 'SIDEmasPinjam')">SID</button>
            </div>

            <!-- Start Data Emas -->
            <div id="DataEmasPinjam" class="tabcontent">
                <div class="row">
                      <div class="col-md-10 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasAgunanIDPinjam">Agunan ID</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="text" class="form-control" id="emasAgunanIDPinjam" name='emasAgunanIDPinjam' readonly>
                                  </div>
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="emasVerifikasiPinjam">Verifikasi</label>
                                  </div>
                                  <div class="col-sm-2">
                                      <input class="form-control select2" id="emasVerifikasiPinjam" name="emasVerifikasiPinjam" disabled>
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasNoSeriPinjam">No Seri</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="text" class="form-control" id="emasNoSeriPinjam" name="emasNoSeriPinjam" placeholder="" required>
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasJenisEmasPinjam">Jenis Emas</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="emasJenisEmasPinjam" name="emasJenisEmasPinjam">
                                        </select>
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasKaratPinjam">Karat</label>
                                  </div>
                                  <div class="col-sm-2">
                                  <input type="number" class="form-control" id="emasKaratPinjam" name='emasKaratPinjam' placeholder="">
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="">Berat (Gram)</label>
                                  </div>
                                  <div class="col-sm-2">
                                  <input type="number" class="form-control" id="emasBeratPinjam" name="emasBeratPinjam" placeholder="">
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="">Harga Pasar</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="number" class="form-control" id="emasHargaPasarPinjam" name='emasHargaPasarPinjam' placeholder="">
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="">Harga Taksasi</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="number" class="form-control" id="emasHargaTaksasiPinjam" name='emasHargaTaksasiPinjam' placeholder="">
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                  </div>
            </div>
            <!-- END Data Emas -->

             <!-- Start SID -->
            <div id="SIDEmasPinjam" class="tabcontent">
                <div class="row">
                        <div class="col-md-10 mx-auto">
                        <br><br>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDJenisAgunanPinjam">Jenis Agunan</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDJenisAgunanPinjam" name="emasSIDJenisAgunanPinjam" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDPeringkatSuratPinjam">Pengikat Surat Berharga</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDPeringkatSuratPinjam" name="emasSIDPeringkatSuratPinjam" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>   
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDJenisPengikatanPinjam">Jenis Pengikatan</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDJenisPengikatanPinjam" name="emasSIDJenisPengikatanPinjam" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>   
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNamaPemilikAgunanPinjam">Nama Pemilik Agunan</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="emasSIDNamaPemilikAgunanPinjam" name='emasSIDNamaPemilikAgunanPinjam'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDStatusPinjam">Status/Bukti Kepemilikan</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="emasSIDStatusPinjam" name='emasSIDStatusPinjam' value='SERTIFIKAT'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDAlamatPinjam">Alamat</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="emasSIDAlamatPinjam" name='emasSIDAlamatPinjam'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDLokasiPinjam">Lokasi</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDLokasiPinjam" name="emasSIDLokasiPinjam" disabled>
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNJOPPinjam">Nilai Agunan (NJOP)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDNJOPPinjam" name="emasSIDNJOPPinjam">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDBankPinjam">Nilai Agunan (Bank)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDBankPinjam" name='emasSIDBankPinjam'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNilaiIndependenPinjam">Nilai Agunan Independen</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDNilaiIndependenPinjam" name='emasSIDNilaiIndependenPinjam'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNamaIndependenPinjam">Nama Penilai Independen</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="text" class="form-control" id="emasSIDNamaIndependenPinjam" name='emasSIDNamaIndependenPinjam'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDTglPenilaianPinjam">Tanggal Penilaian</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="date" class="form-control" id="emasSIDTglPenilaianPinjam" name='emasSIDTglPenilaianPinjam'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDParipasuPinjam">Paripasu (%)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDParipasuPinjam" name='emasSIDParipasuPinjam'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDAsuransiPinjam">Asuransi</label>
                                    </div>
                                    <div class="col-sm-3">
                                            <select class="form-control select2" id="emasSIDAsuransiPinjam" name="emasSIDAsuransiPinjam">
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

            <input type="hidden" class="form-control" id="emasIDPinjam" name="emasIDPinjam">
            <input type="hidden" class="form-control" id="emasNoReffPinjam" name="emasNoReffPinjam">

           
      </div>
      <!--END Modal Body-->
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" id="emas_button_kembali_pinjam" class="btn btn-danger">Kembali</button>
      </div>
    </div>
  </div>
</div>

