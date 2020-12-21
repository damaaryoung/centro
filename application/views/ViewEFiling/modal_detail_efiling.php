<div class="modal fade" id="modal_pengisian_efiling">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="title_form">Form Edit E-Filling</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style="height: 500px; overflow-y: auto">

              <!-- card header start -->
              <div class="card card-info">
                <div class="card-header">
                  HEADER
                </div>
                <div class="card-body">
                        <div class="row">
                            <!-- form atas -->
                            <div class="col-md-11 mx-auto">
                                <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label class="control-label" style="padding-top: 5px;"  for="area_kerja">Area Kerja</label>
                                                </div>
                                                <div class="col-sm-4">
                                                      <input type="text" class="form-control form-control-sm" id="area_kerja" name="area_kerja" disabled>
                                                </div>
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="nomor_rekening">Nomor Rekening</label>
                                                </div>
                                                <div class="col-sm-3">
                                                      <input type="text" class="form-control form-control-sm" id="nomor_rekening" name="nomor_rekening" disabled>
                                                </div>
                                </div>
                                <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label class="control-label" style="padding-top: 5px;"  for="inp_plafon">PLafon & Tenor</label>
                                                </div>
                                                <div class="col-sm-2">
                                                      <input type="number" class="form-control form-control-sm" id="inp_plafon" name="inp_plafon" disabled>
                                                </div>
                                                <div class="col-sm-1">
                                                      <input type="number" class="form-control form-control-sm" id="inp_tenor" name="inp_tenor" disabled>
                                                </div>
                                                <div class="col-sm-1">  <span>Bulan</span></div>
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="inp_nomor_rekening">Tanggal Realisasi</label>
                                                </div>
                                                <div class="col-sm-3">
                                                      <input type="date" class="form-control form-control-sm" id="inp_nomor_rekening" name="inp_nomor_rekening" disabled>
                                                </div>
                                </div>
                            </div>
                        </div>
                </div>
              </div>

              <!--card header end -->


              <!--card details start --> 
              <div class="card card-danger">
                <div class="card-header">
                  DETAILS
                </div>
                <div class="card-body">
                        <div class="row">
                            <div class="col-md-12 mx-auto">
                                <div class="form-group row">
                                    <div class="col-5 col-sm-2">
                                      <div class="nav flex-column nav-tabs h-100" id="vert-tabs-tab" role="tablist" aria-orientation="vertical">
                                        <a class="nav-link active" id="vert-tab-nasabah" data-toggle="pill" href="#tab-nasabah" role="tab" aria-controls="tab-nasabah" aria-selected="true">Nasabah</a>
                                        <a class="nav-link" id="vert-tabs-permohonan-kredit-tab" data-toggle="pill" href="#vert-tabs-permohonan-kredit" role="tab" aria-controls="vert-tabs-profile" aria-selected="false">Permohonan Kredit</a>
                                        <a class="nav-link" id="vert-tabs-tab-jaminan-tab" data-toggle="pill" href="#vert-tabs-jaminan" role="tab" aria-controls="vert-tabs-messages" aria-selected="false">Jaminan</a>
                                        <a class="nav-link" id="vert-tabs-bi-checking-tab" data-toggle="pill" href="#vert-tabs-bi-checking" role="tab" aria-controls="vert-tabs-settings" aria-selected="false">BI Checking</a>
                                        <a class="nav-link" id="vert-tabs-credit_analist-tab" data-toggle="pill" href="#vert-tabs-credit_analist" role="tab" aria-controls="vert-tabs-credit_analist" aria-selected="false">Credit Analist</a>
                                        <a class="nav-link" id="vert-tabs-legal-tab" data-toggle="pill" href="#vert-tabs-legal" role="tab" aria-controls="vert-tabs-legal" aria-selected="false">Legal</a>   
                                        <a class="nav-link" id="vert-tabs-spk-tab" data-toggle="pill" href="#vert-tabs-spk" role="tab" aria-controls="vert-tabs-spk" aria-selected="false">SPK & NDK</a>
                                        <a class="nav-link" id="vert-tabs-foto-tab" data-toggle="pill" href="#vert-tabs-foto" role="tab" aria-controls="#vert-tabs-foto" aria-selected="false">Foto</a>
                                      </div>
                                    </div>
                                    <div class="col-7 col-sm-9">
                                      <div class="tab-content" id="vert-tabs-tabContent">
                                        <!-- START NASABAH -->
                                            <div class="tab-pane text-left fade active show" id="tab-nasabah" role="tabpanel" aria-labelledby="vert-tab-nasabah">
                                              <!-- START Verifikasi Nasabah -->
                                              <div class="col-md-12 form-verifikasi">
                                                <div class="card card-success">
                                                  <div class="card-header">
                                                    <h3 class="card-title">Verifikasi Nasabah</h3>
                                                    <div class="card-tools">
                                                      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-angle-down"></i>
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div class="card-body">
                                                    <div class="form-group row">
                                                      <label for="verifikasi_nasabah" class="col-sm-2 col-form-label">Status</label>
                                                      <div class="col-sm-8">
                                                        <select class="form-control" id="verifikasi_nasabah" onchange="check('verifikasi_nasabah','ket-verifi-nasabah')" >
                                                          <option value="COMPLETED">COMPLETED</option>
                                                          <option value="NOT COMPLETED">NOT COMPLETED</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                    <div  id="ket-verifi-nasabah" style="display:none;" >
                                                      <div class="form-group row">
                                                        <label for="note_verifi_nasabah" class="col-sm-2 col-form-label">Notes</label>
                                                        <div class="col-sm-8">
                                                        <textarea class="form-control" id="note_verifi_nasabah" rows="3" placeholder="Enter ..."></textarea>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <!-- END Verifikasi Nasabah -->
                                              
                                              <div class="form-group">
                                                <label for="customFile">KTP All</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="ktp_all"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="ktp_all">Choose file</label>
                                                </div>
                                              </div>
                                              <div class="form-group">
                                                <label for="customFile">Kartu Keluarga</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="kartu_keluarga" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="kartu_keluarga">Choose file</label>
                                                </div>
                                              </div>
                                              <div class="form-group">
                                                <label for="customFile">NPWP</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="inp_npwp"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="inp_npwp">Choose file</label>
                                                </div>
                                              </div>
                                              <div class="form-group">
                                                <label for="customFile">Surat Nikah</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="surat_nikah"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="surat_nikah">Choose file</label>
                                                </div>
                                              </div>
                                              <div class="form-group">
                                                <label for="customFile">Surat Cerai</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="surat_cerai" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="surat_cerai">Choose file</label>
                                                </div>
                                              </div>  
                                              <div class="form-group">
                                                <label for="customFile">Surat Lahir</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="surat_lahir"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="surat_lahir">Choose file</label>
                                                </div>
                                              </div> 
                                              <div class="form-group">
                                                <label for="customFile">Surat Kematian</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="surat_kematian" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="surat_kematian">Choose file </label>
                                                </div>
                                              </div>     
                                              <div class="form-group">
                                                <label for="customFile">Surat Keterangan Desa/PM1/PM2</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="surat_keterangan_desa" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="surat_keterangan_desa">Choose file</label>
                                                </div>
                                              </div>    
                                              <div class="form-group">
                                                <label for="customFile">Slip Gaji</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="slip_gaji" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="slip_gaji">Choose file </label>
                                                </div>
                                              </div>   
                                              <div class="form-group">
                                                <label for="customFile">Take Over</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="take_over" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="take_over">Choose file</label>
                                                </div>
                                              </div> 
                                              <div class="form-group">
                                                <label for="customFile">Surat Keterangan Kerja</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="surat_keterangan_kerja" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="surat_keterangan_kerja">Choose file </label>
                                                </div>
                                              </div>     
                                              <div class="form-group">
                                                <label for="customFile">Surat Keterangan Usaha</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="surat_keterangan_usaha"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="surat_keterangan_usaha">Choose file </label>
                                                </div>
                                              </div>  
                                              <div class="form-group">
                                                <label for="customFile">Rekening Koran</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="rekening_koran"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="rekening_koran">Choose file</label>
                                                </div>
                                              </div> 
                                              <div class="form-group">
                                                <label for="customFile">TDP/SIUP</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="tdp_siup" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="tdp_siup">Choose file </label>
                                                </div>
                                              </div>     
                                              <div class="form-group">
                                                <label for="customFile">Bon-Bon Usaha</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="bon_bon_usaha"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="bon_bon_usaha">Choose file </label>
                                                </div>
                                              </div>      
                                            </div>
                                      <!-- END NASABAH -->

                                      <!-- START PERMOHONAN KREDIT -->
                                          <div class="tab-pane fade" id="vert-tabs-permohonan-kredit" role="tabpanel" aria-labelledby="vert-tabs-permohonan-kredit-tab">
                                              <!-- START Verifikasi PERMOHONAN KREDIT -->
                                              <div class="col-md-12 form-verifikasi">
                                                <div class="card card-success collapsed-card">
                                                  <div class="card-header">
                                                    <h3 class="card-title">Verifikasi Permohonan Kredit</h3>
                                                    <div class="card-tools">
                                                      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-angle-down"></i>
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div class="card-body">
                                                    <div class="form-group row">
                                                      <label for="verifikasi_permohonan_kredit" class="col-sm-2 col-form-label">Status</label>
                                                      <div class="col-sm-8">
                                                        <select class="form-control" id="verifikasi_permohonan_kredit" onchange="check('verifikasi_permohonan_kredit','ket-verifi-permohonan-kredit')" >
                                                          <option value="COMPLETED">COMPLETED</option>
                                                          <option value="NOT COMPLETED">NOT COMPLETED</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                    <div  id="ket-verifi-permohonan-kredit" style="display:none;" >
                                                      <div class="form-group row">
                                                        <label for="note_verifi_permohonan_kredit" class="col-sm-2 col-form-label">Notes</label>
                                                        <div class="col-sm-8">
                                                        <textarea class="form-control" id="note_verifi_permohonan_kredit" rows="3" placeholder="Enter ..."></textarea>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <!-- END Verifikasi PERMOHONAN KREDIT -->
                                              <div class="form-group">
                                                <label for="customFile">Aplikasi Permohonan Kredit</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="aplikasi_permohonan_kredit" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="aplikasi_permohonan_kredit">Choose file</label>
                                                </div>
                                              </div>
                                              <div class="form-group">
                                                <label for="customFile">Denah Lokasi Tempat Tinggal & Usaha</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="denah_lokasi" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="denah_lokasi">Choose file</label>
                                                </div>
                                              </div>
                                              <div class="form-group">
                                                <label for="customFile">Checklist Kelengkapan Dokumen Krdit</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="kelengkapan_dokumen_kredit"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="kelengkapan_dokumen_kredit">Choose file</label>
                                                </div>
                                              </div>
                                          </div>
                                      <!-- END PERMOHONAN KREDIT -->

                                      <!-- START JAMINAN -->
                                        <div class="tab-pane fade" id="vert-tabs-jaminan" role="tabpanel" aria-labelledby="vert-tabs-tab-jaminan-tab">
                                              <!-- START Verifikasi Jaminan -->
                                              <div class="col-md-12 form-verifikasi">
                                                <div class="card card-success">
                                                  <div class="card-header">
                                                    <h3 class="card-title">Verifikasi Jaminan</h3>
                                                    <div class="card-tools">
                                                      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-angle-down"></i>
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div class="card-body">
                                                    <div class="form-group row">
                                                      <label for="verifikasi_jaminan" class="col-sm-2 col-form-label">Status</label>
                                                      <div class="col-sm-8">
                                                        <select class="form-control" id="verifikasi_jaminan" onchange="check('verifikasi_jaminan','ket-verifi-jaminan')" >
                                                          <option value="COMPLETED">COMPLETED</option>
                                                          <option value="NOT COMPLETED">NOT COMPLETED</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                    <div  id="ket-verifi-jaminan" style="display:none;" >
                                                      <div class="form-group row">
                                                        <label for="note_verifi_jaminan" class="col-sm-2 col-form-label">Notes</label>
                                                        <div class="col-sm-8">
                                                        <textarea class="form-control" id="note_verifi_jaminan" rows="3" placeholder="Enter ..."></textarea>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <!-- END Verifikasi Jaminan -->
                                              <div class="form-group">
                                                <label for="customFile">Sertifikat</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="jaminan_sertifikat" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="jaminan_sertifikat">Choose file</label>
                                                </div>
                                              </div>
                                              <div class="form-group">
                                                <label for="customFile">SKMHT</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="jaminan_skmht" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="jaminan_skmht">Choose file SKMHT</label>
                                                </div>
                                              </div>
                                              <div class="form-group">
                                                <label for="customFile">APHT</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="jaminan_apht" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="jaminan_apht">Choose file </label>
                                                </div>
                                              </div>
                                              <div class="form-group">
                                                <label for="customFile">Cabut Roya</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="jaminan_roya" dir="jaminan" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="jaminan_roya">Choose file Roya</label>
                                                </div>
                                              </div>
                                              <div class="form-group">
                                                <label for="customFile">SHT</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="jaminan_sht" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="jaminan_sht">Choose file</label>
                                                </div>
                                              </div>  
                                              <div class="form-group">
                                                <label for="customFile">PBB</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="jaminan_pbb"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="jaminan_pbb">Choose file </label>
                                                </div>
                                              </div>  
                                              <div class="form-group">
                                                <label for="customFile">IMB</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="jaminan_pbb"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="jaminan_imb">Choose file </label>
                                                </div>
                                              </div>  
                                              <div class="form-group">
                                                <label for="customFile">AJB</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="jaminan_ajb"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="jaminan_ajb">Choose file </label>
                                                </div>
                                              </div> 
                                              <div class="form-group">
                                                <label for="customFile">BPKB</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="jaminan_bpkb" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="jaminan_bpkb">Choose file </label>
                                                </div>
                                              </div> 
                                              <div class="form-group">
                                                <label for="customFile">FIDUSIA</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="jaminan_fidusia" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="jaminan_fidusia">Choose file </label>
                                                </div>
                                              </div> 
                                              <div class="form-group">
                                                <label for="customFile">Ahli Waris</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="jaminan_ahli_waris"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="jaminan_ahli_waris">Choose file </label>
                                                </div>
                                              </div> 
                                              <div class="form-group">
                                                <label for="customFile">Pengakuan Hutang</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="jaminan_pengakuan_hutang"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="jaminan_pengakuan_hutang">Choose file </label>
                                                </div>
                                              </div> 
                                              <div class="form-group">
                                                <label for="customFile">Akta Pengakuan Hak Bersama</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="jaminan_pengakuan_hak" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="jaminan_pengakuan_hak">Choose file </label>
                                                </div>
                                              </div> 
                                              <div class="form-group">
                                                <label for="customFile">Addendum</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="jaminan_addendum"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="jaminan_addendum">Choose file </label>
                                                </div>
                                              </div>
                                        </div>
                                      <!-- END JAMINAN -->

                                      
                                      <!-- START BI CHECKING -->
                                        <div class="tab-pane fade" id="vert-tabs-bi-checking" role="tabpanel" aria-labelledby="vert-tabs-bi-checking-tab">
                                               <!-- START Verifikasi BI CHECKING -->
                                               <div class="col-md-12 form-verifikasi">
                                                <div class="card card-success">
                                                  <div class="card-header">
                                                    <h3 class="card-title">Verifikasi BI Checking</h3>
                                                    <div class="card-tools">
                                                      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-angle-down"></i>
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div class="card-body">
                                                    <div class="form-group row">
                                                      <label for="verifikasi_checking" class="col-sm-2 col-form-label">Status</label>
                                                      <div class="col-sm-8">
                                                        <select class="form-control" id="verifikasi_checking" onchange="check('verifikasi_checking','ket-verifi-checking')" >
                                                          <option value="COMPLETED">COMPLETED</option>
                                                          <option value="NOT COMPLETED">NOT COMPLETED</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                    <div  id="ket-verifi-checking" style="display:none;" >
                                                      <div class="form-group row">
                                                        <label for="note_verifi_checking" class="col-sm-2 col-form-label">Notes</label>
                                                        <div class="col-sm-8">
                                                        <textarea class="form-control" id="note_verifi_checking" rows="3" placeholder="Enter ..."></textarea>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <!-- END Verifikasi BI CHECKING -->
                                              <div class="form-group">
                                                <label for="customFile">Form Pengajuan BI Checking</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="form_pengajuan_bi_checking" onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="form_pengajuan_bi_checking">Choose file</label>
                                                </div>
                                              </div>
                                              <div class="form-group">
                                                <label for="customFile">Form Persetujuan BI Checking</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="form_persetujuan_bi_checking"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="form_persetujuan_bi_checking">Choose file</label>
                                                </div>
                                              </div>
                                              <div class="form-group">
                                                <label for="customFile">Hasil BI Checking</label>
                                                <div class="custom-file">
                                                  <input type="file" class="custom-file-input" id="form_hasil_bi_checking"  onchange='getImg(event)'>
                                                  <label class="custom-file-label" for="form_hasil_bi_checking">Choose file</label>
                                                </div>
                                              </div>   
                                        </div>
                                      <!-- END BI CHECKING --> 

                                      <!-- START CREDIT ANALIST -->
                                        <div class="tab-pane fade" id="vert-tabs-credit_analist" role="tabpanel" aria-labelledby="vert-tabs-credit_analist-tab">
                                            <!-- START Verifikasi Credit Analist -->
                                              <div class="col-md-12 form-verifikasi">
                                                <div class="card card-success">
                                                  <div class="card-header">
                                                    <h3 class="card-title">Verifikasi Credit Analist</h3>
                                                    <div class="card-tools">
                                                      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-angle-down"></i>
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div class="card-body">
                                                    <div class="form-group row">
                                                      <label for="verifikasi_credit" class="col-sm-2 col-form-label">Status</label>
                                                      <div class="col-sm-8">
                                                        <select class="form-control" id="verifikasi_credit" onchange="check('verifikasi_credit','ket-verifi-credit')" >
                                                          <option value="COMPLETED">COMPLETED</option>
                                                          <option value="NOT COMPLETED">NOT COMPLETED</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                    <div  id="ket-verifi-credit" style="display:none;" >
                                                      <div class="form-group row">
                                                        <label for="note_verifi_credit" class="col-sm-2 col-form-label">Notes</label>
                                                        <div class="col-sm-8">
                                                        <textarea class="form-control" id="note_verifi_credit" rows="3" placeholder="Enter ..."></textarea>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            <!-- END Verifikasi Credit Analist -->
                                          <div class="form-group">
                                            <label for="customFile">Memorandum Account Officer</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="account_office"  onchange='getImg(event)'>
                                              <label class="custom-file-label" for="account_office">Choose file</label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Memorandum Credit Analist</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="credit_analist" onchange='getImg(event)' >
                                              <label class="custom-file-label" for="credit_analist">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Offering Letter</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="offering_let"  onchange='getImg(event)'>
                                              <label class="custom-file-label" for="offering_let">Choose file</label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Form Verifikasi & Penilaian Jaminan</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="verifikasi_jaminan" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="verifikasi_jaminan">Choose file</label>
                                            </div>
                                          </div>
                                        </div>
                                      <!-- END CREDIT ANALIST -->  

                                      <!-- START LEGAL -->
                                        <div class="tab-pane fade" id="vert-tabs-legal" role="tabpanel" aria-labelledby="vert-tabs-legal-tab">
                                            <!-- START Verifikasi Legal -->
                                              <div class="col-md-12 form-verifikasi">
                                                <div class="card card-success">
                                                  <div class="card-header">
                                                    <h3 class="card-title">Verifikasi Legal</h3>
                                                    <div class="card-tools">
                                                      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-angle-down"></i>
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div class="card-body">
                                                    <div class="form-group row">
                                                      <label for="verifikasi_legal" class="col-sm-2 col-form-label">Status</label>
                                                      <div class="col-sm-8">
                                                        <select class="form-control" id="verifikasi_legal" onchange="check('verifikasi_legal','ket-verifi-legal')" >
                                                          <option value="COMPLETED">COMPLETED</option>
                                                          <option value="NOT COMPLETED">NOT COMPLETED</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                    <div  id="ket-verifi-legal" style="display:none;" >
                                                      <div class="form-group row">
                                                        <label for="note_verifi_legal" class="col-sm-2 col-form-label">Notes</label>
                                                        <div class="col-sm-8">
                                                        <textarea class="form-control" id="note_verifi_legal" rows="3" placeholder="Enter ..."></textarea>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            <!-- END Verifikasi Legal -->
                                          <div class="form-group">
                                            <label for="customFile">Form Pengajuan</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="pengajuan"  onchange='getImg(event)'>
                                              <label class="custom-file-label" for="pengajuan">Choose file Foto Jaminan</label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">LPDK</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="lpdk" onchange='getImg(event)' >
                                              <label class="custom-file-label" for="lpdk">Choose file Foto Pengikatan</label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Checklist Pengikatan</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="check_pengikatan"  onchange='getImg(event)'>
                                              <label class="custom-file-label" for="check_pengikatan">Choose file Foto Domisili</label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Order Pengikatan</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="oder_pengikatan" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="oder_pengikatan">Choose file Foto Usaha</label>
                                            </div>
                                          </div>
                                        </div>
                                      <!-- END LEGAL -->

                                      <!-- START SPK & NDK -->
                                        <div class="tab-pane fade" id="vert-tabs-spk" role="tabpanel" aria-labelledby="vert-tabs-spk-tab">
                                            <!-- START Verifikasi SPK & NDK -->
                                              <div class="col-md-12 form-verifikasi">
                                                <div class="card card-success">
                                                  <div class="card-header">
                                                    <h3 class="card-title">Verifikasi SPK & NDK</h3>
                                                    <div class="card-tools">
                                                      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-angle-down"></i>
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div class="card-body">
                                                    <div class="form-group row">
                                                      <label for="verifikasi_spk" class="col-sm-2 col-form-label">Status</label>
                                                      <div class="col-sm-8">
                                                        <select class="form-control" id="verifikasi_spk" onchange="check('verifikasi_spk','ket-verifi-spk')" >
                                                          <option value="COMPLETED">COMPLETED</option>
                                                          <option value="NOT COMPLETED">NOT COMPLETED</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                    <div  id="ket-verifi-spk" style="display:none;" >
                                                      <div class="form-group row">
                                                        <label for="note_verifi_spk" class="col-sm-2 col-form-label">Notes</label>
                                                        <div class="col-sm-8">
                                                        <textarea class="form-control" id="note_verifi_spk" rows="3" placeholder="Enter ..."></textarea>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            <!-- END Verifikasi SPK& NDK -->
                                          <div class="form-group">
                                            <label for="customFile">SPK & NDK</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="spk"  onchange='getImg(event)'>
                                              <label class="custom-file-label" for="spk">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Surat Pernyataan Asuransi</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="asuransi" onchange='getImg(event)' >
                                              <label class="custom-file-label" for="asuransi">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Surat Pernyataan Tidak Ada IMB</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="no_IMB"  onchange='getImg(event)'>
                                              <label class="custom-file-label" for="no_IMB">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Jadwal Angsuran</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="jadwal_angsuran" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="jadwal_angsuran">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Personal Guarantee ( Penjamin )</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="penjamin" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="penjamin">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Surat Pernyataan Hold Dana</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="hold_dana" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="hold_dana">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Surat Perintah Transfer</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="srt_transfer" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="srt_transfer">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Surat Keabsahan Data</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="srt_keabsahan" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="srt_keabsahan">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Surat Pernyataan Beda Tanggal Jatuh Tempo</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="srt_jth_tempo" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="srt_jth_tempo">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Surat Pernyataan Data Authentic</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="srt_auth" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="srt_auth">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Surat Pernyataan Penyerahan Jaminan</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="srt_penyerahan_jaminan" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="srt_penyerahan_jaminan">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Surat Pernyataan Tunggakan Bunga dan Denda</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="denda" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="denda">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Surat AKSEP</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="srt_aksep" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="srt_aksep">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Tanda Terima Uang Oleh Nasabah</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="tandaterima_nasabah" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="tandaterima_nasabah">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Surat Permohonan Pendebetan Rekening</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="pendebetan_rekening" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="pendebetan_rekening">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Surat Pernyataan ( Pemasangan ) Plang</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="plang" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="plang">Choose file </label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Hal-hal yang diketahui Oleh Nasabah</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="hal_lain" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="hal_lain">Choose file </label>
                                            </div>
                                          </div>
                                        </div>
                                      <!-- END SPK & NDK -->

                                      <!-- START FOTO -->
                                        <div class="tab-pane fade" id="vert-tabs-foto" role="tabpanel" aria-labelledby="vert-tabs-foto-tab">
                                            <!-- START Verifikasi Foto -->
                                              <div class="col-md-12 form-verifikasi">
                                                <div class="card card-success">
                                                  <div class="card-header">
                                                    <h3 class="card-title">Verifikasi Foto</h3>
                                                    <div class="card-tools">
                                                      <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-angle-down"></i>
                                                      </button>
                                                    </div>
                                                  </div>
                                                  <div class="card-body">
                                                    <div class="form-group row">
                                                      <label for="verifikasi_foto" class="col-sm-2 col-form-label">Status</label>
                                                      <div class="col-sm-8">
                                                        <select class="form-control" id="verifikasi_foto" onchange="check('verifikasi_foto','ket-verifi-foto')" >
                                                          <option value="COMPLETED">COMPLETED</option>
                                                          <option value="NOT COMPLETED">NOT COMPLETED</option>
                                                        </select>
                                                      </div>
                                                    </div>
                                                    <div  id="ket-verifi-foto" style="display:none;" >
                                                      <div class="form-group row">
                                                        <label for="note_verifi_foto" class="col-sm-2 col-form-label">Notes</label>
                                                        <div class="col-sm-8">
                                                        <textarea class="form-control" id="note_verifi_foto" rows="3" placeholder="Enter ..."></textarea>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            <!-- END Verifikasi Foto -->
                                          <div class="form-group">
                                            <label for="customFile">Foto Jaminan</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="foto_jaminan"  onchange='getImg(event)'>
                                              <label class="custom-file-label" for="foto_jaminan">Choose file</label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Foto Pengikatan</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="foto_pengikatan" onchange='getImg(event)' >
                                              <label class="custom-file-label" for="foto_pengikatan">Choose file</label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Foto Domisili</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="foto_domisili"  onchange='getImg(event)'>
                                              <label class="custom-file-label" for="foto_domisili">Choose file</label>
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Foto Usaha</label>
                                            <div class="custom-file">
                                              <input type="file" class="custom-file-input" id="foto_usaha" onchange='getImg(event)'>
                                              <label class="custom-file-label" for="foto_usaha">Choose file</label>
                                            </div>
                                          </div>
                                        </div>
                                      <!-- END FOTO -->
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
              </div>
              <!--card details end --> 

            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal" onclick="closeFormEfiling()">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->