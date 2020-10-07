<!-- Modal SERTIFIKAT -->
<div class="modal fade" id="kembaliSertifikatModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl"
       style="margin-bottom:50px; width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Pengembalian Aset Data Sertifikat</h3>
        <button type="button" class="close" id="sert_button_kembali_kembali2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="container py-5">
                  <div class="row">
                      <div class="col-md-12 mx-auto">
                      <!-- MAIN FORM -->
                              <div class="form-group row">
                                  <div class="col-sm-7">
                                  </div>
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="sertVerifikasiKembali">Verifikasi</label>
                                  </div>
                                  <div class="col-sm-2">
                                      <input class="form-control select2" id="sertVerifikasiKembali" name="sertVerifikasiKembali" disabled>
                                  </div>
                              </div> 
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="sertTglRegisterKembali">Tanggal Register</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <input type="date" class="form-control" id="sertTglRegisterKembali" name="sertTglRegisterKembali" value="" readonly>
                                    
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="sertTglPenilaianKembali">Tanggal Penilaian</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <input type="date" class="form-control" id="sertTglPenilaianKembali" name="sertTglPenilaianKembali" value="" >
                                   
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKantorLokasiKembali">Kantor Lokasi Jaminan</label>
                                  </div>
                                  <div class="col-sm-7">
                                      <select class="form-control select2" id="sertKantorLokasiKembali" name="sertKantorLokasiKembali">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKodeJenisAgunanKembali">Jenis Agunan</label>
                                  </div>
                                  <div class="col-sm-7">
                                      <select class="form-control select2" id="sertKodeJenisAgunanKembali" name="sertKodeJenisAgunanKembali">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKodeIkatanAgunanKembali">Ikatan Agunan</label>
                                  </div>
                                  <div class="col-sm-7">
                                    <select class="form-control select2" id="sertKodeIkatanAgunanKembali" name="sertKodeIkatanAgunanKembali">
                                        <option value="" selected disabled hidden>Silahkan Pilih</option>
                                    </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertNilaiTaksasiAgunanKembali">Nilai Taksasi Agunan</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertNilaiTaksasiAgunanKembali" name="sertNilaiTaksasiAgunanKembali">
                                  </div>
                                  <div class="col-sm-1">
                                      <label type="number" class="control-label" style="padding-top: 5px;">NJOP</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertNJOPKembali" name="sertNJOPKembali" >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertHargaPasarKembali">Harga Pasar</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertHargaPasarKembali" name="sertHargaPasarKembali">
                                  </div>
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="sertAPHTKembali">APHT</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertAPHTKembali" name="sertAPHTKembali">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertPersenDijaminKembali">Persen Dijamin</label>
                                  </div>
                                  <div class="col-sm-2">
                                      <input type="number" class="form-control" id="sertPersenDijaminKembali" name="sertPersenDijaminKembali" readonly>
                                  </div>
                              </div>
                             
                      </div>
                  </div>
            </div>

            <div class="tab">
              <button type="button" class="tablinks" onclick="openTab(event, 'DataSertifikatKembali')">Data Sertifikat</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'DataLampiranSertifikatKembali')">Data Lampiran</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'SIDSertifikatKembali')">SID</button>
            </div>

             <!-- Start Data Sertifikat -->
             <div id="DataSertifikatKembali" class="tabcontent">
                <div class="row">
                      <div class="col-md-10 mx-auto">
                      <br><br>
                         
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="sertAgunanIDKembali">Agunan ID</label>
                                  </div>
                                  <div class="col-sm-3">
                                  <input type="text" class="form-control" id="sertAgunanIDKembali" name="sertAgunanIDKembali" placeholder='NEW' readonly>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertIDKembali" name="sertIDKembali" readonly value="">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertNoSertKembali">No. Sertifikat</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNoSertKembali" name="sertNoSertKembali">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKOHIRKembal">No. KOHIR</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertKOHIRKembali" name="sertKOHIRKembali">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertJenisSertifikatKembali">Jenis Sertifkat</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control select2" id="sertJenisSertifikatKembali" name="sertJenisSertifikatKembali">
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="sertNoPERSILKembali">No. PERSIL</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNoPERSILKembali" name="sertNoPERSILKembali">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="sertTanggalSertifikatKembali">Tanggal Sertifikat</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="date" class="form-control" id="sertTanggalSertifikatKembali" name="sertTanggalSertifikatKembali">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" id="sertJTSHGBlblKembali" for="sertJTSHGBKembali">Tgl JT SHGB</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="date" class="form-control" id="sertJTSHGBKembali" name="sertJTSHGBKembali">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertNoSuratUkurKembali">No. Surat Ukur</label>
                                  </div>
                                  <div class="col-sm-4">
                                      <input type="text" class="form-control" id="sertNoSuratUkurKembali" name="sertNoSuratUkurKembali">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="sertPLBangunanKembali">P L Bangunan</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertPLBangunanKembali" name="sertPLBangunanKembali">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertLuasTanahKembali">Luas Tanah</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertLuasTanahKembali" name="sertLuasTanahKembali">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="sertNamaPPATKembali">Nama PPAT</label>
                                  </div>
                                  <div class="col-sm-4">
                                      <input type="text" class="form-control" id="sertNamaPPATKembali" name="sertNamaPPATKembali">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertNamaPemilikKembali">Nama Pemilik</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="sertNamaPemilikKembali" name="sertNamaPemilikKembali">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertAlamatSertifikatKembali">Alamat Sertifikat</label>
                                  </div>
                                  <div class="col-sm-8">
                                  <textarea style="height: 75px;" type="text" class="form-control" name="sertAlamatSertifikatKembali" id="sertAlamatSertifikatKembali" placeholder="Alamat..."></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKelurahanKembali">Keluarhan</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertKelurahanKembali" name="sertKelurahanKembali" >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKecamatanKembali">Kecamatan</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertKecamatanKembali" name="sertKecamatanKembali">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKotaKembali">Kota</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertKotaKembali" name="sertKotaKembali">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertPorpinsiKembali">Propinsi</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertPorpinsiKembali" name="sertPorpinsiKembali">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertBatasTanahKembali">Batas Tanah</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="sertBatasTanahKembali" name="sertBatasTanahKembali">
                                  </div>
                              </div>
                      </div>
                  </div>
            </div>
            <!-- END Data Sertifikat -->

            <!-- Start Data Lampiran -->
            <div id="DataLampiranSertifikatKembali" class="tabcontent">
                <!-- ROW -->
                <div class="row">
                      <div class="col-md-12 mx-auto">
                      <br><br>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokAJBKembali" name="sertDokAJBKembali">
                                            
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" value="Y" id="check_ajbKembali" name="check_ajbKembali">&nbsp;AJB</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNomorAJBKembali" name="sertNomorAJBKembali" >
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" >Tanggal AJB</label>
                                </div>
                                <div class="col-sm-3">
                                  <input type="date" class="form-control" id="sertTanggalAJBKembali" name="sertTanggalAJBKembali" >
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokIMBKembali" name="sertDokIMBKembali">
                                                
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_imbKembali" name='check_imbKembali' value="Y">&nbsp;IMB</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNomorIMBKembali" name="sertNomorIMBKembali" >
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSPPTKembali" name="sertDokSPPTKembali">
                                                
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_spptKembali" name='check_spptKembali' value="Y">&nbsp;SPPT</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNomorSPPTKembali" name="sertNomorSPPTKembali" >
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="">Tahun</label>
                                </div>
                                <div class="col-sm-3">
                                  <input type="number" class="form-control" id="sertTahunSPPTKembali" name="sertTahunSPPTKembali" min="1500" max="2999" >
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSKHMTKembali" name="sertDokSKHMTKembali">
                                               
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_skmhtKembali" name='check_skmhtKembali' value="Y">&nbsp;SKMHT</label>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokDenahKembali" name="sertDokDenahKembali">
                                                
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_denahKembali" name='check_denahKembali' value="Y">&nbsp;Denah</label>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokRoyaKembali" name="sertDokRoyaKembali">
                                               
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_royaKembali" name='check_royaKembali' value="Y">&nbsp;Roya</label>
                                </div>
                            </div>
                            <!--- SHT --->
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSHTKembali" name="sertDokSHTKembali">
                                               
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_shtKembali" name='check_shtKembali' value="Y">&nbsp;SHT</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNoSHTKembali" name="sertNoSHTKembali" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-3">
                                   
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Propinsi</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertPropinsiSHTKembali" name="sertPropinsiSHTKembali" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-3">
                                   
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Kota</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertKotaSHTKembali" name="sertKotaSHTKembali" >
                                </div>
                            </div>
                            <!--- SHT --->
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSTTSKembali" name="sertDokSTTSKembali">
                                                
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_sttsKembali" name='check_sttsKembali' value="Y">&nbsp;STTS</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Tahun</label>
                                </div>
                                <div class="col-sm-3">
                                  <input type="number" class="form-control" id="sertTahunSTTSKembali" name="sertTahunSTTSKembali" placeholder="Tahun" min="1500" max="2999">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control select2" id="sertDokSSBKembali" name="sertDokSSBKembali">
                                              
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_ssb_bphtKembali" name='check_ssb_bphtKembali' value="Y">&nbsp;SSB/BPHTB</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Atas Nama</label>
                                </div>
                                <div class="col-sm-6">
                                  <input type="text" class="form-control" id="sertAtasNamaSSBBPHTBKembali" name="sertAtasNamaSSBBPHTBKembali" placeholder="Atas Nama">
                                </div>
                            </div>
                            <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lainnya</label>
                                  </div>
                                  <div class="col-sm-9">
                                  <textarea style="height: 75px;" type="text" class="form-control" id="sertLainnyaKembali" name="sertLainnyaKembali"></textarea>
                                  </div>
                            </div>
                      </div>
                </div>
                <!-- ROW --> 
            </div>
            <!-- End Data Lampiran -->

            <!-- Start SID -->
            <div id="SIDSertifikatKembali" class="tabcontent">
                <div class="row">
                        <div class="col-md-10 mx-auto">
                        <br><br>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Jenis Agunan</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="sertSIDJenisAgunanKembali" name="sertSIDJenisAgunanKembali">
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                   
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Peringkat Surat Berharga</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="sertSIDPeringkatSuratKembali" name="sertSIDPeringkatSuratKembali">
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Jenis Pengikatan</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="sertJenisPengikatanKembali" name="sertJenisPengikatanKembali">
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                    
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Nama Pemilik Agunan</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="sertSIDNamaPemilikAgunanKembali" name="sertSIDNamaPemilikAgunanKembali">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Status/Bukti Kepemilikan</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="sertSIDBuktiPemilikAgunanKembali" name="sertSIDBuktiPemilikAgunanKembali">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Alamat</label>
                                    </div>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" id="sertSIDAlamatKembali" name="sertSIDAlamatKembali">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Lokasi</label>
                                    </div>
                                    <div class="col-sm-5">
                                            <select class="form-control select2" id="sertSIDLokasiKembali" name="sertSIDLokasiKembali">
                                                    <option value="" selected disabled hidden>Silahkan Pilih</option>
                                                 
                                            </select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (NJOP)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="sertNilaiNJOPKembali" name="sertNilaiNJOPKembali">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (Bank)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="sertNilaiBankKembali" name="sertNilaiBankKembali">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan Independen</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="sertNilaiIndependenKembali" name="sertNilaiIndependenKembali">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Nama Penilai Independen</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="text" class="form-control" id="sertNamaIndependenKembali" name="sertNamaIndependenKembali">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Paripasu (%)</label>
                                    </div>
                                    <div class="col-sm-5">
                                        <input type="number" class="form-control" id="sertParipasuKembali" name="sertParipasuKembali">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-3">
                                        <label class="control-label" style="padding-top: 5px;" for="">Asuransi</label>
                                    </div>
                                    <div class="col-sm-3">
                                            <select class="form-control select2" id="sertAsuransiKembali" name="sertAsuransiKembali">
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
        <button type="button" id="sert_button_kembali_kembali" class="btn btn-danger">Kembali</button>
      </div>
    </div>
  </div>
</div>

