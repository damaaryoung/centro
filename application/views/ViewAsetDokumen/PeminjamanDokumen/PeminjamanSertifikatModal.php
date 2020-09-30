<!-- Modal SERTIFIKAT -->
<div class="modal fade" id="pinjamSertifikatModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl"
       style="margin-bottom:50px; width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Peminjaman Aset Data Sertifikat</h3>
        <button type="button" class="close" id="sert_button_kembali_pinjam2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="container py-5">
                  <div class="row">
                      <div class="col-md-12 mx-auto">
                      <!-- MAIN FORM -->
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="sertTglRegisterPinjam">Tanggal Register</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <input type="date" class="form-control" id="sertTglRegisterPinjam" name="sertTglRegisterPinjam" value="" readonly>
                                    
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="sertTglPenilaianPinjam">Tanggal Penilaian</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <input type="date" class="form-control" id="sertTglPenilaianPinjam" name="sertTglPenilaianPinjam" value="" >
                                   
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKantorLokasiPinjam">Kantor Lokasi Jaminan</label>
                                  </div>
                                  <div class="col-sm-7">
                                      <select class="form-control select2" id="sertKantorLokasiPinjam" name="sertKantorLokasiPinjam">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKodeJenisAgunanPinjam">Jenis Agunan</label>
                                  </div>
                                  <div class="col-sm-7">
                                      <select class="form-control select2" id="sertKodeJenisAgunanPinjam" name="sertKodeJenisAgunanPinjam">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKodeIkatanAgunanPinjam">Ikatan Agunan</label>
                                  </div>
                                  <div class="col-sm-7">
                                    <select class="form-control select2" id="sertKodeIkatanAgunanPinjam" name="sertKodeIkatanAgunanPinjam">
                                        <option value="" selected disabled hidden>Silahkan Pilih</option>
                                    </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertNilaiTaksasiAgunanPinjam">Nilai Taksasi Agunan</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertNilaiTaksasiAgunanPinjam" name="sertNilaiTaksasiAgunanPinjam">
                                  </div>
                                  <div class="col-sm-1">
                                      <label type="number" class="control-label" style="padding-top: 5px;">NJOP</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertNJOPPinjam" name="sertNJOPPinjam" >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertHargaPasarPinjam">Harga Pasar</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertHargaPasarPinjam" name="sertHargaPasarPinjam">
                                  </div>
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="sertAPHTPinjam">APHT</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertAPHTPinjam" name="sertAPHTPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertPersenDijaminPinjam">Persen Dijamin</label>
                                  </div>
                                  <div class="col-sm-2">
                                      <input type="number" class="form-control" id="sertPersenDijaminPinjam" name="sertPersenDijaminPinjam" readonly>
                                  </div>
                              </div>
                             
                      </div>
                  </div>
            </div>

            <div class="tab">
              <button type="button" class="tablinks" onclick="openTab(event, 'DataSertifikatPinjam')">Data Sertifikat</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'DataLampiranSertifikatPinjam')">Data Lampiran</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'SIDSertifikatPinjam')">SID</button>
            </div>

             <!-- Start Data Sertifikat -->
             <div id="DataSertifikatPinjam" class="tabcontent">
                <div class="row">
                      <div class="col-md-10 mx-auto">
                      <br><br>
                         
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="sertAgunanIDPinjam">Agunan ID</label>
                                  </div>
                                  <div class="col-sm-3">
                                  <input type="text" class="form-control" id="sertAgunanIDPinjam" name="sertAgunanIDPinjam" placeholder='NEW' readonly>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertIDPinjam" name="sertIDPinjam" readonly value="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertNoSertPinjam">No. Sertifikat</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNoSertPinjam" name="sertNoSertPinjam">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKOHIRPinjam">No. KOHIR</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertKOHIRPinjam" name="sertKOHIRPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertJenisSertifikatPinjam">Jenis Sertifkat</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control select2" id="sertJenisSertifikatPinjam" name="sertJenisSertifikatPinjam">
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="sertNoPERSILPinjam">No. PERSIL</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNoPERSILPinjam" name="sertNoPERSILPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="sertTanggalSertifikatPinjam">Tanggal Sertifikat</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="date" class="form-control" id="sertTanggalSertifikatPinjam" name="sertTanggalSertifikatPinjam">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" id="sertJTSHGBlblPinjam" for="sertJTSHGBPinjam">Tgl JT SHGB</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="date" class="form-control" id="sertJTSHGBPinjam" name="sertJTSHGBPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertNoSuratUkurPinjam">No. Surat Ukur</label>
                                  </div>
                                  <div class="col-sm-4">
                                      <input type="text" class="form-control" id="sertNoSuratUkurPinjam" name="sertNoSuratUkurPinjam">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="sertPLBangunanPinjam">P L Bangunan</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertPLBangunanPinjam" name="sertPLBangunanPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertLuasTanahPinjam">Luas Tanah</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertLuasTanahPinjam" name="sertLuasTanahPinjam">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="sertNamaPPATPinjam">Nama PPAT</label>
                                  </div>
                                  <div class="col-sm-4">
                                      <input type="text" class="form-control" id="sertNamaPPATPinjam" name="sertNamaPPATPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertNamaPemilikPinjam">Nama Pemilik</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="sertNamaPemilikPinjam" name="sertNamaPemilikPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertAlamatSertifikatPinjam">Alamat Sertifikat</label>
                                  </div>
                                  <div class="col-sm-8">
                                  <textarea style="height: 75px;" type="text" class="form-control" name="sertAlamatSertifikatPinjam" id="sertAlamatSertifikatPinjam" placeholder="Alamat..."></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKelurahanPinjam">Keluarhan</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertKelurahanPinjam" name="sertKelurahanPinjam" >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKecamatanPinjam">Kecamatan</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertKecamatanPinjam" name="sertKecamatanPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKotaPinjam">Kota</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertKotaPinjam" name="sertKotaPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertPorpinsiPinjam">Propinsi</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertPorpinsiPinjam" name="sertPorpinsiPinjam">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertBatasTanahPinjam">Batas Tanah</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="sertBatasTanahPinjam" name="sertBatasTanahPinjam">
                                  </div>
                              </div>
                      </div>
                  </div>
            </div>
            <!-- END Data Sertifikat -->

            <!-- Start Data Lampiran -->
            <div id="DataLampiranSertifikatPinjam" class="tabcontent">
                <!-- ROW -->
                <div class="row">
                      <div class="col-md-12 mx-auto">
                      <br><br>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokAJBPinjam" name="sertDokAJBPinjam">
                                            
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" value="Y" id="check_ajbPinjam" name="check_ajbPinjam">&nbsp;AJB</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNomorAJBPinjam" name="sertNomorAJBPinjam" >
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" >Tanggal AJB</label>
                                </div>
                                <div class="col-sm-3">
                                  <input type="date" class="form-control" id="sertTanggalAJBPinjam" name="sertTanggalAJBPinjam" >
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokIMBPinjam" name="sertDokIMBPinjam">
                                                
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_imbPinjam" name='check_imbPinjam' value="Y">&nbsp;IMB</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNomorIMBPinjam" name="sertNomorIMBPinjam" >
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSPPTPinjam" name="sertDokSPPTPinjam">
                                                
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_spptPinjam" name='check_spptPinjam' value="Y">&nbsp;SPPT</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNomorSPPTPinjam" name="sertNomorSPPTPinjam" >
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="">Tahun</label>
                                </div>
                                <div class="col-sm-3">
                                  <input type="number" class="form-control" id="sertTahunSPPTPinjam" name="sertTahunSPPTPinjam" min="1500" max="2999" >
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSKHMTPinjam" name="sertDokSKHMTPinjam">
                                               
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_skmhtPinjam" name='check_skmhtPinjam' value="Y">&nbsp;SKMHT</label>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokDenahPinjam" name="sertDokDenahPinjam">
                                                
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_denahPinjam" name='check_denahPinjam' value="Y">&nbsp;Denah</label>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokRoyaPinjam" name="sertDokRoyaPinjam">
                                               
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_royaPinjam" name='check_royaPinjam' value="Y">&nbsp;Roya</label>
                                </div>
                            </div>
                            <!--- SHT --->
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSHTPinjam" name="sertDokSHTPinjam">
                                               
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_shtPinjam" name='check_shtPinjam' value="Y">&nbsp;SHT</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNoSHTPinjam" name="sertNoSHTPinjam" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-3">
                                   
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Propinsi</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertPropinsiSHTPinjam" name="sertPropinsiSHTPinjam" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-3">
                                   
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Kota</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertKotaSHTPinjam" name="sertKotaSHTPinjam" >
                                </div>
                            </div>
                            <!--- SHT --->
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSTTSPinjam" name="sertDokSTTSPinjam">
                                                
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_sttsPinjam" name='check_sttsPinjam' value="Y">&nbsp;STTS</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Tahun</label>
                                </div>
                                <div class="col-sm-3">
                                  <input type="number" class="form-control" id="sertTahunSTTSPinjam" name="sertTahunSTTSPinjam" placeholder="Tahun" min="1500" max="2999">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSSBPinjam" name="sertDokSSBPinjam">
                                              
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_ssb_bphtPinjam" name='check_ssb_bphtPinjam' value="Y">&nbsp;SSB/BPHTB</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Atas Nama</label>
                                </div>
                                <div class="col-sm-5">
                                  <input type="text" class="form-control" id="sertAtasNamaSSBBPHTBPinjam" name="sertAtasNamaSSBBPHTBPinjam" placeholder="Atas Nama">
                                </div>
                            </div>
                            <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lainnya</label>
                                  </div>
                                  <div class="col-sm-9">
                                  <textarea style="height: 75px;" type="text" class="form-control" id="sertLainnyaPinjam" name="sertLainnyaPinjam"></textarea>
                                  </div>
                            </div>
                      </div>
                </div>
                <!-- ROW --> 
            </div>
            <!-- End Data Lampiran -->

            <!-- Start SID -->
            <div id="SIDSertifikatPinjam" class="tabcontent">
                <div class="row">
                        <div class="col-md-10 mx-auto">
                        <br><br>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Jenis Agunan</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="sertSIDJenisAgunanPinjam" name="sertSIDJenisAgunanPinjam">
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                   
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Peringkat Surat Berharga</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="sertSIDPeringkatSuratPinjam" name="sertSIDPeringkatSuratPinjam">
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Jenis Pengikatan</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="sertJenisPengikatanPinjam" name="sertJenisPengikatanPinjam">
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                    
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Nama Pemilik Agunan</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="sertSIDNamaPemilikAgunanPinjam" name="sertSIDNamaPemilikAgunanPinjam">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Status/Bukti Kepemilikan</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="sertSIDBuktiPemilikAgunanPinjam" name="sertSIDBuktiPemilikAgunanPinjam">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Alamat</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="sertSIDAlamatPinjam" name="sertSIDAlamatPinjam">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Lokasi</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="sertSIDLokasiPinjam" name="sertSIDLokasiPinjam">
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                 
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (NJOP)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="sertNilaiNJOPPinjam" name="sertNilaiNJOPPinjam">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (Bank)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="sertNilaiBankPinjam" name="sertNilaiBankPinjam">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan Independen</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="sertNilaiIndependenPinjam" name="sertNilaiIndependenPinjam">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Nama Penilai Independen</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="text" class="form-control" id="sertNamaIndependenPinjam" name="sertNamaIndependenPinjam">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Paripasu (%)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="sertParipasuPinjam" name="sertParipasuPinjam">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Asuransi</label>
                                    </div>
                                    <div class="col-sm-3">
                                            <select class="form-control select2" id="sertAsuransiPinjam" name="sertAsuransiPinjam">
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

                                
            </div>      
      <!-- ini modal body -->


      <div class="modal-footer">
        <button type="button" id="sert_button_kembali_pinjam" class="btn btn-danger">Kembali</button>
      </div>
    </div>
  </div>
</div>

