<!-- Modal -->
<div class="modal fade" id="kembaliBPKBModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style="margin-bottom:50px; width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Pengembalian Data Aset Dokumen BPKB</h3>
        <button type="button" class="close" id="bpkb_button_kembali_kembali2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!--Start Modal Body-->
      <div class="modal-body">

            <div class="container py-5">
                    <div class="row">
                            <div class="col-md-11 mx-auto">
                             
                                    <div class="form-group row">
                                        <div class="col-sm-2">
                                            <label class="control-label" style="padding-top: 5px;"  for="bpkbTglRegisterKembali">Tanggal Register</label>
                                        </div>
                                        <div class="col-sm-3">
                                                <input type="date" class="form-control" id="bpkbTglRegisterKembali" name="bpkbTglRegisterKembali" readonly>
                                        </div>
                                        <div class="col-sm-2">
                                            <label style="padding-top: 5px;" class="control-label" for="bpkbTglPenilaianKembali">Tanggal Penilaian</label>
                                        </div>
                                        <div class="col-sm-3">
                                                <input type="date" class="form-control" id="bpkbTglPenilaianKembali" name="bpkbTglPenilaianKembali" value="" >
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbKantorLokasiKembali">Kantor Lokasi Jaminan</label>
                                        </div>
                                        <div class="col-sm-7">
                                            <select class="form-control select2" id="bpkbKantorLokasiKembali" name="bpkbKantorLokasiKembali">
                                                        <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbKodeJenisAgunanKembali">Jenis Agunan</label>
                                        </div>
                                        <div class="col-sm-7">
                                            <select class="form-control select2" id="bpkbKodeJenisAgunanKembali" name="bpkbKodeJenisAgunanKembali">
                                                        <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbKodeIkatanAgunanKembali">Ikatan Agunan</label>
                                        </div>
                                        <div class="col-sm-7">
                                            <select class="form-control select2" id="bpkbKodeIkatanAgunanKembali" name="bpkbKodeIkatanAgunanKembali">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbNilaiTaksasiAgunanKembali">Nilai Taksasi Agunan</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbNilaiTaksasiAgunanKembali" name="bpkbNilaiTaksasiAgunanKembali">
                                        </div>
                                        <div class="col-sm-1">
                                            <label type="number" class="control-label" style="padding-top: 5px;">NJOP</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbNJOPKembali" name="bpkbNJOPKembali">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbHargaPasarKembali">Harga Pasar</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbHargaPasarKembali" name="bpkbHargaPasarKembali">
                                        </div>
                                        <div class="col-sm-1">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbAPHTKembali">APHT</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbAPHTKembali" name="bpkbAPHTKembali">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbPersenDijaminKembali">Persen Dijamin</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <input type="number" class="form-control" id="bpkbPersenDijaminKembali" name="bpkbPersenDijaminKembali" readonly>
                                        </div>
                                    </div>
                                    
                                <!-- Form ATAS -->
                            </div>
                        </div>
                    </div>

            <div class="tab">
              <button type="button" class="tablinks" onclick="openTab(event, 'DataBPKBKembali')">Data BPKB</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'DataLampiranBPKBKembali')">Data Lampiran</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'SIDBpkbKembali')">SID</button>
            </div>
            
               <!-- Start Data BPKB -->
            <div id="DataBPKBKembali" class="tabcontent">
                <div class="row">
                      <div class="col-md-12 mx-auto">
                      <br><br>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Agunan ID</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="bpkbAgunanIDKembali" name="bpkbAgunanIDKembali" readonly>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoBPKBKembali">No. BPKB</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="bpkbNoBPKBKembali" name="bpkbNoBPKBKembali" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNamaPemilikKembali">Nama Pemilik</label>
                                  </div>
                                  <div class="col-sm-7">
                                      <input type="text" class="form-control" id="bpkbNamaPemilikKembali" name="bpkbNamaPemilikKembali" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbAlamatPemlikKembali">Alamat Pemilik</label>
                                  </div>
                                  <div class="col-sm-7">
                                    <textarea style="height: 75px;" type="text" class="form-control" id="bpkbAlamatPemlikKembali" name="bpkbAlamatPemlikKembali"></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbKotaPemilikKembali">Kota Pemilik</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbKotaPemilikKembali" name="bpkbKotaPemilikKembali" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Merk/Type</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <select class="form-control select2" id="bpkbMerkKembali" name="bpkbMerkKembali">
                                              
                                    </select>
                                  </div>
                                  <div class="col-sm-4">
                                        <select class="form-control select2" id="bpkbTypeKembali" name="bpkbTypeKembali">
                                               
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 6px;" for="">Jenis / Silinder</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <select class="form-control select2" id="bpkbJenisKembali" name="bpkbJenisKembali">
                                               
                                    </select>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="number" class="form-control" id="bpkbSilinderKembali" name="bpkbSilinderKembali" placeholder="Silinder"> 
                                  </div>
                                  <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 6px;" for="">CC</label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoRangkaKembali">No. Rangka</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoRangkaKembali" name="bpkbNoRangkaKembali" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoMesinKembali">No. Mesin</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoMesinKembali" name="bpkbNoMesinKembali" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbTahunKembali">Tahun</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="number" class="form-control" id="bpkbTahunKembali" name="bpkbTahunKembali" placeholder="Tahun" min="1500" max="2999">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbTglExpPajakKembali">Tgl. Exp Pajak</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbTglExpPajakKembali" name="bpkbTglExpPajakKembali">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbTahunKembali">Warna</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="bpkbWarnaKembali" name="bpkbWarnaKembali">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoPolisiKembali">No. Polisi</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="text" class="form-control" id="bpkbNoPolisiKembali" name="bpkbNoPolisiKembali" placeholder="">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tgl. Exp STNK</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbTglExpSTNKKembali" name="bpkbTglExpSTNKKembali">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. STNK</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoSTNKKembali" name="bpkbNoSTNKKembali">
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                  </div>
            </div>
            <!-- END Data BPKB -->

            
            <!-- Start Data Lampiran -->
            <div id="DataLampiranBPKBKembali" class="tabcontent">
                <!-- ROW -->
                <div class="row">
                      <div class="col-md-12 mx-auto">
                      <br><br>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="bpkbDokKwitansiBlankoKembali" name="bpkbDokKwitansiBlankoKembali">
                                          
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox"  value="Y" id="check_kw_blankoKembali" name="check_kw_blankoKembali">&nbsp;Kwitansi Blanko</label>
                                </div>
                            </div>

                            <div class="form-group row">
                            <div class="col-sm-2">
                                    <select class="form-control select2" id="bpkbDokFakturPemilikKembali" name="bpkbDokFakturPemilikKembali">
                                           
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox"  value="Y" id="check_faktur_pemilikKembali" name="check_faktur_pemilikKembali">&nbsp;Faktur Pemilik</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoFakturPemilikKembali">No. Faktur Pemilik</label>
                                </div>
                                <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoFakturPemilikKembali" name="bpkbNoFakturPemilikKembali">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="bpkbDokKwJualBeliKembali" name="bpkbDokKwJualBeliKembali">
                                           
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox" value="Y" id="check_kw_jual_beliKembali" name="check_kw_jual_beliKembali">&nbsp;Kwitansi Jual Beli</label>
                                </div>
                            </div>
                            <!-- SK TRAYEK -->
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="bpkbDokSKTrayekKembali" name="bpkbDokSKTrayekKembali">
                                           
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox" value="Y" id="check_sk_trayekKembali" name="check_sk_trayekKembali">&nbsp;SK Trayek</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. SK Trayek</label>
                                </div>
                                <div class="col-sm-5">
                                      <input type="text" class="form-control" id="noSKTrayekKembali" name="noSKTrayekKembali">
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
                                      <input type="date" class="form-control" id="bpkbBerlakuSDKembali" name="bpkbBerlakuSDKembali">
                                </div>
                            </div>
                            <!-- SK TRAYEK -->
                            <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lainnya</label>
                                  </div>
                                  <div class="col-sm-9">
                                  <textarea style="height: 100px;" type="text" class="form-control" id="bpkbLainnyaKembali" name="bpkbLainnyaKembali"></textarea>
                                  </div>
                            </div>
                      </div>
                </div>
                <!-- ROW --> 
            </div>
            <!-- End Data Lampiran -->
            
            
            <!-- Start SID -->
            <div id="SIDBpkbKembali" class="tabcontent">
                <div class="row">
                        <div class="col-md-10 mx-auto">
                        <br><br>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="bpkbSIDJenisAgunan">Jenis Agunan</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="bpkbSIDJenisAgunanKembali" name="bpkbSIDJenisAgunanKembali" disabled>
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                    
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="bpkbSIDPengikatSuratKembali">Pengikat Surat Berharga</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="bpkbSIDPengikatSuratKembali" name="bpkbSIDPengikatSuratKembali" disabled>
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                    
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="bpkbSIDJenisPengikatanKembali">Jenis Pengikatan</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="bpkbSIDJenisPengikatanKembali" name="bpkbSIDJenisPengikatanKembali" disabled>
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="bpkbSIDNamaPemilikAgunanKembali">Nama Pemilik Agunan</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="bpkbSIDNamaPemilikAgunanKembali" name="bpkbSIDNamaPemilikAgunanKembali">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="bpkbSIDStatusBuktiKepemilikanKembali">Status/Bukti Kepemilikan</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="bpkbSIDStatusBuktiKepemilikanKembali" name="bpkbSIDStatusBuktiKepemilikanKembali">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="bpkbSIDAlamatKembali">Alamat</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="bpkbSIDAlamatKembali" name="bpkbSIDAlamatKembali">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="bpkbSIDLokasiKembali">Lokasi</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="bpkbSIDLokasiKembali" name="bpkbSIDLokasiKembali" disabled>
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="bpkbSIDNJOPKembali">Nilai Agunan (NJOP)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="bpkbSIDNJOPKembali" name='bpkbSIDNJOPKembali' placeholder="">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="nilaiSIDAgunanBankKembali">Nilai Agunan (Bank)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="nilaiSIDAgunanBankKembali" name="nilaiSIDAgunanBankKembali" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="bpkbSIDNilaiIndependenKembali">Nilai Agunan Independen</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="bpkbSIDNilaiIndependenKembali" name="bpkbSIDNilaiIndependenKembali" >
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="bpkbSIDNamaIndependenKembali">Nama Penilai Independen</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="text" class="form-control" id="bpkbSIDNamaIndependenKembali" name="bpkbSIDNamaIndependenKembali">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Paripasu (%)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="bpkbSIDParipasuKembali" name="bpkbSIDParipasuKembali">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Asuransi</label>
                                    </div>
                                    <div class="col-sm-3">
                                            <select class="form-control select2" id="bpkbSIDAsuransiKembali" name="bpkbSIDAsuransiKembali">
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

            <input type="hidden" class="form-control" id="bpkbIDKembali" name="bpkbIDKembali">
            <input type="hidden" class="form-control" id="bpkbNoReffKembali" name="bpkbNoReffKembali">

      </div>
      <!--END Modal Body-->
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" id="bpkb_button_kembali_kembali" class="btn btn-danger">Kembali</button>
      </div>
    </div>
  </div>
</div>
