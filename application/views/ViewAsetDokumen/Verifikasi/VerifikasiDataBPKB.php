<!-- Modal -->
<div class="modal fade" id="verifikasiBPKB" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style="margin-bottom:50px; width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Verifikasi Data Aset Dokumen</h3>
        <button type="button" class="close" id="bpkb_button_kembali2" aria-label="Close">
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
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbVerifikasi">Verifikasi</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <select class="form-control " id="bpkbVerifikasi" name="bpkbVerifikasi">
                                            </select>
                                        </div>
                                    </div>      
                                    <div class="form-group row">
                                        <div class="col-sm-2">
                                            <label class="control-label" style="padding-top: 5px;"  for="bpkbTglRegister">Tanggal Register</label>
                                        </div>
                                        <div class="col-sm-3">
                                                <input type="date" class="form-control" id="bpkbTglRegister" name="bpkbTglRegister" readonly>
                                        </div>
                                        <div class="col-sm-2">
                                            <label style="padding-top: 5px;" class="control-label" for="bpkbTglPenilaian">Tanggal Penilaian</label>
                                        </div>
                                        <div class="col-sm-2">
                                                <input type="date" class="form-control" id="bpkbTglPenilaian" name="bpkbTglPenilaian" value="<?php //echo $row['sysdate'];?>" >
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbKantorLokasi">Kantor Lokasi Jaminan</label>
                                        </div>
                                        <div class="col-sm-7">
                                            <select class="form-control " id="bpkbKantorLokasi" name="bpkbKantorLokasi">
                                                        <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbKodeJenisAgunan">Jenis Agunan</label>
                                        </div>
                                        <div class="col-sm-7">
                                            <select class="form-control " id="bpkbKodeJenisAgunan" name="bpkbKodeJenisAgunan">
                                                        <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbKodeIkatanAgunan">Ikatan Agunan</label>
                                        </div>
                                        <div class="col-sm-7">
                                            <select class="form-control " id="bpkbKodeIkatanAgunan" name="bpkbKodeIkatanAgunan">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbNilaiTaksasiAgunan">Nilai Taksasi Agunan</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbNilaiTaksasiAgunan" name="bpkbNilaiTaksasiAgunan">
                                        </div>
                                        <div class="col-sm-1">
                                            <label type="number" class="control-label" style="padding-top: 5px;">NJOP</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbNJOP" name="bpkbNJOP" >
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbHargaPasar">Harga Pasar</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbHargaPasar" name="bpkbHargaPasar">
                                        </div>
                                        <div class="col-sm-1">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbAPHT">APHT</label>
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="number" class="form-control" id="bpkbAPHT" name="bpkbAPHT">
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-sm-3">
                                            <label class="control-label" style="padding-top: 5px;" for="bpkbPersenDijamin">Persen Dijamin</label>
                                        </div>
                                        <div class="col-sm-2">
                                            <input type="number" class="form-control" id="bpkbPersenDijamin" name="bpkbPersenDijamin" readonly>
                                        </div>
                                    </div>
                                    
                                <!-- Form ATAS -->
                            </div>
                        </div>
                    </div>

            <div class="tab">
              <button type="button" class="tablinks" onclick="openTab(event, 'DataBPKB')">Data BPKB</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'DataLampiranBPKB')">Data Lampiran</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'SLIKBpkb')">SLIK</button>
            </div>
            
               <!-- Start Data BPKB -->
            <div id="DataBPKB" class="tabcontent">
                <div class="row">
                      <div class="col-md-12 mx-auto">
                      <br><br>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Agunan ID</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="bpkbAgunanID" name="bpkbAgunanID" readonly>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoBPKB">No. BPKB</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="bpkbNoBPKB" name="bpkbNoBPKB" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNamaPemilik">Nama Pemilik</label>
                                  </div>
                                  <div class="col-sm-7">
                                      <input type="text" class="form-control" id="bpkbNamaPemilik" name="bpkbNamaPemilik" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbAlamatPemlik">Alamat Pemilik</label>
                                  </div>
                                  <div class="col-sm-7">
                                    <textarea style="height: 75px;" type="text" class="form-control" id="bpkbAlamatPemlik" name="bpkbAlamatPemlik"></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbKotaPemilik">Kota Pemilik</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbKotaPemilik" name="bpkbKotaPemilik" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Merk/Type</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <select class="form-control " id="bpkbMerk" name="bpkbMerk">
                                              
                                    </select>
                                  </div>
                                  <div class="col-sm-4">
                                        <select class="form-control " id="bpkbType" name="bpkbType">
                                               
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 6px;" for="">Jenis / Silinder</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <select class="form-control " id="bpkbJenis" name="bpkbJenis">
                                               
                                    </select>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="number" class="form-control" id="bpkbSilinder" name="bpkbSilinder" placeholder="Silinder"> 
                                  </div>
                                  <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 6px;" for="">CC</label>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoRangka">No. Rangka</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoRangka" name="bpkbNoRangka" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoMesin">No. Mesin</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoMesin" name="bpkbNoMesin" placeholder="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbTahun">Tahun</label>
                                  </div>
                                  <div class="col-sm-2">
                                    <input type="number" class="form-control" id="bpkbTahun" name="bpkbTahun" placeholder="Tahun" min="1500" max="2999">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbTglExpPajak">Tgl. Exp Pajak</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbTglExpPajak" name="bpkbTglExpPajak">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbTahun">Warna</label>
                                  </div>
                                  <div class="col-sm-4">
                                    <input type="text" class="form-control" id="bpkbWarna" name="bpkbWarna">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoPolisi">No. Polisi</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="text" class="form-control" id="bpkbNoPolisi" name="bpkbNoPolisi" placeholder="">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tgl. Exp STNK</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbTglExpSTNK" name="bpkbTglExpSTNK">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. STNK</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoSTNK" name="bpkbNoSTNK">
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                  </div>
            </div>
            <!-- END Data BPKB -->

            
            <!-- Start Data Lampiran -->
            <div id="DataLampiranBPKB" class="tabcontent">
                <!-- ROW -->
                <div class="row">
                      <div class="col-md-12 mx-auto">
                      <br><br>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control " id="bpkbDokKwitansiBlanko" name="bpkbDokKwitansiBlanko">
                                          
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox"  value="Y" id="check_kw_blanko" name="check_kw_blanko">Kwitansi Blanko</label>
                                </div>
                            </div>

                            <div class="form-group row">
                            <div class="col-sm-2">
                                    <select class="form-control " id="bpkbDokFakturPemilik" name="bpkbDokFakturPemilik">
                                           
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox"  value="Y" id="check_faktur_pemilik" name="check_faktur_pemilik">Faktur Pemilik</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="bpkbNoFakturPemilik">No. Faktur Pemilik</label>
                                </div>
                                <div class="col-sm-5">
                                      <input type="text" class="form-control" id="bpkbNoFakturPemilik" name="bpkbNoFakturPemilik">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control " id="bpkbDokKwJualBeli" name="bpkbDokKwJualBeli">
                                           
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox" value="Y" id="check_kw_jual_beli" name="check_kw_jual_beli">Kwitansi Jual Beli</label>
                                </div>
                            </div>
                            <!-- SK TRAYEK -->
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control " id="bpkbDokSKTrayek" name="bpkbDokSKTrayek">
                                           
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline">
                                    <input type="checkbox" value="Y" id="check_sk_trayek" name="check_sk_trayek">SK Trayek</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. SK Trayek</label>
                                </div>
                                <div class="col-sm-5">
                                      <input type="text" class="form-control" id="noSKTrayek" name="noSKTrayek">
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
                                      <input type="date" class="form-control" id="bpkbBerlakuSD" name="bpkbBerlakuSD">
                                </div>
                            </div>
                            <!-- SK TRAYEK -->
                            <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lainnya</label>
                                  </div>
                                  <div class="col-sm-9">
                                  <textarea style="height: 100px;" type="text" class="form-control" id="bpkbLainnya" name="bpkbLainnya"></textarea>
                                  </div>
                            </div>
                      </div>
                </div>
                <!-- ROW --> 
            </div>
            <!-- End Data Lampiran -->
            
            
            <!-- Start SID -->
            <div id="SLIKBpkb" class="tabcontent">
            <div class="row">
                        <div class="col-md-12 mx-auto">
                      <br><br>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Status Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control " id="bpkbSlikStatusAgunan" name="bpkbSlikStatusAgunan">
                                                
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Paripasu</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control " id="bpkbSlikParipasu" name="bpkbSlikParipasu">
                                        </select>
                                  </div>
                              </div>                
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control " id="bpkbSlikJenisAgunan" name="bpkbSlikJenisAgunan">
                                        
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Paripasu (%)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbSlikParipasuPersen" name="bpkbSlikParipasuPersen">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Peringkat Agunan</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <input type="text" class="form-control" id="bpkbSlikPeringkatAgunan" name="bpkbSlikPeringkatAgunan"  maxlength="6" >
                                  </div>
                                  <div class="col-sm-2">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Status Join Account</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control " id="bpkbSLikStatusJoinAccount" name="bpkbSLikStatusJoinAccount">
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lembaga Pemeringkat</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control " id="bpkbSlikLembagaPemeringkat" name="bpkbSlikLembagaPemeringkat">
                                               
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Diasuransikan</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control " id="bpkbSlikAsuransi" name="bpkbSlikAsuransi">
                                       
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Pengikatan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control " id="bpkbSlikJenisPengikatan" name="bpkbSlikJenisPengikatan">
                                               
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tanggal Pengikatan</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <input type="date" class="form-control" id="bpkbSlikTanggalPengikatan" name="bpkbSlikTanggalPengikatan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama Pemilik Agunan</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <input type="text" class="form-control" id="bpkbSlikNamaPemilikAgunan" name="bpkbSlikNamaPemilikAgunan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Bukti Kepemilikan</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <input type="text" class="form-control" id="bpkbSlikBuktiKepemilikanAgunan" name="bpkbSlikBuktiKepemilikanAgunan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Alamat</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <textarea style="height: 115px;" type="text" class="form-control" id="bpkbSlikAlamat" name="bpkbSlikAlamat"></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Kode Dati 2 Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control " id="bpkbSlikKodeDati2" name="bpkbSlikKodeDati2">
                                                
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (NJOP)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbSlikNilaiNJOP" name="bpkbSlikNilaiNJOP">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (LJK)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbSlikNilaiLJK" name="bpkbSlikNilaiLJK">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tanggal Penilaian (LJK)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbSlikTanggalLJK" name="bpkbSlikTanggalLJK">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan Independen</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="bpkbSlikNilaiIndependen" name="bpkbSlikNilaiIndependen">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tgl Penilaian Independen</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="bpkbSlikTglIndependen" name="bpkbSlikTglIndependen">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama Penilai Independen</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="bpkbSlikNamaIndependen" name="bpkbSlikNamaIndependen">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Keterangan</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <textarea style="height: 115px;" type="text" class="form-control" id="bpkbSlikKeterangan" name="bpkbSlikKeterangan"></textarea>
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                </div>
            </div>      
            <!-- END SLIK -->  


            <input type="hidden" class="form-control" id="bpkbID" name="bpkbID">
            <input type="hidden" class="form-control" id="bpkbNoReff" name="bpkbNoReff">

      </div>
      <!--END Modal Body-->
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" id="bpkb_button_kembali" class="btn btn-danger">Kembali</button>
        <button type="button" id="bpkb_button_simpan" class="btn btn-primary">Simpan</button>
      </div>
    </div>
  </div>
</div>

