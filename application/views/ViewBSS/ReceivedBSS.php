
<!-- Modal -->
<div class="modal fade" id="modal_received_bss" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title" id="exampleModalLabel"><i class="fas fa-mail-bulk"></i> Received Notif BSS</h3>
        <button type="button" class="close" aria-label="Close" onclick="closeModal()">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div id="loading-7">
        <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>
    <!-- Data Tables -->
    <div class="card">
      <div class="form-inline" style="padding : 10px; float: right">
                    <div class="form-group">
                      <label for="email">Search</label> &nbsp; &nbsp;
                      <input type="number" class="form-control" name="search" id="no_received" placeholder="No Awal/ No Akhir" onchange="serchReceived()"> 
                         &nbsp;&nbsp;
                    </div>
      </div>
     <div id="loadingModal">
              <img id="loading-image" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>
            <div class="card-body">
            <table id="TableReceived" class="table table-striped table-bordered" style="width:100% text-align:center" >
              <thead>
                  <tr style="text-align: center;">
                    <th>NO.AWAL</th>
                    <th>NO.AKHIR</th>
                    <th>JUMLAH</th>
                    <th>FROM</th>
                    <th style="width: 500px;">TO</th>
                    <th>STATUS</th>
                    <th>TANGGAL</th>
                    <th>APPROVAL</th>
                    <th style="width: 500px;">KETERANGAN</th>
                    <th style="width: 90px;" class="action">ACTION</th>
                  </tr>
              </thead>
              <tbody>
            
              </tbody>
          </table>
            </div>
            <!-- /.card-body -->
          </div>

      </div>
      <div class="modal-footer text-center" style="margin: 0 auto;">
        <button type="button" class="btn btn-danger" onclick="closeModal()">Kembali</button>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="formApproval" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Keterangan Approval</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div id="loading-5">
        <img id="loading-image" style="index:999999;" src="<?php echo base_url(); ?>assets/design/images/ajax-loader.gif" alt="Loading..." />
      </div>
        <form>
        <input type="hidden" id ="id" >
        <input type="hidden" id ="nama_user_send">
        <input type="hidden" id ="is_migrasi">
        <input type="hidden" id ="no_awal">
        <input type="hidden" id ="no_akhir">
        <input type="hidden" id ="kode_kantor_received">
        <input type="hidden" id ="user_id_received">
          <div class="form-group">
            <label for="message-text" class="col-form-label">Keterangan:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" id="send_approval_reject" class="btn btn-primary">Submit</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
      </form>
    </div>
  </div>
</div>
