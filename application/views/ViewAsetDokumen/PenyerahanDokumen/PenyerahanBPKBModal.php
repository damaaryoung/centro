<!-- Modal -->
<div class="modal fade" id="penyerahanBPKBModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style="margin-bottom:50px; width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Penyerahan Data Aset Dokumen BPKB</h3>
        <button type="button" class="close" id="bpkb_button_kembali_penyerahan2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!--Start Modal Body-->
      <div class="modal-body">

            <div class="container py-5">
                    <div class="row">
                            <div class="col-md-10 mx-auto">
                                    <div class="form-group row">
                                        <div class="col-sm-7">
                                        </div>
                                        <div class="col-sm-1">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbVerifikasiPenyerahan">Verifikasi</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <input class="form-control" id="bpkbVerifikasiPenyerahan" name="bpkbVerifikasiPenyerahan" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-2">
                                            <label class="control-label" style="padding-top: 5px;"  for="bpkbTglRegisterPenyerahan">Tanggal Register</label>
                                        </div>
                                        <div class="col-sm-3">
                                                <input type="date" class="form-control" id="bpkbTglRegisterPenyerahan" name="bpkbTglRegisterPenyerahan" readonly>
                                        </div>
                                        <div class="col-sm-2">
                                            <label style="padding-top: 5px;" class="control-label" for="bpkbTglPenilaianPenyerahan">Tanggal Penilaian</label>
                                        </div>
                                        <div class="col-sm-3">
                                                <input type="date" class="form-control" id="bpkbTglPenilaianPenyerahan" name="bpkbTglPenilaianPenyerahan" value="" >
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbKantorLokasiPenyerahan">Kantor Lokasi Jaminan</label>
                                        </div>
                                        <div class="col-sm-7">
                                            <select class="form-control" id="bpkbKantorLokasiPenyerahan" name="bpkbKantorLokasiPenyerahan">
                                                        <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbKodeJenisAgunanPenyerahan">Jenis Agunan</label>
                                        </div>
                                        <div class="col-sm-7">
                                            <select class="form-control" id="bpkbKodeJenisAgunanPenyerahan" name="bpkbKodeJenisAgunanPenyerahan">
                                                        <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbKodeIkatanAgunanPenyerahan">Ikatan Agunan</label>
                                        </div>
                                        <div class="col-sm-7">
                                            <select class="form-control" id="bpkbKodeIkatanAgunanPenyerahan" name="bpkbKodeIkatanAgunanPenyerahan">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbNilaiTaksasiAgunanPenyerahan">Nilai Taksasi Agunan</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbNilaiTaksasiAgunanPenyerahan" name="bpkbNilaiTaksasiAgunanPenyerahan">
                                        </div>
                                        <div class="col-sm-1">
                                            <label type="number" class="control-label" style="padding-top: 5px;">NJOP</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbNJOPPenyerahan" name="bpkbNJOPPenyerahan">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbHargaPasarPenyerahan">Harga Pasar</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbHargaPasarPenyerahan" name="bpkbHargaPasarPenyerahan">
                                        </div>
                                        <div class="col-sm-1">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbAPHTPenyerahan">APHT</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbAPHTPenyerahan" name="bpkbAPHTPenyerahan">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbPersenDijaminPenyerahan">Persen Dijamin</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <input type="number" class="form-control" id="bpkbPersenDijaminPenyerahan" name="bpkbPersenDijaminPenyerahan" readonly>
                                        </div>
                                    </div>
                                    
                                <!-- Form ATAS -->
                            </div>
                        </div>
                    </div>

            <div class="tab">
              <button type="button" class="tablinks" onclick="openTab(event, 'DataBPKBPenyerahan')">Data BPKB</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'DataLampiranBPKBPenyerahan')">Data Lampiran</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'SLIKBpkbPenyerahan')">SLIK</button>
            </div>
            
               <!-- Start Data BPKB -->
            <div id="DataBPKBPenyerahan" class="tabcontent">
                <div class="row">
                      <div class="col-md-12 mx-auto">
                      <br><br>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Agunan ID</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="bpkbAgunanIDPenyerahan" name="bpkbAgunanIDPenyerahan" readonly>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoBPKBPenyerahan">No. BPKB</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="bpkbNoBPKBPenyerahan" name="bpkbNoBPKBPenyerahan" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNamaPemilikPenyerahan">Nama Pemilik</label>
                                  </div>
                                  <div class="col-sm-7">
                                      <input type="text" class="form-control" id="bpkbNamaPemilikPenyerahan" name="bpkbNamaPemilikPenyerahan" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbAlamatPemlikPenyerahan">Alamat Pemilik</label>
                                  </div>
                                  <div class="col-sm-7">
                                    <textarea style="height: 75px;" type="text" class="form-control" id="bpkbAlamatPemlikPenyerahan" name="bpkbAlamatPemlikPenyerahan"></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbKotaPemilikPenyerahan">Kota Pemilik</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbKotaPemilikPenyerahan" name="bpkbKotaPemilikPenyerahan" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Merk/Type</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <select class="form-control" id="bpkbMerkPenyerahan" name="bpkbMerkPenyerahan">
                                              
                                    </select>
                                  </div>
                                  <div class="col-sm-4">
                                        <select class="form-control" id="bpkbTypePenyerahan" name="bpkbTypePenyerahan">
                                               
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 6px;" for="">Jenis / Silinder</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <select class="form-control" id="bpkbJenisPenyerahan" name="bpkbJenisPenyerahan">
                                               
                                    </select>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="number" class="form-control" id="bpkbSilinderPenyerahan" name="bpkbSilinderPenyerahan" placeholder="Silinder"> 
                                  </div>
                                  <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 6px;" for="">CC</label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoRangkaPenyerahan">No. Rangka</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoRangkaPenyerahan" name="bpkbNoRangkaPenyerahan" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoMesinPenyerahan">No. Mesin</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoMesinPenyerahan" name="bpkbNoMesinPenyerahan" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbTahunPenyerahan">Tahun</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="number" class="form-control" id="bpkbTahunPenyerahan" name="bpkbTahunPenyerahan" placeholder="Tahun" min="1500" max="2999">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbTglExpPajakPenyerahan">Tgl. Exp Pajak</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbTglExpPajakPenyerahan" name="bpkbTglExpPajakPenyerahan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbTahunPenyerahan">Warna</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="bpkbWarnaPenyerahan" name="bpkbWarnaPenyerahan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoPolisiPenyerahan">No. Polisi</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="text" class="form-control" id="bpkbNoPolisiPenyerahan" name="bpkbNoPolisiPenyerahan" placeholder="">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tgl. Exp STNK</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbTglExpSTNKPenyerahan" name="bpkbTglExpSTNKPenyerahan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. STNK</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoSTNKPenyerahan" name="bpkbNoSTNKPenyerahan">
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                  </div>
            </div>
            <!-- END Data BPKB -->

            
            <!-- Start Data Lampiran -->
            <div id="DataLampiranBPKBPenyerahan" class="tabcontent">
                <!-- ROW -->
                <div class="row">
                      <div class="col-md-12 mx-auto">
                      <br><br>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control" id="bpkbDokKwitansiBlankoPenyerahan" name="bpkbDokKwitansiBlankoPenyerahan">
                                          
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox"  value="Y" id="check_kw_blankoPenyerahan" name="check_kw_blankoPenyerahan">&nbsp;Kwitansi Blanko</label>
                                </div>
                            </div>

                            <div class="form-group row">
                            <div class="col-sm-2">
                                    <select class="form-control" id="bpkbDokFakturPemilikPenyerahan" name="bpkbDokFakturPemilikPenyerahan">
                                           
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox"  value="Y" id="check_faktur_pemilikPenyerahan" name="check_faktur_pemilikPenyerahan">&nbsp;Faktur Pemilik</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoFakturPemilikPenyerahan">No. Faktur Pemilik</label>
                                </div>
                                <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoFakturPemilikPenyerahan" name="bpkbNoFakturPemilikPenyerahan">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control" id="bpkbDokKwJualBeliPenyerahan" name="bpkbDokKwJualBeliPenyerahan">
                                           
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox" value="Y" id="check_kw_jual_beliPenyerahan" name="check_kw_jual_beliPenyerahan">&nbsp;Kwitansi Jual Beli</label>
                                </div>
                            </div>
                            <!-- SK TRAYEK -->
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control" id="bpkbDokSKTrayekPenyerahan" name="bpkbDokSKTrayekPenyerahan">
                                           
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox" value="Y" id="check_sk_trayekPenyerahan" name="check_sk_trayekPenyerahan">&nbsp;SK Trayek</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. SK Trayek</label>
                                </div>
                                <div class="col-sm-5">
                                      <input type="text" class="form-control" id="noSKTrayekPenyerahan" name="noSKTrayekPenyerahan">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                   
                                </div>
                                <div class="col-sm-2">
                                    
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Berlaku s/d</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbBerlakuSDPenyerahan" name="bpkbBerlakuSDPenyerahan">
                                </div>
                            </div>
                            <!-- SK TRAYEK -->
                            <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lainnya</label>
                                  </div>
                                  <div class="col-sm-9">
                                  <textarea style="height: 100px;" type="text" class="form-control" id="bpkbLainnyaPenyerahan" name="bpkbLainnyaPenyerahan"></textarea>
                                  </div>
                            </div>
                      </div>
                </div>
                <!-- ROW --> 
            </div>
            <!-- End Data Lampiran -->
            
            
            <!-- Start SID -->
            <div id="SLIKBpkbPenyerahan" class="tabcontent">
            <div class="row">
                        <div class="col-md-12 mx-auto">
                      <br><br>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Status Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control" id="bpkbSlikStatusAgunanPenyerahan" name="bpkbSlikStatusAgunanPenyerahan">
                                                
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Paripasu</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control" id="bpkbSlikParipasuPenyerahan" name="bpkbSlikParipasuPenyerahan">
                                        </select>
                                  </div>
                              </div>                
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control" id="bpkbSlikJenisAgunanPenyerahan" name="bpkbSlikJenisAgunanPenyerahan">
                                        
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Paripasu (%)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbSlikParipasuPersenPenyerahan" name="bpkbSlikParipasuPersenPenyerahan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Peringkat Agunan</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <input type="text" class="form-control" id="bpkbSlikPeringkatAgunanPenyerahan" name="bpkbSlikPeringkatAgunanPenyerahan"  maxlength="6" >
                                  </div>
                                  <div class="col-sm-2">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Status Join Account</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control" id="bpkbSLikStatusJoinAccountPenyerahan" name="bpkbSLikStatusJoinAccountPenyerahan">
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lembaga Pemeringkat</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control" id="bpkbSlikLembagaPemeringkatPenyerahan" name="bpkbSlikLembagaPemeringkatPenyerahan">
                                               
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Diasuransikan</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control" id="bpkbSlikAsuransiPenyerahan" name="bpkbSlikAsuransiPenyerahan">
                                       
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Pengikatan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control" id="bpkbSlikJenisPengikatanPenyerahan" name="bpkbSlikJenisPengikatanPenyerahan">
                                               
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tanggal Pengikatan</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <input type="date" class="form-control" id="bpkbSlikTanggalPengikatanPenyerahan" name="bpkbSlikTanggalPengikatanPenyerahan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama Pemilik Agunan</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <input type="text" class="form-control" id="bpkbSlikNamaPemilikAgunanPenyerahan" name="bpkbSlikNamaPemilikAgunanPenyerahan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Bukti Kepemilikan</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <input type="text" class="form-control" id="bpkbSlikBuktiKepemilikanAgunanPenyerahan" name="bpkbSlikBuktiKepemilikanAgunanPenyerahan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Alamat</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <textarea style="height: 115px;" type="text" class="form-control" id="bpkbSlikAlamatPenyerahan" name="bpkbSlikAlamatPenyerahan"></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Kode Dati 2 Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control" id="bpkbSlikKodeDati2Penyerahan" name="bpkbSlikKodeDati2Penyerahan">
                                                
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (NJOP)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbSlikNilaiNJOPPenyerahan" name="bpkbSlikNilaiNJOPPenyerahan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (LJK)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbSlikNilaiLJKPenyerahan" name="bpkbSlikNilaiLJKPenyerahan">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tanggal Penilaian (LJK)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbSlikTanggalLJKPenyerahan" name="bpkbSlikTanggalLJKPenyerahan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan Independen</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbSlikNilaiIndependenPenyerahan" name="bpkbSlikNilaiIndependenPenyerahan">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tgl Penilaian Independen</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbSlikTglIndependenPenyerahan" name="bpkbSlikTglIndependenPenyerahan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama Penilai Independen</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="bpkbSlikNamaIndependenPenyerahan" name="bpkbSlikNamaIndependenPenyerahan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Keterangan</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <textarea style="height: 115px;" type="text" class="form-control" id="bpkbSlikKeteranganPenyerahan" name="bpkbSlikKeteranganPenyerahan"></textarea>
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                </div>
            </div>
            <!-- END SLIK -->                

            <input type="hidden" class="form-control" id="bpkbIDPenyerahan" name="bpkbIDPenyerahan">
            <input type="hidden" class="form-control" id="bpkbNoReffPenyerahan" name="bpkbNoReffPenyerahan">

      </div>
      <!--END Modal Body-->
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" id="bpkb_button_kembali_penyerahan" class="btn btn-danger">Kembali</button>
      </div>
    </div>
  </div>
</div>

