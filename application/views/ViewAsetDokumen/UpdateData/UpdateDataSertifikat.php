<!-- Modal SERTIFIKAT -->
<div class="modal fade" id="updateSertifikat" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl"
       style="margin-bottom:50px; width:1300px; overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Update Data Sertifikat</h3>
        <button type="button" class="close" id="sert_button_kembali2" aria-label="Close">
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
                                      <label class="control-label" style="padding-top: 5px;" for="sertVerifikasi">Verifikasi</label>
                                  </div>
                                  <div class="col-sm-2">
                                      <input class="form-control" id="sertVerifikasi" name="sertVerifikasi" disabled>
                                  </div>
                              </div>    
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="sertTglRegister">Tanggal Register</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <?php //foreach ($sysdate as $row) : ?>
                                        <input type="date" class="form-control" id="sertTglRegister" name="sertTglRegister" value="<?php //echo $row['sysdate'];?>" readonly>
                                    <?php //endforeach;?>
                                  </div>
                                  <div class="col-sm-2">
                                      <label style="padding-top: 5px;" class="control-label" for="sertTglPenilaian">Tanggal Penilaian</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <?php //foreach ($sysdate as $row) : ?>
                                        <input type="date" class="form-control" id="sertTglPenilaian" name="sertTglPenilaian" value="<?php //echo $row['sysdate'];?>" >
                                    <?php// endforeach;?>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="sertKantorLokasi">Kantor Lokasi Jaminan</label>
                                  </div>
                                  <div class="col-sm-7">
                                      <select class="form-control" id="sertKantorLokasi" name="sertKantorLokasi">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Agunan</label>
                                  </div>
                                  <div class="col-sm-7">
                                      <select class="form-control" id="sertKodeJenisAgunan" name="sertKodeJenisAgunan">
                                                <option value="" selected disabled hidden>Silahkan Pilih</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Ikatan Agunan</label>
                                  </div>
                                  <div class="col-sm-7">
                                    <select class="form-control" id="sertKodeIkatanAgunan" name="sertKodeIkatanAgunan">
                                        <option value="" selected disabled hidden>Silahkan Pilih</option>
                                    </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Taksasi Agunan</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertNilaiTaksasiAgunan" name="sertNilaiTaksasiAgunan">
                                  </div>
                                  <div class="col-sm-1">
                                      <label type="number" class="control-label" style="padding-top: 5px;">NJOP</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertNJOP" name="sertNJOP" >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Harga Pasar</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertHargaPasar" name="sertHargaPasar">
                                  </div>
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="">APHT</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertAPHT" name="sertAPHT">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Persen Dijamin</label>
                                  </div>
                                  <div class="col-sm-2">
                                      <input type="number" class="form-control" id="sertPersenDijamin" name="sertPersenDijamin" readonly>
                                  </div>
                              </div>
                             
                      </div>
                  </div>
            </div>

            <div class="tab">
              <button type="button" class="tablinks" onclick="openTab(event, 'DataSertifikat')">Data Sertifikat</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'DataLampiranSertifikat')">Data Lampiran</button>
              <button type="button" class="tablinks" onclick="openTab(event, 'SLIKSertifikat')">SLIK</button>
            </div>

             <!-- Start Data Sertifikat -->
             <div id="DataSertifikat" class="tabcontent">
                <div class="row">
                      <div class="col-md-11 mx-auto">
                      <br><br>
                         
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Agunan ID</label>
                                  </div>
                                  <div class="col-sm-3">
                                  <input type="text" class="form-control" id="sertAgunanID" name="sertAgunanID" placeholder='NEW' readonly>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertID" name="sertID" readonly value="<?php //echo $nextID;?>">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. Sertifikat</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNoSert" name="sertNoSert">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. KOHIR</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertKOHIR" name="sertKOHIR">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Sertifkat</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control" id="sertJenisSertifikat" name="sertJenisSertifikat">
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. PERSIL</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNoPERSIL" name="sertNoPERSIL">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Tanggal Sertifikat</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="date" class="form-control" id="sertTanggalSertifikat" name="sertTanggalSertifikat">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" id="sertJTSHGBlbl" for="sertJTSHGB">Tgl JT SHGB</label>
                                  </div>
                                  <div class="col-sm-3">
                                    <input type="date" class="form-control" id="sertJTSHGB" name="sertJTSHGB">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">No. Surat Ukur</label>
                                  </div>
                                  <div class="col-sm-4">
                                      <input type="text" class="form-control" id="sertNoSuratUkur" name="sertNoSuratUkur">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">P L Bangunan</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertPLBangunan" name="sertPLBangunan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Luas Tanah</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertLuasTanah" name="sertLuasTanah">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama PPAT</label>
                                  </div>
                                  <div class="col-sm-4">
                                      <input type="text" class="form-control" id="sertNamaPPAT" name="sertNamaPPAT">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama Pemilik</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="sertNamaPemilik" name="sertNamaPemilik">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Alamat Sertifikat</label>
                                  </div>
                                  <div class="col-sm-8">
                                  <textarea style="height: 75px;" type="text" class="form-control" name="sertAlamatSertifikat" id="sertAlamatSertifikat" placeholder="Alamat..."></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Kelurahan</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertKelurahan" name="sertKelurahan" >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Kecamatan</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertKecamatan" name="sertKecamatan" >
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Kota</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertKota" name="sertKota">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Propinsi</label>
                                  </div>
                                  <div class="col-sm-5">
                                      <input type="text" class="form-control" id="sertPorpinsi" name="sertPorpinsi">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;" for="">Batas Tanah</label>
                                  </div>
                                  <div class="col-sm-8">
                                      <input type="text" class="form-control" id="sertBatasTanah" name="sertBatasTanah">
                                  </div>
                              </div>
                      </div>
                  </div>
            </div>
            <!-- END Data Sertifikat -->

            <!-- Start Data Lampiran -->
            <div id="DataLampiranSertifikat" class="tabcontent">
                <!-- ROW -->
                <div class="row">
                      <div class="col-md-12 mx-auto">
                      <br><br>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control" id="sertDokAJB" name="sertDokAJB">
                                            
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" value="Y" id="check_ajb" name="check_ajb">&nbsp;AJB</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNomorAJB" name="sertNomorAJB" >
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Tanggal AJB</label>
                                </div>
                                <div class="col-sm-3">
                                  <input type="date" class="form-control" id="sertTanggalAJB" name="sertTanggalAJB" >
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control" id="sertDokIMB" name="sertDokIMB">
                                                
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_imb" name='check_imb' value="Y">&nbsp;IMB</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNomorIMB" name="sertNomorIMB" >
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control" id="sertDokSPPT" name="sertDokSPPT">
                                                
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_sppt" name='check_sppt' value="Y">&nbsp;SPPT</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNomorSPPT" name="sertNomorSPPT" >
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Tahun</label>
                                </div>
                                <div class="col-sm-3">
                                  <input type="number" class="form-control" id="sertTahunSPPT" name="sertTahunSPPT" min="1500" max="2999" >
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control" id="sertDokSKHMT" name="sertDokSKHMT">
                                               
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_skmht" name='check_skmht' value="Y">&nbsp;SKMHT</label>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control" id="sertDokDenah" name="sertDokDenah">
                                                
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_denah" name='check_denah' value="Y">&nbsp;Denah</label>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control" id="sertDokRoya" name="sertDokRoya">
                                               
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_roya" name='check_roya' value="Y">&nbsp;Roya</label>
                                </div>
                            </div>
                            <!--- SHT --->
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control" id="sertDokSHT" name="sertDokSHT">
                                               
                                    </select>
                                </div>
                                <div class="col-sm-1">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_sht" name='check_sht' value="Y">&nbsp;SHT</label>
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Nomor</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertNoSHT" name="sertNoSHT" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-3">
                                   
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Propinsi</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertPropinsiSHT" name="sertPropinsiSHT" >
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-3">
                                   
                                </div>
                                <div class="col-sm-1">
                                    <label class="control-label" style="padding-top: 5px;" for="">Kota</label>
                                </div>
                                <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertKotaSHT" name="sertKotaSHT" >
                                </div>
                            </div>
                            <!--- SHT --->
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control" id="sertDokSTTS" name="sertDokSTTS">
                                                
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_stts" name='check_stts' value="Y">&nbsp;STTS</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Tahun</label>
                                </div>
                                <div class="col-sm-3">
                                  <input type="number" class="form-control" id="sertTahunSTTS" name="sertTahunSTTS" placeholder="Tahun" min="1500" max="2999">
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-2">
                                    <select class="form-control" id="sertDokSSB" name="sertDokSSB">
                                              
                                    </select>
                                </div>
                                <div class="col-sm-2">
                                    <label style="padding-left: 5px; padding-top: 5px;" class="checkbox-inline"><input type="checkbox" id="check_ssb_bpht" name='check_ssb_bpht' value="Y">&nbsp;SSB/BPHTB</label>
                                </div>
                                <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;"  for="inputFirstname">Atas Nama</label>
                                </div>
                                <div class="col-sm-5">
                                  <input type="text" class="form-control" id="sertAtasNamaSSBBPHTB" name="sertAtasNamaSSBBPHTB" placeholder="Atas Nama">
                                </div>
                            </div>
                            <div class="form-group row">
                                  <div class="col-sm-1">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lainnya</label>
                                  </div>
                                  <div class="col-sm-9">
                                  <textarea style="height: 75px;" type="text" class="form-control" id="sertLainnya" name="sertLainnya"></textarea>
                                  </div>
                            </div>
                      </div>
                </div>
                <!-- ROW --> 
            </div>
            <!-- End Data Lampiran -->

            <!-- Start SID -->
            <div id="SLIKSertifikat" class="tabcontent">
                <div class="row">
                        <div class="col-md-12 mx-auto">
                      <br><br>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Status Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control" id="sertSlikStatusAgunan" name="sertSlikStatusAgunan">
                                                
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Paripasu</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control" id="sertSlikParipasu" name="sertSlikParipasu">
                                        </select>
                                  </div>
                              </div>                
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control" id="sertSlikJenisAgunan" name="sertSlikJenisAgunan">
                                        
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Paripasu (%)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertSlikParipasuPersen" name="sertSlikParipasuPersen">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Peringkat Agunan</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <input type="text" class="form-control" id="sertSlikPeringkatAgunan" name="sertSlikPeringkatAgunan"  maxlength="6" >
                                  </div>
                                  <div class="col-sm-2">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Status Join Account</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control" id="sertSLikStatusJoinAccount" name="sertSLikStatusJoinAccount">
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Lembaga Pemeringkat</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control" id="sertSlikLembagaPemeringkat" name="sertSlikLembagaPemeringkat">
                                               
                                        </select>
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Diasuransikan</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <select class="form-control" id="sertSlikAsuransi" name="sertSlikAsuransi">
                                       
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Jenis Pengikatan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control" id="sertSlikJenisPengikatan" name="sertSlikJenisPengikatan">
                                               
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tanggal Pengikatan</label>
                                  </div>
                                  <div class="col-sm-3">
                                        <input type="date" class="form-control" id="sertSlikTanggalPengikatan" name="sertSlikTanggalPengikatan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama Pemilik Agunan</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <input type="text" class="form-control" id="sertSlikNamaPemilikAgunan" name="sertSlikNamaPemilikAgunan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Bukti Kepemilikan</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <input type="text" class="form-control" id="sertSlikBuktiKepemilikanAgunan" name="sertSlikBuktiKepemilikanAgunan">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Alamat</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <textarea style="height: 115px;" type="text" class="form-control" id="sertSlikAlamat" name="sertSlikAlamat"></textarea>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Kode Dati 2 Agunan</label>
                                  </div>
                                  <div class="col-sm-5">
                                        <select class="form-control" id="sertSlikKodeDati2" name="sertSlikKodeDati2">
                                                
                                        </select>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (NJOP)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertSlikNilaiNJOP" name="sertSlikNilaiNJOP">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan (LJK)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertSlikNilaiLJK" name="sertSlikNilaiLJK">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tanggal Penilaian (LJK)</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="sertSlikTanggalLJK" name="sertSlikTanggalLJK">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nilai Agunan Independen</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="number" class="form-control" id="sertSlikNilaiIndependen" name="sertSlikNilaiIndependen">
                                  </div>
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Tgl Penilaian Independen</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="date" class="form-control" id="sertSlikTglIndependen" name="sertSlikTglIndependen">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Nama Penilai Independen</label>
                                  </div>
                                  <div class="col-sm-3">
                                      <input type="text" class="form-control" id="sertSlikNamaIndependen" name="sertSlikNamaIndependen">
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-2">
                                      <label class="control-label" style="padding-top: 5px;" for="">Keterangan</label>
                                  </div>
                                  <div class="col-sm-6">
                                      <textarea style="height: 115px;" type="text" class="form-control" id="sertSlikKeterangan" name="sertSlikKeterangan"></textarea>
                                  </div>
                              </div>
                          <!-- Form ATAS -->
                      </div>
                      </div>
                      </div>
                  
            <!-- END SLIK -->                
                                
            </div>      
      <!-- ini modal body -->


      <div class="modal-footer">
        <button type="button" id="sert_button_kembali" class="btn btn-danger">Kembali</button>
        <button type="button" id="sert_button_simpan" class="btn btn-primary">Simpan</button>
      </div>
    </div>
  </div>
</div>

