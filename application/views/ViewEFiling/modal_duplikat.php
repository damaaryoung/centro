
  <div class="modal fade" id="modal_duplikat"> 
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Duplikat Data Efiling</h4>
                  <button type="button" class="close" onclick="close_modal_duplikat()" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <div id="loading-duplikat">
                    <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
                  </div>
                </div>
                <div class="modal-body" style="min-height: 300px;">
                <div class="row" style="padding-top: 20px;">
                              <!-- form atas -->
                              <div class="col-md-12 mx-auto">
                                  <div class="form-group row">
                                                <div class="col-sm-4">
                                                    <label style="padding-top: 5px;" class="control-label" for="no_rekening_awal">No Rekening</label>
                                                </div>
                                                <div class="col-sm-8">
                                                    <input type="text" class="form-control form-control-sm form_duplikat" id="no_rekening_awal" name="no_rekening_awal" readonly>
                                                </div>
                                  </div>
                                  
                                  <div class="form-group row">
                                                <div class="col-sm-4">
                                                    <label style="padding-top: 5px;" class="control-label" for="no_rekening_awal">Nama Debitur</label>
                                                </div>
                                                <div class="col-sm-8">
                                                    <input type="text" class="form-control form-control-sm form_duplikat" id="nama_debitur_awal" name="nama_debitur_awal" readonly>
                                                </div>
                                  </div>
                                  <hr>
                                    <div class="form-group row">
                                          <div class="col-sm-12"  style="text-align: center;">
                                             <label>Duplikat Data Dari</label>
                                          </div>
                                    </div>
                                  <hr>
                                  <div class="form-group row">
                                                <div class="col-sm-4">
                                                    <label class="control-label" style="padding-top: 5px;"  for="no_rekening_search">No Rekening Efiling Lama</label>
                                                </div>
                                                <div class="col-sm-8">
                                                    <div class="input-group input-group-sm">
                                                        <input type="text" class="form-control form_duplikat" name="no_rekening_search" id="no_rekening_search" placeholder="Nomor Rekening">
                                                        <span class="input-group-append">
                                                            <button type="button" class="btn btn-info btn-flat"  onclick="serchDataRekening()">Cari!</button>
                                                        </span>
                                                    </div>
                                                </div>
                                  </div>
                                  <div class="form-group row not_found">
                                          <div class="col-sm-6">
                                              <label class="control-label" style="padding-top: 5px; color: red;"  for="not_found">Data Tidak Ditemukan</label>
                                          </div>
                                  </div>
                                  <div class="form-group row data_akhir">
                                          <div class="col-sm-6" style="text-align: center;">
                                              <label class="control-label" style="padding-top: 5px;"  for="no_rekening_lama">No Rekening</label>
                                          </div>
                                          <div class="col-sm-6" style="text-align: center;">
                                              <label class="control-label" style="padding-top: 5px;"  for="nama_debitur_lama">Nama Debitur</label>
                                          </div>
                                  </div>
                                  <div class="form-group row data_akhir">
                                          <div class="col-sm-6">
                                              <input type="text" class="form-control form-control-sm form_duplikat" id="no_rekening_lama" name="no_rekening_lama" readonly>
                                          </div>
                                          <div class="col-sm-6">
                                              <input type="text" class="form-control form-control-sm form_duplikat" id="nama_debitur_lama" name="nama_debitur_lama" readonly>
                                          </div>
                                  </div>
                                  <div class="form-group row data_akhir">
                                          <div class="col-sm-6" style="text-align: center;">
                                              <label class="control-label" style="padding-top: 5px;"  for="area_kerja_akhir">Area Kerja</label>
                                          </div>
                                          <div class="col-sm-6" style="text-align: center;">
                                              <label class="control-label" style="padding-top: 5px;"  for="tgl_realisasi_akhir">Tgl. Realisasi</label>
                                          </div>
                                  </div>
                                  <div class="form-group row data_akhir">
                                          <div class="col-sm-6">
                                              <input type="text" class="form-control form-control-sm form_duplikat" id="area_kerja_akhir" name="area_kerja_akhir" readonly>
                                          </div>
                                          <div class="col-sm-6">
                                              <input type="text" class="form-control form-control-sm form_duplikat" id="tgl_realisasi_akhir" name="tgl_realisasi_akhir" readonly>
                                          </div>
                                  </div>
                              </div>
                </div>

                </div>
                <!-- /.modal-body -->
                <div class="modal-footer text-center" style="margin: 0 auto;">
                  <button type="button" class="btn btn-danger" onclick="close_modal_duplikat()">Close</button>
                  <button type="button" class="btn btn-primary" id="btn_simpan_duplikat">Save changes</button>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div>