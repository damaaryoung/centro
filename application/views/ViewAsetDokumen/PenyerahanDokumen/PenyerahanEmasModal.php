<!-- Modal -->
<div class="modal fade" id="penyerahanEmasModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style="margin-bottom:50px; width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Penyerahan Data Aset Dokumen Emas</h3>
        <button type="button" class="close"  id="emas_button_kembali_penyerahan2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!--Start Modal Body-->
      <div class="modal-body">  
          
            <div class="tab">
              <button type='button' class="tablinks" onclick="openTab(event, 'DataEmasPenyerahan')">Data Emas</button>
              <button type='button' class="tablinks" onclick="openTab(event, 'SIDEmasPenyerahan')">SID</button>
            </div>

            <!-- Start Data Emas -->
            <div id="DataEmasPenyerahan" class="tabcontent">
                <div class="row">
                      <div class="col-md-10 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasAgunanIDPenyerahan">Agunan ID</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="text" class="form-control" id="emasAgunanIDPenyerahan" name='emasAgunanIDPenyerahan' readonly>
                                  </div>
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="emasVerifikasi">Verifikasi</label>
                                  </div>
                                  <div class="col-sm-2">
                                      <input class="form-control select2" id="emasVerifikasiPenyerahan" name="emasVerifikasiPenyerahan" disabled>
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasNoSeriPenyerahan">No Seri</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="text" class="form-control" id="emasNoSeriPenyerahan" name="emasNoSeriPenyerahan" placeholder="" required>
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasJenisEmasPenyerahan">Jenis Emas</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="emasJenisEmasPenyerahan" name="emasJenisEmasPenyerahan">
                                        </select>
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasKaratPenyerahan">Karat</label>
                                  </div>
                                  <div class="col-sm-2">
                                  <input type="number" class="form-control" id="emasKaratPenyerahan" name='emasKaratPenyerahan' placeholder="">
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="">Berat (Gram)</label>
                                  </div>
                                  <div class="col-sm-2">
                                  <input type="number" class="form-control" id="emasBeratPenyerahan" name="emasBeratPenyerahan" placeholder="">
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="">Harga Pasar</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="number" class="form-control" id="emasHargaPasarPenyerahan" name='emasHargaPasarPenyerahan' placeholder="">
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="">Harga Taksasi</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="number" class="form-control" id="emasHargaTaksasiPenyerahan" name='emasHargaTaksasiPenyerahan' placeholder="">
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                  </div>
            </div>
            <!-- END Data Emas -->

             <!-- Start SID -->
            <div id="SIDEmasPenyerahan" class="tabcontent">
                <div class="row">
                        <div class="col-md-10 mx-auto">
                        <br><br>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDJenisAgunanPenyerahan">Jenis Agunan</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDJenisAgunanPenyerahan" name="emasSIDJenisAgunanPenyerahan" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDPeringkatSuratPenyerahan">Pengikat Surat Berharga</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDPeringkatSuratPenyerahan" name="emasSIDPeringkatSuratPenyerahan" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>   
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDJenisPengikatanPenyerahan">Jenis Pengikatan</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDJenisPengikatanPenyerahan" name="emasSIDJenisPengikatanPenyerahan" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>   
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNamaPemilikAgunanPenyerahan">Nama Pemilik Agunan</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="emasSIDNamaPemilikAgunanPenyerahan" name='emasSIDNamaPemilikAgunanPenyerahan'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDStatusPenyerahan">Status/Bukti Kepemilikan</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="emasSIDStatusPenyerahan" name='emasSIDStatusPenyerahan' value='SERTIFIKAT'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDAlamatPenyerahan">Alamat</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="emasSIDAlamatPenyerahan" name='emasSIDAlamatPenyerahan'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDLokasiPenyerahan">Lokasi</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDLokasiPenyerahan" name="emasSIDLokasiPenyerahan" disabled>
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNJOPPenyerahan">Nilai Agunan (NJOP)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDNJOPPenyerahan" name="emasSIDNJOPPenyerahan">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDBankPenyerahan">Nilai Agunan (Bank)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDBankPenyerahan" name='emasSIDBankPenyerahan'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNilaiIndependenPenyerahan">Nilai Agunan Independen</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDNilaiIndependenPenyerahan" name='emasSIDNilaiIndependenPenyerahan'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNamaIndependenPenyerahan">Nama Penilai Independen</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="text" class="form-control" id="emasSIDNamaIndependenPenyerahan" name='emasSIDNamaIndependenPenyerahan'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDTglPenilaianPenyerahan">Tanggal Penilaian</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="date" class="form-control" id="emasSIDTglPenilaianPenyerahan" name='emasSIDTglPenilaianPenyerahan'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDParipasuPenyerahan">Paripasu (%)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDParipasuPenyerahan" name='emasSIDParipasuPenyerahan'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDAsuransiPenyerahan">Asuransi</label>
                                    </div>
                                    <div class="col-sm-3">
                                            <select class="form-control select2" id="emasSIDAsuransiPenyerahan" name="emasSIDAsuransiPenyerahan">
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

            <input type="hidden" class="form-control" id="emasIDPenyerahan" name="emasIDPenyerahan">
            <input type="hidden" class="form-control" id="emasNoReffPenyerahan" name="emasNoReffPenyerahan">

           
      </div>
      <!--END Modal Body-->
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" id="emas_button_kembali_penyerahan" class="btn btn-danger">Kembali</button>
      </div>
    </div>
  </div>
</div>

