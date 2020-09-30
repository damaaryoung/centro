<!-- Modal -->
<div class="modal fade" id="kembaliEmasModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style="margin-bottom:50px; width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Pengembalian Data Aset Dokumen Emas</h3>
        <button type="button" class="close"  id="emas_button_kembali_kembali2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!--Start Modal Body-->
      <div class="modal-body">  
          
            <div class="tab">
              <button type='button' class="tablinks" onclick="openTab(event, 'DataEmasKembali')">Data Emas</button>
              <button type='button' class="tablinks" onclick="openTab(event, 'SIDEmasKembali')">SID</button>
            </div>

            <!-- Start Data Emas -->
            <div id="DataEmasKembali" class="tabcontent">
                <div class="row">
                      <div class="col-md-10 mx-auto">
                          <form method="post" action="<?php echo base_url("index.php/AsetDokumenEntryController/handleUserInputEmas")?>">
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasAgunanIDKembali">Agunan ID</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="text" class="form-control" id="emasAgunanIDKembali" name='emasAgunanIDKembali' readonly>
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasNoSeriKembali">No Seri</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="text" class="form-control" id="emasNoSeriKembali" name="emasNoSeriKembali" placeholder="" required>
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasJenisEmasKembali">Jenis Emas</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control select2" id="emasJenisEmasKembali" name="emasJenisEmasKembali">
                                        </select>
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="emasKaratKembali">Karat</label>
                                  </div>
                                  <div class="col-sm-2">
                                  <input type="number" class="form-control" id="emasKaratKembali" name='emasKaratKembali' placeholder="">
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="">Berat (Gram)</label>
                                  </div>
                                  <div class="col-sm-2">
                                  <input type="number" class="form-control" id="emasBeratKembali" name="emasBeratKembali" placeholder="">
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="">Harga Pasar</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="number" class="form-control" id="emasHargaPasarKembali" name='emasHargaPasarKembali' placeholder="">
                                  </div>
                              </div>

                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="">Harga Taksasi</label>
                                  </div>
                                  <div class="col-sm-5">
                                  <input type="number" class="form-control" id="emasHargaTaksasiKembali" name='emasHargaTaksasiKembali' placeholder="">
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                  </div>
            </div>
            <!-- END Data Emas -->

             <!-- Start SID -->
            <div id="SIDEmasKembali" class="tabcontent">
                <div class="row">
                        <div class="col-md-10 mx-auto">
                        <br><br>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDJenisAgunanKembali">Jenis Agunan</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDJenisAgunanKembali" name="emasSIDJenisAgunanKembali" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDPeringkatSuratKembali">Pengikat Surat Berharga</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDPeringkatSuratKembali" name="emasSIDPeringkatSuratKembali" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>   
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDJenisPengikatanKembali">Jenis Pengikatan</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDJenisPengikatanKembali" name="emasSIDJenisPengikatanKembali" disabled>
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>   
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNamaPemilikAgunanKembali">Nama Pemilik Agunan</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="emasSIDNamaPemilikAgunanKembali" name='emasSIDNamaPemilikAgunanKembali'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDStatusKembali">Status/Bukti Kepemilikan</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="emasSIDStatusKembali" name='emasSIDStatusKembali' value='SERTIFIKAT'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDAlamatKembali">Alamat</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="emasSIDAlamatKembali" name='emasSIDAlamatKembali'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDLokasiKembali">Lokasi</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="emasSIDLokasiKembali" name="emasSIDLokasiKembali" disabled>
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNJOPKembali">Nilai Agunan (NJOP)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDNJOPKembali" name="emasSIDNJOPKembali">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDBankKembali">Nilai Agunan (Bank)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDBankKembali" name='emasSIDBankKembali'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNilaiIndependenKembali">Nilai Agunan Independen</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDNilaiIndependenKembali" name='emasSIDNilaiIndependenKembali'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDNamaIndependenKembali">Nama Penilai Independen</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="text" class="form-control" id="emasSIDNamaIndependenKembali" name='emasSIDNamaIndependenKembali'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDTglPenilaianKembali">Tanggal Penilaian</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="date" class="form-control" id="emasSIDTglPenilaianKembali" name='emasSIDTglPenilaianKembali'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDParipasuKembali">Paripasu (%)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="emasSIDParipasuKembali" name='emasSIDParipasuKembali'>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="emasSIDAsuransiKembali">Asuransi</label>
                                    </div>
                                    <div class="col-sm-3">
                                            <select class="form-control select2" id="emasSIDAsuransiKembali" name="emasSIDAsuransiKembali">
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

            <input type="hidden" class="form-control" id="emasIDKembali" name="emasIDKembali">
            <input type="hidden" class="form-control" id="emasNoReffKembali" name="emasNoReffKembali">

           
      </div>
      <!--END Modal Body-->
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" id="emas_button_kembali_kembali" class="btn btn-danger">Kembali</button>
      </div>
    </div>
  </div>
</div>

