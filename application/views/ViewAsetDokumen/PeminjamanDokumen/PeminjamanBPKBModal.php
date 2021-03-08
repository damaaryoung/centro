<!-- Modal -->
<div class="modal fade" id="peminjamanBPKBModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style="margin-bottom:50px; width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Peminjaman Data Aset Dokumen BPKB</h3>
        <button type="button" class="close" id="bpkb_button_kembali_pinjam2" aria-label="Close">
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
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbVerifikasiPinjam">Verifikasi</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <input class="form-control" id="bpkbVerifikasiPinjam" name="bpkbVerifikasiPinjam" disabled>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-2">
                                            <label class="control-label" style="padding-top: 5px;"  for="bpkbTglRegisterPinjam">Tanggal Register</label>
                                        </div>
                                        <div class="col-sm-3">
                                                <input type="date" class="form-control" id="bpkbTglRegisterPinjam" name="bpkbTglRegisterPinjam" readonly>
                                        </div>
                                        <div class="col-sm-2">
                                            <label style="padding-top: 5px;" class="control-label" for="bpkbTglPenilaianPinjam">Tanggal Penilaian</label>
                                        </div>
                                        <div class="col-sm-3">
                                                <input type="date" class="form-control" id="bpkbTglPenilaianPinjam" name="bpkbTglPenilaianPinjam" value="" >
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbKantorLokasiPinjam">Kantor Lokasi Jaminan</label>
                                        </div>
                                        <div class="col-sm-7">
                                            <select class="form-control" id="bpkbKantorLokasiPinjam" name="bpkbKantorLokasiPinjam">
                                                        <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbKodeJenisAgunanPinjam">Jenis Agunan</label>
                                        </div>
                                        <div class="col-sm-7">
                                            <select class="form-control" id="bpkbKodeJenisAgunanPinjam" name="bpkbKodeJenisAgunanPinjam">
                                                        <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbKodeIkatanAgunanPinjam">Ikatan Agunan</label>
                                        </div>
                                        <div class="col-sm-7">
                                            <select class="form-control" id="bpkbKodeIkatanAgunanPinjam" name="bpkbKodeIkatanAgunanPinjam">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbNilaiTaksasiAgunanPinjam">Nilai Taksasi Agunan</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbNilaiTaksasiAgunanPinjam" name="bpkbNilaiTaksasiAgunanPinjam">
                                        </div>
                                        <div class="col-sm-1">
                                            <label type="number" class="control-label" style="padding-top: 5px;">NJOP</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbNJOPPinjam" name="bpkbNJOPPinjam">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbHargaPasarPinjam">Harga Pasar</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbHargaPasarPinjam" name="bpkbHargaPasarPinjam">
                                        </div>
                                        <div class="col-sm-1">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbAPHTPinjam">APHT</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbAPHTPinjam" name="bpkbAPHTPinjam">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbPersenDijaminPinjam">Persen Dijamin</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <input type="number" class="form-control" id="bpkbPersenDijaminPinjam" name="bpkbPersenDijaminPinjam" readonly>
                                        </div>
                                    </div>
                                    
                                <!-- Form ATAS -->
                            </div>
                        </div>
                    </div>

            <div class="tab">
              <button type="button" class="tablinks" onclick="openTab(event, 'DataBPKBPinjam')">Data BPKB</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'DataLampiranBPKBPinjam')">Data Lampiran</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'SLIKBpkbPinjam')">SLIK</button>
            </div>
            
               <!-- Start Data BPKB -->
            <div id="DataBPKBPinjam" class="tabcontent">
                <div class="row">
                      <div class="col-md-12 mx-auto">
                      <br><br>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Agunan ID</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="bpkbAgunanIDPinjam" name="bpkbAgunanIDPinjam" readonly>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoBPKBPinjam">No. BPKB</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="bpkbNoBPKBPinjam" name="bpkbNoBPKBPinjam" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNamaPemilikPinjam">Nama Pemilik</label>
                                  </div>
                                  <div class="col-sm-7">
                                      <input type="text" class="form-control" id="bpkbNamaPemilikPinjam" name="bpkbNamaPemilikPinjam" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbAlamatPemlikPinjam">Alamat Pemilik</label>
                                  </div>
                                  <div class="col-sm-7">
                                    <textarea style="height: 75px;" type="text" class="form-control" id="bpkbAlamatPemlikPinjam" name="bpkbAlamatPemlikPinjam"></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbKotaPemilikPinjam">Kota Pemilik</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbKotaPemilikPinjam" name="bpkbKotaPemilikPinjam" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Merk/Type</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <select class="form-control" id="bpkbMerkPinjam" name="bpkbMerkPinjam">
                                              
                                    </select>
                                  </div>
                                  <div class="col-sm-4">
                                        <select class="form-control" id="bpkbTypePinjam" name="bpkbTypePinjam">
                                               
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 6px;" for="">Jenis / Silinder</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <select class="form-control" id="bpkbJenisPinjam" name="bpkbJenisPinjam">
                                               
                                    </select>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="number" class="form-control" id="bpkbSilinderPinjam" name="bpkbSilinderPinjam" placeholder="Silinder"> 
                                  </div>
                                  <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 6px;" for="">CC</label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoRangkaPinjam">No. Rangka</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoRangkaPinjam" name="bpkbNoRangkaPinjam" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoMesinPinjam">No. Mesin</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoMesinPinjam" name="bpkbNoMesinPinjam" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbTahunPinjam">Tahun</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="number" class="form-control" id="bpkbTahunPinjam" name="bpkbTahunPinjam" placeholder="Tahun" min="1500" max="2999">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbTglExpPajakPinjam">Tgl. Exp Pajak</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbTglExpPajakPinjam" name="bpkbTglExpPajakPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbTahunPinjam">Warna</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="bpkbWarnaPinjam" name="bpkbWarnaPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoPolisiPinjam">No. Polisi</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="text" class="form-control" id="bpkbNoPolisiPinjam" name="bpkbNoPolisiPinjam" placeholder="">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tgl. Exp STNK</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbTglExpSTNKPinjam" name="bpkbTglExpSTNKPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. STNK</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoSTNKPinjam" name="bpkbNoSTNKPinjam">
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                  </div>
            </div>
            <!-- END Data BPKB -->

            
            <!-- Start Data Lampiran -->
            <div id="DataLampiranBPKBPinjam" class="tabcontent">
                <!-- ROW -->
                <div class="row">
                      <div class="col-md-12 mx-auto">
                      <br><br>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control" id="bpkbDokKwitansiBlankoPinjam" name="bpkbDokKwitansiBlankoPinjam">
                                          
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox"  value="Y" id="check_kw_blankoPinjam" name="check_kw_blankoPinjam">&nbsp;Kwitansi Blanko</label>
                                </div>
                            </div>

                            <div class="form-group row">
                            <div class="col-sm-2">
                                    <select class="form-control" id="bpkbDokFakturPemilikPinjam" name="bpkbDokFakturPemilikPinjam">
                                           
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox"  value="Y" id="check_faktur_pemilikPinjam" name="check_faktur_pemilikPinjam">&nbsp;Faktur Pemilik</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoFakturPemilikPinjam">No. Faktur Pemilik</label>
                                </div>
                                <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoFakturPemilikPinjam" name="bpkbNoFakturPemilikPinjam">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control" id="bpkbDokKwJualBeliPinjam" name="bpkbDokKwJualBeliPinjam">
                                           
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox" value="Y" id="check_kw_jual_beliPinjam" name="check_kw_jual_beliPinjam">&nbsp;Kwitansi Jual Beli</label>
                                </div>
                            </div>
                            <!-- SK TRAYEK -->
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control" id="bpkbDokSKTrayekPinjam" name="bpkbDokSKTrayekPinjam">
                                           
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox" value="Y" id="check_sk_trayekPinjam" name="check_sk_trayekPinjam">&nbsp;SK Trayek</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. SK Trayek</label>
                                </div>
                                <div class="col-sm-5">
                                      <input type="text" class="form-control" id="noSKTrayekPinjam" name="noSKTrayekPinjam">
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
                                      <input type="date" class="form-control" id="bpkbBerlakuSDPinjam" name="bpkbBerlakuSDPinjam">
                                </div>
                            </div>
                            <!-- SK TRAYEK -->
                            <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lainnya</label>
                                  </div>
                                  <div class="col-sm-9">
                                  <textarea style="height: 100px;" type="text" class="form-control" id="bpkbLainnyaPinjam" name="bpkbLainnyaPinjam"></textarea>
                                  </div>
                            </div>
                      </div>
                </div>
                <!-- ROW --> 
            </div>
            <!-- End Data Lampiran -->
            
            
            <!-- Start SID -->
            <div id="SLIKBpkbPinjam" class="tabcontent">
            <div class="row">
                        <div class="col-md-12 mx-auto">
                      <br><br>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Status Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control" id="bpkbSlikStatusAgunanPinjam" name="bpkbSlikStatusAgunanPinjam">
                                                
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Paripasu</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control" id="bpkbSlikParipasuPinjam" name="bpkbSlikParipasuPinjam">
                                        </select>
                                  </div>
                              </div>                
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control" id="bpkbSlikJenisAgunanPinjam" name="bpkbSlikJenisAgunanPinjam">
                                        
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Paripasu (%)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbSlikParipasuPersenPinjam" name="bpkbSlikParipasuPersenPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Peringkat Agunan</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <input type="text" class="form-control" id="bpkbSlikPeringkatAgunanPinjam" name="bpkbSlikPeringkatAgunanPinjam"  maxlength="6" >
                                  </div>
                                  <div class="col-sm-2">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Status Join Account</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control" id="bpkbSLikStatusJoinAccountPinjam" name="bpkbSLikStatusJoinAccountPinjam">
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lembaga Pemeringkat</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control" id="bpkbSlikLembagaPemeringkatPinjam" name="bpkbSlikLembagaPemeringkatPinjam">
                                               
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Diasuransikan</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control" id="bpkbSlikAsuransiPinjam" name="bpkbSlikAsuransiPinjam">
                                       
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Pengikatan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control" id="bpkbSlikJenisPengikatanPinjam" name="bpkbSlikJenisPengikatanPinjam">
                                               
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tanggal Pengikatan</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <input type="date" class="form-control" id="bpkbSlikTanggalPengikatanPinjam" name="bpkbSlikTanggalPengikatanPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama Pemilik Agunan</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <input type="text" class="form-control" id="bpkbSlikNamaPemilikAgunanPinjam" name="bpkbSlikNamaPemilikAgunanPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Bukti Kepemilikan</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <input type="text" class="form-control" id="bpkbSlikBuktiKepemilikanAgunanPinjam" name="bpkbSlikBuktiKepemilikanAgunanPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Alamat</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <textarea style="height: 115px;" type="text" class="form-control" id="bpkbSlikAlamatPinjam" name="bpkbSlikAlamatPinjam"></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Kode Dati 2 Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control " id="bpkbSlikKodeDati2Pinjam" name="bpkbSlikKodeDati2Pinjam">
                                                
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (NJOP)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbSlikNilaiNJOPPinjam" name="bpkbSlikNilaiNJOPPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (LJK)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbSlikNilaiLJKPinjam" name="bpkbSlikNilaiLJKPinjam">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tanggal Penilaian (LJK)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbSlikTanggalLJKPinjam" name="bpkbSlikTanggalLJKPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan Independen</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbSlikNilaiIndependenPinjam" name="bpkbSlikNilaiIndependenPinjam">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tgl Penilaian Independen</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbSlikTglIndependenPinjam" name="bpkbSlikTglIndependenPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama Penilai Independen</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="bpkbSlikNamaIndependenPinjam" name="bpkbSlikNamaIndependenPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Keterangan</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <textarea style="height: 115px;" type="text" class="form-control" id="bpkbSlikKeteranganPinjam" name="bpkbSlikKeteranganPinjam"></textarea>
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                </div>
            </div>
            <!-- END SLIK -->                


            <input type="hidden" class="form-control" id="bpkbIDPinjam" name="bpkbIDPinjam">
            <input type="hidden" class="form-control" id="bpkbNoReffPinjam" name="bpkbNoReffPinjam">

      </div>
      <!--END Modal Body-->
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" id="bpkb_button_kembali_pinjam" class="btn btn-danger">Kembali</button>
      </div>
    </div>
  </div>
</div>

