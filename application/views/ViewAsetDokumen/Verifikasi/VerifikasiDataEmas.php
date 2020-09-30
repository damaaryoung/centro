<!-- Modal -->
<div class="modal fade" id="verifikasiEmas" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg"
       style="margin-bottom:50px; width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Verifikasi Data Aset Dokumen</h3>
        <button type="button" class="close"  id="emas_button_kembali2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!--Start Modal Body-->
      <div class="modal-body">
          
            <div class="tab">
              <button type='button' class="tablinks" onclick="openTab(event, 'DataEmas')">Data Emas</button>
              <button type='button' class="tablinks" onclick="openTab(event, 'SIDEmas')">SID</button>
            </div>

            <!-- Start Data Emas -->
            <div id="DataEmas" class="tabcontent" style="font-size: 12px;">
                <div class="row">
                      <div class="col-md-12 mx-auto">
                       
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasAgunanID">Agunan ID</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="text" class="form-control" id="emasAgunanID" name='emasAgunanID' readonly>
                                  </div>
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="emasVerifikasi">Verifikasi</label>
                                  </div>
                                  <div class="col-sm-2">
                                      <select class="form-control select2" id="emasVerifikasi" name="emasVerifikasi">
                                      </select>
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasNoSeri">No Seri</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="text" class="form-control" id="emasNoSeri" name="emasNoSeri" placeholder="" required>
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasJenisEmas">Jenis Emas</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="emasJenisEmas" name="emasJenisEmas">
                                        </select>
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasKarat">Karat</label>
                                  </div>
                                  <div class="col-sm-2">
                                  <input type="number" class="form-control" id="emasKarat" name='emasKarat' placeholder="">
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Berat (Gram)</label>
                                  </div>
                                  <div class="col-sm-2">
                                  <input type="number" class="form-control" id="emasBerat" name="emasBerat" placeholder="">
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Harga Pasar</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="number" class="form-control" id="emasHargaPasar" name='emasHargaPasar' placeholder="">
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Harga Taksasi</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="number" class="form-control" id="emasHargaTaksasi" name='emasHargaTaksasi' placeholder="">
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                  </div>
            </div>
            <!-- END Data Emas -->

             <!-- Start SID -->
            <div id="SIDEmas" class="tabcontent" style="font-size: 12px;">
                <div class="row">
                        <div class="col-md-12 mx-auto">
                        <br><br>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDJenisAgunan">Jenis Agunan</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDJenisAgunan" name="emasSIDJenisAgunan" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDPeringkatSurat">Pengikat Surat Berharga</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDPeringkatSurat" name="emasSIDPeringkatSurat" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>   
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDJenisPengikatan">Jenis Pengikatan</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDJenisPengikatan" name="emasSIDJenisPengikatan" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>   
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNamaPemilikAgunan">Nama Pemilik Agunan</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="emasSIDNamaPemilikAgunan" name='emasSIDNamaPemilikAgunan'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDStatus">Status/Bukti Kepemilikan</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="emasSIDStatus" name='emasSIDStatus' value='SERTIFIKAT'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDAlamat">Alamat</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="emasSIDAlamat" name='emasSIDAlamat'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDLokasi">Lokasi</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDLokasi" name="emasSIDLokasi" disabled>
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNJOP">Nilai Agunan (NJOP)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDNJOP" name="emasSIDNJOP">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDBank">Nilai Agunan (Bank)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDBank" name='emasSIDBank'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNilaiIndependen">Nilai Agunan Independen</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDNilaiIndependen" name='emasSIDNilaiIndependen'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNamaIndependen">Nama Penilai Independen</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="text" class="form-control" id="emasSIDNamaIndependen" name='emasSIDNamaIndependen'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDTglPenilaian">Tanggal Penilaian</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="date" class="form-control" id="emasSIDTglPenilaian" name='emasSIDTglPenilaian'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDParipasu">Paripasu (%)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDParipasu" name='emasSIDParipasu'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDAsuransi">Asuransi</label>
                                    </div>
                                    <div class="col-sm-3">
                                            <select class="form-control select2" id="emasSIDAsuransi" name="emasSIDAsuransi">
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

            <input type="hidden" class="form-control" id="emasID" name="emasID">
            <input type="hidden" class="form-control" id="emasNoReff" name="emasNoReff">

           
      </div>
      <!--END Modal Body-->
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" id="emas_button_kembali" class="btn btn-danger">Kembali</button>
        <button type="button" id="emas_button_simpan" class="btn btn-primary">Simpan</button>
      </div>
    </div>
  </div>
</div>

