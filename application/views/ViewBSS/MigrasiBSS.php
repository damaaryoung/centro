<!-- Form Modal Send BSS to PIC -->
<style>
ul:not(.browser-default) {
    padding-left: 0;
    list-style-type: none;
}
.autocomplete-content {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 8px;
  right: 8px;
}
.autocomplete-content li{
  padding: .375rem .75rem;
  cursor: pointer;
  background-color: #fff; 
  border-bottom: 1px solid #d4d4d4; 
}
.autocomplete-content li:hover {
  background-color: #e9e9e9; 
}
</style>

<div class="modal fade" id="form_send_migrasi" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle"><i class="fas fa-exchange-alt"></i> Pindah Ke Area Kerja </h5>
      </div>
      <div class="modal-body">
      <div id="loading-6">
        <img id="loading-image" style="index:999999;" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>
      <form id="form-migrasi">
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-4 col-form-label">Dari</label>
          <div class="col-sm-8">
            <input placeholder="No BSS Awal" id="noawal" type="text" autocomplete="off" class ="form-control">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-4 col-form-label">Sampai</label>
          <div class="col-sm-8">
          <input placeholder="No BSS Akhir" id="noakhir" type="text" autocomplete="off" class ="form-control">
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-4 col-form-label">Ke Area Kerja</label>
          <div class="col-sm-8">
          <select class="form-control" id="AreaKantor"></select>
          </div>
        </div>
      
      </div>
      <div class="modal-footer">
        <button type="button" id="migrasi_bss" class="btn btn-primary">Send</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
      </form>
    </div>
  </div>
</div>