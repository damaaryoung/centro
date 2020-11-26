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

<div class="modal fade" id="form_send_BSStoPic" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle"><i class="fas fa-share-square"></i> Serahkan BSS ke PIC </h5>
      </div>
      <div class="modal-body">
        <form id="form-sendpic"> 
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Dari</label>
          <div class="col-sm-8">
            <input placeholder="No BSS Awal" id="no_kartu_awal" type="text" autocomplete="off" class ="form-control">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label">Sampai</label>
          <div class="col-sm-8">
          <input placeholder="No BSS Akhir" id="no_kartu_akhir" type="text" autocomplete="off" class ="form-control">
          </div>
        </div>
        <div class="form-group row">
          <label  class="col-sm-4 col-form-label">PIC Penerima</label>
          <div class="col-sm-8">
          <select class="form-control" id="user_pic"></select>
          </div>
        </div>
      
      </div>
      <div class="modal-footer">
        <button type="button" id="send_bss_to_pic" class="btn btn-primary">Send</button>
        <button type="button" onclick="closeFormBSStoPic()" class="btn btn-secondary" data-dismiss="modal">Close</button>
    </form>
      </div>
    </div>
  </div>
</div>

