<!-- Modal -->
<div class="modal fade" id="mainDueDateModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl"
       style="overflow-y:auto;" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel">Perubahan Due Date Peminjaman</h3>
        <button type="button" class="close" id="btn_kembali_dueDate_modal2" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" style="">
      
      <div id="loading6">
              <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>
           <!--- FORM ATAS ------>
           <div class="row">
                  <div class="col-md-12 mx-auto">
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                    <label class="control-label" style="padding-top: 5px;"  for="mainAreaKerja">Notaris </label>
                                  </div>
                                  <div class="col-sm-6">
                                    <input type="text" class="form-control" id="namaNotarisDueDate" name="namaNotarisDueDate" readonly>
                                  </div>
                              </div>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="mainAreaKerja">Tanggal Rencana Kembali</label>
                                  </div>
                                  <div class="col-sm-6">
                                    <input type="date" class="form-control" id="tanggalRencanaKembaliDueDate" name="tanggalRencanaKembaliDueDate">
                                  </div>
                              </div>
                                  <form method="post" id="uploadForm" style ='display:inline;'  enctype="multipart/form-data"> 
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="mainAreaKerja">Upload Cover Notes</label>
                                  </div>
                                        <div class="col-sm-5" style ='display:inline;'>
                                              <div class="custom-file">
                                                <input type="file" id="coverNotes" name="coverNotes" accept=".img,.jpg,.jpeg,.png">
                                              </div>
                                        </div>
                                        <div class="col-sm-3" style ='display:inline;'>
                                            <button type="submit" class="btn btn-success btn-sm" id="btnUploadCoverNotes" style ='padding-left: 5px;'>
                                                <i style ='padding-left: 5px;'  class="fas fa-upload"></i> Upload
                                            </button>
                                        </div>
                                        <input type="hidden" name="CoverNotesID" id="CoverNotesID" >
                                        <input type="hidden" name="CoverNotesAgunanID" id="CoverNotesAgunanID" >
                                        <input type="hidden" name="CoverNotesNoReff" id="CoverNotesNoReff" >
                              </div>
                              </form>
                              <div class="form-group row">
                                  <div class="col-sm-3">
                                      <label class="control-label" style="padding-top: 5px;"  for="">Cover Notes</label>
                                  </div>
                                  <div class="col-sm-6">
                                   
                                    <a href="<?php echo base_url(); ?>PUBLIC/CoverNotes/default.jpeg" id="imgCoverNotes2" target="_blank">
                                        <img src="<?php echo base_url(); ?>PUBLIC/CoverNotes/default.jpeg" id="imgCoverNotes" alt="Cover Notes" style="width: 350px; height: 350px;">
                                    </a>
                                  </div>
                              </div>
                            
                             
                              
                              
                          <!-- Form ATAS -->
                      </div>
                  </div>

          
              <!--- END FORM ATAS --------->
              <input type="hidden" class="form-control" id="mainIdDueDate" name="mainIdDueDate">
              <input type="hidden" class="form-control" id="mainNomorDueDate" name="mainNomorDueDate">
              <input type="hidden" class="form-control" id="mainNoReffDueDate" name="mainNoReffDueDate">



      </div>
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" class="btn btn-danger"  id="btn_kembali_dueDate_modal">Kembali</button>
        <button type="button" class="btn btn-primary" id="btn_simpan_dueDate_modal" >Simpan</button>
      </div>
    </div>
  </div>
</div>


