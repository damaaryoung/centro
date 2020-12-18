<div class="modal fade" id="modal_view_efiling">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="title_form">View E-Filling</h4>
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
                                                      <input type="text" class="form-control form-control-sm" id="view_area_kerja" name="area_kerja" disabled>
                                                </div>
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="nomor_rekening">Nomor Rekening</label>
                                                </div>
                                                <div class="col-sm-3">
                                                      <input type="text" class="form-control form-control-sm" id="view_nomor_rekening" name="nomor_rekening" disabled>
                                                </div>
                                </div>
                                <div class="form-group row">
                                                <div class="col-sm-2">
                                                    <label class="control-label" style="padding-top: 5px;"  for="inp_plafon">PLafon & Tenor</label>
                                                </div>
                                                <div class="col-sm-2">
                                                      <input type="number" class="form-control form-control-sm" id="view_inp_plafon" name="inp_plafon" disabled>
                                                </div>
                                                <div class="col-sm-1">
                                                      <input type="number" class="form-control form-control-sm" id="view_inp_tenor" name="inp_tenor" disabled>
                                                </div>
                                                <div class="col-sm-1">  <span>Bulan</span></div>
                                                <div class="col-sm-2">
                                                    <label style="padding-top: 5px;" class="control-label" for="inp_nomor_rekening">Tanggal Realisasi</label>
                                                </div>
                                                <div class="col-sm-3">
                                                      <input type="date" class="form-control form-control-sm" id="view_inp_nomor_rekening" name="inp_nomor_rekening" disabled>
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
                                        <a class="nav-link active" id="vert-tab-nasabah" data-toggle="pill" href="#view_tab-nasabah" role="tab" aria-controls="tab-nasabah" aria-selected="true">Nasabah</a>
                                        <a class="nav-link" id="vert-tabs-permohonan-kredit-tab" data-toggle="pill" href="#view_vert-tabs-permohonan-kredit" role="tab" aria-controls="vert-tabs-profile" aria-selected="false">Permohonan Kredit</a>
                                        <a class="nav-link" id="vert-tabs-tab-jaminan-tab" data-toggle="pill" href="#view_vert-tabs-jaminan" role="tab" aria-controls="vert-tabs-messages" aria-selected="false">Jaminan</a>
                                        <a class="nav-link" id="vert-tabs-bi-checking-tab" data-toggle="pill" href="#view_vert-tabs-bi-checking" role="tab" aria-controls="vert-tabs-settings" aria-selected="false">BI Checking</a>
                                        <a class="nav-link" id="vert-tabs-credit_analist-tab" data-toggle="pill" href="#view_vert-tabs-credit_analist" role="tab" aria-controls="vert-tabs-credit_analist" aria-selected="false">Credit Analist</a>
                                        <a class="nav-link" id="vert-tabs-legal-tab" data-toggle="pill" href="#view_vert-tabs-legal" role="tab" aria-controls="vert-tabs-legal" aria-selected="false">Legal</a>   
                                        <a class="nav-link" id="vert-tabs-spk-tab" data-toggle="pill" href="#view_vert-tabs-spk" role="tab" aria-controls="vert-tabs-spk" aria-selected="false">SPK & NDK</a>
                                        <a class="nav-link" id="vert-tabs-foto-tab" data-toggle="pill" href="#view_vert-tabs-foto" role="tab" aria-controls="#vert-tabs-foto" aria-selected="false">Foto</a>
                                      </div>
                                    </div>
                                    <div class="col-7 col-sm-9">
                                      <div class="tab-content" id="vert-tabs-tabContent">
                                        <!-- START NASABAH -->
                                            <div class="tab-pane text-left fade active show" id="view_tab-nasabah" role="tabpanel" aria-labelledby="vert-tab-nasabah">
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
                                                    <div class="col-sm-12" style="display: flex;">
                                                      <div class="col-sm-2">Status </div>
                                                      <div class="col-sm-8" id="status_verifikasi_nasabah">COMPLETED</div>
                                                    </div>
                                                    <div class="col-sm-12" style="display: flex;" >
                                                      <div class="col-sm-2">Notes  </div>
                                                      <div class="col-sm-8" id="note_verifi_nasabah">-</div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <!-- END Verifikasi Nasabah -->
                                              <div class="row">
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">KTP All</label>
                                                  <div class="custom-file" id="ktp">
                                                  <a href="javascript:void(0)"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i> 11122020022729_vue.pdf</a>
                                                  </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Kartu Keluarga</label>
                                                  <div class="custom-file" id="kk">
                                                  <a href="javascript:void(0)"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i> 11122020022729_vue.pdf</a>
                                                  </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">NPWP</label>
                                                  <div class="custom-file" id="npwp">
                                                  <a href="javascript:void(0)"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i> 11122020022729_vue.pdf</a>
                                                  </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Surat Nikah</label>
                                                  <div class="custom-file" id="surat_nikah">
                                                  <a href="javascript:void(0)"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i> 11122020022729_vue.pdf</a>
                                                  </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Surat Cerai</label>
                                                  <div class="custom-file" id="surat_cerai">
                                                  <a href="javascript:void(0)"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i> 11122020022729_vue.pdf</a>
                                                  </div>
                                                </div>  
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Surat Lahir</label>
                                                  <div class="custom-file" id="surat_lahir">
                                                  <a href="javascript:void(0)"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i> 11122020022729_vue.pdf</a>
                                                  </div>
                                                </div> 
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Surat Kematian</label>
                                                  <div class="custom-file" id="surat_kematian">
                                                  <a href="javascript:void(0)"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i> 11122020022729_vue.pdf</a>
                                                  </div>
                                                </div>     
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Surat Keterangan Desa/PM1/PM2</label>
                                                  <div class="custom-file" id="surat_desa">
                                                  <a href="javascript:void(0)"><i class="far fa-file-pdf" style="color: red;font-size: 20px;"></i> 11122020022729_vue.pdf</a>
                                                  </div>
                                                </div>    
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Slip Gaji</label>
                                                  <div class="custom-file" id="slip_gaji">
                                                  </div>
                                                </div>   
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Take Over</label>
                                                  <div class="custom-file" id="take_over">
                                                  </div>
                                                </div> 
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Surat Keterangan Kerja</label>
                                                  <div class="custom-file" id="surat_kerja">
                                                  </div>
                                                </div>     
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Surat Keterangan Usaha</label>
                                                  <div class="custom-file" id="surat_usaha">
                                                  </div>
                                                </div>  
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Rekening Koran</label>
                                                  <div class="custom-file" id="rekening_koran">
                                                  </div>
                                                </div> 
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">TDP/SIUP</label>
                                                  <div class="custom-file" id="tdp">
                                                  </div>
                                                </div>     
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Bon-Bon Usaha</label>
                                                  <div class="custom-file" id="bon_usaha">
                                                  </div>
                                                </div>
                                              </div>    
                                            </div>
                                      <!-- END NASABAH -->

                                      <!-- START PERMOHONAN KREDIT -->
                                          <div class="tab-pane fade" id="view_vert-tabs-permohonan-kredit" role="tabpanel" aria-labelledby="vert-tabs-permohonan-kredit-tab">
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
                                                    <div class="col-sm-12" style="display: flex;">
                                                      <div class="col-sm-2">Status </div>
                                                      <div class="col-sm-8" id="status_verifikasi_kredit">COMPLETED</div>
                                                    </div>
                                                    <div class="col-sm-12" style="display: flex;" >
                                                      <div class="col-sm-2">Notes  </div>
                                                      <div class="col-sm-8" id="note_verifi_kredit">-</div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <!-- END Verifikasi PERMOHONAN KREDIT -->
                                              <div class="row">
                                                <div class="form-group col-sm-12">
                                                  <label for="customFile">Aplikasi Permohonan Kredit</label>
                                                  <div class="custom-file" id="permohonan_kredit">
                                                  </div>
                                                </div>
                                                <div class="form-group col-sm-12">
                                                  <label for="customFile">Denah Lokasi Tempat Tinggal & Usaha</label>
                                                  <div class="custom-file" id="denah_lokasi">
                                                  </div>
                                                </div>
                                                <div class="form-group col-sm-12">
                                                  <label for="customFile">Checklist Kelengkapan Dokumen Krdit</label>
                                                  <div class="custom-file" id="kelengkapan_dokumen">
                                                  </div>
                                                </div>
                                              </div>
                                          </div>
                                      <!-- END PERMOHONAN KREDIT -->

                                      <!-- START JAMINAN -->
                                        <div class="tab-pane fade" id="view_vert-tabs-jaminan" role="tabpanel" aria-labelledby="vert-tabs-tab-jaminan-tab">
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
                                                    <div class="col-sm-12" style="display: flex;">
                                                      <div class="col-sm-2">Status </div>
                                                      <div class="col-sm-8" id="status_verifikasi_jaminan">COMPLETED</div>
                                                    </div>
                                                    <div class="col-sm-12" style="display: flex;" >
                                                      <div class="col-sm-2">Notes  </div>
                                                      <div class="col-sm-8" id="note_verifi_jaminan">-</div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <!-- END Verifikasi Jaminan -->
                                              <div class="row">
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Sertifikat</label>
                                                  <div class="custom-file" id="jaminan_sertifikat">
                                                  </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">SKMHT</label>
                                                  <div class="custom-file" id="jaminan_skmht">
                                                  </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">APHT</label>
                                                  <div class="custom-file" id="jaminan_apht">
                                                  </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Cabut Roya</label>
                                                  <div class="custom-file" id="jaminan_roya">
                                                  </div>
                                                </div>
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">SHT</label>
                                                  <div class="custom-file" id="jaminan_sht">
                                                  </div>
                                                </div>  
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">PBB</label>
                                                  <div class="custom-file" id="jaminan_pbb">
                                                  </div>
                                                </div>  
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">IMB</label>
                                                  <div class="custom-file" id="jaminan_pbb">
                                                  </div>
                                                </div>  
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">AJB</label>
                                                  <div class="custom-file" id="jaminan_ajb">
                                                  </div>
                                                </div> 
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">BPKB</label>
                                                  <div class="custom-file" id="jaminan_bpkb">
                                                  </div>
                                                </div> 
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">FIDUSIA</label>
                                                  <div class="custom-file" id="jaminan_fidusia">
                                                  </div>
                                                </div> 
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Ahli Waris</label>
                                                  <div class="custom-file" id="jaminan_ahli_waris">
                                                  </div>
                                                </div> 
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Pengakuan Hutang</label>
                                                  <div class="custom-file" id="jaminan_pengakuan_hutang">
                                                  </div>
                                                </div> 
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Akta Pengakuan Hak Bersama</label>
                                                  <div class="custom-file" id="jaminan_pengakuan_hak">
                                                  </div>
                                                </div> 
                                                <div class="form-group col-sm-6">
                                                  <label for="customFile">Addendum</label>
                                                  <div class="custom-file" id="jaminan_addendum">
                                                  </div>
                                                </div>
                                              </div>
                                        </div>
                                      <!-- END JAMINAN -->

                                      
                                      <!-- START BI CHECKING -->
                                        <div class="tab-pane fade" id="view_vert-tabs-bi-checking" role="tabpanel" aria-labelledby="vert-tabs-bi-checking-tab">
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
                                                    <div class="col-sm-12" style="display: flex;">
                                                      <div class="col-sm-2">Status </div>
                                                      <div class="col-sm-8" id="status_verifikasi_bi_checking">COMPLETED</div>
                                                    </div>
                                                    <div class="col-sm-12" style="display: flex;" >
                                                      <div class="col-sm-2">Notes  </div>
                                                      <div class="col-sm-8" id="note_verifi_bi_checking">-</div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <!-- END Verifikasi BI CHECKING -->
                                              <div class="row">
                                                <div class="form-group col-sm-12">
                                                  <label for="customFile">Form Pengajuan BI Checking</label>
                                                  <div class="custom-file"  id="form_pengajuan_bi_checking">
                                                  </div>
                                                </div>
                                                <div class="form-group col-sm-12">
                                                  <label for="customFile">Form Persetujuan BI Checking</label>
                                                  <div class="custom-file"  id="form_persetujuan_bi_checking">
                                                  </div>
                                                </div>
                                                <div class="form-group col-sm-12">
                                                  <label for="customFile">Hasil BI Checking</label>
                                                  <div class="custom-file" id="form_hasil_bi_checking">
                                                  </div>
                                                </div>   
                                              </div>
                                        </div>
                                      <!-- END BI CHECKING --> 

                                      <!-- START CREDIT ANALIST -->
                                        <div class="tab-pane fade" id="view_vert-tabs-credit_analist" role="tabpanel" aria-labelledby="vert-tabs-credit_analist-tab">
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
                                                    <div class="col-sm-12" style="display: flex;">
                                                      <div class="col-sm-2">Status </div>
                                                      <div class="col-sm-8" id="status_verifikasi_credit_analist">COMPLETED</div>
                                                    </div>
                                                    <div class="col-sm-12" style="display: flex;" >
                                                      <div class="col-sm-2">Notes  </div>
                                                      <div class="col-sm-8" id="note_verifi_credit_analist">-</div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            <!-- END Verifikasi Credit Analist -->
                                          <div class="form-group">
                                            <label for="customFile">Memorandum Account Officer</label>
                                            <div class="custom-file" id="account_office">
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Memorandum Credit Analist</label>
                                            <div class="custom-file" id="credit_analist">
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Offering Letter</label>
                                            <div class="custom-file" id="offering_let">
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <label for="customFile">Form Verifikasi & Penilaian Jaminan</label>
                                            <div class="custom-file" id="verifikasi_jaminan">
                                            </div>
                                          </div>
                                        </div>
                                      <!-- END CREDIT ANALIST -->  

                                      <!-- START LEGAL -->
                                        <div class="tab-pane fade" id="view_vert-tabs-legal" role="tabpanel" aria-labelledby="vert-tabs-legal-tab">
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
                                                    <div class="col-sm-12" style="display: flex;">
                                                      <div class="col-sm-2">Status </div>
                                                      <div class="col-sm-8" id="status_verifikasi_legal">COMPLETED</div>
                                                    </div>
                                                    <div class="col-sm-12" style="display: flex;" >
                                                      <div class="col-sm-2">Notes  </div>
                                                      <div class="col-sm-8" id="note_verifi_legal">-</div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            <!-- END Verifikasi Legal -->
                                          <div class="row">
                                            <div class="form-group col-sm-12">
                                              <label for="customFile">Form Pengajuan</label>
                                              <div class="custom-file" id="pengajuan" >
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-12">
                                              <label for="customFile">LPDK</label>
                                              <div class="custom-file" id="lpdk">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-12">
                                              <label for="customFile">Checklist Pengikatan</label>
                                              <div class="custom-file" id="check_pengikatan">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-12">
                                              <label for="customFile">Order Pengikatan</label>
                                              <div class="custom-file" id="oder_pengikatan">
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      <!-- END LEGAL -->

                                      <!-- START SPK & NDK -->
                                        <div class="tab-pane fade" id="view_vert-tabs-spk" role="tabpanel" aria-labelledby="vert-tabs-spk-tab">
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
                                                    <div class="col-sm-12" style="display: flex;">
                                                      <div class="col-sm-2">Status </div>
                                                      <div class="col-sm-8" id="status_verifikasi_spk">COMPLETED</div>
                                                    </div>
                                                    <div class="col-sm-12" style="display: flex;" >
                                                      <div class="col-sm-2">Notes  </div>
                                                      <div class="col-sm-8" id="note_verifi_spk">-</div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            <!-- END Verifikasi SPK& NDK -->
                                          <div class="row">
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">SPK & NDK</label>
                                              <div class="custom-file" id="spk">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Surat Pernyataan Asuransi</label>
                                              <div class="custom-file" id="asuransi">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Surat Pernyataan Tidak Ada IMB</label>
                                              <div class="custom-file" id="no_IMB">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Jadwal Angsuran</label>
                                              <div class="custom-file" id="jadwal_angsuran">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Personal Guarantee ( Penjamin )</label>
                                              <div class="custom-file" id="penjamin">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Surat Pernyataan Hold Dana</label>
                                              <div class="custom-file" id="hold_dana">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Surat Perintah Transfer</label>
                                              <div class="custom-file" id="srt_transfer">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Surat Keabsahan Data</label>
                                              <div class="custom-file" id="srt_keabsahan">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Surat Pernyataan Beda Tanggal Jatuh Tempo</label>
                                              <div class="custom-file" id="srt_jth_tempo">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Surat Pernyataan Data Authentic</label>
                                              <div class="custom-file" id="srt_auth">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Surat Pernyataan Penyerahan Jaminan</label>
                                              <div class="custom-file" id="srt_penyerahan_jaminan">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Surat Pernyataan Tunggakan Bunga dan Denda</label>
                                              <div class="custom-file" id="denda">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Surat AKSEP</label>
                                              <div class="custom-file" id="srt_aksep">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Tanda Terima Uang Oleh Nasabah</label>
                                              <div class="custom-file" id="tandaterima_nasabah">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Surat Permohonan Pendebetan Rekening</label>
                                              <div class="custom-file" id="pendebetan_rekening">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Surat Pernyataan ( Pemasangan ) Plang</label>
                                              <div class="custom-file" id="plang">
                                              </div>
                                            </div>
                                            <div class="form-group col-sm-6">
                                              <label for="customFile">Hal-hal yang diketahui Oleh Nasabah</label>
                                              <div class="custom-file" id="hal_lain">
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      <!-- END SPK & NDK -->

                                      <!-- START FOTO -->
                                        <div class="tab-pane fade" id="view_vert-tabs-foto" role="tabpanel" aria-labelledby="vert-tabs-foto-tab">
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
                                                    <div class="col-sm-12" style="display: flex;">
                                                      <div class="col-sm-2">Status </div>
                                                      <div class="col-sm-8" id="status_verifikasi_foto">COMPLETED</div>
                                                    </div>
                                                    <div class="col-sm-12" style="display: flex;" >
                                                      <div class="col-sm-2">Notes  </div>
                                                      <div class="col-sm-8" id="note_verifi_foto">-</div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            <!-- END Verifikasi Foto -->
                                          <div class='row'>
                                          <div class="form-group col-sm-12">
                                            <label for="customFile">Foto Jaminan</label>
                                            <div class="custom-file" id="foto_jaminan">
                                            </div>
                                          </div>
                                          <div class="form-group col-sm-12">
                                            <label for="customFile">Foto Pengikatan</label>
                                            <div class="custom-file" id="foto_pengikatan">
                                            </div>
                                          </div>
                                          <div class="form-group col-sm-12">
                                            <label for="customFile">Foto Domisili</label>
                                            <div class="custom-file" id="foto_domisili">
                                            </div>
                                          </div>
                                          <div class="form-group col-sm-12">
                                            <label for="customFile">Foto Usaha</label>
                                            <div class="custom-file" id="foto_usaha">
                                            </div>
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
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->